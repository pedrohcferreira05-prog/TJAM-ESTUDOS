import React, { useState } from 'react';
import { Landmark, Lock, Mail, GraduationCap, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { StudentAccountService, TEACHER_CONFIG } from '../lib/studentAccountService';
import { AuthSession } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: AuthSession) => void;
  isDarkMode?: boolean;
  initialRole?: 'student' | 'teacher';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'student',
}) => {
  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Por favor, informe seu usuário/e-mail e sua senha de acesso.');
      return;
    }

    try {
      const result = await StudentAccountService.authenticateAsync(identifier, password, activeRole);
      if (result.success && result.session) {
        if (result.role === 'teacher') {
          setSuccessMessage('Acesso docente confirmado com sucesso. Entrando...');
        } else {
          setSuccessMessage(`Bem-vindo(a), ${result.session.name}! Acesso liberado.`);
        }
        setTimeout(() => {
          onLoginSuccess(result.session!);
          onClose();
        }, 400);
      } else {
        setErrorMessage(
          result.errorMessage ||
            'Credenciais não encontradas. Verifique seus dados de acesso no banco de dados.'
        );
      }
    } catch (err) {
      setErrorMessage('Erro ao autenticar. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl p-6 md:p-8 border border-slate-200 bg-white text-slate-900 shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all text-sm font-bold cursor-pointer"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500 text-slate-950 shadow-md mb-1">
            <Landmark className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">TJAM Estudos 2026</h2>
          <p className="text-xs font-semibold text-slate-500">
            Portal de Acesso aos Estudos • Assistente Judiciário
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveRole('student');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeRole === 'student'
                ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>Área do Aluno</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole('teacher');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeRole === 'teacher'
                ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Área do Docente</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {activeRole === 'student' ? 'ID de Matrícula ou E-mail do Aluno' : 'Identificação Docente ou E-mail'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder={activeRole === 'student' ? 'Digite sua matrícula ou e-mail cadastrado' : 'Digite seu usuário ou e-mail docente'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-slate-50 border-slate-200 text-slate-900 text-xs outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Senha de Acesso</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-slate-50 border-slate-200 text-slate-900 text-xs outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeRole === 'student'
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20'
            }`}
          >
            <span>{activeRole === 'student' ? 'Entrar no Portal do Aluno' : 'Acessar Portal do Docente'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {activeRole === 'student'
                ? 'As contas e senhas dos alunos são cadastradas e gerenciadas pela docente responsável.'
                : 'Ambiente seguro e exclusivo para gestão de turmas e acompanhamento pedagógico.'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
