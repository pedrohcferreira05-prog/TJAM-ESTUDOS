import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  FileText,
  HelpCircle,
  Brain,
  Download,
  Award,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Layers,
  Sparkles,
  ArrowLeft,
  Check,
  Video,
  Send,
  AlertCircle,
  Scale,
  Landmark,
  Shield,
  FileCheck,
  Compass,
  Monitor,
  BookMarked,
  Languages,
  Trees,
  Bookmark
} from 'lucide-react';
import { UserProgress, StudentSubmission, Question } from '../types';
import {
  saveLessonProgressToFirestore,
  loadLessonProgressFromFirestore,
  subscribeToLessonProgress
} from '../lib/firestoreService';
import { SAMPLE_QUESTIONS } from '../data/tjamData';
import { DireitoAdminContent } from './DireitoAdminContent';
import { DireitoConstitucionalContent } from './DireitoConstitucionalContent';
import { ProcessoCivilContent } from './ProcessoCivilContent';
import { ProcessoPenalContent } from './ProcessoPenalContent';
import { PortuguesContent } from './PortuguesContent';
import { LegislacaoTjamContent } from './LegislacaoTjamContent';
import { GeografiaAmazonasContent } from './GeografiaAmazonasContent';
import { LibrasContent } from './LibrasContent';
import { InformaticaContent } from './InformaticaContent';
import { InglesContent } from './InglesContent';
import { EscritaLeituraContent } from './EscritaLeituraContent';

// Import data
import { direitoAdminFlashcardsData, direitoAdminSummaryPoints } from '../data/direitoAdminLessonData';
import { direitoConstFlashcardsData, direitoConstSummaryPoints } from '../data/direitoConstitucionalLessonData';
import { procCivilFlashcardsData, procCivilAula2SummaryPoints } from '../data/processoCivilLessonData';
import { procPenalFlashcardsData, procPenalLessonSummaryPoints } from '../data/processoPenalLessonData';
import { legislacaoTjamFlashcardsData, legislacaoTjamSummaryPoints } from '../data/legislacaoTjamLessonData';
import { geografiaAmazonasFlashcardsData, geografiaAmazonasSummaryPoints } from '../data/geografiaAmazonasLessonData';
import { librasFlashcardsData, librasSummaryPoints } from '../data/librasLessonData';
import { informaticaFlashcardsData, informaticaSummaryPoints } from '../data/informaticaLessonData';
import { inglesFlashcardsData, inglesSummaryPoints } from '../data/inglesLessonData';
import { escritaLeituraFlashcardsData, escritaLeituraSummaryPoints } from '../data/escritaLeituraLessonData';

export interface SubjectMeta {
  id: string;
  slug: string;
  name: string;
  category: 'Conhecimentos Básicos' | 'Conhecimentos Específicos';
  icon: React.FC<{ className?: string }>;
  color: string;
  bgLight: string;
  border: string;
  description: string;
  teacher: string;
  aulas: Array<{
    id: string;
    number: number;
    title: string;
    description: string;
    duration: string;
    hasVideo: boolean;
    hasExercises: boolean;
    hasMaterials: boolean;
    hasTask: boolean;
  }>;
}

export const ALL_SUBJECTS: SubjectMeta[] = [
  {
    id: 'direito_admin',
    slug: 'direito-administrativo',
    name: 'Direito Administrativo',
    category: 'Conhecimentos Específicos',
    icon: FileText,
    color: 'text-teal-400',
    bgLight: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    description: 'Controle da Administração Pública, Atos Administrativos, Licitações, Poderes e Regime Jurídico.',
    teacher: 'Prof. Dr. Alberto Silva',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Princípios Fundamentais e Organização Administrativa',
        description: 'LIMPE, Administração Direta e Indireta, Autarquias, Fundações e Empresas Públicas.',
        duration: '50 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Controle da Administração Pública e Princípio da Autotutela',
        description: 'Anulação e revogação de atos, controle judicial, legislativo e administrativo (Súmulas 346 e 473 do STF).',
        duration: '65 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-3',
        number: 3,
        title: 'Poderes Administrativos e Responsabilidade Civil do Estado',
        description: 'Poder de polícia, poder disciplinar, teoria do risco administrativo e excludentes.',
        duration: '55 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: false
      }
    ]
  },
  {
    id: 'direito_const',
    slug: 'direito-constitucional',
    name: 'Direito Constitucional',
    category: 'Conhecimentos Específicos',
    icon: Award,
    color: 'text-indigo-400',
    bgLight: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    description: 'Direitos e Garantias Fundamentais, Poder Judiciário, Funções Essenciais à Justiça e CF/88.',
    teacher: 'Profª. Dra. Mariana Costa',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Dos Direitos e Deveres Individuais e Coletivos (Art. 5º da CF/88)',
        description: 'Remédios Constitucionais (Habeas Corpus, Mandado de Segurança, HC, HD e Ação Popular).',
        duration: '60 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Estrutura e Competências do Poder Judiciário (Arts. 92 a 126)',
        description: 'Garantias dos magistrados, tribunais estaduais, CNJ e organização judiciária.',
        duration: '70 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'processo_civil',
    slug: 'direito-processual-civil',
    name: 'Direito Processual Civil',
    category: 'Conhecimentos Específicos',
    icon: Scale,
    color: 'text-amber-400',
    bgLight: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    description: 'Normas Fundamentais, Atos Processuais, Prazos, Tutelas Provisórias e Procedimento Comum (CPC/2015).',
    teacher: 'Prof. Lucas Guimarães',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Princípios Processuais Civis e Competência no CPC/15',
        description: 'Contraditório substancial, cooperação, competência absoluta vs. relativa e modificação.',
        duration: '55 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Prazos Processuais, Atos dos Servidores e Comunicação dos Atos',
        description: 'Contagem em dias úteis, intimações eletrônicas, citações e deveres do assistente judiciário.',
        duration: '60 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'processo_penal',
    slug: 'direito-processual-penal',
    name: 'Direito Processual Penal',
    category: 'Conhecimentos Específicos',
    icon: Shield,
    color: 'text-rose-400',
    bgLight: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    description: 'Princípios Fundamentais, Inquérito Policial, Ação Penal, Provas, Juiz Natural e Garantias (CF/88 e CPP).',
    teacher: 'Prof. Marcos Vinicius',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Princípios Fundamentais do Processo Penal',
        description: 'Devido processo legal, contraditório, ampla defesa, presunção de inocência, juiz natural, provas ilícitas, publicidade e sistema acusatório.',
        duration: '60 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Prisão em Flagrante, Preventiva e Liberdade Provisória',
        description: 'Espécies de flagrante, audiência de custódia e requisitos do Art. 312 do CPP.',
        duration: '60 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'portugues',
    slug: 'portugues',
    name: 'Português',
    category: 'Conhecimentos Básicos',
    icon: BookMarked,
    color: 'text-violet-400',
    bgLight: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    description: 'Interpretação e Compreensão de Textos, Concordância, Regência, Crase, Pontuação e Morfossintaxe FGV.',
    teacher: 'Profª. Beatriz Lima',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Interpretação Textual, Coesão e Coerência estilo FGV',
        description: 'Tipologias textuais, inferências, conectivos lógicos e ambiguidades em provas.',
        duration: '70 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Sintaxe do Período: Regência, Crase e Pontuação',
        description: 'Casos proibidos e facultativos de crase, vírgula entre orações e termos da oração.',
        duration: '65 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'informatica',
    slug: 'informatica',
    name: 'Informática',
    category: 'Conhecimentos Básicos',
    icon: Monitor,
    color: 'text-cyan-400',
    bgLight: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    description: 'Segurança da Informação, Redes, LibreOffice, MS Office, Windows 11 e Ferramentas em Nuvem.',
    teacher: 'Prof. Carlos Eduardo',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Segurança da Informação: Malware, Golpes e Proteção',
        description: 'Ransomware, Phishing, Engenharia Social, Antivírus, Firewall e Backups 3-2-1.',
        duration: '50 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Sistemas Operacionais e Suíte de Escritório em Tribunais',
        description: 'Atalhos no Windows, gerenciamento de arquivos e fórmulas essenciais de planilhas.',
        duration: '55 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: false
      }
    ]
  },
  {
    id: 'ingles',
    slug: 'ingles',
    name: 'Inglês',
    category: 'Conhecimentos Básicos',
    icon: Languages,
    color: 'text-blue-400',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    description: 'Compreensão de Textos em Língua Inglesa, Vocabulário Jurídico e Estruturas Gramaticais.',
    teacher: 'Profª. Rachel Green',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Reading Comprehension & False Friends in Legal Texts',
        description: 'Estratégias de Skimming e Scanning, falsos cognatos e termos processuais em inglês.',
        duration: '45 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'libras',
    slug: 'libras',
    name: 'Libras',
    category: 'Conhecimentos Básicos',
    icon: Sparkles,
    color: 'text-pink-400',
    bgLight: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    description: 'Lei nº 10.436/2002, Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015) e Atendimento Acessível.',
    teacher: 'Profª. Amanda Fernandes',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Legislação de Acessibilidade e Inclusão no Poder Judiciário',
        description: 'Resolução CNJ 401/2021, direitos da pessoa surda e atendimento humanizado nos fóruns.',
        duration: '40 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'legislacao_tjam',
    slug: 'legislacao-tjam',
    name: 'Legislação TJAM',
    category: 'Conhecimentos Específicos',
    icon: Landmark,
    color: 'text-sky-400',
    bgLight: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    description: 'Regimento Interno do TJAM, Plano de Cargos e Salários (Lei 3.226/08) e Estatuto dos Servidores.',
    teacher: 'Prof. Dr. Alberto Silva',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Regimento Interno do TJAM: Órgãos Julgadores e Direção',
        description: 'Tribunal Pleno, Câmaras Reunidas e Isoladas, competências do Presidente e Corregedor.',
        duration: '60 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Lei nº 3.226/2008 e Carreira do Assistente Judiciário',
        description: 'Atribuições do cargo, progressão, jornada, direitos e deveres funcionais.',
        duration: '50 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'geografia_amazonas',
    slug: 'geografia-do-amazonas',
    name: 'Geografia do Amazonas',
    category: 'Conhecimentos Básicos',
    icon: Compass,
    color: 'text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    description: 'Aspectos Físicos, Bacias Hidrográficas, Clima, Economia, Zona Franca de Manaus e Comarcas do Interior.',
    teacher: 'Prof. Thiago Sampaio',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Geografia Física e Bacias Hidrográficas do Amazonas',
        description: 'Rio Amazonas, Solimões, Negro, várzea, terra firme e clima equatorial.',
        duration: '55 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      },
      {
        id: 'aula-2',
        number: 2,
        title: 'Economia Amazonense, Polo Industrial de Manaus e Interiorização',
        description: 'Modelo ZFM, sustentabilidade e logística judiciária nos municípios do interior.',
        duration: '50 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  },
  {
    id: 'escrita_leitura',
    slug: 'escrita-e-leitura',
    name: 'Escrita e Leitura',
    category: 'Conhecimentos Básicos',
    icon: FileCheck,
    color: 'text-amber-300',
    bgLight: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    description: 'Redação Oficial de Atos Judiciários, Clareza, Concisão e Padronização conforme Manual da Presidência.',
    teacher: 'Profª. Beatriz Lima',
    aulas: [
      {
        id: 'aula-1',
        number: 1,
        title: 'Redação de Despachos, Certidões e Ofícios Judiciais',
        description: 'Estrutura técnica, pronomes de tratamento adequados e concisão na rotina forense.',
        duration: '60 min',
        hasVideo: true,
        hasExercises: true,
        hasMaterials: true,
        hasTask: true
      }
    ]
  }
];

interface MateriasPortalViewProps {
  progress?: UserProgress;
  onNavigateTab: (tab: any) => void;
  isDarkMode?: boolean;
  submissions?: StudentSubmission[];
  onSubmitTask?: (submission: Omit<StudentSubmission, 'id' | 'submittedAt'>) => void;
  onAnswerQuestion?: (questionId: string, optionId: string) => void;
  studentName?: string;
  turmaId?: string;
}

export const MateriasPortalView: React.FC<MateriasPortalViewProps> = ({
  progress,
  onNavigateTab,
  submissions = [],
  onSubmitTask,
  onAnswerQuestion,
  studentName = 'Eduardo Mateus',
  turmaId = 'TJAM-2026-REGULAR',
}) => {
  // Navigation inside the portal:
  // selectedSubject: null = list of all subjects
  // selectedAula: null = subject view with list of aulas
  const [selectedSubject, setSelectedSubject] = useState<SubjectMeta | null>(null);
  const [selectedAulaId, setSelectedAulaId] = useState<string | null>(null);
  const [lessonActiveTab, setLessonActiveTab] = useState<'conteudo' | 'video' | 'exercicios' | 'materiais' | 'flashcards' | 'tarefa'>('conteudo');
  const [taskAnswerText, setTaskAnswerText] = useState('');
  const [taskSubmittedToast, setTaskSubmittedToast] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Conhecimentos Básicos' | 'Conhecimentos Específicos'>('all');

  // Question attempts state for interactive feedback
  const [localQuestionAttempts, setLocalQuestionAttempts] = useState<Record<string, { optionId: string; isCorrect: boolean }>>(() => {
    const initial: Record<string, { optionId: string; isCorrect: boolean }> = {};
    (progress?.questionAttempts || []).forEach((att) => {
      initial[att.questionId] = { optionId: att.selectedOptionId, isCorrect: att.isCorrect };
    });
    return initial;
  });

  useEffect(() => {
    if (progress?.questionAttempts) {
      const updated: Record<string, { optionId: string; isCorrect: boolean }> = {};
      progress.questionAttempts.forEach((att) => {
        updated[att.questionId] = { optionId: att.selectedOptionId, isCorrect: att.isCorrect };
      });
      setLocalQuestionAttempts(updated);
    }
  }, [progress?.questionAttempts]);

  // Lesson status store synced to Firestore
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, 'nao_iniciada' | 'em_andamento' | 'concluida'>>({});
  const [isSavingStatus, setIsSavingStatus] = useState(false);

  // Load progress store & listen to real-time updates / resets
  useEffect(() => {
    const unsub = subscribeToLessonProgress((store) => {
      const statuses: Record<string, any> = {};
      if (store) {
        Object.keys(store).forEach((key) => {
          if (store[key]?.completed) {
            statuses[key] = 'concluida';
          } else if (store[key]?.started) {
            statuses[key] = 'em_andamento';
          }
        });
      }
      setLessonStatuses(statuses);
    });

    const handleStorageChange = () => {
      try {
        const raw = localStorage.getItem('tjam_user_progress');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.questionAttempts) {
            setLocalQuestionAttempts(parsed.questionAttempts);
          }
          if (parsed.savedLessons) {
            const statuses: Record<string, any> = {};
            Object.keys(parsed.savedLessons).forEach((k) => {
              if (parsed.savedLessons[k]?.completed) statuses[k] = 'concluida';
              else if (parsed.savedLessons[k]?.started) statuses[k] = 'em_andamento';
            });
            setLessonStatuses(statuses);
          } else {
            setLessonStatuses({});
          }
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsub();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleUpdateAulaStatus = async (subjectKey: string, aulaId: string, newStatus: 'nao_iniciada' | 'em_andamento' | 'concluida') => {
    setIsSavingStatus(true);
    const key = `${subjectKey}_${aulaId}`;
    setLessonStatuses((prev) => ({ ...prev, [key]: newStatus }));

    try {
      const currentStore = (await loadLessonProgressFromFirestore()) || {};
      currentStore[key] = {
        ...currentStore[key],
        status: newStatus,
        completed: newStatus === 'concluida',
        started: newStatus === 'em_andamento' || newStatus === 'concluida',
        updatedAt: new Date().toISOString()
      };
      await saveLessonProgressToFirestore(currentStore);

      // Local storage synchronization for instant teacher & student portal sync
      try {
        const raw = localStorage.getItem('tjam_user_progress');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (!parsed.savedLessons) parsed.savedLessons = {};
          parsed.savedLessons[key] = currentStore[key];
          if (!parsed.completedTopicIds) parsed.completedTopicIds = [];
          if (newStatus === 'concluida') {
            if (!parsed.completedTopicIds.includes(key)) {
              parsed.completedTopicIds.push(key);
            }
          } else {
            parsed.completedTopicIds = parsed.completedTopicIds.filter((id: string) => id !== key);
          }
          localStorage.setItem('tjam_user_progress', JSON.stringify(parsed));
          window.dispatchEvent(new Event('storage'));
        }
      } catch (err) {
        console.warn('Sync local user progress error:', err);
      }
    } catch (err) {
      console.warn('Error saving lesson status:', err);
    } finally {
      setIsSavingStatus(false);
    }
  };

  const handleAnswerQuestionClick = (q: Question, optionId: string) => {
    const isCorrect = q.correctOptionId === optionId;
    setLocalQuestionAttempts((prev) => ({
      ...prev,
      [q.id]: { optionId, isCorrect },
    }));

    if (onAnswerQuestion) {
      onAnswerQuestion(q.id, optionId);
    }

    // Direct local storage sync fallback so attempts are guaranteed to persist
    try {
      const raw = localStorage.getItem('tjam_user_progress');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!parsed.questionAttempts) parsed.questionAttempts = [];
        parsed.questionAttempts.push({
          id: `att-${Date.now()}`,
          questionId: q.id,
          selectedOptionId: optionId,
          isCorrect,
          answeredAt: new Date().toISOString(),
        });
        if (!isCorrect) {
          if (!parsed.errorQuestionIds) parsed.errorQuestionIds = [];
          if (!parsed.errorQuestionIds.includes(q.id)) {
            parsed.errorQuestionIds.push(q.id);
          }
        }
        localStorage.setItem('tjam_user_progress', JSON.stringify(parsed));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.warn('Error saving question attempt in MateriasPortalView:', err);
    }
  };

  // Find questions matching current subject
  const currentSubjectQuestions = useMemo(() => {
    if (!selectedSubject) return [];
    const sId = selectedSubject.id;
    const list = SAMPLE_QUESTIONS.filter((q) => {
      if (!q.disciplineId) return false;
      const d = q.disciplineId.toLowerCase().replace(/[-_]/g, '');
      const s = sId.toLowerCase().replace(/[-_]/g, '');
      if (d === s || d.includes(s) || s.includes(d)) return true;
      if (s.includes('admin') && d.includes('admin')) return true;
      if (s.includes('const') && d.includes('const')) return true;
      if (s.includes('civil') && d.includes('civil')) return true;
      if (s.includes('penal') && d.includes('penal')) return true;
      if (s.includes('port') && d.includes('port')) return true;
      if (s.includes('tjam') && d.includes('tjam')) return true;
      if (s.includes('geo') && d.includes('geo')) return true;
      if ((s.includes('libra') || s.includes('inclusao')) && (d.includes('libra') || d.includes('acess'))) return true;
      if (s.includes('info') && d.includes('info')) return true;
      if (s.includes('ingl') && d.includes('ingl')) return true;
      if (s.includes('escrita') && (d.includes('escrita') || d.includes('redacao') || d.includes('discursiva'))) return true;
      return false;
    });
    return list.length > 0 ? list : SAMPLE_QUESTIONS.slice(0, 6);
  }, [selectedSubject]);

  const filteredSubjects = ALL_SUBJECTS.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // RENDER LEVEL 3: DENTRO DE UMA AULA ESPECÍFICA (EX: /materias/direito-administrativo/aula-1)
  if (selectedSubject && selectedAulaId) {
    const aula = selectedSubject.aulas.find((a) => a.id === selectedAulaId) || selectedSubject.aulas[0];
    const statusKey = `${selectedSubject.id}_${aula.id}`;
    const currentStatus = lessonStatuses[statusKey] || 'nao_iniciada';

    return (
      <div className="w-full space-y-6 animate-in fade-in duration-200">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={() => {
                setSelectedAulaId(null);
                setSelectedSubject(null);
              }}
              className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-slate-500 hover:text-sky-600"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Matérias
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setSelectedAulaId(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer text-slate-600 hover:text-sky-600 truncate max-w-[160px] sm:max-w-none"
            >
              {selectedSubject.name}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[140px] sm:max-w-none">
              Aula {aula.number}
            </span>
          </div>

          {/* Status Live Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Status da Aula:</span>
            <select
              value={currentStatus}
              onChange={(e) => handleUpdateAulaStatus(selectedSubject.id, aula.id, e.target.value as any)}
              disabled={isSavingStatus}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none transition-all ${
                currentStatus === 'concluida'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : currentStatus === 'em_andamento'
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <option value="nao_iniciada">⚪ Não iniciada</option>
              <option value="em_andamento">🟡 Em andamento</option>
              <option value="concluida">🟢 Concluída</option>
            </select>
          </div>
        </div>

        {/* Aula Hero Header */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                  {selectedSubject.name} • Aula {aula.number}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {aula.duration} de estudo
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {aula.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {aula.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedAulaId(null)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar às Aulas</span>
            </button>
          </div>
        </div>

        {/* Internal Tabs for the Lesson */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
          <button
            onClick={() => setLessonActiveTab('conteudo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              lessonActiveTab === 'conteudo'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Conteúdo Completo</span>
          </button>
          <button
            onClick={() => setLessonActiveTab('video')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              lessonActiveTab === 'video'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videoaula</span>
          </button>
          <button
            onClick={() => setLessonActiveTab('exercicios')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              lessonActiveTab === 'exercicios'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Exercícios & Atividades</span>
          </button>
          <button
            onClick={() => setLessonActiveTab('materiais')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              lessonActiveTab === 'materiais'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Materiais & PDFs</span>
          </button>
          <button
            onClick={() => setLessonActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              lessonActiveTab === 'flashcards'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Flashcards & Revisão</span>
          </button>
          <button
            onClick={() => setLessonActiveTab('tarefa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              lessonActiveTab === 'tarefa'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Estudo de Caso / Tarefa</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="w-full">
          {lessonActiveTab === 'conteudo' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
              {selectedSubject.id === 'direito_admin' && <DireitoAdminContent />}
              {selectedSubject.id === 'direito_const' && <DireitoConstitucionalContent />}
              {selectedSubject.id === 'processo_civil' && <ProcessoCivilContent />}
              {selectedSubject.id === 'processo_penal' && <ProcessoPenalContent />}
              {selectedSubject.id === 'portugues' && <PortuguesContent />}
              {selectedSubject.id === 'legislacao_tjam' && <LegislacaoTjamContent />}
              {selectedSubject.id === 'geografia_amazonas' && <GeografiaAmazonasContent />}
              {selectedSubject.id === 'libras' && <LibrasContent />}
              {selectedSubject.id === 'informatica' && <InformaticaContent />}
              {selectedSubject.id === 'ingles' && <InglesContent />}
              {selectedSubject.id === 'escrita_leitura' && <EscritaLeituraContent />}
            </div>
          )}

          {lessonActiveTab === 'video' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Video className="w-4 h-4 text-sky-600" />
                    Videoaula Oficial: {aula.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Ministrada por <strong>{selectedSubject.teacher}</strong>
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  Duração: {aula.duration}
                </span>
              </div>

              {/* Video Mock/Player Frame */}
              <div className="w-full aspect-video rounded-2xl bg-slate-900 border border-slate-200 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden group">
                <div className="w-16 h-16 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Transmissão em Alta Resolução</h4>
                  <p className="text-xs text-slate-300">Clique para reproduzir a gravação oficial da aula</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-600 font-medium">
                  Aula gravada e disponível em tempo real para os alunos matriculados na turma.
                </span>
                <button
                  onClick={() => handleUpdateAulaStatus(selectedSubject.id, aula.id, 'concluida')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Check className="w-3.5 h-3.5" />
                  Marcar como Assistida
                </button>
              </div>
            </div>
          )}

          {lessonActiveTab === 'exercicios' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-600" />
                    Exercícios Fixação: {aula.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Questões com gabarito oficial e comentários no padrão FGV / Cebraspe para {selectedSubject.name}.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab('questoes')}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  Banco Geral de Questões
                </button>
              </div>

              {/* Real Exercises Display */}
              <div className="space-y-4 pt-1">
                {currentSubjectQuestions.slice(0, 4).map((q, qIndex) => {
                  const userAttempt = localQuestionAttempts[q.id];
                  const hasAnswered = !!userAttempt;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        hasAnswered
                          ? userAttempt.isCorrect
                            ? 'bg-emerald-50/40 border-emerald-300 dark:border-emerald-700/50'
                            : 'bg-rose-50/40 border-rose-300 dark:border-rose-700/50'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                          QUESTÃO {qIndex + 1} • {q.institution || 'FGV'} • {q.topicName || selectedSubject.name}
                        </span>

                        {hasAnswered && (
                          <span
                            className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                              userAttempt.isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {userAttempt.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Você acertou!</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Você errou</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                        {q.statement}
                      </p>

                      <div className="grid grid-cols-1 gap-2 pt-3">
                        {q.options.map((opt) => {
                          const isSelected = userAttempt?.optionId === opt.id;
                          const isCorrect = opt.id === q.correctOptionId;

                          let btnClasses = 'p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2.5 ';

                          if (hasAnswered) {
                            if (isCorrect) {
                              btnClasses += 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnClasses += 'bg-rose-100/80 border-rose-500 text-rose-950 font-bold';
                            } else {
                              btnClasses += 'bg-white border-slate-200 text-slate-500 opacity-60';
                            }
                          } else {
                            btnClasses += 'bg-white hover:bg-sky-50/70 border-slate-200 hover:border-sky-400 text-slate-800';
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleAnswerQuestionClick(q, opt.id)}
                              className={btnClasses}
                              disabled={hasAnswered}
                            >
                              <span className="font-mono font-black text-slate-700 mt-0.5 shrink-0">
                                {opt.id.toUpperCase()})
                              </span>
                              <span className="leading-snug">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && q.explanation && (
                        <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                          <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Comentário & Justificativa do Gabarito:</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {lessonActiveTab === 'materiais' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Download className="w-4 h-4 text-sky-600" />
                Apostilas, PDFs e Esquemas Didáticos
              </h3>
              <p className="text-xs text-slate-500">
                Materiais complementares publicados pelo professor para download e consulta rápida.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Apostila Teórica Completa (PDF)</h4>
                      <span className="text-[10px] text-slate-500">18 páginas • Edital TJAM</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1 cursor-pointer">
                    <Download className="w-3 h-3" />
                    Baixar
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Mapa Mental Esquematizado</h4>
                      <span className="text-[10px] text-slate-500">Resumo visual de alta retenção</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateTab('mapa-mental')}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Visualizar
                  </button>
                </div>
              </div>
            </div>
          )}

          {lessonActiveTab === 'flashcards' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-sky-600" />
                    Flashcards com Repetição Espaçada
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Cartões mnemônicos preparados pelo corpo docente para memorização rápida.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab('flashcards')}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 transition-colors cursor-pointer shrink-0"
                >
                  Abrir Central de Flashcards
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                  Frente do Cartão • Pergunta
                </span>
                <p className="text-sm font-extrabold text-slate-900">
                  Qual a principal diferença entre os efeitos temporais da Anulação e da Revogação de um ato administrativo?
                </p>
                <div className="pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-emerald-800 font-semibold max-w-lg mx-auto shadow-xs">
                    Verso: A anulação opera efeitos ex tunc (retroativos à origem). A revogação opera efeitos ex nunc (prospectivos, sem retroagir).
                  </div>
                </div>
              </div>
            </div>
          )}

          {lessonActiveTab === 'tarefa' && (() => {
            const currentSub = submissions.find(
              (s) =>
                s.activityTitle.includes(aula.title) ||
                (s.disciplineName.toLowerCase().includes(selectedSubject.name.toLowerCase()) && s.content)
            );

            return (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
                {taskSubmittedToast && (
                  <div className="p-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sua resposta foi enviada à fila de correção da Professora no Firestore!</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Send className="w-4 h-4 text-sky-600" />
                      Estudo de Caso Prático & Redação ({aula.title})
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Envie sua resolução discursiva para correção e nota atribuída pelo professor no Portal Docente.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-amber-800">
                    Situação-Problema Forense:
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    No exercício de suas atribuições como Assistente Judiciário no TJAM, elabore uma manifestação fundamentada indicando a providência cabível relativa ao tema de <strong>{aula.title}</strong> ({selectedSubject.name}), apontando artigos pertinentes e reflexos práticos.
                  </p>
                </div>

                {currentSub ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">Status do Seu Envio:</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                            currentSub.status === 'corrigido'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                          }`}
                        >
                          {currentSub.status === 'corrigido'
                            ? `🟢 Corrigido • Nota: ${currentSub.grade}/10`
                            : '🟡 Aguardando Correção da Professora'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Enviado em: {currentSub.submittedAt}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Sua Resposta Enviada:</span>
                      <p className="text-xs text-slate-800 font-serif italic whitespace-pre-wrap">
                        "{currentSub.content}"
                      </p>
                    </div>

                    {currentSub.feedback && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                        <span className="text-xs font-black flex items-center gap-1.5 text-emerald-800">
                          <Award className="w-4 h-4" /> Parecer Pedagógico da Professora:
                        </span>
                        <p className="text-xs leading-relaxed font-medium">{currentSub.feedback}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Sua Resposta Técnica:</label>
                    <textarea
                      rows={4}
                      value={taskAnswerText}
                      onChange={(e) => setTaskAnswerText(e.target.value)}
                      placeholder="Escreva sua resposta técnica para o professor avaliar e atribuir nota..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                    />
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => {
                          if (!taskAnswerText.trim()) return;
                          if (onSubmitTask) {
                            onSubmitTask({
                              studentId: progress?.studentId || 'eduardo-mateus',
                              studentName: studentName || 'Eduardo Mateus',
                              turmaId: turmaId || 'TJAM-2026-REGULAR',
                              disciplineId: selectedSubject.slug || selectedSubject.id,
                              disciplineName: selectedSubject.name,
                              activityTitle: `Estudo de Caso: ${aula.title}`,
                              content: taskAnswerText,
                              status: 'pendente',
                            });
                            setTaskAnswerText('');
                            setTaskSubmittedToast(true);
                            setTimeout(() => setTaskSubmittedToast(false), 4000);
                          }
                        }}
                        disabled={!taskAnswerText.trim()}
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Enviar para Avaliação do Professor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    );
  }

  // RENDER LEVEL 2: DENTRO DE UMA MATÉRIA ESPECÍFICA (EX: /materias/direito-administrativo)
  if (selectedSubject && !selectedAulaId) {
    const IconComp = selectedSubject.icon;

    return (
      <div className="w-full space-y-6 animate-in fade-in duration-200">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={() => setSelectedSubject(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-slate-500 hover:text-sky-600"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Matérias
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{selectedSubject.name}</span>
          </div>

          <button
            onClick={() => setSelectedSubject(null)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Ver Todas as Matérias
          </button>
        </div>

        {/* Subject Detail Header */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl ${selectedSubject.bgLight} border ${selectedSubject.border} flex items-center justify-center shrink-0`}>
              <IconComp className={`w-7 h-7 ${selectedSubject.color}`} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {selectedSubject.category}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Professor: <strong>{selectedSubject.teacher}</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {selectedSubject.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {selectedSubject.description}
              </p>
            </div>
          </div>
        </div>

        {/* Aulas List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              Aulas Disponíveis ({selectedSubject.aulas.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              Clique em uma aula para acessar teoria, videoaula e atividades
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {selectedSubject.aulas.map((aula) => {
              const statusKey = `${selectedSubject.id}_${aula.id}`;
              const status = lessonStatuses[statusKey] || 'nao_iniciada';

              return (
                <div
                  key={aula.id}
                  onClick={() => setSelectedAulaId(aula.id)}
                  className="p-5 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-sky-700 shrink-0 group-hover:border-sky-400 transition-colors">
                      {aula.number}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                          {aula.title}
                        </h4>
                        {status === 'concluida' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" /> Concluída
                          </span>
                        ) : status === 'em_andamento' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                            Em andamento
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                            Não iniciada
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {aula.description}
                      </p>
                      
                      {/* Features Badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-slate-600">
                        {aula.hasVideo && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                            <Video className="w-3 h-3 text-sky-600" /> Videoaula
                          </span>
                        )}
                        {aula.hasExercises && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                            <HelpCircle className="w-3 h-3 text-amber-600" /> Exercícios
                          </span>
                        )}
                        {aula.hasMaterials && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                            <Download className="w-3 h-3 text-emerald-600" /> PDFs
                          </span>
                        )}
                        {aula.hasTask && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                            <Send className="w-3 h-3 text-indigo-600" /> Atividade
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500">
                      {aula.duration}
                    </span>
                    <button className="px-3.5 py-1.5 rounded-xl bg-sky-600 group-hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs">
                      <span>Acessar Aula</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RENDER LEVEL 1: VISÃO GERAL DE TODAS AS 11 MATÉRIAS
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                Edital Oficial TJAM 2026
              </span>
              <span className="text-[10px] text-slate-500 font-bold">
                11 Matérias Integradas
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Grade Completa de Matérias
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Navegue pelas 11 disciplinas do concurso TJAM. Cada matéria possui suas próprias aulas com teoria completa, videoaulas gravadas, exercícios corrigidos e materiais didáticos.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('aula-hoje')}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aulas de Hoje</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar matéria ou assunto..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Todas (11)
          </button>
          <button
            onClick={() => setSelectedCategory('Conhecimentos Específicos')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'Conhecimentos Específicos'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Específicas (5)
          </button>
          <button
            onClick={() => setSelectedCategory('Conhecimentos Básicos')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'Conhecimentos Básicos'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Básicas (6)
          </button>
        </div>
      </div>

      {/* Grid of 11 Disciplines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject) => {
          const IconComponent = subject.icon;

          return (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs flex flex-col justify-between group hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${subject.bgLight} border ${subject.border} flex items-center justify-center shrink-0`}>
                    <IconComponent className={`w-5 h-5 ${subject.color}`} />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {subject.category === 'Conhecimentos Específicos' ? 'Específica' : 'Básica'}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-sky-600" />
                  {subject.aulas.length} aulas estruturadas
                </span>
                <span className="text-sky-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Ver Aulas <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
