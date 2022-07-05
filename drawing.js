const erasePlayer = (player) => {
  const { prevPosition } = player.getInfo();
  document.getElementById(prevPosition).innerText = '';
};

const drawPlayer = (player) => {
  const { currentPosition, symbol } = player.getInfo();
  const element = document.getElementById(currentPosition);
  element.innerHTML = symbol;

};