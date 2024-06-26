const { MissingFieldsError, NoDataError } = require("../errors/errors");

const {
  fetchAllPets,
  fetchPetById,
  updatePetById,
  addPet,
  deletePet,
  fetchPetsWithQuery
} = require("../dal/petsRepository");

async function getPetsController(req, res) {
  if (req.query) {
    fetchPetsWithQuery()
  }

  const pets = await fetchAllPets();
  res.status(200).json({ pets });
}

async function getPetsByIdController(req, res) {
  const id = Number(req.params.id);
  const pet = await fetchPetById(id);

  if(!pet) {
    throw new NoDataError(`no pet with id: ${id}`)
  }

  res.status(200).json({ pet });
}

async function updatePetByIdController(req, res) {
  const id = Number(req.params.id);
  const updatedParams = req.body;
  const pet = await updatePetById(id, updatedParams);
  res.status(201).json({ pet });
}

async function addPetController(req, res) {
  const newPet = req.body;

  const requiredFields = ['name', 'age', 'type', 'breed', 'has_microchip']
  const missingFields = []
  requiredFields.forEach((field) => {
    if (!newPet[field]) {
      missingFields.push(field)
    }
  })
  if (missingFields.length > 0) {
    throw new MissingFieldsError(`missing fields: ${missingFields.toString().replaceAll(',', ', ')}`);
  }

  const pet = await addPet(newPet);
  res.status(201).json({ pet });
}

async function deletePetController(req, res) {
  const id = Number(req.params.id);

  const pet = await deletePet(id);
  res.status(201).json({ pet });
}

module.exports = {
  getPetsController,
  getPetsByIdController,
  updatePetByIdController,
  addPetController,
  deletePetController,
};
