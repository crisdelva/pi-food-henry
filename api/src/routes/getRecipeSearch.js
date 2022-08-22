const { allRecipes } = require("../Controllers/RecipeController");
const {Router} = require("express"); 
const getSearchRoute = Router();




    getSearchRoute.get("", async (req,res)=>{
    let {name} = req.query
    let dataApi = await allRecipes()
    if (name){
        const recipeName = await dataApi.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    recipeName.length? res.send(recipeName): res.status(404).send('We dont have that recipe... Maybe you could create it?')
    }
    })

