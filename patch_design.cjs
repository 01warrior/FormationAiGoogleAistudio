const fs = require('fs');
let code = fs.readFileSync('src/Videos.tsx', 'utf8');

// 1. Update the main container of the video player for a 3D effect
const oldContainer = `className="w-full bg-surface-container-low border-2 border-surface-variant rounded-2xl overflow-hidden shadow-sm"`;
const newContainer = `className="w-full bg-surface rounded-3xl border-4 border-surface-variant border-b-[8px] overflow-hidden shadow-xl transition-transform"`;
code = code.replace(oldContainer, newContainer);

// 2. Update the bottom bar (where "Latest Uploads Playlist" is) to use the primary blue color
const oldBottomBar = `<div className="p-stack-md flex items-center justify-between bg-surface-container gap-4">`;
const newBottomBar = `<div className="p-stack-md flex items-center justify-between bg-primary text-on-primary gap-4">`;
code = code.replace(oldBottomBar, newBottomBar);

// 3. Update the controls container to contrast with the blue background
const oldControlsContainer = `<div className="flex items-center gap-1 bg-surface-container-high rounded-full p-1 border border-surface-variant flex-shrink-0">`;
const newControlsContainer = `<div className="flex items-center gap-1 bg-white/20 rounded-full p-1 border border-white/30 flex-shrink-0 shadow-inner">`;
code = code.replace(oldControlsContainer, newControlsContainer);

// 4. Update the buttons to look good on the blue background
const oldButtons = /className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest active:scale-95 transition-all text-on-surface"/g;
const newButtons = `className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/30 active:scale-95 transition-all text-on-primary"`;
code = code.replace(oldButtons, newButtons);

// 5. Update the text to be white/on-primary instead of text-on-surface
const oldTitle = `<h2 className="font-label-bold text-on-surface line-clamp-1 text-sm md:text-base">`;
const newTitle = `<h2 className="font-label-bold text-on-primary line-clamp-1 text-sm md:text-base">`;
code = code.replace(oldTitle, newTitle);

// 6. Update the "Back to Playlist" button to look nice on the blue background
const oldBackBtn = `className="text-primary font-label-bold text-xs md:text-sm bg-primary-container px-3 py-2 rounded-full hover:brightness-105 transition-all flex-shrink-0"`;
const newBackBtn = `className="text-primary font-label-bold text-xs md:text-sm bg-white px-4 py-2 rounded-full hover:bg-white/90 active:scale-95 transition-all flex-shrink-0 shadow-sm"`;
code = code.replace(oldBackBtn, newBackBtn);

fs.writeFileSync('src/Videos.tsx', code);
console.log('patched design');
