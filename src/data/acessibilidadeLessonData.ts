// Data for Acessibilidade e Legislação Correlata — Aula 01: Lei Brasileira de Inclusão (LBI - Lei nº 13.146/2015)
// TJAM Assistente Judiciário — Nível Intermediário

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
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

export interface PracticalSimulatorOption {
  id: string;
  texto: string;
  isCorreta: boolean;
  feedback: string;
}

export interface PracticalSimulatorScenario {
  id: string;
  titulo: string;
  cenario: string;
  pergunta: string;
  opcoes: PracticalSimulatorOption[];
}

export interface PracticalTaskConfig {
  scenario: string;
  instruction: string;
  questions: {
    number: number;
    title: string;
    prompt: string;
    placeholder: string;
    suggestedAnswer: string;
  }[];
}

export const acessibilidadeFlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é o marco legal da inclusão da pessoa com deficiência no Brasil?',
    a: 'Lei nº 13.146/2015 — Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência), que adota o modelo de direitos humanos, igualdade, autonomia e plena cidadania.'
  },
  {
    q: 'Qual é o conceito legal de pessoa com deficiência (Art. 2º da LBI)?',
    a: 'Aquela que possui impedimento de longo prazo de natureza física, mental, intelectual ou sensorial, o qual, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade em igualdade de condições.'
  },
  {
    q: 'Como deve ser realizada a avaliação da deficiência segundo a LBI?',
    a: 'Sob a perspectiva biopsicossocial, realizada por equipe multiprofissional e interdisciplinar, analisando funções corporais, fatores socioambientais, limitações de atividades e restrições de participação.'
  },
  {
    q: 'O que é Acessibilidade nos termos do Art. 3º, I da LBI?',
    a: 'Condição para utilização, com segurança e autonomia, total ou assistida, dos espaços, mobiliários, equipamentos urbanos, transportes, informação, comunicação e serviços por pessoas com deficiência ou mobilidade reduzida.'
  },
  {
    q: 'O que são barreiras e quais são as 6 espécies previstas na LBI?',
    a: 'São entraves, obstáculos ou atitudes que limitem ou impeçam a participação social. São 6: 1) Urbanísticas; 2) Arquitetônicas; 3) Nos Transportes; 4) Nas Comunicações e Informação; 5) Atitudinais; 6) Tecnológicas.'
  },
  {
    q: 'O que caracteriza uma Barreira Atitudinal?',
    a: 'Atitudes ou comportamentos individuais que prejudiquem ou impeçam a participação social da pessoa com deficiência em igualdade de condições (como preconceitos, estereótipos, descaso ou recusa injustificada de atendimento).'
  },
  {
    q: 'O que compreende a Tecnologia Assistiva ou Ajuda Técnica (Art. 3º, III)?',
    a: 'Produtos, equipamentos, dispositivos, recursos, metodologias, estratégias, práticas e serviços voltados a promover funcionalidade, autonomia, independência, qualidade de vida e inclusão social.'
  },
  {
    q: 'Como funciona o Atendimento Prioritário no Poder Judiciário (Art. 9º)?',
    a: 'A pessoa com deficiência tem prioridade imediata em balcões, assentos reservados, comunicação acessível e celeridade na tramitação dos procedimentos judiciais e administrativos em que figure como parte ou interessada.'
  },
  {
    q: 'Como a LBI define Discriminação por motivo de deficiência?',
    a: 'Toda forma de distinção, restrição ou exclusão, por ação ou omissão, com o propósito ou efeito de prejudicar, impedir ou anular o reconhecimento ou o exercício dos direitos e liberdades fundamentais.'
  },
  {
    q: 'Quais os 6 pilares de conduta do Assistente Judiciário no atendimento acessível?',
    a: '1) Respeito e dignidade; 2) Igualdade sem distinção; 3) Acessibilidade proativa; 4) Comunicação adaptada; 5) Respeito estrito à autonomia; 6) Inclusão plena nos atos processuais.'
  }
];

export const acessibilidadeSummaryPoints: string[] = [
  'Base Legal: Lei nº 13.146/2015 — Estatuto da Pessoa com Deficiência (LBI).',
  'Conceito Legal: Impedimento de longo prazo (físico, mental, intelectual ou sensorial) + Interação com barreiras sociais/físicas.',
  'Avaliação Biopsicossocial: Equipe multiprofissional avalia corpo, fatores socioambientais, limitações e restrição de participação.',
  'Conceito de Acessibilidade: Condição de alcance para utilização com segurança e autonomia de espaços, transportes, informação e comunicação.',
  '6 Barreiras da LBI: Urbanísticas (vias), Arquitetônicas (edifícios), Transportes, Comunicacionais/Informacionais, Atitudinais e Tecnológicas.',
  'Barreiras Atitudinais: Atitudes e comportamentos preconceituosos de servidores ou da sociedade que discriminam a pessoa com deficiência.',
  'Tecnologia Assistiva: Não apenas softwares ou computadores; inclui produtos, metodologias, recursos e serviços que promovem autonomia.',
  'Atendimento Prioritário: Garantia legal mandatória nos balcões, assentos e na tramitação célere dos procedimentos no Poder Judiciário.',
  'Princípio da Autonomia: O servidor jamais deve substituir a vontade da pessoa com deficiência, nem presumir incapacidade civil.',
  'Aplicação no TJAM: Atendimento acessível com urbanidade, formatos acessíveis (Libras, áudio, texto pesquisável) e eliminação de barreiras.'
];

// 🔵 QUESTÕES OBJETIVAS (1 a 10)
export const acessibilidadeMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. De acordo com a Lei Brasileira de Inclusão, considera-se pessoa com deficiência aquela que possui:',
    opcoes: [
      'A) qualquer limitação física permanente.',
      'B) impedimento de longo prazo de natureza física, mental, intelectual ou sensorial que, em interação com barreiras, possa obstruir sua participação social.',
      'C) exclusivamente deficiência física comprovada por laudo médico.',
      'D) incapacidade absoluta para os atos da vida civil.',
      'E) dificuldade temporária de locomoção.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B. Nos termos do Art. 2º da Lei nº 13.146/2015, considera-se pessoa com deficiência aquela que tem impedimento de longo prazo de natureza física, mental, intelectual ou sensorial, o qual, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade em igualdade de condições.'
  },
  {
    id: 2,
    enunciado: '2. A avaliação da deficiência, quando necessária, deve considerar uma perspectiva:',
    opcoes: [
      'A) exclusivamente médica.',
      'B) exclusivamente psicológica.',
      'C) exclusivamente social.',
      'D) biopsicossocial.',
      'E) exclusivamente funcional.'
    ],
    correta: 3, // D
    explicacao: 'Gabarito D. O Art. 2º, § 1º da LBI estabelece que a avaliação da deficiência, quando necessária, será biopsicossocial, realizada por equipe multiprofissional e interdisciplinar, superando o antigo modelo puramente médico.'
  },
  {
    id: 3,
    enunciado: '3. A acessibilidade prevista na LBI busca garantir à pessoa com deficiência condições de utilização, com segurança e autonomia, de espaços, equipamentos, transportes, informação, comunicação e serviços.',
    opcoes: [
      'A) Correto.',
      'B) Incorreto, pois se limita aos prédios públicos.',
      'C) Incorreto, pois se limita ao transporte.',
      'D) Incorreto, pois somente pessoas com deficiência física possuem direito à acessibilidade.',
      'E) Incorreto, pois depende exclusivamente de tecnologia assistiva.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A. A afirmativa está perfeita e reproduz a essência do conceito legal de acessibilidade previsto no Art. 3º, inciso I, da Lei nº 13.146/2015: segurança e autonomia no uso de espaços, transportes, informação, comunicação e serviços públicos e privados.'
  },
  {
    id: 4,
    enunciado: '4. Uma atitude de um servidor que impede injustificadamente uma pessoa com deficiência de participar de determinada atividade caracteriza:',
    opcoes: [
      'A) barreira arquitetônica.',
      'B) barreira urbanística.',
      'C) barreira atitudinal.',
      'D) barreira de transporte.',
      'E) barreira tecnológica.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. O Art. 3º, IV, "e", da LBI conceitua barreiras atitudinais como atitudes ou comportamentos que prejudiquem ou impeçam a participação social da pessoa com deficiência em igualdade de condições com as demais pessoas.'
  },
  {
    id: 5,
    enunciado: '5. São exemplos de barreiras previstas na LBI, EXCETO:',
    opcoes: [
      'A) urbanísticas.',
      'B) arquitetônicas.',
      'C) nos transportes.',
      'D) atitudinais.',
      'E) exclusivamente econômicas.'
    ],
    correta: 4, // E
    explicacao: 'Gabarito E. A LBI enumera taxativamente 6 categorias de barreiras em seu Art. 3º, IV: urbanísticas, arquitetônicas, nos transportes, nas comunicações e na informação, atitudinais e tecnológicas. Não existe previsão de "barreiras exclusivamente econômicas" no rol legal.'
  },
  {
    id: 6,
    enunciado: '6. A tecnologia assistiva tem como uma de suas finalidades promover:',
    opcoes: [
      'A) dependência da pessoa com deficiência.',
      'B) autonomia, independência, qualidade de vida e inclusão social.',
      'C) segregação das pessoas com deficiência.',
      'D) substituição obrigatória do atendimento humano.',
      'E) limitação da participação social.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B. Nos termos do Art. 3º, III da LBI, tecnologia assistiva ou ajuda técnica visa promover a funcionalidade relacionada à atividade e à participação, objetivando sua autonomia, independência, qualidade de vida e inclusão social.'
  },
  {
    id: 7,
    enunciado: '7. No atendimento de uma pessoa com deficiência em uma unidade pública, é compatível com a LBI:',
    opcoes: [
      'A) dificultar o acesso ao serviço.',
      'B) negar informação quando houver necessidade de adaptação da comunicação.',
      'C) buscar recursos que permitam comunicação e atendimento acessíveis.',
      'D) exigir que outra pessoa sempre responda pela pessoa com deficiência.',
      'E) impedir o atendimento sem justificativa.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. É dever funcional do servidor público e dever institucional dos órgãos estatais viabilizar adaptações razoáveis e buscar ativamente recursos para assegurar atendimento acessível, igualitário e digno.'
  },
  {
    id: 8,
    enunciado: '8. Uma escada existente na entrada de um prédio público, sem alternativa acessível adequada, pode constituir:',
    opcoes: [
      'A) barreira arquitetônica.',
      'B) barreira atitudinal.',
      'C) barreira tecnológica.',
      'D) barreira de comunicação.',
      'E) barreira exclusivamente econômica.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A. Conforme o Art. 3º, IV, "b", da LBI, barreiras arquitetônicas são as existentes nos edifícios públicos e privados, como escadarias de acesso sem rampa ou elevador.'
  },
  {
    id: 9,
    enunciado: '9. Sobre os recursos de comunicação acessível, a LBI reconhece:',
    opcoes: [
      'A) apenas a comunicação oral.',
      'B) somente a língua portuguesa escrita.',
      'C) Libras, Braille, visualização de textos, comunicação tátil, linguagem simples e outros recursos.',
      'D) exclusivamente recursos digitais.',
      'E) somente comunicação por intérprete.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. O Art. 3º, V da LBI traz uma definição ampla de comunicação: compreende a visualização de textos, o Braille, o sistema de sinalização ou de comunicação tátil, os caracteres ampliados, os dispositivos multimídia, a linguagem simples, escrita e oral, os sistemas auditivos e os meios de voz digitalizados e os modos, meios e formatos aumentativos e alternativos de comunicação, incluindo a Língua Brasileira de Sinais (Libras).'
  },
  {
    id: 10,
    enunciado: '10. No serviço público, a aplicação da LBI exige que o atendimento à pessoa com deficiência observe principalmente:',
    opcoes: [
      'A) exclusão e padronização absoluta.',
      'B) autonomia, igualdade, acessibilidade e não discriminação.',
      'C) atendimento exclusivamente presencial.',
      'D) tratamento sempre diferente dos demais cidadãos.',
      'E) substituição da vontade da pessoa pelo servidor.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B. Os princípios fundamentais que regem o atendimento forense e público são: autonomia individual, igualdade de condições, acessibilidade plena e não discriminação, tratando a pessoa com deficiência com dignidade e cidadania.'
  }
];

// 🟠 CERTO OU ERRADO (11 a 15)
export const acessibilidadeTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A definição legal de pessoa com deficiência considera a interação entre o impedimento de longo prazo e uma ou mais barreiras.',
    correta: true,
    explicacao: 'CERTO. É o núcleo do conceito trazido pelo Art. 2º da Lei nº 13.146/2015: não se analisa apenas o impedimento individual isolado, mas sim sua interação com as barreiras que obstam a participação plena em igualdade de condições.'
  },
  {
    id: 12,
    enunciado: '12. As barreiras atitudinais estão relacionadas a atitudes ou comportamentos que prejudiquem a participação social da pessoa com deficiência em igualdade de condições.',
    correta: true,
    explicacao: 'CERTO. O Art. 3º, IV, "e", da LBI define literalmente as barreiras atitudinais como atitudes ou comportamentos que prejudiquem ou impeçam a participação social em igualdade de oportunidades.'
  },
  {
    id: 13,
    enunciado: '13. A acessibilidade diz respeito exclusivamente à adaptação de prédios e espaços físicos.',
    correta: false,
    explicacao: 'ERRADO. A acessibilidade é um conceito amplo que abrange não apenas espaços físicos e edifícios, mas também transportes, informação, comunicação, tecnologias, mobiliários e serviços públicos e privados.'
  },
  {
    id: 14,
    enunciado: '14. A tecnologia assistiva pode contribuir para a autonomia e a independência da pessoa com deficiência.',
    correta: true,
    explicacao: 'CERTO. A finalidade precípua da tecnologia assistiva (produtos, recursos, metodologias e serviços) é garantir e ampliar a autonomia, independência, funcionalidade e inclusão social da pessoa com deficiência.'
  },
  {
    id: 15,
    enunciado: '15. A LBI permite que uma pessoa com deficiência seja impedida de exercer um direito simplesmente em razão de sua deficiência.',
    correta: false,
    explicacao: 'ERRADO. A LBI veda expressamente qualquer distinção, restrição, exclusão ou impedimento que prejudique o exercício de direitos fundamentais por motivo de deficiência, tipificando tal conduta como discriminação ilícita (Art. 4º).'
  }
];

// 🟣 DISSERTATIVAS (16 a 20)
export const acessibilidadeDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique, com suas palavras, o conceito de pessoa com deficiência adotado pela LBI.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA Lei Brasileira de Inclusão (Art. 2º da Lei nº 13.146/2015) superou a visão puramente médica da deficiência e adotou o modelo social e biopsicossocial. Para a lei, a pessoa com deficiência é aquela que possui um impedimento de longo prazo (de ordem física, mental, intelectual ou sensorial) o qual, ao interagir com uma ou mais barreiras impostas pela sociedade e pelo ambiente, tem dificultada ou obstruída sua participação plena, efetiva e em igualdade de condições com as demais pessoas. Logo, a deficiência não é uma característica isolada do indivíduo, mas o resultado da interação entre o impedimento corporal e as barreiras ambientais.'
  },
  {
    id: 17,
    enunciado: '17. Qual é a diferença entre acessibilidade e barreira?',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• Acessibilidade (Art. 3º, I da LBI) é a condição e possibilidade de alcance para utilização segura e autônoma de espaços físicos, mobiliários, transportes, sistemas de informação, comunicação e serviços públicos e privados por pessoas com deficiência ou mobilidade reduzida.\n• Barreira (Art. 3º, IV da LBI) é exatamente o oposto: qualquer obstáculo, entrave, elemento físico, comportamental ou tecnológico que limite, impeça ou dificulte o acesso, a liberdade de movimento e a participação social da pessoa com deficiência.\nEm síntese: a barreira impede ou restringe; a acessibilidade elimina barreiras e viabiliza a autonomia e o exercício pleno dos direitos.'
  },
  {
    id: 18,
    enunciado: '18. Explique o que é uma barreira atitudinal e dê um exemplo que poderia ocorrer no atendimento de um órgão público.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nBarreira atitudinal (Art. 3º, IV, "e" da LBI) é toda atitude, postura, preconceito, estigma ou comportamento humano que prejudique, constranja ou impeça a participação social da pessoa com deficiência em igualdade de condições.\nExemplo em órgão público: Um servidor no balcão de atendimento do tribunal que, ao atender um cidadão com deficiência física ou auditiva, recusa-se a dialogar diretamente com ele, dirigindo-se exclusivamente ao seu acompanhante, ou dizendo de forma preconceituosa que "a pessoa não tem condições de entender o processo", infantilizando-a ou dispensando-a sem prestar as informações solicitadas.'
  },
  {
    id: 19,
    enunciado: '19. Explique por que a tecnologia assistiva é importante para a inclusão da pessoa com deficiência.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA tecnologia assistiva (Art. 3º, III da LBI) compreende recursos, produtos, dispositivos, equipamentos, metodologias e serviços desenvolvidos para compensar limitações funcionais e potencializar habilidades. Ela é fundamental para a inclusão porque devolve ou amplia a autonomia e independência da pessoa com deficiência, permitindo que ela acesse sistemas informatizados (como o processo digital por meio de leitores de tela), comunique-se com precisão, locomova-se com segurança e estude ou trabalhe em igualdade de oportunidades, sem depender compulsoriamente de terceiros para atos corriqueiros da vida civil.'
  },
  {
    id: 20,
    enunciado: '20. Imagine que uma pessoa com deficiência procure uma unidade do TJAM e tenha dificuldade para acessar determinado serviço. Explique quais atitudes o servidor poderia adotar para garantir um atendimento adequado, acessível e não discriminatório.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nO servidor (Assistente Judiciário) deve adotar postura proativa, respeitosa e inclusiva:\n1) Identificar-se com clareza e urbanidade, perguntando à pessoa, de forma respeitosa, qual apoio ela necessita (sempre respeitando sua autonomia e sem presumir incapacidade);\n2) Conceder atendimento prioritário conforme preconiza o Art. 9º da LBI;\n3) Adaptar a comunicação de acordo com a necessidade (leitura em voz alta de despachos para pessoas cegas, comunicação escrita clara ou acionamento de intérprete de Libras para pessoas surdas);\n4) Facilitar o acesso físico ao balcão e assento adequado se houver limitação motora;\n5) Nunca repelir o jurisdicionado nem exigir que retorne acompanhado de parente ou advogado para obter informações que são públicas e acessíveis.'
  }
];

// 📱 ATIVIDADE PRÁTICA — FIXAÇÃO
export const acessibilidadePracticalTask: PracticalTaskConfig = {
  scenario: 'Você é Assistente Judiciário e está atendendo uma pessoa com deficiência que precisa obter informações sobre um procedimento judicial, mas encontra dificuldade para acessar a informação disponibilizada.',
  instruction: 'Responda às 4 perguntas do caso prático abaixo para aplicar a LBI na rotina forense do TJAM. Ao concluir, você poderá enviar suas respostas diretamente ao professor pelo WhatsApp.',
  questions: [
    {
      number: 1,
      title: 'Identificação da Barreira',
      prompt: '1. Qual barreira pode estar dificultando o atendimento?',
      placeholder: 'Ex: Pode ser uma barreira nas comunicações e na informação (ausência de formato acessível, leitor de tela ou Libras) ou barreira arquitetônica/atitudinal...',
      suggestedAnswer: 'Pode se tratar de uma barreira nas comunicações e na informação (quando os documentos e certidões estão disponíveis apenas em formato impresso inacessível a deficientes visuais ou sem intérprete para pessoas surdas), barreira tecnológica (sistema informatizado que não aceita leitor de tela) ou mesmo barreira atitudinal de terceiros.'
    },
    {
      number: 2,
      title: 'Conduta Acessível do Servidor',
      prompt: '2. Que atitude você adotaria para tornar a informação acessível?',
      placeholder: 'Ex: Ouvir o cidadão, adaptar a forma de transmissão (leitura do ato, envio digital, resumo claro, uso de linguagem simples)...',
      suggestedAnswer: 'Adotaria postura proativa: identificando-me com urbanidade, ouvindo as necessidades do cidadão e adaptando a comunicação (lendo em voz alta o andamento processual, disponibilizando o arquivo em formato digital pesquisável, utilizando linguagem simples e objetiva, ou acionando o serviço de tradução e interpretação em Libras do tribunal).'
    },
    {
      number: 3,
      title: 'Direito / Princípio Aplicado',
      prompt: '3. Qual direito ou princípio da LBI está sendo aplicado?',
      placeholder: 'Ex: Princípio da Acessibilidade, da Igualdade de Condições, Atendimento Prioritário, Não Discriminação e Plena Cidadania...',
      suggestedAnswer: 'Estão sendo aplicados o princípio da Acessibilidade (Art. 3º, I), o princípio da Igualdade e Não Discriminação (Art. 4º), o direito ao Atendimento Prioritário (Art. 9º) e a garantia do Acesso à Justiça de forma acessível e plena (Art. 79 da LBI).'
    },
    {
      number: 4,
      title: 'Respeito à Autonomia',
      prompt: '4. Por que o servidor deve respeitar a autonomia da pessoa com deficiência?',
      placeholder: 'Ex: Porque a LBI consagrou a pessoa como sujeito de direitos, preservando sua capacidade de decidir por si mesma...',
      suggestedAnswer: 'Porque a pessoa com deficiência é sujeito pleno de direitos e de cidadania. O respeito à autonomia é a pedra angular da LBI (superando o modelo paternalista), assegurando que o indivíduo seja o protagonista de seus atos, de sua vontade e de suas decisões processuais, sem que o servidor ou terceiros substituam indevidamente sua manifestação de vontade.'
    }
  ]
};

// 🏛️ SIMULADOR DE ATENDIMENTO FORENSE NO TJAM
export const acessibilidadePracticalSimulatorScenarios: PracticalSimulatorScenario[] = [
  {
    id: 'sim_1',
    titulo: 'Cenário 1 • Jurisdicionada com Deficiência Visual no Balcão',
    cenario: 'Dona Antônia, pessoa cega acompanhada de seu cão-guia, comparece à secretaria de uma Vara Cível do TJAM para verificar a juntada de um documento e a data de uma audiência de conciliação.',
    pergunta: 'Como o Assistente Judiciário deve proceder para assegurar atendimento nos termos da Lei nº 13.146/2015?',
    opcoes: [
      {
        id: 'A',
        texto: 'Exigir que o cão-guia permaneça do lado de fora do fórum por questões sanitárias e pedir que a cidadã retorne acompanhada de seu advogado.',
        isCorreta: false,
        feedback: 'Incorreto. A Lei nº 11.126/2005 e a LBI garantem à pessoa com deficiência visual o direito de ingressar e permanecer com animal de serviço (cão-guia) em todos os prédios públicos e de uso público. Além disso, recusar atendimento constitui barreira atitudinal e infração aos direitos do jurisdicionado.'
      },
      {
        id: 'B',
        texto: 'Acolher a cidadã e seu cão-guia com urbanidade, garantir atendimento prioritário, identificar-se oralmente e fazer a leitura clara e fidedigna dos despachos e datas solicitadas no sistema Projudi/SAJ.',
        isCorreta: true,
        feedback: 'Correto! O servidor respeita o direito de ingresso com cão-guia, identifica-se de forma clara, aplica a prioridade de atendimento (Art. 9º) e utiliza recurso de comunicação adaptado (leitura clara e fidedigna das informações processuais).'
      },
      {
        id: 'C',
        texto: 'Pedir para a cidadã ditar seus dados pessoais para terceiros na fila realizarem a consulta por ela.',
        isCorreta: false,
        feedback: 'Incorreto. Viola o dever de sigilo funcional, a dignidade, a privacidade e a segurança dos dados da cidadã, além de desrespeitar sua autonomia.'
      }
    ]
  },
  {
    id: 'sim_2',
    titulo: 'Cenário 2 • Cidadão Surdo Usuário de Libras',
    cenario: 'Seu Marcos, cidadão surdo cuja primeira língua é a Libras, comparece ao balcão do fórum buscando certidão de objeto e pé de uma ação de família.',
    pergunta: 'Qual a conduta adequada do servidor público do Tribunal de Justiça?',
    opcoes: [
      {
        id: 'A',
        texto: 'Dizer oralmente que não fala Libras e pedir que ele retorne quando trouxer um familiar que possa falar por ele.',
        isCorreta: false,
        feedback: 'Incorreto. Conduta que gera barreira comunicacional e atitudinal, violando o princípio da igualdade de acesso à justiça (Art. 79 da LBI).'
      },
      {
        id: 'B',
        texto: 'Utilizar recursos de comunicação acessíveis disponíveis (como comunicação escrita em linguagem simples, anotações claras ou acionar o setor de acessibilidade/intérprete de Libras do TJAM) para viabilizar a expedição da certidão.',
        isCorreta: true,
        feedback: 'Correto! O servidor busca ativamente vencer a barreira de comunicação utilizando escrita simples, recursos tecnológicos ou o suporte da equipe de tradutores/intérpretes de Libras do órgão, garantindo o direito à informação.'
      },
      {
        id: 'C',
        texto: 'Falar muito alto e gesticular exageradamente para que ele consiga ouvir no balcão.',
        isCorreta: false,
        feedback: 'Incorreto. Falar mais alto com uma pessoa surda não resolve a comunicação e expõe o cidadão a constrangimento desnecessário.'
      }
    ]
  },
  {
    id: 'sim_3',
    titulo: 'Cenário 3 • Jurisdicionada em Cadeira de Rodas perante Barreira Arquitetônica',
    cenario: 'Uma advogada e sua cliente cadeirante chegam à recepção do fórum e constatam que o elevador de acesso ao 2º andar (onde se localiza o cartório) está em manutenção técnica.',
    pergunta: 'Diante dessa barreira temporária de acessibilidade, qual medida imediata o servidor do TJAM deve adotar?',
    opcoes: [
      {
        id: 'A',
        texto: 'Informar que a audiência e o atendimento serão redesignados para o próximo mês sem qualquer alternativa presencial.',
        isCorreta: false,
        feedback: 'Incorreto. A inércia da administração perante barreiras arquitetônicas fere o acesso imediato à justiça e traz prejuízo aos jurisdicionados.'
      },
      {
        id: 'B',
        texto: 'Articular com a coordenação a realização do atendimento e dos atos processuais no piso térreo (em sala de conciliação ou balcão acessível), comunicando imediatamente o magistrado responsável para adequação do local.',
        isCorreta: true,
        feedback: 'Correto! O servidor deve atuar com proatividade e razoabilidade, viabilizando o atendimento no andar térreo para afastar o prejuízo gerado pela barreira arquitetônica física.'
      },
      {
        id: 'C',
        texto: 'Solicitar que populares na fila carreguem a cadeira de rodas pelas escadas sem treinamento nem segurança.',
        isCorreta: false,
        feedback: 'Incorreto. Coloca em risco iminente a integridade física e a segurança da pessoa com deficiência e dos demais presentes.'
      }
    ]
  },
  {
    id: 'sim_4',
    titulo: 'Cenário 4 • Autonomia e Tomada de Decisão Apoiada',
    cenario: 'Um jovem com deficiência intelectual procura o fórum acompanhado de seu irmão para solicitar informações sobre o andamento de seu benefício previdenciário em execução.',
    pergunta: 'Durante o diálogo no balcão, qual postura o Assistente Judiciário deve assumir?',
    opcoes: [
      {
        id: 'A',
        texto: 'Dirigir o olhar e as explicações diretamente ao jovem com deficiência com urbanidade e clareza, respeitando sua autonomia como titular do direito, e mantendo o irmão como apoio conforme a vontade expressada pelo próprio titular.',
        isCorreta: true,
        feedback: 'Correto! A LBI consagrou a plena capacidade civil da pessoa com deficiência e superou a presunção de incapacidade. O servidor deve conversar diretamente com a pessoa com deficiência, tratando-a com respeito e autonomia.'
      },
      {
        id: 'B',
        texto: 'Ignorar a presença do jovem e tratar exclusivamente com o irmão, presumindo que pessoas com deficiência intelectual não entendem linguagem jurídica.',
        isCorreta: false,
        feedback: 'Incorreto. Essa é uma clássica barreira atitudinal que infantiliza a pessoa com deficiência e viola o Art. 4º da LBI.'
      },
      {
        id: 'C',
        texto: 'Exigir certidão de interdição judicial obrigatória para poder fornecer qualquer informação no balcão.',
        isCorreta: false,
        feedback: 'Incorreto. A curatela pela LBI é medida extraordinária e restrita aos atos patrimoniais e negociais, nunca obstando o direito de obter informações no balcão da justiça.'
      }
    ]
  }
];

