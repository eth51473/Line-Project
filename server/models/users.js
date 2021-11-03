const{DataTypes} = require("sequelize")
const connection = require("../database/seq")

const users = connection.define("users", {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(20),
    unique: true
  },
  password: {
    type: DataTypes.STRING(100)
  },
})

users.sync({alter: true});

module.exports = users