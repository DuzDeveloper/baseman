"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { MiniAppProvider } from "./providers/MiniAppProvider";
import { getConfig } from "@/lib/wagmi";
import { RootProvider } from "./rootProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [config] = useState(() => getConfig() as any);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MiniAppProvider>
      {/* @ts-expect-error - wagmi connector type mismatch between miniapp-wagmi-connector and wagmi versions */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RootProvider>
            {children}
          </RootProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MiniAppProvider>
  );
}
