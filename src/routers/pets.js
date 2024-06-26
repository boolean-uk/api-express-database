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
  const newBook = req.body;
  if (!newBook.title || !newBook.author || !newBook.type) {
    res.status(400).send({ error: `Missing fields in request body` });
  }

  const pet = await db.create(newBook);
  res.status(201).json({ pet: pet });
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  if (!updates.title || !updates.author || !updates.type) {
    res.status(400).send({ error: `Missing fields in request body` });
  }

  const index = pets.indexOf(found);
  const updated = { ...found, ...updates };
  res.status(200).json({ pet: updated });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await db.remove(id);
  res.status(200).json({ pet: found });
});

module.exports = router;
