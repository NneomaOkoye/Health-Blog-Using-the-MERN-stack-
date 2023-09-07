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

// Initialize middleware
app.use(express.json());

// Connect to MongoDB (using your provided URI)
const uri =
  "mongodb+srv://okoyenneoma1:newpassword@cluster0.7cpxdrg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a user schema and model (assuming you have a "User" model)
const User = mongoose.model("User", {
  username: String,
  password: String,
});

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

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
