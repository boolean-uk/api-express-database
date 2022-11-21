const petsRepository = require("../repositories/pets.repository");

const getAllPets = async (req, res) => {
  try {
    const pets = await petsRepository.getAllPets();
    return res.json({ pets });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await petsRepository.getPetById(req.params.id);
    return res.json({ pet });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

const addPet = async (req, res) => {
  const pet = {
    name: req.body.name,
    age: req.body.age,
    type: req.body.type,
    breed: req.body.breed,
    microchip: req.body.microchip,
  };

  try {
    const newPet = await petsRepository.addPet(pet);
    return res.status(201).json({ pet: newPet });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

const updatePet = async (req, res) => {
  const pet = {
    name: req.body.name,
    age: req.body.age,
    type: req.body.type,
    breed: req.body.breed,
    microchip: req.body.microchip,
  };

  try {
    const updatedPet = await petsRepository.updatePet(req.params.id, pet);
    return res.status(201).json({ pet: updatedPet });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await petsRepository.deletePet(req.params.id);
    return res.status(201).json({ pet });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

module.exports = {
  getAllPets,
  addPet,
  getPetById,
  updatePet,
  deletePet,
};
