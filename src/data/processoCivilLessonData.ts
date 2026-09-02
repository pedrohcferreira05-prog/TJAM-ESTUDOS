// Data for Processo Civil — Aula 2: Partes e Procuradores (CPC/2015)
// Preparatório TJAM — Assistente Judiciário

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

export const procCivilAula2SummaryPoints: string[] = [
  'Conceito de Partes: Autor (apresenta a demanda) e Réu (contra quem a demanda é proposta).',
  'Capacidade Processual: toda pessoa no exercício de seus direitos tem capacidade para estar em juízo.',
  'Incapazes no Processo: o incapaz deve ser representado (absolutamente incapaz) ou assistido (relativamente incapaz).',
  'Curador Especial: nomeado pelo juiz para incapaz sem representante legal ou em conflito com ele, e réu preso revel ou revel citado por edital/hora certa.',
  'Defensoria Pública: a curatela especial é exercida prioritariamente pela Defensoria Pública (CPC, art. 72, parágrafo único).',
  'Representação dos Entes: União pela AGU; Estados e DF por procuradores; Municípios por prefeito/procurador; massa falida pelo administrador.',
  'Procuradores e Postulação: regra geral da representação por advogado na OAB, ressalvada a postulação em causa própria com habilitação legal.',
  'Atuação Sem Procuração: excepcional e urgente para evitar prescrição, decadência, preclusão ou praticar ato urgente.',
  'Procuração Geral para o Foro: habilita o advogado a praticar atos processuais em geral, mas NÃO abrange poderes especiais.',
  'Cláusula de Poderes Especiais: necessária para receber citação, confessar, transigir, desistir, renunciar, dar quitação e assinar declaração de hipossuficiência.',
  'Deveres das Partes: expor os fatos conforme a verdade, lealdade, boa-fé e cumprimento das decisões judiciais.',
  'Litisconsórcio: pluralidade de partes no mesmo processo (polo ativo, passivo ou misto).'
];

export const procCivilFlashcardsData: FlashcardItem[] = [
  {
    q: 'Quem são as partes no Processo Civil?',
    a: 'As partes são os sujeitos que ocupam os polos da relação processual: Autor (quem formula a demanda e pede a tutela jurisdicional) e Réu (contra quem a demanda é formulada).'
  },
  {
    q: 'O que é a capacidade processual (capacidade para estar em juízo)?',
    a: 'É a aptidão para participar de uma relação jurídica processual em nome próprio. Toda pessoa que se encontre no exercício pleno de seus direitos possui capacidade processual (CPC, art. 70).'
  },
  {
    q: 'Qual a diferença essencial entre representação e assistência do incapaz?',
    a: 'Na REPRESENTAÇÃO, o representante legal pratica o ato EM NOME do incapaz (absolutamente incapaz). Na ASSISTÊNCIA, o incapaz pratica o ato JUNTAMENTE com o assistente (relativamente incapaz).'
  },
  {
    q: 'Em quais hipóteses o juiz nomeia Curador Especial?',
    a: '1) Ao incapaz que não tiver representante legal ou cujos interesses colidirem com os do representante;\n2) Ao réu preso revel;\n3) Ao réu revel citado por edital ou com hora certa, enquanto não constituído advogado (CPC, art. 72).'
  },
  {
    q: 'Quem exerce preferencialmente a função de Curador Especial?',
    a: 'A curatela especial é exercida privativamente pela DEFENSORIA PÚBLICA, nos termos da lei (CPC, art. 72, parágrafo único).'
  },
  {
    q: 'Como são representados em juízo a União, os Estados, os Municípios e a massa falida?',
    a: '• União: pela Advocacia-Geral da União (AGU);\n• Estados e DF: por seus procuradores de Estado;\n• Municípios: pelo prefeito ou procurador municipal;\n• Massa Falida: pelo administrador judicial.'
  },
  {
    q: 'O que a procuração geral para o foro autoriza o advogado a fazer?',
    a: 'A procuração geral para o foro habilita o advogado a praticar TODOS os atos do processo em geral (propor ações, recorrer, manifestar-se, participar de audiências), SALVO aqueles que exigem poderes especiais.'
  },
  {
    q: 'Quais atos exigem poderes expressos e específicos na procuração?',
    a: 'Receber citação, confessar, reconhecer a procedência do pedido, transigir, desistir, renunciar ao direito sobre o qual se funda a ação, receber e dar quitação, firmar compromisso e assinar declaração de hipossuficiência econômica (CPC, art. 105).'
  },
  {
    q: 'O advogado pode atuar em juízo sem procuração? Em que circunstâncias?',
    a: 'Sim, excepcionalmente, para evitar PRECLUSÃO, DECADÊNCIA ou PRESCRIÇÃO, ou para praticar ato considerado URGENTE. O advogado assume o compromisso de juntar a procuração em 15 dias, prorrogável por mais 15 dias (CPC, art. 104).'
  },
  {
    q: 'O que ocorre se forem usadas expressões ofensivas nos autos processuais?',
    a: 'É vedado a qualquer participante do processo usar expressões ofensivas. O juiz determinará, de ofício ou a requerimento, que sejam riscadas/eliminadas dos autos (CPC, art. 78).'
  },
  {
    q: 'O que é litisconsórcio e como ele se divide quanto aos polos?',
    a: 'Litisconsórcio é a pluralidade de pessoas no mesmo processo. Pode ser:\n• Ativo: dois ou mais autores;\n• Passivo: dois ou mais réus;\n• Misto: pluralidade tanto no polo ativo quanto no passivo.'
  },
  {
    q: 'Quais as hipóteses de cabimento do litisconsórcio previstas no art. 113 do CPC?',
    a: '1) Comunhão de direitos ou de obrigações relativamente à lide;\n2) Conexão pelo pedido ou pela causa de pedir;\n3) Afinidade de questões por ponto comum de fato ou de direito.'
  },
  {
    q: 'O que diferencia a capacidade processual da capacidade postulatória?',
    a: 'A capacidade processual é a aptidão para estar em juízo (exercício de direitos). Já a capacidade postulatória é a aptidão técnica privativa para postular perante o Judiciário, conferida aos advogados inscritos na OAB e defensores públicos.'
  },
  {
    q: 'A parte pode postular em causa própria sem constituir advogado?',
    a: 'Sim, desde que a parte possua HABILITAÇÃO LEGAL (ou seja, seja advogada regularmente inscrita na OAB) ou nos casos especiais autorizados em lei (como nos Juizados Especiais Cíveis até 20 salários mínimos).'
  },
  {
    q: 'Quais são os deveres fundamentais das partes e procuradores segundo o art. 77 do CPC?',
    a: 'Expor os fatos conforme a verdade; não formular pretensões infundadas; não produzir provas inúteis; cumprir com exatidão as decisões judiciais; manter endereço atualizado; e agir com lealdade processual e boa-fé.'
  }
];

export const procCivilAula2McQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. De acordo com o CPC, toda pessoa que se encontre no exercício de seus direitos tem capacidade para:',
    opcoes: [
      'A) Ser juiz',
      'B) Estar em juízo',
      'C) Ser perito',
      'D) Exercer função pública'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. O art. 70 do CPC prevê expressamente: "Toda pessoa que se encontre no exercício de seus direitos tem capacidade para estar em juízo" (capacidade processual de exercício).'
  },
  {
    id: 2,
    enunciado: '2. O incapaz, para participar validamente do processo, deverá:',
    opcoes: [
      'A) Sempre atuar sozinho',
      'B) Ser representado ou assistido, conforme o caso',
      'C) Ser obrigatoriamente representado pelo Ministério Público',
      'D) Ser representado pelo juiz'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme o art. 71 do CPC, o incapaz será representado ou assistido por seus pais, tutores ou curadores, na forma da lei.'
  },
  {
    id: 3,
    enunciado: '3. A representação processual ocorre quando:',
    opcoes: [
      'A) O representante pratica atos em nome do representado',
      'B) O juiz pratica atos em nome da parte',
      'C) O advogado substitui definitivamente a parte',
      'D) O Ministério Público assume qualquer processo'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Na representação, o representante legal atua em nome do representado (incapaz absoluto), praticando os atos processuais por ele.'
  },
  {
    id: 4,
    enunciado: '4. Em regra, a parte é representada em juízo por:',
    opcoes: [
      'A) Qualquer cidadão',
      'B) Servidor público',
      'C) Advogado regularmente inscrito na OAB',
      'D) Testemunha'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. Segundo o art. 103 do CPC, a parte será representada em juízo por advogado regularmente inscrito na Ordem dos Advogados do Brasil (capacidade postulatória).'
  },
  {
    id: 5,
    enunciado: '5. A procuração é utilizada, em regra, para:',
    opcoes: [
      'A) Dar poderes ao advogado para representar a parte',
      'B) Substituir a sentença',
      'C) Determinar a competência do juiz',
      'D) Produzir prova automaticamente'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. O instrumento de mandato (procuração) outorga poderes de representação judicial ao advogado para que possa atuar em nome do constituinte.'
  },
  {
    id: 6,
    enunciado: '6. A procuração geral para o foro:',
    opcoes: [
      'A) Permite absolutamente todos os atos sem exceção',
      'B) Não permite nenhum ato processual',
      'C) Autoriza os atos processuais em geral, mas alguns exigem poderes específicos',
      'D) Só pode ser utilizada por servidores públicos'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. Conforme o art. 105 do CPC, a procuração geral para o foro habilita o advogado a praticar todos os atos do processo, salvo aqueles que exigem poderes especiais.'
  },
  {
    id: 7,
    enunciado: '7. Qual ato exige poder específico na procuração?',
    opcoes: [
      'A) Receber citação',
      'B) Consultar os autos',
      'C) Acompanhar o processo',
      'D) Apresentar manifestação ordinária'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. O art. 105 do CPC elenca expressamente que "receber citação" exige cláusula com poder especial e inequívoco na procuração.'
  },
  {
    id: 8,
    enunciado: '8. Também exige poder específico:',
    opcoes: [
      'A) Transigir',
      'B) Comparecer à audiência',
      'C) Consultar o processo',
      'D) Receber intimação comum'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. O ato de transigir (fazer acordo/concessões recíprocas) dispõe sobre o direito material e exige poder específico na procuração outorgada ao patrono.'
  },
  {
    id: 9,
    enunciado: '9. O advogado pode atuar sem procuração inicialmente:',
    opcoes: [
      'A) Nunca',
      'B) Em determinadas situações urgentes previstas no CPC',
      'C) Sempre que quiser',
      'D) Somente se o juiz autorizar verbalmente'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. O art. 104 do CPC autoriza o advogado a postular em juízo sem procuração para evitar preclusão, decadência ou prescrição, ou para praticar ato considerado urgente.'
  },
  {
    id: 10,
    enunciado: '10. Entre os deveres das partes está:',
    opcoes: [
      'A) Alterar os fatos para favorecer sua defesa',
      'B) Expor os fatos conforme a verdade',
      'C) Impedir a produção de provas',
      'D) Descumprir decisões desfavoráveis'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. O art. 77, I, do CPC impõe às partes e procuradores o dever indeclinável de expor os fatos em juízo conforme a verdade (dever de veracidade e boa-fé).'
  },
  {
    id: 11,
    enunciado: '11. É dever das partes:',
    opcoes: [
      'A) Cumprir as decisões judiciais',
      'B) Ocultar informações relevantes',
      'C) Criar obstáculos ao processo',
      'D) Utilizar provas desnecessárias'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Conforme o art. 77, IV, do CPC, é dever cumprir com exatidão as decisões jurisdicionais, de natureza provisória ou final, e não criar embaraços à sua efetivação.'
  },
  {
    id: 12,
    enunciado: '12. A prática de atos inúteis ou desnecessários no processo:',
    opcoes: [
      'A) É sempre obrigatória',
      'B) É um dever processual',
      'C) Deve ser evitada',
      'D) É exigida pelo CPC'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. O art. 77, III, do CPC prevê o dever de "não produzir provas e não praticar atos inúteis ou desnecessários à declaração ou à defesa do direito".'
  },
  {
    id: 13,
    enunciado: '13. O curador especial pode ser nomeado, entre outras hipóteses, para:',
    opcoes: [
      'A) Todo autor maior e capaz',
      'B) Incapaz sem representante legal',
      'C) Todo advogado',
      'D) Todo servidor público'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. O art. 72, I, do CPC determina a nomeação de curador especial ao incapaz que não tiver representante legal ou cujos interesses colidirem com os deste.'
  },
  {
    id: 14,
    enunciado: '14. O curador especial também pode atuar em favor de:',
    opcoes: [
      'A) Réu revel citado por edital, nas condições previstas no CPC',
      'B) Qualquer testemunha',
      'C) Todo juiz',
      'D) Todo autor'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. O art. 72, II, do CPC prescreve que o juiz nomeará curador especial ao réu preso revel, bem como ao réu revel citado por edital ou com hora certa, enquanto não constituir advogado.'
  },
  {
    id: 15,
    enunciado: '15. O litisconsórcio ocorre quando:',
    opcoes: [
      'A) Há apenas um sujeito no processo',
      'B) Duas ou mais pessoas litigam conjuntamente no mesmo processo',
      'C) O juiz possui dois processos',
      'D) O advogado possui dois clientes'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Conforme o art. 113 do CPC, o litisconsórcio é a hipótese em que duas ou mais pessoas podem litigar, no mesmo processo, em conjunto, ativa ou passivamente.'
  },
  {
    id: 16,
    enunciado: '16. João e Maria ajuízam juntos uma ação contra Pedro. João e Maria são:',
    opcoes: [
      'A) Litisconsortes passivos',
      'B) Litisconsortes ativos',
      'C) Assistentes do juiz',
      'D) Réus'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Como João e Maria estão figurando conjuntamente no polo autor (ativo) da demanda, qualificam-se como litisconsortes ativos.'
  },
  {
    id: 17,
    enunciado: '17. João ajuíza uma ação contra Pedro e Carlos. Pedro e Carlos são:',
    opcoes: [
      'A) Litisconsortes ativos',
      'B) Litisconsortes passivos',
      'C) Autores',
      'D) Procuradores'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Como Pedro e Carlos figuram no polo passivo da relação processual (réus), trata-se de litisconsórcio passivo.'
  },
  {
    id: 18,
    enunciado: '18. O litisconsórcio pode ocorrer quando houver:',
    opcoes: [
      'A) Comunhão de direitos ou obrigações relativamente à lide',
      'B) Apenas amizade entre as partes',
      'C) Apenas autorização do advogado',
      'D) Somente decisão administrativa'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. O art. 113, I, do CPC autoriza expressamente a formação de litisconsórcio quando houver entre os litigantes comunhão de direitos ou de obrigações relativamente à lide.'
  },
  {
    id: 19,
    enunciado: '19. Assinale a alternativa INCORRETA:',
    opcoes: [
      'A) A parte possui deveres processuais.',
      'B) O advogado pode precisar de poderes específicos para determinados atos.',
      'C) O incapaz pode sempre atuar sozinho em juízo.',
      'D) Pode existir litisconsórcio no polo ativo ou passivo.'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C (Incorreta). O incapaz NÃO pode atuar sozinho em juízo; deve obrigatoriamente ser representado ou assistido por seus representantes legais, sob pena de nulidade processual.'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa correta:',
    opcoes: [
      'A) Procuração geral permite automaticamente todos os atos especiais.',
      'B) Litisconsórcio significa necessariamente que todos os litigantes são autores.',
      'C) A capacidade processual é diferente da capacidade postulatória.',
      'D) O curador especial é obrigatório em todos os processos.'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. Correta! A capacidade processual é a aptidão de estar em juízo (titular de direitos), enquanto a capacidade postulatória é a prerrogativa técnica privativa de postular em juízo (própria dos advogados habilitados e defensores públicos).'
  }
];

export const procCivilAula2TfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A procuração geral para o foro autoriza o advogado a receber citação e transigir, sem necessidade de poderes expressos adicionais.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. Conforme o art. 105 do CPC, receber citação e transigir são atos que exigem poderes expressos e específicos na procuração.'
  },
  {
    id: 2,
    enunciado: '2. O réu revel citado por edital ou com hora certa tem direito à nomeação de curador especial, função exercida preferencialmente pela Defensoria Pública.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. Nos termos do art. 72, II e parágrafo único do CPC, o juiz nomeará curador especial ao réu revel citado por edital ou com hora certa, exercida pela Defensoria Pública.'
  },
  {
    id: 3,
    enunciado: '3. Em casos urgentes ou para evitar preclusão, prescrição ou decadência, o advogado pode atuar sem procuração, comprometendo-se a juntá-la no prazo legal.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. É o que expressamente estabelece o art. 104 do CPC, conferindo prazo improrrogável de 15 dias, prorrogável por mais 15 mediante despacho judicial.'
  },
  {
    id: 4,
    enunciado: '4. O litisconsórcio só é juridicamente admitido no polo passivo da relação processual, sendo vedada a reunião de mais de um autor no polo ativo.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. O litisconsórcio pode ser ativo (vários autores), passivo (vários réus) ou misto (vários autores e vários réus).'
  }
];

export const procCivilAula2DiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Diferencie detalhadamente a Capacidade Processual (para estar em juízo) da Capacidade Postulatória, indicando quem possui cada uma e as consequências da incapacidade.',
    respostaEsperada: 'Gabarito oficial FGV: A capacidade processual (legitimatio ad processum) é a aptidão de participar por si mesmo da relação processual, detida por toda pessoa plenamente capaz no exercício de seus direitos civis (art. 70, CPC). Os incapazes a possuem apenas mediante representação ou assistência. Já a capacidade postulatória (jus postulandi) é a aptidão técnica exigida pela lei para realizar atos processuais e formular pedidos perante o Poder Judiciário, sendo privativa dos advogados regularmente inscritos na OAB e membros da Defensoria Pública (art. 103, CPC). Em regra, o ato praticado por quem não possui capacidade postulatória é ineficaz se não sanado no prazo assinalado pelo magistrado.'
  },
  {
    id: 2,
    enunciado: '2. Explique a finalidade do instituto do Curador Especial no CPC/2015, indicando as suas principais hipóteses de nomeação e quem detém atribuição legal prioritária para desempenhar essa função.',
    respostaEsperada: 'Gabarito oficial FGV: O Curador Especial visa garantir o contraditório, a ampla defesa e a paridade de armas em situações em que a parte se encontra em flagrante vulnerabilidade jurídica ou processual. Conforme o art. 72 do CPC, o juiz nomeará curador especial: 1) ao incapaz, se não tiver representante legal ou se os interesses deste colidirem com os daquele; e 2) ao réu preso revel, bem como ao réu revel citado por edital ou com hora certa, enquanto não constituído advogado. Por força do parágrafo único do art. 72 do CPC, a curatela especial é exercida prioritariamente pela Defensoria Pública.'
  }
];
