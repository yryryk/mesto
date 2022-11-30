export default class Card {
  constructor(data, templateSelector, handleCardClick, handlePopupWithAccept) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlePopupWithAccept = handlePopupWithAccept;
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
    this._element.querySelector('.elements__like-value').textContent = this._likes.length;
    this._setEventListeners();
    this._element.id = this._id;
    return this._element;
  }

  _setEventListeners() {
    // Лайкать картинки
    this._buttonLike = this._element.querySelector('.elements__like-button');
    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle('elements__like-button_active')
    });
    // Удалять картинки
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    if (this._ownerId == '148ffed141ccd28cef3efa26') {
      this._deleteButton.addEventListener('click', () => {
        this._handlePopupWithAccept(this._element)
      })
    }else{
      this._deleteButton.remove()
    }
    // Просматривать картинки
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}

