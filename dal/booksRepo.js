const dbConnection = require('../utils/dbConnection.js')

const getAllBooks = async (type, topic) => {
    const db = await dbConnection.connect()

    try {
        if (type) {
            const sqlQuery = `select * from books where type = $1`
            const result = await db.query(sqlQuery, [type])

            return result.rows
        }

        if (topic) {
            const sqlQuery = `select * from books where topic = $1`
            const result = await db.query(sqlQuery, [topic])

            return result.rows
        }

        const sqlQuery = 'select * from books'
        const result = await db.query(sqlQuery)

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const createBook = async (book) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `insert into books (title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6) returning *`
        const result = await db.query(sqlQuery, [book.title, book.type, book.author, book.topic, book.publication_date, book.pages])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const getBookById = async (id) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `select * from books where id = $1`
        const result = await db.query(sqlQuery, [id])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const updateBook = async (id, bookInfo) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id = $7 returning *`
        const result = await db.query(sqlQuery, [bookInfo.title, bookInfo.type, bookInfo.author, bookInfo.topic, bookInfo.publication_date, bookInfo.pages, id])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook
}