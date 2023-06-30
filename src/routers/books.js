const express = require('express');
const router = express.Router();
const db = require("../../db");


const getWithTypeAndTopic = async (type, topic) => {
  let string = 'SELECT * FROM books '

  if (type === 'Fiction' || type === 'Non-Fiction') {
    if (topic) {
      string += 'WHERE type = $1 AND topic = $2'
      return await db.query(string, [type], [topic])
    }
    return res.json({ books: result.rows })
  }
  return await db.query('SELECT * FROM books')
}

router.get('/', async (req, res) => {
  const { type, topic } = req.query

  const result = getWithTypeAndTopic(type, topic)
  res.json({ books: result.rows })
})

module.exports = router
