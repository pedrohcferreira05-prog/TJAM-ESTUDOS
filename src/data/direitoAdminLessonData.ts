// Data for Direito Administrativo — Aula 01: Organização Administrativa
// 2ª Aula de Hoje (Quarta-feira • 18/11/2026) — Concurso TJAM Assistente Judiciário | Nível intermediário

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D
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

export const direitoAdminVideoInfo = {
  title: '1ª AULA — Direito Administrativo: Organização Administrativa',
  videoId: 'YsrcBEUgoGY',
  videoUrl: 'https://www.youtube.com/embed/YsrcBEUgoGY?autoplay=0&rel=0',
  externalUrl: 'https://youtu.be/YsrcBEUgoGY?si=un4q_WG8jnsLtwwa',
  cfArt37Url: 'https://www4.planalto.gov.br/legislacao/legis-federal/constituicao',
  pdfApoioUrl:
    'https://professor.pucgoias.edu.br/SiteDocente/admin/arquivosUpload/17598/material/DIREITO%20ADMINISTRATIVO%20I.%20MATERIAL%20DE%20APOIO%20%C3%80%20AULA.pdf',
};

export const direitoAdminVideoPracticalTask: PracticalTaskItem = {
  titulo: 'Situação Prática: “Você é servidor público” — Descentralização × Desconcentração',
  situacaoProblema:
    'Imagine que você trabalha como servidor em um órgão público. Seu superior apresenta as seguintes situações:\n• Situação A: uma prefeitura cria a Secretaria de Educação dentro de sua própria estrutura.\n• Situação B: determinada atividade administrativa passa a ser executada por uma entidade com personalidade jurídica própria (como INSS, IBGE, Caixa ou Banco do Brasil).',
  tarefa:
    'Analise as duas situações e elabore uma resposta técnica explicando qual instituto está presente em cada uma, fundamentando a diferença essencial (uma pessoa jurídica × mais de uma pessoa jurídica, hierarquia e órgãos × entidades).',
  perguntasChave: [
    '1. Qual situação representa desconcentração? (Situação A: criação de Secretaria dentro da estrutura do Município, mesma pessoa jurídica).',
    '2. Qual situação representa descentralização? (Situação B: execução por entidade com personalidade jurídica própria).',
    '3. Qual é a principal diferença entre elas? (Desconcentração = órgãos / uma PJ / existe hierarquia; Descentralização = entidades ou delegação / mais de uma PJ / não há hierarquia entre PJs).',
    '4. Cite um exemplo de cada categoria da Administração Indireta: Autarquia (INSS), Fundação pública (IBGE), Empresa pública (Caixa Econômica Federal) e Sociedade de economia mista (Banco do Brasil).',
  ],
  desafioCotidiano:
    'Explique como a Prefeitura de Manaus aplica o Direito Administrativo ao organizar concursos, construir escolas e fiscalizar estabelecimentos.',
  criteriosAvaliacao: [
    'Enquadramento correto da Situação A (desconcentração) e Situação B (descentralização)',
    'Diferenciação clara quanto à personalidade jurídica e hierarquia',
    'Exemplos corretos de Administração Direta e Indireta',
    'Objetividade e precisão jurídica conforme o edital TJAM',
  ],
  whatsappTemplate:
    'Nome: [Seu Nome]\nTurma: TJAM 2026\nDisciplina: Direito Administrativo\nAula: Tema 1 — Organização Administrativa\nResposta: [Seu texto fundamentando Desconcentração × Descentralização]',
};

export const direitoAdminFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que é Direito Administrativo e qual seu objetivo principal?',
    a: 'É o ramo do Direito Público que estuda a organização, o funcionamento e a atuação da Administração Pública, bem como suas relações com os cidadãos, disciplinando a atividade administrativa conforme a lei e o interesse público.',
  },
  {
    q: 'Qual a diferença entre Administração Pública em sentido Subjetivo (formal/orgânico) e Objetivo (material/funcional)?',
    a: '• Subjetivo = QUEM exerce (órgãos, entidades e agentes públicos; ex.: secretaria municipal).\n• Objetivo = O QUE é exercido (a própria atividade administrativa: prestar serviços públicos, fiscalizar etc.).',
  },
  {
    q: 'O que é Desconcentração administrativa?',
    a: 'É a distribuição interna de competências dentro da MESMA pessoa jurídica, criando órgãos (ex.: Município criando Secretarias de Saúde, Educação, Finanças e Administração).\n• Não cria nova pessoa jurídica e existe hierarquia.',
  },
  {
    q: 'O que é Descentralização administrativa?',
    a: 'É a transferência da execução de atividade administrativa para OUTRA pessoa (física ou jurídica), mediante criação de entidades da Administração Indireta ou delegação a particulares.\n• Envolve mais de uma pessoa jurídica e NÃO existe hierarquia entre as pessoas jurídicas.',
  },
  {
    q: 'O que é Centralização administrativa?',
    a: 'Ocorre quando o próprio Estado executa suas atividades diretamente, por meio de seus órgãos e agentes (ex.: secretaria estadual prestando diretamente um serviço público).',
  },
  {
    q: 'O que é Concentração administrativa?',
    a: 'Ocorre quando as competências administrativas ficam reunidas em poucos órgãos, sem distribuição interna entre diversas unidades. É o conceito oposto à desconcentração.',
  },
  {
    q: 'Quem forma a Administração Direta?',
    a: 'Os entes federativos:\n• União\n• Estados\n• Distrito Federal\n• Municípios',
  },
  {
    q: 'Quais são as 4 categorias da Administração Indireta e seus exemplos clássicos?',
    a: 'Entidades com personalidade jurídica própria:\n1. Autarquias (ex.: INSS)\n2. Fundações públicas (ex.: IBGE)\n3. Empresas públicas (ex.: Caixa Econômica Federal)\n4. Sociedades de economia mista (ex.: Banco do Brasil)',
  },
  {
    q: 'Qual o quadro comparativo essencial entre Desconcentração e Descentralização?',
    a: '• Desconcentração: 1 pessoa jurídica | Criação de órgãos | Distribuição interna | Existe hierarquia.\n• Descentralização: + de 1 pessoa jurídica | Outra pessoa/entidade | Transferência de atividade | Não existe hierarquia entre PJs.',
  },
  {
    q: 'Qual é o macete infalível para Desconcentração × Descentralização?',
    a: 'DESCONCENTRAÇÃO = ÓRGÃOS\nDESCENTRALIZAÇÃO = ENTIDADES',
  },
];

// Parte I — Questões Objetivas (1 a 10)
export const direitoAdminMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Qual é o objeto principal do Direito Administrativo?',
    opcoes: [
      'Apenas a tipificação de crimes praticados contra particulares.',
      'A organização, o funcionamento e a atuação da Administração Pública, bem como suas relações com os cidadãos.',
      'Exclusivamente os contratos privados celebrados entre empresas comerciais.',
      'Somente a cobrança de tributos estaduais e a jurisdição trabalhista.',
    ],
    correta: 1,
    explicacao:
      'Gabarito: B. O Direito Administrativo é o ramo do Direito Público que estuda a organização, o funcionamento e a atuação da Administração Pública e suas relações com os cidadãos, disciplinando a atividade administrativa conforme a lei e o interesse público.',
  },
  {
    id: 2,
    enunciado: '2. Administração Pública em sentido subjetivo significa:',
    opcoes: [
      'A própria atividade administrativa prestada, como fiscalizar e prestar serviços públicos.',
      'Quem exerce a atividade administrativa: órgãos, entidades e agentes públicos.',
      'Apenas as empresas privadas que celebram contratos de compra e venda no mercado.',
      'Exclusivamente o conjunto de leis penais aplicáveis aos servidores.',
    ],
    correta: 1,
    explicacao:
      'Gabarito: B. Em sentido subjetivo, formal ou orgânico, Administração Pública refere-se a QUEM exerce a atividade administrativa (órgãos, entidades e agentes públicos, como uma secretaria municipal).',
  },
  {
    id: 3,
    enunciado: '3. Administração Pública em sentido objetivo está relacionada:',
    opcoes: [
      'À estrutura interna de cargos e órgãos políticos apenas.',
      'À própria atividade administrativa exercida pelo Estado, como prestar serviços públicos e fiscalizar.',
      'Exclusivamente aos entes federativos considerados em si mesmos.',
      'Apenas ao Poder Legislativo na elaboração de emendas constitucionais.',
    ],
    correta: 1,
    explicacao:
      'Gabarito: B. Em sentido objetivo, material ou funcional, Administração Pública diz respeito ao QUE é exercido — isto é, a própria atividade administrativa desempenhada pelo Estado em prol do interesse coletivo.',
  },
  {
    id: 4,
    enunciado: '4. A desconcentração administrativa ocorre:',
    opcoes: [
      'Com a criação obrigatória de uma nova pessoa jurídica de direito privado.',
      'Por meio da distribuição interna de competências dentro da mesma pessoa jurídica, criando órgãos.',
      'Somente quando o Estado delega um serviço público a uma empresa concessionária privada.',
      'Quando todas as competências são reunidas em um único órgão sem divisão interna.',
    ],
    correta: 1,
    explicacao:
      'Gabarito: B. Na desconcentração administrativa, há distribuição interna de competências dentro da MESMA pessoa jurídica (criam-se órgãos como Secretarias de Saúde, Educação e Finanças em um Município), sem criar nova pessoa jurídica.',
  },
  {
    id: 5,
    enunciado: '5. A descentralização administrativa envolve:',
    opcoes: [
      'Apenas uma única pessoa jurídica dividindo tarefas entre seus departamentos internos.',
      'Mais de uma pessoa jurídica, transferindo a execução de atividade para entidade da Administração Indireta ou para particulares.',
      'Subordinação hierárquica rígida entre duas pessoas jurídicas autônomas.',
      'Reunião de todas as atribuições em um único órgão central sem autonomia.',
    ],
    correta: 1,
    explicacao:
      'Gabarito: B. Na descentralização administrativa, o Estado transfere a execução de determinada atividade para outra pessoa (física ou jurídica), envolvendo mais de uma pessoa jurídica (ex.: criação de entidades da Administração Indireta ou delegação a particulares).',
  },
  {
    id: 6,
    enunciado: '6. Qual alternativa apresenta entidades da Administração Indireta?',
    opcoes: [
      'União, Estados, Distrito Federal e Municípios.',
      'Secretarias Municipais, Ministérios e Gabinetes.',
      'Autarquias, fundações públicas, empresas públicas e sociedades de economia mista.',
      'Apenas órgãos consultivos sem personalidade jurídica.',
    ],
    correta: 2,
    explicacao:
      'Gabarito: C. A Administração Indireta é formada por entidades com personalidade jurídica própria: autarquias, fundações públicas, empresas públicas e sociedades de economia mista.',
  },
  {
    id: 7,
    enunciado: '7. O INSS é classificado como:',
    opcoes: [
      'Empresa pública federal',
      'Autarquia federal',
      'Sociedade de economia mista',
      'Órgão da Administração Direta municipal',
    ],
    correta: 1,
    explicacao:
      'Gabarito: B. O INSS (Instituto Nacional do Seguro Social) é o exemplo clássico de autarquia federal integrante da Administração Indireta.',
  },
  {
    id: 8,
    enunciado: '8. O Banco do Brasil é:',
    opcoes: [
      'Autarquia federal',
      'Fundação pública estadual',
      'Sociedade de economia mista',
      'Órgão da Administração Direta da União',
    ],
    correta: 2,
    explicacao:
      'Gabarito: C. O Banco do Brasil é exemplo clássico de sociedade de economia mista (enquanto a Caixa Econômica Federal é empresa pública, o IBGE é fundação pública e o INSS é autarquia federal).',
  },
  {
    id: 9,
    enunciado: '9. A Administração Direta é composta por:',
    opcoes: [
      'Autarquias, fundações públicas e empresas públicas.',
      'União, Estados, Distrito Federal e Municípios.',
      'Apenas concessionárias e permissionárias de serviços públicos.',
      'Sociedades de economia mista e agências reguladoras.',
    ],
    correta: 1,
    explicacao:
      'Gabarito: B. A Administração Direta é formada pelos próprios entes federativos: União, Estados, Distrito Federal e Municípios.',
  },
  {
    id: 10,
    enunciado: '10. Na desconcentração administrativa existe:',
    opcoes: [
      'Criação de nova pessoa jurídica independente.',
      'Ausência completa de relação hierárquica entre os órgãos.',
      'Hierarquia entre os órgãos criados dentro da mesma pessoa jurídica.',
      'Transferência de titularidade para particulares por contrato de concessão.',
    ],
    correta: 2,
    explicacao:
      'Gabarito: C. Conforme o quadro comparativo: na desconcentração há uma pessoa jurídica, criação de órgãos, distribuição interna e EXISTE hierarquia (diferente da descentralização, em que não existe hierarquia entre as pessoas jurídicas).',
  },
];

// Parte II — Verdadeiro ou Falso (11 a 16)
export const direitoAdminTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A desconcentração ocorre dentro da mesma pessoa jurídica.',
    correta: true,
    explicacao:
      'Gabarito: V (Verdadeiro). A desconcentração consiste na distribuição interna de competências dentro da mesma pessoa jurídica, criando órgãos sem gerar nova pessoa jurídica.',
  },
  {
    id: 12,
    enunciado: '12. A descentralização pode ocorrer mediante delegação de serviço público a particulares.',
    correta: true,
    explicacao:
      'Gabarito: V (Verdadeiro). A descentralização acontece tanto pela criação de entidades da Administração Indireta quanto pela delegação da execução de serviços públicos a particulares nos termos legais.',
  },
  {
    id: 13,
    enunciado: '13. As autarquias não possuem personalidade jurídica própria.',
    correta: false,
    explicacao:
      'Gabarito: F (Falso). As autarquias (como o INSS) integram a Administração Indireta e POSSUEM personalidade jurídica própria.',
  },
  {
    id: 14,
    enunciado: '14. A Administração Indireta possui entidades com personalidade jurídica própria.',
    correta: true,
    explicacao:
      'Gabarito: V (Verdadeiro). Todas as entidades da Administração Indireta (autarquias, fundações públicas, empresas públicas e sociedades de economia mista) possuem personalidade jurídica própria.',
  },
  {
    id: 15,
    enunciado: '15. A centralização ocorre quando o próprio Estado executa diretamente suas atividades.',
    correta: true,
    explicacao:
      'Gabarito: V (Verdadeiro). Na centralização administrativa, o próprio Estado executa suas atividades diretamente por meio de seus órgãos e agentes.',
  },
  {
    id: 16,
    enunciado: '16. A concentração administrativa representa a distribuição interna de competências entre diversos órgãos.',
    correta: false,
    explicacao:
      'Gabarito: F (Falso). A distribuição interna de competências entre diversos órgãos é a DESCONCENTRAÇÃO. A concentração administrativa reúne as competências em poucos órgãos, sem distribuição interna — sendo o conceito oposto à desconcentração.',
  },
];

// Parte III — Questões Discursivas (17 a 20)
export const direitoAdminDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 17,
    enunciado: '17. Explique a diferença entre Administração Pública em sentido subjetivo e objetivo.',
    respostaEsperada:
      'Em sentido subjetivo (formal ou orgânico), a Administração Pública refere-se a QUEM exerce a atividade administrativa, isto é, aos órgãos, entidades e agentes públicos (por exemplo, uma secretaria municipal). Já em sentido objetivo (material ou funcional), refere-se ao QUE é exercido, ou seja, à própria atividade administrativa desempenhada pelo Estado em prol do interesse coletivo (como prestar serviços públicos e fiscalizar).',
  },
  {
    id: 18,
    enunciado: '18. Explique a diferença entre desconcentração e descentralização.',
    respostaEsperada:
      'A desconcentração é a distribuição interna de competências dentro da mesma pessoa jurídica, criando órgãos e mantendo vínculo de hierarquia (sem criar nova pessoa jurídica). Já a descentralização transfere a execução de atividade administrativa para outra pessoa (física ou jurídica), envolvendo mais de uma pessoa jurídica (como entidades da Administração Indireta ou particulares delegatários), sem relação de hierarquia entre as pessoas jurídicas. Macete: Desconcentração = Órgãos; Descentralização = Entidades.',
  },
  {
    id: 19,
    enunciado: '19. Cite as quatro categorias de entidades da Administração Indireta.',
    respostaEsperada:
      'As quatro categorias de entidades da Administração Indireta (todas dotadas de personalidade jurídica própria) são: 1) Autarquias (ex.: INSS); 2) Fundações públicas (ex.: IBGE); 3) Empresas públicas (ex.: Caixa Econômica Federal); e 4) Sociedades de economia mista (ex.: Banco do Brasil).',
  },
  {
    id: 20,
    enunciado:
      '20. Uma prefeitura cria uma Secretaria de Educação dentro de sua própria estrutura. Isso representa desconcentração ou descentralização? Justifique.',
    respostaEsperada:
      'Representa DESCONCENTRAÇÃO administrativa. Isso ocorre porque a Secretaria de Educação é um órgão criado mediante distribuição interna de competências dentro da própria pessoa jurídica do Município (a prefeitura), não havendo criação de nova pessoa jurídica e permanecendo a relação de hierarquia interna.',
  },
];

export const direitoAdminSummaryPoints: string[] = [
  'Objeto do Direito Administrativo: Ramo do Direito Público que estuda a organização, o funcionamento e a atuação da Administração Pública e suas relações com os cidadãos (lei + interesse público).',
  'Sentido Subjetivo (formal/orgânico): Refere-se a QUEM exerce a atividade administrativa (órgãos, entidades e agentes públicos).',
  'Sentido Objetivo (material/funcional): Refere-se ao QUE é exercido — a própria atividade administrativa do Estado (serviços públicos, fiscalização).',
  'Desconcentração Administrativa: Distribuição interna de competências dentro da MESMA pessoa jurídica; cria órgãos (ex.: Secretarias de uma Prefeitura) e mantém hierarquia.',
  'Descentralização Administrativa: Transfere a execução da atividade para OUTRA pessoa (física ou jurídica), envolvendo mais de uma pessoa jurídica (Adm. Indireta ou delegação a particulares), sem hierarquia entre PJs.',
  'Centralização × Concentração: Centralização = o próprio Estado executa diretamente por seus órgãos; Concentração = reunião de competências em poucos órgãos (oposto à desconcentração).',
  'Administração Direta: Entes federativos — União, Estados, Distrito Federal e Municípios.',
  'Administração Indireta (4 categorias com PJ própria): Autarquias (INSS), Fundações públicas (IBGE), Empresas públicas (Caixa Econômica Federal) e Sociedades de economia mista (Banco do Brasil).',
  'Macete de Prova TJAM: DESCONCENTRAÇÃO = ÓRGÃOS | DESCENTRALIZAÇÃO = ENTIDADES.',
];
