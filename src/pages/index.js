import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/Validate.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithAccept from '../components/PopupWithAccept.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {validationSettings} from '../utils/constants.js';

// Ссылки кнопки
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const avatarEditButton = profile.querySelector('.profile__user-picture');
const elementAddButton = profile.querySelector('.profile__add-button');
// Создаём объект с сабмитами
const popups = Array.from(document.querySelectorAll('.popup'));
const popupButtons = {};
popups.forEach((popup) => {
popupButtons[`${popup.id}-button`] = popup.querySelector('.popup__submit-button')
});
// id юзера придёт с сервера
let userId;

// Объект взаимодействия с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'a77c8be0-2dca-4e0d-816d-247a8a434831',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([resultInfo, resultCards]) => {
  userInfo.setUserInfo(resultInfo);
  userInfo.setUserAvatar (resultInfo);
  userId = resultInfo._id;
  cardList.renderItems(resultCards.reverse());
  // Редактировать загруженный профиль и отрендеренные картинки после их появления
  profileEditButton.addEventListener('click', openPopupProfile);
  avatarEditButton.addEventListener('click', openPopupAvatar);
  elementAddButton.addEventListener('click',openPopupElement);
})
.catch((err) => {
  console.log(err);
});

// Попап аватара
const popupAvatar = new PopupWithForm ('#popup-avatar', (inputValues) => {
  popupButtons['popup-avatar-button'].textContent = 'Сохранение...';

  api.setUserAvatar(inputValues)
  .then((result) => {
    userInfo.setUserAvatar(result);
    popupButtons['popup-avatar-button'].textContent = 'Сохранить';
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
// Открытие попапа аватара
function openPopupAvatar () {
  popupAvatar.open();
  formValidatorsObject.avatar.refreshValidation ();
}

// Объект попапа для подтверждения удаления картинок
const popupWithAccept = new PopupWithAccept ('#popup-accept', (evt) => {
  evt.preventDefault();
  popupButtons['popup-accept-button'].textContent = 'Удаление...';

  api.deleteCard(popupWithAccept.getElement().id)
  .then(() => {
    popupButtons['popup-accept-button'].textContent = 'Да';
    popupWithAccept.deleteCard ();
    popupWithAccept.close();
  })
  .catch((err) => {
    console.log(err);
  });
});

// Объект попапа для просмотра картинок
const popupWithImage = new PopupWithImage ('#popup-image');
// Передадим колбэком в new Card
const handleLikeClick = (cardId, isLike) => {
  if (isLike) {
    return api.deleteLike(cardId)
  }else{
    return api.addLike(cardId)
  }
}

const handlePopupWithAccept = (element) => {
  popupWithAccept.open();
  popupWithAccept.setElement (element);
}

const handleCardClick = (image, name) => {
  popupWithImage.open(image, name);
}

function createCard(item, userId) {
  const cardElement = new Card(item, '#element', handleCardClick, handlePopupWithAccept, handleLikeClick).generateCard(userId);
 return cardElement
}

// Вставить на страницу начальные картинки
const cardList = new Section(
  // Связывание через колбэк с классом Card
  (item) => {
    cardList.addItem(createCard(item, userId))
}, '.elements');

// Попап создания картинок
const popupElement = new PopupWithForm ('#popup-element', (inputValues) => {
  popupButtons['popup-element-button'].textContent = 'Сохранение...';

  api.setCard(inputValues)
  .then((result) => {
    cardList.addItem(createCard(result, userId));
    popupButtons['popup-element-button'].textContent = 'Создать';
    popupElement.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
// Открытие попапа создания картинок
function openPopupElement () {
  popupElement.open();
  formValidatorsObject.element.refreshValidation ();
}

// Объект для редактирования профиля
const userInfo = new UserInfo ({name: '.profile__title', about: '.profile__subtitle', avatar: '.profile__user-picture'});
// Объект для попапа редактирования профиля
const popupProfile = new PopupWithForm ('#popup-profile', (inputValues) => {
  popupButtons['popup-profile-button'].textContent = 'Сохранение...';

  api.setUserInfo(inputValues)
  .then((result) => {
    userInfo.setUserInfo (result);
    popupButtons['popup-profile-button'].textContent = 'Сохранить';
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
// Открытие попапа редактирования профиля
function openPopupProfile () {
  popupProfile.open();
  popupProfile.setInputValues(userInfo.getUserInfo())
  formValidatorsObject.profile.refreshValidation ();
}

// Создаём объект и автоматически наполняем его экземплярами класса FormValidator
// с именами ключей соответствующими валидируемой форме
const formValidatorsObject = {};
const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
formList.forEach((formElement) => {
  const formValidatorObject = new FormValidator(validationSettings, formElement);
  formValidatorObject.enableValidation();
  formValidatorsObject[formElement.getAttribute('name')] = formValidatorObject;
});
