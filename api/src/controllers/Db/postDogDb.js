const axios = require("axios");
const { Dog, Temperament } = require("../../db");
require("dotenv").config();
const { Sequelize } = require('sequelize');

const createDog = async (req, res) => {
  try {
    const { image, name, height, weight, lifeSpan, temperaments } = req.body;
    
    if (!image || !name || !height || !weight || !lifeSpan || !temperaments) {
      return res
        .status(400)
        .send("We need all the information");
    }

    let existingDog = await Dog.findOne({ where: { name } });

    if (existingDog) {
      existingDog = await existingDog.update({
        image,
        name,
        height,
        weight,
        lifeSpan,
      });

      const tempsRecords = await Temperament.findAll({
        where: { name: { [Sequelize.Op.in]: temperaments } },
      });

      await existingDog.setTemperaments(tempsRecords);
      return res.status(200).json(existingDog);
    } else {
      const newDog = await Dog.create({
        image,
        name,
        height,
        weight,
        lifeSpan,
      });
      const tempsRecords = await Temperament.findAll({
        where: { name: { [Sequelize.Op.in]: temperaments } },
      });
      await newDog.setTemperaments(tempsRecords);
      return res.status(201).json(newDog);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { createDog };
