const express = require('express')
const router = express.Router()
const db = require("../../db");
const {
    getAll,
    createPet,
    getPet,
    updatePet,
    deletePet
} = require("../controllers/pets")

router.get("/", async (req, res) => {
    await getAll(req, res)
});

router.post("/", async (req, res) => {
    const { name, age, type, breed, microchip} = req.body;
    const str = `($1, $2, $3, $4, $5)`;
    const values = [name, age, type, breed, microchip];
    await createPet(req, res, str, values)
});

router.get("/:id", async (req, res) => {
    let str = `SELECT * FROM pets `
    str += `WHERE id = ${req.params.id}`
    await getPet(req, res, str)
})

router.put("/:id", async (req, res) => {
    const { name, age, type, breed, microchip } = req.body;
    let str = `UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5`
    str += `WHERE id = ${req.params.id} RETURNING *;`
    const values = [name, age, type, breed, microchip]
    await updatePet(req, res, str, values)
})

router.delete("/:id", async (req, res) => {
    const str = req.params.id
    await deletePet(req, res, str)
})
module.exports = router