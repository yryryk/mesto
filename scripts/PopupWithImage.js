import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._imageTitle = this._popup.querySelector('.popup__image-title');
  }

  open (initialImage, initialName) {
    this._image.src = initialImage;
    this._image.alt = initialName;
    this._imageTitle.textContent = initialName;
    super.open ();
  }
}
