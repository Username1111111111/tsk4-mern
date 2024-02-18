import getClient from "../../lib/getClient";
import getCollection from "../../lib/getCollection";

async function handler(req) {
    if (req.method === "POST") {
        const { providedKey, providedData } = await req.json();

        console.log(`providedKey: -----> ${providedKey}`);
        console.log(`providedData: -----> ${providedKey}`);

        let client;
        let collection;

        try {
            client = await getClient();
            collection = await getCollection(client);
        } catch (error) {
            console.error(
                "Error connecting to the database in findData.js:",
                error
            );
            return res
                .status(500)
                .json({
                    message: "Error connecting to the database in findData.js",
                });
        }

        try {
            const findQuery = { [providedKey]: providedData };

            let user;
            try {
                user = await collection.findOne(findQuery);
                console.log(`USER in findData: -----> ${user.email}`);
            } catch(error) {
                console.error(
                    `Error getting user from MONGO in findData.js: ${error.message}`
                );
            }


            if (!user) {
                // User not found
                const res = new Response(null, {
                    status: 404,
                    statusText: "User not found",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            }

            console.log(`USER in findData: -----> ${user.email}`);
            const resBody = JSON.stringify(user);

            const res = new Response(resBody, {
                status: 200,
                statusText: "User have been found",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res;
        } catch (error) {
            console.error(
                `Error fetching user data in findData.js: ${error.message}`
            );
            const res = new Response(null, {
                status: 500,
                statusText: `Error fetching user data in findData.js: ${error.message}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res;
        } finally {
            if (client) {
                await client.close();
            }
        }
    }
}


export { handler as POST };
