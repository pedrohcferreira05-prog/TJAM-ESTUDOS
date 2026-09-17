import React from 'react';
import { ViewMode, StudentTab, TeacherTab, AuthSession } from '../types';
import {
  Home,
  GraduationCap,
  BookOpen,
  FileText,
  HelpCircle,
  TrendingUp,
  User,
  Trophy,
  X,
  Layers,
  Brain,
  Award,
  AlertCircle,
  Users,
  Calendar,
  CheckCircle,
  BarChart3,
  Video,
  Library,
  UserPlus,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface SidebarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentUserSession?: AuthSession | null;
  currentStudentTab: StudentTab;
  onSelectStudentTab: (tab: StudentTab) => void;
  currentTeacherTab: TeacherTab;
  onSelectTeacherTab: (tab: TeacherTab) => void;
  isDarkMode?: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  isDuo?: boolean;
}

interface StudentMenuItem {
  id: StudentTab;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: string;
  section: 'estudo' | 'fixacao' | 'geral';
}

interface TeacherMenuItem {
  id: TeacherTab;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: string;
  description: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  viewMode,
  setViewMode,
  currentUserSession,
  currentStudentTab,
  onSelectStudentTab,
  currentTeacherTab,
  onSelectTeacherTab,
  isOpenMobile = false,
  onCloseMobile,
  onLogout,
}) => {
  const isTeacher = currentUserSession?.role === 'teacher';

  const studentMenuItems: StudentMenuItem[] = [
    { id: 'dashboard', label: 'Metas de Hoje', icon: Home, badge: 'Hoje', section: 'estudo' },
    { id: 'materias', label: 'Matérias (Edital)', icon: BookOpen, badge: '11', section: 'estudo' },
    { id: 'aula-hoje', label: 'Aulas de Hoje', icon: FileText, section: 'estudo' },
    { id: 'simulados', label: 'Simulados & Ranking', icon: Trophy, badge: '5º', section: 'estudo' },

    { id: 'questoes', label: 'Questões Comentadas', icon: HelpCircle, section: 'fixacao' },
    { id: 'flashcards', label: 'Flashcards', icon: Brain, section: 'fixacao' },
    { id: 'mapa-mental', label: 'Mapas Mentais', icon: Layers, section: 'fixacao' },
    { id: 'caderno-erros', label: 'Caderno de Erros', icon: AlertCircle, section: 'fixacao' },
    { id: 'progresso', label: 'Meu Progresso', icon: TrendingUp, section: 'fixacao' },

    { id: 'turma', label: 'Mural da Turma', icon: GraduationCap, section: 'geral' },
    { id: 'perfil', label: 'Meu Perfil', icon: User, section: 'geral' },
  ];

  const teacherMenuItems: TeacherMenuItem[] = [
    {
      id: 'alunos',
      label: 'Alunos & Senhas',
      icon: UserPlus,
      description: 'Gerenciar matrículas e senhas',
    },
    {
      id: 'turmas',
      label: 'Gestão de Turmas',
      icon: Users,
      description: 'Turmas e etapas ativas',
    },
    {
      id: 'disciplinas-aluno',
      label: 'Disciplinas do Aluno',
      icon: BookOpen,
      badge: '11 Matérias',
      description: 'Gestão, postagens, edição e tarefas por matéria',
    },
    {
      id: 'respostas',
      label: 'Respostas & Notas',
      icon: CheckCircle,
      description: 'Gabaritos, simulados e notas',
    },
    {
      id: 'cronogramas',
      label: 'Metas & Cronograma',
      icon: Calendar,
      description: 'Metas diárias e roteiro semanal',
    },
    {
      id: 'materias-edital',
      label: 'Matérias (Edital)',
      icon: BookOpen,
      description: '11 disciplinas e assuntos TJAM',
    },
    {
      id: 'aulas-videos',
      label: 'Aulas & Videoaulas',
      icon: Video,
      description: 'Controle de aulas e videoaulas',
    },
    {
      id: 'questoes-simulados',
      label: 'Questões & Simulados',
      icon: FileText,
      description: 'Banco de itens comentados e simulados',
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      icon: Layers,
      description: 'Criar e administrar cartões',
    },
    {
      id: 'mapas-mentais',
      label: 'Mapas Mentais',
      icon: Brain,
      description: 'Diagramas e esquemas conceituais',
    },
    {
      id: 'caderno-erros',
      label: 'Caderno de Erros',
      icon: AlertCircle,
      description: 'Monitoramento e orientações pedagógicas',
    },
    {
      id: 'materiais',
      label: 'Arquivos & PDFs',
      icon: BookOpen,
      description: 'PDFs, apostilas e liberação',
    },
    {
      id: 'correcoes',
      label: 'Correção de Redações',
      icon: Award,
      description: 'Envios de redações e peças',
    },
    {
      id: 'desempenho',
      label: 'Evolução dos Alunos',
      icon: BarChart3,
      description: 'Relatórios reais de desempenho',
    },
    {
      id: 'avisos-lives',
      label: 'Avisos & Aulas ao Vivo',
      icon: Video,
      description: 'Comunicados e transmissões',
    },
    {
      id: 'biblioteca',
      label: 'Biblioteca Digital',
      icon: Library,
      description: 'Acervo digital completo',
    },
  ];

  const handlePortalSwitch = (mode: ViewMode) => {
    // RBAC Security Check
    if (!isTeacher && (mode === 'teacher' || mode === 'admin' || mode === 'superadmin')) {
      return;
    }
    setViewMode(mode);
    if (onCloseMobile) onCloseMobile();
  };

  const handleTeacherTabClick = (tab: TeacherTab) => {
    if (viewMode !== 'teacher') {
      setViewMode('teacher');
    }
    onSelectTeacherTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const handleStudentTabClick = (tab: StudentTab) => {
    if (viewMode !== 'student') {
      setViewMode('student');
    }
    onSelectStudentTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full p-3.5 space-y-4">
      {/* User Session Profile Box */}
      <div className="p-3 rounded-2xl border bg-slate-50 border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
              isTeacher
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-amber-500 text-slate-950 shadow-xs'
            }`}
          >
            {isTeacher ? 'JA' : currentUserSession?.name?.charAt(0).toUpperCase() || 'AL'}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-black text-slate-900 truncate">
              {currentUserSession?.name || (isTeacher ? 'Profª Jéssica Alves' : 'Aluno TJAM')}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  isTeacher
                    ? 'bg-sky-100 text-sky-800 border border-sky-200'
                    : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                {isTeacher ? 'Docente Autorizada' : 'Aluno Matriculado'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 1. SELETOR DE PORTAIS (Centralizado no Menu - Cabeçalho Livre) */}
      <div className="space-y-1.5">
        <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-slate-400" />
          Acesso aos Portais
        </span>

        <div className="space-y-1 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200">
          {/* TEACHER ONLY: Portal do Docente */}
          {isTeacher && (
            <button
              onClick={() => handlePortalSwitch('teacher')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition-all text-left cursor-pointer ${
                viewMode === 'teacher'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-sky-900 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Users className={`w-4 h-4 shrink-0 ${viewMode === 'teacher' ? 'text-white' : 'text-sky-600'}`} />
                <span className="truncate">Portal do Docente</span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                viewMode === 'teacher' ? 'bg-sky-700 text-white' : 'bg-sky-100 text-sky-800'
              }`}>
                Gestão
              </span>
            </button>
          )}

          {/* Student Portal (Visible to student; also visible to teacher as preview mode) */}
          <button
            onClick={() => handlePortalSwitch('student')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition-all text-left cursor-pointer ${
              viewMode === 'student'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 hover:text-amber-950 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <GraduationCap className={`w-4 h-4 shrink-0 ${viewMode === 'student' ? 'text-slate-950' : 'text-amber-600'}`} />
              <span className="truncate">Portal do Aluno TJAM</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              viewMode === 'student' ? 'bg-amber-600 text-slate-950' : 'bg-amber-100 text-amber-900'
            }`}>
              Estudo
            </span>
          </button>

          {/* Simulados & Ranking */}
          <button
            onClick={() => handlePortalSwitch('simulado')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition-all text-left cursor-pointer ${
              viewMode === 'simulado'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-emerald-950 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Trophy className={`w-4 h-4 shrink-0 ${viewMode === 'simulado' ? 'text-white' : 'text-emerald-600'}`} />
              <span className="truncate">Simulados Oficiais & Ranking</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              viewMode === 'simulado' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              FGV
            </span>
          </button>
        </div>
      </div>

      {/* 2. CONTEÚDO NAVEGACIONAL DO MÓDULO */}
      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
        {/* CASO 1: Portal do Docente Ativo */}
        {viewMode === 'teacher' && isTeacher && (
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Módulos da Professora
              </span>
              <span className="text-[10px] font-bold text-sky-600">{teacherMenuItems.length} Módulos</span>
            </div>

            <div className="space-y-1 pt-1">
              {teacherMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTeacherTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTeacherTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CASO 2: Portal do Aluno Ativo */}
        {(viewMode === 'student' || viewMode === 'simulado') && (
          <>
            {/* Estudo Diário */}
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Rotina de Estudo
              </span>
              <div className="space-y-0.5 pt-0.5">
                {studentMenuItems
                  .filter((i) => i.section === 'estudo')
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      currentStudentTab === item.id ||
                      (item.id === 'aula-hoje' && currentStudentTab === 'semana1');

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleStudentTabClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                              isActive
                                ? 'bg-slate-950 text-amber-400'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Ferramentas de Fixação */}
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Fixação & Treino
              </span>
              <div className="space-y-0.5 pt-0.5">
                {studentMenuItems
                  .filter((i) => i.section === 'fixacao')
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = currentStudentTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleStudentTabClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Geral */}
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Geral
              </span>
              <div className="space-y-0.5 pt-0.5">
                {studentMenuItems
                  .filter((i) => i.section === 'geral')
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = currentStudentTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleStudentTabClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Target Exam Badge & Logout */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate font-bold text-slate-700">Edital TJAM 2026</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 font-semibold">Seguro</span>
        </div>

        {onLogout && (
          <button
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Encerrar Sessão</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-white border-slate-200 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-20 overflow-y-auto">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-150">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex flex-col w-80 max-w-[85vw] bg-white border-r border-slate-200 h-full z-10 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200">
              <span className="font-black text-sm text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                Menu & Portais TJAM
              </span>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Fechar Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};
