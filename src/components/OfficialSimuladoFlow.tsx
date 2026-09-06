import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  User,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Play,
  Printer,
  Camera,
  Check,
  X,
  FileText,
  Lock,
  Eye,
  Radio,
  BarChart2,
  Award,
  BookOpen,
  Scale,
  Landmark,
  Compass,
  Monitor,
  BookMarked,
  Shield,
  HelpCircle,
  RefreshCw,
  Flag,
  Download,
  CheckSquare,
  Smartphone,
  Tablet,
  Laptop,
  VolumeX,
  Send,
  ShieldCheck,
  Info
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Simulado, SimuladoAttempt, Question } from '../types';
import { SIMULADO_80_OBJETO, SIMULADO_80_QUESTIONS, SIMULADO_80_QUESTOES_GABARITO } from '../data/simulado80QuestoesData';

interface OfficialSimuladoFlowProps {
  simulado?: Simulado;
  onSaveAttempt?: (attempt: SimuladoAttempt) => void;
  onExit?: () => void;
  initialParticipantName?: string;
  initialPartnerName?: string;
}

// Dispositivos permitidos
export type AllowedDevice = 'Celular' | 'Tablet' | 'Notebook';

// Steps:
// 'identification' = Etapa 1: Identificação do Aluno & Seleção e Salvamento do Dispositivo (Celular, Tablet, Notebook)
// 'welcome'        = Boas-vindas simples antes das etapas e do simulado
// 'identification' = Etapa 1: Identificação do Aluno & Seleção e Salvamento do Dispositivo (Celular, Tablet, Notebook)
// 'instructions'   = Etapa 2: Instruções Oficiais & Regras Rigorosas (Sem distrações, avisar família, outros desligados, sem anotações, etc.)
// 'exam'           = Etapa 3: Realização da Prova Oficial (80 questões com obrigatoriedade de 100% de preenchimento)
// 'confirm'        = Etapa 4: Página de Confirmação com botão de pressão para encerrar em definitivo
// 'closed'         = Etapa 5: Página de Encerramento com bloqueio permanente, orientação para envio ao professor e download do PDF profissional
type SimuladoFlowStep = 'welcome' | 'identification' | 'instructions' | 'exam' | 'confirm' | 'closed';

export const OfficialSimuladoFlow: React.FC<OfficialSimuladoFlowProps> = ({
  simulado = SIMULADO_80_OBJETO,
  onSaveAttempt,
  onExit,
  initialParticipantName = '',
  initialPartnerName = '',
}) => {
  // Check if exam was already completed and locked
  const [finishedAttempt, setFinishedAttempt] = useState<SimuladoAttempt | null>(() => {
    try {
      const saved = localStorage.getItem('tjam_simulado_80q_final_attempt');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erro ao ler tentativa salva:', e);
    }
    return null;
  });

  // Current Step
  const [currentStep, setCurrentStep] = useState<SimuladoFlowStep>(() => {
    const isLocked = localStorage.getItem('tjam_simulado_80q_is_locked') === 'true';
    const saved = localStorage.getItem('tjam_simulado_80q_final_attempt');
    if (isLocked && saved) {
      return 'closed';
    }
    return 'welcome';
  });

  // Candidate Identification State
  const [participantName, setParticipantName] = useState<string>(() => {
    return initialParticipantName || localStorage.getItem('tjam_simulado_participant_name') || 'Eduardo Mateus';
  });
  const [partnerName, setPartnerName] = useState<string>(() => {
    return initialPartnerName || localStorage.getItem('tjam_simulado_partner_name') || '';
  });
  const [nameError, setNameError] = useState<string>('');

  // Device Selection State (Celular, Tablet, Notebook - outros proibidos)
  const [selectedDevice, setSelectedDevice] = useState<AllowedDevice>(() => {
    const saved = localStorage.getItem('tjam_simulado_device_used') as AllowedDevice;
    if (saved === 'Celular' || saved === 'Tablet' || saved === 'Notebook') {
      return saved;
    }
    return 'Notebook';
  });

  // Instructions agreement checkbox
  const [agreedToRules, setAgreedToRules] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  // Exam Answers & Navigation State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>(() => {
    try {
      const savedAttempt = localStorage.getItem('tjam_simulado_80q_final_attempt');
      if (savedAttempt) {
        const parsed = JSON.parse(savedAttempt);
        if (parsed?.userAnswers) return parsed.userAnswers;
      }
      const savedAnswers = localStorage.getItem('tjam_simulado_80q_live_answers');
      if (savedAnswers) {
        return JSON.parse(savedAnswers);
      }
    } catch (e) {
      // ignore
    }
    return {};
  });

  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(simulado.durationMinutes * 60);

  // Filter for Questions Map
  const [filterDiscipline, setFilterDiscipline] = useState<string>('all');

  // Confirmation Page (Step 4) Press & Hold State
  const [isPressingConfirm, setIsPressingConfirm] = useState<boolean>(false);
  const [confirmProgress, setConfirmProgress] = useState<number>(0);
  const pressTimerRef = useRef<number | null>(null);
  const pressStartTimeRef = useRef<number>(0);
  const REQUIRED_PRESS_MS = 1500;

  // Results State (Step 5)
  const [resultFilter, setResultFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  // Save participant name and device whenever changed
  useEffect(() => {
    if (participantName.trim()) {
      localStorage.setItem('tjam_simulado_participant_name', participantName.trim());
    }
  }, [participantName]);

  useEffect(() => {
    localStorage.setItem('tjam_simulado_partner_name', partnerName.trim());
  }, [partnerName]);

  useEffect(() => {
    localStorage.setItem('tjam_simulado_device_used', selectedDevice);
  }, [selectedDevice]);

  // Persist live answers to avoid loss
  useEffect(() => {
    if (currentStep === 'exam' && Object.keys(userAnswers).length > 0) {
      localStorage.setItem('tjam_simulado_80q_live_answers', JSON.stringify(userAnswers));
    }
  }, [userAnswers, currentStep]);

  // Discipline metadata helper
  const disciplinesConfig: Record<string, { name: string; color: string; bg: string; border: string; icon: any }> = {
    'processo-civil': { name: 'Processo Civil', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: Scale },
    'processo-penal': { name: 'Processo Penal', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: Shield },
    'legislacao-tjam': { name: 'Legislação TJAM', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30', icon: Landmark },
    'geografia-amazonas': { name: 'Geografia do Amazonas', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: Compass },
    'direito-constitucional': { name: 'Direito Constitucional', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', icon: Award },
    'informatica': { name: 'Informática', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: Monitor },
    'lingua-portuguesa': { name: 'Língua Portuguesa', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', icon: BookMarked },
    'direito-administrativo': { name: 'Direito Administrativo', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30', icon: FileText },
  };

  // Timer countdown during exam
  useEffect(() => {
    if (currentStep !== 'exam' || timeRemainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleProceedToConfirmPage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, timeRemainingSeconds]);

  // Format seconds to H:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? `${h}h ` : ''}${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const totalQuestions = simulado.questions.length;
  const totalAnswered = Object.keys(userAnswers).length;
  const allQuestionsAnswered = totalAnswered === totalQuestions && totalQuestions > 0;
  const unansweredCount = totalQuestions - totalAnswered;

  // Option selection
  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Toggle review flag
  const handleToggleReview = (questionId: string) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Current question data
  const currentQuestion: Question = simulado.questions[currentQuestionIndex] || simulado.questions[0];
  const currentDiscipline = disciplinesConfig[currentQuestion?.disciplineId] || {
    name: currentQuestion?.disciplineId || 'Disciplina',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    icon: FileText,
  };
  const DiscIcon = currentDiscipline.icon;

  // Validation to move from Step 1 to Step 2
  const handleProceedToInstructions = () => {
    if (!participantName.trim()) {
      setNameError('Por favor, informe seu nome completo para prosseguir.');
      return;
    }
    setNameError('');
    setCurrentStep('instructions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start exam from Step 2 to Step 3
  const handleStartExam = () => {
    if (!agreedToRules) {
      alert('Você deve ler e marcar a declaração de ciência de todas as regras antes de iniciar o simulado.');
      return;
    }
    setCurrentStep('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Advance to confirmation page (Step 4)
  const handleProceedToConfirmPage = () => {
    if (!allQuestionsAnswered) {
      alert(`Atenção: É obrigatório responder todas as ${totalQuestions} questões antes de encerrar. Restam ${unansweredCount} pendente(s).`);
      return;
    }
    setCurrentStep('confirm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Press & Hold to Confirm (Step 4)
  const startPressConfirm = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsPressingConfirm(true);
    pressStartTimeRef.current = Date.now();

    if (pressTimerRef.current) {
      clearInterval(pressTimerRef.current);
    }

    pressTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - pressStartTimeRef.current;
      const progress = Math.min(100, (elapsed / REQUIRED_PRESS_MS) * 100);
      setConfirmProgress(progress);

      if (progress >= 100) {
        if (pressTimerRef.current) {
          clearInterval(pressTimerRef.current);
          pressTimerRef.current = null;
        }
        setIsPressingConfirm(false);
        setConfirmProgress(100);
        executeFinalEncerramento();
      }
    }, 30);
  };

  const stopPressConfirm = () => {
    if (isPressingConfirm) {
      if (pressTimerRef.current) {
        clearInterval(pressTimerRef.current);
        pressTimerRef.current = null;
      }
      setIsPressingConfirm(false);
      setConfirmProgress(0);
    }
  };

  // Direct Click alternative for confirmation
  const handleDirectConfirm = () => {
    executeFinalEncerramento();
  };

  // Compute final score and transition to Step 5 ('closed')
  // STRICT RULE: Once closed, it is locked permanently.
  const executeFinalEncerramento = () => {
    let score = 0;
    simulado.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });

    const maxScore = simulado.questions.length;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 1000) / 10 : 0;
    const timeSpent = simulado.durationMinutes * 60 - timeRemainingSeconds;

    const attempt: SimuladoAttempt = {
      id: `attempt-80q-${Date.now()}`,
      simuladoId: simulado.id,
      simuladoTitle: simulado.title,
      startedAt: new Date(Date.now() - timeSpent * 1000).toISOString(),
      finishedAt: new Date().toISOString(),
      score,
      maxScore,
      percentage,
      userAnswers,
      timeSpentSeconds: timeSpent,
      participantName: participantName.trim() || 'Participante',
      partnerName: partnerName.trim() || undefined,
      deviceUsed: selectedDevice,
    };

    // Save permanently in state & localStorage
    setFinishedAttempt(attempt);
    localStorage.setItem('tjam_simulado_80q_final_attempt', JSON.stringify(attempt));
    localStorage.setItem('tjam_simulado_80q_is_locked', 'true');

    setCurrentStep('closed');
    if (onSaveAttempt) {
      onSaveAttempt(attempt);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // High-Quality Professional PDF Generator (A4, multipage, formatted tables, verification stamp)
  const buildGabaritoPdfDoc = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const candName = participantName.trim() || 'Eduardo Mateus';
    const pName = partnerName.trim() || 'Participação Individual';
    const devUsed = selectedDevice || 'Notebook';

    // Use finished attempt answers or current answers or realistic sample answers if testing
    const effectiveAnswers: Record<string, string> =
      finishedAttempt?.userAnswers ||
      (Object.keys(userAnswers).length > 0
        ? userAnswers
        : simulado.questions.reduce((acc, q, idx) => {
            acc[q.id] = idx % 5 === 0 ? 'A' : (idx % 3 === 0 ? 'B' : q.correctOptionId);
            return acc;
          }, {} as Record<string, string>));

    let calcScore = 0;
    simulado.questions.forEach((q) => {
      if (effectiveAnswers[q.id] === q.correctOptionId) {
        calcScore += 1;
      }
    });

    const score = finishedAttempt ? finishedAttempt.score : calcScore;
    const maxScore = finishedAttempt ? finishedAttempt.maxScore : simulado.questions.length;
    const perc = maxScore > 0 ? Math.round((score / maxScore) * 1000) / 10 : 0;
    const errors = maxScore - score;
    const dateStr = new Date().toLocaleString('pt-BR');
    const timeUsedFormatted = formatTime(
      finishedAttempt ? finishedAttempt.timeSpentSeconds : simulado.durationMinutes * 60 - timeRemainingSeconds
    );
    const authHash = `TJAM-SIM80-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // ==========================================
    // PÁGINA 1: FOLHA DE ROSTO INSTITUCIONAL TJAM
    // ==========================================

    // Top Institutional Navy Header Box
    doc.setFillColor(15, 23, 42); // Navy slate-900
    doc.rect(0, 0, 210, 32, 'F');

    // Gold Accent Strip
    doc.setFillColor(217, 119, 6); // Amber-600 gold
    doc.rect(0, 32, 210, 2, 'F');

    // Top Header Typography
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text('PODER JUDICIÁRIO — TRIBUNAL DE JUSTIÇA DO ESTADO DO AMAZONAS', 14, 12);

    doc.setFontSize(9.5);
    doc.setTextColor(56, 189, 248); // Sky-400
    doc.text('SIMULADO GERAL OFICIAL TJAM 2026 — RELATÓRIO DE DESEMPENHO E GABARITO AUDITADO', 14, 19);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225); // Slate-300
    doc.text('Comissão de Capacitação & Preparação para Concurso Público • Auditoria Oficial de Prova', 14, 26);

    // Card 1: Ficha de Identificação e Homologação do Aluno & Dispositivo
    let y = 41;
    doc.setFillColor(248, 250, 252); // Slate-50
    doc.roundedRect(14, y, 182, 34, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, y, 182, 34, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('FICHA DE IDENTIFICAÇÃO DO PARTICIPANTE & REGISTRO DE CONFORMIDADE', 18, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(`Aluno(a): `, 18, y + 13);
    doc.setFont('helvetica', 'bold');
    doc.text(candName, 32, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.text(`Dupla: `, 18, y + 19);
    doc.setFont('helvetica', 'bold');
    doc.text(pName, 29, y + 19);

    doc.setFont('helvetica', 'normal');
    doc.text(`Dispositivo Homologado: `, 18, y + 25);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(14, 116, 144); // Cyan-700
    doc.text(`${devUsed} (Uso Exclusivo Registrado)`, 52, y + 25);

    // Right Column of Card 1
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(`Data de Entrega: `, 115, y + 13);
    doc.setFont('helvetica', 'bold');
    doc.text(dateStr, 140, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.text(`Tempo Utilizado: `, 115, y + 19);
    doc.setFont('helvetica', 'bold');
    doc.text(timeUsedFormatted, 141, y + 19);

    doc.setFont('helvetica', 'normal');
    doc.text(`Autenticidade: `, 115, y + 25);
    doc.setFont('courier', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(authHash, 137, y + 25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(21, 128, 61); // Emerald-700
    doc.text('• MONITORAMENTO TEMPORÁRIO CONCLUÍDO COM SUCESSO', 18, y + 30.5);

    // Card 2: Painel de Resultados (Scorecard Oficial)
    y = 80;
    doc.setFillColor(241, 245, 249); // Slate-100
    doc.roundedRect(14, y, 182, 38, 2, 2, 'F');
    doc.setDrawColor(148, 163, 184);
    doc.roundedRect(14, y, 182, 38, 2, 2, 'S');

    // Score Stat 1: Pontuação Final
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(18, y + 4, 52, 30, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(18, y + 4, 52, 30, 2, 2, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('PONTUAÇÃO FINAL', 22, y + 10);
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text(`${score}`, 22, y + 20);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`/ ${maxScore} pts`, 35, y + 20);
    doc.setFontSize(8.5);
    doc.setTextColor(2, 132, 199);
    doc.text(`Aproveitamento: ${perc}%`, 22, y + 28);

    // Score Stat 2: Acertos e Erros
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(74, y + 4, 58, 30, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(74, y + 4, 58, 30, 2, 2, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('DISCRIMINAÇÃO DE ITENS', 78, y + 10);
    doc.setFontSize(10);
    doc.setTextColor(21, 128, 61); // Emerald
    doc.text(`[+] Acertos: ${score} questões`, 78, y + 18);
    doc.setTextColor(185, 28, 28); // Rose
    doc.text(`[-] Erros: ${errors} questões`, 78, y + 26);

    // Score Stat 3: Parecer Geral
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(136, y + 4, 56, 30, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(136, y + 4, 56, 30, 2, 2, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('SITUAÇÃO PEDAGÓGICA', 140, y + 10);
    doc.setFontSize(10);
    if (score >= 48) {
      doc.setTextColor(21, 128, 61);
      doc.text('CLASSIFICADO', 140, y + 18);
    } else {
      doc.setTextColor(194, 65, 12);
      doc.text('EM EVOLUÇÃO', 140, y + 18);
    }
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Dispositivo: ' + devUsed, 140, y + 26);

    // Card 3: Tabela de Aproveitamento por Disciplina
    y = 124;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('DESEMPENHO DETALHADO POR DISCIPLINA (80 QUESTÕES)', 14, y);

    y += 4;
    // Header da mini-tabela
    doc.setFillColor(15, 23, 42);
    doc.rect(14, y, 182, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('Disciplina', 18, y + 4.2);
    doc.text('Total', 105, y + 4.2);
    doc.text('Acertos', 125, y + 4.2);
    doc.text('Erros', 148, y + 4.2);
    doc.text('Aproveitamento (%)', 168, y + 4.2);

    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);

    // Calculate stats per discipline
    const statsObj: Record<string, { name: string; total: number; correct: number }> = {};
    simulado.questions.forEach((q) => {
      const dId = q.disciplineId || 'outros';
      const dName = disciplinesConfig[dId]?.name || dId;
      if (!statsObj[dId]) {
        statsObj[dId] = { name: dName, total: 0, correct: 0 };
      }
      statsObj[dId].total += 1;
      if (effectiveAnswers[q.id] === q.correctOptionId) {
        statsObj[dId].correct += 1;
      }
    });

    Object.values(statsObj).forEach((st, idx) => {
      const errs = st.total - st.correct;
      const p = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;

      if (idx % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, y, 182, 5.5, 'F');
      }

      doc.setTextColor(30, 41, 59);
      doc.text(st.name, 18, y + 4);
      doc.text(`${st.total}`, 108, y + 4);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(21, 128, 61);
      doc.text(`${st.correct}`, 128, y + 4);

      doc.setTextColor(185, 28, 28);
      doc.text(`${errs}`, 151, y + 4);

      doc.setTextColor(2, 132, 199);
      doc.text(`${p}%`, 175, y + 4);

      doc.setFont('helvetica', 'normal');
      y += 5.5;
    });

    // Card 4: Termo de Autenticidade e Campos de Assinatura
    y += 8;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, 182, 54, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, y, 182, 54, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('DECLARAÇÃO DE AUTENTICIDADE E VALIDAÇÃO DOCENTE', 18, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    const declaracaoTxt =
      'Declaro para os devidos fins pedagógicos que a presente avaliação foi realizada integralmente em conformidade com o edital do simulado TJAM 2026, com total ausência de distrações, comunicação prévia aos familiares, todos os demais aparelhos eletrônicos desligados e sem o uso de cadernos ou anotações no ambiente, utilizando estritamente o dispositivo registrado.';
    const splitDec = doc.splitTextToSize(declaracaoTxt, 174);
    doc.text(splitDec, 18, y + 12);

    // Signature Lines
    const sigY = y + 36;
    doc.setDrawColor(100, 116, 139);
    doc.line(22, sigY, 90, sigY);
    doc.line(110, sigY, 178, sigY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Assinatura do Aluno(a)', 38, sigY + 5);
    doc.text('Visto do Professor Responsável', 123, sigY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(candName, 42, sigY + 9);
    doc.text('Validação Pedagógica TJAM', 128, sigY + 9);

    // Footer Page 1
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('Documento Oficial • Prova de 80 Questões TJAM 2026 • Envio obrigatório ao professor', 14, 290);
    doc.text('Página 1 de 4', 182, 290);

    // =========================================================================
    // PÁGINAS 2 A 4: TABELA COMPLETA DAS 80 QUESTÕES (AUDITADA COM COMENTÁRIOS)
    // =========================================================================
    const drawTableHeader = (pageNumber: number) => {
      // Top compact banner
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 16, 'F');
      doc.setFillColor(217, 119, 6);
      doc.rect(0, 16, 210, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(`TJAM 2026 • GABARITO OFICIAL AUDITADO • PARTICIPANTE: ${candName.toUpperCase()} • DISPOSITIVO: ${devUsed.toUpperCase()}`, 14, 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(56, 189, 248);
      doc.text(`Desempenho: ${score}/${maxScore} (${perc}%) • Emitido em: ${dateStr}`, 14, 13);

      // Table column headers
      let tableHeaderY = 22;
      doc.setFillColor(241, 245, 249);
      doc.rect(14, tableHeaderY, 182, 6.5, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.rect(14, tableHeaderY, 182, 6.5, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);
      doc.text('Q#', 16, tableHeaderY + 4.5);
      doc.text('Disciplina', 25, tableHeaderY + 4.5);
      doc.text('Sua Opção', 68, tableHeaderY + 4.5);
      doc.text('Gabarito', 88, tableHeaderY + 4.5);
      doc.text('Resultado', 108, tableHeaderY + 4.5);
      doc.text('Fundamentação Resumida / Comentário da Banca', 132, tableHeaderY + 4.5);

      return tableHeaderY + 6.5;
    };

    // Add Page 2
    doc.addPage();
    let currentTableY = drawTableHeader(2);

    simulado.questions.forEach((q, idx) => {
      // Page break if near bottom
      if (currentTableY > 275) {
        // Footer for current page
        const pageNum = doc.getNumberOfPages();
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text('Documento Oficial • Prova de 80 Questões TJAM 2026 • Envio obrigatório ao professor', 14, 290);
        doc.text(`Página ${pageNum} de 4`, 182, 290);

        doc.addPage();
        currentTableY = drawTableHeader(pageNum + 1);
      }

      const userOpt = effectiveAnswers[q.id] || '-';
      const isCorrect = userOpt === q.correctOptionId;
      const discName = disciplinesConfig[q.disciplineId]?.name || q.disciplineId;

      // Alternate background
      if (idx % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, currentTableY, 182, 7.8, 'F');
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${idx + 1}`, 16, currentTableY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(51, 65, 85);
      doc.text(discName.substring(0, 22), 25, currentTableY + 5);

      // Student's answer
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(isCorrect ? 21 : 185, isCorrect ? 128 : 28, isCorrect ? 61 : 28);
      doc.text(userOpt, 74, currentTableY + 5);

      // Official answer
      doc.setTextColor(15, 23, 42);
      doc.text(q.correctOptionId, 94, currentTableY + 5);

      // Result Badge
      if (isCorrect) {
        doc.setFillColor(220, 252, 231); // green-100
        doc.roundedRect(107, currentTableY + 1.2, 20, 5.2, 1, 1, 'F');
        doc.setTextColor(21, 128, 61);
        doc.setFontSize(6.5);
        doc.text('ACERTO (+1)', 109, currentTableY + 4.8);
      } else {
        doc.setFillColor(254, 226, 226); // rose-100
        doc.roundedRect(107, currentTableY + 1.2, 19, 5.2, 1, 1, 'F');
        doc.setTextColor(185, 28, 28);
        doc.setFontSize(6.5);
        doc.text('ERRO (0)', 110.5, currentTableY + 4.8);
      }

      // Explanation text (split and truncated if needed)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(71, 85, 105);
      const explanationShort = (q.explanation || 'Gabarito oficial fundamentado pelo edital TJAM.').replace(/\n/g, ' ');
      const splitExp = doc.splitTextToSize(explanationShort, 62);
      doc.text(splitExp[0] ? splitExp[0].substring(0, 48) + '...' : 'Fundamentação oficial.', 132, currentTableY + 5);

      currentTableY += 7.8;
    });

    // Footer for final page
    const finalPageNum = doc.getNumberOfPages();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('Documento Oficial • Prova de 80 Questões TJAM 2026 • Envio obrigatório ao professor', 14, 290);
    doc.text(`Página ${finalPageNum} de ${finalPageNum}`, 182, 290);

    // Save PDF with clear name
    const cleanFileName = `Gabarito_Simulado_TJAM_80Q_${candName.replace(/\s+/g, '_')}.pdf`;
    doc.save(cleanFileName);
  };

  // Trigger file download
  const handleDownloadGabaritoPDF = () => {
    setIsGeneratingPDF(true);
    try {
      buildGabaritoPdfDoc();
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Houve um problema ao gerar o PDF. A página de impressão do navegador será aberta.');
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Discipline breakdown stats
  const disciplineStats = useMemo(() => {
    const stats: Record<string, { name: string; total: number; correct: number }> = {};
    simulado.questions.forEach((q) => {
      const dId = q.disciplineId || 'outros';
      const dName = disciplinesConfig[dId]?.name || dId;
      if (!stats[dId]) {
        stats[dId] = { name: dName, total: 0, correct: 0 };
      }
      stats[dId].total += 1;
      if (userAnswers[q.id] === q.correctOptionId) {
        stats[dId].correct += 1;
      }
    });
    return stats;
  }, [userAnswers, simulado.questions]);

  // Overall progress percentage
  const progressPercent = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30">
      {/* Top Pedagogical Announcement Bar */}
      <div className="w-full bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-slate-300 text-[11px] sm:text-xs">
              Simulado Oficial TJAM 2026 • 80 Questões • Monitoramento Temporário Ativo
            </span>
          </div>
          <div className="flex items-center gap-3">
            {currentStep !== 'welcome' && (
              <span className="text-[11px] font-mono text-sky-400 font-bold hidden sm:inline">
                Dispositivo: {selectedDevice}
              </span>
            )}
            {currentStep === 'exam' && (
              <button
                type="button"
                onClick={() => setShowRulesModal(true)}
                className="text-[11px] text-amber-300 hover:text-white flex items-center gap-1 font-bold underline cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Ver Regras</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col">

        {/* =================================================================== */}
        {/* ETAPA 0: PÁGINA DE BOAS-VINDAS SIMPLES                             */}
        {/* =================================================================== */}
        {currentStep === 'welcome' && (
          <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in duration-300 py-4 sm:py-8">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8">
              {/* Header / Apresentação */}
              <div className="text-center space-y-3 border-b border-slate-800/80 pb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-black tracking-wide">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Tribunal de Justiça do Amazonas • Simulado 2026</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Bem-vindo(a) ao Simulado Oficial
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Avaliação preparatória com <strong>80 questões</strong> estruturadas no padrão oficial da banca para mensurar sua prontidão, tempo de resposta e fixação dos conteúdos do TJAM.
                </p>
              </div>

              {/* Destaques Rápidos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-wider">
                    80 Questões
                  </h2>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Processo Civil, Penal, Constitucional, Administrativo, Legislação, Português e RLM.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-wider">
                    Foco & Ritmo Real
                  </h2>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Cronômetro regulamentar e registro de dispositivo para simulação autêntica de prova.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-wider">
                    Laudo e Gabarito
                  </h2>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Auditoria completa com aproveitamento por disciplina e PDF oficial para envio ao professor.
                  </p>
                </div>
              </div>

              {/* Fluxo de Etapas Simplificado */}
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 space-y-2.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Como funciona a avaliação (3 etapas simples):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                    <span className="text-slate-300 text-[11px] font-semibold">Identificação e Aparelho</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                    <span className="text-slate-300 text-[11px] font-semibold">Instruções e Regras</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                    <span className="text-slate-300 text-[11px] font-semibold">Prova Oficial (80Q)</span>
                  </div>
                </div>
              </div>

              {/* Ações / Iniciar */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep('identification')}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-sky-600/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Iniciar Etapas do Simulado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onExit && (
                  <button
                    type="button"
                    onClick={onExit}
                    className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Voltar ao painel principal</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* ETAPA 1: IDENTIFICAÇÃO DO PARTICIPANTE & SELEÇÃO DO DISPOSITIVO     */}
        {/* =================================================================== */}
        {currentStep === 'identification' && (
          <div className="max-w-2xl mx-auto w-full space-y-6 animate-in fade-in duration-300 py-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
              <div className="text-center space-y-2 border-b border-slate-800 pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-black">
                  <User className="w-3.5 h-3.5" />
                  <span>Etapa 1 de 3: Identificação & Dispositivo</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Identificação do Participante
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Preencha seus dados e marque o dispositivo homologado que você utilizará para responder à prova.
                </p>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                {/* Nome Completo */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                    Nome Completo do Aluno <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={participantName}
                      onChange={(e) => {
                        setParticipantName(e.target.value);
                        if (nameError) setNameError('');
                      }}
                      placeholder="Ex: Eduardo Mateus dos Santos"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                  {nameError && (
                    <span className="text-xs text-rose-400 font-bold block mt-1">{nameError}</span>
                  )}
                </div>

                {/* Nome da Dupla */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      Nome da Dupla
                    </label>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      Não obrigatório (Opcional)
                    </span>
                  </div>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="Nome do parceiro(a) ou deixe em branco se individual..."
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                {/* DISPOSITIVO: Marcar e Salvar qual dispositivo está usando */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-200">
                      Marcar Dispositivo em Uso <span className="text-rose-400">*</span>
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Selecione o aparelho que você utilizará com exclusividade durante as 80 questões:
                    </p>
                  </div>

                  {/* 3 Allowed Device Options: Celular, Tablet, Notebook */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Celular */}
                    <button
                      type="button"
                      onClick={() => setSelectedDevice('Celular')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        selectedDevice === 'Celular'
                          ? 'bg-sky-600/25 border-sky-400 text-white ring-2 ring-sky-500/40 shadow-lg shadow-sky-500/10'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Smartphone className={`w-5 h-5 ${selectedDevice === 'Celular' ? 'text-sky-400' : 'text-slate-500'}`} />
                        {selectedDevice === 'Celular' && (
                          <CheckCircle2 className="w-4 h-4 text-sky-400" />
                        )}
                      </div>
                      <div>
                        <strong className="text-sm font-black text-white block">Celular</strong>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Smartphone móvel
                        </span>
                      </div>
                    </button>

                    {/* Tablet */}
                    <button
                      type="button"
                      onClick={() => setSelectedDevice('Tablet')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        selectedDevice === 'Tablet'
                          ? 'bg-sky-600/25 border-sky-400 text-white ring-2 ring-sky-500/40 shadow-lg shadow-sky-500/10'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Tablet className={`w-5 h-5 ${selectedDevice === 'Tablet' ? 'text-sky-400' : 'text-slate-500'}`} />
                        {selectedDevice === 'Tablet' && (
                          <CheckCircle2 className="w-4 h-4 text-sky-400" />
                        )}
                      </div>
                      <div>
                        <strong className="text-sm font-black text-white block">Tablet</strong>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Tablet sensível ao toque
                        </span>
                      </div>
                    </button>

                    {/* Notebook */}
                    <button
                      type="button"
                      onClick={() => setSelectedDevice('Notebook')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        selectedDevice === 'Notebook'
                          ? 'bg-sky-600/25 border-sky-400 text-white ring-2 ring-sky-500/40 shadow-lg shadow-sky-500/10'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Laptop className={`w-5 h-5 ${selectedDevice === 'Notebook' ? 'text-sky-400' : 'text-slate-500'}`} />
                        {selectedDevice === 'Notebook' && (
                          <CheckCircle2 className="w-4 h-4 text-sky-400" />
                        )}
                      </div>
                      <div>
                        <strong className="text-sm font-black text-white block">Notebook</strong>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Computador portátil
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Restrição Expressa: Outros dispositivos não são permitidos */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>REGRA OBRIGATÓRIA:</strong> Outros dispositivos que não sejam <strong>Celular</strong>, <strong>Tablet</strong> ou <strong>Notebook</strong> NÃO serão permitidos. Desktops públicos de lan house, relógios inteligentes, smart TVs ou consoles são expressamente proibidos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão Avançar para Etapa 2 */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={handleProceedToInstructions}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-sky-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Avançar para Etapa 2: Instruções e Regras</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep('welcome')}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para tela de boas-vindas</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* ETAPA 2: ONDE APARECE AS INSTRUÇÕES & REGRAS OFICIAIS              */}
        {/* =================================================================== */}
        {currentStep === 'instructions' && (
          <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in duration-300 py-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-800 pb-5 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-black">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Segunda Etapa: Instruções Obrigatórias & Regras</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Regras e Proibições do Simulado TJAM 2026
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Candidato: <strong className="text-white font-bold">{participantName}</strong> • Dispositivo Registrado: <strong className="text-sky-400 font-bold">{selectedDevice}</strong>
                </p>
              </div>

              {/* LISTA DE INSTRUÇÕES E REGRAS EXIGIDAS */}
              <div className="space-y-4 text-xs">
                
                {/* 1. SEM DISTRAÇÕES & COMUNICAR A FAMÍLIA */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                    <VolumeX className="w-4 h-4 text-amber-400" />
                    <span>1. Proibição de Distrações & Comunicar à Família</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    O aluno <strong>não pode ter distrações durante a prova</strong>. É dever obrigatório do candidato <strong>comunicar previamente a sua família sobre a realização do simulado e sobre todas as regras rigorosas</strong>, solicitando que não haja interrupções, chamados, conversas ou barulho no recinto durante as 4 horas de duração.
                  </p>
                </div>

                {/* 2. TODOS OS OUTROS DISPOSITIVOS DESLIGADOS */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
                    <Smartphone className="w-4 h-4 text-rose-400" />
                    <span>2. Todos os Outros Dispositivos Devem Estar Desligados</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    <strong>Todos os outros dispositivos eletrônicos devem estar desligados durante a prova</strong>. Não pode haver nenhum outro dispositivo ligado no ambiente a não ser o que será usado pelo aluno no simulado (<strong className="text-sky-400">{selectedDevice}</strong>). O uso de segundos aparelhos, fones bluetooth comunicadores ou telas adicionais é estritamente proibido.
                  </p>
                </div>

                {/* 3. PROIBIDO O USO DE CADERNO OU ANOTAÇÕES & AMBIENTE LIMPO */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>3. Proibido Caderno ou Anotações & Ambiente Limpo</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    <strong>Proibido o uso de caderno, papéis de rascunho, folhas ou anotações</strong>. O ambiente onde a prova será realizada deve ser um <strong>local limpo, sem barulho e sem ter como usar anotações</strong> para responder à prova. O espaço físico deve estar totalmente livre de materiais de estudo.
                  </p>
                </div>

                {/* 4. PROIBIÇÃO DE INTELIGÊNCIA ARTIFICIAL */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>4. Proibido o Uso de Inteligência Artificial (IA)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    Não será permitido utilizar Inteligência Artificial (ChatGPT, Claude, Gemini ou assistentes automatizados) para responder às questões. Qualquer evidência de texto gerado por máquina resultará em nulidade da prova.
                  </p>
                </div>

                {/* 5. PROIBIÇÃO DE CONSULTAS EXTERNAS */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>5. Proibição de Recursos Externos e Navegação Paralela</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    Não será permitido utilizar outros meios de consulta, abas adicionais, jurisprudência, vademecum ou recursos externos para obter respostas.
                  </p>
                </div>

                {/* 6. DISPOSITIVO HOMOLOGADO & OUTROS NÃO PERMITIDOS */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-sky-500/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-300 font-black text-sm">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>6. Dispositivo Marcado e Salvo</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    Dispositivo homologado para a sua prova: <strong className="text-white font-bold">{selectedDevice}</strong>. Reiteramos que <strong>outros dispositivos que não sejam Celular, Tablet ou Notebook NÃO serão permitidos</strong> em nenhuma hipótese.
                  </p>
                </div>

                {/* 7. ABANDONO DA PROVA DESCLASSIFICA A DUPLA */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
                    <Users className="w-4 h-4 text-rose-400" />
                    <span>7. Abandono da Prova Desclassifica a Dupla</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    O abandono da prova, por qualquer motivo, resultará na desclassificação sumária do participante e de sua dupla (quando houver dupla declarada).
                  </p>
                </div>

                {/* 8. DESCLASSIFICAÇÃO IMEDIATA & MONITORAMENTO TEMPORÁRIO */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 to-slate-950 border border-rose-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-rose-200 font-black text-sm">
                    <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                    <span>8. Monitoramento Temporário & Desclassificação Sem Aviso Prévio</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    Os participantes estarão sob <strong>monitoramento temporário contínuo</strong> para garantir que não estejam descumprindo as regras. O descumprimento de qualquer uma das diretrizes acarretará <strong>desclassificação imediata sem aviso prévio</strong>.
                  </p>
                </div>
              </div>

              {/* Checkbox de Aceite Obrigatório */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-700">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToRules}
                    onChange={(e) => setAgreedToRules(e.target.checked)}
                    className="w-4 h-4 mt-1 rounded text-sky-600 focus:ring-sky-500 bg-slate-900 border-slate-600 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-200 leading-relaxed font-medium">
                    Declaro que li e compreendi integralmente todas as instruções e proibições. Confirmo que <strong>comuniquei minha família</strong>, <strong>desliguei todos os outros aparelhos eletrônicos</strong> do ambiente, estou em um <strong>local limpo, sem barulho e sem anotações</strong>, e utilizarei exclusivamente o meu <strong className="text-sky-300">{selectedDevice}</strong> para responder às 80 questões.
                  </span>
                </label>
              </div>

              {/* Botões Voltar e Iniciar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('identification')}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar para Identificação</span>
                </button>

                <button
                  type="button"
                  disabled={!agreedToRules}
                  onClick={handleStartExam}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play className="w-4 h-4" />
                  <span>Iniciar Prova Oficial (80 Questões)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* ETAPA 3: A PROVA E EXIBIÇÃO DO SIMULADO (80 QUESTÕES COMPLETAS)    */}
        {/* =================================================================== */}
        {currentStep === 'exam' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Examination Control Panel */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                {/* Candidate Information Display */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                      Simulado Oficial TJAM 2026
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                      80 Questões • 4h00
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {participantName}
                    {partnerName.trim() && (
                      <span className="text-xs font-normal text-slate-400 ml-2">
                        & {partnerName}
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1 text-sky-300">
                      {selectedDevice === 'Celular' && <Smartphone className="w-3.5 h-3.5" />}
                      {selectedDevice === 'Tablet' && <Tablet className="w-3.5 h-3.5" />}
                      {selectedDevice === 'Notebook' && <Laptop className="w-3.5 h-3.5" />}
                      <span>Aparelho: {selectedDevice}</span>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Monitoramento Ativo
                    </span>
                  </div>
                </div>

                {/* Timer & Encerramento Trigger */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-400 font-mono font-black text-sm shadow-inner">
                    <Clock className="w-4 h-4 animate-pulse text-amber-400" />
                    <span>{formatTime(timeRemainingSeconds)}</span>
                  </div>

                  {/* Top "Encerrar Prova" trigger with strict check */}
                  {allQuestionsAnswered ? (
                    <button
                      type="button"
                      onClick={handleProceedToConfirmPage}
                      className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Encerrar Prova</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title={`Você precisa responder todas as ${totalQuestions} questões antes de encerrar. Restam ${unansweredCount} pendentes.`}
                      className="px-4 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 font-bold text-xs flex items-center gap-1.5 opacity-70 cursor-not-allowed"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Encerrar ({totalAnswered}/80)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Active Rules Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-950 to-sky-950/40 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-rose-300 font-black shrink-0">
                  <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>REGRAS ATIVAS:</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium text-[11px]">
                  🔇 Sem distrações • 🔌 Demais aparelhos desligados • 🚫 Proibido caderno/anotações • ❌ Sem IA • ⚠️ Responda as 80 questões para encerrar.
                </p>
                <div className="flex items-center gap-1.5 font-mono font-bold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-lg border border-sky-500/30 shrink-0">
                  <span>{totalAnswered}/{totalQuestions} Respondidas</span>
                </div>
              </div>
            </div>

            {/* Question Runner & Map Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Question Workspace (3 Cols) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
                  {/* Discipline and Question Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl ${currentDiscipline.bg} border ${currentDiscipline.border} flex items-center justify-center`}>
                        <DiscIcon className={`w-4 h-4 ${currentDiscipline.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white">
                            Questão {currentQuestionIndex + 1} de {totalQuestions}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${currentDiscipline.bg} ${currentDiscipline.color} border ${currentDiscipline.border}`}>
                            {currentDiscipline.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {currentQuestion.topicName}
                        </p>
                      </div>
                    </div>

                    {/* Flag for Review */}
                    <button
                      type="button"
                      onClick={() => handleToggleReview(currentQuestion.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        markedForReview[currentQuestion.id]
                          ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300'
                          : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{markedForReview[currentQuestion.id] ? 'Marcada p/ Revisão' : 'Marcar p/ Revisão'}</span>
                    </button>
                  </div>

                  {/* Statement */}
                  <div className="space-y-3">
                    <h3 className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                      {currentQuestion.statement}
                    </h3>
                  </div>

                  {/* Options (A to E) */}
                  <div className="space-y-2.5 pt-2">
                    {currentQuestion.options.map((option) => {
                      const isSelected = userAnswers[currentQuestion.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-sky-600/25 border-sky-400 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-400'
                              : 'bg-slate-950/70 border-slate-800/90 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-xl font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              isSelected
                                ? 'bg-sky-500 text-white shadow-sm'
                                : 'bg-slate-900 border border-slate-700 text-slate-400'
                            }`}
                          >
                            {option.id}
                          </span>
                          <span className="text-xs sm:text-sm leading-relaxed pt-0.5 flex-1">
                            {option.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>

                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      {currentQuestionIndex + 1} / {totalQuestions}
                    </span>

                    {currentQuestionIndex < totalQuestions - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                        className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                      >
                        <span>Próxima</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : allQuestionsAnswered ? (
                      <button
                        type="button"
                        onClick={handleProceedToConfirmPage}
                        className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 cursor-pointer transition-all hover:scale-105"
                      >
                        <span>Encerrar a Prova (80/80)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="px-5 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 font-bold text-xs flex items-center gap-1.5 opacity-70 cursor-not-allowed"
                      >
                        <span>Responda todas para encerrar ({totalAnswered}/80)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Final Exam Completion Warning Bar */}
                <div className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  allQuestionsAnswered
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                }`}>
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-xs font-black uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                      {allQuestionsAnswered ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Todas as 80 Questões foram respondidas!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Atenção: O usuário deve ter respondido todas as questões antes de encerrar</span>
                        </>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {allQuestionsAnswered
                        ? 'Você já preencheu todas as 80 questões da prova. Clique no botão ao lado para avançar para a página de confirmação de encerramento.'
                        : `Restam ${unansweredCount} questões pendentes para serem marcadas no gabarito. Clique nos números em cinza no mapa ao lado para preenchê-las.`}
                    </p>
                  </div>

                  {allQuestionsAnswered ? (
                    <button
                      type="button"
                      onClick={handleProceedToConfirmPage}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Encerrar a Prova → Página de Confirmar</span>
                    </button>
                  ) : (
                    <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono font-bold shrink-0 text-center">
                      Bloqueado: {unansweredCount} pendente(s)
                    </div>
                  )}
                </div>
              </div>

              {/* Questions Map Side Panel (1 Col) */}
              <div className="lg:col-span-1 space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Mapa da Prova
                    </span>
                    <span className="text-xs font-mono font-bold text-sky-400">
                      {totalAnswered}/80 ({progressPercent}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        allQuestionsAnswered
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-sky-500 to-indigo-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* 80 Questions Grid */}
                  <div className="grid grid-cols-5 gap-1.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                    {simulado.questions.map((q, idx) => {
                      const isAnswered = !!userAnswers[q.id];
                      const isCurrent = idx === currentQuestionIndex;
                      const isMarked = !!markedForReview[q.id];

                      let btnStyle = 'bg-slate-800/80 text-slate-400 hover:bg-slate-700';
                      if (isCurrent) {
                        btnStyle = 'ring-2 ring-sky-400 bg-sky-600 text-white font-black';
                      } else if (isMarked) {
                        btnStyle = 'bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold';
                      } else if (isAnswered) {
                        btnStyle = 'bg-emerald-600/25 border border-emerald-500/30 text-emerald-300 font-bold';
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-8 rounded-lg text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                          title={`Questão ${idx + 1} • ${isAnswered ? `Marcada: ${userAnswers[q.id]}` : 'Pendente'}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="pt-2 text-[10px] text-slate-400 space-y-1.5 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                        <span>Respondidas</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">{totalAnswered}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded bg-slate-700" />
                        <span>Pendentes</span>
                      </div>
                      <span className="font-mono font-bold text-amber-400">{unansweredCount}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                        <span>Para Revisar</span>
                      </div>
                      <span className="font-mono font-bold text-amber-300">
                        {Object.values(markedForReview).filter(Boolean).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* ETAPA 4: PÁGINA DE CONFIRMAR (BOTÃO PARA PRESSIONAR E CONFIRMAR)    */}
        {/* =================================================================== */}
        {currentStep === 'confirm' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300 py-6">
            {/* Header Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-3 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Etapa de Confirmação Obrigatória</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Confirmar Encerramento da Prova
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Você respondeu com êxito todas as <strong className="text-emerald-400 font-mono">80 questões</strong> do simulado oficial. Verifique os dados abaixo e confirme para registrar o encerramento definitivo.
              </p>
            </div>

            {/* Candidate & Completion Verification Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                Dados do Fechamento do Simulado:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Nome do Participante</span>
                  <strong className="text-sm font-bold text-white block truncate">{participantName}</strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Nome da Dupla</span>
                  <strong className="text-sm font-bold text-white block truncate">
                    {partnerName.trim() ? partnerName : 'Individual (Sem dupla)'}
                  </strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Dispositivo Registrado</span>
                  <strong className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                    {selectedDevice === 'Celular' && <Smartphone className="w-4 h-4" />}
                    {selectedDevice === 'Tablet' && <Tablet className="w-4 h-4" />}
                    {selectedDevice === 'Notebook' && <Laptop className="w-4 h-4" />}
                    <span>{selectedDevice}</span>
                  </strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Total de Questões Respondidas</span>
                  <strong className="text-sm font-bold text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-4 h-4" /> 80 de 80 (100%)
                  </strong>
                </div>
              </div>

              {/* STRICT RULE ALERT */}
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 leading-relaxed font-medium space-y-1">
                <div className="flex items-center gap-1.5 text-rose-300 font-black">
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>ENCERRAMENTO DEFINITIVO E IRREVERSÍVEL</span>
                </div>
                <p>
                  <strong>Ao final da prova, NÃO É POSSÍVEL VOLTAR para responder o simulado novamente.</strong> Todas as respostas serão salvas com segurança. Na página seguinte, você receberá a orientação para baixar o <strong>PDF do gabarito oficial</strong> e enviar ao seu professor com suas respostas certas, erros e acertos.
                </p>
              </div>

              {/* Big Interactive "Pressione para Confirmar" Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onMouseDown={startPressConfirm}
                  onMouseUp={stopPressConfirm}
                  onMouseLeave={stopPressConfirm}
                  onTouchStart={startPressConfirm}
                  onTouchEnd={stopPressConfirm}
                  onClick={handleDirectConfirm}
                  className="w-full relative overflow-hidden py-5 px-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-2xl shadow-emerald-600/40 flex items-center justify-center gap-2 cursor-pointer select-none transition-all active:scale-[0.99]"
                >
                  {confirmProgress > 0 && (
                    <div
                      className="absolute inset-0 bg-white/20 transition-all duration-75 pointer-events-none"
                      style={{ width: `${confirmProgress}%` }}
                    />
                  )}
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="relative z-10">
                    {confirmProgress > 0 && confirmProgress < 100
                      ? `Confirmando (${Math.round(confirmProgress)}%)...`
                      : 'Pressione ou Clique aqui para Confirmar que Encerrou a Prova'}
                  </span>
                </button>
                <p className="text-[11px] text-slate-400 text-center font-medium">
                  Clique ou mantenha o botão pressionado para confirmar o encerramento.
                </p>
              </div>

              {/* Return to exam button */}
              <div className="pt-2 border-t border-slate-800 text-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep('exam')}
                  className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 cursor-pointer py-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para a Prova e Revisar Respostas</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* ETAPA 5: PÁGINA DE ENCERRAMENTO (ENVIO AO PROFESSOR & BAIXAR PDF)   */}
        {/* =================================================================== */}
        {currentStep === 'closed' && (finishedAttempt || Object.keys(userAnswers).length > 0) && (
          <div className="space-y-6 animate-in fade-in duration-300 py-4">
            
            {/* LOCKED STATUS BANNER: NÃO É POSSÍVEL VOLTAR PARA RESPONDER */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-lg">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">
                  PROVA FINALIZADA E RESPOSTAS SALVAS: Conforme as regras oficiais, não é possível voltar para responder o simulado novamente.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold shrink-0">
                Sessão Concluída & Bloqueada
              </span>
            </div>

            {/* MANDATORY ORIENTATION BANNER: ENVIAR PDF AO PROFESSOR */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-2 border-sky-500/60 shadow-2xl text-white space-y-4">
              <div className="flex items-center gap-2.5 text-sky-400 font-black text-xs uppercase tracking-wider">
                <Send className="w-4 h-4 text-sky-400" />
                <span>ORIENTAÇÃO OBRIGATÓRIA PARA O ALUNO: ENVIAR AO PROFESSOR</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                Baixe o PDF do Gabarito e Envie Imediatamente ao Seu Professor
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                O seu simulado foi finalizado com sucesso e todas as suas 80 respostas foram salvas. <strong>É obrigatório baixar o arquivo PDF do Gabarito Oficial</strong> contendo a discriminação de suas respostas certas, erros e acertos questão por questão, seu aproveitamento por disciplina e o dispositivo registrado (<strong className="text-sky-300">{finishedAttempt?.deviceUsed || selectedDevice}</strong>) para validação da sua nota pelo professor.
              </p>

              {/* 3 Steps Guide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-xs flex items-center justify-center mb-1">1</span>
                  <strong className="text-white block font-bold">1. Baixe o Gabarito</strong>
                  <p className="text-slate-300 text-[11px] leading-snug">
                    Clique no botão verde/azul abaixo para gerar o PDF oficial e arquivar em seu aparelho.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-indigo-500 text-white font-black text-xs flex items-center justify-center mb-1">2</span>
                  <strong className="text-white block font-bold">2. Confira Erros e Acertos</strong>
                  <p className="text-slate-300 text-[11px] leading-snug">
                    Verifique os pontos ganhos (+1 ponto por acerto, 0 por erro) e comentários de cada questão.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center mb-1">3</span>
                  <strong className="text-white block font-bold">3. Envie ao Professor</strong>
                  <p className="text-slate-300 text-[11px] leading-snug">
                    Encaminhe o arquivo baixado ao professor (WhatsApp ou e-mail) para registro no ranking.
                  </p>
                </div>
              </div>

              {/* DOWNLOAD BUTTON IN BANNER */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadGabaritoPDF}
                  disabled={isGeneratingPDF}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-emerald-600/40 flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <span>{isGeneratingPDF ? 'Gerando Documento PDF Profissional...' : 'Baixar Gabarito Oficial em PDF (Envio ao Professor)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-slate-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

            {/* Completion Hero Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Prova Registrada e Auditada</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    Desempenho Oficial do Participante
                  </h1>

                  <div className="text-xs text-slate-300 font-medium space-y-0.5">
                    <p>Participante: <strong className="text-white font-bold">{finishedAttempt?.participantName || participantName}</strong></p>
                    {finishedAttempt?.partnerName && (
                      <p>Dupla: <strong className="text-white font-bold">{finishedAttempt.partnerName}</strong></p>
                    )}
                    <p className="text-slate-400">
                      Dispositivo Registrado: <strong className="text-sky-400 font-bold">{finishedAttempt?.deviceUsed || selectedDevice}</strong> • Monitoramento Concluído
                    </p>
                  </div>
                </div>

                {/* Score Summary Box */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center min-w-[220px] shadow-lg">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">
                    Pontuação Final
                  </span>
                  <span className="text-4xl sm:text-5xl font-black text-emerald-300 font-mono block">
                    {finishedAttempt?.score ?? 0} <span className="text-lg text-slate-500 font-normal">/ {finishedAttempt?.maxScore ?? 80}</span>
                  </span>
                  <span className="text-xs font-black text-emerald-400 mt-1 block">
                    {finishedAttempt?.percentage ?? 0}% de aproveitamento
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {finishedAttempt?.score ?? 0} acertos • {(finishedAttempt?.maxScore ?? 80) - (finishedAttempt?.score ?? 0)} erros
                  </span>
                </div>
              </div>

              {/* Discipline Breakdown Stats */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4" /> Desempenho por Disciplina (80 Questões):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {(Object.entries(disciplineStats) as [string, { name: string; total: number; correct: number }][]).map(([key, stat]) => {
                    const perc = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                    return (
                      <div key={key} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 shadow-md">
                        <span className="font-bold text-slate-200 truncate block">{stat.name}</span>
                        <div className="flex items-center justify-between text-emerald-300 font-mono font-black">
                          <span>{stat.correct}/{stat.total} acertos</span>
                          <span>{perc}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${perc}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Interactive Gabarito Viewer (1 to 80) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    Gabarito Oficial Comentado na Tela (1 a 80)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Consulte as 80 resoluções pedagógicas com indicação de acertos e erros.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setResultFilter('all')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      resultFilter === 'all'
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    Todas (80)
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultFilter('correct')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      resultFilter === 'correct'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    Acertos ({finishedAttempt?.score ?? 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultFilter('wrong')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      resultFilter === 'wrong'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    Erros ({(finishedAttempt?.maxScore ?? 80) - (finishedAttempt?.score ?? 0)})
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {simulado.questions
                  .filter((q) => {
                    const isCorrect = userAnswers[q.id] === q.correctOptionId;
                    if (resultFilter === 'correct') return isCorrect;
                    if (resultFilter === 'wrong') return !isCorrect;
                    return true;
                  })
                  .map((q) => {
                    const userChoice = userAnswers[q.id];
                    const isCorrect = userChoice === q.correctOptionId;
                    const qNum = simulado.questions.findIndex((item) => item.id === q.id) + 1;
                    const disc = disciplinesConfig[q.disciplineId] || { name: q.disciplineId };

                    return (
                      <div
                        key={q.id}
                        className={`p-5 sm:p-6 rounded-3xl border space-y-4 transition-all shadow-md ${
                          isCorrect
                            ? 'bg-slate-900/90 border-emerald-500/30'
                            : 'bg-slate-900/90 border-rose-500/30'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-xl font-black text-xs text-white ${
                                isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}
                            >
                              Questão {qNum}
                            </span>
                            <span className="text-xs font-bold text-slate-300">
                              {disc.name} • {q.topicName}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 font-bold text-xs">
                            {isCorrect ? (
                              <span className="text-emerald-400 flex items-center gap-1 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Você Acertou (+1 ponto)
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/30">
                                <XCircle className="w-3.5 h-3.5" /> Você Errou (0 pontos)
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-200">
                          {q.statement}
                        </p>

                        {/* Options */}
                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            const isUserSelected = userChoice === opt.id;
                            const isCorrectAnswer = opt.id === q.correctOptionId;

                            let style = 'bg-slate-950/60 border-slate-800 text-slate-300';
                            if (isCorrectAnswer) {
                              style = 'bg-emerald-950/50 border-emerald-500/50 text-emerald-100 font-bold ring-1 ring-emerald-500/30';
                            } else if (isUserSelected && !isCorrect) {
                              style = 'bg-rose-950/50 border-rose-500/50 text-rose-100 font-bold ring-1 ring-rose-500/30';
                            }

                            return (
                              <div
                                key={opt.id}
                                className={`p-3 rounded-xl border text-xs flex items-center justify-between ${style}`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded-md font-mono font-black text-[11px] flex items-center justify-center bg-slate-900 border border-slate-700 shrink-0">
                                    {opt.id}
                                  </span>
                                  <span className="leading-snug pt-0.5">{opt.text}</span>
                                </div>

                                {isCorrectAnswer && (
                                  <span className="text-[10px] uppercase font-black text-emerald-400 flex items-center gap-1 shrink-0 ml-2">
                                    <Check className="w-3 h-3" /> Gabarito Oficial
                                  </span>
                                )}
                                {isUserSelected && !isCorrect && (
                                  <span className="text-[10px] uppercase font-black text-rose-400 flex items-center gap-1 shrink-0 ml-2">
                                    <X className="w-3 h-3" /> Sua Resposta
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {q.explanation && (
                          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                            <span className="font-black text-sky-400 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                              <HelpCircle className="w-3.5 h-3.5" /> Comentário & Fundamentação Oficial:
                            </span>
                            <p className="text-slate-300 leading-relaxed font-medium">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Rules Modal (Accessible anytime during the exam) */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Regras Oficiais do Simulado TJAM
              </h3>
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1 cursor-pointer"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="text-xs space-y-3 text-slate-300">
              <p>• <strong>Sem Distrações & Comunicar à Família:</strong> O aluno não pode ter distrações. A família deve ser orientada para manter o ambiente silencioso sem interrupções.</p>
              <p>• <strong>Todos os Outros Dispositivos Desligados:</strong> Nenhum outro aparelho pode estar ligado no ambiente além do homologado ({selectedDevice}).</p>
              <p>• <strong>Proibido Caderno ou Anotações:</strong> O local deve ser limpo e silencioso, sem anotações ou materiais de consulta.</p>
              <p>• <strong>Proibido Inteligência Artificial:</strong> Uso de IA é estritamente proibido sob pena de cancelamento.</p>
              <p>• <strong>Dispositivo Registrado:</strong> Apenas Celular, Tablet ou Notebook são permitidos. Outros são expressamente proibidos.</p>
              <p>• <strong>Não é Permitido Refazer:</strong> Ao encerrar, as respostas são salvas e não é possível responder novamente.</p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-right">
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer"
              >
                Entendido, Continuar Prova
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
