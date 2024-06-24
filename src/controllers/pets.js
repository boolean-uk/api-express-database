const pool = require('../../db')
const petsRepository = require('../repositories/petsRepository')

const getPets = async (req, res) => {
    const result = await petsRepository.getPets()

    res.send({ pets: result.rows })
}

const createPet = async (req, res) => {
    const { name, age, type, breed, has_microchip } = req.body

    if (
        !name ||
        !age ||
        !type ||
        !breed ||
        !typeof has_microchip === 'boolean'
    ) {
        res.status(400).json({
            error: 'All fields are required and has_microchip must be a boolean',
        })
    }

    const result = await petsRepository.createPet(req)

    res.status(201).json({ pet: result.rows[0] })
}

const getPetById = async (req, res) => {

    const result = await petsRepository.getPetById(req)

    res.send({ pet: result.rows[0] })
}

const updatePetById = async (req, res) => {
    const { name, age, type, breed, has_microchip } = req.body

    if (
        !name ||
        !age ||
        !type ||
        !breed ||
        !typeof has_microchip === 'boolean'
    ) {
        res.status(400).json({
            error: 'All fields are required and has_microchip must be a boolean',
        })
    }

    const result = await petsRepository.updatePetById(req)

    res.status(201).json({ pet: result.rows[0] })

}

const deletePetById = async (req, res) => {
    const result = await petsRepository.deletePetById(req)

    res.status(201).send({ pet: result.rows[0] })
}

module.exports = {
    getPets,
    createPet,
    getPetById,
    deletePetById,
    updatePetById,
}
