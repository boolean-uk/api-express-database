const express = require('express')
const router = express.Router()
const db = require("../../db");
const permittedMicrochipValues = ['true', 'false']

router.get('/', async (req, res) => {
  const type = req.query.type
  const microchip = req.query.microchip

  if (microchip && !permittedMicrochipValues.includes(microchip)) {
    return res.status(400).json({error: `microchip: ${microchip} not valid. Accepted types are: ${permittedMicrochipValues}`})
  }

  const page = Number(req.query.page) || 1
  const per_page = Number(req.query.per_page) || 20

  if (per_page < 10 || per_page > 50) {
    return res.status(400).json({error: `per_page value: ${per_page} not valid. Accepted values are between 10 and 50`})
  }

  let sqlString = 'SELECT * FROM "pets"'
  const offset = (page*per_page) - per_page
  values = [per_page, offset]

  if (type && microchip) {
    values = [...values, type, microchip]
    sqlString += ` WHERE type = $3 AND microchip = $4`
  } else if (type) {
    values = [...values, type]
    sqlString += ` WHERE type = $3`
  } else if (microchip) {
    values = [...values, microchip]
    sqlString += ` WHERE microchip = $3`
  }

  sqlString += ` LIMIT $1 OFFSET $2;`
  console.log(sqlString)
  try {
    const result = await db.query(sqlString, values)
    res.json({
      page: page,
      per_page: per_page,
      pets: result.rows
    })
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

router.get('/:id', async (req, res) => {
  const values = [req.params.id]
  try {
    const result = await db.query(`SELECT * FROM "pets" WHERE id = $1;`, values)
    const pet = result.rows[0]
    if (!pet) res.status(404).json({error: `no pet with id: ${req.params.id}`})
    res.json({pet: pet})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

router.post('/', async (req, res) => {
  const sqlString = `INSERT INTO "pets" (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  const values = Object.values(req.body)
  try {
    const result = await db.query(sqlString, values)
    res.json({pet: result.rows[0]})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

module.exports = router
