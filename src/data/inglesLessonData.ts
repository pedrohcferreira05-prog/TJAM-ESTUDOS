export interface FlashcardItem {
  id: number;
  q: string;
  a: string;
  frente: string;
  verso: string;
  categoria: string;
  dica?: string;
  pronuncia?: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
  correta: number;
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
  titulo: string;
  enunciado: string;
  respostaEsperada: string;
  espelhoCorrecao: string[];
  pontosChave: string[];
}

export const inglesFlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'Qual é a diferença de uso entre "Good evening" e "Good night"?',
    a: '"Good evening" é usado como cumprimento ao chegar ou iniciar uma conversa à noite. "Good night" é usado estritamente como despedida ao sair ou antes de dormir.',
    frente: 'Good evening vs. Good night',
    verso: 'Good evening = cumprimento ao chegar à noite. Good night = despedida ao ir embora ou dormir.',
    categoria: 'Cumprimentos (Greetings)',
    dica: 'Chegou à noite? Good evening! Vai embora ou dormir? Good night!',
    pronuncia: 'gud ívning / gud náit'
  },
  {
    id: 2,
    q: 'Quais são os 7 pronomes pessoais (Subject Pronouns) da língua inglesa e seus significados?',
    a: 'I (eu), You (você/vocês), He (ele), She (ela), It (ele/ela para coisas/animais/situações), We (nós), They (eles/elas).',
    frente: 'Personal Pronouns (Pronomes Pessoais)',
    verso: 'I (eu), You (você/vocês), He (ele), She (ela), It (coisas/animais), We (nós), They (eles/elas).',
    categoria: 'Pronomes Pessoais',
    dica: '"They" serve tanto para pessoas no plural quanto para coisas/animais no plural.',
    pronuncia: 'ái, iú, hí, xí, it, uí, dêi'
  },
  {
    id: 3,
    q: 'Como se conjuga o verbo TO BE no presente afirmativo para todas as pessoas?',
    a: 'I am | You are | He is | She is | It is | We are | They are.',
    frente: 'Conjugação do Verbo TO BE (Presente)',
    verso: 'I am | You are | He/She/It is | We are | They are. Significa "ser" ou "estar".',
    categoria: 'Verbo TO BE',
    dica: 'Lembre-se do trio singular: He, She, It usam sempre "is"!',
    pronuncia: 'am, ar, iz'
  },
  {
    id: 4,
    q: 'Quais são as formas contraídas afirmativas do verbo TO BE com os pronomes?',
    a: 'I am → I\'m | You are → You\'re | He is → He\'s | She is → She\'s | It is → It\'s | We are → We\'re | They are → They\'re.',
    frente: 'Formas Contraídas Afirmativas (TO BE)',
    verso: 'I\'m, You\'re, He\'s, She\'s, It\'s, We\'re, They\'re. São amplamente usadas na fala e na escrita informal/cotidiana.',
    categoria: 'Contrações',
    dica: 'Substitui-se a primeira vogal do verbo pelo apóstrofo (\').',
    pronuncia: 'áim, iór, híz, xíz, its, uír, dêir'
  },
  {
    id: 5,
    q: 'Como se formam frases negativas com o verbo TO BE e quais as contrações possíveis?',
    a: 'Acrescenta-se "not" após o verbo. Ex: is not = isn\'t | are not = aren\'t | I am not = I\'m not (não existe "amn\'t").',
    frente: 'Negativas com TO BE (isn\'t / aren\'t)',
    verso: 'is + not = isn\'t | are + not = aren\'t | I am not = I\'m not. Ex: He isn\'t a student. We aren\'t ready.',
    categoria: 'Forma Negativa',
    dica: 'I am not contrai como I\'m not (nunca use amn\'t).',
    pronuncia: 'íznt, árnt, áim nót'
  },
  {
    id: 6,
    q: 'Como transformar uma frase afirmativa com TO BE em pergunta e como responder de forma curta?',
    a: 'Inverte-se a posição do verbo para antes do sujeito: "You are Brazilian" → "Are you Brazilian?". Respostas curtas: "Yes, I am." / "No, I\'m not."',
    frente: 'Perguntas com TO BE (Inversão do Verbo)',
    verso: 'Verbo antes do sujeito: Are you...? / Is she...? Resposta curta: Yes, I am / No, I\'m not.',
    categoria: 'Interrogação',
    dica: 'Nas respostas curtas afirmativas, NUNCA se usa contração (diz-se "Yes, I am", nunca *"Yes, I\'m").',
    pronuncia: 'ar iú...? / iz xí...?'
  },
  {
    id: 7,
    q: 'O que significam as principais palavras interrogativas (Wh- Questions): What, Where, Who, When, How, Why?',
    a: 'What = o quê/qual | Where = onde | Who = quem | When = quando | How = como | Why = por quê.',
    frente: 'Question Words (What, Where, Who, When, How, Why)',
    verso: 'What (o quê/qual), Where (onde), Who (quem), When (quando), How (como), Why (por quê).',
    categoria: 'Palavras Interrogativas',
    dica: 'Where are you from? (De onde você é?) | What is your name? (Qual é seu nome?)',
    pronuncia: 'uót, uér, rrú, uên, rráu, uái'
  },
  {
    id: 8,
    q: 'Como se diz "servidor público", "juiz", "advogado" e "tribunal" em inglês?',
    a: 'Public servant = servidor público | Judge = juiz | Lawyer = advogado | Court = tribunal / vara judicial.',
    frente: 'Vocabulário Jurídico & Concurso TJAM',
    verso: 'public servant (servidor público), judge (juiz), lawyer (advogado), court (tribunal).',
    categoria: 'Vocabulário TJAM',
    dica: 'Termos fundamentais para provas do Tribunal de Justiça.',
    pronuncia: 'pâblik sérvant, djâdj, lóier, córt'
  },
  {
    id: 9,
    q: 'Como expressar nome, origem, moradia e profissão em inglês?',
    a: 'Nome: My name is... (ou I am...) | Origem: I am from... | Moradia: I live in... | Profissão: I am a student / I am a public servant.',
    frente: 'Estruturas de Apresentação Pessoal',
    verso: 'My name is... | I am from [país/cidade] | I live in [cidade] | I am a [profissão].',
    categoria: 'Apresentação Pessoal',
    dica: 'Antes de profissão no singular, usa-se o artigo "a" ou "an": I am A public servant.',
    pronuncia: 'mái néim iz... / ái am frôm... / ái lív in...'
  },
  {
    id: 10,
    q: 'Qual a estratégia fundamental para resolver questões de interpretação em inglês de nível inicial/concurso?',
    a: 'Localizar informações explícitas no texto: identificar nomes, nacionalidades (Brazilian, English), locais (live in...) e ocupações/objetivos sem se preocupar em traduzir palavra por palavra.',
    frente: 'Interpretação: Informações Explícitas',
    verso: 'Buscar palavras-chave (cognatos e vocabulário básico): name, from, live, student, public servant.',
    categoria: 'Técnicas de Prova TJAM',
    dica: 'Não tente traduzir cada termo isolado; busque a ideia central e os dados objetivos pedidos pela questão.',
    pronuncia: 'reading comprehension'
  }
];

export const inglesMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Complete corretamente:\n\n“Maria ___ a student and her parents ___ teachers.”',
    opcoes: [
      'A) am / is',
      'B) is / are',
      'C) are / is',
      'D) is / am',
      'E) are / are'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. "Maria" é 3ª pessoa do singular (she), exigindo o verbo "is". "Her parents" (os pais dela) está no plural (they), exigindo o verbo "are". Portanto: "Maria is a student and her parents are teachers."'
  },
  {
    id: 2,
    enunciado: 'Assinale a alternativa gramaticalmente correta:',
    opcoes: [
      'A) They is Brazilian.',
      'B) He are a student.',
      'C) I am Brazilian.',
      'D) She are a teacher.',
      'E) We is ready.'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. A concordância correta do verbo to be é: I am. As outras alternativas contêm erros de concordância: They are (não is), He is (não are), She is (não are), We are (não is).'
  },
  {
    id: 3,
    enunciado: 'Leia:\n\n“John is from England. He is a teacher and he lives in London.”\n\nDe acordo com o texto, John:',
    opcoes: [
      'A) é brasileiro.',
      'B) mora no Brasil.',
      'C) é professor.',
      'D) mora nos Estados Unidos.',
      'E) é estudante.'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. O texto afirma expressamente: "He is a teacher" (Ele é professor). Além disso, ele é da Inglaterra (England) e mora em Londres (London).'
  },
  {
    id: 4,
    enunciado: 'Na frase “They are public servants”, o pronome They refere-se a:',
    opcoes: [
      'A) uma pessoa do sexo masculino.',
      'B) uma pessoa do sexo feminino.',
      'C) uma coisa.',
      'D) duas ou mais pessoas.',
      'E) somente duas mulheres.'
    ],
    correta: 3,
    explicacao: 'Gabarito: D. O pronome "They" é a 3ª pessoa do plural e significa "eles" ou "elas", referindo-se a duas ou mais pessoas (ou coisas/animais no plural).'
  },
  {
    id: 5,
    enunciado: 'Assinale a alternativa que apresenta a forma negativa correta:\n\n“She ___ a lawyer.”',
    opcoes: [
      'A) is not',
      'B) are not',
      'C) am not',
      'D) not is',
      'E) not are'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. A negação com o verbo to be é formada pelo verbo seguido da partícula "not": "She is not a lawyer" (ou contraído: "She isn\'t a lawyer").'
  },
  {
    id: 6,
    enunciado: 'A pergunta “Where are you from?” significa:',
    opcoes: [
      'A) Qual é o seu nome?',
      'B) Onde você trabalha?',
      'C) De onde você é?',
      'D) Quem é você?',
      'E) Como você está?'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Where are you from?" pergunta a origem/nacionalidade de alguém: "De onde você é?". "Qual é o seu nome?" é "What is your name?"; "Como você está?" é "How are you?".'
  },
  {
    id: 7,
    enunciado: 'Complete corretamente:\n\n“___ you Brazilian?”',
    opcoes: [
      'A) Is',
      'B) Am',
      'C) Are',
      'D) Be',
      'E) Do'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. Para fazer uma pergunta com o pronome "you" e o verbo to be, inverte-se o verbo "are" para antes do sujeito: "Are you Brazilian?".'
  },
  {
    id: 8,
    enunciado: 'Leia:\n\n“I am Lucas. I am Brazilian, but I live in London. I am a student.”\n\nÉ correto afirmar que Lucas:',
    opcoes: [
      'A) é inglês.',
      'B) mora no Brasil.',
      'C) é brasileiro e mora em Londres.',
      'D) é professor.',
      'E) não é estudante.'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. O texto diz: "I am Brazilian" (sou brasileiro), "but I live in London" (mas moro em Londres) e "I am a student" (sou estudante). Logo, Lucas é brasileiro e mora em Londres.'
  },
  {
    id: 9,
    enunciado: 'Assinale a alternativa em que a contração está correta:',
    opcoes: [
      'A) He\'re',
      'B) She\'re',
      'C) They\'s',
      'D) We\'re',
      'E) I\'s'
    ],
    correta: 3,
    explicacao: 'Gabarito: D. A contração correta para "We are" é "We\'re". As outras opções contêm erros grosseiros: He is = He\'s (não He\'re); She is = She\'s (não She\'re); They are = They\'re (não They\'s); I am = I\'m (não I\'s).'
  },
  {
    id: 10,
    enunciado: 'Na frase:\n\n“The employees are at work.”\n\nA palavra employees significa:',
    opcoes: [
      'A) estudantes.',
      'B) cidadãos.',
      'C) funcionários.',
      'D) professores.',
      'E) juízes.'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Employee" significa empregado/funcionário (plural: employees = funcionários). Estudantes = students, cidadãos = citizens, professores = teachers, juízes = judges.'
  }
];

export const inglesTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Na frase “I am a student”, o verbo to be está corretamente conjugado.',
    correta: true,
    explicacao: 'VERDADEIRO. Com a primeira pessoa do singular ("I"), a conjugação correta do verbo to be no presente é exatamente "am".'
  },
  {
    id: 2,
    enunciado: 'A frase “She are Brazilian” está gramaticalmente correta.',
    correta: false,
    explicacao: 'FALSO. Com o pronome "She" (3ª pessoa do singular), deve-se usar "is". A frase correta é: "She is Brazilian".'
  },
  {
    id: 3,
    enunciado: 'Na frase “They are students”, o pronome they está associado ao verbo are.',
    correta: true,
    explicacao: 'VERDADEIRO. O pronome "they" (eles/elas) é plural e se associa perfeitamente à forma verbal "are".'
  },
  {
    id: 4,
    enunciado: 'A frase “He isn\'t a teacher” significa “Ele não é professor”.',
    correta: true,
    explicacao: 'VERDADEIRO. "isn\'t" é a forma contraída de "is not", indicando negação: "Ele não é professor".'
  },
  {
    id: 5,
    enunciado: 'A pergunta “What is your name?” pode ser traduzida como “Qual é o seu nome?”.',
    correta: true,
    explicacao: 'VERDADEIRO. Trata-se da pergunta básica em inglês para identificação pessoal, traduzindo-se literalmente e contextualmente como "Qual é o seu nome?".'
  }
];

export const inglesDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    titulo: 'Questão 16 — Diferença entre I am, You are e He/She is',
    enunciado: 'Explique a diferença entre "I am", "You are" e "He/She is", indicando a pessoa gramatical e a regra de aplicação.',
    respostaEsperada: 'Gabarito oficial:\n• "I am" é usado com a 1ª pessoa do singular ("I" = eu);\n• "You are" é usado com a 2ª pessoa ("you" = você ou vocês);\n• "He is" e "She is" são usados com a 3ª pessoa do singular masculino e feminino ("he" = ele, "she" = ela).',
    espelhoCorrecao: [
      'Identificação de "I am" como 1ª pessoa do singular (eu)',
      'Identificação de "You are" como 2ª pessoa (você/vocês)',
      'Identificação de "He is / She is" como 3ª pessoa do singular (ele/ela)'
    ],
    pontosChave: [
      'Concordância pessoa + forma do verbo to be',
      'am exclusivo de I',
      'is para 3ª pessoa do singular (he, she, it)'
    ]
  },
  {
    id: 2,
    titulo: 'Questão 17 — Tradução de Frase Composta',
    enunciado: 'Traduza para o português a seguinte frase:\n\n“They are Brazilian students and they live in Manaus.”',
    respostaEsperada: 'Gabarito oficial:\n“Eles são estudantes brasileiros e moram em Manaus.” (ou “Elas são estudantes brasileiras e moram em Manaus.”)',
    espelhoCorrecao: [
      'Tradução de "They are Brazilian students" para "Eles são estudantes brasileiros"',
      'Tradução do conectivo "and" para "e"',
      'Tradução de "they live in Manaus" para "moram em Manaus / eles vivem em Manaus"'
    ],
    pontosChave: [
      'Adequação do pronome they (eles/elas)',
      'Ordem adjetivo + substantivo no inglês (Brazilian students)',
      'Verbo live in = morar/viver em'
    ]
  },
  {
    id: 3,
    titulo: 'Questão 18 — Transformação para Forma Negativa',
    enunciado: 'Passe a seguinte frase para a forma negativa (tanto por extenso quanto na forma contraída):\n\n“She is a public servant.”',
    respostaEsperada: 'Gabarito oficial:\nForma por extenso: “She is not a public servant.”\nForma contraída: “She isn\'t a public servant.”\n(Significado: Ela não é servidora pública).',
    espelhoCorrecao: [
      'Acréscimo da partícula negativa "not" após o verbo to be ("She is not...")',
      'Apresentação da forma contraída correta ("She isn\'t...")',
      'Manutenção do complemento nominal "a public servant"'
    ],
    pontosChave: [
      'is not = isn\'t',
      'Manutenção do artigo indefinido "a"',
      'Termo public servant (servidor público)'
    ]
  },
  {
    id: 4,
    titulo: 'Questão 19 — Pergunta e Respostas Curtas (Short Answers)',
    enunciado: 'Transforme a frase afirmativa “He is a student” em uma pergunta. Em seguida, escreva uma resposta curta afirmativa e uma resposta curta negativa.',
    respostaEsperada: 'Gabarito oficial:\n• Pergunta (inversão): “Is he a student?”\n• Resposta curta afirmativa: “Yes, he is.”\n• Resposta curta negativa: “No, he isn\'t.” (ou “No, he is not.”)',
    espelhoCorrecao: [
      'Inversão da ordem verbo-sujeito para formar a pergunta com pontuação de interrogação: "Is he a student?"',
      'Resposta curta afirmativa correta sem contração: "Yes, he is."',
      'Resposta curta negativa correta: "No, he isn\'t."'
    ],
    pontosChave: [
      'Inversão do to be na interrogação',
      'Pontuação correta (?)',
      'Regra de não contrair a resposta curta afirmativa ("Yes, he is", não "Yes, he\'s")'
    ]
  },
  {
    id: 5,
    titulo: 'Questão 20 — Interpretação de Texto com Respostas em Inglês',
    enunciado: 'Leia o texto abaixo:\n\n“My name is Ana. I am Brazilian. I live in Manaus. I am a student and I study English every day.”\n\nResponda em inglês:\na) What is her name?\nb) Where is she from?\nc) Where does she live?\nd) Is she a student?',
    respostaEsperada: 'Gabarito oficial (respostas em inglês):\na) Her name is Ana. (ou She is Ana.)\nb) She is from Brazil. / She is Brazilian.\nc) She lives in Manaus.\nd) Yes, she is.',
    espelhoCorrecao: [
      'Item a: "Her name is Ana." ou "Ana."',
      'Item b: "She is Brazilian." ou "She is from Brazil."',
      'Item c: "She lives in Manaus." ou "In Manaus."',
      'Item d: "Yes, she is."'
    ],
    pontosChave: [
      'Localização exata das informações explícitas no texto',
      'Concordância com a 3ª pessoa feminina (her / she)',
      'Resposta correta com to be (Yes, she is)'
    ]
  }
];

export const inglesSummaryPoints: string[] = [
  '👋 Cumprimentos (Greetings): Hello! (Olá), Hi! (Oi), Good morning (Bom dia), Good afternoon (Boa tarde), Good evening (Boa noite ao chegar), Good night (Boa noite ao sair/dormir).',
  '⚠️ Good evening vs. Good night: Good evening é saudação de chegada à noite; Good night é estritamente despedida ao sair ou antes de dormir.',
  '👤 Pronomes Pessoais (Subject Pronouns): I (eu), You (você/vocês), He (ele), She (ela), It (coisas/animais), We (nós), They (eles/elas — plural geral).',
  '⚡ Verbo TO BE no Presente: I am | You are | He/She/It is | We are | They are. Significa "ser" ou "estar" dependendo do contexto.',
  '✂️ Formas Contraídas: I\'m, You\'re, He\'s, She\'s, It\'s, We\'re, They\'re. Muito comuns no inglês cotidiano e diálogos.',
  '🚫 Forma Negativa: Acrescenta-se "not" após o verbo to be. Formas contraídas: isn\'t (is not) e aren\'t (are not). I am not contrai como I\'m not.',
  '❓ Perguntas & Inversão: Inverte-se a posição do verbo com o sujeito: "She is a student" → "Is she a student?". Respostas curtas: "Yes, she is." / "No, she isn\'t."',
  '🔍 Palavras Interrogativas (Wh-): What (o quê/qual), Where (onde), Who (quem), When (quando), How (como), Why (por quê).',
  '⚖️ Vocabulário Essencial Concurso TJAM: student (estudante), teacher (professor), lawyer (advogado), judge (juiz), employee (funcionário), public servant (servidor público), court (tribunal).',
  '🎯 Interpretação de Textos: Treinar a localização de dados explícitos (nome, nacionalidade, cidade onde mora, ocupação e objetivos) sem traduzir palavra por palavra.'
];
