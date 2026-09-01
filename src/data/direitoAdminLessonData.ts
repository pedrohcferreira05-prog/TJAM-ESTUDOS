// Data for Direito Administrativo — Aula 4: Agentes Públicos

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

export const direitoAdminFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que é Agente Público no Direito Administrativo?',
    a: 'É toda pessoa física que exerce, ainda que temporariamente ou sem remuneração, uma função pública (por eleição, nomeação, designação, contratação ou qualquer outra forma de investidura).'
  },
  {
    q: 'Como se classificam os Agentes Públicos para o concurso do TJAM?',
    a: '1) Agentes Políticos (direção superior do Estado);\n2) Servidores Públicos Estatutários (cargos públicos efetivos ou em comissão);\n3) Empregados Públicos (celetistas - CLT);\n4) Servidores Temporários (Art. 37, IX da CF/88);\n5) Particulares em colaboração com o poder público.'
  },
  {
    q: 'Qual a diferença essencial entre Cargo, Emprego e Função Pública?',
    a: '• Cargo Público: Lugar criado por lei, com denominação própria e atribuições específicas, ocupado por servidor público estatutário.\n• Emprego Público: Vínculo contratual trabalhista regido pela CLT, ocupado por empregado público.\n• Função Pública: Conjunto de atribuições exercidas por agente público (pode existir função de confiança sem cargo efetivo).'
  },
  {
    q: 'Qual a regra constitucional para investidura em cargo ou emprego público?',
    a: 'Aprovação prévia em concurso público de provas ou de provas e títulos, de acordo com a natureza e a complexidade do cargo ou emprego (Art. 37, II da CF/88).'
  },
  {
    q: 'Quais as principais exceções à exigência de concurso público?',
    a: '1) Nomeações para cargos em comissão declarados em lei de livre nomeação e exoneração;\n2) Contratação temporária por tempo determinado para atender a necessidade temporária de excepcional interesse público (Art. 37, IX).'
  },
  {
    q: 'Qual a destinação exclusiva dos cargos em comissão?',
    a: 'Destinam-se apenas e exclusivamente às atribuições de DIREÇÃO, CHEFIA e ASSESSORAMENTO (Art. 37, V da CF/88), sendo de livre nomeação e exoneração.'
  },
  {
    q: 'Quais esferas de responsabilidade podem recair sobre o agente público?',
    a: 'O agente público pode responder nas esferas CIVIL (reparação do dano ao erário/terceiros), ADMINISTRATIVA (processo disciplinar/PAD) e PENAL (crimes e contravenções). As esferas são em regra independentes e cumuláveis.'
  },
  {
    q: 'Qual a regra geral sobre acumulação remunerada de cargos públicos?',
    a: 'A regra constitucional é a PROIBIÇÃO de acumulação remunerada de cargos, empregos e funções públicas, admitindo-se apenas as exceções expressas da CF/88 quando houver compatibilidade de horários (dois de professor; um de professor com outro técnico/científico; dois privativos de profissionais de saúde).'
  }
];

export const direitoAdminMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Agente público é:',
    opcoes: [
      'A) Apenas o servidor efetivo',
      'B) Toda pessoa que exerce, ainda que temporariamente ou sem remuneração, função pública',
      'C) Apenas ocupante de cargo político',
      'D) Somente empregado público'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O conceito de agente público é amplo e compreende toda pessoa que exerce, mesmo que de forma transitória ou sem remuneração, uma função pública.'
  },
  {
    id: 2,
    enunciado: '2. O servidor público ocupante de cargo efetivo, em regra, ingressa por:',
    opcoes: [
      'A) Nomeação direta',
      'B) Concurso público',
      'C) Contrato verbal',
      'D) Eleição'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Conforme o Art. 37, II da CF/88, a investidura em cargo público efetivo depende de aprovação prévia em concurso público de provas ou de provas e títulos.'
  },
  {
    id: 3,
    enunciado: '3. Cargo público é:',
    opcoes: [
      'A) Um vínculo exclusivamente privado',
      'B) Um conjunto de atribuições e responsabilidades previsto na estrutura administrativa',
      'C) Uma atividade sem responsabilidade',
      'D) Um contrato empresarial'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Cargo público é o conjunto de atribuições e responsabilidades previsto na estrutura organizacional da Administração, a ser cometido a um servidor estatutário.'
  },
  {
    id: 4,
    enunciado: '4. O emprego público é normalmente regido:',
    opcoes: [
      'A) Pelo regime trabalhista (CLT)',
      'B) Pelo Código Penal',
      'C) Pelo direito eleitoral',
      'D) Exclusivamente pelo direito internacional'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. Os empregados públicos possuem vínculo contratual de trabalho sob o regime da Consolidação das Leis do Trabalho (CLT), comum em empresas públicas e sociedades de economia mista.'
  },
  {
    id: 5,
    enunciado: '5. A contratação temporária pela Administração Pública ocorre para:',
    opcoes: [
      'A) Qualquer atividade permanente, sem justificativa',
      'B) Atender necessidade temporária de excepcional interesse público',
      'C) Substituir obrigatoriamente todos os servidores efetivos',
      'D) Evitar a realização de concursos em qualquer situação'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O Art. 37, IX da Constituição Federal estabelece que a lei disporá sobre a contratação por tempo determinado para atender a necessidade temporária de excepcional interesse público.'
  },
  {
    id: 6,
    enunciado: '6. O cargo em comissão caracteriza-se, em regra, por:',
    opcoes: [
      'A) Exigir sempre estabilidade',
      'B) Destinar-se a funções de direção, chefia e assessoramento',
      'C) Ser preenchido exclusivamente por concurso',
      'D) Ser necessariamente vitalício'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Conforme o Art. 37, V da CF/88, os cargos em comissão destinam-se exclusivamente às atribuições de direção, chefia e assessoramento, sendo de livre nomeação e exoneração.'
  },
  {
    id: 7,
    enunciado: '7. Sobre o concurso público, é correto afirmar:',
    opcoes: [
      'A) É dispensável para todo cargo efetivo',
      'B) É regra para investidura em cargo ou emprego público',
      'C) Só pode ocorrer para cargos municipais',
      'D) É proibido para empregos públicos'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O concurso público é o postulado constitucional obrigatório como regra geral para o acesso aos cargos efetivos e aos empregos públicos na Administração Direta e Indireta.'
  },
  {
    id: 8,
    enunciado: '8. A estabilidade é relacionada, em regra:',
    opcoes: [
      'A) Ao empregado de empresa privada',
      'B) Ao servidor ocupante de cargo efetivo que cumpra os requisitos constitucionais',
      'C) Ao contratado temporário',
      'D) Ao ocupante de cargo em comissão'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. A estabilidade constitucional (Art. 41 da CF) é direito exclusivo do servidor nomeado para cargo de provimento efetivo em virtude de concurso público, após 3 anos de efetivo exercício e avaliação de desempenho.'
  },
  {
    id: 9,
    enunciado: '9. Um servidor pode responder:',
    opcoes: [
      'A) Somente administrativamente',
      'B) Somente criminalmente',
      'C) Nas esferas civil, penal e administrativa, conforme o caso',
      'D) Apenas perante o chefe imediato'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. As sanções civis, penais e administrativas poderão cumular-se, sendo independentes entre si, podendo o servidor responder simultaneamente nas três esferas por um mesmo fato.'
  },
  {
    id: 10,
    enunciado: '10. A responsabilidade administrativa decorre, principalmente:',
    opcoes: [
      'A) Da prática de infração funcional',
      'B) Da prática de qualquer crime comum por qualquer pessoa',
      'C) De uma dívida particular',
      'D) De uma atividade exclusivamente privada'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. A responsabilidade administrativa resulta da infração aos deveres e proibições funcionais previstos no Estatuto dos Servidores Públicos no exercício de suas atribuições.'
  },
  {
    id: 11,
    enunciado: '11. O empregado público:',
    opcoes: [
      'A) É necessariamente estatutário',
      'B) Possui vínculo de emprego e, em regra, está sujeito à CLT',
      'C) Não exerce função pública',
      'D) Não precisa observar princípios administrativos'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O empregado público ocupa emprego público, tem contrato de trabalho regido pela CLT e se submete aos princípios da Administração Pública.'
  },
  {
    id: 12,
    enunciado: '12. A função pública pode ser entendida como:',
    opcoes: [
      'A) O conjunto de atribuições exercidas por um agente público',
      'B) Apenas um cargo efetivo',
      'C) Uma empresa estatal',
      'D) Uma atividade sem vínculo com o Estado'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. A função pública representa o feixe de atribuições, competências e responsabilidades conferidas ao agente público para a realização dos fins estatais.'
  },
  {
    id: 13,
    enunciado: '13. É exemplo de agente público:',
    opcoes: [
      'A) Apenas o servidor concursado',
      'B) Apenas o presidente da República',
      'C) Um servidor, empregado público ou contratado temporário, conforme a situação',
      'D) Somente o empregado de empresa privada'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Todos os que exercem função pública (servidores estatutários, celetistas, temporários, políticos ou colaboradores) são qualificados como agentes públicos.'
  },
  {
    id: 14,
    enunciado: '14. A investidura em cargo ou emprego público depende, como regra:',
    opcoes: [
      'A) De concurso público',
      'B) De indicação de qualquer cidadão',
      'C) De contrato particular',
      'D) De autorização judicial'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. A aprovação prévia em concurso público de provas ou de provas e títulos é a regra constitucional indispensável para a investidura originária.'
  },
  {
    id: 15,
    enunciado: '15. Os cargos em comissão:',
    opcoes: [
      'A) São sempre vitalícios',
      'B) São destinados às funções de direção, chefia e assessoramento',
      'C) Garantem estabilidade automática',
      'D) Não podem ser exonerados'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Art. 37, V da CF/88: os cargos em comissão destinam-se exclusivamente às atribuições de direção, chefia e assessoramento, sendo de livre nomeação e exoneração (ad nutum).'
  },
  {
    id: 16,
    enunciado: '16. Sobre agentes temporários, é correto afirmar:',
    opcoes: [
      'A) São contratados para atender necessidade temporária de excepcional interesse público',
      'B) Sempre possuem estabilidade',
      'C) São necessariamente servidores efetivos',
      'D) Devem permanecer no serviço público por toda a vida'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. Os servidores temporários desempenham funções com base no Art. 37, IX da CF/88 para suprir demandas passageiras e de interesse público urgente reguladas por lei específica.'
  },
  {
    id: 17,
    enunciado: '17. A responsabilidade civil do agente público pode ocorrer quando:',
    opcoes: [
      'A) Há dano causado no exercício da função, observados os requisitos legais',
      'B) O agente simplesmente não gosta de seu trabalho',
      'C) O servidor muda de setor',
      'D) O agente tira férias'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. A responsabilidade civil surge quando o agente causa prejuízo material ou moral ao erário ou a terceiros (em ação regressiva comprovado dolo ou culpa).'
  },
  {
    id: 18,
    enunciado: '18. A acumulação remunerada de cargos públicos:',
    opcoes: [
      'A) É sempre livre',
      'B) É sempre proibida, sem exceção',
      'C) Pode ser admitida em hipóteses previstas constitucionalmente e observadas as condições legais',
      'D) Depende apenas da autorização do chefe'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. A vedação de acumular admite exceções taxativas expressas no Art. 37, XVI da CF/88 (como 2 cargos de professor ou 1 de professor com outro técnico/científico, havendo compatibilidade de horários).'
  },
  {
    id: 19,
    enunciado: '19. O princípio do concurso público busca principalmente:',
    opcoes: [
      'A) Garantir acesso baseado em critérios objetivos e isonômicos',
      'B) Permitir contratações exclusivamente por indicação',
      'C) Impedir qualquer contratação pública',
      'D) Garantir estabilidade a qualquer trabalhador'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. O concurso público materializa a isonomia, a impessoalidade e a busca pela eficiência e mérito para selecionar os candidatos mais capacitados.'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa INCORRETA:',
    opcoes: [
      'A) Agentes públicos podem exercer funções públicas de diferentes formas.',
      'B) Empregados públicos possuem vínculo trabalhista.',
      'C) Contratados temporários são necessariamente servidores efetivos.',
      'D) Servidores podem estar sujeitos à responsabilização administrativa.'
    ],
    correta: 2, // C (Incorreta)
    explicacao: 'Gabarito Oficial: C. Contratados temporários NÃO são servidores efetivos. O servidor efetivo ocupa cargo de provimento efetivo via concurso público, enquanto o temporário exerce função transitória por regime especial.'
  }
];

export const direitoAdminTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Agente público é apenas aquele que possui aprovação em concurso público e cargo estatutário efetivo com remuneração mensal.',
    correta: false,
    explicacao: 'Falso: Agente público é toda pessoa que exerce função pública, inclusive temporários, mesários (sem remuneração) e agentes políticos.'
  },
  {
    id: 2,
    enunciado: '2. Os cargos em comissão destinam-se exclusivamente às atribuições de direção, chefia e assessoramento.',
    correta: true,
    explicacao: 'Verdadeiro: Exatamente o texto do Art. 37, V da Constituição Federal.'
  },
  {
    id: 3,
    enunciado: '3. A responsabilidade do servidor público nas esferas civil, penal e administrativa é independente e pode cumular-se.',
    correta: true,
    explicacao: 'Verdadeiro: O mesmo ato ilícito pode ensejar sanção disciplinar (demissão), civil (ressarcimento) e penal (prisão).'
  },
  {
    id: 4,
    enunciado: '4. O empregado público de uma empresa estatal ocupa cargo público estatutário.',
    correta: false,
    explicacao: 'Falso: Empregado público ocupa EMPREGO PÚBLICO regido pela CLT (regime celetista).'
  }
];

export const direitoAdminDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Explique a distinção técnica entre Cargo Público, Emprego Público e Função Pública para o concurso do TJAM.',
    respostaEsperada: 'Gabarito oficial: Cargo Público é o conjunto de atribuições e responsabilidades previsto na estrutura administrativa, criado por lei, ocupado por servidor público estatutário. Emprego Público é a unidade de atribuições ocupada por empregado público sob o regime celetista (CLT). Função Pública é o feixe de atribuições exercido pelo agente público, podendo existir função sem cargo (como funções temporárias ou funções de confiança).'
  },
  {
    id: 2,
    enunciado: '2. Descreva as hipóteses de responsabilização do agente público e a possibilidade de coexistência das esferas civil, administrativa e penal.',
    respostaEsperada: 'Gabarito oficial: O agente público pode responder civilmente (quando causar dano patrimonial ao Estado ou a terceiros, mediante dolo ou culpa), administrativamente (por violação de deveres funcionais apurada em PAD) e penalmente (pela prática de crimes e contravenções funcionais). Como regra geral, as três esferas são independentes entre si e podem cumular-se concomitantemente.'
  }
];

export const direitoAdminSummaryPoints: string[] = [
  'Conceito de Agente Público: Toda pessoa física que exerce função pública, ainda que temporariamente ou sem remuneração.',
  'Classificação: Agentes Políticos (direção estatal), Servidores Estatutários (cargos), Empregados Celetistas (empregos), Temporários (excepcional interesse público) e Colaboradores.',
  'Cargo × Emprego × Função: Cargo = Servidor Estatutário; Emprego = Regime CLT; Função = Atribuições exercidas pelo agente.',
  'Regra do Concurso Público: Obrigatório para investidura em cargo ou emprego público (Art. 37, II CF/88).',
  'Cargos em Comissão: Exclusivos para Direção, Chefia e Assessoramento, de livre nomeação e exoneração (ad nutum).',
  'Responsabilidades: Civil (dano), Administrativa (falta funcional) e Penal (crime/contravenção) — esferas independentes e cumuláveis.',
  'Foco TJAM: Atenção à diferença entre cargo efetivo e em comissão, contratação temporária e acumulação constitucional de cargos.'
];
