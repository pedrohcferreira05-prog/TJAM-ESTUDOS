export interface FlashcardItem {
  id: number;
  q: string;
  a: string;
  frente?: string;
  verso?: string;
  categoria?: string;
  dica?: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
  textoApoio?: string;
}

export interface TfQuestionItem {
  id: number;
  enunciado: string;
  correta: boolean;
  explicacao: string;
}

export interface DiscursiveQuestionItem {
  id: number;
  enunciado: string;
  respostaEsperada: string;
}

export const direitoConstFlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'O que é Direito Constitucional e qual o papel da Constituição Federal de 1988?',
    a: 'É o ramo do Direito Público responsável pelo estudo da Constituição Federal, que estabelece a organização do Estado, a estrutura dos Poderes, os direitos e garantias fundamentais, os deveres do Estado e os princípios que orientam a República. A CF/88 é a lei fundamental e suprema do Brasil.',
  },
  {
    id: 2,
    q: 'Qual é o mnemônico dos cinco fundamentos da República (Art. 1º da CF/88)?',
    a: 'SO – CI – DI – VA – PLU:\n• SOberania\n• CIdadania\n• DIgnidade da pessoa humana\n• VAlores sociais do trabalho e da livre iniciativa\n• PLUralismo político',
  },
  {
    id: 3,
    q: 'O que significam Soberania e Cidadania no Art. 1º da CF/88?',
    a: '• Soberania: poder do Estado de se organizar e tomar decisões sem submissão a outro Estado.\n• Cidadania: participação do indivíduo na vida política e social.',
  },
  {
    id: 4,
    q: 'O que significam Dignidade da pessoa humana e Pluralismo político (Art. 1º)?',
    a: '• Dignidade da pessoa humana: respeito e proteção à dignidade de cada pessoa.\n• Pluralismo político: reconhecimento da diversidade de ideias e posições políticas.',
  },
  {
    id: 5,
    q: 'Quais são os Poderes da União e como devem atuar segundo o Art. 2º?',
    a: 'São Poderes da União o Legislativo (elabora leis e fiscaliza), o Executivo (administra o Estado e executa leis) e o Judiciário (exerce função jurisdicional, solucionando conflitos). Eles são INDEPENDENTES E HARMÔNICOS entre si (sem subordinação).',
  },
  {
    id: 6,
    q: 'Quais são os quatro objetivos fundamentais da República (Art. 3º da CF/88)?',
    a: '1) Construir uma sociedade livre, justa e solidária;\n2) Garantir o desenvolvimento nacional;\n3) Erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais;\n4) Promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.',
  },
  {
    id: 7,
    q: 'Como não confundir Fundamentos (Art. 1º) com Objetivos Fundamentais (Art. 3º)?',
    a: '• Fundamentos (Art. 1º): são a base/pilares de sustentação do Estado (substantivos: Soberania, Cidadania, Dignidade, Valores sociais, Pluralismo político).\n• Objetivos Fundamentais (Art. 3º): são metas e finalidades a serem alcançadas pelo Estado (iniciam com verbos: Construir, Garantir, Erradicar, Promover).',
  },
  {
    id: 8,
    q: 'Quais são os 10 princípios que regem o Brasil nas Relações Internacionais (Art. 4º)?',
    a: '1) Independência nacional; 2) Prevalência dos direitos humanos; 3) Autodeterminação dos povos; 4) Não intervenção; 5) Igualdade entre os Estados; 6) Defesa da paz; 7) Solução pacífica dos conflitos; 8) Repúdio ao terrorismo e ao racismo; 9) Cooperação entre os povos para o progresso da humanidade; 10) Concessão de asilo político.',
  },
  {
    id: 9,
    q: 'O que determina o Parágrafo Único do Art. 4º sobre a América Latina?',
    a: 'O Brasil buscará a integração econômica, política, social e cultural dos povos da América Latina, visando à formação de uma comunidade latino-americana de nações.',
  },
  {
    id: 10,
    q: 'Qual é o resumo dos quatro artigos inaugurais da CF/88 (Arts. 1º ao 4º)?',
    a: '• Art. 1º → Fundamentos da República\n• Art. 2º → Poderes da União (Legislativo, Executivo e Judiciário)\n• Art. 3º → Objetivos fundamentais\n• Art. 4º → Princípios das relações internacionais',
  },
];

// Parte I (1 a 10) + Parte III — Interpretação e Aplicação (17 e 18)
export const direitoConstMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Qual dos itens abaixo é um fundamento da República Federativa do Brasil?',
    alternativas: [
      'Erradicar a pobreza',
      'Garantir o desenvolvimento nacional',
      'Cidadania',
      'Defesa da paz',
    ],
    correta: 2, // C
    explicacao: 'Gabarito: C (Cidadania). A cidadania é um dos cinco fundamentos previstos no art. 1º, II, da CF/88 (SO-CI-DI-VA-PLU). Erradicar a pobreza e garantir o desenvolvimento nacional são objetivos fundamentais (art. 3º); defesa da paz é princípio das relações internacionais (art. 4º).',
  },
  {
    id: 2,
    enunciado: '2. Qual mnemônico ajuda a lembrar dos fundamentos da República previstos no art. 1º?',
    alternativas: [
      'SO-CI-DI-VA-PLU',
      'LIMPE',
      'CF-88',
      'POD-3',
    ],
    correta: 0, // A
    explicacao: 'Gabarito: A (SO-CI-DI-VA-PLU). SOberania, CIdadania, DIgnidade da pessoa humana, VAlores sociais do trabalho e da livre iniciativa, PLUralismo político.',
  },
  {
    id: 3,
    enunciado: '3. Em qual artigo da Constituição Federal estão os fundamentos da República?',
    alternativas: [
      'Art. 1º',
      'Art. 2º',
      'Art. 3º',
      'Art. 4º',
    ],
    correta: 0, // A
    explicacao: 'Gabarito: A (Art. 1º). O art. 1º traz os fundamentos da República; o art. 2º trata dos Poderes da União; o art. 3º traz os objetivos fundamentais; e o art. 4º dispõe sobre as relações internacionais.',
  },
  {
    id: 4,
    enunciado: '4. Quais são os três Poderes da União previstos na Constituição?',
    alternativas: [
      'Executivo, Ministério Público e Polícia',
      'Legislativo, Executivo e Judiciário',
      'Judiciário, Senado e Prefeitura',
      'Legislativo, Polícia e Executivo',
    ],
    correta: 1, // B
    explicacao: 'Gabarito: B (Legislativo, Executivo e Judiciário). Conforme o art. 2º da CF/88: "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário."',
  },
  {
    id: 5,
    enunciado: '5. Segundo o art. 2º da Constituição Federal, os Poderes da União são:',
    alternativas: [
      'dependentes e subordinados',
      'independentes e harmônicos entre si',
      'hierárquicos e dependentes',
      'isolados e sem relação',
    ],
    correta: 1, // B
    explicacao: 'Gabarito: B (independentes e harmônicos entre si). Cada Poder exerce suas funções constitucionais sem subordinação hierárquica, mantendo equilíbrio e cooperação institucional.',
  },
  {
    id: 6,
    enunciado: '6. Qual alternativa apresenta um objetivo fundamental da República?',
    alternativas: [
      'Soberania',
      'Garantir o desenvolvimento nacional',
      'Pluralismo político',
      'Não intervenção',
    ],
    correta: 1, // B
    explicacao: 'Gabarito: B (Garantir o desenvolvimento nacional). É o objetivo fundamental do art. 3º, inciso II (inicia com verbo no infinitivo). Soberania e pluralismo político são fundamentos (art. 1º); não intervenção é princípio das relações internacionais (art. 4º).',
  },
  {
    id: 7,
    enunciado: '7. Construir uma sociedade livre, justa e solidária é:',
    alternativas: [
      'fundamento da República',
      'princípio internacional',
      'objetivo fundamental',
      'regra de processo civil',
    ],
    correta: 2, // C
    explicacao: 'Gabarito: C (objetivo fundamental). Trata-se do inciso I do art. 3º da CF/88: "construir uma sociedade livre, justa e solidária".',
  },
  {
    id: 8,
    enunciado: '8. O que significa pluralismo político?',
    alternativas: [
      'Existência de apenas um partido político',
      'Proibição de opiniões contrárias',
      'Reconhecimento da diversidade de ideias e posições políticas',
      'Poder concentrado em uma só autoridade',
    ],
    correta: 2, // C
    explicacao: 'Gabarito: C (Reconhecimento da diversidade de ideias e posições políticas). O pluralismo político (art. 1º, V) assegura o convívio democrático entre distintas visões políticas e ideológicas.',
  },
  {
    id: 9,
    enunciado: '9. A defesa da paz e a solução pacífica dos conflitos são princípios relacionados:',
    alternativas: [
      'à separação dos Poderes',
      'às relações internacionais',
      'apenas ao direito municipal',
      'ao orçamento público',
    ],
    correta: 1, // B
    explicacao: 'Gabarito: B (às relações internacionais). Tanto a defesa da paz (inciso VI) quanto a solução pacífica dos conflitos (inciso VII) estão previstas no art. 4º da CF/88.',
  },
  {
    id: 10,
    enunciado: '10. O artigo 4º da Constituição Federal trata:',
    alternativas: [
      'dos direitos trabalhistas',
      'das relações internacionais do Brasil',
      'dos impostos municipais',
      'dos crimes militares',
    ],
    correta: 1, // B
    explicacao: 'Gabarito: B (das relações internacionais do Brasil). O art. 4º elenca os dez princípios que regem a República Federativa do Brasil nas suas relações internacionais, além do parágrafo único sobre integração latino-americana.',
  },
  {
    id: 17,
    textoApoio: 'Um cidadão afirma que diferentes grupos políticos devem poder expressar suas ideias dentro da lei.',
    enunciado: '17. Essa afirmação está diretamente relacionada ao fundamento constitucional chamado:',
    alternativas: [
      'Soberania',
      'Pluralismo político',
      'Desenvolvimento nacional',
      'Não intervenção',
    ],
    correta: 1, // B
    explicacao: 'Gabarito: B (Pluralismo político). O reconhecimento de que diferentes grupos e correntes políticas podem manifestar suas ideias no espaço democrático expressa diretamente o fundamento do pluralismo político (art. 1º, V).',
  },
  {
    id: 18,
    textoApoio: 'O Estado desenvolve ações para ampliar a justiça social e fortalecer a solidariedade na sociedade.',
    enunciado: '18. Essa ação está ligada principalmente ao:',
    alternativas: [
      'Artigo 1º',
      'Artigo 2º',
      'Artigo 3º',
      'Artigo 4º',
    ],
    correta: 2, // C
    explicacao: 'Gabarito: C (Artigo 3º). Construir uma sociedade livre, justa e solidária e reduzir as desigualdades sociais são objetivos fundamentais da República previstos no art. 3º da CF/88.',
  },
];

// Parte II — Verdadeiro ou Falso (11 a 16)
export const direitoConstTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A soberania é um dos fundamentos da República Federativa do Brasil.',
    correta: true,
    explicacao: 'Gabarito: V (Verdadeiro). A soberania é o primeiro fundamento listado no art. 1º, inciso I, da Constituição Federal.',
  },
  {
    id: 12,
    enunciado: '12. Garantir o desenvolvimento nacional é um fundamento previsto no art. 1º da Constituição.',
    correta: false,
    explicacao: 'Gabarito: F (Falso). Garantir o desenvolvimento nacional é um OBJETIVO FUNDAMENTAL previsto no art. 3º, inciso II, da CF/88, e não um fundamento do art. 1º.',
  },
  {
    id: 13,
    enunciado: '13. O Poder Judiciário é um dos três Poderes da União.',
    correta: true,
    explicacao: 'Gabarito: V (Verdadeiro). Conforme o art. 2º da CF/88, os três Poderes da União são o Legislativo, o Executivo e o Judiciário.',
  },
  {
    id: 14,
    enunciado: '14. Os Poderes da União devem atuar de forma independente e harmônica.',
    correta: true,
    explicacao: 'Gabarito: V (Verdadeiro). Literalidade do art. 2º da Constituição Federal: "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário."',
  },
  {
    id: 15,
    enunciado: '15. Promover o bem de todos, sem preconceitos, é um objetivo fundamental da República.',
    correta: true,
    explicacao: 'Gabarito: V (Verdadeiro). Trata-se do inciso IV do art. 3º da CF/88: promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.',
  },
  {
    id: 16,
    enunciado: '16. A não intervenção é um princípio que orienta as relações internacionais do Brasil.',
    correta: true,
    explicacao: 'Gabarito: V (Verdadeiro). A não intervenção consta expressamente no art. 4º, inciso IV, da Constituição Federal.',
  },
];

// Parte IV — Questões Dissertativas (19 e 20)
export const direitoConstDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 19,
    enunciado: '19. Explique a diferença entre fundamentos da República e objetivos fundamentais, citando dois exemplos de cada.',
    respostaEsperada: 'Os fundamentos da República (art. 1º da CF/88) representam os pilares essenciais que sustentam o Estado brasileiro (em regra expressos por substantivos), como a soberania e a dignidade da pessoa humana (ou cidadania, valores sociais do trabalho e da livre iniciativa e pluralismo político). Já os objetivos fundamentais (art. 3º da CF/88) são as metas e finalidades que o Estado deve buscar alcançar (expressos por verbos no infinitivo), como construir uma sociedade livre, justa e solidária e garantir o desenvolvimento nacional (ou erradicar a pobreza e a marginalização e promover o bem de todos sem preconceitos).',
  },
  {
    id: 20,
    enunciado: '20. Explique por que a independência e a harmonia entre os Poderes são importantes para o funcionamento do Estado Democrático de Direito.',
    respostaEsperada: 'A independência impede que o poder fique concentrado em um único órgão, evitando abusos e garantindo que Legislativo, Executivo e Judiciário desempenhem suas atribuições constitucionais com autonomia. A harmonia assegura cooperação, equilíbrio e respeito mútuo entre os Poderes (sistema de freios e contrapesos), permitindo que as instituições funcionem de maneira estável para proteger a Constituição, as leis e os direitos dos cidadãos no Estado Democrático de Direito.',
  },
];

export const direitoConstSummaryPoints = [
  'O que é Direito Constitucional: Ramo do Direito Público que estuda a Constituição Federal (CF/88), lei fundamental e suprema do Brasil que organiza o Estado, os Poderes, os direitos fundamentais e os princípios da República.',
  'Art. 1º — Fundamentos da República (SO-CI-DI-VA-PLU): Soberania, Cidadania, Dignidade da pessoa humana, Valores sociais do trabalho e da livre iniciativa e Pluralismo político.',
  'Art. 2º — Separação dos Poderes: Legislativo (elabora leis e fiscaliza), Executivo (administra o Estado e executa leis) e Judiciário (exerce função jurisdicional, solucionando conflitos), independentes e harmônicos entre si.',
  'Art. 3º — Objetivos Fundamentais: Construir sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar pobreza/marginalização e reduzir desigualdades sociais/regionais; promover o bem de todos sem preconceitos.',
  'Diferença para provas: Fundamentos (art. 1º) são os pilares do Estado; Objetivos fundamentais (art. 3º) são as metas iniciadas por verbos que o Estado busca alcançar.',
  'Art. 4º — Relações Internacionais: 10 princípios (Independência nacional, Prevalência dos direitos humanos, Autodeterminação dos povos, Não intervenção, Igualdade entre os Estados, Defesa da paz, Solução pacífica dos conflitos, Repúdio ao terrorismo e ao racismo, Cooperação entre os povos, Concessão de asilo político).',
  'Art. 4º, Parágrafo Único: O Brasil buscará a integração econômica, política, social e cultural dos povos da América Latina.',
  'Objetivo da Aula 01: Compreender a base constitucional do Estado brasileiro (Arts. 1º ao 4º da CF/88) e avançar para os 20 exercícios gabaritados.',
];

export const direitoConstVideoPracticalTask = {
  tema: 'Princípios Fundamentais da Constituição Federal — Arts. 1º ao 4º',
  disciplina: 'Direito Constitucional',
  modalidade: 'Fixação e Aplicação Prática — TJAM Assistente Judiciário',
  situacaoPratica: 'Durante o atendimento ou tramitação processual no Tribunal de Justiça do Amazonas, o servidor deve zelar pelo cumprimento da Constituição Federal de 1988, equilibrando os fundamentos da República, os limites entre os Poderes e os objetivos fundamentais.',
  perguntas: [
    '1. Liste os cinco fundamentos do Art. 1º usando o mnemônico SO-CI-DI-VA-PLU.',
    '2. Diferencie as funções típicas de Legislativo, Executivo e Judiciário no Art. 2º.',
    '3. Aponte os quatro objetivos fundamentais do Art. 3º e explique como se diferenciam dos fundamentos.',
    '4. Cite pelo menos cinco princípios do Art. 4º e a regra do parágrafo único sobre a América Latina.',
  ],
  desafioFinal: 'Responder às 20 questões da Aula 01 sem consultar o gabarito e revisar os pontos de dúvida diretamente no texto constitucional (arts. 1º a 4º).',
  entrega: 'Copie suas 20 respostas ao final da aba Questões para enviar e acompanhar seu desempenho (0 a 10).',
};
