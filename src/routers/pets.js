const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.perPage) || 20
  const offset = (page-1) * limit

  if (limit < 10 || limit > 50) {
    return res.status(400).json({error: `parameter invalid perPage: ${limit} not valid. Accepted range is 10 - 50`})
  }

  let sqlString = 'SELECT * FROM "pets" OFFSET $1 LIMIT $2;'
  const values = [offset, limit]

  try {
    const result = await db.query(sqlString, values)
    res.json({
      page: page,
      per_page: limit,
      pets: result.rows
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({error: e.message})
  }
})

router.get('/:id', async (req, res) => {
  const values = [req.params.id]
  try {
    const result = await db.query(`SELECT * FROM "pets" WHERE id = $1;`, values)
    const pet = result.rows[0]
    if (!pet) return res.status(404).json({error: `no pet with id: ${req.params.id}`})
    res.json({pet: pet})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

router.post('/', async (req, res) => {
  const requiredFields = ['name', 'age', 'type', 'breed', 'microchip']
  const missingFields = []
  requiredFields.forEach(field => {
    if (!req.body[field]) missingFields.push(field)
  })

  if (missingFields.length !== 0) {
    return res.status(400).json({error: `missing fields: ${missingFields.join(', ')}`})
  }

  const values = Object.values(req.body)
  const sqlString = `INSERT INTO "pets" (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;`

  try {
    const result = await db.query(sqlString, values)
    res.status(201).json({pet: result.rows[0]})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

router.put('/:id', async (req, res) => {
  const values = [req.params.id, Object.values(req.body)].flat()
  try {
    const result = await db.query(`UPDATE "pets" SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 WHERE id = $1 RETURNING *;`, values)
    const pet = result.rows[0]
    if (!pet) return res.status(404).json({error: `no pet with id: ${req.params.id}`})
    res.status(201).json({pet: pet})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})


router.delete('/:id', async (req, res) => {
  const values = [req.params.id]
  try {
    const result = await db.query(`DELETE FROM "pets" WHERE id = $1 RETURNING *;`, values)
    const pet = result.rows[0]
    if (!pet) return res.status(404).json({error: `no pet with id: ${req.params.id}`})
    res.status(201).json({pet: pet})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

module.exports = router
