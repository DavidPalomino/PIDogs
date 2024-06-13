const { Router } = require('express');
const { getAllDogs } = require('../Handlers/getAllDogsHandler');
const { getDogById } = require('../Handlers/getDogByIdHandler');
const { createDog } = require('../controllers/Db/postDogDb');
const { getTemperaments } = require('../controllers/ApiDb/getTemperamentsApiDb');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get('/dogs', getAllDogs)
router.get('/dogs/:id', getDogById)
router.get('/temperaments', getTemperaments)
router.post('/dogs', createDog)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
