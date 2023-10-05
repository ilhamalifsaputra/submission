const { addBookToShelf, getBookAtShelf, getBookByIdAtShelf, editBookByIdAtShelf, deleteBookByIdAtShelf } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookToShelf
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBookAtShelf
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdAtShelf
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdAtShelf
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdAtShelf
  }
]

module.exports = routes
