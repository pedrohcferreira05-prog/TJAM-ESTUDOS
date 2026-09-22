import { UserProgress, LessonAttendance, ActiveLessonTimer, TodayLessonConfig } from '../types';
import {
  saveUserProgressToFirestore,
  updateUserPresence,
  saveSharedWeeklyGoalsToFirestore,
  saveTodayLessonsConfigToFirestore,
} from './firestoreService';

export const DEFAULT_TODAY_LESSONS: TodayLessonConfig[] = [
  {
    id: 'direito_admin',
    subjectKey: 'direito_admin',
    title: 'Direito Administrativo — Aula 01',
    subtitle: 'Organização Administrativa: Administração Direta e Indireta, Centralização, Descentralização e Desconcentração • TJAM',
    category: 'Conhecimentos Específicos TJAM',
    badge: '1ª Aula de Hoje (Terça-feira)',
    duration: '50 min',
    order: 1,
    questionsCount: 20,
    cardsCount: 10,
    isMandatoryAttendance: true,
    teacherNotes: 'Nesta 1ª aula de hoje (Terça-feira), abordamos Organização Administrativa: Administração Direta e Indireta, Centralização, Descentralização e Desconcentração com 20 questões e situação prática para envio.',
  },
  {
    id: 'informatica',
    subjectKey: 'informatica',
    title: 'Informática e Processo Digital — Aula 01',
    subtitle: 'Windows: arquivos, pastas e operações • Processo Digital (Lei 11.419/2006) • Nível Intermediário TJAM',
    category: 'Conhecimentos Específicos / Informática TJAM',
    badge: '2ª Aula de Hoje (Terça-feira)',
    duration: '45 min',
    order: 2,
    questionsCount: 20,
    cardsCount: 10,
    isMandatoryAttendance: true,
    teacherNotes: 'Nesta 2ª aula de hoje (Terça-feira), estudamos Windows: arquivos, pastas, operações (copiar, mover, renomear, excluir, lixeira), atalhos e Processo Digital (Lei 11.419/2006) com 20 exercícios gabaritados e desafio prático.',
  },
  {
    id: 'redacao',
    subjectKey: 'redacao',
    title: 'Redação — Aula 01',
    subtitle: 'Estrutura da Redação: Introdução, Desenvolvimento e Conclusão • Coesão e Coerência • Nível Intermediário TJAM',
    category: 'Conhecimentos Básicos / Redação TJAM',
    badge: '3ª Aula de Hoje (Terça-feira)',
    duration: '45 min',
    order: 3,
    questionsCount: 20,
    cardsCount: 10,
    isMandatoryAttendance: true,
    teacherNotes: 'Nesta 3ª aula de hoje (Terça-feira), aprendemos a Estrutura da Redação Dissertativa para o TJAM (Introdução, Desenvolvimento, Conclusão, Tese, Argumentos, Coesão e Coerência) com 20 exercícios e Atividade Prática de Fixação (Projeto de Redação).',
  },
];

export const TODAY_MANDATORY_LESSONS = DEFAULT_TODAY_LESSONS.map((l) => ({
  id: l.subjectKey,
  title: l.title,
}));

export function getTodayLessonsConfig(): TodayLessonConfig[] {
  try {
    const versionKey = 'tjam_today_lessons_version_v6_terca_3aulas';
    const isUpToDate = localStorage.getItem(versionKey);
    if (!isUpToDate) {
      localStorage.setItem('tjam_today_lessons_config', JSON.stringify(DEFAULT_TODAY_LESSONS));
      localStorage.setItem(versionKey, 'true');
      localStorage.setItem('tjam_selected_subject', 'direito_admin');
      return DEFAULT_TODAY_LESSONS;
    }

    const raw = localStorage.getItem('tjam_today_lessons_config');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => a.order - b.order);
      }
    }
  } catch (e) {}
  return DEFAULT_TODAY_LESSONS;
}

export function saveTodayLessonsConfigLocalAndRemote(lessons: TodayLessonConfig[]): void {
  try {
    localStorage.setItem('tjam_today_lessons_config', JSON.stringify(lessons));
    window.dispatchEvent(new CustomEvent('tjam_today_lessons_updated', { detail: lessons }));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {}
  saveTodayLessonsConfigToFirestore(lessons).catch(() => {});
}

export const saveTodayLessonsConfig = saveTodayLessonsConfigLocalAndRemote;

export function getTodayDateKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDurationHMS(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safeSeconds / 3600);
  const mins = Math.floor((safeSeconds % 3600) / 60);
  const secs = safeSeconds % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

export function formatDigitalClock(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safeSeconds / 3600);
  const mins = Math.floor((safeSeconds % 3600) / 60);
  const secs = safeSeconds % 60;

  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Loads current user progress from localStorage with safety fallback
 */
export function getLocalUserProgress(userId?: string): UserProgress {
  const activeUserId = userId || 'id00120087';
  const key = activeUserId === 'id00120087' ? 'tjam_user_progress' : `tjam_user_progress_${activeUserId}`;
  try {
    const raw = localStorage.getItem(key) || localStorage.getItem('tjam_user_progress');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading local user progress:', e);
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
    weeklyGoals: [],
    dailyAttendance: {},
    attendanceHistory: {},
    activeLessonTimer: null,
  };
}

/**
 * Persists user progress locally and syncs to Firestore
 */
export function persistUserProgress(progress: UserProgress, userId?: string): void {
  const activeUserId = userId || 'id00120087';
  const key = activeUserId === 'id00120087' ? 'tjam_user_progress' : `tjam_user_progress_${activeUserId}`;

  try {
    localStorage.setItem(key, JSON.stringify(progress));
    if (activeUserId === 'id00120087') {
      localStorage.setItem('tjam_user_progress', JSON.stringify(progress));
    }
  } catch (e) {
    console.error('Error saving user progress to localStorage:', e);
  }

  // Sync to Firestore
  saveUserProgressToFirestore(progress, activeUserId).catch((err) => {
    console.warn('Silent Firestore sync error in persistUserProgress:', err);
  });

  // Notify components across window
  try {
    window.dispatchEvent(new CustomEvent('tjam_attendance_updated', { detail: { progress } }));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {}
}

/**
 * 1. MARK START OF LESSON (PRESENÇA DE INÍCIO)
 */
export function startLessonAttendance(
  lessonId: string,
  subjectTitle: string,
  userId?: string
): UserProgress {
  const activeUserId = userId || 'id00120087';
  const progress = getLocalUserProgress(activeUserId);
  const today = getTodayDateKey();
  const attendanceKey = `${today}_${lessonId}`;

  const existingAttendance = progress.dailyAttendance?.[attendanceKey];
  const startTime = new Date().toISOString();

  const newAttendance: LessonAttendance = {
    lessonId,
    subjectTitle,
    date: today,
    startedAt: existingAttendance?.startedAt || startTime,
    durationSeconds: existingAttendance?.durationSeconds || 0,
    status: 'in_progress',
  };

  const timer: ActiveLessonTimer = {
    lessonId,
    subjectTitle,
    startedAt: startTime,
    elapsedSeconds: existingAttendance?.durationSeconds || 0,
    isRunning: true,
  };

  const updatedProgress: UserProgress = {
    ...progress,
    dailyAttendance: {
      ...(progress.dailyAttendance || {}),
      [attendanceKey]: newAttendance,
    },
    activeLessonTimer: timer,
  };

  persistUserProgress(updatedProgress, activeUserId);

  // Update presence on portal
  updateUserPresence({
    uid: activeUserId,
    isOnline: true,
    activityStatus: 'estudando',
    currentSubject: lessonId,
    currentLesson: subjectTitle,
  }).catch(() => {});

  return updatedProgress;
}

/**
 * 2. MARK END OF LESSON (PRESENÇA DE FIM)
 * - Calculates duration
 * - Adds to hoursStudiedToday & totalHoursStudied
 * - Checks if all 3 mandatory daily lessons are finished
 * - If 3 are finished: marks goal + increments consecutive days (streak) automatically
 */
export function endLessonAttendance(
  lessonId: string,
  userId?: string
): {
  updatedProgress: UserProgress;
  completedThreeAllToday: boolean;
  addedSeconds: number;
} {
  const activeUserId = userId || 'id00120087';
  const progress = getLocalUserProgress(activeUserId);
  const today = getTodayDateKey();
  const attendanceKey = `${today}_${lessonId}`;

  const currentEntry = progress.dailyAttendance?.[attendanceKey];
  const activeTimer = progress.activeLessonTimer;

  // Calculate elapsed time
  let addedSeconds = 0;
  if (activeTimer && activeTimer.lessonId === lessonId && activeTimer.startedAt) {
    const started = new Date(activeTimer.startedAt).getTime();
    addedSeconds = Math.max(1, Math.round((Date.now() - started) / 1000));
  } else if (currentEntry?.startedAt) {
    const started = new Date(currentEntry.startedAt).getTime();
    addedSeconds = Math.max(1, Math.round((Date.now() - started) / 1000));
  } else {
    addedSeconds = 60; // minimum 1 min fallback
  }

  const totalLessonDuration = (currentEntry?.durationSeconds || 0) + addedSeconds;
  const finishTime = new Date().toISOString();

  // Completed attendance record
  const finishedAttendance: LessonAttendance = {
    lessonId,
    subjectTitle: currentEntry?.subjectTitle || lessonId,
    date: today,
    startedAt: currentEntry?.startedAt || finishTime,
    endedAt: finishTime,
    durationSeconds: totalLessonDuration,
    status: 'completed',
  };

  const updatedDailyAttendance = {
    ...(progress.dailyAttendance || {}),
    [attendanceKey]: finishedAttendance,
  };

  // Convert duration to hours and sum into hoursStudiedToday & totalHoursStudied
  const addedHours = Number((addedSeconds / 3600).toFixed(4));
  const newHoursToday = Number(((progress.hoursStudiedToday || 0) + addedHours).toFixed(2));
  const newTotalHours = Number(((progress.totalHoursStudied || 0) + addedHours).toFixed(2));

  // Mark lesson in savedLessons store
  const updatedSavedLessons = { ...(progress.savedLessons || {}) };
  updatedSavedLessons[lessonId] = {
    ...(updatedSavedLessons[lessonId] || {
      subjectKey: lessonId,
      selectedAnswers: {},
      showQuestionResults: {},
      tfAnswers: {},
      tfSubmitted: {},
      discursiveAnswers: {},
      discursiveSubmitted: {},
      checklist: {},
    }),
    completed: true,
    completedAt: finishTime,
    lastUpdated: finishTime,
  };

  // Sync to local lesson progress store
  try {
    const lessonsStorageKey = activeUserId === 'id00120087' ? 'tjam_lessons_progress' : `tjam_lessons_progress_${activeUserId}`;
    localStorage.setItem(lessonsStorageKey, JSON.stringify(updatedSavedLessons));
    localStorage.setItem('tjam_all_lessons_progress', JSON.stringify(updatedSavedLessons));
  } catch (e) {}

  // Check if mandatory lessons of today are completed
  const currentTodayLessons = getTodayLessonsConfig().filter(l => l.isMandatoryAttendance !== false);
  const mandatoryList = currentTodayLessons.length > 0 ? currentTodayLessons : DEFAULT_TODAY_LESSONS;

  const completedTodayIds = mandatoryList.filter((item) => {
    const key = `${today}_${item.subjectKey}`;
    return updatedDailyAttendance[key]?.status === 'completed';
  }).map((item) => item.subjectKey);

  const completedThreeAllToday = mandatoryList.every((item) => {
    const key = `${today}_${item.subjectKey}`;
    return updatedDailyAttendance[key]?.status === 'completed';
  });

  // Calculate streak: if all three are finished and streak hasn't been added today
  let streakDays = progress.streakDays || 0;
  let lastStudiedDate = progress.lastStudiedDate || finishTime;
  const lastStudiedDateDay = lastStudiedDate ? lastStudiedDate.split('T')[0] : '';

  if (completedThreeAllToday && lastStudiedDateDay !== today) {
    streakDays = streakDays + 1;
    lastStudiedDate = finishTime;
  } else if (streakDays === 0) {
    // If first study day, make it at least 1 day streak
    streakDays = 1;
    lastStudiedDate = finishTime;
  }

  // Update weekly goals to mark the 3 daily classes goal as completed!
  let updatedWeeklyGoals = [...(progress.weeklyGoals || [])];
  if (completedThreeAllToday) {
    let matchedAnyGoal = false;
    updatedWeeklyGoals = updatedWeeklyGoals.map((g) => {
      const lower = g.text.toLowerCase();
      if (
        lower.includes('3 aula') ||
        lower.includes('três aula') ||
        lower.includes('presença') ||
        lower.includes('segunda') ||
        lower.includes('metas de hoje')
      ) {
        matchedAnyGoal = true;
        return { ...g, completed: true };
      }
      return g;
    });

    // If no matching goal text, append one or mark the first goal
    if (!matchedAnyGoal && updatedWeeklyGoals.length > 0) {
      updatedWeeklyGoals[0] = { ...updatedWeeklyGoals[0], completed: true };
    }
    saveSharedWeeklyGoalsToFirestore(updatedWeeklyGoals).catch(() => {});
  }

  // Construct updated progress object
  const updatedProgress: UserProgress = {
    ...progress,
    hoursStudiedToday: newHoursToday,
    totalHoursStudied: newTotalHours,
    streakDays,
    lastStudiedDate,
    dailyAttendance: updatedDailyAttendance,
    attendanceHistory: {
      ...(progress.attendanceHistory || {}),
      [today]: {
        date: today,
        attendedLessonIds: completedTodayIds,
        totalSecondsToday: ((progress.attendanceHistory?.[today]?.totalSecondsToday || 0) + addedSeconds),
        allThreeCompleted: completedThreeAllToday,
        completedAt: completedThreeAllToday ? finishTime : undefined,
      },
    },
    weeklyGoals: updatedWeeklyGoals,
    savedLessons: updatedSavedLessons,
    activeLessonTimer: null, // Timer is stopped
  };

  persistUserProgress(updatedProgress, activeUserId);

  // Update user presence
  updateUserPresence({
    uid: activeUserId,
    isOnline: true,
    activityStatus: 'online',
    currentSubject: undefined,
    currentLesson: undefined,
  }).catch(() => {});

  return {
    updatedProgress,
    completedThreeAllToday,
    addedSeconds,
  };
}

/**
 * Helper to inspect attendance status of a given lesson today
 */
export function getLessonAttendanceStatus(progress: UserProgress, lessonId: string) {
  const today = getTodayDateKey();
  const key = `${today}_${lessonId}`;
  const record = progress.dailyAttendance?.[key];
  const activeTimer = progress.activeLessonTimer;
  const isCurrentlyActive = activeTimer?.lessonId === lessonId && activeTimer?.isRunning;

  return {
    status: isCurrentlyActive ? ('in_progress' as const) : (record?.status || ('not_started' as const)),
    startedAt: isCurrentlyActive ? activeTimer?.startedAt : record?.startedAt,
    endedAt: record?.endedAt,
    durationSeconds: record?.durationSeconds || 0,
    isCurrentlyActive,
  };
}

/**
 * Helper to get overview of the 3 daily mandatory classes
 */
export function getTodayAttendanceOverview(progress: UserProgress) {
  const today = getTodayDateKey();
  const lessonStatuses = TODAY_MANDATORY_LESSONS.map((lesson) => {
    const key = `${today}_${lesson.id}`;
    const record = progress.dailyAttendance?.[key];
    const isCurrentlyActive = progress.activeLessonTimer?.lessonId === lesson.id && progress.activeLessonTimer?.isRunning;

    return {
      id: lesson.id,
      title: lesson.title,
      status: isCurrentlyActive ? ('in_progress' as const) : (record?.status || ('not_started' as const)),
      startedAt: isCurrentlyActive ? progress.activeLessonTimer?.startedAt : record?.startedAt,
      endedAt: record?.endedAt,
      durationSeconds: record?.durationSeconds || 0,
      isCurrentlyActive,
    };
  });

  const completedCount = lessonStatuses.filter((l) => l.status === 'completed').length;
  const allThreeCompleted = completedCount === TODAY_MANDATORY_LESSONS.length;
  const activeLesson = lessonStatuses.find((l) => l.isCurrentlyActive);

  return {
    today,
    lessonStatuses,
    completedCount,
    totalRequired: TODAY_MANDATORY_LESSONS.length,
    allThreeCompleted,
    activeLesson,
    percentComplete: Math.round((completedCount / TODAY_MANDATORY_LESSONS.length) * 100),
  };
}
