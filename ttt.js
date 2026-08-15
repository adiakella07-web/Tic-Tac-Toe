let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.getElementById('X').addEventListener('click', function() {
    currentPlayer = "X";
    document.getElementById('symbol-choice').innerHTML = "Chosen Symbol: X";
   
});
document.getElementById('O').addEventListener('click', function() {
    currentPlayer = "O";
    document.getElementById('symbol-choice').innerHTML = "Chosen Symbol: O";
});


document.getElementById('container').addEventListener('click', function(event) {
    if (!gameActive) return;
    if (event.target.classList.contains('cell')) {
        document.getElementById('X').disabled = true;
        document.getElementById('O').disabled = true;
        let cellIndex = event.target.getAttribute('data-cell-index');
        if (board[cellIndex] === "") {
            board[cellIndex] = currentPlayer;
            document.getElementById('p-' + cellIndex).innerHTML = currentPlayer;
            checkWin();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById('demo').innerHTML = "Turn: " + currentPlayer;
        }
    }
});


function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('winner').innerHTML = currentPlayer + " wins!";
            document.getElementById('container').disabled = true;
            return;
        }
        if (!board.includes("")) {
            gameActive = false;
            document.getElementById('winner').innerHTML = "It's a draw!";
            document.getElementById('container').disabled = true;
            return;
        }
    }
}


document.getElementById('reset').addEventListener('click', function() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById('X').disabled = false;
    document.getElementById('O').disabled = false;
    document.getElementById('symbol-choice').innerHTML = "Choose Your Symbol:";
    document.getElementById('demo').innerHTML = "";
    for (let i = 0; i < 9; i++) {
        document.getElementById('p-' + i).innerHTML = "";
    }
});