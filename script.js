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
        console.log(book[1].volumeInfo);
        let bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
          <p>${bookInfo.title}</p>
          <p>${bookInfo.authors.join(', ')}</p>
          <p>${bookInfo.publisher}</p>
          <img src='${bookInfo.imageLinks.smallThumbnail}'>
        `;
        document.querySelector('#books-container').appendChild(bookDiv);
      })
  });
}

const searchButton = document.querySelector('#search-button');
const booksContainer = document.querySelector('#books-container');

searchButton.addEventListener('click', searchBooks)