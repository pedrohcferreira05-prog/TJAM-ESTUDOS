import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  Download,
  Brain,
  Send,
  CheckCircle2,
  Check,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Search,
  Filter,
  Layers,
  Award,
  Clock,
  ExternalLink,
  X,
  ChevronRight,
  Scale,
  Shield,
  Landmark,
  Compass,
  Cpu,
  MessageSquare,
  Languages,
  PenTool,
  Users,
  Play,
  Share2,
  FileCheck,
  RotateCcw
} from 'lucide-react';
import {
  Discipline,
  Question,
  Flashcard,
  VideoLesson,
  PublishedMaterial,
  StudentSubmission,
  MindMap,
  Turma,
  StudentAccount
} from '../types';
import { ALL_SUBJECTS, SubjectMeta } from './MateriasPortalView';
import {
  procPenalLessonSummaryPoints,
  procPenalMcQuestionsData,
  procPenalTfQuestionsData,
  procPenalDiscursiveQuestionsData,
  procPenalPracticalCase
} from '../data/processoPenalLessonData';

export interface QuestionAttemptRecord {
  id?: string;
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  answeredAt: string;
  studentId?: string;
  studentName?: string;
}

interface TeacherDisciplinasManagerProps {
  disciplines: Discipline[];
  onAddDiscipline?: (discipline: Discipline) => void;
  onUpdateDiscipline?: (id: string, updates: Partial<Discipline>) => void;
  onDeleteDiscipline?: (id: string) => void;
  questions: Question[];
  onAddQuestion: (q: Question) => void;
  onUpdateQuestion?: (qId: string, updated: Partial<Question>) => void;
  onDeleteQuestion?: (qId: string) => void;
  flashcards: Flashcard[];
  onAddFlashcard: (f: Flashcard) => void;
  onUpdateFlashcard?: (id: string, updates: Partial<Flashcard>) => void;
  onDeleteFlashcard?: (id: string) => void;
  videoLessons: VideoLesson[];
  onAddVideoLesson?: (video: Omit<VideoLesson, 'id'>) => void;
  onUpdateVideoLesson?: (videoId: string, updated: Partial<VideoLesson>) => void;
  onDeleteVideoLesson?: (videoId: string) => void;
  publishedMaterials: PublishedMaterial[];
  onAddPublishedMaterial: (material: PublishedMaterial) => void;
  onToggleMaterialRelease?: (id: string) => void;
  onDeleteMaterial?: (id: string) => void;
  submissions: StudentSubmission[];
  onGradeSubmission: (id: string, grade: number, feedback: string) => void;
  mindMaps?: MindMap[];
  onSaveMindMap?: (map: MindMap) => void;
  onDeleteMindMap?: (id: string) => void;
  turmas?: Turma[];
  students?: StudentAccount[];
  questionAttempts?: QuestionAttemptRecord[];
  completedTopicIds?: string[];
  savedLessons?: Record<string, any>;
  onToggleLessonCompleted?: (lessonKey: string, completed: boolean) => void;
  onResetQuestionAttempt?: (questionId: string) => void;
  isDarkMode?: boolean;
}

const DISCIPLINE_ALIAS_MAP: Record<string, string[]> = {
  direito_admin: ['direito-administrativo', 'direito_administrativo', 'direitoadministrativo', 'direito_admin', 'direitoadmin', 'administrativo', 'admin'],
  direito_const: ['direito-constitucional', 'direito_constitucional', 'direitoconstitucional', 'direito_const', 'direitoconst', 'constitucional', 'const'],
  processo_civil: ['processo-civil', 'processo_civil', 'processocivil', 'proc-civil', 'proccivil', 'civil'],
  processo_penal: ['processo-penal', 'processo_penal', 'processopenal', 'proc-penal', 'procpenal', 'penal'],
  legislacao_tjam: ['legislacao-tjam', 'legislacao_tjam', 'legislacaotjam', 'tjam', 'regimento-tjam', 'regimento'],
  portugues: ['lingua-portuguesa', 'lingua_portuguesa', 'linguaportuguesa', 'portugues', 'portuguesa', 'port'],
  informatica: ['informatica', 'nocoes-informatica', 'nocoes_informatica', 'nocoesdeinformatica', 'info'],
  geografia_amazonas: ['geografia-amazonas', 'geografia_amazonas', 'geografiaamazonas', 'geo-am', 'geografia', 'amazonas'],
  libras: ['libras', 'acessibilidade-inclusao', 'acessibilidade_inclusao', 'acessibilidade', 'inclusao', 'libras-acessibilidade'],
  ingles: ['ingles', 'lingua-inglesa', 'lingua_inglesa', 'linguainglesa', 'english'],
  escrita_leitura: ['escrita_leitura', 'escrita-leitura', 'redacao-discursiva', 'redacao_discursiva', 'discursiva', 'discursivas', 'redacao', 'escrita']
};

// Matching helper to link any subject ID with discipline ID
export function matchesDiscipline(discId?: string, subjectId?: string, subjectSlug?: string, subjectName?: string): boolean {
  if (!discId) return false;
  const d = discId.toLowerCase().replace(/[-_]/g, '');
  if (subjectId) {
    const s = subjectId.toLowerCase().replace(/[-_]/g, '');
    if (d === s) return true;
    for (const [key, aliases] of Object.entries(DISCIPLINE_ALIAS_MAP)) {
      const k = key.replace(/[-_]/g, '');
      const cleanAliases = aliases.map(a => a.replace(/[-_]/g, ''));
      const subMatches = s === k || cleanAliases.includes(s);
      const discMatches = d === k || cleanAliases.includes(d);
      if (subMatches && discMatches) return true;
    }
  }
  if (subjectSlug) {
    const sl = subjectSlug.toLowerCase().replace(/[-_]/g, '');
    if (d === sl) return true;
    for (const [key, aliases] of Object.entries(DISCIPLINE_ALIAS_MAP)) {
      const cleanAliases = aliases.map(a => a.replace(/[-_]/g, ''));
      if (cleanAliases.includes(sl) && (cleanAliases.includes(d) || key.replace(/[-_]/g, '') === d)) return true;
    }
  }
  if (subjectName) {
    const sn = subjectName.toLowerCase();
    if (sn.includes('administr') && (d.includes('admin') || d.includes('administrativo'))) return true;
    if (sn.includes('constituc') && (d.includes('const') || d.includes('constitucional'))) return true;
    if (sn.includes('processual civil') || (sn.includes('civil') && d.includes('civil'))) return true;
    if (sn.includes('processual penal') || (sn.includes('penal') && d.includes('penal'))) return true;
    if (sn.includes('portugu') && (d.includes('port') || d.includes('lingua'))) return true;
    if (sn.includes('tjam') && d.includes('tjam')) return true;
    if (sn.includes('geograf') && (d.includes('geo') || d.includes('amazonas'))) return true;
    if ((sn.includes('libra') || sn.includes('acessib')) && (d.includes('libra') || d.includes('acess'))) return true;
    if (sn.includes('inform') && d.includes('info')) return true;
    if (sn.includes('ingl') && d.includes('ing')) return true;
    if (sn.includes('escrita') && (d.includes('escrita') || d.includes('redacao') || d.includes('discursiva'))) return true;
  }
  return false;
}

export const TeacherDisciplinasManager: React.FC<TeacherDisciplinasManagerProps> = ({
  disciplines,
  onAddDiscipline,
  onUpdateDiscipline,
  onDeleteDiscipline,
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  flashcards,
  onAddFlashcard,
  onUpdateFlashcard,
  onDeleteFlashcard,
  videoLessons,
  onAddVideoLesson,
  onUpdateVideoLesson,
  onDeleteVideoLesson,
  publishedMaterials,
  onAddPublishedMaterial,
  onToggleMaterialRelease,
  onDeleteMaterial,
  submissions,
  onGradeSubmission,
  mindMaps = [],
  turmas = [],
  students = [],
  questionAttempts = [],
  completedTopicIds = [],
  savedLessons = {},
  onToggleLessonCompleted,
  onResetQuestionAttempt,
}) => {
  // Navigation & filter state
  const [selectedSubject, setSelectedSubject] = useState<SubjectMeta | null>(null);
  const [activeTab, setActiveTab] = useState<'aulas' | 'videos' | 'questoes' | 'materiais' | 'flashcards' | 'tarefas' | 'mapas'>('aulas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Conhecimentos Básicos' | 'Conhecimentos Específicos'>('all');

  // Custom Aulas added by teacher
  const [customAulas, setCustomAulas] = useState<Record<string, SubjectMeta['aulas']>>(() => {
    const saved = localStorage.getItem('tjam_custom_subject_aulas');
    return saved ? JSON.parse(saved) : {};
  });

  // Modals
  const [showAddAulaModal, setShowAddAulaModal] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showAddFlashcardModal, setShowAddFlashcardModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState<StudentSubmission | null>(null);
  const [gradeValue, setGradeValue] = useState<number>(10);
  const [feedbackValue, setFeedbackValue] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [questionsSubTab, setQuestionsSubTab] = useState<'banco' | 'resolucoes'>('banco');
  const [previewAula, setPreviewAula] = useState<{ aula: any; subject: SubjectMeta } | null>(null);
  const [previewTab, setPreviewTab] = useState<'conteudo' | 'gabarito' | 'respostas' | 'progresso'>('conteudo');
  const [modalGradeInput, setModalGradeInput] = useState<number>(10);
  const [modalFeedbackInput, setModalFeedbackInput] = useState<string>('');
  const [modalGradingSubId, setModalGradingSubId] = useState<string | null>(null);

  // Form inputs for Add Aula
  const [newAulaTitle, setNewAulaTitle] = useState('');
  const [newAulaDesc, setNewAulaDesc] = useState('');
  const [newAulaDuration, setNewAulaDuration] = useState('60 min');
  const [newAulaHasVideo, setNewAulaHasVideo] = useState(true);
  const [newAulaHasExercises, setNewAulaHasExercises] = useState(true);
  const [newAulaHasMaterials, setNewAulaHasMaterials] = useState(true);
  const [newAulaHasTask, setNewAulaHasTask] = useState(true);

  // Form inputs for Edit Subject
  const [editSubjectName, setEditSubjectName] = useState('');
  const [editSubjectTeacher, setEditSubjectTeacher] = useState('');
  const [editSubjectDesc, setEditSubjectDesc] = useState('');

  // Form inputs for Add Video
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoDuration, setNewVideoDuration] = useState(45);
  const [newVideoSummary, setNewVideoSummary] = useState('');

  // Form inputs for Add Question
  const [newQStatement, setNewQStatement] = useState('');
  const [newQOptions, setNewQOptions] = useState(['', '', '', '', '']);
  const [newQCorrect, setNewQCorrect] = useState(0);
  const [newQExplanation, setNewQExplanation] = useState('');
  const [newQDifficulty, setNewQDifficulty] = useState<'fácil' | 'médio' | 'difícil'>('médio');

  // Form inputs for Add Material
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatType, setNewMatType] = useState<PublishedMaterial['type']>('pdf');
  const [newMatContent, setNewMatContent] = useState('');
  const [newMatUrl, setNewMatUrl] = useState('');
  const [newMatReleased, setNewMatReleased] = useState(true);

  // Form inputs for Add Flashcard
  const [newFcFront, setNewFcFront] = useState('');
  const [newFcBack, setNewFcBack] = useState('');
  const [newFcDifficulty, setNewFcDifficulty] = useState<'fácil' | 'médio' | 'difícil'>('médio');

  // Form inputs for Add Task (Estudo de Caso / Redação)
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPrompt, setNewTaskPrompt] = useState('');

  // Filter tasks
  const [taskFilter, setTaskFilter] = useState<'all' | 'pendente' | 'corrigido'>('all');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Get matching discipline from `disciplines` array
  const getMatchingDiscipline = (sub: SubjectMeta): Discipline | undefined => {
    return disciplines.find((d) => matchesDiscipline(d.id, sub.id, sub.slug, sub.name));
  };

  // Get effective aulas for a subject (merging default with any custom ones added)
  const getSubjectAulas = (sub: SubjectMeta) => {
    const extra = customAulas[sub.id] || [];
    return [...sub.aulas, ...extra];
  };

  // Filtered subjects
  const filteredSubjects = ALL_SUBJECTS.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || sub.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Submissions for a given subject
  const getSubjectSubmissions = (sub: SubjectMeta) => {
    return submissions.filter((s) => {
      const discMatch = matchesDiscipline(s.disciplineName, sub.id, sub.slug, sub.name);
      const nameMatch =
        s.disciplineName.toLowerCase().includes(sub.name.toLowerCase()) ||
        sub.name.toLowerCase().includes(s.disciplineName.toLowerCase());
      return discMatch || nameMatch;
    });
  };

  // Questions for a given subject
  const getSubjectQuestions = (sub: SubjectMeta) => {
    const disc = getMatchingDiscipline(sub);
    return questions.filter((q) => {
      if (disc && q.disciplineId === disc.id) return true;
      return matchesDiscipline(q.disciplineId, sub.id, sub.slug, sub.name);
    });
  };

  // Student Question attempts for a given subject
  const getSubjectQuestionAttempts = (sub: SubjectMeta) => {
    const subQuestions = getSubjectQuestions(sub);
    const subQIds = new Set(subQuestions.map((q) => q.id));
    return (questionAttempts || []).filter((att) => subQIds.has(att.questionId));
  };

  // Student Aulas progress for a given subject
  const getSubjectAulasProgress = (sub: SubjectMeta) => {
    const aulas = getSubjectAulas(sub);
    const completedCount = aulas.filter((a) => {
      const key = `${sub.id}_${a.id}`;
      return (completedTopicIds || []).includes(key) || (savedLessons && savedLessons[key]?.completed);
    }).length;
    const startedCount = aulas.filter((a) => {
      const key = `${sub.id}_${a.id}`;
      return savedLessons && savedLessons[key]?.started && !savedLessons[key]?.completed;
    }).length;
    return {
      total: aulas.length,
      completed: completedCount,
      started: startedCount,
      percentage: aulas.length > 0 ? Math.round((completedCount / (aulas.length || 1)) * 100) : 0,
    };
  };

  // Student Questions stats for a given subject
  const getSubjectQuestionsStats = (sub: SubjectMeta) => {
    const attempts = getSubjectQuestionAttempts(sub);
    const correct = attempts.filter((a) => a.isCorrect).length;
    const accuracy = attempts.length > 0 ? Math.round((correct / attempts.length) * 100) : 0;
    return {
      totalAttempts: attempts.length,
      correct,
      wrong: attempts.length - correct,
      accuracy,
    };
  };

  // Videos for a given subject
  const getSubjectVideos = (sub: SubjectMeta) => {
    const disc = getMatchingDiscipline(sub);
    return videoLessons.filter((v) => {
      if (disc && v.disciplineId === disc.id) return true;
      return matchesDiscipline(v.disciplineId, sub.id, sub.slug, sub.name);
    });
  };

  // Materials for a given subject
  const getSubjectMaterials = (sub: SubjectMeta) => {
    const disc = getMatchingDiscipline(sub);
    return publishedMaterials.filter((m) => {
      if (disc && m.disciplineId === disc.id) return true;
      return matchesDiscipline(m.disciplineId, sub.id, sub.slug, sub.name);
    });
  };

  // Flashcards for a given subject
  const getSubjectFlashcards = (sub: SubjectMeta) => {
    const disc = getMatchingDiscipline(sub);
    return flashcards.filter((f) => {
      if (disc && f.disciplineId === disc.id) return true;
      return matchesDiscipline(f.disciplineId, sub.id, sub.slug, sub.name);
    });
  };

  // Mindmaps for a given subject
  const getSubjectMindMaps = (sub: SubjectMeta) => {
    const disc = getMatchingDiscipline(sub);
    return mindMaps.filter((m) => {
      if (disc && m.disciplineId === disc.id) return true;
      return matchesDiscipline(m.disciplineId, sub.id, sub.slug, sub.name);
    });
  };

  // Total pending tasks count across all subjects
  const totalPendingCorrections = submissions.filter((s) => s.status === 'pendente').length;

  // Handlers
  const handleSaveSubjectEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject) return;
    const disc = getMatchingDiscipline(selectedSubject);
    if (disc && onUpdateDiscipline) {
      onUpdateDiscipline(disc.id, {
        name: editSubjectName || disc.name,
        description: editSubjectDesc || disc.description,
      });
    }
    showToast(`Disciplina "${editSubjectName || selectedSubject.name}" atualizada com sucesso!`);
    setShowEditSubjectModal(false);
  };

  const handleAddAulaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !newAulaTitle.trim()) return;

    const currentAulas = getSubjectAulas(selectedSubject);
    const nextNumber = currentAulas.length + 1;
    const newAula = {
      id: `aula-custom-${Date.now()}`,
      number: nextNumber,
      title: newAulaTitle,
      description: newAulaDesc || 'Tópicos e aulas cadastrados pelo professor para a turma.',
      duration: newAulaDuration || '50 min',
      hasVideo: newAulaHasVideo,
      hasExercises: newAulaHasExercises,
      hasMaterials: newAulaHasMaterials,
      hasTask: newAulaHasTask,
    };

    const updated = {
      ...customAulas,
      [selectedSubject.id]: [...(customAulas[selectedSubject.id] || []), newAula],
    };
    setCustomAulas(updated);
    localStorage.setItem('tjam_custom_subject_aulas', JSON.stringify(updated));

    // Also link a new topic to discipline
    const disc = getMatchingDiscipline(selectedSubject);
    if (disc && onUpdateDiscipline) {
      const newTopics = [
        ...disc.topics,
        { id: `top-${Date.now()}`, name: `Aula ${nextNumber}: ${newAulaTitle}` },
      ];
      onUpdateDiscipline(disc.id, { topics: newTopics });
    }

    setShowAddAulaModal(false);
    setNewAulaTitle('');
    setNewAulaDesc('');
    showToast(`Nova Aula ${nextNumber} adicionada à matéria! Sincronizado com os alunos.`);
  };

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !newVideoTitle.trim()) return;
    const disc = getMatchingDiscipline(selectedSubject);

    if (onAddVideoLesson) {
      onAddVideoLesson({
        disciplineId: disc?.id || selectedSubject.slug,
        topicId: disc?.topics[0]?.id || `top-${selectedSubject.id}`,
        title: newVideoTitle,
        durationMinutes: Number(newVideoDuration) || 45,
        videoUrl: newVideoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        summary: newVideoSummary || `Videoaula oficial ministrada por ${selectedSubject.teacher}.`,
        instructor: selectedSubject.teacher,
        isPublished: true,
      });
      setShowAddVideoModal(false);
      setNewVideoTitle('');
      setNewVideoUrl('');
      setNewVideoSummary('');
      showToast('Videoaula publicada e sincronizada com o portal do aluno!');
    }
  };

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !newQStatement.trim()) return;
    const disc = getMatchingDiscipline(selectedSubject);

    const validOptions = newQOptions
      .map((text, idx) => ({ id: `opt-${idx}`, text: text.trim() }))
      .filter((o) => o.text.length > 0);
    const correctId = `opt-${newQCorrect}`;

    const newQ: Question = {
      id: `q-${Date.now()}`,
      disciplineId: disc?.id || selectedSubject.slug,
      topicId: disc?.topics[0]?.id || `top-${selectedSubject.id}`,
      topicName: disc?.topics[0]?.name || selectedSubject.name,
      statement: newQStatement,
      options: validOptions,
      correctOptionId: correctId,
      explanation: newQExplanation || 'Justificativa técnica fundamentada nas normas do TJAM e jurisprudência dos tribunais superiores.',
      difficulty: newQDifficulty,
      institution: 'FGV / TJAM',
      year: 2026,
    };

    onAddQuestion(newQ);
    setShowAddQuestionModal(false);
    setNewQStatement('');
    setNewQOptions(['', '', '', '', '']);
    setNewQExplanation('');
    showToast('Questão adicionada ao banco da disciplina com sucesso!');
  };

  const handleAddMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !newMatTitle.trim()) return;
    const disc = getMatchingDiscipline(selectedSubject);

    const newMat: PublishedMaterial = {
      id: `mat-${Date.now()}`,
      turmaId: turmas[0]?.id || 'geral',
      disciplineId: disc?.id || selectedSubject.slug,
      topicId: disc?.topics[0]?.id || `top-${selectedSubject.id}`,
      title: newMatTitle,
      type: newMatType,
      content: newMatContent || 'Material didático oficial disponibilizado para download e consulta dos alunos.',
      attachmentUrl: newMatUrl,
      releaseStage: 'Etapa 1',
      releaseDate: new Date().toISOString().slice(0, 10),
      isReleased: newMatReleased,
      createdAt: new Date().toISOString().slice(0, 10),
      authorName: selectedSubject.teacher,
    };

    onAddPublishedMaterial(newMat);
    setShowAddMaterialModal(false);
    setNewMatTitle('');
    setNewMatContent('');
    setNewMatUrl('');
    showToast('Material didático publicado e sincronizado no portal do aluno!');
  };

  const handleAddFlashcardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !newFcFront.trim()) return;
    const disc = getMatchingDiscipline(selectedSubject);

    const newFc: Flashcard = {
      id: `fc-${Date.now()}`,
      disciplineId: disc?.id || selectedSubject.slug,
      topicId: disc?.topics[0]?.id || `top-${selectedSubject.id}`,
      topicName: selectedSubject.name,
      front: newFcFront,
      back: newFcBack,
      difficulty: newFcDifficulty,
    };

    onAddFlashcard(newFc);
    setShowAddFlashcardModal(false);
    setNewFcFront('');
    setNewFcBack('');
    showToast('Flashcard mnemônico cadastrado com sucesso!');
  };

  const handleSaveGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmission) return;

    onGradeSubmission(gradingSubmission.id, gradeValue, feedbackValue);
    setGradingSubmission(null);
    showToast(`Nota ${gradeValue}/10 e parecer enviados ao aluno com sucesso!`);
  };

  // =========================================================================
  // VIEW 2: DENTRO DE UMA DISCIPLINA ESPECÍFICA (PAINEL DO ADMINISTRADOR)
  // =========================================================================
  if (selectedSubject) {
    const IconComp = selectedSubject.icon;
    const subjectAulas = getSubjectAulas(selectedSubject);
    const subjectVideos = getSubjectVideos(selectedSubject);
    const subjectQuestions = getSubjectQuestions(selectedSubject);
    const subjectMaterials = getSubjectMaterials(selectedSubject);
    const subjectFlashcards = getSubjectFlashcards(selectedSubject);
    const subjectSubmissions = getSubjectSubmissions(selectedSubject);
    const subjectMindMaps = getSubjectMindMaps(selectedSubject);
    const disc = getMatchingDiscipline(selectedSubject);

    const pendingForThisSubject = subjectSubmissions.filter((s) => s.status === 'pendente').length;
    const subjectAttempts = getSubjectQuestionAttempts(selectedSubject);
    const subjectAulasStats = getSubjectAulasProgress(selectedSubject);
    const subjectQStats = getSubjectQuestionsStats(selectedSubject);

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Breadcrumb & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={() => setSelectedSubject(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-slate-500 hover:text-sky-600"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Disciplinas do Aluno
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate">{selectedSubject.name}</span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
              🟢 Sincronizado
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditSubjectName(disc?.name || selectedSubject.name);
                setEditSubjectTeacher(selectedSubject.teacher);
                setEditSubjectDesc(disc?.description || selectedSubject.description);
                setShowEditSubjectModal(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" /> Editar Dados Básicos
            </button>

            <button
              onClick={() => setSelectedSubject(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar
            </button>
          </div>
        </div>

        {/* Subject Admin Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-slate-700">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shrink-0">
                <IconComp className="w-8 h-8 text-sky-300" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {selectedSubject.category}
                  </span>
                  <span className="text-xs text-slate-300">
                    Professor Responsável: <strong className="text-white">{selectedSubject.teacher}</strong>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{disc?.name || selectedSubject.name}</h1>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {disc?.description || selectedSubject.description}
                </p>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center min-w-[85px]">
                <span className="text-[10px] font-bold text-emerald-300 uppercase block">Aulas do Aluno</span>
                <span className="text-base font-black text-white">
                  {subjectAulasStats.completed}/{subjectAulas.length}
                </span>
                <span className="text-[9px] text-emerald-300 font-bold block">{subjectAulasStats.percentage}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-center min-w-[85px]">
                <span className="text-[10px] font-bold text-sky-300 uppercase block">Questões Feitas</span>
                <span className="text-base font-black text-white">
                  {subjectAttempts.length}
                </span>
                <span className="text-[9px] text-sky-300 font-bold block">{subjectQStats.accuracy}% acerto</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center min-w-[70px]">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">Banco Geral</span>
                <span className="text-base font-black text-sky-400">{subjectQuestions.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center min-w-[70px]">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">Vídeos</span>
                <span className="text-base font-black text-indigo-400">{subjectVideos.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center min-w-[70px]">
                <span className="text-[10px] font-bold text-slate-300 uppercase block">PDFs</span>
                <span className="text-base font-black text-amber-400">{subjectMaterials.length}</span>
              </div>
              {pendingForThisSubject > 0 && (
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-center min-w-[90px] animate-pulse">
                  <span className="text-[10px] font-bold text-amber-300 uppercase block">A Corrigir</span>
                  <span className="text-base font-black text-amber-400">{pendingForThisSubject}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Tabs Following the Exact Same Categories as the Student Portal */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('aulas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'aulas'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Aulas & Conteúdo ({subjectAulas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'videos'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videoaulas ({subjectVideos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('questoes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'questoes'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Exercícios & Questões ({subjectQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('materiais')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'materiais'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Materiais & PDFs ({subjectMaterials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'flashcards'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Flashcards ({subjectFlashcards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tarefas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 relative ${
              activeTab === 'tarefas'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Tarefas & Correções ({subjectSubmissions.length})</span>
            {pendingForThisSubject > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-2 right-2" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('mapas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'mapas'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mapas Mentais ({subjectMindMaps.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* ABA 1: AULAS & CONTEÚDO PROGRAMÁTICO */}
        {/* ========================================================================= */}
        {activeTab === 'aulas' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  Grade de Aulas da Matéria
                </h3>
                <p className="text-xs text-slate-500">
                  Gerencie as aulas que compõem o conteúdo programático sincronizado com os estudantes.
                </p>
              </div>

              <button
                onClick={() => setShowAddAulaModal(true)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Nova Aula
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectAulas.map((aula) => {
                const aulaKey = `${selectedSubject.id}_${aula.id}`;
                const isCompleted = (completedTopicIds || []).includes(aulaKey) || (savedLessons && savedLessons[aulaKey]?.completed);
                const isStarted = savedLessons && savedLessons[aulaKey]?.started && !isCompleted;

                return (
                  <div
                    key={aula.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sky-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                            Aula {aula.number}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {aula.duration}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900">{aula.title}</h4>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {isCompleted ? (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Concluída pelo Aluno
                          </span>
                        ) : isStarted ? (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            ⏳ Em Andamento
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            ⚪ Não Iniciada
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{aula.description}</p>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {aula.hasVideo && (
                          <span className="p-1 rounded bg-sky-50 text-sky-700 text-[10px] font-bold flex items-center gap-1">
                            <Video className="w-3 h-3" /> Vídeo
                          </span>
                        )}
                        {aula.hasExercises && (
                          <span className="p-1 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" /> Questões
                          </span>
                        )}
                        {aula.hasMaterials && (
                          <span className="p-1 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                            <Download className="w-3 h-3" /> PDFs
                          </span>
                        )}
                        {aula.hasTask && (
                          <span className="p-1 rounded bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center gap-1">
                            <Send className="w-3 h-3" /> Tarefa
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setPreviewAula({ aula, subject: selectedSubject })}
                          className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer border border-sky-200"
                          title="Ver conteúdo completo da aula"
                        >
                          <Eye className="w-3 h-3" /> Ver Aula
                        </button>

                        {onToggleLessonCompleted && (
                          <button
                            onClick={() => {
                              onToggleLessonCompleted(aulaKey, !isCompleted);
                              showToast(isCompleted ? `Aula ${aula.number} resetada para o aluno.` : `Aula ${aula.number} marcada como CONCLUÍDA para o aluno!`);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                              isCompleted
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
                            }`}
                            title={isCompleted ? 'Desmarcar conclusão do aluno' : 'Marcar conclusão para o aluno'}
                          >
                            {isCompleted ? (
                              <>
                                <RotateCcw className="w-3 h-3" /> Resetar
                              </>
                            ) : (
                              <>
                                <Check className="w-3 h-3" /> Concluir
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 2: VIDEOAULAS */}
        {/* ========================================================================= */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-sky-600" />
                  Videoaulas de {selectedSubject.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Publique links de aulas gravadas no YouTube, Google Drive ou Vimeo para os estudantes.
                </p>
              </div>

              <button
                onClick={() => setShowAddVideoModal(true)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Postar Nova Videoaula
              </button>
            </div>

            {subjectVideos.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <Video className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Nenhuma videoaula publicada para esta disciplina</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Clique no botão acima para adicionar a primeira gravação em vídeo que os alunos poderão assistir.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectVideos.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{v.title}</h4>
                        <span className="text-[10px] text-slate-500">
                          {v.durationMinutes} min • Prof. {v.instructor || selectedSubject.teacher}
                        </span>
                      </div>
                      {onDeleteVideoLesson && (
                        <button
                          onClick={() => {
                            onDeleteVideoLesson(v.id);
                            showToast('Videoaula removida com sucesso.');
                          }}
                          className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{v.summary}</p>

                    <div className="p-3 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <Play className="w-3.5 h-3.5 text-sky-400 fill-current" />
                        <span className="truncate text-slate-300">{v.videoUrl}</span>
                      </div>
                      <a
                        href={v.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold transition-all shrink-0 ml-2"
                      >
                        Abrir
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 3: EXERCÍCIOS & BANCO DE QUESTÕES */}
        {/* ========================================================================= */}
        {activeTab === 'questoes' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-600" />
                  Exercícios & Questões ({selectedSubject.name})
                </h3>
                <p className="text-xs text-slate-500">
                  Gerencie o banco de itens e acompanhe o desempenho e as questões já respondidas pelo estudante.
                </p>
              </div>

              {questionsSubTab === 'banco' && (
                <button
                  onClick={() => setShowAddQuestionModal(true)}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Questão
                </button>
              )}
            </div>

            {/* Sub-tabs: Banco da Matéria vs Resoluções do Aluno */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 w-fit">
              <button
                onClick={() => setQuestionsSubTab('banco')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  questionsSubTab === 'banco'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>📚 Banco de Questões da Matéria</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black">
                  {subjectQuestions.length}
                </span>
              </button>

              <button
                onClick={() => setQuestionsSubTab('resolucoes')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  questionsSubTab === 'resolucoes'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>📝 Questões Feitas pelo Aluno</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black">
                  {subjectAttempts.length}
                </span>
              </button>
            </div>

            {/* VIEW 1: QUESTÕES FEITAS PELO ALUNO */}
            {questionsSubTab === 'resolucoes' && (
              <div className="space-y-4">
                {/* Metrics Summary Bar */}
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-sky-800 uppercase block">Resolvidas</span>
                    <span className="text-xl font-black text-sky-950">{subjectAttempts.length}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Acertos</span>
                    <span className="text-xl font-black text-emerald-700">{subjectQStats.correct}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-800 uppercase block">Erros</span>
                    <span className="text-xl font-black text-rose-700">{subjectQStats.wrong}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-700 uppercase block">Aproveitamento</span>
                    <span className="text-xl font-black text-slate-900">{subjectQStats.accuracy}%</span>
                  </div>
                </div>

                {subjectAttempts.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                    <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-700">Nenhuma questão respondida pelo aluno nesta matéria ainda</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Assim que o aluno responder questões no portal vinculadas a esta disciplina, o histórico detalhado com acertos, erros e alternativas marcadas aparecerá aqui em tempo real.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {subjectAttempts.map((att, idx) => {
                      const q = questions.find((item) => item.id === att.questionId);
                      const chosenOpt = q?.options.find((o: any) => (typeof o === 'string' ? o : o.id) === att.selectedOptionId);
                      const chosenText = typeof chosenOpt === 'string' ? chosenOpt : chosenOpt?.text || att.selectedOptionId;
                      const correctOpt = q?.options.find((o: any) => {
                        const oid = typeof o === 'string' ? o : o.id;
                        return oid === q.correctOptionId;
                      });
                      const correctText = typeof correctOpt === 'string' ? correctOpt : correctOpt?.text || q?.correctOptionId;

                      return (
                        <div
                          key={att.id || idx}
                          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-xs text-slate-900">
                                👤 {att.studentName || 'Eduardo Mateus'}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                • {new Date(att.answeredAt).toLocaleString('pt-BR')}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {att.isCorrect ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> ACERTOU
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                                  <X className="w-3 h-3" /> ERROU
                                </span>
                              )}

                              {onResetQuestionAttempt && (
                                <button
                                  onClick={() => {
                                    onResetQuestionAttempt(att.questionId);
                                    showToast('Tentativa do aluno resetada. Ele pode responder novamente no portal.');
                                  }}
                                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Permitir que o aluno refaça a questão"
                                >
                                  <RotateCcw className="w-3 h-3" /> Resetar Tentativa
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-xs font-medium text-slate-800 leading-relaxed">
                            {q?.statement || `Questão ID: ${att.questionId}`}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                            <div className={`p-2.5 rounded-xl border ${
                              att.isCorrect
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                                : 'bg-rose-50 border-rose-200 text-rose-950'
                            }`}>
                              <span className="text-[10px] font-extrabold uppercase block text-slate-500 mb-0.5">
                                Resposta Marcada pelo Aluno:
                              </span>
                              <span className="font-bold">{chosenText}</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-950">
                              <span className="text-[10px] font-extrabold uppercase block text-emerald-700 mb-0.5">
                                Gabarito Oficial (FGV / TJAM):
                              </span>
                              <span className="font-bold">{correctText}</span>
                            </div>
                          </div>

                          {q?.explanation && (
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                              <span className="font-bold block text-slate-900 mb-0.5">Fundamentação Pedagógica:</span>
                              <p className="leading-relaxed">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: BANCO DE QUESTÕES DA MATÉRIA */}
            {questionsSubTab === 'banco' && (
              <>
                {subjectQuestions.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                    <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-700">Nenhuma questão cadastrada para esta disciplina</h4>
                    <p className="text-xs text-slate-500">
                      Clique no botão acima para adicionar a primeira questão comentada para os alunos resolverem.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {subjectQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold">
                              Item #{idx + 1}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                q.difficulty === 'fácil'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : q.difficulty === 'difícil'
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                            <span className="text-[10px] text-slate-400">{q.banca || 'FGV'} • {q.ano || 2026}</span>
                          </div>

                          {onDeleteQuestion && (
                            <button
                              onClick={() => {
                                onDeleteQuestion(q.id);
                                showToast('Questão excluída.');
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-slate-800 font-medium leading-relaxed">{q.statement}</p>

                        <div className="space-y-1.5 pl-2 border-l-2 border-slate-200">
                          {q.options.map((opt: any, optIdx: number) => {
                            const optText = typeof opt === 'string' ? opt : opt?.text || '';
                            const optId = typeof opt === 'string' ? `opt-${optIdx}` : opt?.id;
                            const isCorrect =
                              (q.correctOptionId && (optId === q.correctOptionId || optText === q.correctOptionId)) ||
                              (typeof (q as any).correctOptionIndex === 'number' && optIdx === (q as any).correctOptionIndex);

                            return (
                              <div
                                key={optId || optIdx}
                                className={`text-xs p-2 rounded-lg flex items-center gap-2 ${
                                  isCorrect
                                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                                    : 'text-slate-600'
                                }`}
                              >
                                <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] shrink-0 font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{optText}</span>
                                {isCorrect && (
                                  <span className="ml-auto text-[10px] uppercase font-extrabold text-emerald-600">
                                    (Gabarito Oficial)
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {q.explanation && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                            <span className="font-bold text-sky-700 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Comentário & Fundamentação da Professora:
                            </span>
                            <p className="leading-relaxed">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 4: MATERIAIS DIDÁTICOS & PDFS */}
        {/* ========================================================================= */}
        {activeTab === 'materiais' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-sky-600" />
                  Materiais em PDF & Apostilas ({selectedSubject.name})
                </h3>
                <p className="text-xs text-slate-500">
                  Publique resumos esquematizados, leis secas destacadas e apostilas para download.
                </p>
              </div>

              <button
                onClick={() => setShowAddMaterialModal(true)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Publicar Novo PDF
              </button>
            </div>

            {subjectMaterials.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <Download className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Nenhum PDF cadastrado nesta matéria</h4>
                <p className="text-xs text-slate-500">
                  Clique no botão acima para disponibilizar apostilas e resumos para os alunos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                          {mat.type}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            mat.isReleased
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {mat.isReleased ? '🟢 Liberado' : '🟡 Bloqueado'}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm text-slate-900">{mat.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-3">{mat.content}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      {onToggleMaterialRelease && (
                        <button
                          onClick={() => {
                            onToggleMaterialRelease(mat.id);
                            showToast('Status de liberação alterado.');
                          }}
                          className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors cursor-pointer"
                        >
                          {mat.isReleased ? 'Ocultar' : 'Liberar para Turma'}
                        </button>
                      )}

                      {onDeleteMaterial && (
                        <button
                          onClick={() => {
                            onDeleteMaterial(mat.id);
                            showToast('Material removido.');
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 5: FLASHCARDS DE MEMORIZAÇÃO */}
        {/* ========================================================================= */}
        {activeTab === 'flashcards' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-sky-600" />
                  Flashcards de Memorização Rápida ({selectedSubject.name})
                </h3>
                <p className="text-xs text-slate-500">
                  Cartões frente/verso para memorização de súmulas, prazos e regras específicas.
                </p>
              </div>

              <button
                onClick={() => setShowAddFlashcardModal(true)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Criar Flashcard
              </button>
            </div>

            {subjectFlashcards.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <Brain className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Nenhum flashcard cadastrado nesta disciplina</h4>
                <p className="text-xs text-slate-500">
                  Crie cartões com perguntas mnemônicas para os estudantes revisarem no modo repetição espaçada.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectFlashcards.map((fc) => (
                  <div
                    key={fc.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-sky-700 tracking-wider">
                          Frente • Pergunta
                        </span>
                        {onDeleteFlashcard && (
                          <button
                            onClick={() => {
                              onDeleteFlashcard(fc.id);
                              showToast('Flashcard removido.');
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="font-bold text-xs text-slate-900 leading-snug">{fc.front}</p>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider block mb-1">
                          Verso • Resposta
                        </span>
                        <p className="text-xs text-slate-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 leading-relaxed font-medium">
                          {fc.back}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                      <span>Dificuldade: <strong>{fc.difficulty || 'médio'}</strong></span>
                      <span>{fc.topicName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 6: TAREFAS, REDAÇÕES & CORREÇÕES (VER E CORRIGIR TAREFAS!) */}
        {/* ========================================================================= */}
        {activeTab === 'tarefas' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-600" />
                  Tarefas & Redações Enviadas pelos Alunos
                </h3>
                <p className="text-xs text-slate-500">
                  Veja as respostas submetidas pelos estudantes nesta disciplina, atribua nota de 0 a 10 e forneça parecer pedagógico.
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTaskFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    taskFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todas ({subjectSubmissions.length})
                </button>
                <button
                  onClick={() => setTaskFilter('pendente')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    taskFilter === 'pendente'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Pendentes ({pendingForThisSubject})
                </button>
                <button
                  onClick={() => setTaskFilter('corrigido')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    taskFilter === 'corrigido'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Corrigidas ({subjectSubmissions.filter((s) => s.status === 'corrigido').length})
                </button>
              </div>
            </div>

            {subjectSubmissions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <Send className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Nenhuma tarefa ou redação recebida para esta matéria</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Assim que os estudantes enviarem respostas das tarefas de {selectedSubject.name}, elas aparecerão aqui em tempo real para correção.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {subjectSubmissions
                  .filter((sub) => {
                    if (taskFilter === 'pendente') return sub.status === 'pendente';
                    if (taskFilter === 'corrigido') return sub.status === 'corrigido';
                    return true;
                  })
                  .map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-6 rounded-2xl bg-white border shadow-xs space-y-4 transition-all ${
                        sub.status === 'pendente' ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-slate-900">{sub.studentName}</span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              • Turma: {sub.turmaId || 'TJAM-2026'} • Enviado em: {sub.submittedAt}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-xs text-sky-700">{sub.activityTitle}</h4>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black ${
                              sub.status === 'corrigido'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                            }`}
                          >
                            {sub.status === 'corrigido' ? `Nota: ${sub.grade}/10` : '🟡 Pendente de Correção'}
                          </span>

                          <button
                            onClick={() => {
                              setGradingSubmission(sub);
                              setGradeValue(sub.grade !== undefined ? sub.grade : 10);
                              setFeedbackValue(sub.feedback || '');
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            {sub.status === 'corrigido' ? 'Editar Nota / Feedback' : 'Corrigir e Atribuir Nota'}
                          </button>
                        </div>
                      </div>

                      {/* Resposta do Aluno */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-serif leading-relaxed italic">
                        "{sub.content}"
                      </div>

                      {/* Parecer do Professor */}
                      {sub.feedback && (
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 space-y-1">
                          <span className="font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Parecer Pedagógico da Professora:
                          </span>
                          <p className="leading-relaxed">{sub.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 7: MAPAS MENTAIS */}
        {/* ========================================================================= */}
        {activeTab === 'mapas' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  Mapas Mentais & Esquemas Conceituais ({selectedSubject.name})
                </h3>
                <p className="text-xs text-slate-500">
                  Estruturas visuais com ramificações conceituais para revisão das provas do TJAM.
                </p>
              </div>
            </div>

            {subjectMindMaps.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Nenhum mapa mental associado a esta disciplina</h4>
                <p className="text-xs text-slate-500">
                  Mapas mentais cadastrados no módulo geral vinculados a esta matéria serão exibidos aqui.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subjectMindMaps.map((map) => (
                  <div
                    key={map.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {map.nodes.length} nós conceituais
                      </span>
                      <span className="text-[10px] text-slate-400">Layout: {map.layoutStyle || 'Árvore'}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">{map.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{map.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL: EDITAR DADOS DA DISCIPLINA */}
        {showEditSubjectModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">
                  Editar Dados de {selectedSubject.name}
                </h3>
                <button
                  onClick={() => setShowEditSubjectModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSubjectEdit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Título da Disciplina</label>
                  <input
                    type="text"
                    value={editSubjectName}
                    onChange={(e) => setEditSubjectName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Professor Responsável</label>
                  <input
                    type="text"
                    value={editSubjectTeacher}
                    onChange={(e) => setEditSubjectTeacher(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ementa / Descrição</label>
                  <textarea
                    rows={3}
                    value={editSubjectDesc}
                    onChange={(e) => setEditSubjectDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditSubjectModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADICIONAR NOVA AULA */}
        {showAddAulaModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">
                  Adicionar Nova Aula ({selectedSubject.name})
                </h3>
                <button
                  onClick={() => setShowAddAulaModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddAulaSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Título da Aula</label>
                  <input
                    type="text"
                    placeholder="Ex: Teoria Geral dos Prazos e Nulidades"
                    value={newAulaTitle}
                    onChange={(e) => setNewAulaTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Descrição / Tópicos Abordados</label>
                  <textarea
                    rows={2}
                    placeholder="Resumo dos assuntos que os alunos aprenderão nesta aula..."
                    value={newAulaDesc}
                    onChange={(e) => setNewAulaDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Carga Horária Estimada</label>
                  <input
                    type="text"
                    value={newAulaDuration}
                    onChange={(e) => setNewAulaDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-700 block">Recursos Disponíveis na Aula:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAulaHasVideo}
                        onChange={(e) => setNewAulaHasVideo(e.target.checked)}
                      />
                      <span>Vídeo Oficial</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAulaHasExercises}
                        onChange={(e) => setNewAulaHasExercises(e.target.checked)}
                      />
                      <span>Exercícios</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAulaHasMaterials}
                        onChange={(e) => setNewAulaHasMaterials(e.target.checked)}
                      />
                      <span>Materiais & PDFs</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAulaHasTask}
                        onChange={(e) => setNewAulaHasTask(e.target.checked)}
                      />
                      <span>Tarefa / Redação</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAulaModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Publicar Aula
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: POSTAR VIDEOAULA */}
        {showAddVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">
                  Postar Nova Videoaula ({selectedSubject.name})
                </h3>
                <button
                  onClick={() => setShowAddVideoModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddVideoSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Título da Videoaula</label>
                  <input
                    type="text"
                    placeholder="Ex: Aula 1: Anulação e Revogação dos Atos Administrativos"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Link do Vídeo (YouTube / Drive / Vimeo)</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Duração (Minutos)</label>
                    <input
                      type="number"
                      value={newVideoDuration}
                      onChange={(e) => setNewVideoDuration(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Instrutor</label>
                    <input
                      type="text"
                      value={selectedSubject.teacher}
                      disabled
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Resumo e Tópicos</label>
                  <textarea
                    rows={2}
                    value={newVideoSummary}
                    onChange={(e) => setNewVideoSummary(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddVideoModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Publicar Videoaula
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADICIONAR QUESTÃO */}
        {showAddQuestionModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">
                  Nova Questão Comentada ({selectedSubject.name})
                </h3>
                <button
                  onClick={() => setShowAddQuestionModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddQuestionSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Enunciado da Questão</label>
                  <textarea
                    rows={3}
                    placeholder="Escreva a situação-problema ou comando da questão..."
                    value={newQStatement}
                    onChange={(e) => setNewQStatement(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Alternativas de Resposta (Selecione o Gabarito Correto):
                  </label>
                  {['A', 'B', 'C', 'D', 'E'].map((letter, idx) => (
                    <div key={letter} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQCorrect === idx}
                        onChange={() => setNewQCorrect(idx)}
                        className="cursor-pointer"
                      />
                      <span className="text-xs font-bold text-slate-500 w-4">{letter})</span>
                      <input
                        type="text"
                        placeholder={`Texto da alternativa ${letter}...`}
                        value={newQOptions[idx]}
                        onChange={(e) => {
                          const copy = [...newQOptions];
                          copy[idx] = e.target.value;
                          setNewQOptions(copy);
                        }}
                        className="flex-1 p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Dificuldade</label>
                    <select
                      value={newQDifficulty}
                      onChange={(e) => setNewQDifficulty(e.target.value as any)}
                      className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                    >
                      <option value="fácil">Fácil</option>
                      <option value="médio">Médio</option>
                      <option value="difícil">Difícil</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Banca</label>
                    <input
                      type="text"
                      value="FGV / TJAM 2026"
                      disabled
                      className="w-full p-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Comentário Pedagógico & Fundamentação da Resposta
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Explicação detalhada para o aluno entender o porquê do gabarito..."
                    value={newQExplanation}
                    onChange={(e) => setNewQExplanation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddQuestionModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Salvar Questão
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: PUBLICAR MATERIAL / PDF */}
        {showAddMaterialModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">
                  Publicar Material / PDF ({selectedSubject.name})
                </h3>
                <button
                  onClick={() => setShowAddMaterialModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddMaterialSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Título do Documento / Apostila</label>
                  <input
                    type="text"
                    placeholder="Ex: Apostila Completa: Controle da Administração Pública TJAM"
                    value={newMatTitle}
                    onChange={(e) => setNewMatTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Material</label>
                    <select
                      value={newMatType}
                      onChange={(e) => setNewMatType(e.target.value as any)}
                      className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                    >
                      <option value="pdf">Apostila em PDF</option>
                      <option value="resumo">Resumo Esquematizado</option>
                      <option value="aula">Texto de Aula</option>
                      <option value="mapa">Esquema / Mapa</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Status de Liberação</label>
                    <select
                      value={newMatReleased ? 'liberado' : 'bloqueado'}
                      onChange={(e) => setNewMatReleased(e.target.value === 'liberado')}
                      className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                    >
                      <option value="liberado">🟢 Liberado Imediatamente</option>
                      <option value="bloqueado">🟡 Bloqueado (Em Breve)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Link de Download / Visualizador</label>
                  <input
                    type="text"
                    placeholder="https://exemplo.com/material-tjam.pdf"
                    value={newMatUrl}
                    onChange={(e) => setNewMatUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Descrição / Sumário</label>
                  <textarea
                    rows={2}
                    value={newMatContent}
                    onChange={(e) => setNewMatContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMaterialModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Publicar Material
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CRIAR FLASHCARD */}
        {showAddFlashcardModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">
                  Criar Novo Flashcard ({selectedSubject.name})
                </h3>
                <button
                  onClick={() => setShowAddFlashcardModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddFlashcardSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Frente (Pergunta / Conceito Chave)</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Qual o prazo prescricional para anulação de atos administrativos favoráveis ao destinatário?"
                    value={newFcFront}
                    onChange={(e) => setNewFcFront(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Verso (Resposta Detalhada / Fundamento)</label>
                  <textarea
                    rows={3}
                    placeholder="Ex: 5 anos, salvo comprovada má-fé (Art. 54 da Lei 9.784/99 e Súmula 473 do STF)."
                    value={newFcBack}
                    onChange={(e) => setNewFcBack(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nível de Dificuldade</label>
                  <select
                    value={newFcDifficulty}
                    onChange={(e) => setNewFcDifficulty(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="fácil">Fácil</option>
                    <option value="médio">Médio</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddFlashcardModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Salvar Flashcard
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CORRIGIR TAREFA / REDAÇÃO DO ALUNO */}
        {gradingSubmission && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Correção de Tarefa • {gradingSubmission.studentName}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {gradingSubmission.activityTitle} ({gradingSubmission.disciplineName})
                  </span>
                </div>
                <button
                  onClick={() => setGradingSubmission(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Resposta Enviada pelo Aluno:
                  </span>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-serif italic whitespace-pre-wrap">
                    "{gradingSubmission.content}"
                  </div>
                </div>

                <form onSubmit={handleSaveGradeSubmit} className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-slate-900">
                        Nota Atribuída (Escala 0 a 10):
                      </label>
                      <span className="text-xl font-black text-sky-700">{gradeValue} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={gradeValue}
                      onChange={(e) => setGradeValue(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Parecer Pedagógico & Feedback para o Estudante:
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Indique os pontos fortes, eventuais equívocos conceituais e orientações para o concurso..."
                      value={feedbackValue}
                      onChange={(e) => setFeedbackValue(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500 leading-relaxed"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setGradingSubmission(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Salvar e Publicar Correção ao Aluno
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: VER AULA COMPLETA (VISÃO PEDAGÓGICA DO PROFESSOR COM RESPOSTAS E PROGRESSO) */}
        {previewAula && (() => {
          const isProcPenalAula1 = (previewAula.subject.id === 'processo_penal' || matchesDiscipline(previewAula.subject.id, 'processo_penal')) && previewAula.aula.number === 1;
          const aulaKey = `${previewAula.subject.id}_${previewAula.aula.id}`;
          const isComp = (completedTopicIds || []).includes(aulaKey) || (savedLessons && savedLessons[aulaKey]?.completed);
          
          // Filter student submissions related to this subject/aula
          const matchingSubmissions = submissions.filter((s) => {
            const matchSub = matchesDiscipline(s.disciplineName, previewAula.subject.id, previewAula.subject.slug, previewAula.subject.name);
            const matchLesson = s.activityTitle?.includes(`Aula ${previewAula.aula.number}`) || s.activityTitle?.toLowerCase().includes('princípios') || isProcPenalAula1;
            return matchSub && matchLesson;
          });

          return (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-black text-lg border border-sky-200">
                      {previewAula.aula.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                          {previewAula.subject.name}
                        </span>
                        {isProcPenalAula1 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                            ⭐ Aula de Hoje
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-lg text-slate-900 mt-1">
                        {previewAula.aula.title}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        Carga Horária: {previewAula.aula.duration} • Prof. Responsável: {previewAula.subject.teacher}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setPreviewAula(null);
                      setModalGradingSubId(null);
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Tabs in Modal */}
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setPreviewTab('conteudo')}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                      previewTab === 'conteudo'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" /> 1. Conteúdo & Videoaula
                  </button>

                  <button
                    onClick={() => setPreviewTab('gabarito')}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                      previewTab === 'gabarito'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> 2. 20 Atividades & Gabarito Oficial
                  </button>

                  <button
                    onClick={() => setPreviewTab('respostas')}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                      previewTab === 'respostas'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Send className="w-4 h-4" /> 3. Respostas dos Alunos
                    {matchingSubmissions.length > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                        previewTab === 'respostas' ? 'bg-white text-sky-700' : 'bg-sky-600 text-white'
                      }`}>
                        {matchingSubmissions.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setPreviewTab('progresso')}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                      previewTab === 'progresso'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Users className="w-4 h-4" /> 4. Progresso da Turma
                    {isComp && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                  </button>
                </div>

                {/* TAB 1: CONTEÚDO & VÍDEO */}
                {previewTab === 'conteudo' && (
                  <div className="space-y-5">
                    {/* Video Player Section */}
                    {isProcPenalAula1 ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                            <Video className="w-4 h-4 text-sky-600" /> Videoaula Oficial TJAM: Princípios Fundamentais
                          </h4>
                          <span className="text-xs text-slate-500 font-medium">50 minutos • Prof. Marcos Vinicius</span>
                        </div>
                        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-slate-200">
                          <iframe
                            src="https://www.youtube.com/embed/N2PakWeTuic"
                            title="Aula 1 Processo Penal TJAM"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        </div>
                      </div>
                    ) : (
                      previewAula.aula.hasVideo && (
                        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 text-xs">
                          <span className="font-bold block mb-1">Videoaula associada à ementa</span>
                          <p className="text-sky-700">Esta aula conta com vídeo cadastrado no módulo de videoaulas.</p>
                        </div>
                      )
                    )}

                    {/* Theoretical Points */}
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-700 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        {isProcPenalAula1 ? 'Resumo Teórico Estruturado (11 Princípios Fundamentais)' : 'Ementa e Conteúdo Pedagógico'}
                      </h4>

                      {isProcPenalAula1 ? (
                        <div className="space-y-3">
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                            <p className="font-bold text-slate-900 mb-2">Conceito e Finalidade do Direito Processual Penal:</p>
                            <p>
                              O Direito Processual Penal é o ramo do Direito que estabelece as regras e os procedimentos utilizados pelo Estado para investigar, processar e julgar infrações penais, garantindo o respeito aos direitos e às garantias fundamentais das pessoas envolvidas.
                              O processo penal deve observar princípios previstos principalmente na Constituição Federal de 1988 e no Código de Processo Penal (CPP).
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {procPenalLessonSummaryPoints.map((pointText, idx) => (
                              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                                <div className="flex items-start gap-2">
                                  <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                                    {pointText}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                          {previewAula.aula.description}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: 20 ATIVIDADES & GABARITO OFICIAL */}
                {previewTab === 'gabarito' && (
                  <div className="space-y-6">
                    {isProcPenalAula1 ? (
                      <>
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h4 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Gabarito Oficial Completo das 20 Atividades
                            </h4>
                            <p className="text-xs text-emerald-800">
                              10 Questões de Múltipla Escolha • 5 Questões Certo/Errado • 5 Questões Escritas com Padrão de Resposta
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-2xs">
                            Base: FGV / TJAM / CF88 / CPP
                          </span>
                        </div>

                        {/* Bloco 1: 10 Questões de Múltipla Escolha */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
                            Parte 1: 10 Questões Objetivas de Múltipla Escolha (1 a 10)
                          </h4>

                          <div className="space-y-3">
                            {procPenalMcQuestionsData.map((q) => {
                              const alts = q.alternativas || q.opcoes || [];
                              return (
                                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 rounded-lg bg-sky-100 text-sky-800 font-bold text-xs">
                                        Questão {q.id}
                                      </span>
                                      <span className="text-[11px] font-bold text-slate-500">TJAM / FGV</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                      Correta: Opção {['A', 'B', 'C', 'D'][q.correta]}
                                    </span>
                                  </div>

                                  <p className="text-xs font-bold text-slate-900 leading-relaxed">{q.enunciado}</p>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    {alts.map((alt, aIdx) => {
                                      const isCorrect = aIdx === q.correta;
                                      return (
                                        <div
                                          key={aIdx}
                                          className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                                            isCorrect
                                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold'
                                              : 'bg-white border-slate-200 text-slate-600'
                                          }`}
                                        >
                                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                                            isCorrect ? 'bg-emerald-600 text-white font-black' : 'bg-slate-200 text-slate-600'
                                          }`}>
                                            {['A', 'B', 'C', 'D'][aIdx]}
                                          </span>
                                          <span className="leading-snug">{alt}</span>
                                          {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />}
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                                    <span className="font-bold text-slate-900">Fundamentação: </span>
                                    {q.explicacao}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Bloco 2: 5 Questões Certo ou Errado */}
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 pb-1">
                            Parte 2: 5 Questões de Certo ou Errado (11 a 15)
                          </h4>

                          <div className="space-y-3">
                            {procPenalTfQuestionsData.map((q) => (
                              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
                                    Questão {q.id}
                                  </span>
                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                                    q.correta ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                                  }`}>
                                    Gabarito: {q.correta ? 'CERTO' : 'ERRADO'}
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-slate-900 leading-relaxed">{q.enunciado}</p>
                                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                                  <span className="font-bold text-slate-900">Justificativa Oficial: </span>
                                  {q.explicacao}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bloco 3: 5 Questões Escritas */}
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 pb-1">
                            Parte 3: 5 Questões Escritas Discursivas (16 a 20) com Espelho de Correção
                          </h4>

                          <div className="space-y-3">
                            {procPenalDiscursiveQuestionsData.map((q) => (
                              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-xs">
                                    Questão {q.id - 200 + 15}
                                  </span>
                                  <span className="text-[11px] font-bold text-indigo-700">Questão Discursiva TJAM</span>
                                </div>

                                <p className="text-xs font-bold text-slate-900 leading-relaxed">{q.enunciado}</p>

                                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                                  <span className="font-black text-indigo-900 block flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                                    Padrão de Resposta Esperado pelo TJAM:
                                  </span>
                                  <p className="leading-relaxed">{q.respostaEsperada}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl">
                        Nenhum gabarito fixo cadastrado para esta aula. Utilize a aba de Questões para gerenciar os itens.
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: RESPOSTAS DOS ALUNOS & CORREÇÕES */}
                {previewTab === 'respostas' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          Respostas Submetidas pelos Alunos nesta Aula
                        </h4>
                        <p className="text-xs text-slate-500">
                          Revise as respostas escritas, atribua a nota de 0 a 10 e envie seu parecer pedagógico ao aluno.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                        Total: {matchingSubmissions.length} submissão(ões)
                      </span>
                    </div>

                    {matchingSubmissions.length === 0 ? (
                      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                        <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                        <h5 className="text-xs font-bold text-slate-700">Nenhuma resposta submetida até o momento</h5>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          Assim que o aluno preencher as questões escritas e clicar em "Enviar ao Professor", as respostas aparecerão aqui para correção imediata.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {matchingSubmissions.map((sub) => {
                          const isGradingThis = modalGradingSubId === sub.id;
                          const isCorrigido = sub.status === 'corrigido';

                          return (
                            <div
                              key={sub.id}
                              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-extrabold text-sm text-slate-900">{sub.studentName}</h5>
                                    <span className="text-[11px] text-slate-500">
                                      (ID: {sub.studentId})
                                    </span>
                                  </div>
                                  <span className="text-xs text-slate-500">
                                    Enviado em: {new Date(sub.submittedAt).toLocaleString('pt-BR')} • {sub.activityTitle}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {isCorrigido ? (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5" /> Corrigido • Nota: {sub.grade}/10
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" /> Pendente de Correção
                                    </span>
                                  )}

                                  <button
                                    onClick={() => {
                                      if (isGradingThis) {
                                        setModalGradingSubId(null);
                                      } else {
                                        setModalGradingSubId(sub.id);
                                        setModalGradeInput(sub.grade !== undefined ? sub.grade : 10);
                                        setModalFeedbackInput(sub.feedback || '');
                                      }
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs transition-colors cursor-pointer border border-sky-200 flex items-center gap-1"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                    {isGradingThis ? 'Fechar Avaliação' : isCorrigido ? 'Reavaliar Nota' : 'Atribuir Nota'}
                                  </button>
                                </div>
                              </div>

                              {/* Student's answer content */}
                              <div className="space-y-2">
                                <h6 className="text-xs font-bold uppercase text-slate-500">Conteúdo Enviado pelo Estudante:</h6>
                                <pre className="p-4 rounded-xl bg-slate-50 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap border border-slate-200">
                                  {sub.content}
                                </pre>
                              </div>

                              {/* Previously saved feedback if exists */}
                              {isCorrigido && sub.feedback && !isGradingThis && (
                                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                                  <span className="font-bold flex items-center gap-1 text-emerald-900">
                                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Parecer Pedagógico do Professor:
                                  </span>
                                  <p>{sub.feedback}</p>
                                </div>
                              )}

                              {/* Inline Grading Form */}
                              {isGradingThis && (
                                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3">
                                  <h6 className="text-xs font-black uppercase text-sky-900 flex items-center gap-1.5">
                                    <Award className="w-4 h-4 text-sky-600" /> Formulário de Avaliação do Professor
                                  </h6>

                                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                    <div className="sm:col-span-1">
                                      <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Nota (0 a 10):
                                      </label>
                                      <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.5"
                                        value={modalGradeInput}
                                        onChange={(e) => setModalGradeInput(parseFloat(e.target.value) || 0)}
                                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm font-black text-slate-900 focus:outline-sky-500"
                                      />
                                    </div>

                                    <div className="sm:col-span-3">
                                      <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Feedback e Orientações para o Aluno:
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Ex: Excelente fundamentação legal conforme o art. 5º da CF e CPP..."
                                        value={modalFeedbackInput}
                                        onChange={(e) => setModalFeedbackInput(e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-sky-500"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex justify-end gap-2 pt-1">
                                    <button
                                      onClick={() => setModalGradingSubId(null)}
                                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                                    >
                                      Cancelar
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (onGradeSubmission) {
                                          onGradeSubmission(sub.id, modalGradeInput, modalFeedbackInput);
                                          showToast(`Avaliação gravada com sucesso! Nota: ${modalGradeInput}/10.`);
                                          setModalGradingSubId(null);
                                        }
                                      }}
                                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                                    >
                                      <Check className="w-3.5 h-3.5" /> Salvar Avaliação
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: PROGRESSO DA TURMA */}
                {previewTab === 'progresso' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          Progresso dos Estudantes nesta Aula
                        </h4>
                        <p className="text-xs text-slate-500">
                          Acompanhe individualmente quais alunos já concluíram o conteúdo teórico e os exercícios.
                        </p>
                      </div>
                      {onToggleLessonCompleted && (
                        <button
                          onClick={() => {
                            onToggleLessonCompleted(aulaKey, !isComp);
                            showToast(isComp ? 'Aula desmarcada para o aluno.' : 'Aula marcada como CONCLUÍDA para o aluno!');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                            isComp
                              ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white border-emerald-700 shadow-xs hover:bg-emerald-700'
                          }`}
                        >
                          {isComp ? <RotateCcw className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                          {isComp ? 'Resetar Conclusão da Aula' : 'Marcar Aula como Concluída'}
                        </button>
                      )}
                    </div>

                    {/* Student List */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3">Estudante</th>
                            <th className="p-3">Turma</th>
                            <th className="p-3">Status na Aula</th>
                            <th className="p-3">Exercícios</th>
                            <th className="p-3 text-right">Ação do Professor</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(students && students.length > 0 ? students : [
                            { id: 'id00120087', name: 'Eduardo Mateus', email: 'eduardo.mateus@aluno.tjam.gov.br', turmaId: 'turma-tjam-2026', role: 'student', createdAt: '' },
                            { id: 'id00120088', name: 'Pedro Henrique Ferreira', email: 'pedro.ferreira@aluno.tjam.gov.br', turmaId: 'turma-tjam-2026', role: 'student', createdAt: '' },
                            { id: 'id00120089', name: 'Mariana Costa Lima', email: 'mariana.costa@aluno.tjam.gov.br', turmaId: 'turma-tjam-2026', role: 'student', createdAt: '' }
                          ]).map((st) => {
                            const hasSub = matchingSubmissions.some(s => s.studentId === st.id || s.studentName?.includes(st.name));
                            return (
                              <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3">
                                  <span className="font-bold text-slate-900 block">{st.name}</span>
                                  <span className="text-[10px] text-slate-400">{st.email}</span>
                                </td>
                                <td className="p-3">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                                    TJAM 2026
                                  </span>
                                </td>
                                <td className="p-3">
                                  {isComp ? (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                      ✅ Concluída
                                    </span>
                                  ) : hasSub ? (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                                      🟡 Em Andamento
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-100 text-slate-600">
                                      ⚪ Não iniciada
                                    </span>
                                  )}
                                </td>
                                <td className="p-3">
                                  {hasSub ? (
                                    <span className="text-[11px] font-bold text-emerald-700">
                                      Respostas enviadas
                                    </span>
                                  ) : (
                                    <span className="text-[11px] text-slate-400">
                                      Pendente
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  {onToggleLessonCompleted && (
                                    <button
                                      onClick={() => {
                                        onToggleLessonCompleted(aulaKey, !isComp);
                                        showToast(isComp ? `Progresso resetado para ${st.name}` : `Aula concluída para ${st.name}!`);
                                      }}
                                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer text-slate-700"
                                    >
                                      {isComp ? 'Resetar' : 'Aprovar'}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">
                    TJAM Preparatório • Painel de Gestão Docente
                  </span>
                  <button
                    onClick={() => {
                      setPreviewAula(null);
                      setModalGradingSubId(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
                  >
                    Fechar Visualização
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: GRID GERAL DE TODAS AS 11 DISCIPLINAS DO ALUNO
  // =========================================================================
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-slate-700">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" /> Painel de Controle de Disciplinas • Sincronizado
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              11 Disciplinas Oficiais do TJAM
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Aqui você administra cada disciplina exatamente como ela é apresentada aos alunos. Você pode ver, editar, postar videoaulas, questões, apostilas em PDF e corrigir as tarefas enviadas pelos estudantes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {totalPendingCorrections > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-center flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-amber-300 uppercase block">Correções Pendentes</span>
                  <span className="text-sm font-black text-white">{totalPendingCorrections} tarefas aguardando</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar matéria por nome, descrição ou professor titular..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({ALL_SUBJECTS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Conhecimentos Básicos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'Conhecimentos Básicos'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Básicos
          </button>
          <button
            onClick={() => setSelectedCategory('Conhecimentos Específicos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'Conhecimentos Específicos'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Específicos
          </button>
        </div>
      </div>

      {/* Grid of 11 Disciplines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((sub) => {
          const IconComp = sub.icon;
          const aulas = getSubjectAulas(sub);
          const videos = getSubjectVideos(sub);
          const subQuestions = getSubjectQuestions(sub);
          const materials = getSubjectMaterials(sub);
          const flashcardsList = getSubjectFlashcards(sub);
          const subList = getSubjectSubmissions(sub);
          const pendingCount = subList.filter((s) => s.status === 'pendente').length;
          const aulasStats = getSubjectAulasProgress(sub);
          const attempts = getSubjectQuestionAttempts(sub);
          const qStats = getSubjectQuestionsStats(sub);

          return (
            <div
              key={sub.id}
              onClick={() => setSelectedSubject(sub)}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-lg hover:border-sky-400 transition-all cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-3 rounded-2xl ${sub.bgLight} ${sub.border} border shrink-0`}>
                    <IconComp className={`w-6 h-6 ${sub.color}`} />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {sub.category === 'Conhecimentos Específicos' ? 'Específicos' : 'Básicos'}
                    </span>
                    {pendingCount > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                        ✍️ {pendingCount} a corrigir
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                    {sub.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Professor: <strong className="text-slate-700">{sub.teacher}</strong>
                  </span>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                {/* Student Progress Ribbon */}
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-semibold">Progresso do Aluno:</span>
                    <span className="font-black text-emerald-700">
                      {aulasStats.completed}/{aulas.length} aulas ({aulasStats.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${aulasStats.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                    <span>{attempts.length} questões feitas</span>
                    <span className={attempts.length > 0 ? 'text-sky-600 font-bold' : ''}>
                      {attempts.length > 0 ? `${qStats.accuracy}% acertos` : 'Nenhuma feita'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                {/* Micro indicators */}
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Aulas</span>
                    <span className="text-xs font-black text-slate-800">{aulas.length}</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Vídeos</span>
                    <span className="text-xs font-black text-indigo-700">{videos.length}</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Itens</span>
                    <span className="text-xs font-black text-sky-700">{subQuestions.length}</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">PDFs</span>
                    <span className="text-xs font-black text-emerald-700">{materials.length}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-sky-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs">
                  <span>Administrar Matéria</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
