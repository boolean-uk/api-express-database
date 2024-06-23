const pool = require('../../db')

const getBooks = async (req, res) => {
    const db = await pool.connect()

    const sqlQuery = 'select * from books'
    const result = await db.query(sqlQuery)

    db.release()

    res.send({ books: result.rows })
}

const createBook = async (req, res) => {
    const db = await pool.connect()

    const { title, type, author, topic, publication_date, pages } = req.body

    if (
        !title ||
        !type ||
        !author ||
        !topic ||
        !publication_date ||
        !Number.isInteger(pages)
    ) {
        res.status(400).json({
            error: 'All fields are required and pages must be an integer.',
        })
    }

    try {
        const result = await db.query(
            `INSERT INTO books (title, type, author, topic, publication_date, pages) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [title, type, author, topic, publication_date, pages]
        )

        return res.status(201).json({ book: result.rows[0] })
    } catch (err) {
        console.error('Error inserting book:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        db.release()
    }
}

const getBookById = async (req, res) => {
    const db = await pool.connect()

    const sqlQuery = 'select * from books where id = $1'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    res.send({ book: result.rows[0] })
}

const updateBookById = async (req, res) => {
    const db = await pool.connect()

    const { title, type, author, topic, publication_date, pages } = req.body

    if (
        !title ||
        !type ||
        !author ||
        !topic ||
        !publication_date ||
        !Number.isInteger(pages)
    ) {
        res.status(400).json({
            error: 'All fields are required and pages must be an integer.',
        })
    }

    try {
        const result = await db.query(
            `Update books
             Set title = $1 , type = $2 , author = $3 , topic = $4 , publication_date = $5 , pages = $6
             where id = $7
             RETURNING *`,
            [title, type, author, topic, publication_date, pages, req.params.id]
        )

        return res.status(201).json({ book: result.rows[0] })
    } catch (err) {
        console.error('Error inserting book:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        db.release()
    }
}

const deleteBookById = async (req, res) => {
    const db = await pool.connect()

    const sqlQuery = 'delete from books where id = $1 RETURNING *'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    res.status(201).send({ book: result.rows[0] })
}

module.exports = {
    getBooks,
    createBook,
    getBookById,
    deleteBookById,
    updateBookById,
}
