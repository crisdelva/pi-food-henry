
const {Router}  = require("express");
const {allRecipes} = require('../Controllers/RecipeController');

const recipeRoute = Router();

recipeRoute.get("", async(req,res)=>{
    let {name} = req.query;
    let recipes = await allRecipes();
    let recipe = recipes.map(reci =>{
        return{
            id: reci.id,
            name: reci.name,
            image:reci.image,
            dishTypes: reci.dishTypes.toString().split(", "),
            healthScore: reci.healthScore,
            types: reci.types,
        }})
        if (name){
            const recipeName = await recipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length? res.send(recipeName): res.status(404).send('We dont have that recipe... Maybe you could create it?')
        }else{
        res.send(recipe) 
    }
})

module.exports = recipeRoute;
