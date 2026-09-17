import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Search,
  Filter,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  BookOpen,
  X,
  Eye,
  HelpCircle,
} from 'lucide-react';
import { Flashcard, Discipline } from '../types';

interface TeacherFlashcardsManagerProps {
  flashcards: Flashcard[];
  disciplines: Discipline[];
  onAddFlashcard: (flashcard: Flashcard) => void;
  onUpdateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  onDeleteFlashcard: (id: string) => void;
  isDarkMode?: boolean;
}

export const TeacherFlashcardsManager: React.FC<TeacherFlashcardsManagerProps> = ({
  flashcards,
  disciplines,
  onAddFlashcard,
  onUpdateFlashcard,
  onDeleteFlashcard,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Add Flashcard Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDiscId, setNewDiscId] = useState(disciplines[0]?.id || '');
  const [newTopicName, setNewTopicName] = useState('');
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'fácil' | 'médio' | 'difícil'>('médio');

  // Edit Flashcard Modal State
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [editDiscId, setEditDiscId] = useState('');
  const [editTopicName, setEditTopicName] = useState('');
  const [editFront, setEditFront] = useState('');
  const [editBack, setEditBack] = useState('');
  const [editDifficulty, setEditDifficulty] = useState<'fácil' | 'médio' | 'difícil'>('médio');

  // Interactive Flip Preview Map (cardId -> boolean)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = flashcards.filter((card) => {
    const matchesSearch =
      card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.back.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.topicName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDisc =
      selectedDisciplineId === 'all' || card.disciplineId === selectedDisciplineId;

    const matchesDiff =
      selectedDifficulty === 'all' || card.difficulty === selectedDifficulty;

    return matchesSearch && matchesDisc && matchesDiff;
  });

  const handleOpenEdit = (card: Flashcard) => {
    setEditingCard(card);
    setEditDiscId(card.disciplineId);
    setEditTopicName(card.topicName);
    setEditFront(card.front);
    setEditBack(card.back);
    setEditDifficulty(card.difficulty || 'médio');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard || !editFront.trim() || !editBack.trim()) return;

    onUpdateFlashcard(editingCard.id, {
      disciplineId: editDiscId,
      topicName: editTopicName.trim() || 'Geral',
      front: editFront.trim(),
      back: editBack.trim(),
      difficulty: editDifficulty,
    });

    setEditingCard(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    const disc = disciplines.find((d) => d.id === newDiscId);
    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      disciplineId: newDiscId || disciplines[0]?.id || 'geral',
      topicId: `${newDiscId}-top`,
      topicName: newTopicName.trim() || disc?.name || 'Tópico Geral',
      front: newFront.trim(),
      back: newBack.trim(),
      difficulty: newDifficulty,
      repetitionCount: 0,
      easeFactor: 2.5,
      intervalDays: 1,
    };

    onAddFlashcard(newCard);
    setShowAddModal(false);
    setNewFront('');
    setNewBack('');
    setNewTopicName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-purple-600" /> Paridade Total com o Portal do Aluno
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
            Gestão & Criação de Flashcards de Memorização TJAM
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Aqui você administra os flashcards que os alunos utilizam na seção "Flashcards". Você pode criar novos cards com perguntas e respostas objetivas, editar prazos e fundamentações legais, testar o verso e excluir cartões.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Criar Novo Flashcard
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por pergunta, resposta, lei ou assunto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedDisciplineId}
            onChange={(e) => setSelectedDisciplineId(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-purple-500"
          >
            <option value="all">Todas as Matérias ({flashcards.length})</option>
            {disciplines.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-purple-500"
          >
            <option value="all">Todas as Dificuldades</option>
            <option value="fácil">Fácil</option>
            <option value="médio">Médio</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card) => {
          const isFlipped = Boolean(flippedCards[card.id]);
          const disc = disciplines.find((d) => d.id === card.disciplineId);

          return (
            <div
              key={card.id}
              className="rounded-3xl border border-slate-200 bg-white shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-purple-300 transition-all"
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-extrabold uppercase">
                    {disc?.name || card.topicName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      card.difficulty === 'fácil'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : card.difficulty === 'difícil'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {card.difficulty || 'médio'}
                  </span>
                </div>

                {/* Card Face Content */}
                <div
                  onClick={() => toggleCardFlip(card.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer min-h-[140px] flex flex-col justify-between ${
                    isFlipped
                      ? 'bg-purple-950 text-purple-100 border-purple-800'
                      : 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-purple-50/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider mb-2">
                      <span className={isFlipped ? 'text-purple-300' : 'text-slate-400'}>
                        {isFlipped ? 'VERSO (RESPOSTA/GABARITO)' : 'FRENTE (PERGUNTA/CONCEITO)'}
                      </span>
                      <RotateCcw className="w-3.5 h-3.5 opacity-60" />
                    </div>

                    <p className="text-xs font-bold leading-relaxed whitespace-pre-line">
                      {isFlipped ? card.back : card.front}
                    </p>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-right opacity-60">
                    Toque para virar ↺
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => toggleCardFlip(card.id)}
                  className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Ver Pergunta' : 'Ver Resposta'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(card)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-all cursor-pointer"
                    title="Editar flashcard"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Tem certeza que deseja excluir este flashcard?')) {
                        onDeleteFlashcard(card.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                    title="Excluir flashcard"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Flashcard */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" /> Criar Novo Flashcard
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Disciplina</label>
                  <select
                    value={newDiscId}
                    onChange={(e) => setNewDiscId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none"
                  >
                    {disciplines.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dificuldade</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none"
                  >
                    <option value="fácil">Fácil</option>
                    <option value="médio">Médio</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assunto / Artigo do Edital</label>
                <input
                  type="text"
                  placeholder="Ex: Art. 45 - Prazos do Oficial de Justiça no Regimento Interno"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Frente do Cartão (Pergunta / Conceito / Situação Hipotética)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Qual o prazo legal para cumprimento do mandado judicial de urgência segundo o Regimento Interno do TJAM?"
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Verso do Cartão (Resposta Oficial & Fundamento Jurídico)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Prazo: 24 horas. Fundamento: Lei Complementar Estadual nº 17/1997, Art. 112, § 2º."
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Salvar Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Flashcard */}
      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-purple-600" /> Editar Flashcard
              </h3>
              <button
                onClick={() => setEditingCard(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Disciplina</label>
                  <select
                    value={editDiscId}
                    onChange={(e) => setEditDiscId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none"
                  >
                    {disciplines.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dificuldade</label>
                  <select
                    value={editDifficulty}
                    onChange={(e) => setEditDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none"
                  >
                    <option value="fácil">Fácil</option>
                    <option value="médio">Médio</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assunto / Artigo do Edital</label>
                <input
                  type="text"
                  value={editTopicName}
                  onChange={(e) => setEditTopicName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Frente (Pergunta)</label>
                <textarea
                  rows={3}
                  required
                  value={editFront}
                  onChange={(e) => setEditFront(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Verso (Resposta & Lei)</label>
                <textarea
                  rows={4}
                  required
                  value={editBack}
                  onChange={(e) => setEditBack(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
