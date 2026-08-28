import React, { useState, useEffect, useRef } from 'react';
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
  UserX,
  Volume2
} from 'lucide-react';
import { Simulado, UserProgress, SimuladoAttempt } from '../types';
import { SnowfallEffect } from './SnowfallEffect';

interface SiteLockedViewProps {
  isDarkMode: boolean;
  simulados?: Simulado[];
  progress?: UserProgress;
  onSaveSimuladoAttempt?: (attempt: SimuladoAttempt) => void;
  onToggleDarkMode?: () => void;
  onUnlockSite?: () => void;
}

export const SiteLockedView: React.FC<SiteLockedViewProps> = ({
  isDarkMode = true,
  onUnlockSite,
}) => {
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
        // Completed 5 seconds!
        if (holdIntervalRef.current) {
          clearInterval(holdIntervalRef.current);
          holdIntervalRef.current = null;
        }
        setIsHolding(false);
        setHoldProgress(100);
        // Show partner unavailable alert
        setPartnerMissingAlert(true);
      }
    }, 40);
  };

  // Handle Hold Stop / Cancel (Mouse Up / Touch End / Mouse Leave)
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
    const clean = passcode.trim();
    if (clean === 'admin2026' || clean === 'tjam2026' || clean === 'admin' || clean === 'prof2026' || clean === 'desbloquear') {
      setShowPasscodeModal(false);
      setPasscode('');
      setPasscodeError('');
      if (onUnlockSite) onUnlockSite();
    } else {
      setPasscodeError('Senha incorreta! Apenas administradores ou professores podem desbloquear.');
    }
  };

  const duplasRanking = [
    { rank: 1, name: 'Lucas Silveira & Mariana Costa', score: '6,0%', isUser: false, bgClass: 'bg-slate-900/60 border-slate-800/80', badgeClass: 'bg-amber-500 text-slate-950 font-black', barClass: 'bg-amber-500', barWidth: '100%' },
    { rank: 2, name: 'Gabriel Souza & Sofia Albuquerque', score: '5,7%', isUser: false, bgClass: 'bg-slate-900/60 border-slate-800/80', badgeClass: 'bg-slate-700 text-slate-300', barClass: 'bg-slate-500', barWidth: '95%' },
    { rank: 3, name: 'Matheus Ribeiro & Beatriz Lima', score: '5,4%', isUser: false, bgClass: 'bg-slate-900/60 border-slate-800/80', badgeClass: 'bg-slate-700 text-slate-300', barClass: 'bg-slate-500', barWidth: '90%' },
    { rank: 12, name: 'Eduardo Mateus', score: '3,4%', isUser: true, bgClass: 'bg-sky-950/40 border-sky-500/30 ring-1 ring-sky-500/20', badgeClass: 'bg-sky-600 text-white shadow-md shadow-sky-500/20', barClass: 'bg-sky-400', barWidth: '56.7%' },
  ];

  const secondsRemaining = Math.max(0, ((REQUIRED_HOLD_MS - holdTimeElapsed) / 1000)).toFixed(1);

  return (
    <div
      id="site-locked-gate-panel"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-sky-500/30 font-sans"
    >
      <SnowfallEffect />

      {/* Top Bar with Status & Admin Unlock */}
      <header className="w-full border-b border-slate-800/90 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-300 shadow-sm">
              <Snowflake className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white flex items-center gap-2">
                TJAM Estudos 2026
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Conta Inativa
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Portal de Acesso e Verificação da Dupla
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
              <span className="hidden sm:inline">Acesso Professor</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col justify-center items-center z-10 space-y-6">
        
        {/* Frosty Mascot + Inactivation Information Card */}
        <div className="w-full rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          
          {/* Subtle Ambient Ice Glow in background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative z-10">
            
            {/* Frosty Character Vector Display */}
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
              <span className="text-[10px] text-slate-400 font-semibold mt-3">Mascote Oficial</span>
            </div>

            {/* Inactivation Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Conta Inativa por Falta de Interesse</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Acesso aos Estudos do TJAM Bloqueado
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Esta conta da dupla <strong className="text-white">Pedro & Eduardo</strong> foi inativada pelo sistema por <strong className="text-rose-300">falta de interesse</strong> e ausência de entrega dos exercícios e simulados programados. A sequência de estudos caiu para <strong className="text-sky-300">0 dias</strong>.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  <span>Dupla: <strong>Pedro & Eduardo</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <Flame className="w-3.5 h-3.5 text-slate-500 line-through" />
                  <span>Sequência: <strong className="text-rose-400">0 Dias</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Posição: <strong>12º Lugar (3,4%)</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Panel with the Two Required Buttons */}
        <div className="w-full rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-sky-400" />
              Painel de Desbloqueio da Dupla
            </h3>
            <p className="text-xs text-slate-400">
              Para tentar liberar a página, o usuário <strong>Eduardo</strong> deve pressionar e segurar o botão por 5 segundos.
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
                    Seu parceiro de estudos <strong>(Pedro)</strong> não está disponível no momento.
                  </p>
                </div>
              </div>

              <p className="text-xs text-rose-200/80 bg-rose-950/70 p-2.5 rounded-xl border border-rose-500/20 leading-relaxed">
                A liberação do sistema requer a presença e validação simultânea de ambos os integrantes da dupla. Enquanto Pedro estiver ausente, as aulas e o painel continuam congelados.
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
                Mantenha o clique ou toque pressionado sem soltar até completar 100%.
              </p>
            </div>

            {/* BUTTON 2: Darker Partner Status Button ("Esperando seu parceiro de estudos") */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-bold">
                <span>Parceiro de Estudos: <strong className="text-slate-300">Pedro</strong></span>
                <span className="text-rose-400 text-[10px] uppercase font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Offline
                </span>
              </div>

              <button
                id="btn-partner-waiting-dark"
                onClick={handlePartnerButtonClick}
                className={`w-full py-4 px-5 rounded-2xl font-bold text-xs sm:text-sm text-slate-400 bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  partnerNoticeShake ? 'animate-bounce border-rose-500/50 text-rose-300' : ''
                }`}
                title="Status do Parceiro de Estudos"
              >
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="truncate">Esperando seu parceiro de estudos...</span>
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Status: Pedro não se conectou hoje para validar o acesso da dupla.
              </p>
            </div>

          </div>
        </div>

        {/* Live Duplas Ranking Preview */}
        <div className="w-full rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl p-5 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              Classificação Geral do Curso
            </h4>
            <span className="text-[10px] font-bold text-slate-400">Preparatório TJAM 2026</span>
          </div>

          <div className="space-y-2">
            {duplasRanking.map((item) => (
              <div
                key={item.rank}
                className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${item.bgClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center ${item.badgeClass}`}>
                    {item.rank}º
                  </span>
                  <span className="font-bold text-white">
                    {item.name}
                  </span>
                  {item.isUser && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold uppercase">
                      Sem Dupla (Você)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div className={`h-full rounded-full ${item.barClass}`} style={{ width: item.barWidth }} />
                  </div>
                  <span className="font-mono font-bold text-slate-300">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-4 text-center text-[11px] text-slate-400 bg-slate-950">
        <p>TJAM Estudos Preparatório 2026 • Painel de Bloqueio e Presença da Dupla</p>
      </footer>

      {/* Passcode Unlock Modal */}
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
                  Senha do Professor:
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Digite 'admin' ou 'admin2026'..."
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
