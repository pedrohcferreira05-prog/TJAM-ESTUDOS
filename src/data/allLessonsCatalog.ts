import {
  inglesFlashcardsData,
  inglesMcQuestionsData,
  inglesTfQuestionsData,
  inglesDiscursiveQuestionsData,
  inglesSummaryPoints,
} from './inglesLessonData';

import {
  direitoConstFlashcardsData,
  direitoConstMcQuestionsData,
  direitoConstTfQuestionsData,
  direitoConstDiscursiveQuestionsData,
  direitoConstSummaryPoints,
} from './direitoConstitucionalLessonData';

import {
  legislacaoTjamFlashcardsData,
  legislacaoTjamMcQuestionsData,
  legislacaoTjamTfQuestionsData,
  legislacaoTjamDiscursiveQuestionsData,
  legislacaoTjamSummaryPoints,
} from './legislacaoTjamLessonData';

import {
  direitoAdminFlashcardsData,
  direitoAdminMcQuestionsData,
  direitoAdminTfQuestionsData,
  direitoAdminDiscursiveQuestionsData,
  direitoAdminSummaryPoints,
} from './direitoAdminLessonData';

import {
  informaticaFlashcardsData,
  informaticaMcQuestionsData,
  informaticaTfQuestionsData,
  informaticaDiscursiveQuestionsData,
  informaticaSummaryPoints,
} from './informaticaLessonData';

import {
  librasFlashcardsData,
  librasMcQuestionsData,
  librasTfQuestionsData,
  librasDiscursiveQuestionsData,
  librasSummaryPoints,
} from './librasLessonData';

import {
  portuguesAula3FlashcardsData,
  portuguesAula3McQuestionsData,
  portuguesAula3TfQuestionsData,
  portuguesAula3DiscursiveQuestionsData,
  portuguesAula3SummaryPoints,
} from './portuguesLessonData';

import {
  procCivilFlashcardsData,
  procCivilAula2McQuestionsData,
  procCivilAula2TfQuestionsData,
  procCivilAula2DiscursiveQuestionsData,
  procCivilAula2SummaryPoints,
} from './processoCivilLessonData';

import {
  procPenalFlashcardsData,
  procPenalMcQuestionsData,
  procPenalTfQuestionsData,
  procPenalDiscursiveQuestionsData,
  procPenalLessonSummaryPoints,
} from './processoPenalLessonData';

import {
  geografiaAmazonasFlashcardsData,
  geografiaAmazonasMcQuestionsData,
  geografiaAmazonasTfQuestionsData,
  geografiaAmazonasDiscursiveQuestionsData,
  geografiaAmazonasSummaryPoints,
} from './geografiaAmazonasLessonData';

import {
  escritaLeituraFlashcardsData,
  escritaLeituraMcQuestionsData,
  escritaLeituraTfQuestionsData,
  escritaLeituraDiscursiveQuestionsData,
  escritaLeituraSummaryPoints,
} from './escritaLeituraLessonData';

export interface LessonCatalogMcQuestion {
  id: number;
  enunciado: string;
  alternativas?: string[];
  opcoes?: string[];
  correta: number;
  explicacao: string;
  tema?: string;
}

export interface LessonCatalogTfQuestion {
  id: number;
  enunciado: string;
  correta: boolean;
  explicacao: string;
}

export interface LessonCatalogDiscursiveQuestion {
  id: number;
  titulo?: string;
  enunciado: string;
  respostaEsperada?: string;
  respostaPadrao?: string;
  criterios?: string[];
}

export interface LessonCatalogFlashcard {
  id?: number;
  q: string;
  a: string;
  tag?: string;
}

export interface LessonCatalogItem {
  id: string; // subjectKey in savedLessons (e.g. 'ingles', 'direito_const', 'legislacao_tjam')
  title: string;
  disciplineId: string;
  disciplineName: string;
  badge: string;
  isPriorityToday: boolean;
  emoji: string;
  duration: string;
  videoUrl?: string;
  summary: string;
  mcQuestions: LessonCatalogMcQuestion[];
  tfQuestions?: LessonCatalogTfQuestion[];
  discursiveQuestions: LessonCatalogDiscursiveQuestion[];
  flashcards: LessonCatalogFlashcard[];
  summaryPoints: string[];
}

export const ALL_LESSONS_CATALOG: LessonCatalogItem[] = [
  // 1. PRIMEIRA AULA DE HOJE: LEGISLAÇÃO INSTITUCIONAL TJAM
  {
    id: 'legislacao_tjam',
    title: 'Legislação Institucional — Aula 01: LC 261/2023 (Disposições Gerais e Estrutura)',
    disciplineId: 'legislacao-tjam',
    disciplineName: 'Legislação Institucional do TJAM',
    badge: '1ª Aula de Hoje',
    isPriorityToday: true,
    emoji: '🏛️',
    duration: '45 min',
    summary: 'Disposições gerais, organização básica da carreira dos servidores do TJAM e direitos funcionais da LC 261/2023.',
    mcQuestions: legislacaoTjamMcQuestionsData,
    tfQuestions: legislacaoTjamTfQuestionsData,
    discursiveQuestions: legislacaoTjamDiscursiveQuestionsData,
    flashcards: legislacaoTjamFlashcardsData,
    summaryPoints: legislacaoTjamSummaryPoints,
  },

  // 2. SEGUNDA AULA DE HOJE: DIREITO CONSTITUCIONAL
  {
    id: 'direito_const',
    title: 'Direito Constitucional — Aula 01: Princípios Fundamentais (Arts. 1º a 4º da CF/88)',
    disciplineId: 'direito-constitucional',
    disciplineName: 'Direito Constitucional',
    badge: '2ª Aula de Hoje',
    isPriorityToday: true,
    emoji: '⚖️',
    duration: '45 min',
    summary: 'Fundamentos da República (SO-CI-DI-VA-PLU), Separação dos Poderes (Art. 2º), Objetivos Fundamentais (Art. 3º) e Relações Internacionais (Art. 4º).',
    mcQuestions: direitoConstMcQuestionsData,
    tfQuestions: direitoConstTfQuestionsData,
    discursiveQuestions: direitoConstDiscursiveQuestionsData,
    flashcards: direitoConstFlashcardsData,
    summaryPoints: direitoConstSummaryPoints,
  },

  // 3. TERCEIRA AULA DE HOJE: LÍNGUA INGLESA
  {
    id: 'ingles',
    title: 'Língua Inglesa — Aula 01: Introdução ao Inglês (Cumprimentos, Apresentação & Verbo TO BE)',
    disciplineId: 'lingua-inglesa',
    disciplineName: 'Língua Inglesa',
    badge: '3ª Aula de Hoje',
    isPriorityToday: true,
    emoji: '🇬🇧',
    duration: '45 min',
    summary: 'Cumprimentos formais e informais, pronomes pessoais retos, conjugação do verbo TO BE no presente e apresentação pessoal.',
    mcQuestions: inglesMcQuestionsData,
    tfQuestions: inglesTfQuestionsData,
    discursiveQuestions: inglesDiscursiveQuestionsData,
    flashcards: inglesFlashcardsData,
    summaryPoints: inglesSummaryPoints,
  },

  // 4. INFORMÁTICA
  {
    id: 'informatica',
    title: 'Informática — Aula 04: Redes de Computadores e Internet',
    disciplineId: 'informatica',
    disciplineName: 'Noções de Informática',
    badge: 'Aula 4',
    isPriorityToday: false,
    emoji: '💻',
    duration: '40 min',
    summary: 'Classificação geográfica das redes (LAN, MAN, WAN), protocolos de internet (TCP/IP, HTTP, HTTPS), conexões e segurança.',
    mcQuestions: informaticaMcQuestionsData,
    tfQuestions: informaticaTfQuestionsData,
    discursiveQuestions: informaticaDiscursiveQuestionsData,
    flashcards: informaticaFlashcardsData,
    summaryPoints: informaticaSummaryPoints,
  },

  // 5. LIBRAS
  {
    id: 'libras',
    title: 'LIBRAS — 3ª Aula: Prática de Comunicação e Atendimento ao Cidadão',
    disciplineId: 'libras',
    disciplineName: 'Língua Brasileira de Sinais - LIBRAS',
    badge: '3ª Aula',
    isPriorityToday: false,
    emoji: '🤟',
    duration: '40 min',
    summary: 'Sinais de atendimento judiciário, saudações, datilologia, pronomes interrogativos e atendimento ao público surdo no tribunal.',
    mcQuestions: librasMcQuestionsData,
    tfQuestions: librasTfQuestionsData,
    discursiveQuestions: librasDiscursiveQuestionsData,
    flashcards: librasFlashcardsData,
    summaryPoints: librasSummaryPoints,
  },

  // 6. GEOGRAFIA DO AMAZONAS
  {
    id: 'geografia_amazonas',
    title: 'Geografia do Amazonas — Aula 02: População, Manaus e ZFM',
    disciplineId: 'geografia-historia-am',
    disciplineName: 'Geografia e História do Amazonas',
    badge: 'Aula 2',
    isPriorityToday: false,
    emoji: '🌳',
    duration: '35 min',
    summary: 'Distribuição populacional no Estado do Amazonas, concentração metropolitana em Manaus, Polo Industrial e Zona Franca de Manaus.',
    mcQuestions: geografiaAmazonasMcQuestionsData,
    tfQuestions: geografiaAmazonasTfQuestionsData,
    discursiveQuestions: geografiaAmazonasDiscursiveQuestionsData,
    flashcards: geografiaAmazonasFlashcardsData,
    summaryPoints: geografiaAmazonasSummaryPoints,
  },

  // 7. PROCESSO PENAL
  {
    id: 'processo_penal',
    title: 'Processo Penal — Aula 01: Princípios Fundamentais do Processo Penal',
    disciplineId: 'processo-penal',
    disciplineName: 'Direito Processual Penal',
    badge: 'Aula 1',
    isPriorityToday: false,
    emoji: '⚖️',
    duration: '45 min',
    summary: 'Presunção de inocência, contraditório, ampla defesa, paridade de armas, juiz natural e sistema acusatório no CPP.',
    mcQuestions: procPenalMcQuestionsData,
    tfQuestions: procPenalTfQuestionsData,
    discursiveQuestions: procPenalDiscursiveQuestionsData,
    flashcards: procPenalFlashcardsData,
    summaryPoints: procPenalLessonSummaryPoints,
  },

  // 8. PROCESSO CIVIL
  {
    id: 'processo_civil',
    title: 'Processo Civil — Aula 02: Atos Processuais e Prazos',
    disciplineId: 'processo-civil',
    disciplineName: 'Direito Processual Civil',
    badge: 'Aula 2',
    isPriorityToday: false,
    emoji: '📚',
    duration: '45 min',
    summary: 'Atos das partes e dos juízes, contagem de prazos em dias úteis pelo CPC/2015, preclusão e citação/intimação judicial.',
    mcQuestions: procCivilAula2McQuestionsData,
    tfQuestions: procCivilAula2TfQuestionsData,
    discursiveQuestions: procCivilAula2DiscursiveQuestionsData,
    flashcards: procCivilFlashcardsData,
    summaryPoints: procCivilAula2SummaryPoints,
  },

  // 9. LÍNGUA PORTUGUESA
  {
    id: 'portugues',
    title: 'Língua Portuguesa — Aula 03: Interpretação de Textos e Tipologias',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa',
    badge: 'Aula 3',
    isPriorityToday: false,
    emoji: '📖',
    duration: '45 min',
    summary: 'Interpretação e compreensão textual pela banca FGV, inferências válidas, extrapolação e identificação de tese argumentativa.',
    mcQuestions: portuguesAula3McQuestionsData,
    tfQuestions: portuguesAula3TfQuestionsData,
    discursiveQuestions: portuguesAula3DiscursiveQuestionsData,
    flashcards: portuguesAula3FlashcardsData,
    summaryPoints: portuguesAula3SummaryPoints,
  },

  // 10. DIREITO ADMINISTRATIVO
  {
    id: 'direito_admin',
    title: 'Direito Administrativo — Aula 02: Controle da Administração Pública',
    disciplineId: 'direito-administrativo',
    disciplineName: 'Direito Administrativo',
    badge: 'Aula 2',
    isPriorityToday: false,
    emoji: '⚖️',
    duration: '45 min',
    summary: 'Controle interno e externo, autotutela administrativa (Súmulas 346 e 473 do STF), controle judicial e limites de mérito.',
    mcQuestions: direitoAdminMcQuestionsData,
    tfQuestions: direitoAdminTfQuestionsData,
    discursiveQuestions: direitoAdminDiscursiveQuestionsData,
    flashcards: direitoAdminFlashcardsData,
    summaryPoints: direitoAdminSummaryPoints,
  },

  // 11. ESCRITA E LEITURA (OFICINA)
  {
    id: 'escrita_leitura',
    title: 'Oficina de Redação & Leitura — Aula 01: Produção de Texto e Coesão',
    disciplineId: 'lingua-portuguesa',
    disciplineName: 'Língua Portuguesa & Redação',
    badge: 'Oficina 1',
    isPriorityToday: false,
    emoji: '📝',
    duration: '40 min',
    summary: 'Estrutura do texto dissertativo-argumentativo, parágrafos-padrão, conectivos coesivos e redação forense para o TJAM.',
    mcQuestions: escritaLeituraMcQuestionsData,
    tfQuestions: escritaLeituraTfQuestionsData,
    discursiveQuestions: escritaLeituraDiscursiveQuestionsData,
    flashcards: escritaLeituraFlashcardsData,
    summaryPoints: escritaLeituraSummaryPoints,
  },
];
