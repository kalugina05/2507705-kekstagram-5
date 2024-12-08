import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';

const generateComments = function(count){
  const comments = [];
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const names = [
    'Виктория',
    'Полина',
    'Вероника',
    'Семен',
    'Слава',
    'Олеся',
    'Дарья',
    'Лев',
    'Матвей',
    'Данил',
    'Владислав',
    'Роман',
    'Денис'
  ];

  for (let i = 0; i < count; i++){
    comments.push({
      id: i + 1,
      // eslint-disable-next-line no-template-curly-in-string
      avatar: `img/avatar-${getRandomInteger(1, 7)}.svg`,
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names)
    });
  }
  return comments;
};

const generatePhotos = function(){
  const photos = [];
  const descriptions = [
    'Такой вот выдался денёк',
    'Всем хорошего настроения!',
    'Очень красиво...',
    'Осеннее настроение',
    'Любуюсь!',
    'Красотища',
    'Как вам?'
  ];

  for (let i = 1; i <= 25; i++){
    photos.push({
      id: i,
      // eslint-disable-next-line no-template-curly-in-string
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(descriptions),
      likes: getRandomInteger(15, 200),
      comments: generateComments(getRandomInteger(0, 30))
    });
  }
  return photos;
};

export {generatePhotos};
