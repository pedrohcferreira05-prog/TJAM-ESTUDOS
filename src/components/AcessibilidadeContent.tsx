import React, { useState } from 'react';
import {
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
  ChevronRight,
  Shield,
  HeartHandshake,
  Users,
  Eye,
  Ear,
  Brain,
  Compass,
  Building2,
  Award,
  Copy,
  Video,
  MessageSquare
} from 'lucide-react';
import {
  acessibilidadePracticalSimulatorScenarios,
  acessibilidadePracticalTask,
} from '../data/acessibilidadeLessonData';

interface AcessibilidadeContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const AcessibilidadeContent: React.FC<AcessibilidadeContentProps> = ({
  isDarkMode: _isDarkMode = false,
  isLessonCompleted = false,
  onToggleCompleted,
  onNavigateTab,
}) => {
  // Checklist interativo de leitura dos tópicos
  const [readTopics, setReadTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_acessibilidade_read_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTopic = (id: string) => {
    setReadTopics((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_acessibilidade_read_topics', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // State para o Simulador de Atendimento Acessível no Balcão do TJAM
  const [simulatorSelections, setSimulatorSelections] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('tjam_acessibilidade_sim_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleSelectSimOption = (scenarioId: string, optionId: string) => {
    setSimulatorSelections((prev) => {
      const next = { ...prev, [scenarioId]: optionId };
      try {
        localStorage.setItem('tjam_acessibilidade_sim_answers', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // State para Atividade Prática — Fixação (WhatsApp)
  const [practicalAnswers, setPracticalAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('tjam_acessibilidade_pratica_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [copiedTaskText, setCopiedTaskText] = useState(false);
  const [showSuggestedAnswers, setShowSuggestedAnswers] = useState(false);

  const handleUpdatePracticalAnswer = (num: number, val: string) => {
    setPracticalAnswers((prev) => {
      const next = { ...prev, [num]: val };
      try {
        localStorage.setItem('tjam_acessibilidade_pratica_answers', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSendPracticalWhatsApp = () => {
    const text = `*ATIVIDADE PRÁTICA — FIXAÇÃO (ACESSIBILIDADE E LEGISLAÇÃO CORRELATA — AULA 01)*%0A%0A` +
      `*Cenário:* Você é Assistente Judiciário e está atendendo uma pessoa com deficiência que precisa obter informações sobre um procedimento judicial, mas encontra dificuldade para acessar a informação disponibilizada.%0A%0A` +
      `*1. Qual barreira pode estar dificultando o atendimento?*%0A${encodeURIComponent(practicalAnswers[1] || 'Não respondido')}%0A%0A` +
      `*2. Que atitude você adotaria para tornar a informação acessível?*%0A${encodeURIComponent(practicalAnswers[2] || 'Não respondido')}%0A%0A` +
      `*3. Qual direito ou princípio da LBI está sendo aplicado?*%0A${encodeURIComponent(practicalAnswers[3] || 'Não respondido')}%0A%0A` +
      `*4. Por que o servidor deve respeitar a autonomia da pessoa com deficiência?*%0A${encodeURIComponent(practicalAnswers[4] || 'Não respondido')}%0A%0A` +
      `_Enviado pelo aluno via Portal TJAM Estudos Preparatórios_`;

    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyPracticalTask = () => {
    const text = `ATIVIDADE PRÁTICA — FIXAÇÃO (ACESSIBILIDADE E LEGISLAÇÃO CORRELATA — AULA 01)\n\n` +
      `Cenário: Você é Assistente Judiciário e está atendendo uma pessoa com deficiência que precisa obter informações sobre um procedimento judicial, mas encontra dificuldade para acessar a informação disponibilizada.\n\n` +
      `1. Qual barreira pode estar dificultando o atendimento?\n${practicalAnswers[1] || '(Vazio)'}\n\n` +
      `2. Que atitude você adotaria para tornar a informação acessível?\n${practicalAnswers[2] || '(Vazio)'}\n\n` +
      `3. Qual direito ou princípio da LBI está sendo aplicado?\n${practicalAnswers[3] || '(Vazio)'}\n\n` +
      `4. Por que o servidor deve respeitar a autonomia da pessoa com deficiência?\n${practicalAnswers[4] || '(Vazio)'}\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedTaskText(true);
      setTimeout(() => setCopiedTaskText(false), 3000);
    });
  };

  const completedCount = Object.values(readTopics).filter(Boolean).length;
  const totalTopics = 12;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      
      {/* HEADER BANNER: DISCIPLINA E NÍVEL */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 text-white shadow-xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Users className="w-3.5 h-3.5" /> Acessibilidade e Legislação Correlata
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Award className="w-3 h-3" /> TJAM Assistente Judiciário
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Clock className="w-3 h-3" /> Nível Intermediário
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>♿ Aula 01 — Lei Brasileira de Inclusão (LBI)</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Base normativa: <strong>Lei nº 13.146/2015</strong> (Estatuto da Pessoa com Deficiência). Compreenda o modelo biopsicossocial, a eliminação de barreiras, os deveres do servidor público e a aplicação prática no atendimento judiciário do TJAM.
            </p>
          </div>

          {/* Barra de Progresso de Leitura */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">Progresso dos 12 tópicos:</span>
              <span className="font-extrabold text-teal-400">{completedCount} de {totalTopics} lidos ({progressPercent}%)</span>
            </div>
            <div className="w-full sm:w-48 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-white/10">
              <div 
                className="bg-gradient-to-r from-teal-400 to-indigo-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUADRO DE RESUMO E DIRETRIZES DA AULA */}
      <section className="p-6 rounded-3xl border bg-teal-500/5 border-teal-500/20 dark:bg-teal-950/20">
        <h2 className="text-base font-black text-teal-700 dark:text-teal-400 mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Objetivos Pedagógicos da Aula 01
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
          Nesta primeira aula, vamos construir a base sólida e prática para gabaritar a Lei nº 13.146/2015 no concurso do TJAM. O foco é entender os direitos da pessoa com deficiência e a atuação diária do Assistente Judiciário:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span>Identificar o conceito legal de pessoa com deficiência (impedimento de longo prazo + barreiras).</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span>Compreender a avaliação biopsicossocial multiprofissional da deficiência.</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span>Classificar os 6 tipos de barreiras (urbanísticas, arquitetônicas, transportes, comunicação, atitudinais e tecnológicas).</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span>Aplicar os deveres de atendimento acessível, igualitário e prioritário no balcão do TJAM.</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. O QUE É A LEI BRASILEIRA DE INCLUSÃO? */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">1</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">O que é a Lei Brasileira de Inclusão?</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico1']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico1'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico1'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>Lei nº 13.146/2015</strong> foi criada para assegurar e promover, em condições de igualdade, o exercício dos direitos e das liberdades fundamentais pela pessoa com deficiência, buscando sua <strong>inclusão social e cidadania</strong>.
        </p>

        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-indigo-600" /> A Mudança de Paradigma: Direitos vs. Mera Assistência
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            A lei adota uma perspectiva de <strong>direitos, igualdade, autonomia e participação social</strong>, e não de simples assistência caritativa ou tutela paternalista. A pessoa com deficiência é sujeito ativo de direitos, dotada de plena capacidade civil na ordem jurídica.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUEM É CONSIDERADA PESSOA COM DEFICIÊNCIA? */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">2</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Quem é considerada pessoa com deficiência?</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico2')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico2']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico2'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico2'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Para a LBI (Art. 2º), considera-se pessoa com deficiência aquela que possui:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center gap-2">
            <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-black text-slate-900 dark:text-white">Impedimento Físico</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Alteração completa ou parcial de segmentos do corpo</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center gap-2">
            <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-black text-slate-900 dark:text-white">Impedimento Mental</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Condições psicológicas e psicossociais</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-black text-slate-900 dark:text-white">Impedimento Intelectual</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Funcionamento cognitivo e adaptativo</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center gap-2">
            <Eye className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-black text-slate-900 dark:text-white">Impedimento Sensorial</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Visual (cegueira/baixa visão) ou auditivo (surdez)</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          "...o qual, <strong>em interação com uma ou mais barreiras</strong>, pode dificultar sua participação plena e efetiva na sociedade em igualdade de condições com as demais pessoas."
        </p>

        {/* ALERTA DE PROVA */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-xs font-black uppercase tracking-wider">⚠️ Atenção Máxima para a Prova FGV / TJAM</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>Não basta olhar apenas para o impedimento individual!</strong> A lei considera a <strong>interação com as barreiras existentes na sociedade</strong>.
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300">
            <strong>Exemplo:</strong> Uma pessoa com deficiência física pode ter dificuldade de acesso a determinado prédio não simplesmente por sua condição física, mas porque o prédio possui escadas e não oferece rampa ou acessibilidade adequada.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. AVALIAÇÃO DA DEFICIÊNCIA */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">3</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Avaliação da Deficiência: Modelo Biopsicossocial</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico3')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico3']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico3'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico3'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A avaliação da deficiência, quando necessária, deve considerar uma <strong>perspectiva biopsicossocial</strong>, realizada por equipe multiprofissional e interdisciplinar.
        </p>

        <div className="space-y-2 text-xs">
          <p className="font-bold text-slate-900 dark:text-white">São considerados, entre outros aspectos:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
              <span>Impedimentos nas funções e estruturas do corpo;</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
              <span>Fatores socioambientais, psicológicos e pessoais;</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
              <span>Limitação no desempenho de atividades cotidianas;</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
              <span>Restrição de participação na vida social e comunitária.</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-950 dark:text-teal-200">
          <div className="flex items-center gap-2 font-black mb-1">
            <Lightbulb className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>📌 Regra de Ouro para Memorizar:</span>
          </div>
          <p className="leading-relaxed">
            <strong>Deficiência não deve ser analisada isoladamente como doença individual.</strong> É indispensável observar a relação dinâmica entre a pessoa e o ambiente no qual ela está inserida.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. IGUALDADE E NÃO DISCRIMINAÇÃO */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">4</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Igualdade e Não Discriminação</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico4')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico4']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico4'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico4'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A pessoa com deficiência possui os <strong>mesmos direitos fundamentais</strong> assegurados às demais pessoas, sob a égide do princípio constitucional da dignidade da pessoa humana.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h4 className="text-xs font-black uppercase text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Proteção Expressa Contra:
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-rose-800 dark:text-rose-300">
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50">discriminação</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50">negligência</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50">exploração</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50">violência</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50">tortura</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50">tratamento desumano</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <h4 className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Direitos Fundamentais Preservados:
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">vida</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">saúde</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">educação</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">trabalho</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">moradia</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">transporte</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">acessibilidade</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">participação social</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DISCRIMINAÇÃO EM RAZÃO DA DEFICIÊNCIA */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">5</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Discriminação em Razão da Deficiência</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico5')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico5']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico5'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico5'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A discriminação não precisa ocorrer somente por uma proibição expressa ou ofensa direta. Ela se configura quando existe:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-extrabold">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
            DISTINÇÃO
          </div>
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
            RESTRIÇÃO
          </div>
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
            EXCLUSÃO
          </div>
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
            IMPEDIMENTO
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          ...que tenha o propósito ou efeito de prejudicar ou impedir o reconhecimento ou o exercício dos direitos.
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
          <span className="font-extrabold text-slate-900 dark:text-white">Exemplo Prático:</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Um órgão público não pode deixar de prestar determinado atendimento a uma pessoa simplesmente porque ela possui deficiência. O servidor deve buscar ativamente garantir atendimento adequado e acessível.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ATENDIMENTO PRIORITÁRIO */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">6</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Atendimento Prioritário</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico6')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico6']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico6'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico6'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A pessoa com deficiência possui direito a <strong>atendimento prioritário</strong> nas situações previstas em lei (Art. 9º da LBI).
        </p>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          No serviço público e nas dependências do Poder Judiciário, isso exige que o atendimento seja organizado de forma a permitir o exercício efetivo desse direito (balcões específicos, assentos reservados, chamada preferencial e tramitação prioritária de feitos judiciais).
        </p>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200">
          <strong>⚠️ Alerta para prova:</strong> Atendimento prioritário <strong>não significa ausência de regras ou procedimentos</strong>. Significa garantir prioridade dentro das condições estabelecidas pela legislação, mantendo-se os requisitos formais de legalidade.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ACESSIBILIDADE */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">7</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Acessibilidade: Segurança e Autonomia</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico7')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico7']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico7'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico7'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Acessibilidade é um dos conceitos centrais da LBI. Ela envolve a possibilidade de utilização, <strong>com segurança e autonomia</strong>, de:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Espaços físicos</span>
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Mobiliários</span>
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Equipamentos</span>
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Transportes</span>
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Informação</span>
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Comunicação</span>
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Serviços públicos</span>
          <span className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">Tecnologias</span>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 space-y-2">
          <span className="text-xs font-black text-teal-800 dark:text-teal-300 uppercase">Exemplos no Serviço Judiciário:</span>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
            <li>Rampas ou plataforma elevatória em fóruns;</li>
            <li>Sinalização visual e tátil acessível (piso tátil, placas em relevo e Braille);</li>
            <li>Recursos de tecnologia assistiva no sistema de processo eletrônico;</li>
            <li>Comunicação acessível com intérpretes de Libras e legendas;</li>
            <li>Atendimento adequado e humanizado a pessoas com diferentes deficiências.</li>
          </ul>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. BARREIRAS */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">8</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Os 6 Tipos de Barreiras (Art. 3º, IV da LBI)</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico8')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico8']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico8'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico8'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Barreiras são quaisquer entraves, obstáculos, atitudes ou comportamentos que limitem ou impeçam a participação social da pessoa com deficiência.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">1. Urbanísticas</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Vias e espaços públicos abertos (calçadas esburacadas, sem rampa).</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">2. Arquitetônicas</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">No interior de edifícios públicos e privados (escadarias sem elevador).</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">3. Nos Transportes</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Veículos e sistemas de transporte sem adaptação adequada.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">4. Comunicação / Informação</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Obstáculos à emissão e recepção de mensagens (ausência de Libras/Braille).</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">5. Atitudinais</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Preconceitos, estereótipos, descaso ou recusa de atendimento.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">6. Tecnológicas</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Sistemas digitais e softwares que impedem o acesso por leitores de tela.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300">
          <strong>🧠 Exemplo para Prova:</strong> Se um cidadão surdo não consegue compreender uma informação porque o serviço judicial não oferece recurso adequado de comunicação (como intérprete ou texto acessível), existe uma <strong>barreira nas comunicações e na informação</strong>.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TECNOLOGIA ASSISTIVA */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">9</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Tecnologia Assistiva (Ajuda Técnica)</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico9')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico9']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico9'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico9'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Tecnologia assistiva compreende produtos, equipamentos, dispositivos, recursos, metodologias, estratégias, práticas e serviços que buscam proporcionar:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-black">
          <span className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">Autonomia</span>
          <span className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">Independência</span>
          <span className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">Qualidade de Vida</span>
          <span className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">Inclusão Social</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
          💡 <strong>Pegadinha FGV:</strong> Não se limita necessariamente a equipamentos eletrônicos ou computadores. Inclui também recursos táteis, bengalas, pranchas de comunicação, próteses, órteses e estratégias metodológicas de atendimento.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 10. O PAPEL DO SERVIDOR PÚBLICO */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">10</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">O Papel do Servidor Público (Assistente Judiciário)</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico10')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico10']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico10'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico10'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Para o Assistente Judiciário do TJAM, esse assunto possui aplicação prática diária na secretaria judicial e no balcão de atendimento:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400">✅ Respeito</span>
            <p className="text-slate-600 dark:text-slate-300">Tratar a pessoa com absoluta dignidade e urbanidade.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400">✅ Igualdade</span>
            <p className="text-slate-600 dark:text-slate-300">Não criar discriminações nem distinções pejorativas.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400">✅ Acessibilidade</span>
            <p className="text-slate-600 dark:text-slate-300">Buscar ativamente condições para que a pessoa acesse o serviço.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400">✅ Comunicação Adequada</span>
            <p className="text-slate-600 dark:text-slate-300">Adaptar a linguagem e a forma de comunicação quando necessário.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400">✅ Autonomia</span>
            <p className="text-slate-600 dark:text-slate-300">Evitar substituir a vontade ou decisões da pessoa sem necessidade.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400">✅ Inclusão</span>
            <p className="text-slate-600 dark:text-slate-300">Permitir a participação efetiva da pessoa nos atos processuais.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. EXEMPLO APLICADO AO TJAM */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">11</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Exemplo Aplicado ao TJAM</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico11')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico11']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico11'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico11'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Imagine que uma pessoa com deficiência visual compareça a uma unidade judicial do TJAM para obter informações sobre determinado procedimento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="font-extrabold text-rose-700 dark:text-rose-400">❌ Conduta Errada:</span>
            <p className="text-slate-700 dark:text-slate-300 italic">
              "Não posso atender porque você não consegue ler o documento. Traga um advogado ou parente para assinar."
            </p>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 pt-1">
              (Viola a LBI, configura barreira atitudinal e discriminação por omissão).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="font-extrabold text-emerald-700 dark:text-emerald-400">✅ Conduta Correta:</span>
            <p className="text-slate-700 dark:text-slate-300">
              Buscar uma forma acessível de prestar a informação (leitura em voz alta, envio em arquivo digital pesquisável legível por software), respeitando as necessidades do cidadão.
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 pt-1">
              (Acessibilidade + Igualdade + Atendimento Adequado + Inclusão).
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. O QUE VOCÊ PRECISA SABER PARA A PROVA (QUADRO SINÓPTICO) */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-6 sm:p-7 rounded-3xl border bg-gradient-to-br from-indigo-50/50 via-white to-teal-50/50 dark:from-slate-900 dark:to-slate-950 border-indigo-200 dark:border-indigo-900/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">12</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">🎯 O que Você Precisa Saber para a Prova (FGV/TJAM)</h2>
          </div>
          <button
            onClick={() => toggleTopic('topico12')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              readTopics['topico12']
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {readTopics['topico12'] ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{readTopics['topico12'] ? 'Tópico Lido' : 'Marcar Lido'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Lei nº 13.146/2015</span>
            <p className="text-slate-600 dark:text-slate-300">Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Pessoa com Deficiência</span>
            <p className="text-slate-600 dark:text-slate-300">Impedimento de longo prazo + Interação com barreiras sociais/físicas.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Avaliação da Deficiência</span>
            <p className="text-slate-600 dark:text-slate-300">Perspectiva biopsicossocial multiprofissional (corpo + ambiente + atividade).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Princípios Importantes</span>
            <p className="text-slate-600 dark:text-slate-300">Igualdade, dignidade, autonomia, não discriminação e inclusão social.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Acessibilidade</span>
            <p className="text-slate-600 dark:text-slate-300">Condição de alcance para utilização com segurança e autonomia total/assistida.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Barreiras</span>
            <p className="text-slate-600 dark:text-slate-300">Obstáculos à participação (urbanísticas, arquitetônicas, comunicação, atitudinais).</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs text-center font-medium">
          A LBI permanece como a principal referência legal desta matéria; a legislação posterior continua fazendo referência expressa a ela, inclusive em normas federais de 2026.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SIMULADOR INTERATIVO: ATENDIMENTO ACESSÍVEL NO BALCÃO DO TJAM */}
      {/* ========================================================================= */}
      <section className="space-y-6 p-6 sm:p-8 rounded-3xl border bg-gradient-to-br from-teal-950 via-slate-900 to-indigo-950 text-white shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" /> Laboratório Prático de Atendimento
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Simulador de Atendimento Acessível no Balcão do TJAM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Como futuro Assistente Judiciário, você vivenciará casos reais de atendimento no tribunal. Escolha a conduta alinhada à Lei nº 13.146/2015 e veja a fundamentação pedagógica imediata:
          </p>
        </div>

        <div className="space-y-6">
          {acessibilidadePracticalSimulatorScenarios.map((scen, idx) => {
            const selectedOptId = simulatorSelections[scen.id];
            const chosenOption = scen.opcoes.find((o) => o.id === selectedOptId);

            return (
              <div 
                key={scen.id} 
                className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 backdrop-blur-md"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-teal-300">
                    {scen.titulo}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    {scen.cenario}
                  </p>
                  <p className="text-xs font-black text-amber-300 pt-1">
                    {scen.pergunta}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {scen.opcoes.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectSimOption(scen.id, opt.id)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? opt.isCorreta
                              ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-100 font-bold'
                              : 'bg-rose-500/20 border-2 border-rose-400 text-rose-100 font-bold'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                          isSelected
                            ? opt.isCorreta ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            : 'bg-white/10 text-white'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="leading-snug pt-0.5">{opt.texto}</span>
                      </button>
                    );
                  })}
                </div>

                {chosenOption && (
                  <div className={`p-4 rounded-xl text-xs space-y-1 animate-in fade-in duration-300 ${
                    chosenOption.isCorreta
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                  }`}>
                    <div className="font-black flex items-center gap-1.5">
                      {chosenOption.isCorreta ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>GABARITO CORRETO!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>ATENÇÃO — CONDUTA INADEQUADA</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed opacity-90">{chosenOption.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BOTÕES DE NAVEGAÇÃO E CONCLUSÃO DA AULA */}
      {/* ========================================================================= */}
      <section className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onToggleCompleted}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula Concluída no Registro' : 'Marcar Aula como Concluída'}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => onNavigateTab && onNavigateTab('questoes')}
            className="px-4 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>Fazer 20 Questões da LBI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('flashcards')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Revisar 10 Flashcards</span>
          </button>
        </div>
      </section>

    </article>
  );
};
