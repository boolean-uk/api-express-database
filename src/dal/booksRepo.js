const dbConnection = require('../utils/dbConnection.js')
const MissingFieldsError = require('../errors/missingFieldsError.js')
const { as } = require('pg-promise')

const getAllBooks = async (type, topic, author, pages, perpages) => {
    const db = await dbConnection.connect()
    
    try {
        let page = 1
        let perpage = 20
        let offset = 0

        if (pages) {
            page = pages
            offset = (page - 1) * perpage
        }

        if (perpages > 9 && perpages < 51) {
            perpage = perpages
            offset = (page - 1) * perpage
        }

        if (type) {
            const sqlQuery = `select * from books where type = $1 limit = $2 offset = $3`
            const result = await db.query(sqlQuery, [type])

            return result.rows
        }

        if (topic) {
            const sqlQuery = `select * from books where topic = $1`
            const result = await db.query(sqlQuery, [topic])

            return result.rows
        }

        if (author) {
            const sqlQuery = `select * from books where author = $1`
            const result = await db.query(sqlQuery, [author])

            return result.rows
        }

        const sqlQuery = `select * from books limit $1 offset $2`
        const result = await db.query(sqlQuery, [perpage, offset])

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const createBook = async (book) => {
    const db = await dbConnection.connect()

    if (!verifyFields(book)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

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

const deleteBookById = async (id) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `delete from books where id = $1 returning *`
        const result = await db.query(sqlQuery, [id])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

function verifyFields(object) {
    const neededProperties = ['title', 'type', 'author', 'topic', 'publication_date', 'pages']

    for (const item of neededProperties) {
        if (object[item] === undefined) {
            return false
        }
    }

    return true
}

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBookById
}