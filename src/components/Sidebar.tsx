import React from 'react';
import { StudentTab } from '../types';
import {
  Home,
  GraduationCap,
  BookOpen,
  FileText,
  Brain,
  Layers,
  HelpCircle,
  TrendingUp,
  User,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: StudentTab;
  onSelectTab: (tab: StudentTab) => void;
  isDarkMode: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isDarkMode,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const menuItems: { id: StudentTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'turma', label: 'Meu Curso', icon: GraduationCap },
    { id: 'disciplina-hoje', label: 'Disciplina de Hoje', icon: BookOpen },
    { id: 'aula-hoje', label: 'Aula de Hoje', icon: FileText },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'questoes', label: 'Questões', icon: HelpCircle },
    { id: 'progresso', label: 'Meu Progresso', icon: TrendingUp },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  const content = (
    <div className="flex flex-col h-full py-4 px-3 space-y-6">
      {/* User Info Header in Sidebar */}
      <div className="px-3 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256" 
            alt="Eduardo Mateus Alexandre Amorim"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="text-xs font-bold">EA</span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
            Eduardo Mateus A. Amorim
          </h2>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
            Aluno TJAM
          </span>
        </div>
      </div>

      {/* Simplified Navigation List */}
      <nav className="space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Map aula-hoje / semana1 equivalence if needed
          const isActive = currentTab === item.id || (item.id === 'aula-hoje' && currentTab === 'semana1');

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Course Footnote */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 px-3 text-[11px] text-slate-400 space-y-1">
        <p className="font-semibold text-slate-600 dark:text-slate-300">Curso Ativo:</p>
        <p className="text-[10px] truncate text-slate-500 dark:text-slate-400">TJAM – Assistente Judiciário</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block w-64 flex-shrink-0 border-r transition-colors h-[calc(100vh-4rem)] sticky top-16 ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div
            className={`relative w-72 max-w-[80vw] h-full shadow-2xl flex flex-col z-10 ${
              isDarkMode ? 'bg-slate-900 border-r border-slate-800' : 'bg-white border-r border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">Menu do Aluno</span>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};
