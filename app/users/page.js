"use client";
import { useState, useEffect } from "react";
import Table from "../ui/table/table";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";



export default function Users() {
    const [users, setUsers] = useState([]);
    const { data: session } = useSession();

    async function loadUsers() {
        const req = new Request(`${process.env.NEXTAUTH_URL}/api/fetchData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            const res = await fetch(req);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const fetchedUsers = await res.json();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    if (session) {
        return (
            <main style={{ backgroundColor: "#eee" }}>
                <Table users={users} refreshUsers={loadUsers}></Table>
            </main>
        );
    } else {
        redirect(`${process.env.NEXTAUTH_URL}/api/auth/signin`);
    }
}
