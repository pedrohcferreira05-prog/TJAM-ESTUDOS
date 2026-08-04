import React, { useState } from 'react';
import {
  Discipline,
  MindMap,
  Question,
  Flashcard,
  Simulado,
  NewsItem,
} from '../types';
import {
  Users,
  BookOpen,
  HelpCircle,
  Brain,
  FileSpreadsheet,
  Newspaper,
  BarChart2,
  Database,
  Plus,
  Trash2,
  Edit2,
  Save,
  Download,
  Upload,
  CheckCircle2,
  Settings,
  Sparkles,
  Search
} from 'lucide-react';

interface AdminPanelProps {
  isSuperAdmin?: boolean;
  disciplines: Discipline[];
  mindMaps: MindMap[];
  questions: Question[];
  flashcards: Flashcard[];
  simulados: Simulado[];
  news: NewsItem[];
  onSaveMindMap: (map: MindMap) => void;
  onDeleteMindMap: (id: string) => void;
  onAddQuestion: (q: Question) => void;
  onAddFlashcard: (f: Flashcard) => void;
  onAddNews: (n: NewsItem) => void;
  onExportBackup: () => void;
  onImportBackup: (data: string) => void;
  isDarkMode: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isSuperAdmin = false,
  disciplines,
  mindMaps,
  questions,
  flashcards,
  simulados,
  news,
  onSaveMindMap,
  onDeleteMindMap,
  onAddQuestion,
  onAddFlashcard,
  onAddNews,
  onExportBackup,
  onImportBackup,
  isDarkMode,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'disciplines' | 'questions' | 'flashcards' | 'mindmaps' | 'simulados' | 'news' | 'users' | 'moderation' | 'logs' | 'backup'
  >(isSuperAdmin ? 'users' : 'disciplines');

  // Mock User State for Admin Management
  const [usersList, setUsersList] = useState([
    { id: 'usr-01', name: 'Prof. Dr. Alberto Silva', email: 'alberto.silva@tjam.jus.br', role: 'Professor', permissions: 'Total', status: 'Ativo' },
    { id: 'usr-02', name: 'Profa. Dra. Roberta Farias', email: 'roberta.farias@tjam.jus.br', role: 'Professor', permissions: 'Total', status: 'Ativo' },
    { id: 'usr-03', name: 'Maria Eduarda Amazonas', email: 'maria.amazonas@gmail.com', role: 'Aluno', permissions: 'Estudante', status: 'Ativo' },
    { id: 'usr-04', name: 'João Pedro Solimões', email: 'jpedro.solimoes@hotmail.com', role: 'Aluno', permissions: 'Estudante', status: 'Ativo' },
    { id: 'usr-05', name: 'Coord. Carlos Fernando', email: 'carlos.coord@tjam.jus.br', role: 'Coordenador', permissions: 'Administrativo', status: 'Ativo' },
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Professor' | 'Aluno' | 'Coordenador' | 'Super Admin'>('Professor');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    setUsersList((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        permissions: newUserRole === 'Professor' ? 'Total' : 'Estudante',
        status: 'Ativo',
      },
    ]);

    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id));
  };

  // New Question Form State
  const [newQuestionDiscId, setNewQuestionDiscId] = useState(disciplines[0]?.id || '');
  const [newQuestionStatement, setNewQuestionStatement] = useState('');
  const [newQuestionOptA, setNewQuestionOptA] = useState('');
  const [newQuestionOptB, setNewQuestionOptB] = useState('');
  const [newQuestionOptC, setNewQuestionOptC] = useState('');
  const [newQuestionOptD, setNewQuestionOptD] = useState('');
  const [newQuestionOptE, setNewQuestionOptE] = useState('');
  const [newQuestionCorrect, setNewQuestionCorrect] = useState('opt-a');
  const [newQuestionExplanation, setNewQuestionExplanation] = useState('');

  // New Flashcard Form State
  const [newFcDiscId, setNewFcDiscId] = useState(disciplines[0]?.id || '');
  const [newFcFront, setNewFcFront] = useState('');
  const [newFcBack, setNewFcBack] = useState('');

  // New News Item State
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Comunicado');
  const [newNewsContent, setNewNewsContent] = useState('');

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionStatement.trim()) return;

    const disc = disciplines.find((d) => d.id === newQuestionDiscId);

    const q: Question = {
      id: `q-custom-${Date.now()}`,
      disciplineId: newQuestionDiscId,
      topicId: disc?.topics[0]?.id || 'custom-topic',
      topicName: disc?.topics[0]?.name || 'Geral',
      statement: newQuestionStatement,
      options: [
        { id: 'opt-a', text: `A) ${newQuestionOptA}` },
        { id: 'opt-b', text: `B) ${newQuestionOptB}` },
        { id: 'opt-c', text: `C) ${newQuestionOptC}` },
        { id: 'opt-d', text: `D) ${newQuestionOptD}` },
        { id: 'opt-e', text: `E) ${newQuestionOptE}` },
      ],
      correctOptionId: newQuestionCorrect,
      explanation: newQuestionExplanation,
      difficulty: 'médio',
      institution: 'Banca TJAM',
    };

    onAddQuestion(q);
    setNewQuestionStatement('');
    setNewQuestionOptA('');
    setNewQuestionOptB('');
    setNewQuestionOptC('');
    setNewQuestionOptD('');
    setNewQuestionOptE('');
    setNewQuestionExplanation('');
  };

  const handleCreateFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFcFront.trim() || !newFcBack.trim()) return;

    const disc = disciplines.find((d) => d.id === newFcDiscId);

    const fc: Flashcard = {
      id: `fc-custom-${Date.now()}`,
      disciplineId: newFcDiscId,
      topicId: disc?.topics[0]?.id || 'custom-topic',
      topicName: disc?.topics[0]?.name || 'Geral',
      front: newFcFront,
      back: newFcBack,
      difficulty: 'médio',
    };

    onAddFlashcard(fc);
    setNewFcFront('');
    setNewFcBack('');
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim()) return;

    const n: NewsItem = {
      id: `news-${Date.now()}`,
      title: newNewsTitle,
      category: newNewsCategory,
      date: new Date().toLocaleDateString('pt-BR'),
      summary: newNewsContent.slice(0, 100) + '...',
      content: newNewsContent,
      author: 'Administração TJAM Estudos',
      important: true,
    };

    onAddNews(n);
    setNewNewsTitle('');
    setNewNewsContent('');
  };

  return (
    <div className="w-full space-y-6">
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-slate-900 to-slate-900 text-white shadow-xl border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Painel Administrativo do TJAM Estudos
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">Gestão do Sistema & Conteúdos</h2>
          <p className="text-xs text-purple-200/80">
            Gerencie questões, simulados, usuários, mapas mentais, flashcards e notícias do portal.
          </p>
        </div>

        <button
          onClick={onExportBackup}
          className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Exportar Backup (JSON)
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'users'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Users className="w-4 h-4" /> Usuários ({usersList.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('disciplines')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'disciplines'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Disciplinas ({disciplines.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('questions')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'questions'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Questões ({questions.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('flashcards')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'flashcards'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Brain className="w-4 h-4" /> Flashcards ({flashcards.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('mindmaps')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'mindmaps'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Mapas Mentais ({mindMaps.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('simulados')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'simulados'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Simulados ({simulados.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('moderation')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'moderation'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Moderação & Permissões
        </button>

        <button
          onClick={() => setActiveAdminTab('news')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'news'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Newspaper className="w-4 h-4" /> Notícias ({news.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'logs'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Settings className="w-4 h-4" /> Auditoria & Logs
        </button>

        <button
          onClick={() => setActiveAdminTab('backup')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeAdminTab === 'backup'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Database className="w-4 h-4" /> Backup & Sync
        </button>
      </div>

      {/* Tab Content: Users Management */}
      {activeAdminTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" /> Gerenciamento de Usuários do Portal
              </h3>
              <p className="text-xs text-slate-400">
                Cadastre e gerencie permissões para Professores, Coordenadores e Alunos do TJAM Estudos.
              </p>
            </div>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Novo Usuário
            </button>
          </div>

          {showAddUserModal && (
            <form
              onSubmit={handleCreateUser}
              className={`p-6 rounded-3xl border space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <h4 className="font-extrabold text-sm">Cadastrar Novo Usuário</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nome completo..."
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className={`p-2.5 rounded-xl border text-xs outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                  required
                />
                <input
                  type="email"
                  placeholder="Email institucional / pessoal..."
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className={`p-2.5 rounded-xl border text-xs outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                  required
                />
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className={`p-2.5 rounded-xl border text-xs outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <option value="Professor">Professor</option>
                  <option value="Aluno">Aluno</option>
                  <option value="Coordenador">Coordenador</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold"
                >
                  Salvar Usuário
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          <div
            className={`rounded-3xl border overflow-hidden ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead
                  className={`border-b font-extrabold ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <tr>
                    <th className="p-3.5">Nome / Email</th>
                    <th className="p-3.5">Nível de Acesso</th>
                    <th className="p-3.5">Permissões</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-500/5">
                      <td className="p-3.5">
                        <div className="font-bold">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            u.role === 'Professor'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : u.role === 'Coordenador' || u.role === 'Super Admin'
                              ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                              : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">{u.permissions}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Excluir Usuário"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Moderation */}
      {activeAdminTab === 'moderation' && (
        <div className="space-y-4">
          <div
            className={`p-6 rounded-3xl border space-y-3 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Moderação e Aprovação de Conteúdos Publicados
            </h3>
            <p className="text-xs text-slate-500">
              Todos os materiais e questões inseridos pelos professores podem ser auditados e aprovados pela coordenação pedagógica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                  Aprovação Automática de Materiais do TJAM
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Ativada: Conteúdos de professores credenciados são lançados diretamente.</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">
                  Permissões Globais de Professores
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Professores possuem autorização para publicar videoaulas, PDFs, mapas e simulados.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: System Audit Logs */}
      {activeAdminTab === 'logs' && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <h3 className="font-extrabold text-base flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-500" /> Logs de Auditoria do Sistema
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 flex justify-between">
              <span>[SYSTEM LOG] Sincronização do edital TJAM efetuada com sucesso.</span>
              <span className="text-slate-500">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 text-purple-400 flex justify-between">
              <span>[ADMIN] Login efetuado com perfil de Super Administrador.</span>
              <span className="text-slate-500">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 text-blue-400 flex justify-between">
              <span>[SYNC] Estado salvo e persistido com sucesso no Firestore local.</span>
              <span className="text-slate-500">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Disciplines */}
      {activeAdminTab === 'disciplines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {disciplines.map((d) => (
            <div
              key={d.id}
              className={`p-5 rounded-3xl border space-y-2 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-purple-500">#{d.order} {d.code}</span>
                <span className="text-xs text-slate-400">{d.topics.length} tópicos</span>
              </div>
              <h4 className="font-extrabold text-base">{d.name}</h4>
              <p className="text-xs text-slate-500">{d.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Questões */}
      {activeAdminTab === 'questions' && (
        <div className="space-y-6">
          <form
            onSubmit={handleCreateQuestion}
            className={`p-6 rounded-3xl border space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-500" /> Cadastrar Nova Questão de Concurso
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Disciplina:</label>
                <select
                  value={newQuestionDiscId}
                  onChange={(e) => setNewQuestionDiscId(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Alternativa Correta:</label>
                <select
                  value={newQuestionCorrect}
                  onChange={(e) => setNewQuestionCorrect(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <option value="opt-a">A</option>
                  <option value="opt-b">B</option>
                  <option value="opt-c">C</option>
                  <option value="opt-d">D</option>
                  <option value="opt-e">E</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Enunciado da Questão:</label>
              <textarea
                rows={3}
                placeholder="Digite o enunciado completo..."
                value={newQuestionStatement}
                onChange={(e) => setNewQuestionStatement(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Alternativa A..."
                value={newQuestionOptA}
                onChange={(e) => setNewQuestionOptA(e.target.value)}
                className={`w-full p-2 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
              <input
                type="text"
                placeholder="Alternativa B..."
                value={newQuestionOptB}
                onChange={(e) => setNewQuestionOptB(e.target.value)}
                className={`w-full p-2 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
              <input
                type="text"
                placeholder="Alternativa C..."
                value={newQuestionOptC}
                onChange={(e) => setNewQuestionOptC(e.target.value)}
                className={`w-full p-2 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
              <input
                type="text"
                placeholder="Alternativa D..."
                value={newQuestionOptD}
                onChange={(e) => setNewQuestionOptD(e.target.value)}
                className={`w-full p-2 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
              <input
                type="text"
                placeholder="Alternativa E..."
                value={newQuestionOptE}
                onChange={(e) => setNewQuestionOptE(e.target.value)}
                className={`w-full p-2 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Comentário / Fundamentação:</label>
              <textarea
                rows={2}
                placeholder="Fundamentação com artigos de lei ou jurisprudência..."
                value={newQuestionExplanation}
                onChange={(e) => setNewQuestionExplanation(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md"
            >
              Salvar Questão
            </button>
          </form>

          {/* List of existing questions */}
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border text-xs ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex justify-between font-bold text-purple-400 mb-1">
                  <span>Questão #{idx + 1} - {q.topicName}</span>
                </div>
                <p className="font-medium">{q.statement}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Flashcards */}
      {activeAdminTab === 'flashcards' && (
        <div className="space-y-6">
          <form
            onSubmit={handleCreateFlashcard}
            className={`p-6 rounded-3xl border space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-500" /> Cadastrar Novo Flashcard
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Disciplina:</label>
              <select
                value={newFcDiscId}
                onChange={(e) => setNewFcDiscId(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              >
                {disciplines.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Frente (Pergunta / Conceito):</label>
              <input
                type="text"
                placeholder="Ex: Qual o prazo do Mandado de Segurança?"
                value={newFcFront}
                onChange={(e) => setNewFcFront(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Verso (Resposta Direta):</label>
              <input
                type="text"
                placeholder="Ex: 120 dias a contar da ciência do ato."
                value={newFcBack}
                onChange={(e) => setNewFcBack(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md"
            >
              Salvar Flashcard
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {flashcards.map((f) => (
              <div
                key={f.id}
                className={`p-4 rounded-2xl border text-xs space-y-1 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <span className="text-[10px] text-purple-400 font-bold uppercase">{f.topicName}</span>
                <p className="font-extrabold">Frente: {f.front}</p>
                <p className="text-slate-500">Verso: {f.back}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Notícias */}
      {activeAdminTab === 'news' && (
        <div className="space-y-6">
          <form
            onSubmit={handleCreateNews}
            className={`p-6 rounded-3xl border space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="font-extrabold text-base">Publicar Notícia no Portal TJAM</h3>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Título:</label>
              <input
                type="text"
                placeholder="Título do comunicado..."
                value={newNewsTitle}
                onChange={(e) => setNewNewsTitle(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Conteúdo:</label>
              <textarea
                rows={4}
                placeholder="Texto da notícia..."
                value={newNewsContent}
                onChange={(e) => setNewNewsContent(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md"
            >
              Publicar Notícia
            </button>
          </form>
        </div>
      )}

      {/* Tab Content: Backup & Sync */}
      {activeAdminTab === 'backup' && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <h3 className="font-extrabold text-base flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-500" /> Sincronização & Backup de Dados
          </h3>

          <p className="text-xs text-slate-500">
            Exporte todo o banco de dados do TJAM Estudos em formato JSON para criar pontos de restauração ou importar dados em novos navegadores.
          </p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={onExportBackup}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Baixar Backup em JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
