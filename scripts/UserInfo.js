export default class UserInfo {

  constructor(profileSelectors) {
    this._name = document.querySelector(profileSelectors.name);
    this._description = document.querySelector(profileSelectors.description);
  }

  getUserInfo () {
    return {
      profile_name: this._name.textContent,
      profile_description: this._description.textContent,
    }
  }

  setUserInfo (inputValues) {
    this._name.textContent = inputValues.profile_name;
    this._description.textContent = inputValues.profile_description;
  }
}
