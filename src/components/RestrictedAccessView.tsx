import React, { useState } from 'react';
import { ShieldAlert, Lock, ArrowLeft, KeyRound } from 'lucide-react';

interface RestrictedAccessViewProps {
  onBackToStudent: () => void;
  onAuthenticateStaff: (passcode: string) => boolean;
  isDarkMode: boolean;
}

export const RestrictedAccessView: React.FC<RestrictedAccessViewProps> = ({
  onBackToStudent,
  onAuthenticateStaff,
  isDarkMode,
}) => {
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStaffAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = onAuthenticateStaff(passcode);
    if (!success) {
      setErrorMsg('Credencial de acesso inválida.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md p-8 rounded-3xl border shadow-xl text-center space-y-6 transition-all ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="inline-flex p-4 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">Acesso restrito.</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Esta área é de uso exclusivo e reservado aos administradores e equipe docente autorizada do TJAM Estudos.
          </p>
        </div>

        {!showStaffForm ? (
          <div className="space-y-3 pt-2">
            <button
              onClick={onBackToStudent}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a Área do Aluno</span>
            </button>

            <button
              onClick={() => setShowStaffForm(true)}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              É colaborador ou professor? Clique para autenticar
            </button>
          </div>
        ) : (
          <form onSubmit={handleStaffAuth} className="space-y-3 text-left pt-2 border-t border-slate-100 dark:border-slate-800">
            {errorMsg && (
              <p className="text-xs font-bold text-rose-500 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-center">
                {errorMsg}
              </p>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Senha ou Chave do Servidor</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowStaffForm(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md"
              >
                Autenticar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
