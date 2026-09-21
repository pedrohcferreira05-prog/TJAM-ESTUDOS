import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Lock, XCircle, Trophy, Medal, Award, Flame, RefreshCw, Timer, AlertTriangle } from 'lucide-react';
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
  TeacherTab,
  SimuladoAttempt,
  AuthSession,
  VideoLesson,
  Topic,
  StudentSubmission,
  TodayLessonConfig,
} from './types';
import {
  TJAM_DISCIPLINES,
  SAMPLE_QUESTIONS,
  INITIAL_FLASHCARDS,
  INITIAL_SIMULADOS,
  INITIAL_NEWS,
  INITIAL_WEEKLY_SCHEDULE,
  INITIAL_WEEKLY_GOALS,
  INITIAL_MINDMAPS_TJAM,
} from './data/tjamData';
import { INITIAL_VIDEO_LESSONS } from './data/videoLessonsData';
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
import { QuestoesView } from './components/QuestoesView';
import { NewsView } from './components/NewsView';
import { AdminPanel } from './components/AdminPanel';
import { TeacherPortal } from './components/TeacherPortal';
import { StudentPortal } from './components/StudentPortal';
import { AuthModal } from './components/AuthModal';
import { RestrictedAccessView } from './components/RestrictedAccessView';
import { StudentLoginGateView } from './components/StudentLoginGateView';
import { MateriasPortalView } from './components/MateriasPortalView';
import { StudentAccountService } from './lib/studentAccountService';
import {
  saveUserProgressToFirestore,
  loadUserProgressFromFirestore,
  subscribeToUserProgress,
  saveLessonProgressToFirestore,
  loadLessonProgressFromFirestore,
  subscribeToLessonProgress,
  subscribeToSystemControls,
  updateSystemControls,
  subscribeToTurmas,
  subscribeToAnnouncements,
  subscribeToLiveClasses,
  subscribeToPublishedMaterials,
  subscribeToStudentSubmissions,
  saveStudentSubmissionToFirestore,
  gradeStudentSubmissionInFirestore,
  updateUserPresence,
  resetAllStudentProgressAndContentsInFirestore,
  saveSharedWeeklyGoalsToFirestore,
  subscribeToSharedWeeklyGoals,
  saveWeeklyScheduleToFirestore,
  subscribeToWeeklySchedule,
  saveTodayLessonsConfigToFirestore,
  subscribeToTodayLessonsConfig,
} from './lib/firestoreService';
import { getTodayLessonsConfig, saveTodayLessonsConfig } from './lib/attendanceService';
import { SiteLockedView } from './components/SiteLockedView';
import { RankingsOnlyView } from './components/RankingsOnlyView';
import { Week1View } from './components/Week1View';
import { saveWeek1ContentToFirestore } from './lib/firestoreService';

function sanitizeUserProgressData(data: any): UserProgress {
  if (!data || typeof data !== 'object') return data;
  const sanitized = { ...data };
  if (Array.isArray(sanitized.simuladoAttempts)) {
    const seen = new Set<string>();
    sanitized.simuladoAttempts = sanitized.simuladoAttempts.filter((a: any) => {
      if (!a || !a.id || seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  }
  return sanitized as UserProgress;
}

export function App() {
  // Permanent Light Mode - dark mode completely removed as requested
  const [isDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('tjam_theme', 'light');
  }, []);

  // Site lock state & real-time message synced to Firestore
  const [isSiteLocked, setIsSiteLocked] = useState<boolean>(false);
  const [siteLockMessage, setSiteLockMessage] = useState<string>(
    'PORTAL TEMPORARIAMENTE BLOQUEADO: O acesso à plataforma foi temporariamente suspenso pelo professor. Aguarde novas orientações.'
  );

  // Auth & View Mode state
  const [currentUserSession, setCurrentUserSession] = useState<AuthSession | null>(() => {
    return StudentAccountService.getSession();
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const session = StudentAccountService.getSession();
    return session?.role === 'teacher' ? 'teacher' : 'student';
  });
  const [studentTab, setStudentTab] = useState<StudentTab>('aula-hoje');
  const [teacherTab, setTeacherTab] = useState<TeacherTab>('alunos');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authInitialRole, setAuthInitialRole] = useState<'student' | 'teacher'>('student');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState<boolean>(() => {
    const session = StudentAccountService.getSession();
    return session?.role === 'teacher' || localStorage.getItem('tjam_staff_auth') === 'true';
  });

  const handleSetViewMode = (mode: ViewMode) => {
    if (currentUserSession?.role === 'student' && (mode === 'teacher' || mode === 'admin' || mode === 'superadmin')) {
      alert('Acesso Restrito: Sua conta de aluno não possui permissão para acessar o Portal do Docente.');
      return;
    }
    setViewMode(mode);
  };

  // Safety barrier: ensure student account cannot remain in teacher viewMode
  useEffect(() => {
    if (currentUserSession?.role === 'student' && (viewMode === 'teacher' || viewMode === 'admin' || viewMode === 'superadmin')) {
      setViewMode('student');
    }
  }, [currentUserSession, viewMode]);

  const handleLoginSuccess = (session: AuthSession) => {
    setCurrentUserSession(session);
    if (session.role === 'teacher') {
      setIsStaffAuthenticated(true);
      localStorage.setItem('tjam_staff_auth', 'true');
      setViewMode('teacher');
      setTeacherTab('alunos');
    } else {
      setViewMode('student');
    }
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    StudentAccountService.clearSession();
    setCurrentUserSession(null);
    setIsStaffAuthenticated(false);
    setViewMode('student');
  };

  // Selected Discipline state
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);
  const [disciplineSubTab, setDisciplineSubTab] = useState<string>('aulas');

  // Modo dupla oficial: Eduardo Mateus e Pedro Henrique
  const isDuo = true;

  // Core App State persisted in localStorage
  const [disciplines, setDisciplines] = useState<Discipline[]>(() => {
    const saved = localStorage.getItem('tjam_disciplines');
    return saved ? JSON.parse(saved) : TJAM_DISCIPLINES;
  });

  const [videoLessons, setVideoLessons] = useState<VideoLesson[]>(() => {
    const saved = localStorage.getItem('tjam_video_lessons');
    return saved ? JSON.parse(saved) : INITIAL_VIDEO_LESSONS;
  });

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

  const [todayLessons, setTodayLessons] = useState<TodayLessonConfig[]>(() => {
    return getTodayLessonsConfig();
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

  useEffect(() => {
    localStorage.setItem('tjam_disciplines', JSON.stringify(disciplines));
  }, [disciplines]);

  useEffect(() => {
    localStorage.setItem('tjam_video_lessons', JSON.stringify(videoLessons));
  }, [videoLessons]);

  useEffect(() => {
    localStorage.setItem('tjam_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('tjam_simulados', JSON.stringify(simulados));
  }, [simulados]);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('tjam_user_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sanitize legacy fake hardcoded initial defaults if present
        if (parsed.totalHoursStudied === 48.5) parsed.totalHoursStudied = 0;
        if (parsed.hoursStudiedToday === 2.5) parsed.hoursStudiedToday = 0;
        if (parsed.streakDays === 12) parsed.streakDays = 0;
        if (parsed.completedTopicIds && parsed.completedTopicIds.includes('port-[2]')) {
          parsed.completedTopicIds = [];
        }
        if (parsed.reviewQueue && parsed.reviewQueue.some((r: any) => r.id === 'rev-1')) {
          parsed.reviewQueue = [];
        }
        if (!parsed.weeklyGoals || parsed.weeklyGoals.length === 0 || parsed.weeklyGoals.some((g: any) => g.id === 'g1')) {
          parsed.weeklyGoals = INITIAL_WEEKLY_GOALS;
        }
        if (Array.isArray(parsed.simuladoAttempts)) {
          const seenAttempts = new Set<string>();
          parsed.simuladoAttempts = parsed.simuladoAttempts.filter((a: any) => {
            if (!a || !a.id || seenAttempts.has(a.id)) return false;
            seenAttempts.add(a.id);
            return true;
          });
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing user progress:', e);
      }
    }
    return {
      dailyGoalHours: 4,
      hoursStudiedToday: 0,
      totalHoursStudied: 0,
      streakDays: 0,
      lastStudiedDate: new Date().toISOString(),
      targetExamDate: '2026-11-15',
      completedTopicIds: [],
      studiedMapIds: [],
      favoriteMapIds: [],
      favoriteFlashcardIds: [],
      errorQuestionIds: [],
      questionAttempts: [],
      flashcardReviews: {},
      personalNotes: {},
      nodeNotes: {},
      simuladoAttempts: [],
      reviewQueue: [],
      weeklyGoals: INITIAL_WEEKLY_GOALS,
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

  // Automated Launch & Cloud Synchronization Engine
  // Synchronizes student progress, lesson state and rankings with Firestore
  useEffect(() => {
    async function initSiteLaunchSync() {
      try {
        // Se a solicitação de zerar conteúdos ainda não foi aplicada neste browser, zera agora
        if (localStorage.getItem('tjam_contents_reboot_2026_v5') !== 'true') {
          await handleResetAllStudentContents(true);
          localStorage.setItem('tjam_contents_reboot_2026_v5', 'true');
          localStorage.setItem('tjam_selected_subject', 'legislacao_tjam');
        } else {
          // 1. Fetch remote progress from Firestore or fallback to local
          const effectiveId = (currentUserSession?.role === 'student' ? currentUserSession.id : null) || 'id00120087';
          const remoteLessons = await loadLessonProgressFromFirestore(effectiveId);
          if (remoteLessons) {
            localStorage.setItem(`tjam_lessons_progress_${effectiveId}`, JSON.stringify(remoteLessons));
            if (effectiveId === 'id00120087') {
              localStorage.setItem('tjam_lessons_progress', JSON.stringify(remoteLessons));
            }
            setSavedLessons(remoteLessons);
          }

          // 2. Sync student user progress with Firestore
          const remoteUserProgress = await loadUserProgressFromFirestore(effectiveId);
          if (remoteUserProgress) {
            setUserProgress(prev => sanitizeUserProgressData({
              ...prev,
              ...remoteUserProgress,
            }));
          } else {
            await saveUserProgressToFirestore(userProgress, effectiveId);
          }
        }

        // 3. Ensure student accounts (Eduardo Mateus, etc.) are synced
        await StudentAccountService.loadAllAccounts();
        await StudentAccountService.syncAccountsWithFirestore();
      } catch (err) {
        console.warn('Auto-sync on site launch fallback to local state:', err);
      }
    }

    initSiteLaunchSync();
  }, []);

  // 1. Real-time System Controls & Master Gate listener (Lock/Unlock in Firestore)
  useEffect(() => {
    const unsubscribe = subscribeToSystemControls((controls) => {
      setIsSiteLocked(Boolean(controls.isSiteLocked));
      if (controls.lockMessage) {
        setSiteLockMessage(controls.lockMessage);
      }
    });

    return () => unsubscribe();
  }, []);

  // Teacher Master Gate Lock / Unlock Handler
  const handleToggleSiteLock = async (locked: boolean, message?: string) => {
    setIsSiteLocked(locked);
    const effectiveMsg = message || siteLockMessage;
    if (message) setSiteLockMessage(message);
    try {
      await updateSystemControls({
        isSiteLocked: locked,
        lockMessage: effectiveMsg,
      });
    } catch (err) {
      console.warn('Failed to update system controls in Firestore:', err);
    }
  };

  // 2. Real-time Listeners for Teacher & Student collections
  useEffect(() => {
    const unsubTurmas = subscribeToTurmas(INITIAL_TURMAS, (data) => setTurmas(data));
    const unsubAnnouncements = subscribeToAnnouncements(INITIAL_ANNOUNCEMENTS, (data) => setAnnouncements(data));
    const unsubLive = subscribeToLiveClasses(INITIAL_LIVE_CLASSES, (data) => setLiveClasses(data));
    const unsubMaterials = subscribeToPublishedMaterials(INITIAL_PUBLISHED_MATERIALS, (data) => setPublishedMaterials(data));
    const unsubSubmissions = subscribeToStudentSubmissions(INITIAL_SUBMISSIONS, (data) => setSubmissions(data));

    return () => {
      unsubTurmas();
      unsubAnnouncements();
      unsubLive();
      unsubMaterials();
      unsubSubmissions();
    };
  }, []);

  useEffect(() => {
    const effectiveId = (currentUserSession?.role === 'student' ? currentUserSession.id : null) || 'id00120087';
    localStorage.setItem(`tjam_user_progress_${effectiveId}`, JSON.stringify(userProgress));
    if (effectiveId === 'id00120087') {
      localStorage.setItem('tjam_user_progress', JSON.stringify(userProgress));
    }
    saveUserProgressToFirestore(userProgress, effectiveId);
  }, [userProgress, currentUserSession?.id]);

  // Dynamic user switch listener to load isolated student progress
  useEffect(() => {
    if (!currentUserSession || currentUserSession.role !== 'student') return;
    const studentId = currentUserSession.id;

    // Load local cache if present
    const cachedLocal = localStorage.getItem(`tjam_user_progress_${studentId}`);
    if (cachedLocal) {
      try {
        setUserProgress(sanitizeUserProgressData(JSON.parse(cachedLocal)));
      } catch {}
    }

    loadUserProgressFromFirestore(studentId).then((remoteProg) => {
      if (remoteProg) {
        setUserProgress(prev => sanitizeUserProgressData({
          ...prev,
          ...remoteProg,
        }));
      }
    });

    loadLessonProgressFromFirestore(studentId).then((remoteLessons) => {
      if (remoteLessons) {
        setSavedLessons(remoteLessons);
      }
    });

    const unsubProg = subscribeToUserProgress((remote) => {
      if (remote) {
        setUserProgress(prev => sanitizeUserProgressData({
          ...prev,
          ...remote,
        }));
      }
    }, studentId);

    const unsubLessons = subscribeToLessonProgress((remoteStore) => {
      if (remoteStore) {
        setSavedLessons(remoteStore);
      }
    }, studentId);

    const unsubSharedGoals = subscribeToSharedWeeklyGoals(INITIAL_WEEKLY_GOALS, (sharedGoals) => {
      if (sharedGoals && sharedGoals.length > 0) {
        setUserProgress((prev) => ({
          ...prev,
          weeklyGoals: sharedGoals,
        }));
      }
    });

    const unsubSharedSchedule = subscribeToWeeklySchedule(INITIAL_WEEKLY_SCHEDULE, (sharedSchedule) => {
      if (sharedSchedule && sharedSchedule.length > 0) {
        setWeeklySchedule(sharedSchedule);
      }
    });

    const unsubTodayLessons = subscribeToTodayLessonsConfig((remoteLessons) => {
      if (remoteLessons && remoteLessons.length > 0) {
        setTodayLessons(remoteLessons);
        saveTodayLessonsConfig(remoteLessons);
      }
    });

    return () => {
      unsubProg();
      unsubLessons();
      unsubSharedGoals();
      unsubSharedSchedule();
      unsubTodayLessons();
    };
  }, [currentUserSession?.id]);

  // Saved Lessons State for instantaneous synchronization between Student Portal and Teacher Portal
  const [savedLessons, setSavedLessons] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('tjam_lessons_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Real-time automatic update engine (syncs without reloading page)
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => new Date().toLocaleTimeString('pt-BR'));

  useEffect(() => {
    // 1. Cross-tab storage listener
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tjam_user_progress' && e.newValue) {
        try {
          const parsed = sanitizeUserProgressData(JSON.parse(e.newValue));
          setUserProgress(parsed);
        } catch {}
      }
      if (e.key === 'tjam_lessons_progress' && e.newValue) {
        try {
          setSavedLessons(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'tjam_submissions' && e.newValue) {
        try {
          setSubmissions(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'tjam_announcements' && e.newValue) {
        try { setAnnouncements(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'tjam_live_classes' && e.newValue) {
        try { setLiveClasses(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'tjam_today_lessons_config' && e.newValue) {
        try { setTodayLessons(JSON.parse(e.newValue)); } catch {}
      }
      setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
    };

    const handleTodayLessonsLocalEvent = () => {
      setTodayLessons(getTodayLessonsConfig());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('tjam_today_lessons_updated', handleTodayLessonsLocalEvent);

    // 2. Periodic background ticker (every 1 second) for live state evaluation without page reloads
    const syncInterval = setInterval(() => {
      setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
      const savedProgress = localStorage.getItem('tjam_user_progress');
      if (savedProgress) {
        try {
          const parsed = sanitizeUserProgressData(JSON.parse(savedProgress));
          if (JSON.stringify(parsed) !== JSON.stringify(userProgress)) {
            setUserProgress(parsed);
          }
        } catch {}
      }
      const savedLessonsRaw = localStorage.getItem('tjam_lessons_progress');
      if (savedLessonsRaw) {
        try {
          const parsedLessons = JSON.parse(savedLessonsRaw);
          setSavedLessons(parsedLessons);
        } catch {}
      }
      const savedSubsRaw = localStorage.getItem('tjam_submissions');
      if (savedSubsRaw) {
        try {
          const parsedSubs = JSON.parse(savedSubsRaw);
          setSubmissions(parsedSubs);
        } catch {}
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tjam_today_lessons_updated', handleTodayLessonsLocalEvent);
      clearInterval(syncInterval);
    };
  }, [userProgress]);

  // Countdown Timer for Next Class (Tomorrow at 14:00)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setDate(target.getDate() + 1);
      target.setHours(14, 0, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleToggleLessonCompleted = (lessonKey: string, completed: boolean) => {
    setUserProgress((prev) => {
      const exists = (prev.completedTopicIds || []).includes(lessonKey);
      let newTopics = [...(prev.completedTopicIds || [])];
      if (completed && !exists) {
        newTopics.push(lessonKey);
      } else if (!completed && exists) {
        newTopics = newTopics.filter((id) => id !== lessonKey);
      }

      const prevLessons = prev.savedLessons || {};
      const targetLesson = prevLessons[lessonKey] || {};
      const newSavedLessons = {
        ...prevLessons,
        [lessonKey]: {
          ...targetLesson,
          completed,
          started: completed ? true : targetLesson.started,
        },
      };

      return {
        ...prev,
        completedTopicIds: newTopics,
        savedLessons: newSavedLessons,
      };
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
    setUserProgress((prev) => {
      const updatedGoals = prev.weeklyGoals.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g));
      saveSharedWeeklyGoalsToFirestore(updatedGoals).catch(() => {});
      return {
        ...prev,
        weeklyGoals: updatedGoals,
      };
    });
  };

  const handleAddWeeklyGoal = (text: string) => {
    setUserProgress((prev) => {
      const updatedGoals = [...prev.weeklyGoals, { id: `goal-${Date.now()}`, text, completed: false }];
      saveSharedWeeklyGoalsToFirestore(updatedGoals).catch(() => {});
      return {
        ...prev,
        weeklyGoals: updatedGoals,
      };
    });
  };

  const handleToggleScheduleTask = (scheduleId: string) => {
    setWeeklySchedule((prev) => {
      const updated = prev.map((s) => (s.id === scheduleId ? { ...s, completed: !s.completed } : s));
      saveWeeklyScheduleToFirestore(updated).catch(() => {});
      return updated;
    });
  };

  const handleToggleReviewCompleted = (reviewId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      reviewQueue: prev.reviewQueue.map((r) => (r.id === reviewId ? { ...r, completed: !r.completed } : r)),
    }));
  };

  const handleSaveSimuladoAttempt = (attempt: SimuladoAttempt) => {
    setUserProgress((prev) => {
      const existing = prev.simuladoAttempts || [];
      const filtered = existing.filter((a) => a.id !== attempt.id);
      return {
        ...prev,
        simuladoAttempts: [attempt, ...filtered],
      };
    });
  };

  const handleResetAllStudentContents = async (isSilent = false) => {
    const cleanProgress: UserProgress = {
      dailyGoalHours: 4,
      hoursStudiedToday: 0,
      totalHoursStudied: 0,
      streakDays: 0,
      lastStudiedDate: new Date().toISOString(),
      targetExamDate: '2026-11-15',
      completedTopicIds: [],
      studiedMapIds: [],
      favoriteMapIds: [],
      favoriteFlashcardIds: [],
      errorQuestionIds: [],
      questionAttempts: [],
      flashcardReviews: {},
      personalNotes: {},
      nodeNotes: {},
      reviewQueue: [],
      weeklyGoals: [],
      savedLessons: {},
      simuladoAttempts: [],
    };

    // 1. Reset React local states
    setUserProgress(cleanProgress);
    setSubmissions([]);

    // 2. Clear all local storage caches related to student contents and progress
    try {
      localStorage.setItem('tjam_user_progress', JSON.stringify(cleanProgress));
      localStorage.setItem('tjam_lessons_progress', JSON.stringify({}));
      localStorage.setItem('tjam_all_lessons_progress', JSON.stringify({}));
      localStorage.setItem('tjam_submissions', JSON.stringify([]));
      localStorage.removeItem('tjam_week1_lessons');
      localStorage.removeItem('tjam_simulado_80q_live_answers');
      localStorage.removeItem('tjam_simulado_80q_final_attempt');
      localStorage.removeItem('tjam_simulado_80q_is_locked');
      localStorage.removeItem('tjam_escrita_aula1_casa');
      localStorage.removeItem('tjam_escrita_aula1_ex7');
      localStorage.removeItem('tjam_escrita_video_submitted');
      localStorage.removeItem('tjam_checklist_direito_admin_controle');
      localStorage.removeItem('tjam_checklist_direito_const_nacionalidade');
      localStorage.removeItem('tjam_checklist_informatica_redes');
      localStorage.removeItem('tjam_video_desafio_admin_controle');
      localStorage.removeItem('tjam_video_desafio_const_nacionalidade');
      localStorage.setItem('tjam_contents_reboot_2026_v5', 'true');
      localStorage.setItem('tjam_selected_subject', 'legislacao_tjam');
    } catch (e) {
      console.warn('Erro ao limpar localStorage:', e);
    }

    // 3. Dispatch storage event for active components
    window.dispatchEvent(new Event('storage'));

    // 4. Remote Firestore reset
    try {
      await resetAllStudentProgressAndContentsInFirestore();
    } catch (err) {
      console.warn('Erro ao resetar no Firestore:', err);
    }

    if (!isSilent) {
      alert('✅ Todos os conteúdos e o progresso dos alunos foram zerados com sucesso! O curso foi reiniciado para os alunos.');
    }
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
    gradeStudentSubmissionInFirestore(id, grade, feedback).catch(console.error);
  };

  const handleAddSubmission = (sub: Omit<StudentSubmission, 'id' | 'submittedAt'>) => {
    const newSub: StudentSubmission = {
      ...sub,
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setSubmissions((prev: any) => [newSub, ...prev]);
    saveStudentSubmissionToFirestore(newSub).catch(console.error);
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

  const handleUpdateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddSimulado = (sim: Simulado) => {
    setSimulados((prev) => [sim, ...prev]);
  };

  const handleDeleteSimulado = (id: string) => {
    setSimulados((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddTopic = (disciplineId: string, topicName: string) => {
    setDisciplines((prev) =>
      prev.map((d) => {
        if (d.id === disciplineId) {
          const newTopic: Topic = {
            id: `topic-${Date.now()}`,
            name: topicName,
            completed: false,
          };
          return { ...d, topics: [...d.topics, newTopic] };
        }
        return d;
      })
    );
  };

  const handleUpdateTopic = (disciplineId: string, topicId: string, newName: string) => {
    setDisciplines((prev) =>
      prev.map((d) => {
        if (d.id === disciplineId) {
          return {
            ...d,
            topics: d.topics.map((t) => (t.id === topicId ? { ...t, name: newName } : t)),
          };
        }
        return d;
      })
    );
  };

  const handleDeleteTopic = (disciplineId: string, topicId: string) => {
    setDisciplines((prev) =>
      prev.map((d) => {
        if (d.id === disciplineId) {
          return {
            ...d,
            topics: d.topics.filter((t) => t.id !== topicId),
          };
        }
        return d;
      })
    );
  };

  const handleAddVideoLesson = (v: VideoLesson) => {
    setVideoLessons((prev) => [v, ...prev]);
  };

  const handleUpdateVideoLesson = (id: string, updates: Partial<VideoLesson>) => {
    setVideoLessons((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const handleDeleteVideoLesson = (id: string) => {
    setVideoLessons((prev) => prev.filter((v) => v.id !== id));
  };

  const handleResetQuestionAttempt = (questionId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      questionAttempts: prev.questionAttempts.filter((a) => a.questionId !== questionId),
      errorQuestionIds: (prev.errorQuestionIds || []).filter((id) => id !== questionId),
    }));
  };

  const handleResetSimuladoAttempt = (simuladoId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      simuladoAttempts: prev.simuladoAttempts.filter((a) => a.simuladoId !== simuladoId),
    }));
  };

  const handleAddFlashcard = (f: Flashcard) => {
    setFlashcards((prev) => [f, ...prev]);
  };

  const handleUpdateFlashcard = (id: string, updates: Partial<Flashcard>) => {
    setFlashcards((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const handleDeleteFlashcard = (id: string) => {
    setFlashcards((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpdateSimulado = (id: string, updates: Partial<Simulado>) => {
    setSimulados((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleAddDiscipline = (disc: Discipline) => {
    setDisciplines((prev) => [disc, ...prev]);
  };

  const handleUpdateDiscipline = (id: string, updates: Partial<Discipline>) => {
    setDisciplines((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const handleDeleteDiscipline = (id: string) => {
    setDisciplines((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateWeeklyGoal = (id: string, text: string) => {
    setUserProgress((prev) => {
      const updatedGoals = (prev.weeklyGoals || []).map((g) => (g.id === id ? { ...g, text } : g));
      saveSharedWeeklyGoalsToFirestore(updatedGoals).catch(() => {});
      return {
        ...prev,
        weeklyGoals: updatedGoals,
      };
    });
  };

  const handleDeleteWeeklyGoal = (id: string) => {
    setUserProgress((prev) => {
      const updatedGoals = (prev.weeklyGoals || []).filter((g) => g.id !== id);
      saveSharedWeeklyGoalsToFirestore(updatedGoals).catch(() => {});
      return {
        ...prev,
        weeklyGoals: updatedGoals,
      };
    });
  };

  const handleAddTaskToDay = (dayOfWeek: string, taskText: string, disciplineId?: string) => {
    setWeeklySchedule((prev) => {
      const updated = prev.map((item) => {
        if (item.dayOfWeek.toLowerCase() === dayOfWeek.toLowerCase() || item.id === dayOfWeek) {
          return {
            ...item,
            tasks: [...item.tasks, taskText],
            disciplineId: disciplineId || item.disciplineId,
          };
        }
        return item;
      });
      saveWeeklyScheduleToFirestore(updated).catch(() => {});
      return updated;
    });
  };

  const handleUpdateDayTask = (scheduleId: string, taskIndex: number, newText: string) => {
    setWeeklySchedule((prev) => {
      const updated = prev.map((item) => {
        if (item.id === scheduleId) {
          const newTasks = [...item.tasks];
          newTasks[taskIndex] = newText;
          return { ...item, tasks: newTasks };
        }
        return item;
      });
      saveWeeklyScheduleToFirestore(updated).catch(() => {});
      return updated;
    });
  };

  const handleDeleteDayTask = (scheduleId: string, taskIndex: number) => {
    setWeeklySchedule((prev) => {
      const updated = prev.map((item) => {
        if (item.id === scheduleId) {
          return {
            ...item,
            tasks: item.tasks.filter((_, idx) => idx !== taskIndex),
          };
        }
        return item;
      });
      saveWeeklyScheduleToFirestore(updated).catch(() => {});
      return updated;
    });
  };

  const handleUpdateTodayLessons = async (newLessons: TodayLessonConfig[]) => {
    setTodayLessons(newLessons);
    saveTodayLessonsConfig(newLessons);
    try {
      await saveTodayLessonsConfigToFirestore(newLessons);
    } catch (e) {
      console.warn('Erro ao salvar aulas de hoje no Firestore:', e);
    }
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
      if (data.userProgress) setUserProgress(sanitizeUserProgressData(data.userProgress));
      alert('Backup importado com sucesso!');
    } catch (e) {
      alert('Erro ao importar backup JSON.');
    }
  };

  const selectedDisciplineObj = disciplines.find((d) => d.id === selectedDisciplineId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation Header */}
      <Header
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        currentUserSession={currentUserSession}
        onOpenAuthModal={() => {
          setAuthInitialRole('student');
          setIsAuthOpen(true);
        }}
        onLogout={handleLogout}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isDarkMode={isDarkMode}
      />

      {/* Main Content Area */}
      {!currentUserSession ? (
        <StudentLoginGateView onLoginSuccess={handleLoginSuccess} />
      ) : viewMode === 'student' && isSiteLocked ? (
        <SiteLockedView
          isDarkMode={isDarkMode}
          simulados={simulados}
          progress={userProgress}
          onSaveSimuladoAttempt={handleSaveSimuladoAttempt}
          onUnlockSite={() => handleToggleSiteLock(false)}
          lockMessage={siteLockMessage}
        />
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto flex items-start">
          <Sidebar
            viewMode={viewMode}
            setViewMode={handleSetViewMode}
            currentUserSession={currentUserSession}
            currentStudentTab={studentTab}
            onSelectStudentTab={(tab) => {
              setSelectedDisciplineId(null);
              setStudentTab(tab);
            }}
            currentTeacherTab={teacherTab}
            onSelectTeacherTab={(tab) => {
              setTeacherTab(tab);
            }}
            isDarkMode={isDarkMode}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
            onLogout={handleLogout}
            isDuo={isDuo}
          />

          <main className="flex-1 min-w-0 p-3 sm:p-6 space-y-6 overflow-x-hidden max-w-full">
            {viewMode === 'simulado' ? (
              <SimuladosView
                simulados={simulados}
                progress={userProgress}
                onSaveSimuladoAttempt={handleSaveSimuladoAttempt}
                isDarkMode={isDarkMode}
              />
            ) : viewMode !== 'student' && !isStaffAuthenticated ? (
              <RestrictedAccessView
                onBackToStudent={() => setViewMode('student')}
                onAuthenticateTeacherSuccess={handleLoginSuccess}
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
                activeTab={teacherTab}
                onSelectTab={setTeacherTab}
                onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
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
                onUpdateQuestion={handleUpdateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                onAddFlashcard={handleAddFlashcard}
                onUpdateFlashcard={handleUpdateFlashcard}
                onDeleteFlashcard={handleDeleteFlashcard}
                onAddSimulado={handleAddSimulado}
                onUpdateSimulado={handleUpdateSimulado}
                onDeleteSimulado={handleDeleteSimulado}
                onSaveMindMap={handleSaveMindMap}
                onDeleteMindMap={handleDeleteMindMap}
                onAddDiscipline={handleAddDiscipline}
                onUpdateDiscipline={handleUpdateDiscipline}
                onDeleteDiscipline={handleDeleteDiscipline}
                videoLessons={videoLessons}
                onAddVideoLesson={handleAddVideoLesson}
                onUpdateVideoLesson={handleUpdateVideoLesson}
                onDeleteVideoLesson={handleDeleteVideoLesson}
                onAddTopic={handleAddTopic}
                onUpdateTopic={handleUpdateTopic}
                onDeleteTopic={handleDeleteTopic}
                weeklySchedule={weeklySchedule}
                weeklyGoals={userProgress.weeklyGoals || []}
                todayLessons={todayLessons}
                onUpdateTodayLessons={handleUpdateTodayLessons}
                errorQuestionIds={userProgress.errorQuestionIds || []}
                onAddGoal={handleAddWeeklyGoal}
                onUpdateGoal={handleUpdateWeeklyGoal}
                onDeleteGoal={handleDeleteWeeklyGoal}
                onToggleGoal={handleToggleWeeklyGoal}
                onAddTaskToDay={handleAddTaskToDay}
                onUpdateDayTask={handleUpdateDayTask}
                onDeleteDayTask={handleDeleteDayTask}
                questionAttempts={userProgress.questionAttempts || []}
                simuladoAttempts={userProgress.simuladoAttempts || []}
                students={StudentAccountService.getLocalAccounts()}
                completedTopicIds={userProgress.completedTopicIds || []}
                savedLessons={savedLessons}
                onToggleLessonCompleted={handleToggleLessonCompleted}
                onResetQuestionAttempt={handleResetQuestionAttempt}
                onResetSimuladoAttempt={handleResetSimuladoAttempt}
                onResetAllStudentContents={handleResetAllStudentContents}
                isDarkMode={isDarkMode}
                isSiteLocked={isSiteLocked}
                onToggleSiteLock={handleToggleSiteLock}
              />
            ) : (
              <>
                {studentTab === 'dashboard' && (
                  <Dashboard
                    progress={userProgress}
                    onNavigateTab={setStudentTab}
                    isDarkMode={isDarkMode}
                    isDuo={isDuo}
                    onToggleGoal={handleToggleWeeklyGoal}
                    todayLessons={todayLessons}
                  />
                )}

                {studentTab === 'materias' && (
                  <MateriasPortalView
                    progress={userProgress}
                    onNavigateTab={setStudentTab}
                    isDarkMode={isDarkMode}
                    submissions={submissions}
                    onSubmitTask={handleAddSubmission}
                    onAnswerQuestion={handleAnswerQuestion}
                    studentName={userProgress.userName || 'Eduardo Mateus'}
                    turmaId="TJAM-2026-REGULAR"
                    currentUserSession={currentUserSession}
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
                <AulaHojeView
                  isDarkMode={isDarkMode}
                  onNavigateTab={setStudentTab}
                  videoLessons={videoLessons}
                  publishedMaterials={publishedMaterials}
                  disciplines={disciplines}
                  currentUserSession={currentUserSession}
                  todayLessons={todayLessons}
                />
              )}

              {studentTab === 'flashcards' && (
                <RevisionCenterView
                  progress={userProgress}
                  onToggleReviewCompleted={handleToggleReviewCompleted}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'questoes' && (
                <QuestoesView
                  questions={questions}
                  progress={userProgress}
                  onAnswerQuestion={handleAnswerQuestion}
                  onNavigateTab={setStudentTab}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'caderno-erros' && (
                <CadernoErrosView
                  questions={questions}
                  progress={userProgress}
                  isDarkMode={isDarkMode}
                />
              )}

              {(studentTab === 'progresso' || studentTab === 'perfil') && (
                <PerfilView
                  progress={userProgress}
                  isDarkMode={isDarkMode}
                  isDuo={isDuo}
                />
              )}

              {/* Preserved underlying views for full capabilities */}
              {studentTab === 'schedule' && (
                <StudyScheduleView
                  schedule={weeklySchedule}
                  disciplines={disciplines}
                  onToggleScheduleTask={handleToggleScheduleTask}
                  onSelectDiscipline={handleSelectDiscipline}
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
                <RankingsOnlyView />
              )}

              {studentTab === 'caderno-erros' && (
                <CadernoErrosView
                  questions={questions}
                  progress={userProgress}
                  isDarkMode={isDarkMode}
                />
              )}

              {studentTab === 'news' && <NewsView news={news} isDarkMode={isDarkMode} />}
            </>
          )}
        </main>
      </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        isDarkMode={isDarkMode}
        initialRole={authInitialRole}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p className="font-medium text-slate-600">© 2026 TJAM Estudos - Preparatório Oficial para Assistente Judiciário.</p>
        <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span>Plataforma Oficial de Estudos • Tribunal de Justiça do Amazonas (TJAM)</span>
          <span>•</span>
          <span>Ambiente Seguro • Acesso Restrito a Usuários Cadastrados</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
