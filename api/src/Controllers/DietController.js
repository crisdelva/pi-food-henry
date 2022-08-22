require('dotenv').config();
const axios = require("axios").default;
const { Type, Recipe } = require('../db')
const { FOOD_APY_KEY } = process.env

const getApiDiets = async (req, res) => {
    try {
        let apiDiets = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${FOOD_APY_KEY}&addRecipeInformation=true&number=100`);
        let types = await apiDiets.data.results.map(type => type.diets);
        let diets = types.flat();
        let typeDiets = [...new Set(diets),"no diet"];
        typeDiets.forEach(async diet => {
            await   Type.findOrCreate({
                where: { name: diet }
            });
        });
        console.log(typeDiets)
        const allDiets = await Type.findAll();
        
        return allDiets ;

    } catch (err) { console.log(err) };
}

const diets = async (req, res) => {
    try {
        let d = await Type.findAll();
        res.send(d);

    } catch (err) { res.status(404).send({ msg: error }) }
};
 
module.exports = { getApiDiets, diets }