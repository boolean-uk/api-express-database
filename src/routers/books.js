const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const books = await db.query('SELECT * from books')
  res.json({ books })
})

module.exports = router
