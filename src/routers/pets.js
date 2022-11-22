const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
    const sqlQuery = `select * from pets`;
    const result = await db.query(sqlQuery);
    res.json({
      pets: result.rows
    });
  })


router.get("/:id", async (req,res) => {
const {id} = req.params;
const sqlQuery = 'select * from pets where id = $1';
const result = await db.query(sqlQuery, [id])
res.json({books: result.rows})
})

router.post ('/', async (req, res) => {
    const sqlQuery = `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const result = await db.query(sqlQuery, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.microchip])
    console.log(result)
    res.json({ pets: result.rows })
})

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const sqlQuery = 'update pets set name =$1, age = $2, type = $3, breed = $4, microchip = $5 where id = $6  RETURNING *';
    const result = await db.query(sqlQuery, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.microchip, id])
    res.json({pets: result.rows})
  })

router.delete("/:id", async (req, res) => {
const {id} = req.params;
const sqlQuery = 'DELETE from pets WHERE id = $1 RETURNING *;'
const results = await db.query(sqlQuery, [id])
res.json({pets: results.rows})
})

  module.exports = router
