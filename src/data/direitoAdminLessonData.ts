// Data for Direito Administrativo — Aula 01: Organização Administrativa
// Nível Intermediário — TJAM Assistente Judiciário

export interface FlashcardItem {
  q: string;
  a: string;
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
  enunciado: string;
  respostaEsperada: string;
}

export interface PracticalTaskItem {
  titulo: string;
  situacaoProblema: string;
  tarefa: string;
  perguntasChave: string[];
  desafioCotidiano: string;
  criteriosAvaliacao: string[];
  whatsappTemplate: string;
}

export const direitoAdminVideoPracticalTask: PracticalTaskItem = {
  titulo: 'Situação Prática: “Você é servidor público” — Descentralização × Desconcentração',
  situacaoProblema:
    'Imagine que você trabalha como servidor em um órgão público. Seu superior apresenta as seguintes situações:\n• Situação A: uma secretaria divide suas atribuições entre vários departamentos.\n• Situação B: determinada atividade administrativa passa a ser executada por uma entidade com personalidade jurídica própria.',
  tarefa:
    'Analise as duas situações e elabore uma resposta técnica de até 10 linhas explicando qual instituto está presente em cada uma, fundamentando a diferença essencial e fornecendo exemplos práticos.',
  perguntasChave: [
    '1. Qual situação representa desconcentração? (Situação A: divisão interna de competências entre departamentos dentro da mesma pessoa jurídica).',
    '2. Qual situação representa descentralização? (Situação B: transferência da atividade para outra pessoa jurídica com personalidade própria).',
    '3. Qual é a principal diferença entre elas? (Descentralização envolve pessoas jurídicas distintas; desconcentração ocorre internamente sem criar nova pessoa jurídica).',
    '4. Dê um exemplo próprio para cada situação (Ex: Criação de delegacias pela Polícia Civil = desconcentração; Criação do Detran ou INSS = descentralização).'
  ],
  desafioCotidiano:
    'Explique como o Tribunal de Justiça do Amazonas (TJAM) aplica a desconcentração ao organizar suas varas, juizados e secretarias judiciais.',
  criteriosAvaliacao: [
    'Enquadramento correto de cada situação prática (A = desconcentração, B = descentralização)',
    'Diferenciação clara quanto à titularidade e à existência ou não de nova pessoa jurídica',
    'Pertinência e coerência dos exemplos práticos apresentados',
    'Capacidade de síntese e clareza argumentativa dentro do limite proposto'
  ],
  whatsappTemplate:
    'Nome: [Seu Nome]\nTurma: TJAM 2026\nDisciplina: Direito Administrativo\nAula: 01 — Organização Administrativa\nPrática: Descentralização × Desconcentração\nResposta: [Seu texto de até 10 linhas fundamentando as Situações A e B com exemplos]'
};

export const direitoAdminFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que é Administração Pública em sentido Subjetivo / Orgânico?',
    a: 'Refere-se a QUEM exerce a atividade administrativa (os sujeitos: entes federativos União, Estados, DF, Municípios, órgãos públicos e entidades da Administração Indireta como autarquias, fundações, empresas públicas e SEM).\n🎯 Macete: Subjetivo = quem administra.'
  },
  {
    q: 'O que é Administração Pública em sentido Objetivo / Material?',
    a: 'Refere-se à ATIVIDADE administrativa exercida pelo Estado (o que é feito: prestação de serviços públicos, poder de polícia, fiscalização, fomento, intervenção e gestão de bens públicos).\n🎯 Macete: Objetivo = o que é feito pela Administração.'
  },
  {
    q: 'Quem integra a Administração Direta?',
    a: 'Os próprios entes federativos (pessoas jurídicas de direito público político):\n• União\n• Estados (ex: Estado do Amazonas)\n• Distrito Federal\n• Municípios (ex: Manaus)\nEles atuam diretamente por meio de seus órgãos internos.'
  },
  {
    q: 'Quem integra a Administração Indireta?',
    a: 'Entidades dotadas de personalidade jurídica própria criadas ou autorizadas pelo Estado:\n1. 🏛️ Autarquias (direito público, criadas por lei);\n2. 🏢 Fundações Públicas;\n3. 🏭 Empresas Públicas (direito privado, capital 100% público);\n4. 🏢 Sociedades de Economia Mista (direito privado, capital público + privado, controle estatal).'
  },
  {
    q: 'Qual a diferença essencial entre Órgão Público e Entidade Administrativa?',
    a: '• Órgão Público: NÃO possui personalidade jurídica própria. É uma unidade integrante da estrutura interna de uma pessoa jurídica (ex: Secretaria de Estado, TJAM, Ministério).\n• Entidade: POSSUI personalidade jurídica própria (ex: Autarquia, Fundação Pública, Empresa Pública).'
  },
  {
    q: 'O que é Centralização Administrativa?',
    a: 'Ocorre quando o próprio ente estatal (União, Estado, DF ou Município) executa determinada atividade administrativa diretamente, utilizando seus próprios órgãos e servidores.'
  },
  {
    q: 'O que é Descentralização Administrativa e qual a palavra-chave?',
    a: 'Ocorre quando a atividade administrativa é atribuída a OUTRA pessoa (física ou jurídica), criando ou transferindo a execução para pessoas jurídicas distintas.\n🎯 Palavra-chave: Descentralização = OUTRA pessoa (ex: Estado atribui serviço a uma autarquia).'
  },
  {
    q: 'O que é Desconcentração Administrativa e qual a palavra-chave?',
    a: 'Ocorre quando há uma distribuição interna de competências dentro da MESMA pessoa jurídica, criando ou organizando órgãos públicos.\n🎯 Palavra-chave: Desconcentração = MESMA pessoa jurídica + distribuição interna de órgãos (ex: Estado divide competências entre suas secretarias).'
  },
  {
    q: 'Qual o macete para nunca confundir Descentralização e Desconcentração?',
    a: '🧠 Macete infalível de prova:\n• DESCENTRALIZAÇÃO → CENTRO → sai para OUTRA pessoa jurídica.\n• DESCONCENTRAÇÃO → CONCENTRAÇÃO interna → divide competências dentro dos ÓRGÃOS da mesma pessoa.'
  },
  {
    q: 'Uma Secretaria de Estado é uma Autarquia? Qual a pegadinha clássica?',
    a: '⚠️ PEGADINHA: NÃO! Uma Secretaria de Estado não é autarquia nem entidade. Ela é um ÓRGÃO integrante da Administração Direta do Estado, sem personalidade jurídica própria. Autarquia é entidade da Administração Indireta.'
  }
];

export const direitoAdminMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Integram a Administração Direta:',
    opcoes: [
      'A) autarquias e fundações públicas.',
      'B) empresas públicas e sociedades de economia mista.',
      'C) União, Estados, Distrito Federal e Municípios.',
      'D) somente União e Estados.',
      'E) autarquias, empresas públicas e Municípios.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. A Administração Direta é formada exclusivamente pelos entes federativos políticos: União, Estados, Distrito Federal e Municípios, que exercem suas atribuições por meio de seus órgãos internos despersonalizados.'
  },
  {
    id: 2,
    enunciado: '2. Sobre os órgãos públicos, assinale a alternativa correta:',
    opcoes: [
      'A) Possuem sempre personalidade jurídica própria.',
      'B) São necessariamente pessoas jurídicas de direito público.',
      'C) Integram a estrutura de uma pessoa jurídica e, em regra, não possuem personalidade jurídica própria.',
      'D) Fazem parte exclusivamente da Administração Indireta.',
      'E) São entidades administrativas independentes.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Os órgãos públicos são centros de competências despersonalizados que integram a estrutura de uma pessoa jurídica (seja da Administração Direta ou Indireta), não possuindo personalidade jurídica própria.'
  },
  {
    id: 3,
    enunciado: '3. Uma entidade dotada de personalidade jurídica própria, criada por lei para desempenhar determinada atividade administrativa, enquadra-se, em regra, como:',
    opcoes: [
      'A) órgão público.',
      'B) autarquia.',
      'C) secretaria.',
      'D) departamento.',
      'E) gabinete.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. As autarquias são pessoas jurídicas de direito público, criadas diretamente por lei específica, com patrimônio e receita próprios para executar atividades típicas da Administração Pública.'
  },
  {
    id: 4,
    enunciado: '4. A Administração Indireta compreende, entre outras entidades:',
    opcoes: [
      'A) Ministérios e Secretarias.',
      'B) Tribunais e Ministérios Públicos.',
      'C) Autarquias, fundações públicas, empresas públicas e sociedades de economia mista.',
      'D) União, Estados e Municípios.',
      'E) apenas empresas públicas e autarquias.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Conforme o Decreto-Lei nº 200/1967 e o art. 37, XIX da CF/88, a Administração Indireta é composta taxativamente por: Autarquias, Fundações Públicas, Empresas Públicas e Sociedades de Economia Mista.'
  },
  {
    id: 5,
    enunciado: '5. Quando o Estado distribui competências entre diferentes órgãos que pertencem à sua própria estrutura, ocorre:',
    opcoes: [
      'A) descentralização.',
      'B) privatização.',
      'C) centralização.',
      'D) desconcentração.',
      'E) delegação legislativa.'
    ],
    correta: 3, // D
    explicacao: 'Gabarito Oficial: D. Desconcentração é a técnica de distribuição interna de competências dentro da mesma pessoa jurídica, que resulta na criação ou organização de órgãos públicos.'
  },
  {
    id: 6,
    enunciado: '6. A descentralização administrativa caracteriza-se, em termos gerais, pela:',
    opcoes: [
      'A) distribuição interna de competências entre órgãos da mesma pessoa jurídica.',
      'B) atribuição da execução de determinada atividade a outra pessoa.',
      'C) extinção dos órgãos públicos.',
      'D) concentração das competências em um único órgão.',
      'E) ausência de personalidade jurídica.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Na descentralização, o Estado atribui a titularidade e/ou a execução de determinada atividade a outra pessoa (física ou jurídica), havendo pessoas jurídicas distintas.'
  },
  {
    id: 7,
    enunciado: '7. Uma sociedade de economia mista possui:',
    opcoes: [
      'A) personalidade jurídica de direito público e capital exclusivamente público.',
      'B) personalidade jurídica de direito privado e participação pública e privada em seu capital, sob controle estatal.',
      'C) natureza de órgão público.',
      'D) personalidade jurídica inexistente.',
      'E) exclusivamente capital privado.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. A sociedade de economia mista é pessoa jurídica de direito privado, integrante da Administração Indireta, cujo capital social é formado pela conjugação de recursos públicos e privados, devendo a maioria das ações com direito a voto pertencer ao Poder Público.'
  },
  {
    id: 8,
    enunciado: '8. Considere a seguinte situação: O Estado do Amazonas possui uma determinada secretaria e, dentro dela, cria departamentos para distribuir internamente as atribuições administrativas. Nesse caso, está presente o fenômeno da:',
    opcoes: [
      'A) descentralização.',
      'B) privatização.',
      'C) desconcentração.',
      'D) concessão.',
      'E) centralização política.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Trata-se de desconcentração, pois a criação de departamentos dentro da secretaria ocorre estritamente dentro da mesma pessoa jurídica (Estado do Amazonas), subdividindo competências entre órgãos.'
  },
  {
    id: 9,
    enunciado: '9. Assinale a alternativa que apresenta corretamente uma diferença entre descentralização e desconcentração:',
    opcoes: [
      'A) A descentralização ocorre sempre sem personalidade jurídica.',
      'B) A desconcentração necessariamente cria uma nova pessoa jurídica.',
      'C) A descentralização envolve outra pessoa, enquanto a desconcentração distribui competências internamente.',
      'D) Ambas são exatamente o mesmo fenômeno.',
      'E) A desconcentração somente pode ocorrer na Administração Indireta.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. A diferença fundamental é: a descentralização envolve pessoas jurídicas distintas (transfere atividade para outra pessoa), enquanto a desconcentração opera uma distribuição interna de competências no âmbito da mesma pessoa jurídica (cria órgãos).'
  },
  {
    id: 10,
    enunciado: '10. Sobre a Administração Pública em sentido subjetivo e objetivo, assinale a alternativa correta:',
    opcoes: [
      'A) O sentido subjetivo corresponde exclusivamente às atividades administrativas.',
      'B) O sentido objetivo corresponde às pessoas que exercem a função administrativa.',
      'C) O sentido subjetivo relaciona-se aos sujeitos que exercem a atividade administrativa; o objetivo, à própria atividade administrativa.',
      'D) Ambos se referem exclusivamente às autarquias.',
      'E) Não existe distinção entre os dois sentidos.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Sentido subjetivo (orgânico/formal) = QUEM exerce (sujeitos, órgãos e entidades). Sentido objetivo (material/funcional) = O QUE é feito (as atividades administrativas em si, como serviços públicos, fomento e polícia administrativa).'
  }
];

export const direitoAdminTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A Administração Direta é composta pelos entes federativos, enquanto a Administração Indireta é composta por entidades dotadas de personalidade jurídica própria.',
    correta: true,
    explicacao: 'Certo: Os entes federativos (União, Estados, DF e Municípios) compõem a Administração Direta. Já a Administração Indireta é formada por entidades personalizadas (autarquias, fundações públicas, empresas públicas e sociedades de economia mista).'
  },
  {
    id: 12,
    enunciado: '12. A criação de departamentos dentro de uma mesma pessoa jurídica, com distribuição interna de competências, caracteriza descentralização administrativa.',
    correta: false,
    explicacao: 'Errado: Trata-se de DESCONCENTRAÇÃO, pois a distribuição de competências ocorre internamente dentro da mesma pessoa jurídica, gerando órgãos e não novas entidades.'
  },
  {
    id: 13,
    enunciado: '13. As autarquias possuem personalidade jurídica própria e integram a Administração Indireta.',
    correta: true,
    explicacao: 'Certo: As autarquias são pessoas jurídicas de direito público criadas por lei específica, com patrimônio e receitas próprios, integrantes da Administração Indireta.'
  },
  {
    id: 14,
    enunciado: '14. Órgão público e entidade administrativa são expressões equivalentes, pois ambos possuem necessariamente personalidade jurídica própria.',
    correta: false,
    explicacao: 'Errado: Órgão público e entidade NÃO são equivalentes. Os órgãos públicos são despersonalizados (não têm personalidade jurídica própria), enquanto as entidades possuem personalidade jurídica autônoma.'
  },
  {
    id: 15,
    enunciado: '15. Na desconcentração administrativa, ocorre distribuição interna de competências, sem criação de uma nova pessoa jurídica.',
    correta: true,
    explicacao: 'Certo: A desconcentração é estritamente intra-entidade; ela cria centros de competência (órgãos) na mesma pessoa jurídica, jamais gerando uma nova pessoa.'
  }
];

export const direitoAdminDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique a diferença entre Administração Direta e Administração Indireta e apresente exemplos de cada uma.',
    respostaEsperada: 'Gabarito esperado: A Administração Direta é composta pelos próprios entes políticos da federação (União, Estados, Distrito Federal e Municípios), que exercem a função administrativa por meio de seus órgãos internos despersonalizados (ex.: Secretaria de Estado de Saúde, Ministérios). Já a Administração Indireta é formada por pessoas jurídicas autônomas, criadas ou autorizadas pelo Estado para prestar serviços ou exercer atividades específicas, possuindo personalidade jurídica própria, patrimônio e receitas autônomas. Compreende as autarquias (ex.: INSS, Detran), as fundações públicas (ex.: FUNAI, Fiocruz), as empresas públicas (ex.: Caixa Econômica Federal, Correios) e as sociedades de economia mista (ex.: Petrobras, Banco do Brasil).'
  },
  {
    id: 17,
    enunciado: '17. Explique, com suas palavras, a diferença entre descentralização e desconcentração administrativa.',
    respostaEsperada: 'Gabarito esperado: A descentralização ocorre quando a atividade administrativa é transferida para outra pessoa (física ou jurídica), havendo pelo menos duas pessoas jurídicas distintas envolvidas (ex.: quando o Estado cria uma autarquia para gerir a previdência). Já a desconcentração é a técnica de distribuição puramente interna de atribuições e competências dentro da MESMA pessoa jurídica, ocorrendo a criação ou organização de órgãos públicos subordinados hierarquicamente (ex.: quando um Ministério ou Secretaria subdivide suas tarefas em departamentos, diretorias ou coordenações).'
  },
  {
    id: 18,
    enunciado: '18. Diferencie órgão público e entidade administrativa quanto à personalidade jurídica.',
    respostaEsperada: 'Gabarito esperado: Quanto à personalidade jurídica, a distinção é taxativa: o órgão público NÃO possui personalidade jurídica própria; ele é mero centro de competência despersonalizado que integra a estrutura de uma pessoa jurídica. Já a entidade administrativa POSSUI personalidade jurídica própria (de direito público ou de direito privado), sendo sujeito de direitos e obrigações, possuindo patrimônio próprio e capacidade processual autônoma.'
  },
  {
    id: 19,
    enunciado: '19. Imagine que determinado Estado distribua as competências administrativas entre suas secretarias e departamentos. Explique qual fenômeno administrativo está presente e por quê.',
    respostaEsperada: 'Gabarito esperado: O fenômeno administrativo presente é a DESCONCENTRAÇÃO. Isso se justifica porque a distribuição de competências se dá dentro da estrutura da própria pessoa jurídica estatal (o Estado-membro), que cria e organiza órgãos internos (secretarias e departamentos) subordinados entre si, sem haver a criação de nenhuma nova pessoa jurídica.'
  },
  {
    id: 20,
    enunciado: '20. Uma entidade pública possui personalidade jurídica própria e foi criada para executar uma atividade administrativa específica. Explique por que essa característica é importante para diferenciá-la de um órgão público.',
    respostaEsperada: 'Gabarito esperado: A existência de personalidade jurídica própria é a nota distintiva essencial porque confere à entidade titularidade própria de direitos e obrigações, orçamento e patrimônio segregados, autonomia administrativa e financeira, bem como capacidade de responder judicialmente por seus próprios atos (responsabilidade civil autônoma). Em contrapartida, o órgão público não possui patrimônio nem vontade própria autônoma, imputando-se todos os seus atos diretamente à pessoa jurídica a qual pertence.'
  }
];

export const direitoAdminSummaryPoints: string[] = [
  'Administração Direta: União + Estados + Distrito Federal + Municípios (entes federativos políticos).',
  'Administração Indireta: Autarquias + Fundações Públicas + Empresas Públicas + Sociedades de Economia Mista.',
  '⭐ Sentido Subjetivo/Orgânico: Refere-se a QUEM exerce a função administrativa (sujeitos e órgãos).',
  '⭐ Sentido Objetivo/Material: Refere-se à ATIVIDADE administrativa exercida pelo Estado.',
  '⭐ Órgão Público: Não possui personalidade jurídica própria; integra a estrutura de uma pessoa jurídica.',
  '⭐ Entidade Administrativa: Possui personalidade jurídica própria (direito público ou privado).',
  '⭐ Centralização: O próprio ente executa a atividade diretamente por seus órgãos.',
  '⭐ Descentralização: A atividade é atribuída a OUTRA pessoa jurídica (ex: autarquias, concessionárias).',
  '⭐ Desconcentração: Distribuição INTERNA de competências dentro da mesma pessoa jurídica (cria órgãos).',
  '🧠 Macete TJAM: Descentralização = sai para outro CENTRO (outra pessoa). Desconcentração = CONCENTRAÇÃO interna (órgãos).'
];
