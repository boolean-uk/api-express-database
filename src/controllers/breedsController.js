const db = require('../../db')

const breedsRepository = require('../repositories/breedsRepository')

const getAllBreeds = async (req, res) => {
  const { type } = req.query
  let values = [type]
  const breeds = await breedsRepository.getAllBreeds(values)
  res.json({ breeds })
}

module.exports = {
  getAllBreeds
}
