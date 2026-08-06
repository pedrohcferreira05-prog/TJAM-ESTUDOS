import React from 'react';
import { UserProgress } from '../types';
import {
  Flame,
  Clock,
  BookOpen,
  Award,
  Play,
  ArrowRight,
  Sparkles,
  Trophy,
  Users,
  Medal
} from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onNavigateTab: (tab: any) => void;
  isDarkMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onNavigateTab,
  isDarkMode,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Clean Welcome Header */}
      <div
        className={`p-8 rounded-3xl border shadow-sm transition-all space-y-4 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" /> Preparatório TJAM 2026
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Olá, Eduardo Mateus Alexandre Amorim!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            Sua meta diária de estudos já está pronta. Continue focado para garantir sua aprovação.
          </p>
        </div>

        {/* Primary CTA Box: Today's Class */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-600/20">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-emerald-200 tracking-wider">
              Disciplina do Dia & Próxima Aula (Quinta-Feira)
            </span>
            <h2 className="text-xl font-black">Informática</h2>
            <p className="text-xs text-emerald-100 font-medium">
              Aula 1 — Conceitos Básicos de Informática (Hardware, Software, Dado x Informação)
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('aula-hoje')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-extrabold text-xs hover:bg-emerald-50 transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer flex-shrink-0"
          >
            <Play className="w-4 h-4 fill-emerald-950" />
            <span>Continuar estudando</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Ranking da Dupla de Estudos */}
      <div
        className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Ranking da Dupla de Estudos
              </h3>
              <p className="text-[11px] text-slate-400">
                Acompanhamento em tempo real do progresso da dupla
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Dupla Ativa
          </span>
        </div>

        <div className="space-y-3">
          {/* 1° Lugar: Pedro Henrique */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDarkMode
                ? 'bg-amber-500/5 border-amber-500/20'
                : 'bg-amber-50/60 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
                1º
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Pedro Henrique
                  </span>
                  <Medal className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Líder do ranking
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: '25%' }}
                ></div>
              </div>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400 min-w-[50px] text-right">
                25%
              </span>
            </div>
          </div>

          {/* 2° Lugar: Eduardo Mateus */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDarkMode
                ? 'bg-slate-800/40 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-xs flex items-center justify-center shrink-0">
                2º
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Eduardo Mateus
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Seu perfil
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: '3%' }}
                ></div>
              </div>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 min-w-[50px] text-right">
                3%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">
          Seu Progresso
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Progresso Geral */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Progresso Atual</span>
              <Award className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">3%</p>
            <p className="text-[10px] text-slate-400">Meta do curso iniciada</p>
          </div>

          {/* Disciplina Atual */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-blue-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Disciplina Atual</span>
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-base font-black text-slate-900 dark:text-white truncate">Informática</p>
            <p className="text-[10px] text-slate-400">Unidade 1 — Conceitos Básicos de Informática</p>
          </div>

          {/* Sequência de estudos */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-amber-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Sequência</span>
              <Flame className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">1 dia</p>
            <p className="text-[10px] text-slate-400">Estudos consecutivos</p>
          </div>

          {/* Tempo estudado hoje */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-purple-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Tempo Hoje</span>
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">2h 20m</p>
            <p className="text-[10px] text-slate-400">Tempo de estudo diário</p>
          </div>
        </div>
      </div>
    </div>
  );
};
