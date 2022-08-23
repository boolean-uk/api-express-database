const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', async (req, res) => {
  let sqlArgs = {
    query: 'SELECT * FROM books',
    params: [],
  };
  const { type, topic } = req.query;

  if (type && topic) {
    sqlArgs.query += ' WHERE type = $1 AND topic = $2;';
    sqlArgs.params.push(type, topic);
  } else if (type) {
    sqlArgs.query += ' WHERE type = $1;';
    sqlArgs.params.push(type);
  } else if (topic) {
    sqlArgs.query += ' WHERE topic = $1;';
    sqlArgs.params.push(type);
  }

  const dbRes = await db.query(sqlArgs.query, sqlArgs.params);
  res.status(200).json({
    books: dbRes.rows,
  });
});

module.exports = router;
