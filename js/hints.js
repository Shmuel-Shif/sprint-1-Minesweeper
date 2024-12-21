'use strict'


let remainingHints = 3

function giveHint() {
  if (remainingHints > 0) {
      remainingHints--  
      updateHintCounter()

      let lastClickedCell = getLastClickedCell()  
      if (lastClickedCell) {
          revealCellAndNeighbors(lastClickedCell.i, lastClickedCell.j) 
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

    if (gGame.shownCount === gGame.minesCount) {
      updateSmiley('win')
    }
  
    
    if (gGame.lives === 0) {
      updateSmiley('lose')
    }
}

function updateSmiley(state) {

  const smileyButton = document.querySelector('.restart-Game')

  switch (state) {
    case 'win':
      smileyButton.textContent = '😎'
      break;
    case 'lose':
      smileyButton.textContent = '🤯'
      break;
    default:
      smileyButton.textContent = '😀'
  }
}