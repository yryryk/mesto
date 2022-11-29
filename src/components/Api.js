export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setUserInfo(values) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about
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
}







