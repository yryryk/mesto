// Ссылки на оверлей
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

// Открыть попап
function openPopup (pop) {
  pop.classList.add('popup_open');
}

// Закрыть попап
function closePopup (pop) {
  pop.classList.remove('popup_open');
}

// Открыть попапы
function openPopupProfile () {
  getValue (nameInput, nameOutput);
  getValue (jobInput, jobOutput);
  openPopup (popupProfile)
}

function openPopupImage (evt) {
  const initialImage = evt.target;
  image.src = initialImage.src;
  imageTitle.textContent = initialImage.alt;
  image.alt = initialImage.alt;
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
  const elementsImage = elementsPhoto.querySelector('.elements__image')
  elementsImage.src = link;
  elementsImage.alt = name;
  elementsPhoto.querySelector('.elements__title').textContent = name;
  // Лайкать картинки
  const elementsLikeButton = elementsPhoto.querySelector('.elements__like-button');
  elementsLikeButton.addEventListener('click', likeButton);
  // Удалять картинки
  const elementsTrashButton = elementsPhoto.querySelector('.elements__delete-button');
  elementsTrashButton.addEventListener('click', deleteButton);
  // Просматривать картинки
  elementsImage.addEventListener('click', openPopupImage);

  return elementsPhoto
}

// Согласиться
function submitProfile (evt) {
  evt.preventDefault();
  addValue (nameInput, nameOutput);
  addValue (jobInput, jobOutput);
  closePopup (popupProfile);
}
function submitElement (evt) {
  evt.preventDefault();
  elements.prepend(cloneFormElement(nameElementInput.value, linkElementInput.value));
  closePopup (popupElement);
}

// Слушать
profileEditButton.addEventListener('click', openPopupProfile);
elementAddButton.addEventListener('click',() => openPopup (popupElement));
formCloseButtons.forEach((c) => c.addEventListener('click',() => closePopup(c.closest('.popup'))));
popupProfile.addEventListener('submit', submitProfile);
popupElement.addEventListener('submit', submitElement);

// Отказаться
// document.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {

//     if (popupProfile.classList.contains('popup_open')) {
//       popupProfile.classList.remove('popup_open');
//     }
//     if (popupElement.classList.contains('popup_open')) {
//       popupElement.classList.remove('popup_open');
//     }
//     if (popupImage.classList.contains('popup_open')) {
//       popupImage.classList.remove('popup_open');
//     }
//   }
// });
