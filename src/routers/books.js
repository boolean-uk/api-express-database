const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const type = req.query.type
  const topic = req.query.topic
  let sqlString = 'SELECT * FROM "books"'
  // as an example of interpolation
  if (type && topic) {
    sqlString += ` WHERE type = '${type}' AND topic = '${topic}';`
  } else if (type) {
    sqlString += ` WHERE type = '${type}';`
  } else if (topic) {
    sqlString += ` WHERE topic = '${topic}';`
  }
  const result = await db.query(sqlString)
  res.json({books: result.rows})
})

router.get('/:id', async (req, res) => {
  const values = [req.params.id]
  const result = await db.query(`SELECT * FROM "books" WHERE id = $1;`, values)
  const book = result.rows[0]
  res.json({book: book})
  res.status(404).json({error: `no book with id: ${id}`})
})

router.post('/', async (req, res) => {
  const sqlString = `INSERT INTO "books" (title, type, author, topic, publicationDate, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  const values = Object.values(req.body)
  const result = await db.query(sqlString, values)
  res.json({book: result.rows[0]})
})

module.exports = router
