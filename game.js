const url = "https://the-trivia-api.com/api/questions";

const questionDisplay = document.querySelector("#question");
const optionsDisplay = document.querySelector("#options");

const questionOnDisplay = document.querySelector("#question-on");
const scoreDisplay = document.querySelector("#score");

let numOfQuestions = localStorage.getItem("numOfQuestions");
localStorage.removeItem("numOfQuestions");
if (!numOfQuestions) {
    window.location.href = "index.html";
}

let score; 
let questions; 
let currentQuestion; 
let currentQuestionOptions; 
let questionCounter; 
let acceptingAnswers = false;
let SCORE_POINTS = 100;

fetch(`${url}?limit${numOfQuestions}&difficulty=easy`, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
        questions = data;
        startGame();
    })
    .catch((err) => console.log(err));

function startGame() {
    score = 0;
    questionCounter = 0;

    getNextQuestion();
    updateDisplay();
}

function getNextQuestion() {
    currentQuestion = questions[questionCounter];
    // this gets all the questions options in an array and shuffles them to be in random order
    currentQuestionOptions = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers].sort(function () {
        return Math.random() - 0.5;
    });
    console.log(currentQuestion);

    questionDisplay.innerText = currentQuestion.question;
    currentQuestionOptions.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("btn", "btn-primary", "btn-lg");
        optionButton.textContent = option;

        optionsDisplay.append(optionButton);

        optionButton.addEventListener("click", (e) => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;

            const selectedAnswer = e.target;
            if (selectedAnswer.innerText === currentQuestion.correctAnswer) {
                score += SCORE_POINTS;
                updateDisplay();
                selectedAnswer.classList.replace("btn-primary", "btn-success");
                setTimeout(() => {
                    questionCounter++;
                    checkEnd();
                }, 1500);
            } else {
                selectedAnswer.classList.replace("btn-primary", "btn-danger");
                setTimeout(() => {
                    questionCounter++;
                    checkEnd();
                }, 1500);
            }
        });
    });

    acceptingAnswers = true;
}

function updateDisplay() {
    questionOnDisplay.innerText = `Question ${questionCounter + 1} of ${numOfQuestions}`;
    scoreDisplay.innerText = `Score: ${score}`;
}

function checkEnd() {
    if (questionCounter + 1 > numOfQuestions) {
        openEndModal();
    } else {
        optionsDisplay.innerHTML = "";
        getNextQuestion();
    }
}

const endModal = document.querySelector("#end-modal");
const modalScore = document.querySelector("#modal-score");
const container = document.querySelector(".container");

function openEndModal() {
    container.style.display = "none";
    endModal.style.display = "block";
    modalScore.innerText = `Final Score: ${score}`;
}
