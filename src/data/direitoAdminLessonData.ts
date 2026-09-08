// Data for Direito Administrativo — Aula 1: Responsabilidade Civil do Estado

export interface FlashcardItem {
  q: string;
  a: string;
}

export interface McQuestionItem {
  id: number;
  enunciado: string;
  opcoes: string[];
  correta: number; // 0 = A, 1 = B, 2 = C, 3 = D
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

export const direitoAdminFlashcardsData: FlashcardItem[] = [
  {
    q: 'O que é Responsabilidade Civil do Estado?',
    a: 'É o dever que o Estado possui de reparar danos causados a terceiros por uma atuação ou omissão relacionada à atividade administrativa quando seus agentes atuam nessa qualidade.'
  },
  {
    q: 'Qual é a principal previsão constitucional sobre a responsabilidade civil do Estado?',
    a: 'Artigo 37, § 6º, da Constituição Federal de 1988: as pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa.'
  },
  {
    q: 'Qual a regra de responsabilidade civil para o Estado perante a vítima?',
    a: 'Responsabilidade OBJETIVA: independe da demonstração de culpa ou dolo do agente público para surgir o dever de indenizar.'
  },
  {
    q: 'Quais são os 3 elementos essenciais da responsabilidade objetiva do Estado? (Macete)',
    a: 'Macete: Estado = C + D + N\n• C: Conduta estatal\n• D: Dano efetivo\n• N: Nexo causal entre a conduta e o dano.'
  },
  {
    q: 'A vítima de um dano estatal precisa comprovar a culpa do servidor público?',
    a: 'NÃO. Na relação Vítima → Estado a responsabilidade é objetiva. A culpa do servidor não precisa ser provada pela vítima.'
  },
  {
    q: 'O que é o Direito de Regresso do Estado contra o agente público?',
    a: 'É a faculdade que o Estado possui de cobrar do agente causador do dano o valor que pagou à vítima na indenização, desde que fique comprovado que o agente agiu com DOLO ou CULPA.'
  },
  {
    q: 'Qual a diferença de responsabilidade entre Vítima → Estado e Estado → Agente?',
    a: '• Vítima → Estado: Responsabilidade OBJETIVA (não depende de culpa do agente).\n• Estado → Agente (ação regressiva): Responsabilidade SUBJETIVA (exige comprovação de dolo ou culpa).'
  },
  {
    q: 'Quais situações podem afastar ou romper o nexo causal na responsabilidade do Estado?',
    a: '1) Culpa exclusiva da vítima;\n2) Fato exclusivo de terceiro;\n3) Caso fortuito ou força maior (conforme a hipótese e ausência de causalidade com o Estado).'
  },
  {
    q: 'Quem é considerado Agente Público para fins de responsabilidade civil do Estado?',
    a: 'O conceito é amplo: servidores públicos efetivos, comissionados, empregados públicos celetistas, agentes políticos, temporários e colaboradores. O essencial é que estejam atuando no exercício da função pública ou a pretexto dela.'
  }
];

export const direitoAdminMcQuestionsData: McQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A responsabilidade civil do Estado, como regra, é:',
    opcoes: [
      'A) Subjetiva',
      'B) Objetiva',
      'C) Penal',
      'D) Contratual'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Conforme o Art. 37, § 6º da Constituição Federal, a regra geral adotada pelo ordenamento jurídico brasileiro para o Estado perante a vítima é a responsabilidade civil objetiva.'
  },
  {
    id: 2,
    enunciado: '2. Segundo o art. 37, §6º, da Constituição Federal, o Estado responde pelos danos causados por seus agentes:',
    opcoes: [
      'A) Somente quando houver dolo',
      'B) Somente quando houver culpa',
      'C) Nessa qualidade, a terceiros',
      'D) Apenas quando houver ordem judicial'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. O texto constitucional prevê expressamente que as pessoas jurídicas respondem pelos danos que seus agentes, "nessa qualidade, causarem a terceiros".'
  },
  {
    id: 3,
    enunciado: '3. Para caracterizar a responsabilidade objetiva do Estado, a vítima deve demonstrar:',
    opcoes: [
      'A) Culpa do servidor, exclusivamente',
      'B) Dolo do agente público',
      'C) Conduta, dano e nexo causal',
      'D) Apenas a existência do agente público'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. Para configurar o dever de indenizar do Estado, a vítima deve comprovar a conduta administrativa, o dano suportado e o nexo de causalidade entre ambos (Macete: C + D + N).'
  },
  {
    id: 4,
    enunciado: '4. Na responsabilidade objetiva do Estado, a vítima:',
    opcoes: [
      'A) Deve necessariamente provar a culpa do agente',
      'B) Não precisa provar a culpa do agente',
      'C) Deve provar o dolo do Estado',
      'D) Deve provar a intenção do servidor'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Sendo objetiva a responsabilidade estatal perante o terceiro prejudicado, a vítima fica dispensada de provar dolo ou culpa do servidor público.'
  },
  {
    id: 5,
    enunciado: '5. O nexo causal representa:',
    opcoes: [
      'A) A existência de um contrato',
      'B) A relação entre a conduta e o dano',
      'C) A culpa do servidor',
      'D) A punição administrativa'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O nexo de causalidade é o vínculo lógico-jurídico que demonstra que determinado dano foi causado direta ou indiretamente pela conduta do agente estatal.'
  },
  {
    id: 6,
    enunciado: '6. Um servidor público, durante o exercício de sua função, causa dano a um cidadão. Nesse caso, em regra:',
    opcoes: [
      'A) O Estado poderá responder objetivamente',
      'B) O Estado nunca responde',
      'C) Apenas o servidor pode responder',
      'D) Não existe possibilidade de indenização'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. Quando o servidor atua no exercício da função pública e causa prejuízo a particular, o Estado responde de forma objetiva perante a vítima.'
  },
  {
    id: 7,
    enunciado: '7. O direito de regresso permite que:',
    opcoes: [
      'A) O cidadão cobre diretamente qualquer servidor',
      'B) O Estado cobre do agente o que pagou, havendo dolo ou culpa',
      'C) O agente cobre do cidadão',
      'D) O Estado deixe de indenizar a vítima'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O direito de regresso faculta ao Poder Público reaver do agente causador do prejuízo o valor despendido a título de indenização, desde que comprovado dolo ou culpa deste.'
  },
  {
    id: 8,
    enunciado: '8. Para o direito de regresso contra o agente público, é necessário demonstrar:',
    opcoes: [
      'A) Dolo ou culpa',
      'B) Apenas dano',
      'C) Apenas nexo causal',
      'D) Responsabilidade penal'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. Na ação regressiva (Estado → agente público), a responsabilidade é subjetiva, exigindo a prova inequívoca de dolo ou culpa do servidor (CF, art. 37, § 6º in fine).'
  },
  {
    id: 9,
    enunciado: '9. A responsabilidade da vítima perante o Estado, para fins de indenização, é normalmente analisada mediante:',
    opcoes: [
      'A) Conduta, dano e nexo causal',
      'B) Apenas culpa',
      'C) Apenas dolo',
      'D) Apenas existência de prejuízo financeiro'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. A pretensão indenizatória da vítima é averiguada sob o prisma dos três pilares clássicos da responsabilidade objetiva: conduta da Administração, dano verificado e nexo causal.'
  },
  {
    id: 10,
    enunciado: '10. A culpa exclusiva da vítima pode:',
    opcoes: [
      'A) Aumentar automaticamente a indenização',
      'B) Afastar o nexo causal e a responsabilidade estatal',
      'C) Gerar responsabilidade penal do Estado',
      'D) Tornar a responsabilidade sempre subjetiva'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. A culpa exclusiva da vítima rompe totalmente o nexo causal entre a atividade estatal e o evento danoso, eximindo o Estado do dever de indenizar.'
  },
  {
    id: 11,
    enunciado: '11. O dispositivo constitucional mais importante sobre responsabilidade civil do Estado é:',
    opcoes: [
      'A) Art. 5º, I',
      'B) Art. 37, §6º',
      'C) Art. 84, I',
      'D) Art. 92'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O Art. 37, § 6º da Constituição da República Federativa do Brasil é o marco normativo fundamental da responsabilidade civil extracontratual do Estado.'
  },
  {
    id: 12,
    enunciado: '12. Na relação entre vítima e Estado, a responsabilidade objetiva significa que:',
    opcoes: [
      'A) A culpa do agente é indispensável',
      'B) A vítima deve provar dolo',
      'C) A culpa do agente não precisa ser comprovada',
      'D) O dano nunca precisa ser comprovado'
    ],
    correta: 2, // C
    explicacao: 'Gabarito Oficial: C. A responsabilidade objetiva caracteriza-se essencialmente pela desnecessidade de se verificar a existência de elemento subjetivo (culpa ou dolo) por parte do agente público.'
  },
  {
    id: 13,
    enunciado: '13. Se o Estado indeniza uma vítima e fica comprovado que o agente público agiu com culpa, o Estado:',
    opcoes: [
      'A) Não pode fazer nada',
      'B) Pode exercer direito de regresso',
      'C) Deve punir a vítima',
      'D) Deve cancelar a indenização'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Havendo culpa ou dolo do agente, o Estado tem o dever-poder de propor ação regressiva para obter o ressarcimento dos cofres públicos.'
  },
  {
    id: 14,
    enunciado: '14. Um agente público causa dano a terceiro enquanto atua fora de qualquer relação com sua função pública. Nesse caso, a responsabilidade estatal:',
    opcoes: [
      'A) É automaticamente reconhecida',
      'B) Deve ser analisada conforme a existência de vínculo entre a atuação e a função pública',
      'C) É sempre objetiva',
      'D) É sempre inexistente'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Para haver imputação da responsabilidade ao Estado, é indispensável examinar se havia vínculo, aparente ou efetivo, entre o ato do agente e o exercício de suas atribuições públicas ("nessa qualidade").'
  },
  {
    id: 15,
    enunciado: '15. São elementos básicos da responsabilidade objetiva estatal:',
    opcoes: [
      'A) Dolo, culpa e punição',
      'B) Conduta, dano e nexo causal',
      'C) Contrato, dolo e culpa',
      'D) Pena, dano e sentença'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Conduta, dano e nexo causal são os três elementos constitutivos da teoria do risco administrativo adotada no Brasil.'
  },
  {
    id: 16,
    enunciado: '16. Caso fortuito ou força maior pode, conforme o caso concreto:',
    opcoes: [
      'A) Afastar o nexo causal',
      'B) Criar automaticamente responsabilidade estatal',
      'C) Substituir o dano',
      'D) Tornar todo agente culpado'
    ],
    correta: 0, // A
    explicacao: 'Gabarito Oficial: A. O caso fortuito ou força maior que seja imprevisível e inevitável afasta o liame causal entre a conduta do Estado e o evento lesivo, excluindo o dever de indenizar.'
  },
  {
    id: 17,
    enunciado: '17. A responsabilidade objetiva do Estado significa que:',
    opcoes: [
      'A) O Estado responde em qualquer situação, mesmo sem dano',
      'B) O Estado responde independentemente da culpa, desde que presentes os requisitos da responsabilidade',
      'C) O agente nunca poderá responder',
      'D) A vítima não precisa provar nada'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O Estado responde sem que se perquira a culpa funcional, desde que demonstrados os requisitos objetivos da lesão (conduta, dano e nexo causal).'
  },
  {
    id: 18,
    enunciado: '18. Sobre o agente público, é correto afirmar:',
    opcoes: [
      'A) Nunca pode responder perante o Estado',
      'B) Pode responder regressivamente quando agir com dolo ou culpa',
      'C) Sempre responde objetivamente',
      'D) Responde somente criminalmente'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O agente público pode ser responsabilizado internamente pelo Estado em sede de ação de regresso, se e somente se comprovada a existência de dolo ou culpa.'
  },
  {
    id: 19,
    enunciado: '19. Se não houver relação de causalidade entre a atuação estatal e o dano:',
    opcoes: [
      'A) A responsabilidade objetiva será automaticamente configurada',
      'B) Pode não existir responsabilidade estatal pelo dano',
      'C) O Estado sempre deverá indenizar',
      'D) O agente será automaticamente culpado'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. O nexo de causalidade é pressuposto indeclinável. Sem relação de causa e efeito entre a conduta da Administração e a lesão, não há responsabilidade do Estado.'
  },
  {
    id: 20,
    enunciado: '20. Assinale a alternativa correta:',
    opcoes: [
      'A) Estado e agente público possuem sempre a mesma forma de responsabilidade',
      'B) O Estado responde objetivamente perante a vítima, enquanto o regresso contra o agente depende de dolo ou culpa',
      'C) O Estado só responde se houver dolo',
      'D) O agente público nunca pode ser responsabilizado'
    ],
    correta: 1, // B
    explicacao: 'Gabarito Oficial: B. Esta é a regra de ouro das bancas e da FGV: perante a vítima, a responsabilidade do Estado é objetiva; já na ação regressiva movida pelo Estado contra o servidor causador do dano, a responsabilidade é subjetiva (dolo ou culpa).'
  }
];

export const direitoAdminTfQuestionsData: TfQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. A responsabilidade civil do Estado perante o cidadão depende da prova de dolo ou culpa do servidor público envolvido.',
    correta: false,
    explicacao: 'Falso: A responsabilidade do Estado perante a vítima é OBJETIVA, dispensando a prova de dolo ou culpa.'
  },
  {
    id: 2,
    enunciado: '2. Para que surja o dever estatal de indenizar, a vítima precisa demonstrar conduta estatal, dano e nexo causal.',
    correta: true,
    explicacao: 'Verdadeiro: Macete C + D + N (Conduta, Dano e Nexo causal).'
  },
  {
    id: 3,
    enunciado: '3. O Estado pode ajuizar ação regressiva contra o agente público, exigindo a demonstração de dolo ou culpa.',
    correta: true,
    explicacao: 'Verdadeiro: Conforme art. 37, § 6º da CF/88, o direito de regresso depende de dolo ou culpa do servidor.'
  },
  {
    id: 4,
    enunciado: '4. A culpa exclusiva da vítima não tem o condão de afastar o nexo causal na responsabilidade objetiva do Estado.',
    correta: false,
    explicacao: 'Falso: A culpa exclusiva da vítima rompe o nexo causal e afasta a responsabilidade estatal.'
  }
];

export const direitoAdminDiscursiveQuestionsData: DiscursiveQuestionItem[] = [
  {
    id: 1,
    enunciado: '1. Explique a distinção entre a responsabilidade do Estado perante a vítima e a responsabilidade do agente público perante o Estado no direito de regresso.',
    respostaEsperada: 'Gabarito oficial: Perante a vítima, o Estado responde de forma OBJETIVA (CF/88, art. 37, § 6º), bastando a comprovação da conduta administrativa, do dano suportado e do nexo de causalidade (C + D + N), sem necessidade de perquirir culpa ou dolo. Por outro lado, na relação interna entre o Estado e o agente causador do dano (ação de regresso), a responsabilidade é SUBJETIVA, sendo indispensável a demonstração de que o servidor agiu com dolo ou culpa.'
  },
  {
    id: 2,
    enunciado: '2. Quais circunstâncias são admitidas pela doutrina e jurisprudência para afastar ou atenuar o nexo causal na responsabilidade civil do Estado?',
    respostaEsperada: 'Gabarito oficial: As hipóteses excludentes de responsabilidade estatal que rompem o nexo causal são: 1) Culpa exclusiva da vítima (quando o dano é causado inteiramente pela própria conduta do particular lesado); 2) Fato exclusivo de terceiro; e 3) Caso fortuito ou força maior (eventos naturais imprevisíveis e inevitáveis não relacionados à atuação estatal). Ressalte-se que a culpa concorrente da vítima não afasta a responsabilidade, mas apenas atenua/reduz proporcionalmente o valor da indenização.'
  }
];

export const direitoAdminSummaryPoints: string[] = [
  'Responsabilidade Civil do Estado = dever de reparar danos causados por agentes públicos nessa qualidade.',
  '⭐ Estado: responsabilidade objetiva (Art. 37, §6º da CF/88).',
  '⭐ Vítima: prova dano + conduta + nexo causal (Macete: C + D + N). Não precisa provar dolo ou culpa.',
  '⭐ Agente Público: responde perante o Estado em ação regressiva apenas se comprovado dolo ou culpa.',
  '⭐ Excludentes de responsabilidade: culpa exclusiva da vítima, fato exclusivo de terceiro, fortuito e força maior.',
  '⭐ Conceito de Agente: amplo (servidores, empregados, políticos e temporários) atuando na qualidade funcional.',
  '⭐ Artigo-chave obrigatório para o TJAM: CF/88, art. 37, §6º.'
];
