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
  titulo: string;
  enunciado: string;
  respostaEsperada: string;
  espelhoCorrecao: string[];
  pontosChave: string[];
}

export interface AlphabetLetter {
  letter: string;
  phoneticPt: string;
  exampleWord: string;
  translation: string;
}

export const inglesAlphabetData: AlphabetLetter[] = [
  { letter: 'A', phoneticPt: 'ei', exampleWord: 'Apple', translation: 'Maçã' },
  { letter: 'B', phoneticPt: 'bi', exampleWord: 'Book', translation: 'Livro' },
  { letter: 'C', phoneticPt: 'ci', exampleWord: 'Court', translation: 'Tribunal / Vara' },
  { letter: 'D', phoneticPt: 'di', exampleWord: 'Desk', translation: 'Mesa / Balcão' },
  { letter: 'E', phoneticPt: 'i', exampleWord: 'Exam', translation: 'Exame / Prova' },
  { letter: 'F', phoneticPt: 'éf', exampleWord: 'File', translation: 'Arquivo / Processo' },
  { letter: 'G', phoneticPt: 'dji', exampleWord: 'Good', translation: 'Bom / Bem' },
  { letter: 'H', phoneticPt: 'êitch', exampleWord: 'Hello', translation: 'Olá' },
  { letter: 'I', phoneticPt: 'ai', exampleWord: 'Important', translation: 'Importante' },
  { letter: 'J', phoneticPt: 'djei', exampleWord: 'Judge', translation: 'Juiz(a)' },
  { letter: 'K', phoneticPt: 'kei', exampleWord: 'Key', translation: 'Chave / Fundamental' },
  { letter: 'L', phoneticPt: 'él', exampleWord: 'Lawyer', translation: 'Advogado(a)' },
  { letter: 'M', phoneticPt: 'ém', exampleWord: 'Morning', translation: 'Manhã' },
  { letter: 'N', phoneticPt: 'én', exampleWord: 'Name', translation: 'Nome' },
  { letter: 'O', phoneticPt: 'ou', exampleWord: 'Office', translation: 'Cartório / Gabinete' },
  { letter: 'P', phoneticPt: 'pi', exampleWord: 'Public servant', translation: 'Servidor público' },
  { letter: 'Q', phoneticPt: 'kiu', exampleWord: 'Question', translation: 'Questão / Pergunta' },
  { letter: 'R', phoneticPt: 'ar', exampleWord: 'Report', translation: 'Relatório' },
  { letter: 'S', phoneticPt: 'és', exampleWord: 'Student', translation: 'Estudante' },
  { letter: 'T', phoneticPt: 'ti', exampleWord: 'Tomorrow', translation: 'Amanhã' },
  { letter: 'U', phoneticPt: 'iu', exampleWord: 'Unit', translation: 'Unidade' },
  { letter: 'V', phoneticPt: 'vi', exampleWord: 'Very', translation: 'Muito' },
  { letter: 'W', phoneticPt: 'dâbliu', exampleWord: 'Where', translation: 'Onde / De onde' },
  { letter: 'X', phoneticPt: 'éks', exampleWord: 'X-ray', translation: 'Raio-X' },
  { letter: 'Y', phoneticPt: 'uai', exampleWord: 'You', translation: 'Você' },
  { letter: 'Z', phoneticPt: 'zi / zéd', exampleWord: 'Zone', translation: 'Zona' },
];

export const inglesFlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'Qual é a diferença fundamental entre "Good evening" e "Good night"?',
    a: '• "Good evening": é utilizado como CUMPRIMENTO ao encontrar alguém no período da noite (ao chegar).\n• "Good night": é utilizado estritamente na DESPEDIDA à noite (ao ir embora ou antes de dormir).',
    frente: 'Good evening vs. Good night',
    verso: 'Good evening = cumprimento ao chegar à noite.\nGood night = despedida ao sair ou dormir.',
    categoria: 'Cumprimentos (Greetings)',
    dica: 'Chegou a uma reunião noturna? Diga "Good evening!". Vai embora? Diga "Good night!".',
    pronuncia: 'gud ívning / gud náit'
  },
  {
    id: 2,
    q: 'Como se pergunta e como se responde a idade corretamente em inglês?',
    a: 'Pergunta: "How old are you?" (Quantos anos você tem?).\nResposta: "I am [idade] years old" (ou simplesmente "I\'m [idade]").\n⚠️ ATENÇÃO: NUNCA diga *"I have 25 years"*!',
    frente: 'Idade em Inglês: How old are you?',
    verso: 'Pergunta: "How old are you?"\nResposta: "I am 25 years old." (NUNCA usar o verbo "have" para idade).',
    categoria: 'Apresentação Pessoal',
    dica: 'Em inglês, a idade é um estado de ser (verbo TO BE), e não uma posse (have).',
    pronuncia: 'háo ôuld ar iú? / áim... íers ôuld'
  },
  {
    id: 3,
    q: 'Como perguntar e responder a origem / nacionalidade de uma pessoa?',
    a: 'Pergunta: "Where are you from?" (De onde você é?).\nResposta: "I am from Brazil." (Sou do Brasil) ou "I\'m from Manaus." (Sou de Manaus).',
    frente: 'Origem: Where are you from?',
    verso: 'Pergunta: "Where are you from?"\nResposta: "I\'m from Brazil / I\'m from Manaus."',
    categoria: 'Origem e Procedência',
    dica: 'A preposição "from" indica procedência / ponto de partida.',
    pronuncia: 'uér ar iú frôm? / áim frôm brazíl'
  },
  {
    id: 4,
    q: 'Como perguntar e informar a profissão de forma natural?',
    a: 'Pergunta: "What do you do?" (O que você faz? / Qual é sua profissão?).\nRespostas:\n• "I\'m a public servant." (Sou servidor público).\n• "I\'m a student." (Sou estudante).\n• "I\'m a lawyer." (Sou advogado).',
    frente: 'Profissão: What do you do?',
    verso: 'Pergunta: "What do you do?"\nResposta: "I\'m a public servant" / "I\'m a student". Lembre-se do artigo "a" antes da profissão.',
    categoria: 'Profissão',
    dica: 'No singular, use sempre "a" antes de som consonantal: a student, a public servant, a teacher.',
    pronuncia: 'uót du iú du? / áim a pâblik sérvant'
  },
  {
    id: 5,
    q: 'Quais são os cumprimentos formais e informais mais comuns em inglês?',
    a: '• Informais: Hi! (Oi!), Hello! (Olá!), Hey! (Ei/Oi!).\n• Formais: Good morning! (Bom dia), Good afternoon! (Boa tarde), Good evening! (Boa noite ao chegar).',
    frente: 'Cumprimentos (Formais x Informais)',
    verso: 'Informais: Hi, Hello, Hey.\nFormais: Good morning, Good afternoon, Good evening.',
    categoria: 'Cumprimentos (Greetings)',
    dica: '"Hello" transita bem tanto em situações formais quanto casuais.',
    pronuncia: 'hái, relôu, rêi / gud mórning, gud áfternun, gud ívning'
  },
  {
    id: 6,
    q: 'Quais são as principais expressões de despedida (Goodbyes)?',
    a: '• Goodbye! (Adeus/Tchau)\n• Bye! (Tchau)\n• See you! (Até mais)\n• See you later! (Até mais tarde)\n• See you tomorrow! (Até amanhã)\n• Have a nice day! (Tenha um bom dia)',
    frente: 'Despedidas (Goodbyes)',
    verso: 'Goodbye, Bye, See you later, See you tomorrow, Have a nice day!',
    categoria: 'Despedidas',
    dica: '"See you tomorrow" é perfeito para despedidas no cartório ou tribunal com colegas de trabalho.',
    pronuncia: 'gudbái, bái, sí iú lêiter, sí iú tumórou'
  },
  {
    id: 7,
    q: 'Como responder à pergunta "How are you?" (Como você está?)?',
    a: '• I\'m fine, thank you. (Estou bem, obrigado)\n• I\'m good. (Estou bem)\n• I\'m great. (Estou ótimo/a)\n• I\'m okay. (Estou bem / OK)\nTambém se pode perguntar: "How are you doing?".',
    frente: 'Como vai?: How are you?',
    verso: 'I\'m fine, thank you / I\'m good / I\'m great / I\'m okay.',
    categoria: 'Cumprimentos',
    dica: 'Acrescente sempre "thank you, and you?" (obrigado, e você?) para demonstrar polidez.',
    pronuncia: 'háo ar iú? / áim fáin, tänk iú'
  },
  {
    id: 8,
    q: 'O que significa a expressão de cortesia "Nice to meet you!"?',
    a: 'Significa "Prazer em conhecê-lo(a)!". É usada quando duas pessoas se conhecem pela primeira vez. A resposta padrão é: "Nice to meet you too!" (Prazer em conhecê-lo também!).',
    frente: 'Nice to meet you!',
    verso: 'Prazer em conhecê-lo(a)!\nResposta: "Nice to meet you too!" (com o "too" no final = também).',
    categoria: 'Apresentação',
    dica: 'Usado estritamente no primeiro encontro. Em encontros posteriores, use "Good to see you!".',
    pronuncia: 'náis tu mít iú / náis tu mít iú tú'
  },
  {
    id: 9,
    q: 'Como soletramos vogais e consoantes desafiadoras do alfabeto inglês (A, E, I, G, J, H, R, Y)?',
    a: '• A = "ei" | E = "i" | I = "ai"\n• G = "dji" | J = "djei"\n• H = "êitch"\n• R = "ar"\n• Y = "uai"',
    frente: 'Pegadinhas Fonéticas do Alfabeto',
    verso: 'A (ei), E (i), I (ai), G (dji), J (djei), H (êitch), R (ar), Y (uai).',
    categoria: 'Alfabeto Fonético',
    dica: 'Muito comum em bancas de tribunal pedir soletração (spelling) de nomes e códigos.',
    pronuncia: 'spelling: ei, i, ai, dji, djei, êitch'
  },
  {
    id: 10,
    q: 'Como funciona uma apresentação pessoal completa e formal em 4 passos?',
    a: '1. Saudação: "Hello! Good morning!"\n2. Nome e idade: "My name is Pedro. I am 28 years old."\n3. Origem e localidade: "I\'m from Brazil and I live in Manaus."\n4. Profissão: "I am a public servant at the TJAM court."',
    frente: 'Estrutura da Apresentação Pessoal',
    verso: '1. Saudação → 2. Nome/Idade → 3. Origem/Cidade → 4. Profissão/Ocupação.',
    categoria: 'Prática Forense TJAM',
    dica: 'Essa estrutura atende ao desafio oral gravado em áudio para o professor.',
    pronuncia: 'personal presentation'
  }
];

// 10 Questões Objetivas Oficiais (Parte 1: 1 a 10)
export const inglesMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A expressão “Good morning!” significa:',
    opcoes: [
      'A) Boa noite.',
      'B) Boa tarde.',
      'C) Bom dia.',
      'D) Até amanhã.',
      'E) Até mais.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito oficial: C. "Good morning!" é a saudação formal utilizada no período da manhã e significa "Bom dia!". Boa tarde é "Good afternoon" e boa noite ao chegar é "Good evening".'
  },
  {
    id: 2,
    enunciado: '2. A pergunta “What\'s your name?” significa:',
    opcoes: [
      'A) Onde você mora?',
      'B) Qual é o seu nome?',
      'C) Qual é sua profissão?',
      'D) Quantos anos você tem?',
      'E) De onde você é?'
    ],
    correta: 1, // B
    explicacao: 'Gabarito oficial: B. "What\'s your name?" (contração de "What is your name?") significa "Qual é o seu nome?". Onde você mora é "Where do you live?", profissão é "What do you do?" e idade é "How old are you?".'
  },
  {
    id: 3,
    enunciado: '3. Assinale a alternativa que apresenta uma resposta adequada para “How are you?”:',
    opcoes: [
      'A) I\'m from Brazil.',
      'B) I\'m 25 years old.',
      'C) I\'m fine, thank you.',
      'D) My name is John.',
      'E) I\'m a student.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito oficial: C. "How are you?" pergunta sobre o estado de espírito ou saúde da pessoa ("Como você está?"). A resposta natural e cortês é "I\'m fine, thank you." (Estou bem, obrigado).'
  },
  {
    id: 4,
    enunciado: '4. A expressão “Where are you from?” é utilizada para perguntar:',
    opcoes: [
      'A) a idade de uma pessoa.',
      'B) o nome de uma pessoa.',
      'C) a profissão de uma pessoa.',
      'D) a origem de uma pessoa.',
      'E) o endereço de uma pessoa.'
    ],
    correta: 3, // D
    explicacao: 'Gabarito oficial: D. A preposição "from" indica procedência ou origem. Portanto, "Where are you from?" pergunta "De onde você é?", investigando a cidade, estado ou país de origem.'
  },
  {
    id: 5,
    enunciado: '5. Qual alternativa apresenta uma forma correta de dizer “Eu sou do Brasil”?',
    opcoes: [
      'A) I have Brazil.',
      'B) I am from Brazil.',
      'C) I from Brazil.',
      'D) I have from Brazil.',
      'E) I Brazil.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito oficial: B. A construção gramatical correta exige o pronome sujeito ("I"), o verbo to be conjugado ("am") e a preposição de origem ("from"): "I am from Brazil" (ou na forma contraída, "I\'m from Brazil").'
  },
  {
    id: 6,
    enunciado: '6. A expressão “Nice to meet you!” significa:',
    opcoes: [
      'A) Até amanhã!',
      'B) Como você está?',
      'C) Prazer em conhecê-lo(a)!',
      'D) Qual é o seu nome?',
      'E) Tenha um bom dia!'
    ],
    correta: 2, // C
    explicacao: 'Gabarito oficial: C. "Nice to meet you!" é uma expressão de polidez e cortesia utilizada no momento da apresentação inicial de duas pessoas, significando "Prazer em conhecê-lo(a)!".'
  },
  {
    id: 7,
    enunciado: '7. Qual alternativa apresenta uma forma correta de informar a idade?',
    opcoes: [
      'A) I have 20 years.',
      'B) I am 20 years old.',
      'C) I have 20 old.',
      'D) I am have 20 years.',
      'E) I 20 years.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito oficial: B. Em inglês, a idade é expressa com o verbo TO BE ("I am..."), seguido do numeral e da locução "years old": "I am 20 years old". É um erro clássico de brasileiros traduzir ao pé da letra com o verbo "have" (*I have 20 years*).'
  },
  {
    id: 8,
    enunciado: '8. Em inglês, “Good evening” é normalmente utilizado:',
    opcoes: [
      'A) para cumprimentar alguém no período da noite.',
      'B) exclusivamente para despedidas.',
      'C) somente pela manhã.',
      'D) somente ao meio-dia.',
      'E) para perguntar a idade.'
    ],
    correta: 0, // A
    explicacao: 'Gabarito oficial: A. "Good evening" é uma saudação (cumprimento de chegada) empregada no período noturno (a partir do pôr do sol ou 18h). A despedida noturna é "Good night".'
  },
  {
    id: 9,
    enunciado: '9. Assinale a alternativa que apresenta uma despedida:',
    opcoes: [
      'A) Hello.',
      'B) Good morning.',
      'C) How are you?',
      'D) See you later.',
      'E) What\'s your name?'
    ],
    correta: 3, // D
    explicacao: 'Gabarito oficial: D. "See you later" significa "Até mais tarde" ou "Vejo você mais tarde", configurando uma clássica expressão de despedida (goodbye). As demais opções são cumprimentos ou perguntas de apresentação.'
  },
  {
    id: 10,
    enunciado: '10. Observe o diálogo:\n\nA: Hello! What\'s your name?\nB: My name is Daniel.\nA: Where are you from?\nB: I\'m from Brazil.\n\nDe acordo com o diálogo, Daniel:',
    opcoes: [
      'A) é professor.',
      'B) tem 20 anos.',
      'C) é brasileiro ou vem do Brasil.',
      'D) mora necessariamente em Manaus.',
      'E) trabalha no Brasil.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito oficial: C. Ao responder "I\'m from Brazil", Daniel informa explicitamente que é do Brasil (brasileiro/proveniente do país). O texto não menciona sua idade, profissão nem a cidade específica onde reside.'
  }
];

// 5 Questões Certo ou Errado (Parte 2: 11 a 15) — Estilo Cebraspe
export const inglesTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. “Hello” e “Hi” podem ser utilizados como cumprimentos.',
    correta: true,
    explicacao: 'Gabarito oficial: CERTO. Ambos são saudações clássicas em inglês, sendo "Hello" mais neutro/formal e "Hi" mais casual e coloquial.'
  },
  {
    id: 12,
    enunciado: '12. “How old are you?” significa “Qual é o seu nome?”.',
    correta: false,
    explicacao: 'Gabarito oficial: ERRADO. "How old are you?" significa "Quantos anos você tem?" (pergunta a idade). "Qual é o seu nome?" é "What\'s your name?".'
  },
  {
    id: 13,
    enunciado: '13. “I\'m a student” significa “Eu sou estudante”.',
    correta: true,
    explicacao: 'Gabarito oficial: CERTO. "I\'m" é a contração de "I am" (eu sou), seguido do artigo indefinido "a" e do substantivo "student" (estudante).'
  },
  {
    id: 14,
    enunciado: '14. “Good night” é normalmente utilizado como cumprimento equivalente a “Good morning”.',
    correta: false,
    explicacao: 'Gabarito oficial: ERRADO. "Good morning" é uma saudação de chegada matutina. Já "Good night" é uma DESPEDIDA noturna (usada ao sair ou antes de dormir). O cumprimento de chegada noturno equivalente é "Good evening".'
  },
  {
    id: 15,
    enunciado: '15. “See you tomorrow” significa “Até amanhã”.',
    correta: true,
    explicacao: 'Gabarito oficial: CERTO. "See you" (vejo você / até) + "tomorrow" (amanhã) traduz-se com exatidão como "Até amanhã!".'
  }
];

// 5 Questões Dissertativas Oficiais (Parte 3: 16 a 20) com Espelho Oficial
export const inglesDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    titulo: 'Questão 16 — Tradução Direta de Apresentação',
    enunciado: 'Traduza para o português a seguinte frase de apresentação pessoal:\n\n“Hello! My name is Anna. I\'m from Brazil.”',
    respostaEsperada: 'Gabarito oficial:\n“Olá! Meu nome é Anna. Eu sou do Brasil.” (ou “Olá! Meu nome é Anna. Sou brasileira / Venho do Brasil.”)',
    espelhoCorrecao: [
      'Tradução adequada da saudação: "Hello!" → "Olá!" ou "Oi!"',
      'Identificação do nome: "My name is Anna" → "Meu nome é Anna"',
      'Indicação correta da procedência/país: "I\'m from Brazil" → "Eu sou do Brasil" / "Sou do Brasil"'
    ],
    pontosChave: [
      'Tradução do cumprimento Hello',
      'Pronome possessivo My (meu)',
      'Preposição from (do / de)'
    ]
  },
  {
    id: 17,
    titulo: 'Questão 17 — Formulação de Perguntas em Inglês',
    enunciado: 'Escreva em inglês:\na) Uma pergunta para saber o nome de uma pessoa.\nb) Uma pergunta para saber de onde essa pessoa é.',
    respostaEsperada: 'Gabarito oficial:\na) Pergunta para saber o nome: “What\'s your name?” (ou “What is your name?”).\nb) Pergunta para saber a origem: “Where are you from?”.',
    espelhoCorrecao: [
      'Item a: Utilização correta de "What\'s your name?" ou "What is your name?" com ponto de interrogação.',
      'Item b: Utilização correta de "Where are you from?" com a preposição "from" ao final e ponto de interrogação.'
    ],
    pontosChave: [
      'Palavra interrogativa What para nome',
      'Palavra interrogativa Where + from para origem',
      'Presença indispensável do ponto de interrogação'
    ]
  },
  {
    id: 18,
    titulo: 'Questão 18 — Distinção Semântica: Good evening vs. Good night',
    enunciado: 'Explique detalhadamente a diferença de contexto e uso entre as expressões “Good evening” e “Good night”.',
    respostaEsperada: 'Gabarito oficial:\n• “Good evening” é uma saudação (cumprimento de chegada) utilizada a partir do final da tarde / início da noite (por volta das 18h) quando você encontra alguém ou inicia uma palestra/conversa.\n• “Good night” é exclusivamente uma expressão de despedida, empregada quando você está indo embora de um local no período noturno ou quando vai dormir.',
    espelhoCorrecao: [
      'Identificação de "Good evening" como saudação/cumprimento de chegada noturno',
      'Identificação de "Good night" como despedida ao sair ou antes de dormir',
      'Menção ao contexto temporal (período noturno para ambos, mas funções comunicativas opostas)'
    ],
    pontosChave: [
      'Good evening = chegada / cumprimento',
      'Good night = saída / despedida / dormir',
      'Diferença clássica cobrada pela FGV e Cebraspe'
    ]
  },
  {
    id: 19,
    titulo: 'Questão 19 — Diálogo Básico de Apresentação',
    enunciado: 'Imagine que você está conhecendo um colega pela primeira vez. Escreva um pequeno diálogo em inglês contendo obrigatoriamente:\n1) Cumprimento;\n2) Apresentação do nome;\n3) Pergunta sobre a origem;\n4) Despedida.',
    respostaEsperada: 'Gabarito oficial (modelo sugerido):\n\nA: Hello! Good morning! My name is Carlos. What\'s your name?\nB: Hi Carlos! I\'m Maria. Nice to meet you!\nA: Nice to meet you too! Where are you from?\nB: I\'m from Manaus, Brazil. And you?\nA: I\'m from Brazil too. Great! See you later, Maria!\nB: Goodbye! Have a nice day!',
    espelhoCorrecao: [
      'Presença de cumprimento (Hello, Hi, Good morning)',
      'Troca de nomes e cortesia (My name is..., Nice to meet you)',
      'Pergunta e resposta sobre local de origem (Where are you from? I\'m from...)',
      'Despedida formal ou informal adequada (See you later, Goodbye, Bye)'
    ],
    pontosChave: [
      'Estrutura em formato de diálogo (interlocutores A e B)',
      'Coerência e sequência comunicativa lógica',
      'Atendimento aos 4 requisitos expressos no enunciado'
    ]
  },
  {
    id: 20,
    titulo: 'Questão 20 — Apresentação Pessoal Completa',
    enunciado: 'Escreva uma apresentação pessoal curta em inglês contendo:\n• seu nome;\n• sua idade;\n• de onde você é;\n• sua profissão ou condição de estudante.',
    respostaEsperada: 'Gabarito oficial (modelo sugerido):\n\n“Hello! My name is Pedro. I am 25 years old. I am from Manaus, Brazil. I am a public servant / I am a student preparing for the TJAM examination. Nice to meet you!”',
    espelhoCorrecao: [
      'Apresentação do nome ("My name is..." ou "I am...")',
      'Indicação correta da idade com o verbo to be ("I am ... years old")',
      'Indicação da origem com preposição ("I am from...")',
      'Indicação da ocupação com o artigo "a" ("I am a student" / "I am a public servant")'
    ],
    pontosChave: [
      'Uso correto de I am... years old (sem utilizar have)',
      'Emprego do artigo indefinido "a" antes de profissão',
      'Construção coesa e gramaticalmente correta'
    ]
  }
];

export const inglesSummaryPoints: string[] = [
  '🔤 Alfabeto Inglês (26 letras): Possui fonética distinta do português. Memorize: A (ei), E (i), I (ai), G (dji), J (djei), H (êitch), R (ar), Y (uai), W (dâbliu).',
  '👋 Cumprimentos (Greetings): Informais: Hi!, Hello!, Hey! | Formais: Good morning (manhã), Good afternoon (tarde), Good evening (noite ao chegar).',
  '⚠️ Regra de Ouro: "Good evening" é saudação de chegada à noite; "Good night" é estritamente despedida ao sair ou antes de dormir.',
  '💬 Perguntando Como Está: "How are you?" ou "How are you doing?" → Respostas: "I\'m fine, thank you", "I\'m good", "I\'m great", "I\'m okay".',
  '🤝 Apresentação do Nome: "What\'s your name?" → "My name is [Nome]" ou "I\'m [Nome]". Cortesia: "Nice to meet you!" (Prazer em conhecê-lo).',
  '🎂 Idade com Verbo TO BE: Pergunta-se "How old are you?". Responde-se "I am 25 years old". NUNCA use o verbo have (*I have 25 years*).',
  '🌎 Origem & Nacionalidade: "Where are you from?" → "I\'m from Brazil" / "I\'m from Manaus". Preposição "from" indica procedência.',
  '💼 Profissão & Artigo "A": "What do you do?" → "I\'m a public servant" (servidor público), "I\'m a student" (estudante), "I\'m a lawyer" (advogado).',
  '👋 Despedidas (Goodbyes): Goodbye!, Bye!, See you!, See you later! (Até mais tarde), See you tomorrow! (Até amanhã), Have a nice day! (Tenha um bom dia).',
  '📱 Desafio Prático TJAM: Gravação de áudio de 30 a 60 segundos com apresentação pessoal e envio ao professor via WhatsApp.'
];

export const inglesVideoInfo = {
  title: 'Inglês — Aula 01: Alfabeto, Cumprimentos e Apresentação',
  subtitle: 'Nível Intermediário — TJAM Assistente Judiciário',
  videoUrl: 'https://www.youtube.com/embed/prAINVhqreQ?autoplay=0&rel=0',
  videoId: 'prAINVhqreQ',
  duration: '45 min'
};
