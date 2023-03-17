const {
  getAllpets,
  createNewpet,
  getpetById,
  updatepet,
  deletepet,
} = require("../repositories/pets");

const getAll = async (req, res) => {
  const pets = await getAllpets();

  res.json({ pets: pets });
};

const createpet = async (req, res, str) => {
  const pet = await createNewpet(str);

  res.status(201).json({ pet: pet });
};

const getpet = async (req, res, str) => {
  const pet = await getpetById(str);

  res.json({ pet: pet });
};

const update = async (req, res, str) => {
  const pet = await updatepet(str);

  res.status(201).json({ pet: pet });
};

const deleted = async (req, res, str) => {
  const pet = await deletepet(str);

  res.status(201).json({ pet: pet });
};

module.exports = {
  getAll,
  createpet,
  getpet,
  update,
  deleted,
};
