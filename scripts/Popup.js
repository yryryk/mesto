export default class Popup {

  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }

  open () {
    this._popup.classList.add('popup_open');
    this.setEventListeners();
  }

  close () {
    this._popup.classList.remove('popup_open');
    this.removeEventListeners();
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose (evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners () {
    document.addEventListener('keydown', this._handleEscClose.bind(this));

    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));

    this._popupCloseButton.addEventListener('click', this.close.bind(this));
  }

  removeEventListeners () {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));

    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));

    this._popupCloseButton.addEventListener('click', this.close.bind(this));
  }
}
