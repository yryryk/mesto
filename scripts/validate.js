const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'input_type_error',
  errorClass: 'popup__input-error_active'
};

function showInputError (formElement, inputElement, errorMessage, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

function hideInputError (formElement, inputElement, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

function setEventListeners (formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation (selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function disableButton (buttonElement, selectors) {
  buttonElement.classList.add(selectors.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

function enableButton (buttonElement, selectors) {
  buttonElement.classList.remove(selectors.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton (buttonElement, selectors)
  } else {
    enableButton (buttonElement, selectors)
  }
};

enableValidation (selectors);
