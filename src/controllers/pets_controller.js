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

module.exports = {
  getAllPets,
};
