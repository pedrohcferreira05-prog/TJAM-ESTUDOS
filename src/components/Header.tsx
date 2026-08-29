import React from 'react';
import { ViewMode, StudentTab } from '../types';
import {
  Landmark,
  Sparkles,
  Flame,
  User,
  Users,
  Menu,
  Snowflake
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
  onOpenDuoInvite?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  setStudentTab,
  onOpenAIAssistant,
  onToggleMobileMenu,
  isDuo = false,
  onOpenDuoInvite,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-slate-900/95 border-slate-800/90 backdrop-blur-md transition-colors">
      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="p-2 rounded-xl border border-slate-800 text-slate-300 lg:hidden hover:bg-slate-800 transition-colors"
              aria-label="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setStudentTab('dashboard')}
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-900/30 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base tracking-tight leading-none text-white">
                  TJAM Estudos
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  Assistente Judiciário
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Plataforma de Estudos & Simulados
              </p>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Duo or Solo Mode Badge / Button */}
          {onOpenDuoInvite && (
            <button
              onClick={onOpenDuoInvite}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDuo
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/25'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Gerenciar Dupla de Estudos"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{isDuo ? 'Dupla Ativa' : 'Solicitação Dupla'}</span>
            </button>
          )}

          {/* Streak Counter - Frozen Status */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 text-slate-300 border border-slate-700/80 text-xs font-semibold">
            <Snowflake className="w-3.5 h-3.5 text-sky-400" />
            <span>Sequência: <strong className="text-slate-200">0 dias</strong></span>
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            title="Assistente de Estudos com IA Gemini"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden md:inline">IA Assistente</span>
          </button>

          {/* Student Profile Pill */}
          <button
            onClick={() => setStudentTab('perfil')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              isDuo
                ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200 hover:border-indigo-400'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 text-slate-200'
            }`}
          >
            {isDuo ? (
              <>
                <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden sm:inline truncate max-w-[170px] font-bold">
                  Pedro & Eduardo
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300 font-extrabold hidden md:inline">
                  Dupla
                </span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="hidden sm:inline truncate max-w-[150px]">
                  Eduardo Mateus
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
