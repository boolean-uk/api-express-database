const express = require('express');
const router = express.Router();
const db = require("../../db");

// get all pets
router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM pets');
    res.json({data:result.rows});
});

// get a pet by its id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await db.query(`SELECT * FROM pets WHERE id = ${id}`);
    res.json({data:result.rows});
});

// UPDATE A PET

router.put('/:id', async(req,res) =>{
    const {id} = req.params;
    const {name, age, type, breed, microchip} = req.body;
    const result = db.query(`
    UPDATE pets
    SET name = '${name}', age = '${age}', breed = '${breed}', microchip = '${microchip}'
    WHERE id = ${id}
    RETURNING *
    `)
    res.json({ data: result.rows });
})

// DELETE A PET
router.delete('/:id', async(req, res) =>{
    const {id} = req.params;
    
    const result = db.query(`
        DELETE FROM pets
        WHERE id = ${id}
        RETURNING *
    `)

    res.json({ data: result.rows });
})
module.exports = router;
