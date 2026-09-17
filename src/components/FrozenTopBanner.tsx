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
      className="w-full bg-sky-50/90 border-b border-sky-200/80 text-slate-800 backdrop-blur-md shadow-xs relative z-30 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Clean Message Block */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-8 h-8 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
            <Snowflake className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                STATUS OFICIAL
              </span>
              <span className="font-bold text-slate-900">
                Dupla no Ranking Geral: 5º Lugar
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-normal font-medium">
              Eduardo Mateus & Pedro Henrique • 100% das atividades em dia, sem pendências e sem penalidades.
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-slate-700 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dupla Oficial: <strong className="text-emerald-700 font-bold">5º lugar (30,0%)</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-500 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-slate-400" />
            <span>Sequência: <strong className="text-slate-700 font-bold">0 dias</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
};

