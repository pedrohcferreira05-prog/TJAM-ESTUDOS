// src/data/informaticaLessonData.ts
// Dados completos da 4ª Aula de Hoje — 💻 Informática: Redes de Computadores e Internet | TJAM
// Foco TJAM: LAN × MAN × WAN → Internet → Navegador → URL → Servidor → Cliente → Wi-Fi → Roteador → IP (IPv4 × IPv6) → HTTP × HTTPS

export interface InformaticaQuestion {
  id: number;
  enunciado: string;
  alternativas: string[];
  correta: number; // 0=A, 1=B, 2=C, 3=D
  explicacao: string;
}

export interface InformaticaTfQuestion {
  id: number;
  enunciado: string;
  correta: boolean;
  explicacao: string;
}

export interface InformaticaDiscursiveQuestion {
  id: number;
  titulo: string;
  enunciado: string;
  respostaPadrao: string;
  criterios: string[];
}

export interface InformaticaFlashcard {
  id: number;
  q: string;
  a: string;
  tag: string;
}

// 20 Questões de Múltipla Escolha Oficiais — TJAM 2026
export const informaticaMcQuestionsData: InformaticaQuestion[] = [
  {
    id: 1,
    enunciado: '1. Uma rede que normalmente abrange uma pequena área, como uma residência, escritório ou laboratório, é chamada de:',
    alternativas: [
      'A) WAN',
      'B) MAN',
      'C) LAN',
      'D) Internet'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C (LAN). LAN (Local Area Network ou Rede Local) abrange áreas geograficamente limitadas, como residências, escritórios, varas judiciais, escolas ou laboratórios.'
  },
  {
    id: 2,
    enunciado: '2. A sigla WAN refere-se a:',
    alternativas: [
      'A) Rede de longa distância',
      'B) Rede local',
      'C) Rede metropolitana',
      'D) Rede sem fio pessoal'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (Rede de longa distância). WAN (Wide Area Network) cobre grandes extensões geográficas, interligando cidades, países ou continentes. A Internet é o principal exemplo.'
  },
  {
    id: 3,
    enunciado: '3. A Internet pode ser definida como:',
    alternativas: [
      'A) Uma única rede privada',
      'B) Uma rede mundial que interliga diversas redes',
      'C) Um programa de computador',
      'D) Um navegador'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Uma rede mundial que interliga diversas redes). A Internet é um conglomerado global descentralizado de redes interconectadas que utilizam a família de protocolos TCP/IP.'
  },
  {
    id: 4,
    enunciado: '4. Qual equipamento é responsável por encaminhar pacotes entre redes diferentes?',
    alternativas: [
      'A) Monitor',
      'B) Teclado',
      'C) Roteador',
      'D) Scanner'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C (Roteador). O roteador (router) opera na camada de rede (camada 3 do modelo OSI), roteando e encaminhando pacotes de dados entre redes distintas (ex.: da LAN para a WAN/Internet).'
  },
  {
    id: 5,
    enunciado: '5. Wi-Fi é uma tecnologia utilizada principalmente para:',
    alternativas: [
      'A) Impressão em papel',
      'B) Comunicação de rede sem fio',
      'C) Criação de documentos',
      'D) Armazenamento de arquivos'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Comunicação de rede sem fio). Wi-Fi é uma tecnologia de rede local sem fio (WLAN, padrão IEEE 802.11) para transmissão de dados por radiofrequência sem uso de cabos.'
  },
  {
    id: 6,
    enunciado: '6. O endereço IP é utilizado para:',
    alternativas: [
      'A) Identificar um dispositivo em uma rede',
      'B) Criar senhas',
      'C) Abrir documentos PDF',
      'D) Aumentar a velocidade do computador'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (Identificar um dispositivo em uma rede). O endereço IP (Internet Protocol) é o identificador numérico lógico e exclusivo de cada interface/dispositivo conectado a uma rede TCP/IP.'
  },
  {
    id: 7,
    enunciado: '7. Qual alternativa apresenta um exemplo de endereço IPv4?',
    alternativas: [
      'A) 192.168.1.10',
      'B) www.tjam.jus.br',
      'C) https://google.com',
      'D) usuario@email.com'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (192.168.1.10). O IPv4 é formado por 32 bits divididos em 4 octetos decimais separados por pontos (cada octeto varia de 0 a 255). As alternativas B e C são URLs/domínios e D é um e-mail.'
  },
  {
    id: 8,
    enunciado: '8. O IPv6 foi desenvolvido, entre outros motivos, para:',
    alternativas: [
      'A) Substituir os navegadores',
      'B) Ampliar a quantidade de endereços IP disponíveis',
      'C) Eliminar a Internet',
      'D) Substituir o Wi-Fi'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Ampliar a quantidade de endereços IP disponíveis). Com o esgotamento dos cerca de 4,3 bilhões de endereços IPv4 (32 bits), o IPv6 foi criado com 128 bits, fornecendo 3,4 × 10³⁸ endereços.'
  },
  {
    id: 9,
    enunciado: '9. O programa utilizado para acessar páginas da Internet é chamado de:',
    alternativas: [
      'A) Firewall',
      'B) Navegador',
      'C) Roteador',
      'D) Servidor'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Navegador). O navegador (browser) é o software cliente que interpreta documentos HTML/CSS/JS e exibe as páginas da Web (exemplos: Chrome, Edge, Firefox, Safari).'
  },
  {
    id: 10,
    enunciado: '10. Qual dos seguintes é um navegador?',
    alternativas: [
      'A) Google Chrome',
      'B) Windows',
      'C) Android',
      'D) Linux'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (Google Chrome). Google Chrome é um navegador Web (browser). Windows, Android e Linux são sistemas operacionais.'
  },
  {
    id: 11,
    enunciado: '11. URL é:',
    alternativas: [
      'A) Um tipo de vírus',
      'B) O endereço de um recurso na Internet',
      'C) Um equipamento de rede',
      'D) Uma memória do computador'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (O endereço de um recurso na Internet). URL (Uniform Resource Locator) é o localizador padronizado que indica onde um recurso (página, imagem, arquivo) está hospedado na Internet.'
  },
  {
    id: 12,
    enunciado: '12. Em uma comunicação cliente-servidor, o servidor:',
    alternativas: [
      'A) Fornece serviços ou recursos aos clientes',
      'B) Apenas recebe energia elétrica',
      'C) Funciona exclusivamente como teclado',
      'D) Não pode estar conectado à Internet'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (Fornece serviços ou recursos aos clientes). Na arquitetura cliente-servidor, o cliente faz requisições e o servidor processa e fornece as respostas, serviços ou dados requisitados.'
  },
  {
    id: 13,
    enunciado: '13. O protocolo HTTP está relacionado principalmente:',
    alternativas: [
      'A) À transferência de páginas e recursos da Web',
      'B) À edição de imagens',
      'C) À compactação de arquivos',
      'D) Ao funcionamento do teclado'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (À transferência de páginas e recursos da Web). HTTP (HyperText Transfer Protocol) é o protocolo padrão da camada de aplicação utilizado para transferir páginas e conteúdos na World Wide Web.'
  },
  {
    id: 14,
    enunciado: '14. HTTPS é preferível ao HTTP para operações que envolvem dados sensíveis porque:',
    alternativas: [
      'A) É sempre mais rápido',
      'B) Utiliza proteção criptográfica na comunicação',
      'C) Não precisa de Internet',
      'D) Elimina a necessidade de senha'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Utiliza proteção criptográfica na comunicação). O HTTPS (HTTP Secure) utiliza criptografia SSL/TLS, impedindo que dados sensíveis (senhas, dados bancários, processos) sejam interceptados por terceiros.'
  },
  {
    id: 15,
    enunciado: '15. Uma rede que normalmente cobre uma área metropolitana, como uma cidade, é denominada:',
    alternativas: [
      'A) LAN',
      'B) MAN',
      'C) WAN',
      'D) PAN'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (MAN). MAN (Metropolitan Area Network) é a rede de abrangência metropolitana, cobrindo bairros de uma cidade, cidades vizinhas ou campi universitários/judiciários municipais.'
  },
  {
    id: 16,
    enunciado: '16. Intranet é:',
    alternativas: [
      'A) Uma rede privada que utiliza tecnologias semelhantes às da Internet',
      'B) Uma rede exclusivamente mundial',
      'C) Um tipo de navegador',
      'D) Um antivírus'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (Uma rede privada que utiliza tecnologias semelhantes às da Internet). Intranet é uma rede interna corporativa restrita a funcionários/servidores de uma instituição (como o TJAM), que utiliza protocolos e tecnologias idênticas às da Internet.'
  },
  {
    id: 17,
    enunciado: '17. Ao acessar um site por meio de um navegador, o computador do usuário normalmente atua como:',
    alternativas: [
      'A) Cliente',
      'B) Servidor DNS obrigatório',
      'C) Roteador principal da Internet',
      'D) Firewall da rede mundial'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (Cliente). Ao abrir uma página no navegador, a máquina do usuário assume o papel de cliente (client), enviando requisições HTTP/HTTPS para o computador remoto (servidor/server).'
  },
  {
    id: 18,
    enunciado: '18. Qual situação representa uma conexão sem fio?',
    alternativas: [
      'A) Computador conectado ao roteador por cabo Ethernet',
      'B) Notebook conectado à rede por Wi-Fi',
      'C) Impressora desligada',
      'D) Computador sem placa de rede'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Notebook conectado à rede por Wi-Fi). A tecnologia Wi-Fi permite a transmissão de pacotes de dados por ondas de rádio (wireless), dispensando o uso de cabos físicos de rede.'
  },
  {
    id: 19,
    enunciado: '19. Qual alternativa apresenta corretamente a relação?',
    alternativas: [
      'A) LAN — rede local',
      'B) WAN — rede exclusivamente residencial',
      'C) MAN — rede mundial',
      'D) IP — navegador'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (LAN — rede local). LAN é Local Area Network (rede local). WAN é rede geograficamente ampla (longa distância), MAN é metropolitana e IP é endereço de protocolo de rede, não navegador.'
  },
  {
    id: 20,
    enunciado: '20. Um usuário acessa https://www.exemplo.com.br pelo Chrome. Nesse caso, respectivamente, HTTPS, Chrome e www.exemplo.com.br representam:',
    alternativas: [
      'A) Navegador, protocolo e IP',
      'B) Protocolo seguro, navegador e endereço/domínio',
      'C) Servidor, navegador e protocolo',
      'D) Firewall, servidor e endereço IP'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Protocolo seguro, navegador e endereço/domínio). HTTPS é o protocolo de transferência seguro (com SSL/TLS); Chrome é o navegador Web (software cliente); e www.exemplo.com.br é a URL/nome de domínio.'
  }
];

// Questões no formato Certo / Errado (V/F) — Foco Redes & Internet TJAM
export const informaticaTfQuestionsData: InformaticaTfQuestion[] = [
  {
    id: 1,
    enunciado: '1. Wi-Fi e Internet são conceitos sinônimos e equivalentes, de modo que possuir conexão Wi-Fi ativa no smartphone garante automaticamente acesso à rede mundial de computadores.',
    correta: false,
    explicacao: '✅ Gabarito: FALSO. Wi-Fi é apenas uma tecnologia de rede local sem fio (WLAN). Um dispositivo pode estar conectado perfeitamente ao roteador Wi-Fi local sem que haja acesso à Internet (ex.: cabo de link externo desconectado ou fatura sem pagamento).'
  },
  {
    id: 2,
    enunciado: '2. Em uma URL que inicia com "https://", a letra "S" indica que a comunicação entre o navegador cliente e o servidor web é protegida por criptografia (como SSL/TLS), conferindo maior segurança contra interceptação indevida de dados.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. HTTPS (HyperText Transfer Protocol Secure) utiliza cifra criptográfica para proteger a integridade e a confidencialidade dos dados trafegados entre cliente e servidor.'
  },
  {
    id: 3,
    enunciado: '3. A classificação das redes em LAN, MAN e WAN baseia-se fundamentalmente na sua abrangência geográfica, sendo a LAN restrita a um ambiente local e a WAN capaz de cobrir países e continentes inteiros.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. LAN (Local), MAN (Metropolitana) e WAN (Wide/Ampla) são categorizadas conforme a escala espacial e alcance territorial da infraestrutura.'
  },
  {
    id: 4,
    enunciado: '4. O endereço IPv4 é composto por 128 bits e utiliza representação hexadecimal com dois-pontos, enquanto o IPv6 utiliza 32 bits separados por quatro pontos decimais.',
    correta: false,
    explicacao: '✅ Gabarito: FALSO. A assertiva inverteu as características: o IPv4 possui 32 bits (4 octetos decimais, ex.: 192.168.1.1), enquanto o IPv6 possui 128 bits representados em grupos hexadecimais separados por dois-pontos (ex.: 2001:0db8:85a3::8a2e:0370:7334).'
  },
  {
    id: 5,
    enunciado: '5. O roteador é um equipamento de conectividade cuja atribuição essencial consiste em interligar redes distintas e selecionar o melhor caminho para o tráfego dos pacotes de dados.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. O roteador encaminha pacotes entre redes diferentes (como da LAN residencial ou da comarca do TJAM para a Internet) analisando o endereço IP de destino.'
  }
];

// Questões Discursivas com Gabarito Padrão
export const informaticaDiscursiveQuestionsData: InformaticaDiscursiveQuestion[] = [
  {
    id: 1,
    titulo: 'Questão Discursiva 1 — Arquitetura de Redes: LAN, MAN e WAN no Tribunal de Justiça do Amazonas',
    enunciado: 'Diferencie tecnicamente as redes do tipo LAN, MAN e WAN quanto à sua abrangência geográfica, infraestrutura e finalidade. Em seguida, exemplifique como essas três tipologias de redes se interligam na estrutura funcional de um tribunal como o TJAM para permitir que servidores na comarca da capital e do interior acessem os sistemas judiciais eletrônicos.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\n1. Diferenciação Conceitual:\n   • LAN (Local Area Network): Rede local restrita a uma área geográfica limitada (uma sala, fórum, andar ou prédio do TJAM). Opera com altas taxas de transmissão e infraestrutura própria (cabos Ethernet e pontos Wi-Fi).\n   • MAN (Metropolitan Area Network): Rede metropolitana que conecta múltiplos prédios, polos ou fóruns distribuídos dentro de uma mesma cidade ou região metropolitana (ex.: Manaus), frequentemente interligada por anéis ópticos metropolitanos.\n   • WAN (Wide Area Network): Rede de longa distância que ultrapassa limites municipais, estaduais e nacionais. A própria Internet é a principal WAN global.\n\n2. Aplicação Prática no TJAM:\n   No TJAM, cada fórum (seja em Manaus ou em comarcas do interior como Parintins ou Tefé) opera internamente em sua LAN. Os prédios da capital interligam-se via MAN metropolitana e todos conectam-se através de links de longa distância (WAN/Internet e links dedicados por satélite/fibra) aos data centers centrais, permitindo o tráfego unificado de processos judiciais pelo PJe e Projudi de qualquer comarca.',
    criterios: [
      'Definição precisa e distinção entre LAN, MAN e WAN com base na escala geográfica',
      'Exemplificação correta de LAN (fórum local), MAN (interligação municipal) e WAN (interior e Internet)',
      'Menção aos sistemas judiciais e tráfego de dados na rotina forense',
      'Clareza expositiva e vocabulário técnico apropriado'
    ]
  },
  {
    id: 2,
    titulo: 'Questão Discursiva 2 — Segurança na Web: O Papel do Protocolo HTTPS e do Modelo Cliente-Servidor',
    enunciado: 'Ao consultar um processo judicial ou emitir uma certidão no portal do TJAM, o cidadão utiliza um navegador web que estabelece uma conexão via protocolo HTTPS. Explique o funcionamento do modelo Cliente-Servidor nessa transação e justifique por que o uso do protocolo HTTPS (com criptografia SSL/TLS) é indispensável para proteger dados no âmbito do Poder Judiciário.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\n1. Modelo Cliente-Servidor:\n   O computador ou smartphone do cidadão atua como "Cliente", executando um software navegador (Chrome, Firefox, etc.) que envia uma requisição formal para um recurso específico (URL). O servidor do TJAM (computador de alta capacidade nos data centers) atua como "Servidor", recebendo a requisição, consultando as bases de dados e retornando a resposta (código HTML, certidão PDF ou tela de consulta processual).\n\n2. Importância do Protocolo HTTPS no Judiciário:\n   Diferente do HTTP convencional, que trafega dados em texto plano vulnerável a ataques de interceptação (sniffing e man-in-the-middle), o HTTPS incorpora uma camada de criptografia mediante certificados digitais (SSL/TLS). No Poder Judiciário, isso assegura:\n   a) Confidencialidade: impede que terceiros na rede leiam senhas, dados de partes processuais ou documentos sigilosos;\n   b) Integridade: garante que a certidão ou certidão de intimação não foi adulterada durante a transmissão;\n   c) Autenticidade: confirma para o usuário que ele está conectado ao portal legítimo do TJAM, e não a uma página clonada para golpes.',
    criterios: [
      'Explicação dos papéis de Cliente (navegador que requisita) e Servidor (hospeda e responde)',
      'Diferença fundamental entre HTTP (texto plano) e HTTPS (cifrado por SSL/TLS)',
      'Impacto nos princípios de confidencialidade, integridade e autenticidade de dados judiciais',
      'Linguagem formal e estrutura dissertativa coerente'
    ]
  }
];

// 10 Flashcards Didáticos — Foco Redes de Computadores e Internet | TJAM
export const informaticaFlashcardsData: InformaticaFlashcard[] = [
  {
    id: 1,
    q: 'O que é uma REDE DE COMPUTADORES?',
    a: 'É um conjunto de dispositivos interconectados (computadores, celulares, impressoras, servidores, roteadores) para compartilhar dados, recursos e serviços.',
    tag: 'Conceito Básico'
  },
  {
    id: 2,
    q: 'Qual a diferença entre LAN, MAN e WAN?',
    a: '• LAN (Local): pequena área (casa, escritório, fórum).\n• MAN (Metropolitana): abrange uma cidade ou região.\n• WAN (Wide/Longa distância): países e continentes. Exemplo máximo: a Internet.',
    tag: 'Tipos de Rede'
  },
  {
    id: 3,
    q: 'Wi-Fi é sinônimo de Internet?',
    a: 'NÃO! Wi-Fi é apenas uma tecnologia de conexão sem fio (wireless) a uma rede local. Ter sinal de Wi-Fi não garante que haja link ativo de Internet.',
    tag: 'Wi-Fi'
  },
  {
    id: 4,
    q: 'Qual a função primordial do ROTEADOR?',
    a: 'Equipamento responsável por encaminhar e direcionar pacotes de dados entre redes distintas (ex.: conecta a rede local LAN à Internet WAN).',
    tag: 'Equipamentos'
  },
  {
    id: 5,
    q: 'O que é um Endereço IP e quais seus dois tipos principais?',
    a: 'Identificador lógico único de cada dispositivo na rede.\n• IPv4: 32 bits (4 octetos decimais, ex: 192.168.1.10).\n• IPv6: 128 bits (grupos hexadecimais, criado pelo esgotamento do IPv4).',
    tag: 'Endereçamento IP'
  },
  {
    id: 6,
    q: 'Qual a diferença entre HTTP e HTTPS?',
    a: '• HTTP: protocolo para envio de páginas web em texto simples.\n• HTTPS: versão segura protegida por CRIPTOGRAFIA (SSL/TLS). Macete: "S" de Seguro.',
    tag: 'Protocolos Web'
  },
  {
    id: 7,
    q: 'O que é URL e quais suas partes fundamentais?',
    a: 'URL (Uniform Resource Locator) é o endereço de um recurso na Web. Ex.: https://www.tjam.jus.br/processos\n(Protocolo + Domínio/Servidor + Caminho).',
    tag: 'Web & Navegação'
  },
  {
    id: 8,
    q: 'Como funciona a relação CLIENTE × SERVIDOR?',
    a: '• Cliente: programa/dispositivo que solicita o serviço (ex: navegador Chrome);\n• Servidor: máquina que armazena dados e responde com o serviço solicitado.',
    tag: 'Arquitetura'
  },
  {
    id: 9,
    q: 'O que é uma INTRANET?',
    a: 'Rede corporativa privada que usa as mesmas tecnologias da Internet (TCP/IP, navegadores, páginas web), de acesso restrito aos colaboradores de uma organização.',
    tag: 'Intranet'
  },
  {
    id: 10,
    q: 'Qual o papel do servidor DNS na navegação na Internet?',
    a: 'O DNS (Domain Name System) atua como a "lista telefônica" da Internet: traduz nomes amigáveis de sites (ex: tjam.jus.br) nos endereços IP numéricos dos servidores.',
    tag: 'DNS & Internet'
  }
];

// Pontos de Resumo da Aula de Redes de Computadores e Internet | TJAM
export const informaticaSummaryPoints: string[] = [
  'Rede de Computadores: Conjunto de nós e dispositivos (PCs, servidores, impressoras, roteadores) interconectados para trocar informações e compartilhar periféricos.',
  'Classificação Territorial: LAN (local: prédio, vara judicial, residência) × MAN (metropolitana: cidade inteira) × WAN (ampla escala geográfica, como a Internet mundial).',
  'Internet & Navegação: Rede global descentralizada. O Navegador (Chrome, Firefox, Edge) é o cliente que requisita e renderiza páginas acessadas por sua URL.',
  'Arquitetura Cliente-Servidor: O cliente envia a requisição (request) e o servidor hospeda os dados e devolve a resposta (response).',
  'Wi-Fi vs. Internet: Wi-Fi é o meio de transmissão sem fio local (ondas de rádio IEEE 802.11). Não é sinônimo de Internet e pode funcionar isolado da grande rede.',
  'Endereçamento IP: IPv4 (32 bits, 4 octetos decimais como 192.168.1.10) e IPv6 (128 bits, criado para suprir o esgotamento mundial de endereços IPv4).',
  'Segurança Web: HTTP trafega dados sem proteção; HTTPS aplica criptografia SSL/TLS para garantir sigilo e autenticidade ("S" de Seguro).'
];
