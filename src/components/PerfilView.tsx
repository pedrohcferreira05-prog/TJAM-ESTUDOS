import React from 'react';
import { UserProgress } from '../types';
import { User, GraduationCap, Flame, Clock, Award, BookOpen, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface PerfilViewProps {
  progress: UserProgress;
  isDarkMode: boolean;
}

export const PerfilView: React.FC<PerfilViewProps> = ({ progress, isDarkMode }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div
        className={`p-8 rounded-3xl border shadow-sm space-y-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
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
                Aluno
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
                <span>Em andamento</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Progresso Geral</span>
            <Award className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">28%</p>
          <p className="text-[11px] text-slate-500">Módulos e aulas concluídos</p>
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
          <p className="text-3xl font-black text-slate-900 dark:text-white">{progress.streakDays || 5} Dias</p>
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
          <p className="text-3xl font-black text-slate-900 dark:text-white">1h 45m</p>
          <p className="text-[11px] text-slate-500">Meta diária: 3h a 4h</p>
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
          <p className="text-lg font-black text-slate-900 dark:text-white truncate">Direito Constitucional</p>
          <p className="text-[11px] text-slate-500">Aula 1: O que é Constituição?</p>
        </div>
      </div>
    </div>
  );
};
