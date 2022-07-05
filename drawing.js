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

const drawPlayer = (position) => {
  const currentPosition = position.getPosition();
  const player = document.getElementById('player');
  player.parentElement.removeChild(player);
  const targetElement = document.getElementById(currentPosition);
  targetElement.appendChild(player);
};