import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import updateTime from "../../../lib/updateTime";



// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "qwerty123",
                },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                

                try {
                    const requestBody = {
                        providedKey: "email",
                        providedData : email,
                    };

                    const res = await fetch(`/api/findData`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    });

                    // console.log(res.body);

                    if (res.status == 200) {
                        const user = await res.json();
                        console.log(`User found: ${user}`);

                        if (
                            user.email === email &&
                            user.password === password
                        ) {
                            if (user.status === "blocked") {
                                throw new Error("The user has been blocked");
                            } else {
                                return Promise.resolve({
                                    _id: user._id,
                                    email: user.email,
                                    password: user.password,
                                    status: user.status,
                                });
                            }
                        } else {
                            throw new Error(
                                `Email and password doesn't match: ${user.email} & ${user.password}`
                            );
                            // return Promise.resolve(null);
                        }
                    } else if (res.status === 404) {
                        // console.error(
                        //     "Server response was not ok",
                        //     await res.json()
                        // );
                        return Promise.resolve(null);
                    }
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    return Promise.resolve(null);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.status = user.status;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                _id: token._id,
                status: token.status,
                email: token.email,
            };
            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log(`baseUrl: -----> ${baseUrl}`);
            console.log(`url: -----> ${url}`);
            
            if (url.startsWith(baseUrl)) {
                console.log(`returned url: -----> ${url}`);
                return url;
            } else {
                console.log(`returned baseUrl: -----> ${baseUrl}`);
                return baseUrl;
            }
        },
        async signIn({ user }) {
            if (user) {
                try {
                    await updateTime(user._id);
                    return await true;
                } catch (error) {
                    console.error(`Error updating last login time: ${error}`);
                    return await false;
                }
            }
            return true;
        },
    },
    pages: {
        signOut: `/api/auth/signin`
    },
});

export { handler as GET, handler as POST };
