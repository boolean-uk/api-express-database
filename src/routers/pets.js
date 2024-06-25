const express = require('express')
const router = express.Router()
const { getAllPets, createPet
 , getPetById, updatePet, deletePet} = require('../dal/petsRepo.js')

router.get('/', async (req, res) => {
  const pets = await getAllPets()
  res.status(200).json({
    pets
  })
})

router.post('/', async (req, res) => {
  const pet = await createPet(req.body)
  res.status(201).json({
    pet
  })
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const pet = await getPetById(id)
  res.status(200).json({
    pet
  })
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const newPetInfo = req.body

  const updatedPet = await updatePet(id, newPetInfo)

  res.status(201).json({
    pet : updatedPet
  })
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const deletedPet = await deletePet(id)
  res.status(201).json({
    pet : deletedPet
  })
})

module.exports = router
