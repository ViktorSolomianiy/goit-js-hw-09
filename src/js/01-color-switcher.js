import '../css/color-switcher.css';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', genarateColor);
stopBtn.addEventListener('click', stopGenarateColor);

let timerId = null;
let isActive = false;

function genarateColor(e) {
  if (isActive) {
    return;
  }

  isActive = true;

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopGenarateColor(e) {
  clearInterval(timerId);
  isActive = false;
}
