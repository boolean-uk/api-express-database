const express = require("express");
const router = express.Router();
const db = require("../../db/index");

router.get("/", async (req, res) => {
  let { page, perPage } = req.query;
  page = Number(page) || 1;
  perPage = Number(perPage) || 20;

  if (perPage < 10 || perPage > 50) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`,
    });
  }

  const per_page_offset = (page - 1) * perPage;

  const dbquery = `SELECT * FROM pets LIMIT $1 OFFSET $2`;
  const result = await db.query(dbquery, [perPage, per_page_offset]);

  if (result) {
    res.json({
      pets: result.rows,
      per_page: perPage,
      page: page,
    });
  } else {
    res.status(404).send({ error: "No pets exist" });
  }
});

// Get a pet by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(`SELECT * FROM pets WHERE id = $1`, [id]);
  if (result.rows.length) {
    res.json({ pet: result.rows[0] });
  } else {
    res.status(404).send({ error: `no pet with id: ${id}` });
  }
});

// Create a pet
router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;

  if (!name || !age || !type || !breed || !microchip) {
    res.status(400).json({ error: `missing fields: age, breed, microchip` });
    console.log();
    return;
  }

  const result = await db.query(
    `INSERT INTO pets (name, age, type, breed, microchip)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
    [name, age, type, breed, microchip]
  );
  res.status(201).json({ pet: result.rows[0] });
});

// Update a pet
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.query(
    `
    UPDATE pets
    SET name = $2, age = $3, type = $4, breed = $5, microchip = $6
    WHERE id = $1
    RETURNING *`,
    [id, name, age, type, breed, microchip]
  );
  // res.status(201).json({ pet: result.rows[0] });



  if (result.rows.length) {
    res.status(201).json({ pet: result.rows[0] });
  } else {
    res.status(404).send({ error: `no pet with id: ${id}` });
  }


});

// Delete a pet
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(
    `
  DELETE FROM pets
  WHERE id = $1
  RETURNING *`,
    [id]
  );
  // res.status(201).json({ pet: result.rows[0] });

  if (result.rows.length) {
    res.status(201).json({ pet: result.rows[0] });
  } else {
    res.status(404).send({ error: `no pet with id: ${id}` });
  }
});

module.exports = router;
