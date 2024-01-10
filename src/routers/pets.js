const express = require("express");
const router = express.Router();
const db = require("../../db");
const {
  getAllPets,
  addPet,
  getPetBy,
  deletePet,
  editPet,
} = require("../controllers/pets");

router.get("/", async (req, res) => {
  const result = await getAllPets();
  return res.json({ pets: result.rows });
});

router.post("/", async (req, res) => {
  await addPet(req.body);
  const result = await getPetBy({ name: req.body.name });
  return res.status(201).json({ pet: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const result = await getPetBy(req.params);
  return res.json({ pet: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const toBeDeleted = await deletePet(req.params);
  return res.status(201).json({ pet: toBeDeleted.rows[0] });
});

router.put("/:id", async (req, res) => {
  await editPet(req.params, req.body);
  const result = await getPetBy(req.params);
  return res.status(201).json({ pet: result.rows[0] });
});

module.exports = router;
