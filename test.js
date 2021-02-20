let second = 10;

setInterval(() => {
  second -= 1
  console.log(second);

  if (second == 0) {
    playSound();
    clearInterval()
  }
}, 1000)

function playSound() {
  let a = new Audio('/finish-sound.mp3');
  a.play()
}