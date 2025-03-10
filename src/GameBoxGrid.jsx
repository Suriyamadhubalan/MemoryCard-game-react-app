import React, { useEffect, useState } from 'react';
import styles from './GameBoxGrid.module.css'
import Card from './Card';
import WinnerAnnouncement from './WinnerAnnouncement/WinnerAnnouncement';


function GameBoxGrid() {

  // State for grid size
  const [gridSize, setGridSize] = useState(3);

  // List of fruits used in the game
  const [fruitList, setFruitList] = useState([
    { fruitName: 'amla', isFliped: false },
    { fruitName: 'apple', isFliped: false },
    { fruitName: 'banana', isFliped: false },
    { fruitName: 'berries', isFliped: false },
    { fruitName: 'cherries', isFliped: false },
    { fruitName: 'grapes', isFliped: false },
    { fruitName: 'mango', isFliped: false },
    { fruitName: 'orange', isFliped: false },
    { fruitName: 'pomegranate', isFliped: false },
    { fruitName: 'pumpkin', isFliped: false },
    { fruitName: 'strawberry', isFliped: false },
    { fruitName: 'watermelon', isFliped: false },
  ]);

  // Game state variables
  const [cardGrid, setCardGrid] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [moves, setMoves] = useState(0)
  const [Score1, setscore1] = useState(0)
  const [Score2, setscore2] = useState(0)
  const [isInteractionDisabled, setIsInteractionDisabled] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(true);

  //  Timer State
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  
  // Timer logic: Start the timer when the first card is flipped
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);


  // Initializes the game grid whenever the grid size changes,  use effect hook to avoid unnecessary re-renders
  useEffect(() => {
    initializeGrid();
  }, [gridSize]);

  // Handles the grid size selection 
  function handleGridSize(event) {
    setGridSize(parseInt(event.target.value));
  }

  // Randomly selects a subset of fruits for the grid
  function getRandomImages(fruitList, count) {
    const shuffled = [...fruitList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Duplicates selected fruits to create matching pairs
  function duplicateAndConcatenate(array) {
    return [...array, ...array];
  }

  // Initializes the game grid with shuffled fruit pairs
  const initializeGrid = () => {
    setClickedCards([]);
    const selectedImages = getRandomImages(fruitList, (12 / gridSize) * 2);
    const duplicatedImages = duplicateAndConcatenate(selectedImages);
    const shuffledImages = getRandomImages(duplicatedImages, duplicatedImages.length);
    setCardGrid(shuffledImages);
    setscore1(0)
    setscore2(0)
    setTimer(0);  
    setIsTimerRunning(false);
  };

  // Resets/restarts the game 
  function reset() {
    setGameInProgress(false); // Prevent winner announcement during reset
    setIsInteractionDisabled(true);
  
    // Flips all cards face-down first
    const flippedDownGrid = cardGrid.map((card) => ({ ...card, isFliped: false }));
    setCardGrid(flippedDownGrid);
  
    // Wait for animation before reinitializing
    setTimeout(() => {
      initializeGrid(); 
      setscore1(0);
      setscore2(0);
      setMoves(0);
      setIsInteractionDisabled(false);
      setGameInProgress(true); 
    }, 250);
  }
  
  
  // handles card clicks and applies logic
  const handleCardClick = (cardId) => {
    if (isInteractionDisabled) return;  // Prevent clicks during animations
    if (cardGrid[cardId].isFliped) return;  // Prevent clicking the same card or flipped cards


    // Start timer on the first move
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    // flips the clicked cards 
    const updatedCardGrid = cardGrid.map((card, index) => {
      if (index === cardId) {
        return { ...card, isFliped: true };
      }
      return card;
    });
  
    setCardGrid(updatedCardGrid);
  
    // GAME MAIN LOGIC 
    if (clickedCards.length === 0) {
      setClickedCards([updatedCardGrid[cardId]]);
    } 
    else if (clickedCards.length === 1 && clickedCards[0].fruitName !== updatedCardGrid[cardId].fruitName) {
      setClickedCards([...clickedCards, updatedCardGrid[cardId]]);
      if (clickedCards[0].fruitName !== updatedCardGrid[cardId].fruitName) {
        setIsInteractionDisabled(true); 
        setMoves((m) => m + 1);
        setTimeout(() => {
          performAction(clickedCards[0], updatedCardGrid[cardId]);
          setIsInteractionDisabled(false); 
        }, 250);
      }
      
    }
    // logic if the card matches
    else {
      if (moves % 2 === 0) {
        setscore1((s) => s + 1);
      } else {
        setscore2((s) => s + 1);
      }
      setClickedCards([]);
    }
  };

  // logic if the cards is not matched
  const performAction = (firstCard, secondCard) => {
    setTimeout(() => {
      const updatedCardGrid = cardGrid.map((card) => {
        if (card.fruitName === firstCard.fruitName || card.fruitName === secondCard.fruitName) {
          return { ...card, isFliped: false };
        }
        return card;
      });
      setCardGrid(updatedCardGrid);
      setClickedCards([]);
    }, 250);
  };


  // Determines the winner when the game ends
  const announceWinner = () => {
    setIsTimerRunning(false); // Stop the timer when the game ends
    if (Score1 > Score2) {
      setWinner("🎉 Player 1 🎉 Wins!");
    } else if (Score2 > Score1) {
      setWinner("🎉 Player 2 🎉 Wins!");
    } else {
      setWinner("It's a Tie!");
    }
  };

  // reset/restart button logic on the anounceWinner component
  const resetGame = () => {
    setWinner(null); 
    reset();
  };

  //checks for the winning condition everytime whenever the dependencies change
  useEffect(() => {
    if (
      gameInProgress && // Ensure the game is ongoing
      cardGrid.length > 0 && // Ensure the grid is initialized
      Score1 + Score2 === cardGrid.length / 2 // Check if all pairs are found
    ) {
      announceWinner();
    }
  }, [Score1, Score2, cardGrid, gameInProgress]);
  
  


  return (
    <>
      {winner && <WinnerAnnouncement winner={winner} timer={timer} onClose={resetGame} />}
      <div className="d-flex justify-content-center my-3 text-center">
        <h1 className="text-center mx-5">Memory Card Game </h1>
        <select value={gridSize} onChange={handleGridSize}>
          <option value={4}>Easy</option>
          <option value={3}>Moderate</option>
          <option value={2}>Hard</option>
        </select>
      </div>

      <div className="text-center my-2">
        <h4>Time: {timer}s</h4>
      </div>
      
      <div className={`d-flex justify-content-around my-3 text-center ${styles.scoreboard}`}>
        <div className={`${(moves % 2 === 0) ? styles.activePlayer : styles.player} mx-2`}>
            <p>Player 1</p>
            <p>Score: {Score1}</p>
        </div>
        <div className={styles.movesContainer}>
            <p>Number of Moves</p>
            <p>{moves}</p>
        </div>
        <div className={`${(moves % 2 !== 0) ? styles.activePlayer : styles.player} mx-2`}>
            <p>Player 2</p>
            <p>Score: {Score2}</p>
        </div>
      </div>

      <div className={`${styles.customContainer} container`} >
        <div className="row">
          {cardGrid.map((fruit, index) => (
            <div className={`col-${gridSize} ${styles.column}`} key={index} >
              <Card fruit={fruit} onCardClick={() => handleCardClick(index)} cardId={index} />
            </div>
          ))}
        </div>
      </div>
      <div className='text-center my-5'>
        <button className={`btn btn-success px-4 py-2`} onClick={reset}>Re-set</button>
      </div>
      
    </>
  );
}

export default GameBoxGrid;
