const db = require('../../db/index.js')

async function fetchBooks(reqQuery) {
    let sqlQuery = "SELECT * FROM books"
    const params = []
    // if (reqQuery.type) {
    //     params.push(reqQuery.type)
    //     sqlQuery += ` WHERE type = $${params.length}`
    // }

    // if (reqQuery.topic) {
    //     params.push(reqQuery.topic)
    //         if (params.length ===1) {
    //             sqlQuery += ` WHERE topic = $${params.length}`
    //         } else {
    //             sqlQuery += ` AND topic = $${params.length}`
    //         }
    // }

    if(reqQuery.author) {
        params.push(reqQuery.author)
        sqlQuery += ` WHERE author = $${params.length}`
    }

    try {
        const result = await db.query(sqlQuery, params)
        if (result.rows.length === 1) {
            return result.rows[0]
        }
        return result.rows
    } catch (e) {
        console.log(e)
    } 
}

async function postBook(book) {
    try {
        const sqlQuery = `INSERT INTO books
(title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
        const result = await db.query(sqlQuery, [book.title, book.type, book.author, book.topic, book.publication_date, book.pages])
        return result.rows[0]
    } catch (e) {
        console.log(e)
    } 
}

async function fetchBookById(id) {
    try {
        const sqlQuery = 'SELECT * FROM books WHERE id = $1;'
        const result = await db.query(sqlQuery, [id])
        return result.rows
    } catch (e) {
        console.log(e)
    } 
}

async function updateBookById(id, newParams) {
    try {
        const sqlQuery = 'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *;'
        const result = await db.query(sqlQuery, [id, newParams.title, newParams.type, newParams.author, newParams.topic, newParams.publication_date, newParams.pages])
        return result.rows[0]
    } catch (e) {
        console.log(e)
    } 
}

async function deleteBookById(id) {
    try {
        const sqlQuery = 'DELETE FROM books WHERE id = $1 RETURNING *;'
        const result = await db.query(sqlQuery, [id])
        return result.rows[0]
    } catch (e) {
        console.log(e)
    } 
}


module.exports = { fetchBooks, postBook, fetchBookById, updateBookById, deleteBookById }