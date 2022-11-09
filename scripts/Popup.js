export default class Popup {

  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');

    this._handleEscCloser = this._handleEscClose.bind(this);
    this._handleOverlayCloser = this._handleOverlayClose.bind(this);
    this._closer= this.close.bind(this);
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
      console.log(22);
      this.close()
    }
  }

  _handleOverlayClose (evt) {
    if (evt.target === this._popup) {
      this.close()
    }
  }

  setEventListeners () {
    document.addEventListener('keydown', this._handleEscCloser);

    this._popup.addEventListener('click', this._handleOverlayCloser);

    this._popupCloseButton.addEventListener('click', this._closer);
  }

  removeEventListeners () {
    document.removeEventListener('keydown', this._handleEscCloser);

    this._popup.removeEventListener('click', this._handleOverlayCloser);

    this._popupCloseButton.removeEventListener('click', this._closer);
  }
}
