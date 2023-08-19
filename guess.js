let input = document.querySelector("#input")
let startOver = document.querySelector("#startOver")
let tellMe = document.querySelector("#tellMe")
let lowerBoundInput = document.querySelector("#lowerBound")
let upperBoundInput = document.querySelector("#upperBound")
let skip = document.querySelector("#skip")
let rangeError = document.querySelector("#rangeError")
let guessingError = document.querySelector("#guessingError")
let guessingBody = document.querySelector(".guessingBody")
let rangeBody = document.querySelector(".rangeBody")
let guessingBrief = document.querySelector(".guessingBrief")
let info = document.querySelector(".info")
info.style.textAlign = 'center'
let result = document.querySelector("#result")
let too_high_arr = ['Your guess is too high. Try and lower it.', 'Your number seems to be too high. Try lowering it.', 'Your guess is greater than the right number. Try a smaller number.', 'Oh no! Your number is too high.']
let too_low_arr = ['Your guess is too low. Try and higher it.', 'Your number seems to be too low. Try highering it.', 'Your guess is smaller than the right number. Try a greater number.', 'Oh no! Your number is too low.']

lowerBoundInput.focus()
let lowerBound, upperBound, guessedNum, correctNum;
let numOfGuesses = 0

lowerBoundInput.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        if (lowerBoundInput.value === '') {
            lowerBoundInput.style.border = "1px solid red"
            error(rangeError)
        }
        else if (lowerBoundInput.value !== '' && upperBoundInput.value !== '') {
            display()
        }
        else {
            lowerBoundInput.style.border = "transparent"
            upperBoundInput.focus()
        }
        console.log(lowerBoundInput.value)
    } else if (event.keyCode == 39) {
        upperBoundInput.focus()
    }
})
upperBoundInput.addEventListener("keyup", (event) => {
    if (event.keyCode == 13){
        if (upperBoundInput.value === '') {
            upperBoundInput.style.border = "1px solid red"
            error(rangeError)
        } else if (lowerBoundInput.value === '') {
            lowerBoundInput.style.border = "1px solid red"
            error(rangeError)
            lowerBoundInput.focus()
        }
        else if (lowerBoundInput.value !== '' && upperBoundInput.value !== '') {
            display()
        }
        if (upperBoundInput.value != '') {
            upperBoundInput.style.border = "transparent"
        }
    } else if (event.keyCode == 37) {
        lowerBoundInput.focus()
    } else if (event.keyCode == 39) {
        skip.focus()
    }
})
skip.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        lowerBound = 1
        upperBound = 10
        guess(lowerBound, upperBound)
        rangeBody.style.display = "none"
        guessingBody.style.display = "flex"
        input.focus()
    }
})
skip.addEventListener("click", () => {
    lowerBound = 1
    upperBound = 10
    guess(lowerBound, upperBound)
    rangeBody.style.display = "none"
    guessingBody.style.display = "flex"
    input.focus()
})
startOver.addEventListener("click", () => {
    location.reload()
})
startOver.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        location.reload()
    }
})


function display() {
    if (Number(lowerBoundInput.value) > Number(upperBoundInput.value)) {
        lowerBound = Number(upperBoundInput.value)
        upperBound = Number(lowerBoundInput.value)
    } else {
        lowerBound = Number(lowerBoundInput.value)
        upperBound = Number(upperBoundInput.value)
    }
    rangeBody.style.display = "none"
    guessingBody.style.display = "flex"
    guess(lowerBound, upperBound)
    input.focus()
}
function error(target) {
    target.innerHTML = "Input can't be empty. Please enter a number."
}
function guess(lowerBound, upperBound){
    correctNum = Math.round((Math.random() * (upperBound - lowerBound) + lowerBound))
    input.focus()
    guessingBrief.innerHTML = `Now, the game begins. You are to guess a number I have in mind. <br> The number is between <strong> ${lowerBound} </strong> and <strong> ${upperBound} </strong>. <br> If you wish to start over, press the 'start over' and if you wish to know the number, press the 'tell me the number' button. You'll be guided through out the guessing process until you guess the number right. Good luck!`
    console.log(lowerBound, upperBound)
    console.log(correctNum)
    input.addEventListener('keyup', (event) => {
        if (event.keyCode == 13) {
            if (input.value === ''){
                input.style.border = '1px solid red'
                error(guessingError)
            } else {
                numOfGuesses += 1
                input.style.border = 'transparent'
                guessingError.innerHTML = ""
                guessedNum = input.value
                input.value = ''
                if (guessedNum > correctNum) {
                    info.innerHTML = ''
                    info.innerHTML = too_high_arr[Math.round(Math.random() * 3)]
                } else if (guessedNum < correctNum) {
                    info.innerHTML = ''
                    info.innerHTML = too_low_arr[Math.round(Math.random() * 3)]
                } else if (guessedNum == correctNum) {
                    document.querySelector(".head").style.display = 'none'
                    info.innerHTML = `Congratulations! You guessed the number right!! It took you ${numOfGuesses} guess${numOfGuesses > 1 ? 'es.':'.'}`
                    info.style.fontSize = "1.3em"
                    info.style.fontWeight = "900"
                    startOver.innerHTML = 'START A NEW GAME'
                    startOver.focus()
                    tellMe.style.display = 'none'
                    guessingBrief.style.display = 'none'
                    input.style.display = 'none'
                }
            }
        }
    })
}
tellMe.addEventListener("click", () => {
    info.innerHTML = `Too bad you gave up. The number was ${correctNum}.`
    tellMe.style.display = 'none'
    startOver.innerHTML = 'START A NEW GAME'
    startOver.focus()
    input.style.display = 'none'
    guessingBrief.style.display = 'none'
})