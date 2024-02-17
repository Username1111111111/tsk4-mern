"use client";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import DeleteButton from "../buttons/deleteButton";
import UnblockButton from "../buttons/unblockButton";
import BlockButton from "../buttons/blockButton";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const domain = process.env.baseUrl; // this is localhost

export default function Table({ users, refreshUsers }) {
    const { data: session, status } = useSession();
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(session.user._id);

    // const isLoadingSession = status === "loading";
    const isLoadingSession = currentUserId === undefined;

    if (isLoadingSession) {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    console.log(`currentUserId: -----> ${currentUserId}`);

    useEffect(() => {
        if(session) {
            setCurrentUserId(session.user._id);
        }
        if (!session) {
            signOutAndRedirect();
        }
    }, [session, currentUserId]);

    async function __deleteData(selectedRows) {
        const req = new Request(`${domain}/api/deleteData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedRows),
        });
        await fetch(req);
    }

    async function __updateData(selectedRows, newStatus) {
        const requestBody = {
            ids: selectedRows,
            newStatus,
        };

        const req = new Request(`${domain}/api/updateData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        await fetch(req);
    }

    function signOutAndRedirect() {
        // signOut({ callbackUrl: `${domain}/api/auth/signin`, redirect: false });
        signOut();
        redirect(`${domain}/api/auth/signin`);
    }

    async function onToggleBlockButton() {
        if (selectedRows.length > 0) {
            const newStatus = "blocked";
            if (selectedRows.includes(currentUserId)) {
                await __updateData(selectedRows, newStatus);
                signOutAndRedirect();
            } else {
                await __updateData(selectedRows, newStatus);
                refreshUsers();
            }
        } else {
            console.log("No rows selected for deletion");
        }
    }

    async function onToggleUnblockButton() {
        if (selectedRows.length > 0) {
            const newStatus = "active";
            if (session) {
                await __updateData(selectedRows, newStatus);
                refreshUsers();
            } else if (!session) {
                signOutAndRedirect();
            }
        } else {
            console.log("No rows selected for deletion");
        }
    }

    async function onToggleDeleteButton() {
        if (selectedRows.length > 0) {
            if (selectedRows.includes(currentUserId)) {
                await __deleteData(selectedRows);
                signOutAndRedirect();
            } else {
                await __deleteData(selectedRows);
                refreshUsers();
            }
        } else {
            console.log("No rows selected for deletion");
        }
    }

    function selectAllRows() {
        const allRowIDs = users.map((user) => user._id);
        setSelectedRows(allRowIDs);
    }

    function deselectAllRows() {
        const allRowIDs = [];
        setSelectedRows(allRowIDs);
    }

    function selectRow(rowID) {
        setSelectedRows((selectedRows) => [...selectedRows, rowID]);
    }

    function deselectRow(rowID) {
        setSelectedRows((selectedRows) =>
            selectedRows.filter((id) => id !== rowID)
        );
    }

    return (
        <>
            <div>
                <BlockButton
                    selectedRows={selectedRows}
                    onClick={onToggleBlockButton}
                ></BlockButton>
                <UnblockButton
                    selectedRows={selectedRows}
                    onClick={onToggleUnblockButton}
                ></UnblockButton>
                <DeleteButton
                    selectedRows={selectedRows}
                    onClick={onToggleDeleteButton}
                ></DeleteButton>
            </div>
            <table className="table">
                <TableHead
                    selectedRows={selectedRows}
                    deselectAllRows={deselectAllRows}
                    selectAllRows={selectAllRows}
                ></TableHead>
                <TableBody
                    selectedRows={selectedRows}
                    selectRow={selectRow}
                    deselectRow={deselectRow}
                    users={users}
                ></TableBody>
            </table>
        </>
    );
}
