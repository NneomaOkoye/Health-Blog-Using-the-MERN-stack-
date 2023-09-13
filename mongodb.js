const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://okoyenneoma1:<-rNX7@yFG-z4ba#>@cluster0.7cpxdrg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect()
    const database = client.db('MongoClient');
    const blogpost = database.collection('blogpost');
    const login = database.collection('login');
    const register = database.collection('register');


    // Query for a blogpost that has the title 'Health Blog Post'
    const query = { title: 'Health Blog Post' };
    const blogPostDocument = await blogpost.findOne(query);
    

    console.log(blogPostDocument);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.error);