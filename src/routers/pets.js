const express = require('express')
const router = express.Router()
const db = require("../../db");

const { getAllPets } = require('../controllers/pets.js')

router.get('/', async (req, res) => {
    const pets = await getAllPets()
    res.status(200).json({pets: pets})
})

module.exports = router