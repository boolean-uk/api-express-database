const express = require('express');
const router = express.Router();
const db = require("../../db");


router.get('/', async (req, res) => {
  const { type } = req.query
  let result

  if (type) {
    result = await db.query('SELECT * FROM pets WHERE type = $1', [type])
  } else {
    result = await db.query('SELECT * FROM pets')
  }
  res.json({ pets: result.rows })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const result = await db.query('SELECT * FROM pets WHERE id = $1', [id])
  res.json({ pets: result.rows[0] });
})


module.exports = router
