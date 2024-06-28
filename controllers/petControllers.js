const petsRepo = require("../repo/petsRepo");

const getAllPets = async (req, res) => {
  const result = await petsRepo.getAllPets(req);

  res.status(200).send({ pets: result.rows });
};

const createNewPet = async (req, res) => {
  const result = await petsRepo.createNewPet(req);

  res.status(201).send({ pet: result.rows[0] });
};

const listPet = async (req, res) => {
  const result = await petsRepo.listPet(req);

  res.status(200).send({ pet: result.rows[0] });
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const petData = req.body;
  const updatedPet = await petsRepo.updatePet(id, petData);

  res.status(201).json({ pet: updatedPet });
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  const deletedPet = await petsRepo.deletePet(id);
  res.status(201).send({ pet: deletedPet });
};

module.exports = {
  createNewPet,
  getAllPets,
  listPet,
  updatePet,
  deletePet,
};
