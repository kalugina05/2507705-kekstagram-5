const pictureContainer = document.querySelector('.big-picture');
const pictureImage = document.querySelector('.big-picture__img img');
const pictureCaption = document.querySelector('.social__caption');
const pictureLikesCount = document.querySelector('.likes-count');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsContainer = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');

let displayedComments = [];
let commentsShown = 0;
const COMMENTS_LIMIT = 5;

const closeButtonClick = () => {
  closeBigPicture();
};

const documentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    closeBigPicture();
  }
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    const avatarImage = document.createElement('img');
    avatarImage.classList.add('social__picture');
    avatarImage.src = avatar;
    avatarImage.alt = name;
    avatarImage.width = 35;
    avatarImage.height = 35;
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    commentItem.appendChild(avatarImage);
    commentItem.appendChild(commentText);
    fragment.appendChild(commentItem);
  });

  commentsList.appendChild(fragment);
};

const updateCommentCount = () => {
  commentsContainer.textContent = `${commentsShown} из ${displayedComments.length}`;
};
const loadMoreComments = () => {
  const endIndex = Math.min(commentsShown + COMMENTS_LIMIT, displayedComments.length);
  const newComments = displayedComments.slice(commentsShown, endIndex);
  renderComments(newComments);
  commentsShown = endIndex;
  updateCommentCount();
  if (commentsShown >= displayedComments.length) {
    commentsLoader.classList.add('hidden');
  }
};
const removeListeners = () => {
  pictureCloseButton.removeEventListener('click', closeButtonClick);
  document.removeEventListener('keydown', documentKeydown);
  commentsLoader.removeEventListener('click', loadMoreComments);
};
const createListeners = () => {
  pictureCloseButton.addEventListener('click', closeButtonClick);
  document.addEventListener('keydown', documentKeydown);
  commentsLoader.addEventListener('click', loadMoreComments);
};

const populateBigPicture = (data) => {
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
  populateBigPicture(data);
  displayedComments = data.comments;
  commentsShown = 0;
  commentsList.innerHTML = '';
  loadMoreComments();
  commentsContainer.classList.remove('hidden');
  if (displayedComments.length > COMMENTS_LIMIT) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
  createListeners();
}

export {openBigPicture};
