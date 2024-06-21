const express = require('express')
const { getAllPets, addPet, getPetByID } = require('../controllers/pets')
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

router.get('/:id', async(req, res) => {
    const pet = await getPetByID(req)

    res.status(200).json({
        pet: pet
    })
})

module.exports = router
