const { fetchBreeds } = require("../dal/breedsRepository");

async function getAllBreedsController(req, res) {
  const breeds = await fetchBreeds(req.query);
    console.log({ breeds })
  res.status(200).json({ breeds });
}

module.exports = { getAllBreedsController };
