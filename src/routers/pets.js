const express = require('express')
const router = express.Router()
const db = require('../../db')

// GET ALL PETS (INC. BY TYPE)
router.get('/', async (req, res) => {
    const { type } = req.query

    if (type) {
        const pet = await db.query(
            'SELECT * FROM pets WHERE type = $1',
            [type]
        )
        return res.status(200).json({ pets: pet.rows})
    }

    const pet = await db.query(
        'SELECT * FROM pets'
    )
    return res.status(200).json({ pets: pet.rows })
})

module.exports = router