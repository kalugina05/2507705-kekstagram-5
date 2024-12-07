const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG = /^#[A-Za-z0-9а-яё]{1,19}$/i;
const FORM_ERRORS = {
  COUNT_EXCEEDED: `Максимальное количество хэштегов — ${MAX_HASHTAGS}`,
  UNIQUE_HASHTAGS: 'Хэштеги повторяются',
  INCORRECT_HASHTAG: 'Невалидный хэштег',
  LONG_DESCRIPTION: `Описание должно быть не длинее ${MAX_DESCRIPTION_LENGTH} символов`
};
const form = document.querySelector('.img-upload__form');
const imageInput = form.querySelector('.img-upload__input');
const modalOverlay = form.querySelector('.img-upload__overlay');
const mainBody = document.querySelector('body');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const closeButton = form.querySelector('.img-upload__cancel');
const pristineValidator = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});
const validateDescriptionLength = (value) => value.length <= 140;
const splitHashtags = (value) => value.trim().split(/\s+/).filter((tag) => Boolean(tag.length));
const isInputFocused = () => document.activeElement === hashtagsField || document.activeElement === descriptionField;
const validateHashtagCount = (value) => splitHashtags(value).length <= MAX_HASHTAGS;
const validateHashtags = (value) => splitHashtags(value).every((tag) => HASHTAG.test(tag));
const validateUniqueHashtags = (value) => {
  const hashtags = splitHashtags(value).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};
const handleEscPress = (evt) => {
  if (evt.key === 'Escape' && !isInputFocused()) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeForm();
  }
};
const closeForm = () => {
  form.reset();
  pristineValidator.reset();
  imageInput.value = '';
  modalOverlay.classList.add('hidden');
  mainBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscPress);
};
const showForm = () => {
  modalOverlay.classList.remove('hidden');
  mainBody.classList.add('modal-open');
  document.addEventListener('keydown', handleEscPress);
};
const onFileSelected = (evt) => {
  if (evt.target.files.length) {
    showForm();
  }
};
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && isInputFocused()) {
    evt.stopPropagation();
  }
});
pristineValidator.addValidator(descriptionField, validateDescriptionLength, FORM_ERRORS.LONG_DESCRIPTION);
pristineValidator.addValidator(hashtagsField, validateUniqueHashtags, FORM_ERRORS.UNIQUE_HASHTAGS);
pristineValidator.addValidator(hashtagsField, validateHashtags, FORM_ERRORS.INCORRECT_HASHTAG);
pristineValidator.addValidator(hashtagsField, validateHashtagCount, FORM_ERRORS.COUNT_EXCEEDED);
imageInput.addEventListener('change', onFileSelected);
closeButton.addEventListener('click', closeForm);
