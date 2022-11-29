export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(setUserInfo) {
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
      setUserInfo (result)
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
}







