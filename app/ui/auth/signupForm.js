"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export default function SingupForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleClick(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // console.log(`email: -----> ${email}`);
        // console.log(`password: -----> ${password}`);

        const requestBody = {
            providedKey: "email",
            providedData : email,
        };

        const req = new Request(`${NEXTAUTH_URL}/api/findData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const res = await fetch(req);

        // console.log(`res: -----> ${res}`);
        // console.log(`res.status: -----> ${res.status}`);

        if (res.status == 200) {
            const user = await res.json();
            console.log(`User found: ${user}`);
            alert("Email already used. Choose other.");
            return;
        } else {

            const data = [
                {
                    name,
                    email,
                    password, // I was too lazy to HASH password etc and it wasnt' required, but I know that it must be implemented in every other serious project
                    lastloginDate: new Date(),
                    signupDate: new Date(),
                    status: "active",
                },
            ];
    
            const response = await fetch(`${NEXTAUTH_URL}/api/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log(`response.status: -----> ${response.status}`);
    
            if (response.status == 201) {
                signIn("credentials", {
                    email,
                    password,
                    callbackUrl: `${NEXTAUTH_URL}/`,
                    redirect: false,
                }).then((result) => {
                    if (result?.url) {
                        console.log(`result.url: -----> ${result.url}`);
                        router.push(result.url);
                    } else {
                        console.log(`router.push('/');`);
                        router.push('/');
                    }
                });
            }
        }

        
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div
                            className="card text-black"
                            style={{ borderRadius: 25 + "px" }}
                        >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            Sign up
                                        </p>

                                        <form className="mx-1 mx-md-1">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        id="form3Example1c"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example1c"
                                                    >
                                                        Your Name
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="email"
                                                        id="form3Example3c"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example3c"
                                                    >
                                                        Your Email
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="form3Example4c"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example4c"
                                                    >
                                                        Password
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={handleClick}
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
