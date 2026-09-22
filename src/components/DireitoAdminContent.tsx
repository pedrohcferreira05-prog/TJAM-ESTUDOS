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
  Info,
  Users,
  Briefcase,
  BookOpen
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
  isDarkMode: _isDarkMode,
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
      const saved = localStorage.getItem('tjam_checklist_direito_admin_aula01');
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
      c8: false,
      c9: false,
      c10: false,
    };
  });

  const [activeTabSub, setActiveTabSub] = useState<'teoria' | 'quadro' | 'pratica'>('teoria');
  const [practicalResponse, setPracticalResponse] = useState(() => {
    try {
      return localStorage.getItem('tjam_pratica_direito_admin_aula01') || '';
    } catch (e) {
      return '';
    }
  });
  const [practicalSaved, setPracticalSaved] = useState(false);

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_checklist_direito_admin_aula01', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  });

  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  const videoUrl = "https://youtu.be/YsrcBEUgoGY?is=YThxXD7txF8BKAZ4";
  const embedUrl = "https://www.youtube.com/embed/YsrcBEUgoGY?rel=0";

  const handleSavePractical = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practicalResponse.trim()) return;
    try {
      localStorage.setItem('tjam_pratica_direito_admin_aula01', practicalResponse);
      setPracticalSaved(true);
      setTimeout(() => setPracticalSaved(false), 4000);
    } catch (e) {}
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Nome: Aluno TJAM 2026\nTurma: Assistente Judiciário\nDisciplina: Direito Administrativo\nAula: 01 — Organização Administrativa\nPrática: Descentralização × Desconcentração\n\nResposta:\n${practicalResponse || '(Preencha o campo de resposta antes de enviar)'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <article className="space-y-8 text-slate-800 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Top Banner da Aula */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-blue-500/30 text-white space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Scale className="w-3.5 h-3.5" /> 1ª Aula de Hoje (Terça-feira)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Nível Intermediário — TJAM Assistente Judiciário
            </span>
          </div>
          <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Duração estimada: 50 min
          </span>
        </div>

        <div className="relative z-10 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>⚖️ Direito Administrativo — Aula 01</span>
          </h1>
          <p className="text-lg font-bold text-amber-300">
            Organização Administrativa
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Nesta aula, vamos estudar como a Administração Pública é estruturada e distribuída, diferenciando Administração Direta e Indireta, além de compreender centralização, descentralização e desconcentração.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3 relative z-10">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Assistir no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Resolver as 20 Questões da Aula</span>
          </button>
        </div>
      </div>

      {/* Sub-navegação interna */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTabSub('teoria')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
            activeTabSub === 'teoria'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Teoria Completa (12 Tópicos)</span>
        </button>

        <button
          onClick={() => setActiveTabSub('quadro')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
            activeTabSub === 'quadro'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Quadro Comparativo & Macetes</span>
        </button>

        <button
          onClick={() => setActiveTabSub('pratica')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
            activeTabSub === 'pratica'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Situação Prática: “Você é Servidor”</span>
        </button>
      </div>

      {/* VIDEO PLAYER EMBED */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600 text-white">
              <Video className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-black text-white">Videoaula Oficial da Aula 01</h3>
              <p className="text-[11px] text-slate-400">Organização Administrativa • Prof. Especialista</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-slate-950">
            Obrigatória para conclusão
          </span>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
          <iframe
            src={embedUrl}
            title="Direito Administrativo - Aula 01 - Organização Administrativa"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* CONTEÚDO DA TEORIA COMPLETA */}
      {activeTabSub === 'teoria' && (
        <div className="space-y-8">
          {/* Seção 1: O que é Administração Pública */}
          <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-sm">01</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                1. O que é Administração Pública?
              </h2>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              A expressão <strong>Administração Pública</strong> pode ser compreendida em dois sentidos fundamentais que são exaustivamente cobrados pela FGV e pelo Cebraspe:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-sky-600 text-white inline-block">
                  Sentido Subjetivo / Orgânico / Formal
                </span>
                <p className="text-xs font-extrabold text-sky-950">
                  Refere-se a QUEM exerce a atividade administrativa.
                </p>
                <p className="text-xs text-slate-600">
                  Abrange os sujeitos, órgãos e entidades que compõem o aparelho do Estado:
                </p>
                <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                  <li>União, Estados, DF e Municípios;</li>
                  <li>Autarquias e Fundações Públicas;</li>
                  <li>Empresas Públicas e Sociedades de Economia Mista.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-600 text-white inline-block">
                  Sentido Objetivo / Material / Funcional
                </span>
                <p className="text-xs font-extrabold text-amber-950">
                  Refere-se à ATIVIDADE administrativa exercida pelo Estado.
                </p>
                <p className="text-xs text-slate-600">
                  Representa o objeto e a função estatal desempenhada:
                </p>
                <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                  <li>Prestação de serviços públicos essenciais;</li>
                  <li>Exercício do poder de polícia e fiscalização;</li>
                  <li>Organização administrativa e gestão de bens;</li>
                  <li>Execução concreta de políticas públicas e fomento.</li>
                </ul>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
              <Target className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950">
                <strong className="font-extrabold text-emerald-800">🎯 Regra de Ouro para a Prova:</strong><br />
                <strong>Subjetivo</strong> = QUEM administra (os sujeitos e aparelhos).<br />
                <strong>Objetivo</strong> = O QUE é feito pela Administração (as atividades).
              </div>
            </div>
          </section>

          {/* Seção 2: Organização Administrativa */}
          <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-sm">02</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                2. Organização Administrativa
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              A organização administrativa trata da maneira como o Estado distribui e estrutura suas atividades e competências. Para entender esse assunto com precisão no TJAM, precisamos dominar e diferenciar com clareza:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200">
                1. Administração Direta
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200">
                2. Administração Indireta
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200">
                3. Centralização
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200">
                4. Descentralização
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200">
                5. Desconcentração
              </span>
            </div>
          </section>

          {/* Seção 3: Administração Direta */}
          <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-sm">03</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                3. Administração Direta
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              A <strong>Administração Direta</strong> é formada pelos próprios entes federativos políticos, dotados de autonomia política e personalidade jurídica de direito público:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-black text-xs text-slate-800">
                🏛️ União
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-black text-xs text-slate-800">
                🌳 Estados (ex: Amazonas)
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-black text-xs text-slate-800">
                🏛️ Distrito Federal
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-black text-xs text-slate-800">
                🏢 Municípios (ex: Manaus)
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Esses entes exercem suas funções administrativas por meio de seus <strong>órgãos públicos</strong> internos. O órgão <strong>não possui personalidade jurídica própria</strong>; ele integra a estrutura de uma pessoa jurídica.
            </p>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <strong className="font-black text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Atenção — Não Confunda:
              </strong>
              <p>• <strong>Estado do Amazonas</strong> → pessoa jurídica (ente federativo).</p>
              <p>• <strong>Secretaria Estadual / TJAM</strong> → órgão da Administração Direta (despersonalizado).</p>
            </div>
          </section>

          {/* Seção 4: Administração Indireta */}
          <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-sm">04</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                4. Administração Indireta
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              A <strong>Administração Indireta</strong> é formada por entidades que <strong>possuem personalidade jurídica própria</strong> e são criadas ou autorizadas na forma prevista pela Constituição e pelas leis específicas. As 4 principais categorias são:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                  <span>🏛️ Autarquias</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Pessoas jurídicas de <strong>direito público</strong>, criadas diretamente por lei, destinadas ao desempenho de atividades administrativas típicas de Estado (fiscalização, regulação, previdência).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                  <span>🏢 Fundações Públicas</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Entidades destinadas ao desempenho de atividades sem fins lucrativos e de interesse social (educação, pesquisa, cultura, saúde, assistência social).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                  <span>🏭 Empresas Públicas</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Personalidade jurídica de <strong>direito privado</strong>, autorizadas por lei, cujo capital social é <strong>100% público</strong> (ex: Caixa Econômica, Correios).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <span>🏢 Sociedades de Economia Mista</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Personalidade jurídica de <strong>direito privado</strong>, autorizadas por lei, capital formado por participação <strong>pública e privada</strong>, com controle acionário do Poder Público (ex: Banco do Brasil, Petrobras).
                </p>
              </div>
            </div>
          </section>

          {/* Seção 6, 7 e 8: Centralização, Descentralização e Desconcentração */}
          <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-sm">05 a 08</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                Centralização, Descentralização e Desconcentração
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black uppercase text-slate-700 block">
                  6. Centralização
                </span>
                <p className="text-xs text-slate-700">
                  Existe centralização quando o <strong>próprio ente estatal</strong> executa determinada atividade administrativa por meio de seus próprios órgãos e agentes.
                </p>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-800">
                  Centralização → o próprio ente realiza a atividade.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-xs font-black uppercase text-emerald-800 block">
                  7. Descentralização
                </span>
                <p className="text-xs text-slate-700">
                  A atividade administrativa é atribuída a <strong>OUTRA pessoa</strong> (física ou jurídica). Há mais de uma pessoa jurídica envolvida (ex: Estado atribui serviço a uma autarquia).
                </p>
                <div className="p-2 rounded-lg bg-white border border-emerald-300 text-[11px] font-black text-emerald-900">
                  🎯 Palavra-chave: Descentralização = OUTRA pessoa.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <span className="text-xs font-black uppercase text-blue-800 block">
                  8. Desconcentração
                </span>
                <p className="text-xs text-slate-700">
                  Distribuição <strong>interna</strong> de competências dentro da <strong>MESMA pessoa jurídica</strong>, criando ou organizando órgãos (ex: Estado distribui tarefas entre suas secretarias).
                </p>
                <div className="p-2 rounded-lg bg-white border border-blue-300 text-[11px] font-black text-blue-900">
                  🎯 Palavra-chave: Desconcentração = MESMA pessoa jurídica + divisão interna.
                </div>
              </div>
            </div>
          </section>

          {/* Seção 9: Quadro Comparativo & Macete */}
          <section className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-900">
              <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm">09</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                9. Descentralização × Desconcentração
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-900 text-white font-black">
                    <th className="p-3 rounded-tl-xl">Critério</th>
                    <th className="p-3">Descentralização</th>
                    <th className="p-3 rounded-tr-xl">Desconcentração</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-3 font-extrabold text-slate-800">Pessoas Jurídicas</td>
                    <td className="p-3 text-emerald-700 font-bold">Envolve pessoas distintas (mais de uma PJ)</td>
                    <td className="p-3 text-blue-700 font-bold">Ocorre dentro da mesma pessoa jurídica</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-extrabold text-slate-800">Atribuição</td>
                    <td className="p-3 text-slate-700">Transfere/atribui atividade a outra pessoa</td>
                    <td className="p-3 text-slate-700">Distribui competências internamente</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-extrabold text-slate-800">Estrutura Gerada</td>
                    <td className="p-3 text-slate-700">Pode envolver entidade da Administração Indireta</td>
                    <td className="p-3 text-slate-700">Envolve ÓRGÃOS públicos</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-extrabold text-slate-800">Criação de PJ</td>
                    <td className="p-3 text-slate-700">Sim, há pessoas jurídicas autônomas</td>
                    <td className="p-3 text-slate-700 font-bold">NÃO cria nova pessoa jurídica</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-sm uppercase">
                <Lightbulb className="w-4 h-4" /> Macete Infalível do Professor:
              </div>
              <p>• <strong>DESCENTRALIZAÇÃO</strong> → CENTRO → sai para <strong>OUTRA pessoa</strong>.</p>
              <p>• <strong>DESCONCENTRAÇÃO</strong> → CONCENTRAÇÃO interna → divide competências dentro da <strong>mesma estrutura (órgãos)</strong>.</p>
            </div>
          </section>

          {/* Seção 10: Exemplo Aplicado ao TJAM */}
          <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-sm">10</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                10. Exemplo Prático Aplicado ao TJAM
              </h2>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <p>
                Imagine a seguinte situação prática:
              </p>
              <p>
                O <strong>Estado do Amazonas</strong> possui diversos órgãos dentro de sua estrutura administrativa (ex: secretarias, gabinetes, o próprio Tribunal de Justiça na função judiciária/administrativa). A distribuição de competências entre esses órgãos ocorre dentro da mesma pessoa jurídica estatal:
              </p>
              <p className="font-extrabold text-blue-700 text-sm">
                ➡️ Desconcentração.
              </p>
              <p>
                Agora imagine que determinada atividade administrativa seja atribuída a uma entidade dotada de personalidade jurídica própria (ex: criação do Detran-AM ou de uma fundação de saúde):
              </p>
              <p className="font-extrabold text-emerald-700 text-sm">
                ➡️ Descentralização.
              </p>
              <p className="text-slate-500 italic">
                Esse raciocínio ajuda a resolver as questões da FGV que apresentam situações práticas em vez de simplesmente perguntarem conceitos secos.
              </p>
            </div>
          </section>

          {/* Seção 11 e 12: Órgão x Entidade e Resumo */}
          <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-sm">11 e 12</span>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                Órgão Público × Entidade & Resumo para Memorizar
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                <h4 className="font-black text-xs text-rose-950 uppercase">Órgão Público</h4>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• É uma unidade integrante da estrutura administrativa.</li>
                  <li>• <strong>NÃO possui personalidade jurídica própria.</strong></li>
                  <li>• Seus atos são imputados à pessoa jurídica que integra.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <h4 className="font-black text-xs text-emerald-950 uppercase">Entidade Administrativa</h4>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• <strong>POSSUI personalidade jurídica própria.</strong></li>
                  <li>• Exemplos: autarquias, fundações públicas, empresas públicas e sociedades de economia mista.</li>
                  <li>• Responde judicialmente e tem patrimônio próprio.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
              <h4 className="font-black text-amber-400 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Resumo Oficial para Memorizar:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <p>• <strong>Administração Direta:</strong> União + Estados + DF + Municípios</p>
                <p>• <strong>Administração Indireta:</strong> Autarquias + Fundações + Empresas Públicas + SEM</p>
                <p>• <strong>Centralização:</strong> O próprio ente executa diretamente.</p>
                <p>• <strong>Descentralização:</strong> Outra pessoa física/jurídica assume a execução.</p>
                <p>• <strong>Desconcentração:</strong> Distribuição interna de competências (órgãos).</p>
                <p>• <strong>Órgão:</strong> Não possui personalidade jurídica própria.</p>
              </div>
            </div>
          </section>

          {/* 🎯 O que você precisa dominar */}
          <section className="p-6 rounded-3xl bg-emerald-950 text-white space-y-4 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-black text-white">
                🎯 O que você precisa dominar nesta Aula 01 (Checklist de Competências):
              </h3>
            </div>
            <p className="text-xs text-emerald-200">
              Marque os itens conforme for dominando para garantir 100% de aproveitamento na prova do TJAM:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { id: 'c1', label: '1. Diferenciar Administração Direta e Indireta' },
                { id: 'c2', label: '2. Identificar os entes da Administração Direta' },
                { id: 'c3', label: '3. Reconhecer as entidades da Administração Indireta' },
                { id: 'c4', label: '4. Diferenciar órgão de entidade' },
                { id: 'c5', label: '5. Explicar centralização' },
                { id: 'c6', label: '6. Explicar descentralização' },
                { id: 'c7', label: '7. Explicar desconcentração' },
                { id: 'c8', label: '8. Diferenciar descentralização de desconcentração' },
                { id: 'c9', label: '9. Aplicar esses conceitos a situações práticas da Administração Pública' },
                { id: 'c10', label: '10. Identificar possíveis pegadinhas em questões de concurso' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    checklist[item.id]
                      ? 'bg-emerald-800/80 border-emerald-400 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                    checklist[item.id] ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                  }`}>
                    {checklist[item.id] && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* CONTEÚDO DA ABA QUADRO COMPARATIVO */}
      {activeTabSub === 'quadro' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Quadro Comparativo: Administração Direta × Indireta</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-600 text-white uppercase">
                  Administração Direta
                </span>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span><strong>União</strong>, <strong>Estados</strong>, <strong>Distrito Federal</strong> e <strong>Municípios</strong>.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Possuem autonomia política, legislativa e financeira.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Atuam por meio de seus próprios órgãos internos despersonalizados.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white uppercase">
                  Administração Indireta
                </span>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>Autarquias</strong> (criadas por lei, direito público).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>Fundações Públicas</strong> (atividades sociais/culturais).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>Empresas Públicas</strong> (direito privado, capital 100% público).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span><strong>Sociedades de Economia Mista</strong> (capital público + privado, controle estatal).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA PRÁTICA: "VOCÊ É SERVIDOR PÚBLICO" */}
      {activeTabSub === 'pratica' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                  <Briefcase className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    🏛️ Situação Prática: “Você é Servidor Público”
                  </h3>
                  <p className="text-xs text-slate-400">Aplicação no Cotidiano da Administração Pública</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Fixação Real
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              <p className="font-extrabold text-amber-300 text-sm">Cenário Apresentado pelo Superior:</p>
              <p>Imagine que você trabalha como servidor em um órgão público do TJAM. Seu superior apresenta as seguintes situações:</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-slate-200">
                <p>• <strong>Situação A:</strong> Uma secretaria divide suas atribuições entre vários departamentos.</p>
                <p>• <strong>Situação B:</strong> Determinada atividade administrativa passa a ser executada por uma entidade com personalidade jurídica própria.</p>
              </div>
              <div className="pt-2 text-amber-200">
                <strong>Sua tarefa:</strong> Explique qual situação representa desconcentração, qual representa descentralização, a principal diferença entre elas e dê um exemplo próprio de cada uma (texto de até 10 linhas).
              </div>
            </div>

            <form onSubmit={handleSavePractical} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Sua Resposta Técnica (até 10 linhas):
                </label>
                <textarea
                  rows={6}
                  value={practicalResponse}
                  onChange={(e) => setPracticalResponse(e.target.value)}
                  placeholder="Ex: A Situação A representa a desconcentração administrativa, pois a secretaria distribui competências internamente em departamentos dentro da mesma pessoa jurídica... A Situação B representa a descentralização, porque a atividade foi transferida para uma entidade com personalidade jurídica própria..."
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition resize-none leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Salvar Resposta no Sistema</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar pelo WhatsApp para o Professor</span>
                </button>
              </div>

              {practicalSaved && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Resposta prática salva com sucesso no seu histórico de estudos!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Botões de Ação no Fim da Aula */}
      <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-black">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900">Teoria Concluída?</h4>
            <p className="text-[11px] text-slate-500">Avance para as 20 questões objetivas e dissertativas</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('questoes')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Ir para as 20 Questões da Aula</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
