export const GAME_ABI = [
  {
    inputs: [],
    name: "startGame",
    outputs: [{ internalType: "uint256", name: "sessionId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "score", type: "uint256" }],
    name: "endGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "player", type: "address" }],
    name: "getPlayerStats",
    outputs: [
      { internalType: "uint256", name: "totalGames", type: "uint256" },
      { internalType: "uint256", name: "highestScore", type: "uint256" },
      { internalType: "uint256", name: "totalScore", type: "uint256" },
      { internalType: "uint256", name: "avgScore", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getLeaderboard",
    outputs: [
      { internalType: "address[10]", name: "players", type: "address[10]" },
      { internalType: "uint256[10]", name: "scores", type: "uint256[10]" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalGamesPlayed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "player", type: "address" },
      { indexed: false, internalType: "uint256", name: "sessionId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    name: "GameStarted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "player", type: "address" },
      { indexed: false, internalType: "uint256", name: "sessionId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "score", type: "uint256" },
      { indexed: false, internalType: "bool", name: "newHighScore", type: "bool" }
    ],
    name: "GameEnded",
    type: "event"
  }
] as const;

// Mantener compatibilidad
export const FREE_NFT_ABI = GAME_ABI;
