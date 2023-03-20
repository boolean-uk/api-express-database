const db = require('../../db');

// const getAllBooks = async (author, page, per_page) => {
//     let authors = ''
//     let pages = 1
//     let perPage = 20
//     let filter = ''

//     if (author) {
//         authors = "AND author = $1"
//     }

//     if (per_page) {
//         perPage = 'LIMIT $1'
//     }
//     if (page) {
//         pages = page * perPage

//         return (pages = perPage)
//     }

//     const bookdata = await db.query("SELECT * FROM books;");

//     return bookdata.rows;
// }

const postBook = async (values) => {
    const str = 'INSERT INTO books (title, type, author, topic, "publicationDate", pages ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
    return  await db.query(str, values)
    // const books = data.rows[0]
    // res.json({ books })
}

const getBookByID = async (values) => {
    const str = 'SELECT * FROM books WHERE id = $1;'
    const data = await db.query(str, values)
    const book = data.rows[0]
    return book;
}
const getBookByTitle = async (values) => {
    const str = 'SELECT * FROM books WHERE title = $1;'
    const data = await db.query(str, values)
    const book = data.rows[0]
    return book;
}
const putBook = async (values) => {
    const str = `UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;`;
    const data = await db.query(str, values)
    const book = data.rows[0]
    res.json({ book})
}

const deleteBookById = async (values) => {
    const str = 'DELETE FROM  books WHERE id = $1 RETURNING *;';
    const data = await db.query(str, values);
    const book = data.rows[0];
    return book;
}
module.exports = {
    getAllBooks,
    postBook,
    getBookByID,
    putBook,
    getBookByTitle,
    deleteBookById
}


// const db = require("../../db");

// const getBooks = async (values) => {
//   let str = `SELECT * FROM books `;
//   if (values.length === 3) {
//     str += `WHERE author = $3 `;
//   }
//   str += `LIMIT $1 OFFSET $2 ;`;
//   return await db.query(str, values);
// };

