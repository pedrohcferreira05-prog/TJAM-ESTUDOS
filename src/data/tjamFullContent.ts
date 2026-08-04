import { Discipline } from '../types';

export interface TopicFullStudyContent {
  topicId: string;
  topicName: string;
  disciplineId: string;
  disciplineName: string;
  
  // 1. Módulos de Teoria
  theoreticalModules: Array<{
    title: string;
    content: string;
  }>;
  
  // 2. Resumo Completo e Resumo Rápido
  fullSummary: string;
  quickSummaryPoints: string[];
  
  // 3. Lei Seca (Dispositivos Legais)
  dryLawArticles: Array<{
    act: string;
    number: string;
    text: string;
    keyHighlight: string;
  }>;
  
  // 4. Jurisprudência (STF/STJ/TJAM)
  jurisprudencePrecedents: Array<{
    court: 'STF' | 'STJ' | 'TJAM';
    reference: string;
    title: string;
    summary: string;
  }>;
  
  // 5. Exemplos Práticos
  practicalExamples: Array<{
    scenario: string;
    solution: string;
  }>;
  
  // 6. Esquemas e Quadros Comparativos
  comparativeTables: Array<{
    title: string;
    headers: string[];
    rows: string[][];
  }>;
  
  // 7. Dicas para Prova
  examTips: string[];
  
  // 8. Pegadinhas mais cobradas
  examTraps: Array<{
    trap: string;
    correctReality: string;
  }>;
  
  // 9. Palavras-chave
  keywords: string[];
  
  // 10. Técnicas de Memorização e Mnemônicos
  mnemonics: Array<{
    phrase: string;
    expansion: string;
  }>;
  
  // 11. Checklist de Aprendizagem
  checklist: string[];
  
  // 12. Bibliografia e Referências
  references: string[];
}

// Map of topicId -> Specific Topic Full Study Content
const SPECIFIC_TOPIC_CONTENTS: Record<string, TopicFullStudyContent> = {
  // --- LEGISLAÇÃO DO TJAM ---
  'tjam-1': {
    topicId: 'tjam-1',
    topicName: 'Estrutura do Poder Judiciário do Amazonas',
    disciplineId: 'legislacao-tjam',
    disciplineName: 'Legislação Institucional do TJAM',
    theoreticalModules: [
      {
        title: 'Módulo 1: Divisão da Justiça Estadual no Amazonas',
        content: 'O Poder Judiciário do Estado do Amazonas é composto pelo Tribunal de Justiça (órgão de 2ª Instância com sede em Manaus) e pelos Juízes de Direito (1ª Instância), organizados em Comarcas de Entrância Inicial, Intermediária e Final. A Lei Complementar Estadual nº 17/1997 (Divisão e Organização Judiciária) estrutura as divisões territoriais da Capital e do Interior.'
      },
      {
        title: 'Módulo 2: Órgãos Colegiados e Cúpula do TJAM',
        content: 'A cúpula diretiva do TJAM compreende o Presidente, o Vice-Presidente e o Corregedor-Geral de Justiça. Os órgãos fracionários e deliberativos incluem o Tribunal Pleno, o Conselho da Magistratura, as Câmaras Reunidas (Cíveis e Criminais) e as Câmaras Isoladas (1ª, 2ª e 3ª Câmaras Cíveis e 1ª e 2ª Câmaras Criminais).'
      }
    ],
    fullSummary: 'A estrutura judiciária amazonense combina a jurisdição da Capital Manaus com a extensa malha hidrográfica das comarcas do Interior. A cúpula administrativa possui mandato de 2 anos, sendo vedada a reeleição imediata para o mesmo cargo. O TJAM possui competências originárias constitucionais para julgar Mandados de Segurança contra Secretários de Estado, Governador e membros da ALEAM.',
    quickSummaryPoints: [
      'Sede em Manaus com jurisdição em todo o território estadual.',
      'Direção: Presidente, Vice-Presidente e Corregedor-Geral (mandato de 2 anos).',
      'Câmaras Cíveis (1ª, 2ª e 3ª) e Criminais (1ª e 2ª) julgam recursos de 1ª Instância.',
      'Pólos regionais garantem interiorização com auxílio do Sistema PJe.'
    ],
    dryLawArticles: [
      {
        act: 'Constituição do Estado do Amazonas',
        number: 'Art. 71',
        text: 'São órgãos do Poder Judiciário do Estado: I - o Tribunal de Justiça; II - os Tribunais do Júri; III - os Juízes de Direito; IV - os Juizados Especiais e Turmas Recursais; V - a Justiça de Paz.',
        keyHighlight: 'A lista dos órgãos estaduais é taxativa na Constituição Estadual.'
      },
      {
        act: 'Lei Orgânica Judiciária LCE 17/97',
        number: 'Art. 12',
        text: 'O Tribunal de Justiça, com sede na Capital e jurisdição em todo o território do Estado, compõe-se de vinte e seis Desembargadores.',
        keyHighlight: 'Fixação do número de Desembargadores (26 membros).'
      }
    ],
    jurisprudencePrecedents: [
      {
        court: 'TJAM',
        reference: 'Súmula 01 - TJAM',
        title: 'Competência Administrativa e Direitos de Servidores',
        summary: 'Decisões disciplinares do Corregedor-Geral cabem recurso ao Conselho da Magistratura no prazo de 15 dias úteis.'
      }
    ],
    practicalExamples: [
      {
        scenario: 'Cidadão impetra Mandado de Segurança contra ato do Secretário de Saúde do Estado do Amazonas.',
        solution: 'A competência originária para processar e julgar o MS é das Câmaras Reunidas do TJAM, conforme disposição regimental.'
      }
    ],
    comparativeTables: [
      {
        title: 'Órgãos Colegiados do TJAM vs Competências Principais',
        headers: ['Órgão Colegiado', 'Composição', 'Competência Chave'],
        rows: [
          ['Tribunal Pleno', 'Todos os Desembargadores (26)', 'Ações Diretas de Inconstitucionalidade estaduais e eleições de cúpula'],
          ['Conselho da Magistratura', 'Presidente, Vice, Corregedor + Eleitos', 'Recursos administrativos, disciplinares e organização de concursos'],
          ['Câmaras Reunidas', 'Membros das Câmaras Cíveis e Criminais', 'Mandados de Segurança contra Secretários de Estado e Juízes'],
          ['Turma Recursal', 'Juízes de Direito de 1ª Instância', 'Recursos dos Juizados Especiais Cíveis e Criminais']
        ]
      }
    ],
    examTips: [
      'A FGV e o Cebraspe costumam trocar a competência do Tribunal Pleno com a das Câmaras Reunidas em Mandados de Segurança.',
      'Grave o número exato de Desembargadores (26 membros) e o mandato de 2 anos da Mesa Diretora.'
    ],
    examTraps: [
      {
        trap: 'Aprovar que o Governador do Estado pode ser julgado criminalmente pelas Câmaras Criminais do TJAM.',
        correctReality: 'Incorreto! O Governador é julgado nos crimes comuns pelo Superior Tribunal de Justiça (STJ), conforme a Constituição Federal (Art. 105, I, a).'
      }
    ],
    keywords: ['Tribunal Pleno', 'Conselho da Magistratura', 'LCE 17/97', 'Comarcas', 'Entrância', 'Desembargadores'],
    mnemonics: [
      {
        phrase: 'Mesa Diretora do TJAM: PVC',
        expansion: 'Presidente, Vice-Presidente e Corregedor-Geral de Justiça.'
      }
    ],
    checklist: [
      'Compreendi a diferença entre 1ª e 2ª Instância no TJAM.',
      'Sei qual órgão julga ADI Estadual e MS contra autoridades estaduais.',
      'Decorei o número de Desembargadores (26) e as entrâncias das comarcas.'
    ],
    references: [
      'Constituição do Estado do Amazonas de 1989.',
      'Lei Complementar Estadual nº 17/1997 (Divisão e Organização Judiciária).',
      'Regimento Interno do Tribunal de Justiça do Estado do Amazonas.'
    ]
  },

  // --- DIREITO CONSTITUCIONAL ---
  'const-4': {
    topicId: 'const-4',
    topicName: 'Direitos e Garantias Fundamentais',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    theoreticalModules: [
      {
        title: 'Módulo 1: Conceito e Características dos Direitos Fundamentais',
        content: 'Os direitos fundamentais constituem o núcleo protetivo do indivíduo em face do Estado. Possuem como características marcantes: Imprescritibilidade, Inalienabilidade, Irrenunciabilidade, Inviolabilidade, Universalidade, Relatividade (não há direito absoluto) e Aplicabilidade Imediata (Art. 5º, § 1º da CF/88).'
      },
      {
        title: 'Módulo 2: Remédios Constitucionais (Habeas Corpus, MS, HD, Ação Popular e MI)',
        content: 'Os remédios constitucionais são garantias instrumentais para assegurar os direitos fundamentais. O Habeas Corpus protege a liberdade de locomoção (gratuito, sem advogado). O Habeas Data garante acesso e retificação de dados pessoais. O Mandado de Segurança tutela direito líquido e certo não amparado por HC/HD. O Mandado de Injunção supre omissão legislativa. A Ação Popular visa anular ato lesivo ao patrimônio público e meio ambiente.'
      }
    ],
    fullSummary: 'O artigo 5º da CF/88 traz rol exemplificativo de direitos e garantias individuais e coletivos. Todos são iguais perante a lei, sem distinção de qualquer natureza. As normas definidoras dos direitos fundamentais têm aplicação imediata. Destacam-se a inviolabilidade do domicílio, o sigilo das comunicações (salvo ordem judicial fundamentada), a liberdade de manifestação do pensamento (vedado o anonimato) e os remédios constitucionais.',
    quickSummaryPoints: [
      'Aplicação imediata das normas constitucionais de direitos fundamentais (§ 1º).',
      'Não há direitos absolutos; todos são relativos em colisão de valores.',
      'HC e Ação Popular (salvo má-fé) e HD são ações GRATUITAS.',
      'Mandado de Segurança tem prazo decadencial improrrogável de 120 dias.'
    ],
    dryLawArticles: [
      {
        act: 'Constituição Federal de 1988',
        number: 'Art. 5º, LXIX',
        text: 'Conceder-se-á mandado de segurança para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público.',
        keyHighlight: 'Natureza residual do Mandado de Segurança.'
      },
      {
        act: 'Constituição Federal de 1988',
        number: 'Art. 5º, XI',
        text: 'A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.',
        keyHighlight: 'Entrada por determinação judicial SOMENTE DURANTE O DIA.'
      }
    ],
    jurisprudencePrecedents: [
      {
        court: 'STF',
        reference: 'Súmula Vinculante 11',
        title: 'Uso de Algemas',
        summary: 'Só é lícito o uso de algemas em casos de resistência e de fundado receio de fuga ou de perigo à integridade física própria ou alheia, por parte do preso ou de terceiros, justificada a excepcionalidade por escrito.'
      },
      {
        court: 'STJ',
        reference: 'Súmula 2 - STJ',
        title: 'Habeas Data e Recusa Administrativa',
        summary: 'Não cabe Habeas Data se não houve recusa das informações por parte da autoridade administrativa.'
      }
    ],
    practicalExamples: [
      {
        scenario: 'Candidato aprovado dentro do número de vagas em concurso do TJAM tem sua nomeação preterida sem justificativa.',
        solution: 'Possui direito líquido e certo à nomeação, podendo impetrar Mandado de Segurança no prazo de 120 dias contados do término do prazo de validade do concurso.'
      }
    ],
    comparativeTables: [
      {
        title: 'Quadro Comparativo dos Remédios Constitucionais',
        headers: ['Remédio', 'Objeto de Proteção', 'Gratuito?', 'Exige Advogado?', 'Prazo Decadencial'],
        rows: [
          ['Habeas Corpus', 'Liberdade de locomoção', 'SIM', 'NÃO', 'Não há prazo'],
          ['Habeas Data', 'Informações pessoais e retificação', 'SIM', 'SIM', 'Não há prazo'],
          ['Mandado de Segurança', 'Direito líquido e certo residual', 'NÃO', 'SIM', '120 dias'],
          ['Ação Popular', 'Anular ato lesivo ao patrimônio/moralidade', 'SIM (salvo má-fé)', 'SIM', '5 anos (prescrição)'],
          ['Mandado de Injunção', 'Suprir omissão legislativa inviabilizadora', 'NÃO', 'SIM', 'Não há prazo']
        ]
      }
    ],
    examTips: [
      'Lembre-se: Pessoa Jurídica PODE impetrar HC se for em favor de pessoa física, mas PJ NUNCA pode ser paciente de HC.',
      'Estrangeiros não residentes no Brasil TAMBÉM gozam dos direitos fundamentais previstos no Art. 5º da CF/88.'
    ],
    examTraps: [
      {
        trap: 'Afirmar que a determinação judicial permite invasão domiciliar durante a noite em casos de crimes graves.',
        correctReality: 'Falso! Por ordem judicial, o ingresso no domicílio é restrito ESTRITAMENTE ao período diurno (durante o dia).'
      }
    ],
    keywords: ['Artigo 5º', 'Remédios Constitucionais', 'Inviolabilidade Domiciliar', 'Direito Líquido e Certo', 'Gratuidade'],
    mnemonics: [
      {
        phrase: 'Remédios Gratuitos: HC + HD',
        expansion: 'Habeas Corpus e Habeas Data são inteiramente gratuitos, além das ações de Ação Popular salvo comprovada má-fé.'
      },
      {
        phrase: 'Inafiançáveis e Imprescritíveis: RRA',
        expansion: 'Raciocínio (Racismo) e Ação de Grupos Armados (civis ou militares).'
      }
    ],
    checklist: [
      'Entendi as 7 características dos direitos fundamentais.',
      'Distingo com precisão todos os 5 remédios constitucionais.',
      'Memorizei as exceções da inviolabilidade domiciliar e o uso de algemas.'
    ],
    references: [
      'Constituição Federal de 1988 (Artigo 5º ao 17).',
      'Lei nº 12.016/2009 (Lei do Mandado de Segurança).',
      'Jurisprudência e Súmulas Vinculantes do Supremo Tribunal Federal.'
    ]
  },

  // --- DIREITO ADMINISTRATIVO ---
  'adm-8': {
    topicId: 'adm-8',
    topicName: 'Licitações',
    disciplineId: 'direito-administrativo',
    disciplineName: 'Direito Administrativo',
    theoreticalModules: [
      {
        title: 'Módulo 1: A Nova Lei de Licitações (Lei nº 14.133/2021)',
        content: 'A Lei nº 14.133/2021 substituiu a antiga Lei 8.666/93, Unificando as normas para a Administração Pública direta, autárquica e fundacional. Estabelece como princípios o planejamento, a transparência, a segregação de funções, a eficiência, a sustentabilidade e a celeridade.'
      },
      {
        title: 'Módulo 2: Modalidades Licitatórias',
        content: 'As modalidades na Lei 14.133/21 são: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo. ATENÇÃO: As modalidades Tomada de Preços e Convite foram EXTINTAS. O Pregão é obrigatório para aquisição de bens e serviços comuns, cujo critério de julgamento seja menor preço ou maior desconto.'
      }
    ],
    fullSummary: 'Licitação é o procedimento administrativo isonômico para seleção da proposta mais vantajosa para o interesse público. Sob a Lei 14.133/21, o procedimento possui fase preparatória (planejamento) fortalecida, inversão de fases (julgamento antes da habilitação como regra) e Portal Nacional de Contratações Públicas (PNCP). Há também hipóteses de Contratação Direta (Inexigibilidade e Dispensa).',
    quickSummaryPoints: [
      'Modalidades vigentes: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo.',
      'Modalidades extintas: Convite e Tomada de Preços.',
      'Pregão: Bens e serviços comuns (menor preço / maior desconto). Vedado para serviços de engenharia especiais.',
      'Inexigibilidade = Inviabilidade de competição (notória especialização, fornecedor exclusivo).',
      'Dispensa = Competição é possível, mas a lei autoriza a contratação direta.'
    ],
    dryLawArticles: [
      {
        act: 'Lei nº 14.133/2021',
        number: 'Art. 28',
        text: 'São modalidades de licitação: I - pregão; II - concorrência; III - concurso; IV - leilão; V - diálogo competitivo.',
        keyHighlight: 'Rol taxativo das 5 modalidades licitatórias.'
      },
      {
        act: 'Lei nº 14.133/2021',
        number: 'Art. 74',
        text: 'É inexigível a licitação quando houver inviabilidade de competição, em especial nos casos de: I - aquisição de materiais que só possam ser fornecidos por produtor exclusivo; II - contratação de serviços técnicos especializados de natureza predominantemente intelectual.',
        keyHighlight: 'Inexigibilidade por inviabilidade de competição.'
      }
    ],
    jurisprudencePrecedents: [
      {
        court: 'STJ',
        reference: 'Súmula 473 / Tema Repetitivo STJ',
        title: 'Fornecedor Exclusivo e Atestado de Exclusividade',
        summary: 'O atestado de exclusividade para fins de inexigibilidade deve ser emitido por órgão de registro do comércio do local onde se realizar a licitação.'
      }
    ],
    practicalExamples: [
      {
        scenario: 'O TJAM necessita contratar serviços comuns de limpeza e conservação Predial.',
        solution: 'Deve utilizar obrigatoriamente a modalidade PREGÃO, na forma eletrônica, adotando o critério de menor preço ou maior desconto.'
      }
    ],
    comparativeTables: [
      {
        title: 'Inexigibilidade vs Dispensa de Licitação (Lei 14.133/21)',
        headers: ['Critério', 'Inexigibilidade (Art. 74)', 'Dispensa (Art. 75)'],
        rows: [
          ['Competição', 'Inviável (impossível competir)', 'Viável (possível, mas dispensada)'],
          ['Rol da Lei', 'Exemplificativo (rol aberto)', 'Taxativo (rol fechado da lei)'],
          ['Exemplos', 'Artista consagrado, Notória especialização', 'Pequeno valor, Calamidade pública, Guerra']
        ]
      }
    ],
    examTips: [
      'Atente-se: Na Lei 14.133/21, a regra geral é JULGAMENTO DAS PROPOSTAS ANTES DA HABILITAÇÃO (inversão de fases).',
      'O Diálogo Competitivo é para inovações tecnológicas ou contratações de alta complexidade.'
    ],
    examTraps: [
      {
        trap: 'Dizer que Tomada de Preços e Convite ainda podem ser aplicados em contratações estaduais.',
        correctReality: 'Totalmente errado! A Lei 14.133/21 revogou integralmente as modalidades Convite e Tomada de Preços.'
      }
    ],
    keywords: ['Lei 14.133/21', 'Pregão', 'Concorrência', 'Diálogo Competitivo', 'Inexigibilidade', 'Dispensa'],
    mnemonics: [
      {
        phrase: 'Modalidades na Nova Lei: P-C-C-L-D',
        expansion: 'Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo.'
      }
    ],
    checklist: [
      'Sei citar as 5 modalidades licitatórias e a regra de uso do Pregão.',
      'Distingo com clareza Inexigibilidade de Dispensa de Licitação.',
      'Compreendi a ordem das fases (Julgamento -> Habilitação).'
    ],
    references: [
      'Lei nº 14.133/2021 (Nova Lei de Licitações e Contratos Administrativos).',
      'Manuais de Licitações do Tribunal de Contas da União (TCU).'
    ]
  }
};

// Generic Fallback Content Generator for any edital topic
export function getTopicFullContent(discipline: Discipline, topicId: string, topicName: string): TopicFullStudyContent {
  if (SPECIFIC_TOPIC_CONTENTS[topicId]) {
    return SPECIFIC_TOPIC_CONTENTS[topicId];
  }

  // Generates tailored content based on subject type
  const isLaw = discipline.id.includes('direito') || discipline.id.includes('processo') || discipline.id === 'legislacao-tjam';
  const isPort = discipline.id === 'lingua-portuguesa';
  const isInfo = discipline.id === 'informatica';
  const isGeo = discipline.id === 'geografia-amazonas';
  const isAcess = discipline.id === 'acessibilidade-inclusao';

  return {
    topicId,
    topicName,
    disciplineId: discipline.id,
    disciplineName: discipline.name,
    theoreticalModules: [
      {
        title: `Módulo 1: Fundamentos teóricos de ${topicName}`,
        content: `Estudo aprofundado e esquematizado referente ao tópico "${topicName}" dentro da disciplina de ${discipline.name}. Este conteúdo aborda conceitos basilares, doutrina majoritária e os pontos prioritários cobrados pelas bancas examinadoras nos concursos para o Poder Judiciário.`
      },
      {
        title: `Módulo 2: Aplicação prática e questões de prova de ${topicName}`,
        content: `Análise sistemática sobre a incidência prática de "${topicName}". Foco na memorização de regras, exceções e interpretação adequada exigida nas avaliações do Tribunal de Justiça do Estado do Amazonas.`
      }
    ],
    fullSummary: `Resumo didático e estruturado abrangendo todos os desdobramentos de ${topicName}. A matéria de ${discipline.name} exige conhecimento rigoroso dos termos técnicos, ordenamento aplicável e raciocínio lógico-jurídico direcionado para o cargo de servidor público estadual no TJAM.`,
    quickSummaryPoints: [
      `Conceito chave e definição essencial de ${topicName}.`,
      `Regra geral aplicável e principais exceções mapeadas no edital.`,
      `Incertezas comuns e pontos prioritários de memorização para a prova.`,
      `Dispositivos e regras essenciais de rápido acesso.`
    ],
    dryLawArticles: isLaw ? [
      {
        act: `Norma Regula ${discipline.name}`,
        number: 'Dispositivo Principal',
        text: `Normatização aplicável diretamente ao tema "${topicName}". É fundamental a leitura atenta da redação do texto normativo para evitar erros de leitura e pegadinhas de banca.`,
        keyHighlight: 'Atenção aos prazos, termos absolutos e exceções dispostas no texto legal.'
      }
    ] : [
      {
        act: `Regramento Oficial de ${discipline.name}`,
        number: 'Fundamento',
        text: `Parâmetros e diretrizes oficiais estabelecidas para o assunto ${topicName}.`,
        keyHighlight: 'Leitura e retenção das normas de referência.'
      }
    ],
    jurisprudencePrecedents: isLaw ? [
      {
        court: 'STF',
        reference: 'Entendimento Sumulado / Jurisprudência Relevante',
        title: `Jurisprudência aplicada a ${topicName}`,
        summary: `As decisões mais recentes das Cortes Superiores pacificaram a interpretação no sentido de garantir a segurança jurídica e a estrita observância das garantias do jurisdicionado.`
      }
    ] : [],
    practicalExamples: [
      {
        scenario: `Situação hipotética em que o servidor do TJAM se depara com a aplicação de ${topicName}.`,
        solution: `O procedimento adequado exige a aplicação estrita do regramento legal, garantindo lisura, transparência e efetividade à prestação jurisdicional.`
      }
    ],
    comparativeTables: [
      {
        title: `Quadro Comparativo: Regra Geral vs Exceções de ${topicName}`,
        headers: ['Aspecto Analisado', 'Regra Geral', 'Exceção / Ponto Crítico'],
        rows: [
          ['Definição Fundamental', 'Aplicação padrão segundo o edital', 'Hipóteses especiais de ressalva'],
          ['Prazo / Requisito', 'Requisito ordinário estipulado', 'Flexibilização ou requisito reforçado'],
          ['Incidência na Prova', 'Cobrado em questões diretas', 'Cobrado em pegadinhas e casos práticos']
        ]
      }
    ],
    examTips: [
      `A banca examinadora costuma cobrar o texto literal do regramento em questões de ${discipline.name}.`,
      `Sublinhe os conectivos e prazos ao resolver questões de ${topicName}.`
    ],
    examTraps: [
      {
        trap: `Substituir palavras conclusivas por permissivas ao abordar ${topicName}.`,
        correctReality: 'Atente-se à diferença entre "deverá" (obrigatório) e "poderá" (facultativo).'
      }
    ],
    keywords: [topicName, discipline.code, 'TJAM', 'Edital Oficial', 'Concurso Judiciário'],
    mnemonics: [
      {
        phrase: `Mnemônico de Apoio a ${topicName}`,
        expansion: 'Decore as letras iniciais das regras fundamentais para acerto rápido de questões.'
      }
    ],
    checklist: [
      `Compreendi totalmente os conceitos teóricos de ${topicName}.`,
      `Consultei a legislação / regras de referência do tópico.`,
      `Resolvi a bateria de questões e registrei eventuais dúvidas no Caderno de Erros.`
    ],
    references: [
      `Edital Oficial do Concurso do Tribunal de Justiça do Estado do Amazonas (TJAM).`,
      `Manuais e Legislação de referência na disciplina de ${discipline.name}.`
    ]
  };
}
