const pool = require('../../db')

const types = new Map([
    ['Fiction', "type = 'Fiction'"],
    ['Non-Fiction', "type = 'Non-Fiction'"],
])

async function getBooks(req) {
    const db = await pool.connect()
    const { type, topic } = req.query

    const queryContents = []

    let sqlQuery = 'select * from books where 1 = 1'

    if (types.has(type)) {
        queryContents.push(type)
        sqlQuery += ` and type = $${queryContents.length}`
        console.log(sqlQuery)
    }

    if (topic) {
        queryContents.push(topic)
        sqlQuery += ` and topic = $${queryContents.length}`
        console.log(sqlQuery)
    }

    const result = await db.query(sqlQuery, queryContents)

    db.release()

    return result
}

async function createBook(req) {
    const db = await pool.connect()
    const { title, type, author, topic, publication_date, pages } = req.body

    try {
        const result = await db.query(
            `INSERT INTO books (title, type, author, topic, publication_date, pages) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [title, type, author, topic, publication_date, pages]
        )

        return result
    } catch (err) {
        console.error('Error inserting book:', err)
    } finally {
        db.release()
    }
}

async function getBookById(req) {
    const db = await pool.connect()

    const sqlQuery = 'select * from books where id = $1'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    return result
}

async function updateBookById(req) {
    const db = await pool.connect()
    const { title, type, author, topic, publication_date, pages } = req.body

    const result = await db.query(
        `Update books
             Set title = $1 , type = $2 , author = $3 , topic = $4 , publication_date = $5 , pages = $6
             where id = $7
             RETURNING *`,
        [title, type, author, topic, publication_date, pages, req.params.id]
    )

    db.release()

    return result
}

async function deleteBookById(req) {
    const db = await pool.connect()

    const sqlQuery = 'delete from books where id = $1 RETURNING *'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    return result
}

module.exports = { getBooks, createBook, getBookById , updateBookById, deleteBookById}
