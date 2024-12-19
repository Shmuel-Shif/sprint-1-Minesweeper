'use strict'

let remainingHints = 3


function giveHint() {
    if (remainingHints > 0) {
        remainingHints--
        updateHintCounter()

        let revealedCell = getRevealedCell()
        if (revealedCell) {
            revealCellAndNeighbors(revealedCell.i, revealedCell.j)
        }
    } else {
        alert('No hints left')
    }

}
  
  function updateHintCounter() {

    const elHint = document.querySelectorAll('.hint')

    for (let i = 0; i < elHint.length; i++) {

      if (i >= remainingHints) {
        elHint[i].textContent = "🔒"
      } else {
        elHint[i].textContent = "💡"
      }
    }
  }

function hideHints() {
    const elHint = document.querySelectorAll('.hint')
  
    setTimeout(() => {
      for (let i = 0; i < elHint.length; i++) {
       
        elHint[i].classList.remove('hint')
        elHint[i].textContent = ''
      }
    }, 1000)
  }
  

  function getRevealedCell() {

    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                return { i, j };
            }
        }
    }
    return null
}


 
function revealCellAndNeighbors(i, j) {

    for (let di = i - 1; di <= i + 1; di++) {
      for (let dj = j - 1; dj <= j + 1; dj++) {

        if (di >= 0 && di < gBoard.length && dj >= 0 && dj < gBoard[0].length) {
        
          const neighborCell = gBoard[di][dj]
          const elCell = document.querySelector(`.cell-${di}-${dj}`)
  
          
          if (!neighborCell.isShown && !neighborCell.isMarked) {
            elCell.textContent = neighborCell.isMine
              ? '💣'  
              : (neighborCell.minesAroundCount || '')

          setTimeout(() => {
               elCell.textContent = ''
            }, 1000);
          }
        }
      }
    }
  }
  

function revealCell(i, j) {
    const cell = gBoard[i][j];
    const elCell = document.querySelector(`.cell-${i}-${j}`);
    
    if (!cell.isShown && !cell.isMarked) {
        elCell.classList.add('hint')

      elCell.textContent = cell.isMine
        ? '💣'  
        : (cell.minesAroundCount || '')  
      
      setTimeout(() => {
        elCell.classList.remove('hint')
        elCell.textContent = ''
      }, 1000)
    }
  }
  
