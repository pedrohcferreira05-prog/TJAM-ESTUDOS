import React, { useState } from 'react';
import {
  Landmark,
  Scale,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  FileText,
  ShieldCheck,
  Video,
  Globe,
  Award,
  Send,
  ExternalLink,
  Info,
  CheckSquare,
  Users,
  Vote,
  HeartHandshake,
  Briefcase,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { direitoConstVideoPracticalTask } from '../data/direitoConstitucionalLessonData';

interface DireitoConstitucionalContentProps {
  isDarkMode?: boolean;
  isLessonCompleted: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const DireitoConstitucionalContent: React.FC<DireitoConstitucionalContentProps> = ({
  isLessonCompleted,
  onToggleCompleted,
  onNavigateTab,
}) => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_direito_const_aula01');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      cf88_intro: false,
      fundamentos_socidivapl: false,
      poder_povo: false,
      poderes_independentes: false,
      objetivos_congarerrpro: false,
      fundamentos_vs_objetivos: false,
      relacoes_internacionais: false,
      integracao_latina: false,
    };
  });

  const [activeTabSub, setActiveTabSub] = useState<'teoria' | 'tabela' | 'dominar' | 'pratica'>('teoria');
  const [expandedFaq, setExpandedFaq] = useState<Record<number, boolean>>({});
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const toggleCheck = (key: string) => {
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('tjam_checklist_direito_const_aula01', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const practicalTemplateText = `Nome: 
Turma: TJAM Assistente Judiciário
Disciplina: Direito Constitucional
Aula: 01 — Princípios Fundamentais

Conteúdo 1: Dignidade da Pessoa Humana (Art. 1º, III)
Significado: Reconhece a pessoa humana como elemento central e prioritário de proteção estatal e constitucional.
Aplicação na situação: Como servidor do Tribunal de Justiça atendendo um cidadão com dificuldade de compreensão, devo tratar a pessoa com total respeito, empatia e paciência, garantindo que ela não se sinta humilhada ou desamparada no órgão judiciário.

Conteúdo 2: Cidadania (Art. 1º, II) e Promover o bem de todos (Art. 3º, IV)
Significado: O pleno exercício dos direitos civis e políticos e a obrigação do Estado de prestar serviços sem discriminação ou entraves desnecessários.
Aplicação na situação: Orientar com clareza a linguagem jurídica, traduzindo termos técnicos para que o cidadão possa exercer seu direito de acesso à justiça de forma plena e consciente.`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(practicalTemplateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  return (
    <article className="p-4 sm:p-8 md:p-10 rounded-3xl border border-slate-200 bg-white text-slate-800 shadow-sm space-y-8 leading-relaxed transition-all">
      {/* 1. Header Oficial da Aula */}
      <section className="p-6 sm:p-8 rounded-3xl border bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border-amber-300 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" /> 2ª Aula de Hoje • Cronograma Reiniciado do Zero
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                ⚖️ Arts. 1º a 4º da CF/88
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-900 text-amber-300">
                Nível: Intermediário — TJAM Assistente Judiciário
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 flex items-center gap-2.5">
              <Scale className="w-8 h-8 text-amber-600 shrink-0" />
              <span>Direito Constitucional — Aula 01</span>
            </h2>
            <p className="text-sm font-bold text-slate-700">
              Princípios Fundamentais da Constituição Federal de 1988 (Fundamentos, Poderes, Objetivos e Relações Internacionais)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('questoes')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>20 Questões da Aula</span>
              </button>
            )}
            {onToggleCompleted && (
              <button
                onClick={onToggleCompleted}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLessonCompleted
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? 'Aula Concluída ✓' : 'Marcar como Concluída'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Vídeo Aula Incorporado */}
        <div className="mt-4 p-4 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-red-600" />
              <span>Vídeo Aula Oficial Recomendada para a Aula 01</span>
            </span>
            <a
              href="https://youtu.be/Z2vrJZSz-qc?is=jkFDMpU9S6eJisIX"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-extrabold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Abrir no YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
            <iframe
              src="https://www.youtube.com/embed/Z2vrJZSz-qc"
              title="Vídeo Aula Direito Constitucional Aula 01"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Sub-navegação interna */}
        <div className="flex gap-2 border-t border-amber-200/60 pt-4 flex-wrap">
          <button
            onClick={() => setActiveTabSub('teoria')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'teoria'
                ? 'bg-slate-950 text-amber-300 shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Teoria Completa (Arts. 1º a 4º)</span>
          </button>
          <button
            onClick={() => setActiveTabSub('tabela')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'tabela'
                ? 'bg-slate-950 text-amber-300 shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Tabela FGV/Cebraspe & Mnemônicos</span>
          </button>
          <button
            onClick={() => setActiveTabSub('dominar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'dominar'
                ? 'bg-slate-950 text-amber-300 shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. O que você precisa dominar (6 Perguntas)</span>
          </button>
          <button
            onClick={() => setActiveTabSub('pratica')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'pratica'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-emerald-600" />
            <span>4. Atividade Prática (WhatsApp TJAM)</span>
          </button>
        </div>

        {/* Checklist Interativo da Aula */}
        <div className="pt-3 border-t border-amber-200/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>Checklist de Metas de Domínio da Aula 01 (8 Tópicos Essenciais)</span>
            </span>
            <span className="text-[11px] font-bold text-amber-800">
              {Object.values(checklist).filter(Boolean).length}/8 concluídos
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { id: 'cf88_intro', label: '1. CF/88 & Norma Fundamental' },
              { id: 'fundamentos_socidivapl', label: '2. Art. 1º: SO-CI-DI-VA-PL' },
              { id: 'poder_povo', label: '3. Parágrafo Único Art. 1º (Poder)' },
              { id: 'poderes_independentes', label: '4. Art. 2º: 3 Poderes Harmônicos' },
              { id: 'objetivos_congarerrpro', label: '5. Art. 3º: CON-GAR-ERR-PRO' },
              { id: 'fundamentos_vs_objetivos', label: '6. Fundamentos × Objetivos' },
              { id: 'relacoes_internacionais', label: '7. Art. 4º: 10 Princípios' },
              { id: 'integracao_latina', label: '8. Art. 4º, P. Único (América Latina)' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-all border cursor-pointer ${
                  checklist[item.id]
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
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
      </section>

      {/* ABA 1: TEORIA COMPLETA */}
      {activeTabSub === 'teoria' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Introdução do Cronograma */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold">Orientações do Professor:</span> Nesta segunda aula de hoje, vamos iniciar Direito Constitucional do zero, porque o cronograma foi reiniciado. A base desta aula está principalmente nos <strong className="font-black">arts. 1º a 4º da Constituição Federal de 1988</strong>, que integram o <em>Título I — Dos Princípios Fundamentais</em>.
            </div>
          </div>

          {/* 1. Constituição Federal de 1988 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">1</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Constituição Federal de 1988</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              A <strong>Constituição da República Federativa do Brasil de 1988</strong> é a norma fundamental do Estado brasileiro. Ela estabelece, entre outros aspectos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span> Organização do Estado;
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span> Direitos e garantias fundamentais;
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span> Organização dos Poderes;
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span> Princípios fundamentais;
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span> Competências dos entes federativos;
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span> Funcionamento das instituições públicas.
              </div>
            </div>
            <p className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              🎯 Para esta primeira aula, nosso foco será rigorosamente nos <strong>arts. 1º a 4º</strong>.
            </p>
          </section>

          {/* 2. Artigo 1º — Fundamentos da República */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">2</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Artigo 1º — Fundamentos da República</h3>
            </div>
            <p className="text-sm text-slate-700">
              O Brasil constitui-se em <strong>Estado Democrático de Direito</strong>. O art. 1º apresenta <strong className="font-extrabold text-amber-700">cinco fundamentos</strong> expressos:
            </p>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>🇧🇷</span> <span>1. Soberania</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  É o poder do Estado brasileiro de se auto-organizar e exercer sua autoridade suprema dentro de seu território, sem submissão a outro Estado.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>👥</span> <span>2. Cidadania</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Relaciona-se à participação ativa do indivíduo na vida política e social do Estado e ao exercício de direitos e deveres civis.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>👤</span> <span>3. Dignidade da pessoa humana</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Reconhece a pessoa humana como elemento central e valor supremo de proteção constitucional em todas as esferas.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>💼</span> <span>4. Valores sociais do trabalho e da livre iniciativa</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  A Constituição harmoniza e valoriza tanto a proteção do trabalho humano quanto a liberdade de empreender e a iniciativa econômica.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>🗳️</span> <span>5. Pluralismo político</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Reconhece a existência, convivência pacífica e livre manifestação de diferentes ideias, crenças e posições políticas (não se confunde com mero pluripartidarismo).
                </p>
              </div>
            </div>

            {/* Mnemônico SO-CI-DI-VA-PL */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border-2 border-amber-400">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <span>🧠</span> <span>Para Memorizar o Art. 1º:</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-amber-950 tracking-wider mt-1">
                SO – CI – DI – VA – PL
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1 space-y-0.5">
                <div>• <strong className="text-amber-800">SO</strong>berania</div>
                <div>• <strong className="text-amber-800">CI</strong>dadania</div>
                <div>• <strong className="text-amber-800">DI</strong>gnidade da pessoa humana</div>
                <div>• <strong className="text-amber-800">VA</strong>lores sociais do trabalho e da livre iniciativa</div>
                <div>• <strong className="text-amber-800">PL</strong>uralismo político</div>
              </div>
            </div>
          </section>

          {/* 3. Todo poder emana do povo */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">3</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Todo poder emana do povo (Art. 1º, Parágrafo Único)</h3>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
              <blockquote className="text-sm sm:text-base font-extrabold italic text-amber-300">
                “Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição.”
              </blockquote>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              A Constituição prevê expressamente duas formas de exercício do poder (democracia semidireta ou participativa):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-extrabold text-blue-950 block text-sm">Por meio de representantes eleitos</span>
                <span className="text-blue-800">Ex.: vereadores, prefeitos, deputados, senadores, presidente (democracia indireta/representativa).</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-extrabold text-emerald-950 block text-sm">Diretamente, nos termos da CF</span>
                <span className="text-emerald-800">Ex.: plebiscito, referendo, iniciativa popular de lei e ação popular (art. 14 da CF).</span>
              </div>
            </div>
          </section>

          {/* 4. Artigo 2º — Os três Poderes */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">4</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Artigo 2º — Os três Poderes da União</h3>
            </div>
            <p className="text-sm text-slate-700">
              O art. 2º estabelece que são Poderes da União:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-extrabold text-sm text-slate-950 flex items-center gap-1.5 mb-1">
                  <span>🏛️</span> <span>Legislativo</span>
                </div>
                <p className="text-slate-600">
                  Responsável, em linhas gerais, pela função típica normativa (legislar) e pelo exercício da fiscalização contábil e política prevista constitucionalmente.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-extrabold text-sm text-slate-950 flex items-center gap-1.5 mb-1">
                  <span>🏛️</span> <span>Executivo</span>
                </div>
                <p className="text-slate-600">
                  Exerce, em linhas gerais, as funções típicas relacionadas à administração pública, chefia de Estado, chefia de governo e execução das leis.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-extrabold text-sm text-slate-950 flex items-center gap-1.5 mb-1">
                  <span>⚖️</span> <span>Judiciário</span>
                </div>
                <p className="text-slate-600">
                  Exerce a função típica jurisdicional, solucionando conflitos com definitividade e aplicando a ordem jurídica aos casos submetidos à sua apreciação.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs sm:text-sm text-amber-950 space-y-1.5">
              <div className="flex items-center gap-2 font-black text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>⚠️ ATENÇÃO MÁXIMA PARA PROVA (FGV & CEBRASPE):</span>
              </div>
              <p>
                A Constituição <strong>NÃO diz</strong> que os Poderes são subordinados uns aos outros. Ela estabelece expressamente que são:
              </p>
              <div className="p-2 rounded-lg bg-white border border-amber-300 font-black text-center text-slate-950">
                ➡️ “independentes e harmônicos entre si”
              </div>
            </div>
          </section>

          {/* 5. Artigo 3º — Objetivos fundamentais */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">5</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Artigo 3º — Objetivos Fundamentais</h3>
            </div>
            <p className="text-sm text-slate-700">
              Aqui existe uma diferença crucial de banca:
            </p>
            <div className="p-3 rounded-xl bg-slate-100 font-bold text-xs sm:text-sm text-slate-900">
              📌 <strong className="text-blue-700">Art. 1º = fundamentos</strong> (bases atuais) &nbsp;×&nbsp; 📌 <strong className="text-emerald-700">Art. 3º = objetivos fundamentais</strong> (metas futuras a alcançar).
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              A Constituição estabelece quatro objetivos essenciais:
            </p>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
                <span className="font-black text-emerald-900">I —</span>
                <div>
                  <strong className="font-extrabold text-emerald-950">Construir uma sociedade livre, justa e solidária</strong>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
                <span className="font-black text-emerald-900">II —</span>
                <div>
                  <strong className="font-extrabold text-emerald-950">Garantir o desenvolvimento nacional</strong>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
                <span className="font-black text-emerald-900">III —</span>
                <div>
                  <strong className="font-extrabold text-emerald-950">Erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais</strong>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
                <span className="font-black text-emerald-900">IV —</span>
                <div>
                  <strong className="font-extrabold text-emerald-950">Promover o bem de todos</strong>, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.
                </div>
              </div>
            </div>

            {/* Mnemônico CON-GAR-ERR-PRO */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-emerald-500/20 border-2 border-emerald-400">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <span>🧠</span> <span>Mnemônico dos Objetivos Fundamentais (Art. 3º):</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-950 tracking-wider mt-1">
                CON – GAR – ERR – PRO
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1 space-y-0.5">
                <div>• <strong className="text-emerald-800">CON</strong>struir sociedade livre, justa e solidária;</div>
                <div>• <strong className="text-emerald-800">GAR</strong>antir o desenvolvimento nacional;</div>
                <div>• <strong className="text-emerald-800">ERR</strong>adicar pobreza e marginalização + reduzir desigualdades;</div>
                <div>• <strong className="text-emerald-800">PRO</strong>mover o bem de todos.</div>
              </div>
            </div>
          </section>

          {/* 7. Artigo 4º — Relações internacionais */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">7</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Artigo 4º — Relações Internacionais</h3>
            </div>
            <p className="text-sm text-slate-700">
              O art. 4º apresenta os <strong>10 princípios</strong> que regem a República Federativa do Brasil em suas relações com outros países:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { n: 'I', t: 'Independência nacional' },
                { n: 'II', t: 'Prevalência dos direitos humanos' },
                { n: 'III', t: 'Autodeterminação dos povos' },
                { n: 'IV', t: 'Não intervenção' },
                { n: 'V', t: 'Igualdade entre os Estados' },
                { n: 'VI', t: 'Defesa da paz' },
                { n: 'VII', t: 'Solução pacífica dos conflitos' },
                { n: 'VIII', t: 'Repúdio ao terrorismo e ao racismo' },
                { n: 'IX', t: 'Cooperação entre os povos para o progresso da humanidade' },
                { n: 'X', t: 'Concessão de asilo político' },
              ].map(item => (
                <div key={item.n} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="font-extrabold text-amber-700">{item.n}.</span>
                  <span className="font-semibold text-slate-800">{item.t}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Atenção: Esses princípios pertencem ao art. 4º, portanto não devem ser confundidos com os fundamentos do art. 1º ou os objetivos do art. 3º!</span>
            </div>
          </section>

          {/* 8. Integração latino-americana */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">8</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Integração Latino-Americana (Art. 4º, Parágrafo Único)</h3>
            </div>
            <p className="text-sm text-slate-700">
              O parágrafo único do art. 4º estabelece que o Brasil buscará a integração em quatro áreas essenciais:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-black">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-950 border border-amber-300">
                Econômica
              </div>
              <div className="p-3 rounded-xl bg-blue-100 text-blue-950 border border-blue-300">
                Política
              </div>
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300">
                Social
              </div>
              <div className="p-3 rounded-xl bg-purple-100 text-purple-950 border border-purple-300">
                Cultural
              </div>
            </div>
            <p className="text-xs text-slate-600 font-medium italic text-center">
              “...dos povos da América Latina, visando à formação de uma comunidade latino-americana de nações.”
            </p>
          </section>

          {/* 9. Resumo para prova */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 border-b pb-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">9</span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Resumo de Memorização para Prova</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5">
                <span className="font-extrabold text-amber-400 block text-sm">📌 ART. 1º — FUNDAMENTOS</span>
                <p className="text-slate-300 leading-relaxed">
                  Soberania • Cidadania • Dignidade da pessoa humana • Valores sociais do trabalho e da livre iniciativa • Pluralismo político.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5">
                <span className="font-extrabold text-amber-400 block text-sm">📌 ART. 2º — PODERES</span>
                <p className="text-slate-300 leading-relaxed">
                  Legislativo + Executivo + Judiciário ➡️ <strong className="text-emerald-300">Independentes e harmônicos entre si</strong>.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5">
                <span className="font-extrabold text-amber-400 block text-sm">📌 ART. 3º — OBJETIVOS</span>
                <p className="text-slate-300 leading-relaxed">
                  Construir sociedade livre, justa e solidária • Garantir desenvolvimento nacional • Erradicar pobreza/marginalização e reduzir desigualdades • Promover o bem de todos.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5">
                <span className="font-extrabold text-amber-400 block text-sm">📌 ART. 4º — RELAÇÕES INTERNACIONAIS</span>
                <p className="text-slate-300 leading-relaxed">
                  Independência nacional, direitos humanos, autodeterminação, não intervenção, igualdade entre Estados, paz, solução pacífica, repúdio ao terrorismo/racismo, cooperação e asilo político.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ABA 2: TABELA COMPARATIVA & MNEMÔNICOS */}
      {activeTabSub === 'tabela' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm">
            <span className="font-black text-amber-900">Pegadinha Clássica de FGV e Cebraspe:</span> A banca adora trocar um fundamento (Art. 1º) por um objetivo (Art. 3º) ou princípio internacional (Art. 4º). Fique atento à regra de ouro: <strong>Fundamentos são substantivos</strong>; <strong>Objetivos começam por verbos no infinitivo</strong>!
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-white">
                  <th className="p-3.5 font-black border-r border-slate-800 w-1/2">
                    🏛️ Art. 1º — Fundamentos (SO-CI-DI-VA-PL)
                  </th>
                  <th className="p-3.5 font-black w-1/2">
                    🎯 Art. 3º — Objetivos Fundamentais (CON-GAR-ERR-PRO)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                    <strong>Soberania</strong> (autoridade do Estado no território)
                  </td>
                  <td className="p-3 font-semibold text-emerald-950 bg-emerald-50/50">
                    <strong>Construir</strong> uma sociedade livre, justa e solidária
                  </td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                    <strong>Cidadania</strong> (direitos e deveres na sociedade)
                  </td>
                  <td className="p-3 font-semibold text-emerald-950 bg-emerald-50/50">
                    <strong>Garantir</strong> o desenvolvimento nacional
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                    <strong>Dignidade da pessoa humana</strong> (valor supremo)
                  </td>
                  <td className="p-3 font-semibold text-emerald-950 bg-emerald-50/50">
                    <strong>Erradicar</strong> a pobreza e marginalização
                  </td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                    <strong>Valores sociais do trabalho e livre iniciativa</strong>
                  </td>
                  <td className="p-3 font-semibold text-emerald-950 bg-emerald-50/50">
                    <strong>Reduzir</strong> as desigualdades sociais e regionais
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                    <strong>Pluralismo político</strong> (liberdade de ideias)
                  </td>
                  <td className="p-3 font-semibold text-emerald-950 bg-emerald-50/50">
                    <strong>Promover</strong> o bem de todos (sem preconceitos)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 space-y-2">
              <span className="text-xs font-black text-amber-900 uppercase tracking-wider block">
                Regra Gramatical de Ouro
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Olhou para a alternativa e viu um <strong>verbo no infinitivo</strong> (Construir, Garantir, Erradicar, Reduzir, Promover)? Trata-se de um <strong>OBJETIVO FUNDAMENTAL (Art. 3º)</strong>. Viu um substantivo puro (Soberania, Cidadania, Dignidade)? Trata-se de um <strong>FUNDAMENTO (Art. 1º)</strong>!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-xs font-black text-blue-900 uppercase tracking-wider block">
                Art. 2º: Não há subordinação
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Se a questão afirmar que o Judiciário é subordinado ao Executivo ou vice-versa, a afirmação está <strong>ERRADA</strong>. Eles são <em>independentes e harmônicos entre si</em> através do mecanismo de freios e contrapesos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: O QUE VOCÊ PRECISA DOMINAR (6 PERGUNTAS-CHAVE) */}
      {activeTabSub === 'dominar' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1">
            <span className="text-xs font-black uppercase text-amber-400">Autoavaliação de Domínio — Aula 01</span>
            <h4 className="text-base sm:text-lg font-black">
              🎯 Ao terminar a aula, você deve conseguir responder sem consultar o material:
            </h4>
            <p className="text-xs text-slate-300">
              Clique em cada pergunta para conferir o gabarito mental e testar sua fixação:
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: 1,
                q: '1. Quais são os cinco fundamentos do art. 1º?',
                a: 'São cinco (SO-CI-DI-VA-PL): 1) Soberania; 2) Cidadania; 3) Dignidade da pessoa humana; 4) Valores sociais do trabalho e da livre iniciativa; 5) Pluralismo político.'
              },
              {
                id: 2,
                q: '2. Quais são os três Poderes da União?',
                a: 'São Poderes da União o Legislativo, o Executivo e o Judiciário (art. 2º).'
              },
              {
                id: 3,
                q: '3. O que significa dizer que os Poderes são independentes e harmônicos?',
                a: 'Significa que cada um possui atribuições constitucionais próprias e independência funcional, sem relação de subordinação hierárquica entre si, atuando em harmonia e equilíbrio recíproco (freios e contrapesos).'
              },
              {
                id: 4,
                q: '4. Quais são os quatro objetivos fundamentais do art. 3º?',
                a: 'São quatro (CON-GAR-ERR-PRO): I - Construir uma sociedade livre, justa e solidária; II - Garantir o desenvolvimento nacional; III - Erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; IV - Promover o bem de todos, sem preconceitos e discriminações.'
              },
              {
                id: 5,
                q: '5. Qual é a diferença entre fundamento e objetivo fundamental?',
                a: 'Fundamentos (art. 1º) são os pilares e valores básicos sobre os quais a República se sustenta no presente (substantivos). Objetivos fundamentais (art. 3º) são metas programáticas e diretrizes que o Estado deve buscar alcançar no futuro (verbos de ação no infinitivo).'
              },
              {
                id: 6,
                q: '6. Quais são os principais princípios do art. 4º?',
                a: 'Independência nacional, prevalência dos direitos humanos, autodeterminação dos povos, não intervenção, igualdade entre os Estados, defesa da paz, solução pacífica dos conflitos, repúdio ao terrorismo e ao racismo, cooperação entre os povos e concessão de asilo político.'
              }
            ].map(item => (
              <div key={item.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{item.q}</span>
                  {expandedFaq[item.id] ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {expandedFaq[item.id] && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 bg-amber-50/50 border-t border-slate-100 leading-relaxed font-medium">
                    <strong className="text-emerald-700 font-extrabold">Resposta esperada:</strong> {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA 4: ATIVIDADE PRÁTICA — WHATSAPP TJAM */}
      {activeTabSub === 'pratica' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white space-y-3 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <h4 className="text-lg sm:text-xl font-black">
                Atividade Prática de Fixação — Envio pelo WhatsApp ao Professor
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Não é uma questão de prova. Esta atividade serve para verificar se você consegue aplicar o conteúdo da aula em uma situação prática e concreta de trabalho judiciário.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-black text-amber-950 text-base">
              <span>🏛️</span> <span>Situação Concreta no Tribunal de Justiça:</span>
            </div>
            <p className="text-slate-800 leading-relaxed">
              Imagine que você seja um <strong>servidor do Tribunal de Justiça</strong> e esteja atendendo um cidadão. O cidadão chega ao setor para buscar uma informação sobre um serviço público. Durante o atendimento, você percebe que ele possui dificuldade para compreender os procedimentos e precisa de orientação.
            </p>
            <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1 text-xs">
              <span className="font-extrabold text-slate-900 block">Sua tarefa:</span>
              <p className="text-slate-700">
                Escolha <strong>DOIS</strong> dos conteúdos estudados na Aula 01 (ex.: Soberania, Cidadania, Dignidade da pessoa humana, Valores sociais do trabalho, Pluralismo político, Independência e harmonia entre os Poderes, Objetivo do art. 3º ou Princípio do art. 4º).
              </p>
              <ol className="list-decimal list-inside text-slate-700 space-y-0.5 pt-1">
                <li>Explique o que cada um significa;</li>
                <li>Relacione-o com a situação apresentada;</li>
                <li>Explique como esse princípio orienta a conduta do servidor público.</li>
              </ol>
            </div>
          </div>

          {/* Card com o Modelo para Enviar */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                <span>📲</span> Modelo Formatado para Enviar
              </span>
              <button
                onClick={handleCopyTemplate}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedTemplate ? 'Copiado para a Área de Transferência!' : 'Copiar Modelo Pronto'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 overflow-x-auto">
              {practicalTemplateText}
            </pre>

            <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-slate-400">
                Após preencher, envie no WhatsApp individual do professor.
              </span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(practicalTemplateText)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
