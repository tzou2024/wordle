const board = document.getElementById('board')
const titleContainer = document.getElementById('title-container')
const startGameButton = document.getElementById('start-game-button')
const container = document.getElementById('container')
const keyboardContianer = document.getElementById('keyboard-container')
const keyboard = document.getElementById('keyboard')

let row = 0;
let element = 0;

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
    'BACK']
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
            //console.log(keyButton.id)
            gameControl(keyButton.id)
        })
        keyRow.appendChild(keyButton)
        })
        keyboard.appendChild(keyRow)
    })
    const back = document.getElementById('BACK')
    back.innerText = ""
    
    back.innerHTML = `<i class="material-icons">&#xe14a;</i>`
}

function keyLog(){
    document.addEventListener('keypress', (event) => {
        var name = event.key;
        keys.forEach(list=>{
            if(list.includes(name.toUpperCase())){
                //console.log("Registered")
                keyboardkey= document.getElementById(`${name.toUpperCase()}`)
                //console.log(keyboardkey)
                keyboardkey.click()
            }
        })
      }, false);
    document.addEventListener('keydown', (event) =>{
        var name = event.key
        if (name == 'Backspace'){
            document.getElementById('BACK').click()
        }
    })
}

function startSequence() {
    generateBoxes()
    generateKeyboard()
    keyLog()
}

function gameControl(keyLabel){
    let currKey
    console.log(currKey)
    switch(keyLabel){
        case "BACK":
            if(element > 0){element = element - 1}
            currKey = document.getElementById(row * 5 + element)
            currKey.innerText = ""
            console.log("AFTER", element)
            
            break
        default:
            currKey = document.getElementById(row * 5 + element)
            currKey.innerText = keyLabel
            element = element + 1
            console.log("AFTER", element)
    }
}

startGameButton.addEventListener('click',
    startSequence
 )





