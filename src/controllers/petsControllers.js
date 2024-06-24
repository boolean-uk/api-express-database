const { fetchAllPets, fetchPetById, updatePetById } = require("../dal/petsRepository");

async function getPetsController(req, res) {
  const pets = await fetchAllPets();
  res.status(200).json({ pets });
}

async function getPetsByIdController(req, res) {
  const id = Number(req.params.id);
  const pet = await fetchPetById(id);
  res.status(200).json({ pet });
}

async function updatePetByIdController(req, res) {
    console.log('in')
    const id = Number(req.params.id);
    const updatedParams = req.body
    const pet = await updatePetById(id, updatedParams);
    res.status(201).json({ pet })
}

module.exports = { getPetsController, getPetsByIdController, updatePetByIdController };
