import React, { useState } from 'react';
import {
  Video,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Play,
  Save,
  Search,
  Filter,
  Calendar,
  Clock,
  Radio,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Discipline, VideoLesson, LiveClass } from '../types';

interface TeacherLessonsAndVideosManagerProps {
  disciplines: Discipline[];
  videoLessons: VideoLesson[];
  liveClasses: LiveClass[];
  onAddTopic: (disciplineId: string, topicName: string) => void;
  onUpdateTopic: (disciplineId: string, topicId: string, newName: string) => void;
  onDeleteTopic: (disciplineId: string, topicId: string) => void;
  onAddVideoLesson: (video: Omit<VideoLesson, 'id'>) => void;
  onUpdateVideoLesson: (videoId: string, updated: Partial<VideoLesson>) => void;
  onDeleteVideoLesson: (videoId: string) => void;
  onAddLiveClass?: (live: Omit<LiveClass, 'id'>) => void;
  onUpdateLiveClassStatus?: (liveId: string, status: LiveClass['status']) => void;
  onDeleteLiveClass?: (liveId: string) => void;
}

export const TeacherLessonsAndVideosManager: React.FC<TeacherLessonsAndVideosManagerProps> = ({
  disciplines,
  videoLessons,
  liveClasses,
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic,
  onAddVideoLesson,
  onUpdateVideoLesson,
  onDeleteVideoLesson,
  onAddLiveClass,
  onUpdateLiveClassStatus,
  onDeleteLiveClass,
}) => {
  const [subTab, setSubTab] = useState<'aulas' | 'videos' | 'lives'>('aulas');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(disciplines[0]?.id || 'legislacao-tjam');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Add Topic State
  const [newTopicName, setNewTopicName] = useState<string>('');
  const [isAddingTopic, setIsAddingTopic] = useState<boolean>(false);
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editingTopicName, setEditingTopicName] = useState<string>('');

  // Add Video State
  const [isAddingVideo, setIsAddingVideo] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoDisciplineId, setVideoDisciplineId] = useState<string>(disciplines[0]?.id || 'legislacao-tjam');
  const [videoTopicId, setVideoTopicId] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoDuration, setVideoDuration] = useState<number>(45);
  const [videoSummary, setVideoSummary] = useState<string>('');
  const [videoInstructor, setVideoInstructor] = useState<string>('Profª Jéssica Alves');

  // Edit Video State
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editVideoTitle, setEditVideoTitle] = useState<string>('');
  const [editVideoUrl, setEditVideoUrl] = useState<string>('');
  const [editVideoDuration, setEditVideoDuration] = useState<number>(45);
  const [editVideoSummary, setEditVideoSummary] = useState<string>('');

  // Preview Video State
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Helper to convert standard youtube url into embed format
  const formatEmbedUrl = (url: string): string => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    return url;
  };

  const handleSaveNewTopic = () => {
    if (!newTopicName.trim()) return;
    onAddTopic(selectedDisciplineId, newTopicName.trim());
    setNewTopicName('');
    setIsAddingTopic(false);
  };

  const handleSaveEditTopic = (topicId: string) => {
    if (!editingTopicName.trim()) return;
    onUpdateTopic(selectedDisciplineId, topicId, editingTopicName.trim());
    setEditingTopicId(null);
    setEditingTopicName('');
  };

  const handleSaveNewVideo = () => {
    if (!videoTitle.trim() || !videoUrl.trim()) return;
    onAddVideoLesson({
      title: videoTitle.trim(),
      disciplineId: videoDisciplineId,
      topicId: videoTopicId || `${videoDisciplineId}-1`,
      videoUrl: formatEmbedUrl(videoUrl.trim()),
      durationMinutes: Number(videoDuration) || 30,
      summary: videoSummary.trim() || 'Videoaula do Edital Oficial TJAM',
      instructor: videoInstructor.trim() || 'Profª Jéssica Alves',
      isPublished: true,
    });
    setVideoTitle('');
    setVideoUrl('');
    setVideoSummary('');
    setIsAddingVideo(false);
  };

  const handleSaveEditVideo = (videoId: string) => {
    onUpdateVideoLesson(videoId, {
      title: editVideoTitle,
      videoUrl: formatEmbedUrl(editVideoUrl),
      durationMinutes: editVideoDuration,
      summary: editVideoSummary,
    });
    setEditingVideoId(null);
  };

  const currentDiscipline = disciplines.find((d) => d.id === selectedDisciplineId) || disciplines[0];

  const filteredTopics = currentDiscipline?.topics?.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredVideos = videoLessons.filter((v) => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return v.title.toLowerCase().includes(term) || (v.instructor && v.instructor.toLowerCase().includes(term));
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Controller Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-2">
              <Video className="w-3.5 h-3.5 text-indigo-600" />
              Gestão de Conteúdo Pedagógico
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Administração de Aulas & Vídeos do Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Você tem controle total sobre os tópicos de estudo, aulas publicadas, links das transmissões no YouTube/Vimeo e gravações ao vivo que aparecem para todos os alunos.
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setSubTab('aulas')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                subTab === 'aulas'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 inline mr-1.5" /> Aulas & Tópicos ({disciplines.reduce((acc, d) => acc + (d.topics?.length || 0), 0)})
            </button>
            <button
              onClick={() => setSubTab('videos')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                subTab === 'videos'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5 inline mr-1.5" /> Videoaulas ({videoLessons.length})
            </button>
            <button
              onClick={() => setSubTab('lives')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                subTab === 'lives'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 inline mr-1.5 text-rose-500" /> Aulas ao Vivo ({liveClasses.length})
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: AULAS E TÓPICOS */}
      {subTab === 'aulas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Discipline Selector Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider px-2 mb-2">
              Selecione a Disciplina ({disciplines.length})
            </h3>
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {disciplines.map((disc) => {
                const isSelected = disc.id === selectedDisciplineId;
                return (
                  <button
                    key={disc.id}
                    onClick={() => {
                      setSelectedDisciplineId(disc.id);
                      setIsAddingTopic(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{disc.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-600 text-slate-950 font-black' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {disc.topics?.length || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topics in Selected Discipline */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  {currentDiscipline?.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentDiscipline?.topics?.length || 0} aulas e tópicos cadastrados no plano de aula do aluno.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingTopic(true)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Nova Aula / Tópico
                </button>
              </div>
            </div>

            {/* Add Topic Inline Form */}
            {isAddingTopic && (
              <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                    <Plus className="w-4 h-4 text-amber-600" /> Adicionar Nova Aula em {currentDiscipline?.name}
                  </span>
                  <button
                    onClick={() => setIsAddingTopic(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Teoria Geral dos Recursos e Apelação no TJAM"
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleSaveNewTopic}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Salvar Aula
                  </button>
                </div>
              </div>
            )}

            {/* Topics List */}
            <div className="space-y-2">
              {filteredTopics.map((topic, index) => {
                const isEditing = editingTopicId === topic.id;

                return (
                  <div
                    key={topic.id}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-750 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-400 shrink-0">
                        {index + 1}
                      </span>

                      {isEditing ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={editingTopicName}
                            onChange={(e) => setEditingTopicName(e.target.value)}
                            className="flex-1 px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-xs font-bold text-slate-900 dark:text-white"
                          />
                          <button
                            onClick={() => handleSaveEditTopic(topic.id)}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-xs font-bold"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setEditingTopicId(null)}
                            className="px-2 py-1 text-slate-400 hover:text-slate-600 text-xs"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {topic.name}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {topic.id} • Liberada no Portal
                          </span>
                        </div>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setEditingTopicId(topic.id);
                            setEditingTopicName(topic.name);
                          }}
                          className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="Editar Nome da Aula"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTopic(selectedDisciplineId, topic.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Excluir Aula"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: VIDEOAULAS */}
      {subTab === 'videos' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-500" />
                Videoaulas Cadastradas ({videoLessons.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina os links dos vídeos do YouTube/Vimeo, instrutores e resumos teóricos que os alunos assistem no portal.
              </p>
            </div>

            <button
              onClick={() => setIsAddingVideo(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Publicar Nova Videoaula
            </button>
          </div>

          {/* Add Video Modal / Box */}
          {isAddingVideo && (
            <div className="p-5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                  <Video className="w-4 h-4 text-indigo-600" /> Nova Videoaula para os Alunos
                </h4>
                <button
                  onClick={() => setIsAddingVideo(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Título da Videoaula
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Videoaula 02 - Competências do Pleno do TJAM"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Disciplina
                  </label>
                  <select
                    value={videoDisciplineId}
                    onChange={(e) => setVideoDisciplineId(e.target.value)}
                    aria-label="Disciplina da Videoaula"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    {disciplines.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Link do Vídeo (YouTube, Vimeo ou Embed)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: https://www.youtube.com/watch?v=ubZ4FIBOHeg"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(parseInt(e.target.value) || 30)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Resumo Teórico / Anotações da Aula
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Resumo esquematizado dos incisos mais cobrados em prova..."
                    value={videoSummary}
                    onChange={(e) => setVideoSummary(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Professor Responsável
                  </label>
                  <input
                    type="text"
                    value={videoInstructor}
                    onChange={(e) => setVideoInstructor(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleSaveNewVideo}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Salvar e Liberar no Portal do Aluno
                </button>
              </div>
            </div>
          )}

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVideos.map((video) => {
              const disc = disciplines.find((d) => d.id === video.disciplineId);
              const isEditing = editingVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400/50 transition-colors space-y-3"
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editVideoTitle}
                        onChange={(e) => setEditVideoTitle(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={editVideoUrl}
                        onChange={(e) => setEditVideoUrl(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSaveEditVideo(video.id)}
                          className="px-3 py-1 bg-emerald-600 text-white rounded-md text-xs font-bold"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditingVideoId(null)}
                          className="px-2 py-1 text-slate-400 hover:text-slate-600 text-xs"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            {disc?.name || video.disciplineId}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1.5">
                            {video.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {video.instructor || 'Profª Jéssica Alves'} • {video.durationMinutes} minutos
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setPreviewVideoUrl(video.videoUrl)}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors cursor-pointer"
                            title="Testar Player"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingVideoId(video.id);
                              setEditVideoTitle(video.title);
                              setEditVideoUrl(video.videoUrl);
                              setEditVideoDuration(video.durationMinutes);
                              setEditVideoSummary(video.summary);
                            }}
                            className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
                            title="Editar Link"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteVideoLesson(video.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                            title="Excluir Videoaula"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {video.summary}
                      </p>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-750 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate max-w-xs font-mono">{video.videoUrl}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Liberada para Alunos
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Video Preview Player Modal */}
          {previewVideoUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <div className="bg-slate-900 rounded-2xl max-w-3xl w-full p-4 border border-slate-800 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    Pré-visualização do Player do Aluno
                  </span>
                  <button
                    onClick={() => setPreviewVideoUrl(null)}
                    className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1"
                  >
                    Fechar ✕
                  </button>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={previewVideoUrl}
                    title="Player Test"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: AULAS AO VIVO & TRANSMISSÕES */}
      {subTab === 'lives' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-rose-500" />
                Transmissões & Aulas ao Vivo
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Agende mentorias pelo Google Meet/YouTube Live e libere gravações para os alunos assistirem depois.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveClasses.map((live) => (
              <div
                key={live.id}
                className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      live.status === 'ao-vivo'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : live.status === 'agendada'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {live.status === 'ao-vivo' ? '🔴 Transmitindo Ao Vivo' : live.status === 'agendada' ? '📅 Agendada' : '📼 Gravada'}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5">{live.title}</h4>
                    <span className="text-xs text-slate-500 block">{live.disciplineName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-mono"><Calendar className="w-3.5 h-3.5" /> {live.date}</span>
                  <span className="flex items-center gap-1 font-mono"><Clock className="w-3.5 h-3.5" /> {live.time}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <a
                    href={live.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    Abrir Sala de Aula <ExternalLink className="w-3 h-3" />
                  </a>

                  {onUpdateLiveClassStatus && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateLiveClassStatus(live.id, live.status === 'ao-vivo' ? 'concluida' : 'ao-vivo')}
                        className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-bold"
                      >
                        {live.status === 'ao-vivo' ? 'Encerrar Live' : 'Iniciar Ao Vivo'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
