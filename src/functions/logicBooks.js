const dbClient = require("../../db/index.js");

const getAllBooks = async () => {
    const db = await dbClient.connect()

    try {
        const sqlQuery = 'SELECT * FROM books'
        const result = await db.query(sqlQuery)
        
        return result.rows
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const createBook = async (info) => {
    const db = await dbClient.connect()
    const { title, type, author, topic, publication_date, pages } = info

    // console.log(info)
    try {
        const sqlQuery = `INSERT INTO books (title, type, author, topic, publication_date, pages) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`
        const postedData = await db.query(sqlQuery, [ title, type, author, topic, publication_date, pages ])
    
        // console.log(postedData)
        return postedData.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const getBookById = async (id) => {
    const db = await dbClient.connect()
    // console.log(id)

    try {
        const sqlQuery = `SELECT * FROM books WHERE id = $1`
        const result = await db.query(sqlQuery, [Number(id)])
        
        return result.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const updateBook = async (id, info) => {
    const db = await dbClient.connect()
    const { title, type, author, topic, publication_date, pages } = info
    // console.log(id)

    try {
        const sqlQuery = `UPDATE books
        Set title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 
        WHERE id = $1
        RETURNING *`
        // console.log(sqlQuery)
        const result = await db.query(sqlQuery, [ Number(id), title, type, author, topic, publication_date, pages ])
        // console.log(result)
        return result.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const deleteBook = async (id) => {
    const db = await dbClient.connect()
    // console.log(id)

    try {
        const sqlQuery = `DELETE FROM books 
        WHERE id = $1
        RETURNING *`
        const result = await db.query(sqlQuery, [Number(id)])
        
        return result.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook, 
    deleteBook
}