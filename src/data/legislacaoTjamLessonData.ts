// Data for Legislação Institucional e do Poder Judiciário — Aula 02: Lei Complementar Estadual nº 261/2023
// Preparatório TJAM — Assistente Judiciário
// Nível Intermediário • Quinta-feira • 2ª Aula do Dia

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
  opcoes: string[];
  alternativas?: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
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

export interface PracticalTaskConfig {
  title: string;
  scenario: string;
  instruction: string;
  ramificacoes: {
    titulo: string;
    explicacao: string;
    exemplo: string;
  }[];
  deadline: string;
  officialSourceUrl: string;
}

export const legislacaoTjamFlashcardsData: FlashcardItem[] = [
  {
    id: 1,
    q: 'O que é a Lei Complementar Estadual nº 261/2023?',
    a: 'É a Lei Judiciária do Estado do Amazonas que disciplina a divisão e a organização judiciária estadual, o regime jurídico da magistratura e os serviços auxiliares. Entrou em vigor em 01/01/2024 e substituiu a antiga LC nº 17/1997.',
    frente: 'O que é a Lei Complementar Estadual nº 261/2023?',
    verso: 'É a Lei Judiciária do Estado do Amazonas que disciplina a divisão e a organização judiciária estadual, o regime jurídico da magistratura e os serviços auxiliares. Entrou em vigor em 01/01/2024 e substituiu a antiga LC nº 17/1997.',
    categoria: 'Conceito e Vigência',
    dica: 'Substituiu a antiga LC nº 17/1997 em 1º de janeiro de 2024.'
  },
  {
    id: 2,
    q: 'Qual a diferença entre a LC nº 261/2023 e o Regimento Interno do TJAM?',
    a: 'A LC nº 261/2023 é lei complementar estadual que estrutura toda a Justiça do Amazonas (comarcas, varas, servidores, magistratura). O Regimento Interno (Resolução TJAM) é norma interna de auto-organização focada nas rotinas e sessões do Tribunal.',
    frente: 'Qual a diferença entre a LC nº 261/2023 e o Regimento Interno do TJAM?',
    verso: 'A LC nº 261/2023 é lei complementar estadual que estrutura toda a Justiça do Amazonas (comarcas, varas, servidores, magistratura). O Regimento Interno (Resolução TJAM) é norma interna de auto-organização focada nas rotinas e sessões do Tribunal.',
    categoria: 'Distinção Normativa',
    dica: 'Atenção para não confundir na prova: uma é lei estadual e a outra é resolução interna.'
  },
  {
    id: 3,
    q: 'Quais matérias a LC nº 261/2023 regulamenta no Estado do Amazonas?',
    a: '1) Organização dos órgãos do Poder Judiciário; 2) Divisão judiciária em comarcas e termos; 3) Estrutura e competências; 4) Regime jurídico da magistratura; 5) Serviços auxiliares da Justiça; 6) Serviços notariais e de registro.',
    frente: 'Quais matérias a LC nº 261/2023 regulamenta no Estado do Amazonas?',
    verso: '1) Organização dos órgãos do Poder Judiciário; 2) Divisão judiciária em comarcas e termos; 3) Estrutura e competências; 4) Regime jurídico da magistratura; 5) Serviços auxiliares da Justiça; 6) Serviços notariais e de registro.',
    categoria: 'Abrangência da Lei',
    dica: 'Lembre-se dos 5 ramos do mapa conceitual!'
  },
  {
    id: 4,
    q: 'O que é Comarca segundo a organização judiciária do Amazonas?',
    a: 'É a unidade territorial de organização da Justiça estadual, que delimita a área de atuação jurisdicional e pode abranger um ou mais municípios contíguos.',
    frente: 'O que é Comarca segundo a organização judiciária do Amazonas?',
    verso: 'É a unidade territorial de organização da Justiça estadual, que delimita a área de atuação jurisdicional e pode abranger um ou mais municípios contíguos.',
    categoria: 'Divisão Judiciária',
    dica: 'Comarca não é sinônimo de município; uma comarca pode abranger múltiplos municípios.'
  },
  {
    id: 5,
    q: 'O que é Termo Judiciário e o que é Unidade Judiciária?',
    a: '• Termo Judiciário: fração territorial vinculada à organização de uma comarca.\n• Unidade Judiciária: estrutura material em que são exercidas as atividades judiciais, como varas e juizados.',
    frente: 'O que é Termo Judiciário e o que é Unidade Judiciária?',
    verso: '• Termo Judiciário: fração territorial vinculada à organização de uma comarca.\n• Unidade Judiciária: estrutura material em que são exercidas as atividades judiciais, como varas e juizados.',
    categoria: 'Conceitos Operacionais',
    dica: 'Varas e Juizados são Unidades Judiciárias.'
  },
  {
    id: 6,
    q: 'Quais são os órgãos do Poder Judiciário do Amazonas (art. 3º da LC nº 261/2023)?',
    a: '1) Tribunal de Justiça;\n2) Turmas Recursais dos Juizados Especiais;\n3) Tribunais do Júri;\n4) Juízes de Direito;\n5) Juízes Substitutos de Carreira;\n6) Auditoria Militar e respectivos Conselhos;\n7) Juízes de Paz.',
    frente: 'Quais são os órgãos do Poder Judiciário do Amazonas (art. 3º da LC nº 261/2023)?',
    verso: '1) Tribunal de Justiça;\n2) Turmas Recursais dos Juizados Especiais;\n3) Tribunais do Júri;\n4) Juízes de Direito;\n5) Juízes Substitutos de Carreira;\n6) Auditoria Militar e respectivos Conselhos;\n7) Juízes de Paz.',
    categoria: 'Órgãos Judiciais',
    dica: 'Ministério Público e Defensoria Pública NÃO integram o rol do Judiciário!'
  },
  {
    id: 7,
    q: 'A organização judiciária pode ser alterada informalmente por servidores ou decisão local?',
    a: 'NÃO! A divisão judiciária, criação, alteração ou extinção de comarcas e unidades deve observar estritamente a reserva legal da LC nº 261/2023 e a Constituição.',
    frente: 'A organização judiciária pode ser alterada informalmente por servidores ou decisão local?',
    verso: 'NÃO! A divisão judiciária, criação, alteração ou extinção de comarcas e unidades deve observar estritamente a reserva legal da LC nº 261/2023 e a Constituição.',
    categoria: 'Legalidade e Reserva Legal',
    dica: 'Segurança jurídica e garantia do juiz natural impedem alterações informais.'
  },
  {
    id: 8,
    q: 'Qual é a finalidade geral dos serviços auxiliares da Justiça?',
    a: 'Apoiar o funcionamento das atividades judiciais, assegurando o cumprimento de atos processuais, movimentação de autos, atendimento ao público e assessoria aos magistrados.',
    frente: 'Qual é a finalidade geral dos serviços auxiliares da Justiça?',
    verso: 'Apoiar o funcionamento das atividades judiciais, assegurando o cumprimento de atos processuais, movimentação de autos, atendimento ao público e assessoria aos magistrados.',
    categoria: 'Serviços Auxiliares',
    dica: 'É aqui que se insere a função do Assistente Judiciário do TJAM.'
  },
  {
    id: 9,
    q: 'A que se destinam os serviços notariais e de registro segundo a legislação?',
    a: 'À realização de atos de registro público, formalização documental e atribuição de autenticidade, publicidade, segurança e eficácia aos negócios e relações jurídicas.',
    frente: 'A que se destinam os serviços notariais e de registro segundo a legislação?',
    verso: 'À realização de atos de registro público, formalização documental e atribuição de autenticidade, publicidade, segurança e eficácia aos negócios e relações jurídicas.',
    categoria: 'Serviços Notariais e Registrais',
    dica: 'São serviços exercidos em caráter privado por delegação do poder público (art. 236 da CF).'
  },
  {
    id: 10,
    q: 'Como se classificam as comarcas do Amazonas quanto à entrância?',
    a: 'Classificam-se em Primeira Entrância (comarcas do interior do Estado) e Segunda Entrância (Capital do Estado - Manaus).',
    frente: 'Como se classificam as comarcas do Amazonas quanto à entrância?',
    verso: 'Classificam-se em Primeira Entrância (comarcas do interior do Estado) e Segunda Entrância (Capital do Estado - Manaus).',
    categoria: 'Entrâncias',
    dica: 'Duas entrâncias na lei: Primeira (interior) e Segunda (Manaus).'
  }
];

export const legislacaoTjamMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Qual é a principal finalidade da Lei Complementar Estadual nº 261/2023?',
    opcoes: [
      'A) Regulamentar exclusivamente o Direito Penal.',
      'B) Disciplinar a organização judiciária do Estado do Amazonas.',
      'C) Criar a Constituição Federal.',
      'D) Regulamentar exclusivamente os concursos públicos federais.'
    ],
    alternativas: [
      'Regulamentar exclusivamente o Direito Penal.',
      'Disciplinar a organização judiciária do Estado do Amazonas.',
      'Criar a Constituição Federal.',
      'Regulamentar exclusivamente os concursos públicos federais.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A Lei Complementar Estadual nº 261/2023 tem como principal finalidade disciplinar a organização e divisão judiciária do Estado do Amazonas, o regime jurídico da magistratura e a organização dos serviços auxiliares da Justiça, substituindo a antiga LC nº 17/1997.'
  },
  {
    id: 2,
    enunciado: '2. A comarca é:',
    opcoes: [
      'A) Uma unidade territorial de organização da Justiça.',
      'B) Um órgão do Poder Executivo.',
      'C) Uma instituição policial.',
      'D) Um tipo de recurso judicial.'
    ],
    alternativas: [
      'Uma unidade territorial de organização da Justiça.',
      'Um órgão do Poder Executivo.',
      'Uma instituição policial.',
      'Um tipo de recurso judicial.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. A comarca é a unidade territorial de organização da Justiça estadual, que delimita a área de jurisdição e pode abranger um ou mais municípios contíguos.'
  },
  {
    id: 3,
    enunciado: '3. Qual alternativa apresenta um órgão do Poder Judiciário do Amazonas?',
    opcoes: [
      'A) Ministério da Fazenda.',
      'B) Tribunal de Justiça do Amazonas.',
      'C) Polícia Rodoviária Federal.',
      'D) Câmara Municipal.'
    ],
    alternativas: [
      'Ministério da Fazenda.',
      'Tribunal de Justiça do Amazonas.',
      'Polícia Rodoviária Federal.',
      'Câmara Municipal.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O Tribunal de Justiça do Estado do Amazonas (TJAM) é o órgão de cúpula do Poder Judiciário estadual, expressamente previsto no art. 3º da LC nº 261/2023.'
  },
  {
    id: 4,
    enunciado: '4. A organização judiciária estabelece regras relacionadas:',
    opcoes: [
      'A) Somente à aplicação de multas de trânsito.',
      'B) À estrutura e à organização das unidades e dos órgãos judiciais.',
      'C) Exclusivamente às eleições municipais.',
      'D) Apenas aos contratos particulares.'
    ],
    alternativas: [
      'Somente à aplicação de multas de trânsito.',
      'À estrutura e à organização das unidades e dos órgãos judiciais.',
      'Exclusivamente às eleições municipais.',
      'Apenas aos contratos particulares.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A organização judiciária define as regras estruturais e funcionais das unidades e órgãos do Poder Judiciário, fixando competências, divisão territorial e regimes de serviço.'
  },
  {
    id: 5,
    enunciado: '5. Os serviços auxiliares da Justiça têm como finalidade geral:',
    opcoes: [
      'A) Substituir todos os magistrados.',
      'B) Apoiar o funcionamento das atividades judiciais.',
      'C) Elaborar leis federais.',
      'D) Exercer exclusivamente funções policiais.'
    ],
    alternativas: [
      'Substituir todos os magistrados.',
      'Apoiar o funcionamento das atividades judiciais.',
      'Elaborar leis federais.',
      'Exercer exclusivamente funções policiais.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A finalidade geral dos serviços auxiliares (secretarias, gabinetes, assistentes judiciários, técnicos) é dar suporte operacional, técnico e administrativo ao funcionamento das atividades jurisdicionais.'
  },
  {
    id: 6,
    enunciado: '6. Sobre a legislação institucional do TJAM, assinale a alternativa correta:',
    opcoes: [
      'A) A LC nº 261/2023 é idêntica ao Regimento Interno do Tribunal.',
      'B) A organização judiciária é definida apenas por decisões informais.',
      'C) A LC nº 261/2023 é uma norma estadual relacionada à organização judiciária do Amazonas.',
      'D) A lei se aplica exclusivamente aos tribunais federais.'
    ],
    alternativas: [
      'A LC nº 261/2023 é idêntica ao Regimento Interno do Tribunal.',
      'A organização judiciária é definida apenas por decisões informais.',
      'A LC nº 261/2023 é uma norma estadual relacionada à organização judiciária do Amazonas.',
      'A lei se aplica exclusivamente aos tribunais federais.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A LC nº 261/2023 é uma norma estadual (Lei Complementar) que disciplina a organização judiciária do Amazonas, não se confundindo com o Regimento Interno nem se aplicando à Justiça Federal.'
  },
  {
    id: 7,
    enunciado: '7. A criação ou alteração de unidades judiciárias deve:',
    opcoes: [
      'A) Respeitar as normas legais aplicáveis.',
      'B) Depender exclusivamente da vontade de um servidor.',
      'C) Ser realizada por qualquer cidadão.',
      'D) Dispensar previsão normativa.'
    ],
    alternativas: [
      'Respeitar as normas legais aplicáveis.',
      'Depender exclusivamente da vontade de um servidor.',
      'Ser realizada por qualquer cidadão.',
      'Dispensar previsão normativa.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. A criação, alteração ou extinção de unidades judiciárias obedece ao princípio da reserva legal e deve respeitar estritamente as disposições da legislação de organização judiciária aplicável (LC nº 261/2023).'
  },
  {
    id: 8,
    enunciado: '8. Os serviços notariais e de registro estão relacionados, entre outras atividades, a:',
    opcoes: [
      'A) Atos de registro e formalização documental previstos em lei.',
      'B) Julgamento de todos os processos criminais.',
      'C) Comando das forças policiais.',
      'D) Elaboração de sentenças por qualquer cidadão.'
    ],
    alternativas: [
      'Atos de registro e formalização documental previstos em lei.',
      'Julgamento de todos os processos criminais.',
      'Comando das forças policiais.',
      'Elaboração de sentenças por qualquer cidadão.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. Os serviços notariais e de registro (cartórios extrajudiciais) destinam-se a conferir publicidade, autenticidade, segurança e eficácia aos atos jurídicos e de formalização documental previstos em lei.'
  }
];

export const legislacaoTjamTfQuestionsData: TfQuestionItem[] = [
  {
    id: 9,
    enunciado: '9. ( ) A LC nº 261/2023 trata da organização judiciária do Amazonas.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. A LC nº 261/2023 é a Lei Judiciária do Estado do Amazonas que disciplina a organização e divisão judiciária estadual.'
  },
  {
    id: 10,
    enunciado: '10. ( ) O Regimento Interno do TJAM e a Lei Judiciária estadual são necessariamente a mesma norma.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. Não são a mesma norma. A Lei Judiciária (LC nº 261/2023) é lei estadual de organização geral da Justiça; o Regimento Interno é resolução autônoma do Tribunal que regula o funcionamento interno de suas sessões e rotinas.'
  },
  {
    id: 11,
    enunciado: '11. ( ) A organização judiciária envolve a estrutura territorial e institucional da Justiça.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. Compreende a divisão territorial (comarcas e termos) e a estrutura orgânica (órgãos julgadores, competências, magistratura e serviços auxiliares).'
  },
  {
    id: 12,
    enunciado: '12. ( ) Os serviços auxiliares contribuem para o funcionamento da Justiça.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. Os serviços auxiliares prestam indispensável suporte operacional e administrativo para a realização dos atos e decisões judiciais.'
  },
  {
    id: 13,
    enunciado: '13. ( ) Uma comarca e um município são conceitos que necessariamente possuem o mesmo significado.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. Município é divisão político-administrativa do Estado. Comarca é divisão de competência judiciária, podendo abranger um ou mais municípios.'
  },
  {
    id: 14,
    enunciado: '14. ( ) A organização das unidades judiciárias deve observar a legislação aplicável.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. A estruturação das unidades judiciais deve observar expressamente as regras e procedimentos da LC nº 261/2023 e as balizas constitucionais.'
  }
];

export const legislacaoTjamDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 15,
    enunciado: '15. Um cidadão afirma que a organização da Justiça estadual pode ser alterada informalmente por qualquer servidor. Explique por que essa afirmação está incorreta.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA afirmação está incorreta porque a organização judiciária estadual é matéria submetida ao princípio da reserva legal. A estruturação, criação, alteração ou extinção de comarcas, varas e unidades judiciárias exige lei formal em sentido estrito (Lei Complementar de iniciativa privativa do Tribunal de Justiça, conforme arts. 96 e 125 da CF/88 e a Constituição Estadual). Nenhuma autoridade ou servidor pode alterar informalmente a divisão da Justiça, sob pena de nulidade e violação ao princípio do juiz natural.'
  },
  {
    id: 16,
    enunciado: '16. Uma região precisa reorganizar o atendimento judicial. Explique por que a legislação de organização judiciária é importante nesse processo.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nA legislação de organização judiciária (LC nº 261/2023) é importante porque estabelece critérios formais, técnicos e objetivos para a criação, elevação, desmembramento ou agregação de comarcas, termos e varas. Isso assegura segurança jurídica, prévia dotação orçamentária, definição da competência jurisdicional e garantia do acesso à Justiça de forma estruturada e eficiente para a população regional.'
  },
  {
    id: 17,
    enunciado: '17. Um candidato confunde a LC nº 261/2023 com o Regimento Interno do TJAM. Explique a diferença geral entre esses dois instrumentos normativos.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n• LC nº 261/2023 (Lei Complementar Estadual): É uma lei formal estadual aprovada pela Assembleia Legislativa do Amazonas mediante proposta privativa do TJAM. Disciplina a organização de todo o Poder Judiciário do Amazonas, divisão em comarcas, entrâncias, regime dos magistrados e serviços auxiliares.\n• Regimento Interno do TJAM: É um ato administrativo interno de auto-organização aprovado pelo próprio Tribunal Pleno (Resolução interna). Tem como finalidade disciplinar a ordem interna dos processos, competência dos órgãos fracionários (câmaras e seções), sessões de julgamento e funções dos dirigentes do Tribunal.'
  },
  {
    id: 18,
    enunciado: '18. Explique, com suas palavras, como os serviços auxiliares contribuem para o funcionamento das unidades judiciais.',
    respostaEsperada: 'Gabarito Oficial TJAM:\nOs serviços auxiliares fornecem toda a infraestrutura operacional e técnica necessária para a prestação jurisdicional. São exercidos por servidores do tribunal (analistas, assistentes judiciários, técnicos e oficiais de justiça) que realizam o atendimento ao público, recebimento e autuação de petições, juntada de documentos, expedição de mandados e notificações, cumprimento de decisões e redação de atos de expediente. Esse apoio permite que os magistrados se dediquem à atividade-fim do julgamento com celeridade e qualidade.'
  },
  {
    id: 19,
    enunciado: '19. Apresente um exemplo fictício de uma situação relacionada à organização judiciária e explique qual aspecto da legislação precisaria ser consultado.',
    respostaEsperada: 'Gabarito Oficial TJAM (Exemplo Padrão):\n• Exemplo Fictício: A comarca de Tefé registra um substancial crescimento de ações cíveis e criminais, gerando acúmulo de processos e demora nos julgamentos. A administração do TJAM estuda a criação de uma 2ª Vara Judicial na localidade.\n• Aspecto Legal a Consultar: Deve ser consultada a LC nº 261/2023 quanto aos requisitos objetivos para criação de nova vara judicial (volume de distribuição anual, critérios de entrância, fixação de competência especializada, número de eleitores e habitantes), além do processo legal de iniciativa legislativa do Tribunal Pleno e dotação orçamentária.'
  },
  {
    id: 20,
    enunciado: '20. Cite três assuntos relacionados à organização judiciária que um candidato ao concurso do TJAM deve estudar na legislação aplicável.',
    respostaEsperada: 'Gabarito Oficial TJAM:\n1) Órgãos do Poder Judiciário do Amazonas (art. 3º da LC nº 261/2023) e suas competências no 1º e 2º Graus;\n2) Divisão e organização territorial em Comarcas, Termos Judiciários e classificação das entrâncias (1ª Entrância no interior e 2ª Entrância na Capital);\n3) Organização dos Serviços Auxiliares da Justiça, regime jurídico da magistratura e regras sobre serviços notariais e de registro.'
  }
];

export const legislacaoTjamSummaryPoints: string[] = [
  'O que é a LC nº 261/2023: Lei estadual que disciplina a divisão e a organização judiciária do Amazonas, o regime jurídico da magistratura e a organização dos serviços auxiliares da Justiça. Entrou em vigor em 01/01/2024 e substituiu a antiga LC nº 17/1997.',
  'Não confunda na prova: A LC nº 261/2023 é lei complementar estadual de organização judiciária; não deve ser confundida com o antigo Código nem com o Regimento Interno do TJAM, que é norma regimental interna.',
  'O que a lei regulamenta: 1) Órgãos do Poder Judiciário estadual; 2) Divisão judiciária em comarcas e termos; 3) Estrutura e competências; 4) Regime jurídico da magistratura; 5) Serviços auxiliares da Justiça; 6) Serviços notariais e de registro.',
  'Conceitos fundamentais da Divisão Judiciária: Comarca (unidade territorial que pode abranger um ou mais municípios), Termo Judiciário (fração territorial vinculada a uma comarca) e Unidade Judiciária (estruturas de atividade judicial, como varas e juizados).',
  'Órgãos do Poder Judiciário do Amazonas (Art. 3º): TJAM, Turmas Recursais dos Juizados Especiais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos de Carreira, Auditoria Militar e respectivos Conselhos, e Juízes de Paz.',
  'Aplicação Prática da Lei: A criação, alteração ou reorganização de unidades judiciárias depende de reserva legal e observância estrita da LC nº 261/2023, não dependendo de decisões informais locais.',
  'Serviços Auxiliares e Assistente Judiciário: Apoiam diretamente o funcionamento das unidades judiciais, atuando na tramitação, cumprimento de decisões e suporte ao gabinete e secretarias.',
  'Serviços Notariais e de Registro: Serviços extrajudiciais delegados pelo poder público para conferir fé pública, formalização e autenticidade aos atos jurídicos.'
];

export const legislacaoTjamPracticalTask: PracticalTaskConfig = {
  title: 'Atividade Prática Obrigatória — Produção Individual do Mapa Conceitual',
  scenario: 'Mapa Conceitual da LC nº 261/2023 e Resumo da Aula (TJAM 2026)',
  instruction: 'Crie um mapa conceitual da LC nº 261/2023 com o título no centro e cinco ramificações: 1) Órgãos do Poder Judiciário; 2) Comarcas e termos judiciários; 3) Magistratura; 4) Serviços auxiliares; 5) Serviços notariais e de registro. Em cada ramificação, escreva uma explicação com suas próprias palavras e acrescente um exemplo prático. Depois, elabore um resumo do que aprendeu e por que essa lei é importante para o TJAM.',
  deadline: 'Hoje até 19h30',
  officialSourceUrl: 'https://www.tjam.jus.br/index.php/transparencia/gestao/atos-normativos-e-legislacao-correlata?ano=2023&numero=261&start=0&tipo%5B%5D=495',
  ramificacoes: [
    {
      titulo: '1. Órgãos do Poder Judiciário',
      explicacao: 'Enumera os órgãos que exercem a jurisdição estadual conforme o art. 3º da LC 261/2023 (TJAM, Turmas Recursais, Júri, Juízes de Direito, Juízes Substitutos, Auditoria Militar e Juízes de Paz).',
      exemplo: 'O TJAM como órgão de cúpula com sede em Manaus julgando apelações de todas as comarcas do interior.'
    },
    {
      titulo: '2. Comarcas e Termos Judiciários',
      explicacao: 'Divisão territorial do Estado para administração judiciária. A comarca abrange um ou mais municípios; o termo judiciário vincula-se a uma comarca.',
      exemplo: 'Comarca de Manacapuru prestando atendimento e abrangendo termos judiciários contíguos.'
    },
    {
      titulo: '3. Magistratura',
      explicacao: 'Regime jurídico, garantias, deveres, promoção, vitaliciedade e atribuições dos magistrados de Primeiro e Segundo Graus no Amazonas.',
      exemplo: 'Juiz Substituto de Carreira assumindo titularidade em comarca de Primeira Entrância após concurso público.'
    },
    {
      titulo: '4. Serviços Auxiliares',
      explicacao: 'Estruturas de apoio administrativo, cartorário e técnico essenciais para o cumprimento das decisões judiciais e atendimento aos jurisdicionados.',
      exemplo: 'Assistente Judiciário elaborando minutas e movimentando autos no sistema do TJAM.'
    },
    {
      titulo: '5. Serviços Notariais e de Registro',
      explicacao: 'Serviços extrajudiciais de notas e registros públicos delegados que conferem autenticidade, publicidade e segurança aos atos jurídicos.',
      exemplo: 'Cartório de Registro de Imóveis registrando escrituras públicas de compra e venda de imóvel em Manaus.'
    }
  ]
};

export const legislacaoTjamVideoInfo = {
  title: 'Legislação Institucional e do Poder Judiciário — Aula 02: Lei Complementar Estadual nº 261/2023',
  subtitle: 'Quinta-feira • 2ª aula do dia • Nível intermediário — TJAM Assistente Judiciário',
  videoUrl: 'https://www.youtube.com/embed/m1pl6Uc5mzQ?autoplay=0&rel=0',
  videoId: 'm1pl6Uc5mzQ',
  externalUrl: 'https://www.youtube.com/live/m1pl6Uc5mzQ?is=FkVdxpKFYPhjEwea',
  duration: '50 min'
};
