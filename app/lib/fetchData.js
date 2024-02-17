"use server";
import getClient from "./getClient";

export default async function fetchData() {
    const client = await getClient();
    try {
        const dbName = "task4-mern";
        const collectionName = "users";

        const database = await client.db(dbName);
        const collection = await database.collection(collectionName);

        const users = await collection.find({}).toArray();

        users.forEach((user) => {
            user._id = user._id.toString();
            user.lastloginDate = user.lastloginDate.toLocaleDateString();
            user.signupDate = user.signupDate.toLocaleDateString();
        });
        
        await users;
        return users;
        // return await users;
        
    } finally {
        await client.close();
    }
    
}
// fetchData().catch(console.dir);
