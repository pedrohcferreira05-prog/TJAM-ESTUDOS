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
            <Sparkles className="w-3.5 h-3.5" /> Preparatório TJAM 2026 • Aula do Dia Liberada
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Olá, Eduardo Mateus!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            Sua meta de estudo de hoje está liberada: <strong className="text-emerald-600 dark:text-emerald-400">Direito Administrativo (Aula 7: Poderes da Administração Pública)</strong> com foco especial na banca FGV.
          </p>
        </div>

        {/* Primary CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-emerald-600/20">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Aula de Hoje • TJAM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-amber-500 text-slate-950 font-black">
                <Clock className="w-3.5 h-3.5" /> Meta Diária Liberada
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">⚖️ Direito Administrativo — Aula 7: Poderes da Administração</h2>
            <p className="text-xs text-emerald-100 font-medium max-w-lg">
              Estude Poder Hierárquico, Disciplinar, Regulamentar, Poder de Polícia, Poder Vinculado vs. Discricionário e Abuso de Poder (Excesso de Poder e Desvio de Finalidade).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => handleOpenLesson('direito_admin')}
              className="px-5 py-3.5 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>Acessar Aula 7 de Hoje</span>
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
              Aulas Disponíveis no Preparatório
            </h2>
          </div>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Todas Liberadas
          </span>
        </div>

        {/* Featured Today's Lessons Grid (Two Cards Side-by-Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Card 1: Direito Administrativo (Aula 7) */}
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
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AULA DE HOJE • DIR. ADMINISTRATIVO
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Aula 7 • FGV
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  ⚖️ Dir. Administrativo — Aula 7
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Poderes da Administração Pública
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 leading-relaxed">
                  Domine o Poder Hierárquico, Poder Disciplinar (supremacia especial), Poder Regulamentar, Poder de Polícia (atributos: Discricionariedade, Autoexecutoriedade e Coercibilidade) e Abuso de Poder.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Vídeo Aula HD</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">20 Questões + Flashcards</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenLesson('direito_admin')}
              className="w-full px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Assistir Aula de Hoje (Direito Administrativo)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Featured Card 2: Processo Penal (Aula 6) */}
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
                  <BookOpen className="w-3.5 h-3.5 text-teal-200" /> PROCESSO PENAL
                </span>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full">
                  Aula 6
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  ⚖️ Processo Penal — Aula 6
                </h3>
                <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                  Princípios e Aplicação da Lei Processual Penal
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 leading-relaxed">
                  Estude Devido Processo Legal, Contraditório, Ampla Defesa, Presunção de Inocência, Juiz Natural, o princípio <em>tempus regit actum</em> e a eficácia da lei processual penal.
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
              className="w-full px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Acessar Aula de Processo Penal</span>
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
                  Seu Progresso no Ranking Geral
                </h3>
                <p className="text-[11px] text-slate-400">
                  Desempenho comparativo no Preparatório TJAM 2026
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Estudante
            </span>
          </div>

          <div className="space-y-3">
            {/* Seu Perfil: Eduardo Mateus */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDarkMode
                  ? 'bg-sky-500/10 border-sky-500/30 ring-1 ring-sky-500/20'
                  : 'bg-sky-50 border-sky-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0">
                  12º
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Eduardo Mateus
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-700 dark:text-sky-300 font-extrabold text-[10px]">
                      Seu Perfil
                    </span>
                  </div>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1 mt-0.5">
                    📊 12º Lugar Geral no Curso
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(realProgressPct, 3)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-black text-sky-600 dark:text-sky-400 min-w-[50px] text-right">
                  {Math.max(realProgressPct, 3)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ranking Geral de Alunos */}
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
                  Classificação Geral de Alunos
                </h3>
                <p className="text-[11px] text-slate-400">
                  Classificação individual de estudantes do Preparatório TJAM
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Geral
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { pos: 1, name: 'Lucas Silveira', pct: '6,0%', isUser: false, barWidth: '100%' },
              { pos: 2, name: 'Mariana Costa', pct: '5,7%', isUser: false, barWidth: '95%' },
              { pos: 3, name: 'Gabriel Souza', pct: '5,4%', isUser: false, barWidth: '90%' },
              { pos: 4, name: 'Sofia Albuquerque', pct: '5,1%', isUser: false, barWidth: '85%' },
              { pos: 5, name: 'Matheus Ribeiro', pct: '4,8%', isUser: false, barWidth: '80%' },
              { pos: 6, name: 'Beatriz Lima', pct: '4,5%', isUser: false, barWidth: '75%' },
              { pos: 7, name: 'Rafael Mendes', pct: '4,2%', isUser: false, barWidth: '70%' },
              { pos: 8, name: 'Amanda Rocha', pct: '4,0%', isUser: false, barWidth: '66.7%' },
              { pos: 9, name: 'Carlos Eduardo', pct: '3,8%', isUser: false, barWidth: '63.3%' },
              { pos: 10, name: 'Juliana Castro', pct: '3,7%', isUser: false, barWidth: '61.7%' },
              { pos: 11, name: 'Bruno Carvalho', pct: '3,5%', isUser: false, barWidth: '58.3%' },
              { pos: 12, name: 'Eduardo Mateus', pct: '3,4%', isUser: true, barWidth: '56.7%' },
            ].map((aluno) => (
              <div
                key={aluno.pos}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  aluno.isUser
                    ? isDarkMode
                      ? 'bg-sky-500/15 border-sky-400/40 ring-1 ring-sky-400/30'
                      : 'bg-sky-50 border-sky-300'
                    : isDarkMode
                    ? 'bg-slate-800/40 border-slate-800/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 shadow-sm ${
                      aluno.isUser
                        ? 'bg-sky-600 text-white'
                        : aluno.pos === 1
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : aluno.pos === 2
                        ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : aluno.pos === 3
                        ? 'bg-amber-700/60 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {aluno.pos}º
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-extrabold text-xs sm:text-sm ${aluno.isUser ? 'text-sky-400 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300'}`}>
                        {aluno.name}
                      </span>
                      {aluno.isUser && (
                        <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-400/30 font-extrabold text-[10px] flex items-center gap-1">
                          <span>Você</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`${aluno.isUser ? 'bg-sky-400' : 'bg-slate-400 dark:bg-slate-600'} h-full rounded-full`}
                      style={{ width: aluno.barWidth }}
                    ></div>
                  </div>
                  <span className={`text-sm font-black ${aluno.isUser ? 'text-sky-500 dark:text-sky-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {aluno.pct}
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
