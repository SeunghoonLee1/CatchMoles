'use strict';

import * as sound from './sound.js';

const GAME_DURATION_SEC = 10;
const MAX_HOLES = 9;

const gameBtn = document.querySelector('.game__button');
// const mole = document.querySelector('.mole');
// const angryMole = document.querySelector('.angry__mole');
const gameField = document.querySelector('.game__field');
const holePath = './img/hole.png';
const molePath = './img/mole.png';
const angryMolePath = './img/angryMole.png';
const molesPath = './img/3moles.png';

const gameTime = document.querySelector('.game__timer');
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
let generator = undefined;
let numFilled = 0;
gameScore.innerHTML = 0;

gameBtn.addEventListener('click', ()=>{
  if(started){
    stopGame();
    sound.playAlert();
  }else{
    startGame();
  }
});

function initGame(){
  score = 0;
  numFilled = 0;
  gameScore.innerText = score;
  startTimer();
  clearBoard();
  showMoles();
}

function startGame(){
  started = true;
  initGame();
  showStopBtn();
}

function startTimer(){
  let remainTimeSec = GAME_DURATION_SEC;
  updateTime(remainTimeSec);
  timer = setInterval(() => {
    if(remainTimeSec <= 0){
      clearInterval(timer);
      clearInterval(generator);
      stopGame('timeOver');
      return;
    }
    updateTime(--remainTimeSec);
  }, 1000);
}

function clearBoard(){
  let idNum;
  for(idNum = 1; idNum <= MAX_HOLES; idNum++){
    let pos = document.querySelector(`#pos${idNum}`);
    if(pos.className !== 'hole'){
      pos.setAttribute('class', 'hole');
      pos.setAttribute('src', holePath); 
      pos.setAttribute('secAboveGround', 0); 
    }
  }
}


function showMoles(){
  let idNum = randomPos();
  let nextPos = document.querySelector(`#pos${idNum}`);

  // console.log(`idNum : ${idNum}, className : ${nextPos.className}`);
  generator = setInterval(() =>{
    if(numFilled === 9){
      stopGame('full');
      return;
    }
    while(nextPos.className !== 'hole'){
      idNum = randomPos();
      nextPos = document.querySelector(`#pos${idNum}`);
    }
    console.log(`idNum : ${idNum}`);
    let nextIcon = randomIcon();
    console.log(`nextIcon : ${nextIcon}`);
    switch(nextIcon){
      case 1:
        nextPos.setAttribute('class', 'mole');
        nextPos.setAttribute('src', molePath); 
        nextPos.setAttribute('secAboveGround', 1);  
        numFilled++;    
      break;
      case 2:
        nextPos.setAttribute('class', 'moles');
        nextPos.setAttribute('src', molesPath);   
        nextPos.setAttribute('secAboveGround', 1);  
        numFilled++;  
      break;
      case 3:
        nextPos.setAttribute('class', 'angry__mole');
        nextPos.setAttribute('src', angryMolePath);
        nextPos.setAttribute('secAboveGround', 1);  
        numFilled++;  
      break;
      default:
        console.log('something wrong.');
      break;
    }
  }, 1000);
}

function stopGame(reason){
  started = false;
  hideStopBtn();
  clearInterval(timer);
  clearInterval(generator);
  showPopUp(reason);
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
    case 'full':
      popUpMsg.innerText = 'It is full!';
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
    numFilled --;
    updateScore('mole');
  }else if(target.matches('.angry__mole')){
    sound.playAngry();
    target.setAttribute('class', 'hole');
    target.setAttribute('src', holePath);
    numFilled --;
    updateScore('angryMole');
  }else if(target.matches('.moles')){
    sound.playMole();
    target.setAttribute('class', 'hole');
    target.setAttribute('src', holePath);
    numFilled --;
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

function updateTime(timeSec){
  let min = Math.floor(timeSec / 60);
  let sec = timeSec % 60;

  gameTime.innerHTML = `${min}:${sec}`;
}

function randomPos(){
  return Math.floor(Math.random() * 9 + 1); //1~9
}

function randomIcon(){
  return Math.floor(Math.random() * 3 + 1); //1~3
}