import getClient from "../../lib/getClient";
import getCollection from "../../lib/getCollection";

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

async function handler(req, res) {
    if (req.method === "POST") {
        const client = await getClient();
        const data = await req.json();

        console.log(`data: -----> ${data}`);

        try {

            const collection = await getCollection(client);

            const insertManyResult = await collection.insertMany(data);
            console.log(
                `${insertManyResult.insertedCount} documents successfully inserted.`
            );
            const res = new Response(data, {
                status: 201,
                statusText: "User created successfully",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res
        } catch (error) {
            const res = new Response(error, {
                status: 500,
                statusText: "Error creating user",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res;
        } finally {
            await client.close();
        }
    } else {
        const res = new Response(null, {
            status: 405,
            statusText: `Method ${req.method} Not Allowed`,
            headers: {
                "Content-Type": "application/json",
                "Allow": ["POST"]
            },
        });
        return res;
    }
}

export { handler as GET, handler as POST };