const express = require('express')
const router = express.Router()
const db = require("../../db");


router.get('/', async (req, res) => {
  const { author, page = 1, perPage = 20 } = req.query;

  try {
    if (author) {
      const authorBooks = await db.query('SELECT * FROM books WHERE author = $1', [author]);
      return res.status(200).json({ books: authorBooks.rows }); // Return multiple books
    }


    if(page && perPage) {
      const parsedPage = parseInt(page);
      const parsedPerPage = parseInt(perPage);

      if (isNaN(parsedPage) || isNaN(parsedPerPage) || parsedPerPage < 10 || parsedPerPage > 50) {
        return res.status(400).json({ error: `parameter invalid perPage: ${parsedPerPage} not valid. Accepted range is 10 - 50` });
      }

      const offset = (parseInt(page) - 1) * parseInt(perPage);
      const limit = parseInt(perPage);
      const books = await db.query('SELECT * FROM books LIMIT $1 OFFSET $2', [limit, offset]);
      const totalBooks = await db.query('SELECT COUNT(*) FROM books');
      const totalCount = parseInt(totalBooks.rows[0].count);

      const totalPages = Math.ceil(totalCount / perPage);

      return res.status(200).json({
        books: books.rows,
        page: parseInt(page),
        per_page: parseInt(perPage),
        total_pages: totalPages,
        total_count: totalCount,
      });

    } 


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  const {title,	type,	author,	topic,	publication_date,	pages } = req.body

  try {
    const newUser = await db.query(
      'INSERT INTO books (title,	type,	author,	topic,	publication_date,	pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title,	type,	author,	topic,	publication_date,	pages]
    )

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
    const doesBookExist = await db.query('SELECT * FROM books WHERE title = $1 AND id != $2', [title, id]);

    if (doesBookExist.rows.length > 0) {
      return res.status(409).json({ error: `A book with the title: ${title} already exists` });
    }

    const bookToEdit = await db.query(
      'UPDATE books SET title = $2,	type = $3,	author = $4,	topic = $5,	publication_date = $6,	pages = $7  WHERE id = $1 RETURNING *', 
      [id, title,	type,	author,	topic,	publication_date,	pages ]
    )

    if (bookToEdit.rows.length === 0) {
    return res.status(404).json({ error: `no book with id: ${id}`})
    }

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
      return res.status(404).json({ error: `no book with id: ${id}`});
    }
    return res.status(201).json({book: bookToDelete.rows[0]})

  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
})


module.exports = router
