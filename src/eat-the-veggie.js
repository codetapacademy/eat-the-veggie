const speed = 100;
// x and y axis
let map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
];
let 
    xaHead = 0,
    yaHead = 0,
    xaFood = 0,
    yaFood = 0,
    score = 0,
    max = 20,
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
  if (map[yaFood][xaFood]) {
    moveFood();
    return;
  }
  food.style.left = `${xaFood * 40}px`;
  food.style.top = `${yaFood * 40}px`;
}

const setScore = score => {
  scoreElement.innerText = score;
  foodLifeTimeRemaining = foodLifeTime;
}

rockList = map.map((rocka, y) => {
  rocka.map((rock, x) => {
    if (rock) {
      console.log(x, y)
      let rockElement = document.createElement('div');
      rockElement.className = 'rock';
      rockElement.style.left = `${x * 40}px`;
      rockElement.style.top = `${y * 40}px`;
      stage.appendChild(rockElement);
    }
  })
})

setScore(score);

const moveHead = () => {
  switch(direction) {
    case 'left':
      if (!map[yaHead][xaHead-1]) {
        xaHead = xaHead > 0 ? --xaHead : 0;
        head.style.transform = 'rotate(180deg)';
      }
      break;
    case 'right':
      if (!map[yaHead][xaHead+1]) {
        xaHead = xaHead < max - 1 ? ++xaHead : max - 1;
        head.style.transform = 'rotate(0deg)'
      }
      break;
    case 'up':
      if (yaHead > 0 && !map[yaHead-1][xaHead]) {
        yaHead = yaHead > 0 ? --yaHead : 0;
        head.style.transform = 'rotate(270deg)'
      }
      break;
    case 'down':
      if (yaHead < max - 1 && !map[yaHead+1][xaHead]) {
        yaHead = yaHead < max - 1 ? ++yaHead : max - 1;
        head.style.transform = 'rotate(90deg)'
      }
      break;
    default:
      console.log(`No direction`)
  }
  // console.log(map[yaHead][xaHead])
  head.style.left = `${xaHead * 40}px`;
  head.style.top = `${yaHead * 40}px`;

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
    score++;
    setScore(score);
  }
}
document.body.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 37:
      // if (direction !== 'right') direction = 'left';
      direction = 'left';
      break;
    case 38:
      // if (direction !== 'down') direction = 'up';
      direction = 'up';
      break;
    case 39:
      // if (direction !== 'left') direction = 'right';
      direction = 'right';
      break;
    case 40:
      // if (direction !== 'up') direction = 'down';
      direction = 'down';
      break;
    default:
      console.log(`It's not an arrow key`)
  }
})
// set head in motion
setInterval(moveHead, speed);