const pets = require("../repositories/pets.repository.js");

const Types = require("../types.d.js");

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function getAllPets(req, res) {
  const response = await pets.getPets(req.query);
  res.json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function getPetById(req, res) {
  const response = await pets.getPetById(Number(req.params.id));
  res.json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function createPet(req, res) {
  const response = await pets.insertPet(req.body);
  res.status(201).json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function putPet(req, res) {
  req.body.id = req.params.id
  const response = await pets.updatePet(req.body);
  res.status(201).json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function deletePet(req, res) {
  const response = await pets.deletePet(Number(req.params.id));
  res.status(201).json(response)
}

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  putPet,
  deletePet,
};
