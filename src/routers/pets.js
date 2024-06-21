const express = require('express')
const { getAllPets, addPet } = require('../controllers/pets')
const router = express.Router()

router.get('/', async(req, res) => {
    const pets = await getAllPets()

    res.status(200).json({
        pets
    })
})

router.post('/', async(req, res) => {
    const newPet = await addPet(req)

    res.status(201).json({
        pet: newPet
    })
})

module.exports = router
