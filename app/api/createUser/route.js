import getClient from "../../lib/getClient";

export const config = {
    api: {
        bodyParser: true,
    },
};

async function handler(req, res) {
    if (req.method === "POST") {
        const client = await getClient();
        const data = req.body;

        try {
            const dbName = "task4-mern";
            const collectionName = "users";
            const database = client.db(dbName);
            const collection = database.collection(collectionName);

            const insertManyResult = await collection.insertMany(data);
            console.log(
                `${insertManyResult.insertedCount} documents successfully inserted.`
            );
            return Response.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error(`Error inserting documents: ${error}`);
            returnResponse.status(500).json({ message: "Error creating user", error });
        } finally {
            await client.close();
        }
    } else {
        // Response.setHeader("Allow", ["POST"]);
        return Response.status(405).json(`Method ${req.method} Not Allowed`);
    }
}

export { handler as GET, handler as POST };