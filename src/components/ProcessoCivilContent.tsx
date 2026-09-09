import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Check,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  UserCheck,
  Users,
  FileCheck2,
  Trophy,
  ExternalLink,
  Video,
  Clock,
  Mic,
  MessageCircle,
  Copy,
  Calendar,
  Sparkles,
  FileText
} from 'lucide-react';
import {
  procCivilAula2SummaryPoints,
  procCivilPracticalCase
} from '../data/processoCivilLessonData';

interface ProcessoCivilContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProcessoCivilContent: React.FC<ProcessoCivilContentProps> = ({
  isDarkMode,
  checklist: propChecklist,
  toggleChecklist: propToggleChecklist,
  isLessonCompleted,
  handleMarkAsCompleted: propHandleMarkAsCompleted,
  onToggleComplete,
  setActiveTab: propSetActiveTab,
  onNavigateTab,
}) => {
  const [internalChecklist, setInternalChecklist] = useState<Record<string, boolean>>({});
  const [videoAnswers, setVideoAnswers] = useState<Record<number, string>>({});
  const [copiedCase, setCopiedCase] = useState(false);

  const checklist = propChecklist || internalChecklist;
  const toggleChecklist = propToggleChecklist || ((id: string) => {
    setInternalChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  });
  const handleMarkAsCompleted = propHandleMarkAsCompleted || onToggleComplete || (() => {});
  const setActiveTab = propSetActiveTab || onNavigateTab || (() => {});

  const handleCopyPracticalScript = () => {
    const text = `EXERCÍCIO PRÁTICO — DIREITO PROCESSUAL CIVIL (Aula 2 - Atos Processuais)\n\n📌 Caso Prático:\n${procCivilPracticalCase.caso}\n\n🎤 Perguntas para Responder no Vídeo:\n${procCivilPracticalCase.perguntas.map((p, i) => `${p}\nRascunho: ${videoAnswers[i] || '(A responder)'}`).join('\n\n')}\n\n🗣️ Desafio Final:\n${procCivilPracticalCase.desafioOral}\n\nTempo Sugerido: ${procCivilPracticalCase.tempoSugerido}`;
    navigator.clipboard.writeText(text);
    setCopiedCase(true);
    setTimeout(() => setCopiedCase(false), 2500);
  };

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 border border-indigo-500/40 text-white space-y-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              ⭐ 2ª Aula de Hoje • Processo Civil
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              TJAM 2026
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Lei nº 13.105/2015 (CPC) • Atos Processuais
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ⚖️ Direito Processual Civil — Aula 2: Atos Processuais
        </h1>

        <p className="text-sm text-indigo-200/90 max-w-3xl leading-relaxed">
          Os atos processuais são as manifestações praticadas no processo para produzir efeitos jurídicos e permitir o desenvolvimento da atividade processual rumo à prestação jurisdicional justa e efetiva.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('video')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-all cursor-pointer shadow-md shadow-indigo-600/30"
          >
            <Video className="w-4 h-4" />
            <span>Assistir Vídeo Aula (Prof. Especialista)</span>
          </button>
          <a
            href="https://youtu.be/N5oBz1cC2xY?is=kLX-4lDE-WmOVM8c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 font-bold border border-slate-700 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            <span>Abrir Vídeo no YouTube</span>
          </a>
          <button
            onClick={() => setActiveTab('questoes')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-300 font-bold border border-amber-500/30 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Resolver as 20 Questões Gabaritadas</span>
          </button>
        </div>
      </div>

      {/* 1. Conceito de Atos Processuais */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">1. 📌</span>
          <h2>Conceito de Atos Processuais</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          São atos praticados pelas <strong>partes</strong>, pelo <strong>juiz</strong>, pelos <strong>auxiliares da Justiça</strong> e por <strong>outros participantes</strong> do processo com a finalidade de constituir, conservar, modificar ou extinguir direitos e relações processuais.
        </p>
        
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 space-y-2">
          <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300 tracking-wider">
            Exemplos Clássicos de Atos Processuais:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-base">📄</span> Apresentação de petição inicial ou contestação
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-base">⚖️</span> Decisão interlocutória ou sentença do juiz
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-base">📬</span> Citação do réu para integrar o processo
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-base">📢</span> Intimação dos atos e despachos às partes
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-base">🔍</span> Apresentação de documentos e produção de provas
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-base">✍️</span> Certidões e termos lavrados pelo escrivão
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quem pode praticar atos processuais? */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">2. 👥</span>
          <h2>Quem pode praticar atos processuais?</h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O processo civil é uma relação jurídica dinâmica e cooperativa (CPC, art. 6º). Cada sujeito tem atribuições específicas:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm flex items-center gap-1.5">
              <span>👨‍⚖️ Juiz</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              Pratica atos judiciais decisórios e de impulso: <strong>decisões interlocutórias</strong>, <strong>sentenças</strong>, <strong>despachos</strong> e audiências.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm flex items-center gap-1.5">
              <span>👤 Partes (Autor e Réu)</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              Praticam atos postulatórios, dispositivos e probatórios: <strong>petições</strong>, <strong>manifestações</strong>, acordos e <strong>recursos</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm flex items-center gap-1.5">
              <span>💼 Advogados & Defensores</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              Exercem a <strong>capacidade postulatória</strong>: representação técnica, redação de peças, sustentação oral e defesa dos direitos em juízo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm flex items-center gap-1.5">
              <span>🏛️ Servidores e Auxiliares da Justiça</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              Exercem atos de documentação e cumprimento: <strong>citações</strong>, <strong>intimações</strong>, <strong>certidões</strong>, juntadas e penhoras.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Forma dos atos processuais */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">3. 📝</span>
          <h2>Forma dos Atos Processuais (CPC, art. 188)</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          O CPC consagra o <strong>princípio da instrumentalidade das formas</strong> (ou princípio da liberdade das formas):
        </p>
        <blockquote className="text-sm font-semibold italic text-indigo-900 dark:text-indigo-200 bg-indigo-50/60 dark:bg-indigo-950/40 p-4 rounded-2xl border-l-4 border-indigo-600">
          &ldquo;Os atos e os termos processuais independem de forma determinada, salvo quando a lei expressamente a exigir, considerando-se válidos os que, realizados de outro modo, preencham a sua finalidade essencial.&rdquo; (Art. 188 do CPC)
        </blockquote>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 dark:text-slate-300">
            <strong>📌 Foco na Prova:</strong> O objetivo é evitar o <em>excesso de formalismo</em> quando a finalidade do ato puder ser plenamente alcançada de outra maneira sem prejudicar o contraditório nem a defesa. Não há nulidade sem prejuízo (<em>pas de nullité sans grief</em>).
          </p>
        </div>
      </section>

      {/* 4. Tempo dos atos processuais */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">4. ⏰</span>
          <h2>Tempo dos Atos Processuais (CPC, art. 212)</h2>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl text-xs font-black bg-indigo-600 text-white">
              Regra Geral
            </span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              Dias úteis, das 6h às 20h
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Em regra, os atos processuais são realizados em dias úteis, das <strong>6h às 20h</strong>, conforme expressamente previsto no art. 212 do CPC.
          </p>
          <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 text-xs text-slate-600 dark:text-slate-300">
            ⚠️ <strong>Exceções Legais:</strong> Atos de tutela de urgência, citações e penhoras podem ser praticados fora desse horário ou em feriados quando houver expressa autorização judicial ou risco de perecimento do direito (CPC, art. 212, § 2º).
          </div>
        </div>
      </section>

      {/* 5. Atos eletrônicos */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">5. 💻</span>
          <h2>Atos Eletrônicos (CPC, arts. 193 a 199)</h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O processo judicial pode utilizar meios eletrônicos para a prática, comunicação e tramitação dos atos processuais (como no PJe e PROJUDI do TJAM). Isso permite:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Apresentação eletrônica de documentos
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Peticionamento 100% eletrônico
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Comunicações processuais digitais
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Consulta aos autos a qualquer momento
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Prática de audiências à distância
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Intimação eletrônica pelo Diário de Justiça
          </div>
        </div>
      </section>

      {/* 6. Publicidade e Segredo de Justiça */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">6. 📢</span>
          <h2>Publicidade dos Atos Processuais (CPC, art. 189)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white uppercase">
              Regra Geral → Publicidade
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Em regra, os atos processuais são <strong>públicos</strong>. Qualquer pessoa do povo pode ter acesso, assistir a audiências e consultar os autos, garantindo a transparência democrática (art. 93, IX, CF/88).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white uppercase">
              Exceção → Segredo de Justiça
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Existem situações em que o processo tramita em segredo de justiça, restrito às hipóteses previstas em lei (art. 189 do CPC: interesse público/social, casamento, alimentos, família, arbitragem com sigilo).
            </p>
          </div>
        </div>
      </section>

      {/* 7. Citação e Intimação */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">7. 📬</span>
          <h2>Citação e Intimação (Não Confunda!)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Citação */}
          <div className="p-5 rounded-2xl bg-blue-500/10 border-2 border-blue-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-base text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <span>📬 Citação (Art. 238 CPC)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-400/30">
                1ª Convocação
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Chama o <strong>réu</strong>, <strong>executado</strong> ou <strong>interessado</strong> para <strong>integrar a relação processual</strong>. É indispensável para a validade do processo.
            </p>
            <div className="p-2.5 rounded-xl bg-blue-600 text-white text-xs font-black flex items-center gap-2">
              <span>🧠 Citação = CHAMA para o processo!</span>
            </div>
          </div>

          {/* Intimação */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-base text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <span>📢 Intimação (Art. 269 CPC)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Comunicação Interna
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Dá <strong>ciência</strong> a alguém dos atos e termos do processo para que faça ou deixe de fazer alguma coisa no decorrer da marcha processual.
            </p>
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-2">
              <span>🧠 Intimação = COMUNICA o que aconteceu no processo!</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Prazos processuais */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">8. ⚠️</span>
          <h2>Prazos Processuais (CPC, art. 219)</h2>
        </div>
        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-extrabold text-sm text-indigo-950 dark:text-indigo-100">
              Regra de Ouro: Contagem Exclusiva em Dias Úteis
            </h3>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Nos prazos processuais previstos no CPC, <strong>contam-se apenas os dias úteis</strong>. Sábados, domingos e feriados não são contados.
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300">
            📌 <strong>Atenção para Pegadinhas de Prova:</strong> Essa contagem em dias úteis aplica-se <em>exclusivamente</em> aos prazos processuais! Prazos de direito civil/material (como prescrição e decadência) e prazos do Processo Penal são contados de forma contínua (dias corridos).
          </div>
        </div>
      </section>

      {/* 9. Preclusão */}
      <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-lg">
          <span className="text-xl">9. 🔄</span>
          <h2>Preclusão</h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A preclusão ocorre quando a parte <strong>perde a possibilidade de praticar determinado ato processual</strong>, garantindo que o processo marche sempre para frente sem retrocessos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-black text-rose-600 dark:text-rose-400 text-sm">
              ⏳ 1. Preclusão Temporal
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Ocorre porque a parte <strong>deixou passar o prazo legal</strong> sem praticar o ato (decurso in albis).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
              ✅ 2. Preclusão Consumativa
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Ocorre porque a parte <strong>já praticou o ato</strong>, não podendo renová-lo ou complementá-lo depois.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-black text-amber-600 dark:text-amber-400 text-sm">
              ⚡ 3. Preclusão Lógica
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Ocorre porque a parte praticou <strong>ato incompatível</strong> com outro que pretendia realizar (ex.: aceitou a decisão expressamente e depois quis recorrer).
            </p>
          </div>
        </div>
      </section>

      {/* 🧠 RESUMÃO PARA A PROVA */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/30 via-slate-900 to-purple-950/30 border-2 border-indigo-500/40 space-y-4 shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-base sm:text-lg text-white">
            🧠 Resumão para a Prova (Memorização Imediata)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-indigo-500/30 text-indigo-300 uppercase tracking-wider font-black">
                <th className="py-2.5 px-3">Tema</th>
                <th className="py-2.5 px-3">O que você DEVE lembrar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Atos Processuais</td>
                <td className="py-2.5 px-3">Movimentam e desenvolvem o processo para produzir efeitos jurídicos</td>
              </tr>
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Forma dos Atos</td>
                <td className="py-2.5 px-3">Livre como regra (Art. 188), salvo exigência legal específica</td>
              </tr>
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Publicidade</td>
                <td className="py-2.5 px-3">Regra geral para todos os atos (Art. 189)</td>
              </tr>
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Segredo de Justiça</td>
                <td className="py-2.5 px-3">Exceção restrita às hipóteses previstas em lei</td>
              </tr>
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Citação (Art. 238)</td>
                <td className="py-2.5 px-3">Chama o réu/interessado para INTEGRAR o processo</td>
              </tr>
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Intimação (Art. 269)</td>
                <td className="py-2.5 px-3">Dá CIÊNCIA dos atos e decisões do processo</td>
              </tr>
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Prazo Processual</td>
                <td className="py-2.5 px-3">Em regra, contam-se APENAS os dias úteis (Art. 219)</td>
              </tr>
              <tr className="hover:bg-indigo-500/10">
                <td className="py-2.5 px-3 font-bold text-amber-300">Preclusão</td>
                <td className="py-2.5 px-3">Perda da faculdade de praticar determinado ato processual</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Artigos Importantes */}
        <div className="pt-3 border-t border-indigo-500/30 text-xs text-indigo-200">
          <p className="font-black text-amber-300 uppercase tracking-wider mb-1">
            📌 Artigos Mais Cobrados do CPC sobre Atos Processuais:
          </p>
          <p>
            Arts. 188 a 211 do CPC. Dê atenção especial aos <strong>arts. 188, 212, 219, 220 e 238</strong>!
          </p>
        </div>
      </section>

      {/* 🏠 EXERCÍCIO PRÁTICO — ATIVIDADE EM VÍDEO */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/80 via-slate-900 to-indigo-950/90 border-2 border-indigo-500/50 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/30 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-500/30 text-indigo-200 uppercase tracking-wider border border-indigo-400/30 flex items-center gap-1.5 inline-flex">
              <Video className="w-3.5 h-3.5 text-indigo-400" />
              Atividade Prática • Gravação de Vídeo
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              🏠 Exercício Prático: O Caso de Maria contra João
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 3 a 5 min
            </span>
          </div>
        </div>

        {/* Caso Prático */}
        <div className="p-5 rounded-2xl bg-indigo-900/30 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-indigo-300 tracking-wider">
              📌 Enunciado do Caso Prático:
            </span>
            <button
              onClick={handleCopyPracticalScript}
              className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCase ? 'Copiado!' : 'Copiar Roteiro'}</span>
            </button>
          </div>
          <blockquote className="text-sm sm:text-base font-semibold text-slate-200 italic border-l-4 border-indigo-400 pl-4 py-1 leading-relaxed">
            &ldquo;{procCivilPracticalCase.caso}&rdquo;
          </blockquote>
          <p className="text-xs text-indigo-200">
            🎥 <strong>Orientação:</strong> O aluno deverá gravar um vídeo, responder ao caso prático e enviar ao professor.
          </p>
        </div>

        {/* As 7 Perguntas para Responder no Vídeo */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Mic className="w-4 h-4 text-indigo-400" /> 🎤 No Vídeo, Responda às 7 Perguntas:
          </h4>

          <div className="space-y-2.5 text-xs">
            {procCivilPracticalCase.perguntas.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <p className="font-bold text-slate-100">{p}</p>
                <input
                  type="text"
                  placeholder="Escreva aqui seu rascunho de resposta para treinar antes do vídeo..."
                  value={videoAnswers[idx] || ''}
                  onChange={(e) => setVideoAnswers({ ...videoAnswers, [idx]: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desafio Final */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
            🗣️ Desafio Final (Sem Olhar as Respostas!)
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-semibold">
            {procCivilPracticalCase.desafioOral}
          </p>
        </div>

        {/* Critérios e Objetivos */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h5 className="text-xs font-black uppercase text-indigo-300 flex items-center gap-1.5">
            🎯 Critérios Avaliados pelo Professor:
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {procCivilPracticalCase.criteriosAvaliacao.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Entrega e Ações */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-indigo-500/30">
          <div className="text-xs text-slate-300">
            📤 <strong>Entrega:</strong> Enviar um único vídeo ao professor (3 a 5 min), contendo as 7 respostas e o desafio final com fala clara e organizada.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPracticalScript}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold border border-indigo-500/40 cursor-pointer transition-colors"
            >
              {copiedCase ? '✓ Roteiro Copiado' : 'Copiar Roteiro'}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Olá Professor! Segue minha atividade prática de Direito Processual Civil — Aula 2 (Atos Processuais: Caso Maria x João):\n\nAcabei de gravar o vídeo respondendo às 7 perguntas e ao desafio final oral.\n\nAluno(s): Eduardo Mateus e Pedro Henrique.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar ao Professor via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Checklist de Conclusão */}
      <section className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Checklist de Conclusão da Aula 2 (Processo Civil)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {Object.values(checklist).filter(Boolean).length}/4 Etapas
          </span>
        </div>

        <div className="space-y-2 text-xs font-semibold">
          {[
            { id: 'pc2_teoria', label: 'Li todo o texto teórico sobre conceito, forma, tempo, prazos e preclusão dos Atos Processuais' },
            { id: 'pc2_video', label: 'Assisti à Vídeo Aula completa no YouTube (Prof. Especialista)' },
            { id: 'pc2_questoes', label: 'Resolvi os 20 exercícios gabaritados de fixação' },
            { id: 'pc2_pratico', label: 'Preparei e gravei o vídeo do Caso Prático Maria x João para o professor' },
          ].map((item) => (
            <label
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                checklist[item.id]
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <input
                type="checkbox"
                checked={!!checklist[item.id]}
                onChange={() => {}}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setActiveTab('questoes')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Ir para as 20 Questões Gabaritadas</span>
          </button>

          <button
            onClick={handleMarkAsCompleted}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-2 ${
              isLessonCompleted
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{isLessonCompleted ? '✓ Aula 2 Marcada como Concluída' : 'Marcar Aula 2 como Concluída'}</span>
          </button>
        </div>
      </section>
    </article>
  );
};
