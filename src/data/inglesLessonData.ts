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
    q: 'Como se diz "12" em inglês e qual a pronúncia aproximada?',
    a: '"Twelve" — Pronúncia aproximada: "tuélv". Cuidado para não confundir com twenty (20).',
    frente: '12 — Twelve',
    verso: 'Twelve (Pronúncia: "tuélv"). Número 12 em inglês.',
    categoria: 'Números 1-20',
    dica: 'Termina com som de "v".',
    pronuncia: 'twelve (tuélv)'
  },
  {
    id: 2,
    q: 'Como se escreve o número 40 em inglês e qual o erro comum a evitar?',
    a: 'Escreve-se "Forty" (sem a letra "u"). Erro comum: escrever "fourty" (incorreto). Quatro é "four", quatorze é "fourteen", mas quarenta é "forty".',
    frente: '40 — Forty (atenção à ortografia!)',
    verso: 'Forty (sem a letra "u"). Quatro é "four", mas 40 perde o "u" e fica "forty".',
    categoria: 'Dezenas',
    dica: 'Não tem a letra "u"!',
    pronuncia: 'forty (fórti)'
  },
  {
    id: 3,
    q: 'Como se formam números compostos como 25, 48 e 99 em inglês?',
    a: 'Junta-se a dezena com a unidade separada por hífen (-): 25 = twenty-five; 48 = forty-eight; 99 = ninety-nine.',
    frente: 'Formação de Números Compostos (21 a 99)',
    verso: 'Dezena + hífen + unidade. Ex: 25 = twenty-five; 99 = ninety-nine.',
    categoria: 'Formação de Números',
    dica: 'Sempre com hífen entre a dezena e a unidade.',
    pronuncia: 'twenty-five / ninety-nine'
  },
  {
    id: 4,
    q: 'Como se diz 100 em inglês?',
    a: '"One hundred" (ou "a hundred"). Pronúncia aproximada: "uán rândred".',
    frente: '100 — One hundred',
    verso: 'One hundred (ou a hundred). Significa cem / cento.',
    categoria: 'Números',
    dica: 'hundred = cem/cento.',
    pronuncia: 'one hundred (uán rândred)'
  },
  {
    id: 5,
    q: 'Qual a pergunta padrão em inglês para "Que horas são?" e como se responde "São..."?',
    a: 'Pergunta: "What time is it?" (Que horas são?). Resposta padrão: "It\'s..." (São... / É...).',
    frente: 'What time is it? / It\'s...',
    verso: 'Que horas são? / São... (ou É...). Ex: It\'s seven o\'clock (São sete horas).',
    categoria: 'Horas',
    dica: 'Usa-se sempre "It\'s" para iniciar a resposta de horários.',
    pronuncia: 'uót táim iz it? / íts...'
  },
  {
    id: 6,
    q: 'Quando devemos usar a expressão "o\'clock" ao informar as horas?',
    a: 'Usa-se "o\'clock" APENAS para horas exatas (sem minutos). Ex: 07:00 = "It\'s seven o\'clock". Nunca usar com minutos (ex: *seven thirty o\'clock é errado).',
    frente: 'Regra de ouro do "o\'clock"',
    verso: 'APENAS para horas redondas/exatas. Ex: It\'s 7:00 = It\'s seven o\'clock.',
    categoria: 'Horas',
    dica: 'Hora exata na ponta do ponteiro.',
    pronuncia: 'o\'clock (ou-clók)'
  },
  {
    id: 7,
    q: 'O que significam as siglas "a.m." e "p.m." e quando cada uma é usada?',
    a: '"a.m." (ante meridiem) = antes do meio-dia (00:00 às 11:59). "p.m." (post meridiem) = após o meio-dia (12:00 às 23:59).',
    frente: 'a.m. vs. p.m.',
    verso: 'a.m. = da madrugada até antes do meio-dia. p.m. = do meio-dia até às 23:59 da noite.',
    categoria: 'Horas',
    dica: 'a.m. = Antes do Meio-dia (AM). p.m. = Pós-Meio-dia (PM).',
    pronuncia: 'êi-ém / pí-ém'
  },
  {
    id: 8,
    q: 'Como dizer 08:30 e 09:45 de forma direta em inglês?',
    a: '08:30 = "It\'s eight thirty." | 09:45 = "It\'s nine forty-five." Fala-se a hora seguida do número dos minutos.',
    frente: 'Horas com Minutos (Formato Direto)',
    verso: '08:30 = It\'s eight thirty. 09:45 = It\'s nine forty-five.',
    categoria: 'Horas',
    dica: 'Hora + Minutos. Simples e direto!',
    pronuncia: 'eight thirty / nine forty-five'
  },
  {
    id: 9,
    q: 'Quais são os 7 dias da semana em inglês e qual regra ortográfica obrigatória eles seguem?',
    a: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Regra: Nomes de dias da semana SEMPRE começam com letra MAIÚSCULA em inglês.',
    frente: 'Dias da Semana (Monday a Sunday)',
    verso: 'Monday (seg), Tuesday (ter), Wednesday (qua), Thursday (qui), Friday (sex), Saturday (sáb), Sunday (dom). Sempre com inicial maiúscula!',
    categoria: 'Dias da Semana',
    dica: 'Wednesday tem o "d" mudo ("uénzdei").',
    pronuncia: 'mândei, tiúzdei, uénzdei, têrzdei, fráidei, sátêrdei, sândei'
  },
  {
    id: 10,
    q: 'O que significam "Today", "Tomorrow" e "Yesterday" em inglês?',
    a: '"Today" = hoje | "Tomorrow" = amanhã | "Yesterday" = ontem.',
    frente: 'Today, Tomorrow & Yesterday',
    verso: 'Today = hoje | Tomorrow = amanhã | Yesterday = ontem.',
    categoria: 'Expressões Temporais',
    dica: 'Yesterday (passado), Today (presente), Tomorrow (futuro).',
    pronuncia: 'tudêi, tumórou, iésterdei'
  }
];

export const inglesMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Qual é o número correspondente a “twelve”?',
    opcoes: [
      'A) 10',
      'B) 11',
      'C) 12',
      'D) 20'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Twelve" corresponde ao número 12. Os outros números são: 10 = ten, 11 = eleven, 20 = twenty.'
  },
  {
    id: 2,
    enunciado: '“Twenty-five” corresponde a:',
    opcoes: [
      'A) 15',
      'B) 20',
      'C) 25',
      'D) 35'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Twenty" (20) + "five" (5) = twenty-five (25). 15 é fifteen, 20 é twenty, e 35 é thirty-five.'
  },
  {
    id: 3,
    enunciado: 'Como se escreve o número 40 em inglês?',
    opcoes: [
      'A) Fourty',
      'B) Forty',
      'C) Fourteen',
      'D) Four'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. O número 40 em inglês é escrito "Forty", SEM a letra "u". Esta é uma das pegadinhas ortográficas mais clássicas do inglês. Four é 4 e fourteen é 14.'
  },
  {
    id: 4,
    enunciado: '“Seventy” significa:',
    opcoes: [
      'A) 17',
      'B) 60',
      'C) 70',
      'D) 80'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Seventy" significa 70. O sufixo "-ty" indica dezena (seventy = 70). Já o sufixo "-teen" indica os números de 13 a 19 (seventeen = 17). 60 é sixty e 80 é eighty.'
  },
  {
    id: 5,
    enunciado: 'Como se escreve 99 em inglês?',
    opcoes: [
      'A) Ninety-nine',
      'B) Nineteen-nine',
      'C) Ninety-niney',
      'D) Nine-nine'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. Escreve-se "Ninety-nine", composto pela dezena "ninety" (90) mais a unidade "nine" (9) ligadas por hífen.'
  },
  {
    id: 6,
    enunciado: '“What time is it?” significa:',
    opcoes: [
      'A) Que dia é hoje?',
      'B) Que horas são?',
      'C) Qual é o seu nome?',
      'D) Onde você está?'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. "What time is it?" é a pergunta padrão em língua inglesa para saber o horário ("Que horas são?"). "Que dia é hoje?" seria "What day is today?".'
  },
  {
    id: 7,
    enunciado: 'Como dizer 7:00 em inglês?',
    opcoes: [
      'A) It\'s seven clock.',
      'B) It\'s seven o\'clock.',
      'C) It\'s seventh.',
      'D) It\'s seven time.'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. Para horas exatas redondas (sem minutos), usamos "o\'clock" com o apóstrofo: "It\'s seven o\'clock." (São sete horas).'
  },
  {
    id: 8,
    enunciado: 'Como dizer 8:30 em inglês?',
    opcoes: [
      'A) It\'s eight thirty.',
      'B) It\'s eight thirteen.',
      'C) It\'s thirty eight.',
      'D) It\'s eight o\'clock.'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. No formato digital/direto, lê-se primeiro a hora (eight = 8) e depois os minutos (thirty = 30): "It\'s eight thirty." Cuidado: thirteen é 13.'
  },
  {
    id: 9,
    enunciado: '“a.m.” é utilizado, normalmente, para indicar:',
    opcoes: [
      'A) Horários depois do meio-dia.',
      'B) Horários antes do meio-dia.',
      'C) Somente horários à noite.',
      'D) Somente meia-noite.'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. "a.m." vem do latim "ante meridiem" e significa "antes do meio-dia", cobrindo o período da meia-noite (00:00) até 11:59 da manhã.'
  },
  {
    id: 10,
    enunciado: '“It\'s nine forty-five” corresponde a:',
    opcoes: [
      'A) 9:15',
      'B) 9:30',
      'C) 9:45',
      'D) 10:45'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Nine" = 9 e "forty-five" = 45. Portanto, "It\'s nine forty-five" corresponde a 9:45.'
  },
  {
    id: 11,
    enunciado: '“Monday” significa:',
    opcoes: [
      'A) Terça-feira',
      'B) Segunda-feira',
      'C) Quarta-feira',
      'D) Domingo'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. "Monday" é a segunda-feira. Terça-feira é Tuesday, quarta-feira é Wednesday e domingo é Sunday.'
  },
  {
    id: 12,
    enunciado: '“Wednesday” significa:',
    opcoes: [
      'A) Segunda-feira',
      'B) Terça-feira',
      'C) Quarta-feira',
      'D) Quinta-feira'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Wednesday" é quarta-feira (pronuncia-se "uénz-dei", com o "d" mudo). Quinta-feira é Thursday.'
  },
  {
    id: 13,
    enunciado: 'Qual é o inglês para sexta-feira?',
    opcoes: [
      'A) Thursday',
      'B) Friday',
      'C) Saturday',
      'D) Sunday'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. Sexta-feira em inglês é "Friday" (como em "Black Friday" ou "Thank God it\'s Friday - TGIF").'
  },
  {
    id: 14,
    enunciado: '“Saturday” significa:',
    opcoes: [
      'A) Sexta-feira',
      'B) Domingo',
      'C) Sábado',
      'D) Segunda-feira'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Saturday" significa sábado. Sexta-feira é Friday e domingo é Sunday.'
  },
  {
    id: 15,
    enunciado: 'Qual é o último dia da semana na sequência apresentada na aula (Monday a Sunday)?',
    opcoes: [
      'A) Friday',
      'B) Saturday',
      'C) Sunday',
      'D) Monday'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. Na sequência apresentada na aula iniciando em Monday (segunda-feira), a semana se encerra em Sunday (domingo).'
  },
  {
    id: 16,
    enunciado: '“Today” significa:',
    opcoes: [
      'A) Amanhã',
      'B) Ontem',
      'C) Hoje',
      'D) Semana'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Today" significa hoje. Amanhã é "tomorrow", ontem é "yesterday" e semana é "week".'
  },
  {
    id: 17,
    enunciado: '“Tomorrow” significa:',
    opcoes: [
      'A) Hoje',
      'B) Amanhã',
      'C) Ontem',
      'D) Tarde'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. "Tomorrow" significa amanhã. Exemplo: "See you tomorrow!" (Vejo você amanhã!).'
  },
  {
    id: 18,
    enunciado: '“Yesterday” significa:',
    opcoes: [
      'A) Amanhã',
      'B) Hoje',
      'C) Ontem',
      'D) Noite'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. "Yesterday" significa ontem (famoso pela clássica canção dos Beatles).'
  },
  {
    id: 19,
    enunciado: '“Morning” significa:',
    opcoes: [
      'A) Manhã',
      'B) Tarde',
      'C) Noite',
      'D) Semana'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. "Morning" significa manhã. Daí a saudação "Good morning" (Bom dia / Boa manhã).'
  },
  {
    id: 20,
    enunciado: '“Day” significa:',
    opcoes: [
      'A) Hora',
      'B) Dia',
      'C) Mês',
      'D) Ano'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. "Day" significa dia. Hora é "hour", mês é "month" e ano é "year".'
  }
];

export const inglesTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: 'A palavra correspondente ao número 40 em inglês deve ser grafada como "Forty", sem a letra "u".',
    correta: true,
    explicacao: 'VERDADEIRO. Diferente de "four" (4) e "fourteen" (14), o número 40 em inglês perde a letra "u" e escreve-se "forty".'
  },
  {
    id: 2,
    enunciado: 'A expressão "o\'clock" pode ser utilizada tanto para horas exatas (ex: 7:00) quanto para horas com minutos (ex: 7:30).',
    correta: false,
    explicacao: 'FALSO. A expressão "o\'clock" é de uso restrito e exclusivo para horas inteiras/exatas (ex: It\'s seven o\'clock). Dizer "It\'s seven thirty o\'clock" é um erro gramatical.'
  },
  {
    id: 3,
    enunciado: 'O período compreendido entre 00:00 (meia-noite) e 11:59 da manhã é representado pela sigla "a.m." (ante meridiem).',
    correta: true,
    explicacao: 'VERDADEIRO. "a.m." refere-se a todos os horários antes do meio-dia. Das 12:00 às 23:59 utiliza-se "p.m.".'
  },
  {
    id: 4,
    enunciado: 'Em inglês, os nomes dos dias da semana (Monday, Tuesday, etc.) devem ser sempre grafados com inicial maiúscula.',
    correta: true,
    explicacao: 'VERDADEIRO. Diferente do português, na língua inglesa os dias da semana e os meses do ano sempre recebem inicial maiúscula obrigatória.'
  },
  {
    id: 5,
    enunciado: 'A palavra "Tomorrow" refere-se ao dia que já passou (ontem), enquanto "Yesterday" refere-se ao dia seguinte (amanhã).',
    correta: false,
    explicacao: 'FALSO. É exatamente o inverso: "Yesterday" é ontem (passado) e "Tomorrow" é amanhã (futuro).'
  }
];

export const inglesDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    titulo: '🎥 Exercício Prático Oral — Parte 1: Numbers (Números)',
    enunciado: 'Sem efetuar leitura de texto:\n1. Conte de 1 a 20 em inglês pausadamente.\n2. Pronuncie com clareza os números: 25, 40, 57, 80 e 99.',
    respostaEsperada: 'Roteiro de pronúncia esperada:\n1. One, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.\n2. Números compostos e dezenas: twenty-five (25), forty (40), fifty-seven (57), eighty (80), ninety-nine (99).',
    espelhoCorrecao: [
      'Contagem completa e correta de 1 até 20 sem hesitações excessivas',
      'Distinção clara entre sons de -teen e -ty (ex: fourteen vs forty)',
      'Pronúncia correta de forty (sem som de "u"), eighty e ninety-nine'
    ],
    pontosChave: [
      'Pronúncia correta de "twelve", "thirteen", "fifteen"',
      'Não confundir 14 com 40 nem 18 com 80',
      'Fluência na numeração sem interrupções'
    ]
  },
  {
    id: 2,
    titulo: '🕐 Exercício Prático Oral — Parte 2: Time (Horários)',
    enunciado: 'O professor ou responsável mostra os seguintes horários e o aluno fala em inglês:\n• 07:00\n• 08:30\n• 10:15\n• 12:00\n• 14:45\nEm seguida, responda à pergunta: "What time is it?" informando o horário atual.',
    respostaEsperada: 'Respostas em inglês:\n• 07:00 → It\'s seven o\'clock.\n• 08:30 → It\'s eight thirty.\n• 10:15 → It\'s ten fifteen.\n• 12:00 → It\'s twelve o\'clock (ou It\'s noon / It\'s midday).\n• 14:45 → It\'s two forty-five p.m. (ou It\'s fourteen forty-five).\nResposta ao "What time is it?": "It\'s [hora atual] o\'clock / [hora e minutos]."',
    espelhoCorrecao: [
      'Uso correto de "It\'s" no início de cada resposta de horário',
      'Emprego exclusivo de "o\'clock" apenas nas horas redondas (07:00, 12:00)',
      'Leitura fluida de minutos compostos (eight thirty, ten fifteen, two forty-five)'
    ],
    pontosChave: [
      'Estrutura: It\'s + hora + minutos',
      'Regra de o\'clock',
      'Compreensão da pergunta "What time is it?"'
    ]
  },
  {
    id: 3,
    titulo: '📅 Exercício Prático Oral — Parte 3: Days (Dias da Semana)',
    enunciado: '1. Fale os 7 dias da semana em inglês, em ordem sequencial de Monday a Sunday.\n2. Responda em voz alta:\n• What day is today?\n• What day is tomorrow?\n• What day was yesterday?',
    respostaEsperada: 'Respostas esperadas:\n1. Sequência: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.\n2. Perguntas temporais:\n• "Today is [dia de hoje, ex: Friday]."\n• "Tomorrow is [dia de amanhã, ex: Saturday]."\n• "Yesterday was [dia de ontem, ex: Thursday]."',
    espelhoCorrecao: [
      'Recitação sequencial completa dos 7 dias sem pular nenhum',
      'Pronúncia correta de Tuesday vs Thursday e Wednesday',
      'Uso adequado do verbo no presente (Today is / Tomorrow is) e no passado (Yesterday was)'
    ],
    pontosChave: [
      '7 dias na ordem correta',
      'Diferenciação temporal (Today / Tomorrow / Yesterday)',
      'Uso correto de is vs was'
    ]
  },
  {
    id: 4,
    titulo: '🎯 Desafio Final — Apresentação Pessoal Gravada em Vídeo',
    enunciado: 'Grave um vídeo para o professor apresentando oralmente o roteiro completo:\n“Hello! Today is [dia de hoje]. It is [horário] o\'clock. My favorite day is [dia favorito].”\nObjetivo: Praticar fala, pronúncia, memorização e compreensão do inglês com números, horas e dias da semana.',
    respostaEsperada: 'Exemplo de apresentação modelo no vídeo:\n"Hello! Today is Friday. It is eight o\'clock. My favorite day is Saturday. Nice to meet you!"\nVídeo gravado com postura confiante, boa dicção e enviado ao professor via WhatsApp.',
    espelhoCorrecao: [
      'Saudação calorosa e preenchimento correto dos três dados solicitados',
      'Concordância precisa entre o dia real e a hora informada',
      'Clareza e naturalidade na pronúncia das palavras em inglês'
    ],
    pontosChave: [
      'Gravação do vídeo com fala audível',
      'Estrutura: Hello! Today is... It is... o\'clock. My favorite day is...',
      'Envio do vídeo para o WhatsApp do professor'
    ]
  }
];

export const inglesSummaryPoints: string[] = [
  '🔢 Números 1 a 20: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.',
  '🔢 Dezenas e Centena: 30 (thirty), 40 (forty — sem "u"!), 50 (fifty), 60 (sixty), 70 (seventy), 80 (eighty), 90 (ninety), 100 (one hundred).',
  '🔢 Formação Numérica: Dezena + hífen + unidade (ex: 21 twenty-one, 35 thirty-five, 48 forty-eight, 99 ninety-nine).',
  '🕐 Horas: Pergunta padrão: "What time is it?" | Resposta: "It\'s..." | Horas exatas usam "o\'clock" (ex: It\'s 7:00 = It\'s seven o\'clock).',
  '🕐 Minutos e Siglas: Formato direto (8:30 = It\'s eight thirty). "a.m." = antes do meio-dia (00:00 às 11:59) | "p.m." = após o meio-dia (12:00 às 23:59).',
  '📅 Dias da Semana (sempre com maiúscula): Monday (segunda), Tuesday (terça), Wednesday (quarta), Thursday (quinta), Friday (sexta), Saturday (sábado), Sunday (domingo).',
  '📅 Expressões Temporais: Today (hoje), Tomorrow (amanhã), Yesterday (ontem), Day (dia), Week (semana), Morning (manhã).'
];
