import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  BookOpen,
  Filter,
  Search,
  RotateCcw,
  Award,
  MessageSquare,
  FileText,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Save,
  Download,
  Video,
} from 'lucide-react';
import {
  StudentAccount,
  StudentSubmission,
  QuestionAttempt,
  SimuladoAttempt,
  Question,
  Discipline,
} from '../types';

interface ExtendedQuestionAttempt extends QuestionAttempt {
  studentId?: string;
  studentName?: string;
}

interface TeacherStudentResponsesManagerProps {
  students: StudentAccount[];
  submissions: StudentSubmission[];
  questionAttempts: ExtendedQuestionAttempt[];
  simuladoAttempts: SimuladoAttempt[];
  questions: Question[];
  disciplines: Discipline[];
  savedLessons?: Record<string, any>;
  onGradeSubmission: (submissionId: string, grade: number, feedback: string) => void;
  onResetQuestionAttempt?: (attemptId: string) => void;
  onResetSimuladoAttempt?: (attemptId: string) => void;
}

export const TeacherStudentResponsesManager: React.FC<TeacherStudentResponsesManagerProps> = ({
  students = [],
  submissions = [],
  questionAttempts = [],
  simuladoAttempts = [],
  questions = [],
  disciplines = [],
  savedLessons = {},
  onGradeSubmission,
  onResetQuestionAttempt,
  onResetSimuladoAttempt,
}) => {
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'questions' | 'discursive' | 'video' | 'anotacoes' | 'simulados'>('all');
  const [resultFilter, setResultFilter] = useState<'all' | 'correct' | 'wrong' | 'pending'>('all');
  const [selectedDisciplineFilter, setSelectedDisciplineFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extract Video Lessons & Personal Notes from savedLessons for real-time synchronization
  const lessonEntries = Object.entries(savedLessons || {}) as [string, any][];

  const videoWatchedItems = lessonEntries
    .filter(([_, data]) => Boolean(data?.videoWatched))
    .map(([subjectKey, data]) => ({
      subjectKey,
      title: subjectKey === 'legislacao_tjam'
        ? 'Legislação Institucional do TJAM (LC nº 261/2023) — Aula 1'
        : subjectKey,
      watchedAt: data.videoWatchedAt || data.lastUpdated || new Date().toISOString(),
    }));

  const studentNotesItems = lessonEntries
    .filter(([_, data]) => typeof data?.personalNotes === 'string' && data.personalNotes.trim().length > 0)
    .map(([subjectKey, data]) => ({
      subjectKey,
      title: subjectKey === 'legislacao_tjam'
        ? 'Legislação Institucional do TJAM (LC nº 261/2023) — Aula 1'
        : subjectKey,
      notes: data.personalNotes as string,
      lastUpdated: data.lastUpdated || new Date().toISOString(),
    }));

  // Grading Modal / Inline State
  const [gradingSubmissionId, setGradingSubmissionId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(10);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Quick lookup maps
  const questionMap = new Map<string, Question>();
  (questions || []).forEach((q) => questionMap.set(q.id, q));

  const disciplineMap = new Map<string, Discipline>();
  (disciplines || []).forEach((d) => disciplineMap.set(d.id, d));

  // Determine active real students
  const safeStudents = Array.isArray(students) ? students : [];
  const activeStudents = safeStudents.length > 0 ? safeStudents : [
    {
      id: 'id00120087',
      username: 'id00120087',
      name: 'Eduardo Mateus',
      email: 'id00120087@tjam.estudos.com',
      password: '••••••••',
      turmaId: 'turma-tjam-2026',
      turmaName: 'Turma TJAM 2026',
      createdAt: new Date().toISOString(),
      status: 'ativo' as const,
    },
    {
      id: 'student-pedro-henrique',
      username: 'id00120088',
      name: 'Pedro Henrique Ferreira',
      email: 'pedro.henrique@tjam.estudos.com',
      password: '••••••••',
      turmaId: 'turma-tjam-2026',
      turmaName: 'Turma TJAM 2026',
      createdAt: new Date().toISOString(),
      status: 'ativo' as const,
    },
  ];

  // Open grading box
  const handleOpenGrading = (sub: StudentSubmission) => {
    setGradingSubmissionId(sub.id);
    setGradeInput(sub.grade ?? 10);
    setFeedbackInput(sub.feedback || '');
  };

  // Submit grading
  const handleSaveGrade = (submissionId: string) => {
    onGradeSubmission(submissionId, Number(gradeInput), feedbackInput);
    setGradingSubmissionId(null);
    setSaveSuccessMsg('Avaliação e nota pedagógica gravadas com sucesso!');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Filtered Question Attempts
  const filteredQuestionAttempts = questionAttempts.filter((att) => {
    if (selectedStudentFilter !== 'all' && att.studentId && att.studentId !== selectedStudentFilter) {
      return false;
    }
    if (resultFilter === 'correct' && !att.isCorrect) return false;
    if (resultFilter === 'wrong' && att.isCorrect) return false;
    if (resultFilter === 'pending') return false; // objective questions have immediate result

    const q = questionMap.get(att.questionId);
    if (selectedDisciplineFilter !== 'all' && q?.disciplineId !== selectedDisciplineFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const text = `${q?.statement || ''} ${att.studentName || ''}`.toLowerCase();
      if (!text.includes(term)) return false;
    }
    return true;
  });

  // Filtered Discursive Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    if (selectedStudentFilter !== 'all' && sub.studentId !== selectedStudentFilter) {
      return false;
    }
    if (resultFilter === 'pending' && sub.status !== 'pendente') return false;
    if (resultFilter === 'correct' && sub.status !== 'corrigido') return false;
    if (resultFilter === 'wrong') return false;
    if (selectedDisciplineFilter !== 'all' && sub.disciplineId && sub.disciplineId !== selectedDisciplineFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const text = `${sub.activityTitle} ${sub.studentName} ${sub.content}`.toLowerCase();
      if (!text.includes(term)) return false;
    }
    return true;
  });

  // Filtered Simulados
  const filteredSimulados = simuladoAttempts.filter((sim) => {
    if (selectedStudentFilter !== 'all') {
      // If student ID is encoded in attempt, filter by it
      // Default to true if not strictly filtered
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const text = `${sim.simuladoTitle}`.toLowerCase();
      if (!text.includes(term)) return false;
    }
    return true;
  });

  // Real Stats Calculations
  const totalObjCount = questionAttempts.length;
  const correctObjCount = questionAttempts.filter((a) => a.isCorrect).length;
  const accuracyRate = totalObjCount > 0 ? Math.round((correctObjCount / totalObjCount) * 100) : 0;
  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'pendente').length;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              Painel de Supervisão e Gestão de Respostas
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Respostas dos Alunos & Correções Pedagógicas
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Acompanhe em tempo real todas as alternativas marcadas, redações discursivas enviadas e simulados realizados pelos alunos. Você pode atribuir notas, redigir feedbacks e reiniciar tentativas se necessário.
            </p>
          </div>

          {/* Quick Real Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Respostas</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">{totalObjCount}</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Taxa Acerto</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{accuracyRate}%</span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">A Corrigir</span>
              <span className="text-lg font-black text-amber-600 dark:text-amber-400">{pendingSubmissionsCount}</span>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Simulados</span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{simuladoAttempts.length}</span>
            </div>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            {saveSuccessMsg}
          </div>
        )}

        {/* Filters Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Student Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Filtrar por Aluno
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <select
                value={selectedStudentFilter}
                onChange={(e) => setSelectedStudentFilter(e.target.value)}
                aria-label="Filtrar por Aluno"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">👥 Todos os Alunos Matriculados</option>
                {activeStudents.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.username || st.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Tipo de Atividade
            </label>
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                aria-label="Filtrar por Tipo de Atividade"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">📋 Todos os Tipos de Resposta</option>
                <option value="questions">📝 Questões Objetivas ({questionAttempts.length})</option>
                <option value="discursive">✍️ Discursivas & Peças ({submissions.length})</option>
                <option value="video">🎥 Videoaulas Assistidas ({videoWatchedItems.length})</option>
                <option value="anotacoes">📒 Anotações dos Alunos ({studentNotesItems.length})</option>
                <option value="simulados">🏆 Simulados Oficiais ({simuladoAttempts.length})</option>
              </select>
            </div>
          </div>

          {/* Result Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Status do Resultado
            </label>
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value as any)}
              aria-label="Filtrar por Status do Resultado"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">🔍 Todos os Resultados</option>
              <option value="correct">✅ Apenas Acertos / Aprovadas</option>
              <option value="wrong">❌ Apenas Erros</option>
              <option value="pending">⏳ Pendentes de Correção</option>
            </select>
          </div>

          {/* Search Term */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Buscar por Palavra-chave
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: Mandado, Art. 12, Pedro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: DISCURSIVE WRITTEN SUBMISSIONS */}
      {(typeFilter === 'all' || typeFilter === 'discursive') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Redações, Peças Práticas e Respostas Discursivas ({filteredSubmissions.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {filteredSubmissions.filter((s) => s.status === 'pendente').length} aguardando correção
            </span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <CheckCircle className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold text-slate-500">Nenhum envio discursivo localizado com os filtros atuais.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-slate-50 dark:bg-slate-850 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-amber-400/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-750">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-900 dark:text-white">
                          {sub.studentName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                          {sub.studentId}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          sub.status === 'corrigido'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {sub.status === 'corrigido' ? 'Corrigido ✅' : 'Pendente de Nota ⏳'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                        {sub.activityTitle} • <span className="text-amber-600 dark:text-amber-400">{sub.disciplineName}</span>
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-mono">
                        Enviado em: {sub.submittedAt}
                      </span>
                      {sub.grade !== undefined && (
                        <span className="inline-block mt-1 text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-600 text-white shadow-xs">
                          Nota: {sub.grade.toFixed(1)} / 10.0
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Student Submission Text */}
                  <div className="mt-3 bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-line">
                    {sub.content}
                  </div>

                  {/* Teacher Feedback if already graded */}
                  {sub.feedback && gradingSubmissionId !== sub.id && (
                    <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <Award className="w-3.5 h-3.5 text-emerald-600" /> Parecer da Professora Jéssica Alves:
                      </div>
                      <p>{sub.feedback}</p>
                    </div>
                  )}

                  {/* Inline Grading Form */}
                  {gradingSubmissionId === sub.id ? (
                    <div className="mt-4 p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-amber-600" /> Avaliar Redação / Resposta do Aluno
                        </span>
                        <button
                          onClick={() => setGradingSubmissionId(null)}
                          className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Nota Atribuída (0.0 a 10.0)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={gradeInput}
                            onChange={(e) => setGradeInput(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Feedback Pedagógico & Pontos a Melhorar
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Boa argumentação! Atenção à citação do art. 37 da CF/88 e clareza nos parágrafos..."
                            value={feedbackInput}
                            onChange={(e) => setFeedbackInput(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => handleSaveGrade(sub.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" /> Salvar Nota & Notificar Aluno
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleOpenGrading(sub)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        {sub.status === 'corrigido' ? 'Revisar / Alterar Nota' : 'Avaliar e Dar Nota'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: OBJECTIVE QUESTION ATTEMPTS */}
      {(typeFilter === 'all' || typeFilter === 'questions') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Respostas de Questões Objetivas ({filteredQuestionAttempts.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Taxa nesta lista: {filteredQuestionAttempts.length > 0
                ? Math.round((filteredQuestionAttempts.filter((a) => a.isCorrect).length / filteredQuestionAttempts.length) * 100)
                : 0}%
            </span>
          </div>

          {filteredQuestionAttempts.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <CheckCircle className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold text-slate-500">Nenhuma resposta objetiva encontrada com os filtros selecionados.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredQuestionAttempts.slice(0, 50).map((att) => {
                const q = questionMap.get(att.questionId);
                const disc = q?.disciplineId ? disciplineMap.get(q.disciplineId) : null;
                const studentName = att.studentName || (att.studentId ? students.find(s => s.id === att.studentId)?.name : 'Eduardo Mateus');

                return (
                  <div key={att.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {studentName}
                        </span>
                        {disc && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {disc.name}
                          </span>
                        )}
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 ${
                          att.isCorrect
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}>
                          {att.isCorrect ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-rose-600" />}
                          {att.isCorrect ? 'Acertou (+1)' : 'Errou'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(att.answeredAt).toLocaleString('pt-BR')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                        {q?.statement || `Questão #${att.questionId}`}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>Marcou: <strong className="font-mono text-slate-900 dark:text-white">{att.selectedOptionId.toUpperCase()}</strong></span>
                        {q && (
                          <span>Gabarito: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{q.correctOptionId.toUpperCase()}</strong></span>
                        )}
                        {q?.legalReference && (
                          <span className="text-amber-600 dark:text-amber-400 font-mono text-[10px]">
                            Ref: {q.legalReference}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action to reset attempt */}
                    {onResetQuestionAttempt && (
                      <div className="shrink-0 flex items-center">
                        <button
                          onClick={() => onResetQuestionAttempt(att.id)}
                          title="Permitir que o aluno refaça esta questão"
                          className="px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" /> Reiniciar Resposta
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: SIMULADOS OFICIAIS ATTEMPTS */}
      {(typeFilter === 'all' || typeFilter === 'simulados') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Simulados Oficiais Realizados pelos Alunos ({filteredSimulados.length})
              </h3>
            </div>
          </div>

          {filteredSimulados.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <Trophy className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold text-slate-500">Nenhum simulado finalizado localizado até o momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSimulados.map((sim) => (
                <div
                  key={sim.id}
                  className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {sim.simuladoTitle}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        Finalizado em: {new Date(sim.completedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`text-base font-black px-2.5 py-1 rounded-lg ${
                        sim.percentage >= 70
                          ? 'bg-emerald-600 text-white'
                          : sim.percentage >= 50
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-rose-600 text-white'
                      }`}>
                        {sim.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Acertos</span>
                      <strong className="text-emerald-600 font-mono text-sm">{sim.score}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Total Questões</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-mono text-sm">{sim.totalQuestions}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Tempo Gasto</span>
                      <strong className="text-indigo-600 font-mono text-sm">{Math.round(sim.timeSpentSeconds / 60)} min</strong>
                    </div>
                  </div>

                  {onResetSimuladoAttempt && (
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => onResetSimuladoAttempt(sim.id)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Limpar Tentativa do Aluno
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: VIDEO LESSONS ATTENDANCE */}
      {(typeFilter === 'all' || typeFilter === 'video') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-rose-500" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Frequência e Visualização de Videoaulas ({videoWatchedItems.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Sincronização em Tempo Real
            </span>
          </div>

          {videoWatchedItems.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold text-slate-500">Nenhuma videoaula marcada como assistida até o momento.</p>
              <p className="text-[11px] text-slate-400 mt-1">Assim que o aluno assistir e marcar no portal, aparecerá aqui instantaneamente.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {videoWatchedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ✓ Assistida pelo Aluno
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Concluída e registrada em: {new Date(item.watchedAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 100% Assistida
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: STUDENT PERSONAL NOTES */}
      {(typeFilter === 'all' || typeFilter === 'anotacoes') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Caderno de Anotações do Aluno ({studentNotesItems.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
              Sincronizado do Portal do Aluno
            </span>
          </div>

          {studentNotesItems.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold text-slate-500">O aluno ainda não digitou anotações no caderno desta aula.</p>
              <p className="text-[11px] text-slate-400 mt-1">Todas as anotações feitas no Caderno de Anotações são sincronizadas aqui em tempo real.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {studentNotesItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-850 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Última atualização: {new Date(item.lastUpdated).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed whitespace-pre-wrap border border-slate-200 dark:border-slate-800">
                    {item.notes}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
