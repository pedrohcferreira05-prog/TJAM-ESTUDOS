import React, { useState } from 'react';
import { Landmark, Lock, Mail, User, ShieldAlert, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, role: 'student' | 'teacher' | 'admin' | 'superadmin') => void;
  isDarkMode: boolean;
  initialMode?: 'login' | 'register' | 'admin_login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isDarkMode,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'admin_login'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (mode === 'admin_login') {
      if (password === 'admin2026' || password === 'tjam2026' || password === 'admin') {
        onLoginSuccess(email, 'admin');
        onClose();
      } else if (password === 'teacher' || password === 'prof2026') {
        onLoginSuccess(email, 'teacher');
        onClose();
      } else {
        setErrorMessage('Credenciais administrativas inválidas.');
      }
      return;
    }

    // Default student login
    onLoginSuccess(email || 'aluno@tjamestudos.com.br', 'student');
    setSuccessMessage('Login efetuado com sucesso!');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setSuccessMessage('Conta de Aluno criada com sucesso! Redirecionando...');
    setTimeout(() => {
      onLoginSuccess(email, 'student');
      onClose();
    }, 800);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Informe seu e-mail para recuperação.');
      return;
    }
    setSuccessMessage('Link de redefinição de senha enviado para o seu e-mail!');
  };

  return (
    <div className="fixed inset-[#0] z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-3xl p-6 md:p-8 border shadow-2xl relative space-y-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all text-sm font-bold"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/20 mb-1">
            <Landmark className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">TJAM Estudos</h2>
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Preparatório para Assistente Judiciário
          </p>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form: LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                Lembrar acesso
              </label>

              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Entrar na Plataforma</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500">
                Ainda não tem conta de aluno?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Criar conta
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Form: REGISTER */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Cadastro exclusivo para perfil de <strong>Aluno</strong>.
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Nome Completo</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Seu Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Crie uma senha segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Criar minha Conta de Aluno</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-slate-400 text-center italic">
              * Perfis de Professor, Administrador e Monitor são gerenciados exclusivamente pelo Painel Administrativo.
            </p>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Já tenho uma conta. Fazer Login
              </button>
            </div>
          </form>
        )}

        {/* Form: FORGOT PASSWORD */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">E-mail Cadastrado</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all"
            >
              Enviar Instruções de Recuperação
            </button>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-extrabold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Voltar para o Login
              </button>
            </div>
          </form>
        )}

        {/* Form: ADMIN / STAFF LOGIN */}
        {mode === 'admin_login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-600 dark:text-purple-300 flex items-center gap-2">
              <KeyRound className="w-4 h-4 shrink-0" />
              <span>Acesso Interno e Colaboradores (Protegido)</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">E-mail Institucional</label>
              <input
                type="email"
                required
                placeholder="admin@tjamestudos.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Senha Administrativa</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs outline-none transition-all ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md transition-all"
            >
              Autenticar Acesso Restrito
            </button>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Voltar para Login de Aluno
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
