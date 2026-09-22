import React, { useState, useEffect } from 'react';
import {
  PenTool,
  CheckCircle2,
  Check,
  BookOpen,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Send,
  HelpCircle,
  FileCheck2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Target,
  FileText,
  Copy,
  ChevronRight,
  Split,
  MessageSquare
} from 'lucide-react';
import { redacaoPracticalTask } from '../data/redacaoLessonData';

interface RedacaoContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const RedacaoContent: React.FC<RedacaoContentProps> = ({
  isDarkMode: _isDarkMode = false,
  isLessonCompleted = false,
  onToggleCompleted,
  onNavigateTab,
}) => {
  // Checklist interativo dos tópicos teóricos
  const [readTopics, setReadTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_redacao_read_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTopic = (id: string) => {
    setReadTopics((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_redacao_read_topics', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // State para o Projeto de Redação (Atividade Prática)
  const [projectAnswers, setProjectAnswers] = useState<{
    tema: string;
    tese: string;
    arg1: string;
    arg2: string;
    intro: string;
  }>(() => {
    try {
      const saved = localStorage.getItem('tjam_redacao_projeto_answers');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      tema: 'A importância da qualidade no atendimento ao cidadão no serviço público.',
      tese: '',
      arg1: '',
      arg2: '',
      intro: ''
    };
  });

  const [savedProjectSuccess, setSavedProjectSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleSaveProject = () => {
    try {
      localStorage.setItem('tjam_redacao_projeto_answers', JSON.stringify(projectAnswers));
      setSavedProjectSuccess(true);
      setTimeout(() => setSavedProjectSuccess(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleSendWhatsApp = () => {
    const text = `*PROJETO DE REDAÇÃO — TJAM 2026 (Aula 01: Estrutura da Redação)*%0A%0A` +
      `*1. Tema:* ${encodeURIComponent(projectAnswers.tema)}%0A%0A` +
      `*2. Tese:* ${encodeURIComponent(projectAnswers.tese || 'Não preenchido')}%0A%0A` +
      `*3. Argumento 1 (D1):* ${encodeURIComponent(projectAnswers.arg1 || 'Não preenchido')}%0A%0A` +
      `*4. Argumento 2 (D2):* ${encodeURIComponent(projectAnswers.arg2 || 'Não preenchido')}%0A%0A` +
      `*5. Introdução (4-6 linhas):*%0A${encodeURIComponent(projectAnswers.intro || 'Não preenchido')}%0A%0A` +
      `_Enviado pelo aluno via Portal TJAM Estudos Preparatórios_`;

    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyProject = () => {
    const text = `PROJETO DE REDAÇÃO — TJAM 2026 (Aula 01: Estrutura da Redação)\n\n` +
      `1. Tema: ${projectAnswers.tema}\n` +
      `2. Tese: ${projectAnswers.tese || '(Vazio)'}\n` +
      `3. Argumento 1 (D1): ${projectAnswers.arg1 || '(Vazio)'}\n` +
      `4. Argumento 2 (D2): ${projectAnswers.arg2 || '(Vazio)'}\n` +
      `5. Introdução:\n${projectAnswers.intro || '(Vazio)'}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner Principal da Disciplina */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950 via-pink-900 to-slate-900 text-white shadow-xl border border-rose-500/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md">
                <PenTool className="w-3.5 h-3.5" /> Redação TJAM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/20 text-rose-100 border border-white/30 backdrop-blur-sm">
                ⭐ 3ª Aula de Hoje (Terça-feira)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950">
                <Clock className="w-3 h-3" /> 45 min
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Redação — Aula 01: Estrutura da Redação
            </h1>
            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-medium">
              Nível Intermediário — TJAM Assistente Judiciário. Nesta primeira aula, construímos a base técnica para produzir um texto organizado, claro e coerente: Introdução, Desenvolvimento, Conclusão, Tese, Argumentos, Coesão e Coerência.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('video')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/20 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-rose-300" />
                <span>Vídeo Aula</span>
              </button>
            )}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('questoes')}
                className="px-4 py-2.5 rounded-xl bg-white text-rose-950 hover:bg-rose-50 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-rose-600" />
                <span>20 Questões Gabaritadas</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Roteiro Didático / Visão Geral da Estrutura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-wider mb-2">
            <span className="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs">1</span>
            <span>🟦 Introdução</span>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Apresentar o Tema e a Tese</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Situa o leitor no assunto, contextualiza a discussão e delimita o direcionamento argumentativo a ser defendido.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider mb-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs">2</span>
            <span>🟨 Desenvolvimento</span>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Fundamentar e Argumentar</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Explica as razões (causa, consequência, dados, exemplos). Não basta afirmar: é preciso justificar o porquê de cada ideia.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider mb-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs">3</span>
            <span>🟩 Conclusão</span>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Encerrar e Sintetizar</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Retoma a discussão sem rupturas bruscas, sintetiza a ideia principal e fecha a linha de raciocínio de maneira coerente.
          </p>
        </div>
      </div>

      {/* Conteúdo Teórico Completo dos 14 Tópicos */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Teoria Completa — Estrutura da Redação (14 Tópicos)
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {Object.values(readTopics).filter(Boolean).length} de 14 lidos
          </span>
        </div>

        {/* 1. O que é uma redação? */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">01</span>
              O que é uma redação?
            </h3>
            <button
              onClick={() => toggleTopic('t1')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t1'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t1'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A redação é a <strong>organização de ideias por meio da linguagem escrita</strong> para transmitir uma mensagem de maneira clara, coerente e adequada ao objetivo proposto. Em uma prova de concurso como o TJAM, não basta escrever bastante. É necessário:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Compreender o tema em sua totalidade
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Selecionar informações e argumentos relevantes
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Organizar ideias com progressão textual
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Desenvolver argumentação fundamentada
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Utilizar linguagem formal e adequada
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Concluir o texto de forma coerente e concisa
            </div>
          </div>
        </section>

        {/* 2. Estrutura básica */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">02</span>
              Estrutura Básica e Esquema Mental
            </h3>
            <button
              onClick={() => toggleTopic('t2')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t2'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t2'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-around gap-4 text-center font-black text-xs sm:text-sm">
            <div className="text-blue-600 dark:text-blue-400">
              <span className="block text-xl">🟦</span>
              <span>INTRODUÇÃO</span>
              <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400">Apresentar</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 hidden sm:block" />
            <div className="text-amber-600 dark:text-amber-400">
              <span className="block text-xl">🟨</span>
              <span>DESENVOLVIMENTO</span>
              <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400">Desenvolver</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 hidden sm:block" />
            <div className="text-emerald-600 dark:text-emerald-400">
              <span className="block text-xl">🟩</span>
              <span>CONCLUSÃO</span>
              <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400">Concluir</span>
            </div>
          </div>
        </section>

        {/* 3. Introdução */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">03</span>
              A Introdução: Os 3 Elementos Essenciais
            </h3>
            <button
              onClick={() => toggleTopic('t3')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t3'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t3'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A introdução deve deixar claro para o leitor sobre o que o texto tratará. Uma boa introdução normalmente apresenta:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            <li><strong>Contextualização:</strong> Apresenta o cenário geral em que o tema se insere.</li>
            <li><strong>Apresentação do tema:</strong> Nomeia de forma precisa o assunto delimitado pela banca.</li>
            <li><strong>Direcionamento da discussão (Tese):</strong> Estabelece o ponto de vista que será sustentado.</li>
          </ol>
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
            <span className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300 tracking-wider">
              Exemplo Prático (Tema: A importância da tecnologia no serviço público):
            </span>
            <blockquote className="italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-3 border-l-2 border-blue-500 leading-relaxed">
              “A tecnologia tem transformado a maneira como os serviços públicos são oferecidos à população. A utilização de ferramentas digitais pode facilitar o acesso do cidadão às instituições e tornar determinados procedimentos mais rápidos. Nesse contexto, a modernização dos serviços públicos apresenta oportunidades e desafios que precisam ser considerados.”
            </blockquote>
          </div>
        </section>

        {/* 4 e 5. Desenvolvimento e Argumentação */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">04 & 05</span>
              Desenvolvimento e Métodos de Argumentação
            </h3>
            <button
              onClick={() => toggleTopic('t4')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t4'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t4'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Não basta afirmar <em>“A tecnologia é importante”</em>. É obrigatório explicar o <strong>porquê</strong>. A sequência de ouro é:
          </p>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/30 text-xs font-black text-center">
            IDEIA CENTRAL → EXPLICAÇÃO → CONSEQUÊNCIA / EXEMPLO
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <span className="font-black text-slate-900 dark:text-white text-xs uppercase flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-500" /> Causa e Consequência
              </span>
              <p className="text-slate-600 dark:text-slate-300 italic">
                “A digitalização facilita o acesso aos serviços, pois permite que determinadas solicitações sejam realizadas remotamente.”
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <span className="font-black text-slate-900 dark:text-white text-xs uppercase flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Exemplificação
              </span>
              <p className="text-slate-600 dark:text-slate-300 italic">
                “Um exemplo dessa transformação é a utilização de sistemas eletrônicos para acompanhamento de processos no TJAM.”
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <span className="font-black text-slate-900 dark:text-white text-xs uppercase flex items-center gap-1.5">
                <Split className="w-3.5 h-3.5 text-amber-500" /> Comparação
              </span>
              <p className="text-slate-600 dark:text-slate-300 italic">
                “Diferentemente dos procedimentos exclusivamente físicos, os sistemas digitais permitem maior facilidade de consulta aos autos.”
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <span className="font-black text-slate-900 dark:text-white text-xs uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" /> Explicação Lógica
              </span>
              <p className="text-slate-600 dark:text-slate-300 italic">
                “Isso ocorre porque as informações podem ser organizadas e disponibilizadas em ambiente eletrônico seguro.”
              </p>
            </div>
          </div>
        </section>

        {/* 6. Estrutura do Parágrafo */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">06</span>
              O Parágrafo Padrão: Uma Ideia Central por Vez
            </h3>
            <button
              onClick={() => toggleTopic('t6')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t6'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t6'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            O parágrafo deve desenvolver uma ideia central com unidade temática:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 text-center">
            Frase principal (Tópico) → Explicação → Desenvolvimento → Fechamento
          </div>
          <blockquote className="italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-3 border-l-2 border-amber-500 leading-relaxed">
            “A tecnologia pode melhorar o acesso aos serviços públicos. Plataformas digitais permitem que o cidadão consulte informações sem precisar comparecer presencialmente a determinados locais. Além disso, sistemas eletrônicos podem facilitar o acompanhamento de solicitações e documentos. Assim, a utilização adequada da tecnologia pode contribuir para ampliar a acessibilidade dos serviços.”
          </blockquote>
        </section>

        {/* 7. Conclusão */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">07</span>
              A Conclusão: Fechamento Perfeito
            </h3>
            <button
              onClick={() => toggleTopic('t7')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t7'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t7'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A conclusão encerra o raciocínio apresentado sem terminar de forma abrupta ou inventar argumentos não discutidos. Ela cumpre 3 papéis:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs font-bold">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              1. Retomar a discussão
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              2. Sintetizar a ideia central
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              3. Apresentar um fechamento
            </div>
          </div>
          <blockquote className="italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-3 border-l-2 border-emerald-500 leading-relaxed">
            “Portanto, a utilização da tecnologia pode contribuir para tornar os serviços públicos mais acessíveis e eficientes. Para isso, é importante que a transformação digital seja acompanhada de segurança, organização e mecanismos que permitam o atendimento adequado aos diferentes perfis de cidadãos.”
          </blockquote>
        </section>

        {/* 8 e 9. Coerência e Coesão */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">08 & 09</span>
              Coerência (Sentido Lógico) × Coesão (Ligação Linguística)
            </h3>
            <button
              onClick={() => toggleTopic('t8')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t8'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t8'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 space-y-2">
              <span className="text-xs font-black text-red-600 dark:text-red-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4" /> Exemplo Incoerente (Contradição)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                “A tecnologia facilita o acesso aos serviços públicos. Por isso, os documentos digitais devem ser utilizados exclusivamente em papel.”
              </p>
              <p className="text-[11px] text-red-700 dark:text-red-300 font-medium">
                ❌ Fratura lógica: se a tecnologia digital facilita, não faz sentido exigir papel exclusivo.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-4 h-4" /> Exemplo Coerente
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                “A tecnologia facilita o acesso aos serviços públicos. Por isso, a utilização de documentos digitais pode reduzir determinadas dificuldades relacionadas ao atendimento presencial.”
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                ✅ Raciocínio harmônico, com causa e consequência compatíveis.
              </p>
            </div>
          </div>

          {/* Tabela de Conectivos */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              Arsenal de Conectivos Coesivos para o TJAM:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">Adição</span>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight block">além disso, também, ainda, bem como</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Causa</span>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight block">porque, pois, uma vez que, devido a</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Consequência</span>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight block">assim, desse modo, consequentemente</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">Contraste</span>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight block">porém, entretanto, contudo, embora</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Conclusão</span>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight block">portanto, em síntese, por fim, logo</span>
              </div>
            </div>
          </div>
        </section>

        {/* 10 e 11. Tema x Assunto e Fuga ao Tema */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">10 & 11</span>
              Tema × Assunto e Como Evitar a Fuga ao Tema
            </h3>
            <button
              onClick={() => toggleTopic('t10')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t10'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t10'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Assunto (Mais Amplo)</span>
              <p className="font-extrabold text-sm text-slate-900 dark:text-white">Ex.: “Tecnologia”</p>
              <p className="text-slate-600 dark:text-slate-300">É o campo genérico de conhecimento.</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-1.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 uppercase">Tema (Recorte Específico)</span>
              <p className="font-extrabold text-sm text-slate-900 dark:text-white">Ex.: “Os impactos da tecnologia na prestação de serviços públicos”</p>
              <p className="text-slate-600 dark:text-slate-300">É exatamente a questão-problema delimitada pela banca examinadora.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200">
            <Target className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>🎯 Regra Prática Anti-Fuga:</strong> Antes de começar a escrever qualquer linha, faça a si mesmo a pergunta-chave: <em>“O que exatamente o tema está pedindo que eu discuta?”</em>. Falar da história da internet quando o tema é inclusão no serviço público zera a redação por fuga temática!
            </div>
          </div>
        </section>

        {/* 12. Linguagem Adequada */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">12</span>
              Linguagem Adequada para Concurso Público
            </h3>
            <button
              onClick={() => toggleTopic('t12')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t12'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t12'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Prefira Sempre:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li>• Clareza e objetividade direta</li>
                <li>• Precisão vocabular técnica e jurídica</li>
                <li>• Linguagem formal na norma-padrão</li>
                <li>• Frases bem pontuadas e períodos equilibrados</li>
              </ul>
              <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/70 text-emerald-900 dark:text-emerald-200 font-mono text-[11px]">
                ✅ “A tecnologia pode facilitar o acesso da população aos serviços públicos.”
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 space-y-2">
              <span className="font-bold text-red-700 dark:text-red-300 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Evite a Todo Custo:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li>• Gírias, clichês e chavões populares</li>
                <li>• Abreviações informais de internet (vc, tbm, etc.)</li>
                <li>• Tom de bate-papo íntimo ou primeira pessoa (eu acho)</li>
                <li>• Períodos labirínticos, confusos e sem ponto final</li>
              </ul>
              <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/70 text-red-900 dark:text-red-200 font-mono text-[11px]">
                ❌ “A tecnologia é muito top e ajuda bastante a galera.”
              </div>
            </div>
          </div>
        </section>

        {/* 13 e 14. Planejamento e Modelo Básico */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">13 & 14</span>
              Planejamento em 5 Etapas e Modelo Estrutural
            </h3>
            <button
              onClick={() => toggleTopic('t13')}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                readTopics['t13'] ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> {readTopics['t13'] ? 'Concluído' : 'Marcar lido'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-rose-500 font-black block">Etapa 1</span>
              <span className="font-bold text-slate-900 dark:text-white">Leia o Tema</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-rose-500 font-black block">Etapa 2</span>
              <span className="font-bold text-slate-900 dark:text-white">Defina a Tese</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-rose-500 font-black block">Etapa 3</span>
              <span className="font-bold text-slate-900 dark:text-white">Separe 2 Args</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-rose-500 font-black block">Etapa 4</span>
              <span className="font-bold text-slate-900 dark:text-white">Organize</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-rose-500 font-black block">Etapa 5</span>
              <span className="font-bold text-slate-900 dark:text-white">Revise</span>
            </div>
          </div>
        </section>

        {/* Exemplo Completo de Redação */}
        <section className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-rose-200 dark:border-rose-900/50 shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              🎯 Exemplo Completo de Redação Nota Máxima
            </h3>
          </div>
          <div className="text-xs font-bold text-rose-700 dark:text-rose-300">
            Tema Oficial: A importância da tecnologia para os serviços públicos
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900/50">
              <span className="text-[10px] font-sans font-black uppercase text-blue-600 dark:text-blue-400 block mb-1">
                [1] Introdução (Contexto + Tema + Tese)
              </span>
              “A transformação digital modificou diversas atividades da sociedade e também alcançou os serviços públicos. A utilização de ferramentas tecnológicas pode facilitar o acesso da população às instituições e contribuir para a modernização dos procedimentos. Entretanto, essa transformação precisa ser acompanhada de medidas que garantam segurança e acessibilidade.”
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/50">
              <span className="text-[10px] font-sans font-black uppercase text-amber-600 dark:text-amber-400 block mb-1">
                [2] Desenvolvimento 1 (Argumento 1: Praticidade e Cidadania)
              </span>
              “Um dos benefícios da digitalização é a possibilidade de realizar determinados procedimentos de maneira mais rápida e conveniente. Sistemas eletrônicos permitem o armazenamento e a consulta de informações, reduzindo a necessidade de deslocamentos em determinadas situações. Dessa forma, o cidadão pode ter maior facilidade para acompanhar serviços e solicitações.”
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/50">
              <span className="text-[10px] font-sans font-black uppercase text-amber-600 dark:text-amber-400 block mb-1">
                [3] Desenvolvimento 2 (Argumento 2: Eficiência e Segurança Administrativa)
              </span>
              “Além disso, a tecnologia pode contribuir para melhorar a organização administrativa. Quando informações são armazenadas e processadas adequadamente, os servidores podem localizar dados com maior facilidade e acompanhar procedimentos de maneira mais estruturada. Contudo, é necessário garantir mecanismos de segurança e proteção das informações.”
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-900/50">
              <span className="text-[10px] font-sans font-black uppercase text-emerald-600 dark:text-emerald-400 block mb-1">
                [4] Conclusão (Retomada + Síntese + Fechamento)
              </span>
              “Portanto, a tecnologia pode desempenhar papel relevante na modernização dos serviços públicos. Seu uso adequado pode facilitar o atendimento e a organização administrativa, desde que seja acompanhado de segurança, acessibilidade e planejamento.”
            </div>
          </div>
        </section>
      </div>

      {/* ATIVIDADE PRÁTICA INTERATIVA: PROJETO DE REDAÇÃO */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-900/80 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-wider">
              <PenTool className="w-4 h-4" /> Atividade Prática — Fixação
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              📱 Montar Projeto de Redação & Enviar ao Professor
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Tema proposto: <strong>{redacaoPracticalTask.theme}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyProject}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedText ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={handleSaveProject}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{savedProjectSuccess ? 'Salvo!' : 'Salvar Respostas'}</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
          <Target className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Objetivo Pedagógico:</strong> Não é necessário redigir a redação inteira agora. O objetivo é demonstrar que você domina o <em>planejamento estrutural</em> (Tema, Tese, Argumento 1, Argumento 2 e Introdução), prevenindo a fuga ao tema e ideias desconectadas.
          </span>
        </div>

        {/* Formulário Interativo do Projeto */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* 1. Tema */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">1</span>
              Tema: Qual é o assunto e recorte exato?
            </label>
            <input
              type="text"
              value={projectAnswers.tema}
              onChange={(e) => setProjectAnswers(prev => ({ ...prev, tema: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Ex: A importância da qualidade no atendimento ao cidadão no serviço público."
            />
          </div>

          {/* 2. Tese */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">2</span>
              Tese: Qual ideia central você pretende defender?
            </label>
            <textarea
              rows={2}
              value={projectAnswers.tese}
              onChange={(e) => setProjectAnswers(prev => ({ ...prev, tese: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Ex: Defender que o atendimento de excelência depende da humanização do contato e da capacitação contínua dos servidores judiciários."
            />
          </div>

          {/* 3. Argumento 1 */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">3</span>
              Argumento 1: Qual será o primeiro ponto desenvolvido (D1)?
            </label>
            <input
              type="text"
              value={projectAnswers.arg1}
              onChange={(e) => setProjectAnswers(prev => ({ ...prev, arg1: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Ex: A capacitação técnica e empatia reduzem ruídos na comunicação e aceleram a resolução de dúvidas."
            />
          </div>

          {/* 4. Argumento 2 */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">4</span>
              Argumento 2: Qual será o segundo ponto desenvolvido (D2)?
            </label>
            <input
              type="text"
              value={projectAnswers.arg2}
              onChange={(e) => setProjectAnswers(prev => ({ ...prev, arg2: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Ex: A simplificação da linguagem e modernização dos balcões de atendimento garantem acessibilidade ao jurisdicionado vulnerável."
            />
          </div>

          {/* 5. Introdução */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">5</span>
              Introdução: Escreva uma introdução de 4 a 6 linhas apresentando tema e tese
            </label>
            <textarea
              rows={4}
              value={projectAnswers.intro}
              onChange={(e) => setProjectAnswers(prev => ({ ...prev, intro: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed"
              placeholder="Escreva aqui seu parágrafo introdutório de 4 a 6 linhas..."
            />
          </div>
        </div>

        {/* Botão de Envio WhatsApp */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Suas respostas ficam salvas no navegador e podem ser enviadas diretamente pelo WhatsApp.
          </span>
          <button
            onClick={handleSendWhatsApp}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Projeto ao Professor (WhatsApp)</span>
          </button>
        </div>
      </div>

      {/* 10 Objetivos da Aula (Metas de Aprendizagem) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
          <Target className="w-4 h-4" /> Checklist de Habilidades
        </div>
        <h3 className="text-base font-black">
          🎯 Ao finalizar esta aula, você deverá conseguir:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
          {[
            '1. Identificar as três partes básicas de uma redação',
            '2. Elaborar uma introdução com tema e tese',
            '3. Desenvolver um argumento com causa e consequência',
            '4. Construir uma conclusão coerente com fechamento',
            '5. Diferenciar na prática coerência e coesão',
            '6. Identificar e delimitar tema versus assunto',
            '7. Evitar com segurança a fuga total ou parcial ao tema',
            '8. Utilizar conectivos de adição, oposição e conclusão',
            '9. Organizar ideias no rascunho antes de escrever',
            '10. Produzir um projeto de redação com estrutura lógica'
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {onToggleCompleted && (
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onToggleCompleted}
              className={`px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isLessonCompleted
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLessonCompleted ? 'Aula Concluída ✓' : 'Marcar Aula como Concluída'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
