const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      /* set(value){
        this.setDataValue('name', value.toLowerCase());//lo guarda en minus
      },
      get(){
        return this.getDataValue('name').toUpperCase();//lo muestra en mayus
      } */
    },
    imagen: {
      type: DataTypes.STRING,
      /* validate: {isUrl: true} */      
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {               
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    createDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },{
      timestamps: true,
      createdAt: false,
      updatedAt: 'actualizado'
    });
};
