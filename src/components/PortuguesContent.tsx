import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Trophy,
  Layers,
  HelpCircle,
  FileText,
  FileCheck2,
  Bookmark,
  Scale,
  Brain,
  Play,
  ExternalLink,
  Target,
  CheckSquare
} from 'lucide-react';
import { TEXTO_APOIO_PORTUGUES_01 } from '../data/portuguesLessonData';

interface PortuguesContentProps {
  isDarkMode?: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  onToggleCompleted?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const PortuguesContent: React.FC<PortuguesContentProps> = ({
  isDarkMode,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted,
  handleMarkAsCompleted: propHandleMarkAsCompleted,
  onToggleComplete,
  onToggleCompleted,
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>({});

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  });
  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  const PORTUGUES_VIDEO_URL = 'https://youtu.be/ptbiYTNF_i4?is=9glRz1XeWpvLLHT6';
  const PORTUGUES_EMBED_URL = 'https://www.youtube.com/embed/ptbiYTNF_i4';

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* 1. Header Banner Oficial TJAM 2026 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white space-y-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5" />
            Língua Portuguesa • Aula 01 (Segunda-feira)
          </span>
          <span className="text-xs font-bold text-amber-100 bg-amber-900/30 px-3 py-1 rounded-full border border-amber-300/30">
            Nível Intermediário • TJAM Assistente Judiciário
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          📚 Compreensão e Interpretação de Textos
        </h1>

        <p className="text-xs sm:text-sm text-amber-50 leading-relaxed max-w-4xl">
          A primeira aula de Português do cronograma reiniciado começa pela leitura e interpretação, porque essa habilidade é fundamental para compreender corretamente enunciados, textos informativos, questões de prova e diferentes gêneros textuais. Estratégias de leitura envolvem identificar tema, ideia principal, informações explícitas e implícitas e realizar inferências legítimas a partir do contexto.
        </p>

        {/* Action buttons inside banner */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2.5 rounded-xl bg-white text-amber-900 hover:bg-amber-50 font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Brain className="w-4 h-4 text-amber-700" />
            <span>Resolver as 20 Questões Gabaritadas</span>
          </button>
          <a
            href={PORTUGUES_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-amber-300" />
            <span>Assistir Vídeo no YouTube</span>
            <ExternalLink className="w-3 h-3 text-amber-200" />
          </a>
          <button
            onClick={() => setActiveTab('flashcards')}
            className="px-4 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>10 Flashcards de Fixação</span>
          </button>
        </div>
      </div>

      {/* 2. Videoaula Incorporada Direta */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Play className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Videoaula Oficial de Segunda-feira
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compreensão e Interpretação de Textos • Foco TJAM 2026
              </p>
            </div>
          </div>
          <a
            href={PORTUGUES_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
          >
            <span>Abrir no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-inner">
          <iframe
            className="w-full h-full"
            src={PORTUGUES_EMBED_URL}
            title="Língua Portuguesa — Aula 01: Compreensão e Interpretação de Textos"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      {/* 3. Seção 1: O que é compreender um texto? */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black text-sm">
            1
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            O que é compreender um texto?
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Compreender é conseguir <strong>identificar com exatidão aquilo que o texto apresenta de modo visível</strong>. Trata-se da análise literal e fidedigna dos dados inscritos no corpo da mensagem.
        </p>

        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
          <p className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
            Durante a leitura preparatória para a prova do TJAM, procure responder:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Sobre o que o texto fala?</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Qual é o assunto principal?</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>O que o autor está informando?</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Quais informações estão claramente apresentadas?</span>
            </li>
            <li className="flex items-center gap-2 sm:col-span-2">
              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Como as ideias estão logicamente relacionadas entre si?</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <p className="font-bold text-slate-900 dark:text-white">
            📌 Marcadores de Compreensão nas Bancas FGV e Cebraspe:
          </p>
          <p>
            Enunciados que exigem compreensão costumam começar com: <em>"Segundo o texto..."</em>, <em>"O autor afirma expressamente que..."</em>, <em>"De acordo com o primeiro parágrafo..."</em> ou <em>"Constata-se no texto que..."</em>. Nesses casos, a resposta correta é uma <strong>paráfrase direta</strong> do que está escrito.
          </p>
        </div>
      </section>

      {/* 4. Seção 2: O que é interpretar um texto? */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 flex items-center justify-center font-black text-sm">
            2
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            O que é interpretar um texto?
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Interpretar vai além de apenas localizar a informação explícita: é a capacidade de <strong>inferir, deduzir e atribuir sentido</strong> a partir das pistas que o autor deixou ao longo do texto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-500" />
              Compreensão (Intelecção)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Análise dentro do texto. A informação está na superfície. O candidato atua como um leitor receptor exato.
            </p>
            <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
              "O texto diz que X é Y."
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-amber-500" />
              Interpretação (Inferência)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Dedução a partir do texto. Conclusões autorizadas pela lógica do contexto sem inventar dados externos.
            </p>
            <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-800">
              "Depreende-se do texto que..."
            </div>
          </div>
        </div>
      </section>

      {/* 5. Seção 3: Tema e Ideia Central */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black text-sm">
            3
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Tema vs. Ideia Principal (Tese do Autor)
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Um dos maiores motivos de erro em provas de tribunais é confundir o <strong>assunto geral (tema)</strong> com a <strong>tese específica defendida pelo autor (ideia central)</strong>.
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
            <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
              🎯 O que é o Tema?
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
              É a delimitação ampla do assunto. Responde à pergunta: <em>"De que trata o texto em geral?"</em> (Ex.: O acesso aos serviços públicos por meio digital).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-900/40">
            <p className="text-xs font-bold text-orange-900 dark:text-orange-300">
              💡 O que é a Ideia Principal (Tese)?
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
              É o núcleo argumentativo, o julgamento ou ponto de vista defendido pelo autor. Responde à pergunta: <em>"O que o autor defende em relação a esse tema?"</em> (Ex.: A tecnologia é positiva e necessária, porém não pode substituir o atendimento presencial sob pena de excluir cidadãos em vulnerabilidade socioeconômica).
            </p>
          </div>
        </div>
      </section>

      {/* 6. Seção 4: Informações Explícitas vs. Implícitas (Pressuposto e Subentendido) */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 flex items-center justify-center font-black text-sm">
            4
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Informações Explícitas vs. Implícitas: Pressupostos e Subentendidos
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          No TJAM, a banca testa se você reconhece mensagens nas entrelinhas sem inventar devaneios. Para isso, você deve dominar a distinção entre <strong>pressuposto</strong> e <strong>subentendido</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
              MARCA GRAMATICAL INEQUÍVOCA
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              O que é um Pressuposto?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ideia implícita que decorre diretamente de uma palavra ou expressão do texto (verbos de mudança, advérbios temporais como <em>"ainda"</em>, <em>"já"</em>, <em>"não mais"</em>). Não há como o leitor ou autor negar a sua existência sem romper a lógica da frase.
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
              <strong>Exemplo do texto:</strong> "...parte da população <em>ainda</em> encontre dificuldades". O advérbio "ainda" pressupõe que as dificuldades já existiam no passado e se mantêm no presente.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
              DEDUZIDO DO CONTEXTO SITUACIONAL
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              O que é um Subentendido?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ideia que depende da interpretação do contexto comunicativo e do conhecimento de mundo compartilhado. Não está ancorada em uma palavra específica, permitindo que o autor negue a intenção se questionado.
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
              <strong>Exemplo:</strong> "Está muito frio aqui dentro" (subentende-se o pedido para fechar a janela ou regular o ar-condicionado).
            </div>
          </div>
        </div>
      </section>

      {/* 7. Seção 5: Os 3 Erros Clássicos da FGV e Cebraspe */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center font-black text-sm">
            5
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Os 3 Erros Fatais na Resolução de Questões</span>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </h2>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400">
          As bancas de concurso não inventam alternativas erradas ao acaso; elas constroem distratores baseados em 3 mecanismos psicológicos de indução ao erro:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-200 text-rose-900 dark:bg-rose-900/60 dark:text-rose-200">
              Erro 1
            </span>
            <h4 className="text-sm font-extrabold text-rose-950 dark:text-rose-300">
              Extrapolação
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ocorre quando o candidato escolhe uma assertiva que acrescenta dados, causas ou consequências que NÃO foram citados no texto. Atenção: a afirmação pode até ser verdadeira no mundo real, mas se não está no texto, é ERRADA!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
              Erro 2
            </span>
            <h4 className="text-sm font-extrabold text-amber-950 dark:text-amber-300">
              Redução (Limitação)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ocorre quando a alternativa toma uma parte pelo todo. Ela destaca apenas um detalhe secundário ou exemplo pontual e o trata como se fosse a ideia central de todo o texto, desconsiderando o contexto mais amplo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-200 text-red-900 dark:bg-red-900/60 dark:text-red-200">
              Erro 3
            </span>
            <h4 className="text-sm font-extrabold text-red-950 dark:text-red-300">
              Contradição
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ocorre quando a assertiva afirma exatamente o inverso do que o autor declarou, ou estabelece uma relação de causa e efeito incompatível com os argumentos expostos pelo texto.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Seção 6: Texto de Apoio Oficial da Aula e Análise Linha a Linha */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white">
              Texto de Apoio Oficial da Aula 01
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Base para as 20 Questões
          </span>
        </div>

        <blockquote className="p-5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-xs sm:text-sm leading-relaxed italic font-serif">
          "{TEXTO_APOIO_PORTUGUES_01}"
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-amber-400 font-bold">1º Período</div>
            <p className="text-[11px] text-slate-300">
              Apresenta o contexto tecnológico e as vantagens práticas: desmaterialização de processos e comodidade.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-amber-400 font-bold">2º Período ("Entretanto")</div>
            <p className="text-[11px] text-slate-300">
              Introduz a oposição/ressalva indispensável: as desigualdades sociais mantêm a necessidade do balcão presencial.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-amber-400 font-bold">3º Período ("Dessa forma")</div>
            <p className="text-[11px] text-slate-300">
              Conclui com a tese conciliatória: ampliar canais de atendimento exige aliar investimento digital à inclusão física.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Seção 7: Checklist de Fixação da Aula 01 (6 Metas de Domínio) */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-500" />
            Checklist de Metas da Aula 01 (Segunda-feira)
          </h3>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
            6 Metas de Fixação
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'meta-pt-1', label: 'Compreender a diferença prática entre Intelecção (literal) e Inferência (dedução)' },
            { id: 'meta-pt-2', label: 'Dominar os 3 erros capitais das bancas: Extrapolação, Redução e Contradição' },
            { id: 'meta-pt-3', label: 'Identificar a distinção entre Tema amplo e Ideia Principal (Tese do autor)' },
            { id: 'meta-pt-4', label: 'Mapear Pressupostos através de marcadores linguísticos ("ainda", "deixou de")' },
            { id: 'meta-pt-5', label: 'Assistir à videoaula oficial do Prof. Nelson Sartori no YouTube' },
            { id: 'meta-pt-6', label: 'Resolver as 20 questões gabaritadas (10 Objetivas + 5 V/F + 5 Dissertativas)' },
          ].map((item) => {
            const isDone = !!checklist[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleChecklist(item.id)}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  isDone
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    isDone
                      ? 'bg-amber-600 border-amber-600 text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold leading-snug">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={() => handleMarkAsCompleted()}
            className={`px-5 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              isLessonCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLessonCompleted ? 'Aula Marcada como Concluída' : 'Marcar Aula 01 como Concluída'}</span>
          </button>

          <button
            onClick={() => setActiveTab('questoes')}
            className="px-5 py-3 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-md"
          >
            <span>Ir para as 20 Questões Gabaritadas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </article>
  );
};
