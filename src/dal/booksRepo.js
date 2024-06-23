const ConflictError = require("../errors/ConflictError.js")
const MissingFieldError = require("../errors/MissingFieldError.js")
const NotFoundError = require("../errors/NotFoundError.js")
const dbConnection = require("../utils/dbConnection.js")

const getAllBooks = async (req) => {
  const db = await dbConnection.connect()
  const author = req.query.author
  let page = 1
  let perPage = 20

  try {
    let sqlQuery = "select * from books"
    let result = await db.query(sqlQuery)

    if (author) {
      sqlQuery = "select * from books where author = $1"
      result = await db.query(sqlQuery, [author])
    }

    if (req.query.page && req.query.perPage) {
      page = Number(req.query.page)
      perPage = Number(req.query.perPage)
      
      if (perPage > 50 || perPage < 10 || page < 1) {
        throw new MissingFieldError(`parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`)
      }

      const calculateOffset = () => {
        if (page === 1) {
          return 0
        } else if (page === 2) {
          return perPage
        } else {
          return perPage * page
        }
      }

      sqlQuery = "select * from books limit $1 offset $2"
      result = await db.query(sqlQuery, [perPage, calculateOffset()])

      if (author) {
        sqlQuery = "select * from books where author = $1 limit $2 offset $3"
        result = await db.query(sqlQuery, [author, perPage, calculateOffset()])
      }

      if (result.rows.length === 0) {
        throw new MissingFieldError("The number of books per page exceeds the total")
      }
      
      return {
        ...result.rows,
        perPage,
        page
      }
    }

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
    const conflictQuery = "select * from books where title = $1 and id != $2"
    const conflictResult = await db.query(conflictQuery, [title, id])

    if (conflictResult.rows.length > 0) {
      throw new ConflictError(`A book with the title: ${title} already exists`)
    }

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
