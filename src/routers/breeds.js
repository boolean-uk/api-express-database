const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const type = req.query.type || ''
  let sqlString = 'SELECT DISTINCT breed FROM "pets" WHERE breed IN (SELECT breed FROM "pets" WHERE type = $1);'
  const values = [type]
  try {
    const result = await db.query(sqlString, values)
    res.json({ breeds: result.rows })
  } catch (e) {
    console.log(e)
    res.status(500).json({error: e.message})
  }
})

module.exports = router
