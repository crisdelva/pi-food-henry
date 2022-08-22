const { default: axios } = require('axios');
const {Router} = require('express');
const { Type,Recipe } = require('../db');
const {FOOD_APY_KEY} = process.env


const recipeIdRoute= Router();

recipeIdRoute.get('/:id', async(req,res)=>{
    let {id} = req.params;
    try{
        if(!id.includes("-")){
        let data = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${FOOD_APY_KEY}`)).data
        let dataApi= {
                        id: data.id,
                        name:data.title,
                        image:data.image,
                        summary:data.summary,
                        types:data.diets.map(diet=>diet).join(", "),
                        dishType: data.dishTypes.toString().split(", "),
                        healthScore:data.healthScore,
                        steps:data.analyzedInstructions[0]?.steps.map(st => {return {number: st.number, step: st.step}})
                    }
        res.send(dataApi)
        }else{
            let recipeDb = await Recipe.findByPk(id,{include:{model:Type,attributes:['name'], through:{attributes:[]}}})
        res.send(recipeDb)
    }}
    catch(error){ res.status(404).send("ID is not valid")}
})

module.exports = recipeIdRoute;
