import React from 'react';
import { ViewMode, StudentTab } from '../types';
import {
  Landmark,
  Sparkles,
  Settings,
  Moon,
  Sun,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  RefreshCw,
  FileSpreadsheet,
  AlertOctagon,
  Newspaper,
  Flame,
  User,
  LogOut,
  ShieldCheck,
  Brain
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
  onOpenAuthModal: () => void;
  currentUserEmail?: string;
  isStaffAuthenticated?: boolean;
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
  onOpenAuthModal,
  currentUserEmail = 'aluno@tjamestudos.com.br',
  isStaffAuthenticated = false,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}
    >
      {/* Top Banner Bar with Key Study Guidelines */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-900 text-white text-[11px] font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-extrabold tracking-wide uppercase">TJAM ESTUDOS</span>
            <span className="text-emerald-300 hidden sm:inline">| Preparatório para Assistente Judiciário</span>
          </div>

          {/* Top Parameters */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-[11px]">
            <div>
              <span className="text-emerald-300">FOCO:</span> <span className="font-bold">Constância</span>
            </div>
            <div>
              <span className="text-emerald-300">META DIÁRIA:</span> <span className="font-bold">3h a 4h</span>
            </div>
            <div>
              <span className="text-emerald-300">FREQUÊNCIA:</span> <span className="font-bold">6d / semana</span>
            </div>
            <div>
              <span className="text-emerald-300">MÉTODO:</span> <span className="font-bold">Teoria + Questões + Revisão</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStudentTab('dashboard')}>
          <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/20">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base tracking-tight leading-none text-slate-900 dark:text-white">
                TJAM Estudos
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                Oficial
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Preparatório para Assistente Judiciário
            </p>
          </div>
        </div>

        {/* Center Tabs Navigation (Student View) */}
        {viewMode === 'student' && (
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setStudentTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'dashboard'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Início</span>
            </button>

            <button
              onClick={() => setStudentTab('turma')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'turma'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Meu Curso</span>
            </button>

            <button
              onClick={() => setStudentTab('semana1')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all font-bold ${
                studentTab === 'semana1'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Semana 1</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black">NOVO</span>
            </button>

            <button
              onClick={() => setStudentTab('disciplines')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'disciplines'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Disciplinas</span>
            </button>

            <button
              onClick={() => setStudentTab('schedule')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'schedule'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Plano de Estudos</span>
            </button>

            <button
              onClick={() => setStudentTab('reviews')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'reviews'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Biblioteca & Revisões</span>
            </button>

            <button
              onClick={() => setStudentTab('simulados')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'simulados'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Simulados</span>
            </button>

            <button
              onClick={() => setStudentTab('caderno-erros')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'caderno-erros'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
              <span>Caderno de Erros</span>
            </button>

            <button
              onClick={() => setStudentTab('news')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                studentTab === 'news'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>Notícias</span>
            </button>
          </nav>
        )}

        {/* Staff Mode Indicator if authenticated in internal view */}
        {viewMode !== 'student' && isStaffAuthenticated && (
          <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-2xl text-xs font-bold text-purple-600 dark:text-purple-300">
            <ShieldCheck className="w-4 h-4 text-purple-500" />
            <span>Painel do {viewMode.toUpperCase()}</span>
            <button
              onClick={() => setViewMode('student')}
              className="ml-2 text-[10px] text-slate-500 hover:text-slate-900 dark:hover:text-white underline"
            >
              Sair para Visão Aluno
            </button>
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{streakDays} Dias Seguidos</span>
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="px-3 py-1.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all"
            title="Assistente de Estudos com IA Gemini"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">IA TJAM</span>
          </button>

          {/* Login / Profile Button */}
          <button
            onClick={onOpenAuthModal}
            className="px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-500"
          >
            <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline truncate max-w-[120px]">{currentUserEmail.split('@')[0]}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode
                ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      {viewMode === 'student' && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 overflow-x-auto py-2 px-4 flex items-center gap-2 text-xs font-semibold scrollbar-none">
          <button
            onClick={() => setStudentTab('dashboard')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => setStudentTab('turma')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'turma' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Meu Curso
          </button>
          <button
            onClick={() => setStudentTab('disciplines')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'disciplines' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Disciplinas
          </button>
          <button
            onClick={() => setStudentTab('schedule')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'schedule' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Plano de Estudos
          </button>
          <button
            onClick={() => setStudentTab('reviews')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'reviews' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Biblioteca & Revisões
          </button>
          <button
            onClick={() => setStudentTab('simulados')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'simulados' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Simulados
          </button>
          <button
            onClick={() => setStudentTab('caderno-erros')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'caderno-erros' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Caderno Erros
          </button>
          <button
            onClick={() => setStudentTab('news')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap ${
              studentTab === 'news' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Notícias
          </button>
        </div>
      )}
    </header>
  );
};
