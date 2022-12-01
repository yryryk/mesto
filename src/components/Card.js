export default class Card {
  constructor(data, templateSelector, handleCardClick, handlePopupWithAccept, handleLikeClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlePopupWithAccept = handlePopupWithAccept;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const elementsPhoto = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__photo')
      .cloneNode(true);
    return elementsPhoto;
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._image = this._element.querySelector('.elements__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesValue = this._element.querySelector('.elements__like-value');
    this._likesValue.textContent = this._likes.length;
    // console.log(this._likes);
    this._element.id = this._id;
    this._userId = userId;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    // Лайкать картинки
    this._buttonLike = this._element.querySelector('.elements__like-button');
    if (!this._buttonLike.classList.contains("elements__like-button_active")&&this._likes.some((item) => item._id === this._userId)) {
      this._buttonLike.classList.add("elements__like-button_active")
    }

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._id, this._likes.some((item) => item._id === this._userId))
      .then((result) => {
        this._likes = result.likes;
        this._likesValue.textContent = this._likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
      this._buttonLike.classList.toggle('elements__like-button_active');
    });
    // Удалять картинки
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    if (this._ownerId == this._userId) {
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

