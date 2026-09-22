// src/data/informaticaLessonData.ts
// Dados completos da 2ª Aula de Hoje — 💻 Informática e Processo Digital: Windows: arquivos, pastas e operações | TJAM
// Nível Intermediário — TJAM Assistente Judiciário

export interface InformaticaQuestion {
  id: number;
  enunciado: string;
  alternativas: string[];
  correta: number; // 0=A, 1=B, 2=C, 3=D, 4=E
  explicacao: string;
}

export interface InformaticaTfQuestion {
  id: number;
  enunciado: string;
  correta: boolean;
  explicacao: string;
}

export interface InformaticaDiscursiveQuestion {
  id: number;
  titulo: string;
  enunciado: string;
  respostaPadrao: string;
  criterios: string[];
}

export interface InformaticaFlashcard {
  id: number;
  q: string;
  a: string;
  tag: string;
}

// 10 Questões Objetivas Inéditas — Estilo Cebraspe / FGV (Questões 1 a 10)
export const informaticaMcQuestionsData: InformaticaQuestion[] = [
  {
    id: 1,
    enunciado: '1. No Windows, a principal finalidade de uma pasta é:',
    alternativas: [
      'A) executar automaticamente programas.',
      'B) armazenar e organizar arquivos e outras pastas.',
      'C) alterar a extensão de todos os arquivos.',
      'D) excluir definitivamente arquivos.',
      'E) substituir o sistema operacional.',
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B. Uma pasta (diretório) destina-se primordialmente a armazenar e organizar arquivos e outras pastas (subpastas) dentro da estrutura hierárquica do sistema de arquivos.',
  },
  {
    id: 2,
    enunciado: '2. Considere o arquivo:\n\nRelatorio_TJAM.pdf\n\nA extensão do arquivo é:',
    alternativas: [
      'A) Relatorio',
      'B) TJAM',
      'C) Relatorio_TJAM',
      'D) .pdf',
      'E) PDF/TJAM',
    ],
    correta: 3, // D
    explicacao: '✅ Gabarito: D (.pdf). Um arquivo é comumente formado por Nome + Extensão. No exemplo "Relatorio_TJAM.pdf", "Relatorio_TJAM" é o nome e ".pdf" é a extensão identificadora do formato.',
  },
  {
    id: 3,
    enunciado: '3. Um usuário seleciona um arquivo e utiliza Ctrl + C, depois acessa outra pasta e utiliza Ctrl + V. O resultado esperado é:',
    alternativas: [
      'A) o arquivo original ser excluído.',
      'B) o arquivo ser renomeado.',
      'C) uma cópia do arquivo ser criada no novo local.',
      'D) o arquivo ser compactado.',
      'E) a pasta original ser excluída.',
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. O comando Copiar (Ctrl + C) duplica a unidade de informação, mantendo o arquivo intacto no local de origem e criando uma cópia exata no destino após Colar (Ctrl + V).',
  },
  {
    id: 4,
    enunciado: '4. Para mover um arquivo utilizando os atalhos tradicionais do Windows, pode-se utilizar:',
    alternativas: [
      'A) Ctrl+C e Ctrl+Z.',
      'B) Ctrl+X e Ctrl+V.',
      'C) Ctrl+A e Ctrl+C.',
      'D) F2 e Delete.',
      'E) Ctrl+F e Ctrl+V.',
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Ctrl+X e Ctrl+V). Mover transfere o arquivo para o novo destino. Utiliza-se Recortar (Ctrl + X) e depois Colar (Ctrl + V). O arquivo deixa de existir no local original.',
  },
  {
    id: 5,
    enunciado: '5. O atalho F2, quando utilizado sobre um arquivo ou pasta selecionado no Explorador de Arquivos, é normalmente utilizado para:',
    alternativas: [
      'A) copiar.',
      'B) excluir.',
      'C) renomear.',
      'D) compactar.',
      'E) abrir.',
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C (renomear). A tecla de atalho F2 aciona imediatamente a edição do nome do item selecionado (arquivo ou pasta) no Explorador de Arquivos do Windows.',
  },
  {
    id: 6,
    enunciado: '6. Sobre a Lixeira do Windows, assinale a alternativa correta:',
    alternativas: [
      'A) Todo arquivo excluído é imediatamente apagado de forma definitiva.',
      'B) A Lixeira serve exclusivamente para armazenar arquivos infectados.',
      'C) Em condições normais, arquivos excluídos podem ser enviados para a Lixeira e posteriormente restaurados.',
      'D) A Lixeira não pode ser esvaziada.',
      'E) Arquivos armazenados na Lixeira continuam necessariamente ocupando o mesmo local original.',
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. A Lixeira funciona como área de retenção temporária para arquivos excluídos no disco local, permitindo que o usuário os restaure para o local original ou esvazie a lixeira definitivamente.',
  },
  {
    id: 7,
    enunciado: '7. Um usuário deseja selecionar vários arquivos que não estão posicionados consecutivamente em uma pasta. Uma forma adequada é utilizar:',
    alternativas: [
      'A) Shift.',
      'B) Ctrl.',
      'C) Alt.',
      'D) F2.',
      'E) Delete.',
    ],
    correta: 1, // B
    explicacao: '✅ Gabarito: B (Ctrl). A tecla Ctrl permite selecionar itens alternados e não consecutivos clicando em cada um. A tecla Shift, por outro lado, seleciona intervalos contínuos/consecutivos.',
  },
  {
    id: 8,
    enunciado: '8. Assinale a alternativa que apresenta apenas extensões normalmente associadas a arquivos de imagem:',
    alternativas: [
      'A) .jpg e .png',
      'B) .mp3 e .wav',
      'C) .docx e .xlsx',
      'D) .mp4 e .avi',
      'E) .zip e .rar',
    ],
    correta: 0, // A
    explicacao: '✅ Gabarito: A (.jpg e .png). .jpg/.jpeg e .png são formatos consolidados de imagem. .mp3/.wav são áudio; .docx/.xlsx são documentos/planilhas; .mp4/.avi são vídeos; .zip/.rar são arquivos compactados.',
  },
  {
    id: 9,
    enunciado: '9. Sobre a alteração da extensão de um arquivo, assinale a alternativa correta:',
    alternativas: [
      'A) Renomear a extensão sempre converte o conteúdo para o novo formato.',
      'B) Alterar a extensão de um arquivo é o mesmo que convertê-lo.',
      'C) A simples alteração da extensão não significa que o conteúdo tenha sido convertido para outro formato.',
      'D) Extensões não possuem relação com o tipo de arquivo.',
      'E) Todo arquivo possui obrigatoriamente a extensão .exe.',
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. Alterar meramente a extensão (ex.: renomear documento.pdf para documento.mp3) não modifica a estrutura binária interna do arquivo nem o transforma num formato de áudio.',
  },
  {
    id: 10,
    enunciado: '10. O Explorador de Arquivos do Windows permite, entre outras operações:',
    alternativas: [
      'A) somente abrir arquivos PDF.',
      'B) apenas acessar a internet.',
      'C) criar, organizar, copiar, mover, renomear e excluir arquivos e pastas.',
      'D) somente executar programas.',
      'E) alterar automaticamente o sistema operacional.',
    ],
    correta: 2, // C
    explicacao: '✅ Gabarito: C. O Explorador de Arquivos (Windows Explorer) é o gerenciador de arquivos e pastas nativo do Windows, permitindo visualizar, criar, copiar, mover, renomear, pesquisar e excluir itens.',
  },
];

// 5 Questões Certo ou Errado (Questões 11 a 15)
export const informaticaTfQuestionsData: InformaticaTfQuestion[] = [
  {
    id: 11,
    enunciado: '11. O comando Ctrl+C normalmente copia o item selecionado, mantendo o original no local de origem.',
    correta: true,
    explicacao: '✅ Gabarito: CERTO. A operação de cópia preserva o arquivo ou pasta original intacto na origem e permite colar cópias idênticas em novos destinos.',
  },
  {
    id: 12,
    enunciado: '12. O comando Ctrl+X, seguido de Ctrl+V em outro local, pode ser utilizado para mover um arquivo.',
    correta: true,
    explicacao: '✅ Gabarito: CERTO. A operação Recortar (Ctrl+X) associada a Colar (Ctrl+V) efetua a movimentação do item, retirando-o da pasta de origem.',
  },
  {
    id: 13,
    enunciado: '13. Um arquivo com extensão .pdf pode ser transformado em um arquivo de áudio simplesmente alterando seu nome para .mp3.',
    correta: false,
    explicacao: '✅ Gabarito: ERRADO. Alterar a extensão renomeia o rótulo de identificação, mas não converte nem altera a codificação dos dados internos do arquivo.',
  },
  {
    id: 14,
    enunciado: '14. Uma pasta pode conter arquivos e também outras pastas, chamadas de subpastas.',
    correta: true,
    explicacao: '✅ Gabarito: CERTO. A estrutura de diretórios do Windows é hierárquica e em árvore, admitindo simultaneamente arquivos e subpastas aninhadas.',
  },
  {
    id: 15,
    enunciado: '15. A Lixeira permite, em situações normais, recuperar um arquivo excluído enquanto ele ainda estiver armazenado nela.',
    correta: true,
    explicacao: '✅ Gabarito: CERTO. Enquanto o arquivo permanecer retido na Lixeira e esta não for esvaziada, o comando "Restaurar" o reenvia ao seu caminho de origem original.',
  },
];

// 5 Questões Dissertativas (Questões 16 a 20) com Espelhos de Resposta Oficiais
export const informaticaDiscursiveQuestionsData: InformaticaDiscursiveQuestion[] = [
  {
    id: 16,
    titulo: 'Questão Discursiva 16 — Diferença entre Copiar e Mover',
    enunciado: 'Explique a diferença entre copiar e mover um arquivo no ambiente Windows, indicando o comportamento do arquivo original e os respectivos atalhos de teclado.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\n1. Copiar (Ctrl + C → Ctrl + V):\n   Cria uma duplicata do arquivo no local de destino, mantendo o arquivo original inalterado no seu local de origem.\n\n2. Mover (Ctrl + X → Ctrl + V):\n   Transfere fisicamente o arquivo para o novo destino, de modo que ele deixa de existir no local de origem anterior.\n\nEm termos operacionais no tribunal, copiar serve para fazer cópias de segurança ou modelos, enquanto mover é utilizado para organizar e redistribuir documentos entre pastas.',
    criterios: [
      'Explicar que copiar duplica e preserva o original na origem',
      'Explicar que mover transfere e remove da origem',
      'Citar os atalhos correspondentes (Ctrl+C e Ctrl+X combinados com Ctrl+V)',
      'Clareza e precisão terminológica',
    ],
  },
  {
    id: 17,
    titulo: 'Questão Discursiva 17 — Extensões de Arquivos e Exemplos',
    enunciado: 'Explique a função das extensões de arquivos no sistema operacional Windows e dê três exemplos práticos de extensões frequentemente utilizadas na rotina forense.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\n1. Função da Extensão:\n   A extensão de arquivo (composta geralmente por um ponto seguido de 3 ou 4 letras ao final do nome) serve para informar ao sistema operacional e aos aplicativos qual é o formato, a estrutura de codificação e qual programa padrão deve ser associado para abrir aquele arquivo.\n\n2. Três Exemplos:\n   • .pdf (Portable Document Format): padrão para peças judiciais, sentenças e petições eletrônicas no TJAM;\n   • .docx: documento de texto editável do Microsoft Word utilizado para elaboração de minutas;\n   • .xlsx: planilha eletrônica do Microsoft Excel para cálculos judiciais, controle de custas ou relatórios.',
    criterios: [
      'Definição da finalidade da extensão (identificação de formato e associação de programa)',
      'Apresentação de ao menos 3 extensões válidas (.pdf, .docx, .xlsx, .jpg, etc.)',
      'Associação correta de cada extensão ao seu respectivo tipo de documento',
    ],
  },
  {
    id: 18,
    titulo: 'Questão Discursiva 18 — Arquivo, Pasta e Subpasta',
    enunciado: 'Diferencie tecnicamente os conceitos de arquivo, pasta e subpasta no sistema operacional Windows.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\n1. Arquivo:\n   É uma unidade elementar de informação armazenada em um dispositivo de memória (disco rígido, SSD, pendrive), contendo dados organizados sob um formato específico (texto, imagem, áudio, PDF).\n\n2. Pasta (Diretório):\n   É um repositório ou contêiner lógico destinado a armazenar e organizar arquivos e outras pastas de forma estruturada.\n\n3. Subpasta:\n   É uma pasta criada dentro de outra pasta já existente, estabelecendo uma relação de hierarquia e aninhamento para categorizar detalhadamente os dados.',
    criterios: [
      'Conceito de arquivo como unidade elementar de dados',
      'Conceito de pasta como contêiner organizacional',
      'Conceito de subpasta como diretório aninhado dentro de outro',
    ],
  },
  {
    id: 19,
    titulo: 'Questão Discursiva 19 — Organização de Documentos no Processo Judicial Eletrônico',
    enunciado: 'Um servidor precisa organizar documentos de um processo judicial eletrônico. Explique como ele poderia utilizar pastas e subpastas para organizar esses documentos de maneira eficiente.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\nPara organizar eficientemente os documentos do processo judicial eletrônico, o servidor deve estruturar uma árvore hierárquica clara:\n\n1. Pasta Raiz (Principal):\n   Identificada pelo número do processo (ex: "PROCESSO_0001234-56.2026.8.04.0001").\n\n2. Subpastas por Categoria e Fase Processual:\n   • "01_Peticoes" (para petição inicial, contestações e manifestações);\n   • "02_Provas_Documentos" (certidões, contratos, relatórios técnicos, imagens);\n   • "03_Decisoes_Despachos" (decisões interlocutórias, despachos judiciais);\n   • "04_Sentencas_Termos" (sentença final e certidões de trânsito em julgado).\n\n3. Padronização de Nomenclatura:\n   Adotar nomes descritivos com datas e extensões padronizadas em .pdf, facilitando a busca rápida, o cumprimento de prazos e o envio de protocolos eletrônicos tempestivos nos termos da Lei 11.419/2006.',
    criterios: [
      'Criação de pasta principal para o processo',
      'Criação de subpastas categorizadas por tipo de documento ou fase processual',
      'Menção à padronização de nomes e formatos (.pdf)',
      'Justificativa quanto à celeridade e organização forense',
    ],
  },
  {
    id: 20,
    titulo: 'Questão Discursiva 20 — Importância dos Atalhos no Trabalho Cotidiano com Arquivos',
    enunciado: 'Explique a importância de conhecer atalhos como Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+Z e F2 no trabalho cotidiano com arquivos em um tribunal.',
    respostaPadrao: 'Padrão de Resposta Esperado:\n\nO domínio de atalhos de teclado no trabalho forense traz benefícios diretos à rotina cartorária e judicial:\n\n1. Agilidade e Produtividade:\n   Operações repetitivas (como renomear dezenas de certidões com F2, duplicar modelos com Ctrl+C e transferir relatórios com Ctrl+X e Ctrl+V) são executadas em fração de segundo sem necessidade de abrir menus de contexto com o mouse.\n\n2. Segurança e Reversibilidade:\n   O atalho Ctrl+Z (Desfazer) permite corrigir imediatamente enganos operacionais acidentais (como um movimento indevido de arquivo ou exclusão errônea).\n\n3. Celeridade Processual:\n   A redução do tempo de manipulação mecânica de arquivos permite que o assistente judiciário dedique mais tempo à conferência substancial de peças e cumprimento tempestivo de mandados e prazos.',
    criterios: [
      'Menção ao ganho de velocidade e produtividade em tarefas repetitivas',
      'Explicação dos atalhos citados no enunciado (Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+Z, F2)',
      'Citação da função de segurança do Ctrl+Z para desfazer enganos',
      'Contextualização com o trabalho cotidiano em vara judicial/tribunal',
    ],
  },
];

// 10 Flashcards Didáticos — Windows, Arquivos, Pastas e Processo Digital | TJAM
export const informaticaFlashcardsData: InformaticaFlashcard[] = [
  {
    id: 1,
    q: 'O que é um SISTEMA OPERACIONAL?',
    a: 'Software básico responsável por controlar e administrar os recursos do computador (hardware), permitindo a interação entre usuário, programas e periféricos. Ex.: Windows, Linux, macOS.',
    tag: 'Sistema Operacional',
  },
  {
    id: 2,
    q: 'Qual a diferença elementar entre ARQUIVO e PASTA?',
    a: '• Arquivo: unidade de informação armazenada (documento, planilha, PDF).\n• Pasta (Diretório): contêiner que organiza arquivos e outras pastas (subpastas).',
    tag: 'Conceitos Básicos',
  },
  {
    id: 3,
    q: 'O que a EXTENSÃO do arquivo indica?',
    a: 'A extensão (ex: .pdf, .docx, .xlsx, .jpg) indica o formato do arquivo e ajuda o sistema operacional a saber qual programa deve abri-lo.',
    tag: 'Extensões',
  },
  {
    id: 4,
    q: 'Renomear a extensão de um arquivo converte seu conteúdo?',
    a: 'NÃO! Mudar .pdf para .mp3 apenas altera o nome/rótulo; o conteúdo continua sendo um PDF e não se transforma em áudio.',
    tag: 'Pegadinha de Prova',
  },
  {
    id: 5,
    q: 'Qual a diferença entre COPIAR (Ctrl+C) e MOVER (Ctrl+X)?',
    a: '• Copiar (Ctrl+C): duplica o arquivo, mantendo o original na origem.\n• Mover (Ctrl+X): transfere o arquivo para outro destino, retirando-o da origem.',
    tag: 'Operações',
  },
  {
    id: 6,
    q: 'Qual o atalho padrão do Windows para RENOMEAR um item selecionado?',
    a: 'F2. Permite editar o nome de arquivos e pastas instantaneamente.',
    tag: 'Atalhos',
  },
  {
    id: 7,
    q: 'Como criar uma NOVA PASTA pelo teclado no Windows?',
    a: 'Ctrl + Shift + N.',
    tag: 'Atalhos',
  },
  {
    id: 8,
    q: 'Como selecionar arquivos NÃO CONSECUTIVOS vs CONSECUTIVOS?',
    a: '• Itens alternados/não consecutivos: manter a tecla CTRL pressionada.\n• Itens contínuos/em sequência: clicar no primeiro e com SHIFT pressionado clicar no último.',
    tag: 'Seleção',
  },
  {
    id: 9,
    q: 'Qual o papel da LIXEIRA no Windows?',
    a: 'Área de armazenamento temporário para itens excluídos no disco local. Permite Restaurar o arquivo para sua pasta de origem ou esvaziar a lixeira.',
    tag: 'Lixeira',
  },
  {
    id: 10,
    q: 'Qual lei disciplina o PROCESSO JUDICIAL ELETRÔNICO no Brasil?',
    a: 'Lei nº 11.419/2006. Ela autoriza o uso de meios eletrônicos para tramitação de processos, assinaturas eletrônicas, petições e protocolos digitais tempestivos até 24h do último dia.',
    tag: 'Processo Digital',
  },
];

// Pontos de Resumo da Aula 01 — Windows, Arquivos, Pastas e Processo Digital | TJAM
export const informaticaSummaryPoints: string[] = [
  'Sistema Operacional: Software que gerencia recursos do computador (hardware, programas, arquivos, usuários). Exemplos: Windows, Linux, macOS.',
  'Arquivo: Unidade de informação armazenada. Estrutura básica: Nome + Extensão (ex.: concurso_tjam.pdf).',
  'Extensões Comuns: .pdf (PDF), .docx (Word), .xlsx (Excel), .pptx (PowerPoint), .jpg/.png (Imagens), .zip (Compactados). Alterar a extensão NÃO converte o arquivo.',
  'Pastas e Caminhos: Pastas organizam arquivos e subpastas. O caminho completo descreve a hierarquia (ex.: C:\\Users\\Aluno\\Documents\\TJAM\\Peticao.pdf).',
  'Copiar vs. Mover: Copiar (Ctrl+C) mantém o original; Mover (Ctrl+X) transfere o item. Ambos concluem com Colar (Ctrl+V).',
  'Renomear e Criar Pastas: Renomear via menu ou tecla F2. Criar nova pasta via botão direito ou Ctrl + Shift + N.',
  'Exclusão e Lixeira: Delete envia para a Lixeira (armazenamento temporário, recuperável com "Restaurar"). Não confundir com exclusão imediata definitiva.',
  'Seleção de Itens: Tecla Ctrl para itens alternados (não consecutivos) e Tecla Shift para sequências contínuas.',
  'Atalhos Essenciais: Ctrl+C (copiar), Ctrl+X (recortar), Ctrl+V (colar), Ctrl+Z (desfazer), Ctrl+A (selecionar tudo), F2 (renomear), Delete (excluir), Ctrl+Shift+N (nova pasta).',
  'Processo Digital (Lei 11.419/2006): Informatização judicial, assinaturas eletrônicas, protocolos digitais com data/hora e tempestividade até 24h do último dia do prazo legal.',
];
