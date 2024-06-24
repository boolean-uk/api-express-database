const { fetchAllPets, fetchPetById, updatePetById, addPet, deletePet } = require("../dal/petsRepository");

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
    const id = Number(req.params.id);
    const updatedParams = req.body
    const pet = await updatePetById(id, updatedParams);
    res.status(201).json({ pet })
}

async function addPetController(req, res) {
    const newPet = req.body
    const pet = await addPet(newPet)
    res.status(201).json({ pet })
}

async function deletePetController(req, res) {
    const id = Number(req.params.id)

    const pet = await deletePet(id)
    res.status(201).json({ pet })
}

module.exports = { getPetsController, getPetsByIdController, updatePetByIdController, addPetController, deletePetController };
