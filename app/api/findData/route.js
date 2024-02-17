import getClient from "../../lib/getClient";

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

async function handler(req, res) {
    if (req.method === "POST") {
        // console.log(`req.body: -----> ${req.body}`);
        const { providedKey, providedData } = await req.json();
        // if (providedData === undefined || providedKey === undefined) {
        //     return;
        // }

        console.log(`providedKey: -----> ${providedKey}`);
        console.log(`providedData: -----> ${providedKey}`);

        const client = await getClient();

        try {
            const dbName = "task4-mern";
            const collectionName = "users";
            const database = client.db(dbName);
            const collection = database.collection(collectionName);

            const findQuery = { [providedKey]: providedData };
            
            const user = await collection.findOne(findQuery);

            console.log(`USER: -----> ${user.email}`);

            if (user) {
                const resBody = JSON.stringify(user);

                const res = new Response(resBody, {
                    status: 200,
                    statusText: "User have found",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            } else {
                const res = new Response(null, {
                    status: 404,
                    statusText: "User not found",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            }
        } catch (error) {
            const res = new Response(null, {
                status: 500,
                statusText: `Error fetching user data: ${error}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res;
        } finally {
            await client.close();
        }
    } else {
        // return Response.setHeader("Allow", ["POST"]);
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

export { handler as POST };
