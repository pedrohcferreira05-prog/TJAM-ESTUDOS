// Data for Legislação do TJAM — Aula 1: Estrutura do Poder Judiciário do Amazonas (LC 261/2023)

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
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

export const legislacaoTjamFlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é a principal lei que disciplina a Organização Judiciária do Estado do Amazonas?',
    a: 'A Lei Complementar Estadual nº 261/2023, consolidada com alterações posteriores (2024, 2025 e 2026).'
  },
  {
    q: 'Quais matérias são tratadas pela Lei Complementar nº 261/2023?',
    a: '1) Divisão e organização judiciária do AM;\n2) Organização da Magistratura;\n3) Serviços auxiliares da Justiça;\n4) Estrutura dos serviços notariais e de registro.'
  },
  {
    q: 'Quais são os órgãos integrantes do Poder Judiciário do Amazonas (Art. 3º da LC 261/2023)?',
    a: '• Tribunal de Justiça (TJAM)\n• Turmas Recursais dos Juizados Especiais\n• Tribunais do Júri\n• Juízes de Direito\n• Juízes Substitutos de Carreira\n• Auditoria Militar e respectivos Conselhos\n• Juízes de Paz'
  },
  {
    q: 'Onde fica a sede do Tribunal de Justiça do Amazonas e qual a sua extensão territorial?',
    a: 'Sede na capital Manaus e jurisdição sobre todo o território do Estado do Amazonas.'
  },
  {
    q: 'Quais são os órgãos que compõem o Tribunal de Justiça do Amazonas (TJAM)?',
    a: '• Tribunal Pleno\n• Câmaras Reunidas\n• Câmaras Isoladas (Cíveis e Criminais)\n• Presidência\n• Vice-Presidência\n• Corregedoria-Geral de Justiça'
  },
  {
    q: 'Como são estruturadas as Câmaras Isoladas no TJAM?',
    a: 'Dividem-se em:\n- Câmaras Cíveis: 1ª, 2ª e 3ª Câmaras Cíveis\n- Câmaras Criminais: 1ª e 2ª Câmaras Criminais'
  },
  {
    q: 'Como o Estado do Amazonas é dividido para fins de administração da Justiça?',
    a: 'O Estado divide-se em Comarcas e Termos Judiciários, conforme critérios de densidade demográfica, extensão territorial e movimento forense previstos em lei.'
  },
  {
    q: 'Qual a atribuição essencial da Corregedoria-Geral de Justiça do TJAM?',
    a: 'Atividade de fiscalização, correição disciplinar, acompanhamento e orientação dos serviços judiciais de 1ª instância e serviços notariais/registrais extrajudiciais.'
  },
  {
    q: 'Quais são as principais competências originárias do Tribunal Pleno do TJAM?',
    a: 'Processar e julgar autoridades com prerrogativa de foro (Governador em crimes comuns, Juízes, Promotores, Secretários de Estado), Ações Diretas de Inconstitucionalidade de leis estaduais/municipais em face da Constituição Estadual, e eleição dos órgãos diretivos.'
  },
  {
    q: 'O Governador do Estado ou membros do Ministério Público integram o Poder Judiciário do AM?',
    a: 'NÃO. O Governador integra o Poder Executivo e o Ministério Público é instituição autônoma essencial à Justiça, não integrando a estrutura orgânica do Poder Judiciário.'
  }
];

export const legislacaoTjamMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A Lei de Organização Judiciária do Estado do Amazonas é atualmente disciplinada, principalmente, pela:',
    opcoes: [
      'A) LC nº 261/2023.',
      'B) Lei nº 8.112/1990.',
      'C) Lei nº 9.099/1995.',
      'D) LC nº 35/1979.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A Lei Complementar nº 261/2023 é a nova Lei de Organização Judiciária do Estado do Amazonas, consolidada com alterações posteriores.'
  },
  {
    id: 2,
    enunciado: '2. A sede do Tribunal de Justiça do Amazonas está localizada em:',
    opcoes: [
      'A) Parintins.',
      'B) Itacoatiara.',
      'C) Manaus.',
      'D) Tefé.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. A sede do Tribunal de Justiça do Amazonas está localizada na capital do Estado, em Manaus.'
  },
  {
    id: 3,
    enunciado: '3. A jurisdição do TJAM alcança:',
    opcoes: [
      'A) Apenas Manaus.',
      'B) Apenas a região metropolitana.',
      'C) Todo o Estado do Amazonas.',
      'D) Apenas as comarcas do interior.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. O Tribunal de Justiça do Amazonas possui jurisdição em todo o território do Estado do Amazonas.'
  },
  {
    id: 4,
    enunciado: '4. Integra o Poder Judiciário do Estado do Amazonas:',
    opcoes: [
      'A) Tribunal de Justiça.',
      'B) Congresso Nacional.',
      'C) Tribunal de Contas da União.',
      'D) Senado Federal.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. O Tribunal de Justiça (TJAM) é o órgão de cúpula integrante do Poder Judiciário estadual.'
  },
  {
    id: 5,
    enunciado: '5. Entre os órgãos integrantes do Poder Judiciário do Amazonas estão:',
    opcoes: [
      'A) TJAM, Turmas Recursais, Tribunais do Júri e Juízes de Direito.',
      'B) Senado, Câmara dos Deputados e TJAM.',
      'C) Ministério Público, Defensoria Pública e TJAM.',
      'D) Polícia Civil, Polícia Militar e TJAM.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Conforme o art. 3º da LC nº 261/2023, integram o Poder Judiciário estadual o TJAM, as Turmas Recursais, os Tribunais do Júri e os Juízes de Direito (além de Juízes Substitutos, Auditoria Militar e Conselhos, e Juízes de Paz).'
  },
  {
    id: 6,
    enunciado: '6. As Turmas Recursais dos Juizados Especiais:',
    opcoes: [
      'A) Integram o Poder Executivo.',
      'B) Integram o Poder Judiciário do Amazonas.',
      'C) Integram o Poder Legislativo.',
      'D) Não fazem parte da estrutura judiciária.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. As Turmas Recursais dos Juizados Especiais integram expressamente o Poder Judiciário do Amazonas (art. 3º, II da LC 261/2023).'
  },
  {
    id: 7,
    enunciado: '7. Os Tribunais do Júri:',
    opcoes: [
      'A) Integram o Poder Judiciário do Amazonas.',
      'B) São órgãos do Poder Legislativo.',
      'C) São órgãos administrativos do Executivo.',
      'D) Integram exclusivamente o Poder Judiciário Federal.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Os Tribunais do Júri integram a estrutura do Poder Judiciário do Amazonas (art. 3º, III da LC 261/2023).'
  },
  {
    id: 8,
    enunciado: '8. São órgãos da estrutura do Tribunal de Justiça do Amazonas:',
    opcoes: [
      'A) Tribunal Pleno, Câmaras Reunidas e Câmaras Isoladas.',
      'B) Senado, Câmara e Tribunal Pleno.',
      'C) Ministério Público, Defensoria e Tribunal Pleno.',
      'D) Polícia Civil, Polícia Militar e Câmaras Isoladas.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Na estrutura judicante do TJAM estão o Tribunal Pleno, as Câmaras Reunidas e as Câmaras Isoladas.'
  },
  {
    id: 9,
    enunciado: '9. Entre os órgãos da administração do TJAM encontram-se:',
    opcoes: [
      'A) Presidência, Vice-Presidência e Corregedoria-Geral de Justiça.',
      'B) Presidência da República, Senado e Câmara.',
      'C) Ministério Público e Defensoria Pública.',
      'D) Governo do Estado e Assembleia Legislativa.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Os órgãos de direção e administração de cúpula do TJAM são a Presidência, a Vice-Presidência e a Corregedoria-Geral de Justiça.'
  },
  {
    id: 10,
    enunciado: '10. O Tribunal Pleno é:',
    opcoes: [
      'A) Órgão do Tribunal de Justiça.',
      'B) Órgão do Poder Executivo.',
      'C) Órgão do Ministério Público.',
      'D) Órgão do Poder Legislativo.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. O Tribunal Pleno é o órgão colegiado máximo do Tribunal de Justiça do Amazonas.'
  },
  {
    id: 11,
    enunciado: '11. As Câmaras Isoladas fazem parte:',
    opcoes: [
      'A) Do Poder Executivo.',
      'B) Da estrutura do Tribunal de Justiça.',
      'C) Da Assembleia Legislativa.',
      'D) Do Ministério Público.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. As Câmaras Isoladas (Cíveis e Criminais) compõem a estrutura fracionária julgadora do Tribunal de Justiça.'
  },
  {
    id: 12,
    enunciado: '12. Entre as Câmaras Isoladas previstas na estrutura do TJAM encontram-se:',
    opcoes: [
      'A) Câmaras Cíveis e Câmaras Criminais.',
      'B) Câmaras Tributárias exclusivamente.',
      'C) Câmaras Eleitorais exclusivamente.',
      'D) Câmaras Federais exclusivamente.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. No TJAM existem 3 Câmaras Cíveis (1ª, 2ª e 3ª) e 2 Câmaras Criminais (1ª e 2ª).'
  },
  {
    id: 13,
    enunciado: '13. A Corregedoria-Geral de Justiça está relacionada principalmente:',
    opcoes: [
      'A) À atividade de fiscalização e orientação dos serviços judiciais e extrajudiciais, conforme suas competências legais.',
      'B) À elaboração das leis estaduais.',
      'C) À administração do Poder Executivo.',
      'D) À atividade legislativa federal.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A Corregedoria-Geral de Justiça exerce funções de correição, fiscalização, disciplina e orientação administrativa dos serviços da Justiça de 1º grau e dos cartórios extrajudiciais.'
  },
  {
    id: 14,
    enunciado: '14. A divisão judiciária do Estado do Amazonas envolve:',
    opcoes: [
      'A) Comarcas e Termos Judiciários.',
      'B) Apenas municípios.',
      'C) Apenas distritos policiais.',
      'D) Apenas regiões administrativas do Executivo.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Para a administração do Poder Judiciário, o território do Estado do Amazonas divide-se em Comarcas e Termos Judiciários.'
  },
  {
    id: 15,
    enunciado: '15. Assinale a alternativa que não corresponde a órgão do Poder Judiciário do Amazonas:',
    opcoes: [
      'A) Juízes de Direito.',
      'B) Juízes Substitutos de Carreira.',
      'C) Juízes de Paz.',
      'D) Governador do Estado.'
    ],
    correta: 3,
    explicacao: 'Gabarito Oficial: D. O Governador do Estado é a autoridade máxima do Poder Executivo estadual e não integra a estrutura do Poder Judiciário.'
  },
  {
    id: 16,
    enunciado: '16. A Auditoria Militar e seus respectivos Conselhos:',
    opcoes: [
      'A) Integram a estrutura prevista para o Poder Judiciário do Amazonas.',
      'B) Pertencem ao Poder Legislativo.',
      'C) São órgãos do Governo Federal.',
      'D) Não possuem relação com o Poder Judiciário.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A Auditoria Militar e seus respectivos Conselhos de Justiça integram formalmente a estrutura do Poder Judiciário estadual (art. 3º, VI da LC 261/2023).'
  },
  {
    id: 17,
    enunciado: '17. Sobre a organização do TJAM, assinale a alternativa correta:',
    opcoes: [
      'A) O Tribunal possui órgãos destinados ao exercício da atividade jurisdicional e à sua administração.',
      'B) O TJAM exerce somente funções administrativas.',
      'C) O TJAM é subordinado ao Poder Executivo estadual.',
      'D) O TJAM pertence à União.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. O TJAM possui órgãos jurisdicionais (Pleno, Câmaras Reunidas, Câmaras Cíveis e Criminais) e órgãos de administração/gestão (Presidência, Vice-Presidência, Corregedoria).'
  },
  {
    id: 18,
    enunciado: '18. Assinale a alternativa correta:',
    opcoes: [
      'A) O TJAM possui jurisdição restrita à capital.',
      'B) O TJAM é o Tribunal de Justiça do Estado do Amazonas e possui jurisdição em todo o Estado.',
      'C) O TJAM é órgão do Poder Legislativo.',
      'D) O TJAM possui competência apenas administrativa.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. O Tribunal de Justiça do Estado do Amazonas tem sede em Manaus e jurisdição plena em todo o território amazonense.'
  },
  {
    id: 19,
    enunciado: '19. A organização judiciária do Amazonas disciplina, entre outros aspectos:',
    opcoes: [
      'A) A organização da Magistratura e os serviços auxiliares da Justiça.',
      'B) Somente o funcionamento das polícias.',
      'C) Somente a organização do Poder Executivo.',
      'D) Apenas as eleições municipais.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A LC 261/2023 disciplina a divisão e organização judiciária, a carreira da magistratura, os serviços auxiliares da Justiça e a estrutura notarial e de registro.'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa que reúne órgãos ou estruturas relacionadas ao TJAM:',
    opcoes: [
      'A) Tribunal Pleno, Câmaras, Presidência e Corregedoria-Geral de Justiça.',
      'B) Senado, Presidência da República e Câmara dos Deputados.',
      'C) Governo do Estado, Assembleia Legislativa e Prefeitura.',
      'D) Polícia Federal, Senado e Ministério Público Federal.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. O Tribunal Pleno, as Câmaras Isoladas e Reunidas, a Presidência, a Vice-Presidência e a Corregedoria-Geral de Justiça compõem os órgãos da estrutura do TJAM.'
  }
];

export const legislacaoTjamTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A Lei Complementar nº 261/2023 é a norma fundamental que estabelece a Divisão e a Organização Judiciária do Estado do Amazonas.',
    correta: true,
    explicacao: 'Gabarito Oficial: Verdadeiro. A LC 261/2023 substituiu a legislação anterior e consolida a organização judiciária do Amazonas com atualizações recentes.'
  },
  {
    id: 2,
    enunciado: '2. Os Juízes de Paz e a Auditoria Militar não integram o Poder Judiciário do Amazonas, pertencendo ao Poder Executivo estadual.',
    correta: false,
    explicacao: 'Gabarito Oficial: Falso. Conforme o art. 3º da LC 261/2023, tanto os Juízes de Paz quanto a Auditoria Militar e seus Conselhos integram expressamente o Poder Judiciário do Estado.'
  },
  {
    id: 3,
    enunciado: '3. As Câmaras Isoladas do Tribunal de Justiça do Amazonas são divididas em três Câmaras Cíveis e duas Câmaras Criminais.',
    correta: true,
    explicacao: 'Gabarito Oficial: Verdadeiro. A estrutura interna do TJAM conta com a 1ª, 2ª e 3ª Câmaras Cíveis e com a 1ª e 2ª Câmaras Criminais.'
  },
  {
    id: 4,
    enunciado: '4. O Tribunal de Justiça do Amazonas possui sede na comarca de Parintins e exerce jurisdição restrita à região metropolitana.',
    correta: false,
    explicacao: 'Gabarito Oficial: Falso. A sede do TJAM é na capital Manaus e sua jurisdição abrange todo o território do Estado do Amazonas.'
  }
];

export const legislacaoTjamDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Com base no Art. 3º da Lei Complementar Estadual nº 261/2023, enumere os órgãos que integram o Poder Judiciário do Estado do Amazonas e explique a diferença entre órgãos de 2º Grau (Tribunal) e órgãos de 1º Grau.',
    respostaEsperada: 'Gabarito Oficial: Segundo o art. 3º da LC 261/2023, integram o Judiciário do AM: 1) TJAM; 2) Turmas Recursais; 3) Tribunais do Júri; 4) Juízes de Direito; 5) Juízes Substitutos de Carreira; 6) Auditoria Militar e seus Conselhos; 7) Juízes de Paz. O TJAM atua como órgão de 2º Grau (jurisdição recursal e competências originárias privativas), enquanto os Juízes de Direito, Substitutos, Tribunais do Júri e Juizados Especiais atuam na 1ª Instância (porta de entrada da prestação jurisdicional perante as Comarcas).'
  },
  {
    id: 2,
    enunciado: '2. Explique o papel constitucional e institucional da Corregedoria-Geral de Justiça no âmbito do Poder Judiciário do Amazonas, ressaltando suas funções perante a Justiça de 1º Grau e perante os serviços notariais e de registro.',
    respostaEsperada: 'Gabarito Oficial: A Corregedoria-Geral de Justiça (CGJ/AM) é órgão de fiscalização, disciplina, correição e orientação administrativa. Ela inspeciona e orienta os trabalhos dos magistrados de primeiro grau, dos servidores dos fóruns e varas das comarcas da capital e do interior, além de exercer a fiscalização direta sobre as serventias extrajudiciais (cartórios de registro civil, notas, imóveis e protestos de todo o Estado).'
  }
];

export const legislacaoTjamSummaryPoints: string[] = [
  'Norma Regente: Lei Complementar Estadual nº 261/2023 (nova Lei de Organização Judiciária do Estado do Amazonas).',
  'Sede e Jurisdição: Sede localizada na capital Manaus e jurisdição plena sobre todo o território do Estado do Amazonas.',
  'Órgãos Integrantes do Judiciário do AM (Art. 3º): TJAM, Turmas Recursais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos de Carreira, Auditoria Militar e Conselhos, e Juízes de Paz.',
  'Órgãos do TJAM: Tribunal Pleno, Câmaras Reunidas, Câmaras Isoladas (1ª, 2ª e 3ª Cível; 1ª e 2ª Criminal), Presidência, Vice-Presidência e Corregedoria-Geral de Justiça.',
  'Divisão Judiciária Territorial: O Estado divide-se em Comarcas e Termos Judiciários.',
  'Corregedoria-Geral de Justiça: Órgão responsável pela fiscalização, correição, disciplina e orientação da 1ª Instância e dos cartórios extrajudiciais.'
];
