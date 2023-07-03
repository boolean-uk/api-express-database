const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  let { type, page, perPage } = req.query;
  values = [];
  let myQuery = "";

  if (page === "" || page === undefined) {
    page = 1;
  }

  if (perPage === "" || perPage === undefined) {
    perPage = 20;
  }
  if (type) {
    myQuery = "WHERE type = $1";
    values.push(type);
  }

  const pageNum = Number(page);
  const perPageNum = Number(perPage);
  const offset = (pageNum - 1) * perPageNum;

  if (perPageNum > 50 || perPageNum < 10) {
    res.status(400).json({
      error: `parameter invalid perPage: ${perPageNum} not valid. Accepted range is 10 - 50`,
    });
  }
  else if(perPage || page){
    const result = await db.query(
        `SELECT * from pets ${myQuery} LIMIT ${perPage} OFFSET ${offset}`,
        values
      );
      res.json({ pets: result.rows, page: pageNum, per_page: perPageNum });
  }
   else {
    const result = await db.query(
      `SELECT * from pets ${myQuery} LIMIT ${perPage} OFFSET ${offset}`,
      values
    );
    res.json({ pets: result.rows });
  }
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
  const { id } = req.params;
  const result = await db.query("SELECT * from pets WHERE id =$1", [id]);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no pet with id: ${id}` });
  }
  else {
    res.json({ pet: result.rows[0] });
  }

});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.query(
    "UPDATE pets SET name =$2, age=$3, type=$4, breed=$5, microchip=$6 WHERE id=$1 RETURNING *",
    [id, name, age, type, breed, microchip]
  );
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no pet with id: ${id}` });
  }
  else {
  res.status(201).json({ pet: result.rows[0] });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("DELETE FROM pets WHERE id=$1 RETURNING *", [
    id,
  ]);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no pet with id: ${id}` });
  }
  else {
  res.status(201).json({ pet: result.rows[0] });
  }
});

module.exports = router;
