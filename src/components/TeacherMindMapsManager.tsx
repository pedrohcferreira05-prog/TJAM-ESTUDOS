import React, { useState } from 'react';
import {
  Brain,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  FolderTree,
  Eye,
  X,
  Share2,
  Layers,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Save,
} from 'lucide-react';
import { MindMap, MindMapNode, Discipline } from '../types';

interface TeacherMindMapsManagerProps {
  mindMaps: MindMap[];
  disciplines: Discipline[];
  onSaveMindMap: (map: MindMap) => void;
  onDeleteMindMap: (id: string) => void;
  isDarkMode?: boolean;
}

export const TeacherMindMapsManager: React.FC<TeacherMindMapsManagerProps> = ({
  mindMaps,
  disciplines,
  onSaveMindMap,
  onDeleteMindMap,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('all');

  // Preview Tree Modal State
  const [previewingMap, setPreviewingMap] = useState<MindMap | null>(null);

  // Add / Edit Mind Map Modal State
  const [editingMap, setEditingMap] = useState<MindMap | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDiscId, setFormDiscId] = useState(disciplines[0]?.id || '');
  const [formTopic, setFormTopic] = useState('');
  const [formLevel, setFormLevel] = useState<'simplified' | 'standard' | 'advanced'>('standard');
  const [formRootLabel, setFormRootLabel] = useState('');
  const [formBranchesText, setFormBranchesText] = useState('');

  const filteredMaps = mindMaps.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDisc =
      selectedDisciplineId === 'all' || m.disciplineId === selectedDisciplineId;

    return matchesSearch && matchesDisc;
  });

  const handleOpenCreate = () => {
    setIsCreatingNew(true);
    setEditingMap(null);
    setFormTitle('');
    setFormDesc('');
    setFormDiscId(disciplines[0]?.id || '');
    setFormTopic('');
    setFormLevel('standard');
    setFormRootLabel('');
    setFormBranchesText(
      'Conceito e Princípios Fundamentais\nCompetências do Tribunal\nPrazos e Procedimentos Especiais\nJurisprudência do TJAM'
    );
  };

  const handleOpenEdit = (m: MindMap) => {
    setIsCreatingNew(false);
    setEditingMap(m);
    setFormTitle(m.title);
    setFormDesc(m.description);
    setFormDiscId(m.disciplineId);
    setFormTopic(m.topic);
    setFormLevel(m.level);
    setFormRootLabel(m.rootNode?.label || m.title);

    // Extract branches into text lines
    const childLabels = m.rootNode?.children?.map((c) => c.label).join('\n') || '';
    setFormBranchesText(childLabels);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formRootLabel.trim()) return;

    const disc = disciplines.find((d) => d.id === formDiscId);
    const branches = formBranchesText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const childrenNodes: MindMapNode[] = branches.map((bName, idx) => ({
      id: `node-${Date.now()}-${idx}`,
      label: bName,
      isKeyConcept: idx === 0,
      children: [
        {
          id: `subnode-${Date.now()}-${idx}-1`,
          label: `Desdobramento prático: ${bName}`,
        },
      ],
    }));

    const rootNode: MindMapNode = {
      id: editingMap?.rootNode?.id || `root-${Date.now()}`,
      label: formRootLabel.trim(),
      children: childrenNodes,
    };

    const mapToSave: MindMap = {
      id: editingMap?.id || `map-${Date.now()}`,
      title: formTitle.trim(),
      description: formDesc.trim() || 'Esquema visual estratégico para memorização dos pontos-chave do edital.',
      disciplineId: formDiscId,
      disciplineName: disc?.name || 'Geral',
      topic: formTopic.trim() || disc?.name || 'Tópico Geral',
      level: formLevel,
      status: 'published',
      rootNode,
      createdAt: editingMap?.createdAt || new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      author: 'Profª Jéssica Alves',
      tags: ['TJAM', 'FGV', disc?.name || 'Edital'],
    };

    onSaveMindMap(mapToSave);
    setIsCreatingNew(false);
    setEditingMap(null);
  };

  // Helper recursive renderer for mind map node preview
  const renderNodePreview = (node: MindMapNode, depth = 0) => {
    return (
      <div key={node.id} className="space-y-1.5" style={{ marginLeft: depth > 0 ? '16px' : '0' }}>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
          depth === 0
            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
            : depth === 1
            ? 'bg-sky-50 dark:bg-sky-950 text-sky-900 dark:text-sky-200 border-sky-300'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300'
        }`}>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span>{node.label}</span>
          {node.note && <span className="text-[10px] font-normal opacity-80">({node.note})</span>}
        </div>

        {node.children && node.children.length > 0 && (
          <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-2 space-y-1.5 my-1">
            {node.children.map((child) => renderNodePreview(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold">
            <Brain className="w-3.5 h-3.5 text-teal-600" /> Paridade Total com o Portal do Aluno
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
            Gestão & Criação de Mapas Mentais Estratégicos TJAM
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Aqui você administra os mapas mentais da seção "Mapas Mentais" do aluno. Crie novos diagramas conceituais, edite os ramos principais e ramificações mnemônicas, pré-visualize a árvore lógica e exclua esquemas desatualizados.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black shadow-md flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Criar Novo Mapa Mental
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar mapas mentais por título, disciplina ou assunto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
          />
        </div>

        <select
          value={selectedDisciplineId}
          onChange={(e) => setSelectedDisciplineId(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-teal-500 shrink-0"
        >
          <option value="all">Todas as Matérias ({mindMaps.length})</option>
          {disciplines.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mind Maps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaps.map((map) => {
          const disc = disciplines.find((d) => d.id === map.disciplineId);
          const childCount = map.rootNode?.children?.length || 0;

          return (
            <div
              key={map.id}
              className="rounded-3xl border border-slate-200 bg-white shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-teal-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-extrabold uppercase">
                    {disc?.name || map.disciplineName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {childCount} Ramos Principais
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{map.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {map.description}
                  </p>
                </div>

                {/* Root Concept Preview Chip */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Nó Central (Raiz):
                  </span>
                  <div className="font-extrabold text-teal-800 flex items-center gap-1.5 truncate">
                    <Brain className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{map.rootNode?.label || map.title}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => setPreviewingMap(map)}
                  className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>Árvore Visual</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(map)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-all cursor-pointer"
                    title="Editar mapa mental"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Excluir o mapa mental "${map.title}"? Esta ação o removerá da biblioteca dos alunos.`)) {
                        onDeleteMindMap(map.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                    title="Excluir mapa mental"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Preview Tree */}
      {previewingMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-teal-600">
                  Esquema Hierárquico do Aluno
                </span>
                <h3 className="text-lg font-black text-slate-900">{previewingMap.title}</h3>
              </div>
              <button
                onClick={() => setPreviewingMap(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              {renderNodePreview(previewingMap.rootNode)}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewingMap(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create or Edit Mind Map */}
      {(isCreatingNew || editingMap) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-teal-600" />
                <span>{isCreatingNew ? 'Cadastrar Novo Mapa Mental' : `Editar Mapa: ${editingMap?.title}`}</span>
              </h3>
              <button
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingMap(null);
                }}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Título do Mapa Mental</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Teoria Geral do Inquérito Policial - TJAM"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Disciplina</label>
                  <select
                    value={formDiscId}
                    onChange={(e) => setFormDiscId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none focus:border-teal-500"
                  >
                    {disciplines.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nível de Profundidade</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 outline-none focus:border-teal-500"
                  >
                    <option value="simplified">Simplificado (Visão Geral)</option>
                    <option value="standard">Padrão (Edital TJAM)</option>
                    <option value="advanced">Avançado (Jurisprudência & Súmulas)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assunto Específico / Tópico</label>
                <input
                  type="text"
                  placeholder="Ex: Art. 4º ao 23 do CPP"
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição & Dicas de Memorização</label>
                <textarea
                  rows={2}
                  placeholder="Instruções para o aluno memorizar os conceitos com facilidade..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Conceito Central (Nó Raiz)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Inquérito Policial (CPP)"
                  value={formRootLabel}
                  onChange={(e) => setFormRootLabel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-extrabold text-teal-800 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Ramos Principais do Mapa (1 conceito por linha)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Características: Escrito, Sigiloso, Inquisitivo, Indisponível&#10;Instauração: De ofício, Requisição ou Requerimento&#10;Prazos de Conclusão: Preso (10 dias) / Solto (30 dias)&#10;Arquivamento e Acordo de Não Persecução Penal"
                  value={formBranchesText}
                  onChange={(e) => setFormBranchesText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono text-[11px] text-slate-900 outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingMap(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  Salvar Mapa Mental
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
