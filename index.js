const changeTimeButtons = document.querySelectorAll('[data-key]');
const theTimer = document.getElementById('the-time');
const controlButtons = document.querySelectorAll('[data-id]')

let second = 1500;
let minute = 1500 * 60;

// I set this globally so I can stop it from another function
let theInterval


changeTimeButtons.forEach(button => {
  button.addEventListener('click', setTime)
})

controlButtons.forEach(button => {
  button.addEventListener('click', control)
})

// initiate the timer
function setTime() {
  second = this.dataset.key * 60;
  minute = second / 60;

  // stop started interval
  theInterval ? clearInterval(theInterval) : ''

  //set the timer
  theTimer.innerText = `${format(second / 60)}:${format(second % 60)}`;

  //highlight the active state
  changeTimeButtons.forEach(button => {
    button.classList.remove('bg-blue-700')
  })
  this.classList.add('bg-blue-700')
}

// add 0 if the minute is less than 10
function format(time) {
  return time < 10 ? `0${time}` : time
}

// detect what button is pressed 
function control() {
  const action = this.dataset.id;
  action == 'start' 
    ? handleStart()
    : action == 'stop' ? handleStop()
    : action == 'reset' ? handleReset()
    : ''
}

// function from the button
function handleStart() {
  theInterval = setInterval(startTimer, 1000); //start the timer interval
}

function handleStop() {
  clearInterval(theInterval);
}

function handleReset() {
  let activeState;
  changeTimeButtons.forEach(button => {
    button.classList.contains('bg-blue-700')
      ? activeState = button.dataset.key
      : ''
  })

  second = activeState * 60;
  
  showTimer(second);
  clearInterval(theInterval)
}
//

//for the start interval
function startTimer() {
  second -= 1;
  showTimer(second)
}

//show the timer to screen
function showTimer(second) {
  if (second == 0) { //check if the timer is finished
    playSound();
    clearInterval(theInterval);
  }
  
  minute = format(Math.floor(second / 60));
  theTimer.innerText = `${minute}:${format(second % 60)}`
}

function playSound() {
  let a = new Audio('/finish-sound.mp3');
  a.play()
}
