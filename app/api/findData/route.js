// import getClient from "../../lib/getClient";
// import getCollection from "../../lib/getCollection";

// async function handler(req) {
//     if (req.method === "POST") {
//         const { providedKey, providedData } = await req.json();

//         console.log(`providedKey: -----> ${providedKey}`);
//         console.log(`providedData: -----> ${providedKey}`);

//         const client = await getClient();

//         try {

//             const collection = await getCollection(client);

//             const findQuery = { [providedKey]: providedData };
//             const user = await collection.findOne(findQuery);

//             console.log(`USER in findData: -----> ${user.email}`);

//             if (user) {
//                 const resBody = JSON.stringify(user);

//                 const res = new Response(resBody, {
//                     status: 200,
//                     statusText: "User have been found",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });
//                 return res;
//             } else {
//                 const res = new Response(null, {
//                     status: 404,
//                     statusText: "User not found",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });
//                 return res;
//             }
//         } catch (error) {
//             const res = new Response(null, {
//                 status: 500,
//                 statusText: `Error fetching user data in findData.js: ${error.message}`,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             return res;
//         } finally {
//             await client.close();
//         }
//     } else {
//         const res = new Response(null, {
//             status: 405,
//             statusText: `Method ${req.method} Not Allowed`,
//             headers: {
//                 "Content-Type": "application/json",
//                 "Allow": ["POST"]
//             },
//         });
//         return res;
//     }
// }

import getClient from "../../lib/getClient";
import getCollection from "../../lib/getCollection";

// Assuming getCollection(client) returns a collection instance

export default async function handler(req, res) {
    if (req.method !== "POST") {
        // Method Not Allowed
        res.setHeader("Allow", ["POST"]);
        return res
            .status(405)
            .json({ message: `Method ${req.method} Not Allowed` });
    }

    // Parse the request body
    const { providedKey, providedData } = req.body;

    console.log(`providedKey: -----> ${providedKey}`);
    console.log(`providedData: -----> ${providedData}`);

    // Initialize client and collection
    let client;
    let collection;

    try {
        client = await getClient();
        collection = await getCollection(client);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return res
            .status(500)
            .json({ message: "Error connecting to the database" });
    }

    try {
        const findQuery = { [providedKey]: providedData };
        const user = await collection.findOne(findQuery);

        if (!user) {
            // User not found
            return res.status(404).json({ message: "User not found" });
        }

        // User found
        console.log(`USER in findData: -----> ${user.email}`);
        return res.status(200).json(user);
    } catch (error) {
        console.error(
            `Error fetching user data in findData.js: ${error.message}`
        );
        return res
            .status(500)
            .json({ message: `Error fetching user data: ${error.message}` });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

export { handler as POST };
