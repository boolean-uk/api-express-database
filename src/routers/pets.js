const express = require('express')
const router = express.Router()
const db = require("../../db");

const { getPets, addNewPet } = require('../controllers/pets.js')

router.get('/', async (req, res) => {
    const pets = await getPets()
    res.status(200).json({pets: pets})
})

router.post('/', async (req, res) => {
    const newPet = await addNewPet(req.body)
    res.status(201).json({pet: newPet})
})

router.get('/:id', async (req, res) => {
    const foundPet = await getPets(req.params)
    res.status(200).json({pet: foundPet})
})


module.exports = router