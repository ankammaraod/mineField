const randInt = (num) => Math.floor(Math.random() * num);

const erasePlayer = (player) => {
  const { prevPosition } = player.getInfo();
  document.getElementById(prevPosition).innerText = '';
};

const drawPlayer = (player) => {
  const { currentPosition, symbol } = player.getInfo();
  const element = document.getElementById(currentPosition);
  element.innerHTML = symbol;
};

const generateObstacles = (limit, count) => {
  const obstacles = [];
  for (let index = 0; index < count; index++) {
    obstacles.push(randInt(limit));
  }
  return obstacles;
};


class Obstacles {
  constructor(obstaclesLoc) {
    this.obstaclesLoc = obstaclesLoc
  }

  isPlayerHit(playerPosition) {
    return this.obstaclesLoc.includes(playerPosition);
  }
}

class Player {
  constructor(prevPosition, currentPosition) {
    this.prevPosition = prevPosition;
    this.currentPosition = currentPosition;
    this.symbol = '🧑‍🦯';
  }

  updatePlayerPosition(offset) {
    this.prevPosition = this.currentPosition;
    this.currentPosition += offset;
  }

  resetPosition() {
    this.prevPosition = this.currentPosition
    this.currentPosition = 1;
  }

  getInfo() {
    return {
      prevPosition: this.prevPosition,
      currentPosition: this.currentPosition,
      symbol: this.symbol
    };
  }
};


class Game {
  #player;
  #obstacles;
  #destination;
  constructor(player, obstacles, destination) {
    this.#player = player;
    this.#obstacles = obstacles;
    this.#destination = destination;
  }
  isPlayerInside() {
    const { currentPosition } = this.#player.getInfo()
    return currentPosition <= this.destination && currentPosition > 0;
  }

  winningDecision() {
    const { currentPosition } = this.#player.getInfo()
    return currentPosition === this.#destination
  }

  isValidMove() {
    const { currentPosition } = this.#player.getInfo();
    return !this.#obstacles.isPlayerHit(currentPosition) || this.isPlayerInside();
  }
}

const onKeyAccess = (game, player) => {
  return (event) => {
    let offset = 0;
    if (event.code === 'ArrowLeft') {
      offset = -1;
    }
    if (event.code === 'ArrowUp') {
      offset = -5;
    }
    if (event.code === 'ArrowRight') {
      offset = 1;
    }
    if (event.code === 'ArrowDown') {
      offset = 5
    }

    player.updatePlayerPosition(offset)
    erasePlayer(player);
    if (!game.isValidMove()) {
      alert('bomb');
      player.resetPosition();
      erasePlayer(player);
      drawPlayer(player);
    }
    drawPlayer(player);

    if (game.winningDecision()) {
      alert('Blind person saved successfully');
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