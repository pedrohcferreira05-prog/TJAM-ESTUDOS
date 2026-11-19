import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  Check,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Video,
  ExternalLink,
  CheckSquare,
  ShieldCheck,
  Handshake,
  Gavel,
  ArrowRight,
  Clock,
  FileText,
} from 'lucide-react';
import { procCivilAula1VideoInfo } from '../data/processoCivilAula1LessonData';

interface ProcessoCivilAula1ContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleComplete?: () => void;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

const PRINCIPLES_TABLE = [
  {
    num: '3.1',
    name: 'Devido Processo Legal',
    base: 'CF, art. 5º, LIV',
    summary: 'Ninguém será privado da liberdade ou de seus bens sem observância das regras, prazos e garantias legais.',
  },
  {
    num: '3.2',
    name: 'Contraditório e Ampla Defesa',
    base: 'CF, art. 5º, LV • CPC, arts. 7º, 9º e 10',
    summary: 'Direito à informação, manifestação e influência (vedada decisão-surpresa), usando todos os meios legítimos de defesa.',
  },
  {
    num: '3.3',
    name: 'Inafastabilidade da Jurisdição',
    base: 'CF, art. 5º, XXXV • CPC, art. 3º',
    summary: 'Não se excluirá da apreciação jurisdicional ameaça ou lesão a direito (amplo acesso à Justiça).',
  },
  {
    num: '3.4',
    name: 'Inércia e Impulso Oficial',
    base: 'CPC, art. 2º',
    summary: 'O processo começa por iniciativa da parte (inércia) e se desenvolve por impulso oficial do juiz, salvo exceções legais.',
  },
  {
    num: '3.5',
    name: 'Duração Razoável do Processo',
    base: 'CF, art. 5º, LXXVIII • CPC, art. 4º',
    summary: 'Direito de obter, em prazo razoável, a solução integral do mérito, incluída a atividade satisfativa.',
  },
  {
    num: '3.6',
    name: 'Boa-fé Processual',
    base: 'CPC, art. 5º',
    summary: 'Todo aquele que de qualquer forma participa do processo deve comportar-se de acordo com a boa-fé e lealdade.',
  },
  {
    num: '3.7',
    name: 'Cooperação',
    base: 'CPC, art. 6º',
    summary: 'Todos os sujeitos do processo devem cooperar entre si para decisão de mérito justa e efetiva em tempo razoável.',
  },
  {
    num: '3.8',
    name: 'Isonomia (Paridade de Armas)',
    base: 'CF, art. 5º, caput • CPC, art. 7º',
    summary: 'Paridade de tratamento às partes quanto a direitos, deveres, ônus, meios de defesa e sanções processuais.',
  },
  {
    num: '3.9',
    name: 'Publicidade dos Atos Processuais',
    base: 'CF, art. 5º, LX e 93, IX • CPC, art. 11',
    summary: 'Os julgamentos e atos processuais são públicos em regra, admitindo sigilo apenas nos casos legais de segredo de justiça.',
  },
  {
    num: '3.10',
    name: 'Motivação das Decisões Judiciais',
    base: 'CF, art. 93, IX • CPC, arts. 11 e 489, § 1º',
    summary: 'Todas as decisões judiciais devem ser fundamentadas, sob pena de nulidade.',
  },
  {
    num: '3.11',
    name: 'Economia Processual',
    base: 'CPC, arts. 139, 188 e 277',
    summary: 'Obter o máximo resultado útil na atuação do Direito com o mínimo dispêndio de tempo, atos e custos.',
  },
  {
    num: '3.12',
    name: 'Autocomposição / Solução Consensual',
    base: 'CPC, art. 3º, §§ 1º a 3º',
    summary: 'Estímulo permanente à conciliação, à mediação e à solução consensual (além da arbitragem na forma da lei).',
  },
];

const CPC_NORMAS_FUNDAMENTAIS = [
  {
    art: 'Art. 2º',
    title: 'Inércia & Impulso Oficial',
    text: 'O processo começa por iniciativa da parte e se desenvolve por impulso oficial, salvo as exceções previstas em lei.',
  },
  {
    art: 'Art. 3º',
    title: 'Inafastabilidade, Arbitragem & Solução Consensual',
    text: 'Não se excluirá da apreciação jurisdicional ameaça ou lesão a direito. É permitida a arbitragem, na forma da lei. O Estado promoverá, sempre que possível, a solução consensual (conciliação e mediação estimuladas inclusive no curso do processo).',
  },
  {
    art: 'Art. 4º',
    title: 'Duração Razoável & Primazia do Mérito',
    text: 'As partes têm o direito de obter em prazo razoável a solução integral do mérito, incluída a atividade satisfativa.',
  },
  {
    art: 'Art. 5º',
    title: 'Boa-fé Objetiva Processual',
    text: 'Aquele que de qualquer forma participa do processo deve comportar-se de acordo com a boa-fé.',
  },
  {
    art: 'Art. 6º',
    title: 'Princípio da Cooperação',
    text: 'Todos os sujeitos do processo devem cooperar entre si para que se obtenha, em tempo razoável, decisão de mérito justa e efetiva.',
  },
  {
    art: 'Art. 7º',
    title: 'Paridade de Tratamento (Isonomia)',
    text: 'É assegurada às partes paridade de tratamento em relação ao exercício de direitos e faculdades processuais, aos meios de defesa, aos ônus, aos deveres e à aplicação de sanções processuais, competindo ao juiz zelar pelo efetivo contraditório.',
  },
  {
    art: 'Arts. 9º e 10',
    title: 'Contraditório Prévio & Vedação à Decisão-Surpresa',
    text: 'Não se proferirá decisão contra uma das partes sem que ela seja previamente ouvida (art. 9º), nem o juiz decidirá com base em fundamento sobre o qual não se tenha dado oportunidade de manifestação às partes, ainda que matéria de ofício (art. 10).',
  },
  {
    art: 'Art. 11',
    title: 'Publicidade & Fundamentação',
    text: 'Todos os julgamentos dos órgãos do Poder Judiciário serão públicos, e fundamentadas todas as decisões, sob pena de nulidade.',
  },
];

export const ProcessoCivilAula1Content: React.FC<ProcessoCivilAula1ContentProps> = ({
  isLessonCompleted = false,
  onToggleComplete,
  onToggleCompleted,
  onNavigateTab,
}) => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_proc_civil_aula01');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {
      conceito_dpc: false,
      principios_definicao: false,
      devido_contraditorio: false,
      inafastabilidade_inercia: false,
      duracao_boafe_cooperacao: false,
      isonomia_publicidade_motivacao: false,
      economia_autocomposicao: false,
      fixacao_20q: false,
    };
  });

  const [activeSubView, setActiveSubView] = useState<'teoria' | 'tabela' | 'cpc'>('teoria');

  const handleToggleDone = onToggleComplete || onToggleCompleted;

  const toggleCheck = (key: string) => {
    setChecklist((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('tjam_checklist_proc_civil_aula01', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;

  return (
    <article className="p-5 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm space-y-8 leading-relaxed">
      {/* Cabeçalho da Aula */}
      <header className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>1ª Aula de Hoje</span>
              <span aria-hidden="true">·</span>
              <span>Quarta-feira • 18/11/2026</span>
              <span aria-hidden="true">·</span>
              <span>Concurso TJAM — Assistente Judiciário</span>
              <span aria-hidden="true">·</span>
              <span>Nível intermediário</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <Scale className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>1ª AULA — DIREITO PROCESSUAL CIVIL</span>
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">
              Tema: Princípios do Processo Civil
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
              Hoje vamos estudar um dos assuntos fundamentais do Direito Processual Civil: os princípios que orientam a aplicação da Justiça e garantem um processo justo.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {onNavigateTab && (
              <button
                type="button"
                onClick={() => onNavigateTab('questoes')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Ir para 20 Exercícios</span>
              </button>
            )}
            {handleToggleDone && (
              <button
                type="button"
                onClick={handleToggleDone}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border ${
                  isLessonCompleted
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? 'Aula Concluída' : 'Marcar como Concluída'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Videoaula Integrada */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-rose-600" />
              <span>Videoaula Oficial — Direito Processual Civil (Princípios do Processo Civil)</span>
            </span>
            <a
              href={procCivilAula1VideoInfo.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Assistir no YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <iframe
              src={procCivilAula1VideoInfo.videoUrl}
              title={procCivilAula1VideoInfo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Navegação rápida entre seções */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setActiveSubView('teoria')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeSubView === 'teoria'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Teoria Completa (1 a 6)
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('tabela')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeSubView === 'tabela'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Quadro de Revisão (12 Princípios)
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('cpc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeSubView === 'cpc'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            CPC Arts. 2º ao 11 & Planalto
          </button>
        </div>
      </header>

      {/* VISÃO 1: TEORIA COMPLETA */}
      {activeSubView === 'teoria' && (
        <div className="space-y-8">
          {/* 1. O que é Direito Processual Civil? */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Gavel className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>1. O que é Direito Processual Civil?</span>
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              O <strong>Direito Processual Civil</strong> é o ramo do Direito que estabelece as regras para resolver conflitos de interesses perante o Poder Judiciário.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Ele determina:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Como uma ação judicial começa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Como as partes devem participar do processo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Quais são os direitos e deveres das partes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Como o juiz deve conduzir o processo.</span>
                </li>
                <li className="flex items-start gap-2 sm:col-span-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Como as decisões judiciais são proferidas e cumpridas.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1.5">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Exemplo prático
              </p>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                Imagine que João emprestou <strong>R$ 5.000,00</strong> a Pedro, mas Pedro não devolveu o dinheiro. João pode procurar o Poder Judiciário para cobrar a dívida. O procedimento utilizado para resolver esse conflito é disciplinado pelo <strong>Direito Processual Civil</strong>.
              </p>
            </div>
          </section>

          {/* 2. O que são princípios processuais? */}
          <section className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600 shrink-0" />
              <span>2. O que são princípios processuais?</span>
            </h3>
            <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 space-y-2 text-sm text-slate-800 dark:text-slate-200">
              <p>
                São <strong>normas fundamentais</strong> que orientam a interpretação e a aplicação das regras do processo.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Os princípios garantem que o processo aconteça de maneira <strong>justa, organizada, equilibrada</strong> e respeitando os direitos das pessoas envolvidas.
              </p>
            </div>
          </section>

          {/* 3. Princípios fundamentais do Processo Civil (3.1 a 3.12) */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>3. Princípios fundamentais do Processo Civil</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 3.1 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.1 Princípio do devido processo legal
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CF, art. 5º, LIV
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Determina que ninguém poderá ser privado da liberdade ou de seus bens sem o devido processo legal. Exige respeito às regras, prazos, competência e garantias previstas em lei antes de qualquer restrição de direitos.
                </p>
              </div>

              {/* 3.2 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.2 Contraditório e Ampla Defesa
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CF, art. 5º, LV • CPC, 9º e 10
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Contraditório:</strong> direito de saber tudo o que acontece no processo e manifestar-se (vedada a decisão-surpresa, art. 10 do CPC). <strong>Ampla defesa:</strong> possibilidade de usar todos os meios legítimos (provas, alegações e recursos) para defender seus interesses.
                </p>
              </div>

              {/* 3.3 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.3 Inafastabilidade da Jurisdição
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CF, art. 5º, XXXV • CPC, 3º
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Também chamado de acesso à Justiça: não se excluirá da apreciação jurisdicional ameaça ou lesão a direito. Qualquer pessoa com direito violado ou ameaçado pode buscar proteção no Judiciário.
                </p>
              </div>

              {/* 3.4 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.4 Inércia e Impulso Oficial
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CPC, art. 2º
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Inércia:</strong> o processo começa por iniciativa da parte (o juiz não inicia processo civil de ofício). <strong>Impulso oficial:</strong> após iniciado, o processo desenvolve-se por impulso oficial do juiz, salvo exceções legais.
                </p>
              </div>

              {/* 3.5 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.5 Duração Razoável do Processo
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CF, 5º, LXXVIII • CPC, 4º
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  As partes têm direito de obter, em prazo razoável, a solução integral do mérito, incluída a atividade satisfativa — evitando demora injustificada e garantindo efetividade.
                </p>
              </div>

              {/* 3.6 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.6 Princípio da Boa-fé Processual
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CPC, art. 5º
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Aquele que de qualquer forma participa do processo (partes, advogados, juiz, MP e auxiliares) deve comportar-se de acordo com a boa-fé, com lealdade e honestidade, vedando manobras protelatórias.
                </p>
              </div>

              {/* 3.7 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.7 Princípio da Cooperação
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CPC, art. 6º
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Todos os sujeitos do processo devem cooperar entre si para que se obtenha, em tempo razoável, decisão de mérito justa e efetiva (deveres de esclarecimento, prevenção, consulta e auxílio).
                </p>
              </div>

              {/* 3.8 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.8 Isonomia (Igualdade Processual)
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CF, 5º • CPC, art. 7º
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Assegura às partes paridade de tratamento (paridade de armas) quanto ao exercício de direitos e faculdades processuais, meios de defesa, ônus, deveres e sanções, cabendo ao juiz zelar pelo efetivo contraditório.
                </p>
              </div>

              {/* 3.9 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.9 Publicidade dos Atos Processuais
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CF, 93, IX • CPC, art. 11
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Todos os julgamentos dos órgãos do Poder Judiciário são públicos em regra, permitindo controle social e transparência, salvo os casos legais de <strong>segredo de justiça</strong> (ex.: intimidade, família).
                </p>
              </div>

              {/* 3.10 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.10 Motivação das Decisões Judiciais
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    CF, 93, IX • CPC, art. 11
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Todas as decisões judiciais devem ser fundamentadas, <strong>sob pena de nulidade</strong>. Isso permite que as partes compreendam as razões do julgamento e possam recorrer adequadamente.
                </p>
              </div>

              {/* 3.11 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white">
                    3.11 Economia Processual
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                    Aproveitamento de atos
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Busca alcançar o máximo de resultado na atuação do Direito com o mínimo dispêndio de tempo, atos e custos processuais (ex.: aproveitamento de atos que atingiram sua finalidade).
                </p>
              </div>

              {/* 3.12 */}
              <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/30 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                    <Handshake className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>3.12 Solução Consensual dos Conflitos</span>
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                    CPC, art. 3º, §§ 1º–3º
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  O Estado promoverá, sempre que possível, a autocomposição. A <strong>conciliação e a mediação</strong> devem ser estimuladas por juízes, advogados, defensores públicos e MP, inclusive no curso do processo. Admite-se também a <strong>arbitragem</strong> na forma da lei.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1">
                <p className="font-extrabold">Pegadinha clássica em provas TJAM:</p>
                <p>
                  Não confunda <strong>inércia</strong> com <strong>impulso oficial</strong>: o juiz não começa o processo de ofício (inércia), mas uma vez provocado pela parte, conduz o andamento regular do feito (impulso oficial). E lembre: a boa-fé (art. 5º) vale para <strong>todos</strong> os participantes do processo, não apenas para autor e réu!
                </p>
              </div>
            </div>
          </section>

          {/* 4. Quadro Resumo Rápido na própria aba de Teoria */}
          <section className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600 shrink-0" />
                <span>4. Quadro de Revisão Rápida (12 Princípios)</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveSubView('tabela')}
                className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Ver quadro expandido</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Princípio</th>
                    <th className="p-3">Base Legal</th>
                    <th className="p-3">Síntese para Prova</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {PRINCIPLES_TABLE.map((row) => (
                    <tr key={row.num} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-black text-emerald-700 dark:text-emerald-400 whitespace-nowrap">{row.num}</td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-white">{row.name}</td>
                      <td className="p-3 font-semibold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">{row.base}</td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">{row.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Exercícios de Fixação & Checklist */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-600 shrink-0" />
              <span>5. Fixação do Conteúdo & Checklist de Estudo</span>
            </h3>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                  Marque os tópicos revisados nesta 1ª aula ({completedChecklistCount}/8 concluídos):
                </p>
                {onNavigateTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('questoes')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Resolver 20 Exercícios Agora</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  { key: 'conceito_dpc', label: '1. O que é Direito Processual Civil (Exemplo João e Pedro)' },
                  { key: 'principios_definicao', label: '2. O que são Princípios Processuais' },
                  { key: 'devido_contraditorio', label: '3.1–3.2 Devido Processo Legal, Contraditório e Ampla Defesa' },
                  { key: 'inafastabilidade_inercia', label: '3.3–3.4 Inafastabilidade, Inércia e Impulso Oficial' },
                  { key: 'duracao_boafe_cooperacao', label: '3.5–3.7 Duração Razoável, Boa-fé e Cooperação' },
                  { key: 'isonomia_publicidade_motivacao', label: '3.8–3.10 Isonomia, Publicidade e Motivação' },
                  { key: 'economia_autocomposicao', label: '3.11–3.12 Economia Processual e Solução Consensual' },
                  { key: 'fixacao_20q', label: '5. Resolução dos 20 Exercícios (10 MC, 6 V/F, 4 Discursivas)' },
                ].map((item) => {
                  const checked = !!checklist[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleCheck(item.key)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        checked
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-950 dark:text-emerald-200 font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          checked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 6. Encerramento & Próxima Aula */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>6. Encerramento & Legislação Oficial</span>
            </h3>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Legislação de Apoio (Lei nº 13.105/2015)
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Código de Processo Civil — texto compilado no Planalto
                  </p>
                </div>
                <a
                  href={procCivilAula1VideoInfo.planaltoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 text-white text-xs font-extrabold transition-colors flex items-center gap-1.5 w-fit shrink-0"
                >
                  <span>Abrir CPC no Planalto</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Depois de concluir os exercícios, seguiremos para a segunda aula de hoje: Direito Administrativo.
                </span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VISÃO 2: QUADRO DE REVISÃO */}
      {activeSubView === 'tabela' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Quadro Completo de Revisão — 12 Princípios do Processo Civil
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Consulte a base constitucional/legal e a síntese cobrada nas provas do TJAM.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase text-xs">
                <tr>
                  <th className="p-3.5">Item</th>
                  <th className="p-3.5">Princípio</th>
                  <th className="p-3.5">Previsão Legal</th>
                  <th className="p-3.5">Resumo Objetivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {PRINCIPLES_TABLE.map((row) => (
                  <tr key={row.num} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-black text-emerald-700 dark:text-emerald-400">{row.num}</td>
                    <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="p-3.5 font-semibold text-indigo-700 dark:text-indigo-300">{row.base}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{row.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISÃO 3: LEI SECA CPC ARTS. 2º AO 11 */}
      {activeSubView === 'cpc' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Normas Fundamentais do Processo Civil (CPC, Arts. 2º ao 11)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Leitura direta dos principais artigos cobrados sobre Princípios do Processo Civil.
              </p>
            </div>
            <a
              href={procCivilAula1VideoInfo.planaltoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors flex items-center gap-1.5 w-fit shrink-0"
            >
              <span>CPC Compilado no Planalto</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CPC_NORMAS_FUNDAMENTAIS.map((item) => (
              <div
                key={item.art}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-black">
                    {item.art}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-950 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
