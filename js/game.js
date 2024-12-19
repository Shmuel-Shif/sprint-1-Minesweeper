'use strict'

let gAllMinesMarked = true
let gTimerInterval = null
let gBoard
let gGame
let gLevel = getBoardConfig()


function initGame(level = gLevel)  {
  console.log('play game', level)

  const { size, minesCount } = getBoardConfig(level)
  gBoard = buildBoard(size)
  setMinesNegsCount(gBoard)
 
  gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    minesCount: minesCount,
    secsPassed: 0,
    firstClick: true,
    hearts: ['❤️','❤️','❤️']
  }

  startTimer()
  renderBoard(gBoard, ".board-container")
  updateMinesLeft()
  updateCellsRevealed()
  updateTimer()
  checkForWin()
}

function onInitGame(level) {
  gLevel = level || gLevel
  initGame(gLevel)
}

function updateCellsRevealed() {
  const elCellsRevealed = document.querySelector('.cells-revealed')
  elCellsRevealed.innerHTML = gGame.shownCount
}

function updateMinesLeft() {
  const elMinesLeft = document.querySelector('.mines-left')
  elMinesLeft.innerHTML = gGame.minesCount - gGame.markedCount
}

function updateTimer() {
    const elTimer = document.querySelector('.time-elapsed')
    elTimer.innerHTML = gGame.secsPassed
}

function startTimer() {
     if (gTimerInterval) {
         clearInterval(gTimerInterval)
  }

       gGame.secsPassed = 0

       updateTimer()

       gTimerInterval = setInterval(() => {
         if (gGame.isOn) {
            gGame.secsPassed++
            updateTimer()
        }
       }, 1000);
}

function updateTimer() {
  let minutes = Math.floor(gGame.secsPassed / 60);  
  let seconds = gGame.secsPassed % 60;  

  if (seconds < 10) {
      seconds = '0' + seconds;
  }

  let timerDisplay = document.querySelector('.time-elapsed');
  timerDisplay.textContent = minutes + ':' + seconds;
}

function stopTimer() {
  clearInterval(gTimerInterval);
}

function setMinesNegsCount(board) {

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {

      board[i][j].minesAroundCount = Math.min(countMinesAround(board, i, j), 4)
    }
  }
}

function countMinesAround(board, row, col) {

  let count = 0

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {

      if (i === row && j === col) continue

      if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
        if (board[i][j].isMine) count++
      }
    }
  }
  return count
}

function expandShown(board, row, col) {

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {

      if (i === row && j === col) continue;

      if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
        const cell = board[i][j];
        const elCell = document.querySelector(`.cell-${i}-${j}`)

        if (!cell.isShown) {
          elCell.classList.add('shown')
          cell.isShown = true
          gGame.shownCount++

          if (elCell.innerHTML === '') {
            elCell.innerHTML = cell.minesAroundCount || ''
          }

          if (cell.minesAroundCount === 0) { 
            expandShown(board, i, j)
          }
        }
      }
    }
  }
}

function checkForWin() {

  if (gGame.markedCount === gGame.minesCount) {
    const allFlagsCorrect = gBoard.every(row => 
      row.every(cell => 
        (cell.isMine && cell.isMarked) || (!cell.isMine && !cell.isMarked)
      )
    );
    
    if (allFlagsCorrect) {
      checkGameOver(true)
    }
  }
}

function checkGameOver(isWin) {
  
  const elMessage = document.querySelector('.game-message')

  if (isWin) {
    elMessage.innerHTML = 'You Win!'
    gGame.isOn = false
    stopTimer()
  } else {
    elMessage.innerHTML = 'You Lost. Game Over!'
    gGame.isOn = false
    stopTimer()
  }
}