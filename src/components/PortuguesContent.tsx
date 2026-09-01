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
  Brain
} from 'lucide-react';

interface PortuguesContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
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
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>({});

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  });
  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5" />
            Língua Portuguesa • Aula 3
          </span>
          <span className="text-xs font-bold text-amber-100">
            Foco TJAM 2026 • FGV
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>📚 CLASSES DE PALAVRAS — SUBSTANTIVO, ADJETIVO E VERBO</span>
        </h1>
        <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
          Domine a identificação, o papel semântico, as locuções adjetivas, as flexões nominais e verbais, e saiba diferenciar substantivo de adjetivo no contexto da oração.
        </p>

        {/* Action button inside banner */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2 rounded-xl bg-white text-amber-700 hover:bg-amber-50 font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Brain className="w-4 h-4" />
            <span>Fazer 20 Questões da Aula</span>
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className="px-4 py-2 rounded-xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Ver Flashcards</span>
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
          <Lightbulb className="w-5 h-5 text-amber-600" /> Objetivos de Aprendizagem — Aula 3
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Ao concluir esta aula, você será capaz de:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Identificar e classificar <strong>Substantivos</strong> no contexto de textos forenses.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Reconhecer <strong>Adjetivos</strong> e compreender sua função caracterizadora e concordância.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Diferenciar os <strong>Verbos</strong> de ação, de estado e de fenômenos da natureza.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Dominar a <strong>diferença contextual entre substantivo e adjetivo</strong> e a substantivação.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Converter <strong>Locuções Adjetivas</strong> em seus respectivos adjetivos eruditos.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Compreender as <strong>flexões nominais</strong> (gênero/número) e <strong>verbais</strong> (tempo/modo/pessoa).</span>
          </li>
        </ul>
      </section>

      {/* 1. Substantivo */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">
          1. Substantivo
        </h2>
        <p className="text-sm">
          O <strong>substantivo</strong> é a classe gramatical variável responsável por <strong>nomear</strong> todos os seres do mundo real e imaginário: pessoas, lugares, objetos, ações, sentimentos, qualidades, instituições e estados.
        </p>

        <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-3`}>
          <h3 className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider">
            📌 Exemplos Práticos no Contexto do Tribunal:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-bold text-center">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              👤 servidor
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              🏛️ tribunal
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              🌳 Amazonas
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              ⚖️ justiça
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              📖 estudo
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              🛡️ responsabilidade
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">Substantivos Concretos</span>
            <p className="text-slate-600 dark:text-slate-300">
              Designam seres de existência independente, materiais ou espirituais (ex.: <em>servidor, processo, computador, comarca, juiz</em>).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-blue-600 dark:text-blue-400 uppercase text-[10px]">Substantivos Abstratos</span>
            <p className="text-slate-600 dark:text-slate-300">
              Designam ações, qualidades, sentimentos ou estados que dependem de outro ser para se manifestar (ex.: <em>justiça, celeridade, aprovação, estudo, coragem</em>).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Adjetivo */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">
          2. Adjetivo
        </h2>
        <p className="text-sm">
          O <strong>adjetivo</strong> é a palavra variável que <strong>caracteriza, qualifica, restringe ou atribui uma qualidade/estado ao substantivo</strong>, concordando obrigatoriamente com ele em gênero (masculino/feminino) e número (singular/plural).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">Exemplo 1:</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              servidor público
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              • <strong>servidor</strong> ➔ substantivo<br />
              • <strong>público</strong> ➔ adjetivo (especifica o tipo de servidor)
            </p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">Exemplo 2:</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              decisão judicial
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              • <strong>decisão</strong> ➔ substantivo<br />
              • <strong>judicial</strong> ➔ adjetivo (qualifica a decisão)
            </p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">Exemplo 3:</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              prova difícil
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              • <strong>prova</strong> ➔ substantivo<br />
              • <strong>difícil</strong> ➔ adjetivo (caracteriza o grau de exigência)
            </p>
          </div>
        </div>
      </section>

      {/* 3. Verbo */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">
          3. Verbo
        </h2>
        <p className="text-sm">
          O <strong>verbo</strong> é a palavra que indica fundamentalmente <strong>ação</strong>, <strong>estado</strong> ou <strong>fenômeno da natureza</strong>, localizando o acontecimento em uma linha temporal (passado, presente ou futuro).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black uppercase text-[10px]">
              1. Ação
            </span>
            <p className="text-slate-600 dark:text-slate-300">Indica a realização de um ato dinâmico pelo sujeito.</p>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Exemplos: <em>estudar, trabalhar, analisar, protocolar, redigir</em>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black uppercase text-[10px]">
              2. Estado / Mudança de Estado
            </span>
            <p className="text-slate-600 dark:text-slate-300">Liga o sujeito a uma característica ou estado passageiro/permanente.</p>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Exemplos: <em>ser, estar, permanecer, continuar, parecer, ficar</em>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-black uppercase text-[10px]">
              3. Fenômeno da Natureza
            </span>
            <p className="text-slate-600 dark:text-slate-300">Acontecimentos meteorológicos e da natureza (verbos impessoais).</p>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Exemplos: <em>chover, nevar, ventar, relampejar, amanhecer</em>.
            </p>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/60 border-emerald-100'} text-xs space-y-1`}>
          <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">📌 Exemplo em Oração:</strong>
          <p className="italic text-slate-700 dark:text-slate-300">"O candidato <strong>estudou</strong> para a prova do TJAM."</p>
          <p className="font-semibold text-emerald-800 dark:text-emerald-300">➔ <strong>estudou</strong> = verbo de ação (Pretérito Perfeito do Indicativo, 3ª pessoa do singular).</p>
        </div>
      </section>

      {/* 4. 🎯 O QUE MAIS CAI EM PROVA: Substantivo x Adjetivo */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">
          4. 🎯 O Que Mais Cai em Prova (Substantivo × Adjetivo)
        </h2>
        <p className="text-sm">
          A banca examinadora (FGV) adora cobrar a <strong>mudança de classe gramatical segundo o contexto da oração</strong>. Uma mesma palavra pode funcionar ora como substantivo, ora como adjetivo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/60 border-amber-200'}`}>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black uppercase text-[10px]">
              Caso 1: Funcionando como Substantivo
            </span>
            <p className="text-sm font-black text-slate-900 dark:text-white mt-2 mb-1">
              "O <span className="underline decoration-amber-500 decoration-2">jovem</span> estudou para a prova."
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Neste caso, <strong>jovem</strong> funciona como <strong>SUBSTANTIVO</strong>, pois é o núcleo do sujeito determinado pelo artigo "O" e está nomeando a pessoa.
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/60 border-blue-200'}`}>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 font-black uppercase text-[10px]">
              Caso 2: Funcionando como Adjetivo
            </span>
            <p className="text-sm font-black text-slate-900 dark:text-white mt-2 mb-1">
              "O candidato <span className="underline decoration-blue-500 decoration-2">jovem</span> estudou para a prova."
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Aqui, o substantivo núcleo é <strong>candidato</strong>, e <strong>jovem</strong> funciona como <strong>ADJETIVO</strong>, pois está apenas caracterizando o candidato.
            </p>
          </div>
        </div>

        {/* Box Substantivação / Derivação Imprópria */}
        <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-purple-950/20 border-purple-800/40' : 'bg-purple-50 border-purple-200'}`}>
          <h4 className="text-xs font-black uppercase text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" /> Derivação Imprópria (Substantivação)
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            Quando qualquer palavra de outra classe (verbo, adjetivo, advérbio) é precedida por um determinante (artigo, pronome, numeral), ela se transforma funcionalmente em <strong>substantivo</strong>:
          </p>
          <ul className="space-y-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <li>• <em>O <strong>andar</strong> do réu demonstrava nervosismo.</em> (verbo ➔ substantivo)</li>
            <li>• <em>O <strong>verde</strong> da floresta amazônica encanta a todos.</em> (adjetivo ➔ substantivo)</li>
            <li>• <em>Não aceito um <strong>não</strong> como resposta.</em> (advérbio ➔ substantivo)</li>
          </ul>
        </div>
      </section>

      {/* 5. Locução Adjetiva */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">
          5. Locução Adjetiva
        </h2>
        <p className="text-sm">
          A <strong>locução adjetiva</strong> é toda expressão formada por duas ou mais palavras (geralmente <em>preposição + substantivo</em>) que desempenha o mesmo papel sintático e semântico de um <strong>adjetivo</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-amber-600 dark:text-amber-400">Locução:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">decisão <u>de juiz</u></p>
            <span className="font-black text-emerald-600 dark:text-emerald-400 block pt-1">➔ decisão judicial</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-amber-600 dark:text-amber-400">Locução:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">amor <u>de mãe</u></p>
            <span className="font-black text-emerald-600 dark:text-emerald-400 block pt-1">➔ amor materno</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-amber-600 dark:text-amber-400">Locução:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">dia <u>de chuva</u></p>
            <span className="font-black text-emerald-600 dark:text-emerald-400 block pt-1">➔ dia chuvoso (pluvial)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-amber-600 dark:text-amber-400">Locução:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">turno <u>da noite</u></p>
            <span className="font-black text-emerald-600 dark:text-emerald-400 block pt-1">➔ turno noturno</span>
          </div>
        </div>
      </section>

      {/* 6. Flexão das Palavras */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">
          6. Flexão das Palavras (Nominal × Verbal)
        </h2>
        <p className="text-sm">
          A língua portuguesa possui classes de palavras que alteram suas formas morfológicas para expressar diferentes categorias gramaticais:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              🅰️ Flexão Nominal (Substantivos e Adjetivos)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>• Gênero:</strong> Masculino / Feminino (<em>servidor / servidora; juiz / juíza; atento / atenta</em>).
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>• Número:</strong> Singular / Plural (<em>tribunal / tribunais; processo / processos; célere / céleres</em>).
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>• Grau:</strong> Comparativo e Superlativo (<em>prova dificílima; mais eficiente que</em>).
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              🅱️ Flexão Verbal (Verbos)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>• Tempo:</strong> Presente, Pretérito (Perfeito, Imperfeito, Mais-que-perfeito) e Futuro (do Presente, do Pretérito).
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>• Modo:</strong> Indicativo (certeza), Subjuntivo (dúvida/hipótese) e Imperativo (ordem/conselho).
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong>• Número e Pessoa:</strong> 1ª, 2ª e 3ª pessoas do singular e do plural (<em>eu analiso, nós analisamos, eles analisarão</em>).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 🏆 Resumo Síntese da Aula & Quadro Síntese */}
      <section className="p-6 rounded-3xl bg-slate-900 text-white border border-amber-500/30 space-y-4 shadow-xl">
        <h3 className="text-base font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> 🎯 Resumo Síntese da Aula — Foco TJAM 2026
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="font-black text-amber-400 uppercase text-[10px]">Substantivo</span>
            <p className="font-bold text-white">Dá NOME aos seres, lugares, instituições, sentimentos e ações.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="font-black text-emerald-400 uppercase text-[10px]">Adjetivo</span>
            <p className="font-bold text-white">Dá CARACTERÍSTICA, qualidade, estado ou restrição ao substantivo.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="font-black text-blue-400 uppercase text-[10px]">Verbo</span>
            <p className="font-bold text-white">Expressa AÇÃO, ESTADO ou FENÔMENO meteorológico no tempo.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="font-black text-purple-400 uppercase text-[10px]">Contexto</span>
            <p className="font-bold text-white">A classe morfológica depende sempre da FUNÇÃO na frase.</p>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 font-semibold">
          🔥 Dica de Ouro FGV: Ao analisar qualquer termo em uma questão de concurso, localize primeiro o substantivo e observe se a palavra está nomeando (substantivo) ou qualificando outro termo (adjetivo).
        </div>
      </section>

      {/* 8. Checklist de Fixação da Aula */}
      <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação da Aula 3 — Língua Portuguesa
        </h3>
        <div className="space-y-2 text-xs font-semibold">
          {[
            { id: 'c1', text: 'Compreendi o conceito e a função do Substantivo como classe que nomeia os seres.' },
            { id: 'c2', text: 'Entendi o papel do Adjetivo como qualificador/caracterizador do substantivo.' },
            { id: 'c3', text: 'Diferenciei os verbos de ação, estado e fenômenos da natureza.' },
            { id: 'c4', text: 'Sei diferenciar substantivo de adjetivo no contexto ("O jovem estudou" x "O candidato jovem estudou").' },
            { id: 'c5', text: 'Entendi o processo de substantivação (derivação imprópria pelo artigo) e as locuções adjetivas.' },
            { id: 'c6', text: 'Compreendi as flexões nominais (gênero/número) e verbais (tempo/modo/pessoa).' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                checklist[item.id]
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                checklist[item.id] ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-300 dark:border-slate-600'
              }`}>
                {checklist[item.id] && <Check className="w-3.5 h-3.5" />}
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Action Bottom Controls */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('flashcards')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Ver Flashcards</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleMarkAsCompleted}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula 3 como Concluída'}</span>
        </button>
      </div>
    </article>
  );
};
