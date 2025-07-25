import React from 'react';
import './LoginPage.css';

const LoginPage = ({ onStartGame }) => {
  return (
    <div className="login-page">
      <div className="login-container">
        <header className="login-header">
          <h1>🐍 Snakes and Ladders</h1>
          <p>Classic Board Game Adventure</p>
        </header>

        <div className="rules-section">
          <h2>🎯 Game Rules</h2>
          
          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-icon">🎲</div>
              <h3>How to Play</h3>
              <ul>
                <li>Two players take turns rolling dice</li>
                <li>Move your token by the dice number</li>
                <li>First to reach square 100 wins!</li>
              </ul>
            </div>

            <div className="rule-card">
              <div className="rule-icon">🪜</div>
              <h3>Ladders</h3>
              <ul>
                <li>Land on bottom to climb up</li>
                <li>Shortcuts to higher squares</li>
                <li>Lucky boost forward!</li>
              </ul>
            </div>

            <div className="rule-card">
              <div className="rule-icon">🐍</div>
              <h3>Snakes</h3>
              <ul>
                <li>Land on head to slide down</li>
                <li>Back to lower squares</li>
                <li>Watch out for them!</li>
              </ul>
            </div>

            <div className="rule-card">
              <div className="rule-icon">🎉</div>
              <h3>Special Rules</h3>
              <ul>
                <li>Roll 6 = Extra turn</li>
                <li>Must land exactly on 100</li>
                <li>Overshoot = No move</li>
              </ul>
            </div>
          </div>

          <div className="game-features">
            <h3>🎮 Game Features</h3>
            <div className="features-list">
              <span className="feature">🔴 Player 1 (Red)</span>
              <span className="feature">🔵 Player 2 (Blue)</span>
              <span className="feature">🎲 Interactive Dice</span>
              <span className="feature">🏆 Win Detection</span>
            </div>
          </div>
        </div>

        <div className="start-section">
          <button className="start-button" onClick={onStartGame}>
            🚀 Start Game
          </button>
          <p className="start-text">Ready to play? Click to begin your adventure!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;