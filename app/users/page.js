"use client";
import { useState, useEffect } from "react";
import Table from "../ui/table/table";
import fetchData from "../lib/fetchData";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const { data: session} = useSession();

    async function loadUsers() {
        const fetchedUsers = await fetchData();
        setUsers(fetchedUsers);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    
    // return (
    //     <main style={{ backgroundColor: "#eee" }}>
    //         <Table users={users} refreshUsers={loadUsers}></Table>
    //     </main>
    // );
    
    if (session) {
        return (
            <main style={{ backgroundColor: "#eee" }}>
                <Table users={users} refreshUsers={loadUsers}></Table>
            </main>
        );
    } else {
        redirect("/api/auth/signin");
    }
}
