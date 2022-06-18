const board = document.getElementById('board')
const titleContainer = document.getElementById('title-container')
const startGameButton = document.getElementById('start-game-button')
const container = document.getElementById('container')

function generateBoxes() {
    console.log('starting')
    for(let i=0;i<30;i++){
        let box = document.createElement('div')
        box.classList.add('box')
        box.classList.add(`row-${Math.floor(i/5)}`)
        box.setAttribute('id',`${i}`)
        board.appendChild(box)
    }
    startGameButton.style.display = "none"
    container.style.height = "100%"
}

startGameButton.addEventListener('click', generateBoxes)