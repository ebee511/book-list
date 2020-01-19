// Variables
let submitBtn = document.getElementById("submitBtn");
let bookTitle = document.getElementById("book-title");
let bookAuthor = document.getElementById("author");
let bookISBN = document.getElementById("isbn");
let table = document.getElementById("table");

// Create book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// Add event listener for submit button
submitBtn.addEventListener("click", function() {
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let isbn = bookISBN.value;

  let book = new Book(title, author, isbn);
  addBookToUI(title, author, isbn);
});

function addBookToUI(title, author, isbn) {
  //create a new row
  let row = document.createElement("tr");
  //create table data
  let td1 = document.createElement("td");
  td1.textContent = title;
  //create table data
  let td2 = document.createElement("td");
  td2.textContent = author;
  //create table data
  let td3 = document.createElement("td");
  td3.textContent = isbn;
  //append td's to tr
  row.append(td1, td2, td3);
  //table append row
  table.append(row);
}
