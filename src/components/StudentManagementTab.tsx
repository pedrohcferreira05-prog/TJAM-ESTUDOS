import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Key,
  Mail,
  Copy,
  Check,
  Trash2,
  Lock,
  Unlock,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  GraduationCap,
  Clock,
  Flame,
} from 'lucide-react';
import { Turma, StudentAccount } from '../types';
import { StudentAccountService } from '../lib/studentAccountService';

interface StudentManagementTabProps {
  turmas: Turma[];
  isDarkMode?: boolean;
}

export const StudentManagementTab: React.FC<StudentManagementTabProps> = ({
  turmas,
  isDarkMode = false,
}) => {
  const [students, setStudents] = useState<StudentAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTurmaFilter, setSelectedTurmaFilter] = useState('all');
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [copyFeedbackId, setCopyFeedbackId] = useState<string | null>(null);

  // New Student Form State
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('tjam2026');
  const [newTurmaId, setNewTurmaId] = useState(turmas[0]?.id || 'turma-tjam-2026');
  const [newPhone, setNewPhone] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Password Edit Modal
  const [editingStudent, setEditingStudent] = useState<StudentAccount | null>(null);
  const [editPasswordValue, setEditPasswordValue] = useState('');
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  const toggleRevealPassword = (id: string) => {
    setRevealedPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const accs = await StudentAccountService.loadAllAccounts();
    setStudents(accs);
  };

  const getStudentAttendanceInfo = (studentId: string) => {
    try {
      const key = studentId === 'id00120087' ? 'tjam_user_progress' : `tjam_user_progress_${studentId}`;
      const raw = localStorage.getItem(key) || (studentId === 'id00120087' ? localStorage.getItem('tjam_user_progress') : null);
      if (raw) {
        const prog = JSON.parse(raw);
        const today = new Date().toISOString().split('T')[0];
        const attendances = prog.dailyAttendance || {};
        const completedCount = ['portugues', 'processo_penal', 'processo_civil'].filter(
          (id) => attendances[`${today}_${id}`]?.status === 'completed'
        ).length;
        const totalHours = prog.hoursStudiedToday || 0;
        return {
          completedCount,
          streakDays: prog.streakDays || 5,
          totalHours,
          isAllDone: completedCount >= 3,
        };
      }
    } catch (e) {}
    return {
      completedCount: studentId === 'id00120087' ? 1 : 0,
      streakDays: studentId === 'id00120087' ? 5 : 1,
      totalHours: studentId === 'id00120087' ? 1.5 : 0,
      isAllDone: false,
    };
  };

  const handleGeneratePassword = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let pass = 'tjam@';
    for (let i = 0; i < 4; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(pass);
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      setFormError('Preencha os campos obrigatórios: Nome, E-mail e Senha.');
      return;
    }

    const selectedTurma = turmas.find((t) => t.id === newTurmaId);
    const turmaTitle = selectedTurma ? selectedTurma.name : 'Turma TJAM 2026 - Oficial';
    const userCode = newUsername.trim() || `id00${Math.floor(100000 + Math.random() * 900000)}`;

    const newStudent: StudentAccount = {
      id: userCode,
      username: userCode,
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      password: newPassword.trim(),
      turmaId: newTurmaId,
      turmaName: turmaTitle,
      createdAt: new Date().toISOString(),
      status: 'ativo',
      phone: newPhone.trim() || undefined,
      notes: newNotes.trim() || undefined,
    };

    await StudentAccountService.saveAccount(newStudent);
    await loadAccounts();

    setFormSuccess(`Aluno(a) ${newStudent.name} cadastrado(a) com sucesso! ID: ${userCode}`);
    setTimeout(() => {
      setIsCreatingModalOpen(false);
      setNewName('');
      setNewUsername('');
      setNewEmail('');
      setNewPassword('tjam2026');
      setNewPhone('');
      setNewNotes('');
      setFormSuccess('');
    }, 1200);
  };

  const handleToggleStatus = async (student: StudentAccount) => {
    const updated: StudentAccount = {
      ...student,
      status: student.status === 'ativo' ? 'bloqueado' : 'ativo',
    };
    await StudentAccountService.saveAccount(updated);
    await loadAccounts();
  };

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (window.confirm(`Tem certeza que deseja remover o acesso do(a) aluno(a) ${studentName}?`)) {
      await StudentAccountService.deleteAccount(studentId);
      await loadAccounts();
    }
  };

  const handleSavePasswordEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editPasswordValue.trim()) return;

    await StudentAccountService.updatePassword(editingStudent.id, editPasswordValue.trim());
    await loadAccounts();
    setEditingStudent(null);
    setEditPasswordValue('');
  };

  const handleCopyCredentials = (student: StudentAccount) => {
    const userCode = student.username || student.id;
    const text = `TJAM Estudos 2026 - Acesso ao Portal do Aluno\nAluno: ${student.name}\nID de Usuário / Matrícula: ${userCode}\nE-mail de Acesso: ${student.email}\nSenha: ${student.password}\nTurma: ${student.turmaName}`;
    navigator.clipboard.writeText(text);
    setCopyFeedbackId(student.id);
    setTimeout(() => setCopyFeedbackId(null), 2500);
  };

  const filteredStudents = students.filter((st) => {
    const matchSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.username && st.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      st.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.turmaName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTurma = selectedTurmaFilter === 'all' || st.turmaId === selectedTurmaFilter;
    return matchSearch && matchTurma;
  });

  return (
    <div className="space-y-6">
      {/* Header with Metrics & Actions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Gestão de Usuários e Acesso de Alunos
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Cadastre novos alunos, defina senhas de acesso, envie credenciais e gerencie permissões.
            </p>
          </div>

          <button
            onClick={() => setIsCreatingModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Cadastrar Novo Aluno</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar aluno por nome, e-mail ou turma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-amber-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedTurmaFilter}
              onChange={(e) => setSelectedTurmaFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-amber-500"
            >
              <option value="all">Todas as Turmas ({students.length} alunos)</option>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
              Nenhum aluno encontrado com este filtro
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Clique em "Cadastrar Novo Aluno" para criar um novo usuário e senha.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStudents.map((st) => {
              const isCopied = copyFeedbackId === st.id;
              const isBlocked = st.status === 'bloqueado';

              return (
                <div
                  key={st.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    isBlocked
                      ? 'bg-slate-100/70 dark:bg-slate-900/50 border-rose-200 dark:border-rose-900/50 opacity-80'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 font-extrabold text-sm flex items-center justify-center shrink-0 border border-amber-500/20">
                        {st.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                            {st.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isBlocked
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {isBlocked ? 'Bloqueado' : 'Ativo'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono font-extrabold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md">
                            ID: {st.username || st.id}
                          </span>
                          <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{st.email}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleStatus(st)}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          isBlocked
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                        title={isBlocked ? 'Desbloquear Acesso' : 'Bloquear Acesso'}
                      >
                        {isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleDeleteStudent(st.id, st.name)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                        title="Excluir Aluno"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Turma & Registration info */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-600 dark:text-slate-300 text-[11px] bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {st.turmaName}
                    </span>

                    <span className="text-[10px] text-slate-400">
                      Cadastrado em: {new Date(st.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {/* Attendance & Daily Study Stats */}
                  {(() => {
                    const att = getStudentAttendanceInfo(st.id);
                    return (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                            Presença Hoje: <span className={att.isAllDone ? 'text-emerald-600 font-extrabold' : 'text-amber-700 font-bold'}>{att.completedCount}/3 aulas</span>
                            {att.isAllDone && ' (Meta ✓)'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          <span>{Math.floor(att.totalHours)}h {Math.round((att.totalHours % 1) * 60)}m</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400">
                            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {att.streakDays}d seguidos
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Password & Credential Copy Box */}
                  <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Key className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-slate-500 font-semibold text-[11px]">Senha:</span>
                      <code className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white text-xs">
                        {revealedPasswords[st.id] ? st.password : '••••••••'}
                      </code>
                      <button
                        type="button"
                        onClick={() => toggleRevealPassword(st.id)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                        title={revealedPasswords[st.id] ? 'Ocultar senha' : 'Exibir senha restrita'}
                        aria-label={revealedPasswords[st.id] ? 'Ocultar senha' : 'Exibir senha restrita'}
                      >
                        {revealedPasswords[st.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingStudent(st);
                          setEditPasswordValue(st.password);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-amber-400 text-[11px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        Trocar Senha
                      </button>

                      <button
                        onClick={() => handleCopyCredentials(st)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs'
                        }`}
                        title="Copiar dados para enviar ao aluno"
                      >
                        {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copiado!' : 'Copiar Acesso'}</span>
                      </button>
                    </div>
                  </div>

                  {st.notes && (
                    <p className="mt-2 text-[11px] text-slate-400 italic">
                      Obs: {st.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Cadastrar Novo Aluno */}
      {isCreatingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl p-6 md:p-8 border border-slate-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl relative space-y-5">
            <button
              onClick={() => setIsCreatingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <div className="inline-flex p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 mb-1">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold">Cadastrar Usuário Aluno</h3>
              <p className="text-xs text-slate-500">
                Defina o nome, e-mail institucional/pessoal e senha para liberação de acesso aos estudos do TJAM.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nome Completo do Aluno *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Castro Ramos"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    ID de Usuário / Login (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: id00120087"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-mono font-bold outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    E-mail de Acesso *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: mariana.ramos@tjam.estudos.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Senha de Acesso do Aluno *
                  </label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-[11px] font-extrabold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Gerar Senha Automática</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-mono text-xs font-bold outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Turma Vinculada
                  </label>
                  <select
                    value={newTurmaId}
                    onChange={(e) => setNewTurmaId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:border-amber-500"
                  >
                    {turmas.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    WhatsApp / Telefone (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="(92) 99999-0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Observações Pedagógicas (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Aluno em ritmo acelerado para TJAM; reforço em Direito Administrativo..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingModalOpen(false)}
                  className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Cadastrar e Ativar Aluno</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Trocar Senha */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl p-6 border border-slate-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl relative space-y-4">
            <h3 className="text-base font-extrabold">Redefinir Senha do Aluno</h3>
            <p className="text-xs text-slate-500">
              Alterando a senha de acesso para <strong>{editingStudent.name}</strong> ({editingStudent.email}).
            </p>

            <form onSubmit={handleSavePasswordEdit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Nova Senha</label>
                <input
                  type="text"
                  required
                  value={editPasswordValue}
                  onChange={(e) => setEditPasswordValue(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-mono text-xs font-bold outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-xs cursor-pointer"
                >
                  Salvar Nova Senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
