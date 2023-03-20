// const express = require('express')
// const router = express.Router()
// const db = require('../../db');
// // const {getAllBooks} = require('../controllers/books')



// router.get('/', async (req, res) => {
//     //get all books
//     //query the DB using a SELECT


//    // const {author, page, per_page} = req.query

//     const str = 'SELECT * FROM books;'
//     let values = []

//     // if(author || page || per_page){
//     //     str += 'WHERE author, page, per_gage = $1;'
//     //     values = [author, page, per_page]
//     // }
//     // str+= ';'

//     const data = await db.query(str, values)
//     console.log(data)
//     const books = data.rows

//     res.json({ books })
// })


// router.post('/', async (req, res) => {
//     const { title, type, author, topic, publicationDate, pages } = req.body

//     const str = 'INSERT INTO books (title, type, author, topic, "publicationDate", pages ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
//     const values = [title, type, author, topic, publicationDate, pages]

//     const data = await db.query(str, values)
//     res.status(201).json({ book: data.rows[0] });
// })



// router.get('/:id', async (req, res) => {
//     const id = Number(req.params.id)
//     const str = 'SELECT * FROM books WHERE id = $1;'
//     const values = [id]
//     const data = await db.query(str, values)
//     res.json({ book: data.rows[0] })
// })

// router.put('/:id', async (req, res) => {
//     const { title, type, author, topic, publicationDate, pages } = req.body
//     const id = Number(req.params.id);
//     const str = `UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;`;
//     const values = [id, title, type, author, topic, publicationDate, pages];
//     const data = await db.query(str, values)
//     res.status(201).json({ book: data.rows[0] })
// })

// router.delete('/:id', async (req, res) => {
//     const id = Number(req.params.id);
//     const str = 'DELETE FROM  books WHERE id = $1 RETURNING *;'
//     const values = [id]
//     const data = await db.query(str, values)
//     res.status(201).json({ book: data.rows[0] })
// })
// module.exports = router;



const express = require('express')
const router = express.Router()
// const db = require('../../db');
const booksCont = require('../controllers/books')

//get all books
router.get('/', booksCont.getBooks)

//create new book
router.post('/', booksCont.postBook)

//get book by id
router.get('/:id', booksCont.getBookByID)

//update a book
router.put('/:id', booksCont.putBook)

//delete a book
router.delete('/:id', booksCont.deleteBookById)

module.exports = router;


