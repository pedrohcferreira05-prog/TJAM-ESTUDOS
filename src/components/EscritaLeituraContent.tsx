import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Trophy,
  Video,
  FileText,
  Volume2,
  Mic,
  MessageSquare,
  HelpCircle,
  Clock,
  Send,
  Save,
  Play,
  RotateCcw,
  ExternalLink,
  Target,
  ChevronRight,
  Smile,
  ShieldCheck,
  Upload
} from 'lucide-react';

interface EscritaLeituraContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  onToggleCompleted?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const EscritaLeituraContent: React.FC<EscritaLeituraContentProps> = ({
  isDarkMode,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted,
  handleMarkAsCompleted: propHandleMarkAsCompleted,
  onToggleComplete,
  onToggleCompleted,
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>({});
  
  // Interactive student writing drafts
  const [writtenTextEx7, setWrittenTextEx7] = useState<string>(() => {
    return localStorage.getItem('tjam_escrita_aula1_ex7') || '';
  });
  const [writtenTextExCasa, setWrittenTextExCasa] = useState<string>(() => {
    return localStorage.getItem('tjam_escrita_aula1_casa') || '';
  });
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [videoSubmitted, setVideoSubmitted] = useState<boolean>(() => {
    return localStorage.getItem('tjam_escrita_video_submitted') === 'true';
  });

  // Teleprompter / reading practice state
  const [isReadingActive, setIsReadingActive] = useState(false);
  const [readSeconds, setReadSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isReadingActive) {
      interval = setInterval(() => {
        setReadSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isReadingActive]);

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  });
  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  const handleSaveDrafts = () => {
    try {
      localStorage.setItem('tjam_escrita_aula1_ex7', writtenTextEx7);
      localStorage.setItem('tjam_escrita_aula1_casa', writtenTextExCasa);
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 3000);
    } catch (e) {}
  };

  const handleToggleVideoTask = () => {
    const nextVal = !videoSubmitted;
    setVideoSubmitted(nextVal);
    try {
      localStorage.setItem('tjam_escrita_video_submitted', String(nextVal));
    } catch (e) {}
  };

  // Counting lines/words
  const countLines = (str: string) => str ? str.split('\n').filter(l => l.trim().length > 0).length : 0;
  const countWords = (str: string) => str ? str.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white space-y-4 shadow-xl border border-emerald-500/30">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-sm text-emerald-100 flex items-center gap-1.5 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>3ª Aula Programada de Hoje • Aula 1</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
              <Clock className="w-3.5 h-3.5" /> 40 min
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('video')}
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-500 text-white transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Assistir Vídeo Aula</span>
            </button>
            <a
              href="https://youtu.be/Sod5_LBCZao?is=lGROsq4XEY7JfDxr"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Abrir no YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
            <span>📚 ESCRITA E LEITURA — AULA 1</span>
          </h1>
          <p className="text-base sm:text-lg font-bold text-emerald-200 mt-1">
            Comunicação: falar, ler e escrever melhor
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2 text-xs sm:text-sm text-emerald-100 font-medium">
            <Target className="w-4 h-4 text-amber-300 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>🎯 Objetivo da Aula:</strong> Aprender a ler com clareza, falar de forma organizada e escrever frases corretas, evitando erros comuns.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2 rounded-xl text-xs font-black bg-white text-slate-900 hover:bg-emerald-50 transition-all shrink-0 cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Ir para as 20 Questões</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Regra de Ouro Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-indigo-500/15 border-2 border-amber-400/40 dark:border-amber-500/30">
        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            ⭐ Regra Principal da Aula 1 (O Método de Ouro)
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm font-black text-slate-900 dark:text-white">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">1. Leia</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300">2. Compreenda</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-700 dark:text-sky-300">3. Organize a ideia</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300">4. Escreva</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300">5. Revise</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300">6. Fale</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Esse será o método utilizado e aprofundado em todas as próximas aulas de Escrita e Leitura do preparatório TJAM.
        </p>
      </div>

      {/* 2. Seção 1: Leitura em voz alta */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              📖 1. Leitura em Voz Alta
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A clareza fonética e a entonação correta transformam a compreensão
            </p>
          </div>
        </div>

        <p className="text-sm">
          A leitura em voz alta não é apenas recitar letras: é dar vida e sentido ao texto para quem ouve e para você mesmo. Ao ler, o aluno deve:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: '🗣️', title: 'Pronunciar completamente', desc: 'Falar todas as sílabas e letras finais sem omitir sons.' },
            { icon: '🐢', title: 'Não correr na leitura', desc: 'Manter um ritmo calmo e compassado que permita respirar.' },
            { icon: '🛑', title: 'Respeitar vírgulas e pontos', desc: 'Parar onde o texto pede descanso e finalização.' },
            { icon: '⏸️', title: 'Fazer pequenas pausas', desc: 'Dar tempo para o cérebro do ouvinte processar o bloco.' },
            { icon: '🎵', title: 'Entonação adequada', desc: 'Variar o tom para perguntas, afirmações e conclusões.' },
            { icon: '👄', title: 'Evitar “comer” sílabas', desc: 'Articular a boca com precisão em cada palavra.' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="text-lg">{item.icon}</div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Exemplo Prático de Dicção */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700 space-y-2">
          <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            Exemplo Comparativo de Leitura
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200 text-xs">
              <div className="font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1 mb-1">
                <span>❌ Leitura acelerada ("comendo" palavras):</span>
              </div>
              <p className="font-mono italic font-bold">“Hojevouestudardireitoadministrativo.”</p>
              <p className="text-[10px] text-rose-700 dark:text-rose-300 mt-1">
                As palavras grudam umas nas outras, o ar acaba rápido e o sentido se perde.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs">
              <div className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1">
                <span>✅ Leitura clara e compreensível:</span>
              </div>
              <p className="font-mono font-bold">“Hoje vou estudar Direito Administrativo.”</p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-1">
                Cada palavra é articulada com nitidez, espaço sonoro e dicção natural.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Seção 2: Como falar melhor */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              🗣️ 2. Como Falar Melhor
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              O tripé da clareza e a organização do pensamento antes de abrir a boca
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
          <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 block mb-1">
            O Tripé da Boa Comunicação:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-sm font-black text-emerald-900 dark:text-emerald-100">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30">CLARA</span>
            <span>+</span>
            <span className="px-3 py-1 rounded-xl bg-teal-500/20 border border-teal-500/30">ORGANIZADA</span>
            <span>+</span>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-500/30">OBJETIVA</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            Antes de falar, organize a ideia na sua mente seguindo 3 etapas:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>1. O que quero dizer?</span>
            <span>→</span>
            <span>2. Como vou explicar?</span>
            <span>→</span>
            <span>3. Qual é a conclusão?</span>
          </div>
        </div>

        {/* Exemplo de comunicação clara vs confusa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
            <span className="text-xs font-black text-rose-600 dark:text-rose-400 flex items-center gap-1">
              ❌ Fala desorganizada e cheia de repetições:
            </span>
            <p className="text-xs text-rose-800 dark:text-rose-200 italic font-mono">
              “Aí eu fui lá e aconteceu isso e depois eu não sabia e aí…”
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              O ouvinte fica confuso, sem saber onde o fato aconteceu nem qual foi o resultado.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              ✅ Fala organizada e conclusiva:
            </span>
            <p className="text-xs text-emerald-800 dark:text-emerald-200 font-semibold font-mono">
              “Fui ao local pela manhã. Depois, conversei com o responsável e resolvi a situação.”
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Início no tempo (manhã) → Ação (conversa) → Conclusão direta (situação resolvida).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Seção 3: Construção de frases */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              ✍️ 3. Construção de Frases
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A fórmula canônica da clareza na Língua Portuguesa
            </p>
          </div>
        </div>

        <p className="text-sm">
          Uma frase precisa apresentar uma ideia compreensível. Uma estrutura simples, direta e segura para não errar é a <strong>ordem direta</strong>:
        </p>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-center font-mono font-black text-sm sm:text-base text-indigo-700 dark:text-indigo-300">
          Sujeito + Verbo + Complemento
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400">Exemplo 1:</span>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black font-mono">
              <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300">O aluno</span>
              <span>+</span>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">estudou</span>
              <span>+</span>
              <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">Português.</span>
            </div>
            <p className="text-[11px] text-slate-500">Quem praticou? O aluno. Qual ação? Estudou. O quê? Português.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400">Exemplo 2:</span>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black font-mono">
              <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300">Pedro</span>
              <span>+</span>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">fez</span>
              <span>+</span>
              <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">os exercícios.</span>
            </div>
            <p className="text-[11px] text-slate-500">Sujeito simples + verbo transitivo direto + objeto direto.</p>
          </div>
        </div>
      </section>

      {/* 5. Seção 4: Ortografia */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              🔤 4. Ortografia Prática
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Atenção redobrada aos erros mais comuns do dia a dia e da redação
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              err: '❌ concerteza',
              ok: '✅ com certeza',
              rule: 'Locução adverbial afirmativa grafada SEMPRE separada.'
            },
            {
              err: '❌ agente vai estudar',
              ok: '✅ a gente vai estudar',
              rule: '"A gente" (nós) é separado e pede verbo no singular. "Agente" junto é o profissional.'
            },
            {
              err: '❌ mais eu não fui',
              ok: '✅ mas eu não fui',
              rule: '"Mas" indica oposição (porém). "Mais" indica quantidade e intensidade (+).'
            },
            {
              err: '❌ derrepente',
              ok: '✅ de repente',
              rule: 'Locução adverbial de tempo grafada sempre em duas palavras separadas.'
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 line-through">{item.err}</span>
                <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">{item.ok}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                {item.rule}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Seção 5: Pontuação */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              📌 5. Pontuação
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A pontuação orienta a respiração do leitor e organiza a lógica da frase
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Vírgula (,)</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300">Pausa / Separação</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Indica uma pequena pausa rítmica ou separa elementos sintáticos deslocados.
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
              “Hoje, depois da aula, faremos exercícios.”
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Ponto (.)</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-300">Encerramento</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Indica o encerramento de um pensamento completo.
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
              “O aluno estudou. Depois, fez os exercícios.”
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Interrogação (?)</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300">Pergunta</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Usada em perguntas diretas para suscitar resposta.
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
              “Você estudou hoje?”
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Exclamação (!)</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-300">Ênfase / Emoção</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Pode indicar emoção, admiração, surpresa ou destaque.
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
              “Que excelente resultado!”
            </div>
          </div>
        </div>
      </section>

      {/* 7. Seção 6: Ler e entender */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              🧠 6. Ler e Entender (As 5 Perguntas-Chave)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Não basta apenas pronunciar palavras: decodifique o significado
            </p>
          </div>
        </div>

        <p className="text-sm">
          Depois de ler um texto qualquer (notícia, lei, questão ou enunciado do TJAM), o aluno deve conseguir responder:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { num: '1', q: 'Sobre o que o texto fala?', desc: 'Identificar o tema central.' },
            { num: '2', q: 'Qual a informação principal?', desc: 'A ideia nuclear do autor.' },
            { num: '3', q: 'O que aconteceu?', desc: 'A ação ou fato descrito.' },
            { num: '4', q: 'Quem está envolvido?', desc: 'Os agentes e personagens.' },
            { num: '5', q: 'O que o autor quis dizer?', desc: 'A intenção e conclusão.' },
          ].map((item) => (
            <div key={item.num} className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex flex-col justify-between gap-1">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                {item.num}
              </span>
              <h4 className="text-xs font-black text-slate-900 dark:text-white mt-1">{item.q}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          💡 Isso desenvolve simultaneamente leitura, compreensão profunda e capacidade de explicar o conteúdo para outra pessoa.
        </p>
      </section>

      {/* 8. Seção 7: Exercício Prático de Escrita (5 a 8 linhas) */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                📝 7. Exercício Prático de Escrita (5 a 8 linhas)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tema: “Por que quero melhorar meus estudos e minha comunicação?”
              </p>
            </div>
          </div>
          {isSavedNotice && (
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 animate-pulse">
              ✓ Rascunho salvo!
            </span>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white">Diretrizes da Redação:</span>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold">✓ Frases completas</span>
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold">✓ Usar pontuação</span>
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold">✓ Evitar abreviações ("vc", "pq")</span>
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold">✓ Organizar ideias</span>
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold">✓ Revisar antes de terminar</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Escreva abaixo seu texto pessoal:</span>
            <span>{countLines(writtenTextEx7)} linhas • {countWords(writtenTextEx7)} palavras</span>
          </div>
          <textarea
            value={writtenTextEx7}
            onChange={(e) => setWrittenTextEx7(e.target.value)}
            placeholder="Comece aqui: Quero melhorar meus estudos e minha comunicação porque..."
            rows={6}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-sans leading-relaxed"
          />
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleSaveDrafts}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Rascunho</span>
            </button>
            <span className="text-[11px] text-slate-400">
              {countLines(writtenTextEx7) >= 5 && countLines(writtenTextEx7) <= 8 ? (
                <span className="text-emerald-500 font-bold">✓ Tamanho ideal (5 a 8 linhas)</span>
              ) : (
                <span>Meta: entre 5 e 8 linhas</span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* 9. Seção 8: Exercício de Fala */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              🎤 8. Exercício de Fala
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Depois de escrever o texto, leia-o em voz alta
            </p>
          </div>
        </div>

        <p className="text-sm">
          Pegue o texto que você acabou de escrever no Exercício 7 e faça a leitura em voz alta prestando atenção aos pontos:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-semibold">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-2">
            <span>✅ Fale devagar</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-2">
            <span>✅ Pronuncie todas as palavras</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-2">
            <span>✅ Faça pausas nos pontos e vírgulas</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-2">
            <span>✅ Mantenha velocidade confortável</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-2 sm:col-span-2">
            <span>✅ Tente explicar o texto sem simplesmente decorá-lo</span>
          </div>
        </div>
      </section>

      {/* 10. TAREFA DE CASA — ESCRITA E LEITURA (Atividade prática — Aula 1) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-indigo-500/40 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-indigo-500/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white">
                🎥 ATIVIDADE PRÁTICA EM VÍDEO
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                Obrigatória
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🏠 TAREFA DE CASA — ESCRITA E LEITURA</span>
            </h2>
            <p className="text-xs text-indigo-200">
              A atividade deverá ser gravada em vídeo completo e enviada ao professor.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-indigo-300 block">Status de Entrega</span>
            <button
              onClick={handleToggleVideoTask}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                videoSubmitted
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {videoSubmitted ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Vídeo Entregue!</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Marcar como Gravado</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Parte 1: Leitura do Texto Modelo */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <span>📖 Parte 1 — Leitura em Voz Alta (Texto Modelo)</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsReadingActive(!isReadingActive);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isReadingActive ? 'bg-amber-400 text-slate-950' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isReadingActive ? <RotateCcw className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isReadingActive ? `Treinando (${readSeconds}s)` : 'Iniciar Timer de Leitura'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            O aluno deverá gravar um vídeo lendo em voz alta o seguinte texto:
          </p>

          <blockquote className="p-4 rounded-2xl bg-black/40 border-l-4 border-amber-400 text-sm sm:text-base font-serif italic text-amber-100 leading-relaxed">
            “Estudar exige dedicação, organização e paciência. Nem sempre conseguimos aprender tudo de uma vez. Por isso, é importante manter uma rotina de estudos, revisar os conteúdos e não ter medo de errar. Cada erro pode ser uma oportunidade para aprender e melhorar.”
          </blockquote>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-slate-300 pt-1">
            <span className="p-2 rounded-lg bg-white/5 text-center">✓ Pronunciar corretamente</span>
            <span className="p-2 rounded-lg bg-white/5 text-center">✓ Respeitar vírgulas e pontos</span>
            <span className="p-2 rounded-lg bg-white/5 text-center">✓ Evitar falar rápido demais</span>
            <span className="p-2 rounded-lg bg-white/5 text-center">✓ Manter boa entonação</span>
            <span className="p-2 rounded-lg bg-white/5 text-center col-span-2 sm:col-span-1">✓ Falar com clareza</span>
          </div>
        </div>

        {/* Parte 2: Fala com as próprias palavras */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-teal-300 flex items-center gap-2">
              <span>🗣️ Parte 2 — Fala (Explicação com as Próprias Palavras)</span>
            </h3>
            <span className="text-xs font-bold text-teal-200 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-500/30 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Tempo: 1 a 2 minutos
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Ainda no mesmo vídeo, o aluno deverá explicar com suas próprias palavras o que entendeu do texto lido na Parte 1, <strong>sem simplesmente ler ou decorar</strong>.
          </p>
          <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-200">
            💡 Dica: Lembre-se do roteiro mental: <em>"O que o texto quer passar? → Como eu aplico isso na minha rotina? → Qual é a minha conclusão sobre a importância da paciência e da revisão?"</em>
          </div>
        </div>

        {/* Parte 3: Escrita e Leitura do texto pessoal */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2">
              <span>✍️ Parte 3 — Escrita (8 a 10 linhas) e Leitura em Voz Alta</span>
            </h3>
            <span className="text-xs font-bold text-indigo-200 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              8 a 10 linhas
            </span>
          </div>
          <p className="text-xs text-slate-300">
            O aluno deverá escrever um pequeno texto sobre o tema:
          </p>
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 font-bold text-xs text-indigo-200">
            “O que eu preciso melhorar nos meus estudos e na minha comunicação?”
          </div>
          <p className="text-xs text-slate-400">
            Depois de redigir, o aluno deverá ler o próprio texto em voz alta no mesmo vídeo.
          </p>

          <textarea
            value={writtenTextExCasa}
            onChange={(e) => setWrittenTextExCasa(e.target.value)}
            placeholder="Escreva aqui a sua redação de 8 a 10 linhas para a Tarefa de Casa..."
            rows={7}
            className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans leading-relaxed"
          />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={handleSaveDrafts}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Texto da Tarefa</span>
            </button>
            <span>{countLines(writtenTextExCasa)} de 8-10 linhas recomendadas</span>
          </div>
        </div>

        {/* Entrega */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              📤 Entrega do Vídeo Completo
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            O vídeo completo deverá ser gravado na vertical ou horizontal e enviado ao professor no WhatsApp contendo:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-amber-300 block mb-1">1. 📖 Leitura do texto</span>
              <span className="text-slate-400 text-[11px]">Leitura fluida do texto modelo sobre paciência e dedicação.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-teal-300 block mb-1">2. 🗣️ Explicação própria</span>
              <span className="text-slate-400 text-[11px]">Explicação espontânea de 1 a 2 minutos com suas palavras.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-indigo-300 block mb-1">3. ✍️ Leitura da redação</span>
              <span className="text-slate-400 text-[11px]">Leitura em voz alta do seu texto de 8 a 10 linhas produzido.</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>🎯 Objetivo Pedagógico:</strong> Avaliar e desenvolver leitura, pronúncia, fala, compreensão, escrita e organização das ideias.
            </span>
          </div>
        </div>
      </section>

      {/* 11. Final Checklist & Action Footer */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Conclusão da 3ª Aula de Hoje</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Marque os passos cumpridos e avance para as 20 questões e flashcards
            </p>
          </div>

          <button
            onClick={handleMarkAsCompleted}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              isLessonCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isLessonCompleted ? 'Aula Concluída (100%)' : 'Marcar Aula como Concluída'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('video')}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:border-indigo-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs mb-1">
              <Video className="w-3.5 h-3.5" />
              <span>Vídeo Aula</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Assistir aula explicativa com áudio e dicas</p>
          </button>

          <button
            onClick={() => setActiveTab('questoes')}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:border-indigo-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>20 Questões</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Exercícios gabaritados e comentados</p>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:border-indigo-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>15 Flashcards</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Revisão rápida e memorização ativa</p>
          </button>

          <button
            onClick={() => setActiveTab('resumo')}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:border-indigo-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 text-purple-500 font-bold text-xs mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Resumo & Dicas</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Síntese de regras e mnemônicos</p>
          </button>
        </div>
      </div>
    </article>
  );
};
