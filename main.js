const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // "Frekvens"
const session = require('express-session');

const { walloftext } = require("./models");
// const { messageController } = require("./Controllers/messageController.js");
const { retrieveMessage } = require("./Controllers/messageController.js");
const { createMessage } = require("./Controllers/messageController.js");
const migrationHelper = require("./migrationhelper");

app.use(express.json());

//Connecting to local Frontend server
app.use(
    cors({
        origin: "http://localhost:5501",
        credentials: true,
    })
)

//Retrieving messages from DB
app.get("/getAllMessages", retrieveMessage);

app.post("/createMessage", createMessage)

app.listen(port, async () => {
    await migrationHelper.migrate();
    console.log(`Listening on port 👂🏽 ${port}`);
});