// Data for Processo Penal — Aula 1: Princípios Fundamentais do Processo Penal
// Preparatório TJAM — Assistente Judiciário
// Conteúdo oficial da Aula 1 de Processo Penal

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
  'Direito Processual Penal: ramo do Direito que estabelece as regras e procedimentos estatais para investigar, processar e julgar infrações penais, tutelando direitos e garantias fundamentais.',
  'Devido Processo Legal (Art. 5º, LIV, CF): ninguém será privado de sua liberdade ou de seus bens sem o devido processo legal. É a cláusula geral de garantia do cidadão contra o arbítrio estatal.',
  'Contraditório (Art. 5º, LV, CF): ciência bilateral dos atos e argumentos do processo somada à possibilidade real de manifestação e reação das partes.',
  'Ampla Defesa (Art. 5º, LV, CF): utilização de todos os meios legítimos de defesa admitidos em direito. Desdobra-se em Defesa Técnica (indispensável, feita por advogado/defensor) e Autodefesa (direito de audiência e presença).',
  'Presunção de Inocência (Art. 5º, LVII, CF): ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória. Não impede prisões cautelares devidamente fundamentadas.',
  'Juiz Natural (Art. 5º, LIII e XXXVII, CF): ninguém será processado nem sentenciado senão pela autoridade competente prévia e abstratamente estabelecida; proibição expressa de tribunais de exceção.',
  'Inadmissibilidade das Provas Ilícitas (Art. 5º, LVI, CF): são inadmissíveis no processo as provas obtidas por meios ilícitos ou com violação de normas constitucionais/legais.',
  'Publicidade dos Atos Processuais (Art. 5º, LX e Art. 93, IX, CF): a publicidade é a regra geral, admitindo-se restrições legais unicamente para preservar a intimidade ou o interesse social.',
  'Fundamentação das Decisões Judiciais (Art. 93, IX, CF): sob pena de nulidade absoluta, todas as decisões judiciais devem indicar os motivos fáticos e jurídicos do convencimento.',
  'Sistema Acusatório: nítida separação das funções de acusar (Ministério Público/querelante), defender (defensor) e julgar (juiz imparcial), vedando a concentração inquisitorial.',
  'Direito ao Silêncio (Nemo Tenetur Se Detegere): garantia de não produzir prova contra si mesmo. O silêncio jamais pode ser interpretado como confissão ou culpa.',
  'Defesa Técnica: garantia irrenunciável e indispensável à validade da persecução penal, exercida por advogado habilitado ou Defensoria Pública.'
];

export const procPenalFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que estabelece o Princípio do Devido Processo Legal (Art. 5º, LIV da CF)?',
    a: 'Ninguém será privado da liberdade ou de seus bens sem o devido processo legal. Exige que a atuação do Estado observe estritamente as regras e procedimentos previamente estabelecidos em lei.'
  },
  {
    q: 'Em que consiste o Princípio do Contraditório no processo penal (Art. 5º, LV da CF)?',
    a: 'Garante que as partes tenham plena ciência de todos os atos, provas e argumentos do processo, com oportunidade real e efetiva de manifestação e reação.'
  },
  {
    q: 'Como se desdobra o Princípio da Ampla Defesa?',
    a: 'Desdobra-se em: 1) Defesa Técnica (exercida privativamente por advogado ou defensor público, indeclinável); e 2) Autodefesa (exercida pelo próprio réu, como o direito de presença e de audiência).'
  },
  {
    q: 'Até quando vigora a Presunção de Inocência segundo a CF (Art. 5º, LVII)?',
    a: 'Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória. Portanto, a mera existência de inquérito ou processo não equivale a declaração de culpa.'
  },
  {
    q: 'O que veda expressamente o Princípio do Juiz Natural?',
    a: 'Veda a criação de juízos ou tribunais de exceção (pós-fato). Determina que ninguém será processado nem sentenciado senão pela autoridade previamente competente.'
  },
  {
    q: 'São admitidas provas ilícitas no processo penal brasileiro?',
    a: 'NÃO! O art. 5º, LVI da Constituição Federal estabelece que são expressamente inadmissíveis no processo as provas obtidas por meios ilícitos.'
  },
  {
    q: 'A publicidade dos atos processuais é absoluta?',
    a: 'Não. A publicidade é a REGRA geral, mas a lei pode restringi-la quando a defesa da intimidade ou o interesse social o exigirem (Art. 5º, LX, CF).'
  },
  {
    q: 'Qual é a consequência de uma decisão judicial sem fundamentação?',
    a: 'A nulidade absoluta do ato decisório (Art. 93, IX, CF), pois a fundamentação é indispensável para o controle democrático e para o direito de recorrer.'
  },
  {
    q: 'O que caracteriza o Sistema Acusatório adotado pelo processo penal brasileiro?',
    a: 'A nítida e estrita separação entre os órgãos responsáveis pelas funções de acusar, defender e julgar, assegurando a imparcialidade do julgador.'
  },
  {
    q: 'O direito ao silêncio pode ser interpretado em desfavor do acusado?',
    a: 'NÃO! O silêncio decorre da garantia de não autoincriminação e não importa em confissão nem pode ser interpretado em prejuízo da defesa.'
  }
];

// 10 Questões de Múltipla Escolha (Parte 1)
export const procPenalMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. O princípio do devido processo legal garante que:',
    opcoes: [
      'A) O Estado pode aplicar sanções sem procedimento legal.',
      'B) Ninguém será privado da liberdade ou de seus bens sem o devido processo legal.',
      'C) Somente processos civis devem respeitar procedimentos legais.',
      'D) Toda prisão antes do trânsito em julgado é proibida.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Previsto no art. 5º, LIV, da Constituição Federal, o princípio do devido processo legal estabelece expressamente que ninguém será privado de sua liberdade ou de seus bens sem o devido processo legal.'
  },
  {
    id: 2,
    enunciado: '2. O contraditório garante às partes:',
    opcoes: [
      'A) Apenas o direito de recorrer.',
      'B) Ciência dos atos processuais e possibilidade de manifestação e reação.',
      'C) O direito de escolher o juiz.',
      'D) A utilização de qualquer meio de prova.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Previsto no art. 5º, LV, da CF, o contraditório assegura às partes a ciência dos atos processuais e a possibilidade efetiva de se manifestar e reagir.'
  },
  {
    id: 3,
    enunciado: '3. A ampla defesa compreende:',
    opcoes: [
      'A) Defesa técnica e autodefesa.',
      'B) Somente a defesa realizada pelo próprio acusado.',
      'C) Apenas a apresentação de recursos.',
      'D) Somente a produção de provas documentais.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: A ampla defesa abrange a defesa técnica (realizada por advogado ou defensor público) e a autodefesa (exercida pelo próprio acusado dentro das possibilidades legais).'
  },
  {
    id: 4,
    enunciado: '4. Ninguém será considerado culpado até:',
    opcoes: [
      'A) O recebimento da denúncia.',
      'B) A sentença de primeiro grau.',
      'C) O trânsito em julgado de sentença penal condenatória.',
      'D) O oferecimento da denúncia.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Conforme o art. 5º, LVII, da Constituição Federal, ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.'
  },
  {
    id: 5,
    enunciado: '5. O princípio do juiz natural determina que:',
    opcoes: [
      'A) O acusado escolhe seu juiz.',
      'B) Ninguém será processado ou sentenciado senão pela autoridade competente.',
      'C) Todo acusado deve ser julgado por tribunal especial.',
      'D) O juiz pode ser escolhido depois do crime.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Conforme o art. 5º, LIII, da CF, ninguém será processado nem sentenciado senão pela autoridade competente, sendo vedados juízos ou tribunais de exceção.'
  },
  {
    id: 6,
    enunciado: '6. Segundo a Constituição Federal, são inadmissíveis:',
    opcoes: [
      'A) Todas as provas testemunhais.',
      'B) Todas as provas produzidas no inquérito.',
      'C) As provas obtidas por meios ilícitos.',
      'D) Todas as provas apresentadas pela defesa.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: O art. 5º, LVI, da Constituição Federal estabelece que são inadmissíveis, no processo, as provas obtidas por meios ilícitos.'
  },
  {
    id: 7,
    enunciado: '7. No sistema acusatório:',
    opcoes: [
      'A) O juiz concentra as funções de acusar e julgar.',
      'B) Acusar, defender e julgar são funções distintas.',
      'C) Apenas o acusado pode produzir provas.',
      'D) O Ministério Público realiza o julgamento.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O sistema acusatório é marcado pela nítida separação entre as funções de acusar, defender e julgar, preservando a imparcialidade do juiz.'
  },
  {
    id: 8,
    enunciado: '8. O direito ao silêncio está relacionado:',
    opcoes: [
      'A) À obrigação de confessar.',
      'B) Ao direito de não produzir prova contra si mesmo.',
      'C) À perda do direito de defesa.',
      'D) À obrigação de responder ao interrogatório.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O direito ao silêncio decorre da garantia constitucional de que ninguém é obrigado a produzir prova contra si mesmo (nemo tenetur se detegere).'
  },
  {
    id: 9,
    enunciado: '9. A publicidade dos atos processuais:',
    opcoes: [
      'A) É sempre proibida.',
      'B) É a regra, podendo sofrer restrições previstas em lei.',
      'C) Nunca pode sofrer restrições.',
      'D) Existe somente para o Ministério Público.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Como regra geral, os atos processuais são públicos, mas a própria Constituição e a legislação admitem restrições quando necessárias à preservação da intimidade ou do interesse social.'
  },
  {
    id: 10,
    enunciado: '10. A fundamentação das decisões judiciais permite:',
    opcoes: [
      'A) Que o juiz decida sem apresentar razões.',
      'B) Que as partes conheçam os motivos da decisão.',
      'C) Que o juiz ignore a legislação.',
      'D) Que todas as decisões sejam sigilosas.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: A fundamentação permite que as partes conheçam as razões fáticas e jurídicas do julgador, viabilizando o controle da decisão e o direito ao recurso.'
  }
];

// 5 Questões Verdadeiro ou Falso (Parte 2)
export const procPenalTfQuestionsData: TfQuestionItem[] = [
  {
    id: 101,
    enunciado: '1. ( ) O contraditório permite que a parte tenha conhecimento dos atos processuais e oportunidade de se manifestar.',
    correta: true,
    explicacao: 'Verdadeiro: O contraditório assegura a ciência dos atos processuais e a possibilidade concreta de reação e manifestação das partes.'
  },
  {
    id: 102,
    enunciado: '2. ( ) A ampla defesa permite ao acusado utilizar qualquer meio de defesa, inclusive meios ilícitos.',
    correta: false,
    explicacao: 'Falso: A ampla defesa garante a utilização de meios LEGÍTIMOS necessários para a defesa; meios ilícitos são expressamente vedados pela Constituição (Art. 5º, LVI).'
  },
  {
    id: 103,
    enunciado: '3. ( ) A Constituição Federal estabelece que são inadmissíveis as provas obtidas por meios ilícitos.',
    correta: true,
    explicacao: 'Verdadeiro: Previsto expressamente no art. 5º, LVI da Constituição Federal.'
  },
  {
    id: 104,
    enunciado: '4. ( ) O princípio do juiz natural proíbe a criação de tribunal ou juízo de exceção.',
    correta: true,
    explicacao: 'Verdadeiro: A Constituição proíbe expressamente a criação de juízos ou tribunais de exceção (art. 5º, XXXVII e LIII).'
  },
  {
    id: 105,
    enunciado: '5. ( ) A presunção de inocência estabelece que ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.',
    correta: true,
    explicacao: 'Verdadeiro: Regra expressa do art. 5º, LVII, da Constituição Federal.'
  }
];

// 5 Questões Escritas com Gabarito Oficial / Respostas Esperadas (Parte 3)
export const procPenalDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 201,
    enunciado: '1. Explique, com suas palavras, o que significa o princípio do devido processo legal.',
    respostaEsperada: 'É a garantia de que ninguém será privado de sua liberdade ou de seus bens sem que seja respeitado o procedimento previsto em lei e as garantias fundamentais.'
  },
  {
    id: 202,
    enunciado: '2. Qual é a diferença entre contraditório e ampla defesa?',
    respostaEsperada: 'O contraditório garante conhecimento dos atos e possibilidade de manifestação e reação. A ampla defesa garante ao acusado os meios legítimos para exercer sua defesa, incluindo defesa técnica e autodefesa.'
  },
  {
    id: 203,
    enunciado: '3. Explique o que significa presunção de inocência no processo penal.',
    respostaEsperada: 'Significa que ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.'
  },
  {
    id: 204,
    enunciado: '4. Explique o que é o sistema acusatório e qual é a importância da separação entre acusação, defesa e julgamento.',
    respostaEsperada: 'É a estrutura em que as funções de acusar, defender e julgar são separadas. Essa divisão busca preservar a imparcialidade do julgador e garantir um processo equilibrado.'
  },
  {
    id: 205,
    enunciado: '5. Um indivíduo está sendo processado criminalmente e decide permanecer em silêncio durante seu interrogatório. Explique qual garantia constitucional está relacionada a essa situação e por que ela é importante no processo penal.',
    respostaEsperada: 'Está relacionado ao direito ao silêncio e à garantia de não produzir prova contra si mesmo. O acusado não é obrigado a contribuir para sua própria incriminação por meio de declarações.'
  }
];

// Estudo Prático de Caso de Princípios Fundamentais
export interface PracticalVideoCase {
  titulo: string;
  caso: string;
  perguntas: string[];
  desafioOral: string;
  tempoSugerido: string;
  criteriosAvaliacao: string[];
}

export const procPenalPracticalCase: PracticalVideoCase = {
  titulo: 'Atividade Prática: "Aplicação dos Princípios Fundamentais"',
  caso: 'Durante uma operação, a polícia interceptou conversas telefônicas sem autorização judicial prévia e, com base nelas, prendeu Carlos em flagrante. Na delegacia, Carlos optou por permanecer em silêncio e solicitou a presença de um defensor público, tendo seu pedido inicialmente postergado sob o argumento de que a autoridade policial precisava concluir o relatório com urgência.',
  perguntas: [
    '1. As provas obtidas pela interceptação telefônica sem autorização judicial são válidas? Qual princípio fundamental foi violado?',
    '2. O fato de Carlos ter permanecido em silêncio pode ser considerado como confissão de culpa pela autoridade?',
    '3. A negativa ou adiamento de assistência por defensor público fere qual vertente da ampla defesa?',
    '4. Qual é a importância da observância estrita do devido processo legal nesse caso?'
  ],
  desafioOral: 'Grave um áudio ou vídeo de 2 a 3 minutos explicando com suas palavras a importância do sistema acusatório e por que a separação entre quem acusa e quem julga protege o cidadão.',
  tempoSugerido: '3 a 5 minutos',
  criteriosAvaliacao: [
    'Domínio dos princípios constitucionais aplicáveis',
    'Clareza e fundamentação jurídica nos artigos da CF/88',
    'Capacidade de síntese e expressão oral',
    'Respeito às regras do sistema acusatório'
  ]
};
