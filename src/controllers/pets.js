const {
	getAllPets,
	getAllPetsByTypeOrBreed,
	createPet,
	getPetByID,
	updatePetByID,
	deletePetByID,
} = require("../repositories/pets.js");

const getAll = async (req, res) => {
	const { breed, type } = req.query;
	if (breed || type) {
		const result = await getAllPetsByTypeOrBreed(type, breed);
		res.json({ pets: result.rows });
	} else {
		const result = await getAllPets();
		res.json({ pets: result.rows });
	}
};

const getByID = async (req, res) => {
	const { id } = req.params;
	const result = await getPetByID(id);
	res.json({ pet: result.rows[0] });
};

const create = async (req, res) => {
	const { name, age, type, breed, microchip } = req.body;
	const values = [name, age, type, breed, microchip];

	try {
		const pet = await createPet(values);
		if (!pet) {
			res.status(400).json({
				error: "Failed to create pet with the provided values",
				body: req.body,
			});
		} else {
			res.status(201).json({ pet: pet });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateByID = async (req, res) => {
	const { id } = req.params;
	const { name, age, type, breed, microchip } = req.body;
	const values = [name, age, type, breed, microchip];

	try {
		const pet = await updatePetByID(id, values);
		if (!pet) {
			res.status(400).json({
				error:
					"Failed to update pet with given id, due to either payload or id being incorrect",
				body: req.body,
			});
		} else {
			res.status(201).json({ pet: pet });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteByID = async (req, res) => {
	const { id } = req.params;

	try {
		const pet = await deletePetByID(id);
		if (!pet) {
			res.status(400).json({
				error: "Failed to delete pet with given id, id does not exist",
			});
		} else {
			res.status(201).json({ pet: pet });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAll,
	create,
	getByID,
	updateByID,
	deleteByID,
};
