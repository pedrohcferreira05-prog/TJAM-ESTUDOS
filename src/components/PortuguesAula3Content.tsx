import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Layers,
  HelpCircle,
  Brain,
  Play,
  ExternalLink,
  Target,
  Send,
  Building2,
  Bookmark,
  FileCheck2,
  Scale,
  Award,
  ChevronRight,
  ShieldCheck,
  Type
} from 'lucide-react';
import { portuguesAula3PracticalTask } from '../data/portuguesAula3LessonData';

interface PortuguesAula3ContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const PortuguesAula3Content: React.FC<PortuguesAula3ContentProps> = ({
  isDarkMode: _isDarkMode = false,
  isLessonCompleted = false,
  onToggleCompleted,
  onNavigateTab,
}) => {
  // Checklist interativo de leitura dos tópicos da aula
  const [readTopics, setReadTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_portugues3_read_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTopic = (id: string) => {
    setReadTopics((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_portugues3_read_topics', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // State da correção do texto da atividade prática
  const [studentRevisionText, setStudentRevisionText] = useState(() => {
    try {
      return localStorage.getItem('tjam_portugues3_revision_text') || '';
    } catch {
      return '';
    }
  });

  const handleRevisionChange = (val: string) => {
    setStudentRevisionText(val);
    try {
      localStorage.setItem('tjam_portugues3_revision_text', val);
    } catch {}
  };

  const [showCorrectionModel, setShowCorrectionModel] = useState(false);

  // Simulador de Ortografia e Escolha Rápida Forense
  const [selectedSimAnswers, setSelectedSimAnswers] = useState<Record<string, string>>({});

  const spellingChallenges = [
    {
      id: 'sc1',
      title: 'Desafio 1: Ata da Sessão do Pleno',
      context: 'Na redação da ata sobre a reunião solene do Tribunal:',
      options: [
        { id: 'A', text: 'A cessão do Pleno foi aberta às 9h para analisar o processo.', correct: false, note: '"Cessão" (com C) é o ato de ceder, doar ou transferir direitos.' },
        { id: 'B', text: 'A seção do Pleno foi aberta às 9h para analisar o proçesso.', correct: false, note: '"Seção" é repartição física; e "proçesso" com cedilha é proibido antes de E.' },
        { id: 'C', text: 'A sessão do Pleno foi aberta às 9h para analisar o processo.', correct: true, note: 'Exato! "Sessão" (reunião colegiada) e "processo" (com SS entre vogais).' }
      ]
    },
    {
      id: 'sc2',
      title: 'Desafio 2: Retificação de Minuta Cartorária',
      context: 'O servidor precisa corrigir um erro material de digitação na certidão:',
      options: [
        { id: 'A', text: 'O assistente vai retificar o documento, corrigindo o equívoco.', correct: true, note: 'Perfeito! "Retificar" é sinônimo de corrigir, emendar ou consertar.' },
        { id: 'B', text: 'O assistente vai ratificar o documento, corrigindo o equívoco.', correct: false, note: '"Ratificar" significa confirmar ou validar o que já foi dito.' }
      ]
    },
    {
      id: 'sc3',
      title: 'Desafio 3: Deslocamento Funcional',
      context: 'A respeito das diárias dos oficiais de justiça que viajam ao interior:',
      options: [
        { id: 'A', text: 'Esperamos que os servidores viajem com segurança durante a viagem oficial.', correct: true, note: 'Correto! "viajem" (verbo com J) e "viagem" (substantivo com G).' },
        { id: 'B', text: 'Esperamos que os servidores viagem com segurança durante a viajem oficial.', correct: false, note: 'Invertido! O verbo no subjuntivo é com J ("viajem") e o substantivo é com G ("viagem").' }
      ]
    }
  ];

  const handleSelectSim = (challengeId: string, optId: string) => {
    setSelectedSimAnswers((prev) => ({ ...prev, [challengeId]: optId }));
  };

  const generateWhatsAppMessage = () => {
    const text = `*📚 TJAM 2026 — Língua Portuguesa (Aula 03: Ortografia)*\n` +
      `*Aluno(a):* Envio das 5 Frases de Fixação Ortográfica\n\n` +
      `*Frases Elaboradas:*\n${studentRevisionText || portuguesAula3PracticalTask.suggestedPhrases.join('\n')}\n\n` +
      `*Palavras-Chave:* exceção, privilégio, ratificar, retificar, sessão\n` +
      `*Turma:* TJAM Assistente Judiciário • Português — Aula 03 🎯`;

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const PORTUGUES_VIDEO_URL = 'https://youtu.be/IMEVLUzWnNs?is=grQIYtcJ2o2odJYx';

  return (
    <article className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* HEADER DA AULA: LÍNGUA PORTUGUESA — AULA 03 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Type className="w-56 h-56 text-indigo-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              📚 Língua Portuguesa • Aula 03
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
              ⭐ 1ª Aula de Hoje (Segunda-feira)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-300">
              TJAM Assistente Judiciário • Nível Intermediário
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Ortografia Oficial e Casos Especiais
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Domine as regras que determinam a grafia correta na norma-padrão: <strong>S, SS, C, Ç, X e CH</strong>, o emprego de <strong>G e J</strong>, parônimos frequentes (<strong>ratificar × retificar</strong>, <strong>sessão × seção × cessão</strong>), o uso moderno do <strong>hífen</strong> e as modificações do <strong>Acordo Ortográfico</strong>.
            </p>
          </div>

          {/* Atalhos Rápidos */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('video')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-400" />
              <span>Assistir Videoaula</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('questoes')}
              className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-indigo-200" />
              <span>Resolver 20 Exercícios</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('flashcards')}
              className="px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <Brain className="w-4 h-4 text-sky-200" />
              <span>Praticar 10 Flashcards</span>
            </button>
            <a
              href={PORTUGUES_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-red-400" />
              <span>Abrir no YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BLOCO TEÓRICO CENTRAL — OS 8 TÓPICOS DA AULA */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Conteúdo Programático da Aula 03
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Marque os tópicos conforme sua leitura para acompanhar o progresso e desbloquear sua presença.
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
            {Object.values(readTopics).filter(Boolean).length} de 8 Tópicos Concluídos
          </span>
        </div>

        {/* TÓPICO 1: O QUE É ORTOGRAFIA? */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t1'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                1. Conceito Fundamental
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                O que é Ortografia?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Ortografia é o conjunto de regras e convenções gramaticais que determina a <strong>forma correta de grafar as palavras</strong> na língua portuguesa.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Nos concursos do Poder Judiciário (TJAM), as bancas costumam explorar pegadinhas envolvendo:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  ✍️ Emprego de Letras Semelhantes
                </span>
                <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  🔄 Homônimos e Parônimos
                </span>
                <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  ➖ Regras de Hífen
                </span>
                <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  📜 Acordo Ortográfico
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t1')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t1']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 2: EMPREGO DE S, SS, C, Ç, X E CH */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t2'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                2. Fonemas e Grafemas
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Emprego de S, SS, C, Ç, X e CH
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Muitas palavras apresentam o mesmo som (/s/ ou /ʃ/), porém grafias distintas. Dominar as posições fonéticas é indispensável:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <span>Letra S</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Com som de /z/ entre vogais: <em>casa, mesa, análise, pesquisa</em>.<br />
                    Se a palavra primitiva possui S, seus derivados mantêm o S: <em>análise → analisar</em>; <em>pesquisa → pesquisar</em>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-extrabold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <span>Dígrafo SS</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Geralmente aparece entre vogais com som de /s/: <em>necessário, processo, assunto, comissão, discussão, assessoria</em>.<br />
                    <strong className="text-rose-600 dark:text-rose-400">⚠️ Atenção:</strong> Não existe &quot;proçesso&quot; nem &quot;nescessário&quot;!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <span>Letra Ç (cê-cedilha)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    O <strong>ç</strong> só aparece antes de <strong>a, o, u</strong>: <em>informação, administração, organização, situação, proteção</em>.<br />
                    <strong className="text-rose-600 dark:text-rose-400">⚠️ Regra de Ouro:</strong> NUNCA se utiliza ç antes de <em>e</em> ou <em>i</em>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span>Letra C antes de E e I</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Diante de <strong>e</strong> e <strong>i</strong>, o C simples já tem som de /s/: <em>cidade, necessário, processo, decisão, serviço</em>.<br />
                    Observe: <em>serviço</em> (com ç no final) e <em>serviço público</em> mantêm a mesma grafia.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 md:col-span-2">
                  <div className="font-extrabold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                    <span>X e CH</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    • <strong>Com X:</strong> <em>próximo, exercício, máximo, texto, existência, praxe, faxina</em>.<br />
                    • <strong>Com CH:</strong> <em>chegar, preencher, chefe, chumbo, fachada</em>.<br />
                    <strong className="text-amber-600 dark:text-amber-400">⚠️ Pegadinha:</strong> &quot;Arquivo&quot; é escrito com <strong>qu</strong>, não com ch!
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t2')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t2']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 3: EMPREGO DE G E J */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t3'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                3. Consoantes Conflitantes
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Emprego de G e J
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Diante das vogais E e I, as letras G e J representam o mesmo som (/ʒ/). Veja o que memorizar:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <span className="font-black text-emerald-600 dark:text-emerald-400">Com G:</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    <em>viagem (substantivo), origem, objetivo, registro, legislação, privilégio, litígio</em>.<br />
                    Substantivos terminados em -agem, -igem, -ugem grafam-se com G (garagem, vertigem, ferrugem).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <span className="font-black text-amber-600 dark:text-amber-400">Com J:</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    <em>jeito, hoje, sujeito, projeto, justiça, traje, pajem</em>.<br />
                    Verbos terminados em -jar mantêm o J: <em>viajar → viajem, viajou</em>; <em>arranjar → arranje</em>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <div className="font-black text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Pegadinha Clássica de Prova: VIAGEM × VIAJEM</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  • <strong>Viagem (com G):</strong> é o SUBSTANTIVO. <em>&quot;A viagem foi realizada ontem pelo tribunal.&quot;</em><br />
                  • <strong>Viajem (com J):</strong> é a FORMA VERBAL (presente do subjuntivo). <em>&quot;Espero que eles viajem amanhã para a comarca.&quot;</em>
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t3')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t3']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 4: HOMÔNIMOS E PARÔNIMOS */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t4'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                4. Semântica e Grafia
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Homônimos e Parônimos
              </h3>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-extrabold text-xs text-indigo-600 dark:text-indigo-400 uppercase">
                    1. Homônimos (Mesmo som ou grafia, sentidos diferentes)
                  </h4>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li>• <strong>Cela</strong> (compartimento carcerário) × <strong>Sela</strong> (arreio para animais);</li>
                    <li>• <strong>Sessão</strong> (período de tempo, reunião, audiência: <em>sessão plenária</em>);</li>
                    <li>• <strong>Seção ou Secção</strong> (divisão, setor, departamento: <em>seção de protocolo</em>);</li>
                    <li>• <strong>Cessão</strong> (ato de ceder, transferir posse: <em>cessão de servidor</em>).</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-extrabold text-xs text-sky-600 dark:text-sky-400 uppercase">
                    2. Parônimos (Grafias e sons parecidos, sentidos diferentes)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Ratificar</strong> = confirmar, validar.<br />
                      <em>&quot;O servidor ratificou a informação.&quot;</em>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Retificar</strong> = corrigir, emendar.<br />
                      <em>&quot;Foi necessário retificar o documento.&quot;</em>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Eminente</strong> = ilustre, notável.<br />
                      <em>&quot;O eminente magistrado discursou.&quot;</em>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Iminente</strong> = prestes a acontecer.<br />
                      <em>&quot;Havia perigo iminente na estrutura.&quot;</em>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Cumprimento</strong> = saudação ou execução.<br />
                      <em>&quot;Ele prestou cumprimento formal.&quot;</em>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Comprimento</strong> = tamanho, extensão.<br />
                      <em>&quot;Mediu o comprimento da sala.&quot;</em>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t4')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t4']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 5: PALAVRAS QUE COSTUMAM APARECER EM PROVAS */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t5'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4 w-full">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                5. Tabela de Alta Frequência
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Palavras que Mais Caem nas Provas do TJAM
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A banca examina se você conhece os erros comuns cometidos na prática:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-black text-[10px]">
                    <tr>
                      <th className="px-4 py-2.5">Grafia Correta ✅</th>
                      <th className="px-4 py-2.5 text-rose-600 dark:text-rose-400">Grafia Incorreta (Armadilha) ❌</th>
                      <th className="px-4 py-2.5">Justificativa Regulatória</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">exceção</td>
                      <td className="px-4 py-2 text-rose-600 line-through">excessão</td>
                      <td className="px-4 py-2 text-slate-500">Com XC e Ç; jamais com SS.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">privilégio</td>
                      <td className="px-4 py-2 text-rose-600 line-through">previlégio</td>
                      <td className="px-4 py-2 text-slate-500">Inicia com PRI-, não com PRE-.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">necessário</td>
                      <td className="px-4 py-2 text-rose-600 line-through">nescessário</td>
                      <td className="px-4 py-2 text-slate-500">Não há SC na primeira sílaba; apenas C simples.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">assessoria</td>
                      <td className="px-4 py-2 text-rose-600 line-through">acessoria</td>
                      <td className="px-4 py-2 text-slate-500">Dígrafo SS na primeira e na segunda posição.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">benefício</td>
                      <td className="px-4 py-2 text-rose-600 line-through">beneficío</td>
                      <td className="px-4 py-2 text-slate-500">Proparoxítona relativa; acento no segundo I.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">exercício</td>
                      <td className="px-4 py-2 text-rose-600 line-through">exercicio</td>
                      <td className="px-4 py-2 text-slate-500">Acento obrigatório na sílaba -cí-.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">administração</td>
                      <td className="px-4 py-2 text-rose-600 line-through">adminstração</td>
                      <td className="px-4 py-2 text-slate-500">Contém a vogal I na sílaba intermediária (-nis-).</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">discussão</td>
                      <td className="px-4 py-2 text-rose-600 line-through">discução</td>
                      <td className="px-4 py-2 text-slate-500">Com SS entre vogais para som /s/.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-400">pesquisa / analisar</td>
                      <td className="px-4 py-2 text-rose-600 line-through">pesquiza / analizar</td>
                      <td className="px-4 py-2 text-slate-500">Radicais primitivos com S mantêm S nos derivados.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t5')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t5']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 6: HÍFEN */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t6'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                6. Emprego do Hífen
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Regras Essenciais do Hífen
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A regra do hífen é orientada principalmente pela afinidade das letras nos prefixos:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <span className="font-black text-indigo-600 dark:text-indigo-400">Com Hífen:</span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    <li>• Palavras compostas com unidade de sentido: <em>guarda-chuva, segunda-feira</em>.</li>
                    <li>• Prefixos com 'bem' e 'recém': <em>bem-estar, recém-nascido</em>.</li>
                    <li>• Prefixo 'vice-': sempre com hífen (<em>vice-presidente, vice-diretor</em>).</li>
                    <li>• Vogais iguais se repelem: <em>micro-ondas, anti-inflamatório</em>.</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <span className="font-black text-emerald-600 dark:text-emerald-400">Sem Hífen (Junto):</span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    <li>• Vogais diferentes se atraem: <em>infraestrutura, autoescola</em>.</li>
                    <li>• Consoantes R e S são dobradas se o prefixo termina em vogal: <em>antissocial, microrregião, ultrassom</em>.</li>
                  </ul>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t6')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t6']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 7: ACORDO ORTOGRÁFICO */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t7'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                7. Modernização Ortográfica
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Mudanças do Acordo Ortográfico
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                As bancas de concurso testam se o candidato ainda emprega normas antigas revogadas:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="font-black text-amber-800 dark:text-amber-300">1. Fim do Trema:</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    Abolido totalmente em palavras da língua portuguesa: <em>lingüiça ❌ → linguiça ✅</em>, <em>cinqüenta ❌ → cinquenta ✅</em>, <em>freqüente ❌ → frequente ✅</em>.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                  <span className="font-black text-sky-800 dark:text-sky-300">2. Fim do Acento nos Ditongos Abertos Paroxítonos:</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    Palavras paroxítonas com ditongos &quot;ei&quot; e &quot;oi&quot; não levam mais acento: <em>idéia ❌ → ideia ✅</em>, <em>assembléia ❌ → assembleia ✅</em>, <em>platéia ❌ → plateia ✅</em>.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t7')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t7']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 8: PEGADINHAS DE PROVA & RESUMO PARA GABARITAR */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t8'] ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                8. Síntese Estratégica
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Pegadinhas de Prova e Resumo de Gabarito
              </h3>
              
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
                <span className="font-extrabold text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Checklist do que você precisa dominar ao final desta Aula 03:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Identificar e corrigir erros de grafia</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Diferenciar S, SS, C, Ç, X e CH</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Diferenciar G e J (viagem × viajem)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Reconhecer homônimos e parônimos</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Diferenciar ratificar e retificar</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dominar sessão, seção e cessão</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Reconhecer alterações do Acordo Ortográfico</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Acertar 20/20 nas questões de concurso</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t8')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                readTopics['t8']
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
              }`}
              title="Marcar tópico como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SIMULADOR INTERATIVO DE DESAFIOS FORENSES DE ORTOGRAFIA */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Desafio Rápido de Fixação
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Simulador de Precisão Ortográfica em Atos Judiciais
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Teste sua capacidade de detectar a grafia correta em situações típicas do dia a dia do Tribunal de Justiça.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spellingChallenges.map((ch) => {
            const userChoice = selectedSimAnswers[ch.id];
            return (
              <div
                key={ch.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h4 className="font-extrabold text-xs text-indigo-600 dark:text-indigo-400">
                    {ch.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {ch.context}
                  </p>

                  <div className="space-y-2 pt-1">
                    {ch.options.map((opt) => {
                      const isSelected = userChoice === opt.id;
                      let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-indigo-300';
                      if (isSelected) {
                        btnStyle = opt.correct
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectSim(ch.id, opt.id)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer font-medium leading-relaxed ${btnStyle}`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {userChoice && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] space-y-1">
                    {ch.options.find((o) => o.id === userChoice)?.correct ? (
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Parabéns! Resposta Correta.
                      </p>
                    ) : (
                      <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Atenção à regra!
                      </p>
                    )}
                    <p className="text-slate-600 dark:text-slate-300">
                      {ch.options.find((o) => o.id === userChoice)?.note}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ATIVIDADE PRÁTICA: 5 FRASES DE FIXAÇÃO & ENVIO PELO WHATSAPP */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Atividade Prática — Fixação para Enviar pelo WhatsApp
            </span>
            <h3 className="text-xl font-black text-white">
              Criação de 5 Frases com Palavras-Chave de Ortografia
            </h3>
            <p className="text-xs text-slate-300">
              Escreva 5 frases, cada uma utilizando corretamente uma das palavras: <strong>exceção</strong>, <strong>privilégio</strong>, <strong>ratificar</strong>, <strong>retificar</strong> e <strong>sessão</strong>.
            </p>
          </div>
          <button
            onClick={() => setShowCorrectionModel(!showCorrectionModel)}
            className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-amber-300" />
            <span>{showCorrectionModel ? 'Ocultar Exemplos' : 'Ver Frases Modelo'}</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Palavras Obrigatórias */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-amber-400 font-bold uppercase text-[10px]">Palavras Obrigatórias:</span>
            {portuguesAula3PracticalTask.wordsToUse.map((word) => (
              <span key={word} className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-extrabold border border-indigo-500/30">
                {word}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Suas 5 Frases:</span>
              <span className="text-[10px] text-slate-400">Salvo automaticamente</span>
            </label>
            <textarea
              value={studentRevisionText}
              onChange={(e) => handleRevisionChange(e.target.value)}
              placeholder="1. Exceção: ...&#10;2. Privilégio: ...&#10;3. Ratificar: ...&#10;4. Retificar: ...&#10;5. Sessão: ..."
              rows={6}
              className="w-full p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-mono"
            />
          </div>

          {showCorrectionModel && (
            <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-700/60 space-y-3 animate-in fade-in">
              <span className="text-xs font-black uppercase text-indigo-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Exemplos Oficiais Recomendados pelo Professor:
              </span>
              <ul className="text-xs text-slate-200 leading-relaxed space-y-1.5">
                {portuguesAula3PracticalTask.suggestedPhrases.map((phrase, idx) => (
                  <li key={idx} className="p-2 rounded-lg bg-black/20 border border-white/5">
                    {phrase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Resposta pelo WhatsApp</span>
            </a>

            <button
              onClick={onToggleCompleted}
              className={`px-5 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isLessonCompleted
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isLessonCompleted ? '✓ Aula 03 Marcada como Concluída' : 'Marcar Aula 03 como Concluída'}</span>
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
