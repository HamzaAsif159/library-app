/* array for storing books objects*/

const library = [];

/* constructor function */

class Book {
  constructor(name, authorName, pages, status) {
    this.name = name;
    this.authorName = authorName;
    this.pages = pages;
    this.status = status;
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

  let Name = document.getElementById("name").value;
  let authorName = document.getElementById("author-name").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").value;
  const myBook = new Book(Name, authorName, pages, status);

  library.push(myBook);
  console.log(library);
  console.log(Name);
  form.style.display = "none";
   console.log(status);
  let Popup = document.querySelector(".Popup");
  e.preventDefault();
  Popup.style.display = "block";
  window.setTimeout(
    "document.querySelector('.Popup').style.display = 'none';",
    3000
  );
}




