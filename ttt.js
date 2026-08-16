let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let player = 'X';
let bot = 'O';
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

//selection
let ps = 1;
document.getElementById('frnd').addEventListener('click', function() {
    ps = 1;
    document.getElementById('player-choice').innerHTML = "Playing Against: Friends";
});

document.getElementById('bot').addEventListener('click', function() {
    ps = 0;
    document.getElementById('player-choice').innerHTML = "Playing Against: Bot";
});

document.getElementById('X').addEventListener('click', function() {
    currentPlayer = 'X';
    player = "X";
    bot = "O";
    document.getElementById('symbol-choice').innerHTML = "Chosen Symbol: X";
   
});
document.getElementById('O').addEventListener('click', function() {
    currentPlayer = 'X'; 
    bot = "X";
    player = "O";
    document.getElementById('symbol-choice').innerHTML = "Chosen Symbol: O";
    if( ps === 0 && currentPlayer === bot) {
                makeBotMove();
                checkWin();
                if (!gameActive) return;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                document.getElementById('demo').innerHTML = "Turn: " + currentPlayer;
            
            }
});


//click box
document.getElementById('container').addEventListener('click', function(event) {
    if (!gameActive) return;
    if (event.target.classList.contains('cell')) {
        document.getElementById('X').disabled = true;
        document.getElementById('O').disabled = true;
        document.getElementById('frnd').disabled = true;
        document.getElementById('bot').disabled = true;
        let cellIndex = event.target.getAttribute('data-cell-index');
        if (board[cellIndex] === "") {
            board[cellIndex] = currentPlayer;
            document.getElementById('p-' + cellIndex).innerHTML = currentPlayer;
            checkWin();
            if (!gameActive) return;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById('demo').innerHTML = "Turn: " + currentPlayer;

            if( ps === 0 && currentPlayer === bot) {
                makeBotMove();
                checkWin();
                if (!gameActive) return;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                document.getElementById('demo').innerHTML = "Turn: " + currentPlayer;
            
            }
        }
    }
});

//bot move
function makeBotMove() {
    //check for win
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (board[a] === bot && board[b] === bot && board[c] === "") { 
            board[c] = bot; 
            document.getElementById('p-' + c).innerHTML = bot; 
            return; 
        }
        if (board[a] === bot && board[c] === bot && board[b] === "") { 
            board[b] = bot; 
            document.getElementById('p-' + b).innerHTML = bot; 
            return; 
        }
        if (board[b] === bot && board[c] === bot && board[a] === "") {
            board[a] = bot; 
            document.getElementById('p-' + a).innerHTML = bot; 
            return; 
        }
    }

    //block player win
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (board[a] === player && board[b] === player && board[c] === "") { 
            board[c] = bot; 
            document.getElementById('p-' + c).innerHTML = bot; 
            return; 
        }
        if (board[a] === player && board[c] === player && board[b] === "") { 
            board[b] = bot; 
            document.getElementById('p-' + b).innerHTML = bot; 
            return; 
        }
        if (board[b] === player && board[c] === player && board[a] === "") { 
            board[a] = bot; 
            document.getElementById('p-' + a).innerHTML = bot; 
            return; 
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = bot;
            document.getElementById('p-' + i).innerHTML = bot;
            return;
        }
    }
}

//win check
function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('winner').innerHTML = currentPlayer + " wins!";
            return;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        document.getElementById('winner').innerHTML = "It's a draw!";
       return;
    }
}

//reset
document.getElementById('reset').addEventListener('click', function() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    player = 'X';
    bot = 'O';
    gameActive = true;
    document.getElementById('X').disabled = false;
    document.getElementById('O').disabled = false;
    document.getElementById('frnd').disabled = false;
    document.getElementById('bot').disabled = false;
    document.getElementById('symbol-choice').innerHTML = "Choose Your Symbol:";
    document.getElementById('player-choice').innerHTML = "Play Against: ";
    document.getElementById('demo').innerHTML = "";
    document.getElementById('winner').innerHTML = "";
    ps = 1;
    for (let i = 0; i < 9; i++) {
        document.getElementById('p-' + i).innerHTML = "";
    }
});