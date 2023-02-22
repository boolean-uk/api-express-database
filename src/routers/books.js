const express = require('express');
const router = express.Router();
const { getAll, getById, create } = require('../controllers/books');

router.get('/', async (req, res) => {
  console.log('Get all - router');
  await getAll(req, res);
});

router.get('/:id', async (req, res) => {
  console.log('Get book by id - router');
  await getById(req, res);
});

router.post('/', async (req, res) => {
  console.log('Post book - router');
  await create(req, res);
});

module.exports = router;
