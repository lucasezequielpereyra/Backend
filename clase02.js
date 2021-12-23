class User {
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
    this.books = [];
    this.pets = [];
  }

  getFullName() {
    return `Complete Name: ${this.name} ${this.lastName}`;
  }

  addPet(name) {
    this.pets.push(name);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(name, author) {
    const book = {
      name: name,
      author: author,
    };
    this.books.push(book);
  }

  getBookNames() {
    return this.books.map((book) => book.name);
  }
}

const usr = new User("Lucas", "Pereyra");
console.log(usr.getFullName());
usr.addPet("Charo");
console.log(usr.countPets());
usr.addBook("The Outsider", "Stephen King");
usr.addBook("Elevation", "Stephen King");
console.log(usr.getBookNames());
