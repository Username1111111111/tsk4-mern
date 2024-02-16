"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
    const { data: session } = useSession();

    // console.log("navbar " + session);

    if (session) {
        return (
            <div>
                {session?.user?.email}
                <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                        signOut({ callbackUrl: '/' });
                    }}
                >
                    Sign out
                </button>
            </div>
        );
    }
    return (
        <div>
            Not signed in
            <button className="btn btn-primary m-2" onClick={() => signIn({ callbackUrl: '/' })}>
                Sign in
            </button>
        </div>
    );
}

export default function NavBar() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Link href="/" className="m-2">
                        Home
                    </Link>
    
                    <Link href="/users" className="m-2">
                        Users
                    </Link>
    
                </div>
                <AuthButton />
            
            </div>
        );
    } else {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Link href="/" className="m-2">
                        Home
                    </Link>
    
                    <Link href="/signup" className="m-2">
                        {" "}
                        Sign Up
                    </Link>
    
                </div>
                <AuthButton />
            
            </div>
        );
    }
    
}
