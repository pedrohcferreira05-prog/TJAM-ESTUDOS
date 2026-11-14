// Data for Aula 1 — Língua Inglesa
// Preparatório TJAM — Assistente Judiciário
// Nível intermediário • Aula 01 • Tema: Reading Comprehension — Interpretação de Textos em Inglês

export interface FlashcardItem {
  id: number;
  q: string;
  a: string;
  frente: string;
  verso: string;
  categoria: string;
  dica?: string;
  pronuncia?: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  textoApoio?: string;
  opcoes: string[];
  alternativas?: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D
  explicacao: string;
}

export interface TfQuestionItem {
  id: number;
  enunciado: string;
  correta: boolean;
  explicacao: string;
}

export interface DiscursiveQuestionItem {
  id: number;
  titulo: string;
  enunciado: string;
  respostaEsperada: string;
  espelhoCorrecao: string[];
  pontosChave: string[];
}

export interface ReadingStrategyItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  example: string;
}

export interface VocabItem {
  en: string;
  pt: string;
}

export const inglesReadingStrategies: ReadingStrategyItem[] = [
  {
    id: 1,
    title: '1. Skimming — Leitura rápida',
    subtitle: 'Identificar o assunto principal',
    description:
      'Consiste em ler rapidamente o texto (título, primeiras linhas e palavras-chave) para identificar o tema central sem se prender a cada palavra.',
    example:
      'Exemplo: ao ler um texto sobre courts (tribunais), você tenta descobrir se o assunto é Justiça, legislação ou direitos.',
  },
  {
    id: 2,
    title: '2. Scanning — Busca de informações',
    subtitle: 'Localizar dados pontuais',
    description:
      'Consiste em procurar uma informação específica diretamente no texto, sem precisar traduzir todo o parágrafo.',
    example: 'Exemplo: procurar uma data, nome, número ou local citado no enunciado.',
  },
  {
    id: 3,
    title: '3. Reading for detail — Leitura detalhada',
    subtitle: 'Compreensão profunda e inferência',
    description:
      'Consiste em ler com atenção para compreender informações específicas, relações entre frases, argumentos e conclusões.',
    example:
      'Exemplo: identificar a quem um pronome (como "They") se refere ou qual obrigação foi atribuída aos servidores públicos.',
  },
];

export const inglesLegalVocabData: VocabItem[] = [
  { en: 'Court', pt: 'Tribunal' },
  { en: 'Judge', pt: 'Juiz' },
  { en: 'Law', pt: 'Lei' },
  { en: 'Justice', pt: 'Justiça' },
  { en: 'Rights', pt: 'Direitos' },
  { en: 'Duties', pt: 'Deveres' },
  { en: 'Citizen', pt: 'Cidadão' },
  { en: 'Government', pt: 'Governo' },
  { en: 'Public service', pt: 'Serviço público' },
  { en: 'Employee', pt: 'Funcionário' },
  { en: 'Law enforcement', pt: 'Aplicação da lei' },
  { en: 'Legal system', pt: 'Sistema jurídico' },
  { en: 'Hearing', pt: 'Audiência' },
  { en: 'Decision', pt: 'Decisão' },
  { en: 'Justice system', pt: 'Sistema de Justiça' },
];

export const inglesPronounsAndWhData: VocabItem[] = [
  { en: 'Who', pt: 'Quem' },
  { en: 'What', pt: 'O quê / Qual' },
  { en: 'Where', pt: 'Onde' },
  { en: 'When', pt: 'Quando' },
  { en: 'Why', pt: 'Por quê' },
  { en: 'How', pt: 'Como' },
  { en: 'Which', pt: 'Qual' },
  { en: 'They', pt: 'Eles / Elas' },
  { en: 'Their', pt: 'Deles / Delas' },
  { en: 'We', pt: 'Nós' },
  { en: 'It', pt: 'Ele / Ela (coisas e animais)' },
];

export const inglesReadingTextData = {
  title: 'The Importance of Justice',
  level: 'Texto em inglês — nível intermediário',
  paragraphsEn: [
    "Justice is essential for a fair and organized society. Courts play an important role in protecting citizens' rights and ensuring that laws are respected.",
    'Judges analyze cases, examine evidence and make decisions according to the law.',
    'Public employees also have an important responsibility. They must work with honesty, respect and efficiency to provide good services to the population.',
  ],
  vocabulary: [
    { en: 'Fair', pt: 'justo' },
    { en: 'Society', pt: 'sociedade' },
    { en: 'Protecting', pt: 'protegendo' },
    { en: 'Evidence', pt: 'provas' },
    { en: 'According to', pt: 'de acordo com' },
    { en: 'Honesty', pt: 'honestidade' },
    { en: 'Efficiency', pt: 'eficiência' },
  ] as VocabItem[],
  paragraphsPt: [
    'A Justiça é essencial para uma sociedade justa e organizada. Os tribunais desempenham um papel importante na proteção dos direitos dos cidadãos e na garantia de que as leis sejam respeitadas.',
    'Os juízes analisam processos, examinam provas e tomam decisões de acordo com a lei.',
    'Os servidores públicos também têm uma responsabilidade importante. Eles devem trabalhar com honestidade, respeito e eficiência para prestar bons serviços à população.',
  ],
};

export const inglesReviewVocabData: VocabItem[] = [
  { en: 'Court', pt: 'Tribunal' },
  { en: 'Judge', pt: 'Juiz' },
  { en: 'Law', pt: 'Lei' },
  { en: 'Rights', pt: 'Direitos' },
  { en: 'Duties', pt: 'Deveres' },
  { en: 'Evidence', pt: 'Provas' },
  { en: 'Citizen', pt: 'Cidadão' },
  { en: 'Justice', pt: 'Justiça' },
];

export const inglesFlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'O que é a técnica de leitura Skimming?',
    a: 'Leitura rápida do texto para identificar o assunto principal (ideia central), sem se deter em cada palavra.',
    frente: 'Skimming (Leitura rápida)',
    verso: 'Leitura rápida para captar a ideia central / assunto principal do texto.',
    categoria: 'Estratégias de Leitura',
    dica: 'Ex.: perceber rapidamente que o texto trata de courts (tribunais), Justiça ou legislação.',
  },
  {
    id: 2,
    q: 'O que é a técnica de leitura Scanning?',
    a: 'Busca direta por uma informação específica (data, nome, número ou local), sem precisar traduzir o texto inteiro.',
    frente: 'Scanning (Busca específica)',
    verso: 'Varrer o texto procurando dados pontuais (datas, nomes, números, locais).',
    categoria: 'Estratégias de Leitura',
    dica: 'Muito útil quando o enunciado pergunta "Who", "When" ou "Where".',
  },
  {
    id: 3,
    q: 'Para que serve a estratégia Reading for detail?',
    a: 'Leitura detalhada e atenta para compreender informações específicas, argumentos, referências pronominais e conclusões.',
    frente: 'Reading for detail',
    verso: 'Leitura atenta para captar detalhes, argumentos, referentes e conclusões.',
    categoria: 'Estratégias de Leitura',
    dica: 'Indispensável para questões de referência (ex.: a quem "They" se refere).',
  },
  {
    id: 4,
    q: 'Qual o significado de "Court", "Judge", "Law" e "Justice"?',
    a: 'Court = Tribunal | Judge = Juiz | Law = Lei | Justice = Justiça.',
    frente: 'Court / Judge / Law / Justice',
    verso: 'Tribunal / Juiz / Lei / Justiça.',
    categoria: 'Vocabulário Jurídico TJAM',
    dica: 'Base lexical mais frequente em textos institucionais do Judiciário.',
  },
  {
    id: 5,
    q: 'O que significam "Rights", "Duties", "Hearing" e "Decision"?',
    a: 'Rights = Direitos | Duties = Deveres | Hearing = Audiência | Decision = Decisão.',
    frente: 'Rights / Duties / Hearing / Decision',
    verso: 'Direitos / Deveres / Audiência / Decisão.',
    categoria: 'Vocabulário Jurídico TJAM',
    dica: 'Atenção: "Hearing" no contexto jurídico significa audiência (e não apenas audição).',
  },
  {
    id: 6,
    q: 'O que significam "Citizen", "Employee", "Public service" e "Law enforcement"?',
    a: 'Citizen = Cidadão | Employee = Funcionário | Public service = Serviço público | Law enforcement = Aplicação da lei.',
    frente: 'Citizen / Employee / Public service / Law enforcement',
    verso: 'Cidadão / Funcionário / Serviço público / Aplicação da lei.',
    categoria: 'Vocabulário Administrativo',
    dica: 'No texto "The Importance of Justice", "Public employees" equivale a servidores públicos.',
  },
  {
    id: 7,
    q: 'Para que servem as palavras interrogativas Who, What, Where, When, Why, How e Which?',
    a: 'Who (Quem), What (O quê/Qual), Where (Onde), When (Quando), Why (Por quê), How (Como) e Which (Qual). Elas indicam exatamente o tipo de informação pedida pela questão.',
    frente: 'Palavras Interrogativas (Wh- Words)',
    verso: 'Who (quem), What (o quê/qual), Where (onde), When (quando), Why (por quê), How (como), Which (qual).',
    categoria: 'Interpretação de Questões',
    dica: 'Identificar a Wh- word no enunciado direciona o Scanning imediatamente.',
  },
  {
    id: 8,
    q: 'Qual a diferença entre "They", "Their", "We" e "It"?',
    a: 'They = Eles / Elas | Their = Deles / Delas | We = Nós | It = Ele / Ela (para coisas e animais).',
    frente: 'Pronomes: They / Their / We / It',
    verso: 'They (eles/elas), Their (deles/delas), We (nós), It (ele/ela - coisas e animais).',
    categoria: 'Referência Pronominal',
    dica: 'Provas de interpretação frequentemente perguntam a qual termo anterior "They" ou "Their" se refere.',
  },
  {
    id: 9,
    q: 'O que significam "Fair", "Evidence" e "According to" no texto "The Importance of Justice"?',
    a: 'Fair = justo | Evidence = provas | According to = de acordo com.',
    frente: 'Fair / Evidence / According to',
    verso: 'Justo / Provas / De acordo com.',
    categoria: 'Vocabulário do Texto',
    dica: '"According to the law" = de acordo com a lei; "examine evidence" = examinam provas.',
  },
  {
    id: 10,
    q: 'O que significam "Society", "Protecting", "Honesty" e "Efficiency"?',
    a: 'Society = sociedade | Protecting = protegendo | Honesty = honestidade | Efficiency = eficiência.',
    frente: 'Society / Protecting / Honesty / Efficiency',
    verso: 'Sociedade / Protegendo / Honestidade / Eficiência.',
    categoria: 'Vocabulário do Texto',
    dica: 'Palavras cognatas ou próximas do português que aceleram o Skimming.',
  },
];

// 6 Questões Rápidas do Texto "The Importance of Justice" — Seção 5 do Texto da Aula
export const inglesTextFixationQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. What is essential for a fair and organized society?',
    opcoes: ['Education', 'Justice', 'Technology', 'Economy'],
    alternativas: ['Education', 'Justice', 'Technology', 'Economy'],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) Justice. A primeira frase do texto afirma textualmente: "Justice is essential for a fair and organized society."',
  },
  {
    id: 2,
    enunciado: '2. What do courts protect?',
    opcoes: ['Companies', 'Governments', "Citizens' rights", 'Private businesses'],
    alternativas: ['Companies', 'Governments', "Citizens' rights", 'Private businesses'],
    correta: 2, // C
    explicacao:
      '✅ Gabarito: C) Citizens\' rights. O texto declara: "Courts play an important role in protecting citizens\' rights and ensuring that laws are respected."',
  },
  {
    id: 3,
    enunciado: '3. What do judges examine?',
    opcoes: ['Employees', 'Evidence', 'Buildings', 'Documents only'],
    alternativas: ['Employees', 'Evidence', 'Buildings', 'Documents only'],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) Evidence. No segundo parágrafo: "Judges analyze cases, examine evidence and make decisions according to the law." (Evidence = provas).',
  },
  {
    id: 4,
    enunciado: "4. The word 'Honesty' means:",
    opcoes: ['Honestidade', 'Eficiência', 'Responsabilidade', 'Liberdade'],
    alternativas: ['Honestidade', 'Eficiência', 'Responsabilidade', 'Liberdade'],
    correta: 0, // A
    explicacao:
      '✅ Gabarito: A) Honestidade. No vocabulário do texto e no terceiro parágrafo: "honesty" = honestidade, "efficiency" = eficiência.',
  },
  {
    id: 5,
    enunciado: '5. According to the text, public employees must work with:',
    opcoes: [
      'Speed only',
      'Honesty, respect and efficiency',
      'Money and power',
      'Personal interests',
    ],
    alternativas: [
      'Speed only',
      'Honesty, respect and efficiency',
      'Money and power',
      'Personal interests',
    ],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) Honesty, respect and efficiency. O terceiro parágrafo afirma: "They must work with honesty, respect and efficiency to provide good services to the population."',
  },
  {
    id: 6,
    enunciado: "6. The word 'They' in the last paragraph refers to:",
    opcoes: ['Judges', 'Citizens', 'Public employees', 'Courts'],
    alternativas: ['Judges', 'Citizens', 'Public employees', 'Courts'],
    correta: 2, // C
    explicacao:
      '✅ Gabarito: C) Public employees. No último parágrafo: "Public employees also have an important responsibility. They must work with honesty..." — "They" retoma o sujeito da frase anterior ("Public employees").',
  },
];

// Exercícios — Aula 1 de Inglês (20 Questões: Parte I 1-8, Parte II 9-14 V/F, Parte III 15-17 Interpretação, Parte IV 18-20 Dissertativas)
export const inglesMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A palavra Justice significa:',
    opcoes: ['Liberdade', 'Justiça', 'Igualdade', 'Segurança'],
    alternativas: ['Liberdade', 'Justiça', 'Igualdade', 'Segurança'],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) Justiça. No vocabulário jurídico da aula: Justice = Justiça.',
  },
  {
    id: 2,
    enunciado: '2. A palavra Court significa:',
    opcoes: ['Tribunal', 'Escola', 'Empresa', 'Governo'],
    alternativas: ['Tribunal', 'Escola', 'Empresa', 'Governo'],
    correta: 0, // A
    explicacao:
      '✅ Gabarito: A) Tribunal. Em textos jurídicos e institucionais do TJAM, Court equivale a Tribunal / Corte.',
  },
  {
    id: 3,
    enunciado: '3. Qual alternativa apresenta o significado correto de Judge?',
    opcoes: ['Advogado', 'Servidor', 'Juiz', 'Cidadão'],
    alternativas: ['Advogado', 'Servidor', 'Juiz', 'Cidadão'],
    correta: 2, // C
    explicacao:
      '✅ Gabarito: C) Juiz. Judge = Juiz (Advogado = Lawyer; Servidor/Funcionário = Employee/Public servant; Cidadão = Citizen).',
  },
  {
    id: 4,
    enunciado: '4. A expressão Public Service significa:',
    opcoes: ['Serviço privado', 'Serviço público', 'Serviço judicial', 'Serviço comercial'],
    alternativas: ['Serviço privado', 'Serviço público', 'Serviço judicial', 'Serviço comercial'],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) Serviço público. Public service refere-se aos serviços prestados à população pelo Estado/Administração Pública.',
  },
  {
    id: 5,
    enunciado: '5. Qual é a tradução de Rights?',
    opcoes: ['Deveres', 'Leis', 'Direitos', 'Decisões'],
    alternativas: ['Deveres', 'Leis', 'Direitos', 'Decisões'],
    correta: 2, // C
    explicacao:
      '✅ Gabarito: C) Direitos. Rights = Direitos (enquanto Duties = Deveres, Law = Lei e Decisions = Decisões).',
  },
  {
    id: 6,
    enunciado: '6. A palavra interrogativa Where é utilizada para perguntar:',
    opcoes: ['Quem', 'Quando', 'Onde', 'Por quê'],
    alternativas: ['Quem', 'Quando', 'Onde', 'Por quê'],
    correta: 2, // C
    explicacao:
      '✅ Gabarito: C) Onde. Where = Onde (Who = Quem; When = Quando; Why = Por quê).',
  },
  {
    id: 7,
    enunciado: '7. O que significa According to the law?',
    opcoes: ['Contra a lei', 'De acordo com a lei', 'Antes da lei', 'Sem a lei'],
    alternativas: ['Contra a lei', 'De acordo com a lei', 'Antes da lei', 'Sem a lei'],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) De acordo com a lei. A locução prepositiva "According to" significa "de acordo com / segundo".',
  },
  {
    id: 8,
    enunciado: '8. Qual técnica de leitura consiste em procurar informações específicas em um texto?',
    opcoes: ['Skimming', 'Scanning', 'Translation', 'Writing'],
    alternativas: ['Skimming', 'Scanning', 'Translation', 'Writing'],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) Scanning. Scanning é a busca direcionada por dados específicos (datas, nomes, números ou locais), enquanto Skimming busca o assunto geral.',
  },
  {
    id: 15,
    textoApoio:
      "Public employees play an important role in society. They must respect the law, protect citizens' rights and provide efficient services. Honesty and responsibility are essential qualities for people who work in public administration.",
    enunciado: '15. (Parte III — Interpretação de texto) Qual é o assunto principal do texto?',
    opcoes: [
      'O funcionamento das empresas privadas.',
      'A importância dos servidores públicos na sociedade.',
      'O sistema educacional.',
      'A economia internacional.',
    ],
    alternativas: [
      'O funcionamento das empresas privadas.',
      'A importância dos servidores públicos na sociedade.',
      'O sistema educacional.',
      'A economia internacional.',
    ],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) A importância dos servidores públicos na sociedade. A primeira frase resume a ideia central: "Public employees play an important role in society."',
  },
  {
    id: 16,
    textoApoio:
      "Public employees play an important role in society. They must respect the law, protect citizens' rights and provide efficient services. Honesty and responsibility are essential qualities for people who work in public administration.",
    enunciado: '16. (Parte III — Interpretação de texto) Segundo o texto, os servidores públicos devem:',
    opcoes: [
      'Trabalhar apenas com interesses pessoais.',
      'Ignorar as leis.',
      'Respeitar a lei e proteger os direitos dos cidadãos.',
      'Evitar prestar serviços à população.',
    ],
    alternativas: [
      'Trabalhar apenas com interesses pessoais.',
      'Ignorar as leis.',
      'Respeitar a lei e proteger os direitos dos cidadãos.',
      'Evitar prestar serviços à população.',
    ],
    correta: 2, // C
    explicacao:
      '✅ Gabarito: C) Respeitar a lei e proteger os direitos dos cidadãos. O texto diz explicitamente: "They must respect the law, protect citizens\' rights and provide efficient services."',
  },
  {
    id: 17,
    textoApoio:
      "Public employees play an important role in society. They must respect the law, protect citizens' rights and provide efficient services. Honesty and responsibility are essential qualities for people who work in public administration.",
    enunciado: '17. (Parte III — Interpretação de texto) A palavra Essential significa:',
    opcoes: ['Desnecessário', 'Essencial', 'Difícil', 'Opcional'],
    alternativas: ['Desnecessário', 'Essencial', 'Difícil', 'Opcional'],
    correta: 1, // B
    explicacao:
      '✅ Gabarito: B) Essencial. "Essential" é um cognato transparente de "essencial" (honestidade e responsabilidade são qualidades essenciais).',
  },
];

export const inglesTfQuestionsData: TfQuestionItem[] = [
  {
    id: 9,
    enunciado: '9. A palavra Law significa lei.',
    correta: true, // V
    explicacao: '✅ Gabarito: Verdadeiro (V). No vocabulário jurídico: Law = Lei.',
  },
  {
    id: 10,
    enunciado: '10. A palavra Employee significa empregador.',
    correta: false, // F
    explicacao:
      '✅ Gabarito: Falso (F). "Employee" significa funcionário/empregado; quem emprega (empregador) é "Employer".',
  },
  {
    id: 11,
    enunciado: '11. Skimming é uma técnica de leitura rápida para identificar o assunto geral de um texto.',
    correta: true, // V
    explicacao:
      '✅ Gabarito: Verdadeiro (V). O Skimming consiste justamente em passar os olhos rapidamente para captar a ideia central.',
  },
  {
    id: 12,
    enunciado: '12. Scanning exige necessariamente a tradução de todas as palavras do texto.',
    correta: false, // F
    explicacao:
      '✅ Gabarito: Falso (F). O Scanning busca informações pontuais (datas, nomes, números, locais) sem precisar traduzir todo o texto.',
  },
  {
    id: 13,
    enunciado: '13. A palavra Honesty significa honestidade.',
    correta: true, // V
    explicacao: '✅ Gabarito: Verdadeiro (V). Honesty = honestidade.',
  },
  {
    id: 14,
    enunciado: '14. A palavra They pode significar eles ou elas.',
    correta: true, // V
    explicacao:
      '✅ Gabarito: Verdadeiro (V). Em inglês, o pronome pessoal "They" é neutro em gênero e equivale a eles ou elas.',
  },
];

export const inglesDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 18,
    titulo: 'Questão 18 — Skimming vs. Scanning',
    enunciado:
      '18. Explique a diferença entre Skimming e Scanning e apresente uma situação em que cada técnica pode ser utilizada.',
    respostaEsperada:
      'Skimming é a leitura rápida para identificar o assunto geral do texto. Scanning é a busca por uma informação específica, como uma data, nome ou número.',
    espelhoCorrecao: [
      'Definir Skimming como leitura rápida para captar o tema/assunto geral.',
      'Definir Scanning como busca direcionada por dados específicos sem ler/traduzir tudo.',
      'Apresentar ao menos um exemplo ou situação de uso para cada técnica (ex.: identificar o tema de uma notícia jurídica via Skimming; localizar uma data ou nome no texto via Scanning).',
    ],
    pontosChave: ['Skimming = ideia geral', 'Scanning = dado específico', 'Situação prática para cada'],
  },
  {
    id: 19,
    titulo: 'Questão 19 — Tradução Jurídica',
    enunciado:
      '19. Traduza para o português: "Judges analyze cases and make decisions according to the law."',
    respostaEsperada:
      '"Os juízes analisam os processos e tomam decisões de acordo com a lei."',
    espelhoCorrecao: [
      'Traduzir "Judges" por "Os juízes".',
      'Traduzir "analyze cases" por "analisam os processos / casos".',
      'Traduzir "make decisions according to the law" por "tomam decisões de acordo com a lei".',
    ],
    pontosChave: ['Os juízes', 'analisam os processos', 'tomam decisões', 'de acordo com a lei'],
  },
  {
    id: 20,
    titulo: 'Questão 20 — Importância da Interpretação em Concursos',
    enunciado:
      '20. Explique por que a interpretação de textos em inglês é importante para candidatos a concursos públicos.',
    respostaEsperada:
      'A interpretação permite compreender textos, identificar informações importantes e responder corretamente às questões, mesmo quando não conhecemos todas as palavras.',
    espelhoCorrecao: [
      'Destacar a compreensão global e identificação das informações relevantes do texto.',
      'Explicar que a interpretação permite acertar questões mesmo sem conhecer todo o vocabulário palavra por palavra.',
    ],
    pontosChave: ['Compreender textos', 'Identificar informações importantes', 'Resolver questões sem traduzir tudo'],
  },
];

export const inglesSummaryPoints: string[] = [
  'Estratégias de Leitura: Skimming (leitura rápida para captar o assunto principal), Scanning (busca de informações específicas como datas, nomes e locais) e Reading for detail (leitura detalhada de argumentos e conclusões).',
  'Vocabulário Jurídico e Administrativo: Court (Tribunal), Judge (Juiz), Law (Lei), Justice (Justiça), Rights (Direitos), Duties (Deveres), Citizen (Cidadão), Government (Governo), Public service (Serviço público), Employee (Funcionário), Law enforcement (Aplicação da lei), Legal system (Sistema jurídico), Hearing (Audiência), Decision (Decisão) e Justice system (Sistema de Justiça).',
  'Palavras Interrogativas (Wh- Words): Who (Quem), What (O quê/Qual), Where (Onde), When (Quando), Why (Por quê), How (Como) e Which (Qual) indicam o tipo de informação pedida pela questão.',
  'Pronomes de Referência: They (Eles/Elas), Their (Deles/Delas), We (Nós) e It (Ele/Ela para coisas e animais) são fundamentais para resolver questões de coesão referencial.',
  'Vocabulário-Chave do Texto "The Importance of Justice": Fair (justo), Society (sociedade), Protecting (protegendo), Evidence (provas), According to (de acordo com), Honesty (honestidade) e Efficiency (eficiência).',
  'Avaliação (20 Exercícios): Parte I (1-8 objetivas), Parte II (9-14 V/F), Parte III (15-17 interpretação de texto) e Parte IV (18-20 dissertativas), com critério de desempenho de 0 a 20 acertos.',
];

export const inglesVideoInfo = {
  title: 'Aula 1 — Língua Inglesa: Reading Comprehension (Interpretação de Textos em Inglês)',
  subtitle: 'Nível Intermediário • Preparatório TJAM — Assistente Judiciário',
  videoUrl: 'https://www.youtube.com/embed/0OKwcAaV_gQ?autoplay=0&rel=0',
  videoId: '0OKwcAaV_gQ',
  externalUrl: 'https://youtu.be/0OKwcAaV_gQ?si=Kxf6dd3cCimZryLO',
  duration: '45 min',
};
