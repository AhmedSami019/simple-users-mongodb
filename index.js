const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors())
app.use(express.json())

// user : simpleDbUser2
// pass : hfeUZl0jttd1tKeR

const uri =
  "mongodb+srv://simpleDbUser2:hfeUZl0jttd1tKeR@maincluster0.m4dyknx.mongodb.net/?appName=MainCluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// function
const run = async () => {
  try {

    const usersCollection = client.db("usersDb").collection("users")

    app.post('/users', async(req, res)=>{
      const newUser = req.body
      const result = await usersCollection.insertOne(newUser)
      res.send(result)
    })

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {

  }
};
run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("user is coming");
});

app.listen(port, () => {
  console.log(`data is coming form port : ${port}`);
});
