const db = require("../../db");

const getAllBooks = async () => {
    const bookdata = await db.query("SELECT * FROM books;");

    return bookdata.rows;
};

const createNewBook = async (str, values) => {
    const bookdata = await db.query(
        `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES` 
        + str 
        + `RETURNING *;`, 
        values
    )
        
    return bookdata.rows[0]
}

const getBookByid = async (str) => {
    const bookdata = await db.query(str)
    const book = bookdata.rows[0]
    return book
}

const updatebook = async (str, values) => {
    const bookdata = await db.query(str, values)
    return bookdata.rows[0]
}

const deletebook = async (str) => {
    const bookdata = await db.query("DELETE FROM books WHERE id = " + str + ` RETURNING *;`)
    return bookdata.rows[0]
}

module.exports = {
    getAllBooks,
    createNewBook,
    getBookByid,
    updatebook,
    deletebook
}