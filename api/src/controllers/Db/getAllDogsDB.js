// src/db/dogsDb.js
const { Dog, Temperament } = require("../../db");

async function getDogsFromDb() {
    const dogsDB = await Dog.findAll({
        include: [{ model: Temperament, attributes: { exclude: ["UUID"] } }]
    });
    return dogsDB.map((dog) => ({
        id: dog.id,
        image: dog.image,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        lifeSpan: dog.lifeSpan,
        temperament: dog.temperaments
    }));
}

module.exports = { getDogsFromDb };
