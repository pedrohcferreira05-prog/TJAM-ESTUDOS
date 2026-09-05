import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Hand,
  Compass,
  Smile,
  Activity,
  MapPin,
  HelpCircle,
  MessageSquare,
  BookOpen,
  Check
} from 'lucide-react';

interface LibrasContentProps {
  isDarkMode: boolean;
  isLessonCompleted: boolean;
  onToggleCompleted: () => void;
  onNavigateTab: (tab: 'video' | 'conteudo' | 'flashcards' | 'mapa' | 'questoes' | 'resumo') => void;
}

export const LibrasContent: React.FC<LibrasContentProps> = ({
  isDarkMode,
  isLessonCompleted,
  onToggleCompleted,
  onNavigateTab,
}) => {
  const [selectedParam, setSelectedParam] = useState<number>(0);
  const [activeTabSub, setActiveTabSub] = useState<'parametros' | 'gramatica' | 'pegadinhas'>('parametros');

  const parametros = [
    {
      id: 1,
      sigla: 'CM',
      nome: 'Configuração de Mão',
      icon: Hand,
      color: 'emerald',
      bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Formato da Mão',
      descricao: 'É a forma ou desenho que a mão assume durante a execução do sinal.',
      detalhes: 'Na Libras existem mais de 60 configurações de mão catalogadas, desde formatos baseados no alfabeto manual (mão em "A", em "B", em "L", em "V") até mãos abertas, em garra ou punho fechado.',
      exemplo: 'Ex: O sinal de "APRENDER" usa a mão abrindo e fechando na testa (formato específico da mão).'
    },
    {
      id: 2,
      sigla: 'PA',
      nome: 'Ponto de Articulação (Locação)',
      icon: MapPin,
      color: 'blue',
      bgLight: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'Local do Sinal',
      descricao: 'É o local exato onde o sinal é realizado, tocando o corpo ou no espaço neutro.',
      detalhes: 'Pode ser realizado na cabeça, testa, bochecha, boca, queixo, peito, braço ou no espaço neutro (o espaço no ar à frente do corpo do sinalizador, entre a cintura e a cabeça).',
      exemplo: 'Ex: O sinal de "SÁBADO" e o de "APRENDER" têm a mesma configuração de mão, mas "APRENDER" toca na testa e "SÁBADO" toca na boca!'
    },
    {
      id: 3,
      sigla: 'M',
      nome: 'Movimento',
      icon: Activity,
      color: 'amber',
      bgLight: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: 'Deslocamento',
      descricao: 'É a trajetória, forma e direção com que as mãos se movem durante o sinal.',
      detalhes: 'O movimento pode ser retilíneo, circular, para cima/baixo, para os lados, em zigue-zague, contínuo ou repetido. Existem também sinais sem movimento (estáticos).',
      exemplo: 'Ex: "TRABALHAR" tem movimento retilíneo para a frente e para trás com as mãos em "L".'
    },
    {
      id: 4,
      sigla: 'Or',
      nome: 'Orientação da Mão',
      icon: Compass,
      color: 'purple',
      bgLight: 'bg-purple-50 text-purple-700 border-purple-200',
      badge: 'Direção da Palma',
      descricao: 'Indica para onde a palma ou a ponta dos dedos estão direcionadas.',
      detalhes: 'A palma pode estar orientada para cima, para baixo, para a frente (interlocutor), para o corpo (sinalizador), para a direita ou para a esquerda. Crucial em verbos direcionais.',
      exemplo: 'Ex: No verbo "AJUDAR", se a palma e o movimento vão para você = "ME AJUDA"; se vão para o outro = "TE AJUDO".'
    },
    {
      id: 5,
      sigla: 'ENM',
      nome: 'Expressões Não Manuais',
      icon: Smile,
      color: 'rose',
      bgLight: 'bg-rose-50 text-rose-700 border-rose-200',
      badge: 'Face & Corpo',
      descricao: 'Expressões faciais, movimentos da cabeça e postura do tronco.',
      detalhes: 'Não são enfeite nem drama: exercem FUNÇÃO GRAMATICAL. Indicam interrogação (sobrancelhas franzidas/erguidas), negação (cabeça girando), intensidade (olhos arregalados) e adjetivação.',
      exemplo: 'Ex: Fazer o sinal de "CASA" com expressão facial neutra = "uma casa". Fazer com olhos arregalados e bochechas infladas = "uma casa enorme/mansão".'
    }
  ];

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Banner de Introdução da 3ª Aula */}
      <section
        className={`p-6 sm:p-7 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-sky-50/70 border-sky-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-sky-600 text-white shadow-sm">
              🤟 3ª Aula de Hoje • LIBRAS
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              Estrutura e Formação dos Sinais
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> Exercícios via WhatsApp
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
          Estrutura e Formação dos Sinais: Os 5 Parâmetros da Libras
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Depois de estudar o alfabeto manual, datilologia e sinais básicos, avançamos agora para o coração da linguística da Libras: <strong>como os sinais são formados</strong> a partir de 5 parâmetros elementares.
        </p>

        {/* Objetivos Rápidos */}
        <div className="mt-4 pt-4 border-t border-sky-200/60 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>Dominar a fórmula CM + PA + M + Or + ENM</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>Função gramatical das expressões faciais</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>Diferenciar CM (Formato) de Or (Direção)</span>
          </div>
        </div>
      </section>

      {/* Navegação Rápida entre Tópicos */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTabSub('parametros')}
          className={`flex-1 min-w-[150px] py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTabSub === 'parametros'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <Hand className="w-3.5 h-3.5" />
          <span>1. Os 5 Parâmetros (CM+PA+M+Or+ENM)</span>
        </button>

        <button
          onClick={() => setActiveTabSub('gramatica')}
          className={`flex-1 min-w-[150px] py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTabSub === 'gramatica'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          <span>2. Expressões Faciais & Gramática</span>
        </button>

        <button
          onClick={() => setActiveTabSub('pegadinhas')}
          className={`flex-1 min-w-[150px] py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTabSub === 'pegadinhas'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>3. Pegadinhas FGV & Libras ≠ Português</span>
        </button>
      </div>

      {/* 1. OS 5 PARÂMETROS DA LIBRAS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-sky-500 pl-3">
            1. ✋ Os 5 Parâmetros da Libras
          </h2>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
            Fórmula: CM + PA + M + Or + ENM
          </span>
        </div>

        <p className="text-sm">
          Os sinais não são desenhos aleatórios no ar: eles são formados pela combinação simultânea e coordenada de elementos estruturais chamados <strong>parâmetros linguísticos</strong> (análogos aos fonemas das línguas orais).
        </p>

        {/* Seletor Interativo dos 5 Parâmetros */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {parametros.map((p, idx) => {
            const Icon = p.icon;
            const isSel = selectedParam === idx;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedParam(idx)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  isSel
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-300/40'
                    : isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSel ? 'bg-white/20 text-white' : 'bg-sky-500/10 text-sky-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase">{p.sigla}</span>
                <span className="text-[10px] font-bold line-clamp-1">{p.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Card Detalhado do Parâmetro Selecionado */}
        {(() => {
          const curr = parametros[selectedParam];
          const Icon = curr.icon;
          return (
            <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Parâmetro #{curr.id} ({curr.sigla})
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {curr.nome}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-extrabold self-start sm:self-auto">
                  {curr.badge}
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white text-base">
                  {curr.descricao}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {curr.detalhes}
                </p>
                <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 text-sky-900 dark:text-sky-300 font-medium">
                  {curr.exemplo}
                </div>
              </div>
            </div>
          );
        })()}

        {/* 5 Parâmetros em Lista Detalhada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white font-black text-xs flex items-center justify-center">1</span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">1️⃣ Configuração de Mão (CM)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              É o formato que a mão assume durante a realização do sinal. Na datilologia, cada letra tem sua CM específica, e na sinalização corrente, as mãos adotam dezenas de formatos morfológicos.
            </p>
          </div>

          <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500 text-white font-black text-xs flex items-center justify-center">2</span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">2️⃣ Ponto de Articulação (PA)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              É o local onde o sinal é realizado: <strong>cabeça, rosto, tronco, braço, espaço neutro etc.</strong> O espaço neutro é a região livre no ar logo à frente do corpo do emissor.
            </p>
          </div>

          <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center">3</span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">3️⃣ Movimento (M)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              É a forma como a mão se movimenta: <strong>para cima/baixo, para os lados, circularmente, repetidamente etc.</strong> Há sinais com movimento direcional, retilíneo ou estáticos (sem movimento).
            </p>
          </div>

          <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-500 text-white font-black text-xs flex items-center justify-center">4</span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">4️⃣ Orientação da Mão (Or)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Indica <strong>para onde a palma ou os dedos estão direcionados</strong> (para cima, baixo, frente, para o próprio corpo ou para os lados). Essencial na concordância com pronomes e pessoas.
            </p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-rose-50/50 border-rose-200'}`}>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-black text-xs flex items-center justify-center">5</span>
            <h4 className="font-extrabold text-sm text-rose-900 dark:text-rose-300">5️⃣ Expressões Não Manuais (ENM)</h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Incluem <strong>expressões faciais, movimentos da cabeça e movimentos do corpo</strong>. Podem modificar o significado ou a estrutura sintática da mensagem. São o tom de voz e a pontuação da Libras.
          </p>
        </div>
      </section>

      {/* 2. POR QUE OS PARÂMETROS SÃO IMPORTANTES? */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-sky-500 pl-3">
          2. 🧩 Por que os Parâmetros são Importantes?
        </h2>
        <p className="text-sm">
          A alteração de um <strong>único parâmetro</strong> pode diferenciar completamente sinais na Libras.
        </p>
        <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-sky-50/60 border-sky-200'}`}>
          <p className="text-xs sm:text-sm font-bold text-sky-950 dark:text-sky-300">
            Por isso, ao aprender um sinal, não basta memorizar apenas o movimento!
          </p>
          <div className="mt-3 p-3 rounded-xl bg-sky-600 text-white font-mono font-black text-center text-xs sm:text-sm tracking-wide shadow-sm">
            👉 Formato + Local + Movimento + Orientação + Expressão
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Se você fizer a configuração correta e o movimento certo, mas errar o ponto de articulação (por exemplo, na testa em vez da boca) ou a orientação da palma, você estará pronunciando outra palavra ou dizendo algo incompreensível.
          </p>
        </div>
      </section>

      {/* 3. EXPRESSÕES FACIAIS & FUNÇÃO GRAMATICAL */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-sky-500 pl-3">
          3. 👤 Expressões Faciais e Não Manuais (ENM)
        </h2>
        <p className="text-sm">
          Na Libras, as expressões <strong>não são apenas "emoções"</strong> ou demonstrações teatrais.
        </p>
        <p className="text-sm">
          Elas exercem <strong>função gramatical decisiva</strong>, ajudando a indicar, por exemplo:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-bold text-center">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            ❓ Perguntas (Interrogação)
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            🚫 Negação (Cabeça/Cenho)
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            ✅ Afirmação
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            🔥 Grau de Intensidade
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            🎭 Emoções e Atitudes
          </div>
        </div>

        {/* Box de Atenção para Prova */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
          <h4 className="font-black text-amber-800 dark:text-amber-400 text-sm flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" /> 🎯 Atenção para a prova da FGV / TJAM:
          </h4>
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Expressões faciais e corporais <u>fazem parte da estrutura linguística e gramatical da Libras</u>.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Se uma questão afirmar que as expressões faciais são meros adereços facultativos ou sentimentos subjetivos, a alternativa está <strong>ERRADA</strong>.
          </p>
        </div>
      </section>

      {/* 4. SINAIS SEMELHANTES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-sky-500 pl-3">
          4. 🔄 Sinais Semelhantes (Pares Mínimos)
        </h2>
        <p className="text-sm">
          Alguns sinais podem apresentar movimentos ou configurações muito parecidas. Para diferenciá-los, é necessário observar todos os parâmetros.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-400">Exemplo 1: Ponto de Articulação</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">APRENDER vs. SÁBADO vs. LARANJA</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Possuem configuração de mão e movimento muito semelhantes (mão abrindo e fechando), mas:
            </p>
            <ul className="space-y-1 font-semibold text-slate-700 dark:text-slate-300">
              <li>• <strong>APRENDER:</strong> realizado na <u>testa</u>.</li>
              <li>• <strong>SÁBADO / LARANJA:</strong> realizado em frente à <u>boca</u>.</li>
            </ul>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">Exemplo 2: Orientação & Movimento</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">TRABALHAR vs. BRINCAR</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Ambos usam as duas mãos no espaço neutro, mas:
            </p>
            <ul className="space-y-1 font-semibold text-slate-700 dark:text-slate-300">
              <li>• <strong>TRABALHAR:</strong> mãos em "L", movimento alternado para frente e para trás.</li>
              <li>• <strong>BRINCAR:</strong> mãos em "Y", movimento giratório de punhos.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. LIBRAS É UMA LÍNGUA */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-l-4 border-sky-500 pl-3">
          5. 🗣️ Libras é uma Língua
        </h2>
        <p className="text-sm">
          A Libras <strong>não é simplesmente uma representação do português através das mãos</strong> (bimodalismo ou português sinalizado). Ela é uma língua natural completa com:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" /> Estrutura própria
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" /> Regras gramaticais
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" /> Vocabulário rico
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" /> Organização linguística
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-300 font-black text-xs text-center">
          📌 Portanto, lembre-se sempre: <strong>LIBRAS ≠ PORTUGUÊS SINALIZADO</strong>
        </div>
      </section>

      {/* 6. RESUMO PARA MEMORIZAR & PEGADINHA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mnemônico */}
        <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-sky-50/50 border-sky-200'}`}>
          <h3 className="text-sm font-black text-sky-800 dark:text-sky-300 flex items-center gap-2">
            🧠 Resumo para Memorizar
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Os 5 parâmetros que você deve ter na ponta da língua:
          </p>
          <ul className="space-y-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
            <li>• <strong>CM:</strong> Configuração de mão</li>
            <li>• <strong>PA:</strong> Ponto de articulação</li>
            <li>• <strong>M:</strong> Movimento</li>
            <li>• <strong>Or:</strong> Orientação</li>
            <li>• <strong>ENM:</strong> Expressões não manuais</li>
          </ul>
          <div className="p-3 rounded-xl bg-sky-600 text-white font-black text-center text-xs">
            🎯 CM + PA + M + Or + ENM
          </div>
        </div>

        {/* Pegadinha FGV */}
        <div className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/50 border-amber-200'}`}>
          <h3 className="text-sm font-black text-amber-800 dark:text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> ⚠️ Pegadinha Clássica de Prova
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <strong>Não confunda configuração de mão com orientação:</strong>
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 font-semibold">
              <strong>Configuração:</strong> é o FORMATO da mão (como os dedos estão dispostos).
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 font-semibold">
              <strong>Orientação:</strong> é a DIREÇÃO da palma ou dos dedos (para onde apontam).
            </div>
          </div>
        </div>
      </section>

      {/* AVISO DOS EXERCÍCIOS NO WHATSAPP */}
      <section className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-black text-sm">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <span>📱 Exercícios da 3ª Aula no WhatsApp</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          O professor informou que para esta 3ª aula (Estrutura e Formação dos Sinais), <strong>os exercícios e tarefas práticas serão postados diretamente no grupo do WhatsApp</strong> da turma.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enquanto isso, você pode assistir ao vídeo oficial exclusivo e revisar os 15 flashcards interativos para fixar todos os 5 parâmetros!
        </p>
      </section>

      {/* Botões de Ação Inferiores */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab('video')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>🎬 Assistir Vídeo Aula</span>
          </button>
          <button
            onClick={() => onNavigateTab('flashcards')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Revisar Flashcards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onToggleCompleted}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isLessonCompleted
              ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLessonCompleted ? '✓ 3ª Aula Concluída (Alternar)' : 'Marcar 3ª Aula como Concluída'}</span>
        </button>
      </div>
    </article>
  );
};
