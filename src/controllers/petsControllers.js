const {
  getAllPets,
  postNewPet,
  getPetById,
  updatePetById,
  deletePetById,
} = require("../dal/petsRepo.js")
const getPaginationParams = require("../utils/pagination.js")

const getPets = async (req, res) => {
  const { page, per_page } = getPaginationParams(req)
  const pets = await getAllPets(req)

  res.json({
    pets,
    per_page,
    page
  })
}

const postPet = async (req, res) => {
  const pet = await postNewPet(req)

  res.status(201).json({
    pet,
  })
}

const getPet = async (req, res) => {
  const pet = await getPetById(req)

  res.json({
    pet,
  })
}

const updatePet = async (req, res) => {
  const pet = await updatePetById(req)

  res.status(201).json({
    pet,
  })
}

const deletePet = async (req, res) => {
  const pet = await deletePetById(req)

  res.status(201).json({
    pet,
  })
}

module.exports = {
  getPets,
  postPet,
  getPet,
  updatePet,
  deletePet,
}
