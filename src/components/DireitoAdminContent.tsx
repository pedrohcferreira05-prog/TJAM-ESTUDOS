import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  Check,
  Building2,
  Clock,
  Lightbulb,
  ArrowRight,
  Video,
  ExternalLink,
  Layers,
  HelpCircle,
  BookOpen,
  Briefcase,
  CheckSquare,
  FileText,
} from 'lucide-react';
import { direitoAdminVideoInfo } from '../data/direitoAdminLessonData';

interface DireitoAdminContentProps {
  isDarkMode?: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted?: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  onToggleCompleted?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const DireitoAdminContent: React.FC<DireitoAdminContentProps> = ({
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted = false,
  handleMarkAsCompleted: propHandleMarkAsCompleted,
  onToggleComplete,
  onToggleCompleted,
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_direito_admin_aula01_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {
      conceito_da: false,
      sentidos_ap: false,
      desconcentracao: false,
      descentralizacao: false,
      centralizacao_concentracao: false,
      direta_indireta: false,
      quadro_macete: false,
      fixacao_20q: false,
    };
  });

  const [activeSubView, setActiveSubView] = useState<'teoria' | 'quadro' | 'consulta'>('teoria');

  const checklist = propChecklist && Object.keys(propChecklist).length > 5 ? propChecklist : internalChecklist;
  const toggleChecklist =
    propToggleChecklist && propChecklist && Object.keys(propChecklist).length > 5
      ? propToggleChecklist
      : (id: string) => {
          setInternalChecklist((prev) => {
            const updated = { ...prev, [id]: !prev[id] };
            try {
              localStorage.setItem('tjam_checklist_direito_admin_aula01_v2', JSON.stringify(updated));
            } catch {
              // ignore storage errors
            }
            return updated;
          });
        };

  const handleToggleDone = propHandleMarkAsCompleted || onToggleComplete || onToggleCompleted;
  const navigateTab = propSetActiveTab || onNavigateTab;

  const completedChecklistCount = [
    'conceito_da',
    'sentidos_ap',
    'desconcentracao',
    'descentralizacao',
    'centralizacao_concentracao',
    'direta_indireta',
    'quadro_macete',
    'fixacao_20q',
  ].filter((k) => Boolean(internalChecklist[k])).length;

  return (
    <article className="p-5 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm space-y-8 leading-relaxed">
      {/* Cabeçalho da Aula */}
      <header className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>2ª Aula de Hoje</span>
              <span aria-hidden="true">·</span>
              <span>Quarta-feira • 18/11/2026</span>
              <span aria-hidden="true">·</span>
              <span>Concurso TJAM — Assistente Judiciário</span>
              <span aria-hidden="true">·</span>
              <span>Nível intermediário</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <Scale className="w-7 h-7 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>1ª AULA — DIREITO ADMINISTRATIVO</span>
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">
              Tema 1: Organização Administrativa
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
              Hoje começamos Direito Administrativo seguindo a sequência do seu cronograma.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {navigateTab && (
              <button
                type="button"
                onClick={() => navigateTab('questoes')}
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
              <span>Videoaula Oficial — Direito Administrativo (Tema 1: Organização Administrativa)</span>
            </span>
            <a
              href={direitoAdminVideoInfo.externalUrl}
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
              src={direitoAdminVideoInfo.videoUrl}
              title={direitoAdminVideoInfo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Sub-navegação interna */}
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
            Teoria Completa (Seções 1 a 7)
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('quadro')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeSubView === 'quadro'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Quadro Comparativo &amp; Macete
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('consulta')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeSubView === 'consulta'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Material de Consulta Oficial
          </button>
        </div>
      </header>

      {/* VISÃO 1: TEORIA COMPLETA */}
      {activeSubView === 'teoria' && (
        <div className="space-y-8">
          {/* 1. O que é Direito Administrativo? */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
              <span>1. O que é Direito Administrativo?</span>
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É o ramo do <strong>Direito Público</strong> que estuda a organização, o funcionamento e a atuação da Administração Pública, bem como suas relações com os cidadãos.
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Seu objetivo é disciplinar a atividade administrativa do Estado e garantir que ela seja realizada de acordo com a <strong>lei</strong> e com o <strong>interesse público</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 space-y-1.5">
              <p className="text-xs font-black uppercase tracking-wider text-blue-800 dark:text-blue-300">
                Exemplo prático
              </p>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                Imagine que a <strong>Prefeitura de Manaus</strong> organize um concurso público, contrate servidores, construa escolas e fiscalize estabelecimentos comerciais. Todas essas atividades envolvem a Administração Pública e são estudadas pelo <strong>Direito Administrativo</strong>.
              </p>
            </div>
          </section>

          {/* 2. O que é Administração Pública? */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>2. O que é Administração Pública?</span>
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A Administração Pública é o conjunto de <strong>órgãos, entidades e agentes</strong> responsáveis por exercer atividades administrativas do Estado. Ela pode ser compreendida em dois sentidos:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-sky-200 dark:border-sky-800/50 bg-sky-50/70 dark:bg-sky-950/30 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300 block">
                  A) Sentido subjetivo, formal ou orgânico
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  Refere-se a <strong>quem exerce</strong> a atividade administrativa: órgãos, entidades e agentes públicos.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Exemplo:</strong> uma secretaria municipal.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/70 dark:bg-amber-950/30 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  B) Sentido objetivo, material ou funcional
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  Refere-se à <strong>própria atividade administrativa</strong> exercida pelo Estado.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Exemplo:</strong> prestar serviços públicos, fiscalizar e realizar atividades de interesse coletivo.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 space-y-1">
              <p className="font-black">Memorize para a prova:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Subjetivo</strong> = quem exerce.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Objetivo</strong> = o que é exercido.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Organização administrativa */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>3. Organização administrativa</span>
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É a maneira pela qual o Estado estrutura seus órgãos e entidades para desempenhar suas funções administrativas. A organização administrativa brasileira utiliza principalmente duas técnicas: <strong>Desconcentração</strong> e <strong>Descentralização</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 3.1 Desconcentração */}
              <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-blue-50/60 dark:bg-blue-950/25 space-y-2.5">
                <h4 className="text-sm font-black text-blue-950 dark:text-blue-200">
                  3.1 Desconcentração administrativa
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  É a <strong>distribuição interna de competências</strong> dentro da <strong>mesma pessoa jurídica</strong>. Ou seja, são criados órgãos para dividir e organizar as atividades administrativas.
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">Exemplo — Prefeitura (Município):</p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Secretaria de Saúde • Secretaria de Educação • Secretaria de Finanças • Secretaria de Administração. Todas fazem parte da mesma pessoa jurídica: o Município.
                  </p>
                </div>
                <p className="text-xs font-extrabold text-blue-900 dark:text-blue-300">
                  Característica principal: não há criação de uma nova pessoa jurídica.
                </p>
              </div>

              {/* 3.2 Descentralização */}
              <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/25 space-y-2.5">
                <h4 className="text-sm font-black text-emerald-950 dark:text-emerald-200">
                  3.2 Descentralização administrativa
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Ocorre quando o Estado <strong>transfere a execução de determinada atividade para outra pessoa</strong>, física ou jurídica, nos termos legais.
                </p>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-4">
                  <li>Criação de entidades da Administração Indireta.</li>
                  <li>Delegação da execução de serviços públicos a particulares.</li>
                </ul>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-slate-700 text-xs">
                  <p className="text-slate-700 dark:text-slate-200">
                    <strong>Exemplo:</strong> Uma empresa pública criada pelo Estado possui personalidade jurídica própria e integra a Administração Indireta.
                  </p>
                </div>
                <p className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
                  Característica principal: envolve mais de uma pessoa jurídica.
                </p>
              </div>

              {/* 3.3 Centralização */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <h4 className="text-sm font-black text-slate-950 dark:text-white">
                  3.3 Centralização administrativa
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Ocorre quando o próprio Estado executa suas atividades <strong>diretamente</strong>, por meio de seus órgãos e agentes.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Exemplo:</strong> uma secretaria estadual prestando diretamente um serviço público.
                </p>
              </div>

              {/* 3.4 Concentração */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
                <h4 className="text-sm font-black text-slate-950 dark:text-white">
                  3.4 Concentração administrativa
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Ocorre quando as competências administrativas ficam <strong>reunidas em poucos órgãos</strong>, sem distribuição interna entre diversas unidades.
                </p>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  É o conceito oposto à desconcentração.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Administração Direta e Indireta */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-600 shrink-0" />
              <span>4. Administração Direta e Indireta</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
                <h4 className="text-sm font-black text-slate-950 dark:text-white">
                  Administração Direta
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  É formada pelos entes federativos:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">União</div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">Estados</div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">Distrito Federal</div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">Municípios</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-950/25 space-y-3">
                <h4 className="text-sm font-black text-indigo-950 dark:text-indigo-200">
                  Administração Indireta
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  É formada por entidades com <strong>personalidade jurídica própria</strong>:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <li className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700">
                    <span className="font-bold">Autarquias</span>
                    <span className="text-indigo-700 dark:text-indigo-300 font-extrabold">Ex.: INSS</span>
                  </li>
                  <li className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700">
                    <span className="font-bold">Fundações públicas</span>
                    <span className="text-indigo-700 dark:text-indigo-300 font-extrabold">Ex.: IBGE</span>
                  </li>
                  <li className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700">
                    <span className="font-bold">Empresas públicas</span>
                    <span className="text-indigo-700 dark:text-indigo-300 font-extrabold">Ex.: Caixa Econômica Federal</span>
                  </li>
                  <li className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700">
                    <span className="font-bold">Sociedades de economia mista</span>
                    <span className="text-indigo-700 dark:text-indigo-300 font-extrabold">Ex.: Banco do Brasil</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Diferenças que costumam aparecer nas provas */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600 shrink-0" />
              <span>5. Diferenças que costumam aparecer nas provas</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-black uppercase text-xs">
                  <tr>
                    <th className="p-3.5">Desconcentração</th>
                    <th className="p-3.5">Descentralização</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-3.5 font-bold text-blue-800 dark:text-blue-300">Uma pessoa jurídica</td>
                    <td className="p-3.5 font-bold text-emerald-800 dark:text-emerald-300">Mais de uma pessoa jurídica</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Criação de órgãos</td>
                    <td className="p-3.5">Atuação de outra pessoa</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Distribuição interna</td>
                    <td className="p-3.5">Transferência de atividade</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold">Existe hierarquia</td>
                    <td className="p-3.5 font-semibold">Não existe hierarquia entre as pessoas jurídicas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 space-y-1.5">
              <p className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Macete para memorizar</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-sm font-black text-slate-950 dark:text-white">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/40">
                  DESCONCENTRAÇÃO = ÓRGÃOS
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/40">
                  DESCENTRALIZAÇÃO = ENTIDADES
                </div>
              </div>
            </div>
          </section>

          {/* 6. Fixação — 20 exercícios & Checklist */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-600 shrink-0" />
              <span>6. Fixação — 20 exercícios</span>
            </h3>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                  Checklist de revisão desta aula ({completedChecklistCount}/8 concluídos):
                </p>
                {navigateTab && (
                  <button
                    type="button"
                    onClick={() => navigateTab('questoes')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Resolver 20 Exercícios (Simulado TJAM)</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  { key: 'conceito_da', label: '1. O que é Direito Administrativo (Exemplo Prefeitura de Manaus)' },
                  { key: 'sentidos_ap', label: '2. Administração Pública: Sentido Subjetivo × Objetivo' },
                  { key: 'desconcentracao', label: '3.1 Desconcentração administrativa (órgãos na mesma PJ)' },
                  { key: 'descentralizacao', label: '3.2 Descentralização administrativa (mais de uma PJ)' },
                  { key: 'centralizacao_concentracao', label: '3.3–3.4 Centralização e Concentração administrativa' },
                  { key: 'direta_indireta', label: '4. Administração Direta e Indireta (INSS, IBGE, Caixa, BB)' },
                  { key: 'quadro_macete', label: '5. Tabela Comparativa & Macete (Órgãos × Entidades)' },
                  { key: 'fixacao_20q', label: '6. Resolução dos 20 Exercícios (1–10 MC, 11–16 V/F, 17–20 Disc.)' },
                ].map((item) => {
                  const checked = Boolean(checklist[item.key]);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleChecklist(item.key)}
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

          {/* 7. Material de consulta */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600 shrink-0" />
              <span>7. Material de consulta</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={direitoAdminVideoInfo.cfArt37Url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-blue-400 transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-400 block">
                    Legislação Federal
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Constituição Federal — artigo 37, Planalto
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" />
              </a>

              <a
                href={direitoAdminVideoInfo.pdfApoioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-emerald-400 transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-400 block">
                    Apostila Complementar (PDF)
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Material de apoio sobre organização administrativa
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600 shrink-0" />
              </a>
            </div>
          </section>
        </div>
      )}

      {/* VISÃO 2: QUADRO COMPARATIVO */}
      {activeSubView === 'quadro' && (
        <div className="space-y-6">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-black uppercase text-xs">
                <tr>
                  <th className="p-3.5">Desconcentração</th>
                  <th className="p-3.5">Descentralização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-3.5 font-bold text-blue-800 dark:text-blue-300">Uma pessoa jurídica</td>
                  <td className="p-3.5 font-bold text-emerald-800 dark:text-emerald-300">Mais de uma pessoa jurídica</td>
                </tr>
                <tr>
                  <td className="p-3.5">Criação de órgãos</td>
                  <td className="p-3.5">Atuação de outra pessoa</td>
                </tr>
                <tr>
                  <td className="p-3.5">Distribuição interna</td>
                  <td className="p-3.5">Transferência de atividade</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold">Existe hierarquia</td>
                  <td className="p-3.5 font-semibold">Não existe hierarquia entre as pessoas jurídicas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-black text-slate-950 dark:text-white">Administração Direta</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Entes federativos: <strong>União, Estados, Distrito Federal e Municípios</strong>.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-black text-slate-950 dark:text-white">Administração Indireta (PJ própria)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Autarquias</strong> (INSS), <strong>Fundações públicas</strong> (IBGE), <strong>Empresas públicas</strong> (Caixa Econômica Federal) e <strong>Sociedades de economia mista</strong> (Banco do Brasil).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 font-black text-sm text-slate-950 dark:text-white flex flex-wrap gap-4">
            <span>DESCONCENTRAÇÃO = ÓRGÃOS</span>
            <span aria-hidden="true">|</span>
            <span>DESCENTRALIZAÇÃO = ENTIDADES</span>
          </div>
        </div>
      )}

      {/* VISÃO 3: MATERIAL DE CONSULTA */}
      {activeSubView === 'consulta' && (
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">
            Material de consulta — Direito Administrativo (Tema 1)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={direitoAdminVideoInfo.cfArt37Url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-blue-400 transition-colors flex items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-blue-700 dark:text-blue-400 block">
                  Planalto Oficial
                </span>
                <span className="text-sm font-bold text-slate-950 dark:text-white block">
                  Constituição Federal — artigo 37, Planalto
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" />
            </a>

            <a
              href={direitoAdminVideoInfo.pdfApoioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-emerald-400 transition-colors flex items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400 block">
                  Material de Apoio (PDF)
                </span>
                <span className="text-sm font-bold text-slate-950 dark:text-white block">
                  Material de apoio sobre organização administrativa
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-600 shrink-0" />
            </a>
          </div>
        </div>
      )}

      {/* Rodapé com ação direta para exercícios */}
      {navigateTab && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
            Avance para o Simulado TJAM de fixação com 20 questões gabaritadas (1–10 Objetivas, 11–16 V/F e 17–20 Discursivas).
          </p>
          <button
            type="button"
            onClick={() => navigateTab('questoes')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ir para os 20 Exercícios</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </article>
  );
};
