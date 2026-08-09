import { Question, Simulado } from '../types';

export const SIMULADO_GERAL_TJAM_QUESTIONS: Question[] = [
  // LÍNGUA PORTUGUESA (1-5)
  {
    id: 'sim-tjam-q1',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-1',
    topicName: 'Língua Portuguesa • Interpretação de Texto',
    statement: '1. Em um texto, a interpretação adequada depende principalmente:',
    options: [
      { id: 'a', text: 'A) Apenas do significado isolado das palavras.' },
      { id: 'b', text: 'B) Da compreensão do contexto e das relações entre as informações.' },
      { id: 'c', text: 'C) Somente da opinião pessoal do leitor.' },
      { id: 'd', text: 'D) Da quantidade de palavras existentes no texto.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: A interpretação textual eficaz exige a análise global do contexto, a inter-relação de ideias e a inferência lógica dentro do texto.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q2',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-2',
    topicName: 'Língua Portuguesa • Tipologia Textual',
    statement: '2. A finalidade principal de um texto argumentativo é:',
    options: [
      { id: 'a', text: 'A) Apresentar exclusivamente personagens.' },
      { id: 'b', text: 'B) Defender uma ideia ou ponto de vista por meio de argumentos.' },
      { id: 'c', text: 'C) Apenas descrever objetos.' },
      { id: 'd', text: 'D) Relatar acontecimentos sem qualquer posicionamento.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: O texto argumentativo visa convencer ou persuadir o leitor mediante a apresentação de tese e argumentos fundamentados.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q3',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-1',
    topicName: 'Língua Portuguesa • Compreensão de Texto',
    statement: '3. Quando uma informação está explicitamente apresentada no texto, dizemos que ela é:',
    options: [
      { id: 'a', text: 'A) Implícita.' },
      { id: 'b', text: 'B) Subjetiva.' },
      { id: 'c', text: 'C) Explícita.' },
      { id: 'd', text: 'D) Ambígua.' }
    ],
    correctOptionId: 'c',
    explanation: 'Gabarito C: Informações explícitas estão declaradas de forma direta e literal no próprio texto.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q4',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-1',
    topicName: 'Língua Portuguesa • Relações Textuais',
    statement: '4. Para interpretar corretamente um texto, o candidato deve:',
    options: [
      { id: 'a', text: 'A) Considerar somente a primeira frase.' },
      { id: 'b', text: 'B) Ignorar o contexto.' },
      { id: 'c', text: 'C) Relacionar as informações apresentadas no texto.' },
      { id: 'd', text: 'D) Utilizar exclusivamente seus conhecimentos pessoais.' }
    ],
    correctOptionId: 'c',
    explanation: 'Gabarito C: A leitura interpretativa exige a articulação entre trechos, conectivos e informações expressas no texto.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q5',
    disciplineId: 'lingua-portuguesa',
    topicId: 'port-2',
    topicName: 'Língua Portuguesa • Coesão e Coerência',
    statement: '5. Uma conclusão textual adequada deve:',
    options: [
      { id: 'a', text: 'A) Contradizer necessariamente o desenvolvimento.' },
      { id: 'b', text: 'B) Relacionar-se às ideias desenvolvidas anteriormente.' },
      { id: 'c', text: 'C) Introduzir obrigatoriamente um novo assunto.' },
      { id: 'd', text: 'D) Ignorar os argumentos apresentados.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: A conclusão fecha o raciocínio articulando-se harmonicamente com os argumentos desenvolvidos ao longo do texto.',
    difficulty: 'fácil'
  },

  // DIREITO CONSTITUCIONAL (6-10)
  {
    id: 'sim-tjam-q6',
    disciplineId: 'direito-constitucional',
    topicId: 'const-1',
    topicName: 'Direito Constitucional • Teoria da Constituição',
    statement: '6. A Constituição Federal de 1988 é conhecida como:',
    options: [
      { id: 'a', text: 'A) Constituição Imperial.' },
      { id: 'b', text: 'B) Constituição Cidadã.' },
      { id: 'c', text: 'C) Constituição Provisória.' },
      { id: 'd', text: 'D) Constituição Administrativa.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Denominada "Constituição Cidadã" por Ulysses Guimarães pelo seu foco na redemocratização, direitos fundamentais e cidadania.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q7',
    disciplineId: 'direito-constitucional',
    topicId: 'const-1',
    topicName: 'Direito Constitucional • Princípios Fundamentais',
    statement: '7. São fundamentos da República Federativa do Brasil:',
    options: [
      { id: 'a', text: 'A) Soberania, cidadania e dignidade da pessoa humana.' },
      { id: 'b', text: 'B) Apenas soberania e propriedade.' },
      { id: 'c', text: 'C) Hierarquia e disciplina.' },
      { id: 'd', text: 'D) Livre iniciativa e tributação exclusivamente.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O art. 1º da CF/88 elenca os fundamentos da RFB (SO-CI-DI-VA-PLU): soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa e pluralismo político.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q8',
    disciplineId: 'direito-constitucional',
    topicId: 'const-2',
    topicName: 'Direito Constitucional • Direitos Individuais',
    statement: '8. O princípio da igualdade significa que:',
    options: [
      { id: 'a', text: 'A) Todos devem receber tratamento absolutamente idêntico em qualquer situação.' },
      { id: 'b', text: 'B) Todos são iguais perante a lei, observadas as diferenças juridicamente relevantes.' },
      { id: 'c', text: 'C) Somente servidores públicos possuem direitos fundamentais.' },
      { id: 'd', text: 'D) A igualdade não é protegida constitucionalmente.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: O art. 5º da CF garante a igualdade material (tratar igualmente os iguais e desigualmente os desiguais, na medida de suas desigualdades).',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q9',
    disciplineId: 'direito-constitucional',
    topicId: 'const-3',
    topicName: 'Direito Constitucional • Poder Judiciário',
    statement: '9. O Poder Judiciário possui como função típica:',
    options: [
      { id: 'a', text: 'A) Elaborar leis.' },
      { id: 'b', text: 'B) Administrar o orçamento público.' },
      { id: 'c', text: 'C) Exercer a função jurisdicional.' },
      { id: 'd', text: 'D) Criar políticas públicas.' }
    ],
    correctOptionId: 'c',
    explanation: 'Gabarito C: A função típica do Judiciário é a jurisdicional (julgar conflitos aplicando o direito ao caso concreto com força de coisa julgada).',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q10',
    disciplineId: 'direito-constitucional',
    topicId: 'const-2',
    topicName: 'Direito Constitucional • Direitos e Garantias',
    statement: '10. Os direitos fundamentais:',
    options: [
      { id: 'a', text: 'A) Não possuem proteção constitucional.' },
      { id: 'b', text: 'B) Estão relacionados à proteção da pessoa e à garantia de direitos essenciais.' },
      { id: 'c', text: 'C) São aplicáveis somente aos servidores públicos.' },
      { id: 'd', text: 'D) Podem ser livremente eliminados por qualquer autoridade.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Os direitos fundamentais resguardam a dignidade, a liberdade e as garantias vitais de todas as pessoas.',
    difficulty: 'fácil'
  },

  // DIREITO ADMINISTRATIVO (11-15)
  {
    id: 'sim-tjam-q11',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-1',
    topicName: 'Direito Administrativo • Princípios do Art. 37 CF',
    statement: '11. A Administração Pública deve observar, entre outros, os princípios expressos no art. 37 da Constituição Federal:',
    options: [
      { id: 'a', text: 'A) Legalidade, impessoalidade, moralidade, publicidade e eficiência.' },
      { id: 'b', text: 'B) Hierarquia, segredo, informalidade, pessoalidade e eficiência.' },
      { id: 'c', text: 'C) Exclusividade, pessoalidade, sigilo, hierarquia e legalidade.' },
      { id: 'd', text: 'D) Liberdade, pessoalidade, informalidade, moralidade e segredo.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O caput do art. 37 da CF consagra os 5 princípios expressos conhecidos pelo acrônimo LIMPE.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q12',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-1',
    topicName: 'Direito Administrativo • Princípio da Legalidade',
    statement: '12. Pelo princípio da legalidade administrativa:',
    options: [
      { id: 'a', text: 'A) O administrador pode fazer tudo aquilo que desejar.' },
      { id: 'b', text: 'B) A Administração Pública deve atuar conforme a lei.' },
      { id: 'c', text: 'C) A lei não se aplica à Administração.' },
      { id: 'd', text: 'D) O servidor pode ignorar normas administrativas.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: No Direito Administrativo, o administrador público só pode atuar quando e como a lei autoriza ou determina.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q13',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-1',
    topicName: 'Direito Administrativo • Princípio da Impessoalidade',
    statement: '13. O princípio da impessoalidade busca evitar:',
    options: [
      { id: 'a', text: 'A) A atuação administrativa baseada em favorecimentos pessoais.' },
      { id: 'b', text: 'B) A aplicação da lei.' },
      { id: 'c', text: 'C) A eficiência administrativa.' },
      { id: 'd', text: 'D) A publicidade dos atos.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O princípio da impessoalidade veda a promoção pessoal de agentes e favorecimentos ou perseguições individuais.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q14',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-1',
    topicName: 'Direito Administrativo • Princípio da Publicidade',
    statement: '14. A publicidade administrativa está relacionada:',
    options: [
      { id: 'a', text: 'A) À transparência dos atos da Administração, ressalvadas as hipóteses legais de sigilo.' },
      { id: 'b', text: 'B) À obrigação de divulgar informações pessoais protegidas.' },
      { id: 'c', text: 'C) À proibição de acesso às informações públicas.' },
      { id: 'd', text: 'D) À atuação secreta do servidor.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: A publicidade é a regra no serviço público, indispensável para a eficácia e o controle social dos atos administrativos.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q15',
    disciplineId: 'direito-administrativo',
    topicId: 'adm-1',
    topicName: 'Direito Administrativo • Princípio da Eficiência',
    statement: '15. O princípio da eficiência exige:',
    options: [
      { id: 'a', text: 'A) Ausência de controle.' },
      { id: 'b', text: 'B) Busca por uma atuação administrativa adequada e eficiente.' },
      { id: 'c', text: 'C) Favorecimento de determinados cidadãos.' },
      { id: 'd', text: 'D) Desrespeito às normas legais.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: A eficiência busca a presteza, perfeição e otimização dos recursos públicos na prestação dos serviços.',
    difficulty: 'fácil'
  },

  // INFORMÁTICA (16-20)
  {
    id: 'sim-tjam-q16',
    disciplineId: 'informatica',
    topicId: 'info-1',
    topicName: 'Informática • Sistemas Operacionais',
    statement: '16. O sistema operacional é responsável, entre outras funções, por:',
    options: [
      { id: 'a', text: 'A) Gerenciar recursos do computador e permitir a interação com o usuário.' },
      { id: 'b', text: 'B) Substituir obrigatoriamente o navegador.' },
      { id: 'c', text: 'C) Criar leis automaticamente.' },
      { id: 'd', text: 'D) Impedir a utilização de arquivos.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O sistema operacional (ex: Windows, Linux) gerencia hardware, memória, processos e interface de usuário.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q17',
    disciplineId: 'informatica',
    topicId: 'info-2',
    topicName: 'Informática • Edição de Textos (MS Word)',
    statement: '17. Microsoft Word é utilizado principalmente para:',
    options: [
      { id: 'a', text: 'A) Edição de textos.' },
      { id: 'b', text: 'B) Navegação na internet.' },
      { id: 'c', text: 'C) Gerenciamento de redes físicas.' },
      { id: 'd', text: 'D) Criação exclusiva de bancos de dados.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O MS Word é o processador de textos padrão do pacote Microsoft Office.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q18',
    disciplineId: 'informatica',
    topicId: 'info-3',
    topicName: 'Informática • Navegadores de Internet',
    statement: '18. Um navegador de internet permite:',
    options: [
      { id: 'a', text: 'A) Acessar páginas e serviços disponíveis na internet.' },
      { id: 'b', text: 'B) Somente editar documentos.' },
      { id: 'c', text: 'C) Substituir o sistema operacional.' },
      { id: 'd', text: 'D) Executar exclusivamente cálculos matemáticos.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O navegador (browser, como Chrome ou Edge) interpreta códigos HTML e exibe páginas web.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q19',
    disciplineId: 'informatica',
    topicId: 'info-4',
    topicName: 'Informática • Segurança da Informação',
    statement: '19. Uma boa prática de segurança da informação é:',
    options: [
      { id: 'a', text: 'A) Utilizar a mesma senha em todos os serviços.' },
      { id: 'b', text: 'B) Compartilhar senhas com colegas.' },
      { id: 'c', text: 'C) Utilizar senhas fortes e evitar compartilhá-las.' },
      { id: 'd', text: 'D) Abrir todos os anexos recebidos.' }
    ],
    correctOptionId: 'c',
    explanation: 'Gabarito C: Senhas fortes (letras, números e símbolos) e sigilo pessoal protegem credenciais corporativas e individuais.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q20',
    disciplineId: 'informatica',
    topicId: 'info-4',
    topicName: 'Informática • Golpes e Phishing',
    statement: '20. Phishing é uma técnica utilizada para:',
    options: [
      { id: 'a', text: 'A) Melhorar a velocidade do computador.' },
      { id: 'b', text: 'B) Tentar obter informações por meio de mensagens ou páginas fraudulentas.' },
      { id: 'c', text: 'C) Criar documentos oficiais.' },
      { id: 'd', text: 'D) Fazer backup automático.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Phishing é o ataque de engenharia social voltado a enganar a vítima para roubar dados pessoais ou bancários.',
    difficulty: 'fácil'
  },

  // PROCESSO CIVIL (21-25)
  {
    id: 'sim-tjam-q21',
    disciplineId: 'processo-civil',
    topicId: 'cpc-1',
    topicName: 'Processo Civil • Jurisdição',
    statement: '21. Jurisdição é:',
    options: [
      { id: 'a', text: 'A) A atividade privada dos advogados.' },
      { id: 'b', text: 'B) A função estatal de solucionar conflitos mediante aplicação do Direito.' },
      { id: 'c', text: 'C) A criação de leis pelo Legislativo.' },
      { id: 'd', text: 'D) Uma atividade exclusivamente administrativa.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: A jurisdição é o poder-dever do Estado de dizer o direito (jus dicere) e pacificar controvérsias com definitividade.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q22',
    disciplineId: 'processo-civil',
    topicId: 'cpc-1',
    topicName: 'Processo Civil • Direito de Ação',
    statement: '22. A ação pode ser compreendida como:',
    options: [
      { id: 'a', text: 'A) O direito de provocar a atuação do Poder Judiciário.' },
      { id: 'b', text: 'B) A sentença do juiz.' },
      { id: 'c', text: 'C) O limite territorial da competência.' },
      { id: 'd', text: 'D) A pena aplicada ao réu.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: A ação é o direito subjetivo e autônomo de exigir do Estado a prestação jurisdicional.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q23',
    disciplineId: 'processo-civil',
    topicId: 'cpc-2',
    topicName: 'Processo Civil • Competência',
    statement: '23. Competência corresponde:',
    options: [
      { id: 'a', text: 'A) Ao direito de ação.' },
      { id: 'b', text: 'B) Aos limites de atuação de determinado órgão jurisdicional.' },
      { id: 'c', text: 'C) À criação das leis processuais.' },
      { id: 'd', text: 'D) À defesa realizada pelo advogado.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Competência é a medida da jurisdição, definindo os limites em que cada juízo ou tribunal exerce seu poder julgador.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q24',
    disciplineId: 'processo-civil',
    topicId: 'cpc-1',
    topicName: 'Processo Civil • Princípio do Contraditório',
    statement: '24. O princípio do contraditório garante, entre outros aspectos:',
    options: [
      { id: 'a', text: 'A) A possibilidade de participação das partes no processo.' },
      { id: 'b', text: 'B) A impossibilidade de defesa.' },
      { id: 'c', text: 'C) A atuação secreta do juiz.' },
      { id: 'd', text: 'D) A eliminação dos recursos.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O contraditório abrange a informação prévia dos atos processuais e a oportunidade de manifestação e influência na decisão.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q25',
    disciplineId: 'processo-civil',
    topicId: 'cpc-1',
    topicName: 'Processo Civil • Princípio do Juiz Natural',
    statement: '25. O princípio do juiz natural busca impedir:',
    options: [
      { id: 'a', text: 'A) A existência do Poder Judiciário.' },
      { id: 'b', text: 'B) A escolha de um órgão julgador especificamente criado para determinado caso.' },
      { id: 'c', text: 'C) O direito de defesa.' },
      { id: 'd', text: 'D) A aplicação das leis.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Veda juízos ou tribunais de exceção (art. 5º, XXXVII e LIII da CF), assegurando imparcialidade anterior aos fatos.',
    difficulty: 'fácil'
  },

  // PROCESSO PENAL (26-30)
  {
    id: 'sim-tjam-q26',
    disciplineId: 'processo-penal',
    topicId: 'cpp-1',
    topicName: 'Processo Penal • Inquérito Policial',
    statement: '26. O inquérito policial é:',
    options: [
      { id: 'a', text: 'A) Um processo judicial.' },
      { id: 'b', text: 'B) Um procedimento administrativo investigativo.' },
      { id: 'c', text: 'C) Uma sentença criminal.' },
      { id: 'd', text: 'D) Uma pena.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: O Inquérito Policial (IP) é um procedimento administrativo prévio, de caráter investigatório, conduzido pela polícia judiciária.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q27',
    disciplineId: 'processo-penal',
    topicId: 'cpp-1',
    topicName: 'Processo Penal • Finalidade do Inquérito',
    statement: '27. Uma das finalidades do inquérito policial é reunir elementos relacionados:',
    options: [
      { id: 'a', text: 'A) À autoria e à materialidade da infração.' },
      { id: 'b', text: 'B) Somente à pena.' },
      { id: 'c', text: 'C) Apenas à defesa do acusado.' },
      { id: 'd', text: 'D) Exclusivamente ao julgamento.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O IP busca a justa causa para a ação penal, reunindo indícios suficientes de autoria e prova da materialidade do crime.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q28',
    disciplineId: 'processo-penal',
    topicId: 'cpp-1',
    topicName: 'Processo Penal • Materialidade delitiva',
    statement: '28. A materialidade de uma infração penal está relacionada:',
    options: [
      { id: 'a', text: 'A) À demonstração da existência do fato criminoso.' },
      { id: 'b', text: 'B) À identificação do advogado.' },
      { id: 'c', text: 'C) À sentença definitiva.' },
      { id: 'd', text: 'D) À escolha do juiz.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: Materialidade é a comprovação de que o fato delituoso efetivamente ocorreu no mundo real.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q29',
    disciplineId: 'processo-penal',
    topicId: 'cpp-1',
    topicName: 'Processo Penal • Indiciamento',
    statement: '29. O indiciamento:',
    options: [
      { id: 'a', text: 'A) Equivale automaticamente à condenação.' },
      { id: 'b', text: 'B) É ato relacionado à investigação que aponta determinada pessoa como provável autora ou partícipe diante dos elementos reunidos.' },
      { id: 'c', text: 'C) É uma sentença judicial.' },
      { id: 'd', text: 'D) Encerra obrigatoriamente o processo.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Indiciamento é ato privativo da autoridade policial indicando provável autoria com base nos elementos colhidos no IP.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q30',
    disciplineId: 'processo-penal',
    topicId: 'cpp-1',
    topicName: 'Processo Penal • Dispensabilidade do Inquérito',
    statement: '30. O inquérito policial é considerado dispensável porque:',
    options: [
      { id: 'a', text: 'A) Nunca possui utilidade.' },
      { id: 'b', text: 'B) A ação penal pode ser proposta quando já existirem elementos suficientes, mesmo sem inquérito.' },
      { id: 'c', text: 'C) O delegado não pode investigar.' },
      { id: 'd', text: 'D) Todo crime dispensa investigação.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Se o titular da ação penal (MP ou ofendido) já tiver provas suficientes de autoria e materialidade, pode denunciar sem a realização do IP.',
    difficulty: 'fácil'
  },

  // LIBRAS (31-35)
  {
    id: 'sim-tjam-q31',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-1',
    topicName: 'LIBRAS • Sigla e Conceito',
    statement: '31. LIBRAS significa:',
    options: [
      { id: 'a', text: 'A) Linguagem Brasileira de Sinais.' },
      { id: 'b', text: 'B) Língua Brasileira de Sinais.' },
      { id: 'c', text: 'C) Língua Brasileira para Surdos.' },
      { id: 'd', text: 'D) Linguagem Brasileira para Surdos.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: LIBRAS é a Língua Brasileira de Sinais, reconhecida formalmente como língua autônoma de natureza visual-espacial.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q32',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-1',
    topicName: 'LIBRAS • Autonomia Linguística',
    statement: '32. A LIBRAS:',
    options: [
      { id: 'a', text: 'A) É uma simples tradução do português.' },
      { id: 'b', text: 'B) É uma língua com estrutura gramatical própria.' },
      { id: 'c', text: 'C) É apenas um conjunto de gestos.' },
      { id: 'd', text: 'D) É universal.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: A LIBRAS possui gramática, sintaxe e léxico próprios, independente do Português oral.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q33',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-2',
    topicName: 'LIBRAS • Lei nº 10.436/2002',
    statement: '33. A Lei nº 10.436/2002:',
    options: [
      { id: 'a', text: 'A) Reconhece a LIBRAS como meio legal de comunicação e expressão.' },
      { id: 'b', text: 'B) Determina a substituição do português pela LIBRAS.' },
      { id: 'c', text: 'C) Proíbe o uso da LIBRAS nos órgãos públicos.' },
      { id: 'd', text: 'D) Criou o Poder Judiciário.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: Marco legal que confere oficialidade e amparo à Língua Brasileira de Sinais no país.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q34',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-1',
    topicName: 'LIBRAS • Datilologia',
    statement: '34. Datilologia é:',
    options: [
      { id: 'a', text: 'A) A gramática da LIBRAS.' },
      { id: 'b', text: 'B) A representação manual das letras do alfabeto.' },
      { id: 'c', text: 'C) A tradução de textos jurídicos.' },
      { id: 'd', text: 'D) Uma forma de escrita.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: Datilologia é a soletração manual de letras do alfabeto para nomes próprios e termos sem sinal específico.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q35',
    disciplineId: 'acessibilidade-inclusao',
    topicId: 'acess-1',
    topicName: 'LIBRAS • Parâmetros e Expressões',
    statement: '35. Na LIBRAS, expressões faciais e corporais:',
    options: [
      { id: 'a', text: 'A) Não possuem importância.' },
      { id: 'b', text: 'B) Podem participar da construção do significado.' },
      { id: 'c', text: 'C) São utilizadas somente para demonstrar emoções.' },
      { id: 'd', text: 'D) Substituem todos os sinais.' }
    ],
    correctOptionId: 'b',
    explanation: 'Gabarito B: As expressões faciais/corporais são parâmetros gramaticais cruciais para o significado, intensidade e modalidade da frase.',
    difficulty: 'fácil'
  },

  // QUESTÕES INTERDISCIPLINARES (36-40)
  {
    id: 'sim-tjam-q36',
    disciplineId: 'interdisciplinar',
    topicId: 'inter-1',
    topicName: 'Interdisciplinar • Acessibilidade e Serviço Público',
    statement: '36. Um servidor público atende uma pessoa surda e procura garantir uma comunicação adequada. Essa atitude está relacionada principalmente à:',
    options: [
      { id: 'a', text: 'A) Acessibilidade e inclusão.' },
      { id: 'b', text: 'B) Pessoalidade administrativa.' },
      { id: 'c', text: 'C) Exclusão social.' },
      { id: 'd', text: 'D) Supressão de direitos.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O atendimento adaptado respeita o princípio da acessibilidade, dignidade humana e inclusão nos serviços públicos.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q37',
    disciplineId: 'interdisciplinar',
    topicId: 'inter-2',
    topicName: 'Interdisciplinar • Atuação Ética do Servidor',
    statement: '37. Um servidor que atua conforme a lei, sem favorecimento pessoal e buscando prestar um serviço adequado está observando principalmente:',
    options: [
      { id: 'a', text: 'A) Legalidade, impessoalidade e eficiência.' },
      { id: 'b', text: 'B) Pessoalidade, sigilo e informalidade.' },
      { id: 'c', text: 'C) Exclusivamente publicidade.' },
      { id: 'd', text: 'D) Apenas hierarquia.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: Cumprir a lei (legalidade), sem privilégios (impessoalidade) e com boa prestação (eficiência) reflete os princípios do art. 37 da CF.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q38',
    disciplineId: 'interdisciplinar',
    topicId: 'inter-3',
    topicName: 'Interdisciplinar • Persecução Penal e Justiça',
    statement: '38. Uma investigação policial reúne elementos sobre a ocorrência de um crime e sua possível autoria. Esses elementos poderão:',
    options: [
      { id: 'a', text: 'A) Auxiliar na persecução penal.' },
      { id: 'b', text: 'B) Produzir automaticamente uma condenação.' },
      { id: 'c', text: 'C) Substituir obrigatoriamente o processo judicial.' },
      { id: 'd', text: 'D) Impedir a defesa do investigado.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: As provas colhidas no inquérito instruem a acusação no oferecimento da denúncia e início da instrução judicial.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q39',
    disciplineId: 'interdisciplinar',
    topicId: 'inter-4',
    topicName: 'Interdisciplinar • Garantias Processuais e Ação',
    statement: '39. Quando uma pessoa busca o Poder Judiciário para solucionar uma controvérsia, está exercendo:',
    options: [
      { id: 'a', text: 'A) O direito de ação.' },
      { id: 'b', text: 'B) O poder de legislar.' },
      { id: 'c', text: 'C) O poder de polícia.' },
      { id: 'd', text: 'D) A função administrativa.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O direito de ação (art. 5º, XXXV da CF) assegura a inafastabilidade da tutela jurisdicional perante lesão ou ameaça a direito.',
    difficulty: 'fácil'
  },
  {
    id: 'sim-tjam-q40',
    disciplineId: 'interdisciplinar',
    topicId: 'inter-5',
    topicName: 'Interdisciplinar • Atribuições do Assistente Judiciário',
    statement: '40. Um Assistente Judiciário deve compreender que seu trabalho envolve, entre outros aspectos:',
    options: [
      { id: 'a', text: 'A) Atendimento adequado ao cidadão, respeito às normas e contribuição para o funcionamento da Justiça.' },
      { id: 'b', text: 'B) Criação de leis e aplicação de penas.' },
      { id: 'c', text: 'C) Julgamento independente de processos.' },
      { id: 'd', text: 'D) Substituição dos magistrados.' }
    ],
    correctOptionId: 'a',
    explanation: 'Gabarito A: O cargo de Assistente Judiciário no TJAM desempenha atividade de apoio fundamental ao andamento dos processos, cumprimento das leis e suporte ao jurisdicionado.',
    difficulty: 'fácil'
  }
];

export const OFFICIAL_SIMULADO_GERAL_TJAM: Simulado = {
  id: 'sim-tjam-geral-40',
  title: '📝 SIMULADO GERAL — TJAM (Assistente Judiciário)',
  description: 'Prova simulada oficial de 40 questões abrangendo todas as matérias do edital do TJAM: Português, Constitucional, Administrativo, Informática, Processo Civil, Processo Penal, LIBRAS e Interdisciplinar. Tempo total: 60 minutos.',
  durationMinutes: 60,
  totalQuestions: 40,
  disciplineBreakdown: {
    'lingua-portuguesa': 5,
    'direito-constitucional': 5,
    'direito-administrativo': 5,
    'informatica': 5,
    'processo-civil': 5,
    'processo-penal': 5,
    'acessibilidade-inclusao': 5,
    'interdisciplinar': 5
  },
  questions: SIMULADO_GERAL_TJAM_QUESTIONS,
  createdAt: '2026-08-09',
  status: 'active'
};
