import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
import { Attribution } from 'ox/erc8021';

const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ['bc_xvivltyi'], // ej: 'bc_b7k3p9da'
});

export function getConfig() {
  return createConfig({
    chains: [base],
    connectors: [
      farcasterMiniApp(),
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
    dataSuffix: DATA_SUFFIX, 
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
