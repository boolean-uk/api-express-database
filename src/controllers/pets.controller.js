const { isObjEmpty } = require('../utils');
const model = require('../models/pets.model');

const getAllPets = async (req, res) => {
  const pets = await model.getAllPets(req);

  res.status(200).json({
    pets,
  });
};

const getPetById = async (req, res) => {
  const petId = req.params.id;

  const pet = await model.getPetById(petId);

  if (isObjEmpty(pet)) {
    return res
      .status(404)
      .json({ error: 'A pet with the provided ID does not exist' });
  }

  res.status(200).json({ pet });
};

const postPet = async (req, res) => {
  const params = Object.values(req.body);

  if (params.length < 5) {
    res.status(400).json({ error: 'Missing fields in the request body' });
    return;
  }

  const pet = await model.postPet(params);

  res.status(201).json({
    pet,
  });
};

const updatePet = async (req, res) => {
  const petId = req.params.id;
  const params = Object.values(req.body);

  const pet = await model.updatePet(params, petId);

  if (isObjEmpty(pet)) {
    return res
      .status(404)
      .json({ error: 'A pet with the provided ID was not found' });
  }

  res.status(201).json({ pet });
};

const deletePet = async (req, res) => {
  const petId = req.params.id;

  const pet = await model.deletePet(petId);

  if (isObjEmpty(pet)) {
    return res
      .status(404)
      .json({ error: 'A pet with the provided ID was not found' });
  }

  res.status(201).json({ pet });
};

module.exports = { getAllPets, getPetById, postPet, updatePet, deletePet };
