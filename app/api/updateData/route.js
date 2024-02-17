import getClient from "../../lib/getClient";
import { ObjectId } from "mongodb";
import getCollection from "../../lib/getCollection";

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

// export default async function updateData( ids, newStatus ) {
async function handler(req, res) {
    if (req.method === "POST") {
        const client = await getClient();
        const { ids, newStatus } = await req.json();

        try {
            const collection = await getCollection(client);
            // const dbName = "task4-mern";
            // const collectionName = "users";

            // const database = await client.db(dbName);
            // const collection = await database.collection(collectionName);

            const objectIds = ids.map((id) => new ObjectId(id));
            const findQuery = { _id: { $in: objectIds } };
            const updateDoc = { $set: { status: newStatus } };

            try {
                const updateResult = await collection.updateMany(
                    findQuery,
                    updateDoc
                );
                const res = new Response(null, {
                    status: 200,
                    statusText: `Matched ${updateResult.matchedCount} documents and updated ${updateResult.modifiedCount} documents.`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            } catch (err) {
                const res = new Response(err, {
                    status: 404,
                    statusText: `Something wrong: ${err}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            }
        } finally {
            await client.close();
        }
    }
}

export { handler as POST };