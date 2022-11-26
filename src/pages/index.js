import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/Validate.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithAccept from '../components/PopupWithAccept.js';
import UserInfo from '../components/UserInfo.js';
import {validationSettings, initialCards} from '../utils/constants.js';

// Ссылки кнопки
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const elementAddButton = profile.querySelector('.profile__add-button');

// Слушатели кнопок редактирования и добавления
profileEditButton.addEventListener('click', openPopupProfile);
elementAddButton.addEventListener('click',openPopupElement);

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
  popupWithAccept.deleteCard ()
  popupWithAccept.close();
});

const openPopupWithAccept = (element) => {
  popupWithAccept.open();
  popupWithAccept.setElement (element);
}
// Объект попапа для просмотра картинок
const popupWithImage = new PopupWithImage ('#popup-image');
// Колбэк связывания классов
const handleCardClick = (image, name) => {
  popupWithImage.open(image, name);
}

function createCard(item) {
  const cardElement = new Card(item, '#element', handleCardClick, openPopupWithAccept).generateCard();
 return cardElement
}

// Вставить на страницу начальные картинки
const cardList = new Section({
  items: initialCards.reverse(),
  // Связывание через колбэк с классом Card,
  // в параметрах которого связывание через колбэк с классом PopupWithImage
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.elements');
cardList.renderItems();

// Объект для попапа создания картинок
const popupElement = new PopupWithForm ('#popup-element', (evt) => {
  evt.preventDefault();
  cardList.addItem(createCard(popupElement.getInputValues()));
  popupElement.close();
});
// Открытие попапа создания картинок
function openPopupElement () {
  popupElement.open();
  formValidatorsObject.element.refreshValidation ();
}

// Объект для редактирования профиля
const userInfo = new UserInfo ({name: '.profile__title', description: '.profile__subtitle'});
// Объект для попапа редактирования профиля
const popupProfile = new PopupWithForm ('#popup-profile', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo (popupProfile.getInputValues());
  popupProfile.close();
});
// Открытие попапа редактирования профиля
function openPopupProfile () {
  popupProfile.open();
  popupProfile.setInputValues(userInfo.getUserInfo())
  formValidatorsObject.profile.refreshValidation ();
}
