import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
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
  Send,
  Building2,
  ScrollText,
  Mail,
  Table,
  CheckSquare
} from 'lucide-react';
import { portuguesAula2PracticalTask } from '../data/portuguesAula2LessonData';

interface PortuguesAula2ContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const PortuguesAula2Content: React.FC<PortuguesAula2ContentProps> = ({
  isDarkMode: _isDarkMode = false,
  isLessonCompleted = false,
  onToggleCompleted,
  onNavigateTab,
}) => {
  // Checklist interativo de leitura dos tópicos
  const [readTopics, setReadTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_portugues_aula2_read_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTopic = (id: string) => {
    setReadTopics((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_portugues_aula2_read_topics', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // State da Atividade Prática (3 textos)
  const [practicalAnswers, setPracticalAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('tjam_portugues_aula2_practical_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [showPracticalAnswers, setShowPracticalAnswers] = useState(false);

  const handlePracticalChange = (qNum: number, text: string) => {
    setPracticalAnswers((prev) => {
      const updated = { ...prev, [qNum]: text };
      try {
        localStorage.setItem('tjam_portugues_aula2_practical_answers', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Mini Simulador Interativo: Tipologia ou Gênero?
  const [quizSelections, setQuizSelections] = useState<Record<string, string>>({});

  const quizCases = [
    {
      id: 'c1',
      trecho: '“O candidato aprovado deverá apresentar cópia do diploma autenticada no prazo improrrogável de cinco dias úteis.”',
      pergunta: 'Qual é o tipo textual e o gênero textual predominantes?',
      opcoes: [
        { id: 'A', text: 'Tipo: Narrativo • Gênero: Ata', isCorreta: false, feedback: 'Incorreto. Não há sucessão de acontecimentos narrados nem registro de reunião.' },
        { id: 'B', text: 'Tipo: Injuntivo/Normativo • Gênero: Edital', isCorreta: true, feedback: 'Correto! Prescreve uma obrigação de prazo (deverá apresentar) em documento de regras de concurso (Edital).' },
        { id: 'C', text: 'Tipo: Descritivo • Gênero: Reportagem', isCorreta: false, feedback: 'Incorreto. O foco é uma determinação formal, não características físicas.' },
      ]
    },
    {
      id: 'c2',
      trecho: '“Às 14h30, o MM. Juiz abriu a audiência de instrução e ouviu o depoimento das duas testemunhas arroladas pelo autor.”',
      pergunta: 'Qual tipologia textual organiza esse registro?',
      opcoes: [
        { id: 'A', text: 'Narração (relato sucessivo de acontecimentos cronológicos)', isCorreta: true, feedback: 'Correto! Tempo delimitado (14h30), personagens (juiz e testemunhas) e verbos de ação sucessiva (abriu → ouviu).' },
        { id: 'B', text: 'Argumentação (defesa de ponto de vista com tese)', isCorreta: false, feedback: 'Incorreto. É um mero relato de fatos sem defesa de tese ou convencimento.' },
        { id: 'C', text: 'Injunção (manual de instruções para o leitor)', isCorreta: false, feedback: 'Incorreto. Não há prescrição ou ordem para o interlocutor.' },
      ]
    },
    {
      id: 'c3',
      trecho: '“A implementação do balcão virtual aproximou os jurisdicionados do interior, porém sua eficácia plena requer melhor infraestrutura de conectividade na Amazônia.”',
      pergunta: 'Identifique o tipo e a função desse trecho:',
      opcoes: [
        { id: 'A', text: 'Exposição pura sem qualquer posicionamento', isCorreta: false, feedback: 'Incorreto. Há emissão de juízo de valor e ponto de vista sustentado pelo conectivo adversativo.' },
        { id: 'B', text: 'Argumentação (tese sobre serviços digitais com ressalva justificada)', isCorreta: true, feedback: 'Correto! Apresenta posicionamento com juízo de valor sobre o que é necessário para a eficácia plena.' },
        { id: 'C', text: 'Descrição de mobília de órgão público', isCorreta: false, feedback: 'Incorreto. Trata-se de reflexão crítica, não de descrição de ambiente físico.' },
      ]
    }
  ];

  const handleSelectQuiz = (caseId: string, optId: string) => {
    setQuizSelections((prev) => ({ ...prev, [caseId]: optId }));
  };

  const generateWhatsAppMessage = () => {
    const t1 = practicalAnswers[1] || '(Não preenchido)';
    const t2 = practicalAnswers[2] || '(Não preenchido)';
    const t3 = practicalAnswers[3] || '(Não preenchido)';

    const text = `*📚 TJAM 2026 — Língua Portuguesa (Aula 02: Tipos e Gêneros Textuais)*\n` +
      `*Aluno(a):* Resolução da Atividade Prática Forense\n\n` +
      `*1. Texto Narrativo (Fato no Atendimento):*\n${t1}\n\n` +
      `*2. Texto Descritivo (Ambiente da Unidade TJAM):*\n${t2}\n\n` +
      `*3. Texto Injuntivo (Orientação Instrucional):*\n${t3}\n\n` +
      `*Meta cumprida:* Aula 02 concluída com sucesso! 🎯`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/?text=${encoded}`;
  };

  const PORTUGUES_AULA2_VIDEO_URL = 'https://youtu.be/Yj0cJ3D9WUg?is=ciraZvHs4DbtVOBL';

  return (
    <article className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* HEADER DA AULA: LÍNGUA PORTUGUESA — AULA 02 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="w-56 h-56 text-indigo-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              📚 Língua Portuguesa • Aula 02
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
              ⭐ Segunda Aula do Dia
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-300">
              TJAM Assistente Judiciário • Nível Intermediário
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Tipos e Gêneros Textuais
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Diferencie com absoluta segurança os <strong>tipos textuais</strong> (estruturas teóricas de organização) dos <strong>gêneros textuais</strong> (formas concretas de comunicação social), domine a heterogeneidade tipológica e aniquile as pegadinhas de bancas como FGV e Cebraspe.
            </p>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('video')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-400" />
              <span>Assistir Videoaula</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('questoes')}
              className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-indigo-200" />
              <span>Resolver 20 Exercícios</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('flashcards')}
              className="px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <Brain className="w-4 h-4 text-sky-200" />
              <span>Treinar 10 Flashcards</span>
            </button>
            <a
              href={PORTUGUES_AULA2_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-red-400" />
              <span>Abrir no YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BLOCO TEÓRICO CENTRAL — OS 20 TÓPICOS DA AULA */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Conteúdo Teórico Estruturado
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Clique nas caixas para marcar os tópicos lidos e acompanhar sua evolução na aula.
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
            {Object.values(readTopics).filter(Boolean).length} de 20 Tópicos Concluídos
          </span>
        </div>

        {/* TÓPICO 1 */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t1'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                1. Fundamentos da Linguagem
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                O que são tipos textuais?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Os <strong>tipos textuais</strong> (ou sequências tipológicas) correspondem a formas de organização e estruturação interna do texto de acordo com sua constituição linguística e sua finalidade predominante.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-black text-slate-900 dark:text-white">Os 5 tipos textuais fundamentais:</span>
                <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <li className="p-2 rounded-lg bg-blue-100/70 text-blue-900 dark:bg-blue-950 dark:text-blue-300">1. Narração</li>
                  <li className="p-2 rounded-lg bg-emerald-100/70 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">2. Descrição</li>
                  <li className="p-2 rounded-lg bg-amber-100/70 text-amber-900 dark:bg-amber-950 dark:text-amber-300">3. Exposição</li>
                  <li className="p-2 rounded-lg bg-rose-100/70 text-rose-900 dark:bg-rose-950 dark:text-rose-300">4. Argumentação</li>
                  <li className="p-2 rounded-lg bg-purple-100/70 text-purple-900 dark:bg-purple-950 dark:text-purple-300">5. Injunção</li>
                </ol>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                *Nota pedagógica:* Um mesmo texto pode apresentar características de mais de um tipo, mas geralmente existe uma estrutura predominante que define sua classificação.
              </p>
            </div>
            <button
              onClick={() => toggleTopic('t1')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t1'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 2: NARRAÇÃO */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t2'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                2. Tipologia 1: Narração
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Narração — Foco no Acontecimento no Tempo
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A narração apresenta acontecimentos, reais ou fictícios, organizados numa sequência cronológica temporal. Normalmente envolve 5 elementos essenciais:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">Personagens</span>
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">Acontecimentos (Enredo)</span>
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">Tempo</span>
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">Espaço</span>
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">Narrador</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border-l-4 border-blue-500 space-y-1">
                <span className="text-[11px] font-black uppercase text-blue-800 dark:text-blue-300">Exemplo Típico Forense:</span>
                <blockquote className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                  “O servidor chegou ao setor às 8 horas. Após verificar os documentos, iniciou o atendimento dos primeiros cidadãos.”
                </blockquote>
                <p className="text-xs text-blue-700 dark:text-blue-400 font-medium pt-1">
                  Existe uma cadeia cronológica de fatos sucessivos: <em>chegou → verificou → iniciou</em>.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-300 font-black text-xs">
                🎯 Palavra-chave para Prova: ACONTECIMENTO / SUCESSÃO NO TEMPO
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t2')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t2'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 3: DESCRIÇÃO */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t3'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                3. Tipologia 2: Descrição
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Descrição — Retrato Verbal e Características Estáticas
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A descrição apresenta características detalhadas de uma pessoa, objeto, lugar, ambiente ou situação. Enquanto a narração é dinâmica e avança no tempo, a descrição é como uma <em>fotografia</em> que paralisa o tempo para destacar atributos.
              </p>
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border-l-4 border-emerald-500 space-y-1">
                <span className="text-[11px] font-black uppercase text-emerald-800 dark:text-emerald-300">Exemplo Típico Forense:</span>
                <blockquote className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                  “A sala de atendimento era ampla, iluminada e possuía três mesas organizadas próximas à entrada.”
                </blockquote>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium pt-1">
                  O foco está nas propriedades, aparência e disposição do ambiente.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-300 font-black text-xs">
                🎯 Palavra-chave para Prova: CARACTERÍSTICAS / ESTADO
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t3')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t3'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 4: DISSERTAÇÃO EXPOSITIVA */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t4'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                4. Tipologia 3: Dissertação Expositiva
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Dissertação Expositiva — Explicação Neutra e Conceituação
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A dissertação expositiva desenvolve ideias sobre determinado assunto com o objetivo primordial de <strong>informar, explicar, conceituar e transmitir conhecimento</strong> sem tomar partido ou tentar convencer o interlocutor.
              </p>
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border-l-4 border-amber-500 space-y-1">
                <span className="text-[11px] font-black uppercase text-amber-800 dark:text-amber-300">Exemplo Típico Forense:</span>
                <blockquote className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                  “A administração pública direta é formada pelos entes federativos, enquanto a administração indireta é composta por entidades dotadas de personalidade jurídica própria.”
                </blockquote>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium pt-1">
                  O trecho esclarece e define conceitos jurídicos de forma puramente expositiva.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-300 font-black text-xs">
                🎯 Palavra-chave para Prova: EXPLICAÇÃO / INFORMAÇÃO / CONCEITUAÇÃO
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t4')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t4'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 5: DISSERTAÇÃO ARGUMENTATIVA */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t5'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                5. Tipologia 4: Dissertação Argumentativa
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Dissertação Argumentativa — Defesa de Ideia com Tese e Argumentos
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Na dissertação argumentativa, o autor assume uma posição explícita (<strong>tese</strong>) sobre um assunto e recorre a justificativas, dados, exemplos e raciocínio lógico (<strong>argumentos</strong>) para persuadir o leitor.
              </p>
              <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border-l-4 border-rose-500 space-y-1">
                <span className="text-[11px] font-black uppercase text-rose-800 dark:text-rose-300">Exemplo Típico Forense:</span>
                <blockquote className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                  “A modernização dos serviços públicos deve ser acompanhada de medidas de inclusão digital, pois parte da população ainda encontra dificuldades para utilizar ferramentas tecnológicas.”
                </blockquote>
                <div className="text-xs space-y-0.5 pt-1 text-slate-700 dark:text-slate-300">
                  <p>• <strong>Tese:</strong> A modernização deve ser acompanhada de inclusão.</p>
                  <p>• <strong>Argumento:</strong> Parte da população enfrenta dificuldades de acesso.</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-300 font-black text-xs">
                🎯 Palavra-chave para Prova: DEFESA DE IDEIA / PERSUASÃO / TESE
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t5')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t5'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 6: INJUNÇÃO */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t6'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                6. Tipologia 5: Injunção
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Injunção — Orientação, Prescrição e Instrução
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                O texto injuntivo orienta ou instrui o leitor a realizar determinada conduta ou ação prática. É muito comum o uso de verbos no <strong>modo imperativo</strong> (faça, acesse, preencha) ou no <strong>infinitivo</strong>.
              </p>
              <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border-l-4 border-purple-500 space-y-1">
                <span className="text-[11px] font-black uppercase text-purple-800 dark:text-purple-300">Exemplo no Sistema Projudi/SAJ:</span>
                <blockquote className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                  “Acesse o sistema, informe seu usuário e senha e selecione a opção ‘Consultar Processo’.”
                </blockquote>
                <p className="text-xs text-purple-700 dark:text-purple-400 font-medium pt-1">
                  O texto guia passo a passo a ação do leitor.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-300 font-black text-xs">
                🎯 Palavra-chave para Prova: ORIENTAÇÃO / INSTRUÇÃO / COMANDO
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t6')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t6'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* QUADRO COMPARATIVO DOS 5 TIPOS */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-lg space-y-4 border border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider">
            <Table className="w-4 h-4" /> Quadro Síntese dos Tipos Textuais
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3 font-black">Tipo Textual</th>
                  <th className="py-2.5 px-3 font-black">Principal Finalidade</th>
                  <th className="py-2.5 px-3 font-black">Marca Linguística Marcante</th>
                  <th className="py-2.5 px-3 font-black">Palavra-Chave</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr>
                  <td className="py-2.5 px-3 font-extrabold text-blue-400">Narração</td>
                  <td className="py-2.5 px-3 text-slate-300">Apresenta acontecimentos no tempo</td>
                  <td className="py-2.5 px-3 text-slate-400">Verbos no pretérito perfeito, advérbios de tempo</td>
                  <td className="py-2.5 px-3 font-bold text-white">Acontecimento</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-extrabold text-emerald-400">Descrição</td>
                  <td className="py-2.5 px-3 text-slate-300">Apresenta características de seres/espaços</td>
                  <td className="py-2.5 px-3 text-slate-400">Adjetivos, verbos de ligação (ser, estar, parecer)</td>
                  <td className="py-2.5 px-3 font-bold text-white">Características</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-extrabold text-amber-400">Exposição</td>
                  <td className="py-2.5 px-3 text-slate-300">Explica e transmite conhecimentos com neutralidade</td>
                  <td className="py-2.5 px-3 text-slate-400">Linguagem objetiva, definições, dados técnicos</td>
                  <td className="py-2.5 px-3 font-bold text-white">Explicação</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-extrabold text-rose-400">Argumentação</td>
                  <td className="py-2.5 px-3 text-slate-300">Defende tese e busca convencer o leitor</td>
                  <td className="py-2.5 px-3 text-slate-400">Conectivos causais/conclusivos, juízos de valor</td>
                  <td className="py-2.5 px-3 font-bold text-white">Defesa de ideia</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-extrabold text-purple-400">Injunção</td>
                  <td className="py-2.5 px-3 text-slate-300">Orienta, comanda ou instrui condutas</td>
                  <td className="py-2.5 px-3 text-slate-400">Verbos no imperativo ou infinitivo</td>
                  <td className="py-2.5 px-3 font-bold text-white">Orientação</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TÓPICO 7 & 8: O QUE SÃO GÊNEROS E A DIFERENÇA VITAL */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t7'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                7 e 8. O Universo dos Gêneros Textuais
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                O que são Gêneros Textuais e a Diferença Crucial para Tipos
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Os <strong>gêneros textuais</strong> são as formas concretas, infinitas e dinâmicas de comunicação que circulam nas mais diversas situações sociais e históricas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-1.5 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase">TIPO TEXTUAL</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    • É a <strong>estrutura interna</strong> da linguagem.<br />
                    • Categoria teórica, fixa e restrita (apenas 5 tipos).<br />
                    • Pergunta: <em>Como o texto está organizado internamente?</em>
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 space-y-1.5 border border-indigo-200 dark:border-indigo-800">
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase">GÊNERO TEXTUAL</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    • É a <strong>função social</strong> concreta do texto.<br />
                    • Categoria social, dinâmica e infinita (ofício, edital, ata, e-mail, etc.).<br />
                    • Pergunta: <em>Onde esse texto circula e para que ele serve?</em>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
                <strong className="block font-black">Exemplo Clássico de Prova:</strong>
                <p>Imagine uma <strong>notícia</strong> no jornal: a notícia é o <em>gênero textual</em>. Como ela relata um acontecimento no tempo, sua estrutura predominante é a <em>narração</em> (tipo textual).</p>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t7')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t7'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICOS 9 A 17: OS PRINCIPAIS GÊNEROS TEXTUAIS COBRADOS EM CONCURSOS */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t9_17'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4 w-full">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                9 a 17. Guia Completo dos Gêneros Textuais
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Os 9 Gêneros Textuais mais Cobrados em Concursos e no Judiciário
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Notícia */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <FileText className="w-4 h-4 text-blue-500" /> 9. Notícia
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Finalidade de informar fato recente de forma direta e objetiva (quem, onde, quando, o quê).
                  </p>
                </div>

                {/* 2. Reportagem */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <BookOpen className="w-4 h-4 text-indigo-500" /> 10. Reportagem
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Aprofunda e contextualiza o fato, trazendo entrevistas, dados estatísticos e causas.
                  </p>
                </div>

                {/* 3. Artigo de Opinião */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <Sparkles className="w-4 h-4 text-rose-500" /> 11. Artigo de Opinião
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Defesa de posição explícita assinada pelo autor, articulando argumentos persuasivos.
                  </p>
                </div>

                {/* 4. Edital */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <ScrollText className="w-4 h-4 text-amber-500" /> 12. Edital
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Divulga regras, etapas, prazos e condições normativas de concursos ou convocações.
                  </p>
                </div>

                {/* 5. Requerimento */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <FileCheck2 className="w-4 h-4 text-emerald-500" /> 13. Requerimento
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Utilizado para SOLICITAR formalmente um direito a uma autoridade competente.
                  </p>
                </div>

                {/* 6. Ofício */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <Building2 className="w-4 h-4 text-sky-500" /> 14. Ofício
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Comunicação formal institucional entre autoridades e órgãos públicos.
                  </p>
                </div>

                {/* 7. Relatório */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <Table className="w-4 h-4 text-teal-500" /> 15. Relatório
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Apresenta dados, atividades realizadas, análises técnicas e conclusões de gestão.
                  </p>
                </div>

                {/* 8. Ata */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <Bookmark className="w-4 h-4 text-purple-500" /> 16. Ata
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Registro formal, cronológico e fiel do que ocorreu e foi decidido em reunião ou audiência.
                  </p>
                </div>

                {/* 9. Manual */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <Lightbulb className="w-4 h-4 text-yellow-500" /> 17. Manual
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Instruções passo a passo para utilizar sistemas (predominância injuntiva).
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t9_17')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t9_17'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 18: HETEROGENEIDADE TIPOLÓGICA */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t18'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                18. Conceito Essencial para FGV e Cebraspe
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Um Gênero pode Misturar Tipos Textuais!
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Um gênero textual <strong>não é puro</strong>. Uma reportagem, por exemplo, pode abrir narrando um acidente (narração), descrever os destroços no local (descrição), citar dados do Ministério dos Transportes (exposição) e reproduzir a opinião de um especialista (argumentação).
              </p>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs space-y-1">
                <span className="font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  Regra de Ouro em Provas:
                </span>
                <p>
                  O examinador pode pedir o <em>tipo textual predominante no texto inteiro</em> OU o <em>tipo textual de um parágrafo/trecho específico</em>. Leia sempre o enunciado com extrema atenção!
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t18')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t18'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 19 E 20: O MÉTODO INFALÍVEL DE IDENTIFICAÇÃO */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t19_20'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4 w-full">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                19 e 20. Passo a Passo Prático
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Como Identificar na Hora da Prova? (As Perguntas Diagnósticas)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                    🔍 PARA DESCOBRIR O TIPO TEXTUAL:
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                    <li>• Existem fatos acontecendo em sequência temporal? ➡️ <strong>Narração</strong></li>
                    <li>• O texto enumera qualidades/características? ➡️ <strong>Descrição</strong></li>
                    <li>• O texto explica ou define conceitos com neutralidade? ➡️ <strong>Exposição</strong></li>
                    <li>• O autor defende uma posição e tenta convencer? ➡️ <strong>Argumentação</strong></li>
                    <li>• O texto instrui o leitor a agir passo a passo? ➡️ <strong>Injunção</strong></li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    🏛️ PARA DESCOBRIR O GÊNERO TEXTUAL:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Pergunte-se: <em>“Onde esse texto circula socialmente e qual é o seu objetivo prático?”</em>
                  </p>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pt-1">
                    <li>• Estabelece regras oficiais de um concurso? ➡️ <strong>Edital</strong></li>
                    <li>• Relata fato recente no jornal? ➡️ <strong>Notícia</strong></li>
                    <li>• Defende uma opinião assinada? ➡️ <strong>Artigo de Opinião</strong></li>
                    <li>• Registra o que ocorreu na sessão? ➡️ <strong>Ata</strong></li>
                    <li>• Pede algo formalmente ao diretor do fórum? ➡️ <strong>Requerimento</strong></li>
                  </ul>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t19_20')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t19_20'] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* ⚠️ PEGADINHAS DE PROVA */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 text-slate-900 dark:text-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5" /> ⚠️ As 5 Pegadinhas Clássicas de Prova
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-300/50 space-y-1">
              <span className="font-extrabold text-amber-700 dark:text-amber-400">1. Confundir gênero com tipo</span>
              <p className="text-slate-600 dark:text-slate-300">
                Narração <strong>NÃO</strong> é gênero textual; é tipo textual. Notícia e crônica são gêneros textuais.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-300/50 space-y-1">
              <span className="font-extrabold text-amber-700 dark:text-amber-400">2. Achar que o texto só tem um tipo</span>
              <p className="text-slate-600 dark:text-slate-300">
                Quase todo gênero textual mescla tipos textuais (ex.: notícia traz narração com trechos descritivos e expositivos).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-300/50 space-y-1">
              <span className="font-extrabold text-amber-700 dark:text-amber-400">3. Confundir Exposição com Argumentação</span>
              <p className="text-slate-600 dark:text-slate-300">
                Exposição apenas informa e explica dados neutros; Argumentação sustenta uma tese e quer persuadir o leitor.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-300/50 space-y-1">
              <span className="font-extrabold text-amber-700 dark:text-amber-400">4. Confundir Descrição com Narração</span>
              <p className="text-slate-600 dark:text-slate-300">
                Descrição mostra atributos estáticos (fotografia); Narração apresenta eventos em transformação temporal (filme).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-300/50 space-y-1 md:col-span-2">
              <span className="font-extrabold text-amber-700 dark:text-amber-400">5. Confundir Notícia com Artigo de Opinião</span>
              <p className="text-slate-600 dark:text-slate-300">
                A notícia prioriza a imparcialidade informativa do fato; o artigo de opinião é explicitamente opinativo e assinado por quem defende um lado da questão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SIMULADOR / DESAFIO INTERATIVO: TIPOLOGIA & GÊNERO */}
      {/* ========================================================================= */}
      <section className="space-y-6 p-6 sm:p-8 rounded-3xl border bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider">
            <Target className="w-4 h-4" /> Desafio de Fixação Rápida
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Laboratório Prático: Tipologia ou Gênero Forense?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Analise os trechos reais do cotidiano do TJAM e identifique a classificação correta com gabarito comentado imediato:
          </p>
        </div>

        <div className="space-y-6">
          {quizCases.map((c) => {
            const selectedOptId = quizSelections[c.id];
            const chosen = c.opcoes.find((o) => o.id === selectedOptId);

            return (
              <div key={c.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-indigo-300">Trecho em Análise:</span>
                  <blockquote className="p-3 rounded-xl bg-white/5 border-l-2 border-indigo-400 text-xs sm:text-sm font-semibold text-slate-200 italic">
                    {c.trecho}
                  </blockquote>
                  <p className="text-xs font-black text-amber-300 pt-1">{c.pergunta}</p>
                </div>

                <div className="space-y-2">
                  {c.opcoes.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectQuiz(c.id, opt.id)}
                        className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? opt.isCorreta
                              ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-100 font-bold'
                              : 'bg-rose-500/20 border-2 border-rose-400 text-rose-100 font-bold'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                          isSelected
                            ? opt.isCorreta ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            : 'bg-white/10 text-white'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="leading-snug pt-0.5">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {chosen && (
                  <div className={`p-4 rounded-xl text-xs space-y-1 animate-in fade-in duration-300 ${
                    chosen.isCorreta
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                  }`}>
                    <div className="font-black flex items-center gap-1.5">
                      {chosen.isCorreta ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>GABARITO CORRETO!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>ATENÇÃO: ANÁLISE EQUIVOCADA</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed opacity-90">{chosen.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ATIVIDADE PRÁTICA — FIXAÇÃO (ENVIO VIA WHATSAPP AO PROFESSOR) */}
      {/* ========================================================================= */}
      <section className="space-y-6 p-6 sm:p-8 rounded-3xl border border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider">
            <Send className="w-4 h-4" /> Laboratório Prático de Redação Forense
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            📱 Atividade Prática — Produção de 3 Textos Forenses
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {portuguesAula2PracticalTask.scenario}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {portuguesAula2PracticalTask.instruction}
          </p>
        </div>

        <div className="space-y-5">
          {portuguesAula2PracticalTask.questions.map((q) => (
            <div key={q.number} className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                  {q.title}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  2 a 4 linhas
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {q.prompt}
              </p>
              <textarea
                rows={3}
                value={practicalAnswers[q.number] || ''}
                onChange={(e) => handlePracticalChange(q.number, e.target.value)}
                placeholder={q.placeholder}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
              {showPracticalAnswers && (
                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs space-y-1">
                  <span className="font-extrabold text-indigo-800 dark:text-indigo-300">
                    💡 Modelo Sugerido (Padrão TJAM):
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    {q.suggestedAnswer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
          <button
            type="button"
            onClick={() => setShowPracticalAnswers(!showPracticalAnswers)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{showPracticalAnswers ? 'Ocultar Modelos' : 'Ver Modelos Sugeridos de Resposta'}</span>
          </button>

          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Textos pelo WhatsApp ao Professor</span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BOTÕES DE NAVEGAÇÃO E CONCLUSÃO DA AULA */}
      {/* ========================================================================= */}
      <section className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onToggleCompleted}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula 02 Marcada como Concluída' : 'Marcar Aula 02 como Concluída'}</span>
        </button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab && onNavigateTab('flashcards')}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Flashcards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('questoes')}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <span>Ir para as 20 Questões</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </article>
  );
};
