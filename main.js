const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000; //Radiofrekvens
// const migrationHelper = require("./migrationhelper");

const uri =
"mongodb+srv://jpempire1777:Jolli9393!@cluster0.ijoagk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri);
app.use(express.json());
//GET
app.get("/walloftexts", async (req, res) => {
    try {
      await client.connect();
      const database = client.db("walloftext");
      const collection = database.collection("walloftexts");
      const walloftexts = await collection.find({}).toArray();
      res.json(walloftexts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  });
  
  //POST
  app.post("/walloftexts", async (req, res) => {
      try {
        await client.connect();
        const database = client.db("walloftext");
        const collection = database.collection("walloftexts");
        const result = await collection.insertOne(req.body);
          // If the insertion was successful, send a 200 response
          res.status(200).json({ message: "Message Successfully Added!" });
       
      } catch (err) {
        // If an error occurred during the insertion process, send a 500 response
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      } finally {
        // Close the MongoDB client connection
        await client.close();
      }
    });
  

app.listen(port, async () => {
    // await migrationHelper.migrate();
    console.log(`Listening on port 👂🏽 ${port}`);
});