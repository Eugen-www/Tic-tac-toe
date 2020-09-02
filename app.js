const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElemnts = document.querySelectorAll("[data-cell]");
const board = document.querySelector("#board");
const winMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winMessageElement = document.querySelector(".winning-message");
const restartButton = document.querySelector("#restartButton");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElemnts.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winMessageElement.classList.remove("show");
}

function handleClick(e) {
  const targetCell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(targetCell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverEffect();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElemnts[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElemnts].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winMessageTextElement.innerText = "Draw";
  } else {
    winMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;
  }
  winMessageElement.classList.add("show");
}

function setBoardHoverEffect() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
