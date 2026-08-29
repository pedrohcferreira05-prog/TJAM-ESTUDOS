import React from 'react';
import { UserProgress } from '../types';
import {
  User,
  Users,
  GraduationCap,
  Flame,
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface PerfilViewProps {
  progress: UserProgress;
  isDarkMode: boolean;
  isDuo?: boolean;
  onOpenDuoInvite?: () => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  progress,
  isDarkMode,
  isDuo = false,
  onOpenDuoInvite,
}) => {
  const completedTopics = progress.completedTopicIds?.length || 0;
  const progressPct = Math.min(100, Math.round((completedTopics / 30) * 100));
  const hours = progress.hoursStudiedToday || 0;
  const h = Math.floor(hours);
  const m = Math.round((hours % 1) * 60);
  const timeTodayFormatted = h > 0 ? `${h}h ${m}m` : `${m}m`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Duo Status Notification Banner */}
      {isDuo ? (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-indigo-800/40 to-sky-900/50 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-amber-300 border border-indigo-400/30 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">
                  Dupla de Estudos Oficial TJAM 2026 Ativa
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Sincronizado
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Pedro Henrique & Eduardo Mateus estão estudando juntos com metas conjuntas.
              </p>
            </div>
          </div>

          {onOpenDuoInvite && (
            <button
              onClick={onOpenDuoInvite}
              className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold text-xs border border-indigo-400/30 transition-all shrink-0 cursor-pointer"
            >
              Configurar Dupla
            </button>
          )}
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">
                  Solicitação de Parceria Pendente
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Pedro Henrique
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pedro Henrique voltou aos estudos e enviou uma solicitação para ser sua dupla.
              </p>
            </div>
          </div>

          {onOpenDuoInvite && (
            <button
              onClick={onOpenDuoInvite}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-black text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ver Solicitação</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Profile Header Card */}
      <div
        className={`p-8 rounded-3xl border shadow-sm space-y-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {isDuo ? (
          /* Dual Profile Display */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-amber-400" />
                  <span>Pedro Henrique & Eduardo Mateus</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dupla Oficial de Estudos • Preparatório TJAM 2026 (Assistente Judiciário)
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Dupla de Alta Performance
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Eduardo Mateus */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                      alt="Eduardo Mateus"
                      className="w-full h-full object-cover rounded-[14px]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full text-[10px]">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-white">Eduardo Mateus A. Amorim</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-sky-500/20 text-sky-300">Você</span>
                  </div>
                  <p className="text-xs text-slate-400">Aluno Titular • Foco TJAM</p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Conectado ao Cronograma</p>
                </div>
              </div>

              {/* Pedro Henrique */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-indigo-500/30 flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-600 flex items-center justify-center font-black text-lg text-white shadow-md">
                    PH
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-white">Pedro Henrique Ferreira</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-500/20 text-indigo-300">Dupla</span>
                  </div>
                  <p className="text-xs text-slate-400">Voltou aos estudos • TJAM</p>
                  <p className="text-[11px] text-indigo-400 font-semibold mt-1">Solicitação Aceita</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Solo Eduardo Mateus Profile */
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 p-1 shadow-lg shadow-emerald-500/20">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                  alt="Eduardo Mateus Alexandre Amorim"
                  className="w-full h-full object-cover rounded-[22px]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                  Eduardo Mateus Alexandre Amorim
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Aluno Individual
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <span>Matriculado no Curso de Preparação TJAM</span>
              </p>

              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3 text-xs">
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-400">Curso: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">TJAM – Assistente Judiciário</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20">
                  <span className="font-bold text-slate-500 dark:text-slate-400">Status: </span>
                  <span>Modo Solo</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Progresso Geral</span>
            <Award className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{isDuo ? '100%' : `${progressPct}%`}</p>
          <p className="text-[11px] text-slate-500">{isDuo ? 'Sincronia total da dupla' : 'Módulos e aulas concluídos'}</p>
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
          <p className="text-[11px] text-slate-500">Estudos diários consecutivos</p>
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
          <p className="text-[11px] text-slate-500">{isDuo ? 'Meta da dupla: 3h a 4h' : 'Meta diária: 3h a 4h'}</p>
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
          <p className="text-lg font-black text-slate-900 dark:text-white truncate">Língua Inglesa & Constitucional</p>
          <p className="text-[11px] text-slate-500">Aula 3 (Inglês) / Aula 1 (Const.)</p>
        </div>
      </div>
    </div>
  );
};
