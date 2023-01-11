const express = require("express");
const router = express.Router();
const db = require("../../db");
const {
	getAll,
	getByID,
	updateByID,
	create,
} = require("../controllers/books.js");

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

module.exports = router;
