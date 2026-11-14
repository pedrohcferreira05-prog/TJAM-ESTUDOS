import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  Video,
  Layers,
  HelpCircle,
  Copy,
  Check,
  BookOpen,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
  Search,
  Target,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import {
  inglesReadingStrategies,
  inglesLegalVocabData,
  inglesPronounsAndWhData,
  inglesReadingTextData,
  inglesReviewVocabData,
  inglesTextFixationQuestionsData,
  inglesVideoInfo,
} from '../data/inglesLessonData';

interface InglesContentProps {
  isDarkMode?: boolean;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateTab: (tab: 'video' | 'questoes' | 'flashcards' | 'mapa' | 'resumo') => void;
}

export const InglesContent: React.FC<InglesContentProps> = ({
  isLessonCompleted,
  onToggleComplete,
  onNavigateTab,
}) => {
  // Speech synthesis helper for English pronunciation
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.88;
      utterance.onstart = () => setSpeakingText(text);
      utterance.onend = () => setSpeakingText(null);
      utterance.onerror = () => setSpeakingText(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Interactive states
  const [hideVocabTranslations, setHideVocabTranslations] = useState(false);
  const [vocabFilter, setVocabFilter] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  // Inline 6-question fixation quiz state (Seção 5)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('tjam_ingles_reading_quiz_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tjam_ingles_reading_quiz_submitted') === 'true';
    } catch {
      return false;
    }
  });
  const [copiedResults, setCopiedResults] = useState(false);

  const answeredCount = Object.keys(quizAnswers).length;
  const totalQuestions = inglesTextFixationQuestionsData.length;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    const updated = { ...quizAnswers, [questionId]: optionIdx };
    setQuizAnswers(updated);
    try {
      localStorage.setItem('tjam_ingles_reading_quiz_answers', JSON.stringify(updated));
    } catch {}
  };

  const handleCorrectQuiz = () => {
    setQuizSubmitted(true);
    try {
      localStorage.setItem('tjam_ingles_reading_quiz_submitted', 'true');
    } catch {}
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    try {
      localStorage.removeItem('tjam_ingles_reading_quiz_answers');
      localStorage.removeItem('tjam_ingles_reading_quiz_submitted');
    } catch {}
  };

  const correctCount = inglesTextFixationQuestionsData.filter(
    (q) => quizAnswers[q.id] === q.correta
  ).length;

  const filteredVocab = inglesLegalVocabData.filter(
    (item) =>
      item.en.toLowerCase().includes(vocabFilter.toLowerCase()) ||
      item.pt.toLowerCase().includes(vocabFilter.toLowerCase())
  );

  const handleCopyQuizReport = () => {
    const lines = inglesTextFixationQuestionsData.map((q) => {
      const chosenIdx = quizAnswers[q.id];
      const chosenLetter =
        chosenIdx !== undefined ? String.fromCharCode(65 + chosenIdx) : '—';
      const correctLetter = String.fromCharCode(65 + q.correta);
      const status =
        chosenIdx === q.correta ? 'Correta' : chosenIdx === undefined ? 'Não respondida' : 'Incorreta';
      return `Q${q.id}: marcada ${chosenLetter} (Gabarito: ${correctLetter}) — ${status}`;
    });

    const report = `Aula 1 — Língua Inglesa (Reading Comprehension)
Preparatório TJAM — Assistente Judiciário
Desempenho: ${correctCount}/${totalQuestions} acertos

${lines.join('\n')}`;

    navigator.clipboard.writeText(report);
    setCopiedResults(true);
    setTimeout(() => setCopiedResults(false), 2500);
  };

  const fullEnglishText = inglesReadingTextData.paragraphsEn.join(' ');

  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-100 leading-relaxed">
      {/* Header Principal */}
      <header className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <span>Aula 01</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Língua Inglesa</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Nível Intermediário</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>TJAM Assistente Judiciário</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Reading Comprehension — Interpretação de Textos em Inglês
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              O objetivo desta aula é desenvolver sua capacidade de interpretar textos em inglês, identificar informações importantes e compreender vocabulário jurídico e administrativo essencial em provas de concursos.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                playAudio(
                  'Reading Comprehension. Skimming, scanning, and reading for detail for TJAM.'
                )
              }
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ouvir Introdução</span>
            </button>

            <button
              type="button"
              onClick={onToggleComplete}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors border ${
                isLessonCompleted
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLessonCompleted ? 'Aula Concluída' : 'Marcar como Concluída'}</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 dark:text-slate-400 font-medium">
            <strong className="text-slate-900 dark:text-white">Meta da aula:</strong> compreender a ideia central de um texto, localizar dados específicos e reconhecer vocabulário jurídico.
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab('video')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Video className="w-3.5 h-3.5 text-rose-600" />
              <span>Videoaula</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('questoes')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Questões (20)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('flashcards')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Flashcards (10)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Seção 1: Estratégias de leitura */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
            1. Estratégias de leitura
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Existem três técnicas fundamentais para responder questões de interpretação com agilidade e precisão:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inglesReadingStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-400">
                  {strategy.subtitle}
                </div>
                <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                  {strategy.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {strategy.description}
                </p>
              </div>
              <p className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {strategy.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 2: Vocabulário jurídico e administrativo */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              2. Vocabulário jurídico e administrativo
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Memorize estas 15 palavras recorrentes em editais e textos institucionais do Judiciário. Clique para ouvir a pronúncia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={vocabFilter}
                onChange={(e) => setVocabFilter(e.target.value)}
                placeholder="Filtrar termo..."
                className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setHideVocabTranslations((prev) => !prev)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {hideVocabTranslations ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Mostrar traduções</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Treinar memorização</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4">Inglês</th>
                <th className="py-3 px-4">Português</th>
                <th className="py-3 px-4 text-right w-24">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredVocab.map((item) => (
                <tr
                  key={item.en}
                  onClick={() => playAudio(item.en)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">
                    {item.en}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-200">
                    {hideVocabTranslations ? '••••••••••' : item.pt}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-indigo-600">
                      <Volume2
                        className={`w-4 h-4 ${
                          speakingText === item.en ? 'text-emerald-600 animate-pulse' : ''
                        }`}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção 3: Pronomes e palavras interrogativas */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
            3. Pronomes e palavras interrogativas
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Palavras-chave para entender exatamente o que o enunciado pergunta e a quem o texto se refere:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {inglesPronounsAndWhData.map((item) => (
            <button
              type="button"
              key={item.en}
              onClick={() => playAudio(item.en)}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 text-left cursor-pointer transition-colors space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-extrabold text-indigo-700 dark:text-indigo-300">
                  {item.en}
                </span>
                <Volume2
                  className={`w-3.5 h-3.5 shrink-0 ${
                    speakingText === item.en
                      ? 'text-emerald-600 animate-pulse'
                      : 'text-slate-400'
                  }`}
                />
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {item.pt}
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Atenção para a prova:</strong> palavras como <em>who</em>, <em>where</em>, <em>when</em> e <em>why</em> ajudam a identificar imediatamente o tipo de informação solicitado em uma questão, guiando a técnica de <strong>Scanning</strong>.
          </p>
        </div>
      </section>

      {/* Seção 4: Texto para interpretação */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
            4. Texto para interpretação
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Leia com atenção usando as estratégias de <em>Skimming</em>, <em>Scanning</em> e <em>Reading for detail</em>.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                {inglesReadingTextData.level}
              </div>
              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white mt-0.5">
                {inglesReadingTextData.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => playAudio(fullEnglishText)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ouvir Texto em Inglês</span>
            </button>
          </div>

          <div className="space-y-4 text-base text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
            {inglesReadingTextData.paragraphsEn.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Vocabulary of the text */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Vocabulary (clique para ouvir)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
              {inglesReadingTextData.vocabulary.map((word) => (
                <button
                  type="button"
                  key={word.en}
                  onClick={() => playAudio(word.en)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-indigo-400 text-left cursor-pointer transition-colors"
                >
                  <div className="font-bold text-indigo-700 dark:text-indigo-300">
                    {word.en}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                    {word.pt}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Translation */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Recomendação: responda aos exercícios antes de consultar a tradução.
              </span>
              <button
                type="button"
                onClick={() => setShowTranslation((prev) => !prev)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 cursor-pointer transition-colors"
              >
                {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showTranslation ? 'Ocultar tradução do texto' : 'Ver tradução do texto'}</span>
              </button>
            </div>

            {showTranslation && (
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Tradução do texto
                </div>
                {inglesReadingTextData.paragraphsPt.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seção 5: Exercícios — Fixação */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              5. Exercícios — Fixação
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Responda sem consultar o texto traduzido.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="text-slate-600 dark:text-slate-300">
              {answeredCount}/{totalQuestions} respondidas
            </span>
            {(answeredCount > 0 || quizSubmitted) && (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refazer</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {inglesTextFixationQuestionsData.map((q) => {
            const selectedIdx = quizAnswers[q.id];
            return (
              <div
                key={q.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
              >
                <div className="text-sm font-bold text-slate-950 dark:text-white">
                  {q.enunciado}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.opcoes.map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isSelected = selectedIdx === optIdx;
                    const isCorrect = optIdx === q.correta;

                    let optionStyle =
                      'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

                    if (isSelected && !quizSubmitted) {
                      optionStyle =
                        'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-100 font-bold';
                    } else if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isSelected) {
                        optionStyle =
                          'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold';
                      }
                    }

                    return (
                      <button
                        type="button"
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-colors flex items-center gap-2.5 cursor-pointer ${optionStyle}`}
                      >
                        <span className="font-extrabold text-slate-500 dark:text-slate-400">
                          {letter})
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    {q.explicacao}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            {quizSubmitted ? (
              <>
                <div className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Resultado: {correctCount} de {totalQuestions} acertos
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {correctCount === totalQuestions
                    ? 'Excelente desempenho! Você dominou a interpretação do texto e o vocabulário jurídico.'
                    : 'Revise os comentários acima e consulte a seção de Revisão para reforçar os pontos errados.'}
                </p>
              </>
            ) : (
              <>
                <div className="text-sm font-bold text-slate-950 dark:text-white">
                  Questionário de Fixação ({answeredCount}/{totalQuestions} respondidas)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ao terminar, clique para corrigir seu desempenho e copiar suas respostas para envio.
                </p>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {quizSubmitted && (
              <button
                type="button"
                onClick={handleCopyQuizReport}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                {copiedResults ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedResults ? 'Respostas copiados!' : 'Copiar respostas'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCorrectQuiz}
              disabled={answeredCount === 0}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-extrabold cursor-pointer transition-colors"
            >
              Corrigir minhas respostas
            </button>
          </div>
        </div>
      </section>

      {/* Seção 6: Revisão para memorizar & Meta */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
            6. Revisão para memorizar
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Antes de encerrar, fixe os 8 termos fundamentais desta aula (clique para ouvir):
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {inglesReviewVocabData.map((item) => (
            <button
              type="button"
              key={item.en}
              onClick={() => playAudio(item.en)}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-400 text-left cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-indigo-700 dark:text-indigo-300 text-sm">
                  {item.en}
                </span>
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                = {item.pt}
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 max-w-2xl">
            <Target className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Meta da aula:</strong> compreender a ideia central de um texto em inglês, localizar informações específicas e reconhecer vocabulário jurídico e administrativo.
            </span>
          </div>

          <a
            href={inglesVideoInfo.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-2 shrink-0 transition-colors"
          >
            <Video className="w-4 h-4" />
            <span>Assistir Videoaula no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Rodapé de Navegação */}
      <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onToggleComplete}
          className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 transition-colors ${
            isLessonCompleted
              ? 'bg-emerald-700 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? 'Aula 01 Concluída' : 'Marcar Aula como Concluída'}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateTab('questoes')}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Abrir Aba de Exercícios (20)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </article>
  );
};
