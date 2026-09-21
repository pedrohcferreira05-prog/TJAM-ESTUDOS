import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  Flame,
  Trophy,
  RotateCcw,
  Sparkles,
  BookOpen,
  Lock,
  Video,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { UserProgress, AuthSession } from '../types';
import {
  startLessonAttendance,
  endLessonAttendance,
  formatDigitalClock,
  formatDurationHMS,
  getLessonAttendanceStatus,
  getTodayAttendanceOverview,
  TODAY_MANDATORY_LESSONS,
} from '../lib/attendanceService';

interface LessonAttendanceWidgetProps {
  lessonId: string;
  subjectTitle: string;
  currentUserSession?: AuthSession | null;
  onNavigateSubject?: (subjectKey: string) => void;
  isDarkMode?: boolean;
  hasAnsweredQuestions?: boolean;
  hasWatchedVideo?: boolean;
  answeredQuestionsCount?: number;
  totalQuestionsCount?: number;
  onGoToVideoTab?: () => void;
  onGoToQuestionsTab?: () => void;
  onToggleVideoWatched?: () => void;
}

const HOLD_DURATION_MS = 5000; // 5 segundos obrigatórios de pressão

export const LessonAttendanceWidget: React.FC<LessonAttendanceWidgetProps> = ({
  lessonId,
  subjectTitle,
  currentUserSession,
  onNavigateSubject,
  isDarkMode = false,
  hasAnsweredQuestions,
  hasWatchedVideo,
  answeredQuestionsCount,
  totalQuestionsCount = 20,
  onGoToVideoTab,
  onGoToQuestionsTab,
  onToggleVideoWatched,
}) => {
  const activeUserId = currentUserSession?.id || 'id00120087';

  // Read progress from local storage / event
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const key = activeUserId === 'id00120087' ? 'tjam_user_progress' : `tjam_user_progress_${activeUserId}`;
      const raw = localStorage.getItem(key) || localStorage.getItem('tjam_user_progress');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      dailyGoalHours: 4,
      hoursStudiedToday: 0,
      totalHoursStudied: 0,
      streakDays: 0,
      lastStudiedDate: new Date().toISOString(),
      targetExamDate: '2026-11-15',
      completedTopicIds: [],
      studiedMapIds: [],
      favoriteMapIds: [],
      favoriteFlashcardIds: [],
      errorQuestionIds: [],
      questionAttempts: [],
      flashcardReviews: {},
      personalNotes: {},
      nodeNotes: {},
      simuladoAttempts: [],
      reviewQueue: [],
      weeklyGoals: [],
    };
  });

  const [activeSeconds, setActiveSeconds] = useState<number>(0);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  // States for the 5-second hold requirement
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [holdSecondsLeft, setHoldSecondsLeft] = useState<number>(5);
  const [holdWarning, setHoldWarning] = useState<string | null>(null);
  const holdIntervalRef = useRef<number | null>(null);
  const holdStartTimeRef = useRef<number>(0);

  // Local fallback check for questions and video watched in case props are not passed
  const [localAnsweredCount, setLocalAnsweredCount] = useState<number>(0);
  const [localVideoWatched, setLocalVideoWatched] = useState<boolean>(false);

  const checkLocalLessonStatus = () => {
    try {
      const key = activeUserId === 'id00120087' ? 'tjam_lessons_progress' : `tjam_lessons_progress_${activeUserId}`;
      const raw = localStorage.getItem(key) || localStorage.getItem('tjam_lessons_progress');
      if (raw) {
        const store = JSON.parse(raw);
        const data = store[lessonId] || {};
        const count =
          Object.keys(data.selectedAnswers || {}).length +
          Object.keys(data.tfAnswers || {}).length +
          Object.keys(data.discursiveAnswers || {}).length;
        setLocalAnsweredCount(count);
        setLocalVideoWatched(!!data.videoWatched);
      }
    } catch (e) {}
  };

  useEffect(() => {
    checkLocalLessonStatus();
  }, [lessonId, activeUserId]);

  // Sync with global custom event
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const key = activeUserId === 'id00120087' ? 'tjam_user_progress' : `tjam_user_progress_${activeUserId}`;
        const raw = localStorage.getItem(key) || localStorage.getItem('tjam_user_progress');
        if (raw) {
          setProgress(JSON.parse(raw));
        }
        checkLocalLessonStatus();
      } catch (e) {}
    };

    window.addEventListener('tjam_attendance_updated', handleUpdate);
    window.addEventListener('tjam_lesson_progress_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('tjam_attendance_updated', handleUpdate);
      window.removeEventListener('tjam_lesson_progress_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [activeUserId, lessonId]);

  const attendanceInfo = getLessonAttendanceStatus(progress, lessonId);
  const overview = getTodayAttendanceOverview(progress);

  // Resolve whether criteria are satisfied
  const isVideoDone = hasWatchedVideo !== undefined ? hasWatchedVideo : localVideoWatched;
  const isQuestionsDone =
    hasAnsweredQuestions !== undefined
      ? hasAnsweredQuestions
      : (answeredQuestionsCount !== undefined ? answeredQuestionsCount > 0 : localAnsweredCount > 0);
  const currentAnsweredCount = answeredQuestionsCount !== undefined ? answeredQuestionsCount : localAnsweredCount;

  // The End Lesson button can ONLY appear if both conditions are met!
  const canEndLesson = isVideoDone && isQuestionsDone;

  // Real-time clock interval when active
  useEffect(() => {
    if (!attendanceInfo.isCurrentlyActive || !attendanceInfo.startedAt) {
      setActiveSeconds(attendanceInfo.durationSeconds || 0);
      return;
    }

    const startedTime = new Date(attendanceInfo.startedAt).getTime();
    const updateElapsed = () => {
      const now = Date.now();
      const elapsed = Math.max(0, Math.floor((now - startedTime) / 1000));
      setActiveSeconds(elapsed);
    };

    updateElapsed();
    const timer = setInterval(updateElapsed, 1000);
    return () => clearInterval(timer);
  }, [attendanceInfo.isCurrentlyActive, attendanceInfo.startedAt, attendanceInfo.durationSeconds]);

  // Handle Start
  const handleStartAttendance = () => {
    const updated = startLessonAttendance(lessonId, subjectTitle, activeUserId);
    setProgress(updated);
    setCelebrationMessage('🟢 Presença de início confirmada com sucesso! O relógio está cronometrando sua frequência.');
    setTimeout(() => setCelebrationMessage(null), 5000);
  };

  // Hold-to-Start 5-Second Handlers
  const startHold = (e: React.SyntheticEvent) => {
    // Prevent starting hold if already in progress or completed
    if (attendanceInfo.status === 'in_progress') return;

    // Clear any previous interval
    if (holdIntervalRef.current) {
      window.clearInterval(holdIntervalRef.current);
    }

    setHoldWarning(null);
    holdStartTimeRef.current = Date.now();
    setIsHolding(true);
    setHoldProgress(0);
    setHoldSecondsLeft(5);

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progressPct = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      const secsRemaining = Math.max(0, Math.ceil((HOLD_DURATION_MS - elapsed) / 1000));

      setHoldProgress(progressPct);
      setHoldSecondsLeft(secsRemaining);

      if (elapsed >= HOLD_DURATION_MS) {
        if (holdIntervalRef.current) {
          window.clearInterval(holdIntervalRef.current);
          holdIntervalRef.current = null;
        }
        setIsHolding(false);
        setHoldProgress(100);
        setHoldSecondsLeft(0);

        // Haptic feedback if available
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try {
            navigator.vibrate([100, 50, 100]);
          } catch (e) {}
        }

        handleStartAttendance();
      }
    }, 40);
  };

  const cancelHold = () => {
    if (holdIntervalRef.current) {
      window.clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }

    if (isHolding) {
      if (holdProgress > 5 && holdProgress < 100) {
        setHoldWarning('⚠️ Mantenha o botão pressionado continuamente por 5 segundos para iniciar a aula.');
        setTimeout(() => setHoldWarning(null), 4000);
      }
      setIsHolding(false);
      setHoldProgress(0);
      setHoldSecondsLeft(5);
    }
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) {
        window.clearInterval(holdIntervalRef.current);
      }
    };
  }, []);

  // Handle Finish
  const handleEndAttendance = () => {
    if (!canEndLesson) {
      setCelebrationMessage('⚠️ Você precisa responder as questões e marcar a videoaula como assistida antes de encerrar!');
      setTimeout(() => setCelebrationMessage(null), 5000);
      return;
    }

    const { updatedProgress, completedThreeAllToday, addedSeconds } = endLessonAttendance(lessonId, activeUserId);
    setProgress(updatedProgress);

    if (completedThreeAllToday) {
      setCelebrationMessage(
        `🎉 PARABÉNS! Você marcou presença e encerrou as 3 aulas de hoje! Meta concluída com sucesso e +1 dia consecutivo de estudo adicionado! (Sequência: ${updatedProgress.streakDays} dias)`
      );
    } else {
      const durText = formatDurationHMS(addedSeconds);
      setCelebrationMessage(
        `✅ Presença final registrada com sucesso! ${durText} foram somados ao seu tempo hoje.`
      );
    }
    setTimeout(() => setCelebrationMessage(null), 9000);
  };

  return (
    <div className="w-full mb-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      {/* Top Banner Header */}
      <div className="px-4 sm:px-6 py-3.5 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                Controle de Frequência & Registro de Presença
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Obrigatório TJAM
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Marque o início e o final de cada aula para validar sua frequência e somar suas horas diárias.
            </p>
          </div>
        </div>

        {/* Global Progress across 3 lessons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs font-bold text-amber-300 border border-white/10">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{progress.streakDays || 1} dias seguidos</span>
          </div>
          <div className="text-xs font-bold text-slate-200">
            {overview.completedCount} de 3 aulas concluídas ({overview.percentComplete}%)
          </div>
        </div>
      </div>

      {/* Main Action Bar for Current Lesson */}
      <div className="p-4 sm:p-6 bg-slate-50/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Left: Current Lesson Status */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Presença da Aula Atual:
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                {subjectTitle}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {attendanceInfo.status === 'completed' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Presença Validada & Concluída
                </span>
              ) : attendanceInfo.status === 'in_progress' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Aula em Andamento • Presença de Início Registrada
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  Presença não iniciada para esta aula
                </span>
              )}

              {attendanceInfo.startedAt && (
                <span className="text-slate-500 dark:text-slate-400">
                  Iniciada às {new Date(attendanceInfo.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              )}
              {attendanceInfo.endedAt && (
                <span className="text-slate-500 dark:text-slate-400">
                  • Encerrada às {new Date(attendanceInfo.endedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>

          {/* Center/Right: Digital Clock & Action Button */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Clock display */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-inner">
              <Clock className={`w-5 h-5 ${attendanceInfo.isCurrentlyActive ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} style={{ animationDuration: '4s' }} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {attendanceInfo.isCurrentlyActive ? 'Tempo Decorrido' : 'Tempo da Aula'}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-300">
                  {attendanceInfo.isCurrentlyActive ? formatDigitalClock(activeSeconds) : formatDigitalClock(attendanceInfo.durationSeconds)}
                </span>
              </div>
            </div>

            {/* Buttons & Status Controller */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* 1. NOT STARTED: HOLD BUTTON FOR 5 SECONDS TO START */}
              {attendanceInfo.status !== 'in_progress' && attendanceInfo.status !== 'completed' && (
                <div className="flex flex-col gap-1.5">
                  <div className="relative group select-none">
                    <button
                      type="button"
                      onMouseDown={startHold}
                      onMouseUp={cancelHold}
                      onMouseLeave={cancelHold}
                      onTouchStart={startHold}
                      onTouchEnd={cancelHold}
                      onTouchCancel={cancelHold}
                      onContextMenu={(e) => e.preventDefault()}
                      className={`relative overflow-hidden flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all cursor-pointer select-none active:scale-[0.98] ${
                        isHolding
                          ? 'bg-emerald-700 ring-4 ring-emerald-400/50 shadow-emerald-500/30'
                          : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500'
                      }`}
                    >
                      {/* Live Animated Fill Progress Layer */}
                      <div
                        className="absolute inset-y-0 left-0 bg-emerald-400/40 transition-all duration-75 ease-linear pointer-events-none"
                        style={{ width: `${holdProgress}%` }}
                      />

                      {/* Icon & Label */}
                      <div className="relative z-10 flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isHolding ? 'bg-amber-400 text-slate-950 font-black animate-spin' : 'bg-white/20 text-white'}`}>
                          {isHolding ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </div>

                        <div className="flex flex-col text-left">
                          <span className="font-black tracking-tight text-xs sm:text-sm">
                            {isHolding
                              ? `Segurando... ${holdSecondsLeft}s restantes`
                              : 'Segure por 5s para Iniciar a Aula'}
                          </span>
                          <span className="text-[10px] text-emerald-100/90 font-medium">
                            {isHolding
                              ? `Mantenha pressionado: ${Math.round(holdProgress)}% concluído`
                              : 'Pressione e mantenha por 5 segundos'}
                          </span>
                        </div>
                      </div>

                      {/* Countdown Badge */}
                      <div className="relative z-10 px-2 py-1 rounded-lg bg-black/25 text-[11px] font-mono font-black text-amber-300 border border-white/10">
                        {isHolding ? `${holdSecondsLeft}s` : '5s'}
                      </div>
                    </button>
                  </div>

                  {/* Warning if released before 5 seconds */}
                  {holdWarning && (
                    <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 animate-pulse">
                      {holdWarning}
                    </div>
                  )}
                </div>
              )}

              {/* 2. IN PROGRESS: GATED END LESSON (CAN ONLY APPEAR AFTER QUESTIONS & VIDEO COMPLETED) */}
              {attendanceInfo.status === 'in_progress' && (
                <div className="flex flex-col gap-2">
                  {canEndLesson ? (
                    // Requisitos cumpridos: Botão de Encerrar Liberado!
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Requisitos concluídos (Vídeo + Questões)</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleEndAttendance}
                        className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 hover:from-rose-500 hover:to-emerald-500 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all transform active:scale-95 cursor-pointer animate-pulse"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                        <span>Pressione para Concluir & Encerrar Aula</span>
                      </button>
                    </div>
                  ) : (
                    // Bloqueado: Botão de Encerrar NÃO aparece. Exibe checklist de pendências!
                    <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-400/50 text-slate-800 dark:text-slate-200 text-xs space-y-2 max-w-md">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
                          <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>Encerramento de Aula Bloqueado</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                          2 Pendências
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                        O botão de encerrar aula só aparecerá após você cumprir ambos os requisitos:
                      </p>

                      <div className="space-y-1.5 pt-0.5">
                        {/* Requirement 1: Video Lesson Watched */}
                        <div
                          className={`flex items-center justify-between p-2 rounded-xl border text-[11px] ${
                            isVideoDone
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300 font-semibold'
                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800 dark:text-rose-300 font-semibold'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isVideoDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <Video className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            )}
                            <span>1. Marcar videoaula como assistida</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isVideoDone ? (
                              <span className="text-[10px] font-black text-emerald-600 uppercase">Feito ✓</span>
                            ) : (
                              <>
                                {onToggleVideoWatched ? (
                                  <button
                                    type="button"
                                    onClick={onToggleVideoWatched}
                                    className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700 cursor-pointer"
                                  >
                                    Marcar Agora
                                  </button>
                                ) : onGoToVideoTab ? (
                                  <button
                                    type="button"
                                    onClick={onGoToVideoTab}
                                    className="px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold hover:bg-slate-800 cursor-pointer"
                                  >
                                    Ir para Vídeo →
                                  </button>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Requirement 2: Questions Answered */}
                        <div
                          className={`flex items-center justify-between p-2 rounded-xl border text-[11px] ${
                            isQuestionsDone
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300 font-semibold'
                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800 dark:text-rose-300 font-semibold'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isQuestionsDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <HelpCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            )}
                            <span>
                              2. Responder as questões da aula{' '}
                              {currentAnsweredCount > 0 && `(${currentAnsweredCount} respondidas)`}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isQuestionsDone ? (
                              <span className="text-[10px] font-black text-emerald-600 uppercase">Feito ✓</span>
                            ) : (
                              onGoToQuestionsTab && (
                                <button
                                  type="button"
                                  onClick={onGoToQuestionsTab}
                                  className="px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold hover:bg-slate-800 cursor-pointer"
                                >
                                  Ir para Questões →
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. COMPLETED: BADGE & OPTION TO RESUME */}
              {attendanceInfo.status === 'completed' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Presença Final Registrada ({formatDurationHMS(attendanceInfo.durationSeconds)})</span>
                  </div>

                  <button
                    type="button"
                    onMouseDown={startHold}
                    onMouseUp={cancelHold}
                    onMouseLeave={cancelHold}
                    onTouchStart={startHold}
                    onTouchEnd={cancelHold}
                    onTouchCancel={cancelHold}
                    title="Segure por 5s para retomar aula"
                    className="relative overflow-hidden flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer select-none"
                  >
                    {isHolding && (
                      <div
                        className="absolute inset-y-0 left-0 bg-amber-400/40 transition-all duration-75 pointer-events-none"
                        style={{ width: `${holdProgress}%` }}
                      />
                    )}
                    <RotateCcw className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">
                      {isHolding ? `${holdSecondsLeft}s...` : 'Segure 5s p/ Retomar'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Celebration Toast / Alert */}
        {celebrationMessage && (
          <div className="mt-3.5 p-3 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-400 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{celebrationMessage}</span>
          </div>
        )}
      </div>

      {/* The 3 Daily Lessons Tracker Bar */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Grade das 3 Aulas do Dia (Segunda-feira)
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Conclua o início e fim das 3 aulas para validar a meta diária e somar dias consecutivos.
          </span>
        </div>

        {/* Cards for each of the 3 lessons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {TODAY_MANDATORY_LESSONS.map((item, idx) => {
            const isSelected = item.id === lessonId;
            const statusInfo = getLessonAttendanceStatus(progress, item.id);

            return (
              <div
                key={item.id}
                onClick={() => onNavigateSubject && onNavigateSubject(item.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-400/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      Aula {idx + 1} de 3
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                  </div>

                  {statusInfo.status === 'completed' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shrink-0">
                      ✓ Concluída
                    </span>
                  ) : statusInfo.status === 'in_progress' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse shrink-0">
                      ▶ Em Andamento
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 shrink-0">
                      Pendente
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span>
                    Tempo: {statusInfo.durationSeconds > 0 ? formatDurationHMS(statusInfo.durationSeconds) : '--'}
                  </span>
                  {isSelected ? (
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">Visualizando agora</span>
                  ) : (
                    <span className="text-slate-400 hover:text-indigo-600 transition-colors">Abrir aula →</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Congratulations Banner if All 3 are Completed */}
        {overview.allThreeCompleted && (
          <div className="mt-3 p-3.5 rounded-xl bg-linear-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 border border-emerald-400/40 text-emerald-950 dark:text-emerald-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-100">
                  🎉 Meta de Frequência do Dia Conquistada!
                </h4>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  Você registrou o início e fim das 3 aulas de hoje. Sua presença foi validada e a sequência de <strong className="font-black">{progress.streakDays} dias consecutivos</strong> foi atualizada!
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>{progress.streakDays} Dias Seguidos</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
