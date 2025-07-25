import React from 'react';
import './Instructions.css';

const Instructions = ({ onClose }) => {
  return (
    <div className="instructions-modal" role="dialog" aria-labelledby="instructions-title">
      <div className="instructions-card">
        <div className="instructions-header">
          <h2 id="instructions-title">🐍 How to Play Snakes and Ladders</h2>
          <button className="close-button" onClick={onClose} aria-label="Close instructions">
            ✕
          </button>
        </div>
        
        <div className="instructions-content">
          <section className="game-objective">
            <h3>🎯 Objective</h3>
            <p>Be the first player to reach square 100 to win the game!</p>
          </section>

          <section className="game-setup">
            <h3>🎮 Game Setup</h3>
            <ul>
              <li>Two players take turns rolling the dice</li>
              <li>Both players start at square 1</li>
              <li>Player 1 (red token) goes first</li>
            </ul>
          </section>

          <section className="gameplay-rules">
            <h3>📋 Gameplay Rules</h3>
            <ul>
              <li><strong>Rolling the Dice:</strong> Click "Roll Dice" to move your token</li>
              <li><strong>Movement:</strong> Move forward by the number shown on the dice</li>
              <li><strong>Extra Turn:</strong> Roll a 6 to get another turn! 🎉</li>
              <li><strong>Exact Landing:</strong> You must land exactly on square 100 to win</li>
              <li><strong>Overshooting:</strong> If your roll would take you past 100, you don't move</li>
            </ul>
          </section>

          <section className="special-squares">
            <h3>🎲 Special Squares</h3>
            <div className="special-items">
              <div className="special-item">
                <span className="icon">🪜</span>
                <div>
                  <strong>Ladders (Lucky!)</strong>
                  <p>Land on the bottom of a ladder to climb up instantly!</p>
                  <small>Ladders: 2→38, 7→14, 8→31, 15→26, 28→84, 36→44, 51→67, 78→98, 87→94</small>
                </div>
              </div>
              <div className="special-item">
                <span className="icon">🐍</span>
                <div>
                  <strong>Snakes (Unlucky!)</strong>
                  <p>Land on a snake's head to slide down to its tail!</p>
                  <small>Snakes: 16→6, 46→25, 49→11, 62→19, 64→60, 74→53, 89→68, 92→88, 95→75, 99→80</small>
                </div>
              </div>
            </div>
          </section>

          <section className="winning">
            <h3>🏆 Winning</h3>
            <p>The first player to land exactly on square 100 wins the game!</p>
          </section>

          <section className="controls">
            <h3>🎮 Game Controls</h3>
            <ul>
              <li><strong>Roll Dice:</strong> Click to roll and move</li>
              <li><strong>Reset Game:</strong> Start a new game anytime</li>
              <li><strong>Play Again:</strong> Available after someone wins</li>
            </ul>
          </section>
        </div>

        <div className="instructions-footer">
          <button className="got-it-button" onClick={onClose}>
            Got it! Let's Play 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;