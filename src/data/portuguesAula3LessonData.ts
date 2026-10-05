// Data for Língua Portuguesa — Aula 03: Ortografia
// Nível Intermediário — TJAM Assistente Judiciário
// Bateria Oficial de Exercícios: Ortografia

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
  wordsToUse: string[];
  suggestedPhrases: string[];
}

// 10 Flashcards de Fixação Rápida — Aula 03: Ortografia
export const portuguesAula3FlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é a grafia correta da palavra "exceção" e por que ela cai tanto?',
    a: 'Grafia oficial: EXCEÇÃO (com XC e Ç). É uma das maiores pegadinhas de concurso, pois bancas costumam colocar formas erradas como "excessão" ou "exseção".'
  },
  {
    q: 'Qual é a grafia correta de "privilégio"?',
    a: 'Grafia oficial: PRIVILÉGIO (inicia com PRI- e acento agudo no E). Forma errada comum em provas: "previlégio" ❌.'
  },
  {
    q: 'Como se diferenciam os verbos parônimos "ratificar" e "retificar"?',
    a: '• Ratificar: significa CONFIRMAR, validar ("O tribunal ratificou a decisão anterior").\n• Retificar: significa CORRIGIR, emendar ("O servidor precisou retificar o documento que continha erro").'
  },
  {
    q: 'Qual é a diferença entre a tríade de homônimos "sessão", "seção" e "cessão"?',
    a: '• Sessão (com SS): reunião, audiência, período de tempo ("sessão de julgamento").\n• Seção/Secção (com Ç): repartição, departamento, divisão ("seção de documentos", "seção eleitoral").\n• Cessão (com C inicial e SS): ato de ceder ou transferir direitos ("cessão de servidor").'
  },
  {
    q: 'Qual é a regra para o uso de Ç (cê-cedilha)?',
    a: 'O "ç" só é utilizado antes das vogais A, O, U (informação, administração, organização, situação). NUNCA se usa ç antes de E ou I (usa-se C simples: paciente, cidade).'
  },
  {
    q: 'Por que não existe "proceço"?',
    a: 'A grafia correta é PROCESSO (com SS). Não se usa cedilha antes da letra E, e entre vogais usa-se SS para manter o som sibilante surdo /s/.'
  },
  {
    q: 'Qual a regra para os verbos derivados de palavras com S no radical?',
    a: 'Se a palavra primitiva possui S, seus derivados mantêm o S: pesquisa → pesquisar; análise → analisar; paralisia → paralisação (atenção: paralisar com S e paralisação com Ç).'
  },
  {
    q: 'Como diferenciar "viagem" e "viajem"?',
    a: '• Viagem (com G): substantivo ("A viagem foi tranquila").\n• Viajem (com J): verbo viajar no subjuntivo/imperativo ("Espero que eles viajem hoje").'
  },
  {
    q: 'O que o Acordo Ortográfico alterou quanto a "idéia" e "assembléia"?',
    a: 'Os ditongos abertos "ei" e "oi" em palavras paroxítonas perderam o acento gráfico. Grafia oficial vigente: ideia ✅ e assembleia ✅ (sem acento).'
  },
  {
    q: 'O que o Acordo Ortográfico alterou quanto à palavra "linguiça"?',
    a: 'O trema foi completamente abolido em palavras de língua portuguesa. Grafia oficial vigente: linguiça ✅ (sem trema).'
  }
];

// Pontos de Resumo da Aula 03
export const portuguesAula3SummaryPoints: string[] = [
  'Ortografia Oficial TJAM: Conjunto de regras que determina a escrita correta das palavras na norma-padrão da língua portuguesa.',
  'Emprego de Ç e C: O "ç" só aparece antes de A, O, U (administração, situação); antes de E e I emprega-se apenas C (paciente, cidade). Não existe "proceço" nem "proçesso", o correto é PROCESSO.',
  'Parônimos em Foco: Ratificar = confirmar/validar × Retificar = corrigir/emendar erro.',
  'Tríade Clássica: Sessão (reunião/julgamento) × Seção (divisão/repartição de documentos) × Cessão (ato de ceder). Ambas as frases "sessão de julgamento" e "seção de documentos" estão corretas.',
  'Radicais Primitivos com S: Análise → analisar; Pesquisa → pesquisar; Paralisia → paralisar e paralisação.',
  'G versus J: Viagem (substantivo com G) × Viajem (forma verbal do presente do subjuntivo com J).',
  'Acordo Ortográfico: Eliminação do trema em linguiça, cinquenta e tranquilo; e fim do acento em paroxítonas de ditongo aberto (ideia, assembleia).',
  'Palavras de Alta Frequência em Prova: Exceção (não excessão), privilégio (não previlégio), assessoria (dois SS), necessário (C e SS) e exercício (com X e acento).'
];

// 10 Questões Objetivas Oficiais (Parte 1: 1 a 10)
export const portuguesAula3McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Assinale a alternativa em que todas as palavras estão grafadas corretamente:',
    opcoes: [
      'A) excessão – privilégio – análise',
      'B) exceção – previlégio – análise',
      'C) exceção – privilégio – análise',
      'D) excessão – previlégio – análise',
      'E) exceção – privilégio – analize'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: As formas corretas segundo o Vocabulário Ortográfico da Língua Portuguesa (VOLP) são "exceção" (com xc e ç, não excessão), "privilégio" (com i na primeira sílaba, não previlégio) e "análise" (com s e acento agudo, não analize).'
  },
  {
    id: 2,
    enunciado: '2. Assinale a alternativa que apresenta uma palavra escrita incorretamente:',
    opcoes: [
      'A) necessário',
      'B) benefício',
      'C) assessoria',
      'D) discução',
      'E) exercício'
    ],
    correta: 3, // D
    explicacao: 'Gabarito D: A palavra "discução" está incorreta. A grafia correta na norma culta é DISCUSSÃO (com dígrafo SS entre vogais para representar o fonema /s/). As demais palavras (necessário, benefício, assessoria, exercício) estão impecáveis.'
  },
  {
    id: 3,
    enunciado: '3. Assinale a alternativa em que o emprego de Ç está correto:',
    opcoes: [
      'A) paçiente',
      'B) informaçao',
      'C) administração',
      'D) organizaçao',
      'E) proceço'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C: A palavra "administração" está perfeitamente grafada com Ç antes da vogal A e com til. Em A e E, o Ç é proibido antes da vogal E e da vogal I (o correto é "paciente" e "processo"); em B e D faltou o til de nasalização.'
  },
  {
    id: 4,
    enunciado: '4. Complete corretamente:\n\n"O servidor precisou ______ o documento porque havia um erro."',
    opcoes: [
      'A) ratificar',
      'B) retificar',
      'C) retifícar',
      'D) ratifícar',
      'E) retificarar'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: Como havia um erro no documento, a ação necessária era de correção. "Retificar" significa corrigir, emendar, consertar. Já "ratificar" significa confirmar ou validar.'
  },
  {
    id: 5,
    enunciado: '5. Complete corretamente:\n\n"O tribunal decidiu ______ a informação apresentada anteriormente."',
    opcoes: [
      'A) retificar',
      'B) ratificar',
      'C) retiffcar',
      'D) ratifficar',
      'E) ratificarar'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: O verbo adequado ao contexto de manter/validar a informação oficial já apresentada é "ratificar" (confirmar, validar, homologar o que foi dito).'
  },
  {
    id: 6,
    enunciado: '6. Assinale a alternativa em que todas as palavras estão corretas:',
    opcoes: [
      'A) pesquiza – analizar – paralização',
      'B) pesquisa – analisar – paralisação',
      'C) pesquisa – analizar – paralização',
      'D) pesquiza – analisar – paralisação',
      'E) pesquisa – análizar – paralisação'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B: "Pesquisa" grafado com S; "analisar" grafado com S (derivado de análise); e "paralisação" grafado com S no radical e Ç no sufixo de ação (derivado de paralisar).'
  },
  {
    id: 7,
    enunciado: '7. Assinale a alternativa correta quanto ao emprego das palavras:',
    opcoes: [
      'A) O servidor participou da seção de julgamento.',
      'B) O servidor participou da sessão de julgamento.',
      'C) O servidor participou da cessão de julgamento.',
      'D) O servidor participou da seção de documentos.',
      'E) As alternativas B e D estão corretas.'
    ],
    correta: 4, // E
    explicacao: 'Gabarito E: Ambas as alternativas B e D estão gramaticalmente perfeitas! Em B, "sessão" (com ss) refere-se ao período/reunião de julgamento colegiado. Em D, "seção" (com ç) refere-se à divisão, setor ou repartição administrativa de documentos.'
  },
  {
    id: 8,
    enunciado: '8. Assinale a alternativa em que a palavra está corretamente grafada segundo o Acordo Ortográfico:',
    opcoes: [
      'A) idéia',
      'B) assembléia',
      'C) lingüiça',
      'D) ideia',
      'E) vôo'
    ],
    correta: 3, // D
    explicacao: 'Gabarito D: Com o Acordo Ortográfico vigente, "ideia" perdeu o acento agudo no ditongo aberto paroxítono (assim como assembleia e plateia). O trema em "linguiça" foi extinto, e "vôo" perdeu o acento circunflexo (escreve-se voo).'
  },
  {
    id: 9,
    enunciado: '9. Assinale a alternativa em que há erro ortográfico:',
    opcoes: [
      'A) existência',
      'B) próximo',
      'C) exercício',
      'D) excessão',
      'E) expediente'
    ],
    correta: 3, // D
    explicacao: 'Gabarito D: A palavra "excessão" apresenta erro ortográfico. A grafia correta na norma culta é EXCEÇÃO (com xc e ç).'
  },
  {
    id: 10,
    enunciado: '10. Assinale a alternativa em que todas as palavras estão corretamente grafadas:',
    opcoes: [
      'A) viagem – viajem – justiça',
      'B) viajem – viagem – justiça',
      'C) viagem – viagem – justissa',
      'D) viajem – viajem – justiça',
      'E) viagem – viajem – justisa'
    ],
    correta: 0, // A
    explicacao: 'Gabarito A: Todas as palavras existem e estão perfeitamente grafadas: "viagem" (substantivo com G), "viajem" (verbo no subjuntivo com J) e "justiça" (com J e Ç).'
  }
];

// 5 Questões Certo ou Errado Oficiais (Parte 2: 11 a 15) — Estilo Cebraspe
export const portuguesAula3TfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A palavra “exceção” está corretamente grafada.',
    statement: 'A palavra "exceção" está corretamente grafada segundo o vocabulário oficial.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: "Exceção" é grafada com as letras XC na primeira sílaba e Ç na última. A forma "excessão" é um erro comum em provas.'
  },
  {
    id: 12,
    enunciado: '12. As palavras “ratificar” e “retificar” possuem o mesmo significado.',
    statement: 'Os termos parônimos "ratificar" e "retificar" são sinônimos perfeitos.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: São vocábulos parônimos com significados distintos e opostos no direito: ratificar significa confirmar/validar; retificar significa corrigir/emendar um erro.'
  },
  {
    id: 13,
    enunciado: '13. “Sessão”, “seção” e “cessão” possuem significados diferentes.',
    statement: 'As palavras homônimas "sessão", "seção" e "cessão" possuem valores semânticos distintos.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: São palavras homófonas com sentidos diferentes: sessão = reunião/tempo; seção = repartição/divisão; cessão = ato de ceder ou transferir posse/direitos.'
  },
  {
    id: 14,
    enunciado: '14. A forma “idéia” permanece como a grafia oficial após o Acordo Ortográfico.',
    statement: 'A grafia com acento agudo "idéia" continua válida na norma oficial vigente.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: O Acordo Ortográfico aboliu o acento gráfico nos ditongos abertos "ei" e "oi" de palavras paroxítonas. A grafia oficial hoje é "ideia" (sem acento).'
  },
  {
    id: 15,
    enunciado: '15. A palavra “assessoria” está corretamente grafada com ss.',
    statement: 'A palavra "assessoria" emprega corretamente o dígrafo SS em sua estrutura.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: A palavra "assessoria" é grafada com dígrafo SS tanto na primeira posição (as-ses-) quanto na terminação (-soria).'
  }
];

// 5 Questões Dissertativas Oficiais (Parte 3: 16 a 20) com Espelho Oficial TJAM
export const portuguesAula3DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique a diferença entre ratificar e retificar e apresente um exemplo de cada.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• Ratificar: Significa confirmar, validar, comprovar ou manter o que foi anteriormente afirmado ou decidido. Exemplo: "O tribunal decidiu ratificar a decisão proferida pelo juiz substituto."\n• Retificar: Significa corrigir, emendar, alterar ou consertar um equívoco ou erro material. Exemplo: "O servidor precisou retificar a certidão porque havia um erro na data de nascimento da parte."'
  },
  {
    id: 17,
    enunciado: '17. Explique a diferença entre sessão, seção e cessão.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• Sessão (com SS): Designa o intervalo de tempo de uma reunião, deliberação, assembleia ou julgamento de um órgão colegiado (ex.: "O servidor participou da sessão de julgamento da 1ª Câmara Cível").\n• Seção ou Secção (com Ç): Designa a divisão, repartição, departamento ou setor de uma estrutura administrativa (ex.: "O expediente foi protocolado na seção de documentos").\n• Cessão (com C inicial e SS): Designa o ato jurídico de ceder, doar, alienar ou transferir a titularidade de direitos, bens ou pessoal (ex.: "O tribunal autorizou a cessão de servidores para a Justiça Eleitoral").'
  },
  {
    id: 18,
    enunciado: '18. Por que palavras como “exceção”, “privilégio” e “necessário” podem ser consideradas importantes para provas de concurso?',
    respostaEsperada: 'Gabarito Oficial TJAM:\nEssas palavras são consideradas de alta relevância porque representam clássicas armadilhas ortográficas (pegadinhas de prova). Na linguagem cotidiana e fonética, os candidatos frequentemente confundem as grafias por interferência do som, escrevendo incorretamente "excessão" (em vez de exceção, que leva xc e ç), "previlégio" (em vez de privilégio, com i na primeira sílaba) e "nescessário" (em vez de necessário, grafado com c simples inicial e dígrafo ss medial). As bancas utilizam esses vocábulos para testar o domínio rigoroso da norma-padrão pelo futuro servidor público judiciário.'
  },
  {
    id: 19,
    enunciado: '19. Explique uma mudança provocada pelo Acordo Ortográfico e apresente um exemplo.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nUma das mudanças mais emblemáticas foi a perda do acento gráfico nos ditongos abertos "ei" e "oi" nas palavras paroxítonas (aquelas cuja sílaba tônica é a penúltima). Antes do Acordo, grafava-se "idéia", "assembléia", "platéia" e "heróico"; com a vigência do Acordo Ortográfico, essas palavras passaram a ser grafadas sem acento: ideia, assembleia, plateia e heroico. (Outra mudança válida como exemplo é a eliminação total do trema em palavras portuguesas, como em "linguiça" e "cinquenta").'
  },
  {
    id: 20,
    enunciado: '20. Escreva um pequeno parágrafo, de 4 a 5 linhas, sobre o trabalho de um servidor público. Utilize corretamente pelo menos cinco palavras estudadas nesta aula.',
    respostaEsperada: 'Gabarito Oficial TJAM (Modelo de Redação Padrão):\n"No exercício diário de suas funções na administração do Tribunal de Justiça, o servidor atua com extremo zelo na assessoria ao magistrado, sem abrir espaço para qualquer privilégio indevido. Durante a sessão de julgamento, é necessário manter total atenção aos autos para retificar eventuais erros materiais antes da publicação da ata, garantindo a eficiência do serviço prestado à sociedade."\n\n(Palavras utilizadas: assessoria, privilégio, sessão, necessário, retificar, administração, exercício).'
  }
];

// Atividade Prática Oficial para Envio pelo WhatsApp
export const portuguesAula3PracticalTask: PracticalTaskConfig = {
  scenario: 'Prática de Fixação — Escreva 5 frases, cada uma utilizando corretamente uma das palavras-chave da aula (exceção, privilégio, ratificar, retificar e sessão), e envie para o professor pelo WhatsApp.',
  instruction: 'Escreva 5 frases, cada uma utilizando corretamente uma das palavras abaixo: exceção, privilégio, ratificar, retificar, sessão. Depois, revise suas frases procurando possíveis erros ortográficos e envie pelo WhatsApp com seu nome, turma e identificação da Aula 03.',
  wordsToUse: ['exceção', 'privilégio', 'ratificar', 'retificar', 'sessão'],
  suggestedPhrases: [
    '1. Exceção: "A concessão da liminar sem audiência prévia constitui uma exceção à regra geral do contraditório."',
    '2. Privilégio: "O servidor público deve pautar sua conduta na impessoalidade, sem conceder privilégio a qualquer cidadão."',
    '3. Ratificar: "O desembargador relator decidiu ratificar integralmente os termos da decisão colegiada."',
    '4. Retificar: "O assistente judiciário precisou retificar o termo de audiência para corrigir o nome da testemunha."',
    '5. Sessão: "Os desembargadores iniciaram a sessão plenária pontualmente às 9 horas no plenário do tribunal."'
  ]
};
