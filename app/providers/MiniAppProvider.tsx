'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import sdk from '@farcaster/miniapp-sdk';

interface MiniAppContextType {
  isReady: boolean;
  isInMiniApp: boolean;
}

const MiniAppContext = createContext<MiniAppContextType | undefined>(undefined);

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        // Intenta inicializar el SDK - solo funciona dentro de un mini app
        const context = await sdk.context;

        if (!mounted) return;

        if (context) {
          // Estamos dentro de un mini app de Farcaster/Base
          setIsInMiniApp(true);
          // Señala que el mini app está listo para mostrar
          await sdk.actions.ready();
        }
      } catch {
        // No estamos en un mini app, esto es normal en browser normal
        console.log('Not in a mini app context');
      } finally {
        if (mounted) {
          setIsReady(true);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []); // Solo corre UNA VEZ

  return (
    <MiniAppContext.Provider value={{ isReady, isInMiniApp }}>
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
