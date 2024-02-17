export default async function getCollection(client) {
    const dbName = "task4-mern";
    const collectionName = "users";

    const database = await client.db(dbName);
    const collection = await database.collection(collectionName);
    console.log(`Collection succesfully gotten: -----> ${collection}`);

    return collection;
}
