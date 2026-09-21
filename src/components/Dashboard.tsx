import React, { useState, useEffect } from 'react';
import { UserProgress, TodayLessonConfig } from '../types';
import {
  Flame,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  Trophy,
  HelpCircle,
  Brain,
  Scale,
  Calendar,
  CheckCircle,
  Target,
  Check,
  ListTodo,
  Play,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  getTodayAttendanceOverview,
  getLessonAttendanceStatus,
  formatDurationHMS,
  formatDigitalClock,
  endLessonAttendance,
  getTodayLessonsConfig,
} from '../lib/attendanceService';

interface DashboardProps {
  progress: UserProgress;
  onNavigateTab: (tab: any) => void;
  isDarkMode: boolean;
  isDuo?: boolean;
  onToggleGoal?: (goalId: string) => void;
  todayLessons?: TodayLessonConfig[];
}

interface ScheduledLesson {
  id: string;
  subjectKey: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  duration: string;
  questionsCount: number;
  cardsCount: number;
}

const TODAY_PRIMARY_LESSONS: ScheduledLesson[] = [
  {
    id: 'portugues',
    subjectKey: 'portugues',
    title: 'Língua Portuguesa — Aula 01',
    subtitle: 'Compreensão e Interpretação de Textos • Foco TJAM Intermediário (FGV & Cebraspe) • Teoria, Vídeo Sartori e 20 Questões',
    category: 'Conhecimentos Básicos TJAM',
    badge: 'Aula 1 (Segunda)',
    duration: '45 min',
    questionsCount: 20,
    cardsCount: 10,
  },
  {
    id: 'processo_penal',
    subjectKey: 'processo_penal',
    title: 'Processo Penal — Aula 1',
    subtitle: 'Inquérito Policial: conceito, características, instauração e valor probatório • Teoria, caso prático e 20 questões',
    category: 'Conhecimentos Específicos',
    badge: 'Aula 1',
    duration: '40 min',
    questionsCount: 20,
    cardsCount: 15,
  },
  {
    id: 'processo_civil',
    subjectKey: 'processo_civil',
    title: 'Processo Civil — Aula 2',
    subtitle: 'Atos Processuais: forma, tempo, prazos em dias úteis, citação e intimação • Teoria, caso prático e 20 questões',
    category: 'Conhecimentos Específicos',
    badge: 'Aula 2',
    duration: '45 min',
    questionsCount: 20,
    cardsCount: 15,
  },
];

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onNavigateTab,
  onToggleGoal,
  todayLessons: propTodayLessons,
}) => {
  const [todayLessonsList, setTodayLessonsList] = useState<TodayLessonConfig[]>(() => {
    return propTodayLessons && propTodayLessons.length > 0
      ? propTodayLessons
      : getTodayLessonsConfig();
  });

  useEffect(() => {
    if (propTodayLessons && propTodayLessons.length > 0) {
      setTodayLessonsList(propTodayLessons);
    }
  }, [propTodayLessons]);

  useEffect(() => {
    const handleUpdate = () => {
      setTodayLessonsList(getTodayLessonsConfig());
    };
    window.addEventListener('tjam_today_lessons_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('tjam_today_lessons_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const [savedLessonsStore, setSavedLessonsStore] = useState<Record<string, any>>({});
  const [activeElapsed, setActiveElapsed] = useState<number>(0);

  const reloadSavedStore = () => {
    try {
      const stored = localStorage.getItem('tjam_all_lessons_progress');
      if (stored) {
        setSavedLessonsStore(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Erro ao ler progresso local', e);
    }
  };

  // Real-time ticking if an active lesson attendance timer is running
  const activeTimer = progress.activeLessonTimer;
  useEffect(() => {
    if (!activeTimer?.isRunning || !activeTimer.startedAt) {
      setActiveElapsed(0);
      return;
    }
    const started = new Date(activeTimer.startedAt).getTime();
    const updateElapsed = () => {
      setActiveElapsed(Math.max(0, Math.floor((Date.now() - started) / 1000)));
    };
    updateElapsed();
    const timer = setInterval(updateElapsed, 1000);
    return () => clearInterval(timer);
  }, [activeTimer?.isRunning, activeTimer?.startedAt]);

  useEffect(() => {
    reloadSavedStore();
    const handleStorage = () => reloadSavedStore();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleStorage);
    window.addEventListener('tjam_attendance_updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleStorage);
      window.removeEventListener('tjam_attendance_updated', handleStorage);
    };
  }, []);

  const overview = getTodayAttendanceOverview(progress);

  const completedDailyCount = todayLessonsList.filter(
    (l) => savedLessonsStore[l.subjectKey]?.completed || getLessonAttendanceStatus(progress, l.subjectKey).status === 'completed'
  ).length;

  const dailyPercentage = todayLessonsList.length > 0
    ? Math.round((completedDailyCount / todayLessonsList.length) * 100)
    : 0;
  const completedTopicsCount = progress.completedTopicIds?.length || 0;
  const questionAttemptsCount = progress.questionAttempts?.length || 0;
  const realProgressPct = Math.min(100, Math.round((completedTopicsCount / 30) * 100));

  // Dynamic calculation: saved hours today + active running seconds
  const totalSecondsToday = (progress.hoursStudiedToday || 0) * 3600 + (activeTimer?.isRunning ? activeElapsed : 0);
  const totalHoursFloat = totalSecondsToday / 3600;
  const h = Math.floor(totalHoursFloat);
  const m = Math.floor((totalHoursFloat % 1) * 60);
  const s = Math.floor(totalSecondsToday % 60);
  const timeTodayFormatted = h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;

  const handleOpenLesson = (subject: string) => {
    try {
      localStorage.setItem('tjam_selected_subject', subject);
      window.dispatchEvent(new Event('tjam_subject_change'));
    } catch (e) {}
    onNavigateTab('aula-hoje');
  };

  const handleEndActiveTimerDirectly = () => {
    if (activeTimer?.lessonId) {
      endLessonAttendance(activeTimer.lessonId);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2 px-2 sm:px-4">
      {/* 1. Header do Aluno - Clean Light Mode & Direto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Olá, Eduardo!
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              TJAM 2026
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Metas do dia: <span className="text-amber-700 font-bold">Língua Portuguesa (Aula 01)</span>, <span className="text-rose-700 font-bold">Processo Penal</span> e <span className="text-indigo-700 font-bold">Processo Civil</span>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{progress.streakDays || 5} dias</span>
          </div>

          <button
            onClick={() => onNavigateTab('simulados')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>5º Lugar</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Indicadores Rápidos (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metas de Hoje */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Metas de Hoje</span>
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              {completedDailyCount} / {TODAY_PRIMARY_LESSONS.length}
            </span>
            <span className="text-xs font-bold text-amber-700 font-mono">
              {dailyPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${dailyPercentage}%` }}
            />
          </div>
        </div>

        {/* Tempo Hoje */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Tempo Hoje</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {timeTodayFormatted}
          </div>
          <p className="text-[10px] text-slate-500 truncate">Estudo em tempo real</p>
        </div>

        {/* Questões Respondidas */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Questões Feitas</span>
            <HelpCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {questionAttemptsCount}
          </div>
          <p className="text-[10px] text-slate-500 truncate">Exercícios e testes</p>
        </div>

        {/* Progresso no Edital */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Edital Geral</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {realProgressPct}%
          </div>
          <p className="text-[10px] text-slate-500 truncate">Assistente Judiciário</p>
        </div>
      </div>

      {/* 3. Seção Principal: 3 Aulas Programadas com Sistema de Presença */}
      <div className="space-y-4">
        {/* Banner de Frequência e Presença */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-sm border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <span>Presença & Metas das 3 Aulas de Hoje</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Obrigatório
                  </span>
                </h2>
                <p className="text-xs text-slate-300">
                  Marque o início e o fim de cada aula. Encerrar as 3 aulas do dia bate a meta e marca automaticamente +1 dia consecutivo na sequência.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-black text-amber-300 border border-white/10">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{progress.streakDays || 1} dias seguidos</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black">
                {overview.completedCount} de 3 aulas
              </div>
            </div>
          </div>

          {/* Active Lesson Timer Banner if running */}
          {activeTimer?.isRunning && (
            <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                <div>
                  <span className="text-xs font-black text-amber-200 uppercase tracking-wider block">
                    Aula em Andamento • Presença de Início Registrada:
                  </span>
                  <span className="text-sm font-black text-white">
                    {activeTimer.subjectTitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="font-mono text-base sm:text-lg font-black text-amber-300 bg-slate-900/80 px-3 py-1 rounded-lg border border-amber-400/30">
                  {formatDigitalClock(activeElapsed)}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenLesson(activeTimer.lessonId)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Ir para Aula
                  </button>
                  <button
                    onClick={handleEndActiveTimerDirectly}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-sm"
                  >
                    Concluir Presença
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Meta Reached Banner */}
          {overview.allThreeCompleted && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 flex items-center justify-between gap-2 text-xs font-bold">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>🎉 Meta Diária Conquistada! Você marcou presença e encerrou as 3 aulas de hoje!</span>
              </div>
              <span className="text-amber-300 font-mono font-black">+{progress.streakDays} Dias de Sequência</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              Grade das Aulas de Hoje ({todayLessonsList.length} aulas organizadas pelo professor)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {todayLessonsList.length} aulas prioritárias obrigatórias
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todayLessonsList.map((lesson, idx) => {
            const attendanceStatus = getLessonAttendanceStatus(progress, lesson.subjectKey);
            const isCompleted = attendanceStatus.status === 'completed' || !!savedLessonsStore[lesson.subjectKey]?.completed;
            const isInProgress = attendanceStatus.isCurrentlyActive;

            return (
              <div
                key={lesson.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-xs ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200'
                    : isInProgress
                    ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center gap-1.5 border border-slate-200">
                      <Scale className="w-3.5 h-3.5 text-amber-600" />
                      <span>{lesson.badge || `Aula ${idx + 1}`} • {lesson.category}</span>
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Presença Validada
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-xs border border-amber-300 animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> Em andamento
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-xs border border-slate-200">
                        Presença Pendente
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>

                  {lesson.teacherNotes && (
                    <div className="text-[11px] font-medium text-amber-800 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-300/40">
                      <span className="font-bold">Orientação Docente:</span> {lesson.teacherNotes}
                    </div>
                  )}

                  {attendanceStatus.durationSeconds > 0 && (
                    <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60 inline-block">
                      Tempo computado: {formatDurationHMS(attendanceStatus.durationSeconds)}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {lesson.duration || '40 min'}
                    </span>
                    <span>•</span>
                    <span>{lesson.questionsCount || 20} questões</span>
                  </div>

                  <button
                    onClick={() => handleOpenLesson(lesson.subjectKey)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isCompleted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                        : isInProgress
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white font-black'
                    }`}
                  >
                    <span>
                      {isCompleted
                        ? 'Revisar Aula'
                        : isInProgress
                        ? 'Continuar Aula'
                        : 'Pressione para Iniciar'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metas de Estudo Sincronizadas com o Professor */}
      {progress.weeklyGoals && progress.weeklyGoals.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Metas do Cronograma (Professor Jéssica Alves)
              </h2>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {progress.weeklyGoals.filter(g => g.completed).length} de {progress.weeklyGoals.length} concluídas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {progress.weeklyGoals.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => onToggleGoal && onToggleGoal(goal.id)}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  goal.completed
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                    goal.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {goal.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={`text-xs font-medium leading-relaxed ${goal.completed ? 'line-through opacity-80' : ''}`}>
                  {goal.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Acesso Rápido às Ferramentas */}
      <div className="space-y-3">
        <h2 className="text-base font-extrabold text-slate-900">
          Acesso Rápido
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigateTab('materias')}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">11 Matérias</div>
              <div className="text-[10px] text-slate-500">Grade completa</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('simulados')}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Simulados</div>
              <div className="text-[10px] text-slate-500">80Q e Ranking</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('flashcards')}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Flashcards</div>
              <div className="text-[10px] text-slate-500">Revisão ativa</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('caderno-erros')}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all space-y-2 cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Caderno de Erros</div>
              <div className="text-[10px] text-slate-500">Questões a rever</div>
            </div>
          </button>
        </div>
      </div>

      {/* 5. Resumo da Classificação no Ranking */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-black text-sm shrink-0">
            5º
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                Pedro Henrique & Eduardo Mateus
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Dupla Oficial
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              30,0% do edital concluído • 100% das tarefas em dia
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('simulados')}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
        >
          <span>Ver Ranking Completo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
