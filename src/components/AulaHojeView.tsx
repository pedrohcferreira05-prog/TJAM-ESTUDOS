import React, { useState, useEffect } from 'react';
import { Question } from '../types';
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
  Play,
  Trophy,
  Medal
} from 'lucide-react';

interface AulaHojeViewProps {
  isDarkMode: boolean;
  onNavigateTab: (tab: any) => void;
}

const mindMapImg = '/mapa_mental_constituicao.jpg';

export const AulaHojeView: React.FC<AulaHojeViewProps> = ({ isDarkMode, onNavigateTab }) => {
  const [realProgressPct] = useState(() => {
    try {
      const p = localStorage.getItem('tjam_user_progress');
      if (p) {
        const parsed = JSON.parse(p);
        return Math.min(100, Math.round(((parsed.completedTopicIds?.length || 0) / 30) * 100));
      }
    } catch (e) {}
    return 0;
  });

  // Selected Subject State: 'portugues', 'libras', 'processo_penal', 'processo_civil', 'informatica', 'direito_admin', or 'direito_const'
  const [selectedSubject, setSelectedSubjectState] = useState<'portugues' | 'libras' | 'processo_penal' | 'processo_civil' | 'informatica' | 'direito_admin' | 'direito_const'>(() => {
    try {
      const saved = localStorage.getItem('tjam_selected_subject');
      if (saved && ['portugues', 'libras', 'processo_penal', 'processo_civil', 'informatica', 'direito_admin', 'direito_const'].includes(saved)) {
        return saved as any;
      }
    } catch (e) {}
    return 'processo_penal';
  });

  const setSelectedSubject = (subject: 'portugues' | 'libras' | 'processo_penal' | 'processo_civil' | 'informatica' | 'direito_admin' | 'direito_const') => {
    try {
      localStorage.setItem('tjam_selected_subject', subject);
    } catch (e) {}
    setSelectedSubjectState(subject);
  };

  useEffect(() => {
    const handleSubjectChange = () => {
      try {
        const saved = localStorage.getItem('tjam_selected_subject');
        if (saved && ['portugues', 'libras', 'processo_penal', 'processo_civil', 'informatica', 'direito_admin', 'direito_const'].includes(saved)) {
          setSelectedSubjectState(saved as any);
        }
      } catch (e) {}
    };
    window.addEventListener('tjam_subject_change', handleSubjectChange);
    return () => window.removeEventListener('tjam_subject_change', handleSubjectChange);
  }, []);

  // Navigation inside lesson steps - default to 'conteudo' (Texto da Aula)
  const [activeTab, setActiveTab] = useState<'video' | 'conteudo' | 'mapa' | 'flashcards' | 'questoes' | 'resumo'>('conteudo');
  const [selectedVideoPart, setSelectedVideoPart] = useState<'video1' | 'video2' | 'video_extra'>('video1');
  
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

  // Saved lessons store for real-time local database sync
  const [savedLessonsStore, setSavedLessonsStore] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('tjam_lessons_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  // Load saved state when selectedSubject changes
  useEffect(() => {
    try {
      const savedStr = localStorage.getItem('tjam_lessons_progress');
      const store = savedStr ? JSON.parse(savedStr) : {};
      setSavedLessonsStore(store);

      const subjectData = store[selectedSubject];
      if (subjectData) {
        setSelectedAnswers(subjectData.selectedAnswers || {});
        setShowQuestionResults(subjectData.showQuestionResults || {});
        setTfAnswers(subjectData.tfAnswers || {});
        setTfSubmitted(subjectData.tfSubmitted || {});
        setDiscursiveAnswers(subjectData.discursiveAnswers || {});
        setDiscursiveSubmitted(subjectData.discursiveSubmitted || {});
        setChecklist(subjectData.checklist || { c1: false, c2: false, c3: false, c4: false, c5: false });
        setIsLessonCompleted(!!subjectData.completed);
        if (subjectData.learnedCards) setLearnedCards(subjectData.learnedCards);
      } else {
        setSelectedAnswers({});
        setShowQuestionResults({});
        setTfAnswers({});
        setTfSubmitted({});
        setDiscursiveAnswers({});
        setDiscursiveSubmitted({});
        setChecklist({ c1: false, c2: false, c3: false, c4: false, c5: false });
        setIsLessonCompleted(false);
        setLearnedCards({});
      }
    } catch (e) {
      console.error('Error restoring lesson progress:', e);
    }
  }, [selectedSubject]);

  // Persist state when answers, checklist or completion status change
  useEffect(() => {
    try {
      const savedStr = localStorage.getItem('tjam_lessons_progress');
      const store = savedStr ? JSON.parse(savedStr) : {};

      const currentData = {
        subjectKey: selectedSubject,
        completed: isLessonCompleted,
        completedAt: isLessonCompleted ? (store[selectedSubject]?.completedAt || new Date().toISOString()) : undefined,
        selectedAnswers,
        showQuestionResults,
        tfAnswers,
        tfSubmitted,
        discursiveAnswers,
        discursiveSubmitted,
        checklist,
        learnedCards,
        lastUpdated: new Date().toISOString(),
      };

      store[selectedSubject] = currentData;
      setSavedLessonsStore(store);
      localStorage.setItem('tjam_lessons_progress', JSON.stringify(store));

      // Also sync into main tjam_user_progress object
      const userProgressStr = localStorage.getItem('tjam_user_progress');
      if (userProgressStr) {
        const userProg = JSON.parse(userProgressStr);
        userProg.savedLessons = store;

        const topicIdMap: Record<string, string> = {
          portugues: 'port-1',
          libras: 'acess-1',
          processo_penal: 'pp-3',
          processo_civil: 'pc-1',
          informatica: 'inf-1',
          direito_admin: 'adm-1',
          direito_const: 'const-3',
        };
        const tid = topicIdMap[selectedSubject];
        if (tid) {
          let completedTopicIds: string[] = userProg.completedTopicIds || [];
          if (isLessonCompleted && !completedTopicIds.includes(tid)) {
            completedTopicIds = [...completedTopicIds, tid];
          } else if (!isLessonCompleted && completedTopicIds.includes(tid)) {
            completedTopicIds = completedTopicIds.filter((id) => id !== tid);
          }
          userProg.completedTopicIds = completedTopicIds;
        }

        localStorage.setItem('tjam_user_progress', JSON.stringify(userProg));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error('Error saving lesson progress:', e);
    }
  }, [
    selectedSubject,
    selectedAnswers,
    showQuestionResults,
    tfAnswers,
    tfSubmitted,
    discursiveAnswers,
    discursiveSubmitted,
    checklist,
    isLessonCompleted,
    learnedCards,
  ]);

  const handleResetLessonExercises = () => {
    if (window.confirm('Deseja refazer os exercícios desta aula? Suas respostas serão zeradas para que você possa praticar novamente, mas o registro de leitura/aula continuará salvo.')) {
      setSelectedAnswers({});
      setShowQuestionResults({});
      setTfAnswers({});
      setTfSubmitted({});
      setDiscursiveAnswers({});
      setDiscursiveSubmitted({});
    }
  };

  // Português Datasets (Aula 1 — Compreensão e Interpretação de Textos)
  const portuguesFlashcardsData = [
    {
      q: 'Qual é a diferença entre Compreensão e Interpretação de textos?',
      a: 'Compreensão busca informações explícitas (está escrito no texto). Interpretação envolve conclusões e inferências lógicas (está implícito, mas sustentado pelo texto).'
    },
    {
      q: 'O que caracteriza uma informação explícita?',
      a: 'É aquela apresentada diretamente e de forma clara no texto, sem necessidade de deduções.'
    },
    {
      q: 'O que é uma informação implícita e o que requer para ser válida?',
      a: 'É aquela deduzida do texto. Toda inferência válida precisa ter sustentação e fundamento nas pistas fornecidas pelo texto, sem inventar dados.'
    },
    {
      q: 'Qual a diferença entre Tema e Ideia Principal?',
      a: 'Tema é o assunto abrangente (ex: tecnologia no Judiciário). Ideia principal é a posição ou mensagem central do autor sobre esse assunto.'
    },
    {
      q: 'Qual a diferença entre Tipo Textual e Gênero Textual?',
      a: 'Tipo textual é a estrutura linguística predominante (Narrativo, Descritivo, Dissertativo, Injuntivo). Gênero textual é a forma concreta de comunicação social (Notícia, Edital, Artigo, E-mail).'
    },
    {
      q: 'O que significa inferência em questões de concurso?',
      a: 'É chegar a uma conclusão fundamentada a partir de informações disponíveis no texto, sem extrapolá-las.'
    }
  ];

  const portuguesMcQuestionsData = [
    // Texto 1: Questões 1 a 5
    {
      id: 101,
      enunciado: '1. [Texto 1] O tema principal do texto é:',
      textoApoio: 'O avanço da tecnologia modificou a maneira como os serviços públicos são prestados. No Poder Judiciário, ferramentas digitais podem facilitar o acesso aos processos, reduzir o tempo de determinadas atividades e melhorar a comunicação com os usuários. Entretanto, a utilização da tecnologia não elimina a necessidade de servidores capacitados. A eficiência depende tanto das ferramentas disponíveis quanto da preparação das pessoas que as utilizam.',
      opcoes: [
        'A) A substituição dos servidores pela tecnologia.',
        'B) A importância dos processos físicos.',
        'C) Os efeitos da tecnologia na prestação dos serviços públicos.',
        'D) A dificuldade de acesso ao Poder Judiciário.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: O texto aborda os impactos da tecnologia na prestação dos serviços públicos e a relação de complementaridade com a capacitação dos servidores.'
    },
    {
      id: 102,
      enunciado: '2. [Texto 1] Segundo o texto, a tecnologia pode:',
      opcoes: [
        'A) Eliminar completamente o trabalho dos servidores.',
        'B) Facilitar o acesso aos processos e melhorar a comunicação.',
        'C) Impedir a comunicação com os usuários.',
        'D) Tornar desnecessária a capacitação profissional.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Está expresso literalmente no texto: "ferramentas digitais podem facilitar o acesso aos processos, reduzir o tempo de determinadas atividades e melhorar a comunicação com os usuários".'
    },
    {
      id: 103,
      enunciado: '3. [Texto 1] De acordo com o texto, a eficiência depende:',
      opcoes: [
        'A) Somente das ferramentas tecnológicas.',
        'B) Somente da quantidade de servidores.',
        'C) Das ferramentas disponíveis e da preparação das pessoas que as utilizam.',
        'D) Exclusivamente da redução de custos.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: Conforme a frase final: "A eficiência depende tanto das ferramentas disponíveis quanto da preparação das pessoas que as utilizam."'
    },
    {
      id: 104,
      enunciado: '4. [Texto 1] A palavra "Entretanto" estabelece uma relação de:',
      opcoes: [
        'A) Adição.',
        'B) Oposição/contraste.',
        'C) Conclusão.',
        'D) Explicação.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: "Entretanto" é uma conjunção adversativa que introduz uma ideia de oposição ou contraste em relação ao que foi dito anteriormente.'
    },
    {
      id: 105,
      enunciado: '5. [Texto 1] Pode-se inferir do texto que:',
      opcoes: [
        'A) A tecnologia, sozinha, não garante eficiência.',
        'B) Servidores não são mais necessários.',
        'C) Processos digitais são sempre mais rápidos.',
        'D) O atendimento público deve ser exclusivamente virtual.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: Como a eficiência exige também servidores capacitados, infere-se logicamente que a tecnologia isolada não assegura a eficiência.'
    },

    // Texto 2: Questões 6 a 10
    {
      id: 106,
      enunciado: '6. [Texto 2] A ideia principal do texto é que:',
      textoApoio: 'Estudar para um concurso exige mais do que acumular horas diante dos livros. É necessário estabelecer objetivos, organizar o tempo e acompanhar o próprio desempenho. Quando o estudante identifica os assuntos em que apresenta maior dificuldade, consegue direcionar melhor sua revisão. Dessa forma, estudar com planejamento pode ser mais produtivo do que simplesmente aumentar a quantidade de horas estudadas.',
      opcoes: [
        'A) Estudar muitas horas é sempre suficiente.',
        'B) O planejamento pode tornar os estudos mais produtivos.',
        'C) Revisões devem ser evitadas.',
        'D) O estudante deve estudar apenas as matérias fáceis.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A mensagem central é que o planejamento e a organização trazem maior produtividade ao processo de estudo do que o mero acúmulo de horas.'
    },
    {
      id: 107,
      enunciado: '7. [Texto 2] Segundo o texto, identificar dificuldades permite ao estudante:',
      opcoes: [
        'A) Abandonar os assuntos difíceis.',
        'B) Direcionar melhor sua revisão.',
        'C) Diminuir obrigatoriamente o tempo de estudo.',
        'D) Estudar somente uma disciplina.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O texto afirma expressamente: "Quando o estudante identifica os assuntos em que apresenta maior dificuldade, consegue direcionar melhor sua revisão."'
    },
    {
      id: 108,
      enunciado: '8. [Texto 2] A expressão "Dessa forma" introduz uma ideia de:',
      opcoes: [
        'A) Conclusão.',
        'B) Oposição.',
        'C) Dúvida.',
        'D) Comparação.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: "Dessa forma" atua como elemento de coesão conclusiva, sintetizando a dedução final do parágrafo.'
    },
    {
      id: 109,
      enunciado: '9. [Texto 2] O texto afirma que estudar com planejamento pode ser:',
      opcoes: [
        'A) Menos produtivo que aumentar as horas de estudo.',
        'B) Mais produtivo que simplesmente aumentar a quantidade de horas estudadas.',
        'C) Desnecessário para concursos.',
        'D) Útil apenas para estudantes iniciantes.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Transcrição direta da conclusão: "estudar com planejamento pode ser mais produtivo do que simplesmente aumentar a quantidade de horas estudadas."'
    },
    {
      id: 110,
      enunciado: '10. [Texto 2] A finalidade predominante do texto é:',
      opcoes: [
        'A) Narrar uma história.',
        'B) Dar uma orientação sobre a organização dos estudos.',
        'C) Descrever um local.',
        'D) Divulgar um produto.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O texto tem caráter orientativo/instrutivo, fornecendo recomendações práticas sobre o planejamento de estudos para concursos.'
    },

    // Questões Gerais: 11 a 20
    {
      id: 111,
      enunciado: '11. Informação explícita é aquela que:',
      opcoes: [
        'A) Pode ser imaginada pelo leitor.',
        'B) Está diretamente apresentada no texto.',
        'C) Contradiz o texto.',
        'D) Depende exclusivamente do conhecimento pessoal.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Informação explícita é aquela manifesta de forma clara e literal no próprio texto (compreensão).'
    },
    {
      id: 112,
      enunciado: '12. Uma informação implícita é aquela que:',
      opcoes: [
        'A) Está necessariamente escrita com todas as palavras.',
        'B) Pode ser inferida a partir das informações apresentadas.',
        'C) Não possui nenhuma relação com o texto.',
        'D) É sempre uma opinião pessoal.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Informação implícita não se encontra explícita com todas as palavras, mas é deduzida/inferida com base nas pistas dadas pelo autor.'
    },
    {
      id: 113,
      enunciado: '13. O tema de um texto corresponde:',
      opcoes: [
        'A) Ao assunto central abordado.',
        'B) À primeira frase.',
        'C) À última palavra.',
        'D) Ao título obrigatoriamente.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: O tema representa o tópico ou assunto central em torno do qual todo o texto é construído.'
    },
    {
      id: 114,
      enunciado: '14. A ideia principal corresponde:',
      opcoes: [
        'A) A qualquer detalhe do texto.',
        'B) À mensagem central desenvolvida pelo autor.',
        'C) Apenas aos exemplos apresentados.',
        'D) À opinião do leitor.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A ideia principal é o núcleo informativo ou a tese mais importante sustentada pelo autor.'
    },
    {
      id: 115,
      enunciado: '15. Um texto predominantemente narrativo apresenta principalmente:',
      opcoes: [
        'A) Argumentos jurídicos.',
        'B) Acontecimentos, personagens e circunstâncias.',
        'C) Instruções de uso.',
        'D) Características gramaticais.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A narração é caracterizada por relatar uma sequência de ações/fatos vivenciados por personagens num espaço e tempo.'
    },
    {
      id: 116,
      enunciado: '16. Um texto predominantemente descritivo tem como característica:',
      opcoes: [
        'A) Apresentar características de pessoas, objetos, lugares ou situações.',
        'B) Defender necessariamente uma opinião.',
        'C) Apresentar somente ordens.',
        'D) Narrar obrigatoriamente acontecimentos.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: A descrição detalha atributos, aspectos e propriedades de objetos, cenários, seres ou estados.'
    },
    {
      id: 117,
      enunciado: '17. Um artigo de opinião é um exemplo de:',
      opcoes: [
        'A) Gênero textual.',
        'B) Figura de linguagem.',
        'C) Classe gramatical.',
        'D) Tipo de pontuação.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: O artigo de opinião é um gênero textual concreto de base predominantemente dissertativo-argumentativa.'
    },
    {
      id: 118,
      enunciado: '18. Em uma questão de interpretação, uma alternativa deve ser considerada suspeita quando:',
      opcoes: [
        'A) Está de acordo com o texto.',
        'B) Apresenta uma informação comprovada pelo texto.',
        'C) Acrescenta uma informação que não pode ser sustentada pelo texto.',
        'D) Retoma corretamente a ideia principal.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: Trata-se do erro clássico de Extrapolação — quando a alternativa introduz dados não respaldados pelo texto original.'
    },
    {
      id: 119,
      enunciado: '19. Em um texto argumentativo, a tese é:',
      opcoes: [
        'A) A opinião ou posição central defendida pelo autor.',
        'B) Um exemplo secundário.',
        'C) Uma informação sem relação com o assunto.',
        'D) A conclusão obrigatoriamente apresentada em uma única frase.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: A tese é o posicionamento crítico ou perspectiva teórica que o autor defende ao longo da argumentação.'
    },
    {
      id: 200,
      enunciado: '20. Para interpretar corretamente um texto em uma prova, é mais adequado:',
      opcoes: [
        'A) Responder de acordo com opiniões pessoais.',
        'B) Considerar apenas palavras isoladas.',
        'C) Relacionar a alternativa às informações e ideias presentes no texto.',
        'D) Escolher a alternativa mais longa.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: A resolução correta exige vinculação estrita entre a opção escolhida e os argumentos/dados demonstrados pelo texto.'
    }
  ];

  const portuguesTfQuestionsData = [
    {
      id: 201,
      statement: 'A compreensão textual busca identificar dados diretamente explícitos no texto.',
      isTrue: true,
      explicacao: 'Verdadeiro. A compreensão foca em localizar o que está claramente escrito.'
    },
    {
      id: 202,
      statement: 'Toda inferência em interpretação de texto permite ao candidato criar hipóteses sem necessidade de prova no texto.',
      isTrue: false,
      explicacao: 'Falso. Para ser uma inferência válida e não uma extrapolação, precisa obrigatoriamente estar sustentada pelo texto.'
    },
    {
      id: 203,
      statement: 'Manual de instruções, edital de concurso e receitas culinárias são exemplos do gênero textual de tipo predominantemente injuntivo.',
      isTrue: true,
      explicacao: 'Verdadeiro. Apresentam instruções, comandos e orientações ao leitor.'
    }
  ];

  const portuguesDiscursiveQuestionsData = [
    {
      id: 301,
      enunciado: '1. Diferencie informação explícita de informação implícita e explique a cautela necessária ao realizar inferências em provas de concurso.',
      respostaEsperada: 'Gabarito Oficial: A informação explícita está diretamente escrita no texto. A informação implícita não está explícita, mas é deduzida logicamente do texto. A cautela necessária é garantir que a inferência esteja rigorosamente sustentada pelas pistas do texto, evitando inventar informações ou extrapolar a intenção do autor.'
    }
  ];

  // LIBRAS Datasets
  const librasFlashcardsData = [
    {
      q: 'O que significa a sigla LIBRAS?',
      a: 'Língua Brasileira de Sinais. É a língua de modalidade gestual-visual utilizada pela comunidade surda brasileira.'
    },
    {
      q: 'LIBRAS é uma simples tradução do Português?',
      a: 'NÃO. LIBRAS é uma língua autônoma com estrutura gramatical, vocabulário e regras sintáticas próprias.'
    },
    {
      q: 'Qual é a lei federal que reconhece a LIBRAS no Brasil?',
      a: 'Lei nº 10.436, de 24 de abril de 2002 (regulamentada pelo Decreto nº 5.626/2005).'
    },
    {
      q: 'O que é a Datilologia?',
      a: 'É a representação das letras do alfabeto manual utilizando as mãos. É um recurso auxiliar e NÃO é sinônimo de LIBRAS.'
    },
    {
      q: 'Quais são os 5 parâmetros fundamentais dos sinais em LIBRAS?',
      a: '1. Configuração de mão; 2. Movimento; 3. Localização (Ponto de Articulação); 4. Orientação da palma; 5. Expressões não manuais (faciais/corporais).'
    },
    {
      q: 'Qual o marco histórico de 1857 na educação de surdos no Brasil?',
      a: 'A fundação do Instituto Nacional de Educação de Surdos (INES), primeira instituição histórica dedicada à educação de surdos no país.'
    },
    {
      q: 'A Lei nº 10.436/2002 substitui a Língua Portuguesa escrita?',
      a: 'NÃO. A lei deixa claro que a LIBRAS não substitui a modalidade escrita da Língua Portuguesa.'
    },
    {
      q: 'Qual o papel das expressões faciais e corporais na LIBRAS?',
      a: 'Desempenham função gramatical decisiva, indicando intenção (interrogação, negação, afirmação), emoção e intensidade.'
    },
    {
      q: 'Qual decreto regulamenta a Lei da LIBRAS?',
      a: 'Decreto nº 5.626, de 22 de dezembro de 2005.'
    },
    {
      q: 'Qual a importância da LIBRAS para o Assistente Judiciário no serviço público?',
      a: 'Garante os princípios da acessibilidade, igualdade e inclusão, assegurando o pleno acesso do cidadão surdo à Justiça.'
    }
  ];

  const librasMcQuestionsData = [
    {
      id: 1,
      enunciado: '1. LIBRAS significa:',
      alternativas: [
        'A) Linguagem Brasileira de Sinais.',
        'B) Língua Brasileira de Sinais.',
        'C) Língua Brasileira para Surdos.',
        'D) Linguagem Brasileira para Surdos.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: LIBRAS é a sigla para Língua Brasileira de Sinais, reconhecida legalmente pela Lei nº 10.436/2002.'
    },
    {
      id: 2,
      enunciado: '2. A LIBRAS é:',
      alternativas: [
        'A) Uma simples tradução do português.',
        'B) Um código universal utilizado por todas as pessoas surdas.',
        'C) Uma língua com estrutura gramatical própria.',
        'D) Apenas um alfabeto manual.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: A LIBRAS é uma língua viva e autônoma, de modalidade gestual-visual, com estrutura gramatical e sintaxe próprias.'
    },
    {
      id: 3,
      enunciado: '3. A Lei nº 10.436/2002 é importante porque:',
      alternativas: [
        'A) Criou o alfabeto manual brasileiro.',
        'B) Reconheceu a LIBRAS como meio legal de comunicação e expressão.',
        'C) Determinou que LIBRAS substitui o português.',
        'D) Criou o INES.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A Lei nº 10.436/2002 é o marco legal histórico que reconhece a LIBRAS como meio legal de comunicação e expressão no Brasil.'
    },
    {
      id: 4,
      enunciado: '4. O Decreto nº 5.626/2005:',
      alternativas: [
        'A) Regulamenta a Lei nº 10.436/2002.',
        'B) Revoga o reconhecimento da LIBRAS.',
        'C) Determina que somente intérpretes podem utilizar LIBRAS.',
        'D) Cria uma nova língua de sinais.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: O Decreto nº 5.626/2005 regulamenta a Lei nº 10.436/2002, disciplinando o ensino da LIBRAS, a formação profissional e a acessibilidade.'
    },
    {
      id: 5,
      enunciado: '5. A LIBRAS utiliza principalmente recursos:',
      alternativas: [
        'A) Sonoros e auditivos.',
        'B) Visuais e espaciais.',
        'C) Exclusivamente escritos.',
        'D) Exclusivamente orais.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Por ser uma língua de modalidade gestual-visual, a LIBRAS utiliza recursos visuais e espaciais para a produção e percepção dos sinais.'
    },
    {
      id: 6,
      enunciado: '6. A datilologia corresponde:',
      alternativas: [
        'A) À tradução automática do português.',
        'B) Ao conjunto de expressões faciais da LIBRAS.',
        'C) À representação manual das letras do alfabeto.',
        'D) À gramática completa da LIBRAS.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: Datilologia é o uso do alfabeto manual para soletrar letras e formar palavras, nomes próprios ou termos sem sinal específico.'
    },
    {
      id: 7,
      enunciado: '7. É correto afirmar que:',
      alternativas: [
        'A) Datilologia e LIBRAS são exatamente a mesma coisa.',
        'B) A datilologia é um recurso utilizado na comunicação em língua de sinais.',
        'C) A datilologia substitui todos os sinais.',
        'D) A datilologia existe somente para números.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A datilologia é um recurso auxiliar na comunicação em LIBRAS, não se confundindo com a totalidade da língua de sinais.'
    },
    {
      id: 8,
      enunciado: '8. Entre os elementos envolvidos na produção dos sinais estão:',
      alternativas: [
        'A) Configuração de mão, movimento, localização e orientação.',
        'B) Apenas movimento dos braços.',
        'C) Apenas configuração das mãos.',
        'D) Som, ritmo e entonação.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: Os sinais são produzidos através de 5 parâmetros: Configuração de mão, Movimento, Localização (Ponto de Articulação), Orientação e Expressões não manuais.'
    },
    {
      id: 9,
      enunciado: '9. As expressões faciais na LIBRAS:',
      alternativas: [
        'A) Não possuem nenhuma função comunicativa.',
        'B) Podem contribuir para a construção do significado.',
        'C) Servem apenas para demonstrar emoções.',
        'D) São utilizadas somente em conversas informais.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: As expressões faciais e corporais são parâmetros fundamentais da LIBRAS, com função gramatical direta no sentido dos sinais.'
    },
    {
      id: 10,
      enunciado: '10. O INES possui importância histórica porque:',
      alternativas: [
        'A) Foi criado para substituir o Poder Judiciário.',
        'B) É uma instituição histórica relacionada à educação de pessoas surdas no Brasil.',
        'C) É responsável por criar todas as línguas de sinais.',
        'D) É um órgão responsável exclusivamente pela fiscalização de intérpretes.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Fundado em 1857, o Instituto Nacional de Educação de Surdos (INES) é o marco pioneiro da educação de surdos no Brasil.'
    },
    {
      id: 11,
      enunciado: '11. A LIBRAS e a Língua Portuguesa:',
      alternativas: [
        'A) São exatamente a mesma língua.',
        'B) Possuem estruturas e características próprias.',
        'C) Diferem apenas no alfabeto.',
        'D) Possuem obrigatoriamente a mesma organização das frases.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: LIBRAS e Português são línguas distintas, com gramática, léxico e estruturas sintáticas independentes.'
    },
    {
      id: 12,
      enunciado: '12. Uma pessoa surda:',
      alternativas: [
        'A) Necessariamente utiliza apenas LIBRAS.',
        'B) Necessariamente utiliza apenas português oral.',
        'C) Pode utilizar diferentes recursos e formas de comunicação, conforme suas necessidades e preferências.',
        'D) Não pode utilizar português escrito.'
      ],
      correta: 2,
      explicacao: 'Gabarito C: Cada indivíduo possui sua identidade e preferências comunicativas (LIBRAS, português oral, escrita, leitura labial ou tecnologia assistiva).'
    },
    {
      id: 13,
      enunciado: '13. No atendimento público, a acessibilidade busca:',
      alternativas: [
        'A) Restringir o atendimento às pessoas que dominam português oral.',
        'B) Garantir condições adequadas de acesso aos serviços.',
        'C) Substituir todos os servidores por intérpretes.',
        'D) Impedir o uso de tecnologias assistivas.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A acessibilidade no serviço público visa assegurar igualdade de condições e dignidade a todos os cidadãos.'
    },
    {
      id: 14,
      enunciado: '14. Sobre a Lei nº 10.436/2002, assinale a alternativa correta:',
      alternativas: [
        'A) Reconhece a LIBRAS como meio legal de comunicação e expressão.',
        'B) Determina que a LIBRAS substitua a língua portuguesa escrita.',
        'C) Estabelece que LIBRAS é apenas um conjunto de gestos.',
        'D) Proíbe o uso da LIBRAS em órgãos públicos.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: O artigo 1º da Lei nº 10.436/2002 estabelece expressamente o reconhecimento da LIBRAS como meio legal de comunicação e expressão.'
    },
    {
      id: 15,
      enunciado: '15. O Decreto nº 5.626/2005 aborda, entre outros assuntos:',
      alternativas: [
        'A) Apenas o alfabeto manual.',
        'B) Educação, formação de profissionais e aspectos relacionados à LIBRAS.',
        'C) Somente a criação de sinais.',
        'D) Exclusivamente questões trabalhistas.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O Decreto nº 5.626/2005 detalha a inclusão da LIBRAS nos cursos de formação, a habilitação de intérpretes e a garantia de direitos educacionais e de saúde.'
    },
    {
      id: 16,
      enunciado: '16. Assinale a alternativa INCORRETA:',
      alternativas: [
        'A) LIBRAS possui estrutura própria.',
        'B) LIBRAS é uma língua.',
        'C) LIBRAS é simplesmente português sinalizado.',
        'D) A comunicação em LIBRAS pode envolver expressões não manuais.'
      ],
      correta: 2,
      explicacao: 'Gabarito C (Incorreta): LIBRAS NÃO é português sinalizado nem tradução palavra por palavra, mas sim uma língua autônoma.'
    },
    {
      id: 17,
      enunciado: '17. No contexto do Poder Judiciário, o conhecimento sobre acessibilidade é importante porque:',
      alternativas: [
        'A) Facilita o acesso das pessoas aos serviços públicos e à Justiça.',
        'B) Serve apenas para servidores especializados em informática.',
        'C) É necessário somente para magistrados.',
        'D) Elimina a necessidade de atendimento ao público.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: No TJAM, a acessibilidade e o correto atendimento garantem o exercício pleno dos direitos e o livre acesso à Justiça.'
    },
    {
      id: 18,
      enunciado: '18. Sobre os sinais em LIBRAS, é correto afirmar que:',
      alternativas: [
        'A) Somente o formato das mãos importa.',
        'B) Diferentes elementos podem participar da construção do sinal e do significado.',
        'C) As expressões faciais nunca interferem na comunicação.',
        'D) O movimento não possui importância.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A produção dos sinais articula diversos elementos simultâneos (configuração, movimento, ponto de articulação, orientação e expressão facial).'
    },
    {
      id: 19,
      enunciado: '19. Assinale a sequência correta:',
      alternativas: [
        'A) LIBRAS = linguagem → Datilologia = língua.',
        'B) LIBRAS = língua → Datilologia = representação manual das letras.',
        'C) LIBRAS = alfabeto → Datilologia = gramática.',
        'D) LIBRAS = português sinalizado → Datilologia = tradução.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: A LIBRAS é uma língua propriamente dita, enquanto a datilologia é o alfabeto manual de apoio para soletração.'
    },
    {
      id: 20,
      enunciado: '20. Sobre a Aula 1, assinale a alternativa correta:',
      alternativas: [
        'A) A LIBRAS é universal e possui exatamente os mesmos sinais em todos os países.',
        'B) A LIBRAS é uma língua brasileira com estrutura própria, reconhecida pela Lei nº 10.436/2002.',
        'C) A LIBRAS é apenas um sistema de gestos sem regras linguísticas.',
        'D) A datilologia corresponde à totalidade da LIBRAS.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: Resumo perfeito da Aula 1: LIBRAS é a língua de sinais brasileira, com sistema linguístico autônomo e amparo legal na Lei nº 10.436/2002.'
    }
  ];

  const librasTfQuestionsData = [
    {
      id: 101,
      enunciado: '1. A LIBRAS não é uma simples tradução do português para sinais, pois possui estrutura gramatical e regras linguísticas próprias.',
      correta: true,
      explicacao: 'Verdadeiro: LIBRAS é uma língua viva, independente, com gramática visual-espacial própria.'
    },
    {
      id: 102,
      enunciado: '2. A Lei nº 10.436/2002 substituiu a Língua Portuguesa escrita pela LIBRAS em todos os documentos oficiais.',
      correta: false,
      explicacao: 'Falso: A lei deixa claro que a LIBRAS não substitui a modalidade escrita da Língua Portuguesa.'
    },
    {
      id: 103,
      enunciado: '3. As expressões faciais e corporais na LIBRAS são mero adorno estético e não influenciam no significado dos sinais.',
      correta: false,
      explicacao: 'Falso: Expressões faciais e corporais são parâmetros fundamentais da LIBRAS, conferindo sentido gramatical, emoção e intensidade.'
    },
    {
      id: 104,
      enunciado: '4. O Instituto Nacional de Educação de Surdos (INES), fundado em 1857, é um marco histórico fundamental na educação de pessoas surdas no Brasil.',
      correta: true,
      explicacao: 'Verdadeiro: O INES é uma instituição histórica voltada à educação de surdos criada em 1857.'
    }
  ];

  const librasDiscursiveQuestionsData = [
    {
      id: 201,
      enunciado: '1. Explique por que se afirma que "LIBRAS é uma língua e não uma linguagem improvisada", destacando sua previsão na Lei nº 10.436/2002.',
      respostaEsperada: 'Gabarito oficial: A LIBRAS é reconhecida como sistema linguístico de natureza visual-espacial pela Lei nº 10.436/2002. Trata-se de uma língua autônoma, pois possui gramática, vocabulário, regras sintáticas e parâmetros estruturados próprios (configuração de mão, movimento, ponto de articulação, orientação e expressões faciais), diferindo de simples códigos gestuais ou imitações.'
    },
    {
      id: 202,
      enunciado: '2. Diferencie LIBRAS de Datilologia e explique em quais momentos a datilologia deve ser utilizada.',
      respostaEsperada: 'Gabarito oficial: A LIBRAS é a língua de sinais completa utilizada pela comunidade surda. A Datilologia é apenas o recurso do alfabeto manual (representação de letras com as mãos). A datilologia deve ser utilizada de forma pontual para soletrar nomes próprios, endereços ou palavras/termos que ainda não possuem sinal específico em LIBRAS.'
    }
  ];

  // Processo Penal Flashcards Data (Aula 6 • Princípios e Aplicação da Lei)
  const procPenalFlashcardsData = [
    {
      q: 'O que é o Direito Processual Penal?',
      a: 'É o conjunto de regras utilizadas para a investigação, o processo e o julgamento de infrações penais, garantindo que a atuação do Estado respeite os direitos fundamentais.'
    },
    {
      q: 'O que assegura o Princípio do Devido Processo Legal?',
      a: 'Ninguém pode ser privado da liberdade ou de seus bens sem o devido processo legal, devendo o processo respeitar todas as regras e garantias previstas na Constituição e nas leis.'
    },
    {
      q: 'Qual a diferença essencial entre Contraditório e Ampla Defesa?',
      a: 'Contraditório = direito de ciência e de manifestação/resposta sobre os atos processuais. Ampla Defesa = direito de utilizar todos os meios legais e adequados para se defender (defesa técnica, provas, recursos).'
    },
    {
      q: 'O que estabelece a Presunção de Inocência?',
      a: 'Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória (Art. 5º, LVII da CF). A culpa jamais é presumida por mera acusação.'
    },
    {
      q: 'O que veda o Princípio do Juiz Natural?',
      a: 'Impede a criação de tribunais ou juízos de exceção post factum, garantindo que ninguém seja processado ou sentenciado senão pela autoridade previamente competente.'
    },
    {
      q: 'O silêncio do acusado pode ser interpretado em seu prejuízo?',
      a: 'NÃO! O acusado possui o direito constitucional de permanecer calado (nemo tenetur se detegere) e seu silêncio não pode ser usado para prejudicar sua defesa nem como confissão.'
    },
    {
      q: 'Como é aplicada a lei processual penal no tempo?',
      a: 'Aplica-se desde logo (tempus regit actum) aos processos em andamento, resguardando-se a validade dos atos processuais já praticados sob a lei anterior.'
    },
    {
      q: 'Qual a regra geral de aplicação da lei processual penal no espaço?',
      a: 'Aplica-se em todo o território nacional (Princípio da Territorialidade - Art. 1º do CPP), ressalvadas as exceções previstas em leis, tratados e convenções internacionais.'
    }
  ];

  // Processo Civil Flashcards Data (Aula 5 • Atos Processuais)
  const procCivilFlashcardsData = [
    {
      q: 'O que são Atos Processuais?',
      a: 'São as manifestações praticadas pelas partes, pelo juiz e demais participantes do processo que produzem efeitos jurídicos na relação processual.'
    },
    {
      q: 'O que é Sentença no CPC?',
      a: 'É o pronunciamento pelo qual o juiz, em regra, encerra a fase cognitiva do procedimento comum ou extingue a execução.'
    },
    {
      q: 'O que é Decisão Interlocutória?',
      a: 'É o pronunciamento judicial de natureza decisória praticado no processo que não se enquadra como sentença.'
    },
    {
      q: 'O que é Despacho no processo civil?',
      a: 'São os pronunciamentos do juiz praticados no processo que não possuem natureza decisória.'
    },
    {
      q: 'Como são contados os prazos processuais em dias no CPC?',
      a: 'Quando a lei estabelece prazo processual em dias, a contagem considera, em regra, somente os dias úteis.'
    },
    {
      q: 'Qual a diferença entre Citação e Intimação?',
      a: 'Citação: convoca o réu/executado/interessado para integrar a relação processual. Intimação: dá ciência de atos e termos do processo.'
    },
    {
      q: 'O que é Negócio Jurídico Processual?',
      a: 'É a convenção em que as partes estipulam mudanças no procedimento e ajustam seus ônus, poderes, faculdades e deveres processuais.'
    },
    {
      q: 'Como funciona a regra de Nulidades no CPC?',
      a: 'A existência de irregularidade não invalida automaticamente o ato; o sistema busca preservar os atos que possam ser aproveitados sem prejuízo.'
    }
  ];

  // Informática Flashcards Data
  const infFlashcardsData = [
    {
      q: 'O que significa a palavra "Informática"?',
      a: 'Resulta da junção de INFORMAÇÃO + AUTOMÁTICA, significando o tratamento automático da informação por computadores.'
    },
    {
      q: 'Qual a diferença entre Dado e Informação em informática?',
      a: 'Dado é o registro bruto e sem contexto (ex: "25", "Manaus"). Informação é o dado processado que ganha significado (ex: "Manaus registrou 25°C hoje").'
    },
    {
      q: 'O que é Hardware e Software?',
      a: 'Hardware é a parte física (CPU, RAM, SSD, Monitor). Software é a parte lógica (Sistemas Operacionais, Word, PJe).'
    },
    {
      q: 'Por que a memória RAM é dita volátil?',
      a: 'Porque seu conteúdo é apagado quando o computador é desligado. É usada apenas temporariamente durante a execução de programas.'
    },
    {
      q: 'Como são classificados o Pen Drive, a Tela Touchscreen e a Impressora Multifuncional?',
      a: 'São Dispositivos de ENTRADA E SAÍDA (Mistos), pois enviam e recebem dados.'
    },
    {
      q: 'Qual a principal função do Sistema Operacional?',
      a: 'Gerenciar os recursos do hardware, controlar arquivos e memória e permitir a interação entre o usuário e o computador.'
    }
  ];

  // Informática Múltipla Escolha (1-10)
  const infMcQuestionsData = [
    {
      id: 1,
      enunciado: '1. A informática pode ser definida como:',
      alternativas: [
        'A ciência que estuda apenas computadores.',
        'A ciência que trata do processamento automático da informação por meio de computadores e dispositivos eletrônicos.',
        'O conjunto de programas instalados em um computador.',
        'O estudo exclusivo da Internet.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A informática é a ciência encarregada do tratamento automático da informação utilizando computadores e sistemas eletrônicos.'
    },
    {
      id: 2,
      enunciado: '2. O que é um dado?',
      alternativas: [
        'Uma informação já interpretada.',
        'Um registro bruto, sem significado por si só.',
        'Um documento digital.',
        'Um programa de computador.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Dado é um registro bruto, isolado e sem significado contextual imediato.'
    },
    {
      id: 3,
      enunciado: '3. Informação é:',
      alternativas: [
        'Um conjunto de programas.',
        'Um equipamento eletrônico.',
        'O resultado do processamento de dados, atribuindo-lhes significado.',
        'Um tipo de hardware.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. Informação é o dado devidamente processado, organizado e contextualizado para gerar conhecimento.'
    },
    {
      id: 4,
      enunciado: '4. Hardware corresponde:',
      alternativas: [
        'Aos programas instalados no computador.',
        'À parte física do computador.',
        'À Internet.',
        'Ao sistema operacional.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Hardware representa toda a estrutura e componentes físicos (palpáveis) do computador.'
    },
    {
      id: 5,
      enunciado: '5. Software é:',
      alternativas: [
        'A parte física do computador.',
        'O conjunto de programas e sistemas que permitem o funcionamento do computador.',
        'Um dispositivo de entrada.',
        'Um equipamento eletrônico.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Software corresponde à parte lógica, isto é, aos programas, rotinas e instruções operacionais.'
    },
    {
      id: 6,
      enunciado: '6. Qual componente é considerado o "cérebro" do computador?',
      alternativas: [
        'HD.',
        'Monitor.',
        'CPU (Processador).',
        'Mouse.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A CPU (Unidade Central de Processamento) é o cérebro do computador, executando os cálculos e comandos.'
    },
    {
      id: 7,
      enunciado: '7. A memória RAM tem como principal função:',
      alternativas: [
        'Armazenar arquivos permanentemente.',
        'Armazenar temporariamente os programas e dados em uso.',
        'Executar programas.',
        'Controlar a energia do computador.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A memória RAM é volátil e serve para armazenar temporariamente os dados e programas durante a execução.'
    },
    {
      id: 8,
      enunciado: '8. Qual dos dispositivos abaixo é de entrada?',
      alternativas: [
        'Monitor.',
        'Impressora.',
        'Mouse.',
        'Caixa de som.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. O mouse envia comandos de movimento e clique para o computador, sendo um periférico de entrada.'
    },
    {
      id: 9,
      enunciado: '9. Qual dos dispositivos abaixo é de saída?',
      alternativas: [
        'Scanner.',
        'Webcam.',
        'Monitor.',
        'Teclado.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. O monitor exibe visualmente os dados processados para o usuário, sendo um periférico de saída.'
    },
    {
      id: 10,
      enunciado: '10. Qual software gerencia os recursos do computador?',
      alternativas: [
        'Microsoft Word.',
        'Sistema Operacional.',
        'Navegador de Internet.',
        'Microsoft Excel.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. O Sistema Operacional (ex: Windows, Linux) é o programa fundamental que gerencia o hardware e os demais programas.'
    }
  ];

  // Informática Verdadeiro ou Falso (11-15)
  const infTfQuestionsData = [
    {
      id: 11,
      enunciado: '11. O teclado é um dispositivo de entrada.',
      correta: true,
      explicacao: '✅ Verdadeiro. O teclado é um dispositivo de entrada que envia dados alfanuméricos ao sistema.'
    },
    {
      id: 12,
      enunciado: '12. O HD e o SSD armazenam dados permanentemente.',
      correta: true,
      explicacao: '✅ Verdadeiro. HD e SSD são memórias não-voláteis, que preservam os dados gravados mesmo quando desligados.'
    },
    {
      id: 13,
      enunciado: '13. Hardware e software são a mesma coisa.',
      correta: false,
      explicacao: '❌ Falso. Hardware é a parte física (equipamentos) e software é a parte lógica (programas).'
    },
    {
      id: 14,
      enunciado: '14. O Windows é um sistema operacional.',
      correta: true,
      explicacao: '✅ Verdadeiro. O Windows é um dos sistemas operacionais mais utilizados no mundo e em tribunais como o TJAM.'
    },
    {
      id: 15,
      enunciado: '15. A CPU é responsável por executar instruções e processar dados.',
      correta: true,
      explicacao: '✅ Verdadeiro. A CPU processa todas as ordens, cálculos e algoritmos exigidos pelos softwares.'
    }
  ];

  // Informática Discursivas (16-20)
  const infDiscursiveQuestionsData = [
    {
      id: 16,
      enunciado: '16. Explique a diferença entre hardware e software.',
      respostaEsperada: 'Gabarito oficial: Hardware é a parte física (ex: CPU, memória, monitor, teclado). Software é a parte lógica (programas, sistemas operacionais e aplicativos, como Windows e PJe).'
    },
    {
      id: 17,
      enunciado: '17. Diferencie dado e informação.',
      respostaEsperada: 'Gabarito oficial: Dado é um registro bruto e isolado sem significado próprio ("25"). Informação é o dado processado, organizado e contextualizado de forma a fornecer sentido útil ("Manaus registrou 25°C hoje").'
    },
    {
      id: 18,
      enunciado: '18. Qual é a função da CPU em um computador?',
      respostaEsperada: 'Gabarito oficial: A CPU (Unidade Central de Processamento) atua como o cérebro do computador, sendo responsável por buscar, interpretar e executar as instruções dos programas e efetuar os cálculos.'
    },
    {
      id: 19,
      enunciado: '19. Cite três dispositivos de entrada e três dispositivos de saída.',
      respostaEsperada: 'Gabarito oficial: Dispositivos de Entrada: Teclado, Mouse e Scanner. Dispositivos de Saída: Monitor, Impressora e Caixa de Som.'
    },
    {
      id: 20,
      enunciado: '20. Explique a importância da informática para o trabalho de um Assistente Judiciário no TJAM.',
      respostaEsperada: 'Gabarito oficial: A informática é essencial para o manuseio e tramitação dos autos no PJe (Processo Judicial Eletrônico), elaboração de minutas de pareceres e decisões, realização de audiências por videoconferência e consulta ágil aos sistemas da justiça.'
    }
  ];

  // Admin Flashcards Data (Atos Administrativos)
  const adminFlashcardsData = [
    {
      q: 'O que é ato administrativo?',
      a: 'É a manifestação de vontade da Administração Pública ou de quem a represente, sob regime de direito público, com o fim de produzir efeitos jurídicos imediatos.'
    },
    {
      q: 'Quais são os 5 elementos (requisitos) do ato administrativo e qual o seu mnemônico?',
      a: 'Competência, Finalidade, Forma, Motivo e Objeto. Mnemônico: CO–FI–FO–MO–OB.'
    },
    {
      q: 'Quais são os principais atributos do ato administrativo?',
      a: 'Presunção de legitimidade, Imperatividade, Autoexecutoriedade e Tipicidade (PATI/PAT).'
    },
    {
      q: 'Qual a diferença entre Anulação e Revogação?',
      a: 'Anulação decorre de ILEGALIDADE (efeitos ex tunc). Revogação decorre de CONVENIÊNCIA e OPORTUNIDADE (efeitos ex nunc).'
    },
    {
      q: 'O que é Convalidação do ato administrativo?',
      a: 'É o ato de sanar um vício sanável (como defeito de competência não exclusiva ou forma não essencial), restaurando a validade do ato com efeitos retroativos.'
    }
  ];

  // Questions Data - 20 Questions for Aula 3 (Direito Administrativo - Atos Administrativos)
  const questionsData = [
    {
      id: 1,
      enunciado: '1. Ato administrativo pode ser compreendido como:',
      alternativas: [
        'A) Qualquer ato praticado por um cidadão.',
        'B) Manifestação da Administração Pública, ou de quem exerça função administrativa, capaz de produzir efeitos jurídicos.',
        'C) Somente uma decisão judicial.',
        'D) Exclusivamente uma lei aprovada pelo Legislativo.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Ato administrativo é a manifestação de vontade da Administração Pública, ou de quem lhe faça as vezes, sob regime público, capaz de produzir efeitos jurídicos.'
    },
    {
      id: 2,
      enunciado: '2. São elementos clássicos do ato administrativo:',
      alternativas: [
        'A) Competência, finalidade, forma, motivo e objeto.',
        'B) Legalidade, publicidade, moralidade, eficiência e impessoalidade.',
        'C) Hierarquia, disciplina, polícia, regulamentação e fiscalização.',
        'D) Autoridade, publicidade, sentença, recurso e competência.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Os cinco elementos do ato administrativo são: Competência, Finalidade, Forma, Motivo e Objeto (CO-FI-FO-MO-OB).'
    },
    {
      id: 3,
      enunciado: '3. A competência corresponde:',
      alternativas: [
        'A) Ao resultado produzido pelo ato.',
        'B) À finalidade pública pretendida.',
        'C) Ao poder legal atribuído ao agente ou órgão para praticar o ato.',
        'D) À justificativa de fato do ato.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A Competência é o poder legal atribuído pela lei ao agente público ou órgão para praticar validamente o ato.'
    },
    {
      id: 4,
      enunciado: '4. A finalidade do ato administrativo deve estar relacionada:',
      alternativas: [
        'A) Ao interesse exclusivamente particular do agente.',
        'B) Ao interesse público previsto pelo ordenamento jurídico.',
        'C) À vontade pessoal do servidor.',
        'D) À obtenção de vantagem econômica pelo agente.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. O ato administrativo deve sempre buscar o interesse público explicitado em lei.'
    },
    {
      id: 5,
      enunciado: '5. O motivo do ato administrativo corresponde:',
      alternativas: [
        'A) Ao efeito jurídico produzido.',
        'B) À forma de publicação.',
        'C) À situação de fato e de direito que fundamenta o ato.',
        'D) À autoridade que praticou o ato.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. O Motivo é a situação de fato e o fundamento de direito que servem de base para a prática do ato.'
    },
    {
      id: 6,
      enunciado: '6. O objeto do ato administrativo corresponde:',
      alternativas: [
        'A) Ao conteúdo ou efeito jurídico produzido pelo ato.',
        'B) À competência do agente.',
        'C) À finalidade pública.',
        'D) À justificativa do ato.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. O Objeto (conteúdo) é a alteração no mundo jurídico produzida de imediato pelo ato.'
    },
    {
      id: 7,
      enunciado: '7. Assinale a alternativa que apresenta corretamente os cinco elementos do ato administrativo:',
      alternativas: [
        'A) Competência, finalidade, forma, motivo e objeto.',
        'B) Publicidade, eficiência, motivo, hierarquia e objeto.',
        'C) Competência, moralidade, publicidade, motivo e forma.',
        'D) Finalidade, eficiência, hierarquia, objeto e publicidade.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Mnemônico CO-FI-FO-MO-OB (Competência, Finalidade, Forma, Motivo e Objeto).'
    },
    {
      id: 8,
      enunciado: '8. A presunção de legitimidade significa que:',
      alternativas: [
        'A) Todo ato administrativo é definitivamente válido.',
        'B) O ato é considerado legítimo até que seja demonstrada sua ilegalidade.',
        'C) Nenhum ato administrativo pode ser questionado.',
        'D) Apenas o Poder Judiciário pode praticar atos administrativos.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A Presunção de Legitimidade estabelece que os atos reputam-se verdadeiros e legais até prova em contrário.'
    },
    {
      id: 9,
      enunciado: '9. A imperatividade significa que determinados atos administrativos:',
      alternativas: [
        'A) Dependem sempre da concordância do particular.',
        'B) Podem impor obrigações independentemente da concordância do particular, quando cabível.',
        'C) Nunca produzem obrigações.',
        'D) São necessariamente atos judiciais.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A Imperatividade vincula o administrado independentemente do seu consentimento prévio.'
    },
    {
      id: 10,
      enunciado: '10. A autoexecutoriedade permite, em determinadas hipóteses:',
      alternativas: [
        'A) Que a Administração execute diretamente sua decisão, sem necessidade de autorização judicial prévia.',
        'B) Que qualquer servidor pratique qualquer ato.',
        'C) Que a Administração deixe de observar a lei.',
        'D) Que todo ato seja executado sem qualquer limite.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. A Autoexecutoriedade permite que a Administração execute diretamente a providência administrativa sem socorrer-se previamente do Judiciário.'
    },
    {
      id: 11,
      enunciado: '11. A tipicidade significa que:',
      alternativas: [
        'A) Todo ato deve corresponder a uma figura prevista no ordenamento jurídico.',
        'B) Todo ato precisa ser judicialmente autorizado.',
        'C) O agente pode criar livremente qualquer ato administrativo.',
        'D) Apenas atos privados possuem forma definida.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Tipicidade exige a definição prévia em lei de cada tipo de ato administrativo e seus efeitos.'
    },
    {
      id: 12,
      enunciado: '12. A anulação de um ato administrativo ocorre quando:',
      alternativas: [
        'A) O ato é válido, mas deixou de ser conveniente.',
        'B) Existe ilegalidade no ato.',
        'C) O agente muda de opinião.',
        'D) O particular solicita sua revogação.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A Anulação pressupõe a existência de ilegalidade ou vício de validade no ato administrativo.'
    },
    {
      id: 13,
      enunciado: '13. A revogação está relacionada:',
      alternativas: [
        'A) À ilegalidade do ato.',
        'B) À conveniência e oportunidade administrativas.',
        'C) À inexistência do agente público.',
        'D) À nulidade obrigatória do ato.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A Revogação baseia-se em razões de mérito administrativo (conveniência e oportunidade para o interesse público).'
    },
    {
      id: 14,
      enunciado: '14. Um ato administrativo válido deixa de ser conveniente para a Administração. Nesse caso, em regra, poderá ocorrer:',
      alternativas: [
        'A) Anulação.',
        'B) Revogação.',
        'C) Convalidação obrigatória.',
        'D) Judicialização automática.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Havendo ato perfeito e legítimo que se torna inoportuno ou inconveniente, a medida é a Revogação.'
    },
    {
      id: 15,
      enunciado: '15. Um ato administrativo apresenta ilegalidade. A providência adequada é:',
      alternativas: [
        'A) Revogação por conveniência.',
        'B) Anulação.',
        'C) Convalidação obrigatória em qualquer situação.',
        'D) Manutenção obrigatória.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Atos ilegais devem ser Anulados (Súmula 473 do STF).'
    },
    {
      id: 16,
      enunciado: '16. A convalidação consiste, em linhas gerais, na:',
      alternativas: [
        'A) Criação de um novo Poder.',
        'B) Correção de determinados vícios sanáveis do ato administrativo.',
        'C) Revogação de todos os atos administrativos.',
        'D) Transformação de ato administrativo em lei.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Convalidação é a correção com efeito retroativo de atos com vícios sanáveis (ex: competência não exclusiva ou forma não essencial).'
    },
    {
      id: 17,
      enunciado: '17. Assinale a alternativa correta:',
      alternativas: [
        'A) Anulação ocorre por conveniência e oportunidade.',
        'B) Revogação ocorre necessariamente por ilegalidade.',
        'C) Anulação relaciona-se à ilegalidade, enquanto revogação relaciona-se à conveniência e oportunidade.',
        'D) Anulação e revogação são exatamente a mesma coisa.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A Anulação combate a ilegalidade, enquanto a Revogação analisa conveniência e oportunidade.'
    },
    {
      id: 18,
      enunciado: '18. Um servidor pratica ato administrativo sem possuir competência legal para fazê-lo. O problema está relacionado ao elemento:',
      alternativas: [
        'A) Objeto.',
        'B) Motivo.',
        'C) Competência.',
        'D) Finalidade.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. Falta de atribuição legal para praticar o ato constitui vício no elemento Competência.'
    },
    {
      id: 19,
      enunciado: '19. A Administração utiliza determinado ato para alcançar finalidade pessoal do agente, em vez da finalidade pública prevista em lei. O elemento comprometido é:',
      alternativas: [
        'A) Forma.',
        'B) Finalidade.',
        'C) Objeto.',
        'D) Competência.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. O desvio de poder/finalidade atinge o elemento Finalidade do ato administrativo.'
    },
    {
      id: 20,
      enunciado: '20. Um ato administrativo válido deixa de atender ao interesse da Administração por razões de conveniência e oportunidade. Sobre o caso, é correto afirmar:',
      alternativas: [
        'A) Pode ocorrer revogação, observados os limites legais.',
        'B) Deve ocorrer anulação por ilegalidade.',
        'C) O ato se torna automaticamente inexistente.',
        'D) A Administração perde definitivamente sua competência.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Diante de inconveniência superveniente em ato perfeito, a Administração pode revogá-lo.'
    }
  ];

  const tfQuestionsData: any[] = [];

  const discursiveQuestionsData: any[] = [];

  // Processo Civil Questions (Exercícios - Aula 5 • Atos Processuais)
  const procCivilMcQuestionsData = [
    {
      id: 1,
      enunciado: '1. São considerados atos processuais:',
      alternativas: [
        'A) Somente os atos praticados pelo juiz.',
        'B) Manifestações praticadas no processo que produzem efeitos processuais.',
        'C) Apenas os atos praticados pelo autor.',
        'D) Somente os atos realizados fora do processo.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Atos processuais são as manifestações praticadas no processo pelas partes, juiz e demais participantes que produzem efeitos na relação processual.'
    },
    {
      id: 2,
      enunciado: '2. É exemplo de ato praticado pela parte:',
      alternativas: [
        'A) Sentença.',
        'B) Despacho.',
        'C) Contestação.',
        'D) Decisão interlocutória.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A contestação é a principal modalidade de defesa apresentada pela parte ré no processo.'
    },
    {
      id: 3,
      enunciado: '3. A sentença é, em regra, o pronunciamento judicial que:',
      alternativas: [
        'A) Não possui conteúdo decisório.',
        'B) Encerra a fase cognitiva do procedimento comum ou extingue a execução.',
        'C) Apenas comunica um ato processual.',
        'D) Convoca o réu para participar do processo.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A sentença é o pronunciamento pelo qual o juiz, em regra, põe fim à fase cognitiva ou extingue a execução.'
    },
    {
      id: 4,
      enunciado: '4. A decisão interlocutória é:',
      alternativas: [
        'A) Todo ato praticado pelo autor.',
        'B) Pronunciamento judicial de natureza decisória que não se enquadra como sentença.',
        'C) A comunicação oficial de um processo.',
        'D) Um ato exclusivamente administrativo.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Decisão interlocutória é o pronunciamento de natureza decisória que resolve questão incidente no curso do processo sem ser sentença.'
    },
    {
      id: 5,
      enunciado: '5. Os despachos são, em regra:',
      alternativas: [
        'A) Pronunciamentos judiciais sem conteúdo decisório.',
        'B) Sentenças definitivas.',
        'C) Recursos apresentados pelas partes.',
        'D) Decisões administrativas.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Despachos são pronunciamentos meramente ordinatórios para impulsionar o processo, sem carga decisória.'
    },
    {
      id: 6,
      enunciado: '6. A citação tem como finalidade:',
      alternativas: [
        'A) Dar ciência de qualquer ato processual.',
        'B) Convocar o réu, o executado ou o interessado para integrar a relação processual.',
        'C) Encerrar o processo.',
        'D) Aplicar uma penalidade ao réu.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Citação é o ato pelo qual o réu, executado ou interessado é convocado para integrar o polo passivo da relação processual.'
    },
    {
      id: 7,
      enunciado: '7. A intimação consiste, em regra:',
      alternativas: [
        'A) Na convocação inicial para integrar o processo.',
        'B) Na ciência dada a alguém dos atos e termos do processo.',
        'C) Na apresentação da contestação.',
        'D) Na sentença proferida pelo juiz.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Intimação dá ciência às partes ou terceiros dos atos e termos do processo já instaurado.'
    },
    {
      id: 8,
      enunciado: '8. Assinale a alternativa correta:',
      alternativas: [
        'A) Citação e intimação são sempre sinônimos.',
        'B) A citação chama o réu para integrar o processo, enquanto a intimação dá ciência dos atos e termos processuais.',
        'C) A intimação somente pode ocorrer antes da citação.',
        'D) A citação somente existe em processos criminais.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Citação integra o sujeito à relação processual; intimação apenas cientifica sobre atos e prazos do processo.'
    },
    {
      id: 9,
      enunciado: '9. No CPC, quando um prazo processual é contado em dias, considera-se, em regra:',
      alternativas: [
        'A) Dias corridos.',
        'B) Apenas domingos e feriados.',
        'C) Dias úteis.',
        'D) Apenas dias úteis para o juiz.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. Na contagem de prazos processuais em dias no CPC, computam-se somente os dias úteis.'
    },
    {
      id: 10,
      enunciado: '10. Sobre os prazos processuais, é correto afirmar que:',
      alternativas: [
        'A) Podem ser ignorados pelas partes.',
        'B) Devem ser observados conforme as regras estabelecidas pela legislação e pelo juiz.',
        'C) Nunca produzem consequências processuais.',
        'D) São sempre determinados livremente pelas partes.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. O cumprimento dos prazos processuais dentro das normas legais/judiciais é indispensável para evitar a preclusão.'
    },
    {
      id: 11,
      enunciado: '11. Quanto à forma dos atos processuais:',
      alternativas: [
        'A) Todos dependem obrigatoriamente de forma específica.',
        'B) Em regra, independem de forma determinada, salvo quando a lei exigir.',
        'C) Nunca podem ser realizados por meio eletrônico.',
        'D) Somente podem ser praticados oralmente.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Vigora no CPC o princípio da liberdade das formas (os atos independem de forma determinada, salvo previsão legal expressa).'
    },
    {
      id: 12,
      enunciado: '12. A finalidade das regras sobre forma dos atos processuais inclui:',
      alternativas: [
        'A) Impedir o acesso à Justiça.',
        'B) Garantir organização e segurança jurídica ao procedimento.',
        'C) Eliminar a participação das partes.',
        'D) Aumentar obrigatoriamente a duração do processo.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. As exigências formais visam a assegurar a segurança jurídica, previsibilidade, validade e proteção às partes.'
    },
    {
      id: 13,
      enunciado: '13. O negócio jurídico processual permite, em determinadas situações:',
      alternativas: [
        'A) Que as partes convencionem sobre aspectos do procedimento, observados os requisitos legais.',
        'B) Que as partes eliminem qualquer norma do CPC.',
        'C) Que o juiz deixe de exercer sua função jurisdicional.',
        'D) Que uma parte imponha sua vontade à outra sem qualquer limite.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. As partes plenamente capazes podem negociar adaptações ao procedimento e ajustar seus ônus e faculdades processuais.'
    },
    {
      id: 14,
      enunciado: '14. A respeito das nulidades processuais, é correto afirmar que:',
      alternativas: [
        'A) Qualquer irregularidade sempre torna todo o processo inválido.',
        'B) O sistema processual busca preservar e aproveitar os atos quando possível, conforme a lei.',
        'C) Nenhum ato processual pode ser considerado inválido.',
        'D) Somente o autor pode alegar nulidades.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. O CPC adota o princípio do aproveitamento dos atos processuais e da ausência de nulidade sem prejuízo.'
    },
    {
      id: 15,
      enunciado: '15. João recebeu comunicação oficial sobre a existência de um processo e foi chamado para participar da relação processual como réu. Trata-se de:',
      alternativas: [
        'A) Intimação.',
        'B) Despacho.',
        'C) Citação.',
        'D) Sentença.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A convocação oficial do réu para tomar ciência do processo e integrar o polo passivo é a citação.'
    },
    {
      id: 16,
      enunciado: '16. Durante o processo, Maria recebeu comunicação para tomar conhecimento de uma decisão judicial e apresentar manifestação. Trata-se de:',
      alternativas: [
        'A) Citação.',
        'B) Intimação.',
        'C) Contestação.',
        'D) Sentença.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Dar ciência à parte já integrante do processo para se manifestar sobre ato ou decisão é a função da intimação.'
    },
    {
      id: 17,
      enunciado: '17. O juiz profere um pronunciamento que resolve determinada questão durante o processo, mas não se enquadra como sentença. Trata-se de:',
      alternativas: [
        'A) Decisão interlocutória.',
        'B) Despacho.',
        'C) Citação.',
        'D) Petição inicial.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Decisão com conteúdo decisório proferida no curso do processo que não o encerra é decisão interlocutória.'
    },
    {
      id: 18,
      enunciado: '18. Um pronunciamento judicial determina apenas o andamento do processo, sem conteúdo decisório. Em regra, trata-se de:',
      alternativas: [
        'A) Sentença.',
        'B) Decisão interlocutória.',
        'C) Despacho.',
        'D) Recurso.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. Pronunciamentos sem conteúdo decisório destinados a dar andamento ao feito são despachos.'
    },
    {
      id: 19,
      enunciado: '19. Assinale a alternativa INCORRETA:',
      alternativas: [
        'A) A contestação é um ato praticado pela parte.',
        'B) A sentença é um pronunciamento judicial.',
        'C) A intimação dá ciência dos atos e termos do processo.',
        'D) A citação serve exclusivamente para comunicar uma sentença já proferida.'
      ],
      correta: 3,
      explicacao: '✅ Gabarito: D. A citação serve para convocar o réu a integrar o processo no início da ação, e não exclusivamente para comunicar sentença.'
    },
    {
      id: 20,
      enunciado: '20. Sobre os atos processuais, assinale a alternativa correta:',
      alternativas: [
        'A) Citação, intimação, sentença, contestação e despacho podem integrar a dinâmica processual, cada qual com sua finalidade própria.',
        'B) Todos os atos processuais possuem a mesma finalidade.',
        'C) Somente o juiz pratica atos processuais.',
        'D) Somente as partes praticam atos processuais.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Os diversos atos processuais são praticados por partes, juiz e auxiliares, cada um cumprindo sua finalidade legal.'
    }
  ];

  const procCivilTfQuestionsData = [
    {
      id: 11,
      enunciado: '11. A jurisdição é uma função exercida pelo Estado para aplicar o Direito aos casos concretos.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. É exatamente a definição clássica da função jurisdicional estatal.'
    },
    {
      id: 12,
      enunciado: '12. O juiz pode favorecer uma das partes quando considerar que ela possui melhores argumentos.',
      correta: false,
      explicacao: '❌ Gabarito: Falso. Pelo princípio da imparcialidade, o juiz deve manter-se estritamente isento e imparcial.'
    },
    {
      id: 13,
      enunciado: '13. A competência determina os limites de atuação de determinado órgão jurisdicional.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. Competência é a medida ou limite da jurisdição conferido a cada juízo ou tribunal.'
    },
    {
      id: 14,
      enunciado: '14. A ação permite que a pessoa provoque o Poder Judiciário em busca de tutela jurisdicional.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. Ação é o direito subjetivo de invocar a prestação jurisdicional do Estado.'
    },
    {
      id: 15,
      enunciado: '15. A jurisdição contenciosa pressupõe a existência de uma controvérsia a ser solucionada.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. O litígio/controvérsia é o elemento definidor da jurisdição contenciosa.'
    }
  ];

  const procCivilDiscursiveQuestionsData = [
    {
      id: 16,
      enunciado: '16. Explique, com suas palavras, o que significa jurisdição.',
      respostaEsperada: 'Gabarito oficial: A jurisdição é a função exercida pelo Estado, por intermédio do Poder Judiciário, destinada a solucionar conflitos de interesses mediante a aplicação do Direito ao caso concreto.'
    },
    {
      id: 17,
      enunciado: '17. Qual é a principal finalidade da jurisdição?',
      respostaEsperada: 'Gabarito oficial: A principal finalidade da jurisdição é promover a pacificação social, além de aplicar corretamente a lei, proteger direitos, solucionar conflitos e garantir a segurança jurídica.'
    },
    {
      id: 18,
      enunciado: '18. Explique a diferença entre jurisdição contenciosa e jurisdição voluntária.',
      respostaEsperada: 'Gabarito oficial: Na jurisdição contenciosa existe um conflito de interesses (litígio) entre as partes a ser solucionado. Na jurisdição voluntária não há conflito propriamente dito, atuando o Judiciário para fiscalizar ou homologar atos previstos em lei.'
    },
    {
      id: 19,
      enunciado: '19. Diferencie jurisdição, ação e competência.',
      respostaEsperada: 'Gabarito oficial: Jurisdição é o poder do Estado de solucionar conflitos. Ação é o direito subjetivo da pessoa de provocar o Judiciário. Competência é a medida ou limite de atuação de cada órgão jurisdicional.'
    },
    {
      id: 20,
      enunciado: '20. Por que a imparcialidade do juiz é importante para garantir um processo justo?',
      respostaEsperada: 'Gabarito oficial: A imparcialidade assegura que o magistrado atue sem favorecer nenhuma das partes, garantindo a igualdade processual, o devido processo legal e a justiça das decisões judiciais.'
    }
  ];

  // Processo Penal Questions Data (Aula 6 • Princípios e Aplicação da Lei)
  const procPenalMcQuestionsData = [
    {
      id: 1,
      enunciado: '1. O Direito Processual Penal tem por finalidade principal:',
      alternativas: [
        'A) Punir imediatamente qualquer suspeito sem necessidade de julgamento.',
        'B) Estabelecer as regras para a investigação, o processo e o julgamento de infrações penais, respeitando os direitos fundamentais.',
        'C) Criar crimes e penas no ordenamento jurídico.',
        'D) Substituir a Constituição Federal em matérias criminais.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O Direito Processual Penal regulamenta a persecução penal do Estado (investigação, processo e julgamento) garantindo o respeito aos direitos fundamentais.'
    },
    {
      id: 2,
      enunciado: '2. O Princípio do Devido Processo Legal assegura que:',
      alternativas: [
        'A) Ninguém será privado da liberdade ou de seus bens sem o devido processo legal.',
        'B) O juiz pode condenar o réu sem ouvir a defesa.',
        'C) As provas ilícitas são sempre admitidas no processo penal.',
        'D) O processo penal pode ignorar prazos constitucionais.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: O devido processo legal (Art. 5º, LIV da CF) garante que a privação da liberdade ou de bens exige a observância do procedimento legal e das garantias constitucionais.'
    },
    {
      id: 3,
      enunciado: '3. A garantia conferida ao acusado de conhecer todos os atos do processo e poder se manifestar sobre eles diz respeito ao princípio do:',
      alternativas: [
        'A) Juiz natural.',
        'B) Contraditório.',
        'C) In dubio pro societate.',
        'D) Promotor natural.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O contraditório traduz-se no binômio informação (conhecer os atos) e possibilidade de reação (se manifestar sobre eles).'
    },
    {
      id: 4,
      enunciado: '4. Sobre a distinção entre Contraditório e Ampla Defesa, é correto afirmar:',
      alternativas: [
        'A) Contraditório e ampla defesa são conceitos idênticos e sem qualquer diferença técnica.',
        'B) Contraditório é o direito de participar e se manifestar; Ampla Defesa é o direito de utilizar todos os meios legais e adequados para se defender.',
        'C) Ampla defesa aplica-se apenas à acusação.',
        'D) O contraditório veda a presença de advogado no interrogatório.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O contraditório é o direito de informação e manifestação; a ampla defesa assegura os instrumentos e meios jurídicos para exercer a defesa efetiva.'
    },
    {
      id: 5,
      enunciado: '5. O Princípio da Presunção de Inocência (ou Não Culpabilidade) estabelece que:',
      alternativas: [
        'A) Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.',
        'B) A simples acusação formal já presume a culpa do réu.',
        'C) A prisão preventiva equivale a uma condenação definitiva.',
        'D) O réu deve provar sua inocência para não ser preso.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: Nos termos do Art. 5º, LVII da CF, a presunção de inocência vigora até o trânsito em julgado da sentença condenatória.'
    },
    {
      id: 6,
      enunciado: '6. A vedação à criação de tribunais de exceção e a garantia de que o réu será julgado pela autoridade previamente competente decorrem do princípio do:',
      alternativas: [
        'A) Promotor de exceção.',
        'B) Juiz Natural.',
        'C) Duplo grau facultativo.',
        'D) Livre convencimento absoluto.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O princípio do Juiz Natural (Art. 5º, LIII e XXXVII da CF) proíbe juízos/tribunais de exceção e exige julgamento por autoridade predeterminada por lei.'
    },
    {
      id: 7,
      enunciado: '7. Quanto ao Direito ao Silêncio assegurado ao acusado, assinale a alternativa correta:',
      alternativas: [
        'A) O silêncio pode ser interpretado pelo juiz como confissão de culpa.',
        'B) O acusado pode permanecer calado e seu silêncio não deve ser utilizado em prejuízo de sua defesa.',
        'C) O silêncio do réu gera presunção absoluta de veracidade da denúncia.',
        'D) O réu é obrigado a responder a todas as perguntas sob pena de crime de desobediência.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O direito ao silêncio (nemo tenetur se detegere) é garantia constitucional e não pode ser interpretado em prejuízo da defesa.'
    },
    {
      id: 8,
      enunciado: '8. Em relação à aplicação da lei processual penal no tempo, vigorando o princípio tempus regit actum (Art. 2º do CPP):',
      alternativas: [
        'A) A nova lei processual aplica-se desde logo aos processos em andamento, preservando-se a validade dos atos já realizados.',
        'B) A nova lei processual anula retroativamente todos os atos praticados sob a vigência da lei anterior.',
        'C) A nova lei processual só entra em vigor após o trânsito em julgado do processo.',
        'D) Leis processuais nunca podem ter aplicação imediata.'
      ],
      correta: 0,
      explicacao: 'Gabarito A: A lei processual penal tem aplicação imediata (tempus regit actum), sem prejuízo da validade dos atos realizados sob a vigência da lei anterior.'
    },
    {
      id: 9,
      enunciado: '9. Quanto à aplicação da lei processual penal no espaço, a regra geral adotada pelo Código de Processo Penal brasileiro é o princípio da:',
      alternativas: [
        'A) Extraterritorialidade irrestrita.',
        'B) Territorialidade, aplicando-se o CPP em todo o território nacional, ressalvadas exceções de leis, tratados e convenções internacionais.',
        'C) Personalidade passiva exclusiva.',
        'D) Universalidade absoluta.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O Art. 1º do CPP adota o princípio da territorialidade como regra, ressalvando raras exceções diplomáticas ou previstas em tratados.'
    },
    {
      id: 10,
      enunciado: '10. Sobre a interpretação da lei processual penal, é correto afirmar que:',
      alternativas: [
        'A) É vedada qualquer forma de interpretação da norma processual.',
        'B) Admite-se a interpretação da lei processual para determinar seu correto significado e alcance, podendo utilizar métodos literal, sistemático, histórico e teleológico.',
        'C) Apenas o método literal é admitido no Direito Processual Penal.',
        'D) A interpretação teleológica é proibida no processo penal.'
      ],
      correta: 1,
      explicacao: 'Gabarito B: O Art. 3º do CPP admite a interpretação extensiva e a aplicação analógica, bem como a utilização dos diversos métodos hermenêuticos para fixar o alcance da norma.'
    }
  ];

  const procPenalTfQuestionsData = [
    {
      id: 101,
      enunciado: '1. O Princípio do Devido Processo Legal assegura que ninguém será privado de sua liberdade ou de seus bens sem o cumprimento das regras e garantias previstas na legislação.',
      correta: true,
      explicacao: 'Verdadeiro: O devido processo legal (Art. 5º, LIV da CF) condiciona qualquer restrição de liberdade ou propriedade ao processo regular.'
    },
    {
      id: 102,
      enunciado: '2. O direito de permanecer em silêncio pode ser interpretado pelo magistrado como confissão tácita dos fatos alegados pela acusação.',
      correta: false,
      explicacao: 'Falso: O silêncio do acusado é direito constitucional (nemo tenetur se detegere) e jamais pode ser usado em prejuízo da defesa nem como confissão.'
    },
    {
      id: 103,
      enunciado: '3. Em regra, a lei processual penal brasileira aplica-se imediatamente aos processos em andamento (tempus regit actum), respeitada a validade dos atos processuais praticados sob a lei anterior.',
      correta: true,
      explicacao: 'Verdadeiro: Conforme o Art. 2º do CPP, a norma processual tem incidência imediata sem retroagir para anular atos válidos já consolidados.'
    },
    {
      id: 104,
      enunciado: '4. O princípio da territorialidade estabelece que o Código de Processo Penal será aplicado em todo o território brasileiro, sem qualquer ressalva a tratados ou convenções internacionais.',
      correta: false,
      explicacao: 'Falso: O Art. 1º do CPP ressalva expressamente as exceções decorrentes de tratados, convenções e regras de direito internacional.'
    }
  ];

  const procPenalDiscursiveQuestionsData = [
    {
      id: 201,
      enunciado: '1. Diferencie o Princípio do Contraditório do Princípio da Ampla Defesa no Direito Processual Penal.',
      respostaEsperada: 'Gabarito oficial: O Contraditório assegura o direito de informação (ciência dos atos do processo) e a oportunidade de reação/manifestação. A Ampla Defesa garante ao acusado a utilização de todos os meios e recursos juridicamente válidos para exercer sua defesa (defesa técnica e autodefesa).'
    },
    {
      id: 202,
      enunciado: '2. Explique como funciona a aplicação da lei processual penal no tempo, citando o princípio regente.',
      respostaEsperada: 'Gabarito oficial: A aplicação da lei processual penal no tempo rege-se pelo princípio tempus regit actum (Art. 2º do CPP). A nova lei aplica-se imediatamente aos processos em andamento, sem necessidade de aguardar o término da demanda, mas preservando-se inteiramente a validade dos atos processuais praticados sob a égide da lei anterior.'
    }
  ];

  // Direito Constitucional Flashcards Data (Aula 2 — Princípios Fundamentais)
  const constFlashcardsData = [
    {
      q: 'Quais são os 5 Fundamentos da República (Art. 1º CF/88)?',
      a: 'Soberania, Cidadania, Dignidade da pessoa humana, Valores sociais do trabalho e da livre iniciativa, Pluralismo político. (Mnemônico: SO-CI-DI-VA-PLU)'
    },
    {
      q: 'Como memorizar os Fundamentos do Art. 1º da CF/88?',
      a: 'SO-CI-DI-VA-PLU: Soberania → Cidadania → Dignidade → Valores sociais → Pluralismo político.'
    },
    {
      q: 'O que significa o Brasil constituir-se em Estado Democrático de Direito?',
      a: 'Significa que o poder estatal está submetido à Constituição e às leis, os cidadãos possuem direitos/garantias e as autoridades devem respeitar a ordem jurídica.'
    },
    {
      q: 'Quais são os três Poderes da União (Art. 2º CF/88) e sua relação?',
      a: 'Legislativo, Executivo e Judiciário. São independentes e harmônicos entre si.'
    },
    {
      q: 'Quais são as funções típicas dos três Poderes da União?',
      a: 'Legislativo: Elaborar leis e fiscalizar. Executivo: Administrar e executar políticas públicas. Judiciário: Julgar e solucionar conflitos (jurisdição).'
    },
    {
      q: 'Quais são os Objetivos Fundamentais da República (Art. 3º CF/88)?',
      a: 'I- Construir sociedade livre, justa e solidária; II- Garantir o desenvolvimento nacional; III- Erradicar a pobreza/marginalização e reduzir desigualdades; IV- Promover o bem de todos.'
    },
    {
      q: 'Como resumir os verbos dos Objetivos Fundamentais (Art. 3º CF/88)?',
      a: 'Construir → Desenvolver → Erradicar/Reduzir → Promover (Todos começam por verbos no infinitivo - CONERGAPRO).'
    },
    {
      q: 'Quais são os princípios que regem o Brasil nas Relações Internacionais (Art. 4º CF/88)?',
      a: 'Independência nacional, Direitos humanos, Autodeterminação dos povos, Não intervenção, Igualdade entre Estados, Defesa da paz, Solução pacífica de conflitos, Repúdio ao terrorismo/racismo, Cooperação e Asilo político.'
    },
    {
      q: 'Como diferenciar Fundamentos (Art. 1º) e Objetivos (Art. 3º) para a prova da FGV?',
      a: 'Fundamentos são substantivos/bases (SO-CI-DI-VA-PLU). Objetivos são metas/ações futuras iniciadas por VERBOS no infinitivo (Construir, Garantir, Erradicar, Promover).'
    },
    {
      q: 'Qual a prioridade geográfica constitucional de integração do Brasil (Art. 4º, Parágrafo Único)?',
      a: 'Integração econômica, política, social e cultural dos povos da América Latina.'
    }
  ];

  // Direito Constitucional Multiple Choice Questions Data
  const constMcQuestionsData = [
    {
      id: 1,
      enunciado: '1. A República Federativa do Brasil constitui-se em:',
      alternativas: [
        'Estado Unitário de Direito.',
        'Estado Democrático de Direito.',
        'Estado Parlamentarista.',
        'Estado Absolutista.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Conforme o caput do Art. 1º da CF/88, "A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito".'
    },
    {
      id: 2,
      enunciado: '2. É fundamento da República Federativa do Brasil:',
      alternativas: [
        'Defesa da paz.',
        'Desenvolvimento nacional.',
        'Dignidade da pessoa humana.',
        'Solução pacífica dos conflitos.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A Dignidade da pessoa humana é um dos 5 fundamentos previstos no Art. 1º, III da CF/88 (Mnemônico SOCIVADIPLU). As demais opções são objetivos (Art. 3º) ou princípios de relações internacionais (Art. 4º).'
    },
    {
      id: 3,
      enunciado: '3. Assinale a alternativa que apresenta apenas fundamentos da República:',
      alternativas: [
        'Soberania, cidadania e dignidade da pessoa humana.',
        'Defesa da paz, soberania e desenvolvimento nacional.',
        'Erradicação da pobreza, cidadania e pluralismo político.',
        'Igualdade entre os Estados, soberania e defesa da paz.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Soberania (inc. I), Cidadania (inc. II) e Dignidade da pessoa humana (inc. III) são todos fundamentos previstos no Art. 1º da CF/88.'
    },
    {
      id: 4,
      enunciado: '4. O pluralismo político está relacionado:',
      alternativas: [
        'À existência de diferentes ideias e posições políticas.',
        'À proibição de opiniões divergentes.',
        'À concentração do poder político.',
        'À ausência de participação popular.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. O pluralismo político (Art. 1º, V) assegura a livre circulação de ideias, a diversidade ideológica, filosófica e política na sociedade.'
    },
    {
      id: 5,
      enunciado: '5. A soberania constitui:',
      alternativas: [
        'Um objetivo fundamental.',
        'Um princípio das relações internacionais exclusivamente.',
        'Um fundamento da República.',
        'Um direito social.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A Soberania é o primeiro fundamento elencado no Art. 1º, I da Constituição Federal de 1988.'
    },
    {
      id: 6,
      enunciado: '6. São Poderes da União:',
      alternativas: [
        'Executivo, Legislativo e Ministério Público.',
        'Legislativo, Executivo e Judiciário.',
        'Judiciário, Ministério Público e Defensoria Pública.',
        'Executivo, Judiciário e Tribunal de Contas.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Conforme o Art. 2º da CF/88, "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário".'
    },
    {
      id: 7,
      enunciado: '7. Segundo a Constituição Federal, os Poderes da União são:',
      alternativas: [
        'Dependentes e subordinados.',
        'Independentes e harmônicos entre si.',
        'Independentes e hierarquizados.',
        'Subordinados ao Poder Executivo.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. De acordo com o Art. 2º da CF/88, os Poderes da União são independentes e harmônicos entre si (mecanismo de freios e contrapesos).'
    },
    {
      id: 8,
      enunciado: '8. É objetivo fundamental da República Federativa do Brasil:',
      alternativas: [
        'Conceder asilo político.',
        'Defender a paz.',
        'Garantir o desenvolvimento nacional.',
        'Promover a igualdade entre os Estados.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. Garantir o desenvolvimento nacional é um objetivo fundamental previsto no Art. 3º, II da CF/88.'
    },
    {
      id: 9,
      enunciado: '9. Assinale a alternativa que não corresponde a um objetivo fundamental do art. 3º:',
      alternativas: [
        'Construir uma sociedade livre, justa e solidária.',
        'Garantir o desenvolvimento nacional.',
        'Defender a paz.',
        'Promover o bem de todos.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. "Defender a paz" não é um objetivo fundamental (Art. 3º), mas sim um princípio regente das Relações Internacionais (Art. 4º, VII).'
    },
    {
      id: 10,
      enunciado: '10. A Constituição estabelece como objetivo fundamental:',
      alternativas: [
        'Erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais.',
        'Eliminar a livre iniciativa.',
        'Restringir a cidadania.',
        'Concentrar o poder político.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. Art. 3º, III da CF/88: "erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais" é um objetivo fundamental.'
    },
    {
      id: 11,
      enunciado: '11. Promover o bem de todos, sem preconceitos ou formas de discriminação, é:',
      alternativas: [
        'Fundamento da República.',
        'Objetivo fundamental da República.',
        'Princípio do Poder Judiciário.',
        'Princípio exclusivo da Administração Pública.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. "Promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação" é objetivo fundamental (Art. 3º, IV).'
    },
    {
      id: 12,
      enunciado: '12. A dignidade da pessoa humana é:',
      alternativas: [
        'Um fundamento da República.',
        'Um objetivo fundamental.',
        'Um princípio exclusivamente internacional.',
        'Uma competência municipal.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. A dignidade da pessoa humana é um fundamento insculpido no Art. 1º, III da CF/88.'
    },
    {
      id: 13,
      enunciado: '13. Os valores sociais do trabalho e da livre iniciativa são:',
      alternativas: [
        'Objetivos fundamentais.',
        'Fundamentos da República.',
        'Princípios das relações internacionais.',
        'Direitos políticos.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Os valores sociais do trabalho e da livre iniciativa constituem fundamento da República (Art. 1º, IV).'
    },
    {
      id: 14,
      enunciado: '14. Nas relações internacionais, o Brasil deve observar:',
      alternativas: [
        'A intervenção obrigatória em outros Estados.',
        'A prevalência dos direitos humanos.',
        'A superioridade militar brasileira.',
        'A eliminação da soberania dos demais países.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A prevalência dos direitos humanos é princípio regente do Brasil nas suas relações internacionais (Art. 4º, II).'
    },
    {
      id: 15,
      enunciado: '15. É princípio que rege as relações internacionais do Brasil:',
      alternativas: [
        'Não intervenção.',
        'Censura política.',
        'Subordinação internacional.',
        'Intervenção obrigatória.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. A "não intervenção" é princípio consagrado no Art. 4º, IV da CF/88 para a condução das relações internacionais.'
    },
    {
      id: 16,
      enunciado: '16. A defesa da paz está prevista como:',
      alternativas: [
        'Fundamento da República.',
        'Objetivo fundamental.',
        'Princípio das relações internacionais.',
        'Direito social.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A defesa da paz rege a atuação internacional da República Federativa do Brasil (Art. 4º, VI).'
    },
    {
      id: 17,
      enunciado: '17. A autodeterminação dos povos significa, em linhas gerais:',
      alternativas: [
        'Reconhecimento do direito dos povos de determinar livremente seu destino político.',
        'Obrigação de um Estado controlar outros povos.',
        'Proibição da soberania nacional.',
        'Subordinação dos Estados menores aos maiores.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. O princípio da autodeterminação dos povos (Art. 4º, III) garante que cada povo decida soberanamente sobre seu sistema político e desenvolvimento.'
    },
    {
      id: 18,
      enunciado: '18. O repúdio ao terrorismo e ao racismo é:',
      alternativas: [
        'Fundamento da República.',
        'Objetivo fundamental.',
        'Princípio das relações internacionais.',
        'Direito trabalhista.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. O repúdio ao terrorismo e ao racismo é princípio regente das relações internacionais (Art. 4º, VIII).'
    },
    {
      id: 19,
      enunciado: '19. Assinale a associação correta:',
      alternativas: [
        'Art. 1º — objetivos fundamentais.',
        'Art. 2º — relações internacionais.',
        'Art. 3º — objetivos fundamentais.',
        'Art. 4º — fundamentos da República.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. O Art. 3º estabelece os objetivos fundamentais da República. O Art. 1º cuida dos fundamentos, o Art. 2º da separação de poderes e o Art. 4º das relações internacionais.'
    },
    {
      id: 20,
      enunciado: '20. Um candidato afirma: “A dignidade da pessoa humana e a soberania são objetivos que o Brasil busca alcançar.” Essa afirmação está:',
      alternativas: [
        'Correta.',
        'Correta apenas em relação à soberania.',
        'Incorreta, pois ambos são fundamentos da República.',
        'Incorreta, pois ambos são princípios das relações internacionais.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A afirmação está incorreta porque Soberania e Dignidade da pessoa humana são FUNDAMENTOS (Art. 1º, I e III) e não objetivos (Art. 3º).'
    }
  ];

  // Direito Constitucional True/False Questions Data
  const constTfQuestionsData = [
    {
      id: 1,
      enunciado: '1. O pluralismo político (Art. 1º, V, CF/88) significa exclusivamente a garantia de existência de múltiplos partidos políticos no sistema eleitoral.',
      correta: false,
      explicacao: '✅ Gabarito: Falso. O pluralismo político é um conceito amplo que abrange a convivência harmoniosa de diferentes ideias, ideologias, crenças e convicções filosóficas e políticas, não se restringindo ao multipartidarismo.'
    },
    {
      id: 2,
      enunciado: '2. Os Objetivos Fundamentais da República (Art. 3º) iniciam-se formalmente por verbos no infinitivo, como Construir, Garantir, Erradicar/Reduzir e Promover.',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. Esta é a regra de ouro das bancas (FGV): Objetivos representam metas futuras e iniciam com VERBOS no infinitivo.'
    },
    {
      id: 3,
      enunciado: '3. A concessão de asilo político e a prevalência dos direitos humanos são princípios constitucionais regentes das Relações Internacionais do Brasil (Art. 4º).',
      correta: true,
      explicacao: '✅ Gabarito: Verdadeiro. Ambos estão elencados expressamente no Art. 4º, incisos II e X da Constituição Federal.'
    },
    {
      id: 4,
      enunciado: '4. No âmbito do artigo 2º da CF/88, a função típica do Poder Executivo é legislar e fiscalizar as contas públicas.',
      correta: false,
      explicacao: '✅ Gabarito: Falso. A função típica de legislar e fiscalizar pertence ao Poder LEGISLATIVO. A função típica do Executivo é administrar e gerir as políticas públicas.'
    }
  ];

  // Direito Constitucional Discursive Questions Data
  const constDiscursiveQuestionsData = [
    {
      id: 1,
      enunciado: '1. Explique a diferença teórica e prática entre os Fundamentos da República (Art. 1º) e os Objetivos Fundamentais (Art. 3º) da Constituição Federal de 1988, exemplificando dois de cada categoria.',
      respostaEsperada: 'Gabarito oficial: Os Fundamentos (Art. 1º) representam a base de sustentação e os valores essenciais sobre os quais o Estado brasileiro está edificado (ex: Soberania e Dignidade da Pessoa Humana - SOCIVADIPLU). Já os Objetivos Fundamentais (Art. 3º) correspondem às metas morfológicas e programas de ação governamental que a República busca alcançar no tempo (ex: Erradicar a pobreza e Garantir o desenvolvimento nacional - verbos no infinitivo).'
    },
    {
      id: 2,
      enunciado: '2. Discorra sobre o princípio da Separação dos Poderes consagrado no Artigo 2º da CF/88, especificando as funções típicas do Legislativo, Executivo e Judiciário, bem como o sentido de "independentes e harmônicos entre si".',
      respostaEsperada: 'Gabarito oficial: O Art. 2º estabelece os Poderes da União (Legislativo - função típica de legislar e fiscalizar; Executivo - função típica de administrar; Judiciário - função típica de julgar). Serem independentes significa que não há hierarquia entre eles e que nenhum Poder pode usurpar as competências do outro. Harmônicos refere-se ao dever de cooperação institucional e ao funcionamento do sistema de freios e contrapesos (checks and balances).'
    }
  ];

  // Active Questions & Flashcards Selection based on selectedSubject
  const flashcardsData = selectedSubject === 'portugues'
    ? portuguesFlashcardsData
    : selectedSubject === 'libras'
    ? librasFlashcardsData
    : selectedSubject === 'processo_penal'
    ? procPenalFlashcardsData
    : selectedSubject === 'processo_civil'
    ? procCivilFlashcardsData
    : selectedSubject === 'informatica'
    ? infFlashcardsData
    : selectedSubject === 'direito_const'
    ? constFlashcardsData
    : adminFlashcardsData;

  const activeMcQuestions = selectedSubject === 'portugues'
    ? portuguesMcQuestionsData
    : selectedSubject === 'libras'
    ? librasMcQuestionsData
    : selectedSubject === 'processo_penal'
    ? procPenalMcQuestionsData
    : selectedSubject === 'processo_civil'
    ? procCivilMcQuestionsData
    : selectedSubject === 'informatica'
    ? infMcQuestionsData
    : selectedSubject === 'direito_const'
    ? constMcQuestionsData
    : questionsData;

  const activeTfQuestions = selectedSubject === 'portugues'
    ? portuguesTfQuestionsData
    : selectedSubject === 'libras'
    ? librasTfQuestionsData
    : selectedSubject === 'processo_penal'
    ? procPenalTfQuestionsData
    : selectedSubject === 'processo_civil'
    ? procCivilTfQuestionsData
    : selectedSubject === 'informatica'
    ? infTfQuestionsData
    : selectedSubject === 'direito_const'
    ? constTfQuestionsData
    : tfQuestionsData;

  const activeDiscursiveQuestions = selectedSubject === 'portugues'
    ? portuguesDiscursiveQuestionsData
    : selectedSubject === 'libras'
    ? librasDiscursiveQuestionsData
    : selectedSubject === 'processo_penal'
    ? procPenalDiscursiveQuestionsData
    : selectedSubject === 'processo_civil'
    ? procCivilDiscursiveQuestionsData
    : selectedSubject === 'informatica'
    ? infDiscursiveQuestionsData
    : selectedSubject === 'direito_const'
    ? constDiscursiveQuestionsData
    : discursiveQuestionsData;

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const toggleChecklist = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMarkAsCompleted = () => {
    const newCompletedState = !isLessonCompleted;
    setIsLessonCompleted(newCompletedState);

    if (newCompletedState) {
      setChecklist({
        c1: true,
        c2: true,
        c3: true,
        c4: true,
        c5: true,
      });
    }

    try {
      const userProgressStr = localStorage.getItem('tjam_user_progress');
      if (userProgressStr) {
        const userProg = JSON.parse(userProgressStr);
        const topicIdMap: Record<string, string> = {
          portugues: 'port-1',
          libras: 'acess-1',
          processo_penal: 'pp-3',
          processo_civil: 'pc-1',
          informatica: 'inf-1',
          direito_admin: 'adm-1',
          direito_const: 'const-3',
        };
        const tid = topicIdMap[selectedSubject];
        if (tid) {
          let completedTopicIds: string[] = userProg.completedTopicIds || [];
          if (newCompletedState && !completedTopicIds.includes(tid)) {
            completedTopicIds = [...completedTopicIds, tid];
          } else if (!newCompletedState && completedTopicIds.includes(tid)) {
            completedTopicIds = completedTopicIds.filter((id) => id !== tid);
          }
          userProg.completedTopicIds = completedTopicIds;
          userProg.totalHoursStudied = Math.round(((userProg.totalHoursStudied || 0) + (newCompletedState ? 1.5 : -1.5)) * 10) / 10;
          if (userProg.totalHoursStudied < 0) userProg.totalHoursStudied = 0;
        }

        localStorage.setItem('tjam_user_progress', JSON.stringify(userProg));
        window.dispatchEvent(new Event('storage'));

        const totalCount = userProg.completedTopicIds?.length || 0;
        const totalPercentage = Math.min(100, Math.round((totalCount / 30) * 100));

        const subjectNameMap: Record<string, string> = {
          portugues: 'Língua Portuguesa',
          libras: 'LIBRAS',
          processo_penal: 'Processo Penal',
          processo_civil: 'Processo Civil',
          informatica: 'Informática',
          direito_admin: 'Direito Administrativo',
          direito_const: 'Direito Constitucional',
        };

        if (newCompletedState) {
          setToastMessage({
            text: `🎉 Aula de ${subjectNameMap[selectedSubject]} concluída! Progresso no site atualizado para ${totalPercentage}% (${totalCount} de 30 tópicos).`,
            type: 'success',
          });
        } else {
          setToastMessage({
            text: `Aula de ${subjectNameMap[selectedSubject]} reaberta. Progresso atualizado para ${totalPercentage}%.`,
            type: 'info',
          });
        }
      }
    } catch (e) {
      console.error('Error updating site progress:', e);
    }
  };

  const registerQuestionAttempt = (q: any, type: 'mc' | 'vf', isCorrect: boolean, selectedOptionId: string) => {
    const qIdStr = `aula-${selectedSubject}-${type}-${q.id}`;
    
    const topicNameMap: Record<string, string> = {
      portugues: 'Língua Portuguesa',
      libras: 'LIBRAS',
      processo_penal: 'Processo Penal',
      processo_civil: 'Processo Civil',
      informatica: 'Informática',
      direito_admin: 'Direito Administrativo',
      direito_const: 'Direito Constitucional',
    };

    const formattedQuestion: Question = {
      id: qIdStr,
      disciplineId: selectedSubject,
      topicId: `${selectedSubject}-1`,
      topicName: topicNameMap[selectedSubject] || 'Aula de Hoje',
      statement: q.textoApoio ? `[Texto de Apoio: "${q.textoApoio}"]\n\n${q.enunciado}` : q.enunciado,
      options: type === 'mc'
        ? (q.alternativas || q.opcoes || []).map((optStr: string, idx: number) => ({
            id: `opt-${idx}`,
            text: optStr,
          }))
        : [
            { id: 'opt-true', text: '✅ Verdadeiro' },
            { id: 'opt-false', text: '❌ Falso' },
          ],
      correctOptionId: type === 'mc' ? `opt-${q.correta}` : q.correta ? 'opt-true' : 'opt-false',
      explanation: q.explicacao,
      difficulty: 'médio',
      institution: 'TJAM 2026',
    };

    try {
      // 1. Save question object to tjam_questions
      const savedQuestions = localStorage.getItem('tjam_questions');
      let questionsList: Question[] = savedQuestions ? JSON.parse(savedQuestions) : [];
      if (!questionsList.some((item) => item.id === qIdStr)) {
        questionsList.push(formattedQuestion);
        localStorage.setItem('tjam_questions', JSON.stringify(questionsList));
      }

      // 2. Save progress attempt & register in Caderno de Erros if incorrect on first try
      const savedProgress = localStorage.getItem('tjam_user_progress');
      if (savedProgress) {
        const userProg = JSON.parse(savedProgress);
        const errorQuestionIds: string[] = userProg.errorQuestionIds || [];
        const questionAttempts = userProg.questionAttempts || [];

        questionAttempts.push({
          id: `att-${Date.now()}`,
          questionId: qIdStr,
          selectedOptionId,
          isCorrect,
          answeredAt: new Date().toISOString(),
        });

        if (!isCorrect) {
          if (!errorQuestionIds.includes(qIdStr)) {
            userProg.errorQuestionIds = [...errorQuestionIds, qIdStr];
          }
          setToastMessage({
            text: `❌ Questão errada registrada no Caderno de Erros para revisão focalizada!`,
            type: 'error',
          });
        } else {
          setToastMessage({
            text: `🎉 Resposta Correta! Ótimo desempenho.`,
            type: 'success',
          });
        }

        userProg.questionAttempts = questionAttempts;
        localStorage.setItem('tjam_user_progress', JSON.stringify(userProg));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error('Error saving question attempt to Caderno de Erros:', e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md text-xs font-bold ${
          toastMessage.type === 'success'
            ? 'bg-emerald-900/95 text-emerald-100 border-emerald-500/50'
            : toastMessage.type === 'error'
            ? 'bg-rose-900/95 text-rose-100 border-rose-500/50'
            : 'bg-slate-900/95 text-slate-100 border-slate-700/50'
        }`}>
          <span className="text-base">
            {toastMessage.type === 'success' ? '🎉' : toastMessage.type === 'error' ? '📌' : 'ℹ️'}
          </span>
          <div className="flex-1 leading-snug">
            {toastMessage.text}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
      {/* Primary Header Banner: Dynamic Subject - Aula Liberada */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl border border-emerald-500/30 space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Aula Liberada • TJAM 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                <Clock className="w-3.5 h-3.5" /> Aula de Hoje: {
                  selectedSubject === 'portugues' ? 'Língua Portuguesa'
                  : selectedSubject === 'libras' ? 'LIBRAS'
                  : selectedSubject === 'processo_penal' ? 'Processo Penal'
                  : selectedSubject === 'processo_civil' ? 'Processo Civil'
                  : selectedSubject === 'informatica' ? 'Informática'
                  : selectedSubject === 'direito_const' ? 'Direito Constitucional'
                  : 'Direito Administrativo'
                }
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
                {
                  selectedSubject === 'portugues' ? '🇧🇷 Língua Portuguesa • Aula 1 – Compreensão e Interpretação'
                  : selectedSubject === 'libras' ? '🤟 LIBRAS • Unidade 1 – Conceitos Básicos e Legislação'
                  : selectedSubject === 'processo_penal' ? '⚖️ Processo Penal • Aula 6 – Princípios e Aplicação da Lei Processual Penal'
                  : selectedSubject === 'processo_civil' ? '⚖️ Processo Civil • Aula 5 – Atos Processuais'
                  : selectedSubject === 'informatica' ? '💻 Informática • Capítulo 1 – Conceitos Básicos'
                  : selectedSubject === 'direito_const' ? '⚖️ Direito Constitucional • Aula 2 – Princípios Fundamentais'
                  : '📜 Direito Administrativo • Aula 3 – Atos Administrativos'
                }
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                {
                  selectedSubject === 'portugues' ? 'Aula 1 — Compreensão e Interpretação de Textos'
                  : selectedSubject === 'libras' ? 'Aula 1 — LIBRAS: Conceitos básicos, história e legislação'
                  : selectedSubject === 'processo_penal' ? 'Aula 6 — Princípios e Aplicação da Lei Processual Penal'
                  : selectedSubject === 'processo_civil' ? 'Aula 5 — Atos Processuais'
                  : selectedSubject === 'informatica' ? 'Aula 1 — Dado x Informação, Hardware, Software e Periféricos'
                  : selectedSubject === 'direito_const' ? 'Aula 2 — Princípios Fundamentais (Arts. 1º a 4º da CF/88)'
                  : 'Aula 3 — Atos Administrativos'
                }
              </h1>
              <p className="text-xs text-emerald-100 font-medium max-w-xl">
                {
                  selectedSubject === 'libras' ? 'Acessibilidade e Inclusão • Nível: Iniciante • Tempo estimado: 45–60 min • Preparatório Assistente Judiciário TJAM'
                  : 'Nível: Iniciante • Tempo estimado: 45–60 minutos • Preparatório Assistente Judiciário TJAM'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('conteudo')}
              className="px-5 py-3 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Ler Texto da Aula</span>
            </button>
          </div>
        </div>

        {/* Stats Grid: Progresso e Ranking & Atividades Concluídas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          {/* Progresso e Ranking Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Ranking Geral de Duplas</span>
            </div>

            <div className="space-y-2">
              {[
                { pos: 1, name: 'Lucas e Mariana', pct: '6,0%', isUser: false },
                { pos: 2, name: 'Gabriel e Sofia', pct: '5,7%', isUser: false },
                { pos: 3, name: 'Matheus e Beatriz', pct: '5,4%', isUser: false },
                { pos: 4, name: 'Rafael e Amanda', pct: '5,1%', isUser: false },
                { pos: 5, name: 'Carlos e Juliana', pct: '4,8%', isUser: false },
                { pos: 6, name: 'Bruno e Camila', pct: '4,5%', isUser: false },
                { pos: 7, name: 'Diego e Fernanda', pct: '4,2%', isUser: false },
                { pos: 8, name: 'Rodrigo e Larissa', pct: '4,0%', isUser: false },
                { pos: 9, name: 'Vinícius e Letícia', pct: '3,8%', isUser: false },
                { pos: 10, name: 'Thiago e Natália', pct: '3,7%', isUser: false },
                { pos: 11, name: 'Felipe e Isabela', pct: '3,5%', isUser: false },
                { pos: 12, name: 'Pedro e Eduardo', pct: '3,4%', isUser: true },
              ].map((d) => (
                <div
                  key={d.pos}
                  className={`flex items-center justify-between p-2.5 rounded-xl border ${
                    d.isUser
                      ? 'bg-sky-500/15 border-sky-400/40 shadow-sm ring-1 ring-sky-400/20'
                      : 'bg-slate-800/60 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded font-black text-[10px] flex items-center justify-center ${
                        d.isUser
                          ? 'bg-sky-600 text-white'
                          : d.pos === 1
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {d.pos}º
                    </span>
                    <span
                      className={`text-xs font-extrabold flex items-center gap-1.5 ${
                        d.isUser ? 'text-sky-300' : 'text-slate-300'
                      }`}
                    >
                      {d.name}
                      {d.isUser && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/30 text-sky-200 border border-sky-400/30 font-extrabold uppercase flex items-center gap-0.5">
                          <span>Sua Dupla</span>
                          <span>🧊</span>
                        </span>
                      )}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-black ${
                      d.isUser ? 'text-sky-400' : 'text-slate-400'
                    }`}
                  >
                    {d.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Atividades Concluídas Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Atividades de Hoje</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">10 Seções Teóricas</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Liberado</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">20 Questões + Flashcards</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Pronto</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Switcher Bar & Saved Progress Banner */}
      <div className="space-y-3">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-600 text-white font-bold">💾</span>
            <div>
              <p className="font-black text-emerald-900 dark:text-emerald-200">
                Aulas e Exercícios Salvos no Banco de Dados
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Seu progresso, respostas de questões e conteúdos lidos são salvos para você revisar a qualquer momento.
              </p>
            </div>
          </div>
          {isLessonCompleted && (
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider shrink-0 shadow">
              ✓ Aula Concluída
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => { setSelectedSubject('processo_penal'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
            className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between gap-2 cursor-pointer ${
              selectedSubject === 'processo_penal'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>1. Proc. Penal (Aula 6)</span>
            </div>
            {savedLessonsStore['processo_penal']?.completed ? (
              <span className="text-[10px] bg-emerald-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">✓ Salvo</span>
            ) : savedLessonsStore['processo_penal']?.selectedAnswers && Object.keys(savedLessonsStore['processo_penal'].selectedAnswers).length > 0 ? (
              <span className="text-[10px] bg-amber-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">Em andamento</span>
            ) : (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded">Aula 1 de Hoje</span>
            )}
          </button>

          <button
            onClick={() => { setSelectedSubject('processo_civil'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
            className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between gap-2 cursor-pointer ${
              selectedSubject === 'processo_civil'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>2. Proc. Civil (Aula 5)</span>
            </div>
            {savedLessonsStore['processo_civil']?.completed ? (
              <span className="text-[10px] bg-emerald-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">✓ Salvo</span>
            ) : savedLessonsStore['processo_civil']?.selectedAnswers && Object.keys(savedLessonsStore['processo_civil'].selectedAnswers).length > 0 ? (
              <span className="text-[10px] bg-amber-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">Em andamento</span>
            ) : (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded">Aula 2 de Hoje</span>
            )}
          </button>

          <button
            onClick={() => { setSelectedSubject('portugues'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between gap-2 cursor-pointer ${
              selectedSubject === 'portugues'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>Português</span>
            </div>
            {savedLessonsStore['portugues']?.completed ? (
              <span className="text-[10px] bg-emerald-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">✓ Salvo</span>
            ) : savedLessonsStore['portugues']?.selectedAnswers && Object.keys(savedLessonsStore['portugues'].selectedAnswers).length > 0 ? (
              <span className="text-[10px] bg-amber-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">Em andamento</span>
            ) : null}
          </button>

          <button
            onClick={() => { setSelectedSubject('direito_const'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
            className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between gap-2 cursor-pointer ${
              selectedSubject === 'direito_const'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>Dir. Constitucional</span>
            </div>
            {savedLessonsStore['direito_const']?.completed ? (
              <span className="text-[10px] bg-emerald-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">✓ Salvo</span>
            ) : savedLessonsStore['direito_const']?.selectedAnswers && Object.keys(savedLessonsStore['direito_const'].selectedAnswers).length > 0 ? (
              <span className="text-[10px] bg-amber-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">Em andamento</span>
            ) : null}
          </button>

          <button
            onClick={() => { setSelectedSubject('direito_admin'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
            className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between gap-2 cursor-pointer ${
              selectedSubject === 'direito_admin'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dir. Admin.</span>
            </div>
            {savedLessonsStore['direito_admin']?.completed ? (
              <span className="text-[10px] bg-emerald-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">✓ Salvo</span>
            ) : savedLessonsStore['direito_admin']?.selectedAnswers && Object.keys(savedLessonsStore['direito_admin'].selectedAnswers).length > 0 ? (
              <span className="text-[10px] bg-amber-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">Em andamento</span>
            ) : null}
          </button>

          <button
            onClick={() => { setSelectedSubject('libras'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between gap-2 cursor-pointer ${
              selectedSubject === 'libras'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>LIBRAS</span>
            </div>
            {savedLessonsStore['libras']?.completed ? (
              <span className="text-[10px] bg-emerald-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">✓ Salvo</span>
            ) : savedLessonsStore['libras']?.selectedAnswers && Object.keys(savedLessonsStore['libras'].selectedAnswers).length > 0 ? (
              <span className="text-[10px] bg-amber-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">Em andamento</span>
            ) : null}
          </button>

          <button
            onClick={() => { setSelectedSubject('informatica'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between gap-2 cursor-pointer ${
              selectedSubject === 'informatica'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Informática</span>
            </div>
            {savedLessonsStore['informatica']?.completed ? (
              <span className="text-[10px] bg-emerald-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">✓ Salvo</span>
            ) : savedLessonsStore['informatica']?.selectedAnswers && Object.keys(savedLessonsStore['informatica'].selectedAnswers).length > 0 ? (
              <span className="text-[10px] bg-amber-400/30 text-white font-extrabold px-1.5 py-0.5 rounded">Em andamento</span>
            ) : null}
          </button>
        </div>
      </div>

      {/* Top Breadcrumb & Metadata Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>
            {selectedSubject === 'portugues'
              ? 'Língua Portuguesa'
              : selectedSubject === 'libras'
              ? 'Acessibilidade e Inclusão'
              : selectedSubject === 'processo_penal'
              ? 'Processo Penal'
              : selectedSubject === 'processo_civil'
              ? 'Processo Civil'
              : selectedSubject === 'informatica'
              ? 'Informática'
              : selectedSubject === 'direito_const'
              ? 'Direito Constitucional'
              : 'Direito Administrativo'}
          </span>
          <span>•</span>
          <span>
            {selectedSubject === 'portugues'
              ? 'Unidade 1 — Compreensão e Interpretação'
              : selectedSubject === 'libras'
              ? 'Unidade 1 — Fundamentos da LIBRAS'
              : selectedSubject === 'processo_penal'
              ? 'Capítulo 1 — Princípios e Eficácia da Lei'
              : selectedSubject === 'processo_civil'
              ? 'Unidade 1 — Atos Processuais'
              : selectedSubject === 'informatica'
              ? 'Unidade 1 — Fundamentos de Informática'
              : selectedSubject === 'direito_const'
              ? 'Aula 2 — Princípios Fundamentais'
              : 'Unidade 1 — Atos Administrativos'}
          </span>
          <span>•</span>
          <span>
            {selectedSubject === 'portugues'
              ? 'Aula 1 — Compreensão e Interpretação de Textos'
              : selectedSubject === 'libras'
              ? 'Aula 1 — Conceitos básicos, história e legislação'
              : selectedSubject === 'processo_penal'
              ? 'Aula 6 — Princípios e Aplicação da Lei Processual Penal'
              : selectedSubject === 'processo_civil'
              ? 'Aula 5 — Atos Processuais'
              : selectedSubject === 'informatica'
              ? 'Capítulo 1 — Conceitos Básicos de Informática'
              : selectedSubject === 'direito_const'
              ? 'Arts. 1º a 4º da Constituição Federal'
              : 'Aula 3 — Atos Administrativos'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              {selectedSubject === 'portugues'
                ? '🇧🇷 Língua Portuguesa (Aula 1)'
                : selectedSubject === 'libras'
                ? 'Aula de Hoje: LIBRAS (Acessibilidade e Inclusão)'
                : selectedSubject === 'processo_penal'
                ? '🔥 AULA 1 DE HOJE • Processo Penal (Aula 6)'
                : selectedSubject === 'processo_civil'
                ? '🔥 AULA 2 DE HOJE • Processo Civil (Aula 5)'
                : selectedSubject === 'informatica'
                ? 'Informática'
                : selectedSubject === 'direito_const'
                ? '⚖️ Direito Constitucional (Aula 2)'
                : '🏛️ Direito Administrativo (Aula 3)'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {selectedSubject === 'portugues'
                ? '🇧🇷 Língua Portuguesa — Aula 1: Compreensão e Interpretação de Textos'
                : selectedSubject === 'libras'
                ? '🤟 LIBRAS — Aula 1: Conceitos básicos, história e legislação'
                : selectedSubject === 'processo_penal'
                ? '⚖️ Processo Penal — Aula 6: Princípios e Aplicação da Lei Processual Penal'
                : selectedSubject === 'processo_civil'
                ? '⚖️ Processo Civil — Aula 5: Atos Processuais'
                : selectedSubject === 'informatica'
                ? 'Aula 1 — Conceitos Básicos de Informática'
                : selectedSubject === 'direito_const'
                ? 'Aula 2 — Princípios Fundamentais (Arts. 1º ao 4º CF/88)'
                : '🏛️ Direito Administrativo — Aula 3: Atos Administrativos'}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              Tempo estimado: 45–60 min
            </span>
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Nível: Iniciante
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
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Pausa de Estudos — Aula Concluída!</h2>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              O conteúdo foi concluído com sucesso.
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-extrabold flex items-center justify-center gap-1.5 pt-1">
              <Clock className="w-4 h-4" /> Próxima aula: Sábado às 13h
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
                  {selectedSubject === 'portugues'
                    ? 'Unidade 1 — Língua Portuguesa: Compreensão e Interpretação de Textos'
                    : selectedSubject === 'libras'
                    ? 'Unidade 1 — LIBRAS: Conceitos básicos, história e legislação'
                    : selectedSubject === 'processo_civil'
                    ? 'Unidade 1 — Processo Civil: Atos Processuais (Aula 5)'
                    : selectedSubject === 'informatica'
                    ? 'Unidade 1 — Conceitos Básicos de Informática'
                    : selectedSubject === 'processo_penal'
                    ? 'Capítulo 1 — Processo Penal: Princípios e Aplicação da Lei (Aula 6)'
                    : 'Unidade 1 — Direito Administrativo: Atos Administrativos'}
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

            {/* Selector de Partes / Vídeos exclusivamente para Processo Penal */}
            {selectedSubject === 'processo_penal' && (
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSelectedVideoPart('video1')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedVideoPart === 'video1'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-amber-300" />
                  <span>🎬 Parte 1 (DMzz7MSkeTs)</span>
                </button>
                <button
                  onClick={() => setSelectedVideoPart('video2')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedVideoPart === 'video2'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-amber-300" />
                  <span>🎬 Parte 2 (U-oy5WXts3Q)</span>
                </button>
              </div>
            )}

            {/* Embedded YouTube Video Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
              <iframe
                className="w-full h-full"
                src={
                  selectedSubject === 'portugues'
                    ? 'https://www.youtube.com/embed/OxTNN-IKcEQ?autoplay=0&rel=0'
                    : selectedSubject === 'libras'
                    ? 'https://www.youtube.com/embed/WqUexIfQ_aQ?autoplay=0&rel=0'
                    : selectedSubject === 'processo_penal'
                    ? selectedVideoPart === 'video2'
                      ? 'https://www.youtube.com/embed/U-oy5WXts3Q?autoplay=0&rel=0'
                      : 'https://www.youtube.com/embed/DMzz7MSkeTs?autoplay=0&rel=0'
                    : selectedSubject === 'processo_civil'
                    ? 'https://www.youtube.com/embed/z1aED3CBGJk?autoplay=0&rel=0'
                    : selectedSubject === 'informatica'
                    ? 'https://www.youtube.com/embed/TGpVY6q0emY?autoplay=0&rel=0'
                    : selectedSubject === 'direito_const'
                    ? 'https://www.youtube.com/embed/Od6WAj4LWbI?autoplay=0&rel=0'
                    : 'https://www.youtube.com/embed/L2lXiq54qno?autoplay=0&rel=0'
                }
                title={
                  selectedSubject === 'portugues'
                    ? 'Vídeo Aula - Língua Portuguesa: Compreensão e Interpretação de Textos'
                    : selectedSubject === 'libras'
                    ? 'Vídeo Aula - LIBRAS: Conceitos básicos, história e legislação'
                    : selectedSubject === 'processo_penal'
                    ? `Vídeo Aula - Processo Penal: Princípios e Aplicação da Lei Processual Penal (${selectedVideoPart === 'video2' ? 'Parte 2' : 'Parte 1'})`
                    : selectedSubject === 'processo_civil'
                    ? 'Vídeo Aula - Processo Civil: Atos Processuais (Aula 5)'
                    : selectedSubject === 'informatica'
                    ? 'Vídeo Aula - Conceitos Básicos de Informática'
                    : selectedSubject === 'direito_const'
                    ? 'Vídeo Aula - Direito Constitucional: Princípios Fundamentais (Arts. 1º a 4º)'
                    : 'Vídeo Aula - Direito Administrativo: Atos Administrativos'
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Direct Link to YouTube */}
            <div className="flex justify-end">
              <a
                href={
                  selectedSubject === 'portugues'
                    ? 'https://youtu.be/OxTNN-IKcEQ?is=bzHSDcftIpBprD6X'
                    : selectedSubject === 'libras'
                    ? 'https://youtu.be/WqUexIfQ_aQ?is=MSdtBlG9aSokP_fR'
                    : selectedSubject === 'processo_penal'
                    ? selectedVideoPart === 'video2'
                      ? 'https://youtu.be/U-oy5WXts3Q?is=OkDpWRHA_U_WMRYp'
                      : 'https://youtu.be/DMzz7MSkeTs?is=F8VMLeGMwxJnWO61'
                    : selectedSubject === 'processo_civil'
                    ? 'https://youtu.be/z1aED3CBGJk?is=rCCVaBUjfDHK9RW7'
                    : selectedSubject === 'informatica'
                    ? 'https://youtu.be/TGpVY6q0emY?is=33qqqOBSlvjPqHMD'
                    : selectedSubject === 'direito_const'
                    ? 'https://youtu.be/Od6WAj4LWbI?is=TKCeFjJh24E1EA1_'
                    : 'https://youtu.be/L2lXiq54qno?is=KueIwsYpZML6aWQx'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>
                  Abrir no YouTube{selectedSubject === 'processo_penal' ? ` (${selectedVideoPart === 'video2' ? 'Parte 2' : 'Parte 1'})` : ''}
                </span>
              </a>
            </div>

            {/* Video Details & Quick Next Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="md:col-span-2 space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <h3 className="text-xs font-extrabold uppercase text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-500" /> O que você vai aprender neste vídeo:
                </h3>
                {selectedSubject === 'portugues' ? (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Diferença entre Compreensão (informações explícitas) e Interpretação (inferências/deduções lógicas).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Como identificar a Ideia Principal e a Tese desenvolvida pelo autor do texto.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Identificação de marcadores de coesão e conectivos (adversativos, conclusivos, explicativos).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Prevenção contra erros clássicos de bancas de concurso: Extrapolação, Redução e Contradição.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Resolução e análise crítica de exercícios no padrão Assistente Judiciário TJAM.</span>
                    </li>
                  </ul>
                ) : selectedSubject === 'libras' ? (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>O que é LIBRAS e sua natureza jurídica como língua autônoma e com sistema linguístico próprio.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Diferença crucial entre LIBRAS e Língua Portuguesa (LIBRAS não é tradução palavra por palavra).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Os 5 parâmetros formadores dos sinais (Configuração de mão, Movimento, Ponto de articulação, Orientação e Expressões faciais).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Conceito de Datilologia (alfabeto manual) e o papel decisivo das expressões faciais/corporais.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>A legislação para concursos: Lei nº 10.436/2002 e Decreto nº 5.626/2005 para o serviço público e o TJAM.</span>
                    </li>
                  </ul>
                ) : selectedSubject === 'processo_penal' ? (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>O que é o Inquérito Policial e sua natureza jurídica de procedimento administrativo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Os dois pilares fundamentais da finalidade: Materialidade (provas do fato) e Autoria.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>As 7 características essenciais: Administrativo, Investigativo, Inquisitivo, Escrito, Dispensável, Sigiloso e Oficial.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Diligências investigativas, indiciamento (indiciado ≠ condenado) e encerramento do inquérito.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Tabela comparativa direta entre Inquérito Policial e Processo Penal focada no TJAM.</span>
                    </li>
                  </ul>
                ) : selectedSubject === 'processo_civil' ? (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>O que é Jurisdição e como o Estado intervém para solucionar conflitos de forma imparcial.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Finalidade primordial da Jurisdição: promover a pacificação social e segurança jurídica.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Características essenciais: Substitutividade, Imparcialidade, Definitividade, Inércia e Unidade.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Distinção entre Jurisdição Contenciosa (litígio) e Jurisdição Voluntária (sem litígio).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Diferença prática entre os institutos da Jurisdição, Ação e Competência no TJAM.</span>
                    </li>
                  </ul>
                ) : selectedSubject === 'informatica' ? (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Conceito de Informática (Informação + Automática) e o papel do computador.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Diferença entre Dado (registro bruto) e Informação (dado contextualizado).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Divisão entre Hardware (físico) e Software (lógico), com exemplos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Classificação de periféricos: Entrada, Saída e Entrada/Saída (Mistos).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Sistemas Operacionais e informática aplicada ao Poder Judiciário (PJe).</span>
                    </li>
                  </ul>
                ) : selectedSubject === 'direito_const' ? (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Os 5 Fundamentos da República e o mnemônico SO-CI-DI-VA-PLU (Art. 1º).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Conceito de Estado Democrático de Direito e submissão do poder às leis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Tripartição dos Poderes (Legislativo, Executivo e Judiciário) e harmonia (Art. 2º).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Objetivos Fundamentais da República (Art. 3º) e a regra dos verbos no infinitivo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Princípios das Relações Internacionais e integração da América Latina (Art. 4º).</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Conceito de Ato Administrativo e exemplos práticos (nomeação, licença, autorização e sanção).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Os 5 Elementos do ato administrativo e o mnemônico CO–FI–FO–MO–OB (Competência, Finalidade, Forma, Motivo, Objeto).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Atributos dos atos: Presunção de Legitimidade, Imperatividade, Autoexecutoriedade e Tipicidade.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Diferença crucial para a prova: Anulação (ilegalidade) x Revogação (conveniência e oportunidade) x Convalidação (vício sanável).</span>
                    </li>
                  </ul>
                )}
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
                    Após o vídeo, acesse o texto completo, mapa mental ou responda as questões de fixação.
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
                    <span>Fazer Questões de Fixação</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: TEXTO COMPLETO DA AULA */}
      {activeTab === 'conteudo' && (
        selectedSubject === 'direito_const' ? (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Header Objectives */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — Direito Constitucional: Princípios Fundamentais
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Disciplina: ⚖️ Direito Constitucional | Aula 2 — Princípios Fundamentais (Arts. 1º a 4º da CF/88)
              </p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                Ao concluir esta aula, você dominará as bases da organização do Estado brasileiro e os valores constitucionais essenciais cobrados pela banca FGV para o TJAM:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Mnemônico dos Fundamentos: SOCIVADIPLU (Art. 1º)</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Características do Estado Democrático de Direito</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Separação e Funções Típicas dos Poderes (Art. 2º)</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Objetivos Fundamentais e Mnemônico CONERGAPRO (Art. 3º)</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Princípios das Relações Internacionais (Art. 4º)</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Regra de Ouro da FGV: Diferença entre Fundamentos x Objetivos</li>
              </ul>
            </section>

            {/* Seção 1: Constituição Federal */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. Constituição Federal & Princípios Fundamentais
              </h2>
              <p className="text-sm">
                Os <strong>Princípios Fundamentais</strong> estão consagrados principalmente nos <strong>arts. 1º a 4º da Constituição Federal de 1988</strong>.
              </p>
              <p className="text-sm">
                Eles estabelecem as bases estruturais da organização do Estado brasileiro, fixam as diretrizes políticas indispensáveis e traduzem os valores supremos que orientam toda a atuação estatal e a interpretação das demais normas jurídicas.
              </p>
            </section>

            {/* Seção 2: Fundamentos da República — Art. 1º */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. Fundamentos da República — Art. 1º
              </h2>
              <p className="text-sm">
                A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em <strong>Estado Democrático de Direito</strong> e possui <strong>cinco fundamentos</strong> essenciais:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">I — SOBERANIA</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    O Brasil possui autonomia para organizar seu Estado e exercer seu poder sem submissão a outro Estado.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">II — CIDADANIA</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Representa a participação do indivíduo na sociedade e na vida política, por meio do exercício de direitos e deveres.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">III — DIGNIDADE DA PESSOA HUMANA</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Estabelece a valorização e proteção da pessoa humana, sendo um dos principais fundamentos do Estado brasileiro.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">IV — VALORES SOCIAIS DO TRABALHO E DA LIVRE INICIATIVA</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    A Constituição valoriza tanto o trabalho quanto a liberdade de iniciativa econômica.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border md:col-span-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">V — PLURALISMO POLÍTICO</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Garante a convivência de diferentes ideias, opiniões e posições políticas na sociedade.
                  </p>
                </div>
              </div>

              {/* Mnemônico Box */}
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 font-black text-xs">
                  🧠 MNEMÔNICO
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase">
                    Para Memorizar os Fundamentos (Art. 1º):
                  </h4>
                  <p className="text-sm font-black text-emerald-700 dark:text-emerald-400 tracking-wider mt-1">
                    SO – CI – DI – VA – PLU
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    <strong>Soberania</strong> → <strong>Cidadania</strong> → <strong>Dignidade</strong> → <strong>Valores sociais</strong> → <strong>Pluralismo</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 3: Estado Democrático de Direito */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. Estado Democrático de Direito
              </h2>
              <p className="text-sm">
                O Brasil é um <strong>Estado Democrático de Direito</strong>. Isso significa que:
              </p>
              <div className={`p-5 rounded-2xl border space-y-2 text-xs ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>O poder estatal está submetido à Constituição e às leis;</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Os cidadãos possuem direitos e garantias;</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>A democracia participa da organização do poder;</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>As autoridades também devem respeitar a ordem jurídica.</span>
                </div>
              </div>
            </section>

            {/* Seção 4: Poderes da União — Art. 2º */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. Poderes da União — Art. 2º
              </h2>
              <p className="text-sm">
                São Poderes da União:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    ⚖️ LEGISLATIVO
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Tem como função típica elaborar leis e fiscalizar.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    🏛️ EXECUTIVO
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Tem como função típica administrar o Estado e executar políticas públicas.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    ⚖️ JUDICIÁRIO
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Tem como função típica exercer a jurisdição e solucionar conflitos.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                Os três Poderes são: <strong>independentes e harmônicos entre si</strong>.
              </div>
            </section>

            {/* Seção 5: Objetivos Fundamentais — Art. 3º */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Objetivos Fundamentais — Art. 3º
              </h2>
              <p className="text-sm">
                São objetivos fundamentais da República Federativa do Brasil:
              </p>

              <div className="space-y-2 text-xs">
                <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <strong>I — Construir</strong> uma sociedade livre, justa e solidária.
                </div>
                <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <strong>II — Garantir</strong> o desenvolvimento nacional.
                </div>
                <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <strong>III — Erradicar</strong> a pobreza e a marginalização e <strong>reduzir</strong> as desigualdades sociais e regionais.
                </div>
                <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <strong>IV — Promover</strong> o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.
                </div>
              </div>

              {/* Resumindo CONERGAPRO */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-600 text-white shrink-0 font-black text-xs">
                  🧠 RESUMINDO
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-amber-800 dark:text-amber-300 uppercase">
                    Sequência de Verbos dos Objetivos (Art. 3º):
                  </h4>
                  <p className="text-sm font-black text-amber-700 dark:text-amber-400 tracking-wider mt-1">
                    Construir → Desenvolver → Erradicar/Reduzir → Promover
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Mnemônico: <strong>CONERGAPRO</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 6: Princípios das Relações Internacionais — Art. 4º */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                6. Princípios das Relações Internacionais — Art. 4º
              </h2>
              <p className="text-sm">
                O Brasil rege-se, em suas relações internacionais, por princípios como:
              </p>

              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Independência nacional;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Prevalência dos direitos humanos;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Autodeterminação dos povos;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Não intervenção;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Igualdade entre os Estados;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Defesa da paz;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Solução pacífica dos conflitos;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Repúdio ao terrorismo e ao racismo;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Cooperação entre os povos para o progresso da humanidade;</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Concessão de asilo político.</li>
                </ul>
              </div>
            </section>

            {/* Seção 7: Diferença Importante para a Prova */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                7. Diferença Importante para a Prova
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5">
                  <span className="font-black text-emerald-800 dark:text-emerald-300 uppercase block">FUNDAMENTOS (Art. 1º)</span>
                  <p className="text-slate-700 dark:text-slate-300">Bases da República.</p>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400">Exemplo: Dignidade da pessoa humana.</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Substantivos (SOCIVADIPLU).</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                  <span className="font-black text-amber-800 dark:text-amber-300 uppercase block">OBJETIVOS (Art. 3º)</span>
                  <p className="text-slate-700 dark:text-slate-300">O que a República busca alcançar.</p>
                  <p className="font-bold text-amber-700 dark:text-amber-400">Exemplo: Erradicar a pobreza e reduzir as desigualdades.</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Verbos no infinitivo (CONERGAPRO).</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs space-y-1.5">
                  <span className="font-black text-blue-800 dark:text-blue-300 uppercase block">RELAÇÕES INTERNACIONAIS (Art. 4º)</span>
                  <p className="text-slate-700 dark:text-slate-300">Princípios que orientam atuação perante outros países.</p>
                  <p className="font-bold text-blue-700 dark:text-blue-400">Exemplo: Defesa da paz.</p>
                </div>
              </div>
            </section>

            {/* Seção 8: O que você precisa memorizar */}
            <section className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <h3 className="font-black text-amber-800 dark:text-amber-400 uppercase text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> 🎯 O QUE VOCÊ PRECISA MEMORIZAR
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-amber-500/20">
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold block mb-1">Art. 1º:</span>
                  🇧🇷 SO-CI-DI-VA-PLU
                </div>
                <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-amber-500/20">
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold block mb-1">Art. 2º:</span>
                  ⚖️ Legislativo + Executivo + Judiciário
                </div>
                <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-amber-500/20">
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold block mb-1">Art. 3º:</span>
                  🎯 Construir + Desenvolver + Erradicar/Reduzir + Promover
                </div>
                <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-amber-500/20">
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold block mb-1">Art. 4º:</span>
                  🌎 Princípios das relações internacionais
                </div>
              </div>
            </section>

            {/* Action Bottom Controls */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('flashcards')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Flashcards</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleMarkAsCompleted}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isLessonCompleted
                    ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
              </button>
            </div>
          </article>
        ) : selectedSubject === 'portugues' ? (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Header Objectives */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — Língua Portuguesa: Compreensão e Interpretação de Textos
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Disciplina: 🇧🇷 Língua Portuguesa | Aula 1
              </p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                <strong>Objetivo:</strong> Aprender a identificar o que o texto realmente diz, interpretar informações e responder questões de concurso com segurança.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Diferenciar Compreensão (explícito) de Interpretação (implícito).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Identificar o Tema e a Ideia Principal em qualquer texto de prova.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Fazer inferências válidas sem extrapolar ou inventar dados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Distinguir Tipos Textuais de Gêneros Textuais e reconhecer finalidades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Aplicar o método de 6 etapas para resolver questões e eliminar alternativas.</span>
                </li>
              </ul>
            </section>

            {/* 1. Compreensão x Interpretação */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. Compreensão x Interpretação
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-base font-black text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                    📌 Compreensão
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3">
                    É identificar informações que estão <strong>diretamente apresentadas</strong> no texto (explícitas).
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Exemplo:</p>
                    <p className="italic text-slate-600 dark:text-slate-400">"O servidor chegou ao tribunal às 8 horas."</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">Pergunta: A que horas o servidor chegou?</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">Resposta: Às 8 horas (A informação está explícita).</p>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-base font-black text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                    📌 Interpretação
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3">
                    É compreender informações que podem ser <strong>deduzidas</strong> a partir do texto, relacionando as ideias apresentadas.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Exemplo:</p>
                    <p className="italic text-slate-600 dark:text-slate-400">"O servidor chegou ao tribunal às 8 horas. Pouco depois, iniciou o atendimento ao público."</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400 pt-1">Conclusão:</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">Podemos concluir que o servidor começou suas atividades após chegar ao tribunal (inferência fundada no texto).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Informações explícitas e implícitas */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. Informações explícitas e implícitas
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-black text-sm text-emerald-700 dark:text-emerald-300 mb-1">Explícita</h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Está claramente escrita. <em>Exemplo: "Manaus é a capital do Amazonas."</em> → Informação explícita: Manaus é a capital do Amazonas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-black text-sm text-blue-700 dark:text-blue-300 mb-1">Implícita</h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Não está diretamente escrita, mas pode ser deduzida. <em>Exemplo: "João saiu de casa levando um guarda-chuva."</em> → Inferência: Havia possibilidade de chuva.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border flex items-center gap-3 ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-xs font-bold">
                    ⚠️ Cuidado: uma inferência precisa estar sustentada pelo texto. Não devemos inventar informações (evite extrapolação).
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Tema do texto */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. Tema do texto
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                O tema é o assunto principal abordado pelo texto. Responde à pergunta: <strong>"Sobre o que esse texto fala?"</strong>
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'} space-y-2`}>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Exemplo: Um texto apresenta informações sobre o aumento do uso de tecnologia nos tribunais.</p>
                <div className="flex flex-col sm:flex-row gap-2 text-xs">
                  <span className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                    ✅ Tema: Uso da tecnologia no Poder Judiciário.
                  </span>
                  <span className="p-2.5 rounded-xl bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/30">
                    ❌ Errado: "O computador utilizado pelos servidores" (apenas detalhe secundário).
                  </span>
                </div>
              </div>
            </section>

            {/* 4. Ideia principal */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. Ideia principal
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A ideia principal representa aquilo que o autor pretende destacar sobre o tema.
              </p>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm space-y-2">
                <p><strong>Tema:</strong> Tecnologia no Judiciário.</p>
                <p><strong>Ideia principal:</strong> A utilização de novas tecnologias pode tornar os serviços judiciais mais rápidos e acessíveis.</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-bold pt-1 border-t border-emerald-500/20">
                  Diferença fundamental: Tema = assunto. Ideia principal = o que o texto afirma/defende sobre esse assunto.
                </p>
              </div>
            </section>

            {/* 5. Ideias secundárias */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Ideias secundárias
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                São informações que explicam, desenvolvem ou complementam a ideia principal (exemplos, explicações, dados estatísticos, consequências, comparações e argumentos secundários).
              </p>
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-400">
                ⚠️ Dica de Concurso: Não confunda uma informação secundária (detalhe) com a ideia central do texto.
              </div>
            </section>

            {/* 6. Inferência */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                6. Inferência
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Inferir significa chegar a uma conclusão a partir das informações disponíveis no texto.
              </p>
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs sm:text-sm">
                <p className="italic text-slate-300">"Maria pegou o guarda-chuva antes de sair e observou o céu escuro."</p>
                <p>O texto não afirma expressamente: <em>"Vai chover."</em></p>
                <p className="text-emerald-400 font-bold">Mas podemos inferir que Maria esperava chuva devido às pistas do texto.</p>
              </div>
            </section>

            {/* 7. Tipos textuais */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                7. Tipos textuais
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">📝 Narrativo</h4>
                  <p className="text-slate-600 dark:text-slate-300">Relata acontecimentos com personagens, tempo e espaço.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">📖 Descritivo</h4>
                  <p className="text-slate-600 dark:text-slate-300">Apresenta características de pessoas, lugares, objetos ou situações.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">💡 Dissertativo</h4>
                  <p className="text-slate-600 dark:text-slate-300">Expositivo (explica assunto) ou Argumentativo (defende opinião/tese com argumentos).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">📢 Injuntivo</h4>
                  <p className="text-slate-600 dark:text-slate-300">Oferece instruções, orientações ou comandos (ex: manuais, editais, receitas).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">🗣️ Dialogal</h4>
                  <p className="text-slate-600 dark:text-slate-300">Interação verbal direta entre interlocutores.</p>
                </div>
              </div>
            </section>

            {/* 8. Gênero textual */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                8. Gênero textual
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                O gênero textual é a forma concreta que o texto assume em determinada situação de comunicação na sociedade.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {['notícia', 'reportagem', 'artigo de opinião', 'carta', 'e-mail', 'anúncio', 'receita', 'manual', 'edital', 'ofício', 'crônica'].map(g => (
                  <span key={g} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    {g}
                  </span>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-semibold space-y-1">
                <p className="text-amber-400 font-bold">⚠️ Não confunda em provas:</p>
                <p>• Tipo textual → Estrutura linguística predominante (narrativo, dissertativo...).</p>
                <p>• Gênero textual → Forma social utilizada para comunicar (edital, notícia, e-mail...).</p>
              </div>
            </section>

            {/* 9. Finalidade do texto */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                9. Finalidade do texto
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Refere-se ao objetivo principal do autor. Pergunte: <strong>"Para que esse texto foi escrito?"</strong> (informar, explicar, convencer, orientar, criticar, narrar, descrever, divertir, instruir).
              </p>
            </section>

            {/* 10. Ponto de vista do autor */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                10. Ponto de vista do autor
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Em textos argumentativos, identifique a <strong>Tese</strong> (opinião ou posição defendida) e os <strong>Argumentos</strong> (razões e provas utilizadas para sustentar a tese).
              </p>
            </section>

            {/* 11. Palavras-chave */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                11. Palavras-chave & Conectivos de Relação
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
                Preste atenção nos conectivos que estabelecem relações lógicas entre as frases:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-black">
                {['portanto', 'porém', 'entretanto', 'porque', 'embora', 'além disso', 'consequentemente', 'assim', 'contudo', 'dessa forma'].map(p => (
                  <span key={p} className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                    {p}
                  </span>
                ))}
              </div>
            </section>

            {/* 12. Método de resolução */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                12. Como resolver questões de interpretação (Método de 6 Etapas)
              </h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                <li className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">1️⃣ Leia o texto inteiro</strong>
                  Não tente responder lendo apenas frases soltas.
                </li>
                <li className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">2️⃣ Identifique o assunto</strong>
                  Sobre o que o texto está falando em linhas gerais?
                </li>
                <li className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">3️⃣ Encontre a ideia principal</strong>
                  Qual a mensagem central que o autor quer transmitir?
                </li>
                <li className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">4️⃣ Observe informações importantes</strong>
                  Atente para dados, exemplos e conclusões.
                </li>
                <li className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">5️⃣ Releia o enunciado</strong>
                  Entenda exatamente se a banca pede COMPREENSÃO (explícito) ou INTERPRETAÇÃO (implícito).
                </li>
                <li className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">6️⃣ Elimine alternativas</strong>
                  Desconfie das opções que contradizem, exageram, inventam dados sem fundamento ou generalizam.
                </li>
              </ol>
            </section>

            {/* Resumo da Aula */}
            <section className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-amber-500/30">
              <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                🎯 RESUMO DA AULA & 🏆 FOCO PARA O CONCURSO
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                <li>• <strong>COMPREENSÃO:</strong> busca o que está escrito diretamente (explícito).</li>
                <li>• <strong>INTERPRETAÇÃO:</strong> relaciona informações e realiza inferências (implícito com fundamentação).</li>
                <li>• <strong>TEMA ≠ IDEIA PRINCIPAL:</strong> Tema é o assunto abrangente; Ideia Principal é a posição central do autor.</li>
                <li>• <strong>TIPO TEXTUAL ≠ GÊNERO TEXTUAL:</strong> Tipo é a estrutura; Gênero é a forma social concreta.</li>
              </ul>
            </section>
          </article>
        ) : selectedSubject === 'libras' ? (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Header Objectives */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — LIBRAS: Conceitos básicos, história e legislação
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Disciplina: Acessibilidade e Inclusão | Nível: Iniciante
              </p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                <strong>Objetivo:</strong> Compreender os fundamentos da LIBRAS e sua importância no atendimento ao cidadão no serviço público e Poder Judiciário.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Compreender a natureza da LIBRAS como língua autônoma e não simples tradução.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Identificar os usuários da LIBRAS e os 5 parâmetros formadores dos sinais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Diferenciar LIBRAS de Datilologia e entender o papel da expressão facial.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Dominar a legislação essencial de concurso: Lei nº 10.436/2002 e Decreto nº 5.626/2005.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Aplicar os princípios de acessibilidade no atendimento do Assistente Judiciário.</span>
                </li>
              </ul>
            </section>

            {/* 1. O que é LIBRAS? */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. O que é LIBRAS?
              </h2>
              <p className="text-sm">
                <strong>LIBRAS</strong> significa <strong>Língua Brasileira de Sinais</strong>.
              </p>
              <p className="text-sm">
                É uma língua utilizada principalmente pela comunidade surda brasileira para comunicação e expressão.
              </p>

              <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
                <p className="text-xs font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Um Ponto Fundamental Para a Prova!
                </p>
                <blockquote className="text-sm font-extrabold text-slate-900 dark:text-amber-100 italic border-l-2 border-amber-500 pl-3 py-1">
                  "LIBRAS não é uma simples tradução do português para sinais."
                </blockquote>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Ela possui <strong>estrutura gramatical própria</strong>, com regras e características linguísticas específicas. A LIBRAS utiliza principalmente elementos <strong>visuais e espaciais</strong>, enquanto o português é uma língua predominantemente oral-auditiva.
                </p>
              </div>
            </section>

            {/* 2. LIBRAS é uma língua? */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. LIBRAS é uma língua?
              </h2>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                Sim.
              </p>
              <p className="text-sm">
                A LIBRAS é reconhecida legalmente como meio de comunicação e expressão. A <strong>Lei nº 10.436/2002</strong> reconhece a LIBRAS como meio legal de comunicação e expressão.
              </p>
              <p className="text-sm">
                A lei também estabelece que a LIBRAS possui um <strong>sistema linguístico próprio</strong>, constituído por estrutura gramatical específica.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                  Para Memorizar em Prova
                </span>
                <p className="text-base font-black text-slate-900 dark:text-white mt-1">
                  LIBRAS = Língua (com sistema linguístico próprio), NÃO linguagem improvisada ou gestos informais.
                </p>
              </div>
            </section>

            {/* 3. Quem utiliza a LIBRAS? */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. Quem utiliza a LIBRAS?
              </h2>
              <p className="text-sm">
                A LIBRAS é utilizada principalmente por <strong>pessoas surdas no Brasil</strong>.
              </p>
              <p className="text-sm font-medium">
                Entretanto, também é amplamente utilizada por:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 pl-2">
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Check className="w-4 h-4 text-emerald-500" /> Familiares de pessoas surdas;
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Check className="w-4 h-4 text-emerald-500" /> Professores e educadores;
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Check className="w-4 h-4 text-emerald-500" /> Tradutores e intérpretes;
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Check className="w-4 h-4 text-emerald-500" /> Profissionais da saúde;
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Check className="w-4 h-4 text-emerald-500" /> Servidores públicos (ex: Assistente Judiciário);
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Check className="w-4 h-4 text-emerald-500" /> Pessoas que convivem com a comunidade surda.
                </li>
              </ul>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                Portanto, aprender LIBRAS contribui para ampliar a comunicação e a acessibilidade na sociedade.
              </p>
            </section>

            {/* 4. LIBRAS e Língua Portuguesa */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. LIBRAS e Língua Portuguesa
              </h2>
              <p className="text-sm">
                LIBRAS e Português são <strong>línguas diferentes</strong>.
              </p>
              <p className="text-sm">
                A LIBRAS possui:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">Vocabulário próprio</div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">Regras gramaticais</div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">Estrutura autônoma</div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">Elementos visuais e espaciais</div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">Variações linguísticas regionais</div>
              </div>
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                Por isso, não devemos simplesmente pegar uma frase em português e substituir cada palavra por um sinal.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <p className="text-xs font-bold text-slate-500 uppercase">Exemplo de Aplicação</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Uma frase em português pode possuir uma organização sintática completamente diferente quando expressada em LIBRAS. Isso ocorre porque cada língua possui sua própria estrutura gramatical autônoma.
                </p>
              </div>
            </section>

            {/* 5. Como a LIBRAS funciona? */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Como a LIBRAS funciona? (Parâmetros dos Sinais)
              </h2>
              <p className="text-sm">
                Os sinais são produzidos utilizando diferentes elementos e parâmetros formativos. Entre os principais aspectos estão:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">1. Configuração de mão</span>
                  <p className="text-slate-700 dark:text-slate-300">É o formato assumido pela mão durante a realização do sinal.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">2. Movimento</span>
                  <p className="text-slate-700 dark:text-slate-300">É a maneira como a mão ou as mãos se movimentam no espaço.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">3. Localização (Ponto de Articulação)</span>
                  <p className="text-slate-700 dark:text-slate-300">É o local do corpo ou do espaço onde o sinal é realizado.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">4. Orientação da palma</span>
                  <p className="text-slate-700 dark:text-slate-300">Refere-se à direção para a qual a palma da mão está voltada (para cima, para baixo, para dentro, etc.).</p>
                </div>
                <div className="p-4 rounded-2xl md:col-span-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">5. Expressões não manuais</span>
                  <p className="text-slate-700 dark:text-slate-300">Incluem expressões faciais e movimentos corporais que participam ativamente da construção do significado do sinal.</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Esses elementos combinados fazem toda a diferença na identificação e no significado dos sinais.
              </p>
            </section>

            {/* 6. Datilologia */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                6. Datilologia
              </h2>
              <p className="text-sm">
                A <strong>datilologia</strong> é a representação de letras do alfabeto por meio das mãos (conhecida como <strong>alfabeto manual</strong>).
              </p>
              <p className="text-sm font-semibold">
                Pode ser utilizada, por exemplo, para:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 pl-2">
                <li>Soletrar nomes próprios de pessoas ou lugares;</li>
                <li>Representar palavras específicas ou siglas;</li>
                <li>Indicar termos que ainda não possuem um sinal conhecido pelo interlocutor;</li>
                <li>Auxiliar na comunicação de determinadas informações pontuais.</li>
              </ul>

              <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
                <span className="text-xs font-black text-amber-700 dark:text-amber-300 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Atenção de Prova
                </span>
                <p className="text-xs font-extrabold text-slate-900 dark:text-amber-100">
                  Datilologia NÃO é sinônimo de LIBRAS.
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Ela é apenas um dos recursos complementares utilizados na comunicação em língua de sinais.
                </p>
              </div>
            </section>

            {/* 7. A importância da expressão facial */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                7. A importância da expressão facial
              </h2>
              <p className="text-sm">
                Na LIBRAS, a comunicação não depende somente das mãos. As <strong>expressões faciais e corporais</strong> desempenham papel importante na construção do significado.
              </p>
              <p className="text-sm font-semibold">
                Elas podem contribuir para indicar, por exemplo:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold text-center">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Emoções</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Intensidade</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Perguntas (Interrogação)</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Negação</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Afirmação</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Características gramaticais</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Por isso, observar apenas as mãos pode não ser suficiente para compreender completamente uma mensagem em LIBRAS.
              </p>
            </section>

            {/* 8. História e reconhecimento legal */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                8. História e reconhecimento legal
              </h2>
              <p className="text-sm">
                A educação de pessoas surdas no Brasil possui uma história marcada por diferentes métodos e debates sobre comunicação e educação.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs shrink-0">1857</span>
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white">Criação do INES (Instituto Nacional de Educação de Surdos)</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">Um marco histórico fundamental, sendo a primeira instituição histórica dedicada à educação de pessoas surdas no Brasil.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs shrink-0">2002</span>
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white">Lei nº 10.436/2002</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">Marco fundamental que reconheceu a LIBRAS como meio legal de comunicação e expressão no Brasil.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs shrink-0">2005</span>
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white">Decreto nº 5.626/2005</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">Regulamentou a Lei nº 10.436/2002, tratando da formação de professores e intérpretes, ensino de LIBRAS e acessibilidade.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 9. Lei nº 10.436/2002 */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                9. Lei nº 10.436/2002
              </h2>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                Essa lei é de extrema relevância para concursos públicos.
              </p>
              <p className="text-sm">
                Ela:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pl-2">
                <li>Reconhece a LIBRAS como meio legal de comunicação e expressão;</li>
                <li>Reconhece sua natureza de sistema linguístico próprio;</li>
                <li>Determina que o poder público deve apoiar o uso e a difusão da LIBRAS.</li>
              </ul>

              <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
                <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" /> Pegadinha Frequente de Prova ⚠️
                </span>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-bold">
                  A lei NÃO transforma a LIBRAS em substituta da língua portuguesa escrita.
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  A LIBRAS e o Português possuem funções e estruturas próprias. A legislação garante a LIBRAS sem substituir a modalidade escrita da Língua Portuguesa.
                </p>
              </div>
            </section>

            {/* 10. Decreto nº 5.626/2005 */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                10. Decreto nº 5.626/2005
              </h2>
              <p className="text-sm">
                O <strong>Decreto nº 5.626/2005</strong> regulamenta a Lei nº 10.436/2002.
              </p>
              <p className="text-sm font-semibold">
                Ele trata, entre outros assuntos essenciais, de:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Educação de pessoas surdas (educação bilíngue);
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Formação de professores de LIBRAS;
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Formação de tradutores e intérpretes;
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Utilização da LIBRAS nos serviços públicos;
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Atendimento adequado às pessoas surdas;
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Acessibilidade e comunicação integral.
                </div>
              </div>
            </section>

            {/* 11. LIBRAS no serviço público */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                11. LIBRAS no serviço público
              </h2>
              <p className="text-sm">
                Para o cargo de <strong>Assistente Judiciário no TJAM</strong>, compreender acessibilidade e comunicação com pessoas surdas é especialmente importante.
              </p>
              <p className="text-sm">
                O atendimento público deve buscar garantir que a pessoa surda tenha condições adequadas de acesso aos serviços públicos. Isso está fundamentado nos princípios de:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-extrabold">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">Acessibilidade</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">Igualdade</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">Inclusão</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">Respeito à Dignidade</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">Atendimento Adequado</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No ambiente do Poder Judiciário, a comunicação acessível contribui para que a pessoa surda possa exercer seus direitos e ter acesso efetivo à Justiça.
              </p>
            </section>

            {/* 12. Pessoa surda e deficiência auditiva */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                12. Pessoa surda e deficiência auditiva
              </h2>
              <p className="text-sm">
                É importante não tratar todas as pessoas com perda auditiva como se tivessem exatamente as mesmas necessidades. Existem diferentes experiências relacionadas à surdez e à deficiência auditiva.
              </p>
              <p className="text-sm font-semibold">
                Uma pessoa pode utilizar:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold">LIBRAS</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold">Português Oral</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold">Português Escrito</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold">Aparelhos Auditivos</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold">Implante Coclear</div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold">Combinação de Recursos</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Por isso, o atendimento público deve considerar sempre as necessidades e preferências individuais de comunicação da própria pessoa.
              </p>
            </section>

            {/* Resumo para memorizar */}
            <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50 border-emerald-200'}`}>
              <h3 className="text-base font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-600" /> 🧠 Resumo Para Memorizar
              </h3>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-emerald-500/20 text-center">
                <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">LIBRAS</p>
                <p className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  <span className="text-emerald-600">L</span>íngua <span className="text-emerald-600">B</span>rasileira de <span className="text-emerald-600">S</span>inais
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ É uma LÍNGUA (não linguagem).</li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ Possui estrutura gramatical própria.</li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ Utiliza recursos visuais e espaciais.</li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ Não é simples tradução do português.</li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ Reconhecida pela Lei nº 10.436/2002.</li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ Regulamentada pelo Decreto nº 5.626/2005.</li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ Datilologia = alfabeto manual (não a própria LIBRAS).</li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10">➡️ Expressões faciais/corporais integram a comunicação.</li>
              </ul>

              <div className="pt-2">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">🎯 Foco do Concurso (Prioridade de Memorização):</h4>
                <div className="space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <p><strong className="text-emerald-600 dark:text-emerald-400">Lei 10.436/2002</strong> → Reconhecimento legal da LIBRAS como meio de comunicação e sistema linguístico.</p>
                  <p><strong className="text-emerald-600 dark:text-emerald-400">Decreto 5.626/2005</strong> → Regulamentação e aspectos de implementação, ensino e acessibilidade.</p>
                  <p><strong className="text-emerald-600 dark:text-emerald-400">LIBRAS</strong> → Língua com estrutura e regras gramaticais próprias.</p>
                  <p><strong className="text-emerald-600 dark:text-emerald-400">Datilologia</strong> → Representação manual das letras (recurso auxiliar).</p>
                  <p><strong className="text-emerald-600 dark:text-emerald-400">Acessibilidade</strong> → Garantir comunicação e acesso aos serviços em condições adequadas no Poder Judiciário.</p>
                </div>
              </div>

              {/* Botão de transição para flashcards */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shrink-0 cursor-pointer flex items-center gap-2"
                >
                  <span>Ir para os Flashcards</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </article>
        ) : selectedSubject === 'processo_penal' ? (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Header Objectives */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — Processo Penal: Princípios e Eficácia da Lei Processual
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Ao concluir esta aula, você será capaz de:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Compreender a natureza, conceito e finalidade do Direito Processual Penal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Dominar o Devido Processo Legal, Contraditório, Ampla Defesa e Presunção de Inocência.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Entender o Princípio do Juiz Natural e a vedação do Tribunal de Exceção.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Aplicar o princípio tempus regit actum na eficácia da lei no tempo (Art. 2º CPP).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Analisar a eficácia da lei no espaço (Territorialidade) e regras de interpretação (Art. 3º CPP).</span>
                </li>
              </ul>
            </section>

            {/* 1. Conceito e Finalidade do Processo Penal */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. Conceito e Finalidade do Direito Processual Penal
              </h2>
              <p className="text-sm">
                O <strong>Direito Processual Penal</strong> é o conjunto de princípios e normas que regulam a atividade do Estado destinada à aplicação do Direito Penal substantivo, delimitando o exercício da pretensão punitiva e assegurando os direitos e garantias fundamentais do acusado.
              </p>
              <p className="text-sm">
                Sua função essencial é instrumentalizar o <em>jus puniendi</em> estatal, servindo como escudo de proteção contra o arbítrio estatal e garantindo que ninguém seja privado de sua liberdade sem o devido processo legal.
              </p>
            </section>

            {/* 2. Garantias Constitucionais do Processo Penal */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. Garantias Constitucionais Fundamentais
              </h2>
              <p className="text-sm">
                As garantias processuais penais estão enraizadas no artigo 5º da Constituição Federal de 1988 e estruturam todo o processo penal acusatório brasileiro:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">🔹 Devido Processo Legal (Art. 5º, LIV, CF)</span>
                  <p className="text-slate-600 dark:text-slate-300">Ninguém será privado da liberdade ou de seus bens sem o devido processo legal, assegurando observância às normas processuais e garantias fundamentais.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-blue-600 dark:text-blue-400 uppercase text-[10px]">🔹 Contraditório e Ampla Defesa (Art. 5º, LV, CF)</span>
                  <p className="text-slate-600 dark:text-slate-300">Ciência de todos os atos do processo (informação) + oportunidade real de manifestação e produção de provas (reação), mediante defesa técnica obrigatória.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-amber-600 dark:text-amber-400 uppercase text-[10px]">🔹 Presunção de Inocência (Art. 5º, LVII, CF)</span>
                  <p className="text-slate-600 dark:text-slate-300">Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória. A carga da prova incumbe integralmente à acusação.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-purple-600 dark:text-purple-400 uppercase text-[10px]">🔹 Juiz Natural (Art. 5º, LIII e XXXVII, CF)</span>
                  <p className="text-slate-600 dark:text-slate-300">Ninguém será processado nem sentenciado senão pela autoridade competente previamente estabelecida em lei, sendo vedados os tribunais de exceção.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 md:col-span-2">
                  <span className="font-black text-rose-600 dark:text-rose-400 uppercase text-[10px]">🔹 Direito ao Silêncio e Não Autoincriminação (Art. 5º, LXIII, CF)</span>
                  <p className="text-slate-600 dark:text-slate-300">O réu/investigado possui o direito de permanecer em silêncio (<em>nemo tenetur se detegere</em>), o qual não poderá ser interpretado em seu prejuízo nem como confissão.</p>
                </div>
              </div>
            </section>

            {/* 3. Eficácia da Lei Processual Penal no Tempo */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. Eficácia da Lei Processual Penal no Tempo (Art. 2º, CPP)
              </h2>
              <p className="text-sm">
                Conforme o artigo 2º do Código de Processo Penal, a lei processual penal aplica-se <strong>imediatamente</strong>, sem prejuízo da validade dos atos realizados sob a vigência da lei anterior:
              </p>

              <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/80 border-emerald-200/80'}`}>
                <p className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600" /> Regra Geral: Tempus Regit Actum
                </p>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                  A nova norma processual incide imediatamente sobre os processos em andamento. Os atos processuais já praticados e consolidados sob a lei anterior permanecem perfeitamente válidos e não precisam ser refeitos.
                </p>
              </div>
            </section>

            {/* 4. Eficácia da Lei Processual Penal no Espaço */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. Eficácia da Lei Processual Penal no Espaço (Art. 1º, CPP)
              </h2>
              <p className="text-sm">
                O CPP adota o <strong>Princípio da Territorialidade</strong> como regra geral (Art. 1º): o Código de Processo Penal será aplicado em todo o território brasileiro, sem prejuízo das exceções previstas em tratados, convenções e regras de direito internacional.
              </p>
            </section>

            {/* 5. Interpretação e Analogia no CPP */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Interpretação e Aplicação Analógica (Art. 3º, CPP)
              </h2>
              <p className="text-sm">
                O Artigo 3º do CPP dispõe expressamente que a lei processual penal admitirá:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-medium">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Interpretação Extensiva</strong> (ampliação do alcance formal do texto)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Aplicação Analógica</strong> (integração de lacunas legislativas)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Princípios Gerais do Direito</strong> (suplementação das normas)</span>
                </div>
              </div>
            </section>

            {/* 🎯 O que você precisa memorizar */}
            <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/70 border-emerald-200'}`}>
              <h2 className="text-base font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> 🎯 Quadro Resumo para o Concurso TJAM
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Tempus regit actum: incidência imediata da lei processual</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Nemo tenetur se detegere: direito ao silêncio sem prejuízo</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Territorialidade com ressalvas a tratados internacionais</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Admissibilidade de interpretação extensiva e analogia (Art. 3º)</span>
                </div>
              </div>
            </section>
          </article>
        ) : selectedSubject === 'processo_civil' ? (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Objetivos da Aula de Processo Civil */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — Processo Civil: Atos Processuais
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Ao concluir esta aula, você será capaz de:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Compreender o conceito e os efeitos dos Atos Processuais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Identificar e exemplificar os atos praticados pelas partes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Diferenciar os Pronunciamentos do Juiz (Sentença, Decisão Interlocutória e Despacho).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Dominar as regras de Formas e Prazos Processuais (dias úteis no CPC).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Distinguir com precisão Citação e Intimação, além do regramento de Nulidades e Negócio Jurídico Processual.</span>
                </li>
              </ul>
            </section>

            {/* 1. Conceito */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. Conceito de Atos Processuais
              </h2>
              <p className="text-sm">
                Atos processuais são as manifestações praticadas pelas partes, pelo juiz e pelos demais participantes do processo que produzem efeitos dentro da relação processual.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-medium">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Petição apresentada pelo autor</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Contestação apresentada pelo réu</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Despacho do juiz</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Sentença</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Intimação</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Citação</span>
                </div>
              </div>
            </section>

            {/* 2. Atos das partes */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. Atos das Partes
              </h2>
              <p className="text-sm">
                As partes praticam diversos atos durante o processo para resguardar seus direitos e movimentar o procedimento:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Apresentar petições e formular pedidos
                </li>
                <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Apresentar defesa (contestação/reconvenção)
                </li>
                <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Produzir provas e interpor recursos
                </li>
                <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Celebrar acordos e transações
                </li>
              </ul>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Esses atos produzem efeitos processuais imediatos conforme estabelece a legislação processual civil.
              </p>
            </section>

            {/* 3. Atos do juiz */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. Atos do Juiz (Pronunciamentos Judiciais)
              </h2>
              <p className="text-sm">
                Entre os principais pronunciamentos proferidos pelo magistrado no curso do processo civil estão:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-slate-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📝</span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Sentença</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    É o pronunciamento por meio do qual o juiz, em regra, <strong>encerra a fase cognitiva</strong> do procedimento comum ou <strong>extingue a execução</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-slate-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📌</span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Decisão Interlocutória</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    É o pronunciamento judicial de <strong>natureza decisória</strong> que não se enquadra como sentença (ex: decisão de tutela provisória).
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-slate-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📄</span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Despacho</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    São os demais pronunciamentos do juiz praticados no processo que <strong>não possuem natureza decisória</strong> (ex: "diga a parte autora").
                  </p>
                </div>
              </div>

              {/* Box Memorize */}
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-purple-50/70 border-purple-200'}`}>
                <h4 className="text-xs font-black uppercase text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-1.5">
                  🧠 Memorize Obrigatório para a Prova:
                </h4>
                <ul className="space-y-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600 dark:text-purple-400">➔ Sentença:</span> Encerra a fase cognitiva ou extingue a execução.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600 dark:text-purple-400">➔ Decisão Interlocutória:</span> Decisão no curso do processo que não é sentença.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600 dark:text-purple-400">➔ Despacho:</span> Ato de mero expediente, sem conteúdo decisório.
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Forma dos atos processuais */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. Forma dos Atos Processuais
              </h2>
              <p className="text-sm">
                Em regra, os atos processuais <strong>não dependem de forma determinada</strong>, salvo quando a lei expressamente exigir (princípio da liberdade das formas ou instrumentalidade das formas).
              </p>
              <p className="text-sm">
                Quando a lei estabelecer determinada forma, ela deve ser observada para garantir:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center font-bold">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400">
                  Segurança Jurídica
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400">
                  Organização
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400">
                  Validade do Procedimento
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400">
                  Proteção das Partes
                </div>
              </div>
            </section>

            {/* 5. Prazos processuais */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Prazos Processuais
              </h2>
              <p className="text-sm">
                Os atos processuais devem ser realizados dentro dos prazos estabelecidos pela legislação ou fixados pelo juiz. O cumprimento correto dos prazos é fundamental para evitar preclusão ou penalidades processuais.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-amber-950/20 border-amber-800/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'} space-y-1`}>
                <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" /> Atenção Regra de Ouro do CPC
                </div>
                <p className="text-xs font-semibold">
                  No CPC, quando a lei estabelece prazo processual contado em dias, a contagem considera, em regra, <strong>somente os dias úteis</strong>.
                </p>
              </div>
            </section>

            {/* 6. Citação */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                6. Citação
              </h2>
              <p className="text-sm">
                A <strong>citação</strong> é o ato pelo qual o réu, o executado ou o interessado é convocado para <strong>integrar a relação processual</strong>.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/60 border-emerald-100'} text-xs space-y-1`}>
                <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">📌 Exemplo Prático:</strong>
                <p>Uma pessoa é processada perante o TJAM. A <strong>citação</strong> comunica formalmente a existência do processo e chama o réu para fazer parte dele e apresentar sua defesa.</p>
              </div>
            </section>

            {/* 7. Intimação */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                7. Intimação
              </h2>
              <p className="text-sm">
                A <strong>intimação</strong> é o ato pelo qual se dá ciência a alguém dos atos e termos do processo.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/60 border-blue-100'} text-xs space-y-1`}>
                <strong className="text-blue-700 dark:text-blue-400 font-extrabold">📌 Exemplo Prático:</strong>
                <p>O juiz determina que uma parte se manifeste sobre um documento novo juntado aos autos. A parte é <strong>intimada</strong> para tomar conhecimento e apresentar manifestação no prazo legal.</p>
              </div>

              {/* Diferença fundamental Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs space-y-1 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-black">🧠 Diferença Fundamental para Concursos</span>
                <p>• CITAÇÃO ➔ chama para INTEGRAR o processo.</p>
                <p>• INTIMAÇÃO ➔ dá CIÊNCIA dos atos e termos do processo.</p>
              </div>
            </section>

            {/* 8. Nulidades */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                8. Nulidades
              </h2>
              <p className="text-sm">
                Um ato processual pode apresentar vício quando não observa determinada exigência legal. Entretanto, a existência de uma irregularidade não significa automaticamente que todo ato será considerado inválido.
              </p>
              <p className="text-sm">
                O sistema processual pauta-se no princípio do aproveitamento dos atos processuais (pas de nullité sans grief), buscando preservar os atos que possam ser aproveitados sem causar prejuízo às partes.
              </p>
            </section>

            {/* 9. Negócio jurídico processual */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                9. Negócio Jurídico Processual
              </h2>
              <p className="text-sm">
                Em determinadas situações, as partes plenamente capazes podem estipular mudanças no procedimento e convencionar sobre seus ônus, poderes, faculdades e deveres processuais, desde que observados os requisitos legais. Isso é chamado de <strong>negócio jurídico processual</strong> (Art. 190 do CPC).
              </p>
            </section>

            {/* 🎯 RESUMO DA AULA DA BANCA */}
            <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/70 border-emerald-200'}`}>
              <h2 className="text-base font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> 🎯 RESUMO SÍNTESE DA AULA — ATOS PROCESSUAIS
              </h2>
              <div className="space-y-3 text-xs text-slate-800 dark:text-slate-200">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 space-y-1">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">ATOS PROCESSUAIS:</strong>
                  <p>Manifestações praticadas no processo que produzem efeitos processuais.</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 space-y-1">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">PRONUNCIAMENTOS DO JUIZ:</strong>
                  <p>• Sentença ➔ encerra a fase cognitiva ou extingue a execução.<br />• Decisão interlocutória ➔ decisão que não é sentença.<br />• Despacho ➔ sem conteúdo decisório.</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 space-y-1">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">COMUNICAÇÃO:</strong>
                  <p>• Citação ➔ integra o réu/executado/interessado ao processo.<br />• Intimação ➔ dá ciência dos atos e termos processuais.</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 space-y-1">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">PRAZOS:</strong>
                  <p>Devem ser observados conforme as regras legais; nos prazos processuais contados em dias, o CPC prevê, em regra, DIAS ÚTEIS.</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-bold">
                🔥 Foco para a prova do TJAM: não confundir citação × intimação e sentença × decisão interlocutória × despacho.
              </div>
            </section>

            {/* Checklist da Aula */}
            <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação da Aula — Processo Civil (Atos Processuais)
              </h3>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { id: 'c1', text: 'Entendi o conceito de Atos Processuais e os atos praticados pelas partes.' },
                  { id: 'c2', text: 'Sei diferenciar Sentença (encerra fase/extingue execução), Decisão Interlocutória (decisório) e Despacho (sem conteúdo decisório).' },
                  { id: 'c3', text: 'Compreendi a regra da contagem de prazos em dias úteis no CPC.' },
                  { id: 'c4', text: 'Sei diferenciar Citação (integrar relação) e Intimação (dar ciência de atos).' },
                  { id: 'c5', text: 'Compreendi as regras de Nulidades (aproveitamento do ato) e Negócio Jurídico Processual.' },
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
                onClick={() => setActiveTab('flashcards')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Flashcards</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleMarkAsCompleted}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isLessonCompleted
                    ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
              </button>
            </div>
          </article>
        ) : selectedSubject === 'informatica' ? (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Objetivos da Aula de Informática */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — Informática
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Ao concluir esta aula, você será capaz de:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Compreender o conceito de informática (Informação + Automática).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Diferenciar Dado (registro bruto) de Informação (dado processado com contexto).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Distinguir Hardware (físico) de Software (lógico).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Classificar os periféricos de Entrada, Saída e Entrada/Saída (Mistos).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Entender o papel do Sistema Operacional e das ferramentas de TI no TJAM (PJe).</span>
                </li>
              </ul>
            </section>

            {/* Seção 1: O que é Informática */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. O que é Informática?
              </h2>
              <p className="text-sm">
                A <strong>informática</strong> é a ciência responsável pelo tratamento automático das informações por meio de computadores e outros dispositivos eletrônicos. Ela está presente em praticamente todas as atividades do cotidiano, sendo indispensável para a comunicação, o armazenamento de dados, a realização de cálculos, a automação de processos e a prestação de serviços públicos.
              </p>
              <p className="text-sm">
                A palavra <strong>informática</strong> resulta da junção dos termos <strong>informação</strong> e <strong>automática</strong>, representando o conjunto de técnicas utilizadas para coletar, processar, armazenar e transmitir informações utilizando equipamentos computacionais.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/60 border-emerald-100'}`}>
                <p className="text-xs text-emerald-950 dark:text-emerald-300 font-bold">
                  🎯 Principal Objetivo: Transformar dados em informações úteis para auxiliar pessoas e organizações na tomada de decisões e na execução de tarefas cotidianas.
                </p>
              </div>
              <p className="text-xs text-slate-500 italic pt-1">
                No âmbito do Poder Judiciário, a informática é uma ferramenta essencial para a tramitação de processos eletrônicos, elaboração de documentos, comunicação institucional e consulta de sistemas judiciais. Por esse motivo, seu estudo é indispensável para candidatos ao cargo de Assistente Judiciário do TJAM.
              </p>
            </section>

            {/* Seção 2: Dado e Informação */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. Dado e Informação
              </h2>
              <p className="text-sm">
                Embora sejam frequentemente utilizados como sinônimos no cotidiano, <strong>dado</strong> e <strong>informação</strong> possuem significados distintos em informática e em provas de concurso público:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Dado (Registro Bruto)
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
                    Sem Contexto / Sem Significado Próprio
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    É um elemento bruto, um número, palavra ou símbolo isolado que, por si só, não transmite um conhecimento claro.
                  </p>
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-700 dark:text-amber-300">
                    Exemplos: "25", "Manaus", "2026".
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Informação (Dado Processado)
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
                    Com Contexto / Com Significado Útil
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    É o resultado do processamento, organização e contextualização dos dados, permitindo a compreensão e tomada de decisão.
                  </p>
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                    Exemplo: "Manaus registrou temperatura de 25°C hoje."
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 3: O que é um Computador? (Hardware e Software) */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. O que é um Computador? (Hardware x Software)
              </h2>
              <p className="text-sm">
                O <strong>computador</strong> é uma máquina eletrônica capaz de receber dados, processá-los de acordo com um conjunto de instruções, armazenar informações e produzir resultados de forma rápida e precisa.
              </p>
              <p className="text-sm">
                Todo sistema computacional é dividido em <strong>duas partes fundamentais</strong>:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/50 border-blue-200'}`}>
                  <h3 className="text-sm font-black text-blue-800 dark:text-blue-400">
                    🖥️ Hardware (Parte Física)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Compreende todos os componentes mecânicos, elétricos e eletrônicos que compõem o computador — aquilo que é tangível (pode ser tocado).
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Exemplos:</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      Monitor, Teclado, Mouse, Processador (CPU), Memória RAM, Disco SSD / HD, Impressora e Scanner.
                    </p>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-purple-50/50 border-purple-200'}`}>
                  <h3 className="text-sm font-black text-purple-800 dark:text-purple-400">
                    ⚙️ Software (Parte Lógica)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Compreende o conjunto de programas, instruções, algoritmos e dados que orientam o hardware sobre como executar cada tarefa.
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Exemplos:</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      Windows, Linux, Microsoft Word, Microsoft Excel, Navegadores (Chrome/Edge), Antivírus e Sistema PJe do TJAM.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 4: Componentes Básicos do Computador */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. Componentes Básicos do Computador
              </h2>
              <p className="text-sm">
                Os componentes principais que garantem o processamento e funcionamento do computador são:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">CPU (Processador)</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">Unidade Central de Processamento</h4>
                  <p className="text-slate-600 dark:text-slate-300">É o "cérebro" do computador, responsável por executar as instruções dos programas e realizar cálculos aritméticos e lógicos.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-amber-600 dark:text-amber-400 uppercase text-[10px]">Memória RAM</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">Memória de Acesso Aleatório (Volátil)</h4>
                  <p className="text-slate-600 dark:text-slate-300">Armazena temporariamente as informações que estão sendo utilizadas no momento. Se o computador for desligado, os dados da RAM são perdidos.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-blue-600 dark:text-blue-400 uppercase text-[10px]">Dispositivos de Armazenamento (HD / SSD)</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">Armazenamento Permanente (Não-Volátil)</h4>
                  <p className="text-slate-600 dark:text-slate-300">Guardam arquivos, documentos e programas de forma permanente, preservando-os mesmo quando o computador é desligado.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-purple-600 dark:text-purple-400 uppercase text-[10px]">Placa-Mãe & Fonte</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">Integração e Alimentação Elétrica</h4>
                  <p className="text-slate-600 dark:text-slate-300">A placa-mãe interconecta fisicamente todos os componentes do sistema. A fonte de alimentação converte a energia elétrica para uso dos circuitos.</p>
                </div>
              </div>
            </section>

            {/* Seção 5: Dispositivos de Entrada, Saída e Mistos */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Dispositivos de Entrada, Saída e Mistos
              </h2>
              <p className="text-sm">
                Os periféricos de entrada e saída permitem a comunicação entre o usuário e o computador:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black uppercase text-[10px]">
                    Dispositivos de Entrada
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">Permitem a inserção de dados e comandos para o computador.</p>
                  <ul className="space-y-1 font-semibold text-slate-700 dark:text-slate-200">
                    <li>• Teclado & Mouse</li>
                    <li>• Scanner</li>
                    <li>• Webcam & Microfone</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black uppercase text-[10px]">
                    Dispositivos de Saída
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">Exibem ou fornecem os resultados do processamento ao usuário.</p>
                  <ul className="space-y-1 font-semibold text-slate-700 dark:text-slate-200">
                    <li>• Monitor / Tela</li>
                    <li>• Impressora simples</li>
                    <li>• Alto-falantes & Projetor</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black uppercase text-[10px]">
                    Entrada e Saída (Mistos)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">Realizam ambas as funções: enviam e recebem dados simultaneamente.</p>
                  <ul className="space-y-1 font-semibold text-slate-700 dark:text-slate-200">
                    <li>• Tela Touchscreen</li>
                    <li>• Pen Drive & HD Externo</li>
                    <li>• Impressora Multifuncional</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Seção 6: Sistemas Operacionais & Informática no Poder Judiciário */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                6. Sistemas Operacionais & Informática no Poder Judiciário (TJAM)
              </h2>
              <p className="text-sm">
                O <strong>Sistema Operacional (SO)</strong> é o programa principal responsável por gerenciar o hardware do computador, controlar a memória, administrar arquivos e permitir a execução de outros aplicativos (exemplos: Windows, Linux, macOS, Android, iOS).
              </p>
              <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/40 border-emerald-200'}`}>
                <h3 className="text-sm font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  ⚖️ Aplicação da Informática para o Assistente Judiciário do TJAM
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  No Tribunal de Justiça do Amazonas, o servidor público utiliza ferramentas de informática diariamente para garantir a celeridade dos processos judiciais:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Processo Judicial Eletrônico (PJe)</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Elaboração de despachos e minuta de atos</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Realização de audiências por videoconferência</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Consulta a sistemas integrados e diário oficial</span>
                </div>
              </div>
            </section>

            {/* Seção 7: Resumo Rápido & Dica FGV */}
            <section className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <h3 className="font-black text-amber-800 dark:text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Dicas de Ouro para a Prova da FGV / TJAM:
              </h3>
              <ul className="space-y-1 list-disc pl-4 font-medium">
                <li><strong>Hardware x Software:</strong> Lembre-se que o hardware é palpável (físico) e o software é o programa/instrução (lógico).</li>
                <li><strong>Dado x Informação:</strong> O dado é neutro e isolado ("25"); a informação é processada e traz significado ("25°C em Manaus").</li>
                <li><strong>RAM volátil:</strong> A memória RAM perde os dados ao desligar o PC. HD e SSD mantêm os arquivos salvos permanentemente.</li>
                <li><strong>Periféricos Mistos:</strong> Fique atento às armadilhas com telas Touchscreen, Pen Drives e Impressoras Multifuncionais (são Entrada e Saída).</li>
              </ul>
            </section>

            {/* Action Bottom Controls */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('flashcards')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Flashcards</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleMarkAsCompleted}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isLessonCompleted
                    ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
              </button>
            </div>
          </article>
        ) : (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Objetivos */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — 🏛️ Direito Administrativo (Aula 3: Atos Administrativos)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Ao concluir esta aula, você dominará o conceito, os 5 elementos (CO–FI–FO–MO–OB), os atributos e as formas de anulação, revogação e convalidação cobradas pela banca FGV:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Conceituar ato administrativo e identificar seus exemplos práticos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Memorizar os 5 elementos do ato pelo mnemônico CO–FI–FO–MO–OB.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Compreender os atributos (Presunção de Legitimidade, Imperatividade, Autoexecutoriedade e Tipicidade).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Diferenciar Anulação (ilegalidade) de Revogação (conveniência e oportunidade) e Convalidação.</span>
                </li>
              </ul>
            </section>

            {/* Seção 1: Conceito */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. Conceito
              </h2>
              <p className="text-sm">
                Ato administrativo é a <strong>manifestação da Administração Pública</strong>, ou de quem exerça função administrativa, destinada a produzir efeitos jurídicos conforme o Direito.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <h3 className="text-xs font-black uppercase text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-500" /> Exemplos de Atos Administrativos:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">• Nomeação de servidor público</li>
                  <li className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">• Aplicação de uma penalidade administrativa</li>
                  <li className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">• Concessão de uma licença</li>
                  <li className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">• Autorização administrativa</li>
                </ul>
              </div>
            </section>

            {/* Seção 2: Elementos do ato administrativo */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. Elementos do ato administrativo
              </h2>
              <p className="text-sm">
                Os <strong>cinco elementos clássicos</strong> que compõem a validade de um ato administrativo são:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    👤 Competência
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    É o poder legal atribuído ao agente ou órgão para praticar o ato.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
                    🎯 Finalidade
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Todo ato administrativo deve buscar o interesse público previsto pela lei.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    📄 Forma
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    É o modo pelo qual o ato deve ser exteriorizado.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <h4 className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1">
                    🔎 Motivo
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    É a situação de fato e de direito que justifica a prática do ato.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 md:col-span-2 lg:col-span-1">
                  <h4 className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                    📌 Objeto
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    É o efeito jurídico produzido pelo ato, aquilo que o ato determina, concede, modifica ou extingue.
                  </p>
                </div>
              </div>

              {/* Mnemônico Card */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  🧠 Mnemônico para Memorizar
                </span>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  CO – FI – FO – MO – OB
                </p>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Competência → Finalidade → Forma → Motivo → Objeto
                </p>
              </div>
            </section>

            {/* Seção 3: Atributos dos atos administrativos */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. Atributos dos atos administrativos
              </h2>
              <p className="text-sm">
                Os principais atributos que conferem características especiais aos atos administrativos são:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h3 className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase mb-1">
                    Presunção de Legitimidade
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    O ato é considerado válido e legítimo até que seja demonstrado o contrário.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h3 className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase mb-1">
                    Imperatividade
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Em determinadas situações, o ato pode impor obrigações independentemente da concordância do particular.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h3 className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase mb-1">
                    Autoexecutoriedade
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                    Em determinadas hipóteses, a Administração pode executar diretamente sua decisão, sem precisar de autorização judicial prévia.
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-600 dark:text-amber-300">
                    ⚠️ Não está presente em todos os atos.
                  </span>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h3 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase mb-1">
                    Tipicidade
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    O ato administrativo deve corresponder a uma figura previamente prevista no ordenamento jurídico.
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 4: Anulação */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. Anulação
              </h2>
              <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-rose-50/50 border-rose-200'}`}>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  A <strong>anulação</strong> ocorre quando existe <strong>ilegalidade</strong> no ato.
                </p>
                <div className="flex items-center gap-2 text-xs font-extrabold text-rose-700 dark:text-rose-400">
                  <span>➡️ Pode ser realizada pela própria Administração e, quando provocado, pelo Poder Judiciário.</span>
                </div>
                <div className="pt-1">
                  <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 font-black text-[11px]">
                    Motivo: Ilegalidade
                  </span>
                </div>
              </div>
            </section>

            {/* Seção 5: Revogação */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Revogação
              </h2>
              <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/50 border-blue-200'}`}>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  A <strong>revogação</strong> ocorre quando um ato <strong>válido</strong> deixa de ser conveniente ou oportuno para a Administração.
                </p>
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700 dark:text-blue-400">
                  <span>📌 A revogação é realizada EXCLUSIVAMENTE pela própria Administração (o Judiciário não revoga ato do Executivo no exercício da função jurisdicional).</span>
                </div>
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 font-black text-[11px]">
                    Motivo: Conveniência e Oportunidade
                  </span>
                </div>
              </div>

              {/* Quadro Não Confunda */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                <span className="font-black uppercase text-amber-600 dark:text-amber-400 text-[10px]">
                  ⚠️ Não Confunda na Prova da FGV:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-bold">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700">
                    Anulação → Ilegalidade
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700">
                    Revogação → Conveniência e Oportunidade
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 6: Convalidação */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                6. Convalidação
              </h2>
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-200'}`}>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  A <strong>convalidação</strong> permite corrigir determinados <strong>vícios sanáveis</strong> de um ato administrativo (em regra, nos elementos <i>Competência</i> não exclusiva e <i>Forma</i> não essencial), desde que sejam atendidos os requisitos legais e não cause lesão ao interesse público nem prejuízo a terceiros.
                </p>
              </div>
            </section>

            {/* Seção 7: O que memorizar para a prova */}
            <section className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                🎯 O que Memorizar para a Prova (Resumo Definitivo)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="font-extrabold text-emerald-400 uppercase text-[10px]">Elementos</span>
                  <p className="font-bold text-white">
                    Competência + Finalidade + Forma + Motivo + Objeto
                  </p>
                  <p className="text-[10px] text-amber-300 font-mono pt-1">(CO-FI-FO-MO-OB)</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="font-extrabold text-blue-400 uppercase text-[10px]">Atributos</span>
                  <p className="font-bold text-white">
                    Presunção de legitimidade + Imperatividade + Autoexecutoriedade + Tipicidade
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="font-extrabold text-purple-400 uppercase text-[10px]">Extinção / Correção</span>
                  <p className="font-medium text-slate-200">
                    <strong className="text-rose-400">Anulação</strong> → ato ilegal<br />
                    <strong className="text-blue-400">Revogação</strong> → ato válido, mas inconveniente ou inoportuno<br />
                    <strong className="text-emerald-400">Convalidação</strong> → correção de vício sanável
                  </p>
                </div>
              </div>
            </section>

            {/* Checklist da Aula */}
            <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação da Aula 3
              </h3>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { id: 'c1', text: 'Compreendi o conceito de ato administrativo e reconheço exemplos práticos (nomeação, licença, etc.).' },
                  { id: 'c2', text: 'Decorei os 5 elementos do ato pelo mnemônico CO–FI–FO–MO–OB.' },
                  { id: 'c3', text: 'Entendi os 4 atributos: Presunção de Legitimidade, Imperatividade, Autoexecutoriedade e Tipicidade.' },
                  { id: 'c4', text: 'Sei que a Anulação decorre de ilegalidade e a Revogação de conveniência/oportunidade.' },
                  { id: 'c5', text: 'Compreendi que a Convalidação corrige vícios sanáveis de atos com defeitos sanáveis.' },
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
                onClick={() => setActiveTab('flashcards')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Flashcards</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleMarkAsCompleted}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isLessonCompleted
                    ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
              </button>
            </div>
          </article>
        )
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
                {selectedSubject === 'portugues'
                  ? 'Mapa Mental — Língua Portuguesa: Compreensão e Interpretação de Textos'
                  : selectedSubject === 'libras'
                  ? 'Mapa Mental — Aula 1: Conceitos Básicos de LIBRAS e Legislação'
                  : selectedSubject === 'informatica'
                  ? 'Mapa Mental — Capítulo 1: Conceitos Básicos de Informática'
                  : selectedSubject === 'direito_const'
                  ? 'Mapa Mental — Aula 2: Princípios Fundamentais (Arts. 1º ao 4º CF/88)'
                  : selectedSubject === 'processo_penal'
                  ? 'Mapa Mental — Aula 1: Inquérito Policial'
                  : selectedSubject === 'processo_civil'
                  ? 'Mapa Mental — Aula 1: Jurisdição e Princípios Processuais'
                  : 'Mapa Mental — Capítulo 1: Conceitos Fundamentais da Administração Pública'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedSubject === 'portugues'
                  ? 'Esquema visual sobre Compreensão x Interpretação, Tipologia Textual, Coesão e Dicas FGV'
                  : selectedSubject === 'libras'
                  ? 'Esquema visual sobre LIBRAS, Parâmetros dos Sinais, Datilologia, Lei 10.436/2002 e Decreto 5.626/2005'
                  : selectedSubject === 'informatica'
                  ? 'Esquema visual sobre Informática, Dado x Informação, Hardware, Software e Periféricos'
                  : selectedSubject === 'direito_const'
                  ? 'Esquema visual sobre os 5 Fundamentos (SOCIVADIPLU), Tripartição dos Poderes e Objetivos (CONERGAPRO)'
                  : selectedSubject === 'processo_penal'
                  ? 'Esquema visual sobre Inquérito Policial, características e instauração'
                  : selectedSubject === 'processo_civil'
                  ? 'Esquema visual sobre Jurisdição, Ação, Competência e Princípios'
                  : 'Resumo visual sobre conceitos, princípios e organização da Administração Pública'}
              </p>
            </div>

            {/* Main Mind Map Image */}
            <div className="relative group max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-md">
              <img
                src={mindMapImg}
                alt={
                  selectedSubject === 'portugues'
                    ? 'Mapa Mental - Língua Portuguesa'
                    : selectedSubject === 'libras'
                    ? 'Mapa Mental - LIBRAS: Conceitos e Legislação'
                    : selectedSubject === 'informatica'
                    ? 'Mapa Mental - Conceitos Básicos de Informática'
                    : selectedSubject === 'direito_const'
                    ? 'Mapa Mental - Direito Constitucional: Princípios Fundamentais'
                    : selectedSubject === 'processo_penal'
                    ? 'Mapa Mental - Processo Penal'
                    : selectedSubject === 'processo_civil'
                    ? 'Mapa Mental - Processo Civil'
                    : 'Mapa Mental - Direito Administrativo'
                }
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
                {(selectedSubject === 'portugues'
                  ? ['Língua Portuguesa', 'FGV', 'Compreensão', 'Interpretação', 'Coesão', 'Inferências', 'TJAM']
                  : selectedSubject === 'libras'
                  ? ['LIBRAS', 'Lei 10.436/2002', 'Decreto 5.626/2005', 'Datilologia', 'Parâmetros dos Sinais', 'Acessibilidade', 'TJAM']
                  : selectedSubject === 'informatica'
                  ? ['Informática', 'Hardware', 'Software', 'Dado x Informação', 'CPU e RAM', 'Periféricos', 'PJe TJAM']
                  : selectedSubject === 'direito_const'
                  ? ['Constituição', 'SOCIVADIPLU', 'Tripartição dos Poderes', 'CONERGAPRO', 'Art. 1º ao 4º', 'CF/88', 'TJAM']
                  : selectedSubject === 'processo_penal'
                  ? ['Processo Penal', 'Inquérito Policial', 'Polícia Judiciária', 'CPP', 'TJAM']
                  : selectedSubject === 'processo_civil'
                  ? ['Processo Civil', 'Jurisdição', 'Ação', 'Competência', 'CPC', 'TJAM']
                  : ['Direito Admin', 'Administração Pública', 'Princípios', 'LIMPE', 'TJAM']
                ).map(kw => (
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">
                Treinamento de Fixação — Salvo no Seu Perfil
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Exercícios de Fixação (20 Questões)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Suas respostas ficam salvas para você consultar e revisar a qualquer momento.
              </p>
            </div>

            <button
              onClick={handleResetLessonExercises}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
              title="Limpar respostas para refazer os exercícios"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Refazer Exercícios</span>
            </button>
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

                {activeMcQuestions.map((q, qIndex) => (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-extrabold uppercase">Questão {qIndex + 1} de {activeMcQuestions.length}</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md font-bold">Múltipla Escolha</span>
                    </div>

                    {(q as any).textoApoio && (
                      <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        <span className="font-black text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">📖 Texto de Apoio:</span>
                        <p className="italic font-medium leading-relaxed">"{ (q as any).textoApoio }"</p>
                      </div>
                    )}

                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                      {q.enunciado}
                    </p>

                    <div className="space-y-2">
                      {(q.alternativas || (q as any).opcoes || []).map((alt: string, altIdx: number) => {
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
                        onClick={() => {
                          const selectedIdx = selectedAnswers[q.id];
                          const isCorrect = selectedIdx === q.correta;
                          setShowQuestionResults(prev => ({ ...prev, [q.id]: true }));
                          registerQuestionAttempt(q, 'mc', isCorrect, `opt-${selectedIdx}`);
                        }}
                        className="w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs disabled:opacity-40 hover:bg-emerald-700 cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <span>Responder Questão</span>
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

                {activeTfQuestions.map((q) => (
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
                        onClick={() => {
                          const chosenBool = tfAnswers[q.id];
                          const isCorrect = chosenBool === q.correta;
                          setTfSubmitted(prev => ({ ...prev, [q.id]: true }));
                          registerQuestionAttempt(q, 'vf', isCorrect, chosenBool ? 'opt-true' : 'opt-false');
                        }}
                        className="w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs disabled:opacity-40 hover:bg-emerald-700 cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <span>Responder</span>
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

                {activeDiscursiveQuestions.map((q) => (
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
                {selectedSubject === 'portugues'
                  ? 'Resumo — Língua Portuguesa: Compreensão e Interpretação de Textos'
                  : selectedSubject === 'direito_const'
                  ? 'Resumo — Direito Constitucional: Princípios Fundamentais (Arts. 1º ao 4º CF/88)'
                  : selectedSubject === 'libras'
                  ? 'Resumo da Aula — LIBRAS: Conceitos Básicos e Legislação'
                  : selectedSubject === 'processo_civil'
                  ? 'Resumo da Aula — Processo Civil: Jurisdição'
                  : selectedSubject === 'informatica'
                  ? 'Resumo — Conceitos Básicos de Informática'
                  : selectedSubject === 'processo_penal'
                  ? 'Resumo — Processo Penal: Inquérito Policial'
                  : 'Resumo — Direito Administrativo: Administração Pública'}
              </h2>
            </div>

            {selectedSubject === 'portugues' ? (
              <ul className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Compreensão vs. Interpretação:</strong> Compreensão refere-se ao que está EXPLÍCITO no texto ("segundo o texto"). Interpretação exige DEDUÇÕES e INFERÊNCIAS autorizadas ("infere-se do texto").</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Armadilhas Clássicas FGV:</strong> Extrapolação (criar ideias inexistentes), Redução (focar em detalhe secundário) e Contradição (afirmar o oposto).</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Coesão Textual:</strong> Anafórica (retoma elemento anterior) e Catafórica (antecipa elemento posterior). Essenciais para compreensão global.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Conectivos Logico-Semânticos:</strong> Atenção especial aos adversativos (mas, porém, contudo) e concessivos (embora, ainda que) muito cobrados nas provas do TJAM.</span>
                </li>
              </ul>
            ) : selectedSubject === 'direito_const' ? (
              <ul className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Fundamentos da RFB (Art. 1º):</strong> Mnemônico <strong>SO-CI-DI-VA-PLU</strong> (Soberania, Cidadania, Dignidade da Pessoa Humana, Valores Sociais do Trabalho/Livre Iniciativa, Pluralismo Político).</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Separação de Poderes (Art. 2º):</strong> Poderes independentes e harmônicos (Legislativo, Executivo e Judiciário) com funções típicas e atípicas.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Objetivos Fundamentais (Art. 3º):</strong> Verbos no infinitivo — Mnemônico <strong>CONERGAPRO</strong> (Construir, Garantir, Erradicar/Reduzir, Promover).</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Relações Internacionais (Art. 4º):</strong> 10 princípios orientadores da atuação internacional do Brasil (Prevalência dos DH, Autodeterminação, Asilo Político, etc.).</span>
                </li>
              </ul>
            ) : selectedSubject === 'libras' ? (
              <ul className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Conceito de LIBRAS:</strong> Língua Brasileira de Sinais, reconhecida pela Lei nº 10.436/2002. Possui sistema linguístico e gramática autônomos.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Autonomia Linguística:</strong> NÃO é tradução palavra por palavra do Português. Modalidade visual-espacial com regras sintáticas próprias.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>5 Parâmetros dos Sinais:</strong> Configuração de mão, Movimento, Ponto de Articulação, Orientação da palma e Expressões não manuais.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Datilologia:</strong> Uso do alfabeto manual para soletrar nomes e termos pontuais. Recurso auxiliar que NÃO se confunde com a LIBRAS.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Expressões Faciais/Corporais:</strong> Função gramatical essencial para conferir tipo de frase (interrogação, negação) e intensidade.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Legislação do Concurso:</strong> Lei nº 10.436/2002 (reconhecimento legal) e Decreto nº 5.626/2005 (regulamentação e acessibilidade).</span>
                </li>
              </ul>
            ) : selectedSubject === 'processo_civil' ? (
              <ul className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span>A <strong>jurisdição</strong> é o poder-dever do Estado de solucionar conflitos aplicando o Direito.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span>Sua finalidade principal é <strong>promover a pacificação social</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span>O juiz atua de forma <strong>imparcial</strong> e somente quando <strong>provocado</strong> (inércia), salvo exceções legais.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span>A jurisdição pode ser <strong>contenciosa</strong> (com litígio) ou <strong>voluntária</strong> (sem litígio).</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span>Os <strong>princípios processuais</strong> (Juiz Natural, Devido Processo Legal, Contraditório, Ampla Defesa, Inafastabilidade) garantem um julgamento justo.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-emerald-500 font-bold text-base">•</span>
                  <span><strong>Jurisdição, Ação e Competência</strong> são institutos distintos e fundamentais para o Direito Processual Civil.</span>
                </li>
              </ul>
            ) : selectedSubject === 'informatica' ? (
              <ul className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Informática:</strong> Ciência que trata o processamento automático da informação por computadores (Informação + Automática).</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Dado vs. Informação:</strong> Dado é o registro bruto e isolado sem significado; Informação é o dado processado com contexto e utilidade.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Hardware vs. Software:</strong> Hardware é a estrutura física (palpável); Software é a parte lógica (programas e instruções).</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Componentes e Memória:</strong> A CPU processa dados, a RAM é a memória volátil de trabalho e o SSD/HD faz o armazenamento permanente.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Aplicação no TJAM:</strong> O Assistente Judiciário utiliza o Sistema Operacional e sistemas especializados como o PJe para a gestão de processos digitais.</span>
                </li>
              </ul>
            ) : (
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
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
              <button
                onClick={handleMarkAsCompleted}
                className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all ${
                  isLessonCompleted
                    ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
