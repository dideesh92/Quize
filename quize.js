const quizData = [
    {
        question: "which of the following is the capital of arunachalpradesh",
        options: ["itanagar", "dispur", "imphai", "panaji"],
        answer: "itanagar"
    },
    {
        question: "what is the national flower of india",
        options: ["lotus", "hibiscus", "jasmin", "sunflower"],
        answer: "lotus"
    },
    // Add more questions here
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];

    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement("input");
        optionElement.type = "radio";
        optionElement.name = "option";
        optionElement.value = option;
        optionElement.id = "option" + index;

        const labelElement = document.createElement("label");
        labelElement.htmlFor = "option" + index;
        labelElement.textContent = option;

        optionsElement.appendChild(optionElement);
        optionsElement.appendChild(labelElement);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestion].answer;

        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = "Correct!";
            score++;
        } else {
            feedbackElement.textContent = "Incorrect!";
        }

        selectedOption.checked = false;
    } else {
        feedbackElement.textContent = "Please select an option!";
    }
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.innerHTML = <h2>Your Score: ${score}/${quizData.length}</h2>;
}

prevButton.addEventListener("click", () => {
    currentQuestion--;
    if (currentQuestion < 0) {
        currentQuestion = 0;
    }
    loadQuestion();
});

nextButton.addEventListener("click", () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion >= quizData.length) {
        showResult();
    } else {
        loadQuestion();
    }
});

submitButton.addEventListener("click", () => {
    checkAnswer();
    showResult();
});

loadQuestion();