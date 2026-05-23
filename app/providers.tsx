/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { WagmiProvider, useConnect } from "wagmi";
import { getConfig } from "@/lib/wagmi";
import { RootProvider } from "./rootProvider";
import sdk from "@farcaster/miniapp-sdk";

function AutoConnect() {
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 3000);

const signalReady = async () => {
  try {
    const context = await sdk.context;
    console.log("SDK context:", JSON.stringify(context));
    await sdk.actions.ready({});
  } catch (error) {
    console.log("⚠️ Error:", error);
  } finally {
    clearTimeout(timeout);
    setIsReady(true);
  }
};

    signalReady();
    return () => clearTimeout(timeout);
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
    <WagmiProvider config={config as any} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <AutoConnect />
        <RootProvider>
          {children}
        </RootProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
