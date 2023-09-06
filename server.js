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

// Connect to MongoDB
const uri =
  "mongodb+srv://okoyenneoma1:newpassword@cluster0.7cpxdrg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("test");

    // Define a user schema and model (assuming you have a "User" model)
    const User = mongoose.model("User", {
      username: String,
      password: String,
    });

    // Login endpoint
    app.post("/api/login", async (req, res) => {
      const { username, password } = req.body;

      try {
        // Find user by username and password (you should hash and salt passwords in production)
        const user = await User.findOne({ username, password });

        if (!user) {
          return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        // User authenticated, you can create a session or token here
        // For simplicity, let's send a success response
        res.status(200).json({ success: true, message: "Login successful", user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // Get all blog posts
    app.get("/blog", (req, res) => {
      // Simulated data retrieval (replace with actual database query)
      const blogPosts = Object.keys(articlesInfo);
      res.status(200).json({ success: true, blogPosts });
    });

    // Get a specific blog post by name
    app.get("/blog/:name", (req, res) => {
      const { name } = req.params;
      const article = articlesInfo[name];

      if (!article) {
        return res.status(404).json({ success: false, message: "Article not found" });
      }

      res.status(200).json({ success: true, article });
    });
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
