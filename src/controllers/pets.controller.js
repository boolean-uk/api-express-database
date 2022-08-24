const { isObjEmpty } = require('../utils');
const model = require('../models/pets.model');

const getAllPets = async (req, res) => {
  try {
    const pets = await model.getAllPets(req);

    res.status(200).json({
      pets,
    });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const getPetById = async (req, res) => {
  const petId = req.params.id;

  try {
    const pet = await model.getPetById(petId);

    if (isObjEmpty(pet)) {
      return res
        .status(404)
        .json({ error: 'A pet with the provided ID does not exist' });
    }

    res.status(200).json({ pet });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const postPet = async (req, res) => {
  const params = Object.values(req.body);

  if (params.length < 5) {
    res.status(400).json({ error: 'Missing fields in the request body' });
    return;
  }

  try {
    const pet = await model.postPet(params);

    res.status(201).json({
      pet,
    });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const updatePet = async (req, res) => {
  const petId = req.params.id;
  const params = Object.values(req.body);

  try {
    const pet = await model.updatePet(params, petId);

    if (isObjEmpty(pet)) {
      return res
        .status(404)
        .json({ error: 'A pet with the provided ID was not found' });
    }

    res.status(201).json({ pet });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const deletePet = async (req, res) => {
  const petId = req.params.id;

  try {
    const pet = await model.deletePet(petId);

    if (isObjEmpty(pet)) {
      return res
        .status(404)
        .json({ error: 'A pet with the provided ID was not found' });
    }

    res.status(201).json({ pet });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

module.exports = { getAllPets, getPetById, postPet, updatePet, deletePet };
