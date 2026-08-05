import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Lock, XCircle, Trophy, Medal, Award, Flame } from 'lucide-react';
import {
  Discipline,
  MindMap,
  Question,
  Flashcard,
  Simulado,
  NewsItem,
  UserProgress,
  WeeklyScheduleItem,
  ViewMode,
  StudentTab,
  SimuladoAttempt,
} from './types';
import {
  TJAM_DISCIPLINES,
  SAMPLE_QUESTIONS,
  INITIAL_FLASHCARDS,
  INITIAL_SIMULADOS,
  INITIAL_NEWS,
  INITIAL_WEEKLY_SCHEDULE,
  INITIAL_MINDMAPS_TJAM,
} from './data/tjamData';
import {
  INITIAL_TURMAS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_LIVE_CLASSES,
  INITIAL_PUBLISHED_MATERIALS,
  INITIAL_SUBMISSIONS,
} from './data/teacherData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PerfilView } from './components/PerfilView';
import { AulaHojeView } from './components/AulaHojeView';
import { DisciplineList } from './components/DisciplineList';
import { DisciplineView } from './components/DisciplineView';
import { StudyScheduleView } from './components/StudyScheduleView';
import { RevisionCenterView } from './components/RevisionCenterView';
import { SimuladosView } from './components/SimuladosView';
import { CadernoErrosView } from './components/CadernoErrosView';
import { NewsView } from './components/NewsView';
import { AdminPanel } from './components/AdminPanel';
import { TeacherPortal } from './components/TeacherPortal';
import { StudentPortal } from './components/StudentPortal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { AuthModal } from './components/AuthModal';
import { RestrictedAccessView } from './components/RestrictedAccessView';
import { Week1View } from './components/Week1View';
import { saveWeek1ContentToFirestore } from './lib/firestoreService';

export function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tjam_theme') === 'dark';
  });

  // Auth & View Mode state (MVP Mode: Default student interface)
  const [viewMode, setViewMode] = useState<ViewMode>('student');
  const [studentTab, setStudentTab] = useState<StudentTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'admin_login'>('login');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>(() => {
    return localStorage.getItem('tjam_user_email') || 'aluno.tjam@estudos.com.br';
  });
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('tjam_staff_auth') === 'true';
  });

  const handleLoginSuccess = (email: string, role: 'student' | 'teacher' | 'admin' | 'superadmin') => {
    setCurrentUserEmail(email);
    localStorage.setItem('tjam_user_email', email);

    if (role === 'admin' || role === 'superadmin' || role === 'teacher') {
      setIsStaffAuthenticated(true);
      localStorage.setItem('tjam_staff_auth', 'true');
      setViewMode(role === 'teacher' ? 'teacher' : 'admin');
    } else {
      setViewMode('student');
    }
  };

  const handleStaffPasscode = (passcode: string): boolean => {
    if (passcode === 'admin2026' || passcode === 'tjam2026' || passcode === 'admin' || passcode === 'prof2026') {
      setIsStaffAuthenticated(true);
      localStorage.setItem('tjam_staff_auth', 'true');
      return true;
    }
    return false;
  };

  // Selected Discipline state
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);
  const [disciplineSubTab, setDisciplineSubTab] = useState<string>('aulas');

  // Core App State persisted in localStorage
  const [disciplines] = useState<Discipline[]>(TJAM_DISCIPLINES);

  const [mindMaps, setMindMaps] = useState<MindMap[]>(() => {
    const saved = localStorage.getItem('tjam_mindmaps');
    return saved ? JSON.parse(saved) : INITIAL_MINDMAPS_TJAM;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('tjam_questions');
    return saved ? JSON.parse(saved) : SAMPLE_QUESTIONS;
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('tjam_flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [simulados, setSimulados] = useState<Simulado[]>(() => {
    const saved = localStorage.getItem('tjam_simulados');
    return saved ? JSON.parse(saved) : INITIAL_SIMULADOS;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('tjam_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyScheduleItem[]>(() => {
    const saved = localStorage.getItem('tjam_schedule');
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_SCHEDULE;
  });

  // Teacher Portal state
  const [turmas, setTurmas] = useState(() => {
    const saved = localStorage.getItem('tjam_turmas');
    return saved ? JSON.parse(saved) : INITIAL_TURMAS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('tjam_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [liveClasses, setLiveClasses] = useState(() => {
    const saved = localStorage.getItem('tjam_live_classes');
    return saved ? JSON.parse(saved) : INITIAL_LIVE_CLASSES;
  });

  const [publishedMaterials, setPublishedMaterials] = useState(() => {
    const saved = localStorage.getItem('tjam_published_materials');
    return saved ? JSON.parse(saved) : INITIAL_PUBLISHED_MATERIALS;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('tjam_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  useEffect(() => {
    localStorage.setItem('tjam_turmas', JSON.stringify(turmas));
  }, [turmas]);

  useEffect(() => {
    localStorage.setItem('tjam_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('tjam_live_classes', JSON.stringify(liveClasses));
  }, [liveClasses]);

  useEffect(() => {
    localStorage.setItem('tjam_published_materials', JSON.stringify(publishedMaterials));
  }, [publishedMaterials]);

  useEffect(() => {
    localStorage.setItem('tjam_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('tjam_user_progress');
    if (saved) return JSON.parse(saved);
    return {
      dailyGoalHours: 4,
      hoursStudiedToday: 2.5,
      totalHoursStudied: 48.5,
      streakDays: 12,
      lastStudiedDate: new Date().toISOString(),
      targetExamDate: '2026-11-15',
      completedTopicIds: ['port-1', 'port-[2]', 'const-1', 'const-4', 'adm-1', 'tjam-1'],
      studiedMapIds: [],
      favoriteMapIds: [],
      favoriteFlashcardIds: [],
      errorQuestionIds: [],
      questionAttempts: [],
      flashcardReviews: {},
      personalNotes: {},
      nodeNotes: {},
      simuladoAttempts: [],
      reviewQueue: [
        {
          id: 'rev-1',
          disciplineId: 'direito-constitucional',
          disciplineName: 'Direito Constitucional',
          topicName: 'Remédios Constitucionais',
          type: '24h',
          dueDate: 'Hoje',
          completed: false,
        },
        {
          id: 'rev-2',
          disciplineId: 'direito-administrativo',
          disciplineName: 'Direito Administrativo',
          topicName: 'Atos Administrativos (Atributos PATI)',
          type: '7d',
          dueDate: 'Amanhã',
          completed: false,
        },
        {
          id: 'rev-3',
          disciplineId: 'legislacao-tjam',
          disciplineName: 'Legislação Institucional do TJAM',
          topicName: 'Regimento Interno e Plantão Judiciário',
          type: '30d',
          dueDate: 'Em 3 dias',
          completed: false,
        },
      ],
      weeklyGoals: [
        { id: 'g1', text: 'Resolver 50 questões de Português e Constitucional', completed: true },
        { id: 'g2', text: 'Revisar o Regimento Interno do TJAM (Art. 12 ao 45)', completed: true },
        { id: 'g3', text: 'Realizar Simulado Reta Final #01 no Domingo', completed: false },
      ],
    };
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('tjam_mindmaps', JSON.stringify(mindMaps));
  }, [mindMaps]);

  useEffect(() => {
    localStorage.setItem('tjam_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('tjam_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('tjam_simulados', JSON.stringify(simulados));
  }, [simulados]);

  useEffect(() => {
    localStorage.setItem('tjam_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('tjam_schedule', JSON.stringify(weeklySchedule));
  }, [weeklySchedule]);

  useEffect(() => {
    localStorage.setItem('tjam_user_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // AI Modal State
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleOpenAIAssistant = (prompt?: string) => {
    setAiPrompt(prompt || '');
    setIsAIOpen(true);
  };

  // State Handlers
  const handleSelectDiscipline = (discId: string, initialSubTab?: string) => {
    setSelectedDisciplineId(discId);
    if (initialSubTab) setDisciplineSubTab(initialSubTab);
    setStudentTab('disciplines');
  };

  const handleToggleTopicCompletion = (topicId: string) => {
    setUserProgress((prev) => {
      const exists = prev.completedTopicIds.includes(topicId);
      const newTopics = exists
        ? prev.completedTopicIds.filter((id) => id !== topicId)
        : [...prev.completedTopicIds, topicId];
      return { ...prev, completedTopicIds: newTopics };
    });
  };

  const handleAnswerQuestion = (questionId: string, optionId: string) => {
    const targetQ = questions.find((q) => q.id === questionId);
    if (!targetQ) return;

    const isCorrect = targetQ.correctOptionId === optionId;

    setUserProgress((prev) => {
      const newAttempts = [
        ...prev.questionAttempts,
        {
          id: `att-${Date.now()}`,
          questionId,
          selectedOptionId: optionId,
          isCorrect,
          answeredAt: new Date().toISOString(),
        },
      ];

      const newErrorIds = !isCorrect
        ? Array.from(new Set([...prev.errorQuestionIds, questionId]))
        : prev.errorQuestionIds.filter((id) => id !== questionId);

      return {
        ...prev,
        questionAttempts: newAttempts,
        errorQuestionIds: newErrorIds,
      };
    });
  };

  const handleReviewFlashcard = (flashcardId: string, rating: 'fácil' | 'médio' | 'difícil' | 'errei') => {
    setUserProgress((prev) => ({
      ...prev,
      flashcardReviews: { ...prev.flashcardReviews, [flashcardId]: rating },
    }));
  };

  const handleSavePersonalNote = (topicId: string, text: string) => {
    setUserProgress((prev) => ({
      ...prev,
      personalNotes: { ...prev.personalNotes, [topicId]: text },
    }));
  };

  const handleLogStudyHours = (hours: number) => {
    setUserProgress((prev) => ({
      ...prev,
      hoursStudiedToday: Math.round((prev.hoursStudiedToday + hours) * 10) / 10,
      totalHoursStudied: Math.round((prev.totalHoursStudied + hours) * 10) / 10,
    }));
  };

  const handleToggleWeeklyGoal = (goalId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      weeklyGoals: prev.weeklyGoals.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g)),
    }));
  };

  const handleAddWeeklyGoal = (text: string) => {
    setUserProgress((prev) => ({
      ...prev,
      weeklyGoals: [...prev.weeklyGoals, { id: `goal-${Date.now()}`, text, completed: false }],
    }));
  };

  const handleToggleScheduleTask = (scheduleId: string) => {
    setWeeklySchedule((prev) =>
      prev.map((s) => (s.id === scheduleId ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleToggleReviewCompleted = (reviewId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      reviewQueue: prev.reviewQueue.map((r) => (r.id === reviewId ? { ...r, completed: !r.completed } : r)),
    }));
  };

  const handleSaveSimuladoAttempt = (attempt: SimuladoAttempt) => {
    setUserProgress((prev) => ({
      ...prev,
      simuladoAttempts: [attempt, ...prev.simuladoAttempts],
    }));
  };

  // Teacher handlers
  const handleAddTurma = (newTurma: any) => {
    setTurmas((prev: any) => [newTurma, ...prev]);
  };

  const handleUpdateTurma = (updated: any) => {
    setTurmas((prev: any) => prev.map((t: any) => (t.id === updated.id ? updated : t)));
  };

  const handleDeleteTurma = (id: string) => {
    setTurmas((prev: any) => prev.filter((t: any) => t.id !== id));
  };

  const handleAddAnnouncement = (newAviso: any) => {
    setAnnouncements((prev: any) => [newAviso, ...prev]);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev: any) => prev.filter((a: any) => a.id !== id));
  };

  const handleAddLiveClass = (newLive: any) => {
    setLiveClasses((prev: any) => [newLive, ...prev]);
  };

  const handleDeleteLiveClass = (id: string) => {
    setLiveClasses((prev: any) => prev.filter((l: any) => l.id !== id));
  };

  const handleAddPublishedMaterial = (newMat: any) => {
    setPublishedMaterials((prev: any) => [newMat, ...prev]);
  };

  const handleToggleMaterialRelease = (id: string) => {
    setPublishedMaterials((prev: any) =>
      prev.map((m: any) => (m.id === id ? { ...m, isReleased: !m.isReleased } : m))
    );
  };

  const handleDeleteMaterial = (id: string) => {
    setPublishedMaterials((prev: any) => prev.filter((m: any) => m.id !== id));
  };

  const handleGradeSubmission = (id: string, grade: number, feedback: string) => {
    setSubmissions((prev: any) =>
      prev.map((s: any) => (s.id === id ? { ...s, grade, feedback, status: 'corrigido' } : s))
    );
  };

  // Admin handlers
  const handleSaveMindMap = (map: MindMap) => {
    setMindMaps((prev) => {
      const idx = prev.findIndex((m) => m.id === map.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = map;
        return copy;
      }
      return [map, ...prev];
    });
  };

  const handleDeleteMindMap = (id: string) => {
    setMindMaps((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddQuestion = (q: Question) => {
    setQuestions((prev) => [q, ...prev]);
  };

  const handleAddFlashcard = (f: Flashcard) => {
    setFlashcards((prev) => [f, ...prev]);
  };

  const handleAddNews = (n: NewsItem) => {
    setNews((prev) => [n, ...prev]);
  };

  const handleExportBackup = () => {
    const data = {
      mindMaps,
      questions,
      flashcards,
      simulados,
      news,
      weeklySchedule,
      userProgress,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tjam_estudos_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.mindMaps) setMindMaps(data.mindMaps);
      if (data.questions) setQuestions(data.questions);
      if (data.flashcards) setFlashcards(data.flashcards);
      if (data.simulados) setSimulados(data.simulados);
      if (data.news) setNews(data.news);
      if (data.weeklySchedule) setWeeklySchedule(data.weeklySchedule);
      if (data.userProgress) setUserProgress(data.userProgress);
      alert('Backup importado com sucesso!');
    } catch (e) {
      alert('Erro ao importar backup JSON.');
    }
  };

  const selectedDisciplineObj = disciplines.find((d) => d.id === selectedDisciplineId);

  // Locked Student Mode Notice - Hides entire site for students
  if (viewMode === 'student') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden font-sans select-none">
        {/* Ambient Background Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl w-full mx-auto text-center space-y-6 relative z-10 my-auto">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-bold tracking-wider uppercase shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            TJ-AM — Preparatório Concurso Oficial
          </div>

          {/* Main Status Icon */}
          <div className="relative mx-auto w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl group">
            <div className="absolute inset-0 bg-red-500/20 rounded-3xl blur-xl transition-all" />
            <Clock className="w-10 h-10 text-red-400 relative z-10 animate-bounce" />
          </div>

          {/* Main Notice Text requested by user */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight max-w-xl mx-auto">
              Aula de hoje encerrada, volte amanhã às 14h para a próxima aula.
            </h1>
            
            {/* Red Status Tag requested by user */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm shadow-lg">
              <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>A aula de hoje não foi concluída</span>
            </div>
          </div>

          {/* Ranking da Dupla de Estudos */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl text-left space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Ranking da Dupla de Estudos
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Dupla Ativa
              </span>
            </div>

            <div className="space-y-2">
              {/* 1° Lugar: Pedro Henrique */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    1º
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-white">Pedro Henrique</span>
                      <Medal className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Líder do ranking</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm font-black text-amber-400 min-w-[45px] text-right">25%</span>
                </div>
              </div>

              {/* 2° Lugar: Eduardo Mateus */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                    2º
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-white">Eduardo Mateus</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Seu perfil</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '3%' }}></div>
                  </div>
                  <span className="text-sm font-black text-emerald-400 min-w-[45px] text-right">3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase text-slate-400">Progresso</span>
              </div>
              <p className="text-lg font-black text-white">3%</p>
              <p className="text-[9px] text-slate-500">Progresso atual</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase text-slate-400">Sequência</span>
              </div>
              <p className="text-lg font-black text-white">1 dia</p>
              <p className="text-[9px] text-slate-500">Estudos seguidos</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase text-slate-400">Tempo Diário</span>
              </div>
              <p className="text-lg font-black text-white">2h 20m</p>
              <p className="text-[9px] text-slate-500">Tempo de estudo</p>
            </div>
          </div>

          {/* Discreet Access Link for Staff */}
          <div className="pt-2">
            <button
              onClick={() => {
                setAuthMode('admin_login');
                setIsAuthOpen(true);
              }}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline font-medium cursor-pointer"
            >
              Área Restrita (Servidores & Professores)
            </button>
          </div>
        </div>

        {/* Auth Modal for Staff Access */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          isDarkMode={true}
          initialMode={authMode}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        studentTab={studentTab}
        setStudentTab={(tab) => {
          setSelectedDisciplineId(null);
          setStudentTab(tab);
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenAIAssistant={() => handleOpenAIAssistant()}
        streakDays={userProgress.streakDays}
        onOpenAuthModal={() => {
          setAuthMode('login');
          setIsAuthOpen(true);
        }}
        currentUserEmail={currentUserEmail}
        isStaffAuthenticated={isStaffAuthenticated}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Workspace Body with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex items-start">
        {viewMode === 'student' && (
          <Sidebar
            currentTab={studentTab}
            onSelectTab={(tab) => {
              setSelectedDisciplineId(null);
              setStudentTab(tab);
            }}
            isDarkMode={isDarkMode}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0 p-4 sm:p-6 space-y-6">
          {viewMode !== 'student' && !isStaffAuthenticated ? (
            <RestrictedAccessView
              onBackToStudent={() => setViewMode('student')}
              onAuthenticateStaff={handleStaffPasscode}
              isDarkMode={isDarkMode}
            />
          ) : viewMode === 'admin' || viewMode === 'superadmin' ? (
            <AdminPanel
              isSuperAdmin={viewMode === 'superadmin'}
              disciplines={disciplines}
              mindMaps={mindMaps}
              questions={questions}
              flashcards={flashcards}
              simulados={simulados}
              news={news}
              onSaveMindMap={handleSaveMindMap}
              onDeleteMindMap={handleDeleteMindMap}
              onAddQuestion={handleAddQuestion}
              onAddFlashcard={handleAddFlashcard}
              onAddNews={handleAddNews}
              onExportBackup={handleExportBackup}
              onImportBackup={handleImportBackup}
              isDarkMode={isDarkMode}
            />
          ) : viewMode === 'teacher' ? (
            <TeacherPortal
              turmas={turmas}
              announcements={announcements}
              liveClasses={liveClasses}
              publishedMaterials={publishedMaterials}
              submissions={submissions}
              disciplines={disciplines}
              questions={questions}
              flashcards={flashcards}
              simulados={simulados}
              mindMaps={mindMaps}
              onAddTurma={handleAddTurma}
              onUpdateTurma={handleUpdateTurma}
              onDeleteTurma={handleDeleteTurma}
              onAddAnnouncement={handleAddAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
              onAddLiveClass={handleAddLiveClass}
              onDeleteLiveClass={handleDeleteLiveClass}
              onAddPublishedMaterial={handleAddPublishedMaterial}
              onToggleMaterialRelease={handleToggleMaterialRelease}
              onDeleteMaterial={handleDeleteMaterial}
              onGradeSubmission={handleGradeSubmission}
              onAddQuestion={handleAddQuestion}
              onAddFlashcard={handleAddFlashcard}
              isDarkMode={isDarkMode}
            />
          ) : (
            <>
              {studentTab === 'dashboard' && (
                <Dashboard
                  progress={userProgress}
                  onNavigateTab={setStudentTab}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'turma' && (
                <StudentPortal
                  progress={userProgress}
                  turmas={turmas}
                  announcements={announcements}
                  liveClasses={liveClasses}
                  publishedMaterials={publishedMaterials}
                  disciplines={disciplines}
                  onNavigateTab={setStudentTab}
                  onSelectDiscipline={handleSelectDiscipline}
                  isDarkMode={isDarkMode}
                />
              )}

              {(studentTab === 'disciplina-hoje' || studentTab === 'disciplines') && (
                <>
                  {selectedDisciplineObj ? (
                    <DisciplineView
                      discipline={selectedDisciplineObj}
                      questions={questions}
                      flashcards={flashcards}
                      mindMaps={mindMaps}
                      progress={userProgress}
                      onBack={() => setSelectedDisciplineId(null)}
                      onToggleTopicCompletion={handleToggleTopicCompletion}
                      onAnswerQuestion={handleAnswerQuestion}
                      onReviewFlashcard={handleReviewFlashcard}
                      onSavePersonalNote={handleSavePersonalNote}
                      onOpenAIAssistant={handleOpenAIAssistant}
                      onUpdateMindMap={handleSaveMindMap}
                      isDarkMode={isDarkMode}
                      initialSubTab={disciplineSubTab}
                    />
                  ) : (
                    <DisciplineList
                      disciplines={disciplines}
                      progress={userProgress}
                      onSelectDiscipline={handleSelectDiscipline}
                      isDarkMode={isDarkMode}
                    />
                  )}
                </>
              )}

              {(studentTab === 'aula-hoje' || studentTab === 'semana1') && (
                <AulaHojeView isDarkMode={isDarkMode} onNavigateTab={setStudentTab} />
              )}

              {studentTab === 'mapa-mental' && (
                <>
                  {selectedDisciplineObj ? (
                    <DisciplineView
                      discipline={selectedDisciplineObj}
                      questions={questions}
                      flashcards={flashcards}
                      mindMaps={mindMaps}
                      progress={userProgress}
                      onBack={() => setSelectedDisciplineId(null)}
                      onToggleTopicCompletion={handleToggleTopicCompletion}
                      onAnswerQuestion={handleAnswerQuestion}
                      onReviewFlashcard={handleReviewFlashcard}
                      onSavePersonalNote={handleSavePersonalNote}
                      onOpenAIAssistant={handleOpenAIAssistant}
                      onUpdateMindMap={handleSaveMindMap}
                      isDarkMode={isDarkMode}
                      initialSubTab="mapas"
                    />
                  ) : (
                    <DisciplineList
                      disciplines={disciplines}
                      progress={userProgress}
                      onSelectDiscipline={(discId) => {
                        handleSelectDiscipline(discId);
                        setDisciplineSubTab('mapas');
                      }}
                      isDarkMode={isDarkMode}
                    />
                  )}
                </>
              )}

              {studentTab === 'flashcards' && (
                <RevisionCenterView
                  progress={userProgress}
                  onToggleReviewCompleted={handleToggleReviewCompleted}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'questoes' && (
                <CadernoErrosView
                  questions={questions}
                  progress={userProgress}
                  onOpenAIAssistant={handleOpenAIAssistant}
                  isDarkMode={isDarkMode}
                />
              )}

              {(studentTab === 'progresso' || studentTab === 'perfil') && (
                <PerfilView progress={userProgress} isDarkMode={isDarkMode} />
              )}

              {/* Preserved underlying views for full capabilities */}
              {studentTab === 'schedule' && (
                <StudyScheduleView
                  schedule={weeklySchedule}
                  disciplines={disciplines}
                  onToggleScheduleTask={handleToggleScheduleTask}
                  onSelectDiscipline={handleSelectDiscipline}
                  onOpenAIAssistant={handleOpenAIAssistant}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'reviews' && (
                <RevisionCenterView
                  progress={userProgress}
                  onToggleReviewCompleted={handleToggleReviewCompleted}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'simulados' && (
                <SimuladosView
                  simulados={simulados}
                  progress={userProgress}
                  onSaveSimuladoAttempt={handleSaveSimuladoAttempt}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'caderno-erros' && (
                <CadernoErrosView
                  questions={questions}
                  progress={userProgress}
                  onOpenAIAssistant={handleOpenAIAssistant}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'news' && <NewsView news={news} isDarkMode={isDarkMode} />}
            </>
          )}
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        disciplines={disciplines}
        initialPrompt={aiPrompt}
        onGeneratedMindMap={(newMap) => {
          handleSaveMindMap(newMap);
          setSelectedDisciplineId(newMap.disciplineId);
          setDisciplineSubTab('mapas');
          setStudentTab('disciplines');
        }}
        isDarkMode={isDarkMode}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        isDarkMode={isDarkMode}
        initialMode={authMode}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© 2026 TJAM Estudos - Preparatório Oficial para Assistente Judiciário.</p>
        <div className="mt-2 flex items-center justify-center gap-4 text-[11px]">
          <span>Desenvolvido com IA Gemini, React & Tailwind CSS.</span>
          <span>•</span>
          <button
            onClick={() => {
              setAuthMode('admin_login');
              setIsAuthOpen(true);
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-semibold underline"
          >
            Acesso Interno (Servidores & Professores)
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
