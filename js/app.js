const board = document.getElementById('board')
const titleContainer = document.getElementById('title-container')
const startGameButton = document.getElementById('start-game-button')
const boardContainer = document.getElementById('board-container')
const container = document.getElementById('container')
const keyboardContianer = document.getElementById('keyboard-container')
const infoContainer = document.getElementById('info-container')
const scoresContainer = document.getElementById('scores-container')
const keyboard = document.getElementById('keyboard')
const info = document.getElementById("info")
const stats = document.getElementById("stats")
const reset = document.getElementById("reset")
const lightning = document.getElementById("lightning")
const timeyContainer = document.getElementById("timeycontainer")
const slideandstart = document.getElementById("slideandstart")
const slidey = document.getElementById("slidey")




let word

let timestart = 30;
let timeyflag = false;
let row = 0;
let element = 0;
let intervalCount;

let lettercount = 5
let guessCount = 6

let scores = {
    p1_score: 0,
    p2_score: 0,
    p1_turn: true
}

slidey.oninput = function(){
    lettercount = this.value 
    document.documentElement.style
    .setProperty('--main-setup', `repeat(${lettercount}, 1fr)`);
}

function onWordCatchFailure(){
    console.log("wordGeneratorError")
    alert("not a word!")
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
        console.log("word is: ", word)
    })
    setTimeout(()=>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`) //1️⃣ 
    .then(function(response) {// 2️⃣ 
        if (!response.ok) {// 3️⃣ 
            throw Error(response.statusText);//4️⃣ 
        }
        console.log("Fetching", word)
        return response.json();
    }).then(function(response) {
        console.log(response)
        console.log("All good!")
    }).catch(function(error) { //5️⃣ 
        console.log('404 retry : '+ error);// 6️⃣ 
        getRandomWord()
    })}, 500);
}




function generateBoxes() {
    console.log('starting')
    for(let i=0;i<(lettercount * guessCount);i++){
        let box = document.createElement('div')
        box.classList.add('box')
        box.classList.add(`row-${Math.floor(i/lettercount)}`)
        box.setAttribute('id',`${i}`)
        board.appendChild(box)
    }
    slideandstart.style.display = "none"
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


function showPlayer(){
    let p1 =  document.getElementById("player1")
    let p2 =  document.getElementById("player2")
    p1.style.display = "block"
    p2.style.display = "block"
}

function updatePlayer(){
    let p1 =  document.getElementById("player1")
    let p2 =  document.getElementById("player2")
    if (scores.p1_turn){
        p1.style.color = "black"
        p2.style.color = "bisque"
    }
    else{
        p2.style.color = "black"
        p1.style.color = "bisque"
    }
}

function startSequence() {
    generateBoxes()
    generateKeyboard()
    keyLog()
    getRandomWord()
    showPlayer()
    updatePlayer()
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
    alert("Not enough letters")
}

function colorin(element,color){
    element.style.backgroundColor = color
    element.style.color = "white"
    element.style.borderStyle = "hidden"
    let buttoner = document.getElementById(`${element.innerText}`)
    buttoner.style.backgroundColor = color
    buttoner.style.color = "white"

}

function resetBoard(){
    let boxes = document.getElementsByClassName("box")
    for (box of boxes){
        box.innerText = ""
        box.style.color= "rgb(0, 0, 0)"
        box.style.border = "3px solid rgb(160, 160, 167)"
        box.style.backgroundColor = "rgba(0, 0, 0, 0.0)"
    }

    let keys = document.getElementsByClassName("key")
    for(key of keys){
        key.style.backgroundColor = "#D3D6DA"
        key.style.color = "black"
    }
    row = 0
    element = 0
    getRandomWord()
    stopCountdown()
    if(timeyflag){
        timeyflag = !timeyflag
        stressin()
    }
    
}

reset.addEventListener('click', resetBoard)

function compareWords(guess){
    console.log(guess[0].word.toUpperCase())
    let parsedguess = guess[0].word.toUpperCase()
    let checkcorrect = 0;
    for(let i=0;i<parsedguess.length;i++){
        //console.log(guess[i],word[i])
        if(parsedguess[i] == word[i]){
            let checkingKey = document.getElementById(`${row * lettercount + i}`)
            setTimeout(colorin,(i+1) * 500,checkingKey,"rgb(106,170,100)")
            checkcorrect = checkcorrect + 1
            

        }
        else if(word.split("").includes(parsedguess[i])){
            let checkingKey = document.getElementById(`${row * lettercount + i}`)
            setTimeout(colorin,(i+1)*500,checkingKey, "rgb(201,180,89)")
           
        }
        else{
            let checkingKey = document.getElementById(`${row * lettercount + i}`)
            setTimeout(colorin,(i+1)*500,checkingKey, "rgb(120,124,126)")
            
        }
    }

    if (checkcorrect == parsedguess.length){
        if(scores.p1_turn){
            scores.p1_score = scores.p1_score + 1
        }
        else{
            scores.p2_score = scores.p2_score + 1
        }
        //resetBoard()
        row = guessCount + 1
        scores.p1_turn = !(scores.p1_turn)
        clearInterval(intervalCount)
    }

    scores.p1_turn = !(scores.p1_turn)
    setTimeout(updatePlayer,(parsedguess.length+1) * 520)
    ++row
    setTimeout(()=>{timestart = 30},(parsedguess.length+1) * 520)
    element = 0
    if(row >= guessCount){
        
        setTimeout(()=>{
            stopCountdown()
            alert("Round Over! Reset")
        },(parsedguess.length+1) * 520)
    }
    
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
        onWordCatchFailure()
    });
}
}

function gameControl(event, keyLabel){

    let currKey
    if (row > guessCount){
        alert("it's over, click reset icon to keep playing")
        return 0
    }
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
            if(element > lettercount - 1){
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

 function displayStats(){
     let scoreBox = document.getElementById("scorebox")
     let scoresContainer = document.getElementById("scores-container")
     boardContainer.style.display = "none"
     titleContainer.style.display = "none"
     keyboardContianer.style.display = "none"
     scoresContainer.style.display = "block"
     infoContainer.style.display = "none"
     timeyContainer.style.display = "none"
     slideandstart.style.display = "none"
     

     
     let oneScore = document.getElementById("oneScore")
     let twoScore = document.getElementById("twoScore")

     oneScore.innerText = `Player One Score: ${scores.p1_score}`
     twoScore.innerText = `Player Two Score: ${scores.p2_score}`

     document.getElementById("score-to-game-button").addEventListener('click',returnToGame)

 }


 function displayInfo(){
    boardContainer.style.display = "none"
    titleContainer.style.display = "none"
    keyboardContianer.style.display = "none"
    scoresContainer.style.display = "none"
    infoContainer.style.display = "block"
    timeyContainer.style.display = "none"
    slideandstart.style.display = "none"
    

    
    let oneScore = document.getElementById("oneScore")
    let twoScore = document.getElementById("twoScore")

    oneScore.innerText = `Player One Score: ${scores.p1_score}`
    twoScore.innerText = `Player Two Score: ${scores.p2_score}`

    document.getElementById("info-to-game-button").addEventListener('click',returnToGame)

}

 function returnToGame(){
    if(timeyflag){
        timeyContainer.style.display="block"
    }
    let scoresContainer = document.getElementById("scores-container")
    scoresContainer.style.display = "none"
    boardContainer.style.display = "flex"
    titleContainer.style.display = "block"
    keyboardContianer.style.display = "block"
    infoContainer.style.display = "none"
 }



 function stressin(){
     let timestart = 30
    timeyflag = !timeyflag
    if(timeyflag){
        startCountdown()
        timeyContainer.style.display = "block"
        intervalCount = setInterval(startCountdown, 1000)
    }
    else{
        timeyContainer.style.display = "none"
        stopCountdown()
    }

    
 }

 function stopCountdown(){
     if(intervalCount){
        clearInterval(intervalCount)
     }
     
     timestart = 30
 }

 function startCountdown(){
    document.getElementById("timeface").innerText = `time: ${timestart}`
     
     if(timestart == 0){
         alert("tooslow!")
         scores.p1_turn = !scores.p1_turn 
        updatePlayer()
        timestart = 30
     }
     timestart = timestart - 1
     
    
 }

lightning .addEventListener('click', stressin)
stats.addEventListener('click',displayStats)
info.addEventListener('click', displayInfo)




