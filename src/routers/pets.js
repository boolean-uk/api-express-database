const express = require("express");
const router = express.Router();
const db = require("../../db");
const {
  create,
  getAll,
  getPetById,
  updatePetById,
  deletePetById,
} = require("../controllers/pets");

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/:id", async (req, res) => {
  await getPetById(req, res);
});

router.put("/:id", async (req, res) => {
  await updatePetById(req, res);
});

router.delete("/:id", async (req, res) => {
  await deletePetById(req, res)
});

module.exports = router;
