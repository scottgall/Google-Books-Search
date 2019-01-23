const inputField = document.querySelector('#input-field');
const searchButton = document.querySelector('#search-button');
const booksContainer = document.querySelector('#books-container');

function searchBooks() {
  let query = document.querySelector('#input-field').value.trim();
    if (query === '') {
      console.log('enter search keywords');
      return;
    }
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      booksContainer.innerHTML = '';
      Object.entries(data.items).forEach(book => {
        let bookInfo = book[1].volumeInfo;
        let title = bookInfo.title;
        let authors = bookInfo.authors.join(', ');
        let publisher = bookInfo.publisher;
        let image = bookInfo.imageLinks.smallThumbnail;
        let link = bookInfo.canonicalVolumeLink;
        let bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
          <p>${title}</p>
          <p>${authors}</p>
          <p>${publisher}</p>
          <img src='${image}' alt='book thumbnail'>
          <a href='${link}' target='_blank'>more</a>
        `;
        document.querySelector('#books-container').appendChild(bookDiv);
      })
  });
}

function keyDown(e) {
  if (e.keyCode === 13) {
    searchButton.classList.add('active');
  }
}

function keyUp(e) {
  if (e.keyCode === 13) {
    searchButton.classList.remove('active');
    searchButton.click();
  }
}

searchButton.addEventListener('click', searchBooks);
searchButton.addEventListener('keydown', (e) => keyDown(e));
searchButton.addEventListener('keyup', (e) => keyUp(e));
inputField.addEventListener('keydown', (e) => keyDown(e));inputField.addEventListener('keyup', (e) => keyUp(e));
