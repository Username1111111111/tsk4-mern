"use client";
import { useState } from "react";
import postData from "../../lib/postData";
import findData from "../../lib/findData";
import { signIn } from "next-auth/react";

export default function SingupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleClick() {
        // let providedKey = "email",
        //     providedData = email;

        // let user = await findData({ providedKey, providedData });
        // console.log(`user: ${user}`);
        // console.log(`key: ${key}, providedData: ${email}`);
        // if (user) {
        //     alert("Email already used. Choose other.");
        //     console.log(`Exists: ${user}`);
        //     return;
        // }

        const res = await fetch("/api/findData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ providedKey: "email", providedData: email }),
        });

        if (res.ok) {
            const user = await res.json();
            console.log(`User found: ${user}`);
            // User exists, handle accordingly
            alert("Email already used. Choose other.");
            return;
        } else if (res.status === 404) {
            // User does not exist, proceed with account creation
            // ... rest of your code for account creation ...
        } else {
            // Handle other errors
            const error = await res.json();
            alert(`Error: ${error.message}`);
        }

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

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

        const response = await postData(data);

        if (response === 1) {
            signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
                redirect: false,
            }).then((result) => {
                if (result.ok) {
                    window.location.href = result.url;
                } else {
                    alert("Sign-in failed. Please try again.");
                }
            });
        } else {
            // console.log(`response: ${response}`);
            alert(`response: ${response}`);
            alert("Account creation failed. Please try again.");
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
                                                        for="form3Example1c"
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
                                                        for="form3Example3c"
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
                                                        for="form3Example4c"
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
