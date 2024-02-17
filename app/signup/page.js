"use client";
import SingupForm from "../ui/auth/signupForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export default function SignupPage() {
    const { data: session } = useSession();

    // console.log(session);

    if (!session) {
        return <SingupForm></SingupForm>;
    } else {
        redirect(`${NEXTAUTH_URL}/`);
    }
    
}
