/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { getConfig } from "@/lib/wagmi";
import { RootProvider } from "./rootProvider";
import sdk from "@farcaster/miniapp-sdk";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const [isReady, setIsReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("Starting...");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebugInfo(prev => prev + " | TIMEOUT reached");
      setIsReady(true);
    }, 5000);

    const signalReady = async () => {
      try {
        setDebugInfo("Checking SDK context...");
        const context = await sdk.context;
        setDebugInfo("Context: " + JSON.stringify(context).slice(0, 100));
        await sdk.actions.ready({});
        setDebugInfo(prev => prev + " | ready() OK");
      } catch (error) {
        setDebugInfo(prev => prev + " | ERROR: " + String(error).slice(0, 100));
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
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: 'linear-gradient(to bottom, #1e3a8a, #1e40af)',
        padding: '20px',
      }}>
        <div style={{ color: 'white', fontSize: '18px', marginBottom: '20px' }}>Loading...</div>
        <div style={{ 
          color: '#93c5fd', 
          fontSize: '11px', 
          background: 'rgba(0,0,0,0.5)',
          padding: '10px',
          borderRadius: '8px',
          maxWidth: '300px',
          wordBreak: 'break-all',
          textAlign: 'left'
        }}>
          {debugInfo}
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config as any} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RootProvider>
          {children}
        </RootProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
