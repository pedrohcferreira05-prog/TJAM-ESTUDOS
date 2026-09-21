export type MapLevel = 'simplified' | 'standard' | 'advanced';
export type MapStatus = 'published' | 'draft' | 'hidden';

export interface MindMapNode {
  id: string;
  label: string;
  note?: string;
  color?: string;
  isKeyConcept?: boolean;
  collapsed?: boolean;
  children?: MindMapNode[];
  icon?: string;
}

export interface MindMap {
  id: string;
  title: string;
  description: string;
  disciplineId: string;
  disciplineName: string;
  topic: string;
  theme?: string;
  level: MapLevel;
  status: MapStatus;
  rootNode: MindMapNode;
  createdAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
}

export interface DisciplineTopic {
  id: string;
  name: string;
  description?: string;
  completed?: boolean;
}

export type Topic = DisciplineTopic;

export interface Discipline {
  id: string;
  name: string;
  code: string;
  order: number;
  icon: string;
  color: string; // Tailwind color token, e.g. emerald, blue, purple, etc.
  description: string;
  topics: DisciplineTopic[];
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  disciplineId: string;
  topicId: string;
  topicName: string;
  statement: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  legalReference?: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  year?: number;
  institution?: string;
}

export interface QuestionAttempt {
  id: string;
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  answeredAt: string;
}

export interface Flashcard {
  id: string;
  disciplineId: string;
  topicId: string;
  topicName: string;
  front: string;
  back: string;
  lastReviewed?: string;
  nextReviewDate?: string;
  intervalDays?: number;
  easeFactor?: number;
  repetitionCount?: number;
  difficulty?: 'fácil' | 'médio' | 'difícil';
}

export interface VideoLesson {
  id: string;
  disciplineId: string;
  topicId: string;
  title: string;
  durationMinutes: number;
  videoUrl: string;
  summary: string;
  instructor?: string;
  isPublished?: boolean;
}

export interface PDFResource {
  id: string;
  disciplineId: string;
  topicId: string;
  title: string;
  pageCount: number;
  pdfUrl: string;
  summary: string;
}

export interface SummaryText {
  id: string;
  disciplineId: string;
  topicId: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface StatuteText {
  id: string;
  disciplineId: string;
  topicId: string;
  title: string;
  lawName: string;
  articles: Array<{
    number: string;
    text: string;
    highlight?: string;
  }>;
}

export interface SimuladoQuestion {
  questionId: string;
  question: Question;
  points: number;
}

export interface Simulado {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  disciplineBreakdown: Record<string, number>; // disciplineId -> question count
  questions: Question[];
  createdAt: string;
  status: 'active' | 'draft' | 'archived' | 'agendado' | 'ativo' | 'encerrado';
  passingScore?: number;
}

export interface SimuladoAttempt {
  id: string;
  simuladoId: string;
  simuladoTitle: string;
  startedAt: string;
  finishedAt: string;
  score: number;
  maxScore: number;
  percentage: number;
  userAnswers: Record<string, string>; // questionId -> selectedOptionId
  timeSpentSeconds: number;
  participantName?: string;
  partnerName?: string;
  deviceUsed?: 'Celular' | 'Tablet' | 'Notebook';
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  author: string;
  important: boolean;
}

export interface ReviewQueueItem {
  id: string;
  disciplineId: string;
  disciplineName: string;
  topicName: string;
  type: '24h' | '7d' | '30d' | '90d';
  dueDate: string;
  completed: boolean;
}

export interface WeeklyScheduleItem {
  id: string;
  dayOfWeek: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';
  disciplineIds: string[];
  tasks: string[];
  completed: boolean;
}

export interface TurmaStudent {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  enrolledAt: string;
  progressPercent: number;
  averageScore: number;
  simuladosDone: number;
  lastActive: string;
}

export interface Turma {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName: string;
  targetExam: string;
  description: string;
  currentStage: string;
  startDate: string;
  endDate: string;
  studentCount: number;
  students: TurmaStudent[];
  disciplineIds: string[];
}

export interface Announcement {
  id: string;
  turmaId: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  priority: 'normal' | 'alta' | 'urgente';
}

export interface LiveClass {
  id: string;
  turmaId: string;
  title: string;
  description: string;
  disciplineId: string;
  disciplineName: string;
  date: string;
  time: string;
  meetingUrl: string;
  status: 'agendada' | 'ao-vivo' | 'concluida' | 'gravada';
  recordingUrl?: string;
}

export interface PublishedMaterial {
  id: string;
  turmaId: string;
  disciplineId: string;
  topicId: string;
  title: string;
  type: 'aula' | 'pdf' | 'resumo' | 'mapa' | 'flashcard' | 'simulado' | 'questao';
  content: string;
  attachmentUrl?: string;
  releaseStage: string;
  releaseDate: string;
  isReleased: boolean;
  createdAt: string;
  authorName: string;
}

export interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  turmaId: string;
  activityTitle: string;
  disciplineName: string;
  submittedAt: string;
  content: string;
  attachmentUrl?: string;
  grade?: number; // 0 to 10
  feedback?: string;
  status: 'pendente' | 'corrigido';
}

export interface LessonProgressData {
  subjectKey: string;
  completed: boolean;
  completedAt?: string;
  selectedAnswers: Record<number, number>;
  showQuestionResults: Record<number, boolean>;
  tfAnswers: Record<number, boolean>;
  tfSubmitted: Record<number, boolean>;
  discursiveAnswers: Record<number, string>;
  discursiveSubmitted: Record<number, boolean>;
  checklist: Record<string, boolean>;
  learnedCards?: Record<number, boolean>;
  videoWatched?: boolean;
  videoWatchedAt?: string;
  personalNotes?: string;
  customVideoUrl?: string;
  lastUpdated?: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  studentCpf: string;
  courseTitle: string;
  issuedAt: string;
  totalHours: number;
  verificationCode: string;
}

export interface LessonAttendance {
  lessonId: string; // e.g. 'portugues', 'processo_penal', 'processo_civil'
  subjectTitle: string;
  date: string; // YYYY-MM-DD
  startedAt?: string; // ISO string
  endedAt?: string; // ISO string
  durationSeconds: number; // Duration in seconds
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface DailyAttendanceRecord {
  date: string; // YYYY-MM-DD
  attendedLessonIds: string[]; // List of completed lesson IDs today
  totalSecondsToday: number;
  allThreeCompleted: boolean;
  completedAt?: string;
}

export interface ActiveLessonTimer {
  lessonId: string;
  subjectTitle: string;
  startedAt: string; // ISO string
  elapsedSeconds: number;
  isRunning: boolean;
}

export interface UserProgress {
  dailyGoalHours: number;
  hoursStudiedToday: number;
  totalHoursStudied: number;
  streakDays: number;
  lastStudiedDate: string;
  targetExamDate: string; // e.g. 2026-11-15
  turmaId?: string;
  completedTopicIds: string[];
  studiedMapIds: string[];
  favoriteMapIds: string[];
  favoriteFlashcardIds: string[];
  errorQuestionIds: string[]; // Caderno de Erros
  questionAttempts: QuestionAttempt[];
  flashcardReviews: Record<string, 'fácil' | 'médio' | 'difícil' | 'errei'>;
  personalNotes: Record<string, string>; // topicId or mapId -> note text
  nodeNotes: Record<string, string>; // nodeId -> note text
  simuladoAttempts: SimuladoAttempt[];
  reviewQueue: ReviewQueueItem[];
  weeklyGoals: Array<{ id: string; text: string; completed: boolean }>;
  submissions?: StudentSubmission[];
  certificates?: Certificate[];
  savedLessons?: Record<string, LessonProgressData>;
  dailyAttendance?: Record<string, LessonAttendance>; // key: `${date}_${lessonId}`
  attendanceHistory?: Record<string, DailyAttendanceRecord>; // key: `${date}`
  activeLessonTimer?: ActiveLessonTimer | null;
}

export type ViewMode = 'student' | 'teacher' | 'simulado' | 'admin' | 'superadmin';
export type StudentTab = 
  | 'dashboard' 
  | 'materias'
  | 'turma' 
  | 'disciplina-hoje' 
  | 'aula-hoje' 
  | 'mapa-mental' 
  | 'flashcards' 
  | 'questoes' 
  | 'progresso' 
  | 'perfil' 
  | 'semana1' 
  | 'disciplines' 
  | 'schedule' 
  | 'reviews' 
  | 'simulados' 
  | 'caderno-erros' 
  | 'news' 
  | 'certificados';
export type TeacherTab =
  | 'rankings-dupla'
  | 'alunos'
  | 'turmas'
  | 'disciplinas-aluno'
  | 'materias-edital'
  | 'aulas-videos'
  | 'cronogramas'
  | 'questoes-simulados'
  | 'flashcards'
  | 'mapas-mentais'
  | 'caderno-erros'
  | 'materiais'
  | 'respostas'
  | 'correcoes'
  | 'desempenho'
  | 'avisos-lives'
  | 'biblioteca';
export type LayoutStyle = 'tree-horizontal' | 'tree-vertical' | 'radial';

export interface StudentAccount {
  id: string;
  username?: string; // ID de Usuário para login (ex: id00120087)
  name: string;
  email: string;
  password: string; // Senha definida pelo professor
  turmaId: string;
  turmaName: string;
  createdAt: string;
  status: 'ativo' | 'bloqueado';
  phone?: string;
  notes?: string;
}

export interface AuthSession {
  id: string;
  username?: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
  turmaId?: string;
  turmaName?: string;
}

export interface TodayLessonConfig {
  id: string;
  subjectKey: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  duration: string;
  order: number;
  questionsCount?: number;
  cardsCount?: number;
  isMandatoryAttendance?: boolean;
  teacherNotes?: string;
  customContentText?: string;
  updatedAt?: string;
}

