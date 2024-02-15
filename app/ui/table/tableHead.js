import CheckBox from "../buttons/checkbox";
import { useState } from "react";

export default function TableHead({ selectAllRows, deselectAllRows }) {
    // const checkedStyle  = {
    //     backgroundColor: "green",
    //     borderColor: "green",
    // };

    const [checked, setCheckbox] = useState(false);

    function handleChange() {
        if (!checked) {
            selectAllRows();
        } else {
            deselectAllRows();
        }
        setCheckbox((checked) => !checked);
    }

    return (
        <thead>
            <tr>
                <th scope="col">
                    <CheckBox
                        checked={checked}
                        onChange={handleChange}
                        // style={checkedStyle}
                    ></CheckBox>
                </th>
                <th scope="col">ID</th>
                <th scope="col">
                    Name<br></br>Position
                </th>
                <th scope="col">e-Mail</th>
                <th scope="col">Signup date</th>
                <th scope="col">Last login</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
    );
}
