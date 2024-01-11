const petsRepository = require("../repositories/pets");

const getAllPets = async (req, res) => {
  const result = await petsRepository.getAllPets();
  res.json({ pets: result.rows });
};

const getPetBy = async (req, res) => {
  await petsRepository.getPetBy(req.params);
  const result = await petsRepository.getPetBy(req.params);
  res.json({ pet: result.rows[0] });
};

const deletePet = async (req, res) => {
  const toBeDeleted = await petsRepository.deletePet(req.params);
  res.status(201).json({ pet: toBeDeleted.rows[0] });
};

const addPet = async (req, res) => {
  await petsRepository.addPet(req.body);
  const result = await petsRepository.getPetBy({ name: req.body.name });
  res.status(201).json({ pet: result.rows[0] });
};

const editPet = async (req, res) => {
  await petsRepository.editPet(req.params, req.body);
  const result = await petsRepository.getPetBy(req.params);
  res.status(201).json({ pet: result.rows[0] });
};

module.exports = {
  getAllPets,
  getPetBy,
  deletePet,
  addPet,
  editPet,
};
