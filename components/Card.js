export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.elements__title').textContent = this._name;
    this._image = this._element.querySelector('.elements__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setEventListeners();

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
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}

