'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import sdk from '@farcaster/miniapp-sdk';

interface MiniAppContextType {
  isReady: boolean;
}

const MiniAppContext = createContext<MiniAppContextType>({ isReady: false });

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Llamar ready() inmediatamente — sin esperar context
    // Esto detiene el loop de setImmediate y marca la app como Ready
    sdk.actions.ready().finally(() => {
      setIsReady(true);
    });
  }, []);

  return (
    <MiniAppContext.Provider value={{ isReady }}>
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniApp() {
  return useContext(MiniAppContext);
}
