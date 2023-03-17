const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', async (req, res) => {
    // const { type, topic } = req.query;

    let str = 'SELECT * FROM pets';
    let values = [];
    str += ';';
    const data = await db.query(str, values);
    const pets = data.rows;
    res.json({ pets });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const str = 'SELECT * FROM pets WHERE id = $1;';
    const values = [id];
    const data = await db.query(str, values);
    const pet = data.rows[0];
    res.json({ pet });
});

router.post('/', async (req, res) => {
    const { name, age, type, breed, microchip } = req.body;
    const str =
        'INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const values = [name, age, type, breed, microchip];
    const data = await db.query(str, values);
    const pet = data.rows[0];

    res.status(201).json({ pet });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, age, type, breed, microchip } = req.body;

    const str =
        'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *;';
    const values = [name, age, type, breed, microchip, id];
    const data = await db.query(str, values);
    const pet = data.rows[0];
    res.status(201).json({ pet });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const str = 'DELETE from pets WHERE id = $1 RETURNING *;';
    const values = [id];
    const data = await db.query(str, values);
    const pet = data.rows[0];
    res.status(201).json({ pet });
});

module.exports = router;
