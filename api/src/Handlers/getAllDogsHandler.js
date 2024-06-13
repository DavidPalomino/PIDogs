const { getDogsFromApi } = require('../controllers/Api/getAllDogsApi');
const { getDogsFromDb } = require('../controllers/Db/getAllDogsDB');

const getAllDogs = async (req, res) => {
    try {
        const {name} = req.query
        
        const dogsFromApi = await getDogsFromApi();
        const dogsFromDb = await getDogsFromDb();
        const allDogs = [...dogsFromApi, ...dogsFromDb];
        
        if(name){
            const dogFound = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            if(dogFound == 0) throw new Error('There are not any matches')
            return res.status(200).send(dogFound)
        }
        return res.status(200).send(allDogs);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};

module.exports = { getAllDogs };
