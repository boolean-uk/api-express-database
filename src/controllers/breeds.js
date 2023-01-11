const { getBreeds } = require("../repositories/breeds");

const getBreedByType = async (req, res) => {
    const { type } = req.params;
    const breeds = await getBreeds(type);
    res.json({ breeds });
  };

  module.exports = {
    getBreedByType
  }