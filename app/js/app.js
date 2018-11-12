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
	const form = document.querySelector("#book-form")
	// Insert alert 
	container.insertBefore(div, form);


	// Hide after 2 sec
	setTimeout(function(){
		document.querySelector(".alert").remove();
	}, 2000)
}
// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");

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

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
// Add Event Listeners
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    		author = document.getElementById("author").value,
    		isbn = document.getElementById("isbn").value;

  // Instantiate book, UI
  const book = new Book(title, author, isbn);

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
