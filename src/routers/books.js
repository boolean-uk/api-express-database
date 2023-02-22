const express = require('express');
const router = express.Router();
const { getAll, getById, create } = require('../controllers/books');

router.get('/', async (req, res) => {
  await getAll(req, res);
});

router.get('/:id', async (req, res) => {
  await getById(req, res);
});

router.post('/', async (req, res) => {
  await create(req, res);
});

module.exports = router;
