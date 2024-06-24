const Joi = require("joi");
const dbConnection = require("../../db/index.js");
const queries = require("../queries/petsQueries.js");

// HELPER FUNCTIONS
function validatePet(req, res) {
  const schema = {
    name: Joi.string().required(),
    age: Joi.required(),
    type: Joi.string().required(),
    breed: Joi.string().required(),
    has_microchip: Joi.boolean().required(),
  };

  return Joi.validate(req.body, schema);
}

// CONTROLLER FUNCTIONS
exports.getAllPets = (req, res) => {
  dbConnection.query(queries.getAllPets, (error, result) => {
    if (error) throw error;
    res.status(200).json({ pets: result.rows });
  });
};

exports.getPet = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  dbConnection.query(queries.getPetById, [id], (error, result) => {
    if (error) throw error;

    const [pet] = result.rows;
    if (!pet) {
      return res.status(404).json({
        message: `Pet with id ${id} does not exist in the database`,
      });
    }
    res.status(200).json({ pet });
  });
};

exports.addPet = (req, res) => {
  // to validate pet's schema
  const { error } = validatePet(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, age, type, breed, has_microchip } = req.body;

  dbConnection.query(
    queries.addPet,
    [name, age, type, breed, has_microchip],
    (error, result) => {
      if (error) throw error;
      // to get the new added pet and send it to the user
      dbConnection.query(queries.getAllPets, (error, result) => {
        if (error) throw error;
        res.status(201).json({ pet: result.rows[result.rows.length - 1] });
      });
    }
  );
};

exports.deletePet = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  // check if the pet exists
  dbConnection.query(queries.getPetById, [id], (error, result) => {
    const pet = result.rows;
    const noPetFound = !pet.length;
    // if it does not exist send an error message
    if (noPetFound) {
      return res.status(404).json({
        message: `Pet with id ${id} does not exist in the database`,
      });
    }
    // if it exists, delete it and send it to the user
    dbConnection.query(queries.deletePetById, [id], (error, result) => {
      if (error) throw error;
      res.status(201).json({ pet: pet[0] });
    });
  });
};

exports.updatePet = (req, res) => {
  // to validate pet's schema
  const { error } = validatePet(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  const id = Number.parseInt(req.params.id, 10);
  // check if the pet exists
  dbConnection.query(queries.getPetById, [id], (error, result) => {
    const noPetFound = !result.rows.length;
    // if it does not exist send an error message
    if (noPetFound) {
      return res.status(404).json({
        message: `Pet with id ${id} does not exist in the database`,
      });
    }
    // if it exists, update it
    const { name, age, type, breed, has_microchip } = req.body;
    dbConnection.query(
      queries.updatePetById,
      [name, age, type, breed, has_microchip, id],
      (error, result) => {
        if (error) throw error;
        // get the updated pet and send it to the user
        dbConnection.query(queries.getPetById, [id], (error, result) => {
          if (error) throw error;

          const [pet] = result.rows;
          res.status(201).json({ pet });
        });
      }
    );
  });
};
