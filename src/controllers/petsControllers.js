const {
  getAllPets,
  postNewPet,
  getPetById,
  updatePetById,
  deletePetById,
} = require("../dal/petsRepo.js")

const getPets = async (req, res, next) => {
  try {
    const pets = await getAllPets()

    res.json({
      pets,
    })
  } catch (error) {
    next(error)
  }
}

const postPet = async (req, res, next) => {
  try {
    const pet = await postNewPet(req)

    res.status(201).json({
      pet,
    })
  } catch (error) {
    next(error)
  }
}

const getPet = async (req, res, next) => {
  try {
    const pet = await getPetById(req)

    res.json({
      pet,
    })
  } catch (error) {
    next(error)
  }
}

const updatePet = async (req, res, next) => {
  try {
    const pet = await updatePetById(req)

    res.status(201).json({
      pet,
    })
  } catch (error) {
    next(error)
  }
}

const deletePet = async (req, res, next) => {
  try {
    const pet = await deletePetById(req)

    res.status(201).json({
      pet,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPets,
  postPet,
  getPet,
  updatePet,
  deletePet,
}
