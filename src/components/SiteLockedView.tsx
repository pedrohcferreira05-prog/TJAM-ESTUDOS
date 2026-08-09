import React, { useState } from 'react';
import { Lock, Sun, Moon, Key, AlertCircle, ShieldAlert, Trophy, Users, Clock, Sparkles } from 'lucide-react';
import { Simulado, UserProgress, SimuladoAttempt } from '../types';

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
      setErrorMessage('Senha incorreta! A plataforma permanece pausada para a próxima aula.');
    }
  };

  const duplasRanking = [
    { rank: 1, name: 'Jonas e Carla', score: '35%', isUser: false, bgClass: 'bg-amber-500/10 border-amber-500/30', badgeClass: 'bg-amber-500 text-slate-950', barClass: 'bg-amber-500', barWidth: '35%' },
    { rank: 2, name: 'Pietro e Heitor', score: '32%', isUser: false, bgClass: 'bg-slate-800/40 border-slate-800', badgeClass: 'bg-slate-300 text-slate-950', barClass: 'bg-blue-500', barWidth: '32%' },
    { rank: 3, name: 'João e Alicia', score: '28%', isUser: false, bgClass: 'bg-slate-800/40 border-slate-800', badgeClass: 'bg-amber-700 text-white', barClass: 'bg-amber-600', barWidth: '28%' },
    { rank: 4, name: 'Martins e Márcio', score: '25%', isUser: false, bgClass: 'bg-slate-800/40 border-slate-800', badgeClass: 'bg-slate-700 text-slate-300', barClass: 'bg-slate-500', barWidth: '25%' },
    { rank: 5, name: 'Lucas e Mariana', score: '22%', isUser: false, bgClass: 'bg-slate-800/40 border-slate-800', badgeClass: 'bg-slate-700 text-slate-300', barClass: 'bg-slate-500', barWidth: '22%' },
    { rank: 6, name: 'Gabriel e Beatriz', score: '18%', isUser: false, bgClass: 'bg-slate-800/40 border-slate-800', badgeClass: 'bg-slate-700 text-slate-300', barClass: 'bg-slate-500', barWidth: '18%' },
    { rank: 7, name: 'Pedro e Eduardo', score: '15%', isUser: true, bgClass: 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20', badgeClass: 'bg-emerald-600 text-white shadow-sm', barClass: 'bg-emerald-500', barWidth: '15%' },
    { rank: 8, name: 'Bruno e Camila', score: '12%', isUser: false, bgClass: 'bg-slate-800/40 border-slate-800', badgeClass: 'bg-slate-700 text-slate-300', barClass: 'bg-slate-500', barWidth: '12%' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 flex flex-col space-y-6">
      {/* Top Header Controls Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>TJAM Estudos 2026</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Site Pausado
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Aguardando o início da próxima aula
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

      {/* Main Paused Banner + Ranking Section */}
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {/* Paused Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-3 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black">
            <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            Intervalo • Próxima Aula
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Plataforma Pausada para a Próxima Aula
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            O simulado foi encerrado. Acompanhe abaixo o <strong className="text-white">Ranking Geral de Duplas</strong> atualizado em tempo real.
          </p>
        </div>

        {/* Ranking Geral de Duplas Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  Ranking Geral de Duplas
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Ao Vivo
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Classificação das duplas de estudos do Preparatório TJAM 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
              <Users className="w-4 h-4 text-amber-400" />
              <span>8 Duplas Cadastradas</span>
            </div>
          </div>

          {/* Ranking List */}
          <div className="space-y-3">
            {duplasRanking.map((item) => (
              <div
                key={item.rank}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${item.bgClass}`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${item.badgeClass}`}>
                    {item.rank}º
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-white">
                        {item.name}
                      </span>
                      {item.isUser && (
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-black uppercase tracking-wider">
                          Sua Dupla
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-24 sm:w-36 bg-slate-800 h-2.5 rounded-full overflow-hidden hidden sm:block border border-slate-700/50">
                    <div className={`h-full rounded-full ${item.barClass}`} style={{ width: item.barWidth }} />
                  </div>
                  <span className={`text-base font-black ${item.isUser ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                <p className="text-xs text-slate-400">Insira a senha do professor para liberar a plataforma.</p>
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
