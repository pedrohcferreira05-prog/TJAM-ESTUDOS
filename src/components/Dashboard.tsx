import React, { useState, useEffect } from 'react';
import { Discipline, UserProgress, NewsItem, Simulado } from '../types';
import {
  Flame,
  Clock,
  Target,
  Calendar,
  Sparkles,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  FileSpreadsheet,
  Newspaper,
  Plus,
  ArrowRight,
  Landmark,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface DashboardProps {
  disciplines: Discipline[];
  progress: UserProgress;
  news: NewsItem[];
  simulados: Simulado[];
  onSelectDiscipline: (disciplineId: string) => void;
  onNavigateTab: (tab: any) => void;
  onLogStudyHours: (hours: number) => void;
  onToggleWeeklyGoal: (goalId: string) => void;
  onAddWeeklyGoal: (text: string) => void;
  isDarkMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  disciplines,
  progress,
  news,
  simulados,
  onSelectDiscipline,
  onNavigateTab,
  onLogStudyHours,
  onToggleWeeklyGoal,
  onAddWeeklyGoal,
  isDarkMode,
}) => {
  const [newGoalText, setNewGoalText] = useState('');
  const [logHoursInput, setLogHoursInput] = useState('1');

  // Calculate exam countdown (Target TJAM Exam: November 15, 2026)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const examDate = new Date('2026-11-15T08:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = examDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Today's discipline based on day of week
  const daysOfWeekMap = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const todayIndex = new Date().getDay();
  const todayName = daysOfWeekMap[todayIndex];

  const todayScheduleMap: Record<string, { title: string; disciplineIds: string[]; description: string }> = {
    Segunda: {
      title: 'Língua Portuguesa + Direito Constitucional',
      disciplineIds: ['lingua-portuguesa', 'direito-constitucional'],
      description: 'Teoria de Sintaxe/Crase e Direitos Fundamentais + 20 Questões Comentadas.',
    },
    Terça: {
      title: 'Direito Administrativo + Informática',
      disciplineIds: ['direito-administrativo', 'informatica'],
      description: 'Licitações (Lei 14.133), Atos e Segurança da Informação.',
    },
    Quarta: {
      title: 'Processo Civil',
      disciplineIds: ['processo-civil'],
      description: 'Prazos, Petição Inicial, Provas e Recursos no CPC/2015.',
    },
    Quinta: {
      title: 'Processo Penal',
      disciplineIds: ['processo-penal'],
      description: 'Inquérito Policial, Ação Penal e Prisões em Flagrante.',
    },
    Sexta: {
      title: 'Legislação Institucional TJAM + Geografia do AM',
      disciplineIds: ['legislacao-tjam', 'geografia-amazonas'],
      description: 'Regimento Interno do TJAM (Lei Seca) e Bacia Hidrográfica do AM.',
    },
    Sábado: {
      title: 'Acessibilidade e Inclusão + Revisão Geral',
      disciplineIds: ['acessibilidade-inclusao'],
      description: 'Estatuto da Pessoa com Deficiência + Resolução de Flashcards Acumulados.',
    },
    Domingo: {
      title: 'Lei Seca + Simulados + Análise com IA',
      disciplineIds: ['legislacao-tjam', 'direito-constitucional'],
      description: 'Simulado Semanal Completo e Diagnóstico de Erros via IA.',
    },
  };

  const todaySchedule = todayScheduleMap[todayName] || todayScheduleMap['Segunda'];

  // Overall Completion %
  const totalTopics = disciplines.reduce((sum, d) => sum + d.topics.length, 0);
  const completedTopicsCount = progress.completedTopicIds.length;
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      onAddWeeklyGoal(newGoalText.trim());
      setNewGoalText('');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Display (Metodologia e Foco Oficial) */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-slate-800 text-slate-100'
            : 'bg-gradient-to-br from-white via-emerald-50/50 to-teal-50 border-emerald-100 text-slate-900'
        }`}
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Landmark className="w-64 h-64 text-emerald-500" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Plataforma de Alto Desempenho
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Concurso TJAM 2026
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Prepara-se para o <span className="text-emerald-600 dark:text-emerald-400">Tribunal de Justiça do Amazonas</span>
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Sistema integrado de estudos com conteúdo alinhado ao edital do TJAM, inteligência artificial integrada, repetição espaçada de flashcards e simulados inteligentes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('semana1')}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all scale-100 hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Acessar Semana 1 do Curso (Pronta P/ Produção)</span>
                <span className="bg-amber-400 text-slate-950 text-[9px] px-1.5 py-0.5 rounded-full font-black">NOVO</span>
              </button>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">FOCO</span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">Constância Diária</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">META DIÁRIA</span>
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">3h a 4h de Estudos</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">FREQUÊNCIA</span>
                <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">6 dias por semana</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">MÉTODO</span>
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">Teoria + Questões + Revisão</span>
              </div>
            </div>
          </div>

          {/* Exam Countdown Widget */}
          <div className="lg:col-span-4 bg-emerald-950/80 dark:bg-slate-900 border border-emerald-500/30 p-5 rounded-3xl text-white shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-emerald-800/50 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Contagem Regressiva</span>
              </div>
              <span className="text-[10px] bg-emerald-800/60 px-2 py-0.5 rounded-full font-mono text-emerald-200">
                Prova TJAM
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center py-2">
              <div className="bg-emerald-900/60 rounded-xl p-2 border border-emerald-700/40">
                <span className="text-2xl font-black text-emerald-300 font-mono">{timeLeft.days}</span>
                <span className="text-[9px] uppercase tracking-wider block text-emerald-400">Dias</span>
              </div>
              <div className="bg-emerald-900/60 rounded-xl p-2 border border-emerald-700/40">
                <span className="text-2xl font-black text-emerald-300 font-mono">{timeLeft.hours}</span>
                <span className="text-[9px] uppercase tracking-wider block text-emerald-400">Horas</span>
              </div>
              <div className="bg-emerald-900/60 rounded-xl p-2 border border-emerald-700/40">
                <span className="text-2xl font-black text-emerald-300 font-mono">{timeLeft.minutes}</span>
                <span className="text-[9px] uppercase tracking-wider block text-emerald-400">Min</span>
              </div>
              <div className="bg-emerald-900/60 rounded-xl p-2 border border-emerald-700/40">
                <span className="text-2xl font-black text-amber-400 font-mono">{timeLeft.seconds}</span>
                <span className="text-[9px] uppercase tracking-wider block text-amber-300">Seg</span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-200/80 text-center mt-2">
              Data prevista: 15 de Novembro de 2026. Mantenha a disciplina!
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div
          className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Progresso do Edital</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold">{overallPercentage}%</span>
              <span className="text-xs text-slate-500 font-semibold">{completedTopicsCount} de {totalTopics} tópicos</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Hours Tracker */}
        <div
          className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Horas Estudadas Hoje</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {progress.hoursStudiedToday}h <span className="text-xs text-slate-500 font-normal">/ {progress.dailyGoalHours}h meta</span>
              </span>
            </div>

            {/* Quick Log Hours Control */}
            <div className="flex items-center gap-1.5 mt-1">
              <input
                type="number"
                min="0.5"
                max="12"
                step="0.5"
                value={logHoursInput}
                onChange={(e) => setLogHoursInput(e.target.value)}
                className={`w-14 p-1.5 text-xs text-center font-bold rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
              <button
                onClick={() => onLogStudyHours(parseFloat(logHoursInput) || 1)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Registra Horas
              </button>
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div
          className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Dias Consecutivos</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <span>{progress.streakDays} Dias</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/15 font-bold uppercase tracking-wider">
                Sequência Viva
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Estude diariamente para não perder a sequência de constância.
            </p>
          </div>
        </div>

        {/* Questions Attempted / Performance */}
        <div
          className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Questões Resolvidas</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              {progress.questionAttempts.length} Questões
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {progress.errorQuestionIds.length > 0 ? (
                <span className="text-rose-500 font-semibold">
                  {progress.errorQuestionIds.length} salvas no Caderno de Erros
                </span>
              ) : (
                'Taxa de acertos em acompanhamento diário'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Discipline of the Day + Next Reviews + Weekly Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Discipline of the day & Next Reviews */}
        <div className="lg:col-span-8 space-y-6">
          {/* Discipline of the Day Widget */}
          <div
            className={`p-6 rounded-3xl border transition-all ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Disciplina do Dia ({todayName})</h3>
                  <p className="text-xs text-slate-500">Cronograma sugerido conforme o método do edital</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('schedule')}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                Ver Cronograma Completo <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 space-y-3">
              <h4 className="font-extrabold text-lg text-emerald-700 dark:text-emerald-300">
                {todaySchedule.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {todaySchedule.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {todaySchedule.disciplineIds.map((discId) => {
                  const disc = disciplines.find((d) => d.id === discId);
                  if (!disc) return null;
                  return (
                    <button
                      key={disc.id}
                      onClick={() => onSelectDiscipline(disc.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-transform hover:scale-105"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Acessar {disc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Next Reviews & Spaced Revision Queue */}
          <div
            className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Próximas Revisões Espaçadas</h3>
                  <p className="text-xs text-slate-500">Intervalos científicos de 24h, 7d, 30d e 90d</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('reviews')}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
              >
                Ver Todas ({progress.reviewQueue.length}) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {progress.reviewQueue.slice(0, 4).map((rev) => (
                <div
                  key={rev.id}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        rev.type === '24h'
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                          : rev.type === '7d'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                          : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      Revisão {rev.type}
                    </span>
                    <h5 className="font-bold text-xs mt-1.5">{rev.topicName}</h5>
                    <p className="text-[11px] text-slate-500">{rev.disciplineName}</p>
                  </div>

                  <button
                    onClick={() => onNavigateTab('reviews')}
                    className="p-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm"
                    title="Revisar agora"
                  >
                    Revisar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Next Simulados Card */}
          <div
            className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Próximos Simulados do TJAM</h3>
                  <p className="text-xs text-slate-500">Testes cronometrados com ranking e gabarito comentado</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('simulados')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Ir para Simulados <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {simulados.map((sim) => (
                <div
                  key={sim.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-sm">{sim.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{sim.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 font-medium">
                      <span>🕒 {sim.durationMinutes} minutos</span>
                      <span>📝 {sim.totalQuestions} questões</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateTab('simulados')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 whitespace-nowrap"
                  >
                    Iniciar Simulado
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Weekly Goals & TJAM News */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weekly Goals Checklist */}
          <div
            className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base">Objetivos da Semana</h3>
            </div>

            <div className="space-y-2 mb-4">
              {progress.weeklyGoals.map((goal) => (
                <label
                  key={goal.id}
                  className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-colors ${
                    goal.completed
                      ? isDarkMode
                        ? 'bg-emerald-950/20 border-emerald-900/50 text-slate-400 line-through'
                        : 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                      : isDarkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => onToggleWeeklyGoal(goal.id)}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="text-xs font-medium leading-tight">{goal.text}</span>
                </label>
              ))}
            </div>

            {/* Add New Goal */}
            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input
                type="text"
                placeholder="Novo objetivo semanal..."
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                className={`flex-1 p-2.5 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
              <button
                type="submit"
                className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Published News TJAM */}
          <div
            className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Newspaper className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base">Notícias do Concurso TJAM</h3>
              </div>
            </div>

            <div className="space-y-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border ${
                    isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mb-1">
                    <span className="text-emerald-500">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h5 className="font-bold text-xs leading-snug">{item.title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
