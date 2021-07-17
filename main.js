'use strict';

import * as sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const mole = document.querySelector('.mole');
const angryMole = document.querySelector('.angry__mole');
const gameField = document.querySelector('.game__field');
const holePath = './img/hole.png';
const gameScore = document.querySelector('.game__score');
const angryHitScore = 10;
const moleHitScore = 10;
const molesHitScore = 30;
const popUp = document.querySelector('.pop-up');
const popUpMsg = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;
gameScore.innerHTML = 0;

gameBtn.addEventListener('click', ()=>{
  if(started){
    stopGame();
  }else{
    startGame();
  }
});

function initGame(){
  score = 0;

}

function startGame(){
  started = true;
  initGame();
  showStopBtn();

}

function stopGame(){
  started = false;
  hideStopBtn();
  showPopUp('stop');
}

function showStopBtn(){
  gameBtn.style.visibility = 'visible';
  gameBtn.innerHTML = '<i class="fas fa-stop"></i>';
}

function hideStopBtn(){
  gameBtn.style.visibility = 'hidden';
}

function showPopUp(reason){
  switch(reason){
    case 'timeOver':
      popUpMsg.innerText = 'Time over!';
      break;
    case 'stop':
      popUpMsg.innerText = 'Replay?';
      break;
    default:
      console.log('invalid reason!');
      break;
  }
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp(){
  popUp.classList.add('pop-up--hide');
}

popUpRefresh.addEventListener('click', ()=> {
  startGame();
  hidePopUp();
});



gameField.addEventListener('click', (event)=>{
  const target = event.target;
  // console.log(event.target);
  if(target.matches('.mole')){
    sound.playMole();
    target.setAttribute('class', 'hole');
    target.setAttribute('src', holePath);
    updateScore('mole');
  }else if(target.matches('.angry__mole')){
    sound.playAngry();
    target.setAttribute('class', 'hole');
    target.setAttribute('src', holePath);
    updateScore('angryMole');
  }else if(target.matches('.moles')){
    sound.playMole();
    target.setAttribute('class', 'hole');
    target.setAttribute('src', holePath);
    updateScore('moles');
  }
});

function updateScore(hitObj){
  let score = gameScore.innerText;
  console.log(`hitObj : ${hitObj}, score : ${score}`);
  switch(hitObj){
    case 'mole':
      score = Number(score) + Number(moleHitScore);
      gameScore.innerText = score;
      console.log(`score : ${score}`);
      break;
    case 'angryMole':
      if(score < 10){
        break;
      }
      score = Number(score) - Number(angryHitScore);
      gameScore.innerText = score;
      break;
    case 'moles':
      score = Number(score) + Number(molesHitScore);
      gameScore.innerText = score;
      break;
    default :
    console.log('Invalid input!');
    break;
  }
}