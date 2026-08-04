import { Flashcard } from '../types';

export const ALL_TJAM_FLASHCARDS: Flashcard[] = [
  // --- LEGISLAÇÃO DO TJAM ---
  {
    id: 'fc-tjam-1',
    disciplineId: 'legislacao-tjam',
    topicId: 'tjam-1',
    topicName: 'Estrutura do Poder Judiciário do Amazonas',
    front: 'Quantos Desembargadores compõem o Tribunal de Justiça do Estado do Amazonas (TJAM)?',
    back: '26 Desembargadores (LCE nº 17/1997, Art. 12).',
    difficulty: 'fácil'
  },
  {
    id: 'fc-tjam-2',
    disciplineId: 'legislacao-tjam',
    topicId: 'tjam-4',
    topicName: 'Regimento Interno',
    front: 'Qual o quórum mínimo e o mandato da Mesa Diretora do TJAM?',
    back: 'Quórum do Pleno: Maioria Absoluta. Mandato da Mesa Diretora: 2 anos, vedada reeleição imediata para o mesmo cargo.',
    difficulty: 'fácil'
  },

  // --- LÍNGUA PORTUGUESA ---
  {
    id: 'fc-port-1',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-16',
    topicName: 'Crase',
    front: 'Qual o mnemônico para os 3 casos de crase FACULTATIVA?',
    back: '"Até a sua Maria": 1) Após a preposição ATE; 2) Antes de pronome possessivo feminino singular (sua, minha); 3) Antes de nome próprio feminino.',
    difficulty: 'fácil'
  },
  {
    id: 'fc-port-2',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-17',
    topicName: 'Colocação pronominal',
    front: 'O que prevalece na colocação pronominal havendo palavra atrativa (ex: negação)?',
    back: 'A Próclise é OBRIGATÓRIA (ex: "Não ME disseram nada"). Palavras de sentido negativo atraem o pronome oblíquo átono.',
    difficulty: 'médio'
  },

  // --- DIREITO CONSTITUCIONAL ---
  {
    id: 'fc-const-1',
    disciplineId: 'direito-constitucional',
    topicId: 'const-4',
    topicName: 'Direitos e Garantias Fundamentais',
    front: 'Qual o prazo decadencial do Mandado de Segurança?',
    back: '120 dias, contados da ciência oficial do ato impugnado.',
    difficulty: 'médio'
  },
  {
    id: 'fc-const-2',
    disciplineId: 'direito-constitucional',
    topicId: 'const-4',
    topicName: 'Direitos e Garantias Fundamentais',
    front: 'Quais os remédios constitucionais totalmente GRATUITOS por força de lei?',
    back: 'Habeas Corpus (HC) e Habeas Data (HD), além das ações de Ação Popular (salvo má-fé).',
    difficulty: 'fácil'
  },

  // --- DIREITO ADMINISTRATIVO ---
  {
    id: 'fc-adm-1',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-4',
    topicName: 'Atos Administrativos',
    front: 'Quais são os 5 elementos/requisitos do Ato Administrativo e quais seus atributos?',
    back: 'Elementos (COFIFOMOB): Competência, Finalidade, Forma, Motivo e Objeto. Atributos (PATI): Presunção de Legitimidade, Autoexecutoriedade, Tipicidade e Imperatividade.',
    difficulty: 'fácil'
  },
  {
    id: 'fc-adm-2',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-8',
    topicName: 'Licitações',
    front: 'Quais modalidades de licitação foram extintas na Lei 14.133/2021?',
    back: 'Convite e Tomada de Preços foram EXTINTAS. As modalidades atuais são: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo.',
    difficulty: 'fácil'
  },

  // --- PROCESSO CIVIL ---
  {
    id: 'fc-pc-1',
    disciplineId: 'processo-civil',
    topicId: 'pc-5',
    topicName: 'Prazos',
    front: 'Como são contados os prazos em dias no CPC/2015?',
    back: 'Somente em DIAS ÚTEIS (Art. 219 do CPC/15), excluindo o dia do começo e incluindo o do vencimento.',
    difficulty: 'fácil'
  },

  // --- PROCESSO PENAL ---
  {
    id: 'fc-pp-1',
    disciplineId: 'processo-penal',
    topicId: 'pp-3',
    topicName: 'Inquérito Policial',
    front: 'O Delegado de Polícia pode mandar arquivar o Inquérito Policial?',
    back: 'NÃO! O Inquérito é Indisponível (Art. 17 do CPP). O arquivamento depende de promoção do MP e decisão judicial.',
    difficulty: 'fácil'
  },

  // --- INFORMÁTICA ---
  {
    id: 'fc-inf-1',
    disciplineId: 'informatica',
    topicId: 'inf-11',
    topicName: 'Segurança da Informação',
    front: 'O que é Ransomware e qual sua principal característica?',
    back: 'É um malware extorsivo que criptografa os arquivos da vítima e exige resgate (ransom) para liberação.',
    difficulty: 'fácil'
  },

  // --- GEOGRAFIA DO AMAZONAS ---
  {
    id: 'fc-geo-1',
    disciplineId: 'geografia-amazonas',
    topicId: 'geo-3',
    topicName: 'Hidrografia',
    front: 'Por que o Rio Negro e o Solimões não se misturam imediatamente no Encontro das Águas?',
    back: 'Devido às diferenças de temperatura (~28°C vs ~22°C), velocidade (2km/h vs 6km/h) e densidade/pH das águas.',
    difficulty: 'fácil'
  },

  // --- ACESSIBILIDADE E INCLUSÃO ---
  {
    id: 'fc-acess-1',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-3',
    topicName: 'Estatuto da Pessoa com Deficiência',
    front: 'O que define o conceito de "Desenho Universal" na Lei nº 13.146/2015?',
    back: 'Concepção de produtos, ambientes, programas e serviços a serem usados por TODAS as pessoas sem necessidade de adaptação.',
    difficulty: 'fácil'
  }
];
