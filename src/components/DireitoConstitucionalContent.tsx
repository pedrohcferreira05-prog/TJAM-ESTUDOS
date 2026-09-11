import React, { useState } from 'react';
import {
  Landmark,
  Scale,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  FileText,
  ShieldCheck,
  Bookmark,
  Building,
  Target,
  Video,
  Globe,
  Award,
  Send,
  ExternalLink,
  Info,
  CheckSquare
} from 'lucide-react';
import { direitoConstVideoPracticalTask } from '../data/direitoConstitucionalLessonData';

interface DireitoConstitucionalContentProps {
  isDarkMode: boolean;
  isLessonCompleted: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const DireitoConstitucionalContent: React.FC<DireitoConstitucionalContentProps> = ({
  isDarkMode,
  isLessonCompleted,
  onToggleCompleted,
  onNavigateTab,
}) => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_direito_const_nacionalidade');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      conceito: false,
      nato: false,
      naturalizado: false,
      diferencas: false,
      cargos_privativos: false,
      portugueses: false,
      perda_ec131: false
    };
  });

  const [videoLink, setVideoLink] = useState('');
  const [videoStatus, setVideoStatus] = useState<'idle' | 'enviado'>('idle');
  const [activeTabSub, setActiveTabSub] = useState<'teoria' | 'mapa' | 'pratica'>('teoria');

  const toggleCheck = (key: string) => {
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('tjam_checklist_direito_const_nacionalidade', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleSendVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink.trim()) return;
    setVideoStatus('enviado');
    try {
      localStorage.setItem('tjam_video_desafio_const_nacionalidade', videoLink);
    } catch (e) {}
  };

  return (
    <article
      className={`p-6 sm:p-10 rounded-3xl border space-y-10 leading-relaxed transition-all ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 text-slate-200'
          : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      }`}
    >
      {/* 1. Header do Conteúdo Oficial */}
      <section
        className={`p-6 sm:p-8 rounded-3xl border ${
          isDarkMode
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-100/40 border-emerald-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" /> 🇧🇷 Direito Constitucional — 1ª Aula de Hoje
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                ⭐ Artigo 12 da CF/88 — Nacionalidade
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-200 mt-2 flex items-center gap-2">
              <Landmark className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Nacionalidade: Nato, Naturalizado e Perda</span>
            </h2>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold mt-1">
              Esta é a próxima aula da sequência de Direito Constitucional para o TJAM, após Direitos e Garantias Fundamentais.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('questoes')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>20 Questões (TJAM)</span>
              </button>
            )}
            {onToggleCompleted && (
              <button
                onClick={onToggleCompleted}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLessonCompleted
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? 'Concluída' : 'Marcar Concluída'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mini tabs internas */}
        <div className="flex gap-2 border-t border-emerald-200/50 dark:border-emerald-800/40 pt-4 flex-wrap">
          <button
            onClick={() => setActiveTabSub('teoria')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTabSub === 'teoria'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Teoria Completa (Art. 12)</span>
          </button>
          <button
            onClick={() => setActiveTabSub('mapa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTabSub === 'mapa'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mapa Mental & Mnemônico</span>
          </button>
          <button
            onClick={() => setActiveTabSub('pratica')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTabSub === 'pratica'
                ? 'bg-rose-600 text-white'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
            <span>Exercício Prático em Vídeo</span>
          </button>
        </div>

        {/* Checklist da Aula */}
        <div className="mt-4 pt-4 border-t border-emerald-200/40 dark:border-emerald-800/40">
          <p className="text-[11px] font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5" /> Checklist de Fixação da Aula (7 Metas de Domínio)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'conceito', label: '1. Conceito e Vínculo Político' },
              { id: 'nato', label: '2. Hipóteses de Nato (Art. 12, I)' },
              { id: 'naturalizado', label: '3. Hipóteses de Naturalizado' },
              { id: 'diferencas', label: '4. Nato x Naturalizado na CF' },
              { id: 'cargos_privativos', label: '5. Cargos: P-V-C-S-M-D-O-D' },
              { id: 'portugueses', label: '6. Estatuto dos Portugueses' },
              { id: 'perda_ec131', label: '7. Perda e EC 131/2023' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-all border ${
                  checklist[item.id]
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'bg-white/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                    checklist[item.id]
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {checklist[item.id] && <Check className="w-3 h-3" />}
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo Dinâmico conforme sub-tab */}
      {activeTabSub === 'teoria' && (
        <div className="space-y-10">
          {/* TÓPICO 1: O QUE É NACIONALIDADE */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                1
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">O que é nacionalidade?</h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>Nacionalidade</strong> é o <strong>vínculo jurídico-político</strong> que liga uma pessoa a determinado Estado soberano, tornando-a integrante do seu povo e outorgando-lhe direitos (políticos, civis e diplomáticos) e deveres recíprocos (como a fidelidade à pátria e a obrigação militar).
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              No Brasil, a <strong>Constituição Federal de 1988 estabelece expressamente quem são os brasileiros natos e os brasileiros naturalizados no art. 12</strong>. Não cabe ao legislador infraconstitucional criar novas formas de nacionalidade originária.
            </div>
          </section>

          {/* TÓPICO 2: BRASILEIRO NATO */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                2
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Brasileiro Nato (Nacionalidade Originária / Primária)</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              A nacionalidade nata é atribuída no momento do nascimento. São brasileiros natos (Art. 12, I da CF):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Alínea A */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇧🇷</span>
                  <h4 className="text-sm font-black text-emerald-900 dark:text-emerald-300">A) Nascidos no Brasil (Jus Soli)</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  É brasileiro nato quem nasce no território brasileiro, mesmo que os pais sejam estrangeiros, <strong>desde que eles não estejam a serviço de seu país</strong> de origem.
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900 text-[11px] text-slate-600 dark:text-slate-400">
                  <strong className="text-emerald-600 dark:text-emerald-400">Exemplo Prático:</strong> Um casal argentino está no Brasil a passeio e tem um filho em <strong>Manaus/AM</strong>. Se os pais não estiverem a serviço da Argentina, o filho será <strong>brasileiro nato</strong>.
                </div>
              </div>

              {/* Alínea B */}
              <div className="p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌎</span>
                  <h4 className="text-sm font-black text-sky-900 dark:text-sky-300">B) No Exterior a Serviço do Brasil</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  É brasileiro nato quem nasce no estrangeiro, sendo filho de pai brasileiro ou mãe brasileira, <strong>quando qualquer deles estiver a serviço da República Federativa do Brasil</strong>.
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 text-[11px] text-slate-600 dark:text-slate-400">
                  <strong className="text-sky-600 dark:text-sky-400">Exemplo Prático:</strong> Um diplomata ou militar brasileiro trabalha na embaixada do Brasil na França e tem um filho em Paris. Esse filho será <strong>brasileiro nato</strong>.
                </div>
              </div>

              {/* Alínea C */}
              <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✈️</span>
                  <h4 className="text-sm font-black text-purple-900 dark:text-purple-300">C) No Exterior: Registro ou Opção</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Nascido no exterior, de pai ou mãe brasileira:
                  <br />• Registrado em <strong>repartição brasileira competente</strong> (consulado); OU
                  <br />• Venha a <strong>residir no Brasil e opte</strong>, a qualquer tempo, depois de atingida a maioridade (18 anos), pela nacionalidade brasileira.
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900 text-[11px] text-slate-600 dark:text-slate-400">
                  <strong className="text-purple-600 dark:text-purple-400">Dica:</strong> A opção é potestativa e pode ser feita a qualquer momento após os 18 anos na Justiça Federal.
                </div>
              </div>
            </div>
          </section>

          {/* TÓPICO 3: BRASILEIRO NATURALIZADO */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                3
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Brasileiro Naturalizado (Nacionalidade Derivada / Secundária)</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              O brasileiro naturalizado adquire a nacionalidade por ato posterior ao nascimento, preenchendo os requisitos estabelecidos na Constituição (Art. 12, II):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-black text-xs">Alínea A</span>
                  <h4 className="text-sm font-bold text-amber-950 dark:text-amber-300">Originários de Países de Língua Portuguesa</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Requisitos constitucionais facilitados (ex: portugueses, angolanos, cabo-verdianos, moçambicanos):
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Residência por <strong>1 (um) ano ininterrupto</strong> no Brasil;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Idoneidade moral</strong> comprovada.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500 text-white font-black text-xs">Alínea B</span>
                  <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-300">Estrangeiros de Qualquer Nacionalidade (Extraordinária)</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Requisitos constitucionais da naturalização extraordinária:
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Residência há <strong>mais de 15 anos ininterruptos</strong> no Brasil;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Sem condenação penal</strong>;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Requeiram</strong> formalmente a nacionalidade brasileira.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* TÓPICO 4: NATO X NATURALIZADO */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                4
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Nato × Naturalizado (Regra de Ouro da CF)</h3>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm text-rose-900 dark:text-rose-300">
              <strong>Art. 12, § 2º da CF:</strong> <em>"A lei não poderá estabelecer distinção entre brasileiros natos e naturalizados, salvo nos casos previstos nesta Constituição."</em>
              <br />
              Ou seja: <strong>O legislador ordinário NÃO PODE criar privilégios ou restrições</strong>. Qualquer diferença deve constar EXPRESSAMENTE do próprio texto constitucional!
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-black">
                  <tr>
                    <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Critério / Tema</th>
                    <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Brasileiro Nato</th>
                    <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Brasileiro Naturalizado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold">Extradição (Art. 5º, LI)</td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">NUNCA é extraditado pelo Brasil.</td>
                    <td className="p-3.5 text-rose-600 dark:text-rose-400">Pode ser extraditado em: 1) Crime comum ANTES da naturalização; OU 2) Tráfico de drogas a qualquer tempo.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold">Cargos Públicos</td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">Pode ocupar qualquer cargo, inclusive os 8 privativos.</td>
                    <td className="p-3.5">Pode ocupar a imensa maioria dos cargos, EXCETO os 8 privativos de nato (Art. 12, § 3º).</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold">Conselho da República (Art. 89, VII)</td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">Tem 6 vagas reservadas a cidadãos brasileiros natos.</td>
                    <td className="p-3.5 text-slate-500">Não pode ocupar essas 6 vagas destinadas a cidadãos.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold">Perda por sentença judicial</td>
                    <td className="p-3.5 text-slate-500">Não perde por cancelamento de naturalização.</td>
                    <td className="p-3.5 text-amber-600 dark:text-amber-400">Pode ter a naturalização cancelada por fraude ou atentado ao Estado Democrático.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* TÓPICO 5: CARGOS PRIVATIVOS DE BRASILEIRO NATO */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                5
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Cargos Privativos de Brasileiro Nato (Art. 12, § 3º)</h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm">
              <p className="font-black text-amber-900 dark:text-amber-300 mb-1">
                🧠 MACETE INFALÍVEL PARA CONCURSO: P - V - C - S - M - D - O - D
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                Os 4 primeiros formam a linha sucessória da Presidência da República (Art. 80 da CF). Os 4 seguintes cuidam da Soberania, Justiça Suprema e Defesa Nacional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { letra: 'P', cargo: 'Presidente da República', motivo: 'Chefe de Estado e de Governo (Linha Sucessória)' },
                { letra: 'V', cargo: 'Vice-Presidente da República', motivo: 'Substituto imediato do Presidente' },
                { letra: 'C', cargo: 'Presidente da Câmara dos Deputados', motivo: '2º na linha de substituição presidencial' },
                { letra: 'S', cargo: 'Presidente do Senado Federal', motivo: '3º na linha de substituição presidencial' },
                { letra: 'M', cargo: 'Ministro do STF (11 Ministros)', motivo: '4º na linha de substituição e cúpula do Judiciário' },
                { letra: 'D', cargo: 'Carreira Diplomática', motivo: 'Representação soberana do Brasil perante o mundo' },
                { letra: 'O', cargo: 'Oficial das Forças Armadas', motivo: 'Comando armado (Exército, Marinha e Aeronáutica)' },
                { letra: 'D', cargo: 'Ministro de Estado da Defesa', motivo: 'Comando civil sobre as Forças Armadas' }
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    {c.letra}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{c.cargo}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.motivo}</p>
                </div>
              ))}
            </div>

            {/* Pegadinhas de Concurso */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>⚠️ PEGADINHAS CLÁSSICAS DA FGV E BANCAS DE TRIBUNAIS:</span>
              </div>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <li>• <strong>Deputado Federal e Senador podem ser naturalizados?</strong> SIM! Apenas o <em>Presidente</em> da Câmara e o <em>Presidente</em> do Senado precisam ser natos.</li>
                <li>• <strong>Ministro do STJ, TST ou Governador de Estado precisam ser natos?</strong> NÃO! Podem ser normalmente naturalizados. O único tribunal com exigência de nato é o STF!</li>
              </ul>
            </div>
          </section>

          {/* TÓPICO 6: PORTUGUESES NO BRASIL */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                6
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Portugueses no Brasil — Estatuto da Igualdade (Art. 12, § 1º)</h3>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Aos portugueses com <strong>residência permanente no Brasil</strong>, se houver <strong>reciprocidade em favor de brasileiros</strong> em Portugal, serão atribuídos os direitos inerentes ao brasileiro, ressalvadas as hipóteses privativas de brasileiro nato.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              Trata-se do fenômeno da <strong>quase-nacionalidade</strong>: o português não se torna brasileiro formalmente (não perde a nacionalidade portuguesa nem vira cidadão naturalizado), mas usufrui do gozo de direitos como votar e ser votado, respeitada a reciprocidade.
            </div>
          </section>

          {/* TÓPICO 7: PERDA DA NACIONALIDADE E EC 131/2023 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                7
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Perda da Nacionalidade (Art. 12, § 4º — Com a EC nº 131/2023)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase">1. Cancelamento da Naturalização</span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Apenas para <strong>brasileiro naturalizado</strong>, por meio de <strong>sentença judicial transitada em julgado</strong>, em duas situações:
                </p>
                <ul className="text-xs space-y-1 font-semibold text-slate-600 dark:text-slate-400">
                  <li>• Em virtude de <strong>fraude</strong> relacionada ao processo de naturalização; OU</li>
                  <li>• Em razão de <strong>atentado contra a ordem constitucional e o Estado Democrático</strong>.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase">2. Pedido Expresso (Renúncia)</span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  O cidadão (nato ou naturalizado) pode requerer a perda da nacionalidade brasileira perante autoridade competente:
                </p>
                <ul className="text-xs space-y-1 font-semibold text-slate-600 dark:text-slate-400">
                  <li>• <strong>Ressalva da Apatridia:</strong> O pedido NÃO será aceito se resultar em situação de apatridia!</li>
                  <li>• <strong>Readquisição:</strong> A pessoa pode readquirir a nacionalidade brasileira originária nos termos da lei.</li>
                </ul>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500/40 space-y-2">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-900 dark:text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>MUDANÇA CRUCIAL DA EMENDA CONSTITUCIONAL Nº 131/2023:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Antes da EC 131/2023, o brasileiro que adquirisse outra nacionalidade por vontade própria perdia a brasileira (regra antiga). 
                <strong> HOJE, A REGRA MUDOU TOTALMENTE:</strong> adquirir outra nacionalidade <strong>NÃO provoca automaticamente a perda da nacionalidade brasileira!</strong> O brasileiro pode ter dupla ou múltipla cidadania sem medo de perder a brasileira.
              </p>
            </div>
          </section>

          {/* O QUE VOCÊ PRECISA SABER PARA A PROVA */}
          <section className="p-6 rounded-3xl bg-slate-900 text-slate-100 space-y-4">
            <h4 className="text-lg font-black text-amber-400 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              <span>🎯 O que você precisa saber para a prova (Gabarito Garantido no TJAM)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="font-bold text-amber-300">1. Art. 12 da CF:</span>
                <p className="text-slate-300 mt-1">Conheça as 3 hipóteses de nato (solo temperado, a serviço do Brasil, registro/opção após os 18 anos) e as 2 de naturalizado.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="font-bold text-emerald-300">2. Princípio da Não-Distinção:</span>
                <p className="text-slate-300 mt-1">A lei ordinária não pode criar distinções entre natos e naturalizados. Apenas a própria CF tem autoridade para isso.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="font-bold text-sky-300">3. 8 Cargos Privativos de Nato:</span>
                <p className="text-slate-300 mt-1">Decore o P-V-C-S-M-D-O-D. Lembre-se: STF (todos os 11). Pres. da Câmara e do Senado (não os membros comuns).</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="font-bold text-rose-300">4. Perda e EC 131/2023:</span>
                <p className="text-slate-300 mt-1">Perda só por sentença judicial transitada em julgado (naturalizado) ou pedido expresso sem gerar apatridia. Adquirir outra não cancela a do Brasil.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SUBTAB 2: MAPA MENTAL */}
      {activeTabSub === 'mapa' && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
              🧠
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">Mapa Mental — Nacionalidade 🇧🇷</h3>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-6">
            {/* Núcleo Central */}
            <div className="text-center max-w-md mx-auto p-4 rounded-2xl bg-emerald-600 text-white font-black text-base shadow-lg">
              NACIONALIDADE (Art. 12 da CF/88)
              <span className="block text-xs font-normal opacity-90 mt-1">Vínculo Político-Jurídico com o Estado Brasileiro</span>
            </div>

            {/* Ramificações Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ramo 1: Brasileiro Nato */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-emerald-500 text-white font-black text-xs">ORIGINÁRIA</span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">Brasileiro Nato</h4>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>1. Jus Soli:</strong> Nascido no Brasil, salvo se ambos os pais estrangeiros estiverem a serviço de seu país.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>2. Jus Sanguinis Funcional:</strong> Nascido no exterior com pai ou mãe a serviço da República Federativa do Brasil.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>3. Registro ou Residência + Opção:</strong> Registro no consulado OU residência no Brasil + opção confirmativa após a maioridade.
                  </div>
                </div>
              </div>

              {/* Ramo 2: Brasileiro Naturalizado */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-sky-500 text-white font-black text-xs">DERIVADA</span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">Brasileiro Naturalizado</h4>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>Países de Língua Portuguesa:</strong> 1 ano ininterrupto de residência + idoneidade moral.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>Extraordinária (Qualquer País):</strong> Mais de 15 anos ininterruptos + sem condenação penal + requerimento formal.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>Extradição:</strong> Permitida para crime comum antes da naturalização ou tráfico ilícito a qualquer tempo.
                  </div>
                </div>
              </div>

              {/* Ramo 3: Cargos Privativos */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-amber-500 text-white font-black text-xs">P-V-C-S-M-D-O-D</span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">Cargos Privativos de Nato</h4>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">👑 Pres. República</div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">🏛️ Vice-Pres. República</div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">📜 Pres. Câmara Deputados</div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">⚖️ Pres. Senado Federal</div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">⚖️ Min. STF (11 vagas)</div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">🌐 Carreira Diplomática</div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">🎖️ Oficial Forças Armadas</div>
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40">🛡️ Ministro da Defesa</div>
                </div>
              </div>

              {/* Ramo 4: Perda da Nacionalidade */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-rose-500 text-white font-black text-xs">EC 131/2023</span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">Perda da Nacionalidade</h4>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>1. Cancelamento Judicial:</strong> Sentença transitada em julgado por fraude na naturalização ou atentado à ordem democrática.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <strong>2. Pedido Expresso:</strong> Apenas se NÃO gerar apatridia (vedada a perda que torne a pessoa apátrida).
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 font-bold">
                    ⚠️ Adquirir outra cidadania NÃO cancela a brasileira automaticamente!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SUBTAB 3: EXERCÍCIO PRÁTICO EM VÍDEO */}
      {activeTabSub === 'pratica' && (
        <section className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 border border-rose-500/20 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500 text-white">
                <Video className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Desafio de Comunicação e Domínio Jurídico
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                  Exercício Prático — Gravação de Vídeo para o Professor
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              O concurseiro de alta performance não apenas lê e memoriza: ele <strong>ensina e articula o direito oralmente com segurança</strong>. Esta prática desenvolve a retenção permanente para as provas discursivas e orais.
            </p>
          </div>

          {/* Situação Prática */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-sm font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Situação Prática para Resolução Oral:</span>
            </h4>
            <p className="text-sm italic p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              "{direitoConstVideoPracticalTask.situacaoPratica}"
            </p>
          </div>

          {/* As 6 Perguntas para Responder no Vídeo */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span>Roteiro de 6 Perguntas Obrigatórias para Abordar:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {direitoConstVideoPracticalTask.perguntas.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{p.replace(/^[0-9]+\.\s*/, '')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desafio Final */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <h4 className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Desafio Final Oral (1 a 2 minutos sem consulta)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
              "{direitoConstVideoPracticalTask.desafioFinal}"
            </p>
          </div>

          {/* Formulário de Registro / Envio do Aluno */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Send className="w-4 h-4 text-rose-500" />
              <span>Entrega do Vídeo da Prática ao Professor</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Cole o link do seu vídeo (YouTube, Google Drive, Loom ou gravação celular) para registrar o cumprimento desta meta de comunicação:
            </p>

            <form onSubmit={handleSendVideo} className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={videoLink}
                onChange={e => setVideoLink(e.target.value)}
                placeholder="https://youtu.be/... ou https://drive.google.com/..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Registrar Envio</span>
              </button>
            </form>

            {videoStatus === 'enviado' && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Vídeo registrado com sucesso! O professor verificará a desenvoltura oral, a clareza técnica e a precisão do enquadramento constitucional.</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Rodapé da Lição */}
      <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Direito Constitucional • 1ª Aula de Hoje • TJAM 2026</span>
        </div>
        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('questoes')}
            className="inline-flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <span>Ir para as 20 Questões de Prova</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </footer>
    </article>
  );
};
