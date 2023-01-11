const {
  createPet,
  getAllPets,
  getPet,
  updatePet,
  deletePet,
} = require("../repositories/Pets");

const getAll = async (req, res) => {
  const pets = await getAllPets();
  res.json({ pets });
};

const create = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const values = [name, age, type, breed, microchip];

  try {
    const pet = await createPet(values);

    if (!pet) {
      res.status(400).json({
        error: "Failed to create pet with the values provided.",
        body: req.body,
      });
    } else {
      res.status(201).json({ pet });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPetById = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await getPet(id);
    if (!pet) {
      res.status(404).json({ error: `pet with ID ${id} not found` });
    } else {
      res.status(200).json({ pet });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePetById = async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const values = [name, age, type, breed, microchip];

  try {
    const pet = await updatePet(values, id);

    if (!pet) {
      res.status(400).json({
        error: "Failed to create pet with the values provided.",
        body: req.body,
      });
    } else {
      res.status(201).json({ pet });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePetById = async (req, res) => {
  const { id } = req.params;
  const pet = await deletePet(id);
  res.status(201).json({ pet });
};

module.exports = {
  create,
  getAll,
  getPetById,
  updatePetById,
  deletePetById,
};
