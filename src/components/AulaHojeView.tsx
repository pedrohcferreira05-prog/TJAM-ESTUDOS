import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Brain,
  Layers,
  FileText,
  Lightbulb,
  AlertTriangle,
  Download,
  Maximize2,
  ExternalLink,
  X,
  Check,
  ArrowRight,
  Bookmark,
  Video,
  Play
} from 'lucide-react';

interface AulaHojeViewProps {
  isDarkMode: boolean;
  onNavigateTab: (tab: any) => void;
}

const mindMapImg = '/mapa_mental_constituicao.jpg';

export const AulaHojeView: React.FC<AulaHojeViewProps> = ({ isDarkMode, onNavigateTab }) => {
  // Navigation inside lesson steps
  const [activeTab, setActiveTab] = useState<'video' | 'conteudo' | 'mapa' | 'flashcards' | 'questoes' | 'resumo'>('video');
  
  // Flashcard State
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState<Record<number, boolean>>({});

  // Questions State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuestionResults, setShowQuestionResults] = useState<Record<number, boolean>>({});

  // True/False & Discursive States
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});
  const [tfSubmitted, setTfSubmitted] = useState<Record<number, boolean>>({});
  const [discursiveAnswers, setDiscursiveAnswers] = useState<Record<number, string>>({});
  const [discursiveSubmitted, setDiscursiveSubmitted] = useState<Record<number, boolean>>({});
  const [exerciseFilter, setExerciseFilter] = useState<'todos' | 'mc' | 'vf' | 'discursiva'>('todos');

  // Checklist State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Download Mindmap Image Function (Blob & direct download)
  const handleDownloadMapImage = async () => {
    try {
      const response = await fetch(mindMapImg);
      if (!response.ok) throw new Error('Não foi possível carregar o arquivo da imagem.');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Mapa_Mental_Capitulo_1_Constituicao_Federal.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1500);
    } catch (err) {
      console.warn('Download via Blob falhou ou bloqueado pelo navegador, abrindo imagem:', err);
      window.open(mindMapImg, '_blank');
    }
  };
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    c1: false,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
  });

  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  // Lesson Content Data - Wednesday Lesson (Unidade 1 - Administração Pública: Conceito e Finalidade)
  const flashcardsData = [
    {
      q: 'O que é a Administração Pública em sentido subjetivo (formal)?',
      a: 'É o conjunto de órgãos, entidades e agentes públicos responsáveis pela atividade administrativa.'
    },
    {
      q: 'O que é a Administração Pública em sentido objetivo (material)?',
      a: 'É a própria atividade ou função administrativa desempenhada pelo Estado para satisfazer necessidades da sociedade.'
    },
    {
      q: 'Qual a diferença entre Governo e Administração Pública?',
      a: 'O Governo define as diretrizes e políticas públicas (função política); a Administração Pública executa essas decisões (função administrativa).'
    },
    {
      q: 'Quem compõe a Administração Pública Direta?',
      a: 'Os órgãos integrantes dos entes federativos: União, Estados, Distrito Federal e Municípios (órgãos sem personalidade jurídica própria).'
    },
    {
      q: 'Quem compõe a Administração Pública Indireta?',
      a: 'Entidades descentralizadas criadas para atividades específicas: Autarquias, Fundações Públicas, Empresas Públicas e Sociedades de Economia Mista.'
    }
  ];

  // Questions Data - 20 Questions for Unidade 1 Aula 1 (Direito Administrativo - Conceito, Princípios e Poderes)
  const questionsData = [
    {
      id: 1,
      enunciado: '1. A Administração Pública pode ser definida como:',
      alternativas: [
        'O conjunto de atividades exclusivamente do Poder Judiciário.',
        'O conjunto de órgãos, entidades, agentes e atividades que executam as funções administrativas do Estado.',
        'O conjunto de leis editadas pelo Congresso Nacional.',
        'O conjunto de empresas privadas contratadas pelo Estado.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A Administração Pública é o conjunto de órgãos, entidades, agentes e atividades que executam as funções administrativas do Estado.'
    },
    {
      id: 2,
      enunciado: '2. O principal objetivo da Administração Pública é:',
      alternativas: [
        'Obter lucro.',
        'Defender interesses particulares.',
        'Atender ao interesse público.',
        'Fiscalizar apenas empresas privadas.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. O principal objetivo e razão de existir da Administração Pública é atender ao interesse público.'
    },
    {
      id: 3,
      enunciado: '3. A Administração Pública Direta é composta por:',
      alternativas: [
        'Empresas Públicas e Autarquias.',
        'União, Estados, Distrito Federal e Municípios.',
        'Apenas o Governo Federal.',
        'Empresas privadas contratadas pelo Estado.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A Administração Pública Direta é composta pelas pessoas políticas territoriais: União, Estados, Distrito Federal e Municípios.'
    },
    {
      id: 4,
      enunciado: '4. Faz parte da Administração Pública Indireta:',
      alternativas: [
        'Câmara Municipal.',
        'Senado Federal.',
        'Autarquias.',
        'Assembleia Legislativa.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. Faz parte da Administração Pública Indireta a categoria das Autarquias (junto com Fundações Públicas, Empresas Públicas e Sociedades de Economia Mista).'
    },
    {
      id: 5,
      enunciado: '5. A Administração Pública em sentido subjetivo refere-se:',
      alternativas: [
        'À atividade administrativa.',
        'Aos órgãos, entidades e agentes públicos.',
        'À Constituição Federal.',
        'À atividade legislativa.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Em sentido subjetivo (formal ou orgânico), refere-se aos sujeitos da atuação estatal: órgãos, entidades e agentes públicos.'
    },
    {
      id: 6,
      enunciado: '6. A Administração Pública em sentido objetivo refere-se:',
      alternativas: [
        'À atividade administrativa exercida pelo Estado.',
        'Aos agentes públicos.',
        'Aos Poderes da República.',
        'À organização política.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Em sentido objetivo (material ou funcional), refere-se à própria atividade ou função administrativa exercida pelo Estado.'
    },
    {
      id: 7,
      enunciado: '7. Qual alternativa diferencia corretamente Governo e Administração Pública?',
      alternativas: [
        'Governo executa serviços; Administração cria leis.',
        'Governo define políticas públicas; Administração Pública as executa.',
        'Ambos exercem exatamente a mesma função.',
        'Administração Pública cria políticas públicas.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. O Governo define diretrizes e políticas públicas; a Administração Pública as executa com imparcialidade técnica.'
    },
    {
      id: 8,
      enunciado: '8. A Administração Pública deve atuar prioritariamente em favor:',
      alternativas: [
        'Dos governantes.',
        'Dos servidores públicos.',
        'Do interesse público.',
        'Dos partidos políticos.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A Administração Pública deve atuar prioritariamente e indispensavelmente em favor do interesse público.'
    },
    {
      id: 9,
      enunciado: '9. O artigo da Constituição Federal que estabelece os princípios da Administração Pública é o:',
      alternativas: [
        'Art. 5º',
        'Art. 37',
        'Art. 60',
        'Art. 144'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. O Art. 37 da Constituição Federal estabelece os princípios expressos da Administração Pública.'
    },
    {
      id: 10,
      enunciado: '10. Qual dos princípios abaixo faz parte dos princípios constitucionais expressos da Administração Pública?',
      alternativas: [
        'Eficiência.',
        'Competitividade.',
        'Lucratividade.',
        'Produtividade.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. O princípio da Eficiência é um dos princípios expressos no caput do Art. 37 da CF/88 (Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência).'
    }
  ];

  const tfQuestionsData = [
    {
      id: 11,
      enunciado: '11. A Administração Pública existe para atender ao interesse coletivo.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. A razão de existir da Administração Pública é o atendimento ao interesse coletivo.'
    },
    {
      id: 12,
      enunciado: '12. A Administração Pública pode agir sem observar a lei.',
      correta: false,
      explicacao: '❌ Gabarito: Falso. Pelo princípio constitucional da legalidade, a Administração Pública é estritamente subordinada à lei.'
    },
    {
      id: 13,
      enunciado: '13. Autarquias fazem parte da Administração Pública Indireta.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. As autarquias integram a estrutura da Administração Pública Indireta.'
    },
    {
      id: 14,
      enunciado: '14. Governo e Administração Pública possuem exatamente a mesma função.',
      correta: false,
      explicacao: '❌ Gabarito: Falso. Governo possui função política de comando; a Administração Pública possui função técnica de execução.'
    },
    {
      id: 15,
      enunciado: '15. A Administração Pública presta serviços públicos à sociedade.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. A prestação de serviços públicos à sociedade é atribuição fundamental da Administração Pública.'
    }
  ];

  const discursiveQuestionsData = [
    {
      id: 16,
      enunciado: '16. Explique o conceito de Administração Pública.',
      respostaEsperada: 'Gabarito oficial: A Administração Pública é o conjunto de órgãos, entidades, agentes e atividades que executam as funções administrativas do Estado com o objetivo de atender ao interesse público e prestar serviços à sociedade.'
    },
    {
      id: 17,
      enunciado: '17. Diferencie Administração Pública Direta e Administração Pública Indireta.',
      respostaEsperada: 'Gabarito oficial: A Administração Direta é composta pelos entes políticos territoriais (União, Estados, Distrito Federal e Municípios) e seus órgãos despersonalizados. A Administração Indireta é formada pelas entidades descentralizadas dotadas de personalidade jurídica própria (Autarquias, Fundações Públicas, Empresas Públicas e Sociedades de Economia Mista).'
    },
    {
      id: 18,
      enunciado: '18. Explique a diferença entre Governo e Administração Pública.',
      respostaEsperada: 'Gabarito oficial: O Governo exerce a função política, definindo diretrizes, metas estratégicas e políticas públicas do Estado. A Administração Pública exerce a função técnica e neutra, responsável por executar as políticas públicas traçadas pelo Governo.'
    },
    {
      id: 19,
      enunciado: '19. Qual é a finalidade da Administração Pública?',
      respostaEsperada: 'Gabarito oficial: A finalidade primordial da Administração Pública é a plena satisfação do interesse público, garantindo os direitos dos cidadãos e o bem-estar da coletividade.'
    },
    {
      id: 20,
      enunciado: '20. Por que o interesse público deve orientar a atuação da Administração Pública?',
      respostaEsperada: 'Gabarito oficial: Porque o Estado existe em função da sociedade e os recursos públicos pertencem à coletividade. Portanto, todos os atos da Administração Pública devem buscar o benefício coletivo, sobrepondo-se aos interesses particulares.'
    }
  ];

  const toggleChecklist = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMarkAsCompleted = () => {
    setIsLessonCompleted(true);
    setChecklist({
      c1: true,
      c2: true,
      c3: true,
      c4: true,
      c5: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb & Metadata Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Direito Administrativo</span>
          <span>•</span>
          <span>Unidade 1 — Administração Pública</span>
          <span>•</span>
          <span>Capítulo 1 — Conceito, Princípios e Poderes</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              Aula de Hoje (Quarta-feira)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Aula 1 — Administração Pública: Conceito e Finalidade
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              45 min
            </span>
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Essencial
            </span>
          </div>
        </div>
      </div>

      {/* Completion Banner if completed */}
      {isLessonCompleted && (
        <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Parabéns!</h2>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              O conteúdo de quarta-feira foi concluído com sucesso.
            </p>
            <p className="text-xs text-slate-500">
              Retorne amanhã para continuar sua preparação rumo à aprovação no TJAM.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md cursor-pointer"
            >
              Voltar ao Início
            </button>
            <button
              onClick={() => setIsLessonCompleted(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Rever Conteúdo
            </button>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'video'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Video className="w-4 h-4 text-rose-500" /> Vídeo Aula
        </button>
        <button
          onClick={() => setActiveTab('conteudo')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'conteudo'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Texto da Aula
        </button>
        <button
          onClick={() => setActiveTab('mapa')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'mapa'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4" /> Mapa Mental
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" /> Flashcards ({flashcardsData.length})
        </button>
        <button
          onClick={() => setActiveTab('questoes')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'questoes'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Questões ({questionsData.length})
        </button>
        <button
          onClick={() => setActiveTab('resumo')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'resumo'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> Resumo
        </button>
      </div>

      {/* TAB 0: VÍDEO AULA */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" /> Vídeo Aula Exclusiva
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Unidade 1 — Administração Pública: Conceito e Finalidade
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Capítulo 1 • Preparação Completa Assistente Judiciário TJAM / Concursos
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" /> HD Video
                </span>
              </div>
            </div>

            {/* Embedded YouTube Video Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/5KTWPjRLcLo?autoplay=0&rel=0"
                title="Vídeo Aula - Administração Pública: Conceito e Finalidade"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Details & Quick Next Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="md:col-span-2 space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <h3 className="text-xs font-extrabold uppercase text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-500" /> O que você vai aprender neste vídeo:
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Conceito da Administração Pública em sentido subjetivo (formal) e objetivo (material).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Distinção essencial entre Governo (função política) e Administração Pública (função técnica).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Estrutura da Administração Direta (União, Estados, DF, Municípios) e Indireta (Autarquias, Fundações, EP e SEM).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Supremacia e indisponibilidade do Interesse Público e serviços essenciais.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">
                    Próximo Passo no Estudo
                  </span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1">
                    Pronto para praticar?
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Após o vídeo, acesse o texto completo, mapa mental ou responda as 20 questões inéditas de fixação.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setActiveTab('conteudo')}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ir para Texto da Aula</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('questoes')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fazer 20 Questões (Fixação)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: TEXTO COMPLETO DA AULA */}
      {activeTab === 'conteudo' && (
        <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
          {/* Objetivos */}
          <section
            className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
            }`}
          >
            <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula de Quarta-Feira
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Ao concluir esta aula, você será capaz de:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Compreender o conceito de Administração Pública nos sentidos subjetivo e objetivo.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Diferenciar a função política do Governo da atuação da Administração Pública.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Distinguir os entes da Administração Direta das entidades da Administração Indireta.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Identificar a finalidade precípua do Estado e o princípio do Interesse Público.</span>
              </li>
            </ul>
          </section>

          {/* Seção 1: O que é a Administração Pública */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              1. O que é a Administração Pública?
            </h2>
            <p className="text-sm">
              A <strong>Administração Pública</strong> é o conjunto de órgãos, entidades, agentes e atividades que têm como finalidade atender às necessidades coletivas e promover o interesse público. Ela é responsável por executar as políticas públicas, prestar serviços essenciais à população e garantir o funcionamento regular do Estado.
            </p>
            <p className="text-sm">
              A Administração Pública pode ser compreendida sob <strong>dois aspectos essenciais</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Sentido Subjetivo (Formal ou Orgânico)
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
                  Quem faz (Os Sujeitos)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Refere-se ao conjunto de <strong>órgãos, entidades e agentes públicos</strong> responsáveis por desempenhar a atividade administrativa estatal.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Sentido Objetivo (Material ou Funcional)
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
                  O que é feito (A Atividade)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Refere-se à própria <strong>atividade administrativa</strong> desenvolvida pelo Estado para satisfazer as necessidades da sociedade.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic pt-1">
              A Constituição Federal estabelece que a Administração Pública deve atuar em conformidade rigorosa com a lei e com os princípios constitucionais, buscando sempre o interesse público e o bem-estar da coletividade.
            </p>
          </section>

          {/* Seção 2: Governo x Administração Pública */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              2. Governo x Administração Pública
            </h2>
            <p className="text-sm">
              Embora os termos sejam frequentemente utilizados como sinônimos no cotidiano, eles possuem <strong>significados jurídicos distintos</strong>:
            </p>
            <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/40 border-amber-200/80'}`}>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-600" /> O Governo
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Exerce a <strong>função política</strong> do Estado. É responsável por definir as diretrizes estratégicas, planos de ação, metas gerais e políticas públicas do país. Possui autonomia política e comando supremo.
                </p>
              </div>

              <div className="border-t border-amber-200/60 dark:border-slate-800 pt-3 space-y-1">
                <h3 className="text-sm font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-600" /> A Administração Pública
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Executa essas decisões. Coloca em prática as políticas estabelecidas pelo Governo por meio da <strong>prestação de serviços públicos</strong>, fiscalização, gestão de recursos e demais atividades administrativas técnicas. É neutra e subordinada à lei.
                </p>
              </div>
            </div>
          </section>

          {/* Seção 3: Administração Pública Direta */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              3. Administração Pública Direta
            </h2>
            <p className="text-sm">
              É composta pelos <strong>órgãos públicos</strong> que integram diretamente a estrutura dos entes federativos (pessoas políticas territoriais):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-bold">
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-emerald-600 dark:text-emerald-400 text-sm font-black">União</span>
                <span className="text-[10px] text-slate-500 font-normal">Nível Federal</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-emerald-600 dark:text-emerald-400 text-sm font-black">Estados</span>
                <span className="text-[10px] text-slate-500 font-normal">Ex: Estado do Amazonas</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-emerald-600 dark:text-emerald-400 text-sm font-black">Distrito Federal</span>
                <span className="text-[10px] text-slate-500 font-normal">Ente Híbrido</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-emerald-600 dark:text-emerald-400 text-sm font-black">Municípios</span>
                <span className="text-[10px] text-slate-500 font-normal">Ex: Manaus</span>
              </div>
            </div>
            <div className={`p-4 rounded-2xl border text-xs font-semibold ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-emerald-50/60 border-emerald-100 text-emerald-950'}`}>
              ⚠️ <strong>Regra de Ouro para Concursos:</strong> Os órgãos da Administração Direta (como Ministérios, Tribunais e Secretarias) <u>NÃO possuem personalidade jurídica própria</u>. Eles atuam em nome da pessoa política a que pertencem.
            </div>
          </section>

          {/* Seção 4: Administração Pública Indireta */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              4. Administração Pública Indireta
            </h2>
            <p className="text-sm">
              É formada por <strong>entidades dotadas de personalidade jurídica própria</strong>, criadas ou autorizadas por lei para desempenhar determinadas atividades administrativas com maior autonomia (descentralização):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  1. Autarquias
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Pessoas jurídicas de direito público criadas por lei para serviços típicos de Estado (ex: INSS, Banco Central, DETRAN).
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  2. Fundações Públicas
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Entidades voltadas a atividades de interesse social, pesquisas, cultura ou assistência (ex: FUNAI, Fiocruz).
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  3. Empresas Públicas
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Pessoas jurídicas de direito privado com 100% de capital público (ex: Caixa Econômica Federal, Correios).
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <h4 className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  4. Sociedades de Economia Mista
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Entidades com capital misto (público + privado), sob forma de Sociedade Anônima (ex: Banco do Brasil, Petrobras).
                </p>
              </div>
            </div>
          </section>

          {/* Seção 5: Finalidade & Interesse Público */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              5. Finalidade da Administração Pública & Interesse Público
            </h2>
            <p className="text-sm">
              A Administração Pública existe para <strong>atender ao interesse público</strong>, garantindo direitos e promovendo serviços essenciais, tais como:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold">
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">🏥 Saúde</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">🎓 Educação</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">👮 Segurança</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">⚖️ Justiça</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">🏗️ Infraestrutura</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">🚌 Transporte</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">🤝 Assistência Social</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">🌳 Meio Ambiente</span>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/60 border-blue-200'}`}>
              <h3 className="text-xs font-black uppercase text-blue-800 dark:text-blue-400 mb-1">
                O Princípio da Supremacia do Interesse Público
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                O <strong>interesse público</strong> representa o conjunto de necessidades da coletividade que justificam a atuação do Estado. Por essa razão, em eventual conflito entre o interesse de um indivíduo e o interesse coletivo, a lei concede prerrogativas à Administração para que o interesse da sociedade prevaleça.
              </p>
            </div>
          </section>

          {/* Seção 6: Organização e Importância para Concursos */}
          <section className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-purple-50/60 border-purple-200'}`}>
            <h3 className="text-xs font-black uppercase text-purple-800 dark:text-purple-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-purple-600" /> Importância para Concursos (TJAM)
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
              Os conceitos de <strong>Administração Pública</strong> (sentido objetivo vs subjetivo), <strong>Administração Direta e Indireta</strong>, diferença entre <strong>Governo e Administração</strong> e a <strong>finalidade do interesse público</strong> são temas cobrados com alta frequência em concursos públicos, inclusive para o cargo de <strong>Assistente Judiciário do TJAM</strong>. Dominar esses fundamentos facilitará o estudo dos princípios administrativos, atos administrativos e agentes públicos nas próximas aulas!
            </p>
          </section>

          {/* Dica de Memorização */}
          <section className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
              Dica de Memorização Rápida
            </span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
              Governo = Decide (Política) • Administração = Executa (Técnica) • Finalidade = Interesse Público!
            </p>
          </section>

          {/* Checklist da Aula */}
          <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação da Aula
            </h3>
            <div className="space-y-2 text-xs font-semibold">
              {[
                { id: 'c1', text: 'Compreendi o conceito de Administração Pública nos sentidos subjetivo e objetivo.' },
                { id: 'c2', text: 'Sei diferenciar a função do Governo (política) da função da Administração (execução).' },
                { id: 'c3', text: 'Conheço os entes da Administração Direta (União, Estados, DF e Municípios).' },
                { id: 'c4', text: 'Entendi quais são as 4 entidades da Administração Indireta (Autarquias, Fundações, EP e SEM).' },
                { id: 'c5', text: 'Reconheci que a finalidade precípua do Estado é a satisfação do Interesse Público.' },
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
              onClick={() => setActiveTab('mapa')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver Mapa Mental</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleMarkAsCompleted}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Marcar aula como concluída</span>
            </button>
          </div>
        </article>
      )}

      {/* TAB 2: MAPA MENTAL */}
      {activeTab === 'mapa' && (
        <div className="space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-6 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">
                Esquema Visual de Fixação
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Mapa Mental — Capítulo 1: Conceitos Fundamentais da Constituição
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Resumo visual dos conceitos, finalidade, importância, supremacia e aplicabilidade
              </p>
            </div>

            {/* Main Mind Map Image */}
            <div className="relative group max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-md">
              <img
                src={mindMapImg}
                alt="Mapa Mental - Capítulo 1: Conceitos Fundamentais da Constituição"
                referrerPolicy="no-referrer"
                onClick={() => setIsImageModalOpen(true)}
                className="w-full h-auto object-contain cursor-zoom-in hover:scale-[1.01] transition-transform duration-300"
              />
              <div 
                onClick={() => setIsImageModalOpen(true)}
                className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-sm shadow-xl">
                  <Maximize2 className="w-4 h-4 text-emerald-400" /> Clique para ampliar mapa mental
                </span>
              </div>
            </div>

            {/* Palavras-Chave & Download Controls */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-wrap justify-center gap-2">
                {['Constituição', 'Norma Suprema', 'Direitos Fundamentais', 'Organização do Estado', 'Supremacia Constitucional', 'CF/1988', 'Estado Democrático de Direito'].map(kw => (
                  <span key={kw} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    #{kw}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-extrabold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Maximize2 className="w-4 h-4 text-emerald-500" />
                  <span>Ampliar Mapa</span>
                </button>

                <button
                  onClick={handleDownloadMapImage}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Mapa Mental (Imagem HD)</span>
                </button>

                <a
                  href={mindMapImg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-extrabold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                  <span>Abrir em Nova Aba</span>
                </a>
              </div>
            </div>
          </div>

          {/* Modal / Lightbox for Full View */}
          {isImageModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-3">
                <div className="w-full flex items-center justify-between text-white px-2">
                  <span className="font-bold text-xs">
                    Mapa Mental — Capítulo 1: Conceitos Fundamentais da Constituição
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={handleDownloadMapImage}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Baixar Imagem HD
                    </button>
                    <a
                      href={mindMapImg}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> Nova Aba
                    </a>
                    <button
                      onClick={() => setIsImageModalOpen(false)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="w-full overflow-auto max-h-[80vh] rounded-2xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center">
                  <img
                    src={mindMapImg}
                    alt="Mapa Mental Ampliado"
                    referrerPolicy="no-referrer"
                    className="max-w-full h-auto object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">
              Fixação Ativa
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Flashcards da Aula 1
            </h2>
            <p className="text-xs text-slate-500">
              Cartão {currentFlashcardIndex + 1} de {flashcardsData.length}
            </p>
          </div>

          {/* Flashcard Component */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[220px] p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative ${
              isFlipped
                ? 'bg-emerald-600 text-white border-emerald-600'
                : isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300'
            }`}
          >
            <span className={`absolute top-4 right-4 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full ${
              isFlipped ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              {isFlipped ? 'Resposta' : 'Pergunta (Clique para virar)'}
            </span>

            <p className="text-base sm:text-lg font-bold px-4">
              {isFlipped ? flashcardsData[currentFlashcardIndex].a : flashcardsData[currentFlashcardIndex].q}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentFlashcardIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentFlashcardIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>

            <button
              onClick={() => {
                setLearnedCards(prev => ({ ...prev, [currentFlashcardIndex]: true }));
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                learnedCards[currentFlashcardIndex]
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <Check className="w-4 h-4" />
              {learnedCards[currentFlashcardIndex] ? 'Aprendido ✓' : 'Marcar Aprendido'}
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentFlashcardIndex(prev => Math.min(flashcardsData.length - 1, prev + 1));
              }}
              disabled={currentFlashcardIndex === flashcardsData.length - 1}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            >
              Próximo <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: QUESTÕES */}
      {activeTab === 'questoes' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">
              Treinamento de Fixação — Capítulo 1
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Exercícios de Fixação (20 Questões)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Questões inéditas organizadas para validar seu aprendizado
            </p>
          </div>

          {/* Sub-Filter Tabs for 20 questions */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setExerciseFilter('todos')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                exerciseFilter === 'todos'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Todas (20)
            </button>
            <button
              onClick={() => setExerciseFilter('mc')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                exerciseFilter === 'mc'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Múltipla Escolha (1-10)
            </button>
            <button
              onClick={() => setExerciseFilter('vf')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                exerciseFilter === 'vf'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Certo / Errado (11-15)
            </button>
            <button
              onClick={() => setExerciseFilter('discursiva')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                exerciseFilter === 'discursiva'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Discursivas (16-20)
            </button>
          </div>

          <div className="space-y-6">
            {/* 1. MÚLTIPLA ESCOLHA (1 a 10) */}
            {(exerciseFilter === 'todos' || exerciseFilter === 'mc') && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 pb-2">
                  <span>Part I — Questões de Múltipla Escolha (1 a 10)</span>
                </div>

                {questionsData.map((q, qIndex) => (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-extrabold uppercase">Questão {qIndex + 1} de 20</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md font-bold">Múltipla Escolha</span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                      {q.enunciado}
                    </p>

                    <div className="space-y-2">
                      {q.alternativas.map((alt, altIdx) => {
                        const isSelected = selectedAnswers[q.id] === altIdx;
                        const isSubmitted = showQuestionResults[q.id];
                        const isCorrect = altIdx === q.correta;

                        let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300';
                        if (isSelected) btnStyle = 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200 font-bold';
                        if (isSubmitted) {
                          if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold';
                          else if (isSelected) btnStyle = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300 font-bold';
                        }

                        return (
                          <button
                            key={altIdx}
                            disabled={isSubmitted}
                            onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: altIdx }))}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                          >
                            <span className="font-bold text-slate-400">{String.fromCharCode(65 + altIdx)})</span>
                            <span className="flex-1">{alt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!showQuestionResults[q.id] ? (
                      <button
                        disabled={selectedAnswers[q.id] === undefined}
                        onClick={() => setShowQuestionResults(prev => ({ ...prev, [q.id]: true }))}
                        className="w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs disabled:opacity-40 hover:bg-emerald-700 cursor-pointer shadow-md"
                      >
                        Responder Questão
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">
                          ✓ Comentário da Questão:
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">{q.explicacao}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 2. VERDADEIRO OU FALSO (11 a 15) */}
            {(exerciseFilter === 'todos' || exerciseFilter === 'vf') && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 pb-2">
                  <span>Part II — Verdadeiro ou Falso (11 a 15)</span>
                </div>

                {tfQuestionsData.map((q) => (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-extrabold uppercase">Questão {q.id} de 20</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md font-bold">Certo / Errado</span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                      {q.enunciado}
                    </p>

                    <div className="flex gap-3">
                      <button
                        disabled={tfSubmitted[q.id]}
                        onClick={() => setTfAnswers(prev => ({ ...prev, [q.id]: true }))}
                        className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          tfAnswers[q.id] === true
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        } ${
                          tfSubmitted[q.id] && q.correta === true
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 font-extrabold'
                            : ''
                        }`}
                      >
                        ✅ Verdadeiro
                      </button>

                      <button
                        disabled={tfSubmitted[q.id]}
                        onClick={() => setTfAnswers(prev => ({ ...prev, [q.id]: false }))}
                        className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          tfAnswers[q.id] === false
                            ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        } ${
                          tfSubmitted[q.id] && q.correta === false
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 font-extrabold'
                            : ''
                        }`}
                      >
                        ❌ Falso
                      </button>
                    </div>

                    {!tfSubmitted[q.id] ? (
                      <button
                        disabled={tfAnswers[q.id] === undefined}
                        onClick={() => setTfSubmitted(prev => ({ ...prev, [q.id]: true }))}
                        className="w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs disabled:opacity-40 hover:bg-emerald-700 cursor-pointer shadow-md"
                      >
                        Responder
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">
                          {tfAnswers[q.id] === q.correta ? 'Resposta Correta! 🎉' : 'Resposta Incorreta'}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">{q.explicacao}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 3. QUESTÕES DISCURSIVAS (16 a 20) */}
            {(exerciseFilter === 'todos' || exerciseFilter === 'discursiva') && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 pb-2">
                  <span>Part III — Questões Discursivas (16 a 20)</span>
                </div>

                {discursiveQuestionsData.map((q) => (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-extrabold uppercase">Questão {q.id} de 20</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md font-bold">Discursiva</span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                      {q.enunciado}
                    </p>

                    <textarea
                      rows={3}
                      value={discursiveAnswers[q.id] || ''}
                      onChange={(e) => setDiscursiveAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Escreva sua resposta aqui para treinar para a prova discursiva..."
                      className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />

                    {!discursiveSubmitted[q.id] ? (
                      <button
                        onClick={() => setDiscursiveSubmitted(prev => ({ ...prev, [q.id]: true }))}
                        className="w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 cursor-pointer shadow-md"
                      >
                        Ver Resposta Esperada / Gabarito
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
                        <p className="font-extrabold text-emerald-700 dark:text-emerald-400">
                          Gabarito Comentado / Resposta Esperada:
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.respostaEsperada}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: RESUMO */}
      {activeTab === 'resumo' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className={`p-8 rounded-3xl border space-y-6 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-1 text-center">
              <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">
                Síntese Rápida
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Resumo da Aula 1
              </h2>
            </div>

            <ul className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-emerald-500 font-bold">•</span>
                <span>A Constituição é a <strong>lei mais importante e suprema</strong> do país.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Nenhuma outra norma</strong> (lei, decreto, ato) pode contrariá-la sem padece de inconstitucionalidade.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Organiza politicamente o Estado brasileiro e a divisão dos Três Poderes.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Define e assegura os <strong>direitos e garantias fundamentais</strong> do cidadão.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Limita o poder estatal evitando arbitrariedades e garantindo a segurança jurídica.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
              <button
                onClick={handleMarkAsCompleted}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Marcar aula como concluída
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
