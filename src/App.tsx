import React, { useState } from 'react';
import { Home } from './Home';
import { LearnTimeline } from './LearnTimeline';
import { VerbsList } from './VerbsList';
import { Flashcards } from './Flashcards';
import { Chat } from './Chat';
import { InstallPrompt } from './InstallPrompt';
import { useAppStore } from './store';

type Tab = 'home' | 'learn' | 'verbs' | 'chat' | 'flashcards';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { state } = useAppStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onStartLearning={() => setActiveTab('learn')} />;
      case 'learn': return <LearnTimeline />;
      case 'verbs': return <VerbsList />;
      case 'chat': return <Chat />;
      case 'flashcards': return <Flashcards />;
      default: return <Home onStartLearning={() => setActiveTab('learn')} />;
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* TopAppBar for all screens except where overriden (like LessonSession) */}
      <header className="w-full top-0 sticky bg-background border-b-4 border-surface-variant z-40 hidden md:flex lg:flex">
        <div className="flex justify-between items-center px-margin-mobile py-stack-md w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-gutter text-primary">
            <h1 className="font-display-verb text-headline-lg-mobile md:text-headline-lg text-primary">VerbMaster</h1>
          </div>
          <div className="flex items-center gap-3 font-label-bold text-label-bold text-on-surface">
            <div className="flex items-center gap-2 bg-surface-container rounded-full pl-3 pr-1 py-1 border-2 border-surface-variant shadow-sm">
              <span className="text-on-surface">{state.streak || 1}</span>
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary-container border-2 border-secondary-fixed-dim shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-surface-container rounded-full pl-3 pr-1 py-1 border-2 border-surface-variant shadow-sm">
              <span className="text-on-surface">{state.xp}</span>
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-tertiary-container border-2 border-tertiary shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>diamond</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Top App Bar */}
      <header className="w-full top-0 sticky z-40 bg-background border-b-4 border-surface-variant flex justify-between items-center px-margin-mobile py-stack-md md:hidden">
        <button className="text-on-surface-variant hover:opacity-80 active:translate-y-[2px] transition-transform">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="font-display-verb text-headline-lg-mobile text-primary">VerbMaster</h1>
        <div className="flex items-center gap-2 font-label-bold text-label-bold text-on-surface">
          <div className="flex items-center gap-2 bg-surface-container rounded-full pl-3 pr-1 py-1 border-2 border-surface-variant shadow-sm">
            <span className="text-on-surface">{state.streak || 1}</span>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary-container border-2 border-secondary-fixed-dim shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex md:flex-row">
        {/* Desktop SideNav */}
        <aside className="hidden md:flex flex-col w-64 border-r-4 border-surface-variant p-stack-md gap-stack-md h-[calc(100vh-72px)] sticky top-[72px]">
          <NavItem tab="home" icon="home" label="Home" activeTab={activeTab} onClick={setActiveTab} />
          <NavItem tab="flashcards" icon="style" label="Flashcards" activeTab={activeTab} onClick={setActiveTab} />
          <NavItem tab="learn" icon="school" label="Learn" activeTab={activeTab} onClick={setActiveTab} />
          <NavItem tab="verbs" icon="menu_book" label="Verbs" activeTab={activeTab} onClick={setActiveTab} />
          <NavItem tab="chat" icon="forum" label="Chat" activeTab={activeTab} onClick={setActiveTab} />
        </aside>

        {/* Main Content Area */}
        {renderContent()}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full z-40 rounded-t-xl bg-surface border-t-4 border-surface-variant flex justify-around items-center h-[80px] pb-safe px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <MobileNavItem tab="home" icon="home" label="Home" activeTab={activeTab} onClick={setActiveTab} />
        <MobileNavItem tab="flashcards" icon="style" label="Flashcards" activeTab={activeTab} onClick={setActiveTab} />
        <MobileNavItem tab="learn" icon="school" label="Learn" activeTab={activeTab} onClick={setActiveTab} />
        <MobileNavItem tab="verbs" icon="menu_book" label="Verbs" activeTab={activeTab} onClick={setActiveTab} />
        <MobileNavItem tab="chat" icon="forum" label="Chat" activeTab={activeTab} onClick={setActiveTab} />
      </nav>
      <InstallPrompt />
    </div>
  );
}

function NavItem({ tab, icon, label, activeTab, onClick }: { tab: Tab, icon: string, label: string, activeTab: Tab, onClick: (t: Tab) => void }) {
  const isActive = activeTab === tab;
  return (
    <button 
      onClick={() => onClick(tab)}
      className={`flex items-center gap-stack-md p-stack-sm rounded-xl transition-colors ${isActive ? 'bg-primary-container text-on-primary-container border-b-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
    >
      <span className="material-symbols-outlined" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{icon}</span>
      <span className="font-label-bold text-label-bold">{label}</span>
    </button>
  );
}

function MobileNavItem({ tab, icon, label, activeTab, onClick }: { tab: Tab, icon: string, label: string, activeTab: Tab, onClick: (t: Tab) => void }) {
  const isActive = activeTab === tab;
  return (
    <button 
      onClick={() => onClick(tab)}
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-100 w-1/5 ${isActive ? 'bg-primary-container text-on-primary-container border-b-4 border-primary active:translate-y-[2px]' : 'text-on-surface-variant hover:bg-surface-container-high active:translate-y-[2px]'}`}
    >
      <span className="material-symbols-outlined" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{icon}</span>
      <span className="font-label-bold text-[10px] mt-1">{label}</span>
    </button>
  );
}

