import Popup from './Popup.js';

export default class PopupWithAccept extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submit = submit;
  }

  setEventListeners () {
    super.setEventListeners ();
    this._form.addEventListener('submit', this._submit);
  }

  removeEventListeners () {
    super.removeEventListeners ();
    this._form.removeEventListener('submit', this._submit);
  }

  setElement (element) {
    this._element = element;
  }

  getElement () {
    return this._element
  }

  deleteCard () {
    this._element.remove()
  }
}
