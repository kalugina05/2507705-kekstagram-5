const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = MAX_SCALE;
const previewImg = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleSmallButton = document.querySelector('.scale__control--smaller');
const scaleBigButton = document.querySelector('.scale__control--bigger');

let actualScale = DEFAULT_SCALE;
const updateScale = () => {
  scaleControlValue.value = `${actualScale}%`;
  previewImg.style.transform = `scale(${actualScale / 100})`;
};
function onSmallerButtonClick () {
  if (actualScale > MIN_SCALE) {
    actualScale -= STEP_SCALE;
    updateScale();
  }
}
function onBiggerButtonClick () {
  if (actualScale < MAX_SCALE) {
    actualScale += STEP_SCALE;
    updateScale();
  }
}
const resetScale = () => {
  actualScale = DEFAULT_SCALE;
  updateScale();
};
scaleSmallButton.addEventListener('click', onSmallerButtonClick);
scaleBigButton.addEventListener('click', onBiggerButtonClick);
export {resetScale};
