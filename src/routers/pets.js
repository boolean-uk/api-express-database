const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', async (req, res) => {
    try {
        const pets = await db.query( 'SELECT * FROM pets');
        return res.status(200).json({pets: pets.rows})
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
});


router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const petFound = await db.query('SELECT * FROM pets WHERE id = $1', [id] )

        if(petFound.rows.length === 0) {
            return res.status(404).json({error: `no pet with id: ${id}` })
        }

        return res.status(200).json({pet: petFound.rows[0]})

    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
})


router.post('/', async (req, res) => {
    const {name, age, type, breed, has_microchip} = req.body

    const requireField = [name, age, type, breed, has_microchip]
    // const missingField = requireField.filter((field) => !(field in req.body)) 

    // console.log(missingField.length)
    // if(missingField.length > 0) {
    //     return res.status(400).json({error: `missing fields: age, breed, publication_date`})
    // }
    
    try {
        const newPet = await db.query(
             'INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [ name, age, type, breed, has_microchip]
        )
        console.log(newPet.rows[0])

        return res.status(201).json({pet: newPet.rows[0]})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})


router.delete('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const deletedPets = await db.query(
            'DELETE FROM pets WHERE id = $1 RETURNING *', [id]
        )

        if (deletedPets.rows.length === 0) {
            return res.status(404).json({error: `no pet with id: ${id}` })

        }

        return res.status(201).json({pet: deletedPets.rows[0]})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})


router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, age, type, breed, has_microchip} = req.body

    try {
        const updatedPet = await db.query(
            'UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, has_microchip = $6 WHERE id = $1 RETURNING *', 
            [id, name, age, type, breed, has_microchip]
        )

        if(updatedPet.rows.length === 0) {
            return res.status(404).json({error: `no pet with id: ${id}` })
        }
        return res.status(201).json({pet: updatedPet.rows[0]})

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})
module.exports = router 
