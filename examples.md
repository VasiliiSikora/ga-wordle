# Code Examples

## Checking if Real Word
```javascript
let kids = guesses[guessCounter].children
if (!validGuesses.includes(output)) {
    alert('Guess not valid try again!')
    for (let i=0; i<output.length; i++) {
        kids[i].innerText=""
    }
    output=""
    return
```


## Preventing Typing >5 letters
```javascript
//This if statement stops user from entering more letters after 5. 
    if (output.length == 5) {
        break
    }
    output += key;
```


## Keyboard Colouring
```javascript
//The following code changes the keyboard colours to the same as the guesses made this round. NOTE: This is permanent for the keyboard
    for (let i in randomAnswer) {
        for (let j=0; j<buttons.length; j++) {
            if (buttons[j].innerText.toUpperCase() == output[i]) {
                if (buttons[j].style.backgroundColor == 'green') {         
                } else if ((buttons[j].style.backgroundColor == 'gold') && (kids[i].style.backgroundColor == 'grey')){
                    continue
                } else {
                    buttons[j].style.backgroundColor = kids[i].style.backgroundColor
                }
            }     
        }
    }
```


## Typing with User Keyboard
```javascript
//The following code allows user to type using own keyboard instead of the onscreen keyboard.
document.addEventListener('keyup', function(e) {
    let keys = document.getElementsByClassName('key');
    let del = document.getElementById('del')
    for (let keyElement of keys) {
        if (e.key == keyElement.textContent) {
            let clickEvent = new Event('click')
            keyElement.dispatchEvent(clickEvent)
        } 
    } 
    //This code is separate to avoid triggering backspace several times
    if (e.key == 'Backspace') {
        let clickEvent = new Event('click')
        del.dispatchEvent(clickEvent)
    }

})
```


## Double Letters
```javascript
let greenCheck = output.slice() //This is now the users guess
   let colourCheck = [] //This will store remaining letters that arent green
   let answerCheck = [] //This stores the remaining letters in the answer that arent green yet that need to be checked for yellows

   // First Loop: Check for green letters and remove them from the 'Check' arrays
    randomAnswer = randomAnswer.toUpperCase()
    for (let i in greenCheck) {
        kids[i].innerText = output[i]
        if (greenCheck[i] == randomAnswer[i].toUpperCase()) {
            kids[i].style.backgroundColor = 'green'
            colourCheck[i] = ""
            answerCheck[i] = ""
        } else {
            colourCheck[i] = greenCheck[i]
            answerCheck[i] = randomAnswer[i]
        }
    }

    let remainingAnswer = answerCheck.slice() //This allows us to check remaining letters that havent turned green so that repeat letters in the guess dont go yellow unless they are repeated in the answer somewhere else. (e.g. guessing EATER for answer EASTS will turn first E green but second E grey)

    //Second Loop: Check for orange letters and remove them from the 'Check' arrays before setting remaining letters grey
    for (let i in colourCheck) {
        if (colourCheck[i] == "") {
            continue
        } else if ((remainingAnswer.includes(colourCheck[i]))) {
            kids[i].style.backgroundColor = 'gold'
            //The next two lines deal with guesses that have 2 of the same letters that are only included once in the Answer and both the letters in the guess are not in the right position (i.e. not green) e.g. Answer = space, Guess = lasso, without this code both s' in the guess would turn orange!
            remainingAnswer[remainingAnswer.indexOf(colourCheck[i])] = ""
            console.log(remainingAnswer)
        } else {
            kids[i].style.backgroundColor = 'grey'
        }
        kids[i].style.color = 'white'
    }
    //The following code changes the keyboard colours to the same as the guesses made this round. NOTE: This is permanent for the keyboard
    for (let i in randomAnswer) {
        for (let j=0; j<buttons.length; j++) {
            if (buttons[j].innerText.toUpperCase() == output[i]) {
                if (buttons[j].style.backgroundColor == 'green') {         
                } else if ((buttons[j].style.backgroundColor == 'gold') && (kids[i].style.backgroundColor == 'grey')){
                    continue
                } else {
                    buttons[j].style.backgroundColor = kids[i].style.backgroundColor
                }
            }     
        }
    }
```

## Win/Loss Conditions
```javascript
//Timeout function used to allow transition of colours before ending
    setTimeout(function () {
        for (let i in randomAnswer) {
            if (kids[i].style.backgroundColor == 'green') {
                winChecker++
            }
        }
        if (winChecker == 5) {
            //Use window.confirm to allow user to continue streak or restart streak
            const continueButton = window.confirm("Continue Streak?")
            if (continueButton) {
                streakCounter++;
                resetGrid();
            } else {
                streakCounter=0;
                resetGrid();
            }
            // alert(`You win! ${randomAnswer.toUpperCase()} was the word!`)
            // streakCounter++ //Add one to the streak if you win
            // resetGrid() //Reset the grid colouring for another round
            return
        } 
        output = ''
        guessCounter++
        if (guessCounter == 6) {
            alert(`You LOSE! ${randomAnswer.toUpperCase()} was the word!`)
            streakCounter = 0; //Reset the streak if you lose
            resetGrid() //Reset the grid colouring for another round
            return
        }
    }, 260)
```

## Dark/Light Modes
```javascript
let dark = document.querySelector('.darkMode');
function toggleDark() {
    if (dark.getAttribute('src') == 'moon.png') {
        dark.src = "sun.png"
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        document.body.querySelector('header').classList.remove('light')
        document.body.querySelector('header').classList.add('dark')
    } else {
        dark.src = "moon.png"
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        document.body.querySelector('header').classList.remove('dark')
        document.body.querySelector('header').classList.add('light')
    }

}
```

## Encoder
```javascript
//encoder to create jumbled alphabet
function encoderKEY() {
    let deCode = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let enCode = []
    let enCodedWord = ''
    for (let i = 0; i < 26; i++) {
        x = deCode[Math.floor(Math.random() * deCode.length)]
        deCode.splice(deCode.indexOf(x), 1)
        enCode[i] = x
    }
    return enCode
}


//encoder to encode a word with a jumbled alphabet
function encoderWORD(string, array) {
    let string2array = string.split('')
    let enCodedWord = ''
    let deCode = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (let letter in string2array) {
        let i = string2array[letter]
        let caps = i.toUpperCase()
        let deCodeCombine = deCode.join('')
    
        let index = deCode.indexOf(caps);
    
        let newLetter = array[index];
        enCodedWord = enCodedWord + newLetter;
    
    }
    return enCodedWord
}
```

## Win Sound Effects

```javascript
    if (winChecker == 5) {
        let winSound = new Audio("lightning.wav");
        winSound.play()
```

## Countdown Timer

```javascript
let countDown = document.getElementById('countdown');
    //Pull the current date and set 90s ahead to give countdown something to reduce
    let now = new Date()
    let time = now.getTime();
    let future = time + 180000;
    function startTimer() {
        now = new Date()
        time = now.getTime();
        future = time + 180000;
        streakCounter = 0;
        let currentStreak = document.getElementById('streak');
        currentStreak.innerText = `Current Streak: ${streakCounter}`
    }

    function updateTimer() {
        let newNow = new Date();
        
        let remainingTime = future - newNow;
        //Set conditions for timeout
        if (Math.ceil(remainingTime/1000) == 0) {
            countDown.innerText = 'OUTTA TIME'
            
            let currentStreak = document.getElementById('streak');
            currentStreak.innerText = `Current Streak: ${streakCounter}`
            alert(`Your Speedle streak was ${streakCounter}`)
            streakCounter = 0;
        } else {
            //Countdown, setTimeout as a recursive function to continuously redisplay number
            countDown.innerText = `Remaining Time: ${Math.ceil(remainingTime/1000)}s`
            setTimeout(updateTimer,1000)
            return (remainingTime/1000);
        }
    }
```