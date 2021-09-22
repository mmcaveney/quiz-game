// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!

let clues = []
let cluesIndex = 0
let score = 0
let answer = ""
let scoreDisplay = document.getElementById("score")
let userAnswer = document.querySelector("#answer_input").value = ""
let categoryId
let questionDisplay = document.getElementById("question")
let categoryDisplay = document.getElementById("category")
let randomIndex = 0
let submitAnswer = document.getElementById("submit_button")
let nextQuestion = document.getElementById("next_button")
let resultArea = document.getElementById("result")
let reset = document.getElementById("reset_button")
scoreDisplay.append(score)
// function fetchClues(){
getQuestions()
function getQuestions(){
fetch(`https://jservice.io/api/random`)
    .then(response => response.json())
    .then(random => {

        fetch(`https://jservice.io/api/clues?category=${random[0].category_id}`)
            .then(response => response.json())
            .then(data => {
                clues.push(data)

                scoreDisplay.innerText = `score:${score}`
                categoryDisplay.innerText = data[0].category.title
                questionDisplay.innerText = data[0].question
                answer = data[0].answer
                console.log(clues)
            })

    })

}






nextQuestion.addEventListener("click", goNext)

function goNext(event) {
    event.preventDefault
    randomIndex = Math.floor(Math.random() * clues[0].length)
    let question = clues[0][randomIndex].question
    questionDisplay.innerText = question
    answer = clues[0][randomIndex].answer
    console.log(answer)
}




submitAnswer.addEventListener("click", function (event) {
    event.preventDefault()
    checkAnswer()
})

function userInput() {

    let userAnswer = document.querySelector("#answer_input").value.toLowerCase()
    return userAnswer
    console.log(userAnswer)
}

function checkAnswer() {

    let rightAnswer = answer.toLowerCase()
    if (rightAnswer === userInput()) {
        resultArea.innerText = "Correct"

        score += 1
        scoreDisplay.innerHTML = `score: ${score}`
    } else {
        resultArea.innerText = "Incorrect"

        score = 0
        scoreDisplay.innerHTML = `score: ${score}`
        setTimeout(getQuestions, 2000)
    }
}


reset.addEventListener("click", resetGame)
function resetGame(event) {
    event.preventDefault
  getQuestions()
  score = 0
    
}









