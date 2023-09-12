const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();
const blogpostRoutes = require("./Routes/blogpost");

const app = express();
const PORT = process.env.PORT || 8000;

//routes
app.use('/api/blogpost', blogpostRoutes)
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

//initialize middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Connect to Mongodb
const uri = "mongodb+srv://okoyenneoma1:newpassword@cluster0.7cpxdrg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('test');
    const movies = database.collection('test-collection');

    //Define a user schema and model (assuming you have a "User" model)
    const User = mongoose.model('User', {
      username: String,
      password: String,
    });

    // Registration endpoint
    app.post('/api/register', async (req, res) => {
      const { username, password } = req.body;
      
      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
      }
    });

    //Login endpoint
    app.post('/api/login', async (req, res) => {
      const { username, password } = req.body; //fix the destruction statement
      //Handle login logic here, query your Mongodb for user authentication, etc.filter(item => item)
    });

  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);


app.post('/api/articles/add-comments', (req, res) => {
    const {username,text} = req.body
    const articlesName = req.query.name
    articlesInfo[articlesName].comments.push({username, text});
    res.status(200).send(articlesInfo[articlesName]);
});

// Define a POST route for user registration
app.post('/api/register', async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if a user with the same username already exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // If a user with the same username exists, return a 400 Bad Request response
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // If the username is unique, create a new user document and save it to the database
    const newUser = new User({ username, password });
    await newUser.save();

    // Return a 201 Created response to indicate successful registration
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    // Handle any errors that may occur during registration
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


//Get all blog posts
app.get('/blog/',(req, res) => {
//Implement logic to retrieve all blog posts
});

//Get all blog post with an id of whatever
app.get('/blog/:id', (req, res) => {
  const id = req.params.id;
 res.json("my id is:" + id);
});

app.get('/', (req, res) => {
    res.json('data');
});


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
