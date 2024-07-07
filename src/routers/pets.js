const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const type = req.query.type
    const response = await db.query(`select * FROM pets ${type !==undefined ? "WHERE type = $1" : ""}`, type !== undefined ? [type] : [])
    res.json({pets: response.rows.map(parsePet)})
})
router.get('/:id', async (req, res) => {
    const response = await db.query("select * FROM pets WHERE id = $1 ", [req.params.id])
    res.json({pet: parsePet(response.rows[0])})
})
router.put('/:id', async (req, res) => {
    // console.log("BumbaClap", req.body)
    const update = await db.query(
        `UPDATE pets
            SET name = $1,
            age = $2,
            type = $3,
            breed = $4,
            has_microchip = $5
            WHERE id = $6;
`, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.has_microchip, req.params.id ])
    const response = await db.query("select * FROM pets WHERE id = $1 ", [req.params.id])
    res.status(201).json({pet: parsePet(response.rows[0])})
})
router.delete('/:id', async (req, res) => {

    const deleteResponse  = await db.query("DELETE FROM pets WHERE id = $1 RETURNING *;", [req.params.id])
    // console.log("data", deleteResponse)
    res.status(201).json({pet: parsePet(deleteResponse.rows[0])})
})
router.post('/', async (req, res) => {
    // console.log("BumbaClap", req.body)
    const update = await db.query(
        `INSERT INTO pets (name, age, type, breed, has_microchip)
VALUES ($1, $2, $3, $4, $5) RETURNING *;
`, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.has_microchip])
    // console.log("test", update.rows[0])
const response = await db.query("select * FROM pets WHERE id = $1 ", [update.rows[0].id])
    res.status(201).json({pet: parsePet(response.rows[0])})
})

function parsePet(data) {
    return {...data, has_microchip: !!data.has_microchip}
}

module.exports = router
