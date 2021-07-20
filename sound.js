'use strict';

const moleSound = new Audio('./sound/mole_hit.wav');
const angryMoleSound = new Audio('./sound/angryMole_hit.wav');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playMole(){
  playSound(moleSound);
}

export function playAngry(){
  playSound(angryMoleSound);
}

export function playAlert(){
  playSound(alertSound);
}

export function playBg(){
  playSound(bgSound);
}

export function playWin(){
  playSound(winSound);
}

export function stopBackground(){
  stopSound(bgSound);
}



function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}