// Data for Direito Processual Civil — Aula 2: Atos Processuais (CPC/2015)
// Preparatório TJAM — Assistente Judiciário

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
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

export interface PracticalCaseItem {
  titulo: string;
  caso: string;
  perguntas: string[];
  desafioOral: string;
  tempoSugerido: string;
  criteriosAvaliacao: string[];
}

export const procCivilAula2SummaryPoints: string[] = [
  'Atos Processuais: manifestações praticadas no processo para produzir efeitos jurídicos e permitir o desenvolvimento da atividade processual.',
  'Quem pode praticar: Juiz (decisões, sentenças), Partes (petições, manifestações, recursos), Advogados (representação) e Servidores/Auxiliares da Justiça (citações, intimações, certidões).',
  'Forma dos Atos: vigora o princípio da liberdade das formas (art. 188 CPC). Os atos independem de forma determinada, salvo quando a lei expressamente exigir, visando evitar formalismo excessivo.',
  'Tempo dos Atos: em regra realizados em dias úteis, das 6h às 20h (art. 212 CPC), observadas as exceções e autorizações legais.',
  'Atos Eletrônicos: admitida e incentivada a prática por meios eletrônicos (peticionamento, consulta aos autos, comunicações e atos à distância).',
  'Publicidade (Regra Geral): os atos processuais são públicos. O segredo de justiça é exceção restrita às hipóteses previstas em lei.',
  'Citação (art. 238 CPC): chama o réu, executado ou interessado para INTEGRAR a relação processual ("chama para o processo").',
  'Intimação (art. 269 CPC): dá ciência a alguém dos atos e termos do processo ("comunica o que aconteceu no processo").',
  'Prazos Processuais (art. 219 CPC): na contagem de prazo processual em dias estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis.',
  'Preclusão: perda da possibilidade de praticar determinado ato processual (temporal pelo decurso de prazo, consumativa pela prática do ato, ou lógica por ato incompatível).',
  'Artigos fundamentais para a prova do TJAM: arts. 188, 212, 219, 220 e 238 do CPC/2015.'
];

export const procCivilFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que são atos processuais no Direito Processual Civil?',
    a: 'São as manifestações de vontade praticadas no processo para produzir efeitos jurídicos e permitir o desenvolvimento regular da atividade processual até a decisão final.'
  },
  {
    q: 'Quem pode praticar atos processuais segundo o CPC?',
    a: 'Juiz (decisões e sentenças), partes (petições e recursos), advogados (representação processual) e servidores/auxiliares da Justiça (citações, intimações, certidões etc.).'
  },
  {
    q: 'Qual é a regra geral sobre a forma dos atos processuais (CPC, art. 188)?',
    a: 'Os atos processuais independem de forma determinada, salvo quando a lei expressamente a exigir, considerando-se válidos os que, realizados de outro modo, preencham a sua finalidade essencial.'
  },
  {
    q: 'Qual é o objetivo de não se exigir forma rígida determinada para os atos processuais?',
    a: 'Evitar o excesso de formalismo (princípio da instrumentalidade das formas), garantindo a validade do ato desde que alcance seu objetivo sem prejuízo à defesa.'
  },
  {
    q: 'Em quais dias e horários os atos processuais são realizados como regra (art. 212 CPC)?',
    a: 'Em regra, são realizados em dias úteis, das 6h às 20h, ressalvadas as situações excepcionais e autorizações legais para atos fora desse horário.'
  },
  {
    q: 'A prática de atos processuais por meio eletrônico é permitida?',
    a: 'Sim! É plenamente admitida pelo CPC e regulada por legislação própria, abrangendo peticionamento, juntada de documentos, comunicações, consulta e atos à distância.'
  },
  {
    q: 'Os atos processuais são públicos ou secretos como regra geral?',
    a: 'Regra geral: são PÚBLICOS. Qualquer cidadão pode consultar e acompanhar. A exceção é o SEGREDO DE JUSTIÇA, restrito às hipóteses previstas em lei (ex.: família, intimidade).'
  },
  {
    q: 'O que é a citação e qual sua finalidade fundamental (CPC, art. 238)?',
    a: 'Citação é o ato pelo qual são convocados o réu, o executado ou o interessado para INTEGRAR a relação processual. 🧠 Mnemônico: Citação = CHAMA para o processo!'
  },
  {
    q: 'O que é a intimação e qual sua função no processo (CPC, art. 269)?',
    a: 'Intimação é o ato pelo qual se dá ciência a alguém dos atos e termos do processo para que faça ou deixe de fazer alguma coisa. 🧠 Mnemônico: Intimação = COMUNICA o que aconteceu!'
  },
  {
    q: 'Qual é a regra de contagem dos prazos processuais no CPC/2015 (art. 219)?',
    a: 'Na contagem de prazos processuais em dias, contam-se APENAS OS DIAS ÚTEIS. Sábados, domingos e feriados não são computados na contagem do prazo.'
  },
  {
    q: 'A contagem em dias úteis aplica-se a todos os prazos do direito?',
    a: 'NÃO! Aplica-se exclusivamente aos prazos processuais previstos no CPC ou fixados pelo juiz. Não se aplica, por exemplo, aos prazos de direito material (prescrição/decadência) nem ao Processo Penal.'
  },
  {
    q: 'O que é preclusão no Processo Civil?',
    a: 'É a perda, extinção ou consumação da faculdade ou direito processual de praticar determinado ato no processo.'
  },
  {
    q: 'Quais são as três principais espécies de preclusão?',
    a: '1) Temporal: perda pelo decurso do prazo sem praticar o ato;\n2) Consumativa: perda porque o ato já foi integralmente praticado;\n3) Lógica: perda pela prática de ato anterior incompatível com o que se pretendia realizar.'
  },
  {
    q: 'O que acontece quando o advogado deixa esgotar o prazo legal sem se manifestar?',
    a: 'Ocorre a PRECLUSÃO TEMPORAL, perdendo a parte o direito de praticar o ato extemporaneamente, seguindo o processo para a próxima fase.'
  },
  {
    q: 'Quais os artigos mais importantes do CPC sobre atos processuais para o TJAM?',
    a: 'Art. 188 (liberdade das formas), Art. 212 (tempo e horário dos atos: dias úteis 6h-20h), Art. 219 (contagem em dias úteis), Art. 220 (suspensão no recesso) e Art. 238 (conceito de citação).'
  }
];

export const procCivilAula2McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Os atos processuais são praticados para:',
    opcoes: [
      'A) Apenas movimentar documentos físicos',
      'B) Produzir efeitos no processo e contribuir para seu desenvolvimento',
      'C) Aplicar penas criminais',
      'D) Substituir a sentença'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Os atos processuais são manifestações de vontade juridicamente relevantes que produzem efeitos jurídicos no processo e impulsionam o seu regular desenvolvimento rumo à decisão de mérito.'
  },
  {
    id: 2,
    enunciado: '2. Sobre a forma dos atos processuais, o CPC estabelece, como regra, que:',
    opcoes: [
      'A) Todo ato exige forma específica',
      'B) Os atos independem de forma determinada, salvo quando a lei exigir',
      'C) Os atos devem ser exclusivamente escritos à mão',
      'D) Somente o juiz pode definir a forma'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme o art. 188 do CPC: "Os atos e os termos processuais independem de forma determinada, salvo quando a lei expressamente a exigir, considerando-se válidos os que, realizados de outro modo, preencham a finalidade essencial".'
  },
  {
    id: 3,
    enunciado: '3. Em regra, os atos processuais são:',
    opcoes: [
      'A) Secretos',
      'B) Públicos',
      'C) Exclusivos das partes',
      'D) Exclusivos do juiz'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme art. 189 do CPC e art. 93, IX da CF/88, vigora o princípio da publicidade dos atos processuais como regra geral no ordenamento jurídico brasileiro.'
  },
  {
    id: 4,
    enunciado: '4. O segredo de justiça constitui:',
    opcoes: [
      'A) A regra geral',
      'B) Uma exceção prevista em lei',
      'C) Uma decisão obrigatória em todo processo',
      'D) Uma faculdade exclusiva do advogado'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. O segredo de justiça é exceção à regra geral da publicidade, somente admitido nas hipóteses taxativamente ou expressamente autorizadas por lei (ex.: direito de família, arbitragem com sigilo, dados protegidos).'
  },
  {
    id: 5,
    enunciado: '5. A citação tem como principal finalidade:',
    opcoes: [
      'A) Dar ciência de uma sentença já definitiva',
      'B) Chamar o réu, executado ou interessado para integrar a relação processual',
      'C) Aplicar uma penalidade',
      'D) Encerrar o processo'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme art. 238 do CPC: "Citação é o ato pelo qual são convocados o réu, o executado ou o interessado para integrar a relação processual".'
  },
  {
    id: 6,
    enunciado: '6. A intimação serve, em regra, para:',
    opcoes: [
      'A) Dar ciência dos atos e termos do processo',
      'B) Criar uma nova ação',
      'C) Condenar o réu',
      'D) Substituir a citação em qualquer situação'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Conforme o art. 269 do CPC: "Intimação é o ato pelo qual se dá ciência a alguém dos atos e dos termos do processo".'
  },
  {
    id: 7,
    enunciado: '7. Assinale a alternativa correta:',
    opcoes: [
      'A) Citação e intimação são exatamente a mesma coisa',
      'B) Citação chama para integrar o processo; intimação dá ciência de atos processuais',
      'C) Intimação sempre ocorre antes da citação',
      'D) Citação somente pode ser feita ao autor'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. A citação convoca o sujeito para integrar a relação jurídica processual pela primeira vez; a intimação comunica acontecimentos, despachos, decisões e prazos no processo já instaurado.'
  },
  {
    id: 8,
    enunciado: '8. Nos prazos processuais previstos no CPC, contam-se, em regra:',
    opcoes: [
      'A) Dias corridos',
      'B) Apenas dias úteis',
      'C) Apenas domingos e feriados',
      'D) Apenas dias úteis para o juiz'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme art. 219 do CPC: "Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis".'
  },
  {
    id: 9,
    enunciado: '9. A contagem em dias úteis aplica-se:',
    opcoes: [
      'A) Aos prazos processuais',
      'B) A todos os prazos existentes no ordenamento jurídico',
      'C) Somente aos prazos administrativos',
      'D) Somente aos processos criminais'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Conforme o parágrafo único do art. 219 do CPC, a contagem em dias úteis aplica-se tão somente aos prazos processuais (não se aplicando a prazos de direito material como prescrição e decadência).'
  },
  {
    id: 10,
    enunciado: '10. Segundo o CPC, os atos processuais são praticados, em regra:',
    opcoes: [
      'A) Em qualquer horário, sem restrição',
      'B) Em dias úteis, das 6h às 20h, observadas as exceções legais',
      'C) Somente das 8h às 18h',
      'D) Somente durante o horário de expediente do fórum'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme o art. 212 do CPC: "Os atos processuais serão realizados em dias úteis, das 6 (seis) às 20 (vinte) horas", com exceções expressas autorizadas na legislação.'
  },
  {
    id: 11,
    enunciado: '11. Os atos processuais podem ser praticados por:',
    opcoes: [
      'A) Somente pelo juiz',
      'B) Somente pelas partes',
      'C) Juiz, partes, advogados e auxiliares da Justiça, conforme suas atribuições',
      'D) Somente pelo Ministério Público'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. O processo é uma relação complexa e cooperativa onde magistrados, partes, procuradores e servidores/auxiliares da Justiça praticam atos conforme suas atribuições legais.'
  },
  {
    id: 12,
    enunciado: '12. São exemplos de atos processuais praticados pelo juiz:',
    opcoes: [
      'A) Sentença e decisões',
      'B) Contestação e recurso',
      'C) Citação e procuração particular',
      'D) Depoimento da testemunha'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Os pronunciamentos do juiz consistirão em sentenças, decisões interlocutórias e despachos (CPC, art. 203).'
  },
  {
    id: 13,
    enunciado: '13. A prática de atos processuais por meio eletrônico:',
    opcoes: [
      'A) É proibida pelo CPC',
      'B) É admitida conforme a legislação aplicável',
      'C) Só pode ocorrer em processos criminais',
      'D) Depende sempre de autorização da parte contrária'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme arts. 193 e seguintes do CPC e Lei 11.419/2006, os atos processuais podem ser total ou parcialmente digitais por meio de sistemas eletrônicos (como o PJe do TJAM).'
  },
  {
    id: 14,
    enunciado: '14. A preclusão pode ser entendida como:',
    opcoes: [
      'A) Perda da possibilidade de praticar determinado ato processual',
      'B) Criação de uma nova ação',
      'C) Anulação automática do processo',
      'D) Absolvição do réu'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. A preclusão é a perda do direito de manifestação ou de prática de um ato no processo, garantindo a marcha para a frente (sem retrocessos).'
  },
  {
    id: 15,
    enunciado: '15. Quando uma parte deixa passar o prazo para praticar determinado ato, pode ocorrer:',
    opcoes: [
      'A) Citação',
      'B) Preclusão',
      'C) Sentença automática',
      'D) Revelia em qualquer situação'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Ocorre a preclusão temporal pelo decurso in albis do prazo legal ou judicial, ficando extinta a faculdade de praticar o ato (CPC, art. 223).'
  },
  {
    id: 16,
    enunciado: '16. O princípio da publicidade dos atos processuais significa que:',
    opcoes: [
      'A) Todo processo deve obrigatoriamente ser secreto',
      'B) Em regra, os atos processuais são públicos',
      'C) Somente o juiz pode conhecer o processo',
      'D) O advogado não pode consultar os autos'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. A publicidade é garantia constitucional republicana e democrática (art. 93, IX, CF/88 e art. 189, CPC), assegurando transparência e fiscalização das decisões judiciais.'
  },
  {
    id: 17,
    enunciado: '17. O segredo de justiça pode ser determinado:',
    opcoes: [
      'A) Nas hipóteses previstas em lei',
      'B) Em todos os processos',
      'C) Apenas quando o réu solicitar',
      'D) Apenas quando o advogado solicitar'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. O art. 189 do CPC delimita taxativamente as hipóteses legais (interesse público/social, família, intimidade, arbitragem sigilosa).'
  },
  {
    id: 18,
    enunciado: '18. Sobre os atos processuais, assinale a correta:',
    opcoes: [
      'A) A ausência de forma específica sempre gera nulidade',
      'B) A forma pode ser livre quando a lei não exigir forma determinada',
      'C) Todo ato deve ser praticado presencialmente',
      'D) Atos eletrônicos não possuem validade'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Pelo princípio da liberdade das formas (art. 188 do CPC), a forma é livre quando a lei não exigir modelo ou solenidade específica.'
  },
  {
    id: 19,
    enunciado: '19. Se uma parte pratica determinado ato e posteriormente perde a possibilidade de realizar outro ato incompatível com aquele, pode ocorrer:',
    opcoes: [
      'A) Preclusão',
      'B) Citação',
      'C) Intimação',
      'D) Competência'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Trata-se da chamada preclusão lógica (ex.: a parte paga voluntariamente o valor da condenação e, em seguida, tenta interpor apelação questionando esse valor).'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa correta:',
    opcoes: [
      'A) A citação serve apenas para comunicar uma sentença',
      'B) A intimação serve para integrar necessariamente o réu ao processo',
      'C) Citação e intimação possuem finalidades diferentes',
      'D) Prazos processuais são sempre contados em dias corridos'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. A citação integra o réu/interessado à lide (art. 238), ao passo que a intimação dá ciência de atos e termos para quem já faz parte ou tem interesse no processo (art. 269).'
  }
];

export const procCivilAula2TfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Como regra geral no CPC, os atos processuais não dependem de forma determinada, salvo quando a lei expressamente exigir.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. É o princípio da instrumentalidade das formas previsto no art. 188 do CPC.'
  },
  {
    id: 2,
    enunciado: '2. Em regra, os atos processuais são praticados em dias úteis das 6h às 20h, conforme o art. 212 do CPC.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. O art. 212 do CPC fixa o horário padrão entre 6h e 20h em dias úteis.'
  },
  {
    id: 3,
    enunciado: '3. A citação e a intimação têm a mesma finalidade, podendo ser usadas indiferentemente para qualquer ato processual.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. A citação chama para integrar a relação processual (art. 238), enquanto a intimação dá ciência de atos e termos (art. 269).'
  },
  {
    id: 4,
    enunciado: '4. Na contagem de prazos processuais em dias fixados pelo CPC, contam-se apenas os dias úteis.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. Conforme o art. 219 do CPC, contam-se somente os dias úteis.'
  },
  {
    id: 5,
    enunciado: '5. A preclusão ocorre apenas quando o juiz expressamente proíbe a parte de falar nos autos.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. A preclusão decorre da perda do prazo (temporal), da consumação do ato já praticado (consumativa) ou da prática de ato incompatível (lógica).'
  },
  {
    id: 6,
    enunciado: '6. O segredo de justiça é a regra em processos cíveis, e a publicidade é exceção concedida pelo juiz.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. A regra é a PUBLICIDADE (art. 189 CPC e art. 93, IX CF). O segredo de justiça é exceção estrita.'
  }
];

export const procCivilAula2DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Qual ato deve ser utilizado para chamar João a integrar o processo movido por Maria?',
    respostaEsperada: 'Gabarito Oficial: O ato a ser utilizado é a CITAÇÃO (CPC, art. 238), que é o ato solene pelo qual são convocados o réu, o executado ou o interessado para integrar a relação processual.'
  },
  {
    id: 2,
    enunciado: '2. Qual ato deve ser utilizado para comunicar as partes sobre a decisão proferida pelo juiz?',
    respostaEsperada: 'Gabarito Oficial: O ato a ser utilizado é a INTIMAÇÃO (CPC, art. 269), que tem como finalidade primordial dar ciência a alguém dos atos e termos do processo.'
  },
  {
    id: 3,
    enunciado: '3. Qual é a diferença fundamental entre citação e intimação?',
    respostaEsperada: 'Gabarito Oficial: A citação chama e integra o sujeito ao processo pela primeira vez, completando a relação jurídica processual (autor, juiz e réu). A intimação dá ciência de atos posteriores do processo a quem já integra ou participa dele.'
  },
  {
    id: 4,
    enunciado: '4. Os prazos processuais do CPC são contados, em regra, em dias úteis ou corridos?',
    respostaEsperada: 'Gabarito Oficial: São contados em DIAS ÚTEIS, nos termos do art. 219 do CPC/2015, excluindo-se da contagem os sábados, domingos e feriados.'
  },
  {
    id: 5,
    enunciado: '5. O que acontece quando o advogado perde o prazo legal para praticar determinado ato no processo?',
    respostaEsperada: 'Gabarito Oficial: Ocorre a PRECLUSÃO TEMPORAL (art. 223 do CPC). A parte perde a faculdade de praticar o ato, extinguindo-se o direito de se manifestar extemporaneamente e seguindo o processo rumo à fase seguinte.'
  },
  {
    id: 6,
    enunciado: '6. Os atos processuais são públicos ou secretos como regra?',
    respostaEsperada: 'Gabarito Oficial: Como regra geral, são PÚBLICOS (art. 189 do CPC e art. 93, IX da CF/88). O segredo de justiça constitui exceção legal expressa.'
  },
  {
    id: 7,
    enunciado: '7. Explique o que é preclusão e qual sua importância para a marcha processual.',
    respostaEsperada: 'Gabarito Oficial: Preclusão é a perda da faculdade de praticar determinado ato processual. Sua importância fundamental reside em evitar retrocessos processuais, garantindo segurança jurídica e o andamento progressivo até a solução definitiva.'
  }
];

export const procCivilPracticalCase: PracticalCaseItem = {
  titulo: 'Atos Processuais: O Caso de Maria contra João',
  caso: 'Maria entrou com uma ação judicial contra João. Durante o processo: João precisa ser chamado oficialmente para integrar o processo; depois, as partes precisam ser comunicadas sobre uma decisão do juiz; o advogado de Maria precisa apresentar uma manifestação dentro do prazo; e o advogado perde o prazo para praticar determinado ato.',
  perguntas: [
    '1. Qual ato deve ser utilizado para chamar João a integrar o processo?',
    '2. Qual ato deve ser utilizado para comunicar as partes sobre a decisão do juiz?',
    '3. Qual é a diferença entre citação e intimação?',
    '4. Os prazos processuais são contados, em regra, em dias úteis ou corridos?',
    '5. O que pode acontecer quando o advogado perde o prazo para praticar determinado ato?',
    '6. Os atos processuais são públicos ou secretos como regra?',
    '7. Explique, com suas próprias palavras, o que é preclusão.'
  ],
  desafioOral: 'Sem olhar as respostas, explique durante o vídeo: "O que são atos processuais e qual a importância deles para o andamento de um processo?"',
  tempoSugerido: '3 a 5 minutos',
  criteriosAvaliacao: [
    'Respostas claras e fundamentadas às 7 perguntas propostas',
    'Domínio da distinção prática e jurídica entre citação e intimação',
    'Conhecimento sobre contagem de prazos em dias úteis (art. 219 CPC)',
    'Explicação clara da preclusão e do princípio da publicidade',
    'Capacidade de síntese no desafio oral sem leitura mecânica'
  ]
};

// ⚖️ 10 Questões de Processo Civil respondidas por Pedro Henrique (Dupla Oficial • 3º Lugar Geral)
export const PEDRO_CIVIL_CORRECT_ANSWERS: Record<number, number> = {
  1: 1, // B) Produzir efeitos no processo e contribuir para seu desenvolvimento
  2: 1, // B) Os atos independem de forma determinada, salvo quando a lei exigir
  3: 1, // B) Públicos
  4: 1, // B) Uma exceção prevista em lei
  5: 1, // B) Chamar o réu, executado ou interessado para integrar a relação processual
  6: 0, // A) Dar ciência dos atos e termos do processo
  7: 1, // B) Citação chama para integrar o processo; intimação dá ciência de atos processuais
  8: 1, // B) Apenas dias úteis
  9: 0, // A) Aos prazos processuais
  10: 1, // B) Em dias úteis, das 6h às 20h, observadas as exceções legais
};

export const PEDRO_CIVIL_SHOW_RESULTS: Record<number, boolean> = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
};

export function getPedroAnswerInfo(questionId: number) {
  if (questionId < 1 || questionId > 10) return null;
  const item = procCivilAula2McQuestionsData.find(q => q.id === questionId);
  if (!item) return null;
  const corretaIdx = item.correta;
  const letra = String.fromCharCode(65 + corretaIdx);
  const texto = item.opcoes[corretaIdx];
  return {
    responderName: 'Pedro Henrique',
    responderRole: 'Aluno Oficial • 3º Lugar Geral TJAM (100% em dia)',
    badgeText: 'Pedro respondeu esta questão',
    corretaIdx,
    letra,
    texto,
    fullLabel: `Alternativa ${letra}) ${texto}`,
  };
}

/**
 * Garante que o progresso de Processo Civil contenha as 10 respostas corretas de Pedro Henrique
 * e salva automaticamente tanto em storage local quanto no Firestore ao lançar no ar.
 */
export function ensurePedroProcessoCivilAnswers(store: Record<string, any>): Record<string, any> {
  if (!store) store = {};
  if (!store['processo_civil']) {
    store['processo_civil'] = {
      subjectKey: 'processo_civil',
      completed: true,
      completedAt: new Date().toISOString(),
      answeredBy: 'Pedro Henrique',
      selectedAnswers: { ...PEDRO_CIVIL_CORRECT_ANSWERS },
      showQuestionResults: { ...PEDRO_CIVIL_SHOW_RESULTS },
      tfAnswers: {},
      tfSubmitted: {},
      discursiveAnswers: {},
      discursiveSubmitted: {},
      checklist: { c1: true, c2: true, c3: true, c4: true, c5: true },
      learnedCards: {},
      lastUpdated: new Date().toISOString(),
    };
  } else {
    store['processo_civil'].answeredBy = 'Pedro Henrique';
    store['processo_civil'].selectedAnswers = {
      ...(store['processo_civil'].selectedAnswers || {}),
      ...PEDRO_CIVIL_CORRECT_ANSWERS,
    };
    store['processo_civil'].showQuestionResults = {
      ...(store['processo_civil'].showQuestionResults || {}),
      ...PEDRO_CIVIL_SHOW_RESULTS,
    };
    if (!store['processo_civil'].completedAt) {
      store['processo_civil'].completedAt = new Date().toISOString();
    }
  }
  return store;
}
