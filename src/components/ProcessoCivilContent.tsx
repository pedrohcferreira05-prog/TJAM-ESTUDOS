import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  UserCheck,
  Users,
  FileCheck2,
  Trophy,
  ExternalLink,
  Video
} from 'lucide-react';
import { procCivilAula2SummaryPoints } from '../data/processoCivilLessonData';

interface ProcessoCivilContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProcessoCivilContent: React.FC<ProcessoCivilContentProps> = ({
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
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-blue-950/60 border border-indigo-500/30 text-white space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            Processo Civil • Aula 2
          </span>
          <span className="text-xs font-bold text-slate-400">
            Lei nº 13.105/2015 (CPC) • Foco TJAM
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Partes e Procuradores no CPC/2015
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Avançando além de conceito, jurisdição e competência: domine a capacidade processual, curatela especial, representação legal, mandato judicial e o litisconsórcio conforme as exigências da banca examinadora.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('video')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-all cursor-pointer shadow-sm"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Assistir Vídeo Aula (Prof. Especialista)</span>
          </button>
          <a
            href="https://youtu.be/4bnOvAuk2Is?is=gB8GOQ0zRpxxtj9j"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold border border-slate-700 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no YouTube</span>
          </a>
        </div>
      </div>

      {/* Objetivos da Aula */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-indigo-50/40 border-indigo-100'}`}>
        <h2 className="text-base font-black text-indigo-700 dark:text-indigo-400 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-indigo-600" /> Objetivos de Aprendizagem — Aula 2 (Partes e Procuradores)
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
          Pontos fundamentais cobrados com frequência em concursos para os cargos judiciários do TJAM:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Identificar quem são as partes (autor e réu) na relação processual.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Compreender a capacidade processual e a distinção entre representação e assistência.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Dominar as hipóteses de nomeação de curador especial (incapazes e réus reveles).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Reconhecer as regras de representação em juízo da União, Estados, Municípios e massa falida.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Diferenciar a procuração geral para o foro dos atos que exigem cláusula de poderes especiais.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Compreender os deveres das partes, vedação a ofensas e a formação do litisconsórcio.</span>
          </li>
        </ul>
      </section>

      {/* 1. Quem são as partes? */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>1. 👥 Quem são as partes?</span>
        </h2>
        <p className="text-sm">
          As <strong>partes</strong> são, em regra, os sujeitos que ocupam os polos da relação processual estabelecida perante o Poder Judiciário:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/60 border-emerald-200'}`}>
            <span className="font-black text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">Polo Ativo</span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Autor</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              É quem apresenta a demanda, aciona a jurisdição e formula o pedido de tutela jurisdicional.
            </p>
          </div>
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-rose-50/60 border-rose-200'}`}>
            <span className="font-black text-rose-700 dark:text-rose-400 uppercase text-[10px]">Polo Passivo</span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Réu</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              É o sujeito em face de quem a demanda é proposta, convocado a responder em juízo.
            </p>
          </div>
        </div>
        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} text-xs`}>
          <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">📌 Exemplo Prático:</strong>
          <p className="mt-1 italic text-slate-700 dark:text-slate-300">
            "João cobra judicialmente uma dívida de Pedro perante o Tribunal de Justiça do Amazonas."
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            ➔ <strong>João</strong> = Autor (polo ativo) &nbsp;|&nbsp; <strong>Pedro</strong> = Réu (polo passivo).
          </p>
        </div>
      </section>

      {/* 2. Capacidade processual */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>2. ⚖️ Capacidade Processual</span>
        </h2>
        <p className="text-sm">
          O Código de Processo Civil estabelece no seu <strong>art. 70</strong>:
        </p>
        <blockquote className="p-3.5 rounded-2xl bg-indigo-500/10 border-l-4 border-indigo-500 text-xs italic font-medium text-slate-800 dark:text-slate-200">
          "Toda pessoa que se encontre no exercício de seus direitos tem capacidade para estar em juízo."
        </blockquote>
        <p className="text-sm">
          Essa é a chamada <strong>capacidade processual</strong> (ou capacidade para estar em juízo).
        </p>

        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
            E quem não possui capacidade civil plena?
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            O incapaz não atua sozinho. Ele deverá ser <strong>representado</strong> ou <strong>assistido</strong>, conforme o caso, por:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">👨‍👩‍👦 Pais</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">🛡️ Tutor</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">⚖️ Curador</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-black text-amber-800 dark:text-amber-300 uppercase text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>📌 Atenção Máxima para a Prova: Representação ≠ Assistência</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-200 font-medium">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-500/20">
              <strong className="text-amber-700 dark:text-amber-300 block mb-1">Representação:</strong>
              O representante pratica o ato <strong>em nome do incapaz</strong> (para os absolutamente incapazes — ex: menores de 16 anos).
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-500/20">
              <strong className="text-amber-700 dark:text-amber-300 block mb-1">Assistência:</strong>
              O incapaz pratica o ato <strong>juntamente com seu assistente</strong> (para os relativamente incapazes — ex: jovens de 16 a 18 anos).
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curador especial */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>3. 👨‍⚖️ Curador Especial (Art. 72 do CPC)</span>
        </h2>
        <p className="text-sm">
          O juiz nomeará <strong>curador especial</strong> em situações taxativas previstas no Código de Processo Civil para resguardar a paridade de armas e o direito de defesa:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Hipótese 1</span>
            <h4 className="font-extrabold text-slate-900 dark:text-white">Incapaz</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc pl-4">
              <li>Quando o incapaz <strong>não tiver representante legal</strong>; ou</li>
              <li>Quando houver <strong>conflito de interesses</strong> entre o incapaz e seu representante legal.</li>
            </ul>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Hipótese 2</span>
            <h4 className="font-extrabold text-slate-900 dark:text-white">Réu Revel</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Também há nomeação de curador especial para:
            </p>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc pl-4">
              <li>Réu preso revel;</li>
              <li>Réu revel citado por edital;</li>
              <li>Réu revel citado com hora certa (citação ficta),</li>
            </ul>
            <p className="text-[11px] text-slate-500 italic">
              *Enquanto não constituído advogado nos autos.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-300 font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>
            📌 Regra de Ouro: A curatela especial é exercida privativamente pela <strong>Defensoria Pública</strong>, nos termos da lei (CPC, art. 72, parágrafo único).
          </span>
        </div>
      </section>

      {/* 4. Representação em juízo */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>4. 🏛️ Representação em Juízo (Art. 75 do CPC)</span>
        </h2>
        <p className="text-sm">
          Algumas pessoas jurídicas e entidades despersonalizadas não atuam pessoalmente no processo; são representadas em juízo ativa e passivamente por quem a lei determina:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">União</span>
            <p className="font-bold text-slate-900 dark:text-white">Advocacia-Geral da União (AGU)</p>
            <p className="text-[11px] text-slate-500">Diretamente ou mediante órgão vinculado.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Estados e DF</span>
            <p className="font-bold text-slate-900 dark:text-white">Procuradores dos Estados / DF</p>
            <p className="text-[11px] text-slate-500">Ex: Procuradoria Geral do Estado do Amazonas (PGE/AM).</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Municípios</span>
            <p className="font-bold text-slate-900 dark:text-white">Prefeito ou Procurador Municipal</p>
            <p className="text-[11px] text-slate-500">Ou associação de representação nas hipóteses legais.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Massa Falida</span>
            <p className="font-bold text-slate-900 dark:text-white">Administrador Judicial</p>
            <p className="text-[11px] text-slate-500">Nomeado pelo juiz do processo falimentar.</p>
          </div>
        </div>
      </section>

      {/* 5. Procuradores */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>5. 👔 Procuradores (Capacidade Postulatória)</span>
        </h2>
        <p className="text-sm">
          Em regra, a parte é representada em juízo por <strong>advogado regularmente inscrito na OAB</strong> (art. 103 do CPC). Trata-se do <em>jus postulandi</em> (capacidade postulatória).
        </p>
        <p className="text-sm">
          O CPC também autoriza a parte a <strong>postular em causa própria</strong> quando possuir habilitação legal para tanto.
        </p>

        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} text-xs space-y-2`}>
          <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">📌 Exemplo Prático:</strong>
          <p className="text-slate-700 dark:text-slate-300">
            Maria deseja ajuizar uma ação perante uma das Varas Cíveis de Manaus. Ela possui duas alternativas legais:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-1 font-semibold">
            <span className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              ➡️ <strong>Opção 1:</strong> Constituir um advogado particular ou Defensoria Pública.
            </span>
            <span className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              ➡️ <strong>Opção 2:</strong> Postular em causa própria, se possuir habilitação legal (inscrição na OAB).
            </span>
          </div>
        </div>
      </section>

      {/* 6. Procuração */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>6. 📜 Procuração (Art. 104 do CPC)</span>
        </h2>
        <p className="text-sm">
          Em regra, o advogado não será admitido a postular em juízo sem procuração (instrumento de mandato).
        </p>
        <p className="text-sm">
          No entanto, existem <strong>situações excepcionais</strong> em que o advogado pode atuar inicialmente sem procuração para evitar perecimento de direitos:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-center">
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
            Evitar Preclusão
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
            Evitar Decadência
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
            Evitar Prescrição
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
            Praticar Ato Urgente
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Nessas situações emergenciais, o advogado obriga-se a apresentar o instrumento de mandato no prazo de <strong>15 dias</strong>, prorrogável por igual período por despacho do juiz.
        </p>
      </section>

      {/* 7. Procuração geral para o foro vs poderes especiais */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>7. 📑 Procuração Geral para o Foro & Poderes Especiais (Art. 105)</span>
        </h2>
        <p className="text-sm">
          A <strong>procuração geral para o foro</strong> habilita o advogado a praticar todos os atos processuais ordinários (propor petições, participar de audiências, recorrer, manifestar-se sobre provas).
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Porém, os atos de disposição de direitos e de maior relevância <strong>exigem poderes específicos expressos</strong> na procuração:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-semibold">
          {[
            'Receber citação',
            'Confessar',
            'Reconhecer a procedência do pedido',
            'Transigir (fazer acordo)',
            'Desistir da ação',
            'Renunciar ao direito sobre o qual se funda a ação',
            'Receber valores e dar quitação',
            'Firmar compromisso arbitral',
            'Assinar declaração de hipossuficiência econômica'
          ].map((item, idx) => (
            <div
              key={item}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 shadow-xs"
            >
              <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Macete Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/40 text-xs space-y-1">
          <div className="flex items-center gap-2 font-black text-amber-800 dark:text-amber-300 uppercase text-[11px]">
            <span>🧠 Macete de Prova TJAM:</span>
          </div>
          <p className="font-extrabold text-slate-900 dark:text-white">
            Procuração geral NÃO significa poder para tudo!
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            Se a questão da prova afirmar que o advogado pode <em>transigir</em> ou <em>desistir</em> munido apenas da procuração geral para o foro, o item está <strong>ERRADO</strong>. É imperativa cláusula de poderes específicos!
          </p>
        </div>
      </section>

      {/* 8. Deveres das partes e procuradores */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>8. 📋 Deveres das Partes e Procuradores (Art. 77 do CPC)</span>
        </h2>
        <p className="text-sm">
          Todos os que participam do processo devem agir de acordo com a boa-fé e lealdade processual. O CPC enumera expressamente os seguintes deveres:
        </p>

        <div className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Expor os fatos em juízo conforme a verdade (dever de veracidade);</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Não formular pretensão ou defesa ciente de que destituída de fundamento;</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Não produzir provas nem praticar atos inúteis ou desnecessários à defesa do direito;</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Cumprir com exatidão as decisões jurisdicionais (provisórias ou finais) e não criar embaraços à sua efetivação;</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Informar e manter permanentemente atualizados seus endereços para recebimento de intimações;</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Não praticar inovação ilegal no estado de fato de bem ou direito litigioso.</span>
          </div>
        </div>
      </section>

      {/* 9. Expressões ofensivas */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>9. 🚫 Vedação a Expressões Ofensivas (Art. 78 do CPC)</span>
        </h2>
        <p className="text-sm">
          É expressamente <strong>vedado</strong> às partes, a seus procuradores, aos juízes, aos membros do Ministério Público e da Defensoria Pública e a qualquer pessoa que intervenha no processo empregar <strong>expressões ofensivas</strong> nos escritos apresentados.
        </p>
        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-rose-50/50 border-rose-200'} text-xs text-slate-700 dark:text-slate-300 space-y-1`}>
          <p className="font-bold text-rose-800 dark:text-rose-400">
            ⚖️ Medidas Judiciais Cabíveis:
          </p>
          <p>
            Constatado o uso de linguagem injuriosa ou desrespeitosa, o juiz mandará, de ofício ou a requerimento da parte ofendida, <strong>riscar as expressões injuriosas</strong> dos autos, além de poder advertir os litigantes.
          </p>
        </div>
      </section>

      {/* 10. Litisconsórcio */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
          <span>10. 👥 Litisconsórcio (Arts. 113 a 118 do CPC)</span>
        </h2>
        <p className="text-sm">
          O <strong>litisconsórcio</strong> ocorre quando duas ou mais pessoas litigam no mesmo processo, em conjunto, no polo ativo, no polo passivo ou em ambos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">Exemplo 1: Litisconsórcio Ativo</span>
            <p className="font-extrabold text-slate-900 dark:text-white">"João e Maria ajuízam juntos uma ação contra Pedro."</p>
            <p className="text-slate-600 dark:text-slate-300">
              João + Maria = <strong>Litisconsortes Ativos</strong> (pluralidade de autores).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-blue-600 dark:text-blue-400 uppercase text-[10px]">Exemplo 2: Litisconsórcio Passivo</span>
            <p className="font-extrabold text-slate-900 dark:text-white">"João ajuíza uma ação contra Pedro e Carlos."</p>
            <p className="text-slate-600 dark:text-slate-300">
              Pedro + Carlos = <strong>Litisconsortes Passivos</strong> (pluralidade de réus).
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Hipóteses de Cabimento do Litisconsórcio (Art. 113 do CPC):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">1. Comunhão</span>
              <p className="text-slate-600 dark:text-slate-300">Comunhão de direitos ou de obrigações relativamente à lide.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">2. Conexão</span>
              <p className="text-slate-600 dark:text-slate-300">Conexão entre as causas pelo pedido ou pela causa de pedir.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">3. Afinidade</span>
              <p className="text-slate-600 dark:text-slate-300">Afinidade de questões por um ponto comum de fato ou de direito.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🧠 RESUMÃO PARA O TJAM */}
      <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-br from-indigo-50/80 to-blue-50/60 border-indigo-200'}`}>
        <h2 className="text-base font-black text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> 🧠 RESUMÃO ESTRUTURADO PARA O TJAM
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">Partes</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">Autor + Réu</p>
            <p className="text-[11px] text-slate-500">Polos ativo e passivo da demanda.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">Capacidade Processual</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">Estar em Juízo</p>
            <p className="text-[11px] text-slate-500">Toda pessoa no exercício dos direitos civis.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">Incapazes</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">Representação ou Assistência</p>
            <p className="text-[11px] text-slate-500">Conforme o grau de incapacidade civil.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">Curador Especial</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">Defensoria Pública</p>
            <p className="text-[11px] text-slate-500">Para incapazes sem representante ou réus reveles citados fictamente.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">Procurador</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">Advogado da OAB</p>
            <p className="text-[11px] text-slate-500">Capacidade postulatória em juízo.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">Poderes Especiais</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">Cláusula Específica</p>
            <p className="text-[11px] text-slate-500">Para receber citação, transigir, desistir e confessar.</p>
          </div>
        </div>
      </section>

      {/* 🎯 O que mais pode cair na prova */}
      <section className={`p-6 rounded-3xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/70 border-amber-200'}`}>
        <h3 className="font-black text-amber-900 dark:text-amber-300 text-sm uppercase flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>🎯 Os 7 Pontos de Ouro para Memorizar Antes das Questões</span>
        </h3>
        <ol className="space-y-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 list-decimal pl-4">
          <li><strong>Capacidade processual:</strong> toda pessoa no exercício de seus direitos tem capacidade para estar em juízo.</li>
          <li><strong>Representação ≠ assistência:</strong> representação é em nome do incapaz; assistência é praticado conjuntamente.</li>
          <li><strong>Curador especial:</strong> réu preso revel, réu revel citado por edital/hora certa e incapaz sem representante.</li>
          <li><strong>Atuação do advogado:</strong> é a regra geral, salvo postulação em causa própria por quem tem habilitação.</li>
          <li><strong>Procuração e poderes especiais:</strong> atos como transigir, confessar, renunciar e receber citação exigem cláusula expressa.</li>
          <li><strong>Deveres das partes:</strong> expor fatos conforme a verdade, lealdade e cumprimento das ordens judiciais.</li>
          <li><strong>Litisconsórcio:</strong> pluralidade de partes nos polos ativo, passivo ou misto.</li>
        </ol>
      </section>

      {/* Checklist da Aula */}
      <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação — Processo Civil (Aula 2)
        </h3>
        <div className="space-y-2 text-xs font-semibold">
          {[
            { id: 'c1', text: 'Entendi o conceito de partes (autor e réu) e a capacidade processual de estar em juízo.' },
            { id: 'c2', text: 'Sei diferenciar a representação (em nome do incapaz) da assistência (juntamente com o incapaz).' },
            { id: 'c3', text: 'Memorizei as hipóteses de Curador Especial (réu preso revel, citação por edital/hora certa e incapaz sem representante) exercida pela DPE.' },
            { id: 'c4', text: 'Compreendi a diferença entre procuração geral para o foro e a cláusula de poderes especiais (transigir, receber citação, desistir).' },
            { id: 'c5', text: 'Dominei o conceito de Litisconsórcio (ativo, passivo e misto) e as hipóteses do art. 113 do CPC.' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                checklist[item.id]
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                checklist[item.id] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
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
          onClick={() => setActiveTab('questoes')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>Responder os 20 Exercícios da Aula 2</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleMarkAsCompleted}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
        </button>
      </div>
    </article>
  );
};
