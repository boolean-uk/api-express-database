const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const type = req.query.type
    const result = await db.query('SELECT * FROM pets WHERE type ILIKE $1',[type]);
    res.json({ pets:result.rows })
})

router.post('/', async (req, res) => {
    const { name, type, age, breed, microchip} = req.body;
    const result = await db.query('INSERT INTO pets ( name, type, age, breed, microchip)' + 
    'VALUES ($1, $2, $3, $4, $5)' +
    'RETURNING *', [ name, type, age, breed, microchip]);
    res.json( { pet: result.rows[0]});
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await db.query('SELECT * FROM pets WHERE id = $1', [id])
    res.json({ pet: result.rows })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, type, age, breed, microchip} = req.body;
    const result = await db.query(`UPDATE pets
    SET name = $2, type = $3, age = $4, breed = $5, microchip = $6
    WHERE id = $1
    RETURNING *`, [id, name, type, age, breed, microchip])
    res.json( { pet: result.rows[0]} )
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await db.query(`DELETE FROM pets
    WHERE id = $1
    RETURNING *`, [id])
    res.json({ pet: result.rows[0]})
})


module.exports = router