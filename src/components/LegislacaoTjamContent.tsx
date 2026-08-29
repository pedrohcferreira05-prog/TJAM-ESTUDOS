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
  FileCheck,
  Building2,
  Users,
  Compass
} from 'lucide-react';

interface LegislacaoTjamContentProps {
  isDarkMode: boolean;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateTab: (tab: 'video' | 'questoes' | 'flashcards' | 'mapa' | 'resumo') => void;
}

export const LegislacaoTjamContent: React.FC<LegislacaoTjamContentProps> = ({
  isDarkMode,
  isLessonCompleted,
  onToggleComplete,
  onNavigateTab,
}) => {
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
            <span className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-600 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-purple-500/20">
              <Landmark className="w-3.5 h-3.5" /> LEGISLAÇÃO DO TJAM • AULA 1 DE HOJE (1 de 3)
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider border border-amber-500/20">
              LC Nº 261/2023
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
              className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>20 Questões</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <span className="text-purple-600 dark:text-purple-400">🏛️</span> Estrutura do Poder Judiciário do Amazonas
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            Estudo aprofundado da organização judiciária estadual com base na <strong>Lei Complementar nº 261/2023</strong> (nova Lei de Organização Judiciária do Estado do Amazonas), consolidada com as alterações mais recentes de 2024, 2025 e 2026.
          </p>
        </div>

        {/* Quick Highlights Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
            <div className="text-[11px] font-black uppercase text-purple-700 dark:text-purple-300">Norma Base</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">LC nº 261/2023</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
            <div className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300">Sede & Jurisdição</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Manaus / Todo o Estado</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <div className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-300">Órgãos do Art. 3º</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">7 Órgãos Integrantes</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <div className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-300">Simulado do Dia</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">20 Questões Gabaritadas</div>
          </div>
        </div>
      </header>

      {/* SECTION 1: O QUE É A ORGANIZAÇÃO JUDICIÁRIA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            1
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            O que é a Organização Judiciária?
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          A <strong>Lei Complementar Estadual nº 261/2023</strong> é a espinha dorsal de toda a estrutura do Tribunal de Justiça do Amazonas. Ela disciplina quatro matérias fundamentais:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Divisão e Organização Judiciária</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Delimitação territorial das Comarcas, Termos Judiciários, Varas especializadas e Juizados em todo o Estado.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Organização da Magistratura</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Ingresso na carreira, direitos, deveres, garantias, critérios de promoção por antiguidade e merecimento e remoções.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Serviços Auxiliares da Justiça</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Estrutura das secretarias, gabinetes, cartórios judiciais, oficiais de justiça, assistentes judiciários e analistas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Serviços Notariais e de Registro</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Estrutura das serventias extrajudiciais (cartórios de notas, registro civil, imóveis e protesto) e sua fiscalização.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ÓRGÃOS DO PODER JUDICIÁRIO DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Órgãos do Poder Judiciário do Amazonas
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          De acordo com o <strong>art. 3º da LC nº 261/2023</strong>, integram expressamente o Poder Judiciário do Estado:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: 'I', title: 'Tribunal de Justiça (TJAM)', desc: 'Órgão de cúpula estadual com competência recursal e originária' },
            { num: 'II', title: 'Turmas Recursais dos Juizados Especiais', desc: 'Julgam recursos de decisões dos Juizados Cíveis e Criminais' },
            { num: 'III', title: 'Tribunais do Júri', desc: 'Competência constitucional para julgar crimes dolosos contra a vida' },
            { num: 'IV', title: 'Juízes de Direito', desc: 'Magistrados titulares vitalícios que atuam nas Varas das Comarcas' },
            { num: 'V', title: 'Juízes Substitutos de Carreira', desc: 'Magistrados em início de carreira que atuam em substituição' },
            { num: 'VI', title: 'Auditoria Militar e Conselhos', desc: 'Julgamento dos crimes militares estaduais cometidos por PM e CBM' },
            { num: 'VII', title: 'Juízes de Paz', desc: 'Competência para celebração de casamentos e conciliação prévia' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  Inciso {item.num}
                </span>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mt-1.5">
                  {item.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Callout: Pegadinha de Prova FGV */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-black uppercase tracking-wide text-amber-700 dark:text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>📌 Atenção para a Prova da FGV!</span>
          </div>
          <p className="leading-relaxed">
            O <strong>Ministério Público</strong> (Promotores e Procuradores), a <strong>Defensoria Pública</strong>, a <strong>Polícia Civil/Militar</strong> e o <strong>Governador do Estado</strong> <u>NÃO</u> integram o Poder Judiciário. Eles são funções essenciais à Justiça ou compõem o Poder Executivo. Grave os 7 incisos do Art. 3º!
          </p>
        </div>
      </section>

      {/* SECTION 3: TRIBUNAL DE JUSTIÇA DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            3
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Tribunal de Justiça do Amazonas (TJAM)
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          O <strong>Tribunal de Justiça do Estado do Amazonas</strong> é o órgão máximo do Poder Judiciário estadual:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-1.5">
            <div className="text-xs font-black uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Sede Oficial
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Sede na <strong>Capital do Estado, Manaus</strong> (Edifício Arnoldo Péres, Aleixo).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 space-y-1.5">
            <div className="text-xs font-black uppercase text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Alcance da Jurisdição
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Possui jurisdição plena em <strong>todo o território do Estado do Amazonas</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1.5">
            <div className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Regimento Interno
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Composição, funcionamento e competências regulamentados pelo <strong>Regimento Interno do TJAM</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: ÓRGÃOS DO TRIBUNAL */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            4
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Órgãos Internos do Tribunal de Justiça
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          O Tribunal de Justiça possui órgãos colegiados de julgamento e órgãos de cúpula administrativa:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" /> Órgãos Jurisdicionais (Colegiados)
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span><strong>Tribunal Pleno:</strong> Reunião de todos os Desembargadores do Tribunal para deliberações administrativas máximas e julgamentos originários de relevância constitucional.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span><strong>Câmaras Reunidas:</strong> Colegiado intermediário competente para determinadas ações rescisórias, mandados de segurança e conflitos de competência.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span><strong>Câmaras Isoladas:</strong> Fracionadas por matéria:
                  <ul className="pl-4 pt-1 space-y-1 text-slate-500 dark:text-slate-400">
                    <li>— <strong>3 Câmaras Cíveis:</strong> 1ª, 2ª e 3ª Câmaras Cíveis.</li>
                    <li>— <strong>2 Câmaras Criminais:</strong> 1ª e 2ª Câmaras Criminais.</li>
                  </ul>
                </span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" /> Órgãos Diretivos e Administrativos
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span><strong>Presidência:</strong> Representação legal do Poder Judiciário, chefia administrativa superior, execução orçamentária e atos de gestão geral.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span><strong>Vice-Presidência:</strong> Substituição do Presidente e atribuições regimentais específicas, como admissibilidade de recursos aos Tribunais Superiores (STJ e STF).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <span><strong>Corregedoria-Geral de Justiça (CGJ):</strong> Órgão de correição, fiscalização disciplinar, padronização e orientação dos serviços judiciais de 1º grau e dos cartórios extrajudiciais.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMARCAS E TERMOS JUDICIÁRIOS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            5
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Comarcas e Termos Judiciários
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          Para fins de administração da Justiça, o território do Amazonas é dividido em <strong>Comarcas</strong> e <strong>Termos Judiciários</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-xs text-purple-700 dark:text-purple-300 uppercase tracking-wider">
              Divisão Judiciária Territorial
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              O Estado do Amazonas possui particularidades geográficas únicas (grandes extensões territoriais e transporte hidroviário). Por isso, a criação, alteração ou extinção de comarcas obedece a requisitos técnicos rigorosos fixados na LC nº 261/2023.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-xs text-purple-700 dark:text-purple-300 uppercase tracking-wider">
              Critérios Legais de Classificação
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A organização e entrâncias levam em consideração: <strong>número de habitantes</strong>, <strong>número de eleitores</strong>, <strong>receita tributária</strong> e <strong>movimento forense médio</strong> dos últimos anos.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMPETÊNCIAS DO TJAM */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            6
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Competências do Tribunal de Justiça do Amazonas
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          As competências do TJAM estão definidas em três fontes normativas complementares:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="text-xs font-black uppercase text-purple-600">1. Constituição Estadual</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Competências originárias privativas, controle de constitucionalidade e prerrogativas de foro.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="text-xs font-black uppercase text-purple-600">2. LC nº 261/2023</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Estrutura orgânica, distribuição judiciária e organização dos serviços auxiliares.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="text-xs font-black uppercase text-purple-600">3. Regimento Interno</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Processamento interno, distribuição de processos, prazos de relatoria e regras de sessão.
            </p>
          </div>
        </div>
      </section>

      {/* RESUMO PARA MEMORIZAR & ESQUEMA VISUAL */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/20 via-slate-900/10 to-purple-900/20 border border-purple-500/30 space-y-4">
        <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-black text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>🧠 Resumo para Memorizar (FGV)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h5 className="font-extrabold text-slate-900 dark:text-white">🏢 TJAM</h5>
            <p className="text-slate-600 dark:text-slate-300">
              Sede na capital Manaus e jurisdição em todo o Estado do Amazonas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h5 className="font-extrabold text-slate-900 dark:text-white">⚖️ Órgãos do Tribunal</h5>
            <p className="text-slate-600 dark:text-slate-300">
              Tribunal Pleno, Câmaras Reunidas, Câmaras Isoladas (Cíveis e Criminais), Presidência, Vice e Corregedoria.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h5 className="font-extrabold text-slate-900 dark:text-white">🏛️ Poder Judiciário do AM</h5>
            <p className="text-slate-600 dark:text-slate-300">
              TJAM, Turmas Recursais, Tribunais do Júri, Juízes de Direito, Juízes Substitutos, Auditoria Militar e Juízes de Paz.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ PRECISA DOMINAR HOJE */}
      <section className="space-y-3">
        <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>🎯 O que você precisa dominar hoje:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            '1. O que disciplina a Lei Complementar nº 261/2023;',
            '2. Quais são os órgãos que integram o Poder Judiciário do Amazonas;',
            '3. Onde fica a sede do TJAM e qual a sua jurisdição;',
            '4. A diferença entre Tribunal Pleno, Câmaras Reunidas e Isoladas;',
            '5. A função da Presidência, Vice-Presidência e Corregedoria;',
            '6. Como se divide territorialmente a administração da Justiça (Comarcas e Termos).',
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2 font-medium"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Official Link to LC 261/2023 */}
      <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            Consulte o texto integral da <strong>Lei Complementar nº 261/2023</strong> no portal de legislação do TJAM:
          </span>
        </div>
        <a
          href="https://consultasaj.tjam.jus.br/cdad/abrirConsultaAtos.do?cdAto=60741"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <span>Abrir LC 261/2023</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Action Footer */}
      <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
          <span>Resolver as 20 Questões da Aula</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </article>
  );
};
