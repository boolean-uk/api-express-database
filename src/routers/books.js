const express = require('express');
// const removeSubdocs = require('mongoose/lib/plugins/removeSubdocs');
const router = express.Router();
const db = require("../../db");

// get all books
router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM books');
    res.json({data:result.rows});
});

// get a book by its id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await db.query(`SELECT * FROM books WHERE id = ${id}`);
    res.json({data:result.rows});
});

// post a book
router.post('/', async (req, res) => {
    const {title, type, author, topic, publicationDate, pages} = req.body;
    const result = await db.query(`INSERT INTO books (title, type, author, topic, "publicationDate", pages)
    VALUES('${title}', '${type}', '${author}', '${topic}' '${publicationDate}', ${pages}) RETURNING *
    `)
    res.json({ data: result.rows });
});

router.put('/:id', async(req,res) =>{
    const {id} = req.params;
    const {title, type, author, topic, publicationDate, pages} = req.body;
    const result = db.query(`
    UPDATE books
    SET title = '${title}', type = '${type}', author = '${author}', topic = '${topic}', "publicationDate" = '${publicationDate}', pages = '${pages}'
    WHERE id = ${id}
    RETURNING *
    `)
    res.json({ data: result.rows });
})
module.exports = router;
