components/DiceRoller.jsx
import React, { useState } from 'react';
import './DiceRoller.css';

const DiceRoller = ({ onRoll, disabled }) => {
  const [rolling, setRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    if (disabled || rolling) return;
    
    setRolling(true);
    
    // Simulate dice rolling animation
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls > 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setRolling(false);
        onRoll(finalValue);
      }
    }, 100);
  };

  return (
    <div className="dice-roller">
      <div className={`dice ${rolling ? 'rolling' : ''}`}>
        {diceValue}
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