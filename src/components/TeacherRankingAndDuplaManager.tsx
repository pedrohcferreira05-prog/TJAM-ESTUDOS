import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Users,
  Award,
  Edit2,
  Trash2,
  Plus,
  RotateCcw,
  Save,
  CheckCircle2,
  ShieldCheck,
  Search,
  Filter,
  UserCheck,
  Flame,
  Clock,
  Key,
  AlertTriangle,
  Ban,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  User,
  Sliders,
} from 'lucide-react';
import {
  RankingsService,
} from '../lib/rankingsService';
import {
  ProfileManagementService,
  DuoProfile,
  StudentProfileData,
} from '../lib/profileManagementService';
import { RankingDuplaItem, RankingIndividualItem } from '../data/rankingsData';
import { StudentAccountService } from '../lib/studentAccountService';

export const TeacherRankingAndDuplaManager: React.FC<{ isDarkMode?: boolean }> = ({
  isDarkMode = false,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'duplas' | 'individual' | 'perfil-dupla' | 'perfil-aluno'>('duplas');
  const [duplasRanking, setDuplasRanking] = useState<RankingDuplaItem[]>([]);
  const [individualRanking, setIndividualRanking] = useState<RankingIndividualItem[]>([]);
  const [duoProfile, setDuoProfile] = useState<DuoProfile>(() => ProfileManagementService.getDuoProfile());
  const [studentProfiles, setStudentProfiles] = useState<Record<string, StudentProfileData>>(() =>
    ProfileManagementService.getAllStudentProfiles()
  );
  const [selectedStudentId, setSelectedStudentId] = useState<string>('id00120087');

  const [searchTerm, setSearchTerm] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modal / Inline Editing for Duplas Ranking
  const [editingDuplaIndex, setEditingDuplaIndex] = useState<number | null>(null);
  const [editDuplaForm, setEditDuplaForm] = useState<Partial<RankingDuplaItem>>({});

  // Modal / Inline Editing for Individual Ranking
  const [editingIndIndex, setEditingIndIndex] = useState<number | null>(null);
  const [editIndForm, setEditIndForm] = useState<Partial<RankingIndividualItem>>({});

  // Add Item State
  const [showAddDuplaModal, setShowAddDuplaModal] = useState(false);
  const [newDuplaName, setNewDuplaName] = useState('');
  const [newDuplaScore, setNewDuplaScore] = useState('35,0%');
  const [newDuplaRank, setNewDuplaRank] = useState('6');
  const [newDuplaDesc, setNewDuplaDesc] = useState('Dupla Regular TJAM');

  const [showAddIndModal, setShowAddIndModal] = useState(false);
  const [newIndName, setNewIndName] = useState('');
  const [newIndScore, setNewIndScore] = useState('75,0%');
  const [newIndCorrect, setNewIndCorrect] = useState('60/80');
  const [newIndRank, setNewIndRank] = useState('5');

  // Load and subscribe to live changes
  const reloadData = () => {
    setDuplasRanking(RankingsService.getDuplasRanking());
    setIndividualRanking(RankingsService.getIndividualRanking());
    setDuoProfile(ProfileManagementService.getDuoProfile());
    setStudentProfiles(ProfileManagementService.getAllStudentProfiles());
  };

  useEffect(() => {
    reloadData();
    const handleStorage = () => reloadData();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('tjam_rankings_updated', handleStorage);
    window.addEventListener('tjam_duo_profile_updated', handleStorage);
    window.addEventListener('tjam_student_profile_updated', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('tjam_rankings_updated', handleStorage);
      window.removeEventListener('tjam_duo_profile_updated', handleStorage);
      window.removeEventListener('tjam_student_profile_updated', handleStorage);
    };
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // ==========================================
  // ====== DUPLAS RANKING OPERATIONS ======
  // ==========================================
  const handleStartEditDupla = (index: number) => {
    setEditingDuplaIndex(index);
    setEditDuplaForm({ ...duplasRanking[index] });
  };

  const handleSaveEditDupla = async () => {
    if (editingDuplaIndex === null) return;
    const num = parseFloat(String(editDuplaForm.score || '').replace('%', '').replace(',', '.'));
    const percentageNum = isNaN(num) ? 30.0 : num;

    await RankingsService.updateDuplaItem(editingDuplaIndex, {
      ...editDuplaForm,
      percentageNum,
      barWidth: `${Math.min(100, Math.max(10, (percentageNum / 40) * 100))}%`,
    });
    setEditingDuplaIndex(null);
    reloadData();
    showToast('Ranking da Dupla atualizado e sincronizado com sucesso!');
  };

  const handleDeleteDupla = async (index: number) => {
    if (window.confirm(`Remover "${duplasRanking[index].name}" do ranking das duplas?`)) {
      await RankingsService.deleteDuplaItem(index);
      reloadData();
      showToast('Dupla removida do ranking.');
    }
  };

  const handleAddNewDupla = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDuplaName.trim()) return;

    const num = parseFloat(newDuplaScore.replace('%', '').replace(',', '.'));
    const percentageNum = isNaN(num) ? 30.0 : num;

    const item: RankingDuplaItem = {
      rank: parseInt(newDuplaRank) || duplasRanking.length + 1,
      name: newDuplaName.trim(),
      score: newDuplaScore.includes('%') ? newDuplaScore : `${newDuplaScore}%`,
      percentageNum,
      isUser: false,
      isSolo: false,
      description: newDuplaDesc || 'Dupla Regular TJAM',
      bgClass: 'bg-slate-900/60 border-slate-800/80',
      badgeClass: 'bg-slate-800 text-slate-300 font-bold',
      barClass: 'bg-slate-500',
      barWidth: `${Math.min(100, Math.max(10, (percentageNum / 40) * 100))}%`,
    };

    await RankingsService.addDuplaItem(item);
    setShowAddDuplaModal(false);
    setNewDuplaName('');
    setNewDuplaScore('35,0%');
    reloadData();
    showToast(`Nova dupla "${item.name}" adicionada ao ranking!`);
  };

  // Quick Action: Put Eduardo & Pedro in 1st place
  const handlePromoteDuoToFirst = async () => {
    const list = [...duplasRanking];
    const duoIdx = list.findIndex((d) => d.isUser || d.name.toLowerCase().includes('eduardo'));
    if (duoIdx !== -1) {
      list[duoIdx].rank = 1;
      list[duoIdx].score = '42,5%';
      list[duoIdx].percentageNum = 42.5;
      list[duoIdx].badgeClass = 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30';
      list[duoIdx].description = 'Dupla Oficial (Eduardo & Pedro) • 1º Lugar Geral TJAM';

      // Re-sort
      list.sort((a, b) => (Number(a.rank) || 99) - (Number(b.rank) || 99));
      await RankingsService.saveDuplasRanking(list);

      // Also update duo profile
      await ProfileManagementService.saveDuoProfile({
        rankPosition: 1,
        rankText: '1º Lugar Geral',
        scorePercentage: 42.5,
        scoreDisplay: '42,5%',
      });

      reloadData();
      showToast('Dupla Oficial Eduardo & Pedro promovida para o 1º Lugar Geral!');
    }
  };

  // ==========================================
  // ====== INDIVIDUAL RANKING OPERATIONS ======
  // ==========================================
  const handleStartEditInd = (index: number) => {
    setEditingIndIndex(index);
    setEditIndForm({ ...individualRanking[index] });
  };

  const handleSaveEditInd = async () => {
    if (editingIndIndex === null) return;
    const num = parseFloat(String(editIndForm.score || '').replace('%', '').replace(',', '.'));
    const percentageNum = isNaN(num) ? 80.0 : num;

    await RankingsService.updateIndividualItem(editingIndIndex, {
      ...editIndForm,
      percentageNum,
      barWidth: `${Math.min(100, Math.max(10, percentageNum))}%`,
    });
    setEditingIndIndex(null);
    reloadData();
    showToast('Ranking individual atualizado e sincronizado!');
  };

  const handleDeleteInd = async (index: number) => {
    if (window.confirm(`Remover "${individualRanking[index].name}" do ranking individual?`)) {
      await RankingsService.deleteIndividualItem(index);
      reloadData();
      showToast('Candidato removido do ranking individual.');
    }
  };

  const handleAddNewInd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndName.trim()) return;

    const num = parseFloat(newIndScore.replace('%', '').replace(',', '.'));
    const percentageNum = isNaN(num) ? 75.0 : num;
    const correctParts = newIndCorrect.split('/');
    const correctNum = parseInt(correctParts[0]) || 60;

    const item: RankingIndividualItem = {
      rank: parseInt(newIndRank) || individualRanking.length + 1,
      name: newIndName.trim(),
      score: newIndScore.includes('%') ? newIndScore : `${newIndScore}%`,
      percentageNum,
      correctCount: newIndCorrect,
      correctNum,
      isUser: false,
      badgeClass: 'bg-slate-800 text-slate-300 font-bold',
      bgClass: 'bg-slate-900/60 border-slate-800/80',
      barClass: 'bg-slate-500',
      barWidth: `${percentageNum}%`,
    };

    await RankingsService.addIndividualItem(item);
    setShowAddIndModal(false);
    setNewIndName('');
    reloadData();
    showToast(`Candidato "${item.name}" adicionado ao ranking individual!`);
  };

  // ==========================================
  // ====== RESET RANKINGS TO DEFAULT ======
  // ==========================================
  const handleResetRankings = async () => {
    if (window.confirm('Deseja restaurar as tabelas originais de ranking individual e de duplas?')) {
      await RankingsService.resetToDefaults();
      reloadData();
      showToast('Rankings restaurados para o padrão original da comissão.');
    }
  };

  // ==========================================
  // ====== DUO PROFILE SAVE ======
  // ==========================================
  const handleSaveDuoProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await ProfileManagementService.saveDuoProfile(duoProfile);

    // Sync with corresponding entry in duplas ranking
    const duplas = RankingsService.getDuplasRanking();
    const duoIdx = duplas.findIndex((d) => d.isUser || d.name.toLowerCase().includes('eduardo'));
    if (duoIdx !== -1) {
      duplas[duoIdx].name = duoProfile.name;
      duplas[duoIdx].rank = duoProfile.rankPosition;
      duplas[duoIdx].score = duoProfile.scoreDisplay;
      duplas[duoIdx].percentageNum = duoProfile.scorePercentage;
      duplas[duoIdx].description = duoProfile.motto;
      await RankingsService.saveDuplasRanking(duplas);
    }

    reloadData();
    showToast('Perfil da Dupla salvo e sincronizado em tempo real com todos os módulos!');
  };

  // ==========================================
  // ====== STUDENT PROFILE SAVE ======
  // ==========================================
  const currentStudent = studentProfiles[selectedStudentId] || ProfileManagementService.getStudentProfile(selectedStudentId);

  const handleSaveStudentProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await ProfileManagementService.saveStudentProfile(selectedStudentId, currentStudent);

    // Also sync password/name in StudentAccountService if exists
    const accounts = StudentAccountService.getLocalAccounts();
    const accIdx = accounts.findIndex((a) => a.id === selectedStudentId);
    if (accIdx !== -1) {
      accounts[accIdx].name = currentStudent.name;
      accounts[accIdx].email = currentStudent.email;
      accounts[accIdx].phone = currentStudent.phone;
      accounts[accIdx].status = currentStudent.status;
      if (currentStudent.password) {
        accounts[accIdx].password = currentStudent.password;
      }
      await StudentAccountService.saveAccount(accounts[accIdx]);
    }

    reloadData();
    showToast(`Perfil do aluno(a) ${currentStudent.name} salvo com sucesso!`);
  };

  // Filtered lists for rendering
  const filteredDuplas = duplasRanking.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(d.rank).includes(searchTerm)
  );

  const filteredInd = individualRanking.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(i.rank).includes(searchTerm) ||
      i.correctCount?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Super Admin Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              SUPER ADMINISTRADOR • CONTROLE TOTAL DO PROFESSOR
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Gestão Centralizada de Rankings e Perfis de Alunos & Dupla
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              O professor tem controle total: altere posições, pontuações do ranking das duplas e individual, edite o perfil da dupla oficial, customize dados dos alunos e sincronize tudo instantaneamente sem recarregar a página.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePromoteDuoToFirst}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Trophy className="w-4 h-4" />
              Dupla Eduardo & Pedro em 1º Lugar
            </button>
            <button
              onClick={handleResetRankings}
              className="px-3 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-1.5 cursor-pointer transition-all"
              title="Restaurar valores de ranking padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Padrão
            </button>
          </div>
        </div>
      </div>

      {/* Subtabs Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
        <button
          onClick={() => setActiveSubTab('duplas')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'duplas'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Ranking das Duplas ({duplasRanking.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('individual')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'individual'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Award className="w-4 h-4 text-sky-500" />
          <span>Ranking Individual (80Q) ({individualRanking.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('perfil-dupla')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'perfil-dupla'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Editar Perfil da Dupla Oficial</span>
        </button>

        <button
          onClick={() => setActiveSubTab('perfil-aluno')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'perfil-aluno'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <User className="w-4 h-4 text-indigo-600" />
          <span>Editar Perfil dos Alunos</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* ============ TAB 1: RANKING DAS DUPLAS ================= */}
      {/* ======================================================== */}
      {activeSubTab === 'duplas' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por nome de dupla, colocação ou descrição..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddDuplaModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" /> Adicionar Dupla
              </button>
            </div>
          </div>

          {/* Duplas Table */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Tabela Oficial de Classificação das Duplas
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {filteredDuplas.length} duplas cadastradas
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3 w-16">Posição</th>
                    <th className="px-4 py-3">Dupla / Integrantes</th>
                    <th className="px-4 py-3 w-32">Pontuação</th>
                    <th className="px-4 py-3">Status / Descrição</th>
                    <th className="px-4 py-3 text-right w-28">Ações Super Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDuplas.map((item, idx) => {
                    const originalIdx = duplasRanking.indexOf(item);
                    const isEditing = editingDuplaIndex === originalIdx;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          item.isUser
                            ? 'bg-emerald-50/70 hover:bg-emerald-50'
                            : item.isDisqualified
                            ? 'bg-rose-50/50 hover:bg-rose-50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Posição */}
                        <td className="px-4 py-3 font-black">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editDuplaForm.rank ?? ''}
                              onChange={(e) =>
                                setEditDuplaForm({ ...editDuplaForm, rank: e.target.value })
                              }
                              className="w-12 px-2 py-1 border rounded text-center text-xs font-bold"
                            />
                          ) : (
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                                item.rank === 1
                                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                                  : item.rank === 2
                                  ? 'bg-slate-300 text-slate-900'
                                  : item.rank === 3
                                  ? 'bg-amber-700 text-white'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {item.rank}º
                            </span>
                          )}
                        </td>

                        {/* Nome da Dupla */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editDuplaForm.name ?? ''}
                              onChange={(e) =>
                                setEditDuplaForm({ ...editDuplaForm, name: e.target.value })
                              }
                              className="w-full px-2 py-1 border rounded text-xs font-bold"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">{item.name}</span>
                              {item.isUser && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white">
                                  Dupla Oficial
                                </span>
                              )}
                              {item.isSolo && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                  Competindo Solo
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Pontuação */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editDuplaForm.score ?? ''}
                              onChange={(e) =>
                                setEditDuplaForm({ ...editDuplaForm, score: e.target.value })
                              }
                              className="w-20 px-2 py-1 border rounded text-xs font-bold"
                            />
                          ) : (
                            <div className="space-y-1">
                              <span className="font-black text-slate-900 text-sm">
                                {item.score}
                              </span>
                              <div className="w-20 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: item.barWidth || '50%' }}
                                />
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Descrição / Status */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <div className="space-y-1.5">
                              <input
                                type="text"
                                value={editDuplaForm.description ?? ''}
                                onChange={(e) =>
                                  setEditDuplaForm({
                                    ...editDuplaForm,
                                    description: e.target.value,
                                  })
                                }
                                placeholder="Descrição / Observação"
                                className="w-full px-2 py-1 border rounded text-xs"
                              />
                              <label className="flex items-center gap-2 text-xs font-semibold text-rose-600">
                                <input
                                  type="checkbox"
                                  checked={Boolean(editDuplaForm.isDisqualified)}
                                  onChange={(e) =>
                                    setEditDuplaForm({
                                      ...editDuplaForm,
                                      isDisqualified: e.target.checked,
                                    })
                                  }
                                />
                                Desclassificar Dupla
                              </label>
                              {editDuplaForm.isDisqualified && (
                                <input
                                  type="text"
                                  value={editDuplaForm.disqualificationReason ?? ''}
                                  onChange={(e) =>
                                    setEditDuplaForm({
                                      ...editDuplaForm,
                                      disqualificationReason: e.target.value,
                                    })
                                  }
                                  placeholder="Motivo da desclassificação"
                                  className="w-full px-2 py-1 border rounded text-xs text-rose-700 bg-rose-50"
                                />
                              )}
                            </div>
                          ) : item.isDisqualified ? (
                            <div className="space-y-0.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                                <Ban className="w-3.5 h-3.5" /> Desclassificada
                              </span>
                              <p className="text-[11px] text-rose-500">
                                {item.disqualificationReason || 'Não atendeu aos critérios'}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-600">{item.description}</p>
                          )}
                        </td>

                        {/* Ações */}
                        <td className="px-4 py-3 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={handleSaveEditDupla}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Save className="w-3.5 h-3.5" /> Salvar
                              </button>
                              <button
                                onClick={() => setEditingDuplaIndex(null)}
                                className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleStartEditDupla(originalIdx)}
                                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
                                title="Editar Dupla"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteDupla(originalIdx)}
                                className="p-1.5 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                                title="Remover Dupla"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ============ TAB 2: RANKING INDIVIDUAL ================= */}
      {/* ======================================================== */}
      {activeSubTab === 'individual' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por candidato individual, acertos ou colocação..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddIndModal(true)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" /> Adicionar Candidato
              </button>
            </div>
          </div>

          {/* Individual Table */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-500" />
                Tabela Oficial do Simulado de 80 Questões (Individual)
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {filteredInd.length} candidatos avaliados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3 w-16">Posição</th>
                    <th className="px-4 py-3">Candidato(a)</th>
                    <th className="px-4 py-3 w-28">Acertos</th>
                    <th className="px-4 py-3 w-28">Aproveitamento</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right w-28">Ações Super Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInd.map((item, idx) => {
                    const originalIdx = individualRanking.indexOf(item);
                    const isEditing = editingIndIndex === originalIdx;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          item.isUser
                            ? 'bg-emerald-50/70 hover:bg-emerald-50'
                            : item.isDisqualified
                            ? 'bg-rose-50/50 hover:bg-rose-50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Posição */}
                        <td className="px-4 py-3 font-black">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editIndForm.rank ?? ''}
                              onChange={(e) =>
                                setEditIndForm({ ...editIndForm, rank: e.target.value })
                              }
                              className="w-12 px-2 py-1 border rounded text-center text-xs font-bold"
                            />
                          ) : (
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                                item.rank === 1
                                  ? 'bg-amber-500 text-slate-950'
                                  : item.rank === 2
                                  ? 'bg-slate-300 text-slate-900'
                                  : item.rank === 3
                                  ? 'bg-amber-700 text-white'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {item.rank}º
                            </span>
                          )}
                        </td>

                        {/* Nome do Candidato */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editIndForm.name ?? ''}
                              onChange={(e) =>
                                setEditIndForm({ ...editIndForm, name: e.target.value })
                              }
                              className="w-full px-2 py-1 border rounded text-xs font-bold"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">{item.name}</span>
                              {item.isUser && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white">
                                  Aluno Titular
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Acertos */}
                        <td className="px-4 py-3 font-bold">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editIndForm.correctCount ?? ''}
                              onChange={(e) =>
                                setEditIndForm({ ...editIndForm, correctCount: e.target.value })
                              }
                              className="w-20 px-2 py-1 border rounded text-xs font-bold"
                            />
                          ) : (
                            <span>{item.correctCount}</span>
                          )}
                        </td>

                        {/* Porcentagem */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editIndForm.score ?? ''}
                              onChange={(e) =>
                                setEditIndForm({ ...editIndForm, score: e.target.value })
                              }
                              className="w-20 px-2 py-1 border rounded text-xs font-bold"
                            />
                          ) : (
                            <span className="font-black text-slate-900">{item.score}</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <div className="space-y-1">
                              <label className="flex items-center gap-1.5 text-xs text-rose-600 font-bold">
                                <input
                                  type="checkbox"
                                  checked={Boolean(editIndForm.isDisqualified)}
                                  onChange={(e) =>
                                    setEditIndForm({
                                      ...editIndForm,
                                      isDisqualified: e.target.checked,
                                    })
                                  }
                                />
                                Desclassificado
                              </label>
                              {editIndForm.isDisqualified && (
                                <input
                                  type="text"
                                  value={editIndForm.disqualificationReason ?? ''}
                                  onChange={(e) =>
                                    setEditIndForm({
                                      ...editIndForm,
                                      disqualificationReason: e.target.value,
                                    })
                                  }
                                  placeholder="Motivo da desclassificação"
                                  className="w-full px-2 py-1 border rounded text-xs text-rose-700 bg-rose-50"
                                />
                              )}
                            </div>
                          ) : item.isDisqualified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                              <Ban className="w-3.5 h-3.5" /> Desclassificado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Classificado
                            </span>
                          )}
                        </td>

                        {/* Ações */}
                        <td className="px-4 py-3 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={handleSaveEditInd}
                                className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Save className="w-3.5 h-3.5" /> Salvar
                              </button>
                              <button
                                onClick={() => setEditingIndIndex(null)}
                                className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleStartEditInd(originalIdx)}
                                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
                                title="Editar Candidato"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteInd(originalIdx)}
                                className="p-1.5 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                                title="Remover Candidato"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ============ TAB 3: EDITAR PERFIL DA DUPLA ============= */}
      {/* ======================================================== */}
      {activeSubTab === 'perfil-dupla' && (
        <form onSubmit={handleSaveDuoProfile} className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-slate-100">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Editar Dados Gerais da Dupla Oficial
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Estes dados são exibidos no Perfil do Aluno, no cabeçalho e nos rankings em tempo real.
                </p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Save className="w-4 h-4" /> Salvar Perfil da Dupla
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome da Dupla */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome Oficial da Dupla
                </label>
                <input
                  type="text"
                  value={duoProfile.name}
                  onChange={(e) => setDuoProfile({ ...duoProfile, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Status da Dupla */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Status Homologado da Dupla
                </label>
                <input
                  type="text"
                  value={duoProfile.status}
                  onChange={(e) => setDuoProfile({ ...duoProfile, status: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Lema / Descrição */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lema e Descrição Pedagógica
                </label>
                <input
                  type="text"
                  value={duoProfile.motto}
                  onChange={(e) => setDuoProfile({ ...duoProfile, motto: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Posição no Ranking */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Posição no Ranking Geral (ex: 5)
                </label>
                <input
                  type="number"
                  value={duoProfile.rankPosition}
                  onChange={(e) => {
                    const pos = parseInt(e.target.value) || 1;
                    setDuoProfile({
                      ...duoProfile,
                      rankPosition: pos,
                      rankText: `${pos}º Lugar Geral`,
                    });
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Pontuação Oficial */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pontuação Oficial / Aproveitamento (%)
                </label>
                <input
                  type="text"
                  value={duoProfile.scoreDisplay}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const num = parseFloat(raw.replace('%', '').replace(',', '.'));
                    setDuoProfile({
                      ...duoProfile,
                      scoreDisplay: raw.includes('%') ? raw : `${raw}%`,
                      scorePercentage: isNaN(num) ? 30.0 : num,
                    });
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Meta Diária de Horas */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Meta Diária Recomendada de Horas (Horas/Dia)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={duoProfile.targetDailyHours}
                  onChange={(e) =>
                    setDuoProfile({
                      ...duoProfile,
                      targetDailyHours: parseFloat(e.target.value) || 4,
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Anotações da Professora */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Anotações Pedagógicas do Professor sobre a Dupla
                </label>
                <textarea
                  rows={2}
                  value={duoProfile.teacherNotes || ''}
                  onChange={(e) =>
                    setDuoProfile({ ...duoProfile, teacherNotes: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Orientações e elogios pedagógicos para os integrantes..."
                />
              </div>
            </div>

            {/* Integrantes da Dupla */}
            <div className="border-t pt-4 border-slate-100 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Integrantes Oficiais da Dupla
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Integrante 1 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-[11px] font-black uppercase text-emerald-700">
                    Integrante 1 (Aluno Titular)
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={duoProfile.partner1.name}
                      onChange={(e) =>
                        setDuoProfile({
                          ...duoProfile,
                          partner1: { ...duoProfile.partner1, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Papel / Cargo Almejado
                    </label>
                    <input
                      type="text"
                      value={duoProfile.partner1.role}
                      onChange={(e) =>
                        setDuoProfile({
                          ...duoProfile,
                          partner1: { ...duoProfile.partner1, role: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      URL da Foto / Avatar
                    </label>
                    <input
                      type="text"
                      value={duoProfile.partner1.avatarUrl || ''}
                      onChange={(e) =>
                        setDuoProfile({
                          ...duoProfile,
                          partner1: { ...duoProfile.partner1, avatarUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>

                {/* Integrante 2 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-[11px] font-black uppercase text-teal-700">
                    Integrante 2 (Parceiro de Dupla)
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={duoProfile.partner2.name}
                      onChange={(e) =>
                        setDuoProfile({
                          ...duoProfile,
                          partner2: { ...duoProfile.partner2, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Papel / Cargo Almejado
                    </label>
                    <input
                      type="text"
                      value={duoProfile.partner2.role}
                      onChange={(e) =>
                        setDuoProfile({
                          ...duoProfile,
                          partner2: { ...duoProfile.partner2, role: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      URL da Foto / Avatar
                    </label>
                    <input
                      type="text"
                      value={duoProfile.partner2.avatarUrl || ''}
                      onChange={(e) =>
                        setDuoProfile({
                          ...duoProfile,
                          partner2: { ...duoProfile.partner2, avatarUrl: e.target.value },
                        })
                      }
                      placeholder="Deixe em branco para usar iniciais PH"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* ============ TAB 4: EDITAR PERFIL DOS ALUNOS =========== */}
      {/* ======================================================== */}
      {activeSubTab === 'perfil-aluno' && (
        <form onSubmit={handleSaveStudentProfile} className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-slate-100">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Editar Perfil Individual do Aluno
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Selecione o aluno para gerenciar dados cadastrais, cargo almejado, senha, estatísticas e anotações.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="id00120087">Eduardo Mateus (id00120087)</option>
                  <option value="student-pedro-henrique">Pedro Henrique Ferreira</option>
                </select>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" /> Salvar Aluno
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome Completo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={currentStudent.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, name: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Nome de Exibição */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome de Exibição no Perfil
                </label>
                <input
                  type="text"
                  value={currentStudent.displayName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, displayName: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Cargo Almejado */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cargo Almejado no TJAM
                </label>
                <input
                  type="text"
                  value={currentStudent.targetRole}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, targetRole: val },
                    }));
                  }}
                  placeholder="Ex: Assistente Judiciário, Analista Judiciário"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-mail do Aluno
                </label>
                <input
                  type="email"
                  value={currentStudent.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, email: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Senha de Acesso */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-500" /> Senha Definida pelo Professor
                </label>
                <input
                  type="text"
                  value={currentStudent.password || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, password: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-mono font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Defina a senha de acesso"
                />
              </div>

              {/* Telefone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={currentStudent.phone || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, phone: val },
                    }));
                  }}
                  placeholder="(92) 9XXXX-XXXX"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Status de Acesso
                </label>
                <select
                  value={currentStudent.status}
                  onChange={(e) => {
                    const val = e.target.value as 'ativo' | 'bloqueado';
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, status: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ativo">Ativo (Acesso Completo Liberado)</option>
                  <option value="bloqueado">Bloqueado pelo Super Admin</option>
                </select>
              </div>

              {/* URL do Avatar */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL da Imagem / Foto de Perfil
                </label>
                <input
                  type="text"
                  value={currentStudent.avatarUrl || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, avatarUrl: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Sequência (Dias seguidos) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Dias de Sequência (Streak)
                </label>
                <input
                  type="number"
                  value={currentStudent.streakDays}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, streakDays: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Horas Estudadas Hoje */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" /> Horas Estudadas Hoje
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={currentStudent.hoursStudiedToday}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, hoursStudiedToday: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Anotações Confidenciais */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Anotações Confidenciais da Professora sobre o Aluno
                </label>
                <textarea
                  rows={2}
                  value={currentStudent.teacherNotes || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentProfiles((prev) => ({
                      ...prev,
                      [selectedStudentId]: { ...currentStudent, teacherNotes: val },
                    }));
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Comentários sobre retenção, rendimento e acompanhamento individual..."
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* ====== MODAL: ADICIONAR DUPLA AO RANKING =============== */}
      {/* ======================================================== */}
      {showAddDuplaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Adicionar Nova Dupla ao Ranking
              </h3>
              <button
                onClick={() => setShowAddDuplaModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewDupla} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome dos Integrantes da Dupla
                </label>
                <input
                  type="text"
                  value={newDuplaName}
                  onChange={(e) => setNewDuplaName(e.target.value)}
                  placeholder="Ex: Ana Lima & Carlos Vieira"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Posição Inicial
                  </label>
                  <input
                    type="number"
                    value={newDuplaRank}
                    onChange={(e) => setNewDuplaRank(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Aproveitamento (%)
                  </label>
                  <input
                    type="text"
                    value={newDuplaScore}
                    onChange={(e) => setNewDuplaScore(e.target.value)}
                    placeholder="Ex: 33,5%"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descrição / Observações
                </label>
                <input
                  type="text"
                  value={newDuplaDesc}
                  onChange={(e) => setNewDuplaDesc(e.target.value)}
                  placeholder="Ex: Dupla • Turma TJAM Manaus"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDuplaModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                >
                  Confirmar e Sincronizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ====== MODAL: ADICIONAR CANDIDATO INDIVIDUAL =========== */}
      {/* ======================================================== */}
      {showAddIndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-600" />
                Adicionar Candidato ao Ranking Individual
              </h3>
              <button
                onClick={() => setShowAddIndModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewInd} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome Completo do Candidato
                </label>
                <input
                  type="text"
                  value={newIndName}
                  onChange={(e) => setNewIndName(e.target.value)}
                  placeholder="Ex: Beatriz Albuquerque"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Posição
                  </label>
                  <input
                    type="number"
                    value={newIndRank}
                    onChange={(e) => setNewIndRank(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Acertos
                  </label>
                  <input
                    type="text"
                    value={newIndCorrect}
                    onChange={(e) => setNewIndCorrect(e.target.value)}
                    placeholder="65/80"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    %
                  </label>
                  <input
                    type="text"
                    value={newIndScore}
                    onChange={(e) => setNewIndScore(e.target.value)}
                    placeholder="81,2%"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddIndModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer"
                >
                  Confirmar e Sincronizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
