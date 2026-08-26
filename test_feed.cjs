const fetch = require('node-fetch') || function() { return import('node-fetch').then(m => m.default.apply(null, arguments)); };

async function run() {
  const response = await fetch("https://www.youtube.com/feeds/videos.xml?channel_id=UC8mWYDxedkJmUReAiA3ze9w");
  const xml = await response.text();
  const videos = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entryXml = match[1];
    const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entryXml.match(/<title>([^<]+)<\/title>/);
    
    if (videoIdMatch && titleMatch) {
      videos.push({
        id: videoIdMatch[1],
        title: titleMatch[1]
      });
    }
  }
  console.log(videos);
}
run();
