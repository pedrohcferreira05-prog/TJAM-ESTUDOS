// Data for Processo Penal — Quarta Aula de Hoje: Aplicação da Lei Processual Penal (CPP)
// Preparatório TJAM — Assistente Judiciário

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes?: string[];
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
  enunciado: string;
  respostaEsperada: string;
}

export const procPenalLessonSummaryPoints: string[] = [
  'Lei processual penal nova → aplicação imediata (tempus regit actum - Art. 2º do CPP).',
  'Preservação dos atos anteriores: a lei nova rege os processos em curso sem invalidar os atos já praticados.',
  'Diferença entre Lei Processual Penal e Lei Penal: a lei penal rege o direito de punir (retroatividade benéfica); a lei puramente processual aplica-se imediatamente sem retroagir.',
  'Normas Mistas / Híbridas (materiais-processuais): se afetarem a liberdade ou a pretensão punitiva (ex: prescrição, decadência, queixa-crime), submetem-se ao princípio da anterioridade/irretroatividade in pejus.',
  'Lei processual penal no espaço: vigora o Princípio da Territorialidade (Art. 1º do CPP) no território brasileiro.',
  'Exceções à territorialidade: imunidades diplomáticas, tratados e convenções internacionais, jurisdição militar e foro por prerrogativa de função previsto na CF/88.',
  'Atos no exterior: cumprimento por meio de cartas rogatórias e mecanismos de cooperação jurídica internacional.',
  'Interpretação literal/gramatical: ponto de partida semântico do texto da norma.',
  'Interpretação sistemática: análise da norma em harmonia com todo o ordenamento jurídico e a CF/88.',
  'Interpretação extensiva (Art. 3º do CPP): o legislador disse menos do que pretendia (minus dixit quam voluit); amplia-se o alcance textual.',
  'Analogia (Art. 3º do CPP): integração de lacuna jurídica; aplica-se norma prevista para caso semelhante na ausência de lei expressa.',
  'Distinção crucial: a interpretação extensiva extrai o sentido de norma existente; a analogia supre a falta/omissão da lei.',
  'Fontes do Processo Penal: Constituição Federal (ápice axiológico), Leis formais, Tratados e Convenções internacionais (Pacto de San José), Princípios e Jurisprudência.'
];

export const procPenalFlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é a regra geral de aplicação da lei processual penal no tempo?',
    a: 'A lei processual penal aplica-se desde logo (imediatamente), sem prejuízo da validade dos atos realizados sob a vigência da lei anterior (princípio "tempus regit actum", Art. 2º do CPP).'
  },
  {
    q: 'Uma nova lei processual penal anula os atos já praticados sob a lei antiga?',
    a: 'NÃO! Os atos já praticados continuam plenamente válidos e eficazes. A nova lei incide apenas sobre os atos processuais futuros que serão praticados a partir de sua vigência.'
  },
  {
    q: 'Qual é a diferença essencial entre a eficácia temporal da lei penal e da lei processual penal?',
    a: 'A Lei Penal regula crimes e penas, aplicando-se o princípio da irretroatividade da lei mais gravosa e a retroatividade da mais benéfica (Art. 5º, XL, CF). Já a Lei Processual Penal pura rege-se pelo princípio da aplicação imediata (tempus regit actum), independentemente de ser mais ou menos benéfica.'
  },
  {
    q: 'O que são normas processuais penais mistas (ou heterogêneas/híbridas)?',
    a: 'São normas com conteúdo tanto processual quanto penal material (ex.: regras sobre decadência, perempção, renúncia, queixa-crime, transação penal). Por atingirem o direito de liberdade e a pretensão punitiva, seguem a regra penal: retroagem se benéficas, mas não retroagem se prejudiciais ao réu.'
  },
  {
    q: 'Qual é o princípio que rege a aplicação da lei processual penal no espaço?',
    a: 'É o Princípio da Territorialidade (Art. 1º do CPP): a lei processual brasileira aplica-se em todo o território nacional, sem prejuízo de tratados, convenções e regras de direito internacional.'
  },
  {
    q: 'Como são realizados os atos processuais penais que dependem de execução no exterior?',
    a: 'Por meio de cooperação jurídica internacional e expedição de cartas rogatórias às autoridades estrangeiras, observados os tratados bilaterais/multilaterais de assistência mútua.'
  },
  {
    q: 'O Código de Processo Penal admite interpretação extensiva e aplicação analógica?',
    a: 'SIM! O Artigo 3º do CPP dispõe expressamente que a lei processual penal admitirá interpretação extensiva e aplicação analógica, bem como o suplemento dos princípios gerais de direito.'
  },
  {
    q: 'Qual a diferença técnica entre Interpretação Extensiva e Analogia no Processo Penal?',
    a: 'Na INTERPRETAÇÃO EXTENSIVA, existe norma, mas seu texto é acanhado; o intérprete apenas amplia o alcance do texto para coincidir com a real vontade da lei (a lei disse menos do que queria). Na ANALOGIA, NÃO existe norma; há uma lacuna legal, que o aplicador preenche aplicando a norma de um caso semelhante.'
  },
  {
    q: 'O que é a interpretação sistemática no Processo Penal?',
    a: 'É o método interpretativo que analisa o dispositivo legal em conjunto e harmonia com as demais normas do ordenamento jurídico e, primordialmente, com a Constituição Federal de 1988.'
  },
  {
    q: 'Quais são as principais fontes do Direito Processual Penal?',
    a: '1) Constituição Federal (fonte primária e ápice); 2) Leis formais (CPP e leis especiais); 3) Tratados e Convenções Internacionais de Direitos Humanos (ex: Pacto de San José); 4) Princípios Gerais de Direito; 5) Jurisprudência dos Tribunais Superiores (STF/STJ) e Doutrina.'
  }
];

export const procPenalMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. De acordo com o CPP, a lei processual penal aplica-se:',
    opcoes: [
      'A) Somente aos processos iniciados após sua vigência',
      'B) Desde logo, sem prejuízo da validade dos atos realizados sob a vigência da lei anterior',
      'C) Somente após decisão judicial',
      'D) Apenas aos processos criminais federais'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Conforme o Artigo 2º do Código de Processo Penal: "A lei processual penal aplicar-se-á desde logo, sem prejuízo da validade dos atos realizados sob a vigência da lei anterior". Trata-se do princípio da aplicação imediata (tempus regit actum).'
  },
  {
    id: 2,
    enunciado: '2. Uma nova lei processual penal entrou em vigor durante um processo que já estava em andamento. Em regra:',
    opcoes: [
      'A) O processo inteiro deve ser reiniciado',
      'B) A lei anterior continua sendo aplicada até o fim do processo',
      'C) A nova lei aplica-se imediatamente, preservando-se os atos já realizados',
      'D) A nova lei somente será aplicada se beneficiar o réu'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Pela regra do tempus regit actum (Art. 2º do CPP), a nova lei tem aplicação imediata nos processos em andamento, não retroagindo para desconstituir atos válidos praticados sob a vigência da lei anterior nem exigindo reinício do processo.'
  },
  {
    id: 3,
    enunciado: '3. A regra da aplicação imediata da lei processual penal significa que:',
    opcoes: [
      'A) A lei nova invalida todos os atos anteriores',
      'B) A lei nova passa a reger os atos processuais praticados após sua entrada em vigor',
      'C) A lei nova só vale para crimes futuros',
      'D) A lei nova nunca pode alcançar processos em andamento'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: A aplicação imediata impõe que a lei nova governe todos os atos processuais praticados a partir de sua vigência, mesmo que em processos já pendentes e relativos a fatos criminosos ocorridos no passado.'
  },
  {
    id: 4,
    enunciado: '4. Quanto à validade dos atos processuais praticados sob a lei anterior:',
    opcoes: [
      'A) São automaticamente anulados',
      'B) Permanecem válidos, em regra',
      'C) Devem ser repetidos obrigatoriamente',
      'D) Dependem de autorização do Ministério Público'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Os atos regularmente praticados sob a vigência da lei processual anterior são atos jurídicos perfeitos e permanecem plenamente válidos e eficazes no processo.'
  },
  {
    id: 5,
    enunciado: '5. A aplicação da lei processual penal no tempo é disciplinada, principalmente, pelo princípio:',
    opcoes: [
      'A) Da retroatividade ilimitada',
      'B) Da aplicação imediata',
      'C) Da anterioridade penal',
      'D) Da irretroatividade absoluta'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O princípio central e fundamental da eficácia temporal da lei processual penal é o princípio da aplicação imediata (tempus regit actum).'
  },
  {
    id: 6,
    enunciado: '6. A lei processual penal brasileira aplica-se, como regra:',
    opcoes: [
      'A) Em todo o mundo',
      'B) No território brasileiro, observadas as hipóteses legais de extraterritorialidade ou cooperação',
      'C) Somente nos Estados da Federação',
      'D) Apenas dentro dos tribunais'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O Art. 1º do CPP prevê que o processo penal reger-se-á, em todo o território brasileiro, por este Código, ressalvadas as hipóteses previstas em tratados, convenções e regras de cooperação internacional.'
  },
  {
    id: 7,
    enunciado: '7. Sobre a lei processual penal e a lei penal, é correto afirmar:',
    opcoes: [
      'A) Ambas possuem exatamente as mesmas regras de aplicação no tempo',
      'B) A lei processual penal possui regra própria de aplicação imediata',
      'C) A lei penal sempre possui aplicação imediata aos fatos anteriores',
      'D) A lei processual penal nunca se aplica a processos em andamento'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: A lei processual penal possui disciplina temporal própria (Art. 2º do CPP, tempus regit actum, incidência imediata), distinguindo-se da lei penal material, cuja eficácia é regida pela anterioridade e pela retroatividade restrita à benesse do réu (Art. 5º, XL, CF).'
  },
  {
    id: 8,
    enunciado: '8. A lei penal mais benéfica:',
    opcoes: [
      'A) Pode retroagir, conforme a Constituição e a legislação penal',
      'B) Nunca retroage',
      'C) Só retroage mediante autorização judicial',
      'D) É sempre aplicada apenas aos crimes futuros'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: Nos termos do Artigo 5º, XL da Constituição Federal de 1988 e do Artigo 2º do Código Penal, "a lei penal não retroagirá, salvo para beneficiar o réu".'
  },
  {
    id: 9,
    enunciado: '9. A aplicação imediata da lei processual penal:',
    opcoes: [
      'A) Confunde-se com retroatividade da lei penal mais benéfica',
      'B) É regra própria da legislação processual penal',
      'C) Só existe quando favorecer o acusado',
      'D) Não existe no ordenamento brasileiro'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: A aplicação imediata é regra específica do processo penal (Art. 2º do CPP). Não se confunde com a retroatividade da lex mitior penal, aplicando-se desde logo aos atos processuais vindouros.'
  },
  {
    id: 10,
    enunciado: '10. A interpretação extensiva ocorre quando:',
    opcoes: [
      'A) O intérprete amplia o alcance da norma para alcançar situações compreendidas em seu sentido',
      'B) O juiz cria livremente uma nova lei',
      'C) A norma é sempre aplicada contra o acusado',
      'D) O processo é encerrado sem julgamento'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: A interpretação extensiva ocorre quando a fórmula literal da lei disse menos do que pretendia dizer (minus dixit quam voluit); o intérprete alarga o significado das palavras para harmonizá-lo com o real espírito e alcance da norma.'
  },
  {
    id: 11,
    enunciado: '11. Analogia significa:',
    opcoes: [
      'A) Aplicar uma norma existente a uma situação semelhante não expressamente prevista, quando juridicamente cabível',
      'B) Revogar uma lei',
      'C) Criar uma pena sem previsão legal',
      'D) Ignorar a legislação vigente'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: A analogia é um método de integração jurídica (preenchimento de lacunas). Diante da ausência de norma específica para o caso concreto, aplica-se norma reguladora de hipótese similar onde haja a mesma razão de direito (ubi eadem ratio, ibi eadem legis dispositio).'
  },
  {
    id: 12,
    enunciado: '12. A analogia no processo penal:',
    opcoes: [
      'A) É absolutamente proibida em qualquer situação',
      'B) Pode ser utilizada para suprir lacunas, desde que respeitados os limites legais e constitucionais',
      'C) Sempre pode criar crimes e penas',
      'D) Pode afastar qualquer garantia constitucional'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O Artigo 3º do CPP autoriza expressamente a aplicação analógica para colmatar lacunas da legislação processual, respeitando-se as garantias fundamentais e vedações constitucionais.'
  },
  {
    id: 13,
    enunciado: '13. Assinale a alternativa correta:',
    opcoes: [
      'A) Interpretação extensiva e analogia são exatamente a mesma coisa',
      'B) A interpretação extensiva amplia o sentido de uma norma existente; a analogia utiliza norma semelhante para suprir uma lacuna',
      'C) A analogia cria qualquer regra desejada pelo juiz',
      'D) A interpretação extensiva somente existe no Direito Civil'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Excelente distinção cobrada no TJAM! Na interpretação extensiva há norma aplicável (embora expressa de forma restrita); na analogia não há norma para o caso, usando-se norma reguladora de situação análoga.'
  },
  {
    id: 14,
    enunciado: '14. O CPP estabelece, quanto à interpretação:',
    opcoes: [
      'A) Proibição absoluta de interpretação',
      'B) Possibilidade de interpretação extensiva, aplicação analógica e suplemento dos princípios gerais de direito',
      'C) Somente interpretação literal',
      'D) Somente interpretação favorável à acusação'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Literalidade do Art. 3º do CPP: "A lei processual penal admitirá interpretação extensiva e aplicação analógica, bem como o suplemento dos princípios gerais de direito".'
  },
  {
    id: 15,
    enunciado: '15. Os tratados e convenções internacionais:',
    opcoes: [
      'A) Nunca possuem relevância para o processo penal brasileiro',
      'B) Podem integrar o ordenamento jurídico e influenciar a aplicação das normas processuais, conforme sua incorporação e posição normativa',
      'C) Substituem automaticamente toda a legislação brasileira',
      'D) Só podem tratar de matéria civil'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Os tratados e convenções internacionais devidamente incorporados ao direito brasileiro integram as fontes normativas (ex: Pacto de San José da Costa Rica com status supralegal, art. 5º, § 2º/§ 3º da CF).'
  },
  {
    id: 16,
    enunciado: '16. Um ato processual foi praticado corretamente antes da entrada em vigor de uma nova lei processual. Em regra, esse ato:',
    opcoes: [
      'A) É automaticamente inválido',
      'B) Continua válido',
      'C) Deve ser obrigatoriamente repetido',
      'D) Depende de concordância do réu'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: A lei processual nova respeita a higidez dos atos processuais já consumados sob a vigência da legislação anterior (tempus regit actum).'
  },
  {
    id: 17,
    enunciado: '17. Assinale a alternativa INCORRETA:',
    opcoes: [
      'A) A lei processual penal tem aplicação imediata.',
      'B) A aplicação imediata preserva a validade dos atos realizados sob a lei anterior.',
      'C) Toda lei processual penal mais gravosa deve retroagir para atingir atos já praticados.',
      'D) A aplicação da lei processual penal no tempo possui disciplina própria.'
    ],
    correta: 2, // C (INCORRETA)
    explicacao: 'Gabarito C: A alternativa C é manifestamente incorreta e absurda! A lei processual penal NÃO retroage para atingir atos já praticados e consolidados, independentemente de ser mais benéfica ou mais gravosa.'
  },
  {
    id: 18,
    enunciado: '18. Um processo começou sob determinada lei processual. Durante seu andamento, outra lei entrou em vigor. Em regra, os atos posteriores:',
    opcoes: [
      'A) Seguem a lei nova',
      'B) Seguem obrigatoriamente a lei antiga',
      'C) São todos anulados',
      'D) Não podem ser praticados'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: Conforme o princípio do isolamento dos atos processuais, a lei nova incide a partir de sua vigência; logo, todos os atos futuros a serem praticados no processo observarão a nova lei.'
  },
  {
    id: 19,
    enunciado: '19. A interpretação sistemática considera:',
    opcoes: [
      'A) Apenas uma palavra isolada do texto legal',
      'B) A norma dentro do conjunto do ordenamento jurídico',
      'C) Somente a vontade pessoal do juiz',
      'D) Apenas decisões administrativas'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: A hermenêutica sistemática compreende o preceito normativo como elemento integrante de um sistema orgânico e coerente, articulando a norma com os demais princípios e preceitos constitucionais e legais.'
  },
  {
    id: 20,
    enunciado: '20. QUESTÃO DESAFIO: Sobre a aplicação da lei processual penal, assinale a correta:',
    opcoes: [
      'A) A lei processual nova sempre retroage para invalidar atos anteriores.',
      'B) A lei processual nova somente pode ser aplicada se beneficiar o acusado.',
      'C) A lei processual penal aplica-se imediatamente, preservando-se a validade dos atos praticados sob a lei anterior.',
      'D) A lei processual penal somente se aplica aos crimes cometidos após sua publicação.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Síntese perfeita do Art. 2º do CPP e da jurisprudência consolidada: a norma puramente processual incide de pronto nos processos pendentes (aplicação imediata), resguardando integralmente os atos processuais pretéritos praticados sob a égide da lei revogada.'
  }
];

export const procPenalTfQuestionsData: TfQuestionItem[] = [
  {
    id: 101,
    enunciado: '1. A lei processual penal nova possui aplicação imediata aos processos em andamento, preservando-se os atos processuais validamente praticados sob a vigência da lei anterior.',
    correta: true,
    explicacao: 'Verdadeiro: É a regra expressa do Art. 2º do CPP (tempus regit actum e teoria do isolamento dos atos processuais).'
  },
  {
    id: 102,
    enunciado: '2. Uma norma de natureza mista (material-processual) mais gravosa ao réu pode ser aplicada imediatamente a fatos criminosos ocorridos antes de sua entrada em vigor.',
    correta: false,
    explicacao: 'Falso: Normas mistas ou heterogêneas têm reflexo substancial na liberdade ou no direito de punir (ex: prescrição, decadência, queixa-crime) e submetem-se ao princípio da irretroatividade in pejus (Art. 5º, XL da CF).'
  },
  {
    id: 103,
    enunciado: '3. A regra geral do Código de Processo Penal brasileiro quanto ao espaço é o Princípio da Territorialidade, aplicando-se em todo o território nacional, ressalvadas as exceções de tratados e direito internacional.',
    correta: true,
    explicacao: 'Verdadeiro: Conforme o Artigo 1º do CPP, ressalvando prerrogativas de tratados diplomáticos, prerrogativa de foro e justiça militar.'
  },
  {
    id: 104,
    enunciado: '4. No processo penal é proibida qualquer forma de analogia ou interpretação extensiva, admitindo-se apenas a interpretação estritamente literal da lei.',
    correta: false,
    explicacao: 'Falso: O Artigo 3º do CPP autoriza expressamente a interpretação extensiva, a aplicação analógica e o recurso aos princípios gerais de direito.'
  }
];

export const procPenalDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 201,
    enunciado: '1. Discorra sobre a eficácia da lei processual penal no tempo (Art. 2º do CPP), explicando o princípio regente, a validade dos atos processuais anteriores e o tratamento dispensado às normas processuais mistas (heterogêneas).',
    respostaEsperada: 'Gabarito oficial: A aplicação da lei processual penal no tempo é regida pelo princípio do tempus regit actum (Art. 2º do CPP), segundo o qual a nova lei tem aplicação imediata aos processos em andamento. Adota-se a teoria do isolamento dos atos processuais: os atos praticados sob a lei anterior permanecem perfeitamente válidos e eficazes, e a lei nova rege os atos subsequentes. Excepcionam-se as normas de natureza mista ou híbrida (com reflexo penal material, como decadência e queixa-crime), que seguem o princípio penal da irretroatividade da lei mais gravosa (Art. 5º, XL da CF), retroagindo apenas se benéficas ao réu.'
  },
  {
    id: 202,
    enunciado: '2. Diferencie Interpretação Extensiva de Aplicação Analógica no Processo Penal brasileiro à luz do Artigo 3º do CPP, indicando a hipótese de cabimento de cada instituto.',
    respostaEsperada: 'Gabarito oficial: No Art. 3º do CPP, a Interpretação Extensiva e a Analogia cumprem funções distintas. A Interpretação Extensiva é um método de hermenêutica no qual existe norma prevendo o caso concreto, porém formulada com vocabulário mais acanhado do que a vontade do legislador (minus dixit quam voluit); amplia-se o alcance do texto para alcançar seu real sentido. Já a Analogia é uma forma de integração/preenchimento de lacuna jurídica: NÃO existe norma expressa regulando a hipótese; logo, o magistrado estende a regra de um caso semelhante para suprir a omissão legal, desde que respeitadas as garantias constitucionais.'
  }
];
