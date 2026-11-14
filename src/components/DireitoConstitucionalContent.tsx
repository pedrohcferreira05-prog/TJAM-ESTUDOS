import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  Check,
  AlertTriangle,
  BookOpen,
  Layers,
  HelpCircle,
  Video,
  Globe,
  ExternalLink,
  CheckSquare,
  Landmark,
  ShieldCheck,
  Target,
} from 'lucide-react';

interface DireitoConstitucionalContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleComplete?: () => void;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/dHTXl5s239M?autoplay=0&rel=0';
const YOUTUBE_DIRECT_URL = 'https://youtu.be/dHTXl5s239M?si=xE1Gl54Z9PYAbxUx';
const PLANALTO_CF88_URL = 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm';

export const DireitoConstitucionalContent: React.FC<DireitoConstitucionalContentProps> = ({
  isLessonCompleted = false,
  onToggleComplete,
  onToggleCompleted,
  onNavigateTab,
}) => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_direito_const_aula01');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {
      conceito_dc: false,
      art1_socidivaplu: false,
      art2_poderes: false,
      art3_objetivos: false,
      art4_relacoes: false,
      diferencas_artigos: false,
      leitura_cf88: false,
      fixacao_20q: false,
    };
  });

  const [activeSubView, setActiveSubView] = useState<'teoria' | 'tabela' | 'leitura'>('teoria');

  const handleToggleDone = onToggleComplete || onToggleCompleted;

  const toggleCheck = (key: string) => {
    setChecklist((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('tjam_checklist_direito_const_aula01', JSON.stringify(updated));
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
              <span>2ª Aula de Hoje</span>
              <span aria-hidden="true">·</span>
              <span>Preparatório TJAM — Assistente Judiciário</span>
              <span aria-hidden="true">·</span>
              <span>Nível intermediário</span>
              <span aria-hidden="true">·</span>
              <span>Aula 01</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <Scale className="w-7 h-7 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>AULA 1 — DIREITO CONSTITUCIONAL</span>
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">
              Tema: Princípios Fundamentais da Constituição Federal — Arts. 1º ao 4º
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
              Este é um dos conteúdos fundamentais do Direito Constitucional e merece atenção especial na preparação para concursos públicos.
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
              <span>Videoaula Oficial — Direito Constitucional (Aula 01: Arts. 1º ao 4º)</span>
            </span>
            <a
              href={YOUTUBE_DIRECT_URL}
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
              src={YOUTUBE_EMBED_URL}
              title="Videoaula Direito Constitucional — Princípios Fundamentais (Arts. 1º ao 4º)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Controles Segmentados da Aula */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveSubView('teoria')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeSubView === 'teoria'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Conteúdo Completo (1 a 8)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('tabela')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeSubView === 'tabela'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Quadro Comparativo (Arts. 1º–4º)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('leitura')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeSubView === 'leitura'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Leitura Obrigatória (CF/88)</span>
          </button>
        </div>

        {/* Checklist de Estudo */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>Checklist da Aula 01</span>
            </span>
            <span className="font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
              {completedChecklistCount}/8 concluídos
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { id: 'conceito_dc', label: '1. O que é Direito Constitucional' },
              { id: 'art1_socidivaplu', label: '2. Art. 1º — SO-CI-DI-VA-PLU' },
              { id: 'art2_poderes', label: '3. Art. 2º — Separação dos Poderes' },
              { id: 'art3_objetivos', label: '4. Art. 3º — Objetivos Fundamentais' },
              { id: 'art4_relacoes', label: '5. Art. 4º — Relações Internacionais' },
              { id: 'diferencas_artigos', label: '6. Diferenças Arts. 1º ao 4º' },
              { id: 'leitura_cf88', label: '7. Leitura dos Arts. 1º a 4º CF/88' },
              { id: 'fixacao_20q', label: '8. Fixação e 20 Exercícios' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-colors border cursor-pointer ${
                  checklist[item.id]
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-950 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                    checklist[item.id]
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {checklist[item.id] && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ABA 1: TEORIA COMPLETA (TÓPICOS 1 A 8) */}
      {activeSubView === 'teoria' && (
        <div className="space-y-8">
          {/* 1. O que é Direito Constitucional? */}
          <section className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              1. O que é Direito Constitucional?
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              É o ramo do <strong>Direito Público</strong> responsável pelo estudo da Constituição Federal, que estabelece:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700 dark:text-slate-200">
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                • A organização do Estado.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                • A estrutura dos Poderes.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                • Os direitos e garantias fundamentais.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                • Os deveres do Estado.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 sm:col-span-2">
                • Os princípios que orientam a República.
              </li>
            </ul>
            <p className="text-sm font-bold text-slate-900 dark:text-amber-200 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
              A Constituição Federal de 1988 é a lei fundamental e suprema do Brasil.
            </p>
          </section>

          {/* 2. Artigo 1º — Fundamentos da República Federativa do Brasil */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              2. Artigo 1º — Fundamentos da República Federativa do Brasil
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              O Brasil constitui-se em <strong>Estado Democrático de Direito</strong> e possui cinco fundamentos:
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5">
              <div className="text-xs font-bold text-amber-300">Mnemônico oficial de memorização</div>
              <div className="text-lg sm:text-xl font-black tracking-wide">
                Os cinco fundamentos — SO-CI-DI-VA-PLU
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-950 dark:text-white">• Soberania:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  poder do Estado de se organizar e tomar decisões sem submissão a outro Estado.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-950 dark:text-white">• Cidadania:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  participação do indivíduo na vida política e social.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-950 dark:text-white">• Dignidade da pessoa humana:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  respeito e proteção à dignidade de cada pessoa.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-950 dark:text-white">• Valores sociais do trabalho e da livre iniciativa:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  valorização do trabalho e da liberdade de atividade econômica.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-950 dark:text-white">• Pluralismo político:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  reconhecimento da diversidade de ideias e posições políticas.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Atenção para concursos:</strong> não confunda fundamentos da República com objetivos fundamentais.
              </span>
            </div>
          </section>

          {/* 3. Artigo 2º — Separação dos Poderes */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              3. Artigo 2º — Separação dos Poderes
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              São Poderes da União, <strong>independentes e harmônicos entre si</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-extrabold text-slate-950 dark:text-white">Legislativo</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  elabora leis e fiscaliza os atos públicos.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-extrabold text-slate-950 dark:text-white">Executivo</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  administra o Estado e executa as leis.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-extrabold text-slate-950 dark:text-white">Judiciário</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  exerce a função jurisdicional, solucionando conflitos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-950 dark:text-white">• Independentes:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  cada Poder exerce suas funções sem subordinação aos demais.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-950 dark:text-white">• Harmônicos:</strong>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  devem atuar em equilíbrio e colaboração para o funcionamento do Estado.
                </span>
              </div>
            </div>

            {/* Esquema Visual da Tripartição dos Poderes */}
            <figure className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="p-6 text-center space-y-4">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Esquema Visual — Art. 2º da CF/88: Poderes da União (Independentes e Harmônicos entre si)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Landmark className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">Legislativo</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Legisla e fiscaliza</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">Executivo</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Administra e executa</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Scale className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">Judiciário</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Julga e pacifica conflitos</div>
                  </div>
                </div>
              </div>
              <figcaption className="px-4 py-2.5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 text-center">
                Separação dos Poderes (Art. 2º, CF/88): Legislativo, Executivo e Judiciário independentes e harmônicos entre si.
              </figcaption>
            </figure>
          </section>

          {/* 4. Artigo 3º — Objetivos fundamentais */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              4. Artigo 3º — Objetivos fundamentais
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              São metas que o Estado brasileiro deve buscar alcançar:
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                <strong>I.</strong> Construir uma sociedade livre, justa e solidária.
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                <strong>II.</strong> Garantir o desenvolvimento nacional.
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                <strong>III.</strong> Erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais.
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                <strong>IV.</strong> Promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
              <strong>Dica de prova:</strong> os objetivos fundamentais costumam aparecer iniciando com verbos (construir, garantir, erradicar, promover).
            </div>
          </section>

          {/* 5. Artigo 4º — Relações Internacionais */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              5. Artigo 4º — Relações Internacionais
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              O Brasil rege-se, em suas relações internacionais, pelos seguintes princípios:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
              {[
                'Independência nacional',
                'Prevalência dos direitos humanos',
                'Autodeterminação dos povos',
                'Não intervenção',
                'Igualdade entre os Estados',
                'Defesa da paz',
                'Solução pacífica dos conflitos',
                'Repúdio ao terrorismo e ao racismo',
                'Cooperação entre os povos para o progresso da humanidade',
                'Concessão de asilo político',
              ].map((item, idx) => (
                <div
                  key={item}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2"
                >
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                    {idx + 1}.
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-blue-950 dark:text-blue-200 flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Parágrafo único (Art. 4º):</strong> O Brasil também buscará a integração econômica, política, social e cultural dos povos da América Latina.
              </span>
            </div>
          </section>

          {/* 6. Diferenças que você precisa memorizar */}
          <section className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              6. Diferenças que você precisa memorizar
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3.5 font-extrabold w-1/3">Artigo</th>
                    <th className="p-3.5 font-extrabold">Conteúdo principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="p-3.5 font-bold text-slate-950 dark:text-white">Art. 1º</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">Fundamentos da República</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-950">
                    <td className="p-3.5 font-bold text-slate-950 dark:text-white">Art. 2º</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">Poderes da União</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="p-3.5 font-bold text-slate-950 dark:text-white">Art. 3º</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">Objetivos fundamentais</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-950">
                    <td className="p-3.5 font-bold text-slate-950 dark:text-white">Art. 4º</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">Relações internacionais</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. Leitura obrigatória */}
          <section className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              7. Leitura obrigatória
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-950 dark:text-white">
                  Constituição Federal de 1988 — Ler os artigos 1º a 4º na íntegra
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Consultar diretamente a Constituição Federal consolida a literalidade cobrada em provas.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveSubView('leitura')}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer whitespace-nowrap"
                >
                  Ler Arts. 1º a 4º aqui
                </button>
                <a
                  href={PLANALTO_CF88_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Consultar Constituição Federal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* 8. Fixação da aula */}
          <section className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              8. Fixação da aula
            </h3>
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
              <p className="text-sm font-bold text-amber-300">Memorize antes de seguir:</p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                <li>1. Os cinco fundamentos do art. 1º (SO-CI-DI-VA-PLU).</li>
                <li>2. Os três Poderes do art. 2º e sua independência e harmonia.</li>
                <li>3. Os quatro objetivos fundamentais do art. 3º.</li>
                <li>4. Os princípios das relações internacionais do art. 4º.</li>
              </ul>
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <Target className="w-4 h-4" />
                    <span>Objetivo da aula: compreender a base constitucional do Estado brasileiro.</span>
                  </div>
                  <div className="text-slate-300">
                    Próxima etapa: lista de exercícios desta aula (20 questões com gabarito).
                  </div>
                </div>
                {onNavigateTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('questoes')}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Resolver 20 Exercícios
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ABA 2: QUADRO COMPARATIVO */}
      {activeSubView === 'tabela' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
            <strong>Regra de prova:</strong> Fundamentos (Art. 1º) são os pilares estruturais (substantivos: Soberania, Cidadania, Dignidade, Valores sociais, Pluralismo político). Objetivos fundamentais (Art. 3º) indicam metas futuras iniciadas por verbos (Construir, Garantir, Erradicar, Promover).
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-3.5 font-extrabold border-r border-slate-800 w-1/2">
                    Art. 1º — Fundamentos (SO-CI-DI-VA-PLU)
                  </th>
                  <th className="p-3.5 font-extrabold w-1/2">
                    Art. 3º — Objetivos Fundamentais (Verbos)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="bg-white dark:bg-slate-900">
                  <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                    <strong>Soberania</strong> (decisão sem submissão externa)
                  </td>
                  <td className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20">
                    <strong>Construir</strong> uma sociedade livre, justa e solidária
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-950">
                  <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                    <strong>Cidadania</strong> (participação política e social)
                  </td>
                  <td className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20">
                    <strong>Garantir</strong> o desenvolvimento nacional
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-900">
                  <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                    <strong>Dignidade da pessoa humana</strong> (respeito e proteção)
                  </td>
                  <td className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20">
                    <strong>Erradicar</strong> a pobreza e a marginalização e <strong>reduzir</strong> desigualdades sociais e regionais
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-950">
                  <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                    <strong>Valores sociais do trabalho e da livre iniciativa</strong>
                  </td>
                  <td className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20">
                    <strong>Promover</strong> o bem de todos, sem preconceitos e discriminações
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-900">
                  <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                    <strong>Pluralismo político</strong> (diversidade de ideias e posições)
                  </td>
                  <td className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-600 dark:text-slate-400">
                    Dica: todos os 4 incisos do Art. 3º iniciam por verbos no infinitivo.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ABA 3: LEITURA OBRIGATÓRIA — TEXTO CONSTITUCIONAL (ARTS. 1º A 4º) */}
      {activeSubView === 'leitura' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Constituição Federal de 1988 — Título I (Arts. 1º a 4º)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Texto integral para leitura obrigatória desta aula.
              </p>
            </div>
            <a
              href={PLANALTO_CF88_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Abrir texto oficial no Planalto</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="font-bold text-slate-950 dark:text-white">
                Art. 1º A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos:
              </p>
              <p>I - a soberania;</p>
              <p>II - a cidadania;</p>
              <p>III - a dignidade da pessoa humana;</p>
              <p>IV - os valores sociais do trabalho e da livre iniciativa;</p>
              <p>V - o pluralismo político.</p>
              <p className="pt-1 italic">
                Parágrafo único. Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <p className="font-bold text-slate-950 dark:text-white">
                Art. 2º São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="font-bold text-slate-950 dark:text-white">
                Art. 3º Constituem objetivos fundamentais da República Federativa do Brasil:
              </p>
              <p>I - construir uma sociedade livre, justa e solidária;</p>
              <p>II - garantir o desenvolvimento nacional;</p>
              <p>III - erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais;</p>
              <p>IV - promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <p className="font-bold text-slate-950 dark:text-white">
                Art. 4º A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios:
              </p>
              <p>I - independência nacional; II - prevalência dos direitos humanos; III - autodeterminação dos povos; IV - não-intervenção; V - igualdade entre os Estados; VI - defesa da paz; VII - solução pacífica dos conflitos; VIII - repúdio ao terrorismo e ao racismo; IX - cooperação entre os povos para o progresso da humanidade; X - concessão de asilo político.</p>
              <p className="pt-1 italic">
                Parágrafo único. A República Federativa do Brasil buscará a integração econômica, política, social e cultural dos povos da América Latina, visando à formação de uma comunidade latino-americana de nações.
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
