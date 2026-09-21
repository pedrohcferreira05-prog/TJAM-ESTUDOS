import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Target,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  BookOpen,
  Save,
  X,
  Sparkles,
  ListTodo,
  Layers,
  ArrowUp,
  ArrowDown,
  Check,
  Radio,
  FileText,
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { WeeklyScheduleItem, Discipline, TodayLessonConfig } from '../types';
import {
  DEFAULT_TODAY_LESSONS,
  getTodayLessonsConfig,
  saveTodayLessonsConfigLocalAndRemote,
} from '../lib/attendanceService';

export const AVAILABLE_SUBJECTS = [
  {
    key: 'portugues',
    name: 'Língua Portuguesa',
    defaultTitle: 'Língua Portuguesa — Aula 01',
    defaultSub: 'Compreensão e Interpretação de Textos • Foco TJAM Intermediário (FGV & Cebraspe)',
    defaultCat: 'Conhecimentos Básicos TJAM',
    duration: '45 min',
    badge: '1ª Aula de Hoje'
  },
  {
    key: 'processo_penal',
    name: 'Processo Penal',
    defaultTitle: 'Processo Penal — Aula 1',
    defaultSub: 'Inquérito Policial: conceito, características, instauração e valor probatório',
    defaultCat: 'Conhecimentos Específicos',
    duration: '40 min',
    badge: '2ª Aula de Hoje'
  },
  {
    key: 'processo_civil',
    name: 'Processo Civil',
    defaultTitle: 'Processo Civil — Aula 2',
    defaultSub: 'Atos Processuais: forma, tempo, prazos em dias úteis, citação e intimação',
    defaultCat: 'Conhecimentos Específicos',
    duration: '45 min',
    badge: '3ª Aula de Hoje'
  },
  {
    key: 'direito_const',
    name: 'Direito Constitucional',
    defaultTitle: 'Direito Constitucional — Aula 1',
    defaultSub: 'Nacionalidade (Art. 12 da CF/88): Nato, Naturalizado, Cargos Privativos e EC 131/2023',
    defaultCat: 'Conhecimentos Básicos TJAM',
    duration: '40 min',
    badge: 'Constitucional'
  },
  {
    key: 'direito_admin',
    name: 'Direito Administrativo',
    defaultTitle: 'Direito Administrativo — Aula 2',
    defaultSub: 'Controle da Administração Pública: Interno, Externo, Judicial e Autotutela',
    defaultCat: 'Conhecimentos Básicos TJAM',
    duration: '40 min',
    badge: 'Administrativo'
  },
  {
    key: 'informatica',
    name: 'Informática',
    defaultTitle: 'Informática — Aula 4',
    defaultSub: 'Redes de Computadores e Internet (LAN/MAN/WAN, URL, Wi-Fi, IP)',
    defaultCat: 'Conhecimentos Básicos TJAM',
    duration: '35 min',
    badge: 'Informática'
  },
  {
    key: 'libras',
    name: 'LIBRAS',
    defaultTitle: 'LIBRAS — Aula 3',
    defaultSub: 'Fundamentos de LIBRAS: Introdução, Legislação e Atendimento Inclusivo',
    defaultCat: 'Conhecimentos Específicos',
    duration: '30 min',
    badge: 'LIBRAS'
  },
  {
    key: 'geografia_amazonas',
    name: 'Geografia do Amazonas',
    defaultTitle: 'Geografia do Amazonas — Aula 2',
    defaultSub: 'População, Demografia, Manaus e Zona Franca (ZFM)',
    defaultCat: 'Conhecimentos Específicos',
    duration: '35 min',
    badge: 'Geografia AM'
  },
  {
    key: 'ingles',
    name: 'Língua Inglesa',
    defaultTitle: 'Língua Inglesa — Aula 3',
    defaultSub: 'Numbers (1–100), Time & Days • Leitura e Vocabulário Técnico',
    defaultCat: 'Conhecimentos Básicos TJAM',
    duration: '30 min',
    badge: 'Inglês'
  },
  {
    key: 'legislacao_tjam',
    name: 'Legislação do TJAM',
    defaultTitle: 'Legislação do TJAM — Aula 1',
    defaultSub: 'Organização Judiciária do Estado do Amazonas (Lei Complementar nº 261/2023)',
    defaultCat: 'Conhecimentos Específicos',
    duration: '45 min',
    badge: 'Legislação TJAM'
  },
  {
    key: 'escrita_leitura',
    name: 'Escrita e Leitura',
    defaultTitle: 'Laboratório de Escrita e Leitura',
    defaultSub: 'Prática de Redação Oficial, Clareza Argumentativa e Interpretação',
    defaultCat: 'Conhecimentos Básicos TJAM',
    duration: '40 min',
    badge: 'Laboratório'
  },
];

interface TeacherScheduleAndGoalsManagerProps {
  schedule: WeeklyScheduleItem[];
  disciplines: Discipline[];
  weeklyGoals: Array<{ id: string; text: string; completed: boolean }>;
  todayLessons?: TodayLessonConfig[];
  onUpdateTodayLessons?: (lessons: TodayLessonConfig[]) => void;
  onAddGoal: (text: string) => void;
  onUpdateGoal: (id: string, text: string) => void;
  onDeleteGoal: (id: string) => void;
  onToggleGoal?: (id: string) => void;
  onAddTaskToDay: (dayOfWeek: string, taskText: string, disciplineId?: string) => void;
  onUpdateDayTask: (scheduleId: string, taskIndex: number, newText: string) => void;
  onDeleteDayTask: (scheduleId: string, taskIndex: number) => void;
  isDarkMode?: boolean;
}

export const TeacherScheduleAndGoalsManager: React.FC<TeacherScheduleAndGoalsManagerProps> = ({
  schedule,
  disciplines,
  weeklyGoals,
  todayLessons: externalTodayLessons,
  onUpdateTodayLessons,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onToggleGoal,
  onAddTaskToDay,
  onUpdateDayTask,
  onDeleteDayTask,
}) => {
  const [activeSection, setActiveSection] = useState<'aulas_hoje' | 'metas' | 'cronograma'>('aulas_hoje');
  const [selectedDay, setSelectedDay] = useState<string>('Segunda');

  // Today's Lessons State
  const [todayLessonsState, setTodayLessonsState] = useState<TodayLessonConfig[]>(() => {
    if (externalTodayLessons && externalTodayLessons.length > 0) return externalTodayLessons;
    return getTodayLessonsConfig();
  });
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLessonData, setEditingLessonData] = useState<Partial<TodayLessonConfig>>({});
  const [isAddingLesson, setIsAddingLesson] = useState<boolean>(false);
  const [newLessonSubjectKey, setNewLessonSubjectKey] = useState<string>('portugues');
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Sync external props with local state
  useEffect(() => {
    if (externalTodayLessons && externalTodayLessons.length > 0) {
      setTodayLessonsState(externalTodayLessons);
    }
  }, [externalTodayLessons]);

  // Add Goal State
  const [newGoalText, setNewGoalText] = useState('');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  // Edit Goal State
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editGoalText, setEditGoalText] = useState('');

  // Add Day Task State
  const [isAddingDayTask, setIsAddingDayTask] = useState(false);
  const [newDayTaskText, setNewDayTaskText] = useState('');
  const [selectedDiscForTask, setSelectedDiscForTask] = useState(disciplines[0]?.id || '');

  // Edit Day Task State
  const [editingTaskKey, setEditingTaskKey] = useState<{ scheduleId: string; index: number } | null>(null);
  const [editTaskText, setEditTaskText] = useState('');

  const currentScheduleItem = schedule.find((s) => s.dayOfWeek === selectedDay) || schedule[0];

  const triggerToast = (msg: string) => {
    setSyncToast(msg);
    setTimeout(() => {
      setSyncToast(null);
    }, 4000);
  };

  // Helper to persist today's lessons
  const persistTodayLessons = (updated: TodayLessonConfig[], msg = 'Aulas de hoje atualizadas e sincronizadas!') => {
    setTodayLessonsState(updated);
    saveTodayLessonsConfigLocalAndRemote(updated);
    if (onUpdateTodayLessons) {
      onUpdateTodayLessons(updated);
    }
    triggerToast(msg);
  };

  // Handlers for Today's Lessons
  const handleStartEditingLesson = (lesson: TodayLessonConfig) => {
    setEditingLessonId(lesson.id);
    setEditingLessonData({ ...lesson });
  };

  const handleSaveEditingLesson = (lessonId: string) => {
    const updated = todayLessonsState.map((l) => {
      if (l.id === lessonId) {
        return {
          ...l,
          ...editingLessonData,
          updatedAt: new Date().toISOString(),
        } as TodayLessonConfig;
      }
      return l;
    });

    persistTodayLessons(updated, 'Aula de hoje atualizada com sucesso!');
    setEditingLessonId(null);
    setEditingLessonData({});
  };

  const handleDeleteTodayLesson = (lessonId: string) => {
    if (todayLessonsState.length <= 1) {
      alert('Você deve manter pelo menos uma aula programada para hoje.');
      return;
    }
    const updated = todayLessonsState
      .filter((l) => l.id !== lessonId)
      .map((l, idx) => ({
        ...l,
        order: idx + 1,
        badge: `${idx + 1}ª Aula de Hoje`,
      }));

    persistTodayLessons(updated, 'Aula removida da programação de hoje.');
  };

  const handleMoveLessonOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= todayLessonsState.length) return;

    const copy = [...todayLessonsState];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    const reordered = copy.map((l, idx) => ({
      ...l,
      order: idx + 1,
      badge: `${idx + 1}ª Aula de Hoje`,
    }));

    persistTodayLessons(reordered, 'Ordem das aulas de hoje reorganizada!');
  };

  const handleAddTodayLesson = () => {
    const foundSubj = AVAILABLE_SUBJECTS.find((s) => s.key === newLessonSubjectKey) || AVAILABLE_SUBJECTS[0];
    const newOrder = todayLessonsState.length + 1;

    const newLesson: TodayLessonConfig = {
      id: `${foundSubj.key}_${Date.now()}`,
      subjectKey: foundSubj.key,
      title: foundSubj.defaultTitle,
      subtitle: foundSubj.defaultSub,
      category: foundSubj.defaultCat,
      duration: foundSubj.duration,
      order: newOrder,
      badge: `${newOrder}ª Aula de Hoje`,
      questionsCount: 20,
      cardsCount: 15,
      isMandatoryAttendance: true,
      teacherNotes: '',
      updatedAt: new Date().toISOString(),
    };

    const updated = [...todayLessonsState, newLesson];
    persistTodayLessons(updated, `Aula de ${foundSubj.name} adicionada para hoje!`);
    setIsAddingLesson(false);
  };

  const handleApplyPreset = (presetName: string) => {
    let preset: TodayLessonConfig[] = [];

    if (presetName === 'regular') {
      // 1: Português, 2: Processo Penal, 3: Processo Civil
      preset = [
        {
          id: 'portugues',
          subjectKey: 'portugues',
          title: 'Língua Portuguesa — Aula 01',
          subtitle: 'Compreensão e Interpretação de Textos • Foco TJAM Intermediário (FGV & Cebraspe) • Teoria e 20 Questões',
          category: 'Conhecimentos Básicos TJAM',
          badge: '1ª Aula de Hoje',
          duration: '45 min',
          order: 1,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
        },
        {
          id: 'direito_const',
          subjectKey: 'direito_const',
          title: 'Direito Constitucional — Aula 01',
          subtitle: 'Princípios Fundamentais da CF/88 (Arts. 1º a 4º) • Nível Intermediário TJAM • Teoria, Vídeo e 20 Questões',
          category: 'Conhecimentos Específicos',
          badge: '2ª Aula de Hoje',
          duration: '50 min',
          order: 2,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
          teacherNotes: 'Nesta segunda aula de hoje, iniciamos Direito Constitucional do zero (arts. 1º a 4º). Focar na distinção entre Fundamentos (art. 1º) e Objetivos (art. 3º).',
        },
        {
          id: 'ingles',
          subjectKey: 'ingles',
          title: 'Língua Inglesa — Aula 01',
          subtitle: 'Introdução ao Inglês: Pronomes Pessoais e Verbo TO BE • Nível Intermediário TJAM • Teoria, Vídeos e 20 Questões',
          category: 'Conhecimentos Básicos TJAM',
          badge: '3ª Aula de Hoje',
          duration: '45 min',
          order: 3,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
          teacherNotes: 'Nesta terceira aula de hoje, iniciamos Língua Inglesa do zero: cumprimentos, apresentação pessoal, pronomes pessoais e verbo to be.',
        },
      ];
    } else if (presetName === 'juridico') {
      // Direito Const, Direito Admin, Inglês
      preset = [
        {
          id: 'direito_const',
          subjectKey: 'direito_const',
          title: 'Direito Constitucional — Aula 01',
          subtitle: 'Princípios Fundamentais da CF/88 (Arts. 1º a 4º) • Nível Intermediário TJAM • Teoria, Vídeo e 20 Questões',
          category: 'Conhecimentos Específicos',
          badge: '2ª Aula de Hoje',
          duration: '50 min',
          order: 2,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
          teacherNotes: 'Nesta segunda aula de hoje, iniciamos Direito Constitucional do zero (arts. 1º a 4º). Focar na distinção entre Fundamentos (art. 1º) e Objetivos (art. 3º).',
        },
        {
          id: 'direito_admin',
          subjectKey: 'direito_admin',
          title: 'Direito Administrativo — Aula 2',
          subtitle: 'Controle da Administração Pública: Interno, Externo, Judicial e Autotutela',
          category: 'Conhecimentos Básicos TJAM',
          badge: '2ª Aula de Hoje',
          duration: '40 min',
          order: 2,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
        },
        {
          id: 'ingles',
          subjectKey: 'ingles',
          title: 'Língua Inglesa — Aula 01',
          subtitle: 'Introdução ao Inglês: Pronomes Pessoais e Verbo TO BE • Nível Intermediário TJAM • Teoria, Vídeos e 20 Questões',
          category: 'Conhecimentos Básicos TJAM',
          badge: '3ª Aula de Hoje',
          duration: '45 min',
          order: 3,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
          teacherNotes: 'Nesta terceira aula de hoje, iniciamos Língua Inglesa do zero: cumprimentos, apresentação pessoal, pronomes pessoais e verbo to be.',
        },
      ];
    } else if (presetName === 'tecnico') {
      // Informática, Geografia AM, Legislação TJAM
      preset = [
        {
          id: 'informatica',
          subjectKey: 'informatica',
          title: 'Informática — Aula 4',
          subtitle: 'Redes de Computadores e Internet (LAN/MAN/WAN, URL, Wi-Fi, IP)',
          category: 'Conhecimentos Básicos TJAM',
          badge: '1ª Aula de Hoje',
          duration: '35 min',
          order: 1,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
        },
        {
          id: 'geografia_amazonas',
          subjectKey: 'geografia_amazonas',
          title: 'Geografia do Amazonas — Aula 2',
          subtitle: 'População, Demografia, Manaus e Zona Franca (ZFM)',
          category: 'Conhecimentos Específicos',
          badge: '2ª Aula de Hoje',
          duration: '35 min',
          order: 2,
          questionsCount: 20,
          cardsCount: 10,
          isMandatoryAttendance: true,
        },
        {
          id: 'legislacao_tjam',
          subjectKey: 'legislacao_tjam',
          title: 'Legislação do TJAM — Aula 1',
          subtitle: 'Organização Judiciária do Estado do Amazonas (Lei Complementar nº 261/2023)',
          category: 'Conhecimentos Específicos',
          badge: '3ª Aula de Hoje',
          duration: '45 min',
          order: 3,
          questionsCount: 20,
          cardsCount: 12,
          isMandatoryAttendance: true,
        },
      ];
    }

    persistTodayLessons(preset, `Preset "${presetName}" aplicado para as Aulas de Hoje!`);
  };

  // Handlers for Goals
  const handleSaveNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    onAddGoal(newGoalText.trim());
    setNewGoalText('');
    setIsAddingGoal(false);
    triggerToast('Nova meta de hoje adicionada com sucesso!');
  };

  const handleSaveEditGoal = (id: string) => {
    if (!editGoalText.trim()) return;
    onUpdateGoal(id, editGoalText.trim());
    setEditingGoalId(null);
    triggerToast('Meta de hoje atualizada com sucesso!');
  };

  // Handlers for Day Tasks
  const handleSaveNewDayTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDayTaskText.trim()) return;
    onAddTaskToDay(selectedDay, newDayTaskText.trim(), selectedDiscForTask);
    setNewDayTaskText('');
    setIsAddingDayTask(false);
    triggerToast(`Tarefa adicionada para ${selectedDay}!`);
  };

  const handleSaveEditDayTask = (scheduleId: string, index: number) => {
    if (!editTaskText.trim()) return;
    onUpdateDayTask(scheduleId, index, editTaskText.trim());
    setEditingTaskKey(null);
    triggerToast('Tarefa do cronograma atualizada!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {syncToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-900 text-emerald-100 border border-emerald-500/50 shadow-lg flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-300">
              <Check className="w-4 h-4" />
            </span>
            <span>{syncToast}</span>
          </div>
          <button onClick={() => setSyncToast(null)} className="p-1 hover:bg-white/10 rounded-lg text-emerald-300">
            ✕
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <Target className="w-3.5 h-3.5 text-amber-600" /> Sincronização em Tempo Real com o Aluno
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
            Aulas de Hoje, Metas Diárias & Cronograma Oficial
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Como professor, você tem autoridade total para organizar <strong>quais matérias serão estudadas hoje</strong>, seus conteúdos, a ordem das 3 aulas obrigatórias e as metas que os alunos devem cumprir. As alterações salvam e sincronizam instantaneamente no painel dos alunos.
          </p>
        </div>

        {/* Section Pill Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveSection('aulas_hoje')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'aulas_hoje'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Aulas de Hoje ({todayLessonsState.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('metas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'metas'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>Metas de Hoje ({weeklyGoals.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('cronograma')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'cronograma'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Cronograma Semanal</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: AULAS DE HOJE (DEFINIDAS PELO PROFESSOR)           */}
      {/* ============================================================== */}
      {activeSection === 'aulas_hoje' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider">
                  Organização Pedagógica do Dia
                </span>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Grade de Aulas de Hoje (Alunos)
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Defina qual matéria será estudada hoje em cada horário/etapa. O aluno verá exatamente esta sequência nas seções <strong>"Aulas de Hoje"</strong> e <strong>"Aulas Programadas para Hoje"</strong> no Dashboard e na tela da Aula, com os botões de presença sincronizados.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsAddingLesson(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Aula de Hoje</span>
                </button>
              </div>
            </div>

            {/* Presets Rápidos */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                ⚡ Presets Rápidos:
              </span>
              <button
                onClick={() => handleApplyPreset('regular')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                1. Português + Proc. Penal + Proc. Civil (TJAM Padrão)
              </button>
              <button
                onClick={() => handleApplyPreset('juridico')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                2. Direito Const + Direito Admin + Inglês
              </button>
              <button
                onClick={() => handleApplyPreset('tecnico')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                3. Informática + Geografia AM + Legislação TJAM
              </button>
            </div>
          </div>

          {/* Add Today Lesson Form */}
          {isAddingLesson && (
            <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-md space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-600" />
                  Adicionar Nova Matéria para Hoje
                </h4>
                <button
                  onClick={() => setIsAddingLesson(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-amber-200/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">
                    Selecione a Matéria do Edital TJAM:
                  </label>
                  <select
                    value={newLessonSubjectKey}
                    onChange={(e) => setNewLessonSubjectKey(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-amber-300 font-bold text-slate-900 outline-none"
                  >
                    {AVAILABLE_SUBJECTS.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.name} ({s.defaultTitle})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleAddTodayLesson}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirmar Inclusão da Aula</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* List of Today's Lessons */}
          <div className="space-y-4">
            {todayLessonsState.map((lesson, idx) => {
              const isEditing = editingLessonId === lesson.id;
              const subjectInfo = AVAILABLE_SUBJECTS.find((s) => s.key === lesson.subjectKey) || AVAILABLE_SUBJECTS[0];

              if (isEditing) {
                return (
                  <div
                    key={lesson.id}
                    className="p-5 rounded-3xl bg-amber-50/90 border-2 border-amber-400 shadow-md space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                      <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
                        Editando {idx + 1}ª Aula de Hoje: {lesson.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveEditingLesson(lesson.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 hover:bg-emerald-700 shadow-xs cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" /> Salvar Alterações
                        </button>
                        <button
                          onClick={() => setEditingLessonId(null)}
                          className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" /> Cancelar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Matéria Base (Conteúdo / Exercícios):</label>
                        <select
                          value={editingLessonData.subjectKey || lesson.subjectKey}
                          onChange={(e) => {
                            const newKey = e.target.value;
                            const found = AVAILABLE_SUBJECTS.find((s) => s.key === newKey);
                            setEditingLessonData((prev) => ({
                              ...prev,
                              subjectKey: newKey,
                              title: found?.defaultTitle || prev.title,
                              subtitle: found?.defaultSub || prev.subtitle,
                              category: found?.defaultCat || prev.category,
                            }));
                          }}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-900"
                        >
                          {AVAILABLE_SUBJECTS.map((s) => (
                            <option key={s.key} value={s.key}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Título da Aula:</label>
                        <input
                          type="text"
                          value={editingLessonData.title || ''}
                          onChange={(e) => setEditingLessonData((prev) => ({ ...prev, title: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Duração Estimada:</label>
                        <input
                          type="text"
                          value={editingLessonData.duration || ''}
                          onChange={(e) => setEditingLessonData((prev) => ({ ...prev, duration: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-900"
                          placeholder="Ex: 45 min"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-bold text-slate-700 block mb-1">Subtítulo / Descrição dos Tópicos:</label>
                        <input
                          type="text"
                          value={editingLessonData.subtitle || ''}
                          onChange={(e) => setEditingLessonData((prev) => ({ ...prev, subtitle: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Etiqueta / Badge:</label>
                        <input
                          type="text"
                          value={editingLessonData.badge || ''}
                          onChange={(e) => setEditingLessonData((prev) => ({ ...prev, badge: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-900"
                          placeholder="Ex: 1ª Aula de Hoje"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="font-bold text-slate-700 block mb-1">
                          Orientações do Professor para os Alunos (Aparece em Destaque na Aula):
                        </label>
                        <textarea
                          rows={2}
                          value={editingLessonData.teacherNotes || ''}
                          onChange={(e) => setEditingLessonData((prev) => ({ ...prev, teacherNotes: e.target.value }))}
                          placeholder="Ex: Focar na leitura da lei seca e resolver todas as 20 questões hoje antes de encerrar o relógio de presença!"
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={lesson.id}
                  className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-amber-300 shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                      <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-xs">
                        {idx + 1}º
                      </span>
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleMoveLessonOrder(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          title="Mover para cima"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveLessonOrder(idx, 'down')}
                          disabled={idx === todayLessonsState.length - 1}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          title="Mover para baixo"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                          {lesson.badge || `${idx + 1}ª Aula de Hoje`}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                          {subjectInfo.name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                          <Clock className="w-3 h-3 text-slate-400" /> {lesson.duration || '40 min'}
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Presença Obrigatória
                        </span>
                      </div>

                      <h4 className="text-base font-black text-slate-900 truncate">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {lesson.subtitle}
                      </p>

                      {lesson.teacherNotes && (
                        <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium flex items-center gap-1.5 mt-1">
                          <span className="font-extrabold">Recado do Professor:</span> {lesson.teacherNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleStartEditingLesson(lesson)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Editar Conteúdo</span>
                    </button>
                    <button
                      onClick={() => handleDeleteTodayLesson(lesson.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                      title="Excluir aula de hoje"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2: METAS DE HOJE                                      */}
      {/* ============================================================== */}
      {activeSection === 'metas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-amber-600" /> Metas de Estudo Publicadas para os Alunos
              </h3>
              <p className="text-xs text-slate-500">
                Estas metas aparecem na caixa de marcação diária no Dashboard dos alunos e sincronizam em tempo real.
              </p>
            </div>

            <button
              onClick={() => setIsAddingGoal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Nova Meta
            </button>
          </div>

          {/* Add Goal Form */}
          {isAddingGoal && (
            <form
              onSubmit={handleSaveNewGoal}
              className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-xs"
            >
              <input
                type="text"
                required
                placeholder="Ex: Concluir as 3 aulas do dia e registrar presença no relógio oficial..."
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-xs text-slate-900 font-semibold outline-none focus:border-amber-600"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Salvar Meta
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingGoal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Goals List */}
          <div className="space-y-2.5">
            {weeklyGoals.map((goal, idx) => {
              const isEditingThisGoal = editingGoalId === goal.id;

              if (isEditingThisGoal) {
                return (
                  <div
                    key={goal.id}
                    className="p-3 rounded-2xl bg-amber-50 border border-amber-400 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={editGoalText}
                      onChange={(e) => setEditGoalText(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEditGoal(goal.id)}
                      className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> Salvar
                    </button>
                    <button
                      onClick={() => setEditingGoalId(null)}
                      className="px-3 py-2 rounded-xl bg-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-400 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={goal.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {goal.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setEditingGoalId(goal.id);
                        setEditGoalText(goal.text);
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-all cursor-pointer"
                      title="Editar meta"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remover esta meta? "${goal.text}"`)) {
                          onDeleteGoal(goal.id);
                        }
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                      title="Excluir meta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 3: CRONOGRAMA SEMANAL                                 */}
      {/* ============================================================== */}
      {activeSection === 'cronograma' && (
        <div className="space-y-6">
          {/* Days of Week Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {schedule.map((item) => {
              const isSelected = selectedDay === item.dayOfWeek;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedDay(item.dayOfWeek)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-black scale-[1.02]'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 font-bold'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider opacity-80">{item.dayOfWeek}</div>
                  <div className="text-xs mt-0.5">{item.tasks.length} tarefas</div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Manager Card */}
          {currentScheduleItem && (
            <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
                    Edição do Cronograma Oficial TJAM
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    Planejamento de {currentScheduleItem.dayOfWeek}
                  </h3>
                </div>

                <button
                  onClick={() => setIsAddingDayTask(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Adicionar Tarefa para {currentScheduleItem.dayOfWeek}
                </button>
              </div>

              {/* Add Task Form */}
              {isAddingDayTask && (
                <form
                  onSubmit={handleSaveNewDayTask}
                  className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Ex: Assistir Aula 1 de Processo Penal e responder 15 questões..."
                      value={newDayTaskText}
                      onChange={(e) => setNewDayTaskText(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 outline-none focus:border-amber-500"
                      autoFocus
                    />

                    <select
                      value={selectedDiscForTask}
                      onChange={(e) => setSelectedDiscForTask(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 outline-none"
                    >
                      {disciplines.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingDayTask(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
                    >
                      Salvar Tarefa
                    </button>
                  </div>
                </form>
              )}

              {/* Tasks List */}
              <div className="space-y-2">
                {currentScheduleItem.tasks.map((task, idx) => {
                  const isEditingThis =
                    editingTaskKey?.scheduleId === currentScheduleItem.id && editingTaskKey?.index === idx;

                  if (isEditingThis) {
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={editTaskText}
                          onChange={(e) => setEditTaskText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEditDayTask(currentScheduleItem.id, idx)}
                          className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" /> Salvar
                        </button>
                        <button
                          onClick={() => setEditingTaskKey(null)}
                          className="px-3 py-2 rounded-xl bg-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-400 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 font-extrabold flex items-center justify-center shrink-0 text-[11px]">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-800">{task}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingTaskKey({ scheduleId: currentScheduleItem.id, index: idx });
                            setEditTaskText(task);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-100/50"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteDayTask(currentScheduleItem.id, idx)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-100/50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
