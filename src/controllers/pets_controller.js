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

module.exports = {
  getAllPets,
  getPetById,
};
