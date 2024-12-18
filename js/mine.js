'use strict'

function setMines(board) {
  const mineCount = 12
  let minesPlaced = 0

  while (mineCount > minesPlaced) {
    const i = Math.floor(Math.random() * board.length)
    const j = Math.floor(Math.random() * board[0].length)

    if (!board[i][j].isMine) {
      board[i][j].isMine = true
      minesPlaced++
    }
  }
}

function onCellClicked(elCell, i, j) {
  
    if (gGame.isOn || gBoard[i][j].isShown || gBoard[i][j].isMarked) return
    
    gBoard[i][j].isShown === true 
    elCell.classList.add('shown')

    if (gBoard[i][j].isMine) {
        elCell.innerHTML = '💣'
        checkGameOver(false)
    } else {
        elCell.innerHTML = gBoard[i][j].minesAroundCount || ''
        gGame.ShownCount++
        if (gBoard[i][j].minesAroundCount === 0) {
            expandShown(gBoard, i, j)
        }
    }
    checkGameOver(true)
}

