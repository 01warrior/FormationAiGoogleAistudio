import React, { useState, useRef, useEffect } from 'react';

type VideoItem = { id: string; title: string };

export function Videos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/youtube')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load videos:", err);
        setLoading(false);
      });
  }, []);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleVideoClick = (videoId: string) => {
    setActiveVideo(videoId);
    // Scroll smoothly to the player when a video is clicked
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handlePrev = () => {
    if (activeVideo) {
      const idx = videos.findIndex((v) => v.id === activeVideo);
      if (idx > 0) handleVideoClick(videos[idx - 1].id);
    } else if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'previousVideo' }), '*');
    }
  };

  const handleNext = () => {
    if (activeVideo) {
      const idx = videos.findIndex((v) => v.id === activeVideo);
      if (idx < videos.length - 1) handleVideoClick(videos[idx + 1].id);
    } else if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'nextVideo' }), '*');
    }
  };

  return (
    <div className="flex-grow flex flex-col max-w-6xl mx-auto w-full gap-stack-lg p-margin-mobile pb-[100px] animate-fade-in">
      <header className="flex flex-col gap-2">
        <h1 className="font-headline-lg-mobile md:text-headline-lg text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[32px] text-[#ff0000]">play_circle</span>
          English Fairy Tales
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Improve your listening skills by watching classic stories in English.
        </p>
      </header>

      {/* Featured Video Player */}
      <div ref={playerRef} className="w-full bg-surface-container-low border-2 border-surface-variant rounded-2xl overflow-hidden shadow-sm">
        <div className="relative w-full pb-[56.25%] bg-black">
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${activeVideo || 'videoseries?list=UU8mWYDxedkJmUReAiA3ze9w'}${activeVideo ? '?enablejsapi=1' : '&enablejsapi=1'}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-stack-md flex items-center justify-between bg-surface-container gap-4">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <div className="flex items-center gap-1 bg-surface-container-high rounded-full p-1 border border-surface-variant flex-shrink-0">
              <button 
                onClick={handlePrev}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest active:scale-95 transition-all text-on-surface"
                aria-label="Previous Video"
              >
                <span className="material-symbols-outlined text-[20px]">skip_previous</span>
              </button>
              <button 
                onClick={handleNext}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest active:scale-95 transition-all text-on-surface"
                aria-label="Next Video"
              >
                <span className="material-symbols-outlined text-[20px]">skip_next</span>
              </button>
            </div>
            <h2 className="font-label-bold text-on-surface line-clamp-1 text-sm md:text-base">
              {activeVideo ? "Now Playing" : "Latest Uploads Playlist"}
            </h2>
          </div>
          {activeVideo && (
            <button 
              onClick={() => setActiveVideo(null)}
              className="text-primary font-label-bold text-xs md:text-sm bg-primary-container px-3 py-2 rounded-full hover:brightness-105 transition-all flex-shrink-0"
            >
              Back to Playlist
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider pl-1">
          Recent Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          
        {loading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center p-8 text-on-surface-variant font-label-bold">
            Loading latest stories from YouTube...
          </div>
        ) : (
          videos.map((video) => (

            <button
              key={video.id}
              onClick={() => handleVideoClick(video.id)}
              className="flex flex-col gap-3 group text-left"
            >
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-surface-variant border-2 border-surface-variant group-hover:border-primary transition-colors">
                <img 
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} 
                  alt={video.title}
                  className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-[#ff0000] text-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  </div>
                </div>
              </div>
              <h4 className="font-label-bold text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                {video.title}
              </h4>
            </button>
          ))
        )}
        </div>
      </div>
    </div>
  );
}
