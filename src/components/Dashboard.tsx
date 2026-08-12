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
  Medal,
  CheckCircle2,
  FileText,
  HelpCircle,
  Layers,
  Brain,
  Video
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
  const completedTopicsCount = progress.completedTopicIds?.length || 0;
  const questionAttemptsCount = progress.questionAttempts?.length || 0;
  const totalCompletedActivities = completedTopicsCount + questionAttemptsCount;
  const realProgressPct = Math.min(100, Math.round((completedTopicsCount / 30) * 100));
  const timeTodayHours = progress.hoursStudiedToday || 0;
  const h = Math.floor(timeTodayHours);
  const m = Math.round((timeTodayHours % 1) * 60);
  const timeTodayFormatted = h > 0 ? `${h}h ${m}m` : `${m}m`;

  const handleOpenLesson = (subject: 'direito_admin' | 'portugues' | 'direito_const' | string) => {
    try {
      localStorage.setItem('tjam_selected_subject', subject);
      window.dispatchEvent(new Event('tjam_subject_change'));
    } catch (e) {}
    onNavigateTab('aula-hoje');
  };

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
            <Sparkles className="w-3.5 h-3.5" /> Preparatório TJAM 2026 • 2 Aulas do Dia Liberadas
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Olá, Pedro Henrique & Eduardo Mateus!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            Sua meta diária está disponível com <strong>2 aulas para assistir hoje</strong>: <strong className="text-emerald-600 dark:text-emerald-400">Processo Penal (Aula 6: Princípios e Aplicação)</strong> e <strong className="text-emerald-600 dark:text-emerald-400">Processo Civil (Aula 5: Atos Processuais)</strong>.
          </p>
        </div>

        {/* Primary CTA Banner with Two Buttons */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-emerald-600/20">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> 2 Aulas de Hoje • TJAM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-amber-500 text-slate-950 font-black">
                <Clock className="w-3.5 h-3.5" /> Meta Diária Liberada
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">⚖️ Processo Penal (Aula 6) & Processo Civil (Aula 5)</h2>
            <p className="text-xs text-emerald-100 font-medium max-w-lg">
              Assista às vídeo aulas completas, resumos, mapas mentais, flashcards e responda às listas de exercícios com gabarito.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => handleOpenLesson('processo_penal')}
              className="px-4 py-3 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>Aula 1: Proc. Penal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleOpenLesson('processo_civil')}
              className="px-4 py-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-400/40"
            >
              <BookOpen className="w-4 h-4 text-white" />
              <span>Aula 2: Proc. Civil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Today's Lessons Section Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Aulas para Assistir Hoje (Disponíveis na Aba Aula de Hoje)
            </h2>
          </div>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            2 Aulas Liberadas
          </span>
        </div>

        {/* Featured Today's Lessons Grid (Two Cards Side-by-Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Card 1: Processo Penal (Aula 6) */}
          <div
            className={`p-6 sm:p-7 rounded-3xl border shadow-lg space-y-5 transition-all flex flex-col justify-between ${
              isDarkMode
                ? 'bg-slate-900 border-emerald-500/30 shadow-emerald-950/20 ring-1 ring-emerald-500/20'
                : 'bg-emerald-50/40 border-emerald-200 shadow-emerald-500/5'
            }`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-emerald-200 dark:border-slate-800">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AULA 1 DE HOJE • PROCESSO PENAL
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Aula 6
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  ⚖️ Processo Penal — Aula 6
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Princípios e Aplicação da Lei Processual Penal
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 leading-relaxed">
                  Estude Devido Processo Legal, Contraditório, Ampla Defesa, Presunção de Inocência, Juiz Natural, o princípio <em>tempus regit actum</em> e a eficácia da lei no tempo e no espaço.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Vídeo Aula HD</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">20 Questões</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenLesson('processo_penal')}
              className="w-full px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Assistir Aula 1 (Processo Penal)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Featured Card 2: Processo Civil (Aula 5) */}
          <div
            className={`p-6 sm:p-7 rounded-3xl border shadow-lg space-y-5 transition-all flex flex-col justify-between ${
              isDarkMode
                ? 'bg-slate-900 border-teal-500/30 shadow-teal-950/20 ring-1 ring-teal-500/20'
                : 'bg-teal-50/40 border-teal-200 shadow-teal-500/5'
            }`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-teal-200 dark:border-slate-800">
                <span className="px-3 py-1 rounded-full bg-teal-600 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AULA 2 DE HOJE • PROCESSO CIVIL
                </span>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full">
                  Aula 5
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  ⚖️ Processo Civil — Aula 5
                </h3>
                <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                  Atos Processuais (CPC/2015)
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 leading-relaxed">
                  Aprenda a classificação dos atos, atos das partes, pronunciamentos do juiz (sentença, decisão interlocutória e despacho), citação, intimação e contagem de prazos em dias úteis.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Vídeo Aula HD</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">20 Questões</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenLesson('processo_civil')}
              className="w-full px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Assistir Aula 2 (Processo Civil)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Two Secondary Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 2: Língua Portuguesa */}
          <div
            className={`p-6 rounded-3xl border shadow-md space-y-5 flex flex-col justify-between transition-all ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800 shadow-emerald-950/10'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Língua Portuguesa
                </span>
                <span className="text-[11px] font-bold text-slate-400">45 min • FGV</span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Compreensão e Interpretação de Textos
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Capítulo 1 – Leitura, sentido global, inferências, coesão e coerência textual.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                  Destaques da Aula:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Inferências e sentidos implícitos cobrados pela banca FGV;</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Mecanismos de coesão anafórica e catafórica;</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <button
                onClick={() => handleOpenLesson('portugues')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Acessar Aula de Português</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Direito Constitucional */}
          <div
            className={`p-6 rounded-3xl border shadow-md space-y-5 flex flex-col justify-between transition-all ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800 shadow-emerald-950/10'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-emerald-500" /> Direito Constitucional
                </span>
                <span className="text-[11px] font-bold text-slate-400">50 min • CF/88</span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Princípios Fundamentais (Arts. 1º a 4º)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Aula 2 – Fundamentos, Tripartição dos Poderes e Objetivos.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                  Destaques da Aula:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>5 Fundamentos & Mnemônico SO-CI-DI-VA-PLU;</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Objetivos CONERGAPRO e Relações Internacionais.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <button
                onClick={() => handleOpenLesson('direito_const')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Acessar Aula de Constitucional</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULADO GERAL TJAM - Featured Action Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-slate-900 text-slate-950 dark:text-white border border-amber-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-amber-400">
              📝 Prova Simulada Completa
            </span>
            <span className="text-xs font-bold text-slate-950 dark:text-amber-200">
              40 Questões • 60 Minutos
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white leading-tight">
            Simulado Geral Oficial — TJAM (Assistente Judiciário)
          </h2>
          <p className="text-xs font-medium text-slate-950/90 dark:text-slate-200 leading-relaxed">
            Testes abrangendo Língua Portuguesa, Direito Constitucional, Direito Administrativo, Informática, Processo Civil, Processo Penal, LIBRAS e Questões Interdisciplinares. Receba o gabarito comentado, diagnóstico e opção de download em PDF.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('simulados')}
          className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold text-xs shadow-lg shadow-slate-950/30 flex items-center justify-center gap-2 transition-all cursor-pointer group shrink-0"
        >
          <Play className="w-4 h-4 fill-amber-400 group-hover:scale-110 transition-transform" />
          <span>Fazer Simulado Agora</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Ranking da Dupla de Estudos & Ranking Geral de Duplas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking Individual (Atual) */}
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
                  Progresso e Ranking Individual
                </h3>
                <p className="text-[11px] text-slate-400">
                  Desempenho dos integrantes da dupla de estudos
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
                  ? 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/20'
                  : 'bg-amber-50 border-amber-300'
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
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px]">
                      1º Lugar
                    </span>
                  </div>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                    🥇 Melhor nos exercícios
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(realProgressPct, 3)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400 min-w-[50px] text-right">
                  {Math.max(realProgressPct, 3)}%
                </span>
              </div>
            </div>

            {/* 2° Lugar: Eduardo Mateus */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDarkMode
                  ? 'bg-slate-800/60 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2º
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Eduardo Mateus
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px]">
                      2º Lugar
                    </span>
                    <span className="text-xs text-slate-400">(Seu perfil)</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                    📉 2 gabaritos abaixo de Pedro
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(realProgressPct, 3)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 min-w-[50px] text-right">
                  {Math.max(realProgressPct, 3)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Novo Ranking de Duplas */}
        <div
          className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Ranking Geral de Duplas
                </h3>
                <p className="text-[11px] text-slate-400">
                  Classificação das duplas de estudos do Preparatório TJAM
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Geral
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { pos: 1, name: 'Lucas e Mariana', pct: '4,0%', isUser: false, barWidth: '100%' },
              { pos: 2, name: 'Gabriel e Sofia', pct: '3,8%', isUser: false, barWidth: '95%' },
              { pos: 3, name: 'Matheus e Beatriz', pct: '3,5%', isUser: false, barWidth: '87.5%' },
              { pos: 4, name: 'Rafael e Amanda', pct: '3,3%', isUser: false, barWidth: '82.5%' },
              { pos: 5, name: 'Pedro e Eduardo', pct: '3,1%', isUser: true, barWidth: '77.5%' },
            ].map((dupla) => (
              <div
                key={dupla.pos}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  dupla.isUser
                    ? isDarkMode
                      ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20'
                      : 'bg-emerald-50 border-emerald-300'
                    : isDarkMode
                    ? 'bg-slate-800/40 border-slate-800/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 shadow-sm ${
                      dupla.isUser
                        ? 'bg-emerald-600 text-white'
                        : dupla.pos === 2
                        ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {dupla.pos}º
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-extrabold text-xs sm:text-sm ${dupla.isUser ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {dupla.name}
                      </span>
                      {dupla.isUser && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px]">
                          Sua Dupla
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`${dupla.isUser ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'} h-full rounded-full`}
                      style={{ width: dupla.barWidth }}
                    ></div>
                  </div>
                  <span className={`text-sm font-black ${dupla.isUser ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {dupla.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">
          Seu Desempenho e Atividades
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Progresso Geral */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Progresso Geral</span>
              <Award className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{realProgressPct}%</p>
            <p className="text-[10px] text-slate-400">Progresso total no curso</p>
          </div>

          {/* Atividades Concluídas */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-blue-500">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Atividades Concluídas</span>
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white truncate">{totalCompletedActivities}</p>
            <p className="text-[10px] text-slate-400">Exercícios e tarefas finalizadas</p>
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
            <p className="text-3xl font-black text-slate-900 dark:text-white">{progress.streakDays || 0} {progress.streakDays === 1 ? 'dia' : 'dias'}</p>
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
            <p className="text-3xl font-black text-slate-900 dark:text-white">{timeTodayFormatted}</p>
            <p className="text-[10px] text-slate-400">Tempo de estudo diário</p>
          </div>
        </div>
      </div>
    </div>
  );
};
