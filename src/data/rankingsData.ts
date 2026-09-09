import { SimuladoAttempt } from '../types';
import { SIMULADO_80_QUESTOES_GABARITO } from './simulado80QuestoesData';

export interface RankingDuplaItem {
  rank: number | string;
  name: string;
  score: string;
  percentageNum: number;
  isUser: boolean;
  isSolo: boolean;
  isDisqualified?: boolean;
  disqualificationReason?: string;
  description: string;
  bgClass: string;
  badgeClass: string;
  barClass: string;
  barWidth: string;
}

export interface RankingIndividualItem {
  rank: number | string;
  name: string;
  score: string;
  percentageNum: number;
  correctCount: string;
  correctNum: number;
  isUser: boolean;
  isDisqualified?: boolean;
  disqualificationReason?: string;
  badgeClass: string;
  bgClass: string;
  barClass: string;
  barWidth: string;
}

// 1. RANKING DAS DUPLAS:
// Eduardo Mateus & Pedro Henrique são duplas oficiais e estão em 3º lugar, 100% em dia e sem pendências
export const DUPLAS_RANKING: RankingDuplaItem[] = [
  {
    rank: 1,
    name: 'Lucas Silveira & Mariana Costa',
    score: '37,0%',
    percentageNum: 37,
    isUser: false,
    isSolo: false,
    description: 'Dupla • 1ª Colocada Geral',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20',
    barClass: 'bg-amber-500',
    barWidth: '100%',
  },
  {
    rank: 2,
    name: 'Gabriel Souza & Sofia Albuquerque',
    score: '35,4%',
    percentageNum: 35.4,
    isUser: false,
    isSolo: false,
    description: 'Dupla • 2ª Colocada Geral',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-300 text-slate-950 font-black shadow-md',
    barClass: 'bg-slate-300',
    barWidth: '95.7%',
  },
  {
    rank: 3,
    name: 'Eduardo Mateus & Pedro Henrique',
    score: '33,8%',
    percentageNum: 33.8,
    isUser: true,
    isSolo: false,
    description: 'Dupla Oficial (Eduardo & Pedro) • 3º Lugar Geral (100% em dia, sem pendências)',
    bgClass: 'bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-950/50',
    badgeClass: 'bg-amber-700 text-white font-black shadow-md shadow-amber-700/30',
    barClass: 'bg-emerald-400',
    barWidth: '91.4%',
  },
  {
    rank: 4,
    name: 'Letícia Vasconcelos & Guilherme Prado',
    score: '30,5%',
    percentageNum: 30.5,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    barClass: 'bg-slate-500',
    barWidth: '82.4%',
  },
  {
    rank: 5,
    name: 'Arthur Medeiros & Bianca Farias',
    score: '28,2%',
    percentageNum: 28.2,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    barClass: 'bg-slate-500',
    barWidth: '76.2%',
  },
  {
    rank: 6,
    name: 'Renan Guimarães & Camila Sampaio',
    score: '26,4%',
    percentageNum: 26.4,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    barClass: 'bg-slate-500',
    barWidth: '71.4%',
  },
  {
    rank: 7,
    name: 'Vinícius Pacheco & Débora Antunes',
    score: '23,8%',
    percentageNum: 23.8,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    barClass: 'bg-slate-600',
    barWidth: '64.3%',
  },
  {
    rank: 8,
    name: 'Marcelo Fontana & Jéssica Azevedo',
    score: '21,2%',
    percentageNum: 21.2,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    barClass: 'bg-slate-600',
    barWidth: '57.3%',
  },
  {
    rank: 9,
    name: 'Caio Meireles & Natália Barcellos',
    score: '18,6%',
    percentageNum: 18.6,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    barClass: 'bg-slate-600',
    barWidth: '50.3%',
  },
  {
    rank: 10,
    name: 'Daniel Castilho & Priscila Nogueira',
    score: '16,0%',
    percentageNum: 16.0,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    barClass: 'bg-slate-600',
    barWidth: '43.2%',
  },
  {
    rank: 11,
    name: 'Felipe Albuquerque & Vanessa Toledo',
    score: '13,5%',
    percentageNum: 13.5,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    barClass: 'bg-slate-600',
    barWidth: '36.5%',
  },
  {
    rank: 12,
    name: 'Igor Dornelles & Renata Silvestre',
    score: '11,0%',
    percentageNum: 11.0,
    isUser: false,
    isSolo: false,
    description: 'Dupla',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    barClass: 'bg-slate-600',
    barWidth: '29.7%',
  },
  // 2 Duplas Desclassificadas com nota zero
  {
    rank: 'DESC',
    name: 'Diego Barreto & Vanessa Guimarães',
    score: '0,0%',
    percentageNum: 0,
    isUser: false,
    isSolo: false,
    isDisqualified: true,
    disqualificationReason: 'Desclassificada • Violação das regras de integridade e uso de material vedado (Nota Zero)',
    description: 'Dupla Desclassificada • Nota Zero (0,0%)',
    bgClass: 'bg-rose-950/30 border-rose-600/40 ring-1 ring-rose-600/20',
    badgeClass: 'bg-rose-700 text-white font-black',
    barClass: 'bg-rose-600',
    barWidth: '0%',
  },
  {
    rank: 'DESC',
    name: 'Leonardo Pires & Cláudia Ramos',
    score: '0,0%',
    percentageNum: 0,
    isUser: false,
    isSolo: false,
    isDisqualified: true,
    disqualificationReason: 'Desclassificada • Não envio da grade de respostas dentro do prazo estipulado (Nota Zero)',
    description: 'Dupla Desclassificada • Nota Zero (0,0%)',
    bgClass: 'bg-rose-950/30 border-rose-600/40 ring-1 ring-rose-600/20',
    badgeClass: 'bg-rose-700 text-white font-black',
    barClass: 'bg-rose-600',
    barWidth: '0%',
  },
];

// 2. RANKING INDIVIDUAL DO SIMULADO (80 Questões):
// Eduardo está em 2º lugar com 83,8% de aproveitamento (67 acertos)
// No final constam 5 alunos desclassificados com nota zero, incluindo Pedro Henrique com destaque
export const INDIVIDUAL_SIMULADO_RANKING: RankingIndividualItem[] = [
  {
    rank: 1,
    name: 'Mariana Costa',
    score: '87,5%',
    percentageNum: 87.5,
    correctCount: '70/80',
    correctNum: 70,
    isUser: false,
    badgeClass: 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-amber-400',
    barWidth: '100%',
  },
  {
    rank: 2,
    name: 'Eduardo Mateus',
    score: '83,8%',
    percentageNum: 83.8,
    correctCount: '67/80',
    correctNum: 67,
    isUser: true,
    badgeClass: 'bg-slate-200 text-slate-950 font-black shadow-md shadow-slate-300/30',
    bgClass: 'bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-950/50',
    barClass: 'bg-emerald-400',
    barWidth: '96%',
  },
  {
    rank: 3,
    name: 'Gabriel Souza',
    score: '80,0%',
    percentageNum: 80,
    correctCount: '64/80',
    correctNum: 64,
    isUser: false,
    badgeClass: 'bg-amber-700 text-white font-black shadow-md',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-amber-600',
    barWidth: '91%',
  },
  {
    rank: 4,
    name: 'Lucas Silveira',
    score: '77,5%',
    percentageNum: 77.5,
    correctCount: '62/80',
    correctNum: 62,
    isUser: false,
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-500',
    barWidth: '88%',
  },
  {
    rank: 5,
    name: 'Sofia Albuquerque',
    score: '75,0%',
    percentageNum: 75,
    correctCount: '60/80',
    correctNum: 60,
    isUser: false,
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-500',
    barWidth: '85%',
  },
  {
    rank: 6,
    name: 'Matheus Ribeiro',
    score: '72,5%',
    percentageNum: 72.5,
    correctCount: '58/80',
    correctNum: 58,
    isUser: false,
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-500',
    barWidth: '82%',
  },
  {
    rank: 7,
    name: 'Beatriz Lima',
    score: '68,8%',
    percentageNum: 68.8,
    correctCount: '55/80',
    correctNum: 55,
    isUser: false,
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-500',
    barWidth: '78%',
  },
  {
    rank: 8,
    name: 'Thiago Castro',
    score: '65,0%',
    percentageNum: 65,
    correctCount: '52/80',
    correctNum: 52,
    isUser: false,
    badgeClass: 'bg-slate-700 text-slate-300 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-500',
    barWidth: '74%',
  },
  {
    rank: 9,
    name: 'Felipe Nogueira',
    score: '60,0%',
    percentageNum: 60,
    correctCount: '48/80',
    correctNum: 48,
    isUser: false,
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-600',
    barWidth: '68%',
  },
  {
    rank: 10,
    name: 'Rafaela Dias',
    score: '56,2%',
    percentageNum: 56.2,
    correctCount: '45/80',
    correctNum: 45,
    isUser: false,
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-600',
    barWidth: '64%',
  },
  {
    rank: 11,
    name: 'André Vasconcelos',
    score: '52,5%',
    percentageNum: 52.5,
    correctCount: '42/80',
    correctNum: 42,
    isUser: false,
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-600',
    barWidth: '60%',
  },
  {
    rank: 12,
    name: 'Camila Duarte',
    score: '48,8%',
    percentageNum: 48.8,
    correctCount: '39/80',
    correctNum: 39,
    isUser: false,
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-600',
    barWidth: '55%',
  },
  {
    rank: 13,
    name: 'Gustavo Rocha',
    score: '45,0%',
    percentageNum: 45,
    correctCount: '36/80',
    correctNum: 36,
    isUser: false,
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-600',
    barWidth: '51%',
  },
  {
    rank: 14,
    name: 'Juliana Prado',
    score: '41,2%',
    percentageNum: 41.2,
    correctCount: '33/80',
    correctNum: 33,
    isUser: false,
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-600',
    barWidth: '47%',
  },
  {
    rank: 15,
    name: 'Rodrigo Mendes',
    score: '37,5%',
    percentageNum: 37.5,
    correctCount: '30/80',
    correctNum: 30,
    isUser: false,
    badgeClass: 'bg-slate-800 text-slate-400 font-bold',
    bgClass: 'bg-slate-900/60 border-slate-800/80',
    barClass: 'bg-slate-600',
    barWidth: '42%',
  },
  // 5 Alunos Desclassificados com nota zero no final do ranking (incluindo Pedro Henrique)
  {
    rank: 'DESC',
    name: 'Pedro Henrique',
    score: '0,0%',
    percentageNum: 0,
    correctCount: '0/80',
    correctNum: 0,
    isUser: false,
    isDisqualified: true,
    disqualificationReason: 'Desclassificado • Infração Grave das Regras de Monitoramento / Falta de Entrega (Nota Zero)',
    badgeClass: 'bg-rose-600 text-white font-black shadow-md shadow-rose-600/30',
    bgClass: 'bg-rose-950/40 border-rose-600/50 ring-1 ring-rose-500/30',
    barClass: 'bg-rose-500',
    barWidth: '0%',
  },
  {
    rank: 'DESC',
    name: 'Bruno Carvalho',
    score: '0,0%',
    percentageNum: 0,
    correctCount: '0/80',
    correctNum: 0,
    isUser: false,
    isDisqualified: true,
    disqualificationReason: 'Desclassificado • Consulta a Material Externo Proibido durante a Prova (Nota Zero)',
    badgeClass: 'bg-rose-700 text-white font-black',
    bgClass: 'bg-rose-950/30 border-rose-700/40 ring-1 ring-rose-700/20',
    barClass: 'bg-rose-500',
    barWidth: '0%',
  },
  {
    rank: 'DESC',
    name: 'Vinícius Toledo',
    score: '0,0%',
    percentageNum: 0,
    correctCount: '0/80',
    correctNum: 0,
    isUser: false,
    isDisqualified: true,
    disqualificationReason: 'Desclassificado • Tentativa de Injeção de Prompt / Uso de Inteligência Artificial (Nota Zero)',
    badgeClass: 'bg-rose-700 text-white font-black',
    bgClass: 'bg-rose-950/30 border-rose-700/40 ring-1 ring-rose-700/20',
    barClass: 'bg-rose-500',
    barWidth: '0%',
  },
  {
    rank: 'DESC',
    name: 'Jéssica Andrade',
    score: '0,0%',
    percentageNum: 0,
    correctCount: '0/80',
    correctNum: 0,
    isUser: false,
    isDisqualified: true,
    disqualificationReason: 'Desclassificada • Não Conclusão do Procedimento de Identificação e Monitoramento (Nota Zero)',
    badgeClass: 'bg-rose-700 text-white font-black',
    bgClass: 'bg-rose-950/30 border-rose-700/40 ring-1 ring-rose-700/20',
    barClass: 'bg-rose-500',
    barWidth: '0%',
  },
  {
    rank: 'DESC',
    name: 'Marcelo Fagundes',
    score: '0,0%',
    percentageNum: 0,
    correctCount: '0/80',
    correctNum: 0,
    isUser: false,
    isDisqualified: true,
    disqualificationReason: 'Desclassificado • Folha de Respostas em Branco / Ausência Injustificada (Nota Zero)',
    badgeClass: 'bg-rose-700 text-white font-black',
    bgClass: 'bg-rose-950/30 border-rose-700/40 ring-1 ring-rose-700/20',
    barClass: 'bg-rose-500',
    barWidth: '0%',
  },
];

// Gera as 80 respostas de Eduardo Mateus:
// 67 acertos e 13 erros distribuídos de forma pedagógica = 67 / 80 = 83.75% -> 83,8% de aproveitamento
export const generateEduardoOfficialAnswers = (): Record<string, string> => {
  // 13 questões com alternativas incorretas para totalizar exatamente 67 acertos de 80
  const wrongQuestions = [5, 10, 18, 25, 30, 35, 40, 48, 55, 60, 65, 70, 75];

  const answers: Record<string, string> = {};

  for (let i = 1; i <= 80; i++) {
    const qId = `sim80-q${i < 10 ? '0' + i : i}`;
    const correctOption = SIMULADO_80_QUESTOES_GABARITO[i] || 'A';

    if (wrongQuestions.includes(i)) {
      // Alternativa propositalmente errada para computar erro
      answers[qId] = correctOption === 'A' ? 'B' : (correctOption === 'B' ? 'C' : 'A');
    } else {
      // Alternativa correta
      answers[qId] = correctOption;
    }
  }

  return answers;
};

export const EDUARDO_OFFICIAL_ANSWERS = generateEduardoOfficialAnswers();

// Tentativa oficial de Eduardo Mateus no Simulado Geral TJAM
export const EDUARDO_OFFICIAL_ATTEMPT: SimuladoAttempt = {
  id: 'attempt-eduardo-tjam-80q-official',
  simuladoId: 'simulado-geral-tjam-80q-2026',
  simuladoTitle: 'Simulado Geral Oficial TJAM 2026 (80 Questões Objetivas)',
  startedAt: new Date(Date.now() - 3.2 * 3600 * 1000).toISOString(),
  finishedAt: new Date().toISOString(),
  score: 67,
  maxScore: 80,
  percentage: 83.8,
  userAnswers: EDUARDO_OFFICIAL_ANSWERS,
  timeSpentSeconds: 11520, // 3h 12m
  participantName: 'Eduardo Mateus',
  partnerName: 'Pedro Henrique (Dupla Oficial)',
  deviceUsed: 'Notebook',
};
