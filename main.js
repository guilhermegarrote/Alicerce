const cardContainer = document.querySelector(".card-container");
const card = document.querySelector(".card__inner");
let startValue = 0;
let endValue = 0;
let rotationValue = 0;
let lastTimestamp = 0;
let rotationInProgress = false;
const sensitivity = 0.35;
const maxRotation = 360;
const maxRotationPerSwipe = 200;
function handleStart(e) {
  startValue = e.clientX || e.touches[0].clientX;
  lastTimestamp = Date.now();
  rotationInProgress = true;
  addListeners();
}

function handleMove(e) {
  if (!startValue) return;

  endValue = e.clientX || e.touches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeDistance = endValue - startValue;
  const direction = swipeDistance > 0 ? 1 : -1;
  rotationValue += Math.abs(swipeDistance) * sensitivity * direction;

  if (rotationInProgress) {
    const timestamp = Date.now();
    const timeElapsed = timestamp - lastTimestamp;

    // Verifica se a pessoa continua rolando sem levantar o dedo
    if (timeElapsed > 100) {
      rotationInProgress = false;
    }

    // Limita a rotação por rolagem a uma vez e meia
    if (Math.abs(rotationValue) > maxRotationPerSwipe) {
      rotationValue = maxRotationPerSwipe * direction;
    }

    card.style.transform = `rotateY(${rotationValue}deg)`;
    lastTimestamp = timestamp;
  }
}

function handleEnd() {
  startValue = 0;
  endValue = 0;
  rotationInProgress = false;
  removeListeners();
}

function addListeners() {
  cardContainer.addEventListener("mousemove", handleMove);
  cardContainer.addEventListener("mouseup", handleEnd);

  cardContainer.addEventListener("touchmove", handleMove);
  cardContainer.addEventListener("touchend", handleEnd);
}

function removeListeners() {
  cardContainer.removeEventListener("mousemove", handleMove);
  cardContainer.removeEventListener("mouseup", handleEnd);

  cardContainer.removeEventListener("touchmove", handleMove);
  cardContainer.removeEventListener("touchend", handleEnd);
}

cardContainer.addEventListener("mousedown", handleStart);
cardContainer.addEventListener("touchstart", handleStart);
