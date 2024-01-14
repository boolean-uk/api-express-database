const express = require("express");
const router = express.Router();

const { getAllPets, postPetById, getAPetById, updatePetById, deletePetById } = require("../controllers/pets");

router.get("/", async (req, res) => {
  const pets = await getAllPets();
  console.log('Pets:', pets);
  res.status(200).json({ pets: pets });
});
router.post('/', async (req, res) => {

  const pet = await postPetById(req.body);
  res.status(201).json({ pet: pet })
})
router.get("/:id", async (req, res) => {
  const petId = req.params.id;
  const pet = await getAPetById(petId);
  res.status(200).json({ pet: pet })

})
router.put('/:id', async (req, res) => {
  const updatedPet = await updatePetById(req.params.id, req.body);
  res.status(201).json({ book: updatedPet })
})
router.delete('/:id', async (req, res)=> {
  const petId = req.params.id;
  const deletedPet = await deletePetById(petId);
  res.status(201).json({book: deletedPet})
})
module.exports = router;
