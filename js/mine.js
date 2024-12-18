'use strict'

function setMines(board, minesCount, firstClickRow, firstClickCol) {
  let minesPlaced = 0

  while (minesCount > minesPlaced) {
    const i = Math.floor(Math.random() * board.length)
    const j = Math.floor(Math.random() * board[0].length)

    if (board[i][j].isMine || (i === firstClickRow && j === firstClickCol)) continue

    board[i][j].isMine = true
    minesPlaced++
  }
}


function onCellClicked(elCell, i, j) {

  if (!gGame.isOn || gBoard[i][j].isShown) return

  if (gGame.firstClick) {
    setMines(gBoard, gGame.minesCount, i, j)
    gGame.firstClick = false
  }

  gBoard[i][j].isShown = true
  gGame.shownCount++
  elCell.classList.add('shown')

  if (gBoard[i][j].isMine) {
    elCell.innerHTML = '💣'
    checkGameOver(false)
  } else {
    elCell.innerHTML = gBoard[i][j].minesAroundCount || ''
    if (gBoard[i][j].minesAroundCount === 0) {
      expandShown(gBoard, i, j)
    }
  }
   updateCellsRevealed()
  checkGameOver(true)
}



function onCellMarked(elCell, i, j) {

  if (!gGame.isOn || gBoard[i][j].isShown) return 
  
  gBoard[i][j].isMarked = !gBoard[i][j].isMarked
  elCell.innerHTML = gBoard[i][j].isMarked ? '🚩' : ''
  gGame.markedCount += gBoard[i][j].isMarked ? 1 : -1
  
  updateMinesLeft()
}
