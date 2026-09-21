// Data for Língua Portuguesa — Aula 01: Compreensão e Interpretação de Textos
// Nível: Intermediário — TJAM Assistente Judiciário (Estilo FGV e Cebraspe)

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

export const TEXTO_APOIO_PORTUGUES_01 = `A tecnologia modificou a maneira como os cidadãos acessam os serviços públicos. Atualmente, diversos procedimentos podem ser realizados por meios digitais, reduzindo deslocamentos e facilitando o acesso a determinadas informações. Entretanto, a modernização dos serviços não elimina a necessidade de atendimento presencial. Diferenças econômicas, sociais e tecnológicas fazem com que parte da população ainda encontre dificuldades para utilizar ferramentas digitais. Dessa forma, ampliar os canais de atendimento significa não apenas investir em tecnologia, mas também garantir que diferentes cidadãos tenham condições de acessar os serviços oferecidos pelo Estado.`;

// 10 Flashcards de Fixação Rápida
export const portuguesAula1FlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é a diferença fundamental entre Compreensão e Interpretação de texto?',
    a: '• Compreensão (intelecção): busca o que está explícito, visível e registrado no texto ("segundo o autor", "o texto afirma que").\n• Interpretação (inferência): busca deduções e conclusões lógicas autorizadas pelas pistas do texto ("depreende-se", "infere-se", "conclui-se").'
  },
  {
    q: 'O que caracteriza o erro de Extrapolação na banca FGV?',
    a: 'Ocorre quando o candidato escolhe uma alternativa com ideias que vão além do texto, baseando-se em seus próprios conhecimentos de mundo ou opiniões pessoais que não encontram respaldo no texto apresentado.'
  },
  {
    q: 'O que caracteriza o erro de Redução (ou Limitação)?',
    a: 'Ocorre quando a alternativa restringe o sentido geral do texto a apenas um detalhe secundário ou aspecto isolado, ignorando a ideia central ou a tese principal defendida pelo autor.'
  },
  {
    q: 'O que caracteriza o erro de Contradição?',
    a: 'Ocorre quando a assertiva afirma exatamente o oposto ou uma ideia incompatível com o que o autor defendeu ao longo do texto.'
  },
  {
    q: 'Como diferenciar Tema de Ideia Principal?',
    a: '• Tema: é o assunto global e genérico sobre o qual o texto versa (ex.: inclusão digital nos serviços públicos).\n• Ideia Principal (Tese): é a afirmação central ou ponto de vista predominante que o autor defende a respeito desse tema (ex.: a digitalização deve coexistir com o atendimento presencial para garantir o acesso de todos).'
  },
  {
    q: 'O que são Informações Explícitas versus Implícitas?',
    a: '• Explícitas: apresentadas de maneira clara, literal e direta na superfície do texto.\n• Implícitas: ideias não ditas abertamente, mas que podem ser resgatadas por pistas gramaticais (pressupostos) ou pelo contexto situacional (subentendidos).'
  },
  {
    q: 'O que é um Pressuposto textual e como identificá-lo?',
    a: 'É uma ideia implícita ancorada em marcas linguísticas objetivas (verbos que indicam mudança ou permanência como "deixar de", "continuar"; advérbios como "ainda", "já"; adjetivos valorativos). Ex.: "João ainda estuda" pressupõe que ele já estudava antes.'
  },
  {
    q: 'O que é um Subentendido?',
    a: 'É uma insinuação que depende da interpretação do leitor no contexto da comunicação, sem uma marca gramatical taxativa. Permite ao emissor negar a intenção caso seja confrontado.'
  },
  {
    q: 'No texto de apoio da Aula 01, qual conectivo introduz a quebra de expectativa sobre a tecnologia?',
    a: 'A conjunção adversativa "Entretanto" ("Entretanto, a modernização dos serviços não elimina a necessidade de atendimento presencial"), estabelecendo contraponto entre o avanço digital e a indispensabilidade do atendimento físico.'
  },
  {
    q: 'Qual é o papel da locução "Dessa forma" no fechamento do texto de apoio?',
    a: 'Funciona como conectivo conclusivo, articulando as premissas anteriores (avanço digital + exclusão de parte da população) para introduzir a tese final: ampliar canais exige tecnologia somada à garantia de atendimento acessível presencial.'
  }
];

// 10 Questões de Múltipla Escolha (Objetivas) Estilo FGV / Cebraspe
export const portuguesAula1McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. (FGV / TJAM — Adaptada) A partir da leitura do texto de apoio, depreende-se como ideia central que:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) A modernização digital dos serviços públicos tornou o atendimento presencial completamente dispensável.',
      'B) A ampliação dos canais de atendimento público exige conciliar o investimento tecnológico com a manutenção do acesso presencial para garantir a inclusão de todos os cidadãos.',
      'C) As ferramentas digitais devem ser restritas aos setores da população que comprovadamente dominam a tecnologia da informação.',
      'D) O custo do atendimento presencial inviabiliza que o Estado adote ferramentas digitais modernas nos tribunais.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: A ideia central sintetiza a tese exposta: a tecnologia traz benefícios, mas as disparidades sociais exigem que o Estado garanta tanto o avanço digital quanto o atendimento presencial, promovendo a cidadania integral. A alternativa A é contradição direta; C e D são extrapolações sem respaldo textual.'
  },
  {
    id: 2,
    enunciado: '2. (FGV — Interpretação) No trecho "Entretanto, a modernização dos serviços não elimina a necessidade de atendimento presencial", o conectivo "Entretanto" tem a função de:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) Introduzir uma relação de causa e consequência em relação aos meios digitais.',
      'B) Expressar conformidade com a tese de eliminação das agências físicas de atendimento.',
      'C) Estabelecer uma ressalva/oposição em relação às facilidades geradas pela tecnologia antes descritas.',
      'D) Apresentar a conclusão definitiva de que o investimento digital é ineficaz.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: "Entretanto" é uma conjunção coordenativa adversativa. Sua função semântica é introduzir uma ressalva importante: embora a tecnologia reduza deslocamentos e facilite rotinas, ela não exclui a necessidade do atendimento físico.'
  },
  {
    id: 3,
    enunciado: '3. (FGV / TJAM) Assinale a opção que apresenta uma informação explicitamente confirmada pelas linhas do texto:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) A totalidade da população brasileira já possui smartphone com conexão de alta velocidade.',
      'B) Diversos procedimentos já podem ser efetuados por meios digitais, reduzindo a necessidade de deslocamentos físicos.',
      'C) O atendimento presencial nos órgãos públicos será extinto no prazo improrrogável de cinco anos.',
      'D) Os servidores públicos demonstraram resistência à implantação das plataformas digitais de atendimento.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: Trata-se de uma questão de pura compreensão (informação explícita). O segundo período afirma textualmente: "Atualmente, diversos procedimentos podem ser realizados por meios digitais, reduzindo deslocamentos e facilitando o acesso a determinadas informações". Todas as demais alternativas são extrapolações.'
  },
  {
    id: 4,
    enunciado: '4. (Cebraspe / TJAM) No segmento "Diferenças econômicas, sociais e tecnológicas fazem com que parte da população ainda encontre dificuldades para utilizar ferramentas digitais", o vocábulo "ainda" atua como pressuposto de que:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) A dificuldade dos cidadãos é um fenômeno inédito surgido exclusivamente no presente ano.',
      'B) O problema de acesso digital já vinha ocorrendo no passado e persiste até o momento atual.',
      'C) Em breve será proibido aos cidadãos vulneráveis utilizar o balcão presencial.',
      'D) Apenas cidadãos com curso superior conseguem usufruir dos serviços públicos estatais.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: O advérbio "ainda" é um clássico marcador de pressuposição temporal/aspectual. Ele sinaliza a continuidade de um estado que já existia anteriormente (a exclusão ou barreira digital já existia e permanece ocorrendo).'
  },
  {
    id: 5,
    enunciado: '5. (FGV — Erros Clássicos) Um candidato marcou como correta a seguinte opção: "O governo deve doar computadores e pagar a conta de luz de todas as famílias carentes para que acessem o TJAM". Sob a ótica da interpretação de texto, esse candidato incorreu no erro de:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) Redução.',
      'B) Extrapolação.',
      'C) Contradição.',
      'D) Fidedignidade textual.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: Erro de extrapolação. O texto menciona que diferenças econômicas geram dificuldades, mas em nenhum momento propõe, detalha ou autoriza a doação de computadores ou pagamento de energia elétrica. O candidato inseriu informações de sua própria imaginação/conhecimento de mundo.'
  },
  {
    id: 6,
    enunciado: '6. (FGV / TJAM) Em "ampliar os canais de atendimento significa não apenas investir em tecnologia, mas também garantir que diferentes cidadãos tenham condições de acessar os serviços", a estrutura correlativa "não apenas... mas também" estabelece valor de:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) Adição enfática de requisitos para a eficácia do serviço público.',
      'B) Alternância excludente entre tecnologia e presença física.',
      'C) Causa hipotética desprovida de consequência prática.',
      'D) Proporcionalidade regressiva entre investimento e atendimento.'
    ],
    correta: 0,
    explicacao: 'Gabarito A: As locuções correlativas aditivas ("não apenas... mas também", "não só... como também") somam duas exigências essenciais: o investimento tecnológico DEVE SOMAR-SE à garantia de acesso de todos os cidadãos.'
  },
  {
    id: 7,
    enunciado: '7. (Cebraspe) Infere-se das informações do texto que a universalização da cidadania no acesso aos serviços públicos estatais:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) Depende exclusivamente do fechamento dos prédios físicos para economia orçamentária.',
      'B) É incompatível com qualquer forma de inovação tecnológica no Poder Judiciário.',
      'C) Exige que a administração pública considere as assimetrias socioeconômicas existentes entre os usuários.',
      'D) Já foi plenamente atingida em todas as comarcas do interior do Estado do Amazonas.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: Trata-se de inferência legítima autorizada pelo texto: como "diferenças econômicas, sociais e tecnológicas fazem com que parte da população ainda encontre dificuldades", o Estado tem o dever de considerar tais assimetrias para garantir o acesso equânime.'
  },
  {
    id: 8,
    enunciado: '8. (FGV / TJAM) A substituição da conjunção "Entretanto" pela locução conjuntiva "No entanto" provocaria:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) Grave incorreção gramatical e alteração no sentido do período.',
      'B) Mudança do valor de oposição para uma relação estritamente causal.',
      'C) Manutenção da correção gramatical e do sentido adversativo original.',
      'D) Incompatibilidade com o modo verbal empregado na oração subordinada.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: As conjunções coordenativas adversativas "mas", "porém", "contudo", "todavia", "entretanto", "no entanto" são equivalentes semânticos no contexto, mantendo o sentido de ressalva e a correção gramatical da norma-padrão.'
  },
  {
    id: 9,
    enunciado: '9. (FGV) O texto pode ser classificado predominantemente quanto à sua tipologia textual como:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) Narrativo, pois descreve as ações sucessivas de um personagem no espaço de atendimento.',
      'B) Dissertativo-argumentativo, pois discute um tema contemporâneo e sustenta um posicionamento sobre a política de atendimento público.',
      'C) Descritivo puro, pois lista as características visuais e físicas de um terminal de computador.',
      'D) Injuntivo, pois prescreve comandos imperativos obrigatórios ao cidadão comum.'
    ],
    correta: 1,
    explicacao: 'Gabarito B: O texto analisa criticamente os impactos e limites da modernização digital, expondo argumentos e concluindo com uma proposição tese sobre como o Estado deve estruturar o atendimento (dissertação argumentativa).'
  },
  {
    id: 10,
    enunciado: '10. (Cebraspe / TJAM) Caso o autor tivesse escrito "A tecnologia resolveu todos os problemas de acesso à justiça no Brasil", essa afirmação representaria, perante o texto original:',
    textoApoio: TEXTO_APOIO_PORTUGUES_01,
    opcoes: [
      'A) Uma paráfrase perfeita do segundo período.',
      'B) Um erro de redução semântica.',
      'C) Um erro manifesto de contradição.',
      'D) Uma dedução implícita coerente.'
    ],
    correta: 2,
    explicacao: 'Gabarito C: O texto original deixa explícito que a tecnologia NÃO elimina a necessidade de atendimento presencial e que parte da população AINDA tem dificuldades devido a desigualdades. Dizer que resolveu todos os problemas contradiz frontalmente a mensagem do texto.'
  }
];

// 5 Questões de Verdadeiro ou Falso (11 a 15) Estilo Cebraspe
export const portuguesAula1TfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. (Cebraspe / TJAM) No comando de uma questão de concurso público, expressões como "O autor afirma que..." e "De acordo com o primeiro parágrafo..." solicitam do candidato uma atividade de compreensão textual (intelecção literal), e não de interpretação inferencial.',
    statement: 'Comandos que citam explicitamente o autor ou o texto exigem localização de dados objetivos.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: Enunciados como "Segundo o texto", "O texto informa que" ou "O autor declara que" vinculam-se estritamente à compreensão das informações manifestas na superfície do texto, ao contrário de verbos como "depreende-se" ou "infere-se".'
  },
  {
    id: 12,
    enunciado: '12. (Cebraspe / TJAM) De acordo com o texto de apoio, o investimento em tecnologia nos órgãos estatais dispensa a manutenção de equipes de atendimento presencial em comarcas com vulnerabilidade socioeconômica.',
    statement: 'A modernização digital dispensa os postos presenciais nas regiões vulneráveis.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: O texto defende exatamente o oposto: a modernização "não elimina a necessidade de atendimento presencial", sobretudo porque diferenças econômicas, sociais e tecnológicas dificultam o acesso digital de parte expressiva dos cidadãos.'
  },
  {
    id: 13,
    enunciado: '13. (Cebraspe / TJAM) O erro de extrapolação ocorre quando a alternativa selecionada pelo candidato contradiz de forma ostensiva uma afirmação expressa pelo autor do texto.',
    statement: 'Extrapolação é o erro que afirma o contrário do texto.',
    correta: false,
    isTrue: false,
    explicacao: 'ERRADO: Afirmar o contrário do que o texto diz é o erro de CONTRADIÇÃO. A extrapolação consiste em acrescentar informações, causas ou consequências não autorizadas pelo texto, ainda que possam ser verossímeis na vida real.'
  },
  {
    id: 14,
    enunciado: '14. (Cebraspe / TJAM) A expressão "Dessa forma", que inicia o último período do texto de apoio, estabelece coesão sequencial de natureza conclusiva, amarrando os argumentos antecedentes à tese final do autor.',
    statement: 'Dessa forma possui valor semântico conclusivo/sintético no texto.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: "Dessa forma", "Assim", "Portanto" e "Por conseguinte" atuam como conectores conclusivos, arrematando o raciocínio dedutivo construído ao longo do parágrafo.'
  },
  {
    id: 15,
    enunciado: '15. (Cebraspe / TJAM) Na interpretação de textos para o TJAM, a presença de termos restritivos ou generalizantes nas alternativas (como "sempre", "nunca", "todos", "unicamente", "jamais") frequentemente sinaliza alternativas incorretas por vício de extrapolação ou redução.',
    statement: 'Generalizações extremadas em questões de interpretação costumam evidenciar assertivas viciadas.',
    correta: true,
    isTrue: true,
    explicacao: 'CERTO: Examinadores de bancas renomadas (FGV, Cebraspe) constroem alternativas falsas transformando ideias relativas e ponderadas do texto em generalizações absolutas ou restrições indevidas.'
  }
];

// 5 Questões Dissertativas / Discursivas (16 a 20) com Espelho de Resposta
export const portuguesAula1DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. (Discursiva TJAM) Diferencie, com clareza e precisão terminológica, a Compreensão Textual da Interpretação Textual, citando os comandos de enunciado típicos de cada modalidade em provas de concurso.',
    respostaEsperada: 'Padrão de Resposta Esperado:\n1. Compreensão Textual (Intelecção): Consiste na decodificação e entendimento daquilo que está explícito e manifesto na superfície textual. A resposta encontra-se nas linhas do texto, de forma literal ou por paráfrase. Comandos típicos: "Segundo o texto...", "O autor afirma que...", "Conforme o 2º parágrafo...".\n2. Interpretação Textual (Inferência): Consiste em extrair conclusões lógicas, sentidos implícitos e deduções a partir das pistas linguísticas deixadas pelo autor. Vai além da literalidade, mas sem violar os limites do texto. Comandos típicos: "Depreende-se do texto que...", "Infere-se que...", "O texto permite concluir que...".'
  },
  {
    id: 17,
    enunciado: '17. (Discursiva TJAM) Explique os 3 erros clássicos cometidos por candidatos na resolução de questões de interpretação de textos da banca FGV (Extrapolação, Redução e Contradição), demonstrando o mecanismo de cada um.',
    respostaEsperada: 'Padrão de Resposta Esperado:\n1. Extrapolação: O candidato acrescenta informações que não estão no texto, baseando-se em convicções pessoais, preconceitos ou conhecimentos prévios externos não respaldados pelas premissas do autor.\n2. Redução (ou Limitação): O candidato escolhe uma assertiva que aborda apenas um aspecto parcial ou secundário do texto, tratando-o como se fosse a ideia central ou a tese completa.\n3. Contradição: O candidato assinala uma alternativa que afirma o oposto ou uma tese logicamente incompatível com os argumentos do autor.'
  },
  {
    id: 18,
    enunciado: '18. (Discursiva TJAM) Com base no texto de apoio oficial da Aula 01, identifique o conflito temático central apresentado pelo autor e explique por que a tecnologia, isoladamente, não assegura o acesso pleno aos serviços públicos estatais.',
    respostaEsperada: 'Padrão de Resposta Esperado:\nO conflito central reside entre os benefícios proporcionados pela modernização digital (celeridade, comodidade, redução de deslocamentos) e as barreiras socioeconômicas enfrentadas por parcela da população (falta de letramento digital, renda insuficiente e exclusão tecnológica). A tecnologia isoladamente não assegura o acesso pleno porque o Estado não pode criar barreiras de acesso aos cidadãos desprovidos de ferramentas digitais; assim, o atendimento presencial físico permanece indispensável como instrumento de garantia dos direitos fundamentais e inclusão social.'
  },
  {
    id: 19,
    enunciado: '19. (Discursiva TJAM) Conceitue Pressuposto e Subentendido na análise linguística de textos e aponte no texto de apoio um exemplo prático de marca linguística que autoriza uma inferência legítima.',
    respostaEsperada: 'Padrão de Resposta Esperado:\n• Pressuposto: É uma informação implícita decorrente de uma marca linguística presente no enunciado (verbo, advérbio, conectivo), de modo que o interlocutor não pode negar o seu sentido sem destruir a coerência da frase.\n• Subentendido: É uma insinuação que depende da interpretação do contexto e do conhecimento compartilhado, não possuindo marca gramatical explícita, o que permite ao emissor refutar a intenção se questionado.\n• Exemplo no texto de apoio: No trecho "...parte da população ainda encontre dificuldades...", o advérbio "ainda" é um marcador pressuposicional categórico de que essas dificuldades já existiam no passado e se perpetuam no presente.'
  },
  {
    id: 20,
    enunciado: '20. (Discursiva TJAM) Redija um parágrafo analítico demonstrando a função do conectivo adversativo "Entretanto" na progressão argumentativa do texto de apoio da Aula 01.',
    respostaEsperada: 'Padrão de Resposta Esperado:\nNo texto de apoio, a conjunção adversativa "Entretanto" atua como articulador central da argumentação. Enquanto os dois primeiros períodos exaltam as vantagens da inovação tecnológica (redução de deslocamentos e facilidade de acesso), o conectivo introduz um contraponto decisivo: quebra a expectativa de que a tecnologia seria autossuficiente, introduzindo a ressalva de que o atendimento presencial é insubstituível diante das disparidades sociais. Assim, "Entretanto" impede uma visão simplista do progresso digital e prepara o leitor para a conclusão conciliadora final.'
  }
];

// Pontos de Resumo da Aula 01
export const portuguesAula1SummaryPoints: string[] = [
  'Compreensão Textual: Foco na literalidade e naquilo que o texto explicitamente apresenta (enunciados: "segundo o texto", "o autor afirma").',
  'Interpretação Textual: Deduções lógicas e inferências autorizadas pelas pistas deixadas pelo autor (enunciados: "infere-se", "depreende-se").',
  'Tema vs. Ideia Central: O tema é o assunto genérico abordado; a ideia central é o ponto de vista ou tese nuclear defendido pelo autor.',
  'Informações Explícitas e Implícitas: Explícitas são literais; implícitas dividem-se em pressupostos (com marca linguística) e subentendidos (deduzidos do contexto).',
  'Os 3 Erros Fatais da FGV: Extrapolação (ir além do texto), Redução (pegar apenas um detalhe secundário) e Contradição (afirmar o oposto).',
  'Texto de Apoio da Aula: A tecnologia agiliza os serviços estatais, mas o atendimento presencial permanece indispensável para combater desigualdades socioeconômicas.',
  'Marcadores Textuais: Conectivos adversativos (entretanto, no entanto) introduzem ressalvas capitais; conectivos conclusivos (dessa forma, portanto) selam a tese.'
];

// Aliases for backwards compatibility with any existing imports
export const portuguesAula3FlashcardsData = portuguesAula1FlashcardsData;
export const portuguesAula3McQuestionsData = portuguesAula1McQuestionsData;
export const portuguesAula3TfQuestionsData = portuguesAula1TfQuestionsData;
export const portuguesAula3DiscursiveQuestionsData = portuguesAula1DiscursiveQuestionsData;
export const portuguesAula3SummaryPoints = portuguesAula1SummaryPoints;
