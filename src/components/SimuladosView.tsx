import React, { useState, useEffect } from 'react';
import { Simulado, Question, UserProgress, SimuladoAttempt } from '../types';
import {
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Award,
  Play,
  RotateCcw,
  BarChart2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SimuladosViewProps {
  simulados: Simulado[];
  progress: UserProgress;
  onSaveSimuladoAttempt: (attempt: SimuladoAttempt) => void;
  isDarkMode: boolean;
}

export const SimuladosView: React.FC<SimuladosViewProps> = ({
  simulados,
  progress,
  onSaveSimuladoAttempt,
  isDarkMode,
}) => {
  const [activeSimulado, setActiveSimulado] = useState<Simulado | null>(null);
  const [testMode, setTestMode] = useState<boolean>(false);

  // Active Test State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [finishedAttempt, setFinishedAttempt] = useState<SimuladoAttempt | null>(null);

  // AI Diagnostic report state
  const [aiReport, setAiReport] = useState<any>(null);
  const [loadingAiReport, setLoadingAiReport] = useState<boolean>(false);

  // Timer Effect during test
  useEffect(() => {
    if (!testMode || isFinished || timeRemainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testMode, isFinished, timeRemainingSeconds]);

  const handleStartSimulado = (sim: Simulado) => {
    setActiveSimulado(sim);
    setUserAnswers({});
    setTimeRemainingSeconds(sim.durationMinutes * 60);
    setIsFinished(false);
    setFinishedAttempt(null);
    setAiReport(null);
    setTestMode(true);
  };

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    if (isFinished) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleFinishTest = async () => {
    if (!activeSimulado) return;

    let score = 0;
    activeSimulado.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });

    const maxScore = activeSimulado.questions.length;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const timeSpent = activeSimulado.durationMinutes * 60 - timeRemainingSeconds;

    const newAttempt: SimuladoAttempt = {
      id: `attempt-${Date.now()}`,
      simuladoId: activeSimulado.id,
      simuladoTitle: activeSimulado.title,
      startedAt: new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      score,
      maxScore,
      percentage,
      userAnswers,
      timeSpentSeconds: timeSpent,
    };

    setFinishedAttempt(newAttempt);
    setIsFinished(true);
    onSaveSimuladoAttempt(newAttempt);

    // Fetch AI Analysis
    setLoadingAiReport(true);
    try {
      const res = await fetch('/api/analyze-simulado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          maxScore,
          percentage,
          timeSpentMinutes: Math.round(timeSpent / 60),
          wrongDisciplines: ['Processo Civil', 'Legislação TJAM'],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiReport(data.report);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAiReport(false);
    }
  };

  // Format Timer String
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + 'h ' : ''}${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="w-full space-y-6">
      {!testMode ? (
        /* Simulado Selection Hub */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Simulados Oficiais do TJAM</h2>
              <p className="text-xs text-slate-500 mt-1">
                Provas na íntegra com ambiente cronometrado, ranking e diagnóstico pedagógico em tempo real.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {simulados.map((sim) => (
              <div
                key={sim.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Disponível
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {sim.durationMinutes} min
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg">{sim.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{sim.description}</p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Distribuição de Questões:</span>
                    <div className="flex flex-wrap gap-2 text-[11px] font-medium pt-1">
                      {Object.entries(sim.disciplineBreakdown).map(([discId, count]) => (
                        <span key={discId} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                          {discId.split('-')[0].toUpperCase()}: {count}q
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartSimulado(sim)}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" /> Iniciar Simulado Agora
                </button>
              </div>
            ))}
          </div>

          {/* Past Attempts History */}
          {progress.simuladoAttempts.length > 0 && (
            <div
              className={`p-6 rounded-3xl border space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-500" /> Histórico de Simulados
              </h3>

              <div className="space-y-2">
                {progress.simuladoAttempts.map((att) => (
                  <div
                    key={att.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
                      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <h5 className="font-bold">{att.simuladoTitle}</h5>
                      <span className="text-[10px] text-slate-400">
                        {new Date(att.finishedAt).toLocaleDateString()} - Tempo: {Math.round(att.timeSpentSeconds / 60)} min
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {att.score} / {att.maxScore}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-400">({att.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Active Simulado Test Runner */
        <div className="space-y-6">
          {/* Top Bar with Timer */}
          <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between shadow-xl">
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-400">Modo Prova Ativo</span>
              <h3 className="text-lg font-extrabold">{activeSimulado?.title}</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 font-mono font-extrabold text-sm sm:text-base">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>

              {!isFinished && (
                <button
                  onClick={handleFinishTest}
                  className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md"
                >
                  Finalizar e Entregar
                </button>
              )}
            </div>
          </div>

          {/* Test Finished Results View */}
          {isFinished && finishedAttempt && (
            <div className="p-6 sm:p-8 rounded-3xl border bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-emerald-500/30 text-white space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-800/50 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-400">Resultado do Simulado</span>
                  <h3 className="text-2xl font-black">{finishedAttempt.simuladoTitle}</h3>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-3xl font-black text-emerald-300">
                    {finishedAttempt.score} de {finishedAttempt.maxScore}
                  </span>
                  <span className="block text-xs font-bold text-emerald-400">({finishedAttempt.percentage}% de aproveitamento)</span>
                </div>
              </div>

              {/* AI Diagnostic Report Box */}
              {loadingAiReport ? (
                <div className="p-6 text-center text-xs font-semibold text-emerald-300">
                  <Sparkles className="w-6 h-6 text-purple-400 animate-spin mx-auto mb-2" />
                  Gerando relatório diagnóstico com IA Gemini...
                </div>
              ) : (
                aiReport && (
                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-purple-500/30 space-y-3 text-xs">
                    <h4 className="font-extrabold text-purple-400 text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Análise Pedagógica da IA:
                    </h4>
                    <p className="font-bold text-slate-200">{aiReport.overallVerdict}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <span className="font-bold text-emerald-400 block mb-1">Pontos Fortes:</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {aiReport.strengths?.map((s: string, idx: number) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-rose-400 block mb-1">Recomendações de Estudo:</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {aiReport.actionPlan?.map((a: string, idx: number) => (
                            <li key={idx}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )}

              <button
                onClick={() => setTestMode(false)}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md"
              >
                Voltar aos Simulados
              </button>
            </div>
          )}

          {/* Test Questions List */}
          <div className="space-y-6">
            {activeSimulado?.questions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border space-y-4 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs">
                      Questão {idx + 1}
                    </span>
                    <span className="text-xs text-slate-500">{q.topicName}</span>
                  </div>

                  <p className="text-sm font-medium leading-relaxed">{q.statement}</p>

                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = selectedOpt === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(q.id, opt.id)}
                          className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md'
                              : isDarkMode
                              ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-200'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
