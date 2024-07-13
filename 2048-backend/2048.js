var board;
var score = 0;
var bestScore = 0;
var rows = 4;
var columns = 4;
var highScores = [];
var gameWon = false;

window.onload = function() {
    setGame();
}

function setGame() {

    board = [
        [0, 0, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0],
                [0, 0, 0, 0]
    ];
    document.getElementById("board").innerHTML = ""; // Clear the board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    // create game
    setTwo();
    setTwo();
}

        function updateTile(tile, num) {
            tile.innerText = "";
            tile.classList.value = ""; //clearing the classList
            tile.classList.add("tile");
            if (num > 0) {
                tile.innerText = num.toString();
                if (num <= 4096) {
                    tile.classList.add("x" + num.toString());
                } else {
                    tile.classList.add("x8192");
                }
            }

            // Check for win condition whenever a tile is updated
            checkWin();
        }

        function checkWin() {
            if (gameWon) {
                return; // If the game is already won and continued, do nothing
            }

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    if (board[r][c] == 2048) {
                        if (confirm("Congratulations! You've reached 2048! Do you want to keep playing?")) {
                            gameWon = true; // Set the flag to true to allow the user to continue playing
                        } else {
                            // If the user doesn't want to continue, stop further moves
                            document.removeEventListener("keyup", handleKeyUp);
                        }
                        return;
                    }
                }
            }
        }

        document.addEventListener("keyup", handleKeyUp);

        function handleKeyUp(e) {
            let moved = false;
                if (e.code == "ArrowLeft") {
                    moved = slideLeft();
                } else if (e.code == "ArrowRight") {
                    moved = slideRight();
                } else if (e.code == "ArrowUp") {
                    moved = slideUp();
                } else if (e.code == "ArrowDown") {
                    moved = slideDown();
                }

                if (moved) {
                    setTwo(); // Only add a new tile if any tile has moved
                }
                document.getElementById("score").innerText = score;

                if (score > bestScore) {
                    bestScore = score;
                    document.getElementById("best").innerText = bestScore;
                }
                if (isGameOver()) {
                    console.log("Game Over!");
                    document.getElementById('game-over').style.display = 'flex';
                }
            }

        function filterZero(row) {
            return row.filter(num => num != 0) // create new array without zeros
        }

        function slide(row) {
            row = filterZero(row); // getting rid of zeros

            //slide
            for (let i = 0; i < (row.length - 1); i++) {
                if (row[i] == row[i + 1]) {
                    row[i] *= 2;
                    row[i + 1] = 0;
                    score += row[i];
                }
            }

            row = filterZero(row);

            // add zeros
            while (row.length < columns) {
                row.push(0);
            }
            return row;
        }

        function slideLeft() {
            let moved = false; // Variable to track if any tile moved
            for (let r = 0; r < rows; r++) {
                let row = board[r];
                let originalRow = row.slice(); // Make a copy of the original row
                row = slide(row);
                
                if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
                    moved = true; // If the row has changed, set moved to true
                }

                board[r] = row;
                for (let c = 0; c < columns; c++) {
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    let num = board[r][c];
                    updateTile(tile, num);
                }
            }
            return moved; // Return whether any tile has moved
        }

        function slideRight() {
            let moved = false; // Variable to track if any tile moved
            for (let r = 0; r < rows; r++) {
                let row = board[r];
                let originalRow = row.slice(); // Make a copy of the original row
                
                row.reverse();
                row = slide(row);
                row.reverse();
                
                if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
                    moved = true; // If the row has changed, set moved to true
                }

                board[r] = row;
                for (let c = 0; c < columns; c++) {
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    let num = board[r][c];
                    updateTile(tile, num);
                }
            }
            return moved; // Return whether any tile has moved
        }


        function slideUp() {
            let moved = false;
            for (let c = 0; c < columns; c++) {
                let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
                let originalRow = row.slice(); // Make a copy of the original row

                row = slide(row);

                if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
                    moved = true;
                }

                for (let r = 0; r < rows; r++) {
                    board[r][c] = row[r];
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    let num = board[r][c];
                    updateTile(tile, num);
                }
            }
            return moved; // whether any tiles have moved
        }

        function slideDown() {
            let moved = false;
            for (let c = 0; c < columns; c++) {
                let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
                let originalRow = row.slice(); // Make a copy of the original row

                row.reverse();
                row = slide(row);
                row.reverse();

                if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
                    moved = true;
                }

                for (let r = 0; r < rows; r++) {
                    board[r][c] = row[r];
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    let num = board[r][c];
                    updateTile(tile, num);
                }
            }
            return moved;
        }

        function setTwo() {
            if (!hasEmptyTile()) {
                return;
            }
            let found = false;
            while (!found) {
                let r = Math.floor(Math.random() * rows);
                let c = Math.floor(Math.random() * columns);
                if (board[r][c] == 0) {
                    board[r][c] = 2;
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    tile.innerText = "2";
                    tile.classList.add("x2");
                    found = true;
                }
            }
        }

        function hasEmptyTile() {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    if (board[r][c] == 0) {
                        return true;
                    }
                }
            }
            return false;
        }

        function isGameOver() {
            // check for empty tiles
            if (hasEmptyTile()) {
                return false;
            }
            // check for possible horizontal merges of tiles
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns - 1; c++) {
                    if (board[r][c] == board[r][c + 1]) {
                        return false;
                    }
                }
            }
            // check for possible vertical merges of tiles
            for (let c = 0; c < columns; c++) {
                for (let r = 0; r < rows - 1; r++) {
                    if (board[r][c] == board[r + 1][c]) {
                        return false;
                    }
                }
            }
            return true;
        }

        function resetGame() {
            highScores.push(score);
            highScores.sort((a, b) => b - a);
            highScores = highScores.slice(0, 5); // Keep only top 5 scores
            updateHighScoreBoard();

            score = 0;
            document.getElementById("score").innerText = score;
            document.getElementById('game-over').style.display = 'none';
            setGame();
        }

        function confirmNewGame() {
            if (confirm("Are you sure you want to start a new game?")) {
                score = 0;
                setGame(); 
            }
        }

        function updateHighScoreBoard() {
            const highscoreTable = document.getElementById('highscore-table').getElementsByTagName('tbody')[0];
            highscoreTable.innerHTML = ""; // Clear the table

            highScores.forEach((score, index) => {
                let row = highscoreTable.insertRow();
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                cell1.innerText = index + 1;
                cell2.innerText = score;
            });
        }