const axios = require("axios");
const {Dog, Temperament} = require("../../db");
require("dotenv").config();
const {BASE_URL} = process.env 

const getTemperaments = async (req, res) => {
    try {
        const AllTemperamentsSet = new Set()
        const { data } = await axios.get(`${BASE_URL}/breeds`)
        const temperamentsData = data.map((breed) => {
            return {
                temps: breed.temperament
            }
        } )

        temperamentsData.forEach((element) => {
            if (element.temps) {
                const splitedTemps = element.temps.split(", ");
                splitedTemps.forEach((temp) => AllTemperamentsSet.add(temp));
            }
        })

        const AllTemperamentsArr = Array.from(AllTemperamentsSet)
        const TemperamentsDB = await Promise.all(AllTemperamentsArr.map(async arrTemp => {
            const [temp, created] = await Temperament.findOrCreate({
                where: {name: arrTemp},
                defaults: {name: arrTemp}
            })
            return temp
        }))
        return res.status(200).send(TemperamentsDB)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {getTemperaments}


