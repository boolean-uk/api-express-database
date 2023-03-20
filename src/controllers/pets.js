const {
    getAllPets,
    createNewPet,
    getPetByid,
    updatepet,
    deletepet
} = require("../repositories/pets")

const getAll = async (req, res) => {
    const pets = await getAllPets();
    res.json({ pets: pets })
}

const createPet = async (req, res, str, values) => {
    const pet = await createNewPet(str, values)

    res.status(201).json({ pet: pet })
}

const getPet = async (req, res, str) => {
    const pet = await getPetByid(str)
    if (pet === undefined) {
        return res.status(404).json({ error: `no pet with id: ${id}` })
    } else {
        return res.json({ pet })
    }

}

const updatePet = async (req, res, str, values) => {
    const pet = await updatepet(str, values)
    res.status(201).json({ pet })
}

const deletePet = async (req, res, str) => {
    const pet = await deletepet(str)
    res.status(201).json({ pet })
}

module.exports = {
    getAll,
    createPet,
    getPet,
    updatePet,
    deletePet
}