// Variables
let submitBtn = document.getElementById("submitBtn");
let bookTitle = document.getElementById("book-title");
let bookAuthor = document.getElementById("author");
let bookISBN = document.getElementById("isbn");
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

// Add event listener for submit button
submitBtn.addEventListener("click", function() {
  // Get form values
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let isbn = bookISBN.value;

  // Instantiate new book object/constructor
  let book = new Book(title, author, isbn);
  books.push(book);

  // Instantiate UI object to add book to table
  const ui = new UI();

  // Add book to list, pass book object
  ui.addBookToList(book);

  // Clear input form fields
  resetInputFields();
  console.log(books);
});

function resetInputFields() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookISBN.value = "";
}
