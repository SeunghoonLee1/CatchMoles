'use strict';

import * as sound from './sound.js';

const mole = document.querySelector('.mole');
const angryMole = document.querySelector('.angry__mole');

mole.addEventListener('click',()=>{
  console.log(`mole clicked!`);
  sound.playMole();
});

angryMole.addEventListener('click', ()=>{
  console.log('angry mole clicked!');
  sound.playAngry();
});