const { MongoClient } = require('mongodb');

// Connection URI. Update <username>, <password>, and <your-cluster-url> as necessary
const uri = "mongodb://localhost:27017";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const database = client.db("testLoadDB");
    const collection = database.collection("testLoadCollection");

    while (true) {
      // Insert 1000 documents
      const inserts = [];
      for (let i = 1; i <= 1000; i++) {
        inserts.push({ id: i, value: `Value ${Math.random() * 1000}` });
      }
      await collection.insertMany(inserts);
      console.log("1000 records inserted.");

      // Sleep for 10 seconds
      await new Promise(resolve => setTimeout(resolve, 100000));

      // Delete all documents
      // await collection.deleteMany({});
      // console.log("All records deleted. Restarting...");
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
