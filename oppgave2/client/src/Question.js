import { useState } from "react";

function Question(props) {
    const [value, setValue] = useState(null);
    return (
        <>
        <label>
            {props.text}
            <div>
            <label>Enig<input type="radio" name={props.name} onClick={() => {props.clickHandle(props.name, true); setValue(true)}} /></label>
            
            <label>Uenig<input type="radio" name={props.name} onClick={() => {props.clickHandle(props.name, false); setValue(false)}} /></label>
            </div>
        </label>
        </>
    )
}
export default Question;