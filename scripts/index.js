
const overlay = document.querySelector('.overlay');
const formProfile = overlay.querySelector('#profile-popup');
const formElement = overlay.querySelector('#element-popup');
const nameInput = formProfile.querySelector('[name="title"]');
const jobInput = formProfile.querySelector('[name="subtitle"]');
const nameElementInput = formElement.querySelector('[name="name"]');
const linkElementInput = formElement.querySelector('[name="link"]');
const formCloseButton = overlay.querySelectorAll('.popup__close-button');

const blockOutput = document.querySelector('.profile');
const profileEditButton = blockOutput.querySelector('.profile__edit-button');
const nameOutput = blockOutput.querySelector('.profile__title');
const jobOutput = blockOutput.querySelector('.profile__subtitle');
const elementAddButton = blockOutput.querySelector('.profile__add-button');

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

initialCards.forEach ( (item) => {
const elementsPhoto = elementTemplate.querySelector('.elements__photo').cloneNode(true);
elementsPhoto.querySelector('.elements__image').src = item.link;
elementsPhoto.querySelector('.elements__image').alt = item.name;
elementsPhoto.querySelector('.elements__title').textContent = item.name;
elements.append(elementsPhoto);
})

function getValue (input, output) {
  input.value = output.textContent;
}

function addValue (input, output) {
  output.textContent = input.value;
}

function toggleOverlay () {
  overlay.classList.toggle('overlay_open');
}

function openPopup (pop) {
  pop.classList.add('popup_open');
  overlay.classList.add('overlay_open');
}

function closePopup (evt) {
  const targetPopup = evt.target.closest('.popup');
  targetPopup.classList.remove('popup_open');
  toggleOverlay ();
}

function openPopupProfile () {
  getValue (nameInput, nameOutput);
  getValue (jobInput, jobOutput);
  openPopup (formProfile)
}

function openPopupElement () {
  openPopup (formElement)
}

function submitForm (evt) {
  evt.preventDefault();

  if (formProfile.classList.contains('popup_open')) {
    addValue (nameInput, nameOutput);
    addValue (jobInput, jobOutput);
    formProfile.classList.remove('popup_open');
  }

  if (formElement.classList.contains('popup_open')) {
    const elementsPhoto = elementTemplate.querySelector('.elements__photo').cloneNode(true);
    elementsPhoto.querySelector('.elements__image').src = linkElementInput.value;
    elementsPhoto.querySelector('.elements__image').alt = nameElementInput.value;
    elementsPhoto.querySelector('.elements__title').textContent = nameElementInput.value;
    elements.prepend(elementsPhoto);
    formElement.classList.remove('popup_open');
  }

  toggleOverlay ();
}

profileEditButton.addEventListener('click', openPopupProfile);
elementAddButton.addEventListener('click', openPopupElement);
formCloseButton.forEach((b) => b.addEventListener('click', closePopup))
overlay.addEventListener('submit', submitForm);

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
