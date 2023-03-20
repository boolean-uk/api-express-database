const petsRepo = require('../repositories/pets');

const getAllPets = async (req, res) => {
    const { page, perPage } = req.query;
    let values = [];
    if (perPage < 10 || perPage > 50) {
        return res.status(400).json({
            error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`,
        });
    }
    const pets = await petsRepo.getAllPets(values, page, perPage);
    const resPerPage = Number(perPage);
    const resPage = Number(page);
    res.json({ pets, per_page: resPerPage, page: resPage });
};

const getPetById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const pet = await petsRepo.getPetById(values);
    if (pet) {
        res.json({ pet });
    } else {
        res.status(404).json({ error: `no pet with id: ${id}` });
    }
};

const createPet = async (req, res) => {
    const { name, age, type, breed, microchip } = req.body;
    const values = [name, age, type, breed, microchip];
    let missingFields = [];
    if (name === undefined) {
        missingFields.push('name');
    }
    if (age === undefined) {
        missingFields.push('age');
    }
    if (type === undefined) {
        missingFields.push('type');
    }
    if (breed === undefined) {
        missingFields.push('breed');
    }
    if (microchip === undefined) {
        missingFields.push('microchip');
    }
    if (missingFields.length > 0) {
        const errorString = missingFields.join(', ');
        return res.status(400).json({
            error: `missing fields: ${errorString}`,
        });
    }
    const pet = await petsRepo.createPet(values);
    res.status(201).json({ pet });
};

const updatePetById = async (req, res) => {
    const id = req.params.id;
    const { name, age, type, breed, microchip } = req.body;
    const values = [name, age, type, breed, microchip, id];
    const petCheck = await petsRepo.getPetById([id]);
    if (petCheck) {
        const pet = await petsRepo.updatePetById(values);
        res.status(201).json({ pet });
    } else {
        res.status(404).json({ error: `no pet with id: ${id}` });
    }
};

const deletePetById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const petCheck = await petsRepo.getPetById([id]);
    if (petCheck) {
        const pet = await petsRepo.deletePetById(values);
        res.status(201).json({ pet });
    } else {
        res.status(404).json({ error: `no pet with id: ${id}` });
    }
};

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePetById,
    deletePetById,
};
