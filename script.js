'use strict';

//Seletores
const checkBtn = document.querySelector('.check');

const againBtn = document.querySelector('.again');

const inputGuess = document.querySelector('.guess');

const message = document.querySelector('.message');

const score = document.querySelector('.score');

const highScore = document.querySelector('.highscore');

const sectionRight = document.querySelector('.right');

const labelScore = document.querySelector('.label-score');

const secretNumber = document.querySelector('.number');

const body = document.querySelector('body');

const creatP = document.createElement('p');

//Start
let correctNumber = Math.ceil(Math.random() * 20);
console.log(correctNumber);

let guess;

//Listeners
againBtn.addEventListener('click', function () {
  correctNumber = Math.ceil(Math.random() * 20);
  inputGuess.value = '';
  message.textContent = 'Start guessing...';
  score.textContent = '20';
  secretNumber.textContent = '?';
  body.style.backgroundColor = '#222';
  creatP.remove();
});

checkBtn.addEventListener('click', function () {
  //Retrieve the Number Guessed
  guess = Number(inputGuess.value);
  if (!inputGuess.value) {
    message.textContent = 'Try a Number!';
  } else if (guess === correctNumber) {
    message.textContent = '🎉 Correct Number!';
    highScore.textContent = score.textContent;
    body.style.backgroundColor = '#39ED92';
    secretNumber.textContent = correctNumber;
    if (score.value > highScore.value) {
      highScore.textContent = score;
    }
    creatP.remove();
  } else {
    message.textContent = '🥲 Wrong Number! Try again';
    sectionRight.insertBefore(creatP, labelScore);
    let farOrClose =
      guess - correctNumber < 0
        ? (guess - correctNumber) * -1
        : guess - correctNumber;
    if (farOrClose <= 5) {
      creatP.textContent = `It's close...`;
    } else if (farOrClose >= 5) {
      guess - correctNumber > 0
        ? (creatP.textContent = `Too far`)
        : (creatP.textContent = 'Too low');
    }
    inputGuess.value = '';
    score.textContent = Number(score.textContent) - 1;
  }
});

//Logic
