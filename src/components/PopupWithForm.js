import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.input'));
    this._submit = submit;
  }

  _getInputValues () {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.getAttribute('name')] = input.value;
    });
    return this._inputValues;
  }

  setInputValues (userInfo) {
    this._inputList.forEach((input) => {
      input.value = userInfo[input.getAttribute('name')];
    });
  }

  setEventListeners () {
    super.setEventListeners ();
    this._form.addEventListener('submit', this._submiter = (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues())
    });
  }

  removeEventListeners () {
    super.removeEventListeners ();
    this._form.removeEventListener('submit', this._submiter);
  }

  close () {
    super.close ();
    this._form.reset();
  }
}
