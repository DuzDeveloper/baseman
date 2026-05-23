/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { WagmiProvider, useConnect } from "wagmi";
import { getConfig } from "@/lib/wagmi";
import { RootProvider } from "./rootProvider";
import sdk from "@farcaster/miniapp-sdk";

function FarcasterAutoConnect() {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const farcasterConnector = connectors.find(c => c.id === 'farcasterMiniApp');
    if (farcasterConnector) {
      connect({ connector: farcasterConnector });
    }
  }, [connect, connectors]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // Llamar ready() primero, luego habilitar el auto-connect
    sdk.actions.ready({})
      .catch(() => {})
      .finally(() => setSdkReady(true));

    // Timeout de seguridad por si ready() no responde
    const timeout = setTimeout(() => setSdkReady(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <WagmiProvider config={config as any} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RootProvider>
          {sdkReady && <FarcasterAutoConnect />}
          {children}
        </RootProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
