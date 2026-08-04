import React, { useState, useEffect } from 'react';
import {
  WEEK1_LESSONS,
  Week1Lesson,
  WEEK1_FRIDAY_REVISION,
  WEEK1_SATURDAY_SIMULADO,
  WEEK1_SUNDAY_PLANNING,
  Week1LessonMaterial,
  Week1LessonChecklist
} from '../data/tjamWeek1Data';
import { UserProgress, Question, Flashcard, ViewMode } from '../types';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  FileText,
  Layers,
  Brain,
  HelpCircle,
  Video,
  FileSpreadsheet,
  Download,
  Link as LinkIcon,
  Image as ImageIcon,
  Edit3,
  Save,
  RotateCcw,
  CheckSquare,
  Flame,
  Zap,
  Star,
  BookMarked,
  ShieldCheck,
  AlertTriangle,
  Play,
  Check,
  BarChart2,
  ListTodo,
  RefreshCw,
  Plus
} from 'lucide-react';

interface Week1ViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  isDarkMode: boolean;
  viewMode?: ViewMode;
  onSaveLessonContent?: (lessons: Week1Lesson[]) => void;
  onSelectDiscipline?: (disciplineId: string) => void;
}

export const Week1View: React.FC<Week1ViewProps> = ({
  progress,
  onUpdateProgress,
  isDarkMode,
  viewMode = 'student',
  onSaveLessonContent,
  onSelectDiscipline
}) => {
  const [lessons, setLessons] = useState<Week1Lesson[]>(WEEK1_LESSONS);
  const [activeDay, setActiveDay] = useState<'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo'>('Segunda');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('w1-seg-aula-1');
  const [activeLessonTab, setActiveLessonTab] = useState<'teoria' | 'resumo' | 'materiais' | 'mapa' | 'flashcards' | 'questoes' | 'checklist'>('teoria');

  // Edit mode for Teacher / Admin
  const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
  const [editingFieldText, setEditingFieldText] = useState<string>('');

  // Simulado state (Sábado)
  const [simuladoAnswers, setSimuladoAnswers] = useState<Record<string, string>>({});
  const [simuladoSubmitted, setSimuladoSubmitted] = useState<boolean>(false);
  const [simuladoTimeSpent, setSimuladoTimeSpent] = useState<number>(0);
  const [isSimuladoTimerRunning, setIsSimuladoTimerRunning] = useState<boolean>(false);

  // Flashcards flip state
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // Friday Revision 40-questions answers
  const [fridayAnswers, setFridayAnswers] = useState<Record<string, string>>({});
  const [fridaySubmitted, setFridaySubmitted] = useState<boolean>(false);

  // Active Lesson
  const currentLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];

  // Sync edits from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('tjam_week1_lessons');
    if (saved) {
      try {
        setLessons(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved week 1 lessons', e);
      }
    }
  }, []);

  // Simulado timer
  useEffect(() => {
    let interval: any = null;
    if (isSimuladoTimerRunning && !simuladoSubmitted) {
      interval = setInterval(() => {
        setSimuladoTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimuladoTimerRunning, simuladoSubmitted]);

  // Overall Week 1 progress calculations
  const totalLessons = lessons.length;
  const completedLessonsCount = lessons.filter((l) => Object.values(l.checklist).every(Boolean)).length;
  const weekProgressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  // Handle Checklist item toggle
  const handleToggleChecklist = (lessonId: string, itemKey: keyof Week1LessonChecklist) => {
    const updatedLessons = lessons.map((l) => {
      if (l.id === lessonId) {
        const updatedChecklist = { ...l.checklist, [itemKey]: !l.checklist[itemKey] };
        return { ...l, checklist: updatedChecklist };
      }
      return l;
    });
    setLessons(updatedLessons);
    localStorage.setItem('tjam_week1_lessons', JSON.stringify(updatedLessons));
    if (onSaveLessonContent) {
      onSaveLessonContent(updatedLessons);
    }

    // Auto update user progress hours and topics
    const isCompleted = Object.values(updatedLessons.find((l) => l.id === lessonId)?.checklist || {}).every(Boolean);
    if (isCompleted && !progress.completedTopicIds.includes(currentLesson.unitId)) {
      onUpdateProgress({
        ...progress,
        completedTopicIds: [...progress.completedTopicIds, currentLesson.unitId],
        hoursStudiedToday: Math.min(12, progress.hoursStudiedToday + 0.75),
        totalHoursStudied: progress.totalHoursStudied + 0.75
      });
    }
  };

  // Handle Teacher Content Save
  const handleSaveTeacherEdit = (lessonId: string, field: 'content' | 'summary' | 'studyTips') => {
    const updated = lessons.map((l) => {
      if (l.id === lessonId) {
        return { ...l, [field]: editingFieldText };
      }
      return l;
    });
    setLessons(updated);
    localStorage.setItem('tjam_week1_lessons', JSON.stringify(updated));
    if (onSaveLessonContent) {
      onSaveLessonContent(updated);
    }
    setIsEditingContent(false);
  };

  // Simulado submit
  const handleSubmitSimulado = () => {
    setIsSimuladoTimerRunning(false);
    setSimuladoSubmitted(true);

    let correctCount = 0;
    WEEK1_SATURDAY_SIMULADO.questions.forEach((q) => {
      if (simuladoAnswers[q.id] === q.correctOptionId) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / WEEK1_SATURDAY_SIMULADO.questions.length) * 100);

    // Save attempt to user progress
    const newAttempt = {
      id: `sim-attempt-${Date.now()}`,
      simuladoId: WEEK1_SATURDAY_SIMULADO.id,
      simuladoTitle: WEEK1_SATURDAY_SIMULADO.title,
      startedAt: new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      score: correctCount,
      maxScore: WEEK1_SATURDAY_SIMULADO.questions.length,
      percentage: scorePercent,
      userAnswers: simuladoAnswers,
      timeSpentSeconds: simuladoTimeSpent
    };

    onUpdateProgress({
      ...progress,
      simuladoAttempts: [...progress.simuladoAttempts, newAttempt]
    });
  };

  // Filter lessons for active day
  const activeDayLessons = lessons.filter((l) => l.dayOfWeek === activeDay);

  return (
    <div className="w-full space-y-6">
      {/* Course Banner - TJAM ASSISTENTE JUDICIÁRIO SEMANA 1 */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border-slate-800 text-slate-100'
            : 'bg-gradient-to-br from-white via-emerald-50/70 to-teal-50 border-emerald-200 text-slate-900'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
                CURSO OFICIAL TJAM 2026
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                Assistente Judiciário
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Semana 1 Disponível
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Semana 1: Base Fundamental em Língua Portuguesa & Direito Constitucional
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Estrutura completa e otimizada com carga horária sugerida de <strong>18 a 20 horas</strong>. Desenvolva o domínio teórico, mapa mental, repetição com flashcards, simulado de sábado e caderno de erros.
            </p>

            {/* Overall Progress Bar */}
            <div className="pt-2 space-y-1.5 max-w-md">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Progresso Geral da Semana 1</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">{weekProgressPercent}% Concluído</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${weekProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-md text-center w-full md:w-48">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">CARGA HORÁRIA</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">18h a 20h</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Sugerida para 7 dias</span>
            </div>

            {viewMode !== 'student' && (
              <div className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4" /> Modo Professor / Edição
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Days of Week Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {[
          { day: 'Segunda', label: 'Segunda', sub: 'Português Cap 1', icon: BookOpen },
          { day: 'Terça', label: 'Terça', sub: 'Constitucional Cap 1', icon: Layers },
          { day: 'Quarta', label: 'Quarta', sub: 'Português Cap 2', icon: FileText },
          { day: 'Quinta', label: 'Quinta', sub: 'Constitucional Cap 2', icon: Award },
          { day: 'Sexta', label: 'Sexta', sub: 'Revisão Automática', icon: RefreshCw },
          { day: 'Sábado', label: 'Sábado', sub: 'Simulado 40 Questões', icon: BarChart2 },
          { day: 'Domingo', label: 'Domingo', sub: 'Revisão & Transição', icon: Calendar }
        ].map((item) => {
          const isSelected = activeDay === item.day;
          const IconComp = item.icon;
          return (
            <button
              key={item.day}
              onClick={() => {
                setActiveDay(item.day as any);
                const dayLesson = lessons.find((l) => l.dayOfWeek === item.day);
                if (dayLesson) {
                  setSelectedLessonId(dayLesson.id);
                }
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20 scale-[1.02] font-bold'
                  : isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase opacity-90">
                <span>{item.label}</span>
                <IconComp className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] opacity-80 mt-1 truncate font-medium">{item.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Main Content Area based on Selected Day */}
      {activeDay === 'Sexta' ? (
        /* SEXTA-FEIRA: PÁGINA DE REVISÃO AUTOMÁTICA DA SEMANA */
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                Sexta-Feira - Consolidação Semanal
              </span>
              <h2 className="text-2xl font-black mt-0.5">{WEEK1_FRIDAY_REVISION.title}</h2>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> 40 Questões Mistas + Flashcards
            </div>
          </div>

          {/* Resumo da Semana */}
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
            <h3 className="font-extrabold text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Resumo Consolidado dos Conteúdos da Semana 1
            </h3>
            <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {WEEK1_FRIDAY_REVISION.summaryOfWeek}
            </div>
          </div>

          {/* Quick Stats Grid for Revision */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
                <Brain className="w-4 h-4" /> Mapas Mentais da Semana
              </div>
              <p className="text-xl font-black mt-2">4 Mapas Prontos</p>
              <p className="text-[11px] text-slate-500">Português e Constitucional</p>
            </div>

            <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <Zap className="w-4 h-4" /> Deck de Flashcards
              </div>
              <p className="text-xl font-black mt-2">19 Flashcards</p>
              <p className="text-[11px] text-slate-500">Mnemônicos e Artigos</p>
            </div>

            <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
                <CheckSquare className="w-4 h-4" /> Questões Resolvidas
              </div>
              <p className="text-xl font-black mt-2">40 Exercícios Mistos</p>
              <p className="text-[11px] text-slate-500">Disponíveis na bateria abaixo</p>
            </div>
          </div>

          {/* Checklist de Consolidação da Sexta */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-500 uppercase">Checklist da Sexta-Feira:</h3>
            <div className="space-y-2">
              {WEEK1_FRIDAY_REVISION.checklists.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item}</span>
                  <button className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Concluído
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeDay === 'Sábado' ? (
        /* SÁBADO: SIMULADO OFICIAL DA SEMANA 1 */
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/15 text-rose-600 border border-rose-500/20">
                PROVA SIMULADA SEMANAL
              </span>
              <h2 className="text-2xl font-black mt-1">{WEEK1_SATURDAY_SIMULADO.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{WEEK1_SATURDAY_SIMULADO.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>
                  {Math.floor(simuladoTimeSpent / 60)}m {simuladoTimeSpent % 60}s
                </span>
              </div>

              {!isSimuladoTimerRunning && !simuladoSubmitted && (
                <button
                  onClick={() => setIsSimuladoTimerRunning(true)}
                  className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Iniciar Simulado
                </button>
              )}
            </div>
          </div>

          {/* Simulado Questions List */}
          <div className="space-y-6">
            {WEEK1_SATURDAY_SIMULADO.questions.map((q, idx) => {
              const selectedOpt = simuladoAnswers[q.id];
              const isCorrect = selectedOpt === q.correctOptionId;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                      Questão {idx + 1} de {WEEK1_SATURDAY_SIMULADO.questions.length} • {q.topicName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 font-bold">
                      {q.institution || 'FGV'} ({q.year || 2026})
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold leading-relaxed mb-4">{q.statement}</p>

                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = selectedOpt === opt.id;
                      let optionStyle = isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';

                      if (simuladoSubmitted) {
                        if (opt.id === q.correctOptionId) {
                          optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 font-bold';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={simuladoSubmitted}
                          onClick={() => setSimuladoAnswers({ ...simuladoAnswers, [q.id]: opt.id })}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono uppercase font-black">{opt.id})</span>
                            <span>{opt.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Commentary if submitted */}
                  {simuladoSubmitted && (
                    <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-300 block">
                        Comentário do Professor & Fundamentação:
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!simuladoSubmitted && (
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmitSimulado}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" /> Finalizar Simulado e Ver Desempenho
              </button>
            </div>
          )}
        </div>
      ) : activeDay === 'Domingo' ? (
        /* DOMINGO: REVISÃO GERAL E TRANSIÇÃO PARA SEMANA 2 */
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-extrabold uppercase text-amber-600 dark:text-amber-400">
              Domingo - Fechamento do Ciclo
            </span>
            <h2 className="text-2xl font-black mt-0.5">{WEEK1_SUNDAY_PLANNING.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{WEEK1_SUNDAY_PLANNING.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WEEK1_SUNDAY_PLANNING.activities.map((act, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 flex items-center gap-3"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 font-black text-sm">#{idx + 1}</div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{act}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white space-y-3">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Próximo Passo: Liberação da Semana 2
            </h3>
            <p className="text-xs text-purple-200 leading-relaxed">
              Na Semana 2 você avançará para <strong>Direito Administrativo (Lei 14.133/2021)</strong> e <strong>Processo Civil (Prazos e Jurisdição)</strong>. Parabéns por manter o ritmo diário!
            </p>
          </div>
        </div>
      ) : (
        /* SEGUNDA A QUINTA: SELETOR DE AULAS E VISUALIZADOR DE CONTEÚDO DA AULA */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Lesson Selector list for the active day */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Aulas da {activeDay}:
            </h3>
            {activeDayLessons.map((lesson) => {
              const isSelected = selectedLessonId === lesson.id;
              const isChecked = Object.values(lesson.checklist).every(Boolean);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.01]'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase mb-1">
                    <span className={isSelected ? 'text-emerald-100' : 'text-emerald-600 dark:text-emerald-400'}>
                      Aula {lesson.lessonNumber} • {lesson.disciplineName}
                    </span>
                    {isChecked && <CheckCircle2 className="w-4 h-4 text-emerald-300 fill-emerald-600" />}
                  </div>

                  <h4 className="font-extrabold text-xs sm:text-sm line-clamp-2">{lesson.title}</h4>
                  <p className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-emerald-50' : 'text-slate-500'}`}>
                    {lesson.description}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-[10px] opacity-80 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.estimatedMinutes} min
                    </span>
                    <span>• {lesson.professor}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Lesson Workspace */}
          <div className="lg:col-span-8">
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Lesson Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      {currentLesson.unitName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {currentLesson.chapterName}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mt-1">{currentLesson.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{currentLesson.description}</p>
                </div>

                {viewMode !== 'student' && (
                  <button
                    onClick={() => {
                      if (isEditingContent) {
                        handleSaveTeacherEdit(currentLesson.id, 'content');
                      } else {
                        setEditingFieldText(currentLesson.content);
                        setIsEditingContent(true);
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    {isEditingContent ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    <span>{isEditingContent ? 'Salvar Edição' : 'Editar Conteúdo'}</span>
                  </button>
                )}
              </div>

              {/* Sub-tabs for the selected lesson */}
              <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800 scrollbar-none text-xs font-bold">
                {[
                  { id: 'teoria', label: 'Teoria Escrita', icon: BookOpen },
                  { id: 'resumo', label: 'Resumo & Dicas', icon: FileText },
                  { id: 'materiais', label: `Materiais (${currentLesson.materials.length})`, icon: Download },
                  { id: 'mapa', label: 'Mapa Mental', icon: Brain },
                  { id: 'flashcards', label: `Flashcards (${currentLesson.flashcards.length})`, icon: Zap },
                  { id: 'questoes', label: `Questões (${currentLesson.questions.length})`, icon: HelpCircle },
                  { id: 'checklist', label: 'Checklist', icon: CheckSquare }
                ].map((tab) => {
                  const IconComp = tab.icon;
                  const isActive = activeLessonTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveLessonTab(tab.id as any)}
                      className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : isDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Teoria Escrita */}
              {activeLessonTab === 'teoria' && (
                <div className="space-y-6">
                  {isEditingContent ? (
                    <textarea
                      value={editingFieldText}
                      onChange={(e) => setEditingFieldText(e.target.value)}
                      rows={14}
                      className="w-full p-4 text-xs font-mono rounded-2xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none border-purple-500"
                    />
                  ) : (
                    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                      {currentLesson.content}
                    </div>
                  )}

                  {/* Practical Examples */}
                  {currentLesson.practicalExamples.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 uppercase">
                        Exemplo Prático:
                      </h4>
                      {currentLesson.practicalExamples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1"
                        >
                          <span className="font-bold text-slate-900 dark:text-slate-100">{ex.scenario}</span>
                          <p className="text-slate-600 dark:text-slate-300">{ex.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Resumo & Dicas */}
              {activeLessonTab === 'resumo' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-extrabold text-xs text-slate-400 uppercase mb-2">Resumo da Aula:</h4>
                    <p className="text-xs sm:text-sm leading-relaxed">{currentLesson.summary}</p>
                  </div>

                  {/* Exam Traps */}
                  {currentLesson.examTraps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-rose-500 uppercase flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> Pegadinhas de Prova:
                      </h4>
                      {currentLesson.examTraps.map((t, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                          <span className="font-bold text-rose-600 dark:text-rose-400 block">Armadilha: {t.trap}</span>
                          <span className="text-slate-700 dark:text-slate-300 mt-1 block">Realidade: {t.reality}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Study Tips */}
                  {currentLesson.studyTips.length > 0 && (
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-1">
                      <h4 className="font-extrabold text-purple-600 dark:text-purple-300 uppercase">
                        Dicas do Professor:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                        {currentLesson.studyTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Materiais (PDF, Video, Slides) */}
              {activeLessonTab === 'materiais' && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-400 uppercase">Arquivos e Anexos da Aula:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.materials.map((mat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
                            <Download className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs">{mat.title}</h5>
                            <span className="text-[10px] text-slate-400 uppercase">{mat.type} • {mat.size || 'Disponível'}</span>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold">
                          Baixar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Mapa Mental */}
              {activeLessonTab === 'mapa' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
                    <h4 className="font-extrabold text-emerald-700 dark:text-emerald-300 text-sm">
                      {currentLesson.mindMap.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">{currentLesson.mindMap.description}</p>
                    <span className="text-[10px] text-slate-400 font-mono block">Anotações: {currentLesson.mindMap.annotations}</span>
                  </div>

                  <div className="p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/30">
                    <Brain className="w-12 h-12 text-emerald-500 mx-auto animate-pulse" />
                    <h5 className="font-bold text-sm">Visualização do Mapa Mental Interativo</h5>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Abra a aba "Biblioteca & Revisões" no menu principal para interagir com o mapa completo em nó radial.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 5: Flashcards */}
              {activeLessonTab === 'flashcards' && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-xs text-slate-400 uppercase">Flashcards desta Aula:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentLesson.flashcards.map((fc) => {
                      const isFlipped = flippedCardId === fc.id;
                      return (
                        <div
                          key={fc.id}
                          onClick={() => setFlippedCardId(isFlipped ? null : fc.id)}
                          className={`p-6 rounded-3xl border cursor-pointer min-h-[140px] flex flex-col justify-between transition-all ${
                            isFlipped
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                              : isDarkMode
                              ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-emerald-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-emerald-500'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold uppercase opacity-80">
                            <span>{isFlipped ? 'RESPOSTA' : 'PERGUNTA'}</span>
                            <RotateCcw className="w-3.5 h-3.5" />
                          </div>
                          <p className="text-xs font-bold my-2 leading-relaxed">
                            {isFlipped ? fc.back : fc.front}
                          </p>
                          <span className="text-[9px] opacity-70">Clique para virar o card</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 6: Questões da Aula */}
              {activeLessonTab === 'questoes' && (
                <div className="space-y-5">
                  <h4 className="font-extrabold text-xs text-slate-400 uppercase">Bateria de Questões da Aula:</h4>
                  {currentLesson.questions.map((q, qIdx) => (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl border bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <span>Questão #{qIdx + 1}</span>
                        <span className="text-[10px] text-slate-400">{q.institution} • {q.year}</span>
                      </div>
                      <p className="text-xs font-bold leading-relaxed">{q.statement}</p>
                      <div className="space-y-1.5">
                        {q.options.map((opt) => (
                          <div key={opt.id} className="p-2.5 rounded-xl border text-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex items-center gap-2">
                            <span className="font-bold uppercase font-mono">{opt.id})</span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 7: Checklist da Aula */}
              {activeLessonTab === 'checklist' && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-400 uppercase">Checklist de Aprendizagem:</h4>
                  <div className="space-y-2">
                    {[
                      { key: 'watched', label: '☐ Aula assistida' },
                      { key: 'read', label: '☐ Conteúdo lido' },
                      { key: 'summaryStudied', label: '☐ Resumo estudado' },
                      { key: 'mindmapReviewed', label: '☐ Mapa Mental revisado' },
                      { key: 'flashcardsDone', label: '☐ Flashcards concluídos' },
                      { key: 'questionsAnswered', label: '☐ Questões respondidas' },
                      { key: 'revisionCompleted', label: '☐ Revisão concluída' }
                    ].map((item) => {
                      const isChecked = (currentLesson.checklist as any)[item.key];
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleToggleChecklist(currentLesson.id, item.key as any)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                            isChecked
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                              : isDarkMode
                              ? 'bg-slate-800 border-slate-700 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{item.label.replace('☐ ', '')}</span>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
