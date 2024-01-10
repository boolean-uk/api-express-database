const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  try {
    const books = await db.query( 'SELECT * FROM books' )
    return res.status(200).json({books : books.rows})

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


router.post('/', async (req, res) => {
  const {title,	type,	author,	topic,	publication_date,	pages } = req.body

  try {
    const newUser = await db.query(
      'INSERT INTO books (title,	type,	author,	topic,	publication_date,	pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title,	type,	author,	topic,	publication_date,	pages]
    )
    console.log(newUser)
    return res.status(201).json({book: newUser.rows[0]})

  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
})


router.get('/:id', async (req, res) => {
  const {id} = req.params

  try {
    const bookFound = await db.query(
      'SELECT * FROM books WHERE id = $1', [id]
    )

    if (bookFound.rows.length === 0) {
      return res.status(404).json({ error: `no book with id: ${id}` });
    }
    return res.status(200).json({book: bookFound.rows[0]})

  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
})


router.put('/:id', async (req, res) => {
  const {id} = req.params
  const {title,	type,	author,	topic,	publication_date,	pages } = req.body

try {
  const bookToEdit = await db.query(
    'UPDATE books SET title = $2,	type = $3,	author = $4,	topic = $5,	publication_date = $6,	pages = $7  WHERE id = $1 RETURNING *', 
    [id, title,	type,	author,	topic,	publication_date,	pages ]
  )
  return res.status(201).json({book: bookToEdit.rows[0]})

} catch (error) {
  return res.status(500).json({ error: error.message})
}
})


router.delete('/:id', async (req, res) => {
  const {id} = req.params

  try {
    const bookToDelete = await db.query(
      'DELETE FROM books WHERE id = $1 RETURNING *', [id]
    )

    if (bookToDelete.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(201).json({book: bookToDelete.rows[0]})

  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
})

module.exports = router
