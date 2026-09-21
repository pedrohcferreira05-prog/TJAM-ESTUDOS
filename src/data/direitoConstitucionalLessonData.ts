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

export const direitoConstFlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'O que representam os Princípios Fundamentais (Arts. 1º a 4º da CF/88)?',
    a: 'São as diretrizes mestras e pilares estruturantes do Estado brasileiro. O Título I da CF/88 abrange: Fundamentos (art. 1º), Separação dos Poderes (art. 2º), Objetivos Fundamentais (art. 3º) e Princípios das Relações Internacionais (art. 4º).'
  },
  {
    id: 2,
    q: 'Qual é o mnemônico para os cinco Fundamentos da República (Art. 1º)?',
    a: 'SO – CI – DI – VA – PL:\n• SOberania\n• CIdadania\n• DIgnidade da pessoa humana\n• VAlores sociais do trabalho e da livre iniciativa\n• PLuralismo político'
  },
  {
    id: 3,
    q: 'Como é exercido o poder que "emana do povo" segundo o parágrafo único do art. 1º?',
    a: 'O poder emana do povo e pode ser exercido: 1) por meio de representantes eleitos (democracia representativa/indireta); ou 2) diretamente, nos termos da Constituição (ex.: plebiscito, referendo, iniciativa popular).'
  },
  {
    id: 4,
    q: 'Quais são os Poderes da União e qual é a relação entre eles (Art. 2º)?',
    a: 'São Poderes da União o Legislativo, o Executivo e o Judiciário. Eles são INDEPENDENTES E HARMÔNICOS entre si. Atenção: a CF NÃO diz que são subordinados uns aos outros.'
  },
  {
    id: 5,
    q: 'Qual é o mnemônico para os quatro Objetivos Fundamentais da República (Art. 3º)?',
    a: 'CON – GAR – ERR – PRO:\n• CONstruir uma sociedade livre, justa e solidária\n• GARantir o desenvolvimento nacional\n• ERRadicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais\n• PROmover o bem de todos, sem preconceitos e discriminação'
  },
  {
    id: 6,
    q: 'Como diferenciar Fundamentos (Art. 1º) de Objetivos Fundamentais (Art. 3º)?',
    a: '• Fundamentos (Art. 1º): Substantivos que expressam a base sobre a qual o Estado já se apoia (Soberania, Cidadania, Dignidade, etc.).\n• Objetivos (Art. 3º): Iniciam-se sempre por VERBOS no infinitivo que indicam metas a alcançar no futuro (Construir, Garantir, Erradicar, Promover).'
  },
  {
    id: 7,
    q: 'Quais são os 10 princípios que regem o Brasil nas Relações Internacionais (Art. 4º)?',
    a: '1) Independência nacional\n2) Prevalência dos direitos humanos\n3) Autodeterminação dos povos\n4) Não intervenção\n5) Igualdade entre os Estados\n6) Defesa da paz\n7) Solução pacífica dos conflitos\n8) Repúdio ao terrorismo e ao racismo\n9) Cooperação entre os povos para o progresso da humanidade\n10) Concessão de asilo político'
  },
  {
    id: 8,
    q: 'O que prevê o parágrafo único do Art. 4º sobre a Integração Latino-Americana?',
    a: 'A República Federativa do Brasil buscará a integração ECONÔMICA, POLÍTICA, SOCIAL e CULTURAL dos povos da América Latina, visando à formação de uma comunidade latino-americana de nações.'
  },
  {
    id: 9,
    q: 'Qual é a pegadinha clássica das bancas FGV e Cebraspe sobre os Princípios Fundamentais?',
    a: 'Trocar um fundamento do Art. 1º por um objetivo do Art. 3º (ex.: dizer que erradicar a pobreza é fundamento) ou misturar com princípios das relações internacionais do Art. 4º (ex.: dizer que defesa da paz é fundamento).'
  },
  {
    id: 10,
    q: 'A quem pertence o Ministério Público e a Defensoria Pública na separação dos Poderes (Art. 2º)?',
    a: 'Eles NÃO são um quarto poder! São Funções Essenciais à Justiça com autonomia funcional e orçamentária, mas os Poderes da União continuam sendo apenas três: Legislativo, Executivo e Judiciário.'
  }
];

export const direitoConstMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Constitui fundamento da República Federativa do Brasil:',
    alternativas: [
      'Defesa da paz.',
      'Cidadania.',
      'Garantia do desenvolvimento nacional.',
      'Solução pacífica dos conflitos.',
      'Cooperação entre os povos.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A cidadania é expressamente um dos cinco fundamentos previstos no art. 1º, inciso II, da CF/88 (SO-CI-DI-VA-PL). As opções A, D e E são princípios das relações internacionais (art. 4º) e a opção C é objetivo fundamental (art. 3º, II).'
  },
  {
    id: 2,
    enunciado: '2. A respeito dos fundamentos da República Federativa do Brasil, assinale a alternativa correta.',
    alternativas: [
      'A soberania constitui objetivo fundamental da República.',
      'A cidadania constitui princípio das relações internacionais.',
      'O pluralismo político constitui fundamento da República.',
      'A defesa da paz constitui fundamento da República.',
      'A prevalência dos direitos humanos constitui fundamento da República.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. O pluralismo político é fundamento da República Federativa do Brasil (art. 1º, V). Soberania é fundamento (não objetivo); cidadania é fundamento (não relações internacionais); defesa da paz e prevalência dos direitos humanos são princípios das relações internacionais (art. 4º).'
  },
  {
    id: 3,
    enunciado: '3. Segundo a Constituição Federal, são Poderes da União:',
    alternativas: [
      'Legislativo, Executivo e Ministério Público.',
      'Executivo, Judiciário e Tribunal de Contas.',
      'Legislativo, Executivo e Judiciário.',
      'Legislativo, Judiciário e Defensoria Pública.',
      'Executivo, Legislativo e Advocacia Pública.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Conforme o art. 2º da CF/88: "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário". Ministério Público, Tribunal de Contas, Defensoria e Advocacia Pública exercem funções essenciais e de controle, mas não são Poderes da União.'
  },
  {
    id: 4,
    enunciado: '4. Os Poderes da União são:',
    alternativas: [
      'independentes e harmônicos entre si.',
      'independentes e hierarquicamente organizados.',
      'subordinados entre si e harmônicos.',
      'autônomos, porém subordinados ao Executivo.',
      'independentes, mas sem mecanismos de interação.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. A redação literal do art. 2º da CF estabelece expressamente que os Poderes são "independentes e harmônicos entre si". Não há hierarquia ou subordinação entre eles, havendo o sistema de freios e contrapesos (checks and balances).'
  },
  {
    id: 5,
    enunciado: '5. Assinale a alternativa que apresenta somente objetivos fundamentais da República:',
    alternativas: [
      'Soberania, cidadania e pluralismo político.',
      'Dignidade da pessoa humana, soberania e cidadania.',
      'Construir sociedade livre, justa e solidária; garantir o desenvolvimento nacional; promover o bem de todos.',
      'Defesa da paz, não intervenção e igualdade entre os Estados.',
      'Cidadania, dignidade da pessoa humana e livre iniciativa.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Os objetivos fundamentais do art. 3º sempre se iniciam por verbos: construir uma sociedade livre, justa e solidária (I); garantir o desenvolvimento nacional (II); e promover o bem de todos (IV). As demais opções trazem fundamentos (art. 1º) ou princípios das relações internacionais (art. 4º).'
  },
  {
    id: 6,
    enunciado: '6. Constitui princípio que rege as relações internacionais do Brasil:',
    alternativas: [
      'Pluralismo político.',
      'Dignidade da pessoa humana.',
      'Prevalência dos direitos humanos.',
      'Cidadania.',
      'Valores sociais do trabalho.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A "prevalência dos direitos humanos" está expressamente prevista no art. 4º, inciso II, como princípio orientador das relações internacionais. Pluralismo político, dignidade da pessoa humana, cidadania e valores sociais do trabalho são fundamentos do art. 1º.'
  },
  {
    id: 7,
    enunciado: '7. João afirmou: “A erradicação da pobreza e a redução das desigualdades sociais e regionais são fundamentos da República.” Considerando a Constituição Federal, a afirmação de João está:',
    alternativas: [
      'correta, pois tais elementos estão no art. 1º.',
      'correta, pois fundamentos e objetivos possuem a mesma natureza constitucional.',
      'incorreta, pois se trata de princípio das relações internacionais.',
      'incorreta, pois são objetivos fundamentais previstos no art. 3º.',
      'incorreta, pois não estão previstos na Constituição.'
    ],
    correta: 3, // D
    explicacao: '✅ Gabarito: D. A afirmação de João está incorreta porque erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais constituem OBJETIVO FUNDAMENTAL previsto no art. 3º, inciso III, da CF/88, e não fundamento do art. 1º.'
  },
  {
    id: 8,
    enunciado: '8. De acordo com a Constituição Federal, todo o poder emana:',
    alternativas: [
      'da União.',
      'dos Poderes da República.',
      'do Congresso Nacional.',
      'do povo.',
      'dos Estados.'
    ],
    correta: 3, // D
    explicacao: '✅ Gabarito: D. Art. 1º, parágrafo único, da CF/88: "Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição" (princípio da soberania popular).'
  },
  {
    id: 9,
    enunciado: '9. A respeito dos princípios que regem as relações internacionais do Brasil, assinale a alternativa incorreta:',
    alternativas: [
      'Defesa da paz.',
      'Não intervenção.',
      'Igualdade entre os Estados.',
      'Solução pacífica dos conflitos.',
      'Supremacia econômica brasileira.'
    ],
    correta: 4, // E
    explicacao: '✅ Gabarito: E. A "supremacia econômica brasileira" NÃO existe no texto constitucional. O art. 4º consagra a igualdade entre os Estados (inciso V) e a cooperação entre os povos para o progresso da humanidade (inciso IX), e não qualquer supremacia.'
  },
  {
    id: 10,
    enunciado: '10. Um servidor público afirma que “pluralismo político” e “prevalência dos direitos humanos” pertencem ao mesmo grupo de princípios constitucionais. Considerando os arts. 1º e 4º da Constituição, a afirmação é:',
    alternativas: [
      'correta, pois ambos são objetivos fundamentais.',
      'correta, pois ambos são fundamentos.',
      'incorreta, pois pluralismo político é fundamento e prevalência dos direitos humanos é princípio das relações internacionais.',
      'incorreta, pois ambos são objetivos fundamentais.',
      'incorreta, pois pluralismo político não está previsto na Constituição.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Incorreta: o pluralismo político é um fundamento da República Federativa do Brasil (art. 1º, V), ao passo que a prevalência dos direitos humanos é um princípio que rege o Brasil em suas relações internacionais (art. 4º, II).'
  }
];

export const direitoConstTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. A soberania, a cidadania e a dignidade da pessoa humana estão entre os fundamentos da República Federativa do Brasil.',
    correta: true,
    explicacao: '✅ Gabarito: CERTO. Os três constam expressamente do rol de cinco fundamentos do art. 1º da CF/88 (incisos I, II e III).'
  },
  {
    id: 12,
    enunciado: '12. Os Poderes Legislativo, Executivo e Judiciário são independentes e harmônicos entre si.',
    correta: true,
    explicacao: '✅ Gabarito: CERTO. Literalidade do art. 2º da Constituição da República de 1988.'
  },
  {
    id: 13,
    enunciado: '13. A construção de uma sociedade livre, justa e solidária constitui princípio das relações internacionais do Brasil.',
    correta: false,
    explicacao: '✅ Gabarito: ERRADO. Construir uma sociedade livre, justa e solidária é um OBJETIVO FUNDAMENTAL previsto no art. 3º, inciso I, da CF/88, e não princípio das relações internacionais (art. 4º).'
  },
  {
    id: 14,
    enunciado: '14. A República Federativa do Brasil rege-se, em suas relações internacionais, pela prevalência dos direitos humanos, pela defesa da paz e pela solução pacífica dos conflitos.',
    correta: true,
    explicacao: '✅ Gabarito: CERTO. Todos constam expressamente do art. 4º da CF/88: inciso II (prevalência dos direitos humanos), inciso VI (defesa da paz) e inciso VII (solução pacífica dos conflitos).'
  },
  {
    id: 15,
    enunciado: '15. O pluralismo político constitui um dos objetivos fundamentais da República Federativa do Brasil.',
    correta: false,
    explicacao: '✅ Gabarito: ERRADO. O pluralismo político é FUNDAMENTO da República Federativa do Brasil (art. 1º, inciso V), e não objetivo fundamental (que estão no art. 3º).'
  }
];

export const direitoConstDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique a diferença entre fundamentos da República e objetivos fundamentais, apresentando pelo menos dois exemplos de cada.',
    respostaEsperada: 'Gabarito Oficial: Os Fundamentos (art. 1º) representam as bases estruturantes, valores e pilares sobre os quais o Estado brasileiro se ergue no presente (ex.: Soberania e Dignidade da pessoa humana). Já os Objetivos Fundamentais (art. 3º) consagram metas programáticas e fins a serem perseguidos ativamente pelo Estado para transformar a realidade social (ex.: Construir uma sociedade livre, justa e solidária e Erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais). Gramaticalmente, os fundamentos são substantivos e os objetivos iniciam-se por verbos de ação no infinitivo.'
  },
  {
    id: 17,
    enunciado: '17. Explique o significado da expressão “Estado Democrático de Direito” e sua relação com o exercício do poder público.',
    respostaEsperada: 'Gabarito Oficial: "Estado de Direito" significa a submissão de governantes e governados ao império da Constituição e das leis (legalidade estrita). A qualificação "Democrático" agrega a legitimação popular do poder ("todo poder emana do povo"), a participação cidadã direta e indireta, a garantia efetiva dos direitos fundamentais e o pluralismo político. Assim, o poder público só pode ser exercido nos limites da lei e com vistas a garantir a dignidade humana e o bem comum.'
  },
  {
    id: 18,
    enunciado: '18. Explique o que significa dizer que os Poderes da União são independentes e harmônicos entre si.',
    respostaEsperada: 'Gabarito Oficial: Significa que Legislativo, Executivo e Judiciário possuem esferas próprias de competência constitucional e independência orgânica/funcional, não havendo qualquer relação de subordinação hierárquica entre eles. A harmonia expressa a necessidade de colaboração mútua e equilíbrio institucional, operando por meio do sistema de freios e contrapesos (checks and balances), no qual um poder fiscaliza e modera o outro nos limites expressos pela CF/88.'
  },
  {
    id: 19,
    enunciado: '19. Escolha três princípios das relações internacionais previstos no art. 4º da Constituição e explique o significado de cada um.',
    respostaEsperada: 'Gabarito Oficial: O aluno pode escolher três entre os dez princípios do art. 4º, por exemplo:\n1) Prevalência dos direitos humanos (inciso II): coloca a proteção e a dignidade do ser humano como guia imperativo na atuação externa e celebração de tratados;\n2) Não intervenção (inciso IV): respeito à soberania de outros países, vedando interferências indevidas em assuntos internos de outros Estados;\n3) Defesa da paz e Solução pacífica dos conflitos (incisos VI e VII): priorização da diplomacia, mediação e arbitragem internacional em detrimento da guerra.'
  },
  {
    id: 20,
    enunciado: '20. Um cidadão procura um órgão público para exercer um direito, mas o servidor responsável pelo atendimento se recusa a prestar o serviço por motivo discriminatório. Com base nos princípios fundamentais estudados, explique quais fundamentos ou objetivos constitucionais podem ser relacionados à situação e justifique sua resposta.',
    respostaEsperada: 'Gabarito Oficial: A conduta discriminatória do servidor viola frontalmente:\n1) A Dignidade da pessoa humana (art. 1º, III, fundamento): o cidadão é tratado de forma degradante e desigual;\n2) A Cidadania (art. 1º, II, fundamento): é impedido o pleno exercício de um direito legítimo;\n3) O Objetivo de promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação (art. 3º, IV, objetivo fundamental).\nO servidor atua em desconformidade com os postulados do Estado Democrático de Direito, ensejando responsabilização funcional e civil.'
  }
];

export const direitoConstSummaryPoints = [
  'Art. 1º — Fundamentos da República: SO-CI-DI-VA-PL (Soberania, Cidadania, Dignidade da pessoa humana, Valores sociais do trabalho e da livre iniciativa, Pluralismo político).',
  'Art. 1º, Parágrafo Único: Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente (plebiscito, referendo, iniciativa popular).',
  'Art. 2º — Poderes da União: Legislativo, Executivo e Judiciário — são INDEPENDENTES E HARMÔNICOS entre si (sem hierarquia nem subordinação).',
  'Art. 3º — Objetivos Fundamentais: CON-GAR-ERR-PRO (Construir sociedade livre, justa e solidária; Garantir o desenvolvimento nacional; Erradicar a pobreza e marginalização + reduzir desigualdades; Promover o bem de todos sem preconceitos).',
  'Diferença FGV/Cebraspe: Fundamentos (art. 1º) são substantivos e bases do Estado; Objetivos (art. 3º) são verbos no infinitivo e metas a atingir.',
  'Art. 4º — Relações Internacionais: 10 princípios (Independência nacional, Direitos humanos, Autodeterminação, Não intervenção, Igualdade entre Estados, Paz, Solução pacífica, Repúdio ao terrorismo/racismo, Cooperação, Asilo político).',
  'Art. 4º, Parágrafo Único: O Brasil buscará a integração econômica, política, social e cultural dos povos da América Latina visando à formação de uma comunidade latino-americana de nações.',
  'Dominar nesta Aula 01: Diferença clara entre fundamento (art. 1º) e objetivo (art. 3º); os 3 Poderes e harmonia; parágrafo único do art. 1º e do art. 4º.'
];

export const direitoConstVideoPracticalTask = {
  tema: 'Princípios Fundamentais (Arts. 1º a 4º da CF/88) ⚖️',
  disciplina: 'Direito Constitucional',
  modalidade: 'Atividade Prática — Fixação (Atendimento TJAM com envio ao WhatsApp do Professor)',
  situacaoPratica: 'Imagine que você seja um servidor do Tribunal de Justiça do Amazonas (TJAM) e esteja atendendo um cidadão que procura o setor para buscar informação sobre um serviço público, mas tem dificuldade de compreensão e precisa de orientação adequada e humanizada.',
  perguntas: [
    '1. Escolha DOIS conteúdos estudados na Aula 01 (ex.: Cidadania, Dignidade da Pessoa Humana, Independência dos Poderes, Objetivo do art. 3º, etc.).',
    '2. Explique o que cada um deles significa conforme o texto constitucional.',
    '3. Relacione-os diretamente com a situação concreta do atendimento ao cidadão no TJAM.',
    '4. Explique como esse fundamento ou objetivo orienta a conduta ética e empática de um servidor público judiciário.'
  ],
  desafioFinal: 'Demonstrar na prática que você compreendeu o conteúdo dos arts. 1º a 4º da CF/88 e consegue aplicá-lo em uma situação real de atendimento público no Tribunal de Justiça.',
  entrega: 'Preencha o modelo e envie pelo WhatsApp ao professor para feedback da aplicação prática dos princípios constitucionais.'
};
