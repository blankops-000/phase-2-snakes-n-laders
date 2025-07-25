import React from 'react';
import './LoginPage.css';

const LoginPage = ({ onStartGame }) => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>🐍 Snakes and Ladders</h1>
        <div className="how-to-play">
          <h2>How to Play</h2>
          <p>🎲 Roll dice → 🚶 Move → 🪜 Ladders up → 🐍 Snakes down → 🏆 Reach 100!</p>
        </div>
        <button onClick={onStartGame}>Start Game</button>
      </div>
    </div>
  );
};

export default LoginPage;