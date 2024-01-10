const express = require('express')
const router = express.Router()
const db = require("../../db");

const { getAllPets } = require('../controllers/pets.js')

router.get('/', async (req, res) => {
    const pets = await getAllPets()
    res.status(200).json({pets: pets})
})

router.post('/', async (req, res) => {
    const newPet = addNewPet(req.body)
    res.status(201).json({pet: newPet})
})
module.exports = router