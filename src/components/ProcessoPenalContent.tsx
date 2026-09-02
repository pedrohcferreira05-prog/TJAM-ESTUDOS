import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Globe2,
  FileText,
  FileCheck2,
  Trophy,
  ExternalLink,
  Video,
  Bookmark
} from 'lucide-react';
import { procPenalLessonSummaryPoints } from '../data/processoPenalLessonData';

interface ProcessoPenalContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProcessoPenalContent: React.FC<ProcessoPenalContentProps> = ({
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
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900/80 via-slate-900 to-emerald-950/80 border border-teal-500/30 text-white space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-teal-500/20 text-teal-300 border border-teal-400/30 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-teal-400" />
            Processo Penal • Quarta Aula de Hoje
          </span>
          <span className="text-xs font-bold text-slate-400">
            Decreto-Lei nº 3.689/1941 (CPP) • Foco TJAM
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Aplicação da Lei Processual Penal
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Como Princípios do Processo Penal já foi estudado, avançamos para o núcleo normativo da eficácia da lei processual: <strong>Eficácia no Tempo</strong> (tempus regit actum), <strong>Eficácia no Espaço</strong> (territorialidade), <strong>Interpretação e Analogia</strong> (Art. 3º) e <strong>Fontes do Processo Penal</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('video')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black transition-all cursor-pointer shadow-md"
          >
            <Video className="w-4 h-4" />
            <span>Assistir Vídeo Aula (JDVXcj-AFI8)</span>
          </button>

          <button
            onClick={() => setActiveTab('questoes')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold border border-teal-500/40 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-teal-400" />
            <span>Resolver 20 Questões Gabaritadas</span>
          </button>

          <a
            href="https://youtu.be/JDVXcj-AFI8?is=zSq1ea7KpPZw_hYi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold border border-slate-700 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no YouTube</span>
          </a>
        </div>
      </div>

      {/* Ponto-Chave de Memorização (Destaque Principal do Prompt) */}
      <section className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border-2 border-amber-500/40 shadow-md">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
            <Bookmark className="w-5 h-5 font-black" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              🎯 Ponto-Chave para Memorizar — Regra de Ouro do Concurso
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              Lei processual penal nova → aplicação imediata → atos anteriores permanecem válidos.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 pt-0.5">
              Essa é uma das regras mais cobradas em provas de tribunais e pela FGV: a lei nova aplica-se de pronto aos processos em andamento, respeitando os atos processuais já realizados.
            </p>
          </div>
        </div>
      </section>

      {/* Objetivos de Aprendizagem */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-teal-50/50 border-teal-100'}`}>
        <h2 className="text-base font-black text-teal-800 dark:text-teal-300 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-teal-600" /> Objetivos de Aprendizagem para o TJAM
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
          Concentre sua preparação nos 4 eixos solicitados no edital de Assistente Judiciário:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span><strong>Lei no tempo:</strong> Aplicação imediata (Art. 2º CPP) e preservação dos atos processuais já realizados.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span><strong>Diferença de regimes:</strong> Distinguir a eficácia da lei processual pura da lei penal material (retroatividade benéfica).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span><strong>Lei no espaço:</strong> Princípio da Territorialidade (Art. 1º CPP) e regras de atos no exterior.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span><strong>Interpretação e Analogia:</strong> Art. 3º do CPP, método extensivo vs. analogia legal para preencher lacunas.</span>
          </li>
          <li className="flex items-start gap-2 md:col-span-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span><strong>Fontes do Processo Penal:</strong> Constituição Federal, leis, tratados internacionais (Pacto de San José), princípios e jurisprudência.</span>
          </li>
        </ul>
      </section>

      {/* 1. LEI PROCESSUAL PENAL NO TEMPO */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-xs">1</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Lei Processual Penal no Tempo (Art. 2º do CPP)
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-900 dark:text-teal-200 leading-relaxed">
          <strong>Art. 2º do CPP:</strong> &ldquo;A lei processual penal aplicar-se-á desde logo, sem prejuízo da validade dos atos realizados sob a vigência da lei anterior.&rdquo;
        </div>

        <p className="text-sm">
          No Direito Processual Penal, a eficácia da lei no tempo rege-se pelo consagrado princípio <strong>tempus regit actum</strong> (o tempo rege o ato). A lei processual tem <strong>aplicação imediata</strong> a partir do momento em que entra em vigor, alcançando todos os processos em curso.
        </p>

        {/* Três sistemas de aplicação no tempo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-black text-slate-400 uppercase text-[10px] tracking-wider block">Sistema da Unidade Processual</span>
            <p className="text-slate-600 dark:text-slate-400">Considera o processo um todo indivisível. A lei anterior deveria reger o processo até o trânsito em julgado. <strong>(NÃO ADOTADO NO BRASIL)</strong></p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-black text-slate-400 uppercase text-[10px] tracking-wider block">Sistema das Fases Processuais</span>
            <p className="text-slate-600 dark:text-slate-400">A nova lei só se aplicaria após concluída a fase ou etapa procedimental em curso (ex: postulatória, instrutória). <strong>(NÃO ADOTADO)</strong></p>
          </div>
          <div className="p-4 rounded-2xl bg-teal-500/10 dark:bg-teal-950/50 border-2 border-teal-500 text-slate-800 dark:text-slate-200 space-y-2">
            <span className="font-black text-teal-700 dark:text-teal-300 uppercase text-[10px] tracking-wider block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Sistema do Isolamento dos Atos
            </span>
            <p className="font-bold">
              <strong>ADOTADO PELO CPP!</strong> Cada ato processual é considerado individualmente. Os atos já praticados sob a lei anterior continuam válidos e os atos futuros submetem-se imediatamente à nova lei.
            </p>
          </div>
        </div>

        {/* Diferença entre Lei Processual Penal e Lei Penal */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-teal-600" /> Diferença Crucial: Lei Processual Penal x Lei Penal Substantiva
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
                  <th className="p-2.5">Critério</th>
                  <th className="p-2.5">Lei Penal Material (Substantiva)</th>
                  <th className="p-2.5 text-teal-600 dark:text-teal-400">Lei Processual Penal Pura (Adjetiva)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-2.5 font-bold">Objeto</td>
                  <td className="p-2.5">Define crimes, comina penas e extingue a punibilidade.</td>
                  <td className="p-2.5 text-teal-700 dark:text-teal-300 font-semibold">Regula a forma, os atos, os prazos e o procedimento em juízo.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Regra Temporal</td>
                  <td className="p-2.5">Irretroatividade da lei mais severa; retroatividade da lei mais benéfica (Art. 5º, XL, CF).</td>
                  <td className="p-2.5 text-teal-700 dark:text-teal-300 font-semibold">Aplicação imediata (tempus regit actum - Art. 2º do CPP), mesmo que mais onerosa ao réu.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Atos Anteriores</td>
                  <td className="p-2.5">A lei penal mais benéfica retroage e alcança fatos pretéritos.</td>
                  <td className="p-2.5 text-teal-700 dark:text-teal-300 font-semibold">Atos pretéritos permanecem plenamente válidos e intocados.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Atenção Especial da FGV: Normas Mistas */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Alerta FGV / TJAM: Normas Mistas, Heterogêneas ou Híbridas</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Se uma norma possuir <strong>natureza híbrida</strong> (processual e penal ao mesmo tempo, como prazos de decadência, queixa-crime, representação, perempção, transação penal e acordo de não persecução penal), prevalece o <strong>caráter material</strong>! Portanto, ela <strong>NÃO terá aplicação imediata se for prejudicial ao réu</strong> (submete-se ao princípio da irretroatividade in pejus).
          </p>
        </div>
      </section>

      {/* 2. LEI PROCESSUAL PENAL NO ESPAÇO */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-xs">2</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Lei Processual Penal no Espaço (Art. 1º do CPP)
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-900 dark:text-teal-200 leading-relaxed">
          <strong>Art. 1º do CPP:</strong> &ldquo;O processo penal reger-se-á, em todo o território brasileiro, por este Código, ressalvados: I - os tratados, as convenções e regras de direito internacional; II - as prerrogativas constitucionais do Presidente da República, dos Ministros de Estado nos crimes conexos e dos Ministros do STF; III - os processos da competência da Justiça Militar; IV - os processos da competência do tribunal especial; V - os processos por crimes de imprensa [não recepcionado].&rdquo;
        </div>

        <p className="text-sm">
          A regra fundamental do processo penal quanto ao espaço é o <strong>Princípio da Territorialidade</strong>: a lei processual penal brasileira aplica-se em todo o território soberano do Brasil (solo, espaço aéreo, mar territorial e extensões por ficção legal).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="text-teal-700 dark:text-teal-400 block font-black flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-teal-500" /> Territorialidade Absoluta do Processo
            </strong>
            <p className="text-slate-600 dark:text-slate-300">
              Juízes brasileiros, ao exercerem a jurisdição penal no Brasil, aplicam <strong>exclusivamente a lei processual brasileira</strong>, mesmo no caso de crime cometido no exterior julgado pela Justiça Brasileira por extraterritorialidade penal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="text-teal-700 dark:text-teal-400 block font-black flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-teal-500" /> Atos Processuais no Exterior
            </strong>
            <p className="text-slate-600 dark:text-slate-300">
              Quando um ato processual precisa ser realizado fora do território nacional (ex: oitiva de testemunha residente em outro país), utiliza-se o mecanismo da <strong>Carta Rogatória</strong> ou tratados de cooperação judiciária internacional, aplicando-se as formas do país rogador/rogado.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERPRETAÇÃO DA LEI PROCESSUAL PENAL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-xs">3</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Interpretação da Lei Processual Penal e Analogia (Art. 3º do CPP)
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-900 dark:text-teal-200 leading-relaxed">
          <strong>Art. 3º do CPP:</strong> &ldquo;A lei processual penal admitirá interpretação extensiva e aplicação analógica, bem como o suplemento dos princípios gerais de direito.&rdquo;
        </div>

        <p className="text-sm">
          Interpretar é revelar o sentido e o alcance da norma. O CPP é expresso e generoso ao autorizar técnicas hermenêuticas e integrativas para assegurar a prestação jurisdicional:
        </p>

        {/* Métodos de Interpretação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-black text-teal-700 dark:text-teal-400">📖 Interpretação Gramatical (Literal)</span>
            <p className="text-slate-600 dark:text-slate-300">Análise do significado léxico e sintático das palavras usadas pelo legislador. É o ponto de partida inicial da interpretação.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-black text-teal-700 dark:text-teal-400">🌐 Interpretação Sistemática</span>
            <p className="text-slate-600 dark:text-slate-300">Confronto da norma com as demais disposições do CPP, com o ordenamento jurídico e, principalmente, com os princípios e garantias da CF/88.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-black text-teal-700 dark:text-teal-400">🎯 Interpretação Teleológica</span>
            <p className="text-slate-600 dark:text-slate-300">Busca a finalidade social e a razão de ser (ratio legis) da norma jurídica processual.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-black text-teal-700 dark:text-teal-400">🔍 Interpretação Extensiva</span>
            <p className="text-slate-600 dark:text-slate-300">
              Ocorre quando o legislador <em>disse menos do que pretendia</em> (&ldquo;minus dixit quam voluit&rdquo;). O intérprete alarga o alcance das palavras para coincidir com a real vontade da lei. <strong>Existe norma, mas seu texto é estreito!</strong>
            </p>
          </div>
        </div>

        {/* Diferença entre Interpretação Extensiva e Analogia */}
        <div className="p-5 rounded-2xl border-2 border-teal-500/40 bg-teal-500/5 dark:bg-teal-950/30 space-y-3">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-black text-xs uppercase tracking-wider">
            <Scale className="w-4 h-4 text-teal-500" />
            <span>Diferença Essencial: Interpretação Extensiva x Analogia</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-teal-700 dark:text-teal-400 block font-bold">
                Interpretação Extensiva (Art. 3º)
              </strong>
              <p className="text-slate-600 dark:text-slate-300">
                • <strong>Existe norma regulamentando a hipótese.</strong><br />
                • O alcance semântico do texto é apenas estendido.<br />
                • É um ato de hermenêutica (interpretação).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-teal-700 dark:text-teal-400 block font-bold">
                Analogia (Art. 3º)
              </strong>
              <p className="text-slate-600 dark:text-slate-300">
                • <strong>NÃO existe norma regulamentando a hipótese (há lacuna).</strong><br />
                • Aplica-se norma existente de caso semelhante (onde há a mesma razão de direito).<br />
                • É uma forma de auto-integração da lei.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FONTES DO PROCESSO PENAL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-xs">4</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Fontes do Direito Processual Penal
          </h2>
        </div>

        <p className="text-sm">
          As fontes revelam de onde emanam as normas processuais penais. No ordenamento brasileiro, destacam-se:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-1 rounded bg-teal-600 text-white font-black text-[10px] uppercase shrink-0">1. CF/88</span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Constituição Federal de 1988:</strong> Fonte primária e ápice valorativo. Estabelece os princípios estruturantes (Devido Processo Legal, Contraditório, Ampla Defesa, Presunção de Inocência, Juiz Natural e Motivação das Decisões).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-1 rounded bg-teal-600 text-white font-black text-[10px] uppercase shrink-0">2. Leis</span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Leis em Sentido Formal:</strong> Código de Processo Penal (Decreto-Lei nº 3.689/1941) e leis extravagantes (Lei nº 9.099/95 - JECRIM, Lei Maria da Penha, Lei de Drogas, Lei das Organizações Criminosas, etc.). Competência privativa da União (Art. 22, I da CF).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-1 rounded bg-teal-600 text-white font-black text-[10px] uppercase shrink-0">3. Tratados</span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Tratados e Convenções Internacionais de Direitos Humanos:</strong> Incorporados ao direito brasileiro, possuem caráter supralegal (abaixo da CF e acima da lei comum - STF) ou constitucional (se aprovados com rito de emenda constitucional, Art. 5º, § 3º). Exemplo central: Pacto de San José da Costa Rica (CADH).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-1 rounded bg-teal-600 text-white font-black text-[10px] uppercase shrink-0">4. Princípios</span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Princípios Gerais do Direito:</strong> Expressamente admitidos pelo Art. 3º do CPP como fonte subsidiária para colmatar omissões legislativas e guiar a aplicação do direito processual penal.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-1 rounded bg-teal-600 text-white font-black text-[10px] uppercase shrink-0">5. Jurisprudência</span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Jurisprudência e Precedentes:</strong> As decisões reiteradas dos Tribunais Superiores (STF e STJ), especialmente com o advento das Súmulas Vinculantes (Art. 103-A da CF) e temas de repercussão geral e recursos repetitivos, vinculam e moldam a prática forense diária no TJAM.
            </p>
          </div>
        </div>
      </section>

      {/* 🎯 FOCO PARA O TJAM: FLUXO DE MEMORIZAÇÃO */}
      <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-teal-50/70 border-teal-200'}`}>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-black text-teal-800 dark:text-teal-300 uppercase tracking-wider">
            🎯 Sequência de Prioridade para a Prova do TJAM
          </h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Memorize mentalmente a ordem lógica exata solicitada pelo professor para responder rapidamente qualquer questão da FGV:
        </p>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-teal-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-black text-teal-700 dark:text-teal-300">
          <span className="px-3 py-1 rounded-lg bg-teal-500/10">1. Lei no tempo</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1 rounded-lg bg-teal-500/10">2. Aplicação imediata</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1 rounded-lg bg-teal-500/10">3. Atos já realizados válidos</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1 rounded-lg bg-teal-500/10">4. Lei no espaço (territorialidade)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1 rounded-lg bg-teal-500/10">5. Interpretação extensiva</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1 rounded-lg bg-teal-500/10">6. Analogia (lacunas)</span>
        </div>

        {/* Checklist Interativo dos Tópicos */}
        <div className="space-y-2 pt-2">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Checklist de Retenção — Marque os pontos que você já domina com segurança:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'c_tempo', label: 'Lei no tempo: Aplicação imediata (Art. 2º CPP)' },
              { id: 'c_atos', label: 'Validade dos atos praticados sob a lei anterior' },
              { id: 'c_espaco', label: 'Lei no espaço: Princípio da Territorialidade (Art. 1º)' },
              { id: 'c_interp', label: 'Interpretação Extensiva: a lei disse menos do que queria' },
              { id: 'c_analog', label: 'Analogia: preenchimento de lacunas (Art. 3º)' },
              { id: 'c_fontes', label: 'Fontes: CF/88, leis, tratados e jurisprudência' },
            ].map(item => (
              <label
                key={item.id}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                  checklist[item.id]
                    ? 'bg-teal-500/10 border-teal-500 text-teal-900 dark:text-teal-200 font-black'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checklist[item.id]}
                  onChange={() => toggleChecklist(item.id)}
                  className="rounded-md text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <span className="text-xs">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ações de Finalização */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-teal-500/20">
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAsCompleted}
              className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 shadow-md ${
                isLessonCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-teal-600 text-white hover:bg-teal-500'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLessonCompleted ? '✓ Aula Concluída no Painel' : 'Marcar Aula como Concluída'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('questoes')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-black text-xs border border-teal-500/40 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ir para as 20 Questões TJAM</span>
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-black text-xs border border-teal-500/40 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Layers className="w-4 h-4" />
              <span>Revisar Flashcards</span>
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
