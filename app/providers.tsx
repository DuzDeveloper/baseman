/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { WagmiProvider, useConnect } from "wagmi";
import { getConfig } from "@/lib/wagmi";
import { RootProvider } from "./rootProvider";

function AutoConnectWallet() {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const tryConnect = async () => {
      // Intentar con farcasterMiniApp primero
      const farcaster = connectors.find(c => c.id === 'farcasterMiniApp');
      if (farcaster) {
        try {
          await connect({ connector: farcaster });
          return;
        } catch {}
      }

      // Fallback: usar window.ethereum (Base App lo provee automáticamente)
      const injected = connectors.find(c => c.id === 'injected');
      if (injected && (window as any).ethereum) {
        try {
          await connect({ connector: injected });
        } catch {}
      }
    };

    // Pequeño delay para que el provider de la Base App esté listo
    const timeout = setTimeout(tryConnect, 500);
    return () => clearTimeout(timeout);
  }, [connect, connectors]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config as any} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RootProvider>
          <AutoConnectWallet />
          {children}
        </RootProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
