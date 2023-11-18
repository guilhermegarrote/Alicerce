const cardContainer = document.querySelector(".card-container");
const card = document.querySelector(".card__inner");
let startValue = 0;
let endValue = 0;
let rotationValue = 0;
const sensitivity = 0.35;

function handleStart(e) {
  startValue = e.clientX || e.touches[0].clientX;
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

  card.style.transform = `rotateY(${rotationValue}deg)`;
}

function handleEnd() {
  startValue = 0;
  endValue = 0;
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
