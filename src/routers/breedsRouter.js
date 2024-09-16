const express = require('express')
const router = express.Router()
const db = require('../../db')

// Retrieve all unique breeds for a given type
router.get('/', async (req, res, next) => {
  const { type } = req.query

  const result = await db.query(
    `select distinct breed from pets${type ? ` where type=$1` : ''}`,
    [type].filter((item) => item !== undefined)
  )

  res.status(200).json({ breeds: result.rows })
})

module.exports = router
