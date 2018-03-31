const speed = 200;
// x and y axis
let 
    xaHead = 0,
    yaHead = 0,
    xaFood = 0,
    yaFood = 0,
    score = 0,
    max = 30,
    foodLifeTime = 10000,
    foodLifeTimeRemaining = 10000,
    direction = 'left';

let 
    stage = document.querySelector('.stage'),
    head = document.querySelector('.head'),
    food = document.querySelector('.food'),
    scoreElement = document.querySelector('.score');

const moveFood = () => {
  xaFood = ~~(Math.random() * max)
  yaFood = ~~(Math.random() * max)
  food.style.left = `${xaFood * 20}px`;
  food.style.top = `${yaFood * 20}px`;
  score++;
  setScore(score);
}

const setScore = score => {
  scoreElement.innerText = score;
  foodLifeTimeRemaining = foodLifeTime;
}

setScore(score);

const moveHead = () => {
  switch(direction) {
    case 'left':
      xaHead = xaHead > 0 ? --xaHead : max - 1;
      break;
    case 'right':
      xaHead = xaHead < max - 1 ? ++xaHead : 0;
      break;
    case 'up':
      yaHead = yaHead > 0 ? --yaHead : max - 1;
      break;
    case 'down':
      yaHead = yaHead < max - 1 ? ++yaHead : 0;
      break;
    default:
      console.log(`No direction`)
  }
  head.style.left = `${xaHead * 20}px`;
  head.style.top = `${yaHead * 20}px`;

  foodLifeTimeRemaining -= speed;
  food.style.opacity = foodLifeTimeRemaining / foodLifeTime + 0.2;
  if (foodLifeTimeRemaining < 0) {
    foodLifeTimeRemaining = foodLifeTime;
    moveFood();
  }

  // check if food is eaten
  if (xaFood === xaHead && yaFood === yaHead) {
    console.log(`Yammy`);
    moveFood();
  }
}
document.body.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 37:
      if (direction !== 'right') direction = 'left';
      break;
    case 38:
      if (direction !== 'down') direction = 'up';
      break;
    case 39:
      if (direction !== 'left') direction = 'right';
      break;
    case 40:
      if (direction !== 'up') direction = 'down';
      break;
    default:
      console.log(`It's not an arrow key`)
  }
})
// set head in motion
setInterval(moveHead, speed);