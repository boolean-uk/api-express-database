const express = require('express')
const id = require('faker/lib/locales/id_ID')
const router = express.Router()
const {
  getAllPets,
  createPet,
  getPetById,
  updatePet,
  deletePet
} = require('../../controllers/petsController')

router.get('/', async (req, res) => {
  getAllPets(req, res)
})

router.post('/', async (req, res) => {
  createPet(req, res)
})

router.get('/:id', async (req, res) => {
  getPetById(req, res)
})

router.put('/:id', async (req, res) => {
  updatePet(req, res)
})

router.delete('/:id', async (req, res) => {
  deletePet(req, res)
})

module.exports = router
