import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  Scale,
  Save,
  Clock,
  Trophy,
} from 'lucide-react';
import { Question, Simulado, Discipline } from '../types';

interface TeacherQuestionsManagerProps {
  questions: Question[];
  simulados: Simulado[];
  disciplines: Discipline[];
  onAddQuestion: (q: Question) => void;
  onUpdateQuestion: (qId: string, updated: Partial<Question>) => void;
  onDeleteQuestion: (qId: string) => void;
  onAddSimulado?: (sim: Simulado) => void;
  onUpdateSimulado?: (simId: string, updates: Partial<Simulado>) => void;
  onDeleteSimulado?: (simId: string) => void;
}

export const TeacherQuestionsManager: React.FC<TeacherQuestionsManagerProps> = ({
  questions,
  simulados,
  disciplines,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddSimulado,
  onUpdateSimulado,
  onDeleteSimulado,
}) => {
  const [subTab, setSubTab] = useState<'questoes' | 'simulados'>('questoes');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Edit Simulado State
  const [editingSimulado, setEditingSimulado] = useState<Simulado | null>(null);
  const [editSimTitle, setEditSimTitle] = useState('');
  const [editSimDuration, setEditSimDuration] = useState(240);
  const [editSimDescription, setEditSimDescription] = useState('');

  // Add Question State
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [disciplineId, setDisciplineId] = useState<string>(disciplines[0]?.id || 'legislacao-tjam');
  const [topicName, setTopicName] = useState<string>('Regimento Interno do TJAM');
  const [statement, setStatement] = useState<string>('');
  const [optA, setOptA] = useState<string>('');
  const [optB, setOptB] = useState<string>('');
  const [optC, setOptC] = useState<string>('');
  const [optD, setOptD] = useState<string>('');
  const [optE, setOptE] = useState<string>('');
  const [correctOption, setCorrectOption] = useState<'a' | 'b' | 'c' | 'd' | 'e'>('a');
  const [explanation, setExplanation] = useState<string>('');
  const [legalReference, setLegalReference] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'fácil' | 'médio' | 'difícil'>('médio');

  // Edit Question State
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editStatement, setEditStatement] = useState<string>('');
  const [editExplanation, setEditExplanation] = useState<string>('');
  const [editCorrectOption, setEditCorrectOption] = useState<string>('a');
  const [editLegalRef, setEditLegalRef] = useState<string>('');

  // Add Simulado State
  const [isAddingSimulado, setIsAddingSimulado] = useState<boolean>(false);
  const [simTitle, setSimTitle] = useState<string>('');
  const [simDuration, setSimDuration] = useState<number>(240);
  const [simDescription, setSimDescription] = useState<string>('');

  const handleSaveNewQuestion = () => {
    if (!statement.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim() || !optE.trim()) {
      alert('Por favor, preencha o enunciado e todas as 5 alternativas (A, B, C, D, E).');
      return;
    }

    const disc = disciplines.find((d) => d.id === disciplineId);
    const newQ: Question = {
      id: `q-prof-${Date.now()}`,
      disciplineId,
      topicId: `${disciplineId}-topic`,
      topicName: disc?.name || 'Tópico Geral',
      statement: statement.trim(),
      options: [
        { id: 'a', text: optA.trim() },
        { id: 'b', text: optB.trim() },
        { id: 'c', text: optC.trim() },
        { id: 'd', text: optD.trim() },
        { id: 'e', text: optE.trim() },
      ],
      correctOptionId: correctOption,
      explanation: explanation.trim() || 'Gabarito oficial comentado pela Professora Jéssica Alves.',
      difficulty,
      legalReference: legalReference.trim() || 'Lei Complementar Estadual nº 17/1997',
    };

    onAddQuestion(newQ);
    setIsAddingQuestion(false);
    setStatement('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setOptE('');
    setExplanation('');
    setLegalReference('');
  };

  const handleOpenEdit = (q: Question) => {
    setEditingQuestionId(q.id);
    setEditStatement(q.statement);
    setEditExplanation(q.explanation);
    setEditCorrectOption(q.correctOptionId);
    setEditLegalRef(q.legalReference || '');
  };

  const handleSaveEditQuestion = (qId: string) => {
    onUpdateQuestion(qId, {
      statement: editStatement,
      explanation: editExplanation,
      correctOptionId: editCorrectOption,
      legalReference: editLegalRef,
    });
    setEditingQuestionId(null);
  };

  const handleSaveNewSimulado = () => {
    if (!simTitle.trim() || !onAddSimulado) return;
    const sampleQuestions = (questions || []).slice(0, 80);
    const breakdown: Record<string, number> = {};
    sampleQuestions.forEach((q) => {
      breakdown[q.disciplineId] = (breakdown[q.disciplineId] || 0) + 1;
    });
    const newSim: Simulado = {
      id: `sim-prof-${Date.now()}`,
      title: simTitle.trim(),
      description: simDescription.trim() || 'Simulado elaborado pela coordenação pedagógica do TJAM.',
      durationMinutes: simDuration || 240,
      totalQuestions: sampleQuestions.length,
      disciplineBreakdown: breakdown,
      questions: sampleQuestions,
      createdAt: new Date().toISOString(),
      status: 'active',
      passingScore: 70,
    };
    onAddSimulado(newSim);
    setIsAddingSimulado(false);
    setSimTitle('');
    setSimDescription('');
  };

  const filteredQuestions = questions.filter((q) => {
    if (selectedDiscipline !== 'all' && q.disciplineId !== selectedDiscipline) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        q.statement.toLowerCase().includes(term) ||
        q.explanation.toLowerCase().includes(term) ||
        (q.legalReference && q.legalReference.toLowerCase().includes(term))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              Banco de Itens Avaliativos
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Gestão de Questões & Simulados Oficiais
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Crie, edite ou exclua questões objetivas, cadastre gabaritos comentados com referências de leis e configure novos simulados para a turma.
            </p>
          </div>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setSubTab('questoes')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                subTab === 'questoes'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              📝 Banco de Questões ({questions.length})
            </button>
            <button
              onClick={() => setSubTab('simulados')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                subTab === 'simulados'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              🏆 Simulados ({simulados.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        {subTab === 'questoes' && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Filtrar Disciplina
              </label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                aria-label="Filtrar Disciplina"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <option value="all">Todas as Disciplinas</option>
                {disciplines.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Dificuldade
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                aria-label="Filtrar Dificuldade"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <option value="all">Todas as Dificuldades</option>
                <option value="fácil">Fácil</option>
                <option value="médio">Médio</option>
                <option value="difícil">Difícil</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Buscar Questão
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enunciado, artigo de lei, comentário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUBTAB 1: QUESTÕES */}
      {subTab === 'questoes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Mostrando {filteredQuestions.length} de {questions.length} questões cadastradas
            </span>

            <button
              onClick={() => setIsAddingQuestion(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Cadastrar Nova Questão
            </button>
          </div>

          {/* Add Question Form */}
          {isAddingQuestion && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border-2 border-emerald-500/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" /> Nova Questão Objetiva para o Banco
                </h3>
                <button
                  onClick={() => setIsAddingQuestion(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Disciplina
                  </label>
                  <select
                    value={disciplineId}
                    onChange={(e) => setDisciplineId(e.target.value)}
                    aria-label="Disciplina da Questão"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  >
                    {disciplines.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tópico / Assunto
                  </label>
                  <input
                    type="text"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Dificuldade
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    aria-label="Dificuldade da Questão"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  >
                    <option value="fácil">Fácil</option>
                    <option value="médio">Médio</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enunciado da Questão
                </label>
                <textarea
                  rows={3}
                  placeholder="Digite o enunciado completo da questão com a situação-problema..."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* 5 Options */}
              <div className="space-y-2">
                <span className="block text-[11px] font-black text-slate-700 dark:text-slate-300">
                  Alternativas (Assinale o gabarito correto)
                </span>

                {[
                  { id: 'a', val: optA, setVal: setOptA },
                  { id: 'b', val: optB, setVal: setOptB },
                  { id: 'c', val: optC, setVal: setOptC },
                  { id: 'd', val: optD, setVal: setOptD },
                  { id: 'e', val: optE, setVal: setOptE },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCorrectOption(item.id as any)}
                      className={`w-8 h-8 rounded-lg font-black text-xs shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                        correctOption === item.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.id.toUpperCase()}
                    </button>
                    <input
                      type="text"
                      placeholder={`Texto da Alternativa ${item.id.toUpperCase()}`}
                      value={item.val}
                      onChange={(e) => item.setVal(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Comentário Pedagógico / Justificativa do Gabarito
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Explicação didática que o aluno lerá após resolver a questão..."
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Dispositivo Legal / Referência Normativa
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Art. 12, § 2º da LC 17/1997"
                    value={legalReference}
                    onChange={(e) => setLegalReference(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleSaveNewQuestion}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Salvar e Disponibilizar no Portal do Aluno
                </button>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const disc = disciplines.find((d) => d.id === q.disciplineId);
              const isEditing = editingQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        {disc?.name || q.disciplineId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'fácil'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          : q.difficulty === 'médio'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {q.difficulty?.toUpperCase()}
                      </span>
                      {q.legalReference && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {q.legalReference}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(q)}
                        className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
                        title="Editar Questão"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteQuestion(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                        title="Excluir Questão"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3 pt-2">
                      <textarea
                        rows={3}
                        value={editStatement}
                        onChange={(e) => setEditStatement(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                      />
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-bold">Gabarito:</label>
                        {['a', 'b', 'c', 'd', 'e'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setEditCorrectOption(opt)}
                            className={`w-7 h-7 rounded text-xs font-black ${
                              editCorrectOption === opt ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {opt.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={editLegalRef}
                        onChange={(e) => setEditLegalRef(e.target.value)}
                        placeholder="Referência legal"
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                      />
                      <textarea
                        rows={2}
                        value={editExplanation}
                        onChange={(e) => setEditExplanation(e.target.value)}
                        placeholder="Comentário do gabarito"
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSaveEditQuestion(q.id)}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                        >
                          Salvar Alterações
                        </button>
                        <button
                          onClick={() => setEditingQuestionId(null)}
                          className="px-2 py-1 text-slate-400 text-xs"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                        {q.statement}
                      </p>

                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        {q.options.map((opt) => {
                          const isCorrect = opt.id === q.correctOptionId;
                          return (
                            <div
                              key={opt.id}
                              className={`px-3 py-2 rounded-lg text-xs flex items-center gap-2 ${
                                isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold border border-emerald-300 dark:border-emerald-700'
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
                              }`}>
                                {opt.id.toUpperCase()}
                              </span>
                              <span>{opt.text}</span>
                              {isCorrect && (
                                <span className="ml-auto text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                                  Gabarito Oficial ✅
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          <strong className="text-slate-900 dark:text-white font-bold block mb-0.5">Comentário Didático:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: SIMULADOS */}
      {subTab === 'simulados' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              {simulados.length} simulados ativos disponíveis para a turma
            </span>

            {onAddSimulado && (
              <button
                onClick={() => setIsAddingSimulado(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Criar Novo Simulado Oficial
              </button>
            )}
          </div>

          {/* Add Simulado Box */}
          {isAddingSimulado && (
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-amber-500/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" /> Cadastrar Novo Simulado Geral
                </h3>
                <button
                  onClick={() => setIsAddingSimulado(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Título do Simulado
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Simulado Geral TJAM 2026 - Padrão FGV nº 02"
                    value={simTitle}
                    onChange={(e) => setSimTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tempo Cronometrado (minutos)
                  </label>
                  <input
                    type="number"
                    value={simDuration}
                    onChange={(e) => setSimDuration(parseInt(e.target.value) || 240)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição e Orientações aos Alunos
                </label>
                <input
                  type="text"
                  placeholder="Ex: Prova objetiva de 80 questões sem consulta, simulando fielmente as 4 horas de prova da FGV..."
                  value={simDescription}
                  onChange={(e) => setSimDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleSaveNewSimulado}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Criar Simulado para a Turma
                </button>
              </div>
            </div>
          )}

          {/* Simulados Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {simulados.map((sim) => (
              <div
                key={sim.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                      Simulado Oficial
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white mt-1.5">
                      {sim.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1">
                    {onUpdateSimulado && (
                      <button
                        onClick={() => {
                          setEditingSimulado(sim);
                          setEditSimTitle(sim.title);
                          setEditSimDuration(sim.durationMinutes);
                          setEditSimDescription(sim.description);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                        title="Editar Simulado"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                    {onDeleteSimulado && (
                      <button
                        onClick={() => {
                          if (confirm(`Excluir o simulado "${sim.title}"?`)) {
                            onDeleteSimulado(sim.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Excluir Simulado"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {sim.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {sim.durationMinutes} min</span>
                  <span>{sim.questions.length} questões</span>
                  <span className="text-emerald-600 font-bold ml-auto">Liberado para a Turma ✅</span>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Simulado Modal */}
          {editingSimulado && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" /> Editar Simulado Oficial
                  </h3>
                  <button
                    onClick={() => setEditingSimulado(null)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Fechar
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Título do Simulado</label>
                    <input
                      type="text"
                      value={editSimTitle}
                      onChange={(e) => setEditSimTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Duração (minutos)</label>
                    <input
                      type="number"
                      value={editSimDuration}
                      onChange={(e) => setEditSimDuration(parseInt(e.target.value) || 240)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Descrição e Orientações</label>
                    <textarea
                      rows={3}
                      value={editSimDescription}
                      onChange={(e) => setEditSimDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-semibold outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setEditingSimulado(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (!editSimTitle.trim() || !onUpdateSimulado) return;
                      onUpdateSimulado(editingSimulado.id, {
                        title: editSimTitle.trim(),
                        durationMinutes: editSimDuration,
                        description: editSimDescription.trim(),
                      });
                      setEditingSimulado(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
