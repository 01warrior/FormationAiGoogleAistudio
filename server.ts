import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { WebSocketServer } from "ws";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/live' });
  
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });

  // WebSocket for Live API
  wss.on("connection", async (clientWs) => {
    let session: any;
    try {
      session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: `Tu es un professeur d'anglais expert, patient et encourageant appelé "VerbMaster". Ton but est d'accompagner l'utilisateur dans son apprentissage de l'anglais. 

Tes spécialités : 
1. Les verbes irréguliers (base verbale, prétérit, participe passé).
2. Le vocabulaire de tous les jours (voyage, business, adjectifs).

Règles à suivre impérativement :
- Comporte-toi comme un VRAI professeur. Si l'utilisateur fait une faute (de conjugaison, de grammaire ou de prononciation), corrige-le avec bienveillance, explique brièvement la règle et fais-le pratiquer.
- Sois proactif : ne te contente pas de répondre. Propose des petits exercices interactifs à l'oral (ex: "Peux-tu conjuguer le verbe 'to go' au passé ?", ou "Comment traduirais-tu 'Je suis allé à l'aéroport' ?").
- Félicite l'utilisateur quand il a bon.
- L'utilisateur est francophone. S'il te parle en français ou a du mal, tu peux lui répondre en français pour expliquer, mais essaie toujours de le ramener vers la pratique en anglais.
- Fais des réponses courtes et dynamiques pour garder un flux de conversation naturel et interactif.`,
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audio) {
              if (clientWs.readyState === clientWs.OPEN) {
                clientWs.send(JSON.stringify({ audio }));
              }
            }
            if (message.serverContent?.interrupted) {
              if (clientWs.readyState === clientWs.OPEN) {
                clientWs.send(JSON.stringify({ interrupted: true }));
              }
            }
          },
          onerror: (error: any) => {
            console.error("Live API Error:", error);
          },
          onclose: () => {
            console.log("Live API connection closed");
          }
        },
      });

      clientWs.on("message", (data) => {
        try {
          const { audio } = JSON.parse(data.toString());
          if (audio && session) {
            session.sendRealtimeInput([{
               audio: { data: audio, mimeType: "audio/pcm;rate=16000" }
            }]);
          }
        } catch(e) { console.error("Error sending input", e); }
      });
      
      clientWs.on("close", () => {
         console.log("Client closed connection");
      });
    } catch(err) {
      console.error("Failed to connect to Live API:", err);
      clientWs.close();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
