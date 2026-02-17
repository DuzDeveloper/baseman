
import { http, createConfig } from 'wagmi';
import { baseSepolia, base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '84532');

// Determinar qué chain usar basado en CHAIN_ID
export const chain = chainId === 8453 ? base : baseSepolia;

// Configurar wagmi con soporte para ambas chains
export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    coinbaseWallet({
      appName: process.env.NEXT_PUBLIC_PROJECT_NAME || 'NFT Mint Mini App',
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});