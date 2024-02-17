import getClient from "../../lib/getClient";

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

async function handler(req, res) {
    if (req.method === "POST") {
        const client = await getClient();

        try {
            const dbName = "task4-mern";
            const collectionName = "users";
    
            const database = await client.db(dbName);
            const collection = await database.collection(collectionName);
    
            const users = await collection.find({}).toArray();

            // console.log(`fetchData users: -----> ${users}`);
    
            // users.forEach((user) => {
            //     user._id = user._id.toString();
            //     user.lastloginDate = user.lastloginDate.toLocaleDateString();
            //     user.signupDate = user.signupDate.toLocaleDateString();
            // });

            users.forEach((user) => {
                user._id = user._id.toString();
                user.lastloginDate = new Date(user.lastloginDate).toLocaleDateString();
                user.signupDate = new Date(user.signupDate).toLocaleDateString();
            });

            const resBody = JSON.stringify(users);
            // const resBody = users;

            const res = new Response(resBody, {
            // const res = new Response(users, {
                status: 200,
                statusText: "Users have fetched",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res;
                    
        } finally {
            await client.close();
        }

    }
}


export { handler as POST };