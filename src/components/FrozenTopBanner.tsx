import React from 'react';
import { Snowflake, Lock, Flame } from 'lucide-react';

interface FrozenTopBannerProps {
  isDarkMode?: boolean;
}

export const FrozenTopBanner: React.FC<FrozenTopBannerProps> = () => {
  return (
    <aside
      id="frozen-status-banner"
      aria-label="Aviso de estudos congelados"
      className="w-full bg-slate-900/95 border-b border-sky-500/25 text-slate-100 backdrop-blur-md shadow-sm relative z-30 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Clean Message Block */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
            <Snowflake className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-400/30">
                COMUNICADO
              </span>
              <span className="font-bold text-slate-200">
                Status no Ranking Atualizado
              </span>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm mt-0.5 leading-normal font-medium">
              O aluno não entregou a atividade de geografia, seu status no ranking caiu por conta disso.
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-rose-500/30 text-xs font-semibold text-slate-300">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Eduardo Mateus: <strong className="text-rose-300 font-bold">10º lugar (17,2% • Sem Dupla)</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-400">
            <Flame className="w-3.5 h-3.5 text-slate-500" />
            <span>Sequência: <strong className="text-slate-300 font-bold">0 dias</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
};

