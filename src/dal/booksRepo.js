const ConflictError = require("../errors/ConflictError.js")
const MissingFieldError = require("../errors/MissingFieldError.js")
const NotFoundError = require("../errors/NotFoundError.js")
const dbConnection = require("../utils/dbConnection.js")
const getPaginationParams = require("../utils/pagination.js")

const getAllBooks = async (req) => {
  const { page, per_page } = getPaginationParams(req)
  const author = req.query.author

  let sqlQuery = "select * from books"
  let result = await dbConnection.query(sqlQuery)

  const calculateOffset = () => (page - 1) * per_page

  if (author) {
    sqlQuery = "select * from books where author = $1 limit $2 offset $3"
    result = await dbConnection.query(sqlQuery, [
      author,
      per_page,
      calculateOffset(),
    ])
  } else {
    sqlQuery = "select * from books limit $1 offset $2"
    result = await dbConnection.query(sqlQuery, [per_page, calculateOffset()])
  }

  return result.rows
}

const postNewBook = async (req) => {
  const { title, type, author, topic, publication_date, pages } = req.body

  if (
    [title, type, author, topic, publication_date, pages].some(
      (prop) => prop === undefined
    )
  ) {
    throw new MissingFieldError("Missing fields in the request body")
  }

  const sqlQuery =
    "insert into books (title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6) returning *"
  const result = await dbConnection.query(sqlQuery, [
    title,
    type,
    author,
    topic,
    publication_date,
    pages,
  ])

  return result.rows[0]
}

const getBookById = async (req) => {
  const id = Number(req.params.id)
  const sqlQuery = "select * from books where id = $1"
  const result = await dbConnection.query(sqlQuery, [id])

  if (result.rows.length === 0) {
    throw new NotFoundError(`no book with id: ${id}`)
  }

  return result.rows[0]
}

const updateBookById = async (req) => {
  const { title, type, author, topic, publication_date, pages } = req.body
  const id = Number(req.params.id)
  const conflictQuery = "select * from books where title = $1 and id != $2"
  const conflictResult = await dbConnection.query(conflictQuery, [title, id])

  if (conflictResult.rows.length > 0) {
    throw new ConflictError(`A book with the title: ${title} already exists`)
  }

  const sqlQuery =
    "update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id = $7 returning *"
  const result = await dbConnection.query(sqlQuery, [
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

  return result.rows[0]
}

const deleteBookById = async (req) => {
  const id = Number(req.params.id)
  const sqlQuery = "delete from books where id = $1 returning *"
  const result = await dbConnection.query(sqlQuery, [id])

  if (result.rows.length === 0) {
    throw new NotFoundError(`no book with id: ${id}`)
  }

  return result.rows[0]
}

module.exports = {
  getAllBooks,
  postNewBook,
  getBookById,
  updateBookById,
  deleteBookById,
}
