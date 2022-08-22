require('dotenv').config();
const axios = require("axios").default;
const { Type, Recipe } = require("../db");
const {FOOD_APY_KEY} = process.env
/* ${FOOD_APY_KEY0 ? FOOD_APY_KEY0 : FOOD_APY_KEY1 ? FOOD_APY_KEY1 : FOOD_APY_KEY2 ? FOOD_APY_KEY2 : FOOD_APY_KEY3?FOOD_APY_KEY3:FOOD_APY_KEY4?FOOD_APY_KEY4:FOOD_APY_KEY5} */

const getApiRecipes = async () => {
    try {
        const getAPIData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${FOOD_APY_KEY}&addRecipeInformation=true&number=99`)
        const APIMap = getAPIData.data.results.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.title,
                image:recipe.image,
                dishTypes: recipe.dishTypes,
                types: recipe.diets.map(diet=> diet).join(', '),
                healthScore: recipe.healthScore,
                summary: recipe.summary,
                score: recipe.score,
                steps: recipe.analyzedInstructions[0]?.steps.map((st) => {
                    return {number: st.number,step: st.step,}
                })
            }
        }); return APIMap;
    } catch (err) { console.log(err) }
}

const dbData = async () => {
    const data = await Recipe.findAll(
        {
            include:
            {
                model: Type,
                attributes: ["name"]
            }
        }
    )
    return data
}

const allRecipes = async ()=>{
    let api = await getApiRecipes();
    let db = await dbData();
    let allData = api.concat(db);
    return allData;
}

module.exports = {allRecipes}