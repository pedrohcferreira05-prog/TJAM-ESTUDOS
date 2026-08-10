import React from 'react';
import { ViewMode, StudentTab } from '../types';
import {
  Landmark,
  Sparkles,
  Moon,
  Sun,
  Flame,
  User,
  Menu
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
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  studentTab,
  setStudentTab,
  isDarkMode,
  setIsDarkMode,
  onOpenAIAssistant,
  streakDays,
  onToggleMobileMenu,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}
    >
      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setStudentTab('dashboard')}
          >
            <div className="p-2 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base tracking-tight leading-none text-slate-900 dark:text-white">
                  TJAM Estudos
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Aluno
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Assistente Judiciário
              </p>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{streakDays || 0} {streakDays === 1 ? 'Dia Seguido' : 'Dias Seguidos'}</span>
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Assistente de Estudos com IA Gemini"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">IA TJAM</span>
          </button>

          {/* Temporary Student Profile Pill */}
          <button
            onClick={() => setStudentTab('perfil')}
            className="px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-900 dark:text-white cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline truncate max-w-[160px]">
              Eduardo Mateus
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDarkMode
                ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            }`}
            title="Alternar Tema"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
