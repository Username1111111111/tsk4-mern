"use server";
import getClient from "./getClient";
import { ObjectId } from 'mongodb';

export default async function deleteData(ids) {
    const client = await getClient();
    try {
        const dbName = "task4-mern";
        const collectionName = "users";

        const database = await client.db(dbName);
        const collection = await database.collection(collectionName);

        const objectIds = ids.map(id => new ObjectId(id));
        const deleteQuery = { _id: { $in: objectIds } };

        try {
            const deleteResult = await collection.deleteMany(deleteQuery);
            console.log(`Deleted ${deleteResult.deletedCount} documents`);
        } catch (err) {
            console.error(`Something wrong: ${err}`);
        }
    } finally {
        await client.close();
    }
}
