// Data for Língua Portuguesa — Aula: Conjunções e Conectivos (TJAM 2026)

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  textoApoio?: string;
  opcoes: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D
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

export const portuguesAula3FlashcardsData: FlashcardItem[] = [
  {
    q: 'O que são conjunções e qual é o seu papel?',
    a: 'São palavras invariáveis que ligam orações ou termos de mesma função sintática, estabelecendo entre eles relações semânticas (sentido) como soma, oposição, causa, condição, tempo, finalidade, etc.'
  },
  {
    q: 'Quais são as 5 Conjunções Coordenativas?',
    a: '• Aditivas: soma (e, nem, mas também, bem como)\n• Adversativas: oposição/contraste (mas, porém, contudo, todavia, entretanto, no entanto)\n• Alternativas: alternância/exclusão (ou, ou...ou, ora...ora, quer...quer)\n• Conclusivas: dedução/desfecho (portanto, logo, por isso, assim, destarte)\n• Explicativas: justificativa (porque, pois antes do verbo, que)'
  },
  {
    q: 'Qual é a diferença entre Conjunção Adversativa e Concessiva?',
    a: 'Ambas envolvem quebra de expectativa ou contraste, mas:\n• Adversativa (coordenativa): introduz oração coordenada independente (mas, porém, contudo).\n• Concessiva (subordinativa): introduz oração subordinada que cede a uma oposição sem impedir o fato da oração principal (embora, ainda que, mesmo que, conquanto).'
  },
  {
    q: 'Como diferenciar "porque" Causal de "porque" Explicativo?',
    a: '• Causal (subordinativa): exprime o motivo/causa real do fato ("Faltou à aula porque estava doente" — a doença causou a falta).\n• Explicativo (coordenativa): justifica uma ordem, súplica ou conclusão do falante, geralmente precedido de imperativo ("Estude, porque a prova está próxima!").'
  },
  {
    q: 'Quais são as principais Conjunções Subordinativas?',
    a: 'Causais (porque, já que, visto que), Concessivas (embora, ainda que), Condicionais (se, caso, contanto que), Consecutivas (tanto... que, tão... que), Finais (para que, a fim de que), Temporais (quando, enquanto, assim que), Comparativas (como, assim como, mais... que), Proporcionais (à medida que) e Conformativas (conforme, segundo).'
  },
  {
    q: 'O que a banca FGV / TJAM costuma cobrar sobre conectivos?',
    a: 'A banca avalia a identificação do valor semântico no contexto e a substituição por outro conectivo equivalente sem alteração de sentido (ex.: substituir "embora" por "conquanto", ou "contudo" por "todavia"). Não basta decorar a palavra isolada.'
  },
  {
    q: 'Qual é a regra da conjunção "pois" (explicativa vs conclusiva)?',
    a: '• "Pois" antes do verbo: Explicativo ("Não saia, pois vai chover").\n• "Pois" posposto ao verbo (entre vírgulas): Conclusivo ("Estudou com afinco; merece, pois, a aprovação").'
  },
  {
    q: 'Por que "mas também" é aditiva e não adversativa?',
    a: 'Porque compõe uma locução correlativa de adição ("não só... mas também", "não apenas... como também"), somando dois predicados em vez de opô-los.'
  }
];

export const portuguesAula3McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Na frase “Estudou bastante e conseguiu uma boa nota”, a conjunção destacada indica:',
    textoApoio: 'Estudou bastante [e] conseguiu uma boa nota.',
    opcoes: [
      'A) Oposição',
      'B) Adição',
      'C) Conclusão',
      'D) Condição'
    ],
    correta: 1,
    explicacao: 'Gabarito B: A conjunção coordenativa "e" estabelece aqui uma relação de adição (soma de duas ações realizadas pelo mesmo sujeito: estudar bastante + conseguir boa nota).'
  },
  {
    id: 2,
    enunciado: '2. Em “Queria sair, mas precisava estudar”, a palavra “mas” estabelece ideia de:',
    textoApoio: 'Queria sair, [mas] precisava estudar.',
    opcoes: [
      'A) Causa',
      'B) Finalidade',
      'C) Oposição',
      'D) Explicação'
    ],
    correta: 2,
    explicacao: 'Gabarito C: "Mas" é a principal conjunção coordenativa adversativa, introduzindo contraste, oposição ou quebra de expectativa entre o desejo de sair e a obrigação de estudar.'
  },
  {
    id: 3,
    enunciado: '3. “Estude bastante, porque a prova será difícil.” A conjunção destacada apresenta ideia de:',
    textoApoio: 'Estude bastante, [porque] a prova será difícil.',
    opcoes: [
      'A) Explicação',
      'B) Alternância',
      'C) Conclusão',
      'D) Comparação'
    ],
    correta: 0,
    explicacao: 'Gabarito A: O verbo da oração anterior está no modo imperativo ("Estude"), de modo que a oração iniciada por "porque" funciona como justificativa/explicação do comando dado.'
  },
  {
    id: 4,
    enunciado: '4. Em “Se estudar, terá mais chances de aprovação”, “se” indica:',
    textoApoio: '[Se] estudar, terá mais chances de aprovação.',
    opcoes: [
      'A) Causa',
      'B) Condição',
      'C) Conclusão',
      'D) Concessão'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Se" é uma conjunção subordinativa condicional, estabelecendo o requisito/condição necessária para que ocorra o fato da oração principal (ter chances de aprovação).'
  },
  {
    id: 5,
    enunciado: '5. “Estava cansado, porém continuou estudando.” A palavra “porém” indica:',
    textoApoio: 'Estava cansado, [porém] continuou estudando.',
    opcoes: [
      'A) Adição',
      'B) Causa',
      'C) Oposição',
      'D) Finalidade'
    ],
    correta: 2,
    explicacao: 'Gabarito C: "Porém" é conjunção coordenativa adversativa, indicando oposição/ressalva ao fato de estar cansado.'
  },
  {
    id: 6,
    enunciado: '6. Em “Estudou muito, portanto foi aprovado”, “portanto” expressa:',
    textoApoio: 'Estudou muito, [portanto] foi aprovado.',
    opcoes: [
      'A) Conclusão',
      'B) Condição',
      'C) Tempo',
      'D) Explicação'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Portanto" é conjunção coordenativa conclusiva, deduzindo o resultado lógico decorrente do estudo dedicado.'
  },
  {
    id: 7,
    enunciado: '7. “Embora estivesse cansado, continuou estudando.” A conjunção “embora” expressa:',
    textoApoio: '[Embora] estivesse cansado, continuou estudando.',
    opcoes: [
      'A) Causa',
      'B) Concessão',
      'C) Finalidade',
      'D) Alternância'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Embora" é conjunção subordinativa concessiva, indicando uma ideia de contraste que não impede a realização da oração principal.'
  },
  {
    id: 8,
    enunciado: '8. Em “Estudou para que pudesse ser aprovado”, a expressão destacada indica:',
    textoApoio: 'Estudou [para que] pudesse ser aprovado.',
    opcoes: [
      'A) Consequência',
      'B) Finalidade',
      'C) Oposição',
      'D) Tempo'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Para que" é uma locução conjuntiva subordinativa final, introduzindo o objetivo/finalidade da ação de estudar.'
  },
  {
    id: 9,
    enunciado: '9. “Quando terminar a aula, faremos os exercícios.” A conjunção indica:',
    textoApoio: '[Quando] terminar a aula, faremos os exercícios.',
    opcoes: [
      'A) Tempo',
      'B) Causa',
      'C) Condição',
      'D) Conclusão'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Quando" é conjunção subordinativa temporal, situando cronologicamente o momento em que os exercícios serão realizados.'
  },
  {
    id: 10,
    enunciado: '10. Em “Ou você estuda, ou terá dificuldades”, há ideia de:',
    textoApoio: '[Ou] você estuda, [ou] terá dificuldades.',
    opcoes: [
      'A) Explicação',
      'B) Alternância',
      'C) Concessão',
      'D) Causa'
    ],
    correta: 1,
    explicacao: 'Gabarito B: O par correlativo "ou... ou" expressa alternância/escolha exclusiva entre duas situações.'
  },
  {
    id: 11,
    enunciado: '11. “Faltou à aula porque estava doente.” Nesse contexto, “porque” indica:',
    textoApoio: 'Faltou à aula [porque] estava doente.',
    opcoes: [
      'A) Explicação',
      'B) Causa',
      'C) Conclusão',
      'D) Finalidade'
    ],
    correta: 1,
    explicacao: 'Gabarito B: A doença foi a causa factual e anterior que gerou a falta. Trata-se de oração subordinada adverbial causal.'
  },
  {
    id: 12,
    enunciado: '12. “Estudou tanto que conseguiu excelente resultado.” A expressão indica:',
    textoApoio: 'Estudou [tanto que] conseguiu excelente resultado.',
    opcoes: [
      'A) Consequência',
      'B) Condição',
      'C) Oposição',
      'D) Comparação'
    ],
    correta: 0,
    explicacao: 'Gabarito A: A estrutura "tanto... que" exprime consequência (o efeito decorrente da intensidade do estudo).'
  },
  {
    id: 13,
    enunciado: '13. “Caso precise de ajuda, procure o professor.” A palavra “caso” indica:',
    textoApoio: '[Caso] precise de ajuda, procure o professor.',
    opcoes: [
      'A) Tempo',
      'B) Condição',
      'C) Adição',
      'D) Conclusão'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Caso" é conjunção subordinativa condicional (equivalente a "se precisar de ajuda"), exigindo verbo no subjuntivo.'
  },
  {
    id: 14,
    enunciado: '14. “Ele estuda como o irmão.” A palavra “como” estabelece ideia de:',
    textoApoio: 'Ele estuda [como] o irmão.',
    opcoes: [
      'A) Comparação',
      'B) Causa',
      'C) Finalidade',
      'D) Concessão'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Como" atua aqui como conjunção subordinativa comparativa, confrontando o modo ou a intensidade de estudo com a do irmão.'
  },
  {
    id: 15,
    enunciado: '15. “Não apenas estudou, mas também resolveu exercícios.” A expressão destacada indica:',
    textoApoio: 'Não apenas estudou, [mas também] resolveu exercícios.',
    opcoes: [
      'A) Oposição',
      'B) Adição',
      'C) Condição',
      'D) Consequência'
    ],
    correta: 1,
    explicacao: 'Gabarito B: A locução correlativa "não apenas... mas também" soma ações (estudar + resolver exercícios), caracterizando adição enfática.'
  },
  {
    id: 16,
    enunciado: '16. Assinale a alternativa em que a conjunção apresenta ideia de conclusão:',
    opcoes: [
      'A) Estudou, mas não fez a prova.',
      'B) Estudou, porque queria passar.',
      'C) Estudou, portanto estava preparado.',
      'D) Embora cansado, estudou.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Em "C", a conjunção "portanto" indica conclusão. Na A temos oposição (mas); na B, causa (porque); na D, concessão (embora).'
  },
  {
    id: 17,
    enunciado: '17. Em “Já que você estudou, pode realizar os exercícios”, a expressão “já que” indica:',
    textoApoio: '[Já que] você estudou, pode realizar os exercícios.',
    opcoes: [
      'A) Causa',
      'B) Alternância',
      'C) Oposição',
      'D) Finalidade'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Já que" é locução conjuntiva causal, indicando o motivo ou razão justificadora pela qual o aluno pode fazer os exercícios.'
  },
  {
    id: 18,
    enunciado: '18. Assinale a alternativa em que há uma conjunção temporal:',
    opcoes: [
      'A) Enquanto estudava, fez anotações.',
      'B) Estudou, porém não revisou.',
      'C) Estudou para que fosse aprovado.',
      'D) Se estudar, melhorará.'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Enquanto" expressa simultaneidade temporal. Em B temos oposição (porém); em C, finalidade (para que); em D, condição (se).'
  },
  {
    id: 19,
    enunciado: '19. Em “Mesmo que esteja cansado, continuará estudando”, a expressão “mesmo que” indica:',
    textoApoio: '[Mesmo que] esteja cansado, continuará estudando.',
    opcoes: [
      'A) Concessão',
      'B) Causa',
      'C) Conclusão',
      'D) Adição'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Mesmo que" é locução conjuntiva subordinativa concessiva (admite um obstáculo que não anula o fato principal).'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa correta sobre conjunções e conectivos:',
    opcoes: [
      'A) A mesma palavra sempre terá o mesmo sentido, independentemente do contexto.',
      'B) As conjunções servem apenas para ligar palavras.',
      'C) É necessário analisar o contexto para identificar o sentido do conectivo.',
      'D) “Mas” sempre indica causa.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: As conjunções são conectivos relacionais polissêmicos. O mesmo conectivo (como "porque", "como", "e") pode assumir valores semânticos distintos conforme o contexto da oração.'
  }
];

export const portuguesAula3TfQuestionsData: TfQuestionItem[] = [
  {
    id: 201,
    enunciado: '1. A conjunção "mas" sempre introduz uma oração coordenada adversativa, expressando oposição ou quebra de expectativa.',
    correta: true,
    explicacao: 'Verdadeiro. "Mas" é a adversativa por excelência, ligando orações coordenadas e marcando contraste ou ressalva.'
  },
  {
    id: 202,
    enunciado: '2. Em orações introduzidas pelo conectivo "porque", basta memorizar a palavra para saber se o valor é de causa ou de explicação, sem necessidade de analisar o contexto.',
    correta: false,
    explicacao: 'Falso. O conectivo "porque" é polissêmico: pode ter valor causal (quando exprime a causa factual do evento) ou explicativo (quando justifica uma ordem ou hipótese).'
  },
  {
    id: 203,
    enunciado: '3. A locução "para que" possui valor de consequência, indicando o resultado inevitável da oração anterior.',
    correta: false,
    explicacao: 'Falso. "Para que" (e "a fim de que") são locuções conjuntivas subordinativas finais, que indicam intenção, objetivo ou finalidade.'
  },
  {
    id: 204,
    enunciado: '4. As conjunções concessivas (como "embora" e "ainda que") indicam uma quebra de expectativa ou contraste que, todavia, não impede a realização do fato expresso na oração principal.',
    correta: true,
    explicacao: 'Verdadeiro. A concessão é justamente o ato de ceder a um fato adverso sem que este seja forte o suficiente para anular o acontecimento da oração principal.'
  },
  {
    id: 205,
    enunciado: '5. A expressão "mas também", quando combinada com "não apenas" ou "não só", funciona como conectivo aditivo de soma e não como adversativo de oposição.',
    correta: true,
    explicacao: 'Verdadeiro. Trata-se de uma correlação aditiva enfática que soma duas características ou atos.'
  },
  {
    id: 206,
    enunciado: '6. Na frase "Estudou tanto que gabaritou a prova", a conjunção "que" precedida do intensificador "tanto" expressa relação semântica de causa.',
    correta: false,
    explicacao: 'Falso. A correlação "tanto... que", "tão... que" ou "tal... que" expressa relação de consequência (o resultado da intensidade do estudo).'
  }
];

export const portuguesAula3DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 301,
    enunciado: '1. Explique a diferença semântica e sintática entre uma conjunção Coordenativa Adversativa (ex: mas, contudo) e uma conjunção Subordinativa Concessiva (ex: embora, conquanto).',
    respostaEsperada: 'Ambas indicam contraste ou quebra de expectativa, porém: a Adversativa liga orações coordenadas independentes, com o peso argumentativo recaindo sobre a segunda oração; já a Concessiva liga uma oração dependente (subordinada) que admite um obstáculo, preservando a oração principal como foco assertivo principal e exigindo o verbo no modo subjuntivo.'
  },
  {
    id: 302,
    enunciado: '2. Demonstre como a conjunção "porque" pode funcionar ora como causal, ora como explicativa, fornecendo um exemplo de cada e o respectivo critério de distinção.',
    respostaEsperada: 'Causal: "Não veio ao fórum porque choveu torrencialmente" (a chuva é a causa física real e anterior da ausência). Explicativa: "Venha rápido, porque a sessão já vai começar" (a segunda oração justifica o imperativo "venha", servindo como argumento/explicação do falante).'
  }
];

export const portuguesAula3SummaryPoints = [
  'Conjunções são conectivos invariáveis que ligam palavras ou orações, gerando sentido de soma, oposição, causa, condição, tempo, finalidade, etc.',
  'Conjunções Coordenativas (5 tipos): Aditivas (e, nem, mas também), Adversativas (mas, porém, contudo, todavia), Alternativas (ou...ou), Conclusivas (portanto, logo), Explicativas (porque, que).',
  'Conjunções Subordinativas Adverbiais principais: Temporais (quando, enquanto), Causais (porque, já que), Finais (para que), Consecutivas (tanto que), Condicionais (se, caso), Concessivas (embora, ainda que), Comparativas (como).',
  'Pegadinha Clássica de Prova: A mesma palavra (ex: "porque", "como", "e") adquire sentidos distintos no contexto. Nunca decore a palavra de forma isolada.',
  'Dica FGV TJAM: A banca adora pedir a substituição de uma conjunção por outra sem alteração de sentido (ex.: substituir "conquanto" por "embora", ou "destarte" por "portanto").',
  'Correlação Aditiva: "Não só... mas também" e "não apenas... como também" exercem papel de soma, nunca de oposição.',
  'Concessão x Adversidade: Concessão aceita o obstáculo sem anular a ação principal (com verbo no subjuntivo); Adversidade impõe ressalva categórica.'
];
