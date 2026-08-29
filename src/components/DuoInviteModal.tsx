import React from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Flame,
  Trophy,
  CheckCircle2,
  X,
  RefreshCw
} from 'lucide-react';

interface DuoInviteModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onClose?: () => void;
  isDarkMode: boolean;
}

export const DuoInviteModal: React.FC<DuoInviteModalProps> = ({
  isOpen,
  onAccept,
  onDecline,
  onClose,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all relative ${
          isDarkMode
            ? 'bg-slate-900 border-slate-700/80 text-white shadow-indigo-950/50'
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}
      >
        {/* Top Decorative Accent Gradient */}
        <div className="h-2.5 bg-gradient-to-r from-sky-500 via-indigo-600 to-amber-500" />

        {/* Close button if user just wants to dismiss without deciding */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          {/* Tag & Notification Header */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Solicitação de Dupla • Preparatório TJAM 2026</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Pedro Henrique voltou aos estudos e enviou uma solicitação para você!
            </h2>

            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Pedro Henrique retomou o cronograma intensivo de estudos para o TJAM e quer formar uma <strong className="text-indigo-400">Dupla Oficial de Estudos</strong> com você na plataforma.
            </p>
          </div>

          {/* Duo Connection Visual Cards */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Pedro Henrique Profile Card */}
              <div className="flex items-center gap-3.5 w-full sm:w-auto p-3 rounded-xl bg-slate-900/90 border border-indigo-500/30 shadow-inner flex-1">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white font-black text-base flex items-center justify-center shadow-md">
                    PH
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-white truncate">
                      Pedro Henrique
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                      Remetente
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Voltou aos estudos • TJAM</p>
                </div>
              </div>

              {/* Central Connection Badge */}
              <div className="flex sm:flex-col items-center justify-center gap-1 text-slate-500 shrink-0">
                <div className="p-2 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">
                  Dupla
                </span>
              </div>

              {/* Eduardo Mateus Profile Card */}
              <div className="flex items-center gap-3.5 w-full sm:w-auto p-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner flex-1">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-600 text-white font-black text-base flex items-center justify-center shadow-md">
                    EM
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-sky-500 text-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-white truncate">
                      Eduardo Mateus
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      Você
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Assistente Judiciário</p>
                </div>
              </div>
            </div>

            {/* Prompt Question */}
            <div className="pt-2 border-t border-slate-800/80 text-center">
              <p className="text-sm font-black text-slate-200">
                Deseja aceitar Pedro como sua dupla de estudos?
              </p>
            </div>
          </div>

          {/* Options Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-1">
              <div className="flex items-center gap-1.5 font-black text-indigo-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Opção SIM (Aceitar):</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                Atualiza toda a plataforma para a modalidade de <strong>Dupla Oficial</strong> com <strong>Pedro Henrique & Eduardo Mateus</strong> no ranking, cabeçalho, perfil e estatísticas.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <div className="flex items-center gap-1.5 font-black text-slate-300">
                <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Opção NÃO (Individual):</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                Mantém o formato de estudo solo exclusivamente com <strong>Eduardo Mateus</strong> de forma independente.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
            <button
              onClick={onDecline}
              className="px-5 py-3.5 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
            >
              <UserX className="w-4 h-4 text-rose-400" />
              <span>Não, continuar somente Eduardo sozinho</span>
            </button>

            <button
              onClick={onAccept}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-black text-xs shadow-lg shadow-indigo-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer group order-1 sm:order-2"
            >
              <UserCheck className="w-4 h-4 text-amber-300" />
              <span>Sim, aceitar Pedro como dupla</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
