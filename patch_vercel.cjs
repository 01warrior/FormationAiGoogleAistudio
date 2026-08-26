const fs = require('fs');
let code = fs.readFileSync('src/Videos.tsx', 'utf8');

const oldFetch = `    fetch('/api/youtube')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVideos(data);
        setLoading(false);
      })`;

const newFetch = `    const rssUrl = encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UC8mWYDxedkJmUReAiA3ze9w');
    fetch(\`https://api.rss2json.com/v1/api.json?rss_url=\${rssUrl}\`)
      .then(res => res.json())
      .then(data => {
        if (data && data.items) {
          const formattedVideos = data.items.map((item: any) => {
            const id = item.guid.replace('yt:video:', '');
            return { id, title: item.title };
          });
          setVideos(formattedVideos);
        }
        setLoading(false);
      })`;

code = code.replace(oldFetch, newFetch);
fs.writeFileSync('src/Videos.tsx', code);
console.log('patched for vercel');
