const db = require("../repos/pets");

const getPets = async (req, res) => {
  let { type, page, perPage } = req.query;
  values = [];
  let myQuery = "";

  if (type) {
    myQuery = "WHERE type = $1";
    values.push(type);
  }

  if (page === "" || page === undefined) {
    page = 1;
  }

  if (perPage === "" || perPage === undefined) {
    perPage = 20;
  }

  const pageNum = Number(page);
  const perPageNum = Number(perPage);
  const offset = (pageNum - 1) * perPageNum;

  if (perPageNum > 50 || perPageNum < 10) {
    res.status(400).json({
      error: `parameter invalid perPage: ${perPageNum} not valid. Accepted range is 10 - 50`,
    });
  } else if (perPage || page) {
    result = await db.getPets(myQuery, values, perPageNum, offset);
    res.json({ pets: result.rows, page: pageNum, per_page: perPageNum });
  }
};

const createPet = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  if (
    name === "" ||
    age === "" ||
    type === "" ||
    breed === "" ||
    microchip === "" ||
    name === undefined ||
    age === undefined ||
    type === undefined ||
    breed === undefined ||
    microchip === undefined
  ) {
    const missingFromBody = [];
    if (name === "" || name === undefined) missingFromBody.push("name");
    if (age === "" || age === undefined) missingFromBody.push("age");
    if (type === "" || type === undefined) missingFromBody.push("type");
    if (breed === "" || breed === undefined) missingFromBody.push("breed");
    if (microchip === "" || microchip === undefined)
      missingFromBody.push("microchip");

    return res
      .status(400)
      .json({ error: `missing fields: ${missingFromBody.join(", ")}` });
  }
  const result = await db.createPet(name, age, type, breed, microchip);

  res.status(201).json({ pet: result.rows[0] });
};

const getPetsID = async (req, res) => {
  const { id } = req.params;
  const result = await db.getPetsID(id);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no pet with id: ${id}` });
  } else {
    res.json({ pet: result.rows[0] });
  }
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.updatePet(id, name, age, type, breed, microchip);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no pet with id: ${id}` });
  }
  else {
  res.status(201).json({ pet: result.rows[0] });
  }
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  const result = await db.deletePet(id);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no pet with id: ${id}` });
  } else {
    res.status(201).json({ pet: result.rows[0] });
  }
};

module.exports = { getPets, createPet, getPetsID, updatePet, deletePet };
