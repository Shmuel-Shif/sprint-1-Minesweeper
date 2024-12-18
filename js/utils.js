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
            // console.log(mat);
            
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

function getBoardConfig(level) {
    switch (level) {
      case 'beginner':
        return { size: 4, minesCount: 2 };
      case 'medium':
        return { size: 8, minesCount: 14 };
      case 'expert':
        return { size: 12, minesCount: 32 };
      default:
        console.error('Invalid level:', level);
        return { size: 4, minesCount: 2 }; 
    }
  }
