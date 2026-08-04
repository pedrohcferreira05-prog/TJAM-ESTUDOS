import React, { useState } from 'react';
import { WeeklyScheduleItem, Discipline } from '../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ChevronRight,
  Flame,
  Zap,
  Target
} from 'lucide-react';

interface StudyScheduleViewProps {
  schedule: WeeklyScheduleItem[];
  disciplines: Discipline[];
  onToggleScheduleTask: (scheduleId: string) => void;
  onSelectDiscipline: (disciplineId: string) => void;
  onOpenAIAssistant: (prompt?: string) => void;
  isDarkMode: boolean;
}

export const StudyScheduleView: React.FC<StudyScheduleViewProps> = ({
  schedule,
  disciplines,
  onToggleScheduleTask,
  onSelectDiscipline,
  onOpenAIAssistant,
  isDarkMode,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Segunda');

  const activeScheduleItem = schedule.find((s) => s.dayOfWeek === selectedDay) || schedule[0];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Cronograma de Estudos Semanal</h2>
          <p className="text-xs text-slate-500 mt-1">
            Planejamento estruturado por dia da semana otimizado para o edital do TJAM
          </p>
        </div>

        <button
          onClick={() =>
            onOpenAIAssistant(
              'Analise meu cronograma semanal e sugira melhorias com base nas minhas disciplinas de maior peso no TJAM.'
            )
          }
          className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Otimizar Cronograma com IA
        </button>
      </div>

      {/* Days of Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {schedule.map((item) => {
          const isSelected = selectedDay === item.dayOfWeek;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedDay(item.dayOfWeek)}
              className={`p-3.5 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20 font-extrabold scale-[1.02]'
                  : isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-80">{item.dayOfWeek}</div>
              <div className="text-xs font-bold mt-1 flex items-center justify-center gap-1">
                {item.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
                <span>{item.disciplineIds.length} matérias</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Details Panel */}
      {activeScheduleItem && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  Dia de Estudo Programado
                </span>
                <h3 className="text-xl font-extrabold">{activeScheduleItem.dayOfWeek}</h3>
              </div>
            </div>

            <button
              onClick={() => onToggleScheduleTask(activeScheduleItem.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeScheduleItem.completed
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {activeScheduleItem.completed ? 'Dia Concluído com Sucesso' : 'Marcar Dia como Concluído'}
            </button>
          </div>

          {/* Disciplines assigned to this day */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-slate-500 uppercase">Disciplinas Agendadas para Hoje:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeScheduleItem.disciplineIds.map((discId) => {
                const disc = disciplines.find((d) => d.id === discId);
                if (!disc) return null;
                return (
                  <div
                    key={disc.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">#{disc.order} {disc.code}</span>
                        <h5 className="font-bold text-xs">{disc.name}</h5>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectDiscipline(disc.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1"
                    >
                      Estudar <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Routine Checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-sm text-slate-500 uppercase">Roteiro Sugerido de Estudo:</h4>
            <div className="space-y-2">
              {activeScheduleItem.tasks.map((task, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-semibold ${
                    isDarkMode ? 'bg-slate-800/30 border-slate-700/60' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 font-extrabold">
                    {idx + 1}
                  </div>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
