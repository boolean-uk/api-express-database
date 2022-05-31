const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const type = req.query.type
  const values = []
  let sqlString = 'SELECT * FROM "pets"'

  if (type) {
    sqlString += ` WHERE type = $1;`
    values.push(type)
  }

  const result = await db.query(sqlString, values)
  res.json({books: result.rows})
})

router.get('/:id', async (req, res) => {
  const values = [req.params.id]
  const result = await db.query(`SELECT * FROM "pets" WHERE id = $1;`, values)
  const book = result.rows[0]
  res.json({book: book})
})

router.post('/', async (req, res) => {
  const sqlString = `INSERT INTO "pets" (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  const values = Object.values(req.body)
  const result = await db.query(sqlString, values)
  res.json({book: result.rows[0]})
})

module.exports = router
