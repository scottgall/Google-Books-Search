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
        console.log(bookInfo);
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

const searchButton = document.querySelector('#search-button');
const booksContainer = document.querySelector('#books-container');

searchButton.addEventListener('click', searchBooks)