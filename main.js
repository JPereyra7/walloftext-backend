const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { walloftext } = require("./models");
const { retrieveMessage } = require("./Controllers/messageController.js");
const { createMessage } = require("./Controllers/messageController.js");
const migrationHelper = require("./migrationhelper");
// Sequelize setup
const { Sequelize } = require('sequelize');

// Internal database URL provided by Render.com
const internalDatabaseUrl = 'postgres://messages:Fh1xu8WUWccJO7ugNZGG7BJoTUgy019E@dpg-cnn0rb0l6cac73fec1hg-a/walloftext';

// External database URL provided by Render.com
const externalDatabaseUrl = 'postgres://messages:Fh1xu8WUWccJO7ugNZGG7BJoTUgy019E@dpg-cnn0rb0l6cac73fec1hg-a.frankfurt-postgres.render.com/walloftext';

// Create a new Sequelize instance using the database URL
const sequelize = new Sequelize(externalDatabaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Adjust for production
    }
  }
});

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to test the database connection
testDatabaseConnection();

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5501",
        credentials: true,
    })
);

// Retrieving messages from DB
app.get("/getAllMessages", retrieveMessage);

app.post("/createMessage", createMessage);

// Start server
app.listen(port, async () => {
    await migrationHelper.migrate();
    console.log(`Listening on port 👂🏽 ${port}`);
});

