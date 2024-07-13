'use client';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './game2048.module.css'; // Import CSS module

const Game2048 = () => {

  const initializeBoard = () => {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  };

  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const positionToPixels = (position) => {
    return position * 120; // Adjust this value based on tile size and margin
  };

  const [scale, setScale] = useState(1);
  const [prevValue, setPrevValue] = useState(null);

  const addNewTile = useCallback((board) => {
    if (!hasEmptyTile(board)) return;

    let added = false;
    while (!added) {
      const r = Math.floor(Math.random() * 4);
      const c = Math.floor(Math.random() * 4);
      if (board[r][c] === 0) {
        board[r][c] = 2;
        added = true;
      }
    }

    setBoard([...board]);
  }, []);

  const filterZero = (row) => {
    return row.filter(num => num !== 0); // create new array without zeros
  };

  useEffect(() => {
    if (prevValue !== null) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [prevValue]);

  const slide = (row) => {
    row = filterZero(row); // getting rid of zeros

    // slide
    for (let i = 0; i < (row.length - 1); i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        setScore(prevScore => {
          const newScore = prevScore + row[i];
          if (newScore > bestScore) {
            setBestScore(newScore);
          }
          return newScore;
        });
      }
    }

    row = filterZero(row);

    // add zeros
    while (row.length < 4) {
      row.push(0);
    }
    return row;
  };

  const slideLeft = useCallback(() => {
    let moved = false; // Variable to track if any tile moved
    for (let r = 0; r < 4; r++) {
      let row = board[r];
      let originalRow = row.slice(); // Make a copy of the original row
      row = slide(row);

      if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
        moved = true; // If the row has changed, set moved to true
      }

      board[r] = row;
    }
    setBoard([...board]);
    return moved; // Return whether any tile has moved
  }, [board]);

  const slideRight = useCallback(() => {
    let moved = false; // Variable to track if any tile moved
    for (let r = 0; r < 4; r++) {
      let row = board[r];
      let originalRow = row.slice(); // Make a copy of the original row

      row.reverse();
      row = slide(row);
      row.reverse();

      if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
        moved = true; // If the row has changed, set moved to true
      }

      board[r] = row;
    }
    setBoard([...board]);
    return moved; // Return whether any tile has moved
  }, [board, slide]);

  const slideUp = useCallback(() => {
    let moved = false;
    for (let c = 0; c < 4; c++) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      let originalRow = row.slice(); // Make a copy of the original row

      row = slide(row);

      if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
        moved = true;
      }

      for (let r = 0; r < 4; r++) {
        board[r][c] = row[r];
      }
    }
    setBoard([...board]);
    return moved; // whether any tiles have moved
  }, [board, slide]);

  const slideDown = useCallback(() => {
    let moved = false;
    for (let c = 0; c < 4; c++) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      let originalRow = row.slice(); // Make a copy of the original row

      row.reverse();
      row = slide(row);
      row.reverse();

      if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
        moved = true;
      }

      for (let r = 0; r < 4; r++) {
        board[r][c] = row[r];
      }
    }
    setBoard([...board]);
    return moved;
  }, [board, slide]);

  const hasEmptyTile = (board) => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) {
          return true;
        }
      }
    }
    return false;
  };

  const isGameOver = useCallback(() => {
    // check for empty tiles
    if (hasEmptyTile(board)) {
      return false;
    }
    // check for possible horizontal merges of tiles
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] === board[r][c + 1]) {
          return false;
        }
      }
    }
    // check for possible vertical merges of tiles
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 3; r++) {
        if (board[r][c] === board[r + 1][c]) {
          return false;
        }
      }
    }
    return true;
  }, [board]);

  const setGame = () => {
    const newBoard = initializeBoard();
    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  const resetGame = () => {
    setGame();
  };

  const confirmNewGame = () => {
    if (window.confirm("Are you sure you want to start a new game?")) {
      setGame();
    }
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleKeyUp = useCallback((e) => {
    let moved = false;
    if (e.code === "ArrowLeft") {
      moved = slideLeft();
    } else if (e.code === "ArrowRight") {
      moved = slideRight();
    } else if (e.code === "ArrowUp") {
      moved = slideUp();
    } else if (e.code === "ArrowDown") {
      moved = slideDown();
    }

    if (moved) {
      addNewTile(board); // Only add a new tile if any tile has moved
    }

    if (score > bestScore) {
      setBestScore(score);
    }

    if (isGameOver()) {
      console.log("Game Over!");
      setGameOver(true);
    }
  }, [addNewTile, slideDown, slideLeft, slideRight, slideUp, board]); // Include dependencies

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]); // Ensure handleKeyUp is included as a dependency

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>2048</h1>
      <div className={styles.header}>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreBox}>
            <div>Score</div>
            <span id="score">{score}</span>
          </div>
          <div className={styles.bestScoreBox}>
            <div>Best</div>
            <span id="best">{bestScore}</span>
          </div>
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>Login</button>
      </div>
      <div className={styles.newGameButton} onClick={confirmNewGame}>
        <button>Play New Game</button>
      </div>
      <div className={styles.board}>
        {board.map((row, rIdx) => (
          row.map((num, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              id={`${rIdx}-${cIdx}`}
              className={`${styles.tile} ${styles[`tile${num}`]}`}
              style={{
                left: positionToPixels(cIdx),
                top: positionToPixels(rIdx),
                transform: `scale(${scale})`,
                zIndex: num
              }}
            >
              {num > 0 && num}
            </div>
          ))
        ))}
      </div>
      {gameOver && (
        <div id="game-over" className={styles.gameOver}>
          <div>
            <p>Game Over! Start new game?</p>
            <button onClick={resetGame}>Start New Game</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game2048;