const words = ["hello", "never", "bullet", "spring", "summer",
    "fall", "winter", "game", "book store", "call of duty", "mother", "fortnite", "playstation",
    "xbox", "dybala", "laptop", "paper tissue", "parking", "meraj", "soltan kaveh", "sag to meraj"];

let chances = 0;
let usedLetters = [];
let usedFlag = 0;

const display = document.querySelector(".clue");
const playerStatus = document.querySelector(".status");
const image = document.querySelector(".guy img");

// get random number
function getRandom(array) {
    let randomNumber = Math.floor(Math.random() * 1000) % array.length;
    return randomNumber;
}

//set blank (_) based on random word
function setBlanks(word) {
    let blankWords = "";
    let splitedword = word.split(" ");
    let blank = "", finalBlank = "";

    for (let i = 0; i < splitedword.length; i++) {
        for (let j = 0; j < splitedword[i].length; j++) {
            blank += "_";
        }
        blankWords = splitedword[i].replace(splitedword[i], blank);
        blank = "";
        finalBlank += (blankWords + " ");
    }
    finalBlank = finalBlank.trim();
    console.log(word);
    display.innerText = finalBlank;
    return finalBlank;
}

//function to set correct letters in blank word
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

//click function - check every letters in word and put user input in it
function clickLetters(inputLetter) {
    let input = "";
    usedLetters.forEach(item => item.includes(inputLetter) ? usedFlag = 1 : usedFlag = 0);
    if (chances < 6 && usedFlag == 0) {
        input = (inputLetter).toLowerCase();
        usedLetters.push(inputLetter);
        document.getElementById(inputLetter).className = "clicked";
    }
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
        playerStatus.innerText = "YOU WIN Mother fuckka";
        image.src = "./images/assets/winner.png";
    }
}

let randomNumber = getRandom(words);  // get a random number for choosing random word in the range of our array
let randomWord = words[randomNumber];  // choose a word from array based on random number

let blankWord = setBlanks(randomWord);

const letters = document.querySelectorAll(".letters div");
letters.forEach(element => element.addEventListener("click", (event) => clickLetters(event.target.innerText)));
window.addEventListener("keydown", (event) => clickLetters(event.key))



