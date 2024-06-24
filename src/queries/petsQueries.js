exports.getAllPets = `
SELECT * 
FROM pets`;

exports.getPetById = `
SELECT * 
FROM pets 
WHERE id = $1`;

exports.addPet = `
INSERT INTO pets 
    (name, age, type, breed, has_microchip) 
VALUES 
    ($1, $2, $3, $4, $5)`;

exports.deletePetById = `
DELETE FROM pets
WHERE id = $1`;

exports.updatePetById = `
UPDATE pets 
SET name=$1, 
    age=$2, 
    type=$3, 
    breed=$4, 
    has_microchip=$5  
WHERE id = $6`;
