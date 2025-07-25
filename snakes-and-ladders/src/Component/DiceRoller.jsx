// Import React and the CSS styles for this component
import React, { useState } from 'react';
import './DiceRoller.css';

// This component shows the dice and handles rolling it
const DiceRoller = ({ onRoll, disabled }) => {
  
  // Keep track of whether the dice is currently rolling
  const [isRolling, setIsRolling] = useState(false);
  
  // Keep track of what number the dice shows
  const [diceNumber, setDiceNumber] = useState(1);

  // This function runs when someone clicks the "Roll Dice" button
  const rollTheDice = () => {
    // Don't do anything if the dice is disabled or already rolling
    if (disabled || isRolling) return;
    
    setIsRolling(true); // Show that the dice is rolling
    
    // Make the dice "roll" by changing numbers quickly
    let rollCount = 0;
    const rollingAnimation = setInterval(() => {
      // Show a random number from 1 to 6
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      // After 15 quick changes, stop and pick the final number
      if (rollCount > 15) {
        clearInterval(rollingAnimation); // Stop the animation
        
        // Pick the final random number
        const finalNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(finalNumber);
        setIsRolling(false); // Dice finished rolling
        
        // Tell the parent component what number was rolled
        onRoll(finalNumber);
      }
    }, 100); // Change number every 100 milliseconds
  };

  // This is what shows on the screen
  return (
    <div className="dice-roller">
      {/* The dice that shows the number */}
      <div 
        className={`dice ${isRolling ? 'rolling' : ''}`} 
        aria-live="polite"
        aria-label={`Dice shows ${diceNumber}`}
      >
        {diceNumber}
      </div>
      
      {/* The button to roll the dice */}
      <button 
        onClick={rollTheDice} 
        disabled={disabled || isRolling}
        className="roll-button"
        aria-label={isRolling ? 'Dice is rolling' : 'Roll the dice'}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DiceRoller;