// Ссылки на оверлей
const overlay = document.querySelector('.overlay');
const formProfile = overlay.querySelector('#profile-popup');
const formElement = overlay.querySelector('#element-popup');
const nameInput = formProfile.querySelector('[name="title"]');
const jobInput = formProfile.querySelector('[name="subtitle"]');
const nameElementInput = formElement.querySelector('[name="name"]');
const linkElementInput = formElement.querySelector('[name="link"]');
const formCloseButton = overlay.querySelectorAll('.popup__close-button');
// Ссылки на профиль
const blockOutput = document.querySelector('.profile');
const profileEditButton = blockOutput.querySelector('.profile__edit-button');
const nameOutput = blockOutput.querySelector('.profile__title');
const jobOutput = blockOutput.querySelector('.profile__subtitle');
const elementAddButton = blockOutput.querySelector('.profile__add-button');
// Другие ссылки
const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

// Функции

// Соединить инпуты попапа с профилем
function getValue (input, output) {
  input.value = output.textContent;
}

function addValue (input, output) {
  output.textContent = input.value;
}

// Переключить оверлей
function toggleOverlay () {
  overlay.classList.toggle('overlay_open');
}

// Открыть попап
function openPopup (pop) {
  pop.classList.add('popup_open');
  overlay.classList.add('overlay_open');
}

// Закрыть попап крестиком
function closePopup (evt) {
  const targetPopup = evt.target.closest('.popup');
  targetPopup.classList.remove('popup_open');
  toggleOverlay ();
}

// Открыть попапы
function openPopupProfile () {
  getValue (nameInput, nameOutput);
  getValue (jobInput, jobOutput);
  openPopup (formProfile)
}

function openPopupElement () {
  openPopup (formElement)
}

// Вставить картинку
function cloneFormElement(name, link, place) {
  const elementsPhoto = elementTemplate.querySelector('.elements__photo').cloneNode(true);
  elementsPhoto.querySelector('.elements__image').src = link;
  elementsPhoto.querySelector('.elements__image').alt = name;
  elementsPhoto.querySelector('.elements__title').textContent = name;

  if (place ==='append'){
    elements.append(elementsPhoto);
  }

  if (place ==='prepend'){
    elements.prepend(elementsPhoto);
  }
}

// Согласиться
function submitForm (evt) {
  evt.preventDefault();

  if (formProfile.classList.contains('popup_open')) {
    addValue (nameInput, nameOutput);
    addValue (jobInput, jobOutput);
    formProfile.classList.remove('popup_open');
  }

  if (formElement.classList.contains('popup_open')) {
    cloneFormElement(nameElementInput.value, linkElementInput.value, 'prepend')
    formElement.classList.remove('popup_open');
  }

  toggleOverlay ();
}

// Загрузить начальные картинки
initialCards.forEach ( (item) => {
  cloneFormElement(item.name, item.link, 'append')
})

// Лайкать
const elementsLikeButton = elements.querySelectorAll('.elements__like-button');

function likeButton(evt) {
  evt.target.closest('.elements__like-button').classList.toggle('elements__like-button_active')
}

// Слушать
profileEditButton.addEventListener('click', openPopupProfile);
elementAddButton.addEventListener('click', openPopupElement);
formCloseButton.forEach((b) => b.addEventListener('click', closePopup))
overlay.addEventListener('submit', submitForm);
elementsLikeButton.forEach((a) => a.addEventListener('click', likeButton))

// Отказаться
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (overlay.classList.contains('overlay_open')) {
      toggleOverlay();
    }
    if (formProfile.classList.contains('popup_open')) {
      formProfile.classList.remove('popup_open');
    }
    if (formElement.classList.contains('popup_open')) {
      formElement.classList.remove('popup_open');
    }
  }
});
