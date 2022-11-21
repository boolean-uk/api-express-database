const express = require('express')
const router = express.Router()
const db = require("../../db");

// GET
 
router.get('/', async (req, res) => {
    const sqlQuery = `select * from pets`

    const result = await db.query(sqlQuery)

    res.json({
        pets: result.rows
    })
})

router.get('/:id', async (req, res) => {
    const sqlQuery = `select * from pets where id = $1`
    const result = await db.query(sqlQuery, [req.params.id])
    res.json({
        pet: result.rows
    })
})

// POST

router.post('/', async (req, res) => {
    const sqlQuery = `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const newDate = new Date(req.body.publicationDate)
    const result = await db.query(sqlQuery, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.microchip])
    res.json({
        pet: result.rows
    })
})

// PUT

router.put('/:id', async (req, res) => {
    const petID = req.params.id
    const sqlQuery = `UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *`
    const result = await db.query(sqlQuery, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.microchip, petID])
    res.status(201).json({pet: result.rows});
})

// DELETE

router.delete('/:id', async (req, res) => {
    const sqlQuery = `DELETE FROM pets WHERE id = $1`
    const result = await db.query(sqlQuery, [req.params.id]);
    console.log(result)
    res.status(201).json({message: 'Deleted'})
})

module.exports = router