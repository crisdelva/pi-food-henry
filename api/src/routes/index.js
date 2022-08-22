const { Router } = require('express');
const recipeGetRoute = require('./getRecipeRoute');
const recipeIdRoute = require('./getRecipeIdRoute');
const getDietRoute = require('./getDietRoute');
const postRecipeRoute= require('./postRecipeRoute');
//const getSearchRoute = require('./getRecipeSearch')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/recipes', recipeGetRoute);
router.use('/recipes', recipeIdRoute);
router.use('/diets', getDietRoute);
router.use('/recipe',postRecipeRoute);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
