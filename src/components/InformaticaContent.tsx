import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Key,
  UserCheck,
  AlertOctagon,
  Fish,
  Brain,
  Shield,
  HardDrive,
  CheckCircle2,
  Check,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  Bookmark,
  FileText,
  Layers,
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

interface InformaticaContentProps {
  isDarkMode: boolean;
  isLessonCompleted: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const InformaticaContent: React.FC<InformaticaContentProps> = ({
  isDarkMode,
  isLessonCompleted,
  onToggleCompleted,
  onNavigateTab,
}) => {
  const [activeSection, setActiveSection] = useState<string>('todos');
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_checklist_informatica');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      cid: false,
      senhas: false,
      mfa: false,
      malware: false,
      phishing: false,
      engsocial: false,
      firewall: false,
      antivirus: false,
      backup: false,
      tabela: false,
    };
  });

  const toggleCheck = (k: string) => {
    setChecklist((prev) => {
      const updated = { ...prev, [k]: !prev[k] };
      try {
        localStorage.setItem('tjam_checklist_informatica', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Header Objectives */}
      <section
        className={`p-6 sm:p-7 rounded-3xl border shadow-sm ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-cyan-50/50 border-cyan-100'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-600 text-white shadow-sm">
            💻 2ª Aula de Hoje • Informática TJAM
          </span>
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 40 min sugeridos
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-cyan-900 dark:text-cyan-300 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" /> Segurança da Informação: Princípios CID, Ameaças & Defesas
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          Nesta aula essencial para o concurso do TJAM (Assistente Judiciário), você dominará desde os princípios basilares da tríade CID até os vetores de ataque mais recorrentes em provas (Ransomware, Phishing, Engenharia Social) e os mecanismos de blindagem e redundância (Firewall, MFA e Regra 3-2-1).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Tríade CID (Confidencialidade, Integridade, Disponibilidade)</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Senhas Fortes & Autenticação Multifator (MFA)</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Malwares: Vírus, Worm, Trojan e Ransomware</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Phishing x Engenharia Social</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Firewall x Antivírus (Diferença Crucial)</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Backup e a Estratégia Regra 3-2-1</span>
          </div>
        </div>
      </section>

      {/* 1. O que é Segurança da Informação? Tríade CID */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            1
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            1. O que é Segurança da Informação?
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          A <strong>Segurança da Informação</strong> é o conjunto de medidas, políticas, ferramentas e procedimentos utilizados para proteger informações e sistemas contra <strong>acesso indevido, alteração, perda, destruição ou indisponibilidade</strong>.
        </p>

        <p className="text-sm leading-relaxed">
          Os três princípios fundamentais que regem toda a segurança de dados e redes são universalmente conhecidos pela sigla <strong>CID</strong> (ou em inglês <em>CIA: Confidentiality, Integrity, Availability</em>):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Confidencialidade */}
          <div className={`p-5 rounded-2xl border space-y-2.5 transition-all ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 block">Princípio C</span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">🔒 Confidencialidade</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Garante que a informação seja acessada <strong>somente por pessoas ou sistemas expressamente autorizados</strong>. Protege contra o vazamento e o acesso indevido ou ilegítimo.
            </p>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-[11px] font-medium text-amber-800 dark:text-amber-300">
              📌 <strong>Exemplo TJAM:</strong> Somente servidores autorizados ou as partes habilitadas podem acessar determinado processo que corre em segredo de justiça.
            </div>
          </div>

          {/* Integridade */}
          <div className={`p-5 rounded-2xl border space-y-2.5 transition-all ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">Princípio I</span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">🛡️ Integridade</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Garante que a informação <strong>não seja alterada, excluída ou corrompida indevidamente</strong> ou sem autorização, preservando sua exatidão e completude.
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
              📌 <strong>Exemplo TJAM:</strong> Uma sentença ou certidão judicial anexada ao PJe não pode ser modificada por um usuário sem autorização legal.
            </div>
          </div>

          {/* Disponibilidade */}
          <div className={`p-5 rounded-2xl border space-y-2.5 transition-all ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-500 block">Princípio D</span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">⚡ Disponibilidade</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Garante que a informação e os sistemas estejam <strong>disponíveis e acessíveis quando necessários</strong> aos usuários autorizados.
            </p>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-[11px] font-medium text-cyan-800 dark:text-cyan-300">
              📌 <strong>Exemplo TJAM:</strong> O portal de processos eletrônicos do Tribunal deve estar funcionando quando o servidor ou advogado precisar utilizá-lo.
            </div>
          </div>
        </div>

        {/* Caixa Decore */}
        <div className="p-5 rounded-2xl bg-cyan-500/10 border-2 border-cyan-500/30 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-600 text-white font-black text-xs shrink-0 shadow-md">
            🎯 DECORE
          </div>
          <div>
            <h4 className="text-xs font-black text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
              Para Nunca Mais Esquecer a Tríade CID:
            </h4>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
              <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-cyan-500/20">
                <strong className="text-cyan-600 dark:text-cyan-400">C =</strong> Quem pode acessar (Sigilo).
              </div>
              <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-cyan-500/20">
                <strong className="text-cyan-600 dark:text-cyan-400">I =</strong> Informação correta, sem alteração indevida.
              </div>
              <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-cyan-500/20">
                <strong className="text-cyan-600 dark:text-cyan-400">D =</strong> Informação disponível quando demandada.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Senhas */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            2
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            2. 🔑 Senhas
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          A senha é o método mais tradicional de autenticação. Para assegurar a proteção de credenciais corporativas e pessoais, uma senha segura deve, preferencialmente:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Ser longa:</strong> preferencialmente com mais de 12 a 16 caracteres.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Variar caracteres:</strong> mesclar letras maiúsculas e minúsculas (A-Z, a-z).</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Conter números:</strong> inserir algarismos não sequenciais (0-9).</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Caracteres especiais:</strong> incluir símbolos (!, @, #, $, %, etc.).</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Ser única:</strong> utilizar senha diferente para cada serviço ou aplicação.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Sem dados óbvios:</strong> não usar nomes, aniversários ou placas de carro.</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>⚠️ <strong>Atenção:</strong> Evite utilizar a mesma senha em vários serviços. Se um serviço for comprometido, todas as suas contas estarão vulneráveis!</span>
        </div>
      </section>

      {/* 3. Autenticação & MFA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            3
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            3. 👤 Autenticação & Autenticação Multifator (MFA)
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          <strong>Autenticação</strong> é o processo formal de <strong>verificar quem é o usuário</strong> antes de conceder acesso aos recursos do sistema.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">🔑 Senha</div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">🔢 PIN numérico</div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">👆 Impressão digital</div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">👁️ Reconhecimento facial</div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 col-span-2 sm:col-span-1">📲 Código via celular</div>
        </div>

        <div className={`p-5 rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
        }`}>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-sm text-indigo-900 dark:text-indigo-300">
              Autenticação Multifator (MFA / 2FA)
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            A Autenticação Multifator utiliza <strong>mais de um fator de identificação de categorias distintas</strong> para confirmar a identidade do usuário. Mesmo que a senha seja descoberta por terceiros, o criminoso não conseguirá acessar a conta sem o segundo fator.
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300/40 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            👉 <strong>Exemplo clássico de MFA:</strong> Senha alfanumérica digitada no computador + código de verificação recebido no celular (SMS ou app autenticador).
          </div>
        </div>
      </section>

      {/* 4. Malware */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            4
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            4. 🦠 Malware (Softwares Maliciosos)
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          <strong>Malware</strong> (abreviação de <em>Malicious Software</em>) é o termo genérico para qualquer software criado para realizar ações maliciosas, danificar ou obter acesso não autorizado a dispositivos e redes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vírus */}
          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="font-black text-xs text-rose-500 uppercase flex items-center gap-1.5">
              🦠 Vírus
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Programa malicioso que se anexa a outros arquivos ou programas. Pode se replicar e infectar o sistema, dependendo da <strong>execução pelo usuário</strong> para agir.
            </p>
          </div>

          {/* Worm */}
          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="font-black text-xs text-amber-500 uppercase flex items-center gap-1.5">
              🪱 Worm (Verme da Rede)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Consegue <strong>se espalhar automaticamente por redes ou sistemas</strong>, sem depender necessariamente da ação do usuário para se propagar.
            </p>
          </div>

          {/* Cavalo de Troia */}
          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="font-black text-xs text-purple-500 uppercase flex items-center gap-1.5">
              🐴 Cavalo de Troia (Trojan)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>Apresenta-se como um programa legítimo</strong>, inofensivo ou útil (ex.: jogo, utilitário), mas executa ações maliciosas ocultas no sistema.
            </p>
          </div>

          {/* Ransomware */}
          <div className={`p-4 rounded-2xl border space-y-1.5 border-rose-500/30 ${
            isDarkMode ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50 border-rose-200'
          }`}>
            <span className="font-black text-xs text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1.5">
              🔐 Ransomware (Malware de Extorsão)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Malware que <strong>bloqueia ou criptografa dados</strong> do usuário/órgão e exige <strong>pagamento de resgate</strong> para tentar devolver o acesso.
            </p>
          </div>
        </div>

        {/* Pegadinha de Prova */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-amber-800 dark:text-amber-300 uppercase font-black block mb-0.5">
              🎯 Pegadinha FGV:
            </strong>
            <span className="text-slate-700 dark:text-slate-300">
              Ransomware <strong>não é simplesmente "qualquer vírus"</strong>; em questões de concurso, ele é caracterizado primordialmente pela <strong>extorsão mediante bloqueio ou criptografia de arquivos</strong> e solicitação de resgate financeiro.
            </span>
          </div>
        </div>
      </section>

      {/* 5. Phishing */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            5
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            5. 🎣 Phishing
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          <strong>Phishing</strong> ("pescaria") é uma tentativa de enganar a vítima para induzi-la a fornecer informações sensíveis e confidenciais, tais como senhas, dados bancários, documentos pessoais ou códigos de autenticação.
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <span className="font-extrabold text-cyan-600 dark:text-cyan-400 block uppercase">
            Principais Meios de Disseminação:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border text-center">📧 E-mail</span>
            <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border text-center">💬 SMS (Smishing)</span>
            <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border text-center">📱 WhatsApp / Telegram</span>
            <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border text-center">🌐 Sites falsos / clones</span>
            <span className="p-2 rounded-lg bg-white dark:bg-slate-800 border text-center">👥 Redes sociais</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-slate-700 dark:text-slate-300 space-y-1">
          <span className="font-black text-amber-800 dark:text-amber-300 block">Exemplo Clássico em Questões:</span>
          <p className="italic text-slate-600 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 p-2.5 rounded-xl border border-amber-500/20">
            “Sua conta institucional do Tribunal será bloqueada em 2 horas por pendência cadastral. Clique imediatamente aqui para confirmar sua senha.”
          </p>
          <p className="pt-1">
            ⚠️ O objetivo principal do atacante é fazer a vítima entregar voluntariamente suas credenciais ou executar um arquivo danoso sob pressão psicológica.
          </p>
        </div>
      </section>

      {/* 6. Engenharia Social */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            6
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            6. 🧠 Engenharia Social
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          <strong>Engenharia Social</strong> é a utilização de <strong>manipulação psicológica</strong> sobre o ser humano para induzir uma pessoa a revelar informações confidenciais, permitir acessos ou realizar determinada ação que comprometa a segurança.
        </p>

        <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-3 text-xs">
          <h4 className="font-black text-cyan-900 dark:text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-600" /> 📌 Diferença Fundamental para a Prova:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-500/20">
              <strong className="text-cyan-600 dark:text-cyan-400 block mb-1">🎣 Phishing:</strong>
              Uma <em>técnica específica</em> de fraude e enganamento, frequentemente realizada por meio de mensagens, páginas e e-mails falsificados.
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-500/20">
              <strong className="text-cyan-600 dark:text-cyan-400 block mb-1">🧠 Engenharia Social:</strong>
              Conceito <em>muito mais amplo</em> de manipulação psicológica da confiança, medo, curiosidade ou prestatividade humana (pode ocorrer inclusive por telefone ou presencialmente).
            </div>
          </div>
        </div>
      </section>

      {/* 7. Firewall */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            7
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            7. 🛡️ Firewall
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          O <strong>firewall</strong> (muro de fogo) funciona como uma <strong>barreira de segurança de rede</strong> que inspeciona, permite ou bloqueia o tráfego de dados entre redes (ou entre a Internet e o computador local) com base em regras de segurança predefinidas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong>🚫 Bloqueio de conexões:</strong> impede acessos externos não autorizados ou portas suspeitas.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong>🚦 Controle de tráfego:</strong> monitora fluxos de pacotes de dados de entrada e saída.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong>🛡️ Redução de riscos:</strong> fecha brechas de exposição direta de computadores da rede à Internet.
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2.5">
          <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />
          <span>⚠️ <strong>REGRA DE OURO PARA CONCURSOS:</strong> O Firewall <u>NÃO SUBSTITUI</u> o antivírus! O firewall filtra conexões de rede; o antivírus detecta e remove arquivos maliciosos já presentes no disco ou na memória.</span>
        </div>
      </section>

      {/* 8. Antivírus */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            8
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            8. 🦺 Antivírus
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          O <strong>antivírus</strong> é um software voltado a identificar, bloquear, colocar em quarentena e/ou remover determinados tipos de malware existentes no armazenamento ou em execução no sistema operacional.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-cyan-600 dark:text-cyan-400 block uppercase">1. Detecção por Assinatura</span>
            <p className="text-slate-600 dark:text-slate-400">
              Compara arquivos com um banco de dados de impressões digitais (assinaturas) de vírus conhecidos. Exige atualizações constantes de vacina.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-cyan-600 dark:text-cyan-400 block uppercase">2. Análise Comportamental (Heurística)</span>
            <p className="text-slate-600 dark:text-slate-400">
              Monitora ações em tempo real. Se um programa tenta modificar arquivos essenciais do sistema ou criptografar pastas em massa, o antivírus bloqueia a conduta suspeita.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Backup & Regra 3-2-1 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            9
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            9. 💾 Backup & A Regra 3-2-1
          </h2>
        </div>

        <p className="text-sm leading-relaxed">
          <strong>Backup</strong> é a realização de uma <strong>cópia de segurança</strong> dos dados para restauração rápida e íntegra. É vital para a continuidade dos serviços do Judiciário após exclusões acidentais, falhas de disco, corrupção de banco de dados ou ataques de ransomware.
        </p>

        <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-900/80 via-slate-900 to-indigo-950 text-white border border-cyan-500/30 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" /> A Famosa Estratégia Corporativa
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 text-[10px] font-bold">
              Cobrada em Concursos
            </span>
          </div>

          <h3 className="text-lg font-black text-white">
            🎯 A Regra de Backup 3-2-1
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-2xl font-black text-cyan-400 block">3</span>
              <strong className="text-white block">Cópias dos dados</strong>
              <p className="text-slate-300 text-[11px]">A cópia de trabalho original + 2 backups de segurança.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-2xl font-black text-cyan-400 block">2</span>
              <strong className="text-white block">Tipos de mídia</strong>
              <p className="text-slate-300 text-[11px]">Guardar em tecnologias distintas (ex.: HD interno + fita/NAS).</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-2xl font-black text-cyan-400 block">1</span>
              <strong className="text-white block">Cópia fora do local</strong>
              <p className="text-slate-300 text-[11px]">1 cópia em local externo ou nuvem (off-site) contra incêndios ou roubos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Tabela Resumo para a Prova */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 border-l-4 border-cyan-600 pl-3">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-sm">
            10
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            🎯 Tabela Resumo para a Prova
          </h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Guarde este quadro mental para gabaritar as questões da banca FGV:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-black uppercase text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Conceito</th>
                <th className="py-3 px-4">O que lembrar na hora da prova</th>
                <th className="py-3 px-4">Palavra-Chave / Destaque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">🔒 Confidencialidade</td>
                <td className="py-3 px-4">Acesso somente por autorizados.</td>
                <td className="py-3 px-4 font-bold">Sigilo / Não vazamento</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">🛡️ Integridade</td>
                <td className="py-3 px-4">Informação não alterada indevidamente.</td>
                <td className="py-3 px-4 font-bold">Sem alteração / Exatidão</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-cyan-600 dark:text-cyan-400">⚡ Disponibilidade</td>
                <td className="py-3 px-4">Informação disponível quando necessária.</td>
                <td className="py-3 px-4 font-bold">Acesso garantido</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-rose-600 dark:text-rose-400">🦠 Vírus</td>
                <td className="py-3 px-4">Malware que infecta arquivos e pode se replicar.</td>
                <td className="py-3 px-4 font-bold">Depende do usuário executar</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-purple-600 dark:text-purple-400">🪱 Worm</td>
                <td className="py-3 px-4">Propagação automática através de redes.</td>
                <td className="py-3 px-4 font-bold">Autônomo / Rede</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">🐴 Trojan (Troia)</td>
                <td className="py-3 px-4">Disfarçado de programa legítimo/útil.</td>
                <td className="py-3 px-4 font-bold">Presente de grego</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-400">🔐 Ransomware</td>
                <td className="py-3 px-4">Bloqueio/criptografia de arquivos + extorsão financeira.</td>
                <td className="py-3 px-4 font-bold">Resgate / Criptografia</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">🎣 Phishing</td>
                <td className="py-3 px-4">Enganamento eletrônico para obter dados confidenciais.</td>
                <td className="py-3 px-4 font-bold">Pescaria / Links falsos</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">🧠 Engenharia social</td>
                <td className="py-3 px-4">Manipulação psicológica da vítima humana.</td>
                <td className="py-3 px-4 font-bold">Manipulação da pessoa</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-orange-600 dark:text-orange-400">🛡️ Firewall</td>
                <td className="py-3 px-4">Controle e filtragem do tráfego de rede por regras.</td>
                <td className="py-3 px-4 font-bold">Barreira de tráfego (não é antivírus)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-teal-600 dark:text-teal-400">💾 Backup</td>
                <td className="py-3 px-4">Cópia de segurança para recuperação de dados.</td>
                <td className="py-3 px-4 font-bold">Regra 3-2-1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Checklist de Assimilação */}
      <section className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-cyan-600" />
          Checklist de Assimilação — 2ª Aula: Segurança da Informação
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Marque cada tópico assimilado antes de iniciar a resolução das 20 questões:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold">
          {[
            { k: 'cid', text: 'Entendi a tríade CID (Confidencialidade, Integridade, Disponibilidade)' },
            { k: 'senhas', text: 'Sei os critérios para criação de senhas fortes' },
            { k: 'mfa', text: 'Compreendi a Autenticação Multifator (MFA)' },
            { k: 'malware', text: 'Diferenciei Vírus, Worm, Cavalo de Troia e Ransomware' },
            { k: 'phishing', text: 'Identifico as técnicas e canais de Phishing' },
            { k: 'engsocial', text: 'Diferenciei Phishing de Engenharia Social ampla' },
            { k: 'firewall', text: 'Entendi a função do Firewall e por que não substitui o Antivírus' },
            { k: 'antivirus', text: 'Compreendi a detecção por Assinatura e Heurística' },
            { k: 'backup', text: 'Memorizei a Regra 3-2-1 de Backup' },
            { k: 'tabela', text: 'Revisei a Tabela Resumo para a prova FGV' }
          ].map((item) => (
            <button
              key={item.k}
              onClick={() => toggleCheck(item.k)}
              className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                checklist[item.k]
                  ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-900 dark:text-cyan-200 font-bold'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-cyan-300'
              }`}
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                checklist[item.k] ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-400'
              }`}>
                {checklist[item.k] && <Check className="w-3 h-3" />}
              </div>
              <span className="text-xs">{item.text}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Action Bottom Controls */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('questoes')}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-600/20"
              >
                <span>Fazer as 20 Questões Oficiais</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>15 Flashcards</span>
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
            <span>{isLessonCompleted ? '✓ Aula Concluída (Clique para alternar)' : 'Marcar Aula como Concluída'}</span>
          </button>
        )}
      </div>
    </article>
  );
};
