import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserProgress } from '../types';
import { WEEK1_LESSONS, Week1Lesson } from '../data/tjamWeek1Data';

// Firestore Collection and Document references for TJAM Assistente Judiciário
const COLLECTION_NAME = 'tjam_applet_data';
const PROGRESS_DOC_ID = 'student_user_progress';
const WEEK1_CONTENT_DOC_ID = 'week1_course_content';

/**
 * Save student progress to Firestore
 */
export async function saveUserProgressToFirestore(progress: UserProgress): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, PROGRESS_DOC_ID);
    await setDoc(docRef, {
      ...progress,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore write warning (using local persistence fallback):', err);
  }
}

/**
 * Fetch student progress from Firestore
 */
export async function loadUserProgressFromFirestore(): Promise<Partial<UserProgress> | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, PROGRESS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as Partial<UserProgress>;
    }
  } catch (err) {
    console.warn('Firestore read warning (using local persistence fallback):', err);
  }
  return null;
}

/**
 * Save updated Week 1 lesson content (edited by Professor/Admin) to Firestore
 */
export async function saveWeek1ContentToFirestore(lessons: Week1Lesson[]): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, WEEK1_CONTENT_DOC_ID);
    await setDoc(docRef, {
      lessons,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore content write warning:', err);
  }
}

/**
 * Load Week 1 lesson content from Firestore (or fallback to local defaults)
 */
export async function loadWeek1ContentFromFirestore(): Promise<Week1Lesson[] | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, WEEK1_CONTENT_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().lessons) {
      return snap.data().lessons as Week1Lesson[];
    }
  } catch (err) {
    console.warn('Firestore content read warning:', err);
  }
  return null;
}
