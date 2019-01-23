const inputField = document.querySelector('#input-field');
const searchButton = document.querySelector('#search-button');
const booksContainer = document.querySelector('#books-container');
const searchMessage = document.querySelector('#search-message');

function searchBooks() {
  searchMessage.innerHTML = '';
  let query = document.querySelector('#input-field').value.trim();
    if (query === '') {
      searchMessage.innerHTML = `* enter search keywords *`;
      return;
    }
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      booksContainer.innerHTML = '';
      if (data.totalItems === 0) {
        searchMessage.innerHTML = `* no results found *`;
        return;
      }
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
    .catch(err => {
      console.log(err);
      throw(error);
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
