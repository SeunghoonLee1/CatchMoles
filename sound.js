'use strict';

const moleSound = new Audio('./sound/mole_hit.mp3');
const angryMoleSound = new Audio('./sound/bug_hit.mp3');
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



function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}