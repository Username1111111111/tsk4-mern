"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

// const data = [{
//     name,
//     email,
//     password,
//     lastloginDate: new Date(),
//     signupDate: new Date(),
//     status: "unblocked",
// }];

export default function LoginForm() {
    const [userInfo, setUserInfo] = useState({ email: "", pass: "" });

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await signIn("credentials", {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
        });
        console.log(res);
    }

    return (
        <section style={{ backgroundColor: "grey" }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="row col-6 bg white">
                    <h1 className="">Login</h1>
                    <form
                        method="post"
                        action="/api/auth/callback/credentials"
                        onSubmit={handleSubmit}
                    >
                        <label>
                            Email
                            <input
                                name="email"
                                type="text"
                                placeholder="johndoe@gmail.com"
                                
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Password
                            <input
                                name="password"
                                type="password"
                                placeholder="qwerty123"
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <button type="submit" className="btn btn-primary btn-lg">Sign in</button>
                        <p className="mb-0">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-black-50 fw-bold"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
