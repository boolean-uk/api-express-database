const express = require('express')
const router = express.Router()
const db = require('../../db')

router.get('/', async (req, res, next) => {
  const { type } = req.query

  let pets = null

  if (type) {
    pets = await db.query('select * from pets where type = $1', [type])
  }

  if (!type) {
    pets = await db.query('select * from pets')
  }

  res.status(200).json({ pets: pets.rows })
})

module.exports = router
