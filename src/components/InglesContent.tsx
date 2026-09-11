import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  Video,
  Layers,
  HelpCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Calendar,
  Hash,
  MessageCircle,
  ChevronRight,
  ExternalLink,
  BookOpen
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

  // Interactive number helper converter (1 to 100)
  const [testNumber, setTestNumber] = useState<number>(25);

  const getNumberInWords = (num: number): { words: string; phonetic: string } => {
    const ones = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
    ];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num <= 20) {
      return { words: ones[num] || '', phonetic: '' };
    }
    if (num === 100) {
      return { words: 'one hundred', phonetic: 'uán rândred' };
    }
    const tenPart = Math.floor(num / 10);
    const unitPart = num % 10;
    if (unitPart === 0) {
      return { words: tens[tenPart], phonetic: '' };
    }
    return { words: `${tens[tenPart]}-${ones[unitPart]}`, phonetic: '' };
  };

  // Desafio final interactive generator
  const [selectedDay, setSelectedDay] = useState('Friday');
  const [selectedHour, setSelectedHour] = useState('seven');
  const [favoriteDay, setFavoriteDay] = useState('Saturday');
  const [copiedChallenge, setCopiedChallenge] = useState(false);

  const challengeSentence = `Hello! Today is ${selectedDay}. It is ${selectedHour} o'clock. My favorite day is ${selectedFavoriteDay(favoriteDay)}.`;

  function selectedFavoriteDay(day: string) {
    return day;
  }

  const handleCopyChallenge = () => {
    navigator.clipboard.writeText(challengeSentence);
    setCopiedChallenge(true);
    setTimeout(() => setCopiedChallenge(false), 2000);
  };

  // Video recording timer simulator
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<any>(null);

  const startTimer = () => {
    setIsTimerRunning(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  };

  // Numbers 1 to 20 list
  const numbers1to20 = [
    { num: 1, word: 'one', phonetic: 'uán' },
    { num: 2, word: 'two', phonetic: 'tú' },
    { num: 3, word: 'three', phonetic: 'trí' },
    { num: 4, word: 'four', phonetic: 'fór' },
    { num: 5, word: 'five', phonetic: 'fáiv' },
    { num: 6, word: 'six', phonetic: 'síks' },
    { num: 7, word: 'seven', phonetic: 'séven' },
    { num: 8, word: 'eight', phonetic: 'êit' },
    { num: 9, word: 'nine', phonetic: 'náin' },
    { num: 10, word: 'ten', phonetic: 'tên' },
    { num: 11, word: 'eleven', phonetic: 'ilêven' },
    { num: 12, word: 'twelve', phonetic: 'tuélv' },
    { num: 13, word: 'thirteen', phonetic: 'têrtín' },
    { num: 14, word: 'fourteen', phonetic: 'fórtín' },
    { num: 15, word: 'fifteen', phonetic: 'fiftín' },
    { num: 16, word: 'sixteen', phonetic: 'síkstín' },
    { num: 17, word: 'seventeen', phonetic: 'séventín' },
    { num: 18, word: 'eighteen', phonetic: 'êitín' },
    { num: 19, word: 'nineteen', phonetic: 'náintín' },
    { num: 20, word: 'twenty', phonetic: 'tuênti' },
  ];

  // Dezenas list
  const dezenas = [
    { num: 30, word: 'thirty', phonetic: 'têrti' },
    { num: 40, word: 'forty', phonetic: 'fórti', alert: 'Sem "u"! (não confunda com fourty)' },
    { num: 50, word: 'fifty', phonetic: 'fifti' },
    { num: 60, word: 'sixty', phonetic: 'síksti' },
    { num: 70, word: 'seventy', phonetic: 'séventi' },
    { num: 80, word: 'eighty', phonetic: 'êiti' },
    { num: 90, word: 'ninety', phonetic: 'náinti' },
    { num: 100, word: 'one hundred', phonetic: 'uán rândred' },
  ];

  // Days of week list
  const daysOfWeek = [
    { day: 'Monday', pt: 'Segunda-feira', phonetic: 'mândei', tag: '1º dia de trabalho' },
    { day: 'Tuesday', pt: 'Terça-feira', phonetic: 'tiúzdei', tag: 'Cuidado com Thursday' },
    { day: 'Wednesday', pt: 'Quarta-feira', phonetic: 'uénzdei', tag: '"d" é mudo!' },
    { day: 'Thursday', pt: 'Quinta-feira', phonetic: 'têrzdei', tag: 'Som com a língua nos dentes' },
    { day: 'Friday', pt: 'Sexta-feira', phonetic: 'fráidei', tag: 'Black Friday / TGIF' },
    { day: 'Saturday', pt: 'Sábado', phonetic: 'sátêrdei', tag: 'Fim de semana' },
    { day: 'Sunday', pt: 'Domingo', phonetic: 'sândei', tag: 'Fim de semana' },
  ];

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100 animate-in fade-in duration-300">
      {/* 🎯 HEADER DE FOCO DA AULA */}
      <section
        className={`p-6 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900 border-indigo-900/50' : 'bg-gradient-to-r from-indigo-50 via-blue-50 to-amber-50 border-indigo-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🇺🇸</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase bg-indigo-500 text-white">
                3ª Aula de Hoje
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                Números • Horas • Dias da Semana
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Língua Inglesa: Números, Horas e Dias da Semana
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl font-medium">
              🎯 <strong>Foco da aula:</strong> O aluno deverá conseguir <strong>ler, escrever e falar números</strong>, <strong>identificar horários</strong> e <strong>dizer os dias da semana em inglês</strong>, utilizando frases simples e diretas do cotidiano.
            </p>
          </div>
          <button
            onClick={() => playAudio("English Lesson: Numbers, Time and Days of the Week.")}
            className="shrink-0 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>Ouvir Introdução</span>
          </button>
        </div>

        {/* 3 Quick Metrics Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-indigo-200/60 dark:border-indigo-800/40 text-xs">
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900 flex items-center gap-2.5">
            <Hash className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">1. Numbers 1–100</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">1–20, dezenas e hífen</div>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">2. What time is it?</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">o'clock, minutos, a.m./p.m.</div>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900 flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">3. Days of the Week</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Monday–Sunday, Today, Tomorrow</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔢 SEÇÃO 1: NÚMEROS (NUMBERS 1–20, DEZENAS E FORMAÇÃO) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 font-bold">1</span>
            <span>🔢 Números em Inglês (Numbers)</span>
          </h2>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Clique para ouvir a pronúncia</span>
        </div>

        {/* Numbers 1-20 Grid */}
        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
              Numbers 1–20 (Base Fundamental)
            </h3>
            <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full">
              Toque no número para ouvir
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
            {numbers1to20.map((item) => (
              <button
                key={item.num}
                onClick={() => playAudio(item.word)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  speakingText === item.word
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 scale-[1.03]'
                    : isDarkMode
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white hover:bg-indigo-50/50 border-slate-200 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    {item.num}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="mt-1">
                  <div className="text-sm font-extrabold capitalize">{item.word}</div>
                  <div className="text-[10px] opacity-70 italic font-mono">"{item.phonetic}"</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dezenas e Centena */}
        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider flex items-center gap-1.5">
            <span>Dezenas & 100 (One Hundred)</span>
            <span className="text-[10px] lowercase text-slate-500 font-normal">(-ty indica dezena!)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {dezenas.map((item) => (
              <button
                key={item.num}
                onClick={() => playAudio(item.word)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  speakingText === item.word
                    ? 'bg-amber-600 text-white ring-2 ring-amber-400 scale-[1.03]'
                    : isDarkMode
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-amber-500 dark:text-amber-400">
                    {item.num}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="mt-1">
                  <div className="text-sm font-extrabold capitalize">{item.word}</div>
                  <div className="text-[10px] opacity-70 italic font-mono">"{item.phonetic}"</div>
                </div>
                {item.alert && (
                  <div className="text-[9px] mt-1 text-rose-500 font-black tracking-tight">
                    ⚠️ {item.alert}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Regra de Formação de Números Compostos */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 mt-3">
            <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" /> Regra Prática: Formação dos Números Compostos (21 a 99)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Basta juntar a <strong>dezena</strong> com a <strong>unidade</strong> através de um <strong>hífen (-)</strong>:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs">
              <div
                onClick={() => playAudio('twenty-one')}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer hover:border-indigo-400"
              >
                <div className="font-black text-indigo-600 dark:text-indigo-400">21</div>
                <div className="font-bold">twenty-one</div>
              </div>
              <div
                onClick={() => playAudio('thirty-five')}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer hover:border-indigo-400"
              >
                <div className="font-black text-indigo-600 dark:text-indigo-400">35</div>
                <div className="font-bold">thirty-five</div>
              </div>
              <div
                onClick={() => playAudio('forty-eight')}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer hover:border-indigo-400"
              >
                <div className="font-black text-indigo-600 dark:text-indigo-400">48</div>
                <div className="font-bold">forty-eight</div>
              </div>
              <div
                onClick={() => playAudio('ninety-nine')}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer hover:border-indigo-400"
              >
                <div className="font-black text-indigo-600 dark:text-indigo-400">99</div>
                <div className="font-bold">ninety-nine</div>
              </div>
            </div>
          </div>

          {/* Testador Interativo de Números (1 a 100) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                🎮 Teste qualquer número (1 a 100):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={testNumber}
                  onChange={(e) => setTestNumber(Number(e.target.value))}
                  className="w-48 accent-indigo-600"
                />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={testNumber}
                  onChange={(e) => setTestNumber(Math.max(1, Math.min(100, Number(e.target.value))))}
                  className="w-16 px-2 py-1 text-center font-black rounded-lg border dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-semibold">Como se diz em inglês:</div>
                <div className="text-base font-black text-indigo-600 dark:text-indigo-400">
                  {getNumberInWords(testNumber).words}
                </div>
              </div>
              <button
                onClick={() => playAudio(getNumberInWords(testNumber).words)}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-sm transition-transform active:scale-95"
                title="Ouvir pronúncia"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🕐 SEÇÃO 2: HORAS (TIME: WHAT TIME IS IT? E REGRAS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 font-bold">2</span>
            <span>🕐 Horas em Inglês (Telling the Time)</span>
          </h2>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">What time is it? • It's...</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Caixa 1: A Pergunta e Resposta Básica */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
              A Estrutura Fundamental
            </h3>

            <div className="space-y-2.5">
              <div
                onClick={() => playAudio("What time is it?")}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Pergunta Padrão</div>
                  <div className="text-base font-black text-slate-900 dark:text-white">“What time is it?”</div>
                  <div className="text-xs text-slate-500">Significa: <strong>Que horas são?</strong></div>
                </div>
                <Volume2 className="w-4 h-4 text-amber-500" />
              </div>

              <div
                onClick={() => playAudio("It is seven o'clock.")}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Resposta Padrão</div>
                  <div className="text-base font-black text-slate-900 dark:text-white">“It's... / It is...”</div>
                  <div className="text-xs text-slate-500">Significa: <strong>São... / É...</strong> (ex: It's 7 o'clock)</div>
                </div>
                <Volume2 className="w-4 h-4 text-amber-500" />
              </div>
            </div>

            {/* Regra do o'clock */}
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs">
              <div className="font-black text-rose-700 dark:text-rose-400 flex items-center gap-1.5 mb-1">
                ⚠️ Regra de Ouro do "o'clock":
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Usa-se <strong>"o'clock"</strong> <u>apenas</u> para horas redondas/exatas (sem minutos).
                <br />
                ✅ <em>It's seven o'clock</em> (São 07:00).
                <br />
                ❌ <em>It's seven thirty o'clock</em> (ERRADO! Nunca use o'clock com minutos).
              </p>
            </div>
          </div>

          {/* Caixa 2: Horas com Minutos e a.m. / p.m. */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
              Horas com Minutos & a.m. / p.m.
            </h3>

            {/* Exemplos Práticos da Aula */}
            <div className="space-y-1.5 text-xs font-semibold">
              <div
                onClick={() => playAudio("It's eight thirty.")}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border flex items-center justify-between cursor-pointer hover:border-indigo-400"
              >
                <span><strong>08:30</strong> → It's eight thirty.</span>
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div
                onClick={() => playAudio("It's ten fifteen.")}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border flex items-center justify-between cursor-pointer hover:border-indigo-400"
              >
                <span><strong>10:15</strong> → It's ten fifteen.</span>
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div
                onClick={() => playAudio("It's nine forty-five.")}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border flex items-center justify-between cursor-pointer hover:border-indigo-400"
              >
                <span><strong>09:45</strong> → It's nine forty-five.</span>
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div
                onClick={() => playAudio("It's two forty-five p.m.")}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border flex items-center justify-between cursor-pointer hover:border-indigo-400"
              >
                <span><strong>14:45</strong> → It's two forty-five p.m.</span>
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
              </div>
            </div>

            {/* Tabela a.m. vs p.m. */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
                <div className="font-black text-sky-700 dark:text-sky-300">🌅 a.m. (ante meridiem)</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Antes do meio-dia (00:00 às 11:59 da manhã).
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <div className="font-black text-purple-700 dark:text-purple-300">🌇 p.m. (post meridiem)</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Após o meio-dia (12:00 até às 23:59 da noite).
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📅 SEÇÃO 3: DIAS DA SEMANA (DAYS OF THE WEEK & TEMPO) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold">3</span>
            <span>📅 Dias da Semana & Expressões Temporais (Days of the Week)</span>
          </h2>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Sempre com inicial Maiúscula!</span>
        </div>

        {/* 7 Days of the Week Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2.5">
          {daysOfWeek.map((item, idx) => (
            <button
              key={item.day}
              onClick={() => playAudio(item.day)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                speakingText === item.day
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 scale-[1.03]'
                  : isDarkMode
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                  : 'bg-white hover:bg-emerald-50/50 border-slate-200 text-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  #{idx + 1}
                </span>
                <Volume2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="mt-2">
                <div className="text-sm font-black">{item.day}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{item.pt}</div>
                <div className="text-[9px] opacity-70 italic font-mono mt-0.5">"{item.phonetic}"</div>
              </div>
            </button>
          ))}
        </div>

        {/* Expressões Temporais: Today, Tomorrow, Yesterday, Day, Morning */}
        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
            Vocabulário Temporal Essencial (Garantido em Provas)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-xs">
            <div
              onClick={() => playAudio("Today means hoje.")}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-all text-center"
            >
              <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">Today</div>
              <div className="font-semibold text-slate-700 dark:text-slate-200">Hoje</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">"tudêi"</div>
            </div>

            <div
              onClick={() => playAudio("Tomorrow means amanhã.")}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-all text-center"
            >
              <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">Tomorrow</div>
              <div className="font-semibold text-slate-700 dark:text-slate-200">Amanhã</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">"tumórou"</div>
            </div>

            <div
              onClick={() => playAudio("Yesterday means ontem.")}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-all text-center"
            >
              <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">Yesterday</div>
              <div className="font-semibold text-slate-700 dark:text-slate-200">Ontem</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">"iésterdei"</div>
            </div>

            <div
              onClick={() => playAudio("Morning means manhã.")}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-all text-center"
            >
              <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">Morning</div>
              <div className="font-semibold text-slate-700 dark:text-slate-200">Manhã</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">"mórning"</div>
            </div>

            <div
              onClick={() => playAudio("Day means dia.")}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-all text-center"
            >
              <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">Day</div>
              <div className="font-semibold text-slate-700 dark:text-slate-200">Dia</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">"dêi"</div>
            </div>

            <div
              onClick={() => playAudio("Week means semana.")}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-all text-center"
            >
              <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">Week</div>
              <div className="font-semibold text-slate-700 dark:text-slate-200">Semana</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">"uík"</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 SEÇÃO 4: CONSTRUTOR DO DESAFIO FINAL */}
      <section
        className={`p-6 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/90 border-amber-500/30' : 'bg-amber-50/70 border-amber-300'
        } space-y-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Desafio Final: Montador da Apresentação Oral
            </h2>
          </div>
          <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full">
            Pratique em voz alta
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          O aluno deverá criar uma pequena apresentação: <em>“Hello! Today is ____. It is ____ o'clock. My favorite day is ____.”</em>
        </p>

        {/* Interactive Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              1. Dia de Hoje (Today):
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full p-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700 font-bold"
            >
              {daysOfWeek.map((d) => (
                <option key={d.day} value={d.day}>
                  {d.day} ({d.pt})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              2. Horário Exato (Time):
            </label>
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              className="w-full p-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700 font-bold"
            >
              <option value="seven">07:00 (seven)</option>
              <option value="eight">08:00 (eight)</option>
              <option value="nine">09:00 (nine)</option>
              <option value="ten">10:00 (ten)</option>
              <option value="twelve">12:00 (twelve)</option>
              <option value="two">14:00 (two p.m.)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              3. Dia Favorito (Favorite Day):
            </label>
            <select
              value={favoriteDay}
              onChange={(e) => setFavoriteDay(e.target.value)}
              className="w-full p-2.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700 font-bold"
            >
              {daysOfWeek.map((d) => (
                <option key={d.day} value={d.day}>
                  {d.day} ({d.pt})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Formatted Output Box */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-amber-300/80 dark:border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
              Frase Completa Montada para Gravação:
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5">
              “{challengeSentence}”
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => playAudio(challengeSentence)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ouvir Frase</span>
            </button>
            <button
              onClick={handleCopyChallenge}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            >
              {copiedChallenge ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedChallenge ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 🎥 SEÇÃO 5: EXERCÍCIO PRÁTICO EM VÍDEO (ROTEIRO & ENVIO AO PROFESSOR) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500 font-bold">🎥</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Exercício Prático — Gravação de Vídeo para o Professor
            </h2>
          </div>
          <span className="text-[11px] bg-rose-500 text-white font-black px-2.5 py-0.5 rounded-full shadow-sm">
            Obrigatório
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white border-2 border-rose-500/40 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs uppercase font-bold text-rose-400 tracking-wider">
                Orientações do Professor
              </div>
              <h3 className="text-base sm:text-lg font-black mt-0.5">
                Roteiro de Gravação: Números, Horas e Dias
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Grave o vídeo no celular (horizontal ou vertical) seguindo as 3 partes e o desafio final sem leitura direta de papel:
              </p>
            </div>

            {/* In-app Timer */}
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700">
              <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
              <span className="font-mono text-base font-black tracking-wider text-rose-200">
                {formatTimer(timerSeconds)}
              </span>
              <div className="flex items-center gap-1 ml-2">
                {!isTimerRunning ? (
                  <button
                    onClick={startTimer}
                    className="p-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                    title="Iniciar cronômetro"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="p-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white cursor-pointer"
                    title="Pausar cronômetro"
                  >
                    <Pause className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 cursor-pointer"
                  title="Zerar cronômetro"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* As 3 Partes do Vídeo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Parte 1 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-indigo-400">Parte 1 — Numbers 🔢</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded">Sem ler</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                <li>• Conte de 1 a 20 em inglês com clareza.</li>
                <li>• Fale os números especiais:</li>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-indigo-300 font-bold">25</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-indigo-300 font-bold">40</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-indigo-300 font-bold">57</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-indigo-300 font-bold">80</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-indigo-300 font-bold">99</span>
                </div>
              </ul>
            </div>

            {/* Parte 2 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-400">Parte 2 — Time 🕐</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">Horários</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                <li>• Fale estes 5 horários em inglês:</li>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-amber-300 font-bold text-[11px]">07:00</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-amber-300 font-bold text-[11px]">08:30</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-amber-300 font-bold text-[11px]">10:15</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-amber-300 font-bold text-[11px]">12:00</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-amber-300 font-bold text-[11px]">14:45</span>
                </div>
                <li>• Responda à pergunta do professor: <br /><strong>“What time is it?”</strong></li>
              </ul>
            </div>

            {/* Parte 3 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-400">Parte 3 — Days 📅</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">Na Ordem</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                <li>• Fale os 7 dias da semana na ordem (Monday a Sunday).</li>
                <li>• Responda em inglês:</li>
                <li className="text-[11px] text-emerald-300 font-bold">1. What day is today?</li>
                <li className="text-[11px] text-emerald-300 font-bold">2. What day is tomorrow?</li>
                <li className="text-[11px] text-emerald-300 font-bold">3. What day was yesterday?</li>
              </ul>
            </div>
          </div>

          {/* Desafio Final & Ação WhatsApp */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black text-rose-300 uppercase tracking-wide">
                🎯 Desafio Final do Vídeo:
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                “Hello! Today is {selectedDay}. It is {selectedHour} o'clock. My favorite day is {favoriteDay}.”
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Objetivo: Praticar fala, pronúncia, memorização e compreensão do inglês no dia a dia.
              </div>
            </div>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Olá Professor! Segue a gravação da minha 3ª Aula de Inglês (Números, Horas e Dias da Semana):\n\n• Parte 1: Numbers (1 a 20 e 25, 40, 57, 80, 99)\n• Parte 2: Time (07:00, 08:30, 10:15, 12:00, 14:45 e What time is it?)\n• Parte 3: Days of the Week (Monday–Sunday, Today, Tomorrow, Yesterday)\n• Desafio Final: "${challengeSentence}"\n\nAluno: Pedro Henrique / Turma TJAM 2026.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Vídeo ao Professor no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 🚀 QUICK NAVIGATION BAR */}
      <section className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('video')}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Vídeo Aulas (3 Vídeos)</span>
          </button>
          <button
            onClick={() => onNavigateTab('questoes')}
            className="px-3.5 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>20 Questões Gabaritadas</span>
          </button>
          <button
            onClick={() => onNavigateTab('flashcards')}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards de Pronúncia (10)</span>
          </button>
        </div>

        <button
          onClick={onToggleComplete}
          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all ${
            isLessonCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ 3ª Aula Concluída' : 'Marcar Aula como Concluída'}</span>
        </button>
      </section>
    </div>
  );
};
