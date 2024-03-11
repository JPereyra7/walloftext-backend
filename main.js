const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

// Use CORS middleware
const cors = require("cors");

// Set up CORS options
const corsOptions = {
  origin: "https://wall-of-text.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

const uri = "mongodb+srv://jpempire1777:Jolli9393!@cluster0.ijoagk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB once
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}

connectToDatabase();

app.use(express.json());

// GET route to fetch all messages
app.get("/walloftexts", async (req, res) => {
  try {
    const database = client.db("walloftext");
    const collection = database.collection("walloftexts");
    const walloftexts = await collection.find({}).toArray();
    res.json(walloftexts);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST route to add a new message
app.post("/walloftexts", async (req, res) => {
  try {
    const database = client.db("walloftext");
    const collection = database.collection("walloftexts");
    const result = await collection.insertOne(req.body);
    res.status(200).json({ message: "Message Successfully Added!" });
  } catch (err) {
    console.error("Error adding message:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE route to delete a message by its ObjectId
app.delete("/walloftexts/:id", async (req, res) => {
  try {
    const database = client.db("walloftext");
    const collection = database.collection("walloftexts");
    const { id } = req.params; // Retrieve the ID from the request parameters
    const result = await collection.deleteOne({ _id: ObjectId(id) }); // Convert the id to ObjectId
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Message Successfully Deleted!" });
    } else {
      res.status(404).json({ message: "Message Not Found" });
    }
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(port, () => {
  console.log(`Listening on port 👂🏽 ${port}`);
});


