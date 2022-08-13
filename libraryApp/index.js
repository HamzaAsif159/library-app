/* array for storing books objects*/

let library = [];

/* constructor function */

class Book {
  constructor(name, authorName, pages, status, id) {
    this.name = name;
    this.authorName = authorName;
    this.pages = pages;
    this.status = status;
    this.id = id
  }
}

/* connecting HTML components */

let submit = document.getElementById("submit");
const form = document.querySelector("form");

/* event listeners for opening and closing form */

document.getElementById("form-refer").addEventListener("click", () => {
  form.style.display = "block";
  console.log("clicked");
});

document.getElementById("close").addEventListener("click", () => {
  form.style.display = "none";
});

submit.addEventListener("click", addBook);

function validator() {
  let Name = document.getElementById("name").value;
  let authorName = document.getElementById("author-name").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").value;

  return Name !== " " && authorName !== " " && pages !== " ";
}

function addBook(e) {

  if(!validator()) {
       return;
   }

  let id = Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
  let name = document.getElementById("name").value;
  let authorName = document.getElementById("author-name").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").value;
  const myBook = new Book(name, authorName, pages, status, id);
  
  library.push(myBook);

  form.style.display = "none";

  let Popup = document.querySelector(".Popup");
  Popup.style.display = "block";

  e.preventDefault();
  
  name = document.getElementById("name");
  authorName = document.getElementById("author-name");
  pages = document.getElementById("pages");
  status = document.getElementById("status");

  name.value = '';
  authorName.value = "";
  pages.value = "";
  status.value = "";

  window.setTimeout(
    "document.querySelector('.Popup').style.display = 'none';",
    3000
  );

  storeBook();
}


function storeBook() {
    localStorage.setItem("Books", JSON.stringify(library));
    checkBook();
}

function checkBook(){
    for (let i=0; i<library.length; i++){
        displayBooks(library[i]);
    }
}

/* restoring books on refreshing */
function retriveBook(){
    if(!localStorage.Books){
        console.log("no books!")
    }
    else {
        let books = localStorage.getItem("Books");
        books = JSON.parse(books);
        library = books;
        checkBook();
    }
};

retriveBook();

function displayBooks(book){
    /*select container and card */
    const container = document.querySelector(".card-container");
    const card = document.createElement("div");

    container.append(card);
    card.classList.add("card");
    card.id = book.id;

    /* appending bookName to card */
    const bookName = document.createElement("div");

    bookName.textContent = book.name;
    bookName.classList.add('book-name');
    card.appendChild(bookName);

    /* appending authorName to card */
    const authorName = document.createElement("div");

    authorName.textContent = "Author Name: " + book.authorName;
    card.appendChild(authorName);

    /* appending No of Pages to card */
    const pages = document.createElement("div");
    pages.textContent = "Pages: " + book.pages;

    card.appendChild(pages);

    /* appending status to card */
    const status = document.createElement("div"); 
    if (book.status === "Yes" || book.status === "yes" || book.status === "read" || book.status  === "Read"){
        status.textContent = "Status: Read";
    }
    else {
        status.textContent = "Status: Not Read";
    }
    card.appendChild(status);

    /* appending change status btn and remove btn to card */
    const changeStatus = document.createElement("div");
    changeStatus.textContent = "Change Status";
    changeStatus.classList.add("btn");
    changeStatus.style.background = "#863ef7";

    card.appendChild(changeStatus);

    const removeBtn = document.createElement("div");
    removeBtn.textContent = "Remove"
    removeBtn.classList.add("btn");
    removeBtn.classList.add("remove");

    card.appendChild(removeBtn);

    /* eventLister for changing status */
    changeStatus.addEventListener('click', () => {
        if (status.textContent === "Status: Read" ) {
            status.textContent = "Status: Not Read";
            book.status = "Not Read";
        }
        else if (status.textContent === "Status: Not Read") {
            status.textContent = "Status: Read";
            book.status = "Read";
        }
        
        localStorage.setItem("Books", JSON.stringify(library));
    })
}
function setId(){
    let bookId = library.map(function(book){
        return book.id;
    });

    const cardsContainer = document.querySelectorAll(".card");
    const cardsArr = Array.prototype.slice.call(cardsContainer);

    for (let i=0; i<cardsArr.length; i++) {
        cardsArr[i].id = bookId[i];
    }
}

setId();

function removeBook() {
    const removeButton = document.querySelectorAll(".remove");
    removeButton.forEach(function(removeButton) {
        removeButton.addEventListener('click', (e) => {
            const clickedItem = e.target.parentNode.id;
            let item = library.find(item => item.id === clickedItem);
            let indexOfItem = library.indexOf(item);
            library.splice(indexOfItem, 1);
            localStorage.setItem("Books", JSON.stringify(library));
            e.target.parentNode.remove();
        })
    })
}

removeBook();









