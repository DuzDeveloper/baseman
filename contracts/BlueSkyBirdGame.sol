// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/**
 * @title BlueSkyBirdGame
 * @dev Juego tipo Flappy Bird en Base - Requiere transacción para jugar
 */
contract BlueSkyBirdGame {
    
    struct PlayerStats {
        uint256 totalGames;
        uint256 highestScore;
        uint256 totalScore;
        uint256 lastPlayed;
    }
    
    uint256 public totalGamesPlayed;
    uint256 private sessionCounter;
    
    mapping(address => PlayerStats) public playerStats;
    mapping(address => uint256) public activeSession;
    mapping(uint256 => uint256) public sessionScores;
    
    // Leaderboard (top 10)
    address[10] public leaderboard;
    
    event GameStarted(address indexed player, uint256 sessionId, uint256 timestamp);
    event GameEnded(address indexed player, uint256 sessionId, uint256 score, bool newHighScore);
    
    /**
     * @dev Inicia juego - TRANSACCIÓN GRATUITA REQUERIDA
     */
    function startGame() external returns (uint256 sessionId) {
        sessionCounter++;
        sessionId = sessionCounter;
        
        activeSession[msg.sender] = sessionId;
        playerStats[msg.sender].totalGames++;
        playerStats[msg.sender].lastPlayed = block.timestamp;
        totalGamesPlayed++;
        
        emit GameStarted(msg.sender, sessionId, block.timestamp);
    }
    
    /**
     * @dev Finaliza juego y guarda score
     */
    function endGame(uint256 score) external {
        uint256 sessionId = activeSession[msg.sender];
        require(sessionId > 0, "No active game");
        
        sessionScores[sessionId] = score;
        PlayerStats storage stats = playerStats[msg.sender];
        stats.totalScore += score;
        
        bool newHighScore = false;
        if (score > stats.highestScore) {
            stats.highestScore = score;
            newHighScore = true;
            updateLeaderboard(msg.sender);
        }
        
        activeSession[msg.sender] = 0;
        emit GameEnded(msg.sender, sessionId, score, newHighScore);
    }
    
    function updateLeaderboard(address player) internal {
        uint256 playerScore = playerStats[player].highestScore;
        
        for (uint256 i = 0; i < 10; i++) {
            if (leaderboard[i] == address(0) || 
                playerStats[leaderboard[i]].highestScore < playerScore) {
                
                for (uint256 j = 9; j > i; j--) {
                    leaderboard[j] = leaderboard[j - 1];
                }
                leaderboard[i] = player;
                break;
            }
        }
    }
    
    function getPlayerStats(address player) external view returns (
        uint256 totalGames,
        uint256 highestScore,
        uint256 totalScore,
        uint256 avgScore
    ) {
        PlayerStats memory stats = playerStats[player];
        totalGames = stats.totalGames;
        highestScore = stats.highestScore;
        totalScore = stats.totalScore;
        avgScore = totalGames > 0 ? totalScore / totalGames : 0;
    }
    
    function getLeaderboard() external view returns (
        address[10] memory players,
        uint256[10] memory scores
    ) {
        players = leaderboard;
        for (uint256 i = 0; i < 10; i++) {
            if (players[i] != address(0)) {
                scores[i] = playerStats[players[i]].highestScore;
            }
        }
    }
}
