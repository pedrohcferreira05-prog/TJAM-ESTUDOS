import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MindMap, MindMapNode, LayoutStyle } from '../types';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  CheckCircle2,
  Star,
  Download,
  Printer,
  Share2,
  Search,
  Sparkles,
  FileText,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
  Layers,
  Info,
  HelpCircle
} from 'lucide-react';
import { exportToPNG, exportToSVG, printOrExportPDF, copyShareLink } from '../utils/exportUtils';

interface MindMapCanvasProps {
  mindMap: MindMap;
  isStudied?: boolean;
  isFavorite?: boolean;
  personalNote?: string;
  nodeNotes?: Record<string, string>;
  isDarkMode?: boolean;
  isAdmin?: boolean;
  onToggleStudied?: () => void;
  onToggleFavorite?: () => void;
  onSavePersonalNote?: (note: string) => void;
  onSaveNodeNote?: (nodeId: string, note: string) => void;
  onUpdateMindMap?: (updatedMap: MindMap) => void;
  onAIDeepenNode?: (node: MindMapNode) => void;
}

interface LayoutNode {
  id: string;
  data: MindMapNode;
  x: number;
  y: number;
  width: number;
  height: number;
  parent?: LayoutNode;
  children: LayoutNode[];
}

export const MindMapCanvas: React.FC<MindMapCanvasProps> = ({
  mindMap,
  isStudied = false,
  isFavorite = false,
  personalNote = '',
  nodeNotes = {},
  isDarkMode = false,
  isAdmin = false,
  onToggleStudied = () => {},
  onToggleFavorite = () => {},
  onSavePersonalNote = (_note: string) => {},
  onSaveNodeNote = (_nodeId: string, _note: string) => {},
  onUpdateMindMap,
  onAIDeepenNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [rootNodeState, setRootNodeState] = useState<MindMapNode>(mindMap.rootNode);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>('tree-horizontal');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [editingNoteText, setEditingNoteText] = useState<string>('');
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);

  // Sync root node when mindMap changes
  useEffect(() => {
    setRootNodeState(mindMap.rootNode);
  }, [mindMap]);

  // Center initial view
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setPan({ x: clientWidth / 2 - 250, y: clientHeight / 2 - 200 });
      setZoom(0.95);
    }
  }, [mindMap.id]);

  // Expand / Collapse Node Handler
  const toggleNodeCollapse = (nodeId: string) => {
    const updateRecursive = (current: MindMapNode): MindMapNode => {
      if (current.id === nodeId) {
        return { ...current, collapsed: !current.collapsed };
      }
      if (current.children) {
        return {
          ...current,
          children: current.children.map(updateRecursive),
        };
      }
      return current;
    };

    const newRoot = updateRecursive(rootNodeState);
    setRootNodeState(newRoot);
    if (onUpdateMindMap) {
      onUpdateMindMap({ ...mindMap, rootNode: newRoot });
    }
  };

  // Expand All or Collapse All
  const setAllCollapsed = (collapse: boolean) => {
    const updateAll = (node: MindMapNode): MindMapNode => ({
      ...node,
      collapsed: node.id === rootNodeState.id ? false : collapse,
      children: node.children ? node.children.map(updateAll) : [],
    });
    const newRoot = updateAll(rootNodeState);
    setRootNodeState(newRoot);
    if (onUpdateMindMap) {
      onUpdateMindMap({ ...mindMap, rootNode: newRoot });
    }
  };

  // Compute Layout Geometry (Tree Positions)
  const computedLayout = useMemo(() => {
    const nodeWidth = 220;
    const nodeHeight = 70;
    const horizontalGap = 100;
    const verticalGap = 30;

    let yOffset = 0;

    const calculatePositionsHorizontal = (
      node: MindMapNode,
      depth: number,
      parent?: LayoutNode
    ): LayoutNode => {
      const isCollapsed = node.collapsed;
      const visibleChildren = !isCollapsed && node.children ? node.children : [];

      const layoutNode: LayoutNode = {
        id: node.id,
        data: node,
        x: depth * (nodeWidth + horizontalGap),
        y: 0,
        width: nodeWidth,
        height: nodeHeight,
        parent,
        children: [],
      };

      if (visibleChildren.length === 0) {
        layoutNode.y = yOffset;
        yOffset += nodeHeight + verticalGap;
      } else {
        const childrenLayouts = visibleChildren.map((child) =>
          calculatePositionsHorizontal(child, depth + 1, layoutNode)
        );
        layoutNode.children = childrenLayouts;
        const firstChildY = childrenLayouts[0].y;
        const lastChildY = childrenLayouts[childrenLayouts.length - 1].y;
        layoutNode.y = (firstChildY + lastChildY) / 2;
      }

      return layoutNode;
    };

    yOffset = 0;
    return calculatePositionsHorizontal(rootNodeState, 0);
  }, [rootNodeState]);

  // Flatten nodes for rendering
  const flattenNodes = (layout: LayoutNode): LayoutNode[] => {
    const list: LayoutNode[] = [layout];
    if (layout.children) {
      layout.children.forEach((c) => {
        list.push(...flattenNodes(c));
      });
    }
    return list;
  };

  const allLayoutNodes = useMemo(() => flattenNodes(computedLayout), [computedLayout]);

  // Mouse drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.4), 2.5));
  };

  const resetView = () => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setPan({ x: clientWidth / 2 - 250, y: clientHeight / 2 - 200 });
      setZoom(0.95);
    }
  };

  // Count total nodes & studied nodes
  const countNodes = (node: MindMapNode): number => {
    let count = 1;
    if (node.children) {
      node.children.forEach((c) => {
        count += countNodes(c);
      });
    }
    return count;
  };

  const totalNodesCount = useMemo(() => countNodes(rootNodeState), [rootNodeState]);

  // Open note for selected node
  const handleOpenNote = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setEditingNoteText(nodeNotes?.[nodeId] || '');
    setShowNoteModal(true);
  };

  const handleSaveNodeNote = () => {
    if (selectedNodeId) {
      onSaveNodeNote(selectedNodeId, editingNoteText);
      setShowNoteModal(false);
    }
  };

  // Selected Node Data
  const selectedNodeData = useMemo(() => {
    if (!selectedNodeId) return null;
    const findNode = (node: MindMapNode): MindMapNode | null => {
      if (node.id === selectedNodeId) return node;
      if (node.children) {
        for (const child of node.children) {
          const res = findNode(child);
          if (res) return res;
        }
      }
      return null;
    };
    return findNode(rootNodeState);
  }, [selectedNodeId, rootNodeState]);

  // Share link handler
  const handleShare = async () => {
    const success = await copyShareLink(mindMap.id);
    if (success) {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  // Admin: Add child node
  const handleAddChildNode = (parentId: string) => {
    const label = prompt('Digite o nome do novo nó/tópico:');
    if (!label || !label.trim()) return;

    const newNode: MindMapNode = {
      id: `node-${Date.now()}`,
      label: label.trim(),
      color: mindMap.rootNode.color || '#2563eb',
      children: [],
    };

    const addRecursive = (curr: MindMapNode): MindMapNode => {
      if (curr.id === parentId) {
        return {
          ...curr,
          collapsed: false,
          children: [...(curr.children || []), newNode],
        };
      }
      if (curr.children) {
        return { ...curr, children: curr.children.map(addRecursive) };
      }
      return curr;
    };

    const newRoot = addRecursive(rootNodeState);
    setRootNodeState(newRoot);
    if (onUpdateMindMap) {
      onUpdateMindMap({ ...mindMap, rootNode: newRoot });
    }
  };

  // Admin: Delete node
  const handleDeleteNode = (nodeId: string) => {
    if (nodeId === rootNodeState.id) {
      alert('Não é possível excluir o nó raiz do mapa mental.');
      return;
    }
    if (!confirm('Deseja realmente excluir este nó e todas as suas ramificações?')) return;

    const deleteRecursive = (curr: MindMapNode): MindMapNode => {
      if (!curr.children) return curr;
      return {
        ...curr,
        children: curr.children
          .filter((c) => c.id !== nodeId)
          .map(deleteRecursive),
      };
    };

    const newRoot = deleteRecursive(rootNodeState);
    setRootNodeState(newRoot);
    if (onUpdateMindMap) {
      onUpdateMindMap({ ...mindMap, rootNode: newRoot });
    }
  };

  return (
    <div
      className={`relative w-full h-[calc(100vh-140px)] min-h-[600px] rounded-2xl border flex flex-col overflow-hidden select-none transition-colors duration-300 ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}
    >
      {/* Canvas Top Bar Controls */}
      <div
        className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 z-10 backdrop-blur-md ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}
      >
        {/* Title & Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg leading-tight">{mindMap.title}</h2>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                mindMap.level === 'simplified'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : mindMap.level === 'advanced'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
              }`}
            >
              {mindMap.level === 'simplified'
                ? 'Simplificado'
                : mindMap.level === 'advanced'
                ? 'Avançado'
                : 'Padrão'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>• {totalNodesCount} tópicos</span>
            <span>• {mindMap.disciplineName}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Search bar in map */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none w-36 sm:w-48 transition-all ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-emerald-500'
                  : 'bg-slate-100 border-slate-200 text-slate-800 focus:border-emerald-600'
              }`}
            />
          </div>

          {/* Toggle Studied Button */}
          <button
            onClick={onToggleStudied}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isStudied
                ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            title="Marcar como estudado/concluído"
          >
            <CheckCircle2 className={`w-4 h-4 ${isStudied ? 'text-white' : 'text-slate-400'}`} />
            <span>{isStudied ? 'Estudado' : 'Marcar como Estudado'}</span>
          </button>

          {/* Toggle Favorite Star */}
          <button
            onClick={onToggleFavorite}
            className={`p-1.5 rounded-lg border transition-all ${
              isFavorite
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                : isDarkMode
                ? 'border-slate-700 text-slate-400 hover:text-amber-400'
                : 'border-slate-200 text-slate-400 hover:text-amber-500'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Favoritar mapa'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>

          {/* Export & Download Menu */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isDarkMode
                  ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Exportar</span>
            </button>

            {showExportMenu && (
              <div
                className={`absolute right-0 mt-1 w-48 rounded-xl shadow-xl border py-1.5 z-50 text-xs ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    if (containerRef.current) exportToPNG(containerRef.current, mindMap.title);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-500/10 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-blue-500" />
                  <span>Baixar em Imagem (PNG)</span>
                </button>
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    if (containerRef.current) {
                      const svg = containerRef.current.querySelector('svg');
                      if (svg) exportToSVG(svg, mindMap.title);
                    }
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-500/10 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-amber-500" />
                  <span>Baixar em Vetor (SVG)</span>
                </button>
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    if (containerRef.current) printOrExportPDF(mindMap, containerRef.current);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-500/10 flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-purple-500" />
                  <span>Imprimir / Gerar PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className={`p-1.5 rounded-lg border transition-all ${
              isDarkMode
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            }`}
            title="Compartilhar mapa por link"
          >
            <Share2 className="w-4 h-4 text-emerald-500" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle, #334155 1px, transparent 1px)'
            : 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* SVG Canvas for Lines and Node Elements */}
        <div
          className="absolute origin-top-left transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          <svg className="overflow-visible" width="3000" height="3000">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Lines between Parent and Child Nodes */}
            {allLayoutNodes.map((node) => {
              if (!node.parent) return null;

              const parentX = node.parent.x + node.parent.width;
              const parentY = node.parent.y + node.parent.height / 2;
              const childX = node.x;
              const childY = node.y + node.height / 2;

              const cp1X = parentX + (childX - parentX) / 2;
              const cp1Y = parentY;
              const cp2X = parentX + (childX - parentX) / 2;
              const cp2Y = childY;

              const pathString = `M ${parentX} ${parentY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${childX} ${childY}`;
              const lineColor = node.data.color || node.parent.data.color || '#94a3b8';

              return (
                <path
                  key={`line-${node.parent.id}-${node.id}`}
                  d={pathString}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity={isDarkMode ? 0.7 : 0.6}
                />
              );
            })}
          </svg>

          {/* HTML Overlay for Mind Map Nodes */}
          {allLayoutNodes.map((node) => {
            const isMatch =
              searchQuery.trim().length > 0 &&
              node.data.label.toLowerCase().includes(searchQuery.toLowerCase());
            const hasChildren = node.data.children && node.data.children.length > 0;
            const isCollapsed = node.data.collapsed;
            const isSelected = selectedNodeId === node.id;
            const nodeNote = nodeNotes?.[node.id] || node.data.note;
            const nodeColor = node.data.color || '#2563eb';

            return (
              <div
                key={`node-${node.id}`}
                onClick={() => setSelectedNodeId(node.id)}
                className={`absolute rounded-xl p-3 border shadow-md transition-all duration-200 group flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'
                } ${
                  isMatch
                    ? 'ring-2 ring-amber-400 ring-offset-2 scale-105 z-20 shadow-amber-500/20'
                    : ''
                } ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 ring-offset-2 z-20'
                    : 'hover:border-emerald-500 hover:shadow-lg'
                }`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.width}px`,
                  minHeight: `${node.height}px`,
                  borderLeftWidth: '5px',
                  borderLeftColor: nodeColor,
                }}
              >
                {/* Node Top Row Badges */}
                <div className="flex items-center justify-between gap-1 mb-1 text-[10px]">
                  <div className="flex items-center gap-1">
                    {node.data.isKeyConcept && (
                      <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        CONCEITO CHAVE
                      </span>
                    )}
                  </div>

                  {/* Note indicator */}
                  {nodeNote && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenNote(node.id);
                      }}
                      className="text-emerald-500 hover:text-emerald-600 p-0.5"
                      title="Ver anotação"
                    >
                      <FileText className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Node Label Text */}
                <div className="font-semibold text-xs leading-snug break-words">
                  {node.data.label}
                </div>

                {/* Sub-note preview if short */}
                {node.data.note && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 italic font-normal">
                    {node.data.note}
                  </div>
                )}

                {/* Node Action Footer (Collapse/Expand & Admin tools) */}
                <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                  {/* Expand/Collapse Toggle Button */}
                  {hasChildren || node.data.children ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNodeCollapse(node.id);
                      }}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-600 transition-colors"
                    >
                      {isCollapsed ? (
                        <>
                          <ChevronRight className="w-3 h-3" />
                          <span className="font-medium text-[10px]">
                            +{node.data.children?.length} ramos
                          </span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3" />
                          <span className="font-medium text-[10px]">Recolher</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">folha</span>
                  )}

                  {/* Actions for Node: Note / Admin Plus / AI */}
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenNote(node.id);
                      }}
                      className="p-1 hover:text-emerald-500"
                      title="Adicionar anotação pessoal neste nó"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>

                    {isAdmin && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddChildNode(node.id);
                          }}
                          className="p-1 hover:text-blue-500"
                          title="Adicionar subnó"
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNode(node.id);
                          }}
                          className="p-1 hover:text-rose-500"
                          title="Excluir nó"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    )}

                    {onAIDeepenNode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAIDeepenNode(node.data);
                        }}
                        className="p-1 text-purple-500 hover:text-purple-600"
                        title="Aprofundar este tópico com a Inteligência Artificial"
                      >
                        <Sparkles className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Navigation Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl shadow-xl border backdrop-blur-md z-30 transition-all bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800">
        <button
          onClick={() => handleZoom(0.15)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          title="Aumentar zoom (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-semibold w-12 text-center text-slate-500">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={() => handleZoom(-0.15)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          title="Diminuir zoom (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          onClick={resetView}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          title="Centralizar e ajustar tela"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          onClick={() => setAllCollapsed(false)}
          className="px-2 py-1 text-xs font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          Expandir Todos
        </button>

        <button
          onClick={() => setAllCollapsed(true)}
          className="px-2 py-1 text-xs font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          Recolher Todos
        </button>
      </div>

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="absolute top-16 right-6 bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Link do Mapa Mental copiado para a área de transferência!</span>
        </div>
      )}

      {/* Node Note Modal */}
      {showNoteModal && selectedNodeData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                Anotação do Tópico: {selectedNodeData.label}
              </h3>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Escreva observações pessoais, regras adicionais ou macetes de memorização para este nó.
            </p>

            <textarea
              rows={5}
              value={editingNoteText}
              onChange={(e) => setEditingNoteText(e.target.value)}
              placeholder="Digite aqui sua anotação pessoal..."
              className={`w-full p-3 text-xs rounded-xl border outline-none font-sans leading-relaxed ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-emerald-500'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-600'
              }`}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveNodeNote}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
              >
                Salvar Anotação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
