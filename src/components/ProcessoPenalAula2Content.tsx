import React, { useState } from 'react';
import {
  Scale,
  Shield,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  Brain,
  Play,
  ExternalLink,
  Target,
  Send,
  Building2,
  Share2,
  ChevronRight,
  FileText,
  UserCheck,
  FileQuestion,
  Users,
  Clock,
  Award,
  ArrowRight,
  CheckSquare,
  MessageCircle,
  Info,
  Calendar,
  Lock,
  Compass
} from 'lucide-react';
import {
  procPenalAula2SummaryPoints,
  procPenalAula2FlashcardsData,
  procPenalAula2McQuestionsData,
  procPenalAula2TfQuestionsData,
  procPenalAula2DiscursiveQuestionsData,
  procPenalAula2PracticalTask,
  procPenalAula2VideoInfo
} from '../data/processoPenalAula2LessonData';

interface ProcessoPenalAula2ContentProps {
  isDarkMode?: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted?: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProcessoPenalAula2Content: React.FC<ProcessoPenalAula2ContentProps> = ({
  isDarkMode = false,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted = false,
  handleMarkAsCompleted,
  onToggleComplete,
  setActiveTab,
  onNavigateTab
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_proc_penal_aula2_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeTabSub, setActiveTabSub] = useState<'teoria' | 'fluxograma' | 'artigos' | 'pratica'>('teoria');
  const [selectedModalidade, setSelectedModalidade] = useState<number>(0);

  // Form states for practical task
  const [studentName, setStudentName] = useState(() => localStorage.getItem('tjam_student_name') || '');
  const [practicalResumo, setPracticalResumo] = useState('');
  const [practicalExemplo, setPracticalExemplo] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const checklist = propChecklist || internalChecklist;
  const toggleCheck = (key: string) => {
    if (propToggleChecklist) {
      propToggleChecklist(key);
    } else {
      const updated = { ...internalChecklist, [key]: !internalChecklist[key] };
      setInternalChecklist(updated);
      try {
        localStorage.setItem('tjam_proc_penal_aula2_checklist', JSON.stringify(updated));
      } catch {}
    }
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalTopics = 8;
  const progressPercent = Math.min(100, Math.round((completedCount / totalTopics) * 100));

  const handleSendWhatsapp = () => {
    const text = `*📚 TJAM — Direito Processual Penal (Aula 02: Ação Penal)*\n` +
      `*Aluno:* ${studentName || 'Aluno TJAM'}\n` +
      `*Entrega da Atividade Prática:* Fluxograma & Quadro Comparativo de Ação Penal\n\n` +
      `*1. Resumo com as próprias palavras:*\n${practicalResumo || 'Compreensão das três espécies de ação penal (pública incondicionada, pública condicionada e privada), seus titulares, prazos decadenciais e princípios fundamentais da indisponibilidade e intranscendência.'}\n\n` +
      `*2. Exemplos práticos formulados:*\n${practicalExemplo || '• Incondicionada: Roubo no TJAM (denúncia direta do MP);\n• Condicionada: Ameaça a servidor (depende de representação em 6 meses);\n• Privada: Calúnia/Difamação (queixa-crime com procuração especial).'}\n\n` +
      `_Atividade concluída conforme orientações da 1ª Aula do dia._`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyTask = () => {
    const text = `📚 TJAM — Direito Processual Penal (Aula 02: Ação Penal)\n` +
      `Aluno: ${studentName || 'Aluno TJAM'}\n\n` +
      `1. Resumo:\n${practicalResumo}\n\n` +
      `2. Exemplos:\n${practicalExemplo}`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const navigateTo = (tab: string) => {
    if (onNavigateTab) onNavigateTab(tab);
    else if (setActiveTab) setActiveTab(tab);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                1ª Aula do Dia • Quinta-feira
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Nível Intermediário TJAM
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                20 Questões Gabaritadas
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Direito Processual Penal — Aula 02: Ação Penal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Domine as espécies de ação penal (pública incondicionada, pública condicionada e privada), princípios fundamentais da indisponibilidade, intranscendência e obrigatoriedade, prazos decadenciais de 6 meses, renúncia, perdão e perempção para o TJAM.
            </p>

            {/* Micro Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => navigateTo('video')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Assistir Videoaula Oficial</span>
              </button>
              <button
                onClick={() => navigateTo('questoes')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
                <span>20 Exercícios da Aula</span>
              </button>
              <button
                onClick={() => navigateTo('flashcards')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-sky-400" />
                <span>10 Flashcards Interativos</span>
              </button>
            </div>
          </div>

          {/* Progress Tracker Card */}
          <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center min-w-[170px] text-center">
            <div className="text-3xl font-black text-indigo-400">{progressPercent}%</div>
            <div className="text-[11px] font-bold text-slate-300 mt-0.5">Progresso da Aula</div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1">
              {completedCount} de {totalTopics} tópicos lidos
            </span>
          </div>
        </div>
      </div>

      {/* Internal Subtabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTabSub('teoria')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTabSub === 'teoria'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Teoria da Ação Penal</span>
        </button>
        <button
          onClick={() => setActiveTabSub('fluxograma')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTabSub === 'fluxograma'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Quadro Comparativo & Fluxograma</span>
        </button>
        <button
          onClick={() => setActiveTabSub('artigos')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTabSub === 'artigos'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>3. Artigos para Estudar (CPP)</span>
        </button>
        <button
          onClick={() => setActiveTabSub('pratica')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTabSub === 'pratica'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>4. Envio da Atividade Prática</span>
        </button>
      </div>

      {/* Subtab 1: Teoria Completa */}
      {activeTabSub === 'teoria' && (
        <div className="space-y-6">
          {/* Tópico 1: O que é Ação Penal */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                  1
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                    O que é Ação Penal?
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Fase contenciosa judicial perante o Poder Judiciário
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleCheck('topico-1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  checklist['topico-1']
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{checklist['topico-1'] ? 'Lido' : 'Marcar Leitura'}</span>
              </button>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>ação penal</strong> é o instrumento pelo qual se pede ao Poder Judiciário que analise um fato criminoso e decida se há responsabilidade penal do acusado.
            </p>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Atenção Crucial de Concurso TJAM:</strong> O <em>inquérito policial</em> pode reunir informações sobre um crime, mas NÃO é a ação penal. O inquérito é uma investigação preliminar administrativa; a <strong>ação penal é a etapa judicial</strong>, iniciada conforme as regras legais perante o juiz competente.
              </div>
            </div>
          </div>

          {/* Tópico 2: Espécies de Ação Penal */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                  2
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                    Espécies de Ação Penal
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pública incondicionada, pública condicionada e privada
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleCheck('topico-2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  checklist['topico-2']
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{checklist['topico-2'] ? 'Lido' : 'Marcar Leitura'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card A: Pública Incondicionada */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-sm">
                  <Shield className="w-4 h-4" />
                  <span>A) Pública Incondicionada</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Promovida pelo <strong>Ministério Público</strong> por meio de <strong>denúncia</strong>, sem depender de autorização ou anuência da vítima.
                </p>
                <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-2">
                  <div>• <strong>Titular:</strong> Ministério Público.</div>
                  <div>• <strong>Peça inicial:</strong> Denúncia.</div>
                  <div>• <strong>Regra geral:</strong> Modalidade padrão do ordenamento.</div>
                </div>
              </div>

              {/* Card B: Pública Condicionada */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black text-sm">
                  <Clock className="w-4 h-4" />
                  <span>B) Pública Condicionada</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Promovida pelo Ministério Público, mas depende de uma <strong>condição prevista em lei</strong> (representação da vítima ou requisição do Ministro da Justiça).
                </p>
                <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-2">
                  <div>• <strong>Condição:</strong> Representação ou Requisição.</div>
                  <div>• <strong>Peça inicial:</strong> Denúncia (oferecida pelo MP).</div>
                  <div>• <strong>Prazo decadencial:</strong> 6 meses da ciência da autoria.</div>
                </div>
              </div>

              {/* Card C: Privada */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                  <UserCheck className="w-4 h-4" />
                  <span>C) Ação Penal Privada</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Proposta pela própria vítima ou seu representante legal, por meio de <strong>queixa-crime</strong>, nos casos estritamente previstos em lei.
                </p>
                <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-2">
                  <div>• <strong>Titular:</strong> Ofendido / Representante (Querelante).</div>
                  <div>• <strong>Peça inicial:</strong> Queixa-crime.</div>
                  <div>• <strong>Prazo decadencial:</strong> 6 meses do conhecimento da autoria.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tópico 3 & 4: Princípios da Ação Penal */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                  3
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                    Princípios Fundamentais da Ação Penal
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Regras basilares cobradas nas provas da banca
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleCheck('topico-3')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  checklist['topico-3']
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{checklist['topico-3'] ? 'Lido' : 'Marcar Leitura'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-indigo-600 dark:text-indigo-400 text-sm mb-1">
                  ⚖️ Obrigatoriedade (Legalidade)
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Presentes os requisitos legais e a justa causa, o Ministério Público tem o <strong>dever funcional</strong> de promover a ação penal pública, observadas as hipóteses legais (ex: ANPP).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-rose-600 dark:text-rose-400 text-sm mb-1">
                  🚫 Indisponibilidade (Art. 42, CPP)
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  O Ministério Público <strong>não pode desistir</strong> da ação penal pública já proposta nem dos recursos interpostos.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-emerald-600 dark:text-emerald-400 text-sm mb-1">
                  🛡️ Intranscendência (Art. 5º, XLV, CF)
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  A ação penal e a pena <strong>não podem passar da pessoa do condenado</strong>. A responsabilidade penal é estritamente pessoal.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-amber-600 dark:text-amber-400 text-sm mb-1">
                  🤝 Oportunidade e Indivisibilidade
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Na ação penal privada, a vítima avalia a conveniência de ajuizar a queixa (oportunidade), mas se ajuizar contra um autor conhecido, <strong>deve ajuizar contra todos</strong> (indivisibilidade).
                </p>
              </div>
            </div>
          </div>

          {/* Tópico 5: Renúncia, Perdão e Perempção */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                  4
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                    Renúncia, Perdão do Ofendido e Perempção
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Institutos exclusivos da ação penal privada
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleCheck('topico-4')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  checklist['topico-4']
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{checklist['topico-4'] ? 'Lido' : 'Marcar Leitura'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 space-y-1.5">
                <span className="font-black text-sky-700 dark:text-sky-300 text-sm">1. Renúncia</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ocorre <strong>ANTES</strong> de iniciada a ação penal privada. É a desistência formal do direito de queixa. Ato <strong>unilateral</strong> do ofendido.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1.5">
                <span className="font-black text-emerald-700 dark:text-emerald-300 text-sm">2. Perdão do Ofendido</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ocorre <strong>DEPOIS</strong> de iniciada a ação penal privada. É ato <strong>bilateral</strong> que depende expressamente da aceitação do querelado para surtir efeito.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300 text-sm">3. Perempção</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Sanção processual por <strong>desídia ou omissão</strong> continuada do querelante prevista no art. 60 do CPP (ex: abandonar a causa por mais de 30 dias seguidos).
                </p>
              </div>
            </div>
          </div>

          {/* Tópico 6: Denúncia e Queixa-Crime Requisitos Art. 41 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                  5
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                    Requisitos da Peça Acusatória (Art. 41 do CPP)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Estrutura obrigatória da Denúncia e da Queixa-Crime
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleCheck('topico-5')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  checklist['topico-5']
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{checklist['topico-5'] ? 'Lido' : 'Marcar Leitura'}</span>
              </button>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300">
              O art. 41 do Código de Processo Penal exige que tanto a <strong>denúncia</strong> quanto a <strong>queixa-crime</strong> contenham:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400 block mb-1">1. Fato Criminoso</strong>
                Exposição circunstanciada de quando, onde e como ocorreu o crime.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400 block mb-1">2. Qualificação</strong>
                Identificação do acusado ou sinais característicos para individualizá-lo.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400 block mb-1">3. Classificação</strong>
                Indicação dos artigos de lei e dispositivos penais infringidos.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400 block mb-1">4. Testemunhas</strong>
                Rol de testemunhas que presenciaram os fatos, quando necessário.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Quadro Comparativo & Fluxograma */}
      {activeTabSub === 'fluxograma' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Quadro Comparativo Oficial das Espécies de Ação Penal</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Confronte lado a lado os três modelos para fixação rápida e sem confusão em provas
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-black">
                    <th className="py-3 px-3.5">Modalidade</th>
                    <th className="py-3 px-3.5">Quem Inicia (Titular)</th>
                    <th className="py-3 px-3.5">Peça Inicial</th>
                    <th className="py-3 px-3.5">Condição Específica</th>
                    <th className="py-3 px-3.5">Exemplo Prático</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {procPenalAula2PracticalTask.comparativeTable.map((item, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/30'}
                    >
                      <td className="py-3.5 px-3.5 font-black text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                        {item.modalidade}
                      </td>
                      <td className="py-3.5 px-3.5 font-semibold">{item.quemInicia}</td>
                      <td className="py-3.5 px-3.5 font-bold text-amber-600 dark:text-amber-400">{item.pecaInicial}</td>
                      <td className="py-3.5 px-3.5">{item.condicao}</td>
                      <td className="py-3.5 px-3.5 text-slate-500 dark:text-slate-400 italic">{item.exemplo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fluxograma Visual Interativo */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-500" />
              <span>Fluxograma Interativo da Persecução Penal no TJAM</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border-2 border-indigo-500/40 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-600 text-white">
                  Passo 1: Notícia do Crime
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Investigação Preliminar</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  A autoridade policial instaura o Inquérito Policial para colher indícios de autoria e prova de materialidade. Não há juiz nesta fase; é procedimento administrativo informativo.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-600 text-white">
                  Passo 2: Análise da Legitimidade
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Definição da Ação</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  • <em>Incondicionada:</em> MP oferece denúncia direta.<br />
                  • <em>Condicionada:</em> Vítima representa no prazo de 6 meses.<br />
                  • <em>Privada:</em> Vítima outorga procuração especial e ajuíza queixa-crime.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-600 text-white">
                  Passo 3: Juízo do TJAM
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Início da Ação Penal</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  O magistrado da vara criminal recebe a denúncia ou queixa-crime (art. 396 do CPP). Inicia-se o processo judicial com citação do réu, ampla defesa e contraditório plenos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Artigos do CPP */}
      {activeTabSub === 'artigos' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              <span>Artigos Fundamentais do CPP para Leitura Seca</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Esses artigos caem com frequência literal nas bancas de concurso para tribunais:
            </p>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                  📖 Arts. 24 a 28 — Ação Penal Pública e Atuação do MP
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Regras sobre iniciativa privativa do MP, denúncia, representação, irretratabilidade após o oferecimento e arquivamento do inquérito.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                  📖 Arts. 29 a 31 — Ação Penal Privada e Legitimidade Sucessiva (CADI)
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Ação privada subsidiária da pública no caso de inércia do MP; sucessão do direito de queixa aos sucessores (Cônjuge, Ascendente, Descendente e Irmão).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                  📖 Arts. 38 a 42 — Decadência e Requisitos da Petição Inicial (Art. 41)
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Prazo decadencial de 6 meses; requisitos formais da denúncia e queixa (fato criminoso, qualificação, classificação e testemunhas); indisponibilidade da ação penal pública pelo MP (art. 42).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                  📖 Arts. 44 a 60 — Queixa-crime, Perdão e Perempção
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Exigência de procuração com poderes especiais (art. 44), regras do perdão aceito ou recusado e hipóteses taxativas de perempção (art. 60).
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-bold transition-all border border-indigo-200 dark:border-indigo-800"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir Código de Processo Penal Completo no Planalto</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Envio da Atividade Prática */}
      {activeTabSub === 'pratica' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-indigo-600" />
                <span>Atividade Prática Oficial da Aula</span>
              </h2>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                Entrega: Hoje até 19h30
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Orientações do Professor:</strong> {procPenalAula2PracticalTask.instruction}
            </div>

            {/* Form */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Seu Nome Completo:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    localStorage.setItem('tjam_student_name', e.target.value);
                  }}
                  placeholder="Ex: Pedro Henrique Ferreira"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  1. Seu Resumo com as Próprias Palavras:
                </label>
                <textarea
                  rows={4}
                  value={practicalResumo}
                  onChange={(e) => setPracticalResumo(e.target.value)}
                  placeholder="Escreva aqui seu resumo sintético explicando a distinção entre as modalidades de ação penal e os princípios estudados..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  2. Três Exemplos Fictícios Explicados:
                </label>
                <textarea
                  rows={4}
                  value={practicalExemplo}
                  onChange={(e) => setPracticalExemplo(e.target.value)}
                  placeholder="Insira um exemplo fictício de ação pública incondicionada, um de pública condicionada e um de privada..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleSendWhatsapp}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar ao Professor via WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyTask}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copySuccess ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion CTA Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 border-2 border-indigo-200 dark:border-indigo-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
              Concluiu a Leitura Teórica da Aula 02?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Avance agora para os 20 exercícios gabaritados ou revise os flashcards interativos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('questoes')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md transition-all cursor-pointer"
          >
            <span>Ir para as 20 Questões</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
