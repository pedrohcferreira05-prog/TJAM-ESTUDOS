// Data for Direito Administrativo — 2ª Aula de Hoje: Controle da Administração Pública

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

export interface PracticalTaskItem {
  titulo: string;
  situacaoProblema: string;
  tarefa: string;
  perguntasChave: string[];
  desafioCotidiano: string;
  criteriosAvaliacao: string[];
}

export const direitoAdminVideoPracticalTask: PracticalTaskItem = {
  titulo: 'Exercício Prático em Vídeo — Controle da Administração Pública',
  situacaoProblema:
    'Você trabalha em um órgão público. O setor responsável pela fiscalização percebeu que um servidor praticou um ato administrativo sem observar uma exigência prevista em lei. Ao mesmo tempo, existe outro ato administrativo que foi praticado corretamente, mas a Administração percebeu que ele não é mais conveniente para o interesse público.',
  tarefa:
    'Grave um vídeo de 2 a 3 minutos explicando a situação para o seu chefe no órgão público, estruturando a resposta técnica de forma clara e acessível.',
  perguntasChave: [
    '1. O que deve acontecer com o primeiro ato, que possui ilegalidade? (Anulação por vício de legalidade, efeito retroativo ex tunc).',
    '2. O que pode acontecer com o segundo ato, que é válido, mas deixou de ser conveniente? (Revogação por mérito administrativo, efeito prospectivo ex nunc).',
    '3. Qual a diferença essencial entre anulação e revogação? (Motivo, competência, efeitos temporais e respeito a direitos adquiridos).',
    '4. Qual tipo de controle está sendo realizado quando a própria Administração fiscaliza seus próprios atos? (Controle interno / administrativo / princípio da autotutela — Súmulas 346 e 473 do STF).'
  ],
  desafioCotidiano:
    'Crie um terceiro exemplo do seu próprio cotidiano de: (a) um ato que deveria ser anulado (com defeito de legalidade); e (b) um ato que poderia ser revogado (que era válido mas deixou de ser útil/conveniente). Explique o motivo de cada um de forma simples.',
  criteriosAvaliacao: [
    'Domínio técnico dos conceitos de anulação, revogação e autotutela',
    'Diferenciação clara entre controle de legalidade e juízo de mérito administrativo',
    'Clareza na exposição oral simulada para a chefia imediata',
    'Pertinência e criatividade nos exemplos práticos do cotidiano'
  ]
};

export const direitoAdminFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que é Controle da Administração Pública?',
    a: 'É o conjunto de mecanismos jurídicos e administrativos utilizados para fiscalizar, acompanhar e verificar se a atuação do Estado está de acordo com a lei e com o interesse público, prevenindo ilegalidades, desvios e desperdício.'
  },
  {
    q: 'O que é Controle Interno e qual o seu macete?',
    a: 'É aquele realizado dentro da própria estrutura do Poder ou órgão que praticou o ato. Exemplo: setor de auditoria ou corregedoria fiscalizando suas secretarias.\n📌 Macete: Interno = dentro da própria Administração.'
  },
  {
    q: 'O que é Controle Externo? Dê o principal exemplo federal.',
    a: 'É realizado por um órgão ou Poder diferente daquele que praticou o ato. Principal exemplo: Poder Legislativo com o auxílio dos Tribunais de Contas (Congresso Nacional auxiliado pelo TCU no âmbito federal, ou ALEAM com o TCE-AM).'
  },
  {
    q: 'Qual o papel do Poder Judiciário no Controle Judicial e qual o limite?',
    a: 'O Judiciário controla a LEGALIDADE dos atos administrativos quando provocado. ⚠️ Limite: o juiz NÃO pode invadir o mérito administrativo (conveniência e oportunidade), nem substituir a escolha discricionária do administrador.'
  },
  {
    q: 'O que é Controle Administrativo e Princípio da Autotutela?',
    a: 'É o controle exercido pela própria Administração sobre seus próprios atos. Permite anular atos ilegais e revogar atos válidos que se tornaram inoportunos ou inconvenientes (Súmulas 346 e 473 do STF).'
  },
  {
    q: 'Qual a diferença essencial entre Anulação e Revogação?',
    a: '• Anulação → incide sobre atos ILEGAIS (efeito retroativo / ex tunc).\n• Revogação → incide sobre atos VÁLIDOS por razões de conveniência e oportunidade (efeito prospectivo / ex nunc).'
  },
  {
    q: 'O que é Controle de Legalidade e quem pode exercê-lo?',
    a: 'Verifica se o ato respeita a Constituição, leis e regulamentos. Havendo ilegalidade, o ato deve ser anulado. Pode ser exercido tanto pela própria Administração (autotutela) quanto pelo Poder Judiciário (quando provocado).'
  },
  {
    q: 'O que é Controle de Mérito e o Judiciário pode exercê-lo?',
    a: 'Relaciona-se à conveniência e oportunidade do ato discricionário. É privativo da própria Administração Pública. O Poder Judiciário NUNCA pode revogar ato do Executivo por mérito, apenas anular por ilegalidade.'
  },
  {
    q: 'Como se classifica o controle quanto ao momento de realização?',
    a: '• Prévio (preventivo): antes da realização do ato (ex: autorização prévia).\n• Concomitante: durante a realização/execução (ex: fiscalização de obra).\n• Posterior (corretivo): após a prática do ato (ex: homologação ou anulação).'
  },
  {
    q: 'Quais os temas mais cobrados para o TJAM em Controle?',
    a: '1) Controle interno × externo × judicial;\n2) Legalidade × mérito;\n3) Anulação (ex tunc) × revogação (ex nunc);\n4) Controle prévio × concomitante × posterior.'
  }
];

export const direitoAdminMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. O controle da Administração Pública tem como principal finalidade:',
    opcoes: [
      'A) Aumentar a quantidade de servidores.',
      'B) Fiscalizar e verificar a regularidade da atuação administrativa.',
      'C) Substituir todos os atos administrativos por decisões judiciais.',
      'D) Eliminar a autonomia dos órgãos públicos.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O controle é o conjunto de mecanismos utilizados para fiscalizar, acompanhar e verificar se a atuação da Administração Pública está em conformidade com a lei e com o interesse público.'
  },
  {
    id: 2,
    enunciado: '2. O controle realizado pela própria Administração sobre seus atos é chamado de:',
    opcoes: [
      'A) Controle judicial.',
      'B) Controle externo.',
      'C) Controle administrativo.',
      'D) Controle legislativo.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. O controle administrativo decorre do poder de autotutela, pelo qual a própria Administração fiscaliza e revê seus próprios atos.'
  },
  {
    id: 3,
    enunciado: '3. O controle interno é aquele realizado:',
    opcoes: [
      'A) Exclusivamente pelo Poder Judiciário.',
      'B) Dentro da própria estrutura administrativa.',
      'C) Somente pelo Congresso Nacional.',
      'D) Apenas pelos Tribunais de Contas.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Controle interno é aquele efetuado pelo mesmo Poder ou órgão que praticou o ato, dentro da sua própria estrutura hierárquica.'
  },
  {
    id: 4,
    enunciado: '4. O controle externo, no âmbito federal, é exercido pelo:',
    opcoes: [
      'A) Poder Executivo, exclusivamente.',
      'B) Congresso Nacional, com auxílio do Tribunal de Contas da União.',
      'C) Poder Judiciário, exclusivamente.',
      'D) Ministério Público, exclusivamente.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. De acordo com o art. 70 e 71 da CF/88, o controle externo federal compete ao Congresso Nacional com auxílio técnico-pericial do TCU.'
  },
  {
    id: 5,
    enunciado: '5. O controle judicial dos atos administrativos é realizado pelo:',
    opcoes: [
      'A) Poder Executivo.',
      'B) Poder Legislativo.',
      'C) Poder Judiciário.',
      'D) Tribunal de Contas.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. O controle judicial é privativo do Poder Judiciário, em obediência ao princípio da inafastabilidade da jurisdição (art. 5º, XXXV, CF/88).'
  },
  {
    id: 6,
    enunciado: '6. Em regra, o Poder Judiciário, ao controlar um ato administrativo, verifica principalmente:',
    opcoes: [
      'A) A conveniência política do ato.',
      'B) A legalidade do ato.',
      'C) A preferência pessoal do administrador.',
      'D) A quantidade de servidores do órgão.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O juiz atua sob o prisma da estrita legalidade e legitimidade, não podendo substituir a Administração nas suas opções de mérito (conveniência e oportunidade).'
  },
  {
    id: 7,
    enunciado: '7. A Administração Pública pode anular seus próprios atos quando:',
    opcoes: [
      'A) Forem ilegais.',
      'B) Forem sempre inconvenientes.',
      'C) O administrador simplesmente mudar de opinião.',
      'D) O Poder Judiciário determinar em todos os casos.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. A anulação é o instrumento cabível para retirar do ordenamento jurídico atos que contenham vícios de legalidade (Súmula 473 do STF).'
  },
  {
    id: 8,
    enunciado: '8. A revogação de um ato administrativo está relacionada, em regra:',
    opcoes: [
      'A) À ilegalidade.',
      'B) À conveniência e oportunidade.',
      'C) À inexistência do ato.',
      'D) À responsabilidade criminal.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. A revogação é o juízo discricionário privativo da Administração sobre atos válidos que deixaram de ser convenientes ou oportunos.'
  },
  {
    id: 9,
    enunciado: '9. Assinale a alternativa correta:',
    opcoes: [
      'A) Anulação ocorre por conveniência; revogação ocorre por ilegalidade.',
      'B) Anulação e revogação são exatamente a mesma coisa.',
      'C) Anulação está relacionada à ilegalidade; revogação, à conveniência e oportunidade.',
      'D) Apenas o Poder Judiciário pode anular atos administrativos.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Regra indispensável de concurso: Anulação = Ilegalidade; Revogação = Mérito (conveniência e oportunidade).'
  },
  {
    id: 10,
    enunciado: '10. Um controle realizado antes da prática de determinado ato administrativo é chamado de:',
    opcoes: [
      'A) Posterior.',
      'B) Concomitante.',
      'C) Prévio.',
      'D) Judicial.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Classificação temporal: controle prévio (a priori ou preventivo) é aquele exercido antes da formação ou consumação do ato.'
  },
  {
    id: 11,
    enunciado: '11. O controle concomitante ocorre:',
    opcoes: [
      'A) Antes do ato.',
      'B) Durante a realização do ato ou atividade.',
      'C) Somente anos depois do ato.',
      'D) Exclusivamente após decisão judicial.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O controle concomitante ocorre simultaneamente, acompanhando o desenrolar da atividade administrativa.'
  },
  {
    id: 12,
    enunciado: '12. O controle posterior ocorre:',
    opcoes: [
      'A) Antes da prática do ato.',
      'B) Durante a prática do ato.',
      'C) Depois da realização do ato.',
      'D) Somente durante uma eleição.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. O controle posterior (ou a posteriori) verifica os atos já consumados e executados.'
  },
  {
    id: 13,
    enunciado: '13. Quando um órgão público fiscaliza seus próprios procedimentos, temos:',
    opcoes: [
      'A) Controle interno.',
      'B) Controle judicial.',
      'C) Controle externo.',
      'D) Controle político exclusivamente.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. Quando a fiscalização é realizada no âmbito interno do próprio órgão ou Poder, temos controle interno.'
  },
  {
    id: 14,
    enunciado: '14. O controle de legalidade busca verificar se:',
    opcoes: [
      'A) O ato é popular.',
      'B) O ato é conveniente para o servidor.',
      'C) O ato está de acordo com as normas jurídicas.',
      'D) O ato possui aprovação da população.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. O controle de legalidade afere a estrita conformidade do ato com a Constituição, leis em sentido estrito e regulamentos infralegais.'
  },
  {
    id: 15,
    enunciado: '15. O mérito administrativo está relacionado principalmente:',
    opcoes: [
      'A) À conveniência e oportunidade.',
      'B) À existência física do órgão.',
      'C) À nacionalidade do servidor.',
      'D) À competência criminal.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. O mérito administrativo consiste na valoração que a lei outorga ao gestor sobre a conveniência e oportunidade de praticar ou manter determinado ato discricionário.'
  },
  {
    id: 16,
    enunciado: '16. Um ato administrativo válido deixa de ser conveniente para a Administração. Em regra, o instrumento adequado para retirá-lo é:',
    opcoes: [
      'A) Anulação.',
      'B) Revogação.',
      'C) Cassação judicial obrigatória.',
      'D) Convalidação.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Sendo o ato válido, mas tornando-se inconveniente ou inoportuno para o interesse público, a Administração deve proceder à sua revogação.'
  },
  {
    id: 17,
    enunciado: '17. Um ato administrativo apresenta vício de legalidade. Em regra, poderá ocorrer:',
    opcoes: [
      'A) Revogação por mérito.',
      'B) Anulação.',
      'C) Promoção do servidor.',
      'D) Concessão automática de benefício.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Havendo defeito jurídico ou contrariedade à lei, a medida cogente é a anulação do ato ilegal.'
  },
  {
    id: 18,
    enunciado: '18. Assinale a alternativa que apresenta somente formas/classificações de controle quanto ao momento:',
    opcoes: [
      'A) Prévio, concomitante e posterior.',
      'B) Civil, penal e tributário.',
      'C) Federal, estadual e municipal.',
      'D) Público, privado e misto.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. A classificação quanto ao momento compreende exclusivamente as modalidades prévia, concomitante e posterior.'
  },
  {
    id: 19,
    enunciado: '19. Sobre controle administrativo, assinale a correta:',
    opcoes: [
      'A) É realizado pela própria Administração.',
      'B) É sempre realizado pelo Poder Judiciário.',
      'C) É realizado somente pelo Congresso Nacional.',
      'D) Não permite revisão dos atos administrativos.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. O controle administrativo é aquele exercido pelos órgãos do Poder Executivo ou pelos outros poderes em sua função administrativa típica sobre seus próprios atos.'
  },
  {
    id: 20,
    enunciado: '20. João praticou um ato administrativo ilegal. O órgão competente identificou a ilegalidade durante uma fiscalização. Nesse caso, o instituto relacionado à retirada do ato por ilegalidade é:',
    opcoes: [
      'A) Revogação.',
      'B) Anulação.',
      'C) Mérito administrativo.',
      'D) Controle concomitante.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Tratando-se de ato praticado com ilegalidade manifesta, o instituto de direito administrativo adequado para desfazê-lo é a anulação.'
  }
];

export const direitoAdminTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. O Poder Judiciário pode revogar atos administrativos do Poder Executivo se entender que eles são inoportunos para a população.',
    correta: false,
    explicacao: 'Falso: O Poder Judiciário controla apenas a LEGALIDADE dos atos administrativos. O juiz nunca pode revogar atos do Executivo por mérito (conveniência/oportunidade).'
  },
  {
    id: 2,
    enunciado: '2. A anulação de um ato administrativo opera, em regra, efeitos retroativos (ex tunc), desfazendo as consequências desde a sua origem por se tratar de ato ilegal.',
    correta: true,
    explicacao: 'Verdadeiro: Como o ato ilegal já nasce com defeito congênito, sua anulação retroage à data em que foi editado (efeitos ex tunc).'
  },
  {
    id: 3,
    enunciado: '3. O controle externo no âmbito federal é exercido pelo Congresso Nacional com auxílio do Tribunal de Contas da União (TCU).',
    correta: true,
    explicacao: 'Verdadeiro: Esta é a exata disposição dos arts. 70 e 71 da CF/88 para o controle externo financeiro e orçamentário federal.'
  },
  {
    id: 4,
    enunciado: '4. O controle prévio é aquele exercido durante a execução da atividade administrativa.',
    correta: false,
    explicacao: 'Falso: O controle prévio ocorre ANTES do ato. O controle exercido DURANTE a execução é chamado de concomitante.'
  }
];

export const direitoAdminDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Explique detalhadamente as diferenças essenciais entre a anulação e a revogação de um ato administrativo, abordando motivo, competência e efeitos temporais.',
    respostaEsperada: 'Gabarito oficial: A anulação incide sobre atos ILEGAIS (com vício em seus elementos constitutivos), pode ser realizada tanto pela própria Administração (autotutela) quanto pelo Poder Judiciário (quando provocado), gerando efeitos retroativos (ex tunc). Já a revogação recai sobre atos VÁLIDOS, decorre exclusivamente de juízo de conveniência e oportunidade da própria Administração (privativo), não podendo ser realizada pelo Judiciário sobre atos alheios, e produz efeitos prospectivos, não retroativos (ex nunc), respeitando-se os direitos adquiridos.'
  },
  {
    id: 2,
    enunciado: '2. Em que consiste o princípio da autotutela administrativa e quais os limites da atuação do Poder Judiciário ao exercer o controle sobre os atos administrativos?',
    respostaEsperada: 'Gabarito oficial: O princípio da autotutela (consagrado nas Súmulas 346 e 473 do STF e no art. 53 da Lei 9.784/99) confere à Administração o poder-dever de rever seus próprios atos, anulando os eivados de vício de legalidade e revogando os inconvenientes ou inoportunos. Por sua vez, o Poder Judiciário atua sob o império da inafastabilidade da jurisdição (art. 5º, XXXV, CF/88), controlando estritamente a conformidade do ato com a Constituição e as leis (legalidade e legitimidade), sendo-lhe categoricamente vedado ingressar no mérito administrativo para substituir o administrador na escolha discricionária.'
  }
];

export const direitoAdminSummaryPoints: string[] = [
  'Controle da Administração Pública: Mecanismo para fiscalizar, acompanhar e verificar se a atuação atende à lei e ao interesse público.',
  '⭐ Controle Interno: Exercido pelo próprio Poder ou órgão sobre suas próprias unidades.',
  '⭐ Controle Externo: Realizado por órgão/Poder diverso (Poder Legislativo com auxílio do Tribunal de Contas).',
  '⭐ Controle Judicial: Focado exclusivamente na legalidade e legitimidade; depende de provocação; não invade o mérito.',
  '⭐ Autotutela: A Administração anula atos ilegais e revoga atos inoportunos.',
  '⭐ Anulação × Revogação: Anulação decorre de ILEGALIDADE (ex tunc); Revogação decorre de CONVENIÊNCIA e OPORTUNIDADE (ex nunc).',
  '⭐ Classificação Temporal: Prévio (antes do ato), Concomitante (durante a execução) e Posterior (depois de praticado).',
  '⭐ Prioridade TJAM: Interno × Externo × Judicial; Legalidade × Mérito; Anulação × Revogação; Prévio × Concomitante × Posterior.'
];
