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
  // Selected Subject State: 'processo_civil' (default for current lesson), 'informatica', or 'direito_admin'
  const [selectedSubject, setSelectedSubject] = useState<'processo_civil' | 'informatica' | 'direito_admin'>('processo_civil');

  // Navigation inside lesson steps - default to 'conteudo' (Texto da Aula)
  const [activeTab, setActiveTab] = useState<'video' | 'conteudo' | 'mapa' | 'flashcards' | 'questoes' | 'resumo'>('conteudo');
  
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

  // Processo Civil Flashcards Data
  const procCivilFlashcardsData = [
    {
      q: 'O que é Jurisdição?',
      a: 'É a função exercida pelo Estado, por intermédio do Poder Judiciário, destinada a solucionar conflitos de interesses mediante a aplicação do Direito.'
    },
    {
      q: 'Qual é a principal finalidade da jurisdição?',
      a: 'Promover a pacificação social, aplicando a lei, protegendo direitos, solucionando conflitos e garantindo a segurança jurídica.'
    },
    {
      q: 'O que é a Substitutividade da Jurisdição?',
      a: 'É a característica pela qual o Estado substitui a vontade das partes envolvidas no conflito pela decisão judicial obrigatória proferida pelo juiz.'
    },
    {
      q: 'Diferencie Jurisdição Contenciosa de Jurisdição Voluntária.',
      a: 'Contenciosa: há conflito entre as partes (ex: ação de cobrança ou divórcio litigioso). Voluntária: não há conflito, o Judiciário atua fiscalizando ou homologando atos (ex: testamento, interdição).'
    },
    {
      q: 'O que estabelece o Princípio da Inércia da Jurisdição?',
      a: 'O juiz somente atua quando é provocado pela parte interessada, salvo exceções previstas expressamente em lei.'
    },
    {
      q: 'Qual a diferença entre Jurisdição, Ação e Competência?',
      a: 'Jurisdição é o poder do Estado de solucionar conflitos; Ação é o direito subjetivo de provocar o Judiciário; Competência é a medida e limite da atuação de cada juiz ou tribunal.'
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

  // Admin Flashcards Data
  const adminFlashcardsData = [
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

  // Processo Civil Questions (Exercícios - Capítulo 1 • Aula 1 — Jurisdição)
  const procCivilMcQuestionsData = [
    {
      id: 1,
      enunciado: '1. A jurisdição pode ser entendida como:',
      alternativas: [
        'A) A atividade exclusiva dos advogados na defesa de seus clientes.',
        'B) A função estatal de solucionar conflitos mediante a aplicação do Direito.',
        'C) A atividade administrativa exercida pelos servidores públicos.',
        'D) A criação de novas leis pelo Poder Judiciário.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A jurisdição é a função estatal exercida pelo Poder Judiciário para aplicar o Direito aos casos concretos e solucionar conflitos.'
    },
    {
      id: 2,
      enunciado: '2. A principal finalidade da jurisdição é:',
      alternativas: [
        'A) Arrecadar tributos.',
        'B) Elaborar políticas públicas.',
        'C) Promover a pacificação social e solucionar conflitos.',
        'D) Criar normas administrativas.'
      ],
      correta: 2,
      explicacao: '✅ Gabarito: C. A principal finalidade da jurisdição é promover a pacificação social e solucionar conflitos.'
    },
    {
      id: 3,
      enunciado: '3. A característica da jurisdição segundo a qual o Estado substitui a vontade das partes pela decisão judicial é denominada:',
      alternativas: [
        'A) Imparcialidade.',
        'B) Substitutividade.',
        'C) Publicidade.',
        'D) Competência.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Pela substitutividade, o Estado substitui a vontade das partes pela decisão judicial soberana.'
    },
    {
      id: 4,
      enunciado: '4. O princípio segundo o qual o juiz deve atuar sem favorecer qualquer das partes é o princípio da:',
      alternativas: [
        'A) Imparcialidade.',
        'B) Inércia.',
        'C) Publicidade.',
        'D) Oralidade.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. A imparcialidade exige que o magistrado atue sem favorecer nenhuma das partes litigantes.'
    },
    {
      id: 5,
      enunciado: '5. Em regra, a jurisdição é exercida quando:',
      alternativas: [
        'A) O juiz decide iniciar qualquer processo por iniciativa própria.',
        'B) O Estado é provocado por meio do exercício do direito de ação.',
        'C) Um servidor público solicita autorização administrativa.',
        'D) Uma parte apresenta uma reclamação informal.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Pelo princípio da inércia, a jurisdição somente é exercida quando o Estado é provocado pelo exercício do direito de ação.'
    },
    {
      id: 6,
      enunciado: '6. Na jurisdição contenciosa:',
      alternativas: [
        'A) Não existe conflito entre as partes.',
        'B) Existe um conflito de interesses que necessita de solução judicial.',
        'C) O juiz apenas registra a vontade das partes.',
        'D) Não há decisão judicial.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. A jurisdição contenciosa pressupõe a existência de um conflito de interesses (litígio) que necessita de solução judicial.'
    },
    {
      id: 7,
      enunciado: '7. A jurisdição voluntária caracteriza-se, em regra, pela:',
      alternativas: [
        'A) Existência obrigatória de conflito entre as partes.',
        'B) Ausência de conflito propriamente dito, com atuação judicial nos casos previstos em lei.',
        'C) Atuação exclusiva do Poder Executivo.',
        'D) Impossibilidade de participação judicial.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Na jurisdição voluntária não há conflito propriamente dito; o Poder Judiciário atua fiscalizando ou homologando atos.'
    },
    {
      id: 8,
      enunciado: '8. Assinale a alternativa que apresenta corretamente a diferença entre jurisdição, ação e competência:',
      alternativas: [
        'A) Jurisdição é o direito de provocar o Judiciário; ação é o limite do juiz; competência é a decisão judicial.',
        'B) Jurisdição é a função estatal de solucionar conflitos; ação é o direito de provocar o Judiciário; competência é o limite da atuação de cada órgão jurisdicional.',
        'C) Jurisdição, ação e competência são expressões sinônimas.',
        'D) Competência é o poder de criar leis; jurisdição é o poder administrativo.'
      ],
      correta: 1,
      explicacao: '✅ Gabarito: B. Jurisdição é a função estatal; Ação é o direito de provocar o Judiciário; Competência é a medida/limite de atuação do órgão.'
    },
    {
      id: 9,
      enunciado: '9. O princípio que garante às partes a possibilidade de participar do processo e influenciar a decisão judicial está relacionado ao:',
      alternativas: [
        'A) Contraditório.',
        'B) Federalismo.',
        'C) Poder regulamentar.',
        'D) Sigilo administrativo.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. O Contraditório assegura a ciência dos atos processuais e a oportunidade de manifestação e influência na decisão.'
    },
    {
      id: 10,
      enunciado: '10. A garantia de que ninguém será privado de seus direitos sem a observância de um procedimento adequado está relacionada ao:',
      alternativas: [
        'A) Devido Processo Legal.',
        'B) Princípio da especialidade.',
        'C) Princípio da autotutela.',
        'D) Poder hierárquico.'
      ],
      correta: 0,
      explicacao: '✅ Gabarito: A. O Devido Processo Legal assegura um julgamento mediante os ritos, garantias e procedimentos previstos em lei.'
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

  // Active Questions & Flashcards Selection based on selectedSubject
  const flashcardsData = selectedSubject === 'processo_civil'
    ? procCivilFlashcardsData
    : selectedSubject === 'informatica'
    ? infFlashcardsData
    : adminFlashcardsData;

  const activeMcQuestions = selectedSubject === 'processo_civil'
    ? procCivilMcQuestionsData
    : selectedSubject === 'informatica'
    ? infMcQuestionsData
    : questionsData;

  const activeTfQuestions = selectedSubject === 'processo_civil'
    ? procCivilTfQuestionsData
    : selectedSubject === 'informatica'
    ? infTfQuestionsData
    : tfQuestionsData;

  const activeDiscursiveQuestions = selectedSubject === 'processo_civil'
    ? procCivilDiscursiveQuestionsData
    : selectedSubject === 'informatica'
    ? infDiscursiveQuestionsData
    : discursiveQuestionsData;

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
      {/* Primary Header Banner: Pausa nos Estudos - Próxima Aula no Sábado às 13h */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl border border-emerald-500/30 space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                <Clock className="w-3.5 h-3.5" /> Próxima Aula: Sábado às 13h
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Aula Concluída
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/10 text-amber-300 border border-white/10">
                Pausa de Estudos
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Processo Civil • Unidade 1 – Teoria Geral do Processo
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Pausa nos Estudos — Próxima Aula: Sábado às 13h
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Aula 1 – Jurisdição Concluída • Preparatório Especializado TJAM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('conteudo')}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Rever Texto da Aula</span>
            </button>
          </div>
        </div>

        {/* Stats Grid: Progresso e Ranking & Atividades Concluídas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          {/* Progresso e Ranking Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Progresso e Ranking</span>
            </div>

            <div className="space-y-2.5">
              {/* Pedro Henrique */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">1º</span>
                  <div>
                    <p className="text-xs font-black text-white flex items-center gap-1.5">
                      Pedro Henrique <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/30 text-amber-200 font-extrabold uppercase">1º Lugar</span>
                    </p>
                  </div>
                </div>
                <span className="text-sm font-black text-amber-400">10%</span>
              </div>

              {/* Eduardo Mateus */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">2º</span>
                  <div>
                    <p className="text-xs font-black text-white">Eduardo Mateus</p>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-400">10%</span>
              </div>
            </div>
          </div>

          {/* Atividades Concluídas Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Atividades Concluídas</span>
            </div>

            <div className="space-y-2.5">
              {/* Pedro Henrique */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">Pedro Henrique</span>
                </div>
                <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-lg">
                  9% atividades concluídas
                </span>
              </div>

              {/* Eduardo Mateus */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">Eduardo Mateus</span>
                </div>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  7% atividades concluídas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Switcher Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => { setSelectedSubject('processo_civil'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedSubject === 'processo_civil'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Aula de Hoje: Processo Civil</span>
        </button>
        <button
          onClick={() => { setSelectedSubject('informatica'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedSubject === 'informatica'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Aula Anterior: Informática</span>
        </button>
        <button
          onClick={() => { setSelectedSubject('direito_admin'); setCurrentFlashcardIndex(0); setIsFlipped(false); }}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedSubject === 'direito_admin'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Direito Administrativo</span>
        </button>
      </div>

      {/* Top Breadcrumb & Metadata Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>
            {selectedSubject === 'processo_civil'
              ? 'Processo Civil'
              : selectedSubject === 'informatica'
              ? 'Informática'
              : 'Direito Administrativo'}
          </span>
          <span>•</span>
          <span>
            {selectedSubject === 'processo_civil'
              ? 'Unidade 1 — Teoria Geral do Processo'
              : selectedSubject === 'informatica'
              ? 'Unidade 1 — Fundamentos de Informática'
              : 'Unidade 1 — Administração Pública'}
          </span>
          <span>•</span>
          <span>
            {selectedSubject === 'processo_civil'
              ? 'Capítulo 1 — Jurisdição, Ação e Competência'
              : selectedSubject === 'informatica'
              ? 'Capítulo 1 — Conceitos Básicos de Informática'
              : 'Capítulo 1 — Conceito, Princípios e Poderes'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              {selectedSubject === 'processo_civil'
                ? 'Aula de Hoje (Processo Civil)'
                : selectedSubject === 'informatica'
                ? 'Aula de Quinta-feira'
                : 'Aula de Quarta-feira'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {selectedSubject === 'processo_civil'
                ? 'Aula 1 — Jurisdição: Conceito, Características e Princípios'
                : selectedSubject === 'informatica'
                ? 'Aula 1 — Conceitos Básicos de Informática'
                : 'Aula 1 — Administração Pública: Conceito e Finalidade'}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              {selectedSubject === 'processo_civil' ? '45-60 min' : selectedSubject === 'informatica' ? '45-60 min' : '45 min'}
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
                  {selectedSubject === 'processo_civil'
                    ? 'Unidade 1 — Jurisdição: Conceito, Características e Princípios'
                    : selectedSubject === 'informatica'
                    ? 'Unidade 1 — Conceitos Básicos de Informática'
                    : 'Unidade 1 — Administração Pública: Conceito e Finalidade'}
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
                src={
                  selectedSubject === 'processo_civil'
                    ? 'https://www.youtube.com/embed/SYNsAONzzOE?autoplay=0&rel=0'
                    : selectedSubject === 'informatica'
                    ? 'https://www.youtube.com/embed/TGpVY6q0emY?autoplay=0&rel=0'
                    : 'https://www.youtube.com/embed/SYNsAONzzOE?autoplay=0&rel=0'
                }
                title={
                  selectedSubject === 'processo_civil'
                    ? 'Vídeo Aula - Processo Civil: Jurisdição, Ação e Competência'
                    : selectedSubject === 'informatica'
                    ? 'Vídeo Aula - Conceitos Básicos de Informática'
                    : 'Vídeo Aula - Administração Pública: Conceito e Finalidade'
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Direct Link to YouTube */}
            <div className="flex justify-end">
              <a
                href={
                  selectedSubject === 'processo_civil'
                    ? 'https://youtu.be/SYNsAONzzOE?is=wSIAukUjS4Fr9zBD'
                    : selectedSubject === 'informatica'
                    ? 'https://youtu.be/TGpVY6q0emY?is=33qqqOBSlvjPqHMD'
                    : 'https://youtu.be/SYNsAONzzOE?is=wSIAukUjS4Fr9zBD'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir no YouTube</span>
              </a>
            </div>

            {/* Video Details & Quick Next Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="md:col-span-2 space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <h3 className="text-xs font-extrabold uppercase text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-500" /> O que você vai aprender neste vídeo:
                </h3>
                {selectedSubject === 'processo_civil' ? (
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
                ) : (
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
        selectedSubject === 'processo_civil' ? (
          <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
            {/* Objetivos da Aula de Processo Civil */}
            <section
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <h2 className="text-base font-black text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Objetivos da Aula — Processo Civil
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Ao concluir esta aula, você será capaz de:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Compreender o conceito e a função de Jurisdição no Estado Democrático.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Identificar as 5 características essenciais da jurisdição.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Diferenciar a Jurisdição Contenciosa da Jurisdição Voluntária.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Dominar os princípios fundamentais do processo civil.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Distinguir claramente Jurisdição, Ação e Competência no dia a dia do TJAM.</span>
                </li>
              </ul>
            </section>

            {/* Seção 1: Introdução à Jurisdição */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                1. O Estado e a Solução dos Conflitos
              </h2>
              <p className="text-sm">
                O Estado é responsável por manter a paz social e solucionar os conflitos existentes entre as pessoas. Para cumprir essa função, exerce a <strong>jurisdição</strong>, que consiste no poder-dever de aplicar o Direito aos casos concretos, resolvendo conflitos e garantindo a efetividade das normas jurídicas.
              </p>
              <p className="text-sm">
                Em outras palavras, quando duas pessoas não conseguem solucionar um conflito por conta própria, o Estado, por meio do Poder Judiciário, intervém para decidir a questão de forma imparcial, aplicando a lei ao caso concreto.
              </p>
            </section>

            {/* Seção 2: O que é Jurisdição? */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                2. O que é Jurisdição?
              </h2>
              <p className="text-sm">
                A <strong>jurisdição</strong> é a função exercida pelo Estado, por intermédio do Poder Judiciário, destinada a solucionar conflitos de interesses mediante a aplicação do Direito.
              </p>
              <p className="text-sm">
                Essa função <strong>substitui a vontade das partes</strong> pela decisão do juiz, que possui autoridade para proferir uma decisão obrigatória.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/60 border-emerald-100'}`}>
                <p className="text-xs text-emerald-950 dark:text-emerald-300 font-bold">
                  ⚖️ Importância Fundamental: A jurisdição representa uma das funções essenciais do Estado Democrático de Direito, garantindo a aplicação da justiça e a preservação da ordem jurídica.
                </p>
              </div>
            </section>

            {/* Seção 3: Finalidade da Jurisdição */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                3. Finalidade da Jurisdição
              </h2>
              <p className="text-sm">
                A principal finalidade da jurisdição é <strong>promover a pacificação social</strong>.
              </p>
              <p className="text-sm">
                Além disso, busca:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Aplicar corretamente a lei ao caso concreto</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Proteger direitos fundamentais e individuais</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Solucionar conflitos de interesses</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Garantir a segurança jurídica</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 sm:col-span-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Assegurar o cumprimento e a efetividade das decisões judiciais</span>
                </div>
              </div>
            </section>

            {/* Seção 4: Características da Jurisdição */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                4. Características da Jurisdição
              </h2>
              <p className="text-sm">
                A jurisdição possui diversas características importantes para provas de concursos públicos:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">1. Substitutividade</span>
                  <p className="text-slate-600 dark:text-slate-300">O Estado substitui a vontade privada das partes envolvidas pela decisão imperativa do juiz.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-blue-600 dark:text-blue-400 uppercase text-[10px]">2. Imparcialidade</span>
                  <p className="text-slate-600 dark:text-slate-300">O juiz deve atuar de maneira neutra, sem favorecer ou prejudicar qualquer das partes.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-amber-600 dark:text-amber-400 uppercase text-[10px]">3. Definitividade</span>
                  <p className="text-slate-600 dark:text-slate-300">A decisão judicial produz efeitos jurídicos e torna-se imutável após o trânsito em julgado (coisa julgada).</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="font-black text-rose-600 dark:text-rose-400 uppercase text-[10px]">4. Inércia</span>
                  <p className="text-slate-600 dark:text-slate-300">O juiz somente atua quando é provocado pela parte interessada, salvo raras exceções previstas em lei.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 md:col-span-2">
                  <span className="font-black text-purple-600 dark:text-purple-400 uppercase text-[10px]">5. Unidade</span>
                  <p className="text-slate-600 dark:text-slate-300">A jurisdição é una em todo o território nacional, embora seja distribuída entre diferentes órgãos do Poder Judiciário por razões de organização e competência.</p>
                </div>
              </div>
            </section>

            {/* Seção 5: Espécies de Jurisdição */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                5. Espécies de Jurisdição
              </h2>
              <p className="text-sm">
                A jurisdição pode ser classificada em duas modalidades fundamentais:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Com Conflito de Interesses
                  </span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Jurisdição Contenciosa
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Existe conflito (litígio) entre as partes, sendo necessária uma decisão judicial imperativa para solucioná-lo.
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Exemplos:</span>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Ação de cobrança, ação de indenização por danos morais ou ação de divórcio litigioso.
                    </p>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/50 border-blue-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Sem Conflito / Administração Pública de Interesses
                  </span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Jurisdição Voluntária
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Não há propriamente conflito entre partes. O Poder Judiciário atua para fiscalizar, integrar ou homologar determinados atos previstos em lei.
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Exemplos:</span>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Homologação de testamento, processo de interdição e procedimentos consensuais previstos no CPC.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 6: Princípios da Jurisdição */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                6. Princípios da Jurisdição
              </h2>
              <p className="text-sm">
                O exercício da jurisdição é orientado por princípios fundamentais garantidos pela Constituição Federal:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400">Juiz Natural:</strong> Proíbe tribunais de exceção; o julgamento deve ser feito por juiz competente preexistente na lei.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400">Devido Processo Legal:</strong> Ninguém será privado da liberdade ou bens sem o devido processo legal (Art. 5º, LIV).
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400">Contraditório e Ampla Defesa:</strong> Garantia de ser informado dos atos e de se manifestar e produzir provas.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400">Inafastabilidade da Jurisdição:</strong> A lei não excluirá da apreciação judicial lesão ou ameaça a direito (Art. 5º, XXXV).
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400">Motivação das Decisões:</strong> Todas as decisões do Poder Judiciário serão fundamentadas sob pena de nulidade.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400">Duração Razoável do Processo:</strong> Todos têm direito à razoável duração do processo e celeridade de sua tramitação.
                </div>
              </div>
            </section>

            {/* Seção 7: Diferença entre Jurisdição, Ação e Competência */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
                7. Diferença entre Jurisdição, Ação e Competência
              </h2>
              <p className="text-sm">
                É comum confundir esses três conceitos, mas eles possuem significados bem delimitados:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">Jurisdição</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">Poder do Estado</h4>
                  <p className="text-slate-600 dark:text-slate-300">Poder-dever estatal de julgar e aplicar o Direito para solucionar conflitos.</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                  <span className="font-black text-blue-600 dark:text-blue-400 uppercase text-[10px]">Ação</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">Direito da Pessoa</h4>
                  <p className="text-slate-600 dark:text-slate-300">Direito subjetivo de provocar o Poder Judiciário buscando a prestação jurisdicional.</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="font-black text-amber-600 dark:text-amber-400 uppercase text-[10px]">Competência</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">Limite da Atuação</h4>
                  <p className="text-slate-600 dark:text-slate-300">Medida e fração do poder jurisdicional atribuída a cada juízo ou tribunal.</p>
                </div>
              </div>
            </section>

            {/* Seção 8: Jurisdição no Dia a Dia do Assistente Judiciário */}
            <section className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/40 border-emerald-200'}`}>
              <h3 className="text-sm font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                🏛️ Jurisdição no Dia a Dia do Assistente Judiciário (TJAM)
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                O Assistente Judiciário participa ativamente das atividades que tornam possível o exercício da jurisdição no TJAM:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Organização e movimentação dos processos eletrônicos</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Cumprimento rigoroso dos atos processuais e prazos</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Elaboração de minutas de despacho e expedientes</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Atendimento qualificado a partes e advogados</li>
                <li className="flex items-center gap-1.5 sm:col-span-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Suporte direto e assessoria aos magistrados e à vara judicial</li>
              </ul>
            </section>

            {/* Seção 9: Dicas para Concursos */}
            <section className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-purple-50/60 border-purple-200'}`}>
              <h3 className="text-xs font-black uppercase text-purple-800 dark:text-purple-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-purple-600" /> Dicas Essenciais para Concursos (TJAM)
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Em provas de Processo Civil, atente-se para as bancas examinadoras cobrando o <strong>conceito de jurisdição</strong>, suas <strong>5 características essenciais</strong> (Substitutividade, Imparcialidade, Definitividade, Inércia e Unidade), a <strong>diferença entre jurisdição contenciosa e voluntária</strong> e a <strong>distinção técnica entre Jurisdição, Ação e Competência</strong>. Dominar estes pilares garante acertos decisivos no concurso do TJAM!
              </p>
            </section>

            {/* Checklist da Aula */}
            <section className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Checklist de Fixação da Aula — Processo Civil
              </h3>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { id: 'c1', text: 'Entendi o conceito de Jurisdição como poder-dever do Estado de aplicar o Direito.' },
                  { id: 'c2', text: 'Reconheci a pacificação social como finalidade primordial da jurisdição.' },
                  { id: 'c3', text: 'Sei listar e explicar as 5 características da jurisdição (Substitutividade, Imparcialidade, Definitividade, Inércia e Unidade).' },
                  { id: 'c4', text: 'Compreendi a diferença entre Jurisdição Contenciosa e Jurisdição Voluntária.' },
                  { id: 'c5', text: 'Sei diferenciar Jurisdição (poder), Ação (direito) e Competência (limite).' },
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
                <span>Marcar Aula como Concluída</span>
              </button>
            </div>
          </article>
        ) : (
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
                {selectedSubject === 'informatica'
                  ? 'Mapa Mental — Capítulo 1: Conceitos Básicos de Informática'
                  : 'Mapa Mental — Capítulo 1: Conceitos Fundamentais da Constituição'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedSubject === 'informatica'
                  ? 'Esquema visual sobre Informática, Dado x Informação, Hardware, Software e Periféricos'
                  : 'Resumo visual dos conceitos, finalidade, importância, supremacia e aplicabilidade'}
              </p>
            </div>

            {/* Main Mind Map Image */}
            <div className="relative group max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-md">
              <img
                src={mindMapImg}
                alt={
                  selectedSubject === 'informatica'
                    ? 'Mapa Mental - Conceitos Básicos de Informática'
                    : 'Mapa Mental - Capítulo 1: Conceitos Fundamentais da Constituição'
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
                {(selectedSubject === 'informatica'
                  ? ['Informática', 'Hardware', 'Software', 'Dado x Informação', 'CPU e RAM', 'Periféricos', 'PJe TJAM']
                  : ['Constituição', 'Norma Suprema', 'Direitos Fundamentais', 'Organização do Estado', 'Supremacia Constitucional', 'CF/1988', 'Estado Democrático de Direito']
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

                {activeMcQuestions.map((q, qIndex) => (
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
                {selectedSubject === 'processo_civil'
                  ? 'Resumo da Aula — Processo Civil: Jurisdição'
                  : selectedSubject === 'informatica'
                  ? 'Resumo — Conceitos Básicos de Informática'
                  : 'Resumo — Administração Pública & Constituição'}
              </h2>
            </div>

            {selectedSubject === 'processo_civil' ? (
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
