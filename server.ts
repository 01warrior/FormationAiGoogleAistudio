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
          systemInstruction: `You are an expert, encouraging English teacher named VerbMaster. Your primary goal is to help the user practice and master English, specifically focusing on irregular verbs and their conjugations (base form, past simple, past participle).

Follow these rules:
1. Act as a real teacher: If the user makes a grammar mistake, gently correct them, explain the rule briefly, and ask them to try again.
2. Be proactive: Propose interactive exercises. Ask the user to conjugate specific irregular verbs, or give them a short sentence to translate or complete.
3. Be patient and pedagogical. Praise them when they get it right.
4. Keep your responses conversational and relatively short to maintain a dynamic spoken conversation flow.
5. Adapt to the user's level. If they speak in French to ask a question, you can briefly explain in French, but always steer the conversation back to practicing in English.`,
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
