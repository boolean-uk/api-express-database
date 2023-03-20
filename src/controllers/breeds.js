const breedsRepo = require('../repositories/breeds');

const getAllBreeds = async (req, res) => {
    const { type } = req.query;
    let values = [type];
    const breeds = await breedsRepo.getAllBreeds(values);
    res.json({ breeds });
};
module.exports = { getAllBreeds };
