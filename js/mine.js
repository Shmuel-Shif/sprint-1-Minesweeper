'use strict'




function setMines(board, minesCount, firstClickRow, firstClickCol) {
  let minesPlaced = 0

  while (minesCount > minesPlaced) {
    const i = Math.floor(Math.random() * board.length)
    const j = Math.floor(Math.random() * board[0].length)

    if (board[i][j].isMine || (i === firstClickRow && j === firstClickCol))
      continue

    board[i][j].isMine = true
    minesPlaced++
  }
}

function onCellClicked(elCell, i, j) {

  if (!gGame.isOn || gBoard[i][j].isShown) return

  if (gGame.firstClick) {
    setMines(gBoard, gGame.minesCount, i, j)
    setMinesNegsCount(gBoard)
    gGame.firstClick = false
  }

  if (gBoard[i][j].isMine) {
    elCell.innerHTML = '💣'
    loseLife()
  } else {
    elCell.innerHTML = gBoard[i][j].minesAroundCount || ''
    if (gBoard[i][j].minesAroundCount === 0) {
      expandShown(gBoard, i, j) 
    }
  }

  gBoard[i][j].isShown = true
  gGame.shownCount++
  elCell.classList.add('shown')
  updateCellsRevealed()
  checkForWin()
}

function clearPreviousNeighborDisplay() {
  const previousNeighbors = document.querySelectorAll('.neighbor')
  previousNeighbors.forEach(neighbor => {
    neighbor.classList.remove('.neighbor')
  })
}

function showNeighbors(elCell, i, j) {
  clearPreviousNeighborDisplay()
  expandShown(gBoard, i, j)
  elCell.classList.add('neighbor')
}

function onCellMarked(elCell, i, j) {
  if (!gGame.isOn || gBoard[i][j].isShown && !gBoard[i][j].isMine) 
      return 

  if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) {

    elCell.innerHTML = '🚩'
    gBoard[i][j].isMarked = true
    gGame.markedCount++

  } else if (!gBoard[i][j].isMine) {

    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    elCell.innerHTML = gBoard[i][j].isMarked ? '🚩' : ''
    gGame.markedCount += gBoard[i][j].isMarked ? 1 : -1

  }

  checkForWin()
  updateMinesLeft()
}

function restartGame() {
  clearInterval(gTimerInterval)
  initGame(gLevel)

  remainingHints = 3  
  updateHintCounter()

  gGame.lives = 3
  gGame.hearts = ['❤️','❤️','❤️']
  updateLivesDisplay()
  
  const elMessage = document.querySelector('.game-message')
  elMessage.innerHTML = ''
  
}

function loseLife() {
  if (gGame.hearts.length > 0) {
      gGame.hearts.pop()
      updateLivesDisplay()
  }

  if (gGame.hearts.length === 0) {
    checkGameOver(false) 
  }
}

function updateLivesDisplay() {
  const elLives = document.querySelector('.lives')
  elLives.innerHTML = gGame.hearts.join('')
}

