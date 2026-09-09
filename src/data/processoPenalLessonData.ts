// Data for Processo Penal — Aula 1: Inquérito Policial (Conceito, Finalidade e Características)
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
  'Inquérito Policial (IP): procedimento de investigação utilizado para apurar uma infração penal e sua autoria, servindo de base para atuação do Ministério Público ou do ofendido.',
  'Finalidade do IP: investigar o fato criminoso (o que aconteceu, como aconteceu, quem praticou, circunstâncias e provas). Inquérito = investigação.',
  'Quem conduz: realizado pela polícia judiciária, sob condução da autoridade policial (delegado), conforme a competência legal.',
  'Característica 1 — Administrativo: é um procedimento investigativo pré-processual, NÃO um processo judicial.',
  'Característica 2 — Investigativo: busca reunir elementos informativos sobre a infração e sua autoria.',
  'Característica 3 — Escrito: as peças do inquérito são reduzidas a escrito ou datilografadas (Art. 9º do CPP).',
  'Característica 4 — Dispensável: a ação penal pode ser proposta sem inquérito se já existirem elementos suficientes (justa causa).',
  'Característica 5 — Sigiloso: sigilo necessário à eficácia da investigação, ressalvado o direito de acesso do defensor às provas já documentadas (Súmula Vinculante 14 do STF).',
  'Característica 6 — Não é sentença: o inquérito não condena nem absolve ninguém.',
  'Início em crimes de Ação Pública: de ofício pela autoridade policial; por requisição judicial ou do MP; por requerimento da vítima; ou notitia criminis por qualquer pessoa.',
  'Ação Pública Condicionada: NÃO pode ser iniciado sem a prévia representação do ofendido.',
  'Ação Privada: somente pode ser instaurado mediante requerimento de quem tenha legitimidade para propor a queixa-crime.',
  'Providências do Art. 6º do CPP: preservar local, apreender objetos, colher provas, ouvir vítima e indiciado, reconhecimento, acareações, perícias/corpo de delito e identificar o indiciado.',
  'Prazos gerais do CPP (Art. 10): Preso = 10 dias (a partir da execução da prisão preventiva); Solto = 30 dias (mediante fiança ou sem ela).',
  'Artigos fundamentais para a prova do TJAM: Arts. 4º, 5º, 6º, 9º e 10 do CPP.'
];

export const procPenalFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que é o Inquérito Policial (IP) e qual sua base jurídica?',
    a: 'O inquérito policial é um procedimento administrativo preparatório e investigativo conduzido pela polícia judiciária, cuja finalidade é apurar a infração penal e sua autoria para subsidiar a ação penal do MP ou da vítima (Art. 4º do CPP).'
  },
  {
    q: 'Qual é a principal finalidade do Inquérito Policial?',
    a: 'Investigar o fato criminoso, reunindo elementos essenciais: o que aconteceu, como aconteceu, quem praticou (autoria) e a materialidade delitiva (provas). Inquérito = investigação.'
  },
  {
    q: 'Quem conduz o inquérito policial e qual é a sua natureza?',
    a: 'É conduzido pela autoridade policial (delegado de carreira da polícia judiciária). Trata-se de um procedimento ADMINISTRATIVO preliminar, e não de um processo judicial.'
  },
  {
    q: 'Por que o inquérito policial é considerado dispensável?',
    a: 'Porque a ação penal pode ser proposta diretamente pelo titular (MP ou querelante) caso já existam elementos e provas suficientes de autoria e materialidade (justa causa), sem necessidade prévia do inquérito.'
  },
  {
    q: 'O inquérito policial pode condenar ou absolver o investigado?',
    a: 'NÃO! O inquérito policial não é sentença, não julga, não condena e não absolve ninguém. É mero procedimento investigativo para colheita de elementos.'
  },
  {
    q: 'O inquérito policial é oral ou escrito?',
    a: 'É estritamente ESCRITO. Todas as peças e atos do inquérito policial serão reduzidos a escrito ou datilografados e rubricados pela autoridade (Art. 9º do CPP).'
  },
  {
    q: 'Como funciona o sigilo no inquérito policial?',
    a: 'A autoridade assegurará o sigilo necessário à elucidação do fato ou exigido pelo interesse da sociedade (Art. 20, CPP), garantindo-se ao defensor amplo acesso aos elementos de prova já documentados (Súmula Vinculante 14).'
  },
  {
    q: 'Como pode ser instaurado o inquérito nos crimes de ação penal pública incondicionada?',
    a: 'De ofício pela autoridade policial; mediante requisição do juiz ou do Ministério Público; ou a requerimento do ofendido / representante legal (Art. 5º, I e II, CPP).'
  },
  {
    q: 'O inquérito pode ser instaurado sem representação nos crimes de ação pública condicionada?',
    a: 'NÃO! Nos crimes de ação pública condicionada, o inquérito NÃO PODE ser iniciado sem a prévia representação da vítima ou de seu representante legal (Art. 5º, § 4º, CPP).'
  },
  {
    q: 'Como se inicia o inquérito policial nos crimes de ação penal privada?',
    a: 'Apenas mediante requerimento formal de quem tenha legitimidade para propor a ação penal privada / queixa-crime (Art. 5º, § 5º, CPP).'
  },
  {
    q: 'Quais providências a autoridade policial deve adotar segundo o Art. 6º do CPP?',
    a: 'Preservar o local do crime, apreender objetos (após perícia), colher provas, ouvir vítima e indiciado, proceder a reconhecimentos e acareações, e determinar exame de corpo de delito.'
  },
  {
    q: 'Qual o prazo geral do CPP para conclusão do inquérito com o indiciado PRESO?',
    a: '10 dias, improrrogáveis, contados a partir do dia em que se executar a ordem de prisão (Art. 10 do CPP).'
  },
  {
    q: 'Qual o prazo geral do CPP para conclusão do inquérito com o indiciado SOLTO?',
    a: '30 dias, podendo ser prorrogado pelo juiz a requerimento da autoridade policial quando o fato for de difícil elucidação (Art. 10 do CPP).'
  },
  {
    q: 'Qualquer pessoa do povo pode comunicar uma infração à autoridade policial?',
    a: 'SIM! Qualquer pessoa que tiver conhecimento da existência de infração em que caiba ação pública poderá comunicá-la à autoridade policial (notitia criminis, Art. 5º, § 3º, CPP).'
  },
  {
    q: 'Quais os artigos mais cobrados no concurso do TJAM sobre inquérito policial?',
    a: 'Artigos 4º (competência da polícia judiciária), 5º (formas de instauração), 6º (diligências policiais), 9º (forma escrita) e 10 (prazos de 10 e 30 dias).'
  }
];

export const procPenalMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A principal finalidade do inquérito policial é:',
    opcoes: [
      'A) Aplicar pena ao investigado',
      'B) Apurar a infração penal e sua autoria',
      'C) Julgar o acusado',
      'D) Determinar a sentença'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Conforme o Art. 4º do CPP e a doutrina processual penal, o inquérito policial tem como precípua finalidade a apuração da infração penal e de sua respectiva autoria, fornecendo elementos para a ação penal.'
  },
  {
    id: 2,
    enunciado: '2. O inquérito policial é considerado, em regra:',
    opcoes: [
      'A) Processo judicial',
      'B) Procedimento administrativo investigativo',
      'C) Ação penal',
      'D) Sentença criminal'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O inquérito policial não é processo nem ação judicial; é um procedimento puramente administrativo de caráter investigatório e informativo preliminar.'
  },
  {
    id: 3,
    enunciado: '3. A condução do inquérito policial cabe, em regra:',
    opcoes: [
      'A) Ao juiz',
      'B) Ao Ministério Público',
      'C) À autoridade policial',
      'D) Ao defensor público'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Nos termos do Art. 4º do CPP, a polícia judiciária será exercida pelas autoridades policiais no território de suas respectivas circunscrições e terá por fim a apuração das infrações penais.'
  },
  {
    id: 4,
    enunciado: '4. Sobre o inquérito policial, é correto afirmar que:',
    opcoes: [
      'A) Sempre é indispensável para iniciar a ação penal',
      'B) Pode ser dispensável quando já existirem elementos suficientes para a ação penal',
      'C) É obrigatório em qualquer situação',
      'D) Produz automaticamente uma condenação'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O inquérito policial é dispensável: se o titular da ação penal (Ministério Público ou querelante) já dispuser de elementos suficientes sobre a autoria e materialidade, poderá ajuizar a denúncia ou queixa de pronto.'
  },
  {
    id: 5,
    enunciado: '5. Uma característica tradicional do inquérito policial é ser:',
    opcoes: [
      'A) Público em qualquer circunstância',
      'B) Sigiloso quando o sigilo for necessário à investigação',
      'C) Oral',
      'D) Judicial'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Nos termos do Art. 20 do CPP, a autoridade assegurará no inquérito o sigilo necessário à elucidação do fato ou exigido pelo interesse da sociedade.'
  },
  {
    id: 6,
    enunciado: '6. As peças do inquérito policial devem ser:',
    opcoes: [
      'A) Sempre exclusivamente orais',
      'B) Reduzidas a escrito',
      'C) Produzidas somente pelo juiz',
      'D) Elaboradas apenas pelo Ministério Público'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Art. 9º do CPP: "Todas as peças do inquérito policial serão, num só processado, reduzidas a escrito ou datilografadas e, neste caso, rubricadas pela autoridade".'
  },
  {
    id: 7,
    enunciado: '7. Nos crimes de ação pública, o inquérito pode ser iniciado:',
    opcoes: [
      'A) Somente por decisão judicial',
      'B) De ofício pela autoridade policial, nas hipóteses legais',
      'C) Somente pelo defensor',
      'D) Somente pela vítima'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Conforme o Art. 5º, I do CPP, nos crimes de ação pública o inquérito policial será iniciado de ofício pela própria autoridade policial.'
  },
  {
    id: 8,
    enunciado: '8. Nos crimes de ação pública condicionada à representação, o inquérito policial:',
    opcoes: [
      'A) Pode ser instaurado sem representação',
      'B) Depende da representação quando esta for exigida por lei',
      'C) Nunca pode ser instaurado',
      'D) Depende exclusivamente do juiz'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Art. 5º, § 4º do CPP: "O inquérito, nos crimes em que a ação pública depender de representação, não poderá sem ela ser iniciado".'
  },
  {
    id: 9,
    enunciado: '9. Nos crimes de ação privada, a autoridade policial poderá proceder ao inquérito:',
    opcoes: [
      'A) De ofício, sempre',
      'B) Mediante requerimento de quem tenha legitimidade',
      'C) Somente por determinação do juiz',
      'D) Somente por determinação do Ministério Público'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Art. 5º, § 5º do CPP: "Nos crimes de ação privada, a autoridade policial somente poderá proceder a inquérito a requerimento de quem tenha qualidade para intentá-la".'
  },
  {
    id: 10,
    enunciado: '10. Durante o inquérito, a autoridade policial pode:',
    opcoes: [
      'A) Aplicar pena criminal',
      'B) Colher provas e ouvir o ofendido e o indiciado',
      'C) Proferir sentença',
      'D) Absolver o investigado'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Entre as atribuições expressas no Art. 6º do CPP estão ouvir a vítima (ofendido), interrogar o indiciado, proceder a acareações e colher provas pertinentes.'
  },
  {
    id: 11,
    enunciado: '11. Entre as providências previstas no art. 6º do CPP está:',
    opcoes: [
      'A) Preservar o local do crime',
      'B) Condenar o investigado',
      'C) Fixar a pena',
      'D) Proferir sentença'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: Art. 6º, I do CPP: Logo que tiver conhecimento da prática da infração penal, a autoridade policial deverá dirigir-se ao local, providenciando para que não se alterem o estado e conservação das coisas.'
  },
  {
    id: 12,
    enunciado: '12. O inquérito policial:',
    opcoes: [
      'A) É uma ação penal',
      'B) É um processo judicial',
      'C) É um procedimento destinado à investigação',
      'D) É uma sentença'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Trata-se de procedimento administrativo de investigação preliminar destinado à apuração da infração penal e de sua autoria.'
  },
  {
    id: 13,
    enunciado: '13. No prazo geral previsto no CPP, quando o indiciado estiver preso, o inquérito deverá terminar, em regra, em:',
    opcoes: [
      'A) 5 dias',
      'B) 10 dias',
      'C) 15 dias',
      'D) 30 dias'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Art. 10 do CPP: O inquérito deverá terminar no prazo de 10 dias, se o indiciado tiver sido preso preventivamente, contado esse prazo a partir do dia em que se executar a ordem de prisão.'
  },
  {
    id: 14,
    enunciado: '14. Quando o indiciado estiver solto, o prazo geral previsto no CPP é de:',
    opcoes: [
      'A) 10 dias',
      'B) 15 dias',
      'C) 30 dias',
      'D) 60 dias'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Art. 10 do CPP: No caso de indiciado solto (mediante fiança ou sem ela), o prazo geral do inquérito é de 30 dias.'
  },
  {
    id: 15,
    enunciado: '15. O inquérito policial não tem como finalidade:',
    opcoes: [
      'A) Investigar a autoria',
      'B) Apurar circunstâncias do crime',
      'C) Condenar o investigado',
      'D) Reunir elementos informativos'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: O inquérito policial JAMAIS condena nem absolve. A condenação penal é competência exclusiva do Poder Judiciário por meio de sentença proferida em processo judicial regular.'
  },
  {
    id: 16,
    enunciado: '16. O sigilo do inquérito policial existe principalmente para:',
    opcoes: [
      'A) Impedir qualquer investigação',
      'B) Proteger a eficiência e as necessidades da investigação',
      'C) Impedir o trabalho da defesa',
      'D) Substituir o processo judicial'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O sigilo previsto no Art. 20 do CPP visa resguardar a eficácia e o sucesso das diligências investigatórias e proteger a intimidade/interesse social.'
  },
  {
    id: 17,
    enunciado: '17. Se já existirem elementos suficientes para o oferecimento da ação penal, o inquérito policial:',
    opcoes: [
      'A) Pode ser dispensado',
      'B) Deve obrigatoriamente ser realizado novamente',
      'C) Deve ser convertido em sentença',
      'D) Deve resultar em condenação'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: O inquérito policial é peça dispensável e prescindível; dispondo de justa causa, o titular da ação penal pode oferecê-la diretamente (Art. 39, § 5º e 46, § 1º, CPP).'
  },
  {
    id: 18,
    enunciado: '18. O reconhecimento de pessoas e coisas durante a investigação é:',
    opcoes: [
      'A) Vedado',
      'B) Uma das diligências que podem ser realizadas',
      'C) Exclusivo do juiz',
      'D) Exclusivo da defesa'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Art. 6º, VI do CPP: A autoridade policial pode proceder a reconhecimento de pessoas e coisas e a acareações durante o inquérito policial.'
  },
  {
    id: 19,
    enunciado: '19. O exame de corpo de delito, quando cabível, é uma providência relacionada:',
    opcoes: [
      'A) À investigação da infração penal',
      'B) À aplicação da pena',
      'C) À sentença civil',
      'D) À execução da pena'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: Conforme o Art. 6º, VII e Art. 158 do CPP, o exame de corpo de delito é providência investigatória fundamental para constatação da materialidade nas infrações que deixam vestígios.'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa correta:',
    opcoes: [
      'A) O inquérito policial condena o investigado.',
      'B) O inquérito policial é conduzido pelo juiz.',
      'C) O inquérito policial busca reunir elementos sobre a infração penal e sua autoria.',
      'D) O inquérito policial sempre é indispensável para a ação penal.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: Perfeita definição do IP: procedimento que visa colher elementos de materialidade da infração penal e indícios suficientes de sua autoria.'
  }
];

export const procPenalTfQuestionsData: TfQuestionItem[] = [
  {
    id: 101,
    enunciado: '1. O inquérito policial é um procedimento administrativo investigativo conduzido pela polícia judiciária e não um processo judicial.',
    correta: true,
    explicacao: 'Verdadeiro: O IP é pré-processual, administrativo e conduzido pelo delegado de polícia (Art. 4º do CPP).'
  },
  {
    id: 102,
    enunciado: '2. Nos crimes de ação penal pública condicionada, a autoridade policial pode instaurar o inquérito de ofício mesmo sem a representação da vítima.',
    correta: false,
    explicacao: 'Falso: O Art. 5º, § 4º do CPP veda expressamente a instauração de inquérito em crimes de ação pública condicionada sem prévia representação.'
  },
  {
    id: 103,
    enunciado: '3. O inquérito policial é dispensável para a propositura da ação penal se o Ministério Público ou o ofendido já dispuser de elementos suficientes de autoria e materialidade.',
    correta: true,
    explicacao: 'Verdadeiro: O IP possui natureza de procedimento informativo dispensável (prescindível).'
  },
  {
    id: 104,
    enunciado: '4. O prazo geral do CPP para conclusão do inquérito policial é de 30 dias para o indiciado preso e de 10 dias para o indiciado solto.',
    correta: false,
    explicacao: 'Falso: É o oposto! O prazo é de 10 dias para o indiciado PRESO e de 30 dias para o indiciado SOLTO (Art. 10 do CPP).'
  }
];

export const procPenalDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 201,
    enunciado: '1. Explique a finalidade do inquérito policial e aponte três de suas principais características à luz do Código de Processo Penal.',
    respostaEsperada: 'Gabarito esperado: A finalidade do inquérito policial é apurar a infração penal e identificar sua autoria (materialidade + indícios de autoria), fornecendo subsídios probatórios para que o titular da ação penal (MP ou ofendido) promova a ação judicial. Suas características incluem: 1) Administrativo (conduzido pela autoridade policial, não é processo judicial); 2) Escrito (todas as peças reduzidas a escrito, art. 9º); 3) Dispensável (ação penal pode ser proposta sem inquérito se houver provas suficientes); 4) Sigiloso (art. 20, ressalvada a Súmula Vinculante 14 do STF).'
  },
  {
    id: 202,
    enunciado: '2. Quais são os prazos gerais da regra do CPP para a conclusão do inquérito policial quando o indiciado estiver preso e quando estiver solto? A partir de quando se inicia a contagem do prazo do preso?',
    respostaEsperada: 'Gabarito esperado: Conforme o Artigo 10 do CPP: se o indiciado estiver PRESO preventivamente, o prazo para conclusão do inquérito é de 10 dias improrrogáveis, contados a partir do dia em que se executar a ordem de prisão. Se o indiciado estiver SOLTO (com ou sem fiança), o prazo é de 30 dias, podendo ser prorrogado pelo juiz a pedido da autoridade policial quando o fato for de difícil elucidação.'
  }
];

// Exercício Prático Oficial: "Você é o Investigador" (Desafio de Vídeo)
export interface PracticalVideoCase {
  titulo: string;
  caso: string;
  perguntas: string[];
  desafioOral: string;
  tempoSugerido: string;
  criteriosAvaliacao: string[];
}

export const procPenalPracticalCase: PracticalVideoCase = {
  titulo: 'Atividade Prática: "Você é o Investigador"',
  caso: 'João estava saindo do trabalho quando teve seu celular roubado. Ele procurou a polícia e informou que o autor do crime era um homem que usava camisa preta e fugiu em uma motocicleta. Uma câmera de segurança próxima ao local registrou parte do ocorrido.',
  perguntas: [
    '1. Qual é a finalidade do inquérito policial nesse caso?',
    '2. Quem será responsável pela condução da investigação?',
    '3. Quais elementos podem ser buscados durante a investigação?',
    '4. A câmera de segurança pode ser utilizada como elemento de investigação? Explique.',
    '5. A autoridade policial pode ouvir a vítima?',
    '6. Pode procurar identificar e ouvir possíveis testemunhas?',
    '7. O inquérito policial já significa que João terá seu celular recuperado ou que o suspeito será condenado? Explique.'
  ],
  desafioOral: 'Depois de responder às perguntas, explique com suas próprias palavras, sem ler: "O que é um inquérito policial e para que ele serve?"',
  tempoSugerido: '3 a 5 minutos',
  criteriosAvaliacao: [
    'Clareza ao falar',
    'Pronúncia e dicção',
    'Organização das ideias',
    'Conhecimento do conteúdo jurídico',
    'Capacidade de explicar sem decorar',
    'Segurança e postura na resposta'
  ]
};
