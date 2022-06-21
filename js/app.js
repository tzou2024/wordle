const board = document.getElementById('board')
const titleContainer = document.getElementById('title-container')
const startGameButton = document.getElementById('start-game-button')
const container = document.getElementById('container')
const keyboardContianer = document.getElementById('keyboard-container')
const keyboard = document.getElementById('keyboard')
let word

let row = 0;
let element = 0;

let lettercount = 5
let guesscount = 6

function onWordCatchFailure(){
    console.log("wordGeneratorError")
}


function generateWord() {
    return fetch(`https://random-word-api.herokuapp.com/word?length=${lettercount}`).then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}

function getRandomWord(){
    generateWord().then(function(result) {
        //console.log(result)
        word = result[0].toUpperCase();
    })
}




function generateBoxes() {
    console.log('starting')
    for(let i=0;i<(lettercount * guesscount);i++){
        let box = document.createElement('div')
        box.classList.add('box')
        box.classList.add(`row-${Math.floor(i/lettercount)}`)
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
            gameControl(event, keyButton.id)
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
    getRandomWord()
}

function collectGuess(){
    let guessRow = document.getElementsByClassName(`row-${row}`)
    //console.log(guessRow)
    let myguess = ""
    for(let i = 0;i<lettercount;i++){
        myguess = myguess + guessRow[i].innerText
    }
    return myguess
}

function notEnoughLetters(){
    console.log("Not Enough Letters")
}

function compareWords(guess){
    console.log(guess[0].word.toUpperCase())
    let parsedguess = guess[0].word.toUpperCase()
    for(let i=0;i<parsedguess.length;i++){
        //console.log(guess[i],word[i])
        if(parsedguess[i] == word[i]){
            let checkingKey = document.getElementById(`${row * lettercount + i}`)
            checkingKey.style.backgroundColor = "green"
            checkingKey.style.color = "white"
            checkingKey.style.borderStyle = "hidden"

        }
        else if(word.split("").includes(parsedguess[i])){
            let checkingKey = document.getElementById(`${row * lettercount + i}`)
            checkingKey.style.backgroundColor = "yellow"
            checkingKey.style.color = "white"
            checkingKey.style.borderStyle = "hidden"
        }
        else{
            let checkingKey = document.getElementById(`${row * lettercount + i}`)
            checkingKey.style.backgroundColor = "red"
            checkingKey.style.color = "white"
            checkingKey.style.borderStyle = "hidden"

        }
    }
    row++
    element = 0
    
}

function checkWord(guess){
    if(guess.length != lettercount){
        notEnoughLetters()
    }
    else{

    // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
    // .then(res=>res.json())
    // .then(data=>{
    //     console.log(data[0])
    // })

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`) //1️⃣ 
    .then(function(response) {// 2️⃣ 
        if (!response.ok) {// 3️⃣ 
            throw Error(response.statusText);//4️⃣ 
        }
        return response.json();
    }).then(function(response) {
        compareWords(response)
       // console.log(response)
        //console.log('200 - ok');
    }).catch(function(error) { //5️⃣ 
        console.log('404 Not Found : '+ error);// 6️⃣ 
    });
}
}

function gameControl(event, keyLabel){
    let currKey
    //console.log(currKey)
    switch(keyLabel){
        case "BACK":
            if(element > 0){element = element - 1}
            currKey = document.getElementById(row * lettercount + element)
            currKey.innerText = ""
            currKey.style.borderColor = "rgb(160, 160, 167)"
            //console.log("AFTER", element)
            break
        case "ENTER":
            let guess = collectGuess()
            checkWord(guess)
            break
            
        default:
            if(element > 4){
                break
            }
            else{
            currKey = document.getElementById(row * lettercount + element)
            currKey.style.borderColor = "black"
            currKey.innerText = keyLabel
            element = element + 1
            }
           // console.log("AFTER", element)
    }
}

startGameButton.addEventListener('click',
    startSequence
 )





