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
    q: 'O que é Nacionalidade sob o ponto de vista jurídico?',
    a: 'É o vínculo jurídico-político que liga um indivíduo a um determinado Estado soberano, tornando-o integrante do povo e gerando direitos e deveres recíprocos.'
  },
  {
    id: 2,
    q: 'Quais são as três hipóteses de Brasileiro Nato previstas no Art. 12, I da CF/88?',
    a: '1) Nascidos no Brasil (jus soli), mesmo de pais estrangeiros, desde que estes não estejam a serviço de seu país; 2) Nascidos no exterior de pai ou mãe brasileira a serviço da RFB (jus sanguinis funcional); 3) Nascidos no exterior com registro em repartição competente OU residência no Brasil + opção confirmativa após a maioridade.'
  },
  {
    id: 3,
    q: 'Filho de casal de estrangeiros que nasce em Manaus/AM é brasileiro nato?',
    a: 'SIM, desde que seus pais NÃO estejam a serviço do país deles de origem (Art. 12, I, a). Se estiverem a turismo, trabalho privado ou estudo, o filho é brasileiro nato.'
  },
  {
    id: 4,
    q: 'O que a Constituição exige para naturalização de originários de países de língua portuguesa?',
    a: 'Apenas dois requisitos (Art. 12, II, a): 1) Residência ininterrupta por 1 (um) ano no Brasil; e 2) Idoneidade moral comprovada.'
  },
  {
    id: 5,
    q: 'Quais são os requisitos para a chamada Naturalização Extraordinária (estrangeiros em geral)?',
    a: 'Art. 12, II, b: 1) Mais de 15 anos ininterruptos de residência no Brasil; 2) Ausência de condenação penal; e 3) Requerimento expresso da nacionalidade brasileira.'
  },
  {
    id: 6,
    q: 'A lei ordinária pode criar distinções entre brasileiros natos e naturalizados?',
    a: 'NÃO! O art. 12, § 2º proíbe categoricamente a lei de estabelecer distinções entre natos e naturalizados, SALVO os casos expressamente previstos na própria Constituição Federal.'
  },
  {
    id: 7,
    q: 'Qual é o mnemônico para os Cargos Privativos de Brasileiro Nato (Art. 12, § 3º)?',
    a: 'Mnemônico: P-V-C-S-M-D-O-D -> Presidente da República, Vice-Presidente, Presidente da Câmara, Presidente do Senado, Ministro do STF, Diplomacia, Oficial das Forças Armadas, Ministro da Defesa.'
  },
  {
    id: 8,
    q: 'Qualquer Ministro de Tribunal Superior precisa ser brasileiro nato?',
    a: 'NÃO! Somente os Ministros do SUPREMO TRIBUNAL FEDERAL (STF) são privativos de brasileiro nato. Ministros do STJ, TST, TSE e STM podem ser brasileiros naturalizados (salvo os Oficiais generais no STM).'
  },
  {
    id: 9,
    q: 'O que é o Estatuto da Igualdade aplicável aos Portugueses no Brasil (Art. 12, § 1º)?',
    a: 'Aos portugueses com residência permanente no Brasil, se houver reciprocidade em favor de brasileiros em Portugal, serão atribuídos os direitos inerentes ao brasileiro, salvo as prerrogativas privativas de nato.'
  },
  {
    id: 10,
    q: 'Em quais hipóteses o brasileiro naturalizado pode perder a nacionalidade por sentença judicial?',
    a: 'Art. 12, § 4º, I: Em virtude de fraude relacionada ao processo de naturalização OU de atentado contra a ordem constitucional e o Estado Democrático.'
  },
  {
    id: 11,
    q: 'O brasileiro pode pedir para perder a nacionalidade brasileira? Há ressalva?',
    a: 'SIM, mediante pedido expresso perante autoridade competente, DESDE QUE isso NÃO resulte em situação de apatridia (ninguém pode se tornar apátrida). O interessado pode readquiri-la nos termos da lei.'
  },
  {
    id: 12,
    q: 'A aquisição voluntária de outra nacionalidade cancela automaticamente a brasileira hoje?',
    a: 'NÃO! Com a Emenda Constitucional nº 131/2023, adquirir outra nacionalidade NÃO gera mais perda automática da nacionalidade brasileira. A perda só ocorre por cancelamento judicial de naturalização ou renúncia expressa.'
  }
];

export const direitoConstMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. De acordo com a Constituição Federal, é brasileiro nato aquele que:',
    alternativas: [
      'Nasce no Brasil, ainda que filho de estrangeiros, independentemente da situação dos pais.',
      'Nasce no Brasil, salvo se os pais estrangeiros estiverem a serviço de seu país.',
      'Nasce no exterior e possui qualquer parente brasileiro.',
      'Obtém naturalização após completar 18 anos.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. Conforme o Art. 12, I, "a" da CF/88, são brasileiros natos os nascidos na República Federativa do Brasil, ainda que de pais estrangeiros, desde que estes não estejam a serviço de seu país (critério do jus soli temperado).'
  },
  {
    id: 2,
    enunciado: '2. É brasileiro nato o nascido no estrangeiro de pai brasileiro ou mãe brasileira quando:',
    alternativas: [
      'Qualquer deles estiver a serviço de seu país de origem.',
      'Qualquer deles estiver a serviço da República Federativa do Brasil.',
      'Os dois pais forem brasileiros naturalizados.',
      'Residir no exterior por pelo menos cinco anos.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. Nos termos do Art. 12, I, "b" da CF/88, é brasileiro nato o nascido no estrangeiro, de pai brasileiro ou de mãe brasileira, desde que qualquer deles esteja a serviço da República Federativa do Brasil (jus sanguinis funcional).'
  },
  {
    id: 3,
    enunciado: '3. O brasileiro naturalizado é aquele que:',
    alternativas: [
      'Nasce em território brasileiro.',
      'Nasce no exterior de pai brasileiro.',
      'Adquire a nacionalidade brasileira mediante naturalização.',
      'Possui necessariamente pai e mãe brasileiros.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A nacionalidade do naturalizado é derivada/adquirida: não decorre do fato natural do nascimento, mas sim de procedimento volitivo de naturalização regulado pelo Art. 12, II da CF e pela legislação ordinária.'
  },
  {
    id: 4,
    enunciado: '4. Para os originários de países de língua portuguesa, a Constituição exige, para a naturalização:',
    alternativas: [
      '15 anos de residência e ausência de condenação penal.',
      '5 anos de residência e aprovação em concurso público.',
      '1 ano de residência ininterrupta e idoneidade moral.',
      '10 anos de residência e idoneidade moral.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Conforme o Art. 12, II, "a" da CF/88, aos originários de países de língua portuguesa exige-se apenas residência por um ano ininterrupto e idoneidade moral.'
  },
  {
    id: 5,
    enunciado: '5. Estrangeiro de qualquer nacionalidade poderá requerer a nacionalidade brasileira, conforme a Constituição, após residência no Brasil por:',
    alternativas: [
      'Mais de 5 anos.',
      'Mais de 10 anos.',
      'Mais de 15 anos ininterruptos, observados os demais requisitos constitucionais.',
      'Exatamente 20 anos.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A naturalização extraordinária (Art. 12, II, "b", CF/88) exige residência na República Federativa do Brasil há mais de quinze anos ininterruptos e sem condenação penal, desde que requeiram a nacionalidade brasileira.'
  },
  {
    id: 6,
    enunciado: '6. Qual dos cargos abaixo é privativo de brasileiro nato?',
    alternativas: [
      'Deputado Federal.',
      'Senador.',
      'Ministro do Supremo Tribunal Federal.',
      'Prefeito.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. O Art. 12, § 3º, IV da CF estabelece que o cargo de Ministro do Supremo Tribunal Federal (STF) é privativo de brasileiro nato. Deputados, senadores e prefeitos podem ser naturalizados (com exceção apenas dos Presidentes da Câmara e do Senado).'
  },
  {
    id: 7,
    enunciado: '7. Assinale o cargo que não é privativo de brasileiro nato:',
    alternativas: [
      'Presidente da República.',
      'Vice-Presidente da República.',
      'Presidente do Senado Federal.',
      'Governador de Estado.'
    ],
    correta: 3, // D
    explicacao: '✅ Gabarito: D. O cargo de Governador de Estado NÃO é privativo de brasileiro nato; um brasileiro naturalizado pode se eleger Governador. Já Presidente, Vice e Presidente do Senado compõem a linha sucessória da Presidência da República e são privativos de natos.'
  },
  {
    id: 8,
    enunciado: '8. São cargos privativos de brasileiro nato, exceto:',
    alternativas: [
      'Oficial das Forças Armadas.',
      'Ministro de Estado da Defesa.',
      'Carreira diplomática.',
      'Ministro do Superior Tribunal de Justiça.'
    ],
    correta: 3, // D
    explicacao: '✅ Gabarito: D. Ministro do STJ (Superior Tribunal de Justiça) NÃO é privativo de brasileiro nato. A privação constitucional recai exclusivamente sobre Ministros do STF (Art. 12, § 3º, IV).'
  },
  {
    id: 9,
    enunciado: '9. A Constituição Federal estabelece que a lei não poderá estabelecer distinção entre brasileiros natos e naturalizados:',
    alternativas: [
      'Em nenhuma hipótese.',
      'Salvo nos casos previstos na própria Constituição.',
      'Apenas quando houver autorização judicial.',
      'Somente durante períodos eleitorais.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. De acordo com o Art. 12, § 2º da CF/88: "A lei não poderá estabelecer distinção entre brasileiros natos e naturalizados, salvo nos casos previstos nesta Constituição".'
  },
  {
    id: 10,
    enunciado: '10. Sobre a nacionalidade brasileira, assinale a alternativa correta:',
    alternativas: [
      'Todo brasileiro naturalizado pode ocupar qualquer cargo público.',
      'Brasileiro naturalizado pode ocupar cargos privativos de brasileiro nato.',
      'Existem cargos que a Constituição reserva aos brasileiros natos.',
      'Brasileiro nato pode perder automaticamente a nacionalidade ao adquirir outra.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A própria Constituição Federal expressamente reserva um rol taxativo de cargos aos brasileiros natos no Art. 12, § 3º (linha sucessória da Presidência, cúpula militar e diplomacia).'
  },
  {
    id: 11,
    enunciado: '11. Entre os cargos abaixo, qual é privativo de brasileiro nato?',
    alternativas: [
      'Presidente da Câmara dos Deputados.',
      'Deputado Estadual.',
      'Vereador.',
      'Prefeito.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. O Presidente da Câmara dos Deputados está na linha sucessória imediata do Presidente da República (Art. 80 da CF), sendo seu cargo privativo de brasileiro nato (Art. 12, § 3º, II).'
  },
  {
    id: 12,
    enunciado: '12. O cargo de Presidente do Senado Federal é:',
    alternativas: [
      'Privativo de brasileiro naturalizado.',
      'Privativo de brasileiro nato.',
      'Permitido exclusivamente a estrangeiros naturalizados.',
      'Permitido apenas a portugueses.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O Presidente do Senado Federal integra a linha de substituição e sucessão presidencial e, por expressa disposição do Art. 12, § 3º, III da CF, é privativo de brasileiro nato.'
  },
  {
    id: 13,
    enunciado: '13. A carreira diplomática é:',
    alternativas: [
      'Privativa de brasileiro nato.',
      'Privativa de brasileiro naturalizado.',
      'Permitida somente a estrangeiros.',
      'Livre para qualquer pessoa residente no Brasil.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. Conforme o Art. 12, § 3º, V da CF/88, os cargos da carreira diplomática são privativos de brasileiro nato em razão da representação soberana do Estado brasileiro no plano internacional.'
  },
  {
    id: 14,
    enunciado: '14. Segundo a Constituição, a aquisição de outra nacionalidade por brasileiro:',
    alternativas: [
      'Sempre provoca automaticamente a perda da nacionalidade brasileira.',
      'Nunca produz qualquer efeito jurídico.',
      'Não provoca, por si só, automaticamente a perda da nacionalidade brasileira, observadas as regras constitucionais.',
      'Transforma automaticamente o brasileiro em estrangeiro.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Regra fundamental atualizada pela Emenda Constitucional nº 131/2023: a mera aquisição de outra nacionalidade NÃO acarreta mais a perda automática da nacionalidade brasileira.'
  },
  {
    id: 15,
    enunciado: '15. A Constituição prevê possibilidade de perda da nacionalidade brasileira por:',
    alternativas: [
      'Cancelamento da naturalização, por sentença judicial, nas hipóteses constitucionais.',
      'Mudança de residência para outro país.',
      'Viagem ao exterior por mais de um ano.',
      'Casamento com estrangeiro.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. De acordo com o Art. 12, § 4º, I da CF/88, será declarada a perda da nacionalidade do brasileiro que tiver cancelada sua naturalização, por sentença judicial, em virtude de fraude relacionada ao processo ou atentado contra a ordem constitucional e o Estado Democrático.'
  },
  {
    id: 16,
    enunciado: '16. O pedido expresso de perda da nacionalidade brasileira:',
    alternativas: [
      'Pode ser feito livremente, ainda que cause apatridia.',
      'É admitido pela Constituição, desde que não resulte em situação de apatridia.',
      'É proibido em qualquer situação.',
      'Só pode ser feito por brasileiro naturalizado.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O Art. 12, § 4º, II da CF (redação da EC 131/2023) admite a perda por pedido expresso feito perante autoridade brasileira competente, ressalvadas as situações que acarretem apatridia.'
  },
  {
    id: 17,
    enunciado: '17. Brasileiro nato é aquele que:',
    alternativas: [
      'Sempre precisa passar por processo de naturalização.',
      'Possui nacionalidade brasileira originária nas hipóteses previstas na Constituição.',
      'Reside no Brasil por mais de 15 anos.',
      'É obrigatoriamente filho de dois brasileiros.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O brasileiro nato possui a chamada nacionalidade originária ou primária, atribuída no momento do nascimento com base nos critérios estabelecidos pelo Art. 12, I da CF/88 (jus soli ou jus sanguinis).'
  },
  {
    id: 18,
    enunciado: '18. Um brasileiro naturalizado:',
    alternativas: [
      'Nunca poderá ser extraditado.',
      'Pode estar sujeito à extradição nas hipóteses previstas pela Constituição.',
      'É considerado estrangeiro para todos os efeitos.',
      'Não possui direitos políticos.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. Conforme o Art. 5º, LI da CF, nenhum brasileiro será extraditado, salvo o naturalizado, em caso de crime comum praticado antes da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes a qualquer tempo.'
  },
  {
    id: 19,
    enunciado: '19. Assinale a alternativa que apresenta somente cargos privativos de brasileiro nato:',
    alternativas: [
      'Presidente da República, Presidente da Câmara e Ministro do STF.',
      'Governador, Prefeito e Deputado Federal.',
      'Senador, Deputado Federal e Vereador.',
      'Ministro do STJ, Governador e Prefeito.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. Presidente da República (Art. 12, § 3º, I), Presidente da Câmara dos Deputados (Art. 12, § 3º, II) e Ministro do STF (Art. 12, § 3º, IV) são cargos privativos de brasileiro nato.'
  },
  {
    id: 20,
    enunciado: '20. Sobre nacionalidade, assinale a alternativa correta:',
    alternativas: [
      'Brasileiro nato e naturalizado são exatamente iguais em todas as situações, sem nenhuma exceção constitucional.',
      'A Constituição permite distinções entre natos e naturalizados somente nas hipóteses que ela própria estabelece.',
      'Todo naturalizado pode ser Presidente da República.',
      'Todo estrangeiro residente no Brasil é automaticamente naturalizado.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O princípio geral é a igualdade substancial entre natos e naturalizados (Art. 12, § 2º). Quaisquer distinções (cargos privativos, extradição, função no Conselho da República e propriedade de empresa jornalística) devem emanar da própria Carta Magna.'
  }
];

export const direitoConstTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. O filho de casal de diplomatas estrangeiros que nasce em Brasília, estando os genitores a serviço oficial de seu país de origem, é considerado brasileiro nato pelo critério do jus soli.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. O Art. 12, I, "a" da CF/88 expressamente exclui os nascidos de pais estrangeiros quando estes estiverem a serviço de seu país de origem (exceção ao jus soli).'
  },
  {
    id: 2,
    enunciado: '2. Para a naturalização de originários de países de língua portuguesa (como Portugal ou Angola), a Constituição exige residência por um ano ininterrupto e comprovação de idoneidade moral.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. É a hipótese facilitada do Art. 12, II, "a" da CF/88.'
  },
  {
    id: 3,
    enunciado: '3. Qualquer Ministro de Tribunal Superior (como STJ, TST ou STM) obrigatoriamente deve ser brasileiro nato.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. Somente os 11 Ministros do Supremo Tribunal Federal (STF) têm exigência constitucional de nacionalidade nata (Art. 12, § 3º, IV). Ministros do STJ ou TST podem ser naturalizados.'
  },
  {
    id: 4,
    enunciado: '4. Após a promulgação da Emenda Constitucional nº 131/2023, o brasileiro que adquire outra nacionalidade por vontade própria não perde mais automaticamente a nacionalidade brasileira.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. A EC 131/2023 extinguiu a hipótese de perda automática da nacionalidade brasileira pela mera aquisição voluntária de outra nacionalidade.'
  },
  {
    id: 5,
    enunciado: '5. A perda da nacionalidade brasileira a pedido expresso do cidadão é válida em qualquer situação, mesmo que resulte em condição de apatridia.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. O Art. 12, § 4º, II da CF expressamente ressalva que o pedido de renúncia NÃO será aceito se resultar em situação de apatridia.'
  }
];

export const direitoConstDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. [Caso Prático] Imagine que uma pessoa nasceu no exterior, mas seu pai é brasileiro. O pai estava trabalhando oficialmente a serviço da República Federativa do Brasil no momento do nascimento. Essa pessoa pode ser considerada brasileira nata? Qual é o dispositivo constitucional aplicável e por quê?',
    respostaEsperada: 'Gabarito Oficial: Sim, essa pessoa é brasileira nata com base no Art. 12, inciso I, alínea "b" da Constituição Federal de 1988 (jus sanguinis funcional). A norma estabelece que são brasileiros natos os nascidos no estrangeiro, de pai brasileiro ou de mãe brasileira, desde que qualquer deles esteja a serviço da República Federativa do Brasil (União, Estados, DF, Municípios ou suas autarquias/fundações).'
  },
  {
    id: 2,
    enunciado: '2. Explique com suas próprias palavras a diferença fundamental entre brasileiro nato e brasileiro naturalizado, cite 3 cargos que são privativos de brasileiro nato e esclareça se um brasileiro naturalizado pode ocupar a Presidência da República.',
    respostaEsperada: 'Gabarito Oficial: 1) Diferença: Brasileiro nato possui nacionalidade originária/primária (adquirida no nascimento por critérios do art. 12, I). Brasileiro naturalizado possui nacionalidade adquirida/secundária (adquirida voluntariamente ao longo da vida mediante naturalização, art. 12, II). 2) Cargos privativos de nato (Art. 12, § 3º): Presidente da República, Vice-Presidente, Presidente da Câmara dos Deputados, Presidente do Senado, Ministro do STF, Carreira diplomática, Oficial das Forças Armadas e Ministro da Defesa. 3) Presidência da República: Jamais. O cargo de Presidente e o de Vice-Presidente são privativos de brasileiro nato (Art. 12, § 3º, I), visando resguardar a soberania e segurança nacional.'
  },
  {
    id: 3,
    enunciado: '3. A aquisição de outra nacionalidade provoca automaticamente a perda da nacionalidade brasileira? Explique a sistemática constitucional vigente com a promulgação da Emenda Constitucional nº 131/2023 e as hipóteses de perda da nacionalidade.',
    respostaEsperada: 'Gabarito Oficial: Não! Com a Emenda Constitucional nº 131/2023, a aquisição voluntária de outra nacionalidade estrangeira NÃO gera mais a perda automática da nacionalidade brasileira. Atualmente, o Art. 12, § 4º prevê a perda somente em duas hipóteses: 1) Cancelamento judicial da naturalização por sentença transitada em julgado em caso de fraude no processo de naturalização ou atentado contra a ordem constitucional e o Estado Democrático; 2) Pedido expresso de renúncia perante autoridade competente, com a ressalva fundamental de que não cause apatridia (e com direito de readquirir a nacionalidade originária nos termos da lei).'
  }
];

export const direitoConstSummaryPoints = [
  'Conceito: Nacionalidade é o vínculo jurídico-político que liga o indivíduo ao Estado, tornando-o parte do povo.',
  'Brasileiro Nato (Art. 12, I): 1) Nascidos no Brasil (jus soli), salvo pais estrangeiros a serviço de seu país; 2) Nascidos no exterior de pai/mãe a serviço da RFB; 3) Nascidos no exterior com registro ou residência no Brasil + opção confirmativa após a maioridade.',
  'Brasileiro Naturalizado (Art. 12, II): Países de língua portuguesa (1 ano de residência ininterrupta + idoneidade moral); Demais estrangeiros (mais de 15 anos ininterruptos + sem condenação penal + requerimento).',
  'Igualdade Constitucional (Art. 12, § 2º): A lei não pode criar distinções entre natos e naturalizados, salvo as previstas na própria Constituição.',
  'Cargos Privativos de Nato (Art. 12, § 3º): Mnemônico P-V-C-S-M-D-O-D (Presidente, Vice, Pres. Câmara, Pres. Senado, Min. STF, Diplomacia, Oficial Forças Armadas, Min. Defesa).',
  'Portugueses no Brasil (Art. 12, § 1º): Quase-nacionalidade mediante reciprocidade aos brasileiros em Portugal.',
  'Perda da Nacionalidade (Art. 12, § 4º pós-EC 131/2023): Cancelamento judicial de naturalização (fraude ou atentado ao Estado Democrático) ou Pedido expresso (vedada a apatridia). Aquisição de outra cidadania NÃO gera mais perda automática!'
];

export const direitoConstVideoPracticalTask = {
  tema: 'Nacionalidade 🇧🇷',
  disciplina: 'Direito Constitucional',
  modalidade: 'Vídeo Oral para o Professor',
  situacaoPratica: 'Imagine que uma pessoa nasceu no exterior, mas seu pai é brasileiro. O pai estava trabalhando oficialmente a serviço da República Federativa do Brasil no momento do nascimento.',
  perguntas: [
    '1. Essa pessoa pode ser considerada brasileira nata? Por quê?',
    '2. Qual dispositivo da Constituição Federal trata das hipóteses de brasileiro nato?',
    '3. Explique com suas palavras a diferença entre brasileiro nato e brasileiro naturalizado.',
    '4. Cite 3 cargos privativos de brasileiro nato.',
    '5. Um brasileiro naturalizado pode ser Presidente da República? Explique.',
    '6. A aquisição de outra nacionalidade provoca automaticamente a perda da nacionalidade brasileira? Explique conforme a regra constitucional atual.'
  ],
  desafioFinal: 'Sem consultar o material, grave uma explicação de 1 a 2 minutos respondendo: "O que é nacionalidade e quais são as principais diferenças entre brasileiro nato e naturalizado?"',
  entrega: 'Gravar o vídeo e enviar ao professor para verificação do domínio do conteúdo, desenvoltura oral e clareza na exposição de conceitos jurídicos.'
};
