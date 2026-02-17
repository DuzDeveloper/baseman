/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { getConfig } from "@/lib/wagmi";
import { RootProvider } from "./rootProvider";
import sdk from "@farcaster/miniapp-sdk";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [config] = useState<any>(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Llamar ready() APENAS se monta el componente
    const signalReady = async () => {
      try {
        await sdk.actions.ready({});
        console.log("✅ SDK ready() called successfully");
      } catch (error) {
        console.log("⚠️ Not in mini app context (this is OK in browser):", error);
      } finally {
        setIsReady(true);
      }
    };

    signalReady();
  }, []);

  if (!isReady) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: 'linear-gradient(to bottom, #1e3a8a, #1e40af)'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RootProvider>
          {children}
        </RootProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
