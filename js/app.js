// Variables
let submitBtn = document.getElementById("submitBtn");
let bookTitle = document.getElementById("book-title");
let bookAuthor = document.getElementById("author");
let bookISBN = document.getElementById("isbn");
let displayMessageUI = document.getElementById("message");
let table = document.getElementById("table");
let books = [];

// Create book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
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
};

UI.prototype.resetInputFields = function() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookISBN.value = "";
};

UI.prototype.displayMessage = function(message, className) {
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
};

UI.prototype.removeBook = function(e) {
  if (e.target.nodeName === "A") {
    e.target.parentNode.parentNode.remove();
  }
};

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
    // ui.errorMessage();
  } else {
    // Add book to list, pass book object
    ui.addBookToList(book);

    // Display success message
    // ui.successMessage();
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
});
