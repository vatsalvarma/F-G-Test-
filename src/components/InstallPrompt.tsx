import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Extending Window event type for beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also check if already installed to not show it.
    window.addEventListener('appinstalled', () => {
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center p-6"
        >
          {/* Omni Logo/Background mimicking the user image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
             {/* Radial gradient to mimic the light ring in Omni image */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[180vw] rounded-full border-[80px] border-white/80 blur-md opacity-30 shadow-[0_0_100px_white]" />
          </div>
          
          <motion.div 
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring' as const, damping: 20 }}
            className="relative z-10 flex flex-col items-center max-w-sm w-full bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center"
          >
             <div className="flex items-center gap-4 mb-8">
               {/* Omni Gear Icon */}
               <svg viewBox="0 0 100 100" className="w-12 h-12 text-white">
                 <path fill="currentColor" d="M50 0L65 15L85 10L90 30L100 45L85 60L90 80L70 85L55 100L40 85L20 90L15 70L0 55L15 40L10 20L30 15L45 0Z" />
                 <circle cx="50" cy="50" r="25" fill="black" />
               </svg>
               <h1 className="text-4xl font-bold tracking-tight">Omni</h1>
             </div>
             
             <h2 className="text-2xl font-bold mb-4">Install Omni App</h2>
             <p className="text-gray-300 text-sm mb-8">
               Get the full, seamless experience. Add Omni to your home screen to use it fullscreen and offline.
             </p>

             <button 
               onClick={handleInstall}
               className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform mb-4"
             >
               Install App
             </button>
             
             <button 
               onClick={handleDismiss}
               className="w-full text-white/50 font-semibold py-2 hover:text-white transition-colors"
             >
               Not now
             </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
