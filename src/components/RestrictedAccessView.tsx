import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { StudentAccountService, TEACHER_CONFIG } from '../lib/studentAccountService';
import { AuthSession } from '../types';

interface RestrictedAccessViewProps {
  onBackToStudent: () => void;
  onAuthenticateTeacherSuccess: (session: AuthSession) => void;
  isDarkMode?: boolean;
}

export const RestrictedAccessView: React.FC<RestrictedAccessViewProps> = ({
  onBackToStudent,
  onAuthenticateTeacherSuccess,
  isDarkMode = false,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleTeacherAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Por favor, informe a identificação e a senha de acesso docente.');
      return;
    }

    const isValid = StudentAccountService.authenticateTeacher(identifier, password);
    if (isValid) {
      const session: AuthSession = {
        id: 'teacher-jessica-alves',
        name: TEACHER_CONFIG.name,
        email: TEACHER_CONFIG.defaultEmail,
        role: 'teacher',
      };
      StudentAccountService.saveSession(session);
      onAuthenticateTeacherSuccess(session);
    } else {
      setErrorMsg('Credencial docente inválida. Verifique sua identificação e senha.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md p-8 rounded-3xl border shadow-xl text-center space-y-6 transition-all ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="inline-flex p-4 rounded-3xl bg-sky-50 text-sky-600 border border-sky-200">
          <ShieldCheck className="w-9 h-9" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-extrabold tracking-tight">Portal do Professor</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Área de gestão pedagógica e controle de turmas restrita ao corpo docente do TJAM.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleTeacherAuth} className="space-y-3.5 text-left">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Identificação ou E-mail Docente
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Digite seu usuário ou e-mail institucional"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs border outline-none font-medium ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white focus:border-sky-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-600 focus:bg-white'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Senha de Acesso Docente
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs border outline-none font-medium ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white focus:border-sky-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-600 focus:bg-white'
                }`}
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Autenticar no Portal do Docente</span>
            </button>

            <button
              type="button"
              onClick={onBackToStudent}
              className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para o Portal do Aluno</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
