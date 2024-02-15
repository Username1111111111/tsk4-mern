"use server";
import getClient from "./getClient";
import { ObjectId } from 'mongodb';

export default async function updateTime(id) {
    const client = await getClient();
    try {
        const dbName = "task4-mern";
        const collectionName = "users";

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const currentTime = new Date();

        // Convert the string id to ObjectId
        const objectId = new ObjectId(id);
        const findQuery = { "_id": objectId };
        const updateDoc = { $set: { lastloginDate: currentTime } }; // Assuming the field is called "updatedAt"

        try {
            const updateResult = await collection.updateOne(
                findQuery,
                updateDoc,
            );
            console.log(
                `Matched ${updateResult.matchedCount} document(s) and updated ${updateResult.modifiedCount} document(s).`
            );
            return updateResult; // Returning the result could be useful for the caller
        } catch (err) {
            console.error(`Something went wrong: ${err}`);
            throw err; // Rethrow the error so the caller knows something went wrong
        }
    } finally {
        await client.close();
    }
}