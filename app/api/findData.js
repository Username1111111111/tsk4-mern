import getClient from "../lib/getClient";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { providedKey, providedData } = req.body;
        const client = await getClient();

        try {
            const dbName = "task4-mern";
            const collectionName = "users";
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            const findQuery = { [providedKey]: providedData };
            const user = await collection.findOne(findQuery);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error fetching user data",
                error,
            });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
