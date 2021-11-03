const { Sequelize } = require('sequelize')
require("dotenv").config();

const {DATABASE, DB_HOST, USER, PASSWORD} = process.env

const sequelize = new Sequelize(
  DATABASE,
  USER,
  PASSWORD,
  {
    host: DB_HOST,
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