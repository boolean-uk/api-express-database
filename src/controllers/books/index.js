const dbConnection = require('../../utils/dbConnection.js')

const getAllBooks = async(req, page, perPage) => {
    const db = await dbConnection.connect()

    const author = req.body.author
    let offset

    if(page > 1) {
        offset = perPage-1
    }
    
    try {
        if(author === undefined) {
            const sqlQuery = `select * from books limit $1 offset $2`
            const result = await db.query(sqlQuery, [perPage, offset])
            return result.rows
        }
        const sqlQuery = `select * from books where author = $1 limit $2 offset $3 order by author`
        const result = await db.query(sqlQuery, [author, perPage, offset])

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const createBook = async(req) => {
    const db = await dbConnection.connect()

    const title = req.body.title
    const type = req.body.type
    const author = req.body.author
    const topic = req.body.topic
    const pub_date = req.body.publication_date
    const pages = Number(req.body.pages)
    try {
        const sqlQuery = `insert into books (title, type, author, topic, publication_date, pages)
        values($1, $2, $3, $4, $5, $6) returning *`
        const result = await db.query(sqlQuery, [title, type, author, topic, pub_date, pages])

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

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const updateBook = async(req) => {
    const db = await dbConnection.connect()
    const id = req.params.id
    const title = req.body.title
    const type = req.body.type
    const author = req.body.author
    const topic = req.body.topic
    const pub_date = req.body.publication_date
    const pages = Number(req.body.pages)
    try {
        const sqlQuery = `update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id=${id} returning *`
        const result = await db.query(sqlQuery, [title, type, author, topic, pub_date, pages])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const deleteBook = async(req) => {
    const id = Number(req.params.id)
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'delete from books where id=$1 returning *'
        const result = await db.query(sqlQuery, [id])

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
    getBookByID,
    updateBook,
    deleteBook
}