const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  let { page, perPage } = req.query;
  const valuesArray = [];
  if (page === undefined || page === "") {
    page = 1;
  }
  if (perPage === undefined || perPage === "") {
    perPage = 20;
  }

  const parsedPage = Number(page);
  const parsedPerPage = Number(perPage);

  const offset = (parsedPage - 1) * parsedPerPage;

  if (parsedPerPage > 50 || parsedPerPage < 10) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`,
    });
  }

  const myQuery = `SELECT * from pets LIMIT $${
    valuesArray.length + 1
  } OFFSET $${valuesArray.length + 2}`;
  valuesArray.push(parsedPerPage, offset);

  const result = await db.query(myQuery, valuesArray);
  dataForRes = { pets: result.rows };
  if (perPage || page) {
    dataForRes.per_page = parsedPerPage;
    dataForRes.page = parsedPage;
  }
  res.json(dataForRes);
});

router.post("/", async (req, res) => {
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


  const result = await db.query(
    "INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, microchip]
  );

  res.status(201).json({ pet: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  if (result.rows[0] === undefined) {
    return res.status(404).json({
      error: `no pet with id: ${id}`,
    });
  }
  res.json({ pet: result.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;

  const result = await db.query(
    "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 WHERE id = $1 RETURNING *",
    [id, name, age, type, breed, microchip]
  );
  if (result.rows[0] === undefined) {
    return res.status(404).json({
      error: `no pet with id: ${id}`,
    });
  }
  res.status(201).json({ pet: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("DELETE FROM pets WHERE id = $1 RETURNING *", [
    id,
  ]);
  if (result.rows[0] === undefined) {
    return res.status(404).json({
      error: `no pet with id: ${id}`,
    });
  }

  res.status(201).json({ pet: result.rows[0] });
});


router.get("/breeds", async (req, res) => {
    let { type } = req.query;
    const result = await db.query("SELECT * from pets WHERE type = $1", [type])
    console.log('my result', result);
})

module.exports = router;
