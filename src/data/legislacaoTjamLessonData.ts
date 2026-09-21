// Data for Legislação Institucional do TJAM — Aula 1: Organização Judiciária do Estado do Amazonas (LC 261/2023)
// Nível intermediário — foco em concurso para Assistente Judiciário

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
  alternativas?: string[];
  correta: number;
  explicacao: string;
  tema?: string;
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

export const legislacaoTjamFlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual lei complementar atualmente disciplina a nova organização judiciária do Amazonas?',
    a: 'A Lei Complementar nº 261, de 18 de dezembro de 2023 (LC nº 261/2023), que revogou a antiga LC nº 17/1997.'
  },
  {
    q: 'A quem compete a iniciativa da lei de organização judiciária estadual?',
    a: 'A iniciativa privativa é do Tribunal de Justiça, conforme estabelecido pela Constituição Federal e pela Constituição Estadual.'
  },
  {
    q: 'Qual é o órgão de cúpula do Poder Judiciário do Estado do Amazonas?',
    a: 'O Tribunal de Justiça do Estado do Amazonas (TJAM), com sede na Capital (Manaus) e jurisdição em todo o território estadual.'
  },
  {
    q: 'Quais órgãos integram o Poder Judiciário do Amazonas segundo o art. 3º da LC nº 261/2023?',
    a: '1) Tribunal de Justiça;\n2) Turmas Recursais dos Juizados Especiais;\n3) Tribunais do Júri;\n4) Juízes de Direito;\n5) Juízes Substitutos de Carreira;\n6) Auditoria Militar e respectivos Conselhos;\n7) Juízes de Paz.'
  },
  {
    q: 'O Ministério Público e a Defensoria Pública integram o Poder Judiciário do Amazonas?',
    a: 'NÃO! O MP e a DPE são funções essenciais à Justiça, mas NÃO integram os órgãos do Poder Judiciário (pegadinha clássica de concurso!).'
  },
  {
    q: 'O que os órgãos judiciários podem fazer para assegurar o cumprimento de seus atos e decisões?',
    a: 'Podem requisitar o auxílio da força pública, tendo a autoridade responsável o dever legal de prestar tal auxílio.'
  },
  {
    q: 'Como o Estado do Amazonas está dividido para fins de administração do Poder Judiciário?',
    a: 'Está dividido territorialmente em Comarcas e Termos Judiciários (LC nº 261/2023).'
  },
  {
    q: 'Como se classificam as comarcas do Estado do Amazonas segundo a LC nº 261/2023?',
    a: 'Classificam-se em Primeira Entrância (municípios do interior do Estado) e Segunda Entrância (Capital do Estado - Manaus).'
  },
  {
    q: 'Qual a diferença entre Primeiro e Segundo Graus de jurisdição no Amazonas?',
    a: '• Primeiro Grau: onde, em regra, tramita e se inicia o processo judicial, perante juízes e varas;\n• Segundo Grau: exercido pelo Tribunal de Justiça, responsável pelo julgamento de recursos e ações originárias.'
  },
  {
    q: 'Quais fatores podem definir a competência dos Juízes de Direito?',
    a: 'Matéria, território, pessoa, natureza da causa e legislação específica de organização judiciária.'
  },
  {
    q: 'O que são Varas Judiciais e como são distribuídas?',
    a: 'São unidades judiciárias destinadas ao processamento e julgamento das causas. Uma comarca pode ter uma ou várias varas judiciais especializadas.'
  },
  {
    q: 'Qual o papel dos serviços auxiliares da Justiça?',
    a: 'Fornecem suporte operacional, técnico e administrativo necessário ao desenvolvimento dos processos judiciais e à administração da Justiça estadual.'
  }
];

export const legislacaoTjamMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. De acordo com a LC nº 261/2023, a administração da Justiça compete:',
    opcoes: [
      'Ao Poder Executivo.',
      'Ao Poder Legislativo.',
      'Ao Poder Judiciário, pelos seus órgãos, com a colaboração dos serviços auxiliares judiciais.',
      'Exclusivamente ao Tribunal de Justiça.',
      'Ao Ministério Público.'
    ],
    alternativas: [
      'Ao Poder Executivo.',
      'Ao Poder Legislativo.',
      'Ao Poder Judiciário, pelos seus órgãos, com a colaboração dos serviços auxiliares judiciais.',
      'Exclusivamente ao Tribunal de Justiça.',
      'Ao Ministério Público.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Conforme preceitua a Lei Complementar Estadual nº 261/2023, a administração da Justiça estadual compete ao Poder Judiciário, por meio de seus órgãos jurisdicionais e administrativos, contando com a colaboração dos serviços auxiliares judiciais.'
  },
  {
    id: 2,
    enunciado: '2. NÃO é relacionado entre os órgãos que compõem o Poder Judiciário do Estado do Amazonas:',
    opcoes: [
      'Tribunal de Justiça.',
      'Turmas Recursais dos Juizados Especiais.',
      'Tribunais do Júri.',
      'Ministério Público Estadual.',
      'Juízes de Direito.'
    ],
    alternativas: [
      'Tribunal de Justiça.',
      'Turmas Recursais dos Juizados Especiais.',
      'Tribunais do Júri.',
      'Ministério Público Estadual.',
      'Juízes de Direito.'
    ],
    correta: 3, // D
    explicacao: '✅ Gabarito: D. O Ministério Público Estadual é instituição autônoma e função essencial à Justiça (art. 127 da CF/88), não constando do rol de órgãos do Poder Judiciário estadual do art. 3º da LC nº 261/2023.'
  },
  {
    id: 3,
    enunciado: '3. Segundo a LC nº 261/2023, integram o Poder Judiciário do Estado do Amazonas:',
    opcoes: [
      'Tribunal de Justiça, Ministério Público e Defensoria Pública.',
      'Tribunal de Justiça, Turmas Recursais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos de Carreira, Auditoria Militar e respectivos Conselhos e Juízes de Paz.',
      'Tribunal de Justiça, Tribunal Regional Federal e Tribunal Regional Eleitoral.',
      'Apenas Tribunal de Justiça e Juízes de Direito.',
      'Tribunal de Justiça e Ministério Público.'
    ],
    alternativas: [
      'Tribunal de Justiça, Ministério Público e Defensoria Pública.',
      'Tribunal de Justiça, Turmas Recursais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos de Carreira, Auditoria Militar e respectivos Conselhos e Juízes de Paz.',
      'Tribunal de Justiça, Tribunal Regional Federal e Tribunal Regional Eleitoral.',
      'Apenas Tribunal de Justiça e Juízes de Direito.',
      'Tribunal de Justiça e Ministério Público.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O art. 3º da LC nº 261/2023 lista taxativamente: Tribunal de Justiça; Turmas Recursais dos Juizados Especiais; Tribunais do Júri; Juízes de Direito; Juízes Substitutos de Carreira; Auditoria Militar e respectivos Conselhos; e Juízes de Paz.'
  },
  {
    id: 4,
    enunciado: '4. Para assegurar o cumprimento e a execução de seus atos e decisões, os órgãos judiciários podem:',
    opcoes: [
      'Criar novas leis estaduais.',
      'Requisitar o auxílio da força pública.',
      'Determinar a atuação do Poder Legislativo.',
      'Substituir a autoridade policial.',
      'Suspender a Constituição Estadual.'
    ],
    alternativas: [
      'Criar novas leis estaduais.',
      'Requisitar o auxílio da força pública.',
      'Determinar a atuação do Poder Legislativo.',
      'Substituir a autoridade policial.',
      'Suspender a Constituição Estadual.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. Para assegurar o cumprimento e a execução de seus atos e decisões judiciais, os órgãos judiciários têm a prerrogativa legal de requisitar o auxílio da força pública, a qual deve ser prontamente prestada.'
  },
  {
    id: 5,
    enunciado: '5. A divisão judiciária compreende:',
    opcoes: [
      'Apenas a criação de novas comarcas.',
      'A criação, alteração e extinção de unidades judiciárias, sua classificação e agrupamento.',
      'Exclusivamente a divisão territorial dos municípios.',
      'Apenas a organização administrativa do TJAM.',
      'A criação de órgãos do Poder Executivo.'
    ],
    alternativas: [
      'Apenas a criação de novas comarcas.',
      'A criação, alteração e extinção de unidades judiciárias, sua classificação e agrupamento.',
      'Exclusivamente a divisão territorial dos municípios.',
      'Apenas a organização administrativa do TJAM.',
      'A criação de órgãos do Poder Executivo.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A divisão judiciária compreende a criação, alteração e extinção de unidades judiciárias, bem como sua classificação e agrupamento em comarcas e termos judiciários.'
  },
  {
    id: 6,
    enunciado: '6. Para fins de administração do Poder Judiciário, o Estado do Amazonas está dividido em:',
    opcoes: [
      'Municípios e distritos.',
      'Regiões administrativas.',
      'Comarcas e Termos Judiciários.',
      'Zonas eleitorais e municípios.',
      'Circunscrições federais.'
    ],
    alternativas: [
      'Municípios e distritos.',
      'Regiões administrativas.',
      'Comarcas e Termos Judiciários.',
      'Zonas eleitorais e municípios.',
      'Circunscrições federais.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Conforme expressamente disposto na LC nº 261/2023, para fins de administração do Poder Judiciário, o Estado do Amazonas divide-se em Comarcas e Termos Judiciários.'
  },
  {
    id: 7,
    enunciado: '7. De acordo com a LC nº 261/2023, as comarcas do Amazonas classificam-se em:',
    opcoes: [
      'Primeira, segunda e terceira entrâncias.',
      'Entrância única.',
      'Primeira e segunda entrâncias.',
      'Capital e interior, sem classificação por entrância.',
      'Pequena, média e grande entrância.'
    ],
    alternativas: [
      'Primeira, segunda e terceira entrâncias.',
      'Entrância única.',
      'Primeira e segunda entrâncias.',
      'Capital e interior, sem classificação por entrância.',
      'Pequena, média e grande entrância.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A organização judiciária vigente estabelece duas entrâncias no Amazonas: Primeira e Segunda Entrâncias.'
  },
  {
    id: 8,
    enunciado: '8. Conforme a organização judiciária vigente, são classificadas como Segunda Entrância:',
    opcoes: [
      'As comarcas localizadas nos municípios do interior.',
      'Todas as comarcas do Amazonas.',
      'As comarcas da região metropolitana.',
      'A Capital do Estado.',
      'Apenas as comarcas com mais de uma vara.'
    ],
    alternativas: [
      'As comarcas localizadas nos municípios do interior.',
      'Todas as comarcas do Amazonas.',
      'As comarcas da região metropolitana.',
      'A Capital do Estado.',
      'Apenas as comarcas com mais de uma vara.'
    ],
    correta: 3, // D
    explicacao: '✅ Gabarito: D. A Capital do Estado (Manaus) é classificada como Segunda Entrância, ao passo que as comarcas do interior do Estado integram a Primeira Entrância.'
  },
  {
    id: 9,
    enunciado: '9. A Justiça de Segunda Instância do Estado do Amazonas é constituída:',
    opcoes: [
      'Pelos Juizados Especiais.',
      'Pelos Tribunais do Júri.',
      'Pelo Tribunal de Justiça.',
      'Pelos Juízes de Direito.',
      'Pela Auditoria Militar.'
    ],
    alternativas: [
      'Pelos Juizados Especiais.',
      'Pelos Tribunais do Júri.',
      'Pelo Tribunal de Justiça.',
      'Pelos Juízes de Direito.',
      'Pela Auditoria Militar.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A Justiça de Segunda Instância (segundo grau de jurisdição) do Estado do Amazonas é exercida pelo Tribunal de Justiça do Estado do Amazonas (TJAM).'
  },
  {
    id: 10,
    enunciado: '10. O Tribunal de Justiça do Estado do Amazonas:',
    opcoes: [
      'Possui sede em qualquer município escolhido pela Presidência.',
      'Possui sede na Capital e jurisdição em todo o território do Estado.',
      'Possui jurisdição somente sobre Manaus.',
      'Possui jurisdição sobre todos os Estados da Região Norte.',
      'É órgão integrante do Poder Judiciário Federal.'
    ],
    alternativas: [
      'Possui sede em qualquer município escolhido pela Presidência.',
      'Possui sede na Capital e jurisdição em todo o território do Estado.',
      'Possui jurisdição somente sobre Manaus.',
      'Possui jurisdição sobre todos os Estados da Região Norte.',
      'É órgão integrante do Poder Judiciário Federal.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O TJAM possui sede na Capital (Manaus) e jurisdição plena em todo o território do Estado do Amazonas.'
  }
];

export const legislacaoTjamTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: '11. O Tribunal de Justiça, as Turmas Recursais dos Juizados Especiais e os Tribunais do Júri estão entre os órgãos que compõem o Poder Judiciário do Estado do Amazonas.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. O art. 3º da LC nº 261/2023 prevê expressamente o TJAM, as Turmas Recursais e os Tribunais do Júri como órgãos integrantes do Judiciário estadual.'
  },
  {
    id: 12,
    enunciado: '12. O Ministério Público Estadual integra a relação de órgãos que compõem o Poder Judiciário do Estado do Amazonas prevista no art. 3º da LC nº 261/2023.',
    correta: false,
    explicacao: '❌ Gabarito: Falso. O Ministério Público é instituição autônoma e função essencial à Justiça (art. 127 da CF/88), não integrando o rol de órgãos do Poder Judiciário.'
  },
  {
    id: 13,
    enunciado: '13. O Estado do Amazonas está dividido em Comarcas e Termos Judiciários para fins de administração do Poder Judiciário.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. A LC nº 261/2023 estabelece que a divisão territorial para fins de administração judiciária compreende Comarcas e Termos Judiciários.'
  },
  {
    id: 14,
    enunciado: '14. A divisão judiciária compreende a criação, alteração e extinção de unidades judiciárias, além de sua classificação e agrupamento.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. É a definição material da divisão judiciária prevista na Lei de Organização Judiciária do Estado do Amazonas.'
  },
  {
    id: 15,
    enunciado: '15. A Capital do Estado é classificada como comarca de Segunda Entrância.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. Na sistemática da LC nº 261/2023, as comarcas do interior pertencem à Primeira Entrância, e a comarca da Capital (Manaus) pertence à Segunda Entrância.'
  }
];

export const legislacaoTjamDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: '16. Explique o que significa organização judiciária e qual é a sua importância para o funcionamento do Poder Judiciário do Amazonas.',
    respostaEsperada: 'Gabarito Oficial Esperado: Organização judiciária é o conjunto de normas que estrutura e disciplina o funcionamento do Poder Judiciário, estabelecendo seus órgãos, unidades, competências e divisão territorial. Sua importância para o funcionamento do TJAM é fundamental para determinar claramente quem exerce determinada função, onde ela é exercida e qual órgão possui competência para cada atividade, garantindo a celeridade e a regular prestação da tutela jurisdicional no Estado.'
  },
  {
    id: 17,
    enunciado: '17. Cite os órgãos que compõem o Poder Judiciário do Estado do Amazonas, conforme o art. 3º da LC nº 261/2023.',
    respostaEsperada: 'Gabarito Oficial Esperado: Conforme o art. 3º da LC nº 261/2023, integram o Poder Judiciário do Estado do Amazonas: 1) Tribunal de Justiça; 2) Turmas Recursais dos Juizados Especiais; 3) Tribunais do Júri; 4) Juízes de Direito; 5) Juízes Substitutos de Carreira; 6) Auditoria Militar e respectivos Conselhos; e 7) Juízes de Paz.'
  },
  {
    id: 18,
    enunciado: '18. Explique a diferença entre Comarca e Termo Judiciário dentro da organização judiciária do Amazonas.',
    respostaEsperada: 'Gabarito Oficial Esperado: A comarca corresponde a uma unidade territorial da organização judiciária que delimita a área de atuação da Justiça estadual, podendo abranger um ou mais municípios. Já os Termos Judiciários são divisões territoriais integradas à administração do Poder Judiciário. A LC nº 261/2023 disciplina que o Estado do Amazonas é dividido em Comarcas e Termos Judiciários para fins de administração da Justiça.'
  },
  {
    id: 19,
    enunciado: '19. Explique o que significa dizer que o Tribunal de Justiça possui jurisdição em todo o território do Estado do Amazonas.',
    respostaEsperada: 'Gabarito Oficial Esperado: Significa que o Tribunal de Justiça (TJAM) é o órgão de cúpula da Justiça estadual e sua autoridade jurisdicional se estende a todos os municípios e comarcas que compõem o Estado do Amazonas, embora sua sede administrativa e judicante física esteja situada na Capital (Manaus).'
  },
  {
    id: 20,
    enunciado: '20. Explique a diferença entre Primeira Entrância e Segunda Entrância segundo a LC nº 261/2023.',
    respostaEsperada: 'Gabarito Oficial Esperado: De acordo com a LC nº 261/2023, a Primeira Entrância corresponde às comarcas localizadas nos municípios do interior do Estado do Amazonas, enquanto a Segunda Entrância corresponde exclusivamente à Capital do Estado (Comarca de Manaus).'
  }
];

export const legislacaoTjamSummaryPoints: string[] = [
  '1. O Poder Judiciário do Amazonas: Exerce a função jurisdicional estadual. A CF/88 outorga aos Estados a organização de sua Justiça e confere ao TJ a iniciativa privativa da lei de organização judiciária.',
  '2. LC nº 261/2023 (Nova Lei de Organização Judiciária): Vigente desde 18/12/2023, consolidada com alterações até 2026, revogando expressamente a antiga LC nº 17/1997.',
  '3. Tribunal de Justiça do Amazonas (TJAM): Órgão de cúpula da Justiça estadual (2ª Instância), com sede na Capital (Manaus) e jurisdição em todo o território do Estado.',
  '4. Relação de Órgãos (Art. 3º): TJAM, Turmas Recursais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos de Carreira, Auditoria Militar e Conselhos, e Juízes de Paz.',
  '5. Primeiro e Segundo Graus: 1º grau = início da tramitação perante juízes e varas; 2º grau = Tribunal de Justiça, com competência recursal e originária privativa.',
  '6. Divisão Judiciária Territorial: O território estadual divide-se em Comarcas e Termos Judiciários para fins de administração do Judiciário.',
  '7. Entrâncias das Comarcas: Primeira Entrância = comarcas do interior do Amazonas; Segunda Entrância = Capital do Estado (Manaus).',
  '8. Varas Judiciais: Unidades de processamento e julgamento. Uma comarca pode ter uma ou múltiplas varas judiciais com competências especializadas.',
  '9. Juízes de Direito: Magistrados de 1º grau. Competência definida por matéria, território, pessoa, natureza da causa e legislação específica.',
  '10. Serviços Auxiliares: Fornecem o suporte operacional e administrativo indispensável ao desenvolvimento processual e ao funcionamento dos órgãos jurisdicionais.',
  '11. Importância para Assistente Judiciário: Servidor atua no coração da estrutura judiciária, devendo dominar a organização, divisão, instâncias, comarcas e competências institucionais.'
];
