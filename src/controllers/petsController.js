const db = require('../../db')

const petsRepository = require('../repositories/petsRepository')

const getAllPets = async (req, res) => {
  const { type } = req.query
  let values = []
  let query = ''
  if (type) {
    values = [type]
    query = 'type'
  }
  const pets = await petsRepository.getAllPets(values, query)
  res.status(200).json({ pets })
}

const getPetByID = async (req, res) => {
  const { id } = req.params
  let values = [id]
  const pet = await petsRepository.getPetByID(values)
  res.status(200).json({ pet })
}

const addNewPet = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body
  const values = [name, age, type, breed, microchip]
  const pet = await petsRepository.addNewPet(values)
  res.status(201).json({ pet })
}

const updatePet = async (req, res) => {
  const { id } = req.params
  const { name, age, type, breed, microchip } = req.body
  const values = [name, age, type, breed, microchip, id]
  const pet = await petsRepository.updatePet(values)
  res.status(201).json({ pet })
}

const deletePet = async (req, res) => {
  const { id } = req.params
  const values = [id]
  const pet = await petsRepository.deletePet(values)
  res.status(201).json({ pet })
}

module.exports = {
  getAllPets,
  getPetByID,
  addNewPet,
  updatePet,
  deletePet
}