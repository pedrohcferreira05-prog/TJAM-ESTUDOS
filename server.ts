import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Shared Gemini AI Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Endpoint: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Endpoint 1: Generate Mind Map with Gemini AI
  app.post("/api/generate-mindmap", async (req, res) => {
    try {
      const { text, discipline, topic, level, customInstructions } = req.body;

      if (!text || text.trim() === "") {
        return res.status(400).json({ error: "O texto para geração do mapa mental é obrigatório." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "A chave da API Gemini não está configurada.",
        });
      }

      const levelDescription =
        level === "simplified"
          ? "Nível Básico / Simplificado (conceitos fundamentais, linguagem clara e direta, ideal para memorização rápida)."
          : level === "advanced"
          ? "Nível Avançado / Aprofundado (inclui jurisprudência, exceções legais, pegadinhas de prova e detalhes técnicos do TJAM)."
          : "Nível Padrão (equilíbrio entre teoria, conceitos chave e exemplos do concurso do TJAM).";

      const systemPrompt = `Você é um especialista em pedagogia, concursos públicos do TJAM e criação de mapas mentais estruturados.
Sua tarefa é transformar o conteúdo fornecido em um Mapa Mental completo, hierárquico e altamente memorável para o Concurso do Tribunal de Justiça do Amazonas.

Mapeamento Pedagógico:
- Estrutura hierárquica clara: Nó Raiz -> Ramificações Principais -> Subnós -> Detalhes / Exemplos.
- Identifique e marque palavras-chave e conceitos essenciais (isKeyConcept: true).
- Adicione notas curtas explicativas (note) e macetes de memorização para os nós importantes.
- Atribua cores visualmente distintas para cada ramo principal (ex: "#059669" para verde, "#2563eb" para azul, "#d97706" para âmbar, "#7c3aed" para roxo, "#e11d48" para rosa, "#0891b2" para ciano).
- Defina o nível do aluno: ${levelDescription}

Retorne estritamente um JSON no seguinte formato:
{
  "title": "Título resumido e impactante do Mapa Mental",
  "description": "Breve explicação do conteúdo do mapa mental",
  "rootNode": {
    "id": "root-1",
    "label": "Tópico Central",
    "color": "#1e293b",
    "isKeyConcept": true,
    "note": "Descrição do tema central",
    "children": [
      {
        "id": "branch-1",
        "label": "Ramificação Principal 1",
        "color": "#059669",
        "isKeyConcept": true,
        "note": "Resumo explicativo deste ramo",
        "children": [
          {
            "id": "node-1-1",
            "label": "Subconceito ou Regra",
            "color": "#059669",
            "isKeyConcept": false,
            "note": "Detalhe, macete de prova ou exceção",
            "children": []
          }
        ]
      }
    ]
  }
}`;

      const userPrompt = `Disciplina: ${discipline || "Geral"}
Assunto: ${topic || "Assunto Principal"}
Nível: ${level || "standard"}
Instruções adicionais: ${customInstructions || "Nenhuma"}

Conteúdo para transformar em Mapa Mental:
"""
${text}
"""`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        parsedData = JSON.parse(cleaned);
      }

      return res.json({ success: true, mindmap: parsedData });
    } catch (error: any) {
      console.error("Erro na geração do mapa mental via IA:", error);
      return res.status(500).json({
        error: "Falha ao gerar o mapa mental com IA: " + (error?.message || "Erro desconhecido"),
      });
    }
  });

  // API Endpoint 2: Explain Question with Gemini AI
  app.post("/api/explain-question", async (req, res) => {
    try {
      const { statement, options, selectedOptionId, correctOptionId, disciplineName, topicName } = req.body;

      if (!statement) {
        return res.status(400).json({ error: "O enunciado da questão é obrigatório." });
      }

      const systemPrompt = `Você é um professor de elite especializado na banca examinadora dos concursos do Tribunal de Justiça do Amazonas (TJAM).
Forneça uma explicação pedagógica, cirúrgica e bem estruturada para a questão de concurso.
Aponte o porquê da alternativa correta estar certa (com fundamentação legal/doutrinária/jurisprudencial), e explique sucintamente por que as outras alternativas estão incorretas.

Responda em formato JSON com os campos:
{
  "summary": "Resumo em 1-2 frases do conceito central cobrado na questão",
  "detailedExplanation": "Exposição completa da resolução",
  "legalBasis": "Citação do artigo de lei, regimento ou dispositivo constitucional correspondente",
  "memorizationTip": "Mnemônico ou macete rápido para não errar mais este tipo de questão"
}`;

      const userPrompt = `Disciplina: ${disciplineName}
Assunto: ${topicName}

Enunciado:
${statement}

Alternativas:
${JSON.stringify(options, null, 2)}

Alternativa Correta: ${correctOptionId}
Alternativa Marcada pelo Aluno: ${selectedOptionId || "Nenhuma"}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const responseText = response.text || "";
      const parsedData = JSON.parse(responseText.replace(/```json/g, "").replace(/```/g, "").trim());

      return res.json({ success: true, explanation: parsedData });
    } catch (error: any) {
      console.error("Erro ao gerar explicação de questão:", error);
      return res.status(500).json({
        error: "Erro ao gerar explicação da questão via IA: " + (error?.message || "Erro desconhecido"),
      });
    }
  });

  // API Endpoint 3: Generate Flashcards with Gemini AI
  app.post("/api/generate-flashcards", async (req, res) => {
    try {
      const { disciplineName, topicName, count = 5 } = req.body;

      const systemPrompt = `Você é um especialista em memorização e técnica de repetição espaçada para concursos públicos (TJAM).
Crie exatamente ${count} flashcards de alta qualidade no formato Pergunta e RespostaDireta para a disciplina e assunto informados.
Foque em regras de ouro, exceções legais, prazos, competências e pegadinhas recorrentes em concursos de tribunais.

Retorne em formato JSON:
{
  "flashcards": [
    {
      "front": "Pergunta objetiva ou conceito para completar",
      "back": "Resposta clara, direta com fundamentação ou macete",
      "difficulty": "fácil" | "médio" | "difícil"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Disciplina: ${disciplineName}\nAssunto: ${topicName}`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const responseText = response.text || "";
      const parsedData = JSON.parse(responseText.replace(/```json/g, "").replace(/```/g, "").trim());

      return res.json({ success: true, flashcards: parsedData.flashcards || [] });
    } catch (error: any) {
      console.error("Erro ao gerar flashcards:", error);
      return res.status(500).json({
        error: "Erro ao gerar flashcards via IA: " + (error?.message || "Erro desconhecido"),
      });
    }
  });

  // API Endpoint 4: Analyze Simulado & Performance Report
  app.post("/api/analyze-simulado", async (req, res) => {
    try {
      const { score, maxScore, percentage, timeSpentMinutes, wrongDisciplines } = req.body;

      const systemPrompt = `Você é um mentor especialista na preparação para o concurso do Tribunal de Justiça do Amazonas (TJAM).
Analise o desempenho do aluno no simulado e forneça um relatório diagnóstico motivador e estratégico.

Retorne em formato JSON:
{
  "overallVerdict": "Parecer geral do desempenho (ex: Excelente progresso, Necessita ajuste imediato em processo, etc)",
  "strengths": ["Ponto forte 1", "Ponto forte 2"],
  "weaknesses": ["Ponto fraco 1", "Ponto fraco 2"],
  "actionPlan": ["Recomendação prática 1", "Recomendação prática 2", "Recomendação prática 3"],
  "recommendedReviewInterval": "24 horas para o conteúdo X e 7 dias para Y"
}`;

      const userPrompt = `Nota: ${score} de ${maxScore} (${percentage}%)
Tempo gasto: ${timeSpentMinutes} minutos
Disciplinas com maior taxa de erro: ${wrongDisciplines?.join(", ") || "Nenhuma específica"}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const parsedData = JSON.parse((response.text || "").replace(/```json/g, "").replace(/```/g, "").trim());

      return res.json({ success: true, report: parsedData });
    } catch (error: any) {
      console.error("Erro ao analisar simulado:", error);
      return res.status(500).json({
        error: "Erro ao analisar simulado com IA: " + (error?.message || "Erro desconhecido"),
      });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server TJAM Estudos rodando na porta ${PORT}`);
  });
}

startServer();
