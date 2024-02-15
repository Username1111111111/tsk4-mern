"use server";
import getClient from "./getClient";
// import getCurrentDate from "./getCurrentDate";

export default async function postData( data ) {
    const client = await getClient();
    try {
        const dbName = "task4-mern";
        const collectionName = "users";

        const database = await client.db(dbName);
        const collection = await database.collection(collectionName);

        // const testData = [
        //     {
        //         name: "John Doe",
        //         password: "test",
        //         email: "johndoe@gmail.com",
        //         lastloginDate: new Date(),
        //         signupDate: new Date(),
        //         status: "unblocked",
        //     },
        // ];

        try {
            const insertManyResult = await collection.insertMany(data);
            console.log(
                `${insertManyResult.insertedCount} documents successfully inserted.\n`
            );
            return 1;
        } catch (err) {
            console.error(
                `Something went wrong trying to insert the new documents: ${err}\n`
            );
        }
    } finally {
        await client.close();
    }
}
// fetchData().catch(console.dir);
