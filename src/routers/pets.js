const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * from pets');
    res.json({pets: result.rows})
})

router.post('/', async(req, res) => {
    const { name, age, type, breed, microchip } = req. body
    const result = await db.query('INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, age, type, breed, microchip]);
    res.status(201).json({pet: result.rows[0]})
})

router.get('/:id', async(req, res) => {
    const  id  = req.params.id
    const result = await db.query('SELECT * FROM pets WHERE id = $1', [id]);
    res.json({pet: result.rows[0]})

})




module.exports = router