const IMAGE_FILTERS = {
  none: {style: 'none', min: 0, max: 100, step: 1, unit: '' },
  sepia: {style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  chrome: {style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: {style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: {style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: {style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};
const DEFAULT_FILTER = IMAGE_FILTERS.none;
const previewImage = document.querySelector('.img-upload__preview img');
const filtersList = document.querySelector('.img-upload__effects');
const effectSlider = document.querySelector('.effect-level__slider');
const filterLevel = document.querySelector('.img-upload__effect-level');
const filterLevelValue = document.querySelector('.effect-level__value');
let currentFilter = DEFAULT_FILTER;
noUiSlider.create(effectSlider, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});
const defaultFilter = () => currentFilter === DEFAULT_FILTER;
const updateSliderOptions = () => {
  effectSlider.noUiSlider.updateOptions({
    range: { min: currentFilter.min, max: currentFilter.max },
    start: currentFilter.max,
    step: currentFilter.step,
  });
  filterLevel.classList.toggle('hidden', defaultFilter());
};
effectSlider.noUiSlider.on('update', () => {
  const sliderValue = effectSlider.noUiSlider.get();
  previewImage.style.filter = defaultFilter()
    ? DEFAULT_FILTER.style
    : `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  filterLevelValue.value = sliderValue;
});
const onFiltersChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentFilter = IMAGE_FILTERS[evt.target.value];
  previewImage.className = `effects__preview--${evt.target.value}`;
  updateSliderOptions();
};
const resetAllFilters = () => {
  currentFilter = DEFAULT_FILTER;
  updateSliderOptions();
};
filtersList.addEventListener('change', onFiltersChange);
export {resetAllFilters};
