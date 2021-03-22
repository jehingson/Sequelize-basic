const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class User extends Model {}

User.init({
   // Model attributes are defined here
   name: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isAlpha: {
         args: true,
         msg: "El nombre solo puede contener letras"
       },
       len: {
        args: [3, 60],
        msg: "El nombre debe ser entre 3 y 60 caracteres"
      }
     },
   },
   email: {
     type: DataTypes.STRING,
     validate: {
       isEmail: {
         args: true,
         msg: "El email debe ser un correo valido"
       }
     }
   },
   age: {
     type: DataTypes.INTEGER,
     validate: {
      isInt: {
        args: true,
        msg: "La edad tiene que ser un numero"
      },
      min: {
        args: 1,
        msg: "La edad tiene que ser mayor que 18"
      },
      max: {
        args: 90,
        msg: "La edad no esta permitidad"
      },
      esPar(value){
        if(value%2){
          throw new Error("La edad tiene que ser un numero par")
        }
      }
     }
   },
   // Si es 0 es usuario normal y si es 1 es administrador
   role:{
     type:  DataTypes.STRING,
     defaultValue: 0
   }
},{
  sequelize, // We need to pass the connection instance
  modelName: 'user'
});


module.exports = User;