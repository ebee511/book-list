// Variables
let submitBtn = document.getElementById("submitBtn");
let bookTitle = document.getElementById("book-title");
let bookAuthor = document.getElementById("author");
let bookISBN = document.getElementById("isbn");
let displayMessageUI = document.getElementById("message");
let table = document.getElementById("table");

// Create Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Create UI Constructor
class UI {
  addBookToList(book) {
    //create a new row
    let row = document.createElement("tr");
    //create table data
    let td1 = document.createElement("td");
    td1.textContent = book.title;
    //create table data
    let td2 = document.createElement("td");
    td2.textContent = book.author;
    //create table data
    let td3 = document.createElement("td");
    td3.textContent = book.isbn;
    //create table data
    let td4 = document.createElement("td");
    let a = document.createElement("a");
    a.textContent = "Remove";
    td4.style.textAlign = "center";
    td4.append(a);
    //append td's to tr
    row.append(td1, td2, td3, td4);
    //table append row
    table.append(row);
  }

  resetInputFields() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookISBN.value = "";
  }

  displayMessage(message, className) {
    //check for existing message
    if (
      document.querySelector(".failed") ||
      document.querySelector(".success")
    ) {
      return;
    }
    //create new paragraph element
    const paraEL = document.createElement("p");
    // set inner html of paragraph element
    paraEL.textContent = message;
    // add classname to paragraph element
    paraEL.classList.add(`${className}`);
    // append paragraph element to display div
    displayMessageUI.append(paraEL);

    // timeout after 3 seconds, grab element we want to remove
    setTimeout(function() {
      paraEL.remove();
    }, 3000);
  }

  removeBook(e) {
    if (e.target.nodeName === "A") {
      e.target.parentNode.parentNode.remove();
    }
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Add event listener for submit button
submitBtn.addEventListener("click", function() {
  // Get form values
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let isbn = bookISBN.value;

  // Instantiate new book object/constructor
  let book = new Book(title, author, isbn);
  // Instantiate UI object to add book to table
  const ui = new UI();
  // Validate form fields which will update UI
  if (title === "" || author === "" || isbn === "") {
    // Display error message
    ui.displayMessage(
      "Book was not added due to empty form field! Please try again.",
      "failed"
    );
  } else {
    // Add book to UI list, pass book object
    ui.addBookToList(book);
    // Add book to local storage (don't need to instantiate since it is static)
    Store.addBook(book);
    // Display success message
    ui.displayMessage("Book successfully added!", "success");
    // Clear input form fields
    ui.resetInputFields();
  }
});

table.addEventListener("click", function(e) {
  // Instantiate UI object to add book to table
  const ui = new UI();
  // Delete book
  ui.removeBook(e);
  // Remove from local storage
  Store.removeBook(e.target.parentNode.previousElementSibling.textContent);
  // Show message
  ui.displayMessage("Book removed!", "success");
});
