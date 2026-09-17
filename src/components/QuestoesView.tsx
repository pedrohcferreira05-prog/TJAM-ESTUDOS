import React, { useState, useMemo } from 'react';
import { Question, UserProgress } from '../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Filter,
  Search,
  BookOpen,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Check,
  Scale
} from 'lucide-react';
import { ALL_SUBJECTS } from './MateriasPortalView';

interface QuestoesViewProps {
  questions: Question[];
  progress: UserProgress;
  onAnswerQuestion: (questionId: string, optionId: string) => void;
  onNavigateTab?: (tab: string) => void;
  isDarkMode?: boolean;
}

export const QuestoesView: React.FC<QuestoesViewProps> = ({
  questions = [],
  progress,
  onAnswerQuestion,
  onNavigateTab,
  isDarkMode = false,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'feitas' | 'acertos' | 'erros' | 'pendentes'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedExplanationId, setExpandedExplanationId] = useState<string | null>(null);

  // Map attempts for quick lookup (latest attempt per question)
  const latestAttemptMap = useMemo(() => {
    const map = new Map<string, { selectedOptionId: string; isCorrect: boolean; answeredAt: string }>();
    (progress.questionAttempts || []).forEach((att) => {
      map.set(att.questionId, {
        selectedOptionId: att.selectedOptionId,
        isCorrect: att.isCorrect,
        answeredAt: att.answeredAt,
      });
    });
    return map;
  }, [progress.questionAttempts]);

  // Overall Statistics
  const totalQuestions = questions.length;
  const answeredCount = latestAttemptMap.size;
  let correctCount = 0;
  latestAttemptMap.forEach((att) => {
    if (att.isCorrect) correctCount++;
  });
  const wrongCount = answeredCount - correctCount;
  const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // Discipline normalization helper
  const matchesDisc = (discId?: string, target?: string) => {
    if (!discId || !target || target === 'all') return true;
    const d = discId.toLowerCase().replace(/[-_]/g, '');
    const t = target.toLowerCase().replace(/[-_]/g, '');
    if (d === t) return true;
    if (d.includes(t) || t.includes(d)) return true;
    // Common aliases
    if ((d.includes('admin') || t.includes('admin')) && (d.includes('direito') || t.includes('direito'))) return true;
    if ((d.includes('const') || t.includes('const')) && (d.includes('direito') || t.includes('direito'))) return true;
    if (d.includes('civil') && t.includes('civil')) return true;
    if (d.includes('penal') && t.includes('penal')) return true;
    if ((d.includes('port') || t.includes('port')) || (d.includes('lingua') && t.includes('lingua'))) return true;
    if (d.includes('tjam') && t.includes('tjam')) return true;
    if (d.includes('geo') && t.includes('geo')) return true;
    if ((d.includes('libra') || t.includes('libra')) || (d.includes('acess') || t.includes('acess'))) return true;
    if (d.includes('info') && t.includes('info')) return true;
    if (d.includes('ingl') && t.includes('ingl')) return true;
    return false;
  };

  // Filtered list of questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Discipline filter
      if (selectedDiscipline !== 'all' && !matchesDisc(q.disciplineId, selectedDiscipline)) {
        return false;
      }

      // Status filter
      const attempt = latestAttemptMap.get(q.id);
      if (statusFilter === 'feitas' && !attempt) return false;
      if (statusFilter === 'acertos' && (!attempt || !attempt.isCorrect)) return false;
      if (statusFilter === 'erros' && (!attempt || attempt.isCorrect)) return false;
      if (statusFilter === 'pendentes' && attempt) return false;

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const text = `${q.statement} ${q.topicName || ''} ${q.explanation || ''} ${q.institution || ''}`.toLowerCase();
        if (!text.includes(term)) return false;
      }

      return true;
    });
  }, [questions, selectedDiscipline, statusFilter, searchTerm, latestAttemptMap]);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-sky-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-sky-200 text-xs font-semibold border border-white/10">
              <Scale className="w-3.5 h-3.5 text-sky-400" />
              Banco Geral de Questões • Edital TJAM
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Questões Comentadas & Prática Contínua
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Pratique com questões completas no padrão FGV / Cebraspe. Todas as resoluções são sincronizadas em tempo real com seu histórico e com o painel do professor.
            </p>
          </div>

          {/* Quick CTA to Caderno de Erros */}
          {onNavigateTab && (
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => onNavigateTab('caderno-erros')}
                className="px-4 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <AlertOctagon className="w-4 h-4" />
                Caderno de Erros ({wrongCount})
              </button>
              <button
                onClick={() => onNavigateTab('simulados')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-400" />
                Simulados
              </button>
            </div>
          )}
        </div>

        {/* Real-time KPI Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 font-medium block">Total no Banco</span>
            <div className="text-xl font-black text-white mt-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              {totalQuestions}
            </div>
            <span className="text-[10px] text-slate-400">11 disciplinas</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 font-medium block">Questões Feitas</span>
            <div className="text-xl font-black text-white mt-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              {answeredCount}
            </div>
            <span className="text-[10px] text-slate-400">
              {totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0}% do banco
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 font-medium block">Acertos</span>
            <div className="text-xl font-black text-emerald-400 mt-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {correctCount}
            </div>
            <span className="text-[10px] text-emerald-300">
              {accuracyPercent}% de precisão
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 font-medium block">Para Revisar</span>
            <div className="text-xl font-black text-rose-400 mt-1 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-400" />
              {wrongCount}
            </div>
            <span className="text-[10px] text-rose-300">Erros a sanar</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por enunciado, tema, artigo de lei ou palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Discipline Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Todas as Disciplinas ({questions.length})</option>
              {ALL_SUBJECTS.map((sub) => {
                const count = questions.filter((q) => matchesDisc(q.disciplineId, sub.id)).length;
                return (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({questions.length})
          </button>
          <button
            onClick={() => setStatusFilter('feitas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'feitas'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            Já Feitas ({answeredCount})
          </button>
          <button
            onClick={() => setStatusFilter('acertos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'acertos'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Acertos ({correctCount})
          </button>
          <button
            onClick={() => setStatusFilter('erros')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'erros'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            Erros ({wrongCount})
          </button>
          <button
            onClick={() => setStatusFilter('pendentes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'pendentes'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            Não Feitas ({totalQuestions - answeredCount})
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-bold text-slate-500">
          Exibindo {filteredQuestions.length} questões
        </span>
        {answeredCount > 0 && (
          <span className="text-xs font-semibold text-sky-600">
            Sincronizado com o Painel do Professor ✅
          </span>
        )}
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-extrabold text-slate-800 text-base">Nenhuma questão encontrada</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Não foram encontradas questões com os filtros selecionados. Tente ajustar o status, a disciplina ou o termo de busca.
          </p>
          <button
            onClick={() => {
              setSelectedDiscipline('all');
              setStatusFilter('all');
              setSearchTerm('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
          >
            Resetar Filtros
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const attempt = latestAttemptMap.get(q.id);
            const isAnswered = Boolean(attempt);
            const isCorrect = attempt?.isCorrect;
            const isExplanationOpen = expandedExplanationId === q.id || isAnswered;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-3xl border transition-all shadow-xs ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : 'bg-rose-50/30 border-rose-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Question Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-mono font-bold bg-slate-100 text-slate-700 text-[11px]">
                      #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-sky-100 text-sky-800 text-[11px] capitalize">
                      {q.disciplineId.replace(/[-_]/g, ' ')}
                    </span>
                    {q.topicName && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]">
                        {q.topicName}
                      </span>
                    )}
                    {q.institution && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        {q.institution} {q.year ? `(${q.year})` : ''}
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isAnswered ? (
                      isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Feita • Acertou ✅
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Feita • Errou ❌
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500">
                        Não Respondida ⏳
                      </span>
                    )}
                  </div>
                </div>

                {/* Statement */}
                <div className="py-4">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.statement}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  {(q.options || []).map((opt) => {
                    const isSelected = attempt?.selectedOptionId === opt.id;
                    const isTargetCorrect = q.correctOptionId === opt.id;

                    let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                    if (isAnswered) {
                      if (isTargetCorrect) {
                        btnStyle = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-100/80 border-rose-400 text-rose-950 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={isAnswered}
                        onClick={() => onAnswerQuestion(q.id, opt.id)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                          {opt.id.toUpperCase()}
                        </span>
                        <span className="flex-1 leading-relaxed pt-0.5">{opt.text}</span>
                        {isAnswered && isTargetCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback / Explanation & Legal Reference */}
                {isExplanationOpen && (
                  <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        Gabarito Comentado Oficial: Letra {q.correctOptionId.toUpperCase()}
                      </span>
                      {q.legalReference && (
                        <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                          {q.legalReference}
                        </span>
                      )}
                    </div>
                    {q.explanation && (
                      <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                        {q.explanation}
                      </p>
                    )}

                    {/* Retake question action */}
                    {isAnswered && (
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 mt-2 text-[11px] text-slate-500">
                        <span>
                          Respondida em: {attempt?.answeredAt ? new Date(attempt.answeredAt).toLocaleString('pt-BR') : 'Hoje'}
                        </span>
                        <button
                          onClick={() => {
                            // Re-open question to allow student to retry
                            onAnswerQuestion(q.id, '');
                          }}
                          className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Refazer Questão
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
