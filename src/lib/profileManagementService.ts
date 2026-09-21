import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface DuoProfile {
  id: string;
  name: string;
  motto: string;
  partner1: {
    id: string;
    name: string;
    role: string;
    email?: string;
    avatarUrl?: string;
  };
  partner2: {
    id: string;
    name: string;
    role: string;
    email?: string;
    avatarUrl?: string;
  };
  scorePercentage: number;
  scoreDisplay: string;
  rankPosition: number | string;
  rankText: string;
  status: string;
  targetDailyHours: number;
  teacherNotes?: string;
  lastUpdated: string;
}

export interface StudentProfileData {
  id: string;
  name: string;
  displayName: string;
  email: string;
  phone?: string;
  targetRole: string;
  status: 'ativo' | 'bloqueado';
  avatarUrl?: string;
  streakDays: number;
  hoursStudiedToday: number;
  totalHoursStudied: number;
  xp: number;
  duoPosition?: string;
  individualPosition?: string;
  teacherNotes?: string;
  password?: string;
  turmaId: string;
  turmaName: string;
  lastUpdated: string;
}

const STORAGE_KEY_DUO = 'tjam_duo_profile';
const STORAGE_KEY_STUDENTS_PROFILES = 'tjam_student_detailed_profiles';

const DEFAULT_DUO_PROFILE: DuoProfile = {
  id: 'duo-oficial-tjam',
  name: 'Eduardo Mateus & Pedro Henrique',
  motto: 'Dupla Oficial de Estudos • Preparatório TJAM 2026 (Assistente Judiciário)',
  partner1: {
    id: 'id00120087',
    name: 'Eduardo Mateus A. Amorim',
    role: 'Aluno Titular • Foco TJAM',
    email: 'id00120087@tjam.estudos.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  },
  partner2: {
    id: 'student-pedro-henrique',
    name: 'Pedro Henrique Ferreira',
    role: 'Parceiro de Dupla Oficial',
    email: 'pedro.henrique@tjam.estudos.com',
    avatarUrl: '',
  },
  scorePercentage: 30.0,
  scoreDisplay: '30,0%',
  rankPosition: 5,
  rankText: '5º Lugar Geral',
  status: 'Dupla Oficial • 100% em dia, sem pendências',
  targetDailyHours: 4,
  teacherNotes: 'Dupla oficial acompanhada pela coordenação. Excelente desempenho no módulo 1 e regimento interno.',
  lastUpdated: new Date().toISOString(),
};

const DEFAULT_STUDENT_PROFILES: Record<string, StudentProfileData> = {
  id00120087: {
    id: 'id00120087',
    name: 'Eduardo Mateus',
    displayName: 'Eduardo Mateus A. Amorim',
    email: 'id00120087@tjam.estudos.com',
    phone: '(92) 98111-2233',
    targetRole: 'Assistente Judiciário',
    status: 'ativo',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    streakDays: 14,
    hoursStudiedToday: 3.5,
    totalHoursStudied: 42,
    xp: 2850,
    duoPosition: '5º Lugar Dupla (30,0%)',
    individualPosition: '2º Lugar Geral (83,8% - 67/80)',
    teacherNotes: 'Aluno dedicado com excelente retenção em Direito Processual Penal e Regimento Interno.',
    password: 'Ed121312',
    turmaId: 'turma-tjam-2026',
    turmaName: 'Turma TJAM 2026 - Tribunal de Justiça',
    lastUpdated: new Date().toISOString(),
  },
  'student-pedro-henrique': {
    id: 'student-pedro-henrique',
    name: 'Pedro Henrique Ferreira',
    displayName: 'Pedro Henrique Ferreira',
    email: 'pedro.henrique@tjam.estudos.com',
    phone: '(92) 98222-4455',
    targetRole: 'Assistente Judiciário',
    status: 'ativo',
    avatarUrl: '',
    streakDays: 12,
    hoursStudiedToday: 3.0,
    totalHoursStudied: 38,
    xp: 2400,
    duoPosition: '5º Lugar Dupla (30,0%)',
    individualPosition: 'Classificado • 100% em dia',
    teacherNotes: 'Parceiro da dupla oficial focado em Legislação Institucional do TJAM e Direito Constitucional.',
    password: 'tjam2026',
    turmaId: 'turma-tjam-2026',
    turmaName: 'Turma TJAM 2026 - Tribunal de Justiça',
    lastUpdated: new Date().toISOString(),
  },
};

export class ProfileManagementService {
  /**
   * Retrieves the current Duo Profile.
   */
  static getDuoProfile(): DuoProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DUO);
      if (stored) {
        return { ...DEFAULT_DUO_PROFILE, ...JSON.parse(stored) };
      }
    } catch (err) {
      console.error('Error reading duo profile:', err);
    }
    return { ...DEFAULT_DUO_PROFILE };
  }

  /**
   * Saves the Duo Profile and synchronizes.
   */
  static async saveDuoProfile(profile: Partial<DuoProfile>): Promise<DuoProfile> {
    const current = this.getDuoProfile();
    const updated: DuoProfile = {
      ...current,
      ...profile,
      lastUpdated: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY_DUO, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('tjam_duo_profile_updated', { detail: updated }));

      // Firestore sync in background
      try {
        const docRef = doc(db, 'system_profiles', 'duo_official');
        await setDoc(docRef, updated);
      } catch (fErr) {
        console.warn('Firestore duo profile note:', fErr);
      }
    } catch (err) {
      console.error('Error saving duo profile:', err);
    }
    return updated;
  }

  /**
   * Retrieves all student detailed profiles.
   */
  static getAllStudentProfiles(): Record<string, StudentProfileData> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STUDENTS_PROFILES);
      if (stored) {
        return { ...DEFAULT_STUDENT_PROFILES, ...JSON.parse(stored) };
      }
    } catch (err) {
      console.error('Error reading student profiles:', err);
    }
    return { ...DEFAULT_STUDENT_PROFILES };
  }

  /**
   * Retrieves a single student profile by ID.
   */
  static getStudentProfile(studentId: string): StudentProfileData {
    const all = this.getAllStudentProfiles();
    return (
      all[studentId] || {
        id: studentId,
        name: 'Aluno TJAM',
        displayName: 'Aluno TJAM',
        email: `${studentId}@tjam.estudos.com`,
        targetRole: 'Assistente Judiciário',
        status: 'ativo',
        streakDays: 1,
        hoursStudiedToday: 1,
        totalHoursStudied: 10,
        xp: 100,
        turmaId: 'turma-tjam-2026',
        turmaName: 'Turma TJAM 2026',
        lastUpdated: new Date().toISOString(),
      }
    );
  }

  /**
   * Saves or updates a student profile and synchronizes.
   */
  static async saveStudentProfile(studentId: string, updates: Partial<StudentProfileData>): Promise<StudentProfileData> {
    const all = this.getAllStudentProfiles();
    const current = this.getStudentProfile(studentId);
    const updated: StudentProfileData = {
      ...current,
      ...updates,
      id: studentId,
      lastUpdated: new Date().toISOString(),
    };

    all[studentId] = updated;

    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS_PROFILES, JSON.stringify(all));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('tjam_student_profile_updated', { detail: updated }));

      // Firestore sync in background
      try {
        const docRef = doc(db, 'system_profiles', `student_${studentId}`);
        await setDoc(docRef, updated);
      } catch (fErr) {
        console.warn('Firestore student profile note:', fErr);
      }
    } catch (err) {
      console.error('Error saving student profile:', err);
    }
    return updated;
  }

  /**
   * Syncs from Firestore on startup if online.
   */
  static async syncFromFirestore(): Promise<void> {
    try {
      const duoSnap = await getDoc(doc(db, 'system_profiles', 'duo_official'));
      if (duoSnap.exists()) {
        localStorage.setItem(STORAGE_KEY_DUO, JSON.stringify(duoSnap.data()));
      }
      window.dispatchEvent(new Event('storage'));
    } catch {
      // offline fallback
    }
  }
}
