const express = require("express");
const router = express.Router();
const { getAllPets, createPet, getPetById, updatePet, deletePet } = require("../controllers/pets.controller");

router.get("/", async (req, res) => {
  const pets = await getAllPets();
  // console.log(books)
  res.status(200).json({
    pets
  });
});

router.post("/", async (req, res) => {
  const pet = req.body;

  const newPet = await createPet(pet);

  res.status(201).json({
    pet: newPet,
  });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const selectedPet = await getPetById(id);

  res.status(200).json({
    pet: selectedPet,
  });
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const petInfo = req.body;

  const petToUpdate = await updatePet(id, petInfo);

  res.status(201).json({
    pet: petToUpdate,
  });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const petToDelete = await deletePet(id);
  res.status(201).json({
    pet: petToDelete,
  });
});


module.exports = router;