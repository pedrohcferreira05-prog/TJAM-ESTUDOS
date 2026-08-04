import React, { useState } from 'react';
import {
  UserProgress,
  Turma,
  Announcement,
  LiveClass,
  PublishedMaterial,
  Certificate,
  Discipline,
} from '../types';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Video,
  FileText,
  Lock,
  Unlock,
  ChevronRight,
  TrendingUp,
  Target,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  Brain,
  ListCheck,
  Star,
  Users,
} from 'lucide-react';

interface StudentPortalProps {
  progress: UserProgress;
  turmas: Turma[];
  announcements: Announcement[];
  liveClasses: LiveClass[];
  publishedMaterials: PublishedMaterial[];
  disciplines: Discipline[];
  onNavigateTab: (tab: any) => void;
  onSelectDiscipline: (discId: string) => void;
  isDarkMode: boolean;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  progress,
  turmas,
  announcements,
  liveClasses,
  publishedMaterials,
  disciplines,
  onNavigateTab,
  onSelectDiscipline,
  isDarkMode,
}) => {
  const [subTab, setSubTab] = useState<'plano' | 'liberados' | 'lives' | 'certificados'>('plano');

  const myTurma = turmas.find((t) => t.id === progress.turmaId) || turmas[0];

  const releasedMaterials = publishedMaterials.filter(
    (m) => m.isReleased && (!m.turmaId || m.turmaId === myTurma?.id)
  );

  return (
    <div className="space-y-6">
      {/* Student Top Hero Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white shadow-xl relative overflow-hidden border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-500/30">
              <Users className="w-3.5 h-3.5" /> Matriculado na {myTurma?.name || 'Turma Oficial TJAM'}
            </span>
            <h1 className="text-2xl md:text-3xl font-black">
              Painel Exclusivo do Aluno - TJAM 2026
            </h1>
            <p className="text-xs text-emerald-100/80 max-w-xl">
              Acompanhe seu plano de estudos personalizado, aulas e materiais liberados pelo seu professor, próximas lives e emissão de certificados.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-emerald-300">Progresso</span>
              <p className="text-xl font-black text-white">{Math.round((progress.completedTopicIds.length / 30) * 100)}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-amber-300">Ofensiva</span>
              <p className="text-xl font-black text-white">{progress.streakDays} Dias</p>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
          {[
            { id: 'plano', label: 'Plano de Estudos', icon: Calendar },
            { id: 'liberados', label: `Conteúdos Liberados (${releasedMaterials.length})`, icon: BookOpen },
            { id: 'lives', label: `Aulas ao Vivo (${liveClasses.length})`, icon: Video },
            { id: 'certificados', label: 'Certificados & Conclusão', icon: Award },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = subTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSubTab(t.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Announcements Banner */}
      {announcements.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-extrabold text-xs">
            <Sparkles className="w-4 h-4" /> Avisos Recentes do Professor:
          </div>
          {announcements.map((a) => (
            <div key={a.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900 dark:text-white">{a.title}</span>
                <span className="text-[10px] text-slate-400">{a.createdAt}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{a.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Plano de Estudos */}
      {subTab === 'plano' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" /> Roteiro Semanal Orientado pelo Professor
            </h3>
            <p className="text-xs text-slate-500">
              Etapa Atual: <span className="font-bold text-emerald-600">{myTurma?.currentStage}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Disciplinas Prioritárias da Semana:
                </h4>
                <div className="space-y-2">
                  {disciplines.slice(0, 3).map((d) => (
                    <div
                      key={d.id}
                      onClick={() => onSelectDiscipline(d.id)}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-emerald-500 transition-all cursor-pointer"
                    >
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{d.name}</span>
                      <span className="text-[10px] font-bold text-emerald-600">Estudar Agora →</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" /> Próximas Metas e Revisões:
                </h4>
                <ul className="list-disc list-inside space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li>Resolver 30 questões de Regimento Interno do TJAM (Art. 12 ao 45).</li>
                  <li>Revisar atributos do Ato Administrativo e Licitações Públicas.</li>
                  <li>Assistir a Gravação da Super Aula Ao Vivo de Direito Constitucional.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Conteúdos Liberados */}
      {subTab === 'liberados' && (
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" /> Aulas, PDFs e Materiais Liberados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {releasedMaterials.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase text-[10px]">
                    {m.type}
                  </span>
                  <span className="text-slate-400 font-bold text-[10px]">Liberado em {m.releaseDate}</span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{m.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{m.content}</p>

                {m.attachmentUrl && (
                  <a
                    href={m.attachmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Baixar Anexo / Documento Oficial
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Aulas ao Vivo */}
      {subTab === 'lives' && (
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-500" /> Agendamento de Aulas ao Vivo e Transmissões
          </h3>

          <div className="space-y-3">
            {liveClasses.map((lc) => (
              <div
                key={lc.id}
                className="p-5 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-purple-600">{lc.disciplineName}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-extrabold text-[10px] uppercase">
                      {lc.status}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{lc.title}</h4>
                  <p className="text-xs text-slate-500">{lc.description}</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Data e Hora: {lc.date} às {lc.time}</p>
                </div>

                <a
                  href={lc.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
                >
                  <Video className="w-4 h-4" /> Entrar na Transmissão ao Vivo
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Certificados */}
      {subTab === 'certificados' && (
        <div className="p-6 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" /> Emissão de Certificado de Conclusão TJAM
              </h3>
              <p className="text-xs text-slate-500">Ao atingir 80% do conteúdo concluído, solicite seu certificado oficial de preparação.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs">
              Certificado Disponível 🎉
            </span>
          </div>

          <div className="p-8 rounded-3xl border-2 border-dashed border-emerald-500/30 bg-emerald-500/5 text-center space-y-4">
            <Award className="w-16 h-16 text-emerald-600 mx-auto" />
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Certificado de Capacitação em Legislação e Jurisprudência do TJAM
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Certificamos que o aluno concluiu com êxito o programa de 120 horas do Preparatório Oficial do Tribunal de Justiça do Estado do Amazonas.
              </p>
            </div>

            <button
              onClick={() => alert('Certificado gerado com sucesso! Código de Autenticação: TJAM-CERT-2026-88F9A2')}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Imprimir / Baixar Certificado Oficial
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
