const { MissingFieldsError, NoDataError, InvalidParameterError } = require("../errors/errors");

const {
  fetchAllPets,
  fetchPetById,
  updatePetById,
  addPet,
  deletePet,
  fetchPetsWithQuery,
} = require("../dal/petsRepository");

async function getPetsController(req, res) {
  let pets;

  if (req.query) {
    if (req.query.perPage < 10 || req.query.perPage > 50) {
      throw new InvalidParameterError(`parameter invalid perPage: ${req.query.perPage} not valid. Accepted range is 10 - 50`)
    }
    pets = await fetchPetsWithQuery(req.query);
  } else {
    pets = await fetchAllPets();
  }

  res
    .status(200)
    .json({
      pets,
      page: Number(req.query.page),
      per_page: Number(req.query.perPage),
    });
}

async function getPetsByIdController(req, res) {
  const id = Number(req.params.id);
  const pet = await fetchPetById(id);

  if (!pet) {
    throw new NoDataError(`no pet with id: ${id}`);
  }
  res.status(200).json({ pet });
}

async function updatePetByIdController(req, res) {
  const id = Number(req.params.id);
  const updatedParams = req.body;

  const found = await fetchPetById(id)
  if (!found) {
      throw new NoDataError(`no pet with id: ${id}`);
  }

  const pet = await updatePetById(id, updatedParams);
  res.status(201).json({ pet });
}

async function addPetController(req, res) {
  const newPet = req.body;

  const requiredFields = ["name", "age", "type", "breed", "has_microchip"];
  const missingFields = [];
  requiredFields.forEach((field) => {
    if (!newPet[field]) {
      missingFields.push(field);
    }
  });
  if (missingFields.length > 0) {
    throw new MissingFieldsError(
      `missing fields: ${missingFields.toString().replaceAll(",", ", ")}`
    );
  }

  const pet = await addPet(newPet);
  res.status(201).json({ pet });
}

async function deletePetController(req, res) {
  const id = Number(req.params.id);

  const found = await fetchPetById(id)
  if (!found) {
      throw new NoDataError(`no pet with id: ${id}`);
  }

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
