'use strict'

function buildBoard() {

  const SIZE = 10
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

// renderBoard(board, ".board-container");

function renderBoard(mat, selector) {

  let strHTML = `<table><tbody>`

  for (let i = 0; i < mat.length; i++) {

    strHTML += `<tr>`

    for (let j = 0; j < mat[0].length; j++) {
        
      const cell = mat[i][j]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}"
                  onclick="onCellClicked(this, ${i}, ${j})"
                  oncontextmenu="onCellClicked(this, ${i}, ${j}); 
                  return false;">
                  </td> `
    }
    strHTML += `</tr>`;
  }
  strHTML += `</tbody></table>`

  const elSelector = document.querySelector(selector)
  elSelector.innerHTML = strHTML
}
