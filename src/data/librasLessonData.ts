export interface FlashcardItem {
  id: number;
  q: string;
  a: string;
  frente?: string;
  verso?: string;
  categoria?: string;
  dica?: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  alternativas: string[];
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
  enunciado: string;
  respostaEsperada: string;
}

export const librasVideoInfo = {
  id: 'j6Ugm67dx8s',
  url: 'https://youtu.be/j6Ugm67dx8s?is=_LtHw0g9ekgfU7gN',
  embedUrl: 'https://www.youtube.com/embed/j6Ugm67dx8s?autoplay=0&rel=0',
  title: 'Vídeo Aula - LIBRAS: 3ª Aula de Hoje — Estrutura e Formação dos Sinais (Os 5 Parâmetros)',
  description: '3ª Aula de Hoje • Estrutura e Formação dos Sinais • Parâmetros (CM, PA, M, Or, ENM) • Exercícios no WhatsApp'
};

// 15 Flashcards focados 100% no conteúdo da 3ª Aula de Hoje
export const librasFlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'Quais são os 5 parâmetros fundamentais que formam os sinais na Libras?',
    a: '1️⃣ Configuração de mão (CM), 2️⃣ Ponto de articulação (PA), 3️⃣ Movimento (M), 4️⃣ Orientação da mão (Or) e 5️⃣ Expressões não manuais (ENM).'
  },
  {
    id: 2,
    q: 'O que é a Configuração de Mão (CM) na Libras?',
    a: 'É o FORMATO/desenho que a mão assume durante a execução do sinal (por exemplo: mão espalmada, mão em "A", em "L", em "V", etc.).'
  },
  {
    id: 3,
    q: 'O que é o Ponto de Articulação (PA) ou Locação?',
    a: 'É o LOCAL onde o sinal é realizado, como a cabeça, rosto, tronco, braço ou no espaço neutro (espaço em frente ao corpo do sinalizador).'
  },
  {
    id: 4,
    q: 'O que é o Movimento (M) na formação do sinal?',
    a: 'É a forma como a mão se desloca: pode ser para cima/baixo, para os lados, circular, retilíneo, helicoidal ou repetido.'
  },
  {
    id: 5,
    q: 'O que é a Orientação da Mão (Or) na Libras?',
    a: 'É a DIREÇÃO para onde a palma da mão ou as pontas dos dedos estão voltadas (para cima, para baixo, para a frente, para o próprio corpo ou para o lado).'
  },
  {
    id: 6,
    q: 'O que são as Expressões Não Manuais (ENM)?',
    a: 'São as expressões faciais, movimentos da cabeça e postura do tronco que acompanham o sinal, exercendo função gramatical e modificando o significado.'
  },
  {
    id: 7,
    q: 'Qual é a pegadinha clássica de concurso entre CM (Configuração) e Orientação (Or)?',
    a: 'Pegadinha FGV: Configuração é o FORMATO da mão; Orientação é a DIREÇÃO para onde a palma ou dedos apontam. Não confunda formato com direção!'
  },
  {
    id: 8,
    q: 'Na Libras, as expressões faciais são apenas expressões de emoções passageiras?',
    a: 'NÃO! Na Libras, as expressões não manuais exercem FUNÇÃO GRAMATICAL essencial, definindo tipos de frases (interrogativa, negativa, afirmativa) e intensidade.'
  },
  {
    id: 9,
    q: 'Por que não basta memorizar apenas o movimento de um sinal?',
    a: 'Porque os sinais dependem da combinação dos 5 elementos (Formato + Local + Movimento + Orientação + Expressão). A troca de um único parâmetro altera todo o significado.'
  },
  {
    id: 10,
    q: 'Como se diferenciam sinais semelhantes na Libras?',
    a: 'Pela análise minuciosa de todos os parâmetros. Dois sinais podem ter a mesma configuração de mão, mas se diferenciarem pelo ponto de articulação ou pela orientação.'
  },
  {
    id: 11,
    q: 'Libras é português sinalizado (representação do português com as mãos)?',
    a: 'NÃO! Libras ≠ português sinalizado. Libras é uma língua autônoma completa, com gramática, vocabulário, sintaxe e estrutura linguística própria.'
  },
  {
    id: 12,
    q: 'Qual é a fórmula/mnemônico para lembrar dos 5 parâmetros da Libras?',
    a: '🎯 CM + PA + M + Or + ENM (Configuração de mão, Ponto de articulação, Movimento, Orientação e Expressões Não Manuais).'
  },
  {
    id: 13,
    q: 'Dê um exemplo de como a Expressão Não Manual (ENM) exerce função gramatical.',
    a: 'Em perguntas: sobrancelhas franzidas ou levantadas com leve inclinação de cabeça transformam uma afirmação em oração interrogativa, sem precisar de palavra extra.'
  },
  {
    id: 14,
    q: 'O que acontece se um sinalizador errar a orientação da palma da mão?',
    a: 'O sinal pode ter seu significado totalmente alterado (por exemplo, transformar "AJUDAR-ME" em "AJUDAR-VOCÊ") ou tornar-se incompreensível.'
  },
  {
    id: 15,
    q: 'Qual o papel da Libras no atendimento ao cidadão pelo Assistente Judiciário do TJAM?',
    a: 'Garantir acessibilidade comunicacional plena à pessoa surda no balcão e audiências, respeitando sua identidade linguística conforme a Lei 10.436/2002.'
  }
];

// Pontos de Resumo da 3ª Aula de Libras
export const librasSummaryPoints: string[] = [
  'Os 5 Parâmetros da Libras: Sinais são formados pela união estruturada de CM (Configuração de Mão), PA (Ponto de Articulação), M (Movimento), Or (Orientação) e ENM (Expressões Não Manuais).',
  'Pegadinha FGV (CM vs. Orientação): Configuração é o FORMATO que a mão assume; Orientação é a DIREÇÃO para onde a palma ou os dedos apontam.',
  'Ponto de Articulação (PA): Local do corpo (cabeça, rosto, tronco, braço) ou no espaço neutro onde o sinal é produzido.',
  'Movimento (M): Deslocamento da mão no espaço (direção, trajetória, velocidade e frequência/repetição).',
  'Função Gramatical das ENM: Expressões faciais e corporais NÃO são meros sentimentos; integram a gramática formal da língua, marcando perguntas, negações e ênfases.',
  'Diferenciação de Sinais Semelhantes: A alteração de um único parâmetro é suficiente para produzir um sinal completamente diferente ou sem sentido.',
  'Libras é uma Língua Autônoma: Possui regras sintáticas e estrutura própria. Libras ≠ Português Sinalizado (que é uma tentativa artificial de falar português usando sinais).',
  'Exercícios da 3ª Aula: O professor postará as atividades práticas e listas de fixação diretamente no WhatsApp da turma.'
];

// Questões de fixação da aula (para consulta rápida enquanto aguardam os exercícios no WhatsApp)
export const librasMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. (FGV / TJAM - Conhecimentos Gerais) A respeito da formação dos sinais na Língua Brasileira de Sinais (Libras), assinale a alternativa que indica corretamente os seus 5 parâmetros constitutivos fundamentais:',
    alternativas: [
      'A) Alfabeto manual, soletração, tom de voz, ritmo e gestualidade.',
      'B) Configuração de mão (CM), Ponto de articulação (PA), Movimento (M), Orientação (Or) e Expressões não manuais (ENM).',
      'C) Português sinalizado, mímica, bimodalismo, datilologia e leitura orofacial.',
      'D) Fonologia oral, postura ereta, apontamento, concordância verbal e flexão de gênero.',
      'E) Configuração de mão, escrita de sinais, entonação vocal, velocidade e gesticulação livre.'
    ],
    correta: 1,
    explicacao: 'Gabarito B. Os 5 parâmetros que compõem os sinais da Libras são: Configuração de Mão (CM), Ponto de Articulação (PA), Movimento (M), Orientação (Or) e Expressões Não Manuais (ENM).'
  },
  {
    id: 2,
    enunciado: '2. (FGV / TJAM) Ao estudar a estrutura da Libras, o candidato deve estar atento a uma pegadinha clássica entre dois parâmetros: a Configuração de Mão e a Orientação. A distinção precisa entre ambos é:',
    alternativas: [
      'A) A Configuração de mão indica a direção da palma; a Orientação indica o formato dos dedos.',
      'B) A Configuração de mão refere-se ao local do corpo onde o sinal toca; a Orientação é o movimento circular da mão.',
      'C) A Configuração de mão é o formato que a mão assume; a Orientação indica para onde a palma ou dedos estão direcionados.',
      'D) A Orientação diz respeito à expressão facial; a Configuração de mão é o ritmo da fala.',
      'E) Não há diferença prática, sendo ambos termos sinônimos na linguística da Libras.'
    ],
    correta: 2,
    explicacao: 'Gabarito C. Configuração de Mão (CM) é o formato/desenho que a mão faz (ex: mão em "A" ou "V"). Orientação (Or) é a direção para a qual a palma da mão está voltada (para cima, baixo, frente, etc.).'
  },
  {
    id: 3,
    enunciado: '3. (FGV / TJAM) Sobre as Expressões Não Manuais (ENM) na Libras (expressões faciais e corporais), é correto afirmar que:',
    alternativas: [
      'A) São elementos secundários e dispensáveis, servindo apenas para demonstrar a dramaticidade do sinalizador.',
      'B) Exercem função gramatical fundamental na estrutura da Libras, determinando pontuações, tipos de frases (interrogação, negação) e intensidades.',
      'C) Substituem completamente o uso das mãos em qualquer tipo de comunicação formal.',
      'D) Devem ser evitadas em atendimentos formais no Poder Judiciário por serem consideradas informais.',
      'E) Só existem na datilologia e na soletração de nomes estrangeiros.'
    ],
    correta: 1,
    explicacao: 'Gabarito B. As expressões não manuais fazem parte da estrutura linguística e gramatical da Libras. Elas diferenciam orações interrogativas, afirmativas, negativas e marcam graus de intensidade.'
  },
  {
    id: 4,
    enunciado: '4. (FGV / TJAM) Analise a seguinte afirmativa: "A Libras nada mais é do que a tradução visual do Português, bastando sinalizar palavra por palavra na mesma ordem gramatical da língua portuguesa". Esta afirmativa é:',
    alternativas: [
      'A) Correta, pois toda língua de sinais deriva diretamente da língua oral oficial do país.',
      'B) Incorreta, pois a Libras é uma língua autônoma, com estrutura, vocabulário e regras gramaticais próprias; Libras não é português sinalizado.',
      'C) Correta apenas para os documentos e despachos do Poder Judiciário.',
      'D) Incorreta apenas porque a Libras não possui regras gramaticais definidas.',
      'E) Correta, pois o português sinalizado é a modalidade oficial prevista na Lei 10.436/2002.'
    ],
    correta: 1,
    explicacao: 'Gabarito B. A Libras é uma língua natural autônoma (reconhecida pela Lei nº 10.436/2002), possuindo gramática, morfologia e sintaxe próprias, sendo conceitualmente distinta do "português sinalizado".'
  },
  {
    id: 5,
    enunciado: '5. (FGV / TJAM) O que acontece na Libras se dois sinais possuem a mesma Configuração de Mão (CM), o mesmo Movimento (M) e a mesma Orientação (Or), mas são realizados em Pontos de Articulação (PA) distintos?',
    alternativas: [
      'A) Trata-se de um erro de sinalização obrigatório.',
      'B) O sinal permanece com o mesmo sentido exato, pois o local de realização é irrelevante.',
      'C) Eles constituem sinais diferentes com significados distintos, pois a mudança de um único parâmetro altera o sinal.',
      'D) O sinal obrigatoriamente se transforma em uma letra do alfabeto manual.',
      'E) A Libras exige que todas as palavras compartilhem o mesmo ponto de articulação.'
    ],
    correta: 2,
    explicacao: 'Gabarito C. Na Libras, a alteração de um único parâmetro (como o Ponto de Articulação) pode gerar um sinal inteiramente diferente com significado próprio (pares mínimos).'
  }
];

export const librasTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Os 5 parâmetros que compõem os sinais da Libras são: Configuração de Mão, Ponto de Articulação, Movimento, Orientação e Expressões Não Manuais.',
    correta: true,
    explicacao: 'Correto. A união simultânea ou sequencial desses 5 elementos forma a estrutura fonológica/morfológica dos sinais em Libras.'
  },
  {
    id: 2,
    enunciado: 'Na Libras, não há diferença entre Configuração de Mão e Orientação, sendo ambos os termos empregados para designar para onde a palma está voltada.',
    correta: false,
    explicacao: 'Incorreto (Pegadinha FGV). Configuração é o FORMATO da mão (como os dedos estão dispostos). Orientação é a DIREÇÃO para onde a palma ou dedos apontam.'
  },
  {
    id: 3,
    enunciado: 'As expressões faciais em Libras não têm valor gramatical, servindo apenas para expressar sentimentos pessoais do sinalizador.',
    correta: false,
    explicacao: 'Incorreto. As expressões não manuais possuem papel gramatical imprescindível, definindo tipos de sentenças (interrogação, negação, dúvida) e grau adverbial.'
  },
  {
    id: 4,
    enunciado: 'A Libras é considerada uma língua viva e autônoma, e não mero português sinalizado.',
    correta: true,
    explicacao: 'Correto. A Libras possui gramática, sintaxe espacial, níveis linguísticos próprios e autonomia total em relação ao Português.'
  }
];

export const librasDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Explique por que não basta memorizar apenas o movimento de um sinal na Libras e cite a fórmula mnemônica dos 5 parâmetros.',
    respostaEsperada: 'Não basta memorizar apenas o movimento porque os sinais são formados pela articulação conjunta dos 5 parâmetros: Formato da mão (CM) + Local de realização (PA) + Movimento (M) + Direção da palma (Or) + Expressões não manuais (ENM). A mudança de um único parâmetro altera todo o sentido do sinal. O mnemônico é: CM + PA + M + Or + ENM.'
  },
  {
    id: 2,
    enunciado: 'Diferencie Configuração de Mão de Orientação da Mão, alertando para a pegadinha cobrada em provas de concursos.',
    respostaEsperada: 'A Configuração de Mão (CM) é o formato/desenho físico que a mão assume (ex: punho fechado, mão aberta). A Orientação (Or) é a direção espacial para a qual a palma da mão ou a ponta dos dedos está apontada (para cima, para o chão, para o emissor, para o receptor). A pegadinha de prova consiste em confundir formato com direção.'
  }
];
