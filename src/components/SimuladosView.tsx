import React, { useState, useEffect } from 'react';
import { Simulado, Question, UserProgress, SimuladoAttempt } from '../types';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  Play,
  RotateCcw,
  BarChart2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Printer,
  FileText,
  Check,
  X,
  HelpCircle,
  AlertTriangle,
  BookOpen,
  Share2,
  Camera,
  Info,
  CheckSquare,
  Monitor,
  Smartphone,
  Download,
  FileCheck
} from 'lucide-react';

interface SimuladosViewProps {
  simulados: Simulado[];
  progress: UserProgress;
  onSaveSimuladoAttempt: (attempt: SimuladoAttempt) => void;
  isDarkMode: boolean;
  autoStartSimuladoId?: string;
  examOnlyMode?: boolean;
  onUnlockSite?: () => void;
}

export const SimuladosView: React.FC<SimuladosViewProps> = ({
  simulados,
  progress,
  onSaveSimuladoAttempt,
  isDarkMode,
  autoStartSimuladoId,
  examOnlyMode,
  onUnlockSite,
}) => {
  const [activeSimulado, setActiveSimulado] = useState<Simulado | null>(null);
  const [testMode, setTestMode] = useState<boolean>(false);
  const [hasStartedExam, setHasStartedExam] = useState<boolean>(false);

  // Active Test State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [finishedAttempt, setFinishedAttempt] = useState<SimuladoAttempt | null>(null);

  // Filter for view mode in results: 'all' | 'wrong' | 'correct'
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Auto-select specified simulado if requested
  useEffect(() => {
    if (autoStartSimuladoId && !testMode && !isFinished && !activeSimulado) {
      const targetSim = simulados.find((s) => s.id === autoStartSimuladoId) || simulados[0];
      if (targetSim) {
        setActiveSimulado(targetSim);
        setTestMode(true);
        setHasStartedExam(false);
      }
    }
  }, [autoStartSimuladoId, simulados, testMode, isFinished, activeSimulado]);

  // Timer Effect during test (runs only when hasStartedExam is true)
  useEffect(() => {
    if (!testMode || !hasStartedExam || isFinished || timeRemainingSeconds <= 0) return;

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
  }, [testMode, hasStartedExam, isFinished, timeRemainingSeconds]);

  const handleSelectSimuladoToStart = (sim: Simulado) => {
    setActiveSimulado(sim);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemainingSeconds(sim.durationMinutes * 60);
    setIsFinished(false);
    setFinishedAttempt(null);
    setTestMode(true);
    setHasStartedExam(false);
  };

  const handleStartExamNow = () => {
    if (!activeSimulado) return;
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemainingSeconds(activeSimulado.durationMinutes * 60);
    setIsFinished(false);
    setFinishedAttempt(null);
    setHasStartedExam(true);
  };

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    if (isFinished) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleFinishTest = () => {
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
  };

  // Format Timer String
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + 'h ' : ''}${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // Evaluation Badge text based on score
  const getEvaluationBadge = (score: number, maxScore: number) => {
    if (score >= 36) return { text: 'Excelente 🏆', color: 'bg-emerald-500 text-white', desc: 'Ótimo domínio de todo o edital do TJAM!' };
    if (score >= 32) return { text: 'Muito Bom 👏', color: 'bg-blue-500 text-white', desc: 'Desempenho sólido em nível competitivo de aprovação.' };
    if (score >= 28) return { text: 'Bom 🎯', color: 'bg-amber-500 text-slate-950', desc: 'Bom resultado, mas revise os pontos que errou.' };
    if (score >= 20) return { text: 'Atenção ⚠️', color: 'bg-orange-500 text-white', desc: 'Precisa reforçar alguns conteúdos específicos.' };
    return { text: 'Revisão Geral 📚', color: 'bg-rose-500 text-white', desc: 'Recomendada revisão geral das disciplinas do edital.' };
  };

  // Print PDF Trigger
  const handlePrintPDF = () => {
    window.print();
  };

  // Discipline breakdown stats
  const getDisciplineStats = () => {
    if (!activeSimulado) return {};
    const stats: Record<string, { total: number; correct: number }> = {};

    activeSimulado.questions.forEach((q) => {
      const discName = q.topicName.split('•')[0].trim();
      if (!stats[discName]) {
        stats[discName] = { total: 0, correct: 0 };
      }
      stats[discName].total += 1;
      if (userAnswers[q.id] === q.correctOptionId) {
        stats[discName].correct += 1;
      }
    });

    return stats;
  };

  return (
    <div className="w-full space-y-6">
      {/* Print-Only CSS Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-section, #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {!testMode ? (
        /* Simulado Selection Hub */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-600 dark:text-amber-400 mb-2">
                <Award className="w-3.5 h-3.5" /> Preparatório TJAM 2026
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Simulados Gerais e Provas do TJAM</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Ambiente de prova real cronometrado com 40 questões de Língua Portuguesa, Direito Constitucional, Administrativo, Informática, Processo Civil, Processo Penal, LIBRAS e Questões Interdisciplinares com gabarito comentado e exportação em PDF.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {simulados.map((sim) => {
              const isOfficial40 = sim.id === 'sim-tjam-geral-40';
              return (
                <div
                  key={sim.id}
                  className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all relative overflow-hidden ${
                    isOfficial40
                      ? isDarkMode
                        ? 'bg-slate-900 border-amber-500/40 ring-1 ring-amber-500/30'
                        : 'bg-white border-amber-400/80 ring-2 ring-amber-400/20 shadow-lg'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  {isOfficial40 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl shadow-md">
                      Official TJAM 40Qs
                    </div>
                  )}

                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        {sim.totalQuestions} Questões
                      </span>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {sim.durationMinutes} min
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                      {sim.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{sim.description}</p>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-1.5">
                      <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                        Distribuição por Matéria:
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-extrabold pt-0.5">
                        {Object.entries(sim.disciplineBreakdown).map(([discId, count]) => (
                          <span
                            key={discId}
                            className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                          >
                            {discId.replace(/-/g, ' ').toUpperCase()}: {count}q
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectSimuladoToStart(sim)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all group"
                  >
                    <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                    Iniciar Simulado Agora
                  </button>
                </div>
              );
            })}
          </div>

          {/* Past Attempts History */}
          {progress.simuladoAttempts.length > 0 && (
            <div
              className={`p-6 rounded-3xl border space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-500" /> Histórico de Provas Concluídas
              </h3>

              <div className="space-y-2.5">
                {progress.simuladoAttempts.map((att) => (
                  <div
                    key={att.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
                      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">{att.simuladoTitle}</h5>
                      <span className="text-[10px] text-slate-400">
                        {new Date(att.finishedAt).toLocaleDateString('pt-BR')} • {Math.round(att.timeSpentSeconds / 60)} min gastos
                      </span>
                    </div>

                    <div className="text-right font-black">
                      <span className="text-emerald-500 text-sm">{att.score}/{att.maxScore}</span>
                      <span className="block text-[10px] font-bold text-slate-400">({att.percentage}% de acertos)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Active Simulado Test Runner, Pre-Start Instructions or Results */
        <div className="space-y-6" id="print-section">
          {/* Top Header Bar */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl no-print">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isFinished
                  ? 'Provas & Gabarito Concluídos'
                  : hasStartedExam
                  ? 'Modo Prova Ativo • Cronômetro'
                  : 'Instruções Antes de Iniciar a Prova'}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold">{activeSimulado?.title}</h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {hasStartedExam && !isFinished && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 font-mono font-extrabold text-sm sm:text-base">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span>{formatTime(timeRemainingSeconds)}</span>
                </div>
              )}

              {hasStartedExam && !isFinished ? (
                <button
                  onClick={handleFinishTest}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Finalizar e Entregar Prova
                </button>
              ) : isFinished ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintPDF}
                    className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Imprimir / PDF
                  </button>
                  {!examOnlyMode && (
                    <button
                      onClick={() => {
                        setTestMode(false);
                        setHasStartedExam(false);
                      }}
                      className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Voltar aos Simulados
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* STEP 1: PRE-START EXAM INSTRUCTIONS SCREEN */}
          {!hasStartedExam && !isFinished && (
            <div className="p-6 sm:p-8 rounded-3xl border bg-slate-900 border-amber-500/30 text-white space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Instruções Obrigatórias para a Prova Simulado TJAM 2026
                  </h3>
                  <p className="text-xs text-amber-300 font-medium mt-0.5">
                    Leia atentamente as regras antes de acionar o cronômetro oficial.
                  </p>
                </div>
              </div>

              {/* Instructions grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-black text-amber-400">
                    <Clock className="w-4 h-4" /> 1. Duração e Tempo Corrido
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    Você terá exatamente <strong className="text-white">60 minutos</strong> para responder às 40 questões. O tempo iniciará automaticamente ao clicar no botão verde abaixo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-black text-amber-400">
                    <CheckSquare className="w-4 h-4" /> 2. 40 Questões do Edital Oficial
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    A prova abrange Português, Dir. Constitucional, Dir. Administrativo, Proc. Civil, Proc. Penal, Informática, LIBRAS e Questões Interdisciplinares.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-black text-amber-400">
                    <FileCheck className="w-4 h-4" /> 3. Navegação Livre
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    Use o mapa numérico lateral (1 a 40) para pular, voltar ou revisar questões a qualquer momento antes da entrega final.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-black text-amber-400">
                    <Camera className="w-4 h-4" /> 4. Gabarito & Print do Resultado
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    Ao entregar, você receberá a nota final, o <strong className="text-white">Gabarito Comentado Completo</strong> e instruções para <strong className="text-white">tirar PRINT do seu resultado</strong> para enviar ao seu professor.
                  </p>
                </div>
              </div>

              {/* Big CTA Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Pronto para começar? Certifique-se de estar em um ambiente tranquilo.
                </span>

                <button
                  onClick={handleStartExamNow}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Iniciar a Prova Agora
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: TEST RESULTS DASHBOARD (when isFinished is true) */}
          {isFinished && finishedAttempt && activeSimulado && (
            <div className="space-y-6">
              {/* Score & Evaluation Card */}
              <div className="p-6 sm:p-8 rounded-3xl border bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-emerald-500/30 text-white space-y-6 shadow-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-emerald-800/40 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${getEvaluationBadge(finishedAttempt.score, finishedAttempt.maxScore).color}`}>
                        {getEvaluationBadge(finishedAttempt.score, finishedAttempt.maxScore).text}
                      </span>
                      <span className="text-xs text-emerald-300 font-bold">
                        {Math.round(finishedAttempt.timeSpentSeconds / 60)} min gastos
                      </span>
                    </div>
                    <h3 className="text-2xl font-black">{finishedAttempt.simuladoTitle}</h3>
                    <p className="text-xs text-emerald-100 font-medium max-w-lg">
                      {getEvaluationBadge(finishedAttempt.score, finishedAttempt.maxScore).desc}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-emerald-500/30 text-center min-w-[220px]">
                    <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block mb-1">
                      Nota Final
                    </span>
                    <span className="text-4xl font-black text-emerald-300 block">
                      {finishedAttempt.score} <span className="text-lg text-slate-400 font-normal">/ {finishedAttempt.maxScore}</span>
                    </span>
                    <span className="text-xs font-black text-emerald-400 mt-1 block">
                      {finishedAttempt.percentage}% de acertos
                    </span>
                  </div>
                </div>

                {/* Performance by Discipline Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4" /> Desempenho por Disciplina:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(getDisciplineStats()).map(([discName, stat]) => {
                      const perc = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                      return (
                        <div key={discName} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1">
                          <span className="font-bold text-slate-300 truncate block">{discName}</span>
                          <div className="flex items-center justify-between text-emerald-300 font-black">
                            <span>{stat.correct}/{stat.total} acertos</span>
                            <span>{perc}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${perc}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SCREENSHOT & PRINT INSTRUCTIONS BOX */}
              <div className="p-6 sm:p-7 rounded-3xl border bg-slate-900 border-amber-500/50 text-white space-y-4 shadow-xl no-print">
                <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-amber-400 flex items-center gap-2">
                        📸 Tire um PRINT do seu Resultado!
                      </h4>
                      <p className="text-xs text-slate-300 font-medium">
                        Guarde a captura de tela da caixa de nota acima para comprovação e envio ao seu professor ou orientador.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePrintPDF}
                    className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shrink-0 flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span className="hidden sm:inline">Salvar em PDF / Imprimir</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                    <span className="font-black text-amber-300 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5" /> Computador Windows
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Pressione <kbd className="px-1.5 py-0.5 rounded bg-slate-950 font-mono text-amber-400 border border-slate-700">Win + Shift + S</kbd> ou a tecla <kbd className="px-1.5 py-0.5 rounded bg-slate-950 font-mono text-amber-400 border border-slate-700">PrtScn</kbd>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                    <span className="font-black text-amber-300 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5" /> Computador Mac
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Pressione <kbd className="px-1.5 py-0.5 rounded bg-slate-950 font-mono text-amber-400 border border-slate-700">Cmd + Shift + 4</kbd> e selecione a tela.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                    <span className="font-black text-amber-300 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" /> Celular ou Tablet
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Pressione simultaneamente os botões <strong className="text-white">Ligar + Volume para Baixo</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Filter controls for reviewing questions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 no-print border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Gabarito Comentado Completo (40 Questões):
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      reviewFilter === 'all'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Todas ({activeSimulado.questions.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('wrong')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      reviewFilter === 'wrong'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Erradas ({activeSimulado.questions.length - finishedAttempt.score})
                  </button>
                  <button
                    onClick={() => setReviewFilter('correct')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      reviewFilter === 'correct'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Certas ({finishedAttempt.score})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TEST QUESTION RUNNER */}
          {hasStartedExam && !isFinished && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 no-print">
              {/* Question Navigation Drawer (Questions 1 to 40) */}
              <div
                className={`p-5 rounded-3xl border space-y-4 lg:col-span-1 h-fit ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Mapa da Prova ({Object.keys(userAnswers).length}/{activeSimulado?.questions.length})
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.round((Object.keys(userAnswers).length / (activeSimulado?.questions.length || 1)) * 100)}%
                  </span>
                </div>

                {/* 40 Questions Grid Buttons */}
                <div className="grid grid-cols-5 gap-2">
                  {activeSimulado?.questions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isCurrent = idx === currentQuestionIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-emerald-500 bg-emerald-600 text-white'
                            : isAnswered
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                            : isDarkMode
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 text-[10px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Respondida
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-slate-300 dark:bg-slate-700 inline-block" /> Pendente
                  </div>
                </div>
              </div>

              {/* Single Active Question Card */}
              {activeSimulado && activeSimulado.questions[currentQuestionIndex] && (
                <div
                  className={`p-6 sm:p-8 rounded-3xl border space-y-6 lg:col-span-3 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  {/* Top Subject Tag & Index */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs">
                        Questão {currentQuestionIndex + 1} de {activeSimulado.questions.length}
                      </span>
                      <span className="text-xs font-bold text-slate-500 truncate">
                        {activeSimulado.questions[currentQuestionIndex].topicName}
                      </span>
                    </div>
                  </div>

                  {/* Question Statement */}
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-900 dark:text-white">
                    {activeSimulado.questions[currentQuestionIndex].statement}
                  </p>

                  {/* Question Options A, B, C, D */}
                  <div className="space-y-2.5">
                    {activeSimulado.questions[currentQuestionIndex].options.map((opt) => {
                      const isSelected = userAnswers[activeSimulado.questions[currentQuestionIndex].id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectAnswer(activeSimulado.questions[currentQuestionIndex].id, opt.id)}
                          className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md ring-2 ring-emerald-500/50'
                              : isDarkMode
                              ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-200'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                              isSelected
                                ? 'bg-white text-emerald-700'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {opt.id.toUpperCase()}
                          </span>
                          <span className="pt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Anterior
                    </button>

                    {currentQuestionIndex < activeSimulado.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => Math.min(activeSimulado.questions.length - 1, prev + 1))}
                        className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        Próxima <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishTest}
                        className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        Finalizar e Entregar Prova <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FULL GABARITO REVIEW LIST (All 40 questions with explanations) */}
          {isFinished && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                  <FileText className="w-5 h-5 text-emerald-500" /> Gabarito Comentado da Prova (40 Questões)
                </h3>
              </div>

              {activeSimulado?.questions
                .filter((q) => {
                  const isCorrect = userAnswers[q.id] === q.correctOptionId;
                  if (reviewFilter === 'wrong') return !isCorrect;
                  if (reviewFilter === 'correct') return isCorrect;
                  return true;
                })
                .map((q, idx) => {
                  const userOpt = userAnswers[q.id];
                  const isCorrect = userOpt === q.correctOptionId;

                  return (
                    <div
                      key={q.id}
                      className={`p-6 rounded-3xl border space-y-4 transition-all ${
                        isCorrect
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-xl font-black text-xs text-white ${
                              isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          >
                            Questão {activeSimulado.questions.findIndex((item) => item.id === q.id) + 1}
                          </span>
                          <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300 truncate">
                            {q.topicName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 font-black text-xs">
                          {isCorrect ? (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full">
                              <CheckCircle2 className="w-4 h-4" /> Você Acertou
                            </span>
                          ) : (
                            <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 bg-rose-500/10 px-3 py-1 rounded-full">
                              <XCircle className="w-4 h-4" /> Você Errou
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">
                        {q.statement}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((opt) => {
                          const isUserChoice = userOpt === opt.id;
                          const isCorrectOpt = opt.id === q.correctOptionId;

                          let optionStyle = isDarkMode ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700';

                          if (isCorrectOpt) {
                            optionStyle = 'bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-sm';
                          } else if (isUserChoice && !isCorrect) {
                            optionStyle = 'bg-rose-600 text-white border-rose-600 font-extrabold shadow-sm';
                          }

                          return (
                            <div
                              key={opt.id}
                              className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${optionStyle}`}
                            >
                              <span>{opt.text}</span>
                              {isCorrectOpt && <Check className="w-4 h-4 text-white flex-shrink-0 ml-2" />}
                              {isUserChoice && !isCorrect && <X className="w-4 h-4 text-white flex-shrink-0 ml-2" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Box */}
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-amber-200 text-xs space-y-1">
                        <span className="font-extrabold text-amber-600 dark:text-amber-400 block flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" /> Gabarito Comentado:
                        </span>
                        <p className="leading-relaxed font-medium">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
