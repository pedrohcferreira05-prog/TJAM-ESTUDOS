import React, { useState } from 'react';
import {
  Folder,
  FileText,
  FileCode,
  HardDrive,
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  RefreshCw,
  FolderPlus,
  Keyboard,
  ShieldCheck,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Zap,
  Cpu,
  Lock,
  Share2,
  Send,
  FileCheck2,
  Layers,
  Sparkles,
  BookOpen,
  Briefcase,
  Play,
  Archive,
  Eye,
  EyeOff,
  Scale
} from 'lucide-react';

interface InformaticaContentProps {
  isDarkMode?: boolean;
  isLessonCompleted?: boolean;
  onToggleCompleted?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const InformaticaContent: React.FC<InformaticaContentProps> = ({
  isDarkMode = false,
  isLessonCompleted = false,
  onToggleCompleted,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'teoria' | 'atalhos' | 'pratica' | 'metas'>('teoria');

  // Checklist interativo das 10 metas da aula
  const [goalsChecklist, setGoalsChecklist] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tjam_metas_informatica_aula01');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
    };
  });

  const toggleGoal = (id: number) => {
    setGoalsChecklist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tjam_metas_informatica_aula01', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Estado da Situação Prática "Organizando os documentos do TJAM"
  const [practicalResponse, setPracticalResponse] = useState<string>(() => {
    try {
      return localStorage.getItem('tjam_pratica_informatica_aula01') || '';
    } catch (e) {
      return '';
    }
  });
  const [practicalSaved, setPracticalSaved] = useState<boolean>(false);

  const handleSavePractical = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practicalResponse.trim()) return;
    try {
      localStorage.setItem('tjam_pratica_informatica_aula01', practicalResponse);
      setPracticalSaved(true);
      setTimeout(() => setPracticalSaved(false), 3500);
    } catch (e) {}
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Nome: Aluno TJAM 2026\nTurma: Assistente Judiciário TJAM\nDisciplina: Informática e Processo Digital\nAula: 01 — Windows: arquivos, pastas e operações\nPrática: Organização de documentos do TJAM\n\nRespostas da Prática:\n${
        practicalResponse || '(Preencha o campo com suas 5 respostas antes de enviar)'
      }`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const videoUrl = "https://youtu.be/muheWXjnHvA?is=KiTn_nN9SbWVq-cV";
  const embedUrl = "https://www.youtube.com/embed/muheWXjnHvA?rel=0";

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300">
      {/* Top Banner da Aula */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-900 via-sky-950 to-slate-900 border border-cyan-500/30 text-white space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-400 text-slate-950 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Folder className="w-3.5 h-3.5" /> 2ª Aula de Hoje (Terça-feira)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Nível Intermediário — TJAM Assistente Judiciário
            </span>
          </div>
          <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> Duração estimada: 45 min
          </span>
        </div>

        <div className="relative z-10 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>💻 Informática e Processo Digital — Aula 01</span>
          </h1>
          <p className="text-lg font-bold text-cyan-300">
            Windows: arquivos, pastas e operações
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Nesta aula, vamos estudar os fundamentos de sistemas operacionais, arquivos, extensões, pastas, caminhos, operações essenciais (copiar, mover, renomear, excluir, lixeira), atalhos de teclado e a introdução ao Processo Judicial Digital (Lei nº 11.419/2006).
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-cyan-500/20 text-xs">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">Sistemas</span>
            <span className="font-extrabold text-white">Windows & SO</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">Estrutura</span>
            <span className="font-extrabold text-white">Arquivos × Pastas</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">Operações</span>
            <span className="font-extrabold text-white">Ctrl+C × Ctrl+X × F2</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">Processo Digital</span>
            <span className="font-extrabold text-white">Lei 11.419/2006</span>
          </div>
        </div>
      </div>

      {/* Subnavegação da Aula */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveSubTab('teoria')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeSubTab === 'teoria'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Teoria Completa (19 Tópicos)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('atalhos')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeSubTab === 'atalhos'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>2. Tabela de Atalhos & Extensões</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('metas')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeSubTab === 'metas'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>3. Metas da Aula (10 Objetivos)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('pratica')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeSubTab === 'pratica'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>4. Prática TJAM (Envio WhatsApp)</span>
        </button>
      </div>

      {/* ABA 1: TEORIA COMPLETA (19 TÓPICOS) */}
      {activeSubTab === 'teoria' && (
        <div className="space-y-6">
          {/* Seção 1: O que é um sistema operacional */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <Cpu className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópico 1</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  1. O que é um Sistema Operacional?
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              O <strong>sistema operacional (SO)</strong> é o software responsável por controlar e administrar os recursos do computador, permitindo a interação entre o usuário, os programas e o hardware.
            </p>

            <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-slate-950 border border-cyan-100 dark:border-slate-800 text-xs">
              <span className="font-bold text-cyan-900 dark:text-cyan-300 block mb-2">Exemplos de Sistemas Operacionais:</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">🪟 Windows</span>
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">🐧 Linux</span>
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">🍏 macOS</span>
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">🤖 Android</span>
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">📱 iOS</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">No computador, o Windows oferece recursos essenciais para:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Executar programas e aplicativos;</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Gerenciar arquivos e documentos;</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Organizar pastas e diretórios;</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Controlar dispositivos (mouse, teclado, impressora);</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Configurar o sistema operacional;</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Acessar redes e conexões de Internet;</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 sm:col-span-2">
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Administrar usuários e níveis de permissões de acesso.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Seção 2 & 3: Arquivos e Extensões */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópicos 2 e 3</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  2. Arquivos & 3. Extensões de Arquivos
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Um <strong>arquivo</strong> é uma unidade de informação armazenada em um dispositivo de armazenamento (disco rígido, SSD, pendrive). Exemplos: documento de texto, imagem, vídeo, planilha, apresentação ou arquivo PDF.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-2">Composição Padrão de um Arquivo:</span>
              <div className="flex items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm sm:text-base">
                <span className="text-cyan-600 dark:text-cyan-400 font-black">concurso_tjam</span>
                <span className="text-amber-500 font-black">.pdf</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-center">
                <span className="text-slate-500 dark:text-slate-400">concurso_tjam → <strong>Nome</strong></span>
                <span className="text-slate-500 dark:text-slate-400">.pdf → <strong>Extensão</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-black text-amber-700 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>⚠️ ATENÇÃO MÁXIMA DE PROVA (PEGADINHA FREQUENTE)</span>
              </div>
              <p>
                Alterar apenas o nome ou a extensão de um arquivo <strong>NÃO</strong> transforma o conteúdo do arquivo em outro formato!
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Por exemplo: renomear <code className="font-bold">documento.pdf</code> para <code className="font-bold">documento.mp3</code> apenas muda a extensão visível, mas não converte o documento PDF em um arquivo de áudio.
              </p>
            </div>
          </section>

          {/* Seção 4 & 5: Pastas e Caminho de um Arquivo */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <Folder className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópicos 4 e 5</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  4. Pastas & 5. Caminho de um Arquivo
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              As <strong>pastas (ou diretórios)</strong> servem para organizar arquivos e outras pastas de forma estruturada. Uma pasta pode conter arquivos + subpastas.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Exemplo de Caminho Absoluto no Windows:</span>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-cyan-600 dark:text-cyan-300 text-xs sm:text-sm break-all">
                C:\Users\Aluno\Documents\TJAM\Português.pdf
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">C:</span> Unidade de disco
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">Users</span> Pasta raiz
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">Aluno</span> Usuário
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">Documents</span> Pasta do sistema
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">TJAM</span> Subpasta
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">Português.pdf</span> Arquivo final
                </div>
              </div>
            </div>
          </section>

          {/* Seção 6, 7 & 8: Criar Pastas, Copiar x Mover e Renomear */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <Copy className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópicos 6, 7 e 8</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  6. Criar Pasta, 7. Copiar × Mover & 8. Renomear
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-slate-950 border border-cyan-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-900 dark:text-cyan-300 font-black">
                  <Copy className="w-4 h-4 text-cyan-600" />
                  <span>📋 COPIAR (Ctrl + C → Ctrl + V)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Cria uma <strong>duplicata</strong> do arquivo em outro local.
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ O arquivo original PERMANECE intacto no local de origem.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-slate-950 border border-sky-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-900 dark:text-sky-300 font-black">
                  <Scissors className="w-4 h-4 text-sky-600" />
                  <span>📦 MOVER (Ctrl + X → Ctrl + V)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Transfere</strong> o arquivo para outro destino.
                </p>
                <p className="text-amber-600 dark:text-amber-400 font-bold">
                  ⚠️ O arquivo DEIXA de permanecer no local original.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">📁 Criar Nova Pasta:</span>
                <p className="text-slate-600 dark:text-slate-400">Botão direito → <em>Novo → Pasta</em> ou pelo atalho:</p>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-mono font-bold text-xs">
                  Ctrl + Shift + N
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">✏️ Renomear Arquivo/Pasta:</span>
                <p className="text-slate-600 dark:text-slate-400">Botão direito → <em>Renomear</em> ou pelo atalho:</p>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-mono font-bold text-xs">
                  F2
                </span>
              </div>
            </div>
          </section>

          {/* Seção 9 & 10: Excluir Arquivos & Lixeira */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <Trash2 className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópicos 9 e 10</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  9. Excluir Arquivos & 10. A Lixeira do Windows
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Ao excluir um arquivo normalmente pelo Explorador de Arquivos (tecla <strong>Delete</strong>), ele é enviado para a <strong>Lixeira</strong>, que funciona como área de armazenamento temporário para itens excluídos do disco local.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-slate-950 border border-emerald-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400">
                  <RefreshCw className="w-4 h-4" />
                  <span>Restaurar</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  O arquivo retorna exatamente ao local de onde foi excluído.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-950 border border-amber-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400">
                  <Trash2 className="w-4 h-4" />
                  <span>Esvaziar a Lixeira</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Os itens armazenados nela são excluídos em definitivo, liberando espaço.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-slate-950 border border-rose-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Excluir Definitivo</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Arquivos em pendrives ou excluídos com <code className="font-bold">Shift+Delete</code> não vão para a Lixeira.
                </p>
              </div>
            </div>
          </section>

          {/* Seção 11: Seleção de Arquivos (Ctrl vs Shift) */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <Keyboard className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópico 11</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  11. Seleção de Arquivos (Ctrl × Shift)
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-600 text-white font-mono text-xs">Ctrl</span>
                  <span>Itens NÃO Consecutivos (Alternados)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Permite selecionar arquivos avulsos e intercalados mantendo <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">Ctrl</kbd> pressionado enquanto clica em cada um.
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                  Ex: Selecionar apenas "Português.pdf" e "Informática.pdf", pulando "Constitucional.docx".
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold">
                  <span className="px-2 py-0.5 rounded-md bg-sky-600 text-white font-mono text-xs">Shift</span>
                  <span>Sequência Contínua de Itens</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Permite selecionar um intervalo contínuo: clica no primeiro item, segura <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">Shift</kbd> e clica no último item da lista.
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                  Ex: Selecionar todos os 30 arquivos da pasta de uma só vez do primeiro ao último.
                </div>
              </div>
            </div>
          </section>

          {/* Seção 13, 14, 15 & 16: Explorador, Arquivos Ocultos, Compactação e Segurança */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <HardDrive className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópicos 13 a 16</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  13. Explorador, 14. Ocultos, 15. Compactação (.zip) & 16. Segurança
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-cyan-500" /> Explorador de Arquivos:
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Gerenciador padrão do Windows para navegar por pastas, copiar, mover, renomear, excluir, pesquisar e organizar unidades de disco.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <EyeOff className="w-4 h-4 text-cyan-500" /> Arquivos Ocultos:
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Arquivos do sistema protegidos para evitar alterações acidentais. <em>Atenção: oculto não significa malicioso, e arquivo visível não é automaticamente seguro!</em>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Archive className="w-4 h-4 text-cyan-500" /> Compactação de Arquivos (.zip):
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Reúne múltiplos arquivos e reduz o espaço necessário para armazenar ou compartilhar por e-mail/processo eletrônico. Requer extrair/descompactar para uso pleno.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Segurança em Órgãos Públicos:
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Cuidado estrito com pendrives externos, anexos suspeitos de e-mails, arquivos executáveis (.exe) e links desconhecidos na rede do Tribunal.
                </p>
              </div>
            </div>
          </section>

          {/* Seção 17, 18 & 19: Processo Digital (Lei 11.419/2006) */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Tópicos 17 a 19</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Processo Judicial Digital — Lei nº 11.419/2006
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>Lei Federal nº 11.419/2006</strong> disciplina a informatização do processo judicial no Brasil, autorizando o uso de meios eletrônicos para tramitação, comunicação de atos, transmissão de peças processuais e armazenamento de autos digitais.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-amber-900 dark:text-amber-300 block">
                  📜 Protocolo Eletrônico e Tempestividade:
                </span>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Os atos consideram-se realizados no <strong>dia e hora do envio</strong> ao sistema do Poder Judiciário, com emissão de recibo eletrônico.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Petições eletrônicas são consideradas <strong>tempestivas</strong> se transmitidas até as <strong>24 horas do último dia do prazo legal</strong>.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  🔒 Segurança dos Autos Eletrônicos:
                </span>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Autenticação & Assinatura Eletrônica:</strong> Garantem autoria inequívoca dos magistrados e partes.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Integridade & Sigilo:</strong> Preservam o conteúdo dos autos sem alterações indevidas, respeitando segredo de justiça.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Player da Videoaula Oficial */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                  <Play className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 tracking-wider">Videoaula Oficial</span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Windows: arquivos, pastas e operações (Aula 01)
                  </h3>
                </div>
              </div>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Abrir no YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
              <iframe
                src={embedUrl}
                title="Vídeo Aula - Informática: Windows, arquivos, pastas e operações"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </section>
        </div>
      )}

      {/* ABA 2: TABELA DE ATALHOS & EXTENSÕES */}
      {activeSubTab === 'atalhos' && (
        <div className="space-y-6">
          {/* Tabela de Atalhos Importantes */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <Keyboard className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópico 12</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Tabela Oficial de Atalhos do Windows
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500">
                    <th className="py-2.5 px-3 font-black">Atalho</th>
                    <th className="py-2.5 px-3 font-black">Função no Sistema</th>
                    <th className="py-2.5 px-3 font-black">Dica Prática no TJAM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Ctrl + C</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Copiar</td>
                    <td className="py-2.5 px-3 text-slate-500">Duplica o arquivo preservando o original na pasta de origem.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Ctrl + X</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Recortar</td>
                    <td className="py-2.5 px-3 text-slate-500">Prepara para mover; o arquivo sairá do local original após colar.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Ctrl + V</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Colar</td>
                    <td className="py-2.5 px-3 text-slate-500">Insere o item copiado ou recortado na pasta de destino atual.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Ctrl + Z</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Desfazer</td>
                    <td className="py-2.5 px-3 text-slate-500">Reverte a última ação imediata (ex.: movimento ou renomeação por engano).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Ctrl + A</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Selecionar tudo</td>
                    <td className="py-2.5 px-3 text-slate-500">Marca instantaneamente todos os arquivos e pastas do diretório.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Ctrl + F</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Localizar / Pesquisar</td>
                    <td className="py-2.5 px-3 text-slate-500">Abre campo de busca em diversos contextos e aplicativos.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">F2</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Renomear item selecionado</td>
                    <td className="py-2.5 px-3 text-slate-500">Habilita a edição direta do nome do arquivo sem precisar de menu de contexto.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Delete</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Excluir para a Lixeira</td>
                    <td className="py-2.5 px-3 text-slate-500">Envia para retenção temporária na Lixeira (recuperável com Restaurar).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">Ctrl + Shift + N</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Criar nova pasta</td>
                    <td className="py-2.5 px-3 text-slate-500">Cria uma nova subpasta imediatamente no diretório atual.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tabela de Extensões Comuns */}
          <section className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <FileCode className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Tópico 3</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Tabela Oficial de Extensões de Arquivos
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.txt</span>
                <span className="text-slate-600 dark:text-slate-300">Texto simples</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.docx</span>
                <span className="text-slate-600 dark:text-slate-300">Documento Word</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.xlsx</span>
                <span className="text-slate-600 dark:text-slate-300">Planilha Excel</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.pptx</span>
                <span className="text-slate-600 dark:text-slate-300">Apresentação</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.pdf</span>
                <span className="text-slate-600 dark:text-slate-300">Documento PDF (Peças TJAM)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.jpg / .jpeg</span>
                <span className="text-slate-600 dark:text-slate-300">Imagem comprimida</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.png</span>
                <span className="text-slate-600 dark:text-slate-300">Imagem (transparência)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.mp3</span>
                <span className="text-slate-600 dark:text-slate-300">Áudio digital</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.mp4</span>
                <span className="text-slate-600 dark:text-slate-300">Vídeo digital</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between sm:col-span-2 lg:col-span-3">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">.zip / .rar</span>
                <span className="text-slate-600 dark:text-slate-300">Arquivo compactado / pacote de múltiplos arquivos</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ABA 3: METAS DA AULA (10 OBJETIVOS) */}
      {activeSubTab === 'metas' && (
        <section className={`p-6 sm:p-7 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  🎯 Ao terminar esta aula, você deverá conseguir:
                </h3>
                <p className="text-xs text-slate-500">Marque as competências dominadas nesta 2ª Aula de Terça-feira</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-600 text-white">
              {Object.values(goalsChecklist).filter(Boolean).length}/10 Metas
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { id: 1, text: 'Explicar o que é um sistema operacional e citar suas funções principais;' },
              { id: 2, text: 'Diferenciar com precisão arquivo e pasta (diretório);' },
              { id: 3, text: 'Identificar extensões comuns (.pdf, .docx, .xlsx, .jpg, .zip);' },
              { id: 4, text: 'Copiar e mover arquivos entendendo a situação do arquivo original;' },
              { id: 5, text: 'Utilizar com rapidez os principais atalhos (Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+Z, F2);' },
              { id: 6, text: 'Diferenciar o papel da Lixeira e as hipóteses de exclusão definitiva;' },
              { id: 7, text: 'Utilizar as funções centrais do Explorador de Arquivos do Windows;' },
              { id: 8, text: 'Entender o conceito de compactação (.zip) e necessidade de extração;' },
              { id: 9, text: 'Reconhecer cuidados básicos de segurança da informação no serviço público;' },
              { id: 10, text: 'Compreender os conceitos fundamentais de Processo Judicial Digital (Lei nº 11.419/2006).' },
            ].map((goal) => {
              const checked = !!goalsChecklist[goal.id];
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                    checked
                      ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500/40 text-cyan-900 dark:text-cyan-200'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-400/40'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition ${
                      checked
                        ? 'bg-cyan-600 border-cyan-600 text-white'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    <span className="font-black text-cyan-600 dark:text-cyan-400 mr-1.5">{goal.id}.</span>
                    <span>{goal.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-300 flex items-center justify-between">
            <span>Progresso da Autoavaliação de Metas:</span>
            <span className="font-black">
              {Math.round((Object.values(goalsChecklist).filter(Boolean).length / 10) * 100)}% Concluído
            </span>
          </div>
        </section>
      )}

      {/* ABA 4: PRÁTICA TJAM - ORGANIZAÇÃO DE DOCUMENTOS (ENVIO WHATSAPP) */}
      {activeSubTab === 'pratica' && (
        <section className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                  <Briefcase className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    🎯 Desafio Prático: “Organizando os documentos do TJAM”
                  </h3>
                  <p className="text-xs text-slate-400">Aplicação Forense e Simulação no Ambiente de Trabalho</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Fixação Real
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs text-slate-300">
              <p className="font-extrabold text-amber-300 text-sm">Cenário Apresentado ao Servidor:</p>
              <p>Imagine que você é um servidor do Tribunal de Justiça do Amazonas (TJAM) e recebeu estes arquivos na sua estação de trabalho:</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-cyan-300 font-bold p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span>📄 Peticao.pdf</span>
                <span>⚖️ Sentenca.pdf</span>
                <span>📝 Relatorio.docx</span>
                <span>📊 Planilha.xlsx</span>
                <span>🖼️ Foto_documento.jpg</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-1">
                <span className="font-bold text-cyan-400 block">Estrutura que você deve montar:</span>
                <p className="font-mono text-slate-200">
                  PROCESSO_TJAM<br />
                  &nbsp;&nbsp;↳ Documentos<br />
                  &nbsp;&nbsp;↳ Relatórios<br />
                  &nbsp;&nbsp;↳ Imagens
                </p>
              </div>

              <div className="pt-2 text-amber-200 space-y-1">
                <strong className="block text-amber-300">Sua tarefa: responda aos 5 itens a seguir:</strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Qual arquivo você colocaria em cada pasta?</li>
                  <li>Qual arquivo poderia ser copiado para outra pasta sem apagar o original?</li>
                  <li>Qual atalho utilizaria para mover um arquivo?</li>
                  <li>Qual atalho utilizaria para renomear um arquivo?</li>
                  <li>O que aconteceria se você excluísse um arquivo normalmente?</li>
                </ol>
              </div>
            </div>

            <form onSubmit={handleSavePractical} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Sua Resposta Completa (Itens 1 a 5):
                </label>
                <textarea
                  rows={8}
                  value={practicalResponse}
                  onChange={(e) => setPracticalResponse(e.target.value)}
                  placeholder={`1. Em 'Documentos' colocaria Peticao.pdf e Sentenca.pdf; em 'Relatórios' colocaria Relatorio.docx e Planilha.xlsx; em 'Imagens' colocaria Foto_documento.jpg.\n2. Qualquer arquivo pode ser copiado (ex: Peticao.pdf) usando Ctrl+C mantendo o original intacto.\n3. Para mover: Ctrl+X (recortar) e Ctrl+V (colar).\n4. Para renomear: atalho F2.\n5. O arquivo iria para a Lixeira e poderia ser restaurado enquanto a lixeira não fosse esvaziada.`}
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none leading-relaxed font-sans"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Salvar Resposta no Sistema</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar pelo WhatsApp para o Professor</span>
                </button>
              </div>

              {practicalSaved && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-in fade-in">
                  ✓ Respostas da Prática salvas com sucesso no sistema local!
                </div>
              )}
            </form>
          </div>
        </section>
      )}

      {/* Footer Navigation CTA */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400">
            Pronto para testar seus conhecimentos?
          </span>
          <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
            20 Questões Gabaritadas (10 Objetivas + 5 Certo/Errado + 5 Dissertativas)
          </h4>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab && onNavigateTab('questoes')}
          className="px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-md shrink-0"
        >
          <span>Ir para os 20 Exercícios da Aula</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
