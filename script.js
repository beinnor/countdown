const startStopBtn = document.getElementById('button');
const resetBtn = document.getElementById('reset');
const output = document.getElementById('output');
const hoursAdjust = document.getElementById('hoursAdjust');
const minutesAdjust = document.getElementById('minutesAdjust');
const secondsAdjust = document.getElementById('secondsAdjust');
const body = document.getElementsByTagName('body')[0];
let countDownInterval;

let state = {
  timerState: 'stopped',
  hours: 0,
  minutes: 0,
  seconds: 0,
}

function getTimeInSec() {
  return secondsLeft = state.hours * (60 * 60) + state.minutes * 60 + state.seconds * 1;
}

function writeTimeLeft() {
  const secondsLeft = getTimeInSec();
  output.innerText = toHHMMSS(secondsLeft);
}

function updateSliders(secs) {

  const hours = Math.floor(secs / 3600)
  const minutes = Math.floor(secs / 60) % 60
  const seconds = secs % 60

  hoursAdjust.value = hours;
  minutesAdjust.value = minutes;
  secondsAdjust.value = seconds;
}

function updateState(secs) {

  const hours = Math.floor(secs / 3600)
  const minutes = Math.floor(secs / 60) % 60
  const seconds = secs % 60

  state.hours = hours;
  state.minutes = minutes;
  state.seconds = seconds;
}

function toHHMMSS(secs) {
  const hours = Math.floor(secs / 3600)
  const minutes = Math.floor(secs / 60) % 60
  const seconds = secs % 60

  const display = `${hours < 10 ? '0' : ''}${hours}` +
                  `:${minutes < 10 ? '0' : ''}${minutes}` +
                  `:${seconds < 10 ? '0' : ''}${seconds}`;

  return display;
}

function timer(seconds) {
  const now = Math.round(Date.now() / 1000);
  const then = now + seconds;

  countDownInterval = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now() / 1000));
    if (secondsLeft < 0) {
      body.classList.remove('blink');
      stopTimer();
      reset();
      return;
    }
    if (secondsLeft < 5) {
      body.classList.toggle("blink");
    }

    updateSliders(secondsLeft);
    updateState(secondsLeft);
    output.innerText = toHHMMSS(secondsLeft);
  }, 1000);
}

startStopBtn.addEventListener('click', () => {
  if (state.timerState === 'stopped') {
    if (state.hours > 0 || state.minutes > 0 || state.seconds > 0) {
      return startTimer();
    }
  }

  if (state.timerState === 'running') {
    return stopTimer();
  }
});

hoursAdjust.addEventListener('input', (e) => {
  if (state.timerState === 'stopped') {
    state.hours = e.target.value;
    writeTimeLeft();
  }
});

minutesAdjust.addEventListener('input', (e) => {
  if (state.timerState === 'stopped') {
    state.minutes = e.target.value;
    writeTimeLeft();
  }
});

secondsAdjust.addEventListener('input', (e) => {
  if (state.timerState === 'stopped') {
    state.seconds = e.target.value;
    writeTimeLeft();
  }
});

resetBtn.addEventListener('click', (e) => {
  if (state.timerState !== 'running') {
    reset();
  }
});
function reset() {
  hoursAdjust.value = 0;
  minutesAdjust.value = 0;
  secondsAdjust.value = 0;
  state.hours = 0;
  state.minutes = 0;
  state.seconds = 0;
  writeTimeLeft();
  state.timerState = 'stopped';
}

function stopTimer() {
  clearInterval(countDownInterval);
  startStopBtn.innerHTML = 'Start';
  state.timerState = 'stopped';
  hoursAdjust.removeAttribute('disabled');
  hoursAdjust.classList.remove('disabled');
  minutesAdjust.removeAttribute('disabled');
  minutesAdjust.classList.remove('disabled');
  secondsAdjust.removeAttribute('disabled');
  secondsAdjust.classList.remove('disabled');
  resetBtn.removeAttribute('disabled');
  resetBtn.classList.remove('disabled');
  return;
}

function startTimer() {
  timer(getTimeInSec());
  startStopBtn.innerHTML = 'Stop';
  state.timerState = 'running';
  hoursAdjust.setAttribute('disabled', true);
  hoursAdjust.classList.add('disabled');
  minutesAdjust.setAttribute('disabled', true);
  minutesAdjust.classList.add('disabled');
  secondsAdjust.setAttribute('disabled', true);
  secondsAdjust.classList.add('disabled');
  resetBtn.setAttribute('disabled', true);
  resetBtn.classList.add('disabled');
  return;
}

writeTimeLeft();