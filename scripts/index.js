import Card from './Card.js';
import FormValidator from './validate.js';

// Ссылки на попап
const popupProfile = document.querySelector('#popup-profile');
const popupElement = document.querySelector('#popup-element');
const popupImage = document.querySelector('#popup-image');
const nameInput = popupProfile.querySelector('[name="title"]');
const jobInput = popupProfile.querySelector('[name="subtitle"]');
const nameElementInput = popupElement.querySelector('[name="name"]');
const linkElementInput = popupElement.querySelector('[name="link"]');
const formCloseButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
// Ссылки на профиль
const blockOutput = document.querySelector('.profile');
const profileEditButton = blockOutput.querySelector('.profile__edit-button');
const nameOutput = blockOutput.querySelector('.profile__title');
const jobOutput = blockOutput.querySelector('.profile__subtitle');
const elementAddButton = blockOutput.querySelector('.profile__add-button');
// Другие ссылки
const elements = document.querySelector('.elements');
// Объект настройки валидации
const selectors = {
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
function getValue (input, output) {
  input.value = output.textContent;
}

function addValue (input, output) {
  output.textContent = input.value;
}

// Открыть попап
function openPopup (pop) {
  pop.classList.add('popup_open');
}

// Закрыть попап
function closePopup (pop) {
  pop.classList.remove('popup_open');
}

// Создаём объект и автоматически наполняем его экземплярами класса FormValidator
// с именами ключей соответствующими валидируемой форме
let formValidatorsObject = {};
const formList = Array.from(document.querySelectorAll(selectors.formSelector));
formList.forEach((formElement) => {
  let formElementObject = new FormValidator(selectors, formElement);
  formValidatorsObject[formElementObject.name] = formElementObject;
});

// Открыть попапы
function openPopupProfile () {
  getValue (nameInput, nameOutput);
  getValue (jobInput, jobOutput);
  openPopup (popupProfile);
  // Инициируем валидацию для формы профиля
  formValidatorsObject.profile.enableValidation();
}

function openPopupElement () {
  openPopup (popupElement);
  // Инициируем валидацию для формы картинок
  formValidatorsObject.element.enableValidation();
}

// Загрузить начальные картинки
initialCards.forEach ( (item) => {
  elements.append(new Card(item, '#element').generateCard())
})

// Согласиться
function submitProfile (evt) {
  evt.preventDefault();
  addValue (nameInput, nameOutput);
  addValue (jobInput, jobOutput);
  closePopup (popupProfile);
  document.forms.profile.reset();
}
function submitElement (evt) {
  evt.preventDefault();
  const elementInputItem = {
    name: nameElementInput.value,
    link: linkElementInput.value,
  }
  elements.prepend(new Card(elementInputItem, '#element').generateCard());
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


document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup (popupProfile)||closePopup (popupElement)||closePopup (popupImage);
  }
});
