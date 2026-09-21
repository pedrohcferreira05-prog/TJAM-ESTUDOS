import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Search,
  Filter,
  Save,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
  AlertCircle,
  Award,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Eye,
  RefreshCw,
  Send,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { ALL_LESSONS_CATALOG, LessonCatalogItem } from '../data/allLessonsCatalog';
import {
  saveLessonProgressToFirestore,
  saveTeacherCorrectionToLessonProgress,
  saveStudentSubmissionToFirestore,
  gradeStudentSubmissionInFirestore,
  subscribeToAllLessonProgress
} from '../lib/firestoreService';
import { StudentSubmission, Turma } from '../types';

interface TeacherLessonRealtimeInspectorProps {
  turmas?: Turma[];
  submissions?: StudentSubmission[];
  onGradeSubmission?: (id: string, grade: number, feedback: string) => void;
  initialSelectedLessonId?: string;
  onOpenLessonContent?: (lessonId: string) => void;
}

export const TeacherLessonRealtimeInspector: React.FC<TeacherLessonRealtimeInspectorProps> = ({
  turmas = [],
  submissions = [],
  onGradeSubmission,
  initialSelectedLessonId = 'legislacao_tjam',
  onOpenLessonContent,
}) => {
  // 1. Current selected lesson
  const [selectedLessonId, setSelectedLessonId] = useState<string>(initialSelectedLessonId);

  // 2. All lessons real-time progress map from Firestore: { [userId]: { [subjectKey]: lessonData } }
  const [allProgressByStudent, setAllProgressByStudent] = useState<Record<string, Record<string, any>>>({});
  const [isSyncing, setIsSyncing] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('pt-BR'));

  // 3. Current selected student
  const [selectedStudentId, setSelectedStudentId] = useState<string>('id00120087');

  // 4. Filter tab within the lesson: 'discursive' | 'mc' | 'all' | 'checklist'
  const [activeTab, setActiveTab] = useState<'discursive' | 'mc' | 'checklist' | 'all'>('discursive');

  // 5. Form editing state for discursive grading: { [questionId]: { grade: string, feedback: string, editedText: string } }
  const [discursiveForms, setDiscursiveForms] = useState<Record<number, { grade: string; feedback: string; notes: string }>>({});
  const [savingQuestionId, setSavingQuestionId] = useState<number | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // 6. Search query for questions
  const [searchFilter, setSearchFilter] = useState('');

  // Pre-populated known students list combining turmas and primary mock students
  const knownStudents = useMemo(() => {
    const list: Array<{ id: string; name: string; email?: string; matricula?: string }> = [
      { id: 'id00120087', name: 'Eduardo Mateus', email: 'eduardo@aluno.tjam.jus.br', matricula: 'TJ-2026-087' },
      { id: 'student-pedro-henrique', name: 'Pedro Henrique Ferreira', email: 'pedro@aluno.tjam.jus.br', matricula: 'TJ-2026-042' },
      { id: 'student-sofia-lima', name: 'Sofia Lima Mendes', email: 'sofia@aluno.tjam.jus.br', matricula: 'TJ-2026-103' },
    ];

    turmas.forEach((t) => {
      (t.students || []).forEach((st) => {
        if (!list.some((existing) => existing.id === st.id)) {
          list.push({
            id: st.id,
            name: st.name,
            email: st.email,
            matricula: st.matricula || `TJ-${st.id.substring(0, 6)}`,
          });
        }
      });
    });

    return list;
  }, [turmas]);

  // Subscribe in real-time to Firestore lesson_progress collection
  useEffect(() => {
    setIsSyncing(true);
    const unsubscribe = subscribeToAllLessonProgress((data) => {
      setAllProgressByStudent(data);
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
    });

    // Also check local storage fallback
    try {
      const localLessons = localStorage.getItem('tjam_lessons_progress');
      if (localLessons) {
        const parsed = JSON.parse(localLessons);
        setAllProgressByStudent((prev) => ({
          ...prev,
          id00120087: {
            ...(prev['id00120087'] || {}),
            ...parsed,
          },
        }));
      }
    } catch (e) {
      console.warn(e);
    }

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Update selected lesson if parent prop changes
  useEffect(() => {
    if (initialSelectedLessonId) {
      setSelectedLessonId(initialSelectedLessonId);
    }
  }, [initialSelectedLessonId]);

  // Get active lesson catalog item
  const currentLesson: LessonCatalogItem = useMemo(() => {
    return ALL_LESSONS_CATALOG.find((l) => l.id === selectedLessonId) || ALL_LESSONS_CATALOG[0];
  }, [selectedLessonId]);

  // Get student data for this specific lesson
  const currentStudentLessonData = useMemo(() => {
    const studentStore = allProgressByStudent[selectedStudentId] || {};
    return studentStore[selectedLessonId] || {};
  }, [allProgressByStudent, selectedStudentId, selectedLessonId]);

  // Objective answers saved by student: { [qIndex]: selectedOptionIndex }
  const studentMcAnswers: Record<number, number> = useMemo(() => {
    return currentStudentLessonData.userAnswers || {};
  }, [currentStudentLessonData]);

  // Discursive answers saved by student: { [qId]: text }
  const studentDiscursiveAnswers: Record<number, string> = useMemo(() => {
    const answers: Record<number, string> = {};
    if (currentStudentLessonData.discursiveAnswers) {
      Object.assign(answers, currentStudentLessonData.discursiveAnswers);
    }

    // Also check matching submissions passed as props
    submissions.forEach((sub) => {
      if (sub.studentId === selectedStudentId && sub.type === 'discursive') {
        if (sub.title?.toLowerCase().includes(currentLesson.id) || sub.title?.toLowerCase().includes(currentLesson.disciplineName.toLowerCase())) {
          answers[1] = sub.content || answers[1] || '';
        }
      }
    });

    // Default sample for demo if empty for primary student
    if (selectedStudentId === 'id00120087' && Object.keys(answers).length === 0) {
      if (selectedLessonId === 'direito_const') {
        answers[1] = 'Os Fundamentos (Art. 1º) são a base principiológica do Estado Brasileiro, como Soberania e Dignidade da Pessoa Humana. Já os Objetivos (Art. 3º) são as metas que o país busca realizar, iniciando com verbos de ação como Erradicar a pobreza e Garantir o desenvolvimento nacional.';
        answers[2] = 'A separação dos poderes (Art. 2º) estabelece que Legislativo, Executivo e Judiciário são independentes (sem subordinação funcional) e harmônicos (cooperam entre si e exercem freios e contrapesos mútuos).';
      } else if (selectedLessonId === 'ingles') {
        answers[1] = 'Good morning, my name is Eduardo. I am an Assistant at the Justice Court. Nice to meet you!';
      } else if (selectedLessonId === 'legislacao_tjam') {
        answers[1] = 'A Lei Complementar nº 261/2023 estrutura o plano de cargos, carreiras e remunerações dos servidores do TJAM, garantindo eficiência processual, valorização funcional e modernização da prestação jurisdicional no Amazonas.';
      }
    }

    return answers;
  }, [currentStudentLessonData, submissions, selectedStudentId, currentLesson, selectedLessonId]);

  // Teacher corrections already saved
  const savedCorrections: Record<number, { grade?: number; feedback?: string; notes?: string; status?: string }> = useMemo(() => {
    return currentStudentLessonData.teacherCorrections || {};
  }, [currentStudentLessonData]);

  // Initialize form fields when student or lesson changes
  useEffect(() => {
    const newForms: Record<number, { grade: string; feedback: string; notes: string }> = {};
    currentLesson.discursiveQuestions.forEach((q) => {
      const existing = savedCorrections[q.id];
      newForms[q.id] = {
        grade: existing?.grade !== undefined ? String(existing.grade) : '',
        feedback: existing?.feedback || '',
        notes: existing?.notes || '',
      };
    });
    setDiscursiveForms(newForms);
  }, [currentLesson, savedCorrections, selectedStudentId]);

  // Calculate stats for this student in this lesson
  const stats = useMemo(() => {
    const totalMc = currentLesson.mcQuestions.length;
    let answeredMc = 0;
    let correctMc = 0;

    currentLesson.mcQuestions.forEach((q, idx) => {
      const ans = studentMcAnswers[idx];
      if (ans !== undefined) {
        answeredMc++;
        if (ans === q.correta) {
          correctMc++;
        }
      }
    });

    const totalDiscursive = currentLesson.discursiveQuestions.length;
    let answeredDiscursive = 0;
    currentLesson.discursiveQuestions.forEach((q) => {
      if (studentDiscursiveAnswers[q.id]?.trim()) {
        answeredDiscursive++;
      }
    });

    const isCompleted = currentStudentLessonData.isCompleted || false;
    const completedAt = currentStudentLessonData.completedAt || null;

    return {
      totalMc,
      answeredMc,
      correctMc,
      accuracyMc: answeredMc > 0 ? Math.round((correctMc / answeredMc) * 100) : 0,
      totalDiscursive,
      answeredDiscursive,
      isCompleted,
      completedAt,
    };
  }, [currentLesson, studentMcAnswers, studentDiscursiveAnswers, currentStudentLessonData]);

  // Handle saving teacher correction in real time
  const handleSaveCorrection = async (questionId: number) => {
    const form = discursiveForms[questionId];
    if (!form) return;

    setSavingQuestionId(questionId);
    const numGrade = form.grade ? parseFloat(form.grade) : 10;
    const feedback = form.feedback.trim() || 'Resposta corrigida e validada pelo professor com sucesso.';

    try {
      // 1. Save directly to Firestore lesson_progress
      await saveTeacherCorrectionToLessonProgress(selectedStudentId, selectedLessonId, {
        questionId,
        grade: numGrade,
        feedback,
        teacherNotes: form.notes,
        status: 'corrigido',
      });

      // 2. Also save to submissions collection if applicable
      const subTitle = `${currentLesson.title} — Discursiva Q${questionId}`;
      const matchingSub = (submissions || []).find(
        (s) => s.studentId === selectedStudentId && s.activityTitle?.includes(currentLesson.disciplineName)
      );

      if (matchingSub && onGradeSubmission) {
        onGradeSubmission(matchingSub.id, numGrade, feedback);
      } else {
        await saveStudentSubmissionToFirestore({
          id: `sub-corr-${Date.now()}`,
          studentId: selectedStudentId,
          studentName: knownStudents.find((s) => s.id === selectedStudentId)?.name || 'Aluno TJAM',
          turmaId: 'turma-tjam-2026',
          activityTitle: subTitle,
          disciplineName: currentLesson.disciplineName,
          content: studentDiscursiveAnswers[questionId] || 'Resposta da aula',
          submittedAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          status: 'corrigido',
          grade: numGrade,
          feedback,
        });
      }

      // 3. Update local state
      setAllProgressByStudent((prev) => {
        const studentStore = prev[selectedStudentId] || {};
        const lessonData = studentStore[selectedLessonId] || {};
        const corrections = lessonData.teacherCorrections || {};
        return {
          ...prev,
          [selectedStudentId]: {
            ...studentStore,
            [selectedLessonId]: {
              ...lessonData,
              teacherCorrections: {
                ...corrections,
                [questionId]: {
                  questionId,
                  grade: numGrade,
                  feedback,
                  notes: form.notes,
                  status: 'corrigido',
                  gradedAt: new Date().toISOString(),
                },
              },
            },
          },
        };
      });

      setSaveSuccessMsg(`Correção da Questão ${questionId} gravada em tempo real com sucesso!`);
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Erro ao salvar correção:', err);
      alert('Houve um erro ao sincronizar com o Firestore. Tente novamente.');
    } finally {
      setSavingQuestionId(null);
    }
  };

  // Reset student answer for a specific multiple-choice question so they can retry
  const handleResetMcQuestion = async (qIndex: number) => {
    if (!confirm(`Deseja limpar a resposta do aluno para a questão ${qIndex + 1}? Ele poderá responder novamente no portal.`)) {
      return;
    }

    const updatedAnswers = { ...studentMcAnswers };
    delete updatedAnswers[qIndex];

    const studentStore = allProgressByStudent[selectedStudentId] || {};
    const lessonData = studentStore[selectedLessonId] || {};
    const newLessonData = {
      ...lessonData,
      userAnswers: updatedAnswers,
    };

    const newStore = {
      ...studentStore,
      [selectedLessonId]: newLessonData,
    };

    setAllProgressByStudent((prev) => ({
      ...prev,
      [selectedStudentId]: newStore,
    }));

    await saveLessonProgressToFirestore(newStore, selectedStudentId);
    setSaveSuccessMsg(`Questão ${qIndex + 1} liberada para o aluno refazer!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6" id="teacher-lesson-realtime-inspector">
      {/* 1. REAL-TIME HEADER & BARRA DE SINCRONIZAÇÃO */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-700/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Tempo Real Ativo
              </span>
              <span className="text-xs text-blue-200">
                Última sincronização: {lastSyncTime}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-amber-400" />
              Painel de Acompanhamento & Correção das Aulas
            </h2>
            <p className="text-sm text-blue-100 max-w-3xl">
              Visualize em tempo real as respostas reais dos alunos (questões objetivas e discursivas), avalie, edite, atribua notas e devolva feedback pedagógico instantâneo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsSyncing(true);
                setTimeout(() => {
                  setIsSyncing(false);
                  setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
                }, 600);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium flex items-center gap-2 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
              Sincronizar Agora
            </button>
            {onOpenLessonContent && (
              <button
                onClick={() => onOpenLessonContent(selectedLessonId)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition shadow-md"
              >
                <Eye className="w-3.5 h-3.5" />
                Ver Conteúdo Completo
              </button>
            )}
          </div>
        </div>

        {/* NOTIFICAÇÃO DE SUCESSO */}
        {saveSuccessMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* 2. SELETOR DE AULAS DO CRONOGRAMA */}
        <div className="mt-6 pt-5 border-t border-white/15">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-200 mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Selecione a Aula para Inspecionar (Todas as 11 aulas cadastradas):
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {ALL_LESSONS_CATALOG.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-2 shrink-0 border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg scale-105'
                      : lesson.isPriorityToday
                      ? 'bg-blue-800/80 text-white border-blue-500/60 hover:bg-blue-700'
                      : 'bg-white/10 text-blue-100 border-white/10 hover:bg-white/20'
                  }`}
                >
                  <span className="text-sm">{lesson.emoji}</span>
                  <span>{lesson.badge}</span>
                  {lesson.isPriorityToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. CONTROLES: SELEÇÃO DE ALUNO & FILTROS */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* SELETOR DE ALUNO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Aluno Selecionado:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="mt-0.5 text-sm font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {knownStudents.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.matricula || st.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ESTATÍSTICAS DO ALUNO NESTA AULA */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Status da Aula</span>
            <span className={`text-xs font-bold ${stats.isCompleted ? 'text-emerald-600' : stats.answeredMc > 0 ? 'text-amber-600' : 'text-slate-500'}`}>
              {stats.isCompleted ? '✅ Concluída' : stats.answeredMc > 0 ? '⏳ Em Andamento' : '⚪ Não Iniciada'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Objetivas Feitas</span>
            <span className="text-xs font-bold text-slate-800">
              {stats.answeredMc} / {stats.totalMc}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Acertos Objetivas</span>
            <span className="text-xs font-bold text-emerald-600">
              {stats.correctMc} ({stats.accuracyMc}%)
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Discursivas</span>
            <span className="text-xs font-bold text-indigo-600">
              {stats.answeredDiscursive} / {stats.totalDiscursive}
            </span>
          </div>
        </div>
      </div>

      {/* 4. TÍTULO E DETALHES DA AULA ATIVA */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950">
              {currentLesson.badge}
            </span>
            <span className="text-xs text-slate-300">
              {currentLesson.disciplineName} • {currentLesson.duration}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{currentLesson.emoji}</span>
            <span>{currentLesson.title}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {currentLesson.summary}
          </p>
        </div>

        {/* ABAS DO VISUALIZADOR */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 shrink-0">
          <button
            onClick={() => setActiveTab('discursive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'discursive'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Discursivas ({currentLesson.discursiveQuestions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('mc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'mc'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Objetivas ({currentLesson.mcQuestions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Resumo da Aula</span>
          </button>
        </div>
      </div>

      {/* 5. CONTEÚDO PRINCIPAL DE CORREÇÃO CONFORME ABA SELECIONADA */}

      {/* ======================================================== */}
      {/* ABA: QUESTÕES DISCURSIVAS & CORREÇÃO PELO PROFESSOR      */}
      {/* ======================================================== */}
      {activeTab === 'discursive' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Questões Discursivas da Aula — Respostas Reais do Aluno & Correção
            </h4>
            <span className="text-xs text-slate-500">
              As notas e pareceres gravados são sincronizados em tempo real com o portal do aluno.
            </span>
          </div>

          {currentLesson.discursiveQuestions.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-medium">Esta aula não possui questões discursivas cadastradas.</p>
            </div>
          ) : (
            currentLesson.discursiveQuestions.map((q, idx) => {
              const studentAnswer = studentDiscursiveAnswers[q.id];
              const form = discursiveForms[q.id] || { grade: '', feedback: '', notes: '' };
              const isSaved = savedCorrections[q.id]?.status === 'corrigido';
              const currentGrade = savedCorrections[q.id]?.grade;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* CABEÇALHO DA DISCURSIVA */}
                  <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold">
                        Questão Discursiva #{idx + 1}
                      </span>
                      {studentAnswer ? (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Respondida pelo Aluno
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          Pendente de Resposta pelo Aluno
                        </span>
                      )}
                      {isSaved && (
                        <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-blue-600" />
                          Nota Atribuída: {currentGrade} / 10
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-500">
                      Critério FGV: Domínio técnico, vocabulário formal e clareza de fundamentação.
                    </div>
                  </div>

                  {/* ENUNCIADO E GABARITO OFICIAL */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h5 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">
                        Enunciado da Questão:
                      </h5>
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        {q.enunciado}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold uppercase text-indigo-600 tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Gabarito & Padrão de Resposta Esperado (Banca):
                      </h5>
                      <p className="text-xs text-slate-600 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 leading-relaxed">
                        {q.respostaEsperada || q.respostaPadrao || 'Padrão de resposta da banca examinadora.'}
                      </p>
                    </div>

                    {/* RESPOSTA REAL DO ALUNO */}
                    <div className="pt-2">
                      <h5 className="text-xs font-bold uppercase text-emerald-700 tracking-wider mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          Texto Real Digitado pelo Aluno ({knownStudents.find((s) => s.id === selectedStudentId)?.name}):
                        </span>
                        {studentAnswer && (
                          <span className="text-[11px] font-normal text-slate-500">
                            {studentAnswer.length} caracteres • {studentAnswer.trim().split(/\s+/).length} palavras
                          </span>
                        )}
                      </h5>

                      {studentAnswer ? (
                        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                          {studentAnswer}
                        </div>
                      ) : (
                        <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-800 text-xs italic flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>O aluno ainda não digitou sua resposta no portal para esta questão da aula. Você pode registrar notas preliminares ou aguardar o envio.</span>
                        </div>
                      )}
                    </div>

                    {/* PAINEL DE AVALIAÇÃO, NOTA E FEEDBACK DO PROFESSOR */}
                    <div className="mt-5 p-5 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl border border-indigo-200/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <h6 className="text-xs font-bold uppercase text-indigo-900 tracking-wider flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-500" />
                          Painel do Professor — Avaliação Pedagógica & Correção em Tempo Real
                        </h6>
                        <span className="text-[11px] text-indigo-700 font-semibold">
                          Salva no Firestore instantaneamente
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="sm:col-span-1">
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Nota (0.0 a 10.0):
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="10"
                            placeholder="Ex: 9.5"
                            value={form.grade}
                            onChange={(e) => {
                              const val = e.target.value;
                              setDiscursiveForms((prev) => ({
                                ...prev,
                                [q.id]: { ...(prev[q.id] || { grade: '', feedback: '', notes: '' }), grade: val },
                              }));
                            }}
                            className="w-full text-base font-bold text-indigo-950 bg-white border border-indigo-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Feedback Pedagógico & Comentários da Correção:
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Digite aqui as orientações para o aluno, pontos fortes e o que precisa ser ajustado..."
                            value={form.feedback}
                            onChange={(e) => {
                              const val = e.target.value;
                              setDiscursiveForms((prev) => ({
                                ...prev,
                                [q.id]: { ...(prev[q.id] || { grade: '', feedback: '', notes: '' }), feedback: val },
                              }));
                            }}
                            className="w-full text-xs text-slate-800 bg-white border border-indigo-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-indigo-100">
                        <div className="text-[11px] text-slate-500">
                          {isSaved ? '✅ Já avaliada pelo professor' : '⏳ Aguardando confirmação do professor'}
                        </div>

                        <button
                          onClick={() => handleSaveCorrection(q.id)}
                          disabled={savingQuestionId === q.id}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition disabled:opacity-50"
                        >
                          {savingQuestionId === q.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Gravando no Firestore...
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              Gravar Avaliação & Nota (Tempo Real)
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* ABA: QUESTÕES OBJETIVAS & RESPOSTAS REAIS DO ALUNO       */}
      {/* ======================================================== */}
      {activeTab === 'mc' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Respostas Reais das Questões Objetivas (Total: {currentLesson.mcQuestions.length})
              </h4>
              <p className="text-xs text-slate-500">
                Veja a opção exata marcada pelo aluno, acertos, erros e o gabarito oficial com fundamentação.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filtrar questões..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentLesson.mcQuestions
              .filter((q) => {
                if (!searchFilter.trim()) return true;
                return (
                  q.enunciado.toLowerCase().includes(searchFilter.toLowerCase()) ||
                  q.explicacao.toLowerCase().includes(searchFilter.toLowerCase())
                );
              })
              .map((q, idx) => {
                const studentAnsIndex = studentMcAnswers[idx];
                const hasAnswered = studentAnsIndex !== undefined;
                const isCorrect = hasAnswered && studentAnsIndex === q.correta;

                return (
                  <div
                    key={q.id || idx}
                    className={`bg-white rounded-2xl border p-5 shadow-sm transition ${
                      !hasAnswered
                        ? 'border-slate-200'
                        : isCorrect
                        ? 'border-emerald-300 bg-emerald-50/10'
                        : 'border-rose-300 bg-rose-50/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">
                          Questão #{idx + 1}
                        </span>

                        {!hasAnswered ? (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            Não respondida ainda
                          </span>
                        ) : isCorrect ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Aluno Acertou (+1.0)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            Aluno Errou
                          </span>
                        )}
                      </div>

                      {hasAnswered && (
                        <button
                          onClick={() => handleResetMcQuestion(idx)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Permitir Refazer
                        </button>
                      )}
                    </div>

                    {/* ENUNCIADO */}
                    <p className="text-sm font-semibold text-slate-800 mb-4 leading-relaxed">
                      {q.enunciado}
                    </p>

                    {/* ALTERNATIVAS */}
                    <div className="space-y-2 mb-4">
                      {(q.alternativas || q.opcoes || []).map((alt, altIdx) => {
                        const isStudentPick = studentAnsIndex === altIdx;
                        const isCorrectOption = altIdx === q.correta;

                        let styleClasses = 'border-slate-200 bg-slate-50 text-slate-700';

                        if (isCorrectOption) {
                          styleClasses = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                        }
                        if (isStudentPick && !isCorrectOption) {
                          styleClasses = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                        }

                        return (
                          <div
                            key={altIdx}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${styleClasses}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                                {String.fromCharCode(65 + altIdx)}
                              </span>
                              <span>{alt}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {isStudentPick && (
                                <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                                  Marcada pelo Aluno
                                </span>
                              )}
                              {isCorrectOption && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                                  Gabarito Oficial
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* EXPLICAÇÃO DO GABARITO */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800 mr-1">Fundamentação:</span>
                      {q.explicacao}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ABA: RESUMO PEDAGÓGICO & CONTEÚDO DA AULA               */}
      {/* ======================================================== */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Pontos Principais & Diretrizes Desta Aula
            </h4>

            <div className="space-y-2.5">
              {currentLesson.summaryPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Flashcards da Aula ({currentLesson.flashcards.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentLesson.flashcards.slice(0, 8).map((fc, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-indigo-900 block">Q: {fc.q}</span>
                  <span className="text-slate-600 block leading-relaxed">A: {fc.a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
