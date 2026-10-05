import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  FileText,
  FileCheck2,
  Bookmark,
  Brain,
  Play,
  ExternalLink,
  Target,
  Send,
  Building2,
  Eye,
  Smile,
  Ear,
  MessageSquare,
  Radio,
  Sliders,
  Award,
  Clock
} from 'lucide-react';
import { oratoriaPracticalTask } from '../data/oratoriaLessonData';

interface OratoriaContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const OratoriaContent: React.FC<OratoriaContentProps> = ({
  isDarkMode: _isDarkMode = false,
  isLessonCompleted = false,
  onToggleCompleted,
  onNavigateTab,
}) => {
  // Checklist interativo de leitura dos tópicos
  const [readTopics, setReadTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_oratoria_read_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTopic = (id: string) => {
    setReadTopics((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_oratoria_read_topics', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // State do roteiro de áudio da atividade prática
  const [studentAudioNotes, setStudentAudioNotes] = useState(() => {
    try {
      return localStorage.getItem('tjam_oratoria_audio_notes') || '';
    } catch {
      return '';
    }
  });

  const handleNotesChange = (val: string) => {
    setStudentAudioNotes(val);
    try {
      localStorage.setItem('tjam_oratoria_audio_notes', val);
    } catch {}
  };

  const [showScriptModel, setShowScriptModel] = useState(false);

  // Simulador de Casos de Atendimento e Oratória
  const [selectedCaseAnswer, setSelectedCaseAnswer] = useState<Record<string, string>>({});

  const oratoriaCases = [
    {
      id: 'oc1',
      title: 'Caso 1: Cidadão Angustiado no Balcão do Fórum',
      situacao: 'Um senhor idoso chega ao balcão muito nervoso porque não sabe se perdeu o prazo para contestar uma ação possessória.',
      pergunta: 'Qual a postura verbal e não verbal mais adequada para o Assistente Judiciário?',
      opcoes: [
        {
          id: 'A',
          texto: 'Falar de forma acelerada usando termos como "preclusão consumativa" e "revelia", orientando-o a procurar a Defensoria sem olhar nos olhos.',
          isCorreta: false,
          feedback: 'Incorreto. Acelerar a fala e usar juridiquês gera ruído linguístico e eleva a ansiedade do cidadão, violando a empatia e a acessibilidade comunicativa.'
        },
        {
          id: 'B',
          texto: 'Fazer contato visual tranquilo, adotar tom de voz calmo e acolhedor, ouvir o relato sem interromper e explicar em linguagem simples que os autos serão verificados imediatamente.',
          isCorreta: true,
          feedback: 'Correto! A escuta ativa, a serenidade não verbal (contato visual e tom calmo) e a linguagem clara trazem segurança e pacificam o conflito.'
        },
        {
          id: 'C',
          texto: 'Cruzar os braços, respirar fundo de forma visível e pedir que ele retorne quando estiver mais calmo.',
          isCorreta: false,
          feedback: 'Incorreto. Postura defensiva e sinais não verbais de impaciência configuram atendimento inadequado e desrespeitoso.'
        }
      ]
    },
    {
      id: 'oc2',
      title: 'Caso 2: Reunião de Equipe com a Magistrada',
      situacao: 'Durante uma reunião interna para organizar o fluxo de processos prioritários, você precisa apresentar uma sugestão de melhoria no cartório.',
      pergunta: 'Como estruturar sua oratória profissional?',
      opcoes: [
        {
          id: 'A',
          texto: 'Objetividade e clareza: introduzir a proposta de forma direta, elencar dados organizados, modular a voz em velocidade moderada e demonstrar segurança com postura ereta.',
          isCorreta: true,
          feedback: 'Correto! Clareza, organização lógica, dicção limpa e postura segura são os pilares da oratória profissional no ambiente judiciário.'
        },
        {
          id: 'B',
          texto: 'Falar o mais rápido possível para economizar tempo, sem fazer pausas entre as ideias.',
          isCorreta: false,
          feedback: 'Incorreto. Falar rápido sem pausas impede a reflexão da equipe e transmite insegurança ou nervosismo.'
        }
      ]
    }
  ];

  const handleSelectCase = (caseId: string, optId: string) => {
    setSelectedCaseAnswer((prev) => ({ ...prev, [caseId]: optId }));
  };

  const generateWhatsAppMessage = () => {
    const text = `*🎤 TJAM 2026 — Oratória (Aula 01: Comunicação Verbal e Não Verbal)*\n` +
      `*Aluno(a):* Envio do Áudio / Simulação de Atendimento Forense\n\n` +
      `*Roteiro de Fala Preparado:*\n${studentAudioNotes || oratoriaPracticalTask.audioScriptSuggestion}\n\n` +
      `*Meta:* Terceira aula de hoje concluída! 🎯 Envio para avaliação de clareza, dicção, empatia e ritmo vocal.`;

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const ORATORIA_VIDEO_URL = 'https://youtu.be/o9cFzsKDTB4?is=sSsRHeGyYjnFHUwE';

  return (
    <article className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* HEADER DA AULA: ORATÓRIA — AULA 01 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-violet-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Mic className="w-56 h-56 text-violet-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-400/30">
              🎤 Oratória • Aula 01
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
              ⭐ Terceira Aula de Hoje
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-300">
              TJAM Assistente Judiciário • Nível Intermediário
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Comunicação Verbal e Não Verbal
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Aprenda a harmonizar o poder das <strong>palavras</strong> (clareza, precisão e concisão) com a força decisiva da <strong>linguagem corporal</strong> (olhar, postura, gestos e tom de voz). Domine a escuta ativa, anule os ruídos comunicacionais e ofereça um atendimento judiciário digno e humanizado.
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
              className="px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-violet-200" />
              <span>Resolver 20 Exercícios</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('flashcards')}
              className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <Brain className="w-4 h-4 text-indigo-200" />
              <span>Praticar 10 Flashcards</span>
            </button>
            <a
              href={ORATORIA_VIDEO_URL}
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
      {/* BLOCO TEÓRICO CENTRAL — OS 15 TÓPICOS DA AULA */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-violet-500" />
              Teoria e Técnicas de Comunicação Forense
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Marque os tópicos lidos para fixar os conceitos e monitorar seu avanço diário.
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-300">
            {Object.values(readTopics).filter(Boolean).length} de 15 Tópicos Concluídos
          </span>
        </div>

        {/* TÓPICO 1: O QUE É COMUNICAÇÃO? */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t1'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-violet-600 dark:text-violet-400">
                1. Conceito Central
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                O que é Comunicação no Serviço Judiciário?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Comunicação é o processo bidirecional e dinâmico pelo qual uma pessoa transmite e recebe informações, ideias, sentimentos ou orientações. No serviço público do TJAM, comunicar-se bem não é apenas &quot;falar bonito&quot;, mas garantir que o jurisdicionado compreenda com exatidão seus direitos e atos processuais.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-900 text-center">Clareza</div>
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-900 text-center">Objetividade</div>
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-900 text-center">Respeito</div>
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-900 text-center">Organização</div>
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-900 text-center col-span-2 sm:col-span-1">Compreensão</div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t1')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t1'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 2: ELEMENTOS DA COMUNICAÇÃO */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t2'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 w-full">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                2. Teoria da Informação
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Os 6 Elementos da Comunicação (Jakobson)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-violet-600 dark:text-violet-400 uppercase text-[10px]">1. Emissor</span>
                  <p className="text-slate-700 dark:text-slate-300">Quem codifica e transmite a mensagem (ex.: servidor do TJAM).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-violet-600 dark:text-violet-400 uppercase text-[10px]">2. Receptor</span>
                  <p className="text-slate-700 dark:text-slate-300">Quem recebe e decodifica a mensagem (ex.: cidadão jurisdicionado).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-violet-600 dark:text-violet-400 uppercase text-[10px]">3. Mensagem</span>
                  <p className="text-slate-700 dark:text-slate-300">O conteúdo informativo transmitido (ex.: orientações de consulta processual).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-violet-600 dark:text-violet-400 uppercase text-[10px]">4. Canal</span>
                  <p className="text-slate-700 dark:text-slate-300">O meio físico ou suporte de propagação (ex.: fala presencial, telefone, e-mail).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-violet-600 dark:text-violet-400 uppercase text-[10px]">5. Código</span>
                  <p className="text-slate-700 dark:text-slate-300">O sistema de signos compartilhado (ex.: língua portuguesa culta ou Libras).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-violet-600 dark:text-violet-400 uppercase text-[10px]">6. Contexto (Referente)</span>
                  <p className="text-slate-700 dark:text-slate-300">A situação e o ambiente em que a comunicação ocorre (ex.: atendimento no balcão forense).</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t2')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t2'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 3 & 4: COMUNICAÇÃO VERBAL */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t3_4'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                3 e 4. Modalidade Verbal
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Comunicação Verbal (Oral e Escrita)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A <strong>comunicação verbal</strong> utiliza palavras para transmitir ideias. Manifesta-se em duas modalidades fundamentais no TJAM:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-1">
                  <span className="font-extrabold text-blue-800 dark:text-blue-300 text-xs">🗣️ Modalidade Oral</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Atendimento no balcão presencial, orientações telefônicas, audiências, sustentação e reuniões com a vara.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-1">
                  <span className="font-extrabold text-blue-800 dark:text-blue-300 text-xs">✍️ Modalidade Escrita</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Ofícios formais, certidões de cartório, e-mails institucionais, relatórios e despachos administrativos.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-black text-slate-900 dark:text-white">Requisitos de Excelência:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Clareza</strong> (compreensão imediata) • <strong>Objetividade</strong> (sem rodeios desnecessários) • <strong>Precisão</strong> (vocabulário exato) • <strong>Adequação</strong> (registro compatível com o cidadão) • <strong>Organização</strong> (ordem lógica do raciocínio).
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t3_4')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t3_4'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 5, 6 & 7: COMUNICAÇÃO NÃO VERBAL & LINGUAGEM CORPORAL */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t5_7'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                5, 6 e 7. O Poder do Não Verbal
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Comunicação Não Verbal e Coerência Comportamental
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A <strong>comunicação não verbal</strong> abrange tudo aquilo que comunica sem recorrer a palavras: expressões faciais, postura corporal, contato visual, gesticulação e proximidade espacial.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Contato Visual
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">Demonstra atenção e respeito ao interlocutor.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5" /> Expressão Facial
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">Transmite serenidade, acolhimento e interesse.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5" /> Postura
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">Corpo ereto e aberto denota disponibilidade.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" /> Gestos
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">Gestos moderados apoiam e reforçam a fala.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-900 text-xs text-rose-950 dark:text-rose-200 space-y-1">
                <span className="font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  Alerta para Prova — Contradição Não Verbal:
                </span>
                <p>
                  Se um servidor diz <em>“Fique à vontade para explicar sua situação”</em> enquanto olha para a tela do celular com o corpo virado de lado, as palavras dizem uma coisa, mas o corpo diz outra. Em situações de conflito, o cidadão sempre prioriza o que é percebido na linguagem não verbal!
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t5_7')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t5_7'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 8: O TOM DE VOZ NA ORATÓRIA */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t8'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                8. Modulação Vocal
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Tom de Voz, Velocidade e a Importância das Pausas
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A maneira como algo é dito pode alterar por completo o sentido do enunciado. No atendimento judiciário e nas sustentações, o servidor deve dominar 5 dimensões da voz:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">Volume</span>
                  <p className="text-slate-600 dark:text-slate-300">Audível e equilibrado, sem gritar nem sussurrar.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">Velocidade e Ritmo</span>
                  <p className="text-slate-600 dark:text-slate-300">Ritmo confortável que permite assimilar a informação.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">Pausas Estratégicas</span>
                  <p className="text-slate-600 dark:text-slate-300">Permitem ao cidadão processar prazos e instruções.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t8')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t8'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 9, 10, 11 & 12: ESCUTA ATIVA & EMPATIA */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t9_12'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                9 a 12. Competências Relacionais
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Escuta Ativa, Clareza, Objetividade e Empatia
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Comunicar com maestria não é falar sem parar; é saber ouvir. A <strong>escuta ativa</strong> consiste em dedicar atenção genuína à fala do cidadão sem atropelá-lo com respostas pré-fabricadas.
              </p>
              <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/30 border-l-4 border-teal-500 space-y-2 text-xs">
                <span className="font-black text-teal-900 dark:text-teal-200 uppercase">Técnica da Paráfrase de Checagem:</span>
                <p className="text-slate-700 dark:text-slate-300 italic">
                  “Só para confirmar se compreendi com exatidão: o senhor precisa de uma certidão narratória para comprovar que o inventário já foi protocolado, correto?”
                </p>
                <p className="text-teal-800 dark:text-teal-400 font-semibold">
                  Essa checagem evita retrabalho e demonstra empatia imediata pelo problema do jurisdicionado.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t9_12')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t9_12'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 13: RUÍDOS NA COMUNICAÇÃO */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t13'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 w-full">
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                13. Barreiras Comunicativas
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Os 4 Tipos de Ruídos na Comunicação
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Ruído é qualquer elemento que dificulte, distorça ou impeça a transmissão fiel da mensagem:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-black text-rose-600 dark:text-rose-400 uppercase">1. Ruído Físico</span>
                  <p className="text-slate-600 dark:text-slate-300">Barulhos externos, eco na sala de audiência, obras ou ventilação ruidosa.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-black text-rose-600 dark:text-rose-400 uppercase">2. Ruído Técnico</span>
                  <p className="text-slate-600 dark:text-slate-300">Queda no link de internet, microfone falhando no balcão virtual ou travamento do sistema.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-black text-rose-600 dark:text-rose-400 uppercase">3. Ruído Linguístico</span>
                  <p className="text-slate-600 dark:text-slate-300">Uso abusivo de juridiquês, jargões incompreensíveis ou termos ambíguos.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-black text-rose-600 dark:text-rose-400 uppercase">4. Ruído Psicológico</span>
                  <p className="text-slate-600 dark:text-slate-300">Ansiedade, preconceito contra o cidadão, desatenção ou irritação prévia.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t13')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t13'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* TÓPICO 14 & 15: COMUNICAÇÃO NO PODER JUDICIÁRIO & SITUAÇÃO PRÁTICA */}
        <div className={`p-6 rounded-2xl border transition-all ${readTopics['t14_15'] ? 'bg-violet-50/40 border-violet-200 dark:bg-violet-950/20 dark:border-violet-900' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-violet-600 dark:text-violet-400">
                14 e 15. Aplicação Forense no TJAM
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Como Atender no Balcão do Tribunal: Comparativo Prático
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-rose-800 dark:text-rose-300 uppercase">
                    ❌ Resposta Inadequada (Ríspida e com Ruído):
                  </div>
                  <blockquote className="text-xs text-slate-800 dark:text-slate-200 italic p-2 rounded bg-white/70 dark:bg-slate-900/60">
                    “É só entrar no sistema Projudi e procurar lá. Se não souber o número da ação, nem adianta vir aqui perguntar.”
                  </blockquote>
                  <p className="text-[11px] text-rose-700 dark:text-rose-400">
                    Problemas: Falta de empatia, desinformação, antipatia e nenhuma orientação efetiva.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase">
                    ✅ Resposta Padrão TJAM (Clara, Respeitosa e Resolutiva):
                  </div>
                  <blockquote className="text-xs text-slate-800 dark:text-slate-200 italic p-2 rounded bg-white/70 dark:bg-slate-900/60">
                    “Bom dia! O senhor pode consultar o andamento da sua ação diretamente no nosso sistema eletrônico. Basta informar o número do processo na tela de pesquisa. Se o senhor não tiver o número em mãos, posso consultar pelo seu CPF aqui no balcão agora mesmo.”
                  </blockquote>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    Fórmula de Sucesso: Cordialidade + Clareza + Orientação passo a passo + Proatividade.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleTopic('t14_15')}
              className={`p-2 rounded-xl shrink-0 cursor-pointer transition-all ${readTopics['t14_15'] ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}
              title="Marcar como lido"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SIMULADOR DE CASOS DE ATENDIMENTO FORENSE */}
      {/* ========================================================================= */}
      <section className="space-y-6 p-6 sm:p-8 rounded-3xl border bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 text-white shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-violet-400 text-xs font-black uppercase tracking-wider">
            <Target className="w-4 h-4" /> Laboratório Interativo
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Simulador de Postura e Oratória no Balcão do TJAM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Selecione a conduta correta em cada situação real do fórum e receba o feedback pedagógico imediato:
          </p>
        </div>

        <div className="space-y-6">
          {oratoriaCases.map((c) => {
            const selectedOptId = selectedCaseAnswer[c.id];
            const chosen = c.opcoes.find((o) => o.id === selectedOptId);

            return (
              <div key={c.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-violet-300">{c.title}</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">{c.situacao}</p>
                  <p className="text-xs font-black text-amber-300 pt-1">{c.pergunta}</p>
                </div>

                <div className="space-y-2">
                  {c.opcoes.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectCase(c.id, opt.id)}
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

                {chosen && (
                  <div className={`p-4 rounded-xl text-xs space-y-1 animate-in fade-in duration-300 ${
                    chosen.isCorreta
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                  }`}>
                    <div className="font-black flex items-center gap-1.5">
                      {chosen.isCorreta ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>GABARITO CORRETO!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>CONDUTA INADEQUADA</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed opacity-90">{chosen.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ATIVIDADE PRÁTICA: GRAVAÇÃO / SIMULAÇÃO DE ÁUDIO & WHATSAPP */}
      {/* ========================================================================= */}
      <section className="space-y-6 p-6 sm:p-8 rounded-3xl border border-violet-200 dark:border-violet-900 bg-gradient-to-br from-violet-50/50 via-white to-sky-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/40 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider">
            <Mic className="w-4 h-4" /> Laboratório de Voz e Dicção
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            🎤 Atividade Prática — Gravação de Áudio (~1 min)
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {oratoriaPracticalTask.scenario}
          </p>
        </div>

        {/* 5 Requisitos do Áudio */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <span className="text-xs font-black text-violet-800 dark:text-violet-300 uppercase tracking-wide">
            Critérios Avaliados no Áudio:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>1. Cumprimentar o cidadão com cordialidade</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>2. Explicar de forma clara e objetiva</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>3. Evitar excesso de termos técnicos (sem juridiquês)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>4. Demonstrar empatia e disponibilidade</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>5. Utilizar pausas estratégicas e ritmo vocal moderado</span>
            </div>
          </div>
        </div>

        {/* Campo de Roteiro do Aluno */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
            Prepare seu roteiro de fala para praticar antes de gravar:
          </label>
          <textarea
            rows={4}
            value={studentAudioNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Escreva aqui seu roteiro de atendimento (cumprimento, explicação simples do passo a passo e encerramento com empatia)..."
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          />
        </div>

        {showScriptModel && (
          <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-xs space-y-1.5 animate-in fade-in duration-300">
            <span className="font-black text-violet-800 dark:text-violet-300">
              💡 Roteiro Modelo Sugerido pelo Professor:
            </span>
            <p className="text-slate-700 dark:text-slate-300 italic whitespace-pre-line leading-relaxed">
              {oratoriaPracticalTask.audioScriptSuggestion}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowScriptModel(!showScriptModel)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{showScriptModel ? 'Ocultar Modelo' : 'Ver Modelo Sugerido de Fala'}</span>
          </button>

          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Áudio / Atividade pelo WhatsApp ao Professor</span>
          </a>
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
          <span>{isLessonCompleted ? '✓ Aula 01 de Oratória Concluída' : 'Marcar Aula 01 como Concluída'}</span>
        </button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab && onNavigateTab('flashcards')}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Flashcards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('questoes')}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <span>Ir para as 20 Questões</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </article>
  );
};

// Helper user icon component
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
