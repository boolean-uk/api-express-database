const petsRepo = require('../repositories/pets');

const getAllPets = async (req, res) => {
    let values = [];
    const pets = await petsRepo.getAllPets(values);
    res.json({ pets });
};

const getPetById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const pet = await petsRepo.getPetById(values);
    res.json({ pet });
};

const createPet = async (req, res) => {
    const { name, age, type, breed, microchip } = req.body;
    const values = [name, age, type, breed, microchip];
    const pet = await petsRepo.createPet(values);
    res.status(201).json({ pet });
};

const updatePetById = async (req, res) => {
    const id = req.params.id;
    const { name, age, type, breed, microchip } = req.body;
    const values = [name, age, type, breed, microchip, id];
    const pet = await petsRepo.updatePetById(values);
    res.status(201).json({ pet });
};

const deletePetById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const pet = await petsRepo.deletePetById(values);
    res.status(201).json({ pet });
};

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePetById,
    deletePetById,
};
