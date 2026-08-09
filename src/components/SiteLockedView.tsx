import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Trophy,
  Medal,
  Lock,
  Eye,
  Calendar,
  BookOpen,
  Play,
  ExternalLink,
  Video,
  FileText,
  Sparkles,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

interface SiteLockedViewProps {
  isDarkMode: boolean;
  onToggleDarkMode?: () => void;
  onUnlockSite?: () => void;
}

interface WeekClass {
  id: 'quinta';
  dayName: string;
  dateStr: string;
  discipline: string;
  title: string;
  professor: string;
  youtubeEmbedUrl: string;
  youtubeDirectUrl: string;
  topics: string[];
  summary: string;
  badgeTag: string;
}

export const SiteLockedView: React.FC<SiteLockedViewProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onUnlockSite,
}) => {
  const [editingVideo, setEditingVideo] = useState<boolean>(false);
  const [inputVideoUrl, setInputVideoUrl] = useState<string>('');

  // Persistent Custom Video URLs in localStorage
  const [customVideoUrls, setCustomVideoUrls] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('tjam_custom_videos_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;

    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/watch')) {
      const searchParams = new URLSearchParams(url.split('?')[1]);
      videoId = searchParams.get('v') || '';
    } else if (url.includes('youtube.com/live/')) {
      videoId = url.split('youtube.com/live/')[1]?.split('?')[0] || '';
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    return url;
  };

  const handleSaveCustomVideoUrl = () => {
    if (!inputVideoUrl.trim()) {
      setEditingVideo(false);
      return;
    }

    const updated = { ...customVideoUrls, quinta: inputVideoUrl.trim() };
    setCustomVideoUrls(updated);
    try {
      localStorage.setItem('tjam_custom_videos_v2', JSON.stringify(updated));
    } catch (e) {
      console.warn('Erro ao salvar link do vídeo no localStorage:', e);
    }
    setEditingVideo(false);
    setInputVideoUrl('');
  };

  const currentClass: WeekClass = {
    id: 'quinta',
    dayName: 'Aula de Hoje',
    dateStr: '08/08',
    discipline: 'LIBRAS',
    title: 'Aula 1 — LIBRAS: Conceitos básicos, história e legislação',
    professor: 'Profª. LIBRAS e Inclusão',
    youtubeEmbedUrl: customVideoUrls['quinta']
      ? getYouTubeEmbedUrl(customVideoUrls['quinta'])
      : 'https://www.youtube.com/embed/WqUexIfQ_aQ?autoplay=0&rel=0',
    youtubeDirectUrl: customVideoUrls['quinta'] || 'https://youtu.be/WqUexIfQ_aQ?is=MSdtBlG9aSokP_fR',
    badgeTag: 'Aula Liberada',
    topics: [
      'Conceito de LIBRAS: Língua autônoma de modalidade gestual-visual com estrutura gramatical própria',
      '5 Parâmetros Fundamentais: Configuração de mão, Movimento, Ponto de articulação, Orientação e Expressões não manuais',
      'Datilologia x LIBRAS: Alfabeto manual auxiliar para nomes próprios e vocábulos específicos',
      'Legislação para Concurso: Lei nº 10.436/2002 e Decreto nº 5.626/2005 no serviço público do TJAM'
    ],
    summary: 'Vídeo aula e material completo de LIBRAS, abordando os conceitos fundamentais, parâmetros dos sinais e legislação de acessibilidade para o concurso do TJAM.'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 flex flex-col justify-between">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Top Header Controls Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">TJAM Estudos 2026</h2>
              <p className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Plataforma Trancada • Próxima Aula no Sábado às 13h
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onUnlockSite && (
              <button
                onClick={onUnlockSite}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Entrar no Site de Estudos</span>
              </button>
            )}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Hero Banner: Aula de Hoje Finalizada */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Aula Encerada</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Pausa nos Estudos — Processo Civil
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
                O site está trancado e em pausa para navegação. Acompanhe a revisão da aula de hoje abaixo. A próxima aula será liberada no Sábado às 13h.
              </p>
            </div>

            {/* Next Class Announcement Box */}
            <div className="w-full md:w-auto p-4 sm:p-5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 space-y-1.5 shrink-0">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                <Clock className="w-4 h-4" />
                <span>Próxima Aula</span>
              </div>
              <p className="text-lg font-black text-white">Sábado às 13:00h</p>
              <p className="text-[11px] text-amber-200/80 font-medium max-w-xs">
                O site permanecerá trancado até a ordem de liberação no próximo encontro.
              </p>
            </div>
          </div>

          {/* Progresso e Ranking Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 relative z-10">
            {/* Ranking Individual Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Ranking Individual</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Sua Dupla</span>
              </div>

              <div className="space-y-2.5">
                {/* Pedro Henrique */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                      1º
                    </span>
                    <div>
                      <p className="text-xs font-black text-white flex items-center gap-1.5">
                        Pedro Henrique
                        <Medal className="w-3.5 h-3.5 text-amber-400" />
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-amber-400">10%</span>
                </div>

                {/* Eduardo Mateus */}
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      2º
                    </span>
                    <div>
                      <p className="text-xs font-black text-white">Eduardo Mateus</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-emerald-400">10%</span>
                </div>
              </div>
            </div>

            {/* Ranking Geral de Duplas Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  <span>Ranking Geral de Duplas</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Classificação</span>
              </div>

              <div className="space-y-2">
                {/* 1° Jonas e Carla - 33% */}
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0">1º</span>
                    <span className="text-xs font-black text-white">Jonas e Carla</span>
                  </div>
                  <span className="text-xs font-black text-amber-400">33%</span>
                </div>

                {/* 2° Pietro e Heitor - 28% */}
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-400 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0">2º</span>
                    <span className="text-xs font-black text-white">Pietro e Heitor</span>
                  </div>
                  <span className="text-xs font-black text-slate-300">28%</span>
                </div>

                {/* 3° João e Alicia - 25% */}
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-800 text-white font-black text-[11px] flex items-center justify-center shrink-0">3º</span>
                    <span className="text-xs font-bold text-slate-300">João e Alicia</span>
                  </div>
                  <span className="text-xs font-black text-amber-500">25%</span>
                </div>

                {/* 4° Pedro e Eduardo - 23% */}
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-700 text-slate-300 font-black text-[11px] flex items-center justify-center shrink-0">4º</span>
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      Pedro e Eduardo
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-extrabold uppercase">Sua Dupla</span>
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-400">23%</span>
                </div>

                {/* 5° Martins e Márcio - 15% */}
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-700 text-slate-300 font-black text-[11px] flex items-center justify-center shrink-0">5º</span>
                    <span className="text-xs font-bold text-slate-300">Martins e Márcio</span>
                  </div>
                  <span className="text-xs font-black text-slate-400">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Reassista e Revise a Aula de Hoje */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-400" />
                <span>Revisão da Aula de Hoje — Processo Civil</span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Vídeo aula completa transmitida sobre Jurisdição e Teoria Geral do Processo
              </p>
            </div>
          </div>

          {/* Player & Content Display Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            {/* Header of Active Class */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] uppercase border border-emerald-500/30">
                    {currentClass.discipline}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    {currentClass.dayName} ({currentClass.dateStr})
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mt-1">{currentClass.title}</h3>
                <p className="text-xs text-slate-400">{currentClass.professor}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingVideo(true);
                    setInputVideoUrl(customVideoUrls['quinta'] || currentClass.youtubeDirectUrl);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs transition-all cursor-pointer border border-slate-700"
                >
                  <span>Alterar Link</span>
                </button>

                <a
                  href={currentClass.youtubeDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all shadow-md shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir no YouTube</span>
                </a>
              </div>
            </div>

            {/* Editing Video Link Box */}
            {editingVideo && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3">
                <p className="text-xs font-bold text-emerald-400">
                  Cole o link do YouTube para a aula de hoje ({currentClass.discipline}):
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={inputVideoUrl}
                    onChange={(e) => setInputVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveCustomVideoUrl}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Salvar Link
                    </button>
                    <button
                      onClick={() => setEditingVideo(false)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Video iFrame Player */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl relative">
              <iframe
                className="w-full h-full"
                src={currentClass.youtubeEmbedUrl}
                title={currentClass.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Summary & Key Topics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="md:col-span-2 space-y-3 p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Tópicos Abordados na Aula</span>
                </h4>
                <ul className="space-y-2">
                  {currentClass.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Resumo do Encontro</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {currentClass.summary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Lock Info Footer */}
        <div className="text-center pt-4 pb-8 border-t border-slate-800 space-y-2">
          <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Site em pausa — O acesso ao sistema está trancado e será liberado na próxima aula (Sábado às 13:00h)</span>
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">TJAM Estudos 2026</p>
        </div>
      </div>
    </div>
  );
};
