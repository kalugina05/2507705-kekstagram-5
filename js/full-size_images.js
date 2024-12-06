const pictureContainer = document.querySelector('.big-picture');
const pictureImage = document.querySelector('.big-picture__img img');
const pictureCaption = document.querySelector('.social__caption');
const pictureLikesCount = document.querySelector('.likes-count');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsContainer = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const onCloseButtonClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    closeBigPicture();
  }
};

const removeListeners = () => {
  pictureCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const createListeners = () => {
  pictureCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    const imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = avatar;
    imgElement.alt = name;
    imgElement.width = 35;
    imgElement.height = 35;
    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = message;
    commentElement.appendChild(imgElement);
    commentElement.appendChild(textElement);
    fragment.appendChild(commentElement);
  });
  commentsList.innerHTML = '';
  commentsList.appendChild(fragment);
};

const fillBigPicture = (data) => {
  pictureImage.src = data.url;
  pictureLikesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  pictureCaption.textContent = data.description;
};

function closeBigPicture () {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeListeners();
}

function openBigPicture (data) {
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fillBigPicture(data);
  renderComments(data.comments);
  createListeners();
  commentsContainer.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

export {openBigPicture};
