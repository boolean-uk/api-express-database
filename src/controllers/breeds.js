const { getBreeds } = require('../repositories/breeds');

const getBreedByType = async (req, res) => {
  const { type } = req.query;
  console.log(type);
  const breeds = await getBreeds(type);
  res.json({ breeds });
};

module.exports = {
  getBreedByType,
};
