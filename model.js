class Position {
  constructor(currentPosition) {
    this.currentPosition = currentPosition;
  }

  updatePosition(value) {
    this.currentPosition += value;
  }

  isPlayerInFirstRow(width) {
    return this.currentPosition < width + 1;
  }

  isPlayerInLastRow(destination, width) {
    return this.currentPosition > destination - width;
  }

  isPlayerInLeftExtreme(width) {
    return this.currentPosition % width === 1;
  }

  isPlayerInRightExtreme(width) {
    return this.currentPosition % width === 0;
  }

  isEqual(position) {
    return position === this.currentPosition;
  }

  getPosition() {
    return this.currentPosition;
  }
};

class Player {
  constructor(positions) {
    this.positions = positions
  }
  areYouAt(position) {
    return this.positions.isEqual(position);
  }

  moveLeft() {
    this.positions.updatePosition(-1);
  }

  moveRight() {
    this.positions.updatePosition(1);
  }

  moveUp() {
    this.positions.updatePosition(-5);
  }

  moveDown() {
    this.positions.updatePosition(5);
  }

  areYouInFirstRow(width) {
    return this.positions.isPlayerInFirstRow(width);
  }

  areYouInLastRow(destination, width) {
    return this.positions.isPlayerInLastRow(destination, width);
  }

  areYouInLeftExtreme(width) {
    return this.positions.isPlayerInLeftExtreme(width);
  }

  areYouInRightExtreme(width) {
    return this.positions.isPlayerInRightExtreme(width)
  }
};

class Game {
  #player;
  #mines;
  #destination;
  #width;
  constructor(player, mines, destination) {
    this.#player = player;
    this.#mines = mines;
    this.#destination = destination;
    this.#width = Math.sqrt(this.#destination);
  }

  hasWon() {
    return this.#player.areYouAt(this.#destination);
  }

  isInValidMove() {
    return this.#mines.some(mine => {
      return this.#player.areYouAt(mine);
    })
  }

  isFirstRow() {
    return this.#player.areYouInFirstRow(this.#width)
  }

  isLastRow() {
    return this.#player.areYouInLastRow(this.#destination, this.#width)
  };

  isLeftExtreme() {
    return this.#player.areYouInLeftExtreme(this.#width);
  };

  isRightExtreme() {
    return this.#player.areYouInRightExtreme(this.#width);
  };
};