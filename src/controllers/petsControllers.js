const { fetchAllPets, fetchPetById } = require("../dal/petsRepository");

async function getPetsController(req, res) {
  const pets = await fetchAllPets();
  res.status(200).json({ pets });
}

async function getPetsByIdController(req, res) {
  const id = Number(req.params.id);
  const pet = await fetchPetById(id);
  res.status(200).json({ pet });
}

module.exports = { getPetsController, getPetsByIdController };
