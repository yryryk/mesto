class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const elementsPhoto = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__photo')
      .cloneNode(true);

    return elementsPhoto;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    // Лайкать картинки
    this._buttonLike = this._element.querySelector('.elements__like-button');
    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle('elements__like-button_active')
    });
    // Удалять картинки
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._element.remove();
    });
    // Просматривать картинки
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  // Открыть попап просмотра картинок
  _openPopupImage () {
    image.src = this._element.querySelector('.elements__image').src;
    imageTitle.textContent = this._element.querySelector('.elements__image').alt;
    image.alt = this._element.querySelector('.elements__image').alt;
    openPopup (popupImage);
  }
}
