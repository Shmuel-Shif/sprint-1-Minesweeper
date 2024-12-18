'use strict'

function buildBoard() {
    
    const SIZE = 3
    var board = []
    
    for (let i = 0; i < SIZE; i++) {
        
        let row = [];
        
        for (let j = 0; j < SIZE; j++) {
            
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
            
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            console.log(mat);
            
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
    // console.log('Matrix:', mat)
}
