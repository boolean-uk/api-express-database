const db = require('../../db')

const petsRepository = require('../repositories/petsRepository')

const getAllPets = async (req, res) => {
  const { type, page, perPage } = req.query
  let values = []
  let query = ''
  if (type) {
    values = [type]
    query = 'type'
  }
  if (perPage < 10 || perPage > 50) {
    return res.status(400).json({ error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50` })
  }
  const pets = await petsRepository.getAllPets(values, query, page, perPage)
  const perPageRes = Number(perPage)
  const pageRes = Number(page)
  res.status(200).json({ pets, per_page: perPageRes, page: pageRes })
}

const getPetByID = async (req, res) => {
  const { id } = req.params
  let values = [id]
  const pet = await petsRepository.getPetByID(values)
  if (!pet) {
    return res.status(404).json({ error: `no pet with id: ${id}`})
  }
  res.status(200).json({ pet })
}

const addNewPet = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body
  const values = [name, age, type, breed, microchip]
  let missingFields = [];
  if (name === undefined) {
      missingFields.push('name');
  }
  if (age === undefined) {
      missingFields.push('age');
  }
  if (type === undefined) {
      missingFields.push('type');
  }
  if (breed === undefined) {
      missingFields.push('breed');
  }
  if (microchip === undefined) {
      missingFields.push('microchip');
  }
  if (missingFields.length > 0) {
      const errorString = missingFields.join(', ');
      return res.status(400).json({
          error: `missing fields: ${errorString}`,
      });
  }
  const pet = await petsRepository.addNewPet(values)
  res.status(201).json({ pet })


}

const updatePet = async (req, res) => {
  const { id } = req.params
  const { name, age, type, breed, microchip } = req.body
  const values = [name, age, type, breed, microchip, id]
  const petIdFound = await petsRepository.getPetByID([id])
  if (petIdFound) {
    const pet = await petsRepository.updatePet(values)
    res.status(201).json({ pet })
  } else {
    res.status(404).json({ error: `no pet with id: ${id}` })
  }

}

const deletePet = async (req, res) => {
  const { id } = req.params
  const values = [id]
  const petIdFound = await petsRepository.getPetByID([id])
  if (petIdFound) {
    const pet = await petsRepository.deletePet(values)
    res.status(201).json({ pet })
  } else {
    res.status(404).json({ error: `no pet with id: ${id}` })
  }
}

module.exports = {
  getAllPets,
  getPetByID,
  addNewPet,
  updatePet,
  deletePet
}