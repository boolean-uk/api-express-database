const express = require('express')
const router = express.Router()
const db = require("../../db")



router.get('/', async (req, res) => {
  console.log(extractParams(req.query))

  let queryStr = "SELECT * FROM pets"
  const pets = await db.query(queryStr)
  res.json( {  pets: pets.rows })
})

module.exports = router