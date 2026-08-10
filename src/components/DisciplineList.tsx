import React, { useState } from 'react';
import { Discipline, UserProgress } from '../types';
import {
  BookOpen,
  Scale,
  Building2,
  FileText,
  ShieldAlert,
  Cpu,
  Landmark,
  Compass,
  Users,
  Search,
  CheckCircle2,
  ChevronRight,
  Brain,
  FileSpreadsheet,
  HelpCircle
} from 'lucide-react';

interface DisciplineListProps {
  disciplines: Discipline[];
  progress: UserProgress;
  onSelectDiscipline: (disciplineId: string, initialTab?: string) => void;
  isDarkMode: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Scale,
  Building2,
  FileText,
  ShieldAlert,
  Cpu,
  Landmark,
  Compass,
  Users,
};

export const DisciplineList: React.FC<DisciplineListProps> = ({
  disciplines,
  progress,
  onSelectDiscipline,
  isDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter disciplines by query
  const filteredDisciplines = disciplines.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Disciplinas do Concurso TJAM</h2>
          <p className="text-xs text-slate-500 mt-1">
            Grade curricular completa organizada estritamente na ordem oficial do edital.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar disciplina ou tópico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-2xl border text-xs outline-none transition-all ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-500'
            }`}
          />
        </div>
      </div>

      {/* Grid of Disciplines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDisciplines.map((disc) => {
          const IconComponent = ICON_MAP[disc.icon] || BookOpen;

          // Calculate completed topics
          const completedCount = disc.topics.filter((t) =>
            progress.completedTopicIds.includes(t.id)
          ).length;
          const totalCount = disc.topics.length;
          const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <div
              key={disc.id}
              className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group ${
                isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:border-emerald-200'
              }`}
            >
              <div>
                {/* Header: Order Badge, Icon, Name */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          #{disc.order}
                        </span>
                        <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                          {disc.code}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base tracking-tight leading-snug mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {disc.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                  {disc.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Conclusão do Conteúdo</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">
                    {completedCount} de {totalCount} tópicos concluídos
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  onClick={() => onSelectDiscipline(disc.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Acessar Módulos & Conteúdo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => onSelectDiscipline(disc.id, 'questoes')}
                    className="py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center flex items-center justify-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3 text-emerald-500" /> Questões
                  </button>

                  <button
                    onClick={() => onSelectDiscipline(disc.id, 'flashcards')}
                    className="py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center flex items-center justify-center gap-1"
                  >
                    <Brain className="w-3 h-3 text-purple-500" /> Flashcards
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
