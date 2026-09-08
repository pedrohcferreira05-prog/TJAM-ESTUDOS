// Data for Escrita e Leitura — Aula 1: Comunicação: falar, ler e escrever melhor

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

export const escritaLeituraFlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é o objetivo central da Aula 1 de Escrita e Leitura?',
    a: 'Aprender a ler com clareza, falar de forma organizada e escrever frases corretas, evitando erros comuns de dicção, estruturação e ortografia.'
  },
  {
    q: 'Quais são as regras essenciais da leitura em voz alta?',
    a: '1) Pronunciar as palavras completamente;\n2) Não correr durante a leitura;\n3) Respeitar vírgulas e pontos;\n4) Fazer pequenas pausas;\n5) Dar entonação adequada;\n6) Evitar "comer" palavras ou sílabas.'
  },
  {
    q: 'Qual é o tripé de uma boa comunicação falada?',
    a: 'Uma boa comunicação falada precisa ser: CLARA + ORGANIZADA + OBJETIVA.'
  },
  {
    q: 'Qual roteiro mental deve ser seguido antes de falar?',
    a: 'Antes de falar, organize mentalmente: O que quero dizer? → Como vou explicar? → Qual é a conclusão?'
  },
  {
    q: 'Qual é a estrutura básica e direta para construção de frases em Língua Portuguesa?',
    a: 'Sujeito + Verbo + Complemento (Ordem Direta). Exemplos: "O aluno + estudou + Português." / "Pedro + fez + os exercícios."'
  },
  {
    q: 'Ortografia: qual a forma correta entre "concerteza" e "com certeza"?',
    a: 'O correto é "com certeza" (separado). "Concerteza" em uma única palavra não existe na norma-padrão.'
  },
  {
    q: 'Ortografia: qual a forma correta entre "derrepente" e "de repente"?',
    a: 'O correto é "de repente" (duas palavras separadas). A grafia "derrepente" é incorreta.'
  },
  {
    q: 'Qual a diferença entre "mas" e "mais"?',
    a: '• MAS: conjunção adversativa (ideia de oposição, equivale a porém, contudo). Ex: "estudei, mas não fui".\n• MAIS: advérbio de intensidade ou pronome de quantidade (oposto de menos). Ex: "quero estudar mais horas".'
  },
  {
    q: 'Qual a diferença entre "a gente" e "agente"?',
    a: '• A GENTE: locução pronominal equivalente a "nós" (exige verbo na 3ª pessoa do singular: "a gente vai estudar").\n• AGENTE: substantivo que indica a pessoa que age ou exerce função (ex: o agente judiciário).'
  },
  {
    q: 'Qual é a função da vírgula (,) e do ponto final (.) na leitura e na escrita?',
    a: '• Vírgula (,): indica uma breve pausa rítmica ou separa elementos/termos sintáticos.\n• Ponto (.): encerra uma frase declarativa, indicando a conclusão de uma ideia completa.'
  },
  {
    q: 'Ao terminar de ler um texto, quais as 5 perguntas que o aluno deve responder para garantir a compreensão?',
    a: '1. Sobre o que o texto fala?\n2. Qual é a informação principal?\n3. O que aconteceu?\n4. Quem está envolvido?\n5. O que o autor quis dizer?'
  },
  {
    q: 'Qual é a Regra Principal e método da Aula 1 de Escrita e Leitura?',
    a: 'Leia → Compreenda → Organize a ideia → Escreva → Revise → Fale.'
  },
  {
    q: 'Quais cuidados devem ser tomados na redação de um texto próprio de 5 a 8 linhas?',
    a: 'Escrever frases completas (sujeito + verbo + complemento), pontuar adequadamente, evitar abreviações de internet, organizar início-meio-fim e sempre revisar antes de entregar.'
  },
  {
    q: 'Como deve ser executado o exercício de fala após a escrita do texto?',
    a: 'Falar devagar, pronunciar todas as sílabas, respeitar as pausas da pontuação e explicar o conteúdo com as próprias palavras sem ficar apenas lendo mecanicamente ou decorando.'
  },
  {
    q: 'Quais são as 3 partes da Tarefa de Casa Prática em Vídeo da Aula 1?',
    a: '• Parte 1: Gravar leitura em voz alta do texto modelo sobre dedicação e paciência;\n• Parte 2: Explicar com palavras próprias o entendimento (1 a 2 min);\n• Parte 3: Escrever texto de 8 a 10 linhas sobre melhorias nos estudos e lê-lo em voz alta.'
  }
];

export const escritaLeituraMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Um aluno está treinando leitura em voz alta e lê o texto correndo, sem respirar nas vírgulas e engolindo as sílabas finais das palavras. De acordo com os preceitos da Aula 1, essa conduta:',
    opcoes: [
      'Está correta, pois a velocidade na leitura demonstra domínio total da fluência verbal.',
      'Está incorreta, pois a leitura deve ser clara, respeitando pontuações, fazendo pausas e pronunciando as palavras completamente.',
      'É indiferente, pois a entonação e as pausas só importam na escrita formal.',
      'Está correta apenas se o texto for curto e não contiver números ou datas.'
    ],
    correta: 1,
    explicacao: 'A leitura clara exige dicção completa, pausas nos sinais de pontuação, velocidade controlada e entonação adequada, evitando "comer" palavras ou correr.'
  },
  {
    id: 2,
    enunciado: 'Considere as frases a seguir:\nI. "Hojevouestudardireitoadministrativo."\nII. "Hoje vou estudar Direito Administrativo."\nCom base nas orientações de dicção e leitura em voz alta da Aula 1:',
    opcoes: [
      'A frase I é a forma ideal de leitura rápida para concurseiros experientes.',
      'A frase II representa a leitura clara e compreensível, onde cada palavra é devidamente separada e pronunciada.',
      'Ambas as leituras produzem o mesmo impacto auditivo e comunicativo.',
      'A frase I é recomendada apenas para treinar a musculatura facial matinal.'
    ],
    correta: 1,
    explicacao: 'Na fala e leitura em voz alta, a clareza decorre da articulação nítida de cada vocábulo individual, como na frase II.'
  },
  {
    id: 3,
    enunciado: 'Antes de iniciar uma fala em público, no trabalho ou em uma apresentação, qual sequência mental de organização a Aula 1 recomenda seguir?',
    opcoes: [
      'Começar a falar imediatamente e pensar nas ideias conforme as palavras saem.',
      'O que quero dizer? → Como vou explicar? → Qual é a conclusão?',
      'Memorizar palavra por palavra de um discurso sem entender a ideia geral.',
      'Falar o mais rápido possível para não esquecer os detalhes do conteúdo.'
    ],
    correta: 1,
    explicacao: 'A organização do pensamento antes da fala segue o roteiro: "O que quero dizer? → Como vou explicar? → Qual é a conclusão?".'
  },
  {
    id: 4,
    enunciado: 'Analise os dois relatos abaixo:\nRelato A: "Aí eu fui lá e aconteceu isso e depois eu não sabia e aí..."\nRelato B: "Fui ao local pela manhã. Depois, conversei com o responsável e resolvi a situação."\nEm termos de eficácia comunicativa profissional, o Relato B se destaca porque:',
    opcoes: [
      'Usa gírias e informalidade que aproximam os interlocutores.',
      'É claro, organizado e objetivo, apresentando uma ordem cronológica e conclusão definida sem vícios de linguagem repetitivos.',
      'Contém menos palavras difíceis do que o Relato A.',
      'Não utiliza verbos no pretérito perfeito.'
    ],
    correta: 1,
    explicacao: 'O relato B é estruturado de forma concisa e sequencial (manhã → conversa → resolução), sem os vícios de repetição ("aí", "depois", "não sabia") do relato A.'
  },
  {
    id: 5,
    enunciado: 'Na sintaxe da Língua Portuguesa, qual é a estrutura direta canônica ensinada na Aula 1 para a construção de frases simples e compreensíveis?',
    opcoes: [
      'Verbo + Sujeito + Advérbio invertido.',
      'Sujeito + Verbo + Complemento.',
      'Complemento + Adjetivo + Interjeição.',
      'Predicado nominal isolado sem agente explícito.'
    ],
    correta: 1,
    explicacao: 'A ordem direta canônica para enunciados límpidos é Sujeito + Verbo + Complemento (ex: "O aluno [sujeito] estudou [verbo] Português [complemento]").'
  },
  {
    id: 6,
    enunciado: 'Assinale a alternativa que apresenta uma frase construída estritamente na estrutura canônica "Sujeito + Verbo + Complemento":',
    opcoes: [
      'Pelos corredores do tribunal caminhavam apressados os advogados.',
      'Pedro fez os exercícios de revisão.',
      'Ontem à noite, choveu torrencialmente sobre a cidade.',
      'Com cautela agiram os policiais judiciários.'
    ],
    correta: 1,
    explicacao: 'Na frase "Pedro [sujeito] fez [verbo] os exercícios de revisão [complemento]", a estrutura direta é perfeitamente respeitada.'
  },
  {
    id: 7,
    enunciado: 'Assinale a opção em que a grafia da expressão destacada está em conformidade com o padrão ensinado na aula:',
    opcoes: [
      'O candidato foi aprovado <strong>concerteza</strong> após muita dedicação.',
      'O candidato foi aprovado <strong>com certeza</strong> após muita dedicação.',
      'O candidato foi aprovado <strong>comcerteza</strong> após muita dedicação.',
      'O candidato foi aprovado <strong>con certeza</strong> após muita dedicação.'
    ],
    correta: 1,
    explicacao: '"Com certeza" escreve-se sempre separado, com a preposição "com" e o substantivo "certeza". A forma aglutinada "concerteza" é erro gramatical.'
  },
  {
    id: 8,
    enunciado: 'Assinale a frase gramaticalmente correta quanto ao uso da locução "a gente":',
    opcoes: [
      'Agente vai estudar todo o conteúdo de Direito Administrativo hoje.',
      'A gente vamos estudar todo o conteúdo de Direito Administrativo hoje.',
      'A gente vai estudar todo o conteúdo de Direito Administrativo hoje.',
      'Há gente vai estudar todo o conteúdo de Direito Administrativo hoje.'
    ],
    correta: 2,
    explicacao: 'A locução "a gente" (escrita separada) funciona semanticamente como "nós", mas sintaticamente exige o verbo conjugado na 3ª pessoa do singular ("a gente vai estudar"). "Agente" junto refere-se à profissão/pessoa que age (ex: agente da polícia).'
  },
  {
    id: 9,
    enunciado: 'Complete as lacunas com a opção gramaticalmente correta:\n"Eu pretendia ir ao fórum hoje, _____ começou a chover forte. Amanhã quero me dedicar _____ tempo aos simulados."',
    opcoes: [
      'mas — mais',
      'mais — mas',
      'mas — mas',
      'mais — mais'
    ],
    correta: 0,
    explicacao: '"Mas" exprime oposição (porém, contudo), cabendo na primeira lacuna ("mas começou a chover"). "Mais" exprime quantidade ou intensidade (oposto de menos), cabendo na segunda lacuna ("mais tempo").'
  },
  {
    id: 10,
    enunciado: 'Identifique a alternativa que apresenta a grafia correta da expressão adverbial temporal destacada:',
    opcoes: [
      'O sinal tocou <strong>derrepente</strong> no meio da aula prática.',
      'O sinal tocou <strong>de repente</strong> no meio da aula prática.',
      'O sinal tocou <strong>de-repente</strong> no meio da aula prática.',
      'O sinal tocou <strong>derrepente-mente</strong> no meio da aula prática.'
    ],
    correta: 1,
    explicacao: 'A locução adverbial "de repente" é grafada em duas palavras separadas, sem hífen e com "r" simples.'
  },
  {
    id: 11,
    enunciado: 'Sobre o uso da vírgula (,), assinale a assertiva correta de acordo com as regras da Aula 1:',
    opcoes: [
      'A vírgula serve unicamente para quando o leitor perder o fôlego pulmonar, sem qualquer regra gramatical.',
      'A vírgula indica uma pausa e separa elementos da oração (como adjuntos adverbiais deslocados: "Hoje, depois da aula, faremos exercícios").',
      'A vírgula deve ser colocada obrigatoriamente entre o sujeito e o verbo da oração.',
      'A vírgula tem a mesma função conclusiva do ponto final e encerra parágrafos.'
    ],
    correta: 1,
    explicacao: 'A vírgula marca pausas e organiza os blocos sintáticos, como em "Hoje, depois da aula, faremos exercícios", separando os adjuntos temporais.'
  },
  {
    id: 12,
    enunciado: 'Qual sinal de pontuação deve ser empregado para encerrar uma ideia declarativa completa, permitindo que a frase seguinte comece com inicial maiúscula?',
    opcoes: [
      'Ponto final (.)',
      'Vírgula (,)',
      'Dois-pontos (:)',
      'Reticências (...) sem encerramento'
    ],
    correta: 0,
    explicacao: 'O ponto final (.) encerra uma ideia completa ("O aluno estudou. Depois, fez os exercícios.").'
  },
  {
    id: 13,
    enunciado: 'A frase "Você revisou os flashcards de Informática hoje?" exige o sinal de ponto de interrogação (?) porque:',
    opcoes: [
      'Expressa uma surpresa exclamativa do interlocutor.',
      'Formula uma pergunta direta que aguarda uma resposta.',
      'Separa o sujeito do predicado.',
      'Conclui uma citação de autor renomado.'
    ],
    correta: 1,
    explicacao: 'O ponto de interrogação (?) é o sinal gráfico específico para orações interrogativas diretas.'
  },
  {
    id: 14,
    enunciado: 'A sentença "Que excelente resultado no simulado de 80 questões!" utiliza ponto de exclamação (!) porque expressa:',
    opcoes: [
      'Dúvida e incerteza metodológica.',
      'Emoção, entusiasmo, surpresa ou ênfase positiva.',
      'Uma pergunta retórica que não admite resposta.',
      'Um comando imperativo restritivo.'
    ],
    correta: 1,
    explicacao: 'O ponto de exclamação (!) confere tom emotivo, admiração, ênfase ou entusiasmo ao enunciado.'
  },
  {
    id: 15,
    enunciado: 'Ao concluir a leitura de um texto longo, qual das perguntas abaixo NÃO faz parte das 5 perguntas essenciais ensinadas na aula para assegurar a compreensão?',
    opcoes: [
      'Sobre o que o texto fala?',
      'Qual é a informação principal?',
      'Quantas letras maiúsculas há no terceiro parágrafo?',
      'O que o autor quis dizer?'
    ],
    correta: 2,
    explicacao: 'As 5 perguntas da compreensão são: 1. Sobre o que fala? 2. Qual a informação principal? 3. O que aconteceu? 4. Quem está envolvido? 5. O que o autor quis dizer? Contar letras é irrelevante para a semântica.'
  },
  {
    id: 16,
    enunciado: 'Qual é a sequência da "Regra Principal da Aula 1" para o processo completo de aprendizagem e comunicação?',
    opcoes: [
      'Fale → Escreva → Publique → Esqueça.',
      'Leia → Compreenda → Organize a ideia → Escreva → Revise → Fale.',
      'Decore → Repita rápido → Não revise → Responda.',
      'Copie → Cole → Leia correndo → Finalize.'
    ],
    correta: 1,
    explicacao: 'A regra de ouro da Aula 1 é o fluxo metódico: Leia → Compreenda → Organize a ideia → Escreva → Revise → Fale.'
  },
  {
    id: 17,
    enunciado: 'No exercício prático de redação (5 a 8 linhas), qual dos seguintes hábitos deve ser terminantemente EVITADO pelo estudante?',
    opcoes: [
      'Escrever frases completas com sujeito e predicado.',
      'Utilizar pontuação correta (vírgulas e pontos).',
      'Usar abreviações típicas de mensagens rápidas (como "vc", "pq", "tbm") em textos formais.',
      'Reler o texto elaborado para corrigir possíveis falhas antes de finalizar.'
    ],
    correta: 2,
    explicacao: 'Em exercícios de escrita formal e redação de concurso, abreviações informais da internet ("vc", "tb", "pq") devem ser totalmente evitadas.'
  },
  {
    id: 18,
    enunciado: 'No exercício de fala (leitura em voz alta do texto produzido), qual orientação contribui diretamente para a retenção do conteúdo e desenvoltura do aluno?',
    opcoes: [
      'Decorar todas as palavras e falar na maior velocidade possível.',
      'Manter velocidade confortável, fazer pausas nos pontos e vírgulas e explicar as ideias com segurança.',
      'Falar em tom monótono e sussurrado para não errar a pronúncia.',
      'Olhar fixamente para o chão enquanto recita o texto.'
    ],
    correta: 1,
    explicacao: 'A boa dicção e oratória exigem ritmo compassado, respiração coordenada nas pausas e domínio conceitual para explicar o assunto com espontaneidade.'
  },
  {
    id: 19,
    enunciado: 'Na "Parte 1 — Leitura" da Tarefa de Casa Prática em Vídeo, o aluno deve ler em voz alta o trecho sobre estudo e disciplina. O texto ensina que os erros cometidos nos estudos:',
    opcoes: [
      'São motivos para o estudante desistir imediatamente da preparação para concursos.',
      'Devem ser ocultados e nunca analisados pelo aluno.',
      'Podem ser excelentes oportunidades para aprender e melhorar.',
      'Apenas ocorrem quando o estudante não possui nenhum material de apoio.'
    ],
    correta: 2,
    explicacao: 'O texto modelo ressalta: "Cada erro pode ser uma oportunidade para aprender e melhorar."'
  },
  {
    id: 20,
    enunciado: 'Na Tarefa de Casa Prática em Vídeo (Aula 1), quais são as 3 etapas que devem compor a gravação do aluno para envio ao professor?',
    opcoes: [
      '1. Responder 10 perguntas de Direito Constitucional; 2. Fazer 20 flexões; 3. Ler o regimento do TJAM.',
      '1. Leitura do texto modelo em voz alta; 2. Explicação com as próprias palavras (1-2 min); 3. Leitura do texto de escrita produzido pelo aluno.',
      '1. Apenas mostrar o caderno escrito sem falar nada; 2. Ler em silêncio mental; 3. Enviar foto.',
      '1. Cantar uma música; 2. Ler um artigo de jornal em inglês; 3. Fazer mímica.'
    ],
    correta: 1,
    explicacao: 'A entrega do vídeo compreende: 1. Leitura do texto modelo; 2. Explicação oral com as próprias palavras (1 a 2 minutos); 3. Leitura em voz alta do pequeno texto de escrita pessoal (8 a 10 linhas).'
  }
];

export const escritaLeituraTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: 'A velocidade rápida de leitura é o fator mais importante na comunicação; pausas para vírgula e ponto demonstram insegurança do leitor.',
    correta: false,
    explicacao: 'Falso. Correr na leitura prejudica a dicção e a compreensão. As pausas nas vírgulas e pontos são essenciais para que o ouvinte e o leitor assimilem a mensagem com clareza.'
  },
  {
    id: 2,
    enunciado: 'A expressão "com certeza" escreve-se obrigatoriamente separada em duas palavras na norma-padrão da Língua Portuguesa.',
    correta: true,
    explicacao: 'Verdadeiro. "Com certeza" é uma locução adverbial afirmativa grafada separadamente.'
  },
  {
    id: 3,
    enunciado: 'Na frase "A gente vai estudar hoje", a concordância verbal está correta de acordo com a norma culta.',
    correta: true,
    explicacao: 'Verdadeiro. A locução "a gente" exige o verbo na terceira pessoa do singular ("vai estudar").'
  },
  {
    id: 4,
    enunciado: 'Em "Estudei bastante, mais não consegui a nota mínima", o termo "mais" está empregado de forma correta para indicar oposição.',
    correta: false,
    explicacao: 'Falso. Para indicar ideia de oposição ou adversidade, a conjunção correta é "mas" (sem i). "Mais" indica intensidade ou quantidade.'
  },
  {
    id: 5,
    enunciado: 'A estrutura "Sujeito + Verbo + Complemento" representa a ordem direta canônica das orações em português e facilita a clareza textual.',
    correta: true,
    explicacao: 'Verdadeiro. Essa disposição direta evita ambiguidades e torna a transmissão da mensagem imediata e compreensível.'
  },
  {
    id: 6,
    enunciado: 'Revisar o próprio texto antes de finalizá-lo é uma etapa dispensável se o aluno já escreveu com atenção durante a redação.',
    correta: false,
    explicacao: 'Falso. A revisão é etapa obrigatória do método (Leia → Compreenda → Organize → Escreva → Revise → Fale), permitindo corrigir pontuações, concordâncias e lapsos de digitação.'
  }
];

export const escritaLeituraDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Explique por que a organização mental preliminar ("O que quero dizer? → Como vou explicar? → Qual é a conclusão?") é indispensável para evitar vícios como "aí... aí... aconteceu isso... e depois..." na comunicação falada.',
    respostaEsperada: 'A organização prévia do pensamento estabelece um mapa mental com começo, meio e fim claros. Quando o falante sabe de antemão qual mensagem deseja transmitir e a qual conclusão precisa chegar, ele não precisa recorrer a palavras de preenchimento ("aí", "tipo assim", "né") enquanto tenta pensar na próxima frase, resultando em uma fala limpa, fluida e profissional.'
  },
  {
    id: 2,
    enunciado: 'Diferencie a aplicação prática das expressões "mas" e "mais", elaborando um exemplo em contexto de rotina de estudos para o concurso do TJAM.',
    respostaEsperada: '"Mas" é uma conjunção coordenativa adversativa que introduz oposição ou contraste (ex: "Fiz muitas questões de Processo Penal, mas ainda sinto dúvidas nos prazos recursais"). Já "mais" é advérbio de intensidade ou pronome de quantidade oposto a menos (ex: "Amanhã preciso resolver mais 20 questões para bater a meta da dupla").'
  },
  {
    id: 3,
    enunciado: 'Descreva como o estudante deve realizar a autoavaliação da sua leitura em voz alta para identificar se está "comendo" sílabas ou correndo com o texto.',
    respostaEsperada: 'O estudante deve gravar sua própria voz lendo um parágrafo e, ao ouvir a gravação, verificar: 1) Se todas as letras finais (como os plurais em "s" e infinitivos em "r") foram articuladas; 2) Se houve pausas perceptíveis nas vírgulas e paradas completas nos pontos; 3) Se a velocidade permitiu respiração diafragmática calma; e 4) Se a entonação variou naturalmente de acordo com o sentido do texto.'
  }
];

export const escritaLeituraSummaryPoints: string[] = [
  'Objetivo da Aula 1: Desenvolver a capacidade de ler com clareza, falar com organização lógica e redigir frases corretas sem vícios ou erros comuns.',
  'Leitura em Voz Alta: Articular as palavras completamente, sem pressa, respeitando vírgulas e pontos com pequenas pausas e entonação expressiva.',
  'Tripé da Comunicação: Toda fala profissional precisa ser Clara, Organizada e Objetiva.',
  'Roteiro Mental Antes de Falar: Definir previamente "O que quero dizer?", "Como vou explicar?" e "Qual é a conclusão?".',
  'Ordem Direta de Frases: Priorizar Sujeito + Verbo + Complemento (ex: "O aluno estudou Português").',
  'Ortografia de Ouro: "Com certeza" (separado), "De repente" (separado), "A gente vai" (singular) e "Mas" (oposição) vs. "Mais" (quantidade).',
  'Pontuação Funcional: Vírgula para pausas e separação de blocos; Ponto para encerramento de raciocínio; Interrogação para perguntas; Exclamação para ênfase.',
  'As 5 Perguntas da Compreensão: Sobre o que fala? Informação principal? O que aconteceu? Quem está envolvido? O que o autor quis dizer?',
  'Regra Principal: Leia → Compreenda → Organize a ideia → Escreva → Revise → Fale.',
  'Tarefa Prática em Vídeo: Gravação em 3 partes enviada ao professor: 1) Leitura em voz alta do texto modelo; 2) Explicação com as próprias palavras (1-2 min); 3) Leitura da própria redação de 8 a 10 linhas.'
];
