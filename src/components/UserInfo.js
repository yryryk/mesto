export default class UserInfo {

  constructor(profileSelectors) {
    this._name = document.querySelector(profileSelectors.name);
    this._about = document.querySelector(profileSelectors.about);
    this._avatar = document.querySelector(profileSelectors.avatar);
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo (values) {
    this._name.textContent = values.name;
    this._about.textContent = values.about;
  }

  setUserAvatar (values) {
    this._avatar.style.backgroundImage=`url(${values.avatar})`;
  }
}
