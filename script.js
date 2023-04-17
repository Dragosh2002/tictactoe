const board = document.querySelector('.board'); // 
let currentPlayer = 'x';

const cells = [...document.querySelectorAll('.cell')];
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
  const cell = event.target;
  if (cell.classList.contains('x') || cell.classList.contains('o')) {
    return;
  }
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer;
  checkWin();
  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function checkWin() {
  const winningCombinations = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const combination of winningCombinations) {
    if (cells[combination[0]].classList.contains(currentPlayer) && 
        cells[combination[1]].classList.contains(currentPlayer) &&
        cells[combination[2]].classList.contains(currentPlayer)) {
      alert(`${currentPlayer} wins!`);
      resetGame();
      return;
    }
  }
  if (cells.every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
    alert(`It's a tie!`);
    resetGame();
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
  currentPlayer = 'x';
}

// Generate the X and O pieces
const xPiece = document.createElement('div');
xPiece.classList.add('x-piece');
xPiece.innerHTML = 'X';

const oPiece = document.createElement('div');
oPiece.classList.add('o-piece');
oPiece.innerHTML = 'O';

// Add the X and O pieces to the background
for (let i = 0; i < 20; i++) {
  const piece = i % 2 === 0 ? xPiece.cloneNode(true) : oPiece.cloneNode(true);
  piece.style.left = Math.random() * 100 + 'vw';
  piece.style.top = Math.random() * 100 + 'vh';
  document.body.appendChild(piece);
}

// Add animation to the X and O pieces
const pieces = document.querySelectorAll('.x-piece, .o-piece');

for (let piece of pieces) {
  piece.animate([
    { transform: 'translate(0, 0)' },
    { transform: `translate(${Math.random() * 50 + 25}vw, ${Math.random() * 50 + 25}vh)` },
    { transform: `translate(${Math.random() * 100}vw, ${Math.random() * 100}vh)` },
  ], {
    duration: Math.random() * 5000 + 5000,
    direction: 'alternate',
    fill: 'both',
    iterations: Infinity,
  });
}