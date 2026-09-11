import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Lock,
  Snowflake,
  AlertTriangle,
  Users,
  Clock,
  Sparkles,
  Key,
  ShieldAlert,
  AlertCircle,
  XCircle,
  CheckCircle2,
  RefreshCw,
  Flame,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Check,
  Award,
  Eye,
  Scale,
  Landmark,
  Compass,
  Monitor,
  BookMarked,
  Shield,
  HelpCircle,
  Play
} from 'lucide-react';
import { Simulado, UserProgress, SimuladoAttempt } from '../types';
import { SnowfallEffect } from './SnowfallEffect';
import { SIMULADO_80_QUESTIONS, SIMULADO_80_QUESTOES_GABARITO, SIMULADO_80_OBJETO } from '../data/simulado80QuestoesData';
import { OfficialSimuladoFlow } from './OfficialSimuladoFlow';
import { DUPLAS_RANKING, INDIVIDUAL_SIMULADO_RANKING } from '../data/rankingsData';

interface SiteLockedViewProps {
  isDarkMode?: boolean;
  simulados?: Simulado[];
  progress?: UserProgress;
  onSaveSimuladoAttempt?: (attempt: SimuladoAttempt) => void;
  onToggleDarkMode?: () => void;
  onUnlockSite?: () => void;
}

export const SiteLockedView: React.FC<SiteLockedViewProps> = ({
  isDarkMode = true,
  onUnlockSite,
  onSaveSimuladoAttempt,
}) => {
  // Simulado in 3 stages runner state (configured already in Stage 1)
  const [isTakingSimulado, setIsTakingSimulado] = useState<boolean>(true);

  // 5-second Hold state for Eduardo
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0); // 0 to 100
  const [holdTimeElapsed, setHoldTimeElapsed] = useState<number>(0); // 0 to 5000 ms
  const [partnerMissingAlert, setPartnerMissingAlert] = useState<boolean>(false);
  const [partnerNoticeShake, setPartnerNoticeShake] = useState<boolean>(false);
  const [holdCancelledMessage, setHoldCancelledMessage] = useState<string>('');

  // Passcode modal for teacher/admin
  const [showPasscodeModal, setShowPasscodeModal] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');

  // Simulado 80 preview interactive states
  const [selectedDisciplineFilter, setSelectedDisciplineFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>('sim80-q01');
  const [showGabaritoModal, setShowGabaritoModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'ranking'>('overview');
  const [rankingSubTab, setRankingSubTab] = useState<'duplas' | 'individual'>('duplas');

  const holdIntervalRef = useRef<number | null>(null);
  const holdStartTimeRef = useRef<number>(0);
  const REQUIRED_HOLD_MS = 5000;

  // Handle Hold Start (Mouse Down / Touch Start)
  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (partnerMissingAlert) return;

    setIsHolding(true);
    setHoldCancelledMessage('');
    holdStartTimeRef.current = Date.now();

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progressPercent = Math.min(100, (elapsed / REQUIRED_HOLD_MS) * 100);

      setHoldTimeElapsed(elapsed);
      setHoldProgress(progressPercent);

      if (elapsed >= REQUIRED_HOLD_MS) {
        // Completed 5 seconds
        if (holdIntervalRef.current) {
          clearInterval(holdIntervalRef.current);
          holdIntervalRef.current = null;
        }
        setIsHolding(false);
        setHoldProgress(100);
        setPartnerMissingAlert(true);
      }
    }, 40);
  };

  // Handle Hold Stop / Cancel
  const stopHold = () => {
    if (isHolding) {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
      setIsHolding(false);

      if (holdProgress < 100) {
        setHoldCancelledMessage('Mantenha o botão pressionado pelos 5 segundos completos!');
        setHoldProgress(0);
        setHoldTimeElapsed(0);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    };
  }, []);

  const handlePartnerButtonClick = () => {
    setPartnerNoticeShake(true);
    setTimeout(() => setPartnerNoticeShake(false), 800);
  };

  const handleResetAttempt = () => {
    setPartnerMissingAlert(false);
    setHoldProgress(0);
    setHoldTimeElapsed(0);
    setHoldCancelledMessage('');
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (
      clean === 'admin2026' ||
      clean === 'tjam2026' ||
      clean === 'admin' ||
      clean === 'prof2026' ||
      clean === 'desbloquear'
    ) {
      setShowPasscodeModal(false);
      setPasscode('');
      setPasscodeError('');
      if (onUnlockSite) onUnlockSite();
    } else {
      setPasscodeError('Senha incorreta! Apenas administradores ou professores podem desbloquear.');
    }
  };

  const disciplinesConfig = [
    { id: 'processo-civil', name: 'Processo Civil', icon: Scale, count: 10, range: 'Q1 – Q10', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { id: 'processo-penal', name: 'Processo Penal', icon: Shield, count: 10, range: 'Q11 – Q20', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
    { id: 'legislacao-tjam', name: 'Legislação TJAM', icon: Landmark, count: 10, range: 'Q21 – Q30', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
    { id: 'geografia-amazonas', name: 'Geografia do Amazonas', icon: Compass, count: 10, range: 'Q31 – Q40', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'direito-constitucional', name: 'Direito Constitucional', icon: Award, count: 10, range: 'Q41 – Q50', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { id: 'informatica', name: 'Informática', icon: Monitor, count: 10, range: 'Q51 – Q60', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { id: 'lingua-portuguesa', name: 'Língua Portuguesa', icon: BookMarked, count: 10, range: 'Q61 – Q70', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
    { id: 'direito-administrativo', name: 'Direito Administrativo', icon: FileText, count: 10, range: 'Q71 – Q80', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
  ];

  const filteredQuestions = useMemo(() => {
    return SIMULADO_80_QUESTIONS.filter((q) => {
      const matchesDiscipline = selectedDisciplineFilter === 'all' || q.disciplineId === selectedDisciplineFilter;
      const matchesSearch =
        searchFilter.trim() === '' ||
        q.statement.toLowerCase().includes(searchFilter.toLowerCase()) ||
        q.topicName?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        q.id.toLowerCase().includes(searchFilter.toLowerCase());
      return matchesDiscipline && matchesSearch;
    });
  }, [selectedDisciplineFilter, searchFilter]);

  const duplasRanking = DUPLAS_RANKING;
  const individualRanking = INDIVIDUAL_SIMULADO_RANKING;

  const secondsRemaining = Math.max(0, (REQUIRED_HOLD_MS - holdTimeElapsed) / 1000).toFixed(1);

  if (isTakingSimulado) {
    return (
      <OfficialSimuladoFlow
        simulado={SIMULADO_80_OBJETO}
        onSaveAttempt={onSaveSimuladoAttempt}
        onExit={() => setIsTakingSimulado(false)}
      />
    );
  }

  return (
    <div
      id="site-locked-gate-panel"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-sky-500/30 font-sans"
    >
      <SnowfallEffect />

      {/* Top Pedagogical Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-700 via-sky-800 to-emerald-700 text-white text-xs font-black py-2.5 px-4 text-center border-b border-emerald-500/40 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <Award className="w-4 h-4 shrink-0 text-amber-300 animate-bounce" />
          <span className="tracking-wide">
            CLASSIFICAÇÃO HOMOLOGADA: Simulado de 80 Questões finalizado! Eduardo Mateus conquistou o 2º lugar individual (83,8% de aproveitamento - 67 acertos) e o 5º lugar no ranking das duplas com Pedro Henrique (30,0% de aproveitamento)!
          </span>
        </div>
      </div>

      {/* Main Header with Status & Admin Unlock */}
      <header className="w-full border-b border-slate-800/90 bg-slate-900/80 backdrop-blur-md sticky top-[37px] z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-300 shadow-sm">
              <Snowflake className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white flex items-center gap-2">
                TJAM Estudos 2026
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Site Oculto • Preparação
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Portal em Modo de Preparação do Simulado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPasscodeError('');
                setShowPasscodeModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700 hover:text-white"
              title="Acesso Docente / Administrador"
            >
              <Key className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Acesso Professor / Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col items-center z-10 space-y-6">
        
        {/* HERO CARD: Site Locked & Preparation Mode Banner */}
        <div className="w-full rounded-3xl bg-slate-900/90 border border-sky-500/30 shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          {/* Ambient Ice Glow in background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative z-10">
            {/* Frosty Mascot Display */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-28 h-32 sm:w-32 sm:h-36 relative p-2 rounded-2xl bg-slate-950/60 border border-sky-500/30 shadow-lg flex items-center justify-center group">
                {/* Frosty SVG Vector */}
                <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-[0_4px_14px_rgba(56,189,248,0.4)] overflow-visible">
                  <defs>
                    <radialGradient id="frostyGateBody" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#f0f9ff" />
                      <stop offset="85%" stopColor="#bae6fd" />
                      <stop offset="100%" stopColor="#7dd3fc" />
                    </radialGradient>
                    <linearGradient id="frostyGateBeanie" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="frostyGateScarf" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                  </defs>

                  {/* Left Arm Branch */}
                  <path d="M 34 78 Q 18 72 10 65" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 18 72 Q 14 60 12 55" stroke="#78350f" strokeWidth="2.8" strokeLinecap="round" fill="none" />

                  {/* Body Snowball */}
                  <circle cx="60" cy="92" r="30" fill="url(#frostyGateBody)" stroke="#38bdf8" strokeWidth="1.2" />
                  <ellipse cx="50" cy="74" rx="10" ry="4" fill="#ffffff" opacity="0.6" />

                  {/* Coal Buttons */}
                  <circle cx="60" cy="84" r="2.8" fill="#0f172a" />
                  <circle cx="60" cy="94" r="2.8" fill="#0f172a" />
                  <circle cx="60" cy="104" r="2.8" fill="#0f172a" />

                  {/* Scarf Tail */}
                  <path d="M 66 68 C 72 78, 76 90, 78 102" stroke="url(#frostyGateScarf)" strokeWidth="7" strokeLinecap="round" fill="none" />

                  {/* Head Snowball */}
                  <circle cx="60" cy="48" r="22" fill="url(#frostyGateBody)" stroke="#38bdf8" strokeWidth="1.2" />
                  <ellipse cx="52" cy="34" rx="8" ry="3.5" fill="#ffffff" opacity="0.65" />

                  {/* Scarf Collar */}
                  <path d="M 40 64 C 54 72, 68 72, 80 64 C 80 70, 40 70, 40 64 Z" fill="url(#frostyGateScarf)" stroke="#0284c7" strokeWidth="1" />
                  <circle cx="60" cy="67" r="2.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />

                  {/* Eyes */}
                  <ellipse cx="51" cy="44" rx="3.2" ry="3.8" fill="#0f172a" />
                  <circle cx="52.2" cy="42.8" r="1.3" fill="#ffffff" />
                  <ellipse cx="69" cy="44" rx="3.2" ry="3.8" fill="#0f172a" />
                  <circle cx="70.2" cy="42.8" r="1.3" fill="#ffffff" />

                  {/* Cheeks */}
                  <ellipse cx="45" cy="51" rx="3.5" ry="2.2" fill="#fb7185" opacity="0.45" />
                  <ellipse cx="75" cy="51" rx="3.5" ry="2.2" fill="#fb7185" opacity="0.45" />

                  {/* Carrot Nose */}
                  <polygon points="58,49 58,54 75,52" fill="#ea580c" stroke="#c2410c" strokeWidth="0.4" />

                  {/* Smile */}
                  <path d="M 53 56 Q 60 61 67 56" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Beanie Hat */}
                  <path d="M 40 36 Q 60 18 80 36" fill="url(#frostyGateBeanie)" stroke="#0284c7" strokeWidth="1.2" />
                  <rect x="37" y="34" width="46" height="6.5" rx="3.2" fill="#38bdf8" stroke="#0369a1" strokeWidth="0.8" />
                  <circle cx="60" cy="18" r="6" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1" />

                  {/* Waving Arm with Mitten */}
                  <g className="animate-wave" style={{ transformOrigin: '84px 76px' }}>
                    <path d="M 84 76 Q 100 60 108 42" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M 98 56 Q 108 52 112 50" stroke="#78350f" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <ellipse cx="109" cy="40" rx="5.5" ry="6.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.2" />
                    <circle cx="104" cy="43" r="2.8" fill="#38bdf8" />
                    <text x="106.5" y="42.5" fontSize="5" fill="#ffffff" fontWeight="bold">❄</text>
                  </g>
                </svg>

                {/* Name Badge */}
                <div className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-400/40 text-[10px] font-black text-sky-300 shadow-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  <span>FROSTY ⛄</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold mt-3">Mascote TJAM</span>
            </div>

            {/* Inactivation Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Modo Preparação: 80 Questões Carregadas
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3 h-3 text-amber-400" />
                  Aguardando Novas Questões
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Site Oculto para Preparação do Simulado Geral
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A coordenação pedagógica ocultou temporariamente a plataforma para organizar e cadastrar o <strong className="text-sky-300">Grande Simulado Geral TJAM 2026</strong>. As primeiras <strong className="text-white font-black">80 questões</strong> foram totalmente estruturadas com enunciados, 5 alternativas e gabarito oficial de 1 a 80. O sistema está pronto aguardando as próximas questões enviadas pelo professor para a liberação final.
              </p>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300">
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Banco Carregado: <strong className="text-sky-300">80 Questões</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gabarito Oficial: <strong className="text-emerald-300">1 a 80 Verificado</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Disciplinas Mapeadas: <strong className="text-indigo-300">8 Matérias (10q cada)</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OFFICIAL 3-STAGE SIMULADO BANNER */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-sky-950/80 border border-emerald-500/40 p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Simulado Oficial Concluído & Homologado
              </span>
              <span className="text-[10px] font-bold text-sky-300">
                🥈 2º Individual (83,8% • 67 acertos) • 🏅 5º Duplas (30,0% Dupla Oficial)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Resultado do Simulado Geral TJAM 2026 Homologado
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              O simulado de 80 questões foi encerrado e auditado. Confira o espelho de prova com as 80 resoluções comentadas, desempenho pedagógico por matéria e o relatório de classificação oficial de Eduardo Mateus.
            </p>
          </div>

          <button
            onClick={() => setIsTakingSimulado(true)}
            className="w-full md:auto px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Award className="w-4 h-4 text-white" />
            <span>Ver Resultado Oficial (83,8%)</span>
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="w-full flex items-center justify-center sm:justify-start gap-2 border-b border-slate-800/80 pb-2">
          <button
            onClick={() => setIsTakingSimulado(true)}
            className="px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30"
          >
            <Award className="w-3.5 h-3.5 text-white" />
            Resultado do Simulado (83,8%)
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Visão Geral das 80 Questões
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Explorar Questões & Gabarito ({filteredQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('ranking')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ranking'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Status e Rankings Oficiais
          </button>
        </div>

        {/* TAB 1: OVERVIEW — 8 Disciplines Grid & Preparation Status */}
        {activeTab === 'overview' && (
          <div className="w-full space-y-6 animate-in fade-in duration-200">
            {/* Disciplines Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {disciplinesConfig.map((disc) => {
                const IconComponent = disc.icon;
                return (
                  <div
                    key={disc.id}
                    onClick={() => {
                      setSelectedDisciplineFilter(disc.id);
                      setActiveTab('questions');
                    }}
                    className={`p-4 rounded-2xl ${disc.bg} border ${disc.border} hover:scale-[1.02] transition-all cursor-pointer shadow-md flex flex-col justify-between group`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-xl bg-slate-950/60 flex items-center justify-center ${disc.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-slate-950/70 text-slate-300 border border-slate-800">
                        {disc.range}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-white group-hover:text-sky-300 transition-colors">
                        {disc.name}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400" />
                        {disc.count} questões prontas
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Gabarito Matrix Strip */}
            <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Gabarito Oficial Rápido (1 a 80)
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Respostas conferidas e vinculadas ao motor de correção automática.
                  </p>
                </div>
                <button
                  onClick={() => setShowGabaritoModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all cursor-pointer"
                >
                  Abrir Tabela Completa
                </button>
              </div>

              {/* Mini Sample of Answers 1-20 */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((qNum) => (
                  <div
                    key={qNum}
                    className="p-1.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-center text-xs flex flex-col items-center"
                  >
                    <span className="text-[10px] text-slate-500 font-mono">Q{qNum}</span>
                    <span className="text-xs font-black text-sky-300 font-mono">
                      {SIMULADO_80_QUESTOES_GABARITO[qNum]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 text-center font-medium">
                Mostrando Q1 a Q20. Clique em "Abrir Tabela Completa" para inspecionar todas as 80 respostas.
              </p>
            </div>

            {/* Preparation Banner for Additional Questions */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/50 via-slate-900/60 to-indigo-950/50 border border-sky-500/30 text-slate-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300 shrink-0">
                  <Sparkles className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    "Ainda tenho mais questões para enviar"
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    O sistema mantém o site protegido e pronto para receber o próximo bloco de questões complementares.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedDisciplineFilter('all');
                  setActiveTab('questions');
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs transition-colors shrink-0 cursor-pointer shadow-sm"
              >
                Conferir as 80 Questões
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: QUESTIONS EXPLORER — Filterable list of all 80 questions */}
        {activeTab === 'questions' && (
          <div className="w-full space-y-4 animate-in fade-in duration-200">
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Pesquisar por enunciado, tema ou número..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Quick Gabarito Modal Trigger */}
                <button
                  onClick={() => setShowGabaritoModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Ver Gabarito 1 a 80
                </button>
              </div>

              {/* Discipline Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
                <button
                  onClick={() => setSelectedDisciplineFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                    selectedDisciplineFilter === 'all'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Todas (80)
                </button>
                {disciplinesConfig.map((disc) => (
                  <button
                    key={disc.id}
                    onClick={() => setSelectedDisciplineFilter(disc.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                      selectedDisciplineFilter === disc.id
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {disc.name} (10)
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {filteredQuestions.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
                  Nenhuma questão encontrada com o filtro selecionado.
                </div>
              ) : (
                filteredQuestions.map((question, idx) => {
                  const isExpanded = expandedQuestionId === question.id;
                  const disc = disciplinesConfig.find((d) => d.id === question.disciplineId);
                  const IconComp = disc ? disc.icon : HelpCircle;

                  return (
                    <div
                      key={question.id}
                      className="rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-md overflow-hidden transition-all"
                    >
                      {/* Question Header Accordion Trigger */}
                      <button
                        onClick={() => setExpandedQuestionId(isExpanded ? null : question.id)}
                        className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-800/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-7 h-7 rounded-lg ${disc?.bg || 'bg-slate-800'} flex items-center justify-center shrink-0 mt-0.5`}>
                            <IconComp className={`w-3.5 h-3.5 ${disc?.color || 'text-slate-400'}`} />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs font-mono font-black text-sky-300">
                                {question.statement.split('.')[0]}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                                {disc?.name || question.disciplineId}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                • {question.topicName}
                              </span>
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ml-auto">
                                Gabarito: {question.correctOptionId}
                              </span>
                            </div>
                            <p className="text-xs text-slate-200 line-clamp-2 font-medium">
                              {question.statement}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-slate-400 pt-1">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Expanded Question Body */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                          <p className="text-xs text-white leading-relaxed font-semibold">
                            {question.statement}
                          </p>

                          {/* Options */}
                          <div className="space-y-1.5 pt-1">
                            {question.options.map((opt) => {
                              const isCorrect = opt.id === question.correctOptionId;
                              return (
                                <div
                                  key={opt.id}
                                  className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                                    isCorrect
                                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100 font-medium shadow-sm'
                                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                                  }`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded-md text-[10px] font-mono font-black flex items-center justify-center shrink-0 ${
                                      isCorrect
                                        ? 'bg-emerald-500 text-slate-950'
                                        : 'bg-slate-800 text-slate-400'
                                    }`}
                                  >
                                    {opt.id}
                                  </span>
                                  <span className="flex-1 leading-snug">{opt.text}</span>
                                  {isCorrect && (
                                    <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                                      <Check className="w-3 h-3" />
                                      Correta
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation */}
                          {question.explanation && (
                            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                              <span className="text-[10px] font-black uppercase text-sky-400 flex items-center gap-1">
                                <HelpCircle className="w-3 h-3" />
                                Comentário Pedagógico:
                              </span>
                              <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                                {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT STATUS & RANKING */}
        {activeTab === 'ranking' && (
          <div className="w-full space-y-6 animate-in fade-in duration-200">
            {/* Student Inactivity & Hold Action Panel */}
            <div className="w-full rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Conta Inativa por Falta de Interesse</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  Painel de Desbloqueio do Estudante
                </h3>
                <p className="text-xs text-slate-400">
                  Para tentar liberar a página, o usuário <strong>Eduardo Mateus</strong> pode pressionar e segurar o botão por 5 segundos.
                </p>
              </div>

              {/* Partner Missing Alert Banner (Triggers after 5 seconds hold) */}
              {partnerMissingAlert && (
                <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-100 shadow-xl space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-rose-200">
                        Não foi possível entrar no site!
                      </h4>
                      <p className="text-xs text-rose-300/90 font-medium">
                        O site está temporariamente oculto para preparação do Simulado de 80 Questões.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-200/90 bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-500/20 leading-relaxed font-semibold">
                    Todas as atividades pedagógicas estão entregues e a dupla está em 5º lugar no ranking geral.
                  </p>

                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={handleResetAttempt}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Tentar Novamente</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Cancellation Notice */}
              {holdCancelledMessage && !partnerMissingAlert && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{holdCancelledMessage}</span>
                </div>
              )}

              {/* The Two Buttons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* BUTTON 1: Eduardo 5-Second Hold Button */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-300 px-1 font-bold">
                    <span>Usuário Ativo: <strong className="text-sky-300">Eduardo Mateus</strong></span>
                    <span className="font-mono text-sky-400">
                      {isHolding ? `${secondsRemaining}s restantes` : 'Segure 5.0s'}
                    </span>
                  </div>

                  <button
                    id="btn-eduardo-hold-unlock"
                    onMouseDown={startHold}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    onTouchStart={startHold}
                    onTouchEnd={stopHold}
                    disabled={partnerMissingAlert}
                    className={`relative w-full py-4 px-5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-xl transition-all select-none overflow-hidden cursor-pointer border ${
                      partnerMissingAlert
                        ? 'bg-slate-800 text-slate-500 border-slate-700 opacity-60 cursor-not-allowed'
                        : isHolding
                        ? 'bg-sky-700 border-sky-400 scale-[0.99]'
                        : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 border-sky-400/40 hover:border-sky-300 active:scale-[0.98]'
                    }`}
                  >
                    {/* Dynamic Progress Fill Bar */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 opacity-30 transition-all duration-75 pointer-events-none"
                      style={{ width: `${holdProgress}%` }}
                    />

                    {/* High-visibility bottom indicator line */}
                    <div
                      className="absolute bottom-0 left-0 h-1.5 bg-sky-300 transition-all duration-75"
                      style={{ width: `${holdProgress}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-center gap-2.5">
                      <Snowflake
                        className={`w-4 h-4 text-sky-200 ${isHolding ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '2s' }}
                      />
                      <span>
                        {isHolding
                          ? `Segurando... ${Math.round(holdProgress)}% (${secondsRemaining}s)`
                          : 'Aperte e Segure por 5s para Liberar'}
                      </span>
                    </div>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Mantenha pressionado pelos 5 segundos completos.
                  </p>
                </div>

                {/* BUTTON 2: Status Button */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-bold">
                    <span>Vínculo de Estudos: <strong className="text-slate-300">Individual (Sem Dupla)</strong></span>
                    <span className="text-rose-400 text-[10px] uppercase font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Inativo
                    </span>
                  </div>

                  <button
                    id="btn-partner-waiting-dark"
                    onClick={handlePartnerButtonClick}
                    className={`w-full py-4 px-5 rounded-2xl font-bold text-xs sm:text-sm text-slate-400 bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                      partnerNoticeShake ? 'animate-bounce border-rose-500/50 text-rose-300' : ''
                    }`}
                    title="Status da Conta"
                  >
                    <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="truncate">Aguardando autorização da coordenação...</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Status: Estudante individual sem dupla vinculada no momento.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Ranking Preview */}
            <div className="w-full rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl p-6 backdrop-blur-md space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-black mb-1">
                    <Award className="w-3 h-3" />
                    Classificação Oficial TJAM 2026
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-400" />
                    Quadro Geral de Classificação do Curso
                  </h4>
                  <p className="text-xs text-slate-400">
                    Posição homologada de <strong>Eduardo Mateus</strong> após a conclusão do simulado de 80 questões.
                  </p>
                </div>

                {/* SubTab Toggle */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
                  <button
                    type="button"
                    onClick={() => setRankingSubTab('duplas')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      rankingSubTab === 'duplas'
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Ranking Duplas (5º • 30,0% Dupla Oficial)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRankingSubTab('individual')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      rankingSubTab === 'individual'
                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Ranking Individual (2º • 83,8%)</span>
                  </button>
                </div>
              </div>

              {/* Two Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    rankingSubTab === 'duplas'
                      ? 'bg-amber-950/40 border-amber-500/50 ring-2 ring-amber-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                  onClick={() => setRankingSubTab('duplas')}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Ranking das Duplas (Eduardo & Pedro)
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-amber-600 text-white font-black text-xs">
                      5º Lugar
                    </span>
                  </div>
                  <div className="text-xl font-black text-white">30,0% de Aproveitamento</div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    A dupla oficial <strong>Eduardo Mateus & Pedro Henrique</strong> garantiu a 5ª colocação geral com 30,0%!
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    rankingSubTab === 'individual'
                      ? 'bg-sky-950/40 border-sky-500/50 ring-2 ring-sky-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                  onClick={() => setRankingSubTab('individual')}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black uppercase text-sky-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Ranking Individual do Simulado
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-200 text-slate-950 font-black text-xs">
                      2º Lugar
                    </span>
                  </div>
                  <div className="text-xl font-black text-white">83,8% de Aproveitamento</div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Eduardo acertou <strong>67 de 80 questões</strong> no simulado e é o 2º colocado individual geral!
                  </p>
                </div>
              </div>

              {/* Ranking List */}
              <div className="space-y-2">
                {rankingSubTab === 'duplas' ? (
                  duplasRanking.map((item) => (
                    <div
                      key={item.rank}
                      className={`px-4 py-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${item.bgClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${item.badgeClass}`}>
                          {item.rank}º
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">
                              {item.name}
                            </span>
                            {item.isUser && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black">
                                Sua Dupla Oficial (5º Lugar)
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block">
                            {item.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-24 bg-slate-800 h-2.5 rounded-full overflow-hidden hidden sm:block">
                          <div className={`h-full rounded-full ${item.barClass}`} style={{ width: item.barWidth }} />
                        </div>
                        <span className="font-mono font-black text-sm text-amber-300">{item.score}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  individualRanking.map((item) => (
                    <div
                      key={item.rank}
                      className={`px-4 py-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${item.bgClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${item.badgeClass}`}>
                          {item.rank}º
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">
                              {item.name}
                            </span>
                            {item.isUser && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black">
                                Você (2º Lugar)
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block font-mono">
                            {item.correctCount} acertos
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-24 bg-slate-800 h-2.5 rounded-full overflow-hidden hidden sm:block">
                          <div className={`h-full rounded-full ${item.barClass}`} style={{ width: item.barWidth }} />
                        </div>
                        <span className="font-mono font-black text-sm text-emerald-300">{item.score}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-4 text-center text-[11px] text-slate-400 bg-slate-950">
        <p>TJAM Estudos 2026 • Modo Oculto de Preparação do Simulado de 80 Questões</p>
      </footer>

      {/* Full Gabarito Modal (1 a 80) */}
      {showGabaritoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black">Gabarito Oficial Completo (1 a 80)</h3>
                  <p className="text-xs text-slate-400">80 Questões estruturadas por disciplina</p>
                </div>
              </div>
              <button
                onClick={() => setShowGabaritoModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Gabarito Grid 8x10 */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {Array.from({ length: 80 }, (_, i) => i + 1).map((qNum) => {
                  let discName = 'Proc. Civil';
                  let discColor = 'border-amber-500/30 text-amber-300';
                  if (qNum >= 11 && qNum <= 20) { discName = 'Proc. Penal'; discColor = 'border-rose-500/30 text-rose-300'; }
                  else if (qNum >= 21 && qNum <= 30) { discName = 'Leg. TJAM'; discColor = 'border-sky-500/30 text-sky-300'; }
                  else if (qNum >= 31 && qNum <= 40) { discName = 'Geografia'; discColor = 'border-emerald-500/30 text-emerald-300'; }
                  else if (qNum >= 41 && qNum <= 50) { discName = 'Const.'; discColor = 'border-indigo-500/30 text-indigo-300'; }
                  else if (qNum >= 51 && qNum <= 60) { discName = 'Inform.'; discColor = 'border-cyan-500/30 text-cyan-300'; }
                  else if (qNum >= 61 && qNum <= 70) { discName = 'Português'; discColor = 'border-violet-500/30 text-violet-300'; }
                  else if (qNum >= 71 && qNum <= 80) { discName = 'Adm.'; discColor = 'border-teal-500/30 text-teal-300'; }

                  return (
                    <div
                      key={qNum}
                      className={`p-2 rounded-xl bg-slate-950 border ${discColor} text-center flex flex-col items-center justify-between`}
                    >
                      <span className="text-[10px] text-slate-400 font-mono">Q{qNum}</span>
                      <span className="text-sm font-black font-mono my-0.5 text-white">
                        {SIMULADO_80_QUESTOES_GABARITO[qNum]}
                      </span>
                      <span className="text-[8px] uppercase tracking-tighter text-slate-500 truncate w-full">
                        {discName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Total: 80 Questões com gabarito conferido</span>
              <button
                onClick={() => setShowGabaritoModal(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Passcode Unlock Modal for Teachers / Admins */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black">Desbloquear por Senha de Professor</h3>
                <p className="text-xs text-slate-400">Insira a senha docente para liberar o acesso imediato.</p>
              </div>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Senha do Professor / Administrador:
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Digite 'admin', 'prof2026' ou 'admin2026'..."
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              {passcodeError && (
                <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passcodeError}</span>
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasscodeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-md cursor-pointer"
                >
                  Confirmar Acesso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
