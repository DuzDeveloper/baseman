import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected } from 'wagmi/connectors';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

const DATA_SUFFIX = '0x0762617365617070010b62635f787669766c7479698021802180218021802180218021802180218021' as `0x${string}`;

export function getConfig() {
  return createConfig({
    chains: [base],
    connectors: [
      farcasterMiniApp(),
      injected(), // Para Base App que provee window.ethereum
      coinbaseWallet({
        appName: process.env.NEXT_PUBLIC_PROJECT_NAME || 'Baseman',
        preference: 'smartWalletOnly',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    multiInjectedProviderDiscovery: false,
    transports: {
      [base.id]: http(),
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
