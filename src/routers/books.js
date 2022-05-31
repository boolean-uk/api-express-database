const express = require('express')
const router = express.Router()
const db = require("../../db");
const permittedTypes = ['Fiction', 'Non-Fiction']

router.get('/', async (req, res) => {
  const topic = req.query.topic
  const type = req.query.type

  if (type && !permittedTypes.includes(type)) {
    res.status(400).json({error: `type: ${type} not valid. Accepted types are: ${permittedTypes}`})
  }

  let sqlString = 'SELECT * FROM "books"'
  // as an example of interpolation
  if (type && topic) {
    sqlString += ` WHERE type = '${type}' AND topic = '${topic}';`
  } else if (type) {
    sqlString += ` WHERE type = '${type}';`
  } else if (topic) {
    sqlString += ` WHERE topic = '${topic}';`
  }

  try {
    const result = await db.query(sqlString)
    res.json({books: result.rows})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

router.get('/:id', async (req, res) => {
  const values = [req.params.id]
  try {
    const result = await db.query(`SELECT * FROM "books" WHERE id = $1;`, values)
    const book = result.rows[0]
    if (!book) res.status(404).json({error: `no book with id: ${req.params.id}`})
    res.json({book: book})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

router.post('/', async (req, res) => {
  const sqlString = `INSERT INTO "books" (title, type, author, topic, publicationDate, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  const values = Object.values(req.body)
  try {
    const result = await db.query(sqlString, values)
    res.json({book: result.rows[0]})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

module.exports = router
