'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { useSendCalls, useCallsStatus } from 'wagmi/experimental';
import { GAME_ABI } from '@/lib/contract-abi';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import NextImage from 'next/image';
import { encodeFunctionData } from 'viem';

const GAME_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

const DATA_SUFFIX = '0x62635f787669766c7479690b0080218021802180218021802180218021' as `0x${string}`;

// ========== CONFIGURACIÓN EDITABLE ==========
const CONFIG = {
  skyColor: '#87CEEB',
  birdColor: '#0066FF',
  pipeColor: '#0047AB',
  groundColor: '#4169E1',
  gravity: 0.18,
  jumpStrength: -6,
  birdSize: 50,
  pipeWidth: 80,
  pipeGap: 220,
  pipeSpeed: 3,
};

interface Pipe {
  x: number;
  height: number;
  scored?: boolean;
}

function drawBird(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  const s = size / 14;
  ctx.fillStyle = '#7C3AED';
  ctx.beginPath();
  ctx.moveTo(x + s * 3, y + s * 4);
  ctx.quadraticCurveTo(x - s * 3, y + s * 2, x - s * 2, y + s * 4);
  ctx.quadraticCurveTo(x - s * 3, y + s * 6, x - s * 2, y + s * 7);
  ctx.quadraticCurveTo(x - s * 3, y + s * 9, x + s * 3, y + s * 9);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.ellipse(x + s * 8.5, y + s * 5, s * 1.2, s * 1.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#64748B';
  ctx.beginPath();
  ctx.ellipse(x + s * 10.5, y + s * 5.5, s * 2.2, s * 0.9, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.ellipse(x + s * 13, y + s * 5, s * 1, s * 0.8, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x + s * 6, y + s * 6.5, s * 2.8, s * 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0EA5E9';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + s * 5, y + s * 6);
  ctx.lineTo(x + s * 7, y + s * 6);
  ctx.moveTo(x + s * 5, y + s * 7);
  ctx.lineTo(x + s * 7, y + s * 7);
  ctx.stroke();
  ctx.strokeStyle = '#0EA5E9';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + s * 6, y + s * 6.5, s * 1.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#06B6D4';
  ctx.beginPath();
  ctx.arc(x + s * 6, y + s * 6.5, s * 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(x + s * 6, y + s * 6.5, s * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#64748B';
  ctx.beginPath();
  ctx.arc(x + s * 9, y + s * 4.5, s * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(x + s * 9, y + s * 3.8, s * 2, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#06B6D4';
  ctx.fillRect(x + s * 7.5, y + s * 4.2, s * 3, s * 1);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillRect(x + s * 7.8, y + s * 4.3, s * 2, s * 0.4);
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(x + s * 8.8, y + s * 3, s * 0.4, s * 0.8);
  ctx.beginPath();
  ctx.arc(x + s * 9, y + s * 3, s * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#64748B';
  ctx.beginPath();
  ctx.ellipse(x + s * 4.5, y + s * 7, s * 1.8, s * 0.8, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(x + s * 3, y + s * 7.5, s * 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#334155';
  ctx.fillRect(x + s * 4.5, y + s * 8, s * 3, s * 0.6);
  ctx.fillStyle = '#64748B';
  ctx.beginPath();
  ctx.arc(x + s * 6, y + s * 8.3, s * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x + s * 3, y + s * 6.5, s * 2.2, s * 1, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(x + s * 1.5, y + s * 6.5, s * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x + s * 3, y + s * 8, s * 2.2, s * 1, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(x + s * 1.5, y + s * 8, s * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1E40AF';
  ctx.beginPath();
  ctx.ellipse(x + s * 1.3, y + s * 6.2, s * 1, s * 0.7, -0.2, 0, Math.PI * 2);
  ctx.ellipse(x + s * 1.3, y + s * 8.2, s * 1, s * 0.7, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + s * 0.8, y + s * 6);
  ctx.lineTo(x + s * 1.8, y + s * 6.4);
  ctx.moveTo(x + s * 0.8, y + s * 8);
  ctx.lineTo(x + s * 1.8, y + s * 8.4);
  ctx.stroke();
  ctx.fillStyle = '#7C3AED';
  ctx.beginPath();
  ctx.ellipse(x + s * 8, y + s * 4.5, s * 1.5, s * 0.8, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - s * 0.5, y + s * 5);
  ctx.lineTo(x + s * 1.5, y + s * 5);
  ctx.moveTo(x - s * 1, y + s * 7);
  ctx.lineTo(x + s * 1, y + s * 7);
  ctx.moveTo(x - s * 0.5, y + s * 9);
  ctx.lineTo(x + s * 1.5, y + s * 9);
  ctx.stroke();
}

export function BlueSkyBirdGame() {
  const { address, isConnected, connector } = useAccount();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bird, setBird] = useState({ y: 250, velocity: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const lastPipeRef = useRef<number>(0);

  const isSmartWallet = connector?.id === 'coinbaseWalletSDK';

  useEffect(() => {
    const img = new Image();
    img.src = '/fondo.png';
    img.onload = () => { backgroundRef.current = img; };
  }, []);

  const { data: playerStats } = useReadContract({
    address: GAME_CONTRACT,
    abi: GAME_ABI,
    functionName: 'getPlayerStats',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!GAME_CONTRACT },
  });

  // EOA (MetaMask) hooks
  const { data: startHash, writeContract: startGameTx, isPending: isStartingEOA } = useWriteContract();
  const { isLoading: isConfirmingStart, isSuccess: startConfirmed } = useWaitForTransactionReceipt({ hash: startHash });
  const { data: endHash, writeContract: endGameTx, isPending: isEndingEOA } = useWriteContract();
  const { isSuccess: endConfirmed } = useWaitForTransactionReceipt({ hash: endHash });

  // Smart Wallet (Base App) hooks
  const { data: startCallsId, sendCalls: sendStartCalls, isPending: isStartingSW } = useSendCalls();
  const { data: endCallsId, sendCalls: sendEndCalls, isPending: isEndingSW } = useSendCalls();
  const { data: startCallsStatus } = useCallsStatus({ id: (startCallsId as unknown) as string, query: { enabled: !!startCallsId, refetchInterval: (data) => data?.statusCode === 200 ? false : 1000 } });
  const { data: endCallsStatus } = useCallsStatus({ id: (endCallsId as unknown) as string, query: { enabled: !!endCallsId, refetchInterval: (data) => data?.statusCode === 200 ? false : 1000 } });

  const isStarting = isSmartWallet ? isStartingSW : isStartingEOA;
  const isEnding = isSmartWallet ? isEndingSW : isEndingEOA;
  const startSuccess = isSmartWallet ? startCallsStatus?.statusCode === 200 : startConfirmed;
  const endSuccess = isSmartWallet ? endCallsStatus?.statusCode === 200 : endConfirmed;

  const handleStartGame = () => {
    if (!address || !GAME_CONTRACT) return;
    setCountdownStarted(false);

    if (isSmartWallet) {
      sendStartCalls({
        calls: [
          {
            to: GAME_CONTRACT,
            data: encodeFunctionData({ abi: GAME_ABI, functionName: 'startGame' }),
          },
        ],
        capabilities: {
          dataSuffix: {
            value: DATA_SUFFIX,
            optional: true,
          },
        },
      });
    } else {
      startGameTx({
        address: GAME_CONTRACT,
        abi: GAME_ABI,
        functionName: 'startGame',
        dataSuffix: DATA_SUFFIX,
      });
    }
  };

  useEffect(() => {
    if (startSuccess && !countdownStarted) {
      setCountdownStarted(true);
      setCountdown(3);
    }
  }, [startSuccess, countdownStarted]);

  useEffect(() => {
    if (countdown === null || countdown < 0) return;
    if (countdown === 0) {
      setTimeout(() => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setBird({ y: 250, velocity: 0 });
        setPipes([]);
        lastPipeRef.current = Date.now();
        setCountdown(null);
      }, 100);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(prev => prev !== null ? prev - 1 : null);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleGameOver = useCallback(() => {
    if (!address || !GAME_CONTRACT || isEnding || gameOver) return;
    setGameOver(true);

    if (isSmartWallet) {
      sendEndCalls({
        calls: [
          {
            to: GAME_CONTRACT,
            data: encodeFunctionData({ abi: GAME_ABI, functionName: 'endGame', args: [BigInt(score)] }),
          },
        ],
        capabilities: {
          dataSuffix: {
            value: DATA_SUFFIX,
            optional: true,
          },
        },
      });
    } else {
      endGameTx({
        address: GAME_CONTRACT,
        abi: GAME_ABI,
        functionName: 'endGame',
        args: [BigInt(score)],
        dataSuffix: DATA_SUFFIX,
      });
    }
  }, [address, isEnding, gameOver, score, isSmartWallet, sendEndCalls, endGameTx]);

  const jump = useCallback(() => {
    if (!gameStarted || gameOver || countdown !== null) return;
    setBird(prev => ({ ...prev, velocity: CONFIG.jumpStrength }));
  }, [gameStarted, gameOver, countdown]);

  useEffect(() => {
    if (!gameStarted || gameOver || countdown !== null) return;
    const gameLoop = () => {
      setBird(prev => ({
        y: prev.y + prev.velocity,
        velocity: prev.velocity + CONFIG.gravity
      }));
      const now = Date.now();
      if (now - lastPipeRef.current > 1500) {
        setPipes(prev => [...prev, { x: 400, height: Math.random() * 200 + 100 }]);
        lastPipeRef.current = now;
      }
      setPipes(prev => prev
        .map(pipe => ({ ...pipe, x: pipe.x - CONFIG.pipeSpeed }))
        .filter(pipe => pipe.x > -CONFIG.pipeWidth)
      );
      setPipes(prev => prev.map(pipe => {
        if (!pipe.scored && pipe.x + CONFIG.pipeWidth < 100) {
          setScore(s => s + 1);
          return { ...pipe, scored: true };
        }
        return pipe;
      }));
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => { if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current); };
  }, [gameStarted, gameOver, countdown]);

  useEffect(() => {
    if (!gameStarted || gameOver || countdown !== null) return;
    if (bird.y < 0 || bird.y > 500 - CONFIG.birdSize) { handleGameOver(); return; }
    for (const pipe of pipes) {
      if (100 + CONFIG.birdSize > pipe.x && 100 < pipe.x + CONFIG.pipeWidth) {
        if (bird.y < pipe.height || bird.y + CONFIG.birdSize > pipe.height + CONFIG.pipeGap) {
          handleGameOver(); return;
        }
      }
    }
  }, [bird, pipes, gameStarted, gameOver, countdown, handleGameOver]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); jump(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (backgroundRef.current) {
      ctx.drawImage(backgroundRef.current, 0, 0, 400, 500);
    } else {
      ctx.fillStyle = CONFIG.skyColor;
      ctx.fillRect(0, 0, 400, 500);
    }
    pipes.forEach(pipe => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00FFFF';
      ctx.fillStyle = 'rgba(0, 71, 171, 0.8)';
      ctx.fillRect(pipe.x, 0, CONFIG.pipeWidth, pipe.height);
      ctx.fillRect(pipe.x, pipe.height + CONFIG.pipeGap, CONFIG.pipeWidth, 500 - (pipe.height + CONFIG.pipeGap));
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(pipe.x, 0, CONFIG.pipeWidth, pipe.height);
      ctx.strokeRect(pipe.x, pipe.height + CONFIG.pipeGap, CONFIG.pipeWidth, 500 - (pipe.height + CONFIG.pipeGap));
      ctx.shadowBlur = 0;
    });
    drawBird(ctx, 100, bird.y, CONFIG.birdSize, CONFIG.birdColor);
  }, [bird, pipes]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundImage: 'url(/fondo.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-blue-900/80 backdrop-blur-lg rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-cyan-500/30">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4 mt-8 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">Baseman</h1>
          <div className="mb-8 mt-4 flex justify-center">
            <NextImage src="/baseman.png" alt="Hero Logo" width={160} height={160}
              className="rounded-full border-4 border-cyan-400 shadow-2xl shadow-cyan-400/80 object-cover animate-pulse" priority />
          </div>
          <p className="text-cyan-200 mb-6">Connect your wallet to play on Base!</p>
          <ConnectWallet className="w-full" />
        </div>
      </div>
    );
  }

  const highScore = playerStats ? Number(playerStats[1]) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: 'url(/fondo.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="mb-4 bg-blue-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30">
        <ConnectWallet className="text-sm" />
      </div>
      <div className="relative">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-blue-900/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-cyan-500/50">
          <p className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">{score}</p>
        </div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
          <p className="text-sm text-cyan-300 font-semibold drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">Best: {highScore}</p>
        </div>
        <div className="relative cursor-pointer border-4 border-cyan-500 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/50" onClick={jump}>
          <canvas ref={canvasRef} width={400} height={500} className="block" />

          {!gameStarted && !isStarting && !isConfirmingStart && countdown === null && (
            <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-md flex flex-col items-center justify-center">
              <h1 className="text-5xl font-bold text-cyan-400 mb-4 mt-16 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">Baseman</h1>
              <div className="mb-8 mt-4 flex justify-center">
                <NextImage src="/baseman.png" alt="Hero Logo" width={160} height={160}
                  className="rounded-full border-4 border-cyan-400 shadow-2xl shadow-cyan-400/80 object-cover animate-pulse" priority />
              </div>
              <p className="text-xl text-cyan-300 mb-8">⛓️ On-Chain Game</p>
              <button onClick={(e) => { e.stopPropagation(); handleStartGame(); }}
                disabled={isStarting}
                className="bg-cyan-500 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/50 disabled:opacity-50">
                🚀 Start Game (Free)
              </button>
              <p className="text-xs text-cyan-400/80 mt-4">Requires Base transaction</p>
            </div>
          )}

          {(isStarting || isConfirmingStart) && countdown === null && (
            <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mb-4 shadow-[0_0_20px_rgba(0,255,255,0.5)]"></div>
              <p className="text-cyan-300 text-xl font-bold">
                {isStarting ? 'Confirm in wallet...' : 'Processing...'}
              </p>
            </div>
          )}

          {countdown !== null && countdown >= 0 && (
            <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md flex flex-col items-center justify-center">
              {countdown > 0 ? (
                <>
                  <div className="text-9xl font-bold text-cyan-400 animate-pulse drop-shadow-[0_0_30px_rgba(0,255,255,1)]">{countdown}</div>
                  <p className="text-2xl text-cyan-300 mt-4">Get Ready!</p>
                </>
              ) : (
                <div className="text-6xl font-bold text-cyan-400 animate-bounce drop-shadow-[0_0_30px_rgba(0,255,255,1)]">GO! 🚀</div>
              )}
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">Game Over!</h2>
              <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-6 mb-6 border border-cyan-500/30">
                <p className="text-2xl text-cyan-300 mb-2">Score: <span className="font-bold text-cyan-400">{score}</span></p>
                <p className="text-xl text-cyan-400">Best: <span className="font-bold">{highScore}</span></p>
                {score > highScore && (
                  <p className="text-yellow-300 font-bold mt-2 drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">🎉 New Record!</p>
                )}
              </div>
              {endSuccess ? (
                <button onClick={(e) => { e.stopPropagation(); setCountdown(null); setCountdownStarted(false); handleStartGame(); }}
                  className="bg-cyan-500 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/50">
                  Play Again
                </button>
              ) : (
                <p className="text-cyan-300">Saving score...</p>
              )}
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-cyan-300 mb-2 drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">🖱️ Click/Tap • ⌨️ Space</p>
          <p className="text-xs text-cyan-400">Powered by Base</p>
        </div>
      </div>
    </div>
  );
}
