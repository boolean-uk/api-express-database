const {
	getAllPets,
	getAllPetsByTypeOrBreed,
	createPet,
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
			res.json({ data: pet });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAll,
	create,
};
