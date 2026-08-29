import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Video,
  Layers,
  MessageSquare,
  User,
  Mic,
  Clock,
  Play,
  Square,
  Copy,
  Check,
  Languages,
  PenTool,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface InglesContentProps {
  isDarkMode: boolean;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateTab: (tab: 'video' | 'questoes' | 'flashcards' | 'mapa' | 'resumo') => void;
}

export const InglesContent: React.FC<InglesContentProps> = ({
  isDarkMode,
  isLessonCompleted,
  onToggleComplete,
  onNavigateTab,
}) => {
  // Speech synthesis helper
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeakingText(text);
      utterance.onend = () => setSpeakingText(null);
      utterance.onerror = () => setSpeakingText(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Interactive Writing practice state
  const [myName, setMyName] = useState('');
  const [myProfession, setMyProfession] = useState('a student');
  const [myCity, setMyCity] = useState('Manaus');
  const [myStudy, setMyStudy] = useState('English');
  const [myLike, setMyLike] = useState('studying for TJAM');
  const [copiedPresentation, setCopiedPresentation] = useState(false);

  // Challenge test mode (hide / show)
  const [showChallenge, setShowChallenge] = useState(false);

  // Audio timer simulator for oral presentation practice (30-60s)
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = React.useRef<any>(null);

  const startTimer = () => {
    setTimerSeconds(0);
    setIsTimerRunning(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev >= 60) {
          clearInterval(timerRef.current);
          setIsTimerRunning(false);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Quick exercises state
  const [showExerciseAnswers, setShowExerciseAnswers] = useState<Record<string, boolean>>({});
  const toggleAnswer = (key: string) => {
    setShowExerciseAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyFullPresentation = () => {
    const fullText = `Hello! My name is ${myName || 'João'}. I am ${myProfession || 'a student'}. I live in ${myCity || 'Manaus'}. I study ${myStudy || 'English'}. I like ${myLike || 'reading'}. Nice to meet you!`;
    navigator.clipboard?.writeText(fullText);
    setCopiedPresentation(true);
    setTimeout(() => setCopiedPresentation(false), 2000);
  };

  return (
    <article
      className={`p-6 sm:p-10 rounded-3xl border space-y-10 leading-relaxed transition-all ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 text-slate-200'
        : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      }`}
    >
      {/* Top Banner / Goal Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-indigo-500/20">
              <Languages className="w-3.5 h-3.5" /> 🇬🇧 INGLÊS • AULA 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider border border-emerald-500/20">
              100% Prática
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('video')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vídeo Aula</span>
            </button>
            <button
              onClick={() => onNavigateTab('questoes')}
              className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>20 Questões</span>
            </button>
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Aula Prática: Apresentação e Comunicação Básica em Inglês
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 max-w-3xl">
            Esta aula é 100% prática, com foco em situações que aparecem frequentemente em questões de concurso e no desenvolvimento da fluência e escrita em Língua Inglesa.
          </p>
        </div>

        {/* Objectives Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/60">
          <h2 className="text-xs font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            🎯 Objetivos da Aula de Hoje
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-bold text-indigo-950 dark:text-indigo-200">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Cumprimentar e se apresentar</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Fazer e responder perguntas</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Formar frases básicas</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Vocabulário do cotidiano</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Leitura e compreensão</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Fala e escrita autônoma</span>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: CUMPRIMENTOS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              🗣️ 1. Cumprimentos (Greetings)
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Clique no ícone de som para ouvir a pronúncia 🔊
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Os cumprimentos são a porta de entrada para qualquer comunicação. Observe o uso formal e informal, além das distinções fundamentais de horário:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { en: 'Hello!', pt: 'Olá!', tip: 'Universal & Polido', pron: 'rélou' },
            { en: 'Hi!', pt: 'Oi!', tip: 'Informal & Rápido', pron: 'rái' },
            { en: 'Good morning!', pt: 'Bom dia!', tip: 'Manhã até 12h', pron: 'gud mórning' },
            { en: 'Good afternoon!', pt: 'Boa tarde!', tip: '12h até ~18h', pron: 'gud áfternun' },
            { en: 'Good evening!', pt: 'Boa noite!', tip: 'Ao CHEGAR à noite', pron: 'gud ívning' },
            { en: 'How are you?', pt: 'Como você está?', tip: 'Pergunta de cortesia', pron: 'ráu ar iú' },
            { en: "I'm fine.", pt: 'Estou bem.', tip: 'Resposta direta', pron: 'áim fáin' },
            { en: 'Nice to meet you.', pt: 'Prazer em conhecer você.', tip: 'Em apresentações', pron: 'náis tu mít iú' },
            { en: 'See you later.', pt: 'Até mais tarde.', tip: 'Despedida breve', pron: 'sí iú lêiter' },
            { en: 'Goodbye!', pt: 'Tchau! / Adeus!', tip: 'Despedida geral', pron: 'gudbái' }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between group hover:border-indigo-500 hover:shadow-md ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                  {item.tip}
                </span>
                <button
                  onClick={() => playAudio(item.en)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    speakingText === item.en
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700'
                  }`}
                  title="Ouvir pronúncia"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-0.5 my-1">
                <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1">
                  {item.en}
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {item.pt}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-1 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                🗣️ /{item.pron}/
              </div>
            </div>
          ))}
        </div>

        {/* Prova FGV tip: Good evening vs Good night */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-3">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-600 shrink-0 mt-0.5">
            ⚠️
          </div>
          <div>
            <strong>Pegadinha Clássica de Prova:</strong> Use <strong>“Good evening”</strong> ao <em>chegar</em> ou iniciar uma conversa à noite (ex: ao entrar no tribunal ou sala de aula). Use <strong>“Good night”</strong> exclusivamente ao se <em>despedir</em> ou antes de dormir!
          </div>
        </div>
      </section>

      {/* SECTION 2: APRESENTAÇÃO */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            <User className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            👤 2. Apresentação (Self-Introduction)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Para se apresentar com segurança em inglês, basta combinar o sujeito (<code className="font-mono text-emerald-600 font-bold">I</code> / <code className="font-mono text-emerald-600 font-bold">My name</code>) com o verbo correto:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {[
            {
              en: 'My name is João.',
              pt: 'Meu nome é João.',
              note: 'Estrutura: Possessivo (My) + Substantivo (name) + Verbo to be (is) + Nome',
              audio: 'My name is João.'
            },
            {
              en: 'I am a student.',
              pt: 'Eu sou estudante.',
              note: 'Estrutura: Sujeito (I) + Verbo to be (am) + Artigo (a) + Profissão/Ocupação (student)',
              audio: 'I am a student.'
            },
            {
              en: 'I live in Manaus.',
              pt: 'Eu moro em Manaus.',
              note: 'Estrutura: Sujeito (I) + Verbo de ação (live) + Preposição de cidade (in) + Manaus',
              audio: 'I live in Manaus.'
            },
            {
              en: 'I study English.',
              pt: 'Eu estudo inglês.',
              note: 'Estrutura: Sujeito (I) + Verbo (study) + Disciplina/Idioma com maiúscula (English)',
              audio: 'I study English.'
            },
            {
              en: 'Nice to meet you.',
              pt: 'Prazer em conhecer você.',
              note: 'Fórmula de cortesia após ouvir o nome da outra pessoa.',
              audio: 'Nice to meet you.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-700/80' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {item.en}
                  </span>
                  <button
                    onClick={() => playAudio(item.audio)}
                    className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Ouvir frase"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  → {item.pt}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  💡 {item.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PERGUNTAS BÁSICAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
            <HelpCircle className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            ❓ 3. Perguntas Básicas (Basic Questions)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Aprenda a fazer e responder perguntas essenciais em diálogos reais e questões de concurso:
        </p>

        <div className="space-y-3">
          {[
            {
              q: 'What is your name?',
              ptQ: 'Qual é o seu nome?',
              ans: 'My name is Carlos. / I am Carlos.',
              ptAns: 'Meu nome é Carlos. / Eu sou o Carlos.',
              pron: 'uót iz iór nêim?'
            },
            {
              q: 'Where do you live?',
              ptQ: 'Onde você mora?',
              ans: 'I live in Manaus, Amazonas.',
              ptAns: 'Eu moro em Manaus, Amazonas.',
              pron: 'uér du iú lív?'
            },
            {
              q: 'How are you?',
              ptQ: 'Como você está?',
              ans: "I'm fine, thank you! And you?",
              ptAns: 'Estou bem, obrigado! E você?',
              pron: 'ráu ar iú?'
            },
            {
              q: 'What do you do?',
              ptQ: 'O que você faz? / Qual é a sua profissão?',
              ans: 'I am a student / I am preparing for TJAM.',
              ptAns: 'Eu sou estudante / Estou me preparando para o TJAM.',
              pron: 'uót du iú dú?'
            },
            {
              q: 'Do you speak English?',
              ptQ: 'Você fala inglês?',
              ans: 'Yes, I do! / A little bit.',
              ptAns: 'Sim, eu falo! / Um pouquinho.',
              pron: 'du iú spík ínglish?'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border grid grid-cols-1 md:grid-cols-2 gap-4 items-center ${
                isDarkMode ? 'bg-slate-800/40 border-slate-700/80' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-purple-700 dark:text-purple-300">
                    {item.q}
                  </span>
                  <button
                    onClick={() => playAudio(item.q)}
                    className="p-1 rounded-lg text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  → {item.ptQ}
                </div>
                <div className="text-[10px] text-slate-400">
                  🗣️ /{item.pron}/
                </div>
              </div>

              <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-2 md:pt-0 md:pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Resposta Modelo:
                  </span>
                  <button
                    onClick={() => playAudio(item.ans)}
                    className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100">
                  “{item.ans}”
                </div>
                <div className="text-[11px] text-slate-500">
                  ({item.ptAns})
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: PRÁTICA DE LEITURA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
            <BookOpen className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            📖 4. Prática de Leitura (Reading Comprehension)
          </h2>
        </div>

        {/* Ana's Text */}
        <div className="p-5 sm:p-6 rounded-3xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-blue-800 dark:text-blue-300">
              Texto de Leitura 1:
            </span>
            <button
              onClick={() => playAudio("Hello! My name is Ana. I am a student. I live in Manaus. I study English every day. Nice to meet you!")}
              className="px-3 py-1 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ouvir Texto Completo</span>
            </button>
          </div>

          <blockquote className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 italic leading-relaxed">
            “Hello! My name is Ana. I am a student. I live in Manaus. I study English every day. Nice to meet you!”
          </blockquote>

          {/* Reading Comprehension Questions */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase text-blue-900 dark:text-blue-300">
              Perguntas de Compreensão:
            </h3>

            {[
              {
                id: 'q1',
                q: '1. What is her name?',
                ptQ: 'Qual é o nome dela?',
                ans: 'Her name is Ana. (O nome dela é Ana.)',
                audio: 'Her name is Ana.'
              },
              {
                id: 'q2',
                q: '2. Where does she live?',
                ptQ: 'Onde ela mora?',
                ans: 'She lives in Manaus. (Ela mora em Manaus.)',
                audio: 'She lives in Manaus.'
              },
              {
                id: 'q3',
                q: '3. What does she study?',
                ptQ: 'O que ela estuda?',
                ans: 'She studies English every day. (Ela estuda inglês todos os dias.)',
                audio: 'She studies English every day.'
              }
            ].map((qItem) => (
              <div
                key={qItem.id}
                className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                    {qItem.q}
                    <span className="text-[11px] font-medium text-slate-500">({qItem.ptQ})</span>
                  </div>
                  {showExerciseAnswers[qItem.id] && (
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{qItem.ans}</span>
                      <button
                        onClick={() => playAudio(qItem.audio)}
                        className="p-1 text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleAnswer(qItem.id)}
                  className="self-start sm:self-auto px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  {showExerciseAnswers[qItem.id] ? 'Ocultar Resposta' : 'Ver Resposta'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PRÁTICA DE ESCRITA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold">
            <PenTool className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            ✍️ 5. Prática de Escrita (Writing Practice)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Preencha os campos abaixo para gerar automaticamente a sua apresentação completa em inglês:
        </p>

        <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                1. My name is... (Seu nome)
              </label>
              <input
                type="text"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                placeholder="ex: Carlos / Maria"
                className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                2. I am... (Sua ocupação)
              </label>
              <input
                type="text"
                value={myProfession}
                onChange={(e) => setMyProfession(e.target.value)}
                placeholder="ex: a student / a civil servant"
                className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                3. I live in... (Sua cidade)
              </label>
              <input
                type="text"
                value={myCity}
                onChange={(e) => setMyCity(e.target.value)}
                placeholder="ex: Manaus / Parintins"
                className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                4. I study... (O que você estuda)
              </label>
              <input
                type="text"
                value={myStudy}
                onChange={(e) => setMyStudy(e.target.value)}
                placeholder="ex: English / Law for TJAM"
                className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                5. I like... (O que você gosta)
              </label>
              <input
                type="text"
                value={myLike}
                onChange={(e) => setMyLike(e.target.value)}
                placeholder="ex: studying / reading books / coffee"
                className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Result Card Preview */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-900 dark:text-indigo-300">
                📄 Sua Apresentação em Inglês Gerada:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playAudio(`Hello! My name is ${myName || 'Carlos'}. I am ${myProfession || 'a student'}. I live in ${myCity || 'Manaus'}. I study ${myStudy || 'English'}. I like ${myLike || 'reading'}. Nice to meet you!`)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ouvir</span>
                </button>
                <button
                  onClick={copyFullPresentation}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedPresentation ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPresentation ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
              “Hello! My name is <span className="text-indigo-600 dark:text-indigo-400 underline">{myName || '____'}</span>. I am <span className="text-indigo-600 dark:text-indigo-400 underline">{myProfession || '____'}</span>. I live in <span className="text-indigo-600 dark:text-indigo-400 underline">{myCity || '____'}</span>. I study <span className="text-indigo-600 dark:text-indigo-400 underline">{myStudy || '____'}</span>. I like <span className="text-indigo-600 dark:text-indigo-400 underline">{myLike || '____'}</span>. Nice to meet you!”
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: DESAFIO DA AULA & PRÁTICA ORAL / VÍDEO */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
            <Mic className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            🎯 Desafio da Aula & 🎤 Atividade Prática de Fala
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Challenge Box */}
          <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" /> Desafio de Memorização:
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Tente fazer a apresentação completa sem olhar para o texto. Clique no botão para testar sua memória:
            </p>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 min-h-[90px] flex items-center justify-center text-center">
              {showChallenge ? (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    “Hello! My name is ____. I am a student. I live in ____. I study English. Nice to meet you!”
                  </p>
                  <button
                    onClick={() => setShowChallenge(false)}
                    className="text-[11px] text-amber-600 font-bold underline cursor-pointer"
                  >
                    Ocultar para testar de novo
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowChallenge(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-sm hover:bg-amber-400 transition-all cursor-pointer"
                >
                  👁️ Revelar Modelo do Desafio
                </button>
              )}
            </div>
          </div>

          {/* Video / Audio Timer Practice */}
          <div className="p-5 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" /> Cronômetro de Apresentação (30–60s):
              </h3>
              <span className="text-xs font-black font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:{String(timerSeconds % 60).padStart(2, '0')} / 01:00
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Grave um vídeo ou áudio de 30 a 60 segundos falando a sua apresentação sem ler. Use o cronômetro para controlar seu tempo:
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              {!isTimerRunning ? (
                <button
                  onClick={startTimer}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Iniciar Gravação / Fala</span>
                </button>
              ) : (
                <button
                  onClick={stopTimer}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-rose-700 transition-all cursor-pointer"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Pausar Cronômetro</span>
                </button>
              )}
              <button
                onClick={resetTimer}
                className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition-all cursor-pointer"
              >
                Zerar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: EXERCÍCIOS PRÁTICOS RÁPIDOS */}
      <section className="space-y-5 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              📝 Exercícios Práticos da Aula 3 (Com Gabarito)
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('questoes')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ir para simulado completo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Tradução */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-indigo-900 dark:text-indigo-300">
              1️⃣ Tradução (Traduza para o português):
            </h3>
            <button
              onClick={() => toggleAnswer('ex1')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline cursor-pointer"
            >
              {showExerciseAnswers['ex1'] ? 'Ocultar Respostas' : 'Ver Gabarito de Tradução'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-semibold">
            {[
              { letter: 'a', en: 'Hello!', pt: 'Olá! / Oi!' },
              { letter: 'b', en: 'Good morning!', pt: 'Bom dia!' },
              { letter: 'c', en: 'How are you?', pt: 'Como você está?' },
              { letter: 'd', en: 'My name is Carlos.', pt: 'Meu nome é Carlos.' },
              { letter: 'e', en: 'Nice to meet you.', pt: 'Prazer em conhecer você.' },
              { letter: 'f', en: 'I live in Manaus.', pt: 'Eu moro em Manaus.' },
              { letter: 'g', en: 'I am a student.', pt: 'Eu sou estudante.' },
              { letter: 'h', en: 'I study English.', pt: 'Eu estudo inglês.' }
            ].map((item) => (
              <div key={item.letter} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">
                  {item.letter}) {item.en}
                </div>
                {showExerciseAnswers['ex1'] && (
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1 text-[11px]">
                    → {item.pt}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Complete as Frases */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-indigo-900 dark:text-indigo-300">
              2️⃣ Complete as Frases:
            </h3>
            <button
              onClick={() => toggleAnswer('ex2')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline cursor-pointer"
            >
              {showExerciseAnswers['ex2'] ? 'Ocultar Respostas' : 'Ver Gabarito'}
            </button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {[
              { num: 1, text: 'My ______ is Maria.', ans: 'name', full: 'My name is Maria.' },
              { num: 2, text: 'I ______ in Manaus.', ans: 'live', full: 'I live in Manaus.' },
              { num: 3, text: 'I ______ a student.', ans: 'am', full: 'I am a student.' },
              { num: 4, text: 'Nice to ______ you.', ans: 'meet', full: 'Nice to meet you.' },
              { num: 5, text: 'How ______ you?', ans: 'are', full: 'How are you?' }
            ].map((item) => (
              <div key={item.num} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span>{item.num}. {item.text}</span>
                {showExerciseAnswers['ex2'] && (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Resposta: <strong>{item.ans}</strong> ({item.full})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Organize as Palavras */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-indigo-900 dark:text-indigo-300">
              4️⃣ Organize as Palavras:
            </h3>
            <button
              onClick={() => toggleAnswer('ex4')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline cursor-pointer"
            >
              {showExerciseAnswers['ex4'] ? 'Ocultar Respostas' : 'Ver Gabarito'}
            </button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {[
              { num: 11, scrambled: 'name / My / is / João.', ans: 'My name is João.' },
              { num: 12, scrambled: 'in / I / Manaus / live.', ans: 'I live in Manaus.' },
              { num: 13, scrambled: 'student / a / am / I.', ans: 'I am a student.' },
              { num: 14, scrambled: 'you / meet / Nice / to.', ans: 'Nice to meet you.' },
              { num: 15, scrambled: 'English / study / I.', ans: 'I study English.' }
            ].map((item) => (
              <div key={item.num} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-slate-600 dark:text-slate-400">{item.num}. [{item.scrambled}]</span>
                {showExerciseAnswers['ex4'] && (
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    ✓ {item.ans}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Actions */}
      <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onToggleComplete}
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para Reabrir)' : 'Marcar Aula como Concluída'}</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab('video')}
            className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Assistir Vídeo</span>
          </button>
          <button
            onClick={() => onNavigateTab('questoes')}
            className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Resolver 20 Questões</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </article>
  );
};
