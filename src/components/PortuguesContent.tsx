import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Trophy,
  Layers,
  HelpCircle,
  FileText,
  FileCheck2,
  Bookmark,
  Scale,
  Brain,
  Play,
  ExternalLink,
  Table,
  Eye
} from 'lucide-react';

interface PortuguesContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  onToggleCompleted?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const PortuguesContent: React.FC<PortuguesContentProps> = ({
  isDarkMode,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted,
  handleMarkAsCompleted: propHandleMarkAsCompleted,
  onToggleComplete,
  onToggleCompleted,
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>({});

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  });
  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5" />
            Língua Portuguesa • Conjunções e Conectivos
          </span>
          <span className="text-xs font-bold text-amber-100">
            Foco TJAM 2026 • FGV
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>📚 CONJUNÇÕES E CONECTIVOS: COORDENADAS E SUBORDINADAS</span>
        </h1>
        <p className="text-xs sm:text-sm text-amber-50 leading-relaxed max-w-3xl">
          Domine a identificação das relações semânticas, tabela de conectivos para memorizar, análise contextual de pegadinhas de prova e resolução de 20 questões gabaritadas.
        </p>

        {/* Action buttons inside banner */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2.5 rounded-xl bg-white text-amber-800 hover:bg-amber-50 font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Brain className="w-4 h-4 text-amber-700" />
            <span>Resolver as 20 Questões Gabaritadas</span>
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className="px-4 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-amber-300" />
            <span>Assistir Vídeo Aula</span>
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className="px-4 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Flashcards</span>
          </button>
        </div>
      </div>

      {/* Objetivos da Aula */}
      <section
        className={`p-6 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/50 border-amber-200/60'
        }`}
      >
        <h2 className="text-base font-black text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" /> Objetivos de Aprendizagem — Conjunções & Conectivos
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Nesta aula essencial para o concurso do TJAM, você irá dominar:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-amber-200/50 dark:border-slate-700 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0">1</span>
            <span><strong>Definição e papel:</strong> Compreender como as conjunções estabelecem sentido e coesão textual.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-amber-200/50 dark:border-slate-700 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0">2</span>
            <span><strong>Conjunções Coordenativas:</strong> Aditivas, adversativas, alternativas, conclusivas e explicativas.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-amber-200/50 dark:border-slate-700 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0">3</span>
            <span><strong>Conjunções Subordinativas:</strong> Temporais, causais, finais, consecutivas, condicionais, concessivas e comparativas.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-amber-200/50 dark:border-slate-700 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0">4</span>
            <span><strong>Pegadinhas da FGV:</strong> Análise de sentido contextual e equivalência semântica de conectivos.</span>
          </div>
        </div>
      </section>

      {/* 🎯 1. O que são conjunções? */}
      <section className={`p-6 sm:p-7 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg shrink-0">
            🎯
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Seção 01</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              1. O que são conjunções?
            </h2>
          </div>
        </div>

        <p className="text-sm leading-relaxed">
          São palavras invariáveis que ligam palavras ou orações, estabelecendo uma <strong className="text-amber-600 dark:text-amber-400">relação de sentido</strong> (valor semântico) entre elas.
        </p>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs sm:text-sm space-y-2">
          <span className="font-black text-amber-800 dark:text-amber-300 block">Exemplo Clássico:</span>
          <blockquote className="p-3 rounded-xl bg-white dark:bg-slate-900 border-l-4 border-amber-500 font-medium italic text-slate-700 dark:text-slate-200">
            “Estudei bastante <strong className="text-amber-600 dark:text-amber-400 underline decoration-2 font-bold">e</strong> fiz a prova.”
          </blockquote>
          <p className="text-slate-600 dark:text-slate-400">
            ➡️ A palavra <strong>“e”</strong> atua como elemento de coesão, unindo as duas orações e somando as duas ações realizadas.
          </p>
        </div>
      </section>

      {/* 🔹 2. Conjunções coordenativas */}
      <section className={`p-6 sm:p-7 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-5`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg shrink-0">
            🔹
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Seção 02 • Coordenação</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              2. Conjunções Coordenativas
            </h2>
          </div>
        </div>

        <p className="text-sm leading-relaxed">
          As conjunções coordenativas ligam <strong className="text-blue-600 dark:text-blue-400">orações independentes</strong> sintaticamente entre si. Dividem-se em 5 grupos principais:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          {/* Aditivas */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 text-sm">
                ➕ Aditivas — Ideia de Soma
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
                e, nem, mas também, bem como
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium italic text-slate-700 dark:text-slate-200">
              “Estudou <strong className="text-emerald-600 dark:text-emerald-400 font-bold">e</strong> fez os exercícios.” / “Não apenas estudou, <strong className="text-emerald-600 dark:text-emerald-400 font-bold">mas também</strong> resolveu questões.”
            </div>
          </div>

          {/* Adversativas */}
          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-black text-rose-700 dark:text-rose-400 flex items-center gap-1.5 text-sm">
                ⚔️ Adversativas — Ideia de Oposição / Contraste
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold text-[11px]">
                mas, porém, contudo, todavia, entretanto, no entanto
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200/50 dark:border-slate-800 font-medium italic text-slate-700 dark:text-slate-200">
              “Estudou muito, <strong className="text-rose-600 dark:text-rose-400 font-bold">mas</strong> não foi aprovado.” / “Estava cansado, <strong className="text-rose-600 dark:text-rose-400 font-bold">porém</strong> continuou estudando.”
            </div>
            <p className="text-[11px] text-rose-800 dark:text-rose-300 font-semibold">
              📌 <strong>Regra de Ouro:</strong> “mas” expressa oposição categórica e vem sempre no início da oração que introduz.
            </p>
          </div>

          {/* Alternativas */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5 text-sm">
                🔀 Alternativas — Ideia de Escolha / Alternância
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold text-[11px]">
                ou, ou...ou, ora...ora, quer...quer
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/50 dark:border-slate-800 font-medium italic text-slate-700 dark:text-slate-200">
              “<strong className="text-amber-600 dark:text-amber-400 font-bold">Ou</strong> você estuda, <strong className="text-amber-600 dark:text-amber-400 font-bold">ou</strong> terá dificuldades na prova.”
            </div>
          </div>

          {/* Conclusivas */}
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-black text-purple-700 dark:text-purple-400 flex items-center gap-1.5 text-sm">
                ✅ Conclusivas — Ideia de Conclusão / Desfecho Lógico
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold text-[11px]">
                logo, portanto, então, por isso, assim, destarte
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200/50 dark:border-slate-800 font-medium italic text-slate-700 dark:text-slate-200">
              “Estudou bastante, <strong className="text-purple-600 dark:text-purple-400 font-bold">portanto</strong> estava preparado.”
            </div>
          </div>

          {/* Explicativas */}
          <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/40 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-black text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5 text-sm">
                💡 Explicativas — Ideia de Explicação / Justificativa
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold text-[11px]">
                porque, pois (antes do verbo), que
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200/50 dark:border-slate-800 font-medium italic text-slate-700 dark:text-slate-200">
              “Estude, <strong className="text-cyan-600 dark:text-cyan-400 font-bold">porque</strong> a prova será difícil.” (justifica a ordem "estude")
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. Conjunções subordinativas */}
      <section className={`p-6 sm:p-7 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-5`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-lg shrink-0">
            🔹
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Seção 03 • Subordinação</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              3. Conjunções Subordinativas (Adverbiais)
            </h2>
          </div>
        </div>

        <p className="text-sm leading-relaxed">
          Ligam uma <strong className="text-indigo-600 dark:text-indigo-400">oração dependente</strong> à oração principal, indicando circunstâncias adverbiais:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          {/* Temporais */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              ⏰ Temporais — Tempo
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              quando, enquanto, assim que, logo que, depois que
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
              “<strong className="text-indigo-600 dark:text-indigo-400">Quando</strong> chegar, começaremos a aula.”
            </div>
          </div>

          {/* Causais */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              🧠 Causais — Motivo / Causa Factual
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              porque, pois, como (no início), já que, visto que
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
              “Faltou à aula <strong className="text-indigo-600 dark:text-indigo-400">porque</strong> estava doente.”
            </div>
          </div>

          {/* Finais */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              🎯 Finais — Finalidade / Objetivo
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              para que, a fim de que
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
              “Estudou <strong className="text-indigo-600 dark:text-indigo-400">para que</strong> pudesse ser aprovado.”
            </div>
          </div>

          {/* Consecutivas */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              📈 Consecutivas — Consequência
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              tão... que, tanto... que, tal... que
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
              “Estudou <strong className="text-indigo-600 dark:text-indigo-400">tanto que</strong> conseguiu uma excelente nota.”
            </div>
          </div>

          {/* Condicionais */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              🔐 Condicionais — Condição / Hipótese
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              se, caso, contanto que, desde que
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
              “<strong className="text-indigo-600 dark:text-indigo-400">Se</strong> estudar, terá mais chances de aprovação.”
            </div>
          </div>

          {/* Concessivas */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              ⚖️ Concessivas — Ideia de Contraste / Concessão
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              embora, ainda que, mesmo que, apesar de que, conquanto
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
              “<strong className="text-indigo-600 dark:text-indigo-400">Embora</strong> estivesse cansado, continuou estudando.”
            </div>
          </div>

          {/* Comparativas */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 md:col-span-2">
            <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              🔄 Comparativas — Comparação / Confronto
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              como, assim como, mais... que, menos... que, tal qual
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
              “Ele estuda <strong className="text-indigo-600 dark:text-indigo-400">como</strong> o irmão.”
            </div>
          </div>
        </div>
      </section>

      {/* ⚠️ 4. Pegadinha importante */}
      <section className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-rose-950/80 border-2 border-amber-500/50 shadow-xl text-white space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-lg shrink-0">
            ⚠️
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">Atenção Especial • FGV</span>
            <h2 className="text-lg sm:text-xl font-black text-amber-100">
              4. Pegadinha Importante: O Sentido Depende do Contexto!
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed">
          A mesma palavra pode apresentar <strong className="text-amber-300">sentidos completamente diferentes</strong> dependendo do contexto oracional. Veja o confronto clássico:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase tracking-wider">
              Sentido 1: CAUSA
            </span>
            <blockquote className="p-2.5 rounded-xl bg-slate-900 border-l-2 border-emerald-400 italic">
              “Não fui à aula <strong className="text-emerald-300">porque</strong> estava doente.”
            </blockquote>
            <p className="text-slate-300 text-xs">
              ➡️ A doença é a causa factual prévia do fato de não ir à aula.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-black text-xs uppercase tracking-wider">
              Sentido 2: EXPLICAÇÃO
            </span>
            <blockquote className="p-2.5 rounded-xl bg-slate-900 border-l-2 border-cyan-400 italic">
              “Estude, <strong className="text-cyan-300">porque</strong> a prova está próxima.”
            </blockquote>
            <p className="text-slate-300 text-xs">
              ➡️ Justifica uma ordem ou conselho (verbo no imperativo "estude").
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-100 font-semibold leading-relaxed">
          💡 <strong>Conclusão estratégica:</strong> Por isso, não basta decorar a palavra isolada. É indispensável analisar a relação de causa, tempo, condição ou oposição entre as orações!
        </div>
      </section>

      {/* 🧠 5. Tabela para memorizar */}
      <section className={`p-6 sm:p-7 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg shrink-0">
            🧠
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Guia Visual Rápido</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              5. Tabela para Memorizar
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Utilize esta tabela como consulta rápida para fixação diária e revisão de véspera:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-black border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Relação Semântica</th>
                <th className="py-3 px-4">Conectivos & Exemplos Principais</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-emerald-700 dark:text-emerald-400">Adição</td>
                <td className="py-2.5 px-4 font-mono text-xs">e, nem, mas também, bem como</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-rose-700 dark:text-rose-400">Oposição</td>
                <td className="py-2.5 px-4 font-mono text-xs">mas, porém, contudo, todavia, entretanto</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-amber-700 dark:text-amber-400">Alternância</td>
                <td className="py-2.5 px-4 font-mono text-xs">ou, ou...ou, ora...ora</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-purple-700 dark:text-purple-400">Conclusão</td>
                <td className="py-2.5 px-4 font-mono text-xs">portanto, logo, por isso, assim, destarte</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-cyan-700 dark:text-cyan-400">Explicação</td>
                <td className="py-2.5 px-4 font-mono text-xs">porque, pois (antes do verbo), que</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-blue-700 dark:text-blue-400">Causa</td>
                <td className="py-2.5 px-4 font-mono text-xs">porque, já que, visto que, como (início)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-indigo-700 dark:text-indigo-400">Condição</td>
                <td className="py-2.5 px-4 font-mono text-xs">se, caso, contanto que, desde que</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-teal-700 dark:text-teal-400">Finalidade</td>
                <td className="py-2.5 px-4 font-mono text-xs">para que, a fim de que</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-orange-700 dark:text-orange-400">Consequência</td>
                <td className="py-2.5 px-4 font-mono text-xs">tanto que, tão que, de modo que</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-fuchsia-700 dark:text-fuchsia-400">Concessão</td>
                <td className="py-2.5 px-4 font-mono text-xs">embora, ainda que, mesmo que, conquanto</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-sky-700 dark:text-sky-400">Tempo</td>
                <td className="py-2.5 px-4 font-mono text-xs">quando, enquanto, logo que, assim que</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-violet-700 dark:text-violet-400">Comparação</td>
                <td className="py-2.5 px-4 font-mono text-xs">como, assim como, mais que, menos que</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🎯 Para o TJAM */}
      <section className={`p-6 sm:p-7 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg shrink-0">
            🎯
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Estratégia de Prova</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Para o TJAM (Dica de Ouro FGV)
            </h2>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
          <p className="font-semibold">
            Nas questões da FGV para o TJAM, procure principalmente <strong>identificar o sentido do conectivo dentro da frase</strong>.
          </p>
          <p>
            A banca costuma trocar a conjunção por outra expressão correlata (por exemplo, substituir <em>“embora”</em> por <em>“conquanto”</em> ou <em>“contudo”</em> por <em>“todavia”</em>) e perguntar se o sentido original e a correção gramatical foram mantidos.
          </p>
        </div>
      </section>

      {/* Vídeo Aula Oficial */}
      <section className={`p-6 sm:p-7 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center font-black text-lg shrink-0">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-red-500">Recurso Audiovisual Recomendado</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Vídeo Aula — Conjunções e Conectivos
              </h3>
            </div>
          </div>
          <a
            href="https://youtu.be/tKJkDQSMdh0?is=gM9g7QpGdermwN6G"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Abrir no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Player Embed */}
        <div className="rounded-2xl overflow-hidden aspect-video w-full bg-slate-950 border border-slate-800 shadow-md">
          <iframe
            src="https://www.youtube.com/embed/tKJkDQSMdh0"
            title="Vídeo Aula — Conjunções e Conectivos"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Checklist Interativo */}
      <section
        className={`p-6 sm:p-7 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        } shadow-sm space-y-4`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Checklist de Fixação da Aula
          </h3>
          <span className="text-xs text-slate-500">
            Marque os tópicos conforme for dominando:
          </span>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm">
          {[
            { id: 'item1', label: 'Conceito de conjunção e ligação entre orações ou termos equivalentes.' },
            { id: 'item2', label: 'As 5 conjunções coordenativas: aditivas, adversativas, alternativas, conclusivas e explicativas.' },
            { id: 'item3', label: 'As conjunções subordinativas adverbiais: temporais, causais, finais, consecutivas, etc.' },
            { id: 'item4', label: 'Diferenciação contextual entre "porque" causal e "porque" explicativo.' },
            { id: 'item5', label: 'Memorização da tabela de conectivos e relações semânticas.' },
            { id: 'item6', label: 'Resolução completa das 20 questões gabaritadas de fixação.' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                checklist[item.id]
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 line-through'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-amber-400/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                  checklist[item.id]
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-400 dark:border-slate-600'
                }`}
              >
                {checklist[item.id] && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className="flex-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Final Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div>
          <h4 className="text-base font-black">Pronto para treinar as 20 questões?</h4>
          <p className="text-xs text-amber-100 mt-0.5">
            20 questões com gabarito oficial e justificativa ponto a ponto.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('questoes')}
            className="px-5 py-3 rounded-2xl bg-white text-amber-800 hover:bg-amber-50 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Brain className="w-4 h-4 text-amber-700" />
            <span>Ir para as 20 Questões</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleMarkAsCompleted}
            className={`px-4 py-3 rounded-2xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isLessonCompleted
                ? 'bg-emerald-950/60 text-emerald-200 border border-emerald-400/40'
                : 'bg-black/20 hover:bg-black/30 text-white border border-white/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLessonCompleted ? 'Aula Concluída ✓' : 'Concluir Leitura'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
