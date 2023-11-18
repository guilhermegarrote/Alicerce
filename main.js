const card = document.querySelector(".card__inner");
let startValue = 0;
let endValue = 0;
let rotationInProgress = false;
let currentRotation = 0;

function handleStart(e) {
  startValue = e.clientX || e.touches[0].clientX;
  rotationInProgress = true;
  addListeners();
}

function handleMove(e) {
  if (!startValue || !rotationInProgress) return;

  endValue = e.clientX || e.touches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeDistance = endValue - startValue;
  const direction = swipeDistance > 0 ? 1 : -1;
  const rotationAmount = Math.abs(swipeDistance);

  // Alterna entre 0 e 180 graus
  currentRotation = direction === 1 ? 180 : 0;

  card.style.transform = `rotateY(${currentRotation}deg)`;
}

function handleEnd() {
  startValue = 0;
  endValue = 0;
  rotationInProgress = false;
  removeListeners();
}

function addListeners() {
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleEnd);

  document.addEventListener("touchmove", handleMove);
  document.addEventListener("touchend", handleEnd);
}

function removeListeners() {
  document.removeEventListener("mousemove", handleMove);
  document.removeEventListener("mouseup", handleEnd);

  document.removeEventListener("touchmove", handleMove);
  document.removeEventListener("touchend", handleEnd);
}

card.addEventListener("mousedown", handleStart);
card.addEventListener("touchstart", handleStart);
