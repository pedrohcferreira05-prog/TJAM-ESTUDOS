import React from 'react';
import { Question, UserProgress } from '../types';
import { AlertOctagon, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface CadernoErrosViewProps {
  questions: Question[];
  progress: UserProgress;
  onOpenAIAssistant: (prompt?: string) => void;
  isDarkMode: boolean;
}

export const CadernoErrosView: React.FC<CadernoErrosViewProps> = ({
  questions,
  progress,
  onOpenAIAssistant,
  isDarkMode,
}) => {
  const errorQuestions = questions.filter((q) => progress.errorQuestionIds.includes(q.id));

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-rose-500" /> Caderno de Erros
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Revisão focalizada nas questões erradas para sanar pontos fracos antes da prova do TJAM.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400">
          {errorQuestions.length} Questões Registradas
        </span>
      </div>

      {errorQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-extrabold text-base">Caderno de Erros Vazio!</h3>
          <p className="text-xs text-slate-500 mt-1">
            Você não possui questões erradas salvas no momento. Continue praticando na aba de Disciplinas!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {errorQuestions.map((q, idx) => (
            <div
              key={q.id}
              className={`p-6 rounded-3xl border space-y-3 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-rose-500">Erro #{idx + 1} - {q.topicName}</span>
                <span className="text-slate-400">{q.institution || 'TJAM'}</span>
              </div>

              <p className="text-xs font-medium leading-relaxed">{q.statement}</p>

              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1">
                <span className="font-bold text-rose-600 dark:text-rose-400 block">Resposta Correta & Racional:</span>
                <p className="text-slate-700 dark:text-slate-300">{q.explanation}</p>
                {q.legalReference && (
                  <span className="font-bold text-slate-500 block pt-1">Fundamentação: {q.legalReference}</span>
                )}
              </div>

              <button
                onClick={() =>
                  onOpenAIAssistant(
                    `Explique de forma detalhada por que cometi um erro na seguinte questão de ${q.topicName}: "${q.statement}".`
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Pedir Ajuda da IA Gemini
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
