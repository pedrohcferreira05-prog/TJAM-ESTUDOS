// Data for Língua Portuguesa — Aula 02: Tipos e Gêneros Textuais
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
  questions: {
    number: number;
    title: string;
    prompt: string;
    placeholder: string;
    suggestedAnswer: string;
  }[];
}

// 10 Flashcards de Memorização e Revisão Rápida
export const portuguesAula2FlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é a regra de ouro para diferenciar Tipo Textual de Gênero Textual?',
    a: '• Tipo Textual: Refere-se à estrutura e organização interna do texto (narração, descrição, dissertação expositiva, argumentação e injunção). É uma categoria restrita e teórica.\n• Gênero Textual: Refere-se à forma concreta de comunicação social e sua função comunicativa (notícia, ofício, ata, edital, e-mail, etc.). É uma categoria dinâmica e infinita.'
  },
  {
    q: 'Quais são os 5 tipos textuais fundamentais e suas palavras-chave?',
    a: '1. Narração → Acontecimento (tempo, espaço, personagens, narrador).\n2. Descrição → Características (detalhes sensoriais, estado).\n3. Exposição → Explicação / Informação (conceituação sem opinião).\n4. Argumentação → Defesa de tese / Ideia (convencimento do leitor).\n5. Injunção → Orientação / Instrução (verbos no imperativo/infinitivo).'
  },
  {
    q: 'Como identificar a predominância da Narração em um texto de concurso?',
    a: 'Verifique se há uma progressão temporal de acontecimentos ligados por relações de causa e tempo (ex.: "O servidor entrou, verificou os autos e atendeu o primeiro cidadão"). Acontecimentos sucessivos = Narração.'
  },
  {
    q: 'Como diferenciar Dissertação Expositiva de Dissertação Argumentativa?',
    a: '• Expositiva: Apenas apresenta, define ou explica conceitos e dados neutros, sem tomar partido (ex.: conceito de órgão público).\n• Argumentativa: Apresenta um ponto de vista (tese) e seleciona justificativas/argumentos para persuadir o leitor (ex.: por que os serviços digitais devem ser inclusivos).'
  },
  {
    q: 'O que caracteriza o Tipo Injuntivo e onde ele predomina no ambiente forense?',
    a: 'Caracteriza-se por orientar, instruir ou prescrever uma conduta ao leitor. Emprega verbos no imperativo ou no infinitivo. Predomina em manuais de sistemas processuais (Projudi/SAJ), regulamentos internos, editais e tutoriais de acesso.'
  },
  {
    q: 'Qual é a diferença funcional entre Notícia e Reportagem?',
    a: '• Notícia: Informa um fato ou acontecimento pontual e recente de forma direta e objetiva.\n• Reportagem: Aprofunda, contextualiza e investiga o fato, utilizando dados estatísticos, entrevistas com especialistas, histórico e múltiplas perspectivas.'
  },
  {
    q: 'O que é o gênero Edital e quais são suas características essenciais?',
    a: 'É um documento oficial de natureza normativa e informativa utilizado para dar publicidade a regras, condições, etapas e prazos de concursos, licitações ou intimações públicas. Sua linguagem é técnica, formal, clara e vinculativa.'
  },
  {
    q: 'O que diferencia o gênero Requerimento do gênero Ofício?',
    a: '• Requerimento: Utilizado pelo cidadão ou servidor para SOLICITAR formalmente um direito ou concessão a uma autoridade competente.\n• Ofício: Utilizado para a COMUNICAÇÃO formal institucional entre órgãos públicos ou autoridades (comunicar, encaminhar, solicitar informações recíprocas).'
  },
  {
    q: 'O que é uma Ata e qual seu propósito no Poder Judiciário?',
    a: 'A ata é o gênero textual que registra formal, fiel e cronologicamente os acontecimentos, manifestações, deliberações e decisões ocorridas em uma reunião, audiência de instrução ou sessão de julgamento no TJAM.'
  },
  {
    q: 'Um mesmo gênero textual pode apresentar mais de um tipo textual?',
    a: 'SIM! Essa é a pegadinha favorita das bancas. Um gênero textual (como a notícia ou o relatório) frequentemente combina diferentes tipos (ex.: narra um fato, descreve o cenário e expõe dados). O que se analisa é a tipologia PREDOMINANTE ou a função do trecho cobrado.'
  }
];

// Pontos de Resumo da Aula 02
export const portuguesAula2SummaryPoints: string[] = [
  'Conceito de Tipo Textual: Como o texto é estruturado (número limitado: narração, descrição, exposição, argumentação, injunção).',
  'Conceito de Gênero Textual: Para que o texto serve e em qual situação social circula (infinitos: notícia, ofício, ata, edital, etc.).',
  'Narração (Foco no Acontecimento): Envolve personagens, tempo, espaço, narrador e sucessão cronológica de ações no passado.',
  'Descrição (Foco nas Características): Retrato verbal de pessoas, objetos ou ambientes, pausando o tempo narrativo.',
  'Exposição vs. Argumentação: Exposição informa e esclarece conceitos; Argumentação defende uma tese com intuito persuasivo.',
  'Injunção (Instrução e Comando): Textos prescritivos/orientadores com verbos no imperativo (faça, acesse, clique, consulte).',
  'Gêneros Forenses TJAM: Ofício (comunicação entre órgãos), Requerimento (pedido formal), Ata (registro de sessão) e Edital (regras públicas).',
  'Heterogeneidade Tipológica: Um gênero textual raramente é puro; ele mescla tipos, cabendo identificar a estrutura predominante.'
];

// 10 Questões Objetivas (1 a 10)
export const portuguesAula2McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Os tipos textuais são definidos principalmente:',
    opcoes: [
      'A) pelo meio de publicação do texto.',
      'B) pela extensão do texto.',
      'C) pela forma de organização e pela finalidade predominante.',
      'D) pelo público-alvo exclusivamente.',
      'E) pelo assunto abordado.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Os tipos textuais correspondem às estruturas linguísticas e formas de organização interna do texto (como a linguagem se organiza para narrar, descrever, expor, argumentar ou instruir) de acordo com sua finalidade comunicativa predominante.'
  },
  {
    id: 2,
    enunciado: '2. Assinale a alternativa que apresenta apenas tipos textuais:',
    opcoes: [
      'A) notícia, reportagem e artigo.',
      'B) carta, ofício e requerimento.',
      'C) narração, descrição e injunção.',
      'D) edital, ata e relatório.',
      'E) notícia, descrição e ofício.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Narração, descrição e injunção (junto à dissertação expositiva e argumentativa) são os tipos textuais clássicos. Notícia, reportagem, artigo, carta, ofício, requerimento, edital, ata e relatório são gêneros textuais.'
  },
  {
    id: 3,
    enunciado: '3. Leia:\n\n“O servidor entrou na sala, organizou os documentos e iniciou o atendimento. Alguns minutos depois, recebeu o primeiro cidadão.”\n\nPredomina nesse trecho o tipo textual:',
    textoApoio: '“O servidor entrou na sala, organizou os documentos e iniciou o atendimento. Alguns minutos depois, recebeu o primeiro cidadão.”',
    opcoes: [
      'A) descritivo.',
      'B) narrativo.',
      'C) injuntivo.',
      'D) argumentativo.',
      'E) expositivo.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: O trecho relata uma sequência de ações concluídas no tempo por um personagem ("entrou" → "organizou" → "iniciou" → "recebeu"), o que caracteriza a essência da progressão temporal típica da narração.'
  },
  {
    id: 4,
    enunciado: '4. Leia:\n\n“A sala possuía paredes claras, quatro mesas, duas janelas amplas e um balcão próximo à entrada.”\n\nPredomina o tipo:',
    textoApoio: '“A sala possuía paredes claras, quatro mesas, duas janelas amplas e um balcão próximo à entrada.”',
    opcoes: [
      'A) narrativo.',
      'B) argumentativo.',
      'C) injuntivo.',
      'D) descritivo.',
      'E) expositivo.'
    ],
    correta: 3,
    explicacao: 'Gabarito D: O excerto traça um retrato estático do espaço físico, enumerando detalhes e elementos da sala (paredes claras, quatro mesas, janelas, balcão), sem progressão temporal de ações, configurando a descrição pura.'
  },
  {
    id: 5,
    enunciado: '5. Um texto que apresenta conceitos, informações e explicações sobre determinado assunto, sem necessariamente defender uma posição, apresenta predominância:',
    opcoes: [
      'A) narrativa.',
      'B) descritiva.',
      'C) expositiva.',
      'D) injuntiva.',
      'E) argumentativa.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: A dissertação expositiva (ou texto informativo/expositivo) tem como propósito primordial transmitir conhecimento, definir conceitos e esclarecer fatos sem emitir juízo de valor ou intenção de persuadir.'
  },
  {
    id: 6,
    enunciado: '6. Leia:\n\n“A modernização dos serviços públicos deve ser acompanhada de políticas de inclusão digital, pois parte da população ainda enfrenta dificuldades para utilizar determinadas ferramentas.”\n\nNesse trecho predomina a:',
    textoApoio: '“A modernização dos serviços públicos deve ser acompanhada de políticas de inclusão digital, pois parte da população ainda enfrenta dificuldades para utilizar determinadas ferramentas.”',
    opcoes: [
      'A) narração.',
      'B) descrição.',
      'C) injunção.',
      'D) argumentação.',
      'E) exposição puramente informativa.'
    ],
    correta: 3,
    explicacao: 'Gabarito D: Há uma tese explícita formulada pelo autor ("a modernização deve ser acompanhada de inclusão") sustentada por um argumento justificador introduzido pelo conectivo explicativo-causal "pois parte da população ainda enfrenta dificuldades".'
  },
  {
    id: 7,
    enunciado: '7. Leia:\n\n“Acesse o sistema, informe seu usuário e senha e selecione a opção ‘Consultar Processo’.”\n\nPredomina o tipo textual:',
    textoApoio: '“Acesse o sistema, informe seu usuário e senha e selecione a opção ‘Consultar Processo’.”',
    opcoes: [
      'A) narrativo.',
      'B) descritivo.',
      'C) argumentativo.',
      'D) expositivo.',
      'E) injuntivo.'
    ],
    correta: 4,
    explicacao: 'Gabarito E: Os verbos estão conjugados no modo imperativo ("Acesse", "informe", "selecione"), orientando o interlocutor a realizar ações práticas sequenciais, o que define o tipo injuntivo (instrucional).'
  },
  {
    id: 8,
    enunciado: '8. Assinale a alternativa que apresenta corretamente um gênero textual:',
    opcoes: [
      'A) narração.',
      'B) descrição.',
      'C) argumentação.',
      'D) notícia.',
      'E) injunção.'
    ],
    correta: 3,
    explicacao: 'Gabarito D: "Notícia" é um gênero textual jornalístico, materializado no cotidiano social. Já narração, descrição, argumentação e injunção são tipos textuais teóricos.'
  },
  {
    id: 9,
    enunciado: '9. Sobre a diferença entre tipos e gêneros textuais, assinale a alternativa correta:',
    opcoes: [
      'A) Todo gênero textual possui obrigatoriamente apenas um tipo textual.',
      'B) Tipo textual e gênero textual são expressões sinônimas.',
      'C) Gêneros textuais são formas concretas de comunicação utilizadas em diferentes situações sociais.',
      'D) Os gêneros textuais são definidos somente pelo tamanho do texto.',
      'E) Os tipos textuais dependem exclusivamente do meio de publicação.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Gêneros textuais são realizações empíricas e concretas de linguagem historicamente construídas na sociedade para atender a objetivos e necessidades comunicativas específicas.'
  },
  {
    id: 10,
    enunciado: '10. Um documento utilizado para registrar formalmente acontecimentos e decisões de uma reunião é denominado:',
    opcoes: [
      'A) notícia.',
      'B) artigo de opinião.',
      'C) ata.',
      'D) requerimento.',
      'E) reportagem.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: A ata é o gênero oficial por excelência destinado a lavrar e registrar formalmente o que se passou e o que foi deliberado em uma sessão, reunião administrativa ou audiência forense.'
  }
];

// 5 Questões Certo ou Errado (11 a 15)
export const portuguesAula2TfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. Narração, descrição, exposição, argumentação e injunção são exemplos de tipos textuais.',
    statement: 'Narração, descrição, exposição, argumentação e injunção constituem tipos textuais.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: Correspondem às cinco categorias estruturais teóricas clássicas que organizam o discurso conforme seu arranjo linguístico e propósito geral.'
  },
  {
    id: 12,
    enunciado: '12. Notícia, reportagem, edital, ofício e requerimento são exemplos de gêneros textuais.',
    statement: 'Notícia, reportagem, edital, ofício e requerimento são formas comunicativas concretas (gêneros textuais).',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: Todos são gêneros com finalidades sociais, formatos e veículos de circulação específicos na vida social e jurídica.'
  },
  {
    id: 13,
    enunciado: '13. Um gênero textual pode apresentar mais de um tipo textual em sua composição.',
    statement: 'Gêneros textuais aceitam a mescla de diferentes tipologias textuais.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: Os gêneros são flexíveis e dinâmicos; por exemplo, uma notícia jornalística pode ter base narrativa ao relatar o fato, mas conter trechos descritivos do local e expositivos de dados estatísticos.'
  },
  {
    id: 14,
    enunciado: '14. Todo texto argumentativo pertence necessariamente ao gênero artigo de opinião.',
    statement: 'O tipo textual argumentativo está restrito ao gênero artigo de opinião.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: A argumentação é um tipo textual presente em múltiplos gêneros distintos, tais como redação dissertativa de concurso, editorial, carta de leitor, petição jurídica, sustentação oral e ensaio acadêmico.'
  },
  {
    id: 15,
    enunciado: '15. A principal característica da injunção é orientar ou instruir o leitor para a realização de determinada ação.',
    statement: 'O texto injuntivo tem como essência orientar o comportamento ou a ação do leitor.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: O texto injuntivo possui caráter diretivo, normativo ou instrutivo, fornecendo ordens, prescrições, regras ou passos que o leitor deve seguir.'
  }
];

// 5 Questões Dissertativas (16 a 20) com Gabarito e Pontos Esperados
export const portuguesAula2DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique, com suas palavras, a diferença entre tipo textual e gênero textual.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nTipo textual corresponde à organização predominante e estrutural interna da linguagem (como o texto é estruturado formalmente, constituindo um número limitado e teórico de modelos: narração, descrição, dissertação expositiva, argumentação e injunção).\nPor outro lado, gênero textual é uma forma concreta, histórica e cultural de comunicação utilizada em determinada situação social, com função comunicativa específica e circulação social definida (número infinito e adaptável: notícia, ata, ofício, requerimento, edital, receita, etc.).'
  },
  {
    id: 17,
    enunciado: '17. Diferencie narração e descrição, apresentando um exemplo de cada.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA narração apresenta acontecimentos encadeados em uma sequência temporal cronológica, envolvendo personagens, tempo, espaço e narrador (exemplo: "O assistente judiciário chegou à vara, abriu os autos e concluiu o despacho com celeridade").\nJá a descrição apresenta um retrato das características, qualidades e detalhes de pessoas, objetos, ambientes ou situações, em um recorte estático do tempo (exemplo: "A sala da 1ª Vara Cível era ampla, climatizada, com mobília ergonômica e arquivos bem organizados ao fundo").'
  },
  {
    id: 18,
    enunciado: '18. Qual é a principal diferença entre um texto expositivo e um texto argumentativo?',
    respostaEsperada: 'Gabarito Oficial TJAM:\nO texto expositivo busca primordialmente informar, conceituar ou explicar determinado fato ou teoria com neutralidade, sem o propósito de convencer o leitor sobre uma opinião pessoal.\nO texto argumentativo, diferentemente, parte da apresentação de uma tese (ponto de vista ou posicionamento sobre um assunto polêmico) e recorre a argumentos, dados e raciocínios lógicos com a finalidade expressa de persuadir e convencer o interlocutor sobre a validade daquela tese.'
  },
  {
    id: 19,
    enunciado: '19. Explique por que uma notícia pode apresentar características narrativas, mesmo sendo um gênero textual.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nPorque gênero textual e tipo textual não se confundem nem são excludentes. O gênero textual "notícia" pertence à esfera jornalística e tem por objetivo social informar o público sobre um fato recente e relevante. Para cumprir essa finalidade, a notícia relata acontecimentos que se desenrolaram no tempo e no espaço com indivíduos envolvidos, estruturando-se com base nas ferramentas do tipo textual narrativo (quem, o que, quando, onde, como e por quê).'
  },
  {
    id: 20,
    enunciado: '20. Leia o trecho:\n“Para consultar um processo eletrônico, acesse o sistema, informe os dados solicitados e selecione a opção de pesquisa.”\nIdentifique o tipo textual predominante e explique quais características do trecho justificam sua resposta.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nPredomina no trecho o tipo textual injuntivo (instrucional).\nJustificativa: O trecho tem a finalidade pragmática de instruir e orientar o usuário sobre como realizar um procedimento passo a passo. Isso é evidenciado pelo emprego de verbos de comando no modo imperativo afirmativo ("acesse", "informe", "selecione"), característicos de textos orientadores, tutoriais e manuais de sistemas informatizados.'
  }
];

// Atividade Prática Forense
export const portuguesAula2PracticalTask: PracticalTaskConfig = {
  scenario: 'Você trabalha em uma unidade judiciária do Tribunal de Justiça do Amazonas (TJAM). Para fixar as diferentes tipologias textuais aplicadas à rotina forense, produza três pequenos textos autorais (de 2 a 4 linhas cada).',
  instruction: 'Escreva seus 3 textos nos campos abaixo (Narrativo, Descritivo e Injuntivo). Ao concluir, você poderá conferir os modelos esperados e enviar suas respostas diretamente ao professor pelo WhatsApp com um clique.',
  questions: [
    {
      number: 1,
      title: 'Texto 1: Narrativo (Fato no Atendimento)',
      prompt: 'Relate um acontecimento ocorrido no atendimento ao público do TJAM (ação, tempo e personagem).',
      placeholder: 'Ex: Na manhã de hoje, o jurisdicionado compareceu ao balcão da Vara de Família, apresentou sua documentação pessoal e solicitou informações sobre a expedição de um mandado. Prontamente, o assistente judiciário localizou o processo digital e prestou os esclarecimentos solicitados...',
      suggestedAnswer: 'Na manhã desta terça-feira, o jurisdicionado compareceu à secretaria da 2ª Vara Cível de Manaus para buscar informações sobre a data de sua audiência. O servidor consultou o sistema Projudi, confirmou a juntada da contestação e entregou ao cidadão o comprovante de andamento com as orientações necessárias.'
    },
    {
      number: 2,
      title: 'Texto 2: Descritivo (Ambiente da Unidade)',
      prompt: 'Descreva o ambiente de atendimento da unidade judicial (características físicas, mobília e espaço).',
      placeholder: 'Ex: O balcão de atendimento do fórum possui piso tátil antiderrapante, iluminação clara, quatro guichês acessíveis e divisórias de vidro que garantem a privacidade na consulta dos autos...',
      suggestedAnswer: 'A sala de atendimento do TJAM é ampla, climatizada e bem iluminada. Possui quatro mesas organizadas em semicírculo, balcão rebaixado para acessibilidade de cadeirantes, cadeiras acolchoadas na área de espera e sinalização visual clara indicando as etapas de atendimento prioritário.'
    },
    {
      number: 3,
      title: 'Texto 3: Injuntivo (Orientação ao Cidadão)',
      prompt: 'Escreva uma orientação instrucional para um cidadão realizar determinado procedimento processual.',
      placeholder: 'Ex: Para solicitar certidão de inteiro teor, acesse o portal do TJAM, clique na aba "Serviços ao Cidadão", preencha o número do processo e baixe o documento autenticado digitalmente...',
      suggestedAnswer: 'Para consultar o andamento do seu processo, acesse o portal oficial do TJAM na internet, clique no menu "Consulta Processual de 1º Grau", digite o número da ação com 20 dígitos e selecione a opção "Pesquisar".'
    }
  ]
};
