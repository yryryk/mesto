export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkExecution(resolve) {
    if (resolve.ok) {
      return resolve.json();
    }
    return Promise.reject(`Ошибка: ${resolve.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkExecution)
  }

  setUserInfo(inputValues) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about
      })
    })
    .then(this._checkExecution)
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkExecution)
  }

  setCard(inputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link
      })
    })
    .then(this._checkExecution)
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkExecution)
    // .then((result) => {console.log(result)})
    .catch((err) => {
      console.log(err);
    });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkExecution)
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkExecution)
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
  }

  setUserAvatar(inputValues) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValues.avatar
      })
    })
    .then(this._checkExecution)
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
  }
}







