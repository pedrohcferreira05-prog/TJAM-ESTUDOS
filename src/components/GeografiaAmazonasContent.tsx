import React from 'react';
import {
  Trees,
  Compass,
  Mountain,
  CloudRain,
  Waves,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Video,
  Globe2,
  Layers,
  MapPin
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
              <Trees className="w-3.5 h-3.5" /> GEOGRAFIA DO AMAZONAS • AULA 2
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-black text-xs uppercase tracking-wider border border-teal-500/20">
              Aspectos Físicos
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
            <span className="text-emerald-600 dark:text-emerald-400">🌳</span> Aspectos Físicos do Estado do Amazonas
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            Domínio completo da geografia física para o Concurso do TJAM: localização estratégica, fronteiras internacionais e interestaduais, relevo de baixa altitude, dinâmica climática equatorial, grandiosa bacia hidrográfica e as 3 formações da Floresta Amazônica.
          </p>
        </div>

        {/* Quick Highlights Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <div className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-300">Território</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Maior Estado do Brasil</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60">
            <div className="text-[11px] font-black uppercase text-teal-700 dark:text-teal-300">Fronteira Internacional</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">3 Países (VEN, COL, PER)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
            <div className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300">Clima Dominante</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Equatorial Úmido</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <div className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-300">Floresta</div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">Terra Firme, Várzea, Igapó</div>
          </div>
        </div>
      </header>

      {/* SECTION 1: LOCALIZAÇÃO E FRONTEIRAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            1
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Localização e Fronteiras
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          O <strong>Amazonas</strong> está localizado na <strong>Região Norte do Brasil</strong> e é o <strong>maior estado brasileiro em extensão territorial</strong> (mais de 1,5 milhão de km²).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Divisas Interestaduais */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Fronteiras Nacionais (5 Estados)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span>Roraima (RR)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Norte</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span>Pará (PA)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Leste</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span>Mato Grosso (MT)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Sudeste</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span>Rondônia (RO)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Sul</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span>Acre (AC)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Sudoeste</span>
              </li>
            </ul>
          </div>

          {/* Fronteiras Internacionais */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>Fronteiras Internacionais (3 Países)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold">🇻🇪 Venezuela</span>
                <span className="text-[10px] font-black text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded">Norte</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold">🇨🇴 Colômbia</span>
                <span className="text-[10px] font-black text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded">Noroeste</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold">🇵🇪 Peru</span>
                <span className="text-[10px] font-black text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded">Oeste / Sudoeste</span>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
              <strong>📌 Para a prova:</strong> O Amazonas faz fronteira com exatamente <strong>três países</strong>: Venezuela, Colômbia e Peru. Não faz divisa com Bolívia nem Guianas!
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: RELEVO */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Relevo e Topografia
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          Predominam formas de relevo de <strong>baixa altitude</strong>, fortemente influenciadas e esculpidas pela dinâmica dos rios:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="text-xs font-black uppercase text-emerald-600 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Planícies
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Faixas de sedimentação recente ao longo das calhas dos grandes rios sujeitas a inundações.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="text-xs font-black uppercase text-emerald-600 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Depressões
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Áreas rebaixadas por processos erosivos (Depressão Marginal Norte e Sul-Amazônica).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="text-xs font-black uppercase text-emerald-600 flex items-center gap-1.5">
              <Mountain className="w-4 h-4" /> Baixos Planaltos
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Platôs e terrenos residuais levemente ondulados que sustentam a maior parte da mata de terra firme.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          ⛰️ <strong>Destaque Altimétrico:</strong> Embora predomine a baixa altitude, o ponto mais alto do Brasil está no Amazonas: o <strong>Pico da Neblina (2.995m)</strong>, situado na Serra do Imeri (Santa Isabel do Rio Negro), junto à fronteira com a Venezuela.
        </div>
      </section>

      {/* SECTION 3: CLIMA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            3
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Clima Equatorial
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          O clima predominante é o <strong>Equatorial Úmido</strong> (tipo Af/Am na classificação de Köppen), com as seguintes características fundamentais:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
            <div className="text-[11px] font-black uppercase text-rose-700 dark:text-rose-300">Temperaturas</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Elevadas o ano todo (médias de 25°C a 28°C)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50">
            <div className="text-[11px] font-black uppercase text-sky-700 dark:text-sky-300">Umidade Relativa</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Altíssima (frequentemente acima de 80%)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
            <div className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300">Pluviosidade</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Grande volume de chuvas regulares</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/50">
            <div className="text-[11px] font-black uppercase text-teal-700 dark:text-teal-300">Amplitude Térmica</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Pequena variação térmica ao longo do ano</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 text-xs text-sky-900 dark:text-sky-200 flex items-center gap-2.5">
          <CloudRain className="w-5 h-5 text-sky-500 shrink-0" />
          <span>🌧️ <strong>Importância das Chuvas:</strong> As chuvas são vitais para o regime hidrológico dos rios, para a cheia das várzeas e para a manutenção da evapotranspiração da Floresta Amazônica.</span>
        </div>
      </section>

      {/* SECTION 4: HIDROGRAFIA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            4
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Hidrografia e Bacia do Rio Amazonas
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          O Amazonas possui uma das <strong>maiores e mais densas redes hidrográficas do planeta</strong>. O principal curso d\'água é o <strong>Rio Amazonas</strong>, acompanhado por afluentes gigantescos.
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Waves className="w-4 h-4 text-sky-500" />
            <span>Principais Rios do Amazonas</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {['Rio Negro', 'Rio Solimões', 'Rio Madeira', 'Rio Purus', 'Rio Juruá', 'Rio Japurá', 'Rio Içá', 'Rio Amazonas'].map((rio, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-center text-slate-800 dark:text-slate-200">
                🌊 {rio}
              </div>
            ))}
          </div>
        </div>

        {/* Encontro das Águas Highlight */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950 text-white border border-amber-500/30 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>📌 Encontro das Águas (Manaus)</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Em frente a Manaus, ocorre a confluência do <strong>Rio Negro</strong> (águas escuras, ácidas e lentas) com o <strong>Rio Solimões</strong> (águas barrentas, ricas em sedimentos e mais velozes). Eles correm lado a lado sem se misturar por mais de 6 km devido a diferenças de <strong>densidade, temperatura e velocidade</strong>, formando oficialmente o <strong>Rio Amazonas</strong>.
          </p>
        </div>
      </section>

      {/* SECTION 5 & 6: VEGETAÇÃO E AS 3 FORMAÇÕES */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            5
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Vegetação: As Três Principais Formações da Floresta
          </h2>
        </div>

        <p className="text-sm font-normal text-slate-700 dark:text-slate-300">
          A principal cobertura vegetal é a <strong>Floresta Amazônica</strong> (alta biodiversidade, estratificação densa e adaptação ao calor e umidade). Suas formações dividem-se em relação ao nível dos rios:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Terra Firme */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 space-y-2">
            <div className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>Mata de Terra Firme</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Localizada nas áreas mais altas do relevo. <strong>NUNCA ou raramente é inundada</strong> pelas cheias normais dos rios. Árvores de grande porte e maior cobertura territorial.
            </p>
            <div className="text-[10px] font-black uppercase px-2 py-1 rounded bg-emerald-600 text-white inline-block">
              Não alaga normalmente
            </div>
          </div>

          {/* Várzea */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 space-y-2">
            <div className="text-xs font-black uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-amber-600" />
              <span>Mata de Várzea</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Localizada em terrenos baixos adjacentes a rios de águas brancas/barrentas. Sofre <strong>inundações periódicas (sazonais)</strong> nas cheias. Solos enriquecidos por nutrientes.
            </p>
            <div className="text-[10px] font-black uppercase px-2 py-1 rounded bg-amber-600 text-white inline-block">
              Alaga periodicamente
            </div>
          </div>

          {/* Igapó */}
          <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-300 dark:border-sky-800/60 space-y-2">
            <div className="text-xs font-black uppercase text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-sky-600" />
              <span>Mata de Igapó</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Situada nas margens de rios de águas escuras ou claras. <strong>Permanece alagada permanentemente</strong> ou por longos períodos do ano. Vegetação adaptada à água (vitória-régia).
            </p>
            <div className="text-[10px] font-black uppercase px-2 py-1 rounded bg-sky-600 text-white inline-block">
              Alagada permanentemente
            </div>
          </div>
        </div>

        {/* Mnemônico de Memorização */}
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2 text-xs">
          <div className="font-black text-purple-700 dark:text-purple-300 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>🧠 Mnemônico Rápido de Memorização</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-bold text-slate-800 dark:text-slate-200">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800">
              🌱 <strong>Terra Firme</strong> → NÃO alaga
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800">
              🌊 <strong>Várzea</strong> → Alaga PERIODICAMENTE
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800">
              🪷 <strong>Igapó</strong> → Alaga SEMPRE / MAIOR TEMPO
            </div>
          </div>
        </div>
      </section>

      {/* RESUMO GERAL PARA O CONCURSO */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900/20 via-slate-900/10 to-teal-900/20 border border-emerald-500/30 space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-black text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>🎯 Resumo Estruturado para o TJAM</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white">📍 Localização</div>
            <p className="text-slate-600 dark:text-slate-300">Região Norte, maior estado do Brasil em extensão territorial.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white">🌐 Fronteiras Internacionais</div>
            <p className="text-slate-600 dark:text-slate-300">3 Países: Venezuela (N), Colômbia (NO) e Peru (O/SO).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white">⛰️ Relevo</div>
            <p className="text-slate-600 dark:text-slate-300">Baixa altitude (planícies, depressões e baixos planaltos).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white">☀️ Clima</div>
            <p className="text-slate-600 dark:text-slate-300">Equatorial Úmido (quente, úmido e muito chuvoso).</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white">🌊 Encontro das Águas</div>
            <p className="text-slate-600 dark:text-slate-300">Rio Negro + Rio Solimões formam o Rio Amazonas em Manaus.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white">🌳 3 Matas</div>
            <p className="text-slate-600 dark:text-slate-300">Terra Firme (seca), Várzea (periódica), Igapó (permanente).</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs text-center">
          📌 Rota de Memorização: LOCALIZAÇÃO → RELEVO → CLIMA → HIDROGRAFIA → VEGETAÇÃO
        </div>
      </section>

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
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <span>Resolver as 20 Questões da Aula</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </article>
  );
};
