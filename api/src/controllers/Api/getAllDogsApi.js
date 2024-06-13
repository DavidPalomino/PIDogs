const axios = require("axios");
require("dotenv").config();
const { BASE_URL, IMAGE_URL } = process.env;

async function getDogsFromApi() {
    const response = await axios.get(`${BASE_URL}/breeds`);
    const results = response.data;

    return results.map((breed) => ({
        id: breed.id,
        image: (`${IMAGE_URL}/${breed.reference_image_id}.jpg`),
        name: breed.name,
        height: breed.height,
        weight: breed.weight,
        lifeSpan: breed.life_span,
        temperament: breed.temperament ? breed.temperament.split(', ') : [],
    }));
}

module.exports = { getDogsFromApi };
