// src/data/informaticaLessonData.ts
// Dados completos da 2ª Aula de Hoje — Informática: Segurança da Informação (CID, Senhas, MFA, Malware, Phishing, Firewall, Backup 3-2-1)

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

// 20 Questões de Múltipla Escolha Oficiais
export const informaticaMcQuestionsData: InformaticaQuestion[] = [
  {
    id: 1,
    enunciado: '1. O princípio da segurança da informação que garante que apenas pessoas autorizadas tenham acesso aos dados é:',
    alternativas: [
      'A) Integridade',
      'B) Disponibilidade',
      'C) Confidencialidade',
      'D) Autenticidade'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C (Confidencialidade). A confidencialidade garante que a informação seja acessada somente por pessoas ou sistemas devidamente autorizados. Exemplo: somente servidores autorizados podem acessar determinado processo sigiloso.'
  },
  {
    id: 2,
    enunciado: '2. A integridade tem como objetivo:',
    alternativas: [
      'A) Garantir que os dados estejam disponíveis.',
      'B) Impedir alterações indevidas nas informações.',
      'C) Permitir acesso irrestrito aos dados.',
      'D) Criar cópias de segurança.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Impedir alterações indevidas nas informações). A integridade assegura que a informação não seja modificada, corrompida ou destruída de forma não autorizada ou acidental.'
  },
  {
    id: 3,
    enunciado: '3. A disponibilidade significa que:',
    alternativas: [
      'A) Os dados só podem ser acessados pelo administrador.',
      'B) Os dados devem estar disponíveis quando necessários aos usuários autorizados.',
      'C) Os dados nunca podem ser alterados.',
      'D) As informações devem permanecer secretas.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A disponibilidade assegura que os sistemas e os dados estejam acessíveis e operacionais sempre que os usuários autorizados precisarem utilizá-los.'
  },
  {
    id: 4,
    enunciado: '4. O conjunto formado por Confidencialidade, Integridade e Disponibilidade é conhecido como:',
    alternativas: [
      'A) CIA/CID',
      'B) TCP',
      'C) DNS',
      'D) HTTP'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (CIA/CID). Trata-se da tríade básica da segurança da informação: em português CID (Confidencialidade, Integridade, Disponibilidade) e em inglês CIA (Confidentiality, Integrity, Availability).'
  },
  {
    id: 5,
    enunciado: '5. Um malware que pode se espalhar automaticamente por uma rede é:',
    alternativas: [
      'A) Trojan',
      'B) Worm',
      'C) Firewall',
      'D) Phishing'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Worm). O worm (verme) diferencia-se por propagar-se de forma autônoma e automática pelas redes, explorando vulnerabilidades sem necessitar da execução explícita por parte do usuário.'
  },
  {
    id: 6,
    enunciado: '6. O Cavalo de Troia (Trojan) caracteriza-se por:',
    alternativas: [
      'A) Ser necessariamente um hardware.',
      'B) Disfarçar-se como programa legítimo para enganar o usuário.',
      'C) Ser exclusivamente uma mensagem de e-mail.',
      'D) Ser um sistema de backup.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O Trojan apresenta-se como um utilitário, jogo ou aplicativo aparentemente útil e inofensivo, mas contém código malicioso oculto que executa ações danosas nos bastidores.'
  },
  {
    id: 7,
    enunciado: '7. O ransomware normalmente:',
    alternativas: [
      'A) Melhora o desempenho do computador.',
      'B) Criptografa ou bloqueia dados e exige pagamento/extorsão.',
      'C) Apenas exibe publicidade.',
      'D) Funciona como firewall.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. Ransomware é o malware de extorsão que bloqueia o acesso ao dispositivo ou criptografa os arquivos da vítima, exigindo resgate financeiro (geralmente em criptomoedas) para fornecer a chave de descriptografia.'
  },
  {
    id: 8,
    enunciado: '8. Phishing é uma técnica utilizada principalmente para:',
    alternativas: [
      'A) Aumentar a velocidade da internet.',
      'B) Enganar usuários para obter informações ou induzi-los a ações maliciosas.',
      'C) Fazer backup automático.',
      'D) Criptografar arquivos legitimamente.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. Phishing é uma técnica de pescaria fraudulenta por meios eletrônicos (e-mail, SMS, links falsos) que engana a vítima para que forneça dados confidenciais como senhas e dados bancários.'
  },
  {
    id: 9,
    enunciado: '9. Uma mensagem dizendo “Sua conta será bloqueada, clique imediatamente neste link e informe sua senha” pode ser um exemplo de:',
    alternativas: [
      'A) Backup',
      'B) Phishing',
      'C) Firewall',
      'D) Autenticação multifator'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Phishing). Mensagens com tom de urgência ou ameaça de bloqueio, solicitando cliques imediatos e digitação de senhas em formulários falsos, constituem o exemplo clássico de phishing.'
  },
  {
    id: 10,
    enunciado: '10. Engenharia social está relacionada:',
    alternativas: [
      'A) À manipulação de pessoas para obter informações ou provocar determinadas ações.',
      'B) À instalação física de computadores.',
      'C) À manutenção de cabos de rede.',
      'D) Exclusivamente à criptografia.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. A engenharia social baseia-se na exploração da confiança, curiosidade, medo ou ingenuidade humana por meio de manipulação psicológica para obter dados ou acessos indevidos.'
  },
  {
    id: 11,
    enunciado: '11. O firewall tem como uma de suas funções:',
    alternativas: [
      'A) Controlar o tráfego de rede de acordo com regras de segurança.',
      'B) Criar documentos de texto.',
      'C) Substituir obrigatoriamente o antivírus.',
      'D) Recuperar arquivos apagados.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. O firewall é uma barreira de proteção de rede que analisa, permite ou bloqueia pacotes de dados e portas de comunicação com base em um conjunto de regras de segurança predefinidas.'
  },
  {
    id: 12,
    enunciado: '12. Sobre firewall e antivírus, é correto afirmar:',
    alternativas: [
      'A) São exatamente a mesma ferramenta.',
      'B) Firewall controla tráfego de rede, enquanto antivírus atua na detecção/bloqueio de malware.',
      'C) Antivírus controla exclusivamente conexões de rede.',
      'D) Firewall é utilizado apenas para criar backups.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. São ferramentas complementares: o firewall atua filtrando conexões e tráfego de rede, enquanto o antivírus inspeciona arquivos, memória e processos em busca de malwares e vírus.'
  },
  {
    id: 13,
    enunciado: '13. Uma senha mais segura deve:',
    alternativas: [
      'A) Ser “123456”.',
      'B) Utilizar apenas o nome do usuário.',
      'C) Ser longa e difícil de adivinhar.',
      'D) Ser igual em todos os serviços.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Senhas seguras devem ser longas (preferencialmente com mais de 12 a 16 caracteres), combinando letras maiúsculas, minúsculas, números e caracteres especiais, evitando dados pessoais óbvios.'
  },
  {
    id: 14,
    enunciado: '14. Autenticação multifator (MFA) significa:',
    alternativas: [
      'A) Utilizar apenas uma senha.',
      'B) Utilizar dois ou mais fatores para verificar a identidade.',
      'C) Utilizar vários antivírus simultaneamente.',
      'D) Ter várias contas de usuário.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O MFA (Multi-Factor Authentication) requer a combinação de dois ou mais fatores independentes de categorias diferentes: algo que você sabe (senha), algo que você tem (token/celular) ou algo que você é (biometria).'
  },
  {
    id: 15,
    enunciado: '15. Qual alternativa apresenta um exemplo de autenticação multifator?',
    alternativas: [
      'A) Apenas senha.',
      'B) Apenas impressão digital.',
      'C) Senha + código de verificação no celular.',
      'D) Apenas nome de usuário.'
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A combinação de uma senha (fator de conhecimento) com um código gerado ou recebido no celular (fator de posse) configura a autenticação em dois fatores (2FA/MFA).'
  },
  {
    id: 16,
    enunciado: '16. Backup é:',
    alternativas: [
      'A) Uma cópia de segurança dos dados.',
      'B) Um tipo de vírus.',
      'C) Uma técnica de phishing.',
      'D) Um mecanismo de autenticação.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. Backup é o procedimento de cópia e salvaguarda de arquivos e sistemas para armazenamento secundário, permitindo sua recuperação em caso de perda, corrupção ou incidente.'
  },
  {
    id: 17,
    enunciado: '17. O backup é especialmente importante porque:',
    alternativas: [
      'A) Impede qualquer ataque cibernético.',
      'B) Permite recuperar dados após determinados incidentes, como falhas ou ataques.',
      'C) Substitui todas as medidas de segurança.',
      'D) Impede fisicamente a exclusão dos arquivos.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. O backup garante a resiliência e a continuidade do negócio, permitindo restaurar sistemas e arquivos íntegros após ataques de ransomware, desastres físicos, falhas mecânicas ou erros operacionais.'
  },
  {
    id: 18,
    enunciado: '18. Na conhecida regra 3-2-1 de backup, recomenda-se manter:',
    alternativas: [
      'A) 3 senhas, 2 usuários e 1 computador.',
      'B) 3 cópias, 2 tipos de mídia e 1 cópia fora do ambiente principal.',
      'C) 3 antivírus, 2 firewalls e 1 backup.',
      'D) 3 computadores, 2 redes e 1 senha.'
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. A regra 3-2-1 estabelece: 3 cópias dos dados (a original + 2 backups), em pelo menos 2 mídias de tecnologias distintas (ex: disco local e fita/servidor), com 1 cópia mantida em local externo ou em nuvem (off-site).'
  },
  {
    id: 19,
    enunciado: '19. Um funcionário recebe uma ligação de alguém que se passa pelo suporte de TI e pede sua senha. O caso representa principalmente:',
    alternativas: [
      'A) Engenharia social.',
      'B) Backup.',
      'C) Disponibilidade.',
      'D) Firewall.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (Engenharia social). Fingir ser do suporte técnico telefônico (conhecido como vishing ou personificação) para convencer o colaborador a entregar sua credencial é uma tática típica de engenharia social.'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa CORRETA:',
    alternativas: [
      'A) Confidencialidade protege contra acesso não autorizado; integridade protege contra alterações indevidas; disponibilidade garante acesso quando necessário.',
      'B) Integridade significa manter os dados sempre disponíveis.',
      'C) Disponibilidade significa impedir qualquer acesso aos dados.',
      'D) Confidencialidade significa permitir acesso irrestrito.'
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A. Esta assertiva sintetiza com perfeita exatidão as definições da tríade CID: Confidencialidade = sigilo contra acessos indevidos; Integridade = preservação e exatidão da informação; Disponibilidade = prontidão do acesso quando demandado.'
  }
];

// Flashcards Interativos de Informática — Segurança da Informação
export const informaticaFlashcardsData: InformaticaFlashcard[] = [
  {
    id: 1,
    q: 'O que representa a tríade CID na Segurança da Informação?',
    a: 'C = Confidencialidade (acesso apenas a autorizados)\nI = Integridade (informação não alterada indevidamente)\nD = Disponibilidade (sistema e dados acessíveis quando demandados).',
    tag: 'Tríade CID'
  },
  {
    id: 2,
    q: 'Qual a diferença entre Confidencialidade e Integridade?',
    a: 'Confidencialidade visa impedir o ACESSO de quem não tem autorização (sigilo). Integridade visa impedir a ALTERAÇÃO, exclusão ou adulteração da informação sem autorização.',
    tag: 'Conceitos Básicos'
  },
  {
    id: 3,
    q: 'Qual o princípio ferido quando um servidor do TJAM não consegue acessar o sistema processual porque os servidores caíram?',
    a: 'Princípio da DISPONIBILIDADE. O sistema ou dado não está ao alcance do usuário legítimo no momento em que ele necessita utilizá-lo.',
    tag: 'Disponibilidade'
  },
  {
    id: 4,
    q: 'O que caracteriza um WORM e como ele se difere de um vírus clássico?',
    a: 'O WORM se propaga AUTOMATICAMENTE pelas redes, sem necessitar da ação direta do usuário nem de se anexar a um arquivo hospedeiro, explorando falhas de segurança.',
    tag: 'Malware'
  },
  {
    id: 5,
    q: 'O que é um CAVALO DE TROIA (Trojan)?',
    a: 'É um programa que se apresenta como algo útil, legítimo ou divertido (ex: jogo, protetor de tela, utilitário), mas que oculta funcionalidades nocivas em segundo plano.',
    tag: 'Malware'
  },
  {
    id: 6,
    q: 'O que é RANSOMWARE e qual a sua pegadinha clássica em provas?',
    a: 'É um malware de extorsão que bloqueia ou CRIPTOGRAFA os dados da vítima e exige resgate financeiro. Pegadinha: não é "qualquer vírus", sua marca é a extorsão por criptografia.',
    tag: 'Ransomware'
  },
  {
    id: 7,
    q: 'O que é PHISHING?',
    a: 'Técnica de fraude eletrônica que usa mensagens e links enganosos (e-mail, SMS, WhatsApp) para levar a vítima a revelar dados confidenciais (senhas, cartões, tokens).',
    tag: 'Ameaças'
  },
  {
    id: 8,
    q: 'Qual a relação e distinção entre PHISHING e ENGENHARIA SOCIAL?',
    a: 'A Engenharia Social é o conceito AMPLO de manipulação psicológica de pessoas. O Phishing é uma das TÉCNICAS de engenharia social aplicadas em meios digitais.',
    tag: 'Engenharia Social'
  },
  {
    id: 9,
    q: 'Qual a função primordial de um FIREWALL?',
    a: 'Atuar como uma barreira de proteção que filtra e controla o tráfego de entrada e saída de uma rede de computadores, segundo políticas de segurança estabelecidas.',
    tag: 'Firewall'
  },
  {
    id: 10,
    q: 'O Firewall é capaz de substituir o Antivírus?',
    a: 'NÃO! O firewall controla o tráfego e portas de rede; o antivírus analisa o conteúdo dos arquivos, discos e memória à procura de código malicioso. São ferramentas complementares.',
    tag: 'Proteção'
  },
  {
    id: 11,
    q: 'O que é Autenticação Multifator (MFA)? Dê um exemplo prático.',
    a: 'Método de validação de identidade que exige dois ou mais fatores de categorias distintas. Exemplo: digitar a senha (conhecimento) + código enviado via SMS/App (posse).',
    tag: 'Autenticação'
  },
  {
    id: 12,
    q: 'Quais são as 3 categorias clássicas de fatores de autenticação?',
    a: '1. Algo que você SABE (senha, PIN, pergunta secreta);\n2. Algo que você TEM (token, celular, smartcard);\n3. Algo que você É (biometria, impressão digital, face).',
    tag: 'Autenticação'
  },
  {
    id: 13,
    q: 'Explique a famosa REGRA 3-2-1 de Backup.',
    a: '• 3 cópias no total (1 primária + 2 cópias de backup);\n• 2 mídias de armazenamento com tecnologias distintas;\n• 1 cópia armazenada fora do local (off-site ou nuvem).',
    tag: 'Backup'
  },
  {
    id: 14,
    q: 'Quais são as principais práticas recomendadas para uma SENHA SEGURA?',
    a: 'Longa (mínimo 12-16 caracteres), mesclando maiúsculas, minúsculas, números e símbolos, exclusiva para cada serviço e sem dados óbvios (nomes, datas).',
    tag: 'Senhas'
  },
  {
    id: 15,
    q: 'Como funcionam os mecanismos de detecção por Assinatura e por Comportamento em antivírus?',
    a: '• Assinatura: compara o código com uma base de vírus conhecidos;\n• Comportamental (heurística): monitora ações suspeitas que um programa tenta executar no sistema.',
    tag: 'Antivírus'
  }
];

// Questões no formato Certo / Errado (V/F)
export const informaticaTfQuestionsData: InformaticaTfQuestion[] = [
  {
    id: 1,
    enunciado: '1. A instalação de um firewall moderno e bem configurado na rede corporativa dispensa totalmente a utilização de software antivírus nas estações de trabalho dos servidores.',
    correta: false,
    explicacao: '✅ Gabarito: FALSO. O firewall e o antivírus operam em camadas distintas de proteção. O firewall controla o tráfego de rede e portas de conexão, enquanto o antivírus inspeciona arquivos, downloads e processos internos à procura de pragas virtuais.'
  },
  {
    id: 2,
    enunciado: '2. O ransomware caracteriza-se por restringir o acesso a arquivos do sistema mediante criptografia, cobrando da vítima uma contraprestação financeira (geralmente em criptomoedas) para restaurar o acesso aos dados.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. Essa é a definição conceitual exata do ransomware: sequestro digital de dados operado via cifra criptográfica robusta com finalidade de extorsão.'
  },
  {
    id: 3,
    enunciado: '3. A regra de backup 3-2-1 preconiza a manutenção de 3 cópias dos dados, gravadas em 2 tipos diferentes de mídia, com pelo menos 1 das cópias mantida em ambiente externo ou em nuvem.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. A consagrada regra 3-2-1 de segurança da informação estabelece 3 cópias, 2 mídias diferentes e 1 cópia offsite/nuvem para resguardar o sistema contra sinistros locais.'
  },
  {
    id: 4,
    enunciado: '4. Um ataque de phishing baseia-se necessariamente na invasão direta do sistema operacional através da exploração de falhas no código do kernel sem interação da vítima.',
    correta: false,
    explicacao: '✅ Gabarito: FALSO. O phishing é uma técnica de engenharia social cujo cerne é enganar o usuário humano por meio de comunicações fraudulentas (e-mails, mensagens, sites clonados), dependendo da ação ou erro da vítima.'
  },
  {
    id: 5,
    enunciado: '5. A autenticação multifator (MFA) aumenta significativamente a segurança dos sistemas judiciários porque requer que o invasor comprometa simultaneamente múltiplos fatores de identificação independentes.',
    correta: true,
    explicacao: '✅ Gabarito: VERDADEIRO. Mesmo que a senha alfanumérica seja vazada, o acesso indevido permanece bloqueado sem o segundo fator (token, chave física ou biometria).'
  }
];

// Questões Discursivas com Gabarito Padrão
export const informaticaDiscursiveQuestionsData: InformaticaDiscursiveQuestion[] = [
  {
    id: 1,
    titulo: 'Questão Discursiva 1 — A Tríade CID no Âmbito do Poder Judiciário',
    enunciado: 'A segurança da informação apoia-se em três pilares clássicos conhecidos pela sigla CID (Confidencialidade, Integridade e Disponibilidade). Explique detalhadamente cada um desses princípios, correlacionando-os com exemplos práticos aplicados à rotina de um Tribunal de Justiça (como o TJAM) e à tramitação do Processo Judicial Eletrônico (PJe).',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\n1. Confidencialidade: Garante que os dados sejam acessados unicamente por pessoas legalmente autorizadas. No TJAM, manifesta-se no sigilo obrigatório conferido a processos judiciais que correm em segredo de justiça (ex.: direito de família, infância e juventude), cujos autos só podem ser visualizados pelas partes, seus advogados constituídos e servidores com perfil de acesso adequado.\n\n2. Integridade: Assegura que a informação não seja adulterada, corrompida ou fraudada por agentes não autorizados ou por falhas de transmissão. No PJe, isso é garantido pelo uso de assinaturas digitais com certificado ICP-Brasil e funções de hash criptográfico, assegurando que o teor de sentenças e certidões emitidas permaneça inalterado.\n\n3. Disponibilidade: Garante que o sistema e seus acervos estejam operacionais e acessíveis aos magistrados, servidores, advogados e cidadãos sempre que demandados dentro dos prazos legais. Quedas prolongadas de servidores ou ataques de negação de serviço (DDoS) violam a disponibilidade e podem acarretar a prorrogação forçada de prazos processuais.',
    criterios: [
      'Definição precisa de Confidencialidade e correlação com segredo de justiça',
      'Definição de Integridade e citação da assinatura digital/hash no PJe',
      'Definição de Disponibilidade e impacto de indisponibilidade nos prazos processuais',
      'Coesão e clareza na linguagem técnica'
    ]
  },
  {
    id: 2,
    titulo: 'Questão Discursiva 2 — Vetores de Ataque Cibernético e Práticas Preventivas (Regra 3-2-1 e MFA)',
    enunciado: 'O avanço dos ataques cibernéticos a órgãos públicos envolve frequentemente o uso de Phishing, Engenharia Social e Ransomware. Descreva a mecânica de um ataque típico de Ransomware iniciado por Phishing e apresente duas contramedidas técnicas indispensáveis (abordando obrigatoriamente a Regra 3-2-1 de backup e a Autenticação Multifator) para mitigar o impacto desse incidente.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\n1. Mecânica do Ataque: O ataque normalmente se inicia com a disseminação de um e-mail de phishing simulando uma comunicação urgente de autoridade ou fornecedor. O servidor do órgão é induzido a clicar em link falso ou abrir anexo malicioso contendo um dropper/trojan. Uma vez executado na estação, o ransomware explora a rede corporativa, dissemina-se e inicia o processo de criptografia de arquivos essenciais e bancos de dados, deixando na tela um aviso de extorsão exigindo resgate.\n\n2. Contramedidas Técnicas Indispensáveis:\n   a) Regra 3-2-1 de Backup: Estratégia que preconiza a manutenção de pelo menos 3 cópias integrais dos dados (1 produção + 2 backups), em 2 tecnologias de mídia distintas, com 1 cópia mantida fora da rede corporativa ou em nuvem imutável (off-site/air-gapped). Isso neutraliza a chantagem do ransomware, pois permite a restauração completa dos dados sem necessidade de pagamento.\n   b) Autenticação Multifator (MFA): Impede que credenciais eventualmente capturadas por phishing ou vazamentos sejam usadas diretamente pelo invasor para transitar lateralmente ou obter privilégios administrativos no ambiente institucional, exigindo um segundo fator independente (token ou biometria).',
    criterios: [
      'Descrição da cadeia do ataque: Phishing inicial -> execução -> criptografia e extorsão',
      'Explicação estruturada da Regra 3-2-1 (3 cópias, 2 mídias, 1 externa/isolada)',
      'Explicação do papel da Autenticação Multifator (MFA) contra acesso indevido',
      'Conclusão sobre resiliência e neutralização de chantagem financeira'
    ]
  }
];

// Pontos de Resumo da Aula de Segurança da Informação
export const informaticaSummaryPoints: string[] = [
  'Tríade CID: Pilares fundamentais da segurança da informação — Confidencialidade (acesso restrito aos autorizados), Integridade (exatidão sem alteração indevida) e Disponibilidade (sistemas acessíveis quando necessários).',
  'Políticas de Senhas Fortes: Senhas com no mínimo 12 a 16 caracteres misturando maiúsculas, minúsculas, números e símbolos, jamais repetidas entre sistemas e sem dados pessoais óbvios.',
  'Autenticação Multifator (MFA): Camada de segurança obrigatória que combina dois ou mais fatores distintos: Algo que você sabe (senha), Algo que você tem (token/celular) e Algo que você é (biometria).',
  'Tipos de Malware: Vírus (precisa de hospedeiro e execução da vítima), Worm (autorreplicável que se propaga pela rede), Trojan (Cavalo de Troia disfarçado de arquivo legítimo), Ransomware (sequestra arquivos com criptografia exigindo resgate) e Spyware/Keylogger (espiona e grava digitação).',
  'Engenharia Social e Phishing: Técnicas de manipulação psicológica com mensagens, links e e-mails falsos para induzir servidores a entregar senhas ou abrir anexos maliciosos.',
  'Defesas Complementares: O Firewall controla o tráfego e portas de rede (filtro de perímetro); o Antivírus inspeciona arquivos e processos locais. Um não substitui o outro.',
  'Regra de Backup 3-2-1: 3 cópias dos dados importantes, gravadas em 2 mídias distintas, com 1 cópia isolada fora do local (off-site ou nuvem protegida).'
];
