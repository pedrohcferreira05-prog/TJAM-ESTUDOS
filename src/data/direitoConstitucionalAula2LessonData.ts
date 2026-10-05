// Data for Direito Constitucional — Aula 02: Direitos e Garantias Fundamentais (Art. 5º da CF/88)
// Nível Intermediário — TJAM Assistente Judiciário

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
  opcoes?: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
  explicacao: string;
}

export interface TfQuestionItem {
  id: number;
  enunciado: string;
  statement?: string;
  correta: boolean;
  isTrue?: boolean;
  explicacao: string;
}

export interface DiscursiveQuestionItem {
  id: number;
  enunciado: string;
  respostaEsperada: string;
}

export interface PracticalTaskConfig {
  scenario: string;
  instruction: string;
  selectedRightsExamples: Array<{
    nome: string;
    significado: string;
    situacaoPratica: string;
    condutaServidor: string;
  }>;
}

// 10 Flashcards de Fixação Rápida — Aula 02: Direitos e Garantias Fundamentais
export const direitoConstAula2FlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'Qual é a diferença fundamental entre "Direito Fundamental" e "Garantia Fundamental"?',
    a: '• Direito Fundamental: é o bem jurídico, a prerrogativa material protegida (ex.: direito à liberdade de locomoção, direito à intimidade).\n• Garantia Fundamental: é o instrumento ou remédio jurídico processual destinado a assegurar, proteger ou tornar efetivo determinado direito violado (ex.: habeas corpus, mandado de segurança).'
  },
  {
    id: 2,
    q: 'Quais são os 5 direitos expressamente previstos no caput do art. 5º da CF/88?',
    a: 'O caput garante aos brasileiros e estrangeiros residentes no País a inviolabilidade do direito à:\n1. VIDA\n2. LIBERDADE\n3. IGUALDADE\n4. SEGURANÇA\n5. PROPRIEDADE\n(Mnemônico: V-L-I-S-P).'
  },
  {
    id: 3,
    q: 'O que diz a CF/88 sobre a Liberdade de Manifestação do Pensamento?',
    a: 'A manifestação do pensamento é livre, mas É VEDADO O ANONIMATO (art. 5º, IV). Quem manifesta sua opinião deve assumir sua identidade e eventual responsabilidade civil ou penal por danos causados.'
  },
  {
    id: 4,
    q: 'Quais são os 4 requisitos constitucionais para o Direito de Reunião (Art. 5º, XVI)?',
    a: '1. Fins pacíficos;\n2. Sem armas;\n3. Em locais abertos ao público;\n4. Prévio aviso à autoridade competente (independe de autorização prévia; não pode frustrar outra reunião convocada para o mesmo local).'
  },
  {
    id: 5,
    q: 'Quais são as 4 exceções constitucionais à Inviolabilidade do Domicílio (Art. 5º, XI)?',
    a: 'A casa é asilo inviolável. Exceções sem consentimento do morador:\n• A QUALQUER HORA (dia ou noite): 1) Flagrante delito; 2) Desastre; 3) Prestação de socorro.\n• APENAS DURANTE O DIA: 4) Por determinação judicial (mandado).'
  },
  {
    id: 6,
    q: 'Qual é a finalidade constitucional do Habeas Corpus (HC)?',
    a: 'Conceder-se-á Habeas Corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua LIBERDADE DE LOCOMOÇÃO (ir, vir e permanecer), por ilegalidade ou abuso de poder (art. 5º, LXVIII).'
  },
  {
    id: 7,
    q: 'Para que serve o Habeas Data (HD) (Art. 5º, LXXII)?',
    a: 'Destina-se a:\na) assegurar o conhecimento de informações relativas à pessoa do impetrante constantes de registros públicos;\nb) retificação de dados pessoais quando não se prefira fazê-lo por processo sigiloso.'
  },
  {
    id: 8,
    q: 'O que protege o Mandado de Segurança (MS) e qual seu caráter residual?',
    a: 'Protege DIREITO LÍQUIDO E CERTO, não amparado por Habeas Corpus ou Habeas Data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público (art. 5º, LXIX).'
  },
  {
    id: 9,
    q: 'Quando cabe o Mandado de Injunção (MI) (Art. 5º, LXXI)?',
    a: 'Concede-se MI sempre que a FALTA DE NORMA REGULAMENTADORA torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania.'
  },
  {
    id: 10,
    q: 'Quem tem legitimidade para propor a Ação Popular e quais os bens protegidos (Art. 5º, LXXIII)?',
    a: 'Qualquer CIDADÃO (eleitor com título regular). Destina-se a anular ato lesivo ao: 1) patrimônio público ou de entidade de que o Estado participe; 2) à moralidade administrativa; 3) ao meio ambiente; e 4) ao patrimônio histórico e cultural.'
  }
];

// Pontos de Resumo da Aula 02 de Direito Constitucional
export const direitoConstAula2SummaryPoints: string[] = [
  'Direito x Garantia: O Direito é a declaração substantiva da prerrogativa (ex.: vida, locomoção); a Garantia é o instrumento adjetivo assecuratório (ex.: remédios constitucionais).',
  'Caput do Art. 5º: Igualdade perante a lei e proteção a cinco bens fundamentais: Vida, Liberdade, Igualdade, Segurança e Propriedade (estendido pelo STF também a estrangeiros não residentes).',
  'Liberdade com Responsabilidade: É assegurada a manifestação do pensamento, sendo expressamente VEDADO O ANONIMATO.',
  'Reunião: Exige apenas PRÉVIO AVISO à autoridade competente, dispensando qualquer autorização estatal prévia (desde que pacífica, sem armas e sem frustrar reunião anterior).',
  'Domicílio como Asilo Inviolável: Flagrante delito, desastre e socorro a qualquer hora; mandado judicial SOMENTE DURANTE O DIA.',
  'Sigilo das Comunicações: Interceptação telefônica exige ordem judicial fundamentada, lei específica e finalidade de investigação criminal ou instrução processual penal.',
  'Tabela dos Remédios Constitucionais: HC (locomoção), HD (dados pessoais), MS (direito líquido e certo residual), MI (omissão legislativa/falta de norma regulamentadora) e Ação Popular (cidadão em defesa da moralidade e patrimônio público).',
  'Postura do Servidor TJAM: Tratar todos os jurisdicionados com estrita igualdade, sem discriminações, com linguagem simples e resguardando informações sob sigilo judicial.'
];

// 10 Questões Objetivas Oficiais (Parte 1: 1 a 10)
export const direitoConstAula2McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. De acordo com a Constituição Federal, são direitos fundamentais expressamente assegurados no caput do art. 5º:',
    alternativas: [
      'A) vida, liberdade, igualdade, segurança e propriedade.',
      'B) saúde, educação, moradia, trabalho e lazer.',
      'C) alimentação, transporte, previdência e segurança.',
      'D) soberania, cidadania, dignidade e pluralismo político.',
      'E) apenas vida, liberdade e propriedade.'
    ],
    opcoes: [
      'A) vida, liberdade, igualdade, segurança e propriedade.',
      'B) saúde, educação, moradia, trabalho e lazer.',
      'C) alimentação, transporte, previdência e segurança.',
      'D) soberania, cidadania, dignidade e pluralismo político.',
      'E) apenas vida, liberdade e propriedade.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: O caput do art. 5º da CF/88 dispõe expressamente: "Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade". A alternativa B cita direitos sociais (art. 6º) e a D cita fundamentos da República (art. 1º).'
  },
  {
    id: 2,
    enunciado: '2. Sobre a manifestação do pensamento, a Constituição Federal estabelece que:',
    alternativas: [
      'A) é livre, inclusive sob anonimato.',
      'B) depende de autorização estatal.',
      'C) é livre, sendo vedado o anonimato.',
      'D) somente pode ocorrer por escrito.',
      'E) depende de autorização judicial prévia.'
    ],
    opcoes: [
      'A) é livre, inclusive sob anonimato.',
      'B) depende de autorização estatal.',
      'C) é livre, sendo vedado o anonimato.',
      'D) somente pode ocorrer por escrito.',
      'E) depende de autorização judicial prévia.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Conforme o art. 5º, IV, da CF/88: "é livre a manifestação do pensamento, sendo vedado o anonimato". Essa vedação visa possibilitar o direito de resposta e a responsabilização civil ou criminal por eventuais excessos e ofensas.'
  },
  {
    id: 3,
    enunciado: '3. O direito de reunião previsto na Constituição exige que a reunião seja:',
    alternativas: [
      'A) autorizada previamente pelo Poder Público.',
      'B) pacífica e sem armas, com prévio aviso à autoridade competente.',
      'C) realizada exclusivamente em locais privados.',
      'D) previamente autorizada pelo Poder Judiciário.',
      'E) realizada somente por associação formalmente constituída.'
    ],
    opcoes: [
      'A) autorizada previamente pelo Poder Público.',
      'B) pacífica e sem armas, com prévio aviso à autoridade competente.',
      'C) realizada exclusivamente em locais privados.',
      'D) previamente autorizada pelo Poder Judiciário.',
      'E) realizada somente por associação formalmente constituída.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: De acordo com o art. 5º, XVI, todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo apenas exigido prévio aviso à autoridade competente.'
  },
  {
    id: 4,
    enunciado: '4. A respeito da inviolabilidade do domicílio, é correto afirmar que:',
    alternativas: [
      'A) ninguém pode ingressar na casa de alguém em nenhuma circunstância.',
      'B) mandado judicial permite ingresso a qualquer hora.',
      'C) em caso de flagrante delito, é possível ingressar no domicílio sem consentimento do morador.',
      'D) somente o proprietário pode autorizar a entrada.',
      'E) desastre não constitui exceção à inviolabilidade.'
    ],
    opcoes: [
      'A) ninguém pode ingressar na casa de alguém em nenhuma circunstância.',
      'B) mandado judicial permite ingresso a qualquer hora.',
      'C) em caso de flagrante delito, é possível ingressar no domicílio sem consentimento do morador.',
      'D) somente o proprietário pode autorizar a entrada.',
      'E) desastre não constitui exceção à inviolabilidade.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Segundo o art. 5º, XI, da CF/88, a casa é asilo inviolável, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.'
  },
  {
    id: 5,
    enunciado: '5. O remédio constitucional destinado à proteção da liberdade de locomoção é:',
    alternativas: [
      'A) mandado de segurança.',
      'B) habeas data.',
      'C) mandado de injunção.',
      'D) habeas corpus.',
      'E) ação popular.'
    ],
    opcoes: [
      'A) mandado de segurança.',
      'B) habeas data.',
      'C) mandado de injunção.',
      'D) habeas corpus.',
      'E) ação popular.'
    ],
    correta: 3, // D
    explicacao: 'Gabarito D: O art. 5º, LXVIII, determina que "conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder".'
  },
  {
    id: 6,
    enunciado: '6. O habeas data destina-se, entre outras finalidades, a:',
    alternativas: [
      'A) proteger a liberdade de locomoção.',
      'B) conhecer informações relativas à pessoa do impetrante constantes de registros ou bancos de dados.',
      'C) anular ato lesivo ao patrimônio público.',
      'D) proteger qualquer direito líquido e certo.',
      'E) regulamentar norma constitucional inexistente.'
    ],
    opcoes: [
      'A) proteger a liberdade de locomoção.',
      'B) conhecer informações relativas à pessoa do impetrante constantes de registros ou bancos de dados.',
      'C) anular ato lesivo ao patrimônio público.',
      'D) proteger qualquer direito líquido e certo.',
      'E) regulamentar norma constitucional inexistente.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O Habeas Data (art. 5º, LXXII, "a") destina-se expressamente a assegurar o conhecimento de informações relativas à pessoa do impetrante, constantes de registros ou bancos de dados de entidades governamentais ou de caráter público.'
  },
  {
    id: 7,
    enunciado: '7. O mandado de segurança é utilizado para proteger:',
    alternativas: [
      'A) exclusivamente a liberdade de locomoção.',
      'B) exclusivamente informações pessoais.',
      'C) direito líquido e certo, quando não for caso de habeas corpus ou habeas data.',
      'D) somente direitos políticos.',
      'E) apenas direitos coletivos.'
    ],
    opcoes: [
      'A) exclusivamente a liberdade de locomoção.',
      'B) exclusivamente informações pessoais.',
      'C) direito líquido e certo, quando não for caso de habeas corpus ou habeas data.',
      'D) somente direitos políticos.',
      'E) apenas direitos coletivos.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: O Mandado de Segurança (art. 5º, LXIX) protege direito líquido e certo, não amparado por habeas corpus ou habeas data, possuindo natureza residual.'
  },
  {
    id: 8,
    enunciado: '8. O mandado de injunção é cabível quando:',
    alternativas: [
      'A) alguém sofre ameaça à liberdade de locomoção.',
      'B) existe falta de norma regulamentadora que inviabiliza o exercício de direito ou liberdade constitucional.',
      'C) alguém deseja corrigir informação em banco de dados público.',
      'D) existe ato lesivo ao patrimônio público.',
      'E) há necessidade de autorização judicial para reunião.'
    ],
    opcoes: [
      'A) alguém sofre ameaça à liberdade de locomoção.',
      'B) existe falta de norma regulamentadora que inviabiliza o exercício de direito ou liberdade constitucional.',
      'C) alguém deseja corrigir informação em banco de dados público.',
      'D) existe ato lesivo ao patrimônio público.',
      'E) há necessidade de autorização judicial para reunião.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Conforme o art. 5º, LXXI, concede-se mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania.'
  },
  {
    id: 9,
    enunciado: '9. Sobre o direito de associação, a Constituição Federal estabelece que:',
    alternativas: [
      'A) ninguém pode deixar uma associação depois de ingressar nela.',
      'B) a associação para fins lícitos é permitida e ninguém pode ser obrigado a associar-se ou permanecer associado.',
      'C) toda associação depende de autorização judicial.',
      'D) somente servidores públicos podem formar associações.',
      'E) associações podem ter qualquer finalidade, inclusive ilícita.'
    ],
    opcoes: [
      'A) ninguém pode deixar uma associação depois de ingressar nela.',
      'B) a associação para fins lícitos é permitida e ninguém pode ser obrigado a associar-se ou permanecer associado.',
      'C) toda associação depende de autorização judicial.',
      'D) somente servidores públicos podem formar associações.',
      'E) associações podem ter qualquer finalidade, inclusive ilícita.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O art. 5º, XVII e XX, da CF/88 consagra que é plena a liberdade de associação para fins lícitos (vedada a de caráter paramilitar) e que "ninguém poderá ser compelido a associar-se ou a permanecer associado".'
  },
  {
    id: 10,
    enunciado: '10. A ação popular pode ser utilizada pelo cidadão para buscar a anulação de ato lesivo, entre outros, ao:',
    alternativas: [
      'A) patrimônio público e à moralidade administrativa.',
      'B) patrimônio exclusivamente particular.',
      'C) interesse exclusivamente individual.',
      'D) direito de locomoção.',
      'E) sigilo telefônico.'
    ],
    opcoes: [
      'A) patrimônio público e à moralidade administrativa.',
      'B) patrimônio exclusivamente particular.',
      'C) interesse exclusivamente individual.',
      'D) direito de locomoção.',
      'E) sigilo telefônico.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: O art. 5º, LXXIII, prevê que qualquer cidadão é parte legítima para propor ação popular que vise a anular ato lesivo ao patrimônio público ou de entidade de que o Estado participe, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural.'
  }
];

// 5 Questões Certo ou Errado (Parte 2: 11 a 15) — Estilo Cebraspe
export const direitoConstAula2TfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A Constituição Federal assegura a igualdade de todos perante a lei, sem distinção de qualquer natureza.',
    statement: 'A Constituição Federal assegura a igualdade de todos perante a lei, sem distinção de qualquer natureza.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: É a literalidade do caput do art. 5º: "Todos são iguais perante a lei, sem distinção de qualquer natureza...".'
  },
  {
    id: 12,
    enunciado: '12. O direito de reunião depende de autorização prévia da autoridade competente.',
    statement: 'O direito de reunião depende de autorização prévia da autoridade competente.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: O art. 5º, XVI, afirma expressamente que a reunião independe de autorização; exige-se unicamente "prévio aviso" para que o Poder Público organize o trânsito e a segurança.'
  },
  {
    id: 13,
    enunciado: '13. A Constituição permite o ingresso em domicílio, sem consentimento do morador, em caso de flagrante delito.',
    statement: 'A Constituição permite o ingresso em domicílio, sem consentimento do morador, em caso de flagrante delito.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: O flagrante delito é uma das exceções constitucionais expressas no art. 5º, XI, podendo ocorrer tanto durante o dia quanto durante a noite.'
  },
  {
    id: 14,
    enunciado: '14. O habeas corpus é destinado à proteção do direito de propriedade contra qualquer forma de violação.',
    statement: 'O habeas corpus é destinado à proteção do direito de propriedade contra qualquer forma de violação.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: O habeas corpus destina-se exclusivamente à proteção da liberdade de locomoção (direito de ir, vir e ficar). A propriedade é tutelada por ações possessórias, mandado de segurança ou vias ordinárias.'
  },
  {
    id: 15,
    enunciado: '15. Ninguém pode ser obrigado a associar-se ou a permanecer associado.',
    statement: 'Ninguém pode ser obrigado a associar-se ou a permanecer associado.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: É a redação exata do art. 5º, XX, da CF/88, consagrando a dimensão negativa da liberdade de associação.'
  }
];

// 5 Questões Dissertativas Oficiais (Parte 3: 16 a 20) com Espelho Oficial TJAM
export const direitoConstAula2DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique a diferença entre direitos fundamentais e garantias fundamentais, apresentando um exemplo.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• Direitos Fundamentais: Possuem caráter declaratório e substancial; representam a vantagem, a prerrogativa jurídica ou o bem da vida assegurado pela ordem constitucional (ex.: direito à liberdade de locomoção, direito à intimidade, direito de propriedade).\n• Garantias Fundamentais: Possuem caráter assecuratório e instrumental; constituem os mecanismos, remédios processuais e ferramentas previstos na Constituição para proteger, defender ou restaurar determinado direito quando ameaçado ou violado (ex.: Habeas Corpus para assegurar a liberdade de locomoção; Mandado de Segurança para proteger direito líquido e certo).'
  },
  {
    id: 17,
    enunciado: '17. Explique o princípio da igualdade previsto no art. 5º da Constituição Federal e sua importância para o atendimento ao cidadão.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nO princípio da igualdade (isonomia) estabelece que todos são iguais perante a lei, vedando discriminações arbitrárias, perseguições ou concessão de privilégios odiosos pelo Estado. Desdobra-se em:\n1) Igualdade formal: aplicação uniforme da lei a todos os indivíduos;\n2) Igualdade material: tratar igualmente os iguais e desigualmente os desiguais, na medida de suas desigualdades (justificando, por exemplo, atendimento prioritário a idosos e pessoas com deficiência).\n• Para o servidor do TJAM: O atendimento no balcão e no cartório deve ser pautado pela impessoalidade, cordialidade e respeito recíproco, sendo terminantemente proibido preterir ou discriminar qualquer cidadão em razão de sua raça, credo, condição socioeconômica ou orientação política.'
  },
  {
    id: 18,
    enunciado: '18. Explique as hipóteses constitucionais que permitem o ingresso em uma residência sem o consentimento do morador.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nNos termos do art. 5º, XI, da CF/88, a casa é asilo inviolável do indivíduo, e ninguém nela pode penetrar sem o consentimento do morador, salvo em 4 hipóteses taxativas:\n1. A qualquer hora do dia ou da noite: em caso de flagrante delito;\n2. A qualquer hora do dia ou da noite: em caso de desastre;\n3. A qualquer hora do dia ou da noite: para prestar socorro;\n4. Somente durante o dia: por determinação judicial (cumprimento de mandado de busca e apreensão ou prisão expedido por magistrado competente).'
  },
  {
    id: 19,
    enunciado: '19. Diferencie habeas corpus, habeas data e mandado de segurança, indicando qual direito ou situação cada um protege.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• Habeas Corpus (HC): Protege exclusivamente a liberdade de locomoção (direito de ir, vir e permanecer) contra violência, coação ilegal ou abuso de poder praticado por autoridade pública ou particular.\n• Habeas Data (HD): Protege o direito de acesso à informação personalíssima (dados relativos à própria pessoa do impetrante) constantes de registros ou bancos de dados públicos ou governamentais, bem como a retificação desses dados.\n• Mandado de Segurança (MS): Protege direito líquido e certo (aquele comprovável de plano por prova pré-constituída) que não seja tutelado nem por HC nem por HD, caracterizando-se por sua natureza residual diante de atos ilegais de autoridade pública.'
  },
  {
    id: 20,
    enunciado: '20. Um cidadão procura uma unidade do TJAM para obter informações sobre determinado procedimento. O servidor se recusa a atendê-lo exclusivamente por causa de sua condição pessoal, sem qualquer justificativa legal. Analise a situação à luz dos direitos e garantias fundamentais estudados.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA conduta do servidor é manifestamente inconstitucional, ilícita e violadora de diversos preceitos fundamentais da CF/88:\n1. Violação ao Princípio da Igualdade (Art. 5º, caput e I): Todos são iguais perante a lei, vedando-se qualquer distinção odiosa ou negativa de atendimento fundamentada em preconceito ou condição socioeconômica;\n2. Violação à Dignidade da Pessoa Humana (Art. 1º, III): O atendimento desrespeitoso agride a consideração ética devida a qualquer ser humano perante o Poder Judiciário;\n3. Violação ao Direito de Acesso à Informação e Peticionamento (Art. 5º, XXXIII e XXXIV, "a"): É assegurado a todos o direito de obter certidões e informações de interesse particular ou coletivo junto às repartições públicas;\n4. Responsabilidade Funcional: Tal conduta sujeita o servidor a processo administrativo disciplinar (PAD) por quebra dos deveres de urbanidade e impessoalidade, além de eventual improbidade administrativa.'
  }
];

// Atividade Prática Oficial para Enviar ao Professor
export const direitoConstAula2PracticalTask: PracticalTaskConfig = {
  scenario: 'Imagine que você é servidor do TJAM e atende um cidadão que não conhece seus direitos constitucionais.',
  instruction: 'Escolha 3 direitos ou garantias fundamentais estudados nesta aula e explique, para cada um: 1) O que significa; 2) Qual situação prática poderia envolver esse direito; 3) Como um servidor público deve respeitá-lo. Envie sua resposta pelo WhatsApp ao professor com seu nome, turma e identificação da Aula 02 de Direito Constitucional.',
  selectedRightsExamples: [
    {
      nome: 'Princípio da Igualdade e Não Discriminação (Art. 5º, caput)',
      significado: 'Garante que todos os cidadãos devem receber o mesmo tratamento digno perante a lei e nos órgãos do Poder Público, sem privilégios ou preconceitos.',
      situacaoPratica: 'Um jurisdicionado em situação de vulnerabilidade comparece ao balcão com roupas simples buscando orientações sobre uma audiência.',
      condutaServidor: 'O assistente judiciário deve prestar atendimento com a mesma solicitude, respeito e atenção dispensados aos advogados ou autoridades, utilizando linguagem acessível e clara.'
    },
    {
      nome: 'Direito à Inviolabilidade da Intimidade e Sigilo (Art. 5º, X e LX)',
      significado: 'Protege a privacidade das partes, impedindo a divulgação pública indevida de dados íntimos ou processos em segredo de justiça.',
      situacaoPratica: 'Um terceiro curioso solicita consultar os autos de uma ação de alimentos ou processo de família no balcão do cartório.',
      condutaServidor: 'O servidor deve verificar os autos e, constatando o segredo de justiça, negar o acesso a terceiros estranhos à lide, preservando o sigilo legal e a intimidade das partes.'
    },
    {
      nome: 'Direito de Petição e Acesso à Informação (Art. 5º, XXXIII e XXXIV)',
      significado: 'Assegura a todos o direito de receber dos órgãos públicos informações de seu interesse particular ou coletivo, bem como certidões para defesa de direitos.',
      situacaoPratica: 'Uma cidadã precisa de certidão narrativa sobre a tramitação de seu processo para apresentar em um concurso público.',
      condutaServidor: 'O servidor deve autuar o requerimento, orientar com presteza os prazos de expedição e emitir o documento dentro do prazo legal sem criar entraves burocráticos desnecessários.'
    }
  ]
};
