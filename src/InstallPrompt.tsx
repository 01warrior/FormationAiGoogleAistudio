import React, { useState, useEffect } from 'react';

// Extend Window interface for the custom event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show our custom UI
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If app is already installed, this won't fire.
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 z-50 w-[92%] md:w-auto max-w-sm animate-slide-up">
      <div className="bg-surface-container-highest border-4 border-surface-variant rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container rounded-full blur-2xl -z-10 opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-background rounded-xl overflow-hidden flex items-center justify-center border-2 border-surface-variant flex-shrink-0">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-label-bold text-on-surface">Install VerbMaster</h4>
            <p className="font-body-md text-xs text-on-surface-variant leading-tight mt-1">Get the app for a better, offline experience.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button 
            onClick={handleInstallClick}
            className="bg-primary text-on-primary font-label-bold text-sm px-4 py-2 rounded-lg border-b-4 border-primary-fixed-dim active:border-b-0 active:translate-y-[4px] transition-all"
          >
            Install
          </button>
          <button 
            onClick={() => setShowPrompt(false)}
            className="text-on-surface-variant font-label-bold text-xs uppercase text-center hover:text-on-surface transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
