const express = require('express')
const { getAllBreeds } = require('../dal/petsRepo.js')
const router = express.Router()

router.get('/', async (req, res) => {
    const type = req.query.type

    const breeds = await getAllBreeds(type)

    res.json({
        breeds
    })
})

module.exports = router