// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector(".container");
  // Get form
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  // Hide after 2 sec
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 2000);
};
// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.querySelector("#book-list");

  const row = document.createElement("tr");
  row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href="#" class="delete">
	<i class="fa fa-remove"></i>
	</a></td>
	`;
  // Append row to list
  list.appendChild(row);
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};
// Add Event Listener form
document.querySelector("#book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields!", "error");
  } else {
    // Add Book to List
    ui.addBookToList(book);
    // Successful
    ui.showAlert("Book added!", "success");
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});
// Event Listener for delete
document.querySelector("#book-list").addEventListener("click", function(e) {
  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target.parentElement);

  // Show alert
  ui.showAlert("Book removed!", "success");

  e.preventDefault();
});
