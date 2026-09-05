import React from 'react';
import { UserProgress } from '../types';
import {
  Users,
  GraduationCap,
  Flame,
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  TrendingDown,
  TrendingUp
} from 'lucide-react';

interface PerfilViewProps {
  progress: UserProgress;
  isDarkMode: boolean;
  isDuo?: boolean;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  progress,
  isDarkMode,
}) => {
  const hours = progress.hoursStudiedToday || 0;
  const h = Math.floor(hours);
  const m = Math.round((hours % 1) * 60);
  const timeTodayFormatted = h > 0 ? `${h}h ${m}m` : `${m}m`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Duo Status Official Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-400/30 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-white">
                Perfil do Estudante: Eduardo Mateus
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-400/30">
                Sem Dupla
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Eduardo estuda individualmente e está no ranking geral TJAM 2026 em 9º lugar (19,5%). Pedro Henrique está sozinho no 8º lugar (21,8%).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-200 text-xs font-black border border-indigo-400/30 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>9º Lugar Geral (19,5%)</span>
          </span>
        </div>
      </div>

      {/* Profile Header Card */}
      <div
        className={`p-8 rounded-3xl border shadow-sm space-y-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-400" />
                <span>Eduardo Mateus</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Estudante Individual • Preparatório TJAM 2026 (Assistente Judiciário)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-400/30">
                Sem Dupla
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                9º Lugar Geral
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Eduardo Mateus */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-indigo-500/30 flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-700 p-0.5 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                    alt="Eduardo Mateus"
                    className="w-full h-full object-cover rounded-[14px]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full text-[10px]">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white truncate">Eduardo Mateus A. Amorim</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-sky-500/20 text-sky-300 shrink-0">Você</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Aluno Titular • Foco TJAM</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[11px] text-indigo-300 font-bold bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                    Status: Sem Dupla • 9º Lugar (19,5%)
                  </span>
                </div>
              </div>
            </div>

            {/* Pedro Henrique */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-black text-lg text-slate-300 shadow-md">
                  PH
                </div>
                <span className="absolute -bottom-1 -right-1 bg-slate-700 text-slate-300 p-1 rounded-full text-[10px]">
                  <CheckCircle2 className="w-3 h-3" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white truncate">Pedro Henrique Ferreira</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-800 text-slate-300 shrink-0">Solo</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Estudante Independente TJAM</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[11px] text-slate-300 font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    8º Lugar Geral (21,8% • Sem Dupla)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Progresso no Ranking</span>
            <Award className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 dark:text-white">19,5%</p>
            <span className="text-xs font-bold text-sky-400 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> 9º Lugar
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Eduardo sem dupla • 9º Lugar no ranking</p>
        </div>

        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sequência</span>
            <Flame className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{progress.streakDays || 0} {progress.streakDays === 1 ? 'Dia' : 'Dias'}</p>
          <p className="text-[11px] text-slate-400">Estudos diários consecutivos</p>
        </div>

        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-purple-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tempo Hoje</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{timeTodayFormatted}</p>
          <p className="text-[11px] text-slate-400">Meta da dupla: 3h a 4h diárias</p>
        </div>

        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-blue-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Disciplina Atual</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white truncate">Legislação TJAM</p>
          <p className="text-[11px] text-slate-400">Aula 2: Org. Judiciária (LC 261/2023)</p>
        </div>
      </div>
    </div>
  );
};
