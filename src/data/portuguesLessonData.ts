// Data for Língua Portuguesa — Aula 3: Classes de Palavras (Substantivo, Adjetivo e Verbo)

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
    q: 'O que é um Substantivo e qual a sua função principal na oração?',
    a: 'Substantivo é a classe de palavras variável que nomeia seres em geral, pessoas, lugares, objetos, ações, sentimentos, qualidades e estados (Ex.: servidor, tribunal, Amazonas, justiça, estudo, responsabilidade).'
  },
  {
    q: 'O que é um Adjetivo e como ele se relaciona com o substantivo?',
    a: 'Adjetivo é a classe de palavras que caracteriza, qualifica, restringe ou atribui uma propriedade ou estado ao substantivo, concordando com ele em gênero e número (Ex.: servidor público, decisão judicial, prova difícil).'
  },
  {
    q: 'O que é um Verbo e quais noções fundamentais ele expressa?',
    a: 'Verbo é a palavra que indica principalmente ação (estudar, analisar), estado (ser, estar, permanecer) ou fenômeno da natureza (chover, ventar), situando o fato no tempo.'
  },
  {
    q: 'Como diferenciar Substantivo de Adjetivo no contexto da frase?',
    a: 'Depende da função na oração: se o termo nomeia o ser, funciona como substantivo ("O jovem estudou para a prova"); se o termo caracteriza outro nome, funciona como adjetivo ("O candidato jovem estudou para a prova").'
  },
  {
    q: 'O que é uma Locução Adjetiva e como convertê-la em adjetivo?',
    a: 'É uma expressão formada por preposição + substantivo (ou pronome) que possui valor e função de adjetivo. Exemplos: decisão de juiz → decisão judicial; amor de mãe → amor materno; dia de chuva → dia chuvoso; turno de noite → turno noturno.'
  },
  {
    q: 'Quais são as flexões nominais (substantivo/adjetivo) e verbais?',
    a: '• Substantivos e Adjetivos flexionam-se em Gênero (masculino/feminino) e Número (singular/plural), além de grau.\n• Verbos flexionam-se em Tempo (presente, pretérito, futuro), Modo (indicativo, subjuntivo, imperativo), Número (singular/plural) e Pessoa (1ª, 2ª, 3ª).'
  },
  {
    q: 'O que é substantivação (derivação imprópria)?',
    a: 'É o processo pelo qual uma palavra de outra classe gramatical (como um verbo ou adjetivo) passa a funcionar como substantivo ao ser antecedida por determinante, como artigo ("O andar do réu revelava pressa" / "O verde da floresta").'
  }
];

export const portuguesAula3McQuestionsData: McQuestionItem[] = [
  {
    id: 101,
    enunciado: '1. Assinale a opção em que todos os vocábulos sublinhados pertencem à classe dos SUBSTANTIVOS:',
    textoApoio: 'O servidor público do tribunal amazonense analisou a petição com grande responsabilidade.',
    opcoes: [
      'A) servidor – tribunal – responsabilidade',
      'B) público – amazonense – analisou',
      'C) grande – petição – servidor',
      'D) tribunal – analisou – grande'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Servidor", "tribunal" e "responsabilidade" são substantivos, pois nomeiam pessoas, instituições e conceitos/qualidades abstratas. "Público" e "amazonense" são adjetivos; "analisou" é verbo; "grande" é adjetivo.'
  },
  {
    id: 102,
    enunciado: '2. No segmento "O assistente judiciário elaborou uma decisão exemplar", os termos "assistente", "judiciário" e "exemplar" classificam-se, respectivamente, como:',
    opcoes: [
      'A) adjetivo – substantivo – substantivo',
      'B) substantivo – adjetivo – adjetivo',
      'C) substantivo – verbo – adjetivo',
      'D) adjetivo – adjetivo – verbo'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Assistente" atua como substantivo (o agente que executa a função), "judiciário" atua como adjetivo (especifica o tipo de assistente) e "exemplar" atua como adjetivo (qualifica a "decisão").'
  },
  {
    id: 103,
    enunciado: '3. Em qual das frases a seguir o verbo destacado expressa ideia de ESTADO (e não de ação ou fenômeno da natureza)?',
    opcoes: [
      'A) O magistrado redigiu a sentença ontem à noite.',
      'B) Choveu intensamente sobre a cidade de Manaus.',
      'C) O réu permaneceu calmo durante toda a audiência de custódia.',
      'D) Os analistas protocolaram os recursos tempestivamente.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: "Permaneceu" é um verbo de ligação que exprime o estado do sujeito ("o réu") durante a audiência. "Redigiu" e "protocolaram" indicam ação; "choveu" indica fenômeno natural.'
  },
  {
    id: 104,
    enunciado: '4. Considere as frases:\nI. "O jovem foi aprovado no concurso do TJAM."\nII. "O candidato jovem foi aprovado no concurso do TJAM."\nEm relação à palavra "jovem", é correto afirmar que:',
    opcoes: [
      'A) Em I e II, funciona como adjetivo.',
      'B) Em I e II, funciona como substantivo.',
      'C) Em I, funciona como substantivo; em II, funciona como adjetivo.',
      'D) Em I, funciona como adjetivo; em II, funciona como substantivo.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Em I, "o jovem" é o núcleo do sujeito determinado pelo artigo, funcionando como substantivo. Em II, "jovem" é o adjetivo que caracteriza o substantivo "candidato".'
  },
  {
    id: 105,
    enunciado: '5. Assinale a alternativa que apresenta a correspondência INCORRETA entre a locução adjetiva e o seu respectivo adjetivo erudito/equivalente:',
    opcoes: [
      'A) Decisão de juiz ➔ Decisão judicial',
      'B) Amor de mãe ➔ Amor materno',
      'C) Turno da noite ➔ Turno noturno',
      'D) Água de chuva ➔ Água fluvial'
    ],
    correta: 3,
    explicacao: 'Gabarito D: Água de chuva corresponde a "pluvial" (de chuva). "Fluvial" refere-se à água de rio.'
  },
  {
    id: 106,
    enunciado: '6. Na frase "O olhar firme do juiz transmitiu segurança a todos os presentes", o vocábulo "olhar" classifica-se gramaticalmente como:',
    opcoes: [
      'A) Verbo no infinitivo impessoal com função de predicado.',
      'B) Substantivo, resultante de derivação imprópria (substantivação pelo artigo "O").',
      'C) Adjetivo explicativo do termo "juiz".',
      'D) Advérbio de modo indicando a intensidade da visão.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Olhar", originalmente verbo, passa a funcionar como substantivo ao ser determinado pelo artigo "O" e qualificado pelo adjetivo "firme" (processo de substantivação/derivação imprópria).'
  },
  {
    id: 107,
    enunciado: '7. Assinale a opção em que o termo destacado exerce a função de ADJETIVO:',
    opcoes: [
      'A) A justiça célere é uma exigência constitucional da sociedade.',
      'B) O estudo constante transforma o futuro do candidato.',
      'C) A responsabilidade norteia os atos do servidor.',
      'D) O tribunal publicou as novas diretrizes regimentais.'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Célere" qualifica o substantivo "justiça", funcionando como adjetivo. Nas demais opções, "estudo", "responsabilidade" e "tribunal" são substantivos.'
  },
  {
    id: 108,
    enunciado: '8. Identifique a frase em que o verbo destacado se encontra flexionado no MODO SUBJUNTIVO (expressando hipótese, desejo ou incerteza):',
    opcoes: [
      'A) Os novos servidores tomaram posse na sede do tribunal.',
      'B) Se o candidato estudasse diariamente, dominaria todas as matérias.',
      'C) O presidente assinou o decreto de nomeação ontem.',
      'D) Estudem com planejamento e foco para a aprovação!'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Estudasse" está no Pretérito Imperfeito do Subjuntivo, indicando condição/hipótese. Em A e C, temos o modo indicativo; em D, o modo imperativo.'
  },
  {
    id: 109,
    enunciado: '9. Assinale a alternativa em que a palavra destacada NÃO pertence à classe dos substantivos abstratos (aqueles que designam ações, estados, qualidades ou sentimentos que dependem de outro ser para existir):',
    opcoes: [
      'A) A celeridade processual é meta do TJAM.',
      'B) A coragem dos membros do júri garantiu o julgamento imparcial.',
      'C) O plenário do Tribunal de Justiça reuniu os desembargadores.',
      'D) A dedicação dos servidores resulta em eficiência administrativa.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: "Plenário" é um substantivo concreto (designa o espaço físico/lugar institucional autônomo). "Celeridade" (qualidade), "coragem" (sentimento/atitude) e "dedicação" (ação/comportamento) são substantivos abstratos.'
  },
  {
    id: 110,
    enunciado: '10. Em "Os candidatos realizaram uma prova de alto nível", a expressão "de alto nível" atua como:',
    opcoes: [
      'A) Locução adverbial de tempo.',
      'B) Locução adjetiva qualificadora do substantivo "prova".',
      'C) Locução verbal de ação contínua.',
      'D) Conjunção subordinativa causal.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "De alto nível" é uma locução adjetiva que caracteriza o substantivo "prova" (prova qualificada / excelente).'
  },
  {
    id: 111,
    enunciado: '11. Observe o trecho: "O servidor atento conferiu os prazos processuais". As palavras "atento" e "processuais" concordam com seus respectivos substantivos em:',
    opcoes: [
      'A) Gênero, número e grau estritamente comparativo.',
      'B) Gênero e número (concordância nominal).',
      'C) Tempo e modo (concordância verbal).',
      'D) Pessoa e voz passiva sintética.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: Substantivos e adjetivos flexionam-se e concordam em Gênero (masculino/feminino) e Número (singular/plural) — regra da concordância nominal.'
  },
  {
    id: 112,
    enunciado: '12. Assinale a alternativa que apresenta apenas verbos que indicam AÇÃO:',
    opcoes: [
      'A) Trabalhar, protocolar, redigir, analisar.',
      'B) Ser, estar, parecer, permanecer.',
      'C) Chover, nevar, trovejar, relampejar.',
      'D) Ficar, continuar, andar (triste), tornar-se.'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Trabalhar", "protocolar", "redigir" e "analisar" expressam ações humanas concretas e deliberadas. B e D trazem verbos de ligação/estado; C traz fenômenos da natureza.'
  },
  {
    id: 113,
    enunciado: '13. No período "O sábio magistrado ouviu atentamente o depoimento do réu", a palavra "sábio" exerce a função de:',
    opcoes: [
      'A) Substantivo núcleo do sujeito.',
      'B) Adjetivo que caracteriza o substantivo "magistrado".',
      'C) Advérbio de intensidade.',
      'D) Pronome demonstrativo de posse.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: O substantivo núcleo do sujeito é "magistrado"; "sábio" é o adjetivo anteposto que atribui uma qualidade a esse magistrado.'
  },
  {
    id: 114,
    enunciado: '14. Qual das alternativas apresenta um verbo flexionado no MODO IMPERATIVO (expressando ordem, pedido ou instrução)?',
    opcoes: [
      'A) Nós revisamos todo o conteúdo programático.',
      'B) Organize seu cronograma de estudos com antecedência!',
      'C) Quando você chegar ao tribunal, entregue os autos.',
      'D) Eles gostariam de obter a nomeação imediata.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Organize" está flexionado no Imperativo Afirmativo (você), indicando comando/orientação direta.'
  },
  {
    id: 115,
    enunciado: '15. Na frase "O documento apresenta uma rasura visível na assinatura do perito", os substantivos presentes são:',
    opcoes: [
      'A) documento – rasura – assinatura – perito',
      'B) apresenta – visível – na – do',
      'C) documento – apresenta – perito',
      'D) rasura – visível – assinatura'
    ],
    correta: 0,
    explicacao: 'Gabarito A: "Documento", "rasura", "assinatura" e "perito" são os substantivos que nomeiam os elementos da frase. "Apresenta" é verbo e "visível" é adjetivo.'
  },
  {
    id: 116,
    enunciado: '16. A substituição da locução adjetiva destacada em "atitude de coragem" pelo adjetivo correspondente resulta em:',
    opcoes: [
      'A) Atitude corajosa',
      'B) Atitude corajosamente',
      'C) Atitude com coragem',
      'D) Atitude encorajada'
    ],
    correta: 0,
    explicacao: 'Gabarito A: O adjetivo correspondente à locução "de coragem" é "corajosa" (concordando em gênero feminino com o substantivo "atitude").'
  },
  {
    id: 117,
    enunciado: '17. Em "Os servidores públicos demonstraram grande eficiência no atendimento", a forma verbal "demonstraram" expressa uma flexão de:',
    opcoes: [
      'A) 1ª pessoa do singular no presente do indicativo.',
      'B) 3ª pessoa do plural no pretérito perfeito do indicativo.',
      'C) 2ª pessoa do plural no pretérito imperfeito do subjuntivo.',
      'D) 3ª pessoa do singular no futuro do presente.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: "Eles demonstraram" é a 3ª pessoa do plural do Pretérito Perfeito do Indicativo (fato concluído no passado).'
  },
  {
    id: 118,
    enunciado: '18. Assinale a alternativa em que a palavra "cego" é empregada como SUBSTANTIVO:',
    opcoes: [
      'A) O homem cego atravessou a avenida com o cão-guia.',
      'B) O cego foi atendido com prioridade no balcão do tribunal.',
      'C) A paixão cega impede o julgamento imparcial dos fatos.',
      'D) Uma confiança cega pode gerar graves prejuízos.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: Em "O cego foi atendido...", o vocábulo é precedido de artigo e funciona como núcleo do sujeito, ou seja, substantivo. Nas demais, funciona como adjetivo qualificando "homem", "paixão" e "confiança".'
  },
  {
    id: 119,
    enunciado: '19. No contexto forense, a locução adjetiva "sem validade" equivale adequadamente ao adjetivo:',
    opcoes: [
      'A) Válido',
      'B) Nulo / Inválido',
      'C) Tempestivo',
      'D) Interlocutório'
    ],
    correta: 1,
    explicacao: 'Gabarito B: O que não possui validade jurídica é "inválido" ou "nulo".'
  },
  {
    id: 120,
    enunciado: '20. A regra de ouro da Língua Portuguesa para provas de concurso sobre classes de palavras estabelece que:',
    opcoes: [
      'A) Toda palavra pertence rigidamente a uma única classe gramatical e jamais muda.',
      'B) A classe gramatical de uma palavra deve ser identificada pela função que ela exerce no contexto específico da frase.',
      'C) Os adjetivos nunca flexionam em gênero e número.',
      'D) Os verbos só podem expressar ações humanas, nunca estados.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: As palavras ganham sentido e classe gramatical a partir do contexto sintático e semântico em que estão inseridas na oração.'
  }
];

export const portuguesAula3TfQuestionsData: TfQuestionItem[] = [
  {
    id: 201,
    enunciado: '1. O substantivo é a classe de palavras responsável por nomear seres, objetos, lugares, sentimentos e ações.',
    statement: 'O substantivo é a classe de palavras responsável por nomear seres, objetos, lugares, sentimentos e ações.',
    correta: true,
    isTrue: true,
    explicacao: 'Verdadeiro. Essa é a definição nuclear do substantivo na morfologia da língua portuguesa.'
  },
  {
    id: 202,
    enunciado: '2. Em "O jovem candidato foi empossado", a palavra "jovem" atua como substantivo núcleo do sujeito.',
    statement: 'Em "O jovem candidato foi empossado", a palavra "jovem" atua como substantivo núcleo do sujeito.',
    correta: false,
    isTrue: false,
    explicacao: 'Falso. O núcleo do sujeito é "candidato" (substantivo). O termo "jovem" está adjetivando o candidato.'
  },
  {
    id: 203,
    enunciado: '3. A locução adjetiva "decisão de juiz" possui como adjetivo correspondente "decisão judicial".',
    statement: 'A locução adjetiva "decisão de juiz" possui como adjetivo correspondente "decisão judicial".',
    correta: true,
    isTrue: true,
    explicacao: 'Verdadeiro. "De juiz" equivale perfeitamente ao adjetivo "judicial".'
  },
  {
    id: 204,
    enunciado: '4. Os verbos flexionam-se apenas em gênero e número, assim como os substantivos.',
    statement: 'Os verbos flexionam-se apenas em gênero e número, assim como os substantivos.',
    correta: false,
    isTrue: false,
    explicacao: 'Falso. Verbos flexionam-se em Tempo (presente, pretérito, futuro), Modo (indicativo, subjuntivo, imperativo), Número (singular/plural), Pessoa (1ª, 2ª, 3ª) e Voz (ativa, passiva, reflexiva).'
  },
  {
    id: 205,
    enunciado: '5. A derivação imprópria (ou substantivação) ocorre quando uma palavra de outra classe é empregada como substantivo, como em "O jantar foi servido" ou "O saber liberta".',
    statement: 'A derivação imprópria (ou substantivação) ocorre quando uma palavra de outra classe é empregada como substantivo, como em "O jantar foi servido" ou "O saber liberta".',
    correta: true,
    isTrue: true,
    explicacao: 'Verdadeiro. O emprego com artigo ou determinante converte o vocábulo funcionalmente em substantivo.'
  }
];

export const portuguesAula3DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 301,
    enunciado: '1. Explique como o contexto da oração determina se uma palavra pertence à classe dos substantivos ou dos adjetivos, exemplificando com o vocábulo "velho".',
    respostaEsperada: 'Padrão de Resposta TJAM/FGV: A classe morfológica de uma palavra é determinada por sua função sintático-semântica no contexto da oração. Quando a palavra nomeia um ser e atua como núcleo de um termo oracional (geralmente acompanhada de artigo ou pronome), funciona como SUBSTANTIVO (Exemplo: "O velho caminhava tranquilamente pela praça"). Quando a palavra atribui uma característica, qualidade ou propriedade a outro ser, funciona como ADJETIVO (Exemplo: "O livro velho foi doado à biblioteca").'
  },
  {
    id: 302,
    enunciado: '2. Defina locução adjetiva, apresente sua estrutura típica e transforme as três locuções a seguir em seus adjetivos equivalentes: a) dia de chuva; b) amor de mãe; c) decisão de juiz.',
    respostaEsperada: 'Padrão de Resposta TJAM/FGV: Locução adjetiva é a expressão formada tipicamente pela junção de uma preposição + substantivo (ou pronome) que exerce o mesmo valor semântico e papel sintático de um adjetivo, caracterizando um nome. Equivalências solicitadas: a) dia de chuva ➔ dia pluvial (ou chuvoso); b) amor de mãe ➔ amor materno; c) decisão de juiz ➔ decisão judicial.'
  }
];

export const portuguesAula3SummaryPoints = [
  {
    title: 'Substantivo',
    desc: 'Palavra variável que dá nome a tudo o que existe ou imaginamos: seres, pessoas, lugares, objetos, ações, sentimentos e estados (Ex.: servidor, tribunal, Amazonas, justiça, estudo, responsabilidade).'
  },
  {
    title: 'Adjetivo',
    desc: 'Palavra variável que atribui característica, qualidade, propriedade ou estado ao substantivo, concordando com ele em gênero e número (Ex.: servidor público, decisão judicial, prova difícil).'
  },
  {
    title: 'Verbo',
    desc: 'Palavra que indica fundamentalmente ação (analisar, estudar), estado (ser, estar, permanecer) ou fenômeno da natureza (chover, ventar), flexionando-se em tempo, modo, número e pessoa.'
  },
  {
    title: 'Substantivo x Adjetivo no Contexto',
    desc: 'O contexto oracional define a classe: "O jovem estudou" (substantivo) x "O candidato jovem estudou" (adjetivo). Ao receber artigo, qualquer palavra pode ser substantivada.'
  },
  {
    title: 'Locuções Adjetivas & Flexões',
    desc: 'Expressões com valor de adjetivo (preposição + substantivo): de juiz = judicial; de mãe = materno; de noite = noturno. Substantivos/adjetivos flexionam em gênero e número; verbos em tempo, modo e pessoa.'
  }
];
