const petsRepo = require("../repositories/pets");

const getPets = async (req, res) => {
  const values = [];
  const queries = req.query;
  if (queries.page === undefined) queries.page = 1;
  if (queries.perPage === undefined) queries.perPage = 20;
  if (queries.perPage < 10 || queries.perPage > 50) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${queries.perPage} not valid. Accepted range is 10 - 50`,
    });
  }
  queries.offset = Number(queries.perPage) * (Number(queries.page) - 1);
  values.push(Number(queries.perPage), queries.offset);

  const data = await petsRepo.getPets(values);
  return res.json({
    pets: data.rows,
    page: Number(queries.page),
    per_page: Number(queries.perPage),
  });
};

const postPet = async (req, res) => {
  if (Object.keys(req.body).length !== 5) {
    const fields = ["name", "age", "type", "breed", "microchip"];
    const missing = fields
      .filter((field) => (Object.keys(req.body).includes(field) ? false : true))
      .join(", ");
    return res.status(400).json({ error: `missing fields: ${missing}` });
  }
  const values = Object.values(req.body);
  const data = await petsRepo.postPet(values);
  return res.status(201).json({ pet: data.rows[0] });
};

const getPetById = async (req, res) => {
  const values = [Number(req.params.id)];
  const data = await petsRepo.getPetById(values);
  if (data.rowCount === 0) {
    return res.status(404).json({ error: `no pet with id: ${req.params.id}` });
  }
  return res.json({ pet: data.rows[0] });
};

const updatePetById = async (req, res) => {
  const values = [Number(req.params.id), ...Object.values(req.body)];
  const data = await petsRepo.updatePetById(values);
  if (data.rowCount === 0) {
    return res.status(404).json({ error: `no pet with id: ${req.params.id}` });
  }
  return res.status(201).json({ pet: data.rows[0] });
};

const deletePetById = async (req, res) => {
  const values = [Number(req.params.id)];
  const data = await petsRepo.deletePetById(values);
  if (data.rowCount === 0) {
    return res.status(404).json({ error: `no pet with id: ${req.params.id}` });
  }
  return res.status(201).json({ pet: data.rows[0] });
};

module.exports = {
  getPets,
  postPet,
  getPetById,
  updatePetById,
  deletePetById,
};
