const ConflictError = require("../errors/ConflictError.js")
const MissingFieldError = require("../errors/MissingFieldError.js")
const NotFoundError = require("../errors/NotFoundError.js")
const dbConnection = require("../utils/dbConnection.js")

const getAllBooks = async () => {
  const db = await dbConnection.connect()

  try {
    const sqlQuery = "select * from books"
    const result = await db.query(sqlQuery)

    return result.rows
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const postNewBook = async (req) => {
  const db = await dbConnection.connect()
  const { title, type, author, topic, publication_date, pages } = req.body

  if (
    [title, type, author, topic, publication_date, pages].some(
      (prop) => prop === undefined
    )
  ) {
    throw new MissingFieldError("Missing fields in the request body")
  }

  try {
    const sqlQuery =
      "insert into books (title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6) returning *"
    const result = await db.query(sqlQuery, [
      title,
      type,
      author,
      topic,
      publication_date,
      pages,
    ])

    return result.rows[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const getBookById = async (req) => {
  const db = await dbConnection.connect()
  const id = Number(req.params.id)

  try {
    const sqlQuery = "select * from books where id = $1"
    const result = await db.query(sqlQuery, [id])

    if (result.rows.length === 0) {
      throw new NotFoundError(`no book with id: ${id}`)
    }

    return result.rows[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const updateBookById = async (req) => {
  const db = await dbConnection.connect()
  const { title, type, author, topic, publication_date, pages } = req.body
  const id = Number(req.params.id)

  try {
    const sqlQuery =
      "update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id = $7 returning *"
    const result = await db.query(sqlQuery, [
      title,
      type,
      author,
      topic,
      publication_date,
      pages,
      id,
    ])

    if (result.rows.length === 0) {
      throw new NotFoundError(`no book with id: ${id}`)
    }

    const booksDb = await getAllBooks(req)
    const titleFound = booksDb.find(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    )

    if (titleFound) {
      throw new ConflictError(`A book with the title: ${title} already exists`)
    }

    return result.rows[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const deleteBookById = async (req) => {
  const db = await dbConnection.connect()
  const id = Number(req.params.id)

  try {
    const sqlQuery = "delete from books where id = $1 returning *"
    const result = await db.query(sqlQuery, [id])

    if (result.rows.length === 0) {
      throw new NotFoundError(`no book with id: ${id}`)
    }

    return result.rows[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

module.exports = {
  getAllBooks,
  postNewBook,
  getBookById,
  updateBookById,
  deleteBookById,
}
