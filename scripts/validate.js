class FormValidator {

  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this.name = this._formElement.attributes.name.value; // Для автоматического создания ключей объекта
    //                                                      с экземплярами класса FormValidator в index.js
  }

  enableValidation () {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
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
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  _enableButton () {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError (inputElement, errorMessage) {
    inputElement.classList.add(this._selectors.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._selectors.errorClass);
  };

  _hideInputError (inputElement) {
    inputElement.classList.remove(this._selectors.inputErrorClass);
    this._errorElement.classList.remove(this._selectors.errorClass);
    this._errorElement.textContent = '';
  };

}
