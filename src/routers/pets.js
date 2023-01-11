const express = require("express");
const router = express.Router();
const {
	getAll,
	create,
	getByID,
	updateByID,
	deleteByID,
} = require("../controllers/pets.js");

router.get("/", async (req, res) => {
	await getAll(req, res);
});

router.post("/", async (req, res) => {
	await create(req, res);
});

router.get("/:id", async (req, res) => {
	await getByID(req, res);
});

router.put("/:id", async (req, res) => {
	await updateByID(req, res);
});

router.delete("/:id", async (req, res) => {
	await deleteByID(req, res);
});

module.exports = router;
