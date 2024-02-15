"use server";
import getClient from "./getClient";
import { ObjectId } from 'mongodb';

export default async function updateData( ids, newStatus ) {
    const client = await getClient();
    try {
        const dbName = "task4-mern";
        const collectionName = "users";

        const database = await client.db(dbName);
        const collection = await database.collection(collectionName);
        
        const objectIds = ids.map(id => new ObjectId(id));
        const findQuery = { "_id": { $in: objectIds } };
        const updateDoc = { $set: { "status": newStatus } };

        try {
            const updateResult = await collection.updateMany(
                findQuery,
                updateDoc,
            );
            console.log(
                `Matched ${updateResult.matchedCount} documents and updated ${updateResult.modifiedCount} documents.\n`
            );
        } catch (err) {
            console.error(
                `Something wrong: ${err}\n`
            );
        }
    } finally {
        await client.close();
    }
}
