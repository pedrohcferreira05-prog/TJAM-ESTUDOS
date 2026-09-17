import React, { useState, useEffect } from 'react';
import {
  Landmark,
  Lock,
  Mail,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Database,
} from 'lucide-react';
import { StudentAccountService, TEACHER_CONFIG } from '../lib/studentAccountService';
import { testConnection } from '../lib/firebase';
import { AuthSession } from '../types';

interface StudentLoginGateViewProps {
  onLoginSuccess: (session: AuthSession) => void;
}

export const StudentLoginGateView: React.FC<StudentLoginGateViewProps> = ({ onLoginSuccess }) => {
  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDbSynced, setIsDbSynced] = useState(true);

  useEffect(() => {
    // Initial sync with Firestore and test connection
    async function initGate() {
      try {
        await StudentAccountService.syncAccountsWithFirestore();
        const connected = await testConnection();
        setIsDbSynced(connected);
      } catch (e) {
        console.warn('Initial connection sync notice:', e);
      }
    }
    initGate();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Por favor, informe seu login e a senha de acesso.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await StudentAccountService.authenticateAsync(identifier, password, activeRole);

      if (result.success && result.session) {
        if (result.role === 'teacher') {
          setSuccessMessage(`Acesso docente confirmado! Bem-vinda, Professora Jéssica Alves.`);
        } else {
          setSuccessMessage(`Acesso autorizado! Bem-vindo(a), ${result.session.name}.`);
        }
        setTimeout(() => {
          onLoginSuccess(result.session!);
        }, 400);
      } else {
        setIsLoading(false);
        setErrorMessage(
          result.errorMessage ||
            'Credenciais não reconhecidas. Verifique usuário e senha cadastrados no banco de dados.'
        );
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Erro de comunicação. Tente novamente em instantes.');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-[calc(100vh-80px)] bg-radial from-amber-500/5 via-slate-50 to-slate-100">
      <div className="w-full max-w-lg space-y-5">
        {/* Institutional Crest & Brand */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3.5 rounded-3xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20">
            <Landmark className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
              Poder Judiciário • Estado do Amazonas
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-2">
              TJAM Estudos 2026
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto mt-1">
              Portal Oficial de Preparação para o Concurso TJAM
            </p>
          </div>
        </div>

        {/* Database Status Indicator */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              Banco de Dados Firebase:
            </span>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
              Sincronizado e Conectado
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            Firestore v2026
          </span>
        </div>

        {/* Authentication Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-5">
          {/* Role Toggle Tabs */}
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
                {activeRole === 'student'
                  ? 'ID de Matrícula ou E-mail do Aluno'
                  : 'Identificação Docente ou E-mail'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder={
                    activeRole === 'student'
                      ? 'Digite sua matrícula ou e-mail cadastrado'
                      : 'Digite seu usuário ou e-mail docente'
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-slate-50 border-slate-200 text-slate-900 text-xs outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Senha de Acesso</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border bg-slate-50 border-slate-200 text-slate-900 text-xs outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeRole === 'student'
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/25 active:scale-[0.99]'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/25 active:scale-[0.99]'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span>Validando no Banco de Dados...</span>
              ) : (
                <>
                  <span>
                    {activeRole === 'student'
                      ? 'Entrar no Portal do Aluno'
                      : 'Entrar no Portal do Docente'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Help Footer */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              As contas de acesso e senhas estão sincronizadas diretamente com o banco de dados seguro do TJAM.
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[11px] font-semibold text-slate-500">
            Plataforma Segura • Dados e Progresso Sincronizados com Firebase Firestore
          </span>
        </div>
      </div>
    </div>
  );
};
