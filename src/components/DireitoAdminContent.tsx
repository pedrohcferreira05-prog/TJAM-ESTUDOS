import React, { useState } from 'react';
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
  ExternalLink,
  Target,
  FileText
} from 'lucide-react';

interface DireitoAdminContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted?: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const DireitoAdminContent: React.FC<DireitoAdminContentProps> = ({
  isDarkMode,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted = false,
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

  const videoUrl = "https://youtu.be/fS0LrjO5Wfs?is=UjSegw0VZ6ZiLDjq";
  const embedUrl = "https://www.youtube.com/embed/fS0LrjO5Wfs?rel=0";

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Top Banner da Aula */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/70 border border-blue-500/30 text-white space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            📚 AULA 1 — DIREITO ADMINISTRATIVO
          </span>
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 1ª Aula de Hoje • TJAM 2026
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white relative z-10">
          Responsabilidade Civil do Estado
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl relative z-10">
          Dever de reparação de danos causados a terceiros, fundamentação no Art. 37, § 6º da CF/88, responsabilidade objetiva (C + D + N), direito de regresso, excludentes e 20 exercícios gabaritados.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ir para os 20 Exercícios da Aula</span>
          </button>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Assistir no YouTube</span>
          </a>
        </div>
      </div>

      {/* 1. O que é? */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm border border-blue-500/30">
            🎯
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            1. O que é?
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          É o <strong>dever que o Estado possui de reparar danos</strong> causados a terceiros por uma <strong>atuação ou omissão</strong> relacionada à atividade administrativa.
        </p>
        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-blue-50/60 border-blue-200'} text-xs text-slate-700 dark:text-slate-300 space-y-1`}>
          <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
            💡 Exemplo Prático de Fixação:
          </span>
          <p>
            Um agente público, atuando nessa condição (por exemplo, conduzindo uma viatura oficial em serviço), causa um dano patrimonial a um cidadão. Diante disso, <strong>pode surgir o dever de o Estado indenizar a vítima</strong> pelos prejuízos sofridos.
          </p>
        </div>
      </section>

      {/* 2. Previsão constitucional */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/30">
            ⚖️
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            2. Previsão Constitucional
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A regra principal do nosso ordenamento está expressa no <strong>art. 37, § 6º, da Constituição Federal de 1988</strong>:
        </p>
        
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 dark:border-amber-400 text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic shadow-sm">
          "As pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa."
          <div className="mt-2 text-right not-italic font-black text-[11px] text-amber-600 dark:text-amber-400">
            — Artigo 37, § 6º da Constituição da República Federativa do Brasil
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          A Administração Pública responde pelos danos que seus agentes, <strong>nessa qualidade</strong>, causarem a terceiros.
        </p>
      </section>

      {/* 3. Responsabilidade objetiva */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm border border-amber-500/30">
            🔑
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            3. Responsabilidade Objetiva
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A regra geral adotada para o Estado é a <strong>responsabilidade objetiva</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          Isso significa que, para a vítima buscar e obter indenização, em regra, <strong>precisa demonstrar apenas 3 elementos</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-4 rounded-2xl border text-center space-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="w-8 h-8 mx-auto rounded-full bg-blue-500/20 text-blue-400 font-black text-xs flex items-center justify-center">1</span>
            <div className="font-extrabold text-xs text-slate-900 dark:text-white uppercase">Conduta Estatal</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Ação ou comportamento comissivo do Poder Público</p>
          </div>
          <div className={`p-4 rounded-2xl border text-center space-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="w-8 h-8 mx-auto rounded-full bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center">2</span>
            <div className="font-extrabold text-xs text-slate-900 dark:text-white uppercase">Dano Efetivo</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Prejuízo material ou moral suportado pelo terceiro</p>
          </div>
          <div className={`p-4 rounded-2xl border text-center space-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="w-8 h-8 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center">3</span>
            <div className="font-extrabold text-xs text-slate-900 dark:text-white uppercase">Nexo Causal</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Vínculo de causa e efeito entre a conduta e o dano</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent border border-blue-500/30 flex items-center gap-3">
          <div className="text-2xl shrink-0">👉</div>
          <div className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200">
            <strong>Regra Fundamental:</strong> Não é necessário provar a culpa do agente público para responsabilizar o Estado.
          </div>
        </div>

        {/* Macete Box */}
        <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 space-y-1">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-700 dark:text-amber-300 uppercase tracking-wider">
            <span>🧠 MACETE DE OURO PARA O TJAM:</span>
          </div>
          <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Estado = C + D + N
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            <strong>C</strong>onduta + <strong>D</strong>ano + <strong>N</strong>exo causal.
          </p>
        </div>
      </section>

      {/* 4. E a culpa? */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-sm border border-purple-500/30">
            👤
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            4. E a Culpa?
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Na responsabilidade objetiva do Estado, a culpa <strong>não precisa ser demonstrada</strong> pela vítima.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Porém, isso <strong>não significa que a culpa nunca tenha importância</strong>:
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O Estado pode buscar o <strong>direito de regresso</strong> contra o agente público quando este tiver agido com <strong>dolo ou culpa</strong>.
        </p>

        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-2`}>
          <div className="font-extrabold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400">
            📌 Portanto, memorize esta distinção:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <span className="text-[10px] font-black uppercase text-blue-400">Relação Externa</span>
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                Vítima → Estado
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold">
                Responsabilidade OBJETIVA (sem culpa).
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-400">Relação Interna</span>
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                Estado → Agente
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold">
                Ação REGRESSIVA se houver dolo ou culpa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direito de regresso */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-sm border border-sky-500/30">
            🔄
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            5. Direito de Regresso
          </h2>
        </div>
        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-sky-50/50 border-sky-200'} space-y-2`}>
          <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
            Imagine o seguinte cenário:
          </div>
          <blockquote className="border-l-4 border-sky-500 pl-3 italic text-xs text-slate-600 dark:text-slate-300">
            "Um servidor público, durante sua atividade, causa um prejuízo a um cidadão."
          </blockquote>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-1">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span>O cidadão pode cobrar a reparação diretamente do <strong>Estado</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span>Depois, se ficar comprovado que o servidor agiu com <strong>dolo ou culpa</strong>, o Estado poderá cobrar dele o valor pago.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Excludentes ou situações que podem afastar o nexo causal */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-sm border border-rose-500/30">
            🚨
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            6. Excludentes ou Situações que Podem Afastar o Nexo Causal
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A responsabilidade objetiva <strong>não significa que o Estado será condenado em qualquer situação</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          Podem existir situações capazes de <strong>afastar ou reduzir</strong> a responsabilidade, como:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-rose-500">Excludente 1</span>
            <div className="font-bold text-xs text-slate-900 dark:text-white">Culpa exclusiva da vítima</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">A vítima foi a única causadora do evento lesivo.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-rose-500">Excludente 2</span>
            <div className="font-bold text-xs text-slate-900 dark:text-white">Fato exclusivo de terceiro</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Dano ocasionado por conduta de terceiro sem vínculo com o Estado.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-rose-500">Excludente 3</span>
            <div className="font-bold text-xs text-slate-900 dark:text-white">Caso fortuito ou força maior</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Eventos da natureza ou imprevisíveis, conforme o caso e sua relação com o dano.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-700 dark:text-slate-300">
          <strong>Ponto Central:</strong> O ponto central da análise é verificar se existe <strong>nexo causal</strong> entre a atuação estatal e o dano. Sem nexo, não há responsabilidade.
        </div>
      </section>

      {/* 7. Quem é considerado agente público? */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-500/30">
            🏛️
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            7. Quem é Considerado Agente Público?
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para essa matéria, o <strong>conceito é amplo</strong>. Pode envolver, conforme o caso:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { title: 'Servidores Públicos', desc: 'Ocupantes de cargos efetivos ou comissionados estatutários.' },
            { title: 'Empregados Públicos', desc: 'Celetistas vinculados a empresas públicas e sociedades de economia mista prestadoras de serviços públicos.' },
            { title: 'Agentes Políticos', desc: 'Magistrados, membros do MP, chefes do Poder Executivo e parlamentares.' },
            { title: 'Agentes Temporários', desc: 'Contratados por tempo determinado para atender excepcional interesse público (Art. 37, IX CF).' },
            { title: 'Outros Agentes', desc: 'Particulares em colaboração que atuem formalmente em nome do Estado.' },
          ].map((ag, idx) => (
            <div key={idx} className={`p-3 rounded-xl border flex items-center gap-2.5 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className="font-extrabold text-xs text-slate-900 dark:text-white block">{ag.title}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{ag.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-xs text-slate-800 dark:text-slate-200">
          <strong>Requisito Indispensável:</strong> O importante é que o agente esteja <strong>atuando nessa qualidade</strong>, ou seja, no exercício da função pública ou relacionado a ela.
        </div>
      </section>

      {/* 8. O que mais cai em prova? Tabela comparativa */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm border border-amber-500/30">
            📌
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            8. O que Mais Cai em Prova?
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
          Memorize estas diferenças essenciais:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-900 dark:text-white uppercase font-black tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 sm:px-4">Situação</th>
                <th className="p-3.5 sm:px-4">Regra Legal & Jurisprudencial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3.5 sm:px-4 font-bold text-slate-900 dark:text-white">Estado → vítima</td>
                <td className="p-3.5 sm:px-4 font-extrabold text-emerald-600 dark:text-emerald-400">Responsabilidade objetiva</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3.5 sm:px-4 font-bold text-slate-900 dark:text-white">Vítima precisa provar culpa do agente?</td>
                <td className="p-3.5 sm:px-4 font-extrabold text-rose-600 dark:text-rose-400">Não</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3.5 sm:px-4 font-bold text-slate-900 dark:text-white">Precisa existir dano?</td>
                <td className="p-3.5 sm:px-4 font-extrabold text-emerald-600 dark:text-emerald-400">Sim</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3.5 sm:px-4 font-bold text-slate-900 dark:text-white">Precisa existir nexo causal?</td>
                <td className="p-3.5 sm:px-4 font-extrabold text-emerald-600 dark:text-emerald-400">Sim</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3.5 sm:px-4 font-bold text-slate-900 dark:text-white">Estado → agente público</td>
                <td className="p-3.5 sm:px-4 font-extrabold text-purple-600 dark:text-purple-400">Ação regressiva se houver dolo ou culpa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🧠 RESUMÃO DA AULA */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-indigo-950/40 border-2 border-amber-500/40 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h3 className="text-lg font-black text-amber-400 tracking-tight">
            RESUMÃO DA AULA
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-200">
          <strong>Responsabilidade Civil do Estado</strong> = dever de reparar danos causados por agentes públicos nessa qualidade.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1">
            <span className="text-amber-400 font-black text-xs">⭐ Estado:</span>
            <p className="text-xs text-slate-300">Responsabilidade objetiva (independe de culpa).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1">
            <span className="text-emerald-400 font-black text-xs">⭐ Vítima:</span>
            <p className="text-xs text-slate-300">Prova dano + conduta + nexo causal (C + D + N).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1">
            <span className="text-purple-400 font-black text-xs">⭐ Agente:</span>
            <p className="text-xs text-slate-300">Pode responder regressivamente se houver dolo ou culpa.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1">
            <span className="text-sky-400 font-black text-xs">⭐ Artigo-chave:</span>
            <p className="text-xs text-slate-300">Constituição Federal, art. 37, § 6º.</p>
          </div>
        </div>
      </section>

      {/* 🎥 VÍDEO AULA EMBEDDADA */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-sm border border-rose-500/30">
              <Video className="w-4 h-4 text-rose-500" />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Vídeo Aula Oficial
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Assista à aula recomendada para fixação completa
              </p>
            </div>
          </div>

          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no YouTube</span>
          </a>
        </div>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title="Vídeo Aula - Direito Administrativo: Responsabilidade Civil do Estado"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Checklist de Estudo da Aula */}
      <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação — Responsabilidade Civil do Estado
        </h3>
        <div className="space-y-2 text-xs font-semibold">
          {[
            { id: 'c1', text: 'Entendi o conceito de responsabilidade civil do Estado como dever de indenizar.' },
            { id: 'c2', text: 'Decorei o Art. 37, § 6º da Constituição Federal de 1988.' },
            { id: 'c3', text: 'Memorizei o macete C + D + N: Conduta, Dano e Nexo Causal.' },
            { id: 'c4', text: 'Sei que a vítima NÃO precisa provar a culpa do agente público.' },
            { id: 'c5', text: 'Compreendi que a ação regressiva contra o servidor exige comprovação de DOLO ou CULPA.' },
            { id: 'c6', text: 'Entendi as excludentes: culpa exclusiva da vítima, fato de terceiro e caso fortuito/força maior.' },
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

      {/* Ações Finais / Ir para Exercícios */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('questoes')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <FileText className="w-4 h-4" />
          <span>Fazer os 20 Exercícios da Aula</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleMarkAsCompleted}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula Marcada como Concluída' : 'Marcar Aula como Concluída'}</span>
        </button>
      </div>
    </article>
  );
};
