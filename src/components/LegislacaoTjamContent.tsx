import React from 'react';
import {
  BookOpen,
  Landmark,
  Scale,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Video,
  Building2,
  Users,
  Compass,
  GraduationCap,
  Shield,
  FileText,
  MapPin,
  Briefcase
} from 'lucide-react';

interface LegislacaoTjamContentProps {
  isDarkMode?: boolean;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateTab: (tab: 'video' | 'questoes' | 'flashcards' | 'mapa' | 'resumo') => void;
}

export const LegislacaoTjamContent: React.FC<LegislacaoTjamContentProps> = ({
  isLessonCompleted,
  onToggleComplete,
  onNavigateTab,
}) => {
  return (
    <article className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white text-slate-800 shadow-sm space-y-10 leading-relaxed transition-all">
      {/* Header / Banner Principal */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-700 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-purple-500/20">
              <Landmark className="w-3.5 h-3.5" /> LEGISLAÇÃO DO TJAM • 1ª AULA DO PREPARATÓRIO
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-black text-xs uppercase tracking-wider border border-emerald-500/20">
              LC nº 261/2023 (Nova Organização Judiciária)
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 font-black text-xs uppercase tracking-wider border border-amber-500/20">
              Foco: Assistente Judiciário
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('video')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vídeo Aula</span>
            </button>
            <button
              onClick={() => onNavigateTab('questoes')}
              className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>20 Questões</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="text-purple-600">🏛️</span> Legislação Institucional do TJAM — Aula 1: Organização Judiciária do Estado do Amazonas
          </h1>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">
            Nível intermediário — foco em concurso para <strong>Assistente Judiciário</strong>. A legislação institucional do TJAM disciplina a estrutura, organização, funcionamento e competências do Poder Judiciário do Estado do Amazonas, com base na moderna <strong>Lei Complementar Estadual nº 261/2023</strong> (Nova Lei de Organização Judiciária).
          </p>
        </div>

        {/* Info Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
            <div className="text-[11px] font-black uppercase text-purple-700">Norma Central</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">LC Estadual nº 261/2023</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
            <div className="text-[11px] font-black uppercase text-blue-700">Órgão de Cúpula</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">Tribunal de Justiça (2ª Inst.)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] font-black uppercase text-emerald-700">Divisão Territorial</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">Comarcas & Termos Judiciários</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="text-[11px] font-black uppercase text-amber-700">Entrâncias</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">1ª (Interior) e 2ª (Capital)</div>
          </div>
        </div>
      </header>

      {/* SEÇÃO 1: O PODER JUDICIÁRIO DO ESTADO DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            1
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>O Poder Judiciário do Estado do Amazonas</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          O Poder Judiciário estadual integra a estrutura do Poder Judiciário brasileiro e exerce a <strong>função jurisdicional</strong> no âmbito do Estado do Amazonas.
        </p>

        <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
          <h3 className="font-bold text-sm text-purple-950 flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-600" />
            Fundamentos Constitucionais Essenciais (CF/88 e CE/89):
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Organização Própria:</strong> A Constituição Federal estabelece que os Estados organizarão sua Justiça, observando os princípios constitucionais gerais.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Competência dos Tribunais:</strong> Determinada pela Constituição do Estado, sendo a lei de organização judiciária de <strong>iniciativa privativa do Tribunal de Justiça</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Marco Legislativo Vigente:</strong> No Amazonas, essa matéria é disciplinada pela <strong>Lei Complementar Estadual nº 261, de 18 de dezembro de 2023</strong> (LC nº 261/2023).</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO 2: ORGANIZAÇÃO JUDICIÁRIA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Conceito e Finalidade da Organização Judiciária</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Organização judiciária é a forma como o Poder Judiciário é estruturado para desempenhar suas funções. Compreende o conjunto de normas que disciplinam:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" /> Órgãos e Unidades
            </div>
            <p className="text-slate-600">Criação, classificação e estrutura dos órgãos julgadores.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-600" /> Distribuição Territorial
            </div>
            <p className="text-slate-600">Divisão do território estadual em comarcas e termos judiciários.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" /> Competências
            </div>
            <p className="text-slate-600">Atribuições jurisdicionais e administrativas de cada órgão.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" /> Divisão em Comarcas
            </div>
            <p className="text-slate-600">Classificação em 1ª Entrância (interior) e 2ª Entrância (Capital).</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-600" /> Magistratura
            </div>
            <p className="text-slate-600">Ingresso, carreira, direitos, deveres e garantias dos juízes.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" /> Serviços Auxiliares
            </div>
            <p className="text-slate-600">Servidores, secretarias, gabinetes e apoio técnico-administrativo.</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: TRIBUNAL DE JUSTIÇA DO ESTADO DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            3
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Tribunal de Justiça do Estado do Amazonas (TJAM)</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          O <strong>Tribunal de Justiça do Estado do Amazonas (TJAM)</strong> é o órgão de cúpula do Poder Judiciário estadual:
        </p>

        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3 text-xs text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-blue-950">Características Institucionais:</h4>
              <p>• Possui <strong>sede na Capital (Manaus)</strong> e <strong>jurisdição em todo o território</strong> do Estado do Amazonas.</p>
              <p>• Exerce competências jurisdicionais originárias e recursais, além de competências administrativas.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-blue-950">Regimento Interno do TJAM:</h4>
              <p>• O funcionamento interno, a composição dos órgãos fracionários e os procedimentos regimentais são detalhados pelo <strong>Regimento Interno do TJAM</strong> (Resolução nº 62/2023).</p>
              <p>• Disciplina a ordem dos processos, sessões de julgamento e atribuições dos dirigentes (Presidente, Vice-Presidente e Corregedor-Geral).</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: ÓRGÃOS DO PODER JUDICIÁRIO (ART. 3º DA LC 261/2023) */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            4
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Órgãos do Poder Judiciário (Art. 3º da LC nº 261/2023)</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          De acordo com o art. 3º da LC nº 261/2023, integram e compõem a administração da Justiça no Estado do Amazonas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2">
            <span className="font-black text-purple-700 uppercase tracking-wider block">1. Tribunal de Justiça</span>
            <p className="text-slate-600">Órgão de cúpula estadual e 2ª Instância.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2">
            <span className="font-black text-purple-700 uppercase tracking-wider block">2. Turmas Recursais dos Juizados Especiais</span>
            <p className="text-slate-600">Competência recursal para decisões dos Juizados Especiais.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2">
            <span className="font-black text-purple-700 uppercase tracking-wider block">3. Tribunais do Júri</span>
            <p className="text-slate-600">Competência para o julgamento dos crimes dolosos contra a vida.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2">
            <span className="font-black text-purple-700 uppercase tracking-wider block">4. Juízes de Direito & Substitutos de Carreira</span>
            <p className="text-slate-600">Órgãos de primeiro grau de jurisdição atuantes nas comarcas.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2">
            <span className="font-black text-purple-700 uppercase tracking-wider block">5. Auditoria Militar e Conselhos de Justiça</span>
            <p className="text-slate-600">Justiça Militar estadual para processar e julgar os militares estaduais.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2">
            <span className="font-black text-purple-700 uppercase tracking-wider block">6. Juízes de Paz</span>
            <p className="text-slate-600">Competência para celebração de casamentos e conciliação preliminar.</p>
          </div>
        </div>

        {/* ALERTA CRÍTICO: REVOGAÇÃO DA LC 17/1997 */}
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-rose-950">
            <strong className="font-black uppercase tracking-wider text-rose-800">⚠️ Atenção Crítica para Concurso:</strong>
            <p>
              A <strong>Lei Complementar nº 261/2023 revogou expressamente a antiga Lei Complementar nº 17/1997</strong>.
              Em provas de concurso, questões desatualizadas podem fazer referência à lei anterior. Para a sua preparação atual e para o cargo de Assistente Judiciário, considere <u>sempre a LC nº 261/2023</u>.
            </p>
            <p className="font-bold text-rose-700">
              🚨 Ministério Público e Defensoria Pública NÃO são órgãos do Judiciário! São funções essenciais à Justiça.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: PRIMEIRO E SEGUNDO GRAUS DE JURISDIÇÃO */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            5
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Primeiro e Segundo Graus de Jurisdição</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs uppercase">
              1º Grau de Jurisdição
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">Porta de Entrada da Justiça</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Onde o processo judicial se inicia em regra. É composto pelas <strong>Varas Judiciais</strong>, Juizados Especiais e juízes atuantes nas comarcas do Estado, onde ocorre a instrução probatória e a primeira decisão de mérito.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 font-black text-xs uppercase">
              2º Grau de Jurisdição
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">Tribunal de Justiça (TJAM)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Constituído pelo <strong>Tribunal de Justiça</strong>, responsável pela revisão das decisões de primeiro grau mediante recursos (apelação, agravo, etc.) e pelo julgamento de processos de sua competência originária privativa.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: COMARCAS E DIVISÃO TERRITORIAL */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            6
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Comarcas, Termos Judiciários e Entrâncias</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Para fins de administração do Poder Judiciário, o território do Estado do Amazonas está dividido em <strong>Comarcas e Termos Judiciários</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-emerald-800 uppercase">Primeira Entrância</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">Interior</span>
            </div>
            <p className="text-slate-700">
              Corresponde às comarcas localizadas nos <strong>municípios do interior do Estado</strong> do Amazonas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-purple-800 uppercase">Segunda Entrância</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 font-bold text-[10px]">Capital</span>
            </div>
            <p className="text-slate-700">
              Corresponde à <strong>Capital do Estado (Comarca de Manaus)</strong>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
          <strong className="text-slate-900 block font-bold">Definições Legais:</strong>
          <p>• <strong>Comarca:</strong> Unidade territorial que delimita a área de atuação da Justiça estadual, podendo abranger um ou mais municípios contíguos.</p>
          <p>• <strong>Termo Judiciário:</strong> Fração territorial integrada a uma comarca para fins de administração judiciária.</p>
          <p>• <strong>Divisão Judiciária:</strong> Compreende a criação, alteração e extinção de unidades judiciárias, além de sua classificação e agrupamento.</p>
        </div>
      </section>

      {/* SEÇÃO 7 & 8: VARAS JUDICIAIS E JUÍZES DE DIREITO */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            7 e 8
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Varas Judiciais e Competência dos Juízes de Direito</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" /> Varas Judiciais
            </h4>
            <p className="text-slate-600 leading-relaxed">
              São unidades judiciárias destinadas ao <strong>processamento e julgamento</strong> das causas. Uma comarca pode ter uma vara única (comum no interior) ou diversas varas especializadas (como na Capital: Varas Cíveis, Criminais, de Família, Fazenda Pública, Júri, etc.).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" /> Juízes de Direito (1º Grau)
            </h4>
            <p className="text-slate-600 leading-relaxed">
              A competência dos juízes é fixada a partir de critérios objetivos: <strong>matéria, território, pessoa, natureza da causa</strong> e legislação específica de organização judiciária.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9: FORÇA PÚBLICA E SERVIÇOS AUXILIARES */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            9
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Auxílio da Força Pública e Serviços Auxiliares da Justiça</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <Shield className="w-4 h-4" /> Auxílio da Força Pública
            </div>
            <p className="text-slate-700 leading-relaxed">
              Para assegurar o cumprimento e a execução de seus atos e decisões, os órgãos judiciários <strong>podem requisitar o auxílio da força pública</strong>, tendo a autoridade responsável o <u>dever</u> de prestar auxílio.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
            <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
              <Users className="w-4 h-4" /> Serviços Auxiliares da Justiça
            </div>
            <p className="text-slate-700 leading-relaxed">
              Fornecem o suporte operacional, técnico e administrativo necessário ao desenvolvimento dos processos e à administração da Justiça (secretarias, gabinetes, atendimento e distribuição).
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 10: IMPORTÂNCIA PARA O ASSISTENTE JUDICIÁRIO */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/10 via-slate-50 to-indigo-900/10 border-2 border-purple-200 space-y-3">
        <div className="flex items-center gap-2 text-purple-900 font-black text-sm uppercase tracking-wider">
          <GraduationCap className="w-5 h-5 text-purple-600" />
          <span>Importância da Legislação Institucional para o Assistente Judiciário</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          O <strong>Assistente Judiciário</strong> atua diretamente na assessoria e suporte processual, auxiliando juízes ou unidades judiciárias. Compreender a estrutura do tribunal, as instâncias, as comarcas e as competências é essencial para a rotina de trabalho e é <strong>um dos temas mais cobrados na prova da FGV</strong>.
        </p>
      </section>

      {/* SEÇÃO 11: FONTES OFICIAIS E VÍDEO AULA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="text-slate-700 font-medium">
              Fonte oficial: <strong>LC nº 261/2023 — TJAM</strong>
            </span>
          </div>
          <a
            href="https://www.tjam.jus.br/index.php/administracao/legislacao-institucional-e-do-poder-judiciario"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Portal TJAM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="text-slate-700 font-medium">
              Vídeo aula recomendada no YouTube
            </span>
          </div>
          <a
            href="https://www.youtube.com/live/UnVOYgccCP0?is=KCy5Zzc2HssVw2Tc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-500 font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Assistir Aula</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Action Footer */}
      <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onToggleComplete}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all ${
            isLessonCompleted
              ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
        </button>

        <button
          onClick={() => onNavigateTab('questoes')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <span>Resolver as 20 Questões da 1ª Aula</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </article>
  );
};
