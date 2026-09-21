import { Turma, Announcement, LiveClass, PublishedMaterial, StudentSubmission, Certificate } from '../types';

export const INITIAL_TURMAS: Turma[] = [
  {
    id: 'turma-tjam-2026-01',
    name: 'Turma Reta Final TJAM 2026 - Técnico Judiciário',
    code: 'TJAM-TEC-01',
    teacherId: 'prof-alberto-silva',
    teacherName: 'Prof. Dr. Alberto Silva (Ex-Juiz do TJAM)',
    targetExam: 'Tribunal de Justiça do Estado do Amazonas - Técnico Judiciário',
    description: 'Preparatório de alta performance com cronograma intensivo, reta final de resolução de questões da FGV/Cebraspe, simulados inéditos e plantão de dúvidas com professores especialistas.',
    currentStage: 'Etapa 2: Legislação Específica e Exercícios Intensivos',
    startDate: '2026-05-01',
    endDate: '2026-11-15',
    studentCount: 48,
    disciplineIds: [
      'legislacao-tjam',
      'direito-constitucional',
      'direito-administrativo',
      'lingua-portuguesa',
      'geografia-amazonas',
      'acessibilidade-inclusao',
    ],
    students: [
      {
        id: 'st-01',
        name: 'Maria Eduarda Amazonas',
        email: 'maria.amazonas@gmail.com',
        enrolledAt: '2026-05-10',
        progressPercent: 78,
        averageScore: 8.6,
        simuladosDone: 4,
        lastActive: 'Hoje às 14:20',
      },
      {
        id: 'st-02',
        name: 'João Pedro Solimões',
        email: 'jpedro.solimoes@hotmail.com',
        enrolledAt: '2026-05-12',
        progressPercent: 65,
        averageScore: 7.8,
        simuladosDone: 3,
        lastActive: 'Hoje às 10:15',
      },
      {
        id: 'st-03',
        name: 'Ana Clara Negro',
        email: 'anac.negro@outlook.com',
        enrolledAt: '2026-05-15',
        progressPercent: 92,
        averageScore: 9.2,
        simuladosDone: 5,
        lastActive: 'Ontem às 21:40',
      },
      {
        id: 'st-04',
        name: 'Carlos Eduardo Manaus',
        email: 'carlos.manaus@yahoo.com.br',
        enrolledAt: '2026-05-20',
        progressPercent: 54,
        averageScore: 6.9,
        simuladosDone: 2,
        lastActive: 'Há 2 dias',
      },
    ],
  },
  {
    id: 'turma-tjam-2026-02',
    name: 'Turma Analista Judiciário - Direito & Processos',
    code: 'TJAM-ANA-02',
    teacherId: 'prof-roberta-farias',
    teacherName: 'Profa. Dra. Roberta Farias',
    targetExam: 'Tribunal de Justiça do Estado do Amazonas - Analista Judiciário',
    description: 'Turma avançada focada em Direito Processual Civil, Processual Penal, Constitucional Avançado e Prática de Peças Administrativas e Recursos para o TJAM.',
    currentStage: 'Etapa 3: Simulados Globais e Jurisprudência do STF/STJ',
    startDate: '2026-04-15',
    endDate: '2026-11-15',
    studentCount: 32,
    disciplineIds: [
      'legislacao-tjam',
      'direito-constitucional',
      'direito-administrativo',
      'processo-civil',
      'processo-penal',
    ],
    students: [
      {
        id: 'st-05',
        name: 'Fernanda Lima Coari',
        email: 'fernanda.coari@gmail.com',
        enrolledAt: '2026-04-18',
        progressPercent: 88,
        averageScore: 9.1,
        simuladosDone: 6,
        lastActive: 'Hoje às 16:00',
      },
    ],
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'aviso-libras-02',
    turmaId: 'turma-tjam-2026-01',
    title: '🤟 NOVA AULA: LIBRAS Aula 2 — Prática de Comunicação & Diálogos no TJAM',
    content: 'Caros alunos, o módulo prático de LIBRAS com foco no atendimento ao cidadão surdo nas secretarias e balcões do Tribunal de Justiça já está ativo com simulador de diálogo, cronômetro de 40 min e treino de datilologia.',
    authorName: 'Profa. Especialista em Acessibilidade',
    createdAt: '2026-08-28',
    priority: 'alta',
  },
  {
    id: 'aviso-adm-07',
    turmaId: 'turma-tjam-2026-01',
    title: '⚖️ DIR. ADMINISTRATIVO: Aula 7 — Poderes da Administração Pública (FGV)',
    content: 'Liberamos a aula completa sobre Poder Hierárquico, Disciplinar, Regulamentar e Poder de Polícia com 20 questões resolvidas.',
    authorName: 'Prof. Dr. Alberto Silva',
    createdAt: '2026-08-27',
    priority: 'alta',
  },
  {
    id: 'aviso-01',
    turmaId: 'turma-tjam-2026-01',
    title: '📢 Liberação da Etapa 2: Regimento Interno do TJAM e Resolução de Questões FGV',
    content: 'Estimados alunos, liberamos no portal os materiais completos referente às Câmaras Reunidas, Conselho da Magistratura e Plantão Judiciário do TJAM (Art. 12 ao 45 do RI). Façam a leitura atenta da lei seca e resolvam as 15 questões comentadas.',
    authorName: 'Prof. Dr. Alberto Silva',
    createdAt: '2026-07-29',
    priority: 'alta',
  },
  {
    id: 'aviso-02',
    turmaId: 'turma-tjam-2026-01',
    title: '🎥 AULA AO VIVO CONFIRMADA: Revisão de Véspera - Jurisprudência em Ação',
    content: 'Nesta quinta-feira às 19:30 teremos nossa Aula Ao Vivo focada em Pegadinhas da FGV em Direito Constitucional e Administrativo aplicados aos Tribunais de Justiça do Norte.',
    authorName: 'Profa. Dra. Roberta Farias',
    createdAt: '2026-07-30',
    priority: 'urgente',
  },
];

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'live-01',
    turmaId: 'turma-tjam-2026-01',
    title: 'Super Aula Ao Vivo: Competência do Tribunal Pleno e Conselho da Magistratura',
    description: 'Análise pormenorizada dos julgados recentes e dispositivos regimentais com maior incidência na banca examinadora.',
    disciplineId: 'legislacao-tjam',
    disciplineName: 'Legislação Institucional do TJAM',
    date: '2026-08-05',
    time: '19:30 - 21:30',
    meetingUrl: 'https://meet.google.com/tjam-live-aula-2026',
    status: 'agendada',
  },
  {
    id: 'live-02',
    turmaId: 'turma-tjam-2026-01',
    title: 'Resolução ao Vivo: Simulado Geral Oficial TJAM #01',
    description: 'Gabarito comentado ao vivo das 40 questões do simulado oficial.',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    date: '2026-07-28',
    time: '19:00 - 21:00',
    meetingUrl: 'https://meet.google.com/tjam-live-simulado-01',
    status: 'gravada',
    recordingUrl: 'https://youtube.com/watch?v=tjam-gravacao-simulado01',
  },
];

export const INITIAL_PUBLISHED_MATERIALS: PublishedMaterial[] = [
  {
    id: 'mat-libras-02',
    turmaId: 'turma-tjam-2026-01',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-9',
    title: 'Guia Prático: Vocabulário, Cumprimentos e Diálogos de Atendimento em LIBRAS',
    type: 'pdf',
    content: 'Guia visual com os 9 cumprimentos essenciais, estrutura gramatical de apresentações, soletração manual e simulação de atendimento judiciário em LIBRAS.',
    attachmentUrl: 'https://tjam.jus.br/docs/libras_atendimento_tjam_aula2.pdf',
    releaseStage: 'Etapa 2: Acessibilidade & LIBRAS',
    releaseDate: '2026-08-28',
    isReleased: true,
    createdAt: '2026-08-28',
    authorName: 'Profa. Especialista em Acessibilidade',
  },
  {
    id: 'mat-adm-07',
    turmaId: 'turma-tjam-2026-01',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-3',
    title: 'Resumo Esquematizado: Poderes da Administração Pública e Jurisprudência FGV',
    type: 'pdf',
    content: 'Esquema detalhado dos Poderes Hierárquico, Disciplinar, Regulamentar, Poder de Polícia e distinção entre Excesso de Poder e Desvio de Finalidade.',
    attachmentUrl: 'https://tjam.jus.br/docs/poderes_administrativos_tjam.pdf',
    releaseStage: 'Etapa 2: Legislação Específica',
    releaseDate: '2026-08-27',
    isReleased: true,
    createdAt: '2026-08-27',
    authorName: 'Prof. Alberto Silva',
  },
  {
    id: 'mat-01',
    turmaId: 'turma-tjam-2026-01',
    disciplineId: 'legislacao-tjam',
    topicId: 'tjam-2',
    title: 'Apostila Completa: Estrutura Orgânica e Competências do TJAM',
    type: 'pdf',
    content: 'Material didático oficial em PDF contendo tabelas comparativas sobre a divisão de competências do Pleno, Câmaras Cíveis, Câmaras Criminais e Conselho da Magistratura.',
    attachmentUrl: 'https://tjam.jus.br/docs/apostila_regimento_tjam_2026.pdf',
    releaseStage: 'Etapa 2: Legislação Específica',
    releaseDate: '2026-07-25',
    isReleased: true,
    createdAt: '2026-07-25',
    authorName: 'Prof. Alberto Silva',
  },
  {
    id: 'mat-02',
    turmaId: 'turma-tjam-2026-01',
    disciplineId: 'direito-constitucional',
    topicId: 'const-4',
    title: 'Mapa Mental Interativo: Remédios Constitucionais e Prazos Decadenciais',
    type: 'mapa',
    content: 'Esquema visual detalhando Mandado de Segurança, Habeas Corpus, Habeas Data, Ação Popular e Mandado de Injunção com os reflexos no Judiciário do Amazonas.',
    releaseStage: 'Etapa 1: Teoria Geral',
    releaseDate: '2026-07-20',
    isReleased: true,
    createdAt: '2026-07-20',
    authorName: 'Profa. Roberta Farias',
  },
];

export const INITIAL_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-pp-aula1-001',
    studentId: 'id00120087',
    studentName: 'Eduardo Mateus',
    turmaId: 'turma-tjam-2026',
    activityTitle: 'Aula 1: 5 Questões Escritas — Princípios Fundamentais do Processo Penal',
    disciplineName: 'Direito Processual Penal',
    submittedAt: new Date().toISOString(),
    content: `[Questão 16: Diferença entre princípio do contraditório e princípio da ampla defesa]
RESPOSTA DO ALUNO: O contraditório é a garantia bilateral de ciência de todos os atos praticados pela parte contrária e a oportunidade de manifestação e reação processual. Já a ampla defesa assegura a utilização de todos os meios e recursos admitidos em direito para defender o acusado, desdobrando-se obrigatoriamente em defesa técnica prestada por advogado ou defensor público e autodefesa exercida pelo próprio réu (como o direito de presença e de audiência).

[Questão 17: Regras decorrentes da presunção de inocência]
RESPOSTA DO ALUNO: A presunção de inocência (art. 5º, LVII, CF) desdobra-se como regra de tratamento (o investigado deve ser tratado como inocente até condenação irrecorrível, impedindo estigmatizações e antecipação de pena) e regra probatória (o ônus da prova recai exclusivamente sobre a acusação, aplicando-se o in dubio pro reo caso persista dúvida razoável).

[Questão 18: Garantias do princípio do juiz natural]
RESPOSTA DO ALUNO: O princípio do juiz natural (art. 5º, XXXVII e LIII, CF) assegura que ninguém será processado nem sentenciado senão pela autoridade competente prévia fixada pela lei, sendo absolutamente proibida a criação de tribunal ou juízo de exceção (post factum).

[Questão 19: Consequência processual de prova obtida por meio ilícito]
RESPOSTA DO ALUNO: Pelo art. 5º, LVI, da CF e art. 157 do CPP, as provas ilícitas são inadmissíveis, devendo ser desentranhadas dos autos e inutilizadas. As provas derivadas da ilícita também são contaminadas (teoria dos frutos da árvore envenenada), ressalvadas as hipóteses legais de fonte independente e descoberta inevitável.

[Questão 20: Características do sistema acusatório]
RESPOSTA DO ALUNO: O sistema processual acusatório fundamenta-se na nítida separação entre as funções de acusar (Ministério Público), defender e julgar (magistrado neutro e equidistante). Ao contrário do sistema inquisitivo, o juiz não é o protagonista probatório nem investiga, preservando sua estrita imparcialidade.`,
    status: 'pendente',
  },
  {
    id: 'sub-ltjam-aula1-001',
    studentId: 'id00120087',
    studentName: 'Eduardo Mateus',
    turmaId: 'turma-tjam-2026',
    activityTitle: 'Aula 1: 5 Questões Escritas — Organização Judiciária do Estado do Amazonas (LC 261/2023)',
    disciplineName: 'Legislação Institucional do TJAM',
    submittedAt: new Date().toISOString(),
    content: `[Questão 16: O que significa organização judiciária e qual a sua importância para o funcionamento do Poder Judiciário do Amazonas]
RESPOSTA DO ALUNO: Organização judiciária é a forma pela qual o Poder Judiciário estrutura seus órgãos, unidades, servidores e competências territoriais e materiais para exercer a jurisdição. É essencial para o TJAM porque define com precisão qual órgão tem competência para processar e julgar cada matéria, onde ela deve ser ajuizada (comarcas e termos) e como os serviços auxiliares apoiam os magistrados na prestação jurisdicional célere e eficaz.

[Questão 17: Órgãos que compõem o Poder Judiciário do Estado do Amazonas segundo o art. 3º da LC 261/2023]
RESPOSTA DO ALUNO: Conforme o art. 3º da LC nº 261/2023, integram o Poder Judiciário do Amazonas: 1) Tribunal de Justiça (órgão de cúpula); 2) Turmas Recursais dos Juizados Especiais; 3) Tribunais do Júri; 4) Juízes de Direito; 5) Juízes Substitutos de Carreira; 6) Auditoria Militar e Conselhos de Justiça; e 7) Juízes de Paz. O Ministério Público e a Defensoria não entram pois são funções essenciais.

[Questão 18: Diferença entre Comarca e Termo Judiciário na organização judiciária do Amazonas]
RESPOSTA DO ALUNO: A comarca é a unidade territorial da divisão judiciária que abrange um ou mais municípios, delimitando a circunscrição da autoridade jurisdicional de 1º grau. Já o termo judiciário é uma fração territorial que integra a comarca para fins administrativos. A LC 261/2023 dispõe que o território estadual é dividido em Comarcas e Termos Judiciários para administração do Judiciário.

[Questão 19: O que significa dizer que o Tribunal de Justiça possui jurisdição em todo o território do Amazonas]
RESPOSTA DO ALUNO: Significa que a autoridade jurisdicional do TJAM como tribunal de 2ª Instância alcança a totalidade dos 62 municípios do Estado do Amazonas, tendo competência recursal e originária sobre todo o território amazonense, muito embora sua sede física esteja situada em Manaus.

[Questão 20: Diferença entre Primeira e Segunda Entrância segundo a LC nº 261/2023]
RESPOSTA DO ALUNO: Na nova lei de organização judiciária (LC 261/2023), existem duas entrâncias: a Primeira Entrância abrange as comarcas situadas nos municípios do interior do Amazonas, enquanto a Segunda Entrância é constituída exclusivamente pela comarca da Capital (Manaus).`,
    status: 'pendente',
  },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-tjam-2026-001',
    studentName: 'Maria Eduarda Amazonas',
    studentCpf: '123.456.789-00',
    courseTitle: 'Programa de Capacitação e Preparação de Alta Performance - TJAM (Técnico Judiciário)',
    issuedAt: '2026-07-31',
    totalHours: 120,
    verificationCode: 'TJAM-CERT-2026-88F9A2',
  },
];
