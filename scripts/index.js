// Ссылки на оверлей
const overlay = document.querySelector('.overlay');
const popups = overlay.querySelectorAll('#popup');
const popupProfile = popups[0];
const popupElement = popups[1];
const popupImage = popups[2];
const image = popupImage.querySelector('.image-popup__image');
const imageTitle = popupImage.querySelector('.image-popup__title');
const nameInput = popupProfile.querySelector('[name="title"]');
const jobInput = popupProfile.querySelector('[name="subtitle"]');
const nameElementInput = popupElement.querySelector('[name="name"]');
const linkElementInput = popupElement.querySelector('[name="link"]');
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
  const targetPopup = evt.target.closest('#popup');
  targetPopup.classList.remove('popup_open');
  toggleOverlay ();
  if (targetPopup.classList.contains('image-popup')) {
    overlay.classList.remove('overlay_make-color_dark');
  }
}

// Открыть попапы
function openPopupProfile () {
  getValue (nameInput, nameOutput);
  getValue (jobInput, jobOutput);
  openPopup (popupProfile)
}

function openPopupElement () {
  openPopup (popupElement)
}

function openPopupImage (evt) {
  const initialImage = evt.target;
  image.src = initialImage.src;
  imageTitle.textContent = initialImage.alt;
  overlay.classList.add('overlay_make-color_dark');
  openPopup (popupImage);
}

// Лайкать картинки
function likeButton(evt) {
  evt.target.classList.toggle('elements__like-button_active')
}

// Удалять картинки
function deleteButton(evt) {
  evt.target.closest('.elements__photo').remove();
}

// Загрузить начальные картинки
initialCards.forEach ( (item) => {
  elements.append(cloneFormElement(item.name, item.link))
})

// Вставить картинку
function cloneFormElement(name, link) {
  const elementsPhoto = elementTemplate.querySelector('.elements__photo').cloneNode(true);
  elementsPhoto.querySelector('.elements__image').src = link;
  elementsPhoto.querySelector('.elements__image').alt = name;
  elementsPhoto.querySelector('.elements__title').textContent = name;
  // Лайкать картинки
  const elementsLikeButton = elementsPhoto.querySelector('.elements__like-button');
  elementsLikeButton.addEventListener('click', likeButton);
  // Удалять картинки
  const elementsTrashButton = elementsPhoto.querySelector('.elements__delete-button');
  elementsTrashButton.addEventListener('click', deleteButton);
  // Просматривать картинки
  const elementsImage = elementsPhoto.querySelector('.elements__image');
  elementsImage.addEventListener('click', openPopupImage);

  return elementsPhoto
}

// Согласиться
function submitForm (evt) {
  evt.preventDefault();
  // Редактировать профиль
  if (popupProfile.classList.contains('popup_open')) {
    addValue (nameInput, nameOutput);
    addValue (jobInput, jobOutput);
    popupProfile.classList.remove('popup_open');
  }
  // Вставить картинку
  if (popupElement.classList.contains('popup_open')) {
    elements.prepend(cloneFormElement(nameElementInput.value, linkElementInput.value))
    popupElement.classList.remove('popup_open');
  }

  toggleOverlay ();
}

// Слушать
profileEditButton.addEventListener('click', openPopupProfile);
elementAddButton.addEventListener('click', openPopupElement);
formCloseButton.forEach((c) => c.addEventListener('click', closePopup))
overlay.addEventListener('submit', submitForm);

// Отказаться
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (overlay.classList.contains('overlay_open')) {
      toggleOverlay();
    }
    if (popupProfile.classList.contains('popup_open')) {
      popupProfile.classList.remove('popup_open');
    }
    if (popupElement.classList.contains('popup_open')) {
      popupElement.classList.remove('popup_open');
    }
    if (popupImage.classList.contains('popup_open')) {
      popupImage.classList.remove('popup_open');
      overlay.classList.remove('overlay_make-color_dark');
    }
  }
});
