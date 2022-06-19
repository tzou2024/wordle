const board = document.getElementById('board')
const titleContainer = document.getElementById('title-container')
const startGameButton = document.getElementById('start-game-button')
const container = document.getElementById('container')
const keyboardContianer = document.getElementById('keyboard-container')
const keyboard = document.getElementById('keyboard')

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
const keys = [
    ['Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P'],
    ['A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L'],
    ['ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'back']
]

function generateKeyboard(){
    keys.forEach(row => {
        const keyRow = document.createElement('div')
        keyRow.classList.add('keyRow')
        row.forEach(key =>{
        
        const keyButton = document.createElement('button')
        keyButton.innerText = key
        keyButton.setAttribute('id', key)
        keyButton.classList.add('key')
        keyButton.addEventListener('click', () =>{
            console.log(key)
        })
        keyRow.appendChild(keyButton)
        })
        keyboard.appendChild(keyRow)
    })
    const back = document.getElementById('back')
    back.innerText = ""
    
    back.innerHTML = `<i class="material-icons">&#xe14a;</i>`
}

function startSequence() {
    generateBoxes()
    generateKeyboard()
}


startGameButton.addEventListener('click',
    startSequence
 )





