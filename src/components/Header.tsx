import React from 'react';
import { ViewMode, StudentTab } from '../types';
import {
  Landmark,
  Sparkles,
  Menu,
  Trophy,
} from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  studentTab: StudentTab;
  setStudentTab: (tab: StudentTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenAIAssistant: () => void;
  streakDays: number;
  onOpenAuthModal?: () => void;
  currentUserEmail?: string;
  isStaffAuthenticated?: boolean;
  onToggleMobileMenu?: () => void;
  isDuo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  setStudentTab,
  onOpenAIAssistant,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-slate-900/95 border-slate-800/90 backdrop-blur-md transition-colors w-full">
      {/* Main Clean Navigation Bar - Totalmente Responsiva e sem tags/badges acumuladas */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="p-2 rounded-xl border border-slate-800 text-slate-300 lg:hidden hover:bg-slate-800 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none min-w-0"
            onClick={() => setStudentTab('dashboard')}
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 text-slate-950 font-black shadow-md flex items-center justify-center shrink-0">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-sm sm:text-base tracking-tight leading-none text-white truncate">
                TJAM Estudos
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1 truncate">
                Plataforma de Estudos
              </p>
            </div>
          </div>
        </div>

        {/* Right Controls - Adaptáveis para qualquer resolução */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Botão para Ranking */}
          <button
            onClick={() => setStudentTab('simulados')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0"
            title="Ver Ranking Oficial"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Ranking (3º Lugar)</span>
            <span className="sm:hidden">Ranking</span>
          </button>

          {/* Botão Aulas de Hoje (telas médias e grandes) */}
          <button
            onClick={() => setStudentTab('aula-hoje')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <span>⚖️ Aulas de Hoje</span>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            title="Assistente de Estudos com IA Gemini"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200 shrink-0" />
            <span className="hidden sm:inline">IA Assistente</span>
          </button>
        </div>
      </div>
    </header>
  );
};
