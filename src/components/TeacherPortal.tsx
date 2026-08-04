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
  Sparkles,
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
} from 'lucide-react';

interface TeacherPortalProps {
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
  onAddFlashcard: (f: Flashcard) => void;
  isDarkMode: boolean;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
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
  onAddFlashcard,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<TeacherTab>('turmas');
  const [selectedTurmaId, setSelectedTurmaId] = useState<string>(turmas[0]?.id || '');

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
      teacherId: 'prof-current',
      teacherName: 'Prof. Dr. Alberto Silva (Você)',
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
      authorName: 'Prof. Dr. Alberto Silva',
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
      authorName: 'Prof. Dr. Alberto Silva',
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
              <Sparkles className="w-3.5 h-3.5" /> Portal Oficial do Professor / Docente TJAM
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

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'turmas', label: 'Gestão de Turmas', icon: Users },
          { id: 'cronogramas', label: 'Cronogramas & Planos', icon: Calendar },
          { id: 'materiais', label: 'Materiais & Liberação por Etapas', icon: BookOpen },
          { id: 'questoes-simulados', label: 'Questões & Simulados', icon: FileText },
          { id: 'correcoes', label: 'Correção de Atividades', icon: CheckCircle },
          { id: 'desempenho', label: 'Evolução dos Alunos', icon: BarChart3 },
          { id: 'avisos-lives', label: 'Avisos & Aulas ao Vivo', icon: Video },
          { id: 'biblioteca', label: 'Biblioteca da Disciplina', icon: Library },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TeacherTab)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

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
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
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
                className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
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

      {/* Tab 4: Questões & Simulados */}
      {activeTab === 'questoes-simulados' && (
        <div className="p-6 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" /> Banco de Questões e Simulados Inéditos
              </h3>
              <p className="text-xs text-slate-500">Cadastre questões com gabarito comentado, fundamentação e nível de dificuldade.</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
              Total: {questions.length} Questões Registradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.slice(0, 6).map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-600">
                  <span>{q.topicName}</span>
                  <span className="capitalize">{q.difficulty}</span>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white line-clamp-3">{q.statement}</p>
                <div className="p-2 rounded bg-emerald-500/10 text-[11px] text-emerald-700 dark:text-emerald-300">
                  💡 Gabarito: {q.correctOptionId.toUpperCase()} • Ref: {q.legalReference || 'Geral'}
                </div>
              </div>
            ))}
          </div>
        </div>
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
                className={`p-5 rounded-3xl border space-y-3 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
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

      {/* Tab 6: Evolução dos Alunos */}
      {activeTab === 'desempenho' && (
        <div className="p-6 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" /> Relatório de Evolução da Turma ({currentTurma?.name})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Média Geral da Turma</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">8.4 / 10</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Taxa de Conclusão de Aulas</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">74.2%</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Simulados Realizados</span>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">182 entregas</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-xs font-bold text-slate-500">Matéria com Maior Dificuldade</span>
              <p className="text-sm font-black text-amber-600 dark:text-amber-400 mt-2">Processo Civil / Licitações</p>
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
                className={`p-5 rounded-3xl border space-y-3 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
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
    </div>
  );
};
