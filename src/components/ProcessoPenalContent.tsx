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
  Copy
} from 'lucide-react';
import { procPenalLessonSummaryPoints, procPenalPracticalCase } from '../data/processoPenalLessonData';

interface ProcessoPenalContentProps {
  isDarkMode: boolean;
  checklist?: Record<string, boolean>;
  toggleChecklist?: (id: string) => void;
  isLessonCompleted: boolean;
  handleMarkAsCompleted?: () => void;
  onToggleComplete?: () => void;
  setActiveTab?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProcessoPenalContent: React.FC<ProcessoPenalContentProps> = ({
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

  const handleCopyQuestions = () => {
    const text = `EXERCÍCIO PRÁTICO — PROCESSO PENAL (Aula 1 - Inquérito Policial)\nAtividade: "Você é o investigador"\n\nCaso: ${procPenalPracticalCase.caso}\n\nPerguntas para responder no vídeo:\n${procPenalPracticalCase.perguntas.join('\n')}\n\nDesafio de comunicação:\n${procPenalPracticalCase.desafioOral}`;
    navigator.clipboard.writeText(text);
    setCopiedCase(true);
    setTimeout(() => setCopiedCase(false), 2500);
  };

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-emerald-950/80 border border-amber-500/30 text-white space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            Processo Penal • 1ª Aula de Hoje
          </span>
          <span className="text-xs font-bold text-slate-400">
            Decreto-Lei nº 3.689/1941 (CPP) • Foco Concurso TJAM
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ⚖️ Inquérito Policial: Conceito, Finalidade e Características
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            O inquérito policial (IP) é o instrumento preparatório e investigativo utilizado pela polícia judiciária para apurar a infração penal e sua autoria, servindo de alicerce indispensável à atuação do Ministério Público ou do ofendido.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('video')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all cursor-pointer shadow-md"
          >
            <Video className="w-4 h-4" />
            <span>Assistir Vídeo Aula (YouTube Live)</span>
          </button>

          <button
            onClick={() => setActiveTab('questoes')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold border border-amber-500/40 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Resolver as 20 Questões Gabaritadas</span>
          </button>

          <a
            href="https://www.youtube.com/live/LKC-WndRbEU?is=ywfl4QJ6usmqhyyv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold border border-slate-700 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Link do Vídeo</span>
          </a>
        </div>
      </div>

      {/* Destaque Principal: Definição Essencial */}
      <section className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border-2 border-amber-500/40 shadow-md">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 shrink-0 mt-0.5 font-black">
            📌
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Conceito Fundamental para o TJAM
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              Inquérito Policial = Investigação da Infração Penal + Indícios de Autoria.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 pt-0.5">
              O CPP atribui expressamente à polícia judiciária a função de apurar as infrações penais e sua autoria para fornecer justa causa à ação penal.
            </p>
          </div>
        </div>
      </section>

      {/* 1. FINALIDADE */}
      <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">1</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🎯 1. Finalidade do Inquérito Policial</span>
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          O principal objetivo é investigar o fato criminoso, buscando reunir elementos sólidos sobre:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>O que aconteceu:</strong> materialidade do crime.</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Como aconteceu:</strong> modus operandi da conduta.</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Quem pode ter praticado:</strong> indícios de autoria.</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Circunstâncias e provas:</strong> elementos relacionados ao fato.</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold text-center">
          📌 Memorize: Inquérito = Investigação preliminar para colher elementos informativos.
        </div>
      </section>

      {/* 2. QUEM CONDUZ */}
      <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">2</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>👮 2. Quem Conduz o Inquérito?</span>
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A investigação é realizada pela <strong>polícia judiciária</strong>, sob condução da <strong>autoridade policial</strong> (Delegado de Polícia), conforme a competência legal estabelecida no Art. 4º do CPP.
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <strong>Art. 4º do CPP:</strong> &ldquo;A polícia judiciária será exercida pelas autoridades policiais no território de suas respectivas circunscrições e terá por fim a apuração das infrações penais e da sua autoria.&rdquo;
        </div>
      </section>

      {/* 3. CARACTERÍSTICAS PRINCIPAIS */}
      <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">3</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🔎 3. Características Principais para Prova</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
              🔹 Administrativo
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              É um procedimento investigativo pré-processual realizado por órgão do Poder Executivo (Polícia Civil ou Federal), <strong>não é um processo judicial</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
              🔹 Investigativo
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Busca reunir elementos de informação sobre a infração penal e sua autoria para permitir o ajuizamento da ação penal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
              🔹 Escrito (Art. 9º CPP)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Todas as peças do inquérito policial são reduzidas a escrito ou datilografadas e rubricadas pela autoridade policial.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
              🔹 Dispensável
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              A ação penal pode ser proposta diretamente pelo MP ou querelante quando já existirem elementos suficientes para isso.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
              🔹 Sigiloso (Art. 20 CPP)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Pode haver sigilo necessário à investigação, respeitados os direitos da defesa e o acesso aos elementos já documentados (Súmula Vinculante 14).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
              🔹 Não é Sentença
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              O inquérito <strong>não condena nem absolve ninguém</strong>. Apenas o Poder Judiciário tem competência para julgar e condenar.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMO O INQUÉRITO PODE COMEÇAR */}
      <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">4</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🚨 4. Como o Inquérito Pode Começar? (Art. 5º CPP)</span>
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Nos crimes de <strong>ação pública incondicionada</strong>, o CPP prevê que o inquérito policial pode ser iniciado:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-slate-200">
            <strong>1. De ofício:</strong> pela própria autoridade policial ao tomar conhecimento da infração.
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-slate-200">
            <strong>2. Mediante requisição:</strong> da autoridade judiciária (juiz) ou do Ministério Público.
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-slate-200">
            <strong>3. Mediante requerimento:</strong> do ofendido (vítima) ou de quem possa representá-lo.
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          * Qualquer pessoa do povo que tenha conhecimento de uma infração de ação pública também pode comunicá-la à autoridade policial (notitia criminis).
        </p>

        {/* Atenção Especial */}
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-black text-rose-600 dark:text-rose-400 text-sm">
            <AlertTriangle className="w-4 h-4" /> ⚠️ Atenção Máxima — Pegadinha Clássica de Concurso:
          </div>
          <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>• <strong>Ação pública condicionada:</strong> o inquérito <u>NÃO PODE</u> ser iniciado sem a representação da vítima.</li>
            <li>• <strong>Ação penal privada:</strong> a autoridade policial somente pode proceder ao inquérito mediante requerimento de quem tenha legitimidade para propor a ação.</li>
          </ul>
        </div>
      </section>

      {/* 5. PROVIDÊNCIAS DO ART. 6º */}
      <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">5</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>📝 5. O que a Autoridade Policial Pode Fazer? (Art. 6º do CPP)</span>
          </h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Entre as providências previstas no Art. 6º do Código de Processo Penal estão:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Preservar o local do crime</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Apreender objetos relacionados (após peritos)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Colher provas pertinentes</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Ouvir o ofendido (vítima)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Interrogar e ouvir o indiciado</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Realizar reconhecimento de pessoas e coisas</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Realizar acareações</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Determinar perícias e exame de corpo de delito</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Identificar o indiciado</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Investigar circunstâncias relacionadas ao fato</span>
          </div>
        </div>
      </section>

      {/* 6. PRAZOS DO CPP */}
      <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">6</span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>⏰ 6. Prazo — Regra Geral do CPP (Art. 10)</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-black">
                <th className="py-2.5 px-4">Situação do Indiciado</th>
                <th className="py-2.5 px-4">Prazo Legal</th>
                <th className="py-2.5 px-4">Termo Inicial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
              <tr className="bg-rose-500/5">
                <td className="py-3 px-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <strong>Indiciado PRESO</strong>
                </td>
                <td className="py-3 px-4 font-black text-rose-600 dark:text-rose-400 text-sm">10 dias</td>
                <td className="py-3 px-4 text-slate-500">Contados a partir do dia em que se executar a ordem de prisão preventiva.</td>
              </tr>
              <tr className="bg-emerald-500/5">
                <td className="py-3 px-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <strong>Indiciado SOLTO</strong>
                </td>
                <td className="py-3 px-4 font-black text-emerald-600 dark:text-emerald-400 text-sm">30 dias</td>
                <td className="py-3 px-4 text-slate-500">Mediante fiança ou sem ela; prorrogável judicialmente se o fato for de difícil elucidação.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          ⚠️ Nota de Prova: Existem prazos especiais em outras leis (ex.: Lei de Drogas, crimes contra a economia popular, etc.), portanto esses são os prazos da regra geral do Código de Processo Penal.
        </p>
      </section>

      {/* 🧠 RESUMO PARA PROVA */}
      <section className="p-6 rounded-3xl bg-slate-900 text-white border border-amber-500/30 space-y-4 shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🧠</span>
          <h3 className="text-lg font-black text-amber-400">
            RESUMO PARA PROVA — INQUÉRITO POLICIAL
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            ➡️ <strong>Investiga:</strong> infração penal + autoria
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            ➡️ <strong>Condução:</strong> polícia judiciária (delegado)
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            ➡️ <strong>Natureza:</strong> administrativo e investigativo
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            ➡️ <strong>Forma:</strong> estritamente escrito (Art. 9º)
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            ➡️ <strong>Não é processo:</strong> sem contraditório pleno
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            ➡️ <strong>Não condena:</strong> não julga nem absolve
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            ➡️ <strong>Dispensável:</strong> justa causa dispensa IP
          </div>
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-600/40 text-rose-300">
            ➡️ <strong>Preso:</strong> 10 dias (improrrogável)
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-300">
            ➡️ <strong>Solto:</strong> 30 dias (prorrogável)
          </div>
        </div>

        <div className="pt-2 text-xs font-bold text-slate-400 border-t border-slate-800">
          Artigos mais importantes desta aula: <strong className="text-amber-300">Arts. 4º, 5º, 6º, 9º e 10 do CPP</strong>.
        </div>
      </section>

      {/* 🏠 EXERCÍCIO PRÁTICO: VOCÊ É O INVESTIGADOR */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-purple-950/80 border-2 border-indigo-500/40 text-white space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-300 block">
                Atividade Avaliativa Obrigatória
              </span>
              <h3 className="text-xl font-black text-white">
                EXERCÍCIO PRÁTICO — &ldquo;Você é o Investigador&rdquo;
              </h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" /> 3 a 5 minutos sugeridos
          </span>
        </div>

        {/* Descrição do Caso */}
        <div className="p-5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              📌 Caso Prático para Análise
            </span>
            <button
              onClick={handleCopyQuestions}
              className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCase ? 'Copiado!' : 'Copiar Roteiro'}</span>
            </button>
          </div>
          <blockquote className="text-sm sm:text-base font-semibold text-slate-200 italic border-l-4 border-indigo-400 pl-4 py-1 leading-relaxed">
            &ldquo;{procPenalPracticalCase.caso}&rdquo;
          </blockquote>
          <p className="text-xs text-indigo-200">
            🎥 <strong>Orientação:</strong> O aluno deverá gravar um vídeo e enviar ao professor, respondendo ao caso prático acima.
          </p>
        </div>

        {/* As 7 Perguntas */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Mic className="w-4 h-4 text-indigo-400" /> Perguntas para Responder no Vídeo:
          </h4>

          <div className="space-y-2 text-xs">
            {procPenalPracticalCase.perguntas.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <p className="font-bold text-slate-200">{p}</p>
                <input
                  type="text"
                  placeholder="Esboce sua resposta aqui como guia antes de gravar..."
                  value={videoAnswers[idx] || ''}
                  onChange={(e) => setVideoAnswers({ ...videoAnswers, [idx]: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desafio de Comunicação */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
            🗣️ Desafio de Comunicação Oral (Sem Ler!)
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-semibold">
            {procPenalPracticalCase.desafioOral}
          </p>
        </div>

        {/* Critérios de Avaliação */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h5 className="text-xs font-black uppercase text-indigo-300 flex items-center gap-1.5">
            🎯 Critérios Avaliados pelo Professor:
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300">
            {procPenalPracticalCase.criteriosAvaliacao.map((c, i) => (
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
            📤 <strong>Entrega:</strong> Gravar um único vídeo com toda a atividade e enviar ao professor.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyQuestions}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold border border-indigo-500/40 cursor-pointer transition-colors"
            >
              {copiedCase ? '✓ Roteiro Copiado' : 'Copiar Roteiro'}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Olá Professor! Segue minha atividade prática de Processo Penal — Aula 1 (Inquérito Policial: "Você é o Investigador"):\n\nCaso do João e as 7 respostas gravadas em vídeo.\n\nAluno(s): Eduardo Mateus e Pedro Henrique.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Atividade via WhatsApp</span>
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
              Checklist de Conclusão da Aula 1
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {Object.values(checklist).filter(Boolean).length}/4 Etapas
          </span>
        </div>

        <div className="space-y-2 text-xs font-semibold">
          {[
            { id: 'pp1_teoria', label: 'Li todo o texto teórico sobre conceito, finalidade e características do Inquérito Policial' },
            { id: 'pp1_video', label: 'Assisti à Vídeo Aula completa no YouTube' },
            { id: 'pp1_questoes', label: 'Resolvi as 20 questões gabaritadas de fixação' },
            { id: 'pp1_pratico', label: 'Preparei o roteiro e gravei a atividade prática "Você é o Investigador"' },
          ].map((item) => (
            <label
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                checklist[item.id]
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={!!checklist[item.id]}
                onChange={() => {}}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleMarkAsCompleted}
            className={`px-5 py-2.5 rounded-xl text-xs font-black shadow-md transition-all cursor-pointer ${
              isLessonCompleted
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950'
            }`}
          >
            {isLessonCompleted ? '✓ 1ª Aula Concluída no Sistema' : 'Marcar 1ª Aula como Concluída'}
          </button>

          <button
            onClick={() => setActiveTab('questoes')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            <span>Ir para as 20 Questões Gabaritadas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </article>
  );
};
