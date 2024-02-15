const { MongoClient } = require("mongodb");

export default async function getClient() {
    const uri = process.env.MONGO_URI;
    const options = {}

    if (!process.env.MONGO_URI) {
        throw new Error("Please add your Mongo URI to .env.local");
    }
    
    const client = new MongoClient(uri, options);
    
    return client;
}

