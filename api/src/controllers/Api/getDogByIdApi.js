const axios = require("axios");
require("dotenv").config();
const { BASE_URL, IMAGE_URL } = process.env;

async function getDogByIdFromApi(id) {
    const response = await axios.get(`${BASE_URL}/breeds/${id}`);
    const result = response.data;
    return {
        id: result.id,
        image: `${IMAGE_URL}/${result.reference_image_id}.jpg`,
        name: result.name,
        height: result.height,
        weight: result.weight,
        lifeSpan: result.life_span,
        temperament: result.temperament ? result.temperament.split(', ') : [],
    };
}

module.exports = { getDogByIdFromApi }; 