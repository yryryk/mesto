export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(setUserInfoFromServer) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
    .then((result) => {
      setUserInfoFromServer (result, result._id);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
  }

  getInitialCards(renderItems) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
    .then((result) => {
      renderItems(result)
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
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
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
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
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
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
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
  }
}







