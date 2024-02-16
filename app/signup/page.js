"use client";
import SingupForm from "../ui/auth/signupForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SignupPage() {
    const { data: session } = useSession();

    console.log(session);

    if (!session) {
        return <SingupForm></SingupForm>;
    } else {
        redirect("/");
    }

    
}
