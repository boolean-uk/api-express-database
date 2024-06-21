const express = require('express')
const { getAllPets } = require('../controllers/pets')
const router = express.Router()

router.get('/', async(req, res) => {
    const pets = await getAllPets()

    res.status(200).json({
        pets
    })
})

module.exports = router
