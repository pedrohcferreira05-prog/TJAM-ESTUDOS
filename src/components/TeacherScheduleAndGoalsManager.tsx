import React, { useState } from 'react';
import {
  Calendar,
  Target,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  BookOpen,
  Save,
  X,
  Sparkles,
  ListTodo,
} from 'lucide-react';
import { WeeklyScheduleItem, Discipline } from '../types';

interface TeacherScheduleAndGoalsManagerProps {
  schedule: WeeklyScheduleItem[];
  disciplines: Discipline[];
  weeklyGoals: Array<{ id: string; text: string; completed: boolean }>;
  onAddGoal: (text: string) => void;
  onUpdateGoal: (id: string, text: string) => void;
  onDeleteGoal: (id: string) => void;
  onToggleGoal?: (id: string) => void;
  onAddTaskToDay: (dayOfWeek: string, taskText: string, disciplineId?: string) => void;
  onUpdateDayTask: (scheduleId: string, taskIndex: number, newText: string) => void;
  onDeleteDayTask: (scheduleId: string, taskIndex: number) => void;
  isDarkMode?: boolean;
}

export const TeacherScheduleAndGoalsManager: React.FC<TeacherScheduleAndGoalsManagerProps> = ({
  schedule,
  disciplines,
  weeklyGoals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onToggleGoal,
  onAddTaskToDay,
  onUpdateDayTask,
  onDeleteDayTask,
}) => {
  const [activeSection, setActiveSection] = useState<'metas' | 'cronograma'>('metas');
  const [selectedDay, setSelectedDay] = useState<string>('Segunda');

  // Add Goal State
  const [newGoalText, setNewGoalText] = useState('');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  // Edit Goal State
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editGoalText, setEditGoalText] = useState('');

  // Add Day Task State
  const [isAddingDayTask, setIsAddingDayTask] = useState(false);
  const [newDayTaskText, setNewDayTaskText] = useState('');
  const [selectedDiscForTask, setSelectedDiscForTask] = useState(disciplines[0]?.id || '');

  // Edit Day Task State
  const [editingTaskKey, setEditingTaskKey] = useState<{ scheduleId: string; index: number } | null>(null);
  const [editTaskText, setEditTaskText] = useState('');

  const currentScheduleItem = schedule.find((s) => s.dayOfWeek === selectedDay) || schedule[0];

  const handleSaveNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    onAddGoal(newGoalText.trim());
    setNewGoalText('');
    setIsAddingGoal(false);
  };

  const handleSaveEditGoal = (id: string) => {
    if (!editGoalText.trim()) return;
    onUpdateGoal(id, editGoalText.trim());
    setEditingGoalId(null);
  };

  const handleSaveNewDayTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDayTaskText.trim()) return;
    onAddTaskToDay(selectedDay, newDayTaskText.trim(), selectedDiscForTask);
    setNewDayTaskText('');
    setIsAddingDayTask(false);
  };

  const handleSaveEditDayTask = (scheduleId: string, index: number) => {
    if (!editTaskText.trim()) return;
    onUpdateDayTask(scheduleId, index, editTaskText.trim());
    setEditingTaskKey(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Target className="w-3.5 h-3.5 text-amber-600" /> Paridade Total com o Portal do Aluno
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
            Gestão de Metas Diárias & Cronograma de Estudos TJAM
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Aqui você administra as metas que aparecem em "Metas de Hoje" no painel principal do aluno, assim como a divisão de tarefas por dia da semana (Segunda a Domingo) no cronograma oficial.
          </p>
        </div>

        {/* Section Pill Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveSection('metas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeSection === 'metas'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metas de Hoje ({weeklyGoals.length})
          </button>
          <button
            onClick={() => setActiveSection('cronograma')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeSection === 'cronograma'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cronograma Semanal (7 Dias)
          </button>
        </div>
      </div>

      {/* SECTION 1: METAS DE HOJE */}
      {activeSection === 'metas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-amber-600" /> Metas de Estudo Publicadas para os Alunos
              </h3>
              <p className="text-xs text-slate-500">
                Estas metas aparecem na caixa de marcação diária no Dashboard dos alunos.
              </p>
            </div>

            <button
              onClick={() => setIsAddingGoal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Nova Meta
            </button>
          </div>

          {/* Add Goal Form */}
          {isAddingGoal && (
            <form
              onSubmit={handleSaveNewGoal}
              className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-xs"
            >
              <input
                type="text"
                required
                placeholder="Ex: Resolver 30 questões de Licitações (Lei 14.133) no modo FGV..."
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-xs text-slate-900 font-semibold outline-none focus:border-amber-600"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all"
                >
                  Salvar Meta
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingGoal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-all"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Goals List */}
          <div className="space-y-2.5">
            {weeklyGoals.map((goal, idx) => {
              const isEditingThisGoal = editingGoalId === goal.id;

              if (isEditingThisGoal) {
                return (
                  <div
                    key={goal.id}
                    className="p-3 rounded-2xl bg-amber-50 border border-amber-400 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={editGoalText}
                      onChange={(e) => setEditGoalText(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEditGoal(goal.id)}
                      className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" /> Salvar
                    </button>
                    <button
                      onClick={() => setEditingGoalId(null)}
                      className="px-3 py-2 rounded-xl bg-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={goal.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {goal.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setEditingGoalId(goal.id);
                        setEditGoalText(goal.text);
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-all cursor-pointer"
                      title="Editar meta"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remover esta meta? "${goal.text}"`)) {
                          onDeleteGoal(goal.id);
                        }
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                      title="Excluir meta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: CRONOGRAMA SEMANAL */}
      {activeSection === 'cronograma' && (
        <div className="space-y-6">
          {/* Days of Week Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {schedule.map((item) => {
              const isSelected = selectedDay === item.dayOfWeek;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedDay(item.dayOfWeek)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-black scale-[1.02]'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 font-bold'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider opacity-80">{item.dayOfWeek}</div>
                  <div className="text-xs mt-0.5">{item.tasks.length} tarefas</div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Manager Card */}
          {currentScheduleItem && (
            <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
                    Edição do Cronograma Oficial TJAM
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    Planejamento de {currentScheduleItem.dayOfWeek}
                  </h3>
                </div>

                <button
                  onClick={() => setIsAddingDayTask(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Adicionar Tarefa para {currentScheduleItem.dayOfWeek}
                </button>
              </div>

              {/* Add Task Form */}
              {isAddingDayTask && (
                <form
                  onSubmit={handleSaveNewDayTask}
                  className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Ex: Assistir Aula 1 de Processo Penal e responder 15 questões..."
                      value={newDayTaskText}
                      onChange={(e) => setNewDayTaskText(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 outline-none focus:border-amber-500"
                      autoFocus
                    />

                    <select
                      value={selectedDiscForTask}
                      onChange={(e) => setSelectedDiscForTask(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 outline-none"
                    >
                      {disciplines.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingDayTask(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
                    >
                      Salvar no Cronograma
                    </button>
                  </div>
                </form>
              )}

              {/* Tasks List */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Tarefas Programadas para este dia ({currentScheduleItem.tasks.length}):
                </h4>

                {currentScheduleItem.tasks.length > 0 ? (
                  currentScheduleItem.tasks.map((task, idx) => {
                    const isEditing =
                      editingTaskKey?.scheduleId === currentScheduleItem.id &&
                      editingTaskKey?.index === idx;

                    if (isEditing) {
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={editTaskText}
                            onChange={(e) => setEditTaskText(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEditDayTask(currentScheduleItem.id, idx)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                            title="Salvar"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingTaskKey(null)}
                            className="p-1.5 rounded-lg bg-slate-300 text-slate-700 hover:bg-slate-400"
                            title="Cancelar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 font-black text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-900">{task}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingTaskKey({ scheduleId: currentScheduleItem.id, index: idx });
                              setEditTaskText(task);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-all cursor-pointer"
                            title="Editar tarefa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remover tarefa "${task}" de ${currentScheduleItem.dayOfWeek}?`)) {
                                onDeleteDayTask(currentScheduleItem.id, idx);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Excluir tarefa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Nenhuma tarefa específica programada para este dia ainda.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
