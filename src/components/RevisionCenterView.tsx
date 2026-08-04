import React, { useState } from 'react';
import { ReviewQueueItem, UserProgress } from '../types';
import { RefreshCw, CheckCircle2, Clock, Filter, AlertCircle } from 'lucide-react';

interface RevisionCenterViewProps {
  progress: UserProgress;
  onToggleReviewCompleted: (reviewId: string) => void;
  isDarkMode: boolean;
}

export const RevisionCenterView: React.FC<RevisionCenterViewProps> = ({
  progress,
  onToggleReviewCompleted,
  isDarkMode,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredQueue = progress.reviewQueue.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Centro de Revisões Espaçadas</h2>
          <p className="text-xs text-slate-500 mt-1">
            Revisões automáticas programadas em intervalos de 24h, 7d, 30d e 90d para combater a Curva do Esquecimento.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === 'all' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterType('24h')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === '24h' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            24 Horas
          </button>
          <button
            onClick={() => setFilterType('7d')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === '7d' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            7 Dias
          </button>
          <button
            onClick={() => setFilterType('30d')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === '30d' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            30 Dias
          </button>
        </div>
      </div>

      {/* Revision Queue Cards */}
      <div className="space-y-3">
        {filteredQueue.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-3xl border flex items-center justify-between gap-4 transition-all ${
              item.completed
                ? isDarkMode
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : 'bg-slate-50 border-slate-200 opacity-60'
                : isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl font-extrabold text-xs uppercase ${
                  item.type === '24h'
                    ? 'bg-rose-500/15 text-rose-600'
                    : item.type === '7d'
                    ? 'bg-amber-500/15 text-amber-600'
                    : 'bg-blue-500/15 text-blue-600'
                }`}
              >
                {item.type}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.disciplineName}</span>
                <h4 className="font-extrabold text-sm">{item.topicName}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Programada para: {item.dueDate}</p>
              </div>
            </div>

            <button
              onClick={() => onToggleReviewCompleted(item.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                item.completed
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {item.completed ? 'Revisado' : 'Concluir Revisão'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
