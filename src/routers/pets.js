const express = require('express')
const router = express.Router()
const { getAllPets, addPet, getPet, updatePet, deletePet } = require('../functions/logicPets.js')

router.get('/', async (req, res) => {
    const pets = await getAllPets()

    res.json({
        pets
    })
})

router.post('/', async (req, res) => {
    const pet = await addPet(req.body)

    res.status(201).json({
        pet
    })
})

router.get('/:id', async (req, res) => {
    const pet = await getPet(req.params.id)

    res.json({
        pet
    })
})

router.put('/:id', async (req, res) => {
    const pet = await updatePet(req.params.id, req.body)

    res.status(201).json({
        pet
    })
})

router.delete('/:id', async (req, res) => {
    const pet = await deletePet(req.params.id)

    res.status(201).json({
        pet
    })
})

module.exports = router