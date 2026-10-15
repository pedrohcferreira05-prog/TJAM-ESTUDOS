// Data for Direito Processual Penal — Aula 02: Ação Penal
// Preparatório TJAM — Assistente Judiciário
// Nível Intermediário • Quinta-feira • 1ª Aula do Dia

export interface FlashcardItem {
  id: number;
  q: string;
  a: string;
  frente: string;
  verso: string;
  categoria: string;
  dica?: string;
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

export interface PracticalTaskConfig {
  scenario: string;
  instruction: string;
  comparativeTable: {
    modalidade: string;
    quemInicia: string;
    pecaInicial: string;
    condicao: string;
    exemplo: string;
  }[];
  deadline: string;
}

export const procPenalAula2SummaryPoints: string[] = [
  'Ação Penal: Instrumento pelo qual se pede ao Poder Judiciário que analise um fato criminoso e decida sobre a responsabilidade penal do acusado (fase judicial contenciosa).',
  'Distinção Inquérito × Ação Penal: O inquérito policial é procedimento administrativo preliminar de investigação e colheita de indícios; a ação penal é a fase do processo judicial.',
  'Ação Penal Pública Incondicionada: Modalidade padrão e privativa do Ministério Público via Denúncia; não depende de autorização, representação ou anuência da vítima.',
  'Ação Penal Pública Condicionada: Promovida pelo Ministério Público via Denúncia, mas condicionada à representação da vítima/representante legal ou requisição do Ministro da Justiça.',
  'Prazo Decadencial da Representação: Em regra, prazo decadencial improrrogável de 6 (seis) meses, contado a partir do dia em que a vítima toma conhecimento da autoria do fato (art. 38 do CPP).',
  'Ação Penal Privada: Promovida privativamente pelo ofendido ou seu representante legal por meio de Queixa-Crime com procuração com poderes especiais (art. 44 do CPP) no prazo decadencial de 6 meses.',
  'Princípio da Obrigatoriedade (Legalidade): Diante de indícios de crime de ação pública, o MP tem o dever funcional de agir e denunciar, observadas as hipóteses legais de acordo (ex: ANPP).',
  'Princípio da Indisponibilidade: Uma vez proposta a ação penal pública, o Ministério Público NÃO pode desistir da ação penal (art. 42 do CPP).',
  'Princípio da Intranscendência: A ação penal e a pena jamais podem passar da pessoa do responsável pelo fato criminoso, não transferindo a culpa a familiares ou terceiros.',
  'Institutos Próprios da Ação Privada: Renúncia (antes da queixa, ato unilateral), Perdão do Ofendido (após a queixa, ato bilateral que exige aceitação) e Perempção (sanção extintiva pela inércia/omissão do querelante).',
  'Requisitos do Art. 41 do CPP: A denúncia e a queixa-crime devem conter a exposição do fato criminoso com suas circunstâncias, qualificação do acusado, classificação do crime e rol de testemunhas.',
  'Aplicação no TJAM: O assistente judiciário deve identificar prontamente a natureza da ação penal para conferência do instrumento de procuração, prazos decadenciais e remessa ao Ministério Público.'
];

export const procPenalAula2FlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'O que é a Ação Penal e qual a sua diferença em relação ao Inquérito Policial?',
    a: 'A ação penal é a etapa judicial em que se pede ao Poder Judiciário a responsabilização penal do acusado. O inquérito policial é mera investigação preliminar administrativa; a ação penal é o processo judicial contencioso formal.',
    frente: 'Conceito de Ação Penal × Inquérito',
    verso: 'Ação Penal = Fase judicial perante o juiz.\nInquérito = Investigação preliminar da autoridade policial.',
    categoria: 'Teoria Geral da Ação Penal',
    dica: 'O inquérito reúne informações; a ação penal julga o crime.'
  },
  {
    id: 2,
    q: 'Quem é o titular da Ação Penal Pública e qual é a sua peça inicial?',
    a: 'O titular exclusivo é o Ministério Público (art. 129, I da CF). A peça inicial é a DENÚNCIA.',
    frente: 'Titular e Peça da Ação Pública',
    verso: 'Titular: Ministério Público.\nPeça Inicial: Denúncia.',
    categoria: 'Ação Penal Pública',
    dica: 'MP denuncia; ofendido queixa-se.'
  },
  {
    id: 3,
    q: 'O que diferencia a Ação Penal Pública Incondicionada da Condicionada?',
    a: '• Incondicionada: o MP promove a denúncia sem depender de qualquer autorização ou manifestação da vítima.\n• Condicionada: o MP só pode denunciar se houver representação da vítima ou requisição do Ministro da Justiça.',
    frente: 'Ação Pública Incondicionada × Condicionada',
    verso: 'Incondicionada: ação automática pelo MP.\nCondicionada: depende de representação da vítima ou requisição do Ministro da Justiça.',
    categoria: 'Espécies de Ação Penal',
    dica: 'A representação autoriza o MP a agir, mas não substitui a denúncia.'
  },
  {
    id: 4,
    q: 'Qual é o prazo decadencial geral para a representação da vítima e para a queixa-crime?',
    a: 'O prazo é de 6 (seis) meses, contado a partir do dia em que a vítima toma conhecimento de quem é o autor do crime (art. 38 do CPP).',
    frente: 'Prazo Decadencial Geral (Art. 38, CPP)',
    verso: '6 meses a contar do conhecimento da AUTORIA do crime (e não da data do fato).',
    categoria: 'Prazos Decadenciais',
    dica: 'Atenção para concursos: conta-se a partir de quando se descobre QUEM foi o autor!'
  },
  {
    id: 5,
    q: 'Quem propõe a Ação Penal Privada e por meio de qual peça inaugural?',
    a: 'É proposta pelo OFENDIDO ou seu representante legal, por meio de QUEIXA-CRIME, apresentada por advogado devidamente habilitado ou Defensoria Pública.',
    frente: 'Ação Penal Privada',
    verso: 'Titular: Ofendido / Representante legal.\nPeça Inicial: Queixa-crime.',
    categoria: 'Ação Penal Privada',
    dica: 'Na ação privada, o documento se chama queixa-crime (não denúncia).'
  },
  {
    id: 6,
    q: 'O Ministério Público pode desistir da ação penal pública já proposta?',
    a: 'NÃO! Vigora o Princípio da Indisponibilidade da Ação Penal Pública (art. 42 do CPP): uma vez ajuizada a ação penal pública, o MP não pode dela desistir.',
    frente: 'Princípio da Indisponibilidade (Art. 42, CPP)',
    verso: 'O Ministério Público NÃO pode desistir da ação penal pública já proposta.',
    categoria: 'Princípios da Ação Penal',
    dica: 'Cuidado em prova: o MP pode pedir absolvição ao final nas alegações, mas nunca desistir da ação.'
  },
  {
    id: 7,
    q: 'O que estabelece o Princípio da Intranscendência da Ação Penal?',
    a: 'Estabelece que a ação penal e a respectiva pena só podem ser direcionadas e aplicadas à pessoa que praticou o fato delituoso, não podendo transferir-se a terceiros ou parentes.',
    frente: 'Princípio da Intranscendência',
    verso: 'A responsabilidade e a pena não passam da pessoa do autor do delito.',
    categoria: 'Princípios da Ação Penal',
    dica: 'Intranscendente = não ultrapassa a pessoa do autor.'
  },
  {
    id: 8,
    q: 'Qual é a diferença entre Renúncia, Perdão do Ofendido e Perempção?',
    a: '• Renúncia: ocorre ANTES da queixa-crime (ato unilateral de desistência do direito de queixa);\n• Perdão: ocorre DEPOIS da queixa iniciada (ato bilateral, depende de aceitação);\n• Perempção: sanção processual decorrente da inércia/desídia do querelante prevista em lei.',
    frente: 'Renúncia × Perdão × Perempção',
    verso: 'Renúncia = antes da queixa (unilateral).\nPerdão = após a queixa (bilateral).\nPerempção = sanção por desídia/inércia do querelante.',
    categoria: 'Extinção da Punibilidade na Ação Privada',
    dica: 'Lembre-se do momento: renúncia antes, perdão depois.'
  },
  {
    id: 9,
    q: 'Quais são os requisitos obrigatórios da petição inicial acusatória (Art. 41 do CPP)?',
    a: '1) Exposição do fato criminoso com todas as suas circunstâncias; 2) Qualificação do acusado ou esclarecimentos para identificá-lo; 3) Classificação do crime; e 4) Rol de testemunhas, quando necessário.',
    frente: 'Requisitos da Denúncia / Queixa (Art. 41, CPP)',
    verso: '• Fato criminoso e circunstâncias;\n• Qualificação do acusado;\n• Classificação jurídica do crime;\n• Rol de testemunhas.',
    categoria: 'Peças Processuais',
    dica: 'Requisitos fundamentais para garantir a ampla defesa e o contraditório.'
  },
  {
    id: 10,
    q: 'O que é o Princípio da Indivisibilidade na Ação Penal Privada?',
    a: 'Significa que a queixa-crime deve ser proposta contra TODOS os coautores e partícipes conhecidos do crime, não podendo a vítima escolher processar apenas um e perdoar outro.',
    frente: 'Princípio da Indivisibilidade na Ação Privada',
    verso: 'A queixa deve abranger todos os autores conhecidos; processar um implica processar todos.',
    categoria: 'Princípios da Ação Penal',
    dica: 'A renúncia quanto a um dos autores estende-se a todos os demais.'
  }
];

// 8 Questões de Múltipla Escolha (Parte 1 do material oficial enviado)
export const procPenalAula2McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A ação penal pública incondicionada é promovida por:',
    opcoes: [
      'A) A vítima.',
      'B) O Ministério Público.',
      'C) O juiz.',
      'D) O delegado de polícia.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A ação penal pública incondicionada é de titularidade privativa do Ministério Público, que atua como órgão de acusação do Estado sem necessidade de autorização da vítima.'
  },
  {
    id: 2,
    enunciado: '2. Qual é a peça inicial da ação penal pública?',
    opcoes: [
      'A) Queixa-crime.',
      'B) Sentença.',
      'C) Denúncia.',
      'D) Inquérito policial.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A denúncia é a peça inicial privativa por meio da qual o Ministério Público inaugura a ação penal pública (art. 24 do CPP).'
  },
  {
    id: 3,
    enunciado: '3. Na ação penal pública condicionada à representação:',
    opcoes: [
      'A) A vítima apresenta diretamente a denúncia.',
      'B) O Ministério Público nunca participa.',
      'C) A representação é uma condição exigida por lei para a persecução penal.',
      'D) O juiz inicia o processo por conta própria.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A representação da vítima é condição de procedibilidade expressamente exigida por lei para que o Ministério Público fique autorizado a oferecer a denúncia.'
  },
  {
    id: 4,
    enunciado: '4. A ação penal privada é iniciada, em regra, por meio de:',
    opcoes: [
      'A) Denúncia.',
      'B) Queixa-crime.',
      'C) Sentença.',
      'D) Portaria policial.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A queixa-crime é a petição inicial acusatória privativa do ofendido ou de seu representante legal nos crimes de ação penal privada (art. 30 do CPP).'
  },
  {
    id: 5,
    enunciado: '5. O prazo decadencial geral para o oferecimento da queixa-crime ou para a representação é de:',
    opcoes: [
      'A) 30 dias.',
      'B) 90 dias.',
      'C) 6 meses.',
      'D) 2 anos.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. O art. 38 do Código de Processo Penal estabelece que o direito de queixa ou de representação decai no prazo de 6 (seis) meses, contado do dia em que a vítima vem a saber quem é o autor do crime.'
  },
  {
    id: 6,
    enunciado: '6. O inquérito policial é:',
    opcoes: [
      'A) A própria ação penal.',
      'B) Uma investigação preliminar que pode reunir elementos sobre o fato criminoso.',
      'C) Uma sentença judicial.',
      'D) Uma condenação criminal.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O inquérito policial é um procedimento administrativo inquisitório preliminar que reúne informações sobre autoria e materialidade delitiva para subsidiar a propositura da ação penal pelo titular.'
  },
  {
    id: 7,
    enunciado: '7. Na ação penal pública condicionada, quem oferece a denúncia, se presentes os requisitos legais?',
    opcoes: [
      'A) O Ministério Público.',
      'B) A vítima obrigatoriamente.',
      'C) O juiz.',
      'D) A testemunha.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. Mesmo sendo a ação condicionada à representação, quem oferece a denúncia continua sendo exclusivamente o Ministério Público, pois a ação permanece pública.'
  },
  {
    id: 8,
    enunciado: '8. O princípio da intranscendência significa que:',
    opcoes: [
      'A) Toda ação penal deve ser privada.',
      'B) A pena não pode passar da pessoa do condenado.',
      'C) O juiz deve iniciar toda investigação.',
      'D) O Ministério Público pode desistir livremente da ação penal pública.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O princípio da intranscendência da pena (art. 5º, XLV da CF) estabelece que a punição penal é personalíssima, não podendo ultrapassar a pessoa física do condenado.'
  }
];

// 6 Questões de Verdadeiro ou Falso (Parte 2 do material oficial enviado)
export const procPenalAula2TfQuestionsData: TfQuestionItem[] = [
  {
    id: 9,
    enunciado: '9. ( ) A denúncia é apresentada pelo Ministério Público.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. A denúncia é privativa do Ministério Público para dar início à ação penal pública (art. 24 do CPP).'
  },
  {
    id: 10,
    enunciado: '10. ( ) A representação da vítima e a denúncia são a mesma coisa.',
    correta: false,
    explicacao: '❌ Gabarito: FALSO. A representação é a manifestação de vontade da vítima autorizando a persecução; a denúncia é a petição judicial oferecida pelo Ministério Público acusando o réu.'
  },
  {
    id: 11,
    enunciado: '11. ( ) A queixa-crime é utilizada na ação penal privada.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. A queixa-crime é o instrumento processual próprio e privativo da vítima ou seu representante legal na ação penal privada.'
  },
  {
    id: 12,
    enunciado: '12. ( ) O inquérito policial e a ação penal são procedimentos diferentes.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. O inquérito policial é procedimento administrativo preliminar de investigação policial; a ação penal é processo jurisdicional perante o juiz com contraditório e ampla defesa.'
  },
  {
    id: 13,
    enunciado: '13. ( ) Na ação penal pública incondicionada, a representação da vítima é sempre obrigatória.',
    correta: false,
    explicacao: '❌ Gabarito: FALSO. Na ação pública incondicionada, o Ministério Público atua de ofício sem depender de qualquer representação ou consentimento da vítima.'
  },
  {
    id: 14,
    enunciado: '14. ( ) A perempção pode ocorrer na ação penal privada nas hipóteses previstas em lei.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. A perempção é causa de extinção da punibilidade que decorre da inércia ou omissão do querelante exclusivamente na ação penal privada (art. 60 do CPP).'
  }
];

// 6 Situações Práticas / Questões Discursivas (Parte 3 do material oficial enviado)
export const procPenalAula2DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 15,
    enunciado: '15. Uma vítima toma conhecimento de quem praticou um crime cuja ação penal depende de representação. Em regra, qual é o prazo para representar?',
    respostaEsperada: 'Gabarito Oficial TJAM:\nEm regra, o prazo decadencial é de 6 (seis) meses, contado a partir do dia em que a vítima toma conhecimento de quem é o autor do crime (art. 38 do Código de Processo Penal), salvo previsão legal específica em contrário. Trata-se de prazo decadencial que não se suspende e não se interrompe.'
  },
  {
    id: 16,
    enunciado: '16. O Ministério Público recebe elementos sobre um crime de ação penal pública incondicionada e entende que existem os requisitos legais para iniciar o processo. Qual peça deverá apresentar?',
    respostaEsperada: 'Gabarito Oficial TJAM:\nO Ministério Público deverá apresentar a DENÚNCIA (art. 24 do CPP), peça privativa e inaugural da ação penal pública, que deverá conter a exposição do fato criminoso com todas as suas circunstâncias, a qualificação do acusado, a classificação do crime e o rol de testemunhas (art. 41 do CPP).'
  },
  {
    id: 17,
    enunciado: '17. Em um crime de ação penal privada, a vítima pretende iniciar a ação judicial. Qual peça deverá utilizar e quem deverá apresentá-la?',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA vítima (ofendido) deverá utilizar a QUEIXA-CRIME (art. 30 e 41 do CPP). A peça deverá ser apresentada por advogado legalmente habilitado, dotado de procuração com poderes especiais (mencionando o fato criminoso e o art. 44 do CPP), ou por Defensor Público, caso a vítima seja hipossuficiente.'
  },
  {
    id: 18,
    enunciado: '18. Um estudante afirma: “O inquérito policial já é o processo criminal”. Explique, com suas palavras, por que essa afirmação está incorreta.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA afirmação está incorreta por duas razões fundamentais:\n1. Natureza Jurídica: O inquérito policial é mero procedimento administrativo de caráter informativo e preliminar, conduzido pela polícia judiciária para apurar autoria e materialidade.\n2. Inexistência de Contraditório Pleno: No inquérito não há processo judicial nem acusação formal perante juiz. A ação penal (processo criminal) só tem início após o oferecimento e recebimento judicial da denúncia ou queixa-crime, momento a partir do qual vigoram plenamente o contraditório, a ampla defesa e o devido processo legal perante o Poder Judiciário.'
  },
  {
    id: 19,
    enunciado: '19. Explique a diferença entre ação penal pública condicionada e incondicionada.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• Ação Penal Pública Incondicionada: É a regra geral da legislação penal brasileira. É promovida exclusivamente pelo Ministério Público sem depender de qualquer autorização, manifestação ou vontade da vítima.\n• Ação Penal Pública Condicionada: Embora a titularidade continue sendo do Ministério Público (que oferece a denúncia), a lei exige uma condição formal prévia de procedibilidade: a representação do ofendido ou requisição do Ministro da Justiça, sem a qual o MP não tem legitimidade para iniciar o processo.'
  },
  {
    id: 20,
    enunciado: '20. Crie um exemplo fictício de ação penal privada e explique como ela seria iniciada.',
    respostaEsperada: 'Gabarito Oficial TJAM (Exemplo Padrão):\nExemplo Fictício: Carlos publica ofensas pessoais contra Mariana nas redes sociais, imputando-lhe falsamente fato ofensivo à sua reputação (crime de difamação, art. 139 do Código Penal, cuja ação é exclusivamente privada segundo o art. 145 do CP).\nComo é iniciada: Mariana (ofendida/querelante), ciente da autoria, contrata um advogado particular ou recorre à Defensoria Pública do Amazonas. O profissional elabora a QUEIXA-CRIME acompanhada de procuração com poderes especiais, instruída com os prints comprobatórios, e a distribui perante uma Vara Criminal ou Juizado Especial Criminal do TJAM dentro do prazo decadencial improrrogável de 6 meses.'
  }
];

// Atividade Prática Oficial: Fluxograma e Quadro Comparativo
export const procPenalAula2PracticalTask: PracticalTaskConfig = {
  scenario: 'Produção Individual — Fluxograma e Quadro Comparativo da Ação Penal (TJAM)',
  instruction: 'Crie um fluxograma e quadro comparativo comparando as três modalidades de ação penal: 1) Pública incondicionada; 2) Pública condicionada; 3) Privada. Em cada uma, indique quem inicia, qual peça é utilizada, se existe condição específica e acrescente um exemplo fictício explicando seu enquadramento. Ao final, escreva um pequeno resumo e envie as respostas ao professor até 19h30 via WhatsApp.',
  deadline: 'Hoje até 19h30',
  comparativeTable: [
    {
      modalidade: 'Ação Penal Pública Incondicionada',
      quemInicia: 'Ministério Público (Promotor de Justiça)',
      pecaInicial: 'Denúncia (art. 24 do CPP)',
      condicao: 'Nenhuma condição. O MP atua de ofício pelo princípio da obrigatoriedade.',
      exemplo: 'Crime de roubo majorado contra agência bancária ou homicídio: o MP oferece denúncia diretamente independente de vontade da vítima.'
    },
    {
      modalidade: 'Ação Penal Pública Condicionada',
      quemInicia: 'Ministério Público (Promotor de Justiça)',
      pecaInicial: 'Denúncia (art. 24 do CPP)',
      condicao: 'Representação da vítima (prazo de 6 meses da autoria) ou requisição do Ministro da Justiça.',
      exemplo: 'Crime de ameaça (art. 147 do CP): a vítima formula a representação em delegacia ou no MP, autorizando o promotor a oferecer a denúncia.'
    },
    {
      modalidade: 'Ação Penal Privada',
      quemInicia: 'Ofendido (vítima) ou representante legal (Querelante)',
      pecaInicial: 'Queixa-crime (art. 30 e 41 do CPP) com procuração com poderes especiais',
      condicao: 'Iniciativa exclusiva da vítima no prazo decadencial de 6 meses da ciência da autoria.',
      exemplo: 'Crime de calúnia ou difamação (arts. 138 e 139 do CP): a vítima contrata advogado e ajuíza a queixa-crime na vara criminal do TJAM.'
    }
  ]
};

// Videoaula Oficial enviada pelo usuário
export const procPenalAula2VideoInfo = {
  title: 'Direito Processual Penal — Aula 02: Ação Penal',
  subtitle: 'Quinta-feira • 1ª aula do dia • Nível intermediário — TJAM Assistente Judiciário',
  videoUrl: 'https://www.youtube.com/embed/2bABDff7NAE?autoplay=0&rel=0',
  videoId: '2bABDff7NAE',
  externalUrl: 'https://youtu.be/2bABDff7NAE?is=Jssch4xWxKy3jTxt',
  duration: '50 min'
};
