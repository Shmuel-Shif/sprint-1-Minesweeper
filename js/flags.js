'use strict'

function onCellClicked(elCell, i, j) {

    if (!gGame.isOn || gBoard[i][j].isShown) return 
    
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    elCell.innerHTML = gBoard[i][j].isMarked ? '🚩' : ''
    gGame.markedCount += gBoard[i][j].isMarked ? 1 : -1
    
}