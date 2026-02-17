/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { MiniAppProvider } from "./providers/MiniAppProvider";
import { getConfig } from "@/lib/wagmi";
import { RootProvider } from "./rootProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [config] = useState<any>(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MiniAppProvider>
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
