const {Router} = require('express');
const {Recipe, Type} = require('../db');


const recipeCreate = Router();

recipeCreate.post("", async (req,res)=>{
try{
  const {name,image,dishTypes,healthScore,types,summary,steps}= req.body;
  if(!name) return res.json({info:"Nombre obligatorio"})
  const existe= await Recipe.findOne({where:{name:name}})
  if(existe) return res.json({info:"We already have "})

  const recipe =await Recipe.create({name,image,dishTypes,healthScore,summary,steps})
 await Promise.all(types.map(async type =>{
            await recipe.addType([  
                  (await Type.findOrCreate({
                    where : {name : type}
                   }))[0].dataValues.id])
              }))
      
  const relacionTablas=await Recipe.findOne({where:{name:name},
    include:{model:Type,attributes:["name"],through :{attributes:[],}}})
  res.json({info:"Recipe Creada"})
  return relacionTablas
}catch(error){console.log(error)}
 })
module.exports=recipeCreate;