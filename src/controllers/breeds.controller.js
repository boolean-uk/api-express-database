const model = require('../models/breeds.model');

const getAllBreeds = async (req, res) => {
  if (!req.query.type) {
    res.status(400).json({ error: "Missing 'type' query parameter" });
    return;
  }

  const breeds = await model.getAllBreeds(req);

  res.status(200).json(breeds);
};

module.exports = { getAllBreeds };
