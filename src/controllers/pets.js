const petsRepo = require('../repositories/pets');
const db = require('../../db');

const getAllPets = async (req, res) => {
    let str = 'SELECT * FROM pets';
    let values = [];
    str += ';';
    const data = await db.query(str, values);
    const pets = data.rows;
    res.json({ pets });
};

const getPetById = async (req, res) => {
    const id = req.params.id;
    const str = 'SELECT * FROM pets WHERE id = $1;';
    const values = [id];
    const data = await db.query(str, values);
    const pet = data.rows[0];
    res.json({ pet });
};

const createPet = async (req, res) => {
    const { name, age, type, breed, microchip } = req.body;
    const str =
        'INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const values = [name, age, type, breed, microchip];
    const data = await db.query(str, values);
    const pet = data.rows[0];

    res.status(201).json({ pet });
};

const updatePetById = async (req, res) => {
    const id = req.params.id;
    const { name, age, type, breed, microchip } = req.body;

    const str =
        'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *;';
    const values = [name, age, type, breed, microchip, id];
    const data = await db.query(str, values);
    const pet = data.rows[0];
    res.status(201).json({ pet });
};

const deletePetById = async (req, res) => {
    const id = req.params.id;
    const str = 'DELETE from pets WHERE id = $1 RETURNING *;';
    const values = [id];
    const data = await db.query(str, values);
    const pet = data.rows[0];
    res.status(201).json({ pet });
};

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePetById,
    deletePetById,
};
