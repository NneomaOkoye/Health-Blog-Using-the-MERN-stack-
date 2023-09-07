const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// Mock data for blog articles
const articlesInfo = {
  "learn-react-new": {
    comments: [],
  },
  "learn-react": {
    comments: [],
  },
  "my-thoughts-on-learning-react": {
    comments: [],
  },
};

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Connect to MongoDB (using your provided URI)
const uri =
  "mongodb+srv://okoyenneoma1:newpassword@cluster0.7cpxdrg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a user schema and model (assuming you have a "User" model)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

async function run() {
  try {
    await client.connect(); // Connect to MongoDB

    const database = client.db("test");

    // Rest of your code (login endpoint and blog endpoints) remains the same...
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

// Define routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our blog" });
});

//app listen for requests
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
