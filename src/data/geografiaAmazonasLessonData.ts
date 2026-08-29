// Data for Geografia do Amazonas — Aula 2: Aspectos Físicos do Estado do Amazonas

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

export const geografiaAmazonasFlashcardsData: FlashcardItem[] = [
  {
    q: 'Qual é a posição territorial do Amazonas no Brasil e com quais estados brasileiros ele faz divisa?',
    a: 'É o maior estado brasileiro em extensão territorial (Região Norte). Faz fronteira com 5 estados:\n• Roraima (Norte)\n• Pará (Leste)\n• Mato Grosso (Sudeste)\n• Rondônia (Sul)\n• Acre (Sudoeste).'
  },
  {
    q: 'Com quais países da América do Sul o Estado do Amazonas faz fronteira internacional?',
    a: 'Faz fronteira com 3 países:\n1) Venezuela (ao Norte)\n2) Colômbia (ao Noroeste)\n3) Peru (a Oeste/Sudoeste).'
  },
  {
    q: 'Quais são as principais formas de relevo predominantes no Estado do Amazonas?',
    a: 'Predomínio de formas de baixa altitude:\n• Planícies (ao longo dos vales fluviais)\n• Depressões (Depressão Marginal Amazônica)\n• Baixos planaltos (Planaltos residuais).'
  },
  {
    q: 'Qual é o tipo climático predominante no Amazonas e suas principais características?',
    a: 'Clima Equatorial Úmido:\n• Altas temperaturas médias ao longo do ano\n• Elevada umidade relativa do ar\n• Grande volume de precipitação pluviométrica\n• Baixa amplitude térmica anual (pouca variação de temperatura).'
  },
  {
    q: 'Como se dá a formação do Rio Amazonas no território amazonense?',
    a: 'No "Encontro das Águas" próximo a Manaus, ocorre a confluência do Rio Negro (águas escuras) com o Rio Solimões (águas barrentas), que passam a ser denominados oficialmente como Rio Amazonas.'
  },
  {
    q: 'Quais são os principais afluentes do Rio Amazonas/Solimões no território estadual?',
    a: 'Rios: Negro, Solimões, Madeira, Purus, Juruá, Japurá e Içá.'
  },
  {
    q: 'O que caracteriza a "Mata de Terra Firme" na Floresta Amazônica?',
    a: 'Formação vegetal situada nas cotas altimétricas mais elevadas que NÃO sofre inundações fluviais regulares, possuindo árvores de grande porte e dossel fechado.'
  },
  {
    q: 'O que caracteriza a "Mata de Várzea" no Amazonas?',
    a: 'Formação vegetal localizada em terrenos baixos que sofre inundações periódicas (sazonais) durante as cheias dos rios, com solos enriquecidos por sedimentos fluviais.'
  },
  {
    q: 'O que caracteriza a "Mata de Igapó" no Amazonas?',
    a: 'Formação vegetal de áreas permanentemente ou prolongadamente alagadas ao longo de rios de águas pretas ou claras (ex.: Rio Negro), com vegetação adaptada como a vitória-régia.'
  },
  {
    q: 'Qual é o mnemônico de memorização das 3 formações florestais e a relação com as cheias?',
    a: '• Terra Firme → NUNCA alaga normalmente\n• Várzea → Alaga PERIODICAMENTE (cheias)\n• Igapó → Alagada PERMANENTEMENTE / por longos períodos.'
  }
];

export const geografiaAmazonasMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: 'O Estado do Amazonas está localizado na:',
    opcoes: [
      'A) Região Centro-Oeste',
      'B) Região Norte',
      'C) Região Nordeste',
      'D) Região Sudeste'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. O Estado do Amazonas está localizado na Região Norte do Brasil, sendo a maior unidade federativa do país em extensão territorial.'
  },
  {
    id: 2,
    enunciado: 'O Amazonas faz fronteira internacional com:',
    opcoes: [
      'A) Peru, Colômbia e Venezuela',
      'B) Bolívia, Peru e Chile',
      'C) Colômbia, Equador e Guiana',
      'D) Venezuela, Suriname e Bolívia'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. O Estado do Amazonas faz fronteira internacional com exatamente três países da América do Sul: Peru (a oeste/sudoeste), Colômbia (a noroeste) e Venezuela (ao norte).'
  },
  {
    id: 3,
    enunciado: 'O clima predominante no Amazonas é:',
    opcoes: [
      'A) Semiárido',
      'B) Tropical de altitude',
      'C) Equatorial',
      'D) Subtropical'
    ],
    correta: 2,
    explicacao: 'Gabarito: C. O clima predominante em todo o Estado do Amazonas é o clima Equatorial (quente e úmido), influenciado pela proximidade com a Linha do Equador e pela intensa evapotranspiração da floresta.'
  },
  {
    id: 4,
    enunciado: 'Entre as características do clima equatorial predominante no Amazonas estão:',
    opcoes: [
      'A) Baixas temperaturas e pouca chuva',
      'B) Altas temperaturas, elevada umidade e chuvas abundantes',
      'C) Grandes períodos de seca e baixa umidade',
      'D) Invernos rigorosos e verões secos'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. O clima equatorial caracteriza-se por médias térmicas elevadas ao longo de todo o ano, alta taxa de umidade relativa do ar, chuvas abundantes (pluviosidade elevada) e baixa amplitude térmica anual.'
  },
  {
    id: 5,
    enunciado: 'A vegetação predominante no Amazonas é:',
    opcoes: [
      'A) Caatinga',
      'B) Cerrado',
      'C) Mata Atlântica',
      'D) Floresta Amazônica'
    ],
    correta: 3,
    explicacao: 'Gabarito: D. A vegetação dominante que cobre a quase totalidade do território estadual é o bioma Floresta Amazônica (Floresta Ombrófila Densa/Aberta).'
  },
  {
    id: 6,
    enunciado: 'A hidrografia do Amazonas é caracterizada:',
    opcoes: [
      'A) Por uma rede extensa de rios e afluentes',
      'B) Pela ausência de grandes rios',
      'C) Pelo predomínio de rios temporários',
      'D) Pela inexistência de navegação fluvial'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. A hidrografia do estado possui a mais densa e extensa rede de rios perenes e volumosos do planeta, com rios navegáveis de grande importância econômica, social e de transporte.'
  },
  {
    id: 7,
    enunciado: 'O encontro das águas em Manaus ocorre entre os rios:',
    opcoes: [
      'A) Amazonas e Madeira',
      'B) Negro e Solimões',
      'C) Purus e Juruá',
      'D) Japurá e Içá'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. O célebre Encontro das Águas em frente a Manaus ocorre na confluência do Rio Negro (águas escuras) com o Rio Solimões (águas barrentas), que correm lado a lado sem se misturar de imediato.'
  },
  {
    id: 8,
    enunciado: 'Após o encontro dos rios Negro e Solimões, o curso de água passa a ser denominado:',
    opcoes: [
      'A) Rio Madeira',
      'B) Rio Amazonas',
      'C) Rio Purus',
      'D) Rio Juruá'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. A partir da confluência dos rios Negro e Solimões, o curso d\'água recebe no Brasil a denominação oficial de Rio Amazonas, seguindo até o Oceano Atlântico.'
  },
  {
    id: 9,
    enunciado: 'Qual dos seguintes rios é um importante afluente da bacia amazônica no território do Amazonas?',
    opcoes: [
      'A) Madeira',
      'B) Paraná',
      'C) Tietê',
      'D) São Francisco'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. O Rio Madeira é um dos principais afluentes da margem direita do Rio Amazonas, fundamental para a logística de transporte e escoamento. Já os rios Paraná, Tietê e São Francisco pertencem a outras bacias hidrográficas brasileiras.'
  },
  {
    id: 10,
    enunciado: 'A mata de terra firme caracteriza-se por:',
    opcoes: [
      'A) Permanecer constantemente inundada',
      'B) Localizar-se em áreas que normalmente não sofrem inundação pelos rios',
      'C) Ser exclusiva das regiões desérticas',
      'D) Apresentar vegetação típica da caatinga'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. A Mata de Terra Firme ocupa as partes mais elevadas do relevo (platôs) e NÃO sofre inundações fluviais ordinárias, constituindo a maior parte da Floresta Amazônica com árvores de grande porte.'
  },
  {
    id: 11,
    enunciado: 'A mata de várzea está associada:',
    opcoes: [
      'A) A áreas periodicamente inundadas',
      'B) A regiões permanentemente secas',
      'C) A áreas de clima semiárido',
      'D) Exclusivamente a áreas montanhosas'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. A Mata de Várzea localiza-se em áreas de menor altitude, marginais aos rios de águas brancas/barrentas (como o Solimões), ficando periodicamente (sazonalmente) inundada durante o período de cheia anual.'
  },
  {
    id: 12,
    enunciado: 'A mata de igapó caracteriza-se por:',
    opcoes: [
      'A) Vegetação de áreas que permanecem alagadas por períodos prolongados',
      'B) Vegetação exclusivamente de terra firme',
      'C) Vegetação típica do cerrado',
      'D) Ausência de influência dos rios'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. A Mata de Igapó ocupa terrenos baixos e planos ao longo de rios de águas escuras (como o Rio Negro), permanecendo permanentemente ou por períodos muito prolongados sob inundação.'
  },
  {
    id: 13,
    enunciado: 'Assinale a sequência correta:',
    opcoes: [
      'A) Terra firme → áreas normalmente não inundadas; várzea → inundação periódica; igapó → áreas alagadas por períodos prolongados.',
      'B) Terra firme → permanentemente inundada; várzea → seca; igapó → desértica.',
      'C) Terra firme → semiárida; várzea → montanhosa; igapó → subtropical.',
      'D) Terra firme → cerrado; várzea → caatinga; igapó → pantanal.'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. A distinção clássica das 3 matas amazônicas é:\n• Terra Firme: áreas que normalmente NÃO são inundadas;\n• Várzea: áreas com inundação PERIÓDICA/sazonal;\n• Igapó: áreas ALAGADAS por períodos prolongados/permanentemente.'
  },
  {
    id: 14,
    enunciado: 'O relevo do Amazonas apresenta, predominantemente:',
    opcoes: [
      'A) Elevadas cadeias montanhosas em todo o território',
      'B) Planícies, depressões e baixos planaltos',
      'C) Apenas planaltos elevados',
      'D) Apenas áreas desérticas'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. O relevo do Amazonas caracteriza-se pelo predomínio de formas de baixa e média altitude, destacando-se as planícies fluviais, as depressões (como a Depressão Marginal Amazônica) e os baixos planaltos residuais.'
  },
  {
    id: 15,
    enunciado: 'A dinâmica dos rios possui grande importância para:',
    opcoes: [
      'A) A paisagem e a organização do espaço amazônico',
      'B) Apenas as áreas urbanas',
      'C) Somente o clima do Sul do Brasil',
      'D) Exclusivamente as atividades industriais'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. Os rios amazônicos são os principais estruturadores da paisagem natural, dos ciclos de cheia e vazante, do transporte das populações ribeirinhas e da organização socioeconômica e espacial da região.'
  },
  {
    id: 16,
    enunciado: 'A grande quantidade de rios no Amazonas contribui para:',
    opcoes: [
      'A) Transporte, abastecimento e atividades econômicas e sociais',
      'B) Isolamento absoluto de todas as comunidades',
      'C) Ausência de atividades econômicas',
      'D) Redução da biodiversidade'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. A malha fluvial atua como as "estradas líquidas" do Amazonas, garantindo a navegação, abastecimento de água e alimentos (pesca), turismo e a integração das comunidades do interior.'
  },
  {
    id: 17,
    enunciado: 'Sobre a Floresta Amazônica, é correto afirmar:',
    opcoes: [
      'A) Possui baixa biodiversidade.',
      'B) É adaptada às condições de elevada umidade e apresenta grande biodiversidade.',
      'C) É composta principalmente por vegetação rasteira.',
      'D) É uma formação típica de clima semiárido.'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. A Floresta Amazônica é a maior floresta tropical úmida do mundo, perfeitamente adaptada às altas temperaturas e grande umidade, abrigando a maior biodiversidade de fauna e flora do planeta.'
  },
  {
    id: 18,
    enunciado: 'Assinale a alternativa INCORRETA:',
    opcoes: [
      'A) O Amazonas pertence à Região Norte.',
      'B) O clima equatorial é predominante no estado.',
      'C) O Amazonas possui extensa rede hidrográfica.',
      'D) O estado não possui fronteiras com outros países.'
    ],
    correta: 3,
    explicacao: 'Gabarito: D. A alternativa D é INCORRETA (portanto a resposta procurada), pois o Amazonas POSSUI sim fronteiras internacionais extensas com 3 países: Venezuela, Colômbia e Peru.'
  },
  {
    id: 19,
    enunciado: 'Uma questão afirma que determinada área da floresta amazônica sofre inundação apenas em determinados períodos do ano, de acordo com a dinâmica dos rios. Essa descrição corresponde à:',
    opcoes: [
      'A) Mata de terra firme',
      'B) Mata de várzea',
      'C) Mata de igapó',
      'D) Caatinga'
    ],
    correta: 1,
    explicacao: 'Gabarito: B. A inundação sazonal/periódica restrita aos períodos de cheia dos rios é a característica definidora da Mata de Várzea.'
  },
  {
    id: 20,
    enunciado: 'Para uma questão de concurso sobre os aspectos físicos do Amazonas, o conjunto mais adequado para estudo é:',
    opcoes: [
      'A) Localização, fronteiras, relevo, clima, hidrografia e vegetação.',
      'B) Apenas população e economia.',
      'C) Apenas história política.',
      'D) Somente municípios e eleições.'
    ],
    correta: 0,
    explicacao: 'Gabarito: A. Os aspectos físicos da geografia estadual contemplam a localização e limites territoriais (fronteiras), o relevo, o clima equatorial, a densa hidrografia e as formações de vegetação (matas de terra firme, várzea e igapó).'
  }
];

export const geografiaAmazonasTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: 'O Estado do Amazonas faz fronteira internacional com três países sul-americanos: Venezuela, Colômbia e Peru.',
    correta: true,
    explicacao: 'CORRETO. A fronteira internacional do Amazonas limita-se exatamente com a Venezuela ao norte, Colômbia a noroeste e Peru a oeste/sudoeste.'
  },
  {
    id: 2,
    enunciado: 'A Mata de Várzea é a formação florestal amazônica que nunca sofre inundações, pois se localiza nos pontos mais altos do relevo.',
    correta: false,
    explicacao: 'ERRADO. A formação que NÃO se inunda é a Mata de Terra Firme. A Mata de Várzea é periodicamente inundada pelas cheias sazonais dos rios.'
  },
  {
    id: 3,
    enunciado: 'O Encontro das Águas resulta da confluência dos rios Negro e Solimões, cujas águas não se misturam imediatamente devido a diferenças de temperatura, densidade, velocidade de escoamento e acidez.',
    correta: true,
    explicacao: 'CORRETO. As diferenças físico-químicas (temperatura, acidez/pH, velocidade e carga sedimentar) impedem a mistura imediata das águas dos rios Negro e Solimões.'
  },
  {
    id: 4,
    enunciado: 'O clima predominante no Amazonas é o semiárido, caracterizado por secas prolongadas de até 8 meses por ano e baixa umidade relativa.',
    correta: false,
    explicacao: 'ERRADO. O clima predominante é o Equatorial Úmido, com chuvas abundantes o ano todo, temperaturas elevadas e altíssima umidade.'
  },
  {
    id: 5,
    enunciado: 'Na Floresta Amazônica, a Mata de Igapó permanece alagada por longos períodos ou permanentemente, situando-se nas margens de rios de águas escuras ou claras.',
    correta: true,
    explicacao: 'CORRETO. O igapó é a vegetação permanentemente ou quase permanentemente inundada, adaptada ao contato constante com a água.'
  }
];

export const geografiaAmazonasDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Explique a diferença estrutural entre as três formações vegetais da Floresta Amazônica associadas à dinâmica dos rios: Mata de Terra Firme, Mata de Várzea e Mata de Igapó.',
    respostaEsperada: 'Espelho de Correção:\n1) Mata de Terra Firme: Localizada em terrenos mais elevados, não é inundada pelas cheias ordinárias dos rios. Apresenta árvores de grande porte, dossel contínuo e maior biomassa.\n2) Mata de Várzea: Situada em terrenos baixos adjacentes a rios de águas barrentas (ricas em nutrientes), sujeita a inundações periódicas/sazonais.\n3) Mata de Igapó: Localizada em terrenos permanentemente ou semipermanentemente alagados, com águas escuras ou límpidas, abrigando vegetação hidrófila adaptada à imersão.'
  },
  {
    id: 2,
    enunciado: 'Descreva a posição geográfica do Estado do Amazonas no contexto sul-americano e brasileiro, citando os estados e países limítrofes.',
    respostaEsperada: 'Espelho de Correção:\nO Amazonas situa-se na Região Norte do Brasil e é a maior unidade federativa do país em área territorial.\n• Limites estaduais (5): Roraima (N), Pará (L), Mato Grosso (SE), Rondônia (S) e Acre (SO).\n• Limites internacionais (3): Venezuela (N), Colômbia (NO) e Peru (O/SO).'
  },
  {
    id: 3,
    enunciado: 'Caracterize o tipo de relevo predominante no Estado do Amazonas e aponte como os rios influenciam a sua modelagem.',
    respostaEsperada: 'Espelho de Correção:\nPredominam formas de relevo de baixa altitude, divididas em planícies fluviais, depressões (como a Depressão Marginal Amazônica) e baixos planaltos residuais.\nA densa rede hidrográfica atua como o principal agente modelador da paisagem através de processos contínuos de erosão, transporte e sedimentação fluvial.'
  },
  {
    id: 4,
    enunciado: 'Discorra sobre o fenômeno do "Encontro das Águas" em Manaus, indicando os rios envolvidos e os fatores que retardam a mistura imediata de suas águas.',
    respostaEsperada: 'Espelho de Correção:\nOcorre na confluência do Rio Negro (águas escuras/ácidas) e do Rio Solimões (águas barrentas/sedimentares), dando origem à denominação oficial do Rio Amazonas.\nA ausência de mistura imediata decorre de diferenças de velocidade de fluxo (o Solimões é mais rápido), densidade, temperatura (o Rio Negro é mais quente) e nível de acidez/pH.'
  },
  {
    id: 5,
    enunciado: 'Quais são as características térmicas, pluviométricas e de umidade que definem o clima equatorial no Estado do Amazonas?',
    respostaEsperada: 'Espelho de Correção:\n• Altas temperaturas médias anuais (geralmente entre 25°C e 28°C);\n• Baixa amplitude térmica anual (pequena variação de temperatura entre os meses);\n• Elevados índices de umidade relativa do ar (geralmente superiores a 80%);\n• Alta pluviosidade com chuvas convectivas bem distribuídas ao longo do ano.'
  }
];

export const geografiaAmazonasSummaryPoints = [
  'Localização: Região Norte, maior estado do Brasil em extensão.',
  'Fronteiras Nacionais (5 Estados): Roraima, Pará, Mato Grosso, Rondônia e Acre.',
  'Fronteiras Internacionais (3 Países): Venezuela, Colômbia e Peru.',
  'Relevo: Predomínio de baixas altitudes (planícies fluviais, depressões e baixos planaltos).',
  'Ponto Culminante: Pico da Neblina (2.995m), em Santa Isabel do Rio Negro.',
  'Clima: Equatorial Úmido (quente, úmido, alta pluviosidade e baixa amplitude térmica).',
  'Hidrografia: Maior rede hidrográfica do mundo. Principal: Rio Amazonas / Solimões.',
  'Encontro das Águas: Confluência do Rio Negro (escuro) e Rio Solimões (barrento) em Manaus.',
  'Vegetação (3 Formações): Terra Firme (não alaga), Várzea (alaga periodicamente), Igapó (alaga permanentemente).'
];
