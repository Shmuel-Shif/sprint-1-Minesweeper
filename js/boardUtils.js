'use strict'



function buildBoard(size) {
    
    var board = []
    
    for (let i = 0; i < size; i++) {
        
        let row = [];
        
        for (let j = 0; j < size; j++) {
            
            row.push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            })
        }
        
        board.push(row)
    }
    return board
}

function renderBoard(mat, selector) {
    
    let strHTML = `<table><tbody>`
    
    for (let i = 0; i < mat.length; i++) {
        
        strHTML += `<tr>`
        
        for (let j = 0; j < mat[0].length; j++) {
            
            const className = `cell cell-${i}-${j}`
            
            strHTML += `<td class="${className}"
                         onclick="onCellClicked(this, ${i}, ${j})"
                         oncontextmenu="onCellMarked(this, ${i}, ${j}); 
                         return false;">
                         </td> `
        }
        strHTML += `</tr>`;
    }
    
    strHTML += `</tbody></table>`
    
    const elSelector = document.querySelector(selector)
    elSelector.innerHTML = strHTML
    console.log('Matrix:', mat)
}

function getBoardConfig(level ='beginner') {

  if (level !== 'beginner' && level !== 'medium' && level !== 'expert') {
    console.error('Invalid level:', level)
    level = 'beginner'
  }
    switch (level) {
      case 'beginner':
        return { size: 4, minesCount: 2 }
      case 'medium':
        return { size: 8, minesCount: 14 }
      case 'expert':
        return { size: 12, minesCount: 32 }
      default:
        return { size: 4, minesCount: 2 }
    }
}

function toggleSound() {

  const music = document.querySelector('.background-music');
  const button = document.querySelector('.toggle-sound-btn');
   
  
  if (music.paused) {
    music.play()
    button.textContent = '🔊'  
  } else {
    music.pause();
    button.textContent = '🔇'
  }
}

function toggleDarkMode() {

  const body = document.body
  const button = document.querySelector('.toggle-dark-mode-btn')
  

  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode')
    button.textContent = '🌙'
  } else {
    body.classList.add('dark-mode')
    button.textContent = '☀️'
  }
}
