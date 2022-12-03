import Popup from './Popup.js';

export default class PopupWithAccept extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submit = submit;
  }

  setEventListeners () {
    super.setEventListeners ();
    this._form.addEventListener('submit', this._submiter = (evt) => {
      evt.preventDefault();
      this._submit(this._card)
    });
  }

  removeEventListeners () {
    super.removeEventListeners ();
    this._form.removeEventListener('submit', this._submiter);
  }

  setCard (card) {
    this._card = card;
    this.cardId = card.id;
  }
}
