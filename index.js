const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // get data
    app.get('/users', async(req, res)=>{
      const courser = usersCollection.find()
      const result = await courser.toArray()
      res.send(result)
    })

    app.get('/users/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await usersCollection.findOne(query)
      res.send(result)
    })

    // post data
    app.post('/users', async(req, res)=>{
      const newUser = req.body
      const result = await usersCollection.insertOne(newUser)
      res.send(result)
    })

    // put/update method
    app.put("/users/:id", async(req, res)=>{
      console.log(req.params.id);
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const user = req.body
      console.log(user);
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email
        }
      }
      const result = await usersCollection.updateOne(filter, updatedUser)
      res.send(result)
    })

    // delete data
    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await usersCollection.deleteOne(query)
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
