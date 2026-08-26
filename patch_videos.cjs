const fs = require('fs');
let code = fs.readFileSync('src/Videos.tsx', 'utf8');

// Replace static RECENT_VIDEOS and import
code = code.replace(/import React, \{ useState, useRef \} from 'react';[\s\S]*?\];/g, `import React, { useState, useRef, useEffect } from 'react';\n\ntype VideoItem = { id: string; title: string };`);

// Add state and fetch logic
code = code.replace(`export function Videos() {`, `export function Videos() {\n  const [videos, setVideos] = useState<VideoItem[]>([]);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    fetch('/api/youtube')\n      .then(res => res.json())\n      .then(data => {\n        if (Array.isArray(data)) setVideos(data);\n        setLoading(false);\n      })\n      .catch(err => {\n        console.error("Failed to load videos:", err);\n        setLoading(false);\n      });\n  }, []);\n`);

// Replace RECENT_VIDEOS references inside component
code = code.replace(/RECENT_VIDEOS/g, 'videos');

// Replace "Watch story" placeholder with the actual dynamically fetched title
code = code.replace(/<h4 className="font-label-bold text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">\s*Watch story\s*<\/h4>/g, `<h4 className="font-label-bold text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">\n                {video.title}\n              </h4>`);

fs.writeFileSync('src/Videos.tsx', code);
console.log('patched videos');
