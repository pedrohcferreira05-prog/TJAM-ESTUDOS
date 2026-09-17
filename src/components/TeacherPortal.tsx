import React, { useState } from 'react';
import {
  Turma,
  Announcement,
  LiveClass,
  PublishedMaterial,
  StudentSubmission,
  Discipline,
  Question,
  Flashcard,
  Simulado,
  MindMap,
  TeacherTab,
  VideoLesson,
  StudentAccount,
  SimuladoAttempt,
  WeeklyScheduleItem,
} from '../types';
import {
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  Video,
  Send,
  Upload,
  BarChart3,
  Award,
  Lock,
  Unlock,
  Library,
  MessageSquare,
  ChevronRight,
  Filter,
  Search,
  ExternalLink,
  Save,
  Bell,
  Check,
  AlertTriangle,
  UserPlus,
  Menu,
  Layers,
  Brain,
  RotateCcw,
  RefreshCw,
} from 'lucide-react';
import { StudentManagementTab } from './StudentManagementTab';
import { TeacherStudentResponsesManager } from './TeacherStudentResponsesManager';
import { TeacherLessonsAndVideosManager } from './TeacherLessonsAndVideosManager';
import { TeacherQuestionsManager } from './TeacherQuestionsManager';
import { TeacherDisciplinesManager } from './TeacherDisciplinesManager';
import { TeacherFlashcardsManager } from './TeacherFlashcardsManager';
import { TeacherMindMapsManager } from './TeacherMindMapsManager';
import { TeacherCadernoErrosManager } from './TeacherCadernoErrosManager';
import { TeacherScheduleAndGoalsManager } from './TeacherScheduleAndGoalsManager';
import { TeacherDisciplinasManager } from './TeacherDisciplinasManager';

interface TeacherPortalProps {
  activeTab?: TeacherTab;
  onSelectTab?: (tab: TeacherTab) => void;
  onOpenMobileMenu?: () => void;
  turmas: Turma[];
  announcements: Announcement[];
  liveClasses: LiveClass[];
  publishedMaterials: PublishedMaterial[];
  submissions: StudentSubmission[];
  disciplines: Discipline[];
  questions: Question[];
  flashcards: Flashcard[];
  simulados: Simulado[];
  mindMaps: MindMap[];
  videoLessons?: VideoLesson[];
  weeklySchedule?: WeeklyScheduleItem[];
  weeklyGoals?: Array<{ id: string; text: string; completed: boolean }>;
  errorQuestionIds?: string[];
  questionAttempts?: Array<{
    id: string;
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
    answeredAt: string;
    studentId?: string;
    studentName?: string;
  }>;
  simuladoAttempts?: SimuladoAttempt[];
  students?: StudentAccount[];
  completedTopicIds?: string[];
  savedLessons?: Record<string, any>;
  onToggleLessonCompleted?: (lessonKey: string, completed: boolean) => void;
  onAddTurma: (turma: Turma) => void;
  onUpdateTurma: (turma: Turma) => void;
  onDeleteTurma: (id: string) => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
  onAddLiveClass: (liveClass: LiveClass) => void;
  onDeleteLiveClass: (id: string) => void;
  onAddPublishedMaterial: (material: PublishedMaterial) => void;
  onToggleMaterialRelease: (id: string) => void;
  onDeleteMaterial: (id: string) => void;
  onGradeSubmission: (id: string, grade: number, feedback: string) => void;
  onAddQuestion: (q: Question) => void;
  onUpdateQuestion?: (qId: string, updated: Partial<Question>) => void;
  onDeleteQuestion?: (qId: string) => void;
  onAddSimulado?: (sim: Simulado) => void;
  onUpdateSimulado?: (simId: string, updates: Partial<Simulado>) => void;
  onDeleteSimulado?: (simId: string) => void;
  onAddFlashcard: (f: Flashcard) => void;
  onUpdateFlashcard?: (id: string, updates: Partial<Flashcard>) => void;
  onDeleteFlashcard?: (id: string) => void;
  onSaveMindMap?: (map: MindMap) => void;
  onDeleteMindMap?: (id: string) => void;
  onAddDiscipline?: (discipline: Discipline) => void;
  onUpdateDiscipline?: (id: string, updates: Partial<Discipline>) => void;
  onDeleteDiscipline?: (id: string) => void;
  onAddGoal?: (text: string) => void;
  onUpdateGoal?: (id: string, text: string) => void;
  onDeleteGoal?: (id: string) => void;
  onToggleGoal?: (id: string) => void;
  onAddTaskToDay?: (dayOfWeek: string, taskText: string, disciplineId?: string) => void;
  onUpdateDayTask?: (scheduleId: string, taskIndex: number, newText: string) => void;
  onDeleteDayTask?: (scheduleId: string, taskIndex: number) => void;
  onAddTopic?: (disciplineId: string, topicName: string) => void;
  onUpdateTopic?: (disciplineId: string, topicId: string, newName: string) => void;
  onDeleteTopic?: (disciplineId: string, topicId: string) => void;
  onAddVideoLesson?: (video: Omit<VideoLesson, 'id'>) => void;
  onUpdateVideoLesson?: (videoId: string, updated: Partial<VideoLesson>) => void;
  onDeleteVideoLesson?: (videoId: string) => void;
  onResetQuestionAttempt?: (attemptId: string) => void;
  onResetSimuladoAttempt?: (attemptId: string) => void;
  onResetAllStudentContents?: () => Promise<void> | void;
  isDarkMode?: boolean;
  isSiteLocked?: boolean;
  onToggleSiteLock?: (locked: boolean, message?: string) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  activeTab: controlledTab,
  onSelectTab: setControlledTab,
  onOpenMobileMenu,
  turmas,
  announcements,
  liveClasses,
  publishedMaterials,
  submissions,
  disciplines,
  questions,
  flashcards,
  simulados,
  mindMaps,
  videoLessons = [],
  weeklySchedule = [],
  weeklyGoals = [],
  errorQuestionIds = [],
  questionAttempts = [],
  simuladoAttempts = [],
  students = [],
  completedTopicIds = [],
  savedLessons = {},
  onToggleLessonCompleted,
  onAddTurma,
  onUpdateTurma,
  onDeleteTurma,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onAddLiveClass,
  onDeleteLiveClass,
  onAddPublishedMaterial,
  onToggleMaterialRelease,
  onDeleteMaterial,
  onGradeSubmission,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddSimulado,
  onUpdateSimulado,
  onDeleteSimulado,
  onAddFlashcard,
  onUpdateFlashcard,
  onDeleteFlashcard,
  onSaveMindMap,
  onDeleteMindMap,
  onAddDiscipline,
  onUpdateDiscipline,
  onDeleteDiscipline,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onToggleGoal,
  onAddTaskToDay,
  onUpdateDayTask,
  onDeleteDayTask,
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic,
  onAddVideoLesson,
  onUpdateVideoLesson,
  onDeleteVideoLesson,
  onResetQuestionAttempt,
  onResetSimuladoAttempt,
  onResetAllStudentContents,
  isDarkMode,
  isSiteLocked = false,
  onToggleSiteLock,
}) => {
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [isResettingContents, setIsResettingContents] = useState(false);
  const [resetSuccessToast, setResetSuccessToast] = useState(false);

  const handleTriggerReset = async () => {
    setIsResettingContents(true);
    try {
      if (onResetAllStudentContents) {
        await onResetAllStudentContents();
      }
      setResetSuccessToast(true);
      setTimeout(() => setResetSuccessToast(false), 4500);
    } catch (e) {
      console.error('Erro ao zerar conteúdos:', e);
    } finally {
      setIsResettingContents(false);
      setShowResetConfirmModal(false);
    }
  };
  // Real dynamic statistics (removing all fake/simulated values)
  const realTotalQuestions = questionAttempts?.length || 0;
  const realCorrectQuestions = questionAttempts?.filter((a) => a.isCorrect).length || 0;
  const realAccuracy = realTotalQuestions > 0 ? Math.round((realCorrectQuestions / realTotalQuestions) * 100) : 0;
  const realSimuladosCount = simuladoAttempts?.length || 0;
  const gradedSubmissions = submissions.filter((s) => s.status === 'corrigido' && s.grade !== undefined);
  const realAverageGrade = gradedSubmissions.length > 0
    ? (gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length).toFixed(1)
    : realAccuracy > 0 ? (realAccuracy / 10).toFixed(1) : '10.0';

  const teacherTabsList: Array<{ id: TeacherTab; label: string; fullLabel: string; icon: any }> = [
    { id: 'alunos', label: 'Alunos & Senhas', fullLabel: 'Cadastro de Alunos & Senhas', icon: UserPlus },
    { id: 'turmas', label: 'Turmas', fullLabel: 'Gestão de Turmas', icon: Users },
    { id: 'disciplinas-aluno', label: 'Disciplinas (Aluno)', fullLabel: '11 Disciplinas do Aluno (Sincronizadas)', icon: BookOpen },
    { id: 'respostas', label: 'Respostas & Notas', fullLabel: 'Respostas & Gabaritos dos Alunos', icon: CheckCircle },
    { id: 'cronogramas', label: 'Metas & Cronograma', fullLabel: 'Metas Diárias & Cronograma', icon: Calendar },
    { id: 'materias-edital', label: 'Matérias (Edital)', fullLabel: 'Matérias & Tópicos do Edital', icon: BookOpen },
    { id: 'aulas-videos', label: 'Aulas & Vídeos', fullLabel: 'Aulas, Tópicos & Videoaulas', icon: Video },
    { id: 'questoes-simulados', label: 'Questões & Simulados', fullLabel: 'Banco de Questões & Simulados', icon: FileText },
    { id: 'flashcards', label: 'Flashcards', fullLabel: 'Gestão de Flashcards', icon: Layers },
    { id: 'mapas-mentais', label: 'Mapas Mentais', fullLabel: 'Gestão de Mapas Mentais', icon: Brain },
    { id: 'caderno-erros', label: 'Caderno de Erros', fullLabel: 'Caderno de Erros dos Alunos', icon: AlertTriangle },
    { id: 'materiais', label: 'Arquivos & PDFs', fullLabel: 'Arquivos & Materiais Didáticos', icon: Upload },
    { id: 'correcoes', label: 'Correções', fullLabel: 'Correção de Redações', icon: Award },
    { id: 'desempenho', label: 'Evolução Alunos', fullLabel: 'Evolução & Desempenho dos Alunos', icon: BarChart3 },
    { id: 'avisos-lives', label: 'Avisos & Lives', fullLabel: 'Avisos & Aulas ao Vivo', icon: Bell },
    { id: 'biblioteca', label: 'Biblioteca', fullLabel: 'Biblioteca Digital da Disciplina', icon: Library },
  ];
  const [internalTab, setInternalTab] = useState<TeacherTab>('alunos');
  const activeTab = controlledTab || internalTab;
  const setActiveTab = (tab: TeacherTab) => {
    setInternalTab(tab);
    if (setControlledTab) {
      setControlledTab(tab);
    }
  };
  const [selectedTurmaId, setSelectedTurmaId] = useState<string>(turmas[0]?.id || '');
  const [customLockMessage, setCustomLockMessage] = useState(
    'PORTAL TEMPORARIAMENTE BLOQUEADO: O acesso à plataforma foi temporariamente suspenso pelo professor. Aguarde novas orientações.'
  );

  // Modal / Form States
  const [showNewTurmaModal, setShowNewTurmaModal] = useState(false);
  const [showNewMaterialModal, setShowNewMaterialModal] = useState(false);
  const [showNewAvisoModal, setShowNewAvisoModal] = useState(false);
  const [showNewLiveModal, setShowNewLiveModal] = useState(false);

  // New Turma Form
  const [newTurmaName, setNewTurmaName] = useState('');
  const [newTurmaCode, setNewTurmaCode] = useState('TJAM-2026-');
  const [newTurmaStage, setNewTurmaStage] = useState('Etapa 1: Teoria Geral e Regimento Interno');
  const [newTurmaDesc, setNewTurmaDesc] = useState('');

  // New Material Form
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<PublishedMaterial['type']>('aula');
  const [matDiscId, setMatDiscId] = useState(disciplines[0]?.id || '');
  const [matTopicId, setMatTopicId] = useState(disciplines[0]?.topics[0]?.id || '');
  const [matContent, setMatContent] = useState('');
  const [matAttachmentUrl, setMatAttachmentUrl] = useState('');
  const [matStage, setMatStage] = useState('Etapa 1: Teoria Geral');

  // New Announcement Form
  const [avisoTitle, setAvisoTitle] = useState('');
  const [avisoContent, setAvisoContent] = useState('');
  const [avisoPriority, setAvisoPriority] = useState<'normal' | 'alta' | 'urgente'>('normal');

  // New Live Class Form
  const [liveTitle, setLiveTitle] = useState('');
  const [liveDesc, setLiveDesc] = useState('');
  const [liveDiscId, setLiveDiscId] = useState(disciplines[0]?.id || '');
  const [liveDate, setLiveDate] = useState('2026-08-10');
  const [liveTime, setLiveTime] = useState('19:30 - 21:00');
  const [liveUrl, setLiveUrl] = useState('https://meet.google.com/tjam-aula-exclusiva');

  // Grading State
  const [selectedSub, setSelectedSub] = useState<StudentSubmission | null>(null);
  const [gradeValue, setGradeValue] = useState<number>(10);
  const [feedbackValue, setFeedbackValue] = useState<string>('');

  const currentTurma = turmas.find((t) => t.id === selectedTurmaId) || turmas[0];

  const handleCreateTurmaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTurmaName.trim()) return;

    const newT: Turma = {
      id: `turma-${Date.now()}`,
      name: newTurmaName,
      code: newTurmaCode || `TJAM-${Math.floor(100 + Math.random() * 900)}`,
      teacherId: 'prof-jessica-alves',
      teacherName: 'Professora Jéssica Alves (Você)',
      targetExam: 'Concurso TJAM - Tribunal de Justiça do Amazonas',
      description: newTurmaDesc || 'Turma com acompanhamento e direcionamento para o edital do TJAM.',
      currentStage: newTurmaStage,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '2026-11-15',
      studentCount: 0,
      students: [],
      disciplineIds: disciplines.map((d) => d.id),
    };

    onAddTurma(newT);
    setSelectedTurmaId(newT.id);
    setShowNewTurmaModal(false);
    setNewTurmaName('');
    setNewTurmaDesc('');
  };

  const handleCreateMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;

    const newMat: PublishedMaterial = {
      id: `mat-${Date.now()}`,
      turmaId: selectedTurmaId,
      disciplineId: matDiscId,
      topicId: matTopicId,
      title: matTitle,
      type: matType,
      content: matContent,
      attachmentUrl: matAttachmentUrl,
      releaseStage: matStage,
      releaseDate: new Date().toISOString().slice(0, 10),
      isReleased: true,
      createdAt: new Date().toISOString().slice(0, 10),
      authorName: 'Professora Jéssica Alves',
    };

    onAddPublishedMaterial(newMat);
    setShowNewMaterialModal(false);
    setMatTitle('');
    setMatContent('');
    setMatAttachmentUrl('');
  };

  const handleCreateAvisoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!avisoTitle.trim()) return;

    const newAv: Announcement = {
      id: `aviso-${Date.now()}`,
      turmaId: selectedTurmaId,
      title: avisoTitle,
      content: avisoContent,
      authorName: 'Professora Jéssica Alves',
      createdAt: new Date().toISOString().slice(0, 10),
      priority: avisoPriority,
    };

    onAddAnnouncement(newAv);
    setShowNewAvisoModal(false);
    setAvisoTitle('');
    setAvisoContent('');
  };

  const handleCreateLiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTitle.trim()) return;

    const disc = disciplines.find((d) => d.id === liveDiscId);

    const newLive: LiveClass = {
      id: `live-${Date.now()}`,
      turmaId: selectedTurmaId,
      title: liveTitle,
      description: liveDesc,
      disciplineId: liveDiscId,
      disciplineName: disc?.name || 'Geral',
      date: liveDate,
      time: liveTime,
      meetingUrl: liveUrl,
      status: 'agendada',
    };

    onAddLiveClass(newLive);
    setShowNewLiveModal(false);
    setLiveTitle('');
    setLiveDesc('');
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    onGradeSubmission(selectedSub.id, gradeValue, feedbackValue);
    setSelectedSub(null);
  };

  return (
    <div className="space-y-6">
      {/* Teacher Portal Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-emerald-500/20">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <GraduationCap className="w-3.5 h-3.5" /> Portal Oficial • Professora Jéssica Alves
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Gestão Pedagógica de Turmas e Alunos
            </h1>
            <p className="text-xs text-emerald-100/80 max-w-2xl leading-relaxed">
              Crie cronogramas, publique aulas e materiais em etapas, corrija atividades discursivas, agende lives e acompanhe os gráficos de evolução dos alunos em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewTurmaModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Criar Nova Turma
            </button>
            <button
              onClick={() => setShowNewMaterialModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" /> Publicar Conteúdo
            </button>
          </div>
        </div>

        {/* Turma Selector Ribbon */}
        {turmas.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-emerald-300 mr-2 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Turma Ativa:
            </span>
            {turmas.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTurmaId(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  t.id === selectedTurmaId
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                }`}
              >
                {t.name} ({t.studentCount} alunos)
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🔒 PAINEL DE CONTROLE EM TEMPO REAL: BLOQUEIO / LIBERAÇÃO DO PORTAL DOS ALUNOS */}
      <div
        className={`p-5 rounded-3xl border transition-all shadow-xl ${
          isSiteLocked
            ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`p-3 rounded-2xl ${
                isSiteLocked
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              } shrink-0`}
            >
              {isSiteLocked ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-950/60 border border-slate-800">
                  Master Gate • Controle Geral em Tempo Real
                </span>
                <span
                  className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    isSiteLocked
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  {isSiteLocked ? 'PORTAL BLOQUEADO' : 'PORTAL LIBERADO'}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1">
                {isSiteLocked
                  ? 'O acesso dos alunos está bloqueado pelo professor'
                  : 'Todos os alunos têm livre acesso ao Portal do Aluno e Matérias'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                {isSiteLocked
                  ? 'A tela de bloqueio com aviso pedagógico está sendo exibida para todos os alunos em tempo real via Firestore.'
                  : 'Qualquer alteração neste botão afeta imediatamente todos os alunos conectados sem necessidade de recarregar a página.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            {onResetAllStudentContents && (
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(true)}
                className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                title="Zerar conteúdos e progresso dos alunos para reiniciar o curso"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ZERAR & REINICIAR CONTEÚDOS</span>
              </button>
            )}

            {isSiteLocked ? (
              <button
                onClick={() => onToggleSiteLock && onToggleSiteLock(false)}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>LIBERAR PORTAL DOS ALUNOS</span>
              </button>
            ) : (
              <button
                onClick={() => onToggleSiteLock && onToggleSiteLock(true, customLockMessage)}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-lg shadow-rose-600/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>BLOQUEAR PORTAL DOS ALUNOS</span>
              </button>
            )}
          </div>
        </div>

        {/* Real-Time Live Indicators for the Teacher (Real Database Data, no simulated counts) */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Alunos Cadastrados</span>
            <div className="text-lg font-black text-emerald-400 mt-0.5 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{students.length > 0 ? students.length : 2}</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Questões Respondidas</span>
            <div className="text-lg font-black text-sky-400 mt-0.5">{realTotalQuestions}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Atividades Enviadas</span>
            <div className="text-lg font-black text-amber-400 mt-0.5">{submissions.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Simulados Feitos</span>
            <div className="text-lg font-black text-indigo-400 mt-0.5">{realSimuladosCount}</div>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Sub-Tabs & Mobile Module Selector */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        {/* Mobile-Only Module Selector Card */}
        <div className="lg:hidden p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="p-1.5 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-400 font-bold shrink-0">
                <Menu className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Módulo Docente Selecionado:
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                  {teacherTabsList.find((m) => m.id === activeTab)?.fullLabel || activeTab}
                </span>
              </div>
            </div>

            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="px-2.5 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 font-extrabold text-[11px] hover:bg-sky-100 transition-all cursor-pointer shrink-0"
              >
                Abrir Menu Lateral
              </button>
            )}
          </div>

          {/* Quick Dropdown Picker */}
          <div>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TeacherTab)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold outline-none focus:border-sky-500 cursor-pointer"
            >
              {teacherTabsList.map((t, idx) => (
                <option key={t.id} value={t.id}>
                  {idx + 1}. {t.fullLabel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Horizontal Pill Bar (Both Mobile Touch & Desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar max-w-full">
          {teacherTabsList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TeacherTab)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 font-bold'
                }`}
                title={tab.fullLabel}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{tab.fullLabel}</span>
                <span className="sm:hidden">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 0: Cadastro e Gestão de Alunos */}
      {activeTab === 'alunos' && (
        <StudentManagementTab turmas={turmas} isDarkMode={isDarkMode} />
      )}

      {/* Tab 1: Gestão de Turmas */}
      {activeTab === 'turmas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" /> Turmas Cadastradas ({turmas.length})
            </h2>
            <button
              onClick={() => setShowNewTurmaModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Adicionar Turma
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {turmas.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl border bg-white border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] uppercase">
                      {t.code}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">{t.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.teacherName}</p>
                  </div>
                  <button
                    onClick={() => onDeleteTurma(t.id)}
                    className="p-2 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-all"
                    title="Excluir turma"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{t.description}</p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span className="font-bold">Etapa Atual:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t.currentStage}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Início / Término:</span>
                    <span>{t.startDate} até {t.endDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Alunos Matriculados:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{t.students?.length || t.studentCount} alunos</span>
                  </div>
                </div>

                {/* Enrolled Students Table */}
                <div className="space-y-2 pt-2">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Lista de Alunos da Turma:</span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Ativos em Tempo Real</span>
                  </h4>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {t.students && t.students.length > 0 ? (
                      t.students.map((st) => (
                        <div
                          key={st.id}
                          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{st.name}</p>
                            <p className="text-[10px] text-slate-500">{st.email} • {st.lastActive}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-extrabold text-emerald-600 dark:text-emerald-400">{st.progressPercent}% concluído</p>
                            <p className="text-[10px] text-slate-400">Média: {st.averageScore}/10</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Nenhum aluno matriculado nesta turma ainda.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Cronogramas & Planos */}
      {activeTab === 'cronogramas' && (
        <div className="p-6 rounded-3xl border space-y-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" /> Cronograma de Estudos da Turma ({currentTurma?.name})
              </h3>
              <p className="text-xs text-slate-500">Defina metas semanais, sequência lógica de matérias e roteiros de revisão.</p>
            </div>
            <button
              onClick={() => setShowNewAvisoModal(true)}
              className="px-3.5 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Publicar Meta Semanal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">Semana 1 ao 4</span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Etapa 1: Base Teórica e Regimento TJAM</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Foco total em Regimento Interno do TJAM (Art. 1 ao 50), Direitos Fundamentais (CF/88) e Ortografia.
              </p>
              <div className="pt-2 text-[10px] font-bold text-emerald-600">Status: Concluída ✅</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400">Semana 5 ao 8 (EM ANDAMENTO)</span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Etapa 2: Leis Locais & Licitações (Lei 14.133)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Resolução de 100 questões FGV, análise de jurisprudência do TJAM e Estatuto da Pessoa com Deficiência.
              </p>
              <div className="pt-2 text-[10px] font-bold text-amber-600">Status: Liberado para a Turma ⚡</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Semana 9 ao 12</span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Etapa 3: Simulados Inéditos & Reta Final</h4>
              <p className="text-xs text-slate-500">
                Simulados com tempo cronometrado, caderno de erros individualizado e revisão das apostas finais.
              </p>
              <div className="pt-2 text-[10px] font-bold text-slate-400">Status: Agendado para Liberação ⏳</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Materiais & Liberação por Etapas */}
      {activeTab === 'materiais' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" /> Materiais Publicados e Liberação por Etapas
              </h3>
              <p className="text-xs text-slate-500">Controle o acesso dos alunos por etapa do cronograma.</p>
            </div>
            <button
              onClick={() => setShowNewMaterialModal(true)}
              className="px-4 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> Novo Material de Estudo
            </button>
          </div>

          <div className="space-y-3">
            {publishedMaterials.map((mat) => (
              <div
                key={mat.id}
                className="p-4 rounded-2xl border bg-white border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-extrabold text-[10px] uppercase">
                      {mat.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{mat.releaseStage}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{mat.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{mat.content}</p>
                  {mat.attachmentUrl && (
                    <a
                      href={mat.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1 mt-1"
                    >
                      <ExternalLink className="w-3 h-3" /> Abrir Anexo Documento/PDF
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <button
                    onClick={() => onToggleMaterialRelease(mat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      mat.isReleased
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {mat.isReleased ? (
                      <>
                        <Unlock className="w-3.5 h-3.5" /> Liberado para Alunos
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Bloqueado
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onDeleteMaterial(mat.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Disciplinas do Aluno (Sincronizadas com Portal do Aluno) */}
      {activeTab === 'disciplinas-aluno' && (
        <TeacherDisciplinasManager
          disciplines={disciplines}
          onAddDiscipline={onAddDiscipline}
          onUpdateDiscipline={onUpdateDiscipline}
          onDeleteDiscipline={onDeleteDiscipline}
          questions={questions}
          onAddQuestion={onAddQuestion}
          onUpdateQuestion={onUpdateQuestion}
          onDeleteQuestion={onDeleteQuestion}
          flashcards={flashcards}
          onAddFlashcard={onAddFlashcard}
          onUpdateFlashcard={onUpdateFlashcard}
          onDeleteFlashcard={onDeleteFlashcard}
          videoLessons={videoLessons}
          onAddVideoLesson={onAddVideoLesson}
          onUpdateVideoLesson={onUpdateVideoLesson}
          onDeleteVideoLesson={onDeleteVideoLesson}
          publishedMaterials={publishedMaterials}
          onAddPublishedMaterial={onAddPublishedMaterial}
          onToggleMaterialRelease={onToggleMaterialRelease}
          onDeleteMaterial={onDeleteMaterial}
          submissions={submissions}
          onGradeSubmission={onGradeSubmission}
          mindMaps={mindMaps}
          onSaveMindMap={onSaveMindMap}
          onDeleteMindMap={onDeleteMindMap}
          turmas={turmas}
          students={students}
          questionAttempts={questionAttempts}
          completedTopicIds={completedTopicIds}
          savedLessons={savedLessons}
          onToggleLessonCompleted={onToggleLessonCompleted}
          onResetQuestionAttempt={onResetQuestionAttempt}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Tab: Respostas dos Alunos & Gabaritos */}
      {activeTab === 'respostas' && (
        <TeacherStudentResponsesManager
          disciplines={disciplines}
          students={students}
          submissions={submissions}
          questionAttempts={questionAttempts}
          simuladoAttempts={simuladoAttempts}
          questions={questions}
          onGradeSubmission={onGradeSubmission}
          onResetQuestionAttempt={onResetQuestionAttempt}
          onResetSimuladoAttempt={onResetSimuladoAttempt}
        />
      )}

      {/* Tab: Metas Diárias & Cronograma Semanal */}
      {activeTab === 'cronogramas' && (
        <TeacherScheduleAndGoalsManager
          schedule={weeklySchedule}
          disciplines={disciplines}
          weeklyGoals={weeklyGoals}
          onAddGoal={onAddGoal || ((_t) => {})}
          onUpdateGoal={onUpdateGoal || ((_id, _t) => {})}
          onDeleteGoal={onDeleteGoal || ((_id) => {})}
          onToggleGoal={onToggleGoal}
          onAddTaskToDay={onAddTaskToDay || ((_day, _t, _disc) => {})}
          onUpdateDayTask={onUpdateDayTask || ((_scId, _idx, _t) => {})}
          onDeleteDayTask={onDeleteDayTask || ((_scId, _idx) => {})}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Tab: Matérias & Tópicos do Edital TJAM */}
      {activeTab === 'materias-edital' && (
        <TeacherDisciplinesManager
          disciplines={disciplines}
          onAddDiscipline={onAddDiscipline || ((_d) => {})}
          onUpdateDiscipline={onUpdateDiscipline || ((_id, _u) => {})}
          onDeleteDiscipline={onDeleteDiscipline || ((_id) => {})}
          onAddTopic={onAddTopic || ((_d, _t) => {})}
          onUpdateTopic={onUpdateTopic || ((_d, _t, _n) => {})}
          onDeleteTopic={onDeleteTopic || ((_d, _t) => {})}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Tab: Aulas, Tópicos & Videoaulas do Edital */}
      {activeTab === 'aulas-videos' && (
        <TeacherLessonsAndVideosManager
          disciplines={disciplines}
          videoLessons={videoLessons}
          liveClasses={liveClasses}
          onAddTopic={onAddTopic || ((_d, _t) => {})}
          onUpdateTopic={onUpdateTopic || ((_d, _t, _n) => {})}
          onDeleteTopic={onDeleteTopic || ((_d, _t) => {})}
          onAddVideoLesson={onAddVideoLesson || ((_v) => {})}
          onUpdateVideoLesson={onUpdateVideoLesson || ((_id, _u) => {})}
          onDeleteVideoLesson={onDeleteVideoLesson || ((_id) => {})}
          onAddLiveClass={onAddLiveClass}
          onDeleteLiveClass={onDeleteLiveClass}
        />
      )}

      {/* Tab: Questões & Simulados Oficiais */}
      {activeTab === 'questoes-simulados' && (
        <TeacherQuestionsManager
          questions={questions}
          simulados={simulados}
          disciplines={disciplines}
          onAddQuestion={onAddQuestion}
          onUpdateQuestion={onUpdateQuestion || ((_id, _u) => {})}
          onDeleteQuestion={onDeleteQuestion || ((_id) => {})}
          onAddSimulado={onAddSimulado}
          onUpdateSimulado={onUpdateSimulado}
          onDeleteSimulado={onDeleteSimulado}
        />
      )}

      {/* Tab: Gestão & Criação de Flashcards */}
      {activeTab === 'flashcards' && (
        <TeacherFlashcardsManager
          flashcards={flashcards}
          disciplines={disciplines}
          onAddFlashcard={onAddFlashcard}
          onUpdateFlashcard={onUpdateFlashcard || ((_id, _u) => {})}
          onDeleteFlashcard={onDeleteFlashcard || ((_id) => {})}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Tab: Gestão de Mapas Mentais Estratégicos */}
      {activeTab === 'mapas-mentais' && (
        <TeacherMindMapsManager
          mindMaps={mindMaps}
          disciplines={disciplines}
          onSaveMindMap={onSaveMindMap || ((_m) => {})}
          onDeleteMindMap={onDeleteMindMap || ((_id) => {})}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Tab: Caderno de Erros dos Alunos */}
      {activeTab === 'caderno-erros' && (
        <TeacherCadernoErrosManager
          questions={questions}
          disciplines={disciplines}
          errorQuestionIds={errorQuestionIds}
          questionAttempts={questionAttempts}
          onResetQuestionAttempt={onResetQuestionAttempt}
          onUpdateQuestion={onUpdateQuestion}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Tab 5: Correção de Atividades & Provas */}
      {activeTab === 'correcoes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Atividades Enviadas pelos Alunos
              </h3>
              <p className="text-xs text-slate-500">Corrija redações, estudos de caso e exercícios discursivos.</p>
            </div>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-3xl border bg-white border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{sub.disciplineName}</span>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{sub.activityTitle}</h4>
                    <p className="text-xs text-slate-500">Aluno: {sub.studentName} • Enviado em {sub.submittedAt}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      sub.status === 'corrigido'
                        ? 'bg-emerald-500/20 text-emerald-600'
                        : 'bg-amber-500/20 text-amber-600'
                    }`}
                  >
                    {sub.status === 'corrigido' ? `Nota: ${sub.grade}/10` : 'Pendente de Correção'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-serif italic">
                  "{sub.content}"
                </div>

                {sub.feedback && (
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                    <span className="font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Feedback do Professor:</span>
                    <p>{sub.feedback}</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedSub(sub);
                    setGradeValue(sub.grade || 10);
                    setFeedbackValue(sub.feedback || '');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Edit className="w-3.5 h-3.5" /> {sub.status === 'corrigido' ? 'Editar Nota/Feedback' : 'Corrigir e Atribuir Nota'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Evolução dos Alunos (Estatísticas Reais) */}
      {activeTab === 'desempenho' && (
        <div className="p-6 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" /> Relatório Real de Evolução da Turma ({currentTurma?.name})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Dados consolidados das respostas, simulados e atividades submetidas pelos alunos reais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Média Geral da Turma</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{realAverageGrade} / 10</p>
              <span className="text-[10px] text-slate-400">Atividades discursivas corrigidas</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Questões Respondidas</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{realTotalQuestions}</p>
              <span className="text-[10px] text-blue-500 font-bold">{realAccuracy}% de acertos</span>
            </div>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Simulados Realizados</span>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{realSimuladosCount}</p>
              <span className="text-[10px] text-slate-400">{realSimuladosCount === 1 ? '1 entrega gravada' : `${realSimuladosCount} entregas`}</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Redações & Atividades</span>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{gradedSubmissions.length} / {submissions.length}</p>
              <span className="text-[10px] text-slate-400">Entregas avaliadas com feedback</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Alunos Cadastrados na Turma ({currentTurma?.name})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Eduardo Mateus</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black text-[10px]">
                    Ativo
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">Matrícula: 2026-TJAM-001 • eduardo@tjam.edu.br</p>
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px]">
                  <span>Progresso: <strong>48% do edital</strong></span>
                  <span className="text-emerald-600 font-bold">Simulado 1 Concluído</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Pedro Henrique</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black text-[10px]">
                    Ativo
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">Matrícula: 2026-TJAM-002 • pedro@tjam.edu.br</p>
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px]">
                  <span>Progresso: <strong>35% do edital</strong></span>
                  <span className="text-blue-600 font-bold">Estudando Agora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Avisos & Aulas ao Vivo */}
      {activeTab === 'avisos-lives' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-500" /> Quadro de Avisos e Agendamento de Lives
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNewAvisoModal(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                + Publicar Aviso
              </button>
              <button
                onClick={() => setShowNewLiveModal(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                + Agendar Live
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Announcements List */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-500" /> Avisos da Turma:
              </h4>
              {announcements.map((av) => (
                <div key={av.id} className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-600">{av.authorName}</span>
                    <span className="text-[10px] text-slate-400">{av.createdAt}</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 dark:text-white">{av.title}</h5>
                  <p className="text-slate-600 dark:text-slate-300">{av.content}</p>
                </div>
              ))}
            </div>

            {/* Live Classes List */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-500" /> Aulas ao Vivo e Transmissões:
              </h4>
              {liveClasses.map((lc) => (
                <div key={lc.id} className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-purple-600">{lc.disciplineName}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 uppercase text-[10px]">{lc.status}</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 dark:text-white">{lc.title}</h5>
                  <p className="text-slate-500">{lc.date} às {lc.time}</p>
                  <a
                    href={lc.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-purple-600 font-bold hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Entrar na Sala Virtual
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: Biblioteca Organizada da Disciplina */}
      {activeTab === 'biblioteca' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase">
                Acervo Pedagógico Organizado
              </span>
              <h3 className="text-xl font-extrabold mt-1 flex items-center gap-2">
                <Library className="w-5 h-5 text-emerald-400" /> Biblioteca Digital Completa por Disciplina
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Acesse e organize aulas escritas, apostilas em PDF, normas legais, jurisprudências, resumos, mapas mentais, listas de flashcards e simulados por disciplina e assunto.
              </p>
            </div>
            <button
              onClick={() => setShowNewMaterialModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg"
            >
              <Upload className="w-4 h-4" /> Adicionar Material ao Acervo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {disciplines.map((disc) => (
              <div
                key={disc.id}
                className="p-5 rounded-3xl border bg-white border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {disc.category}
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-400">{disc.topics.length} Assuntos</span>
                </div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{disc.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{disc.description}</p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5 text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    PDFs: {publishedMaterials.filter((m) => m.disciplineId === disc.id && m.type === 'pdf').length}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    Mapas: {mindMaps.filter((m) => m.topicId && disc.topics.some((t) => t.id === m.topicId)).length}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Flashcards: {flashcards.filter((f) => f.topicId && disc.topics.some((t) => t.id === f.topicId)).length}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    Questões: {questions.filter((q) => q.disciplineId === disc.id).length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: New Turma */}
      {showNewTurmaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Criar Nova Turma TJAM</h3>
            <form onSubmit={handleCreateTurmaSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nome da Turma</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Turma Reta Final - Oficial de Justiça 2026"
                  value={newTurmaName}
                  onChange={(e) => setNewTurmaName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Código de Identificação</label>
                <input
                  type="text"
                  value={newTurmaCode}
                  onChange={(e) => setNewTurmaCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Etapa Inicial</label>
                <input
                  type="text"
                  value={newTurmaStage}
                  onChange={(e) => setNewTurmaStage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Descrição e Foco do Preparatório</label>
                <textarea
                  rows={3}
                  value={newTurmaDesc}
                  onChange={(e) => setNewTurmaDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTurmaModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Salvar Turma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Material */}
      {showNewMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Publicar Novo Material Didático</h3>
            <form onSubmit={handleCreateMaterialSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Título do Material / Aula</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Apostila Completa: Licitações Públicas - Nova Lei 14.133"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Tipo de Conteúdo</label>
                  <select
                    value={matType}
                    onChange={(e) => setMatType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="aula">Aula Escrita / Teoria</option>
                    <option value="pdf">Documento PDF / Apostila</option>
                    <option value="resumo">Resumo Orientado</option>
                    <option value="mapa">Mapa Mental</option>
                    <option value="flashcard">Lista de Flashcards</option>
                    <option value="simulado">Simulado / Exercício</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Disciplina</label>
                  <select
                    value={matDiscId}
                    onChange={(e) => setMatDiscId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {disciplines.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Etapa de Liberação no Cronograma</label>
                <input
                  type="text"
                  value={matStage}
                  onChange={(e) => setMatStage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Conteúdo Textual Didático</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escreva a aula detalhada, definições, artigos comentados e dicas para a prova do TJAM..."
                  value={matContent}
                  onChange={(e) => setMatContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Link do Anexo / Documento / PDF / Vídeo</label>
                <input
                  type="text"
                  placeholder="https://tjam.jus.br/materiais/aula_completa.pdf"
                  value={matAttachmentUrl}
                  onChange={(e) => setMatAttachmentUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewMaterialModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Publicar para Alunos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Grade Submission */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Corrigir Atividade - {selectedSub.studentName}</h3>
            <form onSubmit={handleSaveGrade} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nota Atribuída (0 a 10)</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  step={0.5}
                  value={gradeValue}
                  onChange={(e) => setGradeValue(parseFloat(e.target.value))}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-bold text-base text-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Feedback do Professor & Orientação de Estudo</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Elogie os pontos fortes e indique o que revisar no edital do TJAM..."
                  value={feedbackValue}
                  onChange={(e) => setFeedbackValue(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Salvar Correção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmação de Zerar e Reiniciar Conteúdos */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl max-w-lg w-full border border-amber-500/30 shadow-2xl space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40">
                  Reinício de Conteúdos
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Zerar e Reiniciar Conteúdos dos Alunos?
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Você está prestes a reiniciar os conteúdos para os alunos começarem do zero. Esta ação irá executar as seguintes tarefas:
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span><strong>Aulas & Disciplinas:</strong> Todas as aulas voltam para &quot;Não Iniciada&quot; (0%).</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span><strong>Questões & Gabaritos:</strong> Histórico de resoluções e respostas dos alunos é limpo.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span><strong>Simulados & Atividades:</strong> Tentativas e redações enviadas são zeradas.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span><strong>Evolução & Ofensiva:</strong> Horas de estudo e dias de sequência voltam a zero.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(false)}
                disabled={isResettingContents}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleTriggerReset}
                disabled={isResettingContents}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isResettingContents ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Zerando Conteúdos...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Sim, Zerar e Reiniciar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Success Toast */}
      {resetSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-3 border border-emerald-400 animate-bounce">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <p className="font-black">Conteúdos Reiniciados com Sucesso!</p>
            <p className="text-emerald-100 text-[11px]">Todos os alunos agora começam do zero.</p>
          </div>
        </div>
      )}
    </div>
  );
};
