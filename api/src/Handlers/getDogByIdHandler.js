const { getDogByIdFromDb } = require('../controllers/Db/getDogByIdDB');
const { getDogByIdFromApi } = require('../controllers/Api/getDogByIdApi');
const { validate: uuidValidate } = require("uuid");

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (uuidValidate(id)) {
      const dogDBFiltered = await getDogByIdFromDb(id);
      if (dogDBFiltered) {
        return res.status(200).json(dogDBFiltered);
      }
    }

    const dog = await getDogByIdFromApi(id);
    return res.status(200).json(dog);
  } catch (error) {
    return res.status(500).send(error);  }
};

module.exports = { getDogById };
