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
  winningDecision() {
    const { currentPosition } = this.#player.getInfo()
    return currentPosition === this.#destination
  }

  isValidMove() {
    const { currentPosition } = this.#player.getInfo();
    return !this.#obstacles.isPlayerHit(currentPosition);
  }

  isFirstRow() {
    const { currentPosition } = this.#player.getInfo();
    return currentPosition < 6
  };

  isLastRow() {
    const { currentPosition } = this.#player.getInfo();
    return currentPosition > 20
  };

  isLeftExtreme() {
    const { currentPosition } = this.#player.getInfo();
    return currentPosition % 5 == 1
  };

  isRightExtreme() {
    const { currentPosition } = this.#player.getInfo();
    return currentPosition % 5 == 0;
  };
}