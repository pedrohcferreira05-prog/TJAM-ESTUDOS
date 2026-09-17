import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  ListOrdered,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  AlertTriangle,
  FolderPlus,
  Save,
} from 'lucide-react';
import { Discipline, Topic } from '../types';

interface TeacherDisciplinesManagerProps {
  disciplines: Discipline[];
  onAddDiscipline: (discipline: Discipline) => void;
  onUpdateDiscipline: (id: string, updates: Partial<Discipline>) => void;
  onDeleteDiscipline: (id: string) => void;
  onAddTopic: (disciplineId: string, topicName: string) => void;
  onUpdateTopic: (disciplineId: string, topicId: string, newName: string) => void;
  onDeleteTopic: (disciplineId: string, topicId: string) => void;
  isDarkMode?: boolean;
}

export const TeacherDisciplinesManager: React.FC<TeacherDisciplinesManagerProps> = ({
  disciplines,
  onAddDiscipline,
  onUpdateDiscipline,
  onDeleteDiscipline,
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDiscId, setExpandedDiscId] = useState<string | null>(disciplines[0]?.id || null);

  // Add Discipline Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDiscName, setNewDiscName] = useState('');
  const [newDiscCode, setNewDiscCode] = useState('');
  const [newDiscColor, setNewDiscColor] = useState('blue');
  const [newDiscDesc, setNewDiscDesc] = useState('');
  const [newDiscInitialTopics, setNewDiscInitialTopics] = useState('');

  // Edit Discipline Modal
  const [editingDisc, setEditingDisc] = useState<Discipline | null>(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editColor, setEditColor] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Add Topic Inline State
  const [addingTopicDiscId, setAddingTopicDiscId] = useState<string | null>(null);
  const [newTopicName, setNewTopicName] = useState('');

  // Edit Topic State
  const [editingTopicKey, setEditingTopicKey] = useState<{ discId: string; topicId: string } | null>(null);
  const [editTopicName, setEditTopicName] = useState('');

  const filteredDisciplines = disciplines.filter((d) => {
    const q = searchTerm.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.topics.some((t) => t.name.toLowerCase().includes(q))
    );
  });

  const handleOpenEditModal = (d: Discipline) => {
    setEditingDisc(d);
    setEditName(d.name);
    setEditCode(d.code);
    setEditColor(d.color || 'blue');
    setEditDesc(d.description || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDisc || !editName.trim()) return;

    onUpdateDiscipline(editingDisc.id, {
      name: editName.trim(),
      code: editCode.trim() || editingDisc.code,
      color: editColor,
      description: editDesc.trim(),
    });

    setEditingDisc(null);
  };

  const handleCreateDisciplineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscName.trim()) return;

    const topicLines = newDiscInitialTopics
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const initialTopics: Topic[] = topicLines.map((tName, i) => ({
      id: `topic-${Date.now()}-${i}`,
      name: tName,
      completed: false,
    }));

    const newDisc: Discipline = {
      id: `disc-${Date.now()}`,
      name: newDiscName.trim(),
      code: newDiscCode.trim() || 'TJAM',
      order: disciplines.length + 1,
      icon: 'BookOpen',
      color: newDiscColor,
      description: newDiscDesc.trim() || 'Conteúdo programático oficial do edital TJAM.',
      topics: initialTopics.length > 0 ? initialTopics : [
        { id: `topic-${Date.now()}-0`, name: 'Introdução e Teoria Geral', completed: false }
      ],
    };

    onAddDiscipline(newDisc);
    setShowAddModal(false);
    setNewDiscName('');
    setNewDiscCode('');
    setNewDiscDesc('');
    setNewDiscInitialTopics('');
  };

  const handleAddTopicSubmit = (discId: string) => {
    if (!newTopicName.trim()) return;
    onAddTopic(discId, newTopicName.trim());
    setNewTopicName('');
    setAddingTopicDiscId(null);
  };

  const handleSaveTopicEdit = (discId: string, topicId: string) => {
    if (!editTopicName.trim()) return;
    onUpdateTopic(discId, topicId, editTopicName.trim());
    setEditingTopicKey(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Paridade Total com o Portal do Aluno
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
            Administração de Matérias & Conteúdo do Edital TJAM
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Aqui você administra todas as matérias que aparecem no menu "Matérias (Edital)" para os alunos. Você pode criar novas matérias, editar ementas, nomes e cores, excluir disciplinas e organizar tópicos programáticos.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Adicionar Nova Matéria
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar matéria ou assunto do edital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>

        <div className="text-xs font-bold text-slate-500 self-center">
          Total de Matérias: <span className="text-slate-900 font-extrabold">{disciplines.length}</span>
        </div>
      </div>

      {/* Disciplines Grid / List */}
      <div className="space-y-4">
        {filteredDisciplines.map((disc) => {
          const isExpanded = expandedDiscId === disc.id;

          return (
            <div
              key={disc.id}
              className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[10px] font-mono font-bold uppercase">
                        {disc.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                        {disc.topics?.length || 0} Assuntos
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mt-1 truncate">
                      {disc.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                      {disc.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleOpenEditModal(disc)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                    title="Editar matéria"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Editar
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Tem certeza que deseja excluir a disciplina "${disc.name}"? Esta ação removerá a matéria do portal do aluno.`)) {
                        onDeleteDiscipline(disc.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    title="Excluir disciplina"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setExpandedDiscId(isExpanded ? null : disc.id)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>{isExpanded ? 'Ocultar Assuntos' : 'Ver Assuntos'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Topics Management Section */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-200 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Tópicos do Edital para Esta Disciplina ({disc.topics.length})
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        setAddingTopicDiscId(disc.id);
                        setNewTopicName('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Assunto
                    </button>
                  </div>

                  {/* Add Topic Input Inline */}
                  {addingTopicDiscId === disc.id && (
                    <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        placeholder="Nome do assunto (Ex: Art. 1º ao 20 do Regimento Interno TJAM)..."
                        value={newTopicName}
                        onChange={(e) => setNewTopicName(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium outline-none focus:border-indigo-500"
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddTopicSubmit(disc.id)}
                          className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all"
                        >
                          Salvar Assunto
                        </button>
                        <button
                          onClick={() => setAddingTopicDiscId(null)}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-all"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Topics List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {disc.topics.map((top, idx) => {
                      const isEditingThisTopic =
                        editingTopicKey?.discId === disc.id && editingTopicKey?.topicId === top.id;

                      if (isEditingThisTopic) {
                        return (
                          <div
                            key={top.id}
                            className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-300 flex items-center gap-2"
                          >
                            <input
                              type="text"
                              value={editTopicName}
                              onChange={(e) => setEditTopicName(e.target.value)}
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveTopicEdit(disc.id, top.id)}
                              className="p-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                              title="Salvar"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingTopicKey(null)}
                              className="p-1.5 rounded-lg bg-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-400"
                              title="Cancelar"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={top.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 font-black text-[10px] flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-semibold text-slate-900 truncate">
                              {top.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => {
                                setEditingTopicKey({ discId: disc.id, topicId: top.id });
                                setEditTopicName(top.name);
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                              title="Editar assunto"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remover o assunto "${top.name}"?`)) {
                                  onDeleteTopic(disc.id, top.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
                              title="Excluir assunto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Add Discipline */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-indigo-600" /> Cadastrar Nova Matéria do Edital
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDisciplineSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome Completo da Matéria</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Direito Processual Penal"
                  value={newDiscName}
                  onChange={(e) => setNewDiscName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-semibold text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código / Sigla</label>
                  <input
                    type="text"
                    placeholder="Ex: D.PROC.PENAL"
                    value={newDiscCode}
                    onChange={(e) => setNewDiscCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cor de Destaque</label>
                  <select
                    value={newDiscColor}
                    onChange={(e) => setNewDiscColor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none focus:border-indigo-500"
                  >
                    <option value="indigo">Indigo</option>
                    <option value="blue">Azul</option>
                    <option value="emerald">Verde (Emerald)</option>
                    <option value="purple">Roxo</option>
                    <option value="amber">Âmbar</option>
                    <option value="rose">Rosa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição / Ementa Geral</label>
                <textarea
                  rows={3}
                  placeholder="Descreva os artigos da lei, doutrina e pontos cruciais exigidos pela banca FGV..."
                  value={newDiscDesc}
                  onChange={(e) => setNewDiscDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Assuntos Iniciais do Edital (1 por linha)
                </label>
                <textarea
                  rows={4}
                  placeholder="Inquérito Policial&#10;Ação Penal Pública e Privada&#10;Provas no Processo Penal&#10;Prisão em Flagrante e Preventiva"
                  value={newDiscInitialTopics}
                  onChange={(e) => setNewDiscInitialTopics(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono text-[11px] text-slate-900 outline-none focus:border-indigo-500"
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
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Criar Matéria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Discipline */}
      {editingDisc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-indigo-600" /> Editar Matéria: {editingDisc.name}
              </h3>
              <button
                onClick={() => setEditingDisc(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome da Matéria</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-semibold text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código / Sigla</label>
                  <input
                    type="text"
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cor</label>
                  <select
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none focus:border-indigo-500"
                  >
                    <option value="indigo">Indigo</option>
                    <option value="blue">Azul</option>
                    <option value="emerald">Verde (Emerald)</option>
                    <option value="purple">Roxo</option>
                    <option value="amber">Âmbar</option>
                    <option value="rose">Rosa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ementa e Instruções do Edital</label>
                <textarea
                  rows={4}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingDisc(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
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
