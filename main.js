'use strict';

import * as sound from './sound.js';

const mole = document.querySelector('.mole');
const angryMole = document.querySelector('.angry__mole');
const gameField = document.querySelector('.game__field');
const holePath = './img/hole.png';

// mole.addEventListener('click',()=>{
//   console.log(`mole clicked!`);
//   sound.playMole();
// });

// angryMole.addEventListener('click', ()=>{
//   console.log('angry mole clicked!');
//   sound.playAngry();
// });

gameField.addEventListener('click', (event)=>{
  const target = event.target;
  // console.log(event.target);
  if(target.matches('.mole')){
    sound.playMole();
    target.setAttribute('class', 'hole');
    target.setAttribute('src', holePath);
  }
});