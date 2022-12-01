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

const popups = Array.from(document.querySelectorAll('.popup'));
const popupButtons = {};
popups.forEach((popup) => {
popupButtons[`${popup.id}-button`] = popup.querySelector('.popup__submit-button')
});

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'a77c8be0-2dca-4e0d-816d-247a8a434831',
    'Content-Type': 'application/json'
  }
});

function setUserInfoFromServer (data, id) {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar (data);
  userId = id;
};

function renderItemsFromServer (items) {
  cardList.renderItems(items.reverse())
};

api.getUserInfo(setUserInfoFromServer)
.then(() => {

  profileEditButton.addEventListener('click', openPopupProfile);
  avatarEditButton.addEventListener('click', openPopupAvatar);
  // Что-бы правильно отрендерить корзины в карточках нужно дождаться получения userId в setUserInfoFromServer
  api.getInitialCards(renderItemsFromServer)
  .then(() => {
    elementAddButton.addEventListener('click',openPopupElement);
  })
  .catch((err) => {
    console.log(err);
  });

})
.catch((err) => {
  console.log(err);
});

const handleLikeClick = (cardId, isLike) => {
  if (isLike) {
    return api.deleteLike(cardId)
  }else{
    return api.addLike(cardId)
  }
}


// Попап аватара
const popupAvatar = new PopupWithForm ('#popup-avatar', (evt) => {
  evt.preventDefault();
  popupButtons['popup-avatar-button'].textContent = 'Сохранение...';

  api.setUserAvatar(popupAvatar.getInputValues())
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


// Создаём объект и автоматически наполняем его экземплярами класса FormValidator
// с именами ключей соответствующими валидируемой форме
const formValidatorsObject = {};
const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
formList.forEach((formElement) => {
  const formValidatorObject = new FormValidator(validationSettings, formElement);
  formValidatorObject.enableValidation();
  formValidatorsObject[formElement.getAttribute('name')] = formValidatorObject;
});


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

const handlePopupWithAccept = (element) => {
  popupWithAccept.open();
  popupWithAccept.setElement (element);
}
// Объект попапа для просмотра картинок
const popupWithImage = new PopupWithImage ('#popup-image');
// Колбэк связывания классов
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
const popupElement = new PopupWithForm ('#popup-element', (evt) => {
  evt.preventDefault();
  popupButtons['popup-element-button'].textContent = 'Сохранение...';

  api.setCard(popupElement.getInputValues())
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
const popupProfile = new PopupWithForm ('#popup-profile', (evt) => {
  evt.preventDefault();
  popupButtons['popup-profile-button'].textContent = 'Сохранение...';

  api.setUserInfo(popupProfile.getInputValues())
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
