import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import findData from "../../lib/findData";
import updateTime from "../../lib/updateTime";

// const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",

//             credentials: {
//                 email: {
//                     label: "Email",
//                     type: "text",
//                     placeholder: "johndoe@gmail.com",
//                 },
//                 password: {
//                     label: "Password",
//                     type: "password",
//                     placeholder: "qwerty123",
//                 },
//             },
//             async authorize(credentials, req) {
//                 const { email, password } = credentials;

//                 let providedKey = "email",
//                     providedData = email;
//                 const findQuery = { providedKey, providedData };
//                 const user =  await findData(findQuery);
//                 console.log(user);

//                 if (user) {
//                     if ((user.email === email, user.password === password)) {
//                         if (user.status === "blocked") {
//                             throw new Error("The user has been blocked");
//                         } else {
//                             return {_id: user._id, email: user.email, password: user.password, status: user.status};
//                         }
//                     } else {
//                         return null;
//                     }
//                 } else {
//                     return null;
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
            
//             if (user) {
                
//                 token._id = user._id;
//                 token.status = user.status;
//                 token.email = user.email;
//             }
//             return token;
//         },
//         async session({ session, token }) {
            
//             session.user = {
//                 _id: token._id,
//                 status: token.status,
//                 email: token.email
//             };
//             return session;
//         },
//         async redirect({ url, baseUrl }) {
            
//             if (url.startsWith(baseUrl)) {
//                 return url;
//             }
            
//             return baseUrl;
//         },
//         async signIn({ user }) {
//             if (user) {
                
//                 try {
//                     await updateTime(user._id);
//                     return true; 
//                 } catch (error) {
//                     console.error(`Error updating last login time: ${error}`);
//                     return false; 
//                 }
//             }
//             return true; 
//         },
//     },
//     pages: {
//         signOut: '/api/auth/signin',
//     },
// };

// export default function authRoute(req, res) {
//     return NextAuth(req, res, authOptions);
// }

export default nextAuth({
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

                let providedKey = "email",
                    providedData = email;
                const findQuery = { providedKey, providedData };
                const user =  await findData(findQuery);
                console.log(user);

                if (user) {
                    if ((user.email === email, user.password === password)) {
                        if (user.status === "blocked") {
                            throw new Error("The user has been blocked");
                        } else {
                            return {_id: user._id, email: user.email, password: user.password, status: user.status};
                        }
                    } else {
                        return null;
                    }
                } else {
                    return null;
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
                email: token.email
            };
            return session;
        },
        async redirect({ url, baseUrl }) {
            
            if (url.startsWith(baseUrl)) {
                return url;
            }
            
            return baseUrl;
        },
        async signIn({ user }) {
            if (user) {
                
                try {
                    await updateTime(user._id);
                    return true; 
                } catch (error) {
                    console.error(`Error updating last login time: ${error}`);
                    return false; 
                }
            }
            return true; 
        },
    },
    pages: {
        signOut: '/api/auth/signin',
    },
});