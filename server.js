const express = require("express");
const cors = require('cors')
const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors());

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
app.use(express.json());


// Connect to Mongodb
const uri = "mongodb+srv://okoyenneoma1:newpassword@cluster0.7cpxdrg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true });

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

    //Login endpoint
    app.post('/api/login', async (req, res) => {
      const { username, password } = req.body; //fix the destruction statement
      //Handle login logic here, query your Mongodb for user authentication, etc.filter(item => item)
    });

  } finally {
    //Ensures that the client will close when you finish/error
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


app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
