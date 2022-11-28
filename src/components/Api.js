export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setUserInfo() {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    })
    .then(resolve => {
      if (resolve.ok) {
        return resolve.json();
      }
      return Promise.reject(`Ошибка: ${resolve.status}`);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
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
  getInitialCards() {
  }

}







