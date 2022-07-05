const randInt = (num) => Math.floor(Math.random() * num);

const generateObstacles = (limit, count) => {
  const obstacles = [];
  for (let index = 0; index < count; index++) {
    obstacles.push(randInt(limit));
  }
  return obstacles;
};

const movePlayer = (game, player, event) => {

  if (event.code === 'ArrowLeft' && !game.isLeftExtreme()) {
    player.moveLeft();
  }

  if (event.code === 'ArrowUp' && !game.isFirstRow()) {
    player.moveUp();
  }

  if (event.code === 'ArrowRight' && !game.isRightExtreme()) {
    player.moveRight();
  }

  if (event.code === 'ArrowDown' && !game.isLastRow()) {
    player.moveDown();
  }
};

const onKeyAccess = (game, player, position) => {

  return (event) => {

    movePlayer(game, player, event);
    drawPlayer(position);

    if (game.isInValidMove()) {
      display('BOMB...');
    }

    if (game.hasWon()) {
      display('Blind person saved successfully')
    }
  };
}

const main = () => {
  const minesPositions = generateObstacles(24, 5);
  console.log(minesPositions);

  const position = new Position(1);
  const player = new Player(position);

  const game = new Game(player, minesPositions, 25);

  drawPlayer(position);

  const onKeyPress = onKeyAccess(game, player, position);
  document.onkeydown = (event) => onKeyPress(event);
};

window.onload = main;