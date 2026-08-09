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
            Olá, Pedro Henrique & Eduardo Mateus!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            Sua meta diária de estudos está disponível. Acesse o conteúdo da aula de hoje abaixo e fortaleça sua preparação para o concurso do TJAM.
          </p>
        </div>

        {/* Primary CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-600/20">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Aula Liberada • Concurso TJAM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-amber-500 text-slate-950 font-black">
                <Clock className="w-3.5 h-3.5" /> Aula de Hoje: LIBRAS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">LIBRAS: Aula 1 – Conceitos básicos, história e legislação</h2>
            <p className="text-xs text-emerald-100 font-medium max-w-lg">
              Estude os conceitos básicos de LIBRAS, estrutura de língua autônoma visual-espacial, os 5 parâmetros dos sinais, datilologia, Lei nº 10.436/2002 e Decreto nº 5.626/2005 para o TJAM.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('aula-hoje')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-extrabold text-xs hover:bg-emerald-50 transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer shrink-0"
          >
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>Acessar Aula de Hoje</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Featured Aula de Hoje Module Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 transition-all ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800 shadow-emerald-950/20'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black text-[10px] uppercase tracking-wider">
                  Aula de Hoje
                </span>
                <span className="text-xs text-slate-400 font-medium">45 a 60 min • Nível Iniciante</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                LIBRAS — Unidade 1: Conceitos Básicos e Legislação
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Aula 1 – Conceitos básicos, história e legislação
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('aula-hoje')}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group shrink-0"
          >
            <span>Ir para a Aula</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Lesson Highlights & Topics */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Principais Tópicos Abordados na Aula
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                <FileText className="w-4 h-4" />
                <span>O que é LIBRAS?</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Língua de sinais autônoma, de modalidade gestual-visual, com estrutura gramatical, vocabulário e sintaxe próprios.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                <Layers className="w-4 h-4" />
                <span>5 Parâmetros dos Sinais</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Configuração de mão, Movimento, Ponto de articulação, Orientação da palma e Expressões não manuais.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                <Brain className="w-4 h-4" />
                <span>Datilologia e Expressões Faciais</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Datilologia (alfabeto manual para nomes próprios); Expressões faciais/corporais possuem função gramatical essencial.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                <Award className="w-4 h-4" />
                <span>Legislação TJAM (Lei & Decreto)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Lei nº 10.436/2002 e Decreto nº 5.626/2005 — Princípios de acessibilidade, inclusão e atendimento adequado no serviço público.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Access Tools inside Lesson Card */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-extrabold text-slate-400">Recursos disponíveis:</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[11px] flex items-center gap-1">
              <Video className="w-3 h-3" /> Vídeo
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
              <FileText className="w-3 h-3" /> Leitura
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center gap-1">
              <Brain className="w-3 h-3" /> Flashcards
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[11px] flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> 10 Questões
            </span>
          </div>

          <button
            onClick={() => onNavigateTab('aula-hoje')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Acessar Aula de Hoje Completa</span>
          </button>
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
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px]">
                      1º Lugar
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    <strong className="text-emerald-600 dark:text-emerald-400">9%</strong> atividades concluídas
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: '10%' }}
                  ></div>
                </div>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400 min-w-[50px] text-right">
                  10%
                </span>
              </div>
            </div>

            {/* Eduardo Mateus */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDarkMode
                  ? 'bg-slate-800/40 border-slate-800'
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
                    <span className="text-xs text-slate-400">(Seu perfil)</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    <strong className="text-emerald-600 dark:text-emerald-400">7%</strong> atividades concluídas
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: '10%' }}
                  ></div>
                </div>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 min-w-[50px] text-right">
                  10%
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
            {/* 1° Jonas e Carla - 35% */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/20' : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
                  1º
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Jonas e Carla
                  </span>
                  <Medal className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                  35%
                </span>
              </div>
            </div>

            {/* 2° Pietro e Heitor - 32% */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-400 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2º
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Pietro e Heitor
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '32%' }}></div>
                </div>
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                  32%
                </span>
              </div>
            </div>

            {/* 3° João e Alicia - 28% */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-700/80 text-white font-black text-xs flex items-center justify-center shrink-0">
                  3º
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  João e Alicia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '28%' }}></div>
                </div>
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                  28%
                </span>
              </div>
            </div>

            {/* 4° Martins e Márcio - 25% */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                  4º
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Martins e Márcio
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-slate-500 h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                  25%
                </span>
              </div>
            </div>

            {/* 5° Lucas e Mariana - 22% (Alguém Aleatório) */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                  5º
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Lucas e Mariana
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-slate-500 h-full rounded-full" style={{ width: '22%' }}></div>
                </div>
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                  22%
                </span>
              </div>
            </div>

            {/* 6° Gabriel e Beatriz - 18% */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                  6º
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Gabriel e Beatriz
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-slate-500 h-full rounded-full" style={{ width: '18%' }}></div>
                </div>
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                  18%
                </span>
              </div>
            </div>

            {/* 7° Pedro e Eduardo (Sua Dupla) - 15% */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode
                  ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20'
                  : 'bg-emerald-50 border-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                  7º
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Pedro e Eduardo
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px]">
                      Sua Dupla
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  15%
                </span>
              </div>
            </div>

            {/* 8° Bruno e Camila - 12% */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                  8º
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Bruno e Camila
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-slate-500 h-full rounded-full" style={{ width: '12%' }}></div>
                </div>
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                  12%
                </span>
              </div>
            </div>
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
            <p className="text-3xl font-black text-slate-900 dark:text-white">10%</p>
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
            <p className="text-3xl font-black text-slate-900 dark:text-white truncate">7%</p>
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
