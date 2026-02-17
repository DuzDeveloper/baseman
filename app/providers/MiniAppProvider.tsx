'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import sdk from '@farcaster/miniapp-sdk';

interface MiniAppContextValue {
  context: any;
  isReady: boolean;
}

export const MiniAppContext = createContext<MiniAppContextValue | null>(null);

export function useMiniApp() {
  const context = useContext(MiniAppContext);
  if (!context) {
    throw new Error('useMiniApp must be used within MiniAppProvider');
  }
  return context;
}

export function MiniAppProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Notificamos a Base inmediatamente
        await sdk.actions.ready();
        setIsReady(true);

        // Intentamos obtener el contexto después
        const ctx = await sdk.context;
        if (ctx) setContext(ctx);
      } catch (error) {
        console.error("Error inicializando SDK:", error);
        setIsReady(true);
      }
    };
    init();
  }, []);

  return (
    <MiniAppContext.Provider value={{ context, isReady }}>
      {children}
    </MiniAppContext.Provider>
  );
}
