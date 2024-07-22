// script.js

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: "4",
  },
  {
    question: "What is the capital of Spain?",
    options: ["Madrid", "Paris", "Rome", "Berlin"],
    correct: "Madrid",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
    correct: "Berlin",
  },
  {
    question: "What is the capital of Italy?",
    options: ["Rome", "Paris", "Berlin", "Madrid"],
    correct: "Rome",
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const questionNumberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");

function startQuiz() {
  loadQuestion();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time: ${timeLeft}`;
  if (timeLeft === 0) {
    clearInterval(timer);
    showFeedback("Time's up!");
    disableOptions();
  }
}

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.textContent = currentQuizData.question;
  questionNumberElement.textContent = `Question ${currentQuestion + 1} of ${
    quizData.length
  }`;
  optionsElement.innerHTML = "";
  currentQuizData.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button));
    optionsElement.appendChild(button);
  });
}

function selectOption(selectedButton) {
  disableOptions();
  const correctAnswer = quizData[currentQuestion].correct;
  if (selectedButton.textContent === correctAnswer) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    showFeedback("Correct!");
  } else {
    showFeedback(`Wrong! The correct answer is ${correctAnswer}`);
  }
}

function disableOptions() {
  document.querySelectorAll(".option").forEach((button) => {
    button.classList.add("disabled");
    button.disabled = true;
  });
}

function showFeedback(message) {
  feedbackElement.textContent = message;
}

submitButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    feedbackElement.textContent = "";
    resetTimer();
  } else {
    endQuiz();
  }
});

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerElement.textContent = `Time: ${timeLeft}`;
  timer = setInterval(updateTimer, 1000);
}

function endQuiz() {
  clearInterval(timer);
  questionElement.textContent = "Quiz Over!";
  optionsElement.innerHTML = "";
  submitButton.style.display = "none";
}

startQuiz();
