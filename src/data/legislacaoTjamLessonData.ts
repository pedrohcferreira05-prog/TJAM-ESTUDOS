// Data for Legislação do TJAM — Aula 2: Organização Judiciária do Amazonas: Aprofundamento (LC 261/2023 e Regimento Interno - Res. 62/2023)

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
    q: 'Quantos Desembargadores compõem o Tribunal de Justiça do Estado do Amazonas (TJAM)?',
    a: 'O TJAM é composto por 26 Desembargadores (art. 16 da LC nº 261/2023).'
  },
  {
    q: 'Qual é o tratamento oficial devido ao Tribunal e qual o devido aos Desembargadores?',
    a: '• Ao Tribunal (órgão colegiado): "Egrégio"\n• Aos Desembargadores (membros): "Excelência"\n⚠️ Pegadinha clássica de prova da FGV!'
  },
  {
    q: 'Qual é a sede, a instância e a jurisdição do Tribunal de Justiça do Amazonas?',
    a: '• Instância: 2ª Instância da Justiça Estadual\n• Sede: Capital do Estado (Manaus)\n• Jurisdição: em todo o território do Estado do Amazonas.'
  },
  {
    q: 'Quais são os órgãos julgadores do Tribunal de Justiça do Amazonas segundo a LC nº 261/2023?',
    a: '1) Tribunal Pleno;\n2) Câmaras Isoladas (Cíveis e Criminais);\n3) Câmaras Reunidas.'
  },
  {
    q: 'Como se dividem as Câmaras Isoladas do TJAM por matéria?',
    a: 'Dividem-se em:\n• Câmaras Isoladas Cíveis (matérias de natureza cível);\n• Câmaras Isoladas Criminais (matérias de natureza criminal).\n(Reguladas nos arts. 29 a 40 da LC 261/2023).'
  },
  {
    q: 'Câmaras Isoladas e Câmaras Reunidas são o mesmo órgão?',
    a: 'NÃO! Câmaras Isoladas ≠ Câmaras Reunidas. São estruturas e órgãos julgadores distintos dentro da organização interna do Tribunal.'
  },
  {
    q: 'O que é o Tribunal Pleno do TJAM?',
    a: 'É o órgão colegiado máximo formado pela totalidade dos 26 desembargadores do Tribunal, atuando como órgão julgador e deliberativo superior.'
  },
  {
    q: 'A Escola Superior da Magistratura do Amazonas (ESMAM) integra qual estrutura do Tribunal?',
    a: 'A Escola Superior da Magistratura integra a estrutura administrativa do Tribunal de Justiça.'
  },
  {
    q: 'Quais são os 7 órgãos que integram o Poder Judiciário do Amazonas (Art. 3º da LC 261/2023)?',
    a: '1. Tribunal de Justiça;\n2. Turmas Recursais dos Juizados Especiais;\n3. Tribunais do Júri;\n4. Juízes de Direito;\n5. Juízes Substitutos de Carreira;\n6. Auditoria Militar e respectivos Conselhos;\n7. Juízes de Paz.'
  },
  {
    q: 'Os órgãos judiciários do Amazonas podem requisitar o auxílio da força pública?',
    a: 'SIM. Podem requisitar o auxílio da força pública para assegurar o cumprimento e a execução de seus atos e decisões. Quando requisitada, a autoridade responsável DEVE prestar esse auxílio.'
  },
  {
    q: 'Qual norma disciplina a divisão e organização judiciária e qual substituiu a antiga LC nº 17/1997?',
    a: 'A Lei Complementar nº 261/2023, que revogou e substituiu integralmente a antiga LC nº 17/1997, sendo a legislação vigente e consolidada do TJAM.'
  },
  {
    q: 'Qual resolução corresponde ao novo Regimento Interno do TJAM?',
    a: 'A Resolução nº 62/2023 do Tribunal Pleno corresponde ao novo Regimento Interno do TJAM.'
  },
  {
    q: 'Qual é a diferença de objeto entre a LC nº 261/2023 e o Regimento Interno (Res. 62/2023)?',
    a: '• LC 261/2023: Divisão e organização judiciária, magistratura, serviços auxiliares e cartórios extrajudiciais.\n• Regimento Interno: Composição e funcionamento interno dos órgãos do Tribunal, procedimentos e julgamento de processos de sua competência.'
  },
  {
    q: 'Promotores de Justiça, Defensores Públicos e Policiais integram o Poder Judiciário do Amazonas?',
    a: 'NÃO. O MP e a DPE são funções essenciais à Justiça e as Polícias integram o Poder Executivo. Nenhum deles figura entre os órgãos do Judiciário estadual.'
  },
  {
    q: 'Qual o mnemônico de resumo da estrutura essencial do TJAM?',
    a: 'TJAM = 2ª Instância + Sede em Manaus + 26 Desembargadores + Jurisdição Estadual + Órgãos Julgadores (Pleno + Câmaras Isoladas Cíveis/Criminais + Câmaras Reunidas).'
  },
  {
    q: 'Quem preside o Tribunal Pleno, as Câmaras Reunidas e as Câmaras Isoladas?',
    a: '• Tribunal Pleno: Presidido pelo Presidente do TJAM;\n• Câmaras Reunidas: Presididas pelo Vice-Presidente do TJAM;\n• Câmaras Isoladas: Presididas por um de seus membros eleito conforme o Regimento Interno.'
  },
  {
    q: 'Qual é o quórum de presença dos órgãos julgadores do TJAM e a frequência das sessões ordinárias?',
    a: '• Quórum: Maioria absoluta dos membros para abertura e julgamento;\n• Frequência: 1 sessão ordinária por semana para Pleno, Reunidas e Isoladas.'
  },
  {
    q: 'A quem compete propor ao Poder Legislativo matérias sobre organização e divisão judiciárias?',
    a: 'Compete ao Tribunal Pleno, por intermédio do Presidente do Tribunal de Justiça, propor à Assembleia Legislativa a organização e divisão judiciárias.'
  }
];

export const legislacaoTjamMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Segundo a LC nº 261/2023, a Justiça do Estado do Amazonas compreende:',
    opcoes: [
      'A) Apenas o Tribunal de Justiça e os Juízes de Direito.',
      'B) Tribunal de Justiça, Turmas Recursais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos, Auditoria Militar e outros órgãos previstos em lei.',
      'C) Apenas o Tribunal Pleno e as Câmaras.',
      'D) Tribunal de Justiça, Ministério Público e Defensoria Pública.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. Conforme expressamente previsto no art. 3º da LC nº 261/2023, a Justiça do Estado do Amazonas compreende o Tribunal de Justiça, as Turmas Recursais dos Juizados Especiais, os Tribunais do Júri, os Juízes de Direito, os Juízes Substitutos de Carreira, a Auditoria Militar e seus Conselhos, e os Juízes de Paz (e outros órgãos previstos em lei).'
  },
  {
    id: 2,
    enunciado: '2. A Justiça de segundo grau do Estado do Amazonas é exercida pelo:',
    opcoes: [
      'A) Tribunal Pleno.',
      'B) Tribunal de Justiça.',
      'C) Superior Tribunal de Justiça.',
      'D) Conselho Nacional de Justiça.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. A Justiça de segundo grau (segunda instância) do Estado do Amazonas é exercida pelo Tribunal de Justiça do Estado do Amazonas (TJAM).'
  },
  {
    id: 3,
    enunciado: '3. O Tribunal de Justiça do Amazonas tem sua sede:',
    opcoes: [
      'A) Em Brasília.',
      'B) Em qualquer comarca do Estado.',
      'C) Na Capital do Estado.',
      'D) Exclusivamente em Manaus e no interior.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. Conforme preceitua a legislação de organização judiciária estadual (LC nº 261/2023), o Tribunal de Justiça do Estado do Amazonas tem sua sede na Capital do Estado (Manaus).'
  },
  {
    id: 4,
    enunciado: '4. A jurisdição do TJAM abrange:',
    opcoes: [
      'A) Somente Manaus.',
      'B) Apenas as comarcas da Região Metropolitana.',
      'C) Todo o território do Estado do Amazonas.',
      'D) Apenas as comarcas de segunda entrância.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. O Tribunal de Justiça do Amazonas tem jurisdição em todo o território do Estado do Amazonas.'
  },
  {
    id: 5,
    enunciado: '5. Atualmente, conforme a LC nº 261/2023, o TJAM é composto por:',
    opcoes: [
      'A) 20 desembargadores.',
      'B) 24 desembargadores.',
      'C) 26 desembargadores.',
      'D) 30 desembargadores.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. A LC nº 261/2023 fixa que o Tribunal de Justiça do Estado do Amazonas é constituído por 26 desembargadores.'
  },
  {
    id: 6,
    enunciado: '6. São órgãos julgadores do TJAM:',
    opcoes: [
      'A) Tribunal Pleno, Câmaras Isoladas Cíveis e Criminais e Câmaras Reunidas.',
      'B) Apenas Tribunal Pleno e Câmaras Criminais.',
      'C) Apenas Câmaras Cíveis e Criminais.',
      'D) Tribunal Pleno e Conselho da Magistratura.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Os órgãos colegiados julgadores do TJAM são o Tribunal Pleno, as Câmaras Isoladas (Cíveis e Criminais) e as Câmaras Reunidas.'
  },
  {
    id: 7,
    enunciado: '7. O Tribunal Pleno é presidido pelo:',
    opcoes: [
      'A) Corregedor-Geral de Justiça.',
      'B) Vice-Presidente.',
      'C) Presidente do Tribunal de Justiça.',
      'D) Desembargador mais antigo.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. O Tribunal Pleno, órgão judicante e administrativo supremo do TJAM composto pela totalidade dos desembargadores, é presidido pelo Presidente do Tribunal de Justiça.'
  },
  {
    id: 8,
    enunciado: '8. As Câmaras Reunidas são presididas pelo:',
    opcoes: [
      'A) Presidente do TJAM.',
      'B) Vice-Presidente.',
      'C) Corregedor-Geral.',
      'D) Desembargador mais novo.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. Conforme a organização do Tribunal de Justiça, as Câmaras Reunidas são presididas pelo Vice-Presidente do TJAM.'
  },
  {
    id: 9,
    enunciado: '9. As Câmaras Isoladas são presididas:',
    opcoes: [
      'A) Sempre pelo Presidente do TJAM.',
      'B) Pelo Vice-Presidente.',
      'C) Por um de seus membros, eleito conforme o Regimento Interno.',
      'D) Pelo Corregedor-Geral.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. As Câmaras Isoladas (Cíveis e Criminais) têm seus presidentes eleitos entre seus respectivos integrantes, na forma disciplinada pelo Regimento Interno do TJAM.'
  },
  {
    id: 10,
    enunciado: '10. Os órgãos julgadores do TJAM funcionam, em regra, com a presença de:',
    opcoes: [
      'A) Um terço dos membros.',
      'B) Maioria simples.',
      'C) Maioria absoluta dos membros.',
      'D) Todos os membros.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. Para a realização das sessões de julgamento dos órgãos colegiados do TJAM, exige-se, em regra, o quórum de presença da maioria absoluta de seus membros integrantes.'
  },
  {
    id: 11,
    enunciado: '11. Segundo a LC nº 261/2023, o Tribunal Pleno é um:',
    opcoes: [
      'A) Órgão administrativo externo ao TJAM.',
      'B) Órgão julgador do Tribunal de Justiça.',
      'C) Órgão do Ministério Público.',
      'D) Órgão auxiliar do Poder Executivo.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. O Tribunal Pleno é o órgão julgador colegiado máximo do Tribunal de Justiça, congregando os 26 desembargadores.'
  },
  {
    id: 12,
    enunciado: '12. As Câmaras Isoladas do TJAM são classificadas em:',
    opcoes: [
      'A) Eleitorais e Militares.',
      'B) Cíveis e Criminais.',
      'C) Administrativas e Eleitorais.',
      'D) Trabalhistas e Penais.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. Em razão da matéria, as Câmaras Isoladas do TJAM classificam-se em Câmaras Isoladas Cíveis e Câmaras Isoladas Criminais (arts. 29 a 40 da LC nº 261/2023).'
  },
  {
    id: 13,
    enunciado: '13. Em regra, Tribunal Pleno, Câmaras Reunidas e Câmaras Isoladas realizam:',
    opcoes: [
      'A) Uma sessão ordinária por mês.',
      'B) Uma sessão ordinária por semana.',
      'C) Duas sessões ordinárias por dia.',
      'D) Sessões somente quando convocadas pelo Presidente.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. De acordo com a sistemática organizacional e regimental do TJAM, o Tribunal Pleno, as Câmaras Reunidas e as Câmaras Isoladas realizam, ordinariamente, uma sessão por semana.'
  },
  {
    id: 14,
    enunciado: '14. O tratamento destinado ao Tribunal de Justiça é:',
    opcoes: [
      'A) Ilustríssimo.',
      'B) Magnífico.',
      'C) Egrégio.',
      'D) Excelentíssimo Senhor Doutor Tribunal.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. O tratamento de estilo dispensado ao Tribunal de Justiça (órgão colegiado) é "Egrégio", enquanto a seus magistrados (desembargadores) é "Excelência".'
  },
  {
    id: 15,
    enunciado: '15. Os membros do Tribunal de Justiça recebem o título de:',
    opcoes: [
      'A) Juízes.',
      'B) Ministros.',
      'C) Desembargadores.',
      'D) Procuradores.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. Os magistrados que integram o Tribunal de Justiça de segundo grau recebem o título privativo de Desembargadores.'
  },
  {
    id: 16,
    enunciado: '16. Compete ao Tribunal Pleno, por intermédio do Presidente, propor ao Poder Legislativo matérias relacionadas:',
    opcoes: [
      'A) À organização e divisão judiciárias.',
      'B) À criação de impostos estaduais.',
      'C) À legislação penal federal.',
      'D) À nomeação de ministros do STF.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. É de competência privativa do Poder Judiciário (Tribunal Pleno), por iniciativa de seu Presidente, propor à Assembleia Legislativa do Estado a alteração da organização e divisão judiciárias e a criação de comarcas, varas e cargos judiciais.'
  },
  {
    id: 17,
    enunciado: '17. A LC nº 261/2023 trata principalmente:',
    opcoes: [
      'A) Da organização judiciária do Estado do Amazonas.',
      'B) Do Código Penal brasileiro.',
      'C) Da organização do Poder Executivo.',
      'D) Da legislação tributária municipal.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A Lei Complementar nº 261/2023 é a Lei de Organização Judiciária do Estado do Amazonas, disciplinando a divisão e organização judiciária, a magistratura e os órgãos e serviços da Justiça estadual.'
  },
  {
    id: 18,
    enunciado: '18. A LC nº 261/2023:',
    opcoes: [
      'A) Substituiu a antiga LC nº 17/1997.',
      'B) Foi criada para substituir a Constituição Federal.',
      'C) Regulamenta exclusivamente servidores municipais.',
      'D) Trata apenas de concursos públicos.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A LC nº 261/2023 revogou e substituiu integralmente a antiga Lei Complementar nº 17/1997 (antigo Código de Organização Judiciária do Amazonas).'
  },
  {
    id: 19,
    enunciado: '19. Entre os integrantes da Justiça do Amazonas estão:',
    opcoes: [
      'A) Juízes de Paz.',
      'B) Deputados Estaduais.',
      'C) Vereadores.',
      'D) Secretários de Estado.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Conforme o art. 3º, inciso VII, da LC nº 261/2023, os Juízes de Paz integram expressamente o Poder Judiciário do Estado do Amazonas.'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa CORRETA:',
    opcoes: [
      'A) O TJAM possui jurisdição apenas sobre Manaus.',
      'B) O TJAM possui atualmente 26 desembargadores e sede na Capital.',
      'C) As Câmaras Isoladas são presididas sempre pelo Presidente do TJAM.',
      'D) O Tribunal Pleno não é órgão julgador.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. Conforme a LC nº 261/2023, o TJAM possui exatamente 26 desembargadores e sede na Capital (Manaus), com jurisdição sobre todo o Estado do Amazonas. As Câmaras Isoladas são presididas por um de seus membros (eleito regimentalmente) e o Tribunal Pleno é órgão julgador.'
  }
];

export const legislacaoTjamTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. O Tribunal de Justiça do Amazonas é composto por 26 desembargadores e possui jurisdição restrita à Comarca de Manaus.',
    correta: false,
    explicacao: 'Gabarito Oficial: Falso. O TJAM é composto por 26 desembargadores, porém sua jurisdição abrange todo o território do Estado do Amazonas, e não apenas Manaus.'
  },
  {
    id: 2,
    enunciado: '2. Ao Tribunal de Justiça do Amazonas é dispensado o tratamento de "Egrégio", ao passo que aos Desembargadores destina-se o tratamento de "Excelência".',
    correta: true,
    explicacao: 'Gabarito Oficial: Verdadeiro. É a distinção oficial de estilo prevista no regramento forense do TJAM.'
  },
  {
    id: 3,
    enunciado: '3. A Escola Superior da Magistratura do Estado do Amazonas (ESMAM) integra a estrutura administrativa do Tribunal de Justiça.',
    correta: true,
    explicacao: 'Gabarito Oficial: Verdadeiro. A ESMAM faz parte da estrutura administrativa do TJAM.'
  },
  {
    id: 4,
    enunciado: '4. Câmaras Isoladas e Câmaras Reunidas constituem exatamente a mesma unidade de julgamento no TJAM.',
    correta: false,
    explicacao: 'Gabarito Oficial: Falso. Câmaras Isoladas ≠ Câmaras Reunidas. São estruturas e órgãos fracionários distintos com competências próprias.'
  },
  {
    id: 5,
    enunciado: '5. A autoridade responsável pela força pública tem o dever de prestar auxílio quando requisitada pelos órgãos judiciários para cumprimento de decisões.',
    correta: true,
    explicacao: 'Gabarito Oficial: Verdadeiro. Quando requisitado auxílio para assegurar cumprimento de decisões judiciais, a autoridade deve prestá-lo.'
  }
];

export const legislacaoTjamDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Explique a estrutura dos órgãos julgadores do Tribunal de Justiça do Amazonas conforme a Lei Complementar nº 261/2023, diferenciando Tribunal Pleno, Câmaras Isoladas e Câmaras Reunidas.',
    respostaEsperada: 'Gabarito Oficial Padrão FGV: De acordo com a LC nº 261/2023, os órgãos julgadores do TJAM são: 1) Tribunal Pleno: órgão colegiado máximo formado pelos 26 desembargadores, com atribuições deliberativas, administrativas e julgamento de ações constitucionais e prerrogativas de foro; 2) Câmaras Isoladas: órgãos fracionários especializados por matéria, divididos em Câmaras Cíveis (1ª, 2ª e 3ª) e Câmaras Criminais (1ª e 2ª), responsáveis pelo julgamento ordinário de recursos e ações de suas respectivas especialidades; 3) Câmaras Reunidas: órgão colegiado intermediário com competências recursais e originárias privativas fixadas em lei e no Regimento Interno (como mandados de segurança contra certos atos e ações rescisórias).'
  },
  {
    id: 2,
    enunciado: '2. Disserte sobre a distinção entre a Lei Complementar nº 261/2023 e o Regimento Interno do TJAM (Resolução nº 62/2023), destacando as matérias disciplinadas por cada instrumento normativo.',
    respostaEsperada: 'Gabarito Oficial Padrão FGV: A LC nº 261/2023 é a lei estadual em sentido formal e material que estabelece a Divisão e a Organização Judiciária de todo o Estado do Amazonas, disciplinando a estrutura territorial (comarcas e termos), a carreira da magistratura, os órgãos integrantes do Poder Judiciário, os serviços auxiliares da Justiça e as serventias notariais e de registro. Por sua vez, o Regimento Interno (Resolução nº 62/2023) decorre da autonomia orgânico-administrativa do Tribunal (art. 96, I, "a" da CF/88) e disciplina a composição e funcionamento interno de seus órgãos judicantes e administrativos, as regras procedimentais de julgamento dos feitos de sua competência e a ordem interna de suas sessões.'
  }
];

export const legislacaoTjamSummaryPoints: string[] = [
  'TJAM: 2ª Instância, sede na Capital (Manaus), jurisdição em todo o Estado do Amazonas.',
  'Composição: Composto por 26 desembargadores (membros do Tribunal com título de Desembargador).',
  'Tratamento Forense: Tribunal = "Egrégio" | Desembargadores = "Excelência".',
  'Órgãos Julgadores do TJAM: Tribunal Pleno, Câmaras Isoladas (Cíveis e Criminais) e Câmaras Reunidas.',
  'Presidência dos Colegiados: Tribunal Pleno = Presidente do TJAM; Câmaras Reunidas = Vice-Presidente; Câmaras Isoladas = um de seus membros eleito conforme o Regimento Interno.',
  'Quórum de Funcionamento: Maioria absoluta dos membros para abertura e deliberação das sessões.',
  'Frequência das Sessões: Realização de 1 sessão ordinária por semana para Pleno, Câmaras Reunidas e Isoladas.',
  'Iniciativa Legislativa: Cabe ao Tribunal Pleno, por meio do Presidente, propor ao Legislativo a organização e divisão judiciárias.',
  'Câmaras Isoladas: Matéria cível (Câmaras Cíveis) e matéria criminal (Câmaras Criminais) — arts. 29 a 40 LC 261/2023.',
  'Câmaras Isoladas ≠ Câmaras Reunidas: São órgãos julgadores distintos com competências próprias na lei e regimento.',
  'Escola Superior da Magistratura (ESMAM): Integra a estrutura administrativa do Tribunal de Justiça.',
  '7 Órgãos do Poder Judiciário do AM (Art. 3º): TJAM, Turmas Recursais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos de Carreira, Auditoria Militar e Conselhos, e Juízes de Paz.',
  'Auxílio da Força Pública: Órgãos judiciários podem requisitar e a autoridade responsável tem o dever de prestar.',
  'Norma Revogada x Vigente: A LC nº 261/2023 substituiu a antiga LC nº 17/1997.'
];
