const express = require("express");
const cors = require('cors')
require("dotenv").config(); 
const app = express()
const PORT = process.env.PORT || 8000;


app.use(cors())
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
}

//initialize middleware
// we used to have to install parser but now it is built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://okoyenneoma1:newpassword@cluster0.7cpxdrg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('test');
    const movies = database.collection('test-collection');

     //Query for a movie that has the title 'Back to the Future'
    const query = { age: 26 };
    const movie = await movies.findOne(query);

    console.log(movie);
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

app.get('/', (req, res) => {
    res.json('data')
});


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));