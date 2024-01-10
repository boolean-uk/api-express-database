const express = require("express");
const {
  getAllPets,
  createPet,
  getPetById,
  deletePet,
  updatePet,
} = require("../controllers/pets");

const router = express.Router();

router.get("/", async (req, res) => {
  const allPets = await getAllPets();

  return res.status(200).send({ pets: allPets });
});

router.post("/", async (req, res) => {
  const newPet = await createPet(req.body);

  return res.status(201).send({ pet: newPet });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const petById = await getPetById(id);

  return res.status(200).send({ pet: petById });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const updatedPet = await updatePet(id, req.body);

  return res.status(201).send({ pet: updatedPet });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedPet = await deletePet(id);

  return res.status(201).send({ pet: deletedPet });
});

module.exports = router;
