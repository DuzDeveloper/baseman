import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
// Builder Code suffix calculado manualmente (ERC-8021)
// Formato: 0x + "baseapp" en hex + código en hex + 8021 repetido 8 veces
function toDataSuffix(builderCode: string): `0x${string}` {
  const prefix = '07626173656170700'; // "baseapp" en hex con longitud
  const codeHex = Buffer.from(builderCode, 'utf8').toString('hex');
  const suffix = '8021'.repeat(8);
  return `0x${prefix}0${codeHex}${suffix}` as `0x${string}`;
}
const DATA_SUFFIX = toDataSuffix('bc_xvivltyi'); // Tu Builder Code
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
