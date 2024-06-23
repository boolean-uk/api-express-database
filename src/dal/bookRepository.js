const dbConnection = require('../../utils/dbConnection')

async function fetchBooks(reqQuery) {
    const db = await dbConnection.connect()
    const params = []
    let sqlQuery = "SELECT * FROM books"

    if (reqQuery.type) {
        params.push(reqQuery.type)
        sqlQuery += ` WHERE type = $${params.length}`
    }

    if (reqQuery.topic) {
        params.push(reqQuery.topic)
            if (params.length ===1) {
                sqlQuery += ` WHERE topic = $${params.length}`
            } else {
                sqlQuery += ` AND topic = $${params.length}`
            }
    }

    try {
        const result = await db.query(sqlQuery, params)
        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

async function postBook(book) {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = `INSERT INTO books
(title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
        const result = await db.query(sqlQuery, [book.title, book.type, book.author, book.topic, book.publication_date, book.pages])
        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

async function fetchBookById(id) {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'SELECT * FROM books WHERE id = $1;'
        const result = await db.query(sqlQuery, [id])
        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

async function updateBookById(id, newParams) {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *;'
        const result = await db.query(sqlQuery, [id, newParams.title, newParams.type, newParams.author, newParams.topic, newParams.publication_date, newParams.pages])
        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

async function deleteBookById(id) {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'DELETE FROM books WHERE id = $1 RETURNING *;'
        const result = await db.query(sqlQuery, [id])
        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}


module.exports = { fetchBooks, postBook, fetchBookById, updateBookById, deleteBookById }