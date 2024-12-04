const gameBoard = document.querySelector('#gameboard')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const width = 8;
let playerTurn = 'white'
playerDisplay.textContent = 'white'

const startPieces = [
  rook, knight, bishop, queen, king, bishop, knight, rook,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  rook, knight, bishop, king, queen, bishop, knight, rook,
]
function createBoard() {
  startPieces.forEach((startPieces, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPieces
    square.firstChild?.setAttribute('draggable', true)
    square.setAttribute('square-id', i)
    const row = Math.floor((63 - i) / 8) + 1
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "beige" : "brown")
    } else {
      square.classList.add(i % 2 === 0 ? "brown" : "beige")
    }
    if (i <= 15) {
      square.firstChild.firstChild.classList.add('black')
    }
    if (i >= 48) {
      square.firstChild.firstChild.classList.add('white')
    }
    gameBoard.append(square)
  })
}
createBoard()

const allSquares = document.querySelectorAll(" .square")

allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute('square-id')
  draggedElement = e.target
  console.log(startPositionId)
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation();
  const correctTurn = draggedElement.firstChild.classList.contains(playerTurn)
  const taken = e.target.classList.contains('piece')
  const valid = checkIfValid(e.target)
  const opponentTurn = playerTurn === 'black' ? 'white' : 'black'
  const pieceTakenByOpponent = e.target.firstChild?.classList.contains(opponentTurn)

  if (correctTurn) {
    // Need to check this first 
    if (pieceTakenByOpponent && valid) {
      e.target.parentNode.append(draggedElement)
      e.target.remove()
      changePlayer()
      return
    }
  }
  // 
  if (pieceTakenByOpponent) {
    infoDisplay.textContent = "Not a valid move!"
    setTimeout(() => infoDisplay.textContent = "", 3000)
    return
  }
  if (valid) {
    e.target.append(draggedElement)
    console.log('target', e.target.append(draggedElement))
    changePlayer()
    return
  }

  changePlayer()
}

// function checkIfValid(target) {
//   const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
//   const startId = Number(startPositionId)
//   const piece = draggedElement.id
//   console.log('targetId:', targetId)
//   console.log('startId:', startId)
//   console.log('piece moved:', piece)
//
//
//   switch (piece) {
//     case 'pawn':
//       const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
//       if (starterRow.includes(startId) && startId + width * 2 === targetId ||
//         startId + width === targetId ||
//         startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
//         startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild
//       ) {
//         return true
//       }
//       break;
//     case 'knight':
//       if (
//         startId + width * 2 + 1 === targetId ||
//         startId + width * 2 - 1 === targetId ||
//         startId + width - 2 === targetId ||
//         startId + width + 2 === targetId ||
//         startId - width * 2 + 1 === targetId ||
//         startId - width * 2 - 1 === targetId ||
//         startId - width - 2 === targetId ||
//         startId - width + 2 === targetId
//       ) {
//         return true;
//       }
//       break;
//     case 'bishop':
//       if (
//         startId + width + 1 === targetId ||
//         startId + width * 2 + 2 && !document.querySelector(`[square=id="${startId + width + 1}"]`.firstChild ||
//           startId + width * 3 + 3 && !document.querySelector(`[square=id="${startId + width + 1}"]`.firstChild &&startId + width * 3 + 3 && !document.querySelector(`[square=id="${startId + width + 1}"]`.firstChild 
//             startId + width * 4 + 4 && !document.querySelector(`[square=id="${startId + width + 1}"]`.firstChild &&
//               startId + width * 5 + 5 && !document.querySelector(`[square=id="${startId + width + 1}"]`.firstChild &&
//                 startId + width * 6 + 6 && !document.querySelector(`[square=id="${startId + width + 1}"]`.firstChild &&
//                   startId + width * 7 + 7 && !document.querySelector(`[square=id="${startId + width + 1}"]`.firstChild
//                   ) 
//   }
// }

function checkIfValid(target) {
  const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
  const startId = Number(startPositionId);
  const piece = draggedElement.id;
  console.log('targetId:', targetId);
  console.log('startId:', startId);
  console.log('piece moved:', piece);

  const width = 8;  // Assuming the chessboard width is 8 squares

  switch (piece) {
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (starterRow.includes(startId) && startId + width * 2 === targetId ||
        startId + width === targetId ||
        startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
        startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
      ) {
        return true;
      }
      break;
    case 'knight':
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width - 2 === targetId ||
        startId - width + 2 === targetId
      ) {
        return true;
      }
      break;
    case 'bishop':
      // Diagonal movement logic for bishop
      const deltaX = targetId % width - startId % width;
      const deltaY = Math.floor(targetId / width) - Math.floor(startId / width);

      // Check if the move is diagonal (abs(deltaX) === abs(deltaY))
      if (Math.abs(deltaX) === Math.abs(deltaY)) {
        let xDirection = deltaX > 0 ? 1 : -1;
        let yDirection = deltaY > 0 ? 1 : -1;

        // Check if there are any pieces blocking the diagonal path
        let currentX = startId % width;
        let currentY = Math.floor(startId / width);

        // Traverse the diagonal path and check for any blocking pieces
        while (currentX !== targetId % width && currentY !== Math.floor(targetId / width)) {
          currentX += xDirection;
          currentY += yDirection;

          const squareId = currentY * width + currentX;
          if (document.querySelector(`[square-id="${squareId}"]`).firstChild) {
            return false; // Blocked by a piece
          }
        }
        return true; // Valid move if no pieces are blocking
      }
      break;
  }
}


function changePlayer() {
  if (playerTurn === 'white') {
    playerTurn = "black"
    reverseIds()
    playerDisplay.textContent = 'black'
  } else {
    revertIds()
    playerTurn = "white"
    playerDisplay.textContent = 'white'
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll('.square')
  allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width - 1) - i));
}


function revertIds() {
  const allSquares = document.querySelectorAll('.square')
  allSquares.forEach((square, i) => square.setAttribute('square-id', i));
}

