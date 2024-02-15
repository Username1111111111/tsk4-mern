'use client';
// import { useState } from "react";
import CheckBox from "../buttons/checkbox";

export default function TableRow({
    id,
    name,
    email,
    signupDate,
    lastloginDate,
    status,
    selectRow,
    deselectRow,
    selectedRows
}) {
    // const [checked, setCheckbox] = useState(false);

    function handleChange(userID) {
        if (selectedRows.includes(userID)) {
            deselectRow(userID);
            // setCheckbox(checked => !checked);
        } else {
            selectRow(userID);
            // setCheckbox(checked => !checked);
        }
    }

    return (
        <tr>
            <td scope="row">
                <CheckBox checked={selectedRows.includes(id)} onChange={() => handleChange(id)}></CheckBox>
            </td>
            <td scope="row">{id}</td>
            <td scope="row">{name}</td>
            <td scope="row">{email}</td>
            <td scope="row">{signupDate}</td>
            <td scope="row">{lastloginDate}</td>
            <td scope="row">{status}</td>
        </tr>
    );
}
