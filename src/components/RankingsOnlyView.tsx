import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Users,
  UserCheck,
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Search,
  Printer,
  ShieldCheck,
  BarChart3,
  Flame,
  AlertTriangle,
  Ban,
  ArrowUp,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import {
  DUPLAS_RANKING,
  INDIVIDUAL_SIMULADO_RANKING,
  RankingDuplaItem,
  RankingIndividualItem,
} from '../data/rankingsData';

export const RankingsOnlyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'duplas' | 'individual'>('both');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtragem
  const filteredDuplas = DUPLAS_RANKING.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.disqualificationReason &&
        item.disqualificationReason.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredIndividual = INDIVIDUAL_SIMULADO_RANKING.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.disqualificationReason &&
        item.disqualificationReason.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const classifiedDuplas = filteredDuplas.filter((d) => !d.isDisqualified);
  const disqualifiedDuplas = filteredDuplas.filter((d) => d.isDisqualified);

  const classifiedIndividual = filteredIndividual.filter((i) => !i.isDisqualified);
  const disqualifiedIndividual = filteredIndividual.filter((i) => i.isDisqualified);

  // Geração do PDF Profissional dos Rankings (2 Páginas Oficiais Formatadas)
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const today = new Date();
      const dateStr = today.toLocaleDateString('pt-BR');
      const timeStr = today.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const protocolNumber = `TJAM-RANK-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      // ==========================================
      // ====== PÁGINA 1: CABEÇALHO & RANKING DAS DUPLAS ======
      // ==========================================

      // Barra Superior Institucional
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 28, 'F');

      doc.setFillColor(245, 158, 11); // amber-500
      doc.rect(0, 28, 210, 2, 'F');

      // Títulos
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text('PODER JUDICIÁRIO • TRIBUNAL DE JUSTIÇA DO ESTADO DO AMAZONAS', 14, 11);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(203, 213, 225);
      doc.text('CURSO PREPARATÓRIO OFICIAL TJAM 2026 • COMISSÃO AVALIADORA PEDAGÓGICA', 14, 17);

      doc.setFontSize(8);
      doc.setTextColor(251, 191, 36);
      doc.text(`RELATÓRIO OFICIAL DE HOMOLOGAÇÃO DE RANKINGS • PROTOCOLO: ${protocolNumber}`, 14, 23);

      // Data de Emissão
      doc.setFontSize(7.5);
      doc.setTextColor(203, 213, 225);
      doc.text(`Emitido em: ${dateStr} às ${timeStr}`, 145, 23);

      let y = 36;

      // Card Destaque Eduardo Mateus
      doc.setFillColor(240, 253, 244); // emerald-50
      doc.roundedRect(14, y, 182, 28, 3, 3, 'F');
      doc.setDrawColor(34, 197, 94); // emerald-500
      doc.setLineWidth(0.6);
      doc.roundedRect(14, y, 182, 28, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(21, 128, 61);
      doc.text('HOMOLOGAÇÃO DE RESULTADO OFICIAL — CANDIDATO: EDUARDO MATEUS', 19, y + 6);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text('• RANKING INDIVIDUAL (80 QUESTÕES):', 19, y + 12);
      doc.setTextColor(2, 132, 199);
      doc.text('2º LUGAR GERAL COM 83,8% DE APROVEITAMENTO (67/80 ACERTOS)', 82, y + 12);

      doc.setTextColor(15, 23, 42);
      doc.text('• RANKING DAS DUPLAS (TURMA GERAL):', 19, y + 18);
      doc.setTextColor(180, 83, 9);
      doc.text('3º LUGAR GERAL COM 50,0% (COMPETINDO SOZINHO / SEM DUPLA)', 82, y + 18);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.text('Status: Candidato devidamente identificado, prova auditada e pontuações homologadas pela coordenação.', 19, y + 24);

      y = 70;

      // Seção 1: Ranking das Duplas
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('1. QUADRO HOMOLOGADO: RANKING DAS DUPLAS TJAM 2026', 14, y);

      y += 4;
      // Header da Tabela das Duplas
      doc.setFillColor(15, 23, 42);
      doc.rect(14, y, 182, 6, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text('Pos.', 17, y + 4.2);
      doc.text('Participante(s) / Dupla', 32, y + 4.2);
      doc.text('Modalidade / Status', 115, y + 4.2);
      doc.text('Aproveitamento (%)', 155, y + 4.2);

      y += 6;

      // Linhas da Tabela das Duplas Classificadas
      classifiedDuplas.forEach((item, index) => {
        const isEduardo = item.isUser;
        const rowHeight = 5.6;

        if (isEduardo) {
          doc.setFillColor(220, 252, 231); // emerald-100 highlight
          doc.rect(14, y, 182, rowHeight, 'F');
          doc.setDrawColor(34, 197, 94);
          doc.rect(14, y, 182, rowHeight, 'S');
        } else if (index % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(14, y, 182, rowHeight, 'F');
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        if (isEduardo) {
          doc.setTextColor(21, 128, 61);
        } else if (typeof item.rank === 'number' && item.rank <= 3) {
          doc.setTextColor(180, 83, 9);
        } else {
          doc.setTextColor(71, 85, 105);
        }
        doc.text(`${item.rank}º`, 17, y + 3.8);

        doc.setTextColor(15, 23, 42);
        doc.text(item.name + (isEduardo ? '  ★ (DUPLA OFICIAL - 5º LUGAR)' : ''), 32, y + 3.8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(71, 85, 105);
        doc.text(item.isSolo ? 'Individual (Sozinho)' : 'Dupla Regular', 115, y + 3.8);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(isEduardo ? 21 : 30, isEduardo ? 128 : 41, isEduardo ? 61 : 59);
        doc.text(item.score, 160, y + 3.8);

        y += rowHeight;
      });

      y += 5;

      // Subtabela de Duplas Desclassificadas (com nota zero)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(190, 18, 60); // rose-700
      doc.text('DUPLAS DESCLASSIFICADAS COM NOTA ZERO (0,0%)', 14, y);

      y += 3.5;
      doc.setFillColor(254, 242, 242); // rose-50
      doc.rect(14, y, 182, 17, 'F');
      doc.setDrawColor(244, 63, 94);
      doc.rect(14, y, 182, 17, 'S');

      disqualifiedDuplas.forEach((item, idx) => {
        const itemY = y + 4.5 + idx * 7;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(190, 18, 60);
        doc.text('DESCLASS.', 17, itemY);
        doc.setTextColor(15, 23, 42);
        doc.text(item.name, 34, itemY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`— ${item.disqualificationReason || 'Violação das normas'}`, 85, itemY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(190, 18, 60);
        doc.text('0,0% (ZERO)', 160, itemY);
      });

      // Rodapé da Página 1
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Tribunal de Justiça do Estado do Amazonas • TJAM 2026 • Quadro Oficial das Duplas', 14, 290);
      doc.text(`Página 1 de 2 • Protocolo: ${protocolNumber}`, 140, 290);

      // ==========================================
      // ====== PÁGINA 2: RANKING INDIVIDUAL & HOMOLOGAÇÃO ======
      // ==========================================
      doc.addPage();

      // Top Bar da Página 2
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 20, 'F');
      doc.setFillColor(2, 132, 199); // sky-500
      doc.rect(0, 20, 210, 1.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text('TJAM 2026 • QUADRO HOMOLOGADO: RANKING INDIVIDUAL DO SIMULADO', 14, 9.5);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(203, 213, 225);
      doc.text(`AVALIAÇÃO OFICIAL DE 80 QUESTÕES • PROTOCOLO: ${protocolNumber}`, 14, 15);
      doc.text(`Página 2 de 2 • Emissão: ${dateStr}`, 150, 15);

      y = 27;

      // Header da Tabela Individual
      doc.setFillColor(15, 23, 42);
      doc.rect(14, y, 182, 6, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text('Pos.', 17, y + 4.2);
      doc.text('Candidato(a)', 32, y + 4.2);
      doc.text('Acertos (de 80)', 115, y + 4.2);
      doc.text('Aproveitamento (%)', 155, y + 4.2);

      y += 6;

      // Linhas da Tabela Individual Classificados
      classifiedIndividual.forEach((item, index) => {
        const isEduardo = item.isUser;
        const rowHeight = 5.2;

        if (isEduardo) {
          doc.setFillColor(224, 242, 254); // sky-100 highlight
          doc.rect(14, y, 182, rowHeight, 'F');
          doc.setDrawColor(2, 132, 199);
          doc.rect(14, y, 182, rowHeight, 'S');
        } else if (index % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(14, y, 182, rowHeight, 'F');
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        if (isEduardo) {
          doc.setTextColor(2, 132, 199);
        } else if (typeof item.rank === 'number' && item.rank <= 3) {
          doc.setTextColor(180, 83, 9);
        } else {
          doc.setTextColor(71, 85, 105);
        }
        doc.text(`${item.rank}º`, 17, y + 3.6);

        doc.setTextColor(15, 23, 42);
        doc.text(item.name + (isEduardo ? '  ★ (VOCÊ - 2º LUGAR GERAL)' : ''), 32, y + 3.6);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(51, 65, 85);
        doc.text(item.correctCount, 118, y + 3.6);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(isEduardo ? 2 : 30, isEduardo ? 132 : 41, isEduardo ? 199 : 59);
        doc.text(item.score, 160, y + 3.6);

        y += rowHeight;
      });

      y += 5;

      // Seção Especial: 5 Alunos Desclassificados com nota zero (incluindo Pedro Henrique)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(190, 18, 60); // rose-700
      doc.text('3. CANDIDATOS DESCLASSIFICADOS COM NOTA ZERO (0/80 ACERTOS • 0,0%)', 14, y);

      y += 3.5;
      doc.setFillColor(255, 241, 242); // rose-50
      doc.rect(14, y, 182, 36, 'F');
      doc.setDrawColor(225, 29, 72); // rose-600
      doc.setLineWidth(0.5);
      doc.rect(14, y, 182, 36, 'S');

      disqualifiedIndividual.forEach((item, idx) => {
        const dY = y + 4.2 + idx * 6.4;
        const isPedro = item.name.includes('Pedro Henrique');

        if (isPedro) {
          doc.setFillColor(254, 205, 211); // rose-200 highlight
          doc.rect(15, dY - 3.2, 180, 5.8, 'F');
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.8);
        doc.setTextColor(190, 18, 60);
        doc.text('DESCLASS.', 17, dY);

        doc.setTextColor(isPedro ? 159 : 15, isPedro ? 18 : 23, isPedro ? 57 : 42);
        doc.text(item.name + (isPedro ? ' ⚠ (DESCLASSIFICADO)' : ''), 34, dY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6);
        doc.setTextColor(71, 85, 105);
        doc.text(`• ${item.disqualificationReason || 'Violação'}`, 75, dY);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.8);
        doc.setTextColor(190, 18, 60);
        doc.text('0/80 (0,0%)', 160, dY);
      });

      y += 40;

      // Termo de Homologação e Assinaturas
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, y, 182, 32, 2, 2, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(14, y, 182, 32, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('TERMO DE HOMOLOGAÇÃO E VALIDAÇÃO PEDAGÓGICA DO SIMULADO TJAM 2026', 18, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(71, 85, 105);
      const decTxt =
        'Certificamos que as notas e classificações supracitadas foram auditadas com base nos critérios oficiais da banca examinadora para o Tribunal de Justiça do Amazonas, considerando as 80 questões cronometradas, conferência de integridade e registro das penalidades de desclassificação.';
      const splitDec = doc.splitTextToSize(decTxt, 174);
      doc.text(splitDec, 18, y + 9);

      // Linhas de Assinatura
      const sigY = y + 23;
      doc.setDrawColor(100, 116, 139);
      doc.line(22, sigY, 90, sigY);
      doc.line(110, sigY, 178, sigY);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Eduardo Mateus', 45, sigY + 3.8);
      doc.text('Comissão Avaliadora TJAM 2026', 123, sigY + 3.8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(5.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Candidato Homologado (2º e 5º Lugar)', 36, sigY + 6.8);
      doc.text('Validação Pedagógica e Registro Oficial', 121, sigY + 6.8);

      // Rodapé da Página 2
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Tribunal de Justiça do Estado do Amazonas • TJAM 2026 • Relatório Oficial Homologado', 14, 292);
      doc.text(`Documento Autenticado • Protocolo: ${protocolNumber}`, 135, 292);

      // Salva o PDF com 2 páginas estruturadas
      doc.save(`TJAM_2026_Rankings_Oficiais_Eduardo_Mateus_${dateStr.replace(/\//g, '-')}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF dos rankings:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30">
      {/* Cabeçalho Institucional Oficial - Fluido, elegante e sem bloquear a rolagem */}
      <header className="relative w-full border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950/90 shadow-md">
        {/* Linha sutil de destaque no topo */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-90" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">
            {/* Bloco de Título e Brasão do TJAM - Sem tags/badges no cabeçalho */}
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
              </div>

              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white truncate">
                  Quadro Oficial de Classificação & Rankings
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 truncate sm:whitespace-normal">
                  Tribunal de Justiça do Estado do Amazonas • Simulado Geral & Desafio de Duplas
                </p>
              </div>
            </div>

            {/* Ação de Download com design refinado e proporcional */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                id="btn-download-pdf-oficial"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-amber-500/30 active:scale-[0.98] disabled:opacity-50 shrink-0"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {isGeneratingPdf ? 'Gerando Relatório Oficial...' : 'Baixar Relatório Oficial (PDF)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Painel de Conquistas Homologadas do Candidato (Eduardo Mateus) */}
        <section className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    Resultado Oficial Homologado: Eduardo Mateus
                  </h2>
                  <p className="text-xs text-slate-400">
                    Classificação final confirmada nas duas modalidades de disputa do TJAM 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Protocolo:</span>
                <span className="font-bold text-slate-200">TJAM-2026-FINAL-80Q</span>
              </div>
            </div>

            {/* Grid dos 2 Resultados Oficiais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: 2º Lugar Individual */}
              <div className="p-6 rounded-2xl bg-sky-950/30 border border-sky-500/40 ring-1 ring-sky-500/20 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Ranking Individual do Simulado
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-slate-200 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
                    2º
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">83,8%</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">67 / 80 Acertos</span>
                  </div>
                  <h3 className="text-base font-bold text-sky-200">
                    2º Colocado Geral no Simulado TJAM
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Eduardo Mateus obteve <strong>83,8% de aproveitamento</strong> (67 acertos de 80) na avaliação oficial cronometrada, conquistando a 2ª posição geral entre todos os candidatos.
                  </p>
                </div>
              </div>

              {/* Card 2: 5º Lugar Duplas (Eduardo Mateus & Pedro Henrique) */}
              <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 ring-1 ring-amber-500/20 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Ranking das Duplas (Turma Geral)
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow-lg">
                    5º
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">30,0%</span>
                    <span className="text-xs font-bold text-amber-300 font-mono">Dupla Oficial</span>
                  </div>
                  <h3 className="text-base font-bold text-amber-200">
                    5º Lugar Geral das Duplas (Eduardo Mateus & Pedro Henrique)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A dupla oficial <strong>Eduardo Mateus & Pedro Henrique</strong> consolidou a 5ª posição geral no ranking das duplas (100% em dia e sem pendências).
                  </p>
                </div>
              </div>
            </div>

            {/* Badges de Auditoria */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                <strong>14 Duplas / Participantes</strong> avaliados
              </span>
              <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Flame className="w-3.5 h-3.5 text-sky-400" />
                <strong>22 Alunos no Simulado Individual</strong>
              </span>
              <span className="flex items-center gap-1 bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-600/40 text-rose-300">
                <Ban className="w-3.5 h-3.5 text-rose-400" />
                <strong>2 Duplas & 5 Alunos Desclassificados (Nota Zero)</strong>
              </span>
            </div>
          </div>
        </section>

        {/* Controles de Visualização: Abas e Busca */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Abas */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'both'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Visão Completa</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('duplas')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'duplas'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Duplas ({DUPLAS_RANKING.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('individual')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'individual'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Individual ({INDIVIDUAL_SIMULADO_RANKING.length})</span>
            </button>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar aluno, dupla ou motivo..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </section>

        {/* Tabelas dos Rankings */}
        <div
          className={`grid gap-8 ${
            activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {/* TABELA 1: RANKING DAS DUPLAS */}
          {(activeTab === 'both' || activeTab === 'duplas') && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      Ranking das Duplas (Turma Geral)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Eduardo Mateus & Pedro Henrique: 5º lugar geral com 30,0%
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {classifiedDuplas.length} Classificados • {disqualifiedDuplas.length} Desclassificados
                </span>
              </div>

              {/* Lista de Duplas Classificadas */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Duplas Classificadas ({classifiedDuplas.length})
                </h4>

                <div className="space-y-2">
                  {classifiedDuplas.map((item, idx) => (
                    <div
                      key={`dupla-class-${item.name}-${idx}`}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${item.bgClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${item.badgeClass}`}
                        >
                          {item.rank}º
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">{item.name}</span>
                            {item.isUser && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black">
                                Sua Dupla Oficial (5º Lugar)
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block">{item.description}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${item.barClass}`}
                            style={{ width: item.barWidth }}
                          />
                        </div>
                        <span className="font-mono font-black text-sm text-amber-300">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bloco de 2 Duplas Desclassificadas com Nota Zero */}
              {disqualifiedDuplas.length > 0 && (
                <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Ban className="w-3.5 h-3.5 text-rose-400" /> Duplas Desclassificadas • Nota Zero ({disqualifiedDuplas.length})
                    </h4>
                    <span className="text-[10px] font-bold uppercase text-rose-400/80 bg-rose-950/60 border border-rose-700/50 px-2 py-0.5 rounded-md">
                      0,0% de Aproveitamento
                    </span>
                  </div>

                  <div className="space-y-2">
                    {disqualifiedDuplas.map((item, idx) => (
                      <div
                        key={`dupla-desc-${item.name}-${idx}`}
                        className="p-3.5 rounded-2xl border border-rose-600/40 bg-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-start gap-3">
                          <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-rose-700 text-white shrink-0 uppercase tracking-wider">
                            DESC
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-rose-200 text-sm">{item.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-300 border border-rose-700/60 font-black">
                                Desclassificada
                              </span>
                            </div>
                            <p className="text-[11px] text-rose-300/80 mt-0.5">
                              {item.disqualificationReason}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <span className="font-mono font-black text-xs text-rose-400 bg-rose-900/40 px-2.5 py-1 rounded-lg border border-rose-800/50">
                            Nota: 0,0% (Zero)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TABELA 2: RANKING INDIVIDUAL DO SIMULADO */}
          {(activeTab === 'both' || activeTab === 'individual') && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      Ranking Individual (Simulado 80Q)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Eduardo Mateus: 2º lugar com 83,8% (67 acertos de 80)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
                  {classifiedIndividual.length} Classificados • {disqualifiedIndividual.length} Desclassificados
                </span>
              </div>

              {/* Lista de Alunos Classificados */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Candidatos Classificados no Simulado ({classifiedIndividual.length})
                </h4>

                <div className="space-y-2">
                  {classifiedIndividual.map((item, idx) => (
                    <div
                      key={`indiv-class-${item.name}-${idx}`}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${item.bgClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${item.badgeClass}`}
                        >
                          {item.rank}º
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">{item.name}</span>
                            {item.isUser && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black">
                                Você (2º Lugar Geral)
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block font-mono">
                            {item.correctCount} acertos
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${item.barClass}`}
                            style={{ width: item.barWidth }}
                          />
                        </div>
                        <span className="font-mono font-black text-sm text-emerald-300">
                          {item.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bloco de 5 Alunos Desclassificados com Nota Zero (Destaque para Pedro Henrique) */}
              {disqualifiedIndividual.length > 0 && (
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Candidatos Desclassificados com Nota Zero ({disqualifiedIndividual.length})
                    </h4>
                    <span className="text-[10px] font-bold uppercase text-rose-400/80 bg-rose-950/60 border border-rose-700/50 px-2 py-0.5 rounded-md">
                      0 Acertos (0/80) • 0,0%
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {disqualifiedIndividual.map((item, idx) => {
                      const isPedro = item.name.includes('Pedro Henrique');
                      return (
                        <div
                          key={`indiv-desc-${item.name}-${idx}`}
                          className={`p-3.5 rounded-2xl border transition-all ${
                            isPedro
                              ? 'border-rose-500 bg-rose-950/40 ring-1 ring-rose-500/40 shadow-lg shadow-rose-950/50'
                              : 'border-rose-700/30 bg-rose-950/20'
                          } flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`px-2 py-1 rounded-lg text-[10px] font-black shrink-0 uppercase tracking-wider ${
                                isPedro
                                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 animate-pulse'
                                  : 'bg-rose-800 text-white'
                              }`}
                            >
                              DESC
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-bold text-sm ${isPedro ? 'text-white underline decoration-rose-500 decoration-2' : 'text-rose-200'}`}>
                                  {item.name}
                                </span>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${
                                    isPedro
                                      ? 'bg-rose-600 text-white border border-rose-400 shadow'
                                      : 'bg-rose-900/60 text-rose-300 border border-rose-700/60'
                                  }`}
                                >
                                  {isPedro ? '⚠ Desclassificado (Nota Zero)' : 'Desclassificado(a)'}
                                </span>
                              </div>
                              <p className="text-[11px] text-rose-300/80 mt-0.5">
                                {item.disqualificationReason}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <span className="font-mono font-bold text-[11px] text-rose-300 bg-slate-900/80 px-2 py-1 rounded-lg border border-rose-800/40">
                              0/80 Acertos
                            </span>
                            <span className="font-mono font-black text-xs text-white bg-rose-600 px-2.5 py-1 rounded-lg border border-rose-500 shadow-sm">
                              0,0%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rodapé com Ações & Certificação Oficial */}
        <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-slate-200">
                Dados Homologados pela Coordenação Pedagógica TJAM 2026
              </p>
              <p className="text-[11px]">
                Classificações auditadas e registradas com 14 duplas/participantes e 22 candidatos individuais. As desclassificações com nota zero estão formalizadas no relatório oficial.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isGeneratingPdf ? 'Gerando...' : 'Imprimir / Salvar PDF'}</span>
          </button>
        </section>
      </main>

      {/* Botão Flutuante Discreto: Voltar ao Topo */}
      {showBackToTop && (
        <button
          type="button"
          id="btn-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 rounded-2xl bg-slate-900/90 text-amber-400 border border-slate-700/80 shadow-2xl hover:bg-slate-850 hover:text-amber-300 hover:border-amber-500/50 transition-all flex items-center gap-2 text-xs font-bold cursor-pointer backdrop-blur-md group"
          title="Voltar ao início da página"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline">Topo</span>
        </button>
      )}
    </div>
  );
};
