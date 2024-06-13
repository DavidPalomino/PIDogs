const { Dog, Temperament } = require("../../db");

async function getDogByIdFromDb(id) {
    return await Dog.findOne({
        where: { id: id },
        include: [
            {
                model: Temperament,
                attributes: { exclude: ["UUID"] },
                through: { attributes: [] },
            },
        ],
    });
}

module.exports = { getDogByIdFromDb };