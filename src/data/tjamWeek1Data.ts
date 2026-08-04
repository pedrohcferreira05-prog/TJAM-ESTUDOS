import { Question, Flashcard, MindMap, Simulado } from '../types';

export interface Week1LessonMaterial {
  type: 'pdf' | 'slides' | 'video' | 'audio' | 'image' | 'infographic' | 'complementary' | 'download';
  title: string;
  url?: string;
  description?: string;
  size?: string;
}

export interface Week1LessonMindMap {
  title: string;
  description: string;
  imageUrl?: string;
  svgContent?: string;
  pdfUrl?: string;
  annotations: string;
  version: string;
  comments: string[];
}

export interface Week1LessonChecklist {
  watched: boolean;
  read: boolean;
  summaryStudied: boolean;
  mindmapReviewed: boolean;
  flashcardsDone: boolean;
  questionsAnswered: boolean;
  revisionCompleted: boolean;
}

export interface Week1Lesson {
  id: string;
  dayOfWeek: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta';
  disciplineId: string;
  disciplineName: string;
  unitId: string;
  unitName: string;
  chapterId: string;
  chapterName: string;
  lessonNumber: number;
  title: string;
  description: string;
  professor: string;
  estimatedMinutes: number;
  level: 'Fundamental' | 'Intermediário' | 'Avançado';
  objectives: string[];
  competencies: string[];
  
  // Written content & study sections
  content: string;
  summary: string;
  glossary: Array<{ term: string; definition: string }>;
  practicalExamples: Array<{ scenario: string; explanation: string }>;
  observations: string[];
  examTraps: Array<{ trap: string; reality: string }>;
  studyTips: string[];
  bibliographicReferences: string[];
  relatedLegislation?: string[];
  
  // Materials & media
  materials: Week1LessonMaterial[];
  
  // Mind Map
  mindMap: Week1LessonMindMap;
  
  // Associated Flashcards & Questions
  flashcards: Flashcard[];
  questions: Question[];
  
  // Checklist
  checklist: Week1LessonChecklist;
}

export interface Week1DaySchedule {
  dayOfWeek: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';
  title: string;
  disciplineName: string;
  unitName: string;
  chapterName: string;
  estimatedHours: string;
  type: 'aulas' | 'revisao' | 'simulado' | 'planejamento';
  lessons?: Week1Lesson[];
}

// ----------------------------------------------------------------------
// WEEK 1 DETAILED LESSONS DATABASE
// ----------------------------------------------------------------------

export const WEEK1_LESSONS: Week1Lesson[] = [
  // ====================================================================
  // SEGUNDA-FEIRA: Língua Portuguesa - Unidade 1 - Capítulo 1
  // ====================================================================
  {
    id: 'w1-seg-aula-1',
    dayOfWeek: 'Segunda',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação de Textos',
    chapterId: 'cap-port-1',
    chapterName: 'Introdução à Interpretação',
    lessonNumber: 1,
    title: 'Aula 1: O que é interpretação de textos',
    description: 'Diferença crucial entre compreensão (decodificação literal) e interpretação (inferência e dedução fundada no texto).',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 45,
    level: 'Fundamental',
    objectives: [
      'Diferenciar Compreensão de Interpretação em questões da banca FGV/Cebraspe.',
      'Identificar marcas linguísticas que autorizam deduções lógicas.',
      'Evitar os 3 erros clássicos: extrapolação, redução e contradição.'
    ],
    competencies: [
      'Capacidade de leitura crítica de enunciados de concursos públicos.',
      'Domínio da inferência textual fundamentada no contexto.'
    ],
    content: `
### 1. Compreensão vs. Interpretação de Textos

No universo dos concursos públicos para tribunais (TJAM), é fundamental distinguir dois conceitos que costumam ser tratados como sinônimos no senso comum:

* **Compreensão Textual (Intelecção):** Trata-se da análise daquilo que está **explicitamente registrado no texto**. A resposta para a questão está literal ou parafraseada nas linhas da passagem. Enunciados típicos: *"Segundo o texto...", "O autor afirma que...", "De acordo com o primeiro parágrafo..."*.
* **Interpretação Textual (Inferência):** Trata-se de extrair conclusões que **não estão escritas com todas as letras, mas que podem ser deduzidas logicamente** a partir das pistas deixadas pelo autor. Enunciados típicos: *"Depreende-se do texto que...", "Infere-se que...", "O texto permite concluir que..."*.

### 2. Os Três Erros Clássicos na Resolução de Questões

1. **Extrapolação:** Ocorrer quando o candidato insere dados da sua própria imaginação ou conhecimento prévio que não possuem respaldo no texto.
2. **Redução:** Ocorre quando o candidato escolhe uma alternativa que aborda apenas um aspecto secundário ou parcial do texto, ignorando a ideia central.
3. **Contradição:** Ocorre quando a alternativa apresenta uma afirmação oposta à tese defendida pelo autor.
    `,
    summary: 'Compreensão busca o explícito no texto (segundo o texto). Interpretação busca deduções autorizadas pelas pistas textuais (infere-se do texto). É indispensável vigiar os erros de extrapolação, redução e contradição.',
    glossary: [
      { term: 'Inferência', definition: 'Conclusão lógica obtida a partir de premissas implícitas ou explícitas em uma passagem.' },
      { term: 'Paráfrase', definition: 'Reescritura de um trecho mantendo o sentido original com outras palavras.' }
    ],
    practicalExamples: [
      {
        scenario: 'Texto: "No interior do Amazonas, os barcos ainda são a única via de acesso durante a época de cheia dos rios."',
        explanation: 'Compreensão: Os barcos são o único meio de transporte no período de cheias. Interpretação: Na época de seca, podem existir outras vias terrestres transitáveis.'
      }
    ],
    observations: [
      'A banca FGV adora questões de depreensão implícita. Nunca responda com base em convicções pessoais.'
    ],
    examTraps: [
      {
        trap: 'Marcar como correta uma alternativa verdadeira no mundo real, porém não citada nem respaldada no texto da prova.',
        reality: 'A verdade da questão de interpretação é estritamente delimitada pelo texto apresentado no enunciado.'
      }
    ],
    studyTips: [
      'Sublinhe o comando da questão para saber se o examinador quer compreensão (explícito) ou interpretação (implícito).'
    ],
    bibliographicReferences: [
      'CUNHA, Celso; CINTRA, Lindley. Nova Gramática do Português Contemporâneo. Rio de Janeiro: Lexikon.',
      'KOCH, Ingedore Villaça. O Texto e a Construção dos Sentidos. São Paulo: Contexto.'
    ],
    materials: [
      { type: 'pdf', title: 'Apostila Completa - Aula 01 Interpretação.pdf', size: '2.4 MB' },
      { type: 'slides', title: 'Slides Apresentação - Aula 01.pdf', size: '1.1 MB' },
      { type: 'video', title: 'Videoaula Explicativa - Prof. Nelson Sartori', url: 'https://youtube.com' }
    ],
    mindMap: {
      title: 'Mapa Mental: Compreensão vs Interpretação',
      description: 'Esquema gráfico separando análise explícita de inferência implícita.',
      annotations: 'Focar na diferença entre comandos de intelecção e inferência.',
      version: '1.0',
      comments: ['Ótimo mapa para fixação rápida!']
    },
    flashcards: [
      {
        id: 'fc-w1-1',
        disciplineId: 'lingua-portuguesa',
        topicId: 'port-1',
        topicName: 'Interpretação de textos',
        front: 'Qual a diferença central entre Compreensão e Interpretação de texto?',
        back: 'Compreensão busca o dado explícito (intelecção). Interpretação busca a conclusão implícita fundamentada no texto (inferência).'
      },
      {
        id: 'fc-w1-2',
        disciplineId: 'lingua-portuguesa',
        topicId: 'port-1',
        topicName: 'Interpretação de textos',
        front: 'Quais são os 3 erros clássicos ao interpretar um texto em concursos?',
        back: 'Extrapolação (ir além do texto), Redução (pegar apenas parte da ideia) e Contradição (afirmar o oposto do texto).'
      }
    ],
    questions: [
      {
        id: 'q-w1-1',
        disciplineId: 'lingua-portuguesa',
        topicId: 'port-1',
        topicName: 'Interpretação de textos',
        statement: 'Quando o comando de uma questão de prova inicia com "Depreende-se do texto que...", o examinador está solicitando:',
        options: [
          { id: 'a', text: 'A transcrição literal da primeira frase do texto.' },
          { id: 'b', text: 'Uma inferência lógica autorizada pelas pistas do texto.' },
          { id: 'c', text: 'Uma opinião pessoal do candidato sobre o tema.' },
          { id: 'd', text: 'A identificação de erros gramaticais de regência.' }
        ],
        correctOptionId: 'b',
        explanation: 'O verbo "depreender" indica inferência ou interpretação lógica com base nos elementos do texto.',
        difficulty: 'fácil',
        year: 2026,
        institution: 'FGV'
      }
    ],
    checklist: {
      watched: true,
      read: true,
      summaryStudied: true,
      mindmapReviewed: true,
      flashcardsDone: true,
      questionsAnswered: true,
      revisionCompleted: false
    }
  },

  {
    id: 'w1-seg-aula-2',
    dayOfWeek: 'Segunda',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação de Textos',
    chapterId: 'cap-port-1',
    chapterName: 'Introdução à Interpretação',
    lessonNumber: 2,
    title: 'Aula 2: Elementos da comunicação',
    description: 'Estudo dos 6 elementos da comunicação (emissor, receptor, mensagem, canal, código, contexto) e suas funções da linguagem.',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 40,
    level: 'Fundamental',
    objectives: [
      'Mapear os 6 elementos do circuito comunicativo.',
      'Correlacionar cada elemento à sua respectiva Função da Linguagem (Emotiva, Conativa, Referencial, Phatica, Metalinguística, Poética).'
    ],
    competencies: [
      'Reconhecimento da intenção comunicativa em diferentes gêneros textuais do Poder Judiciário.'
    ],
    content: `
### 1. O Circuito Comunicativo Roman Jakobson

Toda comunicação verbal pressupõe 6 elementos fundamentais:

1. **Emissor (Remetente):** Quem envia a mensagem.
2. **Receptor (Destinatário):** A quem se destina a mensagem.
3. **Mensagem:** O conteúdo transmitido.
4. **Canal (Meio):** O meio físico de transmissão (papel, áudio, fibra óptica).
5. **Código:** O sistema de signos utilizado (Língua Portuguesa, código Morse).
6. **Contexto (Referente):** O assunto ou situação a que a mensagem se refere.

### 2. Funções da Linguagem

Cada elemento gera uma função predominante no texto:
* **Referencial (Denotativa):** Foco no Referente. Linguagem objetiva, neutra (textos jurídicos, notícias).
* **Emotiva (Expressiva):** Foco no Emissor. Marcas de 1ª pessoa, subjetividade.
* **Conativa (Apelativa):** Foco no Receptor. Verbos no imperativo, convencimento (propagandas, petições).
* **Fática:** Foco no Canal. Testar a transmissão ("Alô?", "Entende?").
* **Metalinguística:** Foco no Código. O código explicando o próprio código (dicionário, aula de gramática).
* **Poética:** Foco na Mensagem. Estética, ritmo, figuras de linguagem.
    `,
    summary: 'Os 6 elementos da comunicação geram as 6 funções da linguagem. Nos editais de tribunais, a função referencial (objetividade) e conativa (persuasão) são as mais examinadas.',
    glossary: [
      { term: 'Referente', definition: 'O assunto, contexto ou realidade sobre a qual a mensagem versa.' },
      { term: 'Metalinguagem', definition: 'Uso do próprio código para explicar o código.' }
    ],
    practicalExamples: [
      {
        scenario: 'A certidão emitida por um oficial de justiça no PJe.',
        explanation: 'Predomina a Função Referencial (foco na verdade dos fatos com linguagem denotativa e objetiva).'
      }
    ],
    observations: ['Um texto pode ter várias funções, mas sempre há uma predominante.'],
    examTraps: [
      {
        trap: 'Confundir função fática com metalinguística.',
        reality: 'Fática testa o canal físico; metalinguística explica o sentido do código.'
      }
    ],
    studyTips: ['Grave o par: Emissor=Emotiva, Receptor=Conativa, Referente=Referencial.'],
    bibliographicReferences: ['JAKOBSON, Roman. Linguística e Comunicação. São Paulo: Cultrix.'],
    materials: [
      { type: 'pdf', title: 'Elementos da Comunicacao e Funcoes.pdf', size: '1.8 MB' }
    ],
    mindMap: {
      title: 'Mapa Mental: Funções da Linguagem',
      description: 'Grafo relacionando Elementos aos Tipos de Funções.',
      annotations: 'Conectores visuais entre Emissor, Receptor e Mensagem.',
      version: '1.0',
      comments: []
    },
    flashcards: [
      {
        id: 'fc-w1-3',
        disciplineId: 'lingua-portuguesa',
        topicId: 'port-1',
        topicName: 'Interpretação de textos',
        front: 'Qual função da linguagem tem como foco o Receptor e utiliza verbos no imperativo?',
        back: 'Função Conativa ou Apelativa.'
      }
    ],
    questions: [
      {
        id: 'q-w1-2',
        disciplineId: 'lingua-portuguesa',
        topicId: 'port-1',
        topicName: 'Interpretação de textos',
        statement: 'Um dicionário que define o significado da palavra "jurisdição" exemplifica a função:',
        options: [
          { id: 'a', text: 'Fática' },
          { id: 'b', text: 'Metalinguística' },
          { id: 'c', text: 'Emotiva' },
          { id: 'd', text: 'Poética' }
        ],
        correctOptionId: 'b',
        explanation: 'Dicionários usam a própria língua para explicar palavras da língua, caracterizando a metalinguagem.',
        difficulty: 'fácil',
        year: 2026,
        institution: 'FGV'
      }
    ],
    checklist: {
      watched: true,
      read: true,
      summaryStudied: true,
      mindmapReviewed: true,
      flashcardsDone: true,
      questionsAnswered: true,
      revisionCompleted: false
    }
  },

  {
    id: 'w1-seg-aula-3',
    dayOfWeek: 'Segunda',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação de Textos',
    chapterId: 'cap-port-1',
    chapterName: 'Introdução à Interpretação',
    lessonNumber: 3,
    title: 'Aula 3: Leitura objetiva e leitura interpretativa',
    description: 'Técnicas de varredura (scanning), leitura analítica (skimming) e identificação de ruídos de leitura em enunciados.',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 40,
    level: 'Intermediário',
    objectives: [
      'Aplicar as técnicas de Skimming e Scanning na leitura de textos extensos.',
      'Identificar adjetivos e advérbios modalizadores que alteram o sentido.'
    ],
    competencies: ['Leitura rápida e precisa de acórdãos e peças processuais.'],
    content: `
### 1. Leitura Objetiva vs. Leitura Subjetiva

A leitura objetiva foca na identificação dos dados concretos do texto, despojando-se de julgamentos de valor do leitor. 

### 2. Modalizadores Discursivos

Palavras que revelam a atitude do autor em relação ao conteúdo:
* **Certeza:** *certamente, indubitavelmente, é óbvio que*.
* **Dúvida/Possibilidade:** *talvez, possivelmente, é provável que*.
* **Obrigação:** *necessariamente, obrigatoriamente, cumpre destacar*.
    `,
    summary: 'A leitura objetiva exige atenção aos modalizadores (advérbios de dúvida ou certeza) que mudam radicalmente o sentido da frase.',
    glossary: [{ term: 'Modalizador', definition: 'Elemento gramatical que indica a posição ou a certeza do emissor sobre o fato.' }],
    practicalExamples: [{ scenario: '"O réu possivelmente cometeu o delito."', explanation: 'O advérbio "possivelmente" atenua a certeza, impedindo afirmar a autoria definitiva.' }],
    observations: ['Fique atento às trocas de "todos" por "alguns" nas opções.'],
    examTraps: [{ trap: 'Ignorar o advérbio "apenas" ou "somente" na leitura rápida.', reality: 'Restritores alteram completamente a validade da afirmação.' }],
    studyTips: ['Circule os advérbios restritivos durante a primeira leitura.'],
    bibliographicReferences: ['KOCH, Ingedore. Desvendando os Segredos do Texto. São Paulo: Contexto.'],
    materials: [{ type: 'pdf', title: 'Leitura Analitica e Modalizadores.pdf', size: '1.4 MB' }],
    mindMap: {
      title: 'Mapa Mental: Modalizadores Discursivos',
      description: 'Classificação dos advérbios de atitude.',
      annotations: '',
      version: '1.0',
      comments: []
    },
    flashcards: [{
      id: 'fc-w1-4',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-1',
      topicName: 'Interpretação de textos',
      front: 'O que são modalizadores discursivos?',
      back: 'Elementos gramaticais (advérbios, adjetivos) que revelam o grau de certeza ou a atitude do autor em relação ao texto.'
    }],
    questions: [{
      id: 'q-w1-3',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-1',
      topicName: 'Interpretação de textos',
      statement: 'Na frase "Os autos foram liminarmente deferidos", o advérbio ressalta a ideia de:',
      options: [
        { id: 'a', text: 'Dúvida quanto ao mérito.' },
        { id: 'b', text: 'Concessão imediata e provisória.' },
        { id: 'c', text: 'Indeferimento por falta de provas.' },
        { id: 'd', text: 'Decisão definitiva irrecorrível.' }
      ],
      correctOptionId: 'b',
      explanation: 'Liminarmente indica decisão proferida no início do processo com caráter de urgência provisória.',
      difficulty: 'médio',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-seg-aula-4',
    dayOfWeek: 'Segunda',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação de Textos',
    chapterId: 'cap-port-1',
    chapterName: 'Introdução à Interpretação',
    lessonNumber: 4,
    title: 'Aula 4: Ideia principal e ideias secundárias',
    description: 'Localização do tópico frasal, hierarquia das ideias e elaboração de resumos esquemáticos.',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 45,
    level: 'Intermediário',
    objectives: ['Identificar a tese/ideia central de cada parágrafo.', 'Distinguir argumentos principais de meros exemplos explicativos.'],
    competencies: ['Capacidade de síntese e mapeamento de estrutura argumentativa.'],
    content: `
### 1. Hierarquia da Informação no Texto

Um texto bem estruturado possui uma **ideia central (tese)** sustentada por **ideias secundárias (argumentos, dados, exemplos)**.

* **Tópico Frasal:** Geralmente a primeira frase do parágrafo, contendo o núcleo do pensamento.
* **Desenvolvimento:** Expansão da ideia núcleo através de justificativas ou exemplificações.
    `,
    summary: 'A ideia principal sintetiza a intenção do autor; as ideias secundárias apenas ilustram ou fundamentam essa tese.',
    glossary: [{ term: 'Tópico Frasal', definition: 'Oração que condensa a ideia central de um parágrafo.' }],
    practicalExamples: [{ scenario: 'Parágrafo com 3 linhas de tese e 10 linhas de estatísticas.', explanation: 'As estatísticas são ideias secundárias; a tese é a ideia principal.' }],
    observations: ['Em provas de concursos, o título do texto frequentemente reflete a ideia principal.'],
    examTraps: [{ trap: 'Confundir um detalhe exemplificativo com a tese do autor.', reality: 'O exemplo serve apenas para ilustrar, não é o foco principal.' }],
    studyTips: ['Escreva uma palavra-chave ao lado de cada parágrafo lido.'],
    bibliographicReferences: ['GARCEZ, Lucília. Técnica de Redação. São Paulo: Martins Fontes.'],
    materials: [{ type: 'pdf', title: 'Hierarquia e Topico Frasal.pdf', size: '1.6 MB' }],
    mindMap: { title: 'Mapa Mental: Ideia Central vs Secundária', description: 'Estrutura piramidal do parágrafo.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-5', disciplineId: 'lingua-portuguesa', topicId: 'port-1', topicName: 'Interpretação de textos', front: 'O que é o Tópico Frasal?', back: 'A oração principal que sintetiza o núcleo de sentido de um parágrafo.' }],
    questions: [{
      id: 'q-w1-4',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-1',
      topicName: 'Interpretação de textos',
      statement: 'Assinale a opção que indica o elemento que possui caráter estritamente secundário em um texto dissertativo:',
      options: [
        { id: 'a', text: 'A tese central do autor' },
        { id: 'b', text: 'Um dado estatístico usado como exemplo' },
        { id: 'c', text: 'A conclusão geral da exposição' },
        { id: 'd', text: 'O posicionamento crítico assumido' }
      ],
      correctOptionId: 'b',
      explanation: 'Exemplos e dados estatísticos são recursos acessórios para corroborar a tese principal.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'Cebraspe'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  // ====================================================================
  // TERÇA-FEIRA: Direito Constitucional - Unidade 1 - Capítulo 1
  // ====================================================================
  {
    id: 'w1-ter-aula-1',
    dayOfWeek: 'Terça',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-1',
    unitName: 'Constituição Federal',
    chapterId: 'cap-const-1',
    chapterName: 'Conceitos Fundamentais',
    lessonNumber: 1,
    title: 'Aula 1: Conceito de Constituição',
    description: 'Estudo das concepções sociológica (Ferdinand Lassalle), política (Carl Schmitt), jurídica (Hans Kelsen) e culturalista.',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 50,
    level: 'Fundamental',
    objectives: [
      'Diferenciar a Constituição Real (Lassalle) da folha de papel.',
      'Compreender a decisão política fundamental (Schmitt) vs Leis Constitucionais.',
      'Analisar a norma hipotética fundamental na pirâmide de Kelsen.'
    ],
    competencies: ['Domínio da teoria geral da Constituição cobrada na jurisprudência do STF.'],
    content: `
### 1. Concepção Sociológica (Ferdinand Lassalle)

Em sua obra *"Que é uma Constituição?"*, Lassalle defende que a Constituição real e efetiva de um país é a **soma dos fatores reais do poder** que regem essa sociedade (forças econômicas, políticas, sociais). Se a norma escrita não refletir esses fatores, será apenas uma **"mera folha de papel"** (*uma folha de papel sem força cogente*).

### 2. Concepção Política (Carl Schmitt)

Para Schmitt, a Constituição é a **decisão política fundamental** do titular do poder constituinte (forma de governo, estrutura do Estado, direitos fundamentais).
* **Constituição:** Decisão política estruturante.
* **Leis Constitucionais:** Demais dispositivos inseridos no texto sem conteúdo propriamente político essencial.

### 3. Concepção Jurídica (Hans Kelsen)

Kelsen analisa a Constituição sob o prisma puramente normativo, despido de valores sociológicos ou políticos:
* **Sentido Lógico-Jurídico:** Norma Hipotética Fundamental (fundamento de validade supremo abstrato).
* **Sentido Jurídico-Positivo:** A norma positiva suprema (o texto constitucional positivado no topo da pirâmide).
    `,
    summary: 'Lassalle = Fatores Reais do Poder (sociológico). Schmitt = Decisão Política Fundamental (político). Kelsen = Norma Jurídica Suprema no topo da pirâmide (jurídico).',
    glossary: [
      { term: 'Fatores Reais do Poder', definition: 'Forças sociais, econômicas e políticas que determinam o poder efetivo na sociedade.' },
      { term: 'Norma Hipotética Fundamental', definition: 'Pressuposto lógico de validade do ordenamento jurídico na teoria de Kelsen.' }
    ],
    practicalExamples: [{ scenario: 'Um artigo da CF/88 que trata apenas do Colégio Pedro II.', explanation: 'Na visão de Schmitt, é uma "Lei Constitucional", pois não traz uma decisão política fundamental.' }],
    observations: ['A CF/88 adota o conceito eclético/multidimensional de Constituição.'],
    examTraps: [{ trap: 'Inverter os autores: atribuir a folha de papel a Kelsen ou a norma fundamental a Schmitt.', reality: 'Lassalle = Folha de papel; Schmitt = Decisão política; Kelsen = Norma jurídica.' }],
    studyTips: ['Associe: Lassalle-Sociológico, Schmitt-Político, Kelsen-Jurídico.'],
    bibliographicReferences: [
      'LASSALLE, Ferdinand. Que é uma Constituição? São Paulo: Edipro.',
      'KELSEN, Hans. Teoria Pura do Direito. São Paulo: Martins Fontes.',
      'SILVA, José Afonso da. Curso de Direito Constitucional Positivo. São Paulo: Malheiros.'
    ],
    materials: [
      { type: 'pdf', title: 'Conceitos de Constituicao - Teoria Completa.pdf', size: '3.1 MB' },
      { type: 'slides', title: 'Esquema de Conceitos Constitucionais.pdf', size: '1.2 MB' }
    ],
    mindMap: {
      title: 'Mapa Mental: Sentidos de Constituição',
      description: 'Divisão em 3 ramos: Sociológico, Político e Jurídico.',
      annotations: '',
      version: '1.0',
      comments: []
    },
    flashcards: [
      {
        id: 'fc-w1-6',
        disciplineId: 'direito-constitucional',
        topicId: 'const-1',
        topicName: 'Constituição',
        front: 'Quem defendeu a Constituição como a "soma dos fatores reais do poder"?',
        back: 'Ferdinand Lassalle (Concepção Sociológica).'
      },
      {
        id: 'fc-w1-7',
        disciplineId: 'direito-constitucional',
        topicId: 'const-1',
        topicName: 'Constituição',
        front: 'O que é a Constituição no sentido jurídico de Hans Kelsen?',
        back: 'É a norma pura e suprema do ordenamento jurídico, dividida nos sentidos lógico-jurídico e jurídico-positivo.'
      }
    ],
    questions: [
      {
        id: 'q-w1-5',
        disciplineId: 'direito-constitucional',
        topicId: 'const-1',
        topicName: 'Constituição',
        statement: 'A concepção que define a Constituição como a "decisão política fundamental" de uma nação é atribuída a:',
        options: [
          { id: 'a', text: 'Hans Kelsen' },
          { id: 'b', text: 'Carl Schmitt' },
          { id: 'c', text: 'Ferdinand Lassalle' },
          { id: 'd', text: 'Konrad Hesse' }
        ],
        correctOptionId: 'b',
        explanation: 'Carl Schmitt desenvolveu a concepção política, diferindo Constituição de leis constitucionais.',
        difficulty: 'fácil',
        year: 2026,
        institution: 'FGV'
      }
    ],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-ter-aula-2',
    dayOfWeek: 'Terça',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-1',
    unitName: 'Constituição Federal',
    chapterId: 'cap-const-1',
    chapterName: 'Conceitos Fundamentais',
    lessonNumber: 2,
    title: 'Aula 2: Classificação das Constituições',
    description: 'Análise detalhada das classificações quanto à origem, forma, extensão, alterabilidade e elaboração.',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 45,
    level: 'Fundamental',
    objectives: ['Classificar integralmente a Constituição Federal de 1988.', 'Diferenciar rigidez de superrigidez constitucional.'],
    competencies: ['Aplicação prática da classificação constitucional em provões e bancas de concurso.'],
    content: `
### 1. Classificação da CF/88

A Constituição da República Federativa do Brasil de 1988 é classificada como:

* **Quanto à Origem:** Promulgada (Democrática / Votada pelo povo via Assembleia Constituinte).
* **Quanto à Forma:** Escrita (Codificada em um único texto).
* **Quanto à Extensão:** Analítica (Longa, detalhista, abrangendo matérias sociais e econômicas).
* **Quanto à Alterabilidade (Estabilidade):** Rígida (Exige processo legislativo especial e mais dificultoso - Art. 60 da CF/88). Alexandre de Moraes defende ser *Superrígida* devido às Cláusulas Pétreas imutáveis.
* **Quanto ao Modo de Elaboração:** Dogmática (Elaborada por um órgão constituinte com base em dogmas da época).
* **Quanto ao Conteúdo:** Formal (Todas as normas constantes do texto possuem status constitucional, independente da matéria).
    `,
    summary: 'CF/88 = Promulgada, Escrita, Analítica, Rígida (ou Superrígida), Dogmática, Formal e Completa.',
    glossary: [{ term: 'Outorgada', definition: 'Constituição imposta de forma unilateral pelo governante, sem consulta popular.' }],
    practicalExamples: [{ scenario: 'Emenda Constitucional exigindo 3/5 dos votos em dois turnos nas duas Casas do Congresso.', explanation: 'Mecanismo que caracteriza a Rigidez Constitucional.' }],
    observations: ['Outorgada = Ditatorial; Promulgada = Democrática.'],
    examTraps: [{ trap: 'Afirmar que a CF/88 é uma constituição sintética.', reality: 'Incorreto. A CF/88 é extensa e analítica (a Constituição dos EUA é sintética).' }],
    studyTips: ['Mnemônico para a CF/88: FORMAL, ESCRITA, PROMULGADA, ANALÍTICA, RÍGIDA, DOGMÁTICA (PEDRA-F).'],
    bibliographicReferences: ['MORAES, Alexandre de. Direito Constitucional. São Paulo: Atlas.'],
    materials: [{ type: 'pdf', title: 'Classificacao das Constituicoes.pdf', size: '2.1 MB' }],
    mindMap: { title: 'Mapa Mental: Classificação da CF/88', description: 'Grafo com todos os atributos da Carta de 88.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-8', disciplineId: 'direito-constitucional', topicId: 'const-1', topicName: 'Constituição', front: 'Como se classifica a CF/88 quanto à sua origem e alterabilidade?', back: 'Promulgada (democrática) e Rígida (exige rito solene de alteração por PEC).' }],
    questions: [{
      id: 'q-w1-6',
      disciplineId: 'direito-constitucional',
      topicId: 'const-1',
      topicName: 'Constituição',
      statement: 'Uma Constituição elaborada por uma Assembleia Nacional Constituinte eleita pelo povo é classificada como:',
      options: [
        { id: 'a', text: 'Outorgada' },
        { id: 'b', text: 'Promulgada' },
        { id: 'c', text: 'Cesarista' },
        { id: 'd', text: 'Pactuada' }
      ],
      correctOptionId: 'b',
      explanation: 'Constituições democráticas surgidas do voto popular são promulgadas.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'Cebraspe'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-ter-aula-3',
    dayOfWeek: 'Terça',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-1',
    unitName: 'Constituição Federal',
    chapterId: 'cap-const-1',
    chapterName: 'Conceitos Fundamentais',
    lessonNumber: 3,
    title: 'Aula 3: Elementos da Constituição',
    description: 'Categorização das normas constitucionais em elementos orgânicos, limitativos, socioideológicos, formais e de aplicabilidade.',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 45,
    level: 'Intermediário',
    objectives: ['Identificar a estrutura interna das normas constitucionais conforme a classificação de José Afonso da Silva.'],
    competencies: ['Análise de estrutura de texto constitucional.'],
    content: `
### Categorias dos Elementos da Constituição

1. **Elementos Orgânicos:** Normas que estruturam os Poderes do Estado (Art. 44 ao 135 - Poder Executivo, Legislativo, Judiciário).
2. **Elementos Limitativos:** Normas que limitam a atuação do Estado em favor da liberdade individual (Direitos e Garantias Fundamentais - Art. 5º).
3. **Elementos Sócio-Ideológicos:** Normas que revelam a opção por um Estado social e de bem-estar (Ordem Social, Ordem Econômica - Art. 170 e 193).
4. **Elementos de Estabilidade Constitucional:** Mecanismos de solução de crises (Estado de Sítio, Estado de Defesa, ADCT).
5. **Elementos Formalmente Constitucionais:** Disposições transitórias e regras formais de promulgação.
    `,
    summary: 'Orgânicos = Poderes; Limitativos = Direitos fundamentais; Sócio-ideológicos = Bem-estar social; Estabilidade = Crises e intervenções.',
    glossary: [{ term: 'Cláusula de Estabilidade', definition: 'Norma destinada a resolver conflitos constitucionais e assegurar a paz social.' }],
    practicalExamples: [{ scenario: 'O artigo 5º da CF/88 (Direitos Individuais).', explanation: 'Constitui um Elemento Limitativo da atuação do Estado.' }],
    observations: ['O Capítulo do Poder Judiciário insere-se nos elementos orgânicos.'],
    examTraps: [{ trap: 'Classificar os direitos fundamentais como elementos orgânicos.', reality: 'São elementos limitativos da intervenção estatal.' }],
    studyTips: ['Associe Orgânico a Órgãos do Estado.'],
    bibliographicReferences: ['SILVA, José Afonso da. Aplicabilidade das Normas Constitucionais. São Paulo: Malheiros.'],
    materials: [{ type: 'pdf', title: 'Elementos da Constituicao.pdf', size: '1.5 MB' }],
    mindMap: { title: 'Mapa Mental: Elementos Constitucionais', description: 'Divisão em 5 grupos normativos.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-9', disciplineId: 'direito-constitucional', topicId: 'const-1', topicName: 'Constituição', front: 'O artigo 5º da CF/88 enquadra-se em qual categoria de elementos?', back: 'Elementos Limitativos.' }],
    questions: [{
      id: 'q-w1-7',
      disciplineId: 'direito-constitucional',
      topicId: 'const-1',
      topicName: 'Constituição',
      statement: 'As normas que regulam a organização e competência dos Poderes Executivo, Legislativo e Judiciário constituem elementos:',
      options: [
        { id: 'a', text: 'Limitativos' },
        { id: 'b', text: 'Orgânicos' },
        { id: 'c', text: 'Socioideológicos' },
        { id: 'd', text: 'De estabilidade' }
      ],
      correctOptionId: 'b',
      explanation: 'Elementos orgânicos disciplinam a estrutura dos órgãos estatais.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-ter-aula-4',
    dayOfWeek: 'Terça',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-1',
    unitName: 'Constituição Federal',
    chapterId: 'cap-const-1',
    chapterName: 'Conceitos Fundamentais',
    lessonNumber: 4,
    title: 'Aula 4: Aplicabilidade das normas constitucionais',
    description: 'Tríplice classificação de José Afonso da Silva: Eficácia Plena, Contida e Limitada (principiológica e institutiva).',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 50,
    level: 'Avançado',
    objectives: [
      'Diferenciar eficácia direta, imediata e integral de eficácia contida e limitada.',
      'Compreender o papel da norma regulamentadora e o Mandado de Injunção.'
    ],
    competencies: ['Resolução avançada de questões de eficácia normativa no STF.'],
    content: `
### Tríplice Classificação de José Afonso da Silva

1. **Normas de Eficácia Plena:** 
   * Produzem todos os seus efeitos desde a promulgação da Constituição.
   * Não exigem norma regulamentadora infraconstitucional.
   * Eficácia **direta, imediata e integral**.
   * *Exemplo: Art. 2º (Separação dos Poderes), Art. 5º, III (Vedação à tortura).*

2. **Normas de Eficácia Contida (Restringível):**
   * Estão aptas a produzir todos os seus efeitos desde o início, mas a legislação infraconstitucional **pode restringir seu alcance**.
   * Eficácia **direta, imediata, mas NÃO integral**.
   * *Exemplo: Art. 5º, XIII (Livre exercício de qualquer trabalho, atendidas as qualificações profissionais que a lei estabelecer).*

3. **Normas de Eficácia Limitada:**
   * Dependem da atuação do legislador infraconstitucional para produzirem seus efeitos plenos.
   * Eficácia **indireta, mediata e reduzida**.
   * **Dividem-se em:**
     * *Declaratórias de Princípio Programático:* Traçam metas e diretrizes públicas (ex: erradicar a pobreza).
     * *Declaratórias de Princípio Institutivo/Organizativo:* Esboçam a criação de órgãos ou entidades públicas a serem regulados em lei (ex: criação de novos Tribunais).
    `,
    summary: 'Plena = Direta/Imediata/Integral (não precisa de lei). Contida = Direta/Imediata/Contível (lei pode restringir). Limitada = Indireta/Mediata (precisa de lei para funcionar).',
    glossary: [{ term: 'Norma Programática', definition: 'Dispositivo constitucional que estabelece metas socioeconômicas a serem perseguidas pelo Estado.' }],
    practicalExamples: [{ scenario: 'O direito de greve dos servidores públicos (Art. 37, VII da CF/88).', explanation: 'Trata-se de norma de eficácia limitada, dependente de lei específica (aplicando-se a lei do setor privado via Mandado de Injunção).' }],
    observations: ['Enquanto a lei de contenção não for editada, a norma contida funciona com eficácia plena.'],
    examTraps: [{ trap: 'Achar que a norma limitada não produz efeito algum antes da lei.', reality: 'Ela produz efeito mínimo: revoga leis anteriores contrárias e impede normas futuras opostas.' }],
    studyTips: ['Decore: Contida pode ser contida por lei; Limitada precisa de lei para andar.'],
    bibliographicReferences: ['SILVA, José Afonso da. Aplicabilidade das Normas Constitucionais. São Paulo: Malheiros.'],
    materials: [{ type: 'pdf', title: 'Eficacia das Normas Constitucionais.pdf', size: '2.8 MB' }],
    mindMap: { title: 'Mapa Mental: Eficácia das Normas', description: 'Tríplice divisão de José Afonso da Silva.', annotations: '', version: '1.0', comments: [] },
    flashcards: [
      { id: 'fc-w1-10', disciplineId: 'direito-constitucional', topicId: 'const-2', topicName: 'Aplicação das normas constitucionais', front: 'O que caracteriza uma norma constitucional de eficácia contida?', back: 'Produz efeitos imediatos, mas seu alcance pode ser contido/restringido por lei infraconstitucional.' },
      { id: 'fc-w1-11', disciplineId: 'direito-constitucional', topicId: 'const-2', topicName: 'Aplicação das normas constitucionais', front: 'Quais são as duas espécies de normas de eficácia limitada?', back: 'Princípio Programático (metas do Estado) e Princípio Institutivo (criação de órgãos).' }
    ],
    questions: [{
      id: 'q-w1-8',
      disciplineId: 'direito-constitucional',
      topicId: 'const-2',
      topicName: 'Aplicação das normas constitucionais',
      statement: 'O direito fundamental ao livre exercício de qualquer trabalho, ofício ou profissão (Art. 5º, XIII da CF/88) possui eficácia:',
      options: [
        { id: 'a', text: 'Plena' },
        { id: 'b', text: 'Contida' },
        { id: 'c', text: 'Limitada programática' },
        { id: 'd', text: 'Limitada institutiva' }
      ],
      correctOptionId: 'b',
      explanation: 'É norma de eficácia contida, pois o exercício é livre imediatamente, ressalvadas as restrições que a lei estabelecer.',
      difficulty: 'médio',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  // ====================================================================
  // QUARTA-FEIRA: Língua Portuguesa - Unidade 1 - Capítulo 2
  // ====================================================================
  {
    id: 'w1-qua-aula-1',
    dayOfWeek: 'Quarta',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação',
    chapterId: 'cap-port-2',
    chapterName: 'Tipologia Textual',
    lessonNumber: 1,
    title: 'Aula 1: Texto Narrativo',
    description: 'Estrutura da narrativa (enredo, personagens, narrador, tempo, espaço) e marcas linguísticas predominantemente temporais.',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 45,
    level: 'Intermediário',
    objectives: ['Mapear a transformação de estado no tempo característica da narrativa.', 'Reconhecer verbos no perfeito do indicativo.'],
    competencies: ['Identificação de sequências narrativas em denúncias e termos de depoimento.'],
    content: `
### 1. A Estrutura da Narrativa

A narração é marcada pelo **deslocamento no tempo**. Um fato inicial é modificado por uma complicação até atingir o clímax e desfecho.

* **Elementos:** PENTED (Personagem, Enredo, Narrador, Tempo, Espaço, Desfecho).
* **Marcadores:** Verbos de ação no Pretérito Perfeito do Indicativo (*chegou, abriu, depôs*) e advérbios de tempo.
    `,
    summary: 'A narrativa conta uma história com transformação temporal. Uso marcante de pretérito perfeito e advérbios temporais.',
    glossary: [{ term: 'Enredo', definition: 'A trama ou sequência de acontecimentos que compõem a história.' }],
    practicalExamples: [{ scenario: '"O réu adentrou o recinto às 14h, sentou-se na cadeira e respondeu às perguntas do magistrado."', explanation: 'Sequência narrativo-factual com verbos de ação no passado.' }],
    observations: ['Depoimentos judiciais utilizam predominantemente a sequência narrativa.'],
    examTraps: [{ trap: 'Confundir narração factual (história) com dissertação sobre a história.', reality: 'A narração relata ações temporais contínuas.' }],
    studyTips: ['Procure verbos de ação articulados em sequência temporal.'],
    bibliographicReferences: ['GANCHO, Cândida. Como Analisar Narrativas. São Paulo: Ática.'],
    materials: [{ type: 'pdf', title: 'Texto Narrativo e Sequencia Temporal.pdf', size: '1.7 MB' }],
    mindMap: { title: 'Mapa Mental: Estrutura Narrativa', description: 'Elementos PENTED.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-12', disciplineId: 'lingua-portuguesa', topicId: 'port-2', topicName: 'Tipologia textual', front: 'Qual o tempo verbal predominante nos textos narrativos?', back: 'Pretérito Perfeito do Indicativo (indica ações concluídas na linha do tempo).' }],
    questions: [{
      id: 'q-w1-9',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-2',
      topicName: 'Tipologia textual',
      statement: 'Um texto que se caracteriza pela sucessão cronológica de fatos articulados por verbos de ação pertence predominantemente ao tipo:',
      options: [
        { id: 'a', text: 'Descritivo' },
        { id: 'b', text: 'Narrativo' },
        { id: 'c', text: 'Injuntivo' },
        { id: 'd', text: 'Dissertativo' }
      ],
      correctOptionId: 'b',
      explanation: 'A sucessão cronológica de ações é a essência do texto narrativo.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-qua-aula-2',
    dayOfWeek: 'Quarta',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação',
    chapterId: 'cap-port-2',
    chapterName: 'Tipologia Textual',
    lessonNumber: 2,
    title: 'Aula 2: Texto Descritivo',
    description: 'Caracterização estática de pessoas, objetos ou cenários com abundância de adjetivos e verbos de ligação.',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 40,
    level: 'Intermediário',
    objectives: ['Reconhecer retratos falados e descrições de locais do crime.'],
    competencies: ['Identificação do paralelismo descritivo estático.'],
    content: `
### 1. A Descrição Textual

A descrição funciona como uma **fotografia verbal**. Não há progressão temporal relevante; o tempo é estático.

* **Marcas Linguísticas:** Abundância de adjetivos, locuções adjetivas, substantivos concretos e verbos no **Pretérito Imperfeito do Indicativo** (*era, apresentava, ostentava*) ou de ligação (*ser, estar, parecer*).
    `,
    summary: 'Descrição = Retrato estático sem progressão temporal. Uso massivo de adjetivos e pretérito imperfeito.',
    glossary: [{ term: 'Estatismo', definition: 'Ausência de progressão temporal em uma sequência descritiva.' }],
    practicalExamples: [{ scenario: '"A sala de audiências era ampla, iluminada por janelas altas e ostentava paredes de madeira escura."', explanation: 'Sequência descritiva caracterizando um ambiente.' }],
    observations: ['A descrição costuma aparecer inserida dentro de textos narrativos.'],
    examTraps: [{ trap: 'Confundir pretérito perfeito (narração) com pretérito imperfeito (descrição).', reality: 'Perfeito = Ação no tempo; Imperfeito = Estado duradouro/característica.' }],
    studyTips: ['Procure adjetivos e estado estático.'],
    bibliographicReferences: ['CUNHA, Celso. Gramática da Língua Portuguesa. Rio de Janeiro: Lexikon.'],
    materials: [{ type: 'pdf', title: 'Texto Descritivo e Adjetivacao.pdf', size: '1.3 MB' }],
    mindMap: { title: 'Mapa Mental: Caracterização Descritiva', description: 'Atributos e adjetivação.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-13', disciplineId: 'lingua-portuguesa', topicId: 'port-2', topicName: 'Tipologia textual', front: 'Diferença de tempo verbal entre Narração e Descrição?', back: 'Narração usa Pretérito Perfeito (ação). Descrição usa Pretérito Imperfeito (característica estática).' }],
    questions: [{
      id: 'q-w1-10',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-2',
      topicName: 'Tipologia textual',
      statement: 'Assinale a opção que apresenta a principal marca linguística do texto descritivo:',
      options: [
        { id: 'a', text: 'Predomínio de verbos no imperativo' },
        { id: 'b', text: 'Uso abundante de adjetivos e frases estáticas' },
        { id: 'c', text: 'Conectores lógicos de causa e efeito' },
        { id: 'd', text: 'Foco na terceira pessoa do plural com ações sequenciais' }
      ],
      correctOptionId: 'b',
      explanation: 'A caracterização de seres e ambientes fundamenta-se na adjetivação e no estatismo.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-qua-aula-3',
    dayOfWeek: 'Quarta',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação',
    chapterId: 'cap-port-2',
    chapterName: 'Tipologia Textual',
    lessonNumber: 3,
    title: 'Aula 3: Texto Dissertativo',
    description: 'Exposição de ideias (Dissertativo-Expositivo) vs Defesa de tese com argumentos (Dissertativo-Argumentativo).',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 50,
    level: 'Intermediário',
    objectives: ['Diferenciar exposição pura de defesa de tese fundamentada.'],
    competencies: ['Análise de arrazoados jurídicos e pareceres.'],
    content: `
### 1. Dissertação Expositiva vs. Argumentativa

* **Dissertação Expositiva:** Limita-se a apresentar conceitos, dados ou teorias sem defender um ponto de vista pessoal (ex: uma aula informativa ou verbete de enciclopédia).
* **Dissertação Argumentativa:** Apresenta uma **tese** e utiliza argumentos lógicos para convencer o leitor/ouvinte da validade da opinião (ex: acórdão, parecer jurídico, artigo de opinião).
    `,
    summary: 'Expositivo = Informar sem opinar. Argumentativo = Convencer defendendo tese com argumentos lógicos.',
    glossary: [{ term: 'Tese', definition: 'Ideia central defendida pelo autor em um texto argumentativo.' }],
    practicalExamples: [{ scenario: 'Uma petição inicial requerendo a condenação do réu por danos morais.', explanation: 'Texto dissertativo-argumentativo por excelência.' }],
    observations: ['Provas de concursos cobram a identificação dos operadores argumentativos (*portanto, porém, visto que*).'],
    examTraps: [{ trap: 'Achar que qualquer dissertação possui tese pessoal.', reality: 'Textos expositivos informam sem emitir juízo de valor.' }],
    studyTips: ['Procure conectores conclusivos e explicativos.'],
    bibliographicReferences: ['KOCH, Ingedore. Argumentação e Linguagem. São Paulo: Cortez.'],
    materials: [{ type: 'pdf', title: 'Dissertacao Expositiva e Argumentativa.pdf', size: '2.0 MB' }],
    mindMap: { title: 'Mapa Mental: Tipos de Dissertação', description: 'Expositivo vs Argumentativo.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-14', disciplineId: 'lingua-portuguesa', topicId: 'port-2', topicName: 'Tipologia textual', front: 'O que diferencia a dissertação expositiva da argumentativa?', back: 'Expositiva apenas informa dados. Argumentativa defende uma tese com argumentos persuasivos.' }],
    questions: [{
      id: 'q-w1-11',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-2',
      topicName: 'Tipologia textual',
      statement: 'Um parecer jurídico que fundamenta a ilegalidade de uma demissão e conclui pela reintegração do servidor é:',
      options: [
        { id: 'a', text: 'Descritivo' },
        { id: 'b', text: 'Dissertativo-argumentativo' },
        { id: 'c', text: 'Narrativo ficcional' },
        { id: 'd', text: 'Injuntivo poético' }
      ],
      correctOptionId: 'b',
      explanation: 'Pareceres jurídicos buscam persuadir e convencer através da lógica argumentativa.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'Cebraspe'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-qua-aula-4',
    dayOfWeek: 'Quarta',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    unitId: 'unid-port-1',
    unitName: 'Compreensão e Interpretação',
    chapterId: 'cap-port-2',
    chapterName: 'Tipologia Textual',
    lessonNumber: 4,
    title: 'Aula 4: Texto Injuntivo',
    description: 'Textos instrucionais e prescritivos: uso do imperativo, manuais, editais de concursos e leis.',
    professor: 'Prof. Nelson Sartori',
    estimatedMinutes: 40,
    level: 'Fundamental',
    objectives: ['Reconhecer ordens, conselhos e prescrições em textos oficiais.'],
    competencies: ['Leitura técnica de editais e portarias regulamentares.'],
    content: `
### 1. A Injuntividade Textual

O texto injuntivo (instrucional ou prescritivo) tem como finalidade **orientar ou ditar comportamentos do leitor**.

* **Marcas Linguísticas:** Verbos no **Imperativo** (*faça, preencha, envie*), verbos de obrigação (*deve, cumpre*), listas e passos ordenados.
* **Exemplos:** Editais de concurso público, receitas médicas, manuais de sistemas do TJAM (PJe), leis.
    `,
    summary: 'Injuntivo = Instruções e regras coercitivas. Uso marcante de imperativo e verbos de dever.',
    glossary: [{ term: 'Injuntivo', definition: 'Que ordena, instrui ou estabelece regras de conduta.' }],
    practicalExamples: [{ scenario: '"O candidato deverá comparecer ao local de prova com 60 minutos de antecedência munido de caneta preta."', explanation: 'Item de edital com caráter injuntivo/prescritivo.' }],
    observations: ['Editais de concurso são textos essencialmente injuntivo-prescritivos.'],
    examTraps: [{ trap: 'Confundir instrução recomendatória com ordem compulsória.', reality: 'Textos prescritivos (leis) proíbem ou obrigam expressamente.' }],
    studyTips: ['Verbos no imperativo indicam injunção.'],
    bibliographicReferences: ['CUNHA, Celso. Gramática da Língua Portuguesa. Rio de Janeiro: Lexikon.'],
    materials: [{ type: 'pdf', title: 'Texto Injuntivo e Editais.pdf', size: '1.2 MB' }],
    mindMap: { title: 'Mapa Mental: Injuntividade', description: 'Características e verbos de ordem.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-15', disciplineId: 'lingua-portuguesa', topicId: 'port-2', topicName: 'Tipologia textual', front: 'Qual a marca gramatical predominante nos textos injuntivos?', back: 'Verbos no Imperativo ou estruturas que expressam comando e orientação.' }],
    questions: [{
      id: 'q-w1-12',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-2',
      topicName: 'Tipologia textual',
      statement: 'Manuais de instrução de sistemas eletrônicos e editais de concursos pertencem predominantemente ao tipo:',
      options: [
        { id: 'a', text: 'Narrativo' },
        { id: 'b', text: 'Injuntivo' },
        { id: 'c', text: 'Poético' },
        { id: 'd', text: 'Descritivo estático' }
      ],
      correctOptionId: 'b',
      explanation: 'Manuais e editais fornecem instruções e ordens de procedimento, caracterizando o tipo injuntivo.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  // ====================================================================
  // QUINTA-FEIRA: Direito Constitucional - Unidade 2 - Capítulo 2
  // ====================================================================
  {
    id: 'w1-qui-aula-1',
    dayOfWeek: 'Quinta',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-2',
    unitName: 'Princípios Fundamentais',
    chapterId: 'cap-const-2',
    chapterName: 'Princípios Fundamentais da República',
    lessonNumber: 1,
    title: 'Aula 1: Fundamentos da República',
    description: 'Análise detalhada do Art. 1º da CF/88: Soberania, Cidadania, Dignidade da Pessoa Humana, Valores Sociais do Trabalho e Livre Iniciativa, Pluralismo Político.',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 50,
    level: 'Fundamental',
    objectives: ['Mapear os 5 fundamentos com o mnemônico SO-CI-VA-DI-PLU.', 'Compreender o Princípio da Dignidade da Pessoa Humana como epicentro do ordenamento.'],
    competencies: ['Aplicação dos fundamentos constitucionais na resolução de questões do TJAM.'],
    content: `
### Os Fundamentos do Estado Brasileiro (Art. 1º da CF/88)

A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos:

1. **Soberania (SO):** Atributo do Estado nacional, supremo na ordem interna e independente na ordem internacional.
2. **Cidadania (CI):** Qualidade do cidadão participante da vida política do Estado (votar e ser votado, ação popular).
3. **Dignidade da Pessoa Humana (DI):** Valor supremo e vetor axiológico do ordenamento jurídico brasileiro.
4. **Valores Sociais do Trabalho e da Livre Iniciativa (VA):** Princípio do capitalismo social (conciliação entre proteção do trabalhador e livre mercado).
5. **Pluralismo Político (PLU):** Garantia de convivência de diversas ideias, ideologias e partidos (não se confunde com multipartidarismo).

> **Mnemônico Oficial:** **SO - CI - VA - DI - PLU**
    `,
    summary: 'Art. 1º (Fundamentos): SOberania, CIdadania, Dignidade da pessoa humana, VAlores sociais do trabalho/livre iniciativa, PLUralismo político.',
    glossary: [{ term: 'Pluralismo Político', definition: 'Garantia de liberdade de pensamento e multiplicidade de concepções filosóficas, sociais e políticas.' }],
    practicalExamples: [{ scenario: 'Decisão do STF garantindo o direito ao nome social para pessoas trans sem necessidade de cirurgia.', explanation: 'Fundamentação direta no Princípio da Dignidade da Pessoa Humana.' }],
    observations: ['Pluralismo político é mais amplo que multipartidarismo.'],
    examTraps: [{ trap: 'Trocar um fundamento (Art. 1º) por um objetivo (Art. 3º).', reality: 'Fundamentos são substantivos (Soberania); Objetivos são verbos (Construir, Erradicar).' }],
    studyTips: ['Grave o mnemônico SOCIVADIPLU.'],
    bibliographicReferences: ['BARROSO, Luís Roberto. Curso de Direito Constitucional Contemporâneo. São Paulo: Saraiva.'],
    materials: [{ type: 'pdf', title: 'Art 1 CF88 Fundamentos da Republica.pdf', size: '2.2 MB' }],
    mindMap: { title: 'Mapa Mental: Fundamentos da República', description: 'Mnemônico SOCIVADIPLU.', annotations: '', version: '1.0', comments: [] },
    flashcards: [
      { id: 'fc-w1-16', disciplineId: 'direito-constitucional', topicId: 'const-3', topicName: 'Princípios Fundamentais', front: 'Quais são os 5 fundamentos do Art. 1º da CF/88 (SOCIVADIPLU)?', back: 'Soberania, Cidadania, Dignidade da pessoa humana, Valores sociais do trabalho e da livre iniciativa, Pluralismo político.' }
    ],
    questions: [{
      id: 'q-w1-13',
      disciplineId: 'direito-constitucional',
      topicId: 'const-3',
      topicName: 'Princípios Fundamentais',
      statement: 'Assinale a opção que apresenta um fundamento da República Federativa do Brasil expressamente previsto no Art. 1º da Constituição:',
      options: [
        { id: 'a', text: 'Erradicar a pobreza' },
        { id: 'b', text: 'Pluralismo Político' },
        { id: 'c', text: 'Defesa da paz mundial' },
        { id: 'd', text: 'Promover o bem de todos' }
      ],
      correctOptionId: 'b',
      explanation: 'O Pluralismo Político integra o rol de fundamentos do Art. 1º (SOCIVADIPLU). As demais opções são objetivos ou princípios internacionais.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-qui-aula-2',
    dayOfWeek: 'Quinta',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-2',
    unitName: 'Princípios Fundamentais',
    chapterId: 'cap-const-2',
    chapterName: 'Princípios Fundamentais da República',
    lessonNumber: 2,
    title: 'Aula 2: Objetivos Fundamentais',
    description: 'Estudo do Art. 3º da CF/88: Construir, Garantir, Erradicar, Reduzir e Promover (Mnemônico CON-ER-GA-PRO).',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 45,
    level: 'Fundamental',
    objectives: ['Identificar os metas e diretrizes do Estado Brasileiro formuladas por verbos no infinitivo.'],
    competencies: ['Diferenciação precisa entre Fundamentos (Art. 1º) e Objetivos (Art. 3º).'],
    content: `
### Os Objetivos Fundamentais da República (Art. 3º da CF/88)

Constituem objetivos fundamentais da República Federativa do Brasil:

1. **CONstruir** uma sociedade livre, justa e solidária.
2. **GARantir** o desenvolvimento nacional.
3. **ERRadicar** a pobreza e a marginalização e **REduzir** as desigualdades sociais e regionais.
4. **PROmover** o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.

> **Regra de Ouro:** Os Objetivos Fundamentais são sempre iniciados por **VERBOS NO INFINITIVO** (Construir, Garantir, Erradicar, Reduzir, Promover).
    `,
    summary: 'Art. 3º (Objetivos): Iniciados por Verbos no Infinitivo. Mnemônico CON-ER-GA-PRO.',
    glossary: [{ term: 'Norma Programática', definition: 'Metas constitucionais de ação futura impostas aos Poderes Públicos.' }],
    practicalExamples: [{ scenario: 'Criação da Zona Franca de Manaus para incentivar o desenvolvimento da Amazônia.', explanation: 'Cumprimento direto do objetivo de reduzir desigualdades regionais (Art. 3º, III).' }],
    observations: ['O rol de discriminações do inciso IV é exemplificativo (*"quaisquer outras formas"*).'],
    examTraps: [{ trap: 'Confundir a meta de "erradicar a pobreza" com "erradicar as desigualdades".', reality: 'A pobreza se erradica; as desigualdades sociais/regionais se REDUZEM.' }],
    studyTips: ['Verbo no infinitivo = Objetivo do Art. 3º.'],
    bibliographicReferences: ['BAHIA, Flávia. Direito Constitucional - Coleção OAB. São Paulo: Armador.'],
    materials: [{ type: 'pdf', title: 'Art 3 CF88 Objetivos Fundamentais.pdf', size: '1.9 MB' }],
    mindMap: { title: 'Mapa Mental: Objetivos Fundamentais', description: 'Mnemônico CON-ER-GA-PRO e Verbos.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-17', disciplineId: 'direito-constitucional', topicId: 'const-3', topicName: 'Princípios Fundamentais', front: 'Como diferenciar os Fundamentos (Art 1º) dos Objetivos (Art 3º) da CF/88?', back: 'Fundamentos são substantivos (SOCIVADIPLU). Objetivos são iniciados por VERBOS no infinitivo (CONERGAPRO).' }],
    questions: [{
      id: 'q-w1-14',
      disciplineId: 'direito-constitucional',
      topicId: 'const-3',
      topicName: 'Princípios Fundamentais',
      statement: 'Constitui um objetivo fundamental da República Federativa do Brasil expressamente previsto na CF/88:',
      options: [
        { id: 'a', text: 'A autodeterminação dos povos' },
        { id: 'b', text: 'Promover o bem de todos, sem preconceitos' },
        { id: 'c', text: 'A soberania nacional' },
        { id: 'd', text: 'O pluralismo político' }
      ],
      correctOptionId: 'b',
      explanation: 'Promover o bem de todos é objetivo (iniciado por verbo no infinitivo no Art. 3º, IV).',
      difficulty: 'fácil',
      year: 2026,
      institution: 'Cebraspe'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-qui-aula-3',
    dayOfWeek: 'Quinta',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-2',
    unitName: 'Princípios Fundamentais',
    chapterId: 'cap-const-2',
    chapterName: 'Princípios Fundamentais da República',
    lessonNumber: 3,
    title: 'Aula 3: Princípios das Relações Internacionais',
    description: 'Análise dos 10 princípios que regem o Brasil na ordem internacional (Art. 4º da CF/88) e a integração latino-americana.',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 45,
    level: 'Intermediário',
    objectives: ['Mapear os 10 princípios do Art. 4º e a cláusula de integração da América Latina.'],
    competencies: ['Domínio da atuação internacional do Brasil no Direito Constitucional.'],
    content: `
### Princípios nas Relações Internacionais (Art. 4º da CF/88)

A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios:

1. Independência nacional;
2. Prevalência dos direitos humanos;
3. Autodeterminação dos povos;
4. Não-intervenção;
5. Igualdade entre os Estados;
6. Defesa da paz;
7. Solução pacífica dos conflitos;
8. Repúdio ao terrorismo e ao racismo;
9. Cooperação entre os povos para o progresso da humanidade;
10. Concessão de asilo político.

* **Parágrafo Único (Integração Latino-Americana):** A República Federativa do Brasil buscará a integração econômica, política, social e cultural dos povos da **América Latina**, visando à formação de uma comunidade latino-americana de nações.
    `,
    summary: 'Art. 4º = Diretrizes internacionais (solução pacífica, asilo político, repúdio ao terrorismo/racismo). Parágrafo único = Integração da América Latina.',
    glossary: [{ term: 'Asilo Político', definition: 'Acolhimento concedido pelo Estado brasileiro a estrangeiro perseguido por motivos políticos ou ideológicos.' }],
    practicalExamples: [{ scenario: 'O Brasil concedendo abrigo a um perseguido político de regime ditatorial vizinho.', explanation: 'Aplicação do princípio da concessão de asilo político (Art. 4º, X).' }],
    observations: ['O parágrafo único fala em América Latina (não apenas América do Sul).'],
    examTraps: [{ trap: 'Afirmar que o Brasil busca a integração dos povos de toda a América ou do Sul da América.', reality: 'O texto constitucional especifica expressamente "América Latina".' }],
    studyTips: ['Aponte a palavra "Latino-Americana" no parágrafo único.'],
    bibliographicReferences: ['BAHIA, Flávia. Direito Constitucional. São Paulo: Armador.'],
    materials: [{ type: 'pdf', title: 'Art 4 CF88 Relacoes Internacionais.pdf', size: '1.6 MB' }],
    mindMap: { title: 'Mapa Mental: Relações Internacionais', description: 'Princípios do Art 4º e Integração Latina.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-18', disciplineId: 'direito-constitucional', topicId: 'const-3', topicName: 'Princípios Fundamentais', front: 'Qual região geográfica tem prioridade constitucional de integração pelo Brasil (Art 4º P.Ú.)?', back: 'América Latina (integração econômica, política, social e cultural).' }],
    questions: [{
      id: 'q-w1-15',
      disciplineId: 'direito-constitucional',
      topicId: 'const-3',
      topicName: 'Princípios Fundamentais',
      statement: 'Nos termos do parágrafo único do Art. 4º da CF/88, o Brasil buscará a integração econômica, política, social e cultural dos povos da:',
      options: [
        { id: 'a', text: 'América do Sul' },
        { id: 'b', text: 'América Latina' },
        { id: 'c', text: 'Comunidade Lusófona' },
        { id: 'd', text: 'América Central e do Sul' }
      ],
      correctOptionId: 'b',
      explanation: 'O texto constitucional refere-se expressamente à integração da América Latina.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  },

  {
    id: 'w1-qui-aula-4',
    dayOfWeek: 'Quinta',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    unitId: 'unid-const-2',
    unitName: 'Princípios Fundamentais',
    chapterId: 'cap-const-2',
    chapterName: 'Princípios Fundamentais da República',
    lessonNumber: 4,
    title: 'Aula 4: Questões Comentadas de Princípios Fundamentais',
    description: 'Resolução passo a passo de questões da FGV e Cebraspe sobre os Artigos 1º a 4º da Constituição Federal.',
    professor: 'Prof.ª Flávia Bahia',
    estimatedMinutes: 45,
    level: 'Intermediário',
    objectives: ['Fixar os mnemônicos e pegadinhas dos Artigos 1º ao 4º através de bateria de exercícios práticos.'],
    competencies: ['Agilidade e precisão na resolução de itens sobre Princípios Fundamentais.'],
    content: `
### Bateria de Fixação Intensiva (Artigos 1º a 4º)

Nesta aula, analisamos as pegadinhas mais recorrentes nas bancas que organizam concursos de tribunais:

1. **Confusão de Rol:** Alternativas misturando Fundamentos (Art. 1º), Separação dos Poderes (Art. 2º), Objetivos (Art. 3º) e Relações Internacionais (Art. 4º).
2. **Substituição de Verbos:** Inversão de "erradicar" por "reduzir".
3. **Pluralismo Político vs Multipartidarismo:** O pluralismo político é a garantia ampla de ideias; o multipartidarismo é mera consequência partidária.
    `,
    summary: 'Treino prático de diferenciação dos artigos 1º, 2º, 3º e 4º com foco nas armadilhas da FGV.',
    glossary: [{ term: 'Separabilidade de Poderes', definition: 'Artigo 2º: São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.' }],
    practicalExamples: [{ scenario: 'Questão que afirma ser a tripartição de poderes um objetivo fundamental.', explanation: 'Errado! A separação de poderes (Art. 2º) é princípio autônomo da organização estatal.' }],
    observations: ['O Artigo 2º consagra o sistema de freios e contrapesos (checks and balances).'],
    examTraps: [{ trap: 'Achar que a intervenção federal fere a independência dos Poderes.', reality: 'A intervenção é mecanismo constitucional de estabilidade do pacto federativo.' }],
    studyTips: ['Faça um quadro comparativo dos 4 artigos antes da prova.'],
    bibliographicReferences: ['BAHIA, Flávia. Direito Constitucional. São Paulo: Armador.'],
    materials: [{ type: 'pdf', title: 'Caderno de Questoes Comentadas Art 1 a 4.pdf', size: '2.5 MB' }],
    mindMap: { title: 'Mapa Mental: Síntese Art 1 a 4', description: 'Visão geral comparativa.', annotations: '', version: '1.0', comments: [] },
    flashcards: [{ id: 'fc-w1-19', disciplineId: 'direito-constitucional', topicId: 'const-3', topicName: 'Princípios Fundamentais', front: 'O que estabelece o Artigo 2º da Constituição Federal?', back: 'São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.' }],
    questions: [{
      id: 'q-w1-16',
      disciplineId: 'direito-constitucional',
      topicId: 'const-3',
      topicName: 'Princípios Fundamentais',
      statement: 'São Poderes da União, independentes e harmônicos entre si, nos termos do Art. 2º da CF/88:',
      options: [
        { id: 'a', text: 'O Executivo, o Legislativo e o Ministério Público' },
        { id: 'b', text: 'O Legislativo, o Executivo e o Judiciário' },
        { id: 'c', text: 'O Judiciário, a Defensoria Pública e a Advocacia-Geral' },
        { id: 'd', text: 'O Presidente, o Congresso e os Governadores' }
      ],
      correctOptionId: 'b',
      explanation: 'Art. 2º: São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }],
    checklist: { watched: true, read: true, summaryStudied: true, mindmapReviewed: true, flashcardsDone: true, questionsAnswered: true, revisionCompleted: false }
  }
];

// ----------------------------------------------------------------------
// WEEK 1 REVISION PAGE DATA (SEXTA-FEIRA)
// ----------------------------------------------------------------------

export const WEEK1_FRIDAY_REVISION = {
  title: 'Página de Revisão Integrada da Semana 1',
  description: 'Consolidação prática de Língua Portuguesa e Direito Constitucional estudados de Segunda a Quinta-feira.',
  summaryOfWeek: `
Nesta primeira semana do curso para Assistente Judiciário do TJAM, cobrimos dois pilares essenciais:
1. **Língua Portuguesa:** Diferenciação entre Compreensão e Interpretação de textos, erros de extrapolação/redução/contradição, elementos da comunicação e suas 6 funções, modalizadores discursivos, hierarquia das ideias no parágrafo e os 4 tipos textuais (Narrativo, Descritivo, Dissertativo e Injuntivo).
2. **Direito Constitucional:** Sentidos de Constituição (Lassalle, Schmitt, Kelsen), classificação da CF/88 (PEDRA-F), elementos da Constituição, aplicabilidade das normas (Plena, Contida, Limitada de José Afonso da Silva) e a análise dos Artigos 1º ao 4º (Fundamentos - SOCIVADIPLU, Objetivos - CONERGAPRO, Relações Internacionais e Separação dos Poderes).
  `,
  totalMixedQuestions: 40,
  checklists: [
    'Revisar todos os 19 flashcards acumulados',
    'Resolver o bloco de 40 questões mistas de Português e Constitucional',
    'Conferir os 4 mapas mentais da semana',
    'Revisar anotações no Caderno de Erros'
  ]
};

// ----------------------------------------------------------------------
// WEEK 1 SATURDAY SIMULADO DATA (SÁBADO)
// ----------------------------------------------------------------------

export const WEEK1_SATURDAY_SIMULADO: Simulado = {
  id: 'sim-semana-1-tjam',
  title: 'Simulado Oficial da Semana 1 - TJAM Assistente Judiciário',
  description: 'Prova simulada com 40 questões exclusivas inéditas e adaptadas da FGV cobrindo os tópicos de Português e Constitucional estudados na Semana 1.',
  durationMinutes: 120,
  totalQuestions: 40,
  disciplineBreakdown: {
    'lingua-portuguesa': 20,
    'direito-constitucional': 20
  },
  questions: WEEK1_LESSONS.flatMap((l) => l.questions).concat([
    {
      id: 'q-sim-extra-1',
      disciplineId: 'lingua-portuguesa',
      topicId: 'port-1',
      topicName: 'Interpretação de textos',
      statement: 'Assinale a alternativa em que há um desvio de interpretação por extrapolação:',
      options: [
        { id: 'a', text: 'Deduzir uma conclusão fundamentada na lógica das premissas.' },
        { id: 'b', text: 'Adicionar informações não presentes nem implícitas no texto.' },
        { id: 'c', text: 'Parafrasear a tese central do primeiro parágrafo.' },
        { id: 'd', text: 'Resumir o tópico frasal em uma única palavra-chave.' }
      ],
      correctOptionId: 'b',
      explanation: 'Extrapolamento consiste em acrescentar ideias alheias ao texto.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    },
    {
      id: 'q-sim-extra-2',
      disciplineId: 'direito-constitucional',
      topicId: 'const-1',
      topicName: 'Constituição',
      statement: 'Na concepção de Ferdinand Lassalle, se a constituição escrita não corresponder aos fatores reais do poder, ela será apenas:',
      options: [
        { id: 'a', text: 'Uma norma hipotética fundamental' },
        { id: 'b', text: 'Uma mera folha de papel' },
        { id: 'c', text: 'Uma lei infraconstitucional plena' },
        { id: 'd', text: 'Uma decisão política imutável' }
      ],
      correctOptionId: 'b',
      explanation: 'Lassalle cunhou a célebre frase da "folha de papel" sem força cogente.',
      difficulty: 'fácil',
      year: 2026,
      institution: 'FGV'
    }
  ]),
  createdAt: '2026-08-01',
  status: 'active'
};

// ----------------------------------------------------------------------
// WEEK 1 SUNDAY REVISION & TRANSITION DATA (DOMINGO)
// ----------------------------------------------------------------------

export const WEEK1_SUNDAY_PLANNING = {
  title: 'Revisão Geral & Transição Automática para a Semana 2',
  description: 'Fechamento do ciclo semanal, consolidando desempenho e ativando o cronograma da Semana 2.',
  activities: [
    'Sessão Anki de Repetição Espaçada dos Flashcards',
    'Download da Bibliografia e Leitura Seca da Lei 14.133 (Licitações)',
    'Conferência do Gráfico de Desempenho no Dashboard',
    'Liberação automática das metas da Semana 2 (Direito Administrativo & Processo Civil)'
  ]
};
