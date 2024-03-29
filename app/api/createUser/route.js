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

            // Create a unique index for the email field
            // await collection.createIndex({ email: 1 }, { unique: true });

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
            if (error.code === 11000) {
                // Duplicate key error code
                const res = new Response(error, {
                    status: 409,
                    statusText: "Email already exists",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            } else {
                const res = new Response(error, {
                    status: 500,
                    statusText: "Error creating user",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            }
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