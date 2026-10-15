import React, { useState } from 'react';
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
  Briefcase,
  AlertTriangle,
  Clock,
  Send,
  Share2,
  Check,
  Layers,
  ArrowRight
} from 'lucide-react';
import { legislacaoTjamPracticalTask, legislacaoTjamVideoInfo } from '../data/legislacaoTjamLessonData';

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
  const [activeBranch, setActiveBranch] = useState<number>(0);
  const [studentName, setStudentName] = useState(() => localStorage.getItem('tjam_student_name') || '');
  const [studentResumo, setStudentResumo] = useState('');
  const [studentExemplo, setStudentExemplo] = useState('');
  const [copied, setCopied] = useState(false);

  const branches = legislacaoTjamPracticalTask.ramificacoes;

  const handleCopyReport = () => {
    const textToCopy = `📚 *TJAM — 2ª AULA (QUINTA-FEIRA): LEGISLAÇÃO INSTITUCIONAL*
🏛️ *Tema:* Lei Complementar Estadual nº 261/2023 (Lei Judiciária do Amazonas)
👤 *Aluno(a):* ${studentName.trim() || 'Estudante TJAM'}
⏰ *Horário de Entrega:* ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} (Prazo: até 19h30)

📌 *1. MAPA CONCEITUAL — 5 RAMIFICAÇÕES:*
1) *Órgãos do PJ:* TJAM, Turmas Recursais, Júri, Juízes de Direito, Juízes Substitutos, Auditoria Militar e Juízes de Paz.
2) *Comarcas e Termos:* Divisão territorial para administração judiciária; comarca abrange um ou mais municípios.
3) *Magistratura:* Regime jurídico, garantias, deveres e competências dos magistrados de 1º e 2º Graus.
4) *Serviços Auxiliares:* Suporte técnico, cartorário e administrativo (atuação do Assistente Judiciário).
5) *Serviços Notariais e de Registro:* Fé pública, formalização e publicidade de atos jurídicos por delegação legal.

📝 *2. EXEMPLO PRÁTICO DO ALUNO:*
${studentExemplo.trim() || 'Exemplo fictício demonstrando a necessidade de respeito à LC nº 261/2023 na reorganização de varas judiciais.'}

📝 *3. RESUMO DA AULA & IMPORTÂNCIA PARA O TJAM:*
${studentResumo.trim() || 'A LC nº 261/2023 substituiu a antiga LC nº 17/1997 e garante a legalidade e regularidade das unidades judiciais. Essencial para o cargo de Assistente Judiciário.'}

✅ *Status:* Atividade concluída e enviada ao professor.`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendWhatsApp = () => {
    handleCopyReport();
    const encoded = encodeURIComponent(
      `Olá, professor! Segue minha atividade prática da 2ª Aula de Quinta-feira (LC nº 261/2023 - Legislação Institucional TJAM):\n\nAluno(a): ${
        studentName || 'Estudante'
      }\n\nResumo e Mapa Conceitual concluídos conforme o prazo das 19h30!`
    );
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <article className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white text-slate-800 shadow-sm space-y-10 leading-relaxed transition-all">
      {/* Header / Banner Principal */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-700 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-purple-500/20">
              <Landmark className="w-3.5 h-3.5" /> 2ª AULA DE HOJE • QUINTA-FEIRA
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-black text-xs uppercase tracking-wider border border-emerald-500/20">
              LC nº 261/2023 (Lei Judiciária do Amazonas)
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 font-black text-xs uppercase tracking-wider border border-amber-500/20">
              Nível Intermediário — TJAM Assistente Judiciário
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('video')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vídeo Aula Oficial</span>
            </button>
            <button
              onClick={() => onNavigateTab('questoes')}
              className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>20 Questões da 2ª Aula</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="text-purple-600">🏛️</span> Legislação Institucional e do Poder Judiciário — Aula 2: Lei Complementar Estadual nº 261/2023
          </h1>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">
            Conforme o cronograma de quinta-feira, a segunda aula é de <strong>Legislação Institucional</strong> e o tema é a <strong>Lei Complementar Estadual nº 261/2023</strong>, que trata da Lei Judiciária do Estado do Amazonas. Como já estudamos a introdução à Organização Judiciária, agora avançamos para a legislação específica sem repetição.
          </p>
        </div>

        {/* Info Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
            <div className="text-[11px] font-black uppercase text-purple-700">Norma Central</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">LC Estadual nº 261/2023</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] font-black uppercase text-emerald-700">Vigência & Histórico</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">01/01/2024 (revogou LC 17/97)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
            <div className="text-[11px] font-black uppercase text-blue-700">Divisão Judiciária</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">Comarcas & Termos</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="text-[11px] font-black uppercase text-amber-700">Atividade Prática</div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">Mapa Conceitual (até 19h30)</div>
          </div>
        </div>
      </header>

      {/* SEÇÃO 1: O QUE É A LC Nº 261/2023? */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            1
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>O que é a Lei Complementar Estadual nº 261/2023?</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          É a <strong>lei estadual</strong> que disciplina a divisão e a organização judiciária do Amazonas, o regime jurídico da magistratura e a organização dos serviços auxiliares da Justiça. Entrou em vigor em <strong>1º de janeiro de 2024</strong> e substituiu expressamente a antiga LC nº 17/1997 como lei de organização judiciária estadual.
        </p>

        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-black text-amber-900 uppercase tracking-wider text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            ⚠️ Atenção Máxima para a Prova:
          </div>
          <p className="leading-relaxed">
            <strong>Não confunda</strong> essa lei complementar com o antigo Código de Organização Judiciária, nem com o <strong>Regimento Interno do TJAM</strong>, que é uma norma interna autônoma de auto-organização aprovada pelo Tribunal Pleno (Resolução), disciplinando apenas o funcionamento interno do 2º Grau.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: O QUE A LEI REGULAMENTA? */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>O que a lei regulamenta?</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          A LC nº 261/2023 abrange seis pilares indispensáveis da administração do Poder Judiciário amazonense:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <div className="font-extrabold text-purple-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>1. Órgãos do Judiciário</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Organização, rol e composição de todos os órgãos do Poder Judiciário estadual.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <div className="font-extrabold text-purple-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-600 shrink-0" />
              <span>2. Divisão Judiciária</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Divisão territorial do Estado em comarcas e termos judiciários para fins de administração forense.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <div className="font-extrabold text-purple-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600 shrink-0" />
              <span>3. Estrutura e Competências</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Fixação das competências jurisdicionais e administrativas dos órgãos e magistrados.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <div className="font-extrabold text-purple-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-600 shrink-0" />
              <span>4. Magistratura</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Regime jurídico, direitos, deveres, prerrogativas e carreira dos magistrados estaduais.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <div className="font-extrabold text-purple-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600 shrink-0" />
              <span>5. Serviços Auxiliares</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Organização das secretarias, gabinetes, assistentes judiciários e apoio administrativo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <div className="font-extrabold text-purple-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
              <span>6. Serviços Notariais e de Registro</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Regulamentação das serventias extrajudiciais de notas e registros públicos delegados.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: DIVISÃO JUDICIÁRIA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            3
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Divisão Judiciária</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          A divisão judiciária envolve a <strong>criação, alteração, extinção, classificação e agrupamento</strong> das unidades judiciárias. A lei prevê que o Estado do Amazonas seja dividido em <strong>comarcas</strong> e <strong>termos judiciários</strong>, conforme as regras legais.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-purple-700 font-black text-sm">
              <MapPin className="w-4 h-4" /> Comarca
            </div>
            <p className="text-slate-600 leading-relaxed">
              Unidade territorial de organização da Justiça, que <strong>pode abranger um ou mais municípios</strong> contíguos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-black text-sm">
              <Compass className="w-4 h-4" /> Termo Judiciário
            </div>
            <p className="text-slate-600 leading-relaxed">
              Unidade territorial vinculada à organização de uma comarca sede, conforme fixado na lei.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
              <Building2 className="w-4 h-4" /> Unidade Judiciária
            </div>
            <p className="text-slate-600 leading-relaxed">
              Estrutura física e funcional em que são exercidas as atividades judiciais, como <strong>varas</strong> e <strong>juizados especiais</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: ÓRGÃOS DO PODER JUDICIÁRIO DO AMAZONAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            4
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Órgãos do Poder Judiciário do Amazonas (Art. 3º da Lei)</span>
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          O <strong>artigo 3º</strong> da LC nº 261/2023 enumera de forma expressa os órgãos que compõem o Poder Judiciário estadual:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px] uppercase">Órgão 1</span>
            <div className="font-extrabold text-slate-900 text-sm">Tribunal de Justiça (TJAM)</div>
            <p className="text-slate-600">Órgão de cúpula estadual, sede em Manaus e jurisdição em todo o Estado.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px] uppercase">Órgão 2</span>
            <div className="font-extrabold text-slate-900 text-sm">Turmas Recursais</div>
            <p className="text-slate-600">Turmas Recursais dos Juizados Especiais Cíveis, Criminais e da Fazenda.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px] uppercase">Órgão 3</span>
            <div className="font-extrabold text-slate-900 text-sm">Tribunais do Júri</div>
            <p className="text-slate-600">Competentes para o julgamento dos crimes dolosos contra a vida.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px] uppercase">Órgão 4</span>
            <div className="font-extrabold text-slate-900 text-sm">Juízes de Direito</div>
            <p className="text-slate-600">Magistrados vitalícios titulares que atuam no Primeiro Grau de Jurisdição.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px] uppercase">Órgão 5</span>
            <div className="font-extrabold text-slate-900 text-sm">Juízes Substitutos de Carreira</div>
            <p className="text-slate-600">Magistrados em início de carreira, em estágio probatório ou em substituição/auxílio.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px] uppercase">Órgão 6 e 7</span>
            <div className="font-extrabold text-slate-900 text-sm">Auditoria Militar & Juízes de Paz</div>
            <p className="text-slate-600">Auditoria Militar (e respectivos Conselhos) e Juízes de Paz para atos civis e matrimoniais.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>
            <strong>Pegadinha Clássica de Prova:</strong> O Ministério Público e a Defensoria Pública são funções essenciais à Justiça, mas <u>NÃO</u> integram a lista de órgãos do Poder Judiciário.
          </span>
        </div>
      </section>

      {/* SEÇÃO 5: APLICAÇÃO PRÁTICA */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            5
          </span>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Aplicação Prática</span>
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-3">
          <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Cenário de Reorganização Judiciária no Amazonas:
          </div>
          <p className="leading-relaxed">
            Imagine que seja necessário <strong>reorganizar o atendimento judicial</strong> de determinada região do Amazonas com grande expansão populacional e econômica. A criação, alteração ou extinção de unidades judiciárias <u>deve respeitar rigorosamente as disposições da lei de organização judiciária</u>, e não depender apenas de uma decisão informal de uma unidade local ou servidor.
          </p>
          <p className="leading-relaxed font-semibold text-purple-900">
            Essa é a importância da LC nº 261/2023: estabelecer a estrutura legal segura para o funcionamento e a organização da Justiça estadual.
          </p>
        </div>
      </section>

      {/* SEÇÃO 6: ATIVIDADE PRÁTICA OBRIGATÓRIA (MAPA CONCEITUAL) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900/5 via-indigo-900/5 to-white border-2 border-purple-300 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-700 font-black text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Atividade Prática — Produção Individual</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Mapa Conceitual da LC nº 261/2023 + Resumo da Aula
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600 text-white font-black text-xs shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>Entrega hoje até 19h30</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Crie um mapa conceitual com o título central <strong>“Lei Complementar nº 261/2023 — TJAM”</strong> e cinco ramificações essenciais. Em cada ramificação, escreva uma explicação com suas próprias palavras e acrescente um exemplo prático. Não copie apenas os títulos da lei.
        </p>

        {/* 5 Ramificações Interativas */}
        <div className="space-y-3">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
            Selecione uma ramificação para estudar o modelo esperado:
          </span>
          <div className="flex flex-wrap gap-2">
            {branches.map((b, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBranch(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBranch === idx
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{b.titulo}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2 text-xs">
            <div className="font-black text-purple-900 text-sm">
              {branches[activeBranch].titulo}
            </div>
            <div>
              <strong className="text-slate-800">Explicação Conceitual:</strong>{' '}
              <span className="text-slate-600">{branches[activeBranch].explicacao}</span>
            </div>
            <div>
              <strong className="text-emerald-800">Exemplo Prático Aplicado:</strong>{' '}
              <span className="text-slate-600">{branches[activeBranch].exemplo}</span>
            </div>
          </div>
        </div>

        {/* Formulário de Produção do Aluno */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
          <h4 className="font-black text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Preencha seus dados para entrega ao professor</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nome do(a) Aluno(a):</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  localStorage.setItem('tjam_student_name', e.target.value);
                }}
                placeholder="Ex: Pedro Ferreira"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Exemplo Prático Pessoal:</label>
              <input
                type="text"
                value={studentExemplo}
                onChange={(e) => setStudentExemplo(e.target.value)}
                placeholder="Ex: Criação de vara especializada em comarca do interior do Amazonas"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-purple-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">
              Resumo da Aula (o que aprendeu e importância para o TJAM):
            </label>
            <textarea
              rows={3}
              value={studentResumo}
              onChange={(e) => setStudentResumo(e.target.value)}
              placeholder="Escreva com suas próprias palavras um resumo de 3 a 5 linhas sobre a LC nº 261/2023..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopyReport}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copiado com Sucesso!' : 'Copiar Resumo Formatado'}</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Atividade ao Professor via WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: FONTES OFICIAIS E VÍDEO AULA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="text-slate-700 font-medium">
              Fonte oficial: <strong>Lei Complementar nº 261/2023 — TJAM</strong>
            </span>
          </div>
          <a
            href={legislacaoTjamPracticalTask.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Ver Norma</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="text-slate-700 font-medium">
              Vídeo aula oficial enviada pelo aluno
            </span>
          </div>
          <a
            href={legislacaoTjamVideoInfo.externalUrl}
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
          <span>{isLessonCompleted ? '✓ 2ª Aula Concluída (Clique para alternar)' : 'Marcar 2ª Aula como Concluída'}</span>
        </button>

        <button
          onClick={() => onNavigateTab('questoes')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <span>Resolver as 20 Questões da 2ª Aula</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </article>
  );
};
