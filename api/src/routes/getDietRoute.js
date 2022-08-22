const {Router} = require("express");
const { getApiDiets } = require("../Controllers/DietController");

const getDiet = Router();

getDiet.get("", async(req,res)=>{
    let ApiDiets = await getApiDiets();
   try{
        res.status(200).send(ApiDiets);
    }
    catch(err){
        res.status(404).send({msg:err})}
})

module.exports = getDiet;