import React, { useState } from 'react';

const RECENT_VIDEOS = [
  { id: '1A26NJCQnrk', title: 'English Fairy Tales - Recent Story 1' },
  { id: 'n7AiqSAvZAk', title: 'English Fairy Tales - Recent Story 2' },
  { id: 'hH5-IWYertY', title: 'English Fairy Tales - Recent Story 3' },
  { id: 'gBgq6Niqs9s', title: 'English Fairy Tales - Recent Story 4' },
  { id: '2N8vYEQ2QA0', title: 'English Fairy Tales - Recent Story 5' },
  { id: 'v9nYJxjyjUk', title: 'English Fairy Tales - Recent Story 6' },
];

export function Videos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
      <div className="w-full bg-surface-container-low border-2 border-surface-variant rounded-2xl overflow-hidden shadow-sm">
        <div className="relative w-full pb-[56.25%] bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${activeVideo || 'videoseries?list=UU8mWYDxedkJmUReAiA3ze9w'}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-stack-md flex items-center justify-between bg-surface-container">
          <h2 className="font-label-bold text-on-surface">
            {activeVideo ? "Now Playing" : "Latest Uploads Playlist"}
          </h2>
          {activeVideo && (
            <button 
              onClick={() => setActiveVideo(null)}
              className="text-primary font-label-bold text-sm bg-primary-container px-3 py-1 rounded-full hover:brightness-105 transition-all"
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
          {RECENT_VIDEOS.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video.id)}
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
                Watch story
              </h4>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
