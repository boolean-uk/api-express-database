const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/:type', async (req, res) => {
  const type = req.params.type
  const result = await db.query('SELECT * FROM books WHERE type = $1', [type])
  res.json({ books: result.rows })
})

module.exports = router
