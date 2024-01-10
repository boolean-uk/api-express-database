const express = require('express')
const router = express.Router()
const db = require("../../db")
const extractParams = require('../helper')

router.get('/', async (req, res) => {
  const pets = await db.query("SELECT * FROM pets")
  res.json( {  pets: pets.rows })
})

module.exports = router