const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const insertPoint = "// Vite middleware for development";

const apiRoute = `
  app.get("/api/youtube", async (req, res) => {
    try {
      // English Fairy Tales channel ID
      const response = await fetch("https://www.youtube.com/feeds/videos.xml?channel_id=UC8mWYDxedkJmUReAiA3ze9w");
      if (!response.ok) throw new Error("Failed to fetch RSS");
      const xml = await response.text();
      
      const videos = [];
      const entryRegex = /<entry>([\\s\\S]*?)<\\/entry>/g;
      let match;
      while ((match = entryRegex.exec(xml)) !== null) {
        const entryXml = match[1];
        const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\\/yt:videoId>/);
        const titleMatch = entryXml.match(/<title>([^<]+)<\\/title>/);
        
        if (videoIdMatch && titleMatch) {
          videos.push({
            id: videoIdMatch[1],
            title: titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
          });
        }
      }
      
      res.json(videos);
    } catch (error) {
      console.error("YouTube RSS error:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  `;

code = code.replace(insertPoint, apiRoute + insertPoint);
fs.writeFileSync('server.ts', code);
console.log('patched server');
