const express = require("express");
const router = express.Router();
const {
  getAll,
  createpet,
  getpet,
  update,
  deleted,
} = require("../controllers/pets");

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const str = ` ('${name}', '${age}', '${type}','${breed}', '${microchip}')`;

  await createpet(req, res, str);
});

router.get("/:id", async (req, res) => {
  let str = "SELECT * FROM pets";
  str += ` WHERE id = ${req.params.id};`;

  await getpet(req, res, str);
});

router.put("/:id", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  let str = `name ='${name}', age ='${age}',type = '${type}', breed = '${breed}', microchip =  ${microchip}`;
  str += ` WHERE id = ${req.params.id} `;

  await update(req, res, str);
});

router.delete("/:id", async (req, res) => {
  let str = ` WHERE id = ${req.params.id} `;

  await deleted(req, res, str);
});

module.exports = router;
