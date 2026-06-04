import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Extending Window event type for beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6"
          style={{ background: '#0d0d0d' }}
        >
          {/* Soft white radial glow background */}
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            <div
              className="w-[70vw] h-[70vw] max-w-[420px] max-h-[420px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
          </div>

          {/* Concentric ring pulses */}
          {[180, 260, 360].map((w, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/10"
              style={{ width: w, height: w }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.18, 0.06] }}
              transition={{ duration: 2.5 + i * 0.6, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            />
          ))}

          {/* Card */}
          <motion.div
            initial={{ scale: 0.85, y: 50, opacity: 0 }}
            animate={{ scale: 1,    y: 0,  opacity: 1 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="relative z-10 flex flex-col items-center max-w-sm w-full rounded-3xl p-8 text-center text-white"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* App Logo */}
            <div className="flex flex-col items-center gap-3 mb-8">
              {/* Replace with your logo */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center justify-center"
              >
                <img 
                  src="/F-G-Test-/pwa-192x192.png" 
                  alt="FarmGear Logo" 
                  className="w-24 h-24 rounded-2xl shadow-2xl"
                />
              </motion.div>

              {/* Brand name */}
              <div className="flex flex-col items-center leading-none">
                <span
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    textShadow: '0 0 20px rgba(255,255,255,0.45)',
                  }}
                >
                  FarmGear
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.28em',
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Connect
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: '100%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                marginBottom: '1.5rem',
              }}
            />

            <h2 className="text-2xl font-bold mb-3">Add to Home Screen</h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              Get the full FarmGear Connect experience — fullscreen, offline-ready, and always at your fingertips.
            </p>

            {/* Install button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleInstall}
              className="w-full font-bold text-base py-4 rounded-2xl mb-3 transition-all"
              style={{
                background: '#ffffff',
                color: '#0d0d0d',
                boxShadow: '0 0 24px rgba(255,255,255,0.25)',
              }}
            >
              Install App
            </motion.button>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="w-full py-2 font-semibold text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              Not now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
