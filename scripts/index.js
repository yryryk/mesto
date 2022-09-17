
const form = document.querySelector('.overlay');
const formElement = form.querySelector('.popup');
const nameInput = formElement.querySelector('[name="title"]');
const jobInput = formElement.querySelector('[name="subtitle"]');
const formCloseButton = form.querySelector('.popup__close-button');

const blockOutput = document.querySelector('.profile');
const profileEditButton = blockOutput.querySelector('.profile__edit-button');
const nameOutput = blockOutput.querySelector('.profile__title');
const jobOutput = blockOutput.querySelector('.profile__subtitle');
function getValue (input, output) {
  input.value = output.textContent;
}

function addValue (input, output) {
  output.textContent = input.value;
}

function formToggle () {
  form.classList.toggle('overlay_open');
}

function formOpener () {
  getValue (nameInput, nameOutput);
  getValue (jobInput, jobOutput);
  formToggle ();
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  addValue (nameInput, nameOutput);
  addValue (jobInput, jobOutput);
  formToggle ();
}

profileEditButton.addEventListener('click', formOpener);
formCloseButton.addEventListener('click', formToggle);
formElement.addEventListener('submit', formSubmitHandler);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    // for (let formClass of form.classList) {
    //   if (formClass === 'overlay_open') {
    //     formToggle();
    //   }
    // }
    if (form.classList.contains('overlay_open')) {
      formToggle();
    }
  }
});

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

initialCards.forEach ( (item) => {
const elementsPhoto = elementTemplate.querySelector('.elements__photo').cloneNode(true);
elementsPhoto.querySelector('.elements__image').src = item.link;
elementsPhoto.querySelector('.elements__title').textContent = item.name;
elements.append(elementsPhoto);
})
