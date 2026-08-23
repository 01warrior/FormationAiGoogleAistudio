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
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true); // Assume true to avoid flash, update in useEffect
  const [showIosPrompt, setShowIosPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(standalone);

    if (standalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    if (isIosDevice) {
      // iOS doesn't support beforeinstallprompt, so we show a manual instruction after a small delay
      const hasDismissed = localStorage.getItem('dismissedInstallPrompt');
      if (!hasDismissed) {
        setTimeout(() => setShowIosPrompt(true), 2000);
      }
    } else {
      // For Android/Desktop: If beforeinstallprompt doesn't fire after a delay, show manual instruction
      const hasDismissed = localStorage.getItem('dismissedInstallPrompt');
      if (!hasDismissed) {
        const timeoutId = setTimeout(() => {
          if (!deferredPrompt && !showPrompt) {
            setShowIosPrompt(true); // Re-use the manual prompt UI for Android too
          }
        }, 3000);
        
        return () => clearTimeout(timeoutId);
      }
    }

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
      setIsStandalone(true);
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

  const handleDismissIos = () => {
    setShowIosPrompt(false);
    localStorage.setItem('dismissedInstallPrompt', 'true');
  };

  if (isStandalone) return null;

  if (showPrompt) {
    return (
      <div className="fixed bottom-24 md:bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 z-50 w-[92%] md:w-auto max-w-sm animate-slide-up">
        <div className="bg-surface-container-highest border-4 border-surface-variant rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container rounded-full blur-2xl -z-10 opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-background rounded-xl overflow-hidden flex items-center justify-center border-2 border-surface-variant flex-shrink-0">
              <img src="/icon-192.png" alt="Logo" className="w-full h-full object-cover" />
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

  if (showIosPrompt) {
    return (
      <div className="fixed bottom-24 md:bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 z-50 w-[92%] md:w-auto max-w-sm animate-slide-up">
        <div className="bg-surface-container-highest border-4 border-surface-variant rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container rounded-full blur-2xl -z-10 opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-background rounded-xl overflow-hidden flex items-center justify-center border-2 border-surface-variant flex-shrink-0">
              <img src="/icon-192.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-label-bold text-on-surface">Install VerbMaster</h4>
              <p className="font-body-md text-xs text-on-surface-variant leading-tight mt-1">
                {isIos ? (
                  <>To install, tap <span className="material-symbols-outlined text-[14px] align-middle px-1">ios_share</span> and select <strong>Add to Home Screen</strong>.</>
                ) : (
                  <>To install, open the browser menu and select <strong>Install App</strong> or <strong>Add to Home Screen</strong>.</>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button 
              onClick={handleDismissIos}
              className="bg-surface-variant text-on-surface-variant font-label-bold text-sm px-4 py-2 rounded-lg active:translate-y-[2px] transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
