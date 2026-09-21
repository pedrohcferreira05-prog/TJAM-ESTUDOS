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
  BookOpen,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Send,
  User,
  MapPin,
  Briefcase,
  Globe,
  AlertTriangle,
  Lightbulb,
  FileText,
  Mic,
  Smile
} from 'lucide-react';

interface InglesContentProps {
  isDarkMode?: boolean;
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

  // Interactive to be conjugation tester
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const subjectsData = [
    { pronoun: 'I', toBe: 'am', contracted: "I'm", negative: "I'm not", example: 'I am a public servant.', pt: 'Eu sou um servidor público.' },
    { pronoun: 'You', toBe: 'are', contracted: "You're", negative: "You aren't", example: 'You are ready for the TJAM exam.', pt: 'Você está pronto para a prova do TJAM.' },
    { pronoun: 'He', toBe: 'is', contracted: "He's", negative: "He isn't", example: 'He is a judge in Manaus.', pt: 'Ele é um juiz em Manaus.' },
    { pronoun: 'She', toBe: 'is', contracted: "She's", negative: "She isn't", example: 'She is a diligent student.', pt: 'Ela é uma estudante dedicada.' },
    { pronoun: 'It', toBe: 'is', contracted: "It's", negative: "It isn't", example: 'It is a modern court.', pt: 'É um tribunal moderno.' },
    { pronoun: 'We', toBe: 'are', contracted: "We're", negative: "We aren't", example: 'We are approved in the competition.', pt: 'Nós fomos/estamos aprovados no concurso.' },
    { pronoun: 'They', toBe: 'are', contracted: "They're", negative: "They aren't", example: 'They are court employees.', pt: 'Eles são funcionários do tribunal.' },
  ];

  // Checklist of mastery goals (10 goals)
  const [goalsChecked, setGoalsChecked] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem('tjam_ingles_aula1_goals');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return new Array(10).fill(false);
  });

  const toggleGoal = (idx: number) => {
    const updated = [...goalsChecked];
    updated[idx] = !updated[idx];
    setGoalsChecked(updated);
    try {
      localStorage.setItem('tjam_ingles_aula1_goals', JSON.stringify(updated));
    } catch (e) {}
  };

  // Practical Activity Generator ("My Personal Introduction")
  const [studentName, setStudentName] = useState('Lucas');
  const [studentNationality, setStudentNationality] = useState('Brazilian');
  const [studentCity, setStudentCity] = useState('Manaus');
  const [studentStatus, setStudentStatus] = useState('a student');
  const [studentStudies, setStudentStudies] = useState('study English every day');
  const [studentGoal, setStudentGoal] = useState('interested in the TJAM public service');
  const [copiedActivity, setCopiedActivity] = useState(false);

  const generatedIntro = `Hello! My name is ${studentName}.
I am ${studentNationality}.
I live in ${studentCity}.
I am ${studentStatus}.
I ${studentStudies}.
I am ${studentGoal}.`;

  const handleCopyActivity = () => {
    const formatted = `Nome: ${studentName}
Turma: Preparatório TJAM 2026 (Assistente Judiciário)
Disciplina: Inglês
Aula: 01 — Pronomes Pessoais e Verbo TO BE
Atividade: My Personal Introduction

${generatedIntro}

Áudio: gravado e enviado.`;
    navigator.clipboard.writeText(formatted);
    setCopiedActivity(true);
    setTimeout(() => setCopiedActivity(false), 2500);
  };

  // Audio Recording Simulator Timer (up to 1 min)
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<any>(null);

  const startTimer = () => {
    setIsTimerRunning(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev >= 60) {
          clearInterval(timerRef.current);
          setIsTimerRunning(false);
          return 60;
        }
        return prev + 1;
      });
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
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  // Greetings List
  const greetingsList = [
    { en: 'Hello!', pt: 'Olá!', note: 'Universal, formal e informal', audio: 'Hello!' },
    { en: 'Hi!', pt: 'Oi!', note: 'Informal, amigável', audio: 'Hi!' },
    { en: 'Good morning!', pt: 'Bom dia!', note: 'Até as 12:00', audio: 'Good morning!' },
    { en: 'Good afternoon!', pt: 'Boa tarde!', note: 'Das 12:00 até o pôr do sol (~18h)', audio: 'Good afternoon!' },
    { en: 'Good evening!', pt: 'Boa noite (ao chegar)', note: 'Cumprimento de chegada à noite', alert: true, audio: 'Good evening!' },
    { en: 'Good night!', pt: 'Boa noite (ao sair/dormir)', note: 'Despedida ou antes de dormir', alert: true, audio: 'Good night!' },
    { en: 'How are you?', pt: 'Como você está?', note: 'Pergunta de cortesia comum', audio: 'How are you?' },
    { en: "I'm fine, thank you.", pt: 'Estou bem, obrigado(a).', note: 'Resposta polida clássica', audio: "I'm fine, thank you." },
    { en: 'Nice to meet you.', pt: 'Prazer em conhecê-lo(a).', note: 'Usado ao conhecer alguém', audio: 'Nice to meet you.' },
    { en: 'See you later.', pt: 'Até mais tarde.', note: 'Despedida comum', audio: 'See you later.' },
    { en: 'Goodbye.', pt: 'Adeus / Tchau.', note: 'Despedida geral', audio: 'Goodbye.' },
  ];

  // Wh- words list
  const whQuestions = [
    { word: 'What', pt: 'O quê / Qual', ex: 'What is your name?', exPt: 'Qual é o seu nome?' },
    { word: 'Where', pt: 'Onde / De onde', ex: 'Where are you from?', exPt: 'De onde você é?' },
    { word: 'Who', pt: 'Quem', ex: 'Who is she?', exPt: 'Quem é ela?' },
    { word: 'When', pt: 'Quando', ex: 'When is the test?', exPt: 'Quando é a prova?' },
    { word: 'How', pt: 'Como', ex: 'How are you?', exPt: 'Como você está?' },
    { word: 'Why', pt: 'Por quê (pergunta)', ex: 'Why do you study?', exPt: 'Por que você estuda?' },
  ];

  // TJAM Vocabulary
  const vocabCategories = [
    {
      title: 'Pessoas (People)',
      items: [
        { en: 'student', pt: 'estudante' },
        { en: 'teacher', pt: 'professor' },
        { en: 'lawyer', pt: 'advogado' },
        { en: 'judge', pt: 'juiz' },
        { en: 'employee', pt: 'funcionário' },
        { en: 'public servant', pt: 'servidor público' },
        { en: 'citizen', pt: 'cidadão' },
      ],
    },
    {
      title: 'Locais (Places)',
      items: [
        { en: 'school', pt: 'escola' },
        { en: 'office', pt: 'escritório' },
        { en: 'court', pt: 'tribunal / vara judicial' },
        { en: 'city', pt: 'cidade' },
        { en: 'country', pt: 'país' },
        { en: 'home', pt: 'casa / lar' },
      ],
    },
    {
      title: 'País e Nacionalidade (Country & Nationality)',
      items: [
        { en: 'Brazil / Brazilian', pt: 'Brasil / brasileiro(a)' },
        { en: 'United States / American', pt: 'Estados Unidos / americano(a)' },
        { en: 'England / English', pt: 'Inglaterra / inglês(a)' },
      ],
    },
  ];

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100 animate-in fade-in duration-300">
      {/* 🎯 HEADER DE FOCO DA AULA */}
      <section className="p-6 sm:p-8 rounded-3xl border bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border-indigo-200 dark:border-indigo-800/60 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-2xl">🇬🇧</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase bg-indigo-600 text-white shadow-sm">
                3ª Aula de Hoje
              </span>
              <span className="text-xs text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-100/80 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                Nível Intermediário — TJAM Assistente Judiciário
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 dark:text-white">
              Língua Inglesa — Aula 01: Introdução ao Inglês
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Nesta primeira aula, vamos construir a <strong>base necessária para compreender frases simples</strong> e começar a <strong>se apresentar em inglês</strong>. O conteúdo parte do nível básico, trabalhado com rigor e foco em <strong>interpretação de textos e identificação de estruturas essenciais</strong> para o concurso do TJAM.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => playAudio("Hello! Welcome to English Lesson 1. Personal pronouns, verb to be, and greetings for TJAM.")}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ouvir Introdução</span>
            </button>
            <button
              onClick={onToggleComplete}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isLessonCompleted
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isLessonCompleted ? '✓ Aula Concluída' : 'Marcar como Concluída'}</span>
            </button>
          </div>
        </div>

        {/* 3 Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-indigo-200/80 dark:border-indigo-800/40 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
              👋
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">1. Greetings & Intro</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Cumprimentos e apresentação</div>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
              ⚡
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">2. Pronouns & To Be</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">am, is, are, isn't, aren't</div>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
              📖
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">3. Reading & TJAM Vocab</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Dados explícitos e concurso</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🗣️ SEÇÃO 1: CUMPRIMENTOS — GREETINGS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
              1
            </span>
            <span>Cumprimentos — Greetings</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Clique em qualquer frase para ouvir a pronúncia</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {greetingsList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => playAudio(item.audio)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] active:scale-98 ${
                item.alert
                  ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 ring-1 ring-amber-400/20'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-sm font-black text-indigo-700 dark:text-indigo-400">
                  {item.en}
                </span>
                <Volume2 className={`w-4 h-4 shrink-0 transition-colors ${speakingText === item.audio ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                {item.pt}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.note}
              </div>
            </div>
          ))}
        </div>

        {/* ⚠️ Alerta Crítico: Good evening vs Good night */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-black text-amber-900 dark:text-amber-200 text-sm">
              Atenção de Prova: Good evening x Good night não têm a mesma função!
            </h4>
            <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
              • <strong>Good evening:</strong> É usado estritamente como <strong>cumprimento ao chegar</strong> a um ambiente ou iniciar uma reunião à noite.<br />
              • <strong>Good night:</strong> Normalmente é usado <strong>ao se despedir</strong>, ao ir embora ou imediatamente antes de dormir.
            </p>
          </div>
        </div>
      </section>

      {/* 👤 SEÇÃO 2: APRESENTAÇÃO PESSOAL */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
              2
            </span>
            <span>Apresentação Pessoal (Personal Introduction)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Estruturas Fundamentais */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Estruturas Fundamentais
            </h3>

            <div className="space-y-3 text-xs">
              <div
                onClick={() => playAudio("My name is John. I am John. I'm John.")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Nome</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                  My name is John. / I am John. / I'm John.
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Meu nome é John. / Eu sou John.</div>
              </div>

              <div
                onClick={() => playAudio("I am from Brazil. I'm from Manaus.")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Origem</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                  I am from Brazil. / I'm from Manaus.
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Eu sou do Brasil. / Eu sou de Manaus.</div>
              </div>

              <div
                onClick={() => playAudio("I live in Manaus.")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Local onde mora</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                  I live in Manaus.
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Eu moro em Manaus.</div>
              </div>

              <div
                onClick={() => playAudio("I am a student. I am a public servant.")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Profissão & Ocupação</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                  I am a student. / I am a public servant.
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Eu sou estudante. / Eu sou servidor público.</div>
              </div>
            </div>
          </div>

          {/* Perguntas Essenciais */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Perguntas Chave em Diálogos & Textos
            </h3>

            <div className="space-y-3 text-xs">
              <div
                onClick={() => playAudio("What is your name?")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-between">
                  <span>What is your name?</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium mt-0.5">Qual é o seu nome?</div>
              </div>

              <div
                onClick={() => playAudio("Where are you from?")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-between">
                  <span>Where are you from?</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium mt-0.5">De onde você é?</div>
              </div>

              <div
                onClick={() => playAudio("Where do you live?")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-between">
                  <span>Where do you live?</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium mt-0.5">Onde você mora?</div>
              </div>

              <div
                onClick={() => playAudio("What do you do?")}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-between">
                  <span>What do you do?</span>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium mt-0.5">O que você faz? / Qual é sua profissão?</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-[11px] text-indigo-900 dark:text-indigo-300 leading-relaxed">
              💡 <strong>Dica British Council:</strong> O British Council e as bancas de concurso adotam a identificação de informações pessoais (nome, origem, residência e ocupação) como habilidade de pontuação primária no nível inicial.
            </div>
          </div>
        </div>
      </section>

      {/* 👥 SEÇÃO 3 & 4: PRONOMES PESSOAIS & VERBO TO BE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
              3 & 4
            </span>
            <span>Pronomes Pessoais (Personal Pronouns) & Verbo TO BE</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Interativo: selecione o pronome</span>
        </div>

        {/* Simulador Interativo do Verbo TO BE */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {subjectsData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveSubjectIndex(idx);
                  playAudio(`${item.pronoun} ${item.toBe}. ${item.example}`);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeSubjectIndex === idx
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/50 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                {item.pronoun}
              </button>
            ))}
          </div>

          {/* Destaque do Pronome Selecionado */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {subjectsData[activeSubjectIndex].pronoun}
                </span>
                <span className="text-base font-bold text-slate-400">+</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {subjectsData[activeSubjectIndex].toBe}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  (Contração: <span className="text-indigo-600 dark:text-indigo-400">{subjectsData[activeSubjectIndex].contracted}</span>)
                </span>
              </div>
              <button
                onClick={() => playAudio(subjectsData[activeSubjectIndex].example)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold cursor-pointer transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ouvir frase</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 block mb-1">
                  Afirmativa & Exemplo
                </span>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {subjectsData[activeSubjectIndex].example}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {subjectsData[activeSubjectIndex].pt}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 block mb-1">
                  Forma Negativa
                </span>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {subjectsData[activeSubjectIndex].pronoun} {subjectsData[activeSubjectIndex].negative} ...
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Basta adicionar "not" (ou forma contraída isn't / aren't / I'm not)
                </div>
              </div>
            </div>
          </div>

          {/* Tabela Completa de Pronomes e To Be */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80">
                  <th className="p-3 font-black text-slate-900 dark:text-white">Pronome</th>
                  <th className="p-3 font-black text-slate-900 dark:text-white">Significado</th>
                  <th className="p-3 font-black text-slate-900 dark:text-white">To Be</th>
                  <th className="p-3 font-black text-slate-900 dark:text-white">Contração Afirmativa</th>
                  <th className="p-3 font-black text-slate-900 dark:text-white">Contração Negativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">I</td>
                  <td className="p-3">eu</td>
                  <td className="p-3 font-bold text-emerald-600">am</td>
                  <td className="p-3 font-mono font-bold">I'm</td>
                  <td className="p-3 font-mono font-bold text-rose-500">I'm not</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">You</td>
                  <td className="p-3">você / vocês</td>
                  <td className="p-3 font-bold text-emerald-600">are</td>
                  <td className="p-3 font-mono font-bold">You're</td>
                  <td className="p-3 font-mono font-bold text-rose-500">You aren't</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">He</td>
                  <td className="p-3">ele (homem)</td>
                  <td className="p-3 font-bold text-emerald-600">is</td>
                  <td className="p-3 font-mono font-bold">He's</td>
                  <td className="p-3 font-mono font-bold text-rose-500">He isn't</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">She</td>
                  <td className="p-3">ela (mulher)</td>
                  <td className="p-3 font-bold text-emerald-600">is</td>
                  <td className="p-3 font-mono font-bold">She's</td>
                  <td className="p-3 font-mono font-bold text-rose-500">She isn't</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">It</td>
                  <td className="p-3">ele / ela (coisa, animal, situação)</td>
                  <td className="p-3 font-bold text-emerald-600">is</td>
                  <td className="p-3 font-mono font-bold">It's</td>
                  <td className="p-3 font-mono font-bold text-rose-500">It isn't</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">We</td>
                  <td className="p-3">nós</td>
                  <td className="p-3 font-bold text-emerald-600">are</td>
                  <td className="p-3 font-mono font-bold">We're</td>
                  <td className="p-3 font-mono font-bold text-rose-500">We aren't</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">They</td>
                  <td className="p-3">eles / elas (plural geral)</td>
                  <td className="p-3 font-bold text-emerald-600">are</td>
                  <td className="p-3 font-mono font-bold">They're</td>
                  <td className="p-3 font-mono font-bold text-rose-500">They aren't</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ❓ SEÇÃO 7 & 8: PERGUNTAS COM TO BE & WH- WORDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
              7 & 8
            </span>
            <span>Perguntas com TO BE & Palavras Interrogativas (Wh- Questions)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Regra de Inversão & Short Answers */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <h3 className="font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Regra da Inversão do Verbo
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Para formar perguntas em inglês com o verbo to be, <strong>inverte-se a ordem</strong>: o verbo vai para a frente do sujeito.
            </p>

            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Afirmativa:</span>
                  <span className="font-bold text-slate-900 dark:text-white">You are Brazilian.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-[10px] text-indigo-500 font-bold block">Pergunta:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Are you Brazilian?</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Afirmativa:</span>
                  <span className="font-bold text-slate-900 dark:text-white">She is a student.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-[10px] text-indigo-500 font-bold block">Pergunta:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Is she a student?</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 mt-3">
              <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 block mb-1">
                Respostas Curtas (Short Answers):
              </span>
              <div className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1 font-medium">
                <div>• <strong>Are you Brazilian?</strong> → Yes, I am. / No, I'm not.</div>
                <div>• <strong>Is she a student?</strong> → Yes, she is. / No, she isn't.</div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 italic pt-1">
                  *Atenção: nunca use contração na resposta curta afirmativa ("Yes, I am", NUNCA *"Yes, I'm").
                </div>
              </div>
            </div>
          </div>

          {/* Wh- Words Grid */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <h3 className="font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Palavras Interrogativas (Wh- Words)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Palavras indispensáveis para interpretar o que as questões de prova estão pedindo:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {whQuestions.map((q, idx) => (
                <div
                  key={idx}
                  onClick={() => playAudio(q.ex)}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-indigo-600 dark:text-indigo-400">{q.word}</span>
                    <Volume2 className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{q.pt}</div>
                  <div className="text-[10px] text-slate-500 mt-1 italic truncate">{q.ex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 📚 SEÇÃO 9: VOCABULÁRIO BÁSICO PARA A AULA */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
              9
            </span>
            <span>Vocabulário Essencial para Concursos (TJAM)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vocabCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-700/80 pb-2">
                {cat.title}
              </h3>

              <div className="space-y-2 text-xs">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    onClick={() => playAudio(item.en)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{item.en}</span>
                      <span className="text-[11px] text-slate-500">{item.pt}</span>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📖 SEÇÃO 10: LEITURA E INTERPRETAÇÃO (TEXTO DO LUCAS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
              10
            </span>
            <span>Leitura e Interpretação de Texto (Reading Comprehension)</span>
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/80 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 block">
                Texto de Fixação — Nível Inicial / Intermediário
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Apresentação Pessoal de Lucas
              </h3>
            </div>
            <button
              onClick={() => playAudio("Hello! My name is Lucas. I am Brazilian. I live in Manaus. I am a student. I study every day because I want to become a public servant.")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ouvir Texto em Inglês</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Texto em Inglês */}
            <div className="p-5 rounded-2xl bg-white/10 border border-indigo-400/20 backdrop-blur-sm space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block">
                🇬🇧 Texto Original em Inglês
              </span>
              <blockquote className="text-base sm:text-lg font-medium italic text-indigo-100 leading-relaxed">
                “Hello! My name is Lucas. I am Brazilian. I live in Manaus. I am a student. I study every day because I want to become a public servant.”
              </blockquote>
            </div>

            {/* Tradução Lado a Lado */}
            <div className="p-5 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-sm space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
                🇧🇷 Tradução Guiada
              </span>
              <p className="text-sm font-normal text-slate-200 leading-relaxed">
                “Olá! Meu nome é Lucas. Eu sou brasileiro. Moro em Manaus. Sou estudante. Estudo todos os dias porque quero me tornar servidor público.”
              </p>
            </div>
          </div>

          {/* O que podemos identificar (Informações Explícitas) */}
          <div className="pt-4 border-t border-indigo-800/80">
            <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" /> O Que Podemos Identificar no Texto (Habilidade Chave para Provas):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">Nome:</span>
                <span className="font-bold text-white text-sm">Lucas</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">Nacionalidade:</span>
                <span className="font-bold text-white text-sm">Brazilian</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">Cidade:</span>
                <span className="font-bold text-white text-sm">Manaus</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">Ocupação:</span>
                <span className="font-bold text-white text-sm">Student</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block">Objetivo:</span>
                <span className="font-bold text-amber-300 text-xs">Become a public servant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 SEÇÃO 11: O QUE VOCÊ PRECISA DOMINAR NESTA AULA 01 */}
      <section className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>🎯 O Que Você Precisa Dominar Nesta Aula 01</span>
            </h3>
            <p className="text-xs text-slate-500">
              Marque os itens à medida que for dominando cada competência essencial:
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            {goalsChecked.filter(Boolean).length} de 10 dominados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            '1. Reconhecer cumprimentos básicos (Hello, Hi, Good morning, etc.).',
            '2. Apresentar-se em inglês (My name is..., I live in..., I am from...).',
            '3. Identificar os pronomes pessoais (I, you, he, she, it, we, they).',
            '4. Reconhecer o verbo to be como base de estruturação.',
            '5. Diferenciar quando usar am, is e are com precisão.',
            '6. Identificar frases afirmativas e negativas (not, isn\'t, aren\'t).',
            '7. Reconhecer perguntas com to be através da inversão do verbo.',
            '8. Entender perguntas essenciais com What, Where, Who e How.',
            '9. Identificar informações pessoais explícitas em pequenos textos.',
            '10. Traduzir frases simples sem depender da tradução palavra por palavra.',
          ].map((goal, idx) => (
            <div
              key={idx}
              onClick={() => toggleGoal(idx)}
              className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                goalsChecked[idx]
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  goalsChecked[idx]
                    ? 'bg-emerald-600 text-white'
                    : 'border border-slate-300 dark:border-slate-600'
                }`}
              >
                {goalsChecked[idx] && '✓'}
              </div>
              <span className="text-xs font-medium">{goal}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 🎯 SEÇÃO 12: ATIVIDADE PRÁTICA — FIXAÇÃO (ENVIO PELO WHATSAPP) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 border border-emerald-300 dark:border-emerald-800/80 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200 dark:border-emerald-800/60 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">📱</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
                Atividade Prática de Fixação
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
              “My Personal Introduction” — Desafio Oral & Escrito
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Produza sua apresentação pessoal em inglês utilizando as estruturas da Aula 01. Grave um áudio de até 1 minuto lendo em voz alta e envie para a professora Jéssica pelo WhatsApp.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center gap-1.5 shadow-sm">
              <Mic className="w-4 h-4" /> Desafio de Áudio
            </span>
          </div>
        </div>

        {/* Formulário Interativo do Aluno */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              1. Seu Nome:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ex: Lucas / Ana"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              2. Sua Nacionalidade:
            </label>
            <input
              type="text"
              value={studentNationality}
              onChange={(e) => setStudentNationality(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ex: Brazilian"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              3. Onde Mora:
            </label>
            <input
              type="text"
              value={studentCity}
              onChange={(e) => setStudentCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ex: Manaus / Parintins"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              4. Profissão / Condição:
            </label>
            <input
              type="text"
              value={studentStatus}
              onChange={(e) => setStudentStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ex: a student / a public servant"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              5. Informação sobre estudos:
            </label>
            <input
              type="text"
              value={studentStudies}
              onChange={(e) => setStudentStudies(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ex: study English every day"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              6. Informação adicional:
            </label>
            <input
              type="text"
              value={studentGoal}
              onChange={(e) => setStudentGoal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ex: interested in public service"
            />
          </div>
        </div>

        {/* Prévia da Apresentação Pronta */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Sua Apresentação Gerada em Tempo Real:
            </span>
            <button
              onClick={() => playAudio(generatedIntro)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold cursor-pointer hover:bg-indigo-100"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ouvir seu texto</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
            {generatedIntro}
          </pre>

          {/* Cronômetro para Gravação de Áudio de até 1 minuto */}
          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isTimerRunning ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Tempo de gravação (máx 1 min):</span>
                <span className="text-xl font-mono font-black text-slate-900 dark:text-white">
                  {formatTimer(timerSeconds)} / 01:00
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isTimerRunning ? (
                <button
                  onClick={startTimer}
                  disabled={timerSeconds >= 60}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Iniciar Cronômetro</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar</span>
                </button>
              )}
              <button
                onClick={resetTimer}
                className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Zerar</span>
              </button>
            </div>
          </div>

          {/* Botões de Ação para WhatsApp */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={handleCopyActivity}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              {copiedActivity ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedActivity ? 'Copiado com Sucesso!' : 'Copiar Roteiro para Envio'}</span>
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `*Nome:* ${studentName}\n*Turma:* Preparatório TJAM 2026 (Assistente Judiciário)\n*Disciplina:* Inglês\n*Aula:* 01 — Pronomes Pessoais e Verbo TO BE\n*Atividade:* My Personal Introduction\n\n${generatedIntro}\n\n*Áudio:* enviado.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Enviar pelo WhatsApp à Professora</span>
            </a>
          </div>
        </div>
      </section>

      {/* 🚀 RODAPÉ DE NAVEGAÇÃO ENTRE AS ABAS */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
            Próximos Passos de Estudo
          </span>
          <h4 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
            Pratique com os 2 Vídeos, as 20 Questões e os Flashcards da Aula 01
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('video')}
            className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Video className="w-4 h-4" />
            <span>Vídeo Aulas (1 e 2)</span>
          </button>
          <button
            onClick={() => onNavigateTab('questoes')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>20 Questões Inéditas</span>
          </button>
          <button
            onClick={() => onNavigateTab('flashcards')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>10 Flashcards</span>
          </button>
        </div>
      </section>
    </div>
  );
};
