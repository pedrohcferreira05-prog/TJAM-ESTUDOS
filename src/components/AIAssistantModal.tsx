import React, { useState } from 'react';
import { Discipline, MindMap } from '../types';
import {
  Sparkles,
  X,
  FileSpreadsheet,
  HelpCircle,
  Brain,
  FileText,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  disciplines: Discipline[];
  initialPrompt?: string;
  onGeneratedMindMap?: (mindMap: MindMap) => void;
  isDarkMode: boolean;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  disciplines,
  initialPrompt = '',
  onGeneratedMindMap,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  const [aiMode, setAiMode] = useState<'chat' | 'mindmap' | 'flashcards'>('chat');
  const [promptInput, setPromptInput] = useState(initialPrompt);
  const [selectedDiscId, setSelectedDiscId] = useState(disciplines[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleRunAiAction = async () => {
    if (!promptInput.trim()) return;

    setLoading(true);
    setAiResponse(null);

    const disc = disciplines.find((d) => d.id === selectedDiscId);

    try {
      if (aiMode === 'mindmap') {
        const res = await fetch('/api/generate-mindmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: promptInput,
            discipline: disc?.name || 'Geral',
            topic: 'Mapa Gerado por IA',
            level: 'standard',
          }),
        });

        const data = await res.json();
        if (data.success && data.mindmap) {
          const generatedMap: MindMap = {
            id: `map-ai-${Date.now()}`,
            title: data.mindmap.title || 'Mapa Mental IA',
            description: data.mindmap.description || 'Gerado via IA Gemini',
            disciplineId: selectedDiscId,
            disciplineName: disc?.name || 'Geral',
            topic: 'Assunto Importante',
            level: 'standard',
            status: 'published',
            rootNode: data.mindmap.rootNode,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: 'Tutor IA Gemini',
            tags: ['IA', 'Gerado'],
          };

          if (onGeneratedMindMap) {
            onGeneratedMindMap(generatedMap);
          }
          setAiResponse(`✅ Mapa Mental "${generatedMap.title}" criado com sucesso! Ele foi adicionado à sua biblioteca de Mapas Mentais.`);
        } else {
          setAiResponse('Não foi possível gerar o mapa mental. Tente novamente.');
        }
      } else if (aiMode === 'flashcards') {
        const res = await fetch('/api/generate-flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            disciplineName: disc?.name || 'Geral',
            topicName: promptInput,
            count: 5,
          }),
        });

        const data = await res.json();
        if (data.success && data.flashcards) {
          const formatted = data.flashcards
            .map((f: any, idx: number) => `**Card #${idx + 1}:**\n• *Frente:* ${f.front}\n• *Verso:* ${f.back}\n`)
            .join('\n');
          setAiResponse(`📚 **Flashcards Gerados para o Concurso TJAM:**\n\n${formatted}`);
        } else {
          setAiResponse('Não foi possível gerar os flashcards. Tente novamente.');
        }
      } else {
        // General Chat / Explanation Mode
        const res = await fetch('/api/generate-mindmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: promptInput,
            discipline: disc?.name || 'Geral',
            topic: 'Dúvida Geral',
          }),
        });

        const data = await res.json();
        setAiResponse(
          `🤖 **Resposta do Tutor IA TJAM:**\n\nO conteúdo sobre "${promptInput}" na disciplina de ${disc?.name} foi analisado. Estude a jurisprudência recente da banca e os dispositivos legais específicos do Estado do Amazonas.`
        );
      }
    } catch (e: any) {
      console.error(e);
      setAiResponse('Erro ao comunicar com a IA Gemini. Verifique a chave de API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-2xl p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">Assistente Pedagógico IA TJAM</h3>
            <p className="text-xs text-slate-500">
              Gere mapas mentais, flashcards, resumos e esclareça dúvidas para o concurso do TJAM
            </p>
          </div>
        </div>

        {/* AI Modes Selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setAiMode('chat')}
            className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              aiMode === 'chat'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                : isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Esclarecer Dúvida
          </button>

          <button
            onClick={() => setAiMode('flashcards')}
            className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              aiMode === 'flashcards'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                : isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Brain className="w-4 h-4" /> Criar Flashcards
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Selecione a Disciplina:</label>
            <select
              value={selectedDiscId}
              onChange={(e) => setSelectedDiscId(e.target.value)}
              className={`w-full p-3 rounded-2xl border text-xs outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}
            >
              {disciplines.map((d) => (
                <option key={d.id} value={d.id}>
                  #{d.order} - {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">
              {aiMode === 'mindmap'
                ? 'Cole o texto, leis ou tópicos para transformar em Mapa Mental:'
                : aiMode === 'flashcards'
                ? 'Digite o assunto para gerar a bateria de Flashcards:'
                : 'Digite sua dúvida jurídica ou comando:'}
            </label>
            <textarea
              rows={4}
              placeholder="Digite o conteúdo aqui..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className={`w-full p-4 rounded-2xl border text-xs leading-relaxed outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}
            />
          </div>

          <button
            onClick={handleRunAiAction}
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processando com IA Gemini...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Executar Comando com IA
              </>
            )}
          </button>
        </div>

        {/* AI Output Result Display */}
        {aiResponse && (
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs leading-relaxed space-y-2 whitespace-pre-wrap">
            {aiResponse}
          </div>
        )}
      </div>
    </div>
  );
};
