const { MongoClient } = require("mongodb");

export default async function getClient() {
    const uri = process.env.MONGO_URI;
    const options = {}

    if (!process.env.MONGO_URI) {
        throw new Error("Please add your Mongo URI to .env.local");
    }

    try {
        const client = await new MongoClient(uri, options);
        console.log(`MongoDB client fetched!: -----> ${client}`);
        return client;
    } catch {
        throw new Error("Can't fetch client");
    }
}

