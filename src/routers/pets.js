const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get("/", async (req, res) => {
    const str = `SELECT * FROM pets;`;
    const values = [];
    const data = await db.query(str, values);
    res.json({ pets: data.rows });
});

router.post("/", async (req, res) => {
    const { name, age, type, breed, microchip} = req.body;
    const str = `INSERT INTO pets (name, age, type, breed, microchip) 
    VALUES($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [name, age, type, breed, microchip];
    const data = await db.query(str, values);
    res.status(201).json({ pet: data.rows[0] });
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const str = `SELECT * FROM pets WHERE id = $1`
    const values = [id]
    const data = await db.query(str, values)
    res.json({ pet: data.rows[0] })
})

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const { name, age, type, breed, microchip } = req.body;
    const str = `UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 
   WHERE id = $1 RETURNING *;`
    const values = [id, name, age, type, breed, microchip]
    const data = await db.query(str, values)
    res.status(201).json({ pet: data.rows[0] })
})

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const str = `DELETE FROM pets WHERE id = $1 RETURNING *;`
    const values = [id]
    const data = await db.query(str, values)
    res.status(201).json({ pet: data.rows[0] })
})
module.exports = router