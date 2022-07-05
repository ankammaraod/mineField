const restart = () => {
  window.location.reload();
};

const display = (message) => {
  document.getElementById('result').innerText = message;
  document.onkeydown = () => { };
  setTimeout(() => {
    document.getElementById('result').innerText = '';
  }, 3000);
};

const erasePlayer = (player) => {
  const { prevPosition } = player.getInfo();
  document.getElementById(prevPosition).innerText = '';
};

const drawPlayer = (player) => {
  const { currentPosition, symbol } = player.getInfo();
  const element = document.getElementById(currentPosition);
  element.innerHTML = symbol;

};