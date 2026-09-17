import React from 'react';
import { ViewMode, AuthSession } from '../types';
import {
  Landmark,
  Menu,
  Trophy,
  GraduationCap,
  Users,
  LogOut,
  UserCheck,
  Lock,
} from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentUserSession?: AuthSession | null;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
  onToggleMobileMenu?: () => void;
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  currentUserSession,
  onLogout,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 border-slate-200 backdrop-blur-md transition-all w-full max-w-full overflow-hidden text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Menu Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
          {currentUserSession && onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer shrink-0 font-bold text-xs"
              aria-label="Abrir Menu de Navegação e Portais"
              title="Abrir Menu"
            >
              <Menu className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="hidden sm:inline font-extrabold text-slate-800">Menu</span>
            </button>
          )}

          <div className="flex items-center gap-2 select-none min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500 text-slate-950 font-black shadow-xs flex items-center justify-center shrink-0">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xs sm:text-base text-slate-900 tracking-tight leading-none truncate">
                  TJAM Estudos
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300/80 hidden md:inline-block">
                  2026
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none mt-1 truncate hidden sm:block">
                Assistente Judiciário • Preparatório
              </p>
            </div>
          </div>
        </div>

        {/* Center: Cabeçalho Livre - Apenas indicador discreto da área atual */}
        <div className="hidden md:flex items-center justify-center">
          {currentUserSession ? (
            viewMode === 'teacher' ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-extrabold shadow-2xs">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span>Portal da Professora Jéssica Alves</span>
              </div>
            ) : viewMode === 'simulado' ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-extrabold shadow-2xs">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulados Oficiais & Ranking TJAM</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-extrabold shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>Portal do Aluno TJAM 2026</span>
              </div>
            )
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Acesso Restrito • Identificação Obrigatória</span>
            </div>
          )}
        </div>

        {/* Right: Active User Session & Logout */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {currentUserSession ? (
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-[11px] font-black text-slate-900 leading-tight truncate max-w-[150px]">
                  {currentUserSession.name}
                </span>
                <span className="text-[10px] font-bold leading-none mt-0.5">
                  {currentUserSession.role === 'teacher' ? (
                    <span className="text-sky-600 font-extrabold">Docente</span>
                  ) : (
                    <span className="text-amber-600 font-extrabold">
                      {currentUserSession.username || 'Aluno'}
                    </span>
                  )}
                </span>
              </div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-2xs ${
                  currentUserSession.role === 'teacher'
                    ? 'bg-sky-100 text-sky-700 border border-sky-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
                title={`${currentUserSession.name} (${currentUserSession.email || currentUserSession.role})`}
              >
                {currentUserSession.role === 'teacher' ? (
                  <UserCheck className="w-4 h-4 text-sky-700" />
                ) : (
                  currentUserSession.name.charAt(0).toUpperCase()
                )}
              </div>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer text-xs font-bold"
                  title="Sair da conta"
                  aria-label="Sair da conta"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Portal Protegido</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
