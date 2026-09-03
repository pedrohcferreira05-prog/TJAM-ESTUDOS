// Data for Geografia do Amazonas — 2ª Aula: Aspectos Humanos e Econômicos do Amazonas

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
  correta: number; // 0 for A, 1 for B, 2 for C, 3 for D
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

export const geografiaAmazonasFlashcardsData: FlashcardItem[] = [
  {
    q: 'Como se caracteriza a distribuição da população no Estado do Amazonas?',
    a: 'Forte concentração na capital, Manaus (mais de 50% da população estadual). No interior do Estado, a população é dispersa e rarefeita, com núcleos urbanos e ribeirinhos localizados majoritariamente às margens dos rios.'
  },
  {
    q: 'Qual é o papel histórico e geográfico dos rios na ocupação do território amazonense?',
    a: 'Os rios funcionam como verdadeiras "hidrovias naturais" (estradas líquidas), sendo as principais vias de transporte de passageiros, circulação de mercadorias, abastecimento e integração sociocultural das comunidades.'
  },
  {
    q: 'Qual é a importância socioeconômica de Manaus no contexto estadual?',
    a: 'Capital do Estado, principal centro urbano, maior polo econômico, financeiro, industrial e de serviços do Amazonas, além de polo de circulação de pessoas e cargas em toda a Amazônia Ocidental.'
  },
  {
    q: 'O que é a Zona Franca de Manaus (ZFM) e qual foi seu objetivo de criação?',
    a: 'Modelo de desenvolvimento econômico instituído pelo Decreto-Lei nº 288/1967 com incentivos fiscais para atrair indústrias, investimentos e mão de obra, promovendo a integração e soberania na Amazônia.'
  },
  {
    q: 'O que é o Polo Industrial de Manaus (PIM) e quais são seus principais segmentos?',
    a: 'É a base industrial da ZFM, altamente diversificada e tecnológica. Principais polos:\n• Eletroeletrônicos e informática;\n• Duas rodas (motocicletas e bicicletas);\n• Eletrodomésticos (linha branca/marrom);\n• Químico e termoplásticos;\n• Metalúrgico e outros bens de consumo.'
  },
  {
    q: 'Como se divide a atividade extrativista no Amazonas?',
    a: '• Extrativismo Vegetal: madeira manejada, castanha-do-brasil, açaí, borracha e óleos vegetais;\n• Extrativismo Mineral: exploração de gás natural e petróleo (Província de Urucu), cassiterita, potássio e outros minerais.'
  },
  {
    q: 'Qual a importância da pesca e da agropecuária na economia do Amazonas?',
    a: '• Pesca: fundamental para a subsistência alimentar, renda e cultura tradicional de comunidades ribeirinhas e indígenas;\n• Agropecuária: importância econômica menor quando comparada ao setor industrial de Manaus, concentrada em áreas com condições edafoclimáticas e de mercado favoráveis.'
  },
  {
    q: 'Por que o transporte fluvial possui primazia absoluta no Amazonas?',
    a: 'Devido à imensa extensão territorial, densidade da floresta tropical e gigantesca rede de rios navegáveis, combinadas à baixa densidade de malha rodoviária e ferroviária.'
  },
  {
    q: 'Quais são os principais impactos urbanos e ambientais decorrentes do crescimento desordenado de Manaus?',
    a: 'Ocupação de áreas de preservação permanente (APPs) e margens de igarapés, formação de palafitas e ocupações irregulares, poluição hídrica, deficiência em saneamento básico e coleta de resíduos sólidos, e pressão sobre remanescentes florestais.'
  },
  {
    q: 'Quais os 5 pontos de ouro para gabaritar Geografia Humana e Econômica do Amazonas no TJAM?',
    a: '1) Manaus → Principal centro econômico, demográfico e urbano;\n2) Zona Franca → Desenvolvimento econômico e atração de indústrias;\n3) Polo Industrial de Manaus (PIM) → Eletrônicos e motocicletas;\n4) Rios → Transporte, abastecimento e integração territorial;\n5) Interior → População dispersa e economia baseada em extrativismo e pesca.'
  }
];

export const geografiaAmazonasMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A população do Amazonas apresenta como característica:',
    opcoes: [
      'A) Distribuição uniforme por todo o território.',
      'B) Forte concentração populacional em Manaus.',
      'C) Concentração exclusiva nas áreas rurais.',
      'D) Predomínio populacional no extremo oeste.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. A população do Estado do Amazonas apresenta altíssima concentração espacial na capital, Manaus, onde vive mais da metade de todos os habitantes do Estado. O restante do território possui baixa densidade demográfica e população dispersa.'
  },
  {
    id: 2,
    enunciado: '2. Um fator histórico que contribuiu para a ocupação e integração do território amazonense foi:',
    opcoes: [
      'A) A extensa rede ferroviária.',
      'B) A navegação pelos rios.',
      'C) A presença de rodovias em todo o Estado.',
      'D) O transporte aéreo exclusivamente.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. Historicamente, os rios funcionaram como os principais caminhos naturais de penetração, povoamento, comunicação e transporte de mercadorias e pessoas em todo o território amazonense.'
  },
  {
    id: 3,
    enunciado: '3. Manaus exerce papel de destaque no Amazonas principalmente por ser:',
    opcoes: [
      'A) O principal centro urbano, econômico e de serviços do Estado.',
      'B) Um município predominantemente agrícola.',
      'C) O principal produtor nacional de café.',
      'D) Um centro exclusivamente turístico.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Manaus é a capital, maior metrópole regional e o coração econômico do Estado, concentrando a maior parte do PIB estadual, do setor industrial (PIM), comércio e serviços.'
  },
  {
    id: 4,
    enunciado: '4. A Zona Franca de Manaus tem como uma de suas principais finalidades:',
    opcoes: [
      'A) Estimular o desenvolvimento econômico da região.',
      'B) Impedir a instalação de indústrias.',
      'C) Substituir completamente o extrativismo.',
      'D) Concentrar a produção agrícola do Amazonas.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A criação da Zona Franca de Manaus teve como objetivo central promover o desenvolvimento econômico, a atração de capitais e indústrias, e a integração e ocupação da Amazônia Ocidental por meio de benefícios tributários.'
  },
  {
    id: 5,
    enunciado: '5. O Polo Industrial de Manaus caracteriza-se principalmente pela:',
    opcoes: [
      'A) Produção exclusivamente agrícola.',
      'B) Concentração de atividades industriais diversificadas.',
      'C) Exploração exclusiva de madeira.',
      'D) Produção exclusivamente mineral.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. O Polo Industrial de Manaus (PIM) é caracterizado pela concentração de empresas industriais de ponta em diversos segmentos produtivos (eletrônicos, duas rodas, químico, metalúrgico, termoplásticos, informática, etc.).'
  },
  {
    id: 6,
    enunciado: '6. Entre os setores presentes no Polo Industrial de Manaus destaca-se:',
    opcoes: [
      'A) Motocicletas e eletrônicos.',
      'B) Apenas produção de alimentos.',
      'C) Apenas mineração.',
      'D) Apenas pecuária.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Os setores de fabricação de motocicletas (polo de duas rodas) e bens eletrônicos e de informática representam as principais âncoras em faturamento e emprego do Polo Industrial de Manaus.'
  },
  {
    id: 7,
    enunciado: '7. No Amazonas, o transporte fluvial possui grande importância devido:',
    opcoes: [
      'A) À pequena quantidade de rios.',
      'B) À extensa rede hidrográfica e às características territoriais do Estado.',
      'C) À inexistência de transporte terrestre.',
      'D) Ao predomínio absoluto das ferrovias.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. A gigantesca bacia hidrográfica amazônica somada às imensas distâncias territoriais e à cobertura florestal densa faz dos rios as principais vias de circulação e ligação intermunicipal.'
  },
  {
    id: 8,
    enunciado: '8. Os rios amazonenses são importantes para:',
    opcoes: [
      'A) Apenas atividades turísticas.',
      'B) Transporte, abastecimento e integração de comunidades.',
      'C) Somente geração de energia.',
      'D) Exclusivamente atividades industriais.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. Os rios no Amazonas têm função multifuncional: viabilizam o deslocamento diário de populações, garantem o escoamento de produtos e alimentos, sustentam a pesca e integram comunidades ribeirinhas e indígenas.'
  },
  {
    id: 9,
    enunciado: '9. É exemplo de atividade extrativista vegetal:',
    opcoes: [
      'A) Fabricação de motocicletas.',
      'B) Extração de castanha.',
      'C) Produção de computadores.',
      'D) Montagem de eletrodomésticos.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. A coleta de castanha-do-brasil (castanha-da-amazônia), açaí, madeira e látex são atividades típicas do extrativismo vegetal na região.'
  },
  {
    id: 10,
    enunciado: '10. Entre as atividades econômicas tradicionais importantes para diversas comunidades do Amazonas está:',
    opcoes: [
      'A) Pesca.',
      'B) Siderurgia pesada.',
      'C) Produção automobilística em todo o interior.',
      'D) Mineração de carvão em larga escala.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A pesca artesanal e comercial é uma atividade econômica e cultural primordial para o sustento e renda de milhares de famílias e comunidades no interior do Amazonas.'
  },
  {
    id: 11,
    enunciado: '11. Sobre a economia amazonense, é correto afirmar que:',
    opcoes: [
      'A) A indústria possui forte concentração em Manaus.',
      'B) A indústria está distribuída igualmente por todos os municípios.',
      'C) A Zona Franca não possui importância econômica.',
      'D) O setor industrial inexiste no Estado.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A atividade fabril do Estado é fortemente hiperconcentrada na capital (Manaus), impulsionada pelos incentivos fiscais da Zona Franca de Manaus.'
  },
  {
    id: 12,
    enunciado: '12. Um dos efeitos positivos associados à Zona Franca de Manaus é:',
    opcoes: [
      'A) Atração de empresas e investimentos.',
      'B) Redução da atividade industrial.',
      'C) Desestímulo ao emprego urbano.',
      'D) Isolamento econômico de Manaus.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. Entre os principais reflexos benéficos da ZFM estão a atração de multinacionais, vultosos aportes de investimentos privados nacionais e estrangeiros e geração de centenas de milhares de empregos diretos e indiretos.'
  },
  {
    id: 13,
    enunciado: '13. A distribuição populacional do Amazonas pode ser explicada, entre outros fatores:',
    opcoes: [
      'A) Pela importância histórica dos rios na circulação e ocupação territorial.',
      'B) Pela existência de uma extensa rede ferroviária.',
      'C) Pela ausência de áreas de floresta.',
      'D) Pela uniformidade das condições de ocupação.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. O padrão de povoamento do Amazonas orientou-se historicamente pelas calhas dos grandes rios e igarapés, que permitiam navegação, sobrevivência, pesca e trocas comerciais.'
  },
  {
    id: 14,
    enunciado: '14. Um dos principais problemas associados ao crescimento urbano desordenado é:',
    opcoes: [
      'A) Melhoria automática da infraestrutura.',
      'B) Ocupação de áreas inadequadas e aumento de problemas ambientais.',
      'C) Redução da produção de resíduos.',
      'D) Desaparecimento da pressão sobre áreas naturais.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. O rápido inchaço demográfico e urbano gera ocupações em áreas de risco (encostas e várzeas/igarapés), déficit de saneamento, poluição e problemas ambientais graves.'
  },
  {
    id: 15,
    enunciado: '15. Qual alternativa apresenta apenas atividades econômicas relacionadas ao Amazonas?',
    opcoes: [
      'A) Indústria, extrativismo, pesca e agropecuária.',
      'B) Apenas indústria automobilística e siderurgia.',
      'C) Apenas agricultura mecanizada.',
      'D) Apenas mineração.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A estrutura produtiva do Estado do Amazonas abrange indústria (PIM), extrativismo vegetal e mineral, pesca e atividades agropecuárias nas áreas vocacionadas.'
  },
  {
    id: 16,
    enunciado: '16. O extrativismo mineral corresponde:',
    opcoes: [
      'A) À retirada de recursos minerais da natureza.',
      'B) À produção de bens eletrônicos.',
      'C) À criação de animais.',
      'D) À pesca artesanal.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. O extrativismo mineral define-se pela atividade de prospecção, lavra e extração direta de substâncias minerais úteis depositadas na crosta terrestre (ex.: petróleo, gás, cassiterita).'
  },
  {
    id: 17,
    enunciado: '17. A concentração econômica em Manaus está diretamente relacionada:',
    opcoes: [
      'A) À importância do Polo Industrial e da Zona Franca.',
      'B) À inexistência de atividades industriais.',
      'C) Exclusivamente à agricultura.',
      'D) À ausência de serviços.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A primazia e hegemonia de Manaus na arrecadação tributária e geração de riquezas estadual decorre fundamentalmente da presença da Zona Franca e do Polo Industrial de Manaus.'
  },
  {
    id: 18,
    enunciado: '18. Para muitas comunidades do interior do Amazonas, os rios funcionam como:',
    opcoes: [
      'A) Barreiras sem utilidade econômica.',
      'B) Importantes vias de transporte e comunicação.',
      'C) Apenas áreas de preservação.',
      'D) Exclusivamente fontes de energia.'
    ],
    correta: 1,
    explicacao: 'Gabarito Oficial: B. Para as cidades e vilas do interior do Amazonas, os rios são os eixos vitais por onde ocorrem todas as viagens, envio de medicamentos, víveres e comunicação com a capital e comarcas vizinhas.'
  },
  {
    id: 19,
    enunciado: '19. Assinale a alternativa que apresenta um possível impacto negativo do crescimento urbano:',
    opcoes: [
      'A) Melhoria automática do saneamento.',
      'B) Redução da produção de lixo.',
      'C) Pressão sobre áreas naturais e problemas de infraestrutura.',
      'D) Diminuição da ocupação territorial.'
    ],
    correta: 2,
    explicacao: 'Gabarito Oficial: C. O crescimento urbano não planejado acarreta intensa pressão sobre mananciais e áreas florestais vizinhas, além de sobrecarregar redes de água tratada, esgoto, mobilidade e habitação.'
  },
  {
    id: 20,
    enunciado: '20. Sobre os aspectos humanos e econômicos do Amazonas, assinale a correta:',
    opcoes: [
      'A) Manaus concentra importante parcela da população e das atividades econômicas do Estado.',
      'B) A população amazonense está distribuída uniformemente.',
      'C) O transporte fluvial possui pouca importância.',
      'D) A Zona Franca não possui relevância econômica.'
    ],
    correta: 0,
    explicacao: 'Gabarito Oficial: A. A afirmação correta é que Manaus concentra a esmagadora maioria dos habitantes e do PIB do Estado do Amazonas, enquanto o interior possui densidade baixa e economia baseada em extrativismo, pesca e agropecuária local.'
  }
];

export const geografiaAmazonasTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: 'A população do Amazonas encontra-se fortemente concentrada na capital, Manaus, apresentando o interior do estado uma densidade demográfica rarefeita e dispersa.',
    correta: true,
    explicacao: 'CORRETO. Mais da metade da população amazonense reside em Manaus. O interior possui ocupação dispersa concentrada prioritariamente às margens dos rios.'
  },
  {
    id: 2,
    enunciado: 'A Zona Franca de Manaus foi instituída para desestimular o setor secundário no estado do Amazonas, priorizando apenas a agricultura de subsistência.',
    correta: false,
    explicacao: 'ERRADO. A ZFM foi criada precisamente para atrair indústrias e capital, estimulando o desenvolvimento socioeconômico da Amazônia Ocidental por meio de regime fiscal especial.'
  },
  {
    id: 3,
    enunciado: 'O Polo Industrial de Manaus (PIM) possui destaque nacional e internacional na fabricação de eletroeletrônicos e de motocicletas.',
    correta: true,
    explicacao: 'CORRETO. Os polos de eletroeletrônicos e o polo de duas rodas (motocicletas) são as maiores marcas registradas da produção fabril no PIM.'
  },
  {
    id: 4,
    enunciado: 'O transporte fluvial no Amazonas possui caráter secundário, uma vez que a quase totalidade das mercadorias e cidadãos circula por meio de linhas férreas de alta velocidade.',
    correta: false,
    explicacao: 'ERRADO. O transporte fluvial é primordial e indispensável no Amazonas. Não existem ferrovias de passageiros e a malha rodoviária é limitada e sazonal.'
  },
  {
    id: 5,
    enunciado: 'O crescimento urbano acelerado em Manaus gerou desafios socioambientais relevantes, como ocupação de margens de igarapés e carência de saneamento básico.',
    correta: true,
    explicacao: 'CORRETO. A rápida urbanização provocou a formação de ocupações informais em áreas impróprias (como margens de igarapés e encostas), gerando problemas de saneamento e poluição.'
  }
];

export const geografiaAmazonasDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Discorra sobre a importância socioeconômica da Zona Franca de Manaus (ZFM) e do Polo Industrial de Manaus (PIM) para o Estado do Amazonas e o Brasil.',
    respostaEsperada: 'Espelho de Correção:\nA Zona Franca de Manaus (ZFM) foi instituída pelo Decreto-Lei nº 288/1967 com o objetivo de promover o desenvolvimento econômico, fixar população e integrar a Amazônia Ocidental ao restante do território brasileiro através de incentivos fiscais federais e estaduais.\nO Polo Industrial de Manaus (PIM) é o coração econômico do modelo, gerando centenas de milhares de empregos diretos e indiretos e liderando a produção nacional em segmentos como bens de informática, eletroeletrônicos e motocicletas.\nAlém disso, atua como instrumento de conservação ambiental, pois ao concentrar a economia em Manaus com atividade industrial, reduz a pressão pelo desmatamento no interior do Estado.'
  },
  {
    id: 2,
    enunciado: 'Analise o padrão de distribuição espacial da população amazonense, explicando o contraste entre a capital (Manaus) e os municípios do interior.',
    respostaEsperada: 'Espelho de Correção:\nO padrão demográfico do Amazonas é marcado por intensa macrocefalia urbana e assimetria espacial.\nManaus concentra mais de 50% de toda a população estadual (mais de 2 milhões de habitantes), funcionando como polo atrativo de migração interna em razão de oportunidades de trabalho na indústria e comércio.\nEm contrapartida, os municípios do interior apresentam povoamento disperso, baixa densidade demográfica e núcleos urbanos pequenos articulados linearmente ao longo das calhas dos rios navegáveis.'
  },
  {
    id: 3,
    enunciado: 'Explique por que os rios desempenham o papel de "estradas que andam" no Estado do Amazonas e como influenciam a economia e o cotidiano das comunidades ribeirinhas.',
    respostaEsperada: 'Espelho de Correção:\nDevido à imensa extensão do território e à cobertura vegetal densa, a implantação e manutenção de rodovias terrestres é complexa, tornando a hidrovia a principal via de circulação.\nOs rios conectam as comunidades ribeirinhas aos centros urbanos, viabilizam o escoamento de produtos do extrativismo vegetal e pesca, viabilizam o abastecimento de combustíveis e alimentos, e constituem a base indispensável da subsistência e cultura alimentar local.'
  },
  {
    id: 4,
    enunciado: 'Aponte os principais impactos ambientais e urbanos derivados do rápido crescimento demográfico e industrial observado em Manaus nas últimas décadas.',
    respostaEsperada: 'Espelho de Correção:\n• Expansão urbana desordenada e invasão de áreas de preservação permanente (APPs);\n• Poluição e assoreamento dos igarapés urbanos (ex.: bacias do Educandos, São Raimundo e Tarumã) pelo lançamento de efluentes domésticos sem tratamento;\n• Déficit de saneamento básico e dificuldades na gestão integrada de resíduos sólidos urbanos;\n• Formação de moradias precárias em áreas de risco de inundação ou deslizamento.'
  }
];

export const geografiaAmazonasSummaryPoints: string[] = [
  'População do Amazonas: Forte concentração em Manaus (mais de 50% dos habitantes do estado).',
  'Povoamento do Interior: População dispersa, rarefeita e estruturada ao longo das calhas dos rios.',
  'Manaus: Capital, principal centro urbano, econômico, industrial e de serviços do estado.',
  'Zona Franca de Manaus (ZFM): Criada para estimular o desenvolvimento regional com incentivos fiscais.',
  'Polo Industrial de Manaus (PIM): Destaque absoluto para os polos de eletroeletrônicos e motocicletas (duas rodas).',
  'Extrativismo Vegetal: Madeira manejada, castanha-do-brasil, açaí, borracha e produtos da sociobiodiversidade.',
  'Extrativismo Mineral: Petróleo e gás natural (Urucu), cassiterita e potássio.',
  'Agropecuária & Pesca: Pesca de subsistência e comercial essencial para comunidades; agropecuária tem peso menor que a indústria.',
  'Transporte Fluvial: Principal modal de circulação de pessoas, abastecimento e integração das comunidades.',
  'Impactos Urbanos e Ambientais: Crescimento desordenado, déficit de saneamento, ocupação de igarapés e poluição.',
  '🎯 Mnemônico FGV TJAM: "Manaus concentra, ZFM desenvolve, PIM fabrica, Rios transportam, Interior dispersa".'
];
