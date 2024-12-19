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
    // lives: 3,
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

function restartGame() {
  clearInterval(gTimerInterval)
  initGame(gLevel)

  gGame.lives = 3
  gGame.hearts = ['❤️','❤️','❤️']
  updateLivesDisplay()

  const elMessage = document.querySelector('.game-message')
  elMessage.innerHTML = ''
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

        if (!cell.isShown && !cell.isMine) { 
          const elCell = document.querySelector(`.cell-${i}-${j}`);
          onCellClicked(elCell, i, j); 
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
    elMessage.innerHTML = `You Lost Game Over! ${gGame.lives.length} lives remaining.`
    gGame.isOn = false
    stopTimer()
  }
}