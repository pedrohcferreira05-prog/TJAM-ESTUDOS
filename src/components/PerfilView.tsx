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
  TrendingUp
} from 'lucide-react';

interface PerfilViewProps {
  progress: UserProgress;
  isDarkMode?: boolean;
  isDuo?: boolean;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  progress,
}) => {
  const hours = progress.hoursStudiedToday || 0;
  const h = Math.floor(hours);
  const m = Math.round((hours % 1) * 60);
  const timeTodayFormatted = h > 0 ? `${h}h ${m}m` : `${m}m`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Duo Status Official Banner */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm text-slate-900">
                Perfil da Dupla Oficial: Eduardo Mateus & Pedro Henrique
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Dupla Oficial
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Eduardo e Pedro formam a dupla oficial de estudos TJAM 2026 em 5º lugar (30,0%), sem pendências.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>5º Lugar Geral (30,0%)</span>
          </span>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-6">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                <span>Eduardo Mateus & Pedro Henrique</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Dupla Oficial de Estudos • Preparatório TJAM 2026 (Assistente Judiciário)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Dupla Oficial
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                5º Lugar Geral
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Eduardo Mateus */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-600 p-0.5 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                    alt="Eduardo Mateus"
                    className="w-full h-full object-cover rounded-[14px]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full text-[10px]">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-extrabold text-sm text-slate-900 truncate">Eduardo Mateus A. Amorim</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-100 text-sky-800 shrink-0">Você</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Aluno Titular • Foco TJAM</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    5º Lugar Dupla • 2º Lugar Geral
                  </span>
                </div>
              </div>
            </div>

            {/* Pedro Henrique */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center font-black text-lg text-white shadow-xs">
                  PH
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full text-[10px]">
                  <CheckCircle2 className="w-3 h-3" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-extrabold text-sm text-slate-900 truncate">Pedro Henrique Ferreira</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 shrink-0">Parceiro</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Parceiro de Dupla Oficial</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    5º Lugar Dupla • 100% em dia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Progresso no Ranking</span>
            <Award className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900">30,0%</p>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> 5º Lugar
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Dupla Oficial: Eduardo & Pedro • 5º Lugar geral</p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sequência</span>
            <Flame className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900">{progress.streakDays || 0} {progress.streakDays === 1 ? 'Dia' : 'Dias'}</p>
          <p className="text-[11px] text-slate-500">Estudos diários consecutivos</p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-2">
          <div className="flex items-center justify-between text-indigo-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tempo Hoje</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900">{timeTodayFormatted}</p>
          <p className="text-[11px] text-slate-500">Meta da dupla: 3h a 4h diárias</p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-2">
          <div className="flex items-center justify-between text-sky-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Disciplina Atual</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-lg font-black text-slate-900 truncate">Legislação TJAM</p>
          <p className="text-[11px] text-slate-500">Aula 2: Org. Judiciária (LC 261/2023)</p>
        </div>
      </div>
    </div>
  );
};
