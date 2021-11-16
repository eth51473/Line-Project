const { Sequelize } = require('sequelize')
require("dotenv").config();
const {DATABASE_URL} = process.env
// const {DATABASE, DB_HOST, USER, PASSWORD} = process.env

const sequelize = new Sequelize(
  DATABASE_URL,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
  
module.exports = sequelize