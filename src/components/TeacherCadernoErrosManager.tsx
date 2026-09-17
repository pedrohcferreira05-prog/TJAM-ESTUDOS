import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Edit3,
  Trash2,
  Save,
  MessageSquare,
  Award,
} from 'lucide-react';
import { Question, Discipline } from '../types';

interface TeacherCadernoErrosManagerProps {
  questions: Question[];
  disciplines: Discipline[];
  errorQuestionIds?: string[];
  questionAttempts?: Array<{
    id: string;
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
    answeredAt: string;
    studentName?: string;
  }>;
  onResetQuestionAttempt?: (questionId: string) => void;
  onUpdateQuestion?: (questionId: string, updates: Partial<Question>) => void;
  isDarkMode?: boolean;
}

export const TeacherCadernoErrosManager: React.FC<TeacherCadernoErrosManagerProps> = ({
  questions,
  disciplines,
  errorQuestionIds = [],
  questionAttempts = [],
  onResetQuestionAttempt,
  onUpdateQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('all');

  // Teacher Pedagogical Advice Editing
  const [editingTipQuestionId, setEditingTipQuestionId] = useState<string | null>(null);
  const [pedagogicalTip, setPedagogicalTip] = useState<string>('');

  // Collect error questions: either from errorQuestionIds or from incorrect questionAttempts
  const failedAttemptQuestionIds = questionAttempts
    .filter((a) => !a.isCorrect)
    .map((a) => a.questionId);

  const allRelevantErrorIds = Array.from(
    new Set([...errorQuestionIds, ...failedAttemptQuestionIds])
  );

  // If there are no error records yet, take sample difficult questions so teacher can manage tips proactively
  const errorQuestions = questions.filter(
    (q) =>
      allRelevantErrorIds.includes(q.id) ||
      q.difficulty === 'difícil' ||
      allRelevantErrorIds.length === 0
  );

  const filteredQuestions = errorQuestions.filter((q) => {
    const matchesSearch =
      q.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topicName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDisc =
      selectedDisciplineId === 'all' || q.disciplineId === selectedDisciplineId;

    return matchesSearch && matchesDisc;
  });

  const handleOpenEditTip = (q: Question) => {
    setEditingTipQuestionId(q.id);
    setPedagogicalTip(q.explanation || '');
  };

  const handleSaveTip = (qId: string) => {
    if (!pedagogicalTip.trim()) return;
    if (onUpdateQuestion) {
      onUpdateQuestion(qId, { explanation: pedagogicalTip.trim() });
    }
    setEditingTipQuestionId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Paridade Total com o Portal do Aluno
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
            Gestão Pedagógica do Caderno de Erros dos Alunos
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Aqui você analisa as questões que os alunos mais erraram na rotina de estudo. Você pode adicionar orientações personalizadas ("Dicas de Ouro da Professora"), explicar pegadinhas da banca FGV e resetar o status de erro para novas tentativas.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center">
            <span className="text-[10px] font-black uppercase text-rose-600 block">Questões Monitoradas</span>
            <span className="text-xl font-black text-rose-950">{errorQuestions.length}</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar questão por enunciado, comentário ou artigo de lei..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all"
          />
        </div>

        <select
          value={selectedDisciplineId}
          onChange={(e) => setSelectedDisciplineId(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-rose-500 shrink-0"
        >
          <option value="all">Todas as Matérias</option>
          {disciplines.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const disc = disciplines.find((d) => d.id === q.disciplineId);
          const isEditingTip = editingTipQuestionId === q.id;

          // Check if any student failed this question
          const studentFailures = questionAttempts.filter(
            (a) => a.questionId === q.id && !a.isCorrect
          );

          return (
            <div
              key={q.id}
              className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-4 hover:border-rose-300 transition-all"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-extrabold uppercase">
                    {disc?.name || q.topicName}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">• {q.topicName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-extrabold uppercase border border-rose-200">
                    Dificuldade: {q.difficulty || 'Difícil'}
                  </span>
                  {studentFailures.length > 0 && (
                    <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-black">
                      {studentFailures.length} {studentFailures.length === 1 ? 'Erro Registrado' : 'Erros Registrados'}
                    </span>
                  )}
                </div>
              </div>

              {/* Statement */}
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                {q.statement}
              </p>

              {/* Alternatives Summary */}
              <div className="space-y-1.5 pt-1">
                {q.options.map((opt) => {
                  const isCorrect = opt.id === q.correctOptionId;
                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl text-xs flex items-center gap-2.5 border ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold'
                          : 'bg-slate-50/70 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-black text-[10px] uppercase shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="truncate">{opt.text}</span>
                      {isCorrect && (
                        <span className="ml-auto text-[10px] font-extrabold text-emerald-700 uppercase">
                          Gabarito Oficial
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Teacher Pedagogical Guidance Section */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Orientação Pedagógica & Análise da Armadilha FGV:
                  </span>

                  {!isEditingTip && (
                    <button
                      onClick={() => handleOpenEditTip(q)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-800 text-[11px] font-bold hover:bg-amber-100 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Editar Orientação
                    </button>
                  )}
                </div>

                {isEditingTip ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      rows={3}
                      value={pedagogicalTip}
                      onChange={(e) => setPedagogicalTip(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-amber-300 bg-white text-xs text-slate-900 outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingTipQuestionId(null)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveTip(q.id)}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Salvar Orientação
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {q.explanation || 'Nenhuma orientação pedagógica cadastrada ainda.'}
                  </p>
                )}

                {q.legalReference && (
                  <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-amber-200">
                    <strong>Base Legal:</strong> {q.legalReference}
                  </div>
                )}
              </div>

              {/* Reset Error Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-500">
                  Caderno sincronizado em tempo real com o portal dos alunos.
                </span>

                {onResetQuestionAttempt && (
                  <button
                    onClick={() => {
                      if (confirm('Deseja resetar o status de erro desta questão para que os alunos possam refazê-la limpa?')) {
                        onResetQuestionAttempt(q.id);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Resetar Erro da Questão
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
