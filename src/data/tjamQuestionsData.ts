import { Question } from '../types';

export const ALL_TJAM_QUESTIONS: Question[] = [
  // --- LEGISLAÇÃO DO TJAM ---
  {
    id: 'q-tjam-1',
    disciplineId: 'legislacao-tjam',
    topicId: 'tjam-2',
    topicName: 'Competências do TJAM',
    statement: 'De acordo com a Constituição do Estado do Amazonas e o Regimento Interno do TJAM, compete ao Tribunal Pleno processar e julgar originariamente:',
    options: [
      { id: 'opt-a', text: 'A) Os mandados de segurança contra atos do Governador do Estado e do Presidente da ALEAM.' },
      { id: 'opt-b', text: 'B) Os recursos de apelação cível oriundos das Varas Cíveis de Manaus.' },
      { id: 'opt-c', text: 'C) Os habeas corpus exclusivamente interpostos por defensores públicos estaduais.' },
      { id: 'opt-d', text: 'D) As ações relativas à guarda e tutela de menores nas comarcas do interior.' },
      { id: 'opt-e', text: 'E) As execuções fiscais da dívida ativa estadual.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. O Tribunal Pleno possui competência originária para mandados de segurança contra atos do Governador do Estado, da Mesa da Assembleia Legislativa e do próprio Presidente do TJAM.',
    legalReference: 'Regimento Interno do TJAM, Art. 12, I.',
    difficulty: 'médio',
    year: 2024,
    institution: 'FGV / TJAM'
  },
  {
    id: 'q-tjam-2',
    disciplineId: 'legislacao-tjam',
    topicId: 'tjam-1',
    topicName: 'Estrutura do Poder Judiciário do Amazonas',
    statement: 'A respeito da composição do Tribunal de Justiça do Estado do Amazonas, assinale a opção correta conforme a LCE nº 17/1997:',
    options: [
      { id: 'opt-a', text: 'A) É composto por 26 Desembargadores com sede na Capital e jurisdição em todo o Estado.' },
      { id: 'opt-b', text: 'B) É composto por 15 Desembargadores eleitos pelo voto direto da população.' },
      { id: 'opt-c', text: 'C) É composto por 30 Desembargadores indicados privativamente pelo Governador do Estado.' },
      { id: 'opt-d', text: 'D) Possui cúpula diretiva com mandato fixado em 4 anos, permitida reeleição sucessiva.' },
      { id: 'opt-e', text: 'E) Não possui Câmaras Cíveis Isoladas na sua estrutura organizacional.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. O TJAM é integrado por 26 Desembargadores (Art. 12 da LCE 17/97), exercendo jurisdição em todo o Estado do Amazonas.',
    legalReference: 'LCE nº 17/1997, Art. 12.',
    difficulty: 'fácil',
    year: 2024,
    institution: 'Cebraspe / TJAM'
  },

  // --- LÍNGUA PORTUGUESA ---
  {
    id: 'q-port-1',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-16',
    topicName: 'Crase',
    statement: 'Assinale a alternativa em que o uso do acento indicativo de crase é FACULTATIVO:',
    options: [
      { id: 'opt-a', text: 'A) Ele se dirigiu à sua residência no centro da cidade.' },
      { id: 'opt-b', text: 'B) Entregou os relatórios à professora de Direito.' },
      { id: 'opt-c', text: 'C) Os documentos foram encaminhados à direção do TJAM.' },
      { id: 'opt-d', text: 'D) Saímos à noite para estudar no polo da faculdade.' },
      { id: 'opt-e', text: 'E) Ele refere-se àquela sentença publicada ontem.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. Diante de pronome possessivo feminino no singular ("sua"), o uso da crase é facultativo (mnemônico "Até a sua Maria").',
    legalReference: 'Gramática da Língua Portuguesa - Regência e Crase.',
    difficulty: 'fácil',
    year: 2024,
    institution: 'FGV'
  },
  {
    id: 'q-port-2',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-12',
    topicName: 'Concordância verbal',
    statement: 'Assinale a opção que atende integralmente às normas da norma-padrão de concordância verbal:',
    options: [
      { id: 'opt-a', text: 'A) Haviam muitos processos pendentes de análise na secretaria do TJAM.' },
      { id: 'opt-b', text: 'B) Havia muitos processos pendentes de análise na secretaria do TJAM.' },
      { id: 'opt-c', text: 'C) Fazem dez anos que o servidor tomou posse na comarca do interior.' },
      { id: 'opt-d', text: 'D) Aluga-se salas comerciais no edifício do fórum.' },
      { id: 'opt-e', text: 'E) Existia muitos recursos pendentes no Tribunal Pleno.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Correta B. O verbo haver no sentido de existir é impessoal e fica no singular ("Havia muitos processos").',
    legalReference: 'Sintaxe de Concordância Verbal.',
    difficulty: 'médio',
    year: 2023,
    institution: 'FGV'
  },

  // --- DIREITO CONSTITUCIONAL ---
  {
    id: 'q-const-1',
    disciplineId: 'direito-constitucional',
    topicId: 'const-4',
    topicName: 'Direitos e Garantias Fundamentais',
    statement: 'Com relação aos direitos e garantias fundamentais previstos na CF/88, assinale a afirmativa correta:',
    options: [
      { id: 'opt-a', text: 'A) É livre a expressão da atividade intelectual, artística, científica e de comunicação, independentemente de censura ou licença.' },
      { id: 'opt-b', text: 'B) A criação de associações depende de prévia autorização estatal concedida por decreto administrativo.' },
      { id: 'opt-c', text: 'C) O mandado de segurança coletivo pode ser impetrado por qualquer cidadão em gozo de direitos políticos.' },
      { id: 'opt-d', text: 'D) A casa é asilo inviolável do indivíduo, podendo nela penetrar à noite sob determinação judicial sem qualquer exceção.' },
      { id: 'opt-e', text: 'E) O habeas data é cabível para obtenção de certidão em repartição pública de interesse de terceiros.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. Conforme o Art. 5º, IX da CF/88: "é livre a expressão da atividade intelectual, artística, científica e de comunicação, independentemente de censura ou licença".',
    legalReference: 'CF/88, Art. 5º, IX.',
    difficulty: 'fácil',
    year: 2024,
    institution: 'Cebraspe'
  },

  // --- DIREITO ADMINISTRATIVO ---
  {
    id: 'q-adm-1',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-8',
    topicName: 'Licitações',
    statement: 'Nos termos da Lei nº 14.133/2021, a modalidade de licitação obrigatória para a aquisição de bens e serviços comuns é o:',
    options: [
      { id: 'opt-a', text: 'A) Pregão.' },
      { id: 'opt-b', text: 'B) Convite.' },
      { id: 'opt-c', text: 'C) Leilão.' },
      { id: 'opt-d', text: 'D) Diálogo Competitivo.' },
      { id: 'opt-e', text: 'E) Tomada de Preços.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. O Pregão é obrigatório para bens e serviços comuns na Lei 14.133/21. As modalidades Convite e Tomada de Preços foram extintas.',
    legalReference: 'Lei 14.133/2021, Art. 6º, XLI e Art. 28.',
    difficulty: 'fácil',
    year: 2024,
    institution: 'FCC'
  },

  // --- PROCESSO CIVIL ---
  {
    id: 'q-pc-1',
    disciplineId: 'processo-civil',
    topicId: 'pc-5',
    topicName: 'Prazos',
    statement: 'De acordo com o Código de Processo Civil de 2015 (CPC/15), na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão:',
    options: [
      { id: 'opt-a', text: 'A) Somente os dias úteis.' },
      { id: 'opt-b', text: 'B) Os dias corridos, inclusive sábados, domingos e feriados.' },
      { id: 'opt-c', text: 'C) Os dias corridos, exceto o domingo.' },
      { id: 'opt-d', text: 'D) Somente os dias em que houver expediente no STF.' },
      { id: 'opt-e', text: 'E) Dias úteis apenas se for ação contra a Fazenda Pública.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. Nos termos do Art. 219 do CPC/15, na contagem de prazo em dias estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis.',
    legalReference: 'CPC/2015, Art. 219.',
    difficulty: 'fácil',
    year: 2023,
    institution: 'FGV'
  },

  // --- PROCESSO PENAL ---
  {
    id: 'q-pp-1',
    disciplineId: 'processo-penal',
    topicId: 'pp-3',
    topicName: 'Inquérito Policial',
    statement: 'Em relação ao Inquérito Policial regido pelo Código de Processo Penal brasileiro, assinale a opção correta:',
    options: [
      { id: 'opt-a', text: 'A) A autoridade policial (Delegado de Polícia) não poderá mandar arquivar autos de inquérito.' },
      { id: 'opt-b', text: 'B) O inquérito policial é indispensável ao oferecimento da denúncia pelo Ministério Público.' },
      { id: 'opt-c', text: 'C) O inquérito é um procedimento judicial dotado de amplo contraditório prévio.' },
      { id: 'opt-d', text: 'D) O prazo para conclusão do inquérito de réu preso é de 30 dias improrrogáveis.' },
      { id: 'opt-e', text: 'E) O sigilo do inquérito impede o acesso do advogado aos elementos já documentados.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. Princípio da Indisponibilidade do Inquérito Policial (Art. 17 do CPP): a autoridade policial não pode mandar arquivar autos de inquérito.',
    legalReference: 'CPP, Art. 17.',
    difficulty: 'médio',
    year: 2024,
    institution: 'Cebraspe'
  },

  // --- INFORMÁTICA ---
  {
    id: 'q-inf-1',
    disciplineId: 'informatica',
    topicId: 'inf-11',
    topicName: 'Segurança da Informação',
    statement: 'O tipo de programa malicioso que criptografa os dados do usuário e exige um resgate para liberação da chave de decodificação denomina-se:',
    options: [
      { id: 'opt-a', text: 'A) Ransomware.' },
      { id: 'opt-b', text: 'B) Spyware.' },
      { id: 'opt-c', text: 'C) Adware.' },
      { id: 'opt-d', text: 'D) Keylogger.' },
      { id: 'opt-e', text: 'E) Rootkit.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. Ransomware é o malware sequestrador de dados que realiza criptografia extorsiva exigindo pagamento de resgate (ransom).',
    legalReference: 'Conceitos de Segurança da Informação.',
    difficulty: 'fácil',
    year: 2024,
    institution: 'FGV'
  },

  // --- GEOGRAFIA DO AMAZONAS ---
  {
    id: 'q-geo-1',
    disciplineId: 'geografia-amazonas',
    topicId: 'geo-3',
    topicName: 'Hidrografia',
    statement: 'O fenômeno do "Encontro das Águas" entre o Rio Negro e o Rio Solimões em Manaus ocorre devido a fatores como:',
    options: [
      { id: 'opt-a', text: 'A) Diferenças na densidade, temperatura e velocidade de escoamento das águas dos dois rios.' },
      { id: 'opt-b', text: 'B) Diferença exclusiva na salinidade proveniente do Oceano Atlântico.' },
      { id: 'opt-c', text: 'C) Presença de barreiras rochosas de granito no leito do rio em Manaus.' },
      { id: 'opt-d', text: 'D) Interferência das marés que represam as águas doces.' },
      { id: 'opt-e', text: 'E) Despejo de resíduos industriais na orla da Capital.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. As águas do Rio Negro (escuras, ácidas, mais quentes e lentas) e do Solimões (barrentas, ricas em sedimentos, mais frias e velozes) não se misturam imediatamente por diferenças físicas e químicas.',
    legalReference: 'Geografia do Amazonas - Bacia Amazônica.',
    difficulty: 'fácil',
    year: 2023,
    institution: 'FGV'
  },

  // --- ACESSIBILIDADE E INCLUSÃO ---
  {
    id: 'q-acess-1',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-3',
    topicName: 'Estatuto da Pessoa com Deficiência',
    statement: 'Nos termos do Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015), o conceito de "Desenho Universal" refere-se à:',
    options: [
      { id: 'opt-a', text: 'A) Concepção de produtos, ambientes e serviços a serem usados por todas as pessoas, sem necessidade de adaptação.' },
      { id: 'opt-b', text: 'B) Instalação de rampas exclusivas mediante requerimento judicial prévio.' },
      { id: 'opt-c', text: 'C) Reserva de vagas em estacionamentos públicos exclusivamente para idosos.' },
      { id: 'opt-d', text: 'D) Criação de linhas de crédito especiais para empresas de transporte público.' },
      { id: 'opt-e', text: 'E) Isenção tributária para aquisição de veículos automotores adaptados.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Correta A. Conforme o Art. 3º, II da Lei 13.146/15, Desenho Universal é a concepção de produtos, ambientes, programas e serviços a serem usados por todas as pessoas, no seu maior alcance possível, sem necessidade de adaptação.',
    legalReference: 'Lei nº 13.146/2015, Art. 3º, II.',
    difficulty: 'fácil',
    year: 2024,
    institution: 'Cebraspe'
  }
];
