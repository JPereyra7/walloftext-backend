require("dotenv").config();
module.exports = {
  development: {
    username: DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "walloftext",
    host: "cluster0.ijoagk8.mongodb.net",
    dialect: "mongodb",
  },
  test: {
    username: DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "walloftext",
    host: "cluster0.ijoagk8.mongodb.net",
    dialect: "mongodb",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "walloftext",
    host: "cluster0.ijoagk8.mongodb.net",
    dialect: "mongodb",
  },
};
