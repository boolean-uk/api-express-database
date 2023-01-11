const express = require("express");
const router = express.Router();
const { getAll, create } = require("../controllers/pets.js");

router.get("/", async (req, res) => {
	await getAll(req, res);
});

router.post("/", async (req, res) => {
	await create(req, res);
});

module.exports = router;
