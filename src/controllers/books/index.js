const dbConnection = require('../../utils/dbConnection.js')

const getAllBooks = async() => {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'select * from books'
        const result = await db.query(sqlQuery)

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const createBook = async(req) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `insert into books (title, type, author, topic, publication_date, pages)
        values($1, $2, $3, $4, $5, $6) returning *`
        const result = await db.query(sqlQuery, [req.body.title, req.body.type, req.body.author, req.body.topic, req.body.publication_date, Number(req.body.pages)])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const getBookByID = async(req) => {
    const id = req.params.id
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'select * from books where id =' + id
        const result = await db.query(sqlQuery)

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const updateBook = async(req) => {
    const id = req.params.id
    const db = await dbConnection.connect()
    try {
        const sqlQuery = `update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id=${id} returning *`
        const result = await db.query(sqlQuery, [req.body.title, req.body.type, req.body.author, req.body.topic, req.body.publication_date, Number(req.body.pages)])

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const deleteBook = async(req) => {
    const id = req.params.id
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'delete from books where id=$1 returning *'
        const result = await db.query(sqlQuery, [id])

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}


module.exports = {
    getAllBooks,
    createBook, 
    getBookByID,
    updateBook,
    deleteBook
}