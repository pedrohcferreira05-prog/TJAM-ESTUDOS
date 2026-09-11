import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  Check,
  ShieldCheck,
  Building2,
  Clock,
  Award,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Video,
  ExternalLink,
  Target,
  FileText,
  Send,
  Sparkles,
  Layers,
  HelpCircle,
  FileCheck2,
  Info
} from 'lucide-react';
import { direitoAdminVideoPracticalTask } from '../data/direitoAdminLessonData';

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
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_direito_admin_controle');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      c1: false,
      c2: false,
      c3: false,
      c4: false,
      c5: false,
      c6: false,
      c7: false,
      c8: false
    };
  });

  const [activeTabSub, setActiveTabSub] = useState<'teoria' | 'mapa' | 'pratica'>('teoria');
  const [videoLink, setVideoLink] = useState('');
  const [videoStatus, setVideoStatus] = useState<'idle' | 'enviado'>('idle');

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_checklist_direito_admin_controle', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  });

  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  const videoUrl = "https://youtu.be/06f_EvjEW6k?is=kGenVS9-jH57s7_h";
  const embedUrl = "https://www.youtube.com/embed/06f_EvjEW6k?rel=0";

  const handleSendVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink.trim()) return;
    setVideoStatus('enviado');
    try {
      localStorage.setItem('tjam_video_desafio_admin_controle', videoLink);
    } catch (e) {}
  };

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Top Banner da Aula */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/70 via-slate-900 to-indigo-950/80 border border-blue-500/30 text-white space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            ⚖️ DIREITO ADMINISTRATIVO — 2ª AULA DE HOJE
          </span>
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Meta Programada • TJAM 2026
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white relative z-10">
          Controle da Administração Pública
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-3xl relative z-10">
          Mecanismos de fiscalização da atividade estatal, Controle Interno × Externo (Legislativo + TCU), Controle Judicial (revisão de legalidade), Autotutela Administrativa (Anulação × Revogação) e Classificação Temporal (Prévio, Concomitante e Posterior).
        </p>

        {/* Sub-navegação interna */}
        <div className="pt-2 flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTabSub('teoria')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              activeTabSub === 'teoria'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400/50'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Teoria Completa</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabSub('mapa')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              activeTabSub === 'mapa'
                ? 'bg-amber-600 text-white ring-2 ring-amber-400/50'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mapa Mental Esquematizado</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabSub('pratica')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              activeTabSub === 'pratica'
                ? 'bg-purple-600 text-white ring-2 ring-purple-400/50'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Exercício Prático em Vídeo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md ml-auto"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>20 Questões Gabaritadas</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: TEORIA COMPLETA */}
      {activeTabSub === 'teoria' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* 1. O que é controle da Administração Pública? */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm border border-blue-500/30">
                1
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                O que é controle da Administração Pública?
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É o <strong>conjunto de mecanismos utilizados para fiscalizar, acompanhar e verificar</strong> se a atuação da Administração Pública está de acordo com a lei e com o interesse público.
            </p>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-blue-50/60 border-blue-200'} space-y-2`}>
              <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                🎯 O controle busca ativamente evitar:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1 text-xs">
                {[
                  'Ilegalidades',
                  'Abusos de poder',
                  'Irregularidades formais',
                  'Desperdício de recursos públicos',
                  'Atos contrários ao interesse público'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Controle interno */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/30">
                2
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Controle Interno
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É realizado <strong>dentro do próprio Poder ou órgão</strong> responsável pela edição do ato.
            </p>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'} text-xs text-slate-700 dark:text-slate-300 space-y-1`}>
              <span className="font-bold text-slate-900 dark:text-white">Exemplo Prático:</span>
              <p>
                Um órgão público (como um tribunal ou secretaria) fiscaliza as despesas e atos praticados pelos seus próprios setores e chefias intermediárias.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <span>📌 Macete de Prova:</span>
              <span>Interno = DENTRO da Administração.</span>
            </div>
          </section>

          {/* 3. Controle externo */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-500/30">
                3
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Controle Externo
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É realizado por um <strong>órgão ou Poder diferente</strong> daquele que praticou o ato administrativo.
            </p>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-indigo-50/50 border-indigo-200'} text-xs text-slate-700 dark:text-slate-300 space-y-2`}>
              <p>
                Um dos principais exemplos constitucionais é o controle exercido pelo <strong>Poder Legislativo com auxílio dos Tribunais de Contas</strong>.
              </p>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                🏛️ <strong>No âmbito federal:</strong> A Constituição Federal estabelece o controle externo a cargo do <strong>Congresso Nacional com auxílio técnico do Tribunal de Contas da União (TCU)</strong> (arts. 70 e 71 da CF/88). No âmbito estadual do Amazonas, a ALEAM atua com o auxílio do <strong>TCE-AM</strong>.
              </div>
            </div>
          </section>

          {/* 4. Controle judicial */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-sm border border-purple-500/30">
                4
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Controle Judicial
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É realizado privativamente pelo <strong>Poder Judiciário</strong> mediante provocação dos interessados (princípio da inafastabilidade da jurisdição — art. 5º, XXXV da CF/88).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              O Judiciário analisa a <strong>legalidade dos atos administrativos quando provocado</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>📌 PONTO FUNDAMENTAL PARA O TJAM:</span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
                O controle judicial <strong>NÃO</strong> significa que o juiz possa substituir a Administração em todas as suas escolhas administrativas.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                O foco primordial e intransponível do Judiciário é <strong>verificar a LEGALIDADE do ato</strong>. O juiz nunca pode revogar ato administrativo por motivo de mérito (conveniência ou oportunidade)!
              </p>
            </div>
          </section>

          {/* 5. Controle administrativo */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-sm border border-sky-500/30">
                5
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Controle Administrativo (Autotutela)
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É aquele realizado pela <strong>própria Administração sobre seus próprios atos</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Com base no poder-dever de autotutela, a Administração Pública pode:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  <span>❌ ANULAÇÃO</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Ato Ilegal (Vício de Legalidade)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ocorre quando há violação a lei ou à Constituição. Opera efeitos retroativos (<strong>ex tunc</strong>), desfazendo os efeitos desde a origem.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <span>✅ REVOGAÇÃO</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Ato Válido (Mérito Administrativo)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ocorre por razões supervenientes de <strong>conveniência e oportunidade</strong>. Opera efeitos prospectivos (<strong>ex nunc</strong>), respeitando os direitos adquiridos.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-transparent border border-purple-500/30 flex items-center gap-3">
              <div className="text-2xl shrink-0">🧠</div>
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <strong className="text-purple-600 dark:text-purple-400">Lembrete de Ouro:</strong><br />
                <strong>Anulação</strong> → Ilegalidade.<br />
                <strong>Revogação</strong> → Conveniência e Oportunidade.
              </div>
            </div>
          </section>

          {/* 6. Controle de legalidade */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm border border-amber-500/30">
                6
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Controle de Legalidade
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Verifica se o ato administrativo está em estrita conformidade com:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-center">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                📜 Constituição
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                ⚖️ Leis em Sentido Estrito
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                📑 Decretos e Regulamentos
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                🏛️ Demais Normas Jurídicas
              </div>
            </div>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">
              👉 Se houver vício de legalidade, o ato administrativo deverá ser ANULADO.
            </p>
          </section>

          {/* 7. Controle de mérito */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-sm border border-rose-500/30">
                7
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Controle de Mérito
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Relaciona-se à <strong>conveniência e oportunidade</strong> da atuação administrativa (margem de discricionariedade conferida pela lei).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              É especialmente ligado à atuação da própria Administração Pública.
            </p>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-2`}>
              <div className="font-extrabold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400">
                📌 Não Confunda em Prova:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="font-extrabold text-blue-600 dark:text-blue-400">Legalidade</div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">O ato está de acordo com a lei?</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="font-extrabold text-amber-600 dark:text-amber-400">Mérito</div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">O ato é conveniente e oportuno para o interesse público?</p>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Controle prévio, concomitante e posterior */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-sm border border-teal-500/30">
                8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Controle Prévio, Concomitante e Posterior
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              O controle também pode ser classificado pelo <strong>momento cronológico em que ocorre</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-2xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 font-black text-[10px] uppercase tracking-wider">
                  🔹 Prévio
                </span>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">Antes da realização</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ocorre antes da prática do ato ou da despesa (ex: aprovação prévia de nomeação pelo Legislativo).
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-400 font-black text-[10px] uppercase tracking-wider">
                  🔹 Concomitante
                </span>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">Durante a realização</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ocorre simultaneamente à atividade (ex: auditoria em tempo real, fiscalização de contratos em execução).
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-black text-[10px] uppercase tracking-wider">
                  🔹 Posterior
                </span>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">Depois de realizado</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ocorre depois que o ato já foi praticado (ex: julgamento de contas, anulação, homologação posterior).
                </p>
              </div>
            </div>
          </section>

          {/* 🎯 Para o TJAM Box */}
          <section className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-indigo-900/30 border-2 border-amber-500/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <h3 className="text-base sm:text-lg font-black text-amber-400 uppercase tracking-tight">
                Priorize Especialmente para o TJAM:
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-bold text-slate-200">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
                1️⃣ Controle Interno × Externo × Judicial
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
                2️⃣ Legalidade × Mérito Administrativo
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
                3️⃣ Anulação (Ilegal) × Revogação (Mérito)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
                4️⃣ Prévio × Concomitante × Posterior
              </div>
            </div>
          </section>

          {/* Vídeo Aula Integrada */}
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-sm border border-rose-500/30">
                  <Video className="w-4 h-4 text-rose-500" />
                </span>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Vídeo Aula Oficial Recomendada
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Assista à aula completa sobre Controle da Administração Pública
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
                title="Vídeo Aula - Direito Administrativo: Controle da Administração Pública"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        </div>
      )}

      {/* VIEW 2: MAPA MENTAL ESQUEMATIZADO */}
      {activeTabSub === 'mapa' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
                🧠
              </div>
              <div>
                <h2 className="text-xl font-black text-amber-300">
                  MAPA MENTAL — CONTROLE DA ADMINISTRAÇÃO
                </h2>
                <p className="text-xs text-slate-400">
                  Estrutura visual esquematizada dos principais ramos do controle administrativo
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-blue-500/30 space-y-2">
                <span className="text-xs font-black text-blue-400 uppercase tracking-wider block">→ Interno</span>
                <p className="text-xs text-slate-300">Dentro da própria Administração / mesmo Poder.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">→ Externo</span>
                <p className="text-xs text-slate-300">Outro Poder/órgão fiscaliza (Legislativo + Tribunais de Contas).</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-purple-500/30 space-y-2">
                <span className="text-xs font-black text-purple-400 uppercase tracking-wider block">→ Judicial</span>
                <p className="text-xs text-slate-300">Poder Judiciário → analisa principalmente a LEGALIDADE mediante provocação.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-sky-500/30 space-y-2">
                <span className="text-xs font-black text-sky-400 uppercase tracking-wider block">→ Administrativo</span>
                <p className="text-xs text-slate-300">A própria Administração controla seus atos por autotutela.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30 space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">→ Legalidade</span>
                <p className="text-xs text-slate-300">Verifica estrita conformidade com a lei e normas vigentes.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-teal-500/30 space-y-2">
                <span className="text-xs font-black text-teal-400 uppercase tracking-wider block">→ Mérito</span>
                <p className="text-xs text-slate-300">Juízo discricionário: Conveniência + Oportunidade.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-rose-500/30 space-y-2">
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider block">→ Anulação</span>
                <p className="text-xs text-slate-300">❌ Ato ILEGAL (efeitos retroativos ex tunc).</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">→ Revogação</span>
                <p className="text-xs text-slate-300">✅ Ato VÁLIDO que deixa de ser conveniente/oportuno (ex nunc).</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 text-xs text-slate-300 space-y-1">
              <span className="font-extrabold text-blue-400">Classificação Temporal do Controle:</span>
              <p>• <strong>Prévio:</strong> antes da prática do ato.</p>
              <p>• <strong>Concomitante:</strong> durante a realização do ato.</p>
              <p>• <strong>Posterior:</strong> depois que o ato foi consumado.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: EXERCÍCIO PRÁTICO EM VÍDEO */}
      {activeTabSub === 'pratica' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-950/60 border-2 border-purple-500/40 text-white space-y-5 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-2xl shrink-0">
                🎥
              </span>
              <div>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/30 text-purple-300 border border-purple-400/30">
                  Desafio Prático em Vídeo
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {direitoAdminVideoPracticalTask.titulo}
                </h2>
              </div>
            </div>

            {/* Situação Problema */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-2">
              <span className="text-xs font-black uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-purple-400" />
                🎯 Situação-Problema
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {direitoAdminVideoPracticalTask.situacaoProblema}
              </p>
            </div>

            {/* Tarefa do Aluno */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4 text-amber-400" />
                🎥 Tarefa do Aluno (Vídeo de 2 a 3 minutos)
              </span>
              <p className="text-xs text-slate-300">
                Grave um vídeo de 2 a 3 minutos como se você estivesse explicando a situação jurídica para o seu chefe imediato no órgão público. No vídeo, explique com clareza:
              </p>

              <div className="space-y-2 pt-1">
                {direitoAdminVideoPracticalTask.perguntasChave.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs text-slate-200 font-semibold flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/30 text-purple-300 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desafio do Cotidiano */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/15 border border-amber-500/40 space-y-2">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                🔎 Desafio do Cotidiano
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {direitoAdminVideoPracticalTask.desafioCotidiano}
              </p>
              <div className="text-[11px] text-amber-300/90 font-medium">
                💡 <em>Dica: Não precisa ser um exemplo jurídico complexo. O fundamental é explicar a razão (vício x inoportunidade) com simplicidade.</em>
              </div>
            </div>

            {/* Critérios de Avaliação */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                🏆 Critérios de Avaliação do Professor:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {direitoAdminVideoPracticalTask.criteriosAvaliacao.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulário de Entrega do Vídeo */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-purple-400" />
                📤 Envio da Gravação / Link do Vídeo
              </h3>
              <p className="text-xs text-slate-400">
                Cole o link do seu vídeo (YouTube não listado, Google Drive, Loom ou gravação local):
              </p>

              <form onSubmit={handleSendVideo} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="url"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="https://youtu.be/... ou https://drive.google.com/..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Vídeo</span>
                </button>
              </form>

              {videoStatus === 'enviado' && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Vídeo registrado com sucesso! O professor já pode avaliar o seu parecer simulado.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checklist de Estudo da Aula */}
      <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Metas — Controle da Administração Pública
        </h3>
        <div className="space-y-2 text-xs font-semibold">
          {[
            { id: 'c1', text: 'Entendi o conceito e a finalidade de fiscalização do controle na Administração Pública.' },
            { id: 'c2', text: 'Sei que Controle Interno é exercido dentro da própria estrutura do Poder/órgão.' },
            { id: 'c3', text: 'Compreendi o Controle Externo (Poder Legislativo com auxílio do TCU ou TCE).' },
            { id: 'c4', text: 'Memorizei que o Poder Judiciário só avalia a legalidade quando provocado e NÃO o mérito.' },
            { id: 'c5', text: 'Entendi o princípio da autotutela e a diferença entre Anulação (ilegalidade) e Revogação (mérito).' },
            { id: 'c6', text: 'Sei que a anulação gera efeitos retroativos (ex tunc) e a revogação prospectivos (ex nunc).' },
            { id: 'c7', text: 'Classifiquei o controle quanto ao momento: Prévio (antes), Concomitante (durante) e Posterior (depois).' },
            { id: 'c8', text: 'Completei o estudo e estou pronto para resolver as 20 questões e o exercício prático.' },
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
          <span>Fazer as 20 Questões da Aula</span>
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
