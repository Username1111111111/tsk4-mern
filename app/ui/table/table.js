"use client";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import DeleteButton from "../buttons/deleteButton";
import UnblockButton from "../buttons/unblockButton";
import BlockButton from "../buttons/blockButton";
import { useState, useEffect } from "react";
import updateData from "../../lib/updateData";
import deleteData from "../../lib/deleteData";
import { useSession,  signOut } from "next-auth/react";

export default function Table({ users, refreshUsers }) {
    const { data: session } = useSession();
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentUserId, setId] = useState(session?.user?._id);


    useEffect(() => {
        if (!session) {
            signOutAndRedirect();
        }
    });

    function signOutAndRedirect() {
        signOut({ redirect: false }).then(() => {
            
            window.location.href = "/api/auth/signin";
        });
    }

    async function onToggleBlockButton() {
        if (selectedRows.length > 0) {
            const newStatus = "blocked";
            if (selectedRows.includes(currentUserId)) {
                await updateData(
                    selectedRows,
                    newStatus
                );
                signOutAndRedirect();
            } else {
                await updateData(selectedRows, newStatus);
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
                await updateData(selectedRows, newStatus);
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
                await deleteData(selectedRows);
                signOutAndRedirect();
            } else {
                await deleteData(selectedRows);
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
