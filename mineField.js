const display = (message) => {
  document.getElementById('result').innerText = message;
  setTimeout(() => {
    document.getElementById('result').innerText = '';
  }, 1000);
};

const randInt = (num) => Math.floor(Math.random() * num);

const generateObstacles = (limit, count) => {
  const obstacles = [];
  for (let index = 0; index < count; index++) {
    obstacles.push(randInt(limit));
  }
  return obstacles;
};

const fetchOffset = (game, event) => {
  let offset = 0;
  if (event.code === 'ArrowLeft' && !game.isLeftExtreme()) {
    offset = -1;
  }
  if (event.code === 'ArrowUp' && !game.isFirstRow()) {
    offset = -5;
  }
  if (event.code === 'ArrowRight' && !game.isRightExtreme()) {
    offset = 1;
  }
  if (event.code === 'ArrowDown' && !game.isLastRow()) {
    offset = 5
  }
  return offset;
};

const onKeyAccess = (game, player) => {
  return (event) => {
    const offset = fetchOffset(game, event);

    player.updatePlayerPosition(offset)
    erasePlayer(player);
    if (!game.isValidMove()) {
      alert('bomb');
      player.resetPosition();
    }

    drawPlayer(player);

    if (game.winningDecision()) {
      display('Blind person saved successfully')
      player.resetPosition();
      erasePlayer(player);
      drawPlayer(player);
    }
  };
}

const main = () => {
  const obstaclesLoc = generateObstacles(24, 5);
  console.log(obstaclesLoc);
  const player = new Player(1, 1);
  const obstacles = new Obstacles(obstaclesLoc);

  const game = new Game(player, obstacles, 25);
  drawPlayer(player);

  const onKeyPress = onKeyAccess(game, player);
  document.onkeydown = (event) => onKeyPress(event);
};

window.onload = main;