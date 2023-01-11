const db = require("../db/index");
const {
  getAll,
  create,
  byId,
  update,
  petRemove,
} = require("../queries/petQueries");

const getAllPets = async (req, res) => {
  const { type } = req.query;

  const result = await getAll(type);
  res.json({ pets: result });
};

const createPet = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const values = [name, age, type, breed, microchip];
  const result = await create(values);
  res.status(201).json({ pet: result });
};

const getPetById = async (req, res) => {
  const id = req.params.id;
  const result = await byId(id);

  res.json({ pet: result });
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const values = [name, age, type, breed, microchip, id];
  const result = await update(values);
  res.status(201).json({ pets: result });
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  const result = await petRemove(id);
  res.status(201).json({ pet: result });
};

module.exports = { getAllPets, createPet, getPetById, updatePet, deletePet };
