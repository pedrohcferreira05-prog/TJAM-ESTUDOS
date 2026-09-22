// Data for Redação — Aula 01: Estrutura da Redação (Nível Intermediário — TJAM Assistente Judiciário)

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
  explicacao: string;
}

export interface TfQuestionItem {
  id: number;
  enunciado: string;
  correta: boolean;
  explicacao: string;
}

export interface DiscursiveQuestionItem {
  id: number;
  enunciado: string;
  respostaEsperada: string;
}

export const redacaoFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que é uma Redação dissertativo-argumentativa no concurso do TJAM?',
    a: 'É a organização lógica de ideias por meio da linguagem escrita formal para defender um ponto de vista (tese) de maneira clara, coerente, coesa e fundamentada.'
  },
  {
    q: 'Qual é a estrutura tripartite básica de uma redação dissertativa?',
    a: '1) INTRODUÇÃO (apresentar tema e tese);\n2) DESENVOLVIMENTO (explicar e fundamentar argumentos);\n3) CONCLUSÃO (retomar a discussão e apresentar o fechamento).'
  },
  {
    q: 'Quais são os 3 elementos fundamentais de uma boa Introdução?',
    a: '1) Contextualização do assunto;\n2) Apresentação do tema;\n3) Direcionamento da discussão (tese e encaminhamento dos argumentos).'
  },
  {
    q: 'Qual é a estrutura interna recomendada para um parágrafo de Desenvolvimento?',
    a: 'Tópico frasal (ideia central) → Explicação / Fundamentação → Exemplo ou Consequência → Fechamento do parágrafo.'
  },
  {
    q: 'Qual a diferença crucial entre ASSUNTO e TEMA?',
    a: '• ASSUNTO: é amplo e genérico (ex: "Tecnologia").\n• TEMA: é o recorte específico delimitado pela banca (ex: "Os impactos da tecnologia na prestação de serviços públicos").'
  },
  {
    q: 'O que caracteriza a FUGA AO TEMA e como evitá-la?',
    a: 'Fuga ao tema ocorre quando o candidato escreve sobre um assunto diferente do proposto. Evita-se perguntando antes de escrever: "O que exatamente a banca está exigindo que eu discuta?"'
  },
  {
    q: 'Qual é a diferença entre COESÃO e COERÊNCIA?',
    a: '• COESÃO: é a ligação gramatical/linguística entre palavras, frases e parágrafos (conectivos, pronomes, elipses).\n• COERÊNCIA: é a lógica interna e harmonia de sentido global do texto (ausência de contradições).'
  },
  {
    q: 'Quais conectivos expressam relação de ADIÇÃO e de OPOSIÇÃO?',
    a: '• Adição: além disso, também, bem como, ainda.\n• Oposição / Contraste: entretanto, porém, contudo, todavia, no entanto, embora.'
  },
  {
    q: 'Quais conectivos expressam relação de CONCLUSÃO e de CAUSA?',
    a: '• Conclusão: portanto, assim, desse modo, consequentemente, por fim.\n• Causa: porque, pois, uma vez que, visto que, em virtude de.'
  },
  {
    q: 'Quais são as 5 etapas do planejamento antes de escrever o rascunho?',
    a: '1) Ler e delimitar o tema;\n2) Definir a tese (ideia central);\n3) Selecionar 2 a 3 argumentos sólidos;\n4) Organizar a estrutura (Intro, D1, D2, Concl);\n5) Revisar ortografia, coesão e coerência.'
  }
];

export const redacaoSummaryPoints: string[] = [
  'Conceito Central: Redação é a organização lógica de ideias pela linguagem escrita para transmitir mensagem clara, coerente e fundamentada.',
  'Estrutura Tripartite: Introdução (apresentar), Desenvolvimento (desenvolver/sustentar) e Conclusão (encerrar/sintetizar).',
  'Introdução Eficaz: Deve conter contextualização, apresentação explícita do tema e direcionamento argumentativo (tese).',
  'Desenvolvimento Sólido: Segue a sequência "Ideia central → Explicação → Consequência/Exemplo", justificando o porquê de cada afirmação.',
  'Tipos de Argumentos: Podem ser desenvolvidos por Causa e Efeito, Exemplificação concreta, Comparação e Relação Lógica.',
  'Coerência x Coesão: Coerência é o sentido lógico sem contradições; Coesão é a amarração gramatical com conectivos adequados.',
  'Assunto x Tema: Assunto é amplo (Tecnologia); Tema é o recorte específico (Impactos da tecnologia no serviço público).',
  'Fuga ao Tema: Falar de assunto paralelo ou genérico zera ou penaliza gravemente a prova dissertativa.',
  'Linguagem Culta Forense: Clareza, precisão, vocabulário formal, sem gírias, sem abreviações e sem prolixidade.',
  'Projeto de Texto: Planejar tese e argumentos antes de escrever economiza tempo e garante nota máxima na estrutura.'
];

export const redacaoMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: 'Em uma redação dissertativo-argumentativa, a principal função da introdução é:',
    opcoes: [
      'A) apresentar todos os argumentos detalhadamente.',
      'B) desenvolver exemplos e informações secundárias.',
      'C) apresentar o tema e estabelecer uma direção argumentativa.',
      'D) apresentar exclusivamente a conclusão.',
      'E) inserir informações sem relação direta com o tema.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. A introdução tem como papel primordial situar o leitor no tema proposto e definir a tese ou direcionamento argumentativo que norteará todo o texto. Os detalhes e exemplos pertencem ao desenvolvimento.'
  },
  {
    id: 2,
    enunciado: 'Considere:\n“A digitalização dos serviços públicos ampliou o acesso da população a diversos procedimentos. Entretanto, a desigualdade no acesso à tecnologia ainda representa um obstáculo à efetiva inclusão digital.”\n\nNesse trecho, a segunda frase contribui para a construção da:',
    opcoes: [
      'A) conclusão.',
      'B) tese ou direção argumentativa.',
      'C) citação de autoridade.',
      'D) exemplificação.',
      'E) narração.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B. A segunda frase delimita o posicionamento crítico do autor diante do tema (a persistência da desigualdade como obstáculo), constituindo a tese que será desdobrada nos parágrafos seguintes.'
  },
  {
    id: 3,
    enunciado: 'Em um parágrafo de desenvolvimento, espera-se principalmente que o candidato:',
    opcoes: [
      'A) apresente apenas o tema novamente.',
      'B) introduza um assunto completamente diferente.',
      'C) desenvolva e sustente um argumento relacionado à tese.',
      'D) apresente somente uma frase conclusiva.',
      'E) repita literalmente a introdução.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. O desenvolvimento é o espaço destinado a fundamentar, explicar e exemplificar o argumento que valida a tese apresentada na introdução.'
  },
  {
    id: 4,
    enunciado: 'Assinale a alternativa que apresenta uma relação adequada entre tese e desenvolvimento:',
    opcoes: [
      'A) A tese apresenta uma ideia e o desenvolvimento abandona essa ideia.',
      'B) A tese apresenta o assunto, enquanto o desenvolvimento deve aprofundar argumentos relacionados a ela.',
      'C) O desenvolvimento deve apresentar informações sem relação com a tese.',
      'D) A tese deve aparecer apenas na conclusão.',
      'E) O desenvolvimento deve evitar qualquer posicionamento.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B. Há uma estrita subordinação lógica: a tese delimita o posicionamento, e o desenvolvimento traz os argumentos específicos que a sustentam.'
  },
  {
    id: 5,
    enunciado: 'Observe:\n“A tecnologia facilita o acesso aos serviços públicos. Além disso, permite maior agilidade na comunicação entre instituições e cidadãos.”\n\nA expressão destacada estabelece relação de:',
    opcoes: [
      'A) oposição.',
      'B) conclusão.',
      'C) adição.',
      'D) causa.',
      'E) condição.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. A locução conjuntiva "Além disso" é conectivo coesivo aditivo, somando um novo argumento favorável à facilitação do acesso.'
  },
  {
    id: 6,
    enunciado: 'Uma redação apresenta a seguinte estrutura:\n\n• Introdução: apresenta dois problemas relacionados ao atendimento público.\n• Desenvolvimento 1: discute o primeiro problema.\n• Desenvolvimento 2: discute o segundo problema.\n• Conclusão: retoma os pontos discutidos e apresenta um fechamento.\n\nEssa organização demonstra:',
    opcoes: [
      'A) falta de progressão textual.',
      'B) fuga ao tema.',
      'C) organização e progressão argumentativa.',
      'D) ausência de tese.',
      'E) contradição obrigatória.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. Esse padrão de organização em tópicos paralelos (problema 1 no D1, problema 2 no D2) demonstra excelente projeto de texto, simetria e progressão argumentativa impecável.'
  },
  {
    id: 7,
    enunciado: 'Assinale a alternativa que apresenta um problema de coerência:',
    opcoes: [
      'A) O texto utiliza diferentes conectivos.',
      'B) O texto apresenta argumentos relacionados ao tema.',
      'C) O texto apresenta uma conclusão incompatível com os argumentos desenvolvidos.',
      'D) O texto possui quatro parágrafos.',
      'E) O texto utiliza períodos curtos.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. A incoerência reside na fratura lógica interna: concluir algo contraditório ou incompatível com tudo o que foi defendido no corpo do texto destrói o sentido global.'
  },
  {
    id: 8,
    enunciado: 'Leia:\n“A melhoria do atendimento público depende da capacitação dos servidores e da modernização dos sistemas. Portanto, investir nessas duas áreas pode contribuir para tornar o serviço mais eficiente.”\n\nA conclusão apresenta:',
    opcoes: [
      'A) uma ideia sem relação com o texto.',
      'B) uma retomada lógica da argumentação.',
      'C) uma fuga ao tema.',
      'D) um novo argumento sem relação com a tese.',
      'E) uma contradição.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B. O conectivo "Portanto" sintetiza de forma lógica os dois pilares anteriormente citados (capacitação e modernização), operando como perfeita retomada conclusiva.'
  },
  {
    id: 9,
    enunciado: 'Sobre o desenvolvimento de uma redação, assinale a alternativa correta:',
    opcoes: [
      'A) Deve apenas repetir a tese apresentada na introdução.',
      'B) Deve evitar explicações para não tornar o texto longo.',
      'C) Deve apresentar argumentos, explicações, exemplos ou relações que sustentem a ideia defendida.',
      'D) Deve obrigatoriamente conter uma citação famosa.',
      'E) Deve apresentar somente dados estatísticos.'
    ],
    correta: 2, // C
    explicacao: 'Gabarito C. O desenvolvimento cumpre seu papel quando explica o "porquê", trazendo dados, exemplos ou relações causais que dão lastro e autoridade ao posicionamento do autor.'
  },
  {
    id: 10,
    enunciado: 'Um candidato recebeu o tema:\n“A importância da eficiência no serviço público.”\n\nQual proposta apresenta maior adequação ao tema?',
    opcoes: [
      'A) Escrever exclusivamente sobre a história do Brasil.',
      'B) Discutir a eficiência administrativa e seus efeitos na qualidade do atendimento ao cidadão.',
      'C) Descrever sua rotina pessoal de estudos.',
      'D) Falar exclusivamente sobre tecnologia sem relacioná-la ao serviço público.',
      'E) Narrar uma viagem realizada pelo Amazonas.'
    ],
    correta: 1, // B
    explicacao: 'Gabarito B. Apenas a alternativa B aborda o núcleo temático solicitado (eficiência no serviço público e atendimento ao cidadão), sem tangenciamento ou fuga para relatos pessoais e históricos genéricos.'
  }
];

export const redacaoTfQuestionsData: TfQuestionItem[] = [
  {
    id: 11,
    enunciado: 'A introdução deve apresentar o tema e pode indicar a tese ou a direção argumentativa que será desenvolvida posteriormente.',
    correta: true,
    explicacao: 'CERTO. É exatamente esta a função clássica do primeiro parágrafo: situar o leitor no tema e adiantar a tese que será defendida.'
  },
  {
    id: 12,
    enunciado: 'Para manter a coerência, os argumentos apresentados no desenvolvimento devem estar relacionados à tese e ao tema proposto.',
    correta: true,
    explicacao: 'CERTO. O princípio da coerência exige unidade temática e alinhamento recíproco entre os argumentos e a tese defendida.'
  },
  {
    id: 13,
    enunciado: 'Uma redação apresenta boa coesão sempre que utiliza grande quantidade de conectivos, independentemente da relação lógica entre as ideias.',
    correta: false,
    explicacao: 'ERRADO. O uso excessivo ou desconexo de conectivos gera hipercoesão artificial e contradição. Os conectivos devem ser precisos e expressar relações semânticas verdadeiras entre as orações.'
  },
  {
    id: 14,
    enunciado: 'A conclusão deve estabelecer um fechamento coerente com aquilo que foi efetivamente desenvolvido no texto.',
    correta: true,
    explicacao: 'CERTO. O fechamento precisa dialogar harmonicamente com os argumentos do desenvolvimento, consolidando a tese inicial sem introduzir discussões novas e não preparadas.'
  },
  {
    id: 15,
    enunciado: 'Se a redação possui introdução, desenvolvimento e conclusão, ela necessariamente apresenta coerência e argumentação adequada.',
    correta: false,
    explicacao: 'ERRADO. Ter três partes é apenas uma exigência formal mínima de layout. O texto pode ter três blocos e, ainda assim, apresentar ideias contraditórias, argumentos frágeis ou fuga ao tema.'
  }
];

export const redacaoDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 16,
    enunciado: 'Explique a diferença entre tema, tese e argumento em uma redação dissertativo-argumentativa.',
    respostaEsperada: 'Espelho Oficial TJAM:\n• Tema: É o recorte temático específico proposto pela banca examinadora (o assunto delimitado sobre o qual se deve escrever).\n• Tese: É o ponto de vista, tese ou posicionamento explícito adotado pelo candidato diante desse tema.\n• Argumento: É a justificativa racional, fundamentação ou prova concreta (dados, causas, exemplos) utilizada para sustentar e validar a tese.'
  },
  {
    id: 17,
    enunciado: 'Por que é importante que os argumentos apresentados no desenvolvimento estejam relacionados à tese estabelecida na introdução?',
    respostaEsperada: 'Espelho Oficial TJAM:\nPorque o desenvolvimento possui o papel de comprovar a tese. Se os argumentos forem desconectados ou abordarem direções distintas, haverá ruptura da progressão temática, quebra de coerência textual e perda expressiva de pontos nos critérios de estrutura e projeto de texto da banca.'
  },
  {
    id: 18,
    enunciado: 'Explique, com suas palavras, a diferença entre coesão e coerência.',
    respostaEsperada: 'Espelho Oficial TJAM:\n• Coesão: Diz respeito à superfície linguística do texto, isto é, às conexões gramaticais entre frases e parágrafos por meio de conectivos, pronomes e pontuação adequada.\n• Coerência: Refere-se à estrutura de sentido profundo e lógico do texto, garantindo que as ideias não se contradigam e formem uma mensagem harmoniosa e inteligível como um todo.'
  },
  {
    id: 19,
    enunciado: 'Leia o trecho:\n“A tecnologia pode melhorar os serviços públicos. Entretanto, os servidores precisam receber capacitação adequada. Portanto, o acesso à tecnologia é importante para a eficiência administrativa.”\nExplique como as ideias do trecho estão relacionadas e identifique a função dos conectivos utilizados.',
    respostaEsperada: 'Espelho Oficial TJAM:\nO trecho apresenta uma progressão argumentativa em 3 passos:\n1) Afirmação de um benefício geral da tecnologia.\n2) O conectivo adversativo "Entretanto" introduz uma ressalva/condição essencial (a necessidade de treinamento funcional).\n3) O conectivo conclusivo "Portanto" amarra a dedução lógica final de que a tecnologia, aliada à capacitação, gera a almejada eficiência administrativa.'
  },
  {
    id: 20,
    enunciado: 'Imagine que o tema da redação seja: “Os desafios para melhorar o atendimento ao cidadão nos serviços públicos.”\nElabore:\n1) Uma introdução de 3 a 5 linhas;\n2) Uma tese claramente identificável;\n3) Dois possíveis argumentos para desenvolver nos parágrafos seguintes.',
    respostaEsperada: 'Espelho Oficial TJAM (Modelo de Resposta):\n1) Introdução sugerida: "A excelência no atendimento aos jurisdicionados constitui um dos principais deveres da Administração Pública moderna. No entanto, a sobrecarga de demandas e o déficit de capacitação contínua ainda limitam a celeridade e a humanização desse serviço. Diante disso, superar tais entraves é imperativo para assegurar a dignidade do cidadão e a eficácia institucional."\n2) Tese: A qualidade do atendimento depende da superação do déficit de capacitação dos servidores e da modernização dos fluxos de trabalho.\n3) Argumento 1: A necessidade de treinamento contínuo em comunicação empática e ferramentas digitais.\n4) Argumento 2: A desburocratização dos processos internos para diminuir o tempo de espera do cidadão.'
  }
];

export const redacaoPracticalTask = {
  theme: 'A importância da qualidade no atendimento ao cidadão no serviço público.',
  description: 'O aluno deverá montar um pequeno projeto de redação em 5 passos para demonstrar planejamento e estrutura lógica antes de produzir o texto final.',
  points: [
    { number: 1, label: 'Tema', prompt: 'Qual é o assunto e recorte exato?' },
    { number: 2, label: 'Tese', prompt: 'Qual ideia central você pretende defender?' },
    { number: 3, label: 'Argumento 1', prompt: 'Qual será o primeiro ponto desenvolvido (D1)?' },
    { number: 4, label: 'Argumento 2', prompt: 'Qual será o segundo ponto desenvolvido (D2)?' },
    { number: 5, label: 'Introdução', prompt: 'Escreva uma introdução de 4 a 6 linhas, apresentando o tema e sua tese.' }
  ]
};
