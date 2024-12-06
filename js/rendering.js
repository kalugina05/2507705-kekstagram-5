import {openBigPicture} from './big-picture.js';
import {getPhoto} from './data.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture({ url, description, likes, comments, id });
  });

  return thumbnail;
};

const postsDataset = getPhoto();

const renderThumbnails = () => {
  postsDataset.forEach((data) => container.append(createThumbnail(data)));
};

export { renderThumbnails };
