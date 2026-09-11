import React, { useState } from 'react';
import {
  Network,
  Globe,
  Wifi,
  Radio,
  Server,
  Laptop,
  Layers,
  Router as RouterIcon,
  ShieldCheck,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  FileText,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Zap,
  Cpu,
  Lock,
  Share2,
  HardDrive
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
      const saved = localStorage.getItem('tjam_checklist_informatica_redes');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      conceito: false,
      tipos: false,
      internet: false,
      cliente_servidor: false,
      conexoes: false,
      equipamentos: false,
      ip: false,
      protocolos: false,
      dicas: false,
    };
  });

  const toggleCheck = (k: string) => {
    setChecklist((prev) => {
      const updated = { ...prev, [k]: !prev[k] };
      try {
        localStorage.setItem('tjam_checklist_informatica_redes', JSON.stringify(updated));
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
            💻 4ª Aula de Hoje • Informática TJAM
          </span>
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 45 min sugeridos
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-cyan-900 dark:text-cyan-300 mb-2 flex items-center gap-2">
          <Network className="w-6 h-6 text-cyan-600 dark:text-cyan-400" /> Redes de Computadores e Internet: Arquitetura, Equipamentos e Protocolos
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          Seguindo a sequência do cronograma TJAM e sem repetir Segurança da Informação, nesta 4ª aula você dominará a estrutura elementar das redes de computadores, a classificação territorial (LAN, MAN, WAN), o funcionamento da Internet, a arquitetura Cliente-Servidor, endereçamento IP (IPv4 vs. IPv6) e os protocolos web mais cobrados pela banca FGV.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Classificação: LAN × MAN × WAN</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Internet: Site, URL, Navegador e DNS</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Arquitetura Cliente × Servidor</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Roteador × Modem × Switch</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Wi-Fi (WLAN) vs. Internet Global</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-cyan-500/20">
            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>IP (IPv4 vs. IPv6) e HTTP vs. HTTPS</span>
          </div>
        </div>
      </section>

      {/* Quick Filter Pill Buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Filtrar Tópicos:</span>
        {[
          { id: 'todos', label: 'Tudo' },
          { id: 'conceito', label: '1. O que é Rede' },
          { id: 'tipos', label: '2. LAN × MAN × WAN' },
          { id: 'internet', label: '3. Internet & Web' },
          { id: 'conexoes', label: '4. Fio × Sem Fio' },
          { id: 'equipamentos', label: '5. Equipamentos' },
          { id: 'ip_protocolos', label: '6. IP & Protocolos' },
          { id: 'dicas', label: '7. Dicas de Ouro' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveSection(btn.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === btn.id
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* 1. O que é uma rede de computadores? */}
      {(activeSection === 'todos' || activeSection === 'conceito') && (
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
                1
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  O que é uma Rede de Computadores?
                </h3>
                <p className="text-xs text-slate-500">Conceito fundamental e finalidade prática</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('conceito')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                checklist.conceito
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{checklist.conceito ? 'Dominado' : 'Marcar visto'}</span>
            </button>
          </div>

          <p className="text-sm leading-relaxed">
            Uma <strong>rede de computadores</strong> é uma estrutura formada por dois ou mais dispositivos autônomos interconectados por meios físicos (cabos) ou sem fio (ondas eletromagnéticas), com o objetivo primordial de <strong>compartilhar dados, informações, recursos e serviços</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <Laptop className="w-6 h-6 text-cyan-600 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Computadores</div>
              <div className="text-[11px] text-slate-500">Desktops e notebooks forenses</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <Zap className="w-6 h-6 text-amber-500 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Celulares</div>
              <div className="text-[11px] text-slate-500">Smartphones e tablets móveis</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <HardDrive className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Impressoras</div>
              <div className="text-[11px] text-slate-500">Recurso compartilhado em rede</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <Server className="w-6 h-6 text-indigo-500 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Servidores</div>
              <div className="text-[11px] text-slate-500">Bancos de dados e sistemas (PJe)</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <RouterIcon className="w-6 h-6 text-rose-500 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Roteadores</div>
              <div className="text-[11px] text-slate-500">Direcionamento de tráfego</div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Tipos de rede: LAN, MAN, WAN */}
      {(activeSection === 'todos' || activeSection === 'tipos') && (
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
                2
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Tipos de Rede por Abrangência Geográfica
                </h3>
                <p className="text-xs text-slate-500">A classificação mais cobrada em concursos públicos (FGV / TJAM)</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('tipos')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                checklist.tipos
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{checklist.tipos ? 'Dominado' : 'Marcar visto'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LAN */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-black">
                  LAN
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  Local Area Network
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Rede Local
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Abrange uma <strong>área geográfica pequena e delimitada</strong>. Alta taxa de velocidade e baixa taxa de erro.
              </p>
              <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-emerald-500/20 text-[11px] space-y-1">
                <p><strong>Exemplos:</strong> Uma residência, escritório, laboratório, sala de audiência ou prédio de fórum do TJAM.</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">WLAN = LAN sem fio (Wi-Fi).</p>
              </div>
            </div>

            {/* MAN */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white text-xs font-black">
                  MAN
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">
                  Metropolitan Area Network
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Rede Metropolitana
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Abrange uma <strong>área metropolitana, cidade ou região</strong>. Conecta várias redes locais entre si.
              </p>
              <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-blue-500/20 text-[11px] space-y-1">
                <p><strong>Exemplos:</strong> Rede de fibra óptica interligando todas as varas e fóruns do TJAM dentro de Manaus, ou rede de TV a cabo da cidade.</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold">WMAN = MAN sem fio (WiMAX).</p>
              </div>
            </div>

            {/* WAN */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 border border-indigo-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white text-xs font-black">
                  WAN
                </span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  Wide Area Network
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Rede de Longa Distância
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Cobre uma <strong>grande extensão geográfica</strong>, ultrapassando fronteiras de municípios, estados e países.
              </p>
              <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-indigo-500/20 text-[11px] space-y-1">
                <p><strong>Exemplos:</strong> A <strong>Internet</strong> é o maior e mais clássico exemplo de WAN. Também interliga a capital Manaus às comarcas do interior do Amazonas (Parintins, Tefé, Tabatinga).</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">WWAN = WAN celular (3G/4G/5G).</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Internet e Termos Importantes */}
      {(activeSection === 'todos' || activeSection === 'internet') && (
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
                3
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Internet & Vocabulário Essencial
                </h3>
                <p className="text-xs text-slate-500">Site, Navegador, URL, Servidor e Cliente</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('internet')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                checklist.internet
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{checklist.internet ? 'Dominado' : 'Marcar visto'}</span>
            </button>
          </div>

          <p className="text-sm leading-relaxed">
            A <strong>Internet</strong> é a rede mundial pública e descentralizada que conecta milhões de redes e computadores no globo terrestre utilizando os protocolos da família TCP/IP.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-extrabold text-sm">
                <Globe className="w-4 h-4" /> Site / Página Web
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Conjunto de documentos eletrônicos (hipertextos) estruturados em HTML e outras mídias, identificados por um endereço único.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-sm">
                <Laptop className="w-4 h-4" /> Navegador (Browser)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Programa de software cliente instalado na máquina que traduz o código web e exibe o conteúdo visual ao usuário (ex: Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                <FileText className="w-4 h-4" /> URL (Uniform Resource Locator)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                O endereço padronizado que localiza exatamente onde um recurso se encontra na rede. Exemplo: <code className="text-[11px] font-mono bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1 py-0.5 rounded">https://www.tjam.jus.br/consultas</code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
                <Share2 className="w-4 h-4" /> Intranet
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Rede <strong>privada</strong> interna de uma organização que utiliza exatamente os mesmos protocolos e ferramentas da Internet, porém com acesso restrito a colaboradores autorizados (servidores do tribunal).
              </p>
            </div>
          </div>

          {/* Destaque Arquitetura Cliente-Servidor */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-slate-900/10 to-indigo-500/10 border-2 border-cyan-500/30 space-y-2">
            <h4 className="text-xs font-black uppercase text-cyan-700 dark:text-cyan-300 tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4" /> Modelo Cliente-Servidor (Client-Server Architecture)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-cyan-600 dark:text-cyan-400 mb-1">👤 O Cliente (Client)</div>
                <p className="text-slate-600 dark:text-slate-300">
                  É a entidade ou programa (ex: seu computador rodando o navegador) que <strong>solicita</strong> (requisita) uma página, dado ou serviço.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-indigo-600 dark:text-indigo-400 mb-1">🖥️ O Servidor (Server)</div>
                <p className="text-slate-600 dark:text-slate-300">
                  É a máquina potente ou sistema que <strong>armazena os dados, processa e fornece/entrega</strong> os serviços e arquivos solicitados.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Formas de Conexão: Com Fio vs. Sem Fio */}
      {(activeSection === 'todos' || activeSection === 'conexoes') && (
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
                4
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Formas de Conexão: Guiadas (Fio) e Não Guiadas (Sem Fio)
                </h3>
                <p className="text-xs text-slate-500">Cabos Ethernet, Fibra Óptica, Wi-Fi e Telefonia Celular</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('conexoes')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                checklist.conexoes
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{checklist.conexoes ? 'Dominado' : 'Marcar visto'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                <HardDrive className="w-4 h-4" /> Conexão Com Fio (Meios Físicos / Guiados)
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>• <strong>Cabo de Par Trançado (Ethernet / UTP / RJ-45):</strong> O mais popular em redes locais (LANs), escritórios e tribunais.</li>
                <li>• <strong>Fibra Óptica:</strong> Transmite dados na velocidade da luz (feixes de laser/led), imune a interferências eletromagnéticas e ideal para backbones e conexões metropolitanas.</li>
                <li>• <strong>Cabo Coaxial:</strong> Muito usado em transmissões de TV a cabo e conexões de banda larga antigas.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-black text-sm">
                <Wifi className="w-4 h-4" /> Conexão Sem Fio (Wireless / Não Guiados)
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>• <strong>Wi-Fi (Padrão IEEE 802.11):</strong> Tecnologia de rede local sem fio (WLAN) por radiofrequência.</li>
                <li>• <strong>Redes Móveis Celulares (3G / 4G / 5G):</strong> Transmissão por torres de telefonia celular com ampla cobertura geográfica.</li>
                <li>• <strong>Bluetooth (IEEE 802.15):</strong> Rede pessoal sem fio (WPAN) de curtíssimo alcance (fones, mouses, teclados).</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 5. Equipamentos de Rede: Roteador, Modem e Switch */}
      {(activeSection === 'todos' || activeSection === 'equipamentos') && (
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
                5
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Equipamentos Comuns de Rede
                </h3>
                <p className="text-xs text-slate-500">Diferenciação precisa entre Roteador, Modem e Switch</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('equipamentos')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                checklist.equipamentos
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{checklist.equipamentos ? 'Dominado' : 'Marcar visto'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-black text-sm">
                <RouterIcon className="w-5 h-5" /> Roteador (Router)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Encaminha pacotes entre redes diferentes.</strong> Decide a melhor rota para o tráfego de dados e conecta sua rede local (LAN) à rede externa/Internet (WAN).
              </p>
              <span className="inline-block text-[10px] font-bold bg-rose-500/10 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded">
                Camada 3 (Rede) do Modelo OSI
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-black text-sm">
                <Radio className="w-5 h-5" /> Modem (Modulador / Demodulador)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Converte e modula sinais.</strong> Transforma os sinais recebidos da operadora (linha telefônica, cabo coaxial ou sinal óptico ONT) em sinais digitais inteligíveis para os computadores.
              </p>
              <span className="inline-block text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                Conversão de Sinal Analógico/Digital
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-2">
              <div className="flex items-center gap-2 text-cyan-600 font-black text-sm">
                <Cpu className="w-5 h-5" /> Switch (Comutador)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Conecta dispositivos na mesma rede local.</strong> Direciona os dados especificamente para o dispositivo de destino (através do endereço MAC), sem inundar a rede inteira.
              </p>
              <span className="inline-block text-[10px] font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded">
                Camada 2 (Enlace) do Modelo OSI
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 6. Identificação e Protocolos: IP (IPv4 vs IPv6) e HTTP vs HTTPS */}
      {(activeSection === 'todos' || activeSection === 'ip_protocolos') && (
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
                6
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Identificação na Rede e Protocolos Web
                </h3>
                <p className="text-xs text-slate-500">Endereço IP (IPv4 vs. IPv6) e Segurança de Protocolos (HTTP vs. HTTPS)</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('ip')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                checklist.ip
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{checklist.ip ? 'Dominado' : 'Marcar visto'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Endereço IP */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <h4 className="text-sm font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Endereçamento IP (Internet Protocol)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                O endereço IP é a identidade numérica e lógica de um dispositivo conectado à rede. Ele funciona como o "endereço postal" do seu aparelho.
              </p>
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-black text-slate-900 dark:text-white flex items-center justify-between">
                    <span>IPv4 (Formato Tradicional)</span>
                    <span className="text-[10px] font-mono text-cyan-600 font-black">32 bits</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Formado por 4 octetos decimais separados por pontos (0 a 255).</div>
                  <code className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-mono text-xs">
                    Exemplo: 192.168.1.10
                  </code>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-black text-slate-900 dark:text-white flex items-center justify-between">
                    <span>IPv6 (Nova Geração)</span>
                    <span className="text-[10px] font-mono text-indigo-600 font-black">128 bits</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Criado para suprir o esgotamento mundial de IPs. Formado por grupos hexadecimais separados por dois-pontos.</div>
                  <code className="inline-block mt-1 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">
                    Exemplo: 2001:0db8:85a3::8a2e:0370:7334
                  </code>
                </div>
              </div>
            </div>

            {/* HTTP vs HTTPS */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <h4 className="text-sm font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Protocolos Web: HTTP vs. HTTPS
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Protocolos que ditam como as páginas web são transferidas do servidor para o seu navegador.
              </p>
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                  <div className="font-black text-rose-700 dark:text-rose-300">HTTP (HyperText Transfer Protocol)</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    Transfere dados em <strong>texto plano (sem criptografia)</strong>. Qualquer intermediário na rede pode interceptar senhas e conteúdos. Porta padrão: 80.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> HTTPS (HTTP Secure)
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    Utiliza <strong>criptografia SSL/TLS</strong>. Garante sigilo, integridade e autenticidade. O "S" é de Seguro! Obrigatório em portais judiciais e bancários. Porta padrão: 443.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Dica de Ouro para Concursos & Pegadinhas da FGV */}
      {(activeSection === 'todos' || activeSection === 'dicas') && (
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-amber-500/30' : 'bg-amber-50/50 border-amber-200'
          } shadow-sm space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black">
                7
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" /> Dicas de Ouro para Concursos (TJAM / FGV)
                </h3>
                <p className="text-xs text-slate-500">Quatro pegadinhas clássicas que você NÃO pode errar na prova</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('dicas')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                checklist.dicas
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{checklist.dicas ? 'Dominado' : 'Marcar visto'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-500/20 text-xs space-y-1">
              <div className="font-extrabold text-amber-700 dark:text-amber-300">
                1. LAN (Local) × WAN (Mundial)
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                LAN cobre salas, casas, fóruns locais. WAN cobre países, estados e o globo inteiro (ex: Internet).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-500/20 text-xs space-y-1">
              <div className="font-extrabold text-amber-700 dark:text-amber-300">
                2. Cliente (Pede) × Servidor (Entrega)
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                O cliente (ex: seu navegador Chrome) envia requisições. O servidor processa e devolve a resposta com o serviço ou página.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-500/20 text-xs space-y-1">
              <div className="font-extrabold text-amber-700 dark:text-amber-300">
                3. HTTP (Comum) × HTTPS (Seguro com Criptografia)
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                HTTPS adiciona certificado digital SSL/TLS. Protege senhas e processos do TJAM contra espionagem e clonagem.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-500/20 text-xs space-y-1">
              <div className="font-extrabold text-amber-700 dark:text-amber-300">
                4. Wi-Fi (Rede Local Sem Fio) × Internet (Rede Mundial)
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Wi-Fi é apenas o canal de rádio até o roteador. Você pode estar perfeitamente conectado ao Wi-Fi mesmo sem link externo de Internet!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Action Footer */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="text-sm font-black text-slate-900 dark:text-white">
            Pronto para testar seus conhecimentos?
          </div>
          <div className="text-xs text-slate-500">
            Resolva as 20 questões oficiais da aula com gabarito comentado ou treine com os flashcards!
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('questoes')}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-black hover:bg-cyan-700 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" /> Ir para as 20 Questões
            </button>
          )}
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" /> Flashcards
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
