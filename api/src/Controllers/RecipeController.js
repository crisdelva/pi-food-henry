require('dotenv').config();
const axios = require("axios").default;
const { Type, Recipe } = require("../db");
const { FOOD_API_KEY,FOOD_API_KEY1,FOOD_API_KEY2,FOOD_API_KEY3 } = process.env

const getApiRecipes = async () => {
    try {
        const getAPIData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${FOOD_API_KEY?FOOD_API_KEY:FOOD_API_KEY1?FOOD_API_KEY1:FOOD_API_KEY2?FOOD_API_KEY2:FOOD_API_KEY3}&addRecipeInformation=true&number=99`)
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