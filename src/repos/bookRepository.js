const dbConnection = require('../../utils/dbConnection')

async function fetchBooks() {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'SELECT * FROM books'
        const result = await db.query(sqlQuery)
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
(title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const result = await db.query(sqlQuery, [book.title, book.type, book.author, book.topic, book.publication_date, book.pages])
        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}


module.exports = { fetchBooks, postBook }