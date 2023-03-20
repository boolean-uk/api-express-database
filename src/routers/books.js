const express = require('express')
const router = express.Router()
const { 
    getAll,
    createBook,
    getBook,
    updateBook,
    deleteBook
 } = require("../controllers/books")

router.get("/", async (req, res) => {
    await getAll(req, res)
});

router.post("/", async (req, res) => {
    const { title, type, author, topic, publicationDate, pages } = req.body;
    const str = ` ($1, $2, $3, $4, $5, $6)`;
    const values = [title, type, author, topic, publicationDate, pages];
    await createBook(req, res, str, values)
});

router.get("/:id", async (req, res) => {
    let str = "SELECT * FROM books";
    str += ` WHERE id = ${req.params.id};`;
    await getBook(req, res, str)
})

// router.get("/:author", async (req, res) => {
//     const author = req.params.author
//     const str = `SELECT * FROM books WHERE author = $1`
//     const values = [author]
//     const data = await db.query(str, values)
//     res.json({book: data.rows[0]})
// })

router.put("/:id", async (req, res) => {
    const {title, type, author, topic, publicationDate, pages} = req.body
    let str = `UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, 
    pages = $6 `
    str += `WHERE id = ${req.params.id} RETURNING *;`
    const values = [title, type, author, topic, publicationDate, pages]
    await updateBook(req, res, str, values)
})

router.delete("/:id", async (req, res) => {
    const str = req.params.id
    await deleteBook(req, res, str)
})

module.exports = router
