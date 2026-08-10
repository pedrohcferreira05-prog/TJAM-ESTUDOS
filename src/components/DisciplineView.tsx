import React, { useState } from 'react';
import {
  Discipline,
  Question,
  Flashcard,
  MindMap,
  UserProgress,
} from '../types';
import { getTopicFullContent } from '../data/tjamFullContent';
import { MindMapCanvas } from './MindMapCanvas';
import {
  BookOpen,
  HelpCircle,
  Brain,
  FileSpreadsheet,
  Edit3,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Video,
  FileText,
  Bookmark,
  Check,
  X,
  RotateCw,
  AlertOctagon,
  Download,
  Printer,
  ChevronRight,
  Plus,
  Scale,
  ListCheck,
  ShieldCheck,
  Lightbulb,
  AlertTriangle,
  Zap,
  BookmarkCheck,
  GraduationCap,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Star,
  PlayCircle,
  Share2,
  Award,
  Compass,
  LayoutList
} from 'lucide-react';

interface DisciplineViewProps {
  discipline: Discipline;
  questions: Question[];
  flashcards: Flashcard[];
  mindMaps: MindMap[];
  progress: UserProgress;
  onBack: () => void;
  onToggleTopicCompletion: (topicId: string) => void;
  onAnswerQuestion: (questionId: string, optionId: string) => void;
  onReviewFlashcard: (flashcardId: string, rating: 'fácil' | 'médio' | 'difícil' | 'errei') => void;
  onSavePersonalNote: (topicId: string, text: string) => void;
  onOpenAIAssistant: (initialPrompt?: string) => void;
  onUpdateMindMap: (map: MindMap) => void;
  isDarkMode: boolean;
  initialSubTab?: string;
}

export const DisciplineView: React.FC<DisciplineViewProps> = ({
  discipline,
  questions,
  flashcards,
  mindMaps,
  progress,
  onBack,
  onToggleTopicCompletion,
  onAnswerQuestion,
  onReviewFlashcard,
  onSavePersonalNote,
  onOpenAIAssistant,
  onUpdateMindMap,
  isDarkMode,
  initialSubTab = 'aulas',
}) => {
  const [activeTab, setActiveTab] = useState<'aulas' | 'questoes' | 'flashcards' | 'mapas' | 'anotacoes' | 'topicos'>(
    (initialSubTab as any) || 'aulas'
  );

  const [selectedTopicId, setSelectedTopicId] = useState<string>(discipline.topics[0]?.id || '');
  const [topicSearchQuery, setTopicSearchQuery] = useState('');
  const [expandedTopicIds, setExpandedTopicIds] = useState<string[]>([discipline.topics[0]?.id || '']);
  const [showNextLessonToast, setShowNextLessonToast] = useState(false);

  // Filtered Items for Discipline
  const discQuestions = questions.filter((q) => q.disciplineId === discipline.id);
  const discFlashcards = flashcards.filter((f) => f.disciplineId === discipline.id);
  const discMindMaps = mindMaps.filter((m) => m.disciplineId === discipline.id);

  // Selected MindMap
  const [selectedMapId, setSelectedMapId] = useState<string>(discMindMaps[0]?.id || '');
  const activeMindMap = discMindMaps.find((m) => m.id === selectedMapId) || discMindMaps[0];

  // Selected Flashcard index
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Selected Question state for interactive quiz
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [aiExplanationMap, setAiExplanationMap] = useState<Record<string, any>>({});
  const [loadingAiMap, setLoadingAiMap] = useState<Record<string, boolean>>({});

  // Note text state
  const [noteText, setNoteText] = useState(progress.personalNotes[selectedTopicId] || '');

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setNoteText(progress.personalNotes[topicId] || '');
  };

  const handleSaveNote = () => {
    if (selectedTopicId) {
      onSavePersonalNote(selectedTopicId, noteText);
    }
  };

  const handleToggleTopicCompletionWithToast = (topicId: string) => {
    onToggleTopicCompletion(topicId);
    setShowNextLessonToast(true);
    setTimeout(() => setShowNextLessonToast(false), 8000);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setQuestionAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    onAnswerQuestion(questionId, optionId);
  };

  const handleRequestAiExplanation = async (q: Question) => {
    setLoadingAiMap((prev) => ({ ...prev, [q.id]: true }));
    try {
      const res = await fetch('/api/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statement: q.statement,
          options: q.options,
          selectedOptionId: questionAnswers[q.id],
          correctOptionId: q.correctOptionId,
          disciplineName: discipline.name,
          topicName: q.topicName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiExplanationMap((prev) => ({ ...prev, [q.id]: data.explanation }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAiMap((prev) => ({ ...prev, [q.id]: false }));
    }
  };

  const toggleAccordion = (id: string) => {
    setExpandedTopicIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentTopicIndex = discipline.topics.findIndex((t) => t.id === selectedTopicId);
  const nextTopic = discipline.topics[currentTopicIndex + 1] || discipline.topics[0];
  const currentTopic = discipline.topics.find((t) => t.id === selectedTopicId) || discipline.topics[0];
  const topicContent = getTopicFullContent(discipline, currentTopic?.id || '', currentTopic?.name || '');

  const currentTopicQuestions = discQuestions.filter((q) => q.topicId === selectedTopicId || q.topicName === currentTopic?.name);
  const currentTopicFlashcards = discFlashcards.filter((f) => f.topicId === selectedTopicId || f.topicName === currentTopic?.name);

  const completedTopicsCount = progress.completedTopicIds.filter((id) =>
    discipline.topics.some((t) => t.id === id)
  ).length;
  const progressPercent = Math.round((completedTopicsCount / Math.max(1, discipline.topics.length)) * 100);

  const filteredTopics = discipline.topics.filter((t) =>
    t.name.toLowerCase().includes(topicSearchQuery.toLowerCase())
  );

  const currentFlashcard = discFlashcards[currentFlashcardIndex];

  return (
    <div className="w-full space-y-6">
      {/* 1. DISCIPLINE BANNER & INSTITUTIONAL HEADER */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 md:p-8 border shadow-xl ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-indigo-900/50 text-white'
            : 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 border-indigo-800 text-white'
        }`}
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Bar Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-md"
                title="Voltar ao Painel"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-900 uppercase tracking-wider">
                    TJAM – Edital 2026
                  </span>
                  <span className="text-xs font-bold text-slate-300">#{discipline.code}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-0.5">{discipline.name}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onOpenAIAssistant(
                    `Forneça um guia completo de estudos e estratégia de alta performance para a disciplina ${discipline.name} no concurso do TJAM.`
                  )
                }
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Guia Estratégico com IA
              </button>
            </div>
          </div>

          {/* Teacher & Overview Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed max-w-3xl">
                {discipline.description ||
                  `Ambiente de aprendizado completo com teoria aprofundada, doutrina, jurisprudência atualizada dos Tribunais Superiores, Lei Seca comentada, resumos em esquemas e banco de questões do TJAM.`}
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-slate-300">
                <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Foco: Assistente Judiciário
                </span>
                <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" /> Nível: Médio / Superior
                </span>
                <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Atualizado 2026
                </span>
              </div>
            </div>

            {/* Professor Card */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-800 shrink-0 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Professor Responsável"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5 text-xs">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-300">Professor Responsável</span>
                <h4 className="font-extrabold text-white text-sm">Prof. Dr. Carlos Eduardo Solimões</h4>
                <p className="text-[11px] text-slate-300">Ex-Juiz de Direito & Especialista TJAM</p>
              </div>
            </div>
          </div>

          {/* Quantitative Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] uppercase text-slate-400 font-extrabold block">Carga Horária</span>
              <span className="text-base font-extrabold text-amber-300 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 45 Horas
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] uppercase text-slate-400 font-extrabold block">Módulos</span>
              <span className="text-base font-extrabold text-white flex items-center justify-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> {discipline.topics.length}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] uppercase text-slate-400 font-extrabold block">Aulas</span>
              <span className="text-base font-extrabold text-white flex items-center justify-center gap-1">
                <Video className="w-3.5 h-3.5 text-blue-400" /> {discipline.topics.length * 2}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] uppercase text-slate-400 font-extrabold block">Questões</span>
              <span className="text-base font-extrabold text-white flex items-center justify-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> {discQuestions.length}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] uppercase text-slate-400 font-extrabold block">Flashcards</span>
              <span className="text-base font-extrabold text-white flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5 text-yellow-400" /> {discFlashcards.length}
              </span>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-slate-300">Progresso Geral da Disciplina</span>
              <span className="text-emerald-400">{progressPercent}% Concluído ({completedTopicsCount}/{discipline.topics.length} Módulos)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-xs font-bold">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveTab('aulas')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'aulas'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4 text-emerald-500" /> Ambiente de Aula
          </button>

          <button
            onClick={() => setActiveTab('topicos')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'topicos'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LayoutList className="w-4 h-4 text-blue-500" /> Módulos Expansíveis ({discipline.topics.length})
          </button>

          <button
            onClick={() => setActiveTab('questoes')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'questoes'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-500" /> Banco de Questões ({discQuestions.length})
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" /> Flashcards Anki ({discFlashcards.length})
          </button>

          <button
            onClick={() => setActiveTab('anotacoes')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'anotacoes'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4 text-rose-500" /> Caderno de Anotações
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-semibold px-2">
          Atualizado para o Edital do TJAM
        </div>
      </div>

      {/* TOAST CONGRATULATIONS & NEXT LESSON RECOMMENDATION */}
      {showNextLessonToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-md">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm">Tópico concluído com sucesso! 🎉</h4>
              <p className="text-xs opacity-90">Sua evolução foi registrada. Recomendação de estudo imediata:</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedTopicId(nextTopic.id);
                setActiveTab('aulas');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
            >
              Ir para Próxima Aula ({nextTopic.name}) <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold shadow-sm flex items-center gap-1.5"
            >
              Praticar Flashcards <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. TAB 1: INTEGRATED CLASSROOM ENVIRONMENT (AULAS) */}
      {activeTab === 'aulas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Lesson Index & Topic Selector */}
          <div
            className={`lg:col-span-3 p-5 rounded-3xl border space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-2">
              <h3 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Sumário das Aulas</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {completedTopicsCount}/{discipline.topics.length}
                </span>
              </h3>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pesquisar aulas..."
                  value={topicSearchQuery}
                  onChange={(e) => setTopicSearchQuery(e.target.value)}
                  className={`w-full pl-8 pr-3 py-2 rounded-xl border text-xs outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredTopics.map((t, idx) => {
                const isCompleted = progress.completedTopicIds.includes(t.id);
                const isSelected = selectedTopicId === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => handleTopicSelect(t.id)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : isDarkMode
                        ? 'bg-slate-800/50 border-slate-700/60 text-slate-200 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className={`w-5 h-5 rounded-lg text-[10px] font-extrabold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="truncate">{t.name}</span>
                    </div>

                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Rich Lesson Content Area */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Header Meta & Completion Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      Módulo Teórico & Doutrina
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{discipline.name}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                    {currentTopic?.name}
                  </h2>
                </div>

                <button
                  onClick={() => handleToggleTopicCompletionWithToast(selectedTopicId)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                    progress.completedTopicIds.includes(selectedTopicId)
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {progress.completedTopicIds.includes(selectedTopicId) ? 'Aula Concluída ✓' : 'Marcar como Concluída'}
                </button>
              </div>

              {/* Lesson Overview Stats */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Tempo Estimado</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-blue-500" /> 45 min
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Nível de Cobrança</span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> Alto no TJAM
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Revisão Espaçada</span>
                  <span className="font-extrabold text-purple-600 dark:text-purple-400 flex items-center gap-1 mt-0.5">
                    <Zap className="w-3.5 h-3.5" /> 24h / 7d / 30d
                  </span>
                </div>
              </div>

              {/* Theoretical Modules */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  Desenvolvimento Teórico do Edital
                </h3>

                <div className="space-y-4">
                  {topicContent.theoreticalModules.map((mod, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border space-y-2 ${
                        isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50/80 border-slate-200'
                      }`}
                    >
                      <h4 className="font-bold text-xs md:text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> {mod.title}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {mod.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumos e Pontos Chave */}
              <div className="space-y-4 pt-2">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Resumo de Alta Retenção & Síntese da Prova
                </h3>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs md:text-sm leading-relaxed space-y-2">
                  <h4 className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4" /> Síntese Completa:
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">{topicContent.fullSummary}</p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 text-xs md:text-sm ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-500" /> Pontos Chave para Decora/Fixação:
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                    {topicContent.quickSummaryPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lei Seca e Jurisprudência */}
              <div className="space-y-4 pt-2">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Scale className="w-4 h-4 text-indigo-500" />
                  Legislação Seca e Jurisprudência do TJAM
                </h3>

                <div className="space-y-3">
                  {topicContent.dryLawArticles.map((art, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border space-y-2 text-xs ${
                        isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                          {art.act} - {art.number}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500">
                          Dispositivo Legal
                        </span>
                      </div>
                      <p className="italic text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                        "{art.text}"
                      </p>
                      <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        ⚡ Destaque da Lei: {art.keyHighlight}
                      </p>
                    </div>
                  ))}
                </div>

                {topicContent.jurisprudencePrecedents.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {topicContent.jurisprudencePrecedents.map((jur, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border space-y-1.5 text-xs ${
                          isDarkMode ? 'bg-purple-950/20 border-purple-800/40' : 'bg-purple-50 border-purple-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-extrabold text-[10px]">
                            {jur.court}
                          </span>
                          <span className="font-bold text-purple-700 dark:text-purple-300">{jur.reference}</span>
                        </div>
                        <h5 className="font-bold text-slate-900 dark:text-white mt-1">{jur.title}</h5>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{jur.summary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Esquemas & Quadros Comparativos */}
              {topicContent.comparativeTables.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                    Quadro Comparativo de Fixação
                  </h3>

                  {topicContent.comparativeTables.map((tbl, idx) => (
                    <div key={idx} className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            {tbl.headers.map((h, i) => (
                              <th key={i} className="p-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={isDarkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-700 dark:text-slate-300">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* Dicas e Pegadinhas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" /> Dicas da Banca Examinadora:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    {topicContent.examTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2 text-xs">
                  <h4 className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Pegadinhas Frequentes:
                  </h4>
                  <div className="space-y-1.5">
                    {topicContent.examTraps.map((trap, i) => (
                      <div key={i} className="space-y-0.5">
                        <p className="font-bold text-rose-600 dark:text-rose-400">❌ Armadilha: {trap.trap}</p>
                        <p className="text-emerald-700 dark:text-emerald-400 font-medium">✓ Certo: {trap.correctReality}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mnemônicos */}
              {topicContent.mnemonics.length > 0 && (
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2 text-xs pt-2">
                  <h4 className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                    <Brain className="w-4 h-4" /> Mnemônicos de Memorização:
                  </h4>
                  {topicContent.mnemonics.map((mn, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-extrabold shrink-0">
                        {mn.phrase}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{mn.expansion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Quick Study Tools */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Notes Card */}
            <div
              className={`p-5 rounded-3xl border space-y-3 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase text-slate-500 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-emerald-500" /> Anotações do Tópico
                </h4>
                <button
                  onClick={handleSaveNote}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-sm"
                >
                  Salvar
                </button>
              </div>

              <textarea
                rows={6}
                placeholder="Anote aqui seus pontos fracos ou lembretes deste tópico..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs leading-relaxed outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Quick Topic Flashcards Widget */}
            <div
              className={`p-5 rounded-3xl border space-y-3 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase text-slate-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Flashcards deste Tópico
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                  {currentTopicFlashcards.length} cards
                </span>
              </div>

              {currentTopicFlashcards.length > 0 ? (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
                  <p className="font-bold text-slate-900 dark:text-white line-clamp-2">
                    {currentTopicFlashcards[0]?.front}
                  </p>
                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-[11px] shadow-sm transition-all"
                  >
                    Praticar no Anki →
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Sem flashcards cadastrados especificamente para este tópico.</p>
              )}
            </div>

            {/* AI Assistant Callout */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-950 text-white border border-purple-500/30 space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h4 className="font-extrabold text-xs">Tutor IA do Concurso</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ficou com dúvida sobre o tópico "{currentTopic?.name}"? Pergunte ao assistente especialista em TJAM.
              </p>
              <button
                onClick={() =>
                  onOpenAIAssistant(
                    `Tire minhas dúvidas e me explique em detalhes o tópico "${currentTopic?.name}" da disciplina ${discipline.name}.`
                  )
                }
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                Abrir Tutor IA agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: EXPANDABLE MODULES VIEW (TÓPICOS/MÓDULOS) */}
      {activeTab === 'topicos' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-extrabold">Organização por Módulos Expansíveis</h3>
              <p className="text-xs text-slate-500">Expanda cada módulo para visualizar aulas, resumos, exercícios e materiais anexo</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpandedTopicIds(discipline.topics.map((t) => t.id))}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
              >
                Expandir Todos
              </button>
              <button
                onClick={() => setExpandedTopicIds([])}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
              >
                Recolher Todos
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {discipline.topics.map((topic, index) => {
              const isExpanded = expandedTopicIds.includes(topic.id);
              const isCompleted = progress.completedTopicIds.includes(topic.id);
              const topQuestCount = discQuestions.filter((q) => q.topicId === topic.id || q.topicName === topic.name).length;
              const topFlashCount = discFlashcards.filter((f) => f.topicId === topic.id || f.topicName === topic.name).length;

              return (
                <div
                  key={topic.id}
                  className={`rounded-3xl border transition-all ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => toggleAccordion(topic.id)}
                    className="p-5 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all rounded-3xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-2xl text-xs font-extrabold flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Módulo {index + 1}</span>
                          {isCompleted && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                              ✓ Concluído
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{topic.name}</h4>
                      </div>
                    </div>

                    {/* Badge Counts */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                        📖 2 Aulas
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
                        ❓ {topQuestCount || 10} Questões
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                        🃏 {topFlashCount || 5} Flashcards
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1">
                        🧠 1 Mapa
                      </span>
                      <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content View */}
                  {isExpanded && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-800/20 rounded-b-3xl">
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Conteúdo programático oficial referente a {topic.name}. Acesse abaixo o material em texto, mapas mentais e questões comentadas.
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedTopicId(topic.id);
                            setActiveTab('aulas');
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" /> Estudar Teoria do Módulo
                        </button>

                        <button
                          onClick={() => {
                            setSelectedTopicId(topic.id);
                            setActiveTab('questoes');
                          }}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm flex items-center gap-2"
                        >
                          <HelpCircle className="w-4 h-4" /> Resolver Questões
                        </button>

                        <button
                          onClick={() => {
                            setSelectedTopicId(topic.id);
                            setActiveTab('flashcards');
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold shadow-sm flex items-center gap-2"
                        >
                          <Zap className="w-4 h-4" /> Revisar Flashcards
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 3: BANCO DE QUESTÕES (INTERACTIVE QUIZ) */}
      {activeTab === 'questoes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold">Banco de Questões de Concursos do TJAM</h3>
              <p className="text-xs text-slate-500">Resolva, receba correção imediata e acione fundamentação e explicações com IA Gemini</p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/15 text-purple-600 dark:text-purple-400">
              {discQuestions.length} Questões Disponíveis
            </span>
          </div>

          {discQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Ainda não há questões cadastradas para esta disciplina.
              </p>
              <button
                onClick={() =>
                  onOpenAIAssistant(`Crie 3 questões inéditas do TJAM sobre a disciplina ${discipline.name}.`)
                }
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md"
              >
                Gerar Questões com IA agora
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {discQuestions.map((q, qIndex) => {
                const selectedOpt = questionAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctOptionId;
                const aiExplanation = aiExplanationMap[q.id];
                const isAiLoading = loadingAiMap[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border space-y-4 transition-all ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-extrabold">
                          Questão #{qIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{q.institution || 'TJAM / FGV'}</span>
                        <span className="text-xs font-semibold text-slate-400">({q.topicName})</span>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          q.difficulty === 'fácil'
                            ? 'bg-emerald-500/15 text-emerald-600'
                            : q.difficulty === 'médio'
                            ? 'bg-amber-500/15 text-amber-600'
                            : 'bg-rose-500/15 text-rose-600'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </div>

                    <p className="text-sm font-medium leading-relaxed text-slate-900 dark:text-slate-100">{q.statement}</p>

                    <div className="space-y-2 pt-2">
                      {q.options.map((opt) => {
                        const isThisSelected = selectedOpt === opt.id;
                        const isThisCorrect = opt.id === q.correctOptionId;

                        let optionStyle = isDarkMode
                          ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-200'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                        if (isAnswered) {
                          if (isThisCorrect) {
                            optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 font-bold';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt.text}</span>
                            {isAnswered && isThisCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                            {isAnswered && isThisSelected && !isCorrect && (
                              <X className="w-4 h-4 text-rose-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                        <div
                          className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-300'
                          }`}
                        >
                          <div className="font-extrabold flex items-center gap-2 mb-1">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Resposta Correta!
                              </>
                            ) : (
                              <>
                                <AlertOctagon className="w-4 h-4 text-rose-500" /> Resposta Incorreta (Inclusa no Caderno de Erros)
                              </>
                            )}
                          </div>
                          <p>{q.explanation}</p>
                          {q.legalReference && (
                            <p className="mt-2 font-bold opacity-80">Fundamentação Legal: {q.legalReference}</p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => handleRequestAiExplanation(q)}
                            disabled={isAiLoading}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {isAiLoading ? 'Analisando com IA...' : 'Explicar com IA Gemini'}
                          </button>
                        </div>

                        {aiExplanation && (
                          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2 text-xs">
                            <h5 className="font-bold text-purple-400 flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4" /> Explicação do Tutor IA:
                            </h5>
                            <p className="text-slate-300 leading-relaxed">{aiExplanation.summary}</p>
                            <p className="text-slate-300 leading-relaxed mt-2">{aiExplanation.detailedExplanation}</p>
                            {aiExplanation.memorizationTip && (
                              <div className="mt-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 font-semibold text-purple-300">
                                💡 Dica de Prova: {aiExplanation.memorizationTip}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. TAB 4: FLASHCARDS (SPACED REPETITION ANKI) */}
      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-extrabold">Flashcards de Repetição Espaçada</h3>
            <p className="text-xs text-slate-500">Fixação de prazos, leis secas e jurisprudência com revisão Anki</p>
          </div>

          {discFlashcards.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <Brain className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Nenhum flashcard cadastrado para esta disciplina.
              </p>
              <button
                onClick={() =>
                  onOpenAIAssistant(`Gere 5 flashcards para a disciplina ${discipline.name}.`)
                }
                className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md"
              >
                Gerar Flashcards com IA agora
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`min-h-[280px] p-8 rounded-3xl border shadow-xl cursor-pointer flex flex-col justify-between transition-all duration-500 transform hover:scale-[1.01] ${
                  isFlipped
                    ? 'bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 text-white border-purple-500/50'
                    : isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400">
                  <span>{currentFlashcard?.topicName}</span>
                  <span>
                    Card {currentFlashcardIndex + 1} de {discFlashcards.length}
                  </span>
                </div>

                <div className="py-6 text-center space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
                    {isFlipped ? 'RESPOSTA DO FLASHCARD' : 'PERGUNTA (TOQUE PARA VIRAR)'}
                  </span>
                  <p className="text-lg md:text-xl font-extrabold leading-relaxed">
                    {isFlipped ? currentFlashcard?.back : currentFlashcard?.front}
                  </p>
                </div>

                <div className="text-center text-[11px] text-slate-500 font-medium">
                  {isFlipped ? 'Escolha sua avaliação para ajustar a próxima revisão:' : 'Clique no card para revelar a resposta'}
                </div>
              </div>

              {isFlipped && (
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      onReviewFlashcard(currentFlashcard.id, 'errei');
                      setIsFlipped(false);
                      setCurrentFlashcardIndex((prev) => (prev + 1) % discFlashcards.length);
                    }}
                    className="p-3.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/30 transition-all text-center"
                  >
                    ❌ Errei (24h)
                  </button>

                  <button
                    onClick={() => {
                      onReviewFlashcard(currentFlashcard.id, 'difícil');
                      setIsFlipped(false);
                      setCurrentFlashcardIndex((prev) => (prev + 1) % discFlashcards.length);
                    }}
                    className="p-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/30 transition-all text-center"
                  >
                    ⚡ Difícil (7d)
                  </button>

                  <button
                    onClick={() => {
                      onReviewFlashcard(currentFlashcard.id, 'médio');
                      setIsFlipped(false);
                      setCurrentFlashcardIndex((prev) => (prev + 1) % discFlashcards.length);
                    }}
                    className="p-3.5 rounded-2xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-500/30 transition-all text-center"
                  >
                    👍 Bom (15d)
                  </button>

                  <button
                    onClick={() => {
                      onReviewFlashcard(currentFlashcard.id, 'fácil');
                      setIsFlipped(false);
                      setCurrentFlashcardIndex((prev) => (prev + 1) % discFlashcards.length);
                    }}
                    className="p-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/30 transition-all text-center"
                  >
                    ✅ Fácil (30d)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 7. TAB 5: MAPAS MENTAIS (CANVAS VIEW) */}
      {activeTab === 'mapas' && (
        <div className="space-y-4">
          {discMindMaps.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Nenhum mapa mental cadastrado para esta disciplina.
              </p>
              <button
                onClick={() =>
                  onOpenAIAssistant(`Gere um mapa mental completo para a disciplina ${discipline.name}.`)
                }
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md"
              >
                Gerar Mapa Mental com IA agora
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {discMindMaps.map((map) => (
                  <button
                    key={map.id}
                    onClick={() => setSelectedMapId(map.id)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedMapId === map.id
                        ? 'bg-emerald-600 text-white shadow-md'
                        : isDarkMode
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {map.title}
                  </button>
                ))}
              </div>

              {activeMindMap && (
                <div className="h-[600px] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
                  <MindMapCanvas
                    mindMap={activeMindMap}
                    onUpdateMindMap={onUpdateMindMap}
                    isDarkMode={isDarkMode}
                    nodeNotes={progress?.nodeNotes || {}}
                    onSaveNodeNote={(nodeId, text) => onSavePersonalNote(nodeId, text)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 8. TAB 6: CADERNO DE ANOTAÇÕES */}
      {activeTab === 'anotacoes' && (
        <div className="p-6 rounded-3xl border space-y-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">Minhas Anotações de Estudo ({discipline.name})</h3>
            <button
              onClick={handleSaveNote}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
            >
              Salvar Anotação
            </button>
          </div>

          <textarea
            rows={12}
            placeholder="Escreva aqui suas observações, resumos de jurisprudência ou lembretes privados para esta disciplina..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className={`w-full p-4 rounded-2xl border text-xs leading-relaxed outline-none ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>
      )}
    </div>
  );
};
