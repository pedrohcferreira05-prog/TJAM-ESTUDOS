import { db, auth } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  Unsubscribe
} from 'firebase/firestore';
import {
  UserProgress,
  Turma,
  Announcement,
  LiveClass,
  PublishedMaterial,
  StudentSubmission,
  SimuladoAttempt,
  WeeklyScheduleItem,
  TodayLessonConfig
} from '../types';
import { Week1Lesson } from '../data/tjamWeek1Data';
import { DUPLAS_RANKING, INDIVIDUAL_SIMULADO_RANKING, RankingDuplaItem, RankingIndividualItem } from '../data/rankingsData';

// Firestore collections and legacy document constants
const COLLECTION_NAME = 'tjam_applet_data';
const PROGRESS_DOC_ID = 'student_user_progress';
const WEEK1_CONTENT_DOC_ID = 'week1_course_content';
const LESSON_PROGRESS_DOC_ID = 'lesson_progress_store';

// Modern 3-Portal Collections
export const COLLECTIONS = {
  SYSTEM_CONTROLS: 'system_controls',
  USERS: 'users',
  USER_PROGRESS: 'user_progress',
  TURMAS: 'turmas',
  ANNOUNCEMENTS: 'announcements',
  LIVE_CLASSES: 'live_classes',
  MATERIALS: 'materials',
  SUBMISSIONS: 'submissions',
  SIMULADO_ATTEMPTS: 'simulado_attempts',
  RANKINGS: 'rankings'
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notice:', JSON.stringify(errInfo));
}

// -------------------------------------------------------------
// 1. SYSTEM CONTROLS (LOCK / UNLOCK PORTAL, REAL-TIME SWITCHES)
// -------------------------------------------------------------
export interface SystemControlData {
  isSiteLocked: boolean;
  lockMessage: string;
  activeStage: string;
  simuladosOpen: boolean;
  updatedAt: string;
  updatedBy: string;
}

export const DEFAULT_SYSTEM_CONTROLS: SystemControlData = {
  isSiteLocked: false,
  lockMessage: 'PORTAL TEMPORARIAMENTE BLOQUEADO: O acesso à plataforma foi temporariamente suspenso pelo professor. Aguarde novas orientações.',
  activeStage: 'Etapa 2: Legislação Específica e Exercícios Intensivos',
  simuladosOpen: true,
  updatedAt: new Date().toISOString(),
  updatedBy: 'Prof. Dr. Alberto Silva'
};

/**
 * Real-time listener for platform lock/unlock status & controls
 */
export function subscribeToSystemControls(
  onUpdate: (data: SystemControlData) => void
): Unsubscribe {
  const docRef = doc(db, COLLECTIONS.SYSTEM_CONTROLS, 'platform_settings');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      onUpdate({ ...DEFAULT_SYSTEM_CONTROLS, ...snapshot.data() } as SystemControlData);
    } else {
      // Initialize if not exists
      setDoc(docRef, DEFAULT_SYSTEM_CONTROLS).catch(() => {});
      onUpdate(DEFAULT_SYSTEM_CONTROLS);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `${COLLECTIONS.SYSTEM_CONTROLS}/platform_settings`);
  });
}

/**
 * Teacher updates system controls (lock/unlock portal in real time)
 */
export async function updateSystemControls(controls: Partial<SystemControlData>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.SYSTEM_CONTROLS, 'platform_settings');
    await setDoc(docRef, {
      ...controls,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.SYSTEM_CONTROLS}/platform_settings`);
  }
}

// -------------------------------------------------------------
// 2. USER PRESENCE & ONLINE STATUS (REALTIME)
// -------------------------------------------------------------
export interface UserPresenceData {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  isOnline: boolean;
  activityStatus: 'online' | 'estudando' | 'fazendo_atividade' | 'fazendo_simulado' | 'offline';
  currentSubject?: string;
  currentLesson?: string;
  lastActive: string;
}

export async function updateUserPresence(presence: Partial<UserPresenceData> & { uid: string }): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.USERS, presence.uid);
    await setDoc(docRef, {
      ...presence,
      lastActive: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.USERS}/${presence.uid}`);
  }
}

export function subscribeToAllUsers(
  onUpdate: (users: UserPresenceData[]) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTIONS.USERS);
  return onSnapshot(colRef, (snapshot) => {
    const users: UserPresenceData[] = [];
    if (snapshot && typeof snapshot.forEach === 'function') {
      snapshot.forEach((docSnap) => {
        if (docSnap && typeof docSnap.data === 'function') {
          users.push(docSnap.data() as UserPresenceData);
        }
      });
    }
    onUpdate(users);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, COLLECTIONS.USERS);
  });
}

// -------------------------------------------------------------
// 3. STUDENT USER PROGRESS (PERSISTENCE & REALTIME - ISOLATED PER USER)
// -------------------------------------------------------------
export async function saveUserProgressToFirestore(progress: UserProgress, userId?: string): Promise<void> {
  try {
    const effectiveUserId = userId || auth?.currentUser?.uid || 'id00120087';

    // 1. Isolated document per student under user_progress collection
    const docRef = doc(db, COLLECTIONS.USER_PROGRESS, effectiveUserId);
    await setDoc(docRef, {
      ...progress,
      userId: effectiveUserId,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // 2. Also keep legacy sync for primary titular user
    if (effectiveUserId === 'id00120087') {
      const legacyRef = doc(db, COLLECTION_NAME, PROGRESS_DOC_ID);
      await setDoc(legacyRef, {
        ...progress,
        userId: effectiveUserId,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.USER_PROGRESS}/${userId}`);
  }
}

export async function loadUserProgressFromFirestore(userId?: string): Promise<Partial<UserProgress> | null> {
  try {
    const effectiveUserId = userId || auth?.currentUser?.uid || 'id00120087';

    // 1. Query isolated document
    const docRef = doc(db, COLLECTIONS.USER_PROGRESS, effectiveUserId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as Partial<UserProgress>;
    }

    // 2. Fallback to legacy document for primary student
    if (effectiveUserId === 'id00120087') {
      const legacyRef = doc(db, COLLECTION_NAME, PROGRESS_DOC_ID);
      const legacySnap = await getDoc(legacyRef);
      if (legacySnap.exists()) {
        return legacySnap.data() as Partial<UserProgress>;
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `${COLLECTIONS.USER_PROGRESS}/${userId}`);
  }
  return null;
}

export function subscribeToUserProgress(
  onUpdate: (progress: Partial<UserProgress>) => void,
  userId?: string
): Unsubscribe {
  const effectiveUserId = userId || auth?.currentUser?.uid || 'id00120087';
  const docRef = doc(db, COLLECTIONS.USER_PROGRESS, effectiveUserId);
  return onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      onUpdate(snap.data() as Partial<UserProgress>);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `${COLLECTIONS.USER_PROGRESS}/${effectiveUserId}`);
  });
}

// -------------------------------------------------------------
// 4. LESSON PROGRESS STORE (AULAS, EXERCÍCIOS, STATUS - ISOLATED PER USER)
// -------------------------------------------------------------
export async function saveLessonProgressToFirestore(store: Record<string, any>, userId?: string): Promise<void> {
  try {
    const effectiveUserId = userId || auth?.currentUser?.uid || 'id00120087';
    const docRef = doc(db, 'lesson_progress', effectiveUserId);
    await setDoc(docRef, {
      userId: effectiveUserId,
      store,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    if (effectiveUserId === 'id00120087') {
      const legacyRef = doc(db, COLLECTION_NAME, LESSON_PROGRESS_DOC_ID);
      await setDoc(legacyRef, {
        store,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `lesson_progress/${userId}`);
  }
}

export async function loadLessonProgressFromFirestore(userId?: string): Promise<Record<string, any> | null> {
  try {
    const effectiveUserId = userId || auth?.currentUser?.uid || 'id00120087';
    const docRef = doc(db, 'lesson_progress', effectiveUserId);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data()?.store) {
      return snap.data().store as Record<string, any>;
    }
    if (effectiveUserId === 'id00120087') {
      const legacyRef = doc(db, COLLECTION_NAME, LESSON_PROGRESS_DOC_ID);
      const legacySnap = await getDoc(legacyRef);
      if (legacySnap.exists() && legacySnap.data()?.store) {
        return legacySnap.data().store as Record<string, any>;
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `lesson_progress/${userId}`);
  }
  return null;
}

export function subscribeToLessonProgress(
  onUpdate: (store: Record<string, any>) => void,
  userId?: string
): Unsubscribe {
  const effectiveUserId = userId || auth?.currentUser?.uid || 'id00120087';
  const docRef = doc(db, 'lesson_progress', effectiveUserId);
  return onSnapshot(docRef, (snap) => {
    if (snap.exists() && snap.data()?.store) {
      onUpdate(snap.data().store as Record<string, any>);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `lesson_progress/${effectiveUserId}`);
  });
}

// -------------------------------------------------------------
// 5. TURMAS (REAL-TIME SYNC)
// -------------------------------------------------------------
export function subscribeToTurmas(
  initialFallback: Turma[],
  onUpdate: (turmas: Turma[]) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTIONS.TURMAS);
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot && !snapshot.empty && typeof snapshot.forEach === 'function') {
      const items: Turma[] = [];
      snapshot.forEach((docSnap) => {
        if (docSnap && typeof docSnap.data === 'function') {
          items.push(docSnap.data() as Turma);
        }
      });
      onUpdate(items);
    } else {
      // Seed initial turmas in Firestore if empty
      (initialFallback || []).forEach((t) => {
        setDoc(doc(db, COLLECTIONS.TURMAS, t.id), t).catch(() => {});
      });
      onUpdate(initialFallback || []);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, COLLECTIONS.TURMAS);
    onUpdate(initialFallback || []);
  });
}

export async function saveTurmaToFirestore(turma: Turma): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.TURMAS, turma.id), turma, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.TURMAS}/${turma.id}`);
  }
}

export async function deleteTurmaFromFirestore(turmaId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.TURMAS, turmaId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${COLLECTIONS.TURMAS}/${turmaId}`);
  }
}

// -------------------------------------------------------------
// 6. ANNOUNCEMENTS / AVISOS (REAL-TIME SYNC)
// -------------------------------------------------------------
export function subscribeToAnnouncements(
  initialFallback: Announcement[],
  onUpdate: (items: Announcement[]) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTIONS.ANNOUNCEMENTS);
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot && !snapshot.empty && typeof snapshot.forEach === 'function') {
      const items: Announcement[] = [];
      snapshot.forEach((docSnap) => {
        if (docSnap && typeof docSnap.data === 'function') {
          items.push(docSnap.data() as Announcement);
        }
      });
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onUpdate(items);
    } else {
      (initialFallback || []).forEach((a) => {
        setDoc(doc(db, COLLECTIONS.ANNOUNCEMENTS, a.id), a).catch(() => {});
      });
      onUpdate(initialFallback || []);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, COLLECTIONS.ANNOUNCEMENTS);
    onUpdate(initialFallback || []);
  });
}

export async function saveAnnouncementToFirestore(item: Announcement): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.ANNOUNCEMENTS, item.id), item, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.ANNOUNCEMENTS}/${item.id}`);
  }
}

export async function deleteAnnouncementFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.ANNOUNCEMENTS, id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${COLLECTIONS.ANNOUNCEMENTS}/${id}`);
  }
}

// -------------------------------------------------------------
// 7. LIVE CLASSES / AULAS AO VIVO (REAL-TIME SYNC)
// -------------------------------------------------------------
export function subscribeToLiveClasses(
  initialFallback: LiveClass[],
  onUpdate: (items: LiveClass[]) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTIONS.LIVE_CLASSES);
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot && !snapshot.empty && typeof snapshot.forEach === 'function') {
      const items: LiveClass[] = [];
      snapshot.forEach((docSnap) => {
        if (docSnap && typeof docSnap.data === 'function') {
          items.push(docSnap.data() as LiveClass);
        }
      });
      onUpdate(items);
    } else {
      (initialFallback || []).forEach((l) => {
        setDoc(doc(db, COLLECTIONS.LIVE_CLASSES, l.id), l).catch(() => {});
      });
      onUpdate(initialFallback || []);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, COLLECTIONS.LIVE_CLASSES);
    onUpdate(initialFallback || []);
  });
}

export async function saveLiveClassToFirestore(item: LiveClass): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.LIVE_CLASSES, item.id), item, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.LIVE_CLASSES}/${item.id}`);
  }
}

export async function deleteLiveClassFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.LIVE_CLASSES, id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${COLLECTIONS.LIVE_CLASSES}/${id}`);
  }
}

// -------------------------------------------------------------
// 8. PUBLISHED MATERIALS / CONTEÚDOS & MATERIAIS
// -------------------------------------------------------------
export function subscribeToPublishedMaterials(
  initialFallback: PublishedMaterial[],
  onUpdate: (items: PublishedMaterial[]) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTIONS.MATERIALS);
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot && !snapshot.empty && typeof snapshot.forEach === 'function') {
      const items: PublishedMaterial[] = [];
      snapshot.forEach((docSnap) => {
        if (docSnap && typeof docSnap.data === 'function') {
          items.push(docSnap.data() as PublishedMaterial);
        }
      });
      onUpdate(items);
    } else {
      (initialFallback || []).forEach((m) => {
        setDoc(doc(db, COLLECTIONS.MATERIALS, m.id), m).catch(() => {});
      });
      onUpdate(initialFallback || []);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, COLLECTIONS.MATERIALS);
    onUpdate(initialFallback || []);
  });
}

export async function savePublishedMaterialToFirestore(mat: PublishedMaterial): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.MATERIALS, mat.id), mat, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.MATERIALS}/${mat.id}`);
  }
}

export async function deletePublishedMaterialFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.MATERIALS, id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${COLLECTIONS.MATERIALS}/${id}`);
  }
}

// -------------------------------------------------------------
// 9. STUDENT SUBMISSIONS & ATIVIDADES (CORREÇÕES DO PROFESSOR)
// -------------------------------------------------------------
export function subscribeToStudentSubmissions(
  initialFallback: StudentSubmission[],
  onUpdate: (items: StudentSubmission[]) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTIONS.SUBMISSIONS);
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot && !snapshot.empty && typeof snapshot.forEach === 'function') {
      const items: StudentSubmission[] = [];
      snapshot.forEach((docSnap) => {
        if (docSnap && typeof docSnap.data === 'function') {
          items.push(docSnap.data() as StudentSubmission);
        }
      });
      onUpdate(items);
    } else {
      (initialFallback || []).forEach((s) => {
        setDoc(doc(db, COLLECTIONS.SUBMISSIONS, s.id), s).catch(() => {});
      });
      onUpdate(initialFallback || []);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, COLLECTIONS.SUBMISSIONS);
    onUpdate(initialFallback || []);
  });
}

export async function saveStudentSubmissionToFirestore(submission: StudentSubmission): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.SUBMISSIONS, submission.id), submission, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.SUBMISSIONS}/${submission.id}`);
  }
}

export async function gradeStudentSubmissionInFirestore(
  submissionId: string,
  grade: number,
  feedback: string
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.SUBMISSIONS, submissionId);
    await updateDoc(docRef, {
      grade,
      feedback,
      status: 'corrigido',
      gradedAt: new Date().toISOString()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${COLLECTIONS.SUBMISSIONS}/${submissionId}`);
  }
}

// -------------------------------------------------------------
// 10. SIMULADO ATTEMPTS & OFICIAL RANKING REAL-TIME
// -------------------------------------------------------------
export async function saveSimuladoAttemptToFirestore(attempt: SimuladoAttempt): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.SIMULADO_ATTEMPTS, attempt.id), {
      ...attempt,
      recordedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.SIMULADO_ATTEMPTS}/${attempt.id}`);
  }
}

export function subscribeToSimuladoAttempts(
  onUpdate: (attempts: SimuladoAttempt[]) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTIONS.SIMULADO_ATTEMPTS);
  return onSnapshot(colRef, (snapshot) => {
    const items: SimuladoAttempt[] = [];
    if (snapshot && typeof snapshot.forEach === 'function') {
      snapshot.forEach((docSnap) => {
        if (docSnap && typeof docSnap.data === 'function') {
          items.push(docSnap.data() as SimuladoAttempt);
        }
      });
    }
    items.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
    onUpdate(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, COLLECTIONS.SIMULADO_ATTEMPTS);
  });
}

export interface StoredRankingsData {
  duplas: RankingDuplaItem[];
  individual: RankingIndividualItem[];
  updatedAt: string;
}

export function subscribeToRankings(
  onUpdate: (rankings: StoredRankingsData) => void
): Unsubscribe {
  const docRef = doc(db, COLLECTIONS.RANKINGS, 'official_tjam_2026');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot && typeof snapshot.exists === 'function' && snapshot.exists()) {
      onUpdate(snapshot.data() as StoredRankingsData);
    } else {
      const initial: StoredRankingsData = {
        duplas: DUPLAS_RANKING,
        individual: INDIVIDUAL_SIMULADO_RANKING,
        updatedAt: new Date().toISOString()
      };
      setDoc(docRef, initial).catch(() => {});
      onUpdate(initial);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `${COLLECTIONS.RANKINGS}/official_tjam_2026`);
    onUpdate({
      duplas: DUPLAS_RANKING,
      individual: INDIVIDUAL_SIMULADO_RANKING,
      updatedAt: new Date().toISOString()
    });
  });
}

export async function updateRankingsInFirestore(rankings: Partial<StoredRankingsData>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.RANKINGS, 'official_tjam_2026');
    await setDoc(docRef, {
      ...rankings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.RANKINGS}/official_tjam_2026`);
  }
}

// -------------------------------------------------------------
// 11. LEGACY WEEK 1 CONTENT
// -------------------------------------------------------------
export async function saveWeek1ContentToFirestore(lessons: Week1Lesson[]): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, WEEK1_CONTENT_DOC_ID);
    await setDoc(docRef, {
      lessons,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTION_NAME}/${WEEK1_CONTENT_DOC_ID}`);
  }
}

export async function loadWeek1ContentFromFirestore(): Promise<Week1Lesson[] | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, WEEK1_CONTENT_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().lessons) {
      return snap.data().lessons as Week1Lesson[];
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `${COLLECTION_NAME}/${WEEK1_CONTENT_DOC_ID}`);
  }
  return null;
}

// -------------------------------------------------------------
// 12. FULL SYSTEM RESET: ZERAR CONTEÚDOS & PROGRESSO DOS ALUNOS
// -------------------------------------------------------------
export async function resetAllStudentProgressAndContentsInFirestore(): Promise<void> {
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

  try {
    // 1. Reset progress docs
    const legacyProgressRef = doc(db, COLLECTION_NAME, PROGRESS_DOC_ID);
    await setDoc(legacyProgressRef, {
      ...cleanProgress,
      updatedAt: new Date().toISOString(),
    });

    const studentDocRef = doc(db, COLLECTIONS.USER_PROGRESS, 'default_student');
    await setDoc(studentDocRef, {
      ...cleanProgress,
      updatedAt: new Date().toISOString(),
    });

    // 2. Reset lesson progress store
    const lessonStoreRef = doc(db, COLLECTION_NAME, LESSON_PROGRESS_DOC_ID);
    await setDoc(lessonStoreRef, {
      store: {},
      updatedAt: new Date().toISOString(),
    });

    // 3. Clear all student submissions from Firestore
    try {
      const subSnap = await getDocs(collection(db, COLLECTIONS.SUBMISSIONS));
      for (const d of subSnap.docs) {
        await deleteDoc(doc(db, COLLECTIONS.SUBMISSIONS, d.id));
      }
    } catch (e) {
      console.warn('Error clearing submissions in Firestore', e);
    }

    // 4. Clear simulado attempts from Firestore
    try {
      const simSnap = await getDocs(collection(db, COLLECTIONS.SIMULADO_ATTEMPTS));
      for (const d of simSnap.docs) {
        await deleteDoc(doc(db, COLLECTIONS.SIMULADO_ATTEMPTS, d.id));
      }
    } catch (e) {
      console.warn('Error clearing simulado attempts in Firestore', e);
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'reset_all_student_progress');
  }
}

// -------------------------------------------------------------
// 13. SHARED TEACHER SCHEDULE & WEEKLY GOALS REAL-TIME SYNC
// -------------------------------------------------------------
export async function saveSharedWeeklyGoalsToFirestore(
  goals: Array<{ id: string; text: string; completed: boolean }>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, 'shared_weekly_goals');
    await setDoc(docRef, {
      goals,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTION_NAME}/shared_weekly_goals`);
  }
}

export function subscribeToSharedWeeklyGoals(
  fallback: Array<{ id: string; text: string; completed: boolean }>,
  onUpdate: (goals: Array<{ id: string; text: string; completed: boolean }>) => void
): Unsubscribe {
  const docRef = doc(db, COLLECTION_NAME, 'shared_weekly_goals');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot && typeof snapshot.exists === 'function' && snapshot.exists() && snapshot.data().goals) {
      onUpdate(snapshot.data().goals);
    } else {
      onUpdate(fallback);
      saveSharedWeeklyGoalsToFirestore(fallback).catch(() => {});
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `${COLLECTION_NAME}/shared_weekly_goals`);
    onUpdate(fallback);
  });
}

export async function saveWeeklyScheduleToFirestore(schedule: WeeklyScheduleItem[]): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, 'shared_weekly_schedule');
    await setDoc(docRef, {
      schedule,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTION_NAME}/shared_weekly_schedule`);
  }
}

export function subscribeToWeeklySchedule(
  fallback: WeeklyScheduleItem[],
  onUpdate: (schedule: WeeklyScheduleItem[]) => void
): Unsubscribe {
  const docRef = doc(db, COLLECTION_NAME, 'shared_weekly_schedule');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot && typeof snapshot.exists === 'function' && snapshot.exists() && snapshot.data().schedule) {
      onUpdate(snapshot.data().schedule);
    } else {
      onUpdate(fallback);
      saveWeeklyScheduleToFirestore(fallback).catch(() => {});
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `${COLLECTION_NAME}/shared_weekly_schedule`);
    onUpdate(fallback);
  });
}

// -------------------------------------------------------------
// 14. TODAY'S LESSONS CONFIG REAL-TIME SYNC (PROFESSOR ORGANIZA)
// -------------------------------------------------------------
export async function saveTodayLessonsConfigToFirestore(lessons: TodayLessonConfig[]): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, 'today_lessons_config');
    await setDoc(docRef, {
      lessons,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${COLLECTION_NAME}/today_lessons_config`);
  }
}

export function subscribeToTodayLessonsConfig(
  fallbackOrOnUpdate: TodayLessonConfig[] | ((lessons: TodayLessonConfig[]) => void),
  maybeOnUpdate?: (lessons: TodayLessonConfig[]) => void
): Unsubscribe {
  const fallback = typeof fallbackOrOnUpdate === 'function' ? [] : fallbackOrOnUpdate;
  const onUpdate = typeof fallbackOrOnUpdate === 'function' ? fallbackOrOnUpdate : (maybeOnUpdate || (() => {}));

  const docRef = doc(db, COLLECTION_NAME, 'today_lessons_config');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot && typeof snapshot.exists === 'function' && snapshot.exists() && snapshot.data().lessons) {
      const data = snapshot.data().lessons as TodayLessonConfig[];
      if (Array.isArray(data) && data.length > 0) {
        onUpdate(data);
        return;
      }
    }
    if (fallback && fallback.length > 0) {
      onUpdate(fallback);
      saveTodayLessonsConfigToFirestore(fallback).catch(() => {});
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `${COLLECTION_NAME}/today_lessons_config`);
    if (fallback && fallback.length > 0) {
      onUpdate(fallback);
    }
  });
}

