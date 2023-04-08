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

//Functions

const generateRandom = function (range) {
  return Math.ceil(Math.random() * range);
};

const creatP = document.createElement('p');

const setGuessValue = function (value) {
  inputGuess.value = value;
};

const setMessage = function (messageString) {
  message.textContent = messageString;
};

const setScore = function (scoreValue) {
  score.textContent = scoreValue;
};

const setSecret = function (secretValue) {
  secretNumber.textContent = secretValue;
};

const setCreatedContent = function (newValue) {
  creatP.textContent = newValue;
};

//Start

let correctNumber = generateRandom(20);
console.log(correctNumber);

let guess;

let initialScore = 20;

let highScoreValue = 0;

setScore(initialScore);

//Listeners

againBtn.addEventListener('click', function () {
  correctNumber = generateRandom(20);
  setGuessValue('');
  setMessage('Start guessing');
  initialScore = 20;
  setScore(initialScore);
  setSecret('?');
  body.style.backgroundColor = '#222';
  creatP.remove();
});

checkBtn.addEventListener('click', function () {
  //Retrieve the Number Guessed
  guess = Number(inputGuess.value);
  if (!inputGuess.value) {
    setMessage('Try a Number!');
    creatP.remove();
  } else if (guess > 20 || guess < 1) {
    setMessage('Invalid Number! Try a Number between 1 and 20!');
    setGuessValue('');
    creatP.remove();
  } else if (guess === correctNumber) {
    setMessage('🎉 Correct Number!');
    body.style.backgroundColor = '#39ED92';
    setSecret(correctNumber);
    if (initialScore > highScoreValue) {
      highScoreValue = initialScore;
      highScore.textContent = highScoreValue;
    }
    creatP.remove();
  } else {
    if (initialScore > 1) {
      setMessage('🥲 Wrong Number! Try again');
      sectionRight.insertBefore(creatP, labelScore);
      let farOrClose =
        guess - correctNumber < 0
          ? (guess - correctNumber) * -1
          : guess - correctNumber;
      if (farOrClose <= 5) {
        setCreatedContent(`It's close...`);
      } else if (farOrClose >= 5) {
        guess - correctNumber > 0
          ? setCreatedContent(`Too far`)
          : setCreatedContent('Too low');
      }
      setGuessValue('');
      initialScore--;
      setScore(initialScore);
    } else {
      initialScore = 0;
      setScore(initialScore);
      setMessage('You have lost the game 🥲');
      body.style.backgroundColor = 'red';
      setSecret(correctNumber);
      setGuessValue('');
      creatP.remove();
    }
  }
});
