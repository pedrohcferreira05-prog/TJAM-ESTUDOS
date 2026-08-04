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

  // Lesson Content Data
  const flashcardsData = [
    {
      q: 'O que é a Constituição?',
      a: 'A lei fundamental e suprema do Estado, que organiza seus poderes, forma de governo e garante os direitos e deveres fundamentais.'
    },
    {
      q: 'Qual é a Constituição vigente no Brasil?',
      a: 'A Constituição Federal de 1988, conhecida como Constituição Cidadã.'
    },
    {
      q: 'Por que a Constituição é considerada suprema?',
      a: 'Porque ocupa o topo da hierarquia das normas e todas as demais normas devem estar em estrita conformidade com ela.'
    },
    {
      q: 'O que acontece quando uma lei contraria a Constituição?',
      a: 'Ela padece do vício de inconstitucionalidade e pode ser declarada inconstitucional pelo Poder Judiciário.'
    }
  ];

  // Questions Data
  const questionsData = [
    {
      id: 1,
      enunciado: '1. A Constituição Federal pode ser definida como:',
      alternativas: [
        'Um conjunto de decretos do Poder Executivo.',
        'A lei fundamental e suprema do Estado.',
        'Uma norma criada apenas pelo Poder Judiciário.',
        'Um regulamento administrativo.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A Constituição é a lei fundamental e suprema do Estado, que organiza a estrutura política, limita o poder público e estabelece os direitos fundamentais.'
    },
    {
      id: 2,
      enunciado: '2. A principal função da Constituição é:',
      alternativas: [
        'Regular apenas o funcionamento dos municípios.',
        'Organizar o Estado e garantir direitos fundamentais.',
        'Criar impostos.',
        'Regulamentar somente o Poder Judiciário.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A função primordial da Carta Magna é estruturar as instituições do Estado, estabelecer a separação dos Poderes e proteger as garantias essenciais da pessoa humana.'
    },
    {
      id: 3,
      enunciado: '3. A Constituição Federal atualmente em vigor no Brasil foi promulgada em:',
      alternativas: [
        '1967',
        '1985',
        '1988',
        '1990'
      ],
      correta: 2,
      explicacao: 'Gabarito C: A atual Carta Magna do Brasil foi promulgada pela Assembleia Nacional Constituintem em 5 de outubro de 1988.'
    },
    {
      id: 4,
      enunciado: '4. A Constituição Federal de 1988 é conhecida como:',
      alternativas: [
        'Constituição Imperial.',
        'Constituição Democrática.',
        'Constituição Cidadã.',
        'Constituição Republicana.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: O apelido "Constituição Cidadã" foi consagrado por Ulysses Guimarães por conta do vasto rol de direitos e garantias sociais e fundamentais assegurados.'
    },
    {
      id: 5,
      enunciado: '5. O princípio da supremacia constitucional significa que:',
      alternativas: [
        'A Constituição está acima de todas as demais normas.',
        'Os decretos possuem a mesma força da Constituição.',
        'As leis municipais prevalecem sobre a Constituição.',
        'Todas as leis possuem o mesmo nível hierárquico.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: O princípio da supremacia estabelece que a Constituição ocupa o ápice do ordenamento jurídico, devendo toda e qualquer norma inferior conformar-se a ela.'
    },
    {
      id: 6,
      enunciado: '6. Caso uma lei seja incompatível com a Constituição Federal, ela poderá ser:',
      alternativas: [
        'Revogada pelo Prefeito.',
        'Declarada inconstitucional.',
        'Transformada automaticamente em decreto.',
        'Aplicada normalmente.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Incompatibilidades formais ou materiais de normas inferiores com o texto constitucional geram o vício da inconstitucionalidade, passível de declaração pelo Poder Judiciário.'
    },
    {
      id: 7,
      enunciado: '7. A Constituição estabelece, entre outros assuntos:',
      alternativas: [
        'Apenas regras tributárias.',
        'Somente normas eleitorais.',
        'Organização do Estado, direitos fundamentais e divisão dos Poderes.',
        'Apenas normas penais.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: A Carta Magna abrange matérias estruturantes do país, desde a repartição de competências até o funcionamento dos Poderes Executivo, Legislativo e Judiciário.'
    },
    {
      id: 8,
      enunciado: '8. Os direitos fundamentais previstos na Constituição têm como objetivo principal:',
      alternativas: [
        'Limitar apenas os cidadãos.',
        'Garantir proteção à dignidade da pessoa humana.',
        'Criar novos tributos.',
        'Organizar apenas o Poder Executivo.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O núcleo axiológico das Constituições modernas é a tutela da dignidade da pessoa humana, resguardando liberdades públicas e garantias sociais.'
    },
    {
      id: 9,
      enunciado: '9. A Constituição ocupa qual posição na hierarquia das normas?',
      alternativas: [
        'A última.',
        'A intermediária.',
        'A mais alta.',
        'A mesma das leis ordinárias.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: De acordo com a pirâmide normativa Kelseniana, a Constituição ocupa o ápice (posição mais elevada) da estrutura das normas.'
    },
    {
      id: 10,
      enunciado: '10. Todas as leis produzidas no Brasil devem:',
      alternativas: [
        'Ser aprovadas pelos municípios.',
        'Respeitar a Constituição Federal.',
        'Ser aprovadas pelo Supremo Tribunal Federal.',
        'Ser editadas pelo Presidente da República.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O ordenamento jurídico pauta-se pelo princípio da compatibilidade vertical, obrigando a conformação de leis federais, estaduais e municipais à Constituição.'
    }
  ];

  const tfQuestionsData = [
    {
      id: 11,
      enunciado: '11. A Constituição organiza a estrutura do Estado brasileiro.',
      correta: true,
      explicacao: 'Gabarito: VERDADEIRO ✅. É função precípua da Constituição organizar a forma do Estado (Federação), a forma de Governo (República) e o sistema de governo.'
    },
    {
      id: 12,
      enunciado: '12. Uma lei ordinária pode contrariar a Constituição Federal.',
      correta: false,
      explicacao: 'Gabarito: FALSO ❌. Nenhuma lei ordinária pode contrariar o texto constitucional. Se o fizer, será declarada inconstitucional.'
    },
    {
      id: 13,
      enunciado: '13. A Constituição Federal protege direitos fundamentais.',
      correta: true,
      explicacao: 'Gabarito: VERDADEIRO ✅. Os Direitos e Garantias Fundamentais constituem dogmática central da CF/88 (Art. 5º e ss).'
    },
    {
      id: 14,
      enunciado: '14. A Constituição Federal de 1988 marcou o fortalecimento da democracia no Brasil.',
      correta: true,
      explicacao: 'Gabarito: VERDADEIRO ✅. Promulgada após o regime militar, restabeleceu o Estado Democrático de Direito e o sufrágio universal.'
    },
    {
      id: 15,
      enunciado: '15. A supremacia constitucional significa que todas as normas devem respeitar a Constituição.',
      correta: true,
      explicacao: 'Gabarito: VERDADEIRO ✅. Todas as leis, decretos e atos administrativos subordinam-se estritamente ao texto constitucional.'
    }
  ];

  const discursiveQuestionsData = [
    {
      id: 16,
      enunciado: '16. Explique, com suas palavras, o que é a Constituição.',
      respostaEsperada: 'A Constituição é a lei fundamental e suprema de um país. Ela organiza o Estado, limita o poder dos governantes, define a divisão dos Poderes (Executivo, Legislativo e Judiciário) e assegura os direitos e garantias fundamentais dos cidadãos.'
    },
    {
      id: 17,
      enunciado: '17. Por que a Constituição é considerada a norma suprema do ordenamento jurídico brasileiro?',
      respostaEsperada: 'Porque ela ocupa o topo da hierarquia das leis (Pirâmide de Kelsen). Nenhuma outra lei, decreto ou ato administrativo pode contrariar seus preceitos, devendo todas as normas guardar compatibilidade com o texto constitucional.'
    },
    {
      id: 18,
      enunciado: '18. Cite três funções exercidas pela Constituição Federal.',
      respostaEsperada: '1) Organizar a estrutura política do Estado e da Administração Pública; 2) Limitar o poder estatal para evitar arbitrariedades; 3) Definir e proteger os direitos e garantias fundamentais do indivíduo e da sociedade.'
    },
    {
      id: 19,
      enunciado: '19. Qual é a importância dos direitos fundamentais previstos na Constituição?',
      respostaEsperada: 'Os direitos fundamentais são essenciais para resguardar a dignidade da pessoa humana, protegendo os cidadãos contra abusos estatais e garantindo condições indispensáveis de vida, liberdade, igualdade e segurança jurídica.'
    },
    {
      id: 20,
      enunciado: '20. Explique o que pode acontecer quando uma lei contraria a Constituição Federal.',
      respostaEsperada: 'Quando uma lei contraria a Constituição, ela padece do vício da inconstitucionalidade. Essa lei pode ser submetida ao controle de constitucionalidade e ser declarada inconstitucional pelo Poder Judiciário, sendo impedida de produzir efeitos no ordenamento.'
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
          <span>Direito Constitucional</span>
          <span>•</span>
          <span>Unidade 1 — Constituição Federal</span>
          <span>•</span>
          <span>Capítulo 1 — Conceitos Fundamentais</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              Aula de Hoje (Terça-feira)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Aula 1 — O que é Constituição?
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              45 min
            </span>
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Iniciante
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
              O conteúdo de hoje foi concluído com sucesso.
            </p>
            <p className="text-xs text-slate-500">
              Retorne amanhã para continuar sua preparação.
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
                  Direito Constitucional — Conceitos Fundamentais da Constituição
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Capítulo 1 • Preparação Completa TJAM / Concursos
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
                src="https://www.youtube.com/embed/ApUImPEZOu0?autoplay=0&rel=0"
                title="Vídeo Aula - Conceitos Fundamentais da Constituição"
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
                    <span>Conceito sociológico, político e jurídico de Constituição.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Princípio da Supremacia Constitucional e Hierarquia das Normas (Pirâmide de Kelsen).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Constituição Cidadã de 1988 e a proteção dos Direitos e Garantias Fundamentais.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Organização dos Poderes e a estrutura do Estado brasileiro.</span>
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
              <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Ao concluir esta aula, você será capaz de:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Compreender o conceito de Constituição.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Entender a importância da Constituição para o Estado.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Identificar por que ela é considerada a norma mais importante do país.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Reconhecer sua função na organização dos Poderes e na proteção dos direitos fundamentais.</span>
              </li>
            </ul>
          </section>

          {/* Introdução */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              1. Introdução
            </h2>
            <p className="text-sm">
              Toda sociedade precisa de regras para funcionar de maneira organizada. Essas regras determinam como o Estado é estruturado, quais são os direitos dos cidadãos e quais são os limites da atuação do governo.
            </p>
            <p className="text-sm">
              No Brasil, essas regras fundamentais estão reunidas na <strong>Constituição Federal de 1988</strong>, conhecida como <em>Constituição Cidadã</em>. Ela é a base de todo o ordenamento jurídico brasileiro.
            </p>
          </section>

          {/* O que é a Constituição? */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              2. O que é a Constituição?
            </h2>
            <p className="text-sm">
              A Constituição é a <strong>lei fundamental e suprema do Estado</strong>.
            </p>
            <div className={`p-5 rounded-2xl border space-y-2 text-xs ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Ela estabelece:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <li>A organização do Estado;</li>
                <li>A forma de governo;</li>
                <li>A divisão dos Poderes (Executivo, Legislativo e Judiciário);</li>
                <li>Os direitos e garantias fundamentais;</li>
                <li>Os deveres do Estado;</li>
                <li>Os princípios que orientam toda a Administração Pública.</li>
              </ul>
              <p className="pt-2 font-bold text-emerald-600 dark:text-emerald-400">
                Todas as demais leis devem obrigatoriamente respeitar a Constituição.
              </p>
            </div>
          </section>

          {/* Por que a Constituição é importante? */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              3. Por que a Constituição é importante?
            </h2>
            <p className="text-sm">
              A Constituição garante <strong>segurança jurídica</strong> e impede que o poder público atue de forma arbitrária.
            </p>
            <p className="text-sm">Ela protege direitos fundamentais como:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold">
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Vida</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Liberdade</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Igualdade</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Segurança</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Propriedade</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Devido processo legal</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Ampla defesa</span>
              <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Contraditório</span>
            </div>
            <p className="text-xs text-slate-500 italic">
              Sem uma Constituição, não existiria uma regra superior capaz de limitar o poder do Estado sobre os cidadãos.
            </p>
          </section>

          {/* A Constituição como norma suprema */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              4. A Constituição como norma suprema
            </h2>
            <p className="text-sm">
              A Constituição ocupa o <strong>topo da hierarquia das normas</strong> (Pirâmide de Kelsen).
            </p>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/60 border-amber-200'}`}>
              <h3 className="text-xs font-black uppercase text-amber-800 dark:text-amber-400 mb-2">
                Isso significa que:
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <li>• <strong>Nenhuma lei</strong> pode contrariá-la;</li>
                <li>• <strong>Nenhum decreto</strong> pode desrespeitá-la;</li>
                <li>• <strong>Nenhum ato administrativo</strong> pode violá-la.</li>
              </ul>
              <p className="mt-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                Quando uma norma inferior desrespeita a Constituição, ela pode ser declarada <u>inconstitucional</u>.
              </p>
            </div>
          </section>

          {/* O que a Constituição organiza? */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              5. O que a Constituição organiza?
            </h2>
            <p className="text-sm">Entre outros temas cruciais, a Constituição disciplina:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">🏛️ Os Poderes Executivo, Legislativo e Judiciário</li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">🇧🇷 A Federação brasileira</li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">🏙️ Os Municípios, Estados e Distrito Federal</li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">🛡️ Os direitos fundamentais</li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">📈 A ordem econômica</li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">👥 A ordem social</li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">💰 A tributação e orçamento</li>
              <li className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">👮 A segurança pública</li>
            </ul>
          </section>

          {/* Constituição Federal de 1988 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              6. Constituição Federal de 1988
            </h2>
            <p className="text-sm">
              A atual Carta Magna entrou em vigor em <strong>5 de outubro de 1988</strong>. Ela foi promulgada após o período do regime militar e marcou formalmente a redemocratização e o retorno do <strong>Estado Democrático de Direito</strong> no Brasil.
            </p>
            <p className="text-sm">
              Por ampliar significativamente a proteção aos direitos sociais e individuais, ficou consagrada como <strong>Constituição Cidadã</strong>.
            </p>
          </section>

          {/* Exemplo Prático */}
          <section className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/60 border-blue-200'}`}>
            <h3 className="text-xs font-black uppercase text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-blue-600" /> Exemplo Prático
            </h3>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
              Imagine que uma lei estadual proibisse um cidadão de exercer um direito expressamente garantido pela Constituição Federal. Mesmo tendo sido votada e aprovada pela Assembleia Legislativa do Estado, essa lei estadual será declarada <strong>inconstitucional</strong> por contrariar a lei suprema do país.
            </p>
          </section>

          {/* Atenção para provas */}
          <section className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-purple-50/60 border-purple-200'}`}>
            <h3 className="text-xs font-black uppercase text-purple-800 dark:text-purple-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-purple-600" /> Atenção para Concursos & Provas
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Bancas examinadoras (como FGV, Cebraspe, Vunesp) costumam cobrar frequentemente:
            </p>
            <ul className="list-disc list-inside text-xs font-bold text-slate-800 dark:text-slate-200 space-y-1">
              <li>Conceito político, jurídico e sociológico de Constituição</li>
              <li>Princípio da Supremacia Constitucional</li>
              <li>Marcos históricos da CF/1988 ("Constituição Cidadã")</li>
              <li>Funções primordiais da Constituição e eficácia dos Direitos Fundamentais</li>
            </ul>
          </section>

          {/* Dicas de memorização */}
          <section className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
              Dica de Memorização
            </span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
              Constituição → Organiza o Estado → Protege Direitos → Limita o Poder → Orienta todas as leis.
            </p>
          </section>

          {/* Checklist da Aula */}
          <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação da Aula
            </h3>
            <div className="space-y-2 text-xs font-semibold">
              {[
                { id: 'c1', text: 'Compreendi o conceito de Constituição.' },
                { id: 'c2', text: 'Entendi por que ela é a norma suprema do ordenamento.' },
                { id: 'c3', text: 'Conheço a importância histórica da Constituição Federal de 1988.' },
                { id: 'c4', text: 'Sei explicar suas principais funções de limitação do poder estatal.' },
                { id: 'c5', text: 'Estou pronto para praticar exercícios e avançar para a Aula 2.' },
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
