const{DataTypes} = require("sequelize")
const connection = require("../database/seq")

const spots = connection.define("spots", {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(30)
  },
  line_length: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING(255)
  },
  location: {
    type: DataTypes.STRING(50)
  },
})

spots.sync({alter: true});

module.exports = spots