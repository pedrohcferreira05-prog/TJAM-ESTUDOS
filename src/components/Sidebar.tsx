import React from 'react';
import { StudentTab } from '../types';
import {
  Home,
  GraduationCap,
  BookOpen,
  FileText,
  HelpCircle,
  TrendingUp,
  User,
  Trophy,
  X,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: StudentTab;
  onSelectTab: (tab: StudentTab) => void;
  isDarkMode: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isDuo?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  // Lista com todas as abas preservadas no código ("esconder não é excluir")
  // Apenas as abas solicitadas pelo usuário ficam visíveis durante a fase de atualização:
  const allowedTabIds: StudentTab[] = ['dashboard', 'aula-hoje', 'simulados'];

  const allMenuItems: { id: StudentTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Metas de Hoje', icon: Home, badge: 'Hoje' },
    { id: 'aula-hoje', label: 'Aulas de Hoje', icon: FileText, badge: '2 Aulas' },
    { id: 'simulados', label: 'Ranking', icon: Trophy, badge: '5º Lugar' },
    // As demais abas permanecem no código, mas ocultas conforme solicitado:
    { id: 'turma', label: 'Meu Curso', icon: GraduationCap },
    { id: 'disciplina-hoje', label: 'Disciplina de Hoje', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'questoes', label: 'Questões', icon: HelpCircle },
    { id: 'progresso', label: 'Meu Progresso', icon: TrendingUp },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  // Filtramos apenas as abas ativas/solicitadas: Metas, Aulas de Hoje e Ranking
  const visibleMenuItems = allMenuItems.filter((item) => allowedTabIds.includes(item.id));

  const content = (
    <div className="flex flex-col h-full py-4 px-3 space-y-5">
      {/* User Info Header in Sidebar */}
      <div className="px-3 py-3 rounded-2xl border flex items-center gap-3 bg-slate-900 border-slate-800 shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
          EP
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-extrabold text-white truncate">
            Eduardo & Pedro
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 border text-amber-400 bg-amber-500/10 border-amber-500/20">
            Dupla Oficial • 5º Lugar
          </span>
        </div>
      </div>

      {/* Aviso de Modo Foco / Atualização */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] space-y-1">
        <div className="flex items-center gap-1.5 font-black text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Modo Foco Ativo</span>
        </div>
        <p className="text-[10px] text-slate-300 leading-tight">
          Apenas as metas do dia, as aulas de hoje e o ranking estão visíveis durante a atualização.
        </p>
      </div>

      {/* Simplified Navigation List: Somente Metas, Aulas de Hoje e Ranking */}
      <div className="space-y-1 flex-1">
        <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
          Navegação Principal
        </span>
        <nav className="space-y-1.5 pt-1">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'aula-hoje' && currentTab === 'semana1');

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-black transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Course Footnote */}
      <div className="pt-4 border-t border-slate-800 px-3 text-[11px] text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">Preparatório TJAM:</p>
        <p className="text-[10px] truncate text-slate-400">Assistente Judiciário 2026</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className="hidden lg:block w-64 flex-shrink-0 border-r border-slate-800/80 transition-colors h-[calc(100vh-4rem)] sticky top-16 bg-slate-900/70 backdrop-blur-sm"
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div
            className="relative w-72 max-w-[80vw] h-full shadow-2xl flex flex-col z-10 bg-slate-900 border-r border-slate-800"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="font-extrabold text-sm text-white">Menu do Aluno</span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
