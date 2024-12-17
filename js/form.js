import {resetScale} from './scale.js';
import {resetAllFilters} from './filters.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message.js';

const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG = /^#[A-Za-z0-9а-яё]{1,19}$/i;
const FORM_ERRORS = {
  COUNT_EXCEEDED: `Максимальное количество хэштегов — ${MAX_HASHTAGS}`,
  UNIQUE_HASHTAGS: 'Хэштеги повторяются',
  INCORRECT_HASHTAG: 'Хэштег должен начинаться с # и содержать только буквы и цифры.',
  LONG_DESCRIPTION: `Описание должно быть не длинее ${MAX_DESCRIPTION_LENGTH} символов`
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const body = document.body;

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

const hideForm = () => {
  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetAllFilters();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const isTextFieldFocused = () => document.activeElement === textHashtags || document.activeElement === textDescription;

const onFileInputChange = () => showForm();

const onCancelButtonClick = () => hideForm();

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideForm();
  }
}
const normalizeTags = (tagString) => tagString.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagsLogic = (value) => {
  const tags = normalizeTags(value);
  const isValidCount = tags.length <= MAX_HASHTAGS;
  const isValidTags = tags.every((tag) => HASHTAG.test(tag));
  const isUniqueTags = tags.length === new Set(tags.map((tag) => tag.toLowerCase())).size;

  return { isValidCount, isValidTags, isUniqueTags };
};

const validateHashtags = (value) => {
  const { isValidCount, isValidTags, isUniqueTags } = validateHashtagsLogic(value);
  return isValidCount && isValidTags && isUniqueTags;
};

const getHashtagErrorMessage = (value) => {
  const { isValidCount, isValidTags, isUniqueTags } = validateHashtagsLogic(value);

  if (!isValidCount) {
    return FORM_ERRORS.COUNT_EXCEEDED;
  }
  if (!isValidTags) {
    return FORM_ERRORS.INCORRECT_HASHTAG;
  }
  if (!isUniqueTags) {
    return FORM_ERRORS.UNIQUE_HASHTAGS;
  }
  if (!isUniqueTags) {
    return FORM_ERRORS.LONG_DESCRIPTION;
  }
  return true;
};

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = SubmitButtonText.SENDING;
};
const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = SubmitButtonText.IDLE;
};
const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessMessage();
          onSuccess();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};
pristine.addValidator(textHashtags, validateHashtags, getHashtagErrorMessage);

imgUploadForm.addEventListener('change', onFileInputChange);

imgUploadCancel.addEventListener('click', onCancelButtonClick);
export { setUserFormSubmit, hideForm };
