import TableRow from "./tableRow";

export default function TableBody({ users, selectedRows, selectRow, deselectRow }) {
    // console.log(users);
    
    const allRows = users.map((user) => (
        <TableRow
            key={user._id} 
            id={user._id}
            name={user.name}
            email={user.email}
            signupDate={user.signupDate}
            lastloginDate={user.lastloginDate}
            status={user.status}
            selectRow={selectRow}
            deselectRow={deselectRow}
            selectedRows={selectedRows}
        />
    ));

    return <tbody>{allRows}</tbody>;
}
