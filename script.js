'use strict';

//HTML Elements
const equationEl = document.querySelector('.number');
const answerEl = document.querySelector(".guess");
const bodyEl = document.querySelector("body");
const scoreEl = document.querySelector(".score");
const timeEl = document.querySelector(".time");
const aboutEl = document.querySelector(".about")
const checkBtn = document.querySelector(".check");
const startBtn = document.querySelector(".start");
const highscoreEl = document.querySelector(".highscore");
const difficultyBtn = document.querySelector(".difficulty");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const easyBtn = document.querySelector(".easy");
const normalBtn = document.querySelector(".normal");
const hardBtn = document.querySelector(".hard");
const diff = document.querySelector(".diff");
const resetBtn = document.querySelector(".reset");

let intervalId;
let difficulty = 100;

let score = 0;
let highscore = 0;
let time = 30;

let firstNum = 0;
let secondNum = 0;
let sign = 0;

//Generates New equation
function generateNew() {
  firstNum = Math.trunc(Math.random() * difficulty);
  secondNum = Math.trunc(Math.random() * difficulty);
  sign = Math.trunc(Math.random() * 2);

  sign === 0 ? equationEl.textContent = `${firstNum} + ${secondNum} = ?` : equationEl.textContent = `${firstNum} - ${secondNum} = ?`;
}

const reset = function () {
  clearInterval(intervalId);
  time = 30;
  score = 0;
  bodyEl.style.backgroundColor = "#222";
  answerEl.classList.add("hidden");
  checkBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
  difficultyBtn.classList.remove("hidden");
  scoreEl.textContent = "0";
  highscoreEl.textContent = highscore;
  resetBtn.classList.add("hidden");
  timeEl.textContent = "0";
}

//Updates timer and when timer hits 0 pages resets and records highscore
function updateCountdown() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    if (highscore < score) highscore = score;

    reset();
  }
}

//Checks if answer is correct
function checkAnswer(comp) {
  if (comp === Number(answerEl.value)) {
    bodyEl.style.backgroundColor = "#034B03";
    generateNew();
    answerEl.value = null;
    score += 5;
    scoreEl.textContent = score;
  } else {
    bodyEl.style.backgroundColor = "#CD001A";
    generateNew();
    answerEl.value = null;
    score -= 10;
    scoreEl.textContent = score;
  }
}

//Close modal window
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

startBtn.addEventListener("click", function () {
  answerEl.value = null;
  timeEl.textContent = time;
  answerEl.classList.remove("hidden");
  answerEl.focus();
  checkBtn.classList.remove("hidden");
  startBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  difficultyBtn.classList.add("hidden");

  generateNew();

  intervalId = setInterval(updateCountdown, 1000);
});

resetBtn.addEventListener("click", reset);

checkBtn.addEventListener("click", function () {
  if (sign === 0) {
    checkAnswer(firstNum + secondNum);
  }
  else {
    checkAnswer(firstNum - secondNum);
  }
  answerEl.focus();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !answerEl.classList.contains("hidden")) {
    if (sign === 0) {
      checkAnswer(firstNum + secondNum);
    }
    else {
      checkAnswer(firstNum - secondNum);
    }
    answerEl.focus();
  }
});

difficultyBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  closeModal();
});

easyBtn.addEventListener("click", function () {
  difficulty = 10;
  diff.textContent = "Easy";
  easyBtn.classList.add("selected");
  normalBtn.classList.remove("selected");
  hardBtn.classList.remove("selected");
  closeModal();
});

normalBtn.addEventListener("click", function () {
  difficulty = 100;
  diff.textContent = "Normal";
  easyBtn.classList.remove("selected");
  normalBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  closeModal();
});

hardBtn.addEventListener("click", function () {
  difficulty = 1000;
  diff.textContent = "Hard";
  easyBtn.classList.remove("selected");
  normalBtn.classList.remove("selected");
  hardBtn.classList.add("selected");
  closeModal();
});