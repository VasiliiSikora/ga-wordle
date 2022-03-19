/* 
Pseudo Code:
Writing to the Boxes
select set of boxes 
    let guesses = document.getElementsByClassName('guess')
This will pull all sets of 5 boxes
    guesses[0] should give the first set of boxes
Will want to do this for each guess to pull the next set of boxes
keyboard does an output offscreen
take each letter capitalise, and place it in the box
    guesses[0][0] = keyboardentry[0]
Disallow typing >5 letters
This way backspacing will still work if the function just constantly 
    updates on keypress

Colouring
On pressing enter (with 5 letter word typed in):
- do answer.includes(letter)
- if includes letter -> orange
- if doesnt include letter -> grey
- if includes letter and index is the same in both guess and answer make green

NOTE: apply same rules to the keyboard

??? What to do about double letters ???
- if letter already is in answer follow colouring rules
- if same letter repeated need to check:
    Does letter show twice in answer?
    If Guess has >2 same letters 
    - apply colouring rules but if yellow or green for 2 put grey for rest
    - this requires empty array that greens/yellows can be saved to
    --- Then can check if been 2 for a letter already


*/






let answer = "chief" // This needs to randomly select from array
let guesses = document.getElementsByClassName('guess');
let thisGuess = document.getElementById('guessText') //Will need to add to HTML
let enterButton = document.getElementById('enter')



let guessCounter = 0
enterButton.addEventListener('click', function() { //Will need to add to HTML (keyboard)
    let kids = guesses[guessCounter].children
    console.log(thisGuess.value)
    for (let i in thisGuess.value) {
        console.log(i)
        console.log(kids[i])
        kids[i].innerText = thisGuess.value[i]
        if (answer.includes(thisGuess.value[i])) {
            if (thisGuess.value[i] == answer[i]) {
                kids[i].style.backgroundColor = 'green'
            } else {
                kids[i].style.backgroundColor = 'gold'
            }
            
        } else {
            kids[i].style.backgroundColor = 'grey'
        }
    }

    guessCounter++
})

//Below is the code for the keyboard functionality
let output = document.getElementById('guessText');
let keys = document.getElementsByClassName('key');
for (let keyElement of keys) {
    let key = keyElement.textContent;
    keyElement.addEventListener('click', function() {
        switch (key) {
            case '␡':
                output.textContent = output.textContent.slice(0, output.textContent.length-1);
                break;
            case 'DEL all':
                output.textContent = '';
                break;
            default:
                output.textContent += key;
        }
    });
}