'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface MiniAppContextType {
  isReady: boolean;
}

const MiniAppContext = createContext<MiniAppContextType | undefined>(undefined);

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMiniApp = () => {
      if (typeof window !== 'undefined') {
        // Check if we're in a MiniApp context
        const _isMiniApp = Boolean(
          (window as Window & { MiniKit?: unknown }).MiniKit
        );
        setIsReady(true);
      }
    };

    checkMiniApp();
  }, []);

  return (
    <MiniAppContext.Provider value={{ isReady }}>
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniApp() {
  const context = useContext(MiniAppContext);
  if (context === undefined) {
    throw new Error('useMiniApp must be used within a MiniAppProvider');
  }
  return context;
}
