const { nanoid } = require('nanoid')
const books = require('./books')

const addBookToShelf = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const id = nanoid(16)

  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  // Checkname if blank
  const checkName = name === undefined || name === ''
  if (checkName) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku, mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  // Check readpage should not be bigger than pageCount
  const finished = (pageCount === readPage)
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku, readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
  }

  // Adding a Book
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }
  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}
const getBookAtShelf = () => ({
  status: 'success',
  data: {
    books: books.map((m) => ({
      id: m.id,
      name: m.name,
      publisher: m.publisher
    }))
  }
})

const getBookByIdAtShelf = (request, h) => {
  const { bookId } = request.params

  const bookFound = books.find((book) => book.id === bookId)

  if (bookFound !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: bookFound
      }
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}
const editBookByIdAtShelf = (request, h) => {
  const { bookId } = request.params
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const index = books.findIndex((book) => book.id === bookId)
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal diperbarui, mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal diperbarui, readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku, ID tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookByIdAtShelf = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((book) => book.id === bookId)
  if (index !== -1) {
    books.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus'
  })
  response.code(404)
  return response
}

module.exports = {
  addBookToShelf,
  getBookAtShelf,
  getBookByIdAtShelf,
  editBookByIdAtShelf,
  deleteBookByIdAtShelf
}
