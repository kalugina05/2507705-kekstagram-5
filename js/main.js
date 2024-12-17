import { renderThumbnails } from './rendering.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit, hideForm } from './form-upload.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch((error) => {
    showAlert(error.message);
  });
setUserFormSubmit(hideForm);
