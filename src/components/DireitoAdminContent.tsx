import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  ShieldCheck,
  Scale,
  Building2,
  Briefcase,
  Clock,
  Award,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Flame,
  UserCheck,
  FileCheck2,
  Video,
  ExternalLink
} from 'lucide-react';

interface DireitoAdminContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const DireitoAdminContent: React.FC<DireitoAdminContentProps> = ({
  isDarkMode,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted,
  handleMarkAsCompleted: propHandleMarkAsCompleted,
  onToggleComplete,
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = React.useState<Record<string, boolean>>({});

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  });
  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/50 via-slate-900 to-indigo-950/60 border border-blue-500/30 text-white space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            Direito Administrativo • Aula 4
          </span>
          <span className="text-xs font-bold text-slate-400">
            Foco TJAM 2026 • Assistente Judiciário
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>👤 AGENTES PÚBLICOS</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Compreenda a classificação, a distinção entre cargo, emprego e função, as regras do concurso público, cargos em comissão e a responsabilização nas esferas civil, penal e administrativa.
        </p>

        {/* Video Link Shortcut */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('video')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Assistir à Videoaula da Aula</span>
          </button>
          <a
            href="https://youtu.be/CZYzEjUKwzY?is=-CAN8eyPM1IKp-D2"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1 underline underline-offset-4"
          >
            <span>Abrir no YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Objetivos da Aula */}
      <section
        className={`p-6 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/50 border-blue-100'
        }`}
      >
        <h2 className="text-base font-black text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-600" /> Objetivos de Aprendizagem da Aula 4
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Dominar o conceito amplo de Agente Público no Direito Administrativo.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Classificar os agentes: políticos, servidores estatutários, empregados e temporários.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Diferenciar com precisão Cargo Público, Emprego Público e Função Pública.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Compreender a regra constitucional do Concurso Público e suas exceções.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Identificar a destinação exclusiva dos Cargos em Comissão (Direção, Chefia e Assessoramento).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Analisar a independência e coexistência das responsabilidades Civil, Administrativa e Penal.</span>
          </li>
        </ul>
      </section>

      {/* 1. O que são agentes públicos? */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
          1. O que são agentes públicos?
        </h2>
        <p className="text-sm">
          <strong>Agente público</strong> é toda pessoa física que exerce, <strong>ainda que temporariamente ou sem remuneração</strong>, uma função pública estatal, por eleição, nomeação, designação, contratação ou qualquer outra forma de investidura ou vínculo.
        </p>

        <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <h3 className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 mb-2">
            Exemplos de Agentes Públicos:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-semibold">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>👔 Servidores públicos concursados</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>💼 Empregados públicos (CLT)</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>🏛️ Agentes políticos (Magistrados, Governador)</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>⏳ Servidores temporários (Art. 37, IX)</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 sm:col-span-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>🤝 Particulares que exercem função pública (Mesários, Jurados)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Classificação dos agentes públicos */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
          2. Classificação dos agentes públicos
        </h2>
        <p className="text-sm">
          Para o concurso do TJAM, vamos trabalhar principalmente com 4 categorias fundamentais:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏛️</span>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Agentes políticos
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Exercem funções de <strong>direção e decisão política do Estado</strong>. Possuem regime jurídico próprio na Constituição Federal (ex.: Chefes do Executivo, Ministros, Magistrados, Membros do Ministério Público).
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">👔</span>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Servidores públicos
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ocupam <strong>cargos públicos</strong> (efetivos ou em comissão) e estão submetidos ao regime estatutário aplicável (ex.: Assistente Judiciário do TJAM).
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💼</span>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Empregados públicos
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ocupam <strong>empregos públicos</strong>, normalmente submetidos ao <strong>regime celetista (CLT)</strong>. Atuam tipicamente nas Empresas Públicas e Sociedades de Economia Mista.
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⏳</span>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Servidores temporários
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              São contratados por <strong>tempo determinado</strong> para atender <strong>necessidade temporária de excepcional interesse público</strong>, conforme prevê a lei (Art. 37, IX da CF).
            </p>
          </div>
        </div>
      </section>

      {/* 3. Cargo, emprego e função pública */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
          3. Cargo, emprego e função pública
        </h2>
        <p className="text-sm">
          Essa diferença conceitual é cobrada com frequência em provas de tribunais:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="font-extrabold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <span>🏛️ Cargo público</span>
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              É um <strong>conjunto de atribuições e responsabilidades</strong> previsto na estrutura administrativa, criado por lei. É ocupado por <strong>servidor público estatutário</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
            <h3 className="font-extrabold text-sm text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <span>💼 Emprego público</span>
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              É uma relação contratual de trabalho com a Administração, normalmente regida pela <strong>CLT</strong>. Exemplo: empregado da Caixa Econômica Federal ou Petrobras.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
            <h3 className="font-extrabold text-sm text-sky-900 dark:text-sky-300 flex items-center gap-2">
              <span>📋 Função pública</span>
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              É o <strong>conjunto de atribuições</strong> exercidas por um agente público. <em>Pode existir função sem que haja um cargo efetivo específico</em>, como ocorre em determinadas funções de confiança ou contratações temporárias.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Concurso público */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
          4. Concurso público
        </h2>
        <p className="text-sm">
          A Constituição Federal estabelece que a <strong>investidura em cargo ou emprego público depende, em regra, de aprovação prévia em concurso público</strong> de provas ou de provas e títulos.
        </p>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 space-y-2">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>⚠️ Atenção às Exceções Constitucionais</span>
          </div>
          <p className="text-xs leading-relaxed">
            Existem exceções expressas à realização de concurso público:
          </p>
          <ul className="list-disc list-inside text-xs space-y-1 font-semibold pl-2">
            <li><strong>Cargos em comissão</strong> declarados em lei de livre nomeação e exoneração;</li>
            <li><strong>Contratação temporária</strong> por tempo determinado nos casos previstos em lei (Art. 37, IX da CF/88).</li>
          </ul>
        </div>
      </section>

      {/* 5. Cargo efetivo × cargo em comissão */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
          5. Cargo efetivo × cargo em comissão
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Provimento Originário
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
              Cargo Efetivo
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">➡️</span>
                <span>Exige, em regra, <strong>concurso público</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">➡️</span>
                <span>Garante aquisição de <strong>estabilidade</strong> após 3 anos de efetivo exercício e avaliação de desempenho.</span>
              </li>
            </ul>
          </div>

          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Livre Nomeação / Exoneração
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
              Cargo em Comissão
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">➡️</span>
                <span>Destina-se <strong>apenas às atribuições de direção, chefia e assessoramento</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">➡️</span>
                <span>É de <strong>livre nomeação e livre exoneração (ad nutum)</strong>, não gerando estabilidade.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Direitos e deveres */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
          6. Direitos e deveres do servidor público
        </h2>
        <p className="text-sm">
          O servidor público deve pautar sua conduta estritamente pelos princípios constitucionais e regras do Estatuto. Entre os principais deveres estão:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block mb-1">⚖️ Legalidade</span>
            <p className="text-slate-600 dark:text-slate-300">Agir sempre e estritamente de acordo com a lei.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block mb-1">🛡️ Probidade</span>
            <p className="text-slate-600 dark:text-slate-300">Agir com honestidade, moralidade e lealdade às instituições.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block mb-1">👥 Atendimento ao Cidadão</span>
            <p className="text-slate-600 dark:text-slate-300">Atender com presteza e urbanidade o público no Judiciário.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block mb-1">🏛️ Patrimônio Público</span>
            <p className="text-slate-600 dark:text-slate-300">Zelar pela economia e conservação do patrimônio público.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 sm:col-span-2">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block mb-1">⚡ Eficiência e Responsabilidade</span>
            <p className="text-slate-600 dark:text-slate-300">Exercer suas atribuições com celeridade, pontualidade e dedicação.</p>
          </div>
        </div>
      </section>

      {/* 7. Responsabilidade do agente público */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
          7. Responsabilidade do agente público
        </h2>
        <p className="text-sm">
          O agente público pode responder por atos ilícitos praticados no exercício de suas funções. A responsabilidade pode envolver diferentes esferas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-xs text-blue-800 dark:text-blue-300">
              <span>⚖️ Responsabilidade Civil</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Decorre de <strong>dano patrimonial ou moral</strong> causado ao Estado ou a terceiros, gerando o dever de indenizar/ressarcir (mediante dolo ou culpa).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-xs text-indigo-800 dark:text-indigo-300">
              <span>💼 Responsabilidade Administrativa</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Decorre da <strong>prática de infração funcional</strong> aos deveres estatutários, apurada mediante Processo Administrativo Disciplinar (PAD).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-xs text-rose-800 dark:text-rose-300">
              <span>🚨 Responsabilidade Penal</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Decorre do cometimento de <strong>crimes ou contravenções penais</strong> no exercício do cargo (ex.: corrupção, peculato, concussão).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xs space-y-1 shadow-md">
          <span className="text-[10px] uppercase tracking-widest text-blue-200 font-black">
            🧠 Coexistência e Independência das Esferas
          </span>
          <p>
            As sanções civis, penais e administrativas são <strong>independentes entre si e podem cumular-se</strong>, ou seja, o servidor pode responder simultaneamente nas três esferas pelo mesmo fato ilícito.
          </p>
        </div>
      </section>

      {/* 🧠 RESUMO PARA MEMORIZAR */}
      <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/70 border-blue-200'}`}>
        <h2 className="text-base font-black text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <span>🧠 RESUMO SÍNTESE PARA MEMORIZAR</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 dark:text-slate-200">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">Agente público</strong>
            <p>Pessoa que exerce função pública (amplo conceito).</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">Cargo público</strong>
            <p>Ocupado por servidor estatutário.</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">Emprego público</strong>
            <p>Empregado público, normalmente sob regime da CLT.</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">Função pública</strong>
            <p>Atribuições exercidas pelo agente.</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">Cargo efetivo</strong>
            <p>Exige concurso público e confere estabilidade.</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">Cargo em comissão</strong>
            <p>Exclusivo para direção, chefia e assessoramento.</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 sm:col-span-2">
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">Servidor temporário</strong>
            <p>Necessidade temporária de excepcional interesse público (Art. 37, IX).</p>
          </div>
        </div>

        {/* 🎯 Para o TJAM */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-bold space-y-1">
          <div className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>🎯 Dica Estratégica para o TJAM (Priorize a Sequência):</span>
          </div>
          <p className="font-semibold text-xs leading-relaxed">
            Agentes públicos ➔ Classificação ➔ Cargo × Emprego × Função ➔ Concurso público ➔ Cargos em comissão ➔ Responsabilidades.
          </p>
        </div>
      </section>

      {/* Checklist da Aula */}
      <section
        className={`p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-500" /> Checklist de Fixação — Direito Administrativo (Aula 4: Agentes Públicos)
        </h3>
        <div className="space-y-2 text-xs font-semibold">
          {[
            { id: 'c1', text: 'Entendi o conceito amplo de Agente Público (qualquer pessoa que exerça função pública).' },
            { id: 'c2', text: 'Sei classificar Agentes Políticos, Servidores Públicos, Empregados (CLT) e Temporários.' },
            { id: 'c3', text: 'Diferenciei Cargo Público (Estatutário), Emprego Público (CLT) e Função Pública.' },
            { id: 'c4', text: 'Compreendi a regra do Concurso Público e a destinação dos Cargos em Comissão (Direção, Chefia e Assessoramento).' },
            { id: 'c5', text: 'Compreendi a independência e coexistência das esferas Civil, Administrativa e Penal.' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                checklist[item.id]
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-300'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                  checklist[item.id]
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {checklist[item.id] && <Check className="w-3.5 h-3.5" />}
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Action Bottom Controls */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('video')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Video className="w-3.5 h-3.5 text-blue-500" />
            <span>Videoaula</span>
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Flashcards</span>
          </button>
          <button
            onClick={() => setActiveTab('questoes')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>20 Exercícios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={handleMarkAsCompleted}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isLessonCompleted
              ? 'bg-blue-700 text-white border border-blue-400/40 shadow-blue-700/20'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {isLessonCompleted
              ? '✓ Aula Concluída (Clique para alternar)'
              : 'Marcar Aula como Concluída'}
          </span>
        </button>
      </div>
    </article>
  );
};
