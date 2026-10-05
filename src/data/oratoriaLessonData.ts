// Data for Oratória — Aula 01: Comunicação Verbal e Não Verbal
// Nível Intermediário — TJAM Assistente Judiciário

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  textoApoio?: string;
  opcoes: string[];
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
  steps: string[];
  audioScriptSuggestion: string;
}

// 10 Flashcards de Memorização e Revisão Rápida de Oratória
export const oratoriaFlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é a diferença fundamental entre Comunicação Verbal e Não Verbal?',
    a: '• Comunicação Verbal: Utiliza palavras como código, seja de forma ORAL (fala, atendimento, reunião) ou ESCRITA (e-mail, ofício, relatório).\n• Comunicação Não Verbal: Ocorre por elementos sem palavras (expressões faciais, postura corporal, gestos, contato visual, tom e ritmo da voz).'
  },
  {
    q: 'Quais são os 6 elementos essenciais de qualquer situação comunicativa?',
    a: '1. Emissor (quem transmite)\n2. Receptor (quem recebe e decodifica)\n3. Mensagem (o conteúdo transmitido)\n4. Canal (o meio físico/tecnológico)\n5. Código (o sistema de signos, ex: língua portuguesa)\n6. Contexto (a situação situacional/forense).'
  },
  {
    q: 'O que caracteriza a Escuta Ativa no atendimento judiciário?',
    a: 'É a postura de ouvir com atenção plena, sem interrupções precipitadas, compreendendo a necessidade real do jurisdicionado e fazendo perguntas de checagem ("Só para confirmar, o senhor se refere ao processo X?") antes de responder.'
  },
  {
    q: 'O que são Ruídos na Comunicação e quais são seus 4 tipos clássicos?',
    a: 'Ruído é qualquer interferência que prejudica a transmissão ou compreensão da mensagem:\n1. Físico (barulho ambiente)\n2. Técnico (falha no microfone/sistema)\n3. Linguístico (jargão jurídico inacessível ou ambiguidade)\n4. Psicológico (ansiedade, preconceito ou desatenção).'
  },
  {
    q: 'O que significa Empatia Comunicativa no serviço público?',
    a: 'É a capacidade de se colocar no lugar do cidadão, compreendendo suas limitações e reformulando a mensagem em linguagem simples e acolhedora quando ele não entender, sem infantilizar nem demonstrar impaciência.'
  },
  {
    q: 'Qual é o impacto do alinhamento entre fala e linguagem corporal?',
    a: 'Quando a comunicação verbal e a não verbal estão alinhadas (olhar nos olhos, postura ereta e acolhedora, voz serena), a mensagem ganha credibilidade e segurança. Se houver contradição (dizer "estou à disposição" olhando para o celular), o receptor tende a acreditar na linguagem corporal.'
  },
  {
    q: 'Quais elementos da voz influenciam a percepção da oratória forense?',
    a: 'Volume (adequado ao ambiente), velocidade (sem correria para não gerar ruído), ritmo, pausas estratégicas (que enfatizam ideias e dão tempo para assimilação) e clareza da dicção/pronúncia.'
  },
  {
    q: 'O que define a Objetividade sem cair na rispidez?',
    a: 'Objetividade é transmitir a informação necessária com clareza e lógica, eliminando detalhes irrelevantes, mas mantendo a cordialidade, a urbanidade e o respeito exigidos pelo serviço público.'
  },
  {
    q: 'Por que o uso excessivo de juridiquês constitui um ruído comunicacional?',
    a: 'Porque termos estritamente técnicos (como "conclusos para despacho", "trânsito em julgado", "preclusão consumativa") não fazem parte do código linguístico do cidadão comum, impedindo a compreensão da mensagem e o exercício da cidadania.'
  },
  {
    q: 'Como agir quando o cidadão demonstra não ter compreendido a orientação?',
    a: 'O servidor deve assumir a responsabilidade pela eficácia da transmissão, reformulando a explicação com palavras mais simples, analogias práticas ou apoio visual/escrito, checando se a dúvida foi sanada com gentileza.'
  }
];

// Pontos de Resumo da Aula 01 de Oratória
export const oratoriaSummaryPoints: string[] = [
  'Conceito de Comunicação: Processo dinâmico de troca e compreensão de ideias, informações e orientações com clareza e respeito.',
  'Elementos Básicos: Emissor, Receptor, Mensagem, Canal, Código e Contexto.',
  'Comunicação Verbal (Oral e Escrita): Palavras estruturadas; deve ter clareza, objetividade, precisão, adequação e organização.',
  'Comunicação Não Verbal: Postura, contato visual, gesticulação, expressões faciais, proximidade e tom vocal.',
  'Alinhamento e Coerência: O comportamento não verbal deve confirmar a fala verbal para gerar confiança e segurança.',
  'Escuta Ativa: Saber ouvir antes de falar, checando a compreensão com perguntas de confirmação.',
  'Tipos de Ruídos: Físico (barulho), Técnico (falhas eletrônicas), Linguístico (jargões incompreensíveis) e Psicológico (desatenção/preconceito).',
  'Padrão TJAM de Atendimento: Comunicação empática, linguagem simples e acessível, preservação do sigilo funcional e urbanidade.'
];

// 10 Questões Objetivas (1 a 10)
export const oratoriaMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A comunicação verbal caracteriza-se principalmente pelo uso:',
    opcoes: [
      'A) da postura corporal.',
      'B) de gestos e expressões faciais.',
      'C) de palavras, oralmente ou por escrito.',
      'D) da distância entre os interlocutores.',
      'E) exclusivamente da fala.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: A comunicação verbal é aquela estruturada em palavras (signos linguísticos), abrangendo tanto a modalidade oral (fala) quanto a modalidade escrita (textos, ofícios, e-mails).'
  },
  {
    id: 2,
    enunciado: '2. Em um atendimento ao público, o servidor explica um procedimento utilizando linguagem simples e objetiva. Essa conduta favorece principalmente:',
    opcoes: [
      'A) o ruído na comunicação.',
      'B) a clareza da mensagem.',
      'C) a comunicação não verbal.',
      'D) a informalidade.',
      'E) a comunicação exclusivamente escrita.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: O emprego de linguagem clara, simples e objetiva reduz ruídos semânticos e garante que o cidadão compreenda com exatidão o procedimento a ser seguido.'
  },
  {
    id: 3,
    enunciado: '3. Um servidor afirma verbalmente que está disponível para ajudar, mas mantém os braços cruzados, evita contato visual e demonstra impaciência. Nesse caso, pode ocorrer:',
    opcoes: [
      'A) reforço absoluto da mensagem verbal.',
      'B) ausência de comunicação.',
      'C) contradição entre elementos verbais e não verbais.',
      'D) comunicação exclusivamente verbal.',
      'E) eliminação dos ruídos comunicacionais.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Há nítida contradição entre a fala (verbal) e a linguagem corporal (não verbal). Em situações de incoerência, o interlocutor tende a priorizar a percepção não verbal, interpretando desinteresse ou frieza.'
  },
  {
    id: 4,
    enunciado: '4. São exemplos de elementos da comunicação não verbal:',
    opcoes: [
      'A) palavras e frases.',
      'B) textos e documentos.',
      'C) postura, gestos e expressões faciais.',
      'D) somente a escrita formal.',
      'E) exclusivamente a gramática.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Postura corporal, gestos, mímica facial, contato visual e movimentação constituem os canais não verbais por excelência da linguagem humana.'
  },
  {
    id: 5,
    enunciado: '5. Durante uma apresentação, falar excessivamente rápido pode:',
    opcoes: [
      'A) sempre melhorar a compreensão.',
      'B) prejudicar a compreensão da mensagem.',
      'C) eliminar a necessidade de pausas.',
      'D) substituir a linguagem corporal.',
      'E) tornar a comunicação necessariamente mais objetiva.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: A velocidade excessiva impede que o ouvinte processe as ideias, prejudica a dicção e compromete a clareza, atuando como um ruído no processo comunicativo.'
  },
  {
    id: 6,
    enunciado: '6. A objetividade na comunicação profissional significa:',
    opcoes: [
      'A) utilizar palavras difíceis para demonstrar conhecimento.',
      'B) falar o máximo possível sobre o assunto.',
      'C) transmitir a informação de maneira direta e adequada à situação.',
      'D) evitar qualquer explicação.',
      'E) utilizar somente linguagem informal.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Ser objetivo consiste em entregar a informação estritamente necessária, de maneira estruturada, direta e compreensível, sem rodeios ou excesso de jargões desnecessários.'
  },
  {
    id: 7,
    enunciado: '7. Em uma comunicação eficiente, o receptor:',
    opcoes: [
      'A) apenas recebe informações, sem interpretá-las.',
      'B) deve ignorar o contexto da mensagem.',
      'C) interpreta a mensagem considerando seu conteúdo e contexto.',
      'D) não pode solicitar esclarecimentos.',
      'E) é responsável por eliminar todos os ruídos.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: O receptor atua de forma ativa na decodificação, atribuindo significado à mensagem à luz do contexto comunicativo e de suas referências prévias.'
  },
  {
    id: 8,
    enunciado: '8. Um servidor percebe que o cidadão não compreendeu sua explicação. Uma atitude adequada seria:',
    opcoes: [
      'A) repetir exatamente a mesma explicação, sem alterações.',
      'B) encerrar o atendimento.',
      'C) adaptar a linguagem e verificar se a informação foi compreendida.',
      'D) utilizar termos técnicos mais complexos.',
      'E) transferir a responsabilidade ao cidadão.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: A empatia e a responsabilidade comunicativa exigem que o emissor adapte a linguagem, utilize exemplos práticos e confirme se a dúvida foi de fato esclarecida.'
  },
  {
    id: 9,
    enunciado: '9. O tom de voz, a velocidade da fala e as pausas podem contribuir para:',
    opcoes: [
      'A) tornar a comunicação mais compreensível.',
      'B) eliminar completamente a comunicação não verbal.',
      'C) substituir o conteúdo da mensagem.',
      'D) impedir a interpretação do receptor.',
      'E) tornar qualquer mensagem informal.'
    ],
    correta: 0,
    explicacao: 'Gabarito A: Os recursos paralinguísticos (modulação do tom, ritmo equilibrado e pausas intencionais) facilitam a retenção da atenção e aumentam a clareza do discurso.'
  },
  {
    id: 10,
    enunciado: '10. No atendimento ao público, a comunicação adequada deve priorizar:',
    opcoes: [
      'A) clareza, respeito, objetividade e adequação da linguagem.',
      'B) velocidade acima da compreensão.',
      'C) linguagem exclusivamente técnica.',
      'D) ausência de contato visual.',
      'E) utilização constante de termos jurídicos.'
    ],
    correta: 0,
    explicacao: 'Gabarito A: O atendimento de excelência no Poder Judiciário harmoniza clareza, respeito à dignidade do cidadão, objetividade nas respostas e linguagem acessível à sociedade.'
  }
];

// 5 Questões Certo ou Errado (11 a 15) — Estilo Cebraspe
export const oratoriaTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A comunicação não verbal pode complementar, reforçar ou até contradizer uma mensagem verbal.',
    statement: 'A linguagem não verbal tem a capacidade de reforçar, complementar ou contradizer o discurso falado.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: Elementos não verbais (gestos, semblante, postura) atuam em constante interação com o conteúdo verbal, podendo validá-lo ou gerar dissonância perceptiva.'
  },
  {
    id: 12,
    enunciado: '12. A postura corporal e as expressões faciais podem transmitir informações durante uma interação.',
    statement: 'Postura e expressões do rosto são veículos emissores de informação comunicativa.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: O corpo emite sinais constantes de acolhimento, prontidão, desdém ou nervosismo, interpretados intuitivamente pelo interlocutor.'
  },
  {
    id: 13,
    enunciado: '13. A comunicação verbal ocorre somente por meio da fala, não abrangendo a escrita.',
    statement: 'A modalidade verbal restringe-se exclusivamente à manifestação oral falada.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: A comunicação verbal abrange tanto a modalidade ORAL (fala) quanto a modalidade ESCRITA (grafia de palavras em textos, despachos e mensagens).'
  },
  {
    id: 14,
    enunciado: '14. Adaptar a linguagem ao público pode favorecer a compreensão da mensagem.',
    statement: 'O ajuste do registro linguístico às necessidades do ouvinte potencializa o sucesso comunicativo.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: A adequação vocabular elimina ruídos semânticos e aproxima o servidor do cidadão, promovendo acessibilidade cognitiva.'
  },
  {
    id: 15,
    enunciado: '15. Falar mais rapidamente sempre torna uma apresentação mais eficiente, pois permite transmitir mais informações em menos tempo.',
    statement: 'O aumento da velocidade de elocução é garantia incondicional de eficiência oratória.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: Falar rápido demais costuma atropelar a dicção, impedir pausas de reflexão e sobrecarregar o receptor, comprometendo a assimilação do conteúdo.'
  }
];

// 5 Questões Dissertativas (16 a 20) com Espelho de Resposta
export const oratoriaDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique a diferença entre comunicação verbal e comunicação não verbal e apresente dois exemplos de cada uma.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• Comunicação Verbal: É aquela que se utiliza de signos linguísticos (palavras) para codificar a mensagem. Pode ocorrer na modalidade oral (ex.: atendimento no balcão da vara, sustentação perante o colegiado) ou escrita (ex.: redação de certidão cartorária, expedição de ofício).\n• Comunicação Não Verbal: Ocorre sem o emprego direto de palavras, manifestando-se por meio de canais expressivos do corpo e da voz (ex.: contato visual atento com o cidadão durante o atendimento, postura corporal ereta e receptiva, gestos moderados que ilustram a fala e expressões faciais de cordialidade).'
  },
  {
    id: 17,
    enunciado: '17. Por que a clareza é importante no atendimento realizado por um servidor público?',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA clareza é basilar porque o serviço público destina-se a cidadãos com diferentes níveis de escolaridade e vivência. Uma comunicação clara evita ruídos, desinformação e retrabalho, garantindo que o jurisdicionado compreenda com exatidão seus direitos, prazos processuais e os procedimentos a serem cumpridos, materializando o princípio republicano da eficiência e da transparência.'
  },
  {
    id: 18,
    enunciado: '18. Explique como a postura corporal pode influenciar a percepção do interlocutor durante uma conversa.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA postura corporal comunica atitudes e estados emocionais antes mesmo de qualquer palavra ser dita. Uma postura aberta, com tronco ereto, cabeça alinhada e contato visual direto transmite segurança, respeito e disponibilidade para o atendimento. Em contrapartida, postura curvada, braços cruzados de forma defensiva ou o olhar fixo em telas/celulares transmitem frieza, impaciência e descaso, gerando distanciamento e insegurança no interlocutor.'
  },
  {
    id: 19,
    enunciado: '19. Imagine que um cidadão não compreendeu uma orientação fornecida por um servidor. Explique quais atitudes o servidor poderia tomar para melhorar a comunicação.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nO servidor deve adotar postura empática e resolutiva:\n1) Manter a serenidade e a cordialidade, sem demonstrar irritação;\n2) Evitar simplesmente repetir a mesma frase com o mesmo tom;\n3) Reformular a explicação utilizando linguagem simples, objetiva e desprovida de jargões jurídicos técnicos;\n4) Empregar analogias cotidianas ou apoio visual/escrito (anotar o passo a passo ou o número do processo em um comprovante);\n5) Utilizar a escuta ativa com perguntas de checagem ("Consegui explicar com clareza?", "Ficou alguma dúvida sobre o primeiro passo?").'
  },
  {
    id: 20,
    enunciado: '20. Explique por que a comunicação verbal e a não verbal devem estar alinhadas durante uma apresentação ou atendimento ao público.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nO alinhamento (congruência) entre a mensagem verbal e a não verbal é indispensável para a credibilidade e a eficácia comunicativa. Quando as palavras dizem uma coisa ("estou à sua disposição") e os gestos comunicam outra (olhar para os lados, suspiros, corpo voltado para longe), o cérebro humano prioriza intuitivamente os sinais não verbais, identificando falsidade ou desinteresse. O alinhamento harmonioso gera confiança mútua, fortalece a autoridade profissional e garante uma experiência digna ao cidadão.'
  }
];

// Atividade Prática — Gravação de Áudio e Envio WhatsApp
export const oratoriaPracticalTask: PracticalTaskConfig = {
  scenario: 'Imagine que você é servidor (Assistente Judiciário) do TJAM e precisa orientar um cidadão idoso que compareceu ao balcão e está com dificuldade para entender como consultar o andamento do processo no portal.',
  instruction: 'Grave um áudio de aproximadamente 1 minuto simulando o atendimento (ou redija seu roteiro de fala abaixo). Em seguida, envie para o professor pelo WhatsApp para avaliação de clareza, postura vocal, ritmo e objetividade.',
  steps: [
    '1. Cumprimente o cidadão com urbanidade e cordialidade ("Bom dia, senhor(a), seja bem-vindo ao TJAM!");',
    '2. Explique a informação de forma clara e objetiva, sem excesso de termos técnicos;',
    '3. Demonstre paciência e empatia, falando em velocidade confortável e ritmo pausado;',
    '4. Finalize checando a compreensão e colocando-se à disposição para novo apoio.'
  ],
  audioScriptSuggestion: 'Bom dia! Meu nome é [Seu Nome], sou assistente judiciário aqui do tribunal. Compreendo perfeitamente a sua dúvida e vou lhe explicar passo a passo como o senhor pode acompanhar o seu processo.\n\nO senhor pode acessar a página oficial do TJAM na internet pelo computador ou celular da sua família. Lá na página inicial, clique na opção "Consulta Processual". Vai abrir um campo para digitar o número da ação. Basta digitar os números que estão anotados aqui neste papel e clicar em pesquisar.\n\nAli vão aparecer todas as movimentações mais recentes. Se o senhor encontrar qualquer dificuldade para acessar, pode retornar aqui ao balcão que nós teremos o maior prazer em ajudar. Ficou clara essa explicação ou o senhor gostaria que eu repetisse algum ponto?'
};
