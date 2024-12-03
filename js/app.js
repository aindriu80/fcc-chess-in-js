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

function checkIfValid(target) {
  const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
  const startId = Number(startPositionId)
  const piece = draggedElement.id
  console.log('targetId:', targetId)
  console.log('startId:', startId)
  console.log('piece moved:', piece)


  switch (piece) {
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
      if (starterRow.includes(startId) && startId + width * 2 === targetId ||
        startId + width === targetId ||
        startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
        startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild
      ) {
        return true
      }
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

