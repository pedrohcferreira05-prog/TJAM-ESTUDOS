import React from 'react';
import {
  BookOpen,
  Landmark,
  Scale,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Video,
  Building2,
  Users,
  Compass,
  AlertTriangle,
  GraduationCap,
  Shield,
  FileText
} from 'lucide-react';

interface LegislacaoTjamContentProps {
  isDarkMode: boolean;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateTab: (tab: 'video' | 'questoes' | 'flashcards' | 'mapa' | 'resumo') => void;
}

export const LegislacaoTjamContent: React.FC<LegislacaoTjamContentProps> = ({
  isDarkMode,
  isLessonCompleted,
  onToggleComplete,
  onNavigateTab,
}) => {
  return (
    <article
      className={`p-6 sm:p-10 rounded-3xl border space-y-10 leading-relaxed transition-all ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 text-slate-200'
          : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      }`}
    >
      {/* Top Banner / Goal Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-600 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-purple-500/20">
              <Landmark className="w-3.5 h-3.5" /> LEGISLAÇÃO TJAM • PRIMEIRA AULA DE HOJE
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider border border-emerald-500/20">
              LC Nº 261/2023 (Vigente)
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider border border-amber-500/20">
              Resolução nº 62/2023
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('video')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vídeo Aula</span>
            </button>
            <button
              onClick={() => onNavigateTab('questoes')}
              className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>20 Questões</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <span className="text-purple-600 dark:text-purple-400">🏛️</span> Aula 2 — Organização Judiciária do Amazonas: aprofundamento
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            Vamos avançar a partir da aula anterior, aprofundando os órgãos, composição e funcionamento do Tribunal de Justiça, usando a legislação atual. A principal norma é a <strong>Lei Complementar nº 261/2023</strong>, que substituiu a antiga LC nº 17/1997 e é mantida pelo próprio TJAM como legislação vigente e consolidada.
          </p>
        </div>

        {/* Quick Highlights Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
            <div className="text-[11px] font-black uppercase text-purple-700 dark:text-purple-300">Desembargadores</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">26 Magistrados no TJAM</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
            <div className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300">Órgãos Julgadores</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Pleno + Câmaras (Isoladas e Reunidas)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <div className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-300">Tratamento Forense</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Tribunal: Egrégio | Membro: Excelência</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <div className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-300">Regimento Interno</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Resolução nº 62/2023</div>
          </div>
        </div>
      </header>

      {/* SECTION 1: TRIBUNAL DE JUSTIÇA DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            1
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>⚖️ Tribunal de Justiça do Amazonas</span>
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
          A Justiça de <strong>segunda instância</strong> do Amazonas é constituída pelo <strong>Tribunal de Justiça</strong>. O TJAM:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Sede na Capital</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Sede localizada na Capital do Estado (Manaus).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Jurisdição Plena</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Possui jurisdição em <strong>todo o território do Amazonas</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">26 Desembargadores</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                É composto por exatamente <strong>26 desembargadores</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Callout Mnemônico */}
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-start gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-black text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1">
              🧠 Memorize para a Prova:
            </span>
            <p className="font-extrabold text-slate-900 dark:text-white text-xs">
              TJAM = 2ª instância + sede na Capital + jurisdição em todo o Amazonas + 26 desembargadores.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: ÓRGÃOS JULGADORES DO TJAM */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏛️ Órgãos Julgadores do TJAM</span>
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>LC nº 261/2023</strong> estabelece como órgãos julgadores do Tribunal de Justiça do Amazonas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-extrabold text-xs uppercase">
              <Scale className="w-4 h-4" /> 🔹 Tribunal Pleno
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Órgão colegiado máximo formado por <strong>todos os 26 desembargadores</strong> do Tribunal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-xs uppercase">
              <Scale className="w-4 h-4" /> 🔹 Câmaras Isoladas
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Dividem-se em <strong>Câmaras Isoladas Cíveis</strong> (matéria cível) e <strong>Câmaras Isoladas Criminais</strong> (matéria criminal).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase">
              <Scale className="w-4 h-4" /> 🔹 Câmaras Reunidas
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              São também órgãos julgadores do Tribunal, com organização e competências disciplinadas na lei e no Regimento Interno.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: DESEMBARGADORES & PEGADINHA DE PROVA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            3
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>👨‍⚖️ Desembargadores e Tratamento Oficial</span>
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
          Os membros do Tribunal de Justiça recebem o título oficial de <strong>Desembargador</strong>. O tratamento dispensado aos agentes e ao colegiado difere de forma substancial:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Ao Tribunal (Órgão Colegiado)</span>
            <div className="text-lg font-black text-purple-700 dark:text-purple-300">
              "Egrégio"
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Exemplo forense: <em>"Egrégio Tribunal de Justiça do Estado do Amazonas"</em>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Aos Desembargadores (Membros)</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              "Excelência"
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Exemplo forense: <em>"Vossa Excelência, Desembargador Relator"</em>.
            </p>
          </div>
        </div>

        {/* Pegadinha de Prova */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-black uppercase tracking-wide text-amber-700 dark:text-amber-300 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>⚠️ Pegadinha Clássica de Prova FGV!</span>
          </div>
          <p className="leading-relaxed text-xs">
            A banca tenta inverter os pronomes de tratamento para induzir o candidato ao erro. <strong>NÃO CONFUNDA:</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono font-bold text-xs">
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-amber-300/40 text-slate-900 dark:text-white">
              🏛️ Tribunal ➔ <strong>Egrégio</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-amber-300/40 text-slate-900 dark:text-white">
              👨‍⚖️ Desembargador ➔ <strong>Excelência</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ESCOLA SUPERIOR DA MAGISTRATURA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            4
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏫 Escola Superior da Magistratura (ESMAM)</span>
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-purple-600 text-white font-bold shrink-0 shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-xs">
            <h4 className="font-black text-sm text-slate-900 dark:text-white">
              Integração à Estrutura Administrativa
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              A estrutura do Tribunal também inclui a <strong>Escola Superior da Magistratura do Estado do Amazonas (ESMAM)</strong>. Ela integra a <strong>estrutura administrativa</strong> do Tribunal, responsável pelo aperfeiçoamento, pesquisa jurídica e formação continuada de magistrados e servidores judiciais.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5, 6 & 7: PLENO, CÂMARAS ISOLADAS E REUNIDAS */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            5, 6 e 7
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Órgãos Julgadores: Pleno, Câmaras Isoladas e Câmaras Reunidas
          </h2>
        </div>

        <div className="space-y-4">
          {/* Tribunal Pleno */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-extrabold text-sm">
                <Scale className="w-4 h-4" />
                <span>5. ⚖️ Tribunal Pleno</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-[10px] font-black">
                Presidido pelo Presidente do TJAM
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              O Tribunal Pleno é o <strong>órgão colegiado máximo e julgador do TJAM</strong>, composto por todos os 26 desembargadores. É <strong>presidido pelo Presidente do Tribunal de Justiça</strong>.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              📌 <strong>Iniciativa Legislativa:</strong> Compete ao Tribunal Pleno, por intermédio do Presidente do Tribunal de Justiça, propor ao Poder Legislativo matérias relacionadas à <strong>organização e divisão judiciárias</strong>, criação de comarcas, varas e cargos judiciais.
            </p>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-800 dark:text-purple-200 text-xs font-bold">
              📌 Para a prova: <strong>Tribunal Pleno ➔ Presidido pelo Presidente do TJAM</strong>.
            </div>
          </div>

          {/* Câmaras Isoladas */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-extrabold text-sm">
                <Scale className="w-4 h-4" />
                <span>6. 🏛️ Câmaras Isoladas</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-black">
                Presididas por membro eleito
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              As Câmaras Isoladas são <strong>presididas por um de seus membros, eleito conforme o Regimento Interno</strong>. Dividem-se em razão da matéria:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-extrabold text-blue-600 dark:text-blue-400 block mb-1">Câmaras Cíveis:</span>
                <span className="text-slate-600 dark:text-slate-300">Questões de natureza cível (recursos em ações ordinárias, contratos, família, fazenda pública, etc.).</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-extrabold text-rose-600 dark:text-rose-400 block mb-1">Câmaras Criminais:</span>
                <span className="text-slate-600 dark:text-slate-300">Questões de natureza criminal (apelações criminais, habeas corpus, recursos em sentido estrito).</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A <strong>LC nº 261/2023</strong> disciplina as Câmaras Isoladas nos <strong>arts. 29 a 40</strong>.
            </p>
          </div>

          {/* Câmaras Reunidas */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm">
                <Scale className="w-4 h-4" />
                <span>7. 🔄 Câmaras Reunidas</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-black">
                Presididas pelo Vice-Presidente do TJAM
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              As Câmaras Reunidas são <strong>presididas pelo Vice-Presidente do TJAM</strong> e também fazem parte dos órgãos julgadores do Tribunal.
            </p>
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-800 dark:text-indigo-200 text-xs space-y-1">
              <span className="font-black uppercase tracking-wider block">Atenção Crítica:</span>
              <p className="font-extrabold">
                Câmaras Isoladas ≠ Câmaras Reunidas.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                São estruturas e órgãos julgadores distintos dentro da organização interna do Tribunal.
              </p>
            </div>
          </div>

          {/* Quórum e Frequência das Sessões */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-slate-800/60 to-indigo-500/10 border border-purple-500/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-300">👥 Quórum de Funcionamento</span>
              <p className="text-slate-700 dark:text-slate-200 font-medium">
                Os órgãos julgadores do TJAM funcionam, em regra, com a presença de <strong>maioria absoluta de seus membros</strong>.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-300">📅 Frequência das Sessões</span>
              <p className="text-slate-700 dark:text-slate-200 font-medium">
                Em regra, Tribunal Pleno, Câmaras Reunidas e Câmaras Isoladas realizam <strong>uma sessão ordinária por semana</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: OS 7 ÓRGÃOS DO PODER JUDICIÁRIO DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            8
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏢 Órgãos do Poder Judiciário do Amazonas (LC 261/2023)</span>
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
          A LC nº 261/2023 estabelece em seu <strong>art. 3º</strong> que integram o Poder Judiciário do Estado do Amazonas:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: '1', title: 'Tribunal de Justiça', desc: 'Órgão de cúpula estadual e 2ª instância' },
            { num: '2', title: 'Turmas Recursais dos Juizados Especiais', desc: 'Julgam recursos das decisões dos Juizados Especiais' },
            { num: '3', title: 'Tribunais do Júri', desc: 'Competência constitucional para crimes dolosos contra a vida' },
            { num: '4', title: 'Juízes de Direito', desc: 'Magistrados titulares vitalícios nas Comarcas' },
            { num: '5', title: 'Juízes Substitutos de Carreira', desc: 'Magistrados em início de carreira em substituição' },
            { num: '6', title: 'Auditoria Militar e respectivos Conselhos', desc: 'Justiça Militar estadual para delitos militares' },
            { num: '7', title: 'Juízes de Paz', desc: 'Celebração de casamentos e mediação conciliatória' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  Item {item.num}
                </span>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mt-1.5">
                  {item.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Decore essa lista */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-extrabold">
            🧠 Decore essa lista! Ela pode ser diretamente cobrada em uma questão objetiva da FGV.
          </span>
        </div>
      </section>

      {/* SECTION 9: AUXÍLIO DA FORÇA PÚBLICA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            9
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🚨 Auxílio da Força Pública</span>
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-600 text-white font-bold shrink-0 shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-xs">
            <h4 className="font-black text-sm text-slate-900 dark:text-white">
              Requisição e Cumprimento Obrigatório
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Os órgãos judiciários <strong>podem requisitar o auxílio da força pública</strong> para assegurar o cumprimento e a execução de seus atos e decisões.
            </p>
            <p className="text-rose-600 dark:text-rose-400 font-bold">
              Quando requisitado, a autoridade responsável <u>deve prestar</u> esse auxílio.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: LEI DE ORGANIZAÇÃO JUDICIÁRIA X REGIMENTO INTERNO */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            10
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>📖 Lei de Organização Judiciária x Regimento Interno</span>
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
          É de extrema importância diferenciar o campo material da <strong>Lei Complementar nº 261/2023</strong> e do <strong>Regimento Interno do TJAM</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LC 261/2023 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-purple-500/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Lei Complementar nº 261/2023
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold">
                Lei Estadual
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Trata formalmente da:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2 font-medium">
                <span className="text-purple-600 font-black">•</span>
                <span>Divisão judiciária estadual (Comarcas e Termos);</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-purple-600 font-black">•</span>
                <span>Organização judiciária de todo o Estado;</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-purple-600 font-black">•</span>
                <span>Magistratura (ingresso, direitos e garantias);</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-purple-600 font-black">•</span>
                <span>Serviços auxiliares da Justiça;</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-purple-600 font-black">•</span>
                <span>Estrutura dos serviços notariais e de registro (cartórios).</span>
              </li>
            </ul>
          </div>

          {/* Regimento Interno */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-500/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Regimento Interno do TJAM
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold">
                Resolução nº 62/2023
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Disciplina, entre outros aspectos procedimentais internos:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2 font-medium">
                <span className="text-amber-600 font-black">•</span>
                <span>Composição detalhada dos órgãos fracionários;</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-amber-600 font-black">•</span>
                <span>Funcionamento das sessões e deliberações;</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-amber-600 font-black">•</span>
                <span>Procedimentos processuais e prazos internos;</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-amber-600 font-black">•</span>
                <span>Julgamento dos processos de competência do Tribunal;</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-amber-600 font-black">•</span>
                <span>Serviços auxiliares administrativos do Tribunal.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* RESUMO PARA MEMORIZAR & PONTOS PARA DECORAR */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/20 via-slate-900/10 to-purple-900/20 border border-purple-500/30 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>🧠 Resumo para Memorizar (TJAM 2026)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Composição</span>
              <div className="font-extrabold text-slate-900 dark:text-white">26 Desembargadores</div>
              <p className="text-slate-500 text-[11px]">Justiça de 2ª instância do Estado.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Órgãos Julgadores</span>
              <div className="font-extrabold text-slate-900 dark:text-white">Pleno, Câmaras Isoladas e Reunidas</div>
              <p className="text-slate-500 text-[11px]">Isoladas = Cíveis e Criminais.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Sede e Jurisdição</span>
              <div className="font-extrabold text-slate-900 dark:text-white">Capital (Manaus) / Todo o Estado</div>
              <p className="text-slate-500 text-[11px]">Alcance pleno em todo o Amazonas.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Tratamento Forense</span>
              <div className="font-extrabold text-slate-900 dark:text-white">Tribunal: Egrégio | Desembargador: Excelência</div>
              <p className="text-slate-500 text-[11px]">Cuidado com inversão em prova.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Lei Principal</span>
              <div className="font-extrabold text-slate-900 dark:text-white">LC nº 261/2023</div>
              <p className="text-slate-500 text-[11px]">Substituiu a antiga LC nº 17/1997.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Regimento Interno</span>
              <div className="font-extrabold text-slate-900 dark:text-white">Resolução nº 62/2023</div>
              <p className="text-slate-500 text-[11px]">Norma procedimental do Tribunal.</p>
            </div>
          </div>
        </div>

        {/* Pontos para Decorar */}
        <div className="space-y-2 pt-2 border-t border-purple-500/20">
          <span className="text-xs font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5">
            🎯 Pontos para Decorar para o Concurso TJAM:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>LC 261/2023 = Organização Judiciária</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>TJAM = 2ª instância</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>26 Desembargadores</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Sede na Capital e jurisdição em todo o Amazonas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Pleno + Câmaras Isoladas + Câmaras Reunidas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Câmaras Isoladas = Cíveis e Criminais</span>
            </div>
          </div>
        </div>
      </section>

      {/* Official Link & Video Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Fonte oficial: <strong>LC nº 261/2023 — TJAM</strong>
            </span>
          </div>
          <a
            href="https://www.tjam.jus.br/index.php/transparencia/gestao/atos-normativos-e-legislacao-correlata?start=420&utm_source=chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Ver Portal TJAM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Vídeo aula disponível no YouTube
            </span>
          </div>
          <a
            href="https://youtu.be/ubZ4FIBOHeg?is=tnE8FLYhF20arzMu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-500 font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Assistir no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Action Footer */}
      <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onToggleComplete}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all ${
            isLessonCompleted
              ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
        </button>

        <button
          onClick={() => onNavigateTab('questoes')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <span>Resolver as 20 Questões da Aula 2</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </article>
  );
};
