components/DiceRoller.jsx
import React, { useState } from 'react';
import './DiceRoller.css';

const DiceRoller = ({ onRoll, disabled }) => {
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (disabled || rolling) return;
    
    setRolling(true);
    
    // Simulate dice rolling animation
    setTimeout(() => {
      setRolling(false);
      onRoll();
    }, 500);
  };

  return (
    <div className="dice-roller">
      <div className={`dice ${rolling ? 'rolling' : ''}`}>
        {rolling ? '?' : '🎲'}
      </div>
      <button 
        onClick={rollDice} 
        disabled={disabled || rolling}
        className="roll-button"
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DiceRoller;