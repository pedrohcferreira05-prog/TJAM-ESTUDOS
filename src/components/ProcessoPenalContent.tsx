import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  FileText,
  FileCheck2,
  Trophy,
  ExternalLink,
  Video,
  Bookmark,
  Send,
  MessageCircle,
  VideoOff,
  Mic,
  Copy,
  ChevronDown,
  ChevronUp,
  Eye,
  RotateCcw
} from 'lucide-react';
import {
  procPenalLessonSummaryPoints,
  procPenalFlashcardsData,
  procPenalMcQuestionsData,
  procPenalTfQuestionsData,
  procPenalDiscursiveQuestionsData,
  procPenalPracticalCase
} from '../data/processoPenalLessonData';
import { saveStudentSubmissionToFirestore } from '../lib/firestoreService';
import { StudentSubmission } from '../types';

interface ProcessoPenalContentProps {
  isDarkMode?: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted?: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProcessoPenalContent: React.FC<ProcessoPenalContentProps> = ({
  isDarkMode = false,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted = false,
  handleMarkAsCompleted: propHandleMarkAsCompleted,
  onToggleComplete,
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState<'teoria' | 'atividades' | 'discursivas'>('teoria');

  // Interactive state for multiple-choice questions (Part 1)
  const [selectedMcAnswers, setSelectedMcAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('tjam_proc_penal_mc_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive state for True/False questions (Part 2)
  const [selectedTfAnswers, setSelectedTfAnswers] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_proc_penal_tf_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive state for Written questions (Part 3)
  const [writtenAnswers, setWrittenAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('tjam_proc_penal_written_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [showAnswerKeys, setShowAnswerKeys] = useState<Record<number, boolean>>({});
  const [submittedWritten, setSubmittedWritten] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  });
  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  const handleSelectMc = (qId: number, optionIdx: number) => {
    const updated = { ...selectedMcAnswers, [qId]: optionIdx };
    setSelectedMcAnswers(updated);
    localStorage.setItem('tjam_proc_penal_mc_answers', JSON.stringify(updated));

    // Also persist student question attempts for teacher access
    try {
      const attemptsKey = 'tjam_student_question_attempts';
      const existing = JSON.parse(localStorage.getItem(attemptsKey) || '[]');
      const newAttempt = {
        id: `att-pp-${qId}-${Date.now()}`,
        questionId: `proc-penal-aula1-q${qId}`,
        selectedOptionId: `opt-${optionIdx}`,
        isCorrect: optionIdx === procPenalMcQuestionsData.find(q => q.id === qId)?.correta,
        answeredAt: new Date().toISOString(),
        studentName: 'Aluno TJAM',
        disciplineName: 'Processo Penal',
        lessonTitle: 'Aula 1: Princípios Fundamentais'
      };
      const filtered = existing.filter((a: any) => a.questionId !== `proc-penal-aula1-q${qId}`);
      filtered.push(newAttempt);
      localStorage.setItem(attemptsKey, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectTf = (qId: number, value: boolean) => {
    const updated = { ...selectedTfAnswers, [qId]: value };
    setSelectedTfAnswers(updated);
    localStorage.setItem('tjam_proc_penal_tf_answers', JSON.stringify(updated));
  };

  const handleSaveWritten = (qId: number, text: string) => {
    const updated = { ...writtenAnswers, [qId]: text };
    setWrittenAnswers(updated);
    localStorage.setItem('tjam_proc_penal_written_answers', JSON.stringify(updated));
  };

  const handleSubmitWrittenToTeacher = () => {
    try {
      const submissionsKey = 'tjam_student_submissions';
      const existingSubmissions = JSON.parse(localStorage.getItem(submissionsKey) || '[]');
      
      const newSub: StudentSubmission = {
        id: `sub-pp-aula1-${Date.now()}`,
        studentId: 'id00120087',
        studentName: 'Eduardo Mateus',
        turmaId: 'turma-tjam-2026',
        activityTitle: 'Aula 1: 5 Questões Escritas — Princípios Fundamentais do Processo Penal',
        disciplineName: 'Direito Processual Penal',
        submittedAt: new Date().toISOString(),
        content: procPenalDiscursiveQuestionsData.map(q => `[Questão ${q.id - 200}: ${q.enunciado}]\nRESPOSTA DO ALUNO: ${writtenAnswers[q.id] || '(Não respondida)'}\n`).join('\n\n'),
        status: 'pendente',
      };

      const filtered = existingSubmissions.filter((s: any) => s.id !== newSub.id);
      filtered.unshift(newSub);
      localStorage.setItem(submissionsKey, JSON.stringify(filtered));

      // Also sync to global tjam_submissions for Teacher Portal
      try {
        const globalSubmissions = JSON.parse(localStorage.getItem('tjam_submissions') || '[]');
        const updatedGlobal = [newSub, ...globalSubmissions.filter((s: any) => s.id !== newSub.id)];
        localStorage.setItem('tjam_submissions', JSON.stringify(updatedGlobal));
      } catch (e) {
        console.error(e);
      }

      // Also persist to Firestore
      saveStudentSubmissionToFirestore(newSub).catch(() => {});

      setSubmittedWritten(true);
      setToastMessage('Suas respostas escritas foram enviadas ao Professor para correção e atribuição de nota!');
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err) {
      console.error(err);
    }
  };

  const mcCorrectCount = procPenalMcQuestionsData.filter(q => selectedMcAnswers[q.id] === q.correta).length;
  const tfCorrectCount = procPenalTfQuestionsData.filter(q => selectedTfAnswers[q.id] === q.correta).length;

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/90 via-slate-900 to-amber-950/80 border border-rose-500/30 text-white space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-400/30 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-rose-400" />
            Processo Penal • 1ª Aula de Hoje
          </span>
          <span className="text-xs font-bold text-slate-400">
            CF/88 & CPP • Nível Intermediário • TJAM 2026
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ⚖️ Processo Penal — Aula 1: Princípios Fundamentais do Processo Penal
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            O Direito Processual Penal estabelece as regras e os procedimentos utilizados pelo Estado para investigar, processar e julgar infrações penais, garantindo o respeito aos direitos e às garantias fundamentais das pessoas envolvidas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('video')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black transition-all cursor-pointer shadow-md"
          >
            <Video className="w-4 h-4" />
            <span>Assistir Videoaula Oficial (Prof. Marcos Vinicius)</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('atividades');
              const el = document.getElementById('atividades-secao');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold border border-amber-500/40 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Resolver as 20 Atividades com Gabarito</span>
          </button>

          <a
            href="https://youtu.be/N2PakWeTuic?is=bL6rvfVynaQvQrVl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold border border-slate-700 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no YouTube</span>
          </a>
        </div>
      </div>

      {/* Navigation Pill Filters */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveSection('teoria')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'teoria'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Teoria Completa da Aula</span>
        </button>

        <button
          onClick={() => setActiveSection('atividades')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'atividades'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Parte 1 e 2: Marcar e V/F (15)</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] font-extrabold">
            {mcCorrectCount + tfCorrectCount}/15
          </span>
        </button>

        <button
          onClick={() => setActiveSection('discursivas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'discursivas'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Parte 3: 5 Questões Escritas</span>
          {submittedWritten && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO 1: TEORIA COMPLETA (TEXTO OFICIAL ENVIADO) */}
      {/* ========================================================================= */}
      {(activeSection === 'teoria' || activeSection === 'atividades') && (
        <div className="space-y-6">
          {/* Card Conceitual Geral */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Scale className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                O que é o Direito Processual Penal?
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              O <strong>Direito Processual Penal</strong> é o ramo do Direito que estabelece as regras e os procedimentos utilizados pelo Estado para investigar, processar e julgar infrações penais, garantindo o respeito aos direitos e às garantias fundamentais das pessoas envolvidas.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              📌 <strong>Fonte Primária:</strong> O processo penal deve observar princípios previstos principalmente na <strong>Constituição Federal de 1988</strong> e no <strong>Código de Processo Penal (CPP)</strong>.
            </p>
          </section>

          {/* Grid dos 11 Princípios Fundamentais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Devido Processo Legal */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  1
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Princípio do Devido Processo Legal
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Previsto no <strong>art. 5º, LIV, da Constituição Federal</strong>, estabelece que <em>ninguém será privado de sua liberdade ou de seus bens sem o devido processo legal</em>.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Isso significa que a atuação do Estado deve respeitar as regras e garantias estabelecidas pelo ordenamento jurídico. O devido processo legal possui relação direta com outras garantias processuais, como o contraditório, a ampla defesa e o juiz natural.
              </p>
            </div>

            {/* 2. Contraditório */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  2
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Princípio do Contraditório
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                O contraditório está previsto no <strong>art. 5º, LV, da Constituição Federal</strong>. Consiste na garantia de que as partes possam conhecer os atos e argumentos apresentados no processo e tenham oportunidade de se manifestar e reagir.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                No processo penal, o contraditório permite que a defesa tenha conhecimento da acusação, das provas produzidas e dos demais elementos relevantes, podendo apresentar sua manifestação pelos meios legalmente admitidos.
              </p>
            </div>

            {/* 3. Ampla Defesa */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  3
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Princípio da Ampla Defesa
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Também previsto no <strong>art. 5º, LV, da Constituição Federal</strong>, garante ao acusado a utilização dos meios legítimos necessários para sua defesa.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                <p><strong>• Defesa técnica:</strong> realizada por advogado ou defensor público.</p>
                <p><strong>• Autodefesa:</strong> exercida pelo próprio acusado, dentro das possibilidades previstas em lei.</p>
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold pt-1">
                  ⚠️ A ampla defesa não significa que qualquer meio possa ser utilizado. A defesa deve respeitar os limites estabelecidos pelo ordenamento jurídico (meios lícitos).
                </p>
              </div>
            </div>

            {/* 4. Presunção de Inocência */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  4
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Princípio da Presunção de Inocência
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                O <strong>art. 5º, LVII, da Constituição Federal</strong> estabelece que <em>ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória</em>.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A existência de uma acusação ou de um processo criminal, por si só, não equivale à declaração definitiva de culpa. A presunção de inocência não impede medidas cautelares previstas em lei (como prisão preventiva), desde que presentes seus requisitos legais.
              </p>
            </div>

            {/* 5. Juiz Natural */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  5
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Princípio do Juiz Natural
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Relacionado ao <strong>art. 5º, LIII, da Constituição Federal</strong>, segundo o qual <em>ninguém será processado nem sentenciado senão pela autoridade competente</em>.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A Constituição também <strong>proíbe a criação de juízo ou tribunal de exceção</strong>. O objetivo é garantir que o julgamento seja realizado pelo órgão jurisdicional competente de acordo com regras previamente estabelecidas.
              </p>
            </div>

            {/* 6. Inadmissibilidade das Provas Ilícitas */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  6
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Inadmissibilidade das Provas Ilícitas
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                O <strong>art. 5º, LVI, da Constituição Federal</strong> estabelece que <em>são inadmissíveis, no processo, as provas obtidas por meios ilícitos</em>.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A prova deve ser produzida de acordo com as regras jurídicas e respeitando os direitos fundamentais. A obtenção ilícita de uma prova pode resultar em seu desentranhamento e inadmissibilidade no processo.
              </p>
            </div>

            {/* 7. Publicidade */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  7
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Princípio da Publicidade
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                A publicidade dos atos processuais é uma importante garantia do sistema de Justiça. Como regra, os atos processuais são públicos, permitindo o controle da atividade jurisdicional.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Entretanto, a própria Constituição admite restrições à publicidade quando necessárias à preservação da intimidade ou do interesse social, nos termos da lei. Portanto, a <strong>publicidade é a regra</strong>, com restrições excepcionais.
              </p>
            </div>

            {/* 8. Fundamentação das Decisões Judiciais */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  8
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Fundamentação das Decisões Judiciais
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Todas as decisões judiciais devem ser fundamentadas (Art. 93, IX, da CF). A fundamentação permite que as partes conheçam as razões utilizadas pelo julgador para chegar a determinada conclusão.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A exigência de fundamentação também contribui para o controle das decisões judiciais e para o exercício indispensável do direito de recorrer quando cabível.
              </p>
            </div>

            {/* 9. Sistema Acusatório */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  9
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Sistema Acusatório
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                O processo penal brasileiro adota uma <strong>estrutura acusatória</strong>, marcada pela separação das funções de acusar, defender e julgar:
              </p>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p>• <strong>Acusação:</strong> exercida pelo órgão legitimado (Ministério Público ou querelante).</p>
                <p>• <strong>Defesa:</strong> exercida em favor do acusado (defesa técnica + autodefesa).</p>
                <p>• <strong>Julgamento:</strong> compete ao Poder Judiciário, por meio do juiz competente e imparcial.</p>
              </div>
            </div>

            {/* 10. Direito ao Silêncio */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  10
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Direito ao Silêncio
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                O acusado possui o direito de permanecer em silêncio. Esse direito está relacionado à garantia constitucional de <strong>não produzir prova contra si mesmo</strong> (<em>nemo tenetur se detegere</em>).
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                O silêncio <strong>não deve ser confundido com confissão</strong>. O acusado não é obrigado a apresentar declarações que possam contribuir para sua própria incriminação.
              </p>
            </div>

            {/* 11. Direito à Defesa Técnica */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  11
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Direito à Defesa Técnica
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                A defesa técnica é uma garantia essencial do processo penal. O acusado deve contar com assistência profissional adequada, exercida por advogado ou, nas hipóteses legais, pela Defensoria Pública ou outro defensor legitimamente constituído.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A defesa técnica busca assegurar que o acusado tenha condições jurídicas reais de exercer plenamente seus direitos durante o processo.
              </p>
            </div>

            {/* 12. Aplicação dos Princípios */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                  12
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Aplicação dos Princípios no Processo Penal
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Os princípios fundamentais funcionam como <strong>garantias que limitam a atuação do Estado</strong> na investigação, acusação e julgamento das infrações penais.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                O processo penal não é apenas um conjunto de procedimentos formais; é um instrumento de proteção dos direitos fundamentais, equilibrando o poder estatal de punir (<em>jus puniendi</em>) com a liberdade individual.
              </p>
            </div>
          </div>

          {/* Embedded Video Section */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-rose-400" />
                <h3 className="font-black text-base">Videoaula Oficial da Aula 1</h3>
              </div>
              <a
                href="https://youtu.be/N2PakWeTuic?is=bL6rvfVynaQvQrVl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <span>Assistir no YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/N2PakWeTuic?autoplay=0&rel=0"
                title="Processo Penal - Aula 1: Princípios Fundamentais do Processo Penal"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 2: 20 ATIVIDADES OFICIAIS (10 MARCAR + 5 V/F + 5 ESCRITAS) */}
      {/* ========================================================================= */}
      <div id="atividades-secao" className="space-y-8 pt-4">
        {/* PARTE 1 — 10 QUESTÕES DE MARCAR */}
        <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black">
                🟦
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  PARTE 1 — Questões de Marcar (10 Questões)
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Selecione a alternativa correta e veja o feedback imediato com justificativa.
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              Acertos: {mcCorrectCount} de 10
            </span>
          </div>

          <div className="space-y-6 pt-2">
            {procPenalMcQuestionsData.map((q) => {
              const selectedOpt = selectedMcAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correta;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                      {q.enunciado}
                    </p>
                    {isAnswered && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                        }`}
                      >
                        {isCorrect ? 'Correto!' : 'Incorreto'}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {(q.opcoes || []).map((opt, idx) => {
                      const isThisSelected = selectedOpt === idx;
                      const isThisCorrectOption = idx === q.correta;

                      let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-300';
                      if (isAnswered) {
                        if (isThisSelected && isCorrect) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isThisSelected && !isCorrect) {
                          btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-bold';
                        } else if (isThisCorrectOption) {
                          btnStyle = 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-800 dark:text-emerald-300';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectMc(q.id, idx)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isThisCorrectOption && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {isAnswered && (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">
                        Gabarito & Fundamentação:
                      </strong>
                      <p>{q.explicacao}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* PARTE 2 — 5 QUESTÕES DE VERDADEIRO OU FALSO */}
        <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black">
                🟨
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  PARTE 2 — Verdadeiro ou Falso (5 Questões)
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Julgue os itens em Verdadeiro (V) ou Falso (F).
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Acertos: {tfCorrectCount} de 5
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {procPenalTfQuestionsData.map((q) => {
              const selectedVal = selectedTfAnswers[q.id];
              const isAnswered = selectedVal !== undefined;
              const isCorrect = selectedVal === q.correta;

              return (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-relaxed">
                      {q.enunciado}
                    </p>
                    {isAnswered && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                        }`}
                      >
                        {isCorrect ? 'Acertou!' : 'Errou!'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSelectTf(q.id, true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedVal === true
                          ? q.correta
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : 'bg-rose-500 text-white border-rose-600'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> (V) Verdadeiro
                    </button>

                    <button
                      onClick={() => handleSelectTf(q.id, false)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedVal === false
                          ? !q.correta
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : 'bg-rose-500 text-white border-rose-600'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400'
                      }`}
                    >
                      <span>(F) Falso</span>
                    </button>
                  </div>

                  {isAnswered && (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <strong>Gabarito: {q.correta ? 'V — Verdadeiro' : 'F — Falso'}.</strong> {q.explicacao}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* PARTE 3 — 5 QUESTÕES ESCRITAS (DISCURSIVAS) COM RESPOSTAS ESPERADAS */}
        <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black">
                🟩
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  PARTE 3 — Questões Escritas (5 Questões)
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Escreva suas respostas com suas palavras e envie para a correção do professor.
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmitWrittenToTeacher}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Respostas ao Professor</span>
            </button>
          </div>

          <div className="space-y-6 pt-2">
            {procPenalDiscursiveQuestionsData.map((q) => {
              const currentText = writtenAnswers[q.id] || '';
              const showKey = showAnswerKeys[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider block">
                      Questão Escrita {q.id - 200} de 5
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-relaxed">
                      {q.enunciado}
                    </h4>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                      Sua Resposta:
                    </label>
                    <textarea
                      value={currentText}
                      onChange={(e) => handleSaveWritten(q.id, e.target.value)}
                      placeholder="Digite sua resposta explicativa aqui com suas próprias palavras..."
                      rows={4}
                      className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:border-emerald-500 transition-all leading-relaxed resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      onClick={() => setShowAnswerKeys(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showKey ? 'Ocultar Resposta Esperada' : 'Ver Resposta Esperada (Espelho Oficial)'}</span>
                    </button>

                    <span className="text-[10px] text-slate-400">
                      {currentText.length} caracteres
                    </span>
                  </div>

                  {showKey && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-1 animate-in fade-in">
                      <strong className="text-emerald-900 dark:text-emerald-200 block">
                        ✅ Resposta Esperada Oficial:
                      </strong>
                      <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                        {q.respostaEsperada}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleSubmitWrittenToTeacher}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Todas as 5 Respostas Escritas para o Portal do Professor</span>
            </button>
          </div>
        </section>
      </div>

      {/* Completion & Progress Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-black text-slate-900 dark:text-white text-base">
            Conclusão da Aula 1 de Processo Penal
          </h4>
          <p className="text-xs text-slate-500">
            {isLessonCompleted
              ? '✅ Parabéns! Esta aula já está registrada como concluída no seu plano de estudos.'
              : 'Clique no botão ao lado para registrar a conclusão da aula e computar seu progresso.'}
          </p>
        </div>

        <button
          onClick={handleMarkAsCompleted}
          className={`px-6 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 shadow-md shrink-0 ${
            isLessonCompleted
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
              : 'bg-rose-600 hover:bg-rose-500 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? 'Aula Concluída (Clique para Alternar)' : 'Marcar Aula como Concluída'}</span>
        </button>
      </div>
    </article>
  );
};
