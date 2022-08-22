const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey:true,
      allowNull: false,

    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false,

    },
    healthScore:{
      type: DataTypes.INTEGER,
    
    },
    score:{
      type: DataTypes.INTEGER,
      
    },
    image:{
      type: DataTypes.TEXT

    },
    steps: {
      type: DataTypes.TEXT,

    },
    dishTypes:{
      type:DataTypes.STRING,

    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,

    },

  });
};
