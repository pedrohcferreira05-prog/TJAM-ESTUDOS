import React, { useState } from 'react';
import {
  Scale,
  Shield,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  Brain,
  Play,
  ExternalLink,
  Target,
  Send,
  Building2,
  Bookmark,
  FileCheck2,
  Copy,
  ChevronDown,
  ChevronUp,
  FileText,
  Lock,
  Eye,
  Users,
  Compass,
  ArrowRight,
  ShieldAlert,
  Flame,
  MessageSquare
} from 'lucide-react';
import {
  direitoConstAula2PracticalTask,
  direitoConstAula2SummaryPoints
} from '../data/direitoConstitucionalAula2LessonData';

interface DireitoConstitucionalAula2ContentProps {
  isDarkMode?: boolean;
  isLessonCompleted: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const DireitoConstitucionalAula2Content: React.FC<DireitoConstitucionalAula2ContentProps> = ({
  isLessonCompleted,
  onToggleCompleted,
  onNavigateTab,
}) => {
  // Reading checklist state with localStorage
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_direito_const_aula02');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      conceito_direitos_garantias: false,
      art5_caput_cinco_direitos: false,
      principio_igualdade_isonomia: false,
      direito_vida_dignidade: false,
      liberdades_vedacao_anonimato: false,
      direito_reuniao_requisitos: false,
      inviolabilidade_domicilio_excecoes: false,
      sigilo_comunicacoes_dados: false,
      tabela_remedios_constitucionais: false,
      aplicacao_pratica_servidor_tjam: false,
    };
  });

  const toggleChecklistItem = (key: string) => {
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('tjam_checklist_direito_const_aula02', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const checklistTotal = Object.keys(checklist).length;
  const checklistCompleted = Object.values(checklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistCompleted / checklistTotal) * 100);

  // Remedios Constitucionais Interactive Tabs
  const [activeRemedio, setActiveRemedio] = useState<'hc' | 'hd' | 'ms' | 'mi' | 'ap'>('hc');

  // Practical simulator state
  const [simulatorScenario, setSimulatorScenario] = useState<number>(0);
  const [simAnswer, setSimAnswer] = useState<number | null>(null);

  // Practical Task State
  const [taskStudentName, setTaskStudentName] = useState<string>('');
  const [taskSelectedRight, setTaskSelectedRight] = useState<string>('igualdade');
  const [taskPracticalExample, setTaskPracticalExample] = useState<string>('');
  const [taskConductExplanation, setTaskConductExplanation] = useState<string>('');
  const [taskCopied, setTaskCopied] = useState<boolean>(false);

  const remediosData = {
    hc: {
      nome: 'Habeas Corpus (HC)',
      artigo: 'Art. 5º, LXVIII',
      objeto: 'Proteção da Liberdade de Locomoção (ir, vir e permanecer)',
      requisito: 'Violência ou coação decorrente de ilegalidade ou abuso de poder',
      legitimidade: 'Qualquer pessoa (física ou jurídica, nacional ou estrangeira, dispensado advogado)',
      custas: 'Ação GRATUITA por determinação constitucional (art. 5º, LXXVII)',
      exemploTjam: 'Cidadão preso provisoriamente por excesso de prazo sem decisão fundamentada do juízo.',
      dicaProva: 'Pegadinha Cebraspe: NÃO cabe HC contra imposição de pena de multa nem perda de cargo público!'
    },
    hd: {
      nome: 'Habeas Data (HD)',
      artigo: 'Art. 5º, LXXII',
      objeto: 'Acesso e retificação de informações pessoais do impetrante em registros governamentais ou de caráter público',
      requisito: 'Exige recusa administrativa prévia (Súmula Vinculante 2 do STF)',
      legitimidade: 'Ação personalíssima (somente o titular dos dados; herdeiros em situações restritas)',
      custas: 'Ação GRATUITA por determinação constitucional (art. 5º, LXXVII)',
      exemploTjam: 'Servidor requer certidão de sua ficha funcional mantida no setor de recursos humanos do TJAM e tem o pedido negado injustificadamente.',
      dicaProva: 'Habeas Data protege dados PRÓPRIOS (da pessoa do impetrante). Informações de terceiros ou de interesse coletivo exigem Mandado de Segurança!'
    },
    ms: {
      nome: 'Mandado de Segurança (MS)',
      artigo: 'Art. 5º, LXIX e LXX',
      objeto: 'Direito Líquido e Certo não amparado por HC ou HD',
      requisito: 'Prova documental pré-constituída (não há dilação probatória) praticado por autoridade pública',
      legitimidade: 'Individual (qualquer pessoa lesada) ou Coletivo (partido político com representação no Congresso, sindicato ou associação há mais de 1 ano)',
      custas: 'NÃO é gratuito (salvo se o impetrante for beneficiário da justiça gratuita)',
      exemploTjam: 'Candidato aprovado dentro das vagas do concurso do TJAM que não é nomeado dentro do prazo de validade.',
      dicaProva: 'Caráter RESIDUAL: se couber HC ou HD, JAMAIS caberá Mandado de Segurança!'
    },
    mi: {
      nome: 'Mandado de Injunção (MI)',
      artigo: 'Art. 5º, LXXI',
      objeto: 'Combater a omissão legislativa que inviabiliza direitos e liberdades constitucionais',
      requisito: 'Ausência de norma regulamentadora que impeça a eficácia de norma constitucional de eficácia limitada',
      legitimidade: 'Pessoas prejudicadas pela falta de regulamentação (individual ou coletivo)',
      custas: 'Possui custas normais (não é gratuito pela CF)',
      exemploTjam: 'Servidores públicos reivindicando o exercício do direito de greve antes da edição de lei específica (STF aplicou a lei da iniciativa privada).',
      dicaProva: 'MI não cria lei, mas garante a eficácia do direito no caso concreto conforme Lei 13.300/2016.'
    },
    ap: {
      nome: 'Ação Popular (AP)',
      artigo: 'Art. 5º, LXXIII',
      objeto: 'Anular ato lesivo ao patrimônio público, moralidade administrativa, meio ambiente ou patrimônio histórico/cultural',
      requisito: 'Ato ilegal e lesivo à coisa pública ou à moralidade',
      legitimidade: 'Exclusiva de CIDADÃO (brasileiro no gozo de direitos políticos, comprovado por título de eleitor)',
      custas: 'Isenta de custas e de ônus de sucumbência, salvo comprovada má-fé',
      exemploTjam: 'Cidadão de Manaus ajuíza ação popular para anular licitação fraudulenta de compra de equipamentos de informática no Judiciário.',
      dicaProva: 'Pessoa jurídica e estrangeiros NÃO podem propor Ação Popular! Somente pessoa física eleitora regular!'
    }
  };

  const simulatorScenarios = [
    {
      titulo: 'Cenário 1: Mandado Judicial à Noite',
      situacao: 'Uma equipe policial chega à residência de um investigado às 22h30 portando um mandado de busca e apreensão deferido pelo juiz plantonista do TJAM. Não há flagrante delito nem situação de socorro. O morador se recusa a abrir a porta.',
      pergunta: 'À luz do art. 5º, XI, da Constituição Federal, como essa situação deve ser analisada?',
      opcoes: [
        {
          texto: 'A polícia pode ingressar imediatamente, pois a ordem é judicial e tem fé pública.',
          correta: false,
          explicacao: 'Incorreto. A determinação judicial é uma exceção estrita que SÓ PODE ser cumprida DURANTE O DIA.'
        },
        {
          texto: 'A polícia NÃO pode ingressar sem consentimento do morador à noite, mesmo munida de mandado judicial.',
          correta: true,
          explicacao: 'Correto! Conforme o art. 5º, XI, o mandado judicial só autoriza o ingresso durante o dia (compreendido entre 6h e 18h ou com luz solar). À noite, só se admite entrada sem consentimento em caso de flagrante delito, desastre ou socorro.'
        },
        {
          texto: 'A polícia só poderia ingressar se o juiz estivesse fisicamente presente no local.',
          correta: false,
          explicacao: 'Incorreto. A presença do juiz não afasta a vedação constitucional de invasão noturna por mandado.'
        }
      ]
    },
    {
      titulo: 'Cenário 2: Atendimento no Balcão e Isonomia',
      situacao: 'No balcão do cartório de uma vara judicial do TJAM, o servidor atende com grande presteza advogados conhecidos, mas ao ser procurado por um jurisdicionado humilde sem advogado, que busca orientações sobre uma audiência de pensão, responde rudemente e diz para "procurar na internet".',
      pergunta: 'Qual princípio constitucional foi violado pelo servidor público?',
      opcoes: [
        {
          texto: 'Nenhum princípio, pois o servidor não é obrigado a dar consultoria jurídica.',
          correta: false,
          explicacao: 'Incorreto. Embora o servidor não preste consultoria privativa da advocacia, tem o dever de prestar informações processuais com urbanidade e igualdade.'
        },
        {
          texto: 'O Princípio da Igualdade (Art. 5º, caput), a Dignidade da Pessoa Humana e o Direito de Informação (Art. 5º, XXXIII).',
          correta: true,
          explicacao: 'Correto! O caput do art. 5º veda discriminações de qualquer natureza. O servidor deve dispensar a todo cidadão tratamento digno, impessoal e prestar as informações sobre atos de seu processo.'
        },
        {
          texto: 'Apenas o princípio da celeridade processual.',
          correta: false,
          explicacao: 'Incorreto. O foco central é a violação à isonomia e dignidade no atendimento ao público.'
        }
      ]
    },
    {
      titulo: 'Cenário 3: Direito de Reunião em Praça Pública',
      situacao: 'Um grupo de servidores e concursados organiza uma manifestação pacífica e desarmada na Praça São Sebastião, em frente ao Teatro Amazonas em Manaus, para defender valorização da carreira judiciária. Eles protocolaram comunicado prévio à Secretaria de Segurança 48h antes.',
      pergunta: 'A autoridade policial pode proibir o ato alegando que os manifestantes "não solicitaram autorização prévia"?',
      opcoes: [
        {
          texto: 'Sim, qualquer reunião em espaço público depende de autorização do prefeito ou do delegado.',
          correta: false,
          explicacao: 'Incorreto. O art. 5º, XVI, consagra que a reunião INDEPENDE DE AUTORIZAÇÃO.'
        },
        {
          texto: 'Não, pois o direito de reunião independe de autorização, bastando prévio aviso à autoridade para evitar conflito de locais.',
          correta: true,
          explicacao: 'Correto! O art. 5º, XVI, exige somente que seja pacífica, sem armas, em locais abertos e com PRÉVIO AVISO (não autorização), para garantir segurança e trânsito.'
        },
        {
          texto: 'Sim, porque servidores e concurseiros não podem manifestar pensamento em praça pública.',
          correta: false,
          explicacao: 'Incorreto. A livre manifestação é assegurada a todos, com a vedação exclusiva do anonimato.'
        }
      ]
    }
  ];

  const handleCopyTask = () => {
    const text = `*ATIVIDADE PRÁTICA — AULA 02: DIREITO CONSTITUCIONAL (TJAM 2026)*
*Aluno(a):* ${taskStudentName || 'Aluno do TJAM'}
*Tema:* Direitos e Garantias Fundamentais (Art. 5º da CF/88)

*1. Direito Selecionado:* ${taskSelectedRight}
*2. Situação Prática no Judiciário:*
${taskPracticalExample || 'Demonstração prática de respeito à igualdade e remédios constitucionais no balcão do tribunal.'}

*3. Conduta e Postura do Servidor do TJAM:*
${taskConductExplanation || 'O assistente judiciário deve agir com impessoalidade, cordialidade e respeito estrito aos direitos fundamentais e sigilo legal.'}

_Enviado pelo Portal de Estudos TJAM - Preparatório Nível Intermediário_`;

    navigator.clipboard.writeText(text);
    setTaskCopied(true);
    setTimeout(() => setTaskCopied(false), 3000);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `*ATIVIDADE PRÁTICA — AULA 02: DIREITO CONSTITUCIONAL (TJAM 2026)*\n` +
      `*Aluno(a):* ${taskStudentName || 'Aluno TJAM'}\n` +
      `*Tema:* Direitos e Garantias Fundamentais (Art. 5º da CF/88)\n\n` +
      `*1. Direito/Garantia Escolhido:* ${taskSelectedRight}\n\n` +
      `*2. Situação Prática no TJAM:*\n${taskPracticalExample || '(Preenchido pelo aluno no Portal)'}\n\n` +
      `*3. Conduta Recomendada ao Servidor:*\n${taskConductExplanation || '(Preenchido pelo aluno no Portal)'}\n\n` +
      `_Envio Oficial pelo Portal de Estudos TJAM_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-xl border border-indigo-700/30">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              Direito Constitucional • Aula 02 • Nível Intermediário TJAM
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Direitos e Garantias Fundamentais</span>
            </h1>
            <p className="text-indigo-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              O núcleo inegociável da Constituição Cidadã de 1988: o <strong className="text-white">Art. 5º</strong>, seus 5 bens protegidos no caput (Vida, Liberdade, Igualdade, Segurança e Propriedade), as liberdades individuais, a inviolabilidade domiciliar e o catálogo dos <strong className="text-white">Remédios Constitucionais</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onToggleCompleted}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 ${
                isLessonCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                  : 'bg-white hover:bg-slate-100 text-indigo-950 shadow-white/10'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 ${isLessonCompleted ? 'text-white' : 'text-indigo-600'}`} />
              <span>{isLessonCompleted ? 'Aula Concluída ✓' : 'Marcar Aula Concluída'}</span>
            </button>
          </div>
        </div>

        {/* Reading Progress Checklist bar */}
        <div className="mt-6 pt-5 border-t border-indigo-800/40">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-indigo-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Progresso do Roteiro de Leitura Guiada ({checklistCompleted}/{checklistTotal})
            </span>
            <span className="text-indigo-200 font-bold">{checklistPercent}%</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-indigo-900/50">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Navigation Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab && onNavigateTab('conteudo')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 font-bold text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all text-center"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Texto da Aula</span>
        </button>
        <button
          onClick={() => onNavigateTab && onNavigateTab('questoes')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 font-bold text-xs hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all text-center"
        >
          <Target className="w-4 h-4 shrink-0" />
          <span>20 Exercícios TJAM</span>
        </button>
        <button
          onClick={() => onNavigateTab && onNavigateTab('cards')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all text-center"
        >
          <Brain className="w-4 h-4 shrink-0" />
          <span>10 Flashcards</span>
        </button>
        <button
          onClick={() => onNavigateTab && onNavigateTab('resumo')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all text-center"
        >
          <FileCheck2 className="w-4 h-4 shrink-0" />
          <span>Resumo & Metas</span>
        </button>
      </div>

      {/* Roteiro Checklist Interativo */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Checklist de Fixação: 10 Tópicos Essenciais para Assistente Judiciário
          </h3>
          <span className="text-[11px] font-bold text-slate-500">Marque ao compreender</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {[
            { id: 'conceito_direitos_garantias', label: '1. Diferença entre Direito (substancial) e Garantia (instrumental)' },
            { id: 'art5_caput_cinco_direitos', label: '2. Caput do Art. 5º: Vida, Liberdade, Igualdade, Segurança, Propriedade' },
            { id: 'principio_igualdade_isonomia', label: '3. Princípio da Igualdade (Isonomia formal e material no TJAM)' },
            { id: 'direito_vida_dignidade', label: '4. Direito à Vida e vedação à tortura e penas cruéis' },
            { id: 'liberdades_vedacao_anonimato', label: '5. Liberdade de manifestação do pensamento (vedado o anonimato)' },
            { id: 'direito_reuniao_requisitos', label: '6. Reunião pacífica: prescinde autorização, exige prévio aviso' },
            { id: 'inviolabilidade_domicilio_excecoes', label: '7. Inviolabilidade do domicílio: as 4 exceções e mandado diurno' },
            { id: 'sigilo_comunicacoes_dados', label: '8. Sigilo das comunicações e limites da interceptação telefônica' },
            { id: 'tabela_remedios_constitucionais', label: '9. Os 5 Remédios: HC (locomoção), HD (dados), MS, MI e Ação Popular' },
            { id: 'aplicacao_pratica_servidor_tjam', label: '10. Atendimento digno, ético e impessoal ao jurisdicionado' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${
                checklist[item.id]
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              <div
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                  checklist[item.id]
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                }`}
              >
                {checklist[item.id] && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Seção 1: O que são Direitos e Garantias Fundamentais? */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
            1
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              O que são Direitos e Garantias Fundamentais?
            </h2>
            <p className="text-xs text-slate-500 font-semibold">Conceito fundamental e distinção clássica de Ruy Barbosa</p>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Os <strong>direitos fundamentais</strong> são prerrogativas asseguradas pela Constituição Federal para proteger a dignidade humana, a liberdade, a igualdade e a segurança das pessoas, estabelecendo limites intransponíveis ao poder punitivo e regulatório do Estado.
        </p>

        {/* Tabela de Comparação Didática */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-black text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              Direito Fundamental (Substancial)
            </div>
            <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
              É a <strong>declaração formal da prerrogativa</strong> ou bem jurídico da pessoa humana. Tem natureza substantiva e diz <em>o que</em> o cidadão possui.
            </p>
            <div className="mt-2 text-[11px] bg-blue-100/70 dark:bg-blue-900/50 p-2 rounded-lg text-blue-900 dark:text-blue-200 font-medium">
              💡 <strong>Exemplos:</strong> Direito à vida, à liberdade de locomoção, à honra, à intimidade, à propriedade.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-black text-sm">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              Garantia Fundamental (Instrumental)
            </div>
            <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
              É o <strong>mecanismo ou instrumento processual</strong> destinado a proteger, assegurar ou tornar efetivo determinado direito violado ou ameaçado.
            </p>
            <div className="mt-2 text-[11px] bg-emerald-100/70 dark:bg-emerald-900/50 p-2 rounded-lg text-emerald-900 dark:text-emerald-200 font-medium">
              💡 <strong>Exemplos:</strong> Habeas Corpus (assegura a locomoção), Mandado de Segurança, Ação Popular, inafastabilidade do Judiciário.
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Regra de Ouro para Concurso:</strong> Se o enunciado descreve o <em>bem tutelado</em>, estamos diante de um <strong>direito</strong>. Se descreve a <em>ferramenta de proteção perante a Justiça</em>, trata-se de uma <strong>garantia</strong>.
          </div>
        </div>
      </section>

      {/* Seção 2: O Caput do Artigo 5º e os 5 Bens Jurídicos */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
            2
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Artigo 5º da Constituição Federal de 1988
            </h2>
            <p className="text-xs text-slate-500 font-semibold">O caput, os destinatários e o mnemônico V-L-I-S-P</p>
          </div>
        </div>

        <blockquote className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border-l-4 border-indigo-600 text-xs sm:text-sm font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
          “Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à <strong>vida</strong>, à <strong>liberdade</strong>, à <strong>igualdade</strong>, à <strong>segurança</strong> e à <strong>propriedade</strong>...”
        </blockquote>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { letra: 'V', nome: 'Vida', desc: 'Existência digna e integridade física/moral', icon: '❤️' },
            { letra: 'L', nome: 'Liberdade', desc: 'Pensamento, locomoção, crença e reunião', icon: '🕊️' },
            { letra: 'I', nome: 'Igualdade', desc: 'Isonomia perante a lei e nos balcões', icon: '⚖️' },
            { letra: 'S', nome: 'Segurança', desc: 'Segurança jurídica e ordem pública', icon: '🛡️' },
            { letra: 'P', nome: 'Propriedade', desc: 'Direito subjetivo com função social', icon: '🏠' },
          ].map((item) => (
            <div key={item.letra} className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
              <span className="text-2xl">{item.icon}</span>
              <div className="text-sm font-black text-indigo-950 dark:text-indigo-200 mt-1">
                {item.letra} — {item.nome}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Alerta de Jurisprudência STF */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Compass className="w-4 h-4 text-indigo-500" />
            Extensão pelo STF: E os Estrangeiros em Trânsito (Turistas)?
          </div>
          <p className="leading-relaxed">
            Embora o caput refira-se textualmente a <em>“brasileiros e estrangeiros residentes”</em>, o <strong>Supremo Tribunal Federal (STF)</strong> pacificou que os direitos e garantias fundamentais essenciais (como vida, liberdade de locomoção, integridade física e devido processo legal) <strong>estendem-se a qualquer estrangeiro que se encontre no território nacional</strong>, inclusive turistas e pessoas em trânsito.
          </p>
        </div>
      </section>

      {/* Seção 3 e 4: Princípio da Igualdade e Direito à Vida */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
            3
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Princípio da Igualdade (Isonomia) e Direito à Vida
            </h2>
            <p className="text-xs text-slate-500 font-semibold">Igualdade formal vs. material e a proteção da existência humana</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 space-y-2">
            <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-600" />
              Isonomia Formal vs. Isonomia Material
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              • <strong>Igualdade Formal:</strong> Aplicação idêntica da lei a todos, sem privilégios ou perseguições estatais.<br/>
              • <strong>Igualdade Material:</strong> Tratar igualmente os iguais e desigualmente os desiguais, na exata medida de suas desigualdades.
            </p>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-purple-900/40 text-purple-950 dark:text-purple-200">
              📌 <strong>No TJAM:</strong> O atendimento prioritário a idosos, gestantes e pessoas com deficiência (LBI) é exemplo direto de aplicação da igualdade material autorizada pela CF.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 space-y-2">
            <h4 className="font-bold text-sm text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Direito à Vida: Limites e Penas Vedadas
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              O direito à vida compreende tanto a <strong>manutenção biológica</strong> quanto a <strong>vida com dignidade</strong>. A CF veda a tortura, tratamento desumano ou degradante.
            </p>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-rose-900/40 text-rose-950 dark:text-rose-200">
              ⚠️ <strong>Pena de Morte no Brasil:</strong> É proibida como regra geral, <em>salvo em caso de guerra declarada</em> (art. 5º, XLVII, "a"). São também vedadas penas de caráter perpétuo, trabalhos forçados ou cruéis.
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: As Liberdades Constitucionais e o Direito de Reunião */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
            4
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Liberdades e o Direito de Reunião (Art. 5º, XVI)
            </h2>
            <p className="text-xs text-slate-500 font-semibold">A vedação ao anonimato e os 4 requisitos da reunião pública</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-500" />
              Manifestação do Pensamento (Inciso IV)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              É plenamente livre a manifestação do pensamento, mas <strong>É VEDADO O ANONIMATO</strong>. Essa proibição assegura o direito de resposta proporcional ao agravo e a reparação por eventuais danos morais ou materiais decorrentes de ofensas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" />
              Direito de Reunião: 4 Requisitos Cumulativos
            </h4>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>Fins pacíficos</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>Sem armas</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>Em locais abertos ao público</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>Prévio aviso à autoridade</strong> (NÃO precisa de autorização!)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seção 6: Inviolabilidade do Domicílio e Sigilos */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
            5
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Inviolabilidade do Domicílio (Art. 5º, XI)
            </h2>
            <p className="text-xs text-slate-500 font-semibold">A casa como asilo inviolável e as 4 exceções constitucionais</p>
          </div>
        </div>

        <blockquote className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-l-4 border-amber-500 text-xs sm:text-sm font-serif italic text-amber-950 dark:text-amber-200 leading-relaxed">
          “A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de <strong>flagrante delito</strong> ou <strong>desastre</strong>, ou para <strong>prestar socorro</strong>, ou, <strong>durante o dia, por determinação judicial</strong>.”
        </blockquote>

        {/* Quadro das 4 Exceções */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
              A QUALQUER HORA (Dia ou Noite)
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              Dispensa autorização do morador e dispensa ordem judicial:
            </p>
            <ul className="space-y-1 font-semibold text-emerald-950 dark:text-emerald-200">
              <li>1. Flagrante delito (crime ocorrendo ou recém-cometido);</li>
              <li>2. Situação de desastre (enchente, desabamento, incêndio);</li>
              <li>3. Prestação de socorro a quem necessite.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
              SOMENTE DURANTE O DIA
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              Exige mandado emitido por autoridade judicial competente:
            </p>
            <ul className="space-y-1 font-semibold text-rose-950 dark:text-rose-200">
              <li>4. Por determinação judicial (cumprimento de mandado).</li>
            </ul>
            <p className="text-[11px] text-rose-900 dark:text-rose-300 italic pt-1">
              ⚠️ A invasão noturna baseada em mandado judicial é ILEGAL e tipifica crime de abuso de autoridade (Lei 13.869/2019)!
            </p>
          </div>
        </div>
      </section>

      {/* Seção 7: Remédios Constitucionais (Garantias Fundamentais) - Painel Interativo */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
            6
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Remédios Constitucionais (Ações Garantidoras)
            </h2>
            <p className="text-xs text-slate-500 font-semibold">Navegue pelas 5 garantias fundamentais mais cobradas pela FGV e Cebraspe</p>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {[
            { id: 'hc', label: 'Habeas Corpus (HC)', badge: 'Gratuito' },
            { id: 'hd', label: 'Habeas Data (HD)', badge: 'Gratuito' },
            { id: 'ms', label: 'Mandado de Segurança (MS)', badge: 'Residual' },
            { id: 'mi', label: 'Mandado de Injunção (MI)', badge: 'Omissão' },
            { id: 'ap', label: 'Ação Popular (AP)', badge: 'Cidadão' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveRemedio(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeRemedio === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                activeRemedio === tab.id ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Remedio Details Card */}
        {(() => {
          const rem = remediosData[activeRemedio];
          return (
            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {rem.artigo}
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{rem.nome}</h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 text-xs font-bold self-start">
                  💰 {rem.custas}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Objeto de Proteção</span>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{rem.objeto}</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Quem pode propor (Legitimidade)</span>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{rem.legitimidade}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Exemplo no TJAM</span>
                <p className="text-slate-700 dark:text-slate-300">{rem.exemploTjam}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Pegadinha Clássica de Concurso:</strong> {rem.dicaProva}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Simulador Interativo de Casos Práticos */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
              ⚖️
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Simulador de Casos Práticos: Cartório & Balcão TJAM
              </h2>
              <p className="text-xs text-slate-500 font-semibold">Treine seu discernimento em situações reais de prova e do cotidiano forense</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            {simulatorScenarios.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSimulatorScenario(idx);
                  setSimAnswer(null);
                }}
                className={`w-7 h-7 rounded-lg transition-all ${
                  simulatorScenario === idx
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {(() => {
          const cur = simulatorScenarios[simulatorScenario];
          return (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider">{cur.titulo}</span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  {cur.situacao}
                </p>
              </div>

              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {cur.pergunta}
              </div>

              <div className="space-y-2">
                {cur.opcoes.map((opt, i) => {
                  const isSelected = simAnswer === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSimAnswer(i)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                        isSelected
                          ? opt.correta
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200 font-semibold'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt.texto}</span>
                      </div>

                      {isSelected && (
                        <div className={`mt-2 pt-2 border-t text-[11px] leading-relaxed ${
                          opt.correta ? 'border-emerald-200 text-emerald-800 dark:text-emerald-300' : 'border-rose-200 text-rose-800 dark:text-rose-300'
                        }`}>
                          {opt.correta ? '✓ Resposta Correta! ' : '✗ Resposta Incorreta. '}
                          {opt.explicacao}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </section>

      {/* Atividade Prática Oficial para Enviar ao Professor */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 dark:border-indigo-800/60 shadow-md space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider">
                Desafio Forense TJAM
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Atividade Prática: Análise de Direitos Fundamentais no TJAM
              </h2>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-indigo-100 dark:border-indigo-900 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <p className="font-semibold text-slate-900 dark:text-white">
            📝 <strong>Enunciado da Atividade:</strong> {direitoConstAula2PracticalTask.scenario}
          </p>
          <p className="leading-relaxed">
            {direitoConstAula2PracticalTask.instruction}
          </p>
        </div>

        {/* Formulário Interativo do Aluno */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Seu Nome Completo (Aluno Concurseiro):
              </label>
              <input
                type="text"
                placeholder="Ex.: Mariana Silva"
                value={taskStudentName}
                onChange={e => setTaskStudentName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Direito/Garantia que você escolheu:
              </label>
              <select
                value={taskSelectedRight}
                onChange={e => setTaskSelectedRight(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Princípio da Igualdade (Art. 5º, caput)">Princípio da Igualdade e Atendimento Humanizado</option>
                <option value="Inviolabilidade do Domicílio (Art. 5º, XI)">Inviolabilidade do Domicílio e Limites do Mandado</option>
                <option value="Habeas Corpus (Art. 5º, LXVIII)">Habeas Corpus e Liberdade de Locomoção</option>
                <option value="Mandado de Segurança (Art. 5º, LXIX)">Mandado de Segurança e Direito Líquido e Certo</option>
                <option value="Direito de Reunião (Art. 5º, XVI)">Direito de Reunião e Prévio Aviso</option>
                <option value="Sigilo da Intimidade e Segredo de Justiça (Art. 5º, X)">Sigilo da Intimidade e Autos Judiciais</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Descreva uma Situação Prática no TJAM envolvendo este direito:
            </label>
            <textarea
              rows={3}
              placeholder="Ex.: Um jurisdicionado sem advogado comparece ao balcão requerendo informações sobre o andamento de seu processo..."
              value={taskPracticalExample}
              onChange={e => setTaskPracticalExample(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Qual deve ser a Conduta Ética e Constitucional do Servidor do TJAM?
            </label>
            <textarea
              rows={3}
              placeholder="Ex.: O servidor deve prestar as informações com clareza e impessoalidade, sem criar barreiras burocráticas ou desrespeito..."
              value={taskConductExplanation}
              onChange={e => setTaskConductExplanation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleSendWhatsApp}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar Atividade ao Professor (WhatsApp)</span>
            </button>

            <button
              onClick={handleCopyTask}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 hover:bg-indigo-200 text-indigo-900 dark:text-indigo-200 font-bold text-xs transition-all border border-indigo-200 dark:border-indigo-800 active:scale-95"
            >
              <Copy className="w-4 h-4" />
              <span>{taskCopied ? 'Copiado com Sucesso! ✓' : 'Copiar Texto'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Rodapé com Direcionamento para Questões */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-base text-white">Pronto para testar seus conhecimentos?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Resolva as 20 questões gabaritadas (10 Objetivas + 5 Cebraspe Certo/Errado + 5 Dissertativas).
          </p>
        </div>
        <button
          onClick={() => onNavigateTab && onNavigateTab('questoes')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shrink-0 active:scale-95"
        >
          <span>Ir para os 20 Exercícios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
