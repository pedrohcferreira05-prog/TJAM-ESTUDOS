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
    q: 'Qual é a classificação clássica da aplicabilidade das normas constitucionais mais cobrada em concursos e adotada pelo STF?',
    a: 'A classificação tripartida de José Afonso da Silva, dividindo as normas em: Eficácia Plena, Eficácia Contida e Eficácia Limitada.'
  },
  {
    id: 2,
    q: 'O que é uma Norma de Eficácia Plena?',
    a: 'É aquela que já possui todos os elementos necessários para produzir seus efeitos essenciais imediatamente desde a promulgação da Constituição, sem depender de lei posterior.'
  },
  {
    id: 3,
    q: 'Quais são as três características essenciais da Norma de Eficácia Plena?',
    a: 'Aplicação DIRETA (não depende de intermediário), IMEDIATA (produz efeitos desde logo) e INTEGRAL (não pode ter seu alcance reduzido por lei infraconstitucional).'
  },
  {
    id: 4,
    q: 'Qual é a palavra-chave para lembrar da Norma de Eficácia Plena?',
    a: 'Palavra-chave: COMPLETA. Ela nasce pronta e acabada para produzir 100% de seus efeitos.'
  },
  {
    id: 5,
    q: 'Cite exemplos de Normas Constitucionais de Eficácia Plena.',
    a: 'Normas que estabelecem competências dos Poderes, vedações constitucionais expressas (ex: vedação à pena de morte em tempo de paz, art. 5º, XLVII) e remédios como Habeas Corpus.'
  },
  {
    id: 6,
    q: 'O que é uma Norma de Eficácia Contida (ou redutível)?',
    a: 'É aquela que possui aplicabilidade direta e imediata, produzindo efeitos plenos desde o início, mas cujo alcance pode ser restringido (contido) por lei ordinária posterior.'
  },
  {
    id: 7,
    q: 'Quais são as características da Norma de Eficácia Contida?',
    a: 'Aplicação DIRETA, IMEDIATA e NÃO INTEGRAL (pois está sujeita a limites ou restrições impostas por lei infraconstitucional ou pela própria CF).'
  },
  {
    id: 8,
    q: 'Qual é a palavra-chave para lembrar da Norma de Eficácia Contida?',
    a: 'Palavra-chave: PODE SER REDUZIDA. Ela nasce ampla, mas o legislador pode encolher sua abrangência.'
  },
  {
    id: 9,
    q: 'Qual é o exemplo mais clássico de Norma de Eficácia Contida cobrado em prova?',
    a: 'Art. 5º, XIII: "é livre o exercício de qualquer trabalho, ofício ou profissão, atendidas as qualificações profissionais que a lei estabelecer". Na ausência de lei, qualquer pessoa pode exercer a profissão livremente.'
  },
  {
    id: 10,
    q: 'O que ocorre com uma Norma de Eficácia Contida enquanto não houver lei regulamentadora?',
    a: 'Produz eficácia PLENA e ampla. A liberdade é a regra; a restrição só existirá após a vigência de lei restritiva expressa.'
  },
  {
    id: 11,
    q: 'O que é uma Norma de Eficácia Limitada?',
    a: 'É aquela que não possui aptidão para produzir seus efeitos essenciais de imediato, dependendo obrigatoriamente de integração normativa infraconstitucional (lei futura).'
  },
  {
    id: 12,
    q: 'Quais são as características da Norma de Eficácia Limitada?',
    a: 'Aplicação INDIRETA, MEDIATA (não imediata) e DIFERIDA / REDUZIDA no momento da promulgação.'
  },
  {
    id: 13,
    q: 'Quais são as duas espécies de Normas de Eficácia Limitada consagradas pelo STF?',
    a: '1) Normas de princípio institutivo (organizativas): estruturam órgãos e entidades; 2) Normas de princípio programático: traçam metas sociais e econômicas do Estado.'
  },
  {
    id: 14,
    q: 'Qual remédio constitucional é cabível contra a omissão de lei regulamentadora em norma de eficácia limitada?',
    a: 'Mandado de Injunção (art. 5º, LXXI) para o caso concreto e Ação Direta de Inconstitucionalidade por Omissão (ADO, art. 103, § 2º) no controle concentrado.'
  },
  {
    id: 15,
    q: 'Qual é a principal PEGADINHA de prova entre Norma Contida e Norma Limitada?',
    a: 'A CONTIDA já nasce produzindo efeitos plenos até que venha lei para conter/restringir. A LIMITADA nasce sem produzir efeitos essenciais até que venha lei para integrar/complementar.'
  }
];

export const direitoConstMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A classificação das normas constitucionais em normas de eficácia plena, contida e limitada, amplamente utilizada pela jurisprudência do STF e pela doutrina brasileira, foi formulada por:',
    alternativas: [
      'Celso Antônio Bandeira de Mello.',
      'José Afonso da Silva.',
      'Maria Sylvia Zanella Di Pietro.',
      'Hely Lopes Meirelles.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. A clássica e dominante classificação tripartida adotada pelo STF (Tesauro) e pelas bancas (como a FGV) é de autoria do professor José Afonso da Silva em sua consagrada obra "Aplicabilidade das Normas Constitucionais".'
  },
  {
    id: 2,
    enunciado: '2. As normas constitucionais de eficácia plena caracterizam-se por possuírem aplicação:',
    alternativas: [
      'Indireta, mediata e não integral.',
      'Direta, imediata e integral, independendo de regulamentação para produzir seus efeitos essenciais.',
      'Direta, mediata e sujeita a restrições legais.',
      'Indireta, imediata e dependente de lei ordinária.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. As normas de eficácia plena são completas: têm aplicação direta (não dependem de intermediação), imediata (vigoram desde a publicação) e integral (não podem sofrer contenção ou redução por lei infraconstitucional).'
  },
  {
    id: 3,
    enunciado: '3. A palavra-chave que melhor sintetiza a natureza da norma constitucional de eficácia plena é:',
    alternativas: [
      'COMPLETA.',
      'CONDICIONADA.',
      'RESTRINGÍVEL.',
      'PROGRAMÁTICA.'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. "COMPLETA". A norma de eficácia plena já contém em seu próprio texto todos os elementos normativos necessários à sua plena e perfeita exeqüibilidade.'
  },
  {
    id: 4,
    enunciado: '4. Sobre a norma constitucional de eficácia contida, é correto afirmar que:',
    alternativas: [
      'Não produz qualquer efeito até a edição de lei pelo Congresso Nacional.',
      'Possui aplicação imediata, mas seu alcance pode ser restringido por ato normativo posterior.',
      'Depende exclusivamente de emenda constitucional para ter sua eficácia deflagrada.',
      'Tem aplicação indireta e mediata, à semelhança das normas programáticas.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. A norma de eficácia contida nasce com aptidão para gerar todos os efeitos de forma imediata e direta, mas confere ao legislador infraconstitucional a prerrogativa de limitar ou restringir o seu alcance.'
  },
  {
    id: 5,
    enunciado: '5. O artigo 5º, inciso XIII, da CF/88 estabelece que "é livre o exercício de qualquer trabalho, ofício ou profissão, atendidas as qualificações profissionais que a lei estabelecer". Trata-se de típica norma de eficácia:',
    alternativas: [
      'Plena.',
      'Limitada de princípio institutivo.',
      'Contida.',
      'Limitada de princípio programático.'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. Eficácia contida! O exercício profissional é livre desde logo (aplicação imediata). No entanto, a lei pode exigir qualificações técnicas e requisitos (ex: diploma, exame da OAB, registro no CRM), contendo o alcance da liberdade.'
  },
  {
    id: 6,
    enunciado: '6. Caso determinada profissão não possua qualquer lei regulamentando requisitos ou qualificações específicas, com base na eficácia contida do art. 5º, XIII, da CF/88:',
    alternativas: [
      'Nenhum cidadão poderá exercê-la até que sobrevenha lei regulamentadora.',
      'Qualquer cidadão poderá exercê-la livremente, haja vista a aplicabilidade plena e direta imediata da norma.',
      'O exercício da profissão dependerá de autorização discricionária do Poder Executivo.',
      'Deverá ser impetrado mandado de injunção para autorizar cada profissional.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Na ausência de lei restritiva, a eficácia é PLENA e irrestrita. O direito de exercer a profissão é pleno até que eventualmente uma lei válida imponha limites.'
  },
  {
    id: 7,
    enunciado: '7. A norma de eficácia contida difere da norma de eficácia limitada substancialmente porque:',
    alternativas: [
      'A norma contida precisa de lei para produzir efeitos, enquanto a limitada não precisa.',
      'A norma contida já vigora com eficácia total até que lei a restrinja, enquanto a limitada não produz seus efeitos plenos sem lei integradora.',
      'A norma limitada admite mandado de segurança e a norma contida não admite.',
      'A norma contida refere-se apenas a matérias administrativas e a limitada ao processo civil.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Esta é a distinção fulcral: A contida já nasce com eficácia plena (restringível por lei); a limitada já nasce carente de lei para ser executável em sua plenitude (precisa ser complementada).'
  },
  {
    id: 8,
    enunciado: '8. As normas constitucionais de eficácia limitada apresentam aplicabilidade:',
    alternativas: [
      'Direta, imediata e integral.',
      'Direta, mediata e passível de contenção.',
      'Indireta, mediata e reduzida.',
      'Instantânea e autoaplicável.'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. Aplicação INDIRETA (depende de veículo normativo intermediador), MEDIATA (não ocorre de imediato) e REDUZIDA (sua executoriedade principal fica represada até a lei integradora).'
  },
  {
    id: 9,
    enunciado: '9. As normas constitucionais de eficácia limitada subdividem-se, segundo a doutrina e o STF, em:',
    alternativas: [
      'Normas de eficácia absoluta e normas de eficácia exaurida.',
      'Normas de princípio institutivo (ou organizativo) e normas de princípio programático.',
      'Normas materiais e normas formais.',
      'Normas originárias e normas derivadas.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Dividem-se em: a) Normas de princípio institutivo/organizativo (visam à estruturação de órgãos e entidades do Estado); b) Normas de princípio programático (traçam programas, diretrizes e metas de ação estatal).'
  },
  {
    id: 10,
    enunciado: '10. O artigo 37, inciso VII, da CF/88, em sua redação original, estabelece que "o direito de greve será exercido nos termos e nos limites definidos em lei específica". Conforme reiterada jurisprudência do STF, esse dispositivo é exemplo clássico de norma de eficácia:',
    alternativas: [
      'Plena.',
      'Contida.',
      'Limitada.',
      'Exaurida.'
    ],
    correta: 2,
    explicacao: '✅ Gabarito: C. Eficácia Limitada! O STF pacificou que o direito de greve dos servidores públicos civis depende de lei específica. Diante da omissão legislativa inconstitucional do Congresso, o STF julgou os MIs 670, 708 e 712 aplicando temporariamente a Lei de Greve do setor privado (Lei 7.783/89).'
  },
  {
    id: 11,
    enunciado: '11. As normas que estabelecem deveres de atuação do Estado na busca do pleno emprego, da erradicação da pobreza e da redução das desigualdades sociais (art. 3º e art. 170 da CF/88) são classificadas como:',
    alternativas: [
      'Normas de eficácia contida institutiva.',
      'Normas de eficácia limitada de princípio programático.',
      'Normas de eficácia plena absoluta.',
      'Normas infraconstitucionais secundárias.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Normas de eficácia limitada de princípio programático. Elas indicam metas, diretrizes econômicas, sociais e programas a serem implementados pelos poderes públicos.'
  },
  {
    id: 12,
    enunciado: '12. Embora a norma de eficácia limitada dependa de lei para produzir sua eficácia positiva total, é correto afirmar que ela possui eficácia jurídica mínima, porque:',
    alternativas: [
      'Pode revogar leis infraconstitucionais anteriores que lhe sejam contrárias e impede a edição de leis futuras incompatíveis.',
      'Pode ser aplicada discricionariamente pelo juiz sem qualquer parâmetro constitucional.',
      'Gera direitos subjetivos líquidos e certos de imediato a qualquer cidadão.',
      'Equivale em tudo a uma recomendação política sem qualquer força vinculante.'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Não existem normas constitucionais desprovidas de eficácia jurídica (eficácia jurídica zero). Mesmo as normas limitadas e programáticas revogam o direito infraconstitucional anterior conflitante e servem de parâmetro para a declaração de inconstitucionalidade de leis futuras.'
  },
  {
    id: 13,
    enunciado: '13. Para combater a inércia do Poder Legislativo em regulamentar norma constitucional de eficácia limitada, quando a falta de norma inviabilizar o exercício de direitos e liberdades constitucionais, o cidadão prejudicado pode ajuizar:',
    alternativas: [
      'Ação Popular.',
      'Mandado de Injunção.',
      'Habeas Data.',
      'Ação Rescisória.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Mandado de Injunção (art. 5º, LXXI da CF/88): "conceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania".'
  },
  {
    id: 14,
    enunciado: '14. A expressão "a lei disporá sobre a criação e extinção de Ministérios e órgãos da administração pública" configura uma norma constitucional de eficácia:',
    alternativas: [
      'Limitada de princípio institutivo.',
      'Contida.',
      'Plena.',
      'Programática difusa.'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Limitada de princípio institutivo (ou organizativo). Ela remete ao legislador a tarefa de estruturar, criar e organizar os órgãos da Administração Pública.'
  },
  {
    id: 15,
    enunciado: '15. O artigo 5º, inciso LVI, da CF/88 prevê: "são inadmissíveis, no processo, as provas obtidas por meios ilícitos". Esta norma é classificada como de eficácia:',
    alternativas: [
      'Limitada, pois depende de lei adjetiva processual.',
      'Plena, pois é vedação direta, imediata e inderrogável por lei ordinária.',
      'Contida, pois a lei pode autorizar provas ilícitas em casos graves.',
      'Programática, pois visa à melhoria da moralidade forense.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Eficácia PLENA! Estabelece uma vedação proibitiva direta, peremptória e autoaplicável. A lei ordinária não pode restringir nem modular essa garantia contra a ilicitude probatória.'
  },
  {
    id: 16,
    enunciado: '16. O artigo 5º, § 1º, da Constituição Federal estabelece que "as normas definidoras dos direitos e garantias fundamentais têm aplicação imediata". Diante desse mandamento, a doutrina e a jurisprudência assentam que:',
    alternativas: [
      'Todas as normas de direitos fundamentais são necessariamente de eficácia plena.',
      'Trata-se de regra de presunção de autoaplicabilidade, embora continuem existindo direitos fundamentais dependentes de integração (eficácia contida e limitada).',
      'As normas de eficácia limitada foram extirpadas da Constituição pelo § 1º.',
      'O Judiciário está proibido de julgar omissões legislativas em sede de direitos fundamentais.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. O § 1º do art. 5º consagra um princípio de máxima efetividade e presunção de aplicabilidade imediata. Contudo, ele não transforma magicamente toda e qualquer norma em plena; continuam a existir normas fundamentais de eficácia contida e limitada (como o direito de greve do servidor e a liberdade de profissão).'
  },
  {
    id: 17,
    enunciado: '17. Considere a assertiva: "As normas de eficácia contida podem ser restringidas não apenas por lei infraconstitucional expressa, mas também por outras normas e conceitos ético-jurídicos da própria Constituição". Essa afirmação está:',
    alternativas: [
      'Correta, pois a contenção pode derivar de lei ordinária, de outras normas da CF ou de conceitos indeterminados como ordem pública e segurança.',
      'Incorreta, pois apenas medida provisória pode restringir norma de eficácia contida.',
      'Incorreta, pois a restrição somente pode ser feita por emenda constitucional.',
      'Incorreta, pois normas de eficácia contida não admitem restrição após promulgada a Constituição.'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Correta. A doutrina de José Afonso da Silva ensina que a restrição à norma contida pode decorrer: 1) da lei infraconstitucional; 2) de outras normas constitucionais (ex: estado de defesa/sítio); 3) de conceitos constitucionais indeterminados.'
  },
  {
    id: 18,
    enunciado: '18. Maria Helena Diniz classifica as normas constitucionais em: eficácia absoluta, eficácia plena, eficácia relativa restringível e eficácia relativa complementável. A correspondência correta com a classificação de José Afonso da Silva é:',
    alternativas: [
      'Eficácia relativa restringível = eficácia contida; eficácia relativa complementável = eficácia limitada.',
      'Eficácia relativa restringível = eficácia limitada; eficácia relativa complementável = eficácia plena.',
      'Eficácia absoluta = eficácia contida; eficácia plena = eficácia limitada.',
      'Eficácia relativa complementável = eficácia plena; eficácia relativa restringível = cláusulas pétreas.'
    ],
    correta: 0,
    explicacao: '✅ Gabarito: A. Na terminologia de Maria Helena Diniz: 1) Relativa restringível corresponde exatamente à Eficácia Contida (restringível por lei); 2) Relativa complementável/dependente de complementação corresponde à Eficácia Limitada.'
  },
  {
    id: 19,
    enunciado: '19. No âmbito do controle de constitucionalidade, as normas programáticas (eficácia limitada):',
    alternativas: [
      'Não servem de parâmetro para Ação Direta de Inconstitucionalidade (ADI).',
      'Possuem eficácia paralisante e revogatória sobre as leis anteriores que contrariem seus mandamentos.',
      'Podem ser ignoradas pelo Poder Executivo sem qualquer consequência orçamentária ou jurídica.',
      'Têm valor apenas pedagógico, sem vincular os órgãos judiciais.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Possuem eficácia paralisante (impedem a vigência de atos futuros contrários) e eficácia revogatória/derrogatória sobre a legislação pré-constitucional incompatível, além de vincularem a interpretação dos juízes e a atividade administrativa.'
  },
  {
    id: 20,
    enunciado: '20. Em uma questão de concurso do TJAM formulada pela FGV, o examinador exige identificar a correta correlação entre o instituto e sua característica. Assinale a afirmativa correta:',
    alternativas: [
      'Norma de eficácia plena: aplicação indireta e mediata; depende de sanção presidencial.',
      'Norma de eficácia contida: aplicação direta e imediata; o legislador pode reduzir sua abrangência prática.',
      'Norma de eficácia limitada: aplicação direta e integral; não admite mandado de injunção.',
      'Norma programática: não possui qualquer eficácia jurídica, sendo mera declaração lírica.'
    ],
    correta: 1,
    explicacao: '✅ Gabarito: B. Perfeito! A norma de eficácia contida possui aplicabilidade direta e imediata, operando com plenitude até que o legislador infraconstitucional reduza sua abrangência prática por meio de lei restritiva.'
  }
];

export const direitoConstTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A norma de eficácia plena não necessita de nenhuma lei infraconstitucional para produzir todos os seus efeitos fundamentais.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. Ela é completa e autoaplicável desde o primeiro dia de vigência da Constituição.'
  },
  {
    id: 2,
    enunciado: '2. Uma norma constitucional de eficácia contida somente começa a produzir efeitos no ordenamento jurídico após a publicação da lei ordinária regulamentadora.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. A norma de eficácia contida possui aplicabilidade IMEDIATA e DIRETA; ela já produz efeitos imediatos. A lei serve apenas para RESTRINGIR (conter), e não para autorizar o início dos efeitos.'
  },
  {
    id: 3,
    enunciado: '3. O art. 5º, XIII, da CF/88 (liberdade do exercício profissional) é classificado pela doutrina e pelo STF como norma constitucional de eficácia contida.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. É o exemplo mais cobrado em bancas de concurso: qualquer trabalho é livre de imediato, ressalvadas as qualificações profissionais que a lei estabelecer.'
  },
  {
    id: 4,
    enunciado: '4. As normas constitucionais de princípio programático, por serem de eficácia limitada, são desprovidas de qualquer eficácia jurídica, funcionando como meras sugestões morais.',
    correta: false,
    explicacao: '✅ Gabarito: Falso. Não existe norma constitucional com "eficácia zero". As normas programáticas revogam leis anteriores incompatíveis, servem de parâmetro de controle de constitucionalidade e fixam balizas intransponíveis ao Poder Público.'
  },
  {
    id: 5,
    enunciado: '5. Diante da mora legislativa que inviabilize o exercício de direito previsto em norma de eficácia limitada, o cidadão pode valer-se de Mandado de Injunção.',
    correta: true,
    explicacao: '✅ Gabarito: Verdadeiro. O Mandado de Injunção (art. 5º, LXXI) é a garantia constitucional destinada exatamente a superar a inércia legislativa prejudicial ao cidadão.'
  }
];

export const direitoConstDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Diferencie a Norma Constitucional de Eficácia Contida da Norma de Eficácia Limitada, abordando momento de produção de efeitos, necessidade de lei infraconstitucional e consequências da inércia do legislador.',
    respostaEsperada: 'Gabarito Oficial (Padrão de Resposta): 1) Norma de Eficácia Contida: Possui aplicabilidade direta, imediata e não integral. Produz todos os seus efeitos desde a promulgação da CF. A lei infraconstitucional tem papel restritivo (conter ou delimitar o alcance). Caso o legislador permaneça inerte (não edite lei), a norma continuará gerando eficácia plena e irrestrita. 2) Norma de Eficácia Limitada: Possui aplicabilidade indireta, mediata e reduzida. Não produz seus efeitos essenciais de plano, necessitando obrigatoriamente de lei integradora (complementar ou ordinária) para alcançar plena executoriedade. Caso o legislador permaneça inerte, o direito permanece obstado no plano fático, ensejando Mandado de Injunção ou Ação Direta de Inconstitucionalidade por Omissão (ADO).'
  },
  {
    id: 2,
    enunciado: '2. Explique o significado e o alcance das Normas de Eficácia Limitada de Princípio Programático e comente por que a doutrina afirma que tais normas possuem "eficácia jurídica mínima".',
    respostaEsperada: 'Gabarito Oficial: Normas de princípio programático são aquelas que estabelecem diretrizes, metas, fins e programas de ação social e econômica para o Estado (ex: erradicação da pobreza, saúde, moradia, proteção à infância). Afirma-se que possuem eficácia jurídica mínima porque: a) Revogam expressa ou tacitamente a legislação infraconstitucional anterior contrária à sua diretriz; b) Impedem a edição de novas leis incompatíveis com seus fins (servindo de parâmetro para o controle concentrado ou difuso de constitucionalidade); c) Vinculam o administrador e o juiz na interpretação e aplicação de todo o ordenamento jurídico.'
  }
];

export const direitoConstSummaryPoints = [
  'Eficácia Plena: Aplicação direta, imediata e integral. Não depende de regulamentação para produzir todos os seus efeitos essenciais (Palavra-chave: COMPLETA).',
  'Eficácia Contida: Aplicação direta, imediata e restringível. Produz efeitos plenos desde o início, mas a lei ordinária posterior pode delimitar ou conter seu alcance (Palavra-chave: PODE SER REDUZIDA — Ex: Art. 5º, XIII).',
  'Eficácia Limitada: Aplicação indireta, mediata e diferida. Depende de lei integradora para produzir seus efeitos essenciais (Palavra-chave: PRECISA SER COMPLEMENTADA).',
  'Subespécies da Limitada: 1) Princípio institutivo (estruturação de órgãos e entidades públicas); 2) Princípio programático (traça metas sociais e econômicas do Estado).',
  'Remédios contra omissão em norma limitada: Mandado de Injunção (art. 5º, LXXI) para o caso concreto e ADO (art. 103, § 2º) no controle concentrado.',
  'Pegadinha de prova FGV: Contida ≠ Limitada. A contida já vigora ampla até que a lei a restrinja; se não houver lei, ela é 100% livre. A limitada não tem plena executoriedade até que a lei a integre.'
];
