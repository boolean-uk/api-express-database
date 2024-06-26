const express = require("express");
const router = express.Router();
const db = require("../data/pets.js");

router.get("/", async (req, res) => {
  const pets = await db.all();
  res.status(200).json({ pets: pets });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const pet = await db.getById(id);
  res.status(200).json({ pet: pet });
});

router.post("/", async (req, res) => {
  const newPet = req.body;
  if (
    !newPet.name ||
    !newPet.age ||
    !newPet.type ||
    !newPet.breed ||
    !newPet.has_microchip
  ) {
    res.status(400).send({ error: `Missing fields in request body` });
    return;
  }

  const pet = await db.create(newPet);
  res.status(201).json({ pet: pet });
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  if (
    !updates.name ||
    !updates.age ||
    !updates.type ||
    !updates.breed ||
    !updates.has_microchip
  ) {
    res.status(400).send({ error: `Missing fields in request body` });
    return;
  }

  const updated = db.update(updates);
  res.status(201).json({ pet: updated });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await db.remove(id);
  res.status(201).json({ pet: result });
});

module.exports = router;
