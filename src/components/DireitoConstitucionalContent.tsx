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
  Target
} from 'lucide-react';

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
      const saved = localStorage.getItem('tjam_checklist_direito_const');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      plena: false,
      contida: false,
      limitada: false,
      institutivo: false,
      programatico: false,
      pegadinha: false
    };
  });

  const toggleCheck = (key: string) => {
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('tjam_checklist_direito_const', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
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
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-gradient-to-r from-amber-50 to-amber-100/60 border-amber-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" /> 📚 Direito Constitucional — 1ª Aula de Hoje
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                ⭐ Eficácia das Normas (José Afonso da Silva / STF)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-900 dark:text-amber-300 mt-2 flex items-center gap-2">
              <Landmark className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Aplicabilidade das Normas Constitucionais</span>
            </h2>
            <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-1">
              Este é o conteúdo oficial do concurso, sem repetir Direitos e Garantias Fundamentais.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('questoes')}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Ver 20 Questões</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          A classificação mais cobrada divide as normas constitucionais em <strong>eficácia plena, contida e limitada</strong>. O próprio <strong>STF utiliza essas categorias em seu Tesauro</strong>, e material do Senado também apresenta essa classificação (doutrina clássica de José Afonso da Silva).
        </p>
      </section>

      {/* 2. 1️⃣ Norma de Eficácia Plena */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 font-black text-sm flex items-center justify-center border border-emerald-500/20">
              1️⃣
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Norma de Eficácia Plena
              </h3>
              <p className="text-xs text-slate-500">Autoaplicável desde a promulgação da CF/88</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            📌 Palavra-chave: COMPLETA
          </span>
        </div>

        <p className="text-sm">
          É aquela que <strong>já possui todos os elementos necessários</strong> para produzir seus efeitos desde a entrada em vigor da Constituição. Ela nasce pronta e acabada.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50/50 border-emerald-200'}`}>
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Característica 1</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Direta</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Não depende de nenhum intermediário ou veículo normativo legal.</p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50/50 border-emerald-200'}`}>
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Característica 2</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Imediata</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Gera efeitos jurídicos e sociais a partir do primeiro instante de vigência.</p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50/50 border-emerald-200'}`}>
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Característica 3</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Integral</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Não pode ter seu alcance reduzido, restringido ou apequenado por lei.</p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50/50 border-emerald-200'}`}>
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Característica 4</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Independe de Lei</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Não depende de regulamentação para produzir seus efeitos essenciais.</p>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border space-y-2 text-xs ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Exemplos em Concurso:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Normas que estabelecem determinadas competências e vedações diretamente na Constituição (ex: Art. 5º, XLVII — vedação de penas de morte, de caráter perpétuo ou de trabalhos forçados; competências expressas dos órgãos do Poder Judiciário).
          </p>
        </div>
      </section>

      {/* 3. 2️⃣ Norma de Eficácia Contida */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 font-black text-sm flex items-center justify-center border border-purple-500/20">
              2️⃣
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Norma de Eficácia Contida
              </h3>
              <p className="text-xs text-slate-500">Redutível ou restringível por lei infraconstitucional</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
            📌 Palavra-chave: PODE SER REDUZIDA
          </span>
        </div>

        <p className="text-sm">
          Também possui <strong>aplicabilidade imediata e direta</strong>, mas seu alcance <strong>pode ser restringido</strong> (contido) por lei posterior ou outras normas constitucionais. Enquanto não houver lei que limite, <strong>produz efeitos amplos e plenos</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-purple-50/50 border-purple-200'}`}>
            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">Atributo 1</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Direta</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Opera sem intermediação para deflagrar os efeitos.</p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-purple-50/50 border-purple-200'}`}>
            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">Atributo 2</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Imediata</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">O cidadão já pode fruir do direito desde a promulgação.</p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-purple-50/50 border-purple-200'}`}>
            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">Atributo 3</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação NÃO Integral</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Está sujeita a limites, condições ou restrições de lei futura.</p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border space-y-2 text-xs ${isDarkMode ? 'bg-purple-950/20 border-purple-800/40' : 'bg-purple-50/80 border-purple-200'}`}>
          <div className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-300">
            <Lightbulb className="w-4 h-4" />
            <span>Exemplo Clássico de Concurso (Campeão em Provas da FGV):</span>
          </div>
          <blockquote className="italic font-bold text-sm text-slate-800 dark:text-slate-200 pl-3 border-l-2 border-purple-500">
            Art. 5º, XIII, da CF/88: "é livre o exercício de qualquer trabalho, ofício ou profissão, atendidas as qualificações profissionais que a lei estabelecer".
          </blockquote>
          <p className="text-slate-600 dark:text-slate-300 pt-1">
            <strong>Como cai na prova:</strong> Se não existe lei exigindo qualificações (ex: exame, registro, curso superior), qualquer cidadão pode exercer aquela atividade. Se vier lei impondo requisitos (como para advogados ou médicos), o alcance da liberdade é legitimamente <em>contido</em>.
          </p>
        </div>
      </section>

      {/* 4. 3️⃣ Norma de Eficácia Limitada */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 font-black text-sm flex items-center justify-center border border-amber-500/20">
              3️⃣
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Norma de Eficácia Limitada
              </h3>
              <p className="text-xs text-slate-500">Depende de integração normativa para produzir plenitude de efeitos</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            📌 Palavra-chave: PRECISA SER COMPLEMENTADA
          </span>
        </div>

        <p className="text-sm">
          <strong>Não possui aplicabilidade plena imediata.</strong> Depende de uma <strong>lei infraconstitucional futura</strong> (lei ordinária ou complementar) para produzir todos os seus efeitos essenciais.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-amber-50/50 border-amber-200'}`}>
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">Atributo 1</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Indireta</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Depende de intermediação legislativa para operar concretamente.</p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-amber-50/50 border-amber-200'}`}>
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">Atributo 2</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Mediata</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Não é instantânea; depende do decurso do processo legislativo.</p>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-amber-50/50 border-amber-200'}`}>
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">Atributo 3</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Aplicação Reduzida</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Suas principais faculdades ficam represadas até a edição da lei.</p>
          </div>
        </div>

        {/* Subdivisões do STF / Doutrina */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>⚖️ Subdivisões Consagradas pelo STF:</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-500" />
                <h5 className="font-black text-sm text-slate-900 dark:text-white">
                  A) Normas de Princípio Institutivo (Organizativo)
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Criam e estruturam órgãos, entidades ou instituições públicas, prevendo que a lei infraconstitucional organize o seu funcionamento, competências e procedimentos.
              </p>
              <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                Ex: Criação de novos Tribunais, ministérios ou conselhos "na forma da lei".
              </div>
            </div>

            <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                <h5 className="font-black text-sm text-slate-900 dark:text-white">
                  B) Normas de Princípio Programático
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Traçam metas, fins sociais, princípios de justiça econômica e programas estatais a serem gradualmente realizados pelos Poderes Públicos em prol da coletividade.
              </p>
              <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                Ex: Saúde universal (Art. 196), pleno emprego (Art. 170) e erradicação da pobreza (Art. 3º).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ⚠️ Pegadinha de Prova (FGV) */}
      <section
        className={`p-6 rounded-3xl border ${
          isDarkMode
            ? 'bg-rose-500/10 border-rose-500/30'
            : 'bg-rose-50 border-rose-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-base font-black text-rose-900 dark:text-rose-300">
              ⚠️ Pegadinha Clássica de Concurso: Contida vs. Limitada
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              <strong>Como memorizar para acertar na hora da prova:</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-900/40">
                <span className="font-extrabold text-rose-600 dark:text-rose-400 block mb-1">NORMA CONTIDA:</span>
                Nasce com eficácia <strong>PLENA E AMPLA</strong>. A lei posterior vem para <strong>RESTRINGIR</strong>. Se nunca vier lei, continua 100% livre.
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-900/40">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block mb-1">NORMA LIMITADA:</span>
                Nasce <strong>DEPENDENTE DE LEI</strong> para ter eficácia integral. A lei posterior vem para <strong>AMPLIAR/INTEGRAR</strong>. Se não houver lei, o direito fica obstado na prática.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tabela Resumo Visual Comparativa */}
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>📊 Tabela Resumo Definitiva — Eficácia das Normas Constitucionais</span>
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Classificação</th>
                <th className="p-3.5">Aplicação</th>
                <th className="p-3.5">Papel da Lei Futura</th>
                <th className="p-3.5">Palavra-chave</th>
                <th className="p-3.5">Exemplo Clássico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-black text-emerald-600 dark:text-emerald-400">Eficácia Plena</td>
                <td className="p-3.5">Direta, imediata e integral</td>
                <td className="p-3.5">Desnecessária para os efeitos essenciais</td>
                <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">COMPLETA</span></td>
                <td className="p-3.5">Vedações constitucionais expressas e competências</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-black text-purple-600 dark:text-purple-400">Eficácia Contida</td>
                <td className="p-3.5">Direta, imediata e não integral</td>
                <td className="p-3.5">Restringir ou conter o alcance original</td>
                <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold">PODE SER REDUZIDA</span></td>
                <td className="p-3.5">Art. 5º, XIII (Livre exercício profissional)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-black text-amber-600 dark:text-amber-400">Eficácia Limitada</td>
                <td className="p-3.5">Indireta, mediata e reduzida</td>
                <td className="p-3.5">Integrar ou complementar o preceito</td>
                <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">PRECISA COMPLEMENTAR</span></td>
                <td className="p-3.5">Art. 37, VII (Greve no serviço público)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Checklist Interativo de Fixação */}
      <section className="space-y-3 pt-2">
        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span>✅ Checklist de Domínio do Conteúdo:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            { id: 'plena', label: '1. Sei os 3 atributos da Plena (Direta, Imediata e Integral).' },
            { id: 'contida', label: '2. Sei que a Contida nasce plena e a lei serve para restringir.' },
            { id: 'limitada', label: '3. Sei que a Limitada tem aplicação indireta e mediata.' },
            { id: 'institutivo', label: '4. Diferencio princípio institutivo de princípio programático.' },
            { id: 'programatico', label: '5. Sei que norma programática tem eficácia jurídica mínima.' },
            { id: 'pegadinha', label: '6. Dominei a pegadinha FGV: Contida ≠ Limitada.' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                checklist[item.id]
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                checklist[item.id] ? 'bg-emerald-600 text-white' : 'border border-slate-400'
              }`}>
                {checklist[item.id] && <Check className="w-3 h-3" />}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 8. Botões de Ação Final */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-purple-500" />
                <span>15 Flashcards</span>
              </button>

              <button
                onClick={() => onNavigateTab('questoes')}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Resolver 20 Questões</span>
              </button>
            </>
          )}
        </div>

        {onToggleCompleted && (
          <button
            onClick={onToggleCompleted}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              isLessonCompleted
                ? 'bg-emerald-700 text-white border border-emerald-400/40 shadow-emerald-700/20'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLessonCompleted ? '✓ Aula 1 Concluída (Clique para alternar)' : 'Concluir 1ª Aula de Constitucional'}</span>
          </button>
        )}
      </div>
    </article>
  );
};
