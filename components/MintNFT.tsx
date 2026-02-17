'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { FREE_NFT_ABI } from '@/lib/contract-abi';
import { 
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Avatar,
  Name,
  Address,
} from '@coinbase/onchainkit/identity';

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

export function MintNFT() {
  const { address, isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  // Leer si el usuario ya minteó
  const { data: hasMinted } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: FREE_NFT_ABI,
    functionName: 'hasMinted',
    args: address ? [address] : undefined,
  });

  // Leer total supply
  const { data: totalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: FREE_NFT_ABI,
    functionName: 'totalSupply',
  });

  // Leer max supply
  const { data: maxSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: FREE_NFT_ABI,
    functionName: 'maxSupply',
  });

  // Hook para escribir en el contrato
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Esperar confirmación de la transacción
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      setMintSuccess(true);
      setIsMinting(false);
    }
  }, [isConfirmed]);

  const handleMint = async () => {
    if (!address || !NFT_CONTRACT_ADDRESS) return;
    
    setIsMinting(true);
    setMintSuccess(false);

    try {
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: FREE_NFT_ABI,
        functionName: 'mint',
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Be part of the cult.
          </h1>
          
          {/* Logo/Imagen usando next/image */}
          <div className="flex justify-center my-6 rounded-sm">
            <div className="relative w-40 h-40">
              <Image 
                src="/cult.png" 
                alt="NFT Collection" 
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 text-center">
            connect for mint.
          </p>
          
          <div className="flex justify-center">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </div>
    );
  }

  const currentSupply = totalSupply ? Number(totalSupply) : 0;
  const max = maxSupply ? Number(maxSupply) : 0;
  const userHasMinted = Boolean(hasMinted);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-pink-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header con info del usuario */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar address={address} className="w-12 h-12" />
            <div>
              <Name address={address} className="font-semibold text-gray-800" />
              <Address address={address} className="text-sm text-gray-500" />
            </div>
          </div>
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Be part of the cult.
        </h1>

        {/* Supply Counter */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-center text-lg font-semibold text-blue-900">
            {currentSupply} / {max} NFTs 
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${max > 0 ? (currentSupply / max) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Estado del Mint */}
        {userHasMinted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800 text-center font-semibold">
              Welcome to the cult.
            </p>
            <p className="text-green-600 text-sm text-center mt-1">
              You can only mint one NFT per wallet.
            </p>
          </div>
        ) : currentSupply >= max ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-center font-semibold">
              😞 Out of stock
            </p>
            <p className="text-red-600 text-sm text-center mt-1">
              All NFTs have been minted.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleMint}
              disabled={isMinting || isPending || isConfirming}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
            >
              {isPending || isConfirming
                ? '⏳ Minteando...'
                : isMinting
                ? '🔄 Confirmando...'
                : '🎨 Mintear NFT Gratis'}
            </button>

            {mintSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center font-semibold">
                  🎉 NFT minteado exitosamente!
                </p>
                {hash && (
                  <a
                    href={`https://basescan.org/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm text-center block mt-2 hover:underline"
                  >
                    See transaction →
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <p className="text-gray-500 text-sm text-center">
            Powered by Base & OnchainKit
          </p>
        </div>
      </div>
    </div>
  );
}