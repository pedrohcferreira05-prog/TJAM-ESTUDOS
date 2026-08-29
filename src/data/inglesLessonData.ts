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
    q: 'Como se diz "Olá! / Oi!" em inglês e qual a pronúncia aproximada?',
    a: 'Hello! / Hi! — Pronúncia: "rélou / rái". Cumprimentos informais e gerais aplicáveis em qualquer momento.',
    frente: 'Hello! / Hi!',
    verso: 'Olá! / Oi! (Cumprimentos informais e gerais em qualquer horário)',
    categoria: 'Cumprimentos',
    dica: 'Forma mais universal de iniciar uma conversa.',
    pronuncia: 'rélou / rái'
  },
  {
    id: 2,
    q: 'Como se diz "Bom dia!" em inglês e em qual período deve ser usado?',
    a: 'Good morning! — Usado do início da manhã até o meio-dia (12h). Pronúncia: "gud mórning".',
    frente: 'Good morning!',
    verso: 'Bom dia! (Usado do início da manhã até o meio-dia)',
    categoria: 'Cumprimentos',
    dica: 'morning = manhã',
    pronuncia: 'gud mórning'
  },
  {
    id: 3,
    q: 'Como se diz "Boa tarde!" em inglês e qual a dica de formação da palavra?',
    a: 'Good afternoon! — Formado por "after" (depois) + "noon" (meio-dia). Usado das 12h até aprox. 18h.',
    frente: 'Good afternoon!',
    verso: 'Boa tarde! (Usado do meio-dia até o entardecer, aprox. 18h)',
    categoria: 'Cumprimentos',
    dica: 'after + noon = após o meio-dia',
    pronuncia: 'gud áfternun'
  },
  {
    id: 4,
    q: 'Qual é a diferença essencial entre "Good evening!" e "Good night!"?',
    a: '"Good evening!" é usado ao CHEGAR / cumprimentar à noite. "Good night!" é usado para se DESPEDIR à noite ou antes de dormir.',
    frente: 'Good evening!',
    verso: 'Boa noite! (Usado ao CHEGAR ou cumprimentar alguém à noite)',
    categoria: 'Cumprimentos',
    dica: 'Atenção: Good night é usado para se DESPEDIR ou antes de dormir.',
    pronuncia: 'gud ívning'
  },
  {
    id: 5,
    q: 'Como se pergunta "Como você está?" e como se responde "Estou bem"?',
    a: 'Pergunta: "How are you?" / Resposta: "I\'m fine." (ou "I am fine, thank you.").',
    frente: 'How are you? / I\'m fine.',
    verso: 'Como você está? / Estou bem (ou Estou ótimo).',
    categoria: 'Comunicação Básica',
    dica: 'Pergunta de cortesia comum após o cumprimento.',
    pronuncia: 'ráu ar iú? / áim fáin'
  },
  {
    id: 6,
    q: 'Como se diz "Prazer em conhecer você" e como responder educadamente?',
    a: '"Nice to meet you." — Resposta comum de cortesia: "Nice to meet you too." (Prazer em conhecer você também).',
    frente: 'Nice to meet you.',
    verso: 'Prazer em conhecer você. (Usado em apresentações)',
    categoria: 'Apresentação',
    dica: 'Resposta comum: Nice to meet you too (Prazer em conhecer você também).',
    pronuncia: 'náis tu mít iú'
  },
  {
    id: 7,
    q: 'Como se diz "Até mais tarde" e "Tchau / Adeus" em inglês?',
    a: '"See you later." (Até mais tarde) e "Goodbye!" ou "Bye!" (Tchau / Adeus).',
    frente: 'See you later. / Goodbye!',
    verso: 'Até mais tarde. / Tchau! Adeus!',
    categoria: 'Despedidas',
    dica: 'later = mais tarde / bye-bye',
    pronuncia: 'sí iú lêiter / gudbái'
  },
  {
    id: 8,
    q: 'Qual a estrutura padrão para dizer seu nome em inglês?',
    a: '"My name is [Nome]." (Meu nome é...). Pronúncia: "mái nêim iz...".',
    frente: 'My name is [Nome].',
    verso: 'Meu nome é [Nome].',
    categoria: 'Apresentação',
    dica: 'Estrutura básica de identificação pessoal.',
    pronuncia: 'mái nêim iz...'
  },
  {
    id: 9,
    q: 'Como dizer "Eu sou um(a) estudante" em inglês e por que usamos o artigo "a"?',
    a: '"I am a student." — O artigo indefinido "a" é usado antes de palavras iniciadas por som de consoante (student).',
    frente: 'I am a student.',
    verso: 'Eu sou um(a) estudante.',
    categoria: 'Apresentação',
    dica: 'I am = Eu sou / Eu estou. O artigo "a" antecede som de consoante.',
    pronuncia: 'ái ém é stiúdent'
  },
  {
    id: 10,
    q: 'Como dizer "Eu moro em Manaus" em inglês e qual preposição utilizar para cidades?',
    a: '"I live in Manaus." — Usa-se a preposição "in" para indicar moradia em cidades, estados e países.',
    frente: 'I live in Manaus.',
    verso: 'Eu moro em Manaus.',
    categoria: 'Apresentação',
    dica: 'live in = morar/residir em uma cidade ou país.',
    pronuncia: 'ái lív in Manáus'
  },
  {
    id: 11,
    q: 'Como dizer "Eu estudo inglês" e qual a regra de grafia para idiomas em inglês?',
    a: '"I study English." — Nomes de idiomas e nacionalidades são SEMPRE grafados com inicial maiúscula (English, Portuguese).',
    frente: 'I study English.',
    verso: 'Eu estudo inglês.',
    categoria: 'Apresentação',
    dica: 'study = estudar. English com inicial maiúscula.',
    pronuncia: 'ái stádi ínglish'
  },
  {
    id: 12,
    q: 'Como se formula a pergunta "Qual é o seu nome?" em inglês?',
    a: '"What is your name?" — Pronome interrogativo "What" (Qual/O que) + verbo "is" + "your name".',
    frente: 'What is your name?',
    verso: 'Qual é o seu nome?',
    categoria: 'Perguntas Básicas',
    dica: 'Pronome interrogativo: What (Qual/O que).',
    pronuncia: 'uót iz iór nêim?'
  },
  {
    id: 13,
    q: 'Como se formula a pergunta "Onde você mora?" em inglês?',
    a: '"Where do you live?" — Pronome interrogativo "Where" (Onde) + verbo auxiliar "do" + sujeito + verbo principal.',
    frente: 'Where do you live?',
    verso: 'Onde você mora?',
    categoria: 'Perguntas Básicas',
    dica: 'Pronome interrogativo: Where (Onde).',
    pronuncia: 'uér du iú lív?'
  },
  {
    id: 14,
    q: 'O que significa a pergunta "What do you do?" e em qual contexto é usada?',
    a: 'Significa "O que você faz? / Qual é a sua profissão ou ocupação?". É a pergunta padrão para indagar sobre trabalho/estudos.',
    frente: 'What do you do?',
    verso: 'O que você faz? / Qual é a sua profissão/ocupação?',
    categoria: 'Perguntas Básicas',
    dica: 'Expressão idiomática para saber a profissão ou atividade.',
    pronuncia: 'uót du iú dú?'
  },
  {
    id: 15,
    q: 'Como se pergunta "Você fala inglês?" e por que se usa o auxiliar "Do"?',
    a: '"Do you speak English?" — No presente simples, o auxiliar "Do" é necessário para formar frases interrogativas com o pronome "you".',
    frente: 'Do you speak English?',
    verso: 'Você fala inglês?',
    categoria: 'Perguntas Básicas',
    dica: 'Auxiliar "Do" usado para perguntas no presente simples.',
    pronuncia: 'du iú spík ínglish?'
  }
];

export const inglesMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: 'A expressão em inglês “Good morning” significa:',
    opcoes: [
      'A) Boa noite',
      'B) Bom dia',
      'C) Boa tarde',
      'D) Até logo'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. “Good morning” é o cumprimento em inglês correspondente a “Bom dia!”, utilizado durante o período matutino.'
  },
  {
    id: 2,
    enunciado: 'A pergunta “What is your name?” traduz-se corretamente para o português como:',
    opcoes: [
      'A) Onde você mora?',
      'B) Como você está?',
      'C) Qual é o seu nome?',
      'D) O que você estuda?'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. “What is your name?” significa “Qual é o seu nome?”. O pronome interrogativo “What” expressa “Qual/O que”.'
  },
  {
    id: 3,
    enunciado: 'A frase “I live in Manaus” significa:',
    opcoes: [
      'A) Eu trabalho em Manaus.',
      'B) Eu estudo em Manaus.',
      'C) Eu moro em Manaus.',
      'D) Eu viajo para Manaus.'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. O verbo “to live” significa morar ou viver. Logo, “I live in Manaus” traduz-se por “Eu moro em Manaus”.'
  },
  {
    id: 4,
    enunciado: 'A frase de cortesia “Nice to meet you” é comumente empregada em apresentações e significa:',
    opcoes: [
      'A) Até amanhã.',
      'B) Prazer em conhecer você.',
      'C) Como você está?',
      'D) Boa noite.'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. “Nice to meet you” expressa “Prazer em conhecer você”, dita quando somos apresentados a uma nova pessoa.'
  },
  {
    id: 5,
    enunciado: 'A pergunta “How are you?” traduz-se por:',
    opcoes: [
      'A) Qual é o seu nome?',
      'B) Onde você mora?',
      'C) Como você está?',
      'D) Você estuda?'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. “How are you?” é a clássica pergunta de saudação que significa “Como você está?” ou “Como vai você?”.'
  },
  {
    id: 6,
    enunciado: 'Complete corretamente a lacuna: “My ______ is Maria.”',
    opcoes: [
      'A) live',
      'B) are',
      'C) name',
      'D) study'
    ],
    correta: 2,
    explicacao: 'Gabarito: C (name). A expressão correta de apresentação é “My name is Maria” (Meu nome é Maria).'
  },
  {
    id: 7,
    enunciado: 'Complete corretamente a lacuna: “I ______ in Manaus.”',
    opcoes: [
      'A) live',
      'B) is',
      'C) are',
      'D) name'
    ],
    correta: 0,
    explicacao: 'Gabarito: A (live). O verbo adequado para indicar residência em primeira pessoa é “live” (“I live in Manaus” = Eu moro em Manaus).'
  },
  {
    id: 8,
    enunciado: 'Complete corretamente a lacuna com a forma do verbo to be: “I ______ a student.”',
    opcoes: [
      'A) is',
      'B) am',
      'C) are',
      'D) be'
    ],
    correta: 1,
    explicacao: 'Gabarito: B (am). Com o pronome de 1ª pessoa do singular “I”, a conjugação do verbo to be no presente é “am” (“I am a student” = Eu sou estudante).'
  },
  {
    id: 9,
    enunciado: 'Complete corretamente a lacuna: “Nice to ______ you.”',
    opcoes: [
      'A) meet',
      'B) live',
      'C) are',
      'D) name'
    ],
    correta: 0,
    explicacao: 'Gabarito: A (meet). A fórmula de apresentação social é “Nice to meet you” (Prazer em conhecer você).'
  },
  {
    id: 10,
    enunciado: 'Complete corretamente a lacuna na pergunta: “How ______ you?”',
    opcoes: [
      'A) is',
      'B) am',
      'C) are',
      'D) do'
    ],
    correta: 2,
    explicacao: 'Gabarito: C (are). Com o pronome “you”, o verbo to be conjuga-se como “are” (“How are you?”).'
  },
  {
    id: 11,
    enunciado: 'Organize as palavras para formar uma frase correta em inglês: [name / My / is / João.]',
    opcoes: [
      'A) My name is João.',
      'B) João is name My.',
      'C) Is João My name.',
      'D) Name is My João.'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. A ordem gramatical correta em inglês é Sujeito + Verbo + Predicado: “My name is João.”'
  },
  {
    id: 12,
    enunciado: 'Organize as palavras para formar uma frase correta em inglês: [in / I / Manaus / live.]',
    opcoes: [
      'A) In Manaus live I.',
      'B) I live in Manaus.',
      'C) Live in I Manaus.',
      'D) Manaus in I live.'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. A ordem padrão da oração afirmativa em inglês é Pronome Sujeito (I) + Verbo (live) + Preposição e Lugar (in Manaus): “I live in Manaus.”'
  },
  {
    id: 13,
    enunciado: 'Organize as palavras para formar uma frase correta: [student / a / am / I.]',
    opcoes: [
      'A) A student am I.',
      'B) Am I a student.',
      'C) I am a student.',
      'D) Student a I am.'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. A estruturação afirmativa correta é: “I am a student.” (Eu sou um estudante).'
  },
  {
    id: 14,
    enunciado: 'Organize as palavras para formar a expressão de cortesia: [you / meet / Nice / to.]',
    opcoes: [
      'A) Meet to you Nice.',
      'B) Nice to meet you.',
      'C) You meet to Nice.',
      'D) To meet Nice you.'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. A expressão padronizada é “Nice to meet you.” (Prazer em conhecer você).'
  },
  {
    id: 15,
    enunciado: 'Organize as palavras para formar uma frase correta: [English / study / I.]',
    opcoes: [
      'A) Study English I.',
      'B) English I study.',
      'C) I study English.',
      'D) I English study.'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. Sujeito (I) + Verbo (study) + Objeto (English): “I study English.”'
  },
  {
    id: 16,
    enunciado: 'Considere o texto: “Hello! My name is Ana. I am a student. I live in Manaus. I study English every day. Nice to meet you!”. Com base nele, qual é o nome da pessoa apresentada (What is her name?)?',
    opcoes: [
      'A) Maria',
      'B) Ana',
      'C) Carla',
      'D) Joana'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. O texto afirma explicitamente no início: “My name is Ana.”'
  },
  {
    id: 17,
    enunciado: 'Com base no texto da Ana (“I live in Manaus. I study English every day.”), onde ela mora (Where does she live?)?',
    opcoes: [
      'A) In São Paulo',
      'B) In Rio de Janeiro',
      'C) In Manaus',
      'D) In Brasília'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. No texto, Ana afirma categoricamente: “I live in Manaus.”'
  },
  {
    id: 18,
    enunciado: 'Ainda sobre o texto de leitura da Ana, o que ela estuda todos os dias (What does she study?)?',
    opcoes: [
      'A) Spanish',
      'B) French',
      'C) Portuguese',
      'D) English'
    ],
    correta: 3,
    explicacao: 'Gabarito: D. Ana afirma claramente: “I study English every day.” (Eu estudo inglês todos os dias).'
  },
  {
    id: 19,
    enunciado: 'Assinale a alternativa que traz a tradução correta para o português da frase “Good afternoon! See you later.”:',
    opcoes: [
      'A) Bom dia! Até amanhã.',
      'B) Boa tarde! Até mais tarde.',
      'C) Boa noite! Até logo.',
      'D) Olá! Prazer em conhecer você.'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. “Good afternoon” = Boa tarde! / “See you later” = Até mais tarde.'
  },
  {
    id: 20,
    enunciado: 'Qual das alternativas apresenta uma pergunta em inglês com a sua resposta logicamente coerente?',
    opcoes: [
      'A) “What is your name?” → “I live in Manaus.”',
      'B) “Where do you live?” → “My name is Carlos.”',
      'C) “How are you?” → “I am fine.”',
      'D) “Do you speak English?” → “Good morning.”'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. À pergunta “How are you?” (Como você está?), a resposta natural e correta é “I am fine” (Estou bem).'
  }
];

export const inglesTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: 'A expressão “Good evening” é usada principalmente ao se despedir para dormir à noite.',
    correta: false,
    explicacao: 'FALSO. “Good evening” é a saudação de CHEGADA ou cumprimento inicial à noite. Para se despedir ou antes de dormir, utiliza-se “Good night”.'
  },
  {
    id: 2,
    enunciado: 'A frase “I am a student” significa “Eu sou um(a) estudante”.',
    correta: true,
    explicacao: 'VERDADEIRO. “I am” é a 1ª pessoa do verbo to be (eu sou/estou) e “a student” significa “um(a) estudante”.'
  },
  {
    id: 3,
    enunciado: 'A pergunta “Where do you live?” é utilizada para perguntar a ocupação ou profissão de alguém.',
    correta: false,
    explicacao: 'FALSO. “Where do you live?” pergunta “Onde você mora?”. Para perguntar a profissão ou ocupação, utiliza-se “What do you do?”.'
  },
  {
    id: 4,
    enunciado: 'A resposta “Nice to meet you” é utilizada ao se apresentar ou conhecer alguém pela primeira vez.',
    correta: true,
    explicacao: 'VERDADEIRO. Trata-se da fórmula de polidez clássica para “Prazer em conhecer você”.'
  },
  {
    id: 5,
    enunciado: 'Na frase “I study English”, a palavra “English” deve ser grafada com letra inicial maiúscula em inglês.',
    correta: true,
    explicacao: 'VERDADEIRO. Em inglês, nomes de idiomas e nacionalidades (English, Portuguese, Spanish) são sempre grafados com a letra inicial maiúscula.'
  }
];

export const inglesDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    titulo: '5️⃣ Produção Escrita — Perfil Pessoal em Inglês',
    enunciado: 'Escreva 5 frases completas e gramaticalmente corretas sobre você em inglês, utilizando obrigatoriamente as estruturas: 1) My name is... 2) I am... 3) I live in... 4) I study... 5) I like...',
    respostaEsperada: 'Exemplo de resposta modelo:\n1. My name is Pedro.\n2. I am a student.\n3. I live in Manaus.\n4. I study English and Law for TJAM.\n5. I like studying and reading books.',
    espelhoCorrecao: [
      '1. My name is [Seu Nome]. (Identificação correta de nome próprio com verbo is)',
      '2. I am [sua profissão / ocupação, ex: a student / a public servant / a lawyer]. (Uso correto do artigo "a/an" e verbo to be)',
      '3. I live in [sua cidade, ex: Manaus / Coari / Parintins]. (Emprego da preposição "in" para cidades)',
      '4. I study [disciplina, ex: English / Law / Portuguese for TJAM]. (Verbo study e complementação)',
      '5. I like [gosto pessoal, ex: studying / coffee / reading books]. (Verbo like e concordância com substantivo ou gerúndio)'
    ],
    pontosChave: [
      'Estruturas obrigatórias iniciadas em 1ª pessoa (I)',
      'Pontuação final e letras maiúsculas no início de frases e nomes próprios',
      'Coerência vocabular e ortografia correta em inglês'
    ]
  },
  {
    id: 2,
    titulo: '1️⃣ Tradução Prática (Inglês → Português)',
    enunciado: 'Traduza as 8 expressões básicas para o português com precisão de sentido:\na) Hello!\nb) Good morning!\nc) How are you?\nd) My name is Carlos.\ne) Nice to meet you.\nf) I live in Manaus.\ng) I am a student.\nh) I study English.',
    respostaEsperada: 'Gabarito da Tradução:\na) Olá! (ou Oi!)\nb) Bom dia!\nc) Como você está? (ou Como vai você?)\nd) Meu nome é Carlos.\ne) Prazer em conhecer você.\nf) Eu moro em Manaus.\ng) Eu sou estudante.\nh) Eu estudo inglês.',
    espelhoCorrecao: [
      'a) Hello! = Olá! (ou Oi!)',
      'b) Good morning! = Bom dia!',
      'c) How are you? = Como você está? (ou Como vai você?)',
      'd) My name is Carlos. = Meu nome é Carlos.',
      'e) Nice to meet you. = Prazer em conhecer você.',
      'f) I live in Manaus. = Eu moro em Manaus.',
      'g) I am a student. = Eu sou estudante (ou sou um estudante).',
      'h) I study English. = Eu estudo inglês.'
    ],
    pontosChave: [
      'Precisão na tradução de cumprimentos temporais (morning = dia)',
      'Identificação exata dos verbos live (morar) e study (estudar)',
      'Fórmula de cortesia "Nice to meet you"'
    ]
  },
  {
    id: 3,
    titulo: '4️⃣ Organização Sintática de Frases',
    enunciado: 'Reorganize os blocos de palavras para formar orações em inglês gramaticalmente perfeitas:\n11. name / My / is / João.\n12. in / I / Manaus / live.\n13. student / a / am / I.\n14. you / meet / Nice / to.\n15. English / study / I.',
    respostaEsperada: 'Frases Ordenadas:\n11. My name is João.\n12. I live in Manaus.\n13. I am a student.\n14. Nice to meet you.\n15. I study English.',
    espelhoCorrecao: [
      '11. My name is João.',
      '12. I live in Manaus.',
      '13. I am a student.',
      '14. Nice to meet you.',
      '15. I study English.'
    ],
    pontosChave: [
      'Ordem direta: Sujeito + Verbo + Complemento',
      'Posição do pronome possessivo "My" antes do substantivo "name"',
      'Posicionamento da locução adverbial de lugar "in Manaus" após o verbo'
    ]
  },
  {
    id: 4,
    titulo: '6️⃣ 🎤 Desafio Prático Oral (Apresentação Pessoal)',
    enunciado: 'Pratique e apresente oralmente (30 a 60 segundos) sem ler o seguinte roteiro de apresentação em inglês:\n“Hello! My name is ____. I am a student. I live in ____. I study English. I like ____. Nice to meet you!”',
    respostaEsperada: 'Roteiro e Critérios de Avaliação:\nFala clara e contínua apresentando nome, ocupação, cidade de residência, disciplina estudada, preferência pessoal e saudação final com pronúncia correta das palavras chave.',
    espelhoCorrecao: [
      'Fluência na dicção das palavras chave (Hello, Name, Student, Live, Study, Nice to meet you)',
      'Preenchimento espontâneo das lacunas com informações verídicas do aluno',
      'Pronúncia clara dos sons em inglês sem hesitação excessiva'
    ],
    pontosChave: [
      'Entonação ascendente/descendente adequada',
      'Eliminação da consulta visual direta (memorização efetiva)',
      'Postura e segurança na fala'
    ]
  }
];

export const inglesSummaryPoints: string[] = [
  'Cumprimentos Básicos: Hello (Olá), Hi (Oi), Good morning (Bom dia), Good afternoon (Boa tarde), Good evening (Boa noite ao chegar), Good night (Boa noite ao sair/dormir).',
  'Perguntas de Saudação e Cortesia: How are you? (Como vai?) → I am fine. (Estou bem.) | Nice to meet you. (Prazer em conhecer você.)',
  'Identificação Pessoal: My name is [Nome] (Meu nome é...) | I am a student (Eu sou estudante).',
  'Residência e Estudos: I live in Manaus (Eu moro em Manaus) | I study English (Eu estudo inglês).',
  'Perguntas Essenciais: What is your name? (Qual seu nome?) | Where do you live? (Onde você mora?) | What do you do? (O que você faz?) | Do you speak English? (Você fala inglês?).',
  'Ordem Sintática no Inglês: Estrutura direta Sujeito + Verbo + Objeto/Lugar (I live in Manaus / I study English).'
];
