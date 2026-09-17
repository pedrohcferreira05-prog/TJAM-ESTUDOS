import { StudentAccount, AuthSession } from '../types';
import { db } from './firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'tjam_student_accounts';
const SESSION_STORAGE_KEY = 'tjam_auth_session';
const FIRESTORE_COLLECTION = 'student_accounts';

// Initial student accounts created for immediate access
const INITIAL_STUDENT_ACCOUNTS: StudentAccount[] = [
  {
    id: 'id00120087',
    username: 'id00120087',
    name: 'Eduardo Mateus',
    email: 'id00120087@tjam.estudos.com',
    password: 'Ed121312',
    turmaId: 'turma-tjam-2026',
    turmaName: 'Turma TJAM 2026 - Tribunal de Justiça',
    createdAt: new Date().toISOString(),
    status: 'ativo',
    phone: '(92) 98111-2233',
    notes: 'ID de Usuário Oficial: id00120087 • Acesso liberado pela Professora Jéssica Alves',
  },
  {
    id: 'student-pedro-henrique',
    username: 'id00120088',
    name: 'Pedro Henrique Ferreira',
    email: 'pedro.henrique@tjam.estudos.com',
    password: 'tjam2026',
    turmaId: 'turma-tjam-2026',
    turmaName: 'Turma TJAM 2026 - Tribunal de Justiça',
    createdAt: new Date().toISOString(),
    status: 'ativo',
    phone: '(92) 98222-4455',
    notes: 'Aluno com foco em Legislação Institucional do TJAM',
  },
];

// Teacher credentials defined by the institution
export const TEACHER_CONFIG = {
  name: 'Professora Jéssica Alves',
  username: 'jessica.alves',
  role: 'teacher' as const,
  defaultEmail: 'jessica.alves@tjam.jus.br',
  // Strict password validation
  password: 'Ph@193704',
  allowedIdentifiers: [
    'jessica.alves',
    'professora jéssica alves',
    'professora jessica alves',
    'jessica alves',
    'jessica.alves@tjam.jus.br',
    'jessica@tjam.jus.br',
    'docente@tjam.jus.br',
    'professora',
    'jessica',
  ],
};

export class StudentAccountService {
  /**
   * Returns all registered student accounts from localStorage and syncs with Firestore.
   */
  static getLocalAccounts(): StudentAccount[] {
    let accounts: StudentAccount[] = [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          accounts = parsed;
        }
      }
    } catch {
      // ignore
    }

    if (accounts.length === 0) {
      accounts = [...INITIAL_STUDENT_ACCOUNTS];
    }

    // Always enforce exact requested credentials for Eduardo Mateus
    const eduardoIndex = accounts.findIndex(
      (a) =>
        a.id === 'id00120087' ||
        a.username?.toLowerCase() === 'id00120087' ||
        a.name.toLowerCase().includes('eduardo mateus') ||
        a.email.toLowerCase().includes('eduardo.mateus')
    );

    const eduardoAcc: StudentAccount = {
      id: 'id00120087',
      username: 'id00120087',
      name: 'Eduardo Mateus',
      email: 'id00120087@tjam.estudos.com',
      password: 'Ed121312',
      turmaId: 'turma-tjam-2026',
      turmaName: 'Turma TJAM 2026 - Tribunal de Justiça',
      createdAt: '2026-01-15T08:00:00.000Z',
      status: 'ativo',
      phone: '(92) 98111-2233',
      notes: 'ID de Usuário Oficial: id00120087 • Acesso liberado pela Professora Jéssica Alves',
    };

    if (eduardoIndex >= 0) {
      accounts[eduardoIndex] = {
        ...accounts[eduardoIndex],
        ...eduardoAcc,
      };
    } else {
      accounts.unshift(eduardoAcc);
    }

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts));
    } catch {
      // ignore
    }

    return accounts;
  }

  /**
   * Loads student accounts from Firestore or local fallback.
   */
  static async loadAllAccounts(): Promise<StudentAccount[]> {
    const local = this.getLocalAccounts();
    try {
      const colRef = collection(db, FIRESTORE_COLLECTION);
      const snapshot = await getDocs(colRef);
      if (snapshot && !snapshot.empty && typeof snapshot.forEach === 'function') {
        const remote: StudentAccount[] = [];
        snapshot.forEach((docSnap) => {
          if (docSnap && typeof docSnap.data === 'function') {
            remote.push(docSnap.data() as StudentAccount);
          }
        });

        // Ensure Eduardo is always updated in remote array
        const eduIdx = remote.findIndex(
          (a) =>
            a.id === 'id00120087' ||
            a.username?.toLowerCase() === 'id00120087' ||
            a.name.toLowerCase().includes('eduardo mateus')
        );
        const eduardoAcc = local.find((a) => a.username === 'id00120087') || local[0];
        if (eduIdx >= 0) {
          remote[eduIdx] = { ...remote[eduIdx], ...eduardoAcc };
        } else {
          remote.unshift(eduardoAcc);
        }

        // Also ensure Eduardo is saved in Firestore document
        await setDoc(doc(db, FIRESTORE_COLLECTION, 'id00120087'), eduardoAcc, { merge: true }).catch(() => {});

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remote));
        return remote;
      } else {
        // Seed remote with initial accounts
        for (const acc of local) {
          await setDoc(doc(db, FIRESTORE_COLLECTION, acc.id), acc).catch(() => {});
        }
      }
    } catch (e) {
      console.warn('Firestore offline/unavailable, using local student storage', e);
    }
    return local;
  }

  /**
   * Explicitly ensures required accounts are created and synchronized in Firestore
   */
  static async syncAccountsWithFirestore(): Promise<void> {
    try {
      const local = this.getLocalAccounts();
      for (const acc of local) {
        await setDoc(doc(db, FIRESTORE_COLLECTION, acc.id), acc, { merge: true }).catch(() => {});
      }

      // Sync teacher profile to users collection
      await setDoc(
        doc(db, 'users', 'teacher-jessica-alves'),
        {
          uid: 'teacher-jessica-alves',
          username: TEACHER_CONFIG.username,
          name: TEACHER_CONFIG.name,
          email: TEACHER_CONFIG.defaultEmail,
          role: 'teacher',
          turmaId: 'turma-tjam-2026',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});
    } catch (e) {
      console.warn('Failed to sync accounts to Firestore:', e);
    }
  }

  /**
   * Saves or creates a new student account (called by Teacher).
   */
  static async saveAccount(account: StudentAccount): Promise<void> {
    const accounts = this.getLocalAccounts();
    const index = accounts.findIndex(
      (a) =>
        a.id === account.id ||
        (account.username && a.username === account.username) ||
        a.email.toLowerCase() === account.email.toLowerCase()
    );
    if (index >= 0) {
      accounts[index] = account;
    } else {
      accounts.push(account);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts));

    try {
      await setDoc(doc(db, FIRESTORE_COLLECTION, account.id), account);
    } catch (e) {
      console.warn('Firestore write error for student account', e);
    }
  }

  /**
   * Deletes a student account (called by Teacher).
   */
  static async deleteAccount(accountId: string): Promise<void> {
    const accounts = this.getLocalAccounts().filter((a) => a.id !== accountId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts));

    try {
      await deleteDoc(doc(db, FIRESTORE_COLLECTION, accountId));
    } catch (e) {
      console.warn('Firestore delete error for student account', e);
    }
  }

  /**
   * Updates only the password for a student (called by Teacher).
   */
  static async updatePassword(accountId: string, newPass: string): Promise<void> {
    const accounts = this.getLocalAccounts();
    const target = accounts.find((a) => a.id === accountId);
    if (target) {
      target.password = newPass;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts));
      try {
        await setDoc(doc(db, FIRESTORE_COLLECTION, target.id), target);
      } catch (e) {
        console.warn('Firestore update error for student password', e);
      }
    }
  }

  /**
   * Universal asynchronous authentication:
   * 1. Auto-detects whether the credential belongs to the Teacher (Professora Jéssica Alves) or a Student.
   * 2. Checks local cache and syncs with Firestore in real time.
   * 3. Prevents login failures caused by tab misselection.
   */
  static async authenticateAsync(
    identifier: string,
    pass: string,
    requestedRole?: 'student' | 'teacher'
  ): Promise<{
    success: boolean;
    session?: AuthSession;
    role?: 'student' | 'teacher';
    errorMessage?: string;
  }> {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanId || !cleanPass) {
      return { success: false, errorMessage: 'Por favor, preencha seu usuário e senha.' };
    }

    // Teacher detection check
    const isTeacherPass =
      cleanPass === TEACHER_CONFIG.password || cleanPass.toLowerCase() === TEACHER_CONFIG.password.toLowerCase();
    const isTeacherUser = TEACHER_CONFIG.allowedIdentifiers.some(
      (allowed) => cleanId === allowed || cleanId.includes('jessica') || cleanId.includes('docente')
    );

    // If teacher role was explicitly requested:
    if (requestedRole === 'teacher') {
      if (isTeacherUser && isTeacherPass) {
        const session: AuthSession = {
          id: 'teacher-jessica-alves',
          username: TEACHER_CONFIG.username,
          name: TEACHER_CONFIG.name,
          email: TEACHER_CONFIG.defaultEmail,
          role: 'teacher',
        };
        this.saveSession(session);
        return { success: true, session, role: 'teacher' };
      }

      // Check if user accidentally entered student credentials on the teacher tab
      const accounts = this.getLocalAccounts();
      const studentMatch = this.matchStudent(accounts, cleanId, cleanPass);
      if (studentMatch || (cleanId === 'id00120087' && cleanPass === 'Ed121312')) {
        return {
          success: false,
          errorMessage:
            'Acesso Negado: Estas credenciais pertencem a um Aluno. Por favor, acesse através da aba "Área do Aluno".',
        };
      }

      return {
        success: false,
        errorMessage:
          'Credenciais de docente incorretas. Usuário: jessica.alves | Senha de acesso não confere.',
      };
    }

    // If student role was explicitly requested (or default):
    if (requestedRole === 'student') {
      // If user typed teacher credentials on student tab, reject with helpful message
      if (isTeacherUser && isTeacherPass) {
        return {
          success: false,
          errorMessage:
            'Acesso Negado: Estas credenciais pertencem à Professora Jéssica. Para acessar o Portal Docente, selecione a aba "Área do Docente" acima.',
        };
      }
    }

    // 2. Check local accounts for student
    const accounts = this.getLocalAccounts();
    let student = this.matchStudent(accounts, cleanId, cleanPass);

    // 3. If not found locally, query Firestore directly
    if (!student) {
      try {
        const remote = await this.loadAllAccounts();
        student = this.matchStudent(remote, cleanId, cleanPass);
      } catch (err) {
        console.warn('Error fetching accounts from Firestore during auth:', err);
      }
    }

    // 4. Also check explicit Eduardo Mateus requested credentials
    if (!student && (cleanId === 'id00120087' || cleanId.includes('eduardo'))) {
      if (cleanPass === 'Ed121312' || cleanPass.toLowerCase() === 'ed121312') {
        const eduardo = accounts.find((a) => a.id === 'id00120087') || {
          id: 'id00120087',
          username: 'id00120087',
          name: 'Eduardo Mateus',
          email: 'id00120087@tjam.estudos.com',
          password: 'Ed121312',
          turmaId: 'turma-tjam-2026',
          turmaName: 'Turma TJAM 2026 - Tribunal de Justiça',
          createdAt: new Date().toISOString(),
          status: 'ativo' as const,
        };
        student = eduardo;
      }
    }

    if (student) {
      if (student.status === 'bloqueado') {
        return {
          success: false,
          errorMessage: 'Esta conta de aluno está suspensa. Procure a Professora Jéssica Alves.',
        };
      }

      const session: AuthSession = {
        id: student.id,
        username: student.username || student.id,
        name: student.name,
        email: student.email,
        role: 'student',
        turmaId: student.turmaId,
        turmaName: student.turmaName,
      };
      this.saveSession(session);
      return { success: true, session, role: 'student' };
    }

    // 5. If it might be teacher with wrong password:
    if (isTeacherUser) {
      return {
        success: false,
        errorMessage: 'Senha de docente incorreta. Digite a senha cadastrada para a Professora Jéssica Alves.',
      };
    }

    // 6. Generic failure message
    return {
      success: false,
      errorMessage:
        'Credenciais não encontradas. Verifique o seu ID de Usuário (ex: id00120087) ou usuário docente (jessica.alves) e a senha.',
    };
  }

  private static matchStudent(accounts: StudentAccount[], cleanId: string, cleanPass: string): StudentAccount | null {
    return (
      accounts.find((acc) => {
        const emailMatch = acc.email.trim().toLowerCase() === cleanId;
        const nameMatch = acc.name.trim().toLowerCase() === cleanId;
        const usernameMatch = acc.username ? acc.username.trim().toLowerCase() === cleanId : false;
        const idMatch = acc.id.trim().toLowerCase() === cleanId;
        const emailPrefixMatch = acc.email.split('@')[0].toLowerCase() === cleanId;
        const isIdentifierMatch = emailMatch || nameMatch || usernameMatch || idMatch || emailPrefixMatch;

        const passMatch =
          acc.password === cleanPass || acc.password.toLowerCase() === cleanPass.toLowerCase();

        return isIdentifierMatch && passMatch;
      }) || null
    );
  }

  /**
   * Authenticates a student user via username, email, ID or student name.
   */
  static authenticateStudent(emailOrUser: string, pass: string): StudentAccount | null {
    const cleanId = emailOrUser.trim().toLowerCase();
    const cleanPass = pass.trim();
    const accounts = this.getLocalAccounts();

    const student = accounts.find((acc) => {
      const emailMatch = acc.email.trim().toLowerCase() === cleanId;
      const nameMatch = acc.name.trim().toLowerCase() === cleanId;
      const usernameMatch = acc.username ? acc.username.trim().toLowerCase() === cleanId : false;
      const idMatch = acc.id.trim().toLowerCase() === cleanId;
      const emailPrefixMatch = acc.email.split('@')[0].toLowerCase() === cleanId;
      const isIdentifierMatch = emailMatch || nameMatch || usernameMatch || idMatch || emailPrefixMatch;
      return isIdentifierMatch && acc.password === cleanPass;
    });

    if (student && student.status !== 'bloqueado') {
      return student;
    }
    return null;
  }

  /**
   * Authenticates the teacher.
   */
  static authenticateTeacher(identifier: string, pass: string): boolean {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Must match the exact requested password
    if (cleanPass !== TEACHER_CONFIG.password) {
      return false;
    }

    // Accepts variations of teacher name or institutional email
    const idMatches = TEACHER_CONFIG.allowedIdentifiers.some(
      (allowed) => cleanId === allowed || cleanId.includes('jessica') || cleanId.includes('docente')
    );

    return idMatches || cleanId === 'admin' || cleanId === 'professora';
  }

  /**
   * Manages current authenticated session
   */
  static getSession(): AuthSession | null {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  }

  static saveSession(session: AuthSession): void {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  static clearSession(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem('tjam_staff_auth');
  }
}
