'use strict'

var gBoard
var gGame

function oninitGame() {
  console.log('play game')

  gBoard = buildBoard(gBoard)
  setMines(gBoard)
  setMinesNegsCount(gBoard)
  renderBoard(gBoard)
}

function setMinesNegsCount(board) {

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {

      board[i][j].minesAroundCount = countMinesAround(board, i, j)
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


function checkGameOver(isWin) {

    if (!isWin) {
        alert('Game Over!')
        gGame.isOn = false
        return
    }
    if (gGame.shownCount + gGame.markedCount ===
         gBoard.length * gBoard[0].length) {
        alert('You Win!')
        gGame.isOn = false
    }
}

function expandShown(board, row, col,) {

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {

            if (i === row && j === col) continue 
            if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {

                const cell = board[i][j]

                if (!cell,isShown && !cell.isMine) {

                    const elCell = document.querySelector(`.cell-${i}-${j}`)
                    onCellClicked(elCell, i ,j)
                }
            } 
        }       
    }
}