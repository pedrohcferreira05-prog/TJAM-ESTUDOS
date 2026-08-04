import { MindMap } from '../types';

export const ALL_TJAM_MINDMAPS: MindMap[] = [
  // --- LEGISLAÇÃO DO TJAM ---
  {
    id: 'map-tjam-1',
    title: 'Estrutura do Poder Judiciário do Amazonas',
    description: '1ª e 2ª Instância, Comarcas, Entrâncias e Cúpula do TJAM.',
    disciplineId: 'legislacao-tjam',
    disciplineName: 'Legislação Institucional do TJAM',
    topic: 'Estrutura do Poder Judiciário do Amazonas',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-28',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['TJAM', 'Organização Judiciária', 'LCE 17/97'],
    rootNode: {
      id: 'tjam-est-root',
      label: 'Poder Judiciário do Estado do Amazonas',
      color: '#7c3aed',
      isKeyConcept: true,
      note: 'Conforme LC 17/97 e CF/88. Sede na Capital Manaus.',
      children: [
        {
          id: 'tjam-est-2inst',
          label: '2ª Instância (Tribunal de Justiça)',
          color: '#2563eb',
          isKeyConcept: true,
          note: 'Composto por 26 Desembargadores.',
          children: [
            { id: 'tjam-est-pleno', label: 'Tribunal Pleno (Mesa Diretora: Presidente, Vice e Corregedor)' },
            { id: 'tjam-est-camaras', label: 'Câmaras Cíveis (1ª, 2ª e 3ª) e Criminais (1ª e 2ª)' },
            { id: 'tjam-est-reunidas', label: 'Câmaras Reunidas (Mandados de Segurança e Recursos)' }
          ]
        },
        {
          id: 'tjam-est-1inst',
          label: '1ª Instância (Juízes de Direito)',
          color: '#059669',
          isKeyConcept: true,
          note: 'Distribuídos em Comarcas no estado.',
          children: [
            { id: 'tjam-est-entrancias', label: 'Entrâncias: Inicial, Intermediária e Final (Manaus)' },
            { id: 'tjam-est-juizados', label: 'Juizados Especiais e Turmas Recursais' },
            { id: 'tjam-est-juri', label: 'Tribunal do Júri (Crimes Dolosos contra a Vida)' }
          ]
        }
      ]
    }
  },
  {
    id: 'map-tjam-2',
    title: 'Competências do TJAM',
    description: 'Competência Originária e Recursal do Pleno e Câmaras.',
    disciplineId: 'legislacao-tjam',
    disciplineName: 'Legislação Institucional do TJAM',
    topic: 'Competências do TJAM',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-29',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['Competências', 'Regimento Interno', 'TJAM'],
    rootNode: {
      id: 'comp-root',
      label: 'Competências Constitucionais e Regimentais',
      color: '#d97706',
      isKeyConcept: true,
      children: [
        {
          id: 'comp-pleno',
          label: 'Tribunal Pleno (Originária)',
          color: '#7c3aed',
          children: [
            { id: 'cp-1', label: 'ADI de Lei Municipal perante a CF/88 ou CE/89' },
            { id: 'cp-2', label: 'MS contra atos do Governador, Presidente da ALEAM e TJAM' },
            { id: 'cp-3', label: 'Crimes comuns de Deputados Estaduais e Prefeitos' }
          ]
        },
        {
          id: 'comp-reunidas',
          label: 'Câmaras Reunidas',
          color: '#059669',
          children: [
            { id: 'cr-1', label: 'MS contra atos de Secretários de Estado e Juízes' },
            { id: 'cr-2', label: 'Ações Rescisórias de acórdãos de Câmaras Isoladas' }
          ]
        }
      ]
    }
  },

  // --- LÍNGUA PORTUGUESA ---
  {
    id: 'map-port-1',
    title: 'Interpretação e Tipologia Textual',
    description: 'Gêneros, Tipos de Texto e Estratégias de Leitura da FGV/Cebraspe.',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    topic: 'Interpretação de textos',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-25',
    updatedAt: '2026-07-31',
    author: 'Profa. Ana Clara',
    tags: ['Português', 'Interpretação', 'FGV'],
    rootNode: {
      id: 'port-interp-root',
      label: 'Compreensão e Tipologia Textual',
      color: '#2563eb',
      isKeyConcept: true,
      children: [
        {
          id: 'port-tipos',
          label: 'Tipos Textuais Principais',
          color: '#059669',
          children: [
            { id: 'tp-1', label: 'Narrativo: Fatos, personagens, tempo e espaço' },
            { id: 'tp-2', label: 'Dissertativo-Argumentativo: Tese, argumentos e conclusão' },
            { id: 'tp-3', label: 'Injuntivo/Instrucional: Verbos no imperativo (manuais, leis)' }
          ]
        },
        {
          id: 'port-estrat',
          label: 'Níveis de Leitura',
          color: '#d97706',
          children: [
            { id: 'nl-1', label: 'Compreensão: O que O TEXTO DIZ (LITERAL)' },
            { id: 'nl-2', label: 'Interpretação: O que SE CONCLUI DO TEXTO (INFERÊNCIA)' }
          ]
        }
      ]
    }
  },
  {
    id: 'map-port-16',
    title: 'Crase - Casos Proibidos, Obrigatórios e Facultativos',
    description: 'Acento indicativo de crase em concursos públicos.',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    topic: 'Crase',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-26',
    updatedAt: '2026-07-31',
    author: 'Profa. Ana Clara',
    tags: ['Gramática', 'Crase', 'Sintaxe'],
    rootNode: {
      id: 'crase-root',
      label: 'Emprego do Acento Indicativo de Crase (à)',
      color: '#e11d48',
      isKeyConcept: true,
      children: [
        {
          id: 'crase-obrig',
          label: 'Casos Obrigatórios',
          color: '#059669',
          children: [
            { id: 'co-1', label: 'Regência exige "A" + Substantivo Feminino ("Vou à praia")' },
            { id: 'co-2', label: 'Locuções Adverbiais Femininas ("À noite", "Às pressas")' },
            { id: 'co-3', label: 'Expressão "À moda de" (mesmo implícita)' }
          ]
        },
        {
          id: 'crase-facult',
          label: 'Casos Facultativos ("Até a sua Maria")',
          color: '#d97706',
          children: [
            { id: 'cf-1', label: 'Após a preposição "Até"' },
            { id: 'cf-2', label: 'Antes de Pronome Possessivo Feminino no singular ("Sua", "Minha")' },
            { id: 'cf-3', label: 'Antes de Nome Próprio Feminino' }
          ]
        },
        {
          id: 'crase-proib',
          label: 'Casos Proibidos',
          color: '#dc2626',
          children: [
            { id: 'cp-1', label: 'Antes de Palavras Masculinas e Verbos' },
            { id: 'cp-2', label: 'Antes de Pronomes em Geral (Este, Esta, Quem, Você)' },
            { id: 'cp-3', label: 'Palavras Repetidas ("Dia a dia", "Gota a gota")' }
          ]
        }
      ]
    }
  },

  // --- DIREITO CONSTITUCIONAL ---
  {
    id: 'map-const-13',
    title: 'Poder Judiciário na CF/88',
    description: 'Estrutura, Garantias da Magistratura e Conselho Nacional de Justiça (CNJ).',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    topic: 'Poder Judiciário',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-27',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['CF/88', 'Poder Judiciário', 'Magistratura'],
    rootNode: {
      id: 'pj-root',
      label: 'Poder Judiciário (Art. 92 a 126 CF/88)',
      color: '#0284c7',
      isKeyConcept: true,
      children: [
        {
          id: 'pj-garantias',
          label: 'Garantias dos Magistrados',
          color: '#059669',
          children: [
            { id: 'g-1', label: 'Vitaliciedade (após 2 anos de efetivo exercício)' },
            { id: 'g-2', label: 'Inamovibilidade (salvo motivo de interesse público)' },
            { id: 'g-3', label: 'Irreductibilidade de Subvenção/Subsídio' }
          ]
        },
        {
          id: 'pj-cnj',
          label: 'Conselho Nacional de Justiça (CNJ)',
          color: '#7c3aed',
          children: [
            { id: 'cnj-1', label: 'Composto por 15 membros (Presidente é o do STF)' },
            { id: 'cnj-2', label: 'Órgão estritamente Administrativo e Financeiro (Sem função jurisdicional)' }
          ]
        }
      ]
    }
  },

  // --- DIREITO ADMINISTRATIVO ---
  {
    id: 'map-adm-4',
    title: 'Atos Administrativos - Elementos e Atributos',
    description: 'Competência, Finalidade, Forma, Motivo, Objeto e Mnemônicos PATI/COFIFOMOB.',
    disciplineId: 'direito-administrativo',
    disciplineName: 'Direito Administrativo',
    topic: 'Atos Administrativos',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-28',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['Direito Administrativo', 'Atos Administrativos', 'Mnemônicos'],
    rootNode: {
      id: 'atos-root',
      label: 'Atos Administrativos',
      color: '#2563eb',
      isKeyConcept: true,
      children: [
        {
          id: 'atos-elementos',
          label: 'Elementos / Requisitos (CO-FI-FO-MO-OB)',
          color: '#059669',
          children: [
            { id: 'el-1', label: 'Competência (vinculado / sujeito a convalidação)' },
            { id: 'el-2', label: 'Finalidade (interesse público / vinculado)' },
            { id: 'el-3', label: 'Forma (vinculado em regra)' },
            { id: 'el-4', label: 'Motivo (pressuposto de fato e de direito)' },
            { id: 'el-5', label: 'Objeto (conteúdo do ato / discricionário ou vinculado)' }
          ]
        },
        {
          id: 'atos-atributos',
          label: 'Atributos / Características (P-A-T-I)',
          color: '#d97706',
          children: [
            { id: 'at-1', label: 'Presunção de Legitimidade e Veracidade' },
            { id: 'at-2', label: 'Autoexecutoriedade (execução sem intervenção do Judiciário)' },
            { id: 'at-3', label: 'Tipicidade (figuras previstas em lei)' },
            { id: 'at-4', label: 'Imperatividade (imposição coercitiva de obrigações)' }
          ]
        }
      ]
    }
  },

  // --- PROCESSO CIVIL ---
  {
    id: 'map-pc-5',
    title: 'Prazos Processuais no CPC/2015',
    description: 'Contagem em dias úteis, prazos em dobro e suspensão de prazos.',
    disciplineId: 'processo-civil',
    disciplineName: 'Processo Civil',
    topic: 'Prazos',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-29',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['CPC/15', 'Prazos Processuais', 'Processo Civil'],
    rootNode: {
      id: 'prazos-pc-root',
      label: 'Prazos Processuais (CPC/15)',
      color: '#4f46e5',
      isKeyConcept: true,
      children: [
        {
          id: 'pc-contagem',
          label: 'Regras de Contagem',
          color: '#059669',
          children: [
            { id: 'pr-1', label: 'Somente DIAS ÚTEIS (Art. 219 do CPC)' },
            { id: 'pr-2', label: 'Exclui o dia do começo e inclui o dia do vencimento' },
            { id: 'pr-3', label: 'Suspensão de prazos: 20 de Dezembro a 20 de Janeiro (Recesso/Férias)' }
          ]
        },
        {
          id: 'pc-dobro',
          label: 'Contagem em Dobro',
          color: '#e11d48',
          children: [
            { id: 'db-1', label: 'Ministério Público, Defensoria e Advocacia Pública' },
            { id: 'db-2', label: 'Litisconsortes com procuradores diferentes de escritórios distintos (no processo físico)' }
          ]
        }
      ]
    }
  },

  // --- PROCESSO PENAL ---
  {
    id: 'map-pp-3',
    title: 'Inquérito Policial (IP) - Características e Vícios',
    description: 'Inquisitorialidade, Indisponibilidade, Oficiosidade e Incomunicabilidade.',
    disciplineId: 'processo-penal',
    disciplineName: 'Processo Penal',
    topic: 'Inquérito Policial',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-29',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['CPP', 'Inquérito Policial', 'Processo Penal'],
    rootNode: {
      id: 'ip-root',
      label: 'Inquérito Policial (CPP)',
      color: '#e11d48',
      isKeyConcept: true,
      children: [
        {
          id: 'ip-caract',
          label: 'Características do IP (SEI DIDO)',
          color: '#059669',
          children: [
            { id: 'ic-1', label: 'Sigiloso (salvo para o advogado com procuração/STF SV 14)' },
            { id: 'ic-2', label: 'Escrito e Informativo (peça preparatória da ação penal)' },
            { id: 'ic-3', label: 'Indisponível (o Delegado NÃO PODE arquivar o IP)' },
            { id: 'ic-4', label: 'Inquisitorial (sem contraditório amplo prévio)' }
          ]
        },
        {
          id: 'ip-prazos',
          label: 'Prazos de Conclusão',
          color: '#d97706',
          children: [
            { id: 'pz-1', label: 'Investigado Preso: 10 dias (Regra Geral do CPP)' },
            { id: 'pz-2', label: 'Investigado Solto: 30 dias (prorrogáveis pelo Juiz)' }
          ]
        }
      ]
    }
  },

  // --- INFORMÁTICA ---
  {
    id: 'map-inf-11',
    title: 'Segurança da Informação e Malware',
    description: 'Vírus, Worm, Trojan, Ransomware, Phishing e Princípios CIDAR.',
    disciplineId: 'informatica',
    disciplineName: 'Informática',
    topic: 'Segurança da Informação',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-30',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['Informática', 'Segurança', 'Malware'],
    rootNode: {
      id: 'seg-root',
      label: 'Segurança da Informação',
      color: '#0891b2',
      isKeyConcept: true,
      children: [
        {
          id: 'seg-pilares',
          label: 'Pilares Básicos (C-I-D-A)',
          color: '#059669',
          children: [
            { id: 'p-1', label: 'Confidencialidade: Acesso apenas por pessoas autorizadas' },
            { id: 'p-2', label: 'Integridade: Informação não alterada indevidamente' },
            { id: 'p-3', label: 'Disponibilidade: Acessível quando necessário' },
            { id: 'p-4', label: 'Autenticidade: Confirmação da identidade da fonte' }
          ]
        },
        {
          id: 'seg-ameacas',
          label: 'Ameaças e Pragas',
          color: '#e11d48',
          children: [
            { id: 'am-1', label: 'Ransomware: Criptografa arquivos e exige resgate' },
            { id: 'am-2', label: 'Phishing: Enganação via e-mail para roubar senhas' },
            { id: 'am-3', label: 'Worm: Propaga-se autonomamente pela rede sem hospedeiro' }
          ]
        }
      ]
    }
  },

  // --- GEOGRAFIA DO AMAZONAS ---
  {
    id: 'map-geo-3',
    title: 'Hidrografia do Amazonas e Encontro das Águas',
    description: 'Bacia Amazônica, Solimões, Rio Negro e características fluviais.',
    disciplineId: 'geografia-amazonas',
    disciplineName: 'Geografia do Amazonas',
    topic: 'Hidrografia',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-30',
    updatedAt: '2026-07-31',
    author: 'Prof. TJAM Estudos',
    tags: ['Geografia', 'Amazonas', 'Hidrografia'],
    rootNode: {
      id: 'hidro-root',
      label: 'Hidrografia do Estado do Amazonas',
      color: '#0d9488',
      isKeyConcept: true,
      children: [
        {
          id: 'encontro-aguas',
          label: 'Encontro das Águas (Manaus)',
          color: '#0284c7',
          isKeyConcept: true,
          children: [
            { id: 'ea-1', label: 'Rio Negro: Água preta, ácida, ~28°C, velocidade 2km/h' },
            { id: 'ea-2', label: 'Rio Solimões: Água barrenta, sedimentos, ~22°C, velocidade 6km/h' },
            { id: 'ea-3', label: 'Não se misturam por ~6km devido a densidade, velocidade e temperatura' }
          ]
        },
        {
          id: 'bacia-am',
          label: 'Regimes Fluviais',
          color: '#059669',
          children: [
            { id: 'rf-1', label: 'Regime Misto: Pluvial + Nival (nascentes nos Andes)' },
            { id: 'rf-2', label: 'Picos de Cheia (Maio/Junho) e Estiagem/Seca (Outubro/Novembro)' }
          ]
        }
      ]
    }
  },

  // --- ACESSIBILIDADE E INCLUSÃO ---
  {
    id: 'map-acess-3',
    title: 'Estatuto da Pessoa com Deficiência (Lei 13.146/15)',
    description: 'Direitos fundamentais, Barreiras e Desenho Universal.',
    disciplineId: 'acessibilidade-inclusao',
    disciplineName: 'Acessibilidade e Inclusão',
    topic: 'Estatuto da Pessoa com Deficiência',
    level: 'standard',
    status: 'published',
    createdAt: '2026-07-30',
    updatedAt: '2026-07-31',
    author: 'Profa. TJAM Estudos',
    tags: ['LBI', 'Lei 13.146/15', 'Acessibilidade'],
    rootNode: {
      id: 'lbi-root',
      label: 'Lei Brasileira de Inclusão (Lei 13.146/2015)',
      color: '#db2777',
      isKeyConcept: true,
      children: [
        {
          id: 'lbi-conceitos',
          label: 'Conceitos Chave (Art. 3º)',
          color: '#059669',
          children: [
            { id: 'lc-1', label: 'Desenho Universal: Concepção de produtos para TODOS sem necessidade de adaptação' },
            { id: 'lc-2', label: 'Tecnologia Assistiva: Equipamentos e recursos que promovem autonomia' },
            { id: 'lc-3', label: 'Atendimento Prioritário: Garantia em todos os órgãos do Poder Judiciário' }
          ]
        },
        {
          id: 'lbi-barreiras',
          label: 'Tipos de Barreiras',
          color: '#e11d48',
          children: [
            { id: 'bar-1', label: 'Arquitetônicas (Edificações), Urbanísticas (Vias públicas)' },
            { id: 'bar-2', label: 'Comunicacionais e nas Transportes' },
            { id: 'bar-3', label: 'Atitudinais (Atitudes preconceituosas ou estigmatizantes)' }
          ]
        }
      ]
    }
  }
];
