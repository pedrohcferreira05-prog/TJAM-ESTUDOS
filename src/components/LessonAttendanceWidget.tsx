import React, { useState, useEffect } from 'react';
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
}

export const LessonAttendanceWidget: React.FC<LessonAttendanceWidgetProps> = ({
  lessonId,
  subjectTitle,
  currentUserSession,
  onNavigateSubject,
  isDarkMode = false,
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

  // Sync with global custom event
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const key = activeUserId === 'id00120087' ? 'tjam_user_progress' : `tjam_user_progress_${activeUserId}`;
        const raw = localStorage.getItem(key) || localStorage.getItem('tjam_user_progress');
        if (raw) {
          setProgress(JSON.parse(raw));
        }
      } catch (e) {}
    };

    window.addEventListener('tjam_attendance_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('tjam_attendance_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [activeUserId]);

  const attendanceInfo = getLessonAttendanceStatus(progress, lessonId);
  const overview = getTodayAttendanceOverview(progress);

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
    setCelebrationMessage('🟢 Presença de início registrada com sucesso! O relógio está cronometrando seu tempo de aula.');
    setTimeout(() => setCelebrationMessage(null), 5000);
  };

  // Handle Finish
  const handleEndAttendance = () => {
    const { updatedProgress, completedThreeAllToday, addedSeconds } = endLessonAttendance(lessonId, activeUserId);
    setProgress(updatedProgress);

    if (completedThreeAllToday) {
      setCelebrationMessage(
        `🎉 PARABÉNS! Você marcou presença e encerrou as 3 aulas de hoje! Meta concluída com sucesso e +1 dia consecutivo de estudo adicionado! (Sequência: ${updatedProgress.streakDays} dias)`
      );
    } else {
      const durText = formatDurationHMS(addedSeconds);
      setCelebrationMessage(
        `✅ Presença final registrada! ${durText} foram somados ao seu Tempo de Hoje com sucesso.`
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

            {/* Buttons */}
            {attendanceInfo.status !== 'in_progress' && attendanceInfo.status !== 'completed' && (
              <button
                type="button"
                onClick={handleStartAttendance}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Pressione para Marcar Início da Aula</span>
              </button>
            )}

            {attendanceInfo.status === 'in_progress' && (
              <button
                type="button"
                onClick={handleEndAttendance}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer animate-pulse"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Pressione para Concluir & Marcar Presença Final</span>
              </button>
            )}

            {attendanceInfo.status === 'completed' && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Presença Final Registrada ({formatDurationHMS(attendanceInfo.durationSeconds)})</span>
                </div>

                <button
                  type="button"
                  onClick={handleStartAttendance}
                  title="Continuar estudando e somar mais tempo nesta aula"
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retomar Aula</span>
                </button>
              </div>
            )}
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
