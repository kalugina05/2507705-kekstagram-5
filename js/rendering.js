import {openBigPicture} from './full-size_images.js';
import {generatePhotos} from './data.js';

const container = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

const postsDataset = generatePhotos();

const renderThumbnails = () => {
  postsDataset.forEach((data) => container.append(createThumbnail(data)));
};

export { renderThumbnails };
