import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import {
  Flame,
  Clock,
  BookOpen,
  Award,
  Play,
  ArrowRight,
  Sparkles,
  Trophy,
  Medal,
  CheckCircle2,
  FileText,
  HelpCircle,
  Layers,
  Brain,
  Video,
  Languages,
  Trees,
  Landmark,
  Check,
  Scale,
  Monitor,
  Calendar,
  CheckCircle,
  Target
} from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onNavigateTab: (tab: any) => void;
  isDarkMode: boolean;
  isDuo?: boolean;
}

interface ScheduledLesson {
  id: string;
  subjectKey: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  color: 'emerald' | 'indigo' | 'purple' | 'sky' | 'blue' | 'teal' | 'amber' | 'cyan';
  icon: any;
  duration: string;
  questionsCount: number;
  cardsCount: number;
  highlight?: boolean;
  tag: string;
  orderNumber: number;
}

// As Aulas Programadas para Conclusão Hoje
const TODAY_PRIMARY_LESSONS: ScheduledLesson[] = [
  {
    id: 'legislacao_tjam',
    subjectKey: 'legislacao_tjam',
    title: 'Legislação do TJAM — Aula 2',
    subtitle: 'Organização Judiciária do Amazonas: aprofundamento (LC 261/2023, 26 Desembargadores, Órgãos Julgadores e Regimento Interno)',
    category: 'Legislação Específica',
    badge: 'Meta 1 de Hoje • LC 261/2023',
    color: 'purple',
    icon: Landmark,
    duration: '50 min',
    questionsCount: 20,
    cardsCount: 15,
    highlight: true,
    tag: '🏛️ LEGISLAÇÃO TJAM (AULA 2)',
    orderNumber: 1,
  },
  {
    id: 'geografia_amazonas',
    subjectKey: 'geografia_amazonas',
    title: 'Geografia do Amazonas — 2ª Aula de Hoje',
    subtitle: 'Aspectos Humanos e Econômicos: População, Manaus, Zona Franca (PIM), Economia e Transporte Fluvial',
    category: 'Conhecimentos Gerais',
    badge: 'Meta 2 de Hoje • Humanos & Econômicos',
    color: 'emerald',
    icon: Trees,
    duration: '40 min',
    questionsCount: 20,
    cardsCount: 15,
    highlight: true,
    tag: '🌳 GEOGRAFIA AM (2ª AULA)',
    orderNumber: 2,
  },
];

// Demais Disciplinas e Aulas Disponíveis
const OTHER_AVAILABLE_LESSONS: ScheduledLesson[] = [
  {
    id: 'portugues',
    subjectKey: 'portugues',
    title: 'Língua Portuguesa — Aula 3',
    subtitle: 'Classes de Palavras: Substantivo, Adjetivo e Verbo (Morfologia e Casos Especiais FGV)',
    category: 'Conhecimentos Básicos',
    badge: 'Aula 3 • Morfologia FGV',
    color: 'emerald',
    icon: BookOpen,
    duration: '45 min',
    questionsCount: 20,
    cardsCount: 15,
    tag: '🇧🇷 PORTUGUÊS',
    orderNumber: 3,
  },
  {
    id: 'direito_admin',
    subjectKey: 'direito_admin',
    title: 'Direito Administrativo — Aula 4',
    subtitle: 'Poderes da Administração Pública (Poder de Polícia, Hierárquico, Disciplinar e Regulamentar)',
    category: 'Conhecimentos Específicos',
    badge: 'Aula 4 • Poderes',
    color: 'blue',
    icon: Scale,
    duration: '50 min',
    questionsCount: 20,
    cardsCount: 15,
    tag: '⚖️ DIR. ADMIN',
    orderNumber: 4,
  },
  {
    id: 'processo_civil',
    subjectKey: 'processo_civil',
    title: 'Processo Civil — Aula 2',
    subtitle: 'Partes e Procuradores no CPC/2015 (Capacidade Processual, Litisconsórcio, Representação e Deveres)',
    category: 'Conhecimentos Específicos',
    badge: 'Aula 2 • CPC/2015',
    color: 'indigo',
    icon: Scale,
    duration: '45 min',
    questionsCount: 20,
    cardsCount: 15,
    tag: '📚 PROC. CIVIL',
    orderNumber: 5,
  },
  {
    id: 'processo_penal',
    subjectKey: 'processo_penal',
    title: 'Processo Penal — Quarta Aula',
    subtitle: 'Aplicação da Lei Processual Penal no Tempo (Tempus Regit Actum), Espaço (Territorialidade), Interpretação e Fontes',
    category: 'Conhecimentos Específicos',
    badge: 'Aula 4 • Eficácia do CPP',
    color: 'teal',
    icon: BookOpen,
    duration: '45 min',
    questionsCount: 20,
    cardsCount: 10,
    tag: '⚖️ PROC. PENAL',
    orderNumber: 6,
  },
  {
    id: 'ingles',
    subjectKey: 'ingles',
    title: 'Língua Inglesa — Aula 3',
    subtitle: 'Apresentação e Comunicação Básica (Greetings, Pronomes e Vocabulário de Rotina)',
    category: 'Conhecimentos Básicos',
    badge: 'Aula 3 • Prática',
    color: 'indigo',
    icon: Languages,
    duration: '40 min',
    questionsCount: 20,
    cardsCount: 15,
    tag: '🇬🇧 INGLÊS',
    orderNumber: 7,
  },
  {
    id: 'libras',
    subjectKey: 'libras',
    title: 'Acessibilidade & LIBRAS — Aula 2',
    subtitle: 'Prática de Comunicação, Cumprimentos, Datilologia e Atendimento ao Cidadão',
    category: 'Conhecimentos Gerais',
    badge: 'Aula 2 • Comunicação',
    color: 'sky',
    icon: Sparkles,
    duration: '35 min',
    questionsCount: 15,
    cardsCount: 12,
    tag: '🤟 LIBRAS',
    orderNumber: 8,
  },
  {
    id: 'direito_const',
    subjectKey: 'direito_const',
    title: 'Direito Constitucional — Aula 2',
    subtitle: 'Princípios Fundamentais da República Federativa do Brasil (Arts. 1º a 4º da CF/88)',
    category: 'Conhecimentos Específicos',
    badge: 'Aula 2 • Arts. 1º a 4º',
    color: 'amber',
    icon: Landmark,
    duration: '45 min',
    questionsCount: 20,
    cardsCount: 15,
    tag: '⚖️ DIR. CONST',
    orderNumber: 9,
  },
  {
    id: 'informatica',
    subjectKey: 'informatica',
    title: 'Noções de Informática — Aula 1',
    subtitle: 'Conceitos Fundamentais de Hardware, Software, Redes e Segurança da Informação',
    category: 'Conhecimentos Básicos',
    badge: 'Aula 1 • TI & Segurança',
    color: 'cyan',
    icon: Monitor,
    duration: '40 min',
    questionsCount: 20,
    cardsCount: 12,
    tag: '💻 INFORMÁTICA',
    orderNumber: 10,
  },
];

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onNavigateTab,
  isDarkMode,
  isDuo = true,
}) => {
  const [savedLessonsStore, setSavedLessonsStore] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('tjam_lessons_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  const [filterState, setFilterState] = useState<'todas' | 'pendentes' | 'concluidas'>('todas');

  const reloadSavedStore = () => {
    try {
      const saved = localStorage.getItem('tjam_lessons_progress');
      if (saved) setSavedLessonsStore(JSON.parse(saved));
    } catch (e) {}
  };

  useEffect(() => {
    reloadSavedStore();
    const handleStorage = () => reloadSavedStore();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleStorage);
    };
  }, []);

  const completedDailyCount = TODAY_PRIMARY_LESSONS.filter(
    (l) => savedLessonsStore[l.subjectKey]?.completed
  ).length;

  const inProgressDailyCount = TODAY_PRIMARY_LESSONS.filter(
    (l) =>
      !savedLessonsStore[l.subjectKey]?.completed &&
      savedLessonsStore[l.subjectKey]?.selectedAnswers &&
      Object.keys(savedLessonsStore[l.subjectKey].selectedAnswers).length > 0
  ).length;

  const dailyPercentage = Math.round((completedDailyCount / TODAY_PRIMARY_LESSONS.length) * 100);

  const completedTopicsCount = progress.completedTopicIds?.length || 0;
  const questionAttemptsCount = progress.questionAttempts?.length || 0;
  const totalCompletedActivities = completedTopicsCount + questionAttemptsCount;
  const realProgressPct = Math.min(100, Math.round((completedTopicsCount / 30) * 100));
  const timeTodayHours = progress.hoursStudiedToday || 0;
  const h = Math.floor(timeTodayHours);
  const m = Math.round((timeTodayHours % 1) * 60);
  const timeTodayFormatted = h > 0 ? `${h}h ${m}m` : `${m}m`;

  const handleOpenLesson = (subject: string) => {
    try {
      localStorage.setItem('tjam_selected_subject', subject);
      window.dispatchEvent(new Event('tjam_subject_change'));
    } catch (e) {}
    onNavigateTab('aula-hoje');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Clean Welcome Header */}
      <div
        className={`p-8 rounded-3xl border shadow-sm transition-all space-y-5 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" /> Preparatório TJAM 2026 • 4 Aulas Programadas para Hoje
            </div>

            <div className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5">
              <span>👥 Dupla Oficial: Eduardo Mateus & Pedro Henrique</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Olá, Eduardo Mateus & Pedro Henrique!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Vocês estão estudando em <strong className="text-indigo-400">Dupla Oficial</strong> para o TJAM 2026! As <strong className="text-emerald-500 font-bold">4 aulas programadas para conclusão hoje</strong> são: <strong className="text-emerald-400">1. Língua Portuguesa (Aula 3)</strong>, <strong className="text-blue-400">2. Direito Administrativo (Aula 4)</strong>, <strong className="text-indigo-400">3. Processo Civil (Aula 2)</strong> e <strong className="text-teal-400">4. Processo Penal (Quarta Aula)</strong>. Concluam as teorias, questões e flashcards abaixo para bater a meta diária!
          </p>
        </div>

        {/* Primary CTA Banner: Quatro Aulas de Hoje */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-indigo-950 text-white flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5 shadow-xl shadow-emerald-950/30 border border-emerald-500/30">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                <Target className="w-3.5 h-3.5 text-emerald-300" /> Metas Obrigatórias do Dia
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-amber-400 text-slate-950 font-black">
                <Clock className="w-3.5 h-3.5" /> 2 Aulas de Hoje • 90 min total
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">🎯 Aulas de Hoje: Legislação do TJAM & Geografia do Amazonas</h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              <strong>1. Legislação TJAM (Aula 2):</strong> Organização Judiciária do Amazonas (LC nº 261/2023) • <strong>2. Geografia do AM (2ª Aula):</strong> Aspectos Humanos, População, Manaus e Polo Industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex items-center gap-2.5 w-full xl:w-auto shrink-0">
            <button
              onClick={() => handleOpenLesson('legislacao_tjam')}
              className="px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer group"
            >
              <span>🏛️ 1. Legislação TJAM (Aula 2)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => handleOpenLesson('geografia_amazonas')}
              className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer group"
            >
              <span>🌳 2. Geografia AM (2ª Aula)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* METAS DO DIA: AS 2 AULAS A SEREM CONCLUÍDAS HOJE */}
      <div className="space-y-5">
        <div
          className={`p-6 sm:p-7 rounded-3xl border shadow-md space-y-5 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          {/* Header & Daily Progress Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Metas de Hoje • 2 Aulas Programadas
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Conclua os textos teóricos, responda as questões comentadas e revise os flashcards das 2 disciplinas do dia.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 block">Progresso do Dia</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  {completedDailyCount} de {TODAY_PRIMARY_LESSONS.length} aulas ({dailyPercentage}%)
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-black text-xs">
                {dailyPercentage}%
              </div>
            </div>
          </div>

          {/* Daily Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, dailyPercentage)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>{completedDailyCount} de {TODAY_PRIMARY_LESSONS.length} Aulas Concluídas</span>
              <span>{inProgressDailyCount > 0 ? `${inProgressDailyCount} Em Andamento` : 'Status Sincronizado'}</span>
              <span>{TODAY_PRIMARY_LESSONS.length - completedDailyCount} Pendentes</span>
            </div>
          </div>
        </div>

        {/* 2 Primary Today's Lessons Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TODAY_PRIMARY_LESSONS.map((lesson) => {
            const isCompleted = !!savedLessonsStore[lesson.subjectKey]?.completed;
            const answersCount = savedLessonsStore[lesson.subjectKey]?.selectedAnswers
              ? Object.keys(savedLessonsStore[lesson.subjectKey].selectedAnswers).length
              : 0;
            const isInProgress = !isCompleted && answersCount > 0;
            const Icon = lesson.icon;

            return (
              <div
                key={lesson.id}
                className={`p-6 rounded-3xl border shadow-lg space-y-4 transition-all flex flex-col justify-between ${
                  isCompleted
                    ? isDarkMode
                      ? 'bg-slate-900/90 border-emerald-500/40 ring-1 ring-emerald-500/20'
                      : 'bg-emerald-50/40 border-emerald-200'
                    : isDarkMode
                    ? 'bg-slate-900 border-indigo-500/40 ring-1 ring-indigo-500/20'
                    : 'bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/40 border-indigo-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Card Header & Status */}
                  <div className="flex items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
                    <span className="px-3 py-1 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 border border-slate-300/40 dark:border-slate-700/60">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{lesson.tag}</span>
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-extrabold text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Concluída
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold text-[11px]">
                        <Clock className="w-3.5 h-3.5" /> Em andamento ({answersCount} respondidas)
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                        {lesson.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>

                  {/* Badges / Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center justify-center text-center">
                      <Video className="w-3.5 h-3.5 text-rose-500 mb-0.5" />
                      <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">Vídeo Aula</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center justify-center text-center">
                      <FileText className="w-3.5 h-3.5 text-emerald-500 mb-0.5" />
                      <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">{lesson.questionsCount} Questões</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center justify-center text-center">
                      <Layers className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
                      <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">{lesson.cardsCount} Cards</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => handleOpenLesson(lesson.subjectKey)}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group ${
                    isCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : lesson.subjectKey === 'legislacao_tjam'
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : lesson.subjectKey === 'portugues'
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                      : lesson.subjectKey === 'direito_admin'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : lesson.subjectKey === 'processo_civil'
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-teal-600 hover:bg-teal-500 text-white'
                  }`}
                >
                  <span>{isCompleted ? 'Revisar Aula de Hoje' : `Iniciar Aula de Hoje (${lesson.title.split('—')[0].trim()})`}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* DEMAIS DISCIPLINAS DO PREPARATÓRIO */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Demais Disciplinas Liberadas do Preparatório
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {OTHER_AVAILABLE_LESSONS.length} disciplinas disponíveis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OTHER_AVAILABLE_LESSONS.map((lesson) => {
            const isCompleted = !!savedLessonsStore[lesson.subjectKey]?.completed;
            const answersCount = savedLessonsStore[lesson.subjectKey]?.selectedAnswers
              ? Object.keys(savedLessonsStore[lesson.subjectKey].selectedAnswers).length
              : 0;
            const Icon = lesson.icon;

            return (
              <div
                key={lesson.id}
                className={`p-5 rounded-3xl border shadow-sm space-y-3 transition-all flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b pb-2.5 border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{lesson.tag}</span>
                    </span>
                    {isCompleted ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        ✓ Concluída
                      </span>
                    ) : answersCount > 0 ? (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        {answersCount} resp.
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        {lesson.duration}
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {lesson.questionsCount} questões • {lesson.cardsCount} cards
                  </span>
                  <button
                    onClick={() => handleOpenLesson(lesson.subjectKey)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Estudar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SIMULADO GERAL TJAM - Featured Action Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-slate-900 text-slate-950 dark:text-white border border-amber-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-amber-400">
              📝 Prova Simulada Completa
            </span>
            <span className="text-xs font-bold text-slate-950 dark:text-amber-200">
              40 Questões • 60 Minutos
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white leading-tight">
            Simulado Geral Oficial — TJAM (Assistente Judiciário)
          </h2>
          <p className="text-xs font-medium text-slate-950/90 dark:text-slate-200 leading-relaxed">
            Testes abrangendo Língua Portuguesa, Direito Constitucional, Direito Administrativo, Informática, Processo Civil, Processo Penal, LIBRAS, Geografia do Amazonas, Legislação TJAM e Língua Inglesa. Receba o gabarito comentado, diagnóstico e opção de download em PDF.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('simulados')}
          className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold text-xs shadow-lg shadow-slate-950/30 flex items-center justify-center gap-2 transition-all cursor-pointer group shrink-0"
        >
          <Play className="w-4 h-4 fill-amber-400 group-hover:scale-110 transition-transform" />
          <span>Fazer Simulado Agora</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Ranking da Dupla de Estudos & Ranking Geral de Duplas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking Individual ou Dupla */}
        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Sua Dupla no Ranking Geral
                </h3>
                <p className="text-[11px] text-slate-400">
                  Desempenho sincronizado da dupla no TJAM 2026
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              Dupla Ativa
            </span>
          </div>

          <div className="space-y-3">
            {/* Perfil da Dupla Oficial */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDarkMode
                  ? 'bg-indigo-500/15 border-indigo-500/40 ring-1 ring-indigo-500/30'
                  : 'bg-indigo-50 border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl text-white font-black text-xs flex items-center justify-center shadow-md shrink-0 bg-indigo-600 shadow-indigo-500/30">
                  4º
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Eduardo Mateus & Pedro Henrique
                    </span>
                    <span className="px-2 py-0.5 rounded-md font-extrabold text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                      Sua Dupla
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-400/20 font-extrabold text-[10px]">
                      Dupla Oficial
                    </span>
                  </div>
                  <span className="text-xs font-semibold flex items-center gap-1 mt-0.5 text-indigo-400">
                    👥 4º Lugar Geral • Subindo no ranking com 30,0% concluído! 🚀
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-indigo-500"
                    style={{ width: '85.7%' }}
                  ></div>
                </div>
                <span className="text-sm font-black min-w-[50px] text-right text-indigo-400">
                  30,0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ranking Geral de Alunos */}
        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Classificação Geral de Duplas
                </h3>
                <p className="text-[11px] text-slate-400">
                  Desempenho comparativo entre duplas de estudos do Preparatório TJAM
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Duplas
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { pos: 1, name: 'Lucas Silveira & Mariana Costa', pct: '35,0%', isUser: false, barWidth: '100%' },
              { pos: 2, name: 'Gabriel Souza & Sofia Albuquerque', pct: '33,4%', isUser: false, barWidth: '95.4%' },
              { pos: 3, name: 'Matheus Ribeiro & Beatriz Lima', pct: '31,6%', isUser: false, barWidth: '90.3%' },
              { pos: 4, name: 'Eduardo Mateus & Pedro Henrique', pct: '30,0%', isUser: true, barWidth: '85.7%' },
              { pos: 5, name: 'Rafael Mendes & Amanda Rocha', pct: '28,2%', isUser: false, barWidth: '80.6%' },
              { pos: 6, name: 'Carlos Eduardo & Juliana Castro', pct: '26,5%', isUser: false, barWidth: '75.7%' },
              { pos: 7, name: 'Bruno Carvalho & Larissa Ferreira', pct: '24,0%', isUser: false, barWidth: '68.6%' },
              { pos: 8, name: 'Thiago Martins & Camila Duarte', pct: '21,8%', isUser: false, barWidth: '62.3%' },
              { pos: 9, name: 'Felipe Andrade & Letícia Ramos', pct: '19,5%', isUser: false, barWidth: '55.7%' },
              { pos: 10, name: 'Rodrigo Alves & Fernanda Peixoto', pct: '17,2%', isUser: false, barWidth: '49.1%' },
              { pos: 11, name: 'Vinícius Dias & Patrícia Santos', pct: '15,0%', isUser: false, barWidth: '42.9%' },
              { pos: 12, name: 'Gustavo Nogueira & Bruna Vasconcelos', pct: '12,8%', isUser: false, barWidth: '36.6%' },
            ].map((aluno) => (
              <div
                key={aluno.pos}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  aluno.isUser
                    ? isDarkMode
                      ? 'bg-indigo-500/15 border-indigo-400/40 ring-1 ring-indigo-400/30'
                      : 'bg-indigo-50 border-indigo-300'
                    : isDarkMode
                    ? 'bg-slate-800/40 border-slate-800/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 shadow-sm ${
                      aluno.isUser
                        ? 'bg-indigo-600 text-white'
                        : aluno.pos === 1
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : aluno.pos === 2
                        ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : aluno.pos === 3
                        ? 'bg-amber-700/60 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {aluno.pos}º
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`font-extrabold text-xs sm:text-sm truncate ${aluno.isUser ? 'text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>
                        {aluno.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-extrabold text-[9px] whitespace-nowrap hidden sm:inline-block">
                        {aluno.isUser ? 'Sua Dupla' : 'Dupla'}
                      </span>
                      {aluno.isUser && (
                        <span className="px-2 py-0.5 rounded-md border font-extrabold text-[10px] flex items-center gap-1 whitespace-nowrap bg-indigo-500/20 text-indigo-300 border-indigo-400/30">
                          <span>Vocês • Subindo ⬆️</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-16 sm:w-24 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`${aluno.isUser ? 'bg-indigo-500' : 'bg-slate-400 dark:bg-slate-600'} h-full rounded-full`}
                      style={{ width: aluno.barWidth }}
                    ></div>
                  </div>
                  <span className={`text-sm font-black ${aluno.isUser ? 'text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {aluno.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">
          Seu Desempenho e Atividades
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Progresso Geral */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Progresso Geral</span>
              <Award className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{realProgressPct}%</p>
            <p className="text-[10px] text-slate-400">Progresso total no curso</p>
          </div>

          {/* Atividades Concluídas */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-blue-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Atividades Concluídas</span>
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white truncate">{totalCompletedActivities}</p>
            <p className="text-[10px] text-slate-400">Exercícios e tarefas finalizadas</p>
          </div>

          {/* Sequência de estudos */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-amber-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Sequência</span>
              <Flame className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{progress.streakDays || 0} {progress.streakDays === 1 ? 'dia' : 'dias'}</p>
            <p className="text-[10px] text-slate-400">Estudos consecutivos</p>
          </div>

          {/* Tempo estudado hoje */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-purple-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Tempo Hoje</span>
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{timeTodayFormatted}</p>
            <p className="text-[10px] text-slate-400">Tempo de estudo diário</p>
          </div>
        </div>
      </div>
    </div>
  );
};
