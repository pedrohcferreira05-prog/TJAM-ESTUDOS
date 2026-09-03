import React from 'react';
import {
  Trees,
  Users,
  Building2,
  Factory,
  Coins,
  Ship,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Video,
  Fish,
  Cpu,
  Bike,
  Compass,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface GeografiaAmazonasContentProps {
  isDarkMode: boolean;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateTab: (tab: 'video' | 'questoes' | 'flashcards' | 'mapa' | 'resumo') => void;
}

export const GeografiaAmazonasContent: React.FC<GeografiaAmazonasContentProps> = ({
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
            <span className="px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/20">
              <Trees className="w-3.5 h-3.5" /> GEOGRAFIA DO AMAZONAS • 2ª AULA DE HOJE
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-black text-xs uppercase tracking-wider border border-teal-500/20">
              Aspectos Humanos e Econômicos
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('video')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vídeo Aulas (1 e 2)</span>
            </button>
            <button
              onClick={() => onNavigateTab('questoes')}
              className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>20 Questões TJAM</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <span className="text-emerald-600 dark:text-emerald-400">🌎</span> Aspectos Humanos e Econômicos do Amazonas
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            Preparação focada no TJAM: concentração demográfica em Manaus, povoamento do interior, Zona Franca e Polo Industrial (PIM), estrutura produtiva estadual, transporte fluvial e desafios socioambientais urbanos.
          </p>
        </div>

        {/* Quick Highlights Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <div className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-300">População</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Hiperconcentrada em Manaus</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
            <div className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300">Indústria / ZFM</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">PIM: Motos & Eletrônicos</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60">
            <div className="text-[11px] font-black uppercase text-teal-700 dark:text-teal-300">Transporte Chave</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Fluvial (Rios Navegáveis)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <div className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-300">Interior</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Disperso: Extrativismo & Pesca</div>
          </div>
        </div>
      </header>

      {/* SECTION 1: POPULAÇÃO DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            1
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            População do Amazonas
          </h2>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A distribuição demográfica do Estado do Amazonas é caracterizada por uma <strong>acentuada assimetria espacial</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">
              <Building2 className="w-4 h-4" />
              <span>Forte Concentração em Manaus</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mais de <strong>50% da população total do Estado</strong> reside na capital (Manaus). É uma das maiores concentrações urbanas relativas do país, atuando como um poderoso polo de atração migratória.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-extrabold text-sm">
              <Compass className="w-4 h-4" />
              <span>Interior Disperso e Ribeirinho</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              No interior, a população apresenta <strong>distribuição dispersa e baixa densidade demográfica</strong>. Os núcleos urbanos, vilas e comunidades organizam-se linearmente ao longo dos rios.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs space-y-1">
          <p>
            • <strong>Rios como Vias de Comunicação:</strong> A ocupação do território esteve historicamente atrelada aos rios, que funcionam como os canais naturais de circulação, povoamento e trocas mercantis.
          </p>
          <p>
            • <strong>Diversidade Sociocultural:</strong> O Amazonas possui uma rica diversidade de povos indígenas, comunidades ribeirinhas, quilombolas e extrativistas tradicionais.
          </p>
        </div>
      </section>

      {/* SECTION 2: MANAUS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Manaus: Metrópole Regional
          </h2>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Manaus desempenha papel central e hegemônico no Estado e em toda a Amazônia Ocidental:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-blue-600 dark:text-blue-400 uppercase text-[10px]">Capital Política</span>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Sede administrativa do Governo Estadual, do Tribunal de Justiça (TJAM) e dos poderes públicos.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">Centro Urbano</span>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Principal aglomerado urbano e rede de serviços especializados de saúde, educação e lazer.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-purple-600 dark:text-purple-400 uppercase text-[10px]">Polo Econômico</span>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Maior concentração industrial (PIM), financeira e comercial, gerando a maior fatia do PIB estadual.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-black text-amber-600 dark:text-amber-400 uppercase text-[10px]">Hub Logístico</span>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Ponto nodal para a circulação de pessoas e cargas (porto hidroviário e aeroporto internacional).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: ZONA FRANCA E POLO INDUSTRIAL DE MANAUS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            3
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Factory className="w-5 h-5 text-purple-600" />
            Zona Franca de Manaus (ZFM) e Polo Industrial (PIM)
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300">
              Objetivo Estratégico da ZFM
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 text-[10px] font-black">
              Incentivos Fiscais
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Criada para <strong>estimular o desenvolvimento econômico da Amazônia Ocidental</strong>, atraindo indústrias, tecnologia e investimentos privados por meio de tratamento tributário diferenciado, promovendo a integração e a soberania nacional.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider">
            Principais Segmentos do Polo Industrial de Manaus (PIM):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Eletrônicos e Informática</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">TVs, celulares, computadores, semicondutores e placas lógicas.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <Bike className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Duas Rodas (Motocicletas)</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Principal polo fabricante de motocicletas e bicicletas do Brasil.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <Factory className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Eletrodomésticos</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Ar-condicionado, fornos de micro-ondas, som e bens de consumo.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Químico e Termoplásticos</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Resinas plásticas, concentrados de refrigerantes e cosméticos.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Metalúrgico</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Estamparia, peças de precisão e insumos de montagem.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <Trees className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Bens de Consumo Diversos</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Relógios, brinquedos, instrumentos musicais e embalagens.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ECONOMIA DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            4
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-600" />
            Estrutura Econômica do Amazonas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Indústria */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <Factory className="w-4 h-4 text-purple-600" />
              <span>Indústria (Setor Secundário)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Possui <strong>forte concentração em Manaus</strong>. É o maior gerador de riquezas e arrecadação do Estado, impulsionado pelas diretrizes tributárias da Zona Franca.
            </p>
          </div>

          {/* Extrativismo */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>Extrativismo (Vegetal e Mineral)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Vegetal:</strong> Madeira manejada, castanha-do-brasil, açaí, borracha, cacau nativo e óleos essenciais.<br />
              • <strong>Mineral:</strong> Exploração de petróleo e gás natural (Província de Urucu em Coari), cassiterita e potássio.
            </p>
          </div>

          {/* Agropecuária */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>Agropecuária</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ocorre prioritariamente em áreas com condições naturais e logísticas favoráveis. Tem <strong>importância percentualmente menor</strong> na economia estadual quando comparada ao pujante setor industrial de Manaus.
            </p>
          </div>

          {/* Pesca */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <Fish className="w-4 h-4 text-sky-600" />
              <span>Pesca Tradicional e Comercial</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Atividade primordial para a <strong>alimentação, segurança alimentar e renda</strong> de inúmeras comunidades ribeirinhas e municípios do interior (ex.: tambaqui, pirarucu manejado, jaraqui, tucunaré).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRANSPORTE FLUVIAL */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            5
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Ship className="w-5 h-5 text-teal-600" />
            Transporte e Integração Territorial
          </h2>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Devido à gigantesca extensão territorial e à densa malha hidrográfica, o <strong>transporte fluvial é a principal espinha dorsal</strong> do Estado do Amazonas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 space-y-1">
            <span className="font-extrabold text-teal-700 dark:text-teal-300 block uppercase text-[10px]">Pessoas</span>
            <p className="text-slate-600 dark:text-slate-300">Deslocamento regular de cidadãos entre comarcas, vilas e capital.</p>
          </div>
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 space-y-1">
            <span className="font-extrabold text-teal-700 dark:text-teal-300 block uppercase text-[10px]">Mercadorias</span>
            <p className="text-slate-600 dark:text-slate-300">Escoamento de produtos extrativistas e chegada de manufaturados.</p>
          </div>
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 space-y-1">
            <span className="font-extrabold text-teal-700 dark:text-teal-300 block uppercase text-[10px]">Abastecimento</span>
            <p className="text-slate-600 dark:text-slate-300">Transporte de combustíveis, remédios, maquinários e alimentos essenciais.</p>
          </div>
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 space-y-1">
            <span className="font-extrabold text-teal-700 dark:text-teal-300 block uppercase text-[10px]">Integração</span>
            <p className="text-slate-600 dark:text-slate-300">Conexão social, cultural e judiciária entre comunidades isoladas.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: IMPACTOS URBANOS E AMBIENTAIS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            6
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Impactos Urbanos e Ambientais
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-3 text-xs">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            O vertiginoso crescimento demográfico e urbano decorrente da industrialização gerou graves desafios socioespaciais:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60">
              <strong className="block text-rose-700 dark:text-rose-400 font-bold mb-1">Expansão Desordenada e Risco</strong>
              <p className="text-slate-600 dark:text-slate-300">Ocupação irregular de fundos de vale, encostas e margens de igarapés (APPs), sem pavimentação e em zonas de alagamento.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60">
              <strong className="block text-rose-700 dark:text-rose-400 font-bold mb-1">Déficit de Saneamento</strong>
              <p className="text-slate-600 dark:text-slate-300">Baixa cobertura de coleta e tratamento de esgoto, provocando a degradação e poluição das bacias de igarapés urbanos.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60">
              <strong className="block text-rose-700 dark:text-rose-400 font-bold mb-1">Resíduos Sólidos</strong>
              <p className="text-slate-600 dark:text-slate-300">Grande volume diário de lixo gerado e descarte incorreto que compromete canais fluviais e saúde pública.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60">
              <strong className="block text-rose-700 dark:text-rose-400 font-bold mb-1">Pressão sobre a Natureza</strong>
              <p className="text-slate-600 dark:text-slate-300">Desmatamento do entorno florestal de Manaus e fragmentação de habitats da fauna e flora nativas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: O QUE MAIS CAI NO TJAM */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10 border-2 border-emerald-500/30 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-sm uppercase tracking-wider">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>🎯 O que mais pode cair no TJAM — Decore Principalmente</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 block">Manaus</span>
            <p className="font-extrabold text-slate-900 dark:text-white">Principal centro econômico, demográfico e urbano.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-blue-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 block">Zona Franca</span>
            <p className="font-extrabold text-slate-900 dark:text-white">Estímulo ao desenvolvimento econômico e industrial.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-purple-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-400 block">Polo Industrial (PIM)</span>
            <p className="font-extrabold text-slate-900 dark:text-white">Principal concentração fabril (eletrônicos e motocicletas).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-teal-700 dark:text-teal-400 block">Rios</span>
            <p className="font-extrabold text-slate-900 dark:text-white">Transporte, abastecimento e integração territorial.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-amber-500/20 space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 block">Interior</span>
            <p className="font-extrabold text-slate-900 dark:text-white">População dispersa, extrativismo e pesca tradicional.</p>
          </div>
        </div>
      </section>

      {/* Completion Toggle & Next Actions */}
      <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onToggleComplete}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ Aula Concluída no Cronograma' : 'Marcar Aula como Concluída'}</span>
        </button>

        <button
          onClick={() => onNavigateTab('questoes')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-lg"
        >
          <span>Ir para as 20 Questões de Geografia</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </article>
  );
};
