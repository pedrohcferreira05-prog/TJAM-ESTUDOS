import React, { useState } from 'react';
import { Lock, Sun, Moon, Key, AlertCircle, ShieldAlert } from 'lucide-react';
import { Simulado, UserProgress, SimuladoAttempt } from '../types';
import { SimuladosView } from './SimuladosView';

interface SiteLockedViewProps {
  isDarkMode: boolean;
  simulados: Simulado[];
  progress: UserProgress;
  onSaveSimuladoAttempt: (attempt: SimuladoAttempt) => void;
  onToggleDarkMode?: () => void;
  onUnlockSite?: () => void;
}

export const SiteLockedView: React.FC<SiteLockedViewProps> = ({
  isDarkMode,
  simulados,
  progress,
  onSaveSimuladoAttempt,
  onToggleDarkMode,
  onUnlockSite,
}) => {
  const [showPasscodeModal, setShowPasscodeModal] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim();
    if (clean === 'admin2026' || clean === 'tjam2026' || clean === 'admin' || clean === 'prof2026') {
      setShowPasscodeModal(false);
      setPasscode('');
      setErrorMessage('');
      if (onUnlockSite) onUnlockSite();
    } else {
      setErrorMessage('Senha incorreta! A plataforma permanece trancada para aplicação da prova.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 flex flex-col space-y-6">
      {/* Top Header Controls Bar - Clean Lock Status */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>TJAM Estudos 2026</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Site Trancado
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Modo Exclusivo de Aplicação de Prova Simutada (40 Questões)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onUnlockSite && (
            <button
              onClick={() => {
                setErrorMessage('');
                setShowPasscodeModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
              title="Desbloquear Plataforma de Estudos"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Desbloquear Site</span>
            </button>
          )}

          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer border border-slate-700"
              title="Alternar Tema"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Main Full-Width Prova Simulado Container */}
      <div className="w-full max-w-7xl mx-auto flex-1">
        <SimuladosView
          simulados={simulados}
          progress={progress}
          onSaveSimuladoAttempt={onSaveSimuladoAttempt}
          isDarkMode={isDarkMode}
          autoStartSimuladoId="sim-tjam-geral-40"
          examOnlyMode={true}
          onUnlockSite={onUnlockSite}
        />
      </div>

      {/* Passcode Unlock Modal */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black">Desbloquear Site de Estudos</h3>
                <p className="text-xs text-slate-400">Insira a senha para sair do modo de prova trancado.</p>
              </div>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Senha de Acesso / Professor:
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Digite a senha..."
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {errorMessage && (
                <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasscodeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md"
                >
                  Desbloquear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
