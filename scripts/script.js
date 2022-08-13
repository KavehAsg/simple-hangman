const words = ["hello", "never", "bullet", "spring", "summer",
    "fall", "winter", "game", "book store", "call of duty", "mother", "fortnite", "playstation",
    "xbox", "laptop", "paper tissue", "parking"];


let chances = 0;
let usedLetters = [];
let usedFlag = 0;

const display = document.querySelector(".clue");
const playerStatus = document.querySelector(".status p");
const image = document.querySelector(".display img");
const letters = document.querySelectorAll(".letters div");
const reset = document.querySelector(".reset-btn");


// get random number based on number of words
function getRandom(array) {
    let randomNumber = Math.floor(Math.random() * 1000) % array.length;
    return randomNumber;
}

//set blank (_) based on random word
function setBlanks(word) {
    let blankWords = [];
    let splitedword = word.split("");

    for (let item of splitedword) {
        if (item === " ") {
            blankWords.push(" ");
        } else {
            blankWords.push("_");
        }
    }

    let finalBlank = blankWords.join('');
    console.log(word);
    display.innerText = finalBlank;
    return finalBlank;
}

//function to set correct letters in blank word
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

//click function - set clicked styles and disable used ones
function clickLetters(inputLetter) {
    usedLetters.includes(inputLetter) ? usedFlag = 1 : usedFlag = 0;
    if (chances < 6 && usedFlag == 0) {
        usedLetters.push(inputLetter);
        document.getElementById(inputLetter).className = "clicked";
        checkLetter(inputLetter.toLowerCase());
    }
}

// check the input letter if it is correct or not
function checkLetter(input) {
    if (randomWord.includes(input)) {
        for (let i = 0; i < randomWord.length; i++) {
            if (input === randomWord[i]) {
                blankWord = setCharAt(blankWord, i, input);
            }
        }
        display.innerText = blankWord;
    } else {
        chances++;
        image.src = `./images/assets/hangman${chances}.png`;
    }

    if (blankWord === randomWord) {
        playerStatus.innerText = "YOU WIN";
        image.src = "./images/assets/winner.png";
    } else if (chances == 6) {
        playerStatus.innerText = ":(";
    }
}

function resetGame(){
    chances = 0;
    usedLetters = [];
    usedFlag = 0;
    randomNumber = getRandom(words);
    randomWord = words[randomNumber]; 
    blankWord = setBlanks(randomWord);
    playerStatus.innerText = "Choose any letter you think is correct";
    image.src = "./images/assets/hangman0.png";
    letters.forEach(item => item.classList.remove("clicked"));
}

let randomNumber = getRandom(words);  // get a random number for choosing random word in the range of our array
let randomWord = words[randomNumber];  // choose a word from array based on random number
let blankWord = setBlanks(randomWord);

letters.forEach(element => element.addEventListener("click", (event) => clickLetters(event.target.innerText.toUpperCase())));
window.addEventListener("keydown", (event) => { // keyboard event listener
    let input = event.key.toUpperCase();
    letters.forEach(letter => {
        if (letter.innerText == input) {
            clickLetters(input);
        }
    })
});

reset.addEventListener("click", resetGame);



