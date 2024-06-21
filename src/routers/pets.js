const express = require('express')
const { getAllPets, createPet, getPetById, updatePet, deletePetById } = require('../dal/petsRepo.js')
const router = express.Router()

router.get('/', async (req, res) => {
    const type = req.query.type

    const pets = await getAllPets(type)

    res.json({
        pets
    })
})

router.post('/', async (req, res) => {
    const pet = req.body

    const newPet = await createPet(pet)

    res.json({
        pet: newPet
    })
})

router.get('/:id', async (req, res) => {
    const petId = Number(req.params.id)

    const foundPet = await getPetById(petId)

    res.json({
        pet: foundPet
    })
})

router.put('/:id', async (req, res) => {
    const petId = Number(req.params.id)
    const petInfo = req.body

    const updatedPet = await updatePet(petId, petInfo)

    res.json({
        pet: updatedPet
    })
})

router.delete('/:id', async (req, res) => {
    const petId = Number(req.params.id)

    const deletedPet = await deletePetById(petId)

    res.json({
        pet: deletedPet
    })
})

module.exports = router