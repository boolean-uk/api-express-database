const express = require('express')
const router = express.Router()
const db = require("../../db");

// GET BY BREED
router.get('/', async (req, res) => {
    const { type } = req.query
    let select_query = 'SELECT DISTINCT breed FROM pets'
    let breed
    breed = await db.query(
        select_query.concat(' WHERE type = $1'),
    [type])
    return res.status(200).json({ breeds: breed.rows })
})

module.exports = router