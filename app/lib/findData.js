"use server";
import getClient from "./getClient";

export default async function findData({ providedKey, providedData }) {
    const client = await getClient();
    console.log(`providedKey & providedData: {${providedKey}, ${providedData}}`);
    try {
        const dbName = "task4-mern";
        const collectionName = "users";

        const database = await client.db(dbName);
        const collection = await database.collection(collectionName);

        // const findQuery = { email: providedData, password: providedPassword };
        const findQuery = { [providedKey]: providedData };

        try {
            const user = await collection.findOne(findQuery);
            // console.log(user);

            if (user) {
                console.log(`Found user: ${user}`);
                // return JSON.stringify(user);
                return user;
            } else {
                return null;
            }

        } catch (err) {
            console.error(
                `Something wrong: ${err}\n`
            );
        }
    } finally {
        await client.close();
    }
}
