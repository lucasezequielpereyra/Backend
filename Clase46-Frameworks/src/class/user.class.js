class User {
  constructor(name, email, password, address, age, phone) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._address = address;
    this._age = age;
    this._phone = phone;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  getEmail() {
    return this._email;
  }

  setEmail(email) {
    this._email = email;
  }

  getPassword() {
    return this._password;
  }

  setPassword(password) {
    this._password = password;
  }

  getAddress() {
    return this._address;
  }

  setAddress(address) {
    this._address = address;
  }

  getAge() {
    return this._age;
  }

  setAge(age) {
    this._age = age;
  }

  getPhone() {
    return this._phone;
  }

  setPhone(phone) {
    this._phone = phone;
  }
}

export default User;
