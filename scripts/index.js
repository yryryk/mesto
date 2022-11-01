import Card from './Card.js';
import FormValidator from './validate.js';

// Ссылки на попап
const popupProfile = document.querySelector('#popup-profile');
const popupElement = document.querySelector('#popup-element');
const popupImage = document.querySelector('#popup-image');
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__image-title');
const nameInput = popupProfile.querySelector('[name="title"]');
const jobInput = popupProfile.querySelector('[name="subtitle"]');
const nameElementInput = popupElement.querySelector('[name="name"]');
const linkElementInput = popupElement.querySelector('[name="link"]');
const formCloseButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
// Ссылки на профиль
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const nameOutput = profile.querySelector('.profile__title');
const jobOutput = profile.querySelector('.profile__subtitle');
const elementAddButton = profile.querySelector('.profile__add-button');
// Другие ссылки
const elements = document.querySelector('.elements');
// Объект настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'input_type_error',
  errorClass: 'popup__input-error_active'
};
// Массив начальных изображений
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функции

// Соединить инпуты попапа с профилем
function setInputValueFromText (input, output) {
  input.value = output.textContent;
}

function setTextValueFromInput (input, output) {
  output.textContent = input.value;
}

// Открыть попап
function openPopup (pop) {
  pop.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
}

// Закрыть попап
function closePopup (pop) {
  pop.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEsc);
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

// Открыть попапы
function openPopupProfile () {
  setInputValueFromText (nameInput, nameOutput);
  setInputValueFromText (jobInput, jobOutput);
  openPopup (popupProfile);
  formValidatorsObject.profile.refreshValidation ();
}

function openPopupElement () {
  document.forms.element.reset();
  openPopup (popupElement);
  formValidatorsObject.element.refreshValidation ();
}

function openPopupImage (initialImage, initialName) {
  image.src = initialImage;
  image.alt = initialName;
  imageTitle.textContent = initialName;
  openPopup (popupImage);
}

// Загрузить начальные картинки
initialCards.forEach ( (item) => {
  elements.append(new Card(item, '#element', openPopupImage).generateCard())
})

// Согласиться
function submitProfile (evt) {
  evt.preventDefault();
  setTextValueFromInput (nameInput, nameOutput);
  setTextValueFromInput (jobInput, jobOutput);
  closePopup (popupProfile);
  document.forms.profile.reset();
}
function submitElement (evt) {
  evt.preventDefault();
  const elementInputItem = {
    name: nameElementInput.value,
    link: linkElementInput.value,
  }
  elements.prepend(new Card(elementInputItem, '#element', openPopupImage).generateCard());
  closePopup (popupElement);
  document.forms.element.reset();
}

// Слушать
profileEditButton.addEventListener('click', openPopupProfile);
elementAddButton.addEventListener('click',openPopupElement);
formCloseButtons.forEach((c) => c.addEventListener('click',() => closePopup(c.closest('.popup'))));
popupProfile.addEventListener('submit', submitProfile);
popupElement.addEventListener('submit', submitElement);

// Выключение попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup){
      closePopup (popup)
    }
  });
});

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup (openedPopup);
  }
}




