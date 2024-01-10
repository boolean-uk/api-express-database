const petsRepository = require("../repositories/pets_repository.js");

const getAllPets = async (req, res) => {
  const { name, breed } = req.query;
  try {
    const pets = await petsRepository.getAllPets(name, breed);
    res.json({ pets });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

const getPetById = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await petsRepository.getPetById(id);
    res.json({ pet });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

const createPet = async (req, res) => {
  const { name, age, type, breed, has_microchip } = req.body;

  try {
    const newPet = await petsRepository.createPet(
      name,
      age,
      type,
      breed,
      has_microchip
    );
    res.status(201).json({ pet: newPet });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const updatePetById = async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, has_microchip } = req.body;

  try {
    const updatedPet = await petsRepository.updatePetById(
      id,
      name,
      age,
      type,
      breed,
      has_microchip
    );
    res.status(201).json({ pet: updatedPet });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const deletePet = async (req, res) => {
  const { id } = req.params;

  const deletedPet = await petsRepository.deletePet(id);
  res.status(201).json({ pet: deletedPet });
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePetById,
  deletePet,
};
