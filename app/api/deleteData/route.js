import getClient from "../../lib/getClient";
import { ObjectId } from "mongodb";

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

async function handler(req, res) {
    if (req.method === "POST") {
        const client = await getClient();
        const ids = await req.json();

        try {
            const dbName = "task4-mern";
            const collectionName = "users";

            const database = await client.db(dbName);
            const collection = await database.collection(collectionName);

            const objectIds = ids.map((id) => new ObjectId(id));
            const deleteQuery = { _id: { $in: objectIds } };

            try {
                const deleteResult = await collection.deleteMany(deleteQuery);
                console.log(`Deleted ${deleteResult.deletedCount} documents`);

                const res = new Response(null, {
                    status: 200,
                    statusText: `Deleted ${deleteResult.deletedCount} documents`,
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
