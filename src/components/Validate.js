export default class FormValidator {

  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
  }

  enableValidation () {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  };

  refreshValidation () {
    this._inputList.forEach((inputElement) => {
      // Определить состояние полей ввода при повторном открытии попапа
      this._toggleInputErrorState(inputElement);
      // Определить состояние кнопки при повторном открытии попапа после сабмита при предыдущем открытии
      this._toggleButtonState();
    });
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton ()
    } else {
      this._enableButton ()
    }
  };

  _disableButton () {
    this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  _enableButton () {
    this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleInputErrorState (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError (inputElement, errorMessage) {
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._validationSettings.errorClass);
  };

  _hideInputError (inputElement) {
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    this._errorElement.classList.remove(this._validationSettings.errorClass);
    this._errorElement.textContent = '';
  };

}
