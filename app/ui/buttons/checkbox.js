export default function CheckBox({checked, onChange}) {


    return (
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={checked}
                    onChange={onChange}
                ></input>
            </div>
    );
}
